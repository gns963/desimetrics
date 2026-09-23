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
const PATH = '/financial/car-loan-emi-calculator'

const example = calculateEmi(800000, 9, 7)

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator 2026 — Monthly EMI & Total Interest (India)',
  description:
    'Free car loan EMI calculator for India. Find your monthly EMI, total interest and total repayment for a new or used car loan.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What interest rate should I expect on a car loan?',
    a: 'New-car loans typically carry lower rates than used-car loans, since the vehicle depreciates less predictably once it has a prior owner — lenders price used-car loans higher to account for that added risk. Your specific rate also depends on your credit score, income, the lender, and whether you\'re financing through the dealer or your own bank.',
  },
  {
    q: 'What loan-to-value (LTV) ratio can I typically get on a car loan?',
    a: 'Most lenders finance 80-90% of the on-road price for a new car, requiring the rest as a down payment — very few offer 100% financing, and doing so (where available) usually comes with a higher interest rate to offset the lender\'s added risk.',
  },
  {
    q: 'Should I choose a longer tenure for a lower EMI?',
    a: 'A longer tenure lowers your monthly EMI but increases the total interest you pay over the life of the loan, and cars depreciate quickly — a long loan tenure risks you owing more than the car is worth for a stretch of the loan. Balance affordability today against total cost and the risk of being "upside down" on the loan.',
  },
  {
    q: 'Does this calculator include the processing fee?',
    a: 'No — this shows the EMI on the principal amount alone. Lenders typically charge a processing fee (often 0.5-2% of the loan amount) upfront, which adds to your effective cost but doesn\'t change the EMI figure itself. Factor it in separately when comparing lenders.',
  },
  {
    q: 'Is a car loan tax-deductible like a home loan?',
    a: 'No, for personal use — car loan interest gets no income-tax deduction the way home loan interest does under Section 24(b). The only exception is if the vehicle is used for business/professional purposes, where the interest may be claimed as a business expense — a different context from a personal-use car loan.',
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
  name: 'Car Loan EMI Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Car Loan EMI Calculator', path: PATH },
])

export default function CarLoanEmiCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Car Loan EMI Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🚙</span> Financial hub
          </>
        }
        h1="Car Loan EMI Calculator"
        subtitle="Find your monthly EMI, total interest and total repayment for a new or used car loan."
        stats={[
          { icon: '🚙', big: '80-90%', small: 'typical LTV financed', tone: 'hub' },
          { icon: '📆', big: '3-7 yrs', small: 'common tenure range', tone: 'hub' },
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
            An {formatINR(800000)} car loan at 9% for 7 years works out to an EMI of about{' '}
            <strong>{formatINR(example.emi)}/month</strong>, with total interest of{' '}
            {formatINR(example.totalInterest)} over the loan&apos;s life.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your car loan EMI
          </h2>
          <SimpleLoanEmiCalculator
            icon="🚙"
            title="Car Loan EMI Calculator"
            subtitle="Find your monthly EMI for a new or used car loan"
            amountLabel="Loan amount (₹)"
            defaultAmount={800000}
            amountStep={10000}
            defaultRate={9}
            rateMin={7}
            rateMax={16}
            defaultYears={7}
            yearsMin={1}
            yearsMax={8}
            disclaimer="Results are estimates. Actual rate and eligibility depend on the lender, vehicle and your credit profile — this is not a loan offer."
          />
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Related calculators
          </h2>
          <p className="text-ash/80">
            Buying a two-wheeler instead? See our{' '}
            <Link href="/financial/two-wheeler-loan-emi-calculator" className="text-brass underline">
              Two-Wheeler Loan EMI Calculator
            </Link>
            . Comparing this against a personal loan or checking the true cost after processing
            fees? See our{' '}
            <Link href="/financial/personal-loan-emi-calculator" className="text-brass underline">
              Personal Loan EMI Calculator
            </Link>
            .
          </p>
        </section>

        <FinancialCrossSell current="car-loan-emi-calculator" />

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
