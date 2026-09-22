'use client'

import { useMemo, useState } from 'react'
import { calculateLoanTrueCost } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function PersonalLoanEmiCalculator() {
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(14)
  const [years, setYears] = useState(5)
  const [processingFeePercent, setProcessingFeePercent] = useState(2)

  const result = useMemo(
    () =>
      calculateLoanTrueCost({
        principal: Math.max(1, amount),
        annualRatePercent: rate,
        years: Math.max(1, years),
        processingFeePercent,
      }),
    [amount, rate, years, processingFeePercent],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="💳" title="Personal Loan EMI Calculator" subtitle="See your EMI, plus the true cost after fees" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="pl-amount" className="mb-1.5 block text-sm font-medium text-ash">
            Loan amount (₹)
          </label>
          <input
            id="pl-amount"
            type="number"
            min={0}
            step={10000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <SliderField id="pl-rate" label="Interest rate (annual)" value={rate} onChange={setRate} min={9} max={26} step={0.25} unit="%" />
        <SliderField id="pl-years" label="Tenure" value={years} onChange={setYears} min={1} max={7} unit="yrs" />
        <SliderField
          id="pl-fee"
          label="Processing fee (% of loan)"
          value={processingFeePercent}
          onChange={setProcessingFeePercent}
          min={0}
          max={5}
          step={0.25}
          unit="%"
          hint="Usually 1-3%, plus 18% GST on the fee itself."
        />

        <CalculatorCta label="Calculate Personal Loan EMI" tone="financial" disclaimer="Results are approximate estimates. Your actual EMI may vary by lender." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Monthly EMI</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.emi)}
              <span className="ml-1 text-base font-normal text-ash/50">/mo</span>
            </p>
            <p className="text-sm text-ash/60">
              Total interest <span className="text-spark-teal">{formatINR(result.totalInterest)}</span> · Total payment{' '}
              {formatINR(result.totalPayment)}
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Processing fee</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.processingFee)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">GST on fee (18%)</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.processingFeeGst)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Total fee (incl. GST)</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.totalFeeWithGst)}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">Net amount disbursed</td>
                <td className="py-2 text-right tabular-nums">{formatINR(result.netDisbursal)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Effective APR (true cost)</td>
                <td className="py-1.5 text-right tabular-nums font-semibold text-spark-teal">{result.effectiveAprPercent}%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-ash/50">
            The effective APR is higher than the quoted {rate}% rate because you repay EMIs calculated on the full loan amount, but only actually receive the net disbursal after fees are deducted upfront.
          </p>
        </div>
      </div>
    </CalculatorCard>
  )
}
