import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog'

export const metadata: Metadata = {
  title: 'Blog — Explainers on Electricity, Solar & Finance | DesiMetrics',
  description:
    'Plain-English explainers on Indian electricity billing, rooftop solar and personal finance — from the team behind our calculators.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/blog'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const posts = [
  {
    title: 'How Much Does a Rooftop Solar System Actually Cost in India? (2026 Pricing Guide)',
    tag: 'Solar',
    href: '/blog/rooftop-solar-system-cost-india',
    live: true,
  },
  {
    title: 'How Much Electricity Does a Refrigerator Actually Use? (India Guide)',
    tag: 'Appliances',
    href: '/blog/refrigerator-electricity-consumption-india',
    live: true,
  },
  {
    title: 'How to Actually Reduce Your Electricity Bill in India',
    tag: 'Electricity',
    href: '/blog/how-to-reduce-electricity-bill-india',
    live: true,
  },
  {
    title: 'How Much Does Running a Geyser Actually Cost in India?',
    tag: 'Appliances',
    href: '/blog/geyser-water-heater-running-cost-india',
    live: true,
  },
  {
    title: 'Net Metering Explained: How Rooftop Solar Actually Reduces Your Bill',
    tag: 'Solar',
    href: '/blog/net-metering-explained-india',
    live: true,
  },
  {
    title: 'Piped Gas (PNG) Bill in India: How It’s Calculated, Why It Got Cheaper in 2026',
    tag: 'Gas',
    href: '/blog/png-piped-gas-bill-guide-india',
    live: true,
  },
  {
    title: 'Complete Guide to TGSPDCL/TSSPDCL (Telangana) Electricity Bill',
    tag: 'Reference',
    href: '/blog/tsspdcl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'Complete Guide to PSPCL (Punjab) Electricity Bill',
    tag: 'Reference',
    href: '/blog/pspcl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'Complete Guide to JVVNL (Rajasthan) Electricity Bill',
    tag: 'Reference',
    href: '/blog/jvvnl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'Complete Guide to KSEB Electricity Bill',
    tag: 'Reference',
    href: '/blog/kseb-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'Complete Electricity Bill Guides, by State',
    tag: 'Reference',
    href: '/blog/electricity-bill-guides',
    live: true,
  },
  {
    title: 'Complete Guide to WBSEDCL Electricity Bill',
    tag: 'Reference',
    href: '/blog/wbsedcl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'Complete Guide to BESCOM Electricity Bill',
    tag: 'Reference',
    href: '/blog/bescom-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'Complete Guide to UPPCL Electricity Bill',
    tag: 'Reference',
    href: '/blog/uppcl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'Complete Guide to MSEDCL (Mahavitaran) Electricity Bill',
    tag: 'Reference',
    href: '/blog/msedcl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'How Water Bills Are Calculated in India: A City-Wise Guide',
    tag: 'Water',
    href: '/blog/how-water-bills-calculated-india',
    live: true,
  },
  {
    title: 'PM Surya Ghar Muft Bijli Yojana: Full Subsidy Guide',
    tag: 'Solar',
    href: '/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide',
    live: true,
  },
  {
    title: 'Fixed Charges vs FCA: Why Your Electricity Bill Changes',
    tag: 'Explainer',
    href: '/blog/fixed-charges-vs-fca-electricity-bill',
    live: true,
  },
  {
    title: 'How Much Does Running an AC Actually Cost in India?',
    tag: 'AC',
    href: '/blog/ac-running-cost-india-guide',
    live: true,
  },
  {
    title: 'Mahavitaran Bill: Check & Pay Your MSEDCL Bill Online',
    tag: 'Electricity',
    href: '/blog/mahavitaran-bill-kaise-check-kare',
    live: true,
  },
  {
    title: 'Smart Meters in India: Mandatory? Recharge & Fixes',
    tag: 'Electricity',
    href: '/blog/smart-meters-in-india-guide',
    live: true,
  },
  {
    title: 'How Telescopic Electricity Slabs Actually Work',
    tag: 'Explainer',
    href: '/blog/how-telescopic-electricity-slabs-work',
    live: true,
  },
  {
    title: 'Is rooftop solar worth it in India in 2026?',
    tag: 'Solar',
    href: '/blog/is-rooftop-solar-worth-it-in-india-2026',
    live: true,
  },
  {
    title: 'New vs old tax regime: who actually saves?',
    tag: 'Finance',
    href: '/blog/new-vs-old-tax-regime-who-actually-saves',
    live: true,
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Blog', path: PATH },
])
const itemList = itemListLd(
  posts.filter((p) => p.live).map((p) => ({ name: p.title, path: p.href })),
)

export default function BlogIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href="/" className="hover:text-brass">
              Home
            </Link>{' '}
            / <span className="text-white/80">Blog</span>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From the blog
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            Plain-English explainers on Indian electricity billing, rooftop solar and
            personal finance — grounded in the same real tariffs and formulas that
            power our calculators.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="flex flex-col rounded-2xl border border-hairline bg-paper p-6 transition hover:border-brass hover:shadow-sm"
            >
              <span className="w-fit rounded-full bg-brass/10 px-2.5 py-0.5 text-xs font-semibold text-brass">
                {p.tag}
              </span>
              <h2 className="mt-3 flex-1 font-display text-lg font-bold text-ink-navy">
                {p.title}
              </h2>
              <span className="mt-4 text-sm font-semibold text-brass">
                {p.live ? 'Read →' : 'Coming soon'}
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
