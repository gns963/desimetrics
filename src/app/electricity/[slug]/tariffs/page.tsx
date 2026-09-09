import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TariffDirectoryPage from '@/components/calculators/TariffDirectoryPage'
import { allCalculatorSlugs, getCalculatorPage } from '@/data/calculator-pages'
import { getTariff } from '@/lib/calc/electricity'
import { formatIsoDate } from '@/lib/format'

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
  const tariff = getTariff(config.discomCode)
  const path = `/electricity/${slug}/tariffs`
  const categoryCount = tariff.connectionTypes.length
  return {
    title: `${tariff.state} Electricity Tariff Rates & Charges 2026 — ${tariff.discomCode}`,
    description: `Explore ${tariff.state} electricity tariff rates for ${tariff.discomCode} across ${categoryCount} consumer categories, including unit rates, slab rates, fixed charges and electricity duty. Last updated ${formatIsoDate(tariff.lastVerified)}.`,
    alternates: { canonical: `${SITE}${path}` },
    openGraph: { url: `${SITE}${path}`, type: 'website', locale: 'en_IN' },
  }
}

export default async function ElectricityTariffDirectoryRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config) notFound()
  const tariff = getTariff(config.discomCode)
  return <TariffDirectoryPage config={config} tariff={tariff} />
}
