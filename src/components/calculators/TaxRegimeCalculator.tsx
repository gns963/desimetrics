'use client'

import { useMemo, useState } from 'react'
import { compareRegimes } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader } from './CalculatorShell'

export interface TaxRegimeCalculatorTexts {
  title: string
  subtitle: string
  incomeLabel: string
  deductionsLabel: string
  deductionsHint: string
  ctaLabel: string
  disclaimer: string
  eitherMessage: string
  /** Use {regime} and {amount} placeholders. */
  savesMessageTemplate: string
  newRegimeLabel: string
  oldRegimeLabel: string
  taxableIncomeLabel: string
  rebateLabel: string
  totalTaxLabel: string
  footnote: string
}

const defaultTexts: TaxRegimeCalculatorTexts = {
  title: 'New vs Old Tax Regime',
  subtitle: 'Compare your income tax for FY 2026-27',
  incomeLabel: 'Gross annual income (₹)',
  deductionsLabel: 'Old-regime deductions (80C, 80D, HRA…)',
  deductionsHint: 'Only the old regime allows most deductions. Standard deduction is applied automatically for both.',
  ctaLabel: 'Compare Tax Regimes',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  eitherMessage: 'Both regimes cost the same for you.',
  savesMessageTemplate: 'The {regime} regime saves you {amount}.',
  newRegimeLabel: 'New',
  oldRegimeLabel: 'Old',
  taxableIncomeLabel: 'Taxable income',
  rebateLabel: 'Rebate 87A',
  totalTaxLabel: 'Total tax',
  footnote: 'FY 2026-27 (AY 2027-28), incl. 4% cess. Surcharge (income > ₹50L) and marginal relief not included.',
}

export default function TaxRegimeCalculator({
  texts = defaultTexts,
}: {
  texts?: TaxRegimeCalculatorTexts
} = {}) {
  const [income, setIncome] = useState(1500000)
  const [deductions, setDeductions] = useState(150000)

  const result = useMemo(
    () => compareRegimes(Math.max(0, income), Math.max(0, deductions)),
    [income, deductions],
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
          <p className="text-xs text-ash/40">
            {texts.footnote}
          </p>
        </div>
      </div>
    </CalculatorCard>
  )
}
