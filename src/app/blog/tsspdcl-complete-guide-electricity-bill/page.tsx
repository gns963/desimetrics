import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/tsspdcl-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to TGSPDCL/TSSPDCL (Telangana) Electricity Bill'
const DESCRIPTION =
  "Every verified TGSPDCL tariff slab, the Gruha Jyothi 200-unit all-or-nothing rule, genuinely free agriculture power, and open gaps in one reference page — domestic, commercial, industrial and agriculture tables, two worked examples, and how to check and pay your Hyderabad/Telangana electricity bill."
const PROSE_LAST_REVIEWED = '22 September 2026'
const TARIFF_DATA_REFRESHED = '29 August 2026'

export const metadata: Metadata = {
  title: 'TGSPDCL Complete Bill Guide — Telangana Tariff Slabs & Charges 2026',
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
  datePublished: '2026-09-22',
  dateModified: '2026-09-22',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'TGSPDCL residential telescopic tariff slabs',
  description: 'Telescopic monthly domestic electricity tariff slabs for southern Telangana (TGSPDCL/TSSPDCL), effective 1 April 2025.',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'How is my TGSPDCL electricity bill calculated?',
    a: 'Your domestic TGSPDCL bill adds a telescopic slab-based energy charge (₹1.95 to ₹6.50/unit), a fixed charge of ₹10 per kW of sanctioned load, and 6% electricity duty — but white-ration-card households get the entire energy charge waived under Gruha Jyothi as long as monthly consumption stays at or below 200 units.',
  },
  {
    q: 'What happens if I exceed 200 units under Gruha Jyothi? Do I just pay for the extra units?',
    a: "No — this is all-or-nothing, the same mechanic as Karnataka's Gruha Jyothi and Punjab's free-power scheme. Stay at or below 200 units and the entire energy charge is waived; cross 200 by even 1 unit and the ENTIRE month's consumption bills at standard telescopic rates, not just the units above 200. Confirmed directly by Telangana's Deputy CM and Energy Minister.",
  },
  {
    q: "What are TGSPDCL's current domestic tariff slabs?",
    a: '₹1.95/unit for the first 50 units, ₹3.10/unit for 51–100, ₹4.80/unit for 101–200, and ₹6.50/unit above 200 — each band billed only on the units within it, and only relevant once Gruha Jyothi no longer applies.',
  },
  {
    q: 'Does TGSPDCL supply electricity to all of Telangana?',
    a: 'No. TGSPDCL (also called TSSPDCL) covers Hyderabad and 14 southern districts, serving around 11.1 million consumers. The 18 northern districts, headquartered at Hanumakonda, are served by a separate company, TGNPDCL, which has no calculator on this site — both share the same TSERC tariff shown here.',
  },
  {
    q: 'Is agriculture power really free in Telangana?',
    a: "For the vast majority of farm connections, yes — Category LT-V(A) 'Other than Corporate Farmers' pays ₹0/unit with no fixed charge at all, per TGERC's own tariff schedule. A separate 'Corporate Farmers' sub-category pays ₹2.50/unit instead, which isn't modelled here.",
  },
  {
    q: 'How confident is this data — is it primary-sourced?',
    a: "It's mixed, the same pattern we've flagged on KSEB, JVVNL and PSPCL: TGSPDCL's commercial, industrial and agriculture rates are PRIMARY-sourced directly from TGERC's Retail Supply Tariff Schedule for FY2025-26. The residential slabs above are a secondary-sourced approximation, pending a primary cross-check.",
  },
  {
    q: 'What is the electricity duty rate in Telangana?',
    a: "Our data uses a flat 6% across categories, but TGERC's own commercial tariff note says duty is charged separately under the Telangana Electricity Duty Act and isn't quantified in the order itself — so the 6% figure may not be accurate outside residential. Check your own bill's duty line for the confirmed amount.",
  },
  {
    q: 'How do I check or pay my TGSPDCL bill online?',
    a: 'Visit the official portal at tgsouthernpower.org or the TGSPDCL Citizen app, enter your Unique Service Number (USC) to fetch your current bill, then pay via UPI, card or net banking. For queries, call the 24×7 helpline 1912 or 1800-599-01912.',
  },
  {
    q: 'What is TGSPDCL, and how did it form?',
    a: 'When Andhra Pradesh was bifurcated on 2 June 2014 under the AP Reorganisation Act, the erstwhile APSEB\'s southern distribution arm serving the new Telangana state was restructured into Telangana State Southern Power Distribution Company Ltd (TGSPDCL/TSSPDCL), alongside a separate northern company, TGNPDCL.',
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
  ['Commercial (LT-II(B))', 'Non-domestic connections above 50 units/month'],
  ['Industrial (LT-III)', 'Manufacturing, up to 75kW/100HP contract load'],
  ['Agriculture (LT-V(A))', 'Farm pumpsets — genuinely free for most connections'],
]

const domesticSlabs: [string, string][] = [
  ['0–50 units', '₹1.95'],
  ['51–100 units', '₹3.10'],
  ['101–200 units', '₹4.80'],
  ['201+ units', '₹6.50'],
]

const otherCategoryRows: [string, string, string][] = [
  ['Commercial (LT-II(B), >50 units)', '₹8.50/₹9.90/₹10.40/₹11.00 across four bands', '₹70/kW (up to 300 units/month)'],
  ['Industrial (LT-III)', '₹7.70 flat', '₹100/kW'],
  ['Agriculture (LT-V(A), non-corporate)', '₹0 — free', '₹0'],
]

const workedExampleWithin: [string, string][] = [
  ['Units consumed (one month)', '150'],
  ['Sanctioned load (assumed)', '2 kW'],
  ['Gruha Jyothi', 'Entire energy charge waived (₹492.50 worth) — within the 200-unit cap'],
  ['Electricity duty', '₹0.00 (6% of a waived energy charge)'],
  ['Fixed charge (2 kW × ₹10)', '₹20.00'],
  ['Estimated total', '₹20.00'],
]

const workedExampleExceeded: [string, string][] = [
  ['Units consumed (one month)', '250'],
  ['Sanctioned load (assumed)', '2 kW'],
  ['Gruha Jyothi', 'Withdrawn entirely for the month — 200-unit cap exceeded'],
  ['Slab 1: 50 units (0–50) @ ₹1.95', '₹97.50'],
  ['Slab 2: 50 units (51–100) @ ₹3.10', '₹155.00'],
  ['Slab 3: 100 units (101–200) @ ₹4.80', '₹480.00'],
  ['Slab 4: 50 units (201–250) @ ₹6.50', '₹325.00'],
  ['Energy charge subtotal', '₹1,057.50'],
  ['Electricity duty (6%)', '₹63.45'],
  ['Fixed charge (2 kW × ₹10)', '₹20.00'],
  ['Estimated total', '₹1,140.95'],
]

export default function TsspdclCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'TGSPDCL Complete Guide', href: PATH },
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
          <strong>TGSPDCL</strong> (Telangana State Southern Power Distribution
          Company, also called <strong>TSSPDCL</strong>) distributes electricity
          across Hyderabad and southern Telangana, regulated by the{' '}
          <strong>Telangana State Electricity Regulatory Commission (TSERC)</strong>.
          White-ration-card households get free power up to 200 units a month under{' '}
          <strong>Gruha Jyothi</strong> — but like Karnataka&apos;s scheme of the same
          name, it&apos;s <strong>all-or-nothing</strong>: exceed 200 units and the
          entire month&apos;s bill is charged at standard rates, not just the excess.
          This guide covers the real slabs, that cliff&apos;s exact mechanics, and
          Telangana&apos;s genuinely free agriculture category.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            When Andhra Pradesh was bifurcated on <strong>2 June 2014</strong> under
            the AP Reorganisation Act, the distribution business serving the newly
            created Telangana was restructured into two companies: Telangana State
            Southern Power Distribution Company Ltd (TGSPDCL, also called TSSPDCL)
            and Telangana State Northern Power Distribution Company Ltd (TGNPDCL).
            TGSPDCL covers <strong>Hyderabad and 14 southern districts</strong>{' '}
            (including Rangareddy, Medchal, Nalgonda and Mahabubnagar), serving
            around 11.1 million consumers. TGNPDCL covers the 18 northern districts
            from Hanumakonda — it has no calculator on this site, but bills on the
            same TSERC tariff covered here.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your connection is in northern Telangana, your actual
            DISCOM is TGNPDCL, not TGSPDCL — check the name on your bill.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers four TGSPDCL consumer categories,
            all billed on the same <strong>monthly</strong> cycle:
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
            Takeaway: agriculture here isn&apos;t a discounted rate — for
            non-corporate farm connections, it&apos;s genuinely free, the same
            pattern as Karnataka&apos;s BESCOM.
          </p>
        </section>

        <section aria-labelledby="gruha-jyothi" className="mt-10 scroll-mt-20">
          <h2 id="gruha-jyothi" className={h2Cls}>
            Gruha Jyothi Is All-or-Nothing
          </h2>
          <p className={pCls}>
            White-ration-card households get free electricity up to 200 units a
            month — but this is <strong>not</strong> a partial allowance. Stay at
            or below 200 units and the entire energy charge is waived; cross 200 by
            even a single unit and <strong>none</strong> of that month&apos;s
            consumption is free. Telangana&apos;s Deputy Chief Minister and Energy
            Minister has confirmed this publicly: beneficiaries who exceed 200
            units pay the full bill for their entire consumption, not just the
            excess.
          </p>
          <p className={`mt-3 ${pCls}`}>
            The eligibility itself is tied specifically to holding a white ration
            card, not to being a domestic consumer generally — a household without
            one is billed on the standard slabs from the first unit.
          </p>
          <p className={takeawayCls}>
            Takeaway: a 201-unit month can cost dramatically more than a 200-unit
            month — see the worked example below for exactly how much more.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic Tariff Slabs
          </h2>
          <p className={pCls}>
            These slabs only matter once Gruha Jyothi no longer applies —
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
            <strong>A sourcing caveat:</strong> as with KSEB, JVVNL and PSPCL, the
            usual pattern is inverted here — these residential slabs are a
            secondary-sourced approximation pending a primary cross-check, while
            TGSPDCL&apos;s commercial, industrial and agriculture rates below are
            directly primary-sourced from TGERC&apos;s own tariff order. See{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic slabs work
            </Link>{' '}
            for the general mechanic, or plug your own units into the{' '}
            <Link href="/electricity/telangana-electricity-bill-calculator" className="text-brass underline">
              TGSPDCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: for most Gruha Jyothi households, these slabs never actually
            apply — the scheme waives the energy charge entirely below 200 units.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial, Industrial and Agriculture Tariffs
          </h2>
          <p className={pCls}>
            All three are primary-sourced from TGERC&apos;s Retail Supply Tariff
            Schedule for FY2025-26 (effective 1 May 2025 – 31 March 2026) — but
            each comes with a real caveat worth knowing:
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
            <strong>Commercial caveat:</strong> this covers only LT-II(B),
            consumption above 50 units/month. A smaller LT-II(A) band (≤50
            units/month) exists at a flat ₹7.00/unit with a ₹30/kW fixed charge,
            not modelled here. The ₹70/kW demand charge shown applies up to 300
            units/month; above that it steps up to ₹100/kW, also not modelled.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Industrial caveat:</strong> this covers LT-III generally
            (contract load up to 75kW/100HP, or 93kW/125HP for rice mills) at a
            flat, non-telescoped rate. Lower sub-category rates exist for
            pisciculture/sugarcane crushing (₹6.20/unit, ₹50/kW) and poultry
            (₹7.00/unit, ₹65/kW) — not modelled separately.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Agriculture caveat:</strong> the genuine ₹0/unit free rate
            covers LT-V(A) &ldquo;Other than Corporate Farmers&rdquo; — the vast
            majority of Telangana farm connections. A separate &ldquo;Corporate
            Farmers&rdquo; sub-category pays ₹2.50/unit (HP-based, no fixed
            charge), not modelled here.
          </p>
          <p className={takeawayCls}>
            Takeaway: outside residential, every category here covers only its
            most common band — a larger commercial connection or a corporate farm
            will be billed differently from what this table shows.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty — A Partial Gap
          </h2>
          <p className={pCls}>
            Our data applies a flat <strong>6%</strong> electricity duty across
            categories. For residential, this is a reasonably confirmed figure —
            but TGERC&apos;s own commercial tariff note explicitly says duty is
            charged separately under the Telangana Electricity Duty Act and{' '}
            <strong>isn&apos;t quantified in the order itself</strong>, so the 6%
            shown may not be accurate for commercial, industrial or agriculture
            connections.
          </p>
          <p className={`mt-3 ${pCls}`}>
            For comparison, Kerala&apos;s KSEB charges a verified 5% and
            Maharashtra&apos;s MSEDCL a verified 16% (residential) — see our{' '}
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
            Takeaway: trust the 6% for a residential estimate; treat it as
            indicative only for any other category.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            Fuel/Power-Purchase Cost Adjustment — An Open Gap
          </h2>
          <p className={pCls}>
            We don&apos;t have a verified current rate confirming whether TGSPDCL
            is presently levying a fuel or power-purchase cost adjustment — see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>{' '}
            for the general mechanism. Our data shows this as zero, which is an
            unconfirmed placeholder, not a verified no-surcharge policy.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your real TGSPDCL bill runs higher than this guide&apos;s
            worked example even under 200 units, an unmodelled surcharge is a
            plausible reason.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your TGSPDCL Bill
          </h2>
          <p className={pCls}>
            The general path, via TGSPDCL&apos;s own portal (exact screens can
            change over time):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Visit the official TGSPDCL website at tgsouthernpower.org or open the TGSPDCL Citizen app.',
              'Enter your Unique Service Number (USC) to fetch your current bill.',
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
            For queries or outages, TGSPDCL&apos;s helpline is <strong>1912</strong>{' '}
            or <strong>1800-599-01912</strong>, available 24×7 — this guide and our
            calculator are estimation tools, not a substitute for your actual bill
            or TGSPDCL&apos;s own portal for account-specific issues.
          </p>
          <p className={takeawayCls}>
            Takeaway: for anything account-specific — arrears, a disputed reading,
            your white-ration-card eligibility status — go to the official portal
            or helpline directly, not a calculator.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: Within the Cap vs. Exceeding It
          </h2>
          <p className={pCls}>
            Two consumption levels on the same 2kW connection show how sharp
            Gruha Jyothi&apos;s cliff really is. This isn&apos;t a
            partial-allowance scheme — cross the 200-unit cap and{' '}
            <strong>none</strong> of that month&apos;s units are free:
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
            100 more units pushes the bill from <strong>₹20.00</strong> to{' '}
            <strong>₹1,140.95</strong> — a swing of roughly 57×, entirely down to
            losing Gruha Jyothi for the month, not the extra units themselves. Run
            your own units and sanctioned load on the{' '}
            <Link href="/electricity/telangana-electricity-bill-calculator" className="text-brass underline">
              TGSPDCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: TGSPDCL&apos;s low ₹10/kW fixed charge means a Gruha-Jyothi
            household&apos;s bill is normally almost nothing — which is exactly
            why crossing the cap feels so dramatic by comparison.
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
              href="/electricity/telangana-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                TGSPDCL bill calculator
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
                cliff and free-agriculture pattern, at 200 units too.
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
                PSPCL (Punjab) complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The same all-or-nothing cliff mechanic, at 300 units instead
                of 200.
              </p>
            </Link>
            <Link
              href="/water/hyderabad"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💧
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Hyderabad water bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                This same city&apos;s water board (HMWSSB), priced on its real
                tariff.
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
                The general mechanic behind TGSPDCL&apos;s four bands.
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
          industrial and agriculture rates are sourced directly from TGERC&apos;s{' '}
          <a
            href="https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Retail Supply Tariff Schedule for FY2025-26
          </a>
          , effective 1 May 2025 – 31 March 2026. Residential slabs are
          secondary-sourced pending a primary-document cross-check. The Gruha
          Jyothi scheme is modelled as all-or-nothing per verified public
          statements on how TGSPDCL actually applies it. Smaller commercial and
          industrial sub-categories, the corporate-farmer agriculture rate, the
          demand-charge step-up above 300 commercial units, non-residential
          electricity duty, and fuel/power-purchase adjustment are explicitly not
          modelled pending further sourcing. Rates are revised periodically — the
          calculator above is kept current; treat this article as the explanatory
          reference alongside it. See our{' '}
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
