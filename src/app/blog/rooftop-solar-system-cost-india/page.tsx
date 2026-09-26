import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/rooftop-solar-system-cost-india'
const TITLE = 'How Much Does a Rooftop Solar System Actually Cost in India? (2026 Pricing Guide)'
const DESCRIPTION =
  'Real installed-cost ranges by system size, before and after the ₹78,000 central subsidy — and why solar quotes vary so much by state, equipment and installer.'
const LAST_VERIFIED = '26 September 2026'

export const metadata: Metadata = {
  title: 'Rooftop Solar Cost in India 2026: Full Pricing Guide',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Solar', path: '/solar' },
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
  datePublished: '2026-09-26',
  dateModified: '2026-09-26',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'How much does a rooftop solar system cost in India?',
    a: 'Roughly ₹45,000–₹85,000 per kW before subsidy, according to multiple 2026 industry sources — a genuine range, not a single number, reflecting real variation by state, equipment tier and installer. A 3 kW system, the most commonly installed residential size, typically runs ₹1,35,000–₹2,20,000 gross before the central subsidy.',
  },
  {
    q: 'How much does a 3 kW solar system cost after subsidy?',
    a: 'Illustratively, roughly ₹57,000–₹1,42,000 net, after subtracting the ₹78,000 central PM Surya Ghar subsidy from a gross cost of ₹1,35,000–₹2,20,000. The wide net range reflects the wide gross range across sources and installers — get an actual quote for your specific case rather than expecting one precise figure.',
  },
  {
    q: 'Why do solar installation quotes vary so much between companies?',
    a: 'Three main drivers: your state (labour and logistics costs differ), equipment tier (panel type and inverter brand meaningfully affect price), and installer competition and margins. None of these makes one quote "wrong" — comparing multiple MNRE-empanelled installer quotes for your specific roof is the honest way to find your real number.',
  },
  {
    q: 'What\'s included in a typical solar installation price?',
    a: 'ALMM-compliant panels, the inverter, mounting structure, DC/AC cabling, earthing, installation labour, net-metering application assistance, and applicable GST. Battery storage, if you want it, is typically priced and quoted as a separate add-on, not bundled into a standard rooftop solar quote.',
  },
  {
    q: 'Is battery storage included in a standard solar quote?',
    a: 'No — a standard grid-tied rooftop solar quote (the kind eligible for PM Surya Ghar and net metering) typically doesn\'t include battery storage. If you want battery backup as well, expect it to be quoted and priced separately, and to substantially increase the total cost.',
  },
  {
    q: 'Do smaller solar systems cost more per kW than larger ones?',
    a: 'Yes, generally — fixed costs like the site visit, a baseline mounting-structure cost, and net-metering paperwork get spread over fewer watts on a small system, pushing up its effective per-kW rate compared to a 5 kW or 10 kW installation where those same fixed costs are spread wider.',
  },
  {
    q: 'Are there additional state subsidies beyond the central PM Surya Ghar subsidy?',
    a: 'Some states have offered their own top-up subsidies on top of the central subsidy, requiring a separate state-level application — but availability and amounts change and aren\'t consistent nationwide. Check your own state\'s current renewable energy department portal or notification rather than assuming a top-up applies to you.',
  },
  {
    q: 'How long does it take for a rooftop solar system to pay for itself?',
    a: 'Residential systems are commonly cited as reaching payback in roughly 3–5 years post-subsidy, with an expected useful life of around 25 years — but the exact figure depends heavily on your own state\'s electricity tariff, your actual generation, and your gross cost. Use the ROI calculator with your own numbers rather than a generic figure.',
  },
  {
    q: 'Does my state\'s electricity tariff affect how fast solar pays back?',
    a: 'Significantly — a higher retail tariff means each unit of grid electricity your solar offsets is worth more, shortening payback, while a lower tariff stretches it out. This is illustrative of the mechanism, not current tariff data — check your own state\'s actual rate on our electricity calculators.',
  },
  {
    q: 'How do I get an accurate price for my own home?',
    a: 'Get quotes from multiple MNRE-empanelled installers for your specific roof, location and chosen equipment tier — this article gives you planning ranges to sanity-check quotes against, not a substitute for an actual site-specific quote, since your roof\'s shading, orientation and access all affect the real number.',
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

const costRows: [string, string, string, string][] = [
  ['1 kW', '₹45,000–₹70,000', '₹30,000', '₹15,000–₹40,000'],
  ['2 kW', '₹90,000–₹1,30,000', '₹60,000', '₹30,000–₹70,000'],
  ['3 kW', '₹1,35,000–₹2,20,000', '₹78,000', '₹57,000–₹1,42,000'],
  ['5 kW', '₹2,25,000–₹3,25,000', '₹78,000 (capped)', '₹1,47,000–₹2,47,000'],
  ['10 kW', '₹4,50,000–₹6,50,000', '₹78,000 (capped)', '₹3,72,000–₹5,72,000'],
]

export default function RooftopSolarCostGuidePage() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Rooftop Solar Cost', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar Pricing Guide
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
          · Updated {LAST_VERIFIED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          Rooftop solar in India runs roughly <strong>₹45,000–₹85,000 per kW installed</strong>,
          before subsidy, according to multiple 2026 industry sources — a genuine range, not a
          single national price, because state, equipment tier and installer all move it
          meaningfully. Anyone quoting you one flat number is oversimplifying. The good news: for
          most residential systems, the central{' '}
          <Link href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide" className="text-brass underline">
            PM Surya Ghar
          </Link>{' '}
          subsidy (up to <strong>₹78,000</strong>) cuts a real chunk off that gross cost. This
          guide gives you real ranges by system size, explains exactly what drives the variation,
          and connects the net cost to your own payback.
        </p>

        <section aria-labelledby="cost-table" className="mt-10 scroll-mt-20">
          <h2 id="cost-table" className={h2Cls}>
            Cost by System Size, Before and After Subsidy
          </h2>
          <p className={pCls}>
            These are illustrative ranges reflecting genuine market variation across multiple 2026
            industry sources — not fixed prices. Actual quotes will vary by installer, state and
            equipment tier; a state top-up subsidy, where available, would further reduce the net
            cost shown here.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">System size</th>
                  <th className="px-4 py-2 font-semibold">Gross cost</th>
                  <th className="px-4 py-2 font-semibold">Central subsidy</th>
                  <th className="px-4 py-2 font-semibold">Approx. net cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {costRows.map(([size, gross, subsidy, net]) => (
                  <tr key={size}>
                    <td className="px-4 py-2 font-medium">{size}</td>
                    <td className="px-4 py-2">{gross}</td>
                    <td className="px-4 py-2">{subsidy}</td>
                    <td className="px-4 py-2 font-display font-bold text-hub-solar">{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: a 3 kW system, the most commonly installed residential size, typically nets
            out somewhere in the ₹57,000–₹1,42,000 range — get quotes to find where you actually
            land in it.
          </p>
        </section>

        <section aria-labelledby="why-vary" className="mt-10 scroll-mt-20">
          <h2 id="why-vary" className={h2Cls}>
            Why Do Solar Quotes Vary So Much?
          </h2>
          <p className={pCls}>
            Three things genuinely move the price, and none of them makes a given quote
            &ldquo;wrong&rdquo;:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Your state', 'labour costs, logistics and local market competition differ meaningfully across states.'],
              ['Equipment tier', 'panel type (standard vs higher-efficiency) and inverter brand meaningfully affect the total price.'],
              ['Installer competition and margins', 'different installers price their own labour, overhead and margin differently for comparable equipment.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-solar" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: compare multiple MNRE-empanelled installer quotes for your specific roof —
            that&apos;s the honest way to find your real number, not a single published figure.
          </p>
        </section>

        <section aria-labelledby="whats-included" className="mt-10 scroll-mt-20">
          <h2 id="whats-included" className={h2Cls}>
            What&apos;s Actually Included in a Solar Quote?
          </h2>
          <p className={pCls}>
            A typical rooftop solar quote bundles several components into one price:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['ALMM-compliant panels', 'must be on the government\'s Approved List of Models and Manufacturers.'],
              ['Inverter', 'converts the panels\' DC output to usable AC power for your home.'],
              ['Mounting structure, cabling and earthing', 'the physical installation hardware and safety wiring.'],
              ['Installation labour and net-metering assistance', 'the vendor\'s work to physically install and help you apply for net metering.'],
              ['Applicable GST', 'tax on the full package.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-solar" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 ${pCls}`}>
            <strong>Battery storage is typically separate</strong> — a standard grid-tied quote
            (the kind eligible for PM Surya Ghar and{' '}
            <Link href="/blog/net-metering-explained-india" className="text-brass underline">
              net metering
            </Link>
            ) doesn&apos;t usually include it. If you want battery backup too, expect it quoted on
            top, substantially increasing the total.
          </p>
          <p className={takeawayCls}>
            Takeaway: check exactly what&apos;s in a quote before comparing prices — a lower quote
            missing net-metering assistance or using non-ALMM panels isn&apos;t actually cheaper.
          </p>
        </section>

        <section aria-labelledby="why-smaller-more" className="mt-10 scroll-mt-20">
          <h2 id="why-smaller-more" className={h2Cls}>
            Why Do Smaller Systems Cost More Per kW?
          </h2>
          <p className={pCls}>
            Fixed costs — the site visit, a baseline mounting-structure cost, net-metering
            paperwork — don&apos;t scale down proportionally with system size. Spread over just 1
            kW, those fixed costs push the effective per-kW rate up; spread over 5 kW or 10 kW,
            the same fixed costs make a much smaller dent in the per-kW figure. This is exactly
            why the table above shows a higher effective rate for 1 kW than for 10 kW.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your usage genuinely supports a larger system, you often get a better
            per-kW rate, not just more total capacity.
          </p>
        </section>

        <section aria-labelledby="state-topups" className="mt-10 scroll-mt-20">
          <h2 id="state-topups" className={h2Cls}>
            State Top-Ups: An Extra Lever Some Readers Can Access
          </h2>
          <p className={pCls}>
            Beyond the central PM Surya Ghar subsidy, some states have offered their own
            additional top-up subsidies, requiring a separate state-level application — reported
            examples include states like Delhi and Uttar Pradesh having done this in the past.
            Availability and amounts change and aren&apos;t consistent nationwide, so we
            aren&apos;t stating a specific current figure for any state here. Check your own
            state&apos;s renewable energy department portal or current notification to see if a
            top-up is active where you live.
          </p>
          <p className={takeawayCls}>
            Takeaway: don&apos;t assume a state top-up applies to you, but don&apos;t assume one
            doesn&apos;t either — it&apos;s worth a quick check before finalising your net cost.
          </p>
        </section>

        <section aria-labelledby="payback" className="mt-10 scroll-mt-20">
          <h2 id="payback" className={h2Cls}>
            How Fast Does It Actually Pay Back?
          </h2>
          <p className={pCls}>
            Residential systems are commonly cited as paying back in roughly 3–5 years
            post-subsidy, with an expected useful life of around 25 years — but your own state
            tariff is the single biggest lever on where you land in that range. As an{' '}
            <strong>illustrative example of the mechanism</strong>, not current tariff data, one
            industry source frames a state with a higher retail tariff (like Maharashtra, cited
            around ₹9.50/unit in that source) reaching payback in roughly 3–3.5 years, versus a
            state with a lower retail tariff (like Uttar Pradesh, cited around ₹6.50/unit)
            stretching beyond 4.5 years for a comparable system. A higher tariff simply means
            each unit your solar offsets is worth more.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Check your OWN state&apos;s actual current tariff — not the illustrative figures above
            — on our{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (Maharashtra)
            </Link>{' '}
            or{' '}
            <Link href="/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL (Uttar Pradesh)
            </Link>{' '}
            calculator, or find your own state on our{' '}
            <Link href="/electricity" className="text-brass underline">
              electricity hub
            </Link>
            , then run your real numbers on our{' '}
            <Link href="/solar/roi-calculator" className="text-brass underline">
              Solar ROI Calculator
            </Link>
            .
          </p>
          <p className={takeawayCls}>
            Takeaway: the Maharashtra/UP comparison illustrates WHY tariff matters — it isn&apos;t
            your answer unless you actually live in one of those states with that exact tariff.
          </p>
        </section>

        <section aria-labelledby="next-step" className="mt-10 scroll-mt-20">
          <h2 id="next-step" className={h2Cls}>
            Worked Example: Your Actual Next Step
          </h2>
          <p className={pCls}>
            A quick path from this article to your own real number:
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Pick your rough system size based on your monthly usage.',
              'Find your gross and net cost range in the table above.',
              'Subtract any state top-up subsidy, if your state currently offers one.',
              'Check your own state\'s tariff and run your real payback on the Solar ROI Calculator.',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-solar font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={`mt-3 ${pCls}`}>
            A 3 kW system is commonly cited as generating roughly 300–400 units a month in typical
            Indian conditions — a useful planning figure, though your actual generation depends on
            your location, shading and system design, not a guarantee. For the fuller worth-it
            decision beyond just price, see{' '}
            <Link href="/blog/is-rooftop-solar-worth-it-in-india-2026" className="text-brass underline">
              is rooftop solar worth it in India in 2026?
            </Link>
          </p>
          <p className={takeawayCls}>
            Takeaway: this article gives you the range to sanity-check quotes against — an actual
            installer quote for your specific roof is still the real next step.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related guides and calculators
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>💸</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PM Surya Ghar Muft Bijli Yojana: Full Subsidy Guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The ₹78,000 central subsidy, eligibility and how to apply.
              </p>
            </Link>
            <Link
              href="/blog/net-metering-explained-india"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🔌</span>
              <p className="font-display mt-2 font-bold text-ink-navy">Net Metering Explained</p>
              <p className="mt-1 text-xs text-ash/60">
                How exported solar units actually get credited to your bill.
              </p>
            </Link>
            <Link
              href="/blog/is-rooftop-solar-worth-it-in-india-2026"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>☀️</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Is rooftop solar worth it in India in 2026?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The broader cost, payback and pros/cons decision.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📈</span>
              <p className="font-display mt-2 font-bold text-ink-navy">Solar ROI Calculator</p>
              <p className="mt-1 text-xs text-ash/60">
                Your real payback, priced on your own state&apos;s tariff.
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
          Last verified: {LAST_VERIFIED}. Per-kW pricing and any state top-up subsidies are the
          fastest-moving facts in this guide — equipment costs and policies shift over time.
          Recheck against current industry sources and your state&apos;s portal before finalising
          a decision. See our{' '}
          <Link href="/methodology" className="text-brass underline">
            methodology
          </Link>{' '}
          for how we source and verify figures across this site.
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
