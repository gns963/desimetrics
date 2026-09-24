import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import EvVsFuelCostCalculator from '@/components/calculators/EvVsFuelCostCalculator'
import { calculateEvBreakEven, calculateFuelCostComparison } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/ev-vs-fuel-cost-calculator'

const petrolExample = calculateFuelCostComparison({ label: 'Petrol', pricePerUnit: 100, mileage: 18 }, 40)
const evExample = calculateFuelCostComparison({ label: 'Electric', pricePerUnit: 8, mileage: 6 }, 40)
const breakEvenExample = calculateEvBreakEven(1500000, 1000000, evExample.costPerKm, petrolExample.costPerKm, 40)

const EV_PRICE_PREMIUM = 500000
const totalCostOfOwnership = [20, 40, 80].map((dailyKm) => {
  const petrol = calculateFuelCostComparison({ label: 'Petrol', pricePerUnit: 100, mileage: 18 }, dailyKm)
  const ev = calculateFuelCostComparison({ label: 'Electric', pricePerUnit: 8, mileage: 6 }, dailyKm)
  const breakEven = calculateEvBreakEven(1000000 + EV_PRICE_PREMIUM, 1000000, ev.costPerKm, petrol.costPerKm, dailyKm)
  return {
    dailyKm,
    petrolFiveYear: petrol.annualCost * 5,
    evFiveYear: ev.annualCost * 5 + EV_PRICE_PREMIUM,
    breakEvenMonths: breakEven.breakEvenMonths,
  }
})

export const metadata: Metadata = {
  title: 'EV vs Petrol/Diesel/CNG Cost Calculator 2026 — Running Cost & Break-Even',
  description:
    'Compare running costs across petrol, diesel, CNG and electric vehicles side by side, and find how many km it takes for an EV\'s price premium to pay for itself.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is cost per km calculated for each fuel type?',
    a: 'The same way regardless of fuel: price per unit (₹ per litre for petrol/diesel, ₹ per kg for CNG, ₹ per kWh for electricity) divided by mileage (km per unit). This lets you compare fundamentally different fuel types on one common ₹/km basis, then scale that up to a daily, monthly or annual budget based on how much you actually drive.',
  },
  {
    q: 'How is the EV break-even point calculated?',
    a: 'It divides the EV\'s price premium over the comparable petrol/diesel vehicle by the per-km running-cost savings (petrol cost/km minus EV cost/km). The result is the distance you need to drive before the EV\'s lower running cost fully offsets its higher upfront price — after that point, every additional km driven is a net saving versus the petrol alternative.',
  },
  {
    q: 'Does this break-even calculation include maintenance or resale value?',
    a: 'No — it\'s purely a running-cost (fuel/electricity) break-even. EVs typically have lower maintenance costs (fewer moving parts, no engine oil changes) which would shorten the real break-even further, while battery degradation and resale value uncertainty are separate factors this doesn\'t model. Treat this as the running-cost component of a larger EV-vs-petrol decision, not the complete picture.',
  },
  {
    q: 'How is this different from the Petrol/Diesel Cost Per KM Calculator?',
    a: 'That calculator handles one fuel type at a time — useful for a quick single-vehicle running-cost check. This one compares all four fuel types side by side and adds the EV break-even calculation, which is the more relevant question when you\'re actually deciding between an EV and a conventional vehicle.',
  },
  {
    q: 'Why do EVs use ₹/kWh and km/kWh instead of ₹/litre and km/litre?',
    a: 'Electric vehicles consume electricity, measured in kilowatt-hours (kWh), not litres — so their "mileage" is naturally expressed as km travelled per kWh of battery charge used, and their "fuel price" is your electricity tariff (which varies by state, time of charging, and whether you charge at home or a public station).',
  },
  {
    q: 'Should I use my home electricity tariff or a public charging station rate for the EV price?',
    a: 'Use whichever you\'ll actually rely on most — home charging (usually your regular residential electricity tariff) is typically much cheaper than public fast-charging stations, which often charge a premium per kWh. If you plan to mix both, use a blended average that reflects your realistic charging pattern.',
  },
  {
    q: 'Does charging speed (AC home charging vs DC fast charging) change the effective cost?',
    a: 'Yes — DC fast-charging stations typically bill at a materially higher ₹/kWh rate than slow AC home charging, partly reflecting the station\'s own higher equipment and demand costs. If you rely mostly on fast charging (frequent long trips, no home charging point), your real running cost will be closer to the fast-charging rate than the cheaper home-tariff figure many EV cost comparisons quote by default.',
  },
  {
    q: 'Does battery degradation affect the running cost over time?',
    a: 'Indirectly — as an EV battery ages, its usable capacity and real-world km-per-kWh efficiency both decline somewhat, meaning the same charge takes you slightly less distance after a few years than when new. This calculator uses a static mileage figure you enter, so re-check your EV\'s actual efficiency periodically rather than assuming day-one mileage holds for the vehicle\'s whole life.',
  },
  {
    q: 'Do EV subsidies or road-tax exemptions change the total cost of ownership beyond running cost?',
    a: 'Yes, substantially, and this calculator doesn\'t include them since they\'re state- and scheme-specific — many states waive or reduce road tax and registration fees for EVs, and central/state purchase subsidies can lower the upfront price directly. Our BH Series Calculator shows one example of this pattern nationally (EVs get the lowest tax slab at every price band); check your own state\'s current EV policy for the full upfront-cost picture.',
  },
  {
    q: 'Does this calculator include the cost of installing home charging?',
    a: 'No — a home charging point (the wall unit plus any electrical work) is a one-time setup cost this calculator treats as out of scope, since it varies by your home\'s existing electrical capacity and the charger you choose. Factor it in separately as part of the EV\'s effective price premium if you don\'t already have one installed.',
  },
  {
    q: 'How accurate is CNG as a comparison point against petrol and EV?',
    a: 'CNG typically costs less per km than petrol but more than an EV, and its "mileage" (km/kg) is genuinely comparable across vehicles the way petrol\'s km/litre is — but CNG availability is geographically uneven in India, and a CNG kit adds cost and some boot-space trade-off on a retrofit vehicle. Use your local CNG price and your vehicle\'s actual km/kg for an accurate comparison rather than a generic assumption.',
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
  name: 'EV vs Petrol/Diesel/CNG Cost Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'EV vs Fuel Cost Calculator', path: PATH },
])

export default function EvVsFuelCostCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'EV vs Fuel Cost Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⛽</span> Financial hub
          </>
        }
        h1="EV vs Petrol/Diesel/CNG Cost Calculator"
        subtitle="Compare running costs across all four fuel types side by side, and find exactly how many kilometres it takes for an EV's price premium to pay for itself."
        stats={[
          { icon: '🔀', big: '4-way', small: 'fuel comparison', tone: 'hub' },
          { icon: '📍', big: 'City prices', small: 'enter your own rates', tone: 'hub' },
          { icon: '🔋', big: 'EV break-even', small: 'in km and months', tone: 'hub' },
          { icon: '📆', big: 'Daily → annual', small: 'cost projection', tone: 'hub' },
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
            Driving 40 km/day, a petrol car at ₹100/litre and 18 km/litre costs ₹{petrolExample.costPerKm}/km
            (about {formatINR(petrolExample.annualCost)}/year), versus an EV at ₹8/kWh and 6 km/kWh at just
            ₹{evExample.costPerKm}/km ({formatINR(evExample.annualCost)}/year). If the EV costs{' '}
            {formatINR(500000)} more upfront, that premium pays for itself in about{' '}
            <strong>{breakEvenExample.breakEvenKm} km</strong> ({breakEvenExample.breakEvenMonths} months at
            this driving distance).
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Compare your fuel costs
          </h2>
          <EvVsFuelCostCalculator />
        </section>

        <section aria-labelledby="single-fuel" className="mb-10 scroll-mt-20">
          <h2 id="single-fuel" className="font-display mb-2 text-2xl font-semibold">
            Just need one fuel type?
          </h2>
          <p className="text-ash/80">
            If you only need a quick petrol, diesel or CNG running-cost check without the EV
            comparison, our simpler{' '}
            <Link href="/fuel-cost/petrol-diesel-cost-per-km-calculator" className="text-brass underline">
              Petrol/Diesel Cost Per KM Calculator
            </Link>{' '}
            handles one fuel type at a time.
          </p>
        </section>

        <section aria-labelledby="tco-table" className="mb-10 scroll-mt-20">
          <h2 id="tco-table" className="font-display mb-4 text-2xl font-semibold">
            5-year cost of ownership by how much you drive
          </h2>
          <p className="text-ash/80">
            The EV&apos;s {formatINR(EV_PRICE_PREMIUM)} price premium (versus a comparable
            petrol car) only pays for itself if you drive enough — here&apos;s the same petrol-vs-EV
            comparison at three daily-driving distances, each including the upfront premium:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Daily driving</th>
                  <th className="px-4 py-2 font-semibold">Petrol, 5yr total</th>
                  <th className="px-4 py-2 font-semibold">EV, 5yr total (incl. premium)</th>
                  <th className="px-4 py-2 font-semibold">EV break-even</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {totalCostOfOwnership.map((row) => (
                  <tr key={row.dailyKm} className={row.evFiveYear < row.petrolFiveYear ? 'font-bold text-ink-navy' : ''}>
                    <td className="px-4 py-2 font-medium">{row.dailyKm} km/day</td>
                    <td className="px-4 py-2">{formatINR(row.petrolFiveYear)}</td>
                    <td className="px-4 py-2">{formatINR(row.evFiveYear)}</td>
                    <td className="px-4 py-2">
                      {row.breakEvenMonths !== null ? `${row.breakEvenMonths} months` : 'No break-even'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ash/50">
            At low daily distances, 5 years often isn&apos;t enough to recover the price premium purely
            from running-cost savings — the calculator above lets you test your own numbers.
          </p>
        </section>

        <FinancialCrossSell current="ev-vs-fuel-cost-calculator" />

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
          <p className="mt-4 text-xs text-ash/40">
            Fuel prices, electricity tariffs and vehicle mileage vary by location and driving style. This tool is for illustration only and does not model maintenance costs or resale value.
          </p>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </main>
    </>
  )
}
