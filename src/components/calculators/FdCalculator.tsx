'use client'

import { useMemo, useState } from 'react'
import { calculateFd } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

type Compounding = '1' | '2' | '4' | '12'

const COMPOUNDING_OPTIONS: { value: Compounding; label: string; icon: string }[] = [
  { value: '1', label: 'Annually', icon: '📅' },
  { value: '2', label: 'Half-yearly', icon: '🗓️' },
  { value: '4', label: 'Quarterly', icon: '📆' },
  { value: '12', label: 'Monthly', icon: '🕐' },
]

export interface FdCalculatorTexts {
  title: string
  subtitle: string
  principalLabel: string
  rateLabel: string
  rateUnit: string
  durationLabel: string
  durationUnit: string
  compoundingLegend: string
  ctaLabel: string
  disclaimer: string
  maturityValueLabel: string
  principalSummaryLabel: string
  interestLabel: string
  /** Use {year} and {amount} placeholders. */
  yearTooltipTemplate: string
}

const defaultTexts: FdCalculatorTexts = {
  title: 'FD Calculator',
  subtitle: 'Project your fixed deposit maturity value',
  principalLabel: 'Deposit amount (₹)',
  rateLabel: 'Interest rate (annual)',
  rateUnit: '%',
  durationLabel: 'Tenure',
  durationUnit: 'yrs',
  compoundingLegend: 'Compounding frequency',
  ctaLabel: 'Calculate FD Maturity',
  disclaimer: 'Results are approximate estimates. Your bank\'s actual rate and compounding may differ.',
  maturityValueLabel: 'Maturity value',
  principalSummaryLabel: 'Principal',
  interestLabel: 'Interest earned',
  yearTooltipTemplate: 'Year {year}: {amount}',
}

export default function FdCalculator({
  texts = defaultTexts,
}: {
  texts?: FdCalculatorTexts
} = {}) {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [compounding, setCompounding] = useState<Compounding>('4')

  const result = useMemo(
    () => calculateFd(Math.max(0, principal), rate, Math.max(1, years), Number(compounding)),
    [principal, rate, years, compounding],
  )

  const maxValue = Math.max(...result.yearly.map((p) => p.value), 1)

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏦" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="fd-principal" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.principalLabel}
          </label>
          <input
            id="fd-principal"
            type="number"
            min={0}
            step={5000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30"
          />
        </div>

        <SliderField
          id="fd-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={3}
          max={9.5}
          step={0.05}
          unit={texts.rateUnit}
        />

        <SliderField
          id="fd-years"
          label={texts.durationLabel}
          value={years}
          onChange={setYears}
          min={1}
          max={10}
          unit={texts.durationUnit}
        />

        <OptionCardGroup
          legend={texts.compoundingLegend}
          options={COMPOUNDING_OPTIONS}
          value={compounding}
          onChange={setCompounding}
          columns={4}
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
              {texts.principalSummaryLabel} {formatINR(result.principal)} · {texts.interestLabel}{' '}
              <span className="text-spark-teal">{formatINR(result.interestEarned)}</span>
            </p>
          </div>

          <div>
            <div className="flex h-40 items-end gap-1" aria-hidden>
              {result.yearly.map((p) => {
                const h = (p.value / maxValue) * 100
                return (
                  <div
                    key={p.year}
                    className="flex-1"
                    title={texts.yearTooltipTemplate
                      .replace('{year}', String(p.year))
                      .replace('{amount}', formatINR(p.value))}
                  >
                    <div
                      className="w-full rounded-t bg-spark-teal/40"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  )
}
