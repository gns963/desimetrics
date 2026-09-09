'use client'

import { useMemo, useState } from 'react'
import { estimateCoolingTime } from '@/lib/calc/cooling'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const TON_OPTIONS: { value: string; label: string; icon: string }[] = [
  { value: '1', label: '1 Ton', icon: '❄️' },
  { value: '1.5', label: '1.5 Ton', icon: '❄️' },
  { value: '2', label: '2 Ton', icon: '🥶' },
]

export interface RoomCoolingTimeCalculatorTexts {
  title: string
  subtitle: string
  areaLabel: string
  areaUnit: string
  dropLabel: string
  dropUnit: string
  dropHint: string
  tonLegend: string
  tonOptions: { value: string; label: string; icon: string }[]
  ctaLabel: string
  disclaimer: string
  resultLabel: string
  minUnit: string
}

const defaultTexts: RoomCoolingTimeCalculatorTexts = {
  title: 'Room Cooling Time Calculator',
  subtitle: "Theoretical minimum time to cool your room's air",
  areaLabel: 'Room area',
  areaUnit: 'sq ft',
  dropLabel: 'Temperature drop needed',
  dropUnit: '°C',
  dropHint: 'Assumes a 9 ft ceiling height.',
  tonLegend: 'AC size',
  tonOptions: TON_OPTIONS,
  ctaLabel: 'Estimate Cooling Time',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  resultLabel: 'Theoretical minimum time',
  minUnit: 'min',
}

export default function RoomCoolingTimeCalculator({
  texts = defaultTexts,
}: {
  texts?: RoomCoolingTimeCalculatorTexts
} = {}) {
  const [area, setArea] = useState(150)
  const [dropTemp, setDropTemp] = useState(6)
  const [ton, setTon] = useState('1.5')

  const { result, error } = useMemo(() => {
    try {
      return {
        result: estimateCoolingTime({
          areaSqFt: area,
          ceilingHeightFt: 9,
          dropTempC: dropTemp,
          acTon: Number(ton),
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [area, dropTemp, ton])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="⏱️"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="cool-area"
          label={texts.areaLabel}
          value={area}
          onChange={setArea}
          min={50}
          max={500}
          step={10}
          unit={texts.areaUnit}
        />

        <SliderField
          id="cool-drop"
          label={texts.dropLabel}
          value={dropTemp}
          onChange={setDropTemp}
          min={1}
          max={15}
          unit={texts.dropUnit}
          hint={texts.dropHint}
        />

        <OptionCardGroup legend={texts.tonLegend} options={texts.tonOptions} value={ton} onChange={setTon} columns={3} />

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
                {result.minutesToCoolAirOnly} {texts.minUnit}
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
