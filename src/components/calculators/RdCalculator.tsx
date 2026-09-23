'use client'

import { useMemo, useState } from 'react'
import { calculateRd } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function RdCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(10000)
  const [rate, setRate] = useState(7)
  const [tenureMonths, setTenureMonths] = useState(60)
  const [isSenior, setIsSenior] = useState(false)
  const [panProvided, setPanProvided] = useState(true)

  const result = useMemo(
    () => calculateRd(Math.max(0, monthlyDeposit), rate, Math.max(3, tenureMonths), isSenior, panProvided),
    [monthlyDeposit, rate, tenureMonths, isSenior, panProvided],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏦" title="Recurring Deposit Calculator" subtitle="Project your RD maturity value with quarterly compounding" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="rd-deposit" className="mb-1.5 block text-sm font-medium text-ash">
            Monthly deposit (₹)
          </label>
          <input id="rd-deposit" type="number" min={0} value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="rd-rate" label="Interest rate" value={rate} onChange={setRate} min={4} max={9} step={0.1} unit="%" />
        <SliderField id="rd-tenure" label="Tenure" value={tenureMonths} onChange={setTenureMonths} min={3} max={120} unit="months" />

        <label className="flex items-center gap-2 text-sm text-ash">
          <input type="checkbox" checked={isSenior} onChange={(e) => setIsSenior(e.target.checked)} />
          Senior citizen (+0.5% rate bonus)
        </label>
        <label className="flex items-center gap-2 text-sm text-ash">
          <input type="checkbox" checked={panProvided} onChange={(e) => setPanProvided(e.target.checked)} />
          PAN registered with the bank
        </label>

        <CalculatorCta label="Calculate RD Maturity Value" tone="financial" disclaimer="Actual bank crediting conventions vary slightly — this is a close approximation." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Maturity value</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.maturityValue)}
            </p>
            <p className="text-sm text-ash/60">
              Deposited {formatINR(result.totalDeposited)} · Interest{' '}
              <span className="text-spark-teal">{formatINR(result.interestEarned)}</span>
            </p>
          </div>
          {result.estimatedTds > 0 && (
            <p className="text-xs text-ash/50">
              Estimated TDS on interest: {formatINR(result.estimatedTds)} (not your final tax liability — interest is still taxed at your slab rate).
            </p>
          )}
        </div>
      </div>
    </CalculatorCard>
  )
}
