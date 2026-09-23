import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import RdCalculator from '@/components/calculators/RdCalculator'
import { calculateRd } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/rd-calculator'

const example = calculateRd(10000, 7, 60, false, true)

export const metadata: Metadata = {
  title: 'Recurring Deposit (RD) Calculator 2026 — RD Maturity Value (India)',
  description:
    'Free recurring deposit (RD) calculator for India. Project your RD maturity value with quarterly compounding, plus estimated TDS on the interest.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is RD interest compounded?',
    a: 'Most Indian banks compound RD interest quarterly — interest is calculated on your running balance (deposits made so far plus interest already credited) and added to your balance once every three months, rather than after every single monthly deposit. This calculator simulates that quarterly-crediting pattern.',
  },
  {
    q: 'How is an RD different from a fixed deposit (FD)?',
    a: 'An FD is a single lump-sum deposit that then earns interest for the full tenure; an RD is built up from equal MONTHLY deposits over the tenure, better suited to building savings from regular income rather than investing a lump sum you already have. See our FD Calculator if you\'re depositing a lump sum instead.',
  },
  {
    q: 'Is RD interest taxable?',
    a: 'Yes — RD interest is fully taxable at your income-tax slab rate, same as FD interest, with TDS deducted by the bank if your total interest from that bank crosses ₹40,000 in a financial year (₹50,000 for senior citizens). TDS is not your final tax liability; you settle the actual amount owed (or claim a refund) when you file your return.',
  },
  {
    q: 'What happens if I miss a monthly RD deposit?',
    a: 'Most banks charge a small penalty for a missed or delayed instalment, and some may not allow the maturity value to be exactly as projected if deposits are irregular. This calculator assumes every deposit is made exactly on schedule.',
  },
  {
    q: 'Can I withdraw an RD before maturity?',
    a: 'Premature withdrawal is usually allowed but typically comes with a penalty (often a reduced interest rate for the period actually held) — check your specific bank\'s premature-withdrawal policy before committing to a long tenure if you might need the funds early.',
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
  name: 'Recurring Deposit Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Recurring Deposit Calculator', path: PATH },
])

export default function RdCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Recurring Deposit Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏦</span> Financial hub
          </>
        }
        h1="Recurring Deposit Calculator"
        subtitle="Project your RD maturity value with quarterly compounding — for building savings from regular monthly income rather than a lump sum."
        stats={[
          { icon: '📅', big: 'Quarterly', small: 'compounding', tone: 'hub' },
          { icon: '👴', big: '+0.5%', small: 'senior citizen bonus', tone: 'hub' },
          { icon: '💰', big: 'Fully taxable', small: 'at your slab rate', tone: 'hub' },
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
            Depositing {formatINR(10000)}/month at 7% for 5 years (60 months) grows to about{' '}
            <strong>{formatINR(example.maturityValue)}</strong> — {formatINR(example.interestEarned)}{' '}
            of that is interest on top of the {formatINR(example.totalDeposited)} actually
            deposited.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your RD maturity value
          </h2>
          <RdCalculator />
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Have a lump sum instead?
          </h2>
          <p className="text-ash/80">
            If you&apos;re investing a single lump sum rather than regular monthly deposits, our{' '}
            <Link href="/financial/fd-calculator" className="text-brass underline">
              FD Calculator
            </Link>{' '}
            models that scenario, including the senior-citizen rate bonus and TDS treatment.
          </p>
        </section>

        <FinancialCrossSell current="rd-calculator" />

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
            This tool provides pre-tax estimates for illustration only. Actual RD rates and crediting conventions vary by bank — this is not investment advice.
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
