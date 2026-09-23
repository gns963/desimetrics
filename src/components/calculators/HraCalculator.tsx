'use client'

import { useMemo, useState } from 'react'
import {
  calculateHraExemption,
  calculateSection80GG,
  isHraMetroCity,
  type HraCity,
  type HraFinancialYear,
} from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

const FY_OPTIONS: { value: HraFinancialYear; label: string; icon: string }[] = [
  { value: 'FY2026-27', label: 'FY 2026-27 (8 metro cities)', icon: '🆕' },
  { value: 'FY2025-26', label: 'FY 2025-26 (4 metro cities)', icon: '📅' },
]

const CITIES: HraCity[] = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai', 'Bengaluru', 'Hyderabad', 'Pune', 'Ahmedabad', 'Other']

export default function HraCalculator() {
  const [basicMonthly, setBasicMonthly] = useState(50000)
  const [hraMonthly, setHraMonthly] = useState(25000)
  const [rentMonthly, setRentMonthly] = useState(25000)
  const [financialYear, setFinancialYear] = useState<HraFinancialYear>('FY2026-27')
  const [city, setCity] = useState<HraCity>('Bengaluru')
  const [showNoHra, setShowNoHra] = useState(false)
  const [totalIncomeAnnual, setTotalIncomeAnnual] = useState(900000)

  const isMetro = isHraMetroCity(city, financialYear)

  const result = useMemo(
    () =>
      calculateHraExemption(
        Math.max(0, basicMonthly) * 12,
        Math.max(0, hraMonthly) * 12,
        Math.max(0, rentMonthly) * 12,
        isMetro,
      ),
    [basicMonthly, hraMonthly, rentMonthly, isMetro],
  )

  const section80GG = useMemo(
    () => calculateSection80GG(Math.max(0, totalIncomeAnnual), Math.max(0, rentMonthly) * 12),
    [totalIncomeAnnual, rentMonthly],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏠" title="HRA Calculator" subtitle="Work out your tax-exempt House Rent Allowance" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <OptionCardGroup legend="Financial year" options={FY_OPTIONS} value={financialYear} onChange={setFinancialYear} columns={2} />

        <div>
          <label htmlFor="hra-city" className="mb-1.5 block text-sm font-medium text-ash">
            City of residence
          </label>
          <select
            id="hra-city"
            value={city}
            onChange={(e) => setCity(e.target.value as HraCity)}
            className={fieldCls}
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c === 'Other' ? 'Other (non-metro)' : c}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-ash/50">
            {isMetro
              ? `Metro city for ${financialYear.replace('FY', 'FY ')} — 50% of basic salary limit applies.`
              : `Non-metro for ${financialYear.replace('FY', 'FY ')} — 40% of basic salary limit applies.`}
          </p>
        </div>

        <div>
          <label htmlFor="hra-basic" className="mb-1.5 block text-sm font-medium text-ash">
            Basic salary + DA (monthly, ₹)
          </label>
          <input
            id="hra-basic"
            type="number"
            min={0}
            value={basicMonthly}
            onChange={(e) => setBasicMonthly(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="hra-received" className="mb-1.5 block text-sm font-medium text-ash">
            HRA received (monthly, ₹)
          </label>
          <input
            id="hra-received"
            type="number"
            min={0}
            value={hraMonthly}
            onChange={(e) => setHraMonthly(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="hra-rent" className="mb-1.5 block text-sm font-medium text-ash">
            Rent paid (monthly, ₹)
          </label>
          <input
            id="hra-rent"
            type="number"
            min={0}
            value={rentMonthly}
            onChange={(e) => setRentMonthly(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <CalculatorCta label="Calculate HRA Exemption" tone="financial" disclaimer="Results are approximate estimates. Only available under the old tax regime." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Exempt (tax-free) HRA — annual</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.exemptAmount)}
            </p>
            <p className="text-sm text-ash/60">
              Taxable HRA <span className="text-spark-teal">{formatINR(result.taxableHra)}</span>
            </p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ash/60">
                <th className="py-1 font-medium">Rule (least of these three)</th>
                <th className="py-1 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Actual HRA received</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.hraReceived)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Rent paid − 10% of basic</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.rentMinusTenPercentBasic)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{isMetro ? '50%' : '40%'} of basic ({city === 'Other' ? 'non-metro' : city})</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.salaryPercentLimit)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-hairline bg-mist/30 p-4">
        <label className="flex items-center gap-2 text-sm font-medium text-ash">
          <input type="checkbox" checked={showNoHra} onChange={(e) => setShowNoHra(e.target.checked)} />
          I don&apos;t receive HRA in my salary — check Section 80GG instead
        </label>
        {showNoHra && (
          <div className="mt-3 grid gap-3">
            <div>
              <label htmlFor="hra-80gg-income" className="mb-1.5 block text-sm font-medium text-ash">
                Total annual income (₹)
              </label>
              <input
                id="hra-80gg-income"
                type="number"
                min={0}
                value={totalIncomeAnnual}
                onChange={(e) => setTotalIncomeAnnual(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
            <div className="rounded-lg border border-hairline bg-paper p-3">
              <p className="text-xs text-ash/60">Section 80GG deduction</p>
              <p className="font-display text-2xl font-bold tabular-nums text-ink-navy">
                {formatINR(section80GG.deduction)}
              </p>
              <table className="mt-2 w-full text-xs">
                <tbody className="divide-y divide-hairline">
                  <tr>
                    <td className="py-1 text-ash/60">₹5,000/month cap</td>
                    <td className="py-1 text-right tabular-nums">{formatINR(section80GG.monthlyCapAnnualised)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-ash/60">25% of total income</td>
                    <td className="py-1 text-right tabular-nums">{formatINR(section80GG.twentyFivePercentOfIncome)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-ash/60">Rent − 10% of income</td>
                    <td className="py-1 text-right tabular-nums">{formatINR(section80GG.rentMinusTenPercentIncome)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs text-ash/50">
                Requires filing Form 10BA. Not available if you, your spouse or minor child own residential property in the city where you live or work.
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
