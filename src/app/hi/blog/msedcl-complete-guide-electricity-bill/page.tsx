import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/msedcl-complete-guide-electricity-bill'
const TITLE = 'MSEDCL (महावितरण) बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित MSEDCL टैरिफ स्लैब, फिक्स्ड चार्ज और ड्यूटी दर एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल और इंडस्ट्रियल टेबल, एक उदाहरण गणना, और अपना महावितरण बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '11 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '29 अगस्त 2026'

export const metadata: Metadata = {
  title: 'MSEDCL पूरी बिल गाइड — टैरिफ स्लैब, चार्ज और ड्यूटी 2026',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'article', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'ब्लॉग', path: '/blog' },
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
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'MSEDCL रेजिडेंशियल (LT-I) टैरिफ स्लैब',
  description: 'महाराष्ट्र (MSEDCL) के लिए टेलिस्कोपिक घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://www.mahadiscom.in/en/consumer/tariff-details/',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://www.mahadiscom.in/en/consumer/tariff-details/',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा MSEDCL बिजली बिल कैसे गिना जाता है?',
    a: 'आपके घरेलू MSEDCL बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (₹3.25 से ₹9.56/यूनिट तक चार बैंड), एक फ्लैट ₹150 फिक्स्ड चार्ज, और एनर्जी चार्ज पर 16% इलेक्ट्रिसिटी ड्यूटी जुड़ती है। आपके असली बिल में एक अलग व्हीलिंग चार्ज और एक फ्यूल एडजस्टमेंट चार्ज (FAC) भी शामिल है जो इस बुनियादी संरचना का हिस्सा नहीं हैं।',
  },
  {
    q: 'MSEDCL के मौजूदा घरेलू टैरिफ स्लैब क्या हैं?',
    a: 'पहली 100 यूनिट के लिए ₹3.25/यूनिट, 101–300 के लिए ₹6.14/यूनिट, 301–500 के लिए ₹8.45/यूनिट, और 500 से ऊपर ₹9.56/यूनिट — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर बिल होता है (टेलिस्कोपिक), आपकी पूरी खपत पर नहीं। 1 अप्रैल 2025 से प्रभावी।',
  },
  {
    q: 'MSEDCL बिल पर फिक्स्ड चार्ज किस पर आधारित है?',
    a: 'घरेलू कनेक्शन के लिए यह खपत चाहे जो भी हो, फ्लैट ₹150 प्रति महीना है। कमर्शियल कनेक्शन (20kW तक) फ्लैट ₹525/महीना चुकाते हैं, जबकि इंडस्ट्रियल कनेक्शन फ्लैट राशि की बजाय स्वीकृत लोड के प्रति kW ₹390 का डिमांड चार्ज चुकाते हैं।',
  },
  {
    q: 'क्या MSEDCL एक फ्यूल/पावर-परचेज़ एडजस्टमेंट लेता है?',
    a: 'MSEDCL एनर्जी और फिक्स्ड चार्ज के ऊपर एक अलग फ्यूल एडजस्टमेंट चार्ज (FAC) और एक व्हीलिंग चार्ज बिल करता है। हमारे सोर्स्ड डेटा में इनमें से किसी का भी मौजूदा सत्यापित दर उपलब्ध नहीं है, इसलिए इस गाइड की टेबल और कैलकुलेटर इन्हें शामिल नहीं करते — आपका असली बिल बुनियादी अनुमान से ज़्यादा होगा।',
  },
  {
    q: 'महाराष्ट्र में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'घरेलू और कमर्शियल कनेक्शन के लिए 16%, एनर्जी चार्ज पर लागू — किसी भी भारतीय राज्य की सबसे ऊंची इलेक्ट्रिसिटी ड्यूटी दरों में से एक। इंडस्ट्रियल ड्यूटी दर भरोसेमंद तरीके से सत्यापित नहीं है; द्वितीयक स्रोत करीब 7.5% और 9.3% के बीच अलग-अलग बताते हैं, इसलिए इंडस्ट्रियल ड्यूटी अनुमान को कम-भरोसेमंद मानें।',
  },
  {
    q: 'मैं अपना MSEDCL बिल ऑनलाइन कैसे जांचूं?',
    a: 'wss.mahadiscom.in पर MSEDCL वेब सेल्फ सर्विस पोर्टल पर जाएं या MahaVitaran ऐप खोलें, फिर अपना मौजूदा बिल और खपत इतिहास देखने के लिए अपना कंज़्यूमर नंबर डालें।',
  },
  {
    q: 'मैं अपना MSEDCL बिल कैसे चुकाऊं?',
    a: 'उसी वेब सेल्फ सर्विस पोर्टल या MahaVitaran ऐप के ज़रिए UPI, कार्ड या नेट बैंकिंग से भुगतान करें, और अपने रिकॉर्ड के लिए रसीद डाउनलोड करें। बिलिंग सवालों के लिए, MSEDCL की हेल्पलाइन 1912 या 1800-233-3435 है, जो 24×7 उपलब्ध है।',
  },
  {
    q: 'क्या MSEDCL मुंबई में बिजली सप्लाई करता है?',
    a: 'ज़्यादातर नहीं। ज़्यादातर मुंबई शहर तीन अलग निजी लाइसेंसधारियों — BEST, टाटा पावर और अदानी इलेक्ट्रिसिटी मुंबई — द्वारा सर्व किया जाता है, MSEDCL द्वारा नहीं। MSEDCL कुछ मुंबई उपनगर, जैसे मुलुंड और भांडुप, और बाकी महाराष्ट्र राज्य को कवर करता है।',
  },
  {
    q: 'MSEDCL अपनी टैरिफ दरों में कितनी बार संशोधन करता है?',
    a: 'टैरिफ महाराष्ट्र इलेक्ट्रिसिटी रेगुलेटरी कमीशन (MERC) द्वारा समय-समय पर, आम तौर पर एक बहु-वर्षीय टैरिफ ऑर्डर के ज़रिए संशोधित होते हैं — मौजूदा स्लैब 1 अप्रैल 2025 से लागू हुए। पुराने आंकड़ों पर भरोसा करने से पहले हमेशा ऊपर दिया कैलकुलेटर या MSEDCL का आधिकारिक पोर्टल जांचें।',
  },
  {
    q: 'मैं अपने इस्तेमाल के लिए अपना सटीक MSEDCL बिल कहां पा सकता हूं?',
    a: 'हमारा MSEDCL बिल कैलकुलेटर इस्तेमाल करें, जो इन्हीं सत्यापित स्लैब, फिक्स्ड चार्ज और ड्यूटी को आपकी अपनी यूनिट्स पर लागू करके एक ब्यौरेवार अनुमान देता है — हाथ से स्लैब गणित करने से तेज़ और कम गलती-प्रवण।',
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

const categoryRows: [string, string][] = [
  ['रेजिडेंशियल (घरेलू, LT-I)', 'घर — इस गाइड की टेबल जिस श्रेणी पर केंद्रित हैं'],
  ['कमर्शियल (LT-II(A), 20kW तक)', 'दुकानें, ऑफिस और छोटे व्यवसाय, 20kW तक के कनेक्टेड लोड पर'],
  ['इंडस्ट्रियल (LT-III, 20kW से ऊपर)', '20kW से ऊपर कनेक्टेड लोड वाली मैन्युफैक्चरिंग और इंडस्ट्रियल यूनिट'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 यूनिट', '₹3.25'],
  ['101–300 यूनिट', '₹6.14'],
  ['301–500 यूनिट', '₹8.45'],
  ['501+ यूनिट', '₹9.56'],
]

const fixedChargeRows: [string, string, string][] = [
  ['रेजिडेंशियल', 'फ्लैट', '₹150/महीना'],
  ['कमर्शियल (20kW तक)', 'फ्लैट', '₹525/महीना'],
  ['इंडस्ट्रियल (20kW से ऊपर)', 'स्वीकृत लोड के हिसाब से', '₹390/kW'],
]

const workedExample200: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स', '200'],
  ['स्लैब 1: 0–100 यूनिट @ ₹3.25', '₹325.00'],
  ['स्लैब 2: 100 यूनिट (101–200) @ ₹6.14', '₹614.00'],
  ['एनर्जी चार्ज सबटोटल', '₹939.00'],
  ['फिक्स्ड चार्ज (फ्लैट)', '₹150.00'],
  ['इलेक्ट्रिसिटी ड्यूटी (एनर्जी चार्ज का 16%)', '₹150.24'],
  ['अनुमानित कुल (सिर्फ बुनियादी संरचना)', '₹1,239.24'],
]

export default function MsedclCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'MSEDCL पूरी गाइड', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📋</span> पूरी रेफरेंस गाइड
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          लेखक:{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · प्रोज़ की आख़िरी समीक्षा {PROSE_LAST_REVIEWED} · टैरिफ डेटा हमारे
          सत्यापित रिकॉर्ड के आधार पर {TARIFF_DATA_REFRESHED} को अपडेट किया गया
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>MSEDCL</strong> — महाराष्ट्र स्टेट इलेक्ट्रिसिटी डिस्ट्रिब्यूशन
          कं. लिमिटेड, जिसे आम तौर पर <strong>महावितरण</strong> या महाडिस्कॉम कहा
          जाता है — वह सरकारी डिस्कॉम है जो लगभग पूरे महाराष्ट्र में बिजली बांटता
          है, जिसे{' '}
          <strong>महाराष्ट्र इलेक्ट्रिसिटी रेगुलेटरी कमीशन (MERC)</strong> नियंत्रित
          करता है। यह मुंबई शहर के ज़्यादातर हिस्से को कवर नहीं करता, जिसे तीन अलग
          निजी लाइसेंसधारी सर्व करते हैं। एक सामान्य MSEDCL घरेलू बिल में एक
          टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज, एक फ्लैट फिक्स्ड चार्ज, और 16%
          इलेक्ट्रिसिटी ड्यूटी शामिल होती है — साथ ही एक अलग व्हीलिंग चार्ज और फ्यूल
          एडजस्टमेंट चार्ज जिसे यह गाइड फ्लैग करती है लेकिन मॉडल नहीं करती, क्योंकि
          हमारे सोर्स्ड डेटा में इनमें से किसी का मौजूदा सत्यापित दर उपलब्ध नहीं है।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            MSEDCL उपभोक्ताओं को <strong>हर महीने</strong> बिल करता है (कई अन्य
            राज्यों के डिस्कॉम के उलट, बाई-मंथली नहीं)। इसका कवरेज लगभग पूरे
            महाराष्ट्र में फैला है, एक खास कार्व-आउट के साथ:{' '}
            <strong>ज़्यादातर मुंबई शहर</strong> को इसकी बजाय BEST, टाटा पावर और
            अदानी इलेक्ट्रिसिटी मुंबई सर्व करते हैं — MSEDCL सिर्फ कुछ मुंबई
            उपनगर, जैसे मुलुंड और भांडुप, और बाकी राज्य को कवर करता है। इन तीन
            मुंबई लाइसेंसधारियों में से किसी का भी इस साइट पर फिलहाल अपना कैलकुलेटर
            नहीं है; अगर आपका बिल MSEDCL या महावितरण की बजाय इनमें से किसी एक का
            नाम लेता है, तो इस गाइड के टैरिफ आप पर लागू नहीं होंगे।
          </p>
          <p className={`mt-3 ${pCls}`}>
            अगर आप स्क्रीनशॉट और न्यूज़-स्टाइल एंगल के साथ अपना बिल जांचने या
            चुकाने का स्टेप-बाय-स्टेप वॉकथ्रू ढूंढ रहे हैं, तो हमारा साथी पोस्ट
            देखें,{' '}
            <Link href="/hi/blog/mahavitaran-bill-kaise-check-kare" className="text-brass underline">
              महावितरण बिल: अपना MSEDCL बिल ऑनलाइन जांचें और चुकाएं
            </Link>
            । इस गाइड का काम अलग है — यह MSEDCL बिल की गणना बिल्कुल कैसे होती है
            इसके लिए एक स्थायी, व्यापक रेफरेंस है, जिसमें हर सत्यापित दर एक ही जगह
            है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: इस गाइड का इस्तेमाल करने से पहले अपने बिल पर लिखा सटीक नाम
            जांचें — यह MSEDCL/महावितरण कनेक्शन पर लागू होती है, मुंबई के तीन अलग
            निजी लाइसेंसधारियों पर नहीं।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल तीन MSEDCL उपभोक्ता श्रेणियों को कवर करता
            है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 font-semibold">यह किसे कवर करती है</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {categoryRows.map(([cat, desc]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: MSEDCL के पास नीचे न दिए गए ऊंचे-लोड वाले कमर्शियल और
            इंडस्ट्रियल बैंड भी हैं — यह मान लेने से पहले कि ये टेबल एक बड़े
            कनेक्शन पर लागू होती हैं, हर सेक्शन में दी गई चेतावनी देखें।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू (रेजिडेंशियल) टैरिफ स्लैब
          </h2>
          <p className={pCls}>
            MSEDCL घरेलू खपत को चार टेलिस्कोपिक स्लैब से बिल करता है, 1 अप्रैल
            2025 से प्रभावी — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर चार्ज होता है,
            आपकी पूरी खपत पर नहीं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्लैब</th>
                  <th className="px-4 py-2 text-right font-semibold">दर/यूनिट</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {domesticSlabs.map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            100 से 101 यूनिट पार करने पर आपकी मार्जिनल दर लगभग दोगुनी हो जाती है
            — इसके पीछे के सामान्य तंत्र के लिए{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>{' '}
            देखें। हाथ से स्लैब गणित करने की बजाय, तुरंत ब्यौरेवार अनुमान के लिए
            अपनी यूनिट्स{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: सिर्फ एक स्लैब के अंदर की यूनिट्स उस स्लैब की दर पर बिल होती
            हैं — आप कितनी भी ज़्यादा इस्तेमाल करें, पहली 100 यूनिट हमेशा ₹3.25
            पर रहती हैं।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल और इंडस्ट्रियल टैरिफ
          </h2>
          <p className={pCls}>
            हमने सोर्स की गई दोनों गैर-घरेलू श्रेणियां स्लैब की बजाय एक फ्लैट
            प्रति-यूनिट दर इस्तेमाल करती हैं, लेकिन दोनों के साथ एक असली कवरेज
            गैप है जो भरोसा करने से पहले जानना ज़रूरी है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 text-right font-semibold">दर/यूनिट</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">कमर्शियल (LT-II(A), 20kW तक)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹6.44</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">इंडस्ट्रियल (LT-III, 20kW से ऊपर)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹7.86</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            <strong>कमर्शियल चेतावनी:</strong> यह ₹6.44/यूनिट दर सिर्फ 20kW तक के
            कनेक्टेड लोड पर लागू होती है। ऊंचे कमर्शियल बैंड हमारे डेटा में मॉडल
            नहीं किए गए हैं — एक बड़ा कमर्शियल कनेक्शन (LT-II(B)/(C)) अलग तरीके
            से बिल होगा और यह टेबल उस बिल को काफी कम बताएगी।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>इंडस्ट्रियल चेतावनी:</strong> 20kW से नीचे के इंडस्ट्रियल
            कनेक्शन की दरें हमारे सोर्स्ड डेटा में नहीं मिलीं, और इंडस्ट्रियल
            इलेक्ट्रिसिटी ड्यूटी दर भी भरोसेमंद तरीके से सत्यापित नहीं है — किसी
            इंडस्ट्रियल बिल का अनुमान लगाने से पहले नीचे दिया ड्यूटी सेक्शन देखें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यहां दी गई दोनों गैर-घरेलू टेबल एक-एक खास लोड बैंड कवर
            करती हैं — आंकड़े पर भरोसा करने से पहले जांचें कि आपका कनेक्शन किस
            बैंड में आता है।
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            फिक्स्ड / डिमांड चार्ज
          </h2>
          <p className={pCls}>
            फिक्स्ड चार्ज उस महीने आपके असल इस्तेमाल चाहे जो भी हो, बिल होता है —
            घरेलू और कमर्शियल कनेक्शन के लिए यह एक फ्लैट मासिक राशि है, जबकि
            इंडस्ट्रियल कनेक्शन इसकी बजाय स्वीकृत लोड पर आधारित एक डिमांड चार्ज
            चुकाते हैं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 font-semibold">आधार</th>
                  <th className="px-4 py-2 text-right font-semibold">दर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {fixedChargeRows.map(([cat, basis, rate]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{basis}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: बहुत कम इस्तेमाल वाले महीने में भी आपका घरेलू फिक्स्ड
            चार्ज नहीं बदलता — यह आपकी मीटर रीडिंग से नहीं, आपके कनेक्शन से जुड़ा
            होता है।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            फ्यूल एडजस्टमेंट चार्ज (FAC) और व्हीलिंग चार्ज
          </h2>
          <p className={pCls}>
            MSEDCL ऊपर दिए एनर्जी और फिक्स्ड चार्ज के ऊपर एक अलग{' '}
            <strong>फ्यूल एडजस्टमेंट चार्ज (FAC)</strong> और एक प्रति-यूनिट{' '}
            <strong>व्हीलिंग चार्ज</strong> बिल करता है। इस तरह के चार्ज के पीछे
            के सामान्य तंत्र के लिए — यह क्यों मौजूद है और आपके इस्तेमाल से
            स्वतंत्र होकर ऊपर-नीचे क्यों जा सकता है — देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            ।
          </p>
          <p className={`mt-3 ${pCls}`}>
            हमारे पास फिलहाल इनमें से किसी भी MSEDCL चार्ज का सत्यापित, मौजूदा
            दर हमारे सोर्स्ड डेटा में नहीं है, इसलिए इनमें से कोई भी ऊपर की टेबल
            या MSEDCL कैलकुलेटर में मॉडल नहीं किया गया — एक अंदाज़े का आंकड़ा
            प्रकाशित करने की बजाय, हम इस गैप को साफ तौर पर फ्लैग कर रहे हैं।
            आपका असली महावितरण बिल इस गाइड और कैलकुलेटर के बुनियादी अनुमान से
            कुछ ज़्यादा होगा।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका असली MSEDCL बिल इस गाइड के उदाहरण गणना से ज़्यादा
            है, तो व्हीलिंग चार्ज और FAC सबसे संभावित वजह हैं, कोई गणना की गलती
            नहीं।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी और अन्य वैधानिक चार्ज
          </h2>
          <p className={pCls}>
            इलेक्ट्रिसिटी ड्यूटी एक <strong>महाराष्ट्र राज्य सरकार का टैक्स</strong>{' '}
            है जो आपके बिल पर वसूला जाता है, कोई ऐसा चार्ज नहीं जो MSEDCL तय करता
            या रखता है। घरेलू और कमर्शियल कनेक्शन के लिए यह{' '}
            <strong>एनर्जी चार्ज का 16%</strong> है — किसी भी भारतीय राज्य की
            सबसे ऊंची घरेलू इलेक्ट्रिसिटी ड्यूटी दरों में से एक, और आम तौर पर
            एनर्जी चार्ज के बाद महावितरण बिल की दूसरी सबसे बड़ी लाइन। तुलना के
            लिए, उत्तर प्रदेश इसी आधार पर सिर्फ 5% लेता है (हमारी{' '}
            <Link href="/hi/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL पूरी गाइड
            </Link>{' '}
            देखें), जबकि BESCOM और WBSEDCL दोनों में एक जैसा अपुष्ट-ड्यूटी गैप
            है — हमारी{' '}
            <Link href="/hi/blog/bescom-complete-guide-electricity-bill" className="text-brass underline">
              BESCOM
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL
            </Link>{' '}
            पूरी गाइड देखें।
          </p>
          <p className={`mt-3 ${pCls}`}>
            इंडस्ट्रियल कनेक्शन के लिए, हमारे पास भरोसेमंद तरीके से सत्यापित
            ड्यूटी दर नहीं है: द्वितीयक स्रोत अलग-अलग हैं, करीब 7.5% से 9.3% तक
            के आंकड़े बताते हुए, जो संभवतः 16% घरेलू-व्युत्पन्न दर से अलग है।
            जब तक कोई प्राइमरी MERC ऑर्डर सटीक आंकड़ा पुष्टि नहीं करता, किसी भी
            इंडस्ट्रियल ड्यूटी अनुमान को कम-भरोसेमंद मानें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: 16% ड्यूटी घरेलू और कमर्शियल बिलों के लिए भरोसेमंद है —
            इसी आंकड़े को एक इंडस्ट्रियल कनेक्शन पर लागू न करें।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना MSEDCL बिल कैसे जांचें और चुकाएं
          </h2>
          <p className={pCls}>
            सामान्य रास्ता, MSEDCL के अपने पोर्टल के ज़रिए (सटीक स्क्रीन समय के
            साथ बदल सकती हैं):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'wss.mahadiscom.in पर MSEDCL वेब सेल्फ सर्विस पोर्टल पर जाएं, या MahaVitaran ऐप खोलें।',
              'अपना मौजूदा बिल और खपत इतिहास पाने के लिए अपना कंज़्यूमर नंबर डालें।',
              'दिखाई गई राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें।',
              'अपने रिकॉर्ड के लिए रसीद डाउनलोड करें।',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-electricity font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={`mt-4 ${pCls}`}>
            बिलिंग सवालों या विवादों के लिए, MSEDCL की हेल्पलाइन{' '}
            <strong>1912 या 1800-233-3435</strong> है, जो 24×7 उपलब्ध है — यह गाइड
            और हमारा कैलकुलेटर अनुमान लगाने वाले टूल हैं, अकाउंट-विशिष्ट मामलों
            के लिए आपके असली बिल या MSEDCL के अपने पोर्टल का विकल्प नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: किसी भी अकाउंट-विशिष्ट चीज़ के लिए — बकाया, विवादित रीडिंग,
            नाम बदलना — कैलकुलेटर की बजाय सीधे आधिकारिक पोर्टल या हेल्पलाइन पर
            जाएं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: 200 यूनिट, घरेलू कनेक्शन
          </h2>
          <p className={pCls}>
            ऊपर दिए सत्यापित स्लैब का इस्तेमाल करते हुए, यहां एक महीने में 200
            यूनिट इस्तेमाल करने वाले घरेलू कनेक्शन के लिए पूरी गणना है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample200.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample200.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample200.length - 1
                          ? 'font-display font-bold text-hub-electricity'
                          : 'text-ink-navy'
                      }`}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            यह ₹1,239.24 सिर्फ यहां मॉडल किए गए एनर्जी चार्ज, फिक्स्ड चार्ज और
            इलेक्ट्रिसिटी ड्यूटी को कवर करता है — आपके असली बिल में ऊपर बताए गए
            व्हीलिंग चार्ज और FAC भी शामिल हैं, साथ ही बकाया या पिछला बैलेंस जैसी
            कोई भी अकाउंट-विशिष्ट चीज़, इसलिए उम्मीद करें कि आपके MSEDCL बिल का
            असली आंकड़ा कुछ ज़्यादा होगा। घरेलू के अलावा किसी भी श्रेणी सहित अपनी
            सटीक यूनिट्स{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: 200 यूनिट पर, अकेले ड्यूटी (₹150.24) लगभग पूरे फ्लैट फिक्स्ड
            चार्ज जितनी है — यह सीधा दिखाता है कि महाराष्ट्र का 16% व्यवहार में
            असल में कितना बड़ा है।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/electricity/msedcl-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                MSEDCL बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इन्हीं सत्यापित स्लैब पर आधारित आपका अपना ब्यौरेवार अनुमान।
              </p>
            </Link>
            <Link
              href="/hi/blog/mahavitaran-bill-kaise-check-kare"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                महावितरण बिल: जांचें और चुकाएं गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इस रेफरेंस गाइड का स्टेप-बाय-स्टेप साथी।
              </p>
            </Link>
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                MSEDCL के चार बैंड के पीछे का सामान्य तंत्र।
              </p>
            </Link>
            <Link
              href="/hi/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                फिक्स्ड चार्ज बनाम FCA समझाया गया
              </p>
              <p className="mt-1 text-xs text-ash/60">
                आपकी यूनिट्स न बदलने पर भी आपका बिल क्यों बदलता है।
              </p>
            </Link>
            <Link
              href="/hi/blog/bescom-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                BESCOM पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                कर्नाटक की गृह ज्योति फ्री-यूनिट्स योजना देखें।
              </p>
            </Link>
          </div>
        </section>

        <section aria-labelledby="faq" className="mt-10 scroll-mt-20">
          <h2 id="faq" className={h2Cls}>
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

        <p className="mt-10 text-sm text-ash/40">
          प्रोज़ की आख़िरी समीक्षा: {PROSE_LAST_REVIEWED}। टैरिफ डेटा हमारे
          सत्यापित रिकॉर्ड के आधार पर {TARIFF_DATA_REFRESHED} को अपडेट किया गया,{' '}
          <a
            href="https://www.mahadiscom.in/en/consumer/tariff-details/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            mahadiscom.in
          </a>{' '}
          और MERC के टैरिफ ऑर्डर से सोर्स किया गया, 1 अप्रैल 2025 से प्रभावी।
          कमर्शियल और इंडस्ट्रियल आंकड़े सिर्फ ऊपर बताए लोड बैंड को कवर करते हैं;
          व्हीलिंग चार्ज, FAC और इंडस्ट्रियल ड्यूटी दर स्पष्ट रूप से प्राइमरी-सोर्स
          पुष्टि के लंबित रहते हुए मॉडल नहीं की गई हैं। दरें समय-समय पर संशोधित
          होती हैं — ऊपर दिया कैलकुलेटर मौजूदा रखा जाता है; इस लेख को उसके साथ
          एक व्याख्यात्मक रेफरेंस के रूप में लें। इस साइट पर हम टैरिफ डेटा कैसे
          सोर्स और सत्यापित करते हैं, इसके लिए हमारी{' '}
          <Link href="/hi/methodology" className="text-brass underline">
            मेथडोलॉजी
          </Link>{' '}
          देखें।
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
