import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import HraCalculator from '@/components/calculators/HraCalculator'
import { calculateHraExemption } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/hra-calculator'

const example = calculateHraExemption(600000, 300000, 300000, true)

export const metadata: Metadata = {
  title: 'HRA Calculator 2026 — House Rent Allowance Tax Exemption',
  description:
    'Free HRA calculator for India. Enter your basic salary, HRA received and rent paid to see your tax-exempt HRA amount under Section 10(13A), for metro and non-metro cities.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is HRA exemption calculated?',
    a: 'Under Section 10(13A) and Rule 2A, the exempt amount is the LEAST of three figures: (a) the actual HRA you receive from your employer, (b) the rent you actually pay minus 10% of your basic salary (plus dearness allowance, if it counts toward retirement benefits), and (c) 50% of your basic salary if you live in a metro city (Delhi, Mumbai, Kolkata or Chennai) or 40% if you live anywhere else. Whichever of these three is smallest is what you get to exclude from taxable income — the rest of your HRA is taxed as normal salary income.',
  },
  {
    q: 'Is HRA exemption available under the new tax regime?',
    a: 'No. HRA exemption is only available under the old tax regime. If you\'ve opted for the new regime (or your employer defaults you into it), your full HRA is taxable regardless of rent paid — this is one of the most common deductions people give up without realising it when switching regimes. Run both scenarios on our New vs Old Tax Regime Calculator before deciding which one actually saves you more.',
  },
  {
    q: 'Which cities count as "metro" for the higher 50% HRA limit?',
    a: 'Only four: Delhi, Mumbai, Kolkata and Chennai. Every other city in India — including large ones like Bengaluru, Hyderabad, Pune and Ahmedabad — falls under the 40%-of-basic non-metro limit for HRA purposes, even though cost of living in those cities can be comparable to the four official metros.',
  },
  {
    q: 'Can I claim HRA exemption if I pay rent to my parents?',
    a: 'Yes, as long as it\'s a genuine arrangement — you actually transfer rent (ideally via bank transfer, not cash, for a paper trail), your parent(s) own the property, and they declare the rent received as taxable income under "Income from House Property" on their own return. This is a legitimate and commonly used structure, but it only works if your parents genuinely own the house you\'re living in — you can\'t claim HRA on a property you or your spouse owns.',
  },
  {
    q: 'What documents do I need to claim HRA?',
    a: 'Rent receipts for each month (or a rent agreement covering the period) are the baseline proof most employers ask for during the year to avoid excess TDS deduction. If your annual rent exceeds ₹1,00,000, you additionally need your landlord\'s PAN — without it, most employers will not process the HRA exemption in your monthly TDS calculation, though you can still claim it directly when filing your return with supporting evidence.',
  },
  {
    q: "What if my salary doesn't include an HRA component but I pay rent?",
    a: 'You can still claim a deduction under Section 80GG instead, capped at the lowest of: ₹5,000/month, 25% of total income, or rent paid minus 10% of total income — this is meant for self-employed individuals or salaried employees whose salary structure has no HRA component. It is a smaller benefit than a proper HRA exemption and has its own eligibility conditions (you, your spouse or minor child must not own residential property in the city you work in).',
  },
  {
    q: 'Can I claim both HRA exemption and home loan interest deduction?',
    a: 'Yes, but usually only convincingly if the two properties are in different cities — for example, you own a home loan-funded flat in your hometown (rented out or vacant) while renting a place near your workplace in a different city. Claiming both for the same city, on the same property, or without a genuine reason for renting despite owning invites scrutiny; keep supporting documentation (loan certificate, rent receipts, reason for the arrangement) if you do this.',
  },
  {
    q: 'Does my landlord have to pay tax on the rent I pay them?',
    a: 'Yes, rental income is taxable in the landlord\'s hands under "Income from House Property," regardless of whether you claim HRA exemption on your side. Separately, if you (the tenant) pay more than ₹50,000/month in rent, you\'re required to deduct TDS at 2% under Section 194-IB before paying your landlord, even if you\'re an individual not otherwise required to deduct TDS — a rule many salaried tenants aren\'t aware applies to them.',
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
  name: 'HRA Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'HRA Calculator', path: PATH },
])

export default function HraCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'HRA Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏠</span> Financial hub
          </>
        }
        h1="HRA Calculator"
        subtitle="Work out how much of your House Rent Allowance is tax-exempt under Section 10(13A). Enter your basic salary, HRA received and rent paid to see the exempt amount and the taxable balance."
        stats={[
          { icon: '📜', big: 'Sec 10(13A)', small: 'Governing tax law', tone: 'hub' },
          { icon: '🏙️', big: '50% / 40%', small: 'Metro / non-metro limit', tone: 'hub' },
          { icon: '⚠️', big: 'Old regime only', small: 'Not available under new regime', tone: 'hub' },
          { icon: '🧮', big: 'Least of 3', small: 'Exemption method', tone: 'hub' },
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
            On a <strong>{formatINR(50000)}/month</strong> basic salary in a metro city, receiving{' '}
            <strong>{formatINR(25000)}/month</strong> HRA and paying{' '}
            <strong>{formatINR(25000)}/month</strong> rent, the annual exempt HRA works out to{' '}
            <strong>{formatINR(example.exemptAmount)}</strong> — the remaining{' '}
            {formatINR(example.taxableHra)} of HRA received is added to taxable income.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your HRA exemption
          </h2>
          <HraCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
            How the exemption is calculated
          </h2>
          <p className="text-ash/80">
            The exempt amount is the <strong>smallest</strong> of three
            separate figures — not the sum, and not automatically the full
            HRA you receive:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Actual HRA received', 'the HRA component your employer actually pays you, as shown on your payslip and Form 16.'],
              ['Rent paid minus 10% of basic', 'the logic here is that the first 10% of your basic salary\'s worth of rent isn\'t considered a genuine burden — only rent above that threshold counts toward the exemption.'],
              ['City-based percentage of basic', '50% of basic salary if you live in Delhi, Mumbai, Kolkata or Chennai; 40% for every other city, reflecting the (dated but still legally applied) assumption that housing costs more in the four original metros.'],
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
            A practical consequence: if you receive a large HRA but pay
            little or no rent, your exemption is capped by rule (b) — near
            zero — regardless of how generous your employer&apos;s HRA
            component looks on paper. Renting more than your employer&apos;s
            HRA component covers doesn&apos;t help either, since rule (a)
            caps you at the HRA actually received.
          </p>
        </section>

        <section aria-labelledby="regime" className="mb-10 scroll-mt-20">
          <h2 id="regime" className="font-display mb-2 text-2xl font-semibold">
            HRA and the new tax regime
          </h2>
          <p className="text-ash/80">
            This exemption is only available if you file (or your employer
            deducts TDS) under the <strong>old tax regime</strong>. Under
            the new regime, your entire HRA is taxable as regular salary —
            no exemption at all, regardless of rent paid. For someone
            paying substantial rent in a metro city, this can be the single
            biggest reason the old regime still comes out ahead despite the
            new regime&apos;s lower slab rates. Compare your specific
            numbers on our{' '}
            <Link href="/financial/new-vs-old-tax-regime-calculator" className="text-brass underline">
              New vs Old Tax Regime Calculator
            </Link>{' '}
            before choosing.
          </p>
        </section>

        <FinancialCrossSell current="hra-calculator" />

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
            This tool provides estimates for illustration only and is not tax advice. Confirm eligibility and documentation requirements with your employer’s payroll team or a tax professional.
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
