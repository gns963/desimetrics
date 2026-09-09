'use client'

import { useMemo, useState } from 'react'
import { calculateGasBill } from '@/lib/calc/gas'
import { formatINR } from '@/lib/format'
import { CalculatorCard, CalculatorCta, CalculatorHeader, SliderField } from './CalculatorShell'

export interface GasBillCalculatorTexts {
  title: string
  subtitle: string
  consumptionLabel: string
  consumptionUnit: string
  consumptionHint: string
  rateLabel: string
  rateUnit: string
  rateHint: string
  fixedLabel: string
  fixedUnit: string
  ctaLabel: string
  disclaimer: string
  estimatedBillLabel: string
  volumetricLabel: string
  fixedChargeLabel: string
}

const defaultTexts: GasBillCalculatorTexts = {
  title: 'Gas Bill Calculator',
  subtitle: "From your own PNG consumption and provider's rate",
  consumptionLabel: 'Monthly consumption',
  consumptionUnit: 'SCM',
  consumptionHint: 'SCM = standard cubic metre, the usual PNG billing unit. Check your meter or last bill.',
  rateLabel: "Your provider's rate",
  rateUnit: '₹/SCM',
  rateHint: "From your last bill or your gas company's published tariff — this varies by provider and city.",
  fixedLabel: 'Fixed / meter charge',
  fixedUnit: '₹/month',
  ctaLabel: 'Calculate Gas Bill',
  disclaimer: 'Results are approximate estimates. Your actual bill may vary.',
  estimatedBillLabel: 'Estimated bill',
  volumetricLabel: 'Volumetric charge',
  fixedChargeLabel: 'Fixed charge',
}

export default function GasBillCalculator({
  texts = defaultTexts,
}: {
  texts?: GasBillCalculatorTexts
} = {}) {
  const [consumption, setConsumption] = useState(15)
  const [rate, setRate] = useState(45)
  const [fixedCharge, setFixedCharge] = useState(50)

  const { result, error } = useMemo(() => {
    try {
      return {
        result: calculateGasBill({
          consumptionScm: consumption,
          ratePerScm: rate,
          fixedChargePerMonth: fixedCharge,
        }),
        error: null as string | null,
      }
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Calculation error',
      }
    }
  }, [consumption, rate, fixedCharge])

  return (
    <CalculatorCard>
      <CalculatorHeader
        icon="🔥"
        title={texts.title}
        subtitle={texts.subtitle}
      />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <SliderField
          id="gas-consumption"
          label={texts.consumptionLabel}
          value={consumption}
          onChange={setConsumption}
          min={1}
          max={100}
          unit={texts.consumptionUnit}
          hint={texts.consumptionHint}
        />

        <SliderField
          id="gas-rate"
          label={texts.rateLabel}
          value={rate}
          onChange={setRate}
          min={10}
          max={100}
          unit={texts.rateUnit}
          hint={texts.rateHint}
        />

        <SliderField
          id="gas-fixed"
          label={texts.fixedLabel}
          value={fixedCharge}
          onChange={setFixedCharge}
          min={0}
          max={500}
          step={10}
          unit={texts.fixedUnit}
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
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ash/60">
                {texts.volumetricLabel}
              </dt>
              <dd className="text-right tabular-nums">{formatINR(result.volumetricCharge)}</dd>
              <dt className="text-ash/60">{texts.fixedChargeLabel}</dt>
              <dd className="text-right tabular-nums">{formatINR(result.fixedCharge)}</dd>
            </dl>
          </div>
        )}
      </div>
    </CalculatorCard>
  )
}
