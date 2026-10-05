import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/india-power-shortage-september-2026'
const TITLE = "India's Power Shortage Hits a 3-Year High: Why It Happened and Will It Affect Your Bill?"
const DESCRIPTION =
  "September's power shortfall was the highest in three years, even as coal-fired generation rose for a sixth straight month. Here's what the data actually shows, why it happened, and how it could reach your bill."
const LAST_UPDATED = '2 October 2026'
const DATA_AS_OF = 'September 2026'

export const metadata: Metadata = {
  title: 'India Power Shortage September 2026: 3-Year High Explained',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
  robots: { index: false, follow: true },
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
  datePublished: '2026-10-02',
  dateModified: '2026-10-02',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'Is India experiencing a nationwide blackout?',
    a: "No. A power 'shortage' in this context means energy not supplied (ENS) — the gap between demand and what the grid could actually deliver, usually managed through brief, localized load-shedding at peak hours rather than a uniform nationwide outage. September 2026's shortfall worked out to a small fraction of one percent of total generation, not a grid-wide failure.",
  },
  {
    q: 'How much power did India fall short of in September 2026?',
    a: "Reuters calculated a shortfall of about 560 million units (MU) for the month, the highest since August 2023 — a three-year high. A separate outlet working from the same underlying Grid-India data reported a close but different figure of 544 million units. Treat the number as 'around 550-560 million units' rather than one precise count; the small gap likely comes down to exactly which demand window each calculation uses.",
  },
  {
    q: 'Why is there a shortage despite higher coal-fired generation?',
    a: 'Several pressures hit at once: a weak monsoon (India\'s weakest in over a decade) cut hydropower output for a fifth straight month; an active El Niño pattern is linked to that weak monsoon and to higher-than-normal demand; industrial and cooling demand stayed strong, with peak demand hitting a record 269 GW; India still has little grid-scale battery storage to shift surplus daytime solar into the evening demand peak; and many coal plants were running on critically low fuel stocks even as overall coal burn rose, with some plants also down for maintenance.',
  },
  {
    q: 'Did renewable energy generation actually fall in September 2026?',
    a: "No — renewable generation grew 25.1% year-on-year to 29.62 billion units, genuine growth. But total generation and coal-fired generation both grew faster, so renewables' share of the overall mix slipped to about 17%, down from roughly 19.5% in August. More clean power was generated; it was just a smaller slice of a bigger, coal-heavier pie.",
  },
  {
    q: 'Are coal plants actually running out of fuel?',
    a: "A meaningful share were critically low, not out. Government data cited by multiple outlets shows more than 80 of the roughly 190 monitored coal plants held less than 25% of their prescribed stock level in late September, and the national coal inventory fell to around 39% of its normative level — about a week's cover against a 19-day standard. The government responded by invoking Section 11 of the Electricity Act in late September, directing 112 captive coal plants to run at maximum output from 1 October to 31 December 2026. The Coal Ministry's public position is that coal supply itself is adequate and this is a logistics and distribution issue, not a production shortfall.",
  },
  {
    q: 'Is this connected to El Niño?',
    a: "Yes. NOAA and IMD both have an active El Niño Advisory in place for this period, and it's the cited driver behind the weak 2026 monsoon (87% of the long-period average, the fourth-lowest since 2001) that cut into hydropower generation and pushed cooling demand higher.",
  },
  {
    q: 'Will my electricity bill go up because of this shortage?',
    a: "We can't say that it will — we found no state order raising a fuel surcharge specifically because of September's shortage. What we can explain is the mechanism: when a DISCOM has to buy costlier short-term power (on the power exchange, or via emergency coal purchases), most states already have a routine monthly Fuel and Power Purchase Cost Adjustment (FPPCA/FCA) built into their tariff orders to pass part of that cost through on a lag — it can also come out negative, as a refund, in a cheaper month. See our explainer on fixed charges vs FCA for how that works, and check your own state's monthly order rather than assuming either way.",
  },
  {
    q: 'What is Grid-India and CEA, and why does this article cite them?',
    a: 'Grid-India (formerly POSOCO) is the national grid operator that publishes daily/monthly generation, demand and energy-not-supplied data. CEA, the Central Electricity Authority, publishes the daily coal-stock report that tracks fuel inventory at power plants. Both are the primary official sources behind the generation and coal-stock figures in this article; the Reuters report that first drew attention to the shortfall is itself built from Grid-India\'s numbers.',
  },
  {
    q: 'Is Kerala\'s power shortage part of this national story?',
    a: "Yes — Kerala is a concrete, state-level example of the same national pressures described here: weak hydel inflow, costlier short-notice power purchases, and a real monthly fuel surcharge. See our dedicated article on Kerala's power shortage and what it adds to a KSEB bill.",
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

/** A single horizontal bar sliced into proportional segments — matches the
 *  site's telescoping-tariff visual language (see WaterSlabBand / the Kerala
 *  news post's SupplyBand) rather than a card grid. */
function GenerationMixBand({
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

export default function IndiaPowerShortagePage() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'News', href: '/news' },
          { label: 'India Power Shortage', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> National · Grid-India · CEA
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚡', big: '~560 MU', small: 'Sept 2026 shortfall (Reuters)', tone: 'caution-amber' },
          { icon: '🪨', big: '66%', small: "Coal's share of Sept generation", tone: 'hub' },
          { icon: '🌱', big: '17%', small: 'Clean-energy share, down from ~19.5%', tone: 'hub' },
          { icon: '⛽', big: '80+', small: 'of ~190 coal plants critically low on stock', tone: 'caution-amber' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          By{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · Updated {LAST_UPDATED} ·{' '}
          <a
            href="https://www.reuters.com/business/energy/india-power-shortfall-hits-three-year-peak-despite-higher-coal-burn-2026-10-01/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Source: Reuters
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>India&apos;s power shortage in September 2026 reached about 560 million
          units (MU)</strong> of unmet demand, according to Reuters&apos; calculation from
          Grid-India&apos;s daily data — the highest monthly shortfall in three years, since
          August 2023. That sounds alarming on its own, but scale matters: the shortfall works
          out to a small fraction of one percent of the 174.17 billion units India generated
          that month. This is a real, worsening supply squeeze — not a nationwide blackout.
          Here&apos;s what the underlying numbers actually show, why the squeeze happened even
          as coal-fired generation rose for a sixth straight month, and what it could mean for
          your bill.
        </p>

        <section aria-labelledby="what-happened" className="mt-10 scroll-mt-20">
          <h2 id="what-happened" className={h2Cls}>
            What the September 2026 Numbers Actually Show
          </h2>
          <p className={pCls}>
            India generated <strong>174.17 billion units</strong> of electricity in September
            2026, up <strong>11.3% year-on-year</strong> — demand itself kept growing strongly.
            Against that larger total, Reuters calculates a shortfall of about{' '}
            <strong>560 million units</strong>, the highest since August 2023. A separate outlet
            working from the same Grid-India dataset reports a close but different figure of 544
            million units — the two don&apos;t fully agree, likely because of exactly which
            demand window each calculation counts, so treat the number as &quot;around 550-560
            million units&quot; rather than one precise count.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Either way, the shortfall is under half a percent of the month&apos;s total
            generation. A three-year-high shortfall and strong underlying demand growth are both
            true at the same time — this is a worsening squeeze on top of a grid that is also
            genuinely growing, not a grid in overall decline.
          </p>
          <p className={takeawayCls}>
            Takeaway: the shortfall is real and the worst in three years, but it&apos;s a small
            slice of a generation total that itself grew by double digits.
          </p>
        </section>

        <section aria-labelledby="why" className="mt-10 scroll-mt-20">
          <h2 id="why" className={h2Cls}>
            Why Did a Shortage Happen While Coal Burn Was Rising?
          </h2>
          <p className={pCls}>
            No single cause explains it — several pressures compounded at once:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'A weak monsoon, tied to El Niño',
                "India's 2026 monsoon came in at 87% of its long-period average — the fourth-lowest since 2001 — with NOAA and IMD both reporting an active El Niño pattern for this period, a cited driver behind the weak rains.",
              ],
              [
                'Hydropower down for a fifth straight month',
                "weaker monsoon inflow cut hydroelectric generation by roughly 16% year-on-year in September, continuing a five-month decline.",
              ],
              [
                'Strong, record-setting demand',
                'national peak demand hit a record 269 GW during September, driven by continued industrial activity and above-normal temperatures.',
              ],
              [
                'Little storage to bridge day and evening',
                "India still has limited grid-scale battery storage, so surplus daytime solar generation can't easily be held over to cover the evening demand peak, when solar output drops to zero.",
              ],
              [
                'Coal stocks critically low at many plants',
                'more than 80 of the roughly 190 monitored coal plants held less than 25% of prescribed stock by late September, even as plants burned coal faster to keep up with demand — a logistics and distribution strain, not a lack of coal in the ground.',
              ],
              [
                'Plants under maintenance',
                'analyst Rupesh Sankhe of Elara Securities, cited by Reuters, pointed to a combination of higher peak demand and several plants being under scheduled maintenance at the same time.',
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
            Takeaway: this is a supply-and-demand squeeze from multiple directions at once —
            weather, demand, storage and fuel logistics all pulling the same way in the same
            month — which is also why it won&apos;t resolve the moment any single factor
            improves.
          </p>
        </section>

        <section aria-labelledby="mix" className="mt-10 scroll-mt-20">
          <h2 id="mix" className={h2Cls}>
            Coal vs. Renewables: Why Did the Clean-Energy Share Fall Even as It Grew?
          </h2>
          <p className={pCls}>
            Coal-fired generation rose <strong>13.3% year-on-year</strong> and its share of
            total generation climbed to <strong>66.03%</strong>, up from 64.6% in August.
            Renewable generation (solar, wind and other RE, excluding large hydro) also grew —
            genuinely, by <strong>25.1% year-on-year to 29.62 billion units</strong> — but
            renewables&apos; <em>share</em> of the overall mix still slipped, to about{' '}
            <strong>17%</strong> from roughly 19.5% in August.
          </p>
          <GenerationMixBand
            label="September 2026 — India's generation mix (174.17 billion units)"
            segments={[
              { name: 'Coal', value: 115.0, unit: 'bn kWh', shade: 'bg-hub-news' },
              { name: 'Renewables', value: 29.62, unit: 'bn kWh', shade: 'bg-hub-news/60' },
              { name: 'Other', value: 29.55, unit: 'bn kWh', shade: 'bg-hub-news/30' },
            ]}
          />
          <p className={`mt-4 ${pCls}`}>
            That&apos;s not a contradiction — it&apos;s what happens when the total pie grows
            faster than one slice of it. More clean power was generated than a year earlier; it
            was just a smaller share of a bigger, coal-heavier total, because coal-fired
            generation grew even faster to cover the shortfall itself.
          </p>
          <p className={takeawayCls}>
            Takeaway: renewables grew in absolute terms but lost ground in share — both numbers
            are true, and neither one alone tells the full story.
          </p>
        </section>

        <section aria-labelledby="what-is-shortage" className="mt-10 scroll-mt-20">
          <h2 id="what-is-shortage" className={h2Cls}>
            What Does a &quot;Power Shortage&quot; Actually Mean?
          </h2>
          <p className={pCls}>
            The figures above describe <strong>energy not supplied (ENS)</strong> — the gap
            between what the grid was asked to deliver and what it actually delivered, measured
            in million units over a period. It is not the same as a blackout. In practice, a
            shortfall like this is usually managed through brief, localized load-shedding —
            often concentrated at the evening demand peak and in specific states or feeders —
            rather than a uniform, nationwide outage. Kerala&apos;s experience this same month
            (see below) is a concrete example of exactly that pattern: restrictions at peak
            hours, not a blanket cut.
          </p>
          <p className={takeawayCls}>
            Takeaway: &quot;shortage&quot; here means a measured supply gap, not a description
            of the whole grid going dark.
          </p>
        </section>

        <section aria-labelledby="bill-impact" className="mt-10 scroll-mt-20">
          <h2 id="bill-impact" className={h2Cls}>
            Will This Affect Your Electricity Bill?
          </h2>
          <p className={pCls}>
            We found no state order raising a fuel surcharge specifically because of
            September&apos;s shortfall, and we&apos;re not claiming one is coming. What we can
            explain is the mechanism that would carry a cost like this through to a bill, if a
            DISCOM&apos;s own power-purchase costs do rise. Prices on the Indian Energy Exchange
            hit the regulatory ceiling of ₹20 per unit repeatedly between 6 and 17 September,
            and the average clearing price over those first 17 days was ₹7.83 per unit — more
            than double the same period a year earlier. When a DISCOM has to buy costlier
            short-term power like this (on the exchange, or via emergency coal purchases), most
            states already have a routine <strong>monthly</strong> Fuel and Power Purchase Cost
            Adjustment (FPPCA, also called FCA/FSA in some states) built into their tariff
            orders to pass part of that cost through on a lag.
          </p>
          <p className={`mt-3 ${pCls}`}>
            This is a routine, pre-existing mechanism, not a special emergency order — and it
            runs in both directions. In Andhra Pradesh, for instance, the current FPPCA is
            actually a small <em>refund</em> (−₹0.13/unit) under the regulator&apos;s order
            covering this period, a reminder that the adjustment moves with actual
            power-purchase costs each month, not only upward. For how this fits alongside the
            fixed and energy charges on an Indian electricity bill, see our explainer on{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs. fuel-cost adjustment
            </Link>
            . Check your own state&apos;s monthly order for the actual figure rather than
            assuming either way. The network side of a bill — transmission charges, wheeling
            charges and line losses — is covered in our guide to{' '}
            <Link href="/blog/transmission-distribution-costs-electricity-bill-india" className="text-brass underline">
              transmission and distribution costs
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: the shortage&apos;s bill exposure, if any, runs through a routine monthly
            adjustment that already exists in most tariff orders — not a one-off rate hike tied
            to this specific event.
          </p>
        </section>

        <section aria-labelledby="regional" className="mt-10 scroll-mt-20">
          <h2 id="regional" className={h2Cls}>
            A Regional Example: Kerala
          </h2>
          <p className={pCls}>
            Kerala&apos;s own September gave a concrete, state-level view of these same national
            pressures: weak hydel reservoir inflow after a poor monsoon, heavy reliance on
            costlier power imported from the national grid at short notice, and a real monthly
            fuel surcharge on KSEB bills as a result. See{' '}
            <Link href="/news/kerala-power-shortage-september-2026" className="text-brass underline">
              our dedicated article on Kerala&apos;s power shortage
            </Link>{' '}
            for the day-by-day numbers and exactly what it added to a KSEB bill.
          </p>
          <p className={takeawayCls}>
            Takeaway: the national pressures described above aren&apos;t abstract — Kerala shows
            what they look like applied to one state&apos;s actual supply and billing.
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            What to Watch Next
          </h2>
          <ol className="mt-3 space-y-3">
            {[
              [
                'A government order forcing more captive coal plants online',
                'In the last week of September, the government invoked Section 11 of the Electricity Act, directing 112 captive coal plants (50 MW and above) to run at maximum available capacity from 1 October through 31 December 2026 and sell surplus power through the exchanges. The Coal Ministry\'s public position is that coal supply itself is adequate and this addresses distribution, not a production shortfall.',
              ],
              [
                'Whether coal stocks rebuild through October',
                'National coal inventory stood at around 39% of its normative level in late September. Whether that climbs back toward the 19-day standard — or stays stretched — through October is the clearest early signal of whether this easing or persists.',
              ],
              [
                'October demand and monsoon withdrawal',
                "Peak demand typically eases as the monsoon fully withdraws and temperatures cool into autumn. Whether that seasonal relief shows up on schedule, or demand stays elevated, will show in Grid-India's own daily data.",
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
          <p className={takeawayCls}>
            Takeaway: the next real signal isn&apos;t a single headline number, it&apos;s whether
            coal stocks and October demand both move in the right direction at the same time.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Electricity Bill Calculators
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Estimate your own state&apos;s electricity bill by DISCOM and slab.
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
              href="/news/kerala-power-shortage-september-2026"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📰
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Kerala&apos;s Power Shortage
              </p>
              <p className="mt-1 text-xs text-ash/60">
                A state-level example of the same pressures, and what it added to a KSEB bill.
              </p>
            </Link>
            <Link
              href="/solar/battery-backup-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🔋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Battery Backup Calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                See what it takes to store daytime solar for evening demand.
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
          Last updated: {LAST_UPDATED}. Generation, coal-share, renewable-share and coal-stock
          figures above are {DATA_AS_OF} data as reported by Grid-India, the Central Electricity
          Authority (CEA) and Reuters&apos; own calculations from that data. Reuters cites a
          shortfall of about 560 million units for the month; a separate outlet working from the
          same Grid-India dataset reports 544 million units — treat the figure as &quot;around
          550-560 million units,&quot; not a single precise count, and credit to Reuters for the
          original reporting that this article draws on. The October 2026 developments described
          under &quot;What to Watch&quot; reflect the most recent government order found as of
          this writing and may change. See our{' '}
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
