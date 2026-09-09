import Link from 'next/link'
import WaterBoardBillCalculator from '@/components/calculators/WaterBoardBillCalculator'
import WorkedExampleTotal from '@/components/calculators/WorkedExampleTotal'
import HowWeVerify from '@/components/HowWeVerify'
import SplitHero from '@/components/SplitHero'
import BudgetToKlCalculator from '@/components/water/BudgetToKlCalculator'
import PipedVsTankerComparison from '@/components/water/PipedVsTankerComparison'
import WaterBillComponentAudit from '@/components/water/WaterBillComponentAudit'
import WaterBoardComparisonTable from '@/components/water/WaterBoardComparisonTable'
import WaterConsumptionReferenceTable from '@/components/water/WaterConsumptionReferenceTable'
import WaterFormulaBlock from '@/components/water/WaterFormulaBlock'
import WaterHouseholdConsumptionTable from '@/components/water/WaterHouseholdConsumptionTable'
import WaterNeighborDiagnostic from '@/components/water/WaterNeighborDiagnostic'
import WaterSlabBand from '@/components/water/WaterSlabBand'
import { getWaterBoardFacts } from '@/data/water-board-facts'
import waterBoardsJson from '@/data/water-boards.json'
import {
  enWaterBoardPageTexts,
  hiWaterBoardPageTexts,
  type WaterBoardPageTexts,
} from '@/data/water-board-page-texts'
import { computeWaterBill, getConnectionTariff, getWaterTariff, waterTariffRegistry } from '@/lib/calc/water'
import { formatINR, formatIsoDate } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'

/** Every board with a real tariff file — used for the honest multi-board
 *  comparison. Only DJB/CMWSSB/PCMC exist today; more join as we verify them. */
const REAL_TARIFF_BOARD_CODES = Object.keys(waterTariffRegistry)

export default function WaterBoardPage({
  boardCode,
  slug,
  texts = enWaterBoardPageTexts,
}: {
  boardCode: string
  slug: string
  texts?: WaterBoardPageTexts
}) {
  const t = texts
  const hi = texts === hiWaterBoardPageTexts
  const tariff = getWaterTariff(boardCode)
  // The page describes the domestic tariff by default — the calculator
  // itself lets a visitor switch to commercial/industrial where we have it.
  const connection = getConnectionTariff(tariff, 'domestic')
  const commercial = tariff.connectionTypes.find((c) => c.connectionType === 'commercial')
  const path = `/water/${slug}`
  const localePath = hi ? `/hi${path}` : path
  const localeBase = hi ? `${SITE}/hi` : SITE
  const defaultMeter = Object.keys(connection.fixedChargeByMeterSize)[0]
  const topRate = connection.slabs[connection.slabs.length - 1].ratePerKL
  const freeKl = connection.freeAllowance?.kl

  const underExample = freeKl != null ? computeWaterBill(tariff, { consumptionKl: freeKl }) : null
  const overExample = freeKl != null ? computeWaterBill(tariff, { consumptionKl: freeKl + 1 }) : null
  const heroExample = underExample ?? computeWaterBill(tariff, { consumptionKl: 15 })
  const auditExample = computeWaterBill(tariff, { consumptionKl: 20 })
  const commercialExample = commercial ? computeWaterBill(tariff, { consumptionKl: 20, connectionType: 'commercial' }) : null
  // Boards without an all-or-nothing free threshold still get a 2-example
  // pull-quote pair — low vs high usage — instead of the threshold framing.
  const lowExample = freeKl == null ? computeWaterBill(tariff, { consumptionKl: 10 }) : null
  const highExample = freeKl == null ? computeWaterBill(tariff, { consumptionKl: 30 }) : null

  const facts = getWaterBoardFacts(boardCode)
  const otherBoards = waterBoardsJson.boards.filter((b) => b.slug !== slug).slice(0, 3)
  const hasMultiBoardComparison = REAL_TARIFF_BOARD_CODES.length > 1
  const comparisonKl = 15

  // Real entry-slab rate spread and sewerage-charge spread across every
  // board we've sourced — used in the "why calculators are wrong" section
  // instead of an invented claim. Always compares domestic tariffs.
  const allDomestic = REAL_TARIFF_BOARD_CODES.map((code) => ({
    tariff: getWaterTariff(code),
    connection: getConnectionTariff(getWaterTariff(code), 'domestic'),
  }))
  const cheapest = [...allDomestic].sort((a, b) => a.connection.slabs[0].ratePerKL - b.connection.slabs[0].ratePerKL)[0]
  const priciest = [...allDomestic].sort((a, b) => b.connection.slabs[0].ratePerKL - a.connection.slabs[0].ratePerKL)[0]
  const hasRateSpread = cheapest && priciest && cheapest.tariff.boardCode !== priciest.tariff.boardCode
  const cyclesDiffer = allDomestic.some((d) => d.tariff.billingCycle !== tariff.billingCycle)

  const faqs = [
    {
      q: t.faq.howCalculatedQ(tariff.boardCode),
      a: t.faq.howCalculatedA(tariff.boardName, connection.sewerageChargePercent),
    },
    {
      q: t.faq.whatIsKlQ(tariff.boardCode),
      a: t.faq.whatIsKlA,
    },
    freeKl != null
      ? { q: t.faq.freeAllowanceQ(tariff.boardCode), a: t.faq.freeAllowanceYesA(freeKl) }
      : { q: t.faq.freeAllowanceQ(tariff.boardCode), a: t.faq.freeAllowanceNoA(tariff.boardCode) },
    {
      q: t.faq.sewerageQ,
      a: t.faq.sewerageA(connection.sewerageChargePercent, tariff.boardCode),
    },
    {
      q: t.faq.meterSizeQ(tariff.boardCode),
      a: t.faq.meterSizeA(tariff.boardCode, Object.keys(connection.fixedChargeByMeterSize).join(', ')),
    },
    {
      q: t.faq.typicalBillQ,
      a: t.faq.typicalBillA(
        formatINR(computeWaterBill(tariff, { consumptionKl: 15 * (tariff.billingCycle === 'bimonthly' ? 2 : 1) }).monthlyEquivalent?.total ?? computeWaterBill(tariff, { consumptionKl: 15 }).total),
        tariff.boardCode,
      ),
    },
    {
      q: t.faq.tankerCheaperQ,
      a: t.faq.tankerCheaperA,
    },
    {
      q: t.faq.reduceQ,
      a: t.faq.reduceA(tariff.boardCode, freeKl != null ? t.faq.reduceAWithFree(freeKl) : t.faq.reduceANoFree),
    },
    {
      q: t.faq.payQ(tariff.boardCode),
      a: facts
        ? `Use the ${facts.paymentPortal.name} (${facts.paymentPortal.url})${facts.app ? `, or the ${facts.app.name} app — ${facts.app.note}` : ''}. ${facts.helpline ? `For complaints or issues: ${facts.helpline}.` : ''}`
        : `${tariff.boardName} provides an online customer portal for checking consumption history, viewing bills and paying online — check their official website for the current portal link, since these occasionally change.`,
    },
    {
      q: t.faq.verifiedFreqQ,
      a: t.faq.verifiedFreqA(tariff.boardCode, formatIsoDate(tariff.lastVerified)),
    },
    ...(facts
      ? [
          { q: t.faq.tapWaterSafeQ(tariff.boardCode), a: facts.qualityNote },
          { q: t.faq.sourceQ(tariff.boardCode), a: facts.waterSources },
        ]
      : []),
    ...(facts?.meteringCaveat
      ? [{ q: t.faq.meteringApplyQ, a: facts.meteringCaveat }]
      : []),
    {
      q: t.faq.meterReadingQ,
      a: t.faq.meterReadingA,
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
  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${tariff.boardName} Water Bill Calculator`,
    url: `${SITE}${path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    areaServed: tariff.citiesServed,
  }
  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${tariff.boardName} domestic water tariff`,
    description: `Municipal water tariff for ${tariff.boardName}, effective ${tariff.effectiveFrom} — also underlies the per-board comparison and consumption reference tables on this page.`,
    url: `${SITE}${path}#tariff-table`,
    dateModified: tariff.lastVerified,
    creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
    license: tariff.sourceUrl,
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'text/html', contentUrl: tariff.sourceUrl },
    ],
  }
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to calculate your ${tariff.boardCode} water bill`,
    step: [
      { '@type': 'HowToStep', position: 1, text: `Find your KL consumption from your meter or last bill.` },
      { '@type': 'HowToStep', position: 2, text: 'Note your connection\'s meter size, if you know it.' },
      { '@type': 'HowToStep', position: 3, text: 'Enter both into the calculator above.' },
      { '@type': 'HowToStep', position: 4, text: 'Get your itemised bill — water charge, sewerage and fixed charge.' },
    ],
  }
  const breadcrumb = breadcrumbLd([
    { name: hi ? 'होम' : 'Home', path: hi ? '/hi' : '' },
    { name: t.breadcrumbWater, path: hi ? '/hi/water' : '/water' },
    // tariff.boardName is per-board authored English copy, not yet
    // translated (the actual content work this page's noindex is waiting
    // on) — left as-is deliberately. See SEO audit 2026-09-07.
    { name: tariff.boardName, path: localePath },
  ])

  return (
    <>
      <SplitHero
        hub="water"
        breadcrumb={[
          { label: t.breadcrumbWater, href: '/water' },
          { label: tariff.boardCode, href: path },
        ]}
        badgeLabel={`${tariff.citiesServed[0]} · ${tariff.boardCode} · ${tariff.billingCycle} billing`}
        h1={`${tariff.boardName} (${tariff.boardCode}) Bill Calculator`}
        subtitle={`Estimate your ${tariff.boardCode} water bill using their real domestic tariff — not a self-entered rate. Covers ${tariff.citiesServed.slice(0, 3).join(', ')}.`}
        primaryCta={{ label: t.primaryCta(tariff.boardCode), href: '#calculator', emoji: '💧' }}
        secondaryCta={{ label: t.secondaryCta, href: '/water' }}
        statChips={[
          { icon: '💧', big: `₹${topRate.toFixed(2)}`, small: t.statTopSlab, tone: 'hub' },
          { icon: '📅', big: tariff.billingCycle === 'bimonthly' ? t.statBillingBimonthly : t.statBillingMonthly, small: 'Billing', tone: 'hub' },
          freeKl != null
            ? { icon: '🎁', big: `${freeKl} KL`, small: t.statFree, tone: 'hub' }
            : { icon: '➕', big: formatINR(connection.fixedChargeByMeterSize[defaultMeter]), small: t.statFixedCharge, tone: 'hub' },
          { icon: '✓', big: formatIsoDate(tariff.lastVerified), small: t.statVerified, tone: 'seal-red' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
              <span aria-hidden>💧</span> {t.heroWorkedExample}
            </p>
            <p className="mt-2 text-sm text-white/70">
              {t.heroCostsAbout(freeKl != null ? `${freeKl} KL` : '15 KL', tariff.boardCode)}
            </p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums text-white">
              {formatINR(heroExample.total)}
              <span className="ml-1 text-sm font-normal text-white/50">
                /{tariff.billingCycle === 'bimonthly' ? t.heroPerCycle : t.heroPerMonth}
              </span>
            </p>
            {heroExample.freeAllowanceApplied && (
              <p className="mt-2 text-xs text-spark-teal">
                {t.heroFreeAllowanceNote}
              </p>
            )}
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            {t.calculateHeading(tariff.boardCode)}
          </h2>
          <WaterBoardBillCalculator boardCode={tariff.boardCode} boardName={tariff.boardName} />
        </section>

        <section
          aria-labelledby="worked-example"
          className="mb-8 rounded-xl border border-hairline border-l-4 border-l-hub-water bg-paper p-5"
        >
          <h2
            id="worked-example"
            className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-hub-water uppercase"
          >
            <span aria-hidden>💧</span> {t.workedExampleHeading}
          </h2>
          <p className="mt-3 text-lg text-ash/90">
            {t.workedExampleLead(freeKl ?? 15, tariff.billingCycle === 'bimonthly' ? 'bi-monthly' : 'monthly', tariff.boardCode)}{' '}
            <WorkedExampleTotal amount={heroExample.total} />
            {heroExample.monthlyEquivalent && (
              <> — {t.workedExampleAbout} <strong>{formatINR(heroExample.monthlyEquivalent.total)}</strong> {t.workedExamplePerMonth}</>
            )}
            . {t.workedExampleThatIs} {formatINR(heroExample.waterCharge)} {t.waterChargeLabel} + {formatINR(heroExample.sewerageCharge)}{' '}
            {t.sewerageLabel} + {formatINR(heroExample.fixedCharge)} {t.fixedChargeLabel}.
          </p>
          <a href="#audit" className="mt-3 inline-block text-sm font-semibold text-hub-water hover:underline">
            {t.seeFullBreakdown}
          </a>
        </section>

        <section aria-labelledby="budget-tool" className="mb-10 scroll-mt-20">
          <h2 id="budget-tool" className="font-display mb-2 text-2xl font-semibold">
            {t.budgetHeading}
          </h2>
          <p className="mb-4 text-ash/70">
            {t.budgetBody(tariff.boardCode)}
          </p>
          <BudgetToKlCalculator tariff={tariff} />
        </section>

        <section aria-labelledby="how-to" className="mb-10 scroll-mt-20">
          <h2 id="how-to" className="font-display mb-4 text-2xl font-semibold">
            {t.howToHeading(tariff.boardCode)}
          </h2>
          <ol className="space-y-3">
            {t.howToSteps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-water font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-ash/80">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="wrong" className="mb-10 scroll-mt-20">
          <h2 id="wrong" className="font-display mb-4 text-2xl font-semibold">
            {t.wrongHeading}
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="font-display font-bold text-ink-navy">
                {t.wrongCard1Title}
              </p>
              <p className="mt-1 text-sm text-ash/70">
                {t.wrongCard1BodyStart}
                {hasRateSpread ? (
                  t.wrongCard1WithSpread(
                    cheapest.tariff.boardCode,
                    formatINR(cheapest.connection.slabs[0].ratePerKL),
                    priciest.tariff.boardCode,
                    formatINR(priciest.connection.slabs[0].ratePerKL),
                  )
                ) : (
                  '.'
                )}
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="font-display font-bold text-ink-navy">
                {t.wrongCard2Title}
              </p>
              <p className="mt-1 text-sm text-ash/70">
                {t.wrongCard2Body(Math.max(...allDomestic.map((d) => d.connection.sewerageChargePercent)))}
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="font-display font-bold text-ink-navy">
                {t.wrongCard3Title}
              </p>
              <p className="mt-1 text-sm text-ash/70">
                {cyclesDiffer
                  ? t.wrongCard3BodyDiffer
                  : t.wrongCard3BodySame(tariff.boardCode, tariff.billingCycle)}
                {t.wrongCard3BodyEnd}
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="formula" className="mb-10 scroll-mt-20">
          <h2 id="formula" className="font-display mb-4 text-2xl font-semibold">
            {t.formulaHeading(tariff.boardCode)}
          </h2>
          <WaterFormulaBlock boardCode={tariff.boardCode} />
        </section>

        <section aria-labelledby="tariff-table" className="mb-10 scroll-mt-20">
          <h2 id="tariff-table" className="font-display mb-4 text-2xl font-semibold">
            {t.tariffTableHeading(tariff.boardCode)}
          </h2>
          <div className="rounded-2xl border border-hairline bg-paper p-6 shadow-sm">
            <WaterSlabBand slabs={connection.slabs} />

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-hairline pt-4 text-xs text-ash/50">
              <span>
                {t.sewerageInline} <strong className="text-ash/70">{t.ofWaterCharge(connection.sewerageChargePercent)}</strong>
              </span>
              {Object.entries(connection.fixedChargeByMeterSize).map(([size, amt]) => (
                <span key={size}>
                  {t.fixedInline(size)} <strong className="text-ash/70">{formatINR(amt)}{t.perCycle}</strong>
                </span>
              ))}
            </div>

            <details className="group mt-4 border-t border-hairline pt-4">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold tracking-wide text-ash/50 uppercase marker:hidden">
                {t.exactFigures}
                <span className="text-ash/40 transition group-open:rotate-180" aria-hidden>⌄</span>
              </summary>
              <div className="mt-3 overflow-x-auto rounded-xl border border-hairline">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-hairline bg-mist text-ink-navy">
                    <tr>
                      <th className="px-4 py-2 font-semibold">{t.slabKl}</th>
                      <th className="px-4 py-2 text-right font-semibold">{t.rateKl}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {connection.slabs.map((s, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2">{s.minKL}–{s.maxKL ?? 'above'}</td>
                        <td className="px-4 py-2 text-right tabular-nums">₹{s.ratePerKL.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-mist text-ash/70">
                    <tr>
                      <td className="px-4 py-2">{t.sewerageCharge}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{t.ofWaterCharge(connection.sewerageChargePercent)}</td>
                    </tr>
                    {Object.entries(connection.fixedChargeByMeterSize).map(([size, amt]) => (
                      <tr key={size}>
                        <td className="px-4 py-2">{t.fixedChargeMeter(size)}</td>
                        <td className="px-4 py-2 text-right tabular-nums">{formatINR(amt)}{t.perCycle}</td>
                      </tr>
                    ))}
                  </tfoot>
                </table>
              </div>
            </details>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            {t.effectiveVerifiedSource(formatIsoDate(tariff.effectiveFrom), formatIsoDate(tariff.lastVerified))}{' '}
            <a
              href={tariff.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              {t.sourceWord}
            </a>
            . <strong>{tariff.verifiedBy}</strong>
          </p>
          {commercial && commercialExample && (
            <div className="mt-4 rounded-xl border border-hairline bg-mist p-4">
              <p className="text-sm font-semibold text-ink-navy">
                {t.commercialHeading(tariff.boardCode)}
              </p>
              <p className="mt-1 text-sm text-ash/70">
                {t.commercialBody(
                  `${formatINR(commercial.slabs[0].ratePerKL)}/KL`,
                  Math.round((commercial.slabs[0].ratePerKL / connection.slabs[0].ratePerKL) * 10) / 10,
                  formatINR(auditExample.waterCharge + auditExample.sewerageCharge + auditExample.fixedCharge),
                  formatINR(commercialExample.total),
                )}
                {commercial.verifiedByNote && (
                  <span className="mt-1 block text-xs text-ash/50">{commercial.verifiedByNote}</span>
                )}
              </p>
            </div>
          )}
        </section>

        <section aria-labelledby="board-vs-board" className="mb-10 scroll-mt-20">
          <h2 id="board-vs-board" className="font-display mb-2 text-2xl font-semibold">
            {t.boardVsBoardHeading(tariff.boardCode)}
          </h2>
          {hasMultiBoardComparison ? (
            <>
              <p className="mb-4 text-sm text-ash/60">
                {t.boardVsBoardBody(comparisonKl)}
              </p>
              <WaterBoardComparisonTable consumptionKl={comparisonKl} boardCodes={REAL_TARIFF_BOARD_CODES} />
            </>
          ) : (
            <p className="text-sm text-ash/60">
              {t.boardVsBoardOnlyOne(tariff.boardCode)}
            </p>
          )}
        </section>

        <section aria-labelledby="neighbor" className="mb-10 scroll-mt-20">
          <h2 id="neighbor" className="font-display mb-4 text-2xl font-semibold">
            {t.neighborHeading}
          </h2>
          <WaterNeighborDiagnostic />
        </section>

        <section aria-labelledby="audit" className="mb-10 scroll-mt-20">
          <h2 id="audit" className="font-display mb-2 text-2xl font-semibold">
            {t.auditHeading}
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            {t.auditBody}
          </p>
          <WaterBillComponentAudit bill={auditExample} />
        </section>

        <section aria-labelledby="worked-examples" className="mb-10 scroll-mt-20">
          <h2 id="worked-examples" className="font-display mb-4 text-2xl font-semibold">
            {underExample && overExample
              ? t.workedExamplesHeadingThreshold
              : t.workedExamplesHeadingLowHigh}
          </h2>
          <div className="space-y-3">
            {underExample && overExample ? (
              <>
                <div className="rounded-xl border border-hairline border-l-4 border-l-spark-teal bg-paper p-5">
                  <p className="text-base text-ash/90">
                    {t.thresholdUnder(freeKl ?? 0, tariff.boardCode)} <WorkedExampleTotal amount={underExample.total} /> —
                    only the fixed charge applies, since the water and sewerage charges are waived entirely.
                  </p>
                </div>
                <div className="rounded-xl border border-hairline border-l-4 border-l-caution-amber bg-paper p-5">
                  <p className="text-base text-ash/90">
                    {t.thresholdOver((freeKl ?? 0) + 1)}{' '}
                    <WorkedExampleTotal amount={overExample.total} /> ({formatINR(overExample.waterCharge)} water +{' '}
                    {formatINR(overExample.sewerageCharge)} sewerage).
                  </p>
                </div>
              </>
            ) : (
              lowExample &&
              highExample && (
                <>
                  <div className="rounded-xl border border-hairline border-l-4 border-l-spark-teal bg-paper p-5">
                    <p className="text-base text-ash/90">
                      {t.lowExampleBody(tariff.boardCode)}{' '}
                      <WorkedExampleTotal amount={lowExample.total} /> — {formatINR(lowExample.waterCharge)} water +{' '}
                      {formatINR(lowExample.sewerageCharge)} sewerage + {formatINR(lowExample.fixedCharge)} fixed.
                    </p>
                  </div>
                  <div className="rounded-xl border border-hairline border-l-4 border-l-caution-amber bg-paper p-5">
                    <p className="text-base text-ash/90">
                      {t.highExampleBody} <WorkedExampleTotal amount={highExample.total} />{' '}
                      — {formatINR(highExample.waterCharge)} water + {formatINR(highExample.sewerageCharge)}{' '}
                      sewerage, since the higher slabs kick in well before 30 KL.
                    </p>
                  </div>
                </>
              )
            )}
          </div>
        </section>

        <section aria-labelledby="household" className="mb-10 scroll-mt-20">
          <h2 id="household" className="font-display mb-2 text-2xl font-semibold">
            {t.householdHeading}
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            {t.householdBody(tariff.boardCode)}
          </p>
          <WaterHouseholdConsumptionTable tariff={tariff} />
        </section>

        <section aria-labelledby="reference" className="mb-10 scroll-mt-20">
          <h2 id="reference" className="font-display mb-2 text-2xl font-semibold">
            {t.referenceHeading}
          </h2>
          <WaterConsumptionReferenceTable />
        </section>

        {freeKl != null && (
          <section
            aria-labelledby="free-rule"
            className="mb-10 scroll-mt-20 rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5"
          >
            <h2 id="free-rule" className="font-display mb-2 text-xl font-bold text-ink-navy">
              {t.freeRuleHeading(freeKl)}
            </h2>
            <p className="text-sm text-ash/80">
              {t.freeRuleBody(freeKl)}
            </p>
          </section>
        )}

        <section aria-labelledby="charges-explained" className="mb-10 scroll-mt-20">
          <h2 id="charges-explained" className="font-display mb-4 text-2xl font-semibold">
            {t.chargesExplainedHeading(tariff.boardCode)}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">{t.componentLabel}</th>
                  <th className="px-4 py-2 font-semibold">{t.chargeTypeLabel}</th>
                  <th className="px-4 py-2 font-semibold">{t.whatItIsLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">{t.waterChargeLabel}</td>
                  <td className="px-4 py-2 text-ash/60">{t.waterChargeRow.type}</td>
                  <td className="px-4 py-2 text-ash/70">
                    {t.waterChargeRow.desc(tariff.boardCode)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">{t.sewerageCharge}</td>
                  <td className="px-4 py-2 text-ash/60">{t.ofWaterCharge(connection.sewerageChargePercent)}</td>
                  <td className="px-4 py-2 text-ash/70">
                    {t.sewerageChargeRow.desc}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">{t.fixedChargeLabel}</td>
                  <td className="px-4 py-2 text-ash/60">{t.fixedChargeRow.type}</td>
                  <td className="px-4 py-2 text-ash/70">
                    {t.fixedChargeRow.desc(tariff.boardCode)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="tips" className="mb-10 scroll-mt-20">
          <h2 id="tips" className="font-display mb-4 text-2xl font-semibold">
            {t.tipsHeading(tariff.boardCode)}
          </h2>
          <ul className="space-y-2.5 text-ash/80">
            {[
              freeKl != null ? t.tipFreeThreshold(freeKl) : t.tipNoFree,
              ...t.tips,
            ].map((tip, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-0.5 text-hub-water" aria-hidden>✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tanker" className="mb-10 scroll-mt-20">
          <h2 id="tanker" className="font-display mb-2 text-2xl font-semibold">
            {t.tankerHeading}
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            {t.tankerBody(tariff.boardCode)}
          </p>
          <PipedVsTankerComparison boardCode={tariff.boardCode} />
        </section>

        <section aria-labelledby="landscape" className="mb-10 scroll-mt-20">
          <h2 id="landscape" className="font-display mb-2 text-2xl font-semibold">
            {t.landscapeHeading}
          </h2>
          <p className="text-ash/80">
            {t.landscapeBody(tariff.boardCode)}
          </p>
        </section>

        <section aria-labelledby="about-board" className="mb-10 scroll-mt-20">
          <h2 id="about-board" className="font-display mb-2 text-2xl font-semibold">
            {t.aboutHeading(tariff.boardName)}
          </h2>
          <div className="space-y-3 text-ash/80">
            <p>
              {t.aboutBody(tariff.boardName, tariff.boardCode, tariff.citiesServed.join(', '))}
            </p>
            {facts && (
              <>
                <p>
                  <strong>{t.aboutWaterSourcesLabel}</strong> {facts.waterSources}{' '}
                  <a href={facts.sourcesCitation} target="_blank" rel="noopener noreferrer" className="text-brass underline">
                    {t.aboutSourceLink}
                  </a>
                  .
                </p>
                <p>
                  <strong>{t.aboutQualityLabel}</strong> {facts.qualityNote}
                </p>
                {facts.meteringCaveat && (
                  <p className="rounded-lg border border-caution-amber/25 bg-caution-amber/5 p-3 text-sm">
                    <strong>{t.aboutMeteringLabel}</strong> {facts.meteringCaveat}
                  </p>
                )}
              </>
            )}
            <p className="rounded-lg border border-caution-amber/25 bg-caution-amber/5 p-3 text-sm">
              <strong>{t.independenceDisclaimerLabel}</strong>{' '}
              {t.independenceDisclaimerBody(tariff.boardName, tariff.boardCode)}
            </p>
          </div>
        </section>

        <section aria-labelledby="pay-online" className="mb-10 scroll-mt-20">
          <h2 id="pay-online" className="font-display mb-2 text-2xl font-semibold">
            {t.payOnlineHeading(tariff.boardCode)}
          </h2>
          {facts ? (
            <p className="text-ash/80">
              Use the{' '}
              <a href={facts.paymentPortal.url} target="_blank" rel="noopener noreferrer" className="text-brass underline">
                {facts.paymentPortal.name}
              </a>
              {facts.app && (
                <> or the <strong>{facts.app.name}</strong> app — {facts.app.note}.</>
              )}{' '}
              {facts.helpline && t.payOnlineHelpline(facts.helpline)}
            </p>
          ) : (
            <p className="text-ash/80">
              {t.payOnlineFallback(tariff.boardName)}
            </p>
          )}
        </section>

        <section aria-labelledby="ecosystem" className="mb-10 scroll-mt-20">
          <h2 id="ecosystem" className="font-display mb-4 text-2xl font-semibold">
            {t.ecosystemHeading}
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            {t.ecosystemBody}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/appliances/water-tank-filling-time-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🚰</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {t.ecoWaterTank.label}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {t.ecoWaterTank.sub}
              </p>
            </Link>
            <Link
              href="/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>⚡</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {t.ecoElectricity.label}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {t.ecoElectricity.sub}
              </p>
            </Link>
            <Link
              href="/gas"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🔥</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {t.ecoGas.label}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {t.ecoGas.sub}
              </p>
            </Link>
            <Link
              href="/appliances/household-bill-builder"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🔌</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {t.ecoHouseholdBuilder.label}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {t.ecoHouseholdBuilder.sub}
              </p>
            </Link>
            <Link
              href="/ac"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>❄️</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {t.ecoAc.label}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {t.ecoAc.sub}
              </p>
            </Link>
            <Link
              href="/fuel-cost"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>⛽</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {t.ecoFuel.label}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {t.ecoFuel.sub}
              </p>
            </Link>
            <Link
              href="/financial"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-financial/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🧮</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {t.ecoFinancial.label}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {t.ecoFinancial.sub}
              </p>
            </Link>
            {otherBoards.map((b) => (
              <Link
                key={b.slug}
                href={`/water/${b.slug}`}
                className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
              >
                <span className="text-xl" aria-hidden>🗺️</span>
                <p className="font-display mt-2 font-bold text-ink-navy">
                  {b.name}
                </p>
                <p className="mt-1 text-xs text-ash/60">
                  {b.hasTariffFile ? t.otherBoardCalculator(b.name) : t.comingSoon}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="guides" className="mb-10 scroll-mt-20">
          <h2 id="guides" className="font-display mb-4 text-2xl font-semibold">
            {t.guidesHeading}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="#reference"
              className="rounded-xl border border-hairline bg-paper p-4 text-sm font-semibold text-ink-navy transition hover:border-hub-water/50 hover:shadow-sm"
            >
              {t.guideKl}
            </a>
            <a
              href="#charges-explained"
              className="rounded-xl border border-hairline bg-paper p-4 text-sm font-semibold text-ink-navy transition hover:border-hub-water/50 hover:shadow-sm"
            >
              {t.guideComponents}
            </a>
            <a
              href="#tips"
              className="rounded-xl border border-hairline bg-paper p-4 text-sm font-semibold text-ink-navy transition hover:border-hub-water/50 hover:shadow-sm"
            >
              {t.guideTips}
            </a>
            <Link
              href="/water"
              className="rounded-xl border border-hairline bg-paper p-4 text-sm font-semibold text-ink-navy transition hover:border-hub-water/50 hover:shadow-sm"
            >
              {t.guideBrowseAll}
            </Link>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            {t.guidesNote}
          </p>
        </section>

        <section aria-labelledby="faq" className="mb-10 scroll-mt-20">
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

        <section aria-labelledby="how-we-verify" className="mb-10 scroll-mt-20">
          <h2 id="how-we-verify" className="sr-only">
            {t.howWeVerifyHeading(tariff.boardCode)}
          </h2>
          <HowWeVerify
            sourceStepBody={t.howWeVerifySource(tariff.boardName)}
            crossCheckStepBody={t.howWeVerifyCrossCheck(connection.sewerageChargePercent, tariff.boardCode)}
            verifiedDate={formatIsoDate(tariff.lastVerified)}
          />
        </section>

        <footer className="rounded-xl border border-hairline bg-paper p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-seal-red/30 bg-seal-red/5 px-2.5 py-1 text-xs font-semibold text-seal-red">
              <span aria-hidden>⦿</span> {t.footerVerified(formatIsoDate(tariff.lastVerified))}
            </span>
            <span className="text-xs text-ash/50">
              {t.footerEffectiveFrom(formatIsoDate(tariff.effectiveFrom))}
            </span>
          </div>
          <p className="mt-3 text-sm text-ash/70">
            {t.footerSource}{' '}
            <a
              href={tariff.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              {t.footerNotification(tariff.boardName)}
            </a>
          </p>
          <p className="mt-1 text-xs text-ash/50">{tariff.verifiedBy}</p>
          <p className="mt-3 border-t border-hairline pt-3 text-xs text-ash/50">
            {t.footerDisclaimer(tariff.boardName, tariff.boardCode)}{' '}
            <Link href="/methodology" className="underline">
              {t.footerMethodology}
            </Link>{' '}
            · <Link href="/data-sources" className="underline">{t.footerDataSources}</Link> ·{' '}
            <Link href="/disclaimer" className="underline">{t.footerDisclaimerLink}</Link>
          </p>
        </footer>

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </main>
    </>
  )
}
