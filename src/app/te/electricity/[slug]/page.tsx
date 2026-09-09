import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscomCalculatorPage from '@/components/calculators/DiscomCalculatorPage'
import { getCalculatorPage } from '@/data/calculator-pages'
import { teDiscomPageTexts } from '@/data/discom-page-texts'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

// Telugu covers BOTH Telugu states' own DISCOMs — TSSPDCL (Telangana) and
// APSPDCL (Andhra Pradesh) — per STATE_LANGUAGE_POLICY in
// i18n-alternates.ts: Telugu is the shared regional language for both
// states, so one build serves both, unlike Marathi/Tamil which each cover
// a single state's DISCOM.
const TE_SLUGS = [
  'telangana-electricity-bill-calculator',
  'andhra-pradesh-electricity-bill-calculator',
]

export function generateStaticParams() {
  return TE_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  const tr = config?.translations?.te
  if (!config || !tr) return {}
  const path = `/electricity/${slug}`
  return {
    title: tr.metaTitle,
    description: tr.metaDescription,
    alternates: {
      canonical: `${SITE}/te${path}`,
      languages: getAlternateLanguages(path),
    },
    openGraph: { url: `${SITE}/te${path}`, type: 'website', locale: 'te_IN' },
  }
}

export default async function ElectricityCalculatorRouteTe({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getCalculatorPage(slug)
  if (!config || !config.translations?.te) notFound()
  return <DiscomCalculatorPage config={config} texts={teDiscomPageTexts} />
}
