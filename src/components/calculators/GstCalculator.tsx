'use client'

import { useMemo, useState } from 'react'
import { calculateGst } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

// Includes the simplified 5% / 18% / 40% structure from the September 2025
// "GST 2.0" rate rationalization, alongside the pre-reform slabs some goods
// and older invoices may still reference — always confirm the exact current
// rate for your specific goods/service against the official GST Council/CBIC
// notification, since item-to-slab mapping details are intricate and can
// change further.
const RATES = [0, 3, 5, 12, 18, 28, 40]

export interface GstCalculatorTexts {
  title: string
  subtitle: string
  amountLabel: string
  amountError: string
  rateLabel: string
  modeLegend: string
  exclusiveLabel: string
  inclusiveLabel: string
  supplyTypeLegend: string
  intraLabel: string
  interLabel: string
  ctaLabel: string
  disclaimer: string
  totalInclLabel: string
  totalPayableLabel: string
  baseAmountLabel: string
  /** Use {rate} placeholder. */
  gstAtRateTemplate: string
  cgstLabel: string
  sgstLabel: string
  igstLabel: string
}

const defaultTexts: GstCalculatorTexts = {
  title: 'GST Calculator',
  subtitle: 'Add or remove GST from any amount',
  amountLabel: 'Amount (₹)',
  amountError: 'Enter a valid amount.',
  rateLabel: 'GST rate',
  modeLegend: 'Amount is',
  exclusiveLabel: 'GST-exclusive (add GST)',
  inclusiveLabel: 'GST-inclusive (remove GST)',
  supplyTypeLegend: 'Supply type',
  intraLabel: 'Intra-state (CGST + SGST)',
  interLabel: 'Inter-state (IGST)',
  ctaLabel: 'Calculate GST',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  totalInclLabel: 'Total (incl. GST)',
  totalPayableLabel: 'Total payable',
  baseAmountLabel: 'Base amount',
  gstAtRateTemplate: 'GST @ {rate}%',
  cgstLabel: 'CGST',
  sgstLabel: 'SGST',
  igstLabel: 'IGST',
}

const SUPPLY_TYPE_OPTIONS: { value: 'intra' | 'inter'; label: string; icon: string }[] = [
  { value: 'intra', label: 'Intra-state (CGST + SGST)', icon: '🏠' },
  { value: 'inter', label: 'Inter-state (IGST)', icon: '🚚' },
]

export default function GstCalculator({
  texts = defaultTexts,
}: {
  texts?: GstCalculatorTexts
} = {}) {
  const [amountStr, setAmountStr] = useState('1000')
  const [rate, setRate] = useState(18)
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [supplyType, setSupplyType] = useState<'intra' | 'inter'>('intra')

  const { result, error } = useMemo(() => {
    const amount = Number(amountStr)
    if (!Number.isFinite(amount) || amount < 0)
      return { result: null, error: texts.amountError }
    return { result: calculateGst(amount, rate, mode, supplyType), error: null as string | null }
  }, [amountStr, rate, mode, supplyType, texts.amountError])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🧾" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="gst-amount"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.amountLabel}
          </label>
          <input
            id="gst-amount"
            type="number"
            min={0}
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            className={`${fieldCls} text-lg tabular-nums`}
          />
        </div>

        <div>
          <label
            htmlFor="gst-rate"
            className="mb-1.5 block text-sm font-medium text-ash"
          >
            {texts.rateLabel}
          </label>
          <select
            id="gst-rate"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className={fieldCls}
          >
            {RATES.map((r) => (
              <option key={r} value={r}>
                {r}%
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-ash">
            {texts.modeLegend}
          </legend>
          <div className="flex gap-2">
            {(
              [
                ['exclusive', texts.exclusiveLabel],
                ['inclusive', texts.inclusiveLabel],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setMode(val)}
                aria-pressed={mode === val}
                className={`flex-1 rounded-lg border-2 px-3 py-2 text-xs transition ${
                  mode === val
                    ? 'border-brass bg-brass/10 font-semibold text-ink-navy'
                    : 'border-hairline text-ash/70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <OptionCardGroup
          legend={texts.supplyTypeLegend}
          options={SUPPLY_TYPE_OPTIONS}
          value={supplyType}
          onChange={setSupplyType}
          columns={2}
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">
                {mode === 'inclusive' ? texts.totalInclLabel : texts.totalPayableLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
                {formatINR(result.total)}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">
                {texts.baseAmountLabel}
              </dt>
              <dd className="text-right tabular-nums">{formatINR(result.base)}</dd>
              <dt className="text-ash/60">
                {texts.gstAtRateTemplate.replace('{rate}', String(result.ratePercent))}
              </dt>
              <dd className="text-right tabular-nums">
                {formatINR(result.gstAmount)}
              </dd>
              {result.supplyType === 'inter' ? (
                <>
                  <dt className="text-ash/60">{texts.igstLabel}</dt>
                  <dd className="text-right tabular-nums">{formatINR(result.igst)}</dd>
                </>
              ) : (
                <>
                  <dt className="text-ash/60">{texts.cgstLabel}</dt>
                  <dd className="text-right tabular-nums">{formatINR(result.cgst)}</dd>
                  <dt className="text-ash/60">{texts.sgstLabel}</dt>
                  <dd className="text-right tabular-nums">{formatINR(result.sgst)}</dd>
                </>
              )}
            </dl>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
