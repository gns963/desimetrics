import { describe, expect, it } from 'vitest'
import { isPausedPath } from './paused'

describe('isPausedPath', () => {
  it('keeps the electricity category, home and site pages online', () => {
    for (const path of ['/', '/hi', '/electricity', '/electricity/tneb-bill-calculator', '/ta/electricity/tneb-bill-calculator', '/blog', '/news', '/about', '/blog/net-metering-explained-india']) {
      expect(isPausedPath(path), path).toBe(false)
    }
  })

  it('takes the other sections offline, with or without a locale prefix', () => {
    for (const path of ['/solar', '/hi/gas', '/financial/gst-calculator', '/tools/hex-calculator', '/water/karnataka', '/solar/roi-calculator?discom=TNEB', '/ac#faq']) {
      expect(isPausedPath(path), path).toBe(true)
    }
  })

  it('takes posts about paused sections offline, but not other posts', () => {
    expect(isPausedPath('/blog/rooftop-solar-system-cost-india')).toBe(true)
    expect(isPausedPath('/hi/news/odisha-ev-policy-extended-december-2026')).toBe(true)
    expect(isPausedPath('/news/kerala-power-shortage-september-2026')).toBe(false)
  })

  it('ignores external and non-path hrefs', () => {
    expect(isPausedPath('https://example.com/solar')).toBe(false)
    expect(isPausedPath('#tools')).toBe(false)
  })
})
