import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import SsyCalculator from '@/components/calculators/SsyCalculator'
import { calculateSsy } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/sukanya-samriddhi-calculator'

const example = calculateSsy(150000, 8.2)

export const metadata: Metadata = {
  title: 'Sukanya Samriddhi Yojana Calculator 2026 — SSY Maturity Value (India)',
  description:
    'Free Sukanya Samriddhi Yojana (SSY) calculator for India. Project your girl child\'s SSY maturity value at the current government-notified interest rate.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'Who is eligible to open a Sukanya Samriddhi account?',
    a: 'A parent or legal guardian can open an SSY account for a girl child below the age of 10, at a post office or an authorised bank branch. A maximum of two accounts per family are allowed (with an exception for twins/triplets in specific circumstances) — one per eligible girl child.',
  },
  {
    q: 'Why do I deposit for only 15 years but the account matures at 21 years?',
    a: 'SSY has a 15-year deposit window from account opening, but the account itself only matures 21 years after opening (or earlier, on the girl\'s marriage after she turns 18). For the 6 years between the end of deposits and maturity, your existing balance keeps earning interest with no further contributions required or accepted.',
  },
  {
    q: 'What are the minimum and maximum deposit limits?',
    a: 'A minimum of ₹250 and a maximum of ₹1,50,000 can be deposited per financial year. Missing the minimum deposit in any year makes the account "irregular" until you pay a small penalty along with the shortfall to reactivate it.',
  },
  {
    q: 'Is SSY interest and maturity amount taxable?',
    a: 'No — SSY carries EEE (Exempt-Exempt-Exempt) tax status: your deposits qualify for a Section 80C deduction (up to the overall ₹1,50,000 80C limit, not in addition to it), the interest earned every year is tax-free, and the maturity amount is also fully tax-free.',
  },
  {
    q: 'Can I withdraw money from the SSY account before maturity?',
    a: 'A partial withdrawal of up to 50% of the balance (as of the end of the preceding financial year) is allowed once the girl turns 18, for her higher education expenses. The account can also be closed early, in full, on her marriage after she turns 18.',
  },
  {
    q: 'How does SSY compare to PPF for a child\'s education or marriage goal?',
    a: 'Both are EEE, government-backed and offer similar interest rates, but SSY is restricted to girl children and has that 21-year lock-in tied to the child\'s age, while PPF is open to anyone and has a shorter, more flexible 15-year lock-in with extension options. If you have a daughter under 10, SSY\'s typically slightly higher rate makes it worth prioritising for that specific goal; see our PPF Calculator for the more general-purpose alternative.',
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
  name: 'Sukanya Samriddhi Yojana Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Sukanya Samriddhi Yojana Calculator', path: PATH },
])

export default function SsyCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Sukanya Samriddhi Yojana Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>👧</span> Financial hub
          </>
        }
        h1="Sukanya Samriddhi Yojana Calculator"
        subtitle="Project your girl child's Sukanya Samriddhi Yojana maturity value at the current government-notified interest rate — a fully tax-free (EEE) scheme."
        stats={[
          { icon: '📈', big: '8.2%', small: 'current rate', tone: 'hub' },
          { icon: '📅', big: '15 + 6', small: 'deposit + growth years', tone: 'hub' },
          { icon: '✅', big: 'EEE', small: 'fully tax-free', tone: 'hub' },
          { icon: '👧', big: 'Girl child', small: 'below age 10', tone: 'hub' },
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
            Depositing the maximum {formatINR(150000)}/year for 15 years at the current 8.2% rate
            grows to about <strong>{formatINR(example.maturityValue)}</strong> by the time the
            account matures at 21 years — {formatINR(example.interestEarned)} of that is interest
            on top of the {formatINR(example.totalDeposited)} actually deposited.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your SSY maturity value
          </h2>
          <SsyCalculator />
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Comparing child-goal savings options?
          </h2>
          <p className="text-ash/80">
            Our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            models the more general-purpose EEE alternative open to anyone, with a shorter 15-year
            lock-in.
          </p>
        </section>

        <FinancialCrossSell current="sukanya-samriddhi-calculator" />

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
            This tool is for illustration only and is not investment advice. The interest rate is reviewed quarterly by the government and is not guaranteed.
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
