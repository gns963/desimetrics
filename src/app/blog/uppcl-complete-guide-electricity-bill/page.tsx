import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/uppcl-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to UPPCL Electricity Bill'
const DESCRIPTION =
  'Every verified UPPCL tariff slab, fixed charge, meter rent, true-up and duty rate in one reference page — domestic, commercial, industrial and agriculture tables, a worked example, and how to check and pay your UP electricity bill.'
const PROSE_LAST_REVIEWED = '11 September 2026'
const TARIFF_DATA_REFRESHED = '29 August 2026'

export const metadata: Metadata = {
  title: 'UPPCL Complete Bill Guide — Tariff Slabs, Charges & Duty 2026',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Blog', path: '/blog' },
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
  datePublished: '2026-09-11',
  dateModified: '2026-09-11',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'UPPCL residential (LMV-1) tariff slabs',
  description: 'Telescopic urban domestic electricity tariff slabs for Uttar Pradesh (UPPCL), effective 1 April 2025.',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://uppcl.org/site/writereaddata/siteContent/202511241802081345Press%20English%20FY%202025%2026.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://www.uperc.org/App_File/UPPCLTariffOrderFY2025-26-pdf1122202564623PM.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'How is my UPPCL electricity bill calculated?',
    a: "Your urban domestic UPPCL bill adds a telescopic slab-based energy charge (four bands from ₹5.50 to ₹7.00/unit), a fixed charge of ₹110 per kW of sanctioned load, a ₹20 meter rent, a ₹0.15/unit regulatory true-up, and 5% electricity duty on the energy charge.",
  },
  {
    q: "What are UPPCL's current domestic (LMV-1) tariff slabs?",
    a: '₹5.50/unit for the first 150 units, ₹6.00/unit for 151–300, ₹6.50/unit for 301–500, and ₹7.00/unit above 500 — each band billed only on the units within it. These are urban LMV-1 rates, effective from 1 April 2025; rural domestic rates differ and aren\'t covered here.',
  },
  {
    q: 'What is the fixed charge on a UPPCL bill based on?',
    a: "It's ₹110 per kW of your sanctioned load per month for domestic connections — so a 2kW connection pays ₹220 in fixed charges before a single unit is billed. Commercial, industrial and agricultural connections have their own separate per-kW rates.",
  },
  {
    q: 'Does UPPCL charge a fuel/power-purchase adjustment?',
    a: "Yes — a ₹0.15/unit regulatory true-up applies to every unit of domestic consumption, on top of the energy and fixed charges. This is UPPCL's version of the fuel-cost-adjustment mechanism most Indian DISCOMs use.",
  },
  {
    q: 'What is the electricity duty rate in Uttar Pradesh?',
    a: "5% on the energy charge for domestic supply — notably lower than several other states (Maharashtra, for comparison, charges 16%). It's a state government tax, not a charge UPPCL sets or keeps.",
  },
  {
    q: 'How do I check my UPPCL bill online?',
    a: 'Visit the official UPPCL consumer portal at consumer.uppcl.org, or your local subsidiary\'s app (for example KESCO\'s app in Kanpur), and enter your Account/Consumer ID to view your current bill.',
  },
  {
    q: 'How do I pay my UPPCL bill?',
    a: 'Pay through the same consumer portal or your local subsidiary\'s app via UPI, card or net banking, and save the receipt. For billing queries, UPPCL\'s helpline is 1800-180-8752 or 1912.',
  },
  {
    q: 'Do PuVVNL, MVVNL, PVVNL, DVVNL and KESCO charge different rates?',
    a: "No. All five UPPCL subsidiaries — covering different regions of Uttar Pradesh, including KESCO for Kanpur specifically — bill on the exact same UPERC-approved tariff. Which one appears on your bill depends only on where you live, not on the rate you pay.",
  },
  {
    q: 'How often does UPPCL revise its tariff rates?',
    a: "Tariffs are revised periodically by the Uttar Pradesh Electricity Regulatory Commission (UPERC), typically through an annual tariff order — the current slabs took effect 1 April 2025. Check the calculator above or UPPCL's official portal for the current rate before relying on older figures.",
  },
  {
    q: 'Where can I find my exact UPPCL bill amount for my own usage?',
    a: 'Use our UPPCL bill calculator, which applies these same verified slabs, fixed charge, meter rent, true-up and duty to your own units and sanctioned load for an itemised estimate.',
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

const categoryRows: [string, string][] = [
  ['Residential (LMV-1, urban)', 'Households on the urban domestic schedule — the category this guide\'s worked example uses'],
  ['Commercial (LMV-2, up to 4kW)', 'Shops, offices and small businesses on a contracted load up to 4kW'],
  ['Industrial (LMV-6, under 100 HP / 75kW)', 'Small and medium power connections outside the Rural Schedule'],
  ['Agriculture (LMV-5, urban schedule)', 'Metered private tubewells/pumping sets on the urban (non-subsidized) schedule only'],
]

const domesticSlabs: [string, string][] = [
  ['0–150 units', '₹5.50'],
  ['151–300 units', '₹6.00'],
  ['301–500 units', '₹6.50'],
  ['501+ units', '₹7.00'],
]

const otherCategoryRows: [string, string, string][] = [
  ['Commercial (LMV-2, up to 4kW)', '₹7.50 (0–300 units), ₹8.40 (301+)', '₹330/kW'],
  ['Industrial (LMV-6, <100 HP)', '₹7.30 flat', '₹290/kW'],
  ['Agriculture (LMV-5, urban)', '₹6.50 flat (before cross-subsidy adjustment)', '≈₹174/kW (₹130/BHP)'],
]

const fixedChargeRows: [string, string, string][] = [
  ['Residential', 'Per sanctioned load', '₹110/kW'],
  ['Commercial (up to 4kW)', 'Per sanctioned load', '₹330/kW'],
  ['Industrial (under 100 HP)', 'Per sanctioned load', '₹290/kW'],
  ['Agriculture (urban schedule)', 'Per sanctioned load (billed per BHP)', '≈₹174/kW'],
]

const workedExample250: [string, string][] = [
  ['Units consumed', '250'],
  ['Sanctioned load (assumed)', '2 kW'],
  ['Slab 1: 0–150 units @ ₹5.50', '₹825.00'],
  ['Slab 2: 100 units (151–250) @ ₹6.00', '₹600.00'],
  ['Energy charge subtotal', '₹1,425.00'],
  ['Fixed charge (2 kW × ₹110)', '₹220.00'],
  ['Meter rent', '₹20.00'],
  ['Regulatory true-up (250 × ₹0.15)', '₹37.50'],
  ['Electricity duty (5% of energy charge)', '₹71.25'],
  ['Estimated total', '₹1,773.75'],
]

export default function UppclCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'UPPCL Complete Guide', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📋</span> Complete Reference Guide
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          By{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · Prose last reviewed {PROSE_LAST_REVIEWED} · Tariff data refreshed against
          our own verified records on {TARIFF_DATA_REFRESHED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>UPPCL</strong> (Uttar Pradesh Power Corporation Ltd) distributes
          electricity across Uttar Pradesh through five regional subsidiaries —
          PuVVNL, MVVNL, PVVNL, DVVNL and KESCO — all billing on the same tariff
          approved by the <strong>Uttar Pradesh Electricity Regulatory Commission
          (UPERC)</strong>. A typical urban domestic UPPCL bill combines a
          telescopic slab-based energy charge, a fixed charge tied to your
          sanctioned load, a ₹20 meter rent, a ₹0.15/unit regulatory true-up, and 5%
          electricity duty. This guide covers the urban schedule only — rural
          domestic, and the heavily-subsidized rural agricultural schedule, are
          genuinely different and flagged separately below.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            UPPCL bills consumers <strong>monthly</strong>. It was incorporated on
            30 November 1999 and began operating 15 January 2000, when the Uttar
            Pradesh State Electricity Board (UPSEB) was unbundled into UPPCL
            (transmission and distribution) and separate generation companies.
            UPPCL itself doesn&apos;t bill consumers directly — that&apos;s done by
            five regional subsidiaries, each covering a different part of the state
            but all on the exact same UPERC-approved tariff:
          </p>
          <ul className="mt-3 space-y-1.5 pl-5 text-ash/80" style={{ listStyleType: 'disc' }}>
            <li>Purvanchal Vidyut Vitran Nigam (PuVVNL)</li>
            <li>Madhyanchal Vidyut Vitran Nigam (MVVNL) — includes Lucknow</li>
            <li>Paschimanchal Vidyut Vitran Nigam (PVVNL)</li>
            <li>Dakshinanchal Vidyut Vitran Nigam (DVVNL)</li>
            <li>Kanpur Electricity Supply Company (KESCO) — Kanpur Municipal Corporation area only</li>
          </ul>
          <p className={`mt-3 ${pCls}`}>
            Whichever of these five names appears on your bill, the rates in this
            guide apply the same way — only your local office, portal experience
            and customer service differ by subsidiary.
          </p>
          <p className={takeawayCls}>
            Takeaway: &ldquo;UPPCL&rdquo; is the umbrella tariff, but your actual
            bill and payment portal come from one of five subsidiaries depending on
            where you live.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers four UPPCL consumer categories, each
            with its own UPERC rate schedule:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 font-semibold">Who it covers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {categoryRows.map(([cat, desc]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: every category here is the urban schedule specifically — UPPCL
            runs separate rural schedules for several of these that this guide
            doesn&apos;t model.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic (LMV-1) Tariff Slabs
          </h2>
          <p className={pCls}>
            UPPCL bills urban domestic consumption through four telescopic slabs,
            effective 1 April 2025:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Slab</th>
                  <th className="px-4 py-2 text-right font-semibold">Rate/unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {domesticSlabs.map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            See{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic slabs work
            </Link>{' '}
            for the general mechanic — only the units inside each band cost that
            band&apos;s rate. This is the <strong>urban</strong> schedule; UP&apos;s
            rural domestic tariff is separate and not modelled here. Plug your own
            units into the{' '}
            <Link href="/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL bill calculator
            </Link>{' '}
            for an instant, itemised estimate.
          </p>
          <p className={takeawayCls}>
            Takeaway: the first 150 units always cost ₹5.50 each, no matter how much
            more you use that month.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial, Industrial and Agriculture Tariffs
          </h2>
          <p className={pCls}>
            These three categories are primary-sourced directly from UPERC&apos;s
            FY2025-26 tariff order, but each covers one specific band or schedule —
            read the caveat under each before assuming it applies to your
            connection:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 font-semibold">Rate/unit</th>
                  <th className="px-4 py-2 text-right font-semibold">Fixed charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {otherCategoryRows.map(([cat, rate, fixed]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{rate}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{fixed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            <strong>Commercial caveat:</strong> the ₹7.50/₹8.40 rate applies only up
            to a 4kW contracted load. Above 4kW, UPPCL charges ₹450/kW fixed and a
            different energy schedule (₹7.50/unit up to 1,000 units, then ₹8.75) —
            not modelled here. A seasonal minimum charge (₹600/kW April–September,
            ₹475/kW October–March) also isn&apos;t modelled.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Industrial caveat:</strong> a time-of-day surcharge or rebate of
            ±15% on the energy charge applies during specified peak/off-peak
            windows, and a 7.5% Rural Schedule rebate exists for eligible
            connections — neither is modelled here.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Agriculture caveat — the most important one on this page:</strong>{' '}
            the ₹6.50/unit rate above is the <em>urban</em>, non-subsidized schedule.
            Most UP private tubewell connections are actually billed under the
            heavily government-subsidized <strong>Rural Schedule</strong>, where the
            real payable rate is only around <strong>₹70/BHP/month fixed plus
            ₹2.00/unit</strong> — dramatically cheaper. If you&apos;re a typical
            rural agricultural consumer, the figures in this table will
            significantly <em>overstate</em> your actual bill. Also, even on the
            urban schedule shown here, UPPCL&apos;s cross-subsidy adjustment reduces
            the real payable energy rate to ₹6.00/unit, not ₹6.50 — not reflected in
            the table above.
          </p>
          <p className={takeawayCls}>
            Takeaway: if you&apos;re on a subsidized rural agricultural connection,
            ignore the agriculture row above entirely — your real bill is
            substantially lower.
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            Fixed Charges by Category
          </h2>
          <p className={pCls}>
            Unlike DISCOMs that charge a flat monthly fixed fee, every UPPCL
            category here bills its fixed charge <strong>per kW (or per BHP) of
            sanctioned load</strong> — so a larger connection costs more in fixed
            charges even at zero consumption:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 font-semibold">Basis</th>
                  <th className="px-4 py-2 text-right font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {fixedChargeRows.map(([cat, basis, rate]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{basis}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            Domestic connections also carry a separate <strong>₹20/month meter
            rent</strong>, itemized independently from the fixed charge.
          </p>
          <p className={takeawayCls}>
            Takeaway: a higher sanctioned load raises your fixed charge every month,
            whether or not you actually use more power — right-sizing your
            sanctioned load matters here more than on a flat-fixed-charge DISCOM.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            The Regulatory True-Up (UPPCL&apos;s Fuel Adjustment)
          </h2>
          <p className={pCls}>
            UPPCL applies a <strong>₹0.15 per unit regulatory true-up</strong> on
            top of the energy and fixed charges — this is UPPCL&apos;s version of
            the fuel/power-purchase adjustment mechanism most Indian DISCOMs use.
            For the general mechanism behind a charge like this — why it exists and
            why it can move independently of your usage — see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>
            .
          </p>
          <p className={`mt-3 ${pCls}`}>
            Unlike some DISCOMs where this adjustment isn&apos;t modelled at all in
            our data, UPPCL&apos;s ₹0.15/unit figure is verified and included in the
            calculator and worked example below — though as with any true-up
            mechanism, confirm the current rate against UPPCL&apos;s latest tariff
            order, since it&apos;s designed to be reviewed periodically.
          </p>
          <p className={takeawayCls}>
            Takeaway: at ₹0.15/unit, this line is small relative to the energy
            charge for most households, but it applies to every unit you use,
            unlike the flat fixed charge.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty
          </h2>
          <p className={pCls}>
            Electricity duty is a <strong>Uttar Pradesh state government tax</strong>{' '}
            collected on your bill, not a charge UPPCL sets or keeps. For domestic
            supply, it&apos;s <strong>5% of the energy charge</strong> — notably
            lower than several other states; Maharashtra&apos;s MSEDCL, for
            comparison, charges 16% on the same basis. See our{' '}
            <Link href="/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL complete guide
            </Link>{' '}
            for that comparison in full — and unlike either state, BESCOM and
            WBSEDCL both have an unverified duty rate rather than a confirmed one,
            per our{' '}
            <Link href="/blog/bescom-complete-guide-electricity-bill" className="text-brass underline">
              BESCOM
            </Link>{' '}
            and{' '}
            <Link href="/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL
            </Link>{' '}
            complete guides.
          </p>
          <p className={takeawayCls}>
            Takeaway: UP&apos;s 5% duty is genuinely light by Indian standards — a
            meaningful chunk of your total bill in a high-duty state like
            Maharashtra barely registers here.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your UPPCL Bill
          </h2>
          <p className={pCls}>
            The general path, via UPPCL&apos;s own portal (exact screens can change
            over time):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Visit the UPPCL consumer portal at consumer.uppcl.org, or your local subsidiary’s app (for example KESCO’s app in Kanpur).',
              'Enter your Account/Consumer ID to fetch your current bill.',
              'Verify the amount shown and pay via UPI, card or net banking.',
              'Save the payment receipt for your records.',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-electricity font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={`mt-4 ${pCls}`}>
            For billing queries or disputes, UPPCL&apos;s helpline is{' '}
            <strong>1800-180-8752 or 1912</strong> — this guide and our calculator
            are estimation tools, not a substitute for your actual bill or the
            official portal for account-specific issues.
          </p>
          <p className={takeawayCls}>
            Takeaway: for anything account-specific, contact your local subsidiary
            (PuVVNL, MVVNL, PVVNL, DVVNL or KESCO) directly rather than a generic
            statewide number.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: 250 Units, Domestic Connection
          </h2>
          <p className={pCls}>
            Using the verified slabs above, here&apos;s the full calculation for a
            domestic connection using 250 units in a month, assuming a 2kW
            sanctioned load:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample250.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample250.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample250.length - 1
                          ? 'font-display font-bold text-hub-electricity'
                          : 'text-ink-navy'
                      }`}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            A different sanctioned load changes only the fixed-charge line — a 4kW
            connection, for example, would pay ₹440 instead of ₹220 there, with
            everything else unchanged. Your real bill may also include
            account-specific items like arrears or a previous balance not modelled
            here. Run your own exact units and sanctioned load, including any
            category other than domestic, on the{' '}
            <Link href="/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: at 250 units on a 2kW connection, the fixed charge, meter rent
            and true-up together add up to almost as much as the electricity duty —
            none of them move with your consumption the way the energy charge does.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/electricity/uppcl-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                UPPCL bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Your own itemised estimate, priced on these verified slabs.
              </p>
            </Link>
            <Link
              href="/blog/msedcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                MSEDCL complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                See how Maharashtra&apos;s much higher duty rate compares.
              </p>
            </Link>
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How telescopic electricity slabs work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The general mechanic behind UPPCL&apos;s four bands.
              </p>
            </Link>
            <Link
              href="/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Fixed charges vs FCA explained
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Why your bill moves even when your units don&apos;t.
              </p>
            </Link>
            <Link
              href="/blog/bescom-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                BESCOM complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                See Karnataka&apos;s Gruha Jyothi free-units scheme.
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
          Prose last reviewed: {PROSE_LAST_REVIEWED}. Tariff data refreshed against
          our own verified records on {TARIFF_DATA_REFRESHED}, sourced from the{' '}
          <a
            href="https://www.uperc.org/App_File/UPPCLTariffOrderFY2025-26-pdf1122202564623PM.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            UPERC Tariff Order for UPPCL DISCOMs, FY2025-26
          </a>
          , effective 1 April 2025. Commercial, industrial and agriculture figures
          cover only the specific band/schedule stated above — higher commercial
          loads, time-of-day industrial adjustments, and the subsidized rural
          agricultural schedule are explicitly not modelled pending further sourcing.
          Rates are revised periodically — the calculator above is kept current;
          treat this article as the explanatory reference alongside it. See our{' '}
          <Link href="/methodology" className="text-brass underline">
            methodology
          </Link>{' '}
          for how we source and verify tariff data across this site.
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
