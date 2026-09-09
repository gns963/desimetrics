import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AcBrandPage from '@/components/calculators/AcBrandPage'
import { allAcBrandSlugs, getAcBrand } from '@/data/ac-brands'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export function generateStaticParams() {
  return allAcBrandSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const brand = getAcBrand(slug)
  if (!brand) return {}
  const path = `/ac/brands/${slug}`
  return {
    title: `${brand.name} AC बिल कैलकुलेटर 2026 — रनिंग कॉस्ट (भारत)`,
    description: `टनेज, स्टार रेटिंग और रोज़ के घंटों के हिसाब से अपने ${brand.name} एयर कंडीशनर का बिजली खर्च निकालें, आपके DISCOM के असली टैरिफ पर आधारित।`,
    alternates: {
      canonical: `${SITE}/hi${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/hi${path}`, type: 'website', locale: 'hi_IN' },
  }
}

export default async function AcBrandRouteHi({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = getAcBrand(slug)
  if (!brand) notFound()

  const breadcrumb = breadcrumbLd([
    { name: 'होम', path: '' },
    { name: 'AC', path: '/ac' },
    { name: 'ब्रांड', path: '/ac/brands' },
    { name: brand.name, path: `/ac/brands/${slug}` },
  ])

  return (
    <>
      <AcBrandPage brandName={brand.name} slug={slug} locale="hi" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
