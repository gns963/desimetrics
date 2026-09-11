import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/bescom-complete-guide-electricity-bill'
const TITLE = 'BESCOM बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित BESCOM टैरिफ स्लैब, गृह ज्योति फ्री-यूनिट्स नियम, KERC सरचार्ज और फिक्स्ड चार्ज एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल, इंडस्ट्रियल और कृषि टेबल, दो उदाहरण गणना, और अपना बैंगलोर बिजली बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '11 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '29 अगस्त 2026'

export const metadata: Metadata = {
  title: 'BESCOM पूरी बिल गाइड — टैरिफ, गृह ज्योति और चार्ज 2026',
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
  name: 'BESCOM रेजिडेंशियल (LT-2a) टैरिफ स्लैब',
  description: 'कर्नाटक (BESCOM) के लिए टेलिस्कोपिक शहरी घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://karnatakaelectricitybillcalculator.in/',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://karnatakaelectricitybillcalculator.in/',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा BESCOM बिजली बिल कैसे गिना जाता है?',
    a: 'आपके घरेलू BESCOM बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (₹5.90 से ₹8.60/यूनिट), स्वीकृत लोड के प्रति kW ₹110 का फिक्स्ड चार्ज, और एक ₹0.36/यूनिट KERC सरचार्ज जुड़ता है। ज़्यादातर घरों को गृह ज्योति के तहत कुछ यूनिट मुफ्त भी मिलती हैं, जो उनके अपने बेसलाइन औसत तक सीमित है।',
  },
  {
    q: "BESCOM के मौजूदा घरेलू (LT-2a) टैरिफ स्लैब क्या हैं?",
    a: 'पहली 100 यूनिट के लिए ₹5.90/यूनिट, 101–200 के लिए ₹7.25/यूनिट, और 200 से ऊपर ₹8.60/यूनिट — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर बिल होता है। 1 अप्रैल 2025 से प्रभावी, अलग गृह ज्योति फ्री-यूनिट्स फायदा और KERC सरचार्ज लागू होने से पहले।',
  },
  {
    q: 'गृह ज्योति असल में कैसे तय करती है कि मेरी बिजली मुफ्त है?',
    a: 'आपका मुफ्त भत्ता आपके घर के पिछले साल के औसत मासिक इस्तेमाल पर एक बफर के साथ है, जो 200 यूनिट तक सीमित है — यह अपने आप हर किसी के लिए 200 यूनिट नहीं है। अपनी बेसलाइन के भीतर रहें और वे यूनिट्स मुफ्त हैं; किसी महीने में इसे पार करें तो आप आम तौर पर उस पूरे महीने का पूरा बिल चुकाते हैं, सिर्फ अपनी बेसलाइन से ऊपर की यूनिट्स नहीं।',
  },
  {
    q: 'BESCOM बिल पर फिक्स्ड चार्ज किस पर आधारित है?',
    a: 'घरेलू कनेक्शन के लिए यह स्वीकृत लोड के प्रति kW ₹110 प्रति महीना है — इसलिए एक 2kW कनेक्शन खपत चाहे जो भी हो, फिक्स्ड चार्ज में ₹220 चुकाता है। कमर्शियल (₹210/kW) और इंडस्ट्रियल (₹180/kW) कनेक्शन की अपनी अलग प्रति-kW दरें हैं।',
  },
  {
    q: 'क्या BESCOM एक फ्यूल/पावर-परचेज़ एडजस्टमेंट लेता है?',
    a: 'हां — अप्रैल 2025 से KERC द्वारा शुरू किया गया एक ₹0.36/यूनिट सरचार्ज, जो हर उपभोक्ता श्रेणी में स्लैब दरों के ऊपर लागू होता है। यह आपके बिल पर अपने खुद के "स्लैब" के रूप में नहीं दिखेगा लेकिन आपकी इस्तेमाल की हर यूनिट पर कुल में जुड़ता है।',
  },
  {
    q: 'कर्नाटक में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'हमारे सोर्स्ड डेटा में BESCOM घरेलू कनेक्शन के लिए एक सत्यापित इलेक्ट्रिसिटी ड्यूटी दर नहीं है — हमारा कैलकुलेटर फिलहाल 0% लागू करता है, लेकिन यह एक अपुष्ट प्लेसहोल्डर है, कोई पुष्ट शून्य-ड्यूटी नीति नहीं। असली वसूली गई राशि के लिए अपने बिल की ड्यूटी लाइन जांचें।',
  },
  {
    q: 'मैं अपना BESCOM बिल ऑनलाइन कैसे जांचूं?',
    a: 'bescom.co.in पर आधिकारिक BESCOM वेबसाइट पर जाएं या BESCOM Mithra ऐप खोलें, फिर अपना मौजूदा बिल और खपत इतिहास देखने के लिए अपना अकाउंट ID (RR नंबर) डालें।',
  },
  {
    q: 'मैं अपना BESCOM बिल कैसे चुकाऊं?',
    a: 'उसी वेबसाइट या Mithra ऐप के ज़रिए UPI, कार्ड या नेट बैंकिंग से भुगतान करें, और डिजिटल रसीद सेव करें। आउटेज या बिलिंग समस्याओं के लिए, BESCOM की हेल्पलाइन 1912 है, जो 24×7 उपलब्ध है।',
  },
  {
    q: 'क्या BESCOM पूरे बैंगलोर और कर्नाटक को कवर करता है?',
    a: 'BESCOM बैंगलोर अर्बन और बैंगलोर रूरल ज़िलों के साथ छह पड़ोसी ज़िलों (चिक्काबल्लापुरा, कोलार, दावणगेरे, तुमकुर, चित्रदुर्ग, रामनगर) को कवर करता है — कुल आठ ज़िले। बाकी कर्नाटक, जिसमें मंगलौर, हुबली और गुलबर्गा शामिल हैं, को इसकी बजाय MESCOM, HESCOM, GESCOM या CESC सर्व करते हैं।',
  },
  {
    q: 'मैं अपने इस्तेमाल के लिए अपना सटीक BESCOM बिल कहां पा सकता हूं?',
    a: 'हमारा BESCOM बिल कैलकुलेटर इस्तेमाल करें, जो इन्हीं सत्यापित स्लैब, फिक्स्ड चार्ज, KERC सरचार्ज और गृह ज्योति के सरलीकृत मामले को आपकी अपनी यूनिट्स और स्वीकृत लोड पर लागू करके एक ब्यौरेवार अनुमान देता है।',
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
  ['रेजिडेंशियल (LT-2a, शहरी घरेलू)', 'घर — इस गाइड की टेबल और उदाहरण गणना जिस श्रेणी का इस्तेमाल करती हैं'],
  ['कमर्शियल (LT-3)', 'फ्लैट प्रति-यूनिट दर पर दुकानें, ऑफिस और व्यवसाय'],
  ['इंडस्ट्रियल (LT-5)', 'मैन्युफैक्चरिंग और इंडस्ट्रियल कनेक्शन'],
  ['कृषि (LT-4, IP-सेट, 10HP तक)', 'इरिगेशन पंप सेट — कर्नाटक की दीर्घकालिक फार्म-पावर सब्सिडी के तहत मुफ्त'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 यूनिट', '₹5.90'],
  ['101–200 यूनिट', '₹7.25'],
  ['201+ यूनिट', '₹8.60'],
]

const otherCategoryRows: [string, string, string][] = [
  ['कमर्शियल (LT-3)', '₹8.00 फ्लैट', '₹210/kW'],
  ['इंडस्ट्रियल (LT-5)', '₹6.50 (0–500 यूनिट), ₹7.50 (501+)', '₹180/kW'],
  ['कृषि (LT-4, IP-सेट, 10HP तक)', '₹0 — मुफ्त', '₹0'],
]

const fixedChargeRows: [string, string, string][] = [
  ['रेजिडेंशियल', 'स्वीकृत लोड के हिसाब से', '₹110/kW'],
  ['कमर्शियल', 'स्वीकृत लोड के हिसाब से', '₹210/kW'],
  ['इंडस्ट्रियल', 'स्वीकृत लोड के हिसाब से', '₹180/kW'],
  ['कृषि (IP-सेट, 10HP तक)', 'मुफ्त', '₹0'],
]

const workedExampleWithin: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स', '250'],
  ['स्वीकृत लोड (माना गया)', '2 kW'],
  ['गृह ज्योति फ्री भत्ता लागू', 'पहली 200 यूनिट (₹1,315.00 मूल्य)'],
  ['बाकी एनर्जी चार्ज: 50 यूनिट (201–250) @ ₹8.60', '₹430.00'],
  ['KERC सरचार्ज (250 × ₹0.36)', '₹90.00'],
  ['फिक्स्ड चार्ज (2 kW × ₹110)', '₹220.00'],
  ['अनुमानित कुल', '₹740.00'],
]

const workedExampleExceeded: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स', '250'],
  ['स्वीकृत लोड (माना गया)', '2 kW'],
  ['गृह ज्योति फायदा', 'उस महीने के लिए वापस लिया गया — बेसलाइन पार'],
  ['पूरा टेलिस्कोपिक एनर्जी चार्ज (0–250 यूनिट)', '₹1,745.00'],
  ['KERC सरचार्ज (250 × ₹0.36)', '₹90.00'],
  ['फिक्स्ड चार्ज (2 kW × ₹110)', '₹220.00'],
  ['अनुमानित कुल', '₹2,055.00'],
]

export default function BescomCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'BESCOM पूरी गाइड', href: `/hi${PATH}` },
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
          <strong>BESCOM</strong> (बैंगलोर इलेक्ट्रिसिटी सप्लाई कंपनी लिमिटेड)
          बैंगलोर और सात पड़ोसी ज़िलों में बिजली बांटता है, जिसे{' '}
          <strong>कर्नाटक इलेक्ट्रिसिटी रेगुलेटरी कमीशन (KERC)</strong> नियंत्रित
          करता है। ज़्यादातर घरेलू उपभोक्ता <strong>गृह ज्योति</strong> योजना
          के तहत आते हैं, जो हर महीने 200 यूनिट तक मुफ्त कर सकती है — लेकिन
          सिर्फ हर घर की अपनी बेसलाइन के भीतर, और एक ही महीने में वह बेसलाइन
          खोना आपके ऊपर गई यूनिट्स से कहीं ज़्यादा महंगा पड़ सकता है। एक सामान्य
          BESCOM बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज, स्वीकृत लोड
          से जुड़ा एक फिक्स्ड चार्ज, और एक ₹0.36/यूनिट KERC सरचार्ज शामिल होता
          है — यह गाइड बताती है कि हर हिस्सा बिल्कुल कैसे काम करता है, और उस
          एक ड्यूटी आंकड़े को फ्लैग करती है जिसके लिए हमारे पास सत्यापित डेटा
          नहीं है।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            BESCOM उपभोक्ताओं को <strong>हर महीने</strong> बिल करता है। इसे 1
            जून 2002 को बनाया गया, जब कर्नाटक पावर ट्रांसमिशन कॉर्पोरेशन
            लिमिटेड (KPTCL) के डिस्ट्रिब्यूशन बिज़नेस को पांच क्षेत्रीय
            कंपनियों में बांटा गया — BESCOM, MESCOM, HESCOM, GESCOM और CESC —
            जबकि KPTCL ने ट्रांसमिशन अपने पास रखा। BESCOM का अपना क्षेत्र{' '}
            <strong>बैंगलोर अर्बन और बैंगलोर रूरल ज़िलों के साथ छह पड़ोसी
            ज़िलों</strong> (चिक्काबल्लापुरा, कोलार, दावणगेरे, तुमकुर, चित्रदुर्ग
            और रामनगर) को कवर करता है — कुल आठ ज़िले, सिर्फ बैंगलोर शहर से बड़ा
            क्षेत्र।
          </p>
          <p className={`mt-3 ${pCls}`}>
            अगर आपका कनेक्शन कर्नाटक में कहीं और है — मंगलौर, हुबली, गुलबर्गा
            और इसी तरह के इलाके — तो आप संभवतः इसकी बजाय MESCOM, HESCOM या
            GESCOM द्वारा सर्व किए जाते हैं, इनमें से किसी का भी इस साइट पर
            अभी अपना कैलकुलेटर नहीं है। नीचे दी दरों पर भरोसा करने से पहले
            अपने बिल पर लिखा नाम जांचें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: &ldquo;BESCOM&rdquo; का मतलब खास तौर पर बैंगलोर और सात
            आसपास के ज़िले हैं — पूरा कर्नाटक नहीं।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल चार BESCOM उपभोक्ता श्रेणियों को कवर
            करता है:
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
            निष्कर्ष: यहां कृषि कोई छूट वाली दर नहीं है — पात्र पंप सेट के लिए,
            यह वाकई मुफ्त है।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू (LT-2a) टैरिफ स्लैब
          </h2>
          <p className={pCls}>
            BESCOM शहरी घरेलू खपत को तीन टेलिस्कोपिक स्लैब से बिल करता है, 1
            अप्रैल 2025 से प्रभावी — गृह ज्योति या KERC सरचार्ज लागू होने से
            पहले:
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
            सामान्य तंत्र के लिए{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>{' '}
            देखें। गृह ज्योति सहित तुरंत ब्यौरेवार अनुमान के लिए अपनी यूनिट्स{' '}
            <Link href="/hi/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ये सिर्फ बुनियादी स्लैब दरें हैं — इस टेबल के लागू होने
            से पहले भी ज़्यादातर घरेलू बिलों में गृह ज्योति द्वारा कुछ यूनिट
            पूरी तरह हटा दी जाती हैं।
          </p>
        </section>

        <section aria-labelledby="gruha-jyothi" className="mt-10 scroll-mt-20">
          <h2 id="gruha-jyothi" className={h2Cls}>
            गृह ज्योति: मुफ्त, लेकिन शर्तों के साथ
          </h2>
          <p className={pCls}>
            गृह ज्योति पात्र घरों को हर महीने मुफ्त यूनिट देती है — लेकिन भत्ता{' '}
            <strong>आपके घर के अपने पिछले साल के औसत मासिक इस्तेमाल पर एक
            बफर के साथ है, जो 200 यूनिट तक सीमित है</strong>, यह अपने आप हर
            किसी के लिए 200 यूनिट नहीं है। अलग-अलग पिछले इस्तेमाल वाले दो
            पड़ोसियों के अलग-अलग मुफ्त भत्ते हो सकते हैं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            इस योजना का सबसे तेज़ किनारा: अगर आप किसी महीने में अपनी स्वीकृत
            बेसलाइन पार करते हैं, तो BESCOM आम तौर पर उस{' '}
            <strong>पूरे महीने के बिल</strong> के लिए सब्सिडी वापस ले लेता है
            — सिर्फ आपकी बेसलाइन से ऊपर की यूनिट्स के लिए नहीं। एक असामान्य
            रूप से ज़्यादा इस्तेमाल वाला महीना अकेले अतिरिक्त यूनिट्स से कहीं
            ज़्यादा महंगा पड़ सकता है। हमारा कैलकुलेटर तुलना के लिए सरलीकृत
            &ldquo;पहली 200 यूनिट मुफ्त&rdquo; मामला मॉडल करता है, क्योंकि
            आपकी असली बेसलाइन आपके अपने घर के इतिहास के लिए खास है और ऐसा डेटा
            नहीं जिसे हम सामान्य रूप से सोर्स कर सकें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: गृह ज्योति आपके पिछले इस्तेमाल के पैटर्न के भीतर लगातार
            रहने को इनाम देती है — अगर वह संख्या फिर भी आपकी व्यक्तिगत बेसलाइन
            से ऊपर है तो यह कम पूर्ण यूनिट संख्या को इनाम नहीं देती।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल, इंडस्ट्रियल और कृषि टैरिफ
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 font-semibold">दर/यूनिट</th>
                  <th className="px-4 py-2 text-right font-semibold">फिक्स्ड चार्ज</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {otherCategoryRows.map(([cat, rate, fixed]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{rate}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{fixed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            <strong>कमर्शियल नोट:</strong> हमने जांचे एक द्वितीयक स्रोत ने इस
            श्रेणी के लिए ₹8.00/यूनिट की बजाय ₹5.95/यूनिट प्लस 9% ड्यूटी बताई
            थी — वह आंकड़ा उसी स्रोत पेज पर रेजिडेंशियल LT-2a दर के साथ एक
            संभावित मिक्स-अप जैसा लग रहा था, इसलिए हमने इसे इस्तेमाल नहीं
            किया। ऊपर दिया ₹8.00/यूनिट आंकड़ा हमारे भरोसेमंद स्रोतों में एक
            जैसा है, लेकिन अभी भी एक प्राइमरी KERC ऑर्डर क्रॉस-चेक के लंबित है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>कृषि नोट:</strong> ऊपर दी मुफ्त दर सिर्फ 10HP तक के IP-सेट
            (इरिगेशन पंप सेट) कनेक्शन पर लागू होती है। 10HP से ऊपर, या
            अनमीटर्ड/अन्य कृषि उप-श्रेणियों के लिए, दरें स्रोतों में असंगत रूप
            से बताई जाती हैं (लगभग ₹3.50–8.30/यूनिट) — किसी भरोसेमंद आंकड़े के
            लंबित यहां मॉडल नहीं की गई हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यह मान न लें कि हर कृषि कनेक्शन मुफ्त है — मुफ्त दर खास
            तौर पर 10HP-तक की IP-सेट श्रेणी है।
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            श्रेणी के हिसाब से फिक्स्ड चार्ज
          </h2>
          <p className={pCls}>
            यहां हर मीटर वाली BESCOM श्रेणी अपना फिक्स्ड चार्ज{' '}
            <strong>स्वीकृत लोड के प्रति kW</strong> बिल करती है, एक फ्लैट
            मासिक फीस के रूप में नहीं:
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
            निष्कर्ष: असल इस्तेमाल चाहे जो भी हो, एक ऊंचा स्वीकृत लोड हर महीने
            आपका फिक्स्ड चार्ज बढ़ाता है — इसे सही साइज़ में रखना यहां मायने
            रखता है।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            KERC सरचार्ज (BESCOM का फ्यूल एडजस्टमेंट)
          </h2>
          <p className={pCls}>
            BESCOM ऊपर दी स्लैब दरों के ऊपर, अप्रैल 2025 से शुरू किया गया एक{' '}
            <strong>₹0.36 प्रति यूनिट KERC सरचार्ज</strong> लागू करता है — जो
            हर उपभोक्ता श्रेणी में लागू होता है। इस तरह के चार्ज के पीछे के
            सामान्य तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            ।
          </p>
          <p className={`mt-3 ${pCls}`}>
            कुछ डिस्कॉम के उलट जहां हमारे डेटा में इस तरह का एडजस्टमेंट
            बिल्कुल मॉडल नहीं किया गया, BESCOM का ₹0.36/यूनिट आंकड़ा सत्यापित
            है और नीचे दिए कैलकुलेटर और उदाहरण गणना में शामिल है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यह सरचार्ज आपके बिल पर अपने खुद के &ldquo;स्लैब&rdquo;
            के रूप में नहीं दिखेगा, लेकिन गृह ज्योति से कवर की गई यूनिट्स सहित
            आपकी इस्तेमाल की हर यूनिट पर लागू होता है।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी — हमारे डेटा में एक खुला गैप
          </h2>
          <p className={pCls}>
            इस पेज के बाकी चार्ज के उलट, हमारे पास BESCOM घरेलू कनेक्शन के लिए{' '}
            <strong>सत्यापित इलेक्ट्रिसिटी ड्यूटी दर नहीं है</strong>। हमारा
            कैलकुलेटर फिलहाल 0% लागू करता है, लेकिन यह हमारी सोर्सिंग में एक
            अपुष्ट प्लेसहोल्डर दर्शाता है, कर्नाटक में कोई पुष्ट शून्य-ड्यूटी
            नीति नहीं — इस आंकड़े के पीछे का सोर्स नोट साफ तौर पर कहता है कि
            इलेक्ट्रिसिटी टैक्स अभी मॉडल नहीं किया गया है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            तुलना के लिए, महाराष्ट्र का MSEDCL एक सत्यापित 16% और उत्तर प्रदेश
            का UPPCL एक सत्यापित 5% लेता है — हमारी{' '}
            <Link href="/hi/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL
            </Link>{' '}
            पूरी गाइड देखें। जब तक हम किसी प्राइमरी KERC ऑर्डर के मुकाबले
            कर्नाटक की असली दर की पुष्टि नहीं कर सकते, कैलकुलेटर के 0% को
            तथ्य मानने की बजाय अपने बिल की ड्यूटी लाइन सीधे जांचें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यह BESCOM बिल की वह एक लाइन है जिसे हमारा कैलकुलेटर
            संभवतः कम बताता है — यहां बाकी सब कुछ सत्यापित है।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना BESCOM बिल कैसे जांचें और चुकाएं
          </h2>
          <ol className="mt-3 space-y-2">
            {[
              'bescom.co.in पर जाएं या BESCOM Mithra ऐप खोलें।',
              'अपना मौजूदा बिल देखने के लिए अपना अकाउंट ID (RR नंबर) डालें।',
              'दिखाई गई राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें।',
              'अपने रिकॉर्ड के लिए डिजिटल रसीद सेव करें।',
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
            आउटेज या बिलिंग समस्याओं के लिए, BESCOM की हेल्पलाइन{' '}
            <strong>1912</strong> है, जो 24×7 उपलब्ध है — यह गाइड और हमारा
            कैलकुलेटर अनुमान लगाने वाले टूल हैं, अकाउंट-विशिष्ट मामलों, जिसमें
            आपकी असली गृह ज्योति बेसलाइन भी शामिल है, के लिए आधिकारिक पोर्टल
            का विकल्प नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: सिर्फ BESCOM का अपना पोर्टल आपकी खास गृह ज्योति बेसलाइन
            जानता है — कोई कैलकुलेटर आपके लिए वह नहीं ढूंढ सकता।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: 250 यूनिट, दो तरीके
          </h2>
          <p className={pCls}>
            एक 2kW कनेक्शन पर इस्तेमाल की गई वही 250 यूनिट, सिर्फ इस बात पर
            निर्भर करते हुए कि उस महीने आप अपनी गृह ज्योति बेसलाइन के भीतर हैं
            या नहीं, दो बहुत अलग बिल बनाती हैं:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            परिदृश्य A — अपनी गृह ज्योति बेसलाइन के भीतर
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExampleWithin.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExampleWithin.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExampleWithin.length - 1
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
          <p className="mt-6 font-semibold text-ink-navy">
            परिदृश्य B — वही 250 यूनिट, बेसलाइन पार
          </p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExampleExceeded.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExampleExceeded.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExampleExceeded.length - 1
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
            वही यूनिट्स, एक <strong>₹1,315 का अंतर</strong> — पूरी तरह इस बात
            पर निर्भर कि उस महीने गृह ज्योति लागू हुई या नहीं। दोनों परिदृश्यों
            में इलेक्ट्रिसिटी ड्यूटी (अपुष्ट — ऊपर देखें) या बकाया जैसी
            अकाउंट-विशिष्ट चीज़ें शामिल नहीं हैं। अपनी यूनिट्स और स्वीकृत लोड{' '}
            <Link href="/hi/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: गृह ज्योति कोई गोलाई की गलती नहीं है — इसे एक महीने के
            लिए खोना इस उदाहरण में बिल को लगभग तीन गुना कर देता है।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/electricity/bescom-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                BESCOM बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इन्हीं सत्यापित स्लैब पर आधारित आपका अपना ब्यौरेवार अनुमान।
              </p>
            </Link>
            <Link
              href="/hi/blog/msedcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                MSEDCL पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                महाराष्ट्र की सत्यापित 16% ड्यूटी से तुलना करें।
              </p>
            </Link>
            <Link
              href="/hi/blog/uppcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                UPPCL पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                उत्तर प्रदेश की सत्यापित 5% ड्यूटी से तुलना करें।
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
                BESCOM के तीन बैंड के पीछे का सामान्य तंत्र।
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
          सत्यापित रिकॉर्ड के आधार पर {TARIFF_DATA_REFRESHED} को अपडेट किया
          गया, द्वितीयक बिल-कैलकुलेटर साइटों से सोर्स किया गया जो मार्च 2025
          के संयुक्त KERC टैरिफ ऑर्डर (1 अप्रैल 2025 से प्रभावी) का हवाला
          देती हैं, प्राइमरी KERC ऑर्डर क्रॉस-चेक के लंबित। इलेक्ट्रिसिटी
          ड्यूटी BESCOM के लिए स्पष्ट रूप से अभी सत्यापित नहीं है और इसे पुष्ट
          शून्य नहीं माना जाना चाहिए। कमर्शियल और इंडस्ट्रियल आंकड़े ऊपर बताए
          बैंड को कवर करते हैं; 10HP से ऊपर की कृषि मॉडल नहीं की गई है। दरें
          समय-समय पर संशोधित होती हैं — ऊपर दिया कैलकुलेटर मौजूदा रखा जाता है;
          इस लेख को उसके साथ एक व्याख्यात्मक रेफरेंस के रूप में लें। इस साइट
          पर हम टैरिफ डेटा कैसे सोर्स और सत्यापित करते हैं, इसके लिए हमारी{' '}
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
