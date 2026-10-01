import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gerc-additional-surcharge-open-access-gujarat'
const TITLE = 'Gujarat Open Access Additional Surcharge Set at ₹0.99/kWh: What It Means for Businesses (Oct 2026–Mar 2027)'
const DESCRIPTION =
  'GERC has fixed the additional surcharge for open access consumers of DGVCL, MGVCL, PGVCL and UGVCL at ₹0.99/kWh for 1 October 2026 to 31 March 2027. This affects commercial and industrial open access users only — household bills are untouched.'
const LAST_UPDATED = '1 October 2026'
const ORDER_DATE = '10 September 2026'

export const metadata: Metadata = {
  title: 'Gujarat Open Access Additional Surcharge ₹0.99/kWh (Oct 2026–Mar 2027)',
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
  datePublished: '2026-10-01',
  dateModified: '2026-10-01',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'Does this additional surcharge affect my home electricity bill?',
    a: 'No. The additional surcharge applies only to open access consumers — commercial and industrial users who buy electricity from a source other than their own distribution company. Household consumers on a normal DGVCL, MGVCL, PGVCL or UGVCL connection do not pay it, and nothing in this order changes a domestic tariff.',
  },
  {
    q: 'What is the additional surcharge, and why does it exist?',
    a: 'It is a charge under Section 42(4) of the Electricity Act, 2003 that compensates a distribution company for fixed costs it still has to pay on long-term generation capacity it contracted to serve consumers who have since moved to open access. The DISCOM keeps a universal obligation to supply, so it cannot simply cancel that capacity when a large consumer buys power elsewhere.',
  },
  {
    q: 'How much is it, and for how long?',
    a: '₹0.99 per kWh, applicable from 1 October 2026 to 31 March 2027, for open access consumers of DGVCL, MGVCL, PGVCL and UGVCL. It was fixed by GERC Order No. 05 of 2026 dated 10 September 2026 and is revised every six months.',
  },
  {
    q: 'How did GERC arrive at ₹0.99?',
    a: 'Working from GUVNL data for 1 October 2025 to 31 March 2026: of 96,129 MU available energy, 63,110 MU was scheduled for the general body of consumers, leaving 33,018 MU stranded. Of the ₹8,193 crore fixed cost paid for tied-up capacity, ₹2,814 crore was attributable to stranded capacity. Against 1,630 MU of open access energy, the stranded fixed cost attributable to open access worked out to ₹215 crore, reduced by ₹53 crore already recovered through demand charges, leaving ₹162 crore. Dividing ₹162 crore by 1,630 MU gives ₹0.99 per unit.',
  },
  {
    q: 'Is the surcharge going up or down?',
    a: 'It moves every six months. Across the last five periods it has run ₹0.93 (Oct 2024–Mar 2025), ₹0.82 (Apr–Sep 2025), ₹1.00 (Oct 2025–Mar 2026), ₹0.76 (Apr–Sep 2026) and now ₹0.99. The October–March half has been higher than the April–September half in each of the last three years, though GERC does not state a reason for that pattern in the order.',
  },
  {
    q: 'How is the additional surcharge different from cross-subsidy surcharge?',
    a: 'They have separate legal bases and purposes. Cross-subsidy surcharge, under Section 42(2), compensates the DISCOM for the cross-subsidy it loses when a paying consumer leaves. Additional surcharge, under Section 42(4), covers the DISCOM\'s stranded fixed cost from its continuing obligation to supply. An open access consumer may face both, plus transmission, wheeling and standby charges.',
  },
  {
    q: 'Who is eligible for open access in the first place?',
    a: 'The Electricity Act sets the threshold at 1 MW of contracted demand or sanctioned load. For green energy open access, the Electricity (Promoting Renewable Energy Through Green Energy Open Access) Rules, 2022 reduced it to 100 kW, with no minimum for captive consumers.',
  },
  {
    q: 'Is anyone exempt from the additional surcharge?',
    a: 'Under the national Green Energy Open Access Rules, 2022, additional surcharge is not applicable to power from waste-to-energy plants, to green hydrogen and green ammonia production, or where the consumer is already paying fixed charges — though the Rules do not define "fixed charges". Those are central rules; this GERC order itself records no exemption, and we have not verified how GERC applies them in Gujarat. Confirm your own position with your DISCOM or adviser rather than assuming an exemption applies.',
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

/** Proportional band for the final netting step — the site's segmented-band
 *  visual language (see WaterSlabBand), not a card grid. */
function CostBand() {
  const net = 162
  const recovered = 53
  const total = net + recovered
  const seg = [
    { label: 'Recoverable from open access users', value: net, cls: 'bg-hub-news' },
    { label: 'Already recovered via demand charges', value: recovered, cls: 'bg-hub-news/40' },
  ]
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">
        ₹215 crore stranded fixed cost attributable to open access, split
      </p>
      <div
        className="mt-2 flex h-14 w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-hairline"
        role="group"
        aria-label="Split of the Rs 215 crore stranded fixed cost"
      >
        {seg.map((s) => (
          <div
            key={s.label}
            style={{ width: `${(s.value / total) * 100}%` }}
            className={`flex flex-col items-center justify-center px-1 text-center ${s.cls}`}
          >
            <span className="font-display text-sm font-bold tabular-nums text-white">
              ₹{s.value} cr
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ash/60">
        {seg.map((s) => (
          <span key={s.label}>
            <span className="font-semibold text-ink-navy">{s.label}:</span> ₹{s.value} cr
          </span>
        ))}
      </div>
    </div>
  )
}

export default function GercAdditionalSurchargePage() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'News', href: '/news' },
          { label: 'Gujarat Open Access Surcharge', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> Gujarat · GERC · Open Access
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚡', big: '₹0.99/kWh', small: 'Additional surcharge', tone: 'caution-amber' },
          { icon: '📅', big: '1 Oct – 31 Mar', small: 'Validity period', tone: 'hub' },
          { icon: '🏭', big: 'C&I only', small: 'Households unaffected', tone: 'hub' },
          { icon: '📈', big: 'from ₹0.76', small: 'Previous half-year', tone: 'hub' },
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
          <strong>If you are a household consumer, this does not affect you.</strong> The Gujarat
          Electricity Regulatory Commission has set the <strong>additional surcharge</strong> for{' '}
          <strong>open access</strong> consumers at <strong>₹0.99 per kWh</strong>, applicable from{' '}
          <strong>1 October 2026 to 31 March 2027</strong>. It is paid only by commercial and
          industrial consumers of DGVCL, MGVCL, PGVCL and UGVCL who buy their power from a source
          other than their own distribution company. Domestic tariffs are untouched by this order.
        </p>

        <section aria-labelledby="in-brief" className="mt-10 scroll-mt-20">
          <h2 id="in-brief" className={h2Cls}>
            The Decision in Brief
          </h2>
          <p className={pCls}>
            In{' '}
            <a
              href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3NjVfMTEtMDktMjAyNl8zMTgwNzg5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              Order No. 05 of 2026
            </a>
            , dated {ORDER_DATE}, a GERC bench of Chairman Pankaj Joshi with Members Hiren Shah and
            Jatin N. Thakkar fixed the additional surcharge at ₹0.99/kWh for the six months
            beginning 1 October 2026. The surcharge is reset every six months under a methodology
            GERC revised in its order of 30 August 2022: GUVNL submits operational data certified
            by the State Load Despatch Centre and a Chartered Accountant within 90 days of each
            half-year, and that data sets the rate for the corresponding half of the following
            year. This determination used data for 1 October 2025 to 31 March 2026.
          </p>
          <p className={takeawayCls}>
            Takeaway: this is a routine six-monthly reset, not a new charge — what changes is the
            rate, and it changes on a fixed schedule you can plan around.
          </p>
        </section>

        <section aria-labelledby="who-pays" className="mt-10 scroll-mt-20">
          <h2 id="who-pays" className={h2Cls}>
            Who Pays It — and Who Doesn&apos;t
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              [
                'Pays: open access consumers of the four state DISCOMs',
                'commercial and industrial consumers of DGVCL, MGVCL, PGVCL or UGVCL who source power through open access from anywhere other than their own DISCOM, for the stated six-month window.',
              ],
              [
                'Does not pay: every household consumer',
                'a domestic connection is supplied by its DISCOM, not through open access, so the additional surcharge never enters a home bill. Nothing in this order alters domestic slabs, fixed charges or electricity duty.',
              ],
              [
                'Does not pay: ordinary C&I consumers on DISCOM supply',
                'a business that simply buys from its own DISCOM is not an open access consumer and is outside this order entirely.',
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
            Takeaway: the charge follows the decision to buy power outside your DISCOM — it is not
            a general tariff change.
          </p>
        </section>

        <section aria-labelledby="stranded" className="mt-10 scroll-mt-20">
          <h2 id="stranded" className={h2Cls}>
            What &ldquo;Stranded Capacity&rdquo; Actually Means
          </h2>
          <p className={pCls}>
            A distribution company signs long-term agreements for generation capacity years ahead,
            sized to the demand it expects to serve. It pays a fixed charge on that capacity whether
            or not the power is drawn. When a large consumer shifts to open access, the DISCOM
            loses the sale but keeps the obligation: it still pays for the contracted capacity, and
            it must still stand ready to supply that consumer if they come back.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Capacity that is contracted and paid for but not scheduled is described as{' '}
            <strong>stranded</strong>. The additional surcharge is the mechanism, under Section
            42(4) of the Electricity Act, 2003, for recovering the share of that stranded fixed cost
            which is attributable to open access, so it is not instead borne by the consumers who
            stayed.
          </p>
          <p className={takeawayCls}>
            Takeaway: the charge is about fixed costs that do not disappear when a consumer leaves
            — not a penalty for choosing open access.
          </p>
        </section>

        <section aria-labelledby="calculation" className="mt-10 scroll-mt-20">
          <h2 id="calculation" className={h2Cls}>
            How GERC Arrived at ₹0.99
          </h2>
          <p className={pCls}>
            The order sets the full chain out in an annexure. Working from GUVNL&apos;s certified
            data for 1 October 2025 to 31 March 2026:
          </p>
          <ol className="mt-3 space-y-3">
            {[
              [
                'Start with available energy',
                '96,129 MU was available over the six months, of which 63,110 MU was scheduled to meet the requirement of the general body of consumers.',
              ],
              [
                'Net off network losses',
                'applying 12.06% T&D losses, 55,497 MU actually reached those consumers. GERC used 12.06% — the normative loss approved for FY 2025-26 — because it is lower than the 12.77% trued-up figure for FY 2024-25.',
              ],
              [
                'Identify stranded generation',
                'available energy minus scheduled energy leaves 33,018 MU of stranded generation.',
              ],
              [
                'Price the stranded capacity',
                'GUVNL paid ₹8,193 crore in fixed costs for long-term tied-up capacity; the share attributable to stranded capacity is ₹2,814 crore.',
              ],
              [
                'Work out the open access share',
                '1,630 MU was scheduled for open access consumers at the DISCOM periphery, treated as directly attributable. Apportioning the balance proportionately adds 895 MU, for 2,525 MU attributable to open access in total.',
              ],
              [
                'Convert to money',
                'at ₹0.85 per unit of available energy, the stranded fixed cost attributable to open access is ₹215 crore.',
              ],
              [
                'Deduct what is already recovered',
                '₹606 crore had already been collected from open access consumers through demand charges; the network-related portion of that, 8.77%, comes to ₹53 crore and is set off — leaving ₹162 crore recoverable.',
              ],
              [
                'Divide to get the rate',
                '₹162 crore divided by 1,630 MU gives ₹0.99 per kWh. Note the divisor: GERC divides by the 1,630 MU directly attributable to open access, not the wider 2,525 MU figure — dividing by that instead would have produced roughly ₹0.64.',
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

          <CostBand />

          <p className={takeawayCls}>
            Takeaway: every step is published in the order&apos;s annexure, so a business can
            reconcile the rate itself rather than take it on trust.
          </p>
        </section>

        <section aria-labelledby="trend" className="mt-10 scroll-mt-20">
          <h2 id="trend" className={h2Cls}>
            How It Compares With Earlier Periods
          </h2>
          <p className={pCls}>
            Because the rate is reset twice a year off a moving data window, it has swung
            noticeably. Every figure below is taken from GERC&apos;s own orders:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Period</th>
                  <th className="px-4 py-2 font-semibold">GERC order</th>
                  <th className="px-4 py-2 text-right font-semibold">Additional surcharge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['1 Oct 2024 – 31 Mar 2025', '07/2024', '₹0.93'],
                  ['1 Apr 2025 – 30 Sep 2025', '01/2025', '₹0.82'],
                  ['1 Oct 2025 – 31 Mar 2026', '04/2025', '₹1.00'],
                  ['1 Apr 2026 – 30 Sep 2026', '02 of 2026', '₹0.76'],
                  ['1 Oct 2026 – 31 Mar 2027', '05 of 2026', '₹0.99'],
                ].map(([p, o, r], i, arr) => (
                  <tr key={p} className={i === arr.length - 1 ? 'bg-brass/5' : undefined}>
                    <td className="px-4 py-2">{p}</td>
                    <td className="px-4 py-2 text-ash/70">{o}</td>
                    <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                      {r}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            In each of the last three years the October–March half has carried a higher surcharge
            than the April–September half. The orders do not state a reason for that pattern, so
            treat it as an observed regularity worth planning around rather than a rule.
          </p>
          <p className={takeawayCls}>
            Takeaway: a business modelling open access economics should budget for a rate that
            moves every six months, not a fixed number.
          </p>
        </section>

        <section aria-labelledby="charge-types" className="mt-10 scroll-mt-20">
          <h2 id="charge-types" className={h2Cls}>
            Additional Surcharge vs Cross-Subsidy Surcharge vs Other Charges
          </h2>
          <p className={pCls}>
            These are routinely confused, but they are separate charges with separate legal bases:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Charge</th>
                  <th className="px-4 py-2 font-semibold">Basis</th>
                  <th className="px-4 py-2 font-semibold">What it compensates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Additional surcharge</td>
                  <td className="px-4 py-2 text-ash/70">Section 42(4)</td>
                  <td className="px-4 py-2">The DISCOM&apos;s stranded fixed cost from its continuing obligation to supply</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Cross-subsidy surcharge (CSS)</td>
                  <td className="px-4 py-2 text-ash/70">Section 42(2)</td>
                  <td className="px-4 py-2">The cross-subsidy the DISCOM loses when a subsidising consumer leaves</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Transmission &amp; wheeling charges</td>
                  <td className="px-4 py-2 text-ash/70">Open access regulations</td>
                  <td className="px-4 py-2">Use of the transmission and distribution network to carry the power</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Standby charges</td>
                  <td className="px-4 py-2 text-ash/70">Open access regulations</td>
                  <td className="px-4 py-2">Keeping DISCOM supply available as backup</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            Eligibility differs too. The Electricity Act sets open access at 1 MW of contracted
            demand or sanctioned load; the Electricity (Promoting Renewable Energy Through Green
            Energy Open Access) Rules, 2022 lowered it to 100 kW for green energy open access, with
            no minimum for captive consumers. Those Rules also provide that additional surcharge
            does not apply to waste-to-energy, to green hydrogen and green ammonia production, or
            where the consumer is already paying fixed charges — though the Rules leave &ldquo;fixed
            charges&rdquo; undefined. Those are central rules; this GERC order records no exemption
            of its own, and we have not verified how GERC applies them in Gujarat.
          </p>
          <p className={takeawayCls}>
            Takeaway: ₹0.99/kWh is one line in a stack — compare total delivered cost, not this
            number alone.
          </p>
        </section>

        <section aria-labelledby="what-it-means" className="mt-10 scroll-mt-20">
          <h2 id="what-it-means" className={h2Cls}>
            What It Means If You Are Weighing Open Access
          </h2>
          <p className={pCls}>
            The practical effect is a known, dated addition to the delivered cost of open access
            power for six months. An illustrative example, using a round figure rather than any
            real consumer:
          </p>
          <div className="mt-4 rounded-xl border border-l-4 border-hairline border-l-brass bg-paper p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              Illustrative only
            </p>
            <p className={`mt-2 ${pCls}`}>
              A plant drawing <strong>1,00,000 units a month</strong> through open access would pay
              an extra <strong>₹99,000 per month</strong> at ₹0.99/kWh — about{' '}
              <strong>₹5.94 lakh</strong> across the full 1 October 2026 to 31 March 2027 window.
            </p>
            <p className="mt-2 text-xs text-ash/50">
              This is arithmetic on the notified rate, not a quote. Your actual position depends on
              your contracted demand, the other open access charges above, and your own tariff
              category.
            </p>
          </div>
          <p className={`mt-4 ${pCls}`}>
            Because the rate resets on 1 April 2027 off a fresh data window, a procurement decision
            taken today should be stress-tested against a range rather than a single number — the
            last five determinations have spanned ₹0.76 to ₹1.00.
          </p>
          <p className={takeawayCls}>
            Takeaway: the honest comparison is open access delivered cost, inclusive of all
            surcharges, against your DISCOM tariff for the same period.
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
                Estimate a Gujarat bill on the real published tariff.
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
                Rooftop solar payback priced on Gujarat&apos;s own tariff.
              </p>
            </Link>
            <Link
              href="/news/gerc-liquidated-damages-wind-solar-gujarat"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ⚖️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                GERC Wind &amp; Solar LD Disputes
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Another live GERC matter involving GUVNL and renewable developers.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Solar ROI Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Payback on your own DISCOM&apos;s tariff, if you are comparing options.
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
          Last updated: {LAST_UPDATED}. Figures are taken from GERC&apos;s own{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3NjVfMTEtMDktMjAyNl8zMTgwNzg5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Order No. 05 of 2026
          </a>{' '}
          dated {ORDER_DATE} and its Annexure A, and the earlier rates from the corresponding GERC
          orders for each period; we re-computed the full chain and it reconciles within rounding.
          Also reported by{' '}
          <a
            href="https://energetica-india.net/news/gujarat-sets-additional-surcharge-at-inr-0-99-per-kwh-for-open-access-consumers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Energetica India
          </a>
          . Note that the order is dated {ORDER_DATE}; later dates seen in trade coverage are
          publication dates. Gujarat&apos;s current cross-subsidy surcharge is set inside each
          DISCOM&apos;s annual tariff order rather than published as a standalone figure, so no CSS
          number is quoted here. This is general information for context, not tariff or legal
          advice — confirm your own charges with your DISCOM. See our{' '}
          <Link href="/methodology" className="text-brass underline">
            methodology
          </Link>{' '}
          for how we source and verify figures.
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
