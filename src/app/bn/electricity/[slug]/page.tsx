import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import { getCalculatorPage } from '@/data/calculator-pages'
import { bnDiscomPageTexts } from '@/data/discom-page-texts'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

const BN_SLUGS = ['wbsedcl-bill-calculator']

export function generateStaticParams() {
  return BN_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  const tr = config?.translations?.bn
  if (!config || !tr) return {}
  const path = `/electricity/${slug}`
  return {
    title: tr.metaTitle,
    description: tr.metaDescription,
    alternates: {
      canonical: `${SITE}/bn${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/bn${path}`, type: 'website', locale: 'bn_IN' },
  }
}

export default async function ElectricityCalculatorRouteBn({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config || !config.translations?.bn) notFound()
  return <DiscomCalculatorPage config={config} texts={bnDiscomPageTexts} />
}
