import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import GratuityCalculatorAdvanced from '@/components/calculators/GratuityCalculatorAdvanced'
import { calculateGratuity, calculateGratuityV2 } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/gratuity-calculator'

const example = calculateGratuity(50000, 10)
const exampleDeathGovt = calculateGratuityV2({
  scenario: 'death', lastDrawnSalary: 80000, yearsOfService: 8, employerCoverage: 'covered', employeeType: 'government',
})
const exampleDeathPrivate = calculateGratuityV2({
  scenario: 'death', lastDrawnSalary: 80000, yearsOfService: 8, employerCoverage: 'covered', employeeType: 'private',
})
const exampleFixedTerm = calculateGratuityV2({
  scenario: 'fixedTerm', lastDrawnSalary: 40000, yearsOfService: 2, employerCoverage: 'covered', employeeType: 'private',
})
const exampleNonCovered = calculateGratuityV2({
  scenario: 'retirement', lastDrawnSalary: 50000, yearsOfService: 10, employerCoverage: 'nonCovered', employeeType: 'private',
})

export const metadata: Metadata = {
  title: 'Gratuity Calculator 2026 — Retirement, Death & Fixed-Term Rules',
  description:
    'Free gratuity calculator for India. Compute retirement, death-in-service and fixed-term (2025 Labour Code) gratuity using the 15/26 formula, CCS death-gratuity slabs for government employees, and the correct statutory ceiling and tax treatment.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/financial/gratuity-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is the gratuity formula?',
    a: 'Under the Payment of Gratuity Act, gratuity = (15 / 26) × last drawn monthly Basic + DA × years of service. The 26 represents working days in a month and 15 is 15 days’ wages for each completed year.',
  },
  {
    q: 'How many years of service are needed for gratuity?',
    a: 'You generally need at least 5 years of continuous service. A part-year of more than 6 months counts as a full year for the calculation.',
  },
  {
    q: 'Is there a maximum gratuity amount?',
    a: 'Yes, and it differs by employer type: ₹20,00,000 for private-sector employees under the Payment of Gratuity Act, and ₹25,00,000 for government employees under the CCS Pension Rules (raised from ₹20,00,000 effective 1 January 2024). Any amount the formula computes above the applicable ceiling is capped at that ceiling.',
  },
  {
    q: 'Is gratuity taxable?',
    a: 'For government employees, gratuity is fully tax-exempt under Section 10(10)(i), regardless of amount. For private-sector employees covered under the Payment of Gratuity Act, it\'s exempt under Section 10(10)(ii) up to the statutory ₹20,00,000 ceiling or the amount actually received, whichever is lower — since this calculator already caps the computed gratuity at that same ceiling, the figure it shows is fully within the exempt limit.',
  },
  {
    q: 'Does gratuity apply to all employees?',
    a: 'The Payment of Gratuity Act applies to organisations with 10 or more employees. Employees covered by it become eligible after 5 years of continuous service (with exceptions for death or disability, where the 5-year requirement is waived) — and since 21 November 2025, fixed-term contract employees additionally qualify after just 1 year under Section 53 of the Code on Social Security, 2020.',
  },
  {
    q: 'How is death gratuity different from retirement gratuity?',
    a: 'The 5-year minimum service requirement is waived by law — gratuity is payable even if the employee dies in their very first year. For a private-sector employee, the same 15/26 (or 15/30) formula still applies. For a GOVERNMENT employee, a completely different service-linked slab table applies instead, under the CCS Pension Rules: 2× emoluments for under 1 year of service, 6× for 1-5 years, 12× for 5-11 years, 20× for 11-20 years, then half a month\'s emoluments per completed 6-month period beyond 20 years, capped at 33×.',
  },
  {
    q: 'What is the new fixed-term gratuity rule?',
    a: 'Effective 21 November 2025, when India\'s four central labour codes took effect, Section 53 of the Code on Social Security, 2020 gives fixed-term (contract) employees a route to gratuity after just 1 year of service instead of the usual 5 — a later period of 6 months or more rounds up to a full additional year, and the calculation otherwise uses the same 15/26-or-30 formula as retirement gratuity. This is a genuinely new entitlement for short-tenure contract employees who previously got nothing.',
  },
  {
    q: 'What counts as "last drawn salary" for gratuity?',
    a: 'It\'s your last drawn Basic pay plus Dearness Allowance (DA) — other components like HRA, bonus, and other allowances are typically excluded from the gratuity calculation base.',
  },
  {
    q: 'Does gratuity apply if I resign vs get terminated?',
    a: 'Generally yes, gratuity is payable on resignation too, provided you\'ve completed the minimum 5 years of continuous service — the entitlement isn\'t limited to retirement or layoff scenarios.',
  },
  {
    q: 'Why does the formula use 26 days instead of 30?',
    a: '26 represents the typical number of working days in a month under the Payment of Gratuity Act\'s calculation convention (excluding weekly offs), not the calendar month length — this is a fixed part of the statutory formula, not an assumption we\'ve added.',
  },
  {
    q: 'What if my company isn\'t covered under the Payment of Gratuity Act?',
    a: 'Many employers still pay gratuity voluntarily even if not statutorily covered, but the conventional calculation switches from the Act\'s 15/26 formula to a 15/30 formula (using calendar days instead of the 26-day working-month convention), which produces a somewhat lower figure for the same salary and tenure. Select "Not covered" in the calculator above to model this — check your specific employment terms to confirm which basis actually applies to you.',
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
  name: 'Gratuity Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Gratuity Calculator', path: PATH },
])

export default function GratuityCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Gratuity Calculator', href: '/financial/gratuity-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="Gratuity Calculator"
        subtitle={
          <>
            Work out your gratuity for retirement, death-in-service, or the new
            2025 fixed-term rule — with the correct formula, statutory ceiling
            and tax treatment for private-sector and government employees.
          </>
        }
        stats={[
          { icon: '🧮', big: '15 / 26', small: 'Standard formula basis', tone: 'hub' },
          { icon: '💀', big: 'CCS slabs', small: 'Govt death gratuity', tone: 'hub' },
          { icon: '📄', big: '1 yr', small: 'Fixed-term minimum (2025)', tone: 'hub' },
          { icon: '🧢', big: '₹20L / ₹25L', small: 'Private / govt ceiling', tone: 'hub' },
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
          For a last drawn Basic + DA of <strong>{formatINR(50000)}</strong> and{' '}
          <strong>10 years</strong> of service, gratuity = (15 ÷ 26) × 50,000 ×
          10 = <strong>{formatINR(example.gratuity)}</strong>.
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Calculate your gratuity
        </h2>
        <GratuityCalculatorAdvanced />
      </section>

      <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
        <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
          How the 15/26 formula works
        </h2>
        <p className="text-ash/80">
          The Payment of Gratuity Act fixes gratuity at 15 days&apos; wages
          for every completed year of service, using a 26-day working month
          as the base — not your calendar salary directly:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['15', 'days\' wages paid per year of service — the core entitlement.'],
            ['26', 'assumed working days in a month (excluding weekly offs) — this divides your monthly Basic + DA down to a daily rate.'],
            ['Basic + DA only', 'other components like HRA, bonus and allowances are excluded from the calculation base.'],
            ['6+ months rounds up', 'a part-year of more than 6 months counts as a full additional year of service.'],
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
          Two limits cap this formula in practice: you generally need{' '}
          <strong>5 years of continuous service</strong> to qualify at all
          (waived on death or disability), and the payout is capped at{' '}
          <strong>₹20,00,000</strong> regardless of how the formula computes
          — any amount above that depends on your employer&apos;s own policy,
          not the statutory Act.
        </p>
      </section>

      <section aria-labelledby="scenarios" className="mb-10 scroll-mt-20">
        <h2 id="scenarios" className="font-display mb-4 text-2xl font-semibold">
          Three Scenarios, Three Different Rules
        </h2>
        <p className="text-ash/80">
          &ldquo;Gratuity&rdquo; isn&apos;t always the same calculation — the
          scenario changes both the eligibility rule and, for one case, the
          formula itself:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Retirement / resignation', 'the standard case — requires 5+ years of continuous service, using the 15/26 (or 15/30) formula, capped at the statutory ceiling.'],
            ['Death gratuity', 'the 5-year minimum is waived by law — payable even if the employee dies in their first year. For a PRIVATE-sector employee, the same 15/26-or-30 formula applies. For a GOVERNMENT employee, a completely different formula applies instead: a service-linked slab table under the CCS Pension Rules (see below).'],
            ['Fixed-term gratuity (2025 rule)', 'under Section 53 of the Code on Social Security, 2020 — in force since 21 November 2025 — fixed-term contract employees get gratuity on the same 15/26-or-30 formula as retirement, but the minimum service drops to just 1 year instead of 5.'],
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

      <section aria-labelledby="death-gratuity" className="mb-10 scroll-mt-20">
        <h2 id="death-gratuity" className="font-display mb-4 text-2xl font-semibold">
          Death Gratuity: Government vs Private Formula
        </h2>
        <p className="text-ash/80">
          This is the one place the calculation genuinely diverges by
          employer type, not just the ceiling or tax treatment. For a
          government employee, the Central Civil Services (Pension) Rules
          use a service-linked slab table on &ldquo;emoluments&rdquo;
          (last drawn Basic + DA) instead of the 15/26 formula:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Service at death</th>
                <th className="px-4 py-2 text-right font-semibold">Gratuity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {[
                ['Less than 1 year', '2× emoluments'],
                ['1 to 5 years', '6× emoluments'],
                ['5 to 11 years', '12× emoluments'],
                ['11 to 20 years', '20× emoluments'],
                ['20+ years', '½ month\'s emoluments per completed 6-month period, capped at 33×'],
              ].map(([slab, rate]) => (
                <tr key={slab}>
                  <td className="px-4 py-2">{slab}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-ash/80">
          On a <strong>{formatINR(80000)}/month</strong> salary with{' '}
          <strong>8 years</strong> of service at death, a government
          employee&apos;s family receives{' '}
          <strong>{formatINR(exampleDeathGovt.gratuity)}</strong> (12×
          emoluments, per the 5-11 year slab) — a private-sector employee
          at the same salary and tenure receives{' '}
          <strong>{formatINR(exampleDeathPrivate.gratuity)}</strong> under
          the standard 15/26 formula instead. The government figure is
          also fully tax-exempt, capped at ₹25,00,000; the private figure
          is exempt up to ₹20,00,000.
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: don&apos;t apply the government slab table to a
          private-sector death-in-service case, or vice versa — they are
          two genuinely different legal regimes, not the same rule with
          different labels.
        </p>
      </section>

      <section aria-labelledby="fixed-term" className="mb-10 scroll-mt-20">
        <h2 id="fixed-term" className="font-display mb-2 text-2xl font-semibold">
          The New 2025 Fixed-Term Gratuity Rule
        </h2>
        <p className="text-ash/80">
          India&apos;s four central labour codes — including the Code on
          Social Security, 2020 — took effect on{' '}
          <strong>21 November 2025</strong>. Section 53 of that code
          waives the usual 5-year minimum for fixed-term (contract)
          employees specifically, requiring only{' '}
          <strong>1 year</strong> of service instead, with a later period
          of 6+ months rounding up to a full additional year — otherwise
          using the same 15/26-or-30 formula as retirement gratuity. A
          fixed-term employee on <strong>{formatINR(40000)}/month</strong>{' '}
          who completes <strong>2 years</strong> of a contract is now
          entitled to <strong>{formatINR(exampleFixedTerm.gratuity)}</strong>{' '}
          — an amount that simply wasn&apos;t payable at all under the
          old 5-year rule for a contract this short.
        </p>
      </section>

      <section aria-labelledby="coverage" className="mb-10 scroll-mt-20">
        <h2 id="coverage" className="font-display mb-2 text-2xl font-semibold">
          Act-Covered vs Non-Covered Employers
        </h2>
        <p className="text-ash/80">
          The 15/26 formula assumes your employer falls under the Payment
          of Gratuity Act (generally, organisations with 10 or more
          employees). If your employer isn&apos;t covered, many still pay
          gratuity voluntarily — but the conventional basis switches to a
          15/30 formula (using calendar days instead of the Act&apos;s
          26-day working-month convention), which produces a lower
          figure for the same salary and tenure: on{' '}
          <strong>{formatINR(50000)}/month</strong> and{' '}
          <strong>10 years</strong>, the 15/26 formula gives{' '}
          <strong>{formatINR(example.gratuity)}</strong>, while 15/30
          gives only <strong>{formatINR(exampleNonCovered.gratuity)}</strong>.
          Check your own employment terms rather than assuming — this is
          a real, material difference, not a rounding effect.
        </p>
      </section>

      <FinancialCrossSell current="gratuity-calculator" />

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
          This tool provides estimates for illustration only and is not legal or tax advice. Gratuity eligibility, the employer&apos;s Payment of Gratuity Act coverage status, and the applicable exemption ceiling depend on your specific employment terms — confirm with your employer&apos;s HR/payroll team or a professional before relying on these figures.
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
