'use client'

import { useMemo, useState } from 'react'
import { calculateRetirementPlan } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function RetirementPlannerCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000)
  const [generalInflation, setGeneralInflation] = useState(6)
  const [medicalInflation, setMedicalInflation] = useState(8)
  const [medicalShare, setMedicalShare] = useState(20)
  const [preReturn, setPreReturn] = useState(11)
  const [postReturn, setPostReturn] = useState(7)
  const [existingSavings, setExistingSavings] = useState(1000000)
  const [currentSip, setCurrentSip] = useState(15000)
  const [pensionIncome, setPensionIncome] = useState(0)

  const result = useMemo(() => {
    if (retirementAge <= currentAge || lifeExpectancy <= retirementAge) return null
    return calculateRetirementPlan(
      currentAge,
      retirementAge,
      lifeExpectancy,
      Math.max(0, monthlyExpenses),
      generalInflation,
      medicalInflation,
      medicalShare,
      preReturn,
      postReturn,
      Math.max(0, existingSavings),
      Math.max(0, currentSip),
      Math.max(0, pensionIncome),
    )
  }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, generalInflation, medicalInflation, medicalShare, preReturn, postReturn, existingSavings, currentSip, pensionIncome])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🌅" title="Inflation-Adjusted Retirement Planner" subtitle="A more granular retirement corpus, using separate general and medical inflation" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="rp-current-age" className="mb-1.5 block text-sm font-medium text-ash">
              Current age
            </label>
            <input id="rp-current-age" type="number" min={18} max={70} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value) || 0)} className={fieldCls} />
          </div>
          <div>
            <label htmlFor="rp-retirement-age" className="mb-1.5 block text-sm font-medium text-ash">
              Retirement age
            </label>
            <input id="rp-retirement-age" type="number" min={19} max={75} value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value) || 0)} className={fieldCls} />
          </div>
          <div>
            <label htmlFor="rp-life-expectancy" className="mb-1.5 block text-sm font-medium text-ash">
              Life expectancy
            </label>
            <input id="rp-life-expectancy" type="number" min={20} max={110} value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value) || 0)} className={fieldCls} />
          </div>
        </div>

        <div>
          <label htmlFor="rp-expenses" className="mb-1.5 block text-sm font-medium text-ash">
            Current monthly expenses (₹)
          </label>
          <input id="rp-expenses" type="number" min={0} value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="rp-medical-share" label="Share of expenses that's medical/healthcare" value={medicalShare} onChange={setMedicalShare} min={0} max={50} unit="%" />
        <SliderField id="rp-general-inflation" label="General inflation" value={generalInflation} onChange={setGeneralInflation} min={3} max={10} step={0.5} unit="%" />
        <SliderField id="rp-medical-inflation" label="Medical inflation" value={medicalInflation} onChange={setMedicalInflation} min={3} max={14} step={0.5} unit="%" />
        <SliderField id="rp-pre-return" label="Pre-retirement return" value={preReturn} onChange={setPreReturn} min={6} max={15} step={0.5} unit="%" />
        <SliderField id="rp-post-return" label="Post-retirement return" value={postReturn} onChange={setPostReturn} min={4} max={10} step={0.5} unit="%" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="rp-savings" className="mb-1.5 block text-sm font-medium text-ash">
              Existing retirement savings (₹)
            </label>
            <input id="rp-savings" type="number" min={0} value={existingSavings} onChange={(e) => setExistingSavings(Number(e.target.value) || 0)} className={fieldCls} />
          </div>
          <div>
            <label htmlFor="rp-sip" className="mb-1.5 block text-sm font-medium text-ash">
              Current monthly SIP (₹)
            </label>
            <input id="rp-sip" type="number" min={0} value={currentSip} onChange={(e) => setCurrentSip(Number(e.target.value) || 0)} className={fieldCls} />
          </div>
        </div>

        <div>
          <label htmlFor="rp-pension" className="mb-1.5 block text-sm font-medium text-ash">
            Expected pension/rental income post-retirement (₹/month)
          </label>
          <input id="rp-pension" type="number" min={0} value={pensionIncome} onChange={(e) => setPensionIncome(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <CalculatorCta label="Calculate Retirement Corpus" tone="financial" disclaimer="Results are illustrative projections based on your assumptions, not guarantees." />
      </form>

      {result && (
        <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">Corpus needed at retirement</p>
              <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
                {formatINR(result.requiredCorpus)}
              </p>
              <p className="text-sm text-ash/60">
                3.5%-SWR sanity check: <span className="text-spark-teal">{formatINR(result.swrSanityCheckCorpus)}</span>
              </p>
            </div>

            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="py-1.5 text-ash/70">Years to retirement</td>
                  <td className="py-1.5 text-right tabular-nums">{result.yearsToRetirement}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Retirement duration</td>
                  <td className="py-1.5 text-right tabular-nums">{result.retirementDurationYears} years</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Future monthly expenses at retirement</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.futureMonthlyExpenses)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Projected corpus (current savings + SIP)</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.projectedCorpus)}</td>
                </tr>
                <tr className="text-base font-bold text-ink-navy">
                  <td className="py-2">{result.surplusOrShortfall >= 0 ? 'Surplus' : 'Shortfall'}</td>
                  <td className="py-2 text-right tabular-nums">{formatINR(Math.abs(result.surplusOrShortfall))}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-ash/70">Additional monthly SIP needed</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.requiredAdditionalMonthlySip)}/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </CalculatorCard>
  )
}
