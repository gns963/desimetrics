import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import GujaratRoadTaxCalculator from '@/components/calculators/GujaratRoadTaxCalculator'
import { calculateBhSeriesTax, calculateGujaratRoadTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/gujarat-road-tax-calculator'

const example = calculateGujaratRoadTax(1200000, 'petrol')
const exampleBh = calculateBhSeriesTax(1200000, 'petrol')

export const metadata: Metadata = {
  title: 'Gujarat Road Tax Calculator 2026 — Vehicle Registration Tax (India)',
  description:
    'Free Gujarat road tax calculator. Find the flat 6% one-time vehicle registration tax for petrol, diesel and CNG cars, verified against the official Gujarat transport department rate, plus a BH-series comparison.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is Gujarat road tax calculated?',
    a: 'Gujarat charges a flat 6% one-time road tax on your vehicle\'s price for private petrol, diesel and CNG cars — there are no price-band slabs like several other states use, making it one of the simplest road tax structures in India to calculate.',
  },
  {
    q: 'Why does DesiMetrics only cover Gujarat for road tax, and not other states?',
    a: 'We looked. Road tax rates for most Indian states exist only as scanned-image PDFs or documents we couldn\'t verify against a genuine primary source, even after specifically searching official .gov.in domains — the same reason a general "road tax calculator" spanning many states doesn\'t exist on this site. Gujarat is the one state whose current rate is published in a machine-readable format on the official Commissionerate of Transport website, so it\'s the one we can verify to our standard rather than guess at.',
  },
  {
    q: 'What is the current EV road tax rate in Gujarat?',
    a: 'Not confirmed. Gujarat cut EV road tax to 1% (from 6%), but that concession expired on 31 March 2026. As of this writing, no replacement rate has been formally notified — press reports mention a possible future zero-tax policy, but nothing is confirmed. Check the Vahan portal or Gujarat\'s transport department directly before buying an EV.',
  },
  {
    q: 'Does Gujarat road tax apply to the ex-showroom price or the on-road price?',
    a: 'It applies to the vehicle\'s price as declared for registration purposes, which is generally the ex-showroom price before other on-road costs (insurance, registration fees) are added — check your specific invoice, since dealer-quoted "on-road price" figures sometimes already include an estimate of this tax.',
  },
  {
    q: 'Is Gujarat road tax a one-time payment or recurring?',
    a: 'One-time — unlike an annual property tax, Gujarat road tax (like most states\' private-vehicle road tax) is paid once at registration and covers the vehicle for its registered lifetime, with no further recurring road tax due afterward for a privately owned car.',
  },
  {
    q: 'Should I register normally in Gujarat or choose BH-series instead?',
    a: 'BH-series only makes sense if you\'re actually eligible (government/defence employees, or private-sector employees whose employer has offices in 4 or more states/UTs) and you genuinely expect to relocate across states during your ownership — its advantage is avoiding re-registration tax when you move, not a lower total tax bill. See our BH Series Calculator for the exact comparison figure for your vehicle.',
  },
  {
    q: 'Do I still pay Gujarat road tax if I buy a used car?',
    a: 'A used car already has road tax paid by its original owner for the vehicle\'s registered life in that state — you don\'t pay it again on purchase within Gujarat. Moving a used car INTO Gujarat from another state\'s registration is a different process (re-registration) with its own rules, not covered by this calculator.',
  },
  {
    q: 'Are there any road tax exemptions in Gujarat?',
    a: 'Beyond the now-expired EV concession, specific exemption categories (such as for certain government, disability-adapted, or agricultural vehicles) may exist under Gujarat\'s Motor Vehicles Taxation Act — these are narrow, category-specific exemptions, not general discounts, so check with your RTO if you believe a specific exemption applies to your situation.',
  },
  {
    q: 'How does Gujarat\'s 6% rate compare to other states?',
    a: 'Reported rates elsewhere in India commonly range from roughly 6% to 15% of vehicle price, often rising in slabs for costlier vehicles — but we could not verify most other states\' exact current rates to our own standard (see above), so treat any specific comparison figure you see for another state with caution unless it cites an official source.',
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
  name: 'Gujarat Road Tax Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'IN-GJ',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Gujarat Road Tax Calculator', path: PATH },
])

export default function GujaratRoadTaxCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Gujarat Road Tax Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🚗</span> Financial hub
          </>
        }
        h1="Gujarat Road Tax Calculator"
        subtitle="Find your flat 6% one-time Gujarat vehicle registration tax, verified against the official transport department rate — plus a comparison against BH-series registration."
        stats={[
          { icon: '📊', big: '6%', small: 'flat rate, no slabs', tone: 'hub' },
          { icon: '✅', big: 'Verified', small: 'cot.gujarat.gov.in', tone: 'hub' },
          { icon: '🔋', big: 'EV rate', small: 'unconfirmed since Mar 2026', tone: 'hub' },
          { icon: '🆚', big: 'BH-series', small: 'comparison included', tone: 'hub' },
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
            A {formatINR(1200000)} petrol car registered in Gujarat pays a flat 6% road tax of{' '}
            <strong>{formatINR(example.roadTax ?? 0)}</strong>, one-time. The same vehicle under
            BH-series registration would pay {formatINR(exampleBh.biennialTax)} every 2 years —
            {formatINR(exampleBh.totalTaxOverLifetime)} in total over 14 years — which only makes
            sense if you actually qualify for BH-series and expect to relocate across states.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your Gujarat road tax
          </h2>
          <GujaratRoadTaxCalculator />
        </section>

        <section aria-labelledby="why-gujarat-only" className="mb-10 scroll-mt-20">
          <h2 id="why-gujarat-only" className="font-display mb-4 text-2xl font-semibold">
            Why only Gujarat? A note on verification
          </h2>
          <p className="text-ash/80">
            We looked at road tax rates across 15 major states before publishing anything. Most
            official rate documents turned out to be scanned images or embedded graphics with no
            extractable text — a document-format problem, not a lack of effort — and secondary
            sources routinely disagreed with each other on the same state&apos;s rate. Gujarat is
            the one state where the actual rate is published in a clean, readable format directly on{' '}
            <a href="https://cot.gujarat.gov.in" target="_blank" rel="noopener noreferrer" className="text-brass underline">
              the Commissionerate of Transport&apos;s own site
            </a>
            . We would rather cover one state accurately than many states approximately — see our{' '}
            <Link href="/methodology" className="text-brass underline">
              methodology
            </Link>{' '}
            for how we make these calls generally.
          </p>
        </section>

        <section aria-labelledby="maharashtra-ev" className="mb-10 scroll-mt-20">
          <h2 id="maharashtra-ev" className="font-display mb-4 text-2xl font-semibold">
            Buying an EV in Maharashtra instead?
          </h2>
          <p className="text-ash/80">
            Maharashtra offers a genuinely verified, currently active benefit worth knowing about:
            under its EV Policy 2025 (effective 1 April 2025 to 31 March 2030), electric vehicles
            get a <strong>100% road tax exemption</strong> — a full waiver, not a reduced rate,
            confirmed via an official government resolution and corroborated across multiple
            independent sources. We haven&apos;t built a full Maharashtra calculator since its
            general petrol/diesel slabs aren&apos;t independently verifiable to our standard, but
            this specific EV exemption is solid and worth factoring in if you&apos;re comparing
            states for an EV purchase.
          </p>
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Related calculators
          </h2>
          <p className="text-ash/80">
            Comparing against BH-series in detail, or checking a different price/fuel combination?
            See our{' '}
            <Link href="/financial/bh-series-calculator" className="text-brass underline">
              BH Series Calculator
            </Link>
            . Buying an EV and want to compare its running cost too, not just the registration tax?
            Our{' '}
            <Link href="/financial/ev-vs-fuel-cost-calculator" className="text-brass underline">
              EV vs Fuel Cost Calculator
            </Link>{' '}
            compares petrol, diesel, CNG and EV running costs side by side.
          </p>
        </section>

        <FinancialCrossSell current="gujarat-road-tax-calculator" />

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
            This tool provides estimates for illustration only and is not legal advice. Confirm the exact figure and current EV rate policy with the Gujarat transport department or your RTO before paying.
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
