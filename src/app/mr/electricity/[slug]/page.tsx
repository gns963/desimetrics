import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import { getCalculatorPage } from '@/data/calculator-pages'
import { mrDiscomPageTexts } from '@/data/discom-page-texts'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

// Marathi only covers Maharashtra's own DISCOM (MSEDCL) — per
// STATE_LANGUAGE_POLICY in i18n-alternates.ts, a regional language covers
// that state's own utility content, not the full 37-DISCOM electricity
// section the way Hindi does.
const MR_SLUGS = ['msedcl-bill-calculator']

export function generateStaticParams() {
  return MR_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  const tr = config?.translations?.mr
  if (!config || !tr) return {}
  const path = `/electricity/${slug}`
  return {
    title: tr.metaTitle,
    description: tr.metaDescription,
    alternates: {
      canonical: `${SITE}/mr${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/mr${path}`, type: 'website', locale: 'mr_IN' },
  }
}

export default async function ElectricityCalculatorRouteMr({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config || !config.translations?.mr) notFound()
  return <DiscomCalculatorPage config={config} texts={mrDiscomPageTexts} />
}
