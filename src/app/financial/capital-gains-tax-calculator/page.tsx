import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import CapitalGainsTaxCalculator from '@/components/calculators/CapitalGainsTaxCalculator'
import { calculateCapitalGainsTax, calculateEquityCapitalGainsTax } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/capital-gains-tax-calculator'

const exampleLtcg = calculateEquityCapitalGainsTax(500000, 900000, 18)
const exampleStcg = calculateEquityCapitalGainsTax(500000, 600000, 6)
const exampleDebtPre2023 = calculateCapitalGainsTax({
  assetType: 'debtFund', purchaseValue: 700000, saleValue: 900000,
  holdingMonths: 40, purchaseDateISO: '2021-06-01', slabRatePercent: 30,
})
const exampleDebtPost2023 = calculateCapitalGainsTax({
  assetType: 'debtFund', purchaseValue: 700000, saleValue: 900000,
  holdingMonths: 40, purchaseDateISO: '2023-06-01', slabRatePercent: 30,
})
const examplePropertyNoReinvest = calculateCapitalGainsTax({
  assetType: 'other', purchaseValue: 3500000, saleValue: 6500000, holdingMonths: 60, slabRatePercent: 30,
})
const examplePropertyReinvest = calculateCapitalGainsTax({
  assetType: 'other', purchaseValue: 3500000, saleValue: 6500000, holdingMonths: 60,
  slabRatePercent: 30, reinvestmentExemption: 2000000,
})

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator 2026 — Equity, Debt Funds, Property & Gold',
  description:
    'Free capital gains tax calculator for India. Enter your dates and this tool auto-classifies short vs long term, applies the correct FY 2025-26 rate — for listed equity, debt mutual funds, property, gold and unlisted shares.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How does this calculator decide short-term vs long-term for me?',
    a: 'Enter your purchase date and sale date, and the calculator counts the completed months between them and compares that to the correct threshold for your asset type — 12 months for listed equity/equity mutual funds, 24 months for debt funds (where applicable), property, gold and unlisted shares. You never need to count months yourself or guess which side of the line a sale falls on.',
  },
  {
    q: 'What is the current LTCG tax rate on shares and equity mutual funds?',
    a: '12.5% on long-term gains above ₹1,25,000 in a financial year, applicable to listed equity shares and equity-oriented mutual funds held for more than 12 months, where STT was paid on both purchase and sale. This rate and the ₹1.25 lakh exemption threshold were both revised upward by Budget 2024 (effective 23 July 2024) from the earlier 10% rate and ₹1 lakh exemption.',
  },
  {
    q: 'What is the current STCG tax rate on equity?',
    a: '20% on short-term gains (holding period of 12 months or less) from listed equity shares and equity mutual funds, with no exemption threshold — every rupee of short-term gain is taxed. This was also raised by Budget 2024, from the earlier 15%.',
  },
  {
    q: 'How are debt mutual funds actually taxed — does it depend on when I bought them?',
    a: 'Yes, and this is a genuinely important date to know. Since the 2023 Finance Act, debt fund units bought ON OR AFTER 1 April 2023 get NO long-term capital gains concession at all — every gain is taxed at your income-tax slab rate, no matter how many years you held the units. Units bought BEFORE 1 April 2023, however, are grandfathered into the older rule: held over 24 months, they qualify as long-term and are taxed at 12.5% (without indexation, per the Budget 2024 simplification) instead of your slab rate. This calculator applies the correct rule automatically based on the purchase date you enter.',
  },
  {
    q: 'What is the grandfathering rule for equity bought before 31 January 2018?',
    a: 'For equity shares/units acquired on or before 31 January 2018, the cost of acquisition for LTCG purposes is the higher of the actual purchase price or the fair market value (highest traded price) as of 31 January 2018 — capped at the actual sale price. This provision shields gains that had accrued before LTCG on equity was reintroduced in Budget 2018, and this calculator applies it automatically when you tick the grandfathering box and enter the 31 Jan 2018 FMV.',
  },
  {
    q: 'How does the calculator handle property, gold and unlisted shares?',
    a: 'These follow a 24-month long-term threshold. Long-term gains are taxed at 12.5% without indexation (the Budget 2024 simplified default) after any eligible Section 54/54EC/54F reinvestment exemption; short-term gains are taxed at your income-tax slab rate, not a flat rate. One thing this calculator deliberately does NOT model: for property acquired before 23 July 2024, the law allows choosing between this simplified 12.5%-no-indexation method or the older 20%-with-indexation method, whichever is cheaper — comparing both requires the year-by-year Cost Inflation Index table, which needs a primary CBDT source to model correctly, so a property seller in that specific situation should get both figures compared by a CA rather than trust this tool alone.',
  },
  {
    q: 'What is the Section 54/54EC/54F reinvestment exemption?',
    a: 'These sections let you exempt long-term capital gains from tax if you reinvest into specified assets: Section 54 (selling a residential house and buying/constructing another residential house), Section 54EC (investing in specified capital-gains bonds, such as from NHAI or REC, within 6 months), and Section 54F (selling any long-term asset and investing the net sale proceeds in a residential house, if you don\'t already own more than one). This calculator lets you enter the eligible reinvestment amount for "other" assets (property/gold/unlisted shares) — it caps the exemption at the gain itself and applies it only to long-term gains, since none of these sections apply to short-term gains.',
  },
  {
    q: 'Is the ₹1.25 lakh LTCG exemption available on every sale, or once a year?',
    a: 'For equity specifically, it\'s a once-per-financial-year cumulative limit across ALL your long-term equity gains combined — not per transaction and not per stock/fund. If you book ₹80,000 LTCG from one mutual fund and ₹90,000 from a stock sale in the same year, your combined gain of ₹1,70,000 only gets ₹1,25,000 of exemption, with ₹45,000 taxed at 12.5%. This exemption is specific to Section 112A (equity) — it does not apply to debt funds, property, gold or unlisted shares, which have no equivalent annual exemption threshold.',
  },
  {
    q: 'What happened to capital gains tax rules in Budget 2024?',
    a: 'Effective 23 July 2024, the LTCG rate on listed equity/equity mutual funds rose from 10% to 12.5%, the exemption threshold rose from ₹1 lakh to ₹1.25 lakh/year, and the STCG rate rose from 15% to 20%. For property, gold and unlisted shares, the LTCG rate was simplified to 12.5% without indexation (with an option to use the older 20%-with-indexation method for pre-23-July-2024 acquisitions). The holding-period thresholds themselves (12 months for equity, 24 months for the other asset classes here) were not changed.',
  },
  {
    q: 'Can I set off capital losses against gains?',
    a: 'Short-term capital losses can be set off against both short-term and long-term capital gains in the same year. Long-term capital losses can only be set off against long-term capital gains, not short-term. Any unused loss can be carried forward for up to 8 assessment years, but only if you\'ve filed your income tax return before the due date for that year — a common trap where the tax-saving benefit is lost purely due to a late filing.',
  },
  {
    q: 'Which income tax slab should I select for the short-term-gain calculation?',
    a: 'Select the marginal slab rate you actually pay on your total income for the year — 5%, 20% or 30% (this calculator doesn\'t model the lower slabs where most or all of your income would fall below the basic exemption, since capital gains additions to a low-income year are a less common case). This slab rate is used for short-term gains on debt funds, property, gold and unlisted shares — equity has its own flat rate and ignores this selection.',
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
  name: 'Capital Gains Tax Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'Capital Gains Tax Calculator', path: PATH },
])

const h2Cls = 'font-display mb-4 text-2xl font-semibold'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

export default function CapitalGainsTaxCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'Capital Gains Tax Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📉</span> Financial hub
          </>
        }
        h1="Capital Gains Tax Calculator"
        subtitle="Enter your buy and sell dates and this tool tells you instantly whether your gain is short-term or long-term, applies the correct FY 2025-26 rate for your asset, and shows exactly how much tax you save by holding long enough to qualify for LTCG."
        stats={[
          { icon: '📅', big: 'Auto-classify', small: 'From your dates', tone: 'hub' },
          { icon: '🗂️', big: '4 asset types', small: 'Equity, debt, property, gold', tone: 'hub' },
          { icon: '🛡️', big: '2018 grandfathering', small: 'For equity', tone: 'hub' },
          { icon: '🏠', big: 'Sec 54/54EC/54F', small: 'Reinvestment exemption', tone: 'hub' },
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
            Worked examples
          </h2>
          <p className="mt-2 text-ash/80">
            Selling shares bought for <strong>{formatINR(500000)}</strong> at{' '}
            <strong>{formatINR(900000)}</strong> after <strong>18 months</strong> is a long-term
            gain of {formatINR(exampleLtcg.gain)} — after the ₹1,25,000 exemption, only{' '}
            {formatINR(exampleLtcg.taxableGain)} is taxed at 12.5%, a tax of{' '}
            <strong>{formatINR(exampleLtcg.tax)}</strong>. The same {formatINR(100000)} gain
            booked in just <strong>6 months</strong> instead is short-term, taxed in full at 20%
            with no exemption — a tax of <strong>{formatINR(exampleStcg.tax)}</strong>.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className={h2Cls}>
            Calculate your capital gains tax
          </h2>
          <CapitalGainsTaxCalculator />
        </section>

        <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
          <h2 id="how-calculated" className={h2Cls}>
            How the tax is calculated, by asset type
          </h2>
          <p className="text-ash/80">
            Each asset type this calculator supports follows its own
            long-term threshold and rate structure — pick the wrong one
            and the whole calculation is off, which is why asset type is
            the first thing you choose:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Listed equity / equity mutual funds', '12-month threshold. Long-term: 12.5% above a ₹1,25,000/year exemption. Short-term: flat 20%, no exemption. (Section 111A/112A.)'],
              ['Debt mutual funds', 'depends entirely on your purchase date — units bought on/after 1 April 2023 are always taxed at your slab rate, no matter the holding period; units bought before that date still get the 24-month long-term split at 12.5%.'],
              ['Property, gold, unlisted shares', '24-month threshold. Long-term: 12.5% without indexation, after any Section 54/54EC/54F reinvestment exemption. Short-term: taxed at your slab rate, not a flat rate.'],
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
            One holding-period day can be the difference between two very
            different tax bills — a share sold on day 365 is short-term at
            20% with no exemption; the same share sold one day later is
            long-term, taxed at 12.5% only on the amount above ₹1.25 lakh.
            Enter your exact dates rather than an approximate holding
            period if a sale is close to the threshold.
          </p>
        </section>

        <section aria-labelledby="debt-fund-dates" className="mb-10 scroll-mt-20">
          <h2 id="debt-fund-dates" className={h2Cls}>
            Why Your Debt Fund&apos;s Purchase Date Changes Everything
          </h2>
          <p className="text-ash/80">
            The same {formatINR(200000)} gain on a debt fund, held for the
            same 40 months, is taxed completely differently depending on
            one date:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Purchased</th>
                  <th className="px-4 py-2 font-semibold">Treatment</th>
                  <th className="px-4 py-2 text-right font-semibold">Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2">Before 1 April 2023</td>
                  <td className="px-4 py-2">Long-term (24mo+) at 12.5%</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleDebtPre2023.tax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">On/after 1 April 2023</td>
                  <td className="px-4 py-2">Always slab rate (30% here)</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(exampleDebtPost2023.tax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: a debt fund bought just two years apart, held for
            the identical period, can owe more than double the tax purely
            because of a 2023 rule change — always check your actual
            purchase date rather than assuming debt funds get long-term
            treatment.
          </p>
        </section>

        <section aria-labelledby="reinvestment" className="mb-10 scroll-mt-20">
          <h2 id="reinvestment" className={h2Cls}>
            How the Reinvestment Exemption Changes a Property Sale
          </h2>
          <p className="text-ash/80">
            Selling property bought for <strong>{formatINR(3500000)}</strong> at{' '}
            <strong>{formatINR(6500000)}</strong> after 5 years is a long-term gain of{' '}
            {formatINR(examplePropertyNoReinvest.gain)}:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Scenario</th>
                  <th className="px-4 py-2 text-right font-semibold">Taxable gain</th>
                  <th className="px-4 py-2 text-right font-semibold">Tax (12.5%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2">No reinvestment</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(examplePropertyNoReinvest.taxableGain)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(examplePropertyNoReinvest.tax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">{formatINR(2000000)} reinvested under Sec 54</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(examplePropertyReinvest.taxableGain)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{formatINR(examplePropertyReinvest.tax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: reinvesting {formatINR(2000000)} here saves{' '}
            {formatINR(examplePropertyNoReinvest.tax - examplePropertyReinvest.tax)} in tax — but
            only if the reinvestment genuinely qualifies under Section 54, 54EC or 54F&apos;s
            specific conditions (timing windows, asset type, number of houses already owned), so
            confirm eligibility before counting on the exemption.
          </p>
        </section>

        <section aria-labelledby="scope" className="mb-10 scroll-mt-20">
          <h2 id="scope" className={h2Cls}>
            What this calculator doesn&apos;t cover
          </h2>
          <p className="text-ash/80">
            The one deliberate gap: for property acquired{' '}
            <strong>before 23 July 2024</strong>, the law allows choosing
            between this calculator&apos;s simplified 12.5%-without-indexation
            method or an older 20%-with-indexation method, whichever comes
            out cheaper. Comparing both properly requires the year-by-year
            Cost Inflation Index table, which needs a verified primary CBDT
            source to model correctly — rather than guess at those figures,
            this calculator always uses the simplified method and flags
            this gap explicitly. If you&apos;re selling pre-23-July-2024
            property with a meaningful gain, get both methods compared by a
            chartered accountant before filing.
          </p>
          <p className="mt-3 text-ash/80">
            If you&apos;re investing via SIP and want to project growth
            before thinking about the eventual sale-time tax, start with
            our{' '}
            <Link href="/financial/sip-calculator" className="text-brass underline">
              SIP Calculator
            </Link>
            , which already builds this same LTCG logic into its post-tax
            corpus estimate.
          </p>
        </section>

        <FinancialCrossSell current="capital-gains-tax-calculator" />

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
            This tool provides estimates for illustration only and is not tax advice. It assumes STT was paid on equity purchase and sale, does not model the pre-23-July-2024 property indexation option, and does not model surcharge above ₹50 lakh — use our{' '}
            <Link href="/financial/surcharge-marginal-relief-calculator" className="text-brass underline">
              Surcharge &amp; Marginal Relief Calculator
            </Link>{' '}
            alongside this one if your total income including these gains crosses that threshold. Consult a tax professional for your specific transaction. See our{' '}
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
