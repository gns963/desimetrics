import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/mvca-charges-electricity-bill-west-bengal'
const TITLE = 'MVCA Charges in Your Electricity Bill: What They Are and Why They Change'
const DESCRIPTION =
  'MVCA charges are the Monthly Variable Cost Adjustment that WBSEDCL adds per unit, on top of the energy charge, to recover changes in its power purchase cost. See how MVCA is set, billed and trued up.'
const LAST_UPDATED = '5 October 2026'

export const metadata: Metadata = {
  title: 'MVCA Charges in Electricity Bill (WBSEDCL) Explained',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Blog', path: '/blog' },
  { name: TITLE, path: PATH },
])

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    '@type': 'Organization',
    name: 'DesiMetrics Editorial Team',
    url: `${SITE}/author/editorial-team`,
  },
  publisher: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  datePublished: '2026-10-05',
  dateModified: '2026-10-05',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'What is the full form of MVCA?',
    a: 'MVCA stands for Monthly Variable Cost Adjustment. It is a per-unit charge that a West Bengal distribution company adds to the energy charge to recover variation in its power purchase cost.',
  },
  {
    q: 'What are MVCA charges in a WBSEDCL bill?',
    a: 'MVCA charges in a WBSEDCL bill are the Monthly Variable Cost Adjustment, shown as a separate line and charged on the units consumed in that month. The rates in the WBSEDCL tariff schedule exclude MVCA, so it is always an addition to the energy charge.',
  },
  {
    q: 'What is the current MVCA rate?',
    a: 'We do not publish a current MVCA rate because we could not verify one from a primary source; third-party sites give different figures. The rate that applies to you is the one printed on your own bill and in the MVCA notification on the WBSEDCL website.',
  },
  {
    q: 'Why does the MVCA charge change?',
    a: 'The MVCA charge changes because it follows the variation in the distribution company’s power purchase cost, which moves from month to month. The base tariff is fixed by a tariff order and does not move with those costs.',
  },
  {
    q: 'Is MVCA the same as FPPCA?',
    a: 'No. MVCA is the monthly recovery. FPPCA, the Fuel and Power Purchase Cost Adjustment, is the yearly exercise in which the regulator trues up what was recovered through MVCA against actual costs.',
  },
  {
    q: 'Can I avoid paying MVCA?',
    a: 'No. MVCA is charged on every unit consumed, so the only way to lower it is to use fewer units. WBSEDCL prepaid consumers get a 3% rebate on the energy charge including the applicable MVCA.',
  },
  {
    q: 'What is VCA in an electricity bill?',
    a: 'VCA stands for Variable Cost Adjustment, the name Chhattisgarh’s distribution company used for the same kind of per-unit cost adjustment. CSPDCL’s FY 2026-27 tariff order refers to FPPAS, the Fuel and Power Purchase Adjustment Surcharge.',
  },
  {
    q: 'Does an online bill calculator include MVCA?',
    a: 'Our West Bengal calculator does not include MVCA, because the rate changes and we have no verified current figure. Its estimate covers the energy charge and fixed charge, so a real bill is higher by the MVCA and electricity duty.',
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

const h2Cls = 'font-display mb-3 text-2xl font-bold text-ink-navy'
const pCls = 'text-ash/80'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

const nameRows: [string, string, string][] = [
  ['MVCA', 'Monthly Variable Cost Adjustment', 'West Bengal (WBSEDCL)'],
  ['VCA', 'Variable Cost Adjustment', 'Chhattisgarh (CSPDCL), older bills'],
  ['FPPAS', 'Fuel and Power Purchase Adjustment Surcharge', 'Chhattisgarh (CSPDCL), FY 2026-27 order'],
  ['FCA / FAC / FPPCA', 'Fuel cost or fuel and power purchase cost adjustment', 'Several other states'],
]

const exampleRows: [string, string][] = [
  ['Units consumed in the month', '300'],
  ['Illustrative MVCA rate', '₹0.20 per unit'],
  ['MVCA line on the bill (300 × ₹0.20)', '₹60.00'],
]

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-hub-electricity" aria-hidden>
        ✓
      </span>
      <span className={pCls}>{children}</span>
    </li>
  )
}

export default function MvcaChargesArticlePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'MVCA Charges', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🧾</span> Explainer · West Bengal
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          By{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · Last updated {LAST_UPDATED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            MVCA charges are the Monthly Variable Cost Adjustment: a per-unit amount added to an
            electricity bill, on top of the energy charge, to recover variation in the
            distribution company&apos;s power purchase cost.
          </strong>{' '}
          West Bengal State Electricity Distribution Company Ltd (WBSEDCL) levies it under the
          West Bengal Electricity Regulatory Commission&apos;s tariff order dated 20 March 2025,
          whose rates took effect on 1 April 2025 and exclude MVCA. This explainer covers what
          MVCA is, how it is billed, why it changes, and what the same charge is called in other
          states.
        </p>

        <section aria-labelledby="what-is" className="mt-10 scroll-mt-20">
          <h2 id="what-is" className={h2Cls}>
            What Are MVCA Charges?
          </h2>
          <p className={pCls}>
            MVCA charges are a separate bill line that recovers the gap between the power
            purchase cost assumed in the tariff and the cost the company actually pays. WBSEDCL&apos;s
            gist of the 2025-26 tariff order sets out three rules for it.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Excluded from the tariff:</strong> the rates in
              the tariff schedule exclude MVCA, so MVCA is always an addition to the energy
              charge.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Computed by formula:</strong> MVCA is computed
              with the formula in the Tariff Regulations and recovered on the energy consumed in
              the respective month.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Shown separately:</strong> MVCA is shown as its
              own line on the consumer&apos;s bill.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: MVCA is not part of your slab rate; it is a per-unit add-on that follows
            power purchase costs.
          </p>
        </section>

        <section aria-labelledby="how-billed" className="mt-10 scroll-mt-20">
          <h2 id="how-billed" className={h2Cls}>
            How Is MVCA Calculated on a Bill?
          </h2>
          <p className={pCls}>
            MVCA on a bill is the month&apos;s MVCA rate multiplied by the units consumed in that
            month. The table works one case with an illustrative rate, not a current one.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Illustrative MVCA calculation for 300 units at 20 paise per unit
              </caption>
              <tbody className="divide-y divide-hairline">
                {exampleRows.map(([label, value], i) => (
                  <tr key={label} className={i === exampleRows.length - 1 ? 'bg-mist/60' : ''}>
                    <td className="px-4 py-2 font-medium">{label}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            We do not publish a current MVCA rate. Third-party sites quote different figures, and
            we could not confirm one from a primary source. The rate that applies to you is the
            one on your own bill and in the MVCA notification on the WBSEDCL website. WBSEDCL
            bills many domestic consumers quarterly, so one bill can carry MVCA for three
            separate months.
          </p>
          <p className={takeawayCls}>
            Takeaway: units × that month&apos;s MVCA rate gives the MVCA line; read the rate off
            your own bill.
          </p>
        </section>

        <section aria-labelledby="why-changes" className="mt-10 scroll-mt-20">
          <h2 id="why-changes" className={h2Cls}>
            Why Do MVCA Charges Change?
          </h2>
          <p className={pCls}>
            MVCA charges change because the cost of buying power moves every month while the base
            tariff stays fixed until the next tariff order.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Recovery is monthly.</strong> WBSEDCL recovers
              any variation in power purchase cost under MVCA in addition to the energy charge.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Truing up is yearly.</strong> The MVCA realised
              is subject to truing up during the Fuel and Power Purchase Cost Adjustment (FPPCA)
              and the Annual Performance Review for the year.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Prepaid consumers get a rebate.</strong>{' '}
              Consumers under the prepaid scheme get a 3% rebate on the energy charge, including
              the applicable MVCA charge.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: MVCA is the monthly estimate and FPPCA is the yearly settlement of the same
            cost.
          </p>
        </section>

        <section aria-labelledby="other-names" className="mt-10 scroll-mt-20">
          <h2 id="other-names" className={h2Cls}>
            MVCA, VCA, FPPAS and FCA: Same Idea, Different Names
          </h2>
          <p className={pCls}>
            MVCA, VCA, FPPAS and FCA are four names for the same kind of line: a pass-through of
            power purchase cost changes. The table lists each name with its full form and where
            it is used.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Names used for power purchase cost adjustment charges, by state
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Name on the bill</th>
                  <th className="px-4 py-2 font-semibold">Full form</th>
                  <th className="px-4 py-2 font-semibold">Where it is used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {nameRows.map(([name, full, where]) => (
                  <tr key={name}>
                    <td className="px-4 py-2 font-medium">{name}</td>
                    <td className="px-4 py-2">{full}</td>
                    <td className="px-4 py-2">{where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            For how this line sits beside the fixed charge, energy charge and electricity duty,
            see{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              fixed charges vs FCA
            </Link>
            . Chhattisgarh consumers can estimate a bill with the{' '}
            <Link
              href="/electricity/chhattisgarh-electricity-bill-calculator"
              className="text-brass underline"
            >
              Chhattisgarh electricity bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: if your bill says VCA or FPPAS in place of MVCA, it is the same mechanism
            under your state&apos;s name.
          </p>
        </section>

        <section aria-labelledby="estimate" className="mt-10 scroll-mt-20">
          <h2 id="estimate" className={h2Cls}>
            How to Estimate a West Bengal Bill With MVCA
          </h2>
          <p className={pCls}>
            To estimate a West Bengal bill with MVCA, work out the base bill first and then add
            the MVCA line from your latest bill.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>
              First, calculate the energy charge and fixed charge with the{' '}
              <Link href="/electricity/wbsedcl-bill-calculator" className="text-brass underline">
                WBSEDCL bill calculator
              </Link>
              , which excludes MVCA and electricity duty.
            </li>
            <li>Next, find the MVCA rate per unit printed on your most recent bill.</li>
            <li>Then multiply that rate by the units for each month and add the result.</li>
            <li>Finally, add electricity duty, which is also outside the base estimate.</li>
          </ol>
          <p className={`mt-4 ${pCls}`}>
            The full slab tables are in our{' '}
            <Link href="/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL bill guide
            </Link>
            . MVCA charges remain the Monthly Variable Cost Adjustment whichever month you check:
            a per-unit add-on that follows power purchase cost.
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            Work out your base WBSEDCL bill
          </h2>
          <p className={`mt-2 ${pCls}`}>
            Enter your units to see the energy and fixed charges, then add your bill&apos;s MVCA
            line.
          </p>
          <Link
            href="/electricity/wbsedcl-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Open the WBSEDCL bill calculator →
          </Link>
        </section>

        <section aria-labelledby="faq" className="mt-10 scroll-mt-20">
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
        </section>

        <p className="mt-10 text-sm text-ash/40">
          Last updated: {LAST_UPDATED}. The MVCA rules quoted here are from WBSEDCL&apos;s
          &ldquo;Gist of Tariff Order 2025-26&rdquo;, which summarises the West Bengal Electricity
          Regulatory Commission&apos;s order dated 20 March 2025. The FPPAS reference is from the
          Chhattisgarh State Electricity Regulatory Commission&apos;s tariff order for FY 2026-27.
          No current MVCA rate is given because none was verified. See our{' '}
          <Link href="/methodology" className="text-brass underline">
            methodology
          </Link>{' '}
          for how we source and verify figures.
        </p>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
