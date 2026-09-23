import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import SimpleLoanEmiCalculator from '@/components/calculators/SimpleLoanEmiCalculator'
import { calculateEmi } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/two-wheeler-loan-emi-calculator'

const example = calculateEmi(80000, 11, 3)

export const metadata: Metadata = {
  title: 'Two-Wheeler Loan EMI Calculator 2026 — Bike/Scooter EMI (India)',
  description:
    'Free two-wheeler loan EMI calculator for India. Find your monthly EMI, total interest and total repayment for a bike or scooter loan.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'Why are two-wheeler loan interest rates usually higher than car loan rates?',
    a: 'Two-wheelers are a smaller-ticket, faster-depreciating asset with a shorter typical loan tenure, so lenders often price the rate higher than a car loan\'s to compensate for the smaller loan size and quicker value decline relative to fixed origination costs.',
  },
  {
    q: 'What tenure is typical for a two-wheeler loan?',
    a: 'Most two-wheeler loans run 1-4 years — much shorter than car or home loans, reflecting both the smaller amount financed and the vehicle\'s shorter useful economic life before major resale value decline.',
  },
  {
    q: 'Is it worth taking a loan for a two-wheeler, or should I pay cash?',
    a: 'Given the relatively small ticket size and typically higher interest rate on two-wheeler loans, if you can pay cash without depleting your emergency fund, you avoid interest entirely. A loan makes more sense when it preserves your liquidity for other, higher-priority uses, or when the total interest cost is genuinely small in absolute terms relative to your finances.',
  },
  {
    q: 'How much down payment is usually required?',
    a: 'Many two-wheeler loans finance a high percentage (sometimes close to 90-100%) of the on-road price, especially for entry-level models, since the loan amount itself is relatively small — but the exact down payment required varies by lender, your credit profile, and the specific vehicle.',
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
  name: 'Two-Wheeler Loan EMI Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Two-Wheeler Loan EMI Calculator', path: PATH },
])

export default function TwoWheelerLoanEmiCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Two-Wheeler Loan EMI Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏍️</span> Financial hub
          </>
        }
        h1="Two-Wheeler Loan EMI Calculator"
        subtitle="Find your monthly EMI, total interest and total repayment for a bike or scooter loan."
        stats={[
          { icon: '🏍️', big: '1-4 yrs', small: 'typical tenure', tone: 'hub' },
          { icon: '📈', big: 'Higher rate', small: 'than car loans', tone: 'hub' },
          { icon: '🧮', big: 'Reducing balance', small: 'EMI method', tone: 'hub' },
          { icon: '🆓', big: 'Free', small: 'no login', tone: 'hub' },
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
            An {formatINR(80000)} two-wheeler loan at 11% for 3 years works out to an EMI of about{' '}
            <strong>{formatINR(example.emi)}/month</strong>, with total interest of{' '}
            {formatINR(example.totalInterest)}.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your two-wheeler loan EMI
          </h2>
          <SimpleLoanEmiCalculator
            icon="🏍️"
            title="Two-Wheeler Loan EMI Calculator"
            subtitle="Find your monthly EMI for a bike or scooter loan"
            amountLabel="Loan amount (₹)"
            defaultAmount={80000}
            amountStep={5000}
            defaultRate={11}
            rateMin={8}
            rateMax={20}
            defaultYears={3}
            yearsMin={0.5}
            yearsMax={5}
            disclaimer="Results are estimates. Actual rate and eligibility depend on the lender, vehicle and your credit profile — this is not a loan offer."
          />
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Related calculators
          </h2>
          <p className="text-ash/80">
            Buying a car instead? See our{' '}
            <Link href="/financial/car-loan-emi-calculator" className="text-brass underline">
              Car Loan EMI Calculator
            </Link>
            . Also comparing running costs — petrol vs an EV two-wheeler? Check our{' '}
            <Link href="/financial/ev-vs-fuel-cost-calculator" className="text-brass underline">
              EV vs Fuel Cost Calculator
            </Link>
            .
          </p>
        </section>

        <FinancialCrossSell current="two-wheeler-loan-emi-calculator" />

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
            This tool provides estimates for illustration only. Actual EMI, interest rate and eligibility depend on the lender, vehicle and your credit profile — this is not a loan offer or financial advice.
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
