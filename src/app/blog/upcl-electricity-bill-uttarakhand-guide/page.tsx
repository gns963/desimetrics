import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/upcl-electricity-bill-uttarakhand-guide'
const TITLE = 'UPCL Bill Explained: Uttarakhand Electricity Tariff, Fixed Charges and How to Check Your Bill'
const DESCRIPTION =
  'A UPCL bill in Uttarakhand adds a slab-wise energy charge of ₹3.65 to ₹7.80 per unit to a fixed charge of ₹75 to ₹100 per kW. See the FY 2026-27 rates, a worked 250-unit example and how to view your bill.'
const LAST_UPDATED = '5 October 2026'

export const metadata: Metadata = {
  title: 'UPCL Bill: Uttarakhand Tariff Slabs & Fixed Charges 2026-27',
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
    q: 'How is a UPCL bill calculated?',
    a: 'A UPCL domestic bill adds an energy charge billed in four slabs (₹3.65, ₹5.25, ₹7.15 and ₹7.80 per unit) to a fixed charge on sanctioned load (₹75, ₹85 or ₹100 per kW per month). Electricity duty, green energy cess and the monthly fuel and power purchase cost adjustment are added on top.',
  },
  {
    q: 'What is the UPCL per unit rate in 2026-27?',
    a: 'The UPCL domestic rate for FY 2026-27 is ₹3.65 per unit up to 100 units a month, ₹5.25 for 101-200 units, ₹7.15 for 201-400 units and ₹7.80 above 400 units, under the Uttarakhand Electricity Regulatory Commission rate schedule effective 1 April 2026.',
  },
  {
    q: 'Did UPCL tariffs increase in 2026?',
    a: 'No. UPCL proposed raising the domestic slabs to ₹4.23, ₹6.09, ₹8.29 and ₹9.04 per unit, but the approved rate schedule effective 1 April 2026 keeps the domestic energy and fixed charges at their earlier level.',
  },
  {
    q: 'What is the fixed charge on a UPCL domestic connection?',
    a: 'The UPCL domestic fixed charge is ₹75 per kW per month for a sanctioned load up to 1 kW, ₹85 per kW per month above 1 kW and up to 4 kW, and ₹100 per kW per month above 4 kW. A 2 kW connection pays ₹170 a month.',
  },
  {
    q: 'What is the UPCL rate for BPL or lifeline consumers?',
    a: 'Below Poverty Line and Kutir Jyoti consumers with a load up to 1 kW and consumption up to 60 units a month pay ₹18 per connection per month and ₹1.85 per unit.',
  },
  {
    q: 'How do I check my UPCL bill online?',
    a: 'Open the UPCL website at upcl.org, choose the quick bill payment or online payment option, and enter your service connection or account number. The UPCL helpline number is 1912.',
  },
  {
    q: 'Is UPCL the same as UPPCL?',
    a: 'No. UPCL is Uttarakhand Power Corporation Ltd, which supplies Uttarakhand. UPPCL is Uttar Pradesh Power Corporation Ltd, which covers Uttar Pradesh. The two have different regulators and different tariffs.',
  },
  {
    q: 'Do prepaid meter consumers get a rebate from UPCL?',
    a: 'Yes. Domestic consumers on the prepaid metering scheme get a rebate of 4% of energy charges from the date the prepaid meter is installed and operational, under the FY 2026-27 rate schedule.',
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

const slabRows: [string, string, string][] = [
  ['Up to 100 units', '₹3.65', '₹4.23'],
  ['101–200 units', '₹5.25', '₹6.09'],
  ['201–400 units', '₹7.15', '₹8.29'],
  ['Above 400 units', '₹7.80', '₹9.04'],
]

const fixedRows: [string, string, string][] = [
  ['Up to 1 kW', '₹75 per kW', '₹75 for 1 kW'],
  ['Above 1 kW and up to 4 kW', '₹85 per kW', '₹170 for 2 kW'],
  ['Above 4 kW', '₹100 per kW', '₹500 for 5 kW'],
]

const exampleRows: [string, string][] = [
  ['Units consumed in the month', '250'],
  ['Sanctioned load', '2 kW'],
  ['First 100 units × ₹3.65', '₹365.00'],
  ['Next 100 units × ₹5.25', '₹525.00'],
  ['Next 50 units × ₹7.15', '₹357.50'],
  ['Energy charge', '₹1,247.50'],
  ['Fixed charge, 2 kW × ₹85', '₹170.00'],
  ['Total before duty, cess and adjustment', '₹1,417.50'],
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

export default function UpclBillGuidePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'UPCL Bill Guide', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏔️</span> Uttarakhand · UPCL
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
            A UPCL bill is the monthly electricity bill issued by Uttarakhand Power Corporation
            Ltd (UPCL)
          </strong>
          , and for a home it has two main parts: an energy charge of ₹3.65 to ₹7.80 per unit
          across four slabs, and a fixed charge of ₹75 to ₹100 per kW of sanctioned load. These
          rates are from the Uttarakhand Electricity Regulatory Commission (UERC) rate schedule
          effective 1 April 2026. This guide lists the UPCL tariff slabs and fixed charges, works
          a 250-unit bill, and shows how to check a UPCL bill online.
        </p>

        <section aria-labelledby="slabs" className="mt-10 scroll-mt-20">
          <h2 id="slabs" className={h2Cls}>
            What Are the UPCL Tariff Slabs for 2026-27?
          </h2>
          <p className={pCls}>
            The UPCL tariff slabs for 2026-27 are four monthly bands priced from ₹3.65 to ₹7.80
            per unit. The table shows the approved rate for each slab beside the rate UPCL had
            proposed.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                UPCL domestic energy charge by monthly slab, approved and proposed, FY 2026-27
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Monthly consumption</th>
                  <th className="px-4 py-2 font-semibold">Approved rate per unit</th>
                  <th className="px-4 py-2 font-semibold">UPCL&apos;s proposal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {slabRows.map(([slab, approved, proposed]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 tabular-nums">{approved}</td>
                    <td className="px-4 py-2 tabular-nums text-ash/60">{proposed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            UERC did not accept the proposed rise. UPCL&apos;s petition asked for an average
            increase of 15.72% across the domestic slabs, and the rate schedule in UERC&apos;s
            order on the true-up for FY 2024-25 and the annual revenue requirement for FY
            2026-27 keeps the earlier domestic rates.
          </p>
          <p className={takeawayCls}>
            Takeaway: the UPCL per unit rate for homes in 2026-27 is unchanged at ₹3.65 to ₹7.80.
          </p>
        </section>

        <section aria-labelledby="fixed" className="mt-10 scroll-mt-20">
          <h2 id="fixed" className={h2Cls}>
            What Is the UPCL Fixed Charge?
          </h2>
          <p className={pCls}>
            The UPCL fixed charge is a monthly amount per kW of sanctioned load, and the rate per
            kW rises with the size of the connection. The table gives the three load bands with
            an example for each.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                UPCL domestic fixed charge per month by sanctioned load, FY 2026-27
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Sanctioned load</th>
                  <th className="px-4 py-2 font-semibold">Fixed charge per month</th>
                  <th className="px-4 py-2 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {fixedRows.map(([load, rate, example]) => (
                  <tr key={load}>
                    <td className="px-4 py-2 font-medium">{load}</td>
                    <td className="px-4 py-2 tabular-nums">{rate}</td>
                    <td className="px-4 py-2 tabular-nums">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            The fixed charge does not move with units used. Two other domestic rates sit outside
            these bands in the same schedule.
          </p>
          <ul className="mt-3 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">BPL and lifeline consumers</strong> with a load
              up to 1 kW and consumption up to 60 units a month pay ₹18 per connection per month
              and ₹1.85 per unit.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Snowbound-area domestic consumers</strong>, in
              areas notified by the District Magistrate, pay ₹1.85 per unit under schedule
              RTS-1A.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: on a UPCL bill the fixed charge depends on sanctioned load, so a 2 kW home
            pays ₹170 a month before using a unit.
          </p>
        </section>

        <section aria-labelledby="example" className="mt-10 scroll-mt-20">
          <h2 id="example" className={h2Cls}>
            How Is a 250-Unit UPCL Bill Calculated?
          </h2>
          <p className={pCls}>
            A 250-unit UPCL bill on a 2 kW connection comes to ₹1,417.50 before duty, cess and the
            monthly adjustment. The table shows each step, billed slab by slab.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Worked UPCL domestic bill for 250 units on a 2 kW connection
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
            To run your own units and load, use the{' '}
            <Link
              href="/electricity/uttarakhand-electricity-bill-calculator"
              className="text-brass underline"
            >
              Uttarakhand electricity bill calculator
            </Link>
            . For how slab billing works in general, see{' '}
            <Link href="/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              how telescopic electricity slabs work
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: at 250 units the energy charge is ₹1,247.50 and the fixed charge is ₹170.
          </p>
        </section>

        <section aria-labelledby="other-lines" className="mt-10 scroll-mt-20">
          <h2 id="other-lines" className={h2Cls}>
            What Else Appears on a UPCL Bill?
          </h2>
          <p className={pCls}>
            A UPCL bill carries three lines beyond the energy and fixed charges, and UERC does
            not set two of them.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Electricity duty</strong> is fixed by the
              Government of Uttarakhand. UPCL collects it on the bill and pays it to the state.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Green energy cess</strong> is a state levy as
              well; UERC&apos;s order records that the Commission has no role in levying or
              removing it.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Fuel and power purchase cost adjustment</strong>{' '}
              is a monthly charge that passes through changes in UPCL&apos;s power purchase cost.
              Our guide to{' '}
              <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
                fixed charges vs FCA
              </Link>{' '}
              explains this kind of line.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            We do not state a rate for these three lines, because we have not verified current
            figures for them. Domestic consumers on prepaid meters also get a rebate of 4% of
            energy charges under the same rate schedule.
          </p>
          <p className={takeawayCls}>
            Takeaway: the worked total above is the base; your printed UPCL bill is higher by the
            duty, cess and that month&apos;s adjustment.
          </p>
        </section>

        <section aria-labelledby="check-bill" className="mt-10 scroll-mt-20">
          <h2 id="check-bill" className={h2Cls}>
            How to Check Your UPCL Bill Online
          </h2>
          <p className={pCls}>
            To check a UPCL bill online, use UPCL&apos;s own website with your account number.
            The steps are the same for viewing and for paying.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>First, open the UPCL website at upcl.org.</li>
            <li>Next, choose the quick bill payment or online payment option.</li>
            <li>Then enter your service connection or account number, as printed on a past bill.</li>
            <li>Finally, view the bill amount and due date, and pay online if you wish.</li>
          </ol>
          <p className={`mt-4 ${pCls}`}>
            For a billing complaint or an outage, the UPCL helpline number is 1912. UPCL is not
            UPPCL: Uttar Pradesh consumers are served by a different company, covered in our{' '}
            <Link href="/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL bill guide
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: keep your account number handy; it is the only detail the UPCL bill lookup
            needs.
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            Estimate your UPCL bill
          </h2>
          <p className={`mt-2 ${pCls}`}>
            Enter your units and sanctioned load to see your Uttarakhand bill worked out slab by
            slab.
          </p>
          <Link
            href="/electricity/uttarakhand-electricity-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Open the Uttarakhand bill calculator →
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
          Last updated: {LAST_UPDATED}. Tariff slabs, fixed charges, the BPL and snowbound rates
          and the prepaid rebate are from the rate schedule effective 1 April 2026 in the
          Uttarakhand Electricity Regulatory Commission&apos;s order on UPCL&apos;s true-up for FY
          2024-25, annual performance review for FY 2025-26 and annual revenue requirement for FY
          2026-27. Proposed rates are from UPCL&apos;s tariff petition. The bill-lookup steps and
          helpline number are from third-party payment guides, not from UPCL directly. See our{' '}
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
