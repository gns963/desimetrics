'use client'

import { useMemo, useState } from 'react'
import { estimateTankFillTime } from '@/lib/calc/watertank'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface WaterTankFillCalculatorTexts {
  title: string
  subtitle: string
  capacityLabel: string
  capacityUnit: string
  flowLabel: string
  flowUnit: string
  flowHint: string
  ctaLabel: string
  disclaimer: string
  resultLabel: string
  minUnit: string
  /** Use {hours} placeholder. */
  hoursTemplate: string
}

const defaultTexts: WaterTankFillCalculatorTexts = {
  title: 'Water Tank Filling Time Calculator',
  subtitle: 'How long your tank takes to fill',
  capacityLabel: 'Tank capacity',
  capacityUnit: 'litres',
  flowLabel: 'Pump flow rate',
  flowUnit: 'LPM',
  flowHint: "Check your pump's rated flow (litres per minute) — actual flow is often lower once water is lifted to an overhead tank.",
  ctaLabel: 'Calculate Fill Time',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  resultLabel: 'Estimated fill time',
  minUnit: 'min',
  hoursTemplate: '≈ {hours} hours',
}

export default function WaterTankFillCalculator({
  texts = defaultTexts,
}: {
  texts?: WaterTankFillCalculatorTexts
} = {}) {
  const [capacity, setCapacity] = useState(1000)
  const [flowRate, setFlowRate] = useState(50)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: estimateTankFillTime({ capacityLiters: capacity, flowRateLpm: flowRate }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [capacity, flowRate])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🚰"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="tank-capacity"
          label={texts.capacityLabel}
          value={capacity}
          onChange={setCapacity}
          min={100}
          max={5000}
          step={50}
          unit={texts.capacityUnit}
        />

        <SliderField
          id="tank-flow"
          label={texts.flowLabel}
          value={flowRate}
          onChange={setFlowRate}
          min={10}
          max={300}
          step={5}
          unit={texts.flowUnit}
          hint={texts.flowHint}
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
          <div className="grid gap-3">
            <div>
              <p className="text-sm text-ash/60">
                {texts.resultLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-appliance">
                {result.minutes} {texts.minUnit}
              </p>
              <p className="text-sm text-ash/60">
                {texts.hoursTemplate.replace('{hours}', String(result.hours))}
              </p>
            </div>
            <p className="text-xs text-ash/50">
              {result.notes[0]}
            </p>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
