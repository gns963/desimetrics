'use client'

import { useMemo, useState } from 'react'
import { calculateCrorepati } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function CrorepatiCalculator() {
  const [targetCorpus, setTargetCorpus] = useState(10000000)
  const [years, setYears] = useState(15)
  const [returnRate, setReturnRate] = useState(12)
  const [inflationRate, setInflationRate] = useState(6)
  const [existingCorpus, setExistingCorpus] = useState(0)
  const [stepUpPercent, setStepUpPercent] = useState(0)

  const result = useMemo(
    () =>
      calculateCrorepati(
        Math.max(1, targetCorpus),
        Math.max(1, years),
        returnRate,
        inflationRate,
        Math.max(0, existingCorpus),
        stepUpPercent,
      ),
    [targetCorpus, years, returnRate, inflationRate, existingCorpus, stepUpPercent],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="💎" title="Crorepati Calculator" subtitle="How much you need to invest monthly to hit any target corpus" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="cro-target" className="mb-1.5 block text-sm font-medium text-ash">
            Target corpus (₹)
          </label>
          <input
            id="cro-target"
            type="number"
            min={100000}
            step={100000}
            value={targetCorpus}
            onChange={(e) => setTargetCorpus(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">Default is ₹1 crore — change it to any goal amount.</p>
        </div>

        <SliderField id="cro-years" label="Years to reach the goal" value={years} onChange={setYears} min={1} max={40} unit="yrs" />
        <SliderField id="cro-return" label="Expected annual return" value={returnRate} onChange={setReturnRate} min={4} max={16} step={0.5} unit="%" />
        <SliderField id="cro-inflation" label="Expected inflation" value={inflationRate} onChange={setInflationRate} min={3} max={10} step={0.5} unit="%" />

        <div>
          <label htmlFor="cro-existing" className="mb-1.5 block text-sm font-medium text-ash">
            Existing corpus already invested (₹)
          </label>
          <input
            id="cro-existing"
            type="number"
            min={0}
            value={existingCorpus}
            onChange={(e) => setExistingCorpus(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <SliderField id="cro-stepup" label="Annual SIP step-up (optional)" value={stepUpPercent} onChange={setStepUpPercent} min={0} max={20} unit="%" />

        <CalculatorCta label="Calculate Required SIP" tone="financial" disclaimer="Returns are market-linked and not guaranteed — this is a planning aid, not investment advice." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Required monthly SIP</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.requiredMonthlySip)}
            </p>
            {stepUpPercent > 0 && (
              <p className="text-sm text-ash/60">
                With a {stepUpPercent}% annual step-up, start at just{' '}
                <span className="text-spark-teal">{formatINR(result.requiredMonthlySipWithStepUp)}</span>/month
              </p>
            )}
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Target corpus</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(targetCorpus)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Target in today&apos;s money (inflation-adjusted)</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.inflationAdjustedTargetToday)}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">Cost of waiting 5 more years</td>
                <td className="py-2 text-right tabular-nums">{formatINR(result.costOfDelayMonthlySip)}/mo</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-ash/50">
            Starting 5 years later means investing {formatINR(Math.max(0, result.costOfDelayMonthlySip - result.requiredMonthlySip))} more per month for the same target — the cost of delay from lost compounding time.
          </p>
        </div>
      </div>
    </CalculatorCard>
  )
}
