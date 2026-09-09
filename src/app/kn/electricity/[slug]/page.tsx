import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import { getCalculatorPage } from '@/data/calculator-pages'
import { knDiscomPageTexts } from '@/data/discom-page-texts'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

const KN_SLUGS = ['bescom-bill-calculator']

export function generateStaticParams() {
  return KN_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  const tr = config?.translations?.kn
  if (!config || !tr) return {}
  const path = `/electricity/${slug}`
  return {
    title: tr.metaTitle,
    description: tr.metaDescription,
    alternates: {
      canonical: `${SITE}/kn${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/kn${path}`, type: 'website', locale: 'kn_IN' },
  }
}

export default async function ElectricityCalculatorRouteKn({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config || !config.translations?.kn) notFound()
  return <DiscomCalculatorPage config={config} texts={knDiscomPageTexts} />
}
