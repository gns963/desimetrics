import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/kerala-power-shortage-september-2026'
const TITLE = "Kerala's Power Shortage: What It Means for Your KSEB Bill"
const DESCRIPTION =
  'Kerala avoided power restrictions for three days running, but KSEB says the shortage is not over. Here is why it happened, what the numbers actually show, and what it adds to your electricity bill.'
const LAST_UPDATED = '29 September 2026'
const DATA_AS_OF = '27 September 2026'

export const metadata: Metadata = {
  title: "Kerala Power Shortage 2026: What It Means for Your KSEB Bill",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
  robots: { index: false },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'News', path: '/news' },
  { name: TITLE, path: PATH },
])

const newsArticleLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    '@type': 'Organization',
    name: 'DesiMetrics Editorial Team',
    url: `${SITE}/author/editorial-team`,
  },
  publisher: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  datePublished: '2026-09-29',
  dateModified: '2026-09-29',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'Is Kerala facing power cuts right now?',
    a: 'Not as scheduled restrictions — KSEB avoided imposing power cuts for three consecutive days up to 28 September 2026. But KSEB itself says the underlying shortage has not been resolved, and restrictions could return at any point before at least 15 October 2026 if demand rises or supply falls again.',
  },
  {
    q: 'Why is Kerala short of electricity?',
    a: 'Several factors are compounding at once: coal at thermal power stations elsewhere in the country is wet after heavy monsoon rain, cutting into the power Kerala can draw from the national grid; September temperatures ran higher than usual, pushing up demand; and Kerala\'s own hydroelectric reservoirs are well below last year\'s levels after weak monsoon inflow.',
  },
  {
    q: 'How much of Kerala\'s electricity is imported right now?',
    a: 'On 27 September 2026, Kerala consumed 84.65 million units (8.47 crore units) of electricity. Only 9.63 million units came from generation within the state — the remaining 75.01 million units, about 89% of that day\'s demand, were imported from the national grid.',
  },
  {
    q: 'What is the KSEB fuel surcharge, and how much is it for October 2026?',
    a: 'The fuel surcharge is a monthly charge KSERC allows KSEB to add to bills, recovering the extra cost of buying power from outside the state beyond what base tariffs cover. It is reported at 3 paise per unit for October 2026, recovering roughly ₹6.88 crore in additional procurement cost from August. It is capped at a ceiling of 10 paise per unit under KSERC\'s tariff regulations.',
  },
  {
    q: 'Does the DesiMetrics KSEB bill calculator include the fuel surcharge?',
    a: 'No — our KSEB bill calculator estimates the base bill from telescopic slab rates, the fixed charge and electricity duty. The fuel surcharge is a separate, monthly-variable add-on set by KSERC that is not currently modelled in the calculator, so your actual bill during a surcharge month will run slightly higher than the calculator\'s estimate.',
  },
  {
    q: 'When will Kerala\'s power shortage end?',
    a: 'KSEB has arranged 450 MW of steady supply from 15 October 2026 — 250 MW from Madhya Pradesh and 200 MW from Bihar — and expects supply to stabilise once that begins. Until then, the state is relying on shorter-term purchases to cover peak-hour demand.',
  },
  {
    q: 'What is Kerala doing to avoid power cuts until 15 October?',
    a: 'Separately from the 15 October arrangement, KSEB has also been purchasing power on shorter notice — including a reported 200 MW deal at ₹11 per unit for peak hours (6 pm to midnight), valid through 31 October 2026 and pending KSERC approval. These are two distinct arrangements, not the same deal.',
  },
  {
    q: 'How low are Kerala\'s hydel reservoirs right now?',
    a: 'On 27 September 2026, Kerala\'s hydel reservoirs held 2,564.41 million units of stored energy-equivalent, 62% of capacity — 669.03 million units below the same day in 2025, when reservoirs held 3,233.44 million units. Inflow into reservoirs during September totalled 397.42 million units.',
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

const h2Cls = 'font-display mb-3 text-2xl font-bold text-ink-navy'
const pCls = 'text-ash/80'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

/** A single horizontal bar sliced into two proportional segments — matches
 *  the site's own telescoping-tariff visual language (see WaterSlabBand)
 *  rather than a card grid, per the Electricity page pattern. */
function SupplyBand({
  label,
  segments,
}: {
  label: string
  segments: { name: string; value: number; unit: string; shade: string }[]
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">{label}</p>
      <div
        className="mt-2 flex h-14 w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-hairline"
        role="group"
        aria-label={label}
      >
        {segments.map((s) => {
          const pct = (s.value / total) * 100
          return (
            <div
              key={s.name}
              style={{ width: `${pct}%` }}
              className={`flex flex-col items-center justify-center gap-0.5 px-1 text-center ${s.shade}`}
            >
              {pct > 10 && (
                <span className="text-[10px] font-medium tracking-wide text-white/80">
                  {s.name}
                </span>
              )}
              <span className="font-display text-sm font-bold tabular-nums text-white">
                {Math.round(pct)}%
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ash/60">
        {segments.map((s) => (
          <span key={s.name}>
            <span className="font-semibold text-ink-navy">{s.name}:</span>{' '}
            {s.value.toLocaleString('en-IN')} {s.unit}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function KeralaPowerShortagePage() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'News', href: '/news' },
          { label: 'Kerala Power Shortage', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> Kerala · KSEB
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '✅', big: '3 days', small: 'No restrictions (as of 28 Sep)', tone: 'hub' },
          { icon: '⚡', big: '89%', small: 'Power imported, 27 Sep', tone: 'hub' },
          { icon: '💰', big: '3 paise/unit', small: 'Oct fuel surcharge', tone: 'caution-amber' },
          { icon: '📅', big: '15 Oct', small: 'Next supply checkpoint', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          By{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · Updated {LAST_UPDATED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>Kerala went three consecutive days without power restrictions</strong>, up
          to 28 September 2026 — a genuine improvement after a difficult September. But KSEB
          has not called the shortage over: state electricity board officials say restrictions
          could return at any point before at least <strong>15 October 2026</strong>, when a
          larger, steadier supply arrangement is due to begin. For KSEB consumers, the more
          immediate effect isn&apos;t a power cut — it&apos;s a small addition to your bill,
          which this article walks through.
        </p>

        <section aria-labelledby="what-happened" className="mt-10 scroll-mt-20">
          <h2 id="what-happened" className={h2Cls}>
            What Happened to Kerala&apos;s Power Supply This Week?
          </h2>
          <p className={pCls}>
            KSEB avoided imposing scheduled power restrictions for three days running, helped
            by a slight improvement in power availability at the national level and a modest
            dip in Kerala&apos;s own demand. That is a real change from earlier in September,
            when restrictions were imposed on multiple days as the state&apos;s deficit
            widened. It is not, however, a sign that the underlying shortage has been resolved.
          </p>
          <p className={`mt-3 ${pCls}`}>
            KSEB&apos;s own assessment, reported alongside the three-day update, is that any
            rise in consumption or fall in available supply could bring restrictions back — and
            that this risk holds until at least 15 October 2026, when a larger power-purchase
            arrangement is due to begin (see{' '}
            <Link href="#what-to-watch" className="text-brass underline">
              what to watch next
            </Link>
            , below).
          </p>
          <p className={takeawayCls}>
            Takeaway: three restriction-free days is genuine relief, not a resolution — KSEB is
            still describing this as an active shortage.
          </p>
        </section>

        <section aria-labelledby="why" className="mt-10 scroll-mt-20">
          <h2 id="why" className={h2Cls}>
            Why Is Kerala Short of Power?
          </h2>
          <p className={pCls}>
            No single cause explains the shortage — it is several factors compounding at the
            same time:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'Wet coal, reduced thermal power nationally',
                'heavy monsoon rain in coal-producing states has left coal stocks wet at thermal power plants elsewhere in India, cutting into the surplus power Kerala normally imports from the national grid.',
              ],
              [
                'A hotter-than-usual September',
                'above-normal temperatures through the month pushed Kerala\'s own electricity demand higher than in a typical September.',
              ],
              [
                'Reservoirs running well below last year',
                'Kerala\'s hydel reservoirs — the state\'s own major generation source — are carrying meaningfully less stored water than they held on the same date in 2025, after weaker monsoon inflow (see the numbers below).',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-news" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: the shortage is a supply-and-demand squeeze from multiple directions at
            once, not one identifiable failure — which is also why it doesn&apos;t resolve the
            moment any single factor improves.
          </p>
        </section>

        <section aria-labelledby="numbers" className="mt-10 scroll-mt-20">
          <h2 id="numbers" className={h2Cls}>
            How Much Power Is Kerala Actually Short Of? The Numbers, Explained
          </h2>
          <p className={pCls}>
            On <strong>27 September 2026</strong>, Kerala consumed{' '}
            <strong>84.65 million units</strong> of electricity — 8.47 crore units, in the
            scale Indian readers are more used to. Only a small share of that came from
            generation within the state, as{' '}
            <a
              href="https://timesofindia.indiatimes.com/city/thiruvananthapuram/kseb-avoids-power-restrictions-for-three-days-crisis-persists/articleshow/134544878.cms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              The Times of India reported
            </a>{' '}
            that day:
          </p>

          <SupplyBand
            label="27 September 2026 — where Kerala's power came from"
            segments={[
              { name: 'Generated in Kerala', value: 9.63, unit: 'MU', shade: 'bg-hub-news' },
              { name: 'Imported', value: 75.01, unit: 'MU', shade: 'bg-hub-news/50' },
            ]}
          />

          <p className={`mt-4 ${pCls}`}>
            Of the 9.63 million units generated within Kerala that day, hydel stations
            contributed roughly 6.84 million units and independent power producers another
            2.73 million units. Those two figures add up to slightly less than the reported
            9.63 million-unit total — a small rounding gap in the underlying reporting, not a
            third, unstated source of power.
          </p>

          <p className={`mt-4 ${pCls}`}>
            The same pattern holds across the month, not just on one day. Between 1 and 27
            September, Kerala generated <strong>623.91 million units</strong> (62.4 crore
            units) within the state against <strong>2,531.73 million units</strong> (253.2
            crore units) consumed — meaning <strong>1,907.82 million units</strong> had to be
            imported over those 27 days. That works out to an average of 23.11 million units
            generated in-state per day, against 93.77 million units consumed per day.
          </p>

          <SupplyBand
            label="1–27 September 2026 — cumulative generation vs. consumption"
            segments={[
              { name: 'Generated in Kerala', value: 623.91, unit: 'MU', shade: 'bg-hub-news' },
              { name: 'Imported', value: 1907.82, unit: 'MU', shade: 'bg-hub-news/50' },
            ]}
          />

          <p className={`mt-4 ${pCls}`}>
            Kerala&apos;s hydel reservoirs — the source of most of that in-state generation —
            tell the same story. On 27 September 2026, reservoirs held{' '}
            <strong>2,564.41 million units</strong> of stored energy-equivalent, 62% of total
            capacity. That is <strong>669.03 million units below</strong> where reservoirs
            stood on the same date in 2025 (3,233.44 million units) — a gap that reflects a
            weaker monsoon, not just higher demand. Inflow into reservoirs across September
            totalled 397.42 million units, well short of what was drawn out for generation.
            Independent reporting from earlier in the month shows the same pattern already
            visible on 14 September 2026, when reservoirs stood at a comparable 62.34% of
            capacity against 78.96% a year earlier.
          </p>

          <p className={takeawayCls}>
            Takeaway: Kerala isn&apos;t short by a small margin — on most days in September,
            close to three-quarters or more of the state&apos;s electricity has had to be
            imported, because in-state hydel generation is running well below what its own
            reservoirs supported a year ago.
          </p>
        </section>

        <section aria-labelledby="bill-impact" className="mt-10 scroll-mt-20">
          <h2 id="bill-impact" className={h2Cls}>
            What Does This Mean for Your KSEB Bill?
          </h2>
          <p className={pCls}>
            Importing most of its power at short notice costs KSEB more than generating or
            buying it under normal long-term contracts — and KSERC&apos;s tariff rules let KSEB
            pass a portion of that extra cost on to consumers through a{' '}
            <strong>monthly fuel surcharge</strong>, separate from your base electricity bill.
            KSEB has confirmed a fuel surcharge for October 2026 of{' '}
            <strong>3 paise per unit</strong>, recovering roughly ₹6.88 crore in additional
            power-procurement cost from August 2026.
          </p>
          <p className={`mt-3 ${pCls}`}>
            This surcharge isn&apos;t unlimited. Under KSERC&apos;s Terms and Conditions for
            Determination of Tariff Regulations (as amended in 2023), the fuel surcharge is
            capped at a ceiling of <strong>10 paise per unit</strong> in any month, with any
            unrecovered balance carried forward for up to six months rather than added all at
            once. October&apos;s reported 3 paise/unit rate sits well within that ceiling. For
            how this fits alongside the other fixed and variable parts of an Indian electricity
            bill, see our explainer on{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs. fuel-cost adjustment
            </Link>
            .
          </p>
          <p className={`mt-3 ${pCls}`}>
            One thing worth knowing if you use our tools: our{' '}
            <Link href="/electricity/kseb-bill-calculator" className="text-brass underline">
              KSEB bill calculator
            </Link>{' '}
            estimates your base bill from Kerala&apos;s telescopic slab rates, fixed charge and
            electricity duty — it does not currently add the monthly fuel surcharge, since that
            rate changes independently every month. Treat the calculator&apos;s estimate as
            your base bill, and expect your actual KSEB bill in a surcharge month to run
            slightly higher.
          </p>
          <p className={takeawayCls}>
            Takeaway: the shortage&apos;s direct cost to you isn&apos;t a blackout risk, it&apos;s
            a small, capped, monthly surcharge on top of your usual bill — worth knowing about,
            not worth panicking over.
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            What&apos;s Being Done, and What to Watch Until 15 October?
          </h2>
          <p className={pCls}>
            Two separate power-purchase arrangements are in motion, on different timelines —
            worth keeping distinct rather than treating as one deal:
          </p>
          <ol className="mt-3 space-y-3">
            {[
              [
                'The steadier fix — 450 MW from 15 October',
                'KSEB has arranged 450 MW of supply beginning 15 October 2026 — 250 MW from Madhya Pradesh and 200 MW from Bihar. This is the arrangement KSEB is pointing to when it says supply should stabilise; until it begins, the state is managing on shorter-term purchases.',
              ],
              [
                'The shorter-term bridge — a 200 MW peak-hour purchase',
                'Separately, KSEB has been purchasing power on shorter notice to cover peak-hour demand, including a reported 200 MW deal at ₹11 per unit for the 6 pm–midnight window, valid through 31 October 2026 and reported as pending KSERC approval. This bridges the gap until the steadier 15 October supply begins — it is not the same 450 MW arrangement.',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-news font-display text-xs font-bold text-white">
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ol>
          <p className={`mt-3 ${pCls}`}>
            Until 15 October, the practical signal to watch is simple: as long as Kerala keeps
            avoiding scheduled restrictions day to day, the shorter-term purchases are holding.
            A return to restrictions would signal that one of those bridging arrangements has
            fallen short of demand.
          </p>
          <p className={takeawayCls}>
            Takeaway: the real fix is dated to 15 October — everything before that is a
            short-term bridge, not a resolution.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/electricity/kseb-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">KSEB Bill Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Estimate your base Kerala electricity bill by telescopic slab.
              </p>
            </Link>
            <Link
              href="/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📄
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Fixed Charges vs FCA Explained
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Why your electricity bill changes even when usage doesn&apos;t.
              </p>
            </Link>
            <Link
              href="/blog/kseb-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Complete Guide to KSEB Electricity Bill
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Slabs, the 250-unit cliff, billing cycle and how to pay.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Solar ROI Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                See how rooftop solar changes your exposure to grid shortages.
              </p>
            </Link>
          </div>
        </section>

        <section aria-labelledby="faq" className="mt-10 scroll-mt-20">
          <h2 id="faq" className={h2Cls}>
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

        <p className="mt-10 text-sm text-ash/40">
          Last updated: {LAST_UPDATED}. Day-level and September cumulative figures are as
          reported for {DATA_AS_OF} and are not independently re-verified by DesiMetrics day to
          day — treat them as a dated snapshot of a fast-moving situation, not a live feed. The
          three-restriction-free-day finding was independently corroborated by more than one
          Kerala news outlet as of 28 September 2026. The October fuel surcharge rate is
          reported by a single source as of this writing; confirm the exact figure on your own
          bill or via KSEB&apos;s official fuel-surcharge notices before relying on it for
          planning. See our{' '}
          <Link href="/methodology" className="text-brass underline">
            methodology
          </Link>{' '}
          for how we source and verify figures across this site.
        </p>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
