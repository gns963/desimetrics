'use client'

import { useMemo, useState } from 'react'
import { compareRegimes, totalOldRegimeDeductions, type AgeGroup } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

export interface TaxRegimeCalculatorTexts {
  title: string
  subtitle: string
  incomeLabel: string
  salariedLegend: string
  salariedYesLabel: string
  salariedNoLabel: string
  salariedHint: string
  ageGroupLegend: string
  ageUnder60Label: string
  age60to79Label: string
  age80plusLabel: string
  deductionsSectionLabel: string
  deductionsHint: string
  section80CLabel: string
  section80DLabel: string
  hraExemptionLabel: string
  homeLoanInterestLabel: string
  nps80ccd1bLabel: string
  otherDeductionsLabel: string
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
  /** Optional: falls back to an English default if omitted (e.g. older texts objects). */
  surchargeLabel?: string
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
  salariedLegend: 'Salaried or pensioner?',
  salariedYesLabel: 'Yes',
  salariedNoLabel: 'No',
  salariedHint: 'Applies the standard deduction (₹75,000 new / ₹50,000 old) — business/professional income doesn\'t get it.',
  ageGroupLegend: 'Age group (affects old-regime exemption)',
  ageUnder60Label: 'Under 60',
  age60to79Label: '60–79 (senior)',
  age80plusLabel: '80+ (super senior)',
  deductionsSectionLabel: 'Old-regime deductions (leave 0 if not claimed)',
  deductionsHint: 'Each section is capped at its statutory limit automatically.',
  section80CLabel: 'Section 80C (max ₹1.5L)',
  section80DLabel: 'Section 80D (health insurance)',
  hraExemptionLabel: 'HRA exemption',
  homeLoanInterestLabel: 'Home loan interest (24b, max ₹2L)',
  nps80ccd1bLabel: 'NPS 80CCD(1B) (max ₹50k)',
  otherDeductionsLabel: 'Other deductions (80TTA/80TTB etc.)',
  ctaLabel: 'Compare Tax Regimes',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  eitherMessage: 'Both regimes cost the same for you.',
  savesMessageTemplate: 'The {regime} regime saves you {amount}.',
  newRegimeLabel: 'New',
  oldRegimeLabel: 'Old',
  taxableIncomeLabel: 'Taxable income',
  rebateLabel: 'Rebate 87A',
  marginalReliefLabel: 'Marginal relief',
  surchargeLabel: 'Surcharge (income > ₹50L)',
  totalTaxLabel: 'Total tax',
  footnote: 'FY 2026-27 (AY 2027-28), incl. 4% cess, marginal relief, and surcharge above ₹50L with its own marginal relief.',
  breakEvenLabel: 'Your break-even (total old-regime deductions)',
  breakEvenAlreadyTemplate: 'You\'re already {amount} above your break-even.',
  breakEvenGapTemplate: 'You need {amount} more in deductions to make the old regime win.',
  breakEvenNoneMessage: 'No realistic deduction total flips this at your income — the new regime wins unconditionally.',
}

const SALARIED_OPTIONS: { value: 'yes' | 'no'; label: string; icon: string }[] = [
  { value: 'yes', label: 'Yes', icon: '💼' },
  { value: 'no', label: 'No', icon: '📊' },
]

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
  const [salaried, setSalaried] = useState<'yes' | 'no'>('yes')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('under60')
  const [section80C, setSection80C] = useState(150000)
  const [section80D, setSection80D] = useState(25000)
  const [hraExemption, setHraExemption] = useState(0)
  const [homeLoanInterest, setHomeLoanInterest] = useState(0)
  const [nps80ccd1b, setNps80ccd1b] = useState(0)
  const [otherDeductions, setOtherDeductions] = useState(0)

  const deductions = useMemo(
    () =>
      totalOldRegimeDeductions(
        { section80C, section80D, hraExemption, homeLoanInterest, nps80ccd1b, otherDeductions },
        ageGroup,
      ),
    [section80C, section80D, hraExemption, homeLoanInterest, nps80ccd1b, otherDeductions, ageGroup],
  )

  const result = useMemo(
    () => compareRegimes(Math.max(0, income), deductions, ageGroup, salaried === 'yes'),
    [income, deductions, ageGroup, salaried],
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

        <div className="grid grid-cols-2 gap-3">
          <OptionCardGroup
            legend={texts.salariedLegend}
            options={SALARIED_OPTIONS}
            value={salaried}
            onChange={setSalaried}
            columns={2}
          />
          <OptionCardGroup
            legend={texts.ageGroupLegend}
            options={AGE_OPTIONS}
            value={ageGroup}
            onChange={setAgeGroup}
            columns={3}
          />
        </div>
        <p className="-mt-3 text-xs text-ash/50">{texts.salariedHint}</p>

        <div className="rounded-lg border border-hairline bg-mist/30 p-3">
          <p className="mb-3 text-sm font-semibold text-ash">{texts.deductionsSectionLabel}</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tax-80c" className="mb-1 block text-xs font-medium text-ash/80">
                {texts.section80CLabel}
              </label>
              <input
                id="tax-80c"
                type="number"
                min={0}
                value={section80C}
                onChange={(e) => setSection80C(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="tax-80d" className="mb-1 block text-xs font-medium text-ash/80">
                {texts.section80DLabel}
              </label>
              <input
                id="tax-80d"
                type="number"
                min={0}
                value={section80D}
                onChange={(e) => setSection80D(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="tax-hra" className="mb-1 block text-xs font-medium text-ash/80">
                {texts.hraExemptionLabel}
              </label>
              <input
                id="tax-hra"
                type="number"
                min={0}
                value={hraExemption}
                onChange={(e) => setHraExemption(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="tax-24b" className="mb-1 block text-xs font-medium text-ash/80">
                {texts.homeLoanInterestLabel}
              </label>
              <input
                id="tax-24b"
                type="number"
                min={0}
                value={homeLoanInterest}
                onChange={(e) => setHomeLoanInterest(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="tax-nps" className="mb-1 block text-xs font-medium text-ash/80">
                {texts.nps80ccd1bLabel}
              </label>
              <input
                id="tax-nps"
                type="number"
                min={0}
                value={nps80ccd1b}
                onChange={(e) => setNps80ccd1b(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="tax-other" className="mb-1 block text-xs font-medium text-ash/80">
                {texts.otherDeductionsLabel}
              </label>
              <input
                id="tax-other"
                type="number"
                min={0}
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-ash/50">{texts.deductionsHint}</p>
        </div>

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

          <p className="text-xs text-ash/60">
            Total old-regime deductions after caps:{' '}
            <span className="font-semibold text-ink-navy">{formatINR(deductions)}</span>
          </p>

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
              {(result.newRegime.surcharge > 0 || result.oldRegime.surcharge > 0) && (
                <tr>
                  <td className="py-1.5 text-ash/70">
                    {texts.surchargeLabel ?? 'Surcharge'}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">
                    {formatINR(result.newRegime.surcharge)}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">
                    {formatINR(result.oldRegime.surcharge)}
                  </td>
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
