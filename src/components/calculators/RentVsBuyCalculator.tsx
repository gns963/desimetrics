'use client'

import { useMemo, useState } from 'react'
import { calculateRentVsBuy } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function RentVsBuyCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(8000000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [loanRate, setLoanRate] = useState(8.5)
  const [loanTenure, setLoanTenure] = useState(20)
  const [maintenancePercent, setMaintenancePercent] = useState(1)
  const [monthlyRent, setMonthlyRent] = useState(25000)
  const [rentGrowth, setRentGrowth] = useState(5)
  const [propertyAppreciation, setPropertyAppreciation] = useState(5)
  const [investmentReturn, setInvestmentReturn] = useState(10)
  const [comparisonYears, setComparisonYears] = useState(20)

  const result = useMemo(
    () =>
      calculateRentVsBuy(
        Math.max(1, propertyPrice),
        downPaymentPercent,
        loanRate,
        Math.max(1, loanTenure),
        maintenancePercent,
        Math.max(0, monthlyRent),
        rentGrowth,
        propertyAppreciation,
        investmentReturn,
        Math.max(1, comparisonYears),
      ),
    [propertyPrice, downPaymentPercent, loanRate, loanTenure, maintenancePercent, monthlyRent, rentGrowth, propertyAppreciation, investmentReturn, comparisonYears],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏘️" title="Rent vs Buy Calculator" subtitle="Which builds more wealth over time — renting and investing, or buying?" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="rvb-price" className="mb-1.5 block text-sm font-medium text-ash">
            Property price (₹)
          </label>
          <input id="rvb-price" type="number" min={0} value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="rvb-downpayment" label="Down payment" value={downPaymentPercent} onChange={setDownPaymentPercent} min={0} max={50} unit="%" />
        <SliderField id="rvb-loan-rate" label="Home loan interest rate" value={loanRate} onChange={setLoanRate} min={6} max={12} step={0.1} unit="%" />
        <SliderField id="rvb-loan-tenure" label="Loan tenure" value={loanTenure} onChange={setLoanTenure} min={5} max={30} unit="yrs" />
        <SliderField id="rvb-maintenance" label="Annual maintenance/property tax" value={maintenancePercent} onChange={setMaintenancePercent} min={0} max={3} step={0.1} unit="% of price" />

        <div>
          <label htmlFor="rvb-rent" className="mb-1.5 block text-sm font-medium text-ash">
            Comparable monthly rent (₹)
          </label>
          <input id="rvb-rent" type="number" min={0} value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="rvb-rent-growth" label="Annual rent growth" value={rentGrowth} onChange={setRentGrowth} min={0} max={10} unit="%" />
        <SliderField id="rvb-appreciation" label="Annual property appreciation" value={propertyAppreciation} onChange={setPropertyAppreciation} min={0} max={12} unit="%" />
        <SliderField id="rvb-inv-return" label="Return if you invest instead (equity/MF)" value={investmentReturn} onChange={setInvestmentReturn} min={4} max={16} unit="%" />
        <SliderField id="rvb-years" label="Comparison period" value={comparisonYears} onChange={setComparisonYears} min={5} max={30} unit="yrs" />

        <CalculatorCta label="Compare Rent vs Buy" tone="financial" disclaimer="Both outcomes depend heavily on assumptions you can't know in advance — treat this as a scenario comparison, not a prediction." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">
              {result.betterOption === 'buy' ? 'Buying builds more wealth by' : 'Renting + investing builds more wealth by'}
            </p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(Math.abs(result.wealthDifference))}
            </p>
            <p className="text-sm text-ash/60">over {comparisonYears} years, under these assumptions</p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ash/60">
                <th className="py-1 font-medium">Scenario</th>
                <th className="py-1 text-right font-medium">Net wealth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr className={result.betterOption === 'buy' ? 'font-bold text-ink-navy' : ''}>
                <td className="py-1.5">Buy (property value − loan balance)</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.netBuyingWealth)}</td>
              </tr>
              <tr className={result.betterOption === 'rent' ? 'font-bold text-ink-navy' : ''}>
                <td className="py-1.5">Rent + invest the difference</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.netRentingWealth)}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full text-xs text-ash/60">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1">Monthly EMI</td>
                <td className="py-1 text-right tabular-nums">{formatINR(result.monthlyEmi)}</td>
              </tr>
              <tr>
                <td className="py-1">Property value at end of period</td>
                <td className="py-1 text-right tabular-nums">{formatINR(result.finalPropertyValue)}</td>
              </tr>
              <tr>
                <td className="py-1">Outstanding loan at end of period</td>
                <td className="py-1 text-right tabular-nums">{formatINR(result.outstandingLoanAtEnd)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
