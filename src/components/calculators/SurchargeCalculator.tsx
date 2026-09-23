'use client'

import { useMemo, useState } from 'react'
import { calculateSurchargeAndMarginalRelief, computeRegimeTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

type Regime = 'new' | 'old'

const REGIME_OPTIONS: { value: Regime; label: string; icon: string }[] = [
  { value: 'new', label: 'New regime', icon: '🆕' },
  { value: 'old', label: 'Old regime', icon: '📜' },
]

export default function SurchargeCalculator() {
  const [grossIncome, setGrossIncome] = useState(6000000)
  const [regime, setRegime] = useState<Regime>('new')

  const taxResult = useMemo(() => computeRegimeTax(Math.max(0, grossIncome), regime), [grossIncome, regime])
  const surcharge = useMemo(
    () => calculateSurchargeAndMarginalRelief(taxResult.taxableIncome, taxResult.taxBeforeRebate - taxResult.rebate87A - taxResult.marginalRelief, regime),
    [taxResult, regime],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="📊" title="Surcharge & Marginal Relief Calculator" subtitle="See exactly how much surcharge you owe above ₹50 lakh, and whether marginal relief caps it" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="surcharge-income" className="mb-1.5 block text-sm font-medium text-ash">
            Gross annual income (₹)
          </label>
          <input id="surcharge-income" type="number" min={0} value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <OptionCardGroup legend="Tax regime" options={REGIME_OPTIONS} value={regime} onChange={setRegime} columns={2} />

        <CalculatorCta label="Calculate Surcharge" tone="financial" disclaimer="For general guidance only, not tax advice — consult a chartered accountant at high incomes." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Surcharge payable</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(surcharge.surchargeAfterRelief)}
            </p>
            {surcharge.marginalRelief > 0 && (
              <p className="text-sm text-ash/60">
                Reduced from {formatINR(surcharge.surchargeBeforeRelief)} by{' '}
                <span className="text-spark-teal">{formatINR(surcharge.marginalRelief)}</span> of marginal relief
              </p>
            )}
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Taxable income</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(taxResult.taxableIncome)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Applicable surcharge rate</td>
                <td className="py-1.5 text-right tabular-nums">{surcharge.surchargeRate}%</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Tax + surcharge (before cess)</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(surcharge.taxPlusSurcharge)}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">Total tax (incl. 4% cess)</td>
                <td className="py-2 text-right tabular-nums">{formatINR(taxResult.totalTax)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
