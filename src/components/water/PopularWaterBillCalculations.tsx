import type { WaterTariffFile } from '@/data/water-tariffs/_schema'
import { computeWaterBill } from '@/lib/calc/water'
import { formatINR } from '@/lib/format'

const POPULAR_LITRE_LEVELS = [500, 1000, 2000, 5000, 10000, 15000, 20000, 25000]

/**
 * Pre-computed worked examples for common consumption levels, one per
 * accordion row — mirrors electricity's PopularBillCalculations.tsx exactly
 * (same disclosure pattern, same "English only for now" scope), but for
 * water: litres in, KL through computeWaterBill(), slab-wise water charge +
 * sewerage + fixed/minimum + total out. Targets long-tail "water bill for
 * X litres in Y" searches. Native <details>/<summary> so every row's
 * content is in the DOM and crawlable without JS.
 */
export default function PopularWaterBillCalculations({ tariff }: { tariff: WaterTariffFile }) {
  const rows = POPULAR_LITRE_LEVELS.map((litres) => ({
    litres,
    kl: litres / 1000,
    bill: computeWaterBill(tariff, { consumptionKl: litres / 1000 }),
  }))

  return (
    <div className="divide-y divide-hairline rounded-xl border border-hairline">
      {rows.map(({ litres, kl, bill }, i) => (
        <details key={litres} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 marker:hidden hover:bg-mist/50">
            <span className="flex items-center gap-2 font-medium text-ash">
              <span aria-hidden>💧</span> Water Bill for {litres.toLocaleString('en-IN')} Litres on {tariff.boardCode}
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="font-display font-bold tabular-nums text-hub-water">
                {formatINR(bill.total)}
              </span>
              <span className="text-ash/40 transition group-open:rotate-180" aria-hidden>
                ⌄
              </span>
            </span>
          </summary>
          <div className="space-y-4 border-t border-hairline bg-paper px-4 py-4">
            <p className="text-sm text-ash/70">
              The estimated water bill for {litres.toLocaleString('en-IN')} litres ({kl} KL) on{' '}
              {tariff.boardName} is {formatINR(bill.total)}. This estimate is based on the latest
              domestic tariff rates. Your actual bill may vary depending on your meter size,
              connection type, and other billing rules.
              {bill.notes.length > 0 && ` ${bill.notes.join(' ')}`}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-ash/50 uppercase">
                  Slab-wise Water Charges
                </p>
                <div className="overflow-x-auto rounded-lg border border-hairline">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-mist text-ink-navy">
                      <tr>
                        <th className="px-3 py-1.5 font-semibold">Slab Range (KL)</th>
                        <th className="px-3 py-1.5 text-right font-semibold">KL</th>
                        <th className="px-3 py-1.5 text-right font-semibold">Rate/KL</th>
                        <th className="px-3 py-1.5 text-right font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline">
                      {bill.slab.lines.filter((line) => line.klInSlab > 0).length === 0 ? (
                        <tr>
                          <td className="px-3 py-1.5 text-ash/60" colSpan={4}>
                            Waived — within the free allowance
                          </td>
                        </tr>
                      ) : (
                        bill.slab.lines
                          .filter((line) => line.klInSlab > 0)
                          .map((line, li) => (
                            <tr key={li}>
                              <td className="px-3 py-1.5">
                                {line.fromKL}–{line.toKL ?? 'above'}
                              </td>
                              <td className="px-3 py-1.5 text-right tabular-nums">
                                {line.klInSlab}
                              </td>
                              <td className="px-3 py-1.5 text-right tabular-nums">
                                ₹{line.ratePerKL.toFixed(2)}
                              </td>
                              <td className="px-3 py-1.5 text-right tabular-nums">
                                {formatINR(line.charge)}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-ash/50 uppercase">
                  Detailed Charges Breakdown
                </p>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ash/70">Water Charge</dt>
                    <dd className="font-medium tabular-nums text-ink-navy">
                      {formatINR(bill.waterCharge)}
                    </dd>
                  </div>
                  {bill.sewerageCharge > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ash/70">Sewerage Charge</dt>
                      <dd className="font-medium tabular-nums text-ink-navy">
                        {formatINR(bill.sewerageCharge)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-ash/70">
                      {bill.minimumApplied ? 'Minimum Charge' : 'Fixed Charge'}
                    </dt>
                    <dd className="font-medium tabular-nums text-ink-navy">
                      {formatINR(bill.fixedCharge)}
                    </dd>
                  </div>
                  {bill.additionalFeesTotal > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ash/70">Additional Fees</dt>
                      <dd className="font-medium tabular-nums text-ink-navy">
                        {formatINR(bill.additionalFeesTotal)}
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-hub-water/10 px-3 py-2">
                  <span className="text-sm font-semibold text-ink-navy">Total Bill Amount</span>
                  <span className="font-display font-bold tabular-nums text-hub-water">
                    {formatINR(bill.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}
