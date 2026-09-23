import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import NetWorthCalculator from '@/components/calculators/NetWorthCalculator'
import { calculateNetWorth } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/net-worth-calculator'

const example = calculateNetWorth(
  {
    cash: 100000, fixedDeposits: 200000, equityAndMutualFunds: 500000,
    epf: 300000, ppf: 200000, nps: 100000, gold: 100000,
    property: 5000000, vehicle: 500000, otherAssets: 0,
  },
  { homeLoan: 2000000, carLoan: 300000, personalLoan: 0, educationLoan: 0, creditCardDue: 20000, otherLiabilities: 0 },
  35, 1500000, 20000,
)

export const metadata: Metadata = {
  title: 'Net Worth Calculator 2026 — Track Your Total Assets & Liabilities (India)',
  description:
    'Free net worth calculator for India. Add up cash, investments, property and retirement accounts, subtract your loans, and see your total and liquid net worth.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is net worth, and why does it matter more than income?',
    a: 'Net worth is everything you own (assets) minus everything you owe (liabilities) — a snapshot of your actual financial position, unlike income, which only measures cash flow. Two people earning the same salary can have wildly different net worths depending on how much they save, invest and borrow; net worth is the number that actually determines your financial security.',
  },
  {
    q: 'Why does "liquid net worth" exclude property, vehicle, EPF, PPF and NPS?',
    a: 'Liquid net worth answers "how much could I actually access quickly in an emergency?" Property and vehicles take time to sell at a fair price; EPF, PPF and NPS are locked in by design until retirement (with limited exceptions). A high total net worth with a negative liquid net worth — common for homeowners with a large mortgage against their only major asset — is a real warning sign worth noticing, not just a technicality.',
  },
  {
    q: 'Where do these age-based net worth benchmarks come from?',
    a: 'The age × income ÷ 10 figure and life-stage multiples (e.g. "by your 40s, aim for 4-6x your annual income") are commonly cited financial-planning rules of thumb, not government statistics or a guarantee — they exist to give you a rough sense of whether you\'re ahead of, at, or behind a typical pace, not a target you must hit exactly.',
  },
  {
    q: 'Is a negative net worth normal?',
    a: 'Yes, especially early in your career or shortly after taking a large loan (education, home) — student loans and fresh mortgages routinely put people in negative net-worth territory for years. What matters more than the number today is the trend: is your net worth improving year over year as you pay down debt and build assets?',
  },
  {
    q: 'Should I include my primary residence at its current market value?',
    a: 'This calculator does, since it\'s asking for your complete financial picture — but keep in mind it\'s illiquid (see the liquid net worth note above) and you\'d need to live somewhere if you sold it, so it isn\'t really "spendable" wealth in the way a mutual fund is. Some planners prefer excluding the primary residence entirely from net-worth tracking for exactly this reason; use the liquid net worth figure if you want that view here.',
  },
  {
    q: 'How is the "time to ₹1 crore" figure calculated?',
    a: 'It projects your current investable assets (cash, FDs, equity/MF, gold, and other assets — excluding EPF/PPF/NPS/property/vehicle) plus your monthly SIP forward at an illustrative 12% annual return, and reports how many months until your net worth crosses ₹1 crore. It\'s a simplified, single-rate projection for orientation, not a market forecast.',
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
  name: 'Net Worth Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Net Worth Calculator', path: PATH },
])

export default function NetWorthCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Net Worth Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💰</span> Financial hub
          </>
        }
        h1="Net Worth Calculator"
        subtitle="Add up your cash, investments, retirement accounts and property, subtract your loans and dues, and see your total and liquid net worth in one place."
        stats={[
          { icon: '➕', big: '10 asset', small: 'categories', tone: 'hub' },
          { icon: '➖', big: '6 liability', small: 'categories', tone: 'hub' },
          { icon: '💧', big: 'Liquid view', small: 'excl. illiquid assets', tone: 'hub' },
          { icon: '🎯', big: '₹1 crore', small: 'time-to-target', tone: 'hub' },
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
            A 35-year-old with {formatINR(7000000)} in total assets (including a{' '}
            {formatINR(5000000)} home) and {formatINR(2320000)} in loans and dues has a net worth
            of <strong>{formatINR(example.netWorth)}</strong> — but a liquid net worth of{' '}
            <strong>{formatINR(example.liquidNetWorth)}</strong> once the home, vehicle and
            retirement-locked accounts are excluded.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your net worth
          </h2>
          <NetWorthCalculator />
        </section>

        <section aria-labelledby="why-track" className="mb-10 scroll-mt-20">
          <h2 id="why-track" className="font-display mb-4 text-2xl font-semibold">
            Why track net worth instead of just income
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              ['It captures savings, not just earnings', 'two people with identical salaries can have very different net worths depending on how much they actually keep and invest versus spend.'],
              ['It flags illiquid-heavy positions', 'a high net worth trapped in property or retirement accounts can still leave you short of cash in an emergency — the liquid net worth figure surfaces this.'],
              ['It shows the trend, not just the snapshot', 'recalculating every few months shows whether you\'re moving in the right direction, which matters more than hitting any single benchmark on any given day.'],
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

        <FinancialCrossSell current="net-worth-calculator" />

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
            This tool is for general guidance only and is not financial advice. Age-based benchmarks are commonly cited rules of thumb, not official statistics or a target you must hit.
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
