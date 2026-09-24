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
  {
    q: 'Is EPF interest always fully tax-free?',
    a: 'No — since Budget 2021, interest on your OWN (employee) EPF and voluntary PF contributions above ₹2,50,000 in a financial year is taxable, with TDS deducted at 10% under Section 194A. That threshold rises to ₹5,00,000 if your employer makes no matching contribution at all. Interest on the employer\'s own contribution is never taxed this way — the rule targets only high voluntary employee contributions, which affects a small minority of very high earners or those making large VPF top-ups, not typical salaried contributors.',
  },
  {
    q: 'What is Voluntary Provident Fund (VPF), and should I use it?',
    a: 'VPF lets you contribute MORE than the mandatory 12% of your basic to the same EPF account, up to 100% of your basic+DA, earning the same EPF interest rate with employer contributions unaffected. It\'s a way to get EPF-like guaranteed returns beyond the mandatory amount — useful for conservative savers with 80C room left, though contributions above the ₹2.5 lakh combined EPF+VPF threshold lose their tax-free interest status as described above.',
  },
  {
    q: 'What happens if my employer doesn\'t deposit my EPF contribution on time or at all?',
    a: 'Your employer is legally required to deposit both the employee and employer share within 15 days of the following month — non-payment is an offence under the EPF & MP Act, 1952, and EPFO can recover dues with penal interest and damages from the employer. If you notice missing contributions on the EPFO member portal, you can file a grievance directly with EPFO (via the EPFiGMS portal), which is a more effective route than approaching the employer alone in a dispute.',
  },
  {
    q: 'Why do EPFO interest credits sometimes appear late?',
    a: 'EPFO announces the year\'s interest rate (via the Central Board of Trustees) but the government notification confirming it, and the subsequent portal-wide crediting, often lags by several months into the NEXT financial year — a well-known administrative delay, not a sign your interest wasn\'t earned. Once credited, it\'s backdated to apply for the full year it was due, so you don\'t lose out on the delay itself.',
  },
  {
    q: 'How do I check my EPF balance and get my UAN?',
    a: 'Your Universal Account Number (UAN) is allotted automatically when your first employer registers you with EPFO, and stays the same across every job for life. Check your balance via the EPFO member e-Sewa portal, the UMANG app, or by giving a missed call/SMS to EPFO\'s registered numbers (available once your UAN is activated and linked to your mobile and Aadhaar).',
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

        <section aria-labelledby="comparison" className="mb-10 scroll-mt-20">
          <h2 id="comparison" className="font-display mb-4 text-2xl font-semibold">
            EPF vs PPF vs NPS at a glance
          </h2>
          <p className="text-ash/80">
            Three government-backed retirement options, each with a different lock-in, return
            profile and tax treatment:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Feature</th>
                  <th className="px-4 py-2 font-semibold">EPF</th>
                  <th className="px-4 py-2 font-semibold">PPF</th>
                  <th className="px-4 py-2 font-semibold">NPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Who can open one</td>
                  <td className="px-4 py-2">Salaried employees only</td>
                  <td className="px-4 py-2">Anyone</td>
                  <td className="px-4 py-2">Anyone, 18-70</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Return type</td>
                  <td className="px-4 py-2">Fixed, govt-set (8.25%)</td>
                  <td className="px-4 py-2">Fixed, govt-set (7.1%)</td>
                  <td className="px-4 py-2">Market-linked</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Employer match</td>
                  <td className="px-4 py-2">Mandatory (12%)</td>
                  <td className="px-4 py-2">None</td>
                  <td className="px-4 py-2">Optional, via 80CCD(2)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Lock-in</td>
                  <td className="px-4 py-2">Until job change/retirement</td>
                  <td className="px-4 py-2">15 years</td>
                  <td className="px-4 py-2">Until age 60</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Exit</td>
                  <td className="px-4 py-2">Full lump sum</td>
                  <td className="px-4 py-2">Full lump sum</td>
                  <td className="px-4 py-2">Partly compulsory annuity</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ash/80">
            See our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            and{' '}
            <Link href="/financial/nps-calculator" className="text-brass underline">
              NPS Calculator
            </Link>{' '}
            to project the other two.
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
