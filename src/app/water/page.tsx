import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import WaterBillCalculator from '@/components/calculators/WaterBillCalculator'
import { DropletIcon } from '@/components/HubMotifIcon'
import SplitHero from '@/components/SplitHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { getTariff } from '@/lib/calc/electricity'
import { getConnectionTariff, getWaterTariff } from '@/lib/calc/water'
import { slugify } from '@/lib/format'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

const states = CALCULATOR_PAGES.map((p) => getTariff(p.discomCode).state)
  .filter((state, i, arr) => arr.indexOf(state) === i)
  .sort((a, b) => a.localeCompare(b))
  .map((state) => ({ state, slug: slugify(state) }))

// Live first-slab rates for the "1,000 litres" answer block below — pulled
// directly from each board's own real tariff file, never hand-typed, so
// this can't drift out of sync if a tariff is ever revised.
const THOUSAND_LITRE_EXAMPLES = [
  { boardCode: 'DJB', city: 'Delhi', slug: 'delhi' },
  { boardCode: 'CMWSSB', city: 'Chennai', slug: 'chennai' },
  { boardCode: 'HMWSSB', city: 'Hyderabad', slug: 'hyderabad' },
].map(({ boardCode, city, slug }) => {
  const tariff = getWaterTariff(boardCode)
  const connection = getConnectionTariff(tariff, 'domestic')
  return { boardCode, city, slug, ratePerKl: connection.slabs[0].ratePerKL }
})
const lowestRate = Math.min(...THOUSAND_LITRE_EXAMPLES.map((e) => e.ratePerKl))
const highestRate = Math.max(...THOUSAND_LITRE_EXAMPLES.map((e) => e.ratePerKl))

export const metadata: Metadata = {
  title: 'Water Bill Calculator (India) 2026 | DesiMetrics',
  description:
    'Estimate your municipal water bill from your own consumption and board\'s rate — honest calculator, no guessed tariffs, for every Indian state.',
  alternates: {
    canonical: `${SITE}/water`,
    languages: getAlternateLanguages('/water'),
  },
  openGraph: { url: `${SITE}/water`, type: 'website', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Water', path: '/water' },
])
const itemList = itemListLd(states.map((s) => ({ name: `${s.state} Water Bill Calculator`, path: `/water/${s.slug}` })))
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Water Bill Calculator',
  url: `${SITE}/water`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}

const faqs = [
  {
    q: 'How much does 1,000 litres of water cost in India?',
    a: `Typically between ₹${lowestRate.toFixed(2)} and ₹${highestRate.toFixed(2)} in the lowest tariff slab, depending on your board — for example ${THOUSAND_LITRE_EXAMPLES.map((e) => `₹${e.ratePerKl.toFixed(2)}/KL in ${e.city} (${e.boardCode})`).join(', ')}. Most boards also apply a free allowance or minimum bill that covers this amount, so it's rarely billed in isolation — use the board calculators above for an exact monthly figure.`,
  },
  {
    q: 'Why doesn\'t DesiMetrics show my exact water board\'s tariff?',
    a: 'Unlike electricity DISCOMs, India\'s municipal water tariffs aren\'t centrally published in a form we can verify and keep current — billing basis varies by city (flat rate, metered, or tied to property tax). Rather than guess, we ask for your own rate from your bill, the same honest approach we use for generator fuel and net-metering rates.',
  },
  {
    q: 'What is a KL?',
    a: 'A kilolitre (KL) = 1,000 litres, the standard billing unit for metered water supply in India.',
  },
  {
    q: 'Is this different from the water tank filling time calculator?',
    a: 'Yes — that tool estimates how long a tank takes to fill from a pump\'s flow rate. This one estimates your monthly water bill cost from consumption and your board\'s rate.',
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

export default function WaterHubPage() {
  return (
    <>
      <SplitHero
        hub="water"
        breadcrumb={[{ label: 'Water', href: '/water' }]}
        badgeLabel={`${states.length} states · Your real rate`}
        h1="Water Bill Calculator"
        subtitle="Estimate your municipal water bill from your own consumption and your board's rate. Water tariffs vary too much by city for us to guess — so this calculator uses your real numbers, honestly."
        primaryCta={{ label: 'Calculate My Water Bill', href: '#calculator', emoji: '💧' }}
        secondaryCta={{ label: 'Browse by state →', href: '#states' }}
        statChips={[
          { icon: '💧', big: 'KL', small: 'Consumption unit', tone: 'hub' },
          { icon: '✍️', big: 'Your rate', small: 'Honest input', tone: 'hub' },
          { icon: '🗺️', big: `${states.length}`, small: 'States covered', tone: 'hub' },
          { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-hub-water">
              <DropletIcon className="h-6 w-6" />
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                Why we ask for your rate
              </p>
            </div>
            <p className="mt-3 text-sm text-white/80">
              Unlike electricity DISCOMs, India&apos;s municipal water
              tariffs aren&apos;t centrally published in a form we can verify
              and keep current — billing basis varies by city (flat rate,
              metered, or tied to property tax).
            </p>
            <p className="mt-2 text-sm text-white/70">
              Rather than guess a number and call it &ldquo;verified,&rdquo;
              we ask for your own rate from your bill — the same honest
              approach we use for generator fuel and net-metering rates.
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="thousand-litres" className="mb-10 scroll-mt-20 rounded-xl border border-hairline border-l-4 border-l-hub-water bg-paper p-5">
        <h2 id="thousand-litres" className="font-display mb-2 text-xl font-bold text-ink-navy">
          How much does 1,000 litres of water cost in India?
        </h2>
        <p className="text-ash/90">
          1,000 litres (1 KL) of piped municipal water typically costs between{' '}
          <strong>₹{lowestRate.toFixed(2)} and ₹{highestRate.toFixed(2)}</strong> in the lowest
          tariff slab, depending on your city&apos;s water board —{' '}
          {THOUSAND_LITRE_EXAMPLES.map((e, i) => (
            <span key={e.boardCode}>
              {i > 0 && (i === THOUSAND_LITRE_EXAMPLES.length - 1 ? ', and ' : ', ')}
              ₹{e.ratePerKl.toFixed(2)}/KL in {e.city} ({e.boardCode})
            </span>
          ))}
          . In practice, most boards also apply a free monthly allowance or a minimum bill that
          covers this amount entirely, so an isolated 1,000-litre charge is rarely paid on its
          own — see your board&apos;s calculator below for what a full month&apos;s usage
          actually costs.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {THOUSAND_LITRE_EXAMPLES.map((e) => (
            <Link
              key={e.boardCode}
              href={`/water/${e.slug}`}
              className="rounded-full border border-hub-water/30 bg-hub-water/5 px-3 py-1 text-xs font-semibold text-hub-water hover:border-hub-water/60"
            >
              {e.city} ({e.boardCode}) calculator →
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your water bill
        </h2>
        <WaterBillCalculator />
      </section>

      <section id="states" aria-labelledby="states" className="mb-10 scroll-mt-20">
        <h2 id="states" className="font-display mb-4 text-2xl font-semibold">
          Browse by state
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {states.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/water/${s.slug}`}
                className="block rounded-xl border border-hub-water/20 bg-hub-water/5 p-4 transition hover:border-hub-water/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {s.state}
                </span>
                <span className="mt-1 block text-xs text-hub-water">
                  Open →
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

      <CrossHubLinks current="water" />

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      </main>
    </>
  )
}
