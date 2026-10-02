/**
 * DesiMetrics — hexadecimal arithmetic engine.
 *
 * PURE, framework-agnostic TypeScript. Unlike the utility/finance engines in
 * this folder, nothing here depends on sourced external data (tariffs,
 * rates) — hex arithmetic is exact, so every figure this module produces is
 * independently reproducible by the caller, not merely cited.
 *
 * Uses BigInt throughout so results are exact for arbitrarily large inputs
 * (a JS `number` silently loses precision above 2^53, which a calculator
 * claiming exactness cannot do).
 */

export type HexOperation = 'add' | 'subtract' | 'multiply' | 'divide'

export class HexParseError extends Error {}

/** Strips an optional 0x/0X prefix and surrounding whitespace. */
function stripPrefix(raw: string): string {
  const trimmed = raw.trim()
  return /^0x/i.test(trimmed) ? trimmed.slice(2) : trimmed
}

/** Validates and parses a hex string into a BigInt. Negative hex (a leading
 *  '-') is accepted since subtraction can produce a negative result that a
 *  user may want to feed back in. */
export function parseHex(raw: string): bigint {
  const negative = raw.trim().startsWith('-')
  const body = stripPrefix(negative ? raw.trim().slice(1) : raw)
  if (body.length === 0) {
    throw new HexParseError('Enter a hexadecimal value, e.g. 1A3F.')
  }
  if (!/^[0-9a-fA-F]+$/.test(body)) {
    throw new HexParseError(
      `"${raw}" is not valid hexadecimal — only digits 0-9 and letters A-F are allowed.`,
    )
  }
  const value = BigInt('0x' + body)
  return negative ? -value : value
}

/** Formats a BigInt back to uppercase hex, with a leading '-' for negatives
 *  and no '0x' prefix (matching how the two inputs are entered). */
export function toHex(value: bigint): string {
  if (value < BigInt(0)) return '-' + (-value).toString(16).toUpperCase()
  return value.toString(16).toUpperCase()
}

export interface HexOperationResult {
  operation: HexOperation
  aHex: string
  bHex: string
  aDec: string
  bDec: string
  resultHex: string
  resultDec: string
  /** Only set for 'divide': the integer remainder, since hex calculators
   *  conventionally show quotient + remainder rather than a fractional hex
   *  value (hex has no standard decimal-point convention). */
  remainderHex?: string
  remainderDec?: string
}

export function calculateHexOperation(
  aRaw: string,
  bRaw: string,
  operation: HexOperation,
): HexOperationResult {
  const a = parseHex(aRaw)
  const b = parseHex(bRaw)

  let result: bigint
  let remainder: bigint | undefined

  switch (operation) {
    case 'add':
      result = a + b
      break
    case 'subtract':
      result = a - b
      break
    case 'multiply':
      result = a * b
      break
    case 'divide':
      if (b === BigInt(0)) {
        throw new HexParseError('Cannot divide by zero.')
      }
      // Truncating (toward zero) integer division, matching how a
      // calculator app and most languages' native "/" on integers behave.
      result = a / b
      remainder = a % b
      break
    default: {
      const exhaustive: never = operation
      throw new HexParseError(`Unknown operation: ${exhaustive}`)
    }
  }

  return {
    operation,
    aHex: toHex(a),
    bHex: toHex(b),
    aDec: a.toString(10),
    bDec: b.toString(10),
    resultHex: toHex(result),
    resultDec: result.toString(10),
    ...(remainder !== undefined
      ? { remainderHex: toHex(remainder), remainderDec: remainder.toString(10) }
      : {}),
  }
}

export interface HexConversions {
  hex: string
  decimal: string
  binary: string
  octal: string
}

/** Every common base representation of one hex value — used by the
 *  explainer sections so a worked example's binary/decimal/octal figures
 *  are computed, never typed by hand. */
export function convertHex(raw: string): HexConversions {
  const value = parseHex(raw)
  const abs = value < BigInt(0) ? -value : value
  const sign = value < BigInt(0) ? '-' : ''
  return {
    hex: toHex(value),
    decimal: value.toString(10),
    binary: sign + abs.toString(2),
    octal: sign + abs.toString(8),
  }
}
