'use client'

import { useMemo, useState } from 'react'
import { calculateGratuity } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface GratuityCalculatorTexts {
  title: string
  subtitle: string
  salaryLabel: string
  yearsLabel: string
  yearsUnit: string
  yearsHint: string
  ctaLabel: string
  disclaimer: string
  payableLabel: string
  /** Use {years} placeholder. */
  eligibleTemplate: string
  notEligibleMessage: string
  cappedMessage: string
}

const defaultTexts: GratuityCalculatorTexts = {
  title: 'Gratuity Calculator',
  subtitle: "What you're owed under the Payment of Gratuity Act",
  salaryLabel: 'Last drawn monthly salary — Basic + DA (₹)',
  yearsLabel: 'Years of service',
  yearsUnit: 'yrs',
  yearsHint: 'A part-year over 6 months counts as a full year.',
  ctaLabel: 'Calculate Gratuity',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  payableLabel: 'Gratuity payable',
  eligibleTemplate: 'Based on {years} years of service (15/26 formula).',
  notEligibleMessage: 'Not eligible — gratuity requires at least 5 years of continuous service under the Payment of Gratuity Act.',
  cappedMessage: 'Capped at the statutory ceiling of ₹20,00,000.',
}

export default function GratuityCalculator({
  texts = defaultTexts,
}: {
  texts?: GratuityCalculatorTexts
} = {}) {
  const [salary, setSalary] = useState(50000)
  const [years, setYears] = useState(10)

  const result = useMemo(
    () => calculateGratuity(Math.max(0, salary), Math.max(0, years)),
    [salary, years],
  )

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="💼"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="grat-salary"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.salaryLabel}
          </label>
          <input
            id="grat-salary"
            type="number"
            min={0}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30"
          />
        </div>

        <SliderField
          id="grat-years"
          label={texts.yearsLabel}
          value={years}
          onChange={setYears}
          min={0}
          max={40}
          unit={texts.yearsUnit}
          hint={texts.yearsHint}
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-3">
          <p className="text-sm text-ash/60">
            {texts.payableLabel}
          </p>
          <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
            {formatINR(result.gratuity)}
          </p>
          {result.eligible ? (
            <p className="text-sm text-ash/60">
              {texts.eligibleTemplate.replace('{years}', String(result.roundedYears))}
            </p>
          ) : (
            <p className="rounded-lg bg-brass/10 px-3 py-2 text-sm text-brass">
              {texts.notEligibleMessage}
            </p>
          )}
          {result.capped && (
            <p className="text-xs text-brass">
              {texts.cappedMessage}
            </p>
          )}
        </div>
      </div>
    </CalculatorCard>
  )
}
