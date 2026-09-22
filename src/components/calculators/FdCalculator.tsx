'use client'

import { useMemo, useState } from 'react'
import { simulateFd, type FdType } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

type Compounding = '1' | '2' | '4' | '12'

const COMPOUNDING_OPTIONS: { value: Compounding; label: string; icon: string }[] = [
  { value: '1', label: 'Annually', icon: '📅' },
  { value: '2', label: 'Half-yearly', icon: '🗓️' },
  { value: '4', label: 'Quarterly', icon: '📆' },
  { value: '12', label: 'Monthly', icon: '🕐' },
]

const FD_TYPE_OPTIONS: { value: FdType; label: string; icon: string }[] = [
  { value: 'cumulative', label: 'Cumulative', icon: '📈' },
  { value: 'nonCumulative', label: 'Non-cumulative', icon: '💵' },
]

const YES_NO_OPTIONS = (yesLabel: string, noLabel: string): { value: 'yes' | 'no'; label: string; icon: string }[] => [
  { value: 'yes', label: yesLabel, icon: '✅' },
  { value: 'no', label: noLabel, icon: '❌' },
]

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(7.25)
  const [years, setYears] = useState(5)
  const [compounding, setCompounding] = useState<Compounding>('4')
  const [fdType, setFdType] = useState<FdType>('cumulative')
  const [isSenior, setIsSenior] = useState<'yes' | 'no'>('no')
  const [panRegistered, setPanRegistered] = useState<'yes' | 'no'>('yes')

  const result = useMemo(
    () =>
      simulateFd({
        principal: Math.max(0, principal),
        ratePercent: rate,
        years: Math.max(1, years),
        compoundingPerYear: Number(compounding),
        fdType,
        isSeniorCitizen: isSenior === 'yes',
        panRegistered: panRegistered === 'yes',
      }),
    [principal, rate, years, compounding, fdType, isSenior, panRegistered],
  )

  const maxValue = Math.max(...result.yearly.map((p) => (fdType === 'cumulative' ? p.value : p.interestThisYear)), 1)

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏦" title="FD Calculator" subtitle="Deposit to net-of-tax maturity" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="fd-principal" className="mb-1.5 block text-sm font-medium text-ash">
            Deposit amount (₹)
          </label>
          <input
            id="fd-principal"
            type="number"
            min={0}
            step={5000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30"
          />
          <p className="mt-1 text-xs text-ash/50">The rate your bank quotes, before any senior-citizen bonus.</p>
        </div>

        <SliderField id="fd-rate" label="Interest rate (annual)" value={rate} onChange={setRate} min={3} max={9.5} step={0.05} unit="%" />
        <SliderField id="fd-years" label="Tenure" value={years} onChange={setYears} min={1} max={10} unit="yrs" />

        <OptionCardGroup legend="Compounding frequency" options={COMPOUNDING_OPTIONS} value={compounding} onChange={setCompounding} columns={4} />
        <OptionCardGroup legend="FD type" options={FD_TYPE_OPTIONS} value={fdType} onChange={setFdType} columns={2} />
        <p className="-mt-3 text-xs text-ash/50">Cumulative compounds to maturity; non-cumulative pays out interest periodically instead.</p>

        <div className="grid grid-cols-2 gap-3">
          <OptionCardGroup
            legend="Senior citizen (60+)?"
            options={YES_NO_OPTIONS('Yes (+0.5%)', 'No')}
            value={isSenior}
            onChange={setIsSenior}
            columns={2}
          />
          <OptionCardGroup
            legend="PAN registered with bank?"
            options={YES_NO_OPTIONS('Yes (10% TDS)', 'No (20% TDS)')}
            value={panRegistered}
            onChange={setPanRegistered}
            columns={2}
          />
        </div>
        <p className="-mt-3 text-xs text-ash/50">Without PAN, TDS is deducted at 20% instead of 10%.</p>

        <CalculatorCta
          label="Calculate FD Maturity"
          tone="financial"
          disclaimer="Results are approximate estimates. Your bank's actual rate and compounding may differ."
        />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">
              {fdType === 'cumulative' ? 'Maturity value' : 'Principal returned at maturity'}
            </p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.maturityValue)}
            </p>
            <p className="text-sm text-ash/60">
              Effective rate {result.effectiveRatePercent}% · Gross interest{' '}
              <span className="text-spark-teal">{formatINR(result.totalInterestEarned)}</span>
            </p>
          </div>

          {fdType === 'nonCumulative' && result.annualPayout !== null && (
            <div className="rounded-lg border border-hairline bg-mist/60 px-3 py-2.5">
              <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">Annual payout</p>
              <p className="font-display text-2xl font-bold tabular-nums text-ink-navy">{formatINR(result.annualPayout)}/yr</p>
            </div>
          )}

          <div>
            <div className="flex h-40 items-end gap-1" aria-hidden>
              {result.yearly.map((p) => {
                const h = ((fdType === 'cumulative' ? p.value : p.interestThisYear) / maxValue) * 100
                return (
                  <div
                    key={p.year}
                    className="flex-1"
                    title={`Year ${p.year}: ${formatINR(fdType === 'cumulative' ? p.value : p.interestThisYear)}`}
                  >
                    <div className="w-full rounded-t bg-spark-teal/40" style={{ height: `${h}%` }} />
                  </div>
                )
              })}
            </div>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">TDS threshold applied</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.tdsThresholdApplied)}/yr</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Total TDS deducted</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.totalTds)}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">Net interest after TDS</td>
                <td className="py-2 text-right tabular-nums text-spark-teal">{formatINR(result.netInterestAfterTds)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-ash/50">
            TDS is deducted per financial year once that year&apos;s interest crosses the threshold — it isn&apos;t your final tax liability, just what the bank withholds upfront.
          </p>
        </div>
      </div>
    </CalculatorCard>
  )
}
