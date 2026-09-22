import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import CapitalGainsTaxCalculator from '@/components/calculators/CapitalGainsTaxCalculator'
import { calculateEquityCapitalGainsTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/capital-gains-tax-calculator'

const exampleLtcg = calculateEquityCapitalGainsTax(500000, 900000, 18)
const exampleStcg = calculateEquityCapitalGainsTax(500000, 600000, 6)

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator 2026 — LTCG & STCG on Shares, Mutual Funds',
  description:
    'Free capital gains tax calculator for India. Estimate LTCG (12.5% above ₹1.25L exemption) and STCG (20%) on listed equity shares and equity mutual funds, per Budget 2024 rules.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is the current LTCG tax rate on shares and equity mutual funds?',
    a: '12.5% on long-term gains above ₹1,25,000 in a financial year, applicable to listed equity shares and equity-oriented mutual funds held for more than 12 months, where STT was paid on both purchase and sale. This rate and the ₹1.25 lakh exemption threshold were both revised upward by Budget 2024 (effective 23 July 2024) from the earlier 10% rate and ₹1 lakh exemption.',
  },
  {
    q: 'What is the current STCG tax rate?',
    a: '20% on short-term gains (holding period of 12 months or less) from listed equity shares and equity mutual funds, with no exemption threshold — every rupee of short-term gain is taxed. This was also raised by Budget 2024, from the earlier 15%.',
  },
  {
    q: 'Is the ₹1.25 lakh LTCG exemption available on every sale, or once a year?',
    a: 'It\'s a once-per-financial-year cumulative limit across ALL your long-term equity gains combined — not per transaction and not per stock/fund. If you book ₹80,000 LTCG from one mutual fund and ₹90,000 from a stock sale in the same year, your combined gain of ₹1,70,000 only gets ₹1,25,000 of exemption, with ₹45,000 taxed at 12.5%.',
  },
  {
    q: 'What happened to capital gains tax rules in Budget 2024?',
    a: 'Effective 23 July 2024, the LTCG rate on listed equity/equity mutual funds rose from 10% to 12.5%, the exemption threshold rose from ₹1 lakh to ₹1.25 lakh/year, and the STCG rate rose from 15% to 20%. The holding-period threshold for "long-term" on listed shares stayed at 12 months. Gains booked before 23 July 2024 in the same financial year were taxed under the old rates — check which side of that date your specific transaction falls on if you\'re reconciling an FY2024-25 return.',
  },
  {
    q: 'Are debt mutual funds taxed the same way as equity funds?',
    a: 'No — this is a common and costly misunderstanding. Since a 2023 amendment, debt mutual funds (funds with less than 35% equity allocation) get NO long-term capital gains benefit regardless of holding period: gains are added to your income and taxed at your slab rate, every time. This calculator is built specifically for listed equity shares and equity-oriented mutual funds (35%+ equity allocation) — do not use it for debt fund, gold fund or international fund gains, which follow different rules entirely.',
  },
  {
    q: 'What is the grandfathering rule for shares bought before 31 January 2018?',
    a: 'For equity shares/units acquired on or before 31 January 2018, the cost of acquisition for LTCG purposes is the higher of the actual purchase price or the fair market value (highest traded price) as of 31 January 2018 — capped at the actual sale price. This "grandfathering" provision shields gains that had accrued before LTCG on equity was reintroduced in Budget 2018, and still matters for anyone holding shares from that long ago.',
  },
  {
    q: 'Can I set off capital losses against gains?',
    a: 'Short-term capital losses can be set off against both short-term and long-term capital gains in the same year. Long-term capital losses can only be set off against long-term capital gains, not short-term. Any unused loss can be carried forward for up to 8 assessment years, but only if you\'ve filed your income tax return before the due date for that year — a common trap where the tax-saving benefit is lost purely due to a late filing.',
  },
  {
    q: 'Does this calculator apply to unlisted shares or property?',
    a: 'No — unlisted shares use a 24-month long-term threshold (not 12) and different rate rules, and immovable property has its own separate long-term/short-term thresholds and, following Budget 2024, an option in some cases to choose between 12.5% without indexation or 20% with indexation for property acquired before 23 July 2024. This calculator is scoped specifically to listed equity shares and equity mutual funds where STT applies — a materially different, simpler regime from property or unlisted securities.',
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
  name: 'Capital Gains Tax Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Capital Gains Tax Calculator', path: PATH },
])

export default function CapitalGainsTaxCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Capital Gains Tax Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📉</span> Financial hub
          </>
        }
        h1="Capital Gains Tax Calculator"
        subtitle="Estimate the tax due on selling listed equity shares or equity mutual funds. Enter your purchase value, sale value and holding period to see whether it's short-term or long-term, and the tax payable under the current Budget 2024 rules."
        stats={[
          { icon: '📈', big: '12.5%', small: 'LTCG rate (>12 months)', tone: 'hub' },
          { icon: '⚡', big: '20%', small: 'STCG rate (≤12 months)', tone: 'hub' },
          { icon: '🛡️', big: '₹1.25L', small: 'LTCG exemption/year', tone: 'hub' },
          { icon: '📅', big: 'Post-23 Jul 2024', small: 'Budget 2024 rates', tone: 'hub' },
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
            Worked examples
          </h2>
          <p className="mt-2 text-ash/80">
            Selling shares bought for <strong>{formatINR(500000)}</strong> at{' '}
            <strong>{formatINR(900000)}</strong> after <strong>18 months</strong> is a long-term
            gain of {formatINR(exampleLtcg.gain)} — after the ₹1,25,000 exemption, only{' '}
            {formatINR(exampleLtcg.taxableGain)} is taxed at 12.5%, a tax of{' '}
            <strong>{formatINR(exampleLtcg.tax)}</strong>. The same {formatINR(100000)} gain
            booked in just <strong>6 months</strong> instead (selling at{' '}
            {formatINR(600000)}) is short-term, taxed in full at 20% with no exemption — a tax
            of <strong>{formatINR(exampleStcg.tax)}</strong>.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your capital gains tax
          </h2>
          <CapitalGainsTaxCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How the tax is calculated
          </h2>
          <p className="text-ash/80">
            Listed equity shares and equity-oriented mutual funds (where
            Securities Transaction Tax, or STT, was paid) follow a
            two-track system based purely on how long you held the
            investment:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Held 12 months or less — short-term (Section 111A)', 'the entire gain is taxed at a flat 20%, with no exemption threshold at all — even a ₹500 short-term gain is taxable.'],
              ['Held more than 12 months — long-term (Section 112A)', 'gains above ₹1,25,000 for the financial year (combined across all your equity LTCG, not per transaction) are taxed at 12.5% — the first ₹1,25,000 is exempt every year.'],
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
            One holding-period day can be the difference between these two
            regimes — a share sold on day 365 is short-term at 20% with no
            exemption; the same share sold one day later is long-term,
            taxed at 12.5% only on the amount above ₹1.25 lakh. If a sale
            is close to the 12-month mark and the amount is meaningful,
            it&apos;s worth checking the exact purchase date before
            selling.
          </p>
        </section>

        <section aria-labelledby="scope" className="mb-10 scroll-mt-20">
          <h2 id="scope" className="font-display mb-2 text-2xl font-semibold">
            What this calculator does — and doesn&apos;t — cover
          </h2>
          <p className="text-ash/80">
            This tool is scoped specifically to <strong>listed equity
            shares and equity-oriented mutual funds</strong> (35%+ equity
            allocation) sold via a recognised stock exchange with STT paid
            — the most common case for retail investors. It does NOT apply
            to:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Debt mutual funds', 'no LTCG benefit since a 2023 amendment — gains are taxed at your slab rate regardless of how long you held them.'],
              ['Unlisted shares', 'a 24-month long-term threshold applies instead of 12, with different rate treatment.'],
              ['Property and other assets', 'immovable property follows its own long-term/short-term thresholds and, for pre-23 July 2024 acquisitions, an option between two different rate/indexation methods — a separate calculation this tool does not perform.'],
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
            If you&apos;re investing via SIP and want to project growth
            before thinking about the eventual sale-time tax, start with
            our{' '}
            <Link href="/financial/sip-calculator" className="text-brass underline">
              SIP Calculator
            </Link>
            .
          </p>
        </section>

        <FinancialCrossSell current="capital-gains-tax-calculator" />

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
            This tool provides estimates for illustration only and is not tax advice. It assumes STT was paid on both purchase and sale, does not model surcharge, and does not cover debt funds, unlisted shares or property — consult a tax professional for your specific transaction.
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
