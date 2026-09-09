import type { Metadata } from 'next'
import Link from 'next/link'
import AcComparisonTool, { type AcComparisonToolTexts } from '@/components/calculators/AcComparisonTool'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { calculateAcCost } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/comparison-tool'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const exampleA = calculateAcCost({ discomCode: 'TNEB', tonnage: 1, starRating: 5, dailyHours: 8 })
const exampleB = calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 3, dailyHours: 8 })

const SCENARIOS = [
  {
    question: 'क्या छोटा, ज़्यादा-स्टार AC बड़े, कम-स्टार AC से चलाने में सस्ता है?',
    a: { label: '1T, 5★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1, starRating: 5, dailyHours: 8 }) },
    b: { label: '1.5T, 3★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 3, dailyHours: 8 }) },
  },
  {
    question: 'सिर्फ स्टार रेटिंग, एक ही साइज़ पर, खर्च कितना बदलती है?',
    a: { label: '1.5T, 3★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 3, dailyHours: 8 }) },
    b: { label: '1.5T, 5★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1.5, starRating: 5, dailyHours: 8 }) },
  },
  {
    question: 'क्या ज़्यादा बड़ा, औसत-स्टार AC कभी छोटे, टॉप-स्टार AC से हार सकता है?',
    a: { label: '2T, 3★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 2, starRating: 3, dailyHours: 8 }) },
    b: { label: '1T, 5★', cost: calculateAcCost({ discomCode: 'TNEB', tonnage: 1, starRating: 5, dailyHours: 8 }) },
  },
]

export const metadata: Metadata = {
  title: 'AC तुलना टूल 2026 — किन्हीं भी दो कॉन्फ़िगरेशन की तुलना करें (भारत)',
  description:
    'किन्हीं भी दो AC कॉन्फ़िगरेशन की आमने-सामने तुलना करें — अलग टनेज, स्टार रेटिंग या दोनों — आपके DISCOM के टैरिफ पर आधारित असली रनिंग कॉस्ट पर।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac/comparison-tool'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AC Comparison Tool',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'तुलना टूल', path: PATH },
])

const acComparisonTextsHi: AcComparisonToolTexts = {
  title: 'AC तुलना टूल',
  subtitle: 'किन्हीं भी दो AC कॉन्फ़िगरेशन की आमने-सामने तुलना करें',
  discomLabel: 'DISCOM / राज्य',
  hoursLabel: 'रोज़ का इस्तेमाल (दोनों यूनिट)',
  hoursUnit: 'घंटे/दिन',
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
  optionALabel: 'ऑप्शन A',
  optionBLabel: 'ऑप्शन B',
  ctaLabel: 'इन दोनों AC की तुलना करें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  perYearSuffix: '/साल',
  bSavesTemplate: 'ऑप्शन B से {amount}/साल की बचत',
  aSavesTemplate: 'ऑप्शन A से {amount}/साल की बचत',
}

const faqs = [
  {
    q: 'यह 3★ बनाम 5★ बचत गाइड से कैसे अलग है?',
    a: 'वह गाइड तुलना को एक ही टनेज पर 3-स्टार बनाम 5-स्टार तक सीमित रखती है। यह टूल दोनों तरफ टनेज और स्टार रेटिंग दोनों को स्वतंत्र रूप से बदलने देता है — यह वाकई अलग सवाल के लिए उपयोगी है, जैसे "क्या छोटा 1-टन 5-स्टार AC बड़े 1.5-टन 3-स्टार AC से चलाने में सस्ता है?"',
  },
  {
    q: 'क्या मुझे अलग-अलग टनेज के AC की तुलना करनी भी चाहिए?',
    a: 'सिर्फ तब जब दोनों वाकई आपके कमरे के लिए पर्याप्त हों — पहले हमारा AC टनेज कैलकुलेटर देखें ताकि आप ऐसे दो AC साइज़ की तुलना करें जो असल में आपकी जगह को ठंडा कर सकें, सिर्फ इसलिए अंडरसाइज़्ड विकल्प न चुनें कि वह चलाने में सस्ता दिखता है।',
  },
  {
    q: 'क्या यह मेरे असली बिजली टैरिफ का इस्तेमाल करता है?',
    a: 'हां — अपना DISCOM चुनें और दोनों विकल्प आपके राज्य के असली टॉप-स्लैब टैरिफ पर गिने जाते हैं।',
  },
  {
    q: 'मैं आउटपुट को सही तरीके से कैसे पढ़ूं?',
    a: 'हर तरफ आपके चुने DISCOM पर उस खास कॉन्फ़िगरेशन के लिए मासिक और सालाना खर्च दिखाता है। कार्ड के नीचे का अंतर आंकड़ा ऑप्शन A माइनस ऑप्शन B है — पॉज़िटिव नंबर का मतलब है ऑप्शन A ज़्यादा खर्चीला है, कम नहीं।',
  },
  {
    q: 'क्या मैं एक ही AC की दो अलग DISCOM पर तुलना कर सकता हूं?',
    a: 'इस टूल में सीधे नहीं — यह एक साझा DISCOM पर दो कॉन्फ़िगरेशन की तुलना करता है। एक ही AC को कई राज्यों में कीमत के हिसाब से देखने के लिए, हमारे AC रनिंग कॉस्ट कैलकुलेटर पर स्लैब तुलना देखें।',
  },
  {
    q: 'अगर दोनों विकल्प एक ही टनेज और स्टार रेटिंग के हों तो?',
    a: 'तब दोनों तरफ खर्च एक जैसा होगा — यह टूल तभी उपयोगी है जब ऑप्शन A और ऑप्शन B के बीच कम से कम एक वैरिएबल (टनेज, स्टार रेटिंग या घंटे) अलग हो।',
  },
  {
    q: 'क्या तुलना में रोज़ के इस्तेमाल के घंटे मायने रखते हैं?',
    a: 'हां — आप हर विकल्प के लिए अलग-अलग दैनिक घंटे भी सेट कर सकते हैं। यह, जैसे, रात में 10 घंटे इस्तेमाल होने वाले बेडरूम AC की शाम में 4 घंटे इस्तेमाल होने वाले लिविंग-रूम AC से तुलना करने में उपयोगी है।',
  },
  {
    q: 'क्या बड़ा इन्वर्टर AC हमेशा छोटे नॉन-इन्वर्टर AC से चलाने में सस्ता होता है?',
    a: 'अपने आप नहीं — यह टनेज के अंतर और स्टार-रेटिंग के अंतर दोनों पर निर्भर करता है। ऊपर "क्या ज़्यादा बड़ा, औसत-स्टार AC कभी छोटे, टॉप-स्टार AC से हार सकता है?" का असली गणना किया उदाहरण देखें।',
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

export default function AcComparisonPageHi() {
  const diff = exampleA.annualCost - exampleB.annualCost

  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/hi/ac' },
          { label: 'तुलना टूल', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="AC तुलना टूल"
        subtitle="किन्हीं भी दो AC कॉन्फ़िगरेशन की आमने-सामने तुलना करें — अलग टनेज, स्टार रेटिंग, या दोनों — आपके राज्य की असली रनिंग कॉस्ट पर।"
        stats={[
          { icon: '⚖️', big: 'A बनाम B', small: 'मुफ्त कॉन्फ़िगरेशन', tone: 'hub' },
          { icon: '📊', big: 'असली टैरिफ', small: 'आपके DISCOM पर आधारित', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '⚡', big: 'तुरंत', small: 'बिना लॉगिन', tone: 'hub' },
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
          उदाहरण गणना
        </h2>
        <p className="mt-2 text-ash/80">
          तमिलनाडु में रोज़ 8 घंटे पर, एक <strong>1-टन 5-स्टार</strong> AC का
          खर्च लगभग <strong>{formatINR(exampleA.annualCost)}/साल</strong> आता
          है, जबकि <strong>1.5-टन 3-स्टार</strong> यूनिट का{' '}
          <strong>{formatINR(exampleB.annualCost)}/साल</strong> —{' '}
          {diff > 0 ? 'छोटी, ज़्यादा-स्टार यूनिट' : 'बड़ी यूनिट'} लगभग{' '}
          {formatINR(Math.abs(diff))}/साल बचाती है, अगर दोनों कमरे को ठीक से
          ठंडा कर सकें।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          दो कॉन्फ़िगरेशन की तुलना करें
        </h2>
        <AcComparisonTool discoms={liveDiscoms} texts={acComparisonTextsHi} />
      </section>

      <section aria-labelledby="how-to-read" className="mb-10">
        <h2 id="how-to-read" className="font-display mb-4 text-2xl font-semibold">
          आउटपुट कैसे पढ़ें
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            हर तरफ वही आंकड़े दिखाता है जो रनिंग-कॉस्ट कैलकुलेटर एक अकेले AC के
            लिए देता है — मासिक खर्च, सालाना खर्च, और दैनिक यूनिट — अपनी
            टनेज, स्टार रेटिंग और घंटों के हिसाब से स्वतंत्र रूप से गिना गया।
            नीचे की अंतर लाइन ऑप्शन A माइनस ऑप्शन B है, इसलिए पॉज़िटिव नंबर का
            मतलब है A का सालाना खर्च ज़्यादा है।
          </p>
          <p>
            तुलना पर तभी भरोसा करें जब दोनों कॉन्फ़िगरेशन वाकई कमरे को ठीक से
            ठंडा कर सकें — एक छोटी यूनिट सिर्फ इसलिए सस्ती दिख सकती है क्योंकि
            वह अंडरसाइज़्ड है, ज़्यादा कुशल होने की वजह से नहीं। पहले टनेज की
            पर्याप्तता जांच लें।
          </p>
        </div>
      </section>

      <section aria-labelledby="scenarios" className="mb-10">
        <h2 id="scenarios" className="font-display mb-4 text-2xl font-semibold">
          जांचने लायक आम तुलनाएं
        </h2>
        <div className="space-y-4">
          {SCENARIOS.map((s) => {
            const diff = s.a.cost.annualCost - s.b.cost.annualCost
            return (
              <div
                key={s.question}
                className="rounded-xl border border-hairline bg-paper p-5"
              >
                <p className="font-display font-bold text-ink-navy">
                  {s.question}
                </p>
                <p className="mt-1 text-sm text-ash/70">
                  {s.a.label}: {formatINR(s.a.cost.annualCost)}/साल बनाम {s.b.label}:{' '}
                  {formatINR(s.b.cost.annualCost)}/साल (TNEB, 8h/दिन) —{' '}
                  {diff > 0 ? s.b.label : s.a.label} का खर्च{' '}
                  {formatINR(Math.abs(diff))}/साल कम है।
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/hi/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC टनेज कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पक्का कर लें कि दोनों साइज़ वाकई आपके कमरे के लिए सही हैं।
            </p>
          </Link>
          <Link
            href="/hi/ac/comparisons/3-star-vs-5-star-savings-guide"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⭐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              3★ बनाम 5★ बचत गाइड
            </p>
            <p className="mt-1 text-xs text-ash/60">
              वही टनेज, सिर्फ स्टार रेटिंग — विस्तृत ब्यौरे के साथ।
            </p>
          </Link>
          <Link
            href="/hi/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC रनिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              एक कॉन्फ़िगरेशन के लिए पूरा ब्यौरा।
            </p>
          </Link>
          <Link
            href="/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर से भरपाई करें
            </p>
            <p className="mt-1 text-xs text-ash/60">
              AC-भारी इस्तेमाल के हिसाब से रूफटॉप सिस्टम का पेबैक देखें।
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          अक्सर पूछे जाने वाले सवाल
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
