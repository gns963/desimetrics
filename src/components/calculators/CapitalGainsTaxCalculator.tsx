'use client'

import { useMemo, useState } from 'react'
import { calculateEquityCapitalGainsTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface CapitalGainsTaxCalculatorTexts {
  title: string
  subtitle: string
  purchaseLabel: string
  saleLabel: string
  holdingLabel: string
  holdingUnit: string
  ctaLabel: string
  disclaimer: string
  gainLabel: string
  gainTypeLabel: string
  shortTerm: string
  longTerm: string
  exemptionLabel: string
  taxableGainLabel: string
  taxLabel: string
  netProceedsLabel: string
}

const defaultTexts: CapitalGainsTaxCalculatorTexts = {
  title: 'Capital Gains Tax Calculator',
  subtitle: 'Estimate tax on listed equity shares & equity mutual funds',
  purchaseLabel: 'Purchase value (₹)',
  saleLabel: 'Sale value (₹)',
  holdingLabel: 'Holding period',
  holdingUnit: 'months',
  ctaLabel: 'Calculate Capital Gains Tax',
  disclaimer: 'Results are approximate estimates. Assumes STT was paid on both purchase and sale.',
  gainLabel: 'Capital gain',
  gainTypeLabel: 'Gain type',
  shortTerm: 'Short-term (STCG)',
  longTerm: 'Long-term (LTCG)',
  exemptionLabel: 'Exemption used',
  taxableGainLabel: 'Taxable gain',
  taxLabel: 'Tax payable',
  netProceedsLabel: 'Net proceeds after tax',
}

export default function CapitalGainsTaxCalculator({
  texts = defaultTexts,
}: {
  texts?: CapitalGainsTaxCalculatorTexts
} = {}) {
  const [purchaseValue, setPurchaseValue] = useState(500000)
  const [saleValue, setSaleValue] = useState(800000)
  const [holdingMonths, setHoldingMonths] = useState(18)

  const result = useMemo(
    () => calculateEquityCapitalGainsTax(Math.max(0, purchaseValue), Math.max(0, saleValue), holdingMonths),
    [purchaseValue, saleValue, holdingMonths],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="📉" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="cgt-purchase" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.purchaseLabel}
          </label>
          <input
            id="cgt-purchase"
            type="number"
            min={0}
            value={purchaseValue}
            onChange={(e) => setPurchaseValue(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="cgt-sale" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.saleLabel}
          </label>
          <input
            id="cgt-sale"
            type="number"
            min={0}
            value={saleValue}
            onChange={(e) => setSaleValue(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <SliderField
          id="cgt-holding"
          label={texts.holdingLabel}
          value={holdingMonths}
          onChange={setHoldingMonths}
          min={1}
          max={60}
          unit={texts.holdingUnit}
          hint="More than 12 months = long-term (LTCG); 12 months or less = short-term (STCG)."
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-ash/60">{texts.gainLabel}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                  result.gainType === 'long-term'
                    ? 'bg-spark-teal/15 text-spark-teal'
                    : 'bg-brass/15 text-brass'
                }`}
              >
                {result.gainType === 'long-term' ? texts.longTerm : texts.shortTerm}
              </span>
            </div>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.gain)}
            </p>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              {result.gainType === 'long-term' && (
                <tr>
                  <td className="py-1.5 text-ash/70">{texts.exemptionLabel}</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.exemptionUsed)}</td>
                </tr>
              )}
              <tr>
                <td className="py-1.5 text-ash/70">{texts.taxableGainLabel}</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.taxableGain)}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">
                  {texts.taxLabel} ({result.taxRatePercent}%)
                </td>
                <td className="py-2 text-right tabular-nums">{formatINR(result.tax)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.netProceedsLabel}</td>
                <td className="py-1.5 text-right font-semibold tabular-nums text-spark-teal">
                  {formatINR(result.netProceeds)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
