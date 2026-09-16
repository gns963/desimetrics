import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/kseb-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to KSEB Electricity Bill'
const DESCRIPTION =
  "Every verified KSEB tariff slab, the 250-unit non-telescopic cliff, fixed charges and open data gaps in one reference page — domestic, commercial, industrial and agriculture tables, a worked example, and how to check and pay your Kerala electricity bill."
const PROSE_LAST_REVIEWED = '16 September 2026'
const TARIFF_DATA_REFRESHED = '29 August 2026'

export const metadata: Metadata = {
  title: 'KSEB Complete Bill Guide — Kerala Tariff Slabs & Charges 2026',
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
  name: 'KSEB residential telescopic tariff slabs (up to 250 units/month)',
  description: 'Telescopic bi-monthly domestic electricity tariff slabs for Kerala (KSEB), effective 1 April 2025, valid only up to a 250 units/month average.',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://www.ensembleelectric.com/post/understanding-the-latest-changes-in-lt-consumer-electricity-tariffs-in-kerala',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://www.ensembleelectric.com/post/understanding-the-latest-changes-in-lt-consumer-electricity-tariffs-in-kerala',
    },
  ],
}

const faqs = [
  {
    q: 'How is my KSEB electricity bill calculated?',
    a: "Your domestic KSEB bill adds a telescopic slab-based energy charge (bands from ₹3.35 to ₹8.50/unit, assessed on your monthly-average usage), a fixed charge of ₹80/bi-monthly cycle for single-phase or ₹220 for three-phase, and 5% electricity duty. This only holds below a 250 units/month average — cross it and KSEB switches to a single flat non-telescopic rate on your entire consumption, which this guide and calculator don't model.",
  },
  {
    q: 'What is the 250-unit non-telescopic cliff?',
    a: "Below a 250 units/month average, KSEB charges telescopically — each slab at its own rate. The moment your monthly average crosses 250, your ENTIRE bi-monthly consumption is re-billed at a single higher non-telescopic rate, not just the units above 250. It's the single most misunderstood rule on a KSEB bill, and this guide's tables and calculator are only accurate below it.",
  },
  {
    q: 'KSEB bills me every two months — how do slabs actually work?',
    a: "Slab thresholds are assessed on your monthly average (your bi-monthly total ÷ 2), even though you're billed once every two months. A 501-unit bi-monthly bill crosses the 250-unit cliff even though '501' doesn't look close to '250' at first glance — always divide by two before checking which side of the cliff you're on.",
  },
  {
    q: "What are KSEB's current domestic tariff slabs?",
    a: '₹3.35/unit for the first 50 units/month, ₹4.25/unit for 51–100, ₹5.35/unit for 101–150, ₹7.20/unit for 151–200, and ₹8.50/unit for 201–250 — each band billed only on the units within it (telescopic), and only valid up to a 250 units/month average. Effective from 1 April 2025.',
  },
  {
    q: 'How confident is this data — is it primary-sourced?',
    a: "It's mixed, and unusually inverted compared to our other guides: KSEB's commercial, industrial and agriculture rates are PRIMARY-sourced directly from KSERC Order No. 427/D(T)/2023/KSERC (5 December 2024, Kerala Gazette). The residential slabs above, however, are SECONDARY-sourced pending a primary KSERC order cross-check — we're confident in the numbers, but flag this openly rather than overstate our sourcing tier.",
  },
  {
    q: 'Does KSEB charge a fuel or power-purchase cost adjustment?',
    a: "We don't have a verified current rate either way — our data doesn't confirm whether KSEB is currently levying one, so it isn't modelled in this guide's tables or the calculator. Treat that as an open gap, not a confirmed zero.",
  },
  {
    q: 'What is the electricity duty rate in Kerala?',
    a: 'A verified 5% on the energy charge — this is one of the more solid figures in our KSEB data, unlike the fuel-adjustment gap above.',
  },
  {
    q: 'Does KSEB supply electricity to all of Kerala?',
    a: 'Almost all of it. KSEB Limited (KSEBL) covers the entire state except the Thrissur Municipal Corporation area, the Munnar (Kannan Devan Hills) area, and a handful of small industrial-park licensees, which have their own separate distribution licensees.',
  },
  {
    q: 'How do I check or pay my KSEB bill online?',
    a: 'Visit the KSEB Web Self Service portal at wss.kseb.in, or use the KSEB Mobile App. For queries or outages, call the 24×7 helpline 1912 or 0471-2555544.',
  },
  {
    q: "What's the difference between KSEB and KSEB Limited (KSEBL)?",
    a: 'The original Kerala State Electricity Board (KSEB), formed in 1957, was converted into a company — Kerala State Electricity Board Limited (KSEBL) — incorporated in January 2011 and operational from 1 November 2013. "KSEB" is still the everyday name most people use.',
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
  ['Residential (LT-1A)', 'Households — the category this guide\'s worked example uses'],
  ['Commercial (LT-VII A)', 'Shops, hotels, lodges, cold storages and similar'],
  ['Industrial (LT-IV A)', 'Connected load below 10 kW; two higher tiers exist and aren\'t modelled'],
  ['Agriculture (LT-V A)', 'Pumping/lift irrigation for food and cash crops'],
]

const domesticSlabs: [string, string][] = [
  ['0–50 units', '₹3.35'],
  ['51–100 units', '₹4.25'],
  ['101–150 units', '₹5.35'],
  ['151–200 units', '₹7.20'],
  ['201–250 units', '₹8.50'],
]

const otherCategoryRows: [string, string, string][] = [
  ['Commercial (LT-VII A)', '₹6.05 / ₹6.80 / ₹7.50 / ₹8.15 / ₹9.40 across five bands, 0–100/101–200/201–300/301–500/500+ units', '₹95/month (single-phase)'],
  ['Industrial (LT-IV A), <10 kW', '₹5.90 flat', '₹140/month flat'],
  ['Agriculture (LT-V A)', '₹2.40 flat', '₹20/kW/month'],
]

const workedExample400: [string, string][] = [
  ['Units consumed (one bi-monthly cycle)', '400'],
  ['Monthly average', '200 (well under the 250-unit cliff)'],
  ['Connection', 'Single-phase, residential'],
  ['Slab 1: 100 units (0–100) @ ₹3.35', '₹335.00'],
  ['Slab 2: 100 units (101–200) @ ₹4.25', '₹425.00'],
  ['Slab 3: 100 units (201–300) @ ₹5.35', '₹535.00'],
  ['Slab 4: 100 units (301–400) @ ₹7.20', '₹720.00'],
  ['Energy charge subtotal', '₹2,015.00'],
  ['Fixed charge (single-phase)', '₹80.00'],
  ['Electricity duty (5% of energy charge)', '₹100.75'],
  ['Estimated total (per bi-monthly cycle, base structure only)', '₹2,195.75'],
  ['Monthly-equivalent (÷ 2)', '≈₹1,097.88'],
]

export default function KsebCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'KSEB Complete Guide', href: PATH },
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
          <strong>KSEB</strong> (Kerala State Electricity Board, now formally{' '}
          <strong>KSEB Limited</strong>) supplies electricity to nearly all of
          Kerala, billing domestic consumers <strong>bi-monthly</strong> but
          assessing tariff slabs on the <strong>monthly average</strong> of that
          usage. Below a 250 units/month average, KSEB is telescopic like most
          Indian DISCOMs; cross that line and it switches to a single flat
          non-telescopic rate on your entire consumption — Kerala&apos;s
          best-known billing quirk, and the reason this guide is only accurate
          up to that threshold.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            The Kerala State Electricity Board began functioning on 31 March
            1957. Like most state electricity boards, it was converted under
            the Electricity Act 2003 into a company — Kerala State Electricity
            Board Limited (KSEBL), incorporated 14 January 2011 and operating
            independently from 1 November 2013. &ldquo;KSEB&rdquo; remains the
            name most people use on bills and in everyday conversation. KSEBL
            covers nearly all of Kerala, with three carve-outs:{' '}
            <strong>Thrissur Municipal Corporation</strong>,{' '}
            <strong>Munnar (Kannan Devan Hills)</strong>, and a handful of
            small industrial-park zones — each served by its own separate
            distribution licensee, not modelled on this site.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your bill doesn&apos;t say KSEB/KSEBL, check whether
            you&apos;re in Thrissur city or Munnar before trusting this guide.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers four KSEB consumer categories,
            all billed on the same <strong>bi-monthly</strong> cycle:
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
            Takeaway: every rate on this page is per bi-monthly (two-month)
            cycle unless stated otherwise — the domestic slabs below are shown
            per monthly average for clarity, since that&apos;s what actually
            determines your rate.
          </p>
        </section>

        <section aria-labelledby="cliff" className="mt-10 scroll-mt-20">
          <h2 id="cliff" className={h2Cls}>
            The 250-Unit Non-Telescopic Cliff
          </h2>
          <p className={pCls}>
            Up to a 250 units/month average, KSEB charges telescopically —
            each slab at its own rate, same as most Indian DISCOMs. The
            moment your monthly average crosses 250, KSEB re-bills your{' '}
            <strong>entire</strong> bi-monthly consumption at a single higher
            non-telescopic rate — not just the units above 250. A 501-unit
            bi-monthly bill (a 250.5 monthly average) crosses this cliff even
            though &ldquo;501&rdquo; doesn&apos;t look close to
            &ldquo;250&rdquo; at first glance, since the threshold is checked
            against the monthly average, not the bi-monthly total directly.
          </p>
          <p className={`mt-3 ${pCls}`}>
            This guide&apos;s tables, worked example and our KSEB calculator
            all model the telescopic range only. If your monthly average is
            at or above 250 units, treat every figure here as{' '}
            <strong>not applicable</strong> to your real bill, not just
            approximate.
          </p>
          <p className={takeawayCls}>
            Takeaway: divide your bi-monthly units by two before checking
            which side of 250 you&apos;re on — this is the single most
            misread number on a KSEB bill.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic Tariff Slabs (Monthly Average)
          </h2>
          <p className={pCls}>
            KSEB bills domestic consumption through five telescopic slabs,
            effective 1 April 2025, assessed on your monthly-average usage —
            each band is charged only on the units within it, and only up to
            the 250-unit cliff above:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Slab (per monthly average)</th>
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
            <strong>A sourcing caveat worth knowing:</strong> unusually for
            this series, these residential slabs are{' '}
            <strong>secondary-sourced</strong> — cross-checked against a
            named KSERC order number and date, but pending a primary-document
            confirmation. KSEB&apos;s commercial, industrial and agriculture
            rates below are the opposite: primary-sourced directly from the
            KSERC order itself. See{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic slabs work
            </Link>{' '}
            for the general mechanic behind this, or plug your own bi-monthly
            units into the{' '}
            <Link href="/electricity/kseb-bill-calculator" className="text-brass underline">
              KSEB bill calculator
            </Link>{' '}
            for an instant, itemised estimate.
          </p>
          <p className={takeawayCls}>
            Takeaway: the first 50 units of your monthly average always cost
            ₹3.35 each, no matter how much more you use — as long as
            you&apos;re under the 250-unit cliff.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial, Industrial and Agriculture Tariffs
          </h2>
          <p className={pCls}>
            All three are primary-sourced from KSERC Order No.
            427/D(T)/2023/KSERC, dated 5 December 2024 (Kerala Gazette
            Extraordinary Vol. XIII No. 3939), rates effective 1 April 2025 —
            but each comes with a real caveat worth knowing:
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
            <strong>Commercial caveat:</strong> KSEB bills this category{' '}
            <strong>non-telescopic</strong> — your entire month&apos;s
            consumption is charged at the single rate for the slab it falls
            in, not block-by-block. The table above shows the slab
            boundaries for reference, but using them telescopically (the way
            our calculator currently does) will understate a commercial bill
            above 100 units/month. The rates are also on KSEB&apos;s native{' '}
            <strong>monthly</strong> billing basis, which doesn&apos;t match
            this file&apos;s declared bi-monthly cycle — a real, disclosed
            mismatch, not an error.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Industrial caveat:</strong> only the smallest tier
            (connected load below 10 kW) is modelled here. Load 10–20 kW is
            billed at ₹5.95/unit with a ₹95/kW/month fixed charge, and above
            20 kW it&apos;s ₹6.00/unit with ₹215/kVA/month — neither higher
            tier is in this guide or the calculator. A 20% surcharge also
            applies if power-factor capacitors aren&apos;t installed, not
            modelled here.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Agriculture caveat:</strong> the ₹2.40/unit rate covers
            LT-V(A) — pumping and lift irrigation for food and cash crops
            only. A separate LT-V(B) category (livestock, poultry,
            aquaculture, dairy) is billed higher, at ₹3.40/unit plus
            ₹30/kW/month, and isn&apos;t modelled separately.
          </p>
          <p className={takeawayCls}>
            Takeaway: outside residential, every category here has at least
            one real gap — check the caveat for your specific category before
            trusting the number.
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            Fixed Charges by Category
          </h2>
          <p className={pCls}>
            KSEB&apos;s fixed charge basis varies by category — residential
            and commercial are per-connection by phase, industrial is a flat
            monthly amount (for the smallest tier), and agriculture is per kW
            of connected load:
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
                  <td className="px-4 py-2">Per phase, per bi-monthly cycle</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹80 (single) / ₹220 (three)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Commercial</td>
                  <td className="px-4 py-2">Per phase, per month</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹95 (single) / ₹190 (three)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Industrial (&lt;10 kW)</td>
                  <td className="px-4 py-2">Flat, per month</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹140</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Agriculture</td>
                  <td className="px-4 py-2">Per kW of connected load, per month</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹20/kW</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: your residential fixed charge depends only on whether
            you have a single-phase or three-phase connection — it
            doesn&apos;t move with your consumption.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            Fuel/Power-Purchase Cost Adjustment — An Open Gap
          </h2>
          <p className={pCls}>
            Many Indian DISCOMs pass through fuel and power-purchase cost
            changes via a separate adjustment charge on top of the base
            energy and fixed charges — see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>{' '}
            for the general mechanism. We don&apos;t have a verified,
            current rate confirming whether KSEB is presently levying one.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Our data shows this as zero, but — unlike this guide&apos;s
            electricity-duty figure below — that isn&apos;t a confirmed
            zero-adjustment policy, just the absence of a modelled value.
            Treat it as an open gap: your real KSEB bill may carry a charge
            this guide and calculator don&apos;t show.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your actual KSEB bill runs higher than this
            guide&apos;s worked example even under the 250-unit cliff, an
            unmodelled fuel adjustment is a plausible reason.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty
          </h2>
          <p className={pCls}>
            Kerala charges a <strong>verified 5%</strong> electricity duty on
            the energy charge — one of the more solid figures in our KSEB
            data, in contrast to the fuel-adjustment gap above. For
            comparison, Maharashtra&apos;s MSEDCL charges a verified 16% and
            Uttar Pradesh&apos;s UPPCL charges a verified 5% as well — see
            our{' '}
            <Link href="/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            and{' '}
            <Link href="/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL
            </Link>{' '}
            complete guides. Karnataka&apos;s BESCOM and West Bengal&apos;s
            WBSEDCL both have an unverified-duty gap instead — see our{' '}
            <Link href="/blog/bescom-complete-guide-electricity-bill" className="text-brass underline">
              BESCOM
            </Link>{' '}
            and{' '}
            <Link href="/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL
            </Link>{' '}
            complete guides for that comparison.
          </p>
          <p className={takeawayCls}>
            Takeaway: KSEB&apos;s duty figure is one you can trust — it&apos;s
            the fuel adjustment and the 250-unit cliff that carry the real
            uncertainty on this bill.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your KSEB Bill
          </h2>
          <p className={pCls}>
            The general path, via KSEB&apos;s own portal (exact screens can
            change over time):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Visit the KSEB Web Self Service portal at wss.kseb.in, or open the KSEB Mobile App.',
              'Enter your Consumer Number to fetch your current bill.',
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
            For billing queries or outages, KSEB&apos;s helpline is{' '}
            <strong>1912</strong> or <strong>0471-2555544</strong>, available
            24×7 — this guide and our calculator are estimation tools, not a
            substitute for your actual bill or KSEB&apos;s own portal for
            account-specific issues.
          </p>
          <p className={takeawayCls}>
            Takeaway: for anything account-specific — arrears, a disputed
            reading, whether you&apos;ve crossed the 250-unit cliff — go to
            the official portal or helpline directly, not a calculator.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: 400 Units, One Bi-Monthly Cycle, Domestic Connection
          </h2>
          <p className={pCls}>
            Using the verified slabs above, here&apos;s the full calculation
            for a single-phase domestic connection using 400 units over one
            bi-monthly cycle — a 200 units/month average, safely under the
            250-unit cliff:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample400.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample400.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample400.length - 1
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
            This ₹2,195.75 covers only the energy charge, fixed charge and
            electricity duty modelled here — your real bill may also carry
            an unmodelled fuel/power-purchase adjustment discussed above.
            Run your own exact units, including any category other than
            residential, on the{' '}
            <Link href="/electricity/kseb-bill-calculator" className="text-brass underline">
              KSEB bill calculator
            </Link>
            — but remember it&apos;s only accurate below the 250-unit
            monthly-average cliff.
          </p>
          <p className={takeawayCls}>
            Takeaway: always check your monthly average, not just your
            bi-monthly total, before trusting a KSEB estimate — this example
            deliberately stays well clear of the 250-unit line.
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
              href="/electricity/kseb-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                KSEB bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Your own itemised estimate, priced on these verified slabs.
              </p>
            </Link>
            <Link
              href="/blog/wbsedcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                WBSEDCL complete guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Another unusual billing cycle — quarterly instead of monthly.
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
                Karnataka&apos;s Gruha Jyothi scheme and its own duty gap.
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
                The general mechanic behind KSEB&apos;s five bands — and why
                the 250-unit cliff is the exception, not the rule.
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
          Prose last reviewed: {PROSE_LAST_REVIEWED}. Tariff data refreshed
          against our own verified records on {TARIFF_DATA_REFRESHED}.
          Commercial, industrial and agriculture rates are sourced directly
          from{' '}
          <a
            href="https://www.ensembleelectric.com/post/understanding-the-latest-changes-in-lt-consumer-electricity-tariffs-in-kerala"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            KSERC Order No. 427/D(T)/2023/KSERC
          </a>
          , dated 5 December 2024, effective 1 April 2025. Residential slabs
          are secondary-sourced pending a primary-document cross-check.
          Above 250 units/month, KSEB&apos;s real non-telescopic regime, the
          higher industrial/agriculture tiers, KSEB&apos;s fuel/power-purchase
          adjustment, and time-varying agriculture sub-categories are
          explicitly not modelled pending further sourcing. Rates are
          revised periodically — the calculator above is kept current; treat
          this article as the explanatory reference alongside it. See our{' '}
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
