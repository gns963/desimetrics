import type { Metadata } from 'next'
import Link from 'next/link'
import AcComparisonTool from '@/components/calculators/AcComparisonTool'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { calculateAcCost } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/comparison-tool'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const exampleA = calculateAcCost({ discomCode: 'TNEB', tonnage: 1, starRating: 5, dailyHours: 8 })
const exampleB = calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 3, dailyHours: 8 })

// Common scenarios worth checking — each computed live via calculateAcCost(),
// same TNEB/8h basis as the worked example above.
const SCENARIOS = [
  {
    question: 'Is a smaller, higher-star AC cheaper to run than a bigger, lower-star one?',
    a: { label: '1T, 5★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1, starRating: 5, dailyHours: 8 }) },
    b: { label: '1.5T, 3★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 3, dailyHours: 8 }) },
  },
  {
    question: 'How much does star rating alone change cost, at the same size?',
    a: { label: '1.5T, 3★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 3, dailyHours: 8 }) },
    b: { label: '1.5T, 5★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 5, dailyHours: 8 }) },
  },
  {
    question: 'Does a much bigger, average-star AC ever lose to a small, top-star one?',
    a: { label: '2T, 3★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 2, starRating: 3, dailyHours: 8 }) },
    b: { label: '1T, 5★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1, starRating: 5, dailyHours: 8 }) },
  },
]

/** Same AC, different DISCOM — computed live so the table can never drift from
 *  the tariff files. Each code must have `hasTariffFile` in discoms.json. */
const CROSS_DISCOM = ['WBSEDCL', 'TNEB', 'UPPCL', 'KSEB', 'BESCOM', 'MSEDCL']
  .map((code) => {
    const three = calculateAcCost({
      discomCode: code,
      tonnage: 1.5,
      starRating: 3,
      dailyHours: 8,
    })
    const five = calculateAcCost({
      discomCode: code,
      tonnage: 1.5,
      starRating: 5,
      dailyHours: 8,
    })
    return {
      code,
      rate: three.effectiveRatePerUnit,
      threeStar: three.annualCost,
      fiveStar: five.annualCost,
      saving: Math.round((three.annualCost - five.annualCost) * 100) / 100,
    }
  })
  .sort((a, b) => a.threeStar - b.threeStar)

const cheapestState = CROSS_DISCOM[0]
const dearestState = CROSS_DISCOM[CROSS_DISCOM.length - 1]

export const metadata: Metadata = {
  title: 'AC Comparison Tool 2026 — Compare Any Two Configurations (India)',
  description:
    'Compare any two AC configurations side by side — different tonnage, star rating or both — on real running cost using your DISCOM\'s tariff.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/ac/comparison-tool'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AC Comparison Tool',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'Comparison Tool', path: PATH },
])

const faqs = [
  {
    q: 'How is this different from the 3★ vs 5★ savings guide?',
    a: 'That guide fixes the comparison to the same tonnage at 3-star vs 5-star. This tool lets both tonnage AND star rating vary independently on each side — useful for a genuinely different question, like "is a smaller 1-ton 5-star AC cheaper to run than a bigger 1.5-ton 3-star one?"',
  },
  {
    q: 'Should I compare ACs of different tonnage at all?',
    a: 'Only if both would actually be adequate for your room — check our AC tonnage calculator first so you\'re comparing two AC sizes that would both realistically cool your space, not picking an undersized option just because it looks cheaper to run.',
  },
  {
    q: 'Does this use my real electricity tariff?',
    a: 'Yes — pick your DISCOM and both options are priced at your state\'s real top-slab tariff.',
  },
  {
    q: 'How do I read the output correctly?',
    a: 'Each side shows monthly and annual cost for that exact configuration at your chosen DISCOM. The difference figure below the cards is Option A minus Option B — a positive number means Option A costs more, not less.',
  },
  {
    q: 'Can I compare the same AC across two different DISCOMs?',
    a: 'Not directly in this tool — it compares two configurations at one shared DISCOM. To see the same AC priced across multiple states, see the slab comparison on our AC running cost calculator.',
  },
  {
    q: 'What if both options are the same tonnage and star rating?',
    a: 'Then the cost will be identical on both sides — this tool is only useful when at least one variable (tonnage, star rating or hours) differs between Option A and Option B.',
  },
  {
    q: 'Does daily usage hours matter in the comparison?',
    a: 'Yes — you can set different daily hours for each option too. This is useful for comparing, say, a bedroom AC used 10 hours a night against a living-room AC used 4 hours in the evening.',
  },
  {
    q: 'Is a bigger inverter AC always cheaper to run than a smaller non-inverter one?',
    a: 'Not automatically — it depends on both the tonnage gap and the star-rating gap together. See "Does a much bigger, average-star AC ever lose to a small, top-star one?" above for a real computed example.',
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

export default function AcComparisonPage() {
  const diff = exampleA.annualCost - exampleB.annualCost

  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/ac' },
          { label: 'Comparison Tool', href: '/ac/comparison-tool' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="AC Comparison Tool"
        subtitle="Compare any two AC configurations side by side — different tonnage, star rating, or both — on real running cost for your state."
        stats={[
          { icon: '⚖️', big: 'A vs B', small: 'Free configuration', tone: 'hub' },
          { icon: '📊', big: 'Real tariff', small: 'Priced on your DISCOM', tone: 'hub' },
          { icon: '🗺️', big: '36 states', small: 'DISCOM coverage', tone: 'hub' },
          { icon: '⚡', big: 'Instant', small: 'No login', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section
        aria-labelledby="worked-example"
        className="mb-8 rounded-xl border border-hairline border-l-4 border-l-brass bg-paper p-5"
      >
        <h2
          id="worked-example"
          className="font-display text-sm font-semibold tracking-wide text-brass uppercase"
        >
          Worked example
        </h2>
        <p className="mt-2 text-ash/80">
          At 8 hours/day in Tamil Nadu, a <strong>1-ton 5-star</strong> AC
          costs about <strong>{formatINR(exampleA.annualCost)}/year</strong>{' '}
          versus <strong>{formatINR(exampleB.annualCost)}/year</strong> for a{' '}
          <strong>1.5-ton 3-star</strong> unit —{' '}
          {diff > 0 ? 'the smaller, higher-star unit' : 'the larger unit'}{' '}
          saves about {formatINR(Math.abs(diff))}/year, assuming both would
          adequately cool the room.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Compare two configurations
        </h2>
        <AcComparisonTool discoms={liveDiscoms} />
      </section>

      <section aria-labelledby="how-to-read" className="mb-10">
        <h2 id="how-to-read" className="font-display mb-4 text-2xl font-semibold">
          How to read the output
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            Each side shows the same figures the running-cost calculator
            gives for a single AC — monthly cost, annual cost, and daily
            units — computed independently for its own tonnage, star rating
            and hours. The difference line underneath is Option A minus
            Option B, so a positive number means A costs more per year.
          </p>
          <p>
            Only trust a comparison if both configurations would actually
            cool the room adequately — a smaller unit can look cheaper to
            run purely because it&apos;s undersized, not because it&apos;s
            more efficient. Check tonnage adequacy first.
          </p>
        </div>
      </section>

      <section aria-labelledby="scenarios" className="mb-10">
        <h2 id="scenarios" className="font-display mb-4 text-2xl font-semibold">
          Common comparisons worth checking
        </h2>
        <div className="space-y-4">
          {SCENARIOS.map((s) => {
            const diff = s.a.cost.annualCost - s.b.cost.annualCost
            return (
              <div
                key={s.question}
                className="rounded-xl border border-hairline bg-paper p-5"
              >
                <p className="font-display font-bold text-ink-navy">
                  {s.question}
                </p>
                <p className="mt-1 text-sm text-ash/70">
                  {s.a.label}: {formatINR(s.a.cost.annualCost)}/year vs {s.b.label}:{' '}
                  {formatINR(s.b.cost.annualCost)}/year (TNEB, 8h/day) —{' '}
                  {diff > 0 ? s.b.label : s.a.label} costs{' '}
                  {formatINR(Math.abs(diff))}/year less.
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="which-matters" className="mb-10">
        <h2 id="which-matters" className="font-display mb-4 text-2xl font-semibold">
          Star rating or tonnage — which moves the bill more?
        </h2>
        <p className="text-ash/80">
          Star rating, for any given room. Tonnage sets how much cooling the unit can
          deliver; the star rating sets how much electricity it burns delivering it.
          Those are different jobs, and only one of them is yours to trade away.
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Tonnage is set by the room, not by budget</strong>{' '}
              — floor area, sun exposure and whether you are on the top floor decide it.
              Our{' '}
              <Link href="/ac/tonnage-calculator" className="text-brass underline">
                tonnage calculator
              </Link>{' '}
              works it out; undersizing to save money backfires, because an undersized
              unit runs closer to continuously.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Star rating is the real lever</strong> —
              BEE ratings map to an ISEER efficiency band, and a higher band means fewer
              units for the same cooling. This is the comparison worth running.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Hours per day scale everything linearly</strong>{' '}
              — doubling runtime doubles units. If your usage is seasonal, compare on the
              hours you actually run in peak summer, not an annual average.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: size the AC for the room, then spend the comparison effort on the
          star rating.
        </p>
      </section>

      <section aria-labelledby="same-ac-different-state" className="mb-10">
        <h2 id="same-ac-different-state" className="font-display mb-4 text-2xl font-semibold">
          The same AC costs very different amounts by state
        </h2>
        <p className="text-ash/80">
          Running cost is tariff times units, and tariffs are set per state. An identical
          1.5 ton 3-star AC run 8 hours a day ranges from about{' '}
          {formatINR(cheapestState.threeStar)} a year on {cheapestState.code} to{' '}
          {formatINR(dearestState.threeStar)} on {dearestState.code} — a gap of{' '}
          {formatINR(dearestState.threeStar - cheapestState.threeStar)} for the same
          machine doing the same work.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">DISCOM</th>
                <th className="px-4 py-2 text-right font-semibold">Top-slab ₹/unit</th>
                <th className="px-4 py-2 text-right font-semibold">3-star/year</th>
                <th className="px-4 py-2 text-right font-semibold">5-star/year</th>
                <th className="px-4 py-2 text-right font-semibold">Saving/year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {CROSS_DISCOM.map((r) => (
                <tr key={r.code}>
                  <td className="px-4 py-2 font-medium">{r.code}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-ash/70">
                    ₹{r.rate}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatINR(r.threeStar)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatINR(r.fiveStar)}
                  </td>
                  <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                    {formatINR(r.saving)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ash/50">
          All rows: 1.5 ton, 8 hours a day, priced at each DISCOM&apos;s top residential
          slab including fuel cost adjustment and electricity duty, computed from the
          same tariff files the calculator uses.
        </p>
        <p className="mt-3 text-ash/80">
          The practical consequence is that advice about whether a 5-star unit is
          &ldquo;worth it&rdquo; cannot be national. The annual saving from upgrading a
          1.5 ton unit from 3-star to 5-star is roughly{' '}
          {formatINR(cheapestState.saving)} on {cheapestState.code} but about{' '}
          {formatINR(dearestState.saving)} on {dearestState.code} — so the same price
          premium pays back far faster in one state than the other.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: always compare on your own DISCOM&apos;s tariff — a verdict from
          another state does not transfer.
        </p>
      </section>

      <section aria-labelledby="payback" className="mb-10">
        <h2 id="payback" className="font-display mb-4 text-2xl font-semibold">
          Working out whether the higher star rating pays back
        </h2>
        <p className="text-ash/80">
          A higher-rated AC usually costs more upfront and less to run, so the question
          is how long the running saving takes to cover the price gap. The arithmetic is
          one division:
        </p>
        <div className="mt-4 rounded-xl border border-l-4 border-hairline border-l-brass bg-paper p-5">
          <p className="font-display font-bold text-ink-navy">
            Payback (years) = price premium ÷ annual running saving
          </p>
          <p className="mt-2 text-sm text-ash/80">
            Take the annual saving from the comparison above, then divide the price
            difference you are actually quoted by it. We deliberately do not pre-fill a
            price premium: AC prices move with brand, model, capacity and the time of
            year, and a stale figure would make the answer wrong rather than convenient.
          </p>
        </div>
        <ul className="mt-4 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Compare the two units you can actually buy</strong>{' '}
              — quotes for the same tonnage from the same retailer on the same day, not
              list prices from different sources.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Weigh it against how long you will keep it</strong>{' '}
              — a payback longer than the time you expect to own the AC, or to stay in
              that home, is not a saving.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Remember tariffs tend to rise</strong> —
              the saving is computed at today&apos;s rate, so a payback estimate is
              conservative rather than optimistic.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: bring your own quoted prices — the running-cost half of the answer is
          what this tool is for.
        </p>
      </section>

      <section aria-labelledby="limits" className="mb-10">
        <h2 id="limits" className="font-display mb-4 text-2xl font-semibold">
          What this comparison does not capture
        </h2>
        <p className="text-ash/80">
          The model is deliberately simple, and being clear about its edges is more
          useful than implying more precision than it has:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Inverter versus fixed-speed behaviour</strong>{' '}
              — both sides are modelled with the same compressor duty factor. An inverter
              unit modulates instead of cycling, which generally helps it in long
              sessions, and that difference is not separated out here.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Room and installation quality</strong> —
              insulation, window sealing, shading and outdoor-unit airflow change real
              consumption, and none of them appear in a tonnage-and-star model.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Star ratings use indicative ISEER bands</strong>{' '}
              — a specific model&apos;s declared ISEER can sit above or below the band for
              its rating, and BEE revises the bands periodically.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Servicing and lifetime costs</strong> —
              gas top-ups, coil cleaning and repairs are real running costs that sit
              outside an electricity comparison.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: treat the output as a well-grounded estimate for ranking two options,
          not a prediction of your exact bill.
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC tonnage calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Confirm both sizes would actually suit your room.
            </p>
          </Link>
          <Link
            href="/ac/comparisons/3-star-vs-5-star-savings-guide"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⭐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              3★ vs 5★ savings guide
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Same tonnage, star rating only — with a detailed breakdown.
            </p>
          </Link>
          <Link
            href="/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC running cost
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Full detail for a single configuration.
            </p>
          </Link>
          <Link
            href="/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Offset it with solar
            </p>
            <p className="mt-1 text-xs text-ash/60">
              See the payback on a rooftop system sized for AC-heavy usage.
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
