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
const exampleModest = calculateSsy(50000, 8.2)

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
  {
    q: 'What happens if I have twin or triplet daughters?',
    a: 'The one-girl-per-additional-account limit (max 2 accounts per family) has a documented exception for multiple births: if your second delivery results in twins or triplets, or your first delivery itself is of twin/triplet girls, you can open an account for each of them, with a medical certificate confirming the multiple birth submitted at account opening.',
  },
  {
    q: 'How is the SSY interest rate actually set?',
    a: 'SSY, like PPF, is a small-savings scheme whose interest rate the government reviews and notifies quarterly, linked to the prevailing yield on government securities of comparable maturity. It isn\'t set arbitrarily each quarter — see our PPF Calculator for the same rate-setting mechanism, since both schemes are reviewed together each quarter alongside other small-savings instruments (NSC, KVP, post office deposits).',
  },
  {
    q: 'Can I transfer my SSY account between banks or post offices?',
    a: 'Yes — SSY accounts can be transferred anywhere in India between authorised banks and post offices, free of charge, typically needed when the family relocates. You\'ll need to submit a transfer application with the passbook and KYC documents at the current branch; the account number and accumulated balance carry over unchanged.',
  },
  {
    q: 'Can the account be closed early for reasons other than marriage?',
    a: 'Yes, premature closure is allowed on: the death of the account holder (girl child), a life-threatening medical condition of the account holder requiring the funds, or the death of the guardian operating the account — each requiring supporting documentation. Outside these specific circumstances, closing before the 21-year maturity (other than the post-18 marriage provision) isn\'t permitted.',
  },
  {
    q: 'What if I can\'t continue depositing every year for 15 years?',
    a: 'The account doesn\'t close — it becomes "irregular," and interest still accrues on the existing balance at the standard rate. To bring it back to regular status and resume contributing, you pay a small penalty (₹50 per year of default) alongside the minimum ₹250 shortfall for each missed year, at any time before the account matures.',
  },
  {
    q: 'Is SSY interest compounded annually or monthly?',
    a: 'Annually. Each year\'s deposit is added to the balance, and the full balance then earns that year\'s interest rate once, compounding year over year rather than month over month. This is why depositing early in a financial year — rather than waiting until March — lets that year\'s contribution earn a full year of interest instead of a partial one.',
  },
  {
    q: 'If I deposit less than the maximum every year, does the account still mature at 21 years?',
    a: 'Yes — the 15-year deposit window and 21-year maturity are fixed to the account\'s opening date, not to how much you deposit. Depositing the minimum ₹250 a year or the maximum ₹1,50,000 a year both follow the identical 15-plus-6-year timeline; only the maturity value scales with how much you actually put in.',
  },
  {
    q: 'Does the Section 80C deduction apply every year I deposit, or only in the first year?',
    a: 'Every year you deposit, not just the first — each financial year\'s SSY contribution is eligible for a fresh Section 80C deduction, up to that year\'s overall ₹1,50,000 80C ceiling shared with other instruments like PPF, ELSS and life insurance premiums. Stopping contributions in a later year simply means no fresh 80C claim for that year; it doesn\'t affect the deductions already claimed.',
  },
  {
    q: 'Does a smaller, steady deposit still build a meaningful corpus?',
    a: `Yes — depositing ${formatINR(50000)}/year at 8.2% for 15 years grows to about ${formatINR(exampleModest.maturityValue)} by maturity, of which ${formatINR(exampleModest.interestEarned)} is interest on ${formatINR(exampleModest.totalDeposited)} actually deposited. The scheme rewards consistency over the full 15-year window more than it rewards depositing the maximum in any single year — a smaller amount deposited every year without gaps outperforms a larger amount deposited irregularly.`,
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
            on top of the {formatINR(example.totalDeposited)} actually deposited. A more modest{' '}
            {formatINR(50000)}/year still reaches about{' '}
            <strong>{formatINR(exampleModest.maturityValue)}</strong> over the same timeline,
            which is why consistency across all 15 deposit years matters more than maxing out the
            annual limit in any single year.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your SSY maturity value
          </h2>
          <SsyCalculator />
        </section>

        <section aria-labelledby="mechanics" className="mb-10 scroll-mt-20">
          <h2 id="mechanics" className="font-display mb-4 text-2xl font-semibold">
            How the 15+6 Year Structure Actually Works
          </h2>
          <p className="text-ash/80">
            SSY splits into two distinct phases that together explain why the account matures at
            21 years even though you only ever deposit for 15:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Deposit phase (years 1-15)', 'you contribute anywhere from ₹250 to ₹1,50,000 each financial year, and the running balance earns interest on top of every fresh deposit — this is when compounding and your own contributions both build the balance together.'],
              ['Growth-only phase (years 16-21)', 'no further deposits are made or accepted, but the balance you\'ve already built keeps earning the prevailing interest rate for six more years — a meaningful stretch of pure compounding on money you\'ve stopped actively contributing to.'],
              ['Interest compounds annually', 'each year\'s deposit joins the balance and the whole balance earns that year\'s rate once — depositing early in the financial year, rather than close to the March deadline, captures a fuller year of interest on that instalment.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-semibold text-ink-navy">
            Takeaway: because the deposit window closes years before maturity, the account
            rewards starting as early as possible — a girl child enrolled near birth gets a full
            21-year runway, while one enrolled closer to the age-10 cutoff gets a materially
            shorter one for the same deposit pattern.
          </p>
        </section>

        <section aria-labelledby="priorities" className="mb-10 scroll-mt-20">
          <h2 id="priorities" className="font-display mb-4 text-2xl font-semibold">
            Who Should Prioritise Sukanya Samriddhi
          </h2>
          <p className="text-ash/80">
            SSY is a narrow-eligibility scheme by design, and it suits some situations far more
            than others:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['A daughter well under age 10', 'the earlier the account opens, the longer the 21-year runway from opening to maturity, and the more years of compounding on top of your own deposits.'],
              ['A specific higher-education or marriage goal', 'the scheme\'s partial-withdrawal rule at 18 and full closure on marriage after 18 line up directly with those two life events, unlike a general-purpose instrument.'],
              ['Someone who already exhausts other priorities under the ₹1,50,000 80C cap', 'since SSY deposits share that same annual ceiling with PPF, ELSS and insurance premiums, it\'s most valuable when it doesn\'t crowd out deductions you\'d otherwise claim elsewhere.'],
              ['A saver who wants a fully tax-free, government-backed instrument', 'the EEE status means no tax drag at any of the three stages — contribution, accrual or withdrawal — which is rare among long-tenure savings products.'],
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
          <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
            SSY vs PPF for a child-goal
          </h2>
          <p className="text-ash/80">
            Both are EEE, government-backed small-savings schemes reviewed on the same quarterly
            cycle — the real differences are eligibility and lock-in:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Feature</th>
                  <th className="px-4 py-2 font-semibold">Sukanya Samriddhi Yojana</th>
                  <th className="px-4 py-2 font-semibold">PPF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Who can open one</td>
                  <td className="px-4 py-2">Girl child under 10 only</td>
                  <td className="px-4 py-2">Anyone</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Current rate</td>
                  <td className="px-4 py-2">8.2%</td>
                  <td className="px-4 py-2">7.1%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Deposit window</td>
                  <td className="px-4 py-2">15 years</td>
                  <td className="px-4 py-2">15 years, extendable in 5-year blocks</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Maturity</td>
                  <td className="px-4 py-2">21 years from opening</td>
                  <td className="px-4 py-2">15 years from opening</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Max annual deposit</td>
                  <td className="px-4 py-2">{formatINR(150000)}</td>
                  <td className="px-4 py-2">{formatINR(150000)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ash/80">
            Our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            models the more general-purpose alternative open to anyone, with a shorter, more
            flexible lock-in. If the goal is specifically a daughter&apos;s education, our{' '}
            <Link href="/financial/education-loan-emi-calculator" className="text-brass underline">
              Education Loan EMI Calculator
            </Link>{' '}
            is worth checking alongside SSY — a maturing SSY corpus can reduce how much you need
            to borrow, or replace the loan entirely if the timing and amount line up. For a
            fixed-return alternative with no age or gender restriction and a shorter commitment,
            see our{' '}
            <Link href="/financial/fd-calculator" className="text-brass underline">
              FD Calculator
            </Link>
            .
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
