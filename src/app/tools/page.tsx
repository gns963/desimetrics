import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import PageHero from '@/components/PageHero'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export const metadata: Metadata = {
  title: 'Number & Conversion Tools — Hex Calculator (DesiMetrics)',
  description:
    'Free, exact number-conversion tools: hexadecimal arithmetic and base conversion, with more conversion tools on the way.',
  alternates: {
    canonical: `${SITE}/tools`,
    languages: getAlternateLanguages('/tools'),
  },
  openGraph: { url: `${SITE}/tools`, type: 'website', locale: 'en_IN' },
}

const cards = [
  {
    href: '/tools/hex-calculator',
    emoji: '🔢',
    title: 'Hexadecimal Calculator',
    body: 'Add, subtract, multiply or divide two hex numbers, exactly, for any size.',
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Tools', path: '/tools' },
])
const itemList = itemListLd(cards.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'Are these tools India-specific?',
    a: "No — unlike our utility bill and finance calculators, which are priced from real Indian DISCOM tariffs and tax rules, these are general-purpose number tools: the arithmetic is the same everywhere in the world.",
  },
  {
    q: 'Do you store the numbers I enter?',
    a: 'No — every calculation runs in your browser. Nothing you type here is sent to or stored on our servers.',
  },
  {
    q: 'Will more conversion tools be added?',
    a: "Yes — this hub starts with the hexadecimal calculator and is meant to grow into other exact number and base conversions over time.",
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

export default function ToolsHubPage() {
  return (
    <>
      <PageHero
        hub="tools"
        breadcrumb={[{ label: 'Tools', href: '/tools' }]}
        badgeLabel={
          <>
            <span aria-hidden>🔢</span> Tools hub
          </>
        }
        h1="Number & Conversion Tools"
        subtitle="Exact number-base arithmetic and conversion — no rounding, no approximation, worked the same way anywhere in the world."
        stats={[
          { icon: '🔢', big: '1', small: 'Calculator', tone: 'hub' },
          { icon: '🎯', big: 'Exact', small: 'BigInt precision', tone: 'hub' },
          { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
          { icon: '🌍', big: 'Universal', small: 'Not India-specific', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section className="mb-10 grid gap-6 grid-cols-1 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col rounded-2xl border border-hub-tools/20 bg-hub-tools/5 p-6 transition hover:border-hub-tools/50 hover:shadow-sm"
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className="mt-3 text-sm font-semibold text-hub-tools">
              Open calculator →
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="why" className="mb-10">
        <h2 id="why" className="font-display mb-4 text-2xl font-semibold">
          Why this hub is different from the rest of DesiMetrics
        </h2>
        <p className="text-ash/80">
          Every other calculator on this site is priced from a real, dated,
          source-cited Indian tariff or tax rule — the whole reason the site
          exists is to replace averaged national figures with your own
          state&apos;s or DISCOM&apos;s real numbers. Number-base arithmetic
          has no such local variation: a hexadecimal addition comes out the
          same in Mumbai as it does anywhere else. These tools are included
          for that reason — genuinely useful, exact calculations that simply
          don&apos;t need a tariff file behind them.
        </p>
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

      <CrossHubLinks current="tools" />

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
