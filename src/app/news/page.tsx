import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news'

export const metadata: Metadata = {
  title: 'News — Timely Explainers on Indian Utility Bills | DesiMetrics',
  description:
    'What current electricity, water, gas and solar developments in India actually mean for your bill — dated, sourced, and tied back to our calculators.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

interface NewsPost {
  title: string
  tag: string
  href: string
  date: string
  live: boolean
}

const posts: NewsPost[] = [
  {
    title: "Kerala's Power Shortage: What It Means for Your KSEB Bill",
    tag: 'Kerala · KSEB',
    href: '/news/kerala-power-shortage-september-2026',
    date: '29 September 2026',
    live: true,
  },
  {
    title: 'Power Surge Damaged Your Appliances? What Tamil Nadu Consumers Can Do',
    tag: 'Tamil Nadu · TNPDCL',
    href: '/news/power-surge-damaged-appliances-tamil-nadu',
    date: '29 September 2026',
    live: true,
  },
  {
    title: 'Why Delayed Solar and Wind Projects End Up in Court — and What It Means for Gujarat Power Bills',
    tag: 'Gujarat · GERC · GUVNL',
    href: '/news/gerc-liquidated-damages-wind-solar-gujarat',
    date: '30 September 2026',
    live: true,
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'News', path: PATH },
])
const itemList = itemListLd(
  posts.filter((p) => p.live).map((p) => ({ name: p.title, path: p.href })),
)

export default function NewsIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href="/" className="hover:text-brass">
              Home
            </Link>{' '}
            / <span className="text-white/80">News</span>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            News
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            When something changes in Indian electricity, water, gas or solar policy — a
            shortage, a new tariff order, a subsidy update — we explain what actually happened
            and what it changes on your bill, dated and sourced.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="flex flex-col rounded-2xl border border-hairline bg-paper p-6 transition hover:border-hub-news hover:shadow-sm"
            >
              <span className="w-fit rounded-full bg-hub-news/10 px-2.5 py-0.5 text-xs font-semibold text-hub-news">
                {p.tag}
              </span>
              <h2 className="mt-3 flex-1 font-display text-lg font-bold text-ink-navy">
                {p.title}
              </h2>
              <span className="mt-4 flex items-center justify-between text-sm">
                <span className="text-ash/50">{p.date}</span>
                <span className="font-semibold text-hub-news">
                  {p.live ? 'Read →' : 'Coming soon'}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      </main>
    </>
  )
}
