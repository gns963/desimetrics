'use client'

import { useMemo, useState } from 'react'
import { calculateHraExemption } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, OptionCardGroup } from './CalculatorShell'

type CityType = 'metro' | 'non-metro'

const CITY_OPTIONS: { value: CityType; label: string; icon: string }[] = [
  { value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)', icon: '🏙️' },
  { value: 'non-metro', label: 'Non-metro (any other city)', icon: '🏘️' },
]

export interface HraCalculatorTexts {
  title: string
  subtitle: string
  basicLabel: string
  hraLabel: string
  rentLabel: string
  cityLegend: string
  ctaLabel: string
  disclaimer: string
  exemptLabel: string
  taxableLabel: string
  ruleALabel: string
  ruleBLabel: string
  ruleCLabel: string
}

const defaultTexts: HraCalculatorTexts = {
  title: 'HRA Calculator',
  subtitle: 'Work out your tax-exempt House Rent Allowance',
  basicLabel: 'Basic salary + DA (monthly, ₹)',
  hraLabel: 'HRA received (monthly, ₹)',
  rentLabel: 'Rent paid (monthly, ₹)',
  cityLegend: 'City type',
  ctaLabel: 'Calculate HRA Exemption',
  disclaimer: 'Results are approximate estimates. Only available under the old tax regime.',
  exemptLabel: 'Exempt (tax-free) HRA',
  taxableLabel: 'Taxable HRA',
  ruleALabel: 'Actual HRA received',
  ruleBLabel: 'Rent paid − 10% of basic',
  ruleCLabel: '% of basic (city limit)',
}

export default function HraCalculator({
  texts = defaultTexts,
}: {
  texts?: HraCalculatorTexts
} = {}) {
  const [basicMonthly, setBasicMonthly] = useState(50000)
  const [hraMonthly, setHraMonthly] = useState(25000)
  const [rentMonthly, setRentMonthly] = useState(25000)
  const [city, setCity] = useState<CityType>('metro')

  const result = useMemo(
    () =>
      calculateHraExemption(
        Math.max(0, basicMonthly) * 12,
        Math.max(0, hraMonthly) * 12,
        Math.max(0, rentMonthly) * 12,
        city === 'metro',
      ),
    [basicMonthly, hraMonthly, rentMonthly, city],
  )

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 text-lg tabular-nums outline-none focus:border-hub-financial focus:ring-2 focus:ring-hub-financial/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🏠" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="hra-basic" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.basicLabel}
          </label>
          <input
            id="hra-basic"
            type="number"
            min={0}
            value={basicMonthly}
            onChange={(e) => setBasicMonthly(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="hra-received" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.hraLabel}
          </label>
          <input
            id="hra-received"
            type="number"
            min={0}
            value={hraMonthly}
            onChange={(e) => setHraMonthly(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="hra-rent" className="mb-1.5 block text-sm font-medium text-ash">
            {texts.rentLabel}
          </label>
          <input
            id="hra-rent"
            type="number"
            min={0}
            value={rentMonthly}
            onChange={(e) => setRentMonthly(Number(e.target.value) || 0)}
            className={fieldCls}
          />
        </div>

        <OptionCardGroup
          legend={texts.cityLegend}
          options={CITY_OPTIONS}
          value={city}
          onChange={setCity}
          columns={2}
        />

        <CalculatorCta label={texts.ctaLabel} tone="financial" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hairline bg-paper p-5">
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-ash/60">{texts.exemptLabel} (annual)</p>
            <p className="font-display text-4xl font-bold tabular-nums text-ink-navy">
              {formatINR(result.exemptAmount)}
            </p>
            <p className="text-sm text-ash/60">
              {texts.taxableLabel}{' '}
              <span className="text-spark-teal">{formatINR(result.taxableHra)}</span>
            </p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ash/60">
                <th className="py-1 font-medium">Rule (least of these three)</th>
                <th className="py-1 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="py-1.5 text-ash/70">{texts.ruleALabel}</td>
                <td className="py-1.5 text-right tabular-nums">{formatINR(result.hraReceived)}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.ruleBLabel}</td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.rentMinusTenPercentBasic)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 text-ash/70">{texts.ruleCLabel}</td>
                <td className="py-1.5 text-right tabular-nums">
                  {formatINR(result.salaryPercentLimit)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  )
}
