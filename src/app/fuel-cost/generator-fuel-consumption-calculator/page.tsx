import type { Metadata } from 'next'
import Link from 'next/link'
import GeneratorFuelCalculator from '@/components/calculators/GeneratorFuelCalculator'
import PageHero from '@/components/PageHero'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { estimateGeneratorCost, estimateGeneratorCostPerUnit } from '@/lib/calc/fuel'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/fuel-cost/generator-fuel-consumption-calculator'

const example = estimateGeneratorCost({ consumptionRateLph: 2, fuelPricePerLitre: 95, hoursRun: 4 })
const genPerUnit = estimateGeneratorCostPerUnit({ fuelPricePerLitre: 95 })
const gridPerUnitTNEB = marginalRatePerUnit('TNEB')

export const metadata: Metadata = {
  title: 'Generator Fuel Consumption Calculator 2026 — Diesel Running Cost',
  description:
    'Calculate the fuel cost of running your diesel or petrol generator, from its own rated consumption (L/hr), fuel price and hours run.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/fuel-cost/generator-fuel-consumption-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Generator Fuel Consumption Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Fuel Cost', path: '/fuel-cost' },
  { name: 'Generator Fuel Consumption Calculator', path: PATH },
])

const faqs = [
  {
    q: 'Why does this calculator ask for my generator\'s own consumption rate instead of estimating it from kVA?',
    a: 'Fuel consumption per hour depends heavily on load percentage, engine efficiency and generator design — figures vary widely between models even at the same kVA rating. Rather than guess with a generic multiplier, we use the rate your manufacturer already measured and published for your specific unit, which is far more accurate.',
  },
  {
    q: 'Where do I find my generator\'s fuel consumption rate?',
    a: 'Check the spec sheet or manual that came with the generator — manufacturers typically publish litres/hour figures at 50%, 75% and 100% load. Use the figure closest to how you actually run it.',
  },
  {
    q: 'Does load level change fuel consumption a lot?',
    a: 'Yes, significantly — a generator running at 50% load typically burns noticeably less fuel per hour than at 100% load, though not exactly half, since some fuel is used just to keep the engine running regardless of output. Use the load-specific figure from your spec sheet closest to your real usage for the most accurate result.',
  },
  {
    q: 'How much more expensive is generator power than grid electricity?',
    a: `Substantially more — a diesel generator typically works out to somewhere in the ₹18-35/unit range depending on fuel price and genset efficiency, versus roughly ₹5-10/unit for grid power in most states. In Tamil Nadu, for example, TNEB's real top-slab rate is ${formatINR(gridPerUnitTNEB)}/unit — a generator can easily cost 3-5x that per unit.`,
  },
  {
    q: 'How efficient are diesel generators really?',
    a: 'A new, well-maintained generator typically converts diesel to usable electrical output at around 85-90% efficiency; older units, or ones running well below their rated load, can drop to 70% or lower — which is part of why real-world ₹/unit costs vary so much between gensets.',
  },
  {
    q: 'Is it cheaper to run a generator or switch to an inverter/battery backup?',
    a: 'For short, infrequent outages, a battery-based inverter is usually cheaper per outage since it just draws pre-stored grid electricity at your normal tariff rather than burning fuel at generator-level cost per unit. For long or very frequent outages, or high continuous loads, a generator can still make sense — compare using our inverter sizing and backup time calculators.',
  },
  {
    q: 'Does generator age affect running cost?',
    a: 'Yes — engine wear and looser tolerances in an older generator generally reduce fuel efficiency, meaning more litres burned for the same electrical output compared to when it was new. If your generator is several years old, its real consumption rate may now run higher than its original spec-sheet figure.',
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

export default function GeneratorFuelPage() {
  return (
    <>
      <PageHero
        hub="fuel"
        breadcrumb={[
          { label: 'Fuel Cost', href: '/fuel-cost' },
          { label: 'Generator Fuel Consumption Calculator', href: '/fuel-cost/generator-fuel-consumption-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⛽</span> Fuel Cost hub
          </>
        }
        h1="Generator Fuel Consumption Calculator"
        subtitle={
          <>
            Find out what running your generator actually costs, using{' '}
            <strong>your genset&apos;s own rated fuel consumption</strong> —
            not a guessed multiplier from its kVA rating.
          </>
        }
        stats={[
          { icon: '🛠️', big: 'L/hr', small: "Your genset's rate", tone: 'hub' },
          { icon: '⚡', big: 'Any load', small: 'Diesel or petrol', tone: 'hub' },
          { icon: '💰', big: '₹/hr', small: 'Cost breakdown', tone: 'hub' },
          { icon: '🔓', big: 'Instant', small: 'No login', tone: 'hub' },
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
          A generator consuming <strong>2 L/hr</strong> at{' '}
          <strong>₹95/litre</strong> costs about{' '}
          <strong>{formatINR(example.totalCost)}</strong> for{' '}
          {example.litresUsed} litres over a 4-hour power cut.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your generator&apos;s fuel cost
        </h2>
        <GeneratorFuelCalculator />
      </section>

      <section aria-labelledby="how-calculated" className="mb-10">
        <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
          How This Is Calculated
        </h2>
        <p className="text-ash/80">
          The math is straightforward multiplication — the accuracy comes
          entirely from the consumption-rate figure you enter, not from any
          modelling on our end:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Litres used', 'consumption rate (litres/hour) × hours run — your genset\'s own published rate, not a generic estimate derived from its kVA rating.'],
            ['Total fuel cost', 'litres used × your local fuel price per litre.'],
            ['Cost per hour', 'consumption rate × fuel price per litre — useful for quickly comparing a short vs. long outage without recalculating litres each time.'],
            ['Cost per unit (kWh) of output', 'fuel price ÷ typical electrical output per litre (a planning figure, since actual output-per-litre varies by genset size, load and age) — this is what makes generator power directly comparable to your grid tariff.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-fuel" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="vs-grid" className="mb-10">
        <h2 id="vs-grid" className="font-display mb-2 text-2xl font-semibold">
          Cost per unit vs grid power
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              Diesel generator, at ₹95/L
            </p>
            <p className="font-display mt-1 text-2xl font-bold tabular-nums text-caution-amber">
              ≈ {formatINR(genPerUnit.costPerUnit)}/unit
            </p>
            <p className="mt-1 text-sm text-ash/60">
              Assumes ~{genPerUnit.unitsPerLitre} units of output per litre — a typical planning figure, not a spec-sheet value.
            </p>
          </div>
          <div className="rounded-xl border border-spark-teal/25 bg-spark-teal/5 p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              Grid power (TNEB top slab)
            </p>
            <p className="font-display mt-1 text-2xl font-bold tabular-nums text-spark-teal">
              {formatINR(gridPerUnitTNEB)}/unit
            </p>
            <p className="mt-1 text-sm text-ash/60">
              Your own state&apos;s rate may differ — see our electricity calculators.
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-ash/70">
          A new, well-maintained generator typically runs at{' '}
          <strong>85-90% efficiency</strong>; older units, or ones run well
          below their rated load, can drop to <strong>70% or lower</strong> —
          which pushes the real ₹/unit cost higher still.
        </p>
      </section>

      <section aria-labelledby="what-changes" className="mb-10">
        <h2 id="what-changes" className="font-display mb-4 text-2xl font-semibold">
          What Actually Changes Your Generator&apos;s Real Consumption
        </h2>
        <p className="text-ash/80">
          The spec-sheet L/hr figure is a starting point, not a guarantee —
          four factors commonly push real fuel use above or below it:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Load percentage', 'a generator running near its rated capacity burns noticeably more fuel per hour than the same unit running lightly loaded, though not in exact proportion — some fuel is spent just keeping the engine idling regardless of electrical output.'],
            ['Engine age and maintenance', 'wear and looser tolerances in an older, less-serviced engine reduce fuel efficiency, so a genset\'s real consumption can drift above its original spec-sheet figure over years of use.'],
            ['Running well below rated capacity', 'a generator sized much larger than the load it\'s actually powering tends to run less efficiently at that light load than one closer to its rated output — oversizing has a real fuel-cost consequence, not just a higher upfront price.'],
            ['Fuel quality and altitude', 'lower-quality diesel/petrol and higher-altitude operation (thinner air affecting combustion) can both reduce real efficiency versus the manufacturer\'s rated figure, though the effect size varies by engine design.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-fuel" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: use the load-specific consumption figure from your spec
          sheet closest to how you actually run the generator, and revisit it
          periodically as the unit ages rather than treating the original
          rating as permanently accurate.
        </p>
      </section>

      <section aria-labelledby="reduce-cost" className="mb-10">
        <h2 id="reduce-cost" className="font-display mb-4 text-2xl font-semibold">
          Ways to Reduce Generator Running Cost
        </h2>
        <ul className="mt-3 space-y-2">
          {[
            ['Right-size the load, don\'t oversize the generator', 'a genset running closer to its rated capacity is typically more fuel-efficient per unit of output than one running lightly loaded — match generator size to your actual essential load rather than buying more capacity than you need "just in case."'],
            ['Keep essential vs. non-essential loads separate', 'wiring only critical appliances (lights, fridge, a few fans) to the generator circuit avoids burning fuel to power loads that could simply wait for grid power to return.'],
            ['Service the engine on schedule', 'regular maintenance (oil changes, air filter cleaning, injector checks) keeps real consumption closer to the original rated figure instead of drifting upward with age and neglect.'],
            ['Consider a hybrid solar-plus-generator setup for frequent outages', 'if outages are long or frequent enough that fuel cost adds up significantly, solar with battery backup can offset a meaningful share of generator hours — see our solar calculators to estimate whether that trade-off makes sense for your usage pattern.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-fuel" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Link
            href="/appliances/inverter-sizing-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Inverter sizing
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Compare against a battery-based backup instead.
            </p>
          </Link>
          <Link
            href="/appliances/inverter-backup-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Inverter backup time
            </p>
            <p className="mt-1 text-xs text-ash/60">
              How long your existing battery lasts instead of the genset.
            </p>
          </Link>
          <Link
            href="/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Electricity bill calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              See your full monthly bill for your state.
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
