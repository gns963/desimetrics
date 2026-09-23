import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import FireCalculator from '@/components/calculators/FireCalculator'
import { calculateFire } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/fire-calculator'

const example = calculateFire(50000, 30, 45, 2000000, 20000, 11, 6, 3.5)

export const metadata: Metadata = {
  title: 'FIRE Calculator 2026 — Financial Independence, Retire Early (India)',
  description:
    'Free FIRE calculator for India. Find the corpus you need for Financial Independence, Retire Early using the safe-withdrawal-rate method, and see if you\'re already on track.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is FIRE, and how is the required corpus calculated?',
    a: 'FIRE (Financial Independence, Retire Early) means building a big enough investment corpus that you can live off withdrawals instead of a salary. This calculator uses the safe-withdrawal-rate (SWR) method: it inflates your current monthly expenses to your target FIRE age, then divides that annual figure by your chosen SWR. A 3.5% SWR implies a corpus of roughly 28.5x your annual expenses — more conservative than the US "4% rule" (25x), which is commonly adjusted downward for India given higher inflation and market volatility.',
  },
  {
    q: 'Why does this calculator use 3.5% instead of the famous 4% rule?',
    a: 'The 4% rule comes from the US Trinity Study, based on US market returns and inflation history. Indian retirement planners commonly use a more conservative 3.5% (sometimes lower) given India\'s historically higher and more variable inflation. Both figures are shown side by side so you can see how much more corpus the more conservative assumption requires — use the slider to test anywhere between 2.5% and 5%.',
  },
  {
    q: 'What does "Coast FIRE" mean?',
    a: 'Coast FIRE is the point at which your existing portfolio, left completely alone to compound at your expected return, would grow to your required corpus by your target FIRE age — without a single additional rupee invested. If the calculator flags you as Coast FIRE, it means your past savings have already done the heavy lifting; anything you invest from here is upside, not a requirement.',
  },
  {
    q: 'What is Barista FIRE, and how do I model it?',
    a: 'Barista FIRE means retiring from your main career but keeping some part-time or freelance income to cover part of your expenses, needing a smaller corpus than full FIRE. Enter your expected post-FIRE monthly income in the optional field — the calculator nets it off your expenses before inflating and dividing by the SWR, so the required corpus shrinks accordingly.',
  },
  {
    q: 'Does this account for lifestyle inflation as I earn more?',
    a: 'No — it projects your CURRENT monthly expenses forward at your assumed inflation rate. If you expect your lifestyle (and spending) to grow faster than inflation as your income rises, you should periodically revisit this calculator with an updated expense figure rather than treating one calculation as fixed for life.',
  },
  {
    q: 'What happens to my corpus after I retire — does this model the drawdown phase?',
    a: 'This calculator answers "how much do I need," using the SWR method\'s standard assumption that withdrawing that percentage annually, adjusted for inflation, is sustainable over a long retirement. It does not separately model your specific retirement duration, sequence-of-returns risk, or medical-cost inflation — for a more granular drawdown-phase model with a real retirement-duration inflation-adjusted PV calculation, see our Inflation-Adjusted Retirement Planner.',
  },
  {
    q: 'Is FIRE realistic in India given typical inflation and returns?',
    a: 'It depends heavily on your income, savings rate and time horizon — someone saving 50%+ of a high income over 15-20 years in equity-heavy investments has historically had a real shot; someone saving 10-15% has a much longer runway. This calculator doesn\'t judge feasibility — it tells you the number and the monthly SIP required to reach it, so you can decide whether your current savings rate gets you there in the timeframe you want.',
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
  name: 'FIRE Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'FIRE Calculator', path: PATH },
])

export default function FireCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'FIRE Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔥</span> Financial hub
          </>
        }
        h1="FIRE Calculator"
        subtitle="Work out the corpus you need for Financial Independence, Retire Early using the safe-withdrawal-rate method — and see if your existing portfolio already has you covered."
        stats={[
          { icon: '📊', big: 'SWR method', small: '3.5% India default', tone: 'hub' },
          { icon: '🛋️', big: 'Coast FIRE', small: 'Are you already there?', tone: 'hub' },
          { icon: '☕', big: 'Barista FIRE', small: 'Model part-time income', tone: 'hub' },
          { icon: '🎯', big: 'Required SIP', small: 'To close any gap', tone: 'hub' },
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
            A 30-year-old spending <strong>{formatINR(50000)}/month</strong> today, targeting FIRE
            at 45, with a {formatINR(2000000)} portfolio and a {formatINR(20000)}/month SIP, needs
            about <strong>{formatINR(example.requiredCorpus)}</strong> at a 3.5% safe withdrawal
            rate ({formatINR(example.requiredCorpusUsRule)} under the US 4% rule) — an additional{' '}
            {formatINR(example.requiredAdditionalMonthlySip)}/month on top of their current SIP to
            get there.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your FIRE number
          </h2>
          <FireCalculator />
        </section>

        <section aria-labelledby="how-it-works" className="mb-10 scroll-mt-20">
          <h2 id="how-it-works" className="font-display mb-4 text-2xl font-semibold">
            How the safe-withdrawal-rate method works
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              ['Inflate today\'s expenses', 'your current monthly spending is projected forward to your FIRE age at your assumed inflation rate — future costs, not today\'s.'],
              ['Divide by your safe withdrawal rate', 'a 3.5% SWR implies you can withdraw 3.5% of your corpus a year, adjusted for inflation, without running out — equivalent to a ~28.5x expense multiple.'],
              ['Check Coast FIRE', 'your existing portfolio alone, compounded to your FIRE age, is compared against the required corpus — if it already clears the bar, further contributions are optional.'],
              ['Solve for the required SIP', 'if there\'s a gap between your projected portfolio and the required corpus, the calculator works out the extra monthly investment needed to close it.'],
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

        <FinancialCrossSell current="fire-calculator" />

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
            This tool is a planning aid, not investment advice. Expected returns, inflation and the safe withdrawal rate you choose are assumptions, not guarantees. Consult a SEBI-registered adviser before making investment decisions.
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
