import type { Metadata } from 'next'
import Link from 'next/link'
import AcPowerConsumptionCalculator from '@/components/calculators/AcPowerConsumptionCalculator'
import PageHero from '@/components/PageHero'
import {
  acDailyUnits,
  calculateAcPowerConsumption,
  DEFAULT_AC_POWER_FACTOR,
  DEFAULT_VOLTAGE,
  estimateAcRatedCurrentAmps,
  LOAD_FACTOR,
} from '@/lib/calc/ac'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/power-consumption-calculator'

const example = calculateAcPowerConsumption({ ratedCurrentAmps: 6, hoursPerDay: 8 })

/** Reference rows computed from the same engine the calculator uses, so the
 *  table can never drift from `estimateAcRatedCurrentAmps()`. */
const TONNAGES = [0.8, 1.0, 1.5, 2.0] as const
const REFERENCE_STARS = [1, 3, 5] as const
const currentTable = TONNAGES.map((ton) => ({
  ton,
  amps: REFERENCE_STARS.map((star) => estimateAcRatedCurrentAmps(ton, star)),
}))

/** The two routes to daily units disagree by design — this page explains why,
 *  so both figures are derived here rather than quoted from memory. */
const COMPARE_TON = 1.5
const COMPARE_STAR = 3
const COMPARE_HOURS = 8
const compareAmps = estimateAcRatedCurrentAmps(COMPARE_TON, COMPARE_STAR)
const nameplateRoute = calculateAcPowerConsumption({
  ratedCurrentAmps: compareAmps,
  hoursPerDay: COMPARE_HOURS,
})
const iseerRouteUnits =
  Math.round(acDailyUnits(COMPARE_TON, COMPARE_STAR, COMPARE_HOURS) * 100) / 100
const dutyFactorPercent = Math.round(LOAD_FACTOR * 100)

export const metadata: Metadata = {
  title: 'AC Power Consumption Calculator 2026 — From Rated Current (Amps)',
  description:
    'Calculate your air conditioner\'s power draw and unit (kWh) consumption from its nameplate rated current in Amps, an alternative to the tonnage/star-rating method.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/ac/power-consumption-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AC Power Consumption Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'Power Consumption Calculator', path: PATH },
])

const faqs = [
  {
    q: 'Where do I find my AC\'s rated current?',
    a: 'It\'s printed on the nameplate of the outdoor (compressor) unit, usually labelled "Rated Current" or "Input Current" in Amps (A).',
  },
  {
    q: 'How is this different from the AC running cost calculator?',
    a: 'The running cost calculator works from tonnage and star rating (ISEER), which is useful when comparing AC models. This tool works from your specific unit\'s nameplate current, which is useful once you already own the AC and want a quick power-draw figure without looking up ISEER tables.',
  },
  {
    q: 'Why does the calculator assume a 0.85 power factor?',
    a: 'AC compressor motors typically run at a power factor around 0.85, meaning real (working) power is about 85% of the apparent power implied by voltage × current. This is a typical figure — your specific unit\'s nameplate power factor may differ slightly.',
  },
  {
    q: 'Does this give me a cost, not just units?',
    a: 'This tool shows units (kWh) consumed. For a ₹ cost estimate priced at your DISCOM\'s tariff, use the AC running cost calculator with the daily units figure from here.',
  },
  {
    q: 'What does the nameplate actually look like, and where exactly is it?',
    a: 'On a split AC it\'s a metal or sticker label on the side or back of the outdoor unit, listing model number, refrigerant type, voltage, and current draw — usually as "Rated Current" or "Running Current" in Amps. On a window AC it\'s on the side panel, visible from outside the sleeve.',
  },
  {
    q: 'Why is this useful for an old or unlabeled AC?',
    a: 'Older or resold units sometimes have a worn, missing, or non-English nameplate, and ISEER labelling only became mandatory in recent years — so tonnage/star-rating figures may not exist for an older unit at all. A clamp meter reading of the actual running current, or a legible rated-current figure, works even when the efficiency label doesn\'t.',
  },
  {
    q: 'Can I measure the current myself instead of reading the nameplate?',
    a: 'Yes — a basic clamp meter around one of the AC\'s supply wires gives a direct current reading with the unit running. This can be more accurate than the nameplate figure, which is a rated (not real-time) value.',
  },
  {
    q: 'Is it safe to open the AC unit to check the nameplate or wiring myself?',
    a: 'Reading a visible nameplate is fine. Opening electrical enclosures, checking internal wiring, or using a clamp meter inside the unit should only be done by, or under the supervision of, a licensed electrician — see our circuit safety calculator for the wiring side of this.',
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

export default function AcPowerConsumptionPage() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/ac' },
          { label: 'Power Consumption Calculator', href: '/ac/power-consumption-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="AC Power Consumption Calculator"
        subtitle={
          <>
            Find your AC&apos;s power draw and unit (kWh) consumption straight
            from its <strong>nameplate rated current</strong> — no tonnage or
            star-rating lookup needed.
          </>
        }
        stats={[
          { icon: '🔌', big: '230V', small: 'Standard supply', tone: 'hub' },
          { icon: '⚙️', big: '0.85', small: 'Assumed power factor', tone: 'hub' },
          { icon: '📊', big: 'kW', small: 'Result unit', tone: 'hub' },
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
          An AC rated at <strong>6A</strong> running <strong>8 hours/day</strong>{' '}
          draws about <strong>{example.inputKw} kW</strong> and uses roughly{' '}
          <strong>{example.dailyUnits} units/day</strong> ({example.monthlyUnits}{' '}
          units/month).
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your AC&apos;s power draw
        </h2>
        <AcPowerConsumptionCalculator />
      </section>

      <section aria-labelledby="how-it-works" className="mb-10">
        <h2 id="how-it-works" className="font-display mb-4 text-2xl font-semibold">
          How the calculation works
        </h2>
        <p className="text-ash/80">
          Two steps, both of which you can check by hand: convert current into power,
          then multiply power by the hours you run the AC.
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Power (kW) = volts × amps × power factor ÷ 1000</strong>{' '}
              — at {DEFAULT_VOLTAGE}V with a power factor of {DEFAULT_AC_POWER_FACTOR},
              a {compareAmps}A unit draws about {nameplateRoute.inputKw} kW.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Units (kWh) = kW × hours</strong> — one
              unit on your bill is one kilowatt sustained for one hour, so the same{' '}
              {nameplateRoute.inputKw} kW over {COMPARE_HOURS} hours is{' '}
              {nameplateRoute.dailyUnits} units a day.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Why the power factor is there</strong> —
              a compressor is an inductive motor, so volts × amps overstates the real
              working power. The {DEFAULT_AC_POWER_FACTOR} figure is a typical value for
              an AC compressor; if your nameplate prints its own power factor, override
              it in the calculator above.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">{DEFAULT_VOLTAGE}V is the assumption, not a guarantee</strong>{' '}
              — it is the standard Indian single-phase supply voltage. If your area runs
              consistently low or you are on a stabiliser, change the voltage field
              rather than leaving the default.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: nothing here is a black box — the whole calculation is two
          multiplications you can repeat on a phone calculator.
        </p>
      </section>

      <section aria-labelledby="duty-factor" className="mb-10">
        <h2 id="duty-factor" className="font-display mb-4 text-2xl font-semibold">
          Why this tool and the running-cost calculator disagree
        </h2>
        <p className="text-ash/80">
          Run the same AC through both of our tools and you will get two different
          numbers. That is deliberate, and knowing which one you want matters more
          than the gap itself.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Route</th>
                <th className="px-4 py-2 font-semibold">What it assumes</th>
                <th className="px-4 py-2 text-right font-semibold">Units/day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-4 py-2 font-medium">This page (nameplate current)</td>
                <td className="px-4 py-2">
                  Compressor drawing its full rated current the whole time
                </td>
                <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                  {nameplateRoute.dailyUnits}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">
                  <Link href="/ac/bill-calculator" className="text-brass underline">
                    AC running cost
                  </Link>{' '}
                  (tonnage + star)
                </td>
                <td className="px-4 py-2">
                  Same unit, derated to a {dutyFactorPercent}% compressor duty factor
                </td>
                <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                  {iseerRouteUnits}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ash/50">
          Both rows are a {COMPARE_TON} ton {COMPARE_STAR}-star unit run{' '}
          {COMPARE_HOURS} hours a day, computed by the same engine the two calculators
          use — the nameplate row from an estimated {compareAmps}A rated current.
        </p>
        <p className="mt-4 text-ash/80">
          The reason is the <strong>compressor duty factor</strong>. A thermostat-
          controlled AC does not hold full load for eight straight hours: once the room
          reaches the set temperature the compressor cycles down or off, and an inverter
          unit modulates continuously. Our running-cost calculator applies a{' '}
          {dutyFactorPercent}% duty factor for that reason. This page deliberately does
          not, because nameplate rated current is itself a full-load figure — applying a
          derating to it would hide what you asked for.
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Use this page</strong> for a worst-case
              or electrical-sizing figure: what the circuit must carry, or what a day of
              near-continuous running in peak summer looks like.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Use the running-cost calculator</strong>{' '}
              for a realistic monthly bill estimate, since it both derates for cycling
              and prices the units at your DISCOM&apos;s top slab.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: the higher number is not wrong and the lower one is not optimistic —
          they answer different questions.
        </p>
      </section>

      <section aria-labelledby="reading-nameplate" className="mb-10">
        <h2 id="reading-nameplate" className="font-display mb-4 text-2xl font-semibold">
          Reading your AC&apos;s nameplate
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            The nameplate is a metal or sticker label on the outdoor
            (compressor) unit for a split AC, or the side panel for a window
            AC. Look for a field labelled <strong>Rated Current</strong> or{' '}
            <strong>Input Current</strong>, given in Amps (A) — that&apos;s
            the number this calculator needs.
          </p>
          <p>
            This route is especially useful for an <strong>older or
            resold unit</strong>: ISEER labelling only became mandatory in
            recent years, so a pre-ISEER AC may have no usable star rating
            at all, while its rated current is still readable — or
            measurable directly with a clamp meter if the label has worn off.
          </p>
          <p>
            One distinction worth keeping straight: the nameplate prints a{' '}
            <strong>rated</strong> current, which is a design figure at full load. The
            current your unit actually pulls at a given moment is lower once the room is
            cool, and briefly much higher at the instant the compressor starts. That
            starting surge is why circuit sizing adds headroom over the rated figure
            rather than matching it — our{' '}
            <Link href="/ac/circuit-safety-calculator" className="text-brass underline">
              circuit safety calculator
            </Link>{' '}
            applies that margin for you.
          </p>
        </div>
      </section>

      <section aria-labelledby="typical-current" className="mb-10">
        <h2 id="typical-current" className="font-display mb-4 text-2xl font-semibold">
          Typical rated current by tonnage and star rating
        </h2>
        <p className="text-ash/80">
          If your label is unreadable and you cannot measure the current yet, these
          figures give you a starting point. Higher star ratings draw less current for
          the same cooling output, which is the whole point of the rating.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Tonnage</th>
                {REFERENCE_STARS.map((s) => (
                  <th key={s} className="px-4 py-2 text-right font-semibold">
                    {s}-star
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {currentTable.map((row) => (
                <tr key={row.ton}>
                  <td className="px-4 py-2 font-medium">{row.ton} ton</td>
                  {row.amps.map((a, i) => (
                    <td
                      key={i}
                      className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy"
                    >
                      {a} A
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ash/50">
          Derived from cooling load and the BEE ISEER band for each star rating, at{' '}
          {DEFAULT_VOLTAGE}V and a {DEFAULT_AC_POWER_FACTOR} power factor. Actual
          nameplate current varies by brand and compressor design, so treat these as
          planning approximations — read your own unit&apos;s label where you can, and
          see our{' '}
          <Link href="/ac/brands" className="text-brass underline">
            AC brand pages
          </Link>{' '}
          for model-level specifics.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: a 2 ton 5-star unit draws less current than a 1.5 ton 1-star one —
          tonnage alone does not tell you the electrical load.
        </p>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          Mistakes that throw the number off
        </h2>
        <p className="text-ash/80">
          Most wrong answers from this calculator come from the input, not the maths:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Using the indoor unit&apos;s label</strong>{' '}
              — on a split AC the indoor blower draws a fraction of the system total. The
              figure you want is on the outdoor compressor unit.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Reading the starting or locked-rotor current</strong>{' '}
              — some nameplates list a separate surge figure. It is much larger than the
              running current and will inflate your units several times over.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Entering hours the AC is switched on rather than cooling</strong>{' '}
              — this tool bills every entered hour at full load, so an overnight figure
              of eight hours assumes eight hours of compressor running.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">Treating units as rupees</strong> — the
              output is kWh. Electricity is slab-priced, and an AC lands on your highest
              slab because it is incremental load on top of base usage.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: check that you are reading the outdoor unit&apos;s running current
          before trusting any figure here.
        </p>
      </section>

      <section aria-labelledby="units-to-rupees" className="mb-10">
        <h2 id="units-to-rupees" className="font-display mb-4 text-2xl font-semibold">
          Turning units into rupees
        </h2>
        <p className="text-ash/80">
          Units alone do not tell you the cost, because Indian residential tariffs are
          slab-based: the rate rises as monthly consumption crosses each threshold. An
          AC is added on top of whatever you already use, so its units are billed at
          your <strong>top slab</strong>, not your average rate — plus fuel cost
          adjustment and electricity duty.
        </p>
        <p className="mt-3 text-ash/80">
          That is why a figure from this page can cost very different amounts in two
          states. To price it properly, take the daily units above into our{' '}
          <Link href="/ac/bill-calculator" className="text-brass underline">
            AC running cost calculator
          </Link>
          , which applies your DISCOM&apos;s own slabs, or check the published rate for
          your utility — for example{' '}
          <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
            MSEDCL
          </Link>{' '}
          in Maharashtra,{' '}
          <Link href="/electricity/tneb-bill-calculator" className="text-brass underline">
            TNPDCL
          </Link>{' '}
          in Tamil Nadu, or{' '}
          <Link href="/electricity/bescom-bill-calculator" className="text-brass underline">
            BESCOM
          </Link>{' '}
          in Karnataka.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: the same AC costs different amounts in different states — units are
          portable, rupees are not.
        </p>
      </section>

      <section
        aria-labelledby="safety-note"
        className="mb-10 rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5"
      >
        <h2
          id="safety-note"
          className="font-display mb-2 text-lg font-semibold text-caution-amber"
        >
          ⚠ A note on electrical safety
        </h2>
        <p className="text-sm text-ash/80">
          Reading a visible nameplate is safe for anyone. Measuring current
          with a clamp meter inside an enclosure, or inspecting AC wiring
          directly, should only be done by a licensed electrician. Once you
          have the rated current figure, our{' '}
          <Link href="/ac/circuit-safety-calculator" className="underline hover:text-caution-amber">
            circuit safety calculator
          </Link>{' '}
          uses the same number to check the MCB and wire gauge the circuit needs.
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC running cost
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Turn these units into a ₹ figure for your DISCOM.
            </p>
          </Link>
          <Link
            href="/ac/circuit-safety-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🛡️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Circuit safety calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Same rated current, for MCB and wire sizing.
            </p>
          </Link>
          <Link
            href="/ac/comparison-tool"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚖️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC comparison tool
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Compare two AC configurations side by side.
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
