import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import UnitPricePage from '@/components/calculators/UnitPricePage'
import { allDiscomCodeSlugs, getCalculatorPageByDiscomSlug } from '@/data/calculator-pages'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { getTariff } from '@/lib/calc/electricity'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export function generateStaticParams() {
  return allDiscomCodeSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPageByDiscomSlug(slug)
  if (!config) return {}
  const tariff = getTariff(config.discomCode)
  const rate = marginalRatePerUnit(config.discomCode)
  const path = `/electricity/unit-price/${slug}`
  return {
    title: `${tariff.state} 1 यूनिट बिजली की कीमत 2026 — ₹${rate.toFixed(2)}/यूनिट`,
    description: `${tariff.discomCode} के असली टैरिफ के तहत ${tariff.state} में 1 यूनिट बिजली की कीमत क्या है — पूरी स्लैब-वार दरें, FCA और शुल्क।`,
    alternates: {
      canonical: `${SITE}/hi${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/hi${path}`, type: 'website', locale: 'hi_IN' },
  }
}

export default async function UnitPriceRouteHi({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPageByDiscomSlug(slug)
  if (!config) notFound()

  const breadcrumb = breadcrumbLd([
    { name: 'होम', path: '' },
    { name: 'बिजली', path: '/electricity' },
    { name: '1 यूनिट की कीमत', path: '/electricity/unit-price' },
    { name: config.breadcrumbLabel, path: `/electricity/unit-price/${slug}` },
  ])

  return (
    <>
      <UnitPricePage config={config} locale="hi" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
