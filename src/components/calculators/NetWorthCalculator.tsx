'use client'

import { useMemo, useState } from 'react'
import {
  calculateNetWorth,
  type NetWorthAssets,
  type NetWorthLiabilities,
} from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader } from './CalculatorShell'

const ASSET_FIELDS: { key: keyof NetWorthAssets; label: string }[] = [
  { key: 'cash', label: 'Cash & bank balance' },
  { key: 'fixedDeposits', label: 'Fixed deposits' },
  { key: 'equityAndMutualFunds', label: 'Equity & mutual funds' },
  { key: 'epf', label: 'EPF balance' },
  { key: 'ppf', label: 'PPF balance' },
  { key: 'nps', label: 'NPS balance' },
  { key: 'gold', label: 'Gold' },
  { key: 'property', label: 'Property (market value)' },
  { key: 'vehicle', label: 'Vehicle (current value)' },
  { key: 'otherAssets', label: 'Other assets' },
]

const LIABILITY_FIELDS: { key: keyof NetWorthLiabilities; label: string }[] = [
  { key: 'homeLoan', label: 'Home loan outstanding' },
  { key: 'carLoan', label: 'Car loan outstanding' },
  { key: 'personalLoan', label: 'Personal loan outstanding' },
  { key: 'educationLoan', label: 'Education loan outstanding' },
  { key: 'creditCardDue', label: 'Credit card dues' },
  { key: 'otherLiabilities', label: 'Other liabilities' },
]

const defaultAssets: NetWorthAssets = {
  cash: 100000, fixedDeposits: 200000, equityAndMutualFunds: 500000,
  epf: 300000, ppf: 200000, nps: 100000, gold: 100000,
  property: 5000000, vehicle: 500000, otherAssets: 0,
}
const defaultLiabilities: NetWorthLiabilities = {
  homeLoan: 2000000, carLoan: 300000, personalLoan: 0,
  educationLoan: 0, creditCardDue: 20000, otherLiabilities: 0,
}

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<NetWorthAssets>(defaultAssets)
  const [liabilities, setLiabilities] = useState<NetWorthLiabilities>(defaultLiabilities)
  const [age, setAge] = useState(35)
  const [annualIncome, setAnnualIncome] = useState(1500000)
  const [monthlySip, setMonthlySip] = useState(20000)

  const result = useMemo(
    () => calculateNetWorth(assets, liabilities, Math.max(1, age), Math.max(0, annualIncome), Math.max(0, monthlySip)),
    [assets, liabilities, age, annualIncome, monthlySip],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2 text-base tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="💰" title="Net Worth Calculator" subtitle="Add up everything you own, subtract everything you owe" />

      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-ash">Assets</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {ASSET_FIELDS.map((f) => (
              <div key={f.key}>
                <label htmlFor={`nw-asset-${f.key}`} className="mb-1 block text-xs text-ash/70">
                  {f.label}
                </label>
                <input
                  id={`nw-asset-${f.key}`}
                  type="number"
                  min={0}
                  value={assets[f.key]}
                  onChange={(e) => setAssets((a) => ({ ...a, [f.key]: Number(e.target.value) || 0 }))}
                  className={fieldCls}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-ash">Liabilities</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {LIABILITY_FIELDS.map((f) => (
              <div key={f.key}>
                <label htmlFor={`nw-liability-${f.key}`} className="mb-1 block text-xs text-ash/70">
                  {f.label}
                </label>
                <input
                  id={`nw-liability-${f.key}`}
                  type="number"
                  min={0}
                  value={liabilities[f.key]}
                  onChange={(e) => setLiabilities((l) => ({ ...l, [f.key]: Number(e.target.value) || 0 }))}
                  className={fieldCls}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="nw-age" className="mb-1.5 block text-sm font-medium text-ash">
              Your age
            </label>
            <input
              id="nw-age"
              type="number"
              min={18}
              max={80}
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="nw-income" className="mb-1.5 block text-sm font-medium text-ash">
              Annual income (₹)
            </label>
            <input
              id="nw-income"
              type="number"
              min={0}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="nw-sip" className="mb-1.5 block text-sm font-medium text-ash">
              Monthly SIP (₹, optional)
            </label>
            <input
              id="nw-sip"
              type="number"
              min={0}
              value={monthlySip}
              onChange={(e) => setMonthlySip(Number(e.target.value) || 0)}
              className={fieldCls}
            />
          </div>
        </div>

        <CalculatorCta label="Calculate Net Worth" tone="financial" disclaimer="Rough benchmarks shown are commonly cited rules of thumb, not official statistics." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Your net worth</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.netWorth)}
            </p>
            <p className="text-sm text-ash/60">
              Liquid net worth (excl. property, vehicle, EPF/PPF/NPS){' '}
              <span className={result.liquidNetWorth < 0 ? 'text-red-600' : 'text-spark-teal'}>
                {formatINR(result.liquidNetWorth)}
              </span>
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Total assets</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.totalAssets)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Total liabilities</td>
                <td className="py-1.5 text-right tabular-nums">-{formatINR(result.totalLiabilities)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Debt-to-asset ratio</td>
                <td className="py-1.5 text-right tabular-nums">{result.debtToAssetPercent}%</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Age × income rough benchmark</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.ageIncomeBenchmark)}</td>
              </tr>
              {result.monthsToOneCrore !== null && (
                <tr>
                  <td className="py-1.5 text-ash/70">Time to ₹1 crore net worth (at 12% illustrative)</td>
                  <td className="py-1.5 text-right tabular-nums">
                    {Math.floor(result.monthsToOneCrore / 12)}y {result.monthsToOneCrore % 12}m
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
