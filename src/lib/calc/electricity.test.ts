import { describe, expect, it } from 'vitest'
import type { TariffFile } from '../../data/tariffs/_schema'
import {
  applySubsidy,
  calculateFullBill,
  calculateSlabCharges,
  computeBill,
  findMaxUnitsForBudget,
  getTariff,
  subsidyCliffUnits,
  tariffBeforeNewSchemes,
} from './electricity'

// A four-band telescopic fixture reused across the primitive slab/subsidy tests.
// Not TNPDCL's live tariff — that is pinned to official results further down.
const TNEB_SLABS = [
  { minUnits: 0, maxUnits: 100, ratePerUnit: 2.25 },
  { minUnits: 101, maxUnits: 200, ratePerUnit: 3.5 },
  { minUnits: 201, maxUnits: 500, ratePerUnit: 4.8 },
  { minUnits: 501, maxUnits: null, ratePerUnit: 6.4 },
]

describe('calculateSlabCharges (telescopic)', () => {
  it('splits 250 units across the first three slabs', () => {
    const r = calculateSlabCharges(250, TNEB_SLABS)
    expect(r.lines.map((l) => l.unitsInSlab)).toEqual([100, 100, 50, 0])
    // 100*2.25 + 100*3.5 + 50*4.8 = 225 + 350 + 240
    expect(r.subtotal).toBe(815)
  })

  it('handles 0 units', () => {
    const r = calculateSlabCharges(0, TNEB_SLABS)
    expect(r.subtotal).toBe(0)
    expect(r.lines.every((l) => l.unitsInSlab === 0)).toBe(true)
  })

  it('bills the open-ended top slab above 500', () => {
    const r = calculateSlabCharges(600, TNEB_SLABS)
    expect(r.lines[3].unitsInSlab).toBe(100) // 501..600
    expect(r.lines[3].charge).toBe(640)
  })
})

describe('applySubsidy', () => {
  it('values 100 free units at the true first-slab rate (₹2.25)', () => {
    const slab = calculateSlabCharges(250, TNEB_SLABS)
    const r = applySubsidy(
      250,
      slab,
      [
        {
          schemeName: '100 Units Free',
          minUnits: 0,
          maxUnits: 100,
          discountType: 'free',
          discountValue: 100,
          eligibility: 'eligible/BPL domestic',
        },
      ],
      'eligible/BPL domestic',
    )
    expect(r.subsidyAmount).toBe(225) // 100 × 2.25, NOT a blended average
    expect(r.adjustedCharge).toBe(590) // 815 − 225
    expect(r.appliedSchemes).toEqual(['100 Units Free'])
  })

  it('applies nothing when the consumer is not eligible', () => {
    const slab = calculateSlabCharges(250, TNEB_SLABS)
    const r = applySubsidy(
      250,
      slab,
      [
        {
          schemeName: '100 Units Free',
          minUnits: 0,
          maxUnits: 100,
          discountType: 'free',
          discountValue: 100,
          eligibility: 'eligible/BPL domestic',
        },
      ],
      undefined,
    )
    expect(r.subsidyAmount).toBe(0)
    expect(r.adjustedCharge).toBe(815)
  })
})

describe('calculateFullBill — TNEB residential (bi-monthly)', () => {
  // Every expected total below is the "Net Amount" returned by TNPDCL's own
  // bill calculator (tnebnet.org/awp/tariffMaster, tariff LA1A, bi-monthly)
  // on 2026-10-10 — not a figure derived from this engine.
  const OFFICIAL: [units: number, netAmount: number][] = [
    [100, 0],
    [200, 0],
    [201, 5],
    [300, 470],
    [400, 940],
    [401, 946],
    [500, 1570],
    [501, 2048],
    [600, 2880],
    [601, 2889],
    [800, 4770],
    [801, 4781],
    [1000, 6870],
    [1001, 6882],
    [1200, 9180],
  ]

  it.each(OFFICIAL)('%i units bills at the official ₹%i', (units, expected) => {
    const bill = calculateFullBill({
      discomCode: 'TNEB',
      connectionType: 'residential',
      unitsConsumed: units,
    })
    expect(bill.total).toBe(expected)
    expect(bill.fixedCharge.amount).toBe(0)
    expect(bill.fuelCostAdjustment.amount).toBe(0)
    expect(bill.electricityDuty.amount).toBe(0)
  })

  it('gives 200 free units up to 500 units and only 100 above', () => {
    const at500 = calculateFullBill({
      discomCode: 'TNEB',
      connectionType: 'residential',
      unitsConsumed: 500,
    })
    const at501 = calculateFullBill({
      discomCode: 'TNEB',
      connectionType: 'residential',
      unitsConsumed: 501,
    })
    // 200 units × ₹4.70 waived at 500; only the first 100 at 501.
    expect(at500.subsidy.subsidyAmount).toBe(940)
    expect(at500.subsidy.appliedSchemes).toHaveLength(2)
    expect(at501.subsidy.subsidyAmount).toBe(470)
    expect(at501.subsidy.appliedSchemes).toHaveLength(1)
    // One extra unit costs ₹478 more — the cliff the page warns about.
    expect(at501.total - at500.total).toBe(478)
    expect(subsidyCliffUnits(getTariff('TNEB'))).toBe(500)
  })

  it('exposes the monthly equivalent and the pre-May-2026 bill', () => {
    const tariff = getTariff('TNEB')
    const bill = computeBill(tariff, {
      connectionType: 'residential',
      unitsConsumed: 300,
    })
    expect(bill.monthlyEquivalent).toEqual({ total: 235, units: 150 })
    expect(bill.notes.join(' ')).toMatch(/bi-monthly/i)

    // Before 10 May 2026 only the first 100 units were free: 200 × ₹4.70.
    const before = tariffBeforeNewSchemes(tariff)
    expect(before).not.toBeNull()
    expect(
      computeBill(before!, { connectionType: 'residential', unitsConsumed: 300 })
        .total,
    ).toBe(940)
  })
})

describe('computeBill — commercial connection (no subsidy)', () => {
  // tneb.json only defines residential, so this test injects a commercial
  // fixture directly into the pure core — demonstrating the framework/data
  // decoupling the engine is designed for.
  const commercialTariff: TariffFile = {
    discomCode: 'TEST-COM',
    discomName: 'Test Commercial DISCOM',
    state: 'Testland',
    billingCycle: 'monthly',
    connectionTypes: [
      {
        connectionType: 'commercial',
        slabs: [
          { minUnits: 0, maxUnits: 100, ratePerUnit: 6.0 },
          { minUnits: 101, maxUnits: null, ratePerUnit: 8.0 },
        ],
        fixedCharge: { basis: 'perLoad', perKW: 50 },
        meterRent: 20,
      },
    ],
    fuelCostAdjustment: 0.5,
    electricityDutyPercent: 5,
    subsidySchemes: [],
    effectiveFrom: '2026-04-01',
    sourceUrl: 'https://example.com/test-order',
    lastVerified: '2026-08-29',
    verifiedBy: 'test fixture',
  }

  it('300-unit commercial bill: slabs + FCA + perLoad fixed + duty + meter rent, no subsidy', () => {
    const bill = computeBill(commercialTariff, {
      connectionType: 'commercial',
      unitsConsumed: 300,
      sanctionedLoad: 5,
      phase: 'three',
    })

    expect(bill.energyChargeGross).toBe(2200) // 100*6 + 200*8
    expect(bill.subsidy.subsidyAmount).toBe(0)
    expect(bill.subsidy.appliedSchemes).toEqual([])
    expect(bill.fuelCostAdjustment.amount).toBe(150) // 0.5 × 300
    expect(bill.fixedCharge.amount).toBe(250) // ₹50/kW × 5 kW
    expect(bill.electricityDuty.amount).toBe(110) // 5% of 2200
    expect(bill.meterRent).toBe(20)
    expect(bill.total).toBe(2730) // 2200 + 150 + 250 + 110 + 20

    // Monthly DISCOM → no monthly-equivalent split.
    expect(bill.monthlyEquivalent).toBeNull()
  })
})

describe('findMaxUnitsForBudget', () => {
  const tneb = getTariff('TNEB')

  it('finds units whose bill sits at or just under the budget', () => {
    const { maxUnits, bill } = findMaxUnitsForBudget(tneb, 777.5, {
      connectionType: 'residential',
      phase: 'single',
      eligibility: 'eligible/BPL domestic',
    })
    // 200 free units + 165 units × ₹4.70 = ₹775.50, billed as ₹776; one more
    // unit (₹780) would exceed the budget.
    expect(maxUnits).toBe(365)
    expect(bill.total).toBeLessThanOrEqual(777.5)
  })

  it('one more unit would exceed the budget', () => {
    const { maxUnits } = findMaxUnitsForBudget(tneb, 777.5, {
      connectionType: 'residential',
      phase: 'single',
      eligibility: 'eligible/BPL domestic',
    })
    const oneMore = computeBill(tneb, {
      connectionType: 'residential',
      unitsConsumed: maxUnits + 1,
      phase: 'single',
      eligibility: 'eligible/BPL domestic',
    })
    expect(oneMore.total).toBeGreaterThan(777.5)
  })

  it('a tiny budget still covers the free units', () => {
    const { maxUnits, bill } = findMaxUnitsForBudget(tneb, 5, {
      connectionType: 'residential',
      phase: 'single',
    })
    // The first 200 units are free; the 201st costs ₹4.70, billed as ₹5.
    expect(maxUnits).toBe(201)
    expect(bill.total).toBe(5)
  })
})
