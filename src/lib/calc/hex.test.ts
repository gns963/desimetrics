import { describe, expect, it } from 'vitest'
import { calculateHexOperation, convertHex, HexParseError, parseHex, toHex } from './hex'

describe('parseHex', () => {
  it('parses a plain hex string', () => {
    expect(parseHex('1A3F')).toBe(BigInt(0x1a3f))
  })

  it('accepts a 0x prefix and lowercase', () => {
    expect(parseHex('0x1a3f')).toBe(BigInt(0x1a3f))
  })

  it('accepts a leading negative sign', () => {
    expect(parseHex('-FF')).toBe(BigInt(-255))
  })

  it('rejects empty input', () => {
    expect(() => parseHex('')).toThrow(HexParseError)
  })

  it('rejects non-hex characters', () => {
    expect(() => parseHex('1G3')).toThrow(HexParseError)
  })
})

describe('toHex', () => {
  it('round-trips through parseHex', () => {
    expect(toHex(parseHex('1A3F'))).toBe('1A3F')
  })

  it('formats negative values with a leading -', () => {
    expect(toHex(BigInt(-255))).toBe('-FF')
  })
})

describe('calculateHexOperation', () => {
  it('adds two hex numbers (47 + 1A = 61, matching 16*4+7 + 1*16+10)', () => {
    const r = calculateHexOperation('47', '1A', 'add')
    expect(r.resultHex).toBe('61')
    expect(r.resultDec).toBe((0x47 + 0x1a).toString(10))
  })

  it('subtracts two hex numbers', () => {
    const r = calculateHexOperation('FF', '0F', 'subtract')
    expect(r.resultHex).toBe('F0')
  })

  it('subtraction can go negative', () => {
    const r = calculateHexOperation('0F', 'FF', 'subtract')
    expect(r.resultHex).toBe('-F0')
  })

  it('multiplies two hex numbers', () => {
    const r = calculateHexOperation('A', 'B', 'multiply')
    expect(r.resultHex).toBe((0xa * 0xb).toString(16).toUpperCase())
  })

  it('multiplication stays exact for values beyond 2^53', () => {
    // 2^60 * 2^10, a product no JS `number` could hold exactly.
    const r = calculateHexOperation('1000000000000000', '400', 'multiply')
    expect(r.resultHex).toBe((BigInt(2) ** BigInt(60) * BigInt(2) ** BigInt(10)).toString(16).toUpperCase())
  })

  it('divides with an integer quotient and remainder', () => {
    const r = calculateHexOperation('64', '0A', 'divide')
    expect(r.resultHex).toBe('A') // 100 / 10 = 10
    expect(r.remainderHex).toBe('0')
  })

  it('division truncates toward zero and reports a remainder', () => {
    const r = calculateHexOperation('0A', '03', 'divide')
    expect(r.resultHex).toBe('3') // 10 / 3 = 3 remainder 1
    expect(r.remainderHex).toBe('1')
  })

  it('throws on divide by zero', () => {
    expect(() => calculateHexOperation('FF', '0', 'divide')).toThrow(HexParseError)
  })

  it('throws on an invalid operand rather than silently returning NaN-like output', () => {
    expect(() => calculateHexOperation('ZZ', '1', 'add')).toThrow(HexParseError)
  })
})

describe('convertHex', () => {
  it('converts FF to its decimal, binary and octal equivalents', () => {
    const c = convertHex('FF')
    expect(c.decimal).toBe('255')
    expect(c.binary).toBe('11111111')
    expect(c.octal).toBe('377')
  })

  it('preserves sign across all four representations', () => {
    const c = convertHex('-10')
    expect(c.decimal).toBe('-16')
    expect(c.binary).toBe('-10000')
  })
})
