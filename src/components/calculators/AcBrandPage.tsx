import Link from 'next/link'
import discomsJson from '@/data/discoms.json'
import PageHero from '@/components/PageHero'
import { calculateAcCost } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import AcBillCalculator, { type AcBillCalculatorTexts } from './AcBillCalculator'

const SITE = 'https://desimetrics.com'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const acBillCalculatorTextsHi: AcBillCalculatorTexts = {
  title: 'AC रनिंग कॉस्ट कैलकुलेटर',
  subtitle: 'अपने एयर कंडीशनर का बिजली खर्च निकालें',
  discomLabel: 'DISCOM / राज्य',
  tonnageLegend: 'टनेज',
  tonOptions: [
    { value: '0.8', label: '0.8 टन', icon: '🧊' },
    { value: '1', label: '1 टन', icon: '❄️' },
    { value: '1.5', label: '1.5 टन', icon: '❄️' },
    { value: '2', label: '2 टन', icon: '🥶' },
  ],
  starLegend: 'स्टार रेटिंग',
  starOptions: [
    { value: '3', label: '3 स्टार', icon: '⭐⭐⭐' },
    { value: '4', label: '4 स्टार', icon: '⭐⭐⭐⭐' },
    { value: '5', label: '5 स्टार', icon: '⭐⭐⭐⭐⭐' },
  ],
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'रनिंग कॉस्ट निकालें',
  monthlyLabel: 'अनुमानित मासिक रनिंग कॉस्ट',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/महीना',
  fiveStarSavingsTemplate: '5-स्टार पर जाने से {amount}/साल की बचत',
  inputPowerLabel: 'इनपुट पावर',
  iseerLabel: 'ISEER',
  unitsPerDayLabel: 'यूनिट प्रति दिन',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
}

export default function AcBrandPage({
  brandName,
  slug,
  locale = 'en',
}: {
  brandName: string
  slug: string
  locale?: 'en' | 'hi'
}) {
  const hi = locale === 'hi'
  const base = hi ? `/hi/ac/brands/${slug}` : `/ac/brands/${slug}`
  const example = calculateAcCost({
    discomCode: 'TNEB',
    tonnage: 1.5,
    starRating: 3,
    dailyHours: 8,
  })

  const faqs = hi
    ? [
        {
          q: `क्या यह कैलकुलेटर किसी भी ${brandName} AC मॉडल के लिए काम करता है?`,
          a: `हां — गणना टनेज, BEE स्टार रेटिंग और रोज़ के इस्तेमाल के घंटों पर आधारित है, जो ब्रांड चाहे जो भी हो, हर AC पर लागू होती है। सटीक अनुमान के लिए अपने ${brandName} मॉडल की टनेज और स्टार रेटिंग डालें (दोनों यूनिट और उसके BEE लेबल पर छपे होते हैं)।`,
        },
        {
          q: `${brandName} AC के लिए यह कितना सटीक है?`,
          a: `ISEER दक्षता मानक Bureau of Energy Efficiency (BEE) तय करता है और भारत में बिकने वाले सभी ब्रांडों पर समान रूप से लागू होता है — किसी भी निर्माता के 3-स्टार AC को समान न्यूनतम ISEER स्तर पूरा करना होता है। इसलिए यह अनुमान ${brandName} के लिए भी उतना ही सटीक है जितना किसी और BEE-लेबल वाले ब्रांड के लिए, सामान्य योजना-अनुमान सीमाओं (कमरे का इंसुलेशन, सेट तापमान, इस्तेमाल का पैटर्न) के भीतर।`,
        },
        {
          q: `मेरे ${brandName} AC की स्टार रेटिंग कहां मिलेगी?`,
          a: `इनडोर या आउटडोर यूनिट पर पीला BEE स्टार लेबल, या स्पेक शीट/बॉक्स देखें — इस पर स्टार रेटिंग और ISEER वैल्यू सीधे लिखी होती है।`,
        },
      ]
    : [
        {
          q: `Does this calculator work for any ${brandName} AC model?`,
          a: `Yes — the calculation is based on tonnage, BEE star rating and daily usage hours, which apply to any AC regardless of brand. Enter your specific ${brandName} model's tonnage and star rating (both printed on the unit and its BEE label) for an accurate estimate.`,
        },
        {
          q: `How accurate is this for a ${brandName} AC specifically?`,
          a: `The underlying ISEER efficiency standard is set by the Bureau of Energy Efficiency (BEE) and applies uniformly across all brands sold in India — a 3-star AC from any manufacturer must meet the same minimum ISEER band. So this estimate is equally accurate for ${brandName} as for any other BEE-labelled brand, within the usual planning-estimate caveats (room insulation, set temperature, usage pattern).`,
        },
        {
          q: `Where do I find my ${brandName} AC's star rating?`,
          a: `Check the yellow BEE star label on the indoor or outdoor unit, or the spec sheet/box it came in — it states the star rating and ISEER value directly.`,
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
    name: hi ? `${brandName} AC बिल कैलकुलेटर` : `${brandName} AC Bill Calculator`,
    url: `${SITE}${base}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    areaServed: 'India',
  }

  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: hi ? '/hi/ac' : '/ac' },
          { label: hi ? 'ब्रांड' : 'Brands', href: hi ? '/hi/ac/brands' : '/ac/brands' },
          { label: brandName, href: base },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1={hi ? `${brandName} AC बिल कैलकुलेटर` : `${brandName} AC Bill Calculator`}
        subtitle={
          hi ? (
            <>
              अपने {brandName} एयर कंडीशनर की टनेज और BEE स्टार रेटिंग से अनुमान
              लगाएं कि इसे चलाने में कितना खर्च आता है — जो{' '}
              <strong>आपके राज्य के असली टॉप बिजली स्लैब</strong> पर आधारित है।
              हर ब्रांड के लिए हम यही असली ISEER-आधारित तरीका इस्तेमाल करते हैं।
            </>
          ) : (
            <>
              Estimate what your {brandName} air conditioner costs to run, using
              its tonnage and BEE star rating — priced at{' '}
              <strong>your state&apos;s real top electricity slab</strong>. The
              same real ISEER-based method we use for every brand.
            </>
          )
        }
        stats={
          hi
            ? [
                { icon: '⭐', big: '3–5 ★', small: 'स्टार रेटिंग', tone: 'hub' },
                { icon: '📊', big: 'ISEER', small: 'BEE दक्षता आधार', tone: 'hub' },
                { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
                { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
              ]
            : [
                { icon: '⭐', big: '3–5 ★', small: 'Star ratings', tone: 'hub' },
                { icon: '📊', big: 'ISEER', small: 'BEE efficiency basis', tone: 'hub' },
                { icon: '📈', big: 'Top slab', small: 'Pricing method', tone: 'hub' },
                { icon: '🗺️', big: '36 states', small: 'DISCOM coverage', tone: 'hub' },
              ]
        }
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
          {hi ? 'उदाहरण गणना' : 'Worked example'}
        </h2>
        <p className="mt-2 text-ash/80">
          {hi ? (
            <>
              तमिलनाडु में रोज़ 8 घंटे चलने वाला <strong>1.5 टन 3-स्टार {brandName}</strong>{' '}
              AC लगभग <strong>{example.dailyUnits} यूनिट/दिन</strong> इस्तेमाल
              करता है और इसका खर्च लगभग{' '}
              <strong>{formatINR(example.monthlyCost)}/महीना</strong> (
              {formatINR(example.annualCost)}/साल) आता है,{' '}
              {formatINR(example.effectiveRatePerUnit)}/यूनिट पर।
            </>
          ) : (
            <>
              A <strong>1.5 ton 3-star {brandName}</strong> AC running 8
              hours/day in Tamil Nadu uses about{' '}
              <strong>{example.dailyUnits} units/day</strong> and costs roughly{' '}
              <strong>{formatINR(example.monthlyCost)}/month</strong> (
              {formatINR(example.annualCost)}/year) at{' '}
              {formatINR(example.effectiveRatePerUnit)}/unit.
            </>
          )}
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          {hi ? `अपने ${brandName} AC का खर्च निकालें` : `Calculate your ${brandName} AC's cost`}
        </h2>
        <AcBillCalculator discoms={liveDiscoms} texts={hi ? acBillCalculatorTextsHi : undefined} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'यह कैसे गिना जाता है' : 'How this is calculated'}
        </h2>
        <div className="space-y-3 text-ash/80">
          {hi ? (
            <>
              <p>
                <strong>दक्षता (ISEER)।</strong> आपके {brandName} AC की स्टार
                रेटिंग एक BEE ISEER वैल्यू से जुड़ी होती है — यही मानक भारत में
                बिकने वाले हर ब्रांड पर लागू होता है, इसलिए एक 5-स्टार {brandName}{' '}
                यूनिट और किसी और ब्रांड का 5-स्टार यूनिट समान न्यूनतम दक्षता पूरी
                करते हैं। हम टनेज को कूलिंग पावर में बदलते हैं, इनपुट बिजली के
                लिए ISEER से भाग देते हैं, और ~70% कंप्रेसर ड्यूटी फैक्टर लगाते
                हैं।
              </p>
              <p>
                <strong>आपके टॉप स्लैब पर आधारित।</strong> चूंकि AC आपके मौजूदा
                इस्तेमाल के ऊपर जुड़ता है, इसकी यूनिट्स आपके सबसे ऊंचे टैरिफ
                स्लैब में गिरती हैं — हम असली अनुमान के लिए वही मार्जिनल दर
                (फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क सहित) इस्तेमाल करते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Efficiency (ISEER).</strong> Your {brandName} AC&apos;s
                star rating maps to a BEE ISEER value — the same standard applies
                to every brand sold in India, so a 5-star {brandName} unit and a
                5-star unit from any other brand meet the same minimum
                efficiency. We convert tonnage to cooling power, divide by ISEER
                for electrical input, and apply a ~70% compressor duty factor.
              </p>
              <p>
                <strong>Priced at your top slab.</strong> Since an AC adds to
                your existing consumption, its units fall in your highest tariff
                slab — we use that marginal rate (plus fuel cost adjustment and
                electricity duty) for a realistic estimate.
              </p>
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'जुड़े हुए कैलकुलेटर' : 'Related calculators'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href={hi ? '/hi/ac/tonnage-calculator' : '/ac/tonnage-calculator'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'AC टनेज कैलकुलेटर' : 'AC tonnage calculator'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi
                ? `पक्का नहीं कि यह आपके कमरे के लिए सही साइज़ का ${brandName} AC है?`
                : `Not sure this is the right size ${brandName} AC for your room?`}
            </p>
          </Link>
          <Link
            href={hi ? '/hi/ac/comparison-tool' : '/ac/comparison-tool'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚖️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'AC तुलना टूल' : 'AC comparison tool'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'दो कॉन्फ़िगरेशन की आमने-सामने तुलना करें।' : 'Compare two configurations side by side.'}
            </p>
          </Link>
          <Link
            href={hi ? '/hi/ac/brands' : '/ac/brands'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🏷️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'सभी AC ब्रांड' : 'All AC brands'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'इस कैलकुलेटर में शामिल हर ब्रांड देखें।' : 'See every brand this calculator covers.'}
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently asked questions'}
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
    </main>
    </>
  )
}
