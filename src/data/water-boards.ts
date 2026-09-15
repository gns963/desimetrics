import waterBoardsJson from './water-boards.json'

export interface WaterBoardEntry {
  slug: string
  code: string
  name: string
  state: string
  hasTariffFile: boolean
  /**
   * The electricity DISCOM code that actually serves this board's city —
   * NOT just "the DISCOM for this board's state". Several state DISCOMs
   * don't cover their own state capital (e.g. WBSEDCL doesn't serve
   * Kolkata — CESC does, and CESC has no calculator on this site), so this
   * is only set where the city-level match is confirmed, never assumed
   * from `state` alone. Drives the water<->electricity cross-links in both
   * WaterBoardPage.tsx and DiscomCalculatorPage.tsx from one source.
   */
  matchingDiscomCode?: string
}

/** Looks up a water board by its /water/[slug] route slug (state-granularity
 *  today) — used to decide whether a page should render the real-tariff
 *  WaterBoardPage or fall back to the honest self-rate WaterStatePage. */
export function getWaterBoardBySlug(slug: string): WaterBoardEntry | undefined {
  return waterBoardsJson.boards.find((b) => b.slug === slug)
}

/** Real-tariff boards belonging to a given state — e.g. so the Tamil Nadu
 *  self-rate state page can point visitors to the real Chennai/CMWSSB
 *  calculator instead of always defaulting to a generic Delhi example.
 *  A state's board slug often differs from its own state slug (Chennai's
 *  board is "chennai", not "tamil-nadu"), so this is the only way to
 *  discover the connection. */
export function getLiveTariffBoardsByState(state: string): WaterBoardEntry[] {
  return waterBoardsJson.boards.filter((b) => b.hasTariffFile && b.state === state)
}

/** Reverse lookup for DiscomCalculatorPage.tsx: does this DISCOM serve a
 *  city with a live water board? Uses the same matchingDiscomCode field as
 *  the forward lookup, so the pairing only ever needs correcting in one
 *  place. */
export function getWaterBoardByMatchingDiscomCode(discomCode: string): WaterBoardEntry | undefined {
  return waterBoardsJson.boards.find((b) => b.hasTariffFile && b.matchingDiscomCode === discomCode)
}
