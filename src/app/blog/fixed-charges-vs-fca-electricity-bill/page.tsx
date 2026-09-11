import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/fixed-charges-vs-fca-electricity-bill'
const TITLE =
  'Why Does My Electricity Bill Change Every Month Even When I Use the Same Units? (Fixed Charges vs FCA Explained)'
const DESCRIPTION =
  'Same units, different bill? Two parts of your electricity bill never move with usage, and one moves on its own schedule. See the fixed charge, energy charge, FCA/FPPCA and electricity duty broken down.'
const LAST_VERIFIED = '11 September 2026'

export const metadata: Metadata = {
  title: 'Fixed Charge vs FCA vs Energy Charge — Why Your Bill Changes',
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
    q: 'Why did my electricity bill increase even though I used the same number of units?',
    a: "Your bill has parts that don't move with usage at all — the fixed charge and electricity duty — plus a fuel/power-purchase adjustment that changes on its own monthly or quarterly schedule based on the DISCOM's cost of buying power, not on how much you used.",
  },
  {
    q: 'What is FCA in an electricity bill?',
    a: "FCA (Fuel Cost Adjustment) is a variable line that passes through changes in your DISCOM's actual cost of buying power to consumers, since base tariffs are only revised periodically while power-purchase costs move monthly. It can increase or decrease your bill.",
  },
  {
    q: 'What is the difference between FAC, FCA, and FPPCA?',
    a: "They're the same underlying mechanism — a pass-through for the DISCOM's power-purchase cost — just named differently by different states and DISCOMs. FAC (Fuel Adjustment Charge), FCA (Fuel Cost Adjustment) and FPPCA/FPPA (Fuel and Power Purchase Cost Adjustment) all refer to this one line item.",
  },
  {
    q: 'What is the difference between a fixed charge and an energy charge?',
    a: 'The fixed charge is billed on your sanctioned load (kW/kVA) regardless of how much electricity you actually use. The energy charge is billed on the units you actually consume, slab by slab — this is the part a slab calculator estimates.',
  },
  {
    q: 'Can the fuel adjustment charge ever reduce my bill instead of increasing it?',
    a: "Yes. When a DISCOM's actual power-purchase cost comes in below what the tariff order assumed, the fuel/power-purchase adjustment can turn negative and appear as a credit on your bill, not just an added charge.",
  },
  {
    q: 'What is electricity duty, and is it different from a DISCOM charge?',
    a: "Electricity duty is a state government tax collected on your bill, not a charge the DISCOM sets or keeps. It's usually a percentage of your energy charge, and the exact rate depends on your state and connection category.",
  },
  {
    q: 'Can I get my fixed charge reduced?',
    a: "The fixed charge is based on your sanctioned load, so it stays the same regardless of consumption. If your sanctioned load is clearly oversized for your actual usage, you can request a load review through your DISCOM — this is an administrative process handled locally, not something a calculator can do for you.",
  },
  {
    q: "Why doesn't an online electricity bill calculator match my actual bill exactly?",
    a: "A slab-based calculator estimates the energy charge — the part driven by your consumption. Your real bill adds the fixed charge, the fuel/power-purchase adjustment and electricity duty on top, and the adjustment changes monthly, so it can't be predicted precisely in advance.",
  },
  {
    q: 'How often does the fuel/power-purchase adjustment change?',
    a: "It's reviewed and approved by the state regulator jointly with the DISCOM on a monthly or quarterly cycle, depending on the state — unlike the base tariff, which is usually revised only once a year or so.",
  },
  {
    q: 'Is the fuel adjustment charge the same across all states?',
    a: 'No. Every DISCOM buys power differently and reports a different actual cost, so the rate — and even the name used for this line — varies by state and DISCOM. Always check the specific line on your own bill.',
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

const namingRows: [string, string][] = [
  ['FAC (Fuel Adjustment Charge)', 'Same mechanism'],
  ['FCA (Fuel Cost Adjustment)', 'Same mechanism'],
  ['FPPCA / FPPA (Fuel and Power Purchase Cost Adjustment)', 'Same mechanism'],
  ['Power Purchase Cost Adjustment', 'Same mechanism (seen on some Delhi bills)'],
  ['Regulatory Adjustment / Fuel Surcharge', 'Same mechanism, older/alternate terminology'],
]

export default function FixedChargesVsFcaArticlePage() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'Fixed Charges vs FCA', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🧾</span> Explainer
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
          If your units barely changed but your bill didn&apos;t, it&apos;s almost never a
          mistake. Two parts of a typical Indian electricity bill — the{' '}
          <strong>fixed charge</strong> and <strong>electricity duty</strong> — don&apos;t
          move with your consumption at all, and a third part — a{' '}
          <strong>fuel or power-purchase adjustment</strong>, often shown as FCA, FAC or
          FPPCA — moves on its own monthly or quarterly schedule regardless of how many
          units you used. Only the energy charge, the part billed slab-wise on your actual
          consumption, tracks your usage directly.
        </p>

        <section aria-labelledby="anatomy" className="mt-10 scroll-mt-20">
          <h2 id="anatomy" className={h2Cls}>
            The Four Parts of Your Electricity Bill
          </h2>
          <p className={pCls}>
            Almost every Indian electricity bill is really four line items added
            together, not one number:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Component</th>
                  <th className="px-4 py-2 font-semibold">Based on</th>
                  <th className="px-4 py-2 font-semibold">Changes with your usage?</th>
                  <th className="px-4 py-2 font-semibold">Who sets it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Fixed / Demand Charge</td>
                  <td className="px-4 py-2">Sanctioned load (kW/kVA)</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">State regulator, per consumer category</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Energy Charge</td>
                  <td className="px-4 py-2">Actual units consumed, slab-wise</td>
                  <td className="px-4 py-2">
                    Yes — this is what a slab calculator estimates
                  </td>
                  <td className="px-4 py-2">State regulator, per consumer category</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Fuel/Power Purchase Adjustment</td>
                  <td className="px-4 py-2">
                    DISCOM&apos;s actual monthly power-purchase cost vs the cost assumed
                    in the tariff
                  </td>
                  <td className="px-4 py-2">
                    Partly — moves with the DISCOM&apos;s cost, not directly with your
                    usage
                  </td>
                  <td className="px-4 py-2">
                    Reviewed monthly/quarterly by the state regulator with the DISCOM
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Electricity Duty</td>
                  <td className="px-4 py-2">
                    A tax on the energy charge (rate varies by state/category)
                  </td>
                  <td className="px-4 py-2">
                    Indirectly, since it&apos;s a percentage of another charge
                  </td>
                  <td className="px-4 py-2">
                    State government — it&apos;s a tax, not a DISCOM charge
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: only one of these four moves in direct proportion to the units you
            used — the other three follow their own rules.
          </p>
        </section>

        <section aria-labelledby="fixed-charge" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charge" className={h2Cls}>
            Fixed Charge: The Part That Never Changes With Usage
          </h2>
          <p className={pCls}>
            The fixed (or demand) charge is billed on your <strong>sanctioned load</strong>
            — the maximum power draw approved for your connection — not on how much
            electricity you actually consumed that month. It appears identically on your
            bill even in a month of unusually low usage, because it&apos;s recovering the
            DISCOM&apos;s cost of keeping the connection and infrastructure ready for you,
            not the cost of the power itself.
          </p>
          <p className={`mt-3 ${pCls}`}>
            As an illustration only (actual fixed-charge rates vary widely by state and
            connection category), one board&apos;s domestic tariff structures this as
            roughly ₹60/kW for the first 1 kW of sanctioned load and ₹70/kW for the
            remainder — a flat monthly amount that doesn&apos;t care whether you used 50
            units or 500 that month.
          </p>
          <p className={takeawayCls}>
            Takeaway: your fixed charge is set by your connection&apos;s sanctioned load,
            not your meter reading — it&apos;s the same whether you&apos;re home all month
            or away.
          </p>
        </section>

        <section aria-labelledby="energy-charge" className="mt-10 scroll-mt-20">
          <h2 id="energy-charge" className={h2Cls}>
            Energy Charge: The Part Your Slab Calculator Estimates
          </h2>
          <p className={pCls}>
            The energy charge is the only component billed directly on your actual
            consumption. Most Indian DISCOMs bill domestic connections using{' '}
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="text-brass underline"
            >
              telescopic slabs
            </Link>{' '}
            — tiered per-unit rates where each slab is priced separately, so only the
            units that fall inside a higher slab cost more, not your whole bill.
          </p>
          <p className={`mt-3 ${pCls}`}>
            This is exactly the part our{' '}
            <Link href="/electricity" className="text-brass underline">
              state-by-state electricity bill calculators
            </Link>{' '}
            are built to estimate precisely, using each DISCOM&apos;s own published
            slabs — for example{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (Maharashtra)
            </Link>{' '}
            or{' '}
            <Link href="/electricity/tneb-bill-calculator" className="text-brass underline">
              TNEB (Tamil Nadu)
            </Link>
            . But a slab calculator estimates this one component — the fixed charge, the
            fuel adjustment and electricity duty sit on top of it, and aren&apos;t fully
            predictable in advance since the fuel adjustment changes monthly and
            isn&apos;t published far ahead.
          </p>
          <p className={takeawayCls}>
            Takeaway: if your calculator estimate looks close but not exact, that&apos;s
            expected — it&apos;s pricing the energy charge, not the other three line
            items.
          </p>
        </section>

        <section aria-labelledby="naming" className="mt-10 scroll-mt-20">
          <h2 id="naming" className={h2Cls}>
            &ldquo;FCA, FAC, FPPCA, Power Purchase Cost Adjustment&rdquo; — Same Thing,
            Different Names
          </h2>
          <p className={pCls}>
            Base tariffs are set periodically — often once a year — by each state&apos;s
            electricity regulatory commission. But the DISCOM&apos;s actual cost of buying
            power (coal, gas, market purchases) moves every month. Rather than reopen the
            whole tariff order monthly, regulators let DISCOMs pass this cost gap through
            as a separate line, reviewed and approved on a monthly or quarterly cycle
            depending on the state. Different states and DISCOMs simply call this line by
            different names:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Name you might see on your bill</th>
                  <th className="px-4 py-2 font-semibold">What it means</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {namingRows.map(([name, meaning]) => (
                  <tr key={name}>
                    <td className="px-4 py-2 font-medium">{name}</td>
                    <td className="px-4 py-2">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            This line isn&apos;t always positive. When a DISCOM&apos;s actual
            power-purchase cost comes in <em>below</em> what the tariff order assumed, the
            adjustment can turn negative and appear as a credit that reduces your bill —
            not just an add-on charge. Some states also cap how large this adjustment can
            get in a single cycle, as a safeguard against a very large pass-through
            landing on customers all at once.
          </p>
          <p className={takeawayCls}>
            Takeaway: FCA, FAC and FPPCA are the same mechanism wearing different labels —
            check the exact line on your own bill rather than assuming it matches a
            neighbour&apos;s state.
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            Electricity Duty: The Part That&apos;s Actually a Tax, Not a DISCOM Charge
          </h2>
          <p className={pCls}>
            Electricity duty is collected on your bill but paid to the{' '}
            <strong>state government</strong>, not kept by the DISCOM — so it&apos;s not
            something your DISCOM can waive or discount. It&apos;s usually charged as a
            percentage of your energy charge, and the rate is set per state and often per
            connection category.
          </p>
          <p className={`mt-3 ${pCls}`}>
            The rate genuinely varies: Tamil Nadu&apos;s TNEB, for instance, charges 0%
            electricity duty on residential connections but 5% on commercial and
            industrial ones — the same DISCOM, two different duty rates depending on your
            connection category. That kind of category-specific split is exactly why a
            duty percentage from one state (or even one connection type) shouldn&apos;t be
            assumed to apply to another.
          </p>
          <p className={takeawayCls}>
            Takeaway: if a bill looks high specifically because of the duty line,
            that&apos;s a state tax rate applying to your category — not a DISCOM markup.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Worked Example: Same Units, Different Bill
          </h2>
          <p className={pCls}>
            Here&apos;s an <strong>illustrative</strong> two-month comparison showing how
            a bill can move even when consumption barely does:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">This month</th>
                  <th className="px-4 py-2 font-semibold">Last month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Units consumed</td>
                  <td className="px-4 py-2">200</td>
                  <td className="px-4 py-2">198</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Energy charge (slab-based)</td>
                  <td className="px-4 py-2">~same</td>
                  <td className="px-4 py-2">~same</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Fixed charge</td>
                  <td className="px-4 py-2">Same (sanctioned load unchanged)</td>
                  <td className="px-4 py-2">Same</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">
                    Fuel/power-purchase adjustment
                  </td>
                  <td className="px-4 py-2">
                    Higher (DISCOM&apos;s power-purchase cost rose that month)
                  </td>
                  <td className="px-4 py-2">Lower</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2 font-semibold text-ink-navy">Result</td>
                  <td className="px-4 py-2 font-semibold text-ink-navy" colSpan={2}>
                    Total bill is higher this month, despite nearly identical units
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            Nothing about this consumer&apos;s usage habits changed. The entire difference
            came from a line that moves independently of consumption — which is exactly
            why comparing only your units, month to month, doesn&apos;t explain the whole
            bill.
          </p>
          <p className={takeawayCls}>
            Takeaway: before assuming a billing error, check whether the fuel/power-purchase
            adjustment line itself moved — that&apos;s the most common reason units stay
            flat but the total doesn&apos;t.
          </p>
        </section>

        <section aria-labelledby="reduce" className="mt-10 scroll-mt-20">
          <h2 id="reduce" className={h2Cls}>
            Can You Actually Reduce Any of This?
          </h2>
          <ul className="mt-1 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>
                ✓
              </span>
              <span className={pCls}>
                <strong className="text-ink-navy">Energy charge</strong> — the only
                component you control day to day. Using fewer units, or staying below your
                next slab threshold, directly lowers this line. See{' '}
                <Link
                  href="/blog/how-telescopic-electricity-slabs-work"
                  className="text-brass underline"
                >
                  how telescopic slabs work
                </Link>{' '}
                to understand exactly where your next threshold is.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>
                ✓
              </span>
              <span className={pCls}>
                <strong className="text-ink-navy">Fixed charge</strong> — possible, but
                only if your sanctioned load is clearly oversized for your actual usage.
                You can request a review of your sanctioned load, but that process is
                handled directly through your DISCOM and depends on your local rules — not
                something a calculator can action for you.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-ash/40" aria-hidden>
                –
              </span>
              <span className={pCls}>
                <strong className="text-ink-navy">Fuel/power-purchase adjustment and
                electricity duty</strong> — not controllable by you as a consumer. The
                first tracks the DISCOM&apos;s power-purchase cost; the second is a state
                tax rate. Neither responds to how carefully you use electricity.
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            Takeaway: real savings come from the energy charge — that&apos;s also the one
            part a slab calculator can help you plan around in advance.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How telescopic electricity slabs work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                A deeper look at the energy-charge portion of your bill.
              </p>
            </Link>
            <Link
              href="/blog/mahavitaran-bill-kaise-check-kare"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Mahavitaran (MSEDCL) bill guide
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Checking and paying your Maharashtra electricity bill online.
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
          Last verified: {LAST_VERIFIED}. Naming conventions and illustrative examples
          above are general/cross-DISCOM and may not match your specific board — utilities
          occasionally rename these line items. Always confirm current rates and exact
          terminology against your own bill or your{' '}
          <Link href="/methodology" className="text-brass underline">
            DISCOM&apos;s current tariff order
          </Link>
          .
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
