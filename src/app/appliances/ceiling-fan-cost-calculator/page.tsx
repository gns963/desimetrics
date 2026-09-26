import type { Metadata } from 'next'
import Link from 'next/link'
import CeilingFanCalculator from '@/components/calculators/CeilingFanCalculator'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/ceiling-fan-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = simpleApplianceCost({ discomCode: 'TNEB', wattage: 75, hoursPerDay: 10 })
const exampleStar5 = simpleApplianceCost({ discomCode: 'TNEB', wattage: 50, hoursPerDay: 10 })
const exampleBldc = simpleApplianceCost({ discomCode: 'TNEB', wattage: 30, hoursPerDay: 10 })

export const metadata: Metadata = {
  title: 'Ceiling Fan Electricity Cost Calculator 2026 — Monthly & Yearly',
  description:
    'Calculate your ceiling fan\'s electricity cost by wattage and daily hours, priced at your DISCOM\'s real tariff. Compare standard, BEE 5-star and BLDC fans.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/ceiling-fan-cost-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Ceiling Fan Electricity Cost Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Ceiling Fan Cost Calculator', path: PATH },
])

const faqs = [
  {
    q: 'How much electricity does a ceiling fan use?',
    a: 'A standard Indian ceiling fan draws around 75W. A BEE 5-star rated fan typically uses about 50W, and a BLDC (brushless DC) "super-efficient" fan uses as little as 28–35W for similar airflow — roughly 60% less than a standard fan.',
  },
  {
    q: 'Is a BLDC fan worth the extra cost?',
    a: 'Usually yes if you run fans for many hours a day across a household with several fans — the wattage difference compounds. Use the calculator above with your actual daily hours to see the annual saving versus a standard fan.',
  },
  {
    q: 'Why is the fan priced at my top tariff slab?',
    a: 'Indian electricity tariffs are telescopic — usage is billed in progressively pricier slabs. Any appliance you add sits on top of your existing consumption, so its units land on your highest slab, not a blended average rate.',
  },
  {
    q: 'How can I find my fan\'s exact wattage?',
    a: 'Check the sticker on the fan\'s motor housing or the box it came in — Indian fans are required to display rated wattage as part of the BEE star-labelling programme for regulated categories.',
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

export default function CeilingFanCostPage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Ceiling Fan Cost Calculator', href: '/appliances/ceiling-fan-cost-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="Ceiling Fan Electricity Cost Calculator"
        subtitle={
          <>
            Find out what your ceiling fan costs to run. Pick a fan type or enter
            its exact wattage, set daily hours, and we price the units at your{' '}
            <strong>DISCOM&apos;s top electricity slab</strong>.
          </>
        }
        stats={[
          { icon: '🌀', big: '28–75W', small: 'Typical range', tone: 'hub' },
          { icon: '📈', big: 'Top slab', small: 'Pricing method', tone: 'hub' },
          { icon: '🗺️', big: '36 states', small: 'DISCOM coverage', tone: 'hub' },
          { icon: '⚡', big: '~60%', small: 'BLDC vs standard', tone: 'spark-teal' },
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
          A <strong>standard 75W fan</strong> running 10 hours/day in Tamil Nadu
          uses about <strong>{example.dailyUnits} units/day</strong> and costs
          roughly <strong>{formatINR(example.monthlyCost)}/month</strong> (
          {formatINR(example.annualCost)}/year) at {formatINR(example.effectiveRatePerUnit)}
          /unit. Swap in a 50W BEE 5-star fan for the same 10 hours/day and the
          cost drops to about <strong>{formatINR(exampleStar5.monthlyCost)}/month</strong>;
          a 30W BLDC fan brings it down further to roughly{' '}
          <strong>{formatINR(exampleBldc.monthlyCost)}/month</strong> — the same
          10 daily hours, priced at the same tariff, with only the wattage
          changing.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your fan&apos;s cost
        </h2>
        <CeilingFanCalculator discoms={liveDiscoms} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>Units = wattage × hours ÷ 1000.</strong> A fan&apos;s daily
            energy use in kWh is its wattage multiplied by daily running hours,
            divided by 1000 to convert watts to kilowatts.
          </p>
          <p>
            <strong>Priced at your top slab.</strong> Since a fan adds to your
            existing consumption, its units fall in your highest tariff slab —
            we use that marginal rate (plus fuel cost adjustment and
            electricity duty) for a realistic cost.
          </p>
          <p>
            <strong>The same math multiplies across every fan you run.</strong>{' '}
            A typical Indian home has more than one ceiling fan running at
            once — a bedroom fan overnight, a living-room fan through the
            evening, sometimes a kitchen fan too. Each one is priced
            independently at your top slab, so the household total is simply
            this calculator&apos;s per-fan figure added up across however
            many fans are actually switched on.
          </p>
        </div>
      </section>

      <section aria-labelledby="efficiency" className="mb-10">
        <h2 id="efficiency" className="font-display mb-4 text-2xl font-semibold">
          Fan Efficiency: Standard vs. BEE 5-Star vs. BLDC
        </h2>
        <p className="text-ash/80">
          Three fan types cover almost every ceiling fan sold in India today,
          and the wattage gap between them is the single biggest lever on
          running cost:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Fan type</th>
                <th className="px-4 py-2 font-semibold">Typical wattage</th>
                <th className="px-4 py-2 text-right font-semibold">Cost at 10 hrs/day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-4 py-2 font-medium">Standard</td>
                <td className="px-4 py-2">~75W</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(example.monthlyCost)}/mo</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">BEE 5-star</td>
                <td className="px-4 py-2">~50W</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleStar5.monthlyCost)}/mo</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">BLDC (brushless DC)</td>
                <td className="px-4 py-2">28-35W</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleBldc.monthlyCost)}/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2">
          {[
            ['Standard fans', 'the most common type already installed in most Indian homes, drawing around 75W with a basic induction motor — the least efficient of the three, but also the cheapest fan to buy upfront.'],
            ['BEE 5-star fans', 'carry the Bureau of Energy Efficiency\'s highest star rating for ceiling fans and use roughly a third less power than a standard fan for similar airflow, at a moderate price premium.'],
            ['BLDC fans', 'use a brushless DC motor and electronic control instead of a basic induction motor, cutting wattage by roughly 60% versus a standard fan — the highest upfront cost of the three, but the lowest running cost by a wide margin.'],
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
          Takeaway: the fan itself is a one-time purchase, but its wattage is
          a recurring cost you pay every single hour it runs — over a fan&apos;s
          typical multi-year lifespan, a BLDC or 5-star model usually earns
          back its price premium purely from the lower electricity bill.
        </p>
      </section>

      <section aria-labelledby="cut-cost" className="mb-10">
        <h2 id="cut-cost" className="font-display mb-4 text-2xl font-semibold">
          How to Cut Your Ceiling Fan&apos;s Running Cost
        </h2>
        <p className="text-ash/80">
          Four practical changes lower a fan&apos;s bill without touching your
          comfort on a hot day:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Enter your real daily hours', 'the calculator above is only as accurate as the hours you give it — a fan left running overnight and through a working day adds up very differently from one used only in the evening.'],
            ['Upgrade an old standard fan', 'a BEE 5-star or BLDC replacement cuts the wattage on every single hour that follows, as the comparison table above shows.'],
            ['Run at the lowest comfortable regulator speed', 'a fan motor draws less power at a lower speed setting, so matching the speed to what&apos;s actually needed — rather than defaulting to maximum — reduces the wattage side of the calculation directly.'],
            ['Switch off fans in empty rooms', 'because every unit is priced at your top tariff slab, an idle fan is billed at your costliest marginal rate, not some lower average rate — there\'s no "cheap" hour to leave one running unnecessarily.'],
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
          For the rest of your household&apos;s appliances, our{' '}
          <Link href="/appliances" className="text-brass underline">
            full appliance hub
          </Link>{' '}
          covers fridges, ACs, inverters and more using this same top-slab
          pricing logic.
        </p>
      </section>

      <section aria-labelledby="regulator" className="mb-10">
        <h2 id="regulator" className="font-display mb-4 text-2xl font-semibold">
          Why Regulator Type Changes the Real Saving
        </h2>
        <p className="text-ash/80">
          Two fans with the identical rated wattage can still cost differently
          to run, because of how their speed regulator works:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Old resistor-type regulators', 'reduce a fan\'s speed by burning off the excess electricity as heat inside the regulator itself — the fan draws less airflow, but the motor still pulls close to its full rated wattage even at a low speed setting.'],
            ['Electronic/capacitor regulators', 'actually reduce the power delivered to the motor as you turn the speed down, so a lower setting genuinely lowers the wattage — closer to what most people assume "running at low speed" already does.'],
            ['BLDC fans\' built-in electronic control', 'is a version of the same idea baked into the motor design itself, which is part of why a BLDC fan\'s wattage scales down more efficiently across its speed range than a standard induction-motor fan\'s.'],
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
          Takeaway: if you have an older resistor-type regulator, running the
          fan at a lower speed saves less than it feels like it should — an
          electronic regulator or a BLDC fan is what actually delivers the
          wattage saving a lower speed setting implies.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          Common Mistakes When Estimating Fan Cost
        </h2>
        <ul className="mt-3 space-y-2">
          {[
            ['Assuming one blended rate for all electricity', 'a fan\'s units are priced at your top tariff slab because they add to your existing usage, not at some lower average rate across your whole bill — the calculator above already accounts for this, but it\'s worth understanding why the figure looks higher than a naive wattage × unit-rate guess.'],
            ['Guessing wattage instead of checking the label', 'standard, 5-star and BLDC fans can look identical from the outside — the BEE label sticker on the motor housing or box is the only reliable way to know which one you actually have.'],
            ['Ignoring how many fans run at once', 'a single-fan estimate understates a real household\'s fan-related electricity cost once every bedroom, the living room and the kitchen fan are counted together.'],
            ['Not re-checking after an upgrade', 'switching from a standard to a BLDC fan changes the wattage input for every future calculation — rerun the calculator with the new fan\'s rated wattage rather than reusing an old estimate.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-appliance" aria-hidden>✓</span>
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
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/appliances/fridge-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Fridge cost calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              From the annual kWh figure on your fridge&apos;s BEE label.
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
