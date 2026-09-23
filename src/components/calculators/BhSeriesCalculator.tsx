'use client'

import { useMemo, useState } from 'react'
import { calculateBhSeriesTax, type BhSeriesFuelType } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

const FUEL_OPTIONS: { value: BhSeriesFuelType; label: string; icon: string }[] = [
  { value: 'petrol', label: 'Petrol / CNG', icon: '⛽' },
  { value: 'diesel', label: 'Diesel', icon: '🛢️' },
  { value: 'electric', label: 'Electric', icon: '🔋' },
]

export default function BhSeriesCalculator() {
  const [invoicePrice, setInvoicePrice] = useState(1200000)
  const [fuelType, setFuelType] = useState<BhSeriesFuelType>('petrol')
  const [yearsOfOwnership, setYearsOfOwnership] = useState(14)

  const result = useMemo(
    () => calculateBhSeriesTax(Math.max(1, invoicePrice), fuelType, Math.max(1, yearsOfOwnership)),
    [invoicePrice, fuelType, yearsOfOwnership],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🚗" title="BH Series Calculator" subtitle="Bharat Series vehicle registration tax, MoRTH's national formula" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="bh-price" className="mb-1.5 block text-sm font-medium text-ash">
            Invoice price, excluding GST (₹)
          </label>
          <input
            id="bh-price"
            type="number"
            min={0}
            value={invoicePrice}
            onChange={(e) => setInvoicePrice(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <OptionCardGroup legend="Fuel type" options={FUEL_OPTIONS} value={fuelType} onChange={setFuelType} columns={3} />

        <div>
          <label htmlFor="bh-years" className="mb-1.5 block text-sm font-medium text-ash">
            Years of ownership
          </label>
          <input
            id="bh-years"
            type="number"
            min={1}
            max={30}
            value={yearsOfOwnership}
            onChange={(e) => setYearsOfOwnership(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">First 14 years are paid in 2-year blocks; after that, tax is paid annually at roughly half the biennial rate.</p>
        </div>

        <CalculatorCta label="Calculate BH-Series Tax" tone="financial" disclaimer="Verified against MoRTH Rule 51B — confirm the exact figure with your RTO before paying." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Tax per 2-year block ({result.slabPercent}% slab)</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.biennialTax)}
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Applicable slab</td>
                <td className="py-1.5 text-right tabular-nums">{result.slabPercent}%</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Total tax payments over {yearsOfOwnership} years</td>
                <td className="py-1.5 text-right tabular-nums">{result.totalPayments}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">Total tax over {yearsOfOwnership} years</td>
                <td className="py-2 text-right tabular-nums">{formatINR(result.totalTaxOverLifetime)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
