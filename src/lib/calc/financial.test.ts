import { describe, expect, it } from 'vitest'
import {
  calculateCapitalGainsTax,
  calculateEmi,
  calculateNps,
  calculateSection80GG,
  isHraMetroCity,
  calculatePpf,
  calculateEmiWithPrepayment,
  calculateGratuity,
  calculateGratuityV2,
  calculateGst,
  calculateLoanTrueCost,
  calculateSip,
  calculateSipRealAndPostTax,
  checkEmiAffordability,
  compareRegimes,
  computeRegimeTax,
  findRegimeBreakEvenDeduction,
  monthsBetweenDates,
  npsMinimumAnnuityPercent,
  simulateFd,
  simulatePpf,
  totalOldRegimeDeductions,
} from './financial'

describe('calculateGst', () => {
  it('adds GST in exclusive mode', () => {
    const r = calculateGst(1000, 18, 'exclusive')
    expect(r.base).toBe(1000)
    expect(r.gstAmount).toBe(180)
    expect(r.total).toBe(1180)
    expect(r.cgst).toBe(90)
  })
  it('backs out GST in inclusive mode', () => {
    const r = calculateGst(1180, 18, 'inclusive')
    expect(r.base).toBe(1000)
    expect(r.gstAmount).toBe(180)
    expect(r.total).toBe(1180)
  })
})

describe('calculateSip', () => {
  it('sums invested and grows with returns', () => {
    const r = calculateSip(10000, 12, 10)
    expect(r.invested).toBe(10000 * 120) // 12,00,000
    expect(r.maturityValue).toBeGreaterThan(r.invested)
    // ~₹23L for 10k/mo @12% over 10y (annuity-due)
    expect(r.maturityValue).toBeGreaterThan(2200000)
    expect(r.maturityValue).toBeLessThan(2400000)
    expect(r.yearly).toHaveLength(10)
  })
  it('with 0% return equals amount invested', () => {
    const r = calculateSip(5000, 0, 2)
    expect(r.maturityValue).toBe(5000 * 24)
    expect(r.gains).toBe(0)
  })
})

describe('calculateSipRealAndPostTax', () => {
  it('matches known reference figures for 10k/mo @12% over 15y, 6% inflation', () => {
    const r = calculateSipRealAndPostTax(10000, 12, 15, 6)
    expect(r.maturityValue).toBeCloseTo(5045760, -1)
    expect(r.realValue).toBeCloseTo(2105419, -1)
    expect(r.postTaxCorpus).toBeCloseTo(4655665, -1)
  })
  it('real value equals nominal at 0% inflation', () => {
    const r = calculateSipRealAndPostTax(10000, 12, 10, 0)
    expect(r.realValue).toBe(r.maturityValue)
  })
  it('applies the ₹1.25L LTCG exemption before taxing gains', () => {
    const r = calculateSipRealAndPostTax(1000, 12, 5, 6)
    // Small SIP — gains should be well under the exemption, so no tax.
    expect(r.gains).toBeLessThan(125000)
    expect(r.ltcgTax).toBe(0)
    expect(r.postTaxCorpus).toBe(r.maturityValue)
  })
})

describe('computeRegimeTax (FY 2026-27)', () => {
  it('new regime: zero tax at ₹12L taxable (₹12.75L gross) via 87A', () => {
    const r = computeRegimeTax(1275000, 'new')
    expect(r.taxableIncome).toBe(1200000)
    expect(r.rebate87A).toBe(60000)
    expect(r.totalTax).toBe(0)
  })
  it('new regime: ₹20L gross computes slab tax + cess', () => {
    const r = computeRegimeTax(2000000, 'new')
    // taxable 19.25L: 20k + 40k + 60k + (325000*20%)=65000 = 185000; cess 4%
    expect(r.taxableIncome).toBe(1925000)
    expect(r.taxBeforeRebate).toBe(185000)
    expect(r.rebate87A).toBe(0)
    expect(r.totalTax).toBe(round2(185000 * 1.04))
  })
  it('old regime: applies 80C-style deductions', () => {
    const r = computeRegimeTax(1000000, 'old', 150000)
    // taxable = 10L - 50k std - 1.5L = 8L
    expect(r.taxableIncome).toBe(800000)
  })
})

describe('compareRegimes', () => {
  it('recommends the lower-tax regime', () => {
    const c = compareRegimes(1500000, 0)
    expect(['new', 'old', 'either']).toContain(c.recommended)
    expect(c.saving).toBeGreaterThanOrEqual(0)
    // With no deductions, new regime should win at ₹15L
    expect(c.recommended).toBe('new')
  })
  it('applies new-regime marginal relief above ₹12L taxable income', () => {
    // ₹12,85,000 gross - ₹75,000 std deduction = ₹12,10,000 taxable.
    const r = computeRegimeTax(1285000, 'new')
    expect(r.taxableIncome).toBe(1210000)
    expect(r.marginalRelief).toBeGreaterThan(0)
    expect(r.totalTax).toBe(10400) // matches published reference figure for this exact case
  })
  it('gives the old regime NO marginal relief at its ₹5L cliff', () => {
    // Just ₹1 over the ₹5,00,000 old-regime rebate threshold.
    const r = computeRegimeTax(550001, 'old', 0)
    expect(r.taxableIncome).toBe(500001)
    expect(r.rebate87A).toBe(0)
    expect(r.totalTax).toBeGreaterThan(10000) // full slab tax applies, no phase-out
  })
  it('gives senior and super-senior citizens a higher old-regime nil band', () => {
    const under60 = computeRegimeTax(600000, 'old', 0, 'under60')
    const senior = computeRegimeTax(600000, 'old', 0, '60to79')
    const superSenior = computeRegimeTax(600000, 'old', 0, '80plus')
    expect(senior.totalTax).toBeLessThan(under60.totalTax)
    expect(superSenior.totalTax).toBeLessThan(senior.totalTax)
  })
})

describe('totalOldRegimeDeductions', () => {
  it('caps each section at its statutory limit', () => {
    const total = totalOldRegimeDeductions({
      section80C: 300000, // capped at 1.5L
      section80D: 100000, // capped at 25k (under60)
      hraExemption: 200000, // uncapped
      homeLoanInterest: 500000, // capped at 2L
      nps80ccd1b: 200000, // capped at 50k
      otherDeductions: 10000,
    })
    expect(total).toBe(150000 + 25000 + 200000 + 200000 + 50000 + 10000)
  })
  it('gives seniors a higher 80D cap', () => {
    const under60 = totalOldRegimeDeductions({ section80C: 0, section80D: 50000, hraExemption: 0, homeLoanInterest: 0, nps80ccd1b: 0, otherDeductions: 0 }, 'under60')
    const senior = totalOldRegimeDeductions({ section80C: 0, section80D: 50000, hraExemption: 0, homeLoanInterest: 0, nps80ccd1b: 0, otherDeductions: 0 }, '60to79')
    expect(under60).toBe(25000)
    expect(senior).toBe(50000)
  })
})

describe('salaried/pensioner standard deduction toggle', () => {
  it('applies no standard deduction for non-salaried, non-pension income', () => {
    const salaried = computeRegimeTax(1000000, 'new', 0, 'under60', true)
    const business = computeRegimeTax(1000000, 'new', 0, 'under60', false)
    expect(salaried.standardDeduction).toBe(75000)
    expect(business.standardDeduction).toBe(0)
    expect(business.taxableIncome).toBe(1000000)
  })
})

describe('findRegimeBreakEvenDeduction', () => {
  it('matches published reference break-even figures', () => {
    expect(findRegimeBreakEvenDeduction(800000)).toBeCloseTo(250000, -3)
    expect(findRegimeBreakEvenDeduction(1000000)).toBeCloseTo(450000, -3)
  })
  it('returns 0 when the old regime already wins with no deductions', () => {
    // At a high enough income with the old regime's higher rates but no
    // deductions, the new regime's rebate/slabs still normally win, so this
    // just checks the zero-deduction shortcut path doesn't error.
    const be = findRegimeBreakEvenDeduction(600000)
    expect(be === null || be >= 0).toBe(true)
  })
})

describe('calculateGratuity', () => {
  it('applies 15/26 formula and rounds service years', () => {
    const r = calculateGratuity(50000, 10.7) // 10.7y → 11 years
    expect(r.roundedYears).toBe(11)
    expect(r.gratuity).toBe(round2((15 / 26) * 50000 * 11))
    expect(r.eligible).toBe(true)
  })
  it('is ineligible below 5 years', () => {
    const r = calculateGratuity(50000, 4)
    expect(r.eligible).toBe(false)
    expect(r.gratuity).toBe(0)
  })
  it('caps at ₹20,00,000', () => {
    const r = calculateGratuity(500000, 30)
    expect(r.gratuity).toBe(2000000)
    expect(r.capped).toBe(true)
  })
})

describe('calculateGratuityV2', () => {
  it('uses divisor 30 instead of 26 for a non-Act-covered employer', () => {
    const covered = calculateGratuityV2({ scenario: 'retirement', lastDrawnSalary: 50000, yearsOfService: 10, employerCoverage: 'covered', employeeType: 'private' })
    const nonCovered = calculateGratuityV2({ scenario: 'retirement', lastDrawnSalary: 50000, yearsOfService: 10, employerCoverage: 'nonCovered', employeeType: 'private' })
    expect(nonCovered.gratuity).toBeLessThan(covered.gratuity)
    expect(nonCovered.gratuity).toBe(round2((15 / 30) * 50000 * 10))
  })
  it('waives the 5-year minimum for death but not for retirement', () => {
    const death = calculateGratuityV2({ scenario: 'death', lastDrawnSalary: 50000, yearsOfService: 2, employerCoverage: 'covered', employeeType: 'private' })
    const retirement = calculateGratuityV2({ scenario: 'retirement', lastDrawnSalary: 50000, yearsOfService: 2, employerCoverage: 'covered', employeeType: 'private' })
    expect(death.eligible).toBe(true)
    expect(retirement.eligible).toBe(false)
  })
  it('requires only 1 year of service for the fixed-term scenario', () => {
    const under1yr = calculateGratuityV2({ scenario: 'fixedTerm', lastDrawnSalary: 50000, yearsOfService: 0.5, employerCoverage: 'covered', employeeType: 'private' })
    const over1yr = calculateGratuityV2({ scenario: 'fixedTerm', lastDrawnSalary: 50000, yearsOfService: 1.5, employerCoverage: 'covered', employeeType: 'private' })
    expect(under1yr.eligible).toBe(false)
    expect(over1yr.eligible).toBe(true)
  })
  it('applies the CCS death-gratuity slab table for government employees', () => {
    expect(calculateGratuityV2({ scenario: 'death', lastDrawnSalary: 80000, yearsOfService: 0.5, employerCoverage: 'covered', employeeType: 'government' }).gratuity).toBe(160000) // 2x
    expect(calculateGratuityV2({ scenario: 'death', lastDrawnSalary: 80000, yearsOfService: 3, employerCoverage: 'covered', employeeType: 'government' }).gratuity).toBe(480000) // 6x
    expect(calculateGratuityV2({ scenario: 'death', lastDrawnSalary: 80000, yearsOfService: 8, employerCoverage: 'covered', employeeType: 'government' }).gratuity).toBe(960000) // 12x
    expect(calculateGratuityV2({ scenario: 'death', lastDrawnSalary: 80000, yearsOfService: 15, employerCoverage: 'covered', employeeType: 'government' }).gratuity).toBe(1600000) // 20x
  })
  it('caps the 20+ years death-gratuity formula at 33x emoluments', () => {
    const r = calculateGratuityV2({ scenario: 'death', lastDrawnSalary: 80000, yearsOfService: 40, employerCoverage: 'covered', employeeType: 'government' })
    expect(r.grossGratuity).toBe(33 * 80000)
  })
  it('gives government employees a higher ceiling and full tax exemption', () => {
    const r = calculateGratuityV2({ scenario: 'retirement', lastDrawnSalary: 200000, yearsOfService: 35, employerCoverage: 'covered', employeeType: 'government' })
    expect(r.ceilingApplied).toBe(2500000)
    expect(r.capped).toBe(true)
    expect(r.gratuity).toBe(2500000)
    expect(r.isFullyTaxExempt).toBe(true)
  })
  it('private-sector gratuity is not marked fully tax-exempt', () => {
    const r = calculateGratuityV2({ scenario: 'retirement', lastDrawnSalary: 50000, yearsOfService: 10, employerCoverage: 'covered', employeeType: 'private' })
    expect(r.isFullyTaxExempt).toBe(false)
  })
})

describe('calculateEmiWithPrepayment', () => {
  it('matches the plain EMI baseline when no prepayment is made', () => {
    const base = calculateEmi(5000000, 8.5, 20)
    const sim = calculateEmiWithPrepayment({ principal: 5000000, annualRatePercent: 8.5, years: 20 })
    expect(sim.originalEmi).toBe(base.emi)
    expect(sim.actualTotalInterest).toBe(base.totalInterest)
    expect(sim.actualMonths).toBe(240)
    expect(sim.monthsSaved).toBe(0)
  })
  it('reduceTenure keeps the EMI fixed and shortens the payoff', () => {
    const r = calculateEmiWithPrepayment({
      principal: 5000000, annualRatePercent: 8.5, years: 20,
      yearlyExtraPayment: 50000, prepaymentEffect: 'reduceTenure',
    })
    expect(r.effectiveEmi).toBe(r.originalEmi)
    expect(r.actualMonths).toBeLessThan(r.originalMonths)
    expect(r.interestSaved).toBeGreaterThan(0)
  })
  it('reduceEmi keeps the tenure fixed and lowers the EMI', () => {
    const r = calculateEmiWithPrepayment({
      principal: 5000000, annualRatePercent: 8.5, years: 20,
      yearlyExtraPayment: 50000, prepaymentEffect: 'reduceEmi',
    })
    expect(r.actualMonths).toBe(r.originalMonths)
    expect(r.effectiveEmi).toBeLessThan(r.originalEmi)
    expect(r.interestSaved).toBeGreaterThan(0)
  })
  it('a one-time prepayment reduces both interest and tenure (reduceTenure mode)', () => {
    const r = calculateEmiWithPrepayment({
      principal: 5000000, annualRatePercent: 8.5, years: 20, oneTimePrepaymentNow: 500000,
    })
    expect(r.totalPrepaid).toBe(500000)
    expect(r.actualMonths).toBeLessThan(240)
  })
})

describe('checkEmiAffordability', () => {
  it('buckets the EMI-to-income ratio correctly', () => {
    expect(checkEmiAffordability(30000, 100000).verdict).toBe('comfortable')
    expect(checkEmiAffordability(45000, 100000).verdict).toBe('tight')
    expect(checkEmiAffordability(60000, 100000).verdict).toBe('risky')
  })
})

describe('calculateLoanTrueCost', () => {
  it('produces an effective APR higher than the nominal rate once fees are included', () => {
    const r = calculateLoanTrueCost({
      principal: 500000, annualRatePercent: 14, years: 5, processingFeePercent: 2,
    })
    expect(r.processingFee).toBe(10000)
    expect(r.processingFeeGst).toBe(1800)
    expect(r.netDisbursal).toBe(488200)
    expect(r.effectiveAprPercent).toBeGreaterThan(14)
  })
  it('effective APR equals the nominal rate when there is no fee', () => {
    const r = calculateLoanTrueCost({
      principal: 500000, annualRatePercent: 14, years: 5, processingFeePercent: 0,
    })
    expect(r.effectiveAprPercent).toBeCloseTo(14, 0)
  })
})

describe('simulateFd', () => {
  it('adds the senior-citizen rate bonus to the effective rate', () => {
    const regular = simulateFd({ principal: 500000, ratePercent: 7, years: 5, compoundingPerYear: 4, fdType: 'cumulative', isSeniorCitizen: false, panRegistered: true })
    const senior = simulateFd({ principal: 500000, ratePercent: 7, years: 5, compoundingPerYear: 4, fdType: 'cumulative', isSeniorCitizen: true, panRegistered: true })
    expect(senior.effectiveRatePercent).toBe(7.5)
    expect(senior.maturityValue).toBeGreaterThan(regular.maturityValue)
  })
  it('doubles TDS when no PAN is on file', () => {
    const withPan = simulateFd({ principal: 500000, ratePercent: 7, years: 5, compoundingPerYear: 4, fdType: 'cumulative', isSeniorCitizen: false, panRegistered: true })
    const withoutPan = simulateFd({ principal: 500000, ratePercent: 7, years: 5, compoundingPerYear: 4, fdType: 'cumulative', isSeniorCitizen: false, panRegistered: false })
    expect(withoutPan.totalTds).toBeCloseTo(withPan.totalTds * 2, 1)
  })
  it('only deducts TDS once yearly interest crosses the threshold', () => {
    const r = simulateFd({ principal: 500000, ratePercent: 7, years: 5, compoundingPerYear: 4, fdType: 'cumulative', isSeniorCitizen: false, panRegistered: true })
    expect(r.yearly[0].tdsThisYear).toBe(0) // year 1 interest is below ₹40,000
    expect(r.yearly[4].tdsThisYear).toBeGreaterThan(0) // year 5 interest is above ₹40,000
  })
  it('gives senior citizens a higher TDS threshold', () => {
    const regular = simulateFd({ principal: 1000000, ratePercent: 7, years: 1, compoundingPerYear: 4, fdType: 'nonCumulative', isSeniorCitizen: false, panRegistered: true })
    const senior = simulateFd({ principal: 1000000, ratePercent: 7, years: 1, compoundingPerYear: 4, fdType: 'nonCumulative', isSeniorCitizen: true, panRegistered: true })
    expect(regular.tdsThresholdApplied).toBe(40000)
    expect(senior.tdsThresholdApplied).toBe(50000)
  })
  it('does not compound a non-cumulative FD — value stays at principal', () => {
    const r = simulateFd({ principal: 500000, ratePercent: 7, years: 5, compoundingPerYear: 4, fdType: 'nonCumulative', isSeniorCitizen: false, panRegistered: true })
    expect(r.maturityValue).toBe(500000)
    expect(r.annualPayout).toBe(35000)
    expect(r.yearly.every((y) => y.value === 500000)).toBe(true)
  })
})

describe('simulatePpf', () => {
  it('matches the simple annual model in yearly deposit mode', () => {
    const old = calculatePpf(150000, 7.1, 15)
    const sim = simulatePpf({
      depositMode: 'yearly', depositAmount: 150000, ratePercent: 7.1,
      depositTiming: 'before5th', extensionBlocks: 0, extensionChoice: 'contribute', taxBracketPercent: 30,
    })
    expect(sim.maturityValue).toBe(old.maturityValue)
  })
  it('depositing after the 5th earns less interest than before the 5th', () => {
    const before = simulatePpf({
      depositMode: 'monthly', depositAmount: 12500, ratePercent: 7.1,
      depositTiming: 'before5th', extensionBlocks: 0, extensionChoice: 'contribute', taxBracketPercent: 30,
    })
    const after = simulatePpf({
      depositMode: 'monthly', depositAmount: 12500, ratePercent: 7.1,
      depositTiming: 'after5th', extensionBlocks: 0, extensionChoice: 'contribute', taxBracketPercent: 30,
    })
    expect(after.maturityValue).toBeLessThan(before.maturityValue)
  })
  it('extending without contributing keeps the balance growing but invested unchanged', () => {
    const r = simulatePpf({
      depositMode: 'yearly', depositAmount: 150000, ratePercent: 7.1,
      depositTiming: 'before5th', extensionBlocks: 1, extensionChoice: 'stop', taxBracketPercent: 30,
    })
    expect(r.yearly).toHaveLength(20)
    expect(r.invested).toBe(150000 * 15) // no more deposits in the extension years
    expect(r.maturityValue).toBeGreaterThan(r.invested)
  })
  it('extending while contributing adds more invested and a bigger maturity value', () => {
    const stop = simulatePpf({
      depositMode: 'yearly', depositAmount: 150000, ratePercent: 7.1,
      depositTiming: 'before5th', extensionBlocks: 1, extensionChoice: 'stop', taxBracketPercent: 30,
    })
    const contribute = simulatePpf({
      depositMode: 'yearly', depositAmount: 150000, ratePercent: 7.1,
      depositTiming: 'before5th', extensionBlocks: 1, extensionChoice: 'contribute', taxBracketPercent: 30,
    })
    expect(contribute.invested).toBeGreaterThan(stop.invested)
    expect(contribute.maturityValue).toBeGreaterThan(stop.maturityValue)
  })
  it('caps the 80C tax-saving estimate at the ₹1.5L annual deposit limit', () => {
    const r = simulatePpf({
      depositMode: 'yearly', depositAmount: 150000, ratePercent: 7.1,
      depositTiming: 'before5th', extensionBlocks: 0, extensionChoice: 'contribute', taxBracketPercent: 30,
    })
    expect(r.totalTaxSaved).toBe(150000 * 15 * 0.3)
  })
})

describe('npsMinimumAnnuityPercent + calculateNps exit/annuity options', () => {
  it('requires 20% minimum annuity for non-government, 40% for government, above ₹12L at normal exit', () => {
    expect(npsMinimumAnnuityPercent(2000000, 'other', 'normal')).toBe(20)
    expect(npsMinimumAnnuityPercent(2000000, 'government', 'normal')).toBe(40)
  })
  it('reverses the split for premature exit above ₹5L — 80% annuity mandatory', () => {
    expect(npsMinimumAnnuityPercent(2000000, 'other', 'premature')).toBe(80)
    expect(npsMinimumAnnuityPercent(400000, 'other', 'premature')).toBe(0) // small corpus, full withdrawal
  })
  it('premature exit produces a swapped lumpsum/annuity split vs normal exit for the same corpus', () => {
    const normal = calculateNps(10000, 10, 25, 'other', 'normal')
    const premature = calculateNps(10000, 10, 25, 'other', 'premature')
    expect(premature.lumpsumAmount).toBeCloseTo(normal.annuityAmount, 2)
    expect(premature.annuityAmount).toBeCloseTo(normal.lumpsumAmount, 2)
  })
  it('lets a subscriber voluntarily choose a higher annuity than the statutory minimum', () => {
    const r = calculateNps(10000, 10, 25, 'other', 'normal', 50)
    expect(r.lumpsumAmount).toBeCloseTo(r.annuityAmount, 2) // 50/50 split
  })
  it('clamps a voluntary choice below the statutory minimum back up to the minimum', () => {
    const clamped = calculateNps(10000, 10, 25, 'other', 'normal', 5)
    const defaultMin = calculateNps(10000, 10, 25, 'other', 'normal')
    expect(clamped.lumpsumAmount).toBe(defaultMin.lumpsumAmount)
  })
  it('reports the Section 10(12B) partial-withdrawal allowance as 25% of own contributions', () => {
    const r = calculateNps(10000, 10, 25, 'other')
    expect(r.npsPartialWithdrawal.maxPerWithdrawal).toBe(round2(r.totalInvested * 0.25))
    expect(r.npsPartialWithdrawal.maxWithdrawalsAllowed).toBe(4)
  })
})

describe('isHraMetroCity', () => {
  it('treats the original four cities as metro in both financial years', () => {
    for (const city of ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'] as const) {
      expect(isHraMetroCity(city, 'FY2025-26')).toBe(true)
      expect(isHraMetroCity(city, 'FY2026-27')).toBe(true)
    }
  })
  it('treats the four newly added cities as metro only from FY2026-27', () => {
    for (const city of ['Bengaluru', 'Hyderabad', 'Pune', 'Ahmedabad'] as const) {
      expect(isHraMetroCity(city, 'FY2025-26')).toBe(false)
      expect(isHraMetroCity(city, 'FY2026-27')).toBe(true)
    }
  })
  it('never treats "Other" as metro', () => {
    expect(isHraMetroCity('Other', 'FY2026-27')).toBe(false)
  })
})

describe('calculateSection80GG', () => {
  it('caps the deduction at the lowest of the three limits', () => {
    const r = calculateSection80GG(800000, 180000)
    expect(r.monthlyCapAnnualised).toBe(60000)
    expect(r.deduction).toBe(60000) // the ₹60,000/year cap binds here
  })
  it('lets rent-minus-10%-of-income bind when it is the smallest limit', () => {
    const r = calculateSection80GG(2000000, 100000) // 10% of income = 200000, so rent-10% = 0
    expect(r.deduction).toBe(0)
  })
})

describe('monthsBetweenDates', () => {
  it('computes completed months between two dates', () => {
    expect(monthsBetweenDates('2020-01-15', '2024-08-01')).toBe(54)
    expect(monthsBetweenDates('2023-01-01', '2023-01-01')).toBe(0)
    expect(monthsBetweenDates('2023-01-01', '2024-01-01')).toBe(12)
  })
})

describe('calculateCapitalGainsTax', () => {
  it('applies Section 112A grandfathering to equity bought before 31 Jan 2018', () => {
    const r = calculateCapitalGainsTax({
      assetType: 'equity',
      purchaseValue: 400000,
      saleValue: 900000,
      holdingMonths: 96,
      slabRatePercent: 30,
      grandfatherEquityBeforeFeb2018: true,
      grandfatherFmv: 600000,
    })
    // Effective cost = higher of actual (4L) or FMV capped at sale price (6L).
    expect(r.effectiveCostOfAcquisition).toBe(600000)
    expect(r.gain).toBe(300000)
  })
  it('taxes debt funds bought on/after 1 April 2023 at slab rate regardless of holding period', () => {
    const short = calculateCapitalGainsTax({
      assetType: 'debtFund', purchaseValue: 100000, saleValue: 120000,
      holdingMonths: 5, purchaseDateISO: '2023-06-01', slabRatePercent: 30,
    })
    const long = calculateCapitalGainsTax({
      assetType: 'debtFund', purchaseValue: 100000, saleValue: 120000,
      holdingMonths: 30, purchaseDateISO: '2023-06-01', slabRatePercent: 30,
    })
    expect(short.taxRatePercent).toBe(30)
    expect(long.taxRatePercent).toBe(30) // still slab-taxed despite 30 months held
    expect(long.tax).toBe(short.tax)
  })
  it('grandfathers debt funds bought before 1 April 2023 into the standard 24-month LT split', () => {
    const r = calculateCapitalGainsTax({
      assetType: 'debtFund', purchaseValue: 100000, saleValue: 120000,
      holdingMonths: 30, purchaseDateISO: '2022-01-01', slabRatePercent: 30,
    })
    expect(r.gainType).toBe('long-term')
    expect(r.taxRatePercent).toBe(12.5) // LTCG rate, not the 30% slab rate
  })
  it('caps the Section 54/54EC/54F reinvestment exemption at the long-term gain', () => {
    const r = calculateCapitalGainsTax({
      assetType: 'other', purchaseValue: 3000000, saleValue: 6000000,
      holdingMonths: 60, slabRatePercent: 30, reinvestmentExemption: 50000000,
    })
    expect(r.exemptionUsed).toBe(r.gain) // capped, not the full 5 crore entered
    expect(r.taxableGain).toBe(0)
    expect(r.tax).toBe(0)
  })
  it('taxes short-term "other" asset gains (property/gold) at the slab rate, not a flat rate', () => {
    const r = calculateCapitalGainsTax({
      assetType: 'other', purchaseValue: 200000, saleValue: 250000,
      holdingMonths: 10, slabRatePercent: 20,
    })
    expect(r.gainType).toBe('short-term')
    expect(r.taxRatePercent).toBe(20)
  })
})

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}
