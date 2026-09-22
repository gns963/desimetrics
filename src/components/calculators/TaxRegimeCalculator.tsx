'use client'

import { useMemo, useState } from 'react'
import { compareRegimes, type AgeGroup } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

export interface TaxRegimeCalculatorTexts {
  title: string
  subtitle: string
  incomeLabel: string
  deductionsLabel: string
  deductionsHint: string
  ageGroupLegend: string
  ageUnder60Label: string
  age60to79Label: string
  age80plusLabel: string
  ctaLabel: string
  disclaimer: string
  eitherMessage: string
  /** Use {regime} and {amount} placeholders. */
  savesMessageTemplate: string
  newRegimeLabel: string
  oldRegimeLabel: string
  taxableIncomeLabel: string
  rebateLabel: string
  marginalReliefLabel: string
  totalTaxLabel: string
  footnote: string
  breakEvenLabel: string
  /** Use {amount} placeholder. */
  breakEvenAlreadyTemplate: string
  /** Use {amount} placeholder. */
  breakEvenGapTemplate: string
  breakEvenNoneMessage: string
}

const defaultTexts: TaxRegimeCalculatorTexts = {
  title: 'New vs Old Tax Regime',
  subtitle: 'Compare your income tax for FY 2026-27',
  incomeLabel: 'Gross annual income (₹)',
  deductionsLabel: 'Old-regime deductions (80C, 80D, HRA…)',
  deductionsHint: 'Only the old regime allows most deductions. Standard deduction is applied automatically for both.',
  ageGroupLegend: 'Age group (affects old-regime exemption)',
  ageUnder60Label: 'Under 60',
  age60to79Label: '60–79 (senior)',
  age80plusLabel: '80+ (super senior)',
  ctaLabel: 'Compare Tax Regimes',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  eitherMessage: 'Both regimes cost the same for you.',
  savesMessageTemplate: 'The {regime} regime saves you {amount}.',
  newRegimeLabel: 'New',
  oldRegimeLabel: 'Old',
  taxableIncomeLabel: 'Taxable income',
  rebateLabel: 'Rebate 87A',
  marginalReliefLabel: 'Marginal relief',
  totalTaxLabel: 'Total tax',
  footnote: 'FY 2026-27 (AY 2027-28), incl. 4% cess and new-regime marginal relief. Surcharge (income > ₹50L) is not modelled.',
  breakEvenLabel: 'Your break-even (old-regime deductions)',
  breakEvenAlreadyTemplate: 'You\'re already {amount} above your break-even.',
  breakEvenGapTemplate: 'You need {amount} more in deductions to make the old regime win.',
  breakEvenNoneMessage: 'No realistic deduction total flips this at your income — the new regime wins unconditionally.',
}

const AGE_OPTIONS: { value: AgeGroup; label: string; icon: string }[] = [
  { value: 'under60', label: 'Under 60', icon: '🧑' },
  { value: '60to79', label: '60–79 (senior)', icon: '👨‍🦳' },
  { value: '80plus', label: '80+ (super senior)', icon: '👴' },
]

export default function TaxRegimeCalculator({
  texts = defaultTexts,
}: {
  texts?: TaxRegimeCalculatorTexts
} = {}) {
  const [income, setIncome] = useState(1500000)
  const [deductions, setDeductions] = useState(150000)
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('under60')

  const result = useMemo(
    () => compareRegimes(Math.max(0, income), Math.max(0, deductions), ageGroup),
    [income, deductions, ageGroup],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🏦"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="tax-income"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.incomeLabel}
          </label>
          <input
            id="tax-income"
            type="number"
            min={0}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value) || 0)}
            className={`${fieldCls} text-lg`}
          />
        </div>
        <div>
          <label
            htmlFor="tax-deductions"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.deductionsLabel}
          </label>
          <input
            id="tax-deductions"
            type="number"
            min={0}
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">
            {texts.deductionsHint}
          </p>
        </div>

        <OptionCardGroup
          legend={texts.ageGroupLegend}
          options={AGE_OPTIONS}
          value={ageGroup}
          onChange={setAgeGroup}
          columns={3}
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              result.recommended === 'either'
                ? 'bg-hairline text-ash/80'
                : 'bg-spark-teal/15 text-spark-teal'
            }`}
          >
            {result.recommended === 'either'
              ? texts.eitherMessage
              : texts.savesMessageTemplate
                  .replace('{regime}', result.recommended === 'new' ? texts.newRegimeLabel : texts.oldRegimeLabel)
                  .replace('{amount}', formatINR(result.saving))}
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ash/60">
                <th className="py-1 font-medium"></th>
                <th className="py-1 text-right font-medium">{texts.newRegimeLabel}</th>
                <th className="py-1 text-right font-medium">{texts.oldRegimeLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">
                  {texts.taxableIncomeLabel}
                </td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.newRegime.taxableIncome)}
                </td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.oldRegime.taxableIncome)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">
                  {texts.rebateLabel}
                </td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.newRegime.rebate87A)}
                </td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.oldRegime.rebate87A)}
                </td>
              </tr>
              {result.newRegime.marginalRelief > 0 && (
                <tr>
                  <td className="py-1.5 text-ash/70">
                    {texts.marginalReliefLabel}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">
                    {formatINR(result.newRegime.marginalRelief)}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">—</td>
                </tr>
              )}
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">{texts.totalTaxLabel}</td>
                <td className="py-2 text-right tabular-nums">
                  {formatINR(result.newRegime.totalTax)}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {formatINR(result.oldRegime.totalTax)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="rounded-lg border border-hairline bg-mist/60 px-3 py-2.5">
            <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">
              {texts.breakEvenLabel}
            </p>
            {result.breakEvenDeduction === null ? (
              <p className="mt-1 text-sm text-ash/80">{texts.breakEvenNoneMessage}</p>
            ) : (
              <>
                <p className="font-display text-2xl font-bold tabular-nums text-ink-navy">
                  {formatINR(result.breakEvenDeduction)}
                </p>
                <p className="mt-1 text-sm text-ash/80">
                  {result.deductionGap > 0
                    ? texts.breakEvenGapTemplate.replace('{amount}', formatINR(result.deductionGap))
                    : texts.breakEvenAlreadyTemplate.replace(
                        '{amount}',
                        formatINR(Math.max(0, deductions - result.breakEvenDeduction)),
                      )}
                </p>
              </>
            )}
          </div>

          <p className="text-xs text-ash/40">
            {texts.footnote}
          </p>
        </div>
      </div>
    </CalculatorCard>
  )
}
