import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/pspcl-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to PSPCL (Punjab) Electricity Bill'
const DESCRIPTION =
  "Every verified PSPCL tariff slab, the real 300-unit all-or-nothing free-power rule, fixed charges and open gaps in one reference page — domestic, commercial, industrial and agriculture tables, two worked examples, and how to check and pay your Punjab electricity bill."
const PROSE_LAST_REVIEWED = '16 September 2026'
const TARIFF_DATA_REFRESHED = '16 September 2026'

export const metadata: Metadata = {
  title: 'PSPCL Complete Bill Guide — Punjab Tariff Slabs & Charges 2026',
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
  datePublished: '2026-09-16',
  dateModified: '2026-09-16',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'PSPCL residential telescopic tariff slabs',
  description: 'Telescopic domestic electricity tariff slabs for Punjab (PSPCL), effective 1 April 2025 (representative monthly schedule).',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://docs.pspcl.in/',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://docs.pspcl.in/',
    },
  ],
}

const faqs = [
  {
    q: 'How is my PSPCL electricity bill calculated?',
    a: 'Your domestic PSPCL bill adds a telescopic slab-based energy charge (₹3.49 to ₹7.30/unit) and a flat ₹120/month fixed charge — but for most households, the 300-unit free-power scheme means the entire energy charge is waived as long as monthly consumption stays at or below 300 units.',
  },
  {
    q: "What happens if I exceed 300 units in a month? Do I just pay for the extra units?",
    a: "No — this is the single most misunderstood rule on a PSPCL bill. Punjab's scheme is all-or-nothing: stay at or below 300 units and the entire bill is free (only the fixed charge applies); exceed 300 by even 1 unit and the ENTIRE month's consumption is billed at standard rates, not just the units above 300.",
  },
  {
    q: "What are PSPCL's current domestic tariff slabs?",
    a: '₹3.49/unit for the first 100 units, ₹5.84/unit for 101–300, and ₹7.30/unit above 300 — each band billed only on the units within it (telescopic), and only relevant once the free-power scheme no longer applies.',
  },
  {
    q: 'Does the 300-unit rule apply to everyone the same way?',
    a: "No. General domestic consumers lose the entire subsidy above 300 units/month (600 in a bi-monthly cycle). Scheduled Caste, Backward Classes, BPL and freedom-fighter households get a more generous, genuinely tiered scheme instead — free power up to 600 units, paying only for consumption above that. This more generous category isn't modelled separately in our calculator, which only covers the general domestic rule.",
  },
  {
    q: 'Does PSPCL cover all of Punjab?',
    a: 'Yes — unlike Rajasthan (three DISCOMs) or Uttar Pradesh (five), Punjab has a single, statewide distribution company. PSPCL is the sole electricity distributor for the entire state.',
  },
  {
    q: 'Does PSPCL charge a fuel or power-purchase adjustment?',
    a: "We don't have a verified current rate confirming whether PSPCL is presently levying one — our data shows this as zero, but that isn't a confirmed no-surcharge policy, just the absence of a modelled value.",
  },
  {
    q: 'What is the electricity duty rate in Punjab?',
    a: "We don't currently model it. Our data shows this as zero, which is an unconfirmed placeholder, not a confirmed zero-duty policy — check your own bill's duty line for the actual amount.",
  },
  {
    q: 'How do I check or pay my PSPCL bill online?',
    a: 'Visit the official PSPCL bill payment portal at billpayment.pspcl.in or use the PSPCL mobile app, enter your Account/Consumer number to fetch your current bill, then pay via UPI, card or net banking. For queries or outages, call the 24×7 helpline 1912.',
  },
  {
    q: 'What is PSPCL, and how did it form?',
    a: 'Punjab State Power Corporation Ltd (PSPCL) was incorporated on 16 April 2010, when the Punjab State Electricity Board (PSEB) was unbundled into PSPCL (generation and distribution) and Punjab State Transmission Corporation Ltd (PSTCL, transmission).',
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
  ['Residential', 'Households — the category this guide\'s worked examples use'],
  ['Commercial (NRS, up to 7 kW)', 'Shops and small businesses'],
  ['Industrial (Small Power, up to 20 kVA)', 'Small manufacturing units'],
  ['Agriculture (AP, metered)', 'Pumpsets — no separate fixed charge at all'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 units', '₹3.49'],
  ['101–300 units', '₹5.84'],
  ['301+ units', '₹7.30'],
]

const otherCategoryRows: [string, string, string][] = [
  ['Commercial (NRS, ≤7 kW)', '₹6.89 (0–500), ₹7.75 (501+)', '₹70/kW'],
  ['Industrial (Small Power, ≤20 kVA)', '₹5.82 flat (per kVAh)', '₹110/kVA'],
  ['Agriculture (AP, metered)', '₹6.70 flat', 'None — explicitly excluded from the fixed-charge structure'],
]

const workedExampleWithin: [string, string][] = [
  ['Units consumed (one month)', '250'],
  ['Free-power scheme', 'Entire energy charge waived (₹1,225.00 worth) — within the 300-unit cap'],
  ['Fixed charge (flat)', '₹120.00'],
  ['Estimated total', '₹120.00'],
]

const workedExampleExceeded: [string, string][] = [
  ['Units consumed (one month)', '450'],
  ['Free-power scheme', 'Withdrawn entirely for the month — 300-unit cap exceeded'],
  ['Slab 1: 100 units (0–100) @ ₹3.49', '₹349.00'],
  ['Slab 2: 200 units (101–300) @ ₹5.84', '₹1,168.00'],
  ['Slab 3: 150 units (301–450) @ ₹7.30', '₹1,095.00'],
  ['Energy charge subtotal', '₹2,612.00'],
  ['Fixed charge (flat)', '₹120.00'],
  ['Estimated total', '₹2,732.00'],
]

export default function PspclCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'PSPCL Complete Guide', href: PATH },
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
          <strong>PSPCL</strong> (Punjab State Power Corporation Ltd) is Punjab&apos;s
          single, statewide electricity distributor, regulated by the{' '}
          <strong>Punjab State Electricity Regulatory Commission (PSERC)</strong>. Most
          domestic households get free power up to 300 units a month — but the scheme
          is <strong>all-or-nothing</strong>, not a partial allowance: exceed 300 units
          and the entire month&apos;s bill is charged at standard rates, not just the
          units above 300. This guide covers the real slabs, the exact mechanics of
          that 300-unit cliff, and the gaps we don&apos;t have verified data for.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            Punjab State Power Corporation Ltd (PSPCL) was incorporated on{' '}
            <strong>16 April 2010</strong>, when the Punjab State Electricity Board
            (PSEB) was unbundled into PSPCL (generation and distribution) and Punjab
            State Transmission Corporation Ltd (PSTCL, transmission). Unlike several
            neighbouring states, Punjab was not further split by region — PSPCL is the{' '}
            <strong>sole distribution company for the entire state</strong>, with no
            equivalent of Rajasthan&apos;s three DISCOMs or Uttar Pradesh&apos;s five.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your connection is anywhere in Punjab, PSPCL is your DISCOM —
            no need to check which region you&apos;re in.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers four PSPCL consumer categories:
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
            Takeaway: agriculture here isn&apos;t just cheap — it&apos;s explicitly
            excluded from PSPCL&apos;s two-part (energy + fixed) tariff structure
            entirely, so there&apos;s no fixed charge to add at all.
          </p>
        </section>

        <section aria-labelledby="free-power-rule" className="mt-10 scroll-mt-20">
          <h2 id="free-power-rule" className={h2Cls}>
            The 300-Unit Rule Is All-or-Nothing
          </h2>
          <p className={pCls}>
            Punjab gives eligible domestic households free electricity up to 300
            units a month — but this is <strong>not</strong> a partial allowance the
            way a tax-free income bracket works. Stay at or below 300 units and your
            entire energy charge is waived; cross 300 by even a single unit and{' '}
            <strong>none</strong> of that month&apos;s consumption is free — you pay
            standard telescopic rates on the full amount, not just the units above
            300.
          </p>
          <p className={`mt-3 ${pCls}`}>
            There&apos;s also a more generous category we don&apos;t model
            separately: Scheduled Caste, Backward Classes, BPL and freedom-fighter
            households get free power up to <strong>600 units</strong>, and — unlike
            the general scheme — pay only for consumption <em>above</em> 600, a
            genuine partial allowance. Our calculator covers the general domestic
            rule only.
          </p>
          <p className={takeawayCls}>
            Takeaway: a 301-unit month can cost dramatically more than a 300-unit
            month — check the worked example below to see exactly how much more.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic Tariff Slabs
          </h2>
          <p className={pCls}>
            These slabs only matter once the free-power scheme no longer applies —
            effective 1 April 2025, each band charged only on the units within it:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Slab (per month)</th>
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
            <strong>A sourcing caveat:</strong> these residential slabs are
            secondary-sourced, pending a primary PSERC order cross-check. PSPCL also
            bills bi-monthly in practice and rates vary by sanctioned load band (up
            to 2 kW, 2–7 kW, 7–20 kW) — this guide and the calculator use a single
            representative monthly schedule rather than modelling every load band
            separately. See{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic slabs work
            </Link>{' '}
            for the general mechanic, or plug your own units into the{' '}
            <Link href="/electricity/punjab-electricity-bill-calculator" className="text-brass underline">
              PSPCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: for most PSPCL households under 300 units a month, these slabs
            never actually apply — the free-power scheme waives the energy charge
            entirely.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial, Industrial and Agriculture Tariffs
          </h2>
          <p className={pCls}>
            All three are primary-sourced from PSERC&apos;s FY2025-26 Schedule of
            Tariff (Annexure-A, Table 6.2, order dated 28 March 2025), via PSPCL
            Commercial Circular No. 06/2025 — but each covers only one load band:
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
            <strong>Commercial caveat:</strong> this covers only the &ldquo;up to
            7 kW&rdquo; load slab. &ldquo;Above 7kW &amp; up to 20kW&rdquo; has the
            same energy rates but a ₹110/kW fixed charge; &ldquo;Above
            20kW/kVA up to 100kVA&rdquo; is a flat ₹6.75/kVAh with ₹130/kVA fixed;
            &ldquo;Above 100kVA&rdquo; is ₹6.96/kVAh with ₹140/kVA fixed — none of
            these larger bands are modelled here.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Industrial caveat:</strong> this covers only the &ldquo;Small
            Power&rdquo; category (load up to 20 kVA). &ldquo;Medium Supply&rdquo;
            (20-100kVA: ₹6.25/kVAh, ₹145/kVA fixed) and &ldquo;Large Supply&rdquo;
            (over 100kVA: ₹6.60-6.82/kVAh) are not modelled.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Agriculture caveat:</strong> the ₹6.70/kWh metered rate has no
            separate fixed or demand charge at all — PSPCL&apos;s tariff order
            explicitly excludes agricultural pumpsets from its two-part tariff
            structure. An alternative flat unmetered rate of ₹492/BHP/month also
            exists for AP connections but isn&apos;t modelled here.
          </p>
          <p className={takeawayCls}>
            Takeaway: outside residential, every category here covers just one load
            band — a larger commercial or industrial connection will be billed
            differently from what this table shows.
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            Fixed Charges by Category
          </h2>
          <p className={pCls}>
            PSPCL&apos;s fixed-charge basis varies by category — residential is a
            flat monthly amount, commercial and industrial are per kW/kVA of load,
            and agriculture has none at all:
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
                <tr>
                  <td className="px-4 py-2 font-medium">Residential</td>
                  <td className="px-4 py-2">Flat, per month</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹120</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Commercial (≤7 kW)</td>
                  <td className="px-4 py-2">Per kW, per month</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹70/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Industrial (≤20 kVA)</td>
                  <td className="px-4 py-2">Per kVA, per month</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹110/kVA</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Agriculture</td>
                  <td className="px-4 py-2">None</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: PSPCL&apos;s residential fixed charge is one of the simplest
            in this series — a flat ₹120/month regardless of sanctioned load, unlike
            Rajasthan&apos;s or Kerala&apos;s per-kW structures.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            Fuel/Power-Purchase Cost Adjustment — An Open Gap
          </h2>
          <p className={pCls}>
            We don&apos;t have a verified current rate confirming whether PSPCL is
            presently levying a fuel or power-purchase cost adjustment — see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>{' '}
            for the general mechanism. Our data shows this as zero, but that&apos;s
            an unconfirmed placeholder, not a verified no-surcharge policy.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your real PSPCL bill runs higher than this guide&apos;s
            worked example even under 300 units, an unmodelled surcharge is a
            plausible reason.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty — Another Open Gap
          </h2>
          <p className={pCls}>
            We also don&apos;t currently model Punjab&apos;s electricity duty. Our
            data shows this as zero, which — as with the fuel adjustment above — is
            an unconfirmed placeholder rather than a confirmed zero-duty policy. For
            comparison, Kerala&apos;s KSEB charges a verified 5% and
            Maharashtra&apos;s MSEDCL a verified 16% — see our{' '}
            <Link href="/blog/kseb-complete-guide-electricity-bill" className="text-brass underline">
              KSEB
            </Link>{' '}
            and{' '}
            <Link href="/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            complete guides.
          </p>
          <p className={takeawayCls}>
            Takeaway: two real charges — fuel adjustment and electricity duty — sit
            outside this guide&apos;s base estimate entirely, on top of the 300-unit
            rule&apos;s own sharp edge.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your PSPCL Bill
          </h2>
          <p className={pCls}>
            The general path, via PSPCL&apos;s own portal (exact screens can change
            over time):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Visit the official PSPCL bill payment portal at billpayment.pspcl.in, or open the PSPCL mobile app.',
              'Enter your Account/Consumer number to fetch your current bill.',
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
            For billing queries or outages, PSPCL&apos;s helpline is{' '}
            <strong>1912</strong>, available 24×7 — this guide and our calculator
            are estimation tools, not a substitute for your actual bill or
            PSPCL&apos;s own portal for account-specific issues.
          </p>
          <p className={takeawayCls}>
            Takeaway: for anything account-specific — arrears, a disputed reading,
            your exact eligibility status for the free-power scheme — go to the
            official portal or helpline directly, not a calculator.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: Within the Cap vs. Exceeding It
          </h2>
          <p className={pCls}>
            Two consumption levels on the same connection show how sharp the
            300-unit rule really is. This isn&apos;t a partial-allowance scheme —
            cross the cap and none of that month&apos;s units are free, not just
            the units above 300:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            Scenario A — 250 units, within the 300-unit cap
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
            Scenario B — 450 units, cap exceeded
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
            200 more units pushes the bill up by <strong>₹2,612</strong> — not
            because of the extra units alone, but because crossing 300 wipes out
            the entire free-power benefit for the month. Neither scenario includes
            electricity duty or fuel adjustment (both unmodelled — see above). Run
            your own units on the{' '}
            <Link href="/electricity/punjab-electricity-bill-calculator" className="text-brass underline">
              PSPCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: a PSPCL household hovering near 300 units a month has strong
            reason to stay under it — the cost of crossing is roughly 23× the
            fixed-charge-only bill in this example, not a gradual step up.
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
              href="/electricity/punjab-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PSPCL bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Your own itemised estimate, priced on these verified slabs.
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
                Karnataka&apos;s Gruha Jyothi scheme — the same all-or-nothing
                cliff, at 200 units instead of 300.
              </p>
            </Link>
            <Link
              href="/blog/jvvnl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                JVVNL (Rajasthan) complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                No free-power scheme, but one of India&apos;s steepest fixed
                charges instead.
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
                The general mechanic behind PSPCL&apos;s three bands — once the
                free-power scheme no longer applies.
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
          our own verified records on {TARIFF_DATA_REFRESHED}. Commercial,
          industrial and agriculture rates are sourced from PSERC&apos;s FY2025-26
          Schedule of Tariff (Annexure-A, Table 6.2, order dated 28 March 2025), via
          PSPCL Commercial Circular No. 06/2025 (
          <a
            href="https://docs.pspcl.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            docs.pspcl.in
          </a>
          ). Residential slabs are secondary-sourced pending a primary-document
          cross-check. The 300-unit free-power scheme is modelled as all-or-nothing
          per verified real-world reporting on how PSPCL actually applies it — a
          genuine fix applied to this site&apos;s calculator engine, not just this
          guide. Larger commercial/industrial load bands, the more generous SC/BC/
          BPL/freedom-fighter 600-unit scheme, fuel/power-purchase adjustment, and
          electricity duty are explicitly not modelled pending further sourcing.
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
