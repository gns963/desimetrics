'use client'

import { useMemo, useState } from 'react'
import { calculateEvBreakEven, calculateFuelCostComparison, type FuelOption } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader } from './CalculatorShell'

type OptionKey = 'petrol' | 'diesel' | 'cng' | 'ev'

const DEFAULTS: Record<OptionKey, FuelOption> = {
  petrol: { label: 'Petrol', pricePerUnit: 100, mileage: 18 },
  diesel: { label: 'Diesel', pricePerUnit: 90, mileage: 22 },
  cng: { label: 'CNG', pricePerUnit: 80, mileage: 25 },
  ev: { label: 'Electric', pricePerUnit: 8, mileage: 6 },
}

export default function EvVsFuelCostCalculator() {
  const [options, setOptions] = useState<Record<OptionKey, FuelOption>>(DEFAULTS)
  const [dailyKm, setDailyKm] = useState(40)
  const [evPrice, setEvPrice] = useState(1500000)
  const [petrolPrice, setPetrolPrice] = useState(1000000)

  const results = useMemo(() => {
    const out: Record<OptionKey, ReturnType<typeof calculateFuelCostComparison>> = {} as never
    for (const key of Object.keys(options) as OptionKey[]) {
      out[key] = calculateFuelCostComparison(options[key], Math.max(0, dailyKm))
    }
    return out
  }, [options, dailyKm])

  const breakEven = useMemo(
    () =>
      calculateEvBreakEven(
        Math.max(0, evPrice),
        Math.max(0, petrolPrice),
        results.ev.costPerKm,
        results.petrol.costPerKm,
        Math.max(0, dailyKm),
      ),
    [evPrice, petrolPrice, results, dailyKm],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2 text-base tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  const cheapest = (Object.keys(options) as OptionKey[]).reduce((a, b) =>
    results[a].costPerKm <= results[b].costPerKm ? a : b,
  )

  return (
    <CalculatorCard>
      <CalculatorHeader icon="⛽" title="EV vs Petrol/Diesel/CNG Cost Calculator" subtitle="Compare running costs across all four fuel types, and find your EV break-even point" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          {(Object.keys(options) as OptionKey[]).map((key) => (
            <div key={key} className="rounded-lg border border-hairline p-3">
              <p className="mb-2 text-sm font-semibold text-ash">
                {options[key].label} {key === 'ev' ? '(₹/kWh, km/kWh)' : '(₹/litre or kg, km/litre or kg)'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min={0}
                  aria-label={`${options[key].label} price`}
                  value={options[key].pricePerUnit}
                  onChange={(e) =>
                    setOptions((o) => ({ ...o, [key]: { ...o[key], pricePerUnit: Number(e.target.value) || 0 } }))
                  }
                  className={fieldCls}
                />
                <input
                  type="number"
                  min={0.1}
                  step={0.1}
                  aria-label={`${options[key].label} mileage`}
                  value={options[key].mileage}
                  onChange={(e) =>
                    setOptions((o) => ({ ...o, [key]: { ...o[key], mileage: Number(e.target.value) || 0.1 } }))
                  }
                  className={fieldCls}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="fuel-daily-km" className="mb-1.5 block text-sm font-medium text-ash">
            Daily driving distance (km)
          </label>
          <input
            id="fuel-daily-km"
            type="number"
            min={0}
            value={dailyKm}
            onChange={(e) => setDailyKm(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fuel-ev-price" className="mb-1.5 block text-sm font-medium text-ash">
              EV on-road price (₹)
            </label>
            <input
              id="fuel-ev-price"
              type="number"
              min={0}
              value={evPrice}
              onChange={(e) => setEvPrice(Number(e.target.value) || 0)}
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="fuel-petrol-price" className="mb-1.5 block text-sm font-medium text-ash">
              Petrol alternative on-road price (₹)
            </label>
            <input
              id="fuel-petrol-price"
              type="number"
              min={0}
              value={petrolPrice}
              onChange={(e) => setPetrolPrice(Number(e.target.value) || 0)}
              className={fieldCls}
            />
          </div>
        </div>

        <CalculatorCta label="Compare Fuel Costs" tone="financial" disclaimer="Fuel prices and mileage vary by location, driving style and vehicle — use your own figures for accuracy." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ash/60">
              <th className="py-1 font-medium">Fuel</th>
              <th className="py-1 text-right font-medium">₹/km</th>
              <th className="py-1 text-right font-medium">Monthly</th>
              <th className="py-1 text-right font-medium">Annual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {(Object.keys(options) as OptionKey[]).map((key) => (
              <tr key={key} className={key === cheapest ? 'font-bold text-ink-navy' : ''}>
                <td className="py-1.5">
                  {options[key].label} {key === cheapest && <span className="text-spark-teal">(cheapest)</span>}
                </td>
                <td className="py-1.5 text-right tabular-nums">₹{results[key].costPerKm}</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(results[key].monthlyCost)}</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(results[key].annualCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 rounded-lg border border-hairline bg-mist/30 p-3 text-sm">
          <p className="font-semibold text-ink-navy">EV break-even vs petrol</p>
          {breakEven.breakEvenMonths !== null ? (
            <p className="mt-1 text-ash/70">
              The EV&apos;s {formatINR(breakEven.priceDifference)} price premium is offset by running-cost
              savings of ₹{breakEven.perKmSavings}/km after about{' '}
              <strong>{breakEven.breakEvenKm} km</strong> ({breakEven.breakEvenMonths} months at your daily
              distance).
            </p>
          ) : (
            <p className="mt-1 text-ash/70">
              At these running costs, the EV isn&apos;t cheaper per km, so there&apos;s no break-even point from
              running costs alone.
            </p>
          )}
        </div>
      </div>
    </CalculatorCard>
  )
}
