'use client'

import { useMemo, useState } from 'react'
import { calculateNcbIdv } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export default function NcbIdvCalculator() {
  const [listedPrice, setListedPrice] = useState(1000000)
  const [vehicleAgeMonths, setVehicleAgeMonths] = useState(18)
  const [odPremium, setOdPremium] = useState(12000)
  const [claimFreeYears, setClaimFreeYears] = useState(3)

  const result = useMemo(
    () => calculateNcbIdv(Math.max(1, listedPrice), Math.max(0, vehicleAgeMonths), Math.max(0, odPremium), Math.max(0, claimFreeYears)),
    [listedPrice, vehicleAgeMonths, odPremium, claimFreeYears],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🚘" title="NCB + IDV Calculator" subtitle="Your No-Claim Bonus discount and Insured Declared Value, per IRDAI's standard slabs" />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="ncb-price" className="mb-1.5 block text-sm font-medium text-ash">
            Manufacturer&apos;s listed price (₹)
          </label>
          <input id="ncb-price" type="number" min={0} value={listedPrice} onChange={(e) => setListedPrice(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="ncb-age" label="Vehicle age" value={vehicleAgeMonths} onChange={setVehicleAgeMonths} min={0} max={60} unit="months" />

        <div>
          <label htmlFor="ncb-od-premium" className="mb-1.5 block text-sm font-medium text-ash">
            Own-damage (OD) premium before NCB (₹)
          </label>
          <input id="ncb-od-premium" type="number" min={0} value={odPremium} onChange={(e) => setOdPremium(Number(e.target.value) || 0)} className={fieldCls} />
        </div>

        <SliderField id="ncb-years" label="Consecutive claim-free years" value={claimFreeYears} onChange={setClaimFreeYears} min={0} max={10} unit="yrs" />

        <CalculatorCta label="Calculate NCB & IDV" tone="financial" disclaimer="NCB and IDV slabs are IRDAI-standardised; actual premium quotes depend on your insurer." />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">No-Claim Bonus</td>
                <td className="py-1.5 text-right tabular-nums font-bold text-ink-navy">{result.ncbPercent}%</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">NCB discount amount</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.ncbDiscountAmount)}</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">OD premium after NCB</td>
                <td className="py-2 text-right tabular-nums">{formatINR(result.odPremiumAfterNcb)}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">IDV depreciation ({vehicleAgeMonths} months old)</td>
                <td className="py-1.5 text-right tabular-nums">{result.idvDepreciationPercent}%</td>
              </tr>
              <tr className="text-base font-bold text-ink-navy">
                <td className="py-2">Insured Declared Value (IDV)</td>
                <td className="py-2 text-right tabular-nums">{formatINR(result.idv)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-ash/50">NCB applies only to the OD premium, not third-party premium. Beyond 5 years, IDV is set by mutual agreement between you and your insurer.</p>
        </div>
      </div>
    </CalculatorCard>
  )
}
