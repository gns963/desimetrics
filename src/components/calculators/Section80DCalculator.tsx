'use client'

import { useMemo, useState } from 'react'
import { calculateSection80D } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader } from './CalculatorShell'

export default function Section80DCalculator() {
  const [selfFamilyPremium, setSelfFamilyPremium] = useState(20000)
  const [isSelfSenior, setIsSelfSenior] = useState(false)
  const [parentsPremium, setParentsPremium] = useState(30000)
  const [isParentsSenior, setIsParentsSenior] = useState(true)
  const [preventiveCheckup, setPreventiveCheckup] = useState(6000)

  const result = useMemo(
    () =>
      calculateSection80D(
        Math.max(0, selfFamilyPremium),
        isSelfSenior,
        Math.max(0, parentsPremium),
        isParentsSenior,
        Math.max(0, preventiveCheckup),
      ),
    [selfFamilyPremium, isSelfSenior, parentsPremium, isParentsSenior, preventiveCheckup],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏥" title="Health Insurance 80D Calculator" subtitle="Work out your Section 80D deduction for health insurance premiums" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="d80-self-premium" className="mb-1.5 block text-sm font-medium text-ash">
            Self + family health insurance premium (₹/year)
          </label>
          <input id="d80-self-premium" type="number" min={0} value={selfFamilyPremium} onChange={(e) => setSelfFamilyPremium(Number(e.target.value) || 0)} className={fieldCls} />
          <label className="mt-2 flex items-center gap-2 text-sm text-ash">
            <input type="checkbox" checked={isSelfSenior} onChange={(e) => setIsSelfSenior(e.target.checked)} />
            The eldest insured member (self/spouse) is a senior citizen (60+)
          </label>
        </div>

        <div>
          <label htmlFor="d80-parents-premium" className="mb-1.5 block text-sm font-medium text-ash">
            Parents&apos; health insurance premium (₹/year)
          </label>
          <input id="d80-parents-premium" type="number" min={0} value={parentsPremium} onChange={(e) => setParentsPremium(Number(e.target.value) || 0)} className={fieldCls} />
          <label className="mt-2 flex items-center gap-2 text-sm text-ash">
            <input type="checkbox" checked={isParentsSenior} onChange={(e) => setIsParentsSenior(e.target.checked)} />
            Parents are senior citizens (60+)
          </label>
        </div>

        <div>
          <label htmlFor="d80-checkup" className="mb-1.5 block text-sm font-medium text-ash">
            Preventive health checkup spend (₹/year)
          </label>
          <input id="d80-checkup" type="number" min={0} value={preventiveCheckup} onChange={(e) => setPreventiveCheckup(Number(e.target.value) || 0)} className={fieldCls} />
          <p className="mt-1 text-xs text-ash/50">Included within your self+family limit above, capped at ₹5,000 — not an additional deduction.</p>
        </div>

        <CalculatorCta label="Calculate 80D Deduction" tone="financial" disclaimer="Old tax regime only — Section 80D is not available under the new regime." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Total Section 80D deduction</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.totalDeduction)}
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Self + family (limit {isSelfSenior ? formatINR(50000) : formatINR(25000)})</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.selfFamilyDeduction)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Parents (limit {isParentsSenior ? formatINR(50000) : formatINR(25000)})</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.parentsDeduction)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
