import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import { getCalculatorPage } from '@/data/calculator-pages'
import { taDiscomPageTexts } from '@/data/discom-page-texts'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

// Tamil only covers Tamil Nadu's own DISCOM (TNEB) — per
// STATE_LANGUAGE_POLICY in i18n-alternates.ts, a regional language covers
// that state's own utility content, not the full 37-DISCOM electricity
// section the way Hindi does.
const TA_SLUGS = ['tneb-bill-calculator']

export function generateStaticParams() {
  return TA_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  const tr = config?.translations?.ta
  if (!config || !tr) return {}
  const path = `/electricity/${slug}`
  return {
    title: tr.metaTitle,
    description: tr.metaDescription,
    alternates: {
      canonical: `${SITE}/ta${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/ta${path}`, type: 'website', locale: 'ta_IN' },
  }
}

export default async function ElectricityCalculatorRouteTa({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config || !config.translations?.ta) notFound()
  return <DiscomCalculatorPage config={config} texts={taDiscomPageTexts} />
}
