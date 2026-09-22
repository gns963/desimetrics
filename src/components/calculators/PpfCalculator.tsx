'use client'

import { useMemo, useState } from 'react'
import {
  simulatePpf,
  type PpfDepositMode,
  type PpfDepositTiming,
  type PpfExtensionChoice,
} from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup, SliderField } from './CalculatorShell'

const PPF_ANNUAL_CAP = 150000

const DEPOSIT_MODE_OPTIONS: { value: PpfDepositMode; label: string; icon: string }[] = [
  { value: 'monthly', label: 'Monthly', icon: '📅' },
  { value: 'yearly', label: 'Yearly', icon: '🗓️' },
]

const DEPOSIT_TIMING_OPTIONS: { value: PpfDepositTiming; label: string; icon: string }[] = [
  { value: 'before5th', label: 'Before the 5th', icon: '⏪' },
  { value: 'after5th', label: 'After the 5th', icon: '⏩' },
]

const EXTENSION_CHOICE_OPTIONS: { value: PpfExtensionChoice; label: string; icon: string }[] = [
  { value: 'contribute', label: 'Keep contributing', icon: '➕' },
  { value: 'stop', label: 'Stop contributing', icon: '⏸️' },
]

export default function PpfCalculator() {
  const [depositMode, setDepositMode] = useState<PpfDepositMode>('monthly')
  const [monthlyDeposit, setMonthlyDeposit] = useState(12500)
  const [yearlyDeposit, setYearlyDeposit] = useState(150000)
  const [rate, setRate] = useState(7.1)
  const [depositTiming, setDepositTiming] = useState<PpfDepositTiming>('before5th')
  const [extensionBlocks, setExtensionBlocks] = useState(0)
  const [extensionChoice, setExtensionChoice] = useState<PpfExtensionChoice>('contribute')
  const [taxBracket, setTaxBracket] = useState(30)

  const depositAmount = depositMode === 'monthly' ? monthlyDeposit : yearlyDeposit

  const result = useMemo(
    () =>
      simulatePpf({
        depositMode,
        depositAmount: Math.max(0, depositAmount),
        ratePercent: rate,
        depositTiming,
        extensionBlocks,
        extensionChoice,
        taxBracketPercent: taxBracket,
      }),
    [depositMode, depositAmount, rate, depositTiming, extensionBlocks, extensionChoice, taxBracket],
  )

  const maxValue = Math.max(...result.yearly.map((p) => p.value), 1)
  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="📮" title="PPF Calculator" subtitle="Project your Public Provident Fund maturity value" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <OptionCardGroup
          legend="Deposit mode"
          options={DEPOSIT_MODE_OPTIONS}
          value={depositMode}
          onChange={setDepositMode}
          columns={2}
        />

        {depositMode === 'monthly' ? (
          <div>
            <label htmlFor="ppf-monthly" className="mb-1.5 block text-sm font-medium text-ash">
              Monthly deposit (₹)
            </label>
            <input
              id="ppf-monthly"
              type="number"
              min={0}
              step={500}
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(Number(e.target.value) || 0)}
              className={fieldCls}
            />
            <p className="mt-1 text-xs text-ash/50">
              Capped at ₹1,50,000/year across all your PPF accounts — that&apos;s about ₹12,500/month.
            </p>
          </div>
        ) : (
          <div>
            <label htmlFor="ppf-yearly" className="mb-1.5 block text-sm font-medium text-ash">
              Annual deposit (₹)
            </label>
            <input
              id="ppf-yearly"
              type="number"
              min={0}
              max={PPF_ANNUAL_CAP}
              step={500}
              value={yearlyDeposit}
              onChange={(e) => setYearlyDeposit(Number(e.target.value) || 0)}
              className={fieldCls}
            />
            <p className="mt-1 text-xs text-ash/50">Statutory cap: ₹1,50,000 per financial year.</p>
          </div>
        )}

        <SliderField id="ppf-rate" label="PPF interest rate" value={rate} onChange={setRate} min={5} max={9} step={0.1} unit="%" />

        {depositMode === 'monthly' && (
          <OptionCardGroup
            legend="Deposit timing"
            options={DEPOSIT_TIMING_OPTIONS}
            value={depositTiming}
            onChange={setDepositTiming}
            columns={2}
          />
        )}
        {depositMode === 'monthly' && (
          <p className="-mt-3 text-xs text-ash/50">
            Interest is calculated on the lowest balance between the 5th and month-end — depositing before the 5th earns interest a month earlier than depositing after.
          </p>
        )}

        <SliderField
          id="ppf-extension"
          label="Extension after 15 years"
          value={extensionBlocks}
          onChange={setExtensionBlocks}
          min={0}
          max={4}
          unit="× 5-yr blocks"
          hint={`Total duration: ${15 + extensionBlocks * 5} years.`}
        />

        {extensionBlocks > 0 && (
          <OptionCardGroup
            legend="During extension"
            options={EXTENSION_CHOICE_OPTIONS}
            value={extensionChoice}
            onChange={setExtensionChoice}
            columns={2}
          />
        )}

        <SliderField
          id="ppf-tax-bracket"
          label="Your tax bracket (for 80C saving estimate)"
          value={taxBracket}
          onChange={setTaxBracket}
          min={0}
          max={30}
          step={5}
          unit="%"
        />

        <CalculatorCta
          label="Calculate PPF Maturity"
          tone="financial"
          disclaimer="Results are approximate estimates. The government revises the PPF rate every quarter."
        />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">Maturity value</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.maturityValue)}
            </p>
            <p className="text-sm text-ash/60">
              Invested {formatINR(result.invested)} · Interest{' '}
              <span className="text-spark-teal">{formatINR(result.interestEarned)}</span>
            </p>
          </div>

          <div>
            <div className="flex h-40 items-end gap-1" aria-hidden>
              {result.yearly.map((p) => {
                const totalH = (p.value / maxValue) * 100
                const investedH = (p.invested / maxValue) * 100
                return (
                  <div key={p.year} className="flex-1" title={`Year ${p.year}: ${formatINR(p.value)}`}>
                    <div className="relative w-full rounded-t bg-spark-teal/40" style={{ height: `${totalH}%` }}>
                      <div className="absolute bottom-0 w-full rounded-t bg-brass" style={{ height: `${(investedH / totalH) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-2 flex gap-4 text-xs text-ash/60">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-brass" />
                Invested
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-spark-teal/40" />
                Interest
              </span>
            </div>
          </div>

          {taxBracket > 0 && (
            <div className="rounded-lg border border-hairline bg-mist/60 px-3 py-2.5">
              <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">
                Estimated 80C tax saved over the full duration
              </p>
              <p className="font-display text-2xl font-bold tabular-nums text-ink-navy">
                {formatINR(result.totalTaxSaved)}
              </p>
              <p className="mt-1 text-xs text-ash/50">
                Assumes old tax regime and that you fully use your 80C limit elsewhere otherwise — PPF shares the ₹1.5L cap with other 80C instruments.
              </p>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  )
}
