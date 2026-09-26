import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/geyser-water-heater-running-cost-india'
const TITLE = 'How Much Does Running a Geyser Actually Cost in India?'
const DESCRIPTION =
  'Geyser running cost depends on wattage and heating time — not tank size alone. The real formula, typical wattage by type, and how to actually cut the cost.'
const LAST_VERIFIED = '26 September 2026'

export const metadata: Metadata = {
  title: 'Geyser Running Cost in India: Full 2026 Guide',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
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
    q: 'How much electricity does a geyser use per hour?',
    a: 'A typical storage geyser draws roughly 1,500–3,000 W while actively heating, so running one for a full hour uses roughly 1.5–3 units — but most geysers don\'t heat continuously for a full hour per use, so your actual per-use consumption is usually a fraction of that, depending on your wattage and heating time.',
  },
  {
    q: 'Does a bigger geyser tank mean a bigger electricity bill?',
    a: 'Not directly — wattage and heating time drive cost, not litres. A larger tank often costs more mainly because it takes longer to heat a bigger volume and loses more standing heat over time, not because capacity itself consumes electricity. Two geysers with the same wattage and heating time cost roughly the same regardless of tank size.',
  },
  {
    q: 'How is geyser running cost calculated?',
    a: 'The same formula as any electrical appliance: units (kWh) = watts × hours ÷ 1,000. Multiply that by how many times you use it across a month, then apply your own state\'s electricity tariff to get the actual rupee cost — there\'s no single national figure that applies to everyone.',
  },
  {
    q: 'Is an instant geyser cheaper to run than a storage geyser?',
    a: 'It depends on your usage pattern, not a fixed rule. Instant geysers use high wattage but only for a few minutes per use; storage geysers use lower wattage but heat and maintain a larger volume over a longer period. A single person using an instant geyser briefly may pay less than running a large storage tank for a big family — there\'s no universal winner.',
  },
  {
    q: 'Does leaving a geyser on standby waste electricity?',
    a: 'It depends on your usage pattern and the unit\'s insulation quality — a well-insulated geyser retains heat efficiently, so standby loss is modest, while switching off and reheating from a cold start each time isn\'t automatically cheaper either. There\'s no single correct answer here; it genuinely depends on how often you use hot water and your specific geyser\'s insulation.',
  },
  {
    q: 'What temperature setting saves the most electricity on a geyser?',
    a: 'A lower thermostat setting, commonly cited around 45–50°C, uses less energy per heating cycle than running at maximum, since less energy is needed to reach a lower target — while still being sufficient for most bathing and washing needs in typical Indian climates.',
  },
  {
    q: 'Does a higher star rating actually reduce a geyser\'s running cost?',
    a: 'Generally yes, in principle — a higher BEE star rating on a geyser typically reflects better insulation and heating efficiency, meaning less energy is needed to maintain temperature and reheat over time. We haven\'t independently verified an exact percentage saving for geysers specifically, so treat this as a general efficiency signal rather than a precise guaranteed number.',
  },
  {
    q: 'How many units does a 15-litre geyser use per month?',
    a: 'Illustratively, a 2,000 W 15-litre storage geyser run for about 30 minutes a day uses roughly 1 unit a day, or about 30 units a month — but this depends entirely on your actual wattage and daily heating time. Use our appliance cost calculator with your own numbers for a real figure.',
  },
  {
    q: 'Why does my geyser push my electricity bill into a higher slab?',
    a: 'Many Indian electricity tariffs are telescopic — later units in a billing cycle are charged at a higher rate than earlier ones. A geyser\'s added units, especially in winter when it runs longer and more often, can be exactly what tips your total consumption into a costlier slab, not just adding units at your average rate.',
  },
  {
    q: 'What\'s the simplest way to reduce my geyser\'s electricity cost?',
    a: 'Lower the thermostat to a moderate setting (commonly 45–50°C is enough for most needs), avoid oversizing your tank relative to your actual household usage, and consider a higher star-rated model for better insulation — small, low-effort changes rather than avoiding hot water altogether.',
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

const wattageRows: [string, string][] = [
  ['10 L storage', '~2,000 W'],
  ['15 L storage', '~2,000 W'],
  ['25 L storage', '~3,000 W'],
  ['Small instant (3–5 L)', '~3,000 W'],
]

const workedExample: { step: string; calc: string; result: string }[] = [
  { step: 'Geyser wattage (15 L storage, illustrative)', calc: '2,000 W', result: '2 kW' },
  { step: 'Daily heating time (illustrative assumption)', calc: '~30 minutes/day', result: '1 unit/day' },
  { step: 'Monthly use (30 days)', calc: '1 × 30', result: '≈ 30 units/month' },
]

export default function GeyserRunningCostGuidePage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Geyser Running Cost', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🚿</span> Appliances Explainer
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
          A geyser&apos;s running cost comes down to one formula:{' '}
          <strong>units (kWh) = watts × hours ÷ 1,000</strong>, multiplied by how often you use
          it and priced at your own state&apos;s electricity tariff. The correction most guides
          skip: <strong>tank size alone doesn&apos;t drive cost</strong> — wattage and how long
          it actually heats do. A bigger tank often costs more mainly because it takes longer to
          heat and loses more standing heat, not because of its litres by themselves. There is no
          single national rupee figure that applies to every household — this guide gives you the
          real mechanism and typical wattage figures, then points you to your own state&apos;s
          calculator for the actual number.
        </p>

        <section aria-labelledby="how-calculated" className="mt-10 scroll-mt-20">
          <h2 id="how-calculated" className={h2Cls}>
            How Is Geyser Running Cost Actually Calculated?
          </h2>
          <p className={pCls}>
            Every electrical appliance follows the same basic formula, and a geyser is no
            different:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Units = watts × hours ÷ 1,000', 'a 2,000 W geyser run for 1 hour uses 2 units that day; run for 30 minutes, it uses 1 unit.'],
              ['A 3,000 W geyser run for 10 minutes', 'uses about 0.5 units — high wattage for a short burst can use less than lower wattage for longer.'],
              ['Monthly cost = daily units × days used', 'multiply your typical per-use consumption by how often you actually heat water across the month.'],
              ['Apply your own state\'s tariff', 'the same unit count costs a different rupee amount depending on your DISCOM\'s slab rates.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-appliance" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: it&apos;s wattage and time, not tank size, that decide how many units your
            geyser actually uses.
          </p>
        </section>

        <section aria-labelledby="tank-size-myth" className="mt-10 scroll-mt-20">
          <h2 id="tank-size-myth" className={h2Cls}>
            Why Tank Size Isn&apos;t the Real Driver of Cost
          </h2>
          <p className={pCls}>
            A 25-litre geyser doesn&apos;t cost more to run than a 10-litre one simply because
            it holds more water. It typically costs more because of two separate effects: it
            takes longer to heat the larger volume from cold, and once heated, a bigger tank has
            more surface area losing heat gradually while sitting idle. Two geysers with
            identical wattage and identical heating time use roughly the same electricity,
            regardless of how many litres each holds.
          </p>
          <p className={takeawayCls}>
            Takeaway: buy a tank sized to your household&apos;s actual usage, not the biggest one
            available — oversizing adds cost through longer heating and standing loss, not
            through capacity itself.
          </p>
        </section>

        <section aria-labelledby="wattage-table" className="mt-10 scroll-mt-20">
          <h2 id="wattage-table" className={h2Cls}>
            Typical Wattage by Geyser Type and Size
          </h2>
          <p className={pCls}>
            These are illustrative, typical figures — actual wattage varies by brand and model,
            so check your own unit&apos;s rating plate for the exact number:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Type &amp; size</th>
                  <th className="px-4 py-2 font-semibold">Typical wattage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {wattageRows.map(([type, watts]) => (
                  <tr key={type}>
                    <td className="px-4 py-2 font-medium">{type}</td>
                    <td className="px-4 py-2 font-display font-bold text-hub-appliance">{watts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: instant geysers and larger storage tanks both commonly sit around 3,000 W —
            what differs most is how long each type actually runs per use.
          </p>
        </section>

        <section aria-labelledby="instant-vs-storage" className="mt-10 scroll-mt-20">
          <h2 id="instant-vs-storage" className={h2Cls}>
            Instant vs Storage Geysers: The Real Cost Tradeoff
          </h2>
          <p className={pCls}>
            Neither type is universally cheaper — it depends on your household&apos;s usage
            pattern:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Instant geysers', 'heat water on demand in short bursts (a few minutes) at high wattage — well suited to quick, occasional use by fewer people.'],
              ['Storage geysers', 'heat and then maintain a tank over a longer period at lower wattage — suited to households needing hot water across multiple uses without waiting.'],
              ['Usage pattern matters more than type', 'a single person using an instant geyser briefly may spend less than a family running a large storage tank daily — and vice versa for different patterns.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-appliance" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: choose based on your household&apos;s hot-water usage pattern, not a
            claimed universal winner — both types can be the cheaper option depending on how you
            actually use hot water.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: What Does a 15-Litre Geyser Actually Cost Per Month?
          </h2>
          <p className={pCls}>
            Using the illustrative wattage from the table above, and a stated assumption of 30
            minutes of daily heating over 30 days:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Step</th>
                  <th className="px-4 py-2 font-semibold">Calculation</th>
                  <th className="px-4 py-2 text-right font-semibold">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {workedExample.map((r) => (
                  <tr key={r.step}>
                    <td className="px-4 py-2 font-medium">{r.step}</td>
                    <td className="px-4 py-2 text-ash/70">{r.calc}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{r.result}</td>
                  </tr>
                ))}
                <tr className="bg-mist/60">
                  <td className="px-4 py-2 font-semibold text-ink-navy">Bill impact</td>
                  <td className="px-4 py-2 text-ash/70" colSpan={2}>
                    Apply your own state&apos;s slab rate to these ~30 units — this is exactly
                    where the real rupee number depends on where you live.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            This is illustrative math built on a stated assumption (30 minutes/day, 30 days, a
            typical 2,000 W wattage) — your actual heating time and wattage will change the unit
            count, and your state&apos;s tariff will change the rupee figure entirely. See the
            real number for yourself with our{' '}
            <Link href="/electricity/appliance-cost-calculator" className="font-semibold text-brass underline">
              appliance cost calculator
            </Link>
            , which already has a geyser preset, or price it against a specific state&apos;s
            slabs directly, e.g.{' '}
            <Link href="/electricity/tneb-bill-calculator" className="text-brass underline">
              TNEB (Tamil Nadu)
            </Link>{' '}
            or{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (Maharashtra)
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: ~30 units is the illustrative number — plug in your own heating time and
            state tariff for what it actually costs in rupees.
          </p>
        </section>

        <section aria-labelledby="standby" className="mt-10 scroll-mt-20">
          <h2 id="standby" className={h2Cls}>
            Does Leaving a Geyser on Standby Cost More Than Switching It Off?
          </h2>
          <p className={pCls}>
            There isn&apos;t a single correct answer — it genuinely depends on your usage
            pattern and the unit&apos;s insulation quality. A storage geyser left switched off
            after heating loses some heat gradually over subsequent hours, and how much depends
            heavily on insulation: better-insulated, higher-star-rated models retain heat longer
            and need less frequent reheating. Switching a geyser fully off between uses and
            reheating from a cooler baseline isn&apos;t necessarily proportionally worse than
            leaving it on standby — the better choice depends on how often you actually need hot
            water and how well your specific unit holds heat.
          </p>
          <p className={takeawayCls}>
            Takeaway: don&apos;t trust a blanket &ldquo;always leave it on&rdquo; or &ldquo;always
            switch it off&rdquo; rule — match your habit to your own usage frequency and your
            geyser&apos;s actual insulation.
          </p>
        </section>

        <section aria-labelledby="reduce-cost" className="mt-10 scroll-mt-20">
          <h2 id="reduce-cost" className={h2Cls}>
            Simple Ways to Actually Reduce the Cost
          </h2>
          <p className={pCls}>
            A few low-effort changes make a real difference without giving up hot water:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Lower the thermostat', 'a moderate setting, commonly around 45–50°C, is sufficient for most bathing and washing needs while using less energy per heating cycle than running at maximum.'],
              ['Match tank size to actual need', 'an oversized tank relative to your household costs more through longer heating and standing loss — size it to your real usage.'],
              ['Consider a higher star-rated model', 'generally reflects better insulation and heating efficiency, meaning less energy needed to maintain temperature over time.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-appliance" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 ${pCls}`}>
            Comparing this against your other big power draws? Our{' '}
            <Link href="/blog/ac-running-cost-india-guide" className="text-brass underline">
              AC running cost guide
            </Link>{' '}
            follows the same wattage × hours × tariff logic for the other appliance commonly
            cited as a major share of an Indian household&apos;s bill.
          </p>
          <p className={takeawayCls}>
            Takeaway: a lower thermostat setting and right-sizing your tank are the two
            highest-leverage, lowest-effort changes most households can make.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/how-to-reduce-electricity-bill-india"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💡
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How to actually reduce your electricity bill
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Not sure your geyser is even the biggest driver? Start here.
              </p>
            </Link>
            <Link
              href="/electricity/appliance-cost-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🚿
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Appliance Cost Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Includes a geyser preset — plug in your own hours and tariff.
              </p>
            </Link>
            <Link
              href="/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ⚡
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">Electricity Bill Calculators</p>
              <p className="mt-1 text-xs text-ash/60">
                Find your own state and DISCOM&apos;s tariff.
              </p>
            </Link>
            <Link
              href="/blog/ac-running-cost-india-guide"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ❄️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How much does running an AC actually cost in India?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The same wattage × hours × tariff logic for your other big power draw.
              </p>
            </Link>
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How telescopic electricity slabs work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Why a geyser&apos;s added units can push you into a costlier slab.
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
          Last verified: {LAST_VERIFIED}. Wattage figures are illustrative and vary by brand and
          model — check your own geyser&apos;s rating plate, and spot-check these periodically.
          See our{' '}
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
