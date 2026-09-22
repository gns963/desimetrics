'use client'

import { useMemo, useState } from 'react'
import { calculateEmi } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface EmiCalculatorTexts {
  title: string
  subtitle: string
  amountLabel: string
  rateLabel: string
  rateUnit: string
  tenureLabel: string
  tenureUnit: string
  ctaLabel: string
  disclaimer: string
  emiLabel: string
  principalLabel: string
  interestLabel: string
  totalLabel: string
  /** Use {year} and {amount} placeholders. */
  yearTooltipTemplate: string
  principalLegend: string
  interestLegend: string
}

const defaultTexts: EmiCalculatorTexts = {
  title: 'EMI Calculator',
  subtitle: 'Work out your monthly instalment',
  amountLabel: 'Loan amount (₹)',
  rateLabel: 'Interest rate (annual)',
  rateUnit: '%',
  tenureLabel: 'Loan tenure',
  tenureUnit: 'yrs',
  ctaLabel: 'Calculate EMI',
  disclaimer: 'Results are approximate estimates. Your actual EMI may vary by lender.',
  emiLabel: 'Monthly EMI',
  principalLabel: 'Principal',
  interestLabel: 'Total interest',
  totalLabel: 'Total payment',
  yearTooltipTemplate: 'Year {year}: {amount} paid',
  principalLegend: 'Principal',
  interestLegend: 'Interest',
}

export default function EmiCalculator({
  texts = defaultTexts,
  defaultAmount = 3000000,
  defaultRate = 9,
  defaultYears = 20,
  amountStep = 50000,
  rateRange = [6, 20] as [number, number],
  yearsRange = [1, 30] as [number, number],
}: {
  texts?: EmiCalculatorTexts
  defaultAmount?: number
  defaultRate?: number
  defaultYears?: number
  amountStep?: number
  rateRange?: [number, number]
  yearsRange?: [number, number]
} = {}) {
  const [amount, setAmount] = useState(defaultAmount)
  const [rate, setRate] = useState(defaultRate)
  const [years, setYears] = useState(defaultYears)

  const result = useMemo(
    () => calculateEmi(Math.max(1, amount), rate, Math.max(1, years)),
    [amount, rate, years],
  )

  const maxYearTotal = Math.max(
    ...result.yearly.map((p) => p.principalPaid + p.interestPaid),
    1,
  )

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏦" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="emi-amount" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.amountLabel}
          </label>
          <input
            id="emi-amount"
            type="number"
            min={0}
            step={amountStep}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30"
          />
        </div>

        <SliderField
          id="emi-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={rateRange[0]}
          max={rateRange[1]}
          step={0.05}
          unit={texts.rateUnit}
        />

        <SliderField
          id="emi-years"
          label={texts.tenureLabel}
          value={years}
          onChange={setYears}
          min={yearsRange[0]}
          max={yearsRange[1]}
          unit={texts.tenureUnit}
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">{texts.emiLabel}</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.emi)}
              <span className="ml-1 text-base font-normal text-ash/50">/mo</span>
            </p>
            <p className="text-sm text-ash/60">
              {texts.principalLabel} {formatINR(result.principal)} · {texts.interestLabel}{' '}
              <span className="text-spark-teal">{formatINR(result.totalInterest)}</span> ·{' '}
              {texts.totalLabel} {formatINR(result.totalPayment)}
            </p>
          </div>

          <div>
            <div className="flex h-40 items-end gap-1" aria-hidden>
              {result.yearly.map((p) => {
                const total = p.principalPaid + p.interestPaid
                const totalH = (total / maxYearTotal) * 100
                const principalH = (p.principalPaid / total) * 100
                return (
                  <div
                    key={p.year}
                    className="flex-1"
                    title={texts.yearTooltipTemplate
                      .replace('{year}', String(p.year))
                      .replace('{amount}', formatINR(total))}
                  >
                    <div
                      className="relative w-full rounded-t bg-spark-teal/40"
                      style={{ height: `${totalH}%` }}
                    >
                      <div
                        className="absolute bottom-0 w-full rounded-t bg-brass"
                        style={{ height: `${principalH}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-2 flex gap-4 text-xs text-ash/60">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-brass" />
                {texts.principalLegend}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-spark-teal/40" />
                {texts.interestLegend}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  )
}
