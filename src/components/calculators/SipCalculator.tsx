'use client'

import { useMemo, useState } from 'react'
import { calculateSip } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface SipCalculatorTexts {
  title: string
  subtitle: string
  monthlyLabel: string
  rateLabel: string
  rateUnit: string
  durationLabel: string
  durationUnit: string
  ctaLabel: string
  disclaimer: string
  maturityValueLabel: string
  investedLabel: string
  gainsLabel: string
  /** Use {year} and {amount} placeholders. */
  yearTooltipTemplate: string
  investedLegend: string
  gainsLegend: string
}

const defaultTexts: SipCalculatorTexts = {
  title: 'SIP Calculator',
  subtitle: 'Project your mutual fund SIP maturity value',
  monthlyLabel: 'Monthly investment (₹)',
  rateLabel: 'Expected annual return',
  rateUnit: '%',
  durationLabel: 'Duration',
  durationUnit: 'yrs',
  ctaLabel: 'Calculate SIP Returns',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  maturityValueLabel: 'Maturity value',
  investedLabel: 'Invested',
  gainsLabel: 'Gains',
  yearTooltipTemplate: 'Year {year}: {amount}',
  investedLegend: 'Invested',
  gainsLegend: 'Gains',
}

export default function SipCalculator({
  texts = defaultTexts,
}: {
  texts?: SipCalculatorTexts
} = {}) {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateSip(monthly, rate, years), [monthly, rate, years])

  const maxValue = Math.max(...result.yearly.map((p) => p.value), 1)

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="📈"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="sip-monthly"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.monthlyLabel}
          </label>
          <input
            id="sip-monthly"
            type="number"
            min={0}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30"
          />
        </div>

        <SliderField
          id="sip-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={1}
          max={30}
          unit={texts.rateUnit}
        />

        <SliderField
          id="sip-years"
          label={texts.durationLabel}
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          unit={texts.durationUnit}
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">
              {texts.maturityValueLabel}
            </p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.maturityValue)}
            </p>
            <p className="text-sm text-ash/60">
              {texts.investedLabel} {formatINR(result.invested)} · {texts.gainsLabel}{' '}
              <span className="text-spark-teal">{formatINR(result.gains)}</span>
            </p>
          </div>

          {/* Simple stacked growth chart: invested (base) + gains (top) */}
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
                {texts.gainsLegend}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  )
}
