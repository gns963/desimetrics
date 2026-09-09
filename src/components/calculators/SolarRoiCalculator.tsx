'use client'

import { useMemo, useState } from 'react'
import { calculateSolarRoi } from '@/lib/calc/solar'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface SolarDiscomOption {
  code: string
  state: string
}

export interface SolarRoiCalculatorTexts {
  title: string
  subtitle: string
  discomLabel: string
  unitsLabel: string
  unitsUnit: string
  kwLabel: string
  kwUnit: string
  kwHint: string
  ctaLabel: string
  disclaimer: string
  paybackLabel: string
  paybackUnit: string
  /** Use {amount} placeholder. */
  thenSavesTemplate: string
  recoveredLabel: string
  systemCostLabel: string
  subsidyLabel: string
  netCostLabel: string
  annualGenLabel: string
  annualGenUnit: string
  monthlySavingsLabel: string
  lifetimeSavingsLabel: string
}

const defaultTexts: SolarRoiCalculatorTexts = {
  title: 'Solar ROI Calculator',
  subtitle: 'Payback period and savings from a rooftop system',
  discomLabel: 'Your DISCOM / state',
  unitsLabel: 'Average monthly consumption',
  unitsUnit: 'units',
  kwLabel: 'System size',
  kwUnit: 'kW',
  kwHint: 'Tip: ~1 kW per 100–150 monthly units is a common starting point.',
  ctaLabel: 'Calculate Solar Savings',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  paybackLabel: 'Payback period',
  paybackUnit: 'yrs',
  thenSavesTemplate: 'then ~{amount} saved',
  recoveredLabel: 'System cost recovered, year 1',
  systemCostLabel: 'System cost',
  subsidyLabel: 'PM Surya Ghar subsidy',
  netCostLabel: 'Net cost',
  annualGenLabel: 'Annual generation',
  annualGenUnit: 'units',
  monthlySavingsLabel: 'Monthly savings',
  lifetimeSavingsLabel: '25-year net savings',
}

export default function SolarRoiCalculator({
  discoms,
  defaultDiscomCode,
  texts = defaultTexts,
}: {
  discoms: SolarDiscomOption[]
  defaultDiscomCode?: string
  texts?: SolarRoiCalculatorTexts
}) {
  const [discomCode, setDiscomCode] = useState(defaultDiscomCode ?? discoms[0]?.code ?? '')
  const [units, setUnits] = useState(300)
  const [kw, setKw] = useState(3)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: calculateSolarRoi({
          discomCode,
          monthlyUnits: units,
          systemSizeKw: kw,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [discomCode, units, kw])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="☀️"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="solar-discom"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.discomLabel}
          </label>
          <select
            id="solar-discom"
            value={discomCode}
            onChange={(e) => setDiscomCode(e.target.value)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-brass focus:ring-2 focus:ring-brass/30"
          >
            {discoms.map((d) => (
              <option key={d.code} value={d.code}>
                {d.state} ({d.code})
              </option>
            ))}
          </select>
        </div>

        <SliderField
          id="solar-units"
          label={texts.unitsLabel}
          value={units}
          onChange={setUnits}
          min={0}
          max={1500}
          step={10}
          unit={texts.unitsUnit}
        />

        <SliderField
          id="solar-kw"
          label={texts.kwLabel}
          value={kw}
          onChange={setKw}
          min={0.5}
          max={10}
          step={0.5}
          unit={texts.kwUnit}
          hint={texts.kwHint}
        />

        <CalculatorCta label={texts.ctaLabel} disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl bg-gradient-to-br from-hub-solar/15 via-hub-solar/5 to-transparent p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">
                {texts.paybackLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-spark-teal">
                {result.paybackYears != null
                  ? `${result.paybackYears} ${texts.paybackUnit}`
                  : '—'}
              </p>
              <p className="text-sm text-ash/60">
                {texts.thenSavesTemplate.replace(
                  '{amount}',
                  `${formatINR(result.annualSavings)}/year`,
                )}
              </p>
            </div>

            {result.netCost > 0 && (
              <div>
                <div className="flex items-baseline justify-between text-xs text-ash/60">
                  <span>{texts.recoveredLabel}</span>
                  <span className="font-semibold tabular-nums text-hub-solar">
                    {Math.min(100, Math.round((result.annualSavings / result.netCost) * 100))}%
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/60">
                  <div
                    className="h-2 rounded-full bg-hub-solar transition-[width] duration-700"
                    style={{
                      width: `${Math.min(100, (result.annualSavings / result.netCost) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">
                {texts.systemCostLabel}
              </dt>
              <dd className="text-right tabular-nums">
                {formatINR(result.systemCost)}
              </dd>
              <dt className="text-spark-teal">{texts.subsidyLabel}</dt>
              <dd className="text-right tabular-nums text-spark-teal">
                −{formatINR(result.subsidy)}
              </dd>
              <dt className="font-medium text-ash">
                {texts.netCostLabel}
              </dt>
              <dd className="text-right font-medium tabular-nums">
                {formatINR(result.netCost)}
              </dd>
              <dt className="text-ash/60">
                {texts.annualGenLabel}
              </dt>
              <dd className="text-right tabular-nums">
                {Math.round(result.annualGeneration)} {texts.annualGenUnit}
              </dd>
              <dt className="text-ash/60">
                {texts.monthlySavingsLabel}
              </dt>
              <dd className="text-right tabular-nums">
                {formatINR(result.monthlySavings)}
              </dd>
              <dt className="text-ash/60">
                {texts.lifetimeSavingsLabel}
              </dt>
              <dd className="text-right tabular-nums">
                {formatINR(result.lifetimeSavings)}
              </dd>
            </dl>

            <p className="text-xs text-ash/40">
              {result.notes[0]}
            </p>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
