'use client'

import { useMemo, useState } from 'react'
import { sizeInverter, type BatteryVoltage } from '@/lib/calc/inverter'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const VOLTAGE_OPTIONS: { value: string; label: string; icon: string }[] = [
  { value: '12', label: '12V (1 battery)', icon: '🔋' },
  { value: '24', label: '24V (2 batteries)', icon: '🔋🔋' },
  { value: '48', label: '48V (4 batteries)', icon: '🔋🔋🔋' },
]

export interface InverterSizingCalculatorTexts {
  title: string
  subtitle: string
  loadLabel: string
  loadUnit: string
  loadHint: string
  hoursLabel: string
  hoursUnit: string
  voltageLegend: string
  voltageOptions: { value: string; label: string; icon: string }[]
  ctaLabel: string
  disclaimer: string
  inverterSizeLabel: string
  batteryCapacityLabel: string
}

const defaultTexts: InverterSizingCalculatorTexts = {
  title: 'Home UPS / Inverter Sizing Calculator',
  subtitle: 'What VA inverter and battery Ah you need',
  loadLabel: 'Total load to back up',
  loadUnit: 'W',
  loadHint: 'Add up the wattage of everything you want running during a power cut — fans, lights, fridge, TV, router.',
  hoursLabel: 'Backup duration needed',
  hoursUnit: 'hrs',
  voltageLegend: 'Battery bank voltage',
  voltageOptions: VOLTAGE_OPTIONS,
  ctaLabel: 'Calculate Sizing',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  inverterSizeLabel: 'Inverter/UPS size',
  batteryCapacityLabel: 'Battery capacity',
}

export default function InverterSizingCalculator({
  texts = defaultTexts,
}: {
  texts?: InverterSizingCalculatorTexts
} = {}) {
  const [loadWatts, setLoadWatts] = useState(600)
  const [backupHours, setBackupHours] = useState(4)
  const [voltage, setVoltage] = useState('12')

  const { result, error } = useMemo(() => {
    try {
      return {
        result: sizeInverter({
          totalLoadWatts: loadWatts,
          backupHours,
          batteryVoltage: Number(voltage) as BatteryVoltage,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [loadWatts, backupHours, voltage])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔌"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="inv-load"
          label={texts.loadLabel}
          value={loadWatts}
          onChange={setLoadWatts}
          min={100}
          max={3000}
          step={50}
          unit={texts.loadUnit}
          hint={texts.loadHint}
        />

        <SliderField
          id="inv-hours"
          label={texts.hoursLabel}
          value={backupHours}
          onChange={setBackupHours}
          min={1}
          max={12}
          unit={texts.hoursUnit}
        />

        <OptionCardGroup
          legend={texts.voltageLegend}
          options={texts.voltageOptions}
          value={voltage}
          onChange={setVoltage}
          columns={3}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-ash/60">
                  {texts.inverterSizeLabel}
                </p>
                <p className="font-display text-3xl font-bold tabular-nums text-hub-appliance">
                  {result.recommendedVA.toLocaleString('en-IN')} VA
                </p>
              </div>
              <div>
                <p className="text-sm text-ash/60">
                  {texts.batteryCapacityLabel}
                </p>
                <p className="font-display text-3xl font-bold tabular-nums text-hub-appliance">
                  {result.recommendedBatteryAh} Ah
                </p>
              </div>
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
