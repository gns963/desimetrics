'use client'

import { useMemo, useState } from 'react'
import { acDailyUnits, marginalRatePerUnit } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

export interface StarCompareDiscom {
  code: string
  state: string
}

const TON_OPTIONS = [
  { value: '1', label: '1 Ton', icon: '❄️' },
  { value: '1.5', label: '1.5 Ton', icon: '❄️' },
  { value: '2', label: '2 Ton', icon: '🥶' },
]

export interface StarComparisonToolTexts {
  title: string
  subtitle: string
  discomLabel: string
  tonnageLegend: string
  tonOptions: { value: string; label: string; icon: string }[]
  hoursLabel: string
  hoursUnit: string
  ctaLabel: string
  disclaimer: string
  threeStarCostLabel: string
  fiveStarCostLabel: string
  savesLabel: string
  perYearSuffix: string
  /** Use {tenYear} and {rate} placeholders. */
  tenYearTemplate: string
}

const defaultTexts: StarComparisonToolTexts = {
  title: '3★ vs 5★ Savings',
  subtitle: 'See the real annual cost difference',
  discomLabel: 'DISCOM / state',
  tonnageLegend: 'Tonnage',
  tonOptions: TON_OPTIONS,
  hoursLabel: 'Daily usage',
  hoursUnit: 'hrs/day',
  ctaLabel: 'Compare Savings',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  threeStarCostLabel: '3-star annual cost',
  fiveStarCostLabel: '5-star annual cost',
  savesLabel: 'A 5-star saves you',
  perYearSuffix: '/year',
  tenYearTemplate: '≈ {tenYear} over 10 years (at {rate}/unit)',
}

export default function StarComparisonTool({
  discoms,
  texts = defaultTexts,
}: {
  discoms: StarCompareDiscom[]
  texts?: StarComparisonToolTexts
}) {
  const [discomCode, setDiscomCode] = useState(discoms[0]?.code ?? '')
  const [tonnage, setTonnage] = useState('1.5')
  const [hours, setHours] = useState(8)

  const data = useMemo(() => {
    let rate = 0
    try {
      rate = marginalRatePerUnit(discomCode)
    } catch {
      return null
    }
    const ton = Number(tonnage)
    const units3 = acDailyUnits(ton, 3, hours) * 365
    const units5 = acDailyUnits(ton, 5, hours) * 365
    const cost3 = units3 * rate
    const cost5 = units5 * rate
    return {
      rate,
      cost3: Math.round(cost3),
      cost5: Math.round(cost5),
      annualSaving: Math.round(cost3 - cost5),
      tenYearSaving: Math.round((cost3 - cost5) * 10),
    }
  }, [discomCode, tonnage, hours])

  const max = data ? Math.max(data.cost3, data.cost5, 1) : 1

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="⚖️"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="cmp-discom"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.discomLabel}
          </label>
          <select
            id="cmp-discom"
            value={discomCode}
            onChange={(e) => setDiscomCode(e.target.value)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-brass focus:ring-2 focus:ring-brass/30"
          >
            {discoms.map((d) => (
              <option key={d.code} value={d.code}>
                {d.state} ({d.code})
              </option>
            ))}
          </select>
        </div>

        <OptionCardGroup
          legend={texts.tonnageLegend}
          options={texts.tonOptions}
          value={tonnage}
          onChange={setTonnage}
          columns={3}
        />

        <SliderField
          id="cmp-hours"
          label={texts.hoursLabel}
          value={hours}
          onChange={setHours}
          min={1}
          max={24}
          unit={texts.hoursUnit}
        />

        <CalculatorCta label={texts.ctaLabel} disclaimer={texts.disclaimer} />
      </form>

      {data && (
        <div className="mt-6 grid gap-4 rounded-xl bg-mist p-5">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-ash">
                  {texts.threeStarCostLabel}
                </span>
                <span className="tabular-nums">{formatINR(data.cost3)}</span>
              </div>
              <div className="mt-1 h-3 rounded-full bg-hairline">
                <div
                  className="h-3 rounded-full bg-brass"
                  style={{ width: `${(data.cost3 / max) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-ash">
                  {texts.fiveStarCostLabel}
                </span>
                <span className="tabular-nums">{formatINR(data.cost5)}</span>
              </div>
              <div className="mt-1 h-3 rounded-full bg-hairline">
                <div
                  className="h-3 rounded-full bg-spark-teal"
                  style={{ width: `${(data.cost5 / max) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-spark-teal/10 p-4">
            <p className="text-sm text-spark-teal">{texts.savesLabel}</p>
            <p className="font-display text-3xl font-bold tabular-nums text-spark-teal">
              {formatINR(data.annualSaving)}{texts.perYearSuffix}
            </p>
            <p className="text-sm text-spark-teal/80">
              {texts.tenYearTemplate
                .replace('{tenYear}', formatINR(data.tenYearSaving))
                .replace('{rate}', formatINR(data.rate))}
            </p>
          </div>
        </div>
      )}
    </CalculatorCard>
  )
}
