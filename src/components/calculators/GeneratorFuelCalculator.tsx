'use client'

import { useMemo, useState } from 'react'
import { estimateGeneratorCost } from '@/lib/calc/fuel'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface GeneratorFuelCalculatorTexts {
  title: string
  subtitle: string
  rateLabel: string
  rateUnit: string
  rateHint: string
  priceLabel: string
  priceUnit: string
  hoursLabel: string
  hoursUnit: string
  ctaLabel: string
  disclaimer: string
  totalCostLabel: string
  /** Use {litres} and {perHour} placeholders. */
  summaryTemplate: string
}

const defaultTexts: GeneratorFuelCalculatorTexts = {
  title: 'Generator Fuel Consumption Calculator',
  subtitle: "From your genset's own rated consumption",
  rateLabel: 'Fuel consumption rate',
  rateUnit: 'L/hr',
  rateHint: "From your generator's spec sheet or manual, at your typical load.",
  priceLabel: 'Fuel price',
  priceUnit: '₹/litre',
  hoursLabel: 'Hours run',
  hoursUnit: 'hrs',
  ctaLabel: 'Calculate Fuel Cost',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  totalCostLabel: 'Total fuel cost',
  summaryTemplate: '{litres} litres · {perHour}/hour',
}

export default function GeneratorFuelCalculator({
  texts = defaultTexts,
}: {
  texts?: GeneratorFuelCalculatorTexts
} = {}) {
  const [rate, setRate] = useState(2)
  const [price, setPrice] = useState(95)
  const [hours, setHours] = useState(4)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: estimateGeneratorCost({
          consumptionRateLph: rate,
          fuelPricePerLitre: price,
          hoursRun: hours,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [rate, price, hours])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🛠️"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="gen-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={0.2}
          max={20}
          step={0.1}
          unit={texts.rateUnit}
          hint={texts.rateHint}
        />

        <SliderField
          id="gen-price"
          label={texts.priceLabel}
          value={price}
          onChange={setPrice}
          min={60}
          max={130}
          unit={texts.priceUnit}
        />

        <SliderField
          id="gen-hours"
          label={texts.hoursLabel}
          value={hours}
          onChange={setHours}
          min={0.5}
          max={24}
          step={0.5}
          unit={texts.hoursUnit}
        />

        <CalculatorCta label={texts.ctaLabel} tone="fuel" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hub-fuel/15 bg-hub-fuel/5 p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">
                {texts.totalCostLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-fuel">
                {formatINR(result.totalCost)}
              </p>
              <p className="text-sm text-ash/60">
                {texts.summaryTemplate
                  .replace('{litres}', String(result.litresUsed))
                  .replace('{perHour}', formatINR(result.costPerHour))}
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
