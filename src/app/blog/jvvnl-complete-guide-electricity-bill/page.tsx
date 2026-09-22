import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/jvvnl-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to JVVNL (Rajasthan) Electricity Bill'
const DESCRIPTION =
  "Every verified JVVNL tariff slab, one of India's steepest fixed charges, and open duty/FCA gaps in one reference page — domestic, commercial, industrial and agriculture tables, a worked example, and how to check and pay your Rajasthan electricity bill."
const PROSE_LAST_REVIEWED = '16 September 2026'
const TARIFF_DATA_REFRESHED = '29 August 2026'

export const metadata: Metadata = {
  title: 'JVVNL Complete Bill Guide — Rajasthan Tariff Slabs & Charges 2026',
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
  name: 'JVVNL residential telescopic tariff slabs',
  description: 'Telescopic monthly domestic electricity tariff slabs for eastern Rajasthan (JVVNL), effective 1 April 2025.',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://cescrajasthan.co.in/kedl/pages/event/uploads/Tariff-2025%202.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://cescrajasthan.co.in/kedl/pages/event/uploads/Tariff-2025%202.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'How is my JVVNL electricity bill calculated?',
    a: "Your domestic JVVNL bill adds a telescopic slab-based energy charge (₹4.25 to ₹9.50/unit across four bands), a fixed charge of ₹275 per kW of sanctioned load per month — one of the steepest in India — and a ₹0.22/unit fuel/variable-cost surcharge. Rajasthan's own per-unit electricity duty and an urban cess aren't part of this base structure and aren't currently modelled.",
  },
  {
    q: 'Is the JVVNL/Rajasthan tariff telescopic?',
    a: 'Yes. Each of the four slabs is billed only at its own rate — moving into a higher slab never re-prices the cheaper units you already used.',
  },
  {
    q: "What's the fixed charge for a JVVNL domestic connection?",
    a: '₹275 per kW of sanctioned load per month — among the highest domestic fixed charges of any Indian state. A modest 2 kW household connection pays ₹550 in fixed charges alone before a single unit is billed.',
  },
  {
    q: 'Does JVVNL supply electricity to all of Rajasthan?',
    a: 'No. JVVNL covers Jaipur and around a dozen eastern districts — including Dausa, Alwar, Bharatpur, Kota, Bundi, Baran, Jhalawar, Sawai Madhopur and Karauli. Central and southern Rajasthan (around Ajmer) is served by AVVNL, and western Rajasthan (around Jodhpur) by JdVVNL. All three bill on the same RERC-approved tariff shown in this guide, but as separate accounts.',
  },
  {
    q: 'How confident is this data — is it primary-sourced?',
    a: "It's mixed, the same inversion we've flagged on our KSEB guide: JVVNL's commercial, industrial and agriculture rates are PRIMARY-sourced from JVVNL's own published 'Tariff for Supply of Electricity-2025' schedule. The residential slabs above are a SECONDARY-sourced approximation, pending a primary cross-check — we're confident in the numbers, but flag the sourcing tier openly.",
  },
  {
    q: 'Does JVVNL charge a fuel or power-purchase surcharge?',
    a: "Yes — our data models a ₹0.22/unit fuel/variable-cost surcharge, applied to every unit consumed. We don't have a dedicated confirmation note for this specific figure the way we do for the slab rates, so check it against your own bill's surcharge line if it matters to you.",
  },
  {
    q: 'What is the electricity duty rate in Rajasthan?',
    a: "We don't currently model it. Rajasthan charges a per-unit electricity duty (commonly cited around 40 paise/unit) plus an urban cess, neither of which is in this guide's tables or the calculator — your real JVVNL bill will run a little higher than the base estimate here.",
  },
  {
    q: 'How do I check or pay my JVVNL bill online?',
    a: 'Visit the official JVVNL portal at energy.rajasthan.gov.in/jvvnl, enter your K-Number (Consumer ID) to fetch your current bill, then pay via UPI, card or net banking. For queries or outages, call the 24×7 helpline 1912 or 1800-180-6507.',
  },
  {
    q: 'What is JVVNL, and how did it form?',
    a: 'Jaipur Vidyut Vitran Nigam Ltd (JVVNL) was incorporated on 19 June 2000, when the Rajasthan State Electricity Board (RSEB) was unbundled into separate generation, transmission and three regional distribution companies — JVVNL, AVVNL and JdVVNL.',
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
  ['Commercial (NDS/LT-2)', 'Non-domestic connections above 5 kW sanctioned load'],
  ['Industrial (LT-5)', 'Small industries, connected load up to 25 HP / 18.65 kW'],
  ['Agriculture (AG/MS/LT-4)', 'Metered irrigation, "General"/block-hours-supply category'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 units', '₹4.25'],
  ['101–200 units', '₹5.75'],
  ['201–400 units', '₹7.25'],
  ['401+ units', '₹9.50'],
]

const otherCategoryRows: [string, string, string][] = [
  ['Commercial (NDS/LT-2)', '₹7.00 (0–100), ₹8.50 (101+)', '₹160/kW (up to 500 units/month)'],
  ['Industrial (LT-5)', '₹6.00 flat', '₹120.64/kW (converted from ₹90/HP)'],
  ['Agriculture (AG/MS/LT-4)', '₹5.25 flat', '₹40.21/kW (converted from ₹30/HP)'],
]

const workedExample250: [string, string][] = [
  ['Units consumed (one month)', '250'],
  ['Sanctioned load (assumed)', '2 kW'],
  ['Slab 1: 100 units (0–100) @ ₹4.25', '₹425.00'],
  ['Slab 2: 100 units (101–200) @ ₹5.75', '₹575.00'],
  ['Slab 3: 50 units (201–250) @ ₹7.25', '₹362.50'],
  ['Energy charge subtotal', '₹1,362.50'],
  ['Fixed charge (2 kW × ₹275/kW)', '₹550.00'],
  ['Fuel/variable-cost surcharge (250 × ₹0.22)', '₹55.00'],
  ['Estimated total (base structure only)', '₹1,967.50'],
]

export default function JvvnlCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'JVVNL Complete Guide', href: PATH },
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
          <strong>JVVNL</strong> (Jaipur Vidyut Vitran Nigam Ltd) distributes
          electricity across Jaipur and eastern Rajasthan, regulated by the{' '}
          <strong>Rajasthan Electricity Regulatory Commission (RERC)</strong>.
          A typical JVVNL domestic bill combines a telescopic slab-based
          energy charge with one of India&apos;s steepest fixed charges —
          ₹275 per kW of sanctioned load, billed monthly — plus a fuel/
          variable-cost surcharge this guide models, and a per-unit
          electricity duty it flags but doesn&apos;t, since a current
          verified rate isn&apos;t available in our sourced data.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            The Rajasthan State Electricity Board (RSEB) was unbundled on{' '}
            <strong>19 June 2000</strong> into separate generation,
            transmission and distribution entities, with distribution
            further split by region into three companies: Jaipur Vidyut
            Vitran Nigam Ltd (JVVNL) for the east, Ajmer Vidyut Vitran Nigam
            Ltd (AVVNL) for the central/south, and Jodhpur Vidyut Vitran
            Nigam Ltd (JdVVNL) for the west. All three bill on the same
            RERC-approved tariff this guide covers, but as separate accounts
            with separate portals. JVVNL itself serves{' '}
            <strong>Jaipur and around a dozen eastern districts</strong>,
            including Dausa, Alwar, Bharatpur, Kota, Bundi, Baran, Jhalawar,
            Sawai Madhopur and Karauli.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your address is outside JVVNL&apos;s eastern
            districts, your actual DISCOM and billing portal are AVVNL or
            JdVVNL instead — check your bill before using this guide&apos;s
            &ldquo;how to pay&rdquo; steps.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers four JVVNL consumer
            categories, all billed on the same <strong>monthly</strong>{' '}
            cycle:
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
            Takeaway: three separate Rajasthan DISCOMs share this exact
            tariff — the category table above applies equally to AVVNL and
            JdVVNL connections, just billed on a different portal.
          </p>
        </section>

        <section aria-labelledby="steep-fixed-charge" className="mt-10 scroll-mt-20">
          <h2 id="steep-fixed-charge" className={h2Cls}>
            One of India&apos;s Steepest Fixed Charges
          </h2>
          <p className={pCls}>
            JVVNL&apos;s residential fixed charge is{' '}
            <strong>₹275 per kW of sanctioned load per month</strong> —
            among the highest of any Indian state. A modest 2 kW household
            connection pays <strong>₹550 in fixed charges alone</strong>{' '}
            every month, before a single unit of energy is billed. Compare
            this against Karnataka&apos;s BESCOM or Maharashtra&apos;s
            MSEDCL, where a similar-sized connection&apos;s fixed charge is
            a fraction of that amount.
          </p>
          <p className={takeawayCls}>
            Takeaway: a very-low-usage JVVNL household still pays a
            substantial monthly bill on fixed charges alone — the energy
            charge isn&apos;t where most of a light user&apos;s bill comes
            from.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic Tariff Slabs
          </h2>
          <p className={pCls}>
            JVVNL bills domestic consumption through four telescopic slabs,
            effective 1 April 2025 — each band is charged only on the units
            within it:
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
            <strong>A sourcing caveat worth knowing:</strong> as with our
            KSEB guide, JVVNL has the usual sourcing pattern inverted — these
            residential slabs are a <strong>secondary-sourced
            approximation</strong> pending a primary cross-check, while
            JVVNL&apos;s commercial, industrial and agriculture rates below
            are directly primary-sourced from JVVNL&apos;s own published
            tariff schedule. See{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic slabs work
            </Link>{' '}
            for the general mechanic, or plug your own units into the{' '}
            <Link href="/electricity/rajasthan-electricity-bill-calculator" className="text-brass underline">
              JVVNL bill calculator
            </Link>{' '}
            for an instant, itemised estimate.
          </p>
          <p className={takeawayCls}>
            Takeaway: the first 100 units of any month always cost ₹4.25
            each, regardless of how much more you use that month.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial, Industrial and Agriculture Tariffs
          </h2>
          <p className={pCls}>
            All three are primary-sourced from JVVNL&apos;s own published
            &ldquo;Tariff for Supply of Electricity-2025&rdquo; schedule,
            effective 1 April 2025 — but each comes with a real caveat worth
            knowing:
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
            <strong>Commercial caveat:</strong> the ₹160/kW fixed charge
            shown applies up to 500 units/month; above that it rises to
            ₹200/kW (or ₹320/kVA of billing demand for loads over 18.65 kW)
            — not modelled here. Connections with sanctioned load up to 5 kW
            instead pay a flat ₹350–700/connection/month, also not modelled.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Industrial caveat:</strong> this covers only Schedule
            LT-5 (small industries, connected load up to 25 HP / 18.65 kW).
            The ₹90/HP fixed charge shown applies up to 500 units/month;
            above that it rises to ₹150/HP — not modelled here.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Agriculture caveat:</strong> the ₹5.25/unit rate covers
            the &ldquo;General&rdquo;/block-hours-supply category only.
            Consumers taking supply beyond the scheduled block hours instead
            pay ₹7.00/unit with a ₹60/HP/month fixed charge — not modelled
            separately.
          </p>
          <p className={takeawayCls}>
            Takeaway: outside residential, every category here has at least
            one consumption or load tier that isn&apos;t modelled — check
            which band you actually fall in before trusting the number.
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            Fixed Charges by Category
          </h2>
          <p className={pCls}>
            Every category here bills its fixed charge{' '}
            <strong>per kW (or per-HP, converted here to kW) of sanctioned
            load</strong>, not a flat per-connection amount:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 text-right font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Residential</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹275/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Commercial (≤500 units/month)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹160/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Industrial (≤500 units/month)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹120.64/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Agriculture</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹40.21/kW</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: residential pays the highest per-kW fixed charge of
            any category here — more than double the commercial rate for
            the same sanctioned load.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            Fuel/Variable-Cost Surcharge
          </h2>
          <p className={pCls}>
            Unlike several DISCOMs in this series, JVVNL&apos;s data does
            model a fuel/variable-cost surcharge: <strong>₹0.22/unit</strong>,
            applied to every unit consumed. See{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>{' '}
            for the general mechanism behind a charge like this.
          </p>
          <p className={`mt-3 ${pCls}`}>
            We don&apos;t have a dedicated sourcing note confirming this
            specific figure the way we do for the slab rates above — it&apos;s
            included because it&apos;s a real, modelled number, but check it
            against your own bill&apos;s surcharge line if the exact figure
            matters to you.
          </p>
          <p className={takeawayCls}>
            Takeaway: JVVNL is one of the few DISCOMs in this series where a
            fuel surcharge is actually in the calculator, not just flagged
            as a gap.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty — An Open Gap in Our Data
          </h2>
          <p className={pCls}>
            We <strong>don&apos;t currently model</strong> Rajasthan&apos;s
            electricity duty. Unlike most other states in this series, which
            charge duty as a percentage of the energy charge, Rajasthan is
            commonly cited as charging a <strong>per-unit</strong> duty
            (around 40 paise/unit) plus a separate urban cess — neither is
            in this guide&apos;s tables or the calculator.
          </p>
          <p className={`mt-3 ${pCls}`}>
            For comparison, Kerala&apos;s KSEB charges a verified 5% and
            Maharashtra&apos;s MSEDCL a verified 16% — see our{' '}
            <Link href="/blog/kseb-complete-guide-electricity-bill" className="text-brass underline">
              KSEB
            </Link>{' '}
            and{' '}
            <Link href="/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            complete guides. Until we can confirm Rajasthan&apos;s actual
            per-unit rate against a primary RERC order, check your own
            bill&apos;s duty line directly rather than trusting the
            calculator&apos;s omission as a zero-duty policy.
          </p>
          <p className={takeawayCls}>
            Takeaway: between the unmodelled duty and urban cess, expect
            your real JVVNL bill to run a bit higher than this guide&apos;s
            base estimate.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your JVVNL Bill
          </h2>
          <p className={pCls}>
            The general path, via JVVNL&apos;s own portal (exact screens can
            change over time):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Visit the official JVVNL portal at energy.rajasthan.gov.in/jvvnl.',
              'Enter your K-Number (Consumer ID) to fetch your current bill.',
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
            For billing queries or outages, JVVNL&apos;s helpline is{' '}
            <strong>1912</strong> or <strong>1800-180-6507</strong>,
            available 24×7 — this guide and our calculator are estimation
            tools, not a substitute for your actual bill or JVVNL&apos;s own
            portal for account-specific issues.
          </p>
          <p className={takeawayCls}>
            Takeaway: for anything account-specific — arrears, a disputed
            reading, whether you&apos;re actually on JVVNL versus AVVNL or
            JdVVNL — go to the official portal or helpline directly, not a
            calculator.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: 250 Units, One Month, Domestic Connection
          </h2>
          <p className={pCls}>
            Using the verified slabs above, here&apos;s the full calculation
            for a domestic connection using 250 units in one month, with a
            2 kW sanctioned load:
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
            This ₹1,967.50 covers the energy charge, fixed charge and fuel
            surcharge modelled here — your real bill also carries
            Rajasthan&apos;s unmodelled electricity duty and urban cess
            discussed above, so expect the actual figure on your JVVNL bill
            to run a little higher. Run your own exact units and sanctioned
            load, including any category other than residential, on the{' '}
            <Link href="/electricity/rajasthan-electricity-bill-calculator" className="text-brass underline">
              JVVNL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: notice how much of this bill (₹550 of ₹1,967.50) is
            the fixed charge alone — that&apos;s the direct consequence of
            JVVNL&apos;s unusually steep ₹275/kW rate.
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
              href="/electricity/rajasthan-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                JVVNL bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Your own itemised estimate, priced on these verified slabs.
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
                The same residential-weaker-than-commercial sourcing pattern.
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
                No steep fixed charge here, but a sharp all-or-nothing
                300-unit free-power cliff instead.
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
                West Bengal&apos;s own unverified-duty gap, for comparison.
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
                The general mechanic behind JVVNL&apos;s four bands.
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
          from JVVNL&apos;s own{' '}
          <a
            href="https://cescrajasthan.co.in/kedl/pages/event/uploads/Tariff-2025%202.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            &ldquo;Tariff for Supply of Electricity-2025&rdquo;
          </a>{' '}
          schedule, effective 1 April 2025. Residential slabs are
          secondary-sourced pending a primary-document cross-check. Higher
          consumption/load tiers for commercial, industrial and agriculture,
          Rajasthan&apos;s per-unit electricity duty, and the urban cess are
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
