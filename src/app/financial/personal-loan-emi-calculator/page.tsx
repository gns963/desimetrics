import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import PersonalLoanEmiCalculator from '@/components/calculators/PersonalLoanEmiCalculator'
import { calculateEmi, calculateLoanTrueCost } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/personal-loan-emi-calculator'

const example = calculateEmi(500000, 14, 5)
const example3y = calculateEmi(500000, 14, 3)
const exampleTrueCost = calculateLoanTrueCost({ principal: 500000, annualRatePercent: 14, years: 5, processingFeePercent: 2 })

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator 2026 — EMI, Fees & Effective APR',
  description:
    'Free personal loan EMI calculator for India. See your EMI, but also the true cost with processing fee and GST, the effective APR to compare lenders honestly, and the net amount you actually receive.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is personal loan EMI calculated?',
    a: 'The same reducing-balance formula used for every EMI loan: E = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate and n is the number of months. Personal loan rates run considerably higher than secured loans like home or car loans (commonly 10-24% versus 7-14%) because the lender has no collateral to fall back on if you default.',
  },
  {
    q: 'Why is my personal loan interest rate so much higher than a home loan?',
    a: 'A personal loan is unsecured — you don\'t pledge your house, car or gold as collateral, so the lender takes on more risk and prices it in with a higher rate. Your actual rate depends heavily on your credit score, income stability and existing debt: a CIBIL score above 750 typically unlocks the lowest rates a lender offers, while a lower score can mean a materially higher rate or rejection.',
  },
  {
    q: 'Should I take a shorter or longer tenure for a personal loan?',
    a: 'Shorter is almost always better for total cost if the EMI fits your budget — on this page\'s ₹5 lakh/14% example, a 3-year tenure costs about ' +
      formatINR(example3y.totalInterest) +
      ' in interest versus ' +
      formatINR(example.totalInterest) +
      ' over 5 years, a difference of roughly ' +
      formatINR(example.totalInterest - example3y.totalInterest) +
      '. Personal loans already carry high rates, so stretching the tenure to lower your EMI compounds a large amount of extra interest — only extend tenure if the shorter-tenure EMI genuinely doesn\'t fit your monthly budget.',
  },
  {
    q: 'Does prepaying a personal loan early save money like it does on a home loan?',
    a: 'The interest math works the same way — prepaying reduces the balance future interest is calculated on. But the rules around penalties differ: RBI\'s ban on foreclosure charges applies specifically to floating-rate loans to individuals, and most personal loans are fixed-rate, so lenders commonly charge a prepayment penalty (often 2-5% of the outstanding principal) on personal loans. Check your loan agreement\'s foreclosure clause before assuming prepayment is free.',
  },
  {
    q: 'Is personal loan interest tax-deductible?',
    a: 'Generally no — unlike a home loan, personal loan interest has no dedicated tax section. The one exception is if you can document that loan proceeds were used for a deductible purpose, e.g. home renovation/construction (potentially eligible under Section 24(b), subject to conditions) or a business expense (deductible as a business cost, not a personal deduction). For an ordinary personal loan used for general expenses, wedding costs or a purchase, there is no tax benefit.',
  },
  {
    q: 'Do all lenders calculate personal loan interest on a reducing balance?',
    a: 'Most banks do, but some NBFCs and smaller lenders still quote or calculate on a flat rate, where interest is charged on the original principal for the full tenure regardless of repayment — a "12% flat rate" personal loan can have an effective reducing-balance rate of roughly double that, so always ask a lender to confirm the method and get the reducing-balance-equivalent (APR) figure before comparing offers.',
  },
  {
    q: 'Why is the effective APR shown above higher than the interest rate I entered?',
    a: 'Because the effective APR accounts for the processing fee (and GST on that fee) that most lenders deduct upfront from your loan amount — you repay EMIs calculated on the full sanctioned amount, but only actually receive the smaller net disbursal. The effective APR is the annualised rate that would produce your EMI schedule if it were calculated on that smaller net amount instead, which is why it\'s always at or above the quoted nominal rate whenever a fee applies, and is the fairer number to use when comparing two loan offers with different fee structures.',
  },
  {
    q: 'How quickly can I get a personal loan disbursed?',
    a: 'Personal loans are typically the fastest of any secured or unsecured loan category to process, since there\'s no property valuation or collateral paperwork — many banks and NBFCs offer disbursal within 24-48 hours for pre-approved or digitally-verified applicants, versus weeks for a home loan.',
  },
  {
    q: 'What credit score do I need for a good personal loan rate?',
    a: 'Most lenders reserve their best rates for a CIBIL score of 750 and above. Scores in the 700-750 range typically still qualify but at a somewhat higher rate, while sub-700 scores often mean higher rates, lower approved amounts, or rejection outright — checking and improving your score before applying is one of the few things directly within your control that affects the rate you\'re offered.',
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
  name: 'Personal Loan EMI Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Personal Loan EMI Calculator', path: PATH },
])

export default function PersonalLoanEmiCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Personal Loan EMI Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💳</span> Financial hub
          </>
        }
        h1="Personal Loan EMI Calculator"
        subtitle="See your EMI, but also the true cost with processing fee and GST, the effective APR to compare lenders honestly, and the net amount you actually receive."
        stats={[
          { icon: '🏦', big: 'Reducing balance', small: 'Standard EMI method', tone: 'hub' },
          { icon: '🧾', big: 'Fee + GST', small: 'Processing fee true cost', tone: 'hub' },
          { icon: '📐', big: 'Effective APR', small: 'Compare lenders fairly', tone: 'hub' },
          { icon: '💰', big: 'Net disbursal', small: 'What you actually receive', tone: 'hub' },
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
            A <strong>{formatINR(500000)}</strong> personal loan at <strong>14%</strong> for{' '}
            <strong>5 years</strong> works out to an EMI of{' '}
            <strong>{formatINR(example.emi)}/month</strong>. Over the tenure you&apos;ll pay{' '}
            <strong>{formatINR(example.totalInterest)}</strong> in interest — about{' '}
            {Math.round((example.totalInterest / example.principal) * 100)}% of the amount
            borrowed. With a typical 2% processing fee plus 18% GST on that fee, you&apos;d
            actually receive only <strong>{formatINR(exampleTrueCost.netDisbursal)}</strong> upfront
            — pushing the effective APR to <strong>{exampleTrueCost.effectiveAprPercent}%</strong>,
            higher than the quoted 14%.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your personal loan EMI
          </h2>
          <PersonalLoanEmiCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How personal loan EMI is calculated
          </h2>
          <p className="text-ash/80">
            Personal loans use the same reducing-balance EMI formula as
            every other instalment loan — what makes them different is the
            inputs, not the math:
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
            What actually drives your cost, beyond the formula:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Unsecured pricing', 'no collateral means the lender prices in more risk — rates commonly run 10-24% versus 7-14% for secured loans like home or car loans, so the same borrowed amount costs meaningfully more in interest.'],
              ['Your credit score', 'a CIBIL score above 750 typically gets the lender\'s best rate; lower scores mean higher rates, smaller approved amounts, or rejection — this is usually the single biggest lever on the rate you\'re offered.'],
              ['Flat rate vs reducing balance', 'some NBFCs quote a "flat rate" calculated on the full original principal for the whole tenure — this can carry an effective reducing-balance-equivalent rate roughly double the quoted flat rate, so always ask which method applies.'],
              ['Prepayment penalties', 'unlike floating-rate home loans, most personal loans are fixed-rate and can carry a foreclosure charge (commonly 2-5% of outstanding principal) — check your loan agreement before assuming an early payoff is free.'],
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
            Because personal loans already run at high rates, the tenure
            trade-off is sharper than on a{' '}
            <Link href="/financial/home-loan-emi-calculator" className="text-brass underline">
              home loan
            </Link>
            : stretching a personal loan to lower the EMI compounds a large
            amount of extra interest relative to the amount borrowed. If
            you&apos;re weighing a personal loan against a secured
            alternative — for example, borrowing against gold or a fixed
            deposit instead — compare the total interest cost, not just the
            monthly EMI.
          </p>
        </section>

        <section aria-labelledby="true-cost" className="mb-10 scroll-mt-20">
          <h2 id="true-cost" className="font-display mb-4 text-2xl font-semibold">
            What a personal loan really costs beyond the EMI
          </h2>
          <p className="text-ash/80">
            A personal loan&apos;s quoted interest rate is not its full
            cost — a processing fee, plus GST on that fee, is typically
            deducted upfront from the amount disbursed to you, even though
            your EMI is calculated on the full sanctioned loan amount:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Processing fee', 'usually 1-3% of the loan amount, charged once at disbursal — on a ₹5 lakh loan at 2%, that\'s ₹10,000 before any tax.'],
              ['GST on the fee', 'the processing fee itself attracts 18% GST, adding a further cost on top — ₹1,800 in the example above.'],
              ['Net disbursal', 'the amount that actually lands in your account is the loan amount minus the fee and its GST — you repay EMIs on the full ₹5 lakh, but only received a smaller amount.'],
              ['Effective APR', 'the annualised rate that reflects this true cost — always higher than the quoted rate whenever a fee is involved, and the right number to compare across lenders quoting different fee structures.'],
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
            Two lenders quoting the same headline rate can have meaningfully
            different effective costs once fees differ — always compare the
            effective APR, not just the advertised interest rate, when
            shopping between offers.
          </p>
        </section>

        <FinancialCrossSell current="personal-loan-emi-calculator" />

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
            This tool provides estimates for illustration only. Actual EMI, interest rate and eligibility depend on the lender, your credit profile and current policy — this is not a loan offer or financial advice.
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
