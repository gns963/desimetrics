import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import {
  allCalculatorSlugs,
  getCalculatorPage,
} from '@/data/calculator-pages'
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
  // Most DISCOMs here have no languages alternate: their Hindi version is
  // chrome-translated only and noindexed until genuinely translated — see
  // hi/electricity/[slug]. A DISCOM with a real translations entry (see
  // DiscomPageConfig.translations) is in the i18n-alternates manifest and
  // gets a real hreflang set here via getAlternateLanguages.
  const hasTranslation = Boolean(config.translations)
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: `${SITE}${path}`,
      ...(hasTranslation ? { languages: getAlternateLanguages(path) } : {}),
    },
    openGraph: { url: `${SITE}${path}`, type: 'website', locale: 'en_IN' },
  }
}

export default async function ElectricityCalculatorRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config) notFound()
  return <DiscomCalculatorPage config={config} />
}
