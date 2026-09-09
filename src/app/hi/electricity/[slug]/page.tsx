import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import {
  allCalculatorSlugs,
  getCalculatorPage,
} from '@/data/calculator-pages'
import { hiDiscomPageTexts } from '@/data/discom-page-texts'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export function generateStaticParams() {
  return allCalculatorSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config) return {}
  const path = `/electricity/${slug}`
  // Most DISCOMs here are still chrome-translated only (English
  // h1/metadata/JSON-LD) and stay noindexed — see SEO audit 2026-09-07.
  // A DISCOM with a genuine translations.hi entry (see
  // DiscomPageConfig.translations in calculator-pages.tsx) is real,
  // reviewed content and gets indexed + a proper hreflang set.
  const translated = Boolean(config.translations?.hi)
  return {
    title: translated ? config.translations!.hi!.metaTitle : config.metaTitle,
    description: translated
      ? config.translations!.hi!.metaDescription
      : config.metaDescription,
    alternates: {
      canonical: `${SITE}/hi${path}`,
      ...(translated ? { languages: getAlternateLanguages(path) } : {}),
    },
    openGraph: { url: `${SITE}/hi${path}`, type: 'website', locale: 'hi_IN' },
    robots: translated ? undefined : { index: false, follow: true },
  }
}

export default async function ElectricityCalculatorRouteHi({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config) notFound()
  return <DiscomCalculatorPage config={config} texts={hiDiscomPageTexts} />
}
