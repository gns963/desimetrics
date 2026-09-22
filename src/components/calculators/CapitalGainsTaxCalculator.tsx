'use client'

import { useMemo, useState } from 'react'
import { calculateCapitalGainsTax, monthsBetweenDates, type CapitalAssetType } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader } from './CalculatorShell'

const ASSET_OPTIONS: { value: CapitalAssetType; label: string }[] = [
  { value: 'equity', label: 'Listed Equity / Equity Mutual Fund (12-month LTCG)' },
  { value: 'debtFund', label: 'Debt Mutual Fund' },
  { value: 'other', label: 'Property / Gold / Unlisted Shares (24-month LTCG)' },
]

const SLAB_OPTIONS = [5, 20, 30]

export interface CapitalGainsTaxCalculatorTexts {
  title: string
  subtitle: string
  assetTypeLabel: string
  purchaseValueLabel: string
  saleValueLabel: string
  purchaseDateLabel: string
  saleDateLabel: string
  slabLabel: string
  slabHint: string
  grandfatherLabel: string
  grandfatherHint: string
  grandfatherFmvLabel: string
  reinvestmentLabel: string
  reinvestmentHint: string
  ctaLabel: string
  disclaimer: string
  gainLabel: string
  gainTypeLabel: string
  shortTerm: string
  longTerm: string
  effectiveCostLabel: string
  exemptionLabel: string
  taxableGainLabel: string
  taxLabel: string
  netProceedsLabel: string
}

const defaultTexts: CapitalGainsTaxCalculatorTexts = {
  title: 'Capital Gains Tax Calculator',
  subtitle: 'Classify short vs long term and estimate tax across asset types',
  assetTypeLabel: 'Asset type',
  purchaseValueLabel: 'Total purchase value (₹)',
  saleValueLabel: 'Total sale value (₹)',
  purchaseDateLabel: 'Purchase date',
  saleDateLabel: 'Sale date',
  slabLabel: 'Your income tax slab',
  slabHint: 'Used for short-term gains on this asset (and all debt-fund gains bought on/after 1 April 2023).',
  grandfatherLabel: 'Equity bought on or before 31 Jan 2018 (apply grandfathering)',
  grandfatherHint: 'Uses the higher of actual cost or 31 Jan 2018 fair market value, capped at sale price.',
  grandfatherFmvLabel: 'Fair market value on 31 Jan 2018 (₹)',
  reinvestmentLabel: 'Reinvestment exemption (Sec 54 / 54EC / 54F, optional)',
  reinvestmentHint: 'Eligible amount reinvested, deducted from the long-term taxable gain (capped at the gain).',
  ctaLabel: 'Calculate Tax',
  disclaimer: 'Results are approximate estimates. Property/gold indexation (pre-23 Jul 2024 acquisitions) is not modelled.',
  gainLabel: 'Capital gain',
  gainTypeLabel: 'Gain type',
  shortTerm: 'Short-term',
  longTerm: 'Long-term',
  effectiveCostLabel: 'Effective cost of acquisition',
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
  const [assetType, setAssetType] = useState<CapitalAssetType>('equity')
  const [purchaseValue, setPurchaseValue] = useState(500000)
  const [saleValue, setSaleValue] = useState(800000)
  const [purchaseDate, setPurchaseDate] = useState('2020-01-15')
  const [saleDate, setSaleDate] = useState('2024-08-01')
  const [slabRate, setSlabRate] = useState(30)
  const [grandfather, setGrandfather] = useState(false)
  const [grandfatherFmv, setGrandfatherFmv] = useState(0)
  const [reinvestment, setReinvestment] = useState(0)

  const holdingMonths = useMemo(
    () => monthsBetweenDates(purchaseDate, saleDate),
    [purchaseDate, saleDate],
  )

  const result = useMemo(
    () =>
      calculateCapitalGainsTax({
        assetType,
        purchaseValue: Math.max(0, purchaseValue),
        saleValue: Math.max(0, saleValue),
        holdingMonths,
        purchaseDateISO: purchaseDate,
        slabRatePercent: slabRate,
        grandfatherEquityBeforeFeb2018: grandfather,
        grandfatherFmv,
        reinvestmentExemption: reinvestment,
      }),
    [assetType, purchaseValue, saleValue, holdingMonths, purchaseDate, slabRate, grandfather, grandfatherFmv, reinvestment],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="📉" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="cgt-asset" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.assetTypeLabel}
          </label>
          <select
            id="cgt-asset"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value as CapitalAssetType)}
            className={fieldCls}
          >
            {ASSET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="cgt-purchase" className="mb-1.5 block text-sm font-medium text-ash">
              {texts.purchaseValueLabel}
            </label>
            <input
              id="cgt-purchase"
              type="number"
              min={0}
              value={purchaseValue}
              onChange={(e) => setPurchaseValue(Number(e.target.value) || 0)}
              className={`${fieldCls} text-lg`}
            />
          </div>
          <div>
            <label htmlFor="cgt-sale" className="mb-1.5 block text-sm font-medium text-ash">
              {texts.saleValueLabel}
            </label>
            <input
              id="cgt-sale"
              type="number"
              min={0}
              value={saleValue}
              onChange={(e) => setSaleValue(Number(e.target.value) || 0)}
              className={`${fieldCls} text-lg`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="cgt-purchase-date" className="mb-1.5 block text-sm font-medium text-ash">
              {texts.purchaseDateLabel}
            </label>
            <input
              id="cgt-purchase-date"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="cgt-sale-date" className="mb-1.5 block text-sm font-medium text-ash">
              {texts.saleDateLabel}
            </label>
            <input
              id="cgt-sale-date"
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              className={fieldCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cgt-slab" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.slabLabel}
          </label>
          <select
            id="cgt-slab"
            value={slabRate}
            onChange={(e) => setSlabRate(Number(e.target.value))}
            className={fieldCls}
          >
            {SLAB_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}%
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-ash/50">{texts.slabHint}</p>
        </div>

        {assetType === 'equity' && (
          <div className="rounded-lg border border-hairline bg-mist/40 p-3">
            <label className="flex items-start gap-2 text-sm text-ash">
              <input
                type="checkbox"
                checked={grandfather}
                onChange={(e) => setGrandfather(e.target.checked)}
                className="mt-0.5"
              />
              {texts.grandfatherLabel}
            </label>
            <p className="mt-1 text-xs text-ash/50">{texts.grandfatherHint}</p>
            {grandfather && (
              <div className="mt-2">
                <label htmlFor="cgt-fmv" className="mb-1.5 block text-sm font-medium text-ash">
                  {texts.grandfatherFmvLabel}
                </label>
                <input
                  id="cgt-fmv"
                  type="number"
                  min={0}
                  value={grandfatherFmv}
                  onChange={(e) => setGrandfatherFmv(Number(e.target.value) || 0)}
                  className={fieldCls}
                />
              </div>
            )}
          </div>
        )}

        {assetType === 'other' && (
          <div>
            <label htmlFor="cgt-reinvest" className="mb-1.5 block text-sm font-medium text-ash">
              {texts.reinvestmentLabel}
            </label>
            <input
              id="cgt-reinvest"
              type="number"
              min={0}
              value={reinvestment}
              onChange={(e) => setReinvestment(Number(e.target.value) || 0)}
              className={fieldCls}
            />
            <p className="mt-1 text-xs text-ash/50">{texts.reinvestmentHint}</p>
          </div>
        )}

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
              {result.effectiveCostOfAcquisition !== purchaseValue && (
                <tr>
                  <td className="py-1.5 text-ash/70">{texts.effectiveCostLabel}</td>
                  <td className="py-1.5 text-right tabular-nums">{formatINR(result.effectiveCostOfAcquisition)}</td>
                </tr>
              )}
              {result.exemptionUsed > 0 && (
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
