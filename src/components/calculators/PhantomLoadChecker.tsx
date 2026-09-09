'use client'

import { useMemo, useState } from 'react'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader } from './CalculatorShell'

export interface DiscomOption {
  code: string
  state: string
}

/** Commonly cited standby/always-on draws for typical Indian households —
 *  indicative planning figures, not measurements of a specific device. */
const STANDBY_DEVICES = [
  { id: 'router', name: 'Wi-Fi router', watts: 8 },
  { id: 'settop', name: 'Set-top box (DTH/cable)', watts: 12 },
  { id: 'tv', name: 'TV on standby (not switched off at plug)', watts: 3 },
  { id: 'pc', name: 'Desktop PC/monitor on standby', watts: 5 },
  { id: 'microwave', name: 'Microwave (clock/display)', watts: 3 },
  { id: 'charger', name: 'Phone/laptop charger left plugged in (no device)', watts: 1 },
  { id: 'inverter', name: 'Inverter/UPS in standby (not charging)', watts: 10 },
  { id: 'washer', name: 'Washing machine on standby', watts: 2 },
]

const DEFAULT_CHECKED_IDS = ['router', 'settop', 'tv']

export interface PhantomLoadCheckerTexts {
  title: string
  subtitle: string
  discomLabel: string
  legend: string
  devices: { id: string; name: string; watts: number }[]
  ctaLabel: string
  disclaimer: string
  /** Use {count}, {plural}, {watts}, {units} placeholders. */
  summaryTemplate: string
  perMonthUnit: string
  /** Use {amount} placeholder. */
  annualTemplate: string
}

const defaultTexts: PhantomLoadCheckerTexts = {
  title: 'Phantom Load / Standby Power Checker',
  subtitle: "What always-on devices cost you, even when 'off'",
  discomLabel: 'DISCOM / state',
  legend: 'Which of these stay plugged in 24/7 at your place?',
  devices: STANDBY_DEVICES,
  ctaLabel: 'Calculate Standby Cost',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  summaryTemplate: '{count} device{plural} · {watts}W continuous · {units} units/day',
  perMonthUnit: '/month',
  annualTemplate: '≈ {amount}/year, just from devices that never actually switch off.',
}

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100

export default function PhantomLoadChecker({
  discoms,
  texts = defaultTexts,
}: {
  discoms: DiscomOption[]
  texts?: PhantomLoadCheckerTexts
}) {
  const [discomCode, setDiscomCode] = useState(discoms[0]?.code ?? '')
  const [checked, setChecked] = useState<Set<string>>(new Set(DEFAULT_CHECKED_IDS))

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const result = useMemo(() => {
    const rate = marginalRatePerUnit(discomCode)
    const activeDevices = texts.devices.filter((d) => checked.has(d.id))
    const totalWatts = activeDevices.reduce((sum, d) => sum + d.watts, 0)
    const dailyUnits = (totalWatts * 24) / 1000
    const monthlyUnits = dailyUnits * 30
    const annualUnits = dailyUnits * 365
    return {
      rate,
      totalWatts,
      dailyUnits: round2(dailyUnits),
      monthlyCost: round2(monthlyUnits * rate),
      annualCost: round2(annualUnits * rate),
      count: activeDevices.length,
    }
  }, [discomCode, checked, texts.devices])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-brass focus:ring-2 focus:ring-brass/30'

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="👻"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <div className="mb-5">
        <label htmlFor="phantom-discom" className="mb-1.5 block text-sm font-medium text-ash">
          {texts.discomLabel}
        </label>
        <select
          id="phantom-discom"
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

      <fieldset className="mb-5">
        <legend className="mb-2 block text-sm font-medium text-ash">
          {texts.legend}
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {texts.devices.map((d) => (
            <label
              key={d.id}
              className="flex items-center gap-2.5 rounded-lg border border-hairline px-3 py-2.5 text-sm"
            >
              <input
                type="checkbox"
                checked={checked.has(d.id)}
                onChange={() => toggle(d.id)}
                className="accent-brass"
              />
              <span className="flex-1 text-ash">{d.name}</span>
              <span className="shrink-0 tabular-nums text-ash/50">
                {d.watts}W
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <CalculatorCta label={texts.ctaLabel} tone="appliance" disclaimer={texts.disclaimer} />

      <div className="mt-6 rounded-xl border border-hub-appliance/15 bg-hub-appliance/5 p-5">
        <p className="text-sm text-ash/60">
          {texts.summaryTemplate
            .replace('{count}', String(result.count))
            .replace('{plural}', result.count === 1 ? '' : 's')
            .replace('{watts}', String(result.totalWatts))
            .replace('{units}', String(result.dailyUnits))}
        </p>
        <p className="font-display text-4xl font-bold tabular-nums text-hub-appliance">
          {formatINR(result.monthlyCost)}
          <span className="ml-1 text-sm font-normal text-ash/50">{texts.perMonthUnit}</span>
        </p>
        <p className="mt-1 text-sm text-ash/60">
          {texts.annualTemplate.replace('{amount}', formatINR(result.annualCost))}
        </p>
      </div>
    </CalculatorCard>
  )
}
