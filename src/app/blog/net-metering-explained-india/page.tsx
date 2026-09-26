import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/net-metering-explained-india'
const TITLE = 'Net Metering Explained: How Rooftop Solar Actually Reduces Your Electricity Bill'
const DESCRIPTION =
  'What net metering actually is, how exported solar units get credited against your bill, how it differs from gross metering, and how the rules vary by state.'
const LAST_VERIFIED = '26 September 2026'

export const metadata: Metadata = {
  title: 'Net Metering Explained 2026 — How Rooftop Solar Credits Work',
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
  datePublished: '2026-09-26',
  dateModified: '2026-09-26',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'What is net metering?',
    a: 'Net metering is the mechanism that lets a rooftop solar system export surplus electricity it generates but doesn’t immediately use into the grid, and credits the household for those exported units against electricity it draws from the grid at other times — effectively banking daytime surplus against night-time or cloudy-day consumption.',
  },
  {
    q: 'How does net metering reduce my electricity bill?',
    a: 'Your bill is based on the NET difference between what you drew from the grid and what you exported, not your gross consumption. If you export more than you draw in a billing cycle, that surplus typically carries forward or is settled as a credit, directly lowering what you owe compared to having no solar at all.',
  },
  {
    q: 'What is the difference between net metering and gross metering?',
    a: 'Net metering measures only the difference between what you draw and export, reducing your existing bill. Gross metering sells your ENTIRE solar generation to the DISCOM at a separate rate while you pay full retail price for all your consumption — two separate transactions instead of one netted bill.',
  },
  {
    q: 'Do I need net metering to benefit from PM Surya Ghar?',
    a: 'Yes, in practice — net metering is what actually lets your PM Surya Ghar-subsidised system offset your bill using exported surplus, not just the power you use in real time. For systems up to 10 kW installed under the scheme, many states streamline this into deemed approval, skipping a separate manual DISCOM inspection.',
  },
  {
    q: 'What is a bidirectional meter?',
    a: 'A bidirectional meter records electricity flowing in both directions — how much you draw from the grid and how much your solar system exports to it — which is what makes net metering\'s crediting mechanism possible. A standard one-way meter can\'t support net metering at all.',
  },
  {
    q: 'Are net metering rules the same across all Indian states?',
    a: 'No — CERC sets the central regulatory framework, but each State Electricity Regulatory Commission (SERC) and DISCOM sets its own implementation details: system size caps, the credit rate for exported units, and the application process. Always check your own state/DISCOM\'s current rules rather than assume another state\'s rules apply to you.',
  },
  {
    q: 'What is virtual or group net metering?',
    a: 'An emerging model, introduced or proposed in some states (Andhra Pradesh is a 2025 example), that lets a group of consumers — such as an apartment complex or housing society — share credits from one shared rooftop solar installation, instead of requiring a separate system per individual meter. It isn\'t available everywhere.',
  },
  {
    q: 'How do I apply for net metering?',
    a: 'Generally: choose an MNRE-empanelled/registered vendor, submit the required documents to your DISCOM, get the system installed, go through DISCOM inspection (or deemed approval where applicable), and have a bidirectional meter installed. Exact steps and document requirements vary by DISCOM.',
  },
  {
    q: 'Is there a limit to how much solar capacity I can install under net metering?',
    a: 'Most states cap net-metered system size, often relative to your sanctioned electricity load, but the exact cap varies by state and DISCOM — there is no single national limit. Confirm your specific DISCOM\'s current cap before finalising your system size with your installer.',
  },
  {
    q: 'What happens to unused exported solar credits at the end of a billing cycle?',
    a: 'This depends on your state/DISCOM\'s specific rules — some carry credits forward to future billing cycles, some settle or lapse them after a defined period (often annually). Check your own DISCOM\'s policy rather than assume credits roll over indefinitely.',
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

const meteringComparisonRows: [string, string, string][] = [
  [
    'What\'s measured',
    'The NET difference between what you draw from the grid and what you export',
    'ALL solar generation is exported and sold at a set rate; ALL household consumption is separately billed at retail rate',
  ],
  [
    'Typical use case',
    'Most common model for residential rooftop solar in India',
    'More common for larger/commercial installations in some states',
  ],
  [
    'Bill impact',
    'Reduces your net electricity bill directly through credited exports',
    'You receive separate payment for generation and pay separately for consumption',
  ],
]

export default function NetMeteringExplainedPage() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Net Metering Explained', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Solar Explainer
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
          <strong>Net metering</strong> is the mechanism that lets your rooftop solar
          system&apos;s surplus daytime generation actually reduce your bill, instead of only
          saving money on whatever you happen to be using the moment the sun is out. Here&apos;s
          the mechanism in one example: if your system generates <strong>20 units</strong> on a
          given day and your household consumes <strong>12 units</strong> during that time, the
          remaining <strong>8 units</strong> are exported to the grid and credited — reducing
          what you&apos;re billed for electricity you draw from the grid at other times, like at
          night. Without net metering, that surplus 8 units would simply be wasted. This is the
          single piece of the rooftop solar puzzle most subsidy-focused guides skip past, and
          it&apos;s exactly what decides whether solar actually pays off for you.
        </p>

        <section aria-labelledby="how-it-works" className="mt-10 scroll-mt-20">
          <h2 id="how-it-works" className={h2Cls}>
            How Does Net Metering Actually Work, Step by Step?
          </h2>
          <p className={pCls}>
            A bidirectional meter — one that records electricity flowing both ways — is what
            makes the whole mechanism possible:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['You consume solar power first', 'whatever your household uses in real time is drawn directly from your panels, at no cost.'],
              ['Surplus generation exports to the grid', 'power you generate but don\'t use immediately flows outward, recorded by your bidirectional meter.'],
              ['Grid draw is recorded the same way', 'whenever your consumption exceeds your generation (at night, for example), you draw from the grid as normal.'],
              ['Your bill nets the two out', 'at billing time, your exported units are credited against your grid draw, so you only pay for the net difference.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-solar" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 ${pCls}`}>
            Once you understand how your exports actually get credited, you can estimate your
            real payback rather than a rough guess — our{' '}
            <Link href="/solar/roi-calculator" className="text-brass underline">
              Solar ROI Calculator
            </Link>{' '}
            models this using your own consumption pattern and state tariff.
          </p>
          <p className={takeawayCls}>
            Takeaway: net metering is what turns unused daytime generation into real bill
            savings — without it, solar only pays off on power used the instant it&apos;s made.
          </p>
        </section>

        <section aria-labelledby="net-vs-gross" className="mt-10 scroll-mt-20">
          <h2 id="net-vs-gross" className={h2Cls}>
            Net Metering vs Gross Metering: What&apos;s the Difference?
          </h2>
          <p className={pCls}>
            These are genuinely different models, and mixing them up leads to wrong
            expectations about how your bill will actually change:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">Net metering</th>
                  <th className="px-4 py-2 font-semibold">Gross metering</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {meteringComparisonRows.map(([label, net, gross]) => (
                  <tr key={label}>
                    <td className="px-4 py-2 font-medium">{label}</td>
                    <td className="px-4 py-2 font-display font-bold text-hub-solar">{net}</td>
                    <td className="px-4 py-2">{gross}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: most residential rooftop solar in India uses net metering — if a scheme
            you&apos;re looking at mentions selling all your generation separately, that&apos;s
            gross metering, a different arrangement.
          </p>
        </section>

        <section aria-labelledby="why-varies" className="mt-10 scroll-mt-20">
          <h2 id="why-varies" className={h2Cls}>
            Why Do Net Metering Rules Vary by State?
          </h2>
          <p className={pCls}>
            Net metering operates under a framework set centrally by the Central Electricity
            Regulatory Commission (CERC), but the actual implementation details — system size
            caps, the credit rate for exported units, and the application process — are set
            individually by each State Electricity Regulatory Commission (SERC) and DISCOM. This
            is genuinely different from electricity billing&apos;s broadly standardised
            slab-based structure, which is exactly why this article teaches you the mechanism
            rather than hand you one number to expect everywhere.
          </p>
          <p className={takeawayCls}>
            Takeaway: always confirm your own state/DISCOM&apos;s specific net metering rules —
            a number you read for another state may not apply to you at all.
          </p>
        </section>

        <section aria-labelledby="maharashtra-2026" className="mt-10 scroll-mt-20">
          <h2 id="maharashtra-2026" className={h2Cls}>
            A 2026 Example of How Rules Evolve: Maharashtra&apos;s Updated Billing Rules
          </h2>
          <p className={pCls}>
            Rules don&apos;t stay fixed once you install — Maharashtra (MSEDCL) is a useful,
            dated example of that. From new billing rules effective{' '}
            <strong>1 April 2026</strong>, Maharashtra ended its earlier form of
            &ldquo;banking&rdquo; deductions and introduced a new{' '}
            <strong>grid-support charge</strong> applicable to a solar system&apos;s TOTAL
            generation (not just exported units) for larger systems. Systems up to{' '}
            <strong>10 kW</strong> applied for under PM Surya Ghar continue to receive{' '}
            <strong>deemed approval</strong> — no manual DISCOM technical inspection required
            before connection.
          </p>
          <p className={`mt-3 ${pCls}`}>
            This is presented here as one state&apos;s specific, dated update — not a template
            for what to expect in your own state. It illustrates a real pattern worth knowing
            about: net metering terms can become more complex over time, including new charges
            that didn&apos;t exist when you first researched solar.
          </p>
          <p className={takeawayCls}>
            Takeaway: check your DISCOM&apos;s CURRENT rules before installing, even if you
            researched net metering a year or two ago — the terms can change.
          </p>
        </section>

        <section aria-labelledby="surya-ghar-link" className="mt-10 scroll-mt-20">
          <h2 id="surya-ghar-link" className={h2Cls}>
            How Net Metering Connects to PM Surya Ghar
          </h2>
          <p className={pCls}>
            For systems installed under the{' '}
            <Link href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide" className="text-brass underline">
              PM Surya Ghar Muft Bijli Yojana
            </Link>{' '}
            scheme, up to 10 kW, the net metering connection process is generally streamlined
            through deemed approval in states that have adopted this — reducing the need for a
            separate manual DISCOM inspection before you&apos;re actually connected and
            generating credited exports. The subsidy gets your system installed; net metering is
            the separate mechanism that actually turns your generation into bill savings — see
            our full subsidy guide for the ₹78,000 cap, eligibility and application steps.
          </p>
          <p className={takeawayCls}>
            Takeaway: the subsidy and net metering are two different steps in the same journey —
            getting the subsidy doesn&apos;t automatically mean your export-crediting is set up
            until net metering is separately approved and your meter is installed.
          </p>
        </section>

        <section aria-labelledby="virtual-metering" className="mt-10 scroll-mt-20">
          <h2 id="virtual-metering" className={h2Cls}>
            Virtual/Group Net Metering — An Emerging Option for Apartments and Societies
          </h2>
          <p className={pCls}>
            Some states have started introducing virtual or group net metering, which lets a
            GROUP of consumers — such as an apartment complex or housing society — share credits
            from one shared rooftop solar installation, instead of every individual meter needing
            its own separate system. Andhra Pradesh is a cited 2025 example of a state that has
            proposed or introduced this model.
          </p>
          <p className={`mt-3 ${pCls}`}>
            This is an emerging option available in some states, not a universal one — if you
            live in an apartment or society without your own dedicated rooftop access, check
            whether your specific state has adopted a virtual/group net metering framework before
            assuming individual net metering is your only path to solar savings.
          </p>
          <p className={takeawayCls}>
            Takeaway: not having your own rooftop doesn&apos;t automatically rule out solar
            savings — check whether your state offers a group/virtual net metering option.
          </p>
        </section>

        <section aria-labelledby="how-to-apply" className="mt-10 scroll-mt-20">
          <h2 id="how-to-apply" className={h2Cls}>
            How Do You Apply for Net Metering, Generally?
          </h2>
          <p className={pCls}>
            The typical path, though exact steps and documents vary by DISCOM:
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Choose an MNRE-empanelled/registered vendor for your installation.',
              'Submit the required application and documents to your DISCOM.',
              'Get your rooftop solar system installed by your chosen vendor.',
              'Go through DISCOM inspection — or deemed approval, where your state/scheme allows it.',
              'Have a bidirectional meter installed, which is what actually enables net metering\'s crediting mechanism.',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-solar font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={takeawayCls}>
            Takeaway: this is a general, typical sequence — your own DISCOM may add or skip
            steps, so confirm the exact process with them directly before assuming this applies
            exactly to you.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/solar/net-metering-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🔌
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Net Metering Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Model your own export/import split and credits.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Solar ROI Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Your real payback, priced on your own DISCOM&apos;s tariff.
              </p>
            </Link>
            <Link
              href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💸
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PM Surya Ghar Muft Bijli Yojana: Full Subsidy Guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The ₹78,000 subsidy, eligibility and how to apply.
              </p>
            </Link>
            <Link
              href="/blog/is-rooftop-solar-worth-it-in-india-2026"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Is rooftop solar worth it in India in 2026?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The broader cost, payback and pros/cons decision.
              </p>
            </Link>
            <Link
              href="/blog/rooftop-solar-system-cost-india"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💰
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How much does rooftop solar actually cost?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Real installed-cost ranges by system size, before and after subsidy.
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
          Last verified: {LAST_VERIFIED}. State-specific net metering rules — especially system
          size caps and any newly introduced charges like Maharashtra&apos;s 2026 grid-support
          charge — are the fastest-moving facts in this guide. Confirm current rules with your own
          DISCOM before installing. See our{' '}
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
