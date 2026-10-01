import type { Metadata } from 'next'
import Link from 'next/link'
import AcCircuitSafetyCalculator from '@/components/calculators/AcCircuitSafetyCalculator'
import AcCircuitSafetyTable from '@/components/ac/AcCircuitSafetyTable'
import PageHero from '@/components/PageHero'
import { recommendAcCircuit } from '@/lib/calc/ac'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/circuit-safety-calculator'

const example = recommendAcCircuit({ ratedCurrentAmps: 6 })

export const metadata: Metadata = {
  title: 'AC Circuit Safety Calculator 2026 — MCB & Wire Gauge Sizing (India)',
  description:
    'General planning guidance for the MCB rating and copper wire gauge for an AC circuit, from its rated current. Not a substitute for a licensed electrician.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/ac/circuit-safety-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AC Circuit Safety Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'Circuit Safety Calculator', path: PATH },
])

const faqs = [
  {
    q: 'Is this a substitute for a licensed electrician?',
    a: 'No. This is general planning guidance to help you understand roughly what to expect before an installation — the final MCB and wire specification must be confirmed by a licensed electrician, accounting for your specific wire run length, ambient temperature, conduit fill and local electrical code.',
  },
  {
    q: 'Why does the calculator add 25% headroom to the rated current?',
    a: 'AC compressors draw a brief surge current on startup well above their steady running current, and continuous-duty loads like ACs are conventionally derated for safety margin — a 25% headroom over nameplate rated current is a common starting point for sizing.',
  },
  {
    q: 'Why is a dedicated circuit recommended for an AC?',
    a: 'Sharing a circuit with other high-load appliances increases the risk of nuisance tripping or overheating. A dedicated MCB and wire run sized for the AC alone is standard practice for split and window AC installations in India.',
  },
  {
    q: 'What standard governs residential AC wiring in India?',
    a: 'IS 732 (Code of Practice for Electrical Wiring Installations) is the relevant Indian Standard, alongside your local electricity board\'s wiring rules. A licensed electrician will apply these correctly for your specific site.',
  },
  {
    q: 'What happens if the MCB is undersized for the AC?',
    a: 'An undersized MCB will trip repeatedly, especially on the compressor\'s startup surge — a nuisance, but the safe failure mode. It will not by itself cause a fire; it protects the circuit by cutting power before the wiring is overloaded.',
  },
  {
    q: 'What happens if the wire gauge is undersized?',
    a: 'This is the genuinely dangerous scenario: an undersized wire can overheat under sustained AC load even if the MCB doesn\'t trip, which is a real fire risk. This is exactly why wire sizing should be confirmed by a licensed electrician, not estimated from a table alone.',
  },
  {
    q: 'Can I run two ACs off the same circuit?',
    a: 'Not recommended. Standard practice in India is one dedicated MCB and wire run per AC unit, sized for that unit alone — sharing a circuit between two ACs risks nuisance tripping at best and overloading at worst.',
  },
  {
    q: 'Does the reference table below apply to window ACs the same way?',
    a: 'The same current-to-MCB-to-wire logic applies, but window ACs are typically lower tonnage and often run off a standard 15A/16A domestic socket circuit rather than a dedicated line — check your specific unit\'s nameplate current against the table regardless of AC type.',
  },
  {
    q: 'My AC\'s actual nameplate current is different from the reference table — which do I use?',
    a: 'Always use your own unit\'s actual nameplate current, not the table\'s tonnage-based estimate — the table is a general planning reference for browsing, while the calculator above and your electrician should work from your specific AC\'s real rated current.',
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

export default function AcCircuitSafetyPage() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/ac' },
          { label: 'Circuit Safety Calculator', href: '/ac/circuit-safety-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="AC Circuit Safety Calculator"
        subtitle="General planning guidance for the MCB rating and copper wire gauge an AC circuit typically needs. This is a starting point for conversations with your electrician — not a final specification."
        stats={[
          { icon: '🛡️', big: '+25%', small: 'Safety headroom', tone: 'hub' },
          { icon: '📘', big: 'IS 732', small: 'Reference standard', tone: 'hub' },
          { icon: '🔌', big: 'Dedicated', small: 'Circuit recommended', tone: 'hub' },
          { icon: '⚠️', big: 'Not final', small: 'Verify with electrician', tone: 'caution-amber' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section
        aria-labelledby="worked-example"
        className="mb-8 rounded-xl border border-hairline border-l-4 border-l-caution-amber bg-paper p-5"
      >
        <h2
          id="worked-example"
          className="font-display text-sm font-semibold tracking-wide text-caution-amber uppercase"
        >
          Worked example — general guidance only
        </h2>
        <p className="mt-2 text-ash/80">
          An AC rated at <strong>6A</strong> would typically call for around a{' '}
          <strong>{example.recommendedMcbAmps}A MCB</strong> and{' '}
          <strong>{example.recommendedWireSqmm} sq mm</strong> copper wire —
          always have this confirmed by a licensed electrician for your
          specific installation.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Get your circuit guidance
        </h2>
        <AcCircuitSafetyCalculator />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>Design current.</strong> We take the AC&apos;s nameplate
            rated current and add 25% headroom, since compressor motors draw a
            brief starting surge above their running current.
          </p>
          <p>
            <strong>MCB rating.</strong> The next standard MCB size at or
            above the design current (from 6A, 10A, 16A, 20A, 25A, 32A, 40A…)
            is recommended.
          </p>
          <p>
            <strong>Wire gauge.</strong> We match the MCB rating to a copper
            wire cross-section commonly used in Indian residential wiring
            practice for that current range — a starting reference, not a
            calculation of your specific run&apos;s voltage drop or heat
            dissipation.
          </p>
        </div>
      </section>

      <section aria-labelledby="why-margin" className="mb-10">
        <h2 id="why-margin" className="font-display mb-4 text-2xl font-semibold">
          Why the circuit is sized above the AC&apos;s rated current
        </h2>
        <p className="text-ash/80">
          Because an AC is both a surging load and a continuous one, and each of those
          pushes the sizing the same direction:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Starting surge</strong> — a compressor
              motor draws a brief inrush well above its running current each time it
              starts. A breaker sized exactly at the running figure would be living at
              its limit every cycle.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Continuous duty</strong> — unlike a
              kettle or a mixer, an AC can run for hours. Cables and breakers warm up
              under sustained load, and their safe capacity is lower than a short-burst
              rating suggests.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">Nameplate current is a rated figure</strong>{' '}
              — it describes the design point, not the worst moment. Sizing to it exactly
              leaves nothing for voltage dips, a dirty condenser or an ageing compressor,
              all of which push current up.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: the headroom is not padding — it is what keeps a normal start from
          looking like a fault.
        </p>
      </section>

      <section aria-labelledby="oversizing" className="mb-10">
        <h2 id="oversizing" className="font-display mb-4 text-2xl font-semibold">
          The one mistake worth naming: fitting a bigger MCB to stop tripping
        </h2>
        <p className="text-ash/80">
          If an AC circuit keeps tripping, replacing the MCB with a higher-rated one is
          the most dangerous available response — and a common one.
        </p>
        <p className="mt-3 text-ash/80">
          An MCB does not protect the appliance. It protects the <strong>cable</strong>{' '}
          behind it, by disconnecting before the current running through that cable can
          overheat it. Fit a larger MCB without changing the wire, and the cable can now
          carry more current than it is rated for while the breaker sits there quite
          happily — the protection has been removed, not improved. The wire is inside a
          wall or conduit where you cannot see it heating.
        </p>
        <p className="mt-3 text-ash/80">
          Repeated tripping is information. It usually means the circuit is undersized
          for the load, shared with other appliances, or that something on it is faulty —
          all of which are reasons to call a licensed electrician rather than to upsize
          the breaker. That is also why the calculator above recommends an MCB{' '}
          <em>and</em> a wire gauge together: the pair is the specification, and changing
          one without the other is what causes the problem.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: the MCB and the cable are sized as a pair — never raise one alone.
        </p>
      </section>

      <section aria-labelledby="not-sized" className="mb-10">
        <h2 id="not-sized" className="font-display mb-4 text-2xl font-semibold">
          What this calculator does not size
        </h2>
        <p className="text-ash/80">
          The output is a planning starting point from one input. A real installation
          depends on several things this tool cannot know, which is why it is framed as
          general guidance rather than a specification:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Run length and voltage drop</strong> — a
              long cable run from the distribution board loses voltage along the way, and
              may need a thicker conductor than the current alone implies.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Ambient temperature and conduit fill</strong>{' '}
              — cables bundled together, or run through a hot roof space, carry less
              current safely than the same cable in open air.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Earthing and leakage protection</strong> —
              an MCB handles overcurrent, not earth leakage. Residual-current protection
              and a sound earth are separate requirements and are not outputs of this
              tool.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              <strong className="text-ink-navy">Local code and the rest of the board</strong>{' '}
              — IS 732 and your local rules govern the final specification, and the
              existing board&apos;s capacity, isolation and load balance all matter.
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: use this to understand and sanity-check a quote, not to replace the
          electrician who signs off the work.
        </p>
      </section>

      <section aria-labelledby="dedicated-circuit" className="mb-10">
        <h2 id="dedicated-circuit" className="font-display mb-4 text-2xl font-semibold">
          Why an AC normally gets its own circuit
        </h2>
        <p className="text-ash/80">
          Standard practice is to run an air conditioner on a dedicated circuit from the
          distribution board rather than off a general socket ring, for three practical
          reasons:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">The load is large and sustained</strong>,
              so sharing a circuit means the AC plus anything else on it can together
              exceed what the cable was sized for.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">Faults stay contained</strong> — a problem
              on the AC circuit does not take out lighting or other rooms, and vice
              versa.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">It can be isolated for service</strong> —
              technicians need to work on the unit with the supply off, without
              shutting down half the house.
            </span>
          </li>
        </ul>
        <p className="mt-3 text-ash/80">
          Two symptoms are worth treating as a reason to get the circuit checked rather
          than lived with: an MCB that trips when the AC starts, and a switch, socket or
          plug that is warm to the touch after the AC has been running. Both point at a
          circuit working harder than it should. Knowing your unit&apos;s current draw
          helps here — our{' '}
          <Link href="/ac/power-consumption-calculator" className="text-brass underline">
            AC power consumption calculator
          </Link>{' '}
          works it out from the same nameplate figure, and the{' '}
          <Link href="/ac/bill-calculator" className="text-brass underline">
            running cost calculator
          </Link>{' '}
          shows what that load costs on your DISCOM&apos;s tariff.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: a tripping breaker or a warm socket is a diagnostic signal, not an
          inconvenience to work around.
        </p>
      </section>

      <section
        aria-labelledby="reference-table"
        className="mb-10 rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5"
      >
        <h2
          id="reference-table"
          className="font-display mb-2 text-2xl font-semibold text-ink-navy"
        >
          Typical MCB &amp; wire gauge by AC tonnage — general reference
        </h2>
        <p className="mb-4 text-sm text-ash/70">
          For browsing only, not a specification — always size a real
          installation from the AC&apos;s own nameplate current using the
          calculator above, then have it confirmed by a licensed electrician.
        </p>
        <AcCircuitSafetyTable />
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/ac/power-consumption-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔢</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Power consumption
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Same rated current, for power draw and units.
            </p>
          </Link>
          <Link
            href="/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC tonnage calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Still choosing an AC size? Start here.
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
              Planning backup power for other circuits too?
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

      <footer className="rounded-lg bg-caution-amber/10 p-4 text-sm text-ash/70">
        <p>
          ⚠ <strong>Safety notice:</strong> electrical wiring carries real
          fire and shock risk if sized or installed incorrectly. This
          calculator gives general planning guidance derived from common
          Indian residential wiring practice — it is not a substitute for
          assessment and installation by a licensed electrician, and does not
          account for wire run length, ambient temperature, conduit fill or
          your local electrical code in detail.
        </p>
      </footer>

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
