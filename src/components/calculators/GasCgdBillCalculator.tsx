'use client'

import { useMemo, useState } from 'react'
import { calculateFullGasBill } from '@/lib/calc/gas'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface GasCgdBillCalculatorTexts {
  /** Use {cgdName} placeholder. */
  titleTemplate: string
  /** Use {cgdCode} placeholder. */
  subtitleTemplate: string
  consumptionLabelMonthly: string
  consumptionLabelBimonthly: string
  consumptionUnit: string
  consumptionHint: string
  ctaLabel: string
  disclaimer: string
  estimatedBillLabel: string
  /** Use {amount} placeholder. */
  monthlyEquivalentTemplate: string
  gasChargeLabel: string
  fixedChargeLabel: string
}

const defaultTexts: GasCgdBillCalculatorTexts = {
  titleTemplate: '{cgdName} Bill Calculator',
  subtitleTemplate: "Priced at {cgdCode}'s real domestic tariff",
  consumptionLabelMonthly: 'Consumption per month',
  consumptionLabelBimonthly: 'Consumption per billing cycle (~60 days)',
  consumptionUnit: 'SCM',
  consumptionHint: 'Check your meter or last bill — SCM = standard cubic metre.',
  ctaLabel: 'Calculate Gas Bill',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  estimatedBillLabel: 'Estimated bill',
  monthlyEquivalentTemplate: '≈ {amount}/month equivalent',
  gasChargeLabel: 'Gas charge',
  fixedChargeLabel: 'Fixed charge',
}

/** Real-tariff PNG bill calculator for a CGD with a populated tariff file —
 *  no rate input needed, since the tariff itself is real and dated. */
export default function GasCgdBillCalculator({
  cgdCode,
  cgdName,
  texts = defaultTexts,
}: {
  cgdCode: string
  cgdName: string
  texts?: GasCgdBillCalculatorTexts
}) {
  const [scm, setScm] = useState(40)

  const { result, error } = useMemo(() => {
    try {
      return { result: calculateFullGasBill({ cgdCode, scmConsumed: scm }), error: null as string | null }
    } catch (e) {
      return { result: null, error: e instanceof Error ? e.message : 'Calculation error' }
    }
  }, [cgdCode, scm])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔥"
        title={texts.titleTemplate.replace('{cgdName}', cgdName)}
        subtitle={texts.subtitleTemplate.replace('{cgdCode}', cgdCode)}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="gas-cgd-consumption"
          label={result?.billingCycle === 'bimonthly' ? texts.consumptionLabelBimonthly : texts.consumptionLabelMonthly}
          value={scm}
          onChange={setScm}
          min={1}
          max={200}
          unit={texts.consumptionUnit}
          hint={texts.consumptionHint}
        />

        <CalculatorCta label={texts.ctaLabel} tone="gas" disclaimer={texts.disclaimer} />
      </form>

      <div className="mt-6 rounded-xl border border-hub-gas/15 bg-hub-gas/5 p-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-ash/60">
                {texts.estimatedBillLabel}
              </p>
              <p className="font-display text-4xl font-bold tabular-nums text-hub-gas">
                {formatINR(result.total)}
              </p>
              {result.monthlyEquivalent && (
                <p className="mt-1 text-xs text-ash/50">
                  {texts.monthlyEquivalentTemplate.replace('{amount}', formatINR(result.monthlyEquivalent.total))}
                </p>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">{texts.gasChargeLabel}</dt>
              <dd className="text-right tabular-nums">{formatINR(result.gasChargeGross)}</dd>
              <dt className="text-ash/60">{texts.fixedChargeLabel}</dt>
              <dd className="text-right tabular-nums">{formatINR(result.fixedCharge)}</dd>
            </dl>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
