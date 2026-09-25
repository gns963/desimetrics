'use client'

import { useMemo, useState } from 'react'
import {
  calculateSsy,
  SSY_DEPOSIT_YEARS,
  SSY_MATURITY_YEARS,
  SSY_MAX_ANNUAL_DEPOSIT,
  SSY_MIN_ANNUAL_DEPOSIT,
} from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

const CURRENT_YEAR = new Date().getFullYear()
const SSY_MAX_GIRL_AGE_AT_OPENING = 10

export default function SsyCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(150000)
  const [rate, setRate] = useState(8.2)
  const [girlAge, setGirlAge] = useState(5)
  const [openingYear, setOpeningYear] = useState(CURRENT_YEAR)

  const result = useMemo(() => calculateSsy(Math.max(0, annualDeposit), rate), [annualDeposit, rate])
  const maxBalance = Math.max(...result.yearly.map((y) => y.balance), 1)

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  const overLimit = annualDeposit > SSY_MAX_ANNUAL_DEPOSIT
  const overAge = girlAge >= SSY_MAX_GIRL_AGE_AT_OPENING
  const depositEndYear = openingYear + SSY_DEPOSIT_YEARS
  const maturityYear = openingYear + SSY_MATURITY_YEARS

  return (
    <CalculatorCard>
      <CalculatorHeader icon="👧" title="Sukanya Samriddhi Yojana Calculator" subtitle="Project your girl child's SSY maturity value" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="ssy-deposit" className="mb-1.5 block text-sm font-medium text-ash">
            Annual deposit (₹)
          </label>
          <input
            id="ssy-deposit"
            type="number"
            min={SSY_MIN_ANNUAL_DEPOSIT}
            max={SSY_MAX_ANNUAL_DEPOSIT}
            value={annualDeposit}
            onChange={(e) => setAnnualDeposit(Number(e.target.value) || 0)}
            className={fieldCls}
          />
          <p className="mt-1 text-xs text-ash/50">
            Min {formatINR(SSY_MIN_ANNUAL_DEPOSIT)}, max {formatINR(SSY_MAX_ANNUAL_DEPOSIT)} per financial year.
            {overLimit && <span className="text-red-600"> Capped at the maximum in the calculation below.</span>}
          </p>
        </div>

        <SliderField id="ssy-rate" label="Interest rate (govt-notified, reviewed quarterly)" value={rate} onChange={setRate} min={6} max={10} step={0.1} unit="%" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ssy-girl-age" className="mb-1.5 block text-sm font-medium text-ash">
              Girl&apos;s age at account opening
            </label>
            <input
              id="ssy-girl-age"
              type="number"
              min={0}
              max={17}
              value={girlAge}
              onChange={(e) => setGirlAge(Number(e.target.value) || 0)}
              className={fieldCls}
            />
            {overAge && (
              <p className="mt-1 text-xs text-red-600">
                SSY accounts can only be opened for a girl below age {SSY_MAX_GIRL_AGE_AT_OPENING}.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ssy-opening-year" className="mb-1.5 block text-sm font-medium text-ash">
              Account opening year
            </label>
            <input
              id="ssy-opening-year"
              type="number"
              min={2015}
              max={CURRENT_YEAR + 5}
              value={openingYear}
              onChange={(e) => setOpeningYear(Number(e.target.value) || CURRENT_YEAR)}
              className={fieldCls}
            />
          </div>
        </div>

        <CalculatorCta label="Calculate SSY Maturity Value" tone="financial" disclaimer="The interest rate is reviewed quarterly by the government and is not guaranteed to stay at this level for 21 years." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Maturity value ({maturityYear})</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.maturityValue)}
            </p>
            <p className="text-sm text-ash/60">
              Deposited {formatINR(result.totalDeposited)} · Interest{' '}
              <span className="text-spark-teal">{formatINR(result.interestEarned)}</span>
            </p>
          </div>

          <div>
            <div className="flex h-40 items-end gap-1" aria-hidden>
              {result.yearly.map((p) => {
                const h = (p.balance / maxBalance) * 100
                return (
                  <div key={p.year} className="flex-1" title={`Year ${p.year}: ${formatINR(p.balance)}`}>
                    <div className="w-full rounded-t bg-brass" style={{ height: `${h}%` }} />
                  </div>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-ash/60">Account balance by year, from opening to maturity</p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">Account opened</td>
                <td className="py-1.5 text-right tabular-nums">{openingYear}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Deposits end</td>
                <td className="py-1.5 text-right tabular-nums">{depositEndYear} (15 years in)</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">Account matures</td>
                <td className="py-1.5 text-right tabular-nums">{maturityYear} (21 years in)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
