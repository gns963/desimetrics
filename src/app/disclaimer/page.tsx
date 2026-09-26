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
        Our 30 financial calculators (Capital Gains Tax, New vs Old Tax Regime,
        GST, SIP, Home Loan EMI, Personal Loan EMI, PPF, FD, Gratuity, HRA, NPS,
        Human Life Value, FIRE, Net Worth, Crorepati, BH Series, EV vs Fuel Cost,
        Retirement Planner, EPF, Sukanya Samriddhi Yojana, CTC to In-Hand Salary,
        Rent vs Buy, Car/Two-Wheeler/Education Loan EMI, Health Insurance 80D,
        Surcharge &amp; Marginal Relief, Recurring Deposit, NCB &amp; IDV, and
        Gujarat Road Tax) are for general guidance only and are not tax, legal, investment or
        insurance advice. Each produces a needs or planning estimate built
        from the inputs you provide and the rules verified at the time we
        last checked them — not a filed return, a bank/insurer quote, or a
        substitute for a qualified professional.
      </p>
      <p>
        Known limitations, current as of this page&apos;s last update:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Tax Regime</strong> — surcharge (income above ₹50 lakh) and
          its marginal relief ARE modelled, for both regimes.
        </li>
        <li>
          <strong>Capital Gains</strong> — surcharge above ₹50 lakh is not
          modelled here; it also does not model the pre-23-July-2024 property
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
        <li>
          <strong>FIRE &amp; Retirement Planner</strong> — planning aids built
          on standard safe-withdrawal-rate and present-value methodologies,
          not guarantees; expected returns and inflation are assumptions you
          choose, not promised outcomes.
        </li>
        <li>
          <strong>Net Worth</strong> — age-based benchmarks shown are
          commonly cited rules of thumb, not government statistics or a
          target you must hit.
        </li>
        <li>
          <strong>Crorepati</strong> — the reverse-SIP calculation is exact
          for the inputs you enter, but expected return and inflation are
          assumptions; returns are market-linked and not guaranteed.
        </li>
        <li>
          <strong>BH Series</strong> — figures are checked against MoRTH
          Rule 51B but are not legal advice; confirm the exact amount and
          your current eligibility with your RTO before applying or paying.
        </li>
        <li>
          <strong>EV vs Fuel Cost</strong> — running-cost estimates only; it
          does not model maintenance costs or resale value, which would
          shift a real EV-vs-petrol decision further in the EV&apos;s favour.
        </li>
        <li>
          <strong>EPF</strong> — the interest rate is reviewed annually by
          the government and is not guaranteed to hold for your full working
          life; does not model early-withdrawal tax consequences.
        </li>
        <li>
          <strong>Sukanya Samriddhi Yojana</strong> — the interest rate is
          reviewed quarterly by the government; does not model early closure
          on marriage or the partial-withdrawal-at-18 provision.
        </li>
        <li>
          <strong>CTC to In-Hand Salary</strong> — does not model HRA
          exemption or old-regime itemised deductions; professional tax is a
          direct input since it varies by state.
        </li>
        <li>
          <strong>Rent vs Buy</strong> — a scenario comparison built on your
          own assumptions, not a prediction; if the buyer&apos;s monthly cost
          drops below rent after loan payoff, the renter&apos;s further
          monthly investment is clamped to zero as a documented
          simplification.
        </li>
        <li>
          <strong>Car / Two-Wheeler / Education Loan EMI</strong> — not a
          loan offer; actual rate and eligibility depend on the lender and
          your credit profile.
        </li>
        <li>
          <strong>Health Insurance 80D</strong> — old tax regime only; not
          available if you&apos;ve switched to the new regime.
        </li>
        <li>
          <strong>Surcharge &amp; Marginal Relief</strong> — does not model
          capital gains taxed at special rates within the same return.
        </li>
        <li>
          <strong>Recurring Deposit</strong> — quarterly-crediting
          approximation of typical bank practice; exact conventions vary
          slightly by bank.
        </li>
        <li>
          <strong>NCB &amp; IDV</strong> — IRDAI-standardised slabs, not an
          insurance quote; beyond 5 years, IDV is set by mutual agreement
          with your insurer, not a fixed schedule.
        </li>
        <li>
          <strong>Gujarat Road Tax</strong> — covers Gujarat only; its EV
          rate is not currently confirmed (the prior 1% concession expired
          31 March 2026, no replacement notified as of this writing).
        </li>
      </ul>
      <p>Consult a qualified professional before acting on any of these figures.</p>
      <p>
        We deliberately do not offer a state-wise Road Tax / Motor Vehicle Tax
        calculator beyond Gujarat: unlike BH-series tax, ordinary road tax
        varies by state under India&apos;s constitutional division of powers,
        and we specifically re-attempted primary-source verification across
        15 major states in 2026 — Gujarat was the only one whose official
        rate document was actually machine-readable rather than a scanned
        image or embedded graphic. We would rather cover one state accurately
        than many states approximately. Use your state transport
        department&apos;s official Vahan portal for any state we don&apos;t
        cover.
      </p>

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
