import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/png-piped-gas-bill-guide-india'
const TITLE = 'Piped Gas (PNG) Bill in India: How It’s Calculated, and Why It Got Cheaper in 2026'
const DESCRIPTION =
  'How your PNG bill is actually calculated, why prices dropped nationwide from January 2026, and what the new gas transportation tariff structure means for your bill.'
const LAST_VERIFIED = '25 September 2026'

export const metadata: Metadata = {
  title: 'PNG Bill Guide 2026 — How It’s Calculated & Why It Got Cheaper',
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
  datePublished: '2026-09-25',
  dateModified: '2026-09-25',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'How is a PNG (piped gas) bill calculated in India?',
    a: 'Your PNG bill is your metered gas consumption, in standard cubic metres (SCM), multiplied by your city gas distributor’s (CGD) current per-SCM rate. Most CGDs bill bi-monthly (once every two months) rather than monthly, and the exact rate depends on your specific CGD and state, not a single national figure.',
  },
  {
    q: 'Why did PNG prices drop in 2026?',
    a: 'PNGRB restructured the wholesale gas transportation tariff from 1 January 2026 under a "One Nation, One Grid, One Tariff" policy, replacing three distance-based zones with two, and charging domestic PNG and CNG consumers the lower Zone-1 rate nationwide regardless of actual distance from the gas source — cutting the upstream cost that eventually flows into retail pricing.',
  },
  {
    q: 'What is the difference between the gas transportation tariff and my actual PNG bill?',
    a: 'The transportation tariff (₹54 or ₹102.86 per MMBtu) is a wholesale-level charge for moving gas through the national pipeline network — it is not the per-SCM rate on your bill. Your retail PNG rate also includes your CGD’s own margin and your state’s VAT, which is why two cities can see different retail prices even after this reform.',
  },
  {
    q: 'What is PNGRB?',
    a: 'The Petroleum and Natural Gas Regulatory Board (PNGRB) is the central regulator that sets natural gas transportation tariffs and oversees city gas distribution licensing in India. It announced the January 2026 tariff restructuring that lowered the wholesale cost feeding into domestic PNG pricing nationwide.',
  },
  {
    q: 'Is PNG cheaper than an LPG cylinder?',
    a: 'PNG is billed purely on metered usage, with no cylinder cost, delivery charge, or need to store or replace cylinders — which is why it’s often described as more economical in practice. The exact rupee comparison depends on your local PNG rate and your actual LPG cylinder cost, so check your own numbers rather than assume a fixed savings figure.',
  },
  {
    q: 'How often is PNG billed?',
    a: 'Many CGDs bill PNG bi-monthly — once every two months — based on your actual metered reading, though this can vary by CGD, so confirm your own provider’s cycle rather than assuming it’s universal.',
  },
  {
    q: 'What one-time charges apply when getting a new PNG connection?',
    a: 'Typical one-time or occasional charges include an application fee, a refundable interest-free security deposit, and administrative fees for services like disconnection or a name transfer. Exact amounts are CGD-specific and not centrally published, so confirm current fees with your own provider before applying.',
  },
  {
    q: 'What is the September 2026 PNG connection incentive scheme?',
    a: 'A separate central government scheme, effective 1 September 2026, aimed at expanding PNG access — incentivising CGDs to convert unbilled or inactive connections into active billed ones and to extend networks into new areas, alongside a "National PNG Drive 2.0." This is distinct from the January 2026 tariff reform and does not itself change the per-unit rate.',
  },
  {
    q: 'Does the January 2026 tariff reform apply to CNG as well as PNG?',
    a: 'Yes — the reform specifically charges both domestic PNG and CNG consumers the lower Zone-1 transportation rate nationwide, regardless of their actual distance from the gas source, which is why CNG prices were also expected to fall alongside PNG prices.',
  },
  {
    q: 'Why does my PNG rate still differ from a friend’s in another state?',
    a: 'The January 2026 reform unified only the wholesale transportation tariff component. Your CGD’s own margin and your state’s VAT on natural gas are set separately and still vary by state and provider, so retail PNG rates continue to differ city to city even though the upstream cost is now the same nationwide.',
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

const zoneComparisonRows: [string, string, string][] = [
  ['Number of zones', 'Three', 'Two'],
  ['Zone boundaries', 'Up to 200 km / 300–1,200 km / beyond 1,200 km', 'Up to 300 km / beyond 300 km'],
  ['Rates (per MMBtu)', '₹42 / ₹80 / ₹107', '₹54 (Zone 1) / ₹102.86 (Zone 2)'],
  [
    'Domestic PNG & CNG consumers',
    'Charged based on actual distance zone',
    'Charged the Zone-1 rate (₹54/MMBtu) nationwide, regardless of distance',
  ],
]

const oneTimeChargeRows: [string, string][] = [
  ['Application fee', 'One-time, charged when applying for a new connection'],
  ['Security deposit', 'Refundable, interest-free — held against your account'],
  ['Disconnection / reconnection fee', 'Charged only if you request the service'],
  ['Name transfer fee', 'Charged when transferring the connection to a new owner/tenant'],
]

export default function PngPipedGasBillGuidePage() {
  return (
    <>
      <PageHero
        hub="gas"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'PNG Bill Guide', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔥</span> Gas Explainer
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
          · Updated {LAST_VERIFIED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          From <strong>1 January 2026</strong>, the Petroleum and Natural Gas Regulatory Board
          (PNGRB) restructured India&apos;s gas transportation tariff under a{' '}
          <strong>&ldquo;One Nation, One Grid, One Tariff&rdquo;</strong> policy — replacing
          the old three-zone, distance-based structure with two simpler zones, and charging{' '}
          <strong>domestic PNG and CNG consumers the lower Zone-1 rate nationwide</strong>,
          regardless of how far they actually are from the gas source. That single change is why
          PNG bills fell across much of the country in early 2026, especially for households far
          from a gas source who previously paid the highest zone rate. This guide explains exactly
          how your PNG bill is built, what changed and why, and where the January reform ends and a
          separate, later government scheme begins.
        </p>

        <section aria-labelledby="how-billed" className="mt-10 scroll-mt-20">
          <h2 id="how-billed" className={h2Cls}>
            How Is a PNG Bill Actually Calculated?
          </h2>
          <p className={pCls}>
            Your bill is your metered consumption multiplied by your city gas distributor&apos;s
            current rate:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Metered in SCM', 'gas use is measured in standard cubic metres (SCM), read directly off your meter.'],
              ['Priced per SCM', 'your City Gas Distributor (CGD) sets a rupee-per-SCM rate, which varies by CGD and state.'],
              ['Billed bi-monthly', 'many CGDs read and bill once every two months, though this varies by provider.'],
              ['Bill = consumption × rate', 'plus any one-time charges that apply only occasionally, not every cycle.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-gas" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: there is no fixed monthly charge in the core formula — your bill scales
            directly with how much gas you actually use.
          </p>
        </section>

        <section aria-labelledby="reform" className="mt-10 scroll-mt-20">
          <h2 id="reform" className={h2Cls}>
            What Changed on 1 January 2026, and Why
          </h2>
          <p className={pCls}>
            Before 2026, the gas transportation tariff — the wholesale charge for moving
            natural gas through India&apos;s pipeline network — was split into three zones
            based on distance from the gas source, so consumers further away paid a higher upstream
            cost. PNGRB simplified this to two zones and, critically, decided that domestic PNG and
            CNG consumers would pay the lower Zone-1 rate everywhere, not just within 300 km of a
            source:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">Old structure (2023)</th>
                  <th className="px-4 py-2 font-semibold">New structure (from 1 Jan 2026)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {zoneComparisonRows.map(([label, oldVal, newVal]) => (
                  <tr key={label}>
                    <td className="px-4 py-2 font-medium">{label}</td>
                    <td className="px-4 py-2">{oldVal}</td>
                    <td className="px-4 py-2 font-display font-bold text-hub-gas">{newVal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            PNGRB estimated the reform would cut domestic PNG prices by roughly{' '}
            <strong>₹0.90–1.80 per SCM</strong> and CNG prices by roughly{' '}
            <strong>₹1.25–2.50 per kg</strong>, with the exact amount varying by state and
            local taxes. The change is expected to benefit consumers across{' '}
            <strong>312 geographical areas</strong> served by <strong>40 CGD companies</strong>{' '}
            nationwide, and to cut CGD-sector transportation costs by roughly{' '}
            <strong>₹1,000 crore a year</strong>.
          </p>
          <p className={takeawayCls}>
            Takeaway: the further you are from a gas source, the more the old system charged you
            — and the more you likely benefited from this specific change.
          </p>
        </section>

        <section aria-labelledby="tariff-vs-bill" className="mt-10 scroll-mt-20">
          <h2 id="tariff-vs-bill" className={h2Cls}>
            &ldquo;Transportation Tariff&rdquo; vs What&apos;s Actually on Your Bill
          </h2>
          <p className={pCls}>
            The ₹54 and ₹102.86 per-MMBtu figures above are a{' '}
            <strong>wholesale, upstream cost</strong> — not the retail price you see on your
            bill. This distinction is where a lot of coverage of this reform gets muddled, so it is
            worth being precise about it:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['MMBtu is a wholesale unit', 'the transportation tariff is priced per Million British Thermal Unit (MMBtu), a measure used at the pipeline/wholesale level.'],
              ['SCM is your billing unit', 'your actual meter, and your bill, measures gas in standard cubic metres (SCM) — a different, retail-level unit.'],
              ['Your CGD adds its own margin', 'the transportation tariff is one input cost among several your CGD factors into the retail rate it actually charges you.'],
              ['State VAT still applies on top', 'your state government’s VAT on natural gas is set independently and is layered onto the final retail price.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-gas" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 ${pCls}`}>
            In short: the January 2026 reform unified one upstream input cost nationwide. It did not
            create a single national retail PNG price — your CGD&apos;s margin and your
            state&apos;s VAT still mean two cities can see two different rates on their actual bills.
          </p>
          <p className={takeawayCls}>
            Takeaway: don&apos;t expect the exact ₹54/MMBtu figure to appear anywhere on your
            bill — it&apos;s an upstream input, several steps removed from your retail rate.
          </p>
        </section>

        <section aria-labelledby="other-charges" className="mt-10 scroll-mt-20">
          <h2 id="other-charges" className={h2Cls}>
            What Else Shows Up on a PNG Bill Besides the Per-Unit Rate
          </h2>
          <p className={pCls}>
            Beyond the per-SCM consumption charge, a few one-time or occasional charges are common
            across CGDs — treat these as typical, not universal, since exact fees vary by
            provider:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Charge</th>
                  <th className="px-4 py-2 font-semibold">When it applies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {oneTimeChargeRows.map(([charge, when]) => (
                  <tr key={charge}>
                    <td className="px-4 py-2 font-medium">{charge}</td>
                    <td className="px-4 py-2">{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: your recurring bill is almost entirely the consumption charge — these
            other charges are one-time events, not line items you should expect every cycle.
          </p>
        </section>

        <section aria-labelledby="incentive-scheme" className="mt-10 scroll-mt-20">
          <h2 id="incentive-scheme" className={h2Cls}>
            The September 2026 Connection Incentive Scheme — A Separate Development
          </h2>
          <p className={pCls}>
            Don&apos;t confuse this with the January tariff reform above: effective{' '}
            <strong>1 September 2026</strong>, the central government approved a separate scheme
            aimed at expanding PNG access, not at changing the per-unit rate. It incentivises CGDs to
            convert unbilled or inactive connections into active, billed ones, and to extend PNG
            networks into new areas, alongside a &ldquo;National PNG Drive 2.0&rdquo; and a proposed
            unified PNG registration portal. India had roughly{' '}
            <strong>1.74 crore domestic PNG connections</strong> at the time the scheme was
            announced, and states were separately encouraged — not mandated — to reduce VAT
            on natural gas to 5%.
          </p>
          <p className={takeawayCls}>
            Takeaway: this scheme is about getting more households connected and billed, not about
            lowering the rate you already pay — two different policy goals, two different dates.
          </p>
        </section>

        <section aria-labelledby="png-vs-lpg" className="mt-10 scroll-mt-20">
          <h2 id="png-vs-lpg" className={h2Cls}>
            Is PNG Actually Cheaper Than an LPG Cylinder?
          </h2>
          <p className={pCls}>
            Often, yes in practice — but the honest answer depends on your own numbers, not a
            single national figure:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['No cylinder cost', 'PNG has no per-cylinder price, unlike LPG, where you pay for the full cylinder regardless of how much you actually use.'],
              ['No delivery charge', 'PNG is delivered continuously through a fixed pipeline — there is no delivery fee each time you need gas.'],
              ['No storage or replacement hassle', 'you never run out mid-meal or need to book a replacement cylinder.'],
              ['Billed purely on metered use', 'you only pay for exactly what you consume, at your CGD’s current rate.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-gas" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 ${pCls}`}>
            Whether this actually works out cheaper in rupee terms for you depends on your local PNG
            rate (which now varies less by distance after the January 2026 reform, but still varies
            by state due to VAT) against your actual LPG cylinder cost — there isn&apos;t one
            honest national number for this comparison.
          </p>
          <p className={takeawayCls}>
            Takeaway: PNG&apos;s advantage is how it&apos;s billed, not a guaranteed rupee saving
            — compare your own CGD&apos;s rate against your actual cylinder cost before
            assuming.
          </p>
        </section>

        <section aria-labelledby="what-this-means" className="mt-10 scroll-mt-20">
          <h2 id="what-this-means" className={h2Cls}>
            What This Means for Your Bill
          </h2>
          <p className={pCls}>
            The January 2026 reform lowered one upstream input cost nationwide, but your actual
            retail rate is still set by your specific CGD and your state&apos;s VAT. Once you know
            which CGD serves you, check your exact current rate rather than relying on a national
            average — our{' '}
            <Link href="/gas" className="text-brass underline">
              Gas Bill Calculator hub
            </Link>{' '}
            covers every major Indian city gas company, including{' '}
            <Link href="/gas/mahanagar-gas" className="text-brass underline">
              Mahanagar Gas
            </Link>{' '}
            (Mumbai),{' '}
            <Link href="/gas/igl" className="text-brass underline">
              IGL
            </Link>{' '}
            (Delhi) and{' '}
            <Link href="/gas/gujarat-gas" className="text-brass underline">
              Gujarat Gas
            </Link>
            . If you&apos;re also comparing your overall household utility costs, see how our{' '}
            <Link href="/electricity" className="text-brass underline">
              electricity bill calculators
            </Link>{' '}
            work the same way — your own rate and consumption, not a national estimate.
          </p>
          <p className={takeawayCls}>
            Takeaway: use your own CGD&apos;s current rate and your own consumption — this
            article explains the mechanism, not a number to plug in blindly.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/gas"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🔥
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Gas Bill Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Estimate your PNG bill for your own city gas company.
              </p>
            </Link>
            <Link
              href="/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ⚡
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Electricity Calculators</p>
              <p className="mt-1 text-xs text-ash/60">
                The same own-rate, own-consumption approach for your power bill.
              </p>
            </Link>
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How telescopic electricity slabs work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                A cross-utility look at how another bill structure is designed.
              </p>
            </Link>
            <Link
              href="/blog/how-water-bills-calculated-india"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💧
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How water bills are calculated in India
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Another utility, the same city-by-city variation in rates.
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
          Last verified: {LAST_VERIFIED}. CGD-specific retail rates and one-time fee schedules are
          the fastest-moving facts in this guide and are not centrally published — check your
          own city gas company&apos;s current rate on our{' '}
          <Link href="/gas" className="text-brass underline">
            gas calculators
          </Link>{' '}
          rather than relying on any figure here. See our{' '}
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
