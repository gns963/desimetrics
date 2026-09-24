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
  {
    q: 'Does an education loan need collateral?',
    a: 'It depends on the loan amount: many lenders offer education loans up to a threshold (commonly cited around ₹7.5-10 lakh, though this varies by lender and scheme) without collateral, relying instead on a co-applicant\'s income and a third-party guarantee. Above that threshold, lenders typically require collateral — property, fixed deposits, or other security — check your specific lender\'s policy rather than assuming either way.',
  },
  {
    q: 'What happens if I don\'t pay the moratorium-period interest as it accrues?',
    a: 'If simple interest is accruing during your moratorium (course period plus the grace period) and you don\'t pay it as it\'s billed, most lenders capitalise it — adding the accrued interest to your principal once repayment begins, so your EMI is calculated on a larger amount than you actually borrowed. Paying the moratorium interest as it accrues, if you can, avoids this compounding effect.',
  },
  {
    q: 'Is there a government interest subsidy for education loans?',
    a: 'Yes — the Central Sector Interest Subsidy (CSIS) scheme subsidises the moratorium-period interest for economically weaker students pursuing approved professional/technical courses in India, subject to an income-eligibility ceiling and lender participation in the scheme. It doesn\'t apply universally to every borrower or every loan, so check current eligibility with your lender or the scheme\'s official portal rather than assuming it applies.',
  },
  {
    q: 'What happens to the loan if the student discontinues the course?',
    a: 'Discontinuing a course partway through can trigger an earlier repayment obligation than originally planned, since the moratorium period is generally tied to the expected course duration plus a grace window — the exact consequence depends on the lender\'s specific terms, so this is worth clarifying with the lender directly if a course change or discontinuation becomes a real possibility.',
  },
  {
    q: 'How does an education loan compare to a car or two-wheeler loan?',
    a: 'An education loan typically runs much longer (10-15 years, sometimes more) than a car loan (3-7 years) or two-wheeler loan (1-4 years), reflects a moratorium period neither vehicle loan has, and — up to a threshold — can be unsecured where vehicle loans are always secured by the vehicle itself. See our Car Loan EMI Calculator and Two-Wheeler Loan EMI Calculator for those shorter-tenure, asset-backed cases.',
  },
  {
    q: 'Should I use a bank or an NBFC for an education loan, especially for studying abroad?',
    a: 'Banks generally offer lower rates and the CSIS subsidy where applicable, but can be slower and stricter on collateral for large foreign-education amounts. NBFCs and specialised education-loan lenders often move faster and are more flexible on collateral for study-abroad loans, typically at a higher rate — compare the total cost, not just the headline rate, before choosing.',
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

        <section aria-labelledby="scenarios" className="mb-10 scroll-mt-20">
          <h2 id="scenarios" className="font-display mb-4 text-2xl font-semibold">
            EMI across three common loan sizes
          </h2>
          <p className="text-ash/80">
            Education loans span a wide range — a domestic professional course, a domestic
            postgraduate degree, and a foreign master&apos;s program typically land in three quite
            different brackets:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Scenario</th>
                  <th className="px-4 py-2 font-semibold">Loan / rate / tenure</th>
                  <th className="px-4 py-2 font-semibold">Monthly EMI</th>
                  <th className="px-4 py-2 font-semibold">Total interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Domestic professional course</td>
                  <td className="px-4 py-2">{formatINR(1000000)} @ 9.5% / 7 yrs</td>
                  <td className="px-4 py-2 tabular-nums">{formatINR(16344)}</td>
                  <td className="px-4 py-2 tabular-nums">{formatINR(372894)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Domestic postgraduate degree</td>
                  <td className="px-4 py-2">{formatINR(2000000)} @ 9.5% / 10 yrs</td>
                  <td className="px-4 py-2 tabular-nums">{formatINR(25880)}</td>
                  <td className="px-4 py-2 tabular-nums">{formatINR(1105541)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Foreign master&apos;s program</td>
                  <td className="px-4 py-2">{formatINR(4000000)} @ 10% / 15 yrs</td>
                  <td className="px-4 py-2 tabular-nums">{formatINR(42984)}</td>
                  <td className="px-4 py-2 tabular-nums">{formatINR(3737157)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ash/50">
            Illustrative figures once repayment begins, after any moratorium — use the calculator above with your own loan amount, rate and tenure.
          </p>
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
