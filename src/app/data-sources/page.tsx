import type { Metadata } from 'next'
import LegalPageShell from '@/components/LegalPageShell'
import { tariffRegistry } from '@/lib/calc/electricity'
import { formatIsoDate } from '@/lib/format'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

export const metadata: Metadata = {
  title: 'Data Sources — Official Tariff Orders Behind Every Calculator',
  description:
    'The official SERC tariff order and last-verified date behind every DISCOM DesiMetrics covers, plus the source for solar subsidy and income-tax data.',
  alternates: {
    canonical: 'https://desimetrics.com/data-sources',
    languages: getAlternateLanguages('/data-sources'),
  },
}

const tariffs = Object.values(tariffRegistry).sort((a, b) =>
  a.state.localeCompare(b.state),
)

export default function DataSourcesPage() {
  return (
    <LegalPageShell
      title="Data Sources"
      intro="Every tariff on DesiMetrics traces to a primary regulatory document. Below is the exact source order and last-verified date for each DISCOM we currently cover — the same sourceUrl and lastVerified values stored in our tariff data files."
      stub={false}
      path="/data-sources"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        Electricity DISCOMs
      </h2>
      <div className="overflow-x-auto rounded-xl border border-hairline">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist">
            <tr>
              <th className="px-4 py-2 font-semibold">State</th>
              <th className="px-4 py-2 font-semibold">DISCOM</th>
              <th className="px-4 py-2 font-semibold">Source order</th>
              <th className="px-4 py-2 font-semibold">Last verified</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {tariffs.map((t) => (
              <tr key={t.discomCode}>
                <td className="px-4 py-2">{t.state}</td>
                <td className="px-4 py-2 font-medium">{t.discomCode}</td>
                <td className="px-4 py-2">
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brass underline hover:text-brass"
                  >
                    View order
                  </a>
                </td>
                <td className="px-4 py-2 tabular-nums">
                  {formatIsoDate(t.lastVerified)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-ash/60">
        Some entries are currently sourced from secondary references while we
        cross-check the primary SERC order — each such file carries an explicit
        &quot;pending primary cross-check&quot; note, shown on its calculator
        page.
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        Other data
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Rooftop solar subsidy</strong> — PM Surya Ghar: Muft Bijli
          Yojana, Government of India (₹30,000/kW for the first 2 kW, ₹18,000 for
          the 3rd, capped at ₹78,000).
        </li>
        <li>
          <strong>Income tax slabs</strong> — Finance Act rates for FY 2026-27
          (AY 2027-28), including the ₹75,000/₹50,000 standard deductions,
          Section 87A rebates with marginal relief, and income tax surcharge
          (10%/15%/25%/37% slabs) with its own marginal relief at each
          threshold.
        </li>
        <li>
          <strong>AC efficiency</strong> — Bureau of Energy Efficiency (BEE)
          ISEER star-rating bands.
        </li>
        <li>
          <strong>Gratuity</strong> — Payment of Gratuity Act, 1972 (15/26
          formula, ₹20,00,000 private-sector ceiling under Section 10(10)(i));
          Code on Social Security, 2020, Section 53 (fixed-term employee
          gratuity after 1 year, in force since 21 November 2025).
        </li>
        <li>
          <strong>Capital gains tax</strong> — Income-tax Act provisions for
          equity (Section 112A grandfathering, 31 Jan 2018), debt funds (the 1
          April 2023 cohort rule for LTCG eligibility), and property/gold/
          unlisted shares (Sections 54/54EC/54F reinvestment exemptions).
        </li>
        <li>
          <strong>GST rates</strong> — Central Board of Indirect Taxes and
          Customs (CBIC), current GST 2.0 slab structure plus legacy 12%/28%
          and special (0.25% rough diamonds) rates.
        </li>
        <li>
          <strong>HRA exemption</strong> — Income-tax Rules 2026
          (operationalizing the Income-tax Act 2025, effective 1 April 2026),
          which adds Bengaluru, Hyderabad, Pune and Ahmedabad to the metro
          list from FY 2026-27; FY 2025-26 uses only the original 4 metros.
          Section 80GG fallback per the Income-tax Act.
        </li>
        <li>
          <strong>NPS</strong> — PFRDA exit and withdrawal rules (2026
          amendments): normal vs premature exit annuity minimums, Section
          10(12A) lump-sum tax exemption, and Section 10(12B) partial
          withdrawal.
        </li>
        <li>
          <strong>PPF</strong> — Public Provident Fund Scheme rules; the
          government-set interest rate is reviewed quarterly.
        </li>
        <li>
          <strong>FD interest &amp; TDS</strong> — Section 194A TDS thresholds
          (₹40,000 regular/₹50,000 senior citizens) and rates (10% with PAN,
          20% without).
        </li>
        <li>
          <strong>BH-series vehicle tax</strong> — MoRTH Rule 51B, Central
          Motor Vehicles Rules 1989 (slab table, 2-year instalment formula,
          eligibility criteria), cross-checked against two independent
          secondary sources.
        </li>
        <li>
          <strong>FIRE, Net Worth &amp; Retirement Planner</strong> — standard
          safe-withdrawal-rate and present-value financial-planning
          methodologies rather than a single official source; age-based
          benchmarks are commonly cited industry rules of thumb, not
          government statistics.
        </li>
        <li>
          <strong>EPF</strong> — the ₹15,000/month EPS wage ceiling and
          8.33%/12% contribution split under the EPF &amp; MP Act, 1952; the
          8.25% interest rate is government-notified annually and may change.
        </li>
        <li>
          <strong>Sukanya Samriddhi Yojana</strong> — scheme rules
          (₹250 min/₹1,50,000 max annual deposit, 15-year deposit + 21-year
          maturity); the 8.2% interest rate is government-notified quarterly.
        </li>
        <li>
          <strong>Section 80D</strong> — Income-tax Act limits (₹25,000
          regular/₹50,000 senior citizen, ₹5,000 preventive-checkup sub-limit
          included within the overall cap).
        </li>
        <li>
          <strong>NCB &amp; IDV</strong> — IRDAI-standardised No-Claim Bonus
          slabs and Insured Declared Value depreciation-by-age schedule,
          cross-checked against the published IRDAI/GIC Council table.
        </li>
        <li>
          <strong>Gujarat Road Tax</strong> — flat 6% rate verified directly
          against a machine-readable page on cot.gujarat.gov.in
          (Commissionerate of Transport, Government of Gujarat); the prior 1%
          EV rate concession is confirmed to have expired 31 March 2026 via
          multiple independent sources.
        </li>
      </ul>
      <p className="text-sm text-ash/60">
        We only publish a road tax calculator for Gujarat: a 2026 re-attempt
        across 15 major states found every other state&apos;s official rate
        document was a scanned image or embedded graphic with no extractable
        text, or contradicted by other secondary sources — a document-format
        and verification problem, not a lack of effort. Use the official
        Vahan portal or your RTO for any state we don&apos;t cover.
      </p>
    </LegalPageShell>
  )
}
