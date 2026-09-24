import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import RetirementPlannerCalculator from '@/components/calculators/RetirementPlannerCalculator'
import { calculateRetirementPlan } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/retirement-planner'

const example = calculateRetirementPlan(30, 60, 85, 50000, 6, 8, 20, 11, 7, 1000000, 15000)

export const metadata: Metadata = {
  title: 'Inflation-Adjusted Retirement Planner 2026 — India Retirement Corpus',
  description:
    'Free retirement planner for India. Find your required retirement corpus using separate general and medical inflation rates over your actual expected retirement duration.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is this different from a simple 25x or 30x-of-expenses retirement rule?',
    a: 'A flat multiple (like 25x annual expenses) assumes one blended inflation rate and an arbitrary corpus-to-expense ratio. This planner instead projects your actual expected retirement duration (retirement age to life expectancy) as a rising, inflation-adjusted withdrawal stream, discounted at your assumed post-retirement return — and separates medical expenses (which usually inflate faster) from general expenses, so a shorter or longer retirement, or a higher medical burden, changes the answer instead of being averaged away.',
  },
  {
    q: 'Why does medical inflation get its own rate?',
    a: 'Healthcare costs in India have historically risen faster than general consumer inflation, and this gap tends to widen as you age and your medical needs grow. Blending medical costs into general inflation understates the actual purchasing power you\'ll need for healthcare specifically in your later retirement years — separating the two rates and letting you set your own "medical share" percentage of expenses gives a more realistic total.',
  },
  {
    q: 'What is the "3.5%-SWR sanity check" figure?',
    a: 'It applies the same safe-withdrawal-rate method as our FIRE Calculator (future monthly expenses × 12, divided by 3.5%) as a rough cross-check against this planner\'s more detailed present-value calculation. The two methods can differ meaningfully — this planner\'s figure accounts for your ACTUAL retirement duration and the separate inflation rates, while the SWR figure is a simpler flat-multiple approximation.',
  },
  {
    q: 'How does pension or rental income reduce the required corpus?',
    a: 'Any reliable, ongoing post-retirement income (a pension, rental income, part-time consulting) is netted off your future monthly expenses before the corpus calculation — you only need your investment corpus to cover the GAP between your expenses and that other income, not your full living costs.',
  },
  {
    q: 'Does this calculator model sequence-of-returns risk?',
    a: 'No — it uses a single assumed post-retirement return rate applied uniformly across your entire retirement, which is a simplification. In reality, a market downturn in your first few retirement years (while you\'re also withdrawing) can do more damage than the same downturn later, once your corpus is smaller relative to your total retirement horizon — a risk this present-value approach doesn\'t separately capture.',
  },
  {
    q: 'How is this different from the FIRE Calculator?',
    a: 'The FIRE Calculator uses a single flat safe-withdrawal-rate multiplier and is built for people targeting an EARLY retirement, often with a Coast/Barista FIRE angle. This planner is built for a more standard retirement-age scenario, with a genuine present-value calculation over your specific retirement duration, separate medical inflation, and an income-offset field for pension/rental income — more detailed, but requires more inputs.',
  },
  {
    q: 'What is sequence-of-returns risk, and why does it matter more right at retirement?',
    a: 'It\'s the risk that a market downturn hits in your first few retirement years, right when you\'ve also started withdrawing — forcing you to sell a larger SHARE of a shrunken corpus than if the same downturn had hit years later. Two retirees with identical average returns over 25 years can end up with very different outcomes purely based on WHEN the bad years fell relative to when withdrawals began. This planner\'s single assumed return doesn\'t capture that timing risk; some retirees manage it with a "bucket strategy" (keeping 2-3 years of expenses in cash/short-term debt so a market downturn doesn\'t force selling equity at a low point) — a general technique, not a recommendation tailored to your situation.',
  },
  {
    q: 'How often should I update this plan?',
    a: 'Revisit it at least once a year, and whenever something material changes: a significant raise or job change, a new dependant, a large one-time expense or windfall, or a meaningful shift in your actual investment returns versus what you assumed. Retirement planning compounds small early corrections into a much smaller course-correction later than waiting a decade to notice you\'re off track.',
  },
  {
    q: 'What Indian income sources typically supplement a retirement corpus?',
    a: 'The most common are an EPF/EPS pension (see our EPF Calculator for the corpus side; EPS itself pays a modest defined monthly pension separately), an NPS annuity (the compulsory annuitised portion of an NPS exit — see our NPS Calculator), and rental income from owned property. Government employees under the older pension scheme may also have a defined-benefit pension distinct from EPS. Enter any of these you expect as the "pension/rental income" field to see how much they shrink your required corpus.',
  },
  {
    q: 'Why does a higher post-retirement return assumption lower my required corpus?',
    a: 'Because the corpus itself keeps earning a return even while you\'re withdrawing from it every year — a higher assumed post-retirement return means each rupee has to work harder for you today, and less needs to be set aside up front to fund the same withdrawal stream. Be realistic here: many retirees deliberately shift toward a more conservative, debt-heavy allocation after retiring, which caps how high this assumption should reasonably be set.',
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
  name: 'Inflation-Adjusted Retirement Planner',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Retirement Planner', path: PATH },
])

export default function RetirementPlannerPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Retirement Planner', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🌅</span> Financial hub
          </>
        }
        h1="Inflation-Adjusted Retirement Planner"
        subtitle="Find your required retirement corpus using separate general and medical inflation rates, projected over your actual expected retirement duration — not a flat multiple of one year's expenses."
        stats={[
          { icon: '🏥', big: 'Separate rates', small: 'general vs medical inflation', tone: 'hub' },
          { icon: '📆', big: 'Real duration', small: 'not a flat multiplier', tone: 'hub' },
          { icon: '🏠', big: 'Income offset', small: 'pension/rental income', tone: 'hub' },
          { icon: '✅', big: 'SWR check', small: 'cross-referenced', tone: 'hub' },
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
            A 30-year-old retiring at 60 with a life expectancy of 85, spending{' '}
            {formatINR(50000)}/month today (20% of it medical), needs about{' '}
            <strong>{formatINR(example.requiredCorpus)}</strong> at retirement — versus a rougher{' '}
            {formatINR(example.swrSanityCheckCorpus)} from the simpler 3.5%-SWR method. With{' '}
            {formatINR(1000000)} already saved and a {formatINR(15000)}/month SIP, they need an
            additional {formatINR(example.requiredAdditionalMonthlySip)}/month to close the gap.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Plan your retirement corpus
          </h2>
          <RetirementPlannerCalculator />
        </section>

        <section aria-labelledby="how-it-works" className="mb-10 scroll-mt-20">
          <h2 id="how-it-works" className="font-display mb-4 text-2xl font-semibold">
            How this differs from a flat retirement multiple
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              ['Splits expenses into general and medical', 'each inflates at its own rate, since healthcare costs typically rise faster than general consumer prices in India.'],
              ['Uses your actual retirement duration', 'retirement age to life expectancy, not a generic assumption — a longer expected retirement genuinely needs a bigger corpus.'],
              ['Takes a present value, not a flat multiple', 'the rising expense stream during retirement is discounted at your assumed post-retirement return, accounting for the fact that your remaining corpus keeps earning returns even as you withdraw from it.'],
              ['Nets off other income', 'a pension or rental income reduces the gap your investment corpus needs to cover.'],
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
            Targeting an early retirement instead of the standard retirement age? Our{' '}
            <Link href="/financial/fire-calculator" className="text-brass underline">
              FIRE Calculator
            </Link>{' '}
            uses a simpler safe-withdrawal-rate method better suited to that scenario, including a
            Coast FIRE check.
          </p>
        </section>

        <section aria-labelledby="mistakes" className="mb-10 scroll-mt-20">
          <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
            Common retirement-planning mistakes this model helps avoid
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              ['Underestimating medical inflation', 'blending healthcare costs into a single general-inflation figure understates what you\'ll actually need in your later, higher-medical-need years.'],
              ['Using a flat expense multiple', 'a generic "25x annual expenses" rule ignores your specific retirement duration — a 20-year retirement and a 35-year retirement need very different corpuses for the same monthly spend.'],
              ['Setting the plan once and forgetting it', 'a plan built on a 10-year-old salary and cost-of-living assumption drifts further from reality every year it isn\'t revisited.'],
              ['Relying only on EPF as the entire retirement plan', 'EPF is a strong, safe base, but its fixed, government-set return may not outpace inflation by enough on its own — see our EPF Calculator alongside this planner.'],
              ['Ignoring sequence-of-returns risk near retirement', 'a market downturn in the first few withdrawal years does outsized damage compared to the same downturn later — see the FAQ above on bucket strategies.'],
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

        <FinancialCrossSell current="retirement-planner" />

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
            This tool is a planning aid, not investment or financial advice. Expected returns and inflation rates are assumptions, not guarantees. Consult a SEBI-registered adviser before making investment decisions.
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
