import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/msedcl-complete-guide-electricity-bill'
const TITLE = 'Complete Guide to MSEDCL (Mahavitaran) Electricity Bill'
const DESCRIPTION =
  "Every verified MSEDCL tariff slab, fixed charge and duty rate in one reference page — domestic, commercial and industrial tables, a worked example, and how to check and pay your Mahavitaran bill."
const PROSE_LAST_REVIEWED = '11 September 2026'
const TARIFF_DATA_REFRESHED = '29 August 2026'

export const metadata: Metadata = {
  title: 'MSEDCL Complete Bill Guide — Tariff Slabs, Charges & Duty 2026',
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
  name: 'MSEDCL residential (LT-I) tariff slabs',
  description: 'Telescopic domestic electricity tariff slabs for Maharashtra (MSEDCL), effective 1 April 2025.',
  url: `${SITE}${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://www.mahadiscom.in/en/consumer/tariff-details/',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://www.mahadiscom.in/en/consumer/tariff-details/',
    },
  ],
}

const faqs = [
  {
    q: 'How is my MSEDCL electricity bill calculated?',
    a: "Your domestic MSEDCL bill adds a telescopic slab-based energy charge (four bands from ₹3.25 to ₹9.56/unit), a flat ₹150 fixed charge, and 16% electricity duty on the energy charge. Your actual bill also includes a separate wheeling charge and a Fuel Adjustment Charge (FAC) that aren't part of this base structure.",
  },
  {
    q: "What are MSEDCL's current domestic tariff slabs?",
    a: '₹3.25/unit for the first 100 units, ₹6.14/unit for 101–300, ₹8.45/unit for 301–500, and ₹9.56/unit above 500 — each band billed only on the units within it (telescopic), not your entire consumption. Effective from 1 April 2025.',
  },
  {
    q: 'What is the fixed charge on an MSEDCL bill based on?',
    a: "For domestic connections it's a flat ₹150 per month regardless of consumption. Commercial connections (up to 20kW) pay a flat ₹525/month, while industrial connections pay a demand charge of ₹390 per kW of sanctioned load instead of a flat amount.",
  },
  {
    q: 'Does MSEDCL charge a fuel/power-purchase adjustment?',
    a: 'MSEDCL bills a separate Fuel Adjustment Charge (FAC) and a wheeling charge on top of the energy and fixed charges. A current verified rate for either isn\'t available in our sourced data, so this guide\'s tables and calculator don\'t include them — your real bill will run higher than the base estimate.',
  },
  {
    q: 'What is the electricity duty rate in Maharashtra?',
    a: "16% for domestic and commercial connections, applied on the energy charge — among the highest electricity duty rates of any Indian state. The industrial duty rate is not reliably verified; secondary sources conflict between roughly 7.5% and 9.3%, so treat industrial duty estimates as low-confidence.",
  },
  {
    q: 'How do I check my MSEDCL bill online?',
    a: 'Visit the MSEDCL Web Self Service portal at wss.mahadiscom.in or open the MahaVitaran app, then enter your Consumer Number to view your current bill and consumption history.',
  },
  {
    q: 'How do I pay my MSEDCL bill?',
    a: 'Pay through the same Web Self Service portal or MahaVitaran app via UPI, card or net banking, and download the receipt for your records. For billing queries, MSEDCL\'s helpline is 1912 or 1800-233-3435, available 24×7.',
  },
  {
    q: 'Does MSEDCL supply electricity in Mumbai?',
    a: 'Mostly not. Most of Mumbai city is served by three separate private licensees — BEST, Tata Power and Adani Electricity Mumbai — not MSEDCL. MSEDCL does cover some Mumbai suburbs, such as Mulund and Bhandup, along with the rest of Maharashtra state.',
  },
  {
    q: 'How often does MSEDCL revise its tariff rates?',
    a: "Tariffs are revised periodically by the Maharashtra Electricity Regulatory Commission (MERC), typically through a multi-year tariff order — the current slabs took effect 1 April 2025. Always check the calculator above or MSEDCL's official portal for the current rate before relying on older figures.",
  },
  {
    q: 'Where can I find my exact MSEDCL bill amount for my own usage?',
    a: "Use our MSEDCL bill calculator, which applies these same verified slabs, fixed charge and duty to your own units for an itemised estimate — faster and less error-prone than working out the slab math by hand.",
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
  ['Residential (Domestic, LT-I)', 'Households — the category this guide\'s tables focus on'],
  ['Commercial (LT-II(A), up to 20kW)', 'Shops, offices and small businesses on a connected load up to 20kW'],
  ['Industrial (LT-III, above 20kW)', 'Manufacturing and industrial units with a connected load above 20kW'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 units', '₹3.25'],
  ['101–300 units', '₹6.14'],
  ['301–500 units', '₹8.45'],
  ['501+ units', '₹9.56'],
]

const fixedChargeRows: [string, string, string][] = [
  ['Residential', 'Flat', '₹150/month'],
  ['Commercial (up to 20kW)', 'Flat', '₹525/month'],
  ['Industrial (above 20kW)', 'Per sanctioned load', '₹390/kW'],
]

const workedExample200: [string, string][] = [
  ['Units consumed', '200'],
  ['Slab 1: 0–100 units @ ₹3.25', '₹325.00'],
  ['Slab 2: 100 units (101–200) @ ₹6.14', '₹614.00'],
  ['Energy charge subtotal', '₹939.00'],
  ['Fixed charge (flat)', '₹150.00'],
  ['Electricity duty (16% of energy charge)', '₹150.24'],
  ['Estimated total (base structure only)', '₹1,239.24'],
]

export default function MsedclCompleteGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'MSEDCL Complete Guide', href: PATH },
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
          <strong>MSEDCL</strong> — the Maharashtra State Electricity Distribution Co.
          Ltd, commonly called <strong>Mahavitaran</strong> or Mahadiscom — is the
          state-owned DISCOM distributing electricity across almost all of
          Maharashtra, regulated by the{' '}
          <strong>Maharashtra Electricity Regulatory Commission (MERC)</strong>. It
          does not cover most of Mumbai city itself, which is served by three
          separate private licensees instead. A typical MSEDCL domestic bill combines
          a telescopic slab-based energy charge, a flat fixed charge, and a 16%
          electricity duty — plus a separate wheeling charge and Fuel Adjustment
          Charge this guide flags but doesn&apos;t model, since a current verified
          rate for either isn&apos;t available in our sourced data.
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            Overview
          </h2>
          <p className={pCls}>
            MSEDCL bills domestic consumers <strong>monthly</strong> (not
            bi-monthly, unlike several other states&apos; DISCOMs). Its coverage
            spans nearly all of Maharashtra, with one notable carve-out:{' '}
            <strong>most of Mumbai city</strong> is served by BEST, Tata Power and
            Adani Electricity Mumbai instead — MSEDCL covers only a few Mumbai
            suburbs, such as Mulund and Bhandup, along with the rest of the state.
            None of these three Mumbai licensees currently have their own calculator
            on this site; if your bill names one of them rather than MSEDCL or
            Mahavitaran, the tariffs in this guide won&apos;t apply to you.
          </p>
          <p className={`mt-3 ${pCls}`}>
            If you&apos;re looking for a step-by-step walkthrough of checking or
            paying your bill with screenshots and a news-style angle, see our
            companion post,{' '}
            <Link href="/blog/mahavitaran-bill-kaise-check-kare" className="text-brass underline">
              Mahavitaran Bill: Check &amp; Pay Your MSEDCL Bill Online
            </Link>
            . This guide has a different job — it&apos;s the durable, comprehensive
            reference for exactly how MSEDCL calculates a bill, with every verified
            rate in one place.
          </p>
          <p className={takeawayCls}>
            Takeaway: check the exact name on your bill before using this guide — it
            applies to MSEDCL/Mahavitaran connections, not Mumbai&apos;s three
            separate private licensees.
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            Consumer Categories
          </h2>
          <p className={pCls}>
            Our verified data currently covers three MSEDCL consumer categories:
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
            Takeaway: MSEDCL also has higher-load commercial and industrial bands not
            covered below — see the caveats in each section before assuming these
            tables apply to a larger connection.
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            Domestic (Residential) Tariff Slabs
          </h2>
          <p className={pCls}>
            MSEDCL bills domestic consumption through four telescopic slabs,
            effective 1 April 2025 — each band is charged only on the units within
            it, not your whole consumption:
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
            Crossing from 100 to 101 units nearly doubles your marginal rate — see{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic slabs work
            </Link>{' '}
            for the general mechanic behind this. Plug your own units into the{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL bill calculator
            </Link>{' '}
            for an instant, itemised estimate rather than working the slab math out
            by hand.
          </p>
          <p className={takeawayCls}>
            Takeaway: only the units inside a slab cost that slab&apos;s rate — the
            first 100 units always stay at ₹3.25, no matter how much more you use.
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            Commercial and Industrial Tariffs
          </h2>
          <p className={pCls}>
            Both non-domestic categories we&apos;ve sourced use a flat per-unit rate
            rather than slabs, but each comes with a real coverage gap worth knowing
            before you rely on it:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 text-right font-semibold">Rate/unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Commercial (LT-II(A), up to 20kW)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹6.44</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Industrial (LT-III, above 20kW)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹7.86</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            <strong>Commercial caveat:</strong> this ₹6.44/unit rate applies only up
            to a 20kW connected load. Higher commercial bands are not modelled in our
            data — a larger commercial connection (LT-II(B)/(C)) will be billed
            differently and this table will understate that bill significantly.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Industrial caveat:</strong> rates for industrial connections
            below 20kW were not found in our sourced data, and the industrial
            electricity duty rate isn&apos;t reliably verified either — see the duty
            section below before estimating an industrial bill.
          </p>
          <p className={takeawayCls}>
            Takeaway: both non-domestic tables here cover one specific load band each
            — check which band your own connection falls into before trusting the
            number.
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            Fixed / Demand Charges
          </h2>
          <p className={pCls}>
            The fixed charge is billed regardless of how much you actually consume
            that month — for domestic and commercial connections it&apos;s a flat
            monthly amount, while industrial connections pay a demand charge based on
            sanctioned load instead:
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
            Takeaway: your domestic fixed charge doesn&apos;t move even in a very
            low-usage month — it&apos;s tied to your connection, not your meter
            reading.
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            Fuel Adjustment Charge (FAC) and Wheeling Charge
          </h2>
          <p className={pCls}>
            MSEDCL bills a separate <strong>Fuel Adjustment Charge (FAC)</strong> and
            a per-unit <strong>wheeling charge</strong> on top of the energy and
            fixed charges above. For the general mechanism behind a charge like this
            — why it exists and why it can go up or down independent of your usage —
            see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA explained
            </Link>
            .
          </p>
          <p className={`mt-3 ${pCls}`}>
            We don&apos;t currently have a verified, current rate for either MSEDCL
            charge in our sourced data, so neither is modelled in the tables above or
            in the MSEDCL calculator — rather than publish a guessed number, we&apos;re
            flagging the gap plainly. Your real Mahavitaran bill will run somewhat
            higher than the base estimate this guide and calculator produce.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your actual MSEDCL bill is higher than this guide&apos;s
            worked example, the wheeling charge and FAC are the most likely reason,
            not a calculation error.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty and Other Statutory Charges
          </h2>
          <p className={pCls}>
            Electricity duty is a <strong>Maharashtra state government tax</strong>{' '}
            collected on your bill, not a charge MSEDCL sets or keeps. For domestic
            and commercial connections, it&apos;s <strong>16% of the energy
            charge</strong> — among the highest domestic electricity duty rates of
            any Indian state, and typically the second-largest line on a Mahavitaran
            bill after the energy charge itself. For comparison, Uttar Pradesh
            charges just 5% on the same basis — see our{' '}
            <Link href="/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL complete guide
            </Link>
            .
          </p>
          <p className={`mt-3 ${pCls}`}>
            For industrial connections, we don&apos;t have a reliably verified duty
            rate: secondary sources conflict, citing figures anywhere from roughly
            7.5% to 9.3%, which is likely different from the 16% domestic-derived
            rate. Treat any industrial duty estimate as low-confidence until a
            primary MERC order confirms the exact figure.
          </p>
          <p className={takeawayCls}>
            Takeaway: 16% duty is solid for domestic and commercial bills — don&apos;t
            carry that same number over to an industrial connection.
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            How to Check and Pay Your MSEDCL Bill
          </h2>
          <p className={pCls}>
            The general path, via MSEDCL&apos;s own portal (exact screens can change
            over time):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Visit the MSEDCL Web Self Service portal at wss.mahadiscom.in, or open the MahaVitaran app.',
              'Enter your Consumer Number to fetch your current bill and consumption history.',
              'Verify the amount shown and pay via UPI, card or net banking.',
              'Download the receipt for your records.',
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
            For billing queries or disputes, MSEDCL&apos;s helpline is{' '}
            <strong>1912 or 1800-233-3435</strong>, available 24×7 — this guide and
            our calculator are estimation tools, not a substitute for your actual
            bill or MSEDCL&apos;s own portal for account-specific issues.
          </p>
          <p className={takeawayCls}>
            Takeaway: for anything account-specific — arrears, a disputed reading, a
            name change — go to the official portal or helpline directly, not a
            calculator.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: 200 Units, Domestic Connection
          </h2>
          <p className={pCls}>
            Using the verified slabs above, here&apos;s the full calculation for a
            domestic connection using 200 units in a month:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample200.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample200.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample200.length - 1
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
            This ₹1,239.24 covers only the energy charge, fixed charge and
            electricity duty modelled here — your real bill also carries the
            wheeling charge and FAC discussed above, plus anything account-specific
            like arrears or a previous balance, so expect the actual figure on your
            MSEDCL bill to run somewhat higher. Run your own exact units, including
            any category other than domestic, on the{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: at 200 units, duty alone (₹150.24) costs almost as much as the
            entire flat fixed charge — a direct look at how large Maharashtra&apos;s
            16% really is in practice.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/electricity/msedcl-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                MSEDCL bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Your own itemised estimate, priced on these verified slabs.
              </p>
            </Link>
            <Link
              href="/blog/mahavitaran-bill-kaise-check-kare"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Mahavitaran bill: check &amp; pay guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The step-by-step companion to this reference guide.
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
                The general mechanic behind MSEDCL&apos;s four bands.
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
          our own verified records on {TARIFF_DATA_REFRESHED}, sourced from{' '}
          <a
            href="https://www.mahadiscom.in/en/consumer/tariff-details/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            mahadiscom.in
          </a>{' '}
          and MERC&apos;s tariff order, effective 1 April 2025. Commercial and
          industrial figures cover only the load bands stated above; wheeling charge,
          FAC and the industrial duty rate are explicitly not modelled pending
          primary-source confirmation. Rates are revised periodically — the
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
