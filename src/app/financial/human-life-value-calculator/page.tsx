import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import HlvCalculator from '@/components/calculators/HlvCalculator'
import { ageBasedIncomeMultiplier, calculateHumanLifeValue } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/human-life-value-calculator'

const example = calculateHumanLifeValue(1200000, 300000, 20, 6, 2000000, 500000, 1500000, 35)

export const metadata: Metadata = {
  title: 'Human Life Value Calculator 2026 — How Much Life Insurance Do You Need?',
  description:
    'Free Human Life Value (HLV) calculator for India. Estimate how much life insurance cover your family would need using the standard income-replacement method used by financial planners.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is Human Life Value (HLV), and how is it different from a term insurance premium?',
    a: 'HLV answers "how much cover do I need?" — it estimates the economic value your income provides to your family, so you know how large a life insurance policy to buy. It does NOT tell you what that policy will cost (the premium) — premiums depend on the specific insurer, your age, health, smoking status, sum assured, policy term and product chosen, none of which this calculator has access to. Use your HLV result as the sum-assured target when you request quotes from insurers.',
  },
  {
    q: 'How is HLV calculated?',
    a: 'This calculator uses the income-replacement method taught widely in Indian financial planning: take your net annual contribution to your family (income minus expenses that only benefit you personally), find the present value of that income stream over your remaining working years (using a discount rate, since a lump sum today is worth more than the same amount spread over future years), add any outstanding debts your family would otherwise inherit, then subtract life cover and liquid savings you already have. The result is the additional cover needed to fully replace your economic contribution.',
  },
  {
    q: 'Why use a discount rate instead of just multiplying income by years?',
    a: 'A lump sum insurance payout today can itself be invested and grow — so the family doesn\'t need the full undiscounted sum of 20 years of income; they need a lump sum that, invested at a reasonable rate, can replicate that income stream. The discount rate represents the return that lump sum could reasonably earn. A higher discount rate assumption lowers the required cover (since the lump sum works harder); a lower one raises it.',
  },
  {
    q: 'Is the "10-15x annual income" rule of thumb accurate?',
    a: 'It\'s a rough shortcut, not a real calculation — it ignores your specific age, years to retirement, existing liabilities, existing cover and future goals entirely. Two people with identical income but very different debt loads or years left to work would get wildly different actual insurance needs, but the same flat multiple under a rule of thumb. This calculator shows that multiple too (as an age-banded 6x-25x sanity check, alongside the needs-based figure) but treats it only as a cross-check — the needs-based HLV number, built from your own numbers, is the one to act on.',
  },
  {
    q: 'Should I include my spouse\'s income or expenses in this calculation?',
    a: 'This calculator is scoped to one income earner\'s HLV — if both spouses earn, it\'s generally more accurate to calculate HLV separately for each person\'s own income and expenses, since each policy is meant to replace that specific person\'s economic contribution to the household, not the household\'s combined finances.',
  },
  {
    q: 'What counts as "existing cover and savings" I should subtract?',
    a: 'Any life insurance you already hold (term, endowment, or a group cover from your employer), plus liquid savings or investments specifically earmarked to support your family if you were gone — this typically does NOT include retirement-specific savings like PPF or NPS that your family can\'t easily access, or illiquid assets like your primary residence that they\'d need to keep living in.',
  },
  {
    q: 'Should HLV include future goals like a child\'s education or wedding?',
    a: 'Yes — this calculator has a dedicated field for it. Enter your best estimate, in today\'s money, of large future one-time costs (a child\'s higher education or wedding, for example) that aren\'t already covered by other dedicated savings or investments, and it\'s added directly into the required-cover total alongside your outstanding liabilities.',
  },
  {
    q: 'Does a higher HLV mean I should buy a more expensive insurance product?',
    a: 'No — a pure term insurance plan (no maturity payout, no investment component) is almost always the most cost-efficient way to buy a large sum assured, since you\'re paying only for the death-benefit risk, not for embedded savings or investment charges. A large HLV number is a reason to buy a bigger term cover, not a reason to consider an expensive endowment or ULIP policy instead.',
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
  name: 'Human Life Value Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Human Life Value Calculator', path: PATH },
])

export default function HlvCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Human Life Value Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🛡️</span> Financial hub
          </>
        }
        h1="Human Life Value Calculator"
        subtitle="Work out how much life insurance cover your family would actually need, using the income-replacement method financial planners use — not a flat rule-of-thumb multiple of your salary."
        stats={[
          { icon: '📊', big: 'Income-replacement', small: 'Standard HLV method', tone: 'hub' },
          { icon: '🎓', big: 'Goals included', small: 'Education & marriage', tone: 'hub' },
          { icon: '➖', big: 'Nets off', small: 'Existing cover & debts', tone: 'hub' },
          { icon: '✅', big: '6x–25x', small: 'Age-based sanity check', tone: 'hub' },
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
            A 35-year-old earning <strong>{formatINR(1200000)}/year</strong> with{' '}
            {formatINR(300000)} in personal expenses, 20 years left to retirement, a 6% discount
            rate, {formatINR(2000000)} in outstanding loans, {formatINR(1500000)} set aside for
            children&apos;s education and marriage, and {formatINR(500000)} of existing cover and
            savings would need about{' '}
            <strong>{formatINR(example.recommendedCover)}</strong> in additional life cover to
            fully protect their family&apos;s finances — compare that against the quick{' '}
            {formatINR(example.incomeMultiplierEstimate)} ({ageBasedIncomeMultiplier(35)}x income)
            sanity-check figure below.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your Human Life Value
          </h2>
          <HlvCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How the calculation works
          </h2>
          <p className="text-ash/80">
            The income-replacement method builds up the required cover in
            five steps:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Net annual contribution', 'your income minus the portion of expenses that benefit only you (not your family) — this is the actual amount your family would lose each year without you.'],
              ['Present value of future income', 'that annual amount, discounted over your remaining working years — a lump sum today, invested at a reasonable rate, needs to be smaller than the raw sum of all future years combined to replicate the same income stream.'],
              ['Add outstanding liabilities', 'loans your family would otherwise need to keep servicing, like a home or personal loan — if you\'re still repaying a home loan, check the current balance on our Home Loan EMI Calculator to get an accurate figure here.'],
              ['Add lump-sum goals', 'future one-time costs like children\'s higher education or marriage, entered in today\'s money, so they\'re funded even after your income replacement runs out.'],
              ['Subtract existing cover and savings', 'any life insurance you already hold plus liquid savings genuinely available to your family, so this calculator gives you the ADDITIONAL cover needed, not your total lifetime insurance requirement.'],
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
            Have an existing home loan to factor in as a liability? Check
            the outstanding-balance math on our{' '}
            <Link href="/financial/home-loan-emi-calculator" className="text-brass underline">
              Home Loan EMI Calculator
            </Link>
            . Not sure what your existing cover and savings actually add up to? Our{' '}
            <Link href="/financial/net-worth-calculator" className="text-brass underline">
              Net Worth Calculator
            </Link>{' '}
            totals your liquid assets in one place, which feeds directly into this calculator&apos;s
            existing-cover-and-savings field.
          </p>
        </section>

        <section aria-labelledby="using-the-number" className="mb-10 scroll-mt-20">
          <h2 id="using-the-number" className="font-display mb-2 text-2xl font-semibold">
            What to do with your HLV figure
          </h2>
          <p className="text-ash/80">
            This number is a target sum assured, not a premium quote — the
            actual cost of buying that much cover depends on your age,
            health, smoking status, the insurer and the specific product.
            A pure term insurance plan (no savings or investment component)
            is generally the most cost-efficient way to buy a large sum
            assured, since every rupee of premium goes toward the death
            benefit rather than embedded charges. Shop across a few
            insurers with your HLV figure as the sum assured you&apos;re
            requesting a quote for.
          </p>
        </section>

        <section aria-labelledby="income-multiplier" className="mb-10 scroll-mt-20">
          <h2 id="income-multiplier" className="font-display mb-4 text-2xl font-semibold">
            The income-multiplier sanity check
          </h2>
          <p className="text-ash/80">
            Alongside the needs-based HLV figure, the calculator shows a quick cross-check based
            on an age-wise multiple of your annual income — a rule of thumb several insurer
            calculators use for a fast estimate:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Age band</th>
                  <th className="px-4 py-2 font-semibold">Income multiple</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Up to 25</td>
                  <td className="px-4 py-2">25x annual income</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">26–35</td>
                  <td className="px-4 py-2">20x annual income</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">36–45</td>
                  <td className="px-4 py-2">15x annual income</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">46–55</td>
                  <td className="px-4 py-2">10x annual income</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Above 55</td>
                  <td className="px-4 py-2">6x annual income</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-ash/80">
            Treat this as a quick cross-check, not the answer — it ignores your actual liabilities,
            existing cover, dependants and future goals entirely, so two people the same age and
            income get the same number even if their real needs are completely different. The
            needs-based figure above, built from your own numbers, is the one to act on.
          </p>
        </section>

        <FinancialCrossSell current="human-life-value-calculator" />

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
            This tool estimates a life-cover need, not an insurance premium or a product recommendation. It is for illustration only and is not financial or insurance advice.
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
