/**
 * Single source of truth for which logical pages have a genuine, indexable
 * translation in which locale — drives every page's `alternates.languages`
 * (hreflang) set so it can never point at a page that doesn't exist or is
 * noindexed. See SEO audit 2026-09-07.
 *
 * A path is a bare route with no site origin and no locale prefix, e.g.
 * "/ac/bill-calculator", or "" for the homepage — always the ENGLISH path,
 * even when called from a translated page (the locale prefix is added
 * internally). Register a static page in `exact`; register a dynamic route
 * (one that covers many slugs, e.g. AC brand pages) as a `prefixes` entry
 * ending in "/" — every concrete path starting with that prefix is treated
 * as translated, which is correct only because those particular dynamic
 * components genuinely localize every instance they render (see AcBrandPage,
 * SolarStatePage, UnitPricePage, GasCgdPage/GasCompanyPage, and the author
 * page's `hi` fallback fields). Do not add a prefix unless that's true.
 *
 * DISCOM detail pages (/electricity/[slug]) and water board/state pages
 * (/water/[slug]) are deliberately absent from `hi` — their Hindi versions
 * are chrome-translated only (English h1/metadata/JSON-LD) and are
 * noindexed until genuinely translated, so they must never appear here.
 */

export type Locale = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn' | 'kn' | 'gu' | 'ml'
export type NonEnglishLocale = Exclude<Locale, 'en'>

const SITE = 'https://desimetrics.com'

interface TranslatedRoutes {
  exact: Set<string>
  prefixes: string[]
}

/**
 * STANDING TRANSLATION POLICY (confirmed 2026-09-09):
 *   1. English + Hindi are MANDATORY on every calculator/content page,
 *      regardless of state — `hi`'s `exact`/`prefixes` sets below are meant
 *      to eventually cover every route English has (see the Hindi-gap
 *      backlog note in project memory for the current shortfall — as of
 *      2026-09-09 it is exactly the 37 electricity-DISCOM + ~38 water-board
 *      pages already noindexed above, not a newly discovered gap).
 *   2. A third, regional language is added to a STATE only where verified
 *      search demand exists for that state's utility content in that
 *      language — never by assumption or convenience. `STATE_LANGUAGE_POLICY`
 *      below is the reasoning record for which states clear that bar.
 *
 * This is why the shape of `TRANSLATED` already treats `hi` as broadly
 * eligible (many `exact`/`prefixes` entries) while every other locale starts
 * from a minimal, explicitly-justified set (currently just the homepage,
 * '', for ta/te/mr/bn/kn/gu) — a locale's footprint here should only grow
 * when `STATE_LANGUAGE_POLICY` says that state's regional-language demand is
 * "confirmed", never as a batch/convenience addition.
 *
 * ⚠️ `STATE_LANGUAGE_POLICY`'s verdicts are DIRECTIONAL JUDGMENT, NOT
 * VERIFIED QUERY-LEVEL SEARCH DATA. They were produced from public web
 * research (KPMG-Google Indian-language-internet-adoption data, documented
 * state language-policy history e.g. Tamil Nadu's 3-language-formula
 * rejection) because no SEMrush/Search-Console export existed for this
 * breakdown as of 2026-09-09, despite being referenced as available. This is
 * a placeholder-with-reasoning, not a settled conclusion — revisit and
 * correct every verdict against real Search Console / analytics data once
 * the relevant pages have been live long enough to accumulate traffic. A
 * future session should NOT treat this table as final truth just because
 * it's in code.
 */
export interface StateLanguagePolicyEntry {
  state: string
  hindiDemand: 'confirmed' | 'weak-concentrated' | 'weak'
  regionalLocale: NonEnglishLocale | null
  regionalDemand: 'confirmed' | 'unbuilt-gap' | 'not-applicable'
  note: string
}

export const STATE_LANGUAGE_POLICY: StateLanguagePolicyEntry[] = [
  {
    state: 'Maharashtra',
    hindiDemand: 'confirmed',
    regionalLocale: 'mr',
    regionalDemand: 'confirmed',
    note: 'Mumbai/Pune highly Hindi-fluent; Marathi demand evidenced directly by the Mahavitaran/MSEDCL colloquial-name finding.',
  },
  {
    state: 'Tamil Nadu',
    hindiDemand: 'weak',
    regionalLocale: 'ta',
    regionalDemand: 'confirmed',
    note: 'TN never adopted the 3-language formula; 89 years of anti-Hindi political history (1937/1948/1965 agitations), still an active dispute with the Centre over NEP today. Build EN+HI for policy consistency but do not expect Hindi content to perform here.',
  },
  {
    state: 'Telangana',
    hindiDemand: 'weak-concentrated',
    regionalLocale: 'te',
    regionalDemand: 'confirmed',
    note: 'Hindi/Urdu comprehension concentrated in Hyderabad (Nizam-era history); drops sharply outside it.',
  },
  {
    state: 'Andhra Pradesh',
    hindiDemand: 'weak-concentrated',
    regionalLocale: 'te',
    regionalDemand: 'confirmed',
    note: 'Same Telugu build correctly serves both Telugu states. Hindi comprehension limited to a handful of cities (Vizag, Vijayawada, Tirupati); negligible beyond them.',
  },
  {
    state: 'West Bengal',
    hindiDemand: 'confirmed',
    regionalLocale: 'bn',
    regionalDemand: 'confirmed',
    note: 'Large historical Hindi-speaking business community in Kolkata keeps Hindi demand real, not just Bengali.',
  },
  {
    state: 'Karnataka',
    hindiDemand: 'weak',
    regionalLocale: 'kn',
    regionalDemand: 'confirmed',
    note: "Kannada shows above-average (~74%) online-service adoption propensity per KPMG-Google, vs Hindi's ~54% national average.",
  },
  {
    state: 'Gujarat',
    hindiDemand: 'confirmed',
    regionalLocale: 'gu',
    regionalDemand: 'confirmed',
    note: 'Strong Hindi comprehension via business/cultural ties to the Hindi belt.',
  },
  {
    state: 'Kerala',
    hindiDemand: 'weak',
    regionalLocale: 'ml',
    regionalDemand: 'confirmed',
    note: "Malayalam built 2026-09-09 as the site's 8th locale — a new-language addition, not a missing translation of an existing one (see project memory). India's highest digital-literacy rate plus a live KSEB page justified the build despite Hindi demand being weak here.",
  },
  {
    state: 'Punjab',
    hindiDemand: 'confirmed',
    regionalLocale: null,
    regionalDemand: 'not-applicable',
    note: 'Evidence suggests Punjabi speakers favor English over Punjabi online — no case found for a Punjabi build.',
  },
  {
    state: 'Odisha',
    hindiDemand: 'confirmed',
    regionalLocale: null,
    regionalDemand: 'not-applicable',
    note: "Odia is dominant (~82% of the state, classical-language status) but Hindi is not negative here the way it is in Tamil Nadu. EN+HI is adequate for now; Odia is a longer-term candidate only if the site ever expands past 7 languages.",
  },
]

const TRANSLATED: Record<NonEnglishLocale, TranslatedRoutes> = {
  hi: {
    exact: new Set([
      '',
      '/about',
      '/ac',
      '/ac/bill-calculator',
      '/ac/brands',
      '/ac/circuit-safety-calculator',
      '/ac/comparison-tool',
      '/ac/comparisons/3-star-vs-5-star-savings-guide',
      '/ac/power-consumption-calculator',
      '/ac/tonnage-calculator',
      '/affiliate-disclosure',
      '/appliances',
      '/appliances/air-cooler-cost-calculator',
      '/appliances/ceiling-fan-cost-calculator',
      '/appliances/fridge-cost-calculator',
      '/appliances/household-bill-builder',
      '/appliances/induction-cooktop-cost-calculator',
      '/appliances/inverter-backup-time-calculator',
      '/appliances/inverter-sizing-calculator',
      '/appliances/phantom-load-checker',
      '/appliances/room-cooling-time-calculator',
      '/appliances/water-tank-filling-time-calculator',
      '/blog',
      '/blog/ac-running-cost-india-guide',
      '/blog/how-telescopic-electricity-slabs-work',
      '/blog/is-rooftop-solar-worth-it-in-india-2026',
      '/blog/mahavitaran-bill-kaise-check-kare',
      '/blog/new-vs-old-tax-regime-who-actually-saves',
      '/blog/smart-meters-in-india-guide',
      '/blog/fixed-charges-vs-fca-electricity-bill',
      '/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide',
      '/blog/how-water-bills-calculated-india',
      '/blog/msedcl-complete-guide-electricity-bill',
      '/blog/uppcl-complete-guide-electricity-bill',
      '/blog/bescom-complete-guide-electricity-bill',
      '/contact',
      '/cookie-policy',
      '/data-sources',
      '/disclaimer',
      '/editorial-policy',
      '/electricity',
      '/electricity/appliance-cost-calculator',
      '/electricity/ev-charging-cost-calculator',
      '/electricity/unit-price',
      '/financial',
      '/financial/gratuity-calculator',
      '/financial/gst-calculator',
      '/financial/new-vs-old-tax-regime-calculator',
      '/financial/sip-calculator',
      '/fuel-cost',
      '/fuel-cost/generator-fuel-consumption-calculator',
      '/fuel-cost/lpg-cylinder-usage-calculator',
      '/fuel-cost/petrol-diesel-cost-per-km-calculator',
      '/gas',
      '/methodology',
      '/privacy',
      '/solar',
      '/solar/battery-backup-calculator',
      '/solar/bill-calculator',
      '/solar/net-metering-calculator',
      '/solar/panel-size-calculator',
      '/solar/roi-calculator',
      '/solar/subsidy-calculator',
      '/terms',
      '/water',
      // Genuinely translated DISCOM detail pages (not chrome-only) — see
      // DiscomPageConfig.translations in calculator-pages.tsx. Add a new
      // entry here only when that DISCOM has a real `translations.hi` block.
      '/electricity/tneb-bill-calculator',
      '/electricity/msedcl-bill-calculator',
      '/electricity/telangana-electricity-bill-calculator',
      '/electricity/andhra-pradesh-electricity-bill-calculator',
      '/electricity/bescom-bill-calculator',
      '/electricity/wbsedcl-bill-calculator',
      '/electricity/gujarat-electricity-bill-calculator',
      '/electricity/kseb-bill-calculator',
    ]),
    prefixes: [
      '/ac/brands/',
      '/author/',
      '/electricity/unit-price/',
      '/gas/',
      '/solar/bill-calculator/',
    ],
  },
  // ta/mr/te below list state-specific DISCOM pages only — per
  // STATE_LANGUAGE_POLICY, regional languages cover a state's own
  // utility content, not the whole site the way hi does. Telugu is the
  // one exception that spans two states (Telangana + Andhra Pradesh),
  // so it lists both states' DISCOM paths.
  ta: {
    exact: new Set(['', '/electricity/tneb-bill-calculator']),
    prefixes: [],
  },
  te: {
    exact: new Set([
      '',
      '/electricity/telangana-electricity-bill-calculator',
      '/electricity/andhra-pradesh-electricity-bill-calculator',
    ]),
    prefixes: [],
  },
  mr: {
    exact: new Set(['', '/electricity/msedcl-bill-calculator']),
    prefixes: [],
  },
  bn: {
    exact: new Set(['', '/electricity/wbsedcl-bill-calculator']),
    prefixes: [],
  },
  kn: {
    exact: new Set(['', '/electricity/bescom-bill-calculator']),
    prefixes: [],
  },
  gu: {
    exact: new Set(['', '/electricity/gujarat-electricity-bill-calculator']),
    prefixes: [],
  },
  ml: {
    exact: new Set(['', '/electricity/kseb-bill-calculator']),
    prefixes: [],
  },
}

function hasTranslation(locale: NonEnglishLocale, path: string): boolean {
  const rules = TRANSLATED[locale]
  if (rules.exact.has(path)) return true
  return rules.prefixes.some((prefix) => path.startsWith(prefix))
}

/**
 * Builds the `alternates.languages` set for a page at the given (English)
 * path — always self-referencing ("en"), always including "x-default" as
 * the English fallback, and including a locale key only for locales that
 * actually have a genuine, indexable translation of this exact path.
 *
 * Call with the bare English path regardless of which locale's page is
 * calling it, e.g. `getAlternateLanguages('/ac/bill-calculator')` from both
 * `src/app/ac/bill-calculator/page.tsx` and
 * `src/app/hi/ac/bill-calculator/page.tsx`.
 */
export function getAlternateLanguages(path: string): Record<string, string> {
  const out: Record<string, string> = {
    en: `${SITE}${path}`,
    'x-default': `${SITE}${path}`,
  }
  for (const locale of Object.keys(TRANSLATED) as NonEnglishLocale[]) {
    if (hasTranslation(locale, path)) {
      out[locale] = `${SITE}/${locale}${path}`
    }
  }
  return out
}

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  mr: 'मराठी',
  bn: 'বাংলা',
  kn: 'ಕನ್ನಡ',
  gu: 'ગુજરાતી',
  ml: 'മലയാളം',
}

/**
 * Given the current browser pathname (e.g. from `usePathname()`), returns
 * which locale it's under and the bare English logical path — e.g.
 * "/hi/ac/bill-calculator" -> `{ locale: 'hi', path: '/ac/bill-calculator' }`,
 * "/" -> `{ locale: 'en', path: '' }`. Used by the language switcher to know
 * what page it's switching *from*.
 */
export function parseLocaleFromPathname(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  const nonEnglishLocales = Object.keys(TRANSLATED) as NonEnglishLocale[]
  if (first && (nonEnglishLocales as string[]).includes(first)) {
    const rest = segments.slice(1).join('/')
    return { locale: first as Locale, path: rest ? `/${rest}` : '' }
  }
  const rest = segments.join('/')
  return { locale: 'en', path: rest ? `/${rest}` : '' }
}

export interface LocaleSwitcherOption {
  code: Locale
  label: string
  href: string
  /** false means `href` falls back to that locale's homepage because no
   *  genuine translation of the current page exists yet — the switcher UI
   *  should visually distinguish this from a real page-to-page switch. */
  isTranslated: boolean
}

/**
 * Builds the language-switcher menu for the given (English, locale-stripped)
 * current path — one option per supported locale, linking to the real
 * translated equivalent page when one exists, or that locale's homepage
 * otherwise. Never links to a noindexed or nonexistent page, because it's
 * driven by the same `TRANSLATED` manifest as `getAlternateLanguages` and
 * the sitemap — the single source of truth for what's actually translated.
 */
export function getLocaleSwitcherOptions(path: string): LocaleSwitcherOption[] {
  const ALL: Locale[] = ['en', 'hi', 'ta', 'te', 'mr', 'bn', 'kn', 'gu', 'ml']
  return ALL.map((code) => {
    if (code === 'en') {
      return { code, label: LOCALE_LABELS.en, href: path || '/', isTranslated: true }
    }
    const translated = hasTranslation(code, path)
    return {
      code,
      label: LOCALE_LABELS[code],
      href: translated ? `/${code}${path}` : `/${code}`,
      isTranslated: translated,
    }
  })
}
