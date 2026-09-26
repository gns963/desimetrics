import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import CrorepatiCalculator from '@/components/calculators/CrorepatiCalculator'
import { calculateCrorepati } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/crorepati-calculator'

const example = calculateCrorepati(10000000, 15, 12, 6)
const exampleStepUp = calculateCrorepati(10000000, 15, 12, 6, 0, 10)
const tenureComparison = [10, 15, 20, 25].map((years) => ({
  years,
  ...calculateCrorepati(10000000, years, 12, 6),
}))

export const metadata: Metadata = {
  title: 'Crorepati Calculator 2026 — Monthly SIP to Reach ₹1 Crore (India)',
  description:
    'Free Crorepati calculator for India. Find the monthly SIP needed to hit ₹1 crore (or any target corpus) by your goal date, with an optional annual step-up.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is the required monthly SIP calculated?',
    a: 'This is the reverse of a normal SIP calculation: instead of telling you the future value of a fixed monthly investment, it solves backward from your target corpus to find the monthly amount that would grow to that target at your assumed return over your chosen time frame — using the same future-value-of-an-annuity formula our SIP Calculator uses, just solved the other way around.',
  },
  {
    q: 'What is a step-up SIP, and why does it lower the starting amount?',
    a: 'A step-up SIP increases your monthly investment by a fixed percentage every year (often matching expected salary growth), instead of staying flat. Since later contributions compound for less time but are larger, and early contributions are smaller but compound longer, a step-up SIP can reach the same target with a lower STARTING monthly amount than a flat SIP — useful if your income is expected to grow but is tight today.',
  },
  {
    q: 'What does the "inflation-adjusted target" figure mean?',
    a: '₹1 crore today buys much more than ₹1 crore will buy in 15-20 years. This figure shows what your target corpus is worth in TODAY\'s purchasing power, discounted by your assumed inflation rate — a useful reality check on whether your nominal goal is actually enough to fund what you\'re planning it for.',
  },
  {
    q: 'Why does delaying by 5 years increase the required SIP so much?',
    a: 'Compounding is time-driven — the earlier rupees have more years to grow, so removing 5 years from the end of a long SIP disproportionately increases how hard the remaining years have to work. This is a genuine, quantified version of "the best time to start was yesterday, the second best time is today."',
  },
  {
    q: 'Is ₹1 crore actually a meaningful retirement or goal number?',
    a: 'It\'s a popular, round milestone in India but isn\'t inherently meaningful for every goal — a ₹1 crore corpus funds very different outcomes depending on when you need it and what you need it for. Use the target-corpus field to enter your ACTUAL goal amount (a specific retirement corpus, a child\'s education fund, a house down payment) rather than defaulting to ₹1 crore just because it\'s the calculator\'s name.',
  },
  {
    q: 'What\'s the difference between a step-up SIP and a lump-sum top-up strategy?',
    a: 'A step-up SIP raises your fixed MONTHLY contribution by a set percentage every year, automated through your mutual fund folio\'s standing instruction — steady and disciplined, needing no manual action once set up. A lump-sum top-up instead means investing irregular windfalls (a bonus, an increment arrears payment) as one-off additions on top of an unchanged monthly SIP. Step-up suits predictable salary growth; lump-sum top-ups suit irregular extra income — many investors use both together.',
  },
  {
    q: 'Is the eventual ₹1 crore corpus taxed when I withdraw it?',
    a: 'Yes, if it\'s invested in equity mutual funds — long-term capital gains (units held over 12 months) above a ₹1,25,000 exemption per financial year are taxed at 12.5% under current rules. See our SIP Calculator, which shows this same post-tax treatment alongside the nominal and inflation-adjusted figures, and our Capital Gains Tax Calculator for the general mechanism.',
  },
  {
    q: 'Does the required SIP change if I invest in debt funds instead of equity?',
    a: 'The math here is return-agnostic — enter whatever return rate matches your actual asset allocation. Debt funds typically offer a lower, steadier return than equity (so you\'d enter a lower % and get a correspondingly higher required SIP), and debt-fund gains are taxed differently (at your income-tax slab rate, with no long-term concessional rate for funds bought after April 2023) — a materially different profile from the equity assumption in the worked example on this page.',
  },
  {
    q: 'What if I already have a lump sum invested — does that reduce my required SIP?',
    a: 'Yes — enter it in the "existing corpus" field. It grows forward at your assumed return before being netted off your target, so the calculator only asks your SIP to cover the remaining gap rather than the whole target from zero. Someone with a substantial head start needs a much smaller monthly SIP for the same goal than someone starting from nothing.',
  },
  {
    q: 'What return should I enter if my goal is split between equity and debt?',
    a: 'Enter the single blended return that matches your actual allocation, since this calculator solves for one monthly SIP at one assumed rate rather than modelling multiple asset classes at once. A goal split 70:30 between equity (assume 12%) and debt (assume 7%) would use a blended figure around 10.5% — weighted by how much of the eventual corpus each asset class is expected to contribute, not a simple average of the two rates.',
  },
  {
    q: 'How often should I recalculate my required SIP?',
    a: 'At least once a year, and always after a real change — a step-up SIP\'s annual increase is a natural trigger to also re-check whether your target, timeline, or return assumption still hold. Recalculating regularly catches a goal that has drifted (a house budget that grew, a retirement date that moved) long before the shortfall becomes hard to close, rather than discovering it only near the goal date.',
  },
  {
    q: 'Why is my required SIP so much higher than a friend\'s for the same ₹1 crore target?',
    a: 'The three inputs — time to goal, assumed return, and any existing corpus — are highly sensitive, so two people with the same nominal target can need very different monthly amounts. Someone with 20 years left needs a fraction of what someone with 8 years left needs for the identical target, and an existing lump sum can shrink the gap further — compare inputs, not just the final target figure, before assuming either number is wrong.',
  },
  {
    q: 'Should I round my target up to be safe?',
    a: 'A small safety margin (rounding a ₹90 lakh goal to ₹1 crore, say) is a reasonable, simple buffer against underestimating costs or returns falling short. A large arbitrary buffer, though, just inflates the required SIP without a clear reason — better to size the buffer against a specific risk (a likely cost overrun, a conservative return assumption) than to add one purely out of caution.',
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
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Crorepati Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Crorepati Calculator', path: PATH },
])

export default function CrorepatiCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Crorepati Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💎</span> Financial hub
          </>
        }
        h1="Crorepati Calculator"
        subtitle="Find the monthly SIP you need to reach ₹1 crore — or any target amount — by your goal date, with an optional annual step-up to lower where you start."
        stats={[
          { icon: '🎯', big: 'Any target', small: 'not just ₹1 crore', tone: 'hub' },
          { icon: '📈', big: 'Step-up SIP', small: 'lower starting amount', tone: 'hub' },
          { icon: '⏳', big: 'Cost of delay', small: 'starting 5 years later', tone: 'hub' },
          { icon: '💹', big: 'Inflation view', small: "today's purchasing power", tone: 'hub' },
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
            To reach <strong>{formatINR(10000000)}</strong> in 15 years at an assumed 12% return,
            you&apos;d need a flat SIP of <strong>{formatINR(example.requiredMonthlySip)}/month</strong> —
            or start at just {formatINR(exampleStepUp.requiredMonthlySipWithStepUp)}/month with a 10%
            annual step-up. In today&apos;s money (6% inflation), that ₹1 crore is worth about{' '}
            {formatINR(example.inflationAdjustedTargetToday)}.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your required SIP
          </h2>
          <CrorepatiCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How the required monthly SIP is calculated
          </h2>
          <p className="text-ash/80">
            The calculator solves the standard future-value-of-an-annuity formula backward — instead
            of asking what a fixed monthly amount grows into, it fixes the destination (your target
            corpus, by your goal year) and works out the one monthly amount that reaches it at your
            assumed return. Three inputs drive that answer:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Target corpus', 'the amount you actually need — ₹1 crore is the calculator\'s namesake default, but any goal figure (a retirement number from our Retirement Planner or FIRE Calculator, a house down payment, a child\'s education fund) works the same way.'],
              ['Time to goal', 'fewer years left means each remaining month has less time to compound, so the required monthly amount rises — often sharply — the closer your goal date already is.'],
              ['Assumed return', 'a higher assumed return lowers the required SIP for the same target, which is exactly why an unrealistically optimistic return assumption is the most common way people under-save for a real goal.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-ash/80">
            An existing lump sum, if you already have one, is grown forward at the same assumed
            return and netted off the target first — so the calculator only asks your monthly SIP to
            close the remaining gap, not fund the goal from zero.
          </p>
        </section>

        <section aria-labelledby="tenure-comparison" className="mb-10 scroll-mt-20">
          <h2 id="tenure-comparison" className="font-display mb-4 text-2xl font-semibold">
            Same ₹1 crore target, four different tenures
          </h2>
          <p className="text-ash/80">
            Starting earlier doesn&apos;t just give more time — it dramatically lowers the monthly
            amount needed, since compounding does progressively more of the work:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Years to goal</th>
                  <th className="px-4 py-2 font-semibold">Required monthly SIP</th>
                  <th className="px-4 py-2 font-semibold">Total invested</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {tenureComparison.map((row) => (
                  <tr key={row.years}>
                    <td className="px-4 py-2 font-medium">{row.years} years</td>
                    <td className="px-4 py-2 tabular-nums">{formatINR(row.requiredMonthlySip)}/mo</td>
                    <td className="px-4 py-2 tabular-nums">
                      {formatINR(row.requiredMonthlySip * row.years * 12)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ash/80">
            All four rows assume the same 12% return — only the tenure changes, at{' '}
            {formatINR(10000000)}.
          </p>
        </section>

        <section aria-labelledby="reach-faster" className="mb-10 scroll-mt-20">
          <h2 id="reach-faster" className="font-display mb-4 text-2xl font-semibold">
            Four ways to reach your target with a smaller monthly commitment
          </h2>
          <p className="text-ash/80">
            The tenure comparison above shows time as the biggest lever, but four other choices also
            change how much you need to invest each month for the same eventual target:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Start now, even at a smaller amount', 'every year removed from the front of the timeline compounds for longer, so an early start at a modest SIP often beats a larger one begun a few years later — see the tenure table above for how steep that curve gets.'],
              ['Layer in an annual step-up', 'raising your monthly SIP by a fixed percentage each year (matching expected salary growth) lowers the STARTING amount needed versus a flat SIP for the same target, since later, larger instalments pick up more of the load.'],
              ['Set the target in real terms first', 'inflate today\'s goal amount forward using an assumed inflation rate before entering it as your target corpus — sizing a SIP against today\'s cost of a future goal, without adjusting for inflation, is a common way people under-save.'],
              ['Net off tax if the goal is funded from equity', 'if the corpus will be withdrawn from equity mutual funds, remember LTCG tax applies at redemption — treat the ₹1 crore (or your chosen figure) as the amount you want IN HAND, and target a slightly higher gross corpus if the difference matters for your goal.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="common-mistakes" className="mb-10 scroll-mt-20">
          <h2 id="common-mistakes" className="font-display mb-4 text-2xl font-semibold">
            Three mistakes that quietly inflate the required SIP
          </h2>
          <p className="text-ash/80">
            Beyond the four levers above, these are the assumptions most likely to leave you
            investing far more — or far less — than your goal actually needs:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Anchoring the return assumption to a recent bull run', 'a few strong years of equity returns can tempt an unrealistically high input, which understates the required SIP — a conservative 10-12% range for equity protects against a market that reverts to its long-run average.'],
              ['Treating the target as fixed instead of revisiting it', 'a house budget, education cost, or retirement lifestyle can change well before the goal date — recalculating at least yearly catches drift early, while a step-up SIP still has room to absorb a larger adjustment.'],
              ['Ignoring the existing-corpus field entirely', 'someone who already holds savings, an old EPF balance, or a maturing FD often has a real head start that meaningfully lowers the monthly SIP needed — leaving it at zero overstates the true monthly commitment required.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="related-tools" className="mb-10 scroll-mt-20">
          <h2 id="related-tools" className="font-display mb-2 text-2xl font-semibold">
            Already investing a fixed amount instead?
          </h2>
          <p className="text-ash/80">
            This calculator solves for the SIP amount given a target. If you already know how much
            you&apos;re investing each month and want to see what it grows to instead, use our{' '}
            <Link href="/financial/sip-calculator" className="text-brass underline">
              SIP Calculator
            </Link>{' '}
            — it also shows the inflation-adjusted real value and post-tax corpus after LTCG. If
            your target itself is a retirement number rather than a round figure like ₹1 crore, our{' '}
            <Link href="/financial/retirement-planner" className="text-brass underline">
              Retirement Planner
            </Link>{' '}
            and{' '}
            <Link href="/financial/fire-calculator" className="text-brass underline">
              FIRE Calculator
            </Link>{' '}
            help you arrive at that target corpus first, and our{' '}
            <Link href="/financial/net-worth-calculator" className="text-brass underline">
              Net Worth Calculator
            </Link>{' '}
            shows how an existing lump sum — which this calculator can net off your target — fits into your wider finances.
          </p>
        </section>

        <FinancialCrossSell current="crorepati-calculator" />

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
          <p className="mt-4 text-xs text-ash/40">
            SIP returns are market-linked and not guaranteed. This tool is a planning aid, not investment advice — consult a SEBI-registered adviser before making investment decisions.
          </p>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </main>
    </>
  )
}
