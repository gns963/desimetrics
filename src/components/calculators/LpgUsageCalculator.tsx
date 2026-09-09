'use client'

import { useMemo, useState } from 'react'
import { estimateLpgUsage } from '@/lib/calc/fuel'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const CYLINDER_OPTIONS: { value: string; label: string; icon: string }[] = [
  { value: '5', label: '5 kg', icon: '🫙' },
  { value: '14.2', label: '14.2 kg', icon: '🛢️' },
  { value: '19', label: '19 kg', icon: '🛢️' },
]

export interface LpgUsageCalculatorTexts {
  title: string
  subtitle: string
  cylinderLegend: string
  cylinderOptions: { value: string; label: string; icon: string }[]
  priceLabel: string
  priceUnit: string
  priceHint: string
  hoursLabel: string
  hoursUnit: string
  hoursHint: string
  ctaLabel: string
  disclaimer: string
  daysRemainingLabel: string
  daysUnit: string
  /** Use {daily} and {monthly} placeholders. */
  costSummaryTemplate: string
}

const defaultTexts: LpgUsageCalculatorTexts = {
  title: 'LPG Cylinder Usage Calculator',
  subtitle: 'How long your cylinder will last',
  cylinderLegend: 'Cylinder size',
  cylinderOptions: CYLINDER_OPTIONS,
  priceLabel: 'Cylinder price',
  priceUnit: '₹',
  priceHint: 'Check your latest refill receipt — price varies by state and company.',
  hoursLabel: 'Daily burner-hours',
  hoursUnit: 'hrs/day',
  hoursHint: 'Total active flame time across all burners you use in a day.',
  ctaLabel: 'Calculate LPG Usage',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  daysRemainingLabel: 'Estimated days remaining',
  daysUnit: 'days',
  costSummaryTemplate: '≈ {daily}/day · {monthly}/month equivalent',
}

export default function LpgUsageCalculator({
  texts = defaultTexts,
}: {
  texts?: LpgUsageCalculatorTexts
} = {}) {
  const [cylinderKg, setCylinderKg] = useState('14.2')
  const [price, setPrice] = useState(900)
  const [dailyHours, setDailyHours] = useState(1.5)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: estimateLpgUsage({
          cylinderKg: Number(cylinderKg),
          cylinderPrice: price,
          dailyBurnerHours: dailyHours,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [cylinderKg, price, dailyHours])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔥"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <OptionCardGroup
          legend={texts.cylinderLegend}
          options={texts.cylinderOptions}
          value={cylinderKg}
          onChange={setCylinderKg}
          columns={3}
        />

        <SliderField
          id="lpg-price"
          label={texts.priceLabel}
          value={price}
          onChange={setPrice}
          min={300}
          max={2000}
          step={10}
          unit={texts.priceUnit}
          hint={texts.priceHint}
        />

        <SliderField
          id="lpg-hours"
          label={texts.hoursLabel}
          value={dailyHours}
          onChange={setDailyHours}
          min={0.5}
          max={6}
          step={0.5}
          unit={texts.hoursUnit}
          hint={texts.hoursHint}
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
                {texts.daysRemainingLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-fuel">
                {result.daysRemaining} {texts.daysUnit}
              </p>
              <p className="text-sm text-ash/60">
                {texts.costSummaryTemplate
                  .replace('{daily}', formatINR(result.dailyCost))
                  .replace('{monthly}', formatINR(result.monthlyCost))}
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
