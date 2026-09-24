import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import PageHero from '@/components/PageHero'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export const metadata: Metadata = {
  title: 'Financial Calculators — Loans, Investments, Tax & Insurance (India)',
  description:
    'Free Indian personal-finance calculators: home & personal loan EMI, PPF, FD, NPS, HRA, capital gains tax, GST, SIP, income tax regime and more — accurate, fast and mobile-friendly.',
  alternates: {
    canonical: `${SITE}/financial`,
    languages: getAlternateLanguages('/financial'),
  },
  openGraph: { url: `${SITE}/financial`, type: 'website', locale: 'en_IN' },
}

const cards = [
  {
    href: '/financial/home-loan-emi-calculator',
    emoji: '🏠',
    title: 'Home Loan EMI Calculator',
    body: 'Monthly EMI, total interest and a year-by-year principal-vs-interest breakdown.',
    cta: 'Open →',
  },
  {
    href: '/financial/personal-loan-emi-calculator',
    emoji: '💳',
    title: 'Personal Loan EMI Calculator',
    body: 'EMI and total interest on an unsecured personal loan.',
    cta: 'Open →',
  },
  {
    href: '/financial/ppf-calculator',
    emoji: '📮',
    title: 'PPF Calculator',
    body: 'Project your Public Provident Fund maturity value over the 15-year lock-in.',
    cta: 'Open →',
  },
  {
    href: '/financial/fd-calculator',
    emoji: '🏦',
    title: 'FD Calculator',
    body: 'Fixed deposit maturity value with quarterly, monthly or annual compounding.',
    cta: 'Open →',
  },
  {
    href: '/financial/hra-calculator',
    emoji: '🏠',
    title: 'HRA Calculator',
    body: 'Work out your tax-exempt House Rent Allowance under Section 10(13A).',
    cta: 'Open →',
  },
  {
    href: '/financial/capital-gains-tax-calculator',
    emoji: '📉',
    title: 'Capital Gains Tax Calculator',
    body: 'LTCG/STCG tax on listed equity shares and equity mutual funds.',
    cta: 'Open →',
  },
  {
    href: '/financial/nps-calculator',
    emoji: '🏛️',
    title: 'NPS Calculator',
    body: 'Project your National Pension System corpus and 2026 exit-rule split.',
    cta: 'Open →',
  },
  {
    href: '/financial/human-life-value-calculator',
    emoji: '🛡️',
    title: 'Human Life Value Calculator',
    body: 'Estimate how much life insurance cover your family would need.',
    cta: 'Open →',
  },
  {
    href: '/financial/gst-calculator',
    emoji: '🧾',
    title: 'GST Calculator',
    body: 'Add or remove GST for any slab, with CGST/SGST split.',
    cta: 'Open →',
  },
  {
    href: '/financial/sip-calculator',
    emoji: '📈',
    title: 'SIP Calculator',
    body: 'Project mutual fund SIP maturity value and gains, with a growth chart.',
    cta: 'Open →',
  },
  {
    href: '/financial/new-vs-old-tax-regime-calculator',
    emoji: '🏦',
    title: 'New vs Old Tax Regime',
    body: 'Compare income tax under both regimes for FY 2026-27 and see which wins.',
    cta: 'Open →',
  },
  {
    href: '/financial/gratuity-calculator',
    emoji: '💼',
    title: 'Gratuity Calculator',
    body: 'Compute gratuity from salary and service years using the 15/26 formula.',
    cta: 'Open →',
  },
  {
    href: '/financial/fire-calculator',
    emoji: '🔥',
    title: 'FIRE Calculator',
    body: 'Find your Financial Independence, Retire Early corpus and required SIP.',
    cta: 'Open →',
  },
  {
    href: '/financial/net-worth-calculator',
    emoji: '💰',
    title: 'Net Worth Calculator',
    body: 'Add up your assets, subtract your liabilities and loans.',
    cta: 'Open →',
  },
  {
    href: '/financial/crorepati-calculator',
    emoji: '💎',
    title: 'Crorepati Calculator',
    body: 'The monthly SIP needed to hit ₹1 crore — or any goal.',
    cta: 'Open →',
  },
  {
    href: '/financial/bh-series-calculator',
    emoji: '🚗',
    title: 'BH Series Calculator',
    body: 'Bharat Series vehicle registration tax, by price and fuel type.',
    cta: 'Open →',
  },
  {
    href: '/financial/ev-vs-fuel-cost-calculator',
    emoji: '⛽',
    title: 'EV vs Fuel Cost Calculator',
    body: 'Compare petrol, diesel, CNG and EV running costs side by side.',
    cta: 'Open →',
  },
  {
    href: '/financial/retirement-planner',
    emoji: '🌅',
    title: 'Retirement Planner',
    body: 'Inflation-adjusted corpus, with separate medical inflation.',
    cta: 'Open →',
  },
  {
    href: '/financial/epf-calculator',
    emoji: '🏢',
    title: 'EPF Calculator',
    body: "Project your Employees' Provident Fund corpus.",
    cta: 'Open →',
  },
  {
    href: '/financial/sukanya-samriddhi-calculator',
    emoji: '👧',
    title: 'Sukanya Samriddhi Yojana',
    body: "Project your girl child's SSY maturity value.",
    cta: 'Open →',
  },
  {
    href: '/financial/ctc-in-hand-salary-calculator',
    emoji: '💵',
    title: 'CTC to In-Hand Salary',
    body: 'What actually lands in your bank account from your CTC.',
    cta: 'Open →',
  },
  {
    href: '/financial/rent-vs-buy-calculator',
    emoji: '🏘️',
    title: 'Rent vs Buy Calculator',
    body: 'Which builds more wealth — renting or buying?',
    cta: 'Open →',
  },
  {
    href: '/financial/car-loan-emi-calculator',
    emoji: '🚙',
    title: 'Car Loan EMI Calculator',
    body: 'Monthly EMI for a new or used car loan.',
    cta: 'Open →',
  },
  {
    href: '/financial/two-wheeler-loan-emi-calculator',
    emoji: '🏍️',
    title: 'Two-Wheeler Loan EMI Calculator',
    body: 'Monthly EMI for a bike or scooter loan.',
    cta: 'Open →',
  },
  {
    href: '/financial/education-loan-emi-calculator',
    emoji: '🎓',
    title: 'Education Loan EMI Calculator',
    body: 'Monthly EMI plus the uncapped Section 80E benefit.',
    cta: 'Open →',
  },
  {
    href: '/financial/health-insurance-80d-calculator',
    emoji: '🏥',
    title: 'Health Insurance 80D Calculator',
    body: 'Your tax deduction for health insurance premiums.',
    cta: 'Open →',
  },
  {
    href: '/financial/surcharge-marginal-relief-calculator',
    emoji: '📊',
    title: 'Surcharge & Marginal Relief',
    body: 'Your exact surcharge above ₹50 lakh income.',
    cta: 'Open →',
  },
  {
    href: '/financial/rd-calculator',
    emoji: '🏦',
    title: 'Recurring Deposit Calculator',
    body: 'RD maturity value with quarterly compounding.',
    cta: 'Open →',
  },
  {
    href: '/financial/ncb-idv-calculator',
    emoji: '🚘',
    title: 'NCB & IDV Calculator',
    body: 'Motor insurance No-Claim Bonus and vehicle IDV.',
    cta: 'Open →',
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
])
const itemList = itemListLd(cards.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'Are these calculators updated for FY 2026-27?',
    a: 'Yes — the tax regime, capital gains tax and HRA calculators use current FY 2026-27 (AY 2027-28) rules, including the Budget 2024 LTCG/STCG rates and the 2026 NPS withdrawal-rule changes. GST, SIP, PPF, FD, EMI and gratuity calculators are formula-based against current law (e.g. the ₹20,00,000 gratuity ceiling, the current 7.1% PPF rate) and aren\'t tied to a specific financial year, though PPF\'s rate is reviewed quarterly.',
  },
  {
    q: 'Is this tax or investment advice?',
    a: 'No. These tools are for general guidance and illustration only. For SIP, actual market returns are not guaranteed; for tax, consult a professional before filing.',
  },
  {
    q: 'Do you store the numbers I enter?',
    a: 'No — there is no login and no server-side storage. Calculations run in your browser from the inputs you provide.',
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

export default function FinancialHubPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[{ label: 'Financial', href: '/financial' }]}
        badgeLabel={
          <>
            <span aria-hidden>🧮</span> Financial hub
          </>
        }
        h1="Financial Calculators"
        subtitle="Fast, accurate personal-finance tools for India — loan EMIs, PPF and FD growth, NPS, HRA, capital gains tax, GST, mutual fund SIPs, income tax regime comparison, gratuity, FIRE, net worth, and more. Free and updated for the current financial year."
        stats={[
          { icon: '🧮', big: '29', small: 'Calculators', tone: 'hub' },
          { icon: '📅', big: 'FY 2026-27', small: 'Current year', tone: 'hub' },
          { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
          { icon: '🇮🇳', big: 'India', small: 'Coverage', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section className="mb-10 grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col rounded-2xl border border-hairline bg-paper p-6 transition hover:border-brass/30 hover:shadow-sm"
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className="mt-3 text-sm font-semibold text-brass">
              {c.cta}
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="why" className="mb-10">
        <h2 id="why" className="font-display mb-4 text-2xl font-semibold">
          One platform for bills and money
        </h2>
        <p className="text-ash/80">
          DesiMetrics started with electricity bills and now covers the everyday
          numbers Indian households search for most — from what your home or
          personal loan EMI will be, to how much your PPF or FD could grow, what
          your NPS corpus and exit split look like under the 2026 rules, how much
          HRA and capital gains tax you owe, which tax regime saves you more, how
          much life cover your family would actually need, your FIRE number and
          total net worth, and even your Bharat-series vehicle registration tax.
          Same clean, no-login tools, all in one place.
        </p>
      </section>

      <section aria-labelledby="methodology" className="mb-10">
        <h2 id="methodology" className="font-display mb-2 text-xl font-bold text-ink-navy">
          Our methodology
        </h2>
        <p className="text-ash/80">
          Figures here are checked against the relevant official sources
          where applicable — GST slabs against GST Council/CBIC
          notifications, income tax and capital gains rules against the
          Finance Act/CBDT (including the Budget 2024 LTCG/STCG revisions),
          NPS withdrawal rules against PFRDA&apos;s 2026 amendments, PPF
          against the current quarterly-notified small-savings rate,
          gratuity against the Payment of Gratuity Act, and BH-series vehicle
          tax against MoRTH Rule 51B. FIRE, net worth and retirement-planning
          figures use standard, widely-taught financial-planning
          methodologies rather than a single official source — age-based
          benchmarks shown alongside them are commonly cited rules of thumb,
          not government statistics. Tax law and rates change periodically;
          for anything with real financial
          consequences (filing, invoicing, a major investment decision),
          verify against the current official notification or a
          professional rather than relying solely on any calculator. See
          our{' '}
          <Link href="/methodology" className="text-brass underline">
            sitewide methodology page
          </Link>{' '}
          for how we source and verify data generally.
        </p>
      </section>

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
      </section>

      <CrossHubLinks current="financial" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
    </>
  )
}
