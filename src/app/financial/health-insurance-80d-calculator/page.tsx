import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import Section80DCalculator from '@/components/calculators/Section80DCalculator'
import { calculateSection80D } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/health-insurance-80d-calculator'

const example = calculateSection80D(20000, false, 30000, true, 6000)

export const metadata: Metadata = {
  title: 'Health Insurance 80D Calculator 2026 — Tax Deduction (India)',
  description:
    'Free Section 80D calculator for India. Work out your health insurance premium tax deduction for self, family and parents, including the preventive checkup sub-limit.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What are the Section 80D deduction limits?',
    a: 'Two separate limits: up to ₹25,000 for premiums covering yourself, spouse and dependent children (₹50,000 if the eldest insured member is a senior citizen aged 60+), and a SEPARATE up to ₹25,000 for your parents\' premiums (₹50,000 if they\'re senior citizens) — these two limits stack, so a taxpayer with senior-citizen parents could claim up to ₹75,000-₹1,00,000 total.',
  },
  {
    q: 'Is the ₹5,000 preventive health checkup an additional deduction?',
    a: 'No — this is the single most common misunderstanding about Section 80D. The ₹5,000 preventive checkup allowance is INCLUDED within your overall self+family limit (₹25,000 or ₹50,000), not an extra amount on top of it. If you\'ve already used your full limit on premiums, checkup spending adds nothing further.',
  },
  {
    q: 'Can I claim 80D under the new tax regime?',
    a: 'No — Section 80D, like most Chapter VI-A deductions, is available only under the OLD tax regime. If you\'ve switched to the new regime for its lower slab rates, you lose this deduction entirely, which is one of the trade-offs worth weighing with our Tax Regime Calculator.',
  },
  {
    q: 'Does 80D cover premiums paid for siblings or in-laws?',
    a: 'No — the section covers only self, spouse, dependent children, and parents (dependent or not). Premiums paid for siblings, in-laws, or other relatives don\'t qualify for this specific deduction, regardless of who\'s actually paying.',
  },
  {
    q: 'What if my employer provides group health insurance — can I still claim 80D?',
    a: 'A standard employer-provided group health policy where you don\'t pay any premium yourself gives you no 80D deduction, since the section only covers amounts YOU actually pay. If you pay for an additional top-up or a separate individual/family policy on top of your employer\'s cover, that additional premium does qualify.',
  },
  {
    q: 'Does the mode of payment matter for claiming 80D?',
    a: 'Yes — the premium must be paid via a non-cash mode (cheque, card, net banking, UPI) to qualify for the deduction, EXCEPT for preventive health checkup payments, which can be made in cash and still count within the ₹5,000 sub-limit.',
  },
  {
    q: 'Can I claim 80D for a top-up or super top-up health insurance policy?',
    a: 'Yes — a top-up or super top-up policy is still health insurance for 80D purposes, and its premium counts toward the same self+family or parents limit as your base policy, not a separate additional allowance. If you\'re already at your limit from a base policy\'s premium, an additional top-up premium adds nothing further to your deduction.',
  },
  {
    q: 'What happens if I pay a multi-year health insurance premium in one lump sum?',
    a: 'Section 80D(4A) specifically addresses this: a lump-sum premium covering more than one year is divided proportionately across the years the policy actually covers, and only that year\'s share is claimed as a deduction each year — not the full amount in the year you paid it. A ₹30,000 premium for 2 years of cover gives you ₹15,000 to claim in each of those two years, subject to your overall annual limit.',
  },
  {
    q: 'How is Section 80D different from Section 80DDB?',
    a: 'Section 80D covers your health insurance PREMIUM (the cost of maintaining a policy); Section 80DDB is a completely separate deduction for actual MEDICAL TREATMENT EXPENSES of specified critical illnesses (like cancer or chronic kidney failure) for yourself or a dependant, whether or not you have insurance, capped at ₹40,000 (₹1,00,000 for senior citizens) minus any insurance reimbursement received. The two aren\'t interchangeable and can both apply to the same taxpayer in the same year for different things.',
  },
  {
    q: 'Can an NRI claim 80D for health insurance premiums paid for parents living in India?',
    a: 'Yes — Section 80D doesn\'t require the taxpayer to be a resident, only that they\'re paying the premium for eligible family members (which includes resident Indian parents) out of income taxable in India, and that the payment is made through a non-cash mode. An NRI filing an Indian tax return can claim this the same way a resident taxpayer would.',
  },
  {
    q: 'Can a Hindu Undivided Family (HUF) claim a Section 80D deduction?',
    a: 'Yes — an HUF can claim up to ₹25,000 (₹50,000 if the insured member is a senior citizen) for health insurance premiums paid on behalf of any of its members, using the same limit structure as an individual\'s self+family claim. This is a separate, lesser-known category of 80D claimant beyond individual taxpayers.',
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
  name: 'Health Insurance 80D Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Health Insurance 80D Calculator', path: PATH },
])

export default function Section80DCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Health Insurance 80D Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏥</span> Financial hub
          </>
        }
        h1="Health Insurance 80D Calculator"
        subtitle="Work out your Section 80D tax deduction for health insurance premiums covering yourself, your family and your parents — including the preventive checkup sub-limit."
        stats={[
          { icon: '💰', big: '₹25,000', small: 'regular limit, each', tone: 'hub' },
          { icon: '👴', big: '₹50,000', small: 'senior citizen limit', tone: 'hub' },
          { icon: '🩺', big: '₹5,000', small: 'checkup, within the cap', tone: 'hub' },
          { icon: '📜', big: 'Old regime', small: 'only', tone: 'hub' },
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
            A {formatINR(20000)} self+family premium plus {formatINR(6000)} in preventive checkups
            (capped at {formatINR(5000)} within the limit) gives a self+family deduction of{' '}
            {formatINR(example.selfFamilyDeduction)}. Add a {formatINR(30000)} premium for senior
            citizen parents (their own {formatINR(50000)} limit) and the total deduction comes to{' '}
            <strong>{formatINR(example.totalDeduction)}</strong>.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your 80D deduction
          </h2>
          <Section80DCalculator />
        </section>

        <section aria-labelledby="family-scenarios" className="mb-10 scroll-mt-20">
          <h2 id="family-scenarios" className="font-display mb-4 text-2xl font-semibold">
            Total deduction by family composition
          </h2>
          <p className="text-ash/80">
            The self+family and parents limits stack independently, so your total possible
            deduction depends heavily on who you&apos;re insuring and whether they&apos;re senior citizens:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Family situation</th>
                  <th className="px-4 py-2 font-semibold">Self+family</th>
                  <th className="px-4 py-2 font-semibold">Parents</th>
                  <th className="px-4 py-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  { label: 'Self + spouse only (no seniors)', self: 20000, selfSenior: false, parents: 0, parentsSenior: false },
                  { label: 'Self + spouse + kids + senior parents', self: 22000, selfSenior: false, parents: 40000, parentsSenior: true },
                  { label: 'Senior self/spouse + senior parents', self: 35000, selfSenior: true, parents: 40000, parentsSenior: true },
                ].map((s) => {
                  const r = calculateSection80D(s.self, s.selfSenior, s.parents, s.parentsSenior, 0)
                  return (
                    <tr key={s.label}>
                      <td className="px-4 py-2 font-medium">{s.label}</td>
                      <td className="px-4 py-2 tabular-nums">{formatINR(r.selfFamilyDeduction)}</td>
                      <td className="px-4 py-2 tabular-nums">{formatINR(r.parentsDeduction)}</td>
                      <td className="px-4 py-2 tabular-nums font-semibold">{formatINR(r.totalDeduction)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ash/80">
            Insuring senior-citizen parents roughly doubles their share of the deduction versus
            non-senior parents at the same premium — a real reason to check whether your parents&apos;
            policy premium is being fully claimed.
          </p>
        </section>

        <FinancialCrossSell current="health-insurance-80d-calculator" />

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
            This tool is for illustration only and is not tax advice. Section 80D is available only under the old tax regime. Consult a tax professional before filing.
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
