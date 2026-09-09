'use client'

import { useMemo, useState } from 'react'
import { sizeSolarBattery, type BatteryChemistry } from '@/lib/calc/solar'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const CHEMISTRY_OPTIONS: { value: BatteryChemistry; label: string; icon: string }[] = [
  { value: 'lead-acid', label: 'Lead-acid', icon: '🔋' },
  { value: 'lithium', label: 'Lithium', icon: '⚡' },
]

export interface SolarBatteryBackupCalculatorTexts {
  title: string
  subtitle: string
  loadLabel: string
  loadUnit: string
  loadHint: string
  daysLabel: string
  daysUnit: string
  daysHint: string
  chemistryLegend: string
  chemistryOptions: { value: BatteryChemistry; label: string; icon: string }[]
  ctaLabel: string
  disclaimer: string
  recommendedLabel: string
}

const defaultTexts: SolarBatteryBackupCalculatorTexts = {
  title: 'Solar Battery Backup Calculator',
  subtitle: 'Battery capacity for night-time or cloudy-day backup',
  loadLabel: 'Daily critical load to back up',
  loadUnit: 'kWh',
  loadHint: 'The essentials you want covered overnight — lights, fridge, fans, router.',
  daysLabel: 'Days of autonomy',
  daysUnit: 'days',
  daysHint: 'How many consecutive low-sun days you want to be covered for.',
  chemistryLegend: 'Battery chemistry',
  chemistryOptions: CHEMISTRY_OPTIONS,
  ctaLabel: 'Size My Battery',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  recommendedLabel: 'Recommended battery capacity',
}

export default function SolarBatteryBackupCalculator({
  texts = defaultTexts,
}: {
  texts?: SolarBatteryBackupCalculatorTexts
} = {}) {
  const [dailyLoad, setDailyLoad] = useState(3)
  const [days, setDays] = useState(1)
  const [chemistry, setChemistry] = useState<BatteryChemistry>('lead-acid')

  const { result, error } = useMemo(() => {
    try {
      return {
        result: sizeSolarBattery({ dailyLoadKwh: dailyLoad, daysOfAutonomy: days, chemistry }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [dailyLoad, days, chemistry])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔋"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="solar-batt-load"
          label={texts.loadLabel}
          value={dailyLoad}
          onChange={setDailyLoad}
          min={0.5}
          max={20}
          step={0.5}
          unit={texts.loadUnit}
          hint={texts.loadHint}
        />

        <SliderField
          id="solar-batt-days"
          label={texts.daysLabel}
          value={days}
          onChange={setDays}
          min={1}
          max={5}
          unit={texts.daysUnit}
          hint={texts.daysHint}
        />

        <OptionCardGroup
          legend={texts.chemistryLegend}
          options={texts.chemistryOptions}
          value={chemistry}
          onChange={setChemistry}
          columns={2}
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
          <div className="grid gap-3">
            <div>
              <p className="text-sm text-ash/60">
                {texts.recommendedLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-solar">
                {result.recommendedCapacityKwh} kWh
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
