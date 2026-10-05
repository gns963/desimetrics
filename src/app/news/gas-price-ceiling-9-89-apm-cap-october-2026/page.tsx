import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gas-price-ceiling-9-89-apm-cap-october-2026'
const TITLE = 'Gas Price Ceiling Raised to $9.89: Will CNG and PNG Get Costlier?'
const DESCRIPTION =
  'The ceiling for gas from deepwater and other difficult fields rose from $8.90 to $9.89 per MMBTU for 1 October 2026 to 31 March 2027. The $7 cap on APM gas, which feeds CNG and piped gas, did not change.'
const LAST_UPDATED = '5 October 2026'
const VALID_PERIOD = '1 October 2026 – 31 March 2027'
const PPAC_CEILING_URL =
  'https://ppac.gov.in/download.php?file=importantnews/1790767955_Gas_Price_Ceiling_October2026-March2027.pdf'
const PPAC_APM_URL =
  'https://ppac.gov.in/download.php?file=importantnews/1790767940_Domestic_Natural_Gas_Price_October_2026.pdf'

export const metadata: Metadata = {
  title: 'Gas Price Ceiling $9.89, APM Cap $7: CNG & PNG Impact',
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
  datePublished: '2026-10-05',
  dateModified: '2026-10-05',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'What is the new gas price ceiling?',
    a: 'The gas price ceiling for gas from deepwater, ultra-deepwater and high pressure-high temperature discoveries is US$ 9.89 per MMBTU for 1 October 2026 to 31 March 2027, according to a Petroleum Planning and Analysis Cell (PPAC) notification dated 30 September 2026. The previous ceiling was $8.90.',
  },
  {
    q: 'Will CNG and PNG get costlier because the ceiling rose to $9.89?',
    a: 'No CNG or PNG price change follows from this notification alone. The ceiling applies to gas from difficult fields. The gas allocated to city gas companies for CNG and domestic PNG is APM gas, and its $7 cap did not change. A retail price changes only when a city gas company announces it.',
  },
  {
    q: 'Did the APM gas price change in October 2026?',
    a: 'The price ONGC and Oil India are paid for APM gas did not change: it remains capped at US$ 7.00 per MMBTU. The formula price PPAC notified for 1 to 31 October 2026 is US$ 11.22 per MMBTU, which is above the cap, so the cap applies.',
  },
  {
    q: 'Why is the notified price $11.22 when the cap is $7?',
    a: 'The $11.22 figure is the output of the pricing formula, which sets domestic gas at 10% of the Indian crude basket price each month. Gas from the nomination fields of ONGC and Oil India is subject to a ceiling, currently $7.00, so producers are paid $7.00 whenever the formula price is higher.',
  },
  {
    q: 'What is the difference between a gas price ceiling and a gas price?',
    a: 'A gas price ceiling is the maximum a producer may charge, not the price itself. Producers of difficult-field gas have marketing and pricing freedom up to the ceiling, so a contract price can sit below it.',
  },
  {
    q: 'Which gas fields does the $9.89 ceiling apply to?',
    a: 'The $9.89 ceiling applies to gas from discoveries in deepwater, ultra-deepwater and high pressure-high temperature areas. The PTI report on the notification names the Reliance-BP KG-D6 block as an example.',
  },
  {
    q: 'What is MMBTU?',
    a: 'MMBTU stands for million British thermal units, a measure of the energy in gas. Wholesale gas is priced in US dollars per MMBTU, while a household PNG bill is charged in rupees per standard cubic metre (SCM).',
  },
  {
    q: 'When is the gas price ceiling revised next?',
    a: 'The difficult-field ceiling is notified for six months at a time, from 1 April and 1 October, so the next one applies from 1 April 2027. The APM formula price is notified every month.',
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

const ceilingRows: [string, string, string][] = [
  ['Oct 2022 – Mar 2023', '$12.46', 'News report'],
  ['Apr – Sep 2023', '$12.12', 'News report'],
  ['Oct 2023 – Mar 2024', '$9.96', 'News report'],
  ['Apr – Sep 2024', '$9.87', 'News report'],
  ['Oct 2024 – Mar 2025', '$10.16', 'FIPI report'],
  ['Apr – Sep 2025', '$10.04', 'News report'],
  ['Oct 2025 – Mar 2026', '$9.72', 'FIPI report'],
  ['Apr – Sep 2026', '$8.90', 'FIPI report'],
  ['Oct 2026 – Mar 2027', '$9.89', 'PPAC notification'],
]

const capRows: [string, string][] = [
  ['From April 2023', '$6.50'],
  ['From April 2025', '$6.75'],
  ['From April 2026', '$7.00'],
]

/** A single horizontal bar sliced into proportional segments — the same
 *  visual language as the other news posts' bands (SupplyBand,
 *  GenerationMixBand), here splitting the October formula price into the
 *  part producers are paid and the part above the cap. */
function PriceCapBand({
  label,
  segments,
}: {
  label: string
  segments: { name: string; value: number; shade: string }[]
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">{label}</p>
      <div
        className="mt-2 flex h-14 w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-hairline"
        role="group"
        aria-label={label}
      >
        {segments.map((s) => (
          <div
            key={s.name}
            style={{ width: `${(s.value / total) * 100}%` }}
            className={`flex flex-col items-center justify-center gap-0.5 px-1 text-center ${s.shade}`}
          >
            <span className="text-[10px] font-medium tracking-wide text-white/80">{s.name}</span>
            <span className="font-display text-sm font-bold tabular-nums text-white">
              ${s.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

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

export default function GasPriceCeilingPage() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'News', href: '/news' },
          { label: 'Gas Price Ceiling', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> National · PPAC · Natural gas
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '🔺', big: '$9.89', small: 'Difficult-field ceiling per MMBTU', tone: 'caution-amber' },
          { icon: '↩️', big: '$8.90', small: 'Previous ceiling (Apr–Sep 2026)', tone: 'hub' },
          { icon: '🔒', big: '$7.00', small: 'APM cap, unchanged', tone: 'hub' },
          { icon: '📅', big: '6 months', small: VALID_PERIOD, tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          By{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · Last updated {LAST_UPDATED} ·{' '}
          <a
            href={PPAC_CEILING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Primary source: PPAC notification
          </a>{' '}
          ·{' '}
          <a
            href="https://energy.economictimes.indiatimes.com/news/oil-and-gas/govt-raises-deepwater-gas-price-ceiling-to-9-89-per-mmbtu-apm-gas-cap-at-7/134670778"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            News source: PTI via ETEnergyWorld
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            The gas price ceiling for gas from deepwater and other difficult fields rose from
            $8.90 to $9.89 per MMBTU
          </strong>{' '}
          for {VALID_PERIOD}, under a Petroleum Planning and Analysis Cell (PPAC) notification
          dated 30 September 2026. The cap that matters most for CNG and PNG did not change:
          gas from the legacy fields of ONGC and Oil India, known as APM gas, stays capped at
          $7.00 per MMBTU.{' '}
          <strong>No CNG or PNG price change follows from this notification alone.</strong> This
          explainer covers what changed, how a ceiling differs from a price, how the two pricing
          regimes compare, and how gas reaches a CNG pump or a kitchen burner.
        </p>

        <section aria-labelledby="what-changed" className="mt-10 scroll-mt-20">
          <h2 id="what-changed" className={h2Cls}>
            What Changed in the Gas Price Ceiling?
          </h2>
          <p className={pCls}>
            One ceiling changed and one cap stayed the same, across two PPAC notifications dated
            30 September 2026.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Raised:</strong> the ceiling for gas from
              deepwater, ultra-deepwater and high pressure-high temperature discoveries is now
              US$ 9.89 per MMBTU, valid for {VALID_PERIOD}. That is $0.99, or 11.1%, above the
              previous $8.90.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Unchanged:</strong> the ceiling on APM gas from
              the nomination fields of ONGC and Oil India is US$ 7.00 per MMBTU for 1 to 31
              October 2026.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Notified but not paid:</strong> the formula price
              of domestic natural gas for October is US$ 11.22 per MMBTU, which the $7.00 ceiling
              overrides for ONGC and Oil India.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            Both documents state prices on a gross calorific value basis. The first is linked
            above; the second is PPAC&apos;s{' '}
            <a
              href={PPAC_APM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              Domestic Natural Gas Price notification for October 2026
            </a>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: the ceiling that rose covers difficult-field gas; the cap on APM gas is the
            same as it was in September.
          </p>
        </section>

        <section aria-labelledby="ceiling-vs-price" className="mt-10 scroll-mt-20">
          <h2 id="ceiling-vs-price" className={h2Cls}>
            What Is the Difference Between a Ceiling and a Price?
          </h2>
          <p className={pCls}>
            A ceiling is the most a producer may charge, and a price is what a buyer actually
            pays under its contract.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Pricing freedom:</strong> producers of
              difficult-field gas have marketing and pricing freedom under a Ministry of
              Petroleum and Natural Gas notification dated 21 March 2016, which the PPAC order
              cites.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">A limit, not a rate:</strong> a contract price
              sits at or below the ceiling. A higher ceiling raises a buyer&apos;s price only
              where the old ceiling was holding that price down.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Six-month validity:</strong> the ceiling is
              notified from 1 April and 1 October each year.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: $9.89 is an upper limit for one category of gas, not a new price for all
            gas.
          </p>
        </section>

        <section aria-labelledby="two-regimes" className="mt-10 scroll-mt-20">
          <h2 id="two-regimes" className={h2Cls}>
            Difficult-Field Gas vs APM Gas: Two Pricing Regimes
          </h2>
          <p className={pCls}>
            India prices domestic gas under two regimes that differ in source, rule and revision
            cycle. The table compares the two as they stand in October 2026.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Difficult-field gas and APM gas pricing compared, October 2026
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">Difficult-field gas</th>
                  <th className="px-4 py-2 font-semibold">APM gas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Source</td>
                  <td className="px-4 py-2">
                    Deepwater, ultra-deepwater and high pressure-high temperature discoveries
                  </td>
                  <td className="px-4 py-2">Nomination fields of ONGC and Oil India</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Pricing rule</td>
                  <td className="px-4 py-2">Producer sets the price, up to a ceiling</td>
                  <td className="px-4 py-2">
                    10% of the Indian crude basket price, within a floor and a ceiling
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Limit now</td>
                  <td className="px-4 py-2">$9.89 per MMBTU</td>
                  <td className="px-4 py-2">$7.00 per MMBTU</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Revised</td>
                  <td className="px-4 py-2">Every six months</td>
                  <td className="px-4 py-2">Formula price every month</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            The difficult-field ceiling has moved in both directions. The table below lists the
            nine most recent six-month ceilings, in US dollars per MMBTU.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Gas price ceiling for difficult fields by six-month period, October 2022 to March
                2027
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Period</th>
                  <th className="px-4 py-2 font-semibold">Ceiling</th>
                  <th className="px-4 py-2 font-semibold">Our source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {ceilingRows.map(([period, ceiling, source], i) => (
                  <tr key={period} className={i === ceilingRows.length - 1 ? 'bg-mist/60' : ''}>
                    <td className="px-4 py-2 font-medium">{period}</td>
                    <td className="px-4 py-2 tabular-nums">{ceiling}</td>
                    <td className="px-4 py-2 text-ash/70">{source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            The new $9.89 ceiling is above the $8.90 of the previous six months and below the
            $10.16 that applied from October 2024. Earlier figures are from the Federation of
            Indian Petroleum Industry&apos;s monthly Policy &amp; Economic Reports and from news
            reports of each PPAC notification; only the latest row was read from the notification
            itself.
          </p>
          <p className={takeawayCls}>
            Takeaway: the rise reverses a cut made six months ago; it does not set a record.
          </p>
        </section>

        <section aria-labelledby="apm-cap" className="mt-10 scroll-mt-20">
          <h2 id="apm-cap" className={h2Cls}>
            Why Is the APM Price $11.22 on Paper but $7 in Practice?
          </h2>
          <p className={pCls}>
            The APM price is $11.22 on paper because that is what the formula produces, and $7.00
            in practice because a ceiling overrides the formula for ONGC and Oil India.
          </p>
          <PriceCapBand
            label="October 2026 formula price of $11.22 per MMBTU, split at the APM cap"
            segments={[
              { name: 'Paid to ONGC / Oil India', value: 7.0, shade: 'bg-hub-news' },
              { name: 'Above the cap, not paid', value: 4.22, shade: 'bg-hub-news/40' },
            ]}
          />
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">The formula:</strong> since April 2023, domestic
              gas is priced each month at 10% of the Indian crude basket price, under a Ministry
              of Petroleum and Natural Gas notification dated 7 April 2023.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">The ceiling:</strong> paragraph 4 of that
              notification caps the price for nomination-field gas. PPAC&apos;s October order
              sets the cap at $7.00, which is $4.22 below the formula price.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">New wells:</strong> gas from new wells in
              nomination blocks earns a 10% premium over the APM price, which works out to $7.70,
              as reported by PTI. The two PPAC notifications do not state this figure.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            The APM cap has risen in two steps since the 2023 reform. The table shows the cap at
            each step.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">APM gas price cap timeline, 2023 to 2026</caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Period</th>
                  <th className="px-4 py-2 font-semibold">APM cap per MMBTU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {capRows.map(([period, cap]) => (
                  <tr key={period}>
                    <td className="px-4 py-2 font-medium">{period}</td>
                    <td className="px-4 py-2 tabular-nums">{cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: the number to watch for CNG and PNG is the $7.00 cap, not the $11.22
            formula price.
          </p>
        </section>

        <section aria-labelledby="cgd" className="mt-10 scroll-mt-20">
          <h2 id="cgd" className={h2Cls}>
            How Does Gas Reach CNG and PNG?
          </h2>
          <p className={pCls}>
            Gas reaches CNG pumps and piped connections through city gas distribution (CGD)
            companies, which buy from more than one source and then set their own retail price.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">APM gas comes first.</strong> Domestically
              produced APM gas is allocated to CGD companies for two priority segments, CNG and
              domestic PNG.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">The allocation has shrunk.</strong> From 16 April
              2025 the APM allocation was cut by 20% for Indraprastha Gas and 18% for Mahanagar
              Gas, with costlier new-well gas supplied in its place, according to the
              companies&apos; disclosures as reported at the time.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">The retail price is the company&apos;s.</strong>{' '}
              Each CGD company sets its own rate per SCM for PNG and per kg for CNG, and state
              VAT is added on top.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            We found no CGD notice linking a price change to this notification. A Goodreturns
            price roundup dated 1 October 2026 shows PNG rates unchanged in every city it lists,
            and CNG rates up in some states and down in others. To see what your own company
            charges, open its page in our gas calculators:{' '}
            <Link href="/gas/igl" className="text-brass underline">
              IGL
            </Link>
            ,{' '}
            <Link href="/gas/mahanagar-gas" className="text-brass underline">
              Mahanagar Gas
            </Link>
            ,{' '}
            <Link href="/gas/adani-gas" className="text-brass underline">
              Adani Total Gas
            </Link>{' '}
            or{' '}
            <Link href="/gas/gujarat-gas" className="text-brass underline">
              Gujarat Gas
            </Link>
            . Our guide to{' '}
            <Link href="/blog/png-piped-gas-bill-guide-india" className="text-brass underline">
              how a PNG bill is calculated
            </Link>{' '}
            explains the rest of the bill.
          </p>
          <p className={takeawayCls}>
            Takeaway: a CNG or PNG price moves when a city gas company announces it, not when a
            ceiling is notified.
          </p>
        </section>

        <section aria-labelledby="who" className="mt-10 scroll-mt-20">
          <h2 id="who" className={h2Cls}>
            Who Is Affected by the Higher Ceiling?
          </h2>
          <p className={pCls}>
            The higher ceiling affects producers of difficult-field gas directly and other
            sectors only through their own gas contracts.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Producers</strong> of deepwater and high
              pressure-high temperature gas may charge up to $9.89, against $8.90 before. The PTI
              report names the Reliance-BP KG-D6 block as an example and gives the aim as
              encouraging investment in technically difficult offshore fields.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Fertiliser, power and city gas</strong> are the
              priority sectors that receive APM gas, per the same report. The APM cap for those
              supplies is unchanged at $7.00.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">Households</strong> see no direct change. We
              found no statement from a producer, fertiliser maker or power company on this
              notification.
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            Takeaway: the notification changes what some producers may charge, not what any
            household bill says.
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            What to Watch Next
          </h2>
          <p className={pCls}>
            Three dated events decide whether any of this reaches a consumer price.
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">Monthly APM notification:</strong> PPAC notifies
              the formula price and the cap for each month; the next covers November 2026.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">1 April 2027:</strong> the next six-month
              difficult-field ceiling takes effect. The APM cap last stepped up in April 2025 and
              April 2026.
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">City gas company notices:</strong> a retail CNG
              or PNG change appears first in the company&apos;s own price notice.
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            We make no prediction about future fuel prices. The gas price ceiling of $9.89 holds
            until 31 March 2027, and the $7.00 APM cap is the figure that feeds CNG and PNG.
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-gas/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            Check your own gas bill
          </h2>
          <p className={`mt-2 ${pCls}`}>
            Enter your consumption and your city gas company&apos;s rate to see your PNG bill
            worked out.
          </p>
          <Link
            href="/gas"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Open the gas bill calculators →
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
          Last updated: {LAST_UPDATED}. The $9.89 ceiling, the $11.22 formula price and the $7.00
          cap are taken from PPAC&apos;s two notifications dated 30 September 2026. The previous
          $8.90 ceiling, the new-well premium, the named fields and the policy aim are as
          reported by PTI via ETEnergyWorld on 4 October 2026 and are not stated in those
          notifications. See our{' '}
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
