import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import SurchargeCalculator from '@/components/calculators/SurchargeCalculator'
import { computeRegimeTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/surcharge-marginal-relief-calculator'

const example = computeRegimeTax(6000000, 'new')
const exampleJustOver = computeRegimeTax(5001000, 'new')

export const metadata: Metadata = {
  title: 'Surcharge & Marginal Relief Calculator 2026 — Income Tax India',
  description:
    'Free income tax surcharge calculator for India. Find your exact surcharge above ₹50 lakh, ₹1 crore and ₹2 crore, and how marginal relief caps it near each threshold.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is income tax surcharge, and who pays it?',
    a: 'Surcharge is an extra percentage ON TOP OF your calculated income tax (not on your income directly), charged once your taxable income crosses ₹50 lakh. It scales up in slabs — 10% above ₹50L, 15% above ₹1Cr, 25% above ₹2Cr, and (old regime only) 37% above ₹5Cr — so most taxpayers never encounter it at all.',
  },
  {
    q: 'Why does the new regime cap surcharge at 25% while the old regime goes up to 37%?',
    a: 'This was a deliberate change: capping the new regime\'s top surcharge at 25% (instead of the old regime\'s 37%) lowers the effective peak marginal tax rate from about 42.7% to 39% for very high earners who choose the new regime — one of the new regime\'s lesser-known advantages at the top end of the income scale, on top of its lower slab rates.',
  },
  {
    q: 'What is marginal relief on surcharge, and why does it exist?',
    a: 'Without marginal relief, someone earning ₹50,00,001 would suddenly owe 10% surcharge on their ENTIRE tax bill just for earning ₹1 more than someone at exactly ₹50,00,000 — a cliff-edge that could cost far more than the extra ₹1 earned. Marginal relief prevents this: it caps your extra tax (including surcharge) at exactly the amount by which your income exceeds the threshold, so crossing a surcharge threshold by a small margin never costs you more than that margin itself.',
  },
  {
    q: 'Does marginal relief apply at every surcharge threshold?',
    a: 'Yes — independently at each of ₹50L, ₹1Cr, ₹2Cr, and (old regime) ₹5Cr, evaluated at whichever threshold your income has most recently crossed. It only meaningfully helps taxpayers whose income is close to a threshold; someone earning ₹2 crore more than a threshold gets no relief, since their actual tax increase already exceeds the relief cap by a wide margin.',
  },
  {
    q: 'Is surcharge applied before or after the health and education cess?',
    a: 'Surcharge is calculated on your tax (after any 87A rebate and its own marginal relief), and the 4% cess is then applied on top of tax-plus-surcharge — so cess effectively taxes the surcharge too, not just the base income tax.',
  },
  {
    q: 'How does this interact with the Tax Regime Calculator?',
    a: 'Our New vs Old Tax Regime Calculator now automatically includes surcharge and its marginal relief in both regimes\' totals — this standalone calculator exists for anyone who wants to see the surcharge mechanism in isolation, with the exact rate, pre-relief amount, and relief applied all broken out separately.',
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
  name: 'Surcharge & Marginal Relief Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Surcharge & Marginal Relief Calculator', path: PATH },
])

export default function SurchargeCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Surcharge & Marginal Relief Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📊</span> Financial hub
          </>
        }
        h1="Surcharge & Marginal Relief Calculator"
        subtitle="Find your exact income tax surcharge above ₹50 lakh, ₹1 crore and ₹2 crore, and see how marginal relief caps the extra tax you owe near each threshold."
        stats={[
          { icon: '📈', big: '10% – 37%', small: 'surcharge slabs', tone: 'hub' },
          { icon: '🛡️', big: 'Marginal relief', small: 'at each threshold', tone: 'hub' },
          { icon: '🆚', big: '25% vs 37%', small: 'new vs old regime cap', tone: 'hub' },
          { icon: '💰', big: '₹50L+', small: 'where it starts', tone: 'hub' },
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
            On the new regime, a {formatINR(6000000)} gross income owes{' '}
            {formatINR(example.surcharge)} in surcharge (10%, since taxable income exceeds ₹50
            lakh), for a total tax of <strong>{formatINR(example.totalTax)}</strong> including
            cess. Someone earning just {formatINR(5001000)} — barely over the threshold — sees
            their surcharge almost entirely wiped out by marginal relief, paying only{' '}
            {formatINR(exampleJustOver.surchargeMarginalRelief)} less in relief than the
            unadjusted 10% would otherwise cost.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your surcharge
          </h2>
          <SurchargeCalculator />
        </section>

        <section aria-labelledby="slabs" className="mb-10 scroll-mt-20">
          <h2 id="slabs" className="font-display mb-4 text-2xl font-semibold">
            Surcharge slabs, old vs new regime
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Taxable income</th>
                  <th className="px-4 py-2 font-semibold">New regime</th>
                  <th className="px-4 py-2 font-semibold">Old regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Up to ₹50 lakh</td>
                  <td className="px-4 py-2" colSpan={2}>No surcharge</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">₹50 lakh – ₹1 crore</td>
                  <td className="px-4 py-2" colSpan={2}>10%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">₹1 – 2 crore</td>
                  <td className="px-4 py-2" colSpan={2}>15%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Above ₹2 crore</td>
                  <td className="px-4 py-2">25% (capped, stays 25% even above ₹5 crore)</td>
                  <td className="px-4 py-2">25% (rises to 37% above ₹5 crore)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="related" className="mb-10 scroll-mt-20">
          <h2 id="related" className="font-display mb-2 text-2xl font-semibold">
            Related calculators
          </h2>
          <p className="text-ash/80">
            Comparing your overall tax under both regimes? Our{' '}
            <Link href="/financial/new-vs-old-tax-regime-calculator" className="text-brass underline">
              New vs Old Tax Regime Calculator
            </Link>{' '}
            now includes this surcharge and marginal relief mechanism automatically in its
            comparison.
          </p>
        </section>

        <FinancialCrossSell current="surcharge-marginal-relief-calculator" />

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
            This tool is for general guidance only and is not tax advice. Consult a chartered accountant before filing, especially at high incomes.
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
