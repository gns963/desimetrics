import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SolarStatePage from '@/components/calculators/SolarStatePage'
import { allDiscomCodeSlugs, getCalculatorPageByDiscomSlug } from '@/data/calculator-pages'
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
  const path = `/solar/bill-calculator/${slug}`
  return {
    title: `${tariff.state} सोलर बिल कैलकुलेटर 2026 — रूफटॉप पेबैक और सब्सिडी`,
    description: `${config.discomCode} के असली टैरिफ और PM सूर्य घर सब्सिडी का इस्तेमाल करके ${tariff.state} में अपने रूफटॉप सोलर की पेबैक और बचत का अनुमान लगाएं।`,
    alternates: {
      canonical: `${SITE}/hi${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/hi${path}`, type: 'website', locale: 'hi_IN' },
  }
}

export default async function SolarStateRouteHi({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPageByDiscomSlug(slug)
  if (!config) notFound()
  const tariff = getTariff(config.discomCode)

  const breadcrumb = breadcrumbLd([
    { name: 'होम', path: '' },
    { name: 'सोलर', path: '/solar' },
    { name: 'बिल कैलकुलेटर', path: '/solar/bill-calculator' },
    { name: tariff.state, path: `/solar/bill-calculator/${slug}` },
  ])

  return (
    <>
      <SolarStatePage state={tariff.state} discomCode={config.discomCode} slug={config.slug} locale="hi" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
