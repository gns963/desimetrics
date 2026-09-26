import type { Metadata } from 'next'
import Link from 'next/link'
import RoomCoolingTimeCalculator from '@/components/calculators/RoomCoolingTimeCalculator'
import PageHero from '@/components/PageHero'
import { estimateCoolingTime } from '@/lib/calc/cooling'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/room-cooling-time-calculator'

const example = estimateCoolingTime({ areaSqFt: 150, ceilingHeightFt: 9, dropTempC: 6, acTon: 1.5 })
const exampleBiggerRoom = estimateCoolingTime({ areaSqFt: 250, ceilingHeightFt: 9, dropTempC: 6, acTon: 1.5 })
const exampleBiggerAc = estimateCoolingTime({ areaSqFt: 150, ceilingHeightFt: 9, dropTempC: 6, acTon: 2 })
const comparisonRows = [
  { areaSqFt: 100, acTon: 1 },
  { areaSqFt: 150, acTon: 1.5 },
  { areaSqFt: 200, acTon: 1.5 },
  { areaSqFt: 200, acTon: 2 },
  { areaSqFt: 300, acTon: 2 },
].map((r) => ({
  ...r,
  result: estimateCoolingTime({ areaSqFt: r.areaSqFt, ceilingHeightFt: 9, dropTempC: 6, acTon: r.acTon }),
}))

export const metadata: Metadata = {
  title: 'Room Cooling Time Calculator 2026 — AC Pull-Down Time Estimate',
  description:
    'Estimate the theoretical minimum time your AC takes to cool a room\'s air by a given temperature drop, using real thermodynamic formulas — not a guessed multiplier.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/room-cooling-time-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Room Cooling Time Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Room Cooling Time Calculator', path: PATH },
])

const faqs = [
  {
    q: 'Why does the real room take longer to cool than this estimate?',
    a: 'This calculator answers a narrower question: how fast could the AC remove the heat already in the room\'s air, if no new heat came in. In reality, walls, windows, the roof and anyone in the room keep adding heat while the AC runs, so actual pull-down always takes longer — often much longer on a hot day or in a poorly insulated room.',
  },
  {
    q: 'Why is this still a useful number?',
    a: 'It\'s a genuine physics-based floor, not a guess — useful for comparing scenarios (a bigger AC vs a smaller one, a bigger drop vs a smaller one) even though the absolute real-world time will be higher.',
  },
  {
    q: 'What assumptions does this use?',
    a: 'Standard air density (0.075 lb/ft³) and specific heat of air (0.24 BTU/lb·°F) — textbook physical constants — plus an assumed 9 ft ceiling height and a 75% sensible heat ratio (the share of an AC\'s capacity that goes to temperature cooling rather than dehumidification), typical for split ACs.',
  },
  {
    q: 'Is my AC undersized if the real room takes much longer than this?',
    a: 'Not necessarily — this gap is expected and doesn\'t by itself mean your AC is undersized. If cooling is consistently slow or the AC never quite reaches the set temperature on hot days, check our AC tonnage calculator to confirm the unit is sized correctly for the room.',
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

export default function RoomCoolingTimePage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Room Cooling Time Calculator', href: '/appliances/room-cooling-time-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="Room Cooling Time Calculator"
        subtitle={
          <>
            A real physics-based estimate of how fast your AC could cool your
            room&apos;s air — explicitly a theoretical minimum, not a real-world
            prediction. We explain the gap rather than papering over it.
          </>
        }
        stats={[
          { icon: '🧮', big: 'Q=mcΔT', small: 'Physics formula', tone: 'hub' },
          { icon: '💧', big: '75%', small: 'Sensible heat ratio', tone: 'hub' },
          { icon: '📐', big: '9 ft', small: 'Assumed ceiling', tone: 'hub' },
          { icon: '⏱️', big: 'Min. only', small: 'Theoretical floor', tone: 'hub' },
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
          A <strong>150 sq ft room</strong> (9 ft ceiling) cooled by a{' '}
          <strong>1.5 ton AC</strong> would take about{' '}
          <strong>{example.minutesToCoolAirOnly} minutes</strong> to drop{' '}
          {example.dropTempC}°C — for the air alone, with no ongoing heat gain.
          Grow the same room to <strong>250 sq ft</strong> and the same AC takes{' '}
          <strong>{exampleBiggerRoom.minutesToCoolAirOnly} minutes</strong> for the
          identical drop — the extra air volume takes proportionally longer to
          cool. Keep the room at 150 sq ft but size up to a{' '}
          <strong>2 ton AC</strong> instead, and the time falls to{' '}
          <strong>{exampleBiggerAc.minutesToCoolAirOnly} minutes</strong> — a
          bigger AC removes heat faster because its rated capacity is directly
          proportional to tonnage.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Estimate your cooling time
        </h2>
        <RoomCoolingTimeCalculator />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated — and its real limit
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>Heat to remove.</strong> Q (BTU) = room volume (ft³) ×
            0.075 (air density, lb/ft³) × 0.24 (specific heat of air,
            BTU/lb·°F) × temperature drop (°F) — the standard sensible-heat
            formula, using real physical constants.
          </p>
          <p>
            <strong>AC&apos;s effective cooling rate.</strong> We take the
            AC&apos;s rated BTU/hr (tonnage × 12,000) and apply a 75% sensible
            heat ratio, since some of an AC&apos;s capacity goes to removing
            humidity rather than lowering temperature.
          </p>
          <p>
            <strong>Time scales directly with tonnage.</strong> Because the
            effective cooling rate is the AC&apos;s rated BTU/hr (tonnage ×
            12,000) times the sensible heat ratio, doubling the AC&apos;s
            tonnage roughly halves the minutes needed for the same room and the
            same temperature drop — and doubling the room&apos;s volume roughly
            doubles the minutes for the same AC, since twice the air holds
            twice the heat to remove.
          </p>
          <p>
            <strong>What this deliberately leaves out.</strong> Walls, windows,
            the roof, sunlight and people all add heat to a real room
            continuously — this calculator only accounts for the air that&apos;s
            already there. That&apos;s why it&apos;s labelled a theoretical
            minimum, not a promise of real-world performance.
          </p>
        </div>
      </section>

      <section aria-labelledby="comparison" className="mb-10 scroll-mt-20">
        <h2 id="comparison" className="font-display mb-4 text-2xl font-semibold">
          Cooling Time Across Common Room/AC Pairings
        </h2>
        <p className="text-ash/80">
          The same 6°C drop and 9 ft ceiling, run across five common room sizes
          and AC tonnages, shows how directly the theoretical minimum scales
          with both variables:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Room size</th>
                <th className="px-4 py-2 font-semibold">AC tonnage</th>
                <th className="px-4 py-2 text-right font-semibold">Minutes to cool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {comparisonRows.map((row) => (
                <tr key={`${row.areaSqFt}-${row.acTon}`}>
                  <td className="px-4 py-2 font-medium">{row.areaSqFt} sq ft</td>
                  <td className="px-4 py-2">{row.acTon} ton</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {row.result.minutesToCoolAirOnly} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: a 200 sq ft room cooled by a 1.5 ton AC takes noticeably
          longer than the same room with a 2 ton unit — if a room in this size
          range consistently feels slow to cool in real life, tonnage is one of
          the first things worth double-checking, not just the thermostat
          setting.
        </p>
      </section>

      <section aria-labelledby="real-world-gap" className="mb-10">
        <h2 id="real-world-gap" className="font-display mb-4 text-2xl font-semibold">
          Why Real-World Cooling Always Takes Longer
        </h2>
        <p className="text-ash/80">
          The gap between this theoretical minimum and what you actually feel
          comes from continuous heat gain the formula deliberately excludes:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Walls and the roof', 'absorb heat from the outside air and radiate it inward all day, especially on a top-floor room or a west-facing wall that takes direct afternoon sun.'],
            ['Windows and doors', 'let heat in through glass even when closed, and any gap around the frame lets warm outside air leak in continuously while the AC runs.'],
            ['People and electronics', 'a running TV, computer, or lighting, and every person in the room, add their own heat output on top of what the AC has to remove.'],
            ['Outdoor temperature', 'a hotter day means a bigger difference between inside and outside, which pushes more heat through the same walls and windows per minute.'],
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
          Takeaway: none of these sources of heat gain ever stop while the AC
          runs, which is exactly why real pull-down time is always longer than
          this air-only estimate — often by a wide margin on a hot afternoon in
          a poorly insulated room.
        </p>
      </section>

      <section aria-labelledby="using-the-estimate" className="mb-10">
        <h2 id="using-the-estimate" className="font-display mb-4 text-2xl font-semibold">
          How to Actually Use This Number
        </h2>
        <p className="text-ash/80">
          Treat this calculator as a comparison tool between scenarios, not a
          forecast of a specific real-world time:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Compare AC sizes for the same room', 'run the same area and temperature drop with two different tonnage values to see how much faster a bigger AC removes the same amount of heat.'],
            ['Compare rooms for the same AC', 'run the same AC against a smaller and a larger room to see how much the extra air volume adds to the theoretical minimum.'],
            ['Treat a much slower real room as a signal, not proof', 'if your real room consistently takes far longer than this estimate or never quite reaches the set temperature on a hot day, it\'s worth confirming the AC is actually sized correctly for the room with our AC tonnage calculator, rather than assuming the unit is faulty.'],
            ['Close doors and windows before running the AC', 'this doesn\'t change the calculator\'s number, but it reduces the real-world heat gain this formula excludes, bringing actual performance closer to the theoretical floor.'],
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
            href="/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC tonnage calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Not sure this is even the right AC size for your room? Check first.
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
              What this AC actually costs to run day to day.
            </p>
          </Link>
          <Link
            href="/appliances/water-tank-filling-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🚰</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Water tank fill time
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Another simple physics-based home-utility timer.
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
