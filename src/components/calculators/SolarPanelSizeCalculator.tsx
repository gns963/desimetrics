'use client'

import { useMemo, useState } from 'react'
import { recommendSystemSize } from '@/lib/calc/solar'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface SolarPanelSizeCalculatorTexts {
  title: string
  subtitle: string
  unitsLabel: string
  unitsUnit: string
  offsetLabel: string
  offsetUnit: string
  offsetHint: string
  ctaLabel: string
  disclaimer: string
  recommendedSizeLabel: string
  roofAreaLabel: string
  roofAreaUnit: string
  /** Use {units} placeholder. */
  generationTemplate: string
}

const defaultTexts: SolarPanelSizeCalculatorTexts = {
  title: 'Solar Panel Size Calculator',
  subtitle: 'What system size and roof area you need',
  unitsLabel: 'Average monthly consumption',
  unitsUnit: 'units',
  offsetLabel: 'Bill offset target',
  offsetUnit: '%',
  offsetHint: '100% aims to fully offset your current usage; above 100% targets a surplus for export.',
  ctaLabel: 'Recommend System Size',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  recommendedSizeLabel: 'Recommended size',
  roofAreaLabel: 'Roof area needed',
  roofAreaUnit: 'sq ft',
  generationTemplate: '≈ {units} units/month generation',
}

export default function SolarPanelSizeCalculator({
  texts = defaultTexts,
}: {
  texts?: SolarPanelSizeCalculatorTexts
} = {}) {
  const [monthlyUnits, setMonthlyUnits] = useState(300)
  const [offsetPercent, setOffsetPercent] = useState(100)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: recommendSystemSize({ monthlyUnits, offsetPercent }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [monthlyUnits, offsetPercent])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="📐"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="panel-units"
          label={texts.unitsLabel}
          value={monthlyUnits}
          onChange={setMonthlyUnits}
          min={50}
          max={1000}
          step={10}
          unit={texts.unitsUnit}
        />

        <SliderField
          id="panel-offset"
          label={texts.offsetLabel}
          value={offsetPercent}
          onChange={setOffsetPercent}
          min={20}
          max={150}
          step={5}
          unit={texts.offsetUnit}
          hint={texts.offsetHint}
        />

        <CalculatorCta label={texts.ctaLabel} tone="brass" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hub-solar/15 bg-hub-solar/5 p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-ash/60">
                  {texts.recommendedSizeLabel}
                </p>
                <p className="font-display text-3xl font-bold tabular-nums text-hub-solar">
                  {result.recommendedKw} kW
                </p>
              </div>
              <div>
                <p className="text-sm text-ash/60">
                  {texts.roofAreaLabel}
                </p>
                <p className="font-display text-3xl font-bold tabular-nums text-hub-solar">
                  {result.roofAreaSqFt} {texts.roofAreaUnit}
                </p>
              </div>
            </div>
            <p className="text-sm text-ash/60">
              {texts.generationTemplate.replace('{units}', String(result.monthlyGeneration))}
            </p>
            <p className="text-xs text-ash/50">
              {result.notes[0]}
            </p>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
