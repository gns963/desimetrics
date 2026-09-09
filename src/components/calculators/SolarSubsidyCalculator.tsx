'use client'

import { useMemo, useState } from 'react'
import { pmSuryaGharSubsidy } from '@/lib/calc/solar'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

const CRITERIA: { key: string; label: string }[] = [
  { key: 'residential', label: 'This is a residential (household) connection' },
  { key: 'ownRoof', label: 'I own the house / have rights to the roof' },
  { key: 'gridConnected', label: 'The home has a valid grid electricity connection' },
  { key: 'notAvailed', label: 'I have not already claimed a rooftop solar subsidy' },
]

export interface SolarSubsidyCalculatorTexts {
  title: string
  subtitle: string
  kwLabel: string
  kwUnit: string
  eligibilityLegend: string
  criteria: { key: string; label: string }[]
  ctaLabel: string
  disclaimer: string
  estimateLabel: string
  eligibleMsg: string
  notEligibleMsg: string
  tier1: string
  tier2: string
  tier3: string
  aboveCapNote: string
}

const defaultTexts: SolarSubsidyCalculatorTexts = {
  title: 'PM Surya Ghar Subsidy Checker',
  subtitle: 'Estimate your rooftop solar subsidy and eligibility',
  kwLabel: 'Planned system size',
  kwUnit: 'kW',
  eligibilityLegend: 'Eligibility',
  criteria: CRITERIA,
  ctaLabel: 'Check My Subsidy',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  estimateLabel: 'Estimated PM Surya Ghar subsidy',
  eligibleMsg: '✅ You appear eligible for PM Surya Ghar.',
  notEligibleMsg: '⚠️ Tick all criteria above to qualify for the subsidy.',
  tier1: '₹30,000/kW for the first 2 kW',
  tier2: '₹18,000 for the 3rd kW',
  tier3: 'Capped at ₹78,000 (systems of 3 kW and above)',
  aboveCapNote: 'Systems above 3 kW still receive the same ₹78,000 cap.',
}

export default function SolarSubsidyCalculator({
  texts = defaultTexts,
}: {
  texts?: SolarSubsidyCalculatorTexts
} = {}) {
  const [kw, setKw] = useState(3)
  const [checks, setChecks] = useState<Record<string, boolean>>({
    residential: true,
    ownRoof: true,
    gridConnected: true,
    notAvailed: true,
  })

  const subsidy = useMemo(() => pmSuryaGharSubsidy(kw), [kw])
  const eligible = texts.criteria.every((c) => checks[c.key])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="💸"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="subsidy-kw"
          label={texts.kwLabel}
          value={kw}
          onChange={setKw}
          min={0.5}
          max={10}
          step={0.5}
          unit={texts.kwUnit}
        />

        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-medium text-ash">
            {texts.eligibilityLegend}
          </legend>
          {texts.criteria.map((c) => (
            <label key={c.key} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={checks[c.key]}
                onChange={(e) =>
                  setChecks((prev) => ({ ...prev, [c.key]: e.target.checked }))
                }
                className="mt-0.5 h-4 w-4 rounded border-hairline text-brass focus:ring-brass"
              />
              <span className="text-ash">
                {c.label}
              </span>
            </label>
          ))}
        </fieldset>

        <CalculatorCta label={texts.ctaLabel} disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl bg-mist p-5">
        <p className="text-sm text-ash/60">
          {texts.estimateLabel}
        </p>
        <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
          {formatINR(subsidy)}
        </p>

        <div
          className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${
            eligible
              ? 'bg-spark-teal/15 text-spark-teal'
              : 'bg-brass/10 text-brass'
          }`}
        >
          {eligible ? texts.eligibleMsg : texts.notEligibleMsg}
        </div>

        <ul className="mt-4 space-y-1 text-xs text-ash/50">
          <li>• {texts.tier1}</li>
          <li>• {texts.tier2}</li>
          <li>• {texts.tier3}</li>
        </ul>
        {kw > 3 && (
          <p className="mt-2 text-xs text-brass">
            {texts.aboveCapNote}
          </p>
        )}
      </div>
    </CalculatorCard>
  )
}
