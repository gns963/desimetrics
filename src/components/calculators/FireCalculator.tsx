'use client'

import { useMemo, useState } from 'react'
import { calculateFire } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function FireCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000)
  const [currentAge, setCurrentAge] = useState(30)
  const [fireAge, setFireAge] = useState(45)
  const [currentPortfolio, setCurrentPortfolio] = useState(2000000)
  const [currentMonthlySip, setCurrentMonthlySip] = useState(20000)
  const [returnRate, setReturnRate] = useState(11)
  const [inflationRate, setInflationRate] = useState(6)
  const [swr, setSwr] = useState(3.5)
  const [postFireIncome, setPostFireIncome] = useState(0)

  const result = useMemo(() => {
    if (fireAge <= currentAge) return null
    return calculateFire(
      Math.max(0, monthlyExpenses),
      currentAge,
      fireAge,
      Math.max(0, currentPortfolio),
      Math.max(0, currentMonthlySip),
      returnRate,
      inflationRate,
      swr,
      Math.max(0, postFireIncome),
    )
  }, [monthlyExpenses, currentAge, fireAge, currentPortfolio, currentMonthlySip, returnRate, inflationRate, swr, postFireIncome])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🔥" title="FIRE Calculator" subtitle="How big a corpus do you need to retire early — and are you already on track?" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="fire-expenses" className="mb-1.5 block text-sm font-medium text-ash">
            Current monthly expenses (₹)
          </label>
          <input
            id="fire-expenses"
            type="number"
            min={0}
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fire-current-age" className="mb-1.5 block text-sm font-medium text-ash">
              Current age
            </label>
            <input
              id="fire-current-age"
              type="number"
              min={18}
              max={70}
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="fire-age" className="mb-1.5 block text-sm font-medium text-ash">
              Target FIRE age
            </label>
            <input
              id="fire-age"
              type="number"
              min={19}
              max={75}
              value={fireAge}
              onChange={(e) => setFireAge(Number(e.target.value) || 0)}
              className={fieldCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="fire-portfolio" className="mb-1.5 block text-sm font-medium text-ash">
            Current investment portfolio (₹)
          </label>
          <input
            id="fire-portfolio"
            type="number"
            min={0}
            value={currentPortfolio}
            onChange={(e) => setCurrentPortfolio(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="fire-sip" className="mb-1.5 block text-sm font-medium text-ash">
            Current monthly SIP/investment (₹)
          </label>
          <input
            id="fire-sip"
            type="number"
            min={0}
            value={currentMonthlySip}
            onChange={(e) => setCurrentMonthlySip(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <SliderField id="fire-return" label="Expected pre-FIRE return" value={returnRate} onChange={setReturnRate} min={6} max={15} step={0.5} unit="%" />
        <SliderField id="fire-inflation" label="Expected inflation" value={inflationRate} onChange={setInflationRate} min={3} max={10} step={0.5} unit="%" />
        <SliderField id="fire-swr" label="Safe withdrawal rate" value={swr} onChange={setSwr} min={2.5} max={5} step={0.25} unit="%" />

        <div>
          <label htmlFor="fire-post-income" className="mb-1.5 block text-sm font-medium text-ash">
            Expected post-FIRE part-time/pension income (₹/month)
          </label>
          <input
            id="fire-post-income"
            type="number"
            min={0}
            value={postFireIncome}
            onChange={(e) => setPostFireIncome(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">Optional — a &quot;Barista FIRE&quot; income that offsets some expenses, reducing the corpus you need.</p>
        </div>

        <CalculatorCta label="Calculate My FIRE Number" tone="financial" disclaimer="Results are illustrative projections, not guarantees — actual returns and inflation vary." />
      </form>

      {result && (
        <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">FIRE corpus needed at age {fireAge}</p>
              <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
                {formatINR(result.requiredCorpus)}
              </p>
              <p className="text-sm text-ash/60">
                US 4%-rule equivalent: <span className="text-spark-teal">{formatINR(result.requiredCorpusUsRule)}</span>
              </p>
            </div>

            {result.isCoastFire && (
              <div className="rounded-lg border border-hub-financial/30 bg-hub-financial/5 p-3 text-sm">
                <span className="font-semibold text-ink-navy">You&apos;re already Coast FIRE</span> — your current
                portfolio alone, grown at {returnRate}%, would reach your required corpus by age {fireAge} even with
                zero further contributions.
              </div>
            )}

            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="py-1.5 text-ash/70">Years to FIRE</td>
                  <td className="py-1.5 text-right tabular-nums">{result.yearsToFire}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Future annual expenses at FIRE</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.futureAnnualExpenses)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Portfolio if you stop investing today</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.projectedPortfolioNoNewSip)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Projected portfolio (current SIP continued)</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.projectedPortfolioWithCurrentSip)}</td>
                </tr>
                <tr className="text-base font-bold text-ink-navy">
                  <td className="py-2">{result.shortfallOrSurplus > 0 ? 'Shortfall' : 'Surplus'}</td>
                  <td className="py-2 text-right tabular-nums">{formatINR(Math.abs(result.shortfallOrSurplus))}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Additional monthly SIP needed</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.requiredAdditionalMonthlySip)}/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </CalculatorCard>
  )
}
