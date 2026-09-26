import type { Metadata } from 'next'
import Link from 'next/link'
import InverterBackupCalculator from '@/components/calculators/InverterBackupCalculator'
import PageHero from '@/components/PageHero'
import { estimateBackupTime } from '@/lib/calc/inverter'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/inverter-backup-time-calculator'

const example = estimateBackupTime({ batteryAh: 150, batteryVoltage: 12, loadWatts: 400 })
const exampleSmall = estimateBackupTime({ batteryAh: 100, batteryVoltage: 12, loadWatts: 200 })
const exampleLarge = estimateBackupTime({ batteryAh: 200, batteryVoltage: 24, loadWatts: 1000 })

export const metadata: Metadata = {
  title: 'Inverter Battery Backup Time Calculator 2026 — How Long It Lasts',
  description:
    'Calculate how long your inverter battery will actually last for a given load, with both a safe (50% depth of discharge) and full-capacity estimate.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/inverter-backup-time-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Inverter Battery Backup Time Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Inverter Backup Time Calculator', path: PATH },
])

const faqs = [
  {
    q: 'Why does the calculator show two different backup times?',
    a: 'The full-capacity figure is the theoretical maximum if you drain the battery completely. The safe figure uses a 50% depth of discharge, which is a widely recommended limit for lead-acid batteries — draining deeper repeatedly shortens the battery\'s usable life significantly.',
  },
  {
    q: 'How do I find my battery\'s Ah rating?',
    a: 'It\'s printed on the battery\'s nameplate or case, usually alongside the voltage — for example "12V 150Ah".',
  },
  {
    q: 'Does battery age affect real backup time?',
    a: 'Yes, significantly. A battery\'s usable capacity degrades with age and charge cycles — an older battery may deliver noticeably less than its rated Ah. This calculator uses the nameplate rating, which reflects a new, fully healthy battery.',
  },
  {
    q: 'What load should I enter?',
    a: 'Add up the wattage of everything actually running on the inverter during the cut — not your inverter\'s VA rating. If you\'re unsure of your total load, see our inverter sizing calculator.',
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

export default function InverterBackupPage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Inverter Backup Time Calculator', href: '/appliances/inverter-backup-time-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="Inverter Battery Backup Time Calculator"
        subtitle="Already have a battery? Find out how long it will realistically last for your load — both a safe estimate and the theoretical maximum."
        stats={[
          { icon: '🔋', big: '50%', small: 'Safe depth of discharge', tone: 'hub' },
          { icon: '⚙️', big: '80%', small: 'System efficiency', tone: 'hub' },
          { icon: '🔌', big: '12/24/48V', small: 'Battery banks', tone: 'hub' },
          { icon: '⏱️', big: '2 modes', small: 'Safe vs full', tone: 'hub' },
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
          A <strong>150 Ah, 12V battery</strong> running a{' '}
          <strong>400W load</strong> lasts about{' '}
          <strong>{example.safeCapacityHours} hours</strong> at a safe 50%
          depth of discharge, or up to {example.fullCapacityHours} hours if
          fully drained. The gap between those two numbers is 80% round-trip
          efficiency and the 50% depth-of-discharge limit applied on top of it
          — both explained below.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your backup time
        </h2>
        <InverterBackupCalculator />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated
        </h2>
        <p className="text-ash/80">
          Backup hours come from two steps: convert the battery&apos;s rated Ah
          into usable watt-hours, then divide by the connected load.
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Usable watt-hours', 'battery Ah × battery voltage × 80% round-trip efficiency — the efficiency factor accounts for inverter conversion losses and battery charge/discharge losses combined, so it always returns less than the raw Ah × voltage figure.'],
            ['Full-capacity hours', 'usable watt-hours ÷ connected load in watts — the theoretical maximum runtime if the battery drains completely, which this calculator reports but does not recommend relying on.'],
            ['Safe-capacity hours', 'full-capacity hours × 50% depth of discharge — a commonly recommended limit for longer lead-acid battery life, and the more realistic number to plan a power cut around.'],
            ['Battery voltage', '12V, 24V or 48V battery banks change the watt-hours available for the same Ah rating, since voltage is a direct multiplier in the watt-hour formula.'],
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
          Takeaway: plan around the safe-capacity figure, not the full-capacity
          one — it costs roughly half the runway but protects the battery from
          the deep discharge cycles that shorten its usable life.
        </p>
      </section>

      <section aria-labelledby="why-less" className="mb-10">
        <h2 id="why-less" className="font-display mb-4 text-2xl font-semibold">
          Why Real-World Backup Often Falls Short of the Estimate
        </h2>
        <p className="text-ash/80">
          Four factors this calculator can&apos;t see in advance all push actual
          backup time below the full-capacity figure, sometimes well below it:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Round-trip efficiency loss', 'converting DC battery power to AC through the inverter, and charging/discharging the battery itself, together consume about 20% of the stored energy as heat and conversion loss — already built into the 80% efficiency figure used here.'],
            ['Battery aging', 'this calculator uses the battery\'s nameplate Ah rating, which reflects a new, fully healthy cell — usable capacity degrades with age and charge cycles, so a battery a few years old can deliver noticeably less than its rated Ah.'],
            ['Deep-discharge history', 'a battery that has been repeatedly drained past the safe 50% depth of discharge loses capacity faster than one that hasn\'t, compounding the aging effect above over the battery\'s service life.'],
            ['Surge loads at switch-on', 'motor-based appliances (a fridge compressor, a water pump) draw a brief surge of 2-3× their running wattage on startup — if several such appliances are on the load list, that surge can matter even though it barely affects total backup hours.'],
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

      <section aria-labelledby="battery-chemistry" className="mb-10">
        <h2 id="battery-chemistry" className="font-display mb-4 text-2xl font-semibold">
          Why the 50% Depth-of-Discharge Assumption Is Battery-Specific
        </h2>
        <p className="text-ash/80">
          The 50% safe-discharge limit used above is a lead-acid convention —
          still the most common battery type in Indian home inverter setups —
          not a universal physical rule:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Lead-acid (flooded or tubular)', 'discharging much below 50% repeatedly shortens the battery\'s usable life over its charge-cycle count, which is why 50% is the conventional planning limit this calculator applies by default.'],
            ['Lithium (LiFePO4)', 'tolerates a much deeper regular discharge than lead-acid without the same rate of capacity loss, which is why lithium battery banks are increasingly marketed on a higher usable-capacity claim for the same rated Ah — check your specific battery\'s datasheet rather than assuming this calculator\'s 50% figure applies to it.'],
            ['Whichever chemistry you have', 'the underlying watt-hours ÷ load arithmetic this calculator uses stays the same — only the safe depth-of-discharge percentage you should plan around changes.'],
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
          Takeaway: if you&apos;ve moved to a lithium battery bank, treat this
          calculator&apos;s safe-capacity figure as a conservative floor, not
          the true usable runtime — your actual battery datasheet is the
          authority on what depth of discharge is safe for your specific unit.
        </p>
      </section>

      <section aria-labelledby="scenarios" className="mb-10">
        <h2 id="scenarios" className="font-display mb-4 text-2xl font-semibold">
          Backup Time Across Three Load Sizes
        </h2>
        <p className="text-ash/80">
          The same 80% efficiency and 50% depth-of-discharge assumptions apply
          regardless of battery size — only the Ah, voltage and load change
          across a small, medium and large household setup:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Setup</th>
                <th className="px-4 py-2 font-semibold">Battery / load</th>
                <th className="px-4 py-2 text-right font-semibold">Safe hours</th>
                <th className="px-4 py-2 text-right font-semibold">Full hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-4 py-2 font-medium">Small (fans + lights)</td>
                <td className="px-4 py-2">100 Ah, 12V @ 200W</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleSmall.safeCapacityHours}h</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleSmall.fullCapacityHours}h</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Medium (fans, TV, fridge)</td>
                <td className="px-4 py-2">150 Ah, 12V @ 400W</td>
                <td className="px-4 py-2 text-right tabular-nums">{example.safeCapacityHours}h</td>
                <td className="px-4 py-2 text-right tabular-nums">{example.fullCapacityHours}h</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Large (multi-room + pump)</td>
                <td className="px-4 py-2">200 Ah, 24V @ 1000W</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleLarge.safeCapacityHours}h</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleLarge.fullCapacityHours}h</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: doubling the battery bank size and load together roughly
          preserves backup time — it&apos;s the ratio between watt-hours
          available and load drawn that determines duration, not either
          number alone.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          Common Mistakes When Estimating Backup Time
        </h2>
        <ul className="mt-3 space-y-2">
          {(
            [
              ['Entering the inverter\'s VA rating as the load', 'the load figure should be the actual connected wattage of appliances running during the cut, not the inverter\'s maximum VA capacity — those are two different numbers.'],
              ['Planning around the full-capacity figure', 'treating the theoretical maximum as the expected runtime overstates real backup time and encourages deep discharges that shorten battery life.'],
              ['Ignoring battery age', 'a 3-4 year old lead-acid battery can deliver meaningfully less than its nameplate Ah — if backup time has visibly dropped over time, ageing capacity loss, not a wiring fault, is the more likely explanation.'],
              ['Forgetting standby loads in the appliance mix', <>routers, set-top boxes and chargers left plugged in draw power continuously even when &quot;off&quot; — see our <Link href="/appliances/phantom-load-checker" className="text-brass underline">Phantom Load Checker</Link> to size that into the total load.</>],
            ] as [string, React.ReactNode][]
          ).map(([t, d]) => (
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
            href="/appliances/inverter-sizing-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Inverter sizing
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Buying new? Find the right VA and Ah for your needs.
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
              Recharge your battery bank from the sun during the day.
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
