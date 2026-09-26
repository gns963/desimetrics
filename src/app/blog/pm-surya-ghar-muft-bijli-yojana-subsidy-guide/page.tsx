import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide'
const TITLE =
  'PM Surya Ghar Muft Bijli Yojana: Full Subsidy Guide (₹78,000, Eligibility, How to Apply) — 2026'
const DESCRIPTION =
  'PM Surya Ghar Muft Bijli Yojana explained: subsidy amounts up to ₹78,000, who is eligible, documents needed, how to apply, common rejection reasons — and what it actually means for your bill.'
const LAST_VERIFIED = '11 September 2026'

export const metadata: Metadata = {
  title: 'PM Surya Ghar Subsidy Guide 2026 — ₹78,000, Eligibility & Apply',
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
    q: 'What is PM Surya Ghar Muft Bijli Yojana?',
    a: "It's the central government's rooftop solar scheme, launched in February 2024 by the Ministry of New and Renewable Energy (MNRE), offering a subsidy of up to ₹78,000 to help households install solar panels and cut their electricity bills — implemented through state DISCOMs and applied for at pmsuryaghar.gov.in.",
  },
  {
    q: 'Is "Muft Bijli Yojana" the same scheme as PM Surya Ghar?',
    a: 'Yes. "PM Surya Ghar," "Muft Bijli Yojana" and "Free Bijli Yojana" are all colloquial short names people use for the same scheme — the full official name is Pradhan Mantri Surya Ghar: Muft Bijli Yojana. There is no separate scheme by any of these other names.',
  },
  {
    q: 'How much subsidy can I get under PM Surya Ghar?',
    a: "₹30,000 per kW for the first 2 kW (₹30,000 for a 1 kW system, ₹60,000 for 2 kW), plus ₹18,000 for the 3rd kW. A 3 kW system or larger gets the full capped amount of ₹78,000 — no additional central subsidy beyond that, regardless of system size.",
  },
  {
    q: 'Am I eligible for the PM Surya Ghar subsidy?',
    a: 'You need to be an Indian citizen with a residential electricity connection in your own name, and a roof suitable for solar. Your sanctioned load is commonly required to be within a threshold (often cited as 10 kW), and your proposed system can\'t exceed your sanctioned DISCOM load.',
  },
  {
    q: 'What documents do I need to apply?',
    a: 'Typically: Aadhaar card, your latest electricity bill (connection must be in your name), a bank passbook or cancelled cheque for the subsidy transfer, roof ownership proof (property tax receipt, registry, or an NOC if you\'re a tenant), and a recent photograph.',
  },
  {
    q: 'How long does it take to receive the subsidy after applying?',
    a: 'Commonly cited timelines range from about 30–45 days for the subsidy transfer itself, up to 45–90 days for the full process from application through DISCOM inspection, grid commissioning and disbursement. Treat these as typical ranges, not guarantees — delays happen.',
  },
  {
    q: 'Why do PM Surya Ghar applications commonly get rejected?',
    a: 'The most frequently cited reasons are: using solar panels not on the ALMM (Approved List of Models and Manufacturers), an Aadhaar-linked bank account that isn\'t properly seeded for DBT, and proposing a system size larger than your sanctioned DISCOM load.',
  },
  {
    q: 'Does PM Surya Ghar really give 300 units of free electricity every month?',
    a: 'That figure is a design estimate: a roughly 3 kW system is sized to generate around 300 units a month for an average household, which can offset a typical bill to near zero. Your actual generation depends on your roof\'s sun exposure, shading, system size and location — it isn\'t a guaranteed number for every home.',
  },
  {
    q: 'Can tenants apply for PM Surya Ghar?',
    a: "It's difficult in practice. The electricity connection and roof ownership proof are usually required in the applicant's name, though a tenant can apply with the property owner's NOC. Subsidy and net-metering paperwork are generally easiest when the applicant is the homeowner.",
  },
  {
    q: 'How do I apply for PM Surya Ghar online?',
    a: 'Register on the national portal, pmsuryaghar.gov.in, with your state, DISCOM and electricity consumer number, then follow the on-screen steps: feasibility approval, choosing an MNRE-empanelled vendor, installation, DISCOM inspection, net-meter commissioning, and finally submitting your bank details for the subsidy.',
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

const subsidyRows: [string, string][] = [
  ['1 kW', '₹30,000'],
  ['2 kW', '₹60,000'],
  ['3 kW or larger', '₹78,000 (capped — no additional subsidy beyond this regardless of size)'],
]

const documentRows: [string, string][] = [
  ['Aadhaar card', 'Applicant identity verification'],
  ['Latest electricity bill', "Connection must be in the applicant's name"],
  ['Bank passbook / cancelled cheque', 'Subsidy disbursement via Direct Benefit Transfer (DBT)'],
  [
    'Roof ownership proof',
    'Property tax receipt or registry, or an NOC from the owner if the applicant is a tenant',
  ],
  ['Recent photograph', 'Application requirement'],
]

const workedExample: [string, string][] = [
  ['System size chosen', '3 kW'],
  [
    'Approximate system cost before subsidy',
    'Varies by vendor, panel brand and state — get quotes from MNRE-empanelled installers',
  ],
  ['Central subsidy', '₹78,000'],
  ['Net upfront cost', 'System cost minus ₹78,000'],
  [
    'Monthly bill offset',
    "Depends on your actual generation and your state's tariff structure",
  ],
]

export default function PmSuryaGharArticlePage() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: 'PM Surya Ghar', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Government Scheme
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
          <strong>PM Surya Ghar: Muft Bijli Yojana</strong> — also called &ldquo;Muft
          Bijli Yojana&rdquo; or &ldquo;Free Bijli Yojana&rdquo; in everyday searches,
          all names for the same central government scheme — is India&apos;s rooftop
          solar subsidy program, launched in February 2024 by the Ministry of New and
          Renewable Energy (MNRE). It pays a central subsidy of{' '}
          <strong>₹30,000 per kW for the first 2 kW</strong>, plus{' '}
          <strong>₹18,000 for the 3rd kW</strong>, capped at a maximum of{' '}
          <strong>₹78,000</strong> for a 3 kW system or larger. The scheme is designed
          so a roughly 3 kW system can offset around 300 units of monthly usage for an
          average household — but what it&apos;s actually worth to you depends
          entirely on your own state&apos;s tariff and your own consumption, which is
          exactly what this guide (and our calculator) will help you work out.
        </p>

        <section aria-labelledby="subsidy" className="mt-10 scroll-mt-20">
          <h2 id="subsidy" className={h2Cls}>
            How Much Subsidy Can You Actually Get?
          </h2>
          <p className={pCls}>
            The central subsidy scales with system size up to a hard cap. Here&apos;s
            the exact slab:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">System size</th>
                  <th className="px-4 py-2 font-semibold">Central subsidy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {subsidyRows.map(([size, amount]) => (
                  <tr key={size}>
                    <td className="px-4 py-2 font-medium">{size}</td>
                    <td className="px-4 py-2 font-display font-bold text-hub-solar">
                      {amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            Some state governments add their own top-up subsidy on top of this central
            amount. This isn&apos;t universal, and the exact figure (where one exists)
            varies by state — check your state renewable energy department&apos;s
            current notification rather than assuming a top-up applies to you. Use our{' '}
            <Link href="/solar/subsidy-calculator" className="text-brass underline">
              PM Surya Ghar subsidy calculator
            </Link>{' '}
            to check the central amount you&apos;re eligible for.
          </p>
          <p className={takeawayCls}>
            Takeaway: ₹78,000 is a cap, not a starting point — it only applies at 3 kW
            or above, and a smaller system gets proportionally less.
          </p>
        </section>

        <section aria-labelledby="naming" className="mt-10 scroll-mt-20">
          <h2 id="naming" className={h2Cls}>
            &ldquo;Muft Bijli Yojana,&rdquo; &ldquo;Free Bijli Yojana,&rdquo; &ldquo;PM
            Surya Ghar&rdquo; — Is This All the Same Scheme?
          </h2>
          <p className={pCls}>
            Yes — these are not different schemes. <strong>Pradhan Mantri Surya Ghar:
            Muft Bijli Yojana</strong> is the full official name; &ldquo;Muft Bijli
            Yojana&rdquo; and &ldquo;Free Bijli Yojana&rdquo; are simply the
            colloquial, shortened ways people refer to it in everyday conversation and
            search. If you&apos;ve seen any of these names separately, you&apos;re
            looking at the same central subsidy, the same ₹78,000 cap, and the same
            application portal.
          </p>
          <p className={`mt-3 ${pCls}`}>
            The scheme was approved by the Union Cabinet on 29 February 2024, with an
            outlay of ₹75,021 crore, targeting rooftop solar for one crore (10 million)
            residential households.
          </p>
          <p className={takeawayCls}>
            Takeaway: whichever name brought you here, you&apos;re in the right place —
            there&apos;s only one scheme, one subsidy structure, and one portal.
          </p>
        </section>

        <section aria-labelledby="eligibility" className="mt-10 scroll-mt-20">
          <h2 id="eligibility" className={h2Cls}>
            Are You Eligible for PM Surya Ghar?
          </h2>
          <p className={pCls}>
            The core eligibility is broad and demand-driven — available across India,
            including rural households, as long as you have a grid-connected DISCOM
            connection. The main checks are:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'You are an Indian citizen with a residential electricity connection.',
              "The connection is in your own name, and you have a roof suitable for solar installation.",
              "Your sanctioned load is generally required to be at or below a threshold commonly cited as 10 kW — this can vary by DISCOM, so confirm your own limit.",
              "Your proposed solar system size doesn't exceed your sanctioned DISCOM load — an oversized proposal needs a separate load-enhancement application first.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-solar" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>{t}</span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: the sanctioned-load ceiling is the eligibility detail people miss
            most often — check your own bill before assuming your system size qualifies.
          </p>
        </section>

        <section aria-labelledby="documents" className="mt-10 scroll-mt-20">
          <h2 id="documents" className={h2Cls}>
            What Documents Do You Need to Apply?
          </h2>
          <p className={pCls}>
            Have these ready before you start the online application:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Document</th>
                  <th className="px-4 py-2 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {documentRows.map(([doc, purpose]) => (
                  <tr key={doc}>
                    <td className="px-4 py-2 font-medium">{doc}</td>
                    <td className="px-4 py-2">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: the bank account tied to your Aadhaar must be DBT-seeded — this
            single detail causes a large share of subsidy-disbursement delays.
          </p>
        </section>

        <section aria-labelledby="how-to-apply" className="mt-10 scroll-mt-20">
          <h2 id="how-to-apply" className={h2Cls}>
            How to Apply for PM Surya Ghar, Step by Step
          </h2>
          <p className={pCls}>
            Applications go through the official national portal,{' '}
            <a
              href="https://pmsuryaghar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              pmsuryaghar.gov.in
            </a>
            . The exact screens change over time, but the general path is consistent:
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'Register on the portal with your state, DISCOM and electricity consumer number.',
              'Apply for rooftop solar and receive feasibility approval from your DISCOM.',
              'Choose an MNRE-empanelled vendor and get your system installed.',
              'Submit the plant details and apply for a net meter.',
              'After DISCOM inspection and net-meter commissioning, the portal generates a commissioning certificate.',
              'Submit your bank account details through the portal — the subsidy is credited via Direct Benefit Transfer (DBT) after this step.',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-solar font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={takeawayCls}>
            Takeaway: the subsidy is the last step, not the first — it only lands after
            installation, inspection and net-meter commissioning are complete.
          </p>
        </section>

        <section aria-labelledby="rejections" className="mt-10 scroll-mt-20">
          <h2 id="rejections" className={h2Cls}>
            Why Do PM Surya Ghar Applications Commonly Get Rejected?
          </h2>
          <p className={pCls}>
            Most rejections trace back to one of three avoidable issues:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'Non-ALMM panels',
                "installation must use panels on the government's Approved List of Models and Manufacturers (ALMM) — non-ALMM panels fail inspection and forfeit the subsidy. This is the single most commonly cited cause of rejected claims.",
              ],
              [
                'Un-seeded Aadhaar-bank linkage',
                'if your bank account isn\'t properly seeded to your Aadhaar for Direct Benefit Transfer, the subsidy payment itself can fail even after everything else is approved.',
              ],
              [
                'System size exceeds sanctioned load',
                'proposing a system larger than your sanctioned DISCOM load gets flagged — you would need a load-enhancement application approved first.',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-caution-amber" aria-hidden>
                  ✕
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: confirm your vendor is MNRE-empanelled and using ALMM panels
            before installation, not after — it&apos;s far harder to fix retroactively.
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            Is It Actually Worth It? A Worked Example
          </h2>
          <p className={pCls}>
            Most guides stop at &ldquo;you get free electricity and a subsidy.&rdquo;
            The honest version is that what this is actually worth to you depends on
            your own system cost, your own state&apos;s electricity tariff, and your
            own consumption — here&apos;s the shape of that calculation:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample.map(([label, value]) => (
                  <tr key={label}>
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td className="px-4 py-2.5 text-right text-ink-navy">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            Notice what&apos;s deliberately left blank: system cost and monthly
            savings. Neither has one honest national number — your installer&apos;s
            quote and your DISCOM&apos;s tariff decide both. Run this exact worked
            example with your real numbers on our{' '}
            <Link href="/solar/roi-calculator" className="text-brass underline">
              solar ROI calculator
            </Link>{' '}
            to get your actual net cost and payback estimate, priced on your own
            state&apos;s tariff.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Since &ldquo;how much you save&rdquo; is really a function of your{' '}
            <Link href="/electricity" className="text-brass underline">
              state electricity tariff
            </Link>
            , check your own DISCOM&apos;s rates first — for example{' '}
            <Link href="/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM (Karnataka)
            </Link>{' '}
            or{' '}
            <Link href="/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (Maharashtra)
            </Link>
            , then use{' '}
            <Link href="/solar/net-metering-calculator" className="text-brass underline">
              net metering
            </Link>{' '}
            rules for your state to see how surplus export is credited.
          </p>
          <p className={takeawayCls}>
            Takeaway: the subsidy amount is fixed nationally, but your actual payback
            is not — it&apos;s only as good as the tariff and consumption numbers you
            plug in.
          </p>
        </section>

        <section aria-labelledby="progress" className="mt-10 scroll-mt-20">
          <h2 id="progress" className={h2Cls}>
            How Many Households Have Actually Installed So Far?
          </h2>
          <p className={pCls}>
            Progress figures are reported frequently and vary slightly by source and
            date. As of <strong>22 July 2026</strong>, DISCOM reporting put installed
            systems at roughly <strong>39.72 lakh</strong> nationally, benefiting more
            than <strong>48 lakh households</strong>, with over{' '}
            <strong>18.93 lakh beneficiaries</strong> reporting a zero electricity bill
            in at least one billing period. A separate figure, dated{' '}
            <strong>18 July 2026</strong>, cites <strong>47.26 lakh</strong> households
            solarised, with an interim government target of{' '}
            <strong>75 lakh by December 2026</strong> on the way to the ultimate
            one-crore goal.
          </p>
          <p className={`mt-3 ${pCls}`}>
            These are dated snapshots, not live counters — treat the specific figure as
            roughly indicative of scale rather than precise, and check{' '}
            <a
              href="https://pmsuryaghar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              pmsuryaghar.gov.in
            </a>{' '}
            directly if the current count matters for your decision.
          </p>
          <p className={takeawayCls}>
            Takeaway: tens of lakhs of households have already gone through this exact
            process — rejections are avoidable, not the norm.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/solar/subsidy-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💸
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PM Surya Ghar subsidy calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Check your exact eligibility and subsidy amount.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Solar ROI calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Your real payback and 25-year savings, priced on your DISCOM.
              </p>
            </Link>
            <Link
              href="/blog/is-rooftop-solar-worth-it-in-india-2026"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Is rooftop solar worth it in India in 2026?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The broader cost, payback and pros/cons decision.
              </p>
            </Link>
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How telescopic electricity slabs work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Why solar offsets your most expensive units first.
              </p>
            </Link>
            <Link
              href="/blog/net-metering-explained-india"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🔌
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Net metering explained
              </p>
              <p className="mt-1 text-xs text-ash/60">
                How exported solar units actually get credited to your bill.
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
          Last verified: {LAST_VERIFIED}. Installation-progress statistics, the
          sanctioned-load threshold, and disbursement timelines move the fastest of
          anything in this guide — confirm current figures on{' '}
          <a
            href="https://pmsuryaghar.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            pmsuryaghar.gov.in
          </a>{' '}
          and with your state DISCOM before deciding. See our{' '}
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
