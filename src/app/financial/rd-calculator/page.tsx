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
  {
    q: 'How does an RD compare to a SIP into a debt mutual fund for the same monthly-saving goal?',
    a: 'An RD gives a guaranteed, bank-fixed return known upfront, with interest fully taxable at your slab rate every year it\'s credited; a debt-fund SIP has a market-linked return (no guarantee, can occasionally be negative in a short window) but is taxed only on redemption at your slab rate as per the current debt-fund taxation rules, not annually. RDs suit savers who want certainty and simplicity; debt funds suit those comfortable with modest return variability in exchange for potentially better post-tax outcomes over longer holding periods.',
  },
  {
    q: 'Should senior citizens prefer an RD or the Senior Citizen Savings Scheme (SCSS)?',
    a: 'SCSS is specifically designed for senior citizens, typically offers a higher government-backed rate than bank RDs, and pays interest quarterly rather than compounding it — useful for someone who wants regular income rather than a lump sum at maturity. An RD suits a senior citizen building toward a specific future lump-sum goal instead of drawing regular income; the two serve different cash-flow needs even though both are low-risk.',
  },
  {
    q: 'What is a "flexi RD," and how does it differ from what this calculator assumes?',
    a: 'A flexi (or flexible) RD lets you vary your deposit amount each month between a minimum and a maximum, rather than committing to one fixed instalment for the entire tenure — useful for variable or seasonal income. This calculator assumes a FIXED monthly deposit throughout, matching a standard RD; a flexi RD\'s actual maturity value will differ from this calculator\'s projection based on how much you actually deposit each month.',
  },
  {
    q: 'Can I open an RD for any tenure, or are there fixed options?',
    a: 'Most banks offer RD tenures from 6 months up to 10 years, usually in increments of 3 months, though the exact available tenures vary by bank. Enter your specific planned tenure in months in this calculator rather than assuming only annual increments are available.',
  },
  {
    q: 'Is there a minimum monthly deposit for an RD?',
    a: 'Yes, though the exact minimum varies by bank — many banks accept RDs starting from as little as ₹100-500 per month, making it one of the more accessible regular-savings instruments, unlike a lump-sum FD which requires the full amount upfront.',
  },
  {
    q: 'Does the RD interest rate change during my tenure?',
    a: 'No — most banks fix the RD interest rate at the rate applicable on the day you open the account, for the entire tenure, even if the bank\'s published rates for new RDs change later. This calculator assumes a single fixed rate throughout, matching how a standard RD actually works; only a small number of banks offer a floating-rate RD product, which is uncommon enough that it isn\'t the default this calculator models.',
  },
  {
    q: 'Can I take a loan against my RD instead of withdrawing it early?',
    a: 'Many banks let you take a loan or overdraft against your RD balance — typically up to 80-90% of the accumulated value — at a rate slightly above your RD\'s own interest rate. This lets you access funds for a short-term need without breaking the RD and losing the compounding or triggering a premature-withdrawal penalty, which is often the better option if you only need the money briefly.',
  },
  {
    q: 'Does an RD held jointly get taxed differently?',
    a: 'No special treatment — interest on a joint RD is taxable in the hands of the primary (first) account holder by default, at their income-tax slab rate, the same as a joint FD. TDS is also deducted against the primary holder\'s PAN, so the ₹40,000/₹50,000 threshold and 10%/20% TDS rates discussed above apply to that person\'s total interest income from the bank, not split automatically between holders.',
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

        <section aria-labelledby="how-compounds" className="mb-10 scroll-mt-20">
          <h2 id="how-compounds" className="font-display mb-4 text-2xl font-semibold">
            How RD interest actually compounds
          </h2>
          <p className="text-ash/80">
            An RD compounds interest quarterly, not monthly — the single biggest reason its
            maturity value can&apos;t be estimated by simply multiplying your instalment by the
            tenure and a flat rate. This calculator simulates the deposit-and-credit cycle
            month by month:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Monthly deposits accumulate', 'every instalment adds to your running balance the moment it\'s made, whether or not interest has been credited yet.'],
              ['Quarterly interest crediting', 'every third month, the calculator applies one quarter of the annual rate to the current balance and adds it back in, so the next quarter\'s interest is earned on a slightly larger base.'],
              ['Compounding widens with tenure', 'because interest credited in an earlier quarter itself earns interest in every later quarter, a longer tenure widens the gap between what you deposit in total and what you actually receive at maturity.'],
              ['Senior citizen bonus applies the same way', 'many banks add a flat 0.5 percentage point to the base rate for senior-citizen depositors, applied to the same quarterly-compounding structure this calculator models.'],
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
            Takeaway: an RD&apos;s stated annual rate is compounded quarterly, not simply divided
            by 12 and multiplied by your tenure in months — which is exactly why this calculator
            walks the deposit-and-credit cycle month by month instead of using a single flat
            formula.
          </p>
        </section>

        <section aria-labelledby="tds" className="mb-10 scroll-mt-20">
          <h2 id="tds" className="font-display mb-4 text-2xl font-semibold">
            TDS on your RD interest
          </h2>
          <p className="text-ash/80">
            Banks deduct TDS on RD interest the same way they do on FD interest, once your total
            interest from that one bank crosses a fixed threshold in a financial year:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['₹40,000 threshold for regular depositors', 'TDS applies only once your total RD plus FD interest from that one bank exceeds this amount in a financial year.'],
              ['₹50,000 threshold for senior citizens', 'a higher threshold recognizes that many senior citizens rely on interest income, giving them more headroom before TDS kicks in.'],
              ['10% TDS rate with PAN on file', 'the standard deduction rate once your interest crosses the threshold, provided your bank has your PAN registered against the account.'],
              ['20% TDS rate without PAN', 'banks must deduct at double the standard rate if your PAN isn\'t linked to the account, so registering your PAN before opening an RD avoids this higher deduction.'],
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
            Takeaway: TDS is only an advance collection, not your final tax bill — you still
            declare the full interest as income and settle the difference against your actual
            slab rate when you file your return.
          </p>
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
            Saving toward a long-term, tax-advantaged goal instead? Our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            projects a 15-year government-backed alternative with tax-free interest, and our{' '}
            <Link href="/financial/sip-calculator" className="text-brass underline">
              SIP Calculator
            </Link>{' '}
            covers the same monthly-contribution habit through equity mutual funds if you&apos;re
            comfortable with a market-linked return instead of a fixed one.
          </p>
        </section>

        <section aria-labelledby="best-practices" className="mb-10 scroll-mt-20">
          <h2 id="best-practices" className="font-display mb-4 text-2xl font-semibold">
            Four RD best practices
          </h2>
          <ul className="mt-3 space-y-3">
            {[
              ['Register your PAN with the bank before opening the account', 'this halves your TDS rate from 20% to 10% once your interest crosses the deduction threshold — a simple step that\'s easy to overlook when opening an RD online.'],
              ['Match the tenure to when you actually need the money', 'premature withdrawal usually comes with a reduced-rate penalty, so a tenure that outlasts your actual savings goal risks giving up part of the return you were counting on.'],
              ['Ladder multiple RDs instead of one large one, if your goal allows it', 'opening a fresh RD every few months as income allows spreads your maturity dates, giving you flexibility to redeploy or spend a portion without breaking your entire savings plan.'],
              ['Compare the post-tax return against other fixed-income options', 'because RD interest is fully taxable at your slab rate every year it\'s credited, someone in a high tax bracket may find a comparable FD or a debt-fund SIP more tax-efficient for the same savings goal — see the comparison table above.'],
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

        <section aria-labelledby="comparison" className="mb-10 scroll-mt-20">
          <h2 id="comparison" className="font-display mb-4 text-2xl font-semibold">
            RD vs FD vs SIP — which fits your goal?
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">&nbsp;</th>
                  <th className="px-4 py-2 font-semibold">Recurring Deposit</th>
                  <th className="px-4 py-2 font-semibold">Fixed Deposit</th>
                  <th className="px-4 py-2 font-semibold">Mutual Fund SIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Minimum commitment</td>
                  <td className="px-4 py-2">Small monthly amount</td>
                  <td className="px-4 py-2">One lump sum upfront</td>
                  <td className="px-4 py-2">Small monthly amount</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Return type</td>
                  <td className="px-4 py-2">Fixed, bank-guaranteed</td>
                  <td className="px-4 py-2">Fixed, bank-guaranteed</td>
                  <td className="px-4 py-2">Market-linked, not guaranteed</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Liquidity</td>
                  <td className="px-4 py-2">Low — penalty on early exit</td>
                  <td className="px-4 py-2">Low — penalty on early exit</td>
                  <td className="px-4 py-2">High — redeem most funds anytime</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Ideal use case</td>
                  <td className="px-4 py-2">Short-term goal from regular income, zero risk tolerance</td>
                  <td className="px-4 py-2">Short-term goal with a lump sum already in hand</td>
                  <td className="px-4 py-2">Long-term goal (5+ years), some risk tolerance for higher expected returns</td>
                </tr>
              </tbody>
            </table>
          </div>
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
