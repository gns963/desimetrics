import Link from 'next/link'

const TOOLS = [
  {
    slug: 'gst-calculator',
    emoji: '🧾',
    title: 'GST Calculator',
    body: 'Add or remove GST for any slab, with CGST/SGST split.',
  },
  {
    slug: 'sip-calculator',
    emoji: '📈',
    title: 'SIP Calculator',
    body: 'Project mutual fund SIP maturity value and gains.',
  },
  {
    slug: 'new-vs-old-tax-regime-calculator',
    emoji: '🏦',
    title: 'New vs Old Tax Regime',
    body: 'Compare income tax under both regimes for FY 2026-27.',
  },
  {
    slug: 'gratuity-calculator',
    emoji: '💼',
    title: 'Gratuity Calculator',
    body: 'Compute gratuity from salary and years of service.',
  },
  {
    slug: 'home-loan-emi-calculator',
    emoji: '🏠',
    title: 'Home Loan EMI Calculator',
    body: 'Monthly EMI, total interest and a year-by-year breakdown.',
  },
  {
    slug: 'personal-loan-emi-calculator',
    emoji: '💳',
    title: 'Personal Loan EMI Calculator',
    body: 'EMI and total interest on an unsecured personal loan.',
  },
  {
    slug: 'ppf-calculator',
    emoji: '📮',
    title: 'PPF Calculator',
    body: 'Project your Public Provident Fund maturity value.',
  },
  {
    slug: 'fd-calculator',
    emoji: '🏦',
    title: 'FD Calculator',
    body: 'Fixed deposit maturity value with your choice of compounding.',
  },
  {
    slug: 'hra-calculator',
    emoji: '🏠',
    title: 'HRA Calculator',
    body: 'Work out your tax-exempt House Rent Allowance.',
  },
  {
    slug: 'capital-gains-tax-calculator',
    emoji: '📉',
    title: 'Capital Gains Tax Calculator',
    body: 'LTCG/STCG tax on listed equity shares and mutual funds.',
  },
  {
    slug: 'nps-calculator',
    emoji: '🏛️',
    title: 'NPS Calculator',
    body: 'Project your National Pension System corpus and exit split.',
  },
  {
    slug: 'human-life-value-calculator',
    emoji: '🛡️',
    title: 'Human Life Value Calculator',
    body: 'Estimate how much life insurance cover your family needs.',
  },
  {
    slug: 'fire-calculator',
    emoji: '🔥',
    title: 'FIRE Calculator',
    body: 'Find your Financial Independence, Retire Early number.',
  },
  {
    slug: 'net-worth-calculator',
    emoji: '💰',
    title: 'Net Worth Calculator',
    body: 'Add up your assets, subtract your liabilities.',
  },
  {
    slug: 'crorepati-calculator',
    emoji: '💎',
    title: 'Crorepati Calculator',
    body: 'The monthly SIP needed to hit ₹1 crore or any goal.',
  },
  {
    slug: 'bh-series-calculator',
    emoji: '🚗',
    title: 'BH Series Calculator',
    body: 'Bharat Series vehicle registration tax, by price and fuel.',
  },
  {
    slug: 'ev-vs-fuel-cost-calculator',
    emoji: '⛽',
    title: 'EV vs Fuel Cost Calculator',
    body: 'Compare petrol, diesel, CNG and EV running costs.',
  },
  {
    slug: 'retirement-planner',
    emoji: '🌅',
    title: 'Retirement Planner',
    body: 'Inflation-adjusted corpus, with separate medical inflation.',
  },
] as const

export default function FinancialCrossSell({ current }: { current: string }) {
  const others = TOOLS.filter((t) => t.slug !== current)
  return (
    <section aria-labelledby="related" className="mb-10">
      <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
        Other financial calculators
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {others.map((t) => (
          <Link
            key={t.slug}
            href={`/financial/${t.slug}`}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-financial/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>
              {t.emoji}
            </span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {t.title}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {t.body}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
