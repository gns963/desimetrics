'use client'

import { useMemo, useState } from 'react'
import { calculateCtcBreakdown } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

type Regime = 'new' | 'old'

const REGIME_OPTIONS: { value: Regime; label: string; icon: string }[] = [
  { value: 'new', label: 'New regime', icon: '🆕' },
  { value: 'old', label: 'Old regime', icon: '📜' },
]

export default function CtcCalculator() {
  const [annualCtc, setAnnualCtc] = useState(1200000)
  const [basicPercent, setBasicPercent] = useState(40)
  const [professionalTax, setProfessionalTax] = useState(2400)
  const [regime, setRegime] = useState<Regime>('new')

  const result = useMemo(
    () => calculateCtcBreakdown(Math.max(1, annualCtc), basicPercent, Math.max(0, professionalTax), regime),
    [annualCtc, basicPercent, professionalTax, regime],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="💵" title="CTC to In-Hand Salary Calculator" subtitle="See what actually lands in your bank account from your offered CTC" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="ctc-annual" className="mb-1.5 block text-sm font-medium text-ash">
            Annual CTC (₹)
          </label>
          <input id="ctc-annual" type="number" min={0} value={annualCtc} onChange={(e) => setAnnualCtc(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="ctc-basic-percent" label="Basic salary as % of CTC" value={basicPercent} onChange={setBasicPercent} min={30} max={60} unit="%" />

        <div>
          <label htmlFor="ctc-prof-tax" className="mb-1.5 block text-sm font-medium text-ash">
            Professional tax (annual, ₹)
          </label>
          <input id="ctc-prof-tax" type="number" min={0} value={professionalTax} onChange={(e) => setProfessionalTax(Number(e.target.value) || 0)} className={fieldCls} />
          <p className="mt-1 text-xs text-ash/50">Varies by state — most states cap it around ₹2,400/year; some states (or none, if you&apos;re in one that doesn&apos;t levy it) will differ. Enter your own state&apos;s figure.</p>
        </div>

        <OptionCardGroup legend="Tax regime" options={REGIME_OPTIONS} value={regime} onChange={setRegime} columns={2} />

        <CalculatorCta label="Calculate In-Hand Salary" tone="financial" disclaimer="Actual in-hand pay depends on your specific salary structure and employer's policies — this is an estimate." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Estimated monthly in-hand salary</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.monthlyInHand)}
            </p>
            <p className="text-sm text-ash/60">
              Annual in-hand <span className="text-spark-teal">{formatINR(result.annualInHand)}</span>
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Basic salary (annual)</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.basicAnnual)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">– Employer&apos;s PF contribution</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.employerPfContribution)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">– Employer&apos;s gratuity provision</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.employerGratuityProvision)}</td>
              </tr>
              <tr className="font-semibold text-ink-navy">
                <td className="py-1.5">= Gross salary (annual)</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.grossSalaryAnnual)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">– Your PF contribution</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.employeePfContribution)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">– Professional tax</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.professionalTaxAnnual)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">– Estimated income tax</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.estimatedIncomeTax)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
