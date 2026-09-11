import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/how-water-bills-calculated-india'
const TITLE = 'How Water Bills Are Calculated in India: A City-Wise Guide'
const DESCRIPTION =
  'Fixed charge, volumetric slabs, sewerage charge, water cess — see the building blocks every Indian water bill uses, and why Delhi, Bangalore, Hyderabad, Chennai and Kerala each apply them so differently.'
const LAST_VERIFIED = '11 September 2026'

export const metadata: Metadata = {
  title: 'How Water Bills Are Calculated in India (City-Wise Guide)',
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
  datePublished: '2026-09-11',
  dateModified: '2026-09-11',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'How is a water bill calculated in India?',
    a: "Most Indian water bills combine a fixed/service charge, a volumetric charge based on your consumption (often in slabs), a sewerage charge (usually a percentage of the water charge), and sometimes a small water cess. The exact structure and rates vary significantly by city and board.",
  },
  {
    q: 'What is a sewerage charge, and why is it a percentage of my water bill?',
    a: "It's a charge covering sewage treatment and drainage maintenance, and boards usually set it as a percentage of your water charge rather than metering sewage separately, since actual wastewater volume is hard to measure directly. The percentage varies a lot by board — from roughly 15% to 60% depending on the city.",
  },
  {
    q: 'Why does my city\'s water bill work differently from what I read online?',
    a: "Water supply and sewerage are municipal/state subjects in India, run by individual city or state water boards rather than one national regulator. Each board sets its own slabs, sewerage percentage and fixed charges, so a structure you read about for one city often won't match your own.",
  },
  {
    q: "What happens if I go over Delhi's 20 KL free limit?",
    a: 'Delhi Jal Board waives the water charge, sewerage charge and water cess entirely for consumption up to 20 KL a month. Crossing 20 KL removes that waiver for your entire month\'s consumption, not just the units above 20 KL — so a small overage can cause a disproportionately large jump.',
  },
  {
    q: 'What is a water cess?',
    a: "A water cess is a smaller environmental or conservation charge that some boards add on top of the water and sewerage charges. Not every board levies one, and where it exists, the amount is usually modest compared to the volumetric and sewerage charges.",
  },
  {
    q: 'Is there a single national formula for calculating water bills in India?',
    a: "No. Unlike electricity, which follows a broadly similar structure set by state regulators, water tariffs are set independently by each city or state water board. The building blocks (fixed charge, slabs, sewerage charge) are common, but the actual rates and design differ board to board.",
  },
  {
    q: 'What is the difference between a fixed charge and a volumetric charge on a water bill?',
    a: 'The fixed (or service) charge is a standing monthly amount, sometimes flat and sometimes tiered by connection size or slab, that applies regardless of exact usage. The volumetric charge is billed on your actual consumption in kilolitres, usually rising through slabs as you use more.',
  },
  {
    q: 'How do I find out my own city\'s exact water tariff?',
    a: "Check your own board's official tariff notification, or use this site's water bill calculators for boards with sourced, dated tariff data (currently Delhi, Chennai and Pimpri-Chinchwad) — other cities use a self-rate calculator where you enter your own board's published rates.",
  },
  {
    q: 'Why is my sewerage charge higher than my actual water charge some months?',
    a: "This can happen when your board's sewerage percentage is high (Delhi's is 60%, for example) and your water charge itself is small — 60% of a small number can still look large relative to other lines, especially in a low-consumption month.",
  },
  {
    q: 'Do all cities bill tanker water the same way as piped water?',
    a: "No. Some cities, including Chennai, bill tanker-supplied water separately from piped-connection water, since tankers serve areas or gaps that piped supply doesn't fully cover. Check with your local board if tanker water is a regular part of your supply.",
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

const comparisonRows: [string, string, string, string][] = [
  ['Delhi (DJB)', 'Slab-based, KL bands', '~60% of water charge', 'Free up to 20 KL/month, but crossing it removes the waiver for the whole month, not just the excess'],
  ['Bangalore (BWSSB)', 'Fine-grained slabs (per 100 L)', '~25% of water charge (illustrative)', 'Much finer slab granularity than most other boards'],
  ['Hyderabad (HMWSSB)', 'Rising slabs', '35% cess on the slab-calculated charge', 'Straightforward percentage-on-top model'],
  ['Chennai (CMWSSB)', 'Broad consumption slabs', '25% of water charge', 'Also bills tanker-supplied water separately from piped supply'],
  ['Kerala (KWA)', 'Tiered slabs', '~11% at lower bands, rising at higher bands (illustrative), plus a flat charge on some connections', 'Includes exemptions/lower rates for BPL households in some cases'],
]

export default function WaterBillsCalculatedArticlePage() {
  return (
    <>
      <PageHero
        hub="water"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Water Bills Explained', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💧</span> Explainer
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
          Most Indian water bills are built from the same handful of parts: a{' '}
          <strong>fixed or service charge</strong>, a <strong>volumetric charge</strong>{' '}
          based on your actual consumption (usually in slabs), a{' '}
          <strong>sewerage charge</strong> — typically a percentage of the water
          charge — and sometimes a small <strong>water cess</strong>. But unlike
          electricity, which follows a broadly similar structure set by each
          state&apos;s regulator, water supply and sewerage in India are run
          independently by individual city and state water boards. There is no single
          national formula: the building blocks are common, but how each board
          combines them varies enormously — which is exactly why this guide teaches
          the logic, while your own board&apos;s calculator gives you the actual
          numbers.
        </p>

        <section aria-labelledby="building-blocks" className="mt-10 scroll-mt-20">
          <h2 id="building-blocks" className={h2Cls}>
            The Building Blocks Every Indian Water Bill Uses
          </h2>
          <ul className="mt-1 space-y-2">
            {[
              ['Fixed / Service Charge', 'a standing monthly amount, sometimes flat and sometimes tiered by connection size or consumption slab, that applies regardless of exact usage that month.'],
              ['Volumetric / Water Charge', 'billed on your actual consumption, usually measured in kilolitres (KL — 1 KL = 1,000 litres), and usually slab-based so the rate rises as you use more.'],
              ['Sewerage Charge', 'covers sewage treatment and drainage maintenance, and is typically calculated as a percentage of your water charge rather than measured directly.'],
              ['Water Cess', 'a smaller environmental or conservation charge some boards add on top — not universal, and modest where it exists.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-water" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: every board mixes these same four ingredients — what differs is
            the recipe, not the ingredients themselves.
          </p>
        </section>

        <section aria-labelledby="why-fragmented" className="mt-10 scroll-mt-20">
          <h2 id="why-fragmented" className={h2Cls}>
            Why Doesn&apos;t One National Water-Bill Formula Exist?
          </h2>
          <p className={pCls}>
            Water supply and sewerage are municipal and state subjects in India,
            administered by individual city or state water boards — there is no
            equivalent of a state electricity regulatory commission setting one
            tariff structure per state. Compare this to{' '}
            <Link href="/electricity" className="text-brass underline">
              electricity
            </Link>
            , where each state&apos;s DISCOMs follow a broadly similar telescopic-slab
            structure set by a common regulator, which is exactly why this site can
            run one calculator engine per state. Water doesn&apos;t work that way:
            Delhi Jal Board, Bangalore&apos;s BWSSB, Chennai&apos;s CMWSSB and dozens of
            other boards each publish their own, independently designed tariff order.
          </p>
          <p className={takeawayCls}>
            Takeaway: expect real structural differences city to city, not just
            different numbers plugged into the same formula.
          </p>
        </section>

        <section aria-labelledby="comparison" className="mt-10 scroll-mt-20">
          <h2 id="comparison" className={h2Cls}>
            How Five Different Cities Apply These Same Building Blocks
          </h2>
          <p className={pCls}>
            These are illustrative snapshots to show the range of designs in use, not
            live current rates — see the sourcing note at the end of this article, and
            check your own board&apos;s current tariff for exact figures.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">City / Board</th>
                  <th className="px-4 py-2 font-semibold">Volumetric structure</th>
                  <th className="px-4 py-2 font-semibold">Sewerage charge</th>
                  <th className="px-4 py-2 font-semibold">Notable design feature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {comparisonRows.map(([city, vol, sewer, note]) => (
                  <tr key={city}>
                    <td className="px-4 py-2 font-medium">{city}</td>
                    <td className="px-4 py-2">{vol}</td>
                    <td className="px-4 py-2">{sewer}</td>
                    <td className="px-4 py-2">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            The sewerage percentage alone ranges from roughly 15% to 60% across boards
            we&apos;ve sourced directly — Delhi&apos;s 60% and Pimpri-Chinchwad&apos;s
            15% are both real, dated figures from their own published tariff orders,
            not a typo. See the real, sourced numbers for{' '}
            <Link href="/water/delhi" className="text-brass underline">
              Delhi (DJB)
            </Link>
            ,{' '}
            <Link href="/water/chennai" className="text-brass underline">
              Chennai (CMWSSB)
            </Link>{' '}
            and{' '}
            <Link href="/water/pimpri-chinchwad" className="text-brass underline">
              Pimpri-Chinchwad (PCMC)
            </Link>{' '}
            on their own calculator pages. Bangalore, Hyderabad and Kerala don&apos;t
            yet have a verified, board-specific calculator on this site — published
            rates for some of these boards conflict significantly across sources, so
            we route those cities to a self-rate calculator where you enter your own
            board&apos;s published numbers instead of a rate we can&apos;t fully stand
            behind.
          </p>
          <p className={takeawayCls}>
            Takeaway: two boards can use the exact same building blocks and still
            produce very different bills for the same consumption.
          </p>
        </section>

        <section aria-labelledby="delhi-cliff" className="mt-10 scroll-mt-20">
          <h2 id="delhi-cliff" className={h2Cls}>
            Delhi&apos;s &ldquo;Free Limit With a Cliff&rdquo; — A Closer Look
          </h2>
          <p className={pCls}>
            Delhi Jal Board waives the water charge, sewerage charge and water cess
            entirely for households consuming up to <strong>20 KL (20,000 litres)</strong>{' '}
            a month, leaving only a small service charge payable. This is a genuinely
            generous design — but it has a sharp edge: cross 20 KL, and the waiver is
            removed for your <em>entire</em> month&apos;s consumption, not just the
            units above 20 KL. A household using 21 KL can end up paying substantially
            more than one using 20 KL, even though the actual usage difference is
            just 1 KL.
          </p>
          <p className={`mt-3 ${pCls}`}>
            On top of the volumetric charge, DJB&apos;s service charge is commonly
            reported as tiered by consumption band — illustrative figures cited
            elsewhere put it at roughly ₹146 for 0–20 KL, ₹220 for 20–30 KL, and ₹293
            above 30 KL, though you should confirm DJB&apos;s current figures directly
            since these are revised periodically. Once past the free limit, the
            sewerage charge is calculated as{' '}
            <strong>60% of the total water volumetric charge</strong> — notably high
            compared to several other boards.
          </p>
          <p className={takeawayCls}>
            Takeaway: if you&apos;re close to 20 KL, it&apos;s worth checking whether
            you can trim usage back under the limit — the difference isn&apos;t
            proportional, it&apos;s a cliff.
          </p>
        </section>

        <section aria-labelledby="sewerage" className="mt-10 scroll-mt-20">
          <h2 id="sewerage" className={h2Cls}>
            What Is a Sewerage Charge, Really?
          </h2>
          <p className={pCls}>
            A sewerage charge covers the cost of treating and draining the wastewater
            your household sends back into the sewage system. Boards almost always
            calculate it as a <strong>percentage of your water charge</strong> rather
            than metering sewage output directly, since actual wastewater volume is
            hard to measure separately from supply — a household&apos;s water
            consumption is treated as a reasonable proxy for how much it discharges.
          </p>
          <p className={`mt-3 ${pCls}`}>
            That percentage varies significantly by board, from around 15% (Pimpri-
            Chinchwad) to 60% (Delhi) among the boards we&apos;ve directly sourced —
            there&apos;s no standard rate, so a percentage you&apos;ve seen quoted for
            one city tells you very little about another.
          </p>
          <p className={takeawayCls}>
            Takeaway: a sewerage charge is a percentage add-on by design, not a
            separate measured utility — its size depends entirely on your board&apos;s
            own policy choice.
          </p>
        </section>

        <section aria-labelledby="how-to-calculate" className="mt-10 scroll-mt-20">
          <h2 id="how-to-calculate" className={h2Cls}>
            How to Actually Calculate Your Own Bill
          </h2>
          <p className={pCls}>The general method, regardless of board:</p>
          <ol className="mt-3 space-y-2">
            {[
              'Find your consumption in kilolitres (KL) from your meter reading or bill.',
              "Identify your board's slab structure and apply the rate for each slab your consumption falls into.",
              'Add your board\'s sewerage charge, usually a percentage of the volumetric total.',
              'Add any fixed/service charge and water cess that applies to your connection.',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-water font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={`mt-4 ${pCls}`}>
            Doing this by hand means finding your own board&apos;s current tariff
            order and getting every slab boundary right — easy to get wrong. Use our{' '}
            <Link href="/water" className="text-brass underline">
              water bill calculators
            </Link>{' '}
            instead: real, sourced tariffs for{' '}
            <Link href="/water/delhi" className="text-brass underline">
              Delhi
            </Link>{' '}
            and{' '}
            <Link href="/water/chennai" className="text-brass underline">
              Chennai
            </Link>
            , and a self-rate calculator for every other city where you enter your
            own board&apos;s published rates for an accurate estimate.
          </p>
          <p className={takeawayCls}>
            Takeaway: the method is the same everywhere — it&apos;s the slab
            boundaries and percentages that change, which is exactly what a
            calculator handles for you.
          </p>
        </section>

        <section aria-labelledby="tanker" className="mt-10 scroll-mt-20">
          <h2 id="tanker" className={h2Cls}>
            A Note on Tanker Water, If Relevant to Your Area
          </h2>
          <p className={pCls}>
            Some cities, including Chennai, bill tanker-supplied water separately
            from piped-connection water, since tankers cover areas or gaps that piped
            supply doesn&apos;t fully reach. If tanker water is a regular part of your
            household&apos;s supply, check with your local board on how it&apos;s
            billed — our board calculators estimate piped-connection tariffs and
            don&apos;t currently model tanker-specific charges separately.
          </p>
          <p className={takeawayCls}>
            Takeaway: if you rely on tanker water, treat it as a separate line item
            from your piped water bill, not something a standard tariff calculator
            captures.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/water"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💧
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Water bill calculators
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Find your city or state and estimate your own bill.
              </p>
            </Link>
            <Link
              href="/water/delhi"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🏛️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Delhi (DJB) water bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Real, sourced tariff — including the 20 KL free limit.
              </p>
            </Link>
            <Link
              href="/water/chennai"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🌊
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Chennai (CMWSSB) water bill calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Real, sourced slabs and sewerage charge.
              </p>
            </Link>
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How telescopic electricity slabs work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The electricity-side equivalent of slab billing.
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
          Last verified: {LAST_VERIFIED}. Delhi (DJB), Chennai (CMWSSB) and
          Pimpri-Chinchwad (PCMC) figures are sourced directly from each board&apos;s
          own published tariff order via this site&apos;s{' '}
          <Link href="/water" className="text-brass underline">
            water calculators
          </Link>
          . Bangalore, Hyderabad and Kerala figures above are illustrative snapshots
          from secondary sources, not independently verified by this site — check{' '}
          <Link href="/methodology" className="text-brass underline">
            our methodology
          </Link>{' '}
          and your own board&apos;s current notification before relying on them.
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
