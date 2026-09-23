import type { Metadata } from 'next'
import Link from 'next/link'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import TaxRegimeCalculator from '@/components/calculators/TaxRegimeCalculator'
import { compareRegimes } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/new-vs-old-tax-regime-calculator'

const example = compareRegimes(1500000, 150000)
const exampleEarly = compareRegimes(1100000, 150000)
const exampleHomeowner = compareRegimes(2000000, 750000)
const exampleSenior = compareRegimes(850000, 75000, '60to79')
const marginalReliefExample = compareRegimes(1285000, 0)

export const metadata: Metadata = {
  title: 'New vs Old Tax Regime Calculator FY 2026-27 — Find Your Break-Even',
  description:
    'Compare income tax under the new and old regimes for FY 2026-27, with marginal relief and senior-citizen slabs applied correctly, then see the exact deduction total where the old regime overtakes the new.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/financial/new-vs-old-tax-regime-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs = [
  {
    q: 'Does the standard deduction apply if I have business or freelance income?',
    a: 'No — the standard deduction (₹75,000 new regime, ₹50,000 old regime) only applies to salary and pension income, not to business or professional income. If you\'re a freelancer or run a business, mark yourself as "No" for salaried/pensioner in the calculator so it correctly leaves the standard deduction out of both regimes\' calculations.',
  },
  {
    q: 'Why does the calculator ask for each deduction separately instead of one total?',
    a: 'Because each deduction category has its own statutory cap, and adding them up yourself risks overclaiming — Section 80C tops out at ₹1.5 lakh no matter how much you actually invest across EPF, PPF, ELSS and insurance combined; home loan interest under Section 24(b) is capped at ₹2 lakh for a self-occupied property; the NPS top-up under 80CCD(1B) is capped at ₹50,000; and Section 80D is capped at ₹25,000 (₹50,000 if you or the insured are a senior citizen). Entering each category separately means the calculator applies the correct cap automatically rather than trusting a single self-totaled number.',
  },
  {
    q: 'Is the new or old tax regime better?',
    a: 'For most salaried taxpayers, the new regime now wins, because its enhanced Section 87A rebate makes taxable income up to ₹12 lakh completely tax-free — a salaried person reaches ₹12.75 lakh tax-free after the ₹75,000 standard deduction. The old regime only wins once your genuine deductions clear your specific break-even point, which typically falls somewhere between ₹2.5 lakh and ₹5.5 lakh of deductions depending on income. There is no universal answer — only your own break-even, which this calculator solves for your exact numbers.',
  },
  {
    q: 'What is the "break-even deduction" this calculator shows?',
    a: 'It\'s the exact total of old-regime deductions at which the old regime\'s tax equals the new regime\'s tax for your income — below that total, the new regime is cheaper; above it, the old regime is. Instead of just telling you which regime wins today, the break-even tells you how far you are from the line and exactly how much more deduction (via 80C, HRA, home loan interest and similar heads) it would take to flip the decision, if that\'s even realistic for you.',
  },
  {
    q: 'What income is tax-free under the new regime in FY 2026-27?',
    a: 'Thanks to the ₹75,000 standard deduction and the Section 87A rebate, salaried individuals with gross income up to about ₹12.75 lakh pay zero tax under the new regime. Above that, marginal relief prevents a sudden cliff for a while longer — see the marginal relief question below — before normal slab tax fully applies.',
  },
  {
    q: 'What is marginal relief, and why does it matter just above ₹12 lakh?',
    a: 'Without marginal relief, taxable income of exactly ₹12,00,000 would owe zero tax, but ₹12,00,001 would suddenly owe the full slab tax (tens of thousands of rupees) for just ₹1 of extra income — an unfair cliff. Marginal relief fixes this by capping your tax at no more than the amount by which your income exceeds ₹12,00,000, so the extra tax you pay is never more than the extra income you earned. For example, at exactly ₹12,10,000 taxable income, marginal relief caps the tax at about ₹10,400 rather than the roughly ₹61,500 the slabs alone would produce. This calculator applies marginal relief automatically — many others don\'t, which is why our disclaimer used to warn it was missing.',
  },
  {
    q: 'Does the old regime have the same marginal relief near its ₹5 lakh threshold?',
    a: 'No — this genuinely surprises people. The old regime\'s Section 87A rebate is a hard cliff: taxable income of exactly ₹5,00,000 owes zero tax, but ₹5,00,001 loses the entire ₹12,500 rebate at once, with no phase-out. This asymmetry between the regimes is real, confirmed government policy, not an inconsistency in this calculator — if your old-regime taxable income sits right around ₹5 lakh, even a small additional rupee of income (or a small reduction in deductions) can cost you the full rebate.',
  },
  {
    q: 'Which deductions still work under the new regime?',
    a: 'Only a short list: the ₹75,000 standard deduction on salary, the employer\'s NPS contribution under Section 80CCD(2) (with no rupee cap), the gratuity and leave-encashment exemptions, and the Agniveer Corpus Fund deduction. Everything that makes the old regime attractive — HRA, Section 80C (PPF, ELSS, insurance), Section 80D health insurance, the 80CCD(1B) NPS top-up, and home loan interest under Section 24(b) — is unavailable under the new regime.',
  },
  {
    q: 'Which deductions are only available under the old regime?',
    a: 'The full stack: Section 80C up to ₹1,50,000 (EPF, PPF, ELSS, life insurance premiums, home loan principal, children\'s tuition), Section 80D for health insurance premiums, HRA exemption for rent paid, home loan interest up to ₹2,00,000 on a self-occupied property under Section 24(b), the ₹50,000 NPS top-up under Section 80CCD(1B), and 80TTA/80TTB for savings and deposit interest. These are exactly the categories worth adding up before assuming you know your "old-regime deductions" total.',
  },
  {
    q: 'How do age and senior-citizen status affect the comparison?',
    a: 'Only the old regime\'s basic exemption changes with age — the new regime\'s ₹4,00,000 nil band and rebate structure is identical for everyone regardless of age. Under the old regime, residents under 60 get a ₹2,50,000 nil band, senior citizens (60-79) get ₹3,00,000, and super senior citizens (80+) get ₹5,00,000 — a meaningfully more generous starting point that can tilt some seniors\' break-even lower than a younger taxpayer\'s at the same income.',
  },
  {
    q: 'Can I switch between regimes every year?',
    a: 'Salaried individuals without business or professional income can choose either regime afresh each financial year when filing — there\'s no lock-in, and the new regime is simply the default if you don\'t actively opt for the old one. Taxpayers with business or professional income face a more restricted, largely one-time switching rule, so they should decide more carefully before opting for the old regime.',
  },
  {
    q: 'Should my spouse and I choose the same regime?',
    a: 'No — there\'s no requirement to match, and it\'s often better not to. Each income tax return is assessed independently, so one spouse with a home loan and heavy deductions might genuinely clear their break-even into the old regime, while the other, with lighter deductions, is better off in the new regime. Running each spouse\'s numbers through this calculator separately, rather than assuming a household-wide choice, often lowers the combined family tax bill.',
  },
  {
    q: 'I chose the old regime a few years ago — should I recheck?',
    a: 'Yes, ideally every year. The old regime made sense for a lot of taxpayers who built 80C habits and took home loans under its older rules, but the new regime\'s enhanced rebate has genuinely moved the goalposts since — and even for someone who correctly chose the old regime initially, a home loan\'s interest component shrinks every year as the loan amortises, quietly pushing their deduction total below the break-even over time. A decision that was correct two or three years ago can be quietly costing you money today without an annual recheck.',
  },
  {
    q: 'Should I buy tax-saving products just to cross my break-even?',
    a: 'Generally no — this is one of the most common and costly regime-decision mistakes. If crossing your break-even requires locking money into a low-yield insurance-linked product or an investment you wouldn\'t otherwise choose, the value destroyed by the poor underlying product usually exceeds the tax saved. A deduction is only worth claiming if the underlying action (the investment, the insurance policy, the home purchase) is one you\'d take anyway — let the calculator\'s break-even inform that judgment, not manufacture a reason to buy something you don\'t need.',
  },
  {
    q: 'What is the Section 87A rebate?',
    a: 'A rebate that fully cancels out computed tax liability up to a specified taxable-income threshold — ₹12,00,000 under the new regime (rebate up to ₹60,000) and ₹5,00,000 under the old regime (rebate up to ₹12,500). The slabs are still applied to compute tax first; the rebate then zeroes that result if you\'re within the threshold. This is the single most misunderstood mechanic in Indian income tax — many taxpayers see a 10% or 5% rate quoted for their income band and assume they owe tax, without realizing the rebate erases it entirely if they\'re under the threshold.',
  },
  {
    q: 'Does this calculator include cess and surcharge?',
    a: 'Yes to both. The 4% health and education cess is applied on top of tax after rebate, marginal relief AND surcharge, under both regimes. Surcharge applies once taxable income crosses ₹50 lakh and differs meaningfully between regimes — the old regime\'s top surcharge can reach 37% above ₹5 crore, while the new regime caps it at 25% — with its own marginal relief calculated separately at each ₹50L/1Cr/2Cr/5Cr threshold. See our dedicated Surcharge & Marginal Relief Calculator for a standalone breakdown of this mechanism.',
  },
  {
    q: 'What happens if I don\'t declare a regime choice to my employer?',
    a: 'Your employer deducts TDS under the new regime by default, since it\'s the statutory default regime — this is usually fine for most taxpayers now, but if your specific numbers favour the old regime, not declaring it means excess TDS gets deducted through the year. You can still switch to the old regime when filing your return and claim the difference as a refund, but declaring your intended regime to your employer early avoids that cash-flow gap and the wait for a refund.',
  },
  {
    q: 'Is this calculator accurate enough to file my return with?',
    a: 'It\'s an accurate planning-grade comparison for FY 2026-27 (AY 2027-28), including the correct slabs for both regimes, both standard deductions, the Section 87A rebate and marginal relief mechanics for each regime, surcharge and its own marginal relief above ₹50 lakh, and the senior/super-senior basic exemptions. It does not model capital gains taxed at their own special rates or every niche deduction — treat the output as a strong planning estimate, and confirm the final figures with a chartered accountant for actual filing, especially at high incomes or with capital gains involved.',
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
  name: 'New vs Old Tax Regime Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Financial', path: '/financial' },
  { name: 'New vs Old Tax Regime', path: PATH },
])

const h2Cls = 'font-display mb-4 text-2xl font-semibold'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

export default function TaxRegimePage() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'Financial', href: '/financial' },
          { label: 'New vs Old Tax Regime', href: '/financial/new-vs-old-tax-regime-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="New vs Old Tax Regime Calculator (FY 2026-27)"
        subtitle="Stop asking which regime is better in general — find the exact deduction total where YOUR old regime overtakes the new. Includes marginal relief, senior-citizen slabs and the current 87A rebate for both regimes."
        stats={[
          { icon: '🎯', big: '₹12.75L', small: 'Tax-free (new regime)', tone: 'hub' },
          { icon: '📐', big: 'Break-even', small: 'Exact deduction solver', tone: 'hub' },
          { icon: '➕', big: 'Marginal relief', small: 'Applied automatically', tone: 'hub' },
          { icon: '👴', big: 'Senior slabs', small: '60–79 and 80+ handled', tone: 'hub' },
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
            On a <strong>₹15,00,000</strong> salary with ₹1,50,000 of old-regime
            deductions, the new regime tax is{' '}
            <strong>{formatINR(example.newRegime.totalTax)}</strong> vs{' '}
            <strong>{formatINR(example.oldRegime.totalTax)}</strong> under the old
            regime — the {example.recommended} regime saves{' '}
            <strong>{formatINR(example.saving)}</strong>. Your break-even at this
            income is <strong>{formatINR(example.breakEvenDeduction ?? 0)}</strong> of
            deductions — you&apos;d need {formatINR(example.deductionGap)} more to flip
            the answer.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className={h2Cls}>
            Compare your tax and find your break-even
          </h2>
          <TaxRegimeCalculator />
        </section>

        <section aria-labelledby="real-question" className="mb-10 scroll-mt-20">
          <h2 id="real-question" className={h2Cls}>
            Stop Asking Which Regime Is Better — Find Your Line
          </h2>
          <p className="text-ash/80">
            The old-vs-new debate has one honest answer, and it isn&apos;t
            a verdict that applies to everyone: it depends entirely on
            your own deductions. There is a precise rupee figure — your
            break-even — where the two regimes cost exactly the same.
            Below it, the new regime wins; above it, the old one does.
            Everything else is noise.
          </p>
          <p className="mt-3 text-ash/80">
            The two systems are effectively racing each other. The new
            regime starts ahead because of its bigger rebate and lower
            rates; the old regime tries to catch up using your
            deductions. Most calculators show you two tax figures side by
            side and stop there — that tells you who wins today, but not
            how close the race is or what would change the outcome. This
            calculator is built around the break-even itself: it solves
            the exact deduction total at which the old regime catches up,
            then shows exactly how far your current deductions sit from
            that line.
          </p>
          <p className={takeawayCls}>
            Takeaway: if you&apos;re ₹1.6 lakh short of your break-even,
            you know precisely what it would take to flip the decision —
            and whether chasing that extra deduction is even worth
            locking money away for.
          </p>
        </section>

        <section aria-labelledby="slabs" className="mb-10 scroll-mt-20">
          <h2 id="slabs" className={h2Cls}>
            Both Regimes, Slab by Slab — FY 2026-27
          </h2>
          <p className="text-ash/80">
            Notice how the new regime&apos;s nil band reaches ₹4,00,000
            and its rebate covers all the way to ₹12,00,000, while the
            old regime&apos;s rates climb faster but unlock deductions
            the new regime doesn&apos;t allow:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">New regime (default)</p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist">
                <tr>
                  <th className="px-4 py-2 font-semibold">Income slab</th>
                  <th className="px-4 py-2 text-right font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['Up to ₹4,00,000', 'Nil'],
                  ['₹4,00,001 – ₹8,00,000', '5%'],
                  ['₹8,00,001 – ₹12,00,000', '10%'],
                  ['₹12,00,001 – ₹16,00,000', '15%'],
                  ['₹16,00,001 – ₹20,00,000', '20%'],
                  ['₹20,00,001 – ₹24,00,000', '25%'],
                  ['Above ₹24,00,000', '30%'],
                ].map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2">{slab}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            Standard deduction ₹75,000 (salaried). 87A rebate up to
            ₹60,000 zeroes tax up to ₹12,00,000 taxable income — salaried
            zero-tax up to ₹12,75,000 gross. Same slabs for every age
            group.
          </p>

          <p className="mt-6 font-semibold text-ink-navy">Old regime (opt-in)</p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist">
                <tr>
                  <th className="px-4 py-2 font-semibold">Income slab</th>
                  <th className="px-4 py-2 text-right font-semibold">Rate</th>
                  <th className="px-4 py-2 text-right font-semibold">Senior (60–79)</th>
                  <th className="px-4 py-2 text-right font-semibold">Super senior (80+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2">Up to ₹2,50,000</td>
                  <td className="px-4 py-2 text-right tabular-nums">Nil</td>
                  <td className="px-4 py-2 text-right tabular-nums">Nil to ₹3L</td>
                  <td className="px-4 py-2 text-right tabular-nums">Nil to ₹5L</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">₹2,50,001 – ₹5,00,000</td>
                  <td className="px-4 py-2 text-right tabular-nums">5%</td>
                  <td className="px-4 py-2 text-right tabular-nums">5% from ₹3L</td>
                  <td className="px-4 py-2 text-right tabular-nums">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">₹5,00,001 – ₹10,00,000</td>
                  <td className="px-4 py-2 text-right tabular-nums">20%</td>
                  <td className="px-4 py-2 text-right tabular-nums">20%</td>
                  <td className="px-4 py-2 text-right tabular-nums">20%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Above ₹10,00,000</td>
                  <td className="px-4 py-2 text-right tabular-nums">30%</td>
                  <td className="px-4 py-2 text-right tabular-nums">30%</td>
                  <td className="px-4 py-2 text-right tabular-nums">30%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            Standard deduction ₹50,000 (salaried). 87A rebate up to
            ₹12,500 zeroes tax up to ₹5,00,000 taxable income only — no
            phase-out (see marginal relief FAQ below). Allows 80C, 80D,
            HRA, home loan interest and the other deductions this
            calculator lets you enter.
          </p>
          <p className="mt-4 text-ash/80">
            One nuance trips up even careful taxpayers: you can&apos;t
            just eyeball the slab rates and compare. The new regime looks
            like it taxes an ₹11 lakh income at rates climbing to 10%,
            which sounds worse than it is, because the 87A rebate then
            erases the entire bill. The old regime looks generous with
            its deductions, but its 20% rate starts at just ₹5 lakh and
            30% at ₹10 lakh — far earlier than the new regime&apos;s 30%
            at ₹24 lakh. A full head-to-head calculation, not a glance at
            the tables, is the only reliable way to decide.
          </p>
        </section>

        <section aria-labelledby="how-it-works" className="mb-10 scroll-mt-20">
          <h2 id="how-it-works" className={h2Cls}>
            How the Break-Even Engine Works
          </h2>
          <ul className="mt-3 space-y-3">
            {[
              ['1. Compute new-regime tax', 'subtract the ₹75,000 standard deduction, apply the seven new-regime slabs, then apply the Section 87A rebate — zeroing tax entirely up to ₹12,00,000 taxable income, or applying marginal relief just above it so there\'s never a sudden cliff.'],
              ['2. Compute old-regime tax', 'subtract the ₹50,000 standard deduction and every deduction you entered (capped at each one\'s statutory limit where applicable), apply the old regime\'s four slabs using your age group\'s basic exemption, then apply the ₹12,500 rebate if taxable income is ₹5,00,000 or below.'],
              ['3. Declare a winner and the saving', 'the two final figures (after cess) are compared directly — the lower one is your regime, and the difference is what choosing correctly saves you every year rather than defaulting or guessing.'],
              ['4. Solve your break-even', 'holding your income fixed, the engine searches for the exact deduction total at which the old regime\'s tax equals the new regime\'s — this is what sets it apart from a plain side-by-side comparison.'],
              ['5. Show the gap', 'your current deductions are compared against that break-even line, so you know exactly how much more (or how much you\'re already ahead) it would take to change the answer.'],
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
            Example: at exactly <strong>₹12,10,000</strong> taxable income
            under the new regime, slab tax alone would be about ₹61,500 —
            but marginal relief caps it at{' '}
            <strong>{formatINR(marginalReliefExample.newRegime.totalTax)}</strong>,
            the amount by which taxable income exceeds ₹12,00,000, plus
            cess. This is the exact mechanic that prevents the &ldquo;why
            did earning ₹1 more cost me ₹60,000&rdquo; problem.
          </p>
        </section>

        <section aria-labelledby="mistakes" className="mb-10 scroll-mt-20">
          <h2 id="mistakes" className={h2Cls}>
            Three Mistakes That Cost People Money
          </h2>
          <ul className="mt-3 space-y-3">
            {[
              ['Treating ₹12 lakh as a cliff', 'some taxpayers turn down a small raise or bonus, fearing that crossing ₹12 lakh costs them the entire ₹60,000 rebate. It doesn\'t — marginal relief ensures the extra tax never exceeds the extra income until taxable income reaches roughly ₹12.7 lakh. Refusing a raise to "protect" a rebate that marginal relief already protects is a pure, avoidable loss.'],
              ['Choosing a regime once and never revisiting it', 'the old regime made sense for taxpayers who built 80C habits and took home loans years ago. But the enhanced rebate has moved the goalposts, and a home loan\'s interest component shrinks every year as it amortises — quietly pushing many taxpayers\' deduction totals below their break-even without them noticing. A decision that was correct in 2022 may be costing money today.'],
              ['Buying deductions you don\'t actually want', 'when people learn the old regime could win, some rush into whatever product a bank pushes — often a low-yield endowment policy — purely to manufacture a deduction. This usually destroys more value than the tax it saves. A deduction is only worth claiming if the underlying action is one you\'d take anyway, regardless of the tax label.'],
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

        <section aria-labelledby="old-regime-deductions" className="mb-10 scroll-mt-20">
          <h2 id="old-regime-deductions" className={h2Cls}>
            Sizing Your Old-Regime Deductions
          </h2>
          <p className="text-ash/80">
            The calculator above takes each deduction category separately —
            80C, 80D, HRA exemption, home loan interest, the NPS top-up and a
            catch-all &ldquo;other&rdquo; field — and caps each one at its
            statutory limit automatically (₹1.5 lakh for 80C, ₹2 lakh for
            home loan interest under Section 24(b), ₹50,000 for the NPS
            80CCD(1B) top-up, and ₹25,000/₹50,000 for 80D depending on your
            age group), so you don&apos;t need to pre-total anything or
            worry about accidentally overclaiming a section&apos;s limit.
          </p>
          <p className="mt-3 text-ash/80">
            If you&apos;re not sure what to enter for a specific category:
            our{' '}
            <Link href="/financial/hra-calculator" className="text-brass underline">
              HRA Calculator
            </Link>{' '}
            gives your exact exempt HRA amount, our{' '}
            <Link href="/financial/home-loan-emi-calculator" className="text-brass underline">
              Home Loan EMI Calculator
            </Link>{' '}
            breaks out how much of your EMI is interest versus principal for
            a home loan, our{' '}
            <Link href="/financial/ppf-calculator" className="text-brass underline">
              PPF Calculator
            </Link>{' '}
            helps size your 80C contribution, and our{' '}
            <Link href="/financial/nps-calculator" className="text-brass underline">
              NPS Calculator
            </Link>{' '}
            helps with the 80CCD(1B) top-up — enter each figure directly
            into its matching field above and let the calculator apply the
            caps for you.
          </p>
        </section>

        <section aria-labelledby="worked-examples-three" className="mb-10 scroll-mt-20">
          <h2 id="worked-examples-three" className={h2Cls}>
            Three Taxpayers and the Line That Decides Them
          </h2>
          <p className="text-ash/80">
            The break-even is abstract until it&apos;s attached to a real
            income and deduction stack. Three taxpayers, three different
            positions relative to their own line:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            Anjali, 26, software engineer — early career, light deductions
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Salary</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(1100000)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">80C claimed</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(150000)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">New regime tax</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleEarly.newRegime.totalTax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Old regime tax</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleEarly.oldRegime.totalTax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Break-even deductions</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleEarly.breakEvenDeduction ?? 0)}</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">New regime saves her</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">{formatINR(exampleEarly.saving)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-ash/70">
            Anjali would need roughly {formatINR(exampleEarly.deductionGap)} more
            in deductions to make the old regime competitive — essentially
            impossible at her income without a large home loan. She stays
            in the new regime and keeps her ELSS purely for the equity
            exposure, not the tax break.
          </p>

          <p className="mt-6 font-semibold text-ink-navy">
            Suresh, 42, manager — home loan and a full deduction stack
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Salary</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(2000000)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Total deductions</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(750000)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">New regime tax</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleHomeowner.newRegime.totalTax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Old regime tax</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleHomeowner.oldRegime.totalTax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Break-even deductions</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleHomeowner.breakEvenDeduction ?? 0)}</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">Old regime saves him</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">{formatINR(exampleHomeowner.saving)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-ash/70">
            Suresh&apos;s stack — ₹2 lakh home loan interest, ₹1.5 lakh
            80C, ₹2.5 lakh HRA, ₹50,000 80D and ₹50,000 NPS top-up —
            clears his break-even, but only just. As his home loan
            interest shrinks year over year, his advantage will narrow
            and may eventually flip; he should recheck annually.
          </p>

          <p className="mt-6 font-semibold text-ink-navy">
            Kamala, 65, retired teacher — senior citizen, pension income
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Pension</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(850000)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">80D + 80TTB claimed</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(75000)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">New regime tax</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleSenior.newRegime.totalTax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Old regime tax (senior slabs)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleSenior.oldRegime.totalTax)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-ash/70">Break-even deductions</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink-navy">{formatINR(exampleSenior.breakEvenDeduction ?? 0)}</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2.5 font-medium text-ash/70">New regime saves her</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-financial">{formatINR(exampleSenior.saving)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-ash/70">
            Even with her higher ₹3 lakh senior basic exemption in the old
            regime, Kamala&apos;s deductions fall well short of her
            break-even. She opts for the new regime and skips the annual
            ritual of gathering interest certificates and insurance proofs
            the old regime would otherwise demand.
          </p>
          <p className={takeawayCls}>
            Takeaway: three very different incomes and life stages, three
            different verdicts — the only thing that generalises is that
            each of them needed their own number, not a rule of thumb.
          </p>
        </section>

        <section aria-labelledby="tips" className="mb-10 scroll-mt-20">
          <h2 id="tips" className={h2Cls}>
            Six Tips to Get the Regime Decision Right
          </h2>
          <ul className="mt-3 space-y-3">
            {[
              ['Decide with your break-even, not a rule of thumb', 'a popular claim that "old wins above ₹4 lakh of deductions" is only roughly true and varies by income — use your exact break-even instead of a generic number.'],
              ['Recheck every single year', 'a home loan taken or closed, a child\'s tuition ending, or a new NPS habit all move your break-even — what was optimal last year may not be this year.'],
              ['Don\'t chase deductions you wouldn\'t otherwise want', 'if the new regime wins, resist locking money into a low-yield product just to flip to the old regime — a deduction only helps if the underlying investment is one you\'d make anyway.'],
              ['Remember ₹12 lakh isn\'t a cliff', 'marginal relief caps the extra tax at the extra income until roughly ₹12.7 lakh taxable — don\'t turn down a raise fearing a cliff that doesn\'t exist.'],
              ['Compare spouses independently', 'each return stands alone — a couple can legitimately have one spouse in each regime, and optimising separately often lowers the combined bill.'],
              ['Keep protection even after switching to new', 'if you move to the new regime and lose the 80C benefit, don\'t cancel a well-priced term or health policy — insurance is about risk, not tax; drop only the low-yield products you held purely for the deduction.'],
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

        <section aria-labelledby="quick-reference" className="mb-10 scroll-mt-20">
          <h2 id="quick-reference" className={h2Cls}>
            Quick Reference
          </h2>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Parameter</th>
                  <th className="px-4 py-2 font-semibold">New regime</th>
                  <th className="px-4 py-2 font-semibold">Old regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['Nil slab up to', '₹4,00,000', '₹2,50,000 (₹3L senior, ₹5L super senior)'],
                  ['Standard deduction', '₹75,000', '₹50,000'],
                  ['87A rebate', 'Up to ₹60,000 (income to ₹12L)', 'Up to ₹12,500 (income to ₹5L)'],
                  ['Salaried zero-tax up to', '₹12.75 lakh', '₹5.5 lakh'],
                  ['Marginal relief', 'Yes, above ₹12L', 'No — hard cliff at ₹5L'],
                  ['80C, 80D, HRA, 24(b)', 'Not allowed', 'Allowed'],
                  ['Employer NPS 80CCD(2)', 'Allowed', 'Allowed'],
                  ['Top surcharge', '25% (capped)', '37%'],
                  ['Cess', '4%', '4%'],
                  ['Default regime', 'Yes', 'Opt-in'],
                ].map(([p, n, o]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 font-medium">{p}</td>
                    <td className="px-4 py-2">{n}</td>
                    <td className="px-4 py-2">{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FinancialCrossSell current="new-vs-old-tax-regime-calculator" />

        <section aria-labelledby="faq" className="mb-10">
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
          <p className="mt-4 text-xs text-ash/40">
            For general guidance only, not tax advice. Capital gains at their own special rates are not modelled here; consult a chartered accountant before filing, especially at high incomes. See our{' '}
            <Link href="/methodology" className="text-brass underline">
              methodology
            </Link>{' '}
            for how we source and verify data across this site.
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
