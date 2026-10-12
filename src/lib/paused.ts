/**
 * Sections taken offline on 2026-10-12: the site is narrowed to the
 * electricity category while the others are reviewed and re-published one at
 * a time. Their code and data stay in the repo. To bring a section back,
 * delete its entry here — the proxy stops 404ing it, and its links, menu
 * entries and sitemap rows reappear.
 */
export const PAUSED_SECTIONS: ReadonlySet<string> = new Set([
  'ac',
  'appliances',
  'financial',
  'fuel-cost',
  'gas',
  'solar',
  'tools',
  'water',
])

/** Blog and news posts whose subject is one of the paused sections. */
export const PAUSED_POSTS: ReadonlySet<string> = new Set([
  'blog/ac-running-cost-india-guide',
  'blog/geyser-water-heater-running-cost-india',
  'blog/how-water-bills-calculated-india',
  'blog/is-rooftop-solar-worth-it-in-india-2026',
  'blog/new-vs-old-tax-regime-who-actually-saves',
  'blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide',
  'blog/png-piped-gas-bill-guide-india',
  'blog/refrigerator-electricity-consumption-india',
  'blog/rooftop-solar-system-cost-india',
  'news/gas-price-ceiling-9-89-apm-cap-october-2026',
  'news/odisha-ev-policy-extended-december-2026',
])

const LOCALES = new Set(['hi', 'ta', 'te', 'mr', 'bn', 'kn', 'gu', 'ml'])

/** True for a site path (with or without a locale prefix, query or hash) that is currently offline. */
export function isPausedPath(path: string): boolean {
  if (!path.startsWith('/')) return false
  const segments = path.split(/[?#]/)[0].split('/').filter(Boolean)
  if (segments.length > 0 && LOCALES.has(segments[0])) segments.shift()
  if (segments.length === 0) return false
  if (PAUSED_SECTIONS.has(segments[0])) return true
  return segments.length >= 2 && PAUSED_POSTS.has(`${segments[0]}/${segments[1]}`)
}
