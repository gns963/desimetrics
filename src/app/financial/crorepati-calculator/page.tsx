import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import CrorepatiCalculator from '@/components/calculators/CrorepatiCalculator'
import { calculateCrorepati } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/crorepati-calculator'

const example = calculateCrorepati(10000000, 15, 12, 6)
const exampleStepUp = calculateCrorepati(10000000, 15, 12, 6, 0, 10)
const tenureComparison = [10, 15, 20, 25].map((years) => ({
  years,
  ...calculateCrorepati(10000000, years, 12, 6),
}))

export const metadata: Metadata = {
  title: 'Crorepati Calculator 2026 — Monthly SIP to Reach ₹1 Crore (India)',
  description:
    'Free Crorepati calculator for India. Find the monthly SIP needed to hit ₹1 crore (or any target corpus) by your goal date, with an optional annual step-up.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is the required monthly SIP calculated?',
    a: 'This is the reverse of a normal SIP calculation: instead of telling you the future value of a fixed monthly investment, it solves backward from your target corpus to find the monthly amount that would grow to that target at your assumed return over your chosen time frame — using the same future-value-of-an-annuity formula our SIP Calculator uses, just solved the other way around.',
  },
  {
    q: 'What is a step-up SIP, and why does it lower the starting amount?',
    a: 'A step-up SIP increases your monthly investment by a fixed percentage every year (often matching expected salary growth), instead of staying flat. Since later contributions compound for less time but are larger, and early contributions are smaller but compound longer, a step-up SIP can reach the same target with a lower STARTING monthly amount than a flat SIP — useful if your income is expected to grow but is tight today.',
  },
  {
    q: 'What does the "inflation-adjusted target" figure mean?',
    a: '₹1 crore today buys much more than ₹1 crore will buy in 15-20 years. This figure shows what your target corpus is worth in TODAY\'s purchasing power, discounted by your assumed inflation rate — a useful reality check on whether your nominal goal is actually enough to fund what you\'re planning it for.',
  },
  {
    q: 'Why does delaying by 5 years increase the required SIP so much?',
    a: 'Compounding is time-driven — the earlier rupees have more years to grow, so removing 5 years from the end of a long SIP disproportionately increases how hard the remaining years have to work. This is a genuine, quantified version of "the best time to start was yesterday, the second best time is today."',
  },
  {
    q: 'Is ₹1 crore actually a meaningful retirement or goal number?',
    a: 'It\'s a popular, round milestone in India but isn\'t inherently meaningful for every goal — a ₹1 crore corpus funds very different outcomes depending on when you need it and what you need it for. Use the target-corpus field to enter your ACTUAL goal amount (a specific retirement corpus, a child\'s education fund, a house down payment) rather than defaulting to ₹1 crore just because it\'s the calculator\'s name.',
  },
  {
    q: 'What\'s the difference between a step-up SIP and a lump-sum top-up strategy?',
    a: 'A step-up SIP raises your fixed MONTHLY contribution by a set percentage every year, automated through your mutual fund folio\'s standing instruction — steady and disciplined, needing no manual action once set up. A lump-sum top-up instead means investing irregular windfalls (a bonus, an increment arrears payment) as one-off additions on top of an unchanged monthly SIP. Step-up suits predictable salary growth; lump-sum top-ups suit irregular extra income — many investors use both together.',
  },
  {
    q: 'Is the eventual ₹1 crore corpus taxed when I withdraw it?',
    a: 'Yes, if it\'s invested in equity mutual funds — long-term capital gains (units held over 12 months) above a ₹1,25,000 exemption per financial year are taxed at 12.5% under current rules. See our SIP Calculator, which shows this same post-tax treatment alongside the nominal and inflation-adjusted figures, and our Capital Gains Tax Calculator for the general mechanism.',
  },
  {
    q: 'Does the required SIP change if I invest in debt funds instead of equity?',
    a: 'The math here is return-agnostic — enter whatever return rate matches your actual asset allocation. Debt funds typically offer a lower, steadier return than equity (so you\'d enter a lower % and get a correspondingly higher required SIP), and debt-fund gains are taxed differently (at your income-tax slab rate, with no long-term concessional rate for funds bought after April 2023) — a materially different profile from the equity assumption in the worked example on this page.',
  },
  {
    q: 'What if I already have a lump sum invested — does that reduce my required SIP?',
    a: 'Yes — enter it in the "existing corpus" field. It grows forward at your assumed return before being netted off your target, so the calculator only asks your SIP to cover the remaining gap rather than the whole target from zero. Someone with a substantial head start needs a much smaller monthly SIP for the same goal than someone starting from nothing.',
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
  name: 'Crorepati Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Crorepati Calculator', path: PATH },
])

export default function CrorepatiCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Crorepati Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💎</span> Financial hub
          </>
        }
        h1="Crorepati Calculator"
        subtitle="Find the monthly SIP you need to reach ₹1 crore — or any target amount — by your goal date, with an optional annual step-up to lower where you start."
        stats={[
          { icon: '🎯', big: 'Any target', small: 'not just ₹1 crore', tone: 'hub' },
          { icon: '📈', big: 'Step-up SIP', small: 'lower starting amount', tone: 'hub' },
          { icon: '⏳', big: 'Cost of delay', small: 'starting 5 years later', tone: 'hub' },
          { icon: '💹', big: 'Inflation view', small: "today's purchasing power", tone: 'hub' },
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
            To reach <strong>{formatINR(10000000)}</strong> in 15 years at an assumed 12% return,
            you&apos;d need a flat SIP of <strong>{formatINR(example.requiredMonthlySip)}/month</strong> —
            or start at just {formatINR(exampleStepUp.requiredMonthlySipWithStepUp)}/month with a 10%
            annual step-up. In today&apos;s money (6% inflation), that ₹1 crore is worth about{' '}
            {formatINR(example.inflationAdjustedTargetToday)}.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your required SIP
          </h2>
          <CrorepatiCalculator />
        </section>

        <section aria-labelledby="tenure-comparison" className="mb-10 scroll-mt-20">
          <h2 id="tenure-comparison" className="font-display mb-4 text-2xl font-semibold">
            Same ₹1 crore target, four different tenures
          </h2>
          <p className="text-ash/80">
            Starting earlier doesn&apos;t just give more time — it dramatically lowers the monthly
            amount needed, since compounding does progressively more of the work:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Years to goal</th>
                  <th className="px-4 py-2 font-semibold">Required monthly SIP</th>
                  <th className="px-4 py-2 font-semibold">Total invested</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {tenureComparison.map((row) => (
                  <tr key={row.years}>
                    <td className="px-4 py-2 font-medium">{row.years} years</td>
                    <td className="px-4 py-2 tabular-nums">{formatINR(row.requiredMonthlySip)}/mo</td>
                    <td className="px-4 py-2 tabular-nums">
                      {formatINR(row.requiredMonthlySip * row.years * 12)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ash/80">
            All four rows assume the same 12% return — only the tenure changes, at{' '}
            {formatINR(10000000)}.
          </p>
        </section>

        <section aria-labelledby="related-tools" className="mb-10 scroll-mt-20">
          <h2 id="related-tools" className="font-display mb-2 text-2xl font-semibold">
            Already investing a fixed amount instead?
          </h2>
          <p className="text-ash/80">
            This calculator solves for the SIP amount given a target. If you already know how much
            you&apos;re investing each month and want to see what it grows to instead, use our{' '}
            <Link href="/financial/sip-calculator" className="text-brass underline">
              SIP Calculator
            </Link>{' '}
            — it also shows the inflation-adjusted real value and post-tax corpus after LTCG.
          </p>
        </section>

        <FinancialCrossSell current="crorepati-calculator" />

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
            SIP returns are market-linked and not guaranteed. This tool is a planning aid, not investment advice — consult a SEBI-registered adviser before making investment decisions.
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
