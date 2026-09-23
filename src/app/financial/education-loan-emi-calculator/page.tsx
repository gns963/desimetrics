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
const PATH = '/financial/education-loan-emi-calculator'

const example = calculateEmi(2000000, 9.5, 10)

export const metadata: Metadata = {
  title: 'Education Loan EMI Calculator 2026 — Study Loan EMI (India)',
  description:
    'Free education loan EMI calculator for India. Find your monthly EMI, total interest and total repayment for a study loan, and see the Section 80E tax benefit.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'When do EMIs actually start on an education loan?',
    a: 'Most education loans have a moratorium period — no EMI payments required during the course and typically for 6-12 months after it ends, though simple interest may still accrue during this time depending on the lender. This calculator shows the EMI once repayment actually begins, not the moratorium-period interest accrual.',
  },
  {
    q: 'What tax benefit does an education loan carry?',
    a: 'The ENTIRE interest paid on an education loan is deductible under Section 80E, with no upper rupee cap — available for up to 8 years from when repayment starts (or until the interest is fully paid, whichever is earlier). This is available only under the old tax regime, and only for interest, not principal, and only for the borrower\'s own, spouse\'s or children\'s higher education.',
  },
  {
    q: 'Does the loan need a co-applicant?',
    a: 'Most lenders require a parent or guardian as a co-applicant/co-borrower for education loans, since the student typically has no independent income or credit history at the time of borrowing. The co-applicant is usually jointly liable for the full loan.',
  },
  {
    q: 'Is interest higher for loans to study abroad versus in India?',
    a: 'It varies by lender, but foreign-education loans are often larger in absolute size and may carry a different rate structure (sometimes higher, reflecting currency and country risk, though government-backed schemes and top-tier institution loans sometimes get preferential rates) — check your specific lender\'s policy rather than assuming either direction.',
  },
  {
    q: 'Can I prepay an education loan without penalty?',
    a: 'Most banks allow prepayment of education loans without a penalty once the moratorium period ends, though policies vary — check your specific loan agreement. Prepaying reduces the total interest paid over the loan\'s life, same principle as our Home Loan EMI Calculator\'s prepayment feature.',
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
  name: 'Education Loan EMI Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Education Loan EMI Calculator', path: PATH },
])

export default function EducationLoanEmiCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Education Loan EMI Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🎓</span> Financial hub
          </>
        }
        h1="Education Loan EMI Calculator"
        subtitle="Find your monthly EMI, total interest and total repayment for a study loan — plus the uncapped Section 80E interest deduction it carries."
        stats={[
          { icon: '🎓', big: 'Section 80E', small: 'no cap on interest deduction', tone: 'hub' },
          { icon: '⏸️', big: 'Moratorium', small: 'during course + grace period', tone: 'hub' },
          { icon: '📆', big: '8 years', small: '80E deduction window', tone: 'hub' },
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
            A {formatINR(2000000)} education loan at 9.5% for 10 years works out to an EMI of about{' '}
            <strong>{formatINR(example.emi)}/month</strong> once repayment begins, with total
            interest of {formatINR(example.totalInterest)} — all of it deductible under Section
            80E, with no upper cap.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your education loan EMI
          </h2>
          <SimpleLoanEmiCalculator
            icon="🎓"
            title="Education Loan EMI Calculator"
            subtitle="Find your monthly EMI once repayment begins"
            amountLabel="Loan amount (₹)"
            defaultAmount={2000000}
            amountStep={50000}
            defaultRate={9.5}
            rateMin={7}
            rateMax={15}
            defaultYears={10}
            yearsMin={1}
            yearsMax={15}
            disclaimer="EMI shown is for the repayment phase, after any moratorium — actual rate and moratorium terms depend on the lender."
          />
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Related calculators
          </h2>
          <p className="text-ash/80">
            Also planning tax savings alongside your education loan? See our{' '}
            <Link href="/financial/new-vs-old-tax-regime-calculator" className="text-brass underline">
              New vs Old Tax Regime Calculator
            </Link>{' '}
            — Section 80E is only available under the old regime.
          </p>
        </section>

        <FinancialCrossSell current="education-loan-emi-calculator" />

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
            This tool provides estimates for illustration only and is not tax or loan advice. Actual EMI, moratorium terms and 80E eligibility depend on the lender and your specific circumstances.
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
