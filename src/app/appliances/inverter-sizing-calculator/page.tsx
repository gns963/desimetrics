import type { Metadata } from 'next'
import Link from 'next/link'
import InverterSizingCalculator from '@/components/calculators/InverterSizingCalculator'
import PageHero from '@/components/PageHero'
import { sizeInverter } from '@/lib/calc/inverter'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/inverter-sizing-calculator'

const example = sizeInverter({ totalLoadWatts: 600, backupHours: 4, batteryVoltage: 12 })
const exampleSmall = sizeInverter({ totalLoadWatts: 300, backupHours: 3, batteryVoltage: 12 })
const exampleLarge = sizeInverter({ totalLoadWatts: 1500, backupHours: 6, batteryVoltage: 24 })

export const metadata: Metadata = {
  title: 'Home UPS / Inverter Sizing Calculator 2026 — VA & Battery Ah',
  description:
    'Find the right inverter VA rating and battery Ah capacity for your home backup load and desired backup hours, using standard electrical sizing formulas.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/inverter-sizing-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Home UPS / Inverter Sizing Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Inverter Sizing Calculator', path: PATH },
])

const faqs = [
  {
    q: 'How do I add up my load in watts?',
    a: 'List every appliance you want backed up and its rated wattage (printed on the appliance or its box), then add them together. Common figures: LED bulb 10W, ceiling fan 75W, TV 80–150W, fridge 100–200W (running, not starting), router 15W.',
  },
  {
    q: 'Why does the calculator add 25% headroom to VA?',
    a: 'It\'s a commonly recommended safety margin so the inverter isn\'t run at its absolute ceiling continuously, which shortens its life and hurts its ability to handle brief surges from motor-based appliances starting up.',
  },
  {
    q: 'Should I size for full battery discharge?',
    a: 'No — this calculator sizes the battery Ah for your stated backup hours using typical round-trip efficiency, but repeatedly draining a lead-acid battery to 100% shortens its life. See our battery backup time calculator for the safe-vs-full-capacity distinction.',
  },
  {
    q: 'Does a motor appliance need extra sizing beyond its running wattage?',
    a: 'Yes — motors (like a fridge or water pump) draw a brief surge of 2-3× their running wattage on startup. If you\'re backing up such appliances, size the inverter with that surge in mind, not just steady running load.',
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

export default function InverterSizingPage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Inverter Sizing Calculator', href: '/appliances/inverter-sizing-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="Home UPS / Inverter Sizing Calculator"
        subtitle="Work out the right inverter VA rating and battery Ah capacity for the appliances you want backed up during a power cut, and for how long."
        stats={[
          { icon: '⚡', big: '0.8', small: 'Power factor', tone: 'hub' },
          { icon: '🛡️', big: '+25%', small: 'Safety headroom', tone: 'hub' },
          { icon: '⚙️', big: '80%', small: 'System efficiency', tone: 'hub' },
          { icon: '🔌', big: '12/24/48V', small: 'Battery banks', tone: 'hub' },
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
          A <strong>600W load</strong> for <strong>4 hours</strong> backup on a
          12V battery bank needs about a{' '}
          <strong>{example.recommendedVA.toLocaleString('en-IN')} VA</strong>{' '}
          inverter and a <strong>{example.recommendedBatteryAh} Ah</strong>{' '}
          battery — that&apos;s the 25% safety headroom on the VA rating and
          the round-trip efficiency loss on the battery already built in, so
          neither figure is a bare-minimum number you&apos;d want to shave
          down further.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Size your inverter
        </h2>
        <InverterSizingCalculator />
      </section>

      <section aria-labelledby="how" className="mb-10 scroll-mt-20">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated
        </h2>
        <p className="text-ash/80">
          Two separate calculations run behind the numbers above — one sizes
          the inverter itself, the other sizes the battery bank it plugs into:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['VA sizing', 'VA = (total watts ÷ 0.8 power factor) × 1.25 headroom, rounded up to the nearest 50 VA. The power factor accounts for the gap between real power (watts) and apparent power (VA) that a mixed load of motors, electronics and resistive appliances actually draws; the 25% headroom keeps the inverter from running flat-out at its rated ceiling continuously.'],
            ['Battery Ah sizing', 'watt-hours needed = load watts × backup hours. Battery Ah = watt-hours ÷ (battery voltage × 80% round-trip efficiency) — the efficiency term accounts for losses in the inverter\'s DC-to-AC conversion plus the battery\'s own charge/discharge inefficiency, so the Ah figure is deliberately larger than a naive watt-hours-over-voltage calculation would give.'],
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
          Takeaway: both figures already carry a margin — the VA number
          isn&apos;t a bare-minimum rating, and the Ah number already assumes
          real-world conversion losses, not an idealised 100%-efficient system.
        </p>
      </section>

      <section aria-labelledby="scenarios" className="mb-10 scroll-mt-20">
        <h2 id="scenarios" className="font-display mb-4 text-2xl font-semibold">
          Two Sizing Scenarios Compared
        </h2>
        <p className="text-ash/80">
          The right inverter and battery size depend entirely on what you&apos;re
          backing up and for how long — a small essentials-only setup and a
          larger whole-room setup land in very different ranges:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Scenario</th>
                <th className="px-4 py-2 font-semibold">Load / backup / battery</th>
                <th className="px-4 py-2 text-right font-semibold">Inverter VA</th>
                <th className="px-4 py-2 text-right font-semibold">Battery Ah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-4 py-2 font-medium">Essentials-only (lights, fan, router)</td>
                <td className="px-4 py-2">300W / 3 hrs / 12V</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleSmall.recommendedVA.toLocaleString('en-IN')} VA</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleSmall.recommendedBatteryAh} Ah</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Whole-room (TV, fridge, multiple fans)</td>
                <td className="px-4 py-2">1,500W / 6 hrs / 24V</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleLarge.recommendedVA.toLocaleString('en-IN')} VA</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleLarge.recommendedBatteryAh} Ah</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: load and backup hours both scale the Ah requirement
          directly, so doubling either one roughly doubles the battery
          capacity you need — moving to a higher battery voltage (24V here
          instead of 12V) is one of the main ways larger systems keep the
          current, and so the cable and battery-bank size, manageable.
        </p>
      </section>

      <section aria-labelledby="surge" className="mb-10 scroll-mt-20">
        <h2 id="surge" className="font-display mb-4 text-2xl font-semibold">
          Why Motor-Based Appliances Need Extra Surge Headroom
        </h2>
        <p className="text-ash/80">
          The 600W or 1,500W figures above describe steady running load — but
          some appliances briefly demand far more the instant they switch on:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['What causes the surge', 'a motor (in a fridge compressor, water pump, or a wet grinder/mixer) draws a brief spike of roughly 2-3× its running wattage for a fraction of a second while it overcomes static friction and spins up to speed, before settling to its normal running draw.'],
            ['Why it matters for sizing', 'an inverter sized only for the combined steady running wattage of everything you\'re backing up can still trip or shut down the instant a motor-based appliance starts, even though its running wattage alone would fit comfortably.'],
            ['What to do about it', 'if your load list includes a fridge, water pump, or similar motor appliance, treat its startup surge (not just its running wattage) as the figure to check against your inverter\'s surge/peak rating — a spec most inverter datasheets list separately from the continuous VA rating.'],
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

      <section aria-labelledby="voltage" className="mb-10 scroll-mt-20">
        <h2 id="voltage" className="font-display mb-4 text-2xl font-semibold">
          Choosing a Battery Voltage: 12V, 24V or 48V
        </h2>
        <p className="text-ash/80">
          This calculator supports all three common home battery-bank
          voltages, and the right one depends mainly on system size:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['12V', 'the standard choice for small, single-battery backup systems — simplest wiring, and the natural fit for essentials-only loads over a few hours.'],
            ['24V', 'two 12V batteries wired in series — for the same power delivered, a 24V system draws half the current a 12V system would, which means thinner, cheaper cabling and less resistive loss as system size grows.'],
            ['48V', 'four batteries in series — used for larger backup setups (bigger whole-house loads, or systems paired with solar) where minimising current draw at scale matters even more.'],
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
          Takeaway: voltage is a wiring-efficiency and battery-bank-size
          decision, not a factor that changes how much total energy (watt-hours)
          you need — size the watt-hours first from your load and backup
          hours, then pick the voltage that suits the resulting battery bank.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="mb-10 scroll-mt-20">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          Common Inverter Sizing Mistakes
        </h2>
        <ul className="mt-3 space-y-2">
          {[
            ['Sizing for running load only', 'ignoring a motor appliance\'s startup surge is one of the most common reasons a "correctly sized" inverter still trips when a fridge or pump kicks in.'],
            ['Skipping the headroom margin', 'running an inverter continuously at its bare rated capacity, with no margin, shortens its working life and leaves no room for adding even one more small appliance later.'],
            ['Planning for 100% battery discharge', 'sizing the battery bank around its full rated Ah rather than a safe depth of discharge means every backup cycle deep-drains the battery, which shortens a lead-acid battery\'s usable lifespan considerably.'],
            ['Forgetting conversion losses', 'assuming a battery\'s full rated Ah converts directly to usable watt-hours ignores the inverter and battery\'s own round-trip efficiency loss — the real usable capacity is meaningfully lower than the sticker Ah number times voltage.'],
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
          Already sized your battery and want to know how long it&apos;ll
          actually last under a given load? See our{' '}
          <Link href="/appliances/inverter-backup-time-calculator" className="text-brass underline">
            Battery Backup Time Calculator
          </Link>{' '}
          for the safe-vs-full-capacity distinction in the other direction.
        </p>
      </section>

      <section aria-labelledby="rounding" className="mb-10 scroll-mt-20">
        <h2 id="rounding" className="font-display mb-4 text-2xl font-semibold">
          Why the Recommended Sizes Are Rounded Up
        </h2>
        <p className="text-ash/80">
          The VA and Ah figures this calculator shows aren&apos;t the raw
          output of the formulas above — they&apos;re rounded up to the
          nearest commercially sensible unit:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['VA rounds up to the nearest 50', 'inverters are sold in standard VA ratings rather than arbitrary numbers, so a raw calculated figure like 638 VA is shown as 650 VA — always rounded up, never down, so the margin already built into the formula isn\'t quietly eaten by rounding.'],
            ['Battery Ah rounds up to the nearest 5', 'batteries are similarly sold in standard Ah capacities, so a raw figure like 47 Ah becomes 50 Ah — again always rounded up, so the stated backup hours remain achievable rather than optimistic.'],
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
          When shopping, treat the recommended VA and Ah as a floor, not a
          ceiling — it&apos;s generally safer to buy the next size up from a
          retailer&apos;s available range than to round down to save cost,
          since an undersized inverter or battery bank shows up as tripped
          breakers or a backup that runs out earlier than expected, exactly
          when you need it most.
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/appliances/household-bill-builder"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🏠</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Household bill builder
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Same appliance wattage data, for your electricity bill instead.
            </p>
          </Link>
          <Link
            href="/appliances/inverter-backup-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Battery backup time
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Already have a battery? Check how long it will actually last.
            </p>
          </Link>
          <Link
            href="/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Solar ROI calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Pair backup with solar generation for daytime power cuts.
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
