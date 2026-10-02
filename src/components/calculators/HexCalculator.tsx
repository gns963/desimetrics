'use client'

import { useMemo, useState } from 'react'
import { calculateHexOperation, type HexOperation } from '@/lib/calc/hex'
import { CalculatorCard, CalculatorHeader } from './CalculatorShell'

export interface HexCalculatorTexts {
  title: string
  subtitle: string
  firstLabel: string
  secondLabel: string
  operationLabel: string
  operations: Record<HexOperation, string>
  resultLabel: string
  quotientLabel: string
  remainderLabel: string
  decimalEquivalentLabel: string
  disclaimer: string
}

const defaultTexts: HexCalculatorTexts = {
  title: 'Hexadecimal Calculator',
  subtitle: 'Add, subtract, multiply or divide two hex numbers — exact, for any size',
  firstLabel: 'First hex number',
  secondLabel: 'Second hex number',
  operationLabel: 'Operation',
  operations: { add: 'Add (+)', subtract: 'Subtract (−)', multiply: 'Multiply (×)', divide: 'Divide (÷)' },
  resultLabel: 'Result',
  quotientLabel: 'Quotient',
  remainderLabel: 'Remainder',
  decimalEquivalentLabel: 'Decimal equivalent',
  disclaimer: 'Enter values with or without a 0x prefix — only 0-9 and A-F are valid.',
}

const OPERATIONS: HexOperation[] = ['add', 'subtract', 'multiply', 'divide']
const OPERATION_SYMBOL: Record<HexOperation, string> = {
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷',
}

export default function HexCalculator({ texts = defaultTexts }: { texts?: HexCalculatorTexts }) {
  const [a, setA] = useState('47')
  const [b, setB] = useState('1A')
  const [operation, setOperation] = useState<HexOperation>('add')

  const { result, error } = useMemo(() => {
    if (a.trim() === '' || b.trim() === '') {
      return { result: null, error: null }
    }
    try {
      return { result: calculateHexOperation(a, b, operation), error: null as string | null }
    } catch (e) {
      return { result: null, error: e instanceof Error ? e.message : 'Calculation error' }
    }
  }, [a, b, operation])

  const fieldCls =
    'w-full rounded-lg border border-hairline px-3 py-2.5 font-mono uppercase tracking-wide outline-none focus:border-hub-tools focus:ring-2 focus:ring-hub-tools/30'

  return (
    <CalculatorCard>
      <CalculatorHeader icon="🔢" title={texts.title} subtitle={texts.subtitle} />

      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <label htmlFor="hex-a" className="mb-1.5 block text-sm font-medium text-ash">
              {texts.firstLabel}
            </label>
            <input
              id="hex-a"
              type="text"
              inputMode="text"
              spellCheck={false}
              value={a}
              onChange={(e) => setA(e.target.value)}
              className={fieldCls}
              placeholder="e.g. 1A3F"
            />
          </div>
          <div>
            <label htmlFor="hex-b" className="mb-1.5 block text-sm font-medium text-ash">
              {texts.secondLabel}
            </label>
            <input
              id="hex-b"
              type="text"
              inputMode="text"
              spellCheck={false}
              value={b}
              onChange={(e) => setB(e.target.value)}
              className={fieldCls}
              placeholder="e.g. 2B"
            />
          </div>
        </div>

        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-ash">
            {texts.operationLabel}
          </legend>
          <div className="grid grid-cols-4 gap-2">
            {OPERATIONS.map((op) => {
              const active = op === operation
              return (
                <button
                  key={op}
                  type="button"
                  onClick={() => setOperation(op)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition ${
                    active
                      ? 'border-hub-tools bg-hub-tools/10 text-ink-navy'
                      : 'border-hairline text-ash/70 hover:border-hub-tools/40'
                  }`}
                >
                  <span aria-hidden className="font-display text-xl font-bold">
                    {OPERATION_SYMBOL[op]}
                  </span>
                  <span className="text-[11px] font-semibold">{texts.operations[op]}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="rounded-xl border border-hairline bg-mist p-5 text-center">
          {error ? (
            <p className="text-sm font-semibold text-seal-red">{error}</p>
          ) : result ? (
            <>
              <p className="font-mono text-sm text-ash/60">
                {result.aHex} {OPERATION_SYMBOL[operation]} {result.bHex} =
              </p>
              <p className="font-display mt-1 text-4xl font-bold tracking-wide text-hub-tools">
                {result.resultHex}
                <span className="text-lg font-normal text-ash/50">₁₆</span>
              </p>
              <p className="mt-1.5 text-xs text-ash/60">
                {texts.decimalEquivalentLabel}: {result.resultDec}
                {result.operation === 'divide' && (
                  <>
                    {' '}
                    · {texts.remainderLabel}: {result.remainderHex} ({result.remainderDec})
                  </>
                )}
              </p>
            </>
          ) : (
            <p className="text-sm text-ash/50">{texts.resultLabel}</p>
          )}
        </div>
      </form>

      <p className="mt-3 text-center text-xs text-ash/50">{texts.disclaimer}</p>
    </CalculatorCard>
  )
}
