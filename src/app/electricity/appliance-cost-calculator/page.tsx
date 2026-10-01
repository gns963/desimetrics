import type { Metadata } from 'next'
import Link from 'next/link'
import GenericApplianceCostCalculator from '@/components/calculators/GenericApplianceCostCalculator'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/electricity/appliance-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = simpleApplianceCost({ discomCode: 'TNEB', wattage: 100, hoursPerDay: 4 })

// Reference figures only — informational, not used as calculator inputs.
// Typical published wattage ranges for common Indian household appliances.
const REFERENCE_APPLIANCES = [
  ['LED bulb', '5–15 W'],
  ['Laptop', '40–65 W'],
  ['LED TV (42")', '60–120 W'],
  ['Washing machine', '350–700 W'],
  ['Microwave oven', '900–1500 W'],
  ['Electric iron', '1000–1600 W'],
  ['Water heater (geyser)', '1500–3000 W'],
  ['Mixer/grinder', '300–750 W'],
]

/** Same appliances, typical usage pattern, run through the real engine so the
 *  "does usage pattern matter more than wattage" point is a computed fact. */
const USAGE_SCENARIOS = [
  { name: 'LED bulb', watts: 10, hours: 5 },
  { name: 'Laptop', watts: 55, hours: 6 },
  { name: 'Washing machine', watts: 500, hours: 0.5 },
  { name: 'Water heater (geyser)', watts: 2000, hours: 0.5 },
].map((a) => ({
  ...a,
  ...simpleApplianceCost({ discomCode: 'TNEB', wattage: a.watts, hoursPerDay: a.hours }),
}))

/** Standby/phantom draw: a device left plugged in at a small constant watts
 *  figure, summed over a full month, at the same marginal rate. */
const PHANTOM_WATTS = 5
const phantomCost = simpleApplianceCost({
  discomCode: 'TNEB',
  wattage: PHANTOM_WATTS,
  hoursPerDay: 24,
})

export const metadata: Metadata = {
  title: 'Appliance Electricity Cost Calculator 2026 — Any Appliance (India)',
  description:
    'Calculate the running cost of any home appliance from its wattage and daily usage hours, priced at your DISCOM\'s real tariff.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/electricity/appliance-cost-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Appliance Electricity Cost Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Electricity', path: '/electricity' },
  { name: 'Appliance Cost Calculator', path: PATH },
])

const faqs = [
  {
    q: 'How do I find my appliance\'s wattage?',
    a: 'It\'s printed on a rating plate or sticker on the appliance itself, or in the box/manual — usually labelled "Power" or "Rated Wattage" in W.',
  },
  {
    q: 'Does this work for appliances we already have a dedicated calculator for, like AC or fridge?',
    a: 'It can, but our dedicated AC, ceiling fan and fridge calculators use more accurate methodology — ISEER for AC, and the BEE label figure for fridges — so use those where available. This generic tool is for everything else.',
  },
  {
    q: 'Why is the appliance priced at my top tariff slab?',
    a: 'Indian electricity tariffs are telescopic — any appliance you add sits on top of your existing consumption, so its units land on your highest slab, not a blended average rate.',
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

export default function GenericApplianceCostPage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Electricity', href: '/electricity' },
          { label: 'Appliance Cost Calculator', href: '/electricity/appliance-cost-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⚡</span> Electricity hub
          </>
        }
        h1="Appliance Electricity Cost Calculator"
        subtitle={
          <>
            Any appliance not covered by our dedicated tools — enter its
            wattage and daily hours, priced at{' '}
            <strong>your DISCOM&apos;s real tariff</strong>.
          </>
        }
        stats={[
          { icon: '🔌', big: 'Any', small: 'Wattage', tone: 'hub' },
          { icon: '📈', big: 'Top slab', small: 'Pricing method', tone: 'hub' },
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
          A <strong>100W appliance</strong> running{' '}
          <strong>4 hours/day</strong> in Tamil Nadu uses about{' '}
          <strong>{example.dailyUnits} units/day</strong> and costs roughly{' '}
          <strong>{formatINR(example.monthlyCost)}/month</strong>.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your appliance&apos;s cost
        </h2>
        <GenericApplianceCostCalculator discoms={liveDiscoms} />
      </section>

      <section aria-labelledby="how-it-works" className="mb-10">
        <h2 id="how-it-works" className="font-display mb-4 text-2xl font-semibold">
          How the calculation works
        </h2>
        <p className="text-ash/80">
          Three steps, all of which you can check with a phone calculator:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Units = watts × hours ÷ 1000</strong> —
              one unit on your bill is one kilowatt sustained for one hour. A{' '}
              {example.wattage}W appliance run {example.hoursPerDay} hours a day uses{' '}
              {example.dailyUnits} units that day.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">A month is roughly 30 days</strong> — so
              the monthly figure is the daily units scaled up: {example.monthlyUnits} units
              a month for that same appliance.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Priced at your marginal rate</strong> —
              not your average rate. Indian residential tariffs are telescopic, so
              whatever you add on top of your existing usage lands on your highest slab.
              That rate already includes the fuel cost adjustment and electricity duty.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: the whole calculation is two multiplications and a tariff lookup —
          nothing here is a black box.
        </p>
      </section>

      <section aria-labelledby="wattage-vs-hours" className="mb-10">
        <h2 id="wattage-vs-hours" className="font-display mb-4 text-2xl font-semibold">
          Wattage decides the rate, hours decide the bill
        </h2>
        <p className="text-ash/80">
          A high-wattage appliance used briefly can cost less than a low-wattage one left
          running all day. Units are watts <em>times</em> hours, so usage pattern matters
          as much as the number printed on the appliance:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Appliance</th>
                <th className="px-4 py-2 text-right font-semibold">Wattage</th>
                <th className="px-4 py-2 text-right font-semibold">Typical use</th>
                <th className="px-4 py-2 text-right font-semibold">Units/month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {USAGE_SCENARIOS.map((s) => (
                <tr key={s.name}>
                  <td className="px-4 py-2 font-medium">{s.name}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-ash/70">
                    {s.watts}W
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-ash/70">
                    {s.hours}h/day
                  </td>
                  <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                    {s.monthlyUnits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ash/50">
          All rows priced at TNEB&apos;s marginal rate for illustration — use the
          calculator above with your own DISCOM.
        </p>
        <p className="mt-3 text-ash/80">
          Notice the <strong>2000W water heater</strong> run half an hour a day uses more
          than the <strong>10W bulb</strong> run five hours a day, but not by as much as
          the wattage gap alone suggests — because the bulb&apos;s hours partly make up
          for its lower draw. This is why a wattage figure alone, without hours, tells you
          very little.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: always multiply by hours before comparing two appliances — wattage
          alone is not a cost ranking.
        </p>
      </section>

      <section aria-labelledby="standby" className="mb-10">
        <h2 id="standby" className="font-display mb-4 text-2xl font-semibold">
          The cost of devices you never switch off
        </h2>
        <p className="text-ash/80">
          Phones, set-top boxes, routers, chargers left plugged in, and appliances with a
          standby light all draw a small current around the clock. A single device drawing
          a steady {PHANTOM_WATTS}W, 24 hours a day, every day of the month, comes to{' '}
          {phantomCost.monthlyUnits} units — and a typical home has several such devices
          running simultaneously, not one.
        </p>
        <p className="mt-3 text-ash/80">
          Unlike a washing machine or geyser, standby draw is invisible in daily life —
          nobody notices a router that is always on, because it is supposed to always be
          on. That is exactly why it is worth checking: it is the one category of load this
          calculator can price but that you cannot time with a stopwatch, since the
          &ldquo;hours per day&rdquo; is simply 24. Our{' '}
          <Link href="/appliances/phantom-load-checker" className="text-brass underline">
            phantom load checker
          </Link>{' '}
          is built specifically for tallying several such devices at once.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: small wattage multiplied by 720 hours a month is not negligible —
          check what is always plugged in, not just what you turn on.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          Mistakes that throw the number off
        </h2>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Reading VA instead of W</strong> — some
              labels print apparent power (volt-amps) rather than real power (watts). For
              a purely resistive appliance (a heater, an iron) the two are close; for a
              motor or electronics they can differ meaningfully.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Using the rated maximum, not typical draw</strong>{' '}
              — a kettle or iron cycles its heating element on and off once it reaches
              temperature; its nameplate wattage is the peak, not the sustained average.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Entering hours switched on rather than hours actually drawing power</strong>{' '}
              — a washing machine running a 45-minute cycle is not drawing its full
              wattage for the whole 45 minutes; a TV left on mute while you leave the room
              still counts as on.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Treating units as rupees</strong> — this
              tool&apos;s output is kWh; the ₹ figure comes from multiplying by your
              DISCOM&apos;s marginal rate, which the calculator does for you.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: a wrong wattage or wrong hours figure is the usual cause of a result
          that looks off — not the formula.
        </p>
      </section>

      <section aria-labelledby="when-dedicated" className="mb-10">
        <h2 id="when-dedicated" className="font-display mb-4 text-2xl font-semibold">
          When a dedicated calculator gives a better answer
        </h2>
        <p className="text-ash/80">
          This tool treats every appliance as a constant wattage for however many hours
          you enter, which is accurate for simple resistive loads but understates or
          overstates a few categories with their own behaviour:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Air conditioners</strong> cycle their
              compressor on and off rather than running flat out — our{' '}
              <Link href="/ac/bill-calculator" className="text-brass underline">
                AC running cost calculator
              </Link>{' '}
              models that duty cycle from tonnage and star rating instead of a flat
              wattage.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Refrigerators</strong> run continuously
              but cycle their compressor too, and the BEE label already states an annual
              kWh figure measured in a lab — our{' '}
              <Link href="/appliances/fridge-cost-calculator" className="text-brass underline">
                fridge cost calculator
              </Link>{' '}
              uses that label figure directly rather than a wattage guess.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Ceiling fans</strong> have their own
              calculator with speed-setting presets, since running one at a lower speed
              draws noticeably less than nameplate wattage — see our{' '}
              <Link href="/appliances/ceiling-fan-cost-calculator" className="text-brass underline">
                ceiling fan cost calculator
              </Link>
              .
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">EV charging</strong> is a much larger,
              sustained load with its own charger-efficiency considerations — handled by
              our{' '}
              <Link href="/electricity/ev-charging-cost-calculator" className="text-brass underline">
                EV charging cost calculator
              </Link>
              .
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: use this tool for everything without a dedicated calculator — irons,
          mixers, washing machines, routers, chargers, lighting — and the specialised
          tools where one exists.
        </p>
      </section>

      <section aria-labelledby="reference" className="mb-10">
        <h2 id="reference" className="font-display mb-2 text-2xl font-semibold">
          Typical appliance wattage — reference only
        </h2>
        <p className="mb-4 text-ash/70">
          These are commonly published ranges to help you sanity-check a
          figure — always use the wattage printed on your specific
          appliance for an accurate calculation.
        </p>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Appliance</th>
                <th className="px-4 py-2 text-right font-semibold">Typical wattage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {REFERENCE_APPLIANCES.map(([name, watts]) => (
                <tr key={name}>
                  <td className="px-4 py-2 font-medium">{name}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{watts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Link
            href="/appliances/ceiling-fan-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🌀</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Ceiling fan cost
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Dedicated tool with fan-type presets.
            </p>
          </Link>
          <Link
            href="/appliances/fridge-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Fridge cost calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              More accurate — uses your fridge&apos;s BEE label.
            </p>
          </Link>
          <Link
            href="/electricity/ev-charging-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              EV charging cost
            </p>
            <p className="mt-1 text-xs text-ash/60">
              A bigger load than most appliances — its own tool.
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
