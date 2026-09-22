import type { MetadataRoute } from 'next'
import { allAuthorSlugs, getAuthor } from '@/data/authors'
import {
  allCalculatorSlugs,
  allDiscomCodeSlugs,
  CALCULATOR_PAGES,
  getCalculatorPage,
} from '@/data/calculator-pages'
import { allAcBrandSlugs } from '@/data/ac-brands'
import { allGasCompanySlugs } from '@/data/gas-companies'
import waterBoardsJson from '@/data/water-boards.json'
import { getTariff } from '@/lib/calc/electricity'
import { slugify } from '@/lib/format'

const SITE = 'https://desimetrics.com'
const LAST_UPDATED = '2026-09-08'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(LAST_UPDATED)

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: `${SITE}${path}`, lastModified: now, changeFrequency, priority })

  const core = [
    entry('/', 1.0, 'weekly'),
    entry('/hi', 0.9, 'weekly'),
    entry('/ta', 0.9, 'weekly'),
    entry('/te', 0.9, 'weekly'),
    entry('/mr', 0.9, 'weekly'),
    entry('/bn', 0.9, 'weekly'),
    entry('/kn', 0.9, 'weekly'),
    entry('/gu', 0.9, 'weekly'),
    entry('/ml', 0.9, 'weekly'),
    entry('/electricity', 0.8),
    entry('/electricity/tariffs', 0.8),
    entry('/electricity/ev-charging-cost-calculator', 0.9),
    entry('/electricity/appliance-cost-calculator', 0.9),
    entry('/solar', 0.8),
    entry('/solar/roi-calculator', 0.9),
    entry('/solar/subsidy-calculator', 0.9),
    entry('/solar/panel-size-calculator', 0.9),
    entry('/solar/battery-backup-calculator', 0.9),
    entry('/solar/net-metering-calculator', 0.9),
    entry('/ac', 0.8),
    entry('/ac/bill-calculator', 0.9),
    entry('/ac/tonnage-calculator', 0.9),
    entry('/ac/comparisons/3-star-vs-5-star-savings-guide', 0.9),
    entry('/ac/comparison-tool', 0.9),
    entry('/ac/power-consumption-calculator', 0.9),
    entry('/ac/circuit-safety-calculator', 0.9),
    entry('/ac/brands', 0.8),
    entry('/electricity/unit-price', 0.8),
    entry('/solar/bill-calculator', 0.8),
    entry('/water', 0.8),
    entry('/gas', 0.8),
    entry('/financial', 0.8),
    entry('/financial/gst-calculator', 0.9),
    entry('/financial/sip-calculator', 0.9),
    entry('/financial/new-vs-old-tax-regime-calculator', 0.9),
    entry('/financial/gratuity-calculator', 0.9),
    entry('/financial/home-loan-emi-calculator', 0.9),
    entry('/financial/personal-loan-emi-calculator', 0.9),
    entry('/financial/ppf-calculator', 0.9),
    entry('/financial/fd-calculator', 0.9),
    entry('/financial/hra-calculator', 0.9),
    entry('/financial/capital-gains-tax-calculator', 0.9),
    entry('/financial/nps-calculator', 0.9),
    entry('/financial/human-life-value-calculator', 0.9),
    entry('/appliances', 0.8),
    entry('/appliances/household-bill-builder', 0.9),
    entry('/appliances/ceiling-fan-cost-calculator', 0.9),
    entry('/appliances/fridge-cost-calculator', 0.9),
    entry('/appliances/air-cooler-cost-calculator', 0.9),
    entry('/appliances/induction-cooktop-cost-calculator', 0.9),
    entry('/appliances/phantom-load-checker', 0.9),
    entry('/appliances/inverter-sizing-calculator', 0.9),
    entry('/appliances/inverter-backup-time-calculator', 0.9),
    entry('/appliances/room-cooling-time-calculator', 0.9),
    entry('/appliances/water-tank-filling-time-calculator', 0.9),
    entry('/blog', 0.7),
    entry('/blog/how-telescopic-electricity-slabs-work', 0.6),
    entry('/blog/is-rooftop-solar-worth-it-in-india-2026', 0.6),
    entry('/blog/new-vs-old-tax-regime-who-actually-saves', 0.6),
    entry('/blog/smart-meters-in-india-guide', 0.6),
    entry('/blog/mahavitaran-bill-kaise-check-kare', 0.6),
    entry('/blog/ac-running-cost-india-guide', 0.6),
    entry('/fuel-cost', 0.8),
    entry('/fuel-cost/petrol-diesel-cost-per-km-calculator', 0.9),
    entry('/fuel-cost/lpg-cylinder-usage-calculator', 0.9),
    entry('/fuel-cost/generator-fuel-consumption-calculator', 0.9),
  ]

  // Hindi pages that are genuinely, fully translated (not chrome-only) —
  // see src/lib/i18n-alternates.ts, the single source of truth this list is
  // kept in sync with. Priorities mirror their English counterpart minus 0.1.
  const coreHi = [
    entry('/hi/electricity', 0.7),
    entry('/hi/electricity/ev-charging-cost-calculator', 0.8),
    entry('/hi/electricity/appliance-cost-calculator', 0.8),
    entry('/hi/electricity/unit-price', 0.7),
    entry('/hi/solar', 0.7),
    entry('/hi/solar/roi-calculator', 0.8),
    entry('/hi/solar/subsidy-calculator', 0.8),
    entry('/hi/solar/panel-size-calculator', 0.8),
    entry('/hi/solar/battery-backup-calculator', 0.8),
    entry('/hi/solar/net-metering-calculator', 0.8),
    entry('/hi/solar/bill-calculator', 0.7),
    entry('/hi/ac', 0.7),
    entry('/hi/ac/bill-calculator', 0.8),
    entry('/hi/ac/tonnage-calculator', 0.8),
    entry('/hi/ac/comparisons/3-star-vs-5-star-savings-guide', 0.8),
    entry('/hi/ac/comparison-tool', 0.8),
    entry('/hi/ac/power-consumption-calculator', 0.8),
    entry('/hi/ac/circuit-safety-calculator', 0.8),
    entry('/hi/ac/brands', 0.7),
    entry('/hi/water', 0.7),
    entry('/hi/gas', 0.7),
    entry('/hi/financial', 0.7),
    entry('/hi/financial/gst-calculator', 0.8),
    entry('/hi/financial/sip-calculator', 0.8),
    entry('/hi/financial/new-vs-old-tax-regime-calculator', 0.8),
    entry('/hi/financial/gratuity-calculator', 0.8),
    entry('/hi/appliances', 0.7),
    entry('/hi/appliances/household-bill-builder', 0.8),
    entry('/hi/appliances/ceiling-fan-cost-calculator', 0.8),
    entry('/hi/appliances/fridge-cost-calculator', 0.8),
    entry('/hi/appliances/air-cooler-cost-calculator', 0.8),
    entry('/hi/appliances/induction-cooktop-cost-calculator', 0.8),
    entry('/hi/appliances/phantom-load-checker', 0.8),
    entry('/hi/appliances/inverter-sizing-calculator', 0.8),
    entry('/hi/appliances/inverter-backup-time-calculator', 0.8),
    entry('/hi/appliances/room-cooling-time-calculator', 0.8),
    entry('/hi/appliances/water-tank-filling-time-calculator', 0.8),
    entry('/hi/blog', 0.6),
    entry('/hi/blog/how-telescopic-electricity-slabs-work', 0.5),
    entry('/hi/blog/is-rooftop-solar-worth-it-in-india-2026', 0.5),
    entry('/hi/blog/new-vs-old-tax-regime-who-actually-saves', 0.5),
    entry('/hi/blog/smart-meters-in-india-guide', 0.5),
    entry('/hi/blog/mahavitaran-bill-kaise-check-kare', 0.5),
    entry('/hi/blog/ac-running-cost-india-guide', 0.5),
    entry('/hi/fuel-cost', 0.7),
    entry('/hi/fuel-cost/petrol-diesel-cost-per-km-calculator', 0.8),
    entry('/hi/fuel-cost/lpg-cylinder-usage-calculator', 0.8),
    entry('/hi/fuel-cost/generator-fuel-consumption-calculator', 0.8),
  ]

  const electricity = allCalculatorSlugs.map((slug) =>
    entry(`/electricity/${slug}`, 0.9),
  )
  const electricityTariffDirectory = allCalculatorSlugs.map((slug) =>
    entry(`/electricity/${slug}/tariffs`, 0.7),
  )
  // Most Hindi DISCOM-detail pages are chrome-translated only and stay
  // noindexed (see SEO audit 2026-09-07) — only genuinely translated ones
  // (config.translations.hi) get a sitemap entry. Same idea for mr/ta,
  // scoped to that state's own DISCOM only — see STATE_LANGUAGE_POLICY.
  const electricityHi = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.hi)
    .map((slug) => entry(`/hi/electricity/${slug}`, 0.8))
  const electricityMr = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.mr)
    .map((slug) => entry(`/mr/electricity/${slug}`, 0.8))
  const electricityTa = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.ta)
    .map((slug) => entry(`/ta/electricity/${slug}`, 0.8))
  const electricityTe = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.te)
    .map((slug) => entry(`/te/electricity/${slug}`, 0.8))
  const electricityKn = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.kn)
    .map((slug) => entry(`/kn/electricity/${slug}`, 0.8))
  const electricityBn = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.bn)
    .map((slug) => entry(`/bn/electricity/${slug}`, 0.8))
  const electricityGu = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.gu)
    .map((slug) => entry(`/gu/electricity/${slug}`, 0.8))
  const electricityMl = allCalculatorSlugs
    .filter((slug) => getCalculatorPage(slug)?.translations?.ml)
    .map((slug) => entry(`/ml/electricity/${slug}`, 0.8))

  const unitPrice = allDiscomCodeSlugs.map((slug) =>
    entry(`/electricity/unit-price/${slug}`, 0.7),
  )
  const unitPriceHi = allDiscomCodeSlugs.map((slug) =>
    entry(`/hi/electricity/unit-price/${slug}`, 0.6),
  )

  const solarStates = allDiscomCodeSlugs.map((slug) =>
    entry(`/solar/bill-calculator/${slug}`, 0.7),
  )
  const solarStatesHi = allDiscomCodeSlugs.map((slug) =>
    entry(`/hi/solar/bill-calculator/${slug}`, 0.6),
  )

  const acBrands = allAcBrandSlugs.map((slug) => entry(`/ac/brands/${slug}`, 0.7))
  const acBrandsHi = allAcBrandSlugs.map((slug) => entry(`/hi/ac/brands/${slug}`, 0.6))

  const waterStateSlugs = Array.from(
    new Set(CALCULATOR_PAGES.map((p) => getTariff(p.discomCode).state)),
  ).map((state) => slugify(state))
  // Real-tariff water board pages are CITY-granularity (e.g. "chennai",
  // "pimpri-chinchwad") and often have a different slug from their own
  // state (e.g. Chennai's board isn't at "tamil-nadu") — Delhi is only
  // covered by the state loop by coincidence, so board slugs must be
  // added explicitly rather than assumed to already be included.
  const liveBoardSlugs = waterBoardsJson.boards
    .filter((b) => b.hasTariffFile)
    .map((b) => b.slug)
  const allWaterSlugs = Array.from(new Set([...waterStateSlugs, ...liveBoardSlugs]))
  const waterStates = allWaterSlugs.map((slug) => entry(`/water/${slug}`, 0.7))
  // No Hindi water board/state entries: /hi/water/[slug] is chrome-translated
  // only and noindexed until genuinely translated — see SEO audit 2026-09-07.

  const gasCompanies = allGasCompanySlugs.map((slug) => entry(`/gas/${slug}`, 0.7))
  const gasCompaniesHi = allGasCompanySlugs.map((slug) => entry(`/hi/gas/${slug}`, 0.6))

  const authors = allAuthorSlugs.map((slug) => entry(`/author/${slug}`, 0.4))
  // Only authors with a genuine Hindi translation (see Author.hi in
  // src/data/authors.ts) get a /hi/author entry.
  const authorsHi = allAuthorSlugs
    .filter((slug) => getAuthor(slug)?.hi)
    .map((slug) => entry(`/hi/author/${slug}`, 0.3))

  const legalPaths = [
    '/about',
    '/methodology',
    '/data-sources',
    '/editorial-policy',
    '/contact',
    '/privacy',
    '/cookie-policy',
    '/terms',
    '/disclaimer',
    '/affiliate-disclosure',
  ]
  const legal = legalPaths.map((path) => entry(path, 0.3, 'yearly'))
  const legalHi = legalPaths.map((path) => entry(`/hi${path}`, 0.2, 'yearly'))

  return [
    ...core,
    ...coreHi,
    ...electricity,
    ...electricityTariffDirectory,
    ...electricityHi,
    ...electricityMr,
    ...electricityTa,
    ...electricityTe,
    ...electricityKn,
    ...electricityBn,
    ...electricityGu,
    ...electricityMl,
    ...unitPrice,
    ...unitPriceHi,
    ...solarStates,
    ...solarStatesHi,
    ...acBrands,
    ...acBrandsHi,
    ...waterStates,
    ...gasCompanies,
    ...gasCompaniesHi,
    ...authors,
    ...authorsHi,
    ...legal,
    ...legalHi,
  ]
}
