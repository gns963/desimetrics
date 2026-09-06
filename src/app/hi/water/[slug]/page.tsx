import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WaterBoardPage from '@/components/calculators/WaterBoardPage'
import WaterStatePage from '@/components/calculators/WaterStatePage'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { getWaterBoardBySlug } from '@/data/water-boards'
import waterBoardsJson from '@/data/water-boards.json'
import { hiWaterBoardPageTexts } from '@/data/water-board-page-texts'
import { hiWaterStatePageTexts } from '@/data/water-state-page-texts'
import { getTariff } from '@/lib/calc/electricity'
import { slugify } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'

const states = CALCULATOR_PAGES.map((p) => getTariff(p.discomCode).state)
  .filter((state, i, arr) => arr.indexOf(state) === i)
  .map((state) => ({ state, slug: slugify(state) }))

const liveBoardSlugs = waterBoardsJson.boards
  .filter((b) => b.hasTariffFile)
  .map((b) => b.slug)

function getState(slug: string) {
  return states.find((s) => s.slug === slug)
}

export function generateStaticParams() {
  const slugs = new Set([...states.map((s) => s.slug), ...liveBoardSlugs])
  return [...slugs].map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const path = `/water/${slug}`
  const board = getWaterBoardBySlug(slug)
  if (board?.hasTariffFile) {
    return {
      // Metadata title/description are per-board authored English copy not
      // yet translated (tracked separately) — reuse for now rather than
      // leaving metadata empty.
      title: `${board.name} Water Bill Calculator 2026 — Real Tariff | DesiMetrics`,
      description: `Estimate your ${board.name} water bill using their real, dated domestic tariff — not a guessed rate.`,
      alternates: {
        canonical: `${SITE}/hi${path}`,
        languages: { 'en-IN': `${SITE}${path}`, 'hi-IN': `${SITE}/hi${path}` },
      },
      openGraph: { url: `${SITE}/hi${path}`, type: 'website' },
    }
  }
  const entry = getState(slug)
  if (!entry) return {}
  return {
    title: `${entry.state} Water Bill Calculator 2026 | DesiMetrics`,
    description: `Estimate your water bill in ${entry.state} from your own consumption and board's rate.`,
    alternates: {
      canonical: `${SITE}/hi${path}`,
      languages: { 'en-IN': `${SITE}${path}`, 'hi-IN': `${SITE}/hi${path}` },
    },
    openGraph: { url: `${SITE}/hi${path}`, type: 'website' },
  }
}

export default async function WaterStateRouteHi({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const board = getWaterBoardBySlug(slug)
  if (board?.hasTariffFile) {
    return <WaterBoardPage boardCode={board.code} slug={slug} texts={hiWaterBoardPageTexts} />
  }

  const entry = getState(slug)
  if (!entry) notFound()

  const breadcrumb = breadcrumbLd([
    { name: 'Home', path: '' },
    { name: 'Water', path: '/water' },
    { name: entry.state, path: `/water/${slug}` },
  ])

  return (
    <>
      <WaterStatePage state={entry.state} texts={hiWaterStatePageTexts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
