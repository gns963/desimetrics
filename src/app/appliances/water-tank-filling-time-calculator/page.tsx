import type { Metadata } from 'next'
import Link from 'next/link'
import WaterTankFillCalculator from '@/components/calculators/WaterTankFillCalculator'
import PageHero from '@/components/PageHero'
import { estimateTankFillTime } from '@/lib/calc/watertank'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/water-tank-filling-time-calculator'

const example = estimateTankFillTime({ capacityLiters: 1000, flowRateLpm: 50 })
const exampleSmallTank = estimateTankFillTime({ capacityLiters: 500, flowRateLpm: 40 })
const exampleLargeTank = estimateTankFillTime({ capacityLiters: 2000, flowRateLpm: 100 })
const exampleWeakPump = estimateTankFillTime({ capacityLiters: 1000, flowRateLpm: 25 })

export const metadata: Metadata = {
  title: 'Water Tank Filling Time Calculator 2026 — By Capacity & Pump Flow',
  description:
    'Calculate how long your water tank takes to fill from its capacity in litres and your pump\'s flow rate in LPM, with a note on why real-world lift affects flow.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/water-tank-filling-time-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Water Tank Filling Time Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Water Tank Filling Time Calculator', path: PATH },
])

const faqs = [
  {
    q: 'How do I find my pump\'s flow rate?',
    a: 'It\'s printed on the pump\'s nameplate or spec sheet, usually in LPM (litres per minute) or LPH (litres per hour, divide by 60 for LPM). A typical 0.5 HP domestic pump delivers roughly 40-70 LPM and a 1 HP pump roughly 80-120 LPM at low head — but this varies a lot by model, so check your specific pump where possible.',
  },
  {
    q: 'Why might my tank actually take longer to fill than this estimate?',
    a: 'Pump nameplate flow rates are usually measured at zero or low head (no vertical lift). Pumping water up to an overhead or rooftop tank, through narrow or long pipework, or through a partially closed valve all reduce real flow below the rated figure.',
  },
  {
    q: 'Does tank shape affect fill time?',
    a: 'No — fill time depends only on volume and flow rate, not shape. A tall narrow tank and a short wide tank of the same litre capacity fill in the same time at the same flow rate.',
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

export default function WaterTankFillPage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Water Tank Filling Time Calculator', href: '/appliances/water-tank-filling-time-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="Water Tank Filling Time Calculator"
        subtitle="Find out how long your water tank takes to fill, from its capacity and your pump's flow rate."
        stats={[
          { icon: '🧮', big: 'V ÷ Q', small: 'Formula', tone: 'hub' },
          { icon: '💧', big: 'LPM', small: 'Flow rate unit', tone: 'hub' },
          { icon: '📏', big: 'Zero-head', small: 'Nameplate basis', tone: 'hub' },
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
          A <strong>1,000-litre tank</strong> filled by a pump delivering{' '}
          <strong>50 LPM</strong> takes about{' '}
          <strong>{example.minutes} minutes</strong> ({example.hours} hours). That
          figure assumes the pump actually delivers its rated 50 LPM — in
          practice, lifting water to an overhead or rooftop tank usually pulls
          real flow below the nameplate number, so treat this as a best-case
          estimate rather than a guarantee.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your fill time
        </h2>
        <WaterTankFillCalculator />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated
        </h2>
        <p className="text-ash/80">
          Fill time (minutes) = tank capacity (litres) ÷ pump flow rate
          (litres/minute). Simple volumetric arithmetic — the only real-world
          variable is getting an accurate flow rate for your actual setup,
          since lift height and pipe size both reduce flow below a pump&apos;s
          rated (zero-head) figure.
        </p>
      </section>

      <section aria-labelledby="why-longer" className="mb-10">
        <h2 id="why-longer" className="font-display mb-4 text-2xl font-semibold">
          Why Your Real Fill Time Often Runs Longer Than the Nameplate Figure
        </h2>
        <p className="text-ash/80">
          A pump&apos;s LPM rating is a best-case number measured at or near
          zero head — three everyday parts of a real household setup quietly
          pull flow below it:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Lift height (head)', 'pumping water up to an overhead or rooftop tank makes the pump work against gravity, and flow drops as the vertical lift increases — a pump rated for ground-level use will move noticeably less water per minute once it has to climb several floors.'],
            ['Pipe diameter and length', 'narrow or unusually long pipework adds friction the water has to push through, which reduces flow versus the pump\'s rated figure — the effect gets worse the longer and narrower the run.'],
            ['Partially closed or old valves', 'a valve that isn\'t fully open, or one that has narrowed with age and mineral buildup, restricts flow the same way a kinked hose does.'],
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
          Takeaway: if your tank consistently takes noticeably longer to fill
          than this calculator estimates, check lift height, pipe size and
          valve position before assuming the pump itself is faulty.
        </p>
      </section>

      <section aria-labelledby="cost" className="mb-10">
        <h2 id="cost" className="font-display mb-4 text-2xl font-semibold">
          Estimating the Electricity Cost of Filling Your Tank
        </h2>
        <p className="text-ash/80">
          Once you know the fill time, converting it to a running cost uses
          the same units-based method as every other appliance calculator on
          this site:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Convert the motor rating to watts', 'a pump\'s power is usually rated in HP — 1 HP is approximately 746 watts, so a 0.5 HP pump draws roughly 373W and a 1 HP pump roughly 746W while running.'],
            ['Multiply by fill time, divide by 1,000', 'wattage × running hours ÷ 1,000 gives the units (kWh) consumed for that one fill — the identical formula our fan, cooler and induction-cooktop calculators use for their running cost.'],
            ['Price those units at your DISCOM\'s top slab', 'like every appliance on this site, the pump\'s units sit on top of your existing household consumption, so they\'re priced at your highest tariff slab (plus fuel cost adjustment and duty) rather than a flat average rate.'],
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
          A single fill is usually a small cost — the real expense shows up
          from repeated overflow or unnecessarily long fill times, both of
          which the fixes below directly address.
        </p>
      </section>

      <section aria-labelledby="scenarios" className="mb-10">
        <h2 id="scenarios" className="font-display mb-4 text-2xl font-semibold">
          Fill Time Across Common Tank and Pump Combinations
        </h2>
        <p className="text-ash/80">
          The same volume-over-flow-rate arithmetic, run across four everyday
          household combinations, shows how directly fill time responds to
          both tank size and pump strength:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Setup</th>
                <th className="px-4 py-2 font-semibold">Tank / pump</th>
                <th className="px-4 py-2 text-right font-semibold">Fill time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-4 py-2 font-medium">Small tank, modest pump</td>
                <td className="px-4 py-2">500 L @ 40 LPM</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleSmallTank.minutes} min</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Typical household setup</td>
                <td className="px-4 py-2">1,000 L @ 50 LPM</td>
                <td className="px-4 py-2 text-right tabular-nums">{example.minutes} min</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Same tank, weaker pump</td>
                <td className="px-4 py-2">1,000 L @ 25 LPM</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleWeakPump.minutes} min</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Large tank, strong pump</td>
                <td className="px-4 py-2">2,000 L @ 100 LPM</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleLargeTank.minutes} min</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: halving the pump&apos;s flow rate for the same tank exactly
          doubles the fill time, and doubling both tank size and flow rate
          together leaves fill time unchanged — it&apos;s the ratio of volume
          to flow rate that matters, not either number in isolation.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          Common Setup Mistakes That Waste Time and Water
        </h2>
        <p className="text-ash/80">
          Four avoidable setup issues account for most of the gap between a
          pump&apos;s rated performance and what a household actually
          experiences:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Undersized pipework', 'a pipe diameter too narrow for the pump\'s rated flow bottlenecks output no matter how powerful the motor is — match pipe size to the pump\'s specification, not just whatever was already fitted.'],
            ['No float valve or auto-cutoff', 'without one, an unattended pump keeps running after the tank is full, wasting both water and the electricity spent pumping it — a low-cost float valve pays for itself quickly.'],
            ['Running the pump dry', 'starting the pump with an empty suction line or a dry source risks damaging the motor and seals — always confirm water is available at the source first.'],
            ['Ignoring the zero-head assumption', 'planning a schedule (like an early-morning fill window) around the nameplate flow rate rather than the real, lift-adjusted flow rate is a common reason a fill runs later than expected.'],
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
            href="/appliances/room-cooling-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⏱️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Room cooling time
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Another simple physics-based home-utility timer.
            </p>
          </Link>
          <Link
            href="/appliances/inverter-sizing-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Inverter sizing
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Size backup power for your pump during a power cut.
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
