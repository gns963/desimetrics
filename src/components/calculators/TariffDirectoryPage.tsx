import Link from 'next/link'
import type { DiscomPageConfig } from '@/data/calculator-pages'
import type { ConnectionCategory, ConnectionType, TariffFile } from '@/data/tariffs/_schema'
import { cycleLabel, fixedChargeLabel, formatIsoDate } from '@/lib/format'

const SITE = 'https://desimetrics.com'

const CATEGORY_ORDER: ConnectionCategory[] = [
  'residential',
  'commercial',
  'industrial',
  'agriculture',
]

const CATEGORY_LABEL: Record<ConnectionCategory, string> = {
  residential: 'Domestic (Residential)',
  commercial: 'Commercial',
  industrial: 'Industrial',
  agriculture: 'Agriculture',
}

const CATEGORY_ICON: Record<ConnectionCategory, string> = {
  residential: '🏠',
  commercial: '🏬',
  industrial: '🏭',
  agriculture: '🌾',
}

const CATEGORY_BLURB: Record<ConnectionCategory, string> = {
  residential: 'households',
  commercial: 'shops and businesses',
  industrial: 'factories and manufacturing units',
  agriculture: 'irrigation and farm-pump connections',
}

function isFlatRate(ct: ConnectionType): boolean {
  return ct.slabs.length === 1 && ct.slabs[0].minUnits === 0
}

/** "Domestic, Commercial and Industrial" — only the categories actually
 *  present in this DISCOM's data, never a hardcoded list that could imply
 *  coverage that doesn't exist. */
function joinCategoryLabels(categories: ConnectionType[]): string {
  const labels = categories.map((c) => CATEGORY_LABEL[c.connectionType])
  if (labels.length <= 1) return labels.join('')
  return `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`
}

export default function TariffDirectoryPage({
  config,
  tariff,
}: {
  config: DiscomPageConfig
  tariff: TariffFile
}) {
  const path = `/electricity/${config.slug}/tariffs`
  const calculatorPath = `/electricity/${config.slug}`

  const categories = CATEGORY_ORDER.map((cat) =>
    tariff.connectionTypes.find((c) => c.connectionType === cat),
  ).filter((c): c is ConnectionType => Boolean(c))

  const residential =
    tariff.connectionTypes.find((c) => c.connectionType === 'residential') ??
    tariff.connectionTypes[0]
  const oneUnitRate = residential.slabs[0].ratePerUnit

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Electricity', item: `${SITE}/electricity` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Tariff Directory',
        item: `${SITE}/electricity/tariffs`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${tariff.state} Tariff Rates`,
        item: `${SITE}${path}`,
      },
    ],
  }

  const faqs = [
    {
      q: `What are the latest electricity tariff rates in ${tariff.state}?`,
      a: `The latest verified tariff rates for ${tariff.state} are structured by connection category (${joinCategoryLabels(categories)}) as shown in the tables above, sourced from ${tariff.discomName}'s published tariff schedule effective ${formatIsoDate(tariff.effectiveFrom)}.`,
    },
    {
      q: `How do I calculate my ${tariff.state} electricity bill online?`,
      a: `Use our dedicated ${tariff.discomCode} bill calculator — enter your units consumed and connection type for an itemised, slab-by-slab estimate including fixed charges and electricity duty.`,
    },
    {
      q: `Why is my ${tariff.state} electricity bill higher than the energy charges alone?`,
      a: `In addition to per-unit slab rates (energy charges), your bill includes other components such as fixed/demand charges, meter rent${tariff.fuelCostAdjustment > 0 ? ', a fuel cost adjustment surcharge,' : ''} and electricity duty (tax).`,
    },
    {
      q: 'How often are these electricity tariff rates updated?',
      a: 'Electricity tariff rates in India are typically revised periodically by the respective State Electricity Regulatory Commission (SERC). We update our tariff data as soon as new orders are verified — see the "last verified" date on each category card above.',
    },
    {
      q: `What is the price of 1 unit of electricity in ${tariff.state}?`,
      a: `The rate for the first slab of Domestic electricity in ${tariff.state} is ₹${oneUnitRate.toFixed(2)} per unit. This rate may increase as consumption moves into higher slabs — see the Domestic (Residential) table above for the full slab structure.`,
    },
    {
      q: `Does ${tariff.discomCode} offer a separate tariff for Commercial or Industrial connections?`,
      a: categories.some((c) => c.connectionType === 'commercial') || categories.some((c) => c.connectionType === 'industrial')
        ? `Yes — see the ${joinCategoryLabels(categories.filter((c) => c.connectionType !== 'residential'))} categories above for their own slab rates and fixed charges, distinct from the Domestic tariff.`
        : `A separate Commercial or Industrial tariff for ${tariff.discomCode} could not be verified from a reliable published source, so only the Domestic (Residential) tariff is shown here.`,
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
  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${tariff.discomName} tariff schedule`,
    description: `Category-wise (${joinCategoryLabels(categories)}) electricity tariff slabs for ${tariff.state}, effective ${tariff.effectiveFrom}.`,
    url: `${SITE}${path}`,
    dateModified: tariff.lastVerified,
    creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
    license: tariff.sourceUrl,
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'text/html', contentUrl: tariff.sourceUrl },
    ],
  }

  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/50">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-brass">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/electricity" className="hover:text-brass">
                  Electricity
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/electricity/tariffs" className="hover:text-brass">
                  Tariff Directory
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-white/80">{tariff.state} Tariff Rates</li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-xs font-semibold text-brass">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden />
            {tariff.state} · {tariff.discomCode} · {categories.length} categories
          </span>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {tariff.state} Electricity Tariff Rates &amp; Charges
          </h1>
          <p className="mt-1 text-lg text-white/70">{tariff.discomName}</p>
          <p className="mt-4 max-w-2xl text-white/70">
            Complete, category-wise electricity tariff rates and applicable charges for{' '}
            {tariff.discomName} — {joinCategoryLabels(categories)} connections.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={calculatorPath}
              className="flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brass/90"
            >
              <span aria-hidden>⚡</span> Calculate Your {tariff.discomCode} Bill
            </Link>
            <a
              href={tariff.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              Official Source ↗
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Summary strip */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['State / UT', tariff.state],
            ['Utility Board', tariff.discomCode],
            ['1 Unit Rate', `₹${oneUnitRate.toFixed(2)}/unit`],
            ['Categories', `${categories.length} covered`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-hairline bg-paper px-3 py-3 text-center">
              <p className="font-display text-lg font-bold text-brass tabular-nums">{value}</p>
              <p className="text-[11px] tracking-wide text-ash/50 uppercase">{label}</p>
            </div>
          ))}
        </div>

        {/* Category cards */}
        <section aria-labelledby="categories" className="mb-10">
          <h2 id="categories" className="mb-4 font-display text-2xl font-bold text-ink-navy">
            Tariff by Connection Category
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {categories.map((ct) => {
              const effectiveDuty = ct.electricityDutyPercent ?? tariff.electricityDutyPercent
              const effectiveFca = ct.fuelCostAdjustment ?? tariff.fuelCostAdjustment
              const flat = isFlatRate(ct)
              return (
                <div
                  key={ct.connectionType}
                  className="overflow-hidden rounded-xl border border-hairline bg-paper"
                >
                  <div className="bg-ink-navy px-4 py-3">
                    <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
                      <span aria-hidden>{CATEGORY_ICON[ct.connectionType]}</span>
                      {CATEGORY_LABEL[ct.connectionType]}
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-hairline bg-mist text-ink-navy">
                        <tr>
                          <th className="px-4 py-2 font-semibold">
                            {flat ? 'Rate' : 'Slab Range (kWh)'}
                          </th>
                          <th className="px-4 py-2 text-right font-semibold">Rate/Unit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        {ct.slabs.map((s, i) => (
                          <tr key={i}>
                            <td className="px-4 py-2">
                              {flat ? 'All units' : `${s.minUnits}–${s.maxUnits ?? 'above'}`}
                            </td>
                            <td className="px-4 py-2 text-right tabular-nums">
                              ₹{s.ratePerUnit.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="space-y-1.5 border-t border-hairline px-4 py-3 text-sm">
                    <p className="mb-1 text-[11px] font-semibold tracking-wide text-ash/50 uppercase">
                      Detailed Charges
                    </p>
                    <div className="flex justify-between">
                      <span className="text-ash/70">Fixed Charge</span>
                      <span className="font-medium tabular-nums text-ink-navy">
                        {fixedChargeLabel(ct.fixedCharge)}
                      </span>
                    </div>
                    {ct.meterRent != null && ct.meterRent > 0 && (
                      <div className="flex justify-between">
                        <span className="text-ash/70">Meter Rent</span>
                        <span className="font-medium tabular-nums text-ink-navy">
                          ₹{ct.meterRent}
                        </span>
                      </div>
                    )}
                    {effectiveFca > 0 && (
                      <div className="flex justify-between">
                        <span className="text-ash/70">Fuel Cost Adjustment</span>
                        <span className="font-medium tabular-nums text-ink-navy">
                          ₹{effectiveFca}/unit
                        </span>
                      </div>
                    )}
                    {effectiveDuty > 0 && (
                      <div className="flex justify-between">
                        <span className="text-ash/70">Electricity Duty</span>
                        <span className="font-medium tabular-nums text-ink-navy">
                          {effectiveDuty}%
                        </span>
                      </div>
                    )}
                  </div>
                  {ct.sourceNote && (
                    <p className="border-t border-hairline bg-mist/50 px-4 py-2 text-xs text-ash/60">
                      {ct.sourceNote}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Explainer */}
        <section aria-labelledby="explainer" className="mb-10 space-y-4 text-ash/80">
          <h2 id="explainer" className="mb-2 font-display text-2xl font-bold text-ink-navy">
            {tariff.state} Tariff Structure Explained
          </h2>
          <div>
            <h3 className="font-semibold text-ash">{tariff.state} 1 Unit Rate</h3>
            <p className="mt-1">
              For domestic electricity consumers in {tariff.state}, the initial 1 unit rate starts at
              ₹{oneUnitRate.toFixed(2)} per kWh for consumption within the first slab per{' '}
              {cycleLabel(tariff.billingCycle)} billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ash">Tariff Categories</h3>
            <p className="mt-1">
              The tariff schedule for {tariff.state} covers {categories.length} consumer{' '}
              {categories.length === 1 ? 'category' : 'categories'}:
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {categories.map((c) => (
                <li key={c.connectionType}>
                  <strong>{CATEGORY_LABEL[c.connectionType]}</strong> — for{' '}
                  {CATEGORY_BLURB[c.connectionType]}.
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ash">Fixed Charges and Other Charges</h3>
            <p className="mt-1">
              On top of unit energy rates, {tariff.discomCode} bills can include:
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>A fixed or demand charge, based on connection parameters.</li>
              {tariff.electricityDutyPercent > 0 && (
                <li>A state electricity duty of {tariff.electricityDutyPercent}%.</li>
              )}
              {tariff.fuelCostAdjustment > 0 && (
                <li>A fuel cost adjustment of ₹{tariff.fuelCostAdjustment}/unit.</li>
              )}
              <li>Meter rent, where applicable.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ash">Electricity Bill Calculation</h3>
            <p className="mt-1">
              To estimate your {tariff.state} electricity bill by hand:
            </p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              <li>
                Multiply your {cycleLabel(tariff.billingCycle)} consumption in kilowatt-hours
                (units) by the applicable slab rate for each band.
              </li>
              <li>Add the fixed or demand charge.</li>
              <li>Add electricity duty and any fuel cost adjustment that applies.</li>
            </ol>
            <p className="mt-1">
              Or skip the arithmetic with our{' '}
              <Link href={calculatorPath} className="text-brass underline">
                {tariff.discomCode} electricity bill calculator
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Applicable board info card */}
        <section aria-labelledby="board-info" className="mb-10">
          <h2 id="board-info" className="mb-4 font-display text-2xl font-bold text-ink-navy">
            Applicable Electricity Board
          </h2>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="mb-4 text-sm text-ash/70">
              These electricity tariff rates are applicable for consumers in {tariff.state} served by{' '}
              {tariff.discomCode}.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                ['State / UT', tariff.state],
                ['Electricity Board', tariff.discomCode],
                ['Last Updated', formatIsoDate(tariff.lastVerified)],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold tracking-wide text-ash/50 uppercase">
                    {label}
                  </p>
                  <p className="mt-0.5 font-medium text-ink-navy">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="mb-10">
          <h2 id="faq" className="mb-4 font-display text-2xl font-bold text-ink-navy">
            Frequently Asked Questions
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

        {/* Disclaimer */}
        <footer className="rounded-xl border border-hairline bg-paper p-5">
          <p className="text-sm text-ash/70">
            Tariff rates listed here are provided for informational purposes only and may change
            over time. Slab rates, fixed charges and electricity duty are verified against publicly
            available tariff orders and reference sources. For bill estimates that account for
            available subsidies and other charges, please use our{' '}
            <Link href={calculatorPath} className="text-brass underline">
              {tariff.discomCode} electricity bill calculator
            </Link>
            .
          </p>
          <p className="mt-3 border-t border-hairline pt-3 text-xs text-ash/50">
            Estimates only.{' '}
            <Link href="/methodology" className="text-brass underline">
              How we collect and verify data
            </Link>{' '}
            ·{' '}
            <Link href="/data-sources" className="text-brass underline">
              Data Sources
            </Link>{' '}
            ·{' '}
            <Link href="/disclaimer" className="text-brass underline">
              Disclaimer
            </Link>
          </p>
        </footer>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
      />
    </>
  )
}
