import type { TariffFile } from '@/data/tariffs/_schema'
import { computeBill } from '@/lib/calc/electricity'
import { formatINR } from '@/lib/format'

const POPULAR_UNIT_LEVELS = [50, 100, 150, 200, 250, 300, 400, 500, 750, 1000]

/**
 * Pre-computed worked examples for common consumption levels, one per
 * accordion row — pure presentation over the existing computeBill() engine
 * and each DISCOM's own residential tariff, no new data required. Targets
 * long-tail "electricity bill for X units in Y" searches. Uses native
 * <details>/<summary> so every row's content is in the DOM and crawlable
 * without JS, matching the rest of the site's disclosure pattern.
 */
export default function PopularBillCalculations({ tariff }: { tariff: TariffFile }) {
  const residential =
    tariff.connectionTypes.find((c) => c.connectionType === 'residential') ??
    tariff.connectionTypes[0]
  const sanctionedLoad = residential.fixedCharge.basis === 'perLoad' ? 3 : undefined

  const rows = POPULAR_UNIT_LEVELS.map((units) => ({
    units,
    bill: computeBill(tariff, {
      connectionType: residential.connectionType,
      unitsConsumed: units,
      phase: 'single',
      sanctionedLoad,
    }),
  }))

  return (
    <div className="divide-y divide-hairline rounded-xl border border-hairline">
      {rows.map(({ units, bill }, i) => (
        <details key={units} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 marker:hidden hover:bg-mist/50">
            <span className="flex items-center gap-2 font-medium text-ash">
              <span aria-hidden>⚡</span> Electricity Bill for {units} Units in {tariff.state}
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="font-display font-bold tabular-nums text-brass">
                {formatINR(bill.total)}
              </span>
              <span className="text-ash/40 transition group-open:rotate-180" aria-hidden>
                ⌄
              </span>
            </span>
          </summary>
          <div className="space-y-4 border-t border-hairline bg-paper px-4 py-4">
            <p className="text-sm text-ash/70">
              The estimated electricity bill for {units} units under {tariff.discomName} in{' '}
              {tariff.state} is {formatINR(bill.total)}. This estimate is based on the latest
              tariff rates for Domestic connections. Your actual bill may vary depending on
              applicable fuel surcharge, electricity duty, fixed charges, taxes and other billing
              rules.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-ash/50 uppercase">
                  Slab-wise Energy Charges
                </p>
                <div className="overflow-x-auto rounded-lg border border-hairline">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-mist text-ink-navy">
                      <tr>
                        <th className="px-3 py-1.5 font-semibold">Slab Range</th>
                        <th className="px-3 py-1.5 text-right font-semibold">Units</th>
                        <th className="px-3 py-1.5 text-right font-semibold">Rate/Unit</th>
                        <th className="px-3 py-1.5 text-right font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline">
                      {bill.slab.lines
                        .filter((line) => line.unitsInSlab > 0)
                        .map((line, li) => (
                          <tr key={li}>
                            <td className="px-3 py-1.5">
                              {line.fromUnit}–{line.toUnit ?? 'above'}
                            </td>
                            <td className="px-3 py-1.5 text-right tabular-nums">
                              {line.unitsInSlab}
                            </td>
                            <td className="px-3 py-1.5 text-right tabular-nums">
                              ₹{line.ratePerUnit.toFixed(2)}
                            </td>
                            <td className="px-3 py-1.5 text-right tabular-nums">
                              {formatINR(line.charge)}
                            </td>
                          </tr>
                        ))}
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
                    <dt className="text-ash/70">Energy Charges</dt>
                    <dd className="font-medium tabular-nums text-ink-navy">
                      {formatINR(bill.energyChargeGross)}
                    </dd>
                  </div>
                  {bill.subsidy.subsidyAmount > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ash/70">Subsidy</dt>
                      <dd className="font-medium tabular-nums text-ink-navy">
                        −{formatINR(bill.subsidy.subsidyAmount)}
                      </dd>
                    </div>
                  )}
                  {bill.meterRent > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ash/70">Meter Rent</dt>
                      <dd className="font-medium tabular-nums text-ink-navy">
                        {formatINR(bill.meterRent)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-ash/70">Fixed Charges</dt>
                    <dd className="font-medium tabular-nums text-ink-navy">
                      {formatINR(bill.fixedCharge.amount)}
                    </dd>
                  </div>
                  {bill.electricityDuty.amount > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ash/70">Electricity Duty</dt>
                      <dd className="font-medium tabular-nums text-ink-navy">
                        {formatINR(bill.electricityDuty.amount)}
                      </dd>
                    </div>
                  )}
                  {bill.fuelCostAdjustment.amount > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ash/70">Fuel Adjustment Charges</dt>
                      <dd className="font-medium tabular-nums text-ink-navy">
                        {formatINR(bill.fuelCostAdjustment.amount)}
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-spark-teal/10 px-3 py-2">
                  <span className="text-sm font-semibold text-ink-navy">Total Bill Amount</span>
                  <span className="font-display font-bold tabular-nums text-spark-teal">
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
