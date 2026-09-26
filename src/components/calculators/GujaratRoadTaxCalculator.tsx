'use client'

import { useMemo, useState } from 'react'
import { calculateBhSeriesTax, calculateGujaratRoadTax, type GujaratRoadTaxFuelType } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

const FUEL_OPTIONS: { value: GujaratRoadTaxFuelType; label: string; icon: string }[] = [
  { value: 'petrol', label: 'Petrol', icon: '⛽' },
  { value: 'diesel', label: 'Diesel', icon: '🛢️' },
  { value: 'cng', label: 'CNG', icon: '🔥' },
  { value: 'electric', label: 'Electric', icon: '🔋' },
]

export default function GujaratRoadTaxCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(1200000)
  const [fuelType, setFuelType] = useState<GujaratRoadTaxFuelType>('petrol')

  const result = useMemo(() => calculateGujaratRoadTax(Math.max(1, vehiclePrice), fuelType), [vehiclePrice, fuelType])
  const bhResult = useMemo(
    () => calculateBhSeriesTax(Math.max(1, vehiclePrice), fuelType === 'diesel' ? 'diesel' : fuelType === 'electric' ? 'electric' : 'petrol'),
    [vehiclePrice, fuelType],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🚗" title="Gujarat Road Tax Calculator" subtitle="Flat 6% one-time road tax on your vehicle's price, verified against the official Gujarat transport department rate" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="grt-price" className="mb-1.5 block text-sm font-medium text-ash">
            Vehicle price (₹)
          </label>
          <input id="grt-price" type="number" min={0} value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <OptionCardGroup legend="Fuel type" options={FUEL_OPTIONS} value={fuelType} onChange={setFuelType} columns={4} />

        <CalculatorCta label="Calculate Road Tax" tone="financial" disclaimer="Verified against Gujarat's official transport department rate — confirm the exact figure with your RTO before paying." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        {result.rateConfirmed ? (
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">One-time road tax ({result.taxPercent}% of vehicle price)</p>
              <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
                {formatINR(result.roadTax ?? 0)}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-ink-navy">EV road tax rate not currently confirmed</p>
            <p className="mt-2 text-sm text-ash/70">
              Gujarat cut its EV road tax to 1% from 6%, but that concession expired on 31 March 2026.
              A replacement policy (reportedly including a possible zero-tax rate) has been discussed
              in the press but not formally notified as of this writing. We don&apos;t show a number
              here rather than guess — check the{' '}
              <a href="https://cot.gujarat.gov.in" target="_blank" rel="noopener noreferrer" className="text-brass underline">
                Gujarat transport department
              </a>{' '}
              or Vahan portal for the current EV rate before buying.
            </p>
          </div>
        )}

        <div className="mt-4 rounded-lg border border-hairline bg-mist/30 p-3 text-sm">
          <p className="font-semibold text-ink-navy">Compare against BH-series registration</p>
          <p className="mt-1 text-ash/70">
            Registering the same {formatINR(vehiclePrice)} vehicle under the Bharat (BH) series
            instead costs {formatINR(bhResult.biennialTax)} every 2 years ({formatINR(bhResult.totalTaxOverLifetime)} total
            over 14 years) — only worth it if you actually qualify (government/defence employees, or
            private-sector employees whose employer has offices in 4+ states/UTs) and expect to
            relocate across states.
          </p>
        </div>
      </div>
    </CalculatorCard>
  )
}
