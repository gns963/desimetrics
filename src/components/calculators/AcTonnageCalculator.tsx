'use client'

import { useMemo, useState } from 'react'
import {
  recommendTonnage,
  type FloorLevel,
  type SunExposure,
} from '@/lib/calc/ac'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const SUN_OPTIONS: { value: SunExposure; label: string; icon: string }[] = [
  { value: 'low', label: 'Shaded', icon: '🌥️' },
  { value: 'medium', label: 'Medium', icon: '⛅' },
  { value: 'high', label: 'Direct sun', icon: '☀️' },
]
const FLOOR_OPTIONS: { value: FloorLevel; label: string; icon: string }[] = [
  { value: 'other', label: 'Not top floor', icon: '🏢' },
  { value: 'top', label: 'Top floor', icon: '🏠' },
]

export interface AcTonnageCalculatorTexts {
  title: string
  subtitle: string
  areaLabel: string
  areaUnit: string
  areaError: string
  sunLegend: string
  sunOptions: { value: SunExposure; label: string; icon: string }[]
  floorLegend: string
  floorOptions: { value: FloorLevel; label: string; icon: string }[]
  ctaLabel: string
  disclaimer: string
  recommendedLabel: string
  tonUnit: string
  /** Use {btu} and {rawTons} placeholders. */
  coolingLoadTemplate: string
}

const defaultTexts: AcTonnageCalculatorTexts = {
  title: 'AC Tonnage Calculator',
  subtitle: 'Find the right AC size for your room',
  areaLabel: 'Room area',
  areaUnit: 'sq ft',
  areaError: 'Enter a valid room area in sq ft.',
  sunLegend: 'Sun exposure',
  sunOptions: SUN_OPTIONS,
  floorLegend: 'Floor level',
  floorOptions: FLOOR_OPTIONS,
  ctaLabel: 'Find My AC Size',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  recommendedLabel: 'Recommended AC size',
  tonUnit: 'ton',
  coolingLoadTemplate: 'Estimated cooling load: {btu} BTU ({rawTons} ton raw)',
}

export default function AcTonnageCalculator({
  texts = defaultTexts,
}: {
  texts?: AcTonnageCalculatorTexts
} = {}) {
  const [area, setArea] = useState(150)
  const [sun, setSun] = useState<SunExposure>('medium')
  const [floor, setFloor] = useState<FloorLevel>('other')

  const { result, error } = useMemo(() => {
    if (area <= 0) return { result: null, error: texts.areaError }
    return {
      result: recommendTonnage({ areaSqFt: area, sunExposure: sun, floor }),
      error: null as string | null,
    }
  }, [area, sun, floor, texts.areaError])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="📐"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="ton-area"
          label={texts.areaLabel}
          value={area}
          onChange={setArea}
          min={50}
          max={500}
          step={10}
          unit={texts.areaUnit}
        />

        <OptionCardGroup
          legend={texts.sunLegend}
          options={texts.sunOptions}
          value={sun}
          onChange={setSun}
          columns={3}
        />

        <OptionCardGroup
          legend={texts.floorLegend}
          options={texts.floorOptions}
          value={floor}
          onChange={setFloor}
          columns={2}
        />

        <CalculatorCta label={texts.ctaLabel} disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl bg-mist p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-3">
            <p className="text-sm text-ash/60">
              {texts.recommendedLabel}
            </p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {result.recommendedTon} {texts.tonUnit}
            </p>
            <p className="text-sm text-ash/60">
              {texts.coolingLoadTemplate
                .replace('{btu}', result.coolingBtu.toLocaleString('en-IN'))
                .replace('{rawTons}', String(result.rawTons))}
            </p>
            {result.notes[0] && (
              <p className="rounded-lg bg-brass/10 px-3 py-2 text-xs text-brass">
                {result.notes[0]}
              </p>
            )}
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
