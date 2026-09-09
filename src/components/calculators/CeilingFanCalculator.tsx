'use client'

import { useMemo, useState } from 'react'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import {
  CalculatorCard,
  CalculatorCta,
  CalculatorHeader,
  OptionCardGroup,
  SliderField,
} from './CalculatorShell'

export interface DiscomOption {
  code: string
  state: string
}

const FAN_TYPES: { value: string; label: string; icon: string; watts: number }[] = [
  { value: 'standard', label: 'Standard', icon: '🌀', watts: 75 },
  { value: 'star', label: 'BEE 5-star', icon: '⭐', watts: 50 },
  { value: 'bldc', label: 'BLDC', icon: '🍃', watts: 32 },
  { value: 'custom', label: 'Custom', icon: '⚙️', watts: 0 },
]

export interface CeilingFanCalculatorTexts {
  title: string
  subtitle: string
  discomLabel: string
  fanTypeLegend: string
  fanTypes: { value: string; label: string; icon: string; watts: number }[]
  customWattageLabel: string
  customWattageUnit: string
  customWattageHint: string
  hoursLabel: string
  hoursUnit: string
  ctaLabel: string
  disclaimer: string
  monthlyCostLabel: string
  /** Use {annual} and {units} placeholders. */
  yearlyTemplate: string
  wattageLabel: string
  perDayLabel: string
  billedAtLabel: string
}

const defaultTexts: CeilingFanCalculatorTexts = {
  title: 'Ceiling Fan Cost Calculator',
  subtitle: "Estimate your ceiling fan's electricity cost",
  discomLabel: 'DISCOM / state',
  fanTypeLegend: 'Fan type',
  fanTypes: FAN_TYPES,
  customWattageLabel: 'Fan wattage',
  customWattageUnit: 'W',
  customWattageHint: "Check the wattage printed on the fan's box or motor label.",
  hoursLabel: 'Daily usage',
  hoursUnit: 'hrs/day',
  ctaLabel: 'Calculate Fan Cost',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  monthlyCostLabel: 'Estimated monthly cost',
  yearlyTemplate: '≈ {annual}/year · {units} units/month',
  wattageLabel: 'Wattage',
  perDayLabel: 'Units per day',
  billedAtLabel: 'Billed at (top slab)',
}

export default function CeilingFanCalculator({
  discoms,
  texts = defaultTexts,
}: {
  discoms: DiscomOption[]
  texts?: CeilingFanCalculatorTexts
}) {
  const [discomCode, setDiscomCode] = useState(discoms[0]?.code ?? '')
  const [fanType, setFanType] = useState('standard')
  const [customWatts, setCustomWatts] = useState(75)
  const [hours, setHours] = useState(10)

  const wattage =
    fanType === 'custom' ? customWatts : (texts.fanTypes.find((f) => f.value === fanType)?.watts ?? 75)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: simpleApplianceCost({ discomCode, wattage, hoursPerDay: hours }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [discomCode, wattage, hours])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-brass focus:ring-2 focus:ring-brass/30'

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🌀"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="fan-discom"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.discomLabel}
          </label>
          <select
            id="fan-discom"
            value={discomCode}
            onChange={(e) => setDiscomCode(e.target.value)}
            className={fieldCls}
          >
            {discoms.map((d) => (
              <option key={d.code} value={d.code}>
                {d.state} ({d.code})
              </option>
            ))}
          </select>
        </div>

        <OptionCardGroup legend={texts.fanTypeLegend} options={texts.fanTypes} value={fanType} onChange={setFanType} />

        {fanType === 'custom' && (
          <SliderField
            id="fan-watts"
            label={texts.customWattageLabel}
            value={customWatts}
            onChange={setCustomWatts}
            min={10}
            max={100}
            unit={texts.customWattageUnit}
            hint={texts.customWattageHint}
          />
        )}

        <SliderField
          id="fan-hours"
          label={texts.hoursLabel}
          value={hours}
          onChange={setHours}
          min={1}
          max={24}
          unit={texts.hoursUnit}
        />

        <CalculatorCta label={texts.ctaLabel} tone="appliance" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hub-appliance/15 bg-hub-appliance/5 p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">
                {texts.monthlyCostLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-appliance">
                {formatINR(result.monthlyCost)}
              </p>
              <p className="text-sm text-ash/60">
                {texts.yearlyTemplate
                  .replace('{annual}', formatINR(result.annualCost))
                  .replace('{units}', String(result.monthlyUnits))}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">{texts.wattageLabel}</dt>
              <dd className="text-right tabular-nums">{wattage} W</dd>
              <dt className="text-ash/60">{texts.perDayLabel}</dt>
              <dd className="text-right tabular-nums">{result.dailyUnits}</dd>
              <dt className="text-ash/60">
                {texts.billedAtLabel}
              </dt>
              <dd className="text-right tabular-nums">
                {formatINR(result.effectiveRatePerUnit)}/unit
              </dd>
            </dl>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
