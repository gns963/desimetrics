import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import EpfCalculator from '@/components/calculators/EpfCalculator'
import { calculateEpf } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/epf-calculator'

const example = calculateEpf(20000, 30, 58, 500000, 8.25, 5)

export const metadata: Metadata = {
  title: 'EPF Calculator 2026 — Employees Provident Fund Corpus (India)',
  description:
    'Free EPF calculator for India. Project your Employees\' Provident Fund corpus at retirement, with the correct employee/employer/EPS contribution split.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is my EPF contribution split between EPF and EPS?',
    a: 'You contribute 12% of your basic+DA entirely to EPF. Your employer also contributes 12%, but it\'s split: up to 8.33% of your basic (capped at the ₹15,000/month wage ceiling, so at most ₹1,250/month) goes to the Employees\' Pension Scheme (EPS-95), and the remainder of the employer\'s 12% goes to your EPF account alongside your own contribution.',
  },
  {
    q: 'Why is my EPS contribution capped even if my basic salary is much higher than ₹15,000?',
    a: 'The EPS wage ceiling of ₹15,000/month is a statutory cap — EPS contributions are calculated as 8.33% of the LOWER of your actual basic or ₹15,000, regardless of how much higher your real basic salary is. This means most salaried employees above entry-level pay have a flat ₹1,250/month EPS contribution, with the rest of the employer\'s 12% going to EPF instead.',
  },
  {
    q: 'How is EPF interest actually calculated and credited?',
    a: 'Interest is computed monthly on your running balance (opening balance plus that month\'s contributions), but credited to your account only once a year, at the government-notified rate for that financial year. This calculator simulates that exact monthly-computation, annual-crediting method rather than a simpler monthly-compounding approximation.',
  },
  {
    q: 'Is EPF withdrawal taxable?',
    a: 'Withdrawals after 5 years of continuous service are tax-free. Withdrawing before completing 5 years makes the withdrawal taxable (the employer\'s contribution and interest on it become taxable as salary/income from other sources, and your own contribution\'s tax benefit under 80C in earlier years gets reversed) — this calculator projects the corpus but doesn\'t model early-withdrawal tax consequences.',
  },
  {
    q: 'What happens to my EPF when I change jobs?',
    a: 'You should transfer your EPF balance to your new employer\'s EPF account (via the UAN portal) rather than withdrawing it — this preserves your continuous-service clock for tax-free withdrawal eligibility and keeps your retirement savings compounding uninterrupted.',
  },
  {
    q: 'How does EPF compare to NPS for retirement savings?',
    a: 'EPF is a fixed-return, government-set-rate scheme with mandatory employer matching and a straightforward exit; NPS is market-linked (equity+debt mix you choose), offers a higher potential return with more risk, and has a mandatory partial annuitisation at exit. Many salaried employees have both — EPF as the stable base, NPS as an additional 80CCD(1B) tax-advantaged, market-linked layer. See our NPS Calculator to compare.',
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
  name: 'EPF Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'EPF Calculator', path: PATH },
])

export default function EpfCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'EPF Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏢</span> Financial hub
          </>
        }
        h1="EPF Calculator"
        subtitle="Project your Employees' Provident Fund corpus at retirement, with the correct employee/employer/EPS contribution split and the ₹15,000 pension wage-ceiling."
        stats={[
          { icon: '➗', big: '12% + 12%', small: 'employee + employer', tone: 'hub' },
          { icon: '🎯', big: '₹15,000', small: 'EPS wage ceiling', tone: 'hub' },
          { icon: '📈', big: '8.25%', small: 'current EPF rate', tone: 'hub' },
          { icon: '🔓', big: '5 years', small: 'for tax-free withdrawal', tone: 'hub' },
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
            Starting with a {formatINR(20000)}/month basic salary at age 30, a{' '}
            {formatINR(500000)} existing balance, an 8.25% interest rate and a 5% annual
            increment, an employee retiring at 58 builds an EPF corpus of about{' '}
            <strong>{formatINR(example.corpus)}</strong>.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your EPF corpus
          </h2>
          <EpfCalculator />
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Also saving via PPF or NPS?
          </h2>
          <p className="text-ash/80">
            EPF is usually the base layer of a salaried employee&apos;s retirement savings. See our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            for a fully tax-free (EEE) voluntary option with a 15-year lock-in, or our{' '}
            <Link href="/financial/nps-calculator" className="text-brass underline">
              NPS Calculator
            </Link>{' '}
            for the market-linked, additional-₹50,000-deduction option.
          </p>
        </section>

        <FinancialCrossSell current="epf-calculator" />

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
            This tool provides estimates for illustration only and is not investment or tax advice. EPF interest is reviewed annually and not guaranteed.
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
