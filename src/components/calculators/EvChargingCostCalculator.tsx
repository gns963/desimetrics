'use client'

import { useMemo, useState } from 'react'
import { calculateEvChargingCost } from '@/lib/calc/ev'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface DiscomOption {
  code: string
  state: string
}

export interface EvChargingCostCalculatorTexts {
  title: string
  subtitle: string
  discomLabel: string
  batteryLabel: string
  batteryUnit: string
  rangeLabel: string
  rangeUnit: string
  ctaLabel: string
  disclaimer: string
  costToFullChargeLabel: string
  /** Use {amount} placeholder. */
  perKmTemplate: string
  unitsNeededLabel: string
  billedAtLabel: string
}

const defaultTexts: EvChargingCostCalculatorTexts = {
  title: 'EV Charging Cost Calculator',
  subtitle: 'What a full home charge costs',
  discomLabel: 'DISCOM / state',
  batteryLabel: 'Battery capacity',
  batteryUnit: 'kWh',
  rangeLabel: 'Full-charge range',
  rangeUnit: 'km',
  ctaLabel: 'Calculate Charging Cost',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  costToFullChargeLabel: 'Cost to fully charge',
  perKmTemplate: '≈ {amount}/km',
  unitsNeededLabel: 'Units needed',
  billedAtLabel: 'Billed at (top slab)',
}

export default function EvChargingCostCalculator({
  discoms,
  texts = defaultTexts,
}: {
  discoms: DiscomOption[]
  texts?: EvChargingCostCalculatorTexts
}) {
  const [discomCode, setDiscomCode] = useState(discoms[0]?.code ?? '')
  const [battery, setBattery] = useState(30)
  const [range, setRange] = useState(200)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: calculateEvChargingCost({
          discomCode,
          batteryCapacityKwh: battery,
          fullRangeKm: range,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [discomCode, battery, range])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-brass focus:ring-2 focus:ring-brass/30'

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔌"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="ev-discom"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.discomLabel}
          </label>
          <select
            id="ev-discom"
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
          id="ev-battery"
          label={texts.batteryLabel}
          value={battery}
          onChange={setBattery}
          min={5}
          max={100}
          unit={texts.batteryUnit}
        />

        <SliderField
          id="ev-range"
          label={texts.rangeLabel}
          value={range}
          onChange={setRange}
          min={50}
          max={600}
          step={10}
          unit={texts.rangeUnit}
        />

        <CalculatorCta label={texts.ctaLabel} tone="brass" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hub-electricity/15 bg-hub-electricity/5 p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">
                {texts.costToFullChargeLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-electricity">
                {formatINR(result.costToFullCharge)}
              </p>
              {result.costPerKm != null && (
                <p className="text-sm text-ash/60">
                  {texts.perKmTemplate.replace('{amount}', formatINR(result.costPerKm))}
                </p>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">{texts.unitsNeededLabel}</dt>
              <dd className="text-right tabular-nums">{result.unitsNeeded}</dd>
              <dt className="text-ash/60">
                {texts.billedAtLabel}
              </dt>
              <dd className="text-right tabular-nums">
                {formatINR(result.effectiveRatePerUnit)}/unit
              </dd>
            </dl>
            <p className="text-xs text-ash/50">
              {result.notes[0]}
            </p>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
