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

const INDUCTION_TYPES: { value: string; label: string; icon: string; watts: number }[] = [
  { value: 'basic', label: 'Basic (1200W)', icon: '🍳', watts: 1200 },
  { value: 'standard', label: 'Standard (1600W)', icon: '🔥', watts: 1600 },
  { value: 'high', label: 'High-power (2000W)', icon: '⚡', watts: 2000 },
  { value: 'custom', label: 'Custom', icon: '⚙️', watts: 0 },
]

export interface InductionCooktopCalculatorTexts {
  title: string
  subtitle: string
  discomLabel: string
  powerLegend: string
  cooktopTypes: { value: string; label: string; icon: string; watts: number }[]
  customWattageLabel: string
  customWattageUnit: string
  customWattageHint: string
  hoursLabel: string
  hoursUnit: string
  hoursHint: string
  ctaLabel: string
  disclaimer: string
  monthlyCostLabel: string
  /** Use {annual} and {units} placeholders. */
  yearlyTemplate: string
  wattageLabel: string
  perDayLabel: string
  billedAtLabel: string
}

const defaultTexts: InductionCooktopCalculatorTexts = {
  title: 'Induction Cooktop Cost Calculator',
  subtitle: "Estimate your induction cooktop's electricity cost",
  discomLabel: 'DISCOM / state',
  powerLegend: 'Cooktop power',
  cooktopTypes: INDUCTION_TYPES,
  customWattageLabel: 'Cooktop wattage',
  customWattageUnit: 'W',
  customWattageHint: "Check the wattage printed on the cooktop's rating label or box.",
  hoursLabel: 'Daily cooking time',
  hoursUnit: 'hrs/day',
  hoursHint: 'Active cooking time only — most households use an induction cooktop for well under an hour a day.',
  ctaLabel: 'Calculate Cooktop Cost',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  monthlyCostLabel: 'Estimated monthly cost',
  yearlyTemplate: '≈ {annual}/year · {units} units/month',
  wattageLabel: 'Wattage',
  perDayLabel: 'Units per day',
  billedAtLabel: 'Billed at (top slab)',
}

export default function InductionCooktopCalculator({
  discoms,
  texts = defaultTexts,
}: {
  discoms: DiscomOption[]
  texts?: InductionCooktopCalculatorTexts
}) {
  const [discomCode, setDiscomCode] = useState(discoms[0]?.code ?? '')
  const [cooktopType, setCooktopType] = useState('standard')
  const [customWatts, setCustomWatts] = useState(1600)
  const [hours, setHours] = useState(1)

  const wattage =
    cooktopType === 'custom' ? customWatts : (texts.cooktopTypes.find((c) => c.value === cooktopType)?.watts ?? 1600)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: simpleApplianceCost({ discomCode, wattage, hoursPerDay: hours }),
        error: null as string | null,
      }
    } catch (e) {
      return { result: null, error: e instanceof Error ? e.message : 'Calculation error' }
    }
  }, [discomCode, wattage, hours])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-brass focus:ring-2 focus:ring-brass/30'

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🍳"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="induction-discom" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.discomLabel}
          </label>
          <select
            id="induction-discom"
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

        <OptionCardGroup legend={texts.powerLegend} options={texts.cooktopTypes} value={cooktopType} onChange={setCooktopType} />

        {cooktopType === 'custom' && (
          <SliderField
            id="induction-watts"
            label={texts.customWattageLabel}
            value={customWatts}
            onChange={setCustomWatts}
            min={800}
            max={2200}
            step={50}
            unit={texts.customWattageUnit}
            hint={texts.customWattageHint}
          />
        )}

        <SliderField
          id="induction-hours"
          label={texts.hoursLabel}
          value={hours}
          onChange={setHours}
          min={0.25}
          max={6}
          step={0.25}
          unit={texts.hoursUnit}
          hint={texts.hoursHint}
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
              <p className="text-sm text-ash/60">{texts.monthlyCostLabel}</p>
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
              <dt className="text-ash/60">{texts.billedAtLabel}</dt>
              <dd className="text-right tabular-nums">{formatINR(result.effectiveRatePerUnit)}/unit</dd>
            </dl>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
