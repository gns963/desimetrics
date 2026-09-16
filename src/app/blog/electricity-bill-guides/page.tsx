import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import discomsJson from '@/data/discoms.json'
import { getTariff } from '@/lib/calc/electricity'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/electricity-bill-guides'

/**
 * Maps a DISCOM code to its "Complete Guide" blog post, where one exists.
 * A DISCOM absent from this map simply has no guide yet — the directory
 * below falls back to linking its calculator page instead of a guide.
 */
const GUIDES: Record<string, string> = {
  MSEDCL: '/blog/msedcl-complete-guide-electricity-bill',
  UPPCL: '/blog/uppcl-complete-guide-electricity-bill',
  BESCOM: '/blog/bescom-complete-guide-electricity-bill',
  WBSEDCL: '/blog/wbsedcl-complete-guide-electricity-bill',
  KSEB: '/blog/kseb-complete-guide-electricity-bill',
}

const directory = CALCULATOR_PAGES.map((p) => {
  const tariff = getTariff(p.discomCode)
  return {
    slug: p.slug,
    discomCode: p.discomCode,
    state: tariff.state,
    guideHref: GUIDES[p.discomCode] ?? null,
  }
}).sort((a, b) => a.state.localeCompare(b.state))

const liveGuides = directory.filter((d) => d.guideHref)
const totalStatesUts = discomsJson.states.length

export const metadata: Metadata = {
  title: 'Complete Electricity Bill Guides by State & DISCOM (India) | DesiMetrics',
  description:
    "Our in-depth Complete Guide to each DISCOM's electricity bill — every verified tariff slab, fixed charge and duty rate on one page, plus a worked example and how to pay. More states added regularly.",
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Blog', path: '/blog' },
  { name: 'Electricity Bill Guides', path: PATH },
])
const itemList = itemListLd(
  liveGuides.map((d) => ({ name: `Complete Guide to ${d.discomCode} Electricity Bill`, path: d.guideHref! })),
)

const faqs = [
  {
    q: 'What\'s the difference between a Complete Guide and a bill calculator page?',
    a: 'The calculator gives you an itemised rupee estimate for your own units. A Complete Guide is the narrative reference behind it — every tariff table, fixed charge, duty rate and a worked example explained in one page, plus how to check and pay your bill. Each guide links to its DISCOM\'s calculator, and each calculator links back to its guide where one exists.',
  },
  {
    q: 'How do you decide which DISCOM gets a guide next?',
    a: 'By traffic potential and data completeness — states with a larger consumer base and tariff data we can fully verify against a primary SERC/DISCOM source come first. A DISCOM whose own tariff data is flagged unverified is deliberately skipped until it\'s been cross-checked, even if it would otherwise be a high-traffic pick.',
  },
  {
    q: 'Are the guides kept up to date when tariffs change?',
    a: 'The calculator behind each guide is updated as soon as a tariff revision is verified. Each guide states its own "tariff data refreshed" date separately from its prose "last reviewed" date, so you can see at a glance whether the numbers reflect the latest order.',
  },
  {
    q: "My state isn't listed with a guide yet — what should I do?",
    a: 'Use that DISCOM\'s bill calculator in the meantime — every state and union territory has one, guide or not. You can also request your DISCOM be prioritised next via our contact page.',
  },
  {
    q: "Why do some guides mention a charge as 'not modelled'?",
    a: 'Some DISCOMs levy charges — a fuel cost adjustment, a wheeling charge, an industrial duty rate — that we could not verify against a reliable primary source at the time of writing. Rather than guess, the guide states this plainly and excludes it from the worked example, so the figures shown are never a silent underestimate dressed up as complete.',
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

export default function ElectricityBillGuidesIndexPage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Electricity Bill Guides', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📚</span> Reference guides
          </>
        }
        h1="Complete Electricity Bill Guides, by State"
        subtitle="Our deep-dive reference for each DISCOM — every verified tariff slab, fixed charge and duty rate in one page, a hand-checked worked example, and how to pay. Not every state has one yet; use the calculator for any DISCOM in the meantime."
        stats={[
          { icon: '📖', big: `${liveGuides.length}/${totalStatesUts}`, small: 'Guides published', tone: 'hub' },
          { icon: '✓', big: 'SERC-sourced', small: 'Every figure cited', tone: 'seal-red' },
          { icon: '🧮', big: 'Worked examples', small: 'Hand-verified', tone: 'hub' },
          { icon: '🗺️', big: `${totalStatesUts}`, small: 'States covered by calculator', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section aria-labelledby="what-this-covers" className="mb-10 scroll-mt-20">
          <h2 id="what-this-covers" className="font-display mb-4 text-2xl font-semibold">
            What a Complete Guide covers
          </h2>
          <p className="text-ash/80">
            Each guide is a single reference page for one DISCOM, built entirely
            from the same verified tariff data behind our calculators:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Tariff tables by category', 'domestic, commercial, industrial and agriculture rates, where the DISCOM publishes them.'],
              ['Fixed and demand charges', 'the flat or per-kW charges billed alongside your energy consumption.'],
              ['Duty and fuel-cost adjustment', 'flagged plainly as "not modelled" wherever we could not verify a rate, rather than guessed.'],
              ['A worked example', 'a real unit count run through the same formula as the calculator, hand-checked line by line.'],
              ['How to pay', 'the official payment portal and the exact steps to check and pay your bill.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-electricity" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-ash/80">
            Think of the guide as the explainer and the{' '}
            <Link href="/electricity" className="text-brass underline">
              calculator
            </Link>{' '}
            as the tool — each guide links to its DISCOM&apos;s calculator for a
            live, itemised estimate, and vice versa.
          </p>
        </section>

        <section aria-labelledby="guides" className="mb-10">
          <h2 id="guides" className="font-display mb-4 text-2xl font-semibold">
            All states
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {directory.map((d) => (
              <li key={d.slug}>
                {d.guideHref ? (
                  <Link
                    href={d.guideHref}
                    className="block rounded-xl border border-brass/30 bg-brass/5 p-4 transition hover:border-brass/60 hover:shadow-sm"
                  >
                    <span className="font-semibold text-ink-navy">
                      {d.state}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-brass">
                      {d.discomCode} · Complete guide →
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={`/electricity/${d.slug}`}
                    className="block rounded-xl border border-hairline bg-paper p-4 transition hover:border-hub-electricity/40 hover:shadow-sm"
                  >
                    <span className="font-semibold text-ink-navy">
                      {d.state}
                    </span>
                    <span className="mt-1 block text-xs text-ash/50">
                      {d.discomCode} · Guide not yet written — try the calculator →
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how-we-pick" className="mb-10">
          <h2 id="how-we-pick" className="font-display mb-2 text-2xl font-semibold">
            How we choose the next state
          </h2>
          <p className="text-ash/80">
            We publish one guide at a time, picked by consumer base and data
            completeness — a DISCOM whose own tariff figures are flagged
            unverified is deliberately skipped until it&apos;s cross-checked
            against a primary source, even if it would otherwise be a
            high-traffic pick. Want your DISCOM prioritised?{' '}
            <Link href="/contact" className="text-brass underline">
              Let us know
            </Link>
            , or see our{' '}
            <Link href="/methodology" className="text-brass underline">
              methodology
            </Link>{' '}
            for how every figure on this site is sourced and verified.
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
