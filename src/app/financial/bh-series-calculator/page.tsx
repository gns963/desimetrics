import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import BhSeriesCalculator from '@/components/calculators/BhSeriesCalculator'
import { calculateBhSeriesTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/bh-series-calculator'

const example = calculateBhSeriesTax(1200000, 'petrol')

export const metadata: Metadata = {
  title: 'BH Series Calculator 2026 — Bharat Series Vehicle Registration Tax',
  description:
    'Free BH (Bharat) Series registration tax calculator for India. Find the 2-year instalment tax on your vehicle under MoRTH Rule 51B, by invoice price and fuel type.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is BH (Bharat) Series registration, and who is it for?',
    a: 'BH-series is a special vehicle registration mark that lets you keep the same registration number when you relocate across states, without re-registering the vehicle each time. It\'s available to Central/state government employees, defence personnel, and employees of private companies that have offices in 4 or more states/UTs — self-employed individuals and freelancers aren\'t eligible. Private-sector applicants need to submit Form 60 from their employer confirming this multi-state presence.',
  },
  {
    q: 'How is the BH-series tax calculated?',
    a: 'Under MoRTH Rule 51B (Central Motor Vehicles Rules, 1989), the tax for a 2-year block is: invoice price (excluding GST) × the applicable slab percentage × 1.25 × 2, divided by 15. The slab percentage depends on your vehicle\'s price band (up to ₹10 lakh, ₹10-20 lakh, or above ₹20 lakh) and fuel type — petrol/CNG, diesel, or electric.',
  },
  {
    q: 'Why does the tax slab differ by fuel type at the same price?',
    a: 'It\'s a deliberate policy incentive: electric vehicles get the lowest slab at every price band (6-10%), petrol/CNG sits in the middle (8-12%), and diesel carries the highest slab (10-14%) — a roughly 2 percentage-point step between each, nudging buyers toward cleaner fuel types even within the BH-series scheme.',
  },
  {
    q: 'How is the tax actually paid — one lump sum or instalments?',
    a: 'In 2-year instalments for the vehicle\'s first 14 years (7 payments total), then annually after that at roughly half the biennial rate. This differs from normal state registration, which is usually a single one-time payment — BH-series trades a lower per-instalment amount for periodic recurring payments over the vehicle\'s life.',
  },
  {
    q: 'Is BH-series tax cheaper than normal state road tax overall?',
    a: 'It depends on the state and how long you keep the vehicle — BH-series is designed to be revenue-neutral-ish on average nationally, not necessarily cheaper than every state\'s own road tax. Its real advantage isn\'t the tax amount, it\'s avoiding re-registration (and re-paying road tax again) every time you relocate to a different state for work.',
  },
  {
    q: 'Can I switch my existing vehicle to a BH-series number?',
    a: 'Generally no — BH-series is assigned at the time of new vehicle registration, based on your eligibility (employer/government status) at that time. Converting an already-registered vehicle to BH-series after the fact isn\'t part of the standard process; check with your RTO for any exceptions.',
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
  name: 'BH Series Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'BH Series Calculator', path: PATH },
])

export default function BhSeriesCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'BH Series Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🚗</span> Financial hub
          </>
        }
        h1="BH Series Calculator"
        subtitle="Calculate your Bharat Series vehicle registration tax under MoRTH's national formula — paid in 2-year instalments instead of one lump sum."
        stats={[
          { icon: '📜', big: 'Rule 51B', small: 'MoRTH, CMV Rules 1989', tone: 'hub' },
          { icon: '🌏', big: 'National', small: 'Not state-dependent', tone: 'hub' },
          { icon: '📅', big: '2-year', small: 'instalments, 14 years', tone: 'hub' },
          { icon: '🔋', big: 'EV discount', small: 'Lowest slab at every band', tone: 'hub' },
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
            A petrol vehicle with a <strong>{formatINR(1200000)}</strong> invoice price (excluding
            GST) falls in the {example.slabPercent}% slab, giving a 2-year instalment of{' '}
            <strong>{formatINR(example.biennialTax)}</strong> — about {formatINR(example.totalTaxOverLifetime)} in
            total tax over 14 years of ownership.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your BH-series tax
          </h2>
          <BhSeriesCalculator />
        </section>

        <section aria-labelledby="slab-table" className="mb-10 scroll-mt-20">
          <h2 id="slab-table" className="font-display mb-4 text-2xl font-semibold">
            BH-series tax slabs by price band and fuel type
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Invoice price band</th>
                  <th className="px-4 py-2 font-semibold">Petrol/CNG</th>
                  <th className="px-4 py-2 font-semibold">Diesel</th>
                  <th className="px-4 py-2 font-semibold">Electric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Up to ₹10 lakh</td>
                  <td className="px-4 py-2">8%</td>
                  <td className="px-4 py-2">10%</td>
                  <td className="px-4 py-2">6%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">₹10–20 lakh</td>
                  <td className="px-4 py-2">10%</td>
                  <td className="px-4 py-2">12%</td>
                  <td className="px-4 py-2">8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Above ₹20 lakh</td>
                  <td className="px-4 py-2">12%</td>
                  <td className="px-4 py-2">14%</td>
                  <td className="px-4 py-2">10%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ash/50">
            Slabs are nationally uniform under MoRTH Rule 51B, unlike normal state road tax.
          </p>
        </section>

        <FinancialCrossSell current="bh-series-calculator" />

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
            This tool provides estimates for illustration only and is not legal advice. Confirm the exact figure and current eligibility criteria with your RTO before applying or paying.
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
