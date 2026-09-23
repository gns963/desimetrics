import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import CtcCalculator from '@/components/calculators/CtcCalculator'
import { calculateCtcBreakdown } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/ctc-in-hand-salary-calculator'

const example = calculateCtcBreakdown(1200000, 40, 2400, 'new')

export const metadata: Metadata = {
  title: 'CTC to In-Hand Salary Calculator 2026 — Take-Home Pay (India)',
  description:
    'Free CTC to in-hand salary calculator for India. See what actually lands in your bank account from your offered CTC, after PF, gratuity provision, professional tax and income tax.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'Why is my in-hand salary so much lower than my CTC?',
    a: 'CTC (Cost to Company) includes money that never reaches your bank account as cash: the employer\'s PF contribution and a gratuity provision are both backed out before your gross salary is even calculated, and from that gross salary, your own PF contribution, professional tax and income tax are deducted. A ₹12 lakh CTC routinely becomes ₹9-10 lakh in actual annual take-home once all of this is accounted for.',
  },
  {
    q: 'What is the "gratuity provision" deducted from my CTC?',
    a: 'Many employers include a notional gratuity provision in your CTC structure — an actuarial estimate (commonly 4.81% of basic, derived from the 15/26 gratuity formula spread monthly) of what they\'re setting aside to eventually pay you gratuity under the Payment of Gratuity Act, if you complete 5+ years of service. It\'s part of your CTC on paper but isn\'t cash you receive now.',
  },
  {
    q: 'Why does the basic salary percentage matter so much for take-home pay?',
    a: 'A higher basic percentage means higher PF contributions (both yours and your employer\'s) coming out of the same CTC, which lowers your immediate take-home — but it also means a bigger retirement corpus and (for the old regime) a bigger HRA exemption if you pay rent. A lower basic percentage raises take-home now at the cost of smaller PF/gratuity accumulation. Employers set this ratio, not employees, but it materially changes your month-to-month cash flow.',
  },
  {
    q: 'Does this calculator account for HRA exemption?',
    a: 'No — this tool estimates income tax on your gross salary directly, without modelling the HRA exemption (which needs your actual HRA component, rent paid and city) or other old-regime deductions like 80C. If you\'re on the old regime and pay rent, use our HRA Calculator and Tax Regime Calculator together with this one for a more complete, itemised picture.',
  },
  {
    q: 'Why do I need to enter professional tax manually instead of it being calculated automatically?',
    a: 'Professional tax is levied by STATE governments, not the central government, so the amount (and whether it applies at all) varies significantly by state — most states that levy it cap it around ₹2,400/year, but the exact slabs differ. Rather than guess or hardcode one state\'s figure as if it applied everywhere, this calculator asks for your own state\'s figure directly.',
  },
  {
    q: 'Is the income tax figure here exact, or an estimate?',
    a: 'It\'s a reasonable estimate based on your selected regime\'s standard slabs and rebate, applied to your gross salary after only the standard deduction — it does not account for other deductions (80C, 80D, HRA exemption, home loan interest) you might separately claim under the old regime, which would lower your actual tax below what\'s shown here.',
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
  name: 'CTC to In-Hand Salary Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'CTC to In-Hand Salary Calculator', path: PATH },
])

export default function CtcCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'CTC to In-Hand Salary Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💵</span> Financial hub
          </>
        }
        h1="CTC to In-Hand Salary Calculator"
        subtitle="See what actually lands in your bank account from your offered CTC, after employer PF, gratuity provision, your own PF, professional tax and estimated income tax."
        stats={[
          { icon: '📋', big: 'Full', small: 'CTC breakdown', tone: 'hub' },
          { icon: '🏢', big: 'PF + gratuity', small: 'backed out first', tone: 'hub' },
          { icon: '🧮', big: 'New/Old', small: 'regime tax estimate', tone: 'hub' },
          { icon: '💰', big: 'Monthly', small: 'take-home figure', tone: 'hub' },
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
            A {formatINR(1200000)} CTC with a 40% basic salary, under the new tax regime, works out
            to a gross salary of {formatINR(example.grossSalaryAnnual)} after employer PF and
            gratuity provision — leaving about{' '}
            <strong>{formatINR(example.monthlyInHand)}/month</strong> in hand after PF,
            professional tax and estimated income tax.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your in-hand salary
          </h2>
          <CtcCalculator />
        </section>

        <FinancialCrossSell current="ctc-in-hand-salary-calculator" />

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
            This tool provides estimates for illustration only and is not tax advice. Actual in-hand pay depends on your specific salary structure, employer policies and state professional-tax rules.
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
