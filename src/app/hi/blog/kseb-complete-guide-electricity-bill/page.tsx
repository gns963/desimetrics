import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/kseb-complete-guide-electricity-bill'
const TITLE = 'KSEB बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित KSEB टैरिफ स्लैब, 250-यूनिट नॉन-टेलिस्कोपिक क्लिफ, फिक्स्ड चार्ज और खुले डेटा गैप एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल, इंडस्ट्रियल और कृषि टेबल, एक उदाहरण गणना, और अपना केरल बिजली बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '22 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '29 अगस्त 2026'

export const metadata: Metadata = {
  title: 'KSEB पूरी बिल गाइड — केरल टैरिफ स्लैब और चार्ज 2026',
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
  datePublished: '2026-09-16',
  dateModified: '2026-09-22',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'KSEB रेजिडेंशियल टेलिस्कोपिक टैरिफ स्लैब (250 यूनिट/माह तक)',
  description: 'केरल (KSEB) के लिए टेलिस्कोपिक द्वि-मासिक घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी, सिर्फ 250 यूनिट/माह के औसत तक मान्य।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://www.ensembleelectric.com/post/understanding-the-latest-changes-in-lt-consumer-electricity-tariffs-in-kerala',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://www.ensembleelectric.com/post/understanding-the-latest-changes-in-lt-consumer-electricity-tariffs-in-kerala',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा KSEB बिजली बिल कैसे गिना जाता है?',
    a: 'आपके घरेलू KSEB बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (₹3.35 से ₹8.50/यूनिट के बैंड, आपके मासिक-औसत इस्तेमाल पर आंके गए), सिंगल-फेज़ के लिए ₹80/द्वि-मासिक चक्र या थ्री-फेज़ के लिए ₹220 का फिक्स्ड चार्ज, और 5% इलेक्ट्रिसिटी ड्यूटी जुड़ती है। यह सिर्फ 250 यूनिट/माह के औसत से नीचे लागू होता है — इसे पार करते ही KSEB आपकी पूरी खपत पर एक फ्लैट नॉन-टेलिस्कोपिक दर पर स्विच कर देता है, जिसे यह गाइड और कैलकुलेटर मॉडल नहीं करते।',
  },
  {
    q: '250-यूनिट नॉन-टेलिस्कोपिक क्लिफ क्या है?',
    a: '250 यूनिट/माह के औसत से नीचे, KSEB टेलिस्कोपिक तरीके से चार्ज करता है — हर स्लैब अपनी दर पर। जिस पल आपका मासिक औसत 250 पार करता है, आपकी पूरी द्वि-मासिक खपत को एक ही ऊंची नॉन-टेलिस्कोपिक दर पर दोबारा बिल किया जाता है, सिर्फ 250 से ऊपर की यूनिट्स नहीं। यह KSEB बिल पर सबसे ज़्यादा गलत समझा जाने वाला नियम है, और इस गाइड की टेबल व कैलकुलेटर सिर्फ इससे नीचे ही सटीक हैं।',
  },
  {
    q: 'KSEB मुझे हर दो महीने बिल करता है — स्लैब असल में कैसे काम करते हैं?',
    a: 'स्लैब सीमाओं का आकलन आपके मासिक औसत (आपका द्वि-मासिक कुल ÷ 2) पर होता है, भले ही आपको हर दो महीने में एक बार बिल किया जाता है। एक 501-यूनिट द्वि-मासिक बिल 250-यूनिट क्लिफ को पार कर जाता है, भले ही \'501\' पहली नज़र में \'250\' के करीब न लगे — क्लिफ के किस तरफ आप हैं यह जांचने से पहले हमेशा दो से भाग दें।',
  },
  {
    q: "KSEB के मौजूदा घरेलू टैरिफ स्लैब क्या हैं?",
    a: 'पहली 50 यूनिट/माह के लिए ₹3.35/यूनिट, 51–100 के लिए ₹4.25/यूनिट, 101–150 के लिए ₹5.35/यूनिट, 151–200 के लिए ₹7.20/यूनिट, और 201–250 के लिए ₹8.50/यूनिट — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर बिल होता है (टेलिस्कोपिक), और सिर्फ 250 यूनिट/माह के औसत तक मान्य। 1 अप्रैल 2025 से प्रभावी।',
  },
  {
    q: 'यह डेटा कितना भरोसेमंद है — क्या यह प्राइमरी-सोर्स्ड है?',
    a: 'यह मिला-जुला है, और हमारी बाकी गाइड की तुलना में असामान्य रूप से उल्टा: KSEB की कमर्शियल, इंडस्ट्रियल और कृषि दरें सीधे KSERC ऑर्डर नंबर 427/D(T)/2023/KSERC (5 दिसंबर 2024, केरल गजट) से PRIMARY-सोर्स्ड हैं। ऊपर दिए रेजिडेंशियल स्लैब हालांकि एक प्राइमरी KSERC ऑर्डर क्रॉस-चेक के लंबित SECONDARY-सोर्स्ड हैं — हमें आंकड़ों पर भरोसा है, लेकिन हम अपनी सोर्सिंग टियर को बढ़ा-चढ़ाकर बताने की बजाय इसे खुलकर फ्लैग करते हैं।',
  },
  {
    q: 'क्या KSEB कोई फ्यूल या पावर-परचेज़ कॉस्ट एडजस्टमेंट लेता है?',
    a: 'हमारे पास इस बारे में कोई सत्यापित मौजूदा दर नहीं है — हमारा डेटा यह पुष्टि नहीं करता कि KSEB फिलहाल कोई ऐसा चार्ज लगा रहा है या नहीं, इसलिए यह इस गाइड की टेबल या कैलकुलेटर में मॉडल नहीं की गई है। इसे एक खुला गैप मानें, कोई पुष्ट शून्य नहीं।',
  },
  {
    q: 'केरल में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'एनर्जी चार्ज पर एक सत्यापित 5% — यह हमारे KSEB डेटा के ज़्यादा पुख्ता आंकड़ों में से एक है, ऊपर दिए फ्यूल-एडजस्टमेंट गैप के उलट।',
  },
  {
    q: 'क्या KSEB पूरे केरल को बिजली सप्लाई करता है?',
    a: 'लगभग पूरा। KSEB लिमिटेड (KSEBL) थ्रिशूर म्युनिसिपल कॉर्पोरेशन इलाके, मुन्नार (कन्नन देवन हिल्स) इलाके, और कुछ छोटे इंडस्ट्रियल-पार्क लाइसेंसियों को छोड़कर पूरे राज्य को कवर करता है, जिनकी अपनी अलग डिस्ट्रिब्यूशन लाइसेंसी हैं।',
  },
  {
    q: 'मैं अपना KSEB बिल ऑनलाइन कैसे जांचूं या चुकाऊं?',
    a: 'wss.kseb.in पर KSEB वेब सेल्फ सर्विस पोर्टल पर जाएं, या KSEB मोबाइल ऐप इस्तेमाल करें। सवालों या आउटेज के लिए, 24×7 हेल्पलाइन 1912 या 0471-2555544 पर कॉल करें।',
  },
  {
    q: "KSEB और KSEB लिमिटेड (KSEBL) में क्या फ़र्क़ है?",
    a: 'मूल केरल स्टेट इलेक्ट्रिसिटी बोर्ड (KSEB), जो 1957 में बना, को एक कंपनी में बदला गया — केरल स्टेट इलेक्ट्रिसिटी बोर्ड लिमिटेड (KSEBL) — जो जनवरी 2011 में इनकॉर्पोरेट हुई और 1 नवंबर 2013 से चालू है। "KSEB" अब भी ज़्यादातर लोगों का इस्तेमाल किया जाने वाला रोज़मर्रा का नाम है।',
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
  ['रेजिडेंशियल (LT-1A)', 'घर — इस गाइड की उदाहरण गणना जिस श्रेणी का इस्तेमाल करती है'],
  ['कमर्शियल (LT-VII A)', 'दुकानें, होटल, लॉज, कोल्ड स्टोरेज और इसी तरह के'],
  ['इंडस्ट्रियल (LT-IV A)', '10 kW से कम कनेक्टेड लोड; दो ऊंचे टियर मौजूद हैं जो मॉडल नहीं किए गए'],
  ['कृषि (LT-V A)', 'खाद्य और नकदी फसलों के लिए पंपिंग/लिफ्ट इरिगेशन'],
]

const domesticSlabs: [string, string][] = [
  ['0–50 यूनिट', '₹3.35'],
  ['51–100 यूनिट', '₹4.25'],
  ['101–150 यूनिट', '₹5.35'],
  ['151–200 यूनिट', '₹7.20'],
  ['201–250 यूनिट', '₹8.50'],
]

const otherCategoryRows: [string, string, string][] = [
  ['कमर्शियल (LT-VII A)', 'पांच बैंड में ₹6.05 / ₹6.80 / ₹7.50 / ₹8.15 / ₹9.40, 0–100/101–200/201–300/301–500/500+ यूनिट', '₹95/माह (सिंगल-फेज़)'],
  ['इंडस्ट्रियल (LT-IV A), <10 kW', '₹5.90 फ्लैट', '₹140/माह फ्लैट'],
  ['कृषि (LT-V A)', '₹2.40 फ्लैट', '₹20/kW/माह'],
]

const workedExample400: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स (एक द्वि-मासिक चक्र)', '400'],
  ['मासिक औसत', '200 (250-यूनिट क्लिफ से काफी नीचे)'],
  ['कनेक्शन', 'सिंगल-फेज़, रेजिडेंशियल'],
  ['स्लैब 1: 100 यूनिट (0–100) @ ₹3.35', '₹335.00'],
  ['स्लैब 2: 100 यूनिट (101–200) @ ₹4.25', '₹425.00'],
  ['स्लैब 3: 100 यूनिट (201–300) @ ₹5.35', '₹535.00'],
  ['स्लैब 4: 100 यूनिट (301–400) @ ₹7.20', '₹720.00'],
  ['एनर्जी चार्ज सबटोटल', '₹2,015.00'],
  ['फिक्स्ड चार्ज (सिंगल-फेज़)', '₹80.00'],
  ['इलेक्ट्रिसिटी ड्यूटी (एनर्जी चार्ज का 5%)', '₹100.75'],
  ['अनुमानित कुल (प्रति द्वि-मासिक चक्र, सिर्फ बुनियादी ढांचा)', '₹2,195.75'],
  ['मासिक-बराबर (÷ 2)', '≈₹1,097.88'],
]

export default function KsebCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'KSEB पूरी गाइड', href: `/hi${PATH}` },
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
          <strong>KSEB</strong> (केरल स्टेट इलेक्ट्रिसिटी बोर्ड, अब औपचारिक रूप
          से <strong>KSEB लिमिटेड</strong>) लगभग पूरे केरल को बिजली सप्लाई
          करता है, घरेलू उपभोक्ताओं को <strong>द्वि-मासिक</strong> बिल करता है
          लेकिन टैरिफ स्लैब का आकलन उस इस्तेमाल के{' '}
          <strong>मासिक औसत</strong> पर करता है। 250 यूनिट/माह के औसत से नीचे,
          KSEB ज़्यादातर भारतीय डिस्कॉम की तरह टेलिस्कोपिक है; उस सीमा को
          पार करते ही यह आपकी पूरी खपत पर एक फ्लैट नॉन-टेलिस्कोपिक दर पर
          स्विच कर देता है — केरल की सबसे मशहूर बिलिंग खासियत, और वजह कि यह
          गाइड सिर्फ उस सीमा तक ही सटीक है।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            केरल स्टेट इलेक्ट्रिसिटी बोर्ड ने 31 मार्च 1957 को काम करना शुरू
            किया। ज़्यादातर स्टेट इलेक्ट्रिसिटी बोर्ड की तरह, इसे इलेक्ट्रिसिटी
            एक्ट 2003 के तहत एक कंपनी में बदला गया — केरल स्टेट इलेक्ट्रिसिटी
            बोर्ड लिमिटेड (KSEBL), जो 14 जनवरी 2011 को इनकॉर्पोरेट हुई और 1
            नवंबर 2013 से स्वतंत्र रूप से काम कर रही है। &ldquo;KSEB&rdquo;
            अब भी बिलों और रोज़मर्रा की बातचीत में सबसे ज़्यादा इस्तेमाल होने
            वाला नाम है। KSEBL लगभग पूरे केरल को कवर करता है, तीन अपवादों के
            साथ: <strong>थ्रिशूर म्युनिसिपल कॉर्पोरेशन</strong>,{' '}
            <strong>मुन्नार (कन्नन देवन हिल्स)</strong>, और कुछ छोटे
            इंडस्ट्रियल-पार्क ज़ोन — हर एक की अपनी अलग डिस्ट्रिब्यूशन
            लाइसेंसी है, जो इस साइट पर मॉडल नहीं की गई।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका बिल KSEB/KSEBL नहीं कहता, तो इस गाइड पर भरोसा
            करने से पहले जांच लें कि आप थ्रिशूर शहर या मुन्नार में तो नहीं
            हैं।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल चार KSEB उपभोक्ता श्रेणियों को कवर
            करता है, सभी एक ही <strong>द्वि-मासिक</strong> चक्र पर बिल होती
            हैं:
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
            निष्कर्ष: इस पेज पर हर दर, जब तक अलग से न बताया जाए, प्रति
            द्वि-मासिक (दो महीने) चक्र की है — नीचे दिए घरेलू स्लैब स्पष्टता
            के लिए मासिक औसत के हिसाब से दिखाए गए हैं, क्योंकि असल में यही
            आपकी दर तय करता है।
          </p>
        </section>

        <section aria-labelledby="cliff" className="mt-10 scroll-mt-20">
          <h2 id="cliff" className={h2Cls}>
            250-यूनिट नॉन-टेलिस्कोपिक क्लिफ
          </h2>
          <p className={pCls}>
            250 यूनिट/माह के औसत तक, KSEB टेलिस्कोपिक तरीके से चार्ज करता है
            — हर स्लैब अपनी दर पर, ज़्यादातर भारतीय डिस्कॉम की तरह। जिस पल
            आपका मासिक औसत 250 पार करता है, KSEB आपकी <strong>पूरी</strong>{' '}
            द्वि-मासिक खपत को एक ही ऊंची नॉन-टेलिस्कोपिक दर पर दोबारा बिल
            करता है — सिर्फ 250 से ऊपर की यूनिट्स नहीं। एक 501-यूनिट
            द्वि-मासिक बिल (250.5 का मासिक औसत) इस क्लिफ को पार कर जाता है,
            भले ही &ldquo;501&rdquo; पहली नज़र में &ldquo;250&rdquo; के करीब
            न लगे, क्योंकि सीमा को मासिक औसत के मुकाबले जांचा जाता है, सीधे
            द्वि-मासिक कुल के मुकाबले नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            इस गाइड की टेबल, उदाहरण गणना और हमारा KSEB कैलकुलेटर सिर्फ
            टेलिस्कोपिक रेंज को मॉडल करते हैं। अगर आपका मासिक औसत 250 यूनिट
            पर या उससे ऊपर है, तो यहां दिए हर आंकड़े को अपने असली बिल के लिए{' '}
            <strong>लागू नहीं</strong> मानें, सिर्फ अनुमानित नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यह जांचने से पहले कि आप 250 के किस तरफ हैं, अपनी
            द्वि-मासिक यूनिट्स को दो से भाग दें — यह KSEB बिल पर सबसे ज़्यादा
            गलत पढ़ी जाने वाली संख्या है।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू टैरिफ स्लैब (मासिक औसत)
          </h2>
          <p className={pCls}>
            KSEB घरेलू खपत को पांच टेलिस्कोपिक स्लैब से बिल करता है, 1 अप्रैल
            2025 से प्रभावी, आपके मासिक-औसत इस्तेमाल पर आंके गए — हर बैंड
            सिर्फ उसके अंदर की यूनिट्स पर चार्ज होता है, और सिर्फ ऊपर दिए
            250-यूनिट क्लिफ तक:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्लैब (प्रति मासिक औसत)</th>
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
            <strong>जानने लायक एक सोर्सिंग नोट:</strong> इस सीरीज़ के लिए
            असामान्य रूप से, ये रेजिडेंशियल स्लैब{' '}
            <strong>सेकंडरी-सोर्स्ड</strong> हैं — एक नामित KSERC ऑर्डर नंबर
            और तारीख के मुकाबले क्रॉस-चेक किए गए, लेकिन एक प्राइमरी-डॉक्यूमेंट
            पुष्टि के लंबित। नीचे दी KSEB की कमर्शियल, इंडस्ट्रियल और कृषि
            दरें इसके उलट हैं: सीधे KSERC ऑर्डर से प्राइमरी-सोर्स्ड। इसके
            पीछे के सामान्य तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>
            , या एक तुरंत, ब्यौरेवार अनुमान के लिए अपनी द्वि-मासिक यूनिट्स{' '}
            <Link href="/hi/electricity/kseb-bill-calculator" className="text-brass underline">
              KSEB बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: आपके मासिक औसत की पहली 50 यूनिट हमेशा ₹3.35 प्रत्येक
            पर रहती हैं, चाहे आप कितना भी ज़्यादा इस्तेमाल करें — जब तक आप
            250-यूनिट क्लिफ से नीचे हैं।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल, इंडस्ट्रियल और कृषि टैरिफ
          </h2>
          <p className={pCls}>
            तीनों KSERC ऑर्डर नंबर 427/D(T)/2023/KSERC से प्राइमरी-सोर्स्ड
            हैं, दिनांक 5 दिसंबर 2024 (केरल गजट एक्स्ट्राऑर्डिनरी वॉल्यूम
            XIII नंबर 3939), दरें 1 अप्रैल 2025 से प्रभावी — लेकिन हर एक के
            साथ जानने लायक एक असली नोट है:
          </p>
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
            <strong>कमर्शियल नोट:</strong> KSEB इस श्रेणी को{' '}
            <strong>नॉन-टेलिस्कोपिक</strong> बिल करता है — आपके पूरे महीने की
            खपत उस स्लैब की सिंगल दर पर चार्ज होती है जिसमें वह आती है, ब्लॉक
            दर ब्लॉक नहीं। ऊपर दी टेबल रेफरेंस के लिए स्लैब सीमाएं दिखाती है,
            लेकिन इन्हें टेलिस्कोपिक तरीके से इस्तेमाल करना (जैसा हमारा
            कैलकुलेटर फिलहाल करता है) 100 यूनिट/माह से ऊपर के कमर्शियल बिल
            को कम करके दिखाएगा। दरें KSEB के मूल <strong>मासिक</strong>{' '}
            बिलिंग आधार पर भी हैं, जो इस फाइल के बताए द्वि-मासिक चक्र से मेल
            नहीं खातीं — एक असली, बताया गया मिसमैच, कोई गलती नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>इंडस्ट्रियल नोट:</strong> सिर्फ सबसे छोटा टियर (10 kW से
            कम कनेक्टेड लोड) यहां मॉडल किया गया है। 10–20 kW लोड ₹5.95/यूनिट
            पर बिल होता है साथ में ₹95/kW/माह का फिक्स्ड चार्ज, और 20 kW से
            ऊपर यह ₹6.00/यूनिट पर ₹215/kVA/माह के साथ है — दोनों ऊंचे टियर इस
            गाइड या कैलकुलेटर में नहीं हैं। पावर-फैक्टर कैपेसिटर न लगे होने
            पर 20% सरचार्ज भी लागू होता है, जो यहां मॉडल नहीं किया गया।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>कृषि नोट:</strong> ₹2.40/यूनिट की दर सिर्फ LT-V(A) —
            खाद्य और नकदी फसलों के लिए पंपिंग और लिफ्ट इरिगेशन को कवर करती
            है। एक अलग LT-V(B) श्रेणी (पशुधन, पोल्ट्री, एक्वाकल्चर, डेयरी)
            ज़्यादा दर पर बिल होती है, ₹3.40/यूनिट प्लस ₹30/kW/माह, और इसे
            अलग से मॉडल नहीं किया गया है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: रेजिडेंशियल के अलावा, यहां हर श्रेणी में कम से कम एक
            असली गैप है — किसी आंकड़े पर भरोसा करने से पहले अपनी खास श्रेणी
            का नोट जांच लें।
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            श्रेणी के हिसाब से फिक्स्ड चार्ज
          </h2>
          <p className={pCls}>
            KSEB का फिक्स्ड चार्ज आधार श्रेणी के हिसाब से बदलता है —
            रेजिडेंशियल और कमर्शियल फेज़ के हिसाब से प्रति-कनेक्शन हैं,
            इंडस्ट्रियल एक फ्लैट मासिक राशि है (सबसे छोटे टियर के लिए), और
            कृषि कनेक्टेड लोड के प्रति kW है:
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
                <tr>
                  <td className="px-4 py-2 font-medium">रेजिडेंशियल</td>
                  <td className="px-4 py-2">फेज़ के हिसाब से, प्रति द्वि-मासिक चक्र</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹80 (सिंगल) / ₹220 (थ्री)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">कमर्शियल</td>
                  <td className="px-4 py-2">फेज़ के हिसाब से, प्रति माह</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹95 (सिंगल) / ₹190 (थ्री)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">इंडस्ट्रियल (&lt;10 kW)</td>
                  <td className="px-4 py-2">फ्लैट, प्रति माह</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹140</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">कृषि</td>
                  <td className="px-4 py-2">कनेक्टेड लोड के प्रति kW, प्रति माह</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹20/kW</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: आपका रेजिडेंशियल फिक्स्ड चार्ज सिर्फ इस पर निर्भर करता
            है कि आपका कनेक्शन सिंगल-फेज़ है या थ्री-फेज़ — यह आपकी खपत के
            साथ नहीं बदलता।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            फ्यूल/पावर-परचेज़ कॉस्ट एडजस्टमेंट — एक खुला गैप
          </h2>
          <p className={pCls}>
            कई भारतीय डिस्कॉम बुनियादी एनर्जी और फिक्स्ड चार्ज के ऊपर एक अलग
            एडजस्टमेंट चार्ज के ज़रिए फ्यूल और पावर-परचेज़ कॉस्ट में बदलाव
            पास करते हैं — इस तरह के तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            । हमारे पास यह पुष्टि करने के लिए कोई सत्यापित, मौजूदा दर नहीं
            है कि KSEB फिलहाल ऐसा कोई चार्ज लगा रहा है या नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            हमारा डेटा इसे शून्य दिखाता है, लेकिन — नीचे दिए इस गाइड के
            इलेक्ट्रिसिटी-ड्यूटी आंकड़े के उलट — यह कोई पुष्ट
            शून्य-एडजस्टमेंट नीति नहीं है, सिर्फ किसी मॉडल किए गए मूल्य की
            गैरमौजूदगी है। इसे एक खुला गैप मानें: आपका असली KSEB बिल कोई ऐसा
            चार्ज ले सकता है जो यह गाइड और कैलकुलेटर नहीं दिखाते।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका असली KSEB बिल 250-यूनिट क्लिफ के नीचे भी इस
            गाइड की उदाहरण गणना से ज़्यादा है, तो एक अनमॉडल्ड फ्यूल
            एडजस्टमेंट इसकी संभावित वजह है।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी
          </h2>
          <p className={pCls}>
            केरल एनर्जी चार्ज पर <strong>सत्यापित 5%</strong> इलेक्ट्रिसिटी
            ड्यूटी लेता है — ऊपर दिए फ्यूल-एडजस्टमेंट गैप के उलट, हमारे KSEB
            डेटा के ज़्यादा पुख्ता आंकड़ों में से एक। तुलना के लिए,
            महाराष्ट्र का MSEDCL एक सत्यापित 16% और उत्तर प्रदेश का UPPCL भी
            एक सत्यापित 5% लेता है — हमारी{' '}
            <Link href="/hi/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL
            </Link>{' '}
            पूरी गाइड देखें। कर्नाटक के BESCOM और पश्चिम बंगाल के WBSEDCL
            दोनों में इसकी बजाय एक अपुष्ट-ड्यूटी गैप है — इस तुलना के लिए
            हमारी{' '}
            <Link href="/hi/blog/bescom-complete-guide-electricity-bill" className="text-brass underline">
              BESCOM
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL
            </Link>{' '}
            पूरी गाइड देखें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: KSEB का ड्यूटी आंकड़ा एक ऐसी चीज़ है जिस पर आप भरोसा
            कर सकते हैं — फ्यूल एडजस्टमेंट और 250-यूनिट क्लिफ ही इस बिल पर
            असली अनिश्चितता रखते हैं।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना KSEB बिल कैसे जांचें और चुकाएं
          </h2>
          <p className={pCls}>
            सामान्य तरीका, KSEB के अपने पोर्टल के ज़रिए (सही स्क्रीन समय के
            साथ बदल सकती हैं):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'wss.kseb.in पर KSEB वेब सेल्फ सर्विस पोर्टल पर जाएं, या KSEB मोबाइल ऐप खोलें।',
              'अपना मौजूदा बिल पाने के लिए अपना Consumer Number डालें।',
              'दिखाई गई राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें।',
              'अपने रिकॉर्ड के लिए भुगतान की पुष्टि सेव करें।',
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
            बिलिंग सवालों या आउटेज के लिए, KSEB की हेल्पलाइन{' '}
            <strong>1912</strong> या <strong>0471-2555544</strong> है, जो
            24×7 उपलब्ध है — यह गाइड और हमारा कैलकुलेटर अनुमान लगाने वाले
            टूल हैं, अकाउंट-विशिष्ट मामलों के लिए आधिकारिक पोर्टल का विकल्प
            नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अकाउंट-विशिष्ट किसी भी चीज़ के लिए — बकाया, कोई विवादित
            रीडिंग, आपने 250-यूनिट क्लिफ पार की है या नहीं — सीधे आधिकारिक
            पोर्टल या हेल्पलाइन पर जाएं, किसी कैलकुलेटर पर नहीं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: 400 यूनिट, एक द्वि-मासिक चक्र, घरेलू कनेक्शन
          </h2>
          <p className={pCls}>
            ऊपर दिए सत्यापित स्लैब का इस्तेमाल करते हुए, यहां एक द्वि-मासिक
            चक्र में 400 यूनिट इस्तेमाल करने वाले सिंगल-फेज़ घरेलू कनेक्शन
            की पूरी गणना है — एक 200 यूनिट/माह का औसत, जो 250-यूनिट क्लिफ से
            सुरक्षित रूप से नीचे है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample400.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample400.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample400.length - 1
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
            यह ₹2,195.75 सिर्फ यहां मॉडल किए गए एनर्जी चार्ज, फिक्स्ड चार्ज
            और इलेक्ट्रिसिटी ड्यूटी को कवर करता है — आपके असली बिल में ऊपर
            बताया एक अनमॉडल्ड फ्यूल/पावर-परचेज़ एडजस्टमेंट भी शामिल हो सकता
            है। रेजिडेंशियल के अलावा किसी भी श्रेणी सहित अपनी सही यूनिट्स{' '}
            <Link href="/hi/electricity/kseb-bill-calculator" className="text-brass underline">
              KSEB बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं — लेकिन याद रखें कि यह सिर्फ 250-यूनिट मासिक-औसत क्लिफ
            से नीचे ही सटीक है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: किसी KSEB अनुमान पर भरोसा करने से पहले हमेशा अपना
            मासिक औसत जांचें, सिर्फ अपना द्वि-मासिक कुल नहीं — यह उदाहरण
            जानबूझकर 250-यूनिट लाइन से काफी दूर रहता है।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/electricity-bill-guides"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📚
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                सभी बिजली बिल गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                पूरी कम्प्लीट गाइड डायरेक्टरी देखें, राज्य दर राज्य। (अंग्रेज़ी)
              </p>
            </Link>
            <Link
              href="/hi/electricity/kseb-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                KSEB बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इन्हीं सत्यापित स्लैब पर आधारित आपका अपना ब्यौरेवार अनुमान।
              </p>
            </Link>
            <Link
              href="/hi/blog/jvvnl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                JVVNL पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                राजस्थान की अपनी रेजिडेंशियल-कमर्शियल से कमज़ोर सोर्सिंग
                पैटर्न, और भारत के सबसे ऊंचे फिक्स्ड चार्ज में से एक।
              </p>
            </Link>
            <Link
              href="/hi/blog/wbsedcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                WBSEDCL पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                एक और असामान्य बिलिंग साइकिल — मासिक की बजाय तिमाही।
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
                कर्नाटक की गृह ज्योति योजना और उसका अपना ड्यूटी गैप।
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
                KSEB के पांच बैंड के पीछे का सामान्य तंत्र — और 250-यूनिट
                क्लिफ नियम क्यों नहीं, अपवाद क्यों है।
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
                आपका बिल यूनिट्स न बदलने पर भी क्यों बदलता है।
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
          गया। कमर्शियल, इंडस्ट्रियल और कृषि दरें सीधे{' '}
          <a
            href="https://www.ensembleelectric.com/post/understanding-the-latest-changes-in-lt-consumer-electricity-tariffs-in-kerala"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            KSERC ऑर्डर नंबर 427/D(T)/2023/KSERC
          </a>{' '}
          से सोर्स की गई हैं, दिनांक 5 दिसंबर 2024, 1 अप्रैल 2025 से प्रभावी।
          रेजिडेंशियल स्लैब एक प्राइमरी-डॉक्यूमेंट क्रॉस-चेक के लंबित
          सेकंडरी-सोर्स्ड हैं। 250 यूनिट/माह से ऊपर KSEB का असली
          नॉन-टेलिस्कोपिक रिजीम, ऊंचे इंडस्ट्रियल/कृषि टियर, KSEB का
          फ्यूल/पावर-परचेज़ एडजस्टमेंट, और समय-अनुसार बदलने वाली कृषि
          उप-श्रेणियां आगे की सोर्सिंग के लंबित साफ तौर पर मॉडल नहीं की गई
          हैं। दरें समय-समय पर संशोधित होती हैं — ऊपर दिया कैलकुलेटर मौजूदा
          रखा जाता है; इस लेख को उसके साथ एक व्याख्यात्मक रेफरेंस के रूप में
          लें। इस साइट पर हम टैरिफ डेटा कैसे सोर्स और सत्यापित करते हैं,
          इसके लिए हमारी{' '}
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
