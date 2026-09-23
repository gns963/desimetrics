import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

export const metadata: Metadata = {
  title: 'Disclaimer — DesiMetrics',
  description:
    'Important limitations of DesiMetrics estimates: what tariff components we do not model, and why results are indicative, not professional, tax or investment advice.',
  alternates: {
    canonical: 'https://desimetrics.com/disclaimer',
    languages: getAlternateLanguages('/disclaimer'),
  },
}

export default function DisclaimerPage() {
  return (
    <LegalPageShell
      title="Disclaimer"
      intro="Our calculators give close estimates for planning and comparison. Always confirm important figures against your official bill or a qualified professional."
      stub={false}
      path="/disclaimer"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        Electricity bills
      </h2>
      <p>
        Actual bills can differ from our estimates due to rounding, meter rent,
        one-time charges and tariff revisions between our last verification and
        your billing date. Some components are deliberately not modelled,
        including Maharashtra&apos;s wheeling charge and fuel adjustment, West
        Bengal&apos;s monthly MVCA surcharge, and Kerala&apos;s non-telescopic
        rate above 250 units a month. These limits are noted on the relevant
        calculators; see our{' '}
        <Link href="/methodology" className="text-brass underline">
          methodology
        </Link>
        .
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        Solar and AC
      </h2>
      <p>
        Solar savings, system costs and payback use indicative benchmarks and a
        typical generation assumption; real quotes and output vary by location,
        shading and installer. AC running costs assume a standard compressor duty
        factor and ISEER bands. Treat both as planning estimates.
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        Financial calculators
      </h2>
      <p>
        Our 12 financial calculators (Capital Gains Tax, New vs Old Tax Regime,
        GST, SIP, Home Loan EMI, Personal Loan EMI, PPF, FD, Gratuity, HRA, NPS
        and Human Life Value) are for general guidance only and are not tax,
        legal, investment or insurance advice. Each produces a needs or planning
        estimate built from the inputs you provide and the rules verified at the
        time we last checked them — not a filed return, a bank/insurer quote, or
        a substitute for a qualified professional.
      </p>
      <p>
        Known limitations, current as of this page&apos;s last update:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Tax Regime &amp; Capital Gains</strong> — surcharge (income
          above ₹50 lakh) is not modelled in either calculator; the Capital
          Gains calculator also does not model the pre-23-July-2024 property
          indexation option.
        </li>
        <li>
          <strong>SIP</strong> — you enter a net-of-expense-ratio return
          assumption; returns are market-linked and not guaranteed. The
          calculator does show an inflation-adjusted real value and a
          post-tax (LTCG) estimate alongside the nominal figure.
        </li>
        <li>
          <strong>GST</strong> — compensation cess, composition-scheme rates
          and item-specific exemptions are not modelled; verify the exact
          HSN/SAC rate on the official GST portal before filing.
        </li>
        <li>
          <strong>Home Loan &amp; Personal Loan EMI</strong> — not a loan
          offer; actual rate, fees and eligibility depend on the lender and
          your credit profile.
        </li>
        <li>
          <strong>PPF &amp; FD</strong> — PPF&apos;s interest rate is reviewed
          quarterly by the government and is not guaranteed to hold; FD
          figures are pre-tax (TDS is not your final tax liability).
        </li>
        <li>
          <strong>Gratuity</strong> — eligibility, Payment of Gratuity Act
          coverage, and the applicable exemption ceiling depend on your
          specific employment terms; confirm with HR/payroll.
        </li>
        <li>
          <strong>HRA</strong> — only available under the old tax regime;
          confirm documentation requirements with your employer.
        </li>
        <li>
          <strong>NPS</strong> — market-linked and not guaranteed; annuity
          rates shown are illustrative and vary by the insurer and plan you
          eventually choose.
        </li>
        <li>
          <strong>Human Life Value</strong> — a needs estimate, not an
          insurance premium quote or product recommendation.
        </li>
      </ul>
      <p>Consult a qualified professional before acting on any of these figures.</p>

      <h2 className="font-display text-xl font-semibold text-ash">
        No affiliation
      </h2>
      <p>
        DesiMetrics is independent and not affiliated with any DISCOM, regulatory
        commission or government body, and is not liable for decisions made on the
        basis of these estimates.
      </p>
    </LegalPageShell>
  )
}
