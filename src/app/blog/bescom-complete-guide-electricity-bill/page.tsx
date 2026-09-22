import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/bescom-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to BESCOM Electricity Bill'
const DESCRIPTION =
  "Every verified BESCOM tariff slab, the Gruha Jyothi free-units rule, the KERC surcharge and fixed charges in one reference page — domestic, commercial, industrial and agriculture tables, two worked examples, and how to check and pay your Bangalore electricity bill."
const PROSE_LAST_REVIEWED = '16 September 2026'
const TARIFF_DATA_REFRESHED = '29 August 2026'

export const metadata: Metadata = {
  title: 'BESCOM Complete Bill Guide — Tariffs, Gruha Jyothi & Charges 2026',
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
  dateModified: '2026-09-16',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'BESCOM residential (LT-2a) tariff slabs',
  description: 'Telescopic urban domestic electricity tariff slabs for Karnataka (BESCOM), effective 1 April 2025.',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://karnatakaelectricitybillcalculator.in/',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://karnatakaelectricitybillcalculator.in/',
    },
  ],
}

const faqs = [
  {
    q: 'How is my BESCOM electricity bill calculated?',
    a: "Your domestic BESCOM bill adds a telescopic slab-based energy charge (₹5.90 to ₹8.60/unit), a fixed charge of ₹110 per kW of sanctioned load, and a ₹0.36/unit KERC surcharge. Most households also get some units free under Gruha Jyothi, capped at their own baseline average.",
  },
  {
    q: "What are BESCOM's current domestic (LT-2a) tariff slabs?",
    a: '₹5.90/unit for the first 100 units, ₹7.25/unit for 101–200, and ₹8.60/unit above 200 — each band billed only on the units within it. Effective from 1 April 2025, before the separate Gruha Jyothi free-units benefit and KERC surcharge are applied.',
  },
  {
    q: 'How does Gruha Jyothi actually decide if my electricity is free?',
    a: "Your free allowance is your household's own previous-year average monthly consumption plus a buffer, capped at 200 units — not automatically 200 units for everyone. Stay within your baseline and those units are free; exceed it in a given month and you typically pay the full bill for that entire month, not just the units above your baseline.",
  },
  {
    q: 'What is the fixed charge on a BESCOM bill based on?',
    a: "It's ₹110 per kW of sanctioned load per month for domestic connections — so a 2kW connection pays ₹220 in fixed charges regardless of consumption. Commercial (₹210/kW) and industrial (₹180/kW) connections have their own separate per-kW rates.",
  },
  {
    q: 'Does BESCOM charge a fuel/power-purchase adjustment?',
    a: "Yes — a ₹0.36/unit surcharge introduced by KERC from April 2025, applied on top of the slab rates across every consumer category. It won't appear as its own 'slab' on your bill but adds to the total on every unit you use.",
  },
  {
    q: 'What is the electricity duty rate in Karnataka?',
    a: "We don't have a verified electricity duty rate for BESCOM domestic connections in our sourced data — our calculator currently applies 0%, but that's an unconfirmed placeholder, not a confirmed zero-duty policy. Check your own bill's duty line for the actual amount charged.",
  },
  {
    q: 'How do I check my BESCOM bill online?',
    a: 'Visit the official BESCOM website at bescom.co.in or open the BESCOM Mithra app, then enter your Account ID (RR Number) to view your current bill and consumption history.',
  },
  {
    q: 'How do I pay my BESCOM bill?',
    a: 'Pay through the same website or Mithra app via UPI, card or net banking, and save the digital receipt. For outages or billing issues, BESCOM\'s helpline is 1912, available 24×7.',
  },
  {
    q: 'Does BESCOM cover all of Bangalore and Karnataka?',
    a: "BESCOM covers Bangalore Urban and Bangalore Rural districts plus six neighbouring districts (Chikkaballapura, Kolar, Davanagere, Tumkur, Chitradurga, Ramanagara) — eight districts in total. The rest of Karnataka, including Mangalore, Hubli and Gulbarga, is served by MESCOM, HESCOM, GESCOM or CESC instead.",
  },
  {
    q: 'Where can I find my exact BESCOM bill amount for my own usage?',
    a: "Use our BESCOM bill calculator, which applies these same verified slabs, fixed charge, KERC surcharge and the simplified Gruha Jyothi case to your own units and sanctioned load for an itemised estimate.",
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
  ['Residential (LT-2a, urban domestic)', 'Households — the category this guide\'s tables and worked examples use'],
  ['Commercial (LT-3)', 'Shops, offices and businesses on a flat per-unit rate'],
  ['Industrial (LT-5)', 'Manufacturing and industrial connections'],
  ['Agriculture (LT-4, IP-set, up to 10HP)', 'Irrigation pump sets — free of charge under a long-standing Karnataka farm-power subsidy'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 units', '₹5.90'],
  ['101–200 units', '₹7.25'],
  ['201+ units', '₹8.60'],
]

const otherCategoryRows: [string, string, string][] = [
  ['Commercial (LT-3)', '₹8.00 flat', '₹210/kW'],
  ['Industrial (LT-5)', '₹6.50 (0–500 units), ₹7.50 (501+)', '₹180/kW'],
  ['Agriculture (LT-4, IP-set, up to 10HP)', '₹0 — free', '₹0'],
]

const fixedChargeRows: [string, string, string][] = [
  ['Residential', 'Per sanctioned load', '₹110/kW'],
  ['Commercial', 'Per sanctioned load', '₹210/kW'],
  ['Industrial', 'Per sanctioned load', '₹180/kW'],
  ['Agriculture (IP-set, up to 10HP)', 'Free', '₹0'],
]

const workedExampleWithin: [string, string][] = [
  ['Units consumed', '150'],
  ['Sanctioned load (assumed)', '2 kW'],
  ['Gruha Jyothi', 'Entire energy charge waived (₹952.50 worth) — within the 200-unit cap'],
  ['KERC surcharge (150 × ₹0.36)', '₹54.00'],
  ['Fixed charge (2 kW × ₹110)', '₹220.00'],
  ['Estimated total', '₹274.00'],
]

const workedExampleExceeded: [string, string][] = [
  ['Units consumed', '250'],
  ['Sanctioned load (assumed)', '2 kW'],
  ['Gruha Jyothi benefit', 'Withdrawn for the month — baseline exceeded'],
  ['Full telescopic energy charge (0–250 units)', '₹1,745.00'],
  ['KERC surcharge (250 × ₹0.36)', '₹90.00'],
  ['Fixed charge (2 kW × ₹110)', '₹220.00'],
  ['Estimated total', '₹2,055.00'],
]

export default function BescomCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'BESCOM Complete Guide', href: PATH },
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
          <strong>BESCOM</strong> (Bangalore Electricity Supply Company Ltd) distributes
          electricity across Bangalore and seven neighbouring districts, regulated by
          the <strong>Karnataka Electricity Regulatory Commission (KERC)</strong>. Most
          domestic consumers fall under the <strong>Gruha Jyothi</strong> scheme, which
          can make up to 200 units free each month — but only within each
          household&apos;s own baseline, and losing that baseline in a single month can
          cost far more than the units you went over by. A typical BESCOM bill combines
          a telescopic slab-based energy charge, a fixed charge tied to sanctioned load,
          and a ₹0.36/unit KERC surcharge — this guide covers exactly how each piece
          works, and flags the one duty figure we don&apos;t have verified data for.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            BESCOM bills consumers <strong>monthly</strong>. It was formed on 1 June
            2002, when the Karnataka Power Transmission Corporation Ltd
            (KPTCL)&apos;s distribution business was split into five regional
            companies — BESCOM, MESCOM, HESCOM, GESCOM and CESC — while KPTCL retained
            transmission. BESCOM&apos;s own territory covers{' '}
            <strong>Bangalore Urban and Bangalore Rural districts, plus six
            neighbouring districts</strong> (Chikkaballapura, Kolar, Davanagere,
            Tumkur, Chitradurga and Ramanagara) — eight districts in total, wider than
            Bangalore city alone.
          </p>
          <p className={`mt-3 ${pCls}`}>
            If your connection is elsewhere in Karnataka — Mangalore, Hubli, Gulbarga
            and similar — you&apos;re more likely served by MESCOM, HESCOM or GESCOM
            instead, none of which have their own calculator on this site yet. Check
            the name on your bill before relying on the rates below.
          </p>
          <p className={takeawayCls}>
            Takeaway: &ldquo;BESCOM&rdquo; means Bangalore plus seven surrounding
            districts specifically — not all of Karnataka.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers four BESCOM consumer categories:
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
            Takeaway: agriculture here isn&apos;t a discounted rate — for eligible pump
            sets, it&apos;s genuinely free.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic (LT-2a) Tariff Slabs
          </h2>
          <p className={pCls}>
            BESCOM bills urban domestic consumption through three telescopic slabs,
            effective 1 April 2025 — before Gruha Jyothi or the KERC surcharge are
            applied:
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
            for the general mechanic. Plug your own units into the{' '}
            <Link href="/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM bill calculator
            </Link>{' '}
            for an instant, itemised estimate including Gruha Jyothi.
          </p>
          <p className={takeawayCls}>
            Takeaway: these are the base slab rates only — most domestic bills also
            have some units removed entirely by Gruha Jyothi before this table even
            applies.
          </p>
        </section>

        <section aria-labelledby="gruha-jyothi" className="mt-10 scroll-mt-20">
          <h2 id="gruha-jyothi" className={h2Cls}>
            Gruha Jyothi: Free, But Conditional
          </h2>
          <p className={pCls}>
            Gruha Jyothi gives eligible households free units each month — but the
            allowance is <strong>your own household&apos;s previous-year average
            monthly consumption plus a buffer, capped at 200 units</strong>, not
            automatically 200 units for everyone. Two neighbours with different past
            usage can have different free allowances.
          </p>
          <p className={`mt-3 ${pCls}`}>
            The sharpest edge of the scheme: if you exceed your sanctioned baseline in
            a given month, BESCOM typically withdraws the subsidy for the{' '}
            <strong>entire month&apos;s bill</strong> — not just the units above your
            baseline. A single unusually high-usage month can cost dramatically more
            than the extra units alone would suggest. Our calculator models the
            simplified &ldquo;first 200 units free&rdquo; case for comparison, since
            your real baseline is specific to your own household&apos;s history and
            isn&apos;t data we can source generically.
          </p>
          <p className={takeawayCls}>
            Takeaway: Gruha Jyothi rewards staying consistently within your own past
            usage pattern — it doesn&apos;t reward a lower absolute number of units if
            that number is still above your personal baseline.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial, Industrial and Agriculture Tariffs
          </h2>
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
            <strong>Commercial note:</strong> one secondary source we checked cited
            ₹5.95/unit plus a 9% duty for this category instead of ₹8.00/unit — that
            figure looked like a probable mix-up with the residential LT-2a rate on the
            same source page, so we didn&apos;t use it. The ₹8.00/unit figure above
            converges across the sources we did trust, but is still pending a primary
            KERC order cross-check.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Agriculture note:</strong> the free rate above applies only to
            IP-set (irrigation pump set) connections up to 10HP. Above 10HP, or for
            unmetered/other agricultural sub-categories, rates are cited inconsistently
            across sources (roughly ₹3.50–8.30/unit) — not modelled here pending a
            reliable figure.
          </p>
          <p className={takeawayCls}>
            Takeaway: don&apos;t assume every agricultural connection is free — the
            free rate is specifically the up-to-10HP IP-set category.
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            Fixed Charges by Category
          </h2>
          <p className={pCls}>
            Every metered BESCOM category here bills its fixed charge{' '}
            <strong>per kW of sanctioned load</strong>, not as a flat monthly fee:
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
          <p className={takeawayCls}>
            Takeaway: a higher sanctioned load raises your fixed charge every month
            regardless of actual usage — right-sizing it matters here.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            The KERC Surcharge (BESCOM&apos;s Fuel Adjustment)
          </h2>
          <p className={pCls}>
            BESCOM applies a <strong>₹0.36 per unit KERC surcharge</strong>, introduced
            from April 2025, on top of the slab rates above — applied across every
            consumer category. For the general mechanism behind a charge like this, see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>
            .
          </p>
          <p className={`mt-3 ${pCls}`}>
            Unlike some DISCOMs where this kind of adjustment isn&apos;t modelled at
            all in our data, BESCOM&apos;s ₹0.36/unit figure is verified and included
            in the calculator and worked examples below.
          </p>
          <p className={takeawayCls}>
            Takeaway: this surcharge won&apos;t show up as its own &ldquo;slab&rdquo;
            line on your bill, but it applies to every unit you use, including units
            covered by Gruha Jyothi.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty — An Open Gap in Our Data
          </h2>
          <p className={pCls}>
            Unlike the other charges on this page, we <strong>don&apos;t have a
            verified electricity duty rate</strong> for BESCOM domestic connections.
            Our calculator currently applies 0%, but that reflects an unconfirmed
            placeholder in our sourcing, not a confirmed zero-duty policy in Karnataka
            — the source note behind this figure explicitly says the electricity tax
            isn&apos;t modelled yet.
          </p>
          <p className={`mt-3 ${pCls}`}>
            For comparison, Maharashtra&apos;s MSEDCL charges a verified 16% and Uttar
            Pradesh&apos;s UPPCL charges a verified 5% — see our{' '}
            <Link href="/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            and{' '}
            <Link href="/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL
            </Link>{' '}
            complete guides. West Bengal&apos;s WBSEDCL has the exact same
            unverified-duty gap as BESCOM — see our{' '}
            <Link href="/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL complete guide
            </Link>
            . Until we can confirm Karnataka&apos;s actual rate against a primary
            KERC order, check your own bill&apos;s duty line directly rather than
            trusting the calculator&apos;s 0% as fact.
          </p>
          <p className={takeawayCls}>
            Takeaway: this is the one line on a BESCOM bill our calculator likely
            understates — everything else here is verified.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your BESCOM Bill
          </h2>
          <ol className="mt-3 space-y-2">
            {[
              'Visit bescom.co.in or open the BESCOM Mithra app.',
              'Enter your Account ID (RR Number) to view your current bill.',
              'Verify the amount shown and pay via UPI, card or net banking.',
              'Save the digital receipt for your records.',
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
            For outages or billing issues, BESCOM&apos;s helpline is{' '}
            <strong>1912</strong>, available 24×7 — this guide and our calculator are
            estimation tools, not a substitute for your actual bill or the official
            portal for account-specific issues, including your real Gruha Jyothi
            baseline.
          </p>
          <p className={takeawayCls}>
            Takeaway: only BESCOM&apos;s own portal knows your specific Gruha Jyothi
            baseline — no calculator can look that up for you.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: Within the Cap vs. Exceeding It
          </h2>
          <p className={pCls}>
            Two consumption levels on the same 2kW connection show how sharp
            Gruha Jyothi&apos;s cliff really is. Crucially, this isn&apos;t a
            partial-allowance scheme — cross the 200-unit cap and{' '}
            <strong>none</strong> of that month&apos;s units are free, not
            just the units above 200:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            Scenario A — 150 units, within the 200-unit cap
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExampleWithin.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExampleWithin.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExampleWithin.length - 1
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
          <p className="mt-6 font-semibold text-ink-navy">
            Scenario B — 250 units, cap exceeded
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExampleExceeded.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExampleExceeded.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExampleExceeded.length - 1
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
            Just 100 more units pushes the bill up by{' '}
            <strong>₹1,781</strong> — not because of the extra units
            themselves, but because crossing 200 wipes out the entire
            subsidy for the month. Neither scenario includes electricity
            duty (unverified — see above) or account-specific items like
            arrears. Run your own units and sanctioned load on the{' '}
            <Link href="/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: Gruha Jyothi isn&apos;t a rounding error — one month
            over the 200-unit cap costs roughly 7.5× more than a month
            comfortably under it, in this example.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/electricity-bill-guides"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📚
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                All electricity bill guides
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Browse the full Complete Guide directory, state by state.
              </p>
            </Link>
            <Link
              href="/electricity/bescom-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                BESCOM bill calculator
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
                Compare against Maharashtra&apos;s verified 16% duty.
              </p>
            </Link>
            <Link
              href="/blog/uppcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                UPPCL complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Compare against Uttar Pradesh&apos;s verified 5% duty.
              </p>
            </Link>
            <Link
              href="/blog/kseb-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                KSEB complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Kerala&apos;s 250-unit non-telescopic cliff, a billing quirk
                as distinctive as Karnataka&apos;s Gruha Jyothi scheme.
              </p>
            </Link>
            <Link
              href="/blog/pspcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PSPCL complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Punjab&apos;s own all-or-nothing free-power cliff, at 300
                units instead of 200.
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
                The general mechanic behind BESCOM&apos;s three bands.
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
          Prose last reviewed: {PROSE_LAST_REVIEWED}. Tariff data refreshed against our
          own verified records on {TARIFF_DATA_REFRESHED}, sourced from secondary
          bill-calculator sites citing the March 2025 KERC combined tariff order
          (effective 1 April 2025), pending primary KERC order cross-check.
          Electricity duty is explicitly not yet verified for BESCOM and should not be
          taken as confirmed zero. Commercial and industrial figures cover the bands
          stated above; agriculture above 10HP is not modelled. Rates are revised
          periodically — the calculator above is kept current; treat this article as
          the explanatory reference alongside it. See our{' '}
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
