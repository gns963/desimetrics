import type { Metadata } from 'next'
import Link from 'next/link'
import PhantomLoadChecker from '@/components/calculators/PhantomLoadChecker'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/phantom-load-checker'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const rate = marginalRatePerUnit('TNEB')
const exampleWatts = 8 + 12 + 3
const exampleDailyUnits = (exampleWatts * 24) / 1000
const exampleAnnual = exampleDailyUnits * 365 * rate

const referenceDevices: [string, string][] = [
  ['Wi-Fi router', '8W'],
  ['Set-top box (DTH/cable)', '12W'],
  ['Inverter/UPS in standby (not charging)', '10W'],
  ['Desktop PC/monitor on standby', '5W'],
  ['TV on standby (not switched off at plug)', '3W'],
  ['Microwave (clock/display)', '3W'],
  ['Washing machine on standby', '2W'],
  ['Phone/laptop charger left plugged in (no device)', '1W'],
]

export const metadata: Metadata = {
  title: 'Phantom Load / Standby Power Checker 2026 — India',
  description:
    'Find out what your always-on standby devices (router, set-top box, chargers left plugged in) cost you over a year, priced at your real DISCOM tariff.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/appliances/phantom-load-checker'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Phantom Load / Standby Power Checker',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Appliances', path: '/appliances' },
  { name: 'Phantom Load Checker', path: PATH },
])

const faqs = [
  {
    q: 'What is a "phantom load" or "standby power"?',
    a: 'It\'s the electricity a device draws while switched "off" but still plugged in and connected to power — set-top boxes, routers, and chargers with no device attached are common examples. Individually small, but they run 24/7, 365 days a year.',
  },
  {
    q: 'How much does standby power actually add up to?',
    a: `A modest handful of always-on devices (router + set-top box + a TV left on standby) can add roughly ${formatINR(exampleAnnual)}/year in Tamil Nadu at our example wattages — check the calculator above with your own devices and DISCOM for your real figure.`,
  },
  {
    q: 'Which devices are the worst offenders for standby power?',
    a: 'Set-top boxes and older inverters/UPS units tend to draw the most in standby mode among common household devices — routers are lower individually but run continuously in nearly every home, so they add up too.',
  },
  {
    q: 'Should I unplug everything when not in use?',
    a: 'For devices you don\'t need instantly available (chargers with nothing attached, appliances used rarely), yes — a power strip with a physical switch makes this easy. For a router you rely on, or a set-top box that needs to stay connected for scheduled recordings, the convenience trade-off may not be worth a few rupees a month.',
  },
  {
    q: 'Are these standby wattage figures accurate for my specific device?',
    a: 'They\'re commonly cited planning estimates for typical devices, not a measurement of your specific unit — a plug-in power meter gives an exact reading if you want precision for a particular device.',
  },
  {
    q: 'Is standby power priced the same as normal usage?',
    a: 'Yes — like any other load, standby draw adds to your total consumption and is priced at your marginal (top-slab) rate, since it\'s on top of whatever else you already use.',
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

export default function PhantomLoadPage() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'Appliances', href: '/appliances' },
          { label: 'Phantom Load Checker', href: '/appliances/phantom-load-checker' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliances hub
          </>
        }
        h1="Phantom Load / Standby Power Checker"
        subtitle={
          <>
            Devices that stay plugged in but &ldquo;off&rdquo; still draw
            power around the clock. Tick which ones apply to your home and see
            what it costs you over a year.
          </>
        }
        stats={[
          { icon: '🔄', big: '24/7', small: 'Always drawing', tone: 'hub' },
          { icon: '🔌', big: '1-15W', small: 'Typical device range', tone: 'hub' },
          { icon: '👻', big: '8', small: 'Common devices checked', tone: 'hub' },
          { icon: '📊', big: 'Real tariff', small: 'Priced on your DISCOM', tone: 'hub' },
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
          A router (8W) + set-top box (12W) + a TV left on standby (3W) draw{' '}
          <strong>{exampleWatts}W continuously</strong> — that&apos;s{' '}
          {exampleDailyUnits.toFixed(2)} units/day, or about{' '}
          <strong>{formatINR(exampleAnnual)}/year</strong> at Tamil Nadu&apos;s
          top-slab rate. Check the calculator below with your own devices and
          DISCOM for your real figure.
        </p>
      </section>

      <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
        <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
          How standby cost is calculated
        </h2>
        <p className="text-ash/80">
          Every device you tick runs 24 hours a day, 365 days a year, whether
          you notice it or not — so the annual cost is just watts converted
          to units, priced at your tariff:
        </p>
        <ol className="mt-3 space-y-2">
          {[
            'Add up the standby wattage of every device you\'ve ticked.',
            'Multiply by 24 hours, then divide by 1,000 to get daily units (kWh).',
            'Multiply by 365 days for annual units.',
            'Multiply by your DISCOM\'s marginal (top-slab) rate, since standby draw sits on top of whatever else you already use.',
          ].map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-appliance font-display text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-ash/80">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="why-adds-up" className="mb-10 scroll-mt-20">
        <h2 id="why-adds-up" className="font-display mb-4 text-2xl font-semibold">
          Why Phantom Load Adds Up More Than People Expect
        </h2>
        <p className="text-ash/80">
          A single standby device drawing a few watts sounds trivial — the
          reason it&apos;s still worth checking comes down to three things
          working against you at once:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['It never switches off', 'unlike a fan or an AC that runs for a few hours a day, a device in standby mode draws its small load for all 24 hours, every single day of the year — there\'s no "off" period to offset the cost.'],
            ['The draw is mostly hidden', 'a router\'s internal transformer stays energised to power its always-on LED and Wi-Fi radio, a set-top box keeps a chip listening for scheduled recordings or a remote signal, and an inverter left connected but not charging still runs its control circuitry — none of this shows up as "usage" the way switching on a light does.'],
            ['It\'s priced at your most expensive rate', 'like every other appliance on this site, standby draw sits on top of whatever else your household already uses in a month, so it lands in your DISCOM\'s top (marginal) tariff slab — the same slab logic used across every calculator here — rather than some cheaper average rate.'],
            ['It multiplies across devices', 'few homes have just one always-on device — a router, a set-top box, an inverter and a couple of forgotten chargers together can end up drawing more, continuously, than a single appliance most people actively budget for.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-appliance" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          Takeaway: it&apos;s the combination of running continuously and being
          priced at your top slab — not any single device&apos;s wattage — that
          makes phantom load worth checking at all.
        </p>
      </section>

      <section aria-labelledby="reduce-it" className="mb-10 scroll-mt-20">
        <h2 id="reduce-it" className="font-display mb-4 text-2xl font-semibold">
          How to Actually Reduce It
        </h2>
        <p className="text-ash/80">
          Not every always-on device is worth unplugging — the goal is
          targeting the ones where the convenience trade-off is genuinely
          small:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['Use a switched power strip for entertainment/office clusters', 'a TV, set-top box and speakers plugged into one strip with a physical switch can be cut off together at night with a single flick, instead of unplugging each device separately.'],
            ['Unplug chargers with nothing attached', 'a phone or laptop charger left in the socket after the device is disconnected still draws a small standby load for no benefit at all — this is the easiest, zero-trade-off fix on the list.'],
            ['Leave routers and set-top boxes running if you actually need them', 'a router you rely on for work, or a set-top box mid-scheduled-recording, isn\'t worth the daily hassle of reconnecting for the modest saving involved — this is exactly the kind of case where the convenience is worth the standby cost.'],
            ['Check older inverters/UPS units specifically', 'these tend to draw more in standby than most other devices on this page\'s reference list, so if you have an older unit sitting connected but not actively charging, it\'s often the single biggest easy win on this list.'],
            ['Use the calculator, not guesswork, to prioritise', 'tick only the devices that actually apply to your home and let the real annual figure — priced at your own DISCOM\'s rate — tell you whether a given device is worth the behavioural change, rather than assuming based on the device\'s size or price.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-appliance" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reference" className="mb-10 scroll-mt-20">
        <h2 id="reference" className="font-display mb-4 text-2xl font-semibold">
          Typical standby wattage by device
        </h2>
        <p className="text-ash/80">
          The calculator above uses these commonly-cited planning estimates —
          your exact device may draw more or less depending on its age, brand
          and internal design, so a plug-in power meter gives a precise reading
          if you want one. As a rough pattern across device categories: units
          with a heavier internal transformer or a chip that has to stay
          listening for a signal (set-top boxes, older inverters/UPS units)
          tend to sit toward the higher end of this range, while a simple
          charger with nothing connected sits at the low end:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">Device</th>
                <th className="px-4 py-2 text-right font-semibold">Standby draw</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {referenceDevices.map(([name, watts]) => (
                <tr key={name}>
                  <td className="px-4 py-2 font-medium">{name}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{watts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Check your standby load
        </h2>
        <PhantomLoadChecker discoms={liveDiscoms} />
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/appliances/household-bill-builder"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🏠</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Household bill builder
            </p>
            <p className="mt-1 text-xs text-ash/60">
              See your full appliance-by-appliance bill.
            </p>
          </Link>
          <Link
            href="/electricity/appliance-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Any appliance cost
            </p>
            <p className="mt-1 text-xs text-ash/60">
              From its wattage and daily hours.
            </p>
          </Link>
          <Link
            href="/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Electricity bill calculators
            </p>
            <p className="mt-1 text-xs text-ash/60">
              See your full monthly bill for your state.
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
