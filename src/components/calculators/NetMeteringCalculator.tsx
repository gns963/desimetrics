'use client'

import { useMemo, useState } from 'react'
import { estimateNetMeteringEarnings } from '@/lib/calc/solar'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface NetMeteringCalculatorTexts {
  title: string
  subtitle: string
  generationLabel: string
  consumptionLabel: string
  unitsUnit: string
  rateLabel: string
  rateUnit: string
  rateHint: string
  ctaLabel: string
  disclaimer: string
  monthlyCreditLabel: string
  /** Use {amount} placeholder. */
  yearlyTemplate: string
  exportedLabel: string
  importedLabel: string
}

const defaultTexts: NetMeteringCalculatorTexts = {
  title: 'Net Metering Earnings Calculator',
  subtitle: 'What your exported solar units are worth',
  generationLabel: 'Monthly solar generation',
  consumptionLabel: 'Monthly consumption',
  unitsUnit: 'units',
  rateLabel: 'Export credit rate',
  rateUnit: '₹/unit',
  rateHint: "Check your DISCOM's net-metering policy — export rates vary by state.",
  ctaLabel: 'Calculate Export Credit',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  monthlyCreditLabel: 'Monthly export credit',
  yearlyTemplate: '≈ {amount}/year',
  exportedLabel: 'Units exported',
  importedLabel: 'Units still imported',
}

export default function NetMeteringCalculator({
  texts = defaultTexts,
}: {
  texts?: NetMeteringCalculatorTexts
} = {}) {
  const [generation, setGeneration] = useState(400)
  const [consumption, setConsumption] = useState(300)
  const [rate, setRate] = useState(4)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: estimateNetMeteringEarnings({
          monthlyGenerationUnits: generation,
          monthlyConsumptionUnits: consumption,
          exportRatePerUnit: rate,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [generation, consumption, rate])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔄"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="nm-generation"
          label={texts.generationLabel}
          value={generation}
          onChange={setGeneration}
          min={50}
          max={1500}
          step={10}
          unit={texts.unitsUnit}
        />

        <SliderField
          id="nm-consumption"
          label={texts.consumptionLabel}
          value={consumption}
          onChange={setConsumption}
          min={50}
          max={1500}
          step={10}
          unit={texts.unitsUnit}
        />

        <SliderField
          id="nm-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={0}
          max={10}
          step={0.25}
          unit={texts.rateUnit}
          hint={texts.rateHint}
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
            <div>
              <p className="text-sm text-ash/60">
                {texts.monthlyCreditLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-solar">
                {formatINR(result.monthlyExportCredit)}
              </p>
              <p className="text-sm text-ash/60">
                {texts.yearlyTemplate.replace('{amount}', formatINR(result.annualExportCredit))}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">
                {texts.exportedLabel}
              </dt>
              <dd className="text-right tabular-nums">{result.exportedUnits}</dd>
              <dt className="text-ash/60">
                {texts.importedLabel}
              </dt>
              <dd className="text-right tabular-nums">{result.importedUnits}</dd>
            </dl>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
