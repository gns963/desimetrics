import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import RentVsBuyCalculator from '@/components/calculators/RentVsBuyCalculator'
import { calculateRentVsBuy } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/rent-vs-buy-calculator'

const example = calculateRentVsBuy(8000000, 20, 8.5, 20, 1, 25000, 5, 5, 10, 20)

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator 2026 — Which Builds More Wealth? (India)',
  description:
    'Free rent vs buy calculator for India. Compare the long-term wealth outcome of buying a home with a loan versus renting and investing the difference.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How does this calculator decide whether renting or buying "wins"?',
    a: 'It\'s a pure wealth comparison, not a lifestyle judgement: the buyer\'s net wealth is their property\'s appreciated value minus any remaining loan balance at the end of your chosen comparison period; the renter\'s net wealth is an investment corpus built from investing their down payment plus the monthly difference between what the buyer pays (EMI + maintenance) and what the renter pays (rent), growing at your assumed investment return. Whichever number is bigger "wins" for that specific set of assumptions.',
  },
  {
    q: 'Why does the investment return assumption matter so much?',
    a: 'It\'s usually the single biggest lever in this comparison. If your assumed investment return (say, from equity mutual funds) is well above your assumed property appreciation rate, renting and investing the difference often comes out ahead over long periods — this is the classic finding behind most rent-vs-buy analyses, and this calculator lets you test it against your own actual assumptions rather than accept it as a rule.',
  },
  {
    q: 'Does this account for the non-financial benefits of owning a home?',
    a: 'No — this is purely a wealth-maximisation comparison. Owning a home also provides stability, freedom to renovate, and freedom from a landlord\'s decisions, which have real value that doesn\'t show up in a spreadsheet. If those factors matter to you, weigh them alongside (not instead of) the wealth outcome shown here.',
  },
  {
    q: 'What happens if my loan tenure is shorter than my comparison period?',
    a: 'Once the loan is fully repaid, your outstanding loan balance goes to zero and stops accruing interest — but this calculator, for simplicity, assumes the renter stops investing any NEW monthly surplus once the buyer\'s ongoing cost (now just maintenance) drops below rent. In reality, the buyer would also have extra cash to invest at that point, so this is a small simplification that modestly understates the renting scenario\'s true wealth in that specific situation — documented on this basis rather than silently assumed.',
  },
  {
    q: 'Should I use my actual rent, or a "comparable" rent for buying the same property?',
    a: 'Use the rent for a genuinely comparable property (same location, size and quality) — not your current rent if you\'d actually downsize or change locations to buy. Comparing a cheap 1BHK rent against buying a 3BHK isn\'t a fair wealth comparison.',
  },
  {
    q: 'Is buying always the "safer" option since I own a real asset?',
    a: 'Property is illiquid (see our Net Worth Calculator\'s note on liquid vs total net worth) and concentrated in one asset and one location — a downturn in your specific local property market affects your entire home equity, while a diversified investment portfolio spreads risk across many assets. Neither is inherently "safer"; they carry different kinds of risk.',
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
  name: 'Rent vs Buy Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Rent vs Buy Calculator', path: PATH },
])

export default function RentVsBuyCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Rent vs Buy Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏘️</span> Financial hub
          </>
        }
        h1="Rent vs Buy Calculator"
        subtitle="Compare the long-term wealth outcome of buying a home with a loan versus renting and investing the difference — using your own assumptions, not a rule of thumb."
        stats={[
          { icon: '⚖️', big: 'Wealth', small: 'comparison, not advice', tone: 'hub' },
          { icon: '📈', big: 'Opportunity cost', small: 'of the down payment', tone: 'hub' },
          { icon: '🏠', big: 'Real amortisation', small: 'month-by-month loan payoff', tone: 'hub' },
          { icon: '🎛️', big: 'Your assumptions', small: 'not a fixed answer', tone: 'hub' },
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
            Buying an {formatINR(8000000)} home with a 20% down payment, 8.5% loan, and 5% property
            appreciation over 20 years leaves you with {formatINR(example.netBuyingWealth)} in net
            wealth. Renting an equivalent {formatINR(25000)}/month home instead and investing the
            difference at 10% builds{' '}
            <strong>{formatINR(example.netRentingWealth)}</strong> — {example.betterOption} wins by
            about {formatINR(Math.abs(example.wealthDifference))} under these assumptions.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Compare rent vs buy
          </h2>
          <RentVsBuyCalculator />
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Related calculators
          </h2>
          <p className="text-ash/80">
            Already leaning toward buying? Check the exact EMI on our{' '}
            <Link href="/financial/home-loan-emi-calculator" className="text-brass underline">
              Home Loan EMI Calculator
            </Link>
            , including prepayment scenarios. Renting and want to model your tax-exempt HRA
            instead? See our{' '}
            <Link href="/financial/hra-calculator" className="text-brass underline">
              HRA Calculator
            </Link>
            .
          </p>
        </section>

        <FinancialCrossSell current="rent-vs-buy-calculator" />

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
            This tool is a scenario-comparison aid, not financial advice. Property appreciation, rent growth and investment returns are assumptions you choose, not guarantees.
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
