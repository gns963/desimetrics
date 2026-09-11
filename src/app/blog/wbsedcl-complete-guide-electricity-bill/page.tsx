import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/wbsedcl-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to WBSEDCL Electricity Bill'
const DESCRIPTION =
  "Every verified WBSEDCL tariff slab, quarterly billing quirk, fixed charge and MVCA gap in one reference page — domestic, commercial, industrial and agriculture tables, a worked example, and how to check and pay your West Bengal electricity bill."
const PROSE_LAST_REVIEWED = '11 September 2026'
const TARIFF_DATA_REFRESHED = '29 August 2026'

export const metadata: Metadata = {
  title: 'WBSEDCL Complete Bill Guide — Quarterly Tariffs & Charges 2026',
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
  name: 'WBSEDCL residential quarterly tariff slabs',
  description: 'Telescopic quarterly domestic electricity tariff slabs for West Bengal (WBSEDCL), effective 1 April 2025.',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'How is my WBSEDCL electricity bill calculated?',
    a: "Your domestic WBSEDCL bill adds a telescopic slab-based energy charge (five bands from ₹4.10 to ₹6.81/unit, billed quarterly) and a fixed charge of ₹90 per kW of sanctioned load per quarter. Your actual bill also includes a Monthly Variable Cost Adjustment (MVCA) and electricity duty that aren't part of this base structure.",
  },
  {
    q: "What are WBSEDCL's current domestic tariff slabs?",
    a: '₹4.10/unit for the first 102 units, ₹5.34/unit for 103–180, ₹6.15/unit for 181–300, ₹6.65/unit for 301–600, and ₹6.81/unit above 600 — these are quarterly (three-month) slab boundaries, not monthly. Effective from 1 April 2025.',
  },
  {
    q: 'Does WBSEDCL really bill every three months?',
    a: "Yes, for most domestic connections — WBSEDCL's standard tariff schedule is written for a quarterly cycle, which is why the slab thresholds look unusually large compared to monthly-billed DISCOMs. Prepaid smart meters use monthly slabs equal to one-third of the quarterly boundaries, at the same per-unit rates.",
  },
  {
    q: 'What is MVCA on my WBSEDCL bill?',
    a: "MVCA (Monthly Variable Cost Adjustment) is a surcharge that changes every billing month to track WBSEDCL's fuel and power-purchase costs. We don't have a current verified rate for it, so it isn't included in this guide's tables or calculator — your real bill will differ by whatever MVCA applies that month.",
  },
  {
    q: 'What is the fixed charge on a WBSEDCL bill based on?',
    a: "It's ₹90 per kW of sanctioned load per quarter for domestic connections (equivalent to ₹30/kVA per month). Commercial (₹180/kW) and industrial (₹225/kW) connections have their own separate per-kW quarterly rates.",
  },
  {
    q: 'What is the electricity duty rate in West Bengal?',
    a: "We don't have a verified electricity duty rate for WBSEDCL in our sourced data — our calculator currently applies 0%, but that's an unconfirmed placeholder, not a confirmed zero-duty policy. Check your own bill's duty line for the actual amount charged.",
  },
  {
    q: 'How do I check my WBSEDCL bill online?',
    a: 'Visit the official WBSEDCL portal at portal.wbsedcl.in and select "Online Payment" → "Quick Pay", then enter your Consumer ID to view your current bill.',
  },
  {
    q: 'How do I pay my WBSEDCL bill?',
    a: 'Pay through the same portal via UPI, card or net banking, and save the payment confirmation. For billing queries, WBSEDCL\'s helpline is 19121, available 24×7.',
  },
  {
    q: 'Does WBSEDCL supply electricity to Kolkata?',
    a: 'No. Kolkata, Howrah and parts of North/South 24 Parganas and Hooghly are served by CESC Limited, a separate private licensee with its own WBERC-approved tariff — not currently modelled on this site. WBSEDCL covers the rest of West Bengal outside that area.',
  },
  {
    q: 'Where can I find my exact WBSEDCL bill amount for my own usage?',
    a: "Use our WBSEDCL bill calculator, which applies these same verified quarterly slabs and fixed charge to your own units and sanctioned load for an itemised estimate, plus a monthly-equivalent figure.",
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
  ['Residential', 'Households — the category this guide\'s worked example uses'],
  ['Commercial, Rate A(CM)', 'Shops, offices and businesses'],
  ['Industrial, Rate B(I-U)', 'Urban industrial connections'],
  ['Agriculture, Rate C(T)', 'Metered irrigation pump sets, on a Time-of-Day tariff'],
]

const domesticSlabs: [string, string][] = [
  ['0–102 units', '₹4.10'],
  ['103–180 units', '₹5.34'],
  ['181–300 units', '₹6.15'],
  ['301–600 units', '₹6.65'],
  ['601+ units', '₹6.81'],
]

const otherCategoryRows: [string, string, string][] = [
  ['Commercial, Rate A(CM)', '₹5.77 / ₹7.52 / ₹8.20 / ₹8.51 / ₹9.02 across five quarterly bands', '₹180/kW'],
  ['Industrial, Rate B(I-U)', '₹5.23 (0–1,500), ₹7.86 (1,501–6,000), ₹7.83 (6,000+)', '₹225/kW'],
  ['Agriculture, Rate C(T) — daytime only', '₹3.27 flat (06:00–17:00, net of subsidy)', '₹90/kW'],
]

const fixedChargeRows: [string, string, string][] = [
  ['Residential', 'Per sanctioned load (per quarter)', '₹90/kW'],
  ['Commercial', 'Per sanctioned load (per quarter)', '₹180/kW'],
  ['Industrial', 'Per sanctioned load (per quarter)', '₹225/kW'],
  ['Agriculture', 'Per sanctioned load (per quarter, net of subsidy)', '₹90/kW'],
]

const workedExample300: [string, string][] = [
  ['Units consumed (one quarter)', '300'],
  ['Sanctioned load (assumed)', '2 kW'],
  ['Slab 1: 0–102 units @ ₹4.10', '₹418.20'],
  ['Slab 2: 78 units (103–180) @ ₹5.34', '₹416.52'],
  ['Slab 3: 120 units (181–300) @ ₹6.15', '₹738.00'],
  ['Energy charge subtotal', '₹1,572.72'],
  ['Fixed charge (2 kW × ₹90/quarter)', '₹180.00'],
  ['Estimated total (per quarter, base structure only)', '₹1,752.72'],
  ['Monthly-equivalent (÷ 3)', '≈₹584.24'],
]

export default function WbsedclCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'WBSEDCL Complete Guide', href: PATH },
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
          <strong>WBSEDCL</strong> (West Bengal State Electricity Distribution Co.
          Ltd) distributes electricity across most of West Bengal, regulated by the{' '}
          <strong>West Bengal Electricity Regulatory Commission (WBERC)</strong>. It
          is one of the few major Indian DISCOMs that bills most domestic consumers{' '}
          <strong>quarterly</strong> rather than monthly, so its slab boundaries look
          unusually large at first glance. A typical WBSEDCL domestic bill combines a
          telescopic slab-based energy charge with a fixed charge tied to sanctioned
          load — plus a Monthly Variable Cost Adjustment (MVCA) and electricity duty
          this guide flags but doesn&apos;t model, since a current verified rate for
          either isn&apos;t available in our sourced data.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            The West Bengal State Electricity Board (WBSEB) was formed in 1955.
            WBSEDCL itself was created on 1 April 2007, when WBSEB was unbundled
            under the state&apos;s Power Reform Scheme into WBSEDCL (distribution)
            and West Bengal State Electricity Transmission Company Ltd (WBSETCL,
            transmission). WBSEDCL covers most of West Bengal, with one notable
            carve-out: <strong>Kolkata, Howrah and parts of North/South 24 Parganas
            and Hooghly</strong> are served by CESC Limited, a separate private
            licensee with its own WBERC-approved tariff. CESC doesn&apos;t currently
            have its own calculator on this site; if your bill names CESC rather
            than WBSEDCL, the tariffs in this guide won&apos;t apply to you.
          </p>
          <p className={takeawayCls}>
            Takeaway: check the exact name on your bill before using this guide — it
            applies to WBSEDCL connections, not the separate CESC licence area
            covering Kolkata and Howrah.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers four WBSEDCL consumer categories, all
            billed on the same <strong>quarterly</strong> cycle:
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
            Takeaway: every rate on this page is a per-quarter (three-month) figure
            — don&apos;t compare it directly to a monthly-billed DISCOM without
            converting first.
          </p>
        </section>

        <section aria-labelledby="quarterly" className="mt-10 scroll-mt-20">
          <h2 id="quarterly" className={h2Cls}>
            Quarterly Billing — a West Bengal Quirk
          </h2>
          <p className={pCls}>
            Most Indian DISCOMs bill monthly or bi-monthly; WBSEDCL&apos;s standard
            domestic schedule is written for a <strong>quarterly (~90-day)</strong>{' '}
            cycle instead, which is why its slab thresholds (up to 600+ units) look
            far larger than a monthly DISCOM&apos;s. If you&apos;re comparing a
            WBSEDCL bill to one from another state, divide the quarterly total by
            three for a fair monthly-equivalent comparison — our calculator does
            this automatically.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Prepaid smart meters are billed monthly instead, using slab boundaries
            equal to one-third of the quarterly ones shown here, at the same
            per-unit rates.
          </p>
          <p className={takeawayCls}>
            Takeaway: a &ldquo;300 units&rdquo; WBSEDCL bill usually means three
            months of usage, not one — check before comparing numbers across
            DISCOMs.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic Tariff Slabs (Quarterly)
          </h2>
          <p className={pCls}>
            WBSEDCL bills domestic consumption through five telescopic slabs,
            effective 1 April 2025 — each band is charged only on the units within
            it:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Slab (per quarter)</th>
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
            for the general mechanic behind this. Plug your own quarterly units into
            the{' '}
            <Link href="/electricity/wbsedcl-bill-calculator" className="text-brass underline">
              WBSEDCL bill calculator
            </Link>{' '}
            for an instant, itemised estimate plus a monthly-equivalent figure.
          </p>
          <p className={takeawayCls}>
            Takeaway: only the units inside a slab cost that slab&apos;s rate — the
            first 102 units in a quarter always stay at ₹4.10, no matter how much
            more you use.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial, Industrial and Agriculture Tariffs
          </h2>
          <p className={pCls}>
            All three are primary-sourced from WBERC&apos;s Tariff Order dated
            20 March 2025, but each comes with a real caveat worth knowing:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 font-semibold">Rate/unit (per quarter)</th>
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
            <strong>Industrial note:</strong> WBERC&apos;s order actually publishes
            these as monthly slabs (first 500 units at ₹5.23, next 1,500 at ₹7.86,
            above 2,000 at ₹7.83) — we&apos;ve multiplied the slab boundaries by
            three to match this file&apos;s quarterly billing cycle; the per-unit
            rates themselves are unchanged. A near-identical rural industrial rate
            (₹5.07/₹7.65/₹7.57) exists and isn&apos;t modelled separately.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Agriculture caveat — the most important one on this page:</strong>{' '}
            the ₹3.27/unit rate above is a <strong>Time-of-Day</strong> tariff&apos;s
            daytime (06:00–17:00) rate only, net of a West Bengal government
            subsidy. The evening peak (17:00–23:00) rate is far higher at{' '}
            <strong>₹7.48/unit</strong>, and the night (23:00–06:00) rate is lower
            at ₹2.42/unit. Using the single flat daytime rate shown here will
            significantly <em>understate</em> a bill for any evening-heavy
            irrigation usage, since time-of-day billing isn&apos;t modelled.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your agricultural pumping happens mostly in the evening,
            ignore the flat rate above — your real bill is substantially higher.
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            Fixed Charges by Category
          </h2>
          <p className={pCls}>
            Every WBSEDCL category here bills its fixed charge{' '}
            <strong>per kW of sanctioned load, per quarter</strong> — WBERC&apos;s
            order actually states these as a monthly ₹/kVA rate, which we&apos;ve
            multiplied by three to match the quarterly cycle:
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
            Takeaway: your fixed charge doesn&apos;t move even in a very low-usage
            quarter — it&apos;s tied to your sanctioned load, not your meter
            reading.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            MVCA (WBSEDCL&apos;s Fuel Adjustment)
          </h2>
          <p className={pCls}>
            WBSEDCL applies a <strong>Monthly Variable Cost Adjustment
            (MVCA)</strong> on top of the energy and fixed charges above, changing
            every billing month to track fuel and power-purchase costs. For the
            general mechanism behind a charge like this, see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>
            .
          </p>
          <p className={`mt-3 ${pCls}`}>
            We don&apos;t currently have a verified, current MVCA rate in our
            sourced data, so it isn&apos;t modelled in the tables above or in the
            WBSEDCL calculator — rather than publish a guessed number, we&apos;re
            flagging the gap plainly. Your real WBSEDCL bill will run somewhat
            higher or lower than the base estimate this guide and calculator
            produce, depending on the prevailing MVCA that month.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your actual WBSEDCL bill doesn&apos;t match this guide&apos;s
            worked example, MVCA is the most likely reason, not a calculation
            error.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty — An Open Gap in Our Data
          </h2>
          <p className={pCls}>
            We <strong>don&apos;t have a verified electricity duty rate</strong> for
            WBSEDCL. Our calculator currently applies 0%, but that reflects an
            unconfirmed placeholder in our sourcing, not a confirmed zero-duty
            policy in West Bengal — the source note behind this figure explicitly
            says electricity duty isn&apos;t modelled yet.
          </p>
          <p className={`mt-3 ${pCls}`}>
            For comparison, Maharashtra&apos;s MSEDCL charges a verified 16% and
            Uttar Pradesh&apos;s UPPCL charges a verified 5% — see our{' '}
            <Link href="/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            and{' '}
            <Link href="/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL
            </Link>{' '}
            complete guides; Karnataka&apos;s BESCOM has the same unverified-duty gap
            as WBSEDCL — see our{' '}
            <Link href="/blog/bescom-complete-guide-electricity-bill" className="text-brass underline">
              BESCOM complete guide
            </Link>
            . Until we can confirm West Bengal&apos;s actual rate against a primary
            WBERC order, check your own bill&apos;s duty line directly rather than
            trusting the calculator&apos;s 0% as fact.
          </p>
          <p className={takeawayCls}>
            Takeaway: between MVCA and electricity duty, two real lines on a
            WBSEDCL bill aren&apos;t captured by this guide&apos;s base estimate —
            expect your real bill to run higher.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your WBSEDCL Bill
          </h2>
          <p className={pCls}>
            The general path, via WBSEDCL&apos;s own portal (exact screens can
            change over time):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Visit the WBSEDCL portal at portal.wbsedcl.in and select "Online Payment" → "Quick Pay".',
              'Enter your Consumer ID to fetch your current bill.',
              'Verify the amount shown and pay via UPI, card or net banking.',
              'Save the payment confirmation for your records.',
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
            For billing queries or disputes, WBSEDCL&apos;s helpline is{' '}
            <strong>19121</strong>, available 24×7 — this guide and our calculator
            are estimation tools, not a substitute for your actual bill or
            WBSEDCL&apos;s own portal for account-specific issues.
          </p>
          <p className={takeawayCls}>
            Takeaway: for anything account-specific — arrears, a disputed reading,
            the prevailing MVCA — go to the official portal or helpline directly,
            not a calculator.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: 300 Units, One Quarter, Domestic Connection
          </h2>
          <p className={pCls}>
            Using the verified slabs above, here&apos;s the full calculation for a
            domestic connection using 300 units over one quarter (three months):
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample300.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample300.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample300.length - 1
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
            This ₹1,752.72 covers only the energy charge and fixed charge modelled
            here — your real bill also carries MVCA and electricity duty discussed
            above, plus anything account-specific like arrears, so expect the
            actual figure on your WBSEDCL bill to run higher. Run your own exact
            units, including any category other than domestic, on the{' '}
            <Link href="/electricity/wbsedcl-bill-calculator" className="text-brass underline">
              WBSEDCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: always check whether a WBSEDCL figure you&apos;re comparing
            is quarterly or monthly-equivalent before drawing conclusions — this
            example shows both.
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
              href="/electricity/wbsedcl-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                WBSEDCL bill calculator
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
                Karnataka&apos;s Gruha Jyothi scheme and the same duty gap.
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
                The general mechanic behind WBSEDCL&apos;s five bands.
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
          our own verified records on {TARIFF_DATA_REFRESHED}, sourced from
          WBSEDCL&apos;s{' '}
          <a
            href="https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Gist of Tariff Order 2025-26
          </a>
          , per the WBERC order dated 20 March 2025, effective 1 April 2025.
          Industrial and fixed-charge figures were converted from the order&apos;s
          published monthly rates to this file&apos;s quarterly cycle by
          multiplying by three; MVCA, electricity duty, and time-of-day agriculture
          rates outside the daytime window are explicitly not modelled pending
          further sourcing. Rates are revised periodically — the calculator above
          is kept current; treat this article as the explanatory reference
          alongside it. See our{' '}
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
