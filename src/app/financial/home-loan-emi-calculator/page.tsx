import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import EmiCalculator from '@/components/calculators/EmiCalculator'
import { calculateEmi } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/home-loan-emi-calculator'

const example = calculateEmi(5000000, 8.5, 20)
const example15 = calculateEmi(5000000, 8.5, 15)

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator 2026 — Monthly Instalment & Interest',
  description:
    'Free home loan EMI calculator for India. Enter loan amount, interest rate and tenure to see your monthly EMI, total interest and a year-by-year principal-vs-interest breakdown.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is home loan EMI calculated?',
    a: 'Lenders use the reducing-balance formula E = P × r × (1+r)^n / ((1+r)^n − 1), where P is your loan amount, r is the monthly interest rate (annual rate ÷ 12) and n is the number of monthly instalments. Because the formula compounds monthly on the outstanding balance, the amount is fixed for the full tenure even though the split between principal and interest shifts every month.',
  },
  {
    q: 'Why does my EMI stay the same but the interest-vs-principal split change every month?',
    a: 'In the early years, most of your EMI goes toward interest because the outstanding principal is still high — interest is charged on whatever balance remains. As you pay down the principal, the interest portion shrinks and more of each fixed EMI starts going toward principal. On a 20-year loan, it typically takes 8-10 years before the principal component overtakes the interest component in your EMI.',
  },
  {
    q: 'Should I choose a 15-year or a 20-year home loan?',
    a: 'A 15-year tenure means a higher EMI but meaningfully less total interest paid — on this page\'s ₹50 lakh/8.5% example, 15 years costs about ' +
      formatINR(example15.totalInterest) +
      ' in interest versus ' +
      formatINR(example.totalInterest) +
      ' over 20 years, a difference of roughly ' +
      formatINR(example.totalInterest - example15.totalInterest) +
      '. Choose the shorter tenure if the higher EMI comfortably fits your monthly budget; choose longer if you\'d rather keep monthly outgo lower and invest the difference elsewhere, or if cash flow is tight in the early years of a new home purchase.',
  },
  {
    q: 'How much down payment do I need for a home loan?',
    a: 'RBI\'s Loan-to-Value (LTV) rules cap most home loans at 75-90% of the property value depending on the loan size (up to ₹30 lakh: up to 90% LTV; ₹30 lakh-₹75 lakh: up to 80%; above ₹75 lakh: up to 75%) — so you typically need a down payment of 10-25% of the property value from your own funds, plus registration and stamp duty costs which lenders don\'t finance.',
  },
  {
    q: 'What tax benefits does a home loan offer?',
    a: 'Two separate deductions, both under the old tax regime only: Section 24(b) allows up to ₹2,00,000/year deduction on the interest paid for a self-occupied property, and Section 80C allows up to ₹1,50,000/year on principal repayment (within the overall 80C limit shared with PPF, ELSS and other instruments). First-time buyers may also check Section 80EEA for additional interest deduction on affordable-housing loans, subject to eligibility conditions. The new tax regime does not allow either deduction — see our new-vs-old tax regime comparison to check which regime actually saves you more overall.',
  },
  {
    q: 'Is it worth prepaying my home loan?',
    a: 'Usually yes, especially early in the tenure when the interest component of your EMI is highest — prepaying reduces the outstanding principal on which future interest is calculated, so it saves the most when done early rather than in the final years. RBI rules require banks not to charge foreclosure/prepayment penalties on floating-rate home loans to individual borrowers, so there\'s typically no cost to weigh against the interest saved.',
  },
  {
    q: 'What is the difference between a fixed and a floating interest rate?',
    a: 'A fixed rate stays constant for the loan tenure (or a fixed period), so your EMI never changes regardless of what happens to market rates — but fixed rates are usually priced higher than floating rates at the outset. A floating rate moves with the lender\'s benchmark (most home loans are now linked to the RBI repo rate via the External Benchmark Lending Rate, EBLR), so your EMI or tenure can change when the RBI changes rates. Most Indian home loans are floating-rate.',
  },
  {
    q: 'Does this calculator account for processing fees or insurance?',
    a: 'No — this is a pure EMI calculation on the loan principal, rate and tenure you enter. Lenders typically charge a one-time processing fee (often 0.5-1% of the loan amount) and may bundle in loan-cover insurance premiums, both of which add to your actual upfront and effective cost but aren\'t part of the EMI formula itself. Check your loan sanction letter for these separately.',
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
  name: 'Home Loan EMI Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Home Loan EMI Calculator', path: PATH },
])

export default function HomeLoanEmiCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Home Loan EMI Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏠</span> Financial hub
          </>
        }
        h1="Home Loan EMI Calculator"
        subtitle="Work out your monthly home loan instalment, total interest and a year-by-year breakdown of how much of each EMI goes toward principal versus interest. Enter your loan amount, interest rate and tenure — no login, no data stored."
        stats={[
          { icon: '🏦', big: 'Reducing balance', small: 'Standard EMI method', tone: 'hub' },
          { icon: '📅', big: '5–30 yrs', small: 'Typical tenure range', tone: 'hub' },
          { icon: '📉', big: 'RBI-linked', small: 'Most rates are floating', tone: 'hub' },
          { icon: '📊', big: 'Year-by-year', small: 'Principal vs interest', tone: 'hub' },
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
            A <strong>{formatINR(5000000)}</strong> home loan at <strong>8.5%</strong> for{' '}
            <strong>20 years</strong> works out to an EMI of{' '}
            <strong>{formatINR(example.emi)}/month</strong>. Over the full tenure you&apos;ll
            pay <strong>{formatINR(example.totalInterest)}</strong> in interest — more than the
            principal itself — for a total repayment of {formatINR(example.totalPayment)}.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your home loan EMI
          </h2>
          <EmiCalculator
            texts={{
              title: 'Home Loan EMI Calculator',
              subtitle: 'Estimate your monthly instalment',
              amountLabel: 'Loan amount (₹)',
              rateLabel: 'Interest rate (annual)',
              rateUnit: '%',
              tenureLabel: 'Loan tenure',
              tenureUnit: 'yrs',
              ctaLabel: 'Calculate Home Loan EMI',
              disclaimer: 'Results are approximate estimates. Your actual EMI may vary by lender.',
              emiLabel: 'Monthly EMI',
              principalLabel: 'Principal',
              interestLabel: 'Total interest',
              totalLabel: 'Total payment',
              yearTooltipTemplate: 'Year {year}: {amount} paid',
              principalLegend: 'Principal',
              interestLegend: 'Interest',
            }}
            defaultAmount={5000000}
            defaultRate={8.5}
            defaultYears={20}
            amountStep={100000}
            rateRange={[7, 14]}
            yearsRange={[5, 30]}
          />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How home loan EMI is calculated
          </h2>
          <p className="text-ash/80">
            Every EMI-based loan in India uses the same reducing-balance
            formula — the EMI amount is fixed, but the split between
            principal and interest shifts every month as the outstanding
            balance shrinks:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Variable</th>
                  <th className="px-4 py-2 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">P</td>
                  <td className="px-4 py-2">The loan amount (principal) sanctioned</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">r</td>
                  <td className="px-4 py-2">Monthly interest rate (annual rate ÷ 12)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">n</td>
                  <td className="px-4 py-2">Total number of monthly instalments (tenure in years × 12)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">E</td>
                  <td className="px-4 py-2">EMI — what the calculator solves for</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-ash/80">
            A few things that shape what you actually pay, beyond the raw
            formula:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Fixed vs floating rate', 'most Indian home loans are floating, linked to the RBI repo rate via the External Benchmark Lending Rate (EBLR) — when the RBI changes the repo rate, your bank usually passes it through to your EMI or tenure within a quarter.'],
              ['Loan-to-Value (LTV) limits', 'RBI caps how much of the property value a bank can finance (up to 90% for loans under ₹30 lakh, tapering to 75% for loans above ₹75 lakh) — the rest is your down payment, on top of registration and stamp duty costs the loan doesn\'t cover.'],
              ['Tenure vs EMI trade-off', 'a longer tenure lowers your monthly EMI but increases total interest paid over the life of the loan, since more months means more compounding on the outstanding balance — see the FAQ below for a concrete 15-vs-20-year comparison.'],
              ['Prepayment', 'any extra payment toward principal (beyond the scheduled EMI) reduces the base on which future interest is calculated — RBI prohibits foreclosure charges on floating-rate home loans to individuals, so prepaying earlier in the tenure (when the interest share of your EMI is highest) saves the most.'],
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
            This borrower-friendly no-foreclosure-charge rule is one of the
            clearest advantages a secured home loan has over an unsecured{' '}
            <Link href="/financial/personal-loan-emi-calculator" className="text-brass underline">
              personal loan
            </Link>
            , where prepayment penalties commonly still apply.
          </p>
        </section>

        <section aria-labelledby="tax-benefits" className="mb-10 scroll-mt-20">
          <h2 id="tax-benefits" className="font-display mb-4 text-2xl font-semibold">
            Tax benefits on a home loan
          </h2>
          <p className="text-ash/80">
            Home loan repayment carries two separate deductions, both
            available only under the <strong>old tax regime</strong>:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Section 24(b)', 'up to ₹2,00,000/year deduction on interest paid, for a self-occupied property.'],
              ['Section 80C', 'up to ₹1,50,000/year on principal repayment — shared with other 80C instruments like PPF, ELSS and life insurance premiums, not an additional standalone limit.'],
              ['Section 80EEA', 'an additional interest deduction for eligible first-time affordable-housing buyers, subject to property value and loan sanction date conditions — check current eligibility before assuming it applies.'],
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
            Since the new tax regime doesn&apos;t allow either deduction, a
            large home loan is one of the more common reasons the old
            regime still wins for some taxpayers — run your numbers on our{' '}
            <Link href="/financial/new-vs-old-tax-regime-calculator" className="text-brass underline">
              New vs Old Tax Regime Calculator
            </Link>{' '}
            before assuming the new regime is automatically better.
          </p>
        </section>

        <FinancialCrossSell current="home-loan-emi-calculator" />

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
            This tool provides estimates for illustration only. Actual EMI, interest rate and eligibility depend on the lender, your credit profile and current RBI/bank policy — this is not a loan offer or financial advice.
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
