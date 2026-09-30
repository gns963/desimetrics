import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gerc-liquidated-damages-wind-solar-gujarat'
const TITLE = 'Why Delayed Solar and Wind Projects End Up in Court — and What It Means for Gujarat Power Bills'
const DESCRIPTION =
  'GERC let two renewable developers amend their disputes with GUVNL over commissioning delays and liquidated damages — a 140 MW wind project and a 200 MW solar project. Neither dispute is decided yet. Here is what was actually ordered, and how project delays connect to your bill.'
const LAST_UPDATED = '30 September 2026'
const DATA_AS_OF = '30 September 2026'

export const metadata: Metadata = {
  title: 'GERC Wind & Solar Liquidated Damages Disputes — Explained',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'News', path: '/news' },
  { name: TITLE, path: PATH },
])

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    '@type': 'Organization',
    name: 'DesiMetrics Editorial Team',
    url: `${SITE}/author/editorial-team`,
  },
  publisher: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  datePublished: '2026-09-30',
  dateModified: '2026-09-30',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'Has GERC ruled that GUVNL has to refund the liquidated damages it recovered?',
    a: 'No. GERC has only allowed both developers to formally add their refund claims to petitions that were already pending — a procedural step, not a decision. GERC\'s own order says the amendment "shall not, by itself, constitute an adjudication upon the merits of the claims of either party." Both main disputes will be heard after GUVNL files its reply (due 8 October 2026) and each developer files a rejoinder (due 22 October 2026).',
  },
  {
    q: 'What is liquidated damages (LD) in a solar or wind power purchase agreement?',
    a: 'A pre-agreed penalty a developer owes for missing the Scheduled Commercial Operation Date (SCOD) in its PPA, calculated on a formula set out in the contract. DISCOMs typically recover it by deducting the amount from the developer\'s monthly power-supply invoices, or by encashing part of the Performance Bank Guarantee the developer posted when signing the PPA — exactly what GUVNL did in both cases here.',
  },
  {
    q: 'What is the difference between SCOD and COD?',
    a: 'SCOD (Scheduled Commercial Operation Date) is the deadline a PPA sets for a project to become operational. COD (Commercial Operation Date) is the date it actually does. When COD comes after SCOD, the gap is what liquidated damages are calculated against — unless a force majeure claim excusing some or all of that gap is accepted.',
  },
  {
    q: 'What counts as force majeure for a renewable energy project in India?',
    a: 'Events genuinely beyond a developer\'s reasonable control that prevent timely commissioning — the wind developer here cited delays in grid connectivity approval, heavy rainfall, flooding, cyclonic weather and a quarry strike. Whether any specific event actually qualifies, and how much SCOD time it justifies excusing, is a factual and contractual question GERC has to decide case by case — it is not automatic, and neither case here has had that question decided yet.',
  },
  {
    q: 'Do these two disputes affect my electricity bill right now?',
    a: 'Not directly, and not yet. Neither case has been decided. Separately, GUVNL\'s power-purchase costs — including the cost of managing supply shortfalls from delayed projects — do flow through to consumer bills over time via the FPPPA (Fuel & Power Purchase Price Adjustment) mechanism, a GERC-approved quarterly adjustment. These two specific disputes have not been shown to move that number in either direction — treat this as background on how the mechanism works, not a claim about your bill.',
  },
  {
    q: 'How much liquidated damages did GUVNL recover in each case?',
    a: 'Per Project Twelve Renewables\' own pleadings in its GERC petition, GUVNL recovered ₹14,40,26,667 (about ₹14.40 crore) from the 140 MW wind project\'s invoices. Per Martial Solren\'s pleadings, GUVNL recovered ₹9,17,77,778 (about ₹9.18 crore) from the 200 MW solar project. Both developers say they paid under protest, without prejudice to their right to dispute the underlying liability.',
  },
  {
    q: 'Why did GERC allow the petitions to be amended instead of making the developers file new cases?',
    a: 'GERC\'s reasoning in both orders was the same: the liquidated-damages recovery happened after the original petitions were filed, but it is directly tied to the same core question already before the Commission — whether the delay qualifies as force majeure. Hearing it as one dispute, GERC held, avoids forcing the developers into separate litigation over what is really the same underlying controversy, and causes no prejudice to GUVNL since it still gets a full opportunity to respond to the amended claims.',
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

function Timeline({
  label,
  steps,
}: {
  label: string
  steps: { date: string; title: string; note?: string; delay?: string }[]
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">{label}</p>
      <ol className="relative mt-3 space-y-5 border-l-2 border-hairline pl-6">
        {steps.map((s) => (
          <li key={s.title} className="relative">
            <span className="absolute top-1 -left-[29px] h-3 w-3 rounded-full border-2 border-hub-news bg-paper" />
            <p className="text-xs font-semibold tabular-nums text-ash/50">{s.date}</p>
            <p className="font-display font-bold text-ink-navy">
              {s.title}
              {s.delay && (
                <span className="ml-2 rounded-full bg-caution-amber/15 px-2 py-0.5 text-xs font-semibold text-caution-amber">
                  {s.delay}
                </span>
              )}
            </p>
            {s.note && <p className="mt-0.5 text-sm text-ash/70">{s.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function GercLdDisputePage() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'News', href: '/news' },
          { label: 'GERC Wind & Solar LD Disputes', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> Gujarat · GERC · GUVNL
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚖️', big: '2', small: 'Amendments allowed, not decided', tone: 'hub' },
          { icon: '💨', big: '₹14.40cr', small: 'LD recovered, wind project', tone: 'caution-amber' },
          { icon: '☀️', big: '₹9.18cr', small: 'LD recovered, solar project', tone: 'caution-amber' },
          { icon: '📅', big: '8 & 22 Oct', small: 'Reply / rejoinder due', tone: 'hub' },
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
          On the same day, the same Gujarat Electricity Regulatory Commission bench allowed two
          renewable energy developers to add fresh facts to disputes already pending against
          Gujarat Urja Vikas Nigam Limited (GUVNL) — one over a 140 MW wind project in Amreli
          district, one over a 200 MW solar project in Aravalli district. Both disputes are about
          the same underlying question: whether project delays were genuinely beyond the
          developers&apos; control, and whether the liquidated damages GUVNL already deducted from
          their invoices should be refunded. Neither question has been answered yet — what GERC
          actually decided this time is narrower, and worth understanding precisely.
        </p>

        <section aria-labelledby="what-decided" className="mt-10 scroll-mt-20">
          <h2 id="what-decided" className={h2Cls}>
            What GERC Actually Decided
          </h2>
          <p className={pCls}>
            In two separate orders dated 23 September 2026, a GERC bench of Chairman Pankaj Joshi
            and Member Jatin N. Thakkar allowed each developer to amend its petition to formally
            add events that happened after the original petition was filed — chiefly, the
            liquidated damages GUVNL went on to recover, and each developer&apos;s resulting
            refund claim. GERC&apos;s reasoning was the same in both orders: the newly-recovered
            liquidated damages are directly connected to the force-majeure question already before
            the Commission, and hearing everything together avoids pushing the developers into a
            separate lawsuit over what is really one dispute.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Both orders are explicit that this changes nothing about the outcome. As{' '}
            <a
              href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU4MDJfMjQtMDktMjAyNl82MDcxNjY1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              GERC&apos;s own order in the wind case states
            </a>
            , the grant of amendment &ldquo;shall not, by itself, constitute an adjudication upon
            the merits of the claims of either party.&rdquo; Whether either developer is actually
            entitled to a refund — and whether GUVNL was right to deduct the money in the first
            place — is what the Commission still has to decide.
          </p>
          <p className={takeawayCls}>
            Takeaway: this is a ruling about how the cases will be heard, not about who is right —
            treat any claim that GERC has &ldquo;sided with&rdquo; either developer as premature.
          </p>
        </section>

        <section aria-labelledby="two-cases" className="mt-10 scroll-mt-20">
          <h2 id="two-cases" className={h2Cls}>
            The Two Cases, Side by Side
          </h2>
          <p className={pCls}>
            Different technology, different district, same dispute shape — a developer blaming
            weather and grid-connection delays for missing its deadline, and GUVNL recovering
            liquidated damages while that argument is still pending.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">Project Twelve Renewables (wind)</th>
                  <th className="px-4 py-2 font-semibold">Martial Solren (solar)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Capacity</td>
                  <td className="px-4 py-2">140 MW (commissioned as 141.9 MW)</td>
                  <td className="px-4 py-2">200 MW, in four 50 MW tranches</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Location</td>
                  <td className="px-4 py-2">Amreli district</td>
                  <td className="px-4 py-2">Aravalli district</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">PPA signed</td>
                  <td className="px-4 py-2">15 December 2022</td>
                  <td className="px-4 py-2">15 December 2022</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Original SCOD</td>
                  <td className="px-4 py-2">14 December 2024</td>
                  <td className="px-4 py-2">6 February 2025</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Actual commissioning</td>
                  <td className="px-4 py-2">Phased, Dec 2024 – Jun 2025</td>
                  <td className="px-4 py-2">Phased, Feb – Jul 2025</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">LD recovered by GUVNL</td>
                  <td className="px-4 py-2 tabular-nums">₹14,40,26,667</td>
                  <td className="px-4 py-2 tabular-nums">₹9,17,77,778</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Force majeure grounds cited</td>
                  <td className="px-4 py-2">Connectivity delays, heavy rain/flooding, cyclonic weather, a quarry strike</td>
                  <td className="px-4 py-2">Force majeure events cited in the main petition (extension sought on that basis)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">GUVNL&apos;s core objection</td>
                  <td className="px-4 py-2">Proceedings well advanced; connectivity was available on time; LD valid under PPA Clause 3.3</td>
                  <td className="px-4 py-2">No valid force majeure; developer admitted some delay; PPA has no interest provision on LD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Timeline
            label="Project Twelve Renewables — wind, Amreli district"
            steps={[
              { date: '14 Dec 2024', title: 'Original SCOD' },
              { date: '13 Dec 2024', title: 'Phase 1 commissioned', note: '39.6 MW', delay: 'on time' },
              { date: '11–12 Feb 2025', title: 'Phase 2 commissioned', note: '29.7 MW' },
              { date: '19 Mar 2025', title: 'Phase 3 commissioned', note: '13.2 MW' },
              { date: 'Apr–Jun 2025', title: 'Phases 4–5 commissioned', note: '59.4 MW across multiple dates' },
              { date: '23 Jun 2025', title: 'Full 141.9 MW confirmed to GUVNL' },
            ]}
          />
          <Timeline
            label="Martial Solren — solar, Aravalli district"
            steps={[
              { date: '6 Feb 2025', title: 'Original SCOD (Tranche 1)' },
              { date: '6 Feb 2025', title: 'Tranche 1 commissioned (50 MW)', delay: 'on time' },
              { date: '13 May 2025', title: 'Tranche 2 commissioned (50 MW)', delay: '96 days late' },
              { date: '3 Jul 2025', title: 'Tranche 3 commissioned (50 MW)', delay: '147 days late' },
              { date: '26 Jul 2025', title: 'Tranche 4 commissioned (50 MW) — full 200 MW', delay: '171 days late' },
            ]}
          />
          <p className={takeawayCls}>
            Takeaway: in both cases, the first tranche or phase landed on schedule — the dispute
            is entirely about what delayed the remaining capacity, and whether that delay was the
            developer&apos;s to bear.
          </p>
        </section>

        <section aria-labelledby="jargon" className="mt-10 scroll-mt-20">
          <h2 id="jargon" className={h2Cls}>
            The Jargon, Explained
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              [
                'SCOD (Scheduled Commercial Operation Date)',
                'the deadline a power purchase agreement sets for a project to actually start supplying power. It is a contractual date, fixed when the PPA is signed.',
              ],
              [
                'COD (Commercial Operation Date)',
                'the date a project actually becomes operational and starts supplying power under the PPA. When it lands after SCOD, the gap between the two is what liquidated damages get calculated against.',
              ],
              [
                'Liquidated Damages (LD)',
                'a pre-agreed penalty, set out in the PPA\'s own formula, that a developer owes for missing SCOD. DISCOMs typically recover it by deducting the amount from monthly invoices, or against the developer\'s Performance Bank Guarantee — the security deposit posted when the PPA is signed.',
              ],
              [
                'Force majeure',
                'events genuinely beyond a party\'s reasonable control — weather, regulatory delays, natural calamities — that, if a regulator accepts them, can excuse some or all of the delay past SCOD without LD liability attaching. Acceptance is never automatic: it is argued and decided case by case, on the specific facts.',
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
            Takeaway: both disputes here turn entirely on whether the cited events count as force
            majeure — everything else in the case follows from that single determination.
          </p>
        </section>

        <section aria-labelledby="consumer-link" className="mt-10 scroll-mt-20">
          <h2 id="consumer-link" className={h2Cls}>
            Why Project Delays Matter to Consumers — and Why These Two Cases Don&apos;t, Yet
          </h2>
          <p className={pCls}>
            GUVNL&apos;s cost of buying power — including the cost of covering a shortfall when a
            contracted renewable project runs late — flows through to household bills over time,
            not directly or immediately, through a mechanism called{' '}
            <strong>FPPPA (Fuel &amp; Power Purchase Price Adjustment)</strong>. GERC fixes a base
            FPPPA rate annually, averaged from prior years, and lets GUVNL recover any additional
            gap between actual and approved power-purchase cost through an incremental quarterly
            adjustment — any increase beyond 10 paise/unit needs the Commission&apos;s prior
            approval. It is a genuine, regulated pass-through mechanism, not a black box.
          </p>
          <p className={`mt-3 ${pCls}`}>
            What we could not verify is a specific, currently-in-effect FPPPA rate to quote here —
            search results returned inconsistent, unreliably-dated figures we chose not to repeat.
            More importantly: nothing in either GERC order ties these two specific disputes to any
            change in GUVNL&apos;s FPPPA rate, in either direction. The connection here is
            structural — delayed renewable capacity is one of many factors that can affect a
            DISCOM&apos;s power-purchase costs — not a claim that these two cases have moved, or
            will move, your bill.
          </p>
          <p className={takeawayCls}>
            Takeaway: understand the mechanism, but don&apos;t expect either of these cases to
            show up on your bill directly — that is not how FPPPA works, and neither order says it
            does.
          </p>
        </section>

        <section aria-labelledby="whats-next" className="mt-10 scroll-mt-20">
          <h2 id="whats-next" className={h2Cls}>
            What Happens Next
          </h2>
          <ol className="mt-3 space-y-3">
            {[
              [
                '8 October 2026',
                'GUVNL\'s consolidated reply is due in both cases, responding to each developer\'s amended petition in full.',
              ],
              [
                '22 October 2026',
                'each developer\'s rejoinder to GUVNL\'s reply is due, after which pleadings close in both matters.',
              ],
              [
                'After that',
                'GERC will schedule the main hearing in each case, where the force-majeure question — and with it, whether either refund claim succeeds — actually gets decided. Neither order gives a date for this yet.',
              ],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-news font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ol>
          <p className={takeawayCls}>
            Takeaway: the real decision is still weeks to months away — what happened on 23
            September only set the stage for how it will be argued.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/electricity/gujarat-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Gujarat Electricity Bill Calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Estimate your Gujarat electricity bill by telescopic slab.
              </p>
            </Link>
            <Link
              href="/solar/bill-calculator/mgvcl"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Gujarat Solar Bill Calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Rooftop solar payback priced on Gujarat&apos;s real tariff.
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
                How fuel/power-purchase pass-throughs like FPPPA fit into your bill.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Solar ROI Calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Payback and savings priced on your own DISCOM&apos;s tariff.
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
          Last updated: {LAST_UPDATED}. Case details are as reported in GERC&apos;s own orders
          dated 23 September 2026 (as of {DATA_AS_OF}):{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU4MDJfMjQtMDktMjAyNl82MDcxNjY1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Petition No. 2314 of 2024 (wind)
          </a>{' '}
          and{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3OTVfMjQtMDktMjAyNl8zODE0NjMy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Petition No. 2460 of 2025 (solar)
          </a>
          . Also reported by{' '}
          <a
            href="https://solarquarter.com/2026/09/29/gerc-allows-amendment-in-140-mw-wind-project-dispute-over-liquidated-damages-in-gujarat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            SolarQuarter (29 Sep 2026)
          </a>{' '}
          and{' '}
          <a
            href="https://solarquarter.com/2026/09/30/gerc-allows-amendment-in-liquidated-damages-dispute-over-200-mw-solar-project-in-gujarat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            SolarQuarter (30 Sep 2026)
          </a>
          , both by Mohan Gupta. Neither dispute has been decided on merits — both are at the
          pleadings stage, with GUVNL&apos;s reply due 8 October 2026 and each developer&apos;s
          rejoinder due 22 October 2026. The current FPPPA rate could not be verified from a
          reliably-dated source as of this writing and is deliberately not quoted above — see our{' '}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
