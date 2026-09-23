'use client'

import { useMemo, useState } from 'react'
import { calculateNps, npsMinimumAnnuityPercent, type NpsExitType } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

type SubscriberType = 'other' | 'government'

const SUBSCRIBER_OPTIONS: { value: SubscriberType; label: string; icon: string }[] = [
  { value: 'other', label: 'Individual / private-sector / corporate', icon: '💼' },
  { value: 'government', label: 'Government subscriber', icon: '🏛️' },
]

const EXIT_OPTIONS: { value: NpsExitType; label: string; icon: string }[] = [
  { value: 'normal', label: 'Normal exit (at/after age 60)', icon: '🎯' },
  { value: 'premature', label: 'Premature exit (before 60)', icon: '⏳' },
]

export interface NpsCalculatorTexts {
  title: string
  subtitle: string
  monthlyLabel: string
  rateLabel: string
  rateUnit: string
  yearsLabel: string
  yearsUnit: string
  subscriberLegend: string
  ctaLabel: string
  disclaimer: string
  corpusLabel: string
  investedLabel: string
  gainsLabel: string
  lumpsumLabel: string
  annuityLabel: string
  taxFreeLabel: string
  taxableLabel: string
  pensionLabel: string
  /** Use {year} and {amount} placeholders. */
  yearTooltipTemplate: string
  investedLegend: string
  gainsLegend: string
  exitLegend: string
  annuityShareLabel: string
  minAnnuityNote: string
  partialWithdrawalTitle: string
  partialWithdrawalBody: string
}

const defaultTexts: NpsCalculatorTexts = {
  title: 'NPS Calculator',
  subtitle: 'Project your National Pension System corpus and exit split',
  monthlyLabel: 'Monthly contribution (₹)',
  rateLabel: 'Expected annual return',
  rateUnit: '%',
  yearsLabel: 'Years to retirement',
  yearsUnit: 'yrs',
  subscriberLegend: 'Subscriber type',
  ctaLabel: 'Calculate NPS Corpus',
  disclaimer: 'Results are approximate estimates. Actual annuity rates and returns vary.',
  corpusLabel: 'Corpus at retirement',
  investedLabel: 'Invested',
  gainsLabel: 'Gains',
  lumpsumLabel: 'Lump sum you can withdraw',
  annuityLabel: 'Compulsory annuity purchase',
  taxFreeLabel: 'Tax-free portion of lump sum',
  taxableLabel: 'Taxable portion of lump sum',
  pensionLabel: 'Estimated monthly pension',
  yearTooltipTemplate: 'Year {year}: {amount}',
  investedLegend: 'Invested',
  gainsLegend: 'Gains',
  exitLegend: 'Exit type',
  annuityShareLabel: 'Annuity share of corpus',
  minAnnuityNote: 'Statutory minimum for this corpus/subscriber/exit combination',
  partialWithdrawalTitle: 'Partial withdrawal while still contributing (Section 10(12B))',
  partialWithdrawalBody:
    'Up to 25% of your own contributions (not employer contributions or returns), tax-free, after 3 years in NPS — maximum 4 withdrawals over your NPS lifetime, at least 4 years apart.',
}

export default function NpsCalculator({
  texts = defaultTexts,
}: {
  texts?: NpsCalculatorTexts
} = {}) {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(25)
  const [subscriberType, setSubscriberType] = useState<SubscriberType>('other')
  const [exitType, setExitType] = useState<NpsExitType>('normal')
  const [annuityPercent, setAnnuityPercent] = useState<number | undefined>(undefined)

  const projectedCorpus = useMemo(
    () => calculateNps(Math.max(0, monthly), rate, Math.max(1, years), subscriberType, exitType).corpus,
    [monthly, rate, years, subscriberType, exitType],
  )
  const minAnnuityPercent = npsMinimumAnnuityPercent(projectedCorpus, subscriberType, exitType)

  const result = useMemo(
    () =>
      calculateNps(
        Math.max(0, monthly),
        rate,
        Math.max(1, years),
        subscriberType,
        exitType,
        annuityPercent,
      ),
    [monthly, rate, years, subscriberType, exitType, annuityPercent],
  )

  const maxValue = Math.max(...result.yearly.map((p) => p.value), 1)

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏛️" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="nps-monthly" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.monthlyLabel}
          </label>
          <input
            id="nps-monthly"
            type="number"
            min={0}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30"
          />
        </div>

        <SliderField
          id="nps-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={6}
          max={14}
          step={0.5}
          unit={texts.rateUnit}
        />

        <SliderField
          id="nps-years"
          label={texts.yearsLabel}
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          unit={texts.yearsUnit}
        />

        <OptionCardGroup
          legend={texts.subscriberLegend}
          options={SUBSCRIBER_OPTIONS}
          value={subscriberType}
          onChange={setSubscriberType}
          columns={2}
        />

        <OptionCardGroup
          legend={texts.exitLegend}
          options={EXIT_OPTIONS}
          value={exitType}
          onChange={(v) => {
            setExitType(v)
            setAnnuityPercent(undefined)
          }}
          columns={2}
        />

        <div>
          <SliderField
            id="nps-annuity-percent"
            label={texts.annuityShareLabel}
            value={Math.max(annuityPercent ?? minAnnuityPercent, minAnnuityPercent)}
            onChange={setAnnuityPercent}
            min={minAnnuityPercent}
            max={100}
            unit="%"
          />
          <p className="mt-1 text-xs text-ash/50">
            {texts.minAnnuityNote}: {minAnnuityPercent}%
          </p>
        </div>

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">{texts.corpusLabel}</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.corpus)}
            </p>
            <p className="text-sm text-ash/60">
              {texts.investedLabel} {formatINR(result.totalInvested)} · {texts.gainsLabel}{' '}
              <span className="text-spark-teal">{formatINR(result.gains)}</span>
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
                {texts.gainsLegend}
              </span>
            </div>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">{texts.lumpsumLabel}</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.lumpsumAmount)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.annuityLabel}</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.annuityAmount)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.taxFreeLabel}</td>
                <td className="py-1.5 text-right tabular-nums text-spark-teal">
                  {formatINR(result.taxFreeLumpsum)}
                </td>
              </tr>
              {result.taxableLumpsum > 0 && (
                <tr>
                  <td className="py-1.5 text-ash/70">{texts.taxableLabel}</td>
                  <td className="py-1.5 text-right tabular-nums">
                    {formatINR(result.taxableLumpsum)}
                  </td>
                </tr>
              )}
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">{texts.pensionLabel}</td>
                <td className="py-2 text-right tabular-nums">
                  {formatINR(result.estimatedMonthlyPension)}/mo
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-hairline bg-mist/30 p-4">
        <p className="text-sm font-medium text-ash">{texts.partialWithdrawalTitle}</p>
        <p className="mt-1 text-xs text-ash/60">{texts.partialWithdrawalBody}</p>
        <p className="mt-2 text-sm tabular-nums text-ink-navy">
          Up to <span className="font-bold">{formatINR(result.npsPartialWithdrawal.maxPerWithdrawal)}</span> per
          withdrawal, max {result.npsPartialWithdrawal.maxWithdrawalsAllowed} times, at least{' '}
          {result.npsPartialWithdrawal.minGapYears} years apart.
        </p>
      </div>
    </CalculatorCard>
  )
}
