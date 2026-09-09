import type { Metadata } from 'next'
import Link from 'next/link'
import RoomCoolingTimeCalculator, {
  type RoomCoolingTimeCalculatorTexts,
} from '@/components/calculators/RoomCoolingTimeCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { estimateCoolingTime } from '@/lib/calc/cooling'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/room-cooling-time-calculator'

const example = estimateCoolingTime({ areaSqFt: 150, ceilingHeightFt: 9, dropTempC: 6, acTon: 1.5 })

export const metadata: Metadata = {
  title: 'रूम कूलिंग टाइम कैलकुलेटर 2026 — AC पुल-डाउन समय अनुमान',
  description:
    'असली थर्मोडायनामिक फॉर्मूला इस्तेमाल करते हुए, आपके AC को कमरे की हवा को एक तय तापमान तक ठंडा करने में लगने वाले सैद्धांतिक न्यूनतम समय का अनुमान लगाएं — कोई अंदाज़ी गुणक नहीं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/room-cooling-time-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Room Cooling Time Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'रूम कूलिंग टाइम कैलकुलेटर', path: PATH },
])

const roomCoolingTextsHi: RoomCoolingTimeCalculatorTexts = {
  title: 'रूम कूलिंग टाइम कैलकुलेटर',
  subtitle: 'आपके कमरे की हवा को ठंडा करने का सैद्धांतिक न्यूनतम समय',
  areaLabel: 'कमरे का क्षेत्रफल',
  areaUnit: 'sq ft',
  dropLabel: 'ज़रूरी तापमान गिरावट',
  dropUnit: '°C',
  dropHint: '9 ft की छत की ऊंचाई मानता है।',
  tonLegend: 'AC साइज़',
  tonOptions: [
    { value: '1', label: '1 टन', icon: '❄️' },
    { value: '1.5', label: '1.5 टन', icon: '❄️' },
    { value: '2', label: '2 टन', icon: '🥶' },
  ],
  ctaLabel: 'कूलिंग टाइम अनुमान लगाएं',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  resultLabel: 'सैद्धांतिक न्यूनतम समय',
  minUnit: 'मिनट',
}

const faqs = [
  {
    q: 'असली कमरे को इस अनुमान से ज़्यादा समय क्यों लगता है?',
    a: 'यह कैलकुलेटर एक संकरे सवाल का जवाब देता है: अगर कोई नई गर्मी न आए, तो AC कमरे की हवा में मौजूद गर्मी को कितनी तेज़ी से हटा सकता है। असल में, दीवारें, खिड़कियां, छत और कमरे में मौजूद लोग AC चलते समय लगातार गर्मी जोड़ते रहते हैं, इसलिए असली पुल-डाउन में हमेशा ज़्यादा समय लगता है — गर्म दिन या खराब इंसुलेशन वाले कमरे में अक्सर काफी ज़्यादा।',
  },
  {
    q: 'फिर भी यह एक उपयोगी नंबर क्यों है?',
    a: 'यह एक असली फिज़िक्स-आधारित निचली सीमा है, अंदाज़ा नहीं — परिदृश्यों की तुलना करने के लिए उपयोगी (एक बड़ा AC बनाम छोटा, एक बड़ी गिरावट बनाम छोटी) भले ही असली-दुनिया का समय ज़्यादा होगा।',
  },
  {
    q: 'यह किन मान्यताओं का इस्तेमाल करता है?',
    a: 'मानक हवा घनत्व (0.075 lb/ft³) और हवा की विशिष्ट ऊष्मा (0.24 BTU/lb·°F) — पाठ्यपुस्तक भौतिक स्थिरांक — साथ ही एक मान्य 9 ft छत की ऊंचाई और 75% सेंसिबल हीट रेशियो (AC की क्षमता का वह हिस्सा जो डीह्यूमिडिफिकेशन की बजाय तापमान ठंडा करने में जाता है), स्प्लिट AC के लिए सामान्य।',
  },
  {
    q: 'अगर असली कमरे को इससे कहीं ज़्यादा समय लगे तो क्या मेरा AC अंडरसाइज़्ड है?',
    a: 'ज़रूरी नहीं — यह अंतर अपेक्षित है और अपने आप में यह मतलब नहीं कि आपका AC अंडरसाइज़्ड है। अगर कूलिंग लगातार धीमी है या गर्म दिनों में AC कभी सेट तापमान तक ठीक से नहीं पहुंच पाता, तो यूनिट कमरे के लिए सही साइज़ की है या नहीं यह पक्का करने के लिए हमारा AC टनेज कैलकुलेटर देखें।',
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

export default function RoomCoolingTimePageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'रूम कूलिंग टाइम कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="रूम कूलिंग टाइम कैलकुलेटर"
        subtitle={
          <>
            आपका AC आपके कमरे की हवा को कितनी तेज़ी से ठंडा कर सकता है, इसका
            एक असली फिज़िक्स-आधारित अनुमान — स्पष्ट रूप से एक सैद्धांतिक
            न्यूनतम, असली-दुनिया की भविष्यवाणी नहीं। हम इस अंतर को छुपाने की
            बजाय समझाते हैं।
          </>
        }
        stats={[
          { icon: '🧮', big: 'Q=mcΔT', small: 'फिज़िक्स फॉर्मूला', tone: 'hub' },
          { icon: '💧', big: '75%', small: 'सेंसिबल हीट रेशियो', tone: 'hub' },
          { icon: '📐', big: '9 ft', small: 'मान्य छत', tone: 'hub' },
          { icon: '⏱️', big: 'सिर्फ न्यूनतम', small: 'सैद्धांतिक सीमा', tone: 'hub' },
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
          एक <strong>1.5 टन AC</strong> से ठंडा किए जा रहे{' '}
          <strong>150 sq ft कमरे</strong> (9 ft छत) को{' '}
          {example.dropTempC}°C गिराने में — सिर्फ हवा के लिए, बिना किसी
          जारी गर्मी बढ़ोतरी के — लगभग{' '}
          <strong>{example.minutesToCoolAirOnly} मिनट</strong> लगेंगे।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने कूलिंग टाइम का अनुमान लगाएं
        </h2>
        <RoomCoolingTimeCalculator texts={roomCoolingTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है — और इसकी असली सीमा
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>हटाने के लिए गर्मी।</strong> Q (BTU) = कमरे का आयतन
            (ft³) × 0.075 (हवा घनत्व, lb/ft³) × 0.24 (हवा की विशिष्ट ऊष्मा,
            BTU/lb·°F) × तापमान गिरावट (°F) — असली भौतिक स्थिरांक इस्तेमाल
            करते हुए मानक सेंसिबल-हीट फॉर्मूला।
          </p>
          <p>
            <strong>AC की असरदार कूलिंग दर।</strong> हम AC की रेटेड BTU/hr
            (टनेज × 12,000) लेते हैं और 75% सेंसिबल हीट रेशियो लगाते हैं,
            क्योंकि AC की कुछ क्षमता तापमान घटाने की बजाय नमी हटाने में जाती
            है।
          </p>
          <p>
            <strong>यह जान-बूझकर क्या छोड़ता है।</strong> दीवारें, खिड़कियां,
            छत, धूप और लोग सभी असली कमरे में लगातार गर्मी जोड़ते हैं — यह
            कैलकुलेटर सिर्फ पहले से मौजूद हवा को ध्यान में रखता है। इसीलिए
            इसे सैद्धांतिक न्यूनतम कहा गया है, असली-दुनिया के प्रदर्शन का
            वादा नहीं।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC टनेज कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पक्का नहीं कि यह आपके कमरे के लिए सही AC साइज़ है? पहले जांच लें।
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
              इस AC को रोज़ चलाने में असल में कितना खर्च आता है।
            </p>
          </Link>
          <Link
            href="/hi/appliances/water-tank-filling-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🚰</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              पानी टैंक फिल टाइम
            </p>
            <p className="mt-1 text-xs text-ash/60">
              एक और सरल फिज़िक्स-आधारित घरेलू-उपयोगिता टाइमर।
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
