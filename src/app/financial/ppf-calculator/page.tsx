import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import PpfCalculator from '@/components/calculators/PpfCalculator'
import { calculatePpf, simulatePpf } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/ppf-calculator'

const example = calculatePpf(150000, 7.1, 15)
const exampleBefore5th = simulatePpf({
  depositMode: 'monthly', depositAmount: 12500, ratePercent: 7.1,
  depositTiming: 'before5th', extensionBlocks: 0, extensionChoice: 'contribute', taxBracketPercent: 30,
})
const exampleAfter5th = simulatePpf({
  depositMode: 'monthly', depositAmount: 12500, ratePercent: 7.1,
  depositTiming: 'after5th', extensionBlocks: 0, extensionChoice: 'contribute', taxBracketPercent: 30,
})
const exampleExtendStop = simulatePpf({
  depositMode: 'yearly', depositAmount: 150000, ratePercent: 7.1,
  depositTiming: 'before5th', extensionBlocks: 1, extensionChoice: 'stop', taxBracketPercent: 30,
})
const exampleExtendContribute = simulatePpf({
  depositMode: 'yearly', depositAmount: 150000, ratePercent: 7.1,
  depositTiming: 'before5th', extensionBlocks: 1, extensionChoice: 'contribute', taxBracketPercent: 30,
})

export const metadata: Metadata = {
  title: 'PPF Calculator 2026 — Maturity, Deposit Timing & 80C Savings',
  description:
    'Free PPF calculator for India. Project your Public Provident Fund maturity at the current 7.1% rate, and see exactly how deposit timing, monthly vs yearly deposits, and 15-year extensions change your tax-free corpus.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is PPF maturity value calculated?',
    a: 'PPF compounds annually — each financial year\'s accumulated interest becomes part of the balance the following year. In yearly deposit mode, this calculator models a single deposit at the start of each year, compounding annually at the notified rate. In monthly deposit mode, it goes further and simulates each month individually, computing interest on the lowest balance between the 5th and month-end per PPF\'s actual rule, then crediting the year\'s accumulated interest to the balance at financial-year end — the same mechanic your actual PPF passbook follows.',
  },
  {
    q: 'What is the current PPF interest rate?',
    a: 'The rate for the July-September 2026 quarter is 7.1% — unchanged since April 2020, making it one of the most stable small-savings rates. The government reviews and notifies the PPF rate every quarter, so it can change; this calculator lets you adjust the rate to model a different scenario, but always check the current notified rate before relying on a specific projection.',
  },
  {
    q: 'What is the maximum I can invest in PPF each year?',
    a: '₹1,50,000 per financial year is the statutory cap — and this is a combined limit across all PPF accounts you hold (including any minor account you operate on behalf of a child), not a per-account limit. Depositing more than ₹1,50,000 in a year does not earn interest on the excess and isn\'t eligible for Section 80C deduction. The minimum is ₹500/year to keep the account active.',
  },
  {
    q: 'What tax benefits does PPF offer?',
    a: 'PPF carries one of the few genuinely "EEE" (Exempt-Exempt-Exempt) tax statuses in India: your contribution is deductible under Section 80C (up to ₹1,50,000/year, shared with other 80C instruments like ELSS and home loan principal), the interest earned every year is fully tax-free, and the maturity amount is also fully tax-free on withdrawal — a combination very few other instruments offer.',
  },
  {
    q: 'What happens after my PPF account completes 15 years?',
    a: 'You have three options: withdraw the full maturity amount tax-free and close the account, extend the account for a 5-year block with further contributions (you can do this indefinitely in 5-year blocks), or extend without further contributions, in which case the existing balance keeps earning interest but you can\'t deposit more. The extension choice must be made (via a form at your bank/post office) within one year of maturity if you want to keep contributing.',
  },
  {
    q: 'Can I withdraw money from PPF before 15 years?',
    a: 'Partial withdrawal is allowed from the 7th financial year onward, capped at the lower of 50% of the balance at the end of the 4th year preceding the withdrawal year or 50% of the balance at the end of the preceding year. Separately, you can take a loan against your PPF balance between the 3rd and 6th year, at a rate typically 1% above the prevailing PPF rate. Before either window opens, the account is fully locked.',
  },
  {
    q: 'PPF vs FD vs ELSS — which is better for tax-saving under 80C?',
    a: 'It depends on your risk appetite and lock-in tolerance: PPF is government-backed, fully tax-free (EEE) and has a long 15-year lock-in; a tax-saving FD locks in for just 5 years but the interest is fully taxable at your slab rate; ELSS has the shortest lock-in (3 years) and historically the highest return potential, but it\'s market-linked equity risk and gains above ₹1.25 lakh/year are taxed under the capital-gains rules. If you want guaranteed, tax-free, low-risk long-term savings, PPF is usually the strongest single option among the three — run the numbers for ELSS-linked equity growth on our SIP calculator to compare.',
  },
  {
    q: 'Does it actually matter if I deposit on the 3rd vs the 8th of the month?',
    a: 'Yes, measurably — PPF interest for a month is computed on the lowest balance the account held between the 5th and the last day of that month. A deposit made on or before the 5th counts toward that window and earns interest starting that same month; the same deposit made on the 6th or later misses the window and only starts earning from next month. Over 15 years of monthly deposits, consistently depositing after the 5th instead of before can cost tens of thousands of rupees in lost interest — see the worked comparison above.',
  },
  {
    q: 'Should I deposit monthly or as one lump sum at the start of the year?',
    a: 'A lump sum deposited on or before 5 April (the start of the financial year) earns interest for the full year on the entire amount, which is mathematically the best outcome if you have the full ₹1,50,000 available upfront. Monthly deposits are more realistic for most salaried savers and still earn solid returns, but each instalment only earns interest from when it\'s deposited (and only from that month if made by the 5th), so the same total annual amount grows somewhat less than a single April lump sum would.',
  },
  {
    q: 'Can NRIs invest in PPF?',
    a: 'No — an NRI cannot open a new PPF account. If you opened a PPF account while a resident Indian and later became an NRI, the account can continue until its original maturity but cannot be extended beyond that in 5-year blocks once you\'re an NRI.',
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
  name: 'PPF Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'PPF Calculator', path: PATH },
])

export default function PpfCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'PPF Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📮</span> Financial hub
          </>
        }
        h1="PPF Calculator"
        subtitle="Project your PPF maturity, then see how deposit timing, monthly vs yearly deposits, and extending past 15 years each change your tax-free corpus. Includes an 80C tax-saving estimate."
        stats={[
          { icon: '📈', big: '7.1%', small: 'Current rate (Jul–Sep 2026)', tone: 'hub' },
          { icon: '📅', big: 'Before/after 5th', small: 'Deposit-timing effect', tone: 'hub' },
          { icon: '🛡️', big: 'EEE', small: 'Fully tax-free at every stage', tone: 'hub' },
          { icon: '➕', big: '+5yr blocks', small: 'Extension modelling', tone: 'hub' },
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
            Investing the maximum <strong>{formatINR(150000)}/year</strong> at the current{' '}
            <strong>7.1%</strong> rate for the full <strong>15-year</strong> lock-in means you
            invest {formatINR(example.invested)} and could reach about{' '}
            <strong>{formatINR(example.maturityValue)}</strong> — roughly{' '}
            <strong>{formatINR(example.interestEarned)}</strong> in interest, entirely tax-free.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your PPF maturity value
          </h2>
          <PpfCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How PPF growth is calculated
          </h2>
          <p className="text-ash/80">
            PPF compounds annually, which is what makes a long lock-in
            genuinely powerful — each year&apos;s interest becomes part of
            next year&apos;s principal:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Annual compounding', 'the account balance (previous balance plus that year\'s deposit) earns interest for the year, and that interest itself starts earning interest from the following year — this is why the later years of a PPF account grow much faster in absolute terms than the early years.'],
              ['Timing matters', 'PPF interest is computed monthly on the lowest balance between the 5th and last day of each month — depositing on or before the 5th earns interest a month earlier than depositing after. Switch to monthly deposit mode above to model this precisely for your own contribution schedule.'],
              ['Rate is reviewed quarterly', 'the government sets small-savings rates like PPF every quarter based on prevailing government-securities yields — 7.1% has held since April 2020, but it is not guaranteed to stay there, so long-term projections are indicative, not promised.'],
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

        <section aria-labelledby="deposit-timing" className="mb-10 scroll-mt-20">
          <h2 id="deposit-timing" className="font-display mb-4 text-2xl font-semibold">
            Before vs After the 5th — What It Actually Costs You
          </h2>
          <p className="text-ash/80">
            For a monthly-deposit PPF account, the calculator above models
            this precisely rather than just mentioning it in passing.
            Depositing <strong>₹12,500/month for 15 years</strong> before
            the 5th of each month reaches{' '}
            <strong>{formatINR(exampleBefore5th.maturityValue)}</strong> —
            depositing the same amount after the 5th every month instead
            reaches only <strong>{formatINR(exampleAfter5th.maturityValue)}</strong>,
            a difference of{' '}
            <strong>{formatINR(exampleBefore5th.maturityValue - exampleAfter5th.maturityValue)}</strong>{' '}
            purely from timing, on identical contributions.
          </p>
          <p className="mt-3 text-ash/80">
            The mechanism: PPF interest for a given month is computed on
            the lowest balance the account held between the 5th and the
            last day of that month. A deposit made on or before the 5th is
            already part of the balance when that window starts, so it
            earns interest for the full month. The same deposit made on
            the 6th or later misses that month&apos;s window entirely and
            only starts earning from the following month.
          </p>
          <p className="mt-3 font-semibold text-ink-navy">
            Takeaway: if you deposit monthly, set up a standing instruction
            for the 1st-4th of the month rather than depositing casually
            whenever — the gap compounds meaningfully over 15 years.
          </p>
        </section>

        <section aria-labelledby="extension" className="mb-10 scroll-mt-20">
          <h2 id="extension" className="font-display mb-4 text-2xl font-semibold">
            Extending Past 15 Years: Contribute or Not?
          </h2>
          <p className="text-ash/80">
            Once your account completes its 15-year lock-in, extending it
            for a further 5-year block with continued contributions grows
            the corpus meaningfully more than extending without
            contributing — but both options keep earning interest, which
            surprises people who assume an unextended account simply stops
            growing:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Extension choice (years 16-20)</th>
                  <th className="px-4 py-2 text-right font-semibold">Total invested</th>
                  <th className="px-4 py-2 text-right font-semibold">Maturity at year 20</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2">Stop contributing</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleExtendStop.invested)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleExtendStop.maturityValue)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Keep contributing ₹1.5L/year</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleExtendContribute.invested)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleExtendContribute.maturityValue)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-semibold text-ink-navy">
            Takeaway: even &ldquo;stopping&rdquo; contributions doesn&apos;t stop growth — your existing balance keeps compounding tax-free either way; contributing further just adds more principal on top of that.
          </p>
        </section>

        <section aria-labelledby="tax-saving" className="mb-10 scroll-mt-20">
          <h2 id="tax-saving" className="font-display mb-2 text-2xl font-semibold">
            Estimating your 80C tax saving
          </h2>
          <p className="text-ash/80">
            Every rupee of PPF contribution — up to the ₹1,50,000/year cap
            — reduces your taxable income under Section 80C if you&apos;re
            on the old tax regime, so a 30% tax bracket taxpayer who fully
            uses the PPF limit each year effectively saves{' '}
            <strong>{formatINR(exampleBefore5th.totalTaxSaved)}</strong>{' '}
            in tax over 15 years, on top of the tax-free interest and
            maturity. This is illustrative only — PPF shares the ₹1.5 lakh
            80C ceiling with other instruments like ELSS and life
            insurance premiums, and the estimate assumes you&apos;re not
            already using your full 80C limit elsewhere. Compare against
            the old vs new regime directly on our{' '}
            <Link href="/financial/new-vs-old-tax-regime-calculator" className="text-brass underline">
              Tax Regime Calculator
            </Link>{' '}
            — this saving only applies if the old regime wins for you.
          </p>
        </section>

        <section aria-labelledby="rules" className="mb-10 scroll-mt-20">
          <h2 id="rules" className="font-display mb-4 text-2xl font-semibold">
            Key PPF rules worth knowing
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              ['One account per person', 'you can hold only one PPF account in your own name (a separate account for a minor child you operate as guardian is allowed, but the ₹1,50,000 annual cap applies across both combined).'],
              ['Partial withdrawal from year 7', 'allowed once the account crosses 6 completed years, capped at the lower of 50% of the balance at the end of the 4th preceding year or 50% of the previous year\'s balance.'],
              ['Loan against PPF, years 3–6', 'a loan facility (not a withdrawal) is available between the 3rd and 6th year, at roughly 1% above the prevailing PPF rate.'],
              ['Extension after 15 years', 'you can extend in 5-year blocks indefinitely, with or without further contributions — the choice must be filed within one year of maturity to keep contributing.'],
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
            Comparing PPF against other 80C or long-horizon options? See how
            a market-linked SIP could grow over the same horizon on our{' '}
            <Link href="/financial/sip-calculator" className="text-brass underline">
              SIP Calculator
            </Link>
            , or check how a shorter-lock-in fixed deposit compares on our{' '}
            <Link href="/financial/fd-calculator" className="text-brass underline">
              FD Calculator
            </Link>
            . If you&apos;re salaried, your{' '}
            <Link href="/financial/epf-calculator" className="text-brass underline">
              EPF
            </Link>{' '}
            is likely already doing something similar with mandatory employer matching; if you have
            a daughter under 10, our{' '}
            <Link href="/financial/sukanya-samriddhi-calculator" className="text-brass underline">
              Sukanya Samriddhi Yojana Calculator
            </Link>{' '}
            models a similarly tax-free scheme at a typically higher rate for that specific goal.
          </p>
        </section>

        <FinancialCrossSell current="ppf-calculator" />

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
            The PPF rate is reviewed by the government every quarter and is not guaranteed to remain at the current level. This tool is for illustration only and is not investment advice.
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
