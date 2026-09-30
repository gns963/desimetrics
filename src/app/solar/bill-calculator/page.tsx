import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { getTariff } from '@/lib/calc/electricity'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/bill-calculator'

const rows = CALCULATOR_PAGES.map((p) => {
  const tariff = getTariff(p.discomCode)
  return { slug: p.discomCode.toLowerCase(), discomCode: p.discomCode, state: tariff.state }
}).sort((a, b) => a.state.localeCompare(b.state))

export const metadata: Metadata = {
  title: 'Solar Bill Calculator by State (India) 2026 | DesiMetrics',
  description:
    'Estimate rooftop solar payback and savings for every Indian state and union territory, using each DISCOM\'s real tariff and the PM Surya Ghar subsidy.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/solar/bill-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Solar', path: '/solar' },
  { name: 'Bill Calculator', path: PATH },
])
const itemList = itemListLd(
  rows.map((r) => ({ name: `${r.state} Solar Bill Calculator`, path: `/solar/bill-calculator/${r.slug}` })),
)

const faqs = [
  {
    q: 'Why does solar payback differ by state?',
    a: 'Payback depends on how much your saved units are worth, which is set by your DISCOM\'s own tariff — states with higher electricity rates typically see faster solar payback for the same system size.',
  },
  {
    q: 'Is the PM Surya Ghar subsidy the same in every state?',
    a: 'The central subsidy formula (₹30,000/kW for the first 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000) is the same nationwide. Some states also offer additional state-level subsidies on top, which aren\'t modelled here.',
  },
  {
    q: 'My state isn\'t listed — what do I do?',
    a: 'All 36 Indian states and union territories are covered. If a specific one seems missing, use our general Solar ROI calculator and select your DISCOM directly.',
  },
  {
    q: 'Does this directory account for the sunlight my specific state gets?',
    a: 'No — every state page uses the same ~4 units/kW/day generation assumption. What differs page to page is your DISCOM\'s actual tariff, since that\'s the reliably-published, verifiable number this tool can price against. Real generation varies somewhat with latitude, season and roof orientation, so treat the payback figure as a planning estimate.',
  },
  {
    q: 'Can I compare two states directly?',
    a: 'Open both state pages in separate tabs, or use the general Solar ROI calculator and switch the DISCOM dropdown between runs — either way, keep monthly usage and system size the same across both so the comparison isolates the tariff difference.',
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

export default function SolarBillCalculatorIndexPage() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'Solar', href: '/solar' },
          { label: 'Bill Calculator', href: '/solar/bill-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="Solar Bill Calculator by State"
        subtitle="Rooftop solar payback and savings for every Indian state and union territory, priced against each DISCOM's real tariff."
        stats={[
          { icon: '🗺️', big: `${rows.length}`, small: 'States & UTs', tone: 'hub' },
          { icon: '💸', big: '₹78,000', small: 'Max subsidy', tone: 'hub' },
          { icon: '📊', big: 'Real tariff', small: 'Priced per state', tone: 'hub' },
          { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="what-this-shows" className="mb-10 scroll-mt-20">
        <h2 id="what-this-shows" className="font-display mb-4 text-2xl font-semibold">
          What each state page shows
        </h2>
        <p className="text-ash/80">
          Pick your state below for a rooftop solar payback estimate priced
          on your own DISCOM&apos;s real tariff, not a flat national rate. Every
          state and union territory here shares the same calculation engine, so the
          only thing that changes from page to page is the tariff data feeding it — the
          same real, published slab rates that power the site&apos;s state-by-state
          electricity bill calculators for that DISCOM.
        </p>
        <ul className="mt-3 space-y-2">
          {[
            ['System cost and subsidy', 'an illustrative system cost before subsidy, and the net cost after the PM Surya Ghar central subsidy (up to ₹78,000) is applied.'],
            ['Payback period', 'how many years of savings it takes to recover your net cost, based on your state\'s actual per-unit tariff.'],
            ['Annual and lifetime savings', 'monthly savings and a 25-year net savings figure, over the panels\' typical working life.'],
            ['Your real tariff, not an average', 'savings are computed against your own DISCOM\'s telescopic slab structure, so solar is valued at offsetting your most expensive units first.'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-ash/80">
          Each state page runs the same calculation engine as our general{' '}
          <Link href="/solar/roi-calculator" className="text-brass underline">
            solar ROI calculator
          </Link>{' '}
          — this directory just saves you picking your DISCOM from a dropdown.
          For the subsidy rules and eligibility in full, see our{' '}
          <Link href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide" className="text-brass underline">
            PM Surya Ghar subsidy guide
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="payback-by-state" className="mb-10">
        <h2 id="payback-by-state" className="font-display mb-2 text-2xl font-semibold">
          Why solar payback isn&apos;t the same in every state
        </h2>
        <p className="text-ash/80">
          Payback speed comes down to one thing this directory prices correctly: how much your
          saved units are actually worth on your own DISCOM&apos;s bill. A few consequences worth
          knowing before you pick your state below:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            [
              'Higher-tariff states see faster payback',
              <>
                a state whose top domestic slab sits well above the national average recovers a
                given system&apos;s cost sooner than a state with cheap subsidised power, for the
                identical system size and usage — see our{' '}
                <Link href="/solar/bill-calculator/tneb" className="text-brass underline">
                  Tamil Nadu (TNEB)
                </Link>{' '}
                and{' '}
                <Link href="/solar/bill-calculator/msedcl" className="text-brass underline">
                  Maharashtra (MSEDCL)
                </Link>{' '}
                pages for two states with meaningfully different slab structures.
              </>,
            ],
            [
              'Telescopic slabs matter more than the average rate',
              'a DISCOM\'s headline "average tariff" understates what solar actually saves you, because solar offsets your last, most expensive units first — the ones at the top of the slab, not the cheap opening block.',
            ],
            [
              'This directory doesn\'t model regional sunlight differences',
              'every state page uses the same ~4 units/kW/day generation assumption. Real irradiance varies somewhat by latitude and season, but tariff structure — not sunlight — is the bigger, more reliably-priced driver of payback differences between states, which is why that\'s what this tool models.',
            ],
            [
              'Connection type changes the comparison',
              'these figures assume a residential connection. Commercial and industrial tariffs run higher in most states, which would shorten payback further for a commercial rooftop — not modelled on these pages, which focus on household solar.',
            ],
            [
              'Usage level shifts the picture too, within the same state',
              'a household already sitting in the top slab (typically the heaviest AC/geyser users) sees a bigger per-unit saving from solar than a low-consumption household in the entry slab of the same DISCOM — try the same state page at a couple of different monthly-unit figures to see this play out.',
            ],
          ].map(([t, d]) => (
            <li key={t as string} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="subsidy-nationwide" className="mb-10">
        <h2 id="subsidy-nationwide" className="font-display mb-2 text-2xl font-semibold">
          The subsidy is national — the tariff isn&apos;t
        </h2>
        <p className="text-ash/80">
          One part of this calculation doesn&apos;t vary by state at all, and one part varies a
          lot. Knowing which is which helps you read any state page correctly:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            [
              'PM Surya Ghar is a fixed central formula',
              <>
                ₹30,000/kW for the first 2 kW plus ₹18,000 for the 3rd kW, capped at ₹78,000 —
                identical whether you&apos;re in Kerala or Punjab. Full eligibility rules and the
                application steps are on our{' '}
                <Link href="/solar/subsidy-calculator" className="text-brass underline">
                  PM Surya Ghar subsidy calculator
                </Link>
                .
              </>,
            ],
            [
              'Some states add their own top-up subsidy on top',
              'these state-level schemes aren\'t modelled on this directory\'s state pages — check your own state electricity board\'s site or installer for anything additional, since it would only improve on the net-cost figure shown here, never worsen it.',
            ],
            [
              'Your DISCOM tariff is what actually differs page to page',
              <>
                that&apos;s the number driving the payback-period difference between any two state
                pages here — see our{' '}
                <Link
                  href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide"
                  className="text-brass underline"
                >
                  full PM Surya Ghar subsidy guide
                </Link>{' '}
                for the scheme background.
              </>,
            ],
          ].map(([t, d]) => (
            <li key={t as string} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="why-directory" className="mb-10">
        <h2 id="why-directory" className="font-display mb-2 text-2xl font-semibold">
          Directory vs. the general ROI calculator — which to use
        </h2>
        <p className="text-ash/80">
          Both tools run the same underlying calculation. Pick whichever fits how you already know
          your situation:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            [
              'Use this directory',
              'when you just want to see your own state\'s numbers quickly — find your state below and it opens pre-loaded with your DISCOM\'s tariff.',
            ],
            [
              'Use the general ROI calculator',
              <>
                when you want to try different DISCOMs side by side, or don&apos;t know your
                DISCOM code offhand — the{' '}
                <Link href="/solar/roi-calculator" className="text-brass underline">
                  solar ROI calculator
                </Link>{' '}
                lets you pick from a dropdown and change your monthly usage and system size in
                one place.
              </>,
            ],
            [
              'Either way, sizing comes first',
              <>
                if you&apos;re not sure what system size fits your roof and usage yet, start with
                our{' '}
                <Link href="/solar/panel-size-calculator" className="text-brass underline">
                  panel size calculator
                </Link>{' '}
                before you compare payback numbers here.
              </>,
            ],
            [
              'Both feed the same net-metering math',
              <>
                once you know your export/offset split, our{' '}
                <Link href="/solar/net-metering-calculator" className="text-brass underline">
                  net metering calculator
                </Link>{' '}
                estimates what your DISCOM credits you for units you send back to the grid — worth
                checking after you&apos;ve settled on a state and system size here.
              </>,
            ],
          ].map(([t, d]) => (
            <li key={t as string} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="states" className="mb-10">
        <h2 id="states" className="font-display mb-4 text-2xl font-semibold">
          All states
        </h2>
        <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {rows.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/solar/bill-calculator/${r.slug}`}
                className="block rounded-xl border border-hub-solar/20 bg-hub-solar/5 p-4 transition hover:border-hub-solar/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {r.state}
                </span>
                <span className="mt-1 block text-xs text-hub-solar">
                  {r.discomCode} · Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
    </>
  )
}
