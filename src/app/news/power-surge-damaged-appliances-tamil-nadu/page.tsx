import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/power-surge-damaged-appliances-tamil-nadu'
const TITLE = 'Power Surge Damaged Your Appliances? What Tamil Nadu Consumers Can Do'
const DESCRIPTION =
  'A voltage surge in Salem district damaged TVs, fridges and meters in 20+ homes. What TNERC rules actually say about meter costs, your bill, and compensation — and what to do if it happens to you.'
const LAST_UPDATED = '29 September 2026'
const DATA_AS_OF = '27 September 2026'

export const metadata: Metadata = {
  title: 'Power Surge Damaged Appliances in Tamil Nadu — Your Rights',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'article', locale: 'en_IN' },
  robots: { index: false },
}

const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'News', path: '/news' },
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
  datePublished: '2026-09-29',
  dateModified: '2026-09-29',
  mainEntityOfPage: `${SITE}${PATH}`,
}

const faqs = [
  {
    q: 'Will TNPDCL (TANGEDCO) pay for my TV or fridge damaged by a power surge?',
    a: 'Not automatically. Neither the Tamil Nadu Electricity Supply Code nor the Distribution Standards of Performance Regulations gives consumers a direct right to compensation for appliance damage from a voltage surge — that gap is real, not an oversight in this article. The Consumer Protection Act route (a complaint to your District Consumer Disputes Redressal Commission) is where such claims actually get argued, case by case, and you would need to prove deficiency of service with evidence like repair bills and service reports.',
  },
  {
    q: 'Who pays to replace a meter damaged by a supply-side fault?',
    a: 'Under Section 7(10) of the Tamil Nadu Electricity Supply Code, 2004, the default is that meter damage is billed to the consumer, since safe custody of the meter is the consumer\'s responsibility. The exception is a burnt meter: the licensee bears that cost unless it is proven the burning was the consumer\'s own fault. A meter damaged by a voltage surge from a supply-side fault would typically fall under this burnt-meter exception, not the general damage rule.',
  },
  {
    q: 'How is my bill calculated while my meter is being replaced?',
    a: 'Section 11(2) of the Supply Code says your consumption is assessed as the average of your preceding four months\' billed units (using a comparable four-month window from the past year if weather conditions differed), with a provisional monthly-minimum charge billed in the meantime — adjusted once the assessment is finalised.',
  },
  {
    q: 'What is the difference between TANGEDCO and TNPDCL?',
    a: 'TANGEDCO was formally restructured and renamed Tamil Nadu Power Distribution Corporation Limited (TNPDCL) for distribution operations, effective 27 June 2024 — generation was split into a separate company, TNPGCL. TANGEDCO no longer exists as the distribution entity, though the name (and "EB", the old colloquial term for the electricity board) remains common in everyday use.',
  },
  {
    q: 'How do I file a complaint about supply-side damage?',
    a: 'Call the 1912 helpline or complain at your local TNPDCL office first, and insist on the unique complaint reference number that Distribution Standards of Performance Regulation 20 requires the licensee to allot and convey to you — keep it, since you\'ll need it for any escalation. If unresolved, you can approach the Consumer Grievance Redressal Forum (CGRF), and then the Electricity Ombudsman within 30 days of a CGRF order that doesn\'t satisfy you.',
  },
  {
    q: 'What commonly causes voltage surges in Tamil Nadu?',
    a: 'Cable TV or internet wires strung on or near electricity poles touching a live line is a recurring, documented cause — exactly what a preliminary inquiry pointed to in the Salem incident this article covers. Other common causes include lightning strikes, sudden restoration after an outage, faults in transformers or distribution lines, and tree branches or loose wiring making contact with live conductors.',
  },
  {
    q: 'Do stabilisers or surge protectors actually help?',
    a: 'A voltage stabiliser protects against gradual voltage fluctuation (too high or too low) but is not designed to absorb a sudden, sharp spike. A surge protector is built specifically to clamp down a brief high-voltage spike before it reaches your appliance. For expensive or sensitive electronics, many households use both, and a good MCB/RCCB at your main distribution board adds a layer of protection against electrical faults more broadly — consult a licensed electrician for what is appropriate for your home\'s wiring.',
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

export default function PowerSurgeTamilNaduPage() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'News', href: '/news' },
          { label: 'Power Surge Appliance Damage', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> Tamil Nadu · TNPDCL
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '📺', big: '20+', small: 'Homes hit, Salem district', tone: 'hub' },
          { icon: '⚡', big: '30 days', small: 'Ombudsman appeal window', tone: 'hub' },
          { icon: '📋', big: '4 months', small: 'Average-billing window', tone: 'hub' },
          { icon: '❓', big: 'No', small: 'Direct appliance-damage right', tone: 'caution-amber' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          By{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · Updated {LAST_UPDATED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          A sudden voltage surge can wreck a TV or fridge in seconds — and if it happens
          because of a fault upstream of your meter, not anything you did, most people
          assume the electricity board simply owes them a replacement. It&apos;s more
          complicated than that. This article walks through what Tamil Nadu&apos;s own
          regulations actually say about meter costs, your bill, and compensation — using a
          recent Salem district incident as the starting point, not the whole story.
        </p>

        <section aria-labelledby="what-happened" className="mt-10 scroll-mt-20">
          <h2 id="what-happened" className={h2Cls}>
            What Happened in Omalur?
          </h2>
          <p className={pCls}>
            As{' '}
            <a
              href="https://www.newindianexpress.com/states/tamil-nadu/2026/Sep/27/power-surge-damages-appliances-omalur-residents-stage-blockade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              The New Indian Express reported
            </a>{' '}
            on {DATA_AS_OF}, a sudden high-voltage surge hit more than 20 houses in
            Veesareddiyur village near Omalur, Salem district, on Saturday 26 September
            2026. Televisions were worst affected, with some damage to fridges, fans and
            electricity meters as well. Residents placed their damaged TVs on the main road
            and blocked traffic for about two hours, alleging negligence, before withdrawing
            after officials assured them of safe supply. A preliminary inquiry by the local
            EB section pointed to a cable TV wire tied to the electricity pole touching a
            live line, pushing high voltage into nearby homes — and the board said it would
            replace the damaged meters and issue notices to cable operators who string wires
            near live lines, after earlier instructions to avoid this had reportedly been
            ignored.
          </p>
          <p className={takeawayCls}>
            Takeaway: this specific incident is still developing and single-sourced to one
            report as of this writing — the regulatory picture below applies regardless of
            exactly how any individual surge happened.
          </p>
        </section>

        <section aria-labelledby="causes" className="mt-10 scroll-mt-20">
          <h2 id="causes" className={h2Cls}>
            What Commonly Causes a Voltage Surge?
          </h2>
          <p className={pCls}>
            A handful of causes recur across reported incidents in Tamil Nadu and elsewhere
            in India:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'Cable TV or internet wires on electricity poles',
                'a wire strung too close to or touching a live line — exactly what the Omalur preliminary inquiry pointed to — can push high voltage into every connected home at once.',
              ],
              [
                'Lightning strikes',
                'a direct or nearby strike on the distribution network can send a sharp voltage spike down the line into connected homes.',
              ],
              [
                'Sudden restoration after an outage',
                'power resuming unevenly across a feeder, or equipment reconnecting out of sequence, can briefly spike voltage before it stabilises.',
              ],
              [
                'Transformer or line faults',
                'a fault in a distribution transformer or line — the same category of failure the Standards of Performance Regulations track for restoration-time targets — can also manifest as a surge rather than an outage.',
              ],
              [
                'Loose wiring or tree contact',
                'a loose connection at the pole, or a tree branch making contact with a live conductor, are both common, mundane causes with the same electrical effect.',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-news" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: most surge causes are on the supply side of your meter, not something a
            householder can prevent — which is exactly why the compensation question below
            matters.
          </p>
        </section>

        <section aria-labelledby="immediate-steps" className="mt-10 scroll-mt-20">
          <h2 id="immediate-steps" className={h2Cls}>
            What to Do Immediately After a Surge
          </h2>
          <p className={pCls}>
            A clear, documented response in the first day or two matters more than anything
            you do afterward:
          </p>
          <ol className="mt-3 space-y-3">
            {[
              [
                'Cut power at the main switch first',
                'if you smell burning or see sparking, switch off your main breaker before touching any appliance — safety comes before documentation.',
              ],
              [
                'Photograph the damage immediately',
                'burn marks, a cracked meter casing, a dead TV/fridge display — timestamped photos are the evidence a compensation claim or CGRF complaint will actually need.',
              ],
              [
                'Get a written service/repair estimate',
                'a technician\'s report stating the appliance failed due to a voltage spike is the single most useful document you can obtain, whether you end up filing with the licensee, CGRF, or a consumer court.',
              ],
              [
                'Complain to TNPDCL and get your reference number',
                'call the 1912 helpline or your local office — Distribution Standards of Performance Regulation 20 requires the licensee to allot a unique number to every complaint and convey it to you. Keep it; you will need it for any escalation.',
              ],
              [
                'Escalate to CGRF if unresolved',
                'if your complaint isn\'t resolved at the local level, the Consumer Grievance Redressal Forum is the next step — and from there, the Electricity Ombudsman, appealable within 30 days of a CGRF order.',
              ],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-news font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ol>
          <p className={takeawayCls}>
            Takeaway: photographs and a written repair estimate, taken before anything is
            fixed or thrown away, do more for your case than anything you can argue verbally
            later.
          </p>
        </section>

        <section aria-labelledby="meter-and-bill" className="mt-10 scroll-mt-20">
          <h2 id="meter-and-bill" className={h2Cls}>
            Meter Damage and Your Bill: What the Rules Actually Say
          </h2>
          <p className={pCls}>
            Two specific, citable rules govern this, and they answer different questions:
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>Who pays for the meter.</strong> Under Section 7(10) of the Tamil Nadu
            Electricity Supply Code, 2004, meter safe custody is the consumer&apos;s
            responsibility, so meter damage is billed to the consumer by default. The
            exception: a <strong>burnt</strong> meter is replaced at the licensee&apos;s cost,
            unless it is proven the burning was the consumer&apos;s own fault. A meter burnt
            by an external voltage surge — not the consumer&apos;s doing — would typically
            fall under this exception, not the general damage rule. This lines up with what
            was reported in Omalur: the EB said it would replace the damaged meters itself.
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>How you&apos;re billed in the meantime.</strong> Section 11(2) of the same
            Code assesses your consumption as the average of your preceding four months&apos;
            billed units — using a comparable four-month window from the past year instead, if
            weather conditions genuinely differed — with a provisional monthly-minimum billed
            until that assessment is finalised and adjusted.
          </p>
          <p className={takeawayCls}>
            Takeaway: ask specifically for average billing under Section 11(2) if your meter
            is out for replacement — don&apos;t assume a provisional bill is your final one.
          </p>
        </section>

        <section aria-labelledby="compensation" className="mt-10 scroll-mt-20">
          <h2 id="compensation" className={h2Cls}>
            Compensation: What the Rules Actually Allow
          </h2>
          <p className={pCls}>
            This is the part worth being honest about, even though it&apos;s not the answer
            most people hope for.
          </p>
          <p className={`mt-3 ${pCls}`}>
            Neither the Tamil Nadu Electricity Supply Code nor the Distribution Standards of
            Performance Regulations, 2004 gives consumers a direct right to compensation for
            appliance damage caused by a voltage surge. The Standards of Performance
            Regulations do specify compensation amounts — Regulation 21 sets out figures like
            ₹250 if the licensee fails to visit or respond to a voltage-fluctuation complaint
            within the stipulated period — but that pays for the licensee&apos;s own delay in
            responding, not for the appliance itself. Look for that distinction carefully if
            you read the regulation yourself: it&apos;s easy to assume the compensation table
            covers damage, and it doesn&apos;t.
          </p>
          <p className={`mt-3 ${pCls}`}>
            The practical route for an actual appliance-damage claim is the{' '}
            <strong>Consumer Protection Act, 2019</strong> — a complaint to your District
            Consumer Disputes Redressal Commission, arguing &ldquo;deficiency of service&rdquo;
            against the licensee. This has succeeded in comparable disputes elsewhere in
            India, but it is case-by-case litigation, not an automatic entitlement — you would
            need to prove the damage and its cause with the documentation described above.
          </p>
          <p className={`mt-3 ${pCls}`}>
            CGRF and the Electricity Ombudsman remain useful for the service-side of the
            dispute — getting your meter replaced, your bill corrected, and the underlying
            fault properly investigated — even though they don&apos;t award appliance-damage
            compensation the way many consumers expect.
          </p>
          <p className={takeawayCls}>
            Takeaway: if a regulation or official cites you a fixed compensation figure for
            appliance damage specifically, ask for the exact regulation and clause — as of
            this writing, we could not locate one that provides it.
          </p>
        </section>

        <section aria-labelledby="protecting-appliances" className="mt-10 scroll-mt-20">
          <h2 id="protecting-appliances" className={h2Cls}>
            Protecting Your Appliances (General Guidance)
          </h2>
          <p className={pCls}>
            None of this is Tamil Nadu-specific regulation — it&apos;s general electrical
            practice worth knowing, and a licensed electrician should confirm what&apos;s
            right for your home&apos;s actual wiring:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'Voltage stabilisers',
                'protect against gradual over- or under-voltage, common on weak rural feeders — but they are not designed to absorb a sudden, sharp spike.',
              ],
              [
                'Surge protectors',
                'built specifically to clamp down a brief high-voltage spike before it reaches a connected appliance — the more relevant device for an event like the one described above.',
              ],
              [
                'MCB/RCCB at your distribution board',
                'a Miniature Circuit Breaker and Residual Current Circuit Breaker add a layer of protection against electrical faults more broadly, cutting power automatically when they detect a dangerous condition.',
              ],
              [
                'Unplug during a known local fault',
                'if you see sparking, smell burning, or a neighbour reports a surge nearby, unplugging sensitive electronics immediately is the fastest protection available, no device required.',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-news" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            Takeaway: a stabiliser and a surge protector solve different problems — expensive
            electronics benefit from both, not either/or.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            Related tools and guides
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/electricity/tneb-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                TNEB (TNPDCL) Bill Calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Estimate your Tamil Nadu electricity bill by telescopic slab.
              </p>
            </Link>
            <Link
              href="/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📄
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Fixed Charges vs FCA Explained
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Why your electricity bill changes even when usage doesn&apos;t.
              </p>
            </Link>
            <Link
              href="/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📊
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                How Telescopic Electricity Slabs Work
              </p>
              <p className="mt-1 text-xs text-ash/60">
                The billing mechanics behind every Indian state electricity bill.
              </p>
            </Link>
            <Link
              href="/solar/battery-backup-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🔋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Solar Battery Backup Calculator
              </p>
              <p className="mt-1 text-xs text-ash/60">
                Size a backup system if grid reliability is a recurring concern.
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
          Last updated: {LAST_UPDATED}. The Omalur incident details are as reported on{' '}
          {DATA_AS_OF} and remain single-sourced to the cited report as of this writing — we
          could not independently confirm or find follow-up coverage. Regulatory claims are
          drawn directly from the text of the Tamil Nadu Electricity Distribution Standards of
          Performance Regulations, 2004 (as amended) and the Tamil Nadu Electricity Supply
          Code, 2004 — cited by regulation/section number above so you can verify them
          independently; we could not locate any provision creating a direct compensation
          right for appliance damage, and say so plainly rather than imply one exists. TANGEDCO
          was renamed Tamil Nadu Power Distribution Corporation Limited (TNPDCL) for
          distribution operations effective 27 June 2024; this article uses the current name.
          See our{' '}
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
