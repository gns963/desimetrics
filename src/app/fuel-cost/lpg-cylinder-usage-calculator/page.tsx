import type { Metadata } from 'next'
import Link from 'next/link'
import LpgUsageCalculator from '@/components/calculators/LpgUsageCalculator'
import PageHero from '@/components/PageHero'
import { estimateLpgUsage } from '@/lib/calc/fuel'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/fuel-cost/lpg-cylinder-usage-calculator'

const example = estimateLpgUsage({ cylinderKg: 14.2, cylinderPrice: 900, dailyBurnerHours: 1.5 })

const CYLINDER_SIZES = [5, 14.2, 19]
const BURNER_HOURS = [1, 1.5, 2]
const referenceTable = CYLINDER_SIZES.map((kg) => ({
  kg,
  days: BURNER_HOURS.map(
    (hrs) => estimateLpgUsage({ cylinderKg: kg, cylinderPrice: 1, dailyBurnerHours: hrs }).daysRemaining,
  ),
}))

export const metadata: Metadata = {
  title: 'LPG Cylinder Usage Calculator 2026 — How Long It Lasts',
  description:
    'Estimate how many days your LPG cylinder will last from your daily cooking (burner) hours, and the equivalent daily and monthly cost.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/fuel-cost/lpg-cylinder-usage-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LPG Cylinder Usage Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Fuel Cost', path: '/fuel-cost' },
  { name: 'LPG Cylinder Usage Calculator', path: PATH },
])

const faqs = [
  {
    q: 'What is a "burner-hour" and how do I estimate mine?',
    a: 'It\'s the total active flame time across all burners you use in a day. If you cook on one burner for 45 minutes and another for 45 minutes, that\'s 1.5 burner-hours — not 45 minutes, even though it might feel like "one meal."',
  },
  {
    q: 'Why does the calculator assume 0.25 kg/hour per burner?',
    a: 'That\'s a commonly cited consumption rate for a medium-to-full domestic LPG flame. It\'s an assumption, not a measurement of your specific stove — burner design, flame setting and pot size all affect real consumption somewhat.',
  },
  {
    q: 'Does a 14.2 kg cylinder really give the number of days shown?',
    a: 'This is a planning estimate based on the stated burner-hour assumption. Real-world results vary — the useful comparison is relative: e.g., cutting your daily burner-hours by a third should roughly extend the cylinder\'s life by a third too.',
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

export default function LpgUsagePage() {
  return (
    <>
      <PageHero
        hub="fuel"
        breadcrumb={[
          { label: 'Fuel Cost', href: '/fuel-cost' },
          { label: 'LPG Cylinder Usage Calculator', href: '/fuel-cost/lpg-cylinder-usage-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⛽</span> Fuel Cost hub
          </>
        }
        h1="LPG Cylinder Usage Calculator"
        subtitle="Estimate how many days your LPG cylinder will last from your daily cooking hours, and what that works out to per day and per month."
        stats={[
          { icon: '🔥', big: '5/14.2/19 kg', small: 'Cylinder sizes', tone: 'hub' },
          { icon: '🔥', big: '0.25 kg/hr', small: 'Assumed burner rate', tone: 'hub' },
          { icon: '📆', big: 'Days', small: 'Result unit', tone: 'hub' },
          { icon: '🔓', big: 'Instant', small: 'No login', tone: 'hub' },
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
          A <strong>14.2 kg cylinder</strong> at <strong>1.5 burner-hours/day</strong>{' '}
          lasts about <strong>{example.daysRemaining} days</strong> — roughly{' '}
          {formatINR(example.monthlyCost)}/month equivalent.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your cylinder&apos;s life
        </h2>
        <LpgUsageCalculator />
      </section>

      <section aria-labelledby="how-calculated" className="mb-10">
        <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
          How this estimate is calculated
        </h2>
        <p className="text-ash/80">
          The calculator works from one assumption and your own daily
          cooking time:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Burner-hours', 'total active flame time across every burner you use in a day — two burners run for 30 minutes each is 1 burner-hour, not 30 minutes.'],
            ['0.25 kg/hour', 'a commonly cited consumption rate for a medium-to-full domestic flame — an assumption, not a measurement of your specific stove.'],
            ['Days remaining', 'cylinder weight (kg) ÷ (burner-hours/day × 0.25 kg/hour).'],
            ['Daily and monthly cost', 'your cylinder price ÷ days remaining, then × 30 for the monthly figure.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-fuel" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reference" className="mb-10">
        <h2 id="reference" className="font-display mb-2 text-2xl font-semibold">
          How long each cylinder size lasts
        </h2>
        <p className="mb-4 text-sm text-ash/60">
          Days remaining at the 0.25 kg/hour assumption above — swap in your
          own burner-hours in the calculator for your real figure.
        </p>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline bg-paper">
                <th className="p-3 text-left font-semibold text-ink-navy">
                  Cylinder size
                </th>
                {BURNER_HOURS.map((hrs) => (
                  <th key={hrs} className="p-3 text-right font-semibold text-ink-navy">
                    {hrs} hr/day
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {referenceTable.map((row) => (
                <tr key={row.kg}>
                  <td className="p-3 text-ash/80">{row.kg} kg</td>
                  {row.days.map((d, i) => (
                    <td key={i} className="p-3 text-right tabular-nums text-ash/80">
                      {d} days
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ash/60">
          5 kg (the small &quot;FTL&quot;/composite cylinder) suits a single
          person or a backup connection; 14.2 kg is the standard domestic
          cylinder; 19 kg is the commercial size used by restaurants and
          shops, not typically sold for home use.
        </p>
      </section>

      <section aria-labelledby="real-world" className="mb-10">
        <h2 id="real-world" className="font-display mb-4 text-2xl font-semibold">
          Why Your Real Cylinder Life May Differ From the Estimate
        </h2>
        <p className="text-ash/80">
          The 0.25 kg/hour assumption is a reasonable planning average, but
          four everyday factors push real consumption above or below it:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Flame quality and burner condition', 'a clogged or poorly maintained burner burns yellow/orange instead of a clean blue flame, wasting gas as unburnt fuel and soot rather than converting it fully to heat.'],
            ['Pot size vs. flame size', 'a small vessel on a large burner lets most of the flame escape around the sides instead of heating the pot, so matching cookware size to burner size meaningfully improves real-world efficiency.'],
            ['Flame setting after boiling', 'many dishes only need a low simmer once boiling starts — leaving the flame on high throughout burns noticeably more gas than turning it down once the initial boil is reached.'],
            ['Regulator and pipe leaks', 'a worn regulator or a hairline leak in the rubber tubing wastes gas continuously, independent of actual cooking time — this shows up as a cylinder running out faster than your burner-hours would predict.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-fuel" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: if your cylinder consistently runs out faster than this
          calculator predicts for your burner-hours, check the flame color and
          the regulator/tubing for a leak before assuming your cooking habits
          are the only variable.
        </p>
      </section>

      <section aria-labelledby="stretch-life" className="mb-10">
        <h2 id="stretch-life" className="font-display mb-4 text-2xl font-semibold">
          Practical Ways to Stretch a Cylinder&apos;s Life
        </h2>
        <ul className="mt-3 space-y-2">
          {[
            ['Use a pressure cooker where possible', 'sealed cooking traps heat and steam instead of losing it to the air, cutting the burner-hours needed for dals, rice and similar dishes versus an open pan.'],
            ['Keep a lid on the pot', 'a covered pot retains heat and reaches a boil faster than an uncovered one, directly reducing the active flame time for the same dish.'],
            ['Lower the flame once boiling starts', 'most dishes only need a gentle simmer after the initial boil — a high flame past that point heats the kitchen more than the food.'],
            ['Match vessel size to the burner', 'a flat-bottomed pot that fully covers the flame transfers heat more efficiently than a small vessel on a large burner, where much of the flame escapes around the sides.'],
            ['Get the burner and regulator serviced periodically', 'a clean, properly adjusted burner and a leak-free regulator both directly reduce wasted gas that doesn\'t show up as "cooking" at all.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-fuel" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          Common Mistakes When Estimating Cylinder Life
        </h2>
        <ul className="mt-3 space-y-2">
          {[
            ['Confusing burner-hours with meal count', 'two meals cooked back-to-back on the same burner for 30 minutes each is 1 burner-hour total, not "2 meals worth" of some separate unit — always add up actual flame-on time.'],
            ['Forgetting simultaneous burners', 'running two burners at once for 20 minutes each is 40 minutes of total burner-hours (0.67 burner-hours), not 20 minutes — each active flame counts independently.'],
            ['Assuming every household burns gas at the same rate', 'the 0.25 kg/hour figure is a medium-to-full-flame average — a household that cooks mostly on low flame, or one that runs a large industrial-style burner, will see real usage diverge from this estimate in either direction.'],
            ['Not re-measuring after a stove change', 'switching to a different burner design or a new regulator changes real consumption — treat this calculator\'s output as a planning estimate to revisit, not a fixed number tied to any cylinder.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-fuel" aria-hidden>✓</span>
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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/gas/igl"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              PNG vs LPG comparison
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Have a piped gas connection? Compare real cost against LPG.
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
              Another everyday kitchen running-cost tool.
            </p>
          </Link>
          <Link
            href="/fuel-cost/petrol-diesel-cost-per-km-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🚗</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Petrol/diesel cost per km
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Your vehicle&apos;s real running cost.
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
