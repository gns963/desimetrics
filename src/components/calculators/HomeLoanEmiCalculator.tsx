'use client'

import { useMemo, useState } from 'react'
import {
  calculateEmi,
  calculateEmiWithPrepayment,
  checkEmiAffordability,
  type PrepaymentEffect,
} from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const PREPAYMENT_EFFECT_OPTIONS: { value: PrepaymentEffect; label: string; icon: string }[] = [
  { value: 'reduceTenure', label: 'Reduce tenure (save more interest)', icon: '⏱️' },
  { value: 'reduceEmi', label: 'Reduce EMI (ease cash flow)', icon: '💸' },
]

export default function HomeLoanEmiCalculator() {
  const [amount, setAmount] = useState(5000000)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)
  const [yearlyExtra, setYearlyExtra] = useState(0)
  const [oneTime, setOneTime] = useState(0)
  const [prepaymentEffect, setPrepaymentEffect] = useState<PrepaymentEffect>('reduceTenure')
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [showTaxBenefit, setShowTaxBenefit] = useState(false)
  const [taxSlab, setTaxSlab] = useState(30)

  const base = useMemo(
    () => calculateEmi(Math.max(1, amount), rate, Math.max(1, years)),
    [amount, rate, years],
  )

  const hasPrepayment = yearlyExtra > 0 || oneTime > 0
  const prepaymentResult = useMemo(
    () =>
      calculateEmiWithPrepayment({
        principal: Math.max(1, amount),
        annualRatePercent: rate,
        years: Math.max(1, years),
        yearlyExtraPayment: yearlyExtra,
        oneTimePrepaymentNow: oneTime,
        prepaymentEffect,
      }),
    [amount, rate, years, yearlyExtra, oneTime, prepaymentEffect],
  )

  const affordability = useMemo(
    () => (monthlyIncome > 0 ? checkEmiAffordability(base.emi, monthlyIncome) : null),
    [base.emi, monthlyIncome],
  )

  const year1 = base.yearly[0]
  const taxBenefit = useMemo(() => {
    if (!year1) return null
    const deductibleInterest = Math.min(year1.interestPaid, 200000)
    const deductiblePrincipal = Math.min(year1.principalPaid, 150000)
    const estimatedSaving = ((deductibleInterest + deductiblePrincipal) * taxSlab) / 100
    return { deductibleInterest, deductiblePrincipal, estimatedSaving }
  }, [year1, taxSlab])

  const maxYearTotal = Math.max(...base.yearly.map((p) => p.principalPaid + p.interestPaid), 1)

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏠" title="Home Loan EMI Calculator" subtitle="Estimate your monthly instalment, then model prepayment" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="hl-amount" className="mb-1.5 block text-sm font-medium text-ash">
            Loan amount (₹)
          </label>
          <input
            id="hl-amount"
            type="number"
            min={0}
            step={100000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <SliderField id="hl-rate" label="Interest rate (annual)" value={rate} onChange={setRate} min={7} max={14} step={0.05} unit="%" />
        <SliderField id="hl-years" label="Loan tenure" value={years} onChange={setYears} min={5} max={30} unit="yrs" />

        <div className="rounded-lg border border-hairline bg-mist/30 p-3">
          <p className="mb-3 text-sm font-semibold text-ash">Prepayment (optional)</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="hl-yearly-extra" className="mb-1 block text-xs font-medium text-ash/80">
                Extra payment once a year (₹)
              </label>
              <input
                id="hl-yearly-extra"
                type="number"
                min={0}
                value={yearlyExtra}
                onChange={(e) => setYearlyExtra(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="hl-onetime" className="mb-1 block text-xs font-medium text-ash/80">
                One-time prepayment now (₹)
              </label>
              <input
                id="hl-onetime"
                type="number"
                min={0}
                value={oneTime}
                onChange={(e) => setOneTime(Number(e.target.value) || 0)}
                className={fieldCls}
              />
            </div>
          </div>
          {hasPrepayment && (
            <div className="mt-3">
              <OptionCardGroup
                legend="Prepayment effect"
                options={PREPAYMENT_EFFECT_OPTIONS}
                value={prepaymentEffect}
                onChange={setPrepaymentEffect}
                columns={2}
              />
              <p className="mt-1 text-xs text-ash/50">Reducing tenure usually saves more interest; reducing EMI eases monthly cash flow instead.</p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="hl-income" className="mb-1.5 block text-sm font-medium text-ash">
            Monthly income (optional, for affordability)
          </label>
          <input
            id="hl-income"
            type="number"
            min={0}
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-ash">
          <input type="checkbox" checked={showTaxBenefit} onChange={(e) => setShowTaxBenefit(e.target.checked)} />
          Show my first-year tax benefit (old regime, self-occupied)
        </label>
        {showTaxBenefit && (
          <SliderField id="hl-slab" label="Your income tax slab" value={taxSlab} onChange={setTaxSlab} min={5} max={30} step={5} unit="%" />
        )}

        <CalculatorCta label="Calculate Home Loan EMI" tone="financial" disclaimer="Results are approximate estimates. Your actual EMI may vary by lender." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Monthly EMI</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(base.emi)}
              <span className="ml-1 text-base font-normal text-ash/50">/mo</span>
            </p>
            <p className="text-sm text-ash/60">
              Principal {formatINR(base.principal)} · Total interest{' '}
              <span className="text-spark-teal">{formatINR(base.totalInterest)}</span> · Total payment {formatINR(base.totalPayment)}
            </p>
          </div>

          <div>
            <div className="flex h-40 items-end gap-1" aria-hidden>
              {base.yearly.map((p) => {
                const total = p.principalPaid + p.interestPaid
                const totalH = (total / maxYearTotal) * 100
                const principalH = (p.principalPaid / total) * 100
                return (
                  <div key={p.year} className="flex-1" title={`Year ${p.year}: ${formatINR(total)} paid`}>
                    <div className="relative w-full rounded-t bg-spark-teal/40" style={{ height: `${totalH}%` }}>
                      <div className="absolute bottom-0 w-full rounded-t bg-brass" style={{ height: `${principalH}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-2 flex gap-4 text-xs text-ash/60">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-brass" />
                Principal
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-spark-teal/40" />
                Interest
              </span>
            </div>
          </div>

          {hasPrepayment && (
            <div className="rounded-lg border border-hairline bg-mist/60 px-3 py-2.5">
              <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">With prepayment</p>
              <table className="mt-1 w-full text-sm">
                <tbody className="divide-y divide-hairline">
                  <tr>
                    <td className="py-1.5 text-ash/70">
                      {prepaymentEffect === 'reduceEmi' ? 'New EMI' : 'Loan paid off in'}
                    </td>
                    <td className="py-1.5 text-right tabular-nums">
                      {prepaymentEffect === 'reduceEmi'
                        ? `${formatINR(prepaymentResult.effectiveEmi)}/mo`
                        : `${Math.floor(prepaymentResult.actualMonths / 12)}y ${prepaymentResult.actualMonths % 12}m`}
                    </td>
                  </tr>
                  {prepaymentEffect === 'reduceTenure' && (
                    <tr>
                      <td className="py-1.5 text-ash/70">Time saved</td>
                      <td className="py-1.5 text-right tabular-nums">
                        {Math.floor(prepaymentResult.monthsSaved / 12)}y {prepaymentResult.monthsSaved % 12}m
                      </td>
                    </tr>
                  )}
                  <tr className="text-base font-bold text-ink-navy">
                    <td className="py-2">Interest saved</td>
                    <td className="py-2 text-right tabular-nums text-spark-teal">{formatINR(prepaymentResult.interestSaved)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {affordability && (
            <div
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                affordability.verdict === 'comfortable'
                  ? 'bg-spark-teal/15 text-spark-teal'
                  : affordability.verdict === 'tight'
                    ? 'bg-brass/15 text-brass'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              EMI is {affordability.emiToIncomeRatioPercent}% of your monthly income —{' '}
              {affordability.verdict === 'comfortable' ? 'comfortable' : affordability.verdict === 'tight' ? 'tight' : 'risky by most lenders\' standards'}.
            </div>
          )}

          {showTaxBenefit && taxBenefit && (
            <div className="rounded-lg border border-hairline bg-mist/60 px-3 py-2.5">
              <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">First-year tax benefit (old regime)</p>
              <table className="mt-1 w-full text-sm">
                <tbody className="divide-y divide-hairline">
                  <tr>
                    <td className="py-1.5 text-ash/70">Interest deduction (24b, capped ₹2L)</td>
                    <td className="py-1.5 text-right tabular-nums">{formatINR(taxBenefit.deductibleInterest)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-ash/70">Principal deduction (80C, capped ₹1.5L)</td>
                    <td className="py-1.5 text-right tabular-nums">{formatINR(taxBenefit.deductiblePrincipal)}</td>
                  </tr>
                  <tr className="text-base font-bold text-ink-navy">
                    <td className="py-2">Estimated tax saved</td>
                    <td className="py-2 text-right tabular-nums text-spark-teal">{formatINR(taxBenefit.estimatedSaving)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-1 text-xs text-ash/50">
                80C is shared with your other 80C investments (PPF, ELSS, insurance) — this shows the home loan&apos;s principal alone, not your full 80C usage.
              </p>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  )
}
