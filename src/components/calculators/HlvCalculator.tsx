'use client'

import { useMemo, useState } from 'react'
import { calculateHumanLifeValue } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface HlvCalculatorTexts {
  title: string
  subtitle: string
  incomeLabel: string
  expensesLabel: string
  expensesHint: string
  yearsLabel: string
  yearsUnit: string
  discountLabel: string
  discountUnit: string
  liabilitiesLabel: string
  existingCoverLabel: string
  ctaLabel: string
  disclaimer: string
  coverLabel: string
  netContributionLabel: string
  presentValueLabel: string
  liabilitiesRowLabel: string
  existingCoverRowLabel: string
}

const defaultTexts: HlvCalculatorTexts = {
  title: 'Human Life Value Calculator',
  subtitle: 'Estimate how much life cover your family would need',
  incomeLabel: 'Your annual income (₹)',
  expensesLabel: 'Your annual self-expenses (₹)',
  expensesHint: 'Spending that benefits only you, not your family — e.g. your personal commute, hobbies.',
  yearsLabel: 'Years left to retirement',
  yearsUnit: 'yrs',
  discountLabel: 'Discount rate (assumed return)',
  discountUnit: '%',
  liabilitiesLabel: 'Outstanding loans (₹)',
  existingCoverLabel: 'Existing life cover + liquid savings (₹)',
  ctaLabel: 'Calculate Recommended Cover',
  disclaimer: 'This estimates life-cover need, not a premium quote — actual policy pricing depends on the insurer and product.',
  coverLabel: 'Recommended additional life cover',
  netContributionLabel: 'Net annual contribution to family',
  presentValueLabel: 'Present value of future income',
  liabilitiesRowLabel: 'Plus outstanding liabilities',
  existingCoverRowLabel: 'Minus existing cover & savings',
}

export default function HlvCalculator({
  texts = defaultTexts,
}: {
  texts?: HlvCalculatorTexts
} = {}) {
  const [income, setIncome] = useState(1200000)
  const [selfExpenses, setSelfExpenses] = useState(300000)
  const [years, setYears] = useState(20)
  const [discountRate, setDiscountRate] = useState(6)
  const [liabilities, setLiabilities] = useState(2000000)
  const [existingCover, setExistingCover] = useState(500000)

  const result = useMemo(
    () =>
      calculateHumanLifeValue(
        Math.max(0, income),
        Math.max(0, selfExpenses),
        Math.max(1, years),
        Math.max(0.1, discountRate),
        Math.max(0, liabilities),
        Math.max(0, existingCover),
      ),
    [income, selfExpenses, years, discountRate, liabilities, existingCover],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🛡️" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="hlv-income" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.incomeLabel}
          </label>
          <input
            id="hlv-income"
            type="number"
            min={0}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="hlv-expenses" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.expensesLabel}
          </label>
          <input
            id="hlv-expenses"
            type="number"
            min={0}
            value={selfExpenses}
            onChange={(e) => setSelfExpenses(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">{texts.expensesHint}</p>
        </div>

        <SliderField
          id="hlv-years"
          label={texts.yearsLabel}
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          unit={texts.yearsUnit}
        />

        <SliderField
          id="hlv-discount"
          label={texts.discountLabel}
          value={discountRate}
          onChange={setDiscountRate}
          min={2}
          max={12}
          step={0.5}
          unit={texts.discountUnit}
        />

        <div>
          <label htmlFor="hlv-liabilities" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.liabilitiesLabel}
          </label>
          <input
            id="hlv-liabilities"
            type="number"
            min={0}
            value={liabilities}
            onChange={(e) => setLiabilities(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="hlv-existing" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.existingCoverLabel}
          </label>
          <input
            id="hlv-existing"
            type="number"
            min={0}
            value={existingCover}
            onChange={(e) => setExistingCover(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">{texts.coverLabel}</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.recommendedCover)}
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">{texts.netContributionLabel}</td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.netAnnualContribution)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.presentValueLabel}</td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.presentValueOfIncome)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.liabilitiesRowLabel}</td>
                <td className="py-1.5 text-right tabular-nums">+{formatINR(liabilities)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.existingCoverRowLabel}</td>
                <td className="py-1.5 text-right tabular-nums">-{formatINR(existingCover)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
