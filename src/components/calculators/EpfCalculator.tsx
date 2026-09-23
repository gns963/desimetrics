'use client'

import { useMemo, useState } from 'react'
import { calculateEpf } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function EpfCalculator() {
  const [basicMonthly, setBasicMonthly] = useState(20000)
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(58)
  const [currentBalance, setCurrentBalance] = useState(500000)
  const [rate, setRate] = useState(8.25)
  const [increment, setIncrement] = useState(5)

  const result = useMemo(() => {
    if (retirementAge <= currentAge) return null
    return calculateEpf(
      Math.max(0, basicMonthly),
      currentAge,
      retirementAge,
      Math.max(0, currentBalance),
      rate,
      increment,
    )
  }, [basicMonthly, currentAge, retirementAge, currentBalance, rate, increment])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏢" title="EPF Calculator" subtitle="Project your Employees' Provident Fund corpus at retirement" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="epf-basic" className="mb-1.5 block text-sm font-medium text-ash">
            Basic salary + DA (monthly, ₹)
          </label>
          <input id="epf-basic" type="number" min={0} value={basicMonthly} onChange={(e) => setBasicMonthly(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="epf-current-age" className="mb-1.5 block text-sm font-medium text-ash">
              Current age
            </label>
            <input id="epf-current-age" type="number" min={18} max={60} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value) || 0)} className={fieldCls} />
          </div>
          <div>
            <label htmlFor="epf-retirement-age" className="mb-1.5 block text-sm font-medium text-ash">
              Retirement age
            </label>
            <input id="epf-retirement-age" type="number" min={19} max={60} value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value) || 0)} className={fieldCls} />
          </div>
        </div>

        <div>
          <label htmlFor="epf-balance" className="mb-1.5 block text-sm font-medium text-ash">
            Current EPF balance (₹)
          </label>
          <input id="epf-balance" type="number" min={0} value={currentBalance} onChange={(e) => setCurrentBalance(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="epf-rate" label="EPF interest rate" value={rate} onChange={setRate} min={7} max={10} step={0.05} unit="%" />
        <SliderField id="epf-increment" label="Expected annual increment in basic" value={increment} onChange={setIncrement} min={0} max={15} unit="%" />

        <CalculatorCta label="Calculate EPF Corpus" tone="financial" disclaimer="EPF interest is reviewed annually by the government and is not guaranteed to stay at this rate." />
      </form>

      {result && (
        <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">EPF corpus at retirement</p>
              <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
                {formatINR(result.corpus)}
              </p>
              <p className="text-sm text-ash/60">
                Invested {formatINR(result.totalInvested)} · Interest{' '}
                <span className="text-spark-teal">{formatINR(result.interestEarned)}</span>
              </p>
            </div>

            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="py-1.5 text-ash/70">Your monthly EPF contribution (12%)</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.employeeMonthlyContribution)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Employer&apos;s EPF portion</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.employerEpfMonthlyContribution)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Employer&apos;s EPS (pension) portion</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.employerEpsMonthlyContribution)}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-ash/50">
              The EPS portion goes to your pension account, not this EPF corpus — it&apos;s shown here for reference only.
            </p>
          </div>
        </div>
      )}
    </CalculatorCard>
  )
}
