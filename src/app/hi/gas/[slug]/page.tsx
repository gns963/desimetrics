import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GasCgdPage from '@/components/calculators/GasCgdPage'
import GasCompanyPage from '@/components/calculators/GasCompanyPage'
import { allGasCompanySlugs, getGasCompany } from '@/data/gas-companies'
import { getGasCgdBySlug } from '@/data/gas-cgds'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export function generateStaticParams() {
  return allGasCompanySlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = getGasCompany(slug)
  if (!company) return {}
  const path = `/gas/${slug}`
  const cgd = getGasCgdBySlug(slug)
  if (cgd?.hasTariffFile) {
    return {
      title: `${company.name} PNG बिल कैलकुलेटर 2026 — असली टैरिफ | DesiMetrics`,
      description: `${company.name} के असली, तारीख वाले घरेलू टैरिफ का इस्तेमाल करके अपना पाइप्ड नेचुरल गैस (PNG) बिल निकालें — अंदाज़ी दर नहीं।`,
      alternates: {
        canonical: `${SITE}/hi${path}`,
        languages: getAlternateLanguages(path),
      },
      openGraph: { url: `${SITE}/hi${path}`, type: 'website', locale: 'hi_IN' },
    }
  }
  const titleSuffix = /\bgas\b/i.test(company.name) ? 'बिल कैलकुलेटर' : 'गैस बिल कैलकुलेटर'
  return {
    title: `${company.name} ${titleSuffix} 2026 | DesiMetrics`,
    description: `अपने इस्तेमाल और दर से अपना ${company.name} पाइप्ड नेचुरल गैस (PNG) बिल निकालें।`,
    alternates: {
      canonical: `${SITE}/hi${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/hi${path}`, type: 'website', locale: 'hi_IN' },
  }
}

export default async function GasCompanyRouteHi({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = getGasCompany(slug)
  if (!company) notFound()

  const cgd = getGasCgdBySlug(slug)
  if (cgd?.hasTariffFile) {
    // Real-tariff page renders its own breadcrumb/schema internally.
    return <GasCgdPage cgdCode={cgd.code} slug={slug} locale="hi" />
  }

  const breadcrumb = breadcrumbLd([
    { name: 'होम', path: '' },
    { name: 'गैस', path: '/gas' },
    { name: company.name, path: `/gas/${slug}` },
  ])

  return (
    <>
      <GasCompanyPage companyName={company.name} slug={slug} locale="hi" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
