'use client'

import { useMemo, useState } from 'react'
import { calculatePpf } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

const PPF_ANNUAL_CAP = 150000

export interface PpfCalculatorTexts {
  title: string
  subtitle: string
  investmentLabel: string
  investmentHint: string
  rateLabel: string
  rateUnit: string
  durationLabel: string
  durationUnit: string
  ctaLabel: string
  disclaimer: string
  maturityValueLabel: string
  investedLabel: string
  interestLabel: string
  /** Use {year} and {amount} placeholders. */
  yearTooltipTemplate: string
  investedLegend: string
  interestLegend: string
}

const defaultTexts: PpfCalculatorTexts = {
  title: 'PPF Calculator',
  subtitle: 'Project your Public Provident Fund maturity value',
  investmentLabel: 'Annual investment (₹)',
  investmentHint: 'Statutory cap: ₹1,50,000 per financial year across all your PPF accounts.',
  rateLabel: 'PPF interest rate',
  rateUnit: '%',
  durationLabel: 'Duration',
  durationUnit: 'yrs',
  ctaLabel: 'Calculate PPF Maturity',
  disclaimer: 'Results are approximate estimates. The government revises the PPF rate every quarter.',
  maturityValueLabel: 'Maturity value',
  investedLabel: 'Invested',
  interestLabel: 'Interest earned',
  yearTooltipTemplate: 'Year {year}: {amount}',
  investedLegend: 'Invested',
  interestLegend: 'Interest',
}

export default function PpfCalculator({
  texts = defaultTexts,
}: {
  texts?: PpfCalculatorTexts
} = {}) {
  const [annualInvestment, setAnnualInvestment] = useState(150000)
  const [rate, setRate] = useState(7.1)
  const [years, setYears] = useState(15)

  const cappedInvestment = Math.min(annualInvestment, PPF_ANNUAL_CAP)
  const result = useMemo(
    () => calculatePpf(cappedInvestment, rate, years),
    [cappedInvestment, rate, years],
  )

  const maxValue = Math.max(...result.yearly.map((p) => p.value), 1)

  return (
    <CalculatorCard>
      <CalculatorHeader icon="📮" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="ppf-investment" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.investmentLabel}
          </label>
          <input
            id="ppf-investment"
            type="number"
            min={500}
            max={PPF_ANNUAL_CAP}
            step={500}
            value={annualInvestment}
            onChange={(e) => setAnnualInvestment(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30"
          />
          <p className="mt-1 text-xs text-ash/50">{texts.investmentHint}</p>
        </div>

        <SliderField
          id="ppf-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={5}
          max={9}
          step={0.1}
          unit={texts.rateUnit}
        />

        <SliderField
          id="ppf-years"
          label={texts.durationLabel}
          value={years}
          onChange={setYears}
          min={15}
          max={40}
          step={5}
          unit={texts.durationUnit}
          hint="15 years is the statutory lock-in; extend it in 5-year blocks after maturity if you choose to."
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">{texts.maturityValueLabel}</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.maturityValue)}
            </p>
            <p className="text-sm text-ash/60">
              {texts.investedLabel} {formatINR(result.invested)} · {texts.interestLabel}{' '}
              <span className="text-spark-teal">{formatINR(result.interestEarned)}</span>
            </p>
          </div>

          <div>
            <div className="flex h-40 items-end gap-1" aria-hidden>
              {result.yearly.map((p) => {
                const totalH = (p.value / maxValue) * 100
                const investedH = (p.invested / maxValue) * 100
                return (
                  <div
                    key={p.year}
                    className="flex-1"
                    title={texts.yearTooltipTemplate
                      .replace('{year}', String(p.year))
                      .replace('{amount}', formatINR(p.value))}
                  >
                    <div
                      className="relative w-full rounded-t bg-spark-teal/40"
                      style={{ height: `${totalH}%` }}
                    >
                      <div
                        className="absolute bottom-0 w-full rounded-t bg-brass"
                        style={{ height: `${(investedH / totalH) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-2 flex gap-4 text-xs text-ash/60">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-brass" />
                {texts.investedLegend}
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
