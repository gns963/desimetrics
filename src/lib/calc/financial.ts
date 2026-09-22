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

export type AgeGroup = 'under60' | '60to79' | '80plus'

/**
 * Old-regime slabs vary only in the nil-rate band by age — resident
 * individuals under 60 get ₹2.5L nil, senior citizens (60-79) get ₹3L nil,
 * and super senior citizens (80+) get ₹5L nil. The new regime's slabs (above)
 * do NOT vary by age — its flat ₹4L nil band and 87A rebate apply uniformly.
 */
const OLD_REGIME_SLABS: Record<AgeGroup, Slab[]> = {
  under60: [
    { upTo: 250000, rate: 0 },
    { upTo: 500000, rate: 5 },
    { upTo: 1000000, rate: 20 },
    { upTo: null, rate: 30 },
  ],
  '60to79': [
    { upTo: 300000, rate: 0 },
    { upTo: 500000, rate: 5 },
    { upTo: 1000000, rate: 20 },
    { upTo: null, rate: 30 },
  ],
  '80plus': [
    { upTo: 500000, rate: 0 },
    { upTo: 1000000, rate: 20 },
    { upTo: null, rate: 30 },
  ],
}

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
  marginalRelief: number
  cess: number
  totalTax: number
}

/**
 * Section 87A rebate for the new regime (₹60,000, threshold ₹12,00,000)
 * includes marginal relief just above the threshold: tax payable is capped
 * at the amount by which taxable income exceeds ₹12,00,000, so a taxpayer
 * just over the line never owes more extra tax than their extra income. This
 * self-terminates once slab tax alone drops below that excess (around
 * ₹12,70,588 taxable income) — verified against official guidance; there is
 * no separate upper bound to hardcode. The OLD regime's ₹5,00,000/₹12,500
 * rebate has NO such marginal relief — crossing ₹5,00,000 by even ₹1 loses
 * the full rebate as a hard cliff, confirmed via CBDT/official guidance
 * (unlike the new regime, this is a real, deliberate asymmetry, not an
 * oversight in this calculator).
 */
function newRegimeRebateAndRelief(
  taxBeforeRebate: number,
  taxableIncome: number,
): { rebate: number; marginalRelief: number } {
  const THRESHOLD = 1200000
  const MAX_REBATE = 60000
  if (taxableIncome <= THRESHOLD) {
    return { rebate: Math.min(taxBeforeRebate, MAX_REBATE), marginalRelief: 0 }
  }
  const excess = taxableIncome - THRESHOLD
  if (taxBeforeRebate <= excess) {
    return { rebate: 0, marginalRelief: 0 }
  }
  return { rebate: 0, marginalRelief: taxBeforeRebate - excess }
}

export function computeRegimeTax(
  grossIncome: number,
  regime: 'new' | 'old',
  otherDeductions = 0,
  ageGroup: AgeGroup = 'under60',
  isSalariedOrPensioner = true,
): RegimeTaxResult {
  const isNew = regime === 'new'
  // Standard deduction only applies to salary/pension income, not business or
  // professional income.
  const standardDeduction = isSalariedOrPensioner ? (isNew ? 75000 : 50000) : 0
  const slabs = isNew ? NEW_REGIME_SLABS : OLD_REGIME_SLABS[ageGroup]
  const deductions = isNew ? 0 : otherDeductions // 80C etc. only in old regime

  const taxableIncome = Math.max(
    0,
    grossIncome - standardDeduction - deductions,
  )
  const taxBeforeRebate = taxFromSlabs(taxableIncome, slabs)

  let rebate87A = 0
  let marginalRelief = 0
  if (isNew) {
    const r = newRegimeRebateAndRelief(taxBeforeRebate, taxableIncome)
    rebate87A = r.rebate
    marginalRelief = r.marginalRelief
  } else {
    // Old regime: hard cliff at ₹5,00,000, no marginal relief.
    rebate87A = taxableIncome <= 500000 ? Math.min(taxBeforeRebate, 12500) : 0
  }

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate87A - marginalRelief)
  const cess = taxAfterRebate * 0.04

  return {
    regime,
    grossIncome,
    standardDeduction,
    otherDeductions: deductions,
    taxableIncome: round2(taxableIncome),
    taxBeforeRebate: round2(taxBeforeRebate),
    rebate87A: round2(rebate87A),
    marginalRelief: round2(marginalRelief),
    cess: round2(cess),
    totalTax: round2(taxAfterRebate + cess),
  }
}

export interface RegimeComparison {
  newRegime: RegimeTaxResult
  oldRegime: RegimeTaxResult
  recommended: 'new' | 'old' | 'either'
  saving: number
  breakEvenDeduction: number | null
  deductionGap: number
}

export function compareRegimes(
  grossIncome: number,
  oldRegimeDeductions = 0,
  ageGroup: AgeGroup = 'under60',
  isSalariedOrPensioner = true,
): RegimeComparison {
  const newRegime = computeRegimeTax(grossIncome, 'new', 0, ageGroup, isSalariedOrPensioner)
  const oldRegime = computeRegimeTax(grossIncome, 'old', oldRegimeDeductions, ageGroup, isSalariedOrPensioner)
  const diff = round2(oldRegime.totalTax - newRegime.totalTax)
  const breakEvenDeduction = findRegimeBreakEvenDeduction(grossIncome, ageGroup, isSalariedOrPensioner)
  const deductionGap =
    breakEvenDeduction === null ? 0 : round2(Math.max(0, breakEvenDeduction - oldRegimeDeductions))
  return {
    newRegime,
    oldRegime,
    recommended:
      diff > 0 ? 'new' : diff < 0 ? 'old' : 'either',
    saving: Math.abs(diff),
    breakEvenDeduction,
    deductionGap,
  }
}

/**
 * Solves (via binary search, since old-regime tax is non-increasing in
 * deductions) the total old-regime deduction amount at which the old regime's
 * tax equals the new regime's tax for the same gross income — the "break-even"
 * point calcwise.finance's calculator is built around. Returns 0 if the old
 * regime already wins with zero deductions, or null if even a deduction equal
 * to the entire gross income can't close the gap (meaning the new regime wins
 * unconditionally at this income level).
 */
export function findRegimeBreakEvenDeduction(
  grossIncome: number,
  ageGroup: AgeGroup = 'under60',
  isSalariedOrPensioner = true,
): number | null {
  const newTax = computeRegimeTax(grossIncome, 'new', 0, ageGroup, isSalariedOrPensioner).totalTax
  const oldTaxAtZero = computeRegimeTax(grossIncome, 'old', 0, ageGroup, isSalariedOrPensioner).totalTax
  if (oldTaxAtZero <= newTax) return 0

  const maxDeductions = grossIncome
  const oldTaxAtMax = computeRegimeTax(grossIncome, 'old', maxDeductions, ageGroup, isSalariedOrPensioner).totalTax
  if (oldTaxAtMax > newTax) return null

  let lo = 0
  let hi = maxDeductions
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    const midTax = computeRegimeTax(grossIncome, 'old', mid, ageGroup, isSalariedOrPensioner).totalTax
    if (midTax > newTax) lo = mid
    else hi = mid
  }
  return round2(hi)
}

export interface OldRegimeDeductionInputs {
  section80C: number
  section80D: number
  hraExemption: number
  homeLoanInterest: number
  nps80ccd1b: number
  otherDeductions: number
}

const SECTION_80C_CAP = 150000
const SECTION_24B_HOME_LOAN_INTEREST_CAP = 200000
const SECTION_80CCD_1B_NPS_CAP = 50000

/**
 * Totals old-regime deductions from itemized inputs, applying each section's
 * statutory cap automatically — Section 80C at ₹1.5L, Section 80D at ₹25,000
 * (₹50,000 for senior/super-senior citizens, self-insurance only — this does
 * not model an additional cap for insuring senior-citizen parents), home loan
 * interest under Section 24(b) at ₹2L for a self-occupied property, and the
 * NPS top-up under Section 80CCD(1B) at ₹50,000. HRA exemption and "other
 * deductions" (80TTA/80TTB etc.) are taken as entered, uncapped here, since
 * HRA is itself already a computed exemption (see the HRA Calculator) rather
 * than a raw contribution subject to a simple cap.
 */
export function totalOldRegimeDeductions(
  inputs: OldRegimeDeductionInputs,
  ageGroup: AgeGroup = 'under60',
): number {
  const section80D_CAP = ageGroup === 'under60' ? 25000 : 50000
  const capped80C = Math.min(Math.max(0, inputs.section80C), SECTION_80C_CAP)
  const capped80D = Math.min(Math.max(0, inputs.section80D), section80D_CAP)
  const cappedHomeLoan = Math.min(Math.max(0, inputs.homeLoanInterest), SECTION_24B_HOME_LOAN_INTEREST_CAP)
  const cappedNps = Math.min(Math.max(0, inputs.nps80ccd1b), SECTION_80CCD_1B_NPS_CAP)
  const hra = Math.max(0, inputs.hraExemption)
  const other = Math.max(0, inputs.otherDeductions)
  return round2(capped80C + capped80D + hra + cappedHomeLoan + cappedNps + other)
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

export type GratuityScenario = 'retirement' | 'death' | 'fixedTerm'
export type GratuityEmployerCoverage = 'covered' | 'nonCovered'
export type GratuityEmployeeType = 'private' | 'government'

const GRATUITY_CEILING_PRIVATE = 2000000
const GRATUITY_CEILING_GOVERNMENT = 2500000 // CCS Pension Rules ceiling, raised from ₹20L to ₹25L effective 1 Jan 2024

export interface GratuityInputV2 {
  scenario: GratuityScenario
  /** Last drawn monthly Basic + DA — also called "emoluments" in the CCS death-gratuity slab table. */
  lastDrawnSalary: number
  yearsOfService: number
  /** 'covered': employer falls under the Payment of Gratuity Act (15-day/26-day formula). 'nonCovered': employer doesn't (15-day/30-day calendar-month formula) — not relevant for a government employee, whose gratuity always follows CCS Pension Rules regardless. */
  employerCoverage: GratuityEmployerCoverage
  employeeType: GratuityEmployeeType
}

export interface GratuityResultV2 {
  eligible: boolean
  ineligibilityReason: string | null
  roundedYears: number
  grossGratuity: number
  gratuity: number
  capped: boolean
  ceilingApplied: number
  isFullyTaxExempt: boolean
}

function roundGratuityServiceYears(years: number): number {
  const whole = Math.floor(years)
  return years - whole > 0.5 ? whole + 1 : whole
}

/**
 * Extends `calculateGratuity` to three scenarios calcwise.finance's
 * calculator covers, each with genuinely different eligibility and/or
 * formula rules — not just relabeled versions of the same math:
 *
 * - `retirement`: the standard case, requiring 5+ years of continuous
 *   service. Uses 15/26 (Act-covered employer) or 15/30 (non-covered) of
 *   last drawn salary per year, capped at the employee type's ceiling.
 * - `death`: the 5-year minimum is waived by law — gratuity is payable even
 *   if the employee dies in their first year. For a GOVERNMENT employee,
 *   this follows the CCS Pension Rules' service-linked slab table (2x
 *   emoluments under 1 year, 6x for 1-5 years, 12x for 5-11 years, 20x for
 *   11-20 years, then half a month's emoluments per completed 6-month period
 *   beyond 20 years, capped at 33x) — a genuinely different formula from
 *   private-sector gratuity, not a relabeling. For a PRIVATE-sector
 *   employee, the same 15/26-or-30 formula as retirement applies, just
 *   without the 5-year eligibility gate.
 * - `fixedTerm`: under Section 53 of the Code on Social Security, 2020
 *   (the four Labour Codes took effect 21 November 2025), fixed-term
 *   employees get gratuity on the SAME 15/26-or-30 formula as retirement,
 *   but the 5-year minimum drops to just 1 year of service.
 *
 * Government-employee gratuity (any scenario) is fully exempt from tax
 * under Section 10(10)(i), regardless of amount — private-sector gratuity
 * is exempt only up to the statutory ceiling under Section 10(10)(ii)/(iii).
 */
export function calculateGratuityV2(input: GratuityInputV2): GratuityResultV2 {
  const { scenario, lastDrawnSalary, yearsOfService, employerCoverage, employeeType } = input
  if (lastDrawnSalary < 0 || yearsOfService < 0) throw new Error('inputs must be >= 0')

  const ceiling = employeeType === 'government' ? GRATUITY_CEILING_GOVERNMENT : GRATUITY_CEILING_PRIVATE
  const divisor = employerCoverage === 'covered' ? 26 : 30

  let eligible = true
  let ineligibilityReason: string | null = null
  if (scenario === 'retirement' && yearsOfService < 5) {
    eligible = false
    ineligibilityReason = 'Retirement/resignation gratuity requires at least 5 years of continuous service.'
  } else if (scenario === 'fixedTerm' && yearsOfService < 1) {
    eligible = false
    ineligibilityReason = 'Fixed-term gratuity requires at least 1 year of service under the Code on Social Security, 2020.'
  }
  // scenario === 'death': no minimum service requirement — always eligible.

  const roundedYears = eligible ? roundGratuityServiceYears(yearsOfService) : 0
  let grossGratuity = 0

  if (eligible) {
    if (scenario === 'death' && employeeType === 'government') {
      if (yearsOfService < 1) grossGratuity = 2 * lastDrawnSalary
      else if (yearsOfService < 5) grossGratuity = 6 * lastDrawnSalary
      else if (yearsOfService < 11) grossGratuity = 12 * lastDrawnSalary
      else if (yearsOfService < 20) grossGratuity = 20 * lastDrawnSalary
      else {
        const halfYearPeriods = Math.floor(yearsOfService * 2)
        grossGratuity = Math.min(halfYearPeriods * 0.5 * lastDrawnSalary, 33 * lastDrawnSalary)
      }
    } else {
      grossGratuity = (15 / divisor) * lastDrawnSalary * roundedYears
    }
  }

  const gratuity = eligible ? Math.min(grossGratuity, ceiling) : 0
  return {
    eligible,
    ineligibilityReason,
    roundedYears,
    grossGratuity: round2(grossGratuity),
    gratuity: round2(gratuity),
    capped: eligible && grossGratuity > ceiling,
    ceilingApplied: ceiling,
    isFullyTaxExempt: employeeType === 'government',
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

export type PrepaymentEffect = 'reduceTenure' | 'reduceEmi'

export interface EmiPrepaymentInput {
  principal: number
  annualRatePercent: number
  years: number
  /** Applied once every 12 months, starting at month 12. */
  yearlyExtraPayment?: number
  /** Applied immediately, before the first instalment. */
  oneTimePrepaymentNow?: number
  /** 'reduceTenure' (default) keeps the EMI fixed at the original amount and
   * pays off faster; 'reduceEmi' keeps the original tenure and recalculates
   * a lower EMI each time a prepayment lands. */
  prepaymentEffect?: PrepaymentEffect
}

export interface EmiPrepaymentResult {
  originalEmi: number
  originalTotalInterest: number
  originalMonths: number
  effectiveEmi: number
  actualMonths: number
  actualTotalInterest: number
  totalPrepaid: number
  interestSaved: number
  monthsSaved: number
}

function emiFormula(balance: number, r: number, months: number): number {
  if (months <= 0) return balance
  return r === 0
    ? balance / months
    : (balance * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

/**
 * Simulates a loan month by month with optional prepayments, since a lump
 * sum injected mid-schedule has no closed-form solution the way a plain EMI
 * does. Two prepayment types can combine: a one-time amount applied before
 * the first instalment, and a recurring yearly amount applied every 12
 * months. `prepaymentEffect` controls whether the borrower's benefit shows up
 * as a shorter tenure (EMI unchanged) or a lower EMI (tenure unchanged).
 */
export function calculateEmiWithPrepayment(input: EmiPrepaymentInput): EmiPrepaymentResult {
  const {
    principal,
    annualRatePercent,
    years,
    yearlyExtraPayment = 0,
    oneTimePrepaymentNow = 0,
    prepaymentEffect = 'reduceTenure',
  } = input
  if (principal < 0 || annualRatePercent < 0 || years <= 0)
    throw new Error('inputs must be >= 0, years must be > 0')

  const r = annualRatePercent / 100 / 12
  const totalMonths = Math.round(years * 12)
  const originalEmi = emiFormula(principal, r, totalMonths)
  const originalTotalInterest = originalEmi * totalMonths - principal

  let balance = Math.max(0, principal - Math.max(0, oneTimePrepaymentNow))
  let currentEmi = originalEmi
  let totalPrepaid = Math.min(Math.max(0, oneTimePrepaymentNow), principal)

  if (prepaymentEffect === 'reduceEmi' && totalPrepaid > 0 && balance > 0) {
    currentEmi = emiFormula(balance, r, totalMonths)
  }

  let totalInterestPaid = 0
  let month = 0
  const safetyCapMonths = totalMonths * 2 + 24
  while (balance > 0.5 && month < safetyCapMonths) {
    month++
    const interestPortion = balance * r
    const principalPortion = Math.min(currentEmi - interestPortion, balance)
    totalInterestPaid += interestPortion
    balance = Math.max(0, balance - principalPortion)

    if (yearlyExtraPayment > 0 && month % 12 === 0 && balance > 0) {
      const applied = Math.min(yearlyExtraPayment, balance)
      balance -= applied
      totalPrepaid += applied
      const monthsRemaining = totalMonths - month
      if (prepaymentEffect === 'reduceEmi' && balance > 0 && monthsRemaining > 0) {
        currentEmi = emiFormula(balance, r, monthsRemaining)
      }
    }
  }

  return {
    originalEmi: round2(originalEmi),
    originalTotalInterest: round2(originalTotalInterest),
    originalMonths: totalMonths,
    effectiveEmi: round2(currentEmi),
    actualMonths: month,
    actualTotalInterest: round2(totalInterestPaid),
    totalPrepaid: round2(totalPrepaid),
    interestSaved: round2(originalTotalInterest - totalInterestPaid),
    monthsSaved: totalMonths - month,
  }
}

export interface EmiAffordability {
  emiToIncomeRatioPercent: number
  verdict: 'comfortable' | 'tight' | 'risky'
}

/**
 * Compares an EMI against monthly income using the "Fixed Obligations to
 * Income Ratio" (FOIR) rule of thumb most Indian lenders apply informally
 * when assessing loan eligibility — roughly 40-50% of net monthly income
 * across ALL EMIs combined is the usual ceiling. This is lender practice,
 * not a legal cap, and varies by bank and borrower profile.
 */
export function checkEmiAffordability(emi: number, monthlyIncome: number): EmiAffordability {
  if (monthlyIncome <= 0) return { emiToIncomeRatioPercent: 0, verdict: 'risky' }
  const ratio = (emi / monthlyIncome) * 100
  const verdict: EmiAffordability['verdict'] = ratio <= 40 ? 'comfortable' : ratio <= 50 ? 'tight' : 'risky'
  return { emiToIncomeRatioPercent: round2(ratio), verdict }
}

export interface LoanTrueCostInput {
  principal: number
  annualRatePercent: number
  years: number
  processingFeePercent: number
  processingFeeGstPercent?: number
}

export interface LoanTrueCostResult {
  emi: number
  totalInterest: number
  totalPayment: number
  processingFee: number
  processingFeeGst: number
  totalFeeWithGst: number
  netDisbursal: number
  effectiveAprPercent: number
}

/** Solves for the monthly rate r such that EMI paid for `months` has this present value, via bisection (PV is monotonically decreasing in r). */
function solveMonthlyRateForPresentValue(emi: number, months: number, presentValue: number): number {
  if (presentValue <= 0 || emi <= 0) return 0
  let lo = 0.00001
  let hi = 3 // 300%/month — far more than enough headroom for any realistic fee
  const pvAtRate = (r: number) => (emi * (1 - Math.pow(1 + r, -months))) / r
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2
    if (pvAtRate(mid) > presentValue) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/**
 * A loan's quoted interest rate understates its true cost once a processing
 * fee (plus GST on that fee, standard at 18%) is deducted upfront from the
 * disbursed amount — you only ever receive the net disbursal, but you repay
 * EMIs calculated on the full principal. The "effective APR" solves for the
 * annualised rate that equates the EMI schedule to the smaller amount
 * actually received, so two loans with different fee structures can be
 * compared on a like-for-like basis rather than by quoted rate alone.
 */
export function calculateLoanTrueCost(input: LoanTrueCostInput): LoanTrueCostResult {
  const { principal, annualRatePercent, years, processingFeePercent, processingFeeGstPercent = 18 } = input
  if (principal < 0 || annualRatePercent < 0 || years <= 0 || processingFeePercent < 0)
    throw new Error('inputs must be >= 0, years must be > 0')

  const emiResult = calculateEmi(principal, annualRatePercent, years)
  const processingFee = (principal * processingFeePercent) / 100
  const processingFeeGst = (processingFee * processingFeeGstPercent) / 100
  const totalFeeWithGst = processingFee + processingFeeGst
  const netDisbursal = principal - totalFeeWithGst

  const monthlyRate = solveMonthlyRateForPresentValue(
    emiResult.emi,
    Math.round(years * 12),
    netDisbursal,
  )
  const effectiveAprPercent = monthlyRate * 12 * 100

  return {
    emi: emiResult.emi,
    totalInterest: emiResult.totalInterest,
    totalPayment: emiResult.totalPayment,
    processingFee: round2(processingFee),
    processingFeeGst: round2(processingFeeGst),
    totalFeeWithGst: round2(totalFeeWithGst),
    netDisbursal: round2(netDisbursal),
    effectiveAprPercent: round2(effectiveAprPercent),
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

export type PpfDepositMode = 'monthly' | 'yearly'
export type PpfDepositTiming = 'before5th' | 'after5th'
export type PpfExtensionChoice = 'contribute' | 'stop'

const PPF_ANNUAL_CAP = 150000
const PPF_LOCK_IN_YEARS = 15
const PPF_EXTENSION_BLOCK_YEARS = 5

export interface PpfSimulationInput {
  depositMode: PpfDepositMode
  /** Monthly deposit if `depositMode` is 'monthly'; annual deposit if 'yearly'. */
  depositAmount: number
  ratePercent: number
  /** Only relevant in monthly mode — a deposit made on/before the 5th earns
   * interest for that same month; after the 5th, it only starts earning from
   * the following month, per PPF's actual interest-computation rule (lowest
   * balance between the 5th and month-end). */
  depositTiming: PpfDepositTiming
  /** Number of extra 5-year blocks after the initial 15-year lock-in (0-4). */
  extensionBlocks: number
  /** Only relevant if extensionBlocks > 0. */
  extensionChoice: PpfExtensionChoice
  /** For an illustrative 80C tax-saving estimate only — not part of the PPF maturity math itself. */
  taxBracketPercent: number
}

export interface PpfSimulationYearPoint {
  year: number
  invested: number
  value: number
  taxSaved: number
}

export interface PpfSimulationResult {
  invested: number
  maturityValue: number
  interestEarned: number
  totalTaxSaved: number
  yearly: PpfSimulationYearPoint[]
}

/**
 * Month-by-month PPF simulation that captures two real mechanics the simple
 * annual model above doesn't: (1) monthly deposits only earn interest from
 * the month they're eligible for, based on the 5th-of-the-month cutoff, and
 * (2) the post-15-year extension choice (keep contributing vs stop) changes
 * whether further deposits happen at all. Interest itself is still credited
 * annually (matching how PPF actually works — monthly interest is computed
 * but only added to the balance at financial-year end, so it doesn't itself
 * compound intra-year).
 */
export function simulatePpf(input: PpfSimulationInput): PpfSimulationResult {
  const {
    depositMode,
    depositAmount,
    ratePercent,
    depositTiming,
    extensionBlocks,
    extensionChoice,
    taxBracketPercent,
  } = input
  if (depositAmount < 0 || ratePercent < 0 || extensionBlocks < 0)
    throw new Error('inputs must be >= 0')

  const totalYears = PPF_LOCK_IN_YEARS + Math.floor(extensionBlocks) * PPF_EXTENSION_BLOCK_YEARS
  const monthlyRate = ratePercent / 100 / 12

  let balance = 0
  let totalInvested = 0
  let totalTaxSaved = 0
  const yearly: PpfSimulationYearPoint[] = []

  for (let y = 1; y <= totalYears; y++) {
    const contributingThisYear = y <= PPF_LOCK_IN_YEARS || extensionChoice === 'contribute'
    let yearInvested = 0
    let yearInterest = 0

    if (depositMode === 'yearly') {
      const deposit = contributingThisYear ? Math.min(depositAmount, PPF_ANNUAL_CAP) : 0
      balance += deposit
      yearInvested = deposit
      yearInterest = balance * (ratePercent / 100)
    } else {
      // Monthly mode: walk 12 months, respecting the annual cap and the
      // before/after-5th interest-eligibility rule.
      let yearDeposited = 0
      for (let m = 1; m <= 12; m++) {
        let deposit = contributingThisYear ? depositAmount : 0
        if (yearDeposited + deposit > PPF_ANNUAL_CAP) {
          deposit = Math.max(0, PPF_ANNUAL_CAP - yearDeposited)
        }
        yearDeposited += deposit

        if (depositTiming === 'before5th') {
          balance += deposit
          yearInterest += balance * monthlyRate
        } else {
          yearInterest += balance * monthlyRate
          balance += deposit
        }
      }
      yearInvested = yearDeposited
    }

    balance += yearInterest
    totalInvested += yearInvested
    const taxSaved = (Math.min(yearInvested, PPF_ANNUAL_CAP) * taxBracketPercent) / 100
    totalTaxSaved += taxSaved

    yearly.push({
      year: y,
      invested: round2(totalInvested),
      value: round2(balance),
      taxSaved: round2(taxSaved),
    })
  }

  return {
    invested: round2(totalInvested),
    maturityValue: round2(balance),
    interestEarned: round2(balance - totalInvested),
    totalTaxSaved: round2(totalTaxSaved),
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

export type FdType = 'cumulative' | 'nonCumulative'

const FD_TDS_THRESHOLD_REGULAR = 40000
const FD_TDS_THRESHOLD_SENIOR = 50000
const FD_TDS_RATE_WITH_PAN = 10
const FD_TDS_RATE_WITHOUT_PAN = 20
const FD_SENIOR_CITIZEN_RATE_BONUS = 0.5

export interface FdSimulationInput {
  principal: number
  /** The bank's quoted rate, BEFORE any senior-citizen bonus. */
  ratePercent: number
  years: number
  compoundingPerYear: number
  fdType: FdType
  isSeniorCitizen: boolean
  /** TDS is deducted at 10% with PAN on file, 20% without. */
  panRegistered: boolean
}

export interface FdSimulationYearPoint {
  year: number
  value: number
  interestThisYear: number
  tdsThisYear: number
}

export interface FdSimulationResult {
  principal: number
  effectiveRatePercent: number
  maturityValue: number
  totalInterestEarned: number
  totalTds: number
  netInterestAfterTds: number
  /** Only set for non-cumulative FDs: the flat amount paid out each year. */
  annualPayout: number | null
  tdsThresholdApplied: number
  yearly: FdSimulationYearPoint[]
}

/**
 * Extends the plain compound-interest FD formula with the real-world details
 * that change what a depositor actually receives: a senior-citizen rate
 * bonus (+0.5% is the common convention, though it varies slightly by bank),
 * TDS deducted annually on interest above ₹40,000/year (₹50,000 for senior
 * citizens) at 10% with PAN on file or 20% without (Section 194A), and the
 * cumulative-vs-non-cumulative choice — a non-cumulative FD pays interest out
 * each year rather than reinvesting it, so it does NOT compound the way this
 * calculator's plain `calculateFd` does.
 */
export function simulateFd(input: FdSimulationInput): FdSimulationResult {
  const { principal, ratePercent, years, compoundingPerYear, fdType, isSeniorCitizen, panRegistered } = input
  if (principal < 0 || ratePercent < 0 || years <= 0 || compoundingPerYear <= 0)
    throw new Error('inputs must be >= 0, years and compoundingPerYear must be > 0')

  const effectiveRate = ratePercent + (isSeniorCitizen ? FD_SENIOR_CITIZEN_RATE_BONUS : 0)
  const tdsThreshold = isSeniorCitizen ? FD_TDS_THRESHOLD_SENIOR : FD_TDS_THRESHOLD_REGULAR
  const tdsRate = panRegistered ? FD_TDS_RATE_WITH_PAN : FD_TDS_RATE_WITHOUT_PAN

  const yearly: FdSimulationYearPoint[] = []
  let totalInterest = 0
  let totalTds = 0
  const wholeYears = Math.floor(years)

  if (fdType === 'cumulative') {
    const cumulative = calculateFd(principal, effectiveRate, years, compoundingPerYear)
    let previousValue = principal
    for (const point of cumulative.yearly) {
      const interestThisYear = round2(point.value - previousValue)
      const tdsThisYear = interestThisYear > tdsThreshold ? round2((interestThisYear * tdsRate) / 100) : 0
      totalInterest += interestThisYear
      totalTds += tdsThisYear
      yearly.push({ year: point.year, value: point.value, interestThisYear, tdsThisYear })
      previousValue = point.value
    }
    return {
      principal,
      effectiveRatePercent: effectiveRate,
      maturityValue: cumulative.maturityValue,
      totalInterestEarned: round2(totalInterest),
      totalTds: round2(totalTds),
      netInterestAfterTds: round2(totalInterest - totalTds),
      annualPayout: null,
      tdsThresholdApplied: tdsThreshold,
      yearly,
    }
  }

  // Non-cumulative: a flat interest payout each year on the original
  // principal, not reinvested — so the account value itself never grows.
  const annualPayout = round2((principal * effectiveRate) / 100)
  const tdsThisYear = annualPayout > tdsThreshold ? round2((annualPayout * tdsRate) / 100) : 0
  for (let y = 1; y <= wholeYears; y++) {
    totalInterest += annualPayout
    totalTds += tdsThisYear
    yearly.push({ year: y, value: principal, interestThisYear: annualPayout, tdsThisYear })
  }
  return {
    principal,
    effectiveRatePercent: effectiveRate,
    maturityValue: principal,
    totalInterestEarned: round2(totalInterest),
    totalTds: round2(totalTds),
    netInterestAfterTds: round2(totalInterest - totalTds),
    annualPayout,
    tdsThresholdApplied: tdsThreshold,
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

/** Whole completed calendar months between two ISO dates (purchase, then sale). */
export function monthsBetweenDates(purchaseDateISO: string, saleDateISO: string): number {
  const p = new Date(purchaseDateISO)
  const s = new Date(saleDateISO)
  if (Number.isNaN(p.getTime()) || Number.isNaN(s.getTime())) return 0
  let months = (s.getFullYear() - p.getFullYear()) * 12 + (s.getMonth() - p.getMonth())
  if (s.getDate() < p.getDate()) months -= 1
  return Math.max(0, months)
}

export type CapitalAssetType = 'equity' | 'debtFund' | 'other'

export interface GeneralCapitalGainsInput {
  assetType: CapitalAssetType
  purchaseValue: number
  saleValue: number
  holdingMonths: number
  /** Required for `debtFund` only — units bought on or after 1 April 2023 are
   * ALWAYS taxed at slab rate with no LTCG concession at all, regardless of
   * holding period (2023 Finance Act amendment); units bought before that
   * date still get the standard 24-month LT/ST split. Ignored for other
   * asset types. */
  purchaseDateISO?: string
  /** Investor's income-tax slab rate — used for STCG on debt funds and
   * "other" assets (property/gold/unlisted shares) held short-term, and for
   * ALL debt-fund gains bought on/after 1 April 2023. Not used for equity,
   * which has its own flat STCG rate. */
  slabRatePercent: number
  /** Equity only: apply Section 112A grandfathering for units acquired on or
   * before 31 January 2018 — cost of acquisition becomes the higher of actual
   * cost or the 31-Jan-2018 fair market value, capped at the sale price. */
  grandfatherEquityBeforeFeb2018?: boolean
  grandfatherFmv?: number
  /** "Other" assets only: eligible reinvestment under Section 54/54EC/54F,
   * which exempts long-term gains reinvested into a residential house or
   * capital-gains bonds. Only ever reduces LONG-TERM gain, capped at the gain
   * itself — these sections don't apply to short-term gains or to equity. */
  reinvestmentExemption?: number
}

export interface GeneralCapitalGainsResult {
  effectiveCostOfAcquisition: number
  gain: number
  gainType: 'short-term' | 'long-term'
  ltThresholdMonths: number
  exemptionUsed: number
  taxableGain: number
  taxRatePercent: number
  tax: number
  netProceeds: number
}

const OTHER_ASSET_LTCG_RATE = 12.5 // %, without indexation — Budget 2024 simplified rate
const OTHER_ASSET_LT_THRESHOLD_MONTHS = 24 // property, gold, unlisted shares

/**
 * General capital gains calculator spanning three tax treatments:
 * - `equity` (listed shares / equity mutual funds, STT paid): delegates to
 *   `calculateEquityCapitalGainsTax`, with optional Section 112A grandfathering
 *   for pre-2018 holdings applied to the cost of acquisition first.
 * - `debtFund`: units bought on/after 1 April 2023 have NO LTCG concession at
 *   all (2023 Finance Act) — taxed at slab rate regardless of holding period.
 *   Units bought before that date still get the standard 24-month long-term
 *   split, taxed like "other" assets below.
 * - `other` (property, gold, unlisted shares): 24-month long-term threshold;
 *   long-term gains taxed at 12.5% WITHOUT indexation (the Budget 2024
 *   simplified default) after any Section 54/54EC/54F reinvestment exemption;
 *   short-term gains taxed at the investor's slab rate. The pre-23-July-2024
 *   option to instead use 20% WITH indexation is NOT modelled here — it
 *   requires the year-by-year Cost Inflation Index table, which this
 *   calculator does not have verified figures for; a property seller eligible
 *   for that older option should compare both methods with a CA rather than
 *   trust this figure alone.
 */
export function calculateCapitalGainsTax(
  input: GeneralCapitalGainsInput,
): GeneralCapitalGainsResult {
  const {
    assetType,
    purchaseValue,
    saleValue,
    holdingMonths,
    purchaseDateISO,
    slabRatePercent,
    grandfatherEquityBeforeFeb2018,
    grandfatherFmv,
    reinvestmentExemption,
  } = input
  if (purchaseValue < 0 || saleValue < 0 || holdingMonths < 0 || slabRatePercent < 0)
    throw new Error('inputs must be >= 0')

  if (assetType === 'equity') {
    let effectiveCost = purchaseValue
    if (grandfatherEquityBeforeFeb2018 && grandfatherFmv && grandfatherFmv > 0) {
      effectiveCost = Math.max(purchaseValue, Math.min(grandfatherFmv, saleValue))
    }
    const r = calculateEquityCapitalGainsTax(effectiveCost, saleValue, holdingMonths)
    return {
      effectiveCostOfAcquisition: round2(effectiveCost),
      gain: r.gain,
      gainType: r.gainType,
      ltThresholdMonths: 12,
      exemptionUsed: r.exemptionUsed,
      taxableGain: r.taxableGain,
      taxRatePercent: r.taxRatePercent,
      tax: r.tax,
      netProceeds: r.netProceeds,
    }
  }

  const gain = saleValue - purchaseValue
  const positiveGain = Math.max(0, gain)

  if (assetType === 'debtFund') {
    const DEBT_FUND_SLAB_ONLY_CUTOFF = new Date('2023-04-01')
    const purchasedOnOrAfterCutoff =
      !purchaseDateISO || Number.isNaN(new Date(purchaseDateISO).getTime())
        ? true // no date given — default to the current (post-2023) regime
        : new Date(purchaseDateISO) >= DEBT_FUND_SLAB_ONLY_CUTOFF

    if (purchasedOnOrAfterCutoff) {
      // 2023 Finance Act: no LTCG concession at all — always slab rate.
      const tax = (positiveGain * slabRatePercent) / 100
      return {
        effectiveCostOfAcquisition: round2(purchaseValue),
        gain: round2(gain),
        gainType: 'short-term', // taxed as if always short-term, regardless of holding period
        ltThresholdMonths: OTHER_ASSET_LT_THRESHOLD_MONTHS,
        exemptionUsed: 0,
        taxableGain: round2(positiveGain),
        taxRatePercent: slabRatePercent,
        tax: round2(tax),
        netProceeds: round2(saleValue - tax),
      }
    }
    // Purchased before 1 April 2023: grandfathered into the standard
    // 24-month long-term split, same treatment as "other" assets below.
    const isLongTermDebt = holdingMonths > OTHER_ASSET_LT_THRESHOLD_MONTHS
    if (isLongTermDebt) {
      const tax = (positiveGain * OTHER_ASSET_LTCG_RATE) / 100
      return {
        effectiveCostOfAcquisition: round2(purchaseValue),
        gain: round2(gain),
        gainType: 'long-term',
        ltThresholdMonths: OTHER_ASSET_LT_THRESHOLD_MONTHS,
        exemptionUsed: 0,
        taxableGain: round2(positiveGain),
        taxRatePercent: OTHER_ASSET_LTCG_RATE,
        tax: round2(tax),
        netProceeds: round2(saleValue - tax),
      }
    }
    const tax = (positiveGain * slabRatePercent) / 100
    return {
      effectiveCostOfAcquisition: round2(purchaseValue),
      gain: round2(gain),
      gainType: 'short-term',
      ltThresholdMonths: OTHER_ASSET_LT_THRESHOLD_MONTHS,
      exemptionUsed: 0,
      taxableGain: round2(positiveGain),
      taxRatePercent: slabRatePercent,
      tax: round2(tax),
      netProceeds: round2(saleValue - tax),
    }
  }

  // assetType === 'other': property, gold, unlisted shares.
  const isLongTerm = holdingMonths > OTHER_ASSET_LT_THRESHOLD_MONTHS
  if (isLongTerm) {
    const exemptionUsed = Math.min(positiveGain, Math.max(0, reinvestmentExemption ?? 0))
    const taxableGain = Math.max(0, positiveGain - exemptionUsed)
    const tax = (taxableGain * OTHER_ASSET_LTCG_RATE) / 100
    return {
      effectiveCostOfAcquisition: round2(purchaseValue),
      gain: round2(gain),
      gainType: 'long-term',
      ltThresholdMonths: OTHER_ASSET_LT_THRESHOLD_MONTHS,
      exemptionUsed: round2(exemptionUsed),
      taxableGain: round2(taxableGain),
      taxRatePercent: OTHER_ASSET_LTCG_RATE,
      tax: round2(tax),
      netProceeds: round2(saleValue - tax),
    }
  }

  const tax = (positiveGain * slabRatePercent) / 100
  return {
    effectiveCostOfAcquisition: round2(purchaseValue),
    gain: round2(gain),
    gainType: 'short-term',
    ltThresholdMonths: OTHER_ASSET_LT_THRESHOLD_MONTHS,
    exemptionUsed: 0,
    taxableGain: round2(positiveGain),
    taxRatePercent: slabRatePercent,
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
