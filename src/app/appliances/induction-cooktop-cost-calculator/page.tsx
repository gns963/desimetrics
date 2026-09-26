import type { Metadata } from 'next'
import Link from 'next/link'
import InductionCooktopCalculator from '@/components/calculators/InductionCooktopCalculator'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/induction-cooktop-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = simpleApplianceCost({ discomCode: 'TNEB', wattage: 1600, hoursPerDay: 1 })
const exampleLow = simpleApplianceCost({ discomCode: 'TNEB', wattage: 1200, hoursPerDay: 1 })
const exampleHigh = simpleApplianceCost({ discomCode: 'TNEB', wattage: 2000, hoursPerDay: 1 })

export const metadata: Metadata = {
  title: 'Induction Cooktop Electricity Cost Calculator 2026 — India',
  description:
    'Calculate your induction cooktop\'s electricity cost by wattage and daily cooking time, priced at your DISCOM\'s real tariff.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/induction-cooktop-cost-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Induction Cooktop Electricity Cost Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Induction Cooktop Cost Calculator', path: PATH },
])

const faqs = [
  {
    q: 'How much electricity does an induction cooktop use?',
    a: 'Most Indian induction cooktops are rated 1200-2000W, with 1600W being a common mid-range figure. Actual draw varies with the power setting you cook at, not just the maximum rated wattage.',
  },
  {
    q: 'Is induction cooking cheaper than LPG?',
    a: 'It depends on your electricity tariff and LPG price, and induction is generally more energy-efficient at transferring heat into the pan than an open LPG flame — but the ₹ comparison needs your own real numbers on both sides. Try our PNG vs LPG comparison for the gas side, and this calculator for the electric side.',
  },
  {
    q: 'Why is the cooktop priced at my top tariff slab?',
    a: 'Indian electricity tariffs are telescopic — usage is billed in progressively pricier slabs. Any appliance you add sits on top of your existing consumption, so its units land on your highest slab, not a blended average rate.',
  },
  {
    q: 'Does the power setting affect actual consumption?',
    a: 'Yes — the rated wattage is the maximum draw at the highest setting. Cooking at a lower power setting (e.g. for simmering) draws less than the rated figure, so this calculator\'s estimate is most accurate for cooking done mostly at higher settings.',
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

export default function InductionCooktopCostPage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Induction Cooktop Cost Calculator', href: '/appliances/induction-cooktop-cost-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="Induction Cooktop Electricity Cost Calculator"
        subtitle={
          <>
            Find out what your induction cooktop costs to run. Pick a power
            tier or enter its exact wattage, set daily cooking time, and we
            price the units at your <strong>DISCOM&apos;s top electricity slab</strong>.
          </>
        }
        stats={[
          { icon: '🍳', big: '1200–2000W', small: 'Typical range', tone: 'hub' },
          { icon: '📈', big: 'Top slab', small: 'Pricing method', tone: 'hub' },
          { icon: '🗺️', big: '36 states', small: 'DISCOM coverage', tone: 'hub' },
          { icon: '⏱️', big: 'Mins, not hrs', small: 'Typical daily use', tone: 'hub' },
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
          A <strong>1600W induction cooktop</strong> used 1 hour/day in
          Tamil Nadu uses about <strong>{example.dailyUnits} units/day</strong>{' '}
          and costs roughly <strong>{formatINR(example.monthlyCost)}/month</strong>{' '}
          ({formatINR(example.annualCost)}/year) at{' '}
          {formatINR(example.effectiveRatePerUnit)}/unit.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your cooktop&apos;s cost
        </h2>
        <InductionCooktopCalculator discoms={liveDiscoms} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          How this is calculated
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>Units = wattage × hours ÷ 1000.</strong> The
            cooktop&apos;s daily energy use in kWh is its wattage multiplied
            by daily active cooking hours, divided by 1000 to convert watts
            to kilowatts. Unlike an always-on appliance, most households
            only run an induction cooktop for a fraction of an hour to a
            couple of hours a day.
          </p>
          <p>
            <strong>Priced at your top slab.</strong> Since a cooktop adds
            to your existing consumption, its units fall in your highest
            tariff slab — we use that marginal rate (plus fuel cost
            adjustment and electricity duty) for a realistic cost.
          </p>
        </div>
      </section>

      <section aria-labelledby="power-tiers" className="mb-10">
        <h2 id="power-tiers" className="font-display mb-4 text-2xl font-semibold">
          Cost by Power Tier: 1200W, 1600W and 2000W
        </h2>
        <p className="text-ash/80">
          Indian induction cooktops are sold in three common power tiers, and
          the tier you buy directly sets your running cost at any given daily
          usage. Here&apos;s the same 1 hour/day of use in Tamil Nadu at each
          tier:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Tier</th>
                <th className="px-4 py-2 text-right font-semibold">Daily units</th>
                <th className="px-4 py-2 text-right font-semibold">Monthly cost</th>
                <th className="px-4 py-2 text-right font-semibold">Annual cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-4 py-2 font-medium">1200W (entry-level)</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleLow.dailyUnits}</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleLow.monthlyCost)}</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleLow.annualCost)}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">1600W (mid-range)</td>
                <td className="px-4 py-2 text-right tabular-nums">{example.dailyUnits}</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(example.monthlyCost)}</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(example.annualCost)}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">2000W (high-power)</td>
                <td className="px-4 py-2 text-right tabular-nums">{exampleHigh.dailyUnits}</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleHigh.monthlyCost)}</td>
                <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleHigh.annualCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: the jump from a 1200W to a 2000W cooktop, run for the same
          duration, raises the annual cost by roughly the same proportion as
          the wattage itself — the tier you choose matters more to your bill
          than any single cooking habit.
        </p>
      </section>

      <section aria-labelledby="power-draw" className="mb-10">
        <h2 id="power-draw" className="font-display mb-4 text-2xl font-semibold">
          What Actually Changes an Induction Cooktop&apos;s Power Draw
        </h2>
        <p className="text-ash/80">
          The rated wattage on the box is a ceiling, not a constant — four
          factors move your real, day-to-day consumption below or above the
          simple wattage-times-hours estimate:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Power-setting used', 'most cooktops offer 5-10 discrete power levels; simmering or slow-cooking at a low setting draws well under the rated maximum, while a full boil or sear runs close to it.'],
            ['Boost mode', 'a dedicated high-power boost function (where fitted) briefly exceeds the cooktop\'s normal rated wattage for faster boiling — useful occasionally, but a poor default setting to leave running.'],
            ['Cookware material and base size', 'induction only works with ferromagnetic (magnetic-base) cookware; a pan smaller than the coil or made of the wrong material either won\'t heat efficiently or won\'t heat at all, wasting the energy the cooktop still draws.'],
            ['Multi-zone models', 'a cooktop with two or more induction zones draws the sum of whichever zones are active — running two burners at once roughly doubles the instantaneous draw of running one.'],
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
          Takeaway: two identical 1600W cooktops can cost noticeably
          different amounts to run in the same kitchen purely because of
          power-setting habits and cookware choice — the wattage label only
          sets the ceiling, not what you actually draw.
        </p>
      </section>

      <section aria-labelledby="choosing-tier" className="mb-10">
        <h2 id="choosing-tier" className="font-display mb-4 text-2xl font-semibold">
          Choosing a Power Tier for Your Household
        </h2>
        <p className="text-ash/80">
          The right tier depends on how many people you cook for and what
          you mostly cook, not on buying the highest wattage available:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['1200W entry-level', 'suits a single person or couple doing mostly reheating, tea/coffee, and light single-pan cooking — the lowest running cost of the three tiers.'],
            ['1600W mid-range', 'the most common household tier — handles a full daily-cooking routine for a small family, including a reasonably quick boil, without the higher cost of a high-power model.'],
            ['2000W high-power', 'suits larger families or anyone regularly boiling large volumes (bulk rice, a big pot of milk) who values faster cooking time over the lower running cost of a smaller tier.'],
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

      <section aria-labelledby="vs-lpg" className="mb-10">
        <h2 id="vs-lpg" className="font-display mb-4 text-2xl font-semibold">
          Induction vs. LPG/PNG: What the Comparison Actually Depends On
        </h2>
        <p className="text-ash/80">
          There&apos;s no single right answer to whether induction or gas
          cooking costs less — it depends on three things you have to check
          against your own numbers, not a generic rule of thumb:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Your electricity tariff slab', 'the marginal rate this calculator uses (your DISCOM\'s top slab, plus fuel cost adjustment and duty) is what an induction cooktop is actually priced at — not the lower, blended average rate often quoted informally.'],
            ['Your LPG cylinder price', 'domestic LPG pricing varies by state and by whether a household still receives a subsidy — use our LPG Cylinder Usage Calculator to work out your own real per-meal gas cost before comparing it to the figure above.'],
            ['Heat-transfer efficiency', 'induction transfers heat directly into a compatible pan through electromagnetic induction, with very little heat lost to the surrounding air, whereas an open LPG flame loses a meaningful share of its heat around the pan\'s sides — but this efficiency gap doesn\'t by itself decide the ₹ comparison once tariff and cylinder price are both plugged in.'],
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
          Running a PNG (piped natural gas) connection instead of LPG? Our{' '}
          <Link href="/gas" className="text-brass underline">
            Gas Bill Calculator
          </Link>{' '}
          covers that comparison directly.
        </p>
      </section>

      <section aria-labelledby="common-mistakes" className="mb-10">
        <h2 id="common-mistakes" className="font-display mb-4 text-2xl font-semibold">
          Common Mistakes When Estimating Induction Cooktop Cost
        </h2>
        <p className="text-ash/80">
          Four habits quietly throw off a self-estimated induction cooking
          cost, even when the underlying formula is correct:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Using the box wattage instead of the nameplate rating', 'marketing material sometimes rounds or lists a peak/boost figure — the sticker or manual\'s continuous rated wattage is the more reliable input.'],
            ['Counting total time in the kitchen, not active cooking time', 'a cooktop left on standby between steps still draws a small amount, but the bulk of the cost comes from active heating time — track that specifically, not the whole cooking session.'],
            ['Assuming every burner runs at the rated maximum', 'most home cooking sits at a mid or low power setting for a large share of the time; entering the rated maximum wattage for the full duration overstates the real cost.'],
            ['Comparing against LPG using a remembered, outdated cylinder price', 'domestic LPG prices change periodically and vary by state — recheck the current price before comparing, rather than relying on a figure from months ago.'],
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
            href="/gas"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Gas bill calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Compare against PNG cooking cost.
            </p>
          </Link>
          <Link
            href="/fuel-cost/lpg-cylinder-usage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              LPG cylinder usage
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Compare against LPG cylinder cooking cost.
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
