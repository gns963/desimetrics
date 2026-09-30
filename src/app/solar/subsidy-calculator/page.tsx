import type { Metadata } from 'next'
import Link from 'next/link'
import LeadGenForm from '@/components/LeadGenForm'
import PageHero from '@/components/PageHero'
import SolarSubsidyCalculator from '@/components/calculators/SolarSubsidyCalculator'
import HowToApplyPMSuryaGhar, { PM_SURYA_GHAR_STEPS } from '@/components/solar/HowToApplyPMSuryaGhar'
import SubsidyTierCards from '@/components/solar/SubsidyTierCards'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/subsidy-calculator'

export const metadata: Metadata = {
  title: 'PM Surya Ghar Subsidy Calculator 2026 — Eligibility & Amount',
  description:
    'Check your PM Surya Ghar: Muft Bijli Yojana rooftop solar subsidy and eligibility. ₹30,000/kW up to 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages('/solar/subsidy-calculator'),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const faqs: { q: string; a: string }[] = [
  {
    q: 'How much is the PM Surya Ghar subsidy?',
    a: 'It is ₹30,000 per kW for the first 2 kW and ₹18,000 for the 3rd kW, capped at ₹78,000. So 1 kW gets ₹30,000, 2 kW gets ₹60,000, and 3 kW or larger gets ₹78,000.',
  },
  {
    q: 'Who is eligible for PM Surya Ghar?',
    a: 'Indian residential electricity consumers who own a house with a suitable roof, have a valid grid connection, and have not previously availed a rooftop solar subsidy.',
  },
  {
    q: 'Do systems above 3 kW get a bigger subsidy?',
    a: 'No. The central subsidy is capped at ₹78,000 regardless of how large the system is beyond 3 kW.',
  },
  {
    q: 'Is the subsidy paid to me or the installer?',
    a: 'The subsidy is credited to your bank account after installation and inspection through the national PM Surya Ghar portal.',
  },
  {
    q: 'How long does the subsidy application process take?',
    a: 'From registration to subsidy disbursal typically takes about 2-3 months total, spanning portal registration, vendor selection and feasibility approval, installation and net-meter application, and finally DISCOM inspection before the subsidy is credited — see the step-by-step timeline below.',
  },
  {
    q: 'What happens if my subsidy application is rejected?',
    a: 'Rejections are usually due to incomplete documentation, an ineligible connection type, or exceeding the sanctioned load limit for your system size. The portal typically shows the rejection reason, and you can usually correct the issue and reapply.',
  },
  {
    q: 'Can I get a state subsidy in addition to PM Surya Ghar?',
    a: 'Some states offer an additional subsidy on top of the central PM Surya Ghar amount — this varies by state and isn\'t modelled in this calculator, which shows only the fixed central subsidy. Check with your state renewable energy department or DISCOM for any additional scheme.',
  },
  {
    q: 'Do I need to use an MNRE-empanelled installer?',
    a: 'Yes — to qualify for the subsidy, installation must go through a vendor empanelled with your DISCOM under the PM Surya Ghar programme, using Made-in-India (DCR) panels and MNRE-approved components.',
  },
  {
    q: 'What documents do I need to apply?',
    a: 'Typically your electricity bill/consumer number, proof of roof ownership or the owner\'s consent, and a valid bank account for the subsidy transfer — the exact document checklist is confirmed during portal registration.',
  },
  {
    q: 'Can renters apply for PM Surya Ghar?',
    a: 'The subsidy is tied to the roof and connection, so you generally need to own the property or have the property owner\'s explicit consent to install and claim it — a tenant without that consent isn\'t eligible.',
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
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Solar', item: `${SITE}/solar` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'PM Surya Ghar Subsidy Calculator',
      item: `${SITE}${PATH}`,
    },
  ],
}
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PM Surya Ghar Subsidy Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to apply for the PM Surya Ghar subsidy',
  step: PM_SURYA_GHAR_STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

export default function SolarSubsidyPage() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'Solar', href: '/solar' },
          { label: 'PM Surya Ghar Subsidy Calculator', href: '/solar/subsidy-calculator' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="PM Surya Ghar Subsidy Calculator"
        subtitle={
          <>
            Check your rooftop solar subsidy under{' '}
            <strong>PM Surya Ghar: Muft Bijli Yojana</strong> and confirm whether
            you meet the eligibility conditions. The central subsidy is capped at{' '}
            <strong>₹78,000</strong> for systems of 3 kW and above.
          </>
        }
        stats={[
          { icon: '💰', big: '₹30,000/kW', small: 'First 2 kW', tone: 'hub' },
          { icon: '💰', big: '₹18,000', small: '3rd kW', tone: 'hub' },
          { icon: '🧢', big: '₹78,000', small: 'Max cap', tone: 'hub' },
          { icon: '📊', big: '3 kW+', small: 'Cap threshold', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          Check your subsidy
        </h2>
        <SolarSubsidyCalculator />
      </section>

      <SubsidyTierCards discomCode="TNEB" />

      <HowToApplyPMSuryaGhar />

      <section aria-labelledby="disbursal" className="mb-10 scroll-mt-20">
        <h2 id="disbursal" className="font-display mb-2 text-2xl font-semibold">
          How and When the Subsidy Actually Reaches You
        </h2>
        <p className="text-ash/80">
          PM Surya Ghar pays out as a direct bank transfer (DBT) into your own
          account — never as an upfront discount and never routed through your
          installer. The transfer only happens after your net meter is
          installed and your DISCOM has inspected and commissioned it, which
          is why the timeline in the how-to-apply steps above shows disbursal
          as the last stage, roughly 4-8 weeks after installation rather than
          at the time you sign a quote.
        </p>
        <ul className="mt-3 space-y-2">
          {[
            [
              'Not part of your installer quote',
              'the system cost your installer quotes you is the full pre-subsidy price; the subsidy reduces what you actually pay only after it lands in your account, so budget for the full upfront cost.',
            ],
            [
              'Tied to your net meter, not your panels',
              "commissioning — the DISCOM formally switching on and certifying your net meter — is the trigger, not the day the panels go up on your roof.",
            ],
            [
              'One transfer per connection',
              'the subsidy is paid once per eligible electricity connection; you cannot claim it again on the same connection for a later system upgrade.',
            ],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="rejected-reasons" className="mb-10 scroll-mt-20">
        <h2 id="rejected-reasons" className="font-display mb-2 text-2xl font-semibold">
          Why Applications Get Rejected or Delayed
        </h2>
        <p className="text-ash/80">
          Most PM Surya Ghar delays trace back to a handful of avoidable
          issues, not a genuine eligibility problem:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            [
              'Document mismatch',
              'the name, address or consumer number on your application doesn\'t match your electricity bill or bank account exactly.',
            ],
            [
              'Non-empanelled vendor',
              'installing through a contractor who isn\'t registered on the portal as an empanelled vendor for your DISCOM voids the subsidy claim entirely.',
            ],
            [
              'Sanctioned load exceeded',
              'your proposed system size is larger than your connection\'s sanctioned load allows, which requires a separate load-enhancement request first.',
            ],
            [
              'Wrong connection type',
              'commercial and industrial connections don\'t qualify — only residential domestic connections are eligible under this scheme.',
            ],
            [
              'Prior subsidy on the same connection',
              'a connection that has already claimed a rooftop solar subsidy before, under this scheme or an earlier state one, cannot claim it again.',
            ],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>!</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-ash/80">
          The portal shows the specific rejection reason against your
          application, and in most cases you can correct the issue — updating
          a document, switching vendors, or applying for a load enhancement —
          and resubmit rather than starting over.
        </p>
      </section>

      <section aria-labelledby="not-eligible" className="mb-10 scroll-mt-20">
        <h2 id="not-eligible" className="font-display mb-2 text-2xl font-semibold">
          Who Doesn&apos;t Qualify
        </h2>
        <p className="text-ash/80">
          Alongside the roof-ownership and consumption-connection conditions
          listed above, a few specific situations rule out the subsidy even
          when the applicant otherwise looks eligible:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            [
              'Tenants without the owner\'s written consent',
              'the subsidy is tied to the roof, so a renter needs the property owner to formally consent to the installation and the subsidy claim.',
            ],
            [
              'Shared or multi-owner roofs',
              'where a roof is jointly owned, DISCOMs typically require documented consent from all owners, not just the applicant.',
            ],
            [
              'Non-DCR panels',
              'systems using panels that aren\'t Made-in-India (DCR-certified) don\'t qualify, even if every other condition is met.',
            ],
            [
              'Unregularised or under-sanctioned connections',
              'a connection with an unresolved billing dispute or a sanctioned load that doesn\'t match actual usage needs to be regularised with the DISCOM first.',
            ],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="state-topup" className="mb-10 scroll-mt-20">
        <h2 id="state-topup" className="font-display mb-2 text-2xl font-semibold">
          State Top-Up Subsidies
        </h2>
        <p className="text-ash/80">
          The ₹30,000/kW-₹78,000 cap calculated above is the fixed central
          subsidy and applies identically nationwide, regardless of which
          state or DISCOM you&apos;re under. Some state governments layer an
          additional incentive on top of it — the amount, eligibility and
          application process for any such state top-up varies by state and
          isn&apos;t modelled in this calculator, which shows only the central
          figure. Check directly with your state renewable energy department
          or your DISCOM&apos;s solar cell for whether a state-level scheme
          currently applies to you, since these schemes change more often
          than the central one and aren&apos;t always listed on the national
          portal.
        </p>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          PM Surya Ghar FAQ
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

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          Related calculators
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Link
            href="/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Solar ROI calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              See your net cost after this subsidy, and the exact payback period.
            </p>
          </Link>
          <Link
            href="/solar/panel-size-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Panel size calculator
            </p>
            <p className="mt-1 text-xs text-ash/60">
              Not sure what size system to apply for? Start here.
            </p>
          </Link>
          <Link
            href="/solar/net-metering-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔄</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              Net metering earnings
            </p>
            <p className="mt-1 text-xs text-ash/60">
              What your exported units are worth after installation.
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="leadgen" className="mb-6">
        <h2 id="leadgen" className="font-display mb-4 text-2xl font-semibold">
          Get matched with installers
        </h2>
        <LeadGenForm source="solar-subsidy-calculator" />
      </section>

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
    </main>
    </>
  )
}
