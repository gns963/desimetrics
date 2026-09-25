import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import NpsCalculator from '@/components/calculators/NpsCalculator'
import { calculateNps } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/nps-calculator'

const example = calculateNps(10000, 10, 25, 'other')

export const metadata: Metadata = {
  title: 'NPS Calculator 2026 — National Pension System Corpus & Withdrawal',
  description:
    'Free NPS calculator for India. Project your National Pension System corpus at retirement and see the lump sum vs annuity split under the revised 2026 PFRDA withdrawal rules.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'How is my NPS corpus calculated?',
    a: 'Like a SIP, using the future-value-of-a-monthly-annuity formula on your contributions and an assumed rate of return. Since NPS is market-linked (invested across equity, corporate bonds and government securities in a mix you choose), actual returns fluctuate — this calculator lets you set your own assumed rate to model different scenarios rather than promising a fixed outcome.',
  },
  {
    q: 'How much of my NPS corpus can I withdraw as a lump sum at retirement?',
    a: 'This changed materially in 2026: following PFRDA amendments, non-government subscribers can now withdraw up to 80% of their corpus as a lump sum (up from 60% previously), with only 20% mandatorily going into an annuity. Government-sector subscribers still follow the older 60% lump sum / 40% annuity split. If your total corpus is ₹8 lakh or less, you can withdraw the entire amount as a lump sum regardless of subscriber type; between ₹8-12 lakh, up to ₹6 lakh can be taken as lump sum.',
  },
  {
    q: 'Is the entire lump sum withdrawal tax-free?',
    a: 'No — only 60% of your total corpus is tax-free under Section 10(12A), regardless of how much you actually withdraw as lump sum. Since the 2026 rules now let non-government subscribers take up to 80% as lump sum, the extra 20% (the amount between 60% and 80% of the corpus) is taxable at your income-tax slab rate in the year you withdraw it — a detail easy to miss when celebrating the higher lump-sum limit.',
  },
  {
    q: 'What tax benefits does NPS offer during the accumulation phase?',
    a: 'Three separate deductions: Section 80CCD(1) covers your own contribution up to 10% of salary (within the overall ₹1,50,000 80C limit, not additional to it), Section 80CCD(1B) gives an EXTRA ₹50,000 deduction specifically for NPS on top of the 80C limit, and Section 80CCD(2) allows your employer\'s NPS contribution (up to 10% of salary, 14% for government employees) as a deduction with no upper rupee cap — and uniquely, 80CCD(2) is one of the very few deductions still allowed under the new tax regime.',
  },
  {
    q: 'What is the difference between NPS Tier 1 and Tier 2?',
    a: 'Tier 1 is the primary retirement account — it gets all the tax benefits described above but locks in until age 60 (with limited partial-withdrawal exceptions). Tier 2 is a voluntary, more liquid add-on account you can open only if you already have a Tier 1 account — it allows withdrawal anytime with no lock-in, but (for most subscribers) carries none of Tier 1\'s tax deductions, making it function more like a flexible investment account than a retirement-specific one.',
  },
  {
    q: 'What happens if I exit NPS before age 60?',
    a: 'Premature exit rules are stricter: if your corpus exceeds ₹5,00,000, at least 80% must go into an annuity regardless of subscriber type, with only 20% available as lump sum — a much less generous split than the age-60 exit. If your corpus is ₹5,00,000 or less, the entire amount can be withdrawn as lump sum. This asymmetry is designed to discourage early exits from what is meant to be a long-term retirement product.',
  },
  {
    q: 'How much pension will I actually get from the annuity portion?',
    a: 'This depends entirely on the annuity provider and plan you choose at retirement — annuity rates (roughly 6-7% per year in recent years, though not guaranteed) are set by insurance companies empanelled with PFRDA, not by NPS itself, and can vary by provider, your age at purchase, and whether you choose options like return of purchase price to nominees. This calculator uses an illustrative assumed rate to give a rough sense of scale — get an actual quote from an annuity provider closer to your retirement date for a real figure.',
  },
  {
    q: 'Can I withdraw from NPS before retirement without fully exiting?',
    a: 'Yes — Section 10(12B) allows a partial, tax-free withdrawal of up to 25% of your own contributions (not employer contributions or investment gains) after 3 years of membership, for specified purposes like a child\'s education or marriage, buying/building a house, or treatment of specified critical illnesses. You can do this a maximum of 4 times over your NPS lifetime, with at least 4 years between each withdrawal. This is separate from — and much more limited than — a full premature exit.',
  },
  {
    q: 'Is NPS mandatory, and who can join?',
    a: 'NPS is mandatory for most central government employees who joined service after 2004 (with the option to instead choose the newer Unified Pension Scheme, UPS, introduced separately). For everyone else — private-sector employees, the self-employed, and anyone aged 18-70 — it\'s entirely voluntary, opened through a bank, financial institution, or directly via the eNPS portal.',
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
  name: 'NPS Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'NPS Calculator', path: PATH },
])

export default function NpsCalculatorPage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'NPS Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏛️</span> Financial hub
          </>
        }
        h1="NPS Calculator"
        subtitle="Project your National Pension System corpus at retirement, and see the lump sum vs annuity split under the revised 2026 PFRDA withdrawal rules — including how much of your lump sum is actually tax-free."
        stats={[
          { icon: '📈', big: 'Market-linked', small: 'Equity + debt mix', tone: 'hub' },
          { icon: '💰', big: '80% / 20%', small: 'New lump sum / annuity split', tone: 'hub' },
          { icon: '🎯', big: '₹50,000', small: 'Extra deduction, 80CCD(1B)', tone: 'hub' },
          { icon: '🔒', big: 'Age 60', small: 'Standard exit age', tone: 'hub' },
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
            Contributing <strong>{formatINR(10000)}/month</strong> at an assumed{' '}
            <strong>10%</strong> return for <strong>25 years</strong> (a non-government
            subscriber) builds a corpus of about <strong>{formatINR(example.corpus)}</strong>.
            Under the 2026 rules, up to <strong>{formatINR(example.lumpsumAmount)}</strong> (80%)
            can be taken as a lump sum — of which {formatINR(example.taxFreeLumpsum)} is tax-free
            and {formatINR(example.taxableLumpsum)} is taxable at your slab rate — with the
            remaining {formatINR(example.annuityAmount)} compulsorily used to purchase an
            annuity.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            Calculate your NPS corpus
          </h2>
          <p className="mb-4 text-ash/80">
            Set your exit type — normal (age 60) or premature — and the calculator enforces the
            correct statutory minimum annuity share for your corpus and subscriber type. You can
            also voluntarily choose a higher annuity share than the minimum if you want more
            guaranteed pension income.
          </p>
          <NpsCalculator />
        </section>

        <section aria-labelledby="withdrawal-rules" className="mb-10 scroll-mt-20">
          <h2 id="withdrawal-rules" className="font-display mb-4 text-2xl font-semibold">
            The 2026 withdrawal rule change, explained
          </h2>
          <p className="text-ash/80">
            PFRDA amended NPS exit rules in late 2025/2026, meaningfully
            increasing how much non-government subscribers can take as a
            lump sum:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Corpus at exit (age 60)</th>
                  <th className="px-4 py-2 font-semibold">Non-government subscriber</th>
                  <th className="px-4 py-2 font-semibold">Government subscriber</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Up to ₹8 lakh</td>
                  <td className="px-4 py-2" colSpan={2}>100% lump sum, no annuity required</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">₹8–12 lakh</td>
                  <td className="px-4 py-2" colSpan={2}>Up to ₹6 lakh lump sum; remainder via phased withdrawal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Above ₹12 lakh</td>
                  <td className="px-4 py-2">80% lump sum / 20% annuity</td>
                  <td className="px-4 py-2">60% lump sum / 40% annuity</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-ash/80">
            The catch: Section 10(12A)&apos;s tax exemption still only
            covers <strong>60% of your total corpus</strong>, regardless of
            how much you actually withdraw as lump sum. So a non-government
            subscriber taking the new 80% lump sum has 60 percentage points
            tax-free and 20 percentage points taxable at their slab rate —
            the higher withdrawal limit is real, but it isn&apos;t all
            tax-free just because it&apos;s now allowed as lump sum.
          </p>
          <p className="mt-4 text-ash/80">
            <strong>Exiting before age 60 flips this split.</strong> Premature exit is stricter:
            above ₹5 lakh corpus, at least 80% must go into an annuity (only 20% lump sum) for every
            subscriber type — the reverse of the normal-exit split above. This calculator&apos;s exit-type
            toggle models both scenarios.
          </p>
        </section>

        <section aria-labelledby="partial-withdrawal" className="mb-10 scroll-mt-20">
          <h2 id="partial-withdrawal" className="font-display mb-4 text-2xl font-semibold">
            Need money before retirement? Partial withdrawal under Section 10(12B)
          </h2>
          <p className="text-ash/80">
            NPS allows limited access to your own contributions while you&apos;re still working, without
            a full exit:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'Up to 25% of your own contributions — not employer contributions or investment returns — can be withdrawn.',
              'Available only after 3 years of NPS membership.',
              'Tax-free under Section 10(12B).',
              'Maximum 4 withdrawals allowed over your entire NPS tenure, with at least 4 years between each.',
              'Permitted only for specified purposes: children\'s higher education or marriage, buying/building a house, or treatment of specified critical illnesses.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tax-benefits" className="mb-10 scroll-mt-20">
          <h2 id="tax-benefits" className="font-display mb-4 text-2xl font-semibold">
            Tax benefits during the accumulation phase
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              ['Section 80CCD(1)', 'your own contribution, up to 10% of salary — within the overall ₹1,50,000 Section 80C limit, not in addition to it.'],
              ['Section 80CCD(1B)', 'an EXTRA ₹50,000 deduction specifically for NPS, on top of the 80C limit — this is the one that makes NPS distinctive versus PPF/ELSS for tax planning.'],
              ['Section 80CCD(2)', 'your employer\'s NPS contribution (up to 10% of salary, 14% for government employees), with no rupee cap on the deduction — and notably, this is one of the few deductions still allowed under the new tax regime.'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className="text-ash/80">
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-ash/80">
            Comparing NPS against other long-horizon, tax-advantaged
            options? Our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            models a fully tax-free (EEE) alternative with a shorter
            15-year lock-in but no equity exposure, while our{' '}
            <Link href="/financial/sip-calculator" className="text-brass underline">
              SIP Calculator
            </Link>{' '}
            models pure equity mutual fund growth without NPS&apos;s
            retirement-specific lock-in or annuity requirement. If
            you&apos;re salaried, your{' '}
            <Link href="/financial/epf-calculator" className="text-brass underline">
              EPF
            </Link>{' '}
            is likely your retirement-savings base layer already — NPS (especially via Section
            80CCD(1B)&apos;s extra ₹50,000 deduction) is usually a market-linked addition on top of
            it, not a replacement for it.
          </p>
        </section>

        <FinancialCrossSell current="nps-calculator" />

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
            NPS returns are market-linked and not guaranteed. Annuity rates are illustrative and vary by provider. This tool is for illustration only and is not investment or tax advice.
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
