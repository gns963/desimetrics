import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import PageHero from '@/components/PageHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { getTariff } from '@/lib/calc/electricity'
import { formatIsoDate } from '@/lib/format'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export const metadata: Metadata = {
  title: 'Electricity Tariff Directory by State & DISCOM (India) | DesiMetrics',
  description:
    'Browse verified electricity tariff rates for every Indian state and union territory — Domestic, Commercial, Industrial and Agriculture slab rates, fixed charges and electricity duty, sourced from official tariff orders.',
  alternates: {
    canonical: `${SITE}/electricity/tariffs`,
    languages: getAlternateLanguages('/electricity/tariffs'),
  },
  openGraph: { url: `${SITE}/electricity/tariffs`, type: 'website', locale: 'en_IN' },
}

const directory = CALCULATOR_PAGES.map((p) => {
  const tariff = getTariff(p.discomCode)
  return {
    slug: p.slug,
    discomCode: p.discomCode,
    discomName: tariff.discomName,
    state: tariff.state,
    categoryCount: tariff.connectionTypes.length,
    lastVerified: tariff.lastVerified,
    sourceUrl: tariff.sourceUrl,
  }
}).sort((a, b) => a.state.localeCompare(b.state))

const totalCategories = directory.reduce((sum, d) => sum + d.categoryCount, 0)

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Electricity', path: '/electricity' },
  { name: 'Tariff Directory', path: '/electricity/tariffs' },
])
const itemList = itemListLd(
  directory.map((d) => ({
    name: `${d.state} Electricity Tariff`,
    path: `/electricity/${d.slug}/tariffs`,
  })),
)

const faqs = [
  {
    q: 'How many states and DISCOMs does this tariff directory cover?',
    a: `All ${directory.length} Indian states and union territories are covered, one directory page per DISCOM, with a combined ${totalCategories} category-wise tariff entries (Domestic, Commercial, Industrial and Agriculture, where published).`,
  },
  {
    q: 'What connection categories are included in each tariff page?',
    a: 'Domestic (residential), Commercial and Industrial tariffs are covered for every DISCOM. Agriculture tariffs are included wherever a DISCOM publishes one — a handful of states have no distinct agricultural category, or we could not verify a reliable published rate, and that category is simply omitted rather than guessed.',
  },
  {
    q: 'Where does the tariff data come from?',
    a: 'Each rate is sourced from that state’s Electricity Regulatory Commission (SERC/JERC) tariff order or the DISCOM’s own official tariff schedule. The exact source and last-verified date are shown on every state’s tariff page.',
  },
  {
    q: 'How often is this tariff directory updated?',
    a: 'Tariff orders are typically revised once a year (sometimes with mid-year surcharge changes) by the respective regulator. We refresh our data as new orders are verified — check the "Last Updated" date on each state’s card above.',
  },
  {
    q: 'Does this directory include load-based tiers (e.g. by connected kW/HP) or just one rate per category?',
    a: 'We show one representative slab structure per category rather than every load-based sub-tier a state may publish (e.g. separate rates for 0–20kW vs 20–50kW commercial connections). Where a source tariff is genuinely load-tiered, that is noted on the category card.',
  },
  {
    q: 'How is this different from the DISCOM bill calculator?',
    a: 'The bill calculator estimates your actual rupee bill for a given number of units on a Domestic connection. This directory is a reference of the published rates themselves, across every connection category a DISCOM serves — use it to look up rates directly, or the calculator to estimate a real bill.',
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

export default function ElectricityTariffDirectoryHub() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Electricity', href: '/electricity' },
          { label: 'Tariff Directory', href: '/electricity/tariffs' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📋</span> Verified tariff directory
          </>
        }
        h1="Electricity Tariff Directory by State"
        subtitle={
          <>
            Browse verified electricity tariff rates for every Indian state and
            union territory — Domestic, Commercial, Industrial and Agriculture
            slab rates, fixed charges and electricity duty, sourced from
            official tariff orders.
          </>
        }
        stats={[
          { icon: '🗺️', big: `${directory.length}`, small: 'States & UTs', tone: 'hub' },
          { icon: '✓', big: 'SERC', small: 'Source-verified', tone: 'seal-red' },
          { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <section aria-labelledby="directory">
          <h2 id="directory" className="mb-4 font-display text-2xl font-semibold">
            State &amp; Union Territory Tariffs
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {directory.map((d) => (
              <div
                key={d.slug}
                className="overflow-hidden rounded-xl border border-hairline bg-paper"
              >
                <div className="bg-ink-navy px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-sm font-bold text-white">{d.state}</p>
                    <span className="flex items-center gap-1 rounded-full bg-spark-teal/20 px-2 py-0.5 text-[10px] font-semibold text-spark-teal">
                      <span aria-hidden>✓</span> Verified
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 px-4 py-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ash/60">Utility Board</span>
                    <span className="font-medium text-ink-navy">{d.discomCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ash/60">Categories</span>
                    <span className="font-medium text-ink-navy">{d.categoryCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ash/60">Last Updated</span>
                    <span className="font-medium text-ink-navy">
                      {formatIsoDate(d.lastVerified)}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/electricity/${d.slug}/tariffs`}
                  className="flex items-center justify-center gap-1.5 border-t border-hairline py-2.5 text-sm font-semibold text-brass transition hover:bg-brass/5"
                >
                  View Tariff →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Sources & regulators table — real, per-DISCOM data already in the
            tariff files, not new content: gives search engines and readers a
            single-page reference of every source without visiting all 36
            detail pages. */}
        <section aria-labelledby="sources" className="mt-12 mb-10">
          <h2 id="sources" className="mb-4 font-display text-2xl font-semibold">
            State-wise Tariff Sources
          </h2>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">State / UT</th>
                  <th className="px-4 py-2 font-semibold">Electricity Board</th>
                  <th className="px-4 py-2 font-semibold">Official Source</th>
                  <th className="px-4 py-2 text-right font-semibold">Last Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {directory.map((d) => (
                  <tr key={d.slug}>
                    <td className="px-4 py-2">
                      <Link href={`/electricity/${d.slug}/tariffs`} className="text-brass underline">
                        {d.state}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-ash/70">{d.discomCode}</td>
                    <td className="px-4 py-2">
                      <a
                        href={d.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brass underline"
                      >
                        Official order ↗
                      </a>
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-ash/70">
                      {formatIsoDate(d.lastVerified)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Educational content — generic, factual, not tied to fabricated
            category claims (only mentions the four categories we actually
            model: residential/commercial/industrial/agriculture). */}
        <section aria-labelledby="understanding" className="mb-10 space-y-3">
          <h2 id="understanding" className="font-display text-2xl font-semibold">
            Understanding Electricity Tariffs in India
          </h2>
          <p className="text-ash/80">
            Electricity tariffs in India are set independently by each state&apos;s
            Electricity Regulatory Commission (SERC) or, for Union Territories, the
            Joint Electricity Regulatory Commission (JERC) — not by the central
            government. Each regulator approves a tariff order for the DISCOM(s)
            operating in its territory, covering per-unit slab rates, fixed or
            demand charges, and a set of connection categories such as Domestic,
            Commercial, Industrial and Agriculture. Most residential tariffs are
            telescopic — each consumption slab is billed at its own rate — though
            some non-domestic categories use a single flat rate instead.
          </p>
        </section>

        <section aria-labelledby="why-differ" className="mb-10 space-y-3">
          <h2 id="why-differ" className="font-display text-2xl font-semibold">
            Why Electricity Tariff Rates Differ by State
          </h2>
          <p className="text-ash/80">
            Rates vary from state to state because each SERC sets tariffs based on
            that state&apos;s own cost of power purchase and distribution, the DISCOM&apos;s
            revenue requirement, cross-subsidy rules between consumer categories,
            and state-specific subsidy schemes (for example, free or discounted
            units for low-consumption households in some states). Electricity
            duty — a state government levy added on top of the energy charge — is
            also set independently and differs by state and by connection
            category.
          </p>
        </section>

        <section aria-labelledby="categories-explainer" className="mb-10 space-y-3">
          <h2 id="categories-explainer" className="font-display text-2xl font-semibold">
            Connection Categories in This Directory
          </h2>
          <p className="text-ash/80">
            This directory covers four connection categories, wherever a DISCOM
            publishes rates for them: <strong>Domestic (Residential)</strong> for
            households, <strong>Commercial</strong> for shops and businesses,{' '}
            <strong>Industrial</strong> for factories and manufacturing units, and{' '}
            <strong>Agriculture</strong> for irrigation and farm-pump connections.
            We show one representative rate per category rather than every
            load-based sub-tier a state may publish; a handful of DISCOMs have no
            distinct agricultural tariff, or a reliable published rate for it
            could not be verified — those are omitted rather than estimated.
          </p>
        </section>

        <section aria-labelledby="faq" className="mb-10">
          <h2 id="faq" className="mb-4 font-display text-2xl font-semibold">
            Frequently Asked Questions
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

        <CrossHubLinks current="electricity" />
      </main>

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
    </>
  )
}
