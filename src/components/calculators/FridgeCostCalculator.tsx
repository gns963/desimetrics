'use client'

import { useMemo, useState } from 'react'
import { fridgeCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface DiscomOption {
  code: string
  state: string
}

export interface FridgeCostCalculatorTexts {
  title: string
  subtitle: string
  discomLabel: string
  annualLabel: string
  annualUnit: string
  annualHint: string
  ctaLabel: string
  disclaimer: string
  monthlyCostLabel: string
  /** Use {annual} and {units} placeholders. */
  yearlyTemplate: string
  fromLabelLabel: string
  fromLabelUnit: string
  billedAtLabel: string
}

const defaultTexts: FridgeCostCalculatorTexts = {
  title: 'Fridge Cost Calculator',
  subtitle: "From your fridge's own BEE label figure",
  discomLabel: 'DISCOM / state',
  annualLabel: 'Annual energy consumption (from BEE label)',
  annualUnit: 'units/yr',
  annualHint: "Look for the yellow BEE star sticker on your fridge — it states 'annual energy consumption' in kWh/year directly.",
  ctaLabel: 'Calculate Fridge Cost',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  monthlyCostLabel: 'Estimated monthly cost',
  yearlyTemplate: '≈ {annual}/year · {units} units/day',
  fromLabelLabel: 'From BEE label',
  fromLabelUnit: 'units/yr',
  billedAtLabel: 'Billed at (top slab)',
}

export default function FridgeCostCalculator({
  discoms,
  texts = defaultTexts,
}: {
  discoms: DiscomOption[]
  texts?: FridgeCostCalculatorTexts
}) {
  const [discomCode, setDiscomCode] = useState(discoms[0]?.code ?? '')
  const [annualUnits, setAnnualUnits] = useState(200)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: fridgeCost({ discomCode, annualUnitsFromLabel: annualUnits }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [discomCode, annualUnits])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-brass focus:ring-2 focus:ring-brass/30'

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="❄️"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="fridge-discom"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.discomLabel}
          </label>
          <select
            id="fridge-discom"
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

        <SliderField
          id="fridge-annual"
          label={texts.annualLabel}
          value={annualUnits}
          onChange={setAnnualUnits}
          min={80}
          max={500}
          step={5}
          unit={texts.annualUnit}
          hint={texts.annualHint}
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
                  .replace('{units}', String(result.dailyUnits))}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">
                {texts.fromLabelLabel}
              </dt>
              <dd className="text-right tabular-nums">{result.annualUnitsFromLabel} {texts.fromLabelUnit}</dd>
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
