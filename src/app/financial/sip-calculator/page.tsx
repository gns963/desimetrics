import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import SipCalculator from '@/components/calculators/SipCalculator'
import { calculateSip, calculateSipRealAndPostTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/sip-calculator'

const example = calculateSipRealAndPostTax(10000, 12, 10, 6)
const tenureTable = [5, 10, 15, 20, 25].map((years) => ({
  years,
  ...calculateSip(10000, 12, years),
}))
const exampleShort = calculateSipRealAndPostTax(8000, 12, 15, 6)
const exampleMedium = calculateSipRealAndPostTax(6000, 11, 12, 6)
const exampleLong = calculateSipRealAndPostTax(20000, 11, 20, 6)

export const metadata: Metadata = {
  title: 'SIP Calculator 2026 — Nominal, Real & Post-Tax Maturity Value',
  description:
    'Free SIP calculator for India. Project your mutual fund SIP maturity value, then see two figures most calculators skip: the inflation-adjusted real value and the post-tax corpus after LTCG.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/financial/sip-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is SIP maturity value calculated?',
    a: 'Using the future value of a monthly annuity: M = P × [((1+i)^n − 1) / i] × (1+i), where P is your fixed monthly instalment, i is the monthly return (annual rate ÷ 12) and n is the number of months invested. Each instalment compounds for a different length of time — your first one earns returns for the full duration, your last one for barely a month — which is exactly what this formula captures rather than simple multiplication.',
  },
  {
    q: 'Why is the real value so much lower than the nominal maturity value?',
    a: 'Inflation steadily erodes purchasing power, and the effect compounds over long tenures just like returns do — the real value divides your nominal corpus by (1 + inflation rate)^years. At 6% assumed inflation, a corpus that takes 15 years to build is worth roughly 40-45% of its nominal figure in today\'s money, and over 20+ years the gap widens further, sometimes leaving the real value under a third of the nominal headline number. Planning against the real value, not the impressive-looking nominal figure, is the only way to know if a SIP will actually meet a real-world goal like a child\'s education or a retirement corpus.',
  },
  {
    q: 'How much tax will I actually pay on my SIP returns?',
    a: 'For an equity mutual fund SIP, gains are taxed as long-term capital gains (LTCG) at 12.5% on the amount above a ₹1,25,000 exemption per financial year, per the Budget 2024 rules — see our Capital Gains Tax Calculator for the general mechanism. This calculator applies that same rule to your total SIP gain at redemption to estimate a post-tax corpus. In reality, since SIP instalments are bought at different times, technically each instalment\'s gain is taxed only once it individually crosses 12 months — this calculator simplifies by treating the whole redemption as one long-term sale, which is accurate for the bulk of a multi-year SIP and is the same simplification virtually every SIP calculator makes.',
  },
  {
    q: 'What return rate should I actually assume?',
    a: 'For a long-term equity SIP, 10-13% annually is a realistic planning range — Indian equity indices have historically delivered around 12% over multi-decade periods, though with substantial year-to-year swings, including negative years. Avoid anchoring to the best 3-5 year stretch you\'ve seen quoted; a conservative assumption protects you from under-saving if actual returns disappoint, while testing a range (say 10% and 13%) shows how sensitive your goal is to the return assumption.',
  },
  {
    q: 'Does this calculator account for the fund\'s expense ratio?',
    a: 'No — enter a net return assumption (after expenses) rather than the fund\'s gross benchmark return. If you expect a fund\'s underlying index or strategy to return 12% and the fund charges a 1% expense ratio, use 11% as your input. Expense ratios compound the same way returns do, so even a seemingly small 0.5-1% annual difference — the typical gap between a direct and a regular plan — can add up to a materially different corpus over 15-20 years.',
  },
  {
    q: 'Is a SIP better than investing a lump sum?',
    a: 'They suit different situations rather than one being universally better. A SIP spreads investment across time, which gives you rupee-cost averaging (buying more units when prices are low, fewer when high) and removes the pressure of timing a single large entry — this fits most salaried investors building wealth from monthly income. A lump sum deploys capital immediately and can outperform in a steadily rising market, but carries more timing risk since the entire amount is exposed to whatever the market does right after you invest. For most people investing out of monthly salary rather than a windfall, a SIP is the natural, lower-stress default.',
  },
  {
    q: 'What is rupee-cost averaging, in plain terms?',
    a: 'It\'s the natural side effect of investing the same fixed amount at regular intervals regardless of the market level — your fixed monthly amount buys more units when the market (and unit price) is down, and fewer units when it\'s up, which averages out your purchase cost over time without requiring you to predict market direction. This is most valuable precisely during volatile or falling markets, since that\'s when your fixed instalment quietly accumulates the most units at the cheapest prices — a benefit that\'s lost entirely if you stop contributing during a downturn.',
  },
  {
    q: 'Can I pause, stop or change my SIP amount?',
    a: 'Yes, freely — unlike a fixed deposit or a lock-in product, mutual fund houses don\'t charge a penalty for pausing, stopping or changing your SIP amount at any time. The catch is behavioral, not contractual: stopping during a market downturn is exactly when rupee-cost averaging is doing the most work for you, so pausing there forfeits the cheap-unit accumulation and the subsequent recovery. If cash flow is genuinely tight, reducing the amount rather than stopping entirely preserves at least some of that benefit.',
  },
  {
    q: 'How much difference does starting a SIP earlier really make?',
    a: 'A large one, because compounding rewards time far more than it rewards a bigger monthly amount started later. The biggest absolute gains in any SIP come in its final years, once the accumulated base is largest — which means starting a few years earlier gives compounding a longer runway precisely when it matters most, often letting a smaller, earlier SIP out-accumulate a larger, later one over the same eventual horizon. If you\'re deciding between starting now at a smaller amount versus waiting to start with a bigger one, the earlier start usually wins.',
  },
  {
    q: 'What is the difference between a direct and a regular mutual fund plan?',
    a: 'A direct plan is bought straight from the fund house with no distributor commission built in; a regular plan routes through a distributor/advisor who earns a trail commission, funded by a higher expense ratio on the same underlying fund. The difference is often just 0.5-1% a year, which sounds negligible but compounds over a 15-20 year SIP into a meaningfully larger final corpus purely from the lower ongoing cost — with no difference in the underlying portfolio the fund actually holds.',
  },
  {
    q: 'What is a step-up SIP, and should I use one?',
    a: 'A step-up (or "top-up") SIP increases your monthly contribution periodically — commonly once a year, in line with a salary increment — rather than staying flat for the entire tenure. Because the larger contributions in later years still get real (if shorter) compounding time, and because a flat SIP amount effectively shrinks in real terms as your income and expenses grow, stepping up is one of the more effective ways to build a meaningfully larger corpus without feeling a sudden jump in commitment. At minimum, revisit and raise your SIP amount whenever your income rises.',
  },
  {
    q: 'How do I size a SIP for a specific future goal?',
    a: 'Define the goal in today\'s money first (say, ₹20 lakh for a course fee in today\'s terms), then inflate that target forward to the year you\'ll need it, since future rupees buy less than today\'s — a ₹20 lakh goal 15 years out at 6% inflation actually requires roughly ₹48 lakh in future rupees. Only then work out the monthly SIP needed to reach that inflated, nominal target at your assumed return — sizing a SIP against today\'s cost of the goal without inflating it forward is a common way people under-save for education, weddings and retirement.',
  },
  {
    q: 'Are SIP gains taxed every year, or only when I redeem?',
    a: 'Only at redemption — capital gains tax applies when you actually sell units, not annually on paper gains, which is a meaningful advantage over something like a fixed deposit where interest is taxed every year as it accrues, whether or not you touch the money. This means your full corpus keeps compounding untaxed until you withdraw, and it also means you have some control over timing: spreading a large redemption across two financial years can let you use the ₹1.25 lakh LTCG exemption twice instead of once.',
  },
  {
    q: 'Is a SIP itself an investment, or just a way of investing?',
    a: 'A SIP is a method of investing, not a product in its own right — it\'s simply an instruction to invest a fixed amount into a chosen mutual fund at regular intervals. The mutual fund is the actual investment: a pooled vehicle, regulated by SEBI, that holds equities, bonds or other assets on behalf of all its investors. You could invest the exact same total amount into the exact same fund as a single lump sum instead — "SIP" describes the discipline and cadence of how you get the money in, not a separate underlying asset.',
  },
  {
    q: 'How many different funds or SIPs should I actually run?',
    a: 'Fewer than most beginners assume — three to five funds spanning genuinely different categories (say, a large-cap or index fund, a flexi-cap fund, and a mid/small-cap fund) usually gives adequate diversification without the overlap and tracking headache of a dozen funds that quietly hold much of the same underlying stocks. A single low-cost index fund SIP is a completely reasonable starting point for a new investor; the goal is consistent, long-term investing in a small number of funds you understand, not chasing whichever fund topped last year\'s returns table.',
  },
  {
    q: 'How reliable is this calculator\'s projection?',
    a: 'The maturity, real-value and post-tax figures are mathematically exact for the inputs you enter, but the inputs themselves — expected return and expected inflation — are assumptions, not guarantees. Real mutual fund returns are lumpy: some years deliver well above your assumed average, others deliver losses, and the long-run average only emerges over many years. Use this as a planning and scenario-comparison tool (try a conservative and an optimistic case) rather than a forecast of what will definitely happen, and lean on the real, post-tax figure as the more honest number to plan around.',
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
  name: 'SIP Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'SIP Calculator', path: PATH },
])

const h2Cls = 'font-display mb-4 text-2xl font-semibold'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

export default function SipCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'SIP Calculator', href: '/financial/sip-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="SIP Calculator"
        subtitle="Project your mutual fund SIP maturity value, then see the two figures most calculators skip: what it's actually worth after inflation, and what's left after LTCG tax."
        stats={[
          { icon: '📈', big: '10–13%', small: 'Realistic equity range', tone: 'hub' },
          { icon: '🎯', big: 'Nominal + Real', small: 'Inflation-adjusted too', tone: 'hub' },
          { icon: '🧾', big: '12.5%', small: 'LTCG above ₹1.25L/yr', tone: 'hub' },
          { icon: '📊', big: 'Year-by-year', small: 'Growth chart', tone: 'hub' },
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
            Investing <strong>{formatINR(10000)}/month</strong> at 12% for 10 years
            means you invest {formatINR(example.invested)} and reach a nominal maturity
            value of about <strong>{formatINR(example.maturityValue)}</strong>. At 6%
            inflation that&apos;s worth roughly{' '}
            <strong>{formatINR(example.realValue)}</strong> in today&apos;s money, and
            after an estimated {formatINR(example.ltcgTax)} of LTCG tax, the post-tax
            corpus you&apos;d actually receive is about{' '}
            <strong>{formatINR(example.postTaxCorpus)}</strong>.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className={h2Cls}>
            Calculate your SIP returns
          </h2>
          <SipCalculator />
        </section>

        <section aria-labelledby="real-vs-nominal" className="mb-10 scroll-mt-20">
          <h2 id="real-vs-nominal" className={h2Cls}>
            What Your SIP Corpus Is Really Worth
          </h2>
          <p className="text-ash/80">
            Most SIP calculators stop at the nominal maturity value — a
            single, impressive-looking number that quietly hides two
            things that matter far more for actually meeting a goal:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Inflation erosion', 'a rupee 15-20 years from now buys less than a rupee today, so a large nominal corpus can be worth surprisingly little in real purchasing power — this calculator divides your nominal maturity value by (1 + inflation)^years to show the "real value" in today\'s money.'],
              ['LTCG tax at redemption', 'equity mutual fund gains above ₹1,25,000 in a financial year are taxed at 12.5% when you actually sell — a real cost that reduces what lands in your account, separate from and on top of inflation\'s effect.'],
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
            Over very long tenures, the gap between the nominal figure and
            the real, post-tax figure widens dramatically — a corpus that
            looks like ₹1 crore at 20 years can be worth well under half
            that in today&apos;s purchasing power once inflation and tax
            are both accounted for. Planning against the smaller, more
            honest real/post-tax number is the only way to know
            confidently whether a SIP will actually cover a specific
            future goal.
          </p>
          <p className={takeawayCls}>
            Takeaway: always size a SIP against its real, post-tax value —
            not the nominal headline figure that every basic calculator
            shows.
          </p>
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className={h2Cls}>
            How the maturity value is calculated
          </h2>
          <p className="text-ash/80">
            Each monthly instalment compounds for a different length of time —
            your first instalment earns returns for the full duration, your
            last one for barely a month — so the calculator uses the standard
            future-value-of-an-annuity formula rather than simple multiplication:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Variable</th>
                  <th className="px-4 py-2 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">P</td>
                  <td className="px-4 py-2">Your fixed monthly investment</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">i</td>
                  <td className="px-4 py-2">Monthly return (annual rate ÷ 12)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">n</td>
                  <td className="px-4 py-2">Total number of months invested</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">M</td>
                  <td className="px-4 py-2">Nominal maturity value — what the calculator solves for first</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ash/80">
            Two things drive the gap between what you invest and what you
            get back, before inflation or tax even enter the picture:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Compounding', 'each month\'s return itself starts earning returns, so growth accelerates the longer you stay invested — this is why the final years of a long SIP add far more in absolute rupees than the early years.'],
              ['Rupee-cost averaging', 'a fixed monthly amount buys more units when the market is down and fewer when it\'s up, smoothing your average purchase price over the ups and downs — this is the main argument for SIP over trying to time a single lump-sum entry.'],
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

        <section aria-labelledby="tenure-table" className="mb-10 scroll-mt-20">
          <h2 id="tenure-table" className={h2Cls}>
            SIP Growth by Tenure
          </h2>
          <p className="text-ash/80">
            A single ₹10,000/month SIP at a 12% assumed return, run for
            different lengths of time, shows how much of the eventual
            corpus comes from compounding rather than your own
            contributions the longer you stay invested:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Tenure</th>
                  <th className="px-4 py-2 text-right font-semibold">Total invested</th>
                  <th className="px-4 py-2 text-right font-semibold">Maturity value</th>
                  <th className="px-4 py-2 text-right font-semibold">Gains</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {tenureTable.map((row) => (
                  <tr key={row.years}>
                    <td className="px-4 py-2 font-medium">{row.years} years</td>
                    <td className="px-4 py-2 text-right tabular-nums">{formatINR(row.invested)}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{formatINR(row.maturityValue)}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{formatINR(row.gains)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: gains overtake total contributions somewhere around
            year 12-13 at this return rate — before that point, most of
            your corpus is still literally your own money; after it,
            compounding starts doing more of the work than you are.
          </p>
        </section>

        <section aria-labelledby="worked-examples-three" className="mb-10 scroll-mt-20">
          <h2 id="worked-examples-three" className={h2Cls}>
            Three Worked Examples: Short, Medium and Long Tenure
          </h2>
          <p className="text-ash/80">
            Three different SIPs, all assuming 6% inflation, show how the
            gap between nominal, real and post-tax value changes with
            tenure and amount:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            Example A — ₹8,000/month at 12% for 15 years
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Invested</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleShort.invested)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Nominal maturity value</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleShort.maturityValue)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Real value (today&apos;s money)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleShort.realValue)}</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">Post-tax corpus</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">{formatINR(exampleShort.postTaxCorpus)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 font-semibold text-ink-navy">
            Example B — ₹6,000/month at 11% for 12 years
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Invested</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleMedium.invested)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Nominal maturity value</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleMedium.maturityValue)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Real value (today&apos;s money)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleMedium.realValue)}</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">Post-tax corpus</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">{formatINR(exampleMedium.postTaxCorpus)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 font-semibold text-ink-navy">
            Example C — ₹20,000/month at 11% for 20 years
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Invested</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleLong.invested)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Nominal maturity value</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleLong.maturityValue)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Real value (today&apos;s money)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleLong.realValue)}</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">Post-tax corpus</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">{formatINR(exampleLong.postTaxCorpus)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: in Example C, the nominal figure is more than{' '}
            {Math.round(exampleLong.maturityValue / exampleLong.realValue)}× the
            real value — over very long tenures, the nominal number alone can be
            actively misleading if you&apos;re planning against it for a real
            future goal.
          </p>
        </section>

        <section aria-labelledby="best-practices" className="mb-10 scroll-mt-20">
          <h2 id="best-practices" className={h2Cls}>
            Six SIP Best Practices
          </h2>
          <ul className="mt-3 space-y-3">
            {[
              ['Start as early as you can', 'compounding rewards time more than it rewards a larger amount started later — a few years\' head start can outweigh a meaningfully bigger monthly contribution begun afterward.'],
              ['Plan against the real, post-tax value', 'size your SIP so the inflation-adjusted, after-tax corpus meets your goal — not the nominal figure, which overstates what you can actually spend.'],
              ['Use a realistic return assumption', '10-13% is a reasonable long-term equity range; anchoring to a recent strong-market run\'s returns risks under-saving if the market reverts to a lower long-run average.'],
              ['Stay invested through downturns', 'stopping a SIP during a market fall forfeits exactly the period when rupee-cost averaging is accumulating the most units at the cheapest prices.'],
              ['Prefer direct plans where you can evaluate funds yourself', 'the lower expense ratio compounds into a meaningfully larger corpus over 15-20 years versus an equivalent regular plan.'],
              ['Remember the LTCG tax due at redemption', 'plan your withdrawal — potentially spread across financial years — around the ₹1.25 lakh annual exemption rather than assuming the full nominal corpus is yours to spend.'],
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
            Working backward from a target corpus (like ₹1 crore) instead of a fixed monthly
            amount? Our{' '}
            <Link href="/financial/crorepati-calculator" className="text-brass underline">
              Crorepati Calculator
            </Link>{' '}
            solves for the required SIP — including a step-up option — to hit any goal by a target
            date. Comparing against a guaranteed alternative instead? See our{' '}
            <Link href="/financial/fd-calculator" className="text-brass underline">
              FD Calculator
            </Link>{' '}
            or{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="quick-reference" className="mb-10 scroll-mt-20">
          <h2 id="quick-reference" className={h2Cls}>
            Quick Reference
          </h2>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Question</th>
                  <th className="px-4 py-2 font-semibold">Short answer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['What is a SIP?', 'A method of investing a fixed amount monthly into a mutual fund'],
                  ['How does a SIP grow?', 'Compounding on each individual instalment'],
                  ['Realistic return to assume', '10-13% for equity, long term'],
                  ['What is the "real value"?', 'The corpus in today\'s purchasing power, after inflation'],
                  ['LTCG tax on equity funds', '12.5% on gains above ₹1.25 lakh/year'],
                  ['Is the projection guaranteed?', 'No — it\'s an estimate; real returns vary'],
                  ['Best time to start', 'As early as possible'],
                  ['Can I pause a SIP?', 'Yes, anytime, with no penalty'],
                  ['Direct vs regular plan', 'Direct has a lower cost, larger eventual corpus'],
                  ['Which value should I plan against?', 'The real, post-tax value — not the nominal figure'],
                ].map(([q, a]) => (
                  <tr key={q}>
                    <td className="px-4 py-2 font-medium">{q}</td>
                    <td className="px-4 py-2">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FinancialCrossSell current="sip-calculator" />

        <section aria-labelledby="faq" className="mb-10">
          <h2 id="faq" className={h2Cls}>
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
            SIP returns are market-linked and not guaranteed. This tool is a planning aid, not investment advice — mutual funds and their distribution are regulated by SEBI, and industry data is published by AMFI. Always consult a SEBI-registered adviser before making investment decisions. See our{' '}
            <Link href="/methodology" className="text-brass underline">
              methodology
            </Link>{' '}
            for how we source and verify data across this site.
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
