import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/transmission-distribution-costs-electricity-bill-india'
const TITLE =
  'Where Does Your Electricity Bill Go? Transmission and Distribution Costs Explained'
const DESCRIPTION =
  'Transmission and distribution costs are the part of an Indian electricity bill that pays for the grid. See how transmission charges, wheeling charges and line losses reach your bill, with AT&C losses by state.'
const LAST_UPDATED = '5 October 2026'

export const metadata: Metadata = {
  title: 'Transmission & Distribution Costs in Your Electricity Bill',
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
    q: 'What are transmission and distribution costs in an electricity bill?',
    a: 'Transmission and distribution costs are the part of an electricity bill that pays for the grid: the high-voltage lines and substations that carry power across states, the local network that delivers it to homes, and the energy lost along the way. They reach a household bill through transmission charges, wheeling charges and line losses.',
  },
  {
    q: 'Do the L&T transmission orders announced on 5 October 2026 change my electricity bill?',
    a: 'No. They are construction contracts awarded to a builder, as reported by ETEnergyWorld on 5 October 2026. Two of the three are in Saudi Arabia and the UAE, and the Indian order is for a private developer in Visakhapatnam. No tariff order is linked to them.',
  },
  {
    q: 'What is a wheeling charge?',
    a: "A wheeling charge is the per-unit price for using a distribution company's local network to carry electricity to a consumer. State regulators approve it by voltage level. In its MYT Order in Case No. 210 of 2024, the Maharashtra regulator approved ₹2.76 per unit at low tension and ₹0.80 per unit at high tension for Tata Power's Mumbai network in FY 2025-26.",
  },
  {
    q: 'What is the difference between AT&C loss and T&D loss?',
    a: 'T&D loss counts only the energy that is generated but never reaches a meter. AT&C loss also counts electricity that is supplied but not billed, or billed but not paid for. AT&C loss is therefore the wider measure, and the two percentages are not interchangeable.',
  },
  {
    q: "What is India's AT&C loss?",
    a: "India's overall AT&C loss was 15.04% in FY 2024-25, down from 15.97% in FY 2023-24, according to the Ministry of Power's 14th Integrated Rating and Ranking of Power Distribution Utilities, which covers 65 utilities.",
  },
  {
    q: 'Which states have the lowest AT&C losses?',
    a: 'Among the states reported from the same rating report for FY 2024-25, Kerala had the lowest AT&C loss at 6.61%, followed by Andhra Pradesh at 7.87% and Gujarat at 8.25%. Madhya Pradesh was among the highest at 22.76%.',
  },
  {
    q: 'Is there a separate transmission charge on a household electricity bill?',
    a: 'Usually not. Most domestic bills fold grid costs into the energy charge and the fixed charge. Maharashtra is one state where a wheeling charge appears as its own line on the bill.',
  },
  {
    q: 'Why do renewable energy projects need new transmission lines?',
    a: 'Solar and wind plants are built where the sun and wind resources are, which is often far from the cities that use the power. Lines and substations are needed to carry, or evacuate, that power to the grid. The Union Cabinet approved Green Energy Corridor Phase-III on 30 September 2026 to evacuate up to 135 GW of renewable energy.',
  },
  {
    q: 'Does a new transmission line raise electricity tariffs?',
    a: 'A new line by itself does not change a tariff. The cost of a transmission asset reaches consumers only through charges that a central or state regulator approves, and no regulator order links the orders reported on 5 October 2026 to any tariff.',
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
const liCls = 'flex items-start gap-2'

const wheelingRows: [string, string, string][] = [
  ['Extra-high tension (EHT)', '₹0.04', '0.00%'],
  ['High tension (HT)', '₹0.80', '0.37%'],
  ['Low tension (LT)', '₹2.76', '2.29%'],
]

const stateRows: [string, string, string][] = [
  ['Kerala', '/electricity/kseb-bill-calculator', '6.61%'],
  ['Andhra Pradesh', '/electricity/andhra-pradesh-electricity-bill-calculator', '7.87%'],
  ['Gujarat', '/electricity/gujarat-electricity-bill-calculator', '8.25%'],
  ['Maharashtra', '/electricity/msedcl-bill-calculator', '17.69%'],
  ['Odisha', '/electricity/odisha-electricity-bill-calculator', '17.81%'],
  ['Punjab', '/electricity/punjab-electricity-bill-calculator', '19.21%'],
  ['Uttar Pradesh', '/electricity/uppcl-bill-calculator', '19.54%'],
  ['Telangana', '/electricity/telangana-electricity-bill-calculator', '19.84%'],
  ['Madhya Pradesh', '/electricity/madhya-pradesh-electricity-bill-calculator', '22.76%'],
]

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className={liCls}>
      <span className="mt-0.5 text-hub-electricity" aria-hidden>
        ✓
      </span>
      <span className={pCls}>{children}</span>
    </li>
  )
}

export default function TransmissionDistributionCostsArticlePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Transmission & Distribution Costs', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🗼</span> Explainer
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
          · Last updated {LAST_UPDATED} ·{' '}
          <a
            href="https://energy.economictimes.indiatimes.com/news/power/lt-bags-10000-15000-cr-power-transmission-orders-across-india-and-west-asia/134687027"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            News source: ETEnergyWorld
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            Transmission and distribution costs are the part of an electricity bill that
            pays for the grid
          </strong>
          : the high-voltage lines and substations that carry power across states, the
          local network that delivers it to a home, and the energy lost on the way. These
          grid costs reach a bill by three routes — transmission charges, wheeling charges
          and line losses. India&apos;s distribution utilities recorded an aggregate
          technical and commercial (AT&amp;C) loss of 15.04% in FY 2024-25, according to
          the Ministry of Power&apos;s 14th Integrated Rating and Ranking of Power
          Distribution Utilities. This guide explains each route, compares losses by
          state, and shows why renewable energy needs new lines and substations.
        </p>

        <section aria-labelledby="news" className="mt-10 scroll-mt-20">
          <h2 id="news" className={h2Cls}>
            The L&amp;T Transmission Orders in Two Sentences
          </h2>
          <p className={pCls}>
            Larsen &amp; Toubro&apos;s Power Transmission &amp; Distribution business won
            multiple &lsquo;mega&rsquo; orders across Saudi Arabia, the UAE and India, as
            reported by ETEnergyWorld on 5 October 2026; L&amp;T uses &lsquo;mega&rsquo;
            for orders worth ₹10,000–15,000 crore, given as one range for the set. The
            orders cover 380 kV transmission and substation work in Saudi Arabia, 132/11
            kV substations in the UAE, and a transmission system of lines and substations
            in Visakhapatnam for a private sector developer.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>
              These orders do not change any consumer&apos;s electricity bill.
            </strong>{' '}
            They are construction contracts awarded to a builder, two of the three are
            outside India, and no tariff order is linked to them. They are a useful prompt
            for a different question: how the grid is paid for.
          </p>
          <p className={takeawayCls}>
            Takeaway: a transmission order is a building contract, not a tariff change.
          </p>
        </section>

        <section aria-labelledby="what-is" className="mt-10 scroll-mt-20">
          <h2 id="what-is" className={h2Cls}>
            What Are Transmission and Distribution?
          </h2>
          <p className={pCls}>
            Transmission and distribution are the two stages that move electricity from a
            power plant to a meter. The two stages differ in voltage, distance and owner.
          </p>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="font-semibold text-ink-navy">Transmission</dt>
              <dd className={pCls}>
                Transmission carries bulk power over long distances at high voltage. The
                380 kV lines in the Saudi Arabia order are transmission assets.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-navy">Substation</dt>
              <dd className={pCls}>
                A substation changes voltage between stages. A 132/11 kV substation, like
                those in the UAE order, steps power down from 132 kV to 11 kV.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-navy">Distribution</dt>
              <dd className={pCls}>
                Distribution delivers power at lower voltage from the substation to homes,
                shops and factories. The distribution company (DISCOM) that sends the bill
                runs this last stage.
              </dd>
            </div>
          </dl>
          <p className={takeawayCls}>
            Takeaway: transmission moves power in bulk, distribution delivers it to the
            meter, and both have to be paid for.
          </p>
        </section>

        <section aria-labelledby="how-costs-reach" className="mt-10 scroll-mt-20">
          <h2 id="how-costs-reach" className={h2Cls}>
            How Do Grid Costs Reach Your Bill?
          </h2>
          <p className={pCls}>
            Grid costs reach a bill through three routes, each set through a
            regulator&apos;s order before a DISCOM recovers it.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Transmission charges</strong> pay for the
              inter-state and intra-state lines. Under the Central Electricity Regulatory
              Commission (Sharing of Inter-State Transmission Charges and Losses)
              Regulations, 2020, DISCOMs are billed in four components — national,
              regional, transformer and AC system. The national component includes the
              lines built for renewable energy projects.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Wheeling charges</strong> pay for the
              DISCOM&apos;s own local network. State regulators approve a per-unit
              wheeling charge for each voltage level.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Line losses</strong> are the units that
              are bought but never billed. A DISCOM buys more power than it sells, and
              the cost of the approved loss sits inside the tariff.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            Wheeling charges rise as voltage falls, because low-tension consumers use
            more of the network. The table shows the wheeling charges and wheeling losses
            that the Maharashtra Electricity Regulatory Commission approved for Tata
            Power&apos;s Mumbai distribution network for FY 2025-26, in its MYT Order in
            Case No. 210 of 2024.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Approved wheeling charges and wheeling losses by voltage level, Tata Power
                Mumbai distribution, FY 2025-26
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Voltage level</th>
                  <th className="px-4 py-2 font-semibold">Wheeling charge (per unit)</th>
                  <th className="px-4 py-2 font-semibold">Wheeling loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {wheelingRows.map(([level, charge, loss]) => (
                  <tr key={level}>
                    <td className="px-4 py-2 font-medium">{level}</td>
                    <td className="px-4 py-2">{charge}</td>
                    <td className="px-4 py-2">{loss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            A low-tension unit carries a wheeling charge 69 times the extra-high-tension
            one in that order. Most household bills do not show these grid costs as
            separate lines; they sit inside the energy charge and the fixed charge.
            Maharashtra is one state where a wheeling charge appears as its own line; our{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL bill calculator
            </Link>{' '}
            does not model that line. For the lines that do appear on most bills, see{' '}
            <Link
              href="/blog/fixed-charges-vs-fca-electricity-bill"
              className="text-brass underline"
            >
              fixed charges vs FCA
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: grid costs are real and regulator-approved, but on most bills they
            are folded into charges you already see.
          </p>
        </section>

        <section aria-labelledby="atc-vs-td" className="mt-10 scroll-mt-20">
          <h2 id="atc-vs-td" className={h2Cls}>
            What Is the Difference Between AT&amp;C Loss and T&amp;D Loss?
          </h2>
          <p className={pCls}>
            AT&amp;C loss and T&amp;D loss measure two different gaps, so the two
            percentages are not interchangeable.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">T&amp;D loss</strong> counts energy only:
              units generated that never reach a meter. India recorded a T&amp;D loss of
              16.64% in FY 2023-24 — 3.55% in transmission and 13.09% in distribution —
              as reported by The Sunday Guardian on 27 July 2025, citing Ministry of
              Power data given in the Lok Sabha.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">AT&amp;C loss</strong> counts energy and
              money: it adds units that are supplied but not billed, and bills that are
              not paid. It is calculated as 1 − (billing efficiency × collection
              efficiency).
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Distribution</strong> carries most of
              the loss in both measures. In the FY 2023-24 figures, distribution accounts
              for 13.09 of the 16.64 percentage points.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: T&amp;D loss is an engineering number, AT&amp;C loss is an
            engineering-plus-billing number — check which one a headline is quoting.
          </p>
        </section>

        <section aria-labelledby="losses-by-state" className="mt-10 scroll-mt-20">
          <h2 id="losses-by-state" className={h2Cls}>
            AT&amp;C Losses by State (FY 2024-25)
          </h2>
          <p className={pCls}>
            AT&amp;C losses by state range from 6.61% in Kerala to 22.76% in Madhya
            Pradesh among the nine states below, against a national figure of 15.04%.
            The table lists the FY 2024-25 AT&amp;C loss for each state, linked to its
            electricity bill calculator.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                AT&amp;C loss by state for FY 2024-25, with the national figure
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">State</th>
                  <th className="px-4 py-2 font-semibold">AT&amp;C loss, FY 2024-25</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {stateRows.map(([state, href, loss]) => (
                  <tr key={state}>
                    <td className="px-4 py-2 font-medium">
                      <Link href={href} className="text-brass underline">
                        {state}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{loss}</td>
                  </tr>
                ))}
                <tr className="bg-mist/60">
                  <td className="px-4 py-2 font-semibold text-ink-navy">All India</td>
                  <td className="px-4 py-2 font-semibold text-ink-navy">15.04%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            These figures come from the Ministry of Power&apos;s 14th Integrated Rating
            and Ranking of Power Distribution Utilities, which covers 65 utilities, as
            reported by T&amp;D India on 27 January 2026 and, for Uttar Pradesh, by
            SolarQuarter on 31 January 2026. The table is limited to the nine states for
            which we found a reported figure; it is not a full ranking. Each DISCOM also
            works to a loss target: Madhya Pradesh&apos;s East Discom recorded a 28.04%
            distribution loss against a 15.5% target, according to the same Sunday
            Guardian report.
          </p>
          <p className={takeawayCls}>
            Takeaway: the same unit of power costs a DISCOM more to deliver in a
            high-loss state than in a low-loss one.
          </p>
        </section>

        <section aria-labelledby="renewables" className="mt-10 scroll-mt-20">
          <h2 id="renewables" className={h2Cls}>
            Why Do Renewables Need New Lines and Substations?
          </h2>
          <p className={pCls}>
            Renewables need new lines and substations because solar and wind plants are
            built where the resource is, not where the demand is. Carrying that power to
            the grid is called evacuation, and three milestones show its scale in India.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">The gap was identified in 2012.</strong>{' '}
              A Power Grid Corporation of India study found evacuation infrastructure
              near renewable sites insufficient, according to the Ministry of Power.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Green Energy Corridor Phase-I</strong>{' '}
              targeted 9,700 circuit km of intra-state lines and 22,600 MVA of
              substations at a project cost of ₹10,141.68 crore, approved in 2015.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Green Energy Corridor Phase-III</strong>{' '}
              was approved by the Union Cabinet on 30 September 2026 with an outlay of
              ₹1,86,405 crore to evacuate up to 135 GW: ₹1,36,378 crore for intra-state
              transmission and ₹50,000 crore for 50 GWh of battery storage, with central
              assistance of ₹54,082 crore and completion set for FY 2032-33.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            The same driver appears in the L&amp;T report, which ties the orders to grid
            strengthening and renewable energy evacuation. Network charges also shape who
            pays for the grid when large consumers buy power directly, which our note on{' '}
            <Link
              href="/news/gerc-additional-surcharge-open-access-gujarat"
              className="text-brass underline"
            >
              Gujarat&apos;s open access additional surcharge
            </Link>{' '}
            covers.
          </p>
          <p className={takeawayCls}>
            Takeaway: more renewable capacity means more lines and substations, and those
            are planned and funded years ahead.
          </p>
        </section>

        <section aria-labelledby="over-time" className="mt-10 scroll-mt-20">
          <h2 id="over-time" className={h2Cls}>
            What Does This Mean for Consumers Over Time?
          </h2>
          <p className={pCls}>
            For consumers, new grid investment and lower losses pull in opposite
            directions on cost, and neither produces an automatic change in a bill.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">New assets</strong> are paid for through
              transmission and wheeling charges only after a regulator approves them. Of
              Green Energy Corridor Phase-III&apos;s ₹1,86,405 crore outlay, ₹54,082
              crore is central financial assistance.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Lower losses</strong> reduce the power a
              DISCOM buys for each unit it bills. The national AT&amp;C loss fell from
              15.97% to 15.04% in one year.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Supply shortfalls</strong> act through a
              different line, the monthly fuel and power purchase adjustment, as our note
              on{' '}
              <Link
                href="/news/india-power-shortage-september-2026"
                className="text-brass underline"
              >
                India&apos;s September 2026 power shortage
              </Link>{' '}
              explains.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            We make no claim about future tariffs. The only reliable source for what a
            consumer pays is the current tariff order of that state&apos;s regulator,
            which is what our{' '}
            <Link href="/electricity" className="text-brass underline">
              electricity bill calculators
            </Link>{' '}
            are built on.
          </p>
          <p className={takeawayCls}>
            Takeaway: transmission and distribution costs reach a bill only through
            regulator-approved charges and losses, never directly from a news headline.
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            Estimate your own electricity bill
          </h2>
          <p className={`mt-2 ${pCls}`}>
            Pick your state or DISCOM and enter your units to see the bill worked out on
            its published slabs.
          </p>
          <Link
            href="/electricity"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Open the electricity calculator hub →
          </Link>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related guides
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Fixed charges vs FCA
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The four lines that make up most Indian electricity bills.
              </p>
            </Link>
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How telescopic electricity slabs work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                How the energy charge is priced slab by slab.
              </p>
            </Link>
          </div>
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
          Last updated: {LAST_UPDATED}. The L&amp;T orders are described as reported by
          ETEnergyWorld on 5 October 2026; we did not obtain L&amp;T&apos;s own filing.
          Loss figures are as reported from the Ministry of Power&apos;s 14th Integrated
          Rating and Ranking of Power Distribution Utilities and from Ministry of Power
          data given in the Lok Sabha; wheeling figures are from the Maharashtra
          Electricity Regulatory Commission&apos;s MYT Order in Case No. 210 of 2024, as
          published by Tata Power. See our{' '}
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
