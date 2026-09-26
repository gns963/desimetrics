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
  {
    q: 'Are there charges for prepaying a two-wheeler loan early?',
    a: 'RBI bars foreclosure charges on floating-rate loans to individual borrowers, but most two-wheeler loans are fixed-rate, where a prepayment or foreclosure charge (often a percentage of the outstanding balance) can still apply — check your loan agreement rather than assuming it\'s free.',
  },
  {
    q: 'What happens if I default on a two-wheeler loan?',
    a: 'The two-wheeler itself is the collateral, so a sustained default lets the lender repossess and sell it to recover the outstanding amount — a faster, more direct consequence than an unsecured loan default. Even before repossession, missed EMIs damage your credit score and make future borrowing harder.',
  },
  {
    q: 'Does a co-applicant help with a two-wheeler loan?',
    a: 'Yes, particularly for younger or first-time borrowers with a thin credit history — a co-applicant (often a parent) with stable income and an established credit record can improve both approval odds and the rate offered, since the lender underwrites the combined profile.',
  },
  {
    q: 'How much does my credit score affect my two-wheeler loan rate?',
    a: 'A CIBIL score of 750 or above typically gets you a lender\'s best rate tier; scores in the 650-750 range often see a noticeably higher rate, and sub-650 scores may need a co-applicant or a larger down payment to get approved at all.',
  },
  {
    q: 'How does a two-wheeler loan compare to a car loan?',
    a: 'A two-wheeler loan is smaller in principal, shorter in tenure (1-4 years vs. 3-7 years for a car), and typically carries a higher rate since fixed origination costs are spread over a smaller loan — see our Car Loan EMI Calculator if you\'re actually comparing the two vehicle types.',
  },
  {
    q: 'Is dealer financing or a separate bank loan better for a two-wheeler?',
    a: 'Dealer-tied financing is often faster to process (sometimes same-day) since the dealer has an existing arrangement with a lender, but it isn\'t always the cheapest — compare the dealer\'s offered rate and any bundled processing fees against a quote from your own bank or an NBFC before signing.',
  },
  {
    q: 'Does buying a used two-wheeler change the loan terms?',
    a: 'Yes — used two-wheeler loans typically come with a shorter maximum tenure, a lower loan-to-value ratio (a bigger down payment required), and a higher interest rate than a new-vehicle loan, reflecting the same higher-uncertainty pricing logic lenders apply to used cars.',
  },
  {
    q: 'Does this calculator include the processing fee in the EMI shown?',
    a: 'No — the EMI figure here is calculated on the principal amount alone, using the reducing-balance method. Lenders separately charge a processing fee upfront (a flat amount or a small percentage of the loan), which adds to your effective cost of borrowing but doesn\'t change the monthly EMI itself — factor it in separately when comparing offers.',
  },
  {
    q: 'Is the interest rate on a two-wheeler loan fixed or floating?',
    a: 'The large majority of two-wheeler loans in India are fixed-rate for the full tenure, similar to car loans — once you sign, your EMI typically stays the same regardless of how market rates move afterward, which is what makes the figure this calculator shows a reliable number to plan around rather than an estimate that can drift.',
  },
  {
    q: 'Can I get a two-wheeler loan with no credit history at all?',
    a: 'It\'s harder, but not impossible — first-time borrowers with no credit file often need a co-applicant with an established credit history, a larger down payment, or both, since the lender has no independent repayment track record to underwrite against. Building a short credit history first (even a small credit card used responsibly) can improve terms on a future loan application.',
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

        <section aria-labelledby="rate-factors" className="mb-10 scroll-mt-20">
          <h2 id="rate-factors" className="font-display mb-4 text-2xl font-semibold">
            What changes your two-wheeler loan rate
          </h2>
          <p className="text-ash/80">
            Four factors explain most of the rate spread between borrowers financing the same
            amount:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Credit score', 'a 750+ CIBIL score usually unlocks the best available rate; below 650 often means a higher rate or a required co-applicant.'],
              ['New vs used vehicle', 'a new two-wheeler carries a lower rate than a used one, since resale value and remaining life are harder for the lender to price on a used vehicle.'],
              ['Down payment size', 'financing a smaller share of the on-road price generally earns a better rate, since the lender\'s exposure per rupee of collateral is lower.'],
              ['Model segment', 'entry-level commuter models are financed more readily and sometimes at a better rate than premium or performance models, which lenders may treat as higher-risk collateral.'],
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

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How the EMI is calculated
          </h2>
          <p className="text-ash/80">
            This calculator uses the standard reducing-balance method — the same method
            every regulated Indian lender uses for a two-wheeler loan:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Interest is charged only on the outstanding balance', 'not on the original loan amount, so as you pay down principal each month, the rupee interest portion of your EMI shrinks and the principal portion grows — even though the EMI itself stays fixed for the whole tenure.'],
              ['Early EMIs are interest-heavy', 'in the first year of a 3-year loan, a large share of each EMI goes toward interest rather than principal — this flips only in the later months as the outstanding balance shrinks.'],
              ['The EMI formula solves for a fixed monthly payment', 'given the principal, the monthly interest rate (annual rate ÷ 12), and the number of months, such that the loan is exactly paid off — principal and interest — by the final instalment.'],
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
            Because a two-wheeler loan&apos;s tenure is short (typically 1-4 years) compared to a
            car or home loan, the interest-heavy early phase passes faster — a meaningful
            prepayment even a few months in still saves real interest, since less of the
            loan has amortised than it would have on a longer-tenure loan at the same point.
          </p>
        </section>

        <section aria-labelledby="best-practices" className="mb-10 scroll-mt-20">
          <h2 id="best-practices" className="font-display mb-4 text-2xl font-semibold">
            Five two-wheeler loan best practices
          </h2>
          <ul className="mt-3 space-y-3">
            {[
              ['Compare the dealer\'s rate against your own bank or NBFC', 'dealer-tied financing is convenient and fast, but isn\'t automatically the cheapest — a quick quote from your existing bank can reveal a materially lower rate or fee.'],
              ['Put down as large a down payment as you comfortably can', 'financing a smaller share of the on-road price both lowers your EMI and often earns a better rate, since the lender\'s exposure per rupee of collateral is lower.'],
              ['Match the tenure to the vehicle\'s useful life, not just the lowest EMI', 'stretching the tenure lowers the monthly payment but increases total interest paid, and a two-wheeler depreciates quickly — a long tenure risks owing more than the vehicle is worth for a stretch of the loan.'],
              ['Check for prepayment or foreclosure charges before signing', 'most two-wheeler loans are fixed-rate, where RBI\'s ban on foreclosure charges (which only covers floating-rate loans) doesn\'t apply — confirm the actual charge in your loan agreement.'],
              ['Factor the processing fee into your real cost comparison', 'a lender advertising a lower rate but a higher processing fee can end up costing more than one with a marginally higher rate and a lower fee — compare the all-in cost, not the headline rate alone.'],
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

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Related calculators
          </h2>
          <p className="text-ash/80">
            Buying a car instead? See our{' '}
            <Link href="/financial/car-loan-emi-calculator" className="text-brass underline">
              Car Loan EMI Calculator
            </Link>
            . Comparing this against a personal loan for the same purchase? Check our{' '}
            <Link href="/financial/personal-loan-emi-calculator" className="text-brass underline">
              Personal Loan EMI Calculator
            </Link>
            . Weighing running costs — petrol vs an EV two-wheeler — over the ownership period?
            See our{' '}
            <Link href="/financial/ev-vs-fuel-cost-calculator" className="text-brass underline">
              EV vs Fuel Cost Calculator
            </Link>
            , and once you own the vehicle, our{' '}
            <Link href="/financial/ncb-idv-calculator" className="text-brass underline">
              NCB/IDV Calculator
            </Link>{' '}
            helps you check your insurance renewal quote.
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
