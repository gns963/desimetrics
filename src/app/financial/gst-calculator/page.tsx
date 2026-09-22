import type { Metadata } from 'next'
import Link from 'next/link'
import GstCalculator from '@/components/calculators/GstCalculator'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import { calculateGst } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/gst-calculator'

const example = calculateGst(1000, 18, 'exclusive')
const exampleIntra = calculateGst(15000, 18, 'exclusive', 'intra')
const exampleInter = calculateGst(60000, 18, 'exclusive', 'inter')
const exampleReverseCorrect = calculateGst(11800, 18, 'inclusive')
const exampleReverseWrong = 11800 * 0.18

export const metadata: Metadata = {
  title: 'GST Calculator 2026 — Add, Remove & Split CGST, SGST, IGST',
  description:
    'Free GST calculator for India. Add GST to a base price or remove it from an inclusive amount, with the correct CGST/SGST or IGST split, for all GST 2.0 slabs (5%, 18%, 40% and more).',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/financial/gst-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'When should I use the custom rate field instead of a preset?',
    a: 'Use it for any rate not among the current GST 2.0 presets — a legacy rate like 12% or 28% still relevant on a transition invoice dated before 22 September 2025, or a special notified rate such as 0.25% on rough diamonds. The custom field applies the same correct add/remove formula and CGST/SGST/IGST split to whatever rate you enter, so you\'re not limited to the handful of common rates in the dropdown.',
  },
  {
    q: 'How do I add GST to a price?',
    a: 'Multiply the base price by the GST rate divided by 100 to get the GST amount, then add it to the base for the total. For a base of ₹1,000 at 18%, that\'s ₹180 GST for a total of ₹1,180. This "forward" calculation is what you use when you know the pre-tax price and need the final invoice amount — enter the base in exclusive mode, pick the rate and supply type, and the calculator shows the GST, the total, and the correct CGST/SGST or IGST split.',
  },
  {
    q: 'How do I remove GST from a price that already includes it?',
    a: 'Divide the inclusive amount by (1 + rate/100) to get the base price, then subtract to find the GST — never multiply the inclusive amount by the rate directly. For ₹1,180 inclusive at 18%, dividing by 1.18 gives a base of ₹1,000, so the GST is ₹180. This "reverse" calculation is what you need for MRP-labelled items and GST-inclusive vendor bills, where the number in front of you already has tax baked in.',
  },
  {
    q: 'What is the single most common GST calculation mistake?',
    a: 'Multiplying the GST-inclusive amount by the rate instead of dividing by (1 + rate/100) to extract the base first. On an ₹11,800 bill that includes 18% GST, the correct GST is ₹1,800 (found by dividing ₹11,800 by 1.18 to get a ₹10,000 base, then subtracting) — but multiplying ₹11,800 × 18% incorrectly gives ₹2,124, overstating the tax by over ₹300. This happens because the 18% rate was always applied to the smaller base amount, not the larger inclusive total, so applying it to the total a second time double-counts part of the tax. This single error is behind a large share of incorrect input tax credit claims and overstated GST liabilities that small businesses file.',
  },
  {
    q: 'What is the difference between CGST, SGST and IGST?',
    a: 'They\'re the three ways the same GST amount gets attributed, depending on whether buyer and seller are in the same state. For an intra-state sale (both in the same state), the tax splits equally into Central GST (CGST, goes to the central government) and State GST (SGST, goes to the state government) — an 18% rate becomes 9% CGST + 9% SGST. For an inter-state sale (across state lines), the entire tax is charged as a single Integrated GST (IGST) at the full rate instead — no CGST or SGST line at all. In a union territory without its own legislature, SGST is called UTGST, with identical maths.',
  },
  {
    q: 'Does the CGST/SGST vs IGST split change how much tax I actually pay?',
    a: 'No — the total tax and the price the customer pays are exactly the same either way. An 18% rate is either 9% CGST + 9% SGST (intra-state) or a single 18% IGST line (inter-state), but both add up to 18% of the base. What changes is which government receives the money and which ledger you use to claim input tax credit — this matters enormously for GST compliance and correct invoicing, but not for the rupee amount anyone pays.',
  },
  {
    q: 'What are the current GST slabs in India (GST 2.0)?',
    a: 'Following the GST Council\'s rate rationalization effective 22 September 2025 ("GST 2.0"), the structure moved to two main slabs: 5% for essential goods and 18% (the standard rate) for most goods and services, with a new 40% demerit rate for luxury and sin goods (like high-end vehicles, tobacco and aerated drinks) that replaced the earlier 28% + compensation cess structure. The older 12% and 28% slabs were largely phased out, with most of those items reclassified to 5% or 18%. Special rates continue for gold and precious metals (3%) and rough diamonds (0.25%), while essential exempt goods and individual life/health insurance premiums sit at 0%.',
  },
  {
    q: 'Is it accurate to still use 12% or 28% for anything?',
    a: 'Only for specific legacy or transition cases — a small number of notified items may still carry a pre-reform rate, and older invoices dated before 22 September 2025 correctly used the old structure. For any new invoice, confirm your item\'s current rate against the item\'s HSN code (for goods) or SAC code (for services) on the official CBIC/GST portal before assuming a rate — don\'t rely on the old 12%/28% slabs by default just because they\'re still selectable on this or any calculator.',
  },
  {
    q: 'How do I calculate the GST built into an MRP?',
    a: 'An MRP (Maximum Retail Price) is GST-inclusive by law, so use the reverse calculation: divide the MRP by (1 + rate/100) to find the base price, then subtract to find the GST portion. For a ₹590 item in the 18% slab, dividing by 1.18 gives a base of exactly ₹500, so ₹90 of that ₹590 is GST. This matters for sellers because the MRP is not pure revenue — a portion of every sale must be remitted as tax, and treating the whole MRP as income overstates earnings and understates the tax actually owed.',
  },
  {
    q: 'What is the reverse charge mechanism, and is it the same as "reverse" GST calculation?',
    a: 'No — these are different concepts that happen to share the word "reverse." Reverse GST calculation (what this calculator does in inclusive mode) is simply extracting the base price and tax from a GST-inclusive figure. The reverse charge mechanism is a specific legal provision where the BUYER, not the seller, becomes liable to pay GST directly to the government — this applies to certain notified categories like services from unregistered dealers, goods transport agency services, and specified legal services. The GST amount is calculated the same way either way; reverse charge only shifts who is responsible for paying it.',
  },
  {
    q: 'Can I claim Input Tax Credit (ITC) on the GST shown here?',
    a: 'If you\'re a GST-registered business, you can generally claim ITC on GST paid on business purchases, offsetting it against the GST you collect on your own sales — this is what makes GST a value-added tax rather than a cascading one. You need a valid tax invoice that shows the GST component separately (which is exactly why extracting the correct GST from an inclusive price matters), and the credit also needs to be reflected in your supplier\'s own GST filings. Some purchases are explicitly blocked from ITC eligibility (personal expenses, some motor vehicle purchases, goods/services used for exempt supplies) regardless of the GST paid.',
  },
  {
    q: 'Do I need to be GST-registered to use this calculator?',
    a: 'No — anyone can use it to check a bill, understand a listed price, or plan a purchase, registered or not. Whether you must charge GST on your own sales is a separate question that depends on your registration status and turnover: businesses above the current threshold (₹20 lakh for services, ₹40 lakh for goods in most states) must register and charge GST, while smaller businesses may be exempt or opt into the composition scheme with its own simplified rate structure not modelled here.',
  },
  {
    q: 'How is GST handled on exports and imports?',
    a: 'Exports are "zero-rated" — charged at 0% GST, but the exporter can still claim a refund on the input tax credit for GST paid on inputs, either by exporting under a Letter of Undertaking without paying IGST upfront, or by paying IGST and claiming it back afterward. This is genuinely tax-free for the exporter, not just exempt. Imports work the opposite way: goods entering India attract IGST at the applicable rate as a customs-level tax (in addition to any customs duty), which a registered importer can typically then claim as input tax credit.',
  },
  {
    q: 'Does this calculator account for compensation cess?',
    a: 'No — it computes standard GST at the selected rate only. Compensation cess historically applied on top of the 28% slab for specific items (large cars, tobacco, aerated drinks), but GST 2.0\'s new 40% demerit rate largely folds that higher combined taxation into a single rate for most such goods going forward. If a specific item you\'re invoicing still carries a distinct notified cess, add it separately — this calculator doesn\'t model item-specific cess amounts, which vary widely (a small petrol car and a luxury SUV historically carried very different cess rates even within the same GST slab).',
  },
  {
    q: 'Why does my rate depend on an HSN or SAC code, and where do I check it?',
    a: 'Every good has an HSN (Harmonized System of Nomenclature) code and every service has a SAC (Services Accounting Code) — GST rates are notified against these codes, not against a plain-English description of the item, so two similar-sounding products can sit in different slabs depending on their precise classification. Always verify the applicable rate for your specific HSN/SAC code on the official CBIC portal before invoicing or filing; this calculator lets you select any current or legacy rate but has no way to know which rate applies to your specific product or service.',
  },
  {
    q: 'How accurate are the results from this calculator?',
    a: 'The arithmetic is exact for whatever amount, rate, mode and supply type you enter — the add/remove formulas and the CGST/SGST/IGST split follow the standard method GST law requires. What the calculator cannot verify is whether you\'ve entered the correct rate for your specific good or service, since that depends on classification (HSN/SAC code) that can change after GST Council meetings. Treat this as an estimation and invoice cross-check tool, and confirm the applicable rate, code and final figures against official sources before filing a return or issuing a tax invoice with real consequences.',
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
  name: 'GST Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'GST Calculator', path: PATH },
])

const h2Cls = 'font-display mb-4 text-2xl font-semibold'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

export default function GstCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'GST Calculator', href: '/financial/gst-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="GST Calculator"
        subtitle="Add GST to a base price or remove it from an inclusive amount the correct way, with the exact CGST/SGST or IGST split, for any Indian GST slab (5%, 18%, 40% and legacy rates)."
        stats={[
          { icon: '🧾', big: '5/18/40%', small: 'GST 2.0 slabs', tone: 'hub' },
          { icon: '⚖️', big: '50 / 50', small: 'CGST : SGST split', tone: 'hub' },
          { icon: '🚚', big: 'Intra / Inter', small: 'State supply toggle', tone: 'hub' },
          { icon: '🔄', big: 'Add or remove', small: 'Two calculation modes', tone: 'hub' },
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
            Adding 18% GST to <strong>{formatINR(example.base)}</strong> gives{' '}
            <strong>{formatINR(example.gstAmount)}</strong> GST (
            {formatINR(example.cgst)} CGST + {formatINR(example.sgst)} SGST) for a
            total of <strong>{formatINR(example.total)}</strong>.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className={h2Cls}>
            Calculate GST
          </h2>
          <GstCalculator />
        </section>

        <section aria-labelledby="two-directions" className="mb-10 scroll-mt-20">
          <h2 id="two-directions" className={h2Cls}>
            Adding GST vs Removing GST — Get the Direction Right
          </h2>
          <p className="text-ash/80">
            GST math runs in two directions, and confusing them is the
            single biggest source of GST calculation errors:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Adding GST (forward, "exclusive" mode)', 'you know the pre-tax base price and need the final amount — multiply the base by the rate to get the GST, then add it on: base × (1 + rate/100) = total. Use this when pricing a product or drafting an invoice from a known net price.'],
              ['Removing GST (reverse, "inclusive" mode)', 'you know the final, tax-included price and need to find what was the base and what was GST — divide the inclusive amount by (1 + rate/100) to isolate the base, then subtract to find the GST. Use this for any MRP-labelled item or a vendor bill quoted as a round, GST-inclusive figure.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-ash/80">
            The mistake almost everyone makes at some point is applying the
            rate to the inclusive amount when going in reverse. On an{' '}
            <strong>{formatINR(11800)}</strong> bill that includes 18% GST, the
            correct GST is{' '}
            <strong>{formatINR(exampleReverseCorrect.gstAmount)}</strong> — found
            by dividing {formatINR(11800)} by 1.18 to get a{' '}
            {formatINR(exampleReverseCorrect.base)} base, then subtracting.
            Multiplying {formatINR(11800)} by 18% directly instead gives{' '}
            <strong>{formatINR(exampleReverseWrong)}</strong> — overstating the
            tax by more than {formatINR(exampleReverseWrong - exampleReverseCorrect.gstAmount)}
            , because the 18% rate was always meant to apply to the smaller base,
            not the larger inclusive total.
          </p>
          <p className={takeawayCls}>
            Takeaway: whenever you&apos;re starting from a price that already
            includes GST, divide first — never multiply the inclusive figure
            directly by the rate.
          </p>
        </section>

        <section aria-labelledby="cgst-sgst-igst" className="mb-10 scroll-mt-20">
          <h2 id="cgst-sgst-igst" className={h2Cls}>
            CGST, SGST and IGST — What&apos;s the Difference
          </h2>
          <p className="text-ash/80">
            The same GST amount gets attributed differently depending on
            whether the buyer and seller are in the same state:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Intra-state supply', 'buyer and seller in the same state — GST splits exactly in half into Central GST (CGST, to the central government) and State GST (SGST, to the state government). An 18% rate becomes 9% CGST + 9% SGST.'],
              ['Inter-state supply', 'buyer and seller in different states — the full rate is charged as a single Integrated GST (IGST) line instead, with no CGST or SGST split at all. The centre collects the IGST and later apportions the destination state\'s share.'],
              ['Union territories', 'a UT without its own legislature uses UTGST in place of SGST, with identical calculation.'],
              ['Exports', 'zero-rated at 0% GST, with the exporter still able to claim a refund on input tax credit — genuinely tax-free, not merely exempt.'],
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
            Crucially, the split never changes the total tax paid or the
            price the customer sees — an 18% rate is either 9%+9% or a
            single 18%, and the total is identical either way. What the
            split actually changes is which government receives the
            money, the tax code that appears on the invoice, and which
            ledger the buyer uses to claim input tax credit — all of which
            matter for compliance, none of which change the rupee amount.
          </p>
        </section>

        <section
          aria-labelledby="gst-2-0"
          className="mb-10 rounded-xl border border-hub-financial/25 bg-hub-financial/5 p-5"
        >
          <h2 id="gst-2-0" className="font-display mb-2 text-xl font-bold text-ink-navy">
            What changed under GST 2.0
          </h2>
          <p className="text-sm text-ash/80">
            At the 56th GST Council meeting (3 September 2025), the
            Council approved a major rationalization, effective{' '}
            <strong>22 September 2025</strong>: the earlier four-slab
            system (5%, 12%, 18%, 28%) collapsed into a simpler{' '}
            <strong>two-main-slab</strong> structure — <strong>5%</strong>{' '}
            for essential goods and <strong>18%</strong> (standard rate)
            for most goods and services — plus a new{' '}
            <strong>40%</strong> demerit rate for luxury and sin goods
            (high-end vehicles, tobacco, aerated drinks) that replaced
            the older 28% + compensation cess combination. The 12% and
            28% slabs were largely phased out, with most affected items
            reclassified to 5% or 18%. Special rates continue for gold
            and precious metals (3%) and rough diamonds (0.25%), and
            individual life and health insurance premiums moved to fully
            exempt (0%). This calculator includes both the current GST
            2.0 rates and the legacy slabs some transition invoices may
            still reference — <strong>always confirm the exact current
            rate for your specific goods or service</strong> against the
            official GST Council/CBIC notification before invoicing or
            filing.
          </p>
        </section>

        <section aria-labelledby="slabs" className="mb-10 scroll-mt-20">
          <h2 id="slabs" className={h2Cls}>
            GST 2.0 slabs this calculator supports
          </h2>
          <p className="text-ash/80">
            Exact item-to-slab mapping is set by the GST Council against
            each item&apos;s HSN or SAC code and can be revised — use this
            as a quick reference, not a classification guide:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Rate</th>
                  <th className="px-4 py-2 font-semibold">Typically applies to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">0%</td>
                  <td className="px-4 py-2">Exempted essentials (many unprocessed foods, specific healthcare/education services), individual life &amp; health insurance premiums</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">0.25%</td>
                  <td className="px-4 py-2">Rough (uncut, unpolished) diamonds</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">3%</td>
                  <td className="px-4 py-2">Gold, silver and other precious metals/jewellery</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">5%</td>
                  <td className="px-4 py-2">GST 2.0 merit rate — essential goods, edible oil, sugar, spices, many household essentials and packaged goods</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">12% / 28%</td>
                  <td className="px-4 py-2">Pre-GST-2.0 legacy slabs — largely phased out; some transition invoices dated before 22 September 2025, or a small number of notified items, may still cite these</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">18%</td>
                  <td className="px-4 py-2">GST 2.0 standard rate — most goods and services, including most electronics, appliances and professional services</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">40%</td>
                  <td className="px-4 py-2">Luxury and demerit (sin) goods — high-end vehicles, tobacco, aerated/sugary drinks — replacing the old 28% + compensation cess combination</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ash/50">
            Always confirm the exact current rate for your specific goods
            or service — by HSN code for goods, SAC code for services —
            against the official GST Council/CBIC notification before
            using it for invoicing or filing.
          </p>
        </section>

        <section aria-labelledby="worked-examples-two" className="mb-10 scroll-mt-20">
          <h2 id="worked-examples-two" className={h2Cls}>
            Two Worked Examples: Intra-State vs Inter-State
          </h2>
          <p className="text-ash/80">
            Two invoices for the same 18% rate show exactly how the split
            changes, and how the total doesn&apos;t:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            Example A — an appliance retailer&apos;s intra-state sale
          </p>
          <p className="mt-1 text-ash/80">
            A Bengaluru appliance store sells a {formatINR(15000)} inverter to
            a customer within Karnataka — an intra-state supply. GST splits
            equally:
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Base value</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">
                    {formatINR(exampleIntra.base)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">CGST (9%)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">
                    {formatINR(exampleIntra.cgst)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">SGST (9%)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">
                    {formatINR(exampleIntra.sgst)}
                  </td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">Invoice total</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">
                    {formatINR(exampleIntra.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 font-semibold text-ink-navy">
            Example B — a solar equipment supplier&apos;s inter-state sale
          </p>
          <p className="mt-1 text-ash/80">
            A Gujarat-based solar panel distributor ships {formatINR(60000)}{' '}
            worth of panels to a buyer in Maharashtra — an inter-state
            supply. The full rate is charged as a single IGST line:
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Base value</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">
                    {formatINR(exampleInter.base)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">IGST (18%)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">
                    {formatINR(exampleInter.igst)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">CGST / SGST</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">Nil</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">Invoice total</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">
                    {formatINR(exampleInter.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: both invoices apply the same 18% — one as 9%+9%, one
            as a single 18% IGST line — and both invoices must show the
            split separately, along with the seller&apos;s GSTIN, for the
            buyer to correctly claim input tax credit.
          </p>
        </section>

        <section aria-labelledby="mistakes" className="mb-10 scroll-mt-20">
          <h2 id="mistakes" className={h2Cls}>
            Common GST Calculation Mistakes to Avoid
          </h2>
          <ul className="mt-3 space-y-3">
            {[
              ['Multiplying instead of dividing on reverse calculations', 'the single most common error — to extract GST from an inclusive price, divide by (1 + rate/100) to find the base first, then subtract. Multiplying the inclusive amount directly by the rate overstates the tax every time.'],
              ['Marking the wrong supply type', 'using CGST+SGST for a sale that actually crosses state lines (or vice versa) doesn\'t change the tax amount, but it does require a correction on your GST return — a common first-year filing mistake. Confirm the buyer\'s registered state before invoicing.'],
              ['Not showing the split on the invoice', 'a valid tax invoice must show the base, the CGST/SGST or IGST, and the total as separate line items — even when the agreed price is GST-inclusive. Without this, the buyer cannot correctly claim input tax credit.'],
              ['Assuming an old slab still applies', 'since GST 2.0 (22 September 2025), the main slabs are 5% and 18%, with 40% for demerit goods — the old 12%/28% slabs were largely phased out. Verify your item\'s current rate rather than assuming a rate you remember from before the reform.'],
              ['Treating MRP as pure profit', 'an MRP already includes GST, so a portion of every sale at MRP must be remitted as tax, not kept as revenue. Always extract the GST from an inclusive selling price before treating the remainder as income.'],
              ['Guessing the rate instead of checking the HSN/SAC code', 'GST rates are notified against HSN codes (goods) and SAC codes (services), not plain descriptions — two similar-looking products can sit in different slabs. Confirm the applicable rate for your specific code on the CBIC portal before invoicing.'],
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
                  ['How to add GST?', 'Total = base × (1 + rate/100)'],
                  ['How to remove GST?', 'Base = inclusive ÷ (1 + rate/100)'],
                  ['Common reverse mistake', 'Multiplying the inclusive amount by the rate'],
                  ['Intra-state split', 'CGST + SGST, each half the rate'],
                  ['Inter-state', 'Full rate as a single IGST line'],
                  ['Main GST 2.0 slabs', '5% and 18%'],
                  ['Demerit/luxury rate', '40%'],
                  ['Gold & precious metals', '3%'],
                  ['Does the split change the total?', 'No — total tax is identical either way'],
                  ['Exports', 'Zero-rated, with input tax credit refund'],
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

        <FinancialCrossSell current="gst-calculator" />

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
            This is a free tool for estimates and invoice cross-checks — it applies the standard GST calculation formulas and the CGST/SGST/IGST split under the GST law administered by the Central Board of Indirect Taxes and Customs (CBIC), but does not constitute tax advice. The correct rate for a specific good or service depends on its HSN/SAC code and can change after a GST Council meeting. Compensation cess, composition-scheme rates and item-specific exemptions are not modelled. Always verify the applicable rate, HSN/SAC code and final figures on the official CBIC/GST portal before filing a return or issuing a tax invoice. See our{' '}
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
