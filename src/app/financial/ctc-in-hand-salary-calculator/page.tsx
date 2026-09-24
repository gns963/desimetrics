import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import CtcCalculator from '@/components/calculators/CtcCalculator'
import { calculateCtcBreakdown } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/ctc-in-hand-salary-calculator'

const example = calculateCtcBreakdown(1200000, 40, 2400, 'new')

export const metadata: Metadata = {
  title: 'CTC to In-Hand Salary Calculator 2026 — Take-Home Pay (India)',
  description:
    'Free CTC to in-hand salary calculator for India. See what actually lands in your bank account from your offered CTC, after PF, gratuity provision, professional tax and income tax.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'Why is my in-hand salary so much lower than my CTC?',
    a: 'CTC (Cost to Company) includes money that never reaches your bank account as cash: the employer\'s PF contribution and a gratuity provision are both backed out before your gross salary is even calculated, and from that gross salary, your own PF contribution, professional tax and income tax are deducted. A ₹12 lakh CTC routinely becomes ₹9-10 lakh in actual annual take-home once all of this is accounted for.',
  },
  {
    q: 'What is the "gratuity provision" deducted from my CTC?',
    a: 'Many employers include a notional gratuity provision in your CTC structure — an actuarial estimate (commonly 4.81% of basic, derived from the 15/26 gratuity formula spread monthly) of what they\'re setting aside to eventually pay you gratuity under the Payment of Gratuity Act, if you complete 5+ years of service. It\'s part of your CTC on paper but isn\'t cash you receive now.',
  },
  {
    q: 'Why does the basic salary percentage matter so much for take-home pay?',
    a: 'A higher basic percentage means higher PF contributions (both yours and your employer\'s) coming out of the same CTC, which lowers your immediate take-home — but it also means a bigger retirement corpus and (for the old regime) a bigger HRA exemption if you pay rent. A lower basic percentage raises take-home now at the cost of smaller PF/gratuity accumulation. Employers set this ratio, not employees, but it materially changes your month-to-month cash flow.',
  },
  {
    q: 'Does this calculator account for HRA exemption?',
    a: 'No — this tool estimates income tax on your gross salary directly, without modelling the HRA exemption (which needs your actual HRA component, rent paid and city) or other old-regime deductions like 80C. If you\'re on the old regime and pay rent, use our HRA Calculator and Tax Regime Calculator together with this one for a more complete, itemised picture.',
  },
  {
    q: 'Why do I need to enter professional tax manually instead of it being calculated automatically?',
    a: 'Professional tax is levied by STATE governments, not the central government, so the amount (and whether it applies at all) varies significantly by state — most states that levy it cap it around ₹2,400/year, but the exact slabs differ. Rather than guess or hardcode one state\'s figure as if it applied everywhere, this calculator asks for your own state\'s figure directly.',
  },
  {
    q: 'Is the income tax figure here exact, or an estimate?',
    a: 'It\'s a reasonable estimate based on your selected regime\'s standard slabs and rebate, applied to your gross salary after only the standard deduction — it does not account for other deductions (80C, 80D, HRA exemption, home loan interest) you might separately claim under the old regime, which would lower your actual tax below what\'s shown here.',
  },
  {
    q: 'Does this calculator account for variable pay or an annual bonus?',
    a: 'No — this tool assumes your entire CTC is fixed and paid out evenly across the year. Many offers actually split CTC into a fixed component (paid monthly) and a variable/bonus component (paid quarterly or annually, often tied to performance), so your ACTUAL monthly in-hand pay can be meaningfully lower than this calculator shows if a large share of your CTC is variable — enter only the fixed portion of your CTC here for an accurate monthly figure.',
  },
  {
    q: 'I see a gratuity provision backed out of my CTC every month, but when do I actually get that money?',
    a: 'Not monthly, and not automatically — gratuity is paid out as a lump sum only when you leave the company after completing 5+ years of continuous service (with exceptions for death or disablement), calculated using the 15/26 formula on your last-drawn salary and years of service. The monthly deduction from your CTC is purely an accounting provision your employer sets aside; see our Gratuity Calculator to estimate the actual payout you\'d eventually receive.',
  },
  {
    q: 'What are "cost centres" like insurance or meal cards doing to my in-hand pay?',
    a: 'Employer-paid group insurance premiums and reimbursement-style benefits (meal cards, fuel/LTA allowances structured as reimbursements) are part of your CTC but don\'t show up as cash in your monthly salary credit — they either get paid directly to a vendor (insurance) or require you to submit bills to claim them back (reimbursements). A CTC with a large share in these cost centres will show a lower "gross salary" in this calculator than one where the same CTC is paid mostly as basic and allowances.',
  },
  {
    q: 'My employer offered a raise as CTC, not take-home — how do I actually evaluate it?',
    a: 'Run both your old and new CTC through this calculator with the same basic-percentage assumption to see the real monthly in-hand difference, not just the headline CTC increase — a ₹1 lakh CTC hike delivered mostly through higher PF/gratuity provisioning and variable pay can translate to a much smaller actual take-home increase than a raise of the same size given as fixed basic/allowances.',
  },
  {
    q: 'Does employer NPS contribution under Section 80CCD(2) change this calculation?',
    a: 'If your CTC structure includes an employer NPS contribution (commonly up to 10% of basic, 14% for government employees), it reduces your gross salary the same way employer PF does, but it comes with a tax advantage this calculator doesn\'t model: 80CCD(2) is deductible with no rupee cap and is one of the few deductions still allowed under the NEW tax regime. If your offer includes this component, your actual take-home tax could be lower than this calculator\'s estimate.',
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
  name: 'CTC to In-Hand Salary Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'CTC to In-Hand Salary Calculator', path: PATH },
])

export default function CtcCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'CTC to In-Hand Salary Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💵</span> Financial hub
          </>
        }
        h1="CTC to In-Hand Salary Calculator"
        subtitle="See what actually lands in your bank account from your offered CTC, after employer PF, gratuity provision, your own PF, professional tax and estimated income tax."
        stats={[
          { icon: '📋', big: 'Full', small: 'CTC breakdown', tone: 'hub' },
          { icon: '🏢', big: 'PF + gratuity', small: 'backed out first', tone: 'hub' },
          { icon: '🧮', big: 'New/Old', small: 'regime tax estimate', tone: 'hub' },
          { icon: '💰', big: 'Monthly', small: 'take-home figure', tone: 'hub' },
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
            A {formatINR(1200000)} CTC with a 40% basic salary, under the new tax regime, works out
            to a gross salary of {formatINR(example.grossSalaryAnnual)} after employer PF and
            gratuity provision — leaving about{' '}
            <strong>{formatINR(example.monthlyInHand)}/month</strong> in hand after PF,
            professional tax and estimated income tax.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your in-hand salary
          </h2>
          <CtcCalculator />
        </section>

        <section aria-labelledby="basic-percent-impact" className="mb-10 scroll-mt-20">
          <h2 id="basic-percent-impact" className="font-display mb-4 text-2xl font-semibold">
            How your basic salary percentage changes take-home pay
          </h2>
          <p className="text-ash/80">
            The same {formatINR(1200000)} CTC produces a different monthly in-hand figure depending
            on what share of it is structured as basic salary, since basic drives PF and gratuity
            provisioning:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Basic as % of CTC</th>
                  <th className="px-4 py-2 font-semibold">Gross salary</th>
                  <th className="px-4 py-2 font-semibold">Monthly in-hand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[30, 40, 50].map((pct) => {
                  const r = calculateCtcBreakdown(1200000, pct, 2400, 'new')
                  return (
                    <tr key={pct}>
                      <td className="px-4 py-2 font-medium">{pct}%</td>
                      <td className="px-4 py-2 tabular-nums">{formatINR(r.grossSalaryAnnual)}</td>
                      <td className="px-4 py-2 tabular-nums">{formatINR(r.monthlyInHand)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ash/80">
            A lower basic percentage raises take-home pay today at the cost of smaller PF and
            gratuity accumulation over your career — the tradeoff most CTC structures are built
            around.
          </p>
        </section>

        <FinancialCrossSell current="ctc-in-hand-salary-calculator" />

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
            This tool provides estimates for illustration only and is not tax advice. Actual in-hand pay depends on your specific salary structure, employer policies and state professional-tax rules.
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
