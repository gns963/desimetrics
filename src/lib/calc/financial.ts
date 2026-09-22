/**
 * DesiMetrics — personal-finance calculators (GST, SIP, income tax, gratuity).
 *
 * PURE, framework-agnostic TypeScript. All money in ₹ (INR).
 *
 * Income-tax slabs are for FY 2026-27 (AY 2027-28). Budget 2026 left the FY
 * 2025-26 structure unchanged. Surcharge (income > ₹50L) and marginal relief
 * are NOT modelled — see notes.
 */

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100

// ---------------------------------------------------------------------------
// GST
// ---------------------------------------------------------------------------

export interface GstResult {
  base: number
  gstAmount: number
  cgst: number
  sgst: number
  igst: number
  total: number
  ratePercent: number
  supplyType: 'intra' | 'inter'
}

/**
 * `exclusive`: `amount` is pre-GST, GST is added.
 * `inclusive`: `amount` already contains GST, it is backed out.
 * `supplyType`: `intra` (same state) splits the GST equally into CGST+SGST;
 * `inter` (across states) charges the full rate as a single IGST line
 * instead — the total tax and total payable are identical either way, only
 * which government/ledger the tax is attributed to changes.
 */
export function calculateGst(
  amount: number,
  ratePercent: number,
  mode: 'inclusive' | 'exclusive',
  supplyType: 'intra' | 'inter' = 'intra',
): GstResult {
  if (amount < 0 || ratePercent < 0) throw new Error('amount and rate must be >= 0')
  let base: number
  let total: number
  if (mode === 'exclusive') {
    base = amount
    total = amount * (1 + ratePercent / 100)
  } else {
    total = amount
    base = (amount * 100) / (100 + ratePercent)
  }
  const gstAmount = total - base
  const isInter = supplyType === 'inter'
  return {
    base: round2(base),
    gstAmount: round2(gstAmount),
    cgst: isInter ? 0 : round2(gstAmount / 2),
    sgst: isInter ? 0 : round2(gstAmount / 2),
    igst: isInter ? round2(gstAmount) : 0,
    total: round2(total),
    ratePercent,
    supplyType,
  }
}

// ---------------------------------------------------------------------------
// SIP
// ---------------------------------------------------------------------------

export interface SipPoint {
  year: number
  invested: number
  value: number
}

export interface SipResult {
  invested: number
  maturityValue: number
  gains: number
  yearly: SipPoint[]
}

/** Future value of a monthly SIP (annuity-due: invested at start of month). */
function sipFutureValue(
  monthly: number,
  monthlyRate: number,
  months: number,
): number {
  if (months <= 0) return 0
  if (monthlyRate === 0) return monthly * months
  return (
    monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  )
}

export function calculateSip(
  monthlyInvestment: number,
  annualRatePercent: number,
  years: number,
): SipResult {
  if (monthlyInvestment < 0 || years < 0) throw new Error('inputs must be >= 0')
  const i = annualRatePercent / 100 / 12
  const totalMonths = Math.round(years * 12)

  const maturityValue = sipFutureValue(monthlyInvestment, i, totalMonths)
  const invested = monthlyInvestment * totalMonths

  const yearly: SipPoint[] = []
  for (let y = 1; y <= Math.floor(years); y++) {
    const months = y * 12
    yearly.push({
      year: y,
      invested: round2(monthlyInvestment * months),
      value: round2(sipFutureValue(monthlyInvestment, i, months)),
    })
  }

  return {
    invested: round2(invested),
    maturityValue: round2(maturityValue),
    gains: round2(maturityValue - invested),
    yearly,
  }
}

export interface SipRealAndPostTaxResult extends SipResult {
  realValue: number
  ltcgTax: number
  postTaxCorpus: number
}

/**
 * Wraps `calculateSip` with the two figures most SIP calculators omit: the
 * inflation-adjusted "real" value (what the nominal corpus is actually worth
 * in today's purchasing power) and the post-tax corpus after equity LTCG/STCG
 * (reusing the same Budget 2024 rules as `calculateEquityCapitalGainsTax` —
 * the entire gain is treated as a single sale at the end of the tenure, which
 * slightly understates tax on very short tenures where some instalments are
 * individually short-term, but matches how every comparable calculator
 * simplifies this).
 */
export function calculateSipRealAndPostTax(
  monthlyInvestment: number,
  annualRatePercent: number,
  years: number,
  inflationRatePercent: number,
): SipRealAndPostTaxResult {
  const sip = calculateSip(monthlyInvestment, annualRatePercent, years)
  const realValue = sip.maturityValue / Math.pow(1 + inflationRatePercent / 100, years)
  const cgt = calculateEquityCapitalGainsTax(sip.invested, sip.maturityValue, Math.round(years * 12))
  return {
    ...sip,
    realValue: round2(realValue),
    ltcgTax: cgt.tax,
    postTaxCorpus: round2(sip.maturityValue - cgt.tax),
  }
}

// ---------------------------------------------------------------------------
// Income tax — FY 2026-27 (AY 2027-28)
// ---------------------------------------------------------------------------

interface Slab {
  upTo: number | null // null = no upper bound
  rate: number // percent
}

const NEW_REGIME_SLABS: Slab[] = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 5 },
  { upTo: 1200000, rate: 10 },
  { upTo: 1600000, rate: 15 },
  { upTo: 2000000, rate: 20 },
  { upTo: 2400000, rate: 25 },
  { upTo: null, rate: 30 },
]

const OLD_REGIME_SLABS: Slab[] = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 5 },
  { upTo: 1000000, rate: 20 },
  { upTo: null, rate: 30 },
]

function taxFromSlabs(taxable: number, slabs: Slab[]): number {
  let tax = 0
  let lower = 0
  for (const slab of slabs) {
    const upper = slab.upTo ?? Infinity
    if (taxable > lower) {
      const inBand = Math.min(taxable, upper) - lower
      tax += (inBand * slab.rate) / 100
    }
    lower = upper
    if (taxable <= upper) break
  }
  return tax
}

export interface RegimeTaxResult {
  regime: 'new' | 'old'
  grossIncome: number
  standardDeduction: number
  otherDeductions: number
  taxableIncome: number
  taxBeforeRebate: number
  rebate87A: number
  cess: number
  totalTax: number
}

export function computeRegimeTax(
  grossIncome: number,
  regime: 'new' | 'old',
  otherDeductions = 0,
): RegimeTaxResult {
  const isNew = regime === 'new'
  const standardDeduction = isNew ? 75000 : 50000
  const slabs = isNew ? NEW_REGIME_SLABS : OLD_REGIME_SLABS
  const deductions = isNew ? 0 : otherDeductions // 80C etc. only in old regime

  const taxableIncome = Math.max(
    0,
    grossIncome - standardDeduction - deductions,
  )
  const taxBeforeRebate = taxFromSlabs(taxableIncome, slabs)

  // Section 87A rebate.
  const rebate87A = isNew
    ? taxableIncome <= 1200000
      ? Math.min(taxBeforeRebate, 60000)
      : 0
    : taxableIncome <= 500000
      ? Math.min(taxBeforeRebate, 12500)
      : 0

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate87A)
  const cess = taxAfterRebate * 0.04

  return {
    regime,
    grossIncome,
    standardDeduction,
    otherDeductions: deductions,
    taxableIncome: round2(taxableIncome),
    taxBeforeRebate: round2(taxBeforeRebate),
    rebate87A: round2(rebate87A),
    cess: round2(cess),
    totalTax: round2(taxAfterRebate + cess),
  }
}

export interface RegimeComparison {
  newRegime: RegimeTaxResult
  oldRegime: RegimeTaxResult
  recommended: 'new' | 'old' | 'either'
  saving: number
}

export function compareRegimes(
  grossIncome: number,
  oldRegimeDeductions = 0,
): RegimeComparison {
  const newRegime = computeRegimeTax(grossIncome, 'new')
  const oldRegime = computeRegimeTax(grossIncome, 'old', oldRegimeDeductions)
  const diff = round2(oldRegime.totalTax - newRegime.totalTax)
  return {
    newRegime,
    oldRegime,
    recommended:
      diff > 0 ? 'new' : diff < 0 ? 'old' : 'either',
    saving: Math.abs(diff),
  }
}

// ---------------------------------------------------------------------------
// Gratuity (Payment of Gratuity Act, 1972)
// ---------------------------------------------------------------------------

export interface GratuityResult {
  eligible: boolean
  roundedYears: number
  gratuity: number
  capped: boolean
}

/** lastSalary = last drawn monthly Basic + DA. Cap ₹20,00,000. */
export function calculateGratuity(
  lastSalary: number,
  yearsOfService: number,
): GratuityResult {
  if (lastSalary < 0 || yearsOfService < 0)
    throw new Error('inputs must be >= 0')
  const eligible = yearsOfService >= 5
  // A part-year over 6 months counts as a full year.
  const whole = Math.floor(yearsOfService)
  const roundedYears = yearsOfService - whole > 0.5 ? whole + 1 : whole
  const raw = (15 / 26) * lastSalary * roundedYears
  const gratuity = eligible ? Math.min(raw, 2000000) : 0
  return {
    eligible,
    roundedYears,
    gratuity: round2(gratuity),
    capped: eligible && raw > 2000000,
  }
}

// ---------------------------------------------------------------------------
// EMI (home / personal / car / any amortising loan)
// ---------------------------------------------------------------------------

export interface EmiYearPoint {
  year: number
  principalPaid: number
  interestPaid: number
  balance: number
}

export interface EmiResult {
  emi: number
  totalPayment: number
  totalInterest: number
  principal: number
  yearly: EmiYearPoint[]
}

/** Standard reducing-balance EMI: E = P × r × (1+r)^n / ((1+r)^n − 1). */
export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  years: number,
): EmiResult {
  if (principal < 0 || annualRatePercent < 0 || years <= 0)
    throw new Error('inputs must be >= 0, years must be > 0')
  const r = annualRatePercent / 100 / 12
  const n = Math.round(years * 12)

  const emi =
    r === 0
      ? principal / n
      : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  // Walk the amortisation month by month, rolling up into yearly buckets.
  let balance = principal
  const yearly: EmiYearPoint[] = []
  let yearPrincipal = 0
  let yearInterest = 0
  for (let m = 1; m <= n; m++) {
    const interestPortion = balance * r
    const principalPortion = Math.min(emi - interestPortion, balance)
    balance = Math.max(0, balance - principalPortion)
    yearPrincipal += principalPortion
    yearInterest += interestPortion
    if (m % 12 === 0 || m === n) {
      yearly.push({
        year: Math.ceil(m / 12),
        principalPaid: round2(yearPrincipal),
        interestPaid: round2(yearInterest),
        balance: round2(balance),
      })
      yearPrincipal = 0
      yearInterest = 0
    }
  }

  const totalPayment = emi * n
  return {
    emi: round2(emi),
    totalPayment: round2(totalPayment),
    totalInterest: round2(totalPayment - principal),
    principal,
    yearly,
  }
}

// ---------------------------------------------------------------------------
// PPF (Public Provident Fund) — 15-year lock-in, annual compounding
// ---------------------------------------------------------------------------

export interface PpfYearPoint {
  year: number
  invested: number
  value: number
}

export interface PpfResult {
  invested: number
  maturityValue: number
  interestEarned: number
  yearly: PpfYearPoint[]
}

/**
 * Simplified annual model: one deposit at the start of each financial year,
 * compounding annually at the notified rate — the standard illustrative
 * approach (actual PPF interest is computed monthly on the lowest balance
 * between the 5th and last day of the month, then credited once a year, which
 * this does not replicate exactly). `years` is typically 15 (statutory
 * lock-in) or a multiple of 5 (post-maturity block extensions).
 */
export function calculatePpf(
  annualInvestment: number,
  ratePercent: number,
  years: number,
): PpfResult {
  if (annualInvestment < 0 || ratePercent < 0 || years <= 0)
    throw new Error('inputs must be >= 0, years must be > 0')
  const r = ratePercent / 100
  let balance = 0
  const yearly: PpfYearPoint[] = []
  for (let y = 1; y <= Math.floor(years); y++) {
    balance = (balance + annualInvestment) * (1 + r)
    yearly.push({
      year: y,
      invested: round2(annualInvestment * y),
      value: round2(balance),
    })
  }
  const invested = annualInvestment * Math.floor(years)
  return {
    invested: round2(invested),
    maturityValue: round2(balance),
    interestEarned: round2(balance - invested),
    yearly,
  }
}

// ---------------------------------------------------------------------------
// Fixed Deposit (FD)
// ---------------------------------------------------------------------------

export interface FdYearPoint {
  year: number
  value: number
}

export interface FdResult {
  principal: number
  maturityValue: number
  interestEarned: number
  yearly: FdYearPoint[]
}

/** A = P(1 + r/n)^(n×t). `compoundingPerYear`: 1 (annually), 2 (half-yearly), 4 (quarterly — most Indian bank FDs), or 12 (monthly). */
export function calculateFd(
  principal: number,
  ratePercent: number,
  years: number,
  compoundingPerYear: number,
): FdResult {
  if (principal < 0 || ratePercent < 0 || years <= 0 || compoundingPerYear <= 0)
    throw new Error('inputs must be >= 0, years and compoundingPerYear must be > 0')
  const r = ratePercent / 100
  const valueAt = (t: number) => principal * Math.pow(1 + r / compoundingPerYear, compoundingPerYear * t)
  const maturityValue = valueAt(years)
  const yearly: FdYearPoint[] = []
  for (let y = 1; y <= Math.floor(years); y++) {
    yearly.push({ year: y, value: round2(valueAt(y)) })
  }
  return {
    principal,
    maturityValue: round2(maturityValue),
    interestEarned: round2(maturityValue - principal),
    yearly,
  }
}

// ---------------------------------------------------------------------------
// HRA (House Rent Allowance) exemption — Section 10(13A), Rule 2A
// ---------------------------------------------------------------------------

export interface HraResult {
  hraReceived: number
  rentMinusTenPercentBasic: number
  salaryPercentLimit: number
  exemptAmount: number
  taxableHra: number
}

/**
 * Exemption is the LEAST of: (a) actual HRA received, (b) rent paid minus 10%
 * of basic salary, (c) 50% of basic salary (metro) or 40% (non-metro). All
 * figures should be for the same period (annual in, annual out here).
 */
export function calculateHraExemption(
  basicSalary: number,
  hraReceived: number,
  rentPaid: number,
  isMetro: boolean,
): HraResult {
  if (basicSalary < 0 || hraReceived < 0 || rentPaid < 0)
    throw new Error('inputs must be >= 0')
  const rentMinusTenPercentBasic = Math.max(0, rentPaid - 0.1 * basicSalary)
  const salaryPercentLimit = (isMetro ? 0.5 : 0.4) * basicSalary
  const exemptAmount = Math.min(hraReceived, rentMinusTenPercentBasic, salaryPercentLimit)
  return {
    hraReceived,
    rentMinusTenPercentBasic: round2(rentMinusTenPercentBasic),
    salaryPercentLimit: round2(salaryPercentLimit),
    exemptAmount: round2(Math.max(0, exemptAmount)),
    taxableHra: round2(Math.max(0, hraReceived - Math.max(0, exemptAmount))),
  }
}

// ---------------------------------------------------------------------------
// Capital gains tax — listed equity shares & equity-oriented mutual funds
// (Section 111A/112A, as revised by Budget 2024 w.e.f. 23 July 2024)
// ---------------------------------------------------------------------------

export interface CapitalGainsResult {
  gain: number
  gainType: 'short-term' | 'long-term'
  exemptionUsed: number
  taxableGain: number
  taxRatePercent: number
  tax: number
  netProceeds: number
}

const LTCG_EQUITY_EXEMPTION = 125000 // ₹1.25L/year, Section 112A, from Budget 2024
const LTCG_EQUITY_RATE = 12.5 // %, from Budget 2024 (was 10%)
const STCG_EQUITY_RATE = 20 // %, from Budget 2024 (was 15%)

/**
 * `holdingMonths` > 12 → long-term (Section 112A): 12.5% above the ₹1.25L/FY
 * exemption. Otherwise → short-term (Section 111A): flat 20%, no exemption.
 * Assumes STT was paid on both purchase and sale, as with normal exchange
 * trades — the concessional rates don't apply otherwise.
 */
export function calculateEquityCapitalGainsTax(
  purchaseValue: number,
  saleValue: number,
  holdingMonths: number,
): CapitalGainsResult {
  if (purchaseValue < 0 || saleValue < 0 || holdingMonths < 0)
    throw new Error('inputs must be >= 0')
  const gain = saleValue - purchaseValue
  const isLongTerm = holdingMonths > 12
  const positiveGain = Math.max(0, gain)

  if (isLongTerm) {
    const exemptionUsed = Math.min(positiveGain, LTCG_EQUITY_EXEMPTION)
    const taxableGain = Math.max(0, positiveGain - LTCG_EQUITY_EXEMPTION)
    const tax = (taxableGain * LTCG_EQUITY_RATE) / 100
    return {
      gain: round2(gain),
      gainType: 'long-term',
      exemptionUsed: round2(exemptionUsed),
      taxableGain: round2(taxableGain),
      taxRatePercent: LTCG_EQUITY_RATE,
      tax: round2(tax),
      netProceeds: round2(saleValue - tax),
    }
  }

  const tax = (positiveGain * STCG_EQUITY_RATE) / 100
  return {
    gain: round2(gain),
    gainType: 'short-term',
    exemptionUsed: 0,
    taxableGain: round2(positiveGain),
    taxRatePercent: STCG_EQUITY_RATE,
    tax: round2(tax),
    netProceeds: round2(saleValue - tax),
  }
}

// ---------------------------------------------------------------------------
// NPS (National Pension System) — accumulation + exit-rule withdrawal split
// ---------------------------------------------------------------------------

export interface NpsYearPoint {
  year: number
  invested: number
  value: number
}

export interface NpsResult {
  totalInvested: number
  corpus: number
  gains: number
  lumpsumAmount: number
  annuityAmount: number
  taxFreeLumpsum: number
  taxableLumpsum: number
  estimatedMonthlyPension: number
  yearly: NpsYearPoint[]
}

const ASSUMED_ANNUITY_RATE_PERCENT = 6.5 // illustrative — actual annuity rates vary by insurer/plan

/**
 * Accumulation uses the same future-value-of-monthly-annuity formula as SIP.
 * The withdrawal split follows PFRDA's exit rules as amended (effective
 * 2026): corpus ≤ ₹8L can be withdrawn fully as lump sum; ₹8L–₹12L allows up
 * to ₹6L lump sum (remainder via phased withdrawal, approximated here as
 * annuity-bound for simplicity); above ₹12L, non-government subscribers get
 * 80% lump sum / 20% mandatory annuity, government subscribers 60%/40%. Only
 * 60% of the total corpus is tax-free under Section 10(12A) regardless of how
 * much is withdrawn as lump sum — any lump sum beyond that 60% is taxable at
 * the subscriber's slab rate.
 */
export function calculateNps(
  monthlyContribution: number,
  annualRatePercent: number,
  yearsToRetirement: number,
  subscriberType: 'government' | 'other',
): NpsResult {
  if (monthlyContribution < 0 || annualRatePercent < 0 || yearsToRetirement <= 0)
    throw new Error('inputs must be >= 0, yearsToRetirement must be > 0')
  const i = annualRatePercent / 100 / 12
  const totalMonths = Math.round(yearsToRetirement * 12)
  const corpus = sipFutureValue(monthlyContribution, i, totalMonths)
  const totalInvested = monthlyContribution * totalMonths

  const yearly: NpsYearPoint[] = []
  for (let y = 1; y <= Math.floor(yearsToRetirement); y++) {
    const months = y * 12
    yearly.push({
      year: y,
      invested: round2(monthlyContribution * months),
      value: round2(sipFutureValue(monthlyContribution, i, months)),
    })
  }

  let lumpsumPercent: number
  if (corpus <= 800000) {
    lumpsumPercent = 100
  } else if (corpus <= 1200000) {
    lumpsumPercent = (600000 / corpus) * 100
  } else {
    lumpsumPercent = subscriberType === 'government' ? 60 : 80
  }

  const lumpsumAmount = (corpus * lumpsumPercent) / 100
  const annuityAmount = corpus - lumpsumAmount
  const taxFreeLumpsum = Math.min(lumpsumAmount, corpus * 0.6)
  const taxableLumpsum = Math.max(0, lumpsumAmount - taxFreeLumpsum)
  const estimatedMonthlyPension = (annuityAmount * (ASSUMED_ANNUITY_RATE_PERCENT / 100)) / 12

  return {
    totalInvested: round2(totalInvested),
    corpus: round2(corpus),
    gains: round2(corpus - totalInvested),
    lumpsumAmount: round2(lumpsumAmount),
    annuityAmount: round2(annuityAmount),
    taxFreeLumpsum: round2(taxFreeLumpsum),
    taxableLumpsum: round2(taxableLumpsum),
    estimatedMonthlyPension: round2(estimatedMonthlyPension),
    yearly,
  }
}

// ---------------------------------------------------------------------------
// Human Life Value (HLV) — income-replacement method for life-cover sizing
// ---------------------------------------------------------------------------

export interface HlvResult {
  netAnnualContribution: number
  presentValueOfIncome: number
  totalBeforeOffsets: number
  recommendedCover: number
}

/**
 * Standard income-replacement HLV method taught in Indian financial-planning
 * practice: the present value of the income a family would lose, plus
 * outstanding debts, minus cover/savings that already exist. This is a needs
 * estimate, not a premium quote — actual policy pricing depends on the
 * insurer, medicals and product chosen, none of which this models.
 */
export function calculateHumanLifeValue(
  annualIncome: number,
  annualSelfExpenses: number,
  yearsToRetirement: number,
  discountRatePercent: number,
  outstandingLiabilities: number,
  existingCoverAndSavings: number,
): HlvResult {
  if (
    annualIncome < 0 ||
    annualSelfExpenses < 0 ||
    yearsToRetirement <= 0 ||
    discountRatePercent <= 0 ||
    outstandingLiabilities < 0 ||
    existingCoverAndSavings < 0
  )
    throw new Error('inputs must be >= 0, yearsToRetirement and discountRatePercent must be > 0')

  const netAnnualContribution = Math.max(0, annualIncome - annualSelfExpenses)
  const r = discountRatePercent / 100
  const n = yearsToRetirement
  // Present value of an ordinary annuity (income received at year-end).
  const presentValueOfIncome =
    r === 0 ? netAnnualContribution * n : netAnnualContribution * ((1 - Math.pow(1 + r, -n)) / r)

  const totalBeforeOffsets = presentValueOfIncome + outstandingLiabilities
  const recommendedCover = Math.max(0, totalBeforeOffsets - existingCoverAndSavings)

  return {
    netAnnualContribution: round2(netAnnualContribution),
    presentValueOfIncome: round2(presentValueOfIncome),
    totalBeforeOffsets: round2(totalBeforeOffsets),
    recommendedCover: round2(recommendedCover),
  }
}
