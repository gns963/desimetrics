'use client'

import { useMemo, useState } from 'react'
import { calculateSsy, SSY_MAX_ANNUAL_DEPOSIT, SSY_MIN_ANNUAL_DEPOSIT } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function SsyCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(150000)
  const [rate, setRate] = useState(8.2)

  const result = useMemo(() => calculateSsy(Math.max(0, annualDeposit), rate), [annualDeposit, rate])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  const overLimit = annualDeposit > SSY_MAX_ANNUAL_DEPOSIT

  return (
    <CalculatorCard>
      <CalculatorHeader icon="👧" title="Sukanya Samriddhi Yojana Calculator" subtitle="Project your girl child's SSY maturity value" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="ssy-deposit" className="mb-1.5 block text-sm font-medium text-ash">
            Annual deposit (₹)
          </label>
          <input
            id="ssy-deposit"
            type="number"
            min={SSY_MIN_ANNUAL_DEPOSIT}
            max={SSY_MAX_ANNUAL_DEPOSIT}
            value={annualDeposit}
            onChange={(e) => setAnnualDeposit(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">
            Min {formatINR(SSY_MIN_ANNUAL_DEPOSIT)}, max {formatINR(SSY_MAX_ANNUAL_DEPOSIT)} per financial year.
            {overLimit && <span className="text-red-600"> Capped at the maximum in the calculation below.</span>}
          </p>
        </div>

        <SliderField id="ssy-rate" label="Interest rate (govt-notified, reviewed quarterly)" value={rate} onChange={setRate} min={6} max={10} step={0.1} unit="%" />

        <CalculatorCta label="Calculate SSY Maturity Value" tone="financial" disclaimer="The interest rate is reviewed quarterly by the government and is not guaranteed to stay at this level for 21 years." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Maturity value (21 years from account opening)</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.maturityValue)}
            </p>
            <p className="text-sm text-ash/60">
              Deposited {formatINR(result.totalDeposited)} · Interest{' '}
              <span className="text-spark-teal">{formatINR(result.interestEarned)}</span>
            </p>
          </div>
          <p className="text-xs text-ash/50">
            Deposits are made for the first 15 years; the balance keeps compounding, untouched, for a further 6 years until the account matures at 21 years.
          </p>
        </div>
      </div>
    </CalculatorCard>
  )
}
