import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import { getCalculatorPage } from '@/data/calculator-pages'
import { guDiscomPageTexts } from '@/data/discom-page-texts'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

const GU_SLUGS = ['gujarat-electricity-bill-calculator']

export function generateStaticParams() {
  return GU_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  const tr = config?.translations?.gu
  if (!config || !tr) return {}
  const path = `/electricity/${slug}`
  return {
    title: tr.metaTitle,
    description: tr.metaDescription,
    alternates: {
      canonical: `${SITE}/gu${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/gu${path}`, type: 'website', locale: 'gu_IN' },
  }
}

export default async function ElectricityCalculatorRouteGu({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config || !config.translations?.gu) notFound()
  return <DiscomCalculatorPage config={config} texts={guDiscomPageTexts} />
}
