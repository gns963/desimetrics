import type { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import PageHero from '@/components/PageHero'
import StarComparisonTool, { type StarComparisonToolTexts } from '@/components/calculators/StarComparisonTool'
import { AC_PRODUCTS } from '@/data/ac-products'
import discomsJson from '@/data/discoms.json'
import { ISEER_BY_STAR, acDailyUnits, marginalRatePerUnit } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/comparisons/3-star-vs-5-star-savings-guide'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const rate = marginalRatePerUnit('TNEB')
const saving = Math.round(
  (acDailyUnits(1.5, 3, 8) - acDailyUnits(1.5, 5, 8)) * 365 * rate,
)

const three = AC_PRODUCTS.find((p) => p.starRating === 3 && p.tonnage === 1.5)!
const five = AC_PRODUCTS.find((p) => p.starRating === 5 && p.tonnage === 1.5)!
const priceDiff = five.price - three.price

const USAGE_SCENARIOS = [4, 6, 8, 10, 12].map((hours) => {
  const annualSaving = Math.round(
    (acDailyUnits(1.5, 3, hours) - acDailyUnits(1.5, 5, hours)) * 365 * rate,
  )
  return {
    hours,
    annualSaving,
    paybackYears: annualSaving > 0 ? priceDiff / annualSaving : null,
  }
})

export const metadata: Metadata = {
  title: '3 स्टार बनाम 5 स्टार AC — बचत गाइड 2026 (क्या 5 स्टार लेना सही है?)',
  description:
    'इंटरैक्टिव 3-स्टार बनाम 5-स्टार AC तुलना। अपने इस्तेमाल के घंटों और DISCOM टैरिफ के हिसाब से 5-स्टार इन्वर्टर AC की सटीक सालाना बिजली बचत देखें, और क्या ज़्यादा कीमत वसूल होती है।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac/comparisons/3-star-vs-5-star-savings-guide'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'article', locale: 'hi_IN' },
}

const faqs = [
  {
    q: 'क्या 5-स्टार AC अतिरिक्त पैसे के लायक है?',
    a: 'आम तौर पर हां, अगर आप AC रोज़ 6+ घंटे चलाते हैं। 5-स्टार इन्वर्टर AC, 3-स्टार से लगभग 20–25% कम बिजली इस्तेमाल करता है, और कीमत का अंतर आम तौर पर 3–4 कूलिंग सीज़न में वसूल हो जाता है।',
  },
  {
    q: '5-स्टार AC साल में कितनी बचत करता है?',
    a: `तमिलनाडु में रोज़ 8 घंटे चलने वाले 1.5 टन यूनिट के लिए, 5-स्टार, 3-स्टार के मुकाबले साल में लगभग ${formatINR(saving)} बचाता है। इस्तेमाल के घंटे और ज़्यादा बिजली टैरिफ के साथ बचत बढ़ती है।`,
  },
  {
    q: 'क्या स्टार रेटिंग सालों के बीच बदलती है?',
    a: 'हां। BEE समय-समय पर ISEER स्तर बदलता है, इसलिए कुछ साल पहले 5-स्टार रेट किया गया मॉडल आज कम रेटिंग का हो सकता है। हमेशा मौजूदा BEE लेबल जांचें।',
  },
  {
    q: 'BEE स्टार रेटिंग असल में क्या मापती है?',
    a: `यह ISEER (Indian Seasonal Energy Efficiency Ratio) पर आधारित है — पूरे सीज़न में दी गई कुल ठंडक और इस्तेमाल हुई कुल बिजली का अनुपात। BEE हर स्टार स्तर के लिए ISEER बैंड तय करता है: 3-स्टार यूनिट लगभग ISEER ${ISEER_BY_STAR[3]} पर होती है, 5-स्टार लगभग ISEER ${ISEER_BY_STAR[5]} पर। ज़्यादा ISEER का मतलब है बिजली की हर यूनिट से ज़्यादा ठंडक।`,
  },
  {
    q: 'क्या "इन्वर्टर" और "5-स्टार" एक ही चीज़ हैं?',
    a: 'नहीं — इन्वर्टर कंप्रेसर तकनीक (फिक्स्ड-स्पीड की बजाय वेरिएबल-स्पीड) को कहते हैं, जबकि स्टार रेटिंग सिर्फ मापी गई ISEER दक्षता के बारे में है। असल में आज बिकने वाला लगभग हर 5-स्टार स्प्लिट AC इन्वर्टर मॉडल ही होता है, क्योंकि इन्वर्टर कंप्रेसर ही उस दक्षता बैंड को हासिल करने योग्य बनाते हैं, लेकिन दोनों लेबल अलग-अलग चीज़ें मापते हैं।',
  },
  {
    q: 'क्या 5-स्टार AC, 3-स्टार से कमरे को तेज़ी से ठंडा करता है?',
    a: 'ज़रूरी नहीं — ठंडा होने की रफ़्तार मुख्य रूप से कमरे के साइज़ से मेल खाती टनेज पर निर्भर करती है, स्टार रेटिंग पर नहीं। एक ही टनेज के सही साइज़ के 3-स्टार और 5-स्टार यूनिट लगभग एक जैसी रफ़्तार से ठंडा करते हैं; 5-स्टार बस इसे कम बिजली में करता है।',
  },
  {
    q: 'क्या इस्तेमाल का पैटर्न तय करता है कि 5-स्टार लेना सही है या नहीं?',
    a: `हां, काफी हद तक — ऊपर इस्तेमाल-आधारित पेबैक तालिका देखें। हल्के इस्तेमाल (4h/दिन) पर पेबैक सामान्य मालिकाना अवधि से काफी आगे तक खिंच जाता है; भारी इस्तेमाल (12h/दिन) पर यह 2 साल से कम हो सकता है।`,
  },
  {
    q: 'क्या मुझे स्टार रेटिंग की तुलना टनेज से अलग करनी चाहिए?',
    a: 'नहीं — हमेशा एक ही टनेज पर स्टार रेटिंग की तुलना करें। एक छोटा 5-स्टार यूनिट और एक बड़ा 3-स्टार यूनिट, स्टार-रेटिंग के अंतर के बावजूद चलाने में लगभग बराबर खर्चीले हो सकते हैं, क्योंकि टनेज का खपत पर अपना बड़ा असर होता है। दोनों को स्वतंत्र रूप से बदलना चाहते हैं तो हमारा AC तुलना टूल इस्तेमाल करें।',
  },
  {
    q: 'क्या कम-टैरिफ वाले राज्य में 5-स्टार AC लेना सही है?',
    a: 'टैरिफ चाहे जो भी हो, बिजली बचत का प्रतिशत एक जैसा रहता है, लेकिन कम-टैरिफ राज्य में ₹ बचत — और इसलिए पेबैक अवधि — कम हो जाती है। यह मानने की बजाय कि तमिलनाडु का उदाहरण आप पर भी लागू होता है, अपने असली ब्रेक-ईवन के लिए ऊपर अपने DISCOM के साथ स्लाइडर इस्तेमाल करें।',
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
  name: '3 Star vs 5 Star AC Savings Comparison Tool',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
  { name: '3 स्टार बनाम 5 स्टार', path: PATH },
])

const starComparisonTextsHi: StarComparisonToolTexts = {
  title: '3★ बनाम 5★ बचत',
  subtitle: 'असली सालाना खर्च का अंतर देखें',
  discomLabel: 'DISCOM / राज्य',
  tonnageLegend: 'टनेज',
  tonOptions: [
    { value: '1', label: '1 टन', icon: '❄️' },
    { value: '1.5', label: '1.5 टन', icon: '❄️' },
    { value: '2', label: '2 टन', icon: '🥶' },
  ],
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'बचत की तुलना करें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  threeStarCostLabel: '3-स्टार सालाना खर्च',
  fiveStarCostLabel: '5-स्टार सालाना खर्च',
  savesLabel: '5-स्टार आपकी इतनी बचत करता है',
  perYearSuffix: '/साल',
  tenYearTemplate: '≈ {tenYear}, 10 साल में (at {rate}/यूनिट)',
}

export default function StarComparisonPageHi() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/hi/ac' },
          { label: '3 स्टार बनाम 5 स्टार', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="3 स्टार बनाम 5 स्टार AC: बचत गाइड"
        subtitle={
          <>
            5-स्टार AC शुरू में ज़्यादा खर्चीला है पर कम बिजली इस्तेमाल करता है।
            अपने इस्तेमाल और <strong>आपके DISCOM के टैरिफ</strong> के लिए सटीक
            सालाना अंतर देखने के लिए नीचे स्लाइडर इस्तेमाल करें। तमिलनाडु में
            रोज़ 8 घंटे चलने वाले 1.5 टन यूनिट के लिए, 5-स्टार लगभग{' '}
            <strong>{formatINR(saving)}/साल</strong> बचाता है।
          </>
        }
        stats={[
          { icon: '⚡', big: '~20–25%', small: 'कम बिजली', tone: 'spark-teal' },
          { icon: '📆', big: '3–4 सीज़न', small: 'सामान्य पेबैक', tone: 'hub' },
          { icon: '💰', big: formatINR(saving), small: 'TNEB, 1.5T, 8h/दिन', tone: 'hub' },
          { icon: '📊', big: 'कोई भी DISCOM', small: 'आपके अनुसार', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="tool" className="mb-10">
        <h2 id="tool" className="font-display mb-4 text-2xl font-semibold">
          इस्तेमाल और DISCOM के हिसाब से तुलना करें
        </h2>
        <StarComparisonTool discoms={liveDiscoms} texts={starComparisonTextsHi} />
      </section>

      {/* Contextual affiliate: the two units being compared */}
      <section aria-labelledby="the-two" className="mb-10">
        <h2 id="the-two" className="font-display mb-4 text-2xl font-semibold">
          दोनों यूनिट, आमने-सामने
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AffiliateProductCard product={three} highlight="कम शुरुआती कीमत" />
          <AffiliateProductCard product={five} highlight="कम रनिंग कॉस्ट" />
        </div>
        <p className="mt-2 text-xs text-ash/40">
          सांकेतिक कीमत वाले उदाहरण मॉडल — हमारा{' '}
          <Link href="/affiliate-disclosure" className="underline">
            affiliate disclosure
          </Link>{' '}
          देखें।
        </p>
      </section>

      <section aria-labelledby="criteria" className="mb-10">
        <h2 id="criteria" className="font-display mb-4 text-2xl font-semibold">
          BEE स्टार रेटिंग असल में कैसे तय करता है
        </h2>
        <p className="mb-4 text-ash/80">
          Bureau of Energy Efficiency (BEE) हर AC मॉडल को टेस्ट करता है और
          उसे ISEER (Indian Seasonal Energy Efficiency Ratio) से रेट करता है
          — यह पूरे सीज़न में कुल ठंडक आउटपुट और कुल बिजली इनपुट का अनुपात है,
          किसी एक-पल के लोड टेस्ट का नहीं। ज़्यादा ISEER का मतलब है कि पूरे
          सीज़न में उसी कमरे को कम बिजली से ठंडा किया जा सकता है:
        </p>
        <div className="grid grid-cols-5 gap-2 text-center">
          {Object.entries(ISEER_BY_STAR)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([star, iseer]) => (
              <div
                key={star}
                className="rounded-lg border border-hairline bg-mist px-2 py-2"
              >
                <p className="font-display text-sm font-bold text-hub-ac">{star}★</p>
                <p className="text-xs text-ash/60">
                  ISEER {iseer}
                </p>
              </div>
            ))}
        </div>
        <p className="mt-3 text-xs text-ash/50">
          BEE समय-समय पर ये स्तर बदलता है — ऊपर के बैंड वही हैं जो हमारा
          कैलकुलेटर इंजन अभी इस्तेमाल करता है। किसी खास मॉडल के BEE लेबल पर
          छपा साल हमेशा जांच लें।
        </p>
      </section>

      <section aria-labelledby="usage-payback" className="mb-10">
        <h2 id="usage-payback" className="font-display mb-2 text-2xl font-semibold">
          क्या कीमत का प्रीमियम वसूल होता है? इस्तेमाल के पैटर्न के हिसाब से
        </h2>
        <p className="mb-4 text-sm text-ash/60">
          वही 1.5 टन यूनिट, ऊपर दोनों मॉडल के बीच वही {formatINR(priceDiff)}{' '}
          सांकेतिक कीमत का अंतर, तमिलनाडु में — दैनिक घंटे बढ़ने के साथ पेबैक
          तेज़ी से घटता है:
        </p>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">रोज़ का इस्तेमाल</th>
                <th className="px-4 py-2 text-right font-semibold">सालाना बचत</th>
                <th className="px-4 py-2 text-right font-semibold">पेबैक अवधि</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {USAGE_SCENARIOS.map((s) => (
                <tr key={s.hours}>
                  <td className="px-4 py-2 font-medium">{s.hours} h/दिन</td>
                  <td className="px-4 py-2 text-right tabular-nums text-spark-teal">
                    {formatINR(s.annualSaving)}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold tabular-nums text-hub-ac">
                    {s.paybackYears ? `${s.paybackYears.toFixed(1)} साल` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ash/50">
          एक AC आम तौर पर 10-15 साल चलता है, इसलिए 4-5 साल से कम का कोई भी
          पेबैक बाद में सालों की वाकई मुफ्त बचत छोड़ जाता है।
        </p>
      </section>

      <section aria-labelledby="verdict" className="mb-10">
        <h2 id="verdict" className="font-display mb-4 text-2xl font-semibold">
          तो, क्या 5-स्टार लेना सही है?
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            आप AC जितने ज़्यादा घंटे चलाते हैं और आपका बिजली टैरिफ जितना ऊंचा
            है, 5-स्टार अपनी कीमत का प्रीमियम उतनी ही तेज़ी से वसूल कर लेता है।
            हल्के इस्तेमाल वाले (दिन में 2–3 घंटे) 3-स्टार इन्वर्टर से भी काम
            चला सकते हैं; ऊंचे-टैरिफ राज्यों में भारी इस्तेमाल करने वाले लगभग
            हमेशा 5-स्टार के साथ फायदे में रहते हैं।
          </p>
          <p>
            अपना असली ब्रेक-ईवन देखने के लिए ऊपर अपने असली इस्तेमाल और DISCOM
            के साथ स्लाइडर इस्तेमाल करें।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/hi/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC रनिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              किसी खास AC के लिए पूरा मासिक और सालाना खर्च पाएं।
            </p>
          </Link>
          <Link
            href="/hi/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC टनेज कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पक्का कर लें कि आप अपने कमरे के लिए सही साइज़ की तुलना कर रहे हैं।
            </p>
          </Link>
          <Link
            href="/hi/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              बिजली बिल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपने DISCOM के असली टैरिफ स्लैब जांचें।
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
