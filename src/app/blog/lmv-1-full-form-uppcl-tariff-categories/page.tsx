import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/lmv-1-full-form-uppcl-tariff-categories'
const TITLE = 'LMV-1 Full Form in UPPCL: Every Tariff Category from LMV-1 to HV-4 Explained'
const DESCRIPTION =
  'LMV-1 is the UPPCL rate schedule for Domestic Light, Fan and Power, the category most Uttar Pradesh homes are billed under. See what LMV means and what each schedule from LMV-1 to HV-4 covers.'
const LAST_UPDATED = '5 October 2026'

export const metadata: Metadata = {
  title: 'LMV-1 Full Form in UPPCL & All LMV / HV Categories',
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
    q: 'What is the full form of LMV-1 in UPPCL?',
    a: 'LMV-1 is the UPPCL rate schedule titled Domestic Light, Fan and Power. LMV is generally read as Low and Medium Voltage, and the number 1 marks the first schedule in the list, which covers homes.',
  },
  {
    q: 'What does LMV mean on a UPPCL bill?',
    a: 'LMV on a UPPCL bill marks a rate schedule for supply at low and medium voltage. The Uttar Pradesh Electricity Regulatory Commission tariff order uses the label without spelling it out; the HV schedules are for supply at 11 kV and above.',
  },
  {
    q: 'What is LMV-2 in UPPCL?',
    a: 'LMV-2 is the UPPCL rate schedule for Non-Domestic Light, Fan and Power. It covers shops, offices and other commercial connections.',
  },
  {
    q: 'What is the difference between LMV-1 and LMV-2?',
    a: 'LMV-1 is for domestic use and LMV-2 is for non-domestic or commercial use. If part of a load below 50 kW is used for business, the whole consumption is charged under the non-domestic schedule that fits that use.',
  },
  {
    q: 'What is LMV-6 in UPPCL?',
    a: 'LMV-6 is the UPPCL rate schedule for Small and Medium Power, which covers industrial connections with a contracted load below 100 HP (75 kW).',
  },
  {
    q: 'Is there an LMV-10 category in UPPCL?',
    a: 'The retail rate schedule for FY 2025-26 has no LMV-10 schedule; it runs from LMV-1 to LMV-9 and then LMV-11. Employees of the licensees are covered under LMV-1.',
  },
  {
    q: 'What is LMV-11 in UPPCL?',
    a: 'LMV-11 is the UPPCL rate schedule for Electric Vehicle Charging. Public charging stations pay ₹7.70 per unit at low tension and ₹7.30 per unit at high tension under the FY 2025-26 schedule.',
  },
  {
    q: 'How do I know which LMV category my connection is in?',
    a: 'Your category is printed on your UPPCL bill as the tariff or supply type, for example LMV-1. It is set by the purpose of the connection declared when it was sanctioned.',
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

const lmvRows: [string, string, string][] = [
  ['LMV-1', 'Domestic Light, Fan & Power', 'Homes'],
  ['LMV-2', 'Non-Domestic Light, Fan and Power', 'Shops, offices, commercial use'],
  ['LMV-3', 'Public Lamps', 'Street lighting'],
  ['LMV-4', 'Light, Fan & Power for Public Institutions and Private Institutions', 'Institutions'],
  ['LMV-5', 'Small Power for Private Tube Wells / Pumping Sets for Irrigation Purposes', 'Farm pumps'],
  ['LMV-6', 'Small and Medium Power', 'Industry below 100 HP (75 kW)'],
  ['LMV-7', 'Public Water Works', 'Water supply and sewage pumping'],
  ['LMV-8', 'State Tube Wells / Panchayati Raj Tube Well & Pumped Canals', 'Government irrigation'],
  ['LMV-9', 'Temporary Supply', 'Short-term connections'],
  ['LMV-11', 'Electric Vehicle Charging', 'EV charging'],
]

const hvRows: [string, string][] = [
  ['HV-1', 'Non-Industrial Bulk Loads'],
  ['HV-2', 'Large and Heavy Power'],
  ['HV-3', 'Railway Traction'],
  ['HV-4', 'Lift Irrigation Works'],
]

const evRows: [string, string][] = [
  ['Multistoried buildings, low tension', '₹6.20 per unit'],
  ['Multistoried buildings, high tension', '₹5.90 per unit'],
  ['Public charging station, low tension', '₹7.70 per unit'],
  ['Public charging station, high tension', '₹7.30 per unit'],
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

export default function LmvCategoriesArticlePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'LMV-1 and UPPCL Categories', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏷️</span> Explainer · Uttar Pradesh
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
            LMV-1 in UPPCL is the rate schedule titled &ldquo;Domestic Light, Fan &amp;
            Power&rdquo;, the category under which Uttar Pradesh homes are billed.
          </strong>{' '}
          The Uttar Pradesh Electricity Regulatory Commission (UPERC) retail tariff schedule for
          FY 2025-26 lists 10 LMV schedules and 4 HV schedules, 14 in all. LMV is generally read
          as Low and Medium Voltage. This guide gives the full form of LMV-1, the title of every
          schedule from LMV-1 to HV-4, and how to find the category on your own bill.
        </p>

        <section aria-labelledby="lmv1" className="mt-10 scroll-mt-20">
          <h2 id="lmv1" className={h2Cls}>
            What Is the Full Form of LMV-1 in UPPCL?
          </h2>
          <p className={pCls}>
            The full form of LMV-1 in UPPCL is the schedule name &ldquo;Domestic Light, Fan &amp;
            Power&rdquo;, with LMV read as Low and Medium Voltage. UPERC&apos;s order uses the
            label LMV without spelling it out, and three points fix its meaning.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">LMV</strong> marks supply at low and medium
              voltage, in contrast to the HV schedules, which apply to supply at 11 kV and above.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">The number</strong> is the position of the
              schedule in the list; 1 is domestic, 2 is non-domestic, and so on.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">LMV-1 applies to</strong> premises for
              residential or domestic purposes, and also to places of worship, shelter homes,
              orphanages and old age homes named in the schedule.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: LMV-1 on a bill means a domestic connection billed on the home tariff.
          </p>
        </section>

        <section aria-labelledby="all-lmv" className="mt-10 scroll-mt-20">
          <h2 id="all-lmv" className={h2Cls}>
            What Does Each UPPCL LMV Category Cover?
          </h2>
          <p className={pCls}>
            Each UPPCL LMV category covers one type of use, from homes to electric vehicle
            charging. The table lists the 10 LMV schedules with the title UPERC gives each one.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                UPPCL LMV rate schedules with official titles, FY 2025-26
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Schedule</th>
                  <th className="px-4 py-2 font-semibold">Official title</th>
                  <th className="px-4 py-2 font-semibold">In plain words</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {lmvRows.map(([code, title, plain]) => (
                  <tr key={code}>
                    <td className="px-4 py-2 font-medium">{code}</td>
                    <td className="px-4 py-2">{title}</td>
                    <td className="px-4 py-2 text-ash/70">{plain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            The list has no LMV-10. The FY 2025-26 rate schedule runs from LMV-1 to LMV-9 and then
            LMV-11, and employees of the licensees are covered under LMV-1.
          </p>
          <p className={takeawayCls}>
            Takeaway: the LMV number tells you the purpose of the connection, not the size of the
            bill.
          </p>
        </section>

        <section aria-labelledby="hv" className="mt-10 scroll-mt-20">
          <h2 id="hv" className={h2Cls}>
            What Are the UPPCL HV Categories?
          </h2>
          <p className={pCls}>
            The UPPCL HV categories are four schedules for large connections supplied at high
            voltage. The table lists each one.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">UPPCL HV rate schedules with official titles</caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Schedule</th>
                  <th className="px-4 py-2 font-semibold">Official title</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {hvRows.map(([code, title]) => (
                  <tr key={code}>
                    <td className="px-4 py-2 font-medium">{code}</td>
                    <td className="px-4 py-2">{title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            HV-1 shows how the two families connect: it applies to commercial loads, as defined
            under LMV-2, once the contracted load is 75 kW or more and supply is taken at a
            single point at 11 kV or above.
          </p>
          <p className={takeawayCls}>
            Takeaway: a growing commercial connection moves from LMV-2 to HV-1 at 75 kW on 11 kV
            supply.
          </p>
        </section>

        <section aria-labelledby="lmv1-vs-lmv2" className="mt-10 scroll-mt-20">
          <h2 id="lmv1-vs-lmv2" className={h2Cls}>
            LMV-1 vs LMV-2: Which One Applies to You?
          </h2>
          <p className={pCls}>
            LMV-1 applies when the connection is used for domestic purposes, and LMV-2 applies
            when it is used for non-domestic ones. Two rules in the LMV-1 schedule decide the
            mixed cases.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Business use on a small load:</strong> below 50
              kW, if any part of the load is used for a non-domestic business, the entire energy
              consumed is charged under the schedule for that non-domestic use, subject to the
              exception in the Electricity Supply Code.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Housing societies:</strong> at 50 kW and above,
              registered societies and multi-storied buildings on single-point supply stay in
              LMV-1 if at least 70% of the contracted load is for domestic light, fan and power.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Lifeline consumers:</strong> rural consumers with
              a 1 kW load and use up to 100 units a month pay ₹50 per kW and ₹3.00 per unit after
              the state subsidy.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            The urban LMV-1 slab rates and a worked bill are in our{' '}
            <Link href="/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL bill guide
            </Link>
            , and you can test your own units in the{' '}
            <Link href="/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: running a shop from a home connection can move the whole bill off LMV-1.
          </p>
        </section>

        <section aria-labelledby="lmv11" className="mt-10 scroll-mt-20">
          <h2 id="lmv11" className={h2Cls}>
            What Is LMV-11 for Electric Vehicle Charging?
          </h2>
          <p className={pCls}>
            LMV-11 is the UPPCL schedule for electric vehicle charging, with a flat energy charge
            and no demand charge for separate charging connections. The table gives the four
            rates.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">UPPCL LMV-11 EV charging energy charges</caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Connection</th>
                  <th className="px-4 py-2 font-semibold">Energy charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {evRows.map(([conn, rate]) => (
                  <tr key={conn}>
                    <td className="px-4 py-2 font-medium">{conn}</td>
                    <td className="px-4 py-2 tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            A home on LMV-1 charges its vehicle on the existing connection at the domestic rate;
            the schedule tells such consumers to use their existing connection and to seek a
            higher sanctioned load if charging needs it. Our{' '}
            <Link href="/electricity/ev-charging-cost-calculator" className="text-brass underline">
              EV charging cost calculator
            </Link>{' '}
            works out the cost per charge.
          </p>
          <p className={takeawayCls}>
            Takeaway: LMV-11 is for dedicated charging connections; home charging stays on LMV-1.
          </p>
        </section>

        <section aria-labelledby="find" className="mt-10 scroll-mt-20">
          <h2 id="find" className={h2Cls}>
            How to Find Your LMV Category on a UPPCL Bill
          </h2>
          <p className={pCls}>
            To find your LMV category, read the tariff or supply type field on your UPPCL bill.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>First, open your latest bill, on paper or from the UPPCL consumer portal.</li>
            <li>Next, look for the field labelled tariff, category or supply type.</li>
            <li>Then match the code, such as LMV-1 or LMV-2, to the tables above.</li>
            <li>Finally, ask your distribution office to correct it if the code does not match how you use the connection.</li>
          </ol>
          <p className={`mt-4 ${pCls}`}>
            These schedules are from the retail tariff for FY 2025-26, and UPERC kept tariffs
            unchanged for FY 2026-27, as reported by Power Peak Digest. LMV-1 remains the
            schedule for Domestic Light, Fan and Power.
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            Estimate your UPPCL bill
          </h2>
          <p className={`mt-2 ${pCls}`}>
            Pick your connection type and enter your units to see the bill on the published
            slabs.
          </p>
          <Link
            href="/electricity/uppcl-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Open the UPPCL bill calculator →
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
          Last updated: {LAST_UPDATED}. Schedule titles, applicability rules, the lifeline rate
          and the LMV-11 charges are from the &ldquo;Retail Tariffs for Financial Year
          2025-26&rdquo; annexure of the Uttar Pradesh Electricity Regulatory Commission&apos;s
          tariff order for the UPPCL distribution companies. That order does not expand the
          abbreviation LMV; &ldquo;Low and Medium Voltage&rdquo; is the common reading. See our{' '}
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
