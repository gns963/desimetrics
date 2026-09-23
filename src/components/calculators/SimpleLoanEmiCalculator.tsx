'use client'

import { useMemo, useState } from 'react'
import { calculateEmi } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface SimpleLoanEmiCalculatorProps {
  icon: string
  title: string
  subtitle: string
  amountLabel: string
  defaultAmount: number
  amountStep: number
  defaultRate: number
  rateMin: number
  rateMax: number
  defaultYears: number
  yearsMin: number
  yearsMax: number
  disclaimer: string
}

export default function SimpleLoanEmiCalculator({
  icon,
  title,
  subtitle,
  amountLabel,
  defaultAmount,
  amountStep,
  defaultRate,
  rateMin,
  rateMax,
  defaultYears,
  yearsMin,
  yearsMax,
  disclaimer,
}: SimpleLoanEmiCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount)
  const [rate, setRate] = useState(defaultRate)
  const [years, setYears] = useState(defaultYears)

  const result = useMemo(() => calculateEmi(Math.max(1, amount), rate, Math.max(0.5, years)), [amount, rate, years])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon={icon} title={title} subtitle={subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="loan-amount" className="mb-1.5 block text-sm font-medium text-ash">
            {amountLabel}
          </label>
          <input
            id="loan-amount"
            type="number"
            min={0}
            step={amountStep}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <SliderField id="loan-rate" label="Interest rate" value={rate} onChange={setRate} min={rateMin} max={rateMax} step={0.1} unit="%" />
        <SliderField id="loan-years" label="Loan tenure" value={years} onChange={setYears} min={yearsMin} max={yearsMax} step={0.5} unit="yrs" />

        <CalculatorCta label="Calculate EMI" tone="financial" disclaimer={disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Monthly EMI</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.emi)}
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Principal</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.principal)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Total interest</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.totalInterest)}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">Total payment</td>
                <td className="py-2 text-right tabular-nums">{formatINR(result.totalPayment)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
