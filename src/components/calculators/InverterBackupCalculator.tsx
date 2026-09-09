'use client'

import { useMemo, useState } from 'react'
import { estimateBackupTime, type BatteryVoltage } from '@/lib/calc/inverter'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const VOLTAGE_OPTIONS: { value: string; label: string; icon: string }[] = [
  { value: '12', label: '12V (1 battery)', icon: '🔋' },
  { value: '24', label: '24V (2 batteries)', icon: '🔋🔋' },
  { value: '48', label: '48V (4 batteries)', icon: '🔋🔋🔋' },
]

export interface InverterBackupCalculatorTexts {
  title: string
  subtitle: string
  ahLabel: string
  ahUnit: string
  ahHint: string
  voltageLegend: string
  voltageOptions: { value: string; label: string; icon: string }[]
  loadLabel: string
  loadUnit: string
  ctaLabel: string
  disclaimer: string
  safeTimeLabel: string
  safeTimeSub: string
  fullTimeLabel: string
  fullTimeSub: string
  hoursUnit: string
}

const defaultTexts: InverterBackupCalculatorTexts = {
  title: 'Inverter Battery Backup Calculator',
  subtitle: 'How long your battery will actually last',
  ahLabel: 'Battery capacity',
  ahUnit: 'Ah',
  ahHint: "Printed on the battery's nameplate, e.g. '150 Ah'.",
  voltageLegend: 'Battery bank voltage',
  voltageOptions: VOLTAGE_OPTIONS,
  loadLabel: 'Connected load',
  loadUnit: 'W',
  ctaLabel: 'Calculate Backup Time',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  safeTimeLabel: 'Safe backup time',
  safeTimeSub: '50% depth of discharge',
  fullTimeLabel: 'Full-capacity time',
  fullTimeSub: 'fully drained',
  hoursUnit: 'hrs',
}

export default function InverterBackupCalculator({
  texts = defaultTexts,
}: {
  texts?: InverterBackupCalculatorTexts
} = {}) {
  const [batteryAh, setBatteryAh] = useState(150)
  const [voltage, setVoltage] = useState('12')
  const [loadWatts, setLoadWatts] = useState(400)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: estimateBackupTime({
          batteryAh,
          batteryVoltage: Number(voltage) as BatteryVoltage,
          loadWatts,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [batteryAh, voltage, loadWatts])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔋"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="backup-ah"
          label={texts.ahLabel}
          value={batteryAh}
          onChange={setBatteryAh}
          min={20}
          max={300}
          step={5}
          unit={texts.ahUnit}
          hint={texts.ahHint}
        />

        <OptionCardGroup
          legend={texts.voltageLegend}
          options={texts.voltageOptions}
          value={voltage}
          onChange={setVoltage}
          columns={3}
        />

        <SliderField
          id="backup-load"
          label={texts.loadLabel}
          value={loadWatts}
          onChange={setLoadWatts}
          min={50}
          max={2000}
          step={25}
          unit={texts.loadUnit}
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
                  {texts.safeTimeLabel}
                </p>
                <p className="font-display text-3xl font-bold tabular-nums text-hub-appliance">
                  {result.safeCapacityHours} {texts.hoursUnit}
                </p>
                <p className="text-xs text-ash/50">
                  {texts.safeTimeSub}
                </p>
              </div>
              <div>
                <p className="text-sm text-ash/60">
                  {texts.fullTimeLabel}
                </p>
                <p className="font-display text-3xl font-bold tabular-nums text-ink-navy">
                  {result.fullCapacityHours} {texts.hoursUnit}
                </p>
                <p className="text-xs text-ash/50">
                  {texts.fullTimeSub}
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
