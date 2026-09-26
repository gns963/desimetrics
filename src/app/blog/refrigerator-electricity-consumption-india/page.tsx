import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/refrigerator-electricity-consumption-india'
const TITLE = 'How Much Electricity Does a Refrigerator Actually Use? (India Guide)'
const DESCRIPTION =
  'A fridge\'s compressor cycles on and off — it doesn\'t run at full wattage for 24 hours straight. The real formula, typical annual consumption by star rating, and how to cut it safely.'
const LAST_VERIFIED = '26 September 2026'

export const metadata: Metadata = {
  title: 'Refrigerator Electricity Consumption in India: Full 2026 Guide',
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
    q: 'How much electricity does a refrigerator use per month?',
    a: 'It depends on your specific model\'s BEE label figure, but illustratively, a mid-size 4-star frost-free fridge might use roughly 20–25 units a month. Check your own fridge\'s "Annual Energy Consumption" figure on its BEE label and divide by 12 for a real monthly average, then apply your state\'s tariff.',
  },
  {
    q: 'Does a refrigerator run continuously, or does it cycle on and off?',
    a: 'It cycles — the compressor switches on to cool the interior down to the set temperature, then switches off until the temperature rises again, repeating throughout the day. This is why multiplying its running wattage by 24 hours overstates real consumption; the compressor isn\'t drawing that wattage the whole time.',
  },
  {
    q: 'How much electricity does a 5-star fridge save compared to a 2-star fridge?',
    a: 'Some industry sources cite an efficiency gap as large as roughly 50% between a 1-star and comparable 5-star model — treat this as an illustrative example, not a guaranteed figure for every model, since actual savings depend on the specific units being compared and their rating-cycle year.',
  },
  {
    q: 'Is a bigger refrigerator much more expensive to run?',
    a: 'Generally yes, since a larger interior volume typically needs more energy to maintain temperature — but the exact difference depends on the specific models\' insulation and compressor efficiency, not size alone. Compare the actual BEE label figures of the models you\'re considering rather than assuming a fixed proportional increase.',
  },
  {
    q: 'Does a frost-free refrigerator use more electricity than a direct-cool one?',
    a: 'Generally yes — frost-free models include an automatic defrost-cycle heating element that direct-cool (manual defrost) models don\'t have, so a frost-free fridge typically uses somewhat more energy than a comparable direct-cool model of similar size and rating. This is a well-established tradeoff, though the exact gap varies by model.',
  },
  {
    q: 'How can I reduce my refrigerator\'s electricity use safely?',
    a: 'Keep the door seal in good condition, avoid leaving the door open longer than necessary, don\'t position it against a wall or heat source, and avoid both significantly overfilling and running it nearly empty. Never turn a fridge off or set it warmer than safe for food storage purely to save electricity.',
  },
  {
    q: 'Where do I find my refrigerator\'s actual annual electricity consumption?',
    a: 'On its mandatory BEE star-rating label — a yellow sticker on the door or side panel — under "Annual Energy Consumption," stated in units (kWh) per year. This is the authoritative figure for your specific model, more accurate than any general illustrative table.',
  },
  {
    q: 'Does opening the fridge door often actually increase electricity use meaningfully?',
    a: 'Yes, it\'s a real factor — each opening lets warm air in, making the compressor work to cool back down — but it isn\'t precisely quantifiable as a fixed percentage, since the effect depends on how long the door stays open and your kitchen\'s ambient temperature. It\'s a real but secondary factor next to the model\'s own rated efficiency.',
  },
  {
    q: 'Why does my old refrigerator cost more to run than a new one of the same size?',
    a: 'Compressor technology and insulation have improved over time, and BEE efficiency thresholds have also been periodically revised upward, so an older fridge—even one that was highly rated when purchased—often uses meaningfully more energy than a current model with the same star rating today.',
  },
  {
    q: 'How many units does a double-door refrigerator use per month?',
    a: 'It depends entirely on the specific model\'s BEE label figure, which varies by capacity, star rating, and whether it\'s frost-free or direct-cool — there\'s no single number for "double-door" as a category. Check your own unit\'s label, or use our fridge cost calculator with that figure.',
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
  ['Small/single-door', '~100–150 W while compressor is active'],
  ['Mid-size double-door', '~150–250 W while compressor is active'],
  ['Large (600L+) frost-free', '~250–400 W while compressor is active'],
]

const starRatingRows: [string, string][] = [
  ['2-Star', '~380–490 kWh/year'],
  ['3-Star', '~310–390 kWh/year'],
  ['4-Star', '~250–310 kWh/year'],
  ['5-Star', '~200–250 kWh/year'],
]

const workedExample: { step: string; calc: string; result: string }[] = [
  { step: 'Annual consumption (illustrative, 4-star, ~250L frost-free)', calc: '~280 kWh/year', result: '—' },
  { step: 'Monthly average', calc: '280 ÷ 12', result: '≈ 23 units/month' },
]

export default function RefrigeratorElectricityGuidePage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Refrigerator Electricity Use', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🧊</span> Appliances Explainer
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
          A refrigerator&apos;s compressor <strong>cycles on and off</strong> to maintain
          temperature — it doesn&apos;t run continuously at full draw for 24 hours straight. That
          single fact is why a back-of-envelope calculation like &ldquo;400W × 24 hours&rdquo;
          overstates real consumption significantly, and it&apos;s the most common mistake in a
          DIY fridge-cost estimate. The honest starting point is your fridge&apos;s own{' '}
          <strong>BEE label &ldquo;Annual Energy Consumption&rdquo; figure</strong>, in kWh per
          year — that number already accounts for real-world cycling, unlike a raw wattage
          calculation. This guide explains why, gives typical figures by star rating, and shows
          you how to turn that annual number into a real monthly rupee cost.
        </p>

        <section aria-labelledby="why-not-24h" className="mt-10 scroll-mt-20">
          <h2 id="why-not-24h" className={h2Cls}>
            Why &ldquo;Wattage × 24 Hours&rdquo; Gives You the Wrong Answer
          </h2>
          <p className={pCls}>
            A fridge&apos;s compressor switches on when the interior warms past its set point,
            runs until it cools back down, then switches off — repeating this cycle throughout
            the day rather than drawing power continuously:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['The compressor cycles, not runs constantly', 'it\'s only actively drawing its running wattage for part of each hour, not the full 60 minutes.'],
              ['Cycle frequency depends on conditions', 'ambient kitchen temperature, door-opening habits and insulation all affect how often and how long it runs.'],
              ['The BEE label figure already accounts for this', 'it\'s measured under standard test conditions across a full cycling pattern, not a simple wattage assumption.'],
              ['That\'s why it\'s the more reliable number', 'starting from the label\'s annual kWh figure avoids the "wattage × 24 hours" overestimate entirely.'],
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
            Takeaway: start from your fridge&apos;s own BEE label figure, not a wattage guess —
            it&apos;s the number actually built to handle cycling.
          </p>
        </section>

        <section aria-labelledby="wattage-table" className="mt-10 scroll-mt-20">
          <h2 id="wattage-table" className={h2Cls}>
            Typical Running Wattage by Fridge Size
          </h2>
          <p className={pCls}>
            For context — this is the wattage WHILE the compressor is actively on, not a
            continuous draw:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Size</th>
                  <th className="px-4 py-2 font-semibold">Typical running wattage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {wattageRows.map(([size, watts]) => (
                  <tr key={size}>
                    <td className="px-4 py-2 font-medium">{size}</td>
                    <td className="px-4 py-2">{watts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: these are illustrative, typical figures — your own model&apos;s BEE label
            annual kWh figure is the more reliable number for actual cost estimation.
          </p>
        </section>

        <section aria-labelledby="star-rating" className="mt-10 scroll-mt-20">
          <h2 id="star-rating" className={h2Cls}>
            Star Rating and Annual Consumption
          </h2>
          <p className={pCls}>
            For a common ~250L frost-free class, illustrative annual consumption bands look
            roughly like this — but BEE rating thresholds are periodically revised (as with ACs),
            so treat this as illustrative, not a precise universal figure:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Star rating</th>
                  <th className="px-4 py-2 font-semibold">Illustrative annual consumption</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {starRatingRows.map(([star, kwh]) => (
                  <tr key={star}>
                    <td className="px-4 py-2 font-medium">{star}</td>
                    <td className="px-4 py-2 font-display font-bold text-hub-appliance">{kwh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            These bands are for FROST-FREE models specifically — a comparable direct-cool model
            of the same size and rating typically uses less (see the frost-free vs direct-cool
            section below), which is why you may see lower general ranges cited elsewhere that
            don&apos;t specify fridge type. Some industry sources describe the efficiency gap
            between a 1-star and a comparable 5-star fridge as being as large as roughly 50% —
            an illustrative example, not a guaranteed figure for every model. Your own
            fridge&apos;s BEE label is the authoritative number for your specific unit, not this
            table.
          </p>
          <p className={takeawayCls}>
            Takeaway: use this table to sanity-check, not replace, the actual label figure on
            your own fridge.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: What Does a Mid-Size Fridge Actually Cost Per Month?
          </h2>
          <p className={pCls}>
            Using an illustrative 4-star, ~250L frost-free example:
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
                    Apply your own state&apos;s slab rate to these ~23 units — this is exactly
                    where the real rupee number depends on where you live.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            This is illustrative math built on a stated example unit — your own fridge&apos;s
            actual BEE label figure will change the unit count, and your state&apos;s tariff will
            change the rupee figure entirely. Get the real number with our{' '}
            <Link href="/appliances/fridge-cost-calculator" className="font-semibold text-brass underline">
              Fridge Cost Calculator
            </Link>
            , which works straight from your own label figure and your DISCOM&apos;s tariff, or
            price it against a specific state directly, e.g.{' '}
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
            Takeaway: ~23 units is the illustrative number — swap in your own fridge&apos;s label
            figure and state tariff for what it actually costs in rupees.
          </p>
        </section>

        <section aria-labelledby="frost-free" className="mt-10 scroll-mt-20">
          <h2 id="frost-free" className={h2Cls}>
            Frost-Free vs Direct-Cool: The Efficiency Tradeoff
          </h2>
          <p className={pCls}>
            Frost-free refrigerators automatically prevent ice buildup using a defrost-cycle
            heating element — a genuine convenience, but one that adds energy use. Direct-cool
            (manual defrost) models lack this element and generally use somewhat less energy than
            a comparable frost-free model of similar size and rating. This is a well-established
            tradeoff, though the exact gap varies by model, so compare the actual BEE label
            figures of the specific units you&apos;re considering rather than assuming a fixed
            percentage difference.
          </p>
          <p className={takeawayCls}>
            Takeaway: frost-free buys convenience at a real, if variable, energy cost — factor
            that into your choice if running cost matters more to you than manual defrosting.
          </p>
        </section>

        <section aria-labelledby="real-world-factors" className="mt-10 scroll-mt-20">
          <h2 id="real-world-factors" className={h2Cls}>
            What Actually Affects Your Fridge&apos;s Real-World Consumption
          </h2>
          <p className={pCls}>
            Beyond the model&apos;s own rating, several household habits genuinely affect how
            often and how long the compressor needs to run — real factors, though not precisely
            quantifiable as fixed percentages:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Door-opening frequency and duration', 'each opening lets warm air in, making the compressor work harder to recover the set temperature.'],
              ['How full the fridge is kept', 'both significantly overfilling (blocking airflow) and running nearly empty can make the compressor work less efficiently.'],
              ['Door seal condition', 'a worn or damaged seal lets cold air leak out continuously, forcing more frequent cycling.'],
              ['Ambient kitchen temperature', 'a hotter room means the compressor has to work harder to maintain the same internal temperature.'],
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
            Takeaway: your actual consumption can run above or below the lab-rated label figure
            depending on these habits — real factors, not precise multipliers.
          </p>
        </section>

        <section aria-labelledby="reduce-cost" className="mt-10 scroll-mt-20">
          <h2 id="reduce-cost" className={h2Cls}>
            Simple Ways to Reduce Your Fridge&apos;s Electricity Use, Safely
          </h2>
          <p className={pCls}>
            Reasonable, low-effort changes that don&apos;t compromise food safety:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Check the door seal periodically', 'a worn seal is an easy, inexpensive fix that stops continuous cold-air leakage.'],
              ['Avoid extreme overfilling or emptiness', 'both can reduce efficiency — aim for a reasonably but not excessively full fridge.'],
              ['Keep it away from direct heat sources', 'positioning away from a stove, direct sunlight or a wall gap for ventilation helps the compressor work less.'],
              ['Consider a higher star-rated model when replacing', 'reflects genuinely better insulation and compressor efficiency over the unit\'s life.'],
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
            Never turn a fridge off or set it warmer than safe purely to save electricity —
            food-safety risk isn&apos;t worth a modest, unquantified saving. If you&apos;re
            weighing your fridge against your other major appliances, our{' '}
            <Link href="/blog/how-to-reduce-electricity-bill-india" className="text-brass underline">
              guide to actually reducing your electricity bill
            </Link>{' '}
            helps you diagnose which one is really your biggest driver.
          </p>
          <p className={takeawayCls}>
            Takeaway: small maintenance habits are worthwhile, but a fridge runs 24/7 regardless
            — its rated efficiency matters more than any usage tweak.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/appliances/fridge-cost-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🧊</span>
              <p className="font-display mt-2 font-bold text-ink-navy">Fridge Cost Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Works straight from your own BEE label figure.
              </p>
            </Link>
            <Link
              href="/blog/ac-running-cost-india-guide"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>❄️</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How much does running an AC actually cost?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The same look-up-then-apply-your-tariff pattern, for AC.
              </p>
            </Link>
            <Link
              href="/blog/geyser-water-heater-running-cost-india"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🚿</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How much does running a geyser actually cost?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Wattage and heating time, not tank size, drive the cost.
              </p>
            </Link>
            <Link
              href="/blog/how-to-reduce-electricity-bill-india"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>💡</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How to actually reduce your electricity bill
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Find out if your fridge is really your biggest driver.
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
          Last verified: {LAST_VERIFIED}. Star-rating consumption bands are illustrative and BEE
          thresholds are periodically revised — check your own fridge&apos;s current BEE label for
          the authoritative figure. See our{' '}
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
