import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import NcbIdvCalculator from '@/components/calculators/NcbIdvCalculator'
import { calculateNcbIdv } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/ncb-idv-calculator'

const example = calculateNcbIdv(1000000, 18, 12000, 3)

export const metadata: Metadata = {
  title: 'NCB & IDV Calculator 2026 — Motor Insurance No-Claim Bonus (India)',
  description:
    'Free No-Claim Bonus (NCB) and Insured Declared Value (IDV) calculator for India. Find your motor insurance discount and vehicle IDV using IRDAI\'s standard slabs.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'What is No-Claim Bonus (NCB), and is it the same for every insurer?',
    a: 'NCB is a discount on your own-damage (OD) premium for each consecutive year you don\'t make a claim — 20% after 1 year, rising to 25%, 35%, 45%, and capping at 50% from 5 years onward. This slab structure is standardised by IRDAI, so every motor insurer in India must follow the same percentages; NCB is one of the few things that\'s genuinely identical across insurers.',
  },
  {
    q: 'What happens to my NCB if I make a claim?',
    a: 'A single claim resets your NCB to zero, regardless of how many consecutive claim-free years you\'d built up — this is why insurers offer an optional "NCB protection" add-on, which lets you make one or two claims a year without losing your accumulated NCB, at an extra premium cost.',
  },
  {
    q: 'Can I transfer my NCB to a new car or a new insurer?',
    a: 'Yes — NCB belongs to you as the policyholder, not to the specific vehicle or insurer, so it transfers when you buy a new car or switch insurers, as long as you provide proof of your NCB (typically a certificate from your previous insurer).',
  },
  {
    q: 'What is Insured Declared Value (IDV), and why does it fall so fast in the first year?',
    a: 'IDV is the maximum amount your insurer will pay if your vehicle is stolen or damaged beyond repair — essentially the vehicle\'s current market value for insurance purposes. It drops 5% almost immediately (within 6 months) and 15% by the end of year one, following an IRDAI-standardised depreciation schedule, reflecting how quickly a new vehicle loses value.',
  },
  {
    q: 'Does a lower IDV mean a lower premium?',
    a: 'Yes — since IDV is the maximum payout for a total loss, a lower IDV generally means a lower own-damage premium (less liability for the insurer), but it also means less compensation if your car is stolen or totalled. Some insurers let you declare a higher-than-standard IDV for an extra premium if you want stronger total-loss protection.',
  },
  {
    q: 'What determines my IDV once the vehicle is more than 5 years old?',
    a: 'Beyond 5 years, there\'s no fixed IRDAI depreciation percentage — the IDV is set by mutual agreement between you and your insurer at renewal time, usually based on the vehicle\'s actual condition and prevailing market value for similar used vehicles.',
  },
  {
    q: 'What is an NCB protection add-on, and is it worth the extra cost?',
    a: 'It\'s an optional rider that lets you make one or two claims in a policy year without your accumulated NCB resetting to zero, for an additional premium. It\'s worth considering once your NCB has built up to a high slab (35% or more) — the value of protecting several years of accumulated discount usually outweighs the add-on\'s modest annual cost, whereas it adds little in your first claim-free year when you have nothing to protect yet.',
  },
  {
    q: 'What happens to my NCB if my policy lapses before I renew?',
    a: 'Insurers give a grace period of up to 90 days after policy expiry during which your accumulated NCB stays intact if you renew within that window — though the vehicle itself is uninsured (and illegal to drive) during the gap. Renew after the 90-day window closes and your NCB is cancelled entirely, resetting you to 0% regardless of how many claim-free years you\'d built up.',
  },
  {
    q: 'How does IDV affect a total-loss claim differently from a repair claim?',
    a: 'For a repairable damage claim, the insurer pays for parts and labour up to the IDV as an overall ceiling, with depreciation deducted per part unless you hold a zero-depreciation add-on. For a total loss (theft, or damage beyond economical repair), the IDV IS the payout — a fixed, pre-agreed amount rather than a claim-by-claim calculation — which is why declaring an artificially low IDV to save on premium directly shrinks what you\'d receive in the worst-case scenario.',
  },
  {
    q: 'Do NCB and IDV affect each other?',
    a: 'No — they\'re independent inputs that both feed into your final premium separately. NCB is a percentage discount applied to your own-damage premium based on your claim history; IDV sets the base sum insured that premium is calculated against in the first place. A high NCB on a high-IDV vehicle and a high NCB on a low-IDV vehicle produce very different rupee discounts even at the identical NCB percentage.',
  },
  {
    q: 'What is zero-depreciation cover, and how is it different from IDV depreciation?',
    a: 'IDV depreciation (this calculator\'s second table) reduces the vehicle\'s OVERALL insured value as it ages. Zero-depreciation (or "bumper-to-bumper") cover is a separate add-on that stops the insurer deducting PART-WISE depreciation when settling an individual repair claim — without it, plastic and fibre parts can see 50%+ depreciation deducted from a claim payout even on a fairly new car. The two are unrelated: you can have zero-dep cover and still see your overall IDV decline every year.',
  },
  {
    q: 'Can I declare a higher IDV than the standard depreciation schedule gives?',
    a: 'Most insurers allow declaring an IDV within a band around the standard depreciated value (commonly ±5-10%), for a correspondingly adjusted premium — useful if you\'ve added expensive accessories or believe the standard schedule understates your vehicle\'s real condition. Declaring above the permitted band isn\'t accepted; insurers won\'t let IDV become a way to over-insure the vehicle.',
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
  name: 'NCB & IDV Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'NCB & IDV Calculator', path: PATH },
])

export default function NcbIdvCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'NCB & IDV Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🚘</span> Financial hub
          </>
        }
        h1="NCB & IDV Calculator"
        subtitle="Find your No-Claim Bonus discount and your vehicle's Insured Declared Value, using IRDAI's standardised slabs — identical across every Indian motor insurer."
        stats={[
          { icon: '🎁', big: '20% – 50%', small: 'NCB slabs by year', tone: 'hub' },
          { icon: '📉', big: '5% – 50%', small: 'IDV depreciation by age', tone: 'hub' },
          { icon: '📜', big: 'IRDAI', small: 'standardised, not insurer-specific', tone: 'hub' },
          { icon: '🆓', big: 'Free', small: 'no login', tone: 'hub' },
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
            A car with a {formatINR(1000000)} listed price, 18 months old, with 3 consecutive
            claim-free years and a {formatINR(12000)} OD premium, gets a{' '}
            <strong>{example.ncbPercent}% NCB discount</strong> ({formatINR(example.ncbDiscountAmount)}{' '}
            off, bringing the OD premium to {formatINR(example.odPremiumAfterNcb)}), on a vehicle
            with an IDV of <strong>{formatINR(example.idv)}</strong> after {example.idvDepreciationPercent}%
            standard depreciation.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your NCB & IDV
          </h2>
          <NcbIdvCalculator />
        </section>

        <section aria-labelledby="slabs" className="mb-10 scroll-mt-20">
          <h2 id="slabs" className="font-display mb-4 text-2xl font-semibold">
            IRDAI&apos;s standard NCB and IDV depreciation slabs
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-x-auto rounded-xl border border-hairline">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hairline bg-mist text-ink-navy">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Claim-free years</th>
                    <th className="px-4 py-2 font-semibold">NCB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {[['1', '20%'], ['2', '25%'], ['3', '35%'], ['4', '45%'], ['5+', '50% (capped)']].map(([y, p]) => (
                    <tr key={y}>
                      <td className="px-4 py-2 font-medium">{y}</td>
                      <td className="px-4 py-2">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto rounded-xl border border-hairline">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hairline bg-mist text-ink-navy">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Vehicle age</th>
                    <th className="px-4 py-2 font-semibold">Depreciation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {[['≤ 6 months', '5%'], ['6-12 months', '15%'], ['1-2 years', '20%'], ['2-3 years', '30%'], ['3-4 years', '40%'], ['4-5 years', '50%']].map(([a, p]) => (
                    <tr key={a}>
                      <td className="px-4 py-2 font-medium">{a}</td>
                      <td className="px-4 py-2">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section aria-labelledby="protect-ncb" className="mb-10 scroll-mt-20">
          <h2 id="protect-ncb" className="font-display mb-4 text-2xl font-semibold">
            Four ways to protect your accumulated NCB
          </h2>
          <p className="text-ash/80">
            A single claim wipes out every year of accumulated discount, so protecting it is worth
            more the longer you&apos;ve gone claim-free:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Pay small repairs out of pocket', 'a minor dent or scratch repair often costs less than the NCB you\'d lose by filing a claim for it — do the maths before claiming on anything below a few thousand rupees.'],
              ['Add NCB protection once your slab is high', 'the add-on costs the same whether your NCB is 20% or 50%, but protects far more value at the higher slabs — add it once you\'re past the 35-45% mark.'],
              ['Renew before the 90-day grace window closes', 'a lapsed renewal outside this window cancels your NCB entirely, even if you never made a claim.'],
              ['Carry your NCB certificate when switching insurers or vehicles', 'request it from your outgoing insurer at renewal time so your new policy starts at your true accumulated percentage, not zero.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <FinancialCrossSell current="ncb-idv-calculator" />

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
            This tool provides estimates for illustration only. Actual premium quotes depend on your insurer, vehicle model and other underwriting factors — this is not an insurance quote.
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
