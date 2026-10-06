import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/odisha-ev-policy-extended-december-2026'
const TITLE =
  'Odisha EV Subsidy 2026: Amounts, Deadline and What Charging Costs on Your Electricity Bill'
const DESCRIPTION =
  'Odisha has extended its Electric Vehicle Policy, 2021 to 31 December 2026. The Odisha EV subsidy is up to ₹20,000 for a two-wheeler, ₹30,000 for a three-wheeler and ₹1.5 lakh for a four-wheeler, with road tax waived.'
const LAST_UPDATED = '6 October 2026'
const AS_OF = '4 October 2026'
const POLICY_URL =
  'https://ct.odisha.gov.in/sites/default/files/2023-07/EV%20Policy%20-%202021(Amended%202023)_0.pdf'
const TARIFF_URL =
  'https://www.orierc.org/CuteSoft_Client/writereaddata/upload/DISCOMs_Tariff_Notification_FY_2026-27.PDF'

export const metadata: Metadata = {
  title: 'Odisha EV Subsidy 2026: Policy Extended to 31 December',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'News', path: '/news' },
  { name: TITLE, path: PATH },
])

const newsArticleLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    '@type': 'Organization',
    name: 'DesiMetrics Editorial Team',
    url: `${SITE}/author/editorial-team`,
  },
  publisher: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  datePublished: '2026-10-06',
  dateModified: '2026-10-06',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'Until when is the Odisha EV policy valid?',
    a: 'The Odisha Electric Vehicle Policy, 2021 is valid until 31 December 2026. The Commerce and Transport Department extended it by a notification issued on 3 October 2026 under para 11.5 of the policy, as reported by PTI.',
  },
  {
    q: 'How much is the Odisha EV subsidy for a two-wheeler?',
    a: 'The Odisha EV subsidy for a two-wheeler is ₹5,000 per kWh of battery capacity, up to a maximum of ₹20,000. A 3 kWh scooter gets ₹15,000, and a battery of 4 kWh or more reaches the ₹20,000 maximum.',
  },
  {
    q: 'How much is the Odisha EV subsidy for a car?',
    a: 'The Odisha EV subsidy for a four-wheeler is ₹10,000 per kWh of battery capacity, up to a maximum of ₹1,50,000. A battery of 15 kWh or more reaches the maximum.',
  },
  {
    q: 'Is road tax waived on electric vehicles in Odisha?',
    a: 'Yes. Odisha exempted all categories of electric vehicle from registration fees and motor vehicle taxes by Notification No. 9191 dated 29 October 2021, for the policy period.',
  },
  {
    q: 'How is the Odisha EV subsidy paid?',
    a: 'The subsidy is credited to the bank account of the buyer by the Regional Transport Office where the vehicle is registered. The manufacturer must have registered the model and its battery capacity on the Odisha EV Subsidy Portal.',
  },
  {
    q: 'Who cannot claim the Odisha EV subsidy?',
    a: 'Electric vehicles purchased by government departments and offices are not entitled to the subsidy, according to a Transport Commissioner letter issued after the April 2023 amendment.',
  },
  {
    q: 'How much does it cost to charge an EV at home in Odisha?',
    a: 'Home charging in Odisha is billed on the domestic tariff of ₹2.90 to ₹6.10 per unit. Filling a 3 kWh scooter battery takes about 3.33 units at 90% charger efficiency, which costs about ₹20 at the top slab rate of ₹6.10.',
  },
  {
    q: 'What is the EV charging station tariff in Odisha?',
    a: 'Public charging stations in Odisha are billed under the General Purpose category at a single-part tariff of ₹5.00 per unit from 1 April 2026. That is what the station pays for electricity; the price a driver pays is set by the station operator.',
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

const subsidyRows: [string, string, string][] = [
  ['Two-wheeler', '₹5,000 per kWh of battery', '₹20,000'],
  ['Three-wheeler', 'Flat amount per vehicle', '₹30,000'],
  ['Four-wheeler', '₹10,000 per kWh of battery', '₹1,50,000'],
  ['Passenger bus', '10% of vehicle cost', '₹2 lakh non-AC, ₹3 lakh AC, ₹4 lakh AC Deluxe'],
  ['Goods carrier', 'Flat amount, first 5,000 registered', '₹30,000'],
]

const exampleRows: [string, string, string][] = [
  ['Scooter, 2 kWh battery', '2 × ₹5,000', '₹10,000'],
  ['Scooter, 3 kWh battery', '3 × ₹5,000', '₹15,000'],
  ['Scooter, 4.5 kWh battery', '4.5 × ₹5,000 = ₹22,500, capped', '₹20,000'],
  ['Car, 30 kWh battery', '30 × ₹10,000 = ₹3,00,000, capped', '₹1,50,000'],
]

const tariffRows: [string, string][] = [
  ['Up to 50 units a month', '₹2.90'],
  ['51–200 units', '₹4.70'],
  ['201–400 units', '₹5.70'],
  ['Above 400 units', '₹6.10'],
]

const chargeRows: [string, string, string, string][] = [
  ['Scooter, 3 kWh', '3.33', '₹15.67', '₹20.33'],
  ['Car, 30 kWh', '33.33', '₹156.67', '₹203.33'],
]

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-hub-news" aria-hidden>
        ✓
      </span>
      <span className={pCls}>{children}</span>
    </li>
  )
}

export default function OdishaEvPolicyPage() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'News', href: '/news' },
          { label: 'Odisha EV Subsidy', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> Odisha · EV Policy · OERC
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '📅', big: '31 Dec 2026', small: 'Policy valid until', tone: 'caution-amber' },
          { icon: '🛵', big: '₹20,000', small: 'Two-wheeler maximum', tone: 'hub' },
          { icon: '🚗', big: '₹1.5 lakh', small: 'Four-wheeler maximum', tone: 'hub' },
          { icon: '🔌', big: '₹2.90–6.10', small: 'Home charging, per unit', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          By{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · Last updated {LAST_UPDATED} · Details as of {AS_OF} ·{' '}
          <a
            href={POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Primary source: Odisha EV Policy (amended 2023)
          </a>{' '}
          ·{' '}
          <a
            href="https://energy.economictimes.indiatimes.com/news/power/odisha-extends-ev-policy-validity-till-december-31-2026-to-boost-green-mobility/134674590"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            News source: PTI via ETEnergyWorld
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            The Odisha EV subsidy now runs until 31 December 2026, after the state extended the
            Odisha Electric Vehicle Policy, 2021.
          </strong>{' '}
          The Commerce and Transport Department issued the extension on 3 October 2026, as
          reported by PTI. Under the policy as amended on 26 April 2023, the subsidy is ₹5,000
          per kWh up to ₹20,000 for a two-wheeler, a flat ₹30,000 for a three-wheeler, and
          ₹10,000 per kWh up to ₹1,50,000 for a four-wheeler, with road tax and registration fees
          waived. This explainer covers what changed, the subsidy by vehicle type, how it is
          paid, what charging costs on the Odisha electricity tariff, and the deadline.
        </p>

        <section aria-labelledby="what-changed" className="mt-10 scroll-mt-20">
          <h2 id="what-changed" className={h2Cls}>
            What Changed in the Odisha EV Policy?
          </h2>
          <p className={pCls}>
            One thing changed in the Odisha EV policy: its validity date, which is now 31
            December 2026.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">New end date:</strong> the policy is valid until
              31 December 2026, by a notification issued under para 11.5 of the policy, which
              lets the state government amend any provision.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Earlier end date:</strong> the department&apos;s
              own subsidy notification defined the policy period as running up to 31 December
              2025.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Amounts unchanged:</strong> the reports of the
              extension describe no change to the subsidy amounts, so the April 2023 rates
              continue.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            We have not seen the extension notification itself, and the reports do not say how
            purchases made between 1 January 2026 and the notification are treated. Confirm that
            point with your Regional Transport Office before relying on it.
          </p>
          <p className={takeawayCls}>
            Takeaway: the Odisha EV subsidy and tax waiver stay available for vehicles registered
            up to 31 December 2026.
          </p>
        </section>

        <section aria-labelledby="amounts" className="mt-10 scroll-mt-20">
          <h2 id="amounts" className={h2Cls}>
            How Much Is the Odisha EV Subsidy by Vehicle Type?
          </h2>
          <p className={pCls}>
            The Odisha EV subsidy depends on vehicle type and, for two- and four-wheelers, on
            battery capacity. The table gives the rate and the maximum for each of the five
            categories.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Odisha EV purchase subsidy by vehicle category, rate and maximum
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Vehicle</th>
                  <th className="px-4 py-2 font-semibold">How it is calculated</th>
                  <th className="px-4 py-2 font-semibold">Maximum subsidy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {subsidyRows.map(([vehicle, rate, max]) => (
                  <tr key={vehicle}>
                    <td className="px-4 py-2 font-medium">{vehicle}</td>
                    <td className="px-4 py-2">{rate}</td>
                    <td className="px-4 py-2 tabular-nums">{max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            Some reports also list 15% of vehicle cost capped at ₹5,000, ₹10,000 and ₹50,000.
            Those are the original 2021 rates. A Transport Commissioner letter states that they
            apply to vehicles bought from 1 September 2021 until 26 April 2023, and that
            purchases on or after 26 April 2023 get the amended rates in the table. The PTI
            report gives a bus range of ₹4 lakh to ₹20 lakh; the policy text we read limits the
            bus subsidy to ₹4 lakh.
          </p>
          <p className={takeawayCls}>
            Takeaway: for a purchase today, the per-kWh rates apply, not the old 15% rule.
          </p>
        </section>

        <section aria-labelledby="example" className="mt-10 scroll-mt-20">
          <h2 id="example" className={h2Cls}>
            How Is the Odisha EV Subsidy Calculated? Worked Examples
          </h2>
          <p className={pCls}>
            The subsidy is battery capacity in kWh multiplied by the per-kWh rate, limited to the
            maximum. The table works four illustrative cases; a scooter priced at ₹1.2 lakh with
            a 3 kWh battery gets ₹15,000, whatever its price.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Illustrative Odisha EV subsidy calculations by battery capacity
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Vehicle (illustrative)</th>
                  <th className="px-4 py-2 font-semibold">Calculation</th>
                  <th className="px-4 py-2 font-semibold">Subsidy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {exampleRows.map(([vehicle, calc, amount]) => (
                  <tr key={vehicle}>
                    <td className="px-4 py-2 font-medium">{vehicle}</td>
                    <td className="px-4 py-2">{calc}</td>
                    <td className="px-4 py-2 tabular-nums">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            A two-wheeler reaches its maximum at 4 kWh and a four-wheeler at 15 kWh. To compare
            running costs against petrol, use our{' '}
            <Link href="/financial/ev-vs-fuel-cost-calculator" className="text-brass underline">
              EV vs fuel cost calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: the subsidy follows battery size, so the vehicle&apos;s price does not
            change it.
          </p>
        </section>

        <section aria-labelledby="tax" className="mt-10 scroll-mt-20">
          <h2 id="tax" className={h2Cls}>
            Is Road Tax Waived on Electric Vehicles in Odisha?
          </h2>
          <p className={pCls}>
            Road tax is waived on electric vehicles in Odisha, along with registration fees, for
            the policy period.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Registration fees and motor vehicle taxes</strong>{' '}
              are exempted for all categories of electric vehicle by Notification No. 9191 dated
              29 October 2021.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Interest subvention</strong> of 5% on loans for
              personal electric vehicles is also provided for in the policy.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Three-wheelers</strong> get an open permit for
              autos under the same policy.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: the tax waiver comes on top of the purchase subsidy, not in place of it.
          </p>
        </section>

        <section aria-labelledby="claim" className="mt-10 scroll-mt-20">
          <h2 id="claim" className={h2Cls}>
            How Is the Odisha EV Subsidy Paid?
          </h2>
          <p className={pCls}>
            The Odisha EV subsidy is paid into the buyer&apos;s bank account by the Regional
            Transport Office where the vehicle is registered. The policy notifications and the
            department&apos;s letters set out three steps and two conditions.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>
              First, the manufacturer registers the model and its battery capacity on the Odisha
              EV Subsidy Portal; the per-kWh subsidy depends on that entry.
            </li>
            <li>Next, the vehicle is registered at a Regional Transport Office in Odisha.</li>
            <li>Finally, that office credits the subsidy to the buyer&apos;s bank account.</li>
          </ol>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Not eligible:</strong> vehicles purchased by
              government departments and offices.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Two-wheeler criteria:</strong> a minimum top
              speed of 40 km/h, energy use not above 7 kWh per 100 km, and at least a three-year
              warranty that includes the battery.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            We found no official source for a residency rule, a price cap or a limit of one
            vehicle per person, so we do not state any. Ask your dealer or the transport office
            which documents are needed.
          </p>
          <p className={takeawayCls}>
            Takeaway: the money comes from the transport office to your account, after
            registration.
          </p>
        </section>

        <section aria-labelledby="charging" className="mt-10 scroll-mt-20">
          <h2 id="charging" className={h2Cls}>
            What Does EV Charging Cost on the Odisha Electricity Tariff?
          </h2>
          <p className={pCls}>
            EV charging at home in Odisha costs ₹2.90 to ₹6.10 per unit, because it is billed on
            the ordinary domestic tariff. The table gives the four slabs in the Odisha
            Electricity Regulatory Commission (OERC) tariff effective 1 April 2026.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Odisha domestic electricity tariff slabs, effective 1 April 2026
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Monthly consumption</th>
                  <th className="px-4 py-2 font-semibold">Rate per unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {tariffRows.map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            Charging adds units on top of what the home already uses, so it is priced at the
            slab those extra units fall in. The next table shows one full charge at two slab
            rates, assuming 90% charger efficiency.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Cost of one full home charge in Odisha at ₹4.70 and ₹6.10 per unit
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Battery</th>
                  <th className="px-4 py-2 font-semibold">Units drawn</th>
                  <th className="px-4 py-2 font-semibold">At ₹4.70</th>
                  <th className="px-4 py-2 font-semibold">At ₹6.10</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {chargeRows.map(([battery, units, mid, top]) => (
                  <tr key={battery}>
                    <td className="px-4 py-2 font-medium">{battery}</td>
                    <td className="px-4 py-2 tabular-nums">{units}</td>
                    <td className="px-4 py-2 tabular-nums">{mid}</td>
                    <td className="px-4 py-2 tabular-nums">{top}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Public charging stations</strong> are billed
              under the General Purpose category at a single-part tariff of ₹5.00 per unit. That
              is the station&apos;s electricity cost; the price a driver pays is set by the
              operator.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Housing society chargers</strong> on a separate
              connection are treated as public charging stations.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">All four distribution companies</strong> —
              TPCODL, TPWODL, TPSODL and TPNODL — use this one tariff. Electricity duty is
              charged on top.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            Work out your own figure with the{' '}
            <Link href="/electricity/ev-charging-cost-calculator" className="text-brass underline">
              EV charging cost calculator
            </Link>
            , or see the whole bill in the{' '}
            <Link
              href="/electricity/odisha-electricity-bill-calculator"
              className="text-brass underline"
            >
              Odisha electricity bill calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: a full scooter charge costs about ₹16 to ₹20 at home, and a 30 kWh car
            about ₹157 to ₹203.
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            Deadline and What to Watch
          </h2>
          <p className={pCls}>
            The deadline is 31 December 2026, and two things decide what follows it.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">A draft successor exists.</strong> The state
              released a Draft Odisha Electric Vehicle Policy, 2025 for consultation in September
              2025, as reported by Organiser on 10 September 2025. We found no report that it has been
              notified.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">The tariff is reviewed yearly.</strong> The OERC
              rates above took effect on 1 April 2026 and continue until the Commission&apos;s
              next order.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            We make no prediction about a further extension. As of {AS_OF}, the Odisha EV subsidy
            and the road tax waiver run until 31 December 2026.
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            See what charging adds to your Odisha bill
          </h2>
          <p className={`mt-2 ${pCls}`}>
            Enter your monthly units, including charging, to see the bill on the current Odisha
            slabs.
          </p>
          <Link
            href="/electricity/odisha-electricity-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Open the Odisha electricity bill calculator →
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
          Last updated: {LAST_UPDATED}; details as of {AS_OF}. Subsidy amounts, the tax waiver,
          payment procedure and eligibility criteria are from the Odisha Electric Vehicle Policy,
          2021 and its gazette notifications, including the amendment of 26 April 2023, and from a
          Transport Commissioner letter of 2023. The extension to 31 December 2026 is as reported
          by PTI; we did not obtain that notification. Tariffs are from the{' '}
          <a href={TARIFF_URL} target="_blank" rel="noopener noreferrer" className="text-brass underline">
            OERC Retail Supply Tariff Notification for FY 2026-27
          </a>
          . Charging costs assume 90% charger efficiency and exclude electricity duty. See our{' '}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
