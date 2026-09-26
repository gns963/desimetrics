import type { Metadata } from 'next'
import Link from 'next/link'
import FridgeCostCalculator from '@/components/calculators/FridgeCostCalculator'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { fridgeCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/fridge-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = fridgeCost({ discomCode: 'TNEB', annualUnitsFromLabel: 200 })
const exampleOlder = fridgeCost({ discomCode: 'BESCOM', annualUnitsFromLabel: 400 })

export const metadata: Metadata = {
  title: 'Fridge Electricity Cost Calculator 2026 — From Your BEE Label',
  description:
    'Calculate your refrigerator\'s electricity cost from the annual energy consumption figure printed on its BEE star label, priced at your DISCOM\'s real tariff.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/fridge-cost-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fridge Electricity Cost Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Fridge Cost Calculator', path: PATH },
])

const faqs = [
  {
    q: 'Where do I find my fridge\'s annual energy consumption?',
    a: 'Every fridge sold in India carries a mandatory BEE star-rating label — a yellow sticker on the door or side panel — which states "Annual Energy Consumption" directly in units (kWh) per year. That is the exact figure this calculator needs.',
  },
  {
    q: 'Why does this calculator use the label figure instead of wattage?',
    a: 'A fridge compressor cycles on and off rather than running continuously, and the cycle rate depends on ambient temperature, door-opening frequency and insulation — all things a simple wattage × hours formula can\'t capture reliably. The BEE label figure is measured under standard test conditions and is the most accurate real number available for your specific model.',
  },
  {
    q: 'What if I don\'t have the label anymore?',
    a: 'Search the model number (usually on a sticker inside the fridge) plus "BEE star label" online — manufacturers publish the rating sheet. As a rough guide, a 200–250L 3-star fridge commonly falls in the 150–250 kWh/year range, with 5-star models lower.',
  },
  {
    q: 'Is my actual cost likely to be higher or lower than this estimate?',
    a: 'The BEE figure is measured under controlled lab conditions. A hotter kitchen, frequent door-opening, or an older/less-sealed fridge will typically push real consumption above the label figure; a newer, well-maintained unit in a cool room may run slightly below it.',
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

export default function FridgeCostPage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Fridge Cost Calculator', href: '/appliances/fridge-cost-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="Fridge Electricity Cost Calculator"
        subtitle={
          <>
            Find your refrigerator&apos;s real running cost using the{' '}
            <strong>annual energy consumption figure on its BEE star label</strong>{' '}
            — a model-specific real number, not a guessed wattage.
          </>
        }
        stats={[
          { icon: '🏷️', big: 'BEE label', small: 'Input source', tone: 'hub' },
          { icon: '❄️', big: '80–500', small: 'Typical units/yr', tone: 'hub' },
          { icon: '📈', big: 'Top slab', small: 'Pricing method', tone: 'hub' },
          { icon: '🗺️', big: '36 states', small: 'DISCOM coverage', tone: 'hub' },
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
          A fridge rated at <strong>200 units/year</strong> on its BEE label
          costs about <strong>{formatINR(example.monthlyCost)}/month</strong> (
          {formatINR(example.annualCost)}/year) to run in Tamil Nadu, at{' '}
          {formatINR(example.effectiveRatePerUnit)}/unit. An older or larger
          fridge rated at <strong>400 units/year</strong> — double the label
          figure — costs about{' '}
          <strong>{formatINR(exampleOlder.monthlyCost)}/month</strong> (
          {formatINR(exampleOlder.annualCost)}/year) in Bengaluru, at{' '}
          {formatINR(exampleOlder.effectiveRatePerUnit)}/unit — the cost
          scales exactly with the label figure, since that number is the
          entire input to this calculator.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your fridge&apos;s cost
        </h2>
        <FridgeCostCalculator discoms={liveDiscoms} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>Straight from the label.</strong> Monthly units = annual
            label figure ÷ 12. We don&apos;t model compressor duty cycles or
            guess a wattage — the BEE label&apos;s annual kWh figure is already
            a tested, model-specific number.
          </p>
          <p>
            <strong>Priced at your top slab.</strong> A fridge runs continuously
            on top of your other usage, so its units fall in your highest
            tariff slab — we use that marginal rate (plus fuel cost adjustment
            and electricity duty).
          </p>
        </div>
      </section>

      <section aria-labelledby="why-not-wattage" className="mb-10">
        <h2 id="why-not-wattage" className="font-display mb-4 text-2xl font-semibold">
          Why a Fridge Doesn&apos;t Fit a Simple Wattage × Hours Formula
        </h2>
        <p className="text-ash/80">
          Every other appliance on this site — a fan, a cooler, an induction
          cooktop — draws its rated wattage for as long as it&apos;s switched
          on, so wattage × hours gives a reliable estimate. A fridge breaks
          that assumption in one specific way:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['The compressor cycles, not runs', 'it switches on to pull the interior down to the set temperature, then switches off until the temperature drifts back up, repeating all day — so it only draws its running wattage for part of each hour, never the full 60 minutes.'],
            ['Cycle rate isn\'t fixed', 'how often and how long the compressor runs depends on ambient kitchen temperature, how frequently the door is opened, and the unit\'s insulation and seal condition — none of which a generic formula can know in advance.'],
            ['"Wattage × 24 hours" overstates cost', 'treating a fridge like a device that draws its full rated wattage around the clock produces a cost estimate well above what the unit actually consumes, since real compressors spend a meaningful share of each hour switched off.'],
            ['The BEE label already solves this', 'its "Annual Energy Consumption" figure is measured under standard test conditions across a full cycling pattern, not a wattage assumption — so it\'s the one real, tested, model-specific number available, and this calculator uses it directly instead of guessing.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-appliance" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: the annual kWh figure on your fridge&apos;s BEE label is
          more accurate than any wattage-based estimate you could build
          yourself — always use it over a guessed running-wattage figure.
        </p>
      </section>

      <section aria-labelledby="real-world-factors" className="mb-10">
        <h2 id="real-world-factors" className="font-display mb-4 text-2xl font-semibold">
          What Makes Real-World Consumption Differ From the Label
        </h2>
        <p className="text-ash/80">
          The BEE figure is measured under controlled lab conditions, so your
          actual bill can run a bit above or below it depending on how and
          where the fridge is used:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Ambient kitchen temperature', 'a hotter room means the compressor has to work harder and cycle more often to maintain the same internal temperature, pushing real consumption above the label figure.'],
            ['Door seal condition', 'a worn or damaged seal lets cold air leak out continuously, forcing more frequent cycling — an inexpensive fix that\'s easy to overlook.'],
            ['How full the fridge is', 'both significantly overfilling it (blocking internal airflow) and running it nearly empty can make the compressor work less efficiently — a reasonably, not excessively, full fridge is the sweet spot.'],
            ['Frost-free vs. direct-cool', 'frost-free models include an automatic defrost-cycle heating element that direct-cool (manual-defrost) models don\'t have, which generally adds to consumption for the convenience of not manually defrosting.'],
            ['Age of the unit', 'compressor technology and insulation have improved over time, and BEE efficiency thresholds are periodically revised upward — so an older fridge, even one rated highly when purchased, often uses meaningfully more energy than a current model carrying the same star rating today.'],
            ['Positioning', 'placing the fridge away from a stove, direct sunlight, or a wall gap needed for ventilation lets the compressor run less to hold its set temperature.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-appliance" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-ash/80">
          Door-opening frequency is a real factor too — each opening lets
          warm air in, making the compressor work to recover the set
          temperature — but it&apos;s secondary next to the model&apos;s
          star rating, age and seal condition. None of these factors change
          what you should enter into the calculator above; they explain why
          your actual electricity bill might land a little above or below
          the estimate it produces.
        </p>
      </section>

      <section aria-labelledby="star-rating-savings" className="mb-10">
        <h2 id="star-rating-savings" className="font-display mb-4 text-2xl font-semibold">
          Does a Higher Star Rating Actually Save Meaningful Money?
        </h2>
        <p className="text-ash/80">
          Yes, and the gap compounds because a fridge runs every single day
          of the year, unlike a fan or cooler that&apos;s only on for part
          of the day:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['The efficiency gap is large', 'some industry sources cite a gap as large as roughly 50% between a comparable 1-star and 5-star model of similar size — treat this as illustrative rather than a guarantee for any two specific models, since the real difference depends on the units actually being compared and their rating-cycle year.'],
            ['It runs 365 days a year', 'unlike a seasonal appliance like an AC or a cooler, a fridge is switched on every day, so even a modest per-day saving in units adds up to a much larger annual figure than the same percentage saved on an appliance used for a few months a year.'],
            ['Compare using the label, not the sticker\'s star count alone', 'two 5-star fridges of different sizes or brands can carry different annual kWh figures — the actual "Annual Energy Consumption" number on the label is the reliable comparison point, not the star count by itself.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-appliance" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: when replacing an old fridge, a higher star-rated model of
          the same size is one of the few appliance upgrades that keeps
          paying back every single day of the year, not just during a
          particular season.
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/appliances/ceiling-fan-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🌀</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Ceiling fan cost
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Standard vs BEE 5-star vs BLDC running cost.
            </p>
          </Link>
          <Link
            href="/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🌬️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC running cost
            </p>
            <p className="mt-1 text-xs text-ash/60">
              The biggest line item on most summer electricity bills.
            </p>
          </Link>
          <Link
            href="/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Full bill calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              See your complete monthly bill, not just this one appliance.
            </p>
          </Link>
          <Link
            href="/blog/refrigerator-electricity-consumption-india"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🧊</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Why fridges don&apos;t run 24/7 at full wattage
            </p>
            <p className="mt-1 text-xs text-ash/60">
              The compressor-cycling explanation behind this calculator&apos;s method.
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
