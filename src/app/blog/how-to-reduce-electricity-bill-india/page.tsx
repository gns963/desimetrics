import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/how-to-reduce-electricity-bill-india'
const TITLE = 'How to Actually Reduce Your Electricity Bill in India'
const DESCRIPTION =
  'Generic tips have a ceiling. Find your actual biggest driver — AC, geyser, slab position, or fixed charges — and go straight to the specific guide and calculator that fixes it.'
const LAST_VERIFIED = '26 September 2026'

export const metadata: Metadata = {
  title: 'How to Reduce Your Electricity Bill in India: 2026 Guide',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Electricity', path: '/electricity' },
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
    q: 'What\'s the single biggest thing driving up my electricity bill?',
    a: 'For most households with one, it\'s the AC — especially if it runs 6+ hours a day. Water heating (geysers) is a close second, since it draws very high wattage even for brief use. Refrigeration runs 24/7 but at much lower wattage, so it adds up steadily rather than spiking your bill.',
  },
  {
    q: 'Do small habits like unplugging chargers actually reduce my bill meaningfully?',
    a: 'They have a real but genuinely small effect — chargers and standby devices draw very little wattage compared to an AC or geyser. Worth doing, but don\'t expect it to move your bill the way fixing an oversized AC habit or a slab-crossing usage pattern would.',
  },
  {
    q: 'Why did my bill jump even though I didn\'t use much more electricity?',
    a: 'Most Indian electricity tariffs are telescopic — later units in a billing cycle cost more per unit than earlier ones. A small increase in usage can push your LAST units into a higher-priced slab, disproportionately raising your total bill compared to the extra units alone.',
  },
  {
    q: 'Is it better to reduce usage or install solar?',
    a: 'They\'re different levers, not competing options. Reducing usage lowers your actual consumption; rooftop solar with net metering doesn\'t reduce consumption at all — it changes how much of that consumption is billed at the grid rate. Many households benefit from both together.',
  },
  {
    q: 'How do I know if my AC or my geyser is costing me more?',
    a: 'Compare their wattage and how many hours each actually runs per day — an AC often runs longer per day, while a geyser runs briefly but at high wattage. Use our AC and geyser running-cost guides together with the appliance cost calculator to compare your own actual numbers.',
  },
  {
    q: 'Does a smart meter help reduce my electricity bill?',
    a: 'Indirectly — a smart meter makes your real-time consumption visible, which behaviorally helps some households cut usage. It doesn\'t change your tariff rate or your appliances\' actual power draw by itself; the saving comes from what you do with that visibility, not the meter itself.',
  },
  {
    q: 'Can reducing my sanctioned load lower my bill?',
    a: 'Potentially, since fixed/demand charges are often based on your sanctioned load rather than actual usage — if it\'s genuinely oversized for your needs, right-sizing it can lower that fixed component. This is separate from usage-reduction tips and worth checking if your fixed charges seem high relative to your consumption.',
  },
  {
    q: 'Why does a small increase in usage sometimes cause a big jump in my bill?',
    a: 'Because telescopic slabs mean your additional units are charged at whatever rate applies to your NEW total, not your old one — crossing into a higher slab band means those extra units, and sometimes the framing of nearby units too, cost more per unit than what you were paying before.',
  },
  {
    q: 'How much can I realistically save by switching to a 5-star appliance?',
    a: 'It depends entirely on your specific appliance, how often you use it, and your tariff — there\'s no universal percentage that applies to every household. A higher star rating generally means better efficiency, but quantify it for your own situation using the relevant calculator rather than a generic claimed figure.',
  },
  {
    q: 'What\'s the fastest way to find out exactly what I should be paying?',
    a: 'Use your own state\'s electricity bill calculator with your actual DISCOM, tariff category and consumption — that gives you a real, state-specific figure instead of a generic national estimate, which is the honest starting point before trying any specific reduction strategy.',
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

export default function ReduceElectricityBillPage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Reduce Your Electricity Bill', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💡</span> Electricity Guide
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
          Most &ldquo;10 tips to save electricity&rdquo; articles are generic and low-value —
          turn off lights, unplug chargers — because they ignore that in most Indian homes, a
          small number of specific things drive almost the entire bill: a handful of
          high-wattage appliances (AC, geyser), and billing mechanics like which tariff slab
          you&apos;re in or whether your sanctioned load is oversized. The real way to
          &ldquo;actually&rdquo; reduce your bill is to <strong>identify your specific biggest
          driver first</strong>, then fix that one thing — not apply the same generic checklist
          regardless of your actual situation. This guide helps you diagnose which driver is
          yours, then sends you straight to the specific guide and calculator that solves it.
        </p>

        <section aria-labelledby="big-four" className="mt-10 scroll-mt-20">
          <h2 id="big-four" className={h2Cls}>
            Where Your Bill Actually Goes: The Big Four
          </h2>
          <p className={pCls}>
            Across our own research on this site, four things account for most of what makes
            one household&apos;s bill different from another&apos;s:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Air conditioning', 'typically the single largest load when present, especially run 6+ hours a day — see our AC running cost guide.'],
              ['Water heating (geyser)', 'very high wattage even for brief use, and easy to underestimate — see our geyser running cost guide.'],
              ['Refrigeration', 'lower wattage than AC or a geyser, but runs 24/7, so it adds up steadily rather than spiking any single bill.'],
              ['Your slab position', 'telescopic tariffs mean your LAST units in a cycle often cost more per unit than your first — see how telescopic slabs work.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-electricity" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: fixing one of these four usually moves your bill more than a whole list of
            small habit changes combined.
          </p>
        </section>

        <section aria-labelledby="diagnostic" className="mt-10 scroll-mt-20">
          <h2 id="diagnostic" className={h2Cls}>
            Find Your Situation
          </h2>
          <p className={pCls}>
            Match your situation to the specific guide or calculator that actually addresses it:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">If this describes your situation…</th>
                  <th className="px-4 py-2 font-semibold">Start here</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2">Your AC runs several hours a day and you suspect it&apos;s your biggest cost</td>
                  <td className="px-4 py-2">
                    <Link href="/blog/ac-running-cost-india-guide" className="text-brass underline">AC running cost guide</Link>
                    {' + '}
                    <Link href="/ac/bill-calculator" className="text-brass underline">AC bill calculator</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Your geyser/water heater usage jumped (e.g. winter) and your bill followed</td>
                  <td className="px-4 py-2">
                    <Link href="/blog/geyser-water-heater-running-cost-india" className="text-brass underline">Geyser running cost guide</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Your units are roughly the same as last month but your bill still changed</td>
                  <td className="px-4 py-2">
                    <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">Fixed Charges vs FCA explained</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Your bill jumped sharply after a small increase in usage</td>
                  <td className="px-4 py-2">
                    <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">How telescopic slabs actually work</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">A smart meter was recently installed and you&apos;re confused by prepaid/recharge</td>
                  <td className="px-4 py-2">
                    <Link href="/blog/smart-meters-in-india-guide" className="text-brass underline">Smart meter guide</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">You&apos;re thinking about rooftop solar instead of just cutting usage</td>
                  <td className="px-4 py-2">
                    <Link href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide" className="text-brass underline">PM Surya Ghar guide</Link>
                    {' + '}
                    <Link href="/blog/net-metering-explained-india" className="text-brass underline">Net metering explained</Link>
                    {' + '}
                    <Link href="/solar/roi-calculator" className="text-brass underline">Solar ROI calculator</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">You just want to see your actual estimated bill for your state right now</td>
                  <td className="px-4 py-2">
                    <Link href="/electricity" className="text-brass underline">Your state&apos;s electricity bill calculator</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: pick your row, click through, and you&apos;ll get the specific depth this
            article deliberately doesn&apos;t duplicate.
          </p>
        </section>

        <section aria-labelledby="if-ac" className="mt-10 scroll-mt-20">
          <h2 id="if-ac" className={h2Cls}>
            If Your AC Is the Problem
          </h2>
          <p className={pCls}>
            Cost depends on tonnage, hours of use and your own state&apos;s tariff — not the
            star rating alone. Our{' '}
            <Link href="/blog/ac-running-cost-india-guide" className="text-brass underline">
              AC running cost guide
            </Link>{' '}
            covers the full mechanism, typical wattage by tonnage and star rating, and what the
            2026 BEE re-rating actually changed. Plug your own hours into the{' '}
            <Link href="/ac/bill-calculator" className="text-brass underline">
              AC bill calculator
            </Link>{' '}
            for the real rupee number.
          </p>
        </section>

        <section aria-labelledby="if-geyser" className="mt-10 scroll-mt-20">
          <h2 id="if-geyser" className={h2Cls}>
            If Your Geyser Is the Problem
          </h2>
          <p className={pCls}>
            Tank size isn&apos;t the real driver — wattage and heating time are. Our{' '}
            <Link href="/blog/geyser-water-heater-running-cost-india" className="text-brass underline">
              geyser running cost guide
            </Link>{' '}
            explains why, with typical wattage by type and a worked monthly example, plus honest
            guidance on the standby-vs-switch-off question that most other guides oversimplify.
          </p>
        </section>

        <section aria-labelledby="if-slab" className="mt-10 scroll-mt-20">
          <h2 id="if-slab" className={h2Cls}>
            If You&apos;re Crossing Into a Higher Slab
          </h2>
          <p className={pCls}>
            Because most Indian tariffs are telescopic, dropping your usage just enough to fall
            back into a lower slab band can save disproportionately more than the same unit
            reduction within a lower band. See{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic slabs actually work
            </Link>{' '}
            to understand the mechanism, then check your own state&apos;s exact slab boundaries
            on your{' '}
            <Link href="/electricity/tneb-bill-calculator" className="text-brass underline">
              TNEB
            </Link>
            ,{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            or{' '}
            <Link href="/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM
            </Link>{' '}
            calculator, or find your own state on our{' '}
            <Link href="/electricity" className="text-brass underline">
              electricity hub
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="if-fixed" className="mt-10 scroll-mt-20">
          <h2 id="if-fixed" className={h2Cls}>
            If Your Fixed Charge or Duty Seems Too High
          </h2>
          <p className={pCls}>
            Not all of your bill is usage-driven — fixed/demand charges and electricity duty
            don&apos;t change with consumption, so pure usage-reduction has a ceiling. If your
            sanctioned load is genuinely oversized for your actual needs, right-sizing it is a
            separate, legitimate lever many households overlook. See our{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              Fixed Charges vs FCA
            </Link>{' '}
            explainer to see exactly which parts of your bill these are.
          </p>
        </section>

        <section aria-labelledby="if-solar" className="mt-10 scroll-mt-20">
          <h2 id="if-solar" className={h2Cls}>
            If You&apos;re Considering Solar Instead of Just Reducing Usage
          </h2>
          <p className={pCls}>
            Solar is a structurally different lever, not a &ldquo;tip.&rdquo; Rooftop solar with
            net metering doesn&apos;t reduce your consumption — it changes how much of that
            consumption is billed at the grid rate. Start with our{' '}
            <Link href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide" className="text-brass underline">
              PM Surya Ghar subsidy guide
            </Link>{' '}
            for the ₹78,000 central subsidy, read{' '}
            <Link href="/blog/net-metering-explained-india" className="text-brass underline">
              net metering explained
            </Link>{' '}
            to understand how exported units actually get credited, then run your real numbers
            on our{' '}
            <Link href="/solar/roi-calculator" className="text-brass underline">
              Solar ROI Calculator
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="low-effort" className="mt-10 scroll-mt-20">
          <h2 id="low-effort" className={h2Cls}>
            The Genuinely Low-Effort Tips That Still Help
          </h2>
          <p className={pCls}>
            These are real, but supplementary — don&apos;t expect them to compete with fixing
            your AC, geyser or slab position:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Moderate your geyser\'s thermostat', 'a setting around 45–50°C is usually enough and uses less energy per cycle than maximum.'],
              ['Match appliance size to actual need', 'an oversized AC or geyser tank costs more to run than one sized to your real usage.'],
              ['Turn off standby devices and unused lights', 'a real but comparatively small effect next to your major appliances\' usage.'],
              ['Check your sanctioned load periodically', 'a load that no longer matches your household\'s needs is worth revisiting.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-electricity" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: do these too, but don&apos;t mistake them for the main event — diagnose
            your biggest driver first, using the table above.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related guides and calculators
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['/blog/ac-running-cost-india-guide', '❄️', 'AC running cost guide', 'Tonnage, hours and tariff — not just star rating.'],
              ['/blog/geyser-water-heater-running-cost-india', '🚿', 'Geyser running cost guide', 'Why tank size isn\'t the real cost driver.'],
              ['/blog/how-telescopic-electricity-slabs-work', '📘', 'How telescopic slabs work', 'Why your last units cost the most.'],
              ['/blog/fixed-charges-vs-fca-electricity-bill', '📄', 'Fixed Charges vs FCA', 'The parts of your bill usage-reduction can\'t touch.'],
              ['/blog/smart-meters-in-india-guide', '📟', 'Smart meters in India', 'Prepaid billing and what visibility actually changes.'],
              ['/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide', '💸', 'PM Surya Ghar subsidy guide', 'The ₹78,000 central rooftop solar subsidy.'],
              ['/blog/net-metering-explained-india', '🔌', 'Net metering explained', 'How exported solar units get credited.'],
              ['/electricity', '⚡', 'Electricity Bill Calculators', 'Find your own state and DISCOM.'],
            ].map(([href, emoji, title, body]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
              >
                <span className="text-xl" aria-hidden>{emoji}</span>
                <p className="font-display mt-2 font-bold text-ink-navy">{title}</p>
                <p className="mt-1 text-xs text-ash/60">{body}</p>
              </Link>
            ))}
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
          Last verified: {LAST_VERIFIED}. This is a navigational guide meant to point you to the
          right specific deep-dive — the tariff and appliance figures live in, and are kept
          current on, the individual articles and calculators it links to. See our{' '}
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
