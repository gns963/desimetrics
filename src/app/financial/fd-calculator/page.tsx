import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import FdCalculator from '@/components/calculators/FdCalculator'
import { calculateFd, simulateFd } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/fd-calculator'

const example = calculateFd(100000, 7, 5, 4)
const exampleRegular = simulateFd({
  principal: 1000000, ratePercent: 7, years: 5, compoundingPerYear: 4,
  fdType: 'cumulative', isSeniorCitizen: false, panRegistered: true,
})
const exampleSenior = simulateFd({
  principal: 1000000, ratePercent: 7, years: 5, compoundingPerYear: 4,
  fdType: 'cumulative', isSeniorCitizen: true, panRegistered: true,
})
const exampleNoPan = simulateFd({
  principal: 1000000, ratePercent: 7, years: 5, compoundingPerYear: 4,
  fdType: 'cumulative', isSeniorCitizen: false, panRegistered: false,
})

export const metadata: Metadata = {
  title: 'FD Calculator 2026 — Maturity, TDS and Net Return',
  description:
    'Free FD calculator for India. Work out your FD maturity with quarterly compounding, the exact TDS under Section 194A, your net return, and the effective yield — with senior-citizen and PAN-status handling.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is FD maturity value calculated?',
    a: 'Using the standard compound interest formula A = P(1 + r/n)^(n×t), where P is your deposit, r is the annual rate, n is how many times per year interest compounds (most Indian bank FDs compound quarterly) and t is the tenure in years. More frequent compounding means slightly higher returns for the same quoted annual rate — a 7% FD compounded quarterly earns marginally more than one compounded annually.',
  },
  {
    q: 'Is FD interest taxable?',
    a: 'Yes — unlike PPF, FD interest is fully taxable at your income-tax slab rate, added to your total income under "Income from Other Sources." Banks deduct TDS at 10% (if your PAN is on file) once your total interest from that bank exceeds ₹40,000 in a financial year (₹50,000 for senior citizens); without PAN registered, the TDS rate doubles to 20% regardless of the amount. TDS being deducted doesn\'t settle your tax liability — you still declare the full interest and pay any shortfall (or claim a refund) when filing your return.',
  },
  {
    q: 'What is a tax-saving FD, and is it actually tax-free?',
    a: 'A tax-saving FD has a mandatory 5-year lock-in and qualifies for a Section 80C deduction on the amount deposited (up to ₹1,50,000, shared with other 80C instruments) — but the interest it earns is still fully taxable, exactly like a regular FD. Only the initial deposit gets the tax break; don\'t confuse this with PPF\'s fully tax-free (EEE) status.',
  },
  {
    q: 'Cumulative vs non-cumulative FD — what\'s the difference?',
    a: 'A cumulative FD reinvests the interest each period and pays out the full compounded amount only at maturity — select this in the calculator to see the standard growing-balance projection. A non-cumulative FD instead pays out a flat interest amount every year as regular income (the calculator switches to showing this fixed annual payout instead of a growing maturity value) — the principal itself never grows, which suits retirees or anyone wanting a predictable cash-flow stream, but the total interest earned over the same tenure is lower than a cumulative FD since the payouts aren\'t reinvested and don\'t compound.',
  },
  {
    q: 'Do senior citizens get a higher FD rate?',
    a: 'Yes — the calculator applies a standard +0.5% bonus over the base rate you enter when you select "senior citizen," which is a common convention, though the exact premium varies by bank (typically 0.25% to 0.75%). Senior citizens also get a higher TDS-free threshold (₹50,000/year of interest versus ₹40,000 for everyone else) — a second, separate benefit beyond the rate itself.',
  },
  {
    q: 'What happens if I break my FD before maturity?',
    a: 'Most banks allow premature withdrawal but apply a penalty, typically 0.5%-1% lower interest than the rate applicable for the period the FD actually ran (not the original booked rate) — so breaking a 5-year FD after 2 years pays roughly the 2-year rate minus the penalty, not the 5-year rate. Some special/tax-saving FDs don\'t allow premature withdrawal at all during the lock-in.',
  },
  {
    q: 'Is my FD safe if the bank fails?',
    a: 'Deposits (including FDs) at any DICGC-insured bank are protected up to ₹5,00,000 per depositor per bank (principal plus interest combined) — this covers virtually all Indian scheduled commercial banks and most cooperative banks. If you hold significantly more than ₹5 lakh with one bank, spreading deposits across multiple banks keeps the full amount insured.',
  },
  {
    q: 'How do I avoid TDS on my FD if I don\'t owe any tax?',
    a: 'File Form 15G (for individuals under 60 whose total income is below the taxable threshold) or Form 15H (for senior citizens, a simpler self-declaration regardless of the exact threshold) with your bank at the start of each financial year. These forms self-declare that your total income doesn\'t attract tax, so the bank skips TDS on your FD interest entirely — but you must still declare the interest on your return if you\'re required to file one, and filing a false declaration has penalties.',
  },
  {
    q: 'FD vs PPF vs RD — which should I choose?',
    a: 'They serve different needs: an FD suits a lump sum you want to grow with flexible tenure (as short as 7 days or as long as 10 years) and easy access via premature withdrawal (with a penalty); PPF suits long-term, fully tax-free savings but locks in for 15 years; a Recurring Deposit (RD) suits building savings from a fixed monthly amount rather than a lump sum, at rates similar to FDs. See our PPF Calculator to compare the long-horizon, tax-free option.',
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
  name: 'FD Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'FD Calculator', path: PATH },
])

export default function FdCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'FD Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏦</span> Financial hub
          </>
        }
        h1="FD Calculator"
        subtitle="Work out your FD maturity with your choice of compounding, the exact TDS deducted under Section 194A, your net return, and the effective yield to compare banks fairly."
        stats={[
          { icon: '📆', big: 'Quarterly', small: 'Most common compounding', tone: 'hub' },
          { icon: '👴', big: '+0.5%', small: 'Senior-citizen bonus', tone: 'hub' },
          { icon: '🧾', big: '10% / 20%', small: 'TDS, with/without PAN', tone: 'hub' },
          { icon: '💵', big: 'Cumulative /', small: 'Non-cumulative modelled', tone: 'hub' },
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
            Depositing <strong>{formatINR(100000)}</strong> at <strong>7%</strong>, compounded
            quarterly, for <strong>5 years</strong> grows to about{' '}
            <strong>{formatINR(example.maturityValue)}</strong> — roughly{' '}
            <strong>{formatINR(example.interestEarned)}</strong> in interest, before tax.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your FD maturity value
          </h2>
          <FdCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How FD maturity is calculated
          </h2>
          <p className="text-ash/80">
            Unlike a SIP or PPF, an FD is usually a single lump-sum deposit,
            so the formula is simpler — but the compounding frequency your
            bank uses still meaningfully changes the outcome:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Compounding frequency', 'quarterly is the most common convention among Indian banks, but some products compound monthly, half-yearly or annually — more frequent compounding produces a slightly higher effective return for the same quoted annual rate, since interest starts earning interest sooner.'],
              ['Cumulative vs payout', 'this calculator models a cumulative FD, where interest reinvests until maturity — a non-cumulative FD paying out interest periodically as income will show a lower final "maturity" figure because the payouts don\'t compound.'],
              ['Tenure flexibility', 'FDs can run from as short as 7 days to 10 years, unlike PPF\'s fixed 15-year lock-in — shorter tenures suit near-term goals, though shorter FDs often carry marginally lower rates than mid-length ones.'],
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

        <section aria-labelledby="tds" className="mb-10 scroll-mt-20">
          <h2 id="tds" className="font-display mb-4 text-2xl font-semibold">
            How Senior-Citizen Status and PAN Change Your TDS
          </h2>
          <p className="text-ash/80">
            A <strong>{formatINR(1000000)}</strong> FD at 7% for 5 years shows how much three
            factors move the outcome — the calculator above computes all of this per year, since
            TDS applies once each YEAR&apos;s interest crosses the threshold, not on the total:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Scenario</th>
                  <th className="px-4 py-2 text-right font-semibold">Maturity value</th>
                  <th className="px-4 py-2 text-right font-semibold">Total TDS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2">Regular depositor, PAN on file</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleRegular.maturityValue)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleRegular.totalTds)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Senior citizen, PAN on file</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleSenior.maturityValue)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleSenior.totalTds)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Regular depositor, no PAN</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleNoPan.maturityValue)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleNoPan.totalTds)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-semibold text-ink-navy">
            Takeaway: the senior-citizen bonus grows the maturity value AND raises the TDS-free
            threshold to ₹50,000/year — a genuine double benefit; skipping PAN registration simply
            doubles the TDS rate for no offsetting benefit, so always keep PAN on file with your bank.
          </p>
        </section>

        <section aria-labelledby="tax" className="mb-10 scroll-mt-20">
          <h2 id="tax" className="font-display mb-2 text-2xl font-semibold">
            FD taxation, beyond TDS
          </h2>
          <p className="text-ash/80">
            TDS is not your final tax liability — it&apos;s just what the
            bank withholds upfront. FD interest is fully taxable at your
            income-tax slab rate every year it&apos;s earned (even on a
            cumulative FD where you don&apos;t actually receive the money
            until maturity), and you must declare the full interest on
            your return regardless of whether TDS was deducted — if your
            slab rate is higher than the 10%/20% TDS rate, you owe the
            difference; if lower, you can claim a refund. A 5-year
            tax-saving FD gets you a Section 80C deduction on the deposit
            itself, but the interest earned is still fully taxable — it is
            not the same as PPF&apos;s fully tax-free status. See our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            if tax-free growth matters more to you than FD&apos;s
            flexibility and shorter lock-in options. If your total income
            is low enough that you owe no tax at all, you can avoid TDS
            entirely by filing Form 15G (or 15H if you&apos;re a senior
            citizen) with your bank at the start of the financial year.
          </p>
        </section>

        <FinancialCrossSell current="fd-calculator" />

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
            This tool provides pre-tax estimates for illustration only. Actual FD rates vary by bank, tenure and depositor category — this is not investment advice.
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
