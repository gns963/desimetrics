import Link from 'next/link'
import WaterBillCalculator from '@/components/calculators/WaterBillCalculator'
import { DropletIcon } from '@/components/HubMotifIcon'
import SplitHero from '@/components/SplitHero'
import { getLiveTariffBoardsByState } from '@/data/water-boards'
import { enWaterStatePageTexts, type WaterStatePageTexts } from '@/data/water-state-page-texts'
import { slugify } from '@/lib/format'

const SITE = 'https://desimetrics.com'

export default function WaterStatePage({
  state,
  texts = enWaterStatePageTexts,
}: {
  state: string
  texts?: WaterStatePageTexts
}) {
  const t = texts
  // A state's board slug often differs from the state's own slug (Chennai's
  // board is "chennai", not "tamil-nadu"), so a real, sourced tariff can
  // exist for this state without this page ever finding it on its own.
  const liveBoards = getLiveTariffBoardsByState(state)

  const faqs = [
    { q: t.faq.knowExactTariffQ(state), a: t.faq.knowExactTariffA },
    { q: t.faq.findRateQ(state), a: t.faq.findRateA },
    { q: t.faq.fixedSeparateQ, a: t.faq.fixedSeparateA },
    { q: t.faq.whatIsKlQ, a: t.faq.whatIsKlA },
    { q: t.faq.sewerageQ, a: t.faq.sewerageA },
    { q: t.faq.freeThresholdQ(state), a: t.faq.freeThresholdA(state) },
    { q: t.faq.tankerCheaperQ, a: t.faq.tankerCheaperA },
    { q: t.faq.reduceQ, a: t.faq.reduceA },
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
  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${state} Water Bill Calculator`,
    url: `${SITE}/water/${slugify(state)}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    areaServed: 'India',
  }

  return (
    <>
      <SplitHero
        hub="water"
        breadcrumb={[
          { label: t.breadcrumbWater, href: '/water' },
          { label: state, href: `/water/${slugify(state)}` },
        ]}
        badgeLabel={t.badgeLabel}
        h1={t.h1(state)}
        subtitle={t.subtitle(state)}
        primaryCta={{ label: t.primaryCta, href: '#calculator', emoji: '💧' }}
        secondaryCta={{ label: t.secondaryCta, href: '/water' }}
        statChips={[
          { icon: '💧', big: t.statKl.big, small: t.statKl.small, tone: 'hub' },
          { icon: '✍️', big: t.statRate.big, small: t.statRate.small, tone: 'hub' },
          { icon: '➕', big: t.statFixed.big, small: t.statFixed.small, tone: 'hub' },
          { icon: '🔓', big: t.statFree.big, small: t.statFree.small, tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-hub-water">
              <DropletIcon className="h-6 w-6" />
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                {t.whyAskLabel}
              </p>
            </div>
            <p className="mt-3 text-sm text-white/80">
              {t.whyAskBody1(state)}
            </p>
            <p className="mt-2 text-sm text-white/70">
              {t.whyAskBody2}
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      {liveBoards.length > 0 && (
        <section className="mb-8 rounded-xl border border-hairline border-l-4 border-l-hub-water bg-paper p-5">
          <p className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-hub-water uppercase">
            <span aria-hidden>✓</span> {t.liveBoardHeading(state)}
          </p>
          <p className="mt-2 text-ash/80">
            {liveBoards.map((b, i) => (
              <span key={b.slug}>
                {i > 0 && ' · '}
                {t.liveBoardBody(b.name, b.code)}
                {' '}—{' '}
                <Link href={`/water/${b.slug}`} className="font-semibold text-hub-water hover:underline">
                  {t.liveBoardCta}
                </Link>
              </span>
            ))}
          </p>
          <p className="mt-1 text-xs text-ash/50">
            {t.liveBoardNote(state)}
          </p>
        </section>
      )}

      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          {t.calculateHeading(state)}
        </h2>
        <WaterBillCalculator />
      </section>

      <section aria-labelledby="charges-explained" className="mb-10 scroll-mt-20">
        <h2 id="charges-explained" className="font-display mb-4 text-2xl font-semibold">
          {t.chargesExplainedHeading}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="font-display font-bold text-ink-navy">{t.sewerageTitle}</p>
            <p className="mt-1 text-sm text-ash/70">
              {t.sewerageBody}
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="font-display font-bold text-ink-navy">{t.fixedTitle}</p>
            <p className="mt-1 text-sm text-ash/70">
              {t.fixedBody}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="tanker" className="mb-10 scroll-mt-20">
        <h2 id="tanker" className="font-display mb-4 text-2xl font-semibold">
          {t.tankerHeading}
        </h2>
        <div className="rounded-xl border border-hairline bg-paper p-5">
          <p className="text-ash/80">
            {t.tankerBody}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-lg border border-hairline bg-mist px-4 py-2.5">
              <p className="text-[11px] font-semibold tracking-wide text-ash/50 uppercase">
                {t.tankerLabel}
              </p>
              <p className="font-display text-lg font-bold tabular-nums text-ink-navy">
                ₹500–1,500
              </p>
            </div>
            <div className="rounded-lg border border-hairline bg-mist px-4 py-2.5">
              <p className="text-[11px] font-semibold tracking-wide text-ash/50 uppercase">
                {t.jarLabel}
              </p>
              <p className="font-display text-lg font-bold tabular-nums text-ink-navy">
                ₹40–80
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            {t.tankerNote}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="leaks"
        className="mb-10 scroll-mt-20 rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5"
      >
        <h2 id="leaks" className="font-display mb-2 text-xl font-bold text-ink-navy">
          {t.leaksHeading}
        </h2>
        <p className="text-sm text-ash/80">
          {t.leaksBody}
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          {t.relatedHeading}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href={liveBoards[0] ? `/water/${liveBoards[0].slug}` : '/water/delhi'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📊</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {t.relatedRealTariff.label}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {liveBoards[0]
                ? t.relatedRealTariff.sub(liveBoards[0].name)
                : t.relatedRealTariff.subFallback}
            </p>
          </Link>
          <Link
            href="/gas"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {t.relatedGas.label}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {t.relatedGas.sub}
            </p>
          </Link>
          <Link
            href="/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {t.relatedElectricity.label}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {t.relatedElectricity.sub}
            </p>
          </Link>
          <Link
            href="/appliances/water-tank-filling-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🚰</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {t.relatedWaterTank.label}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {t.relatedWaterTank.sub}
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          {t.faqHeading}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      </main>
    </>
  )
}
