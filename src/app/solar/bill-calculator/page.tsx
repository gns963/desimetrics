import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { getTariff } from '@/lib/calc/electricity'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/bill-calculator'

const rows = CALCULATOR_PAGES.map((p) => {
  const tariff = getTariff(p.discomCode)
  return { slug: p.discomCode.toLowerCase(), discomCode: p.discomCode, state: tariff.state }
}).sort((a, b) => a.state.localeCompare(b.state))

export const metadata: Metadata = {
  title: 'Solar Bill Calculator by State (India) 2026 | DesiMetrics',
  description:
    'Estimate rooftop solar payback and savings for every Indian state and union territory, using each DISCOM\'s real tariff and the PM Surya Ghar subsidy.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/solar/bill-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Solar', path: '/solar' },
  { name: 'Bill Calculator', path: PATH },
])
const itemList = itemListLd(
  rows.map((r) => ({ name: `${r.state} Solar Bill Calculator`, path: `/solar/bill-calculator/${r.slug}` })),
)

const faqs = [
  {
    q: 'Why does solar payback differ by state?',
    a: 'Payback depends on how much your saved units are worth, which is set by your DISCOM\'s own tariff — states with higher electricity rates typically see faster solar payback for the same system size.',
  },
  {
    q: 'Is the PM Surya Ghar subsidy the same in every state?',
    a: 'The central subsidy formula (₹30,000/kW for the first 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000) is the same nationwide. Some states also offer additional state-level subsidies on top, which aren\'t modelled here.',
  },
  {
    q: 'My state isn\'t listed — what do I do?',
    a: 'All 36 Indian states and union territories are covered. If a specific one seems missing, use our general Solar ROI calculator and select your DISCOM directly.',
  },
]
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function SolarBillCalculatorIndexPage() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'Solar', href: '/solar' },
          { label: 'Bill Calculator', href: '/solar/bill-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="Solar Bill Calculator by State"
        subtitle="Rooftop solar payback and savings for every Indian state and union territory, priced against each DISCOM's real tariff."
        stats={[
          { icon: '🗺️', big: `${rows.length}`, small: 'States & UTs', tone: 'hub' },
          { icon: '💸', big: '₹78,000', small: 'Max subsidy', tone: 'hub' },
          { icon: '📊', big: 'Real tariff', small: 'Priced per state', tone: 'hub' },
          { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="what-this-shows" className="mb-10 scroll-mt-20">
        <h2 id="what-this-shows" className="font-display mb-4 text-2xl font-semibold">
          What each state page shows
        </h2>
        <p className="text-ash/80">
          Pick your state below for a rooftop solar payback estimate priced
          on your own DISCOM&apos;s real tariff, not a flat national rate:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['System cost and subsidy', 'an illustrative system cost before subsidy, and the net cost after the PM Surya Ghar central subsidy (up to ₹78,000) is applied.'],
            ['Payback period', 'how many years of savings it takes to recover your net cost, based on your state\'s actual per-unit tariff.'],
            ['Annual and lifetime savings', 'monthly savings and a 25-year net savings figure, over the panels\' typical working life.'],
            ['Your real tariff, not an average', 'savings are computed against your own DISCOM\'s telescopic slab structure, so solar is valued at offsetting your most expensive units first.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-ash/80">
          Each state page runs the same calculation engine as our general{' '}
          <Link href="/solar/roi-calculator" className="text-brass underline">
            solar ROI calculator
          </Link>{' '}
          — this directory just saves you picking your DISCOM from a dropdown.
          For the subsidy rules and eligibility in full, see our{' '}
          <Link href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide" className="text-brass underline">
            PM Surya Ghar subsidy guide
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="states" className="mb-10">
        <h2 id="states" className="font-display mb-4 text-2xl font-semibold">
          All states
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {rows.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/solar/bill-calculator/${r.slug}`}
                className="block rounded-xl border border-hub-solar/20 bg-hub-solar/5 p-4 transition hover:border-hub-solar/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {r.state}
                </span>
                <span className="mt-1 block text-xs text-hub-solar">
                  {r.discomCode} · Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-hairline">
          {faqs.map((f, i) => (
            <details key={i} className="group py-3">
              <summary className="cursor-pointer list-none font-medium text-ash marker:hidden">
                {f.q}
              </summary>
              <p className="mt-2 text-ash/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
    </>
  )
}
