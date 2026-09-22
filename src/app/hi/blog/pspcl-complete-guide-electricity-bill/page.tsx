import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/pspcl-complete-guide-electricity-bill'
const TITLE = 'PSPCL (पंजाब) बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित PSPCL टैरिफ स्लैब, असली 300-यूनिट ऑल-ऑर-नथिंग फ्री-पावर नियम, फिक्स्ड चार्ज और खुले गैप एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल, इंडस्ट्रियल और कृषि टेबल, दो उदाहरण गणनाएं, और अपना पंजाब बिजली बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '22 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '22 सितंबर 2026'

export const metadata: Metadata = {
  title: 'PSPCL पूरी बिल गाइड — पंजाब टैरिफ स्लैब और चार्ज 2026',
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
  name: 'PSPCL रेजिडेंशियल टेलिस्कोपिक टैरिफ स्लैब',
  description: 'पंजाब (PSPCL) के लिए टेलिस्कोपिक घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी (प्रतिनिधि मासिक शेड्यूल)।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://docs.pspcl.in/',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: 'https://docs.pspcl.in/',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा PSPCL बिजली बिल कैसे गिना जाता है?',
    a: 'आपके घरेलू PSPCL बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (₹3.49 से ₹7.30/यूनिट) और एक फ्लैट ₹120/माह का फिक्स्ड चार्ज जुड़ता है — लेकिन ज़्यादातर घरों के लिए, 300-यूनिट फ्री-पावर स्कीम का मतलब है कि पूरा एनर्जी चार्ज माफ हो जाता है, जब तक मासिक खपत 300 यूनिट या उससे कम रहती है।',
  },
  {
    q: 'अगर मैं एक महीने में 300 यूनिट से ज़्यादा इस्तेमाल करूं तो क्या होगा? क्या मैं सिर्फ अतिरिक्त यूनिट्स के लिए भुगतान करता हूं?',
    a: 'नहीं — यह PSPCL बिल पर सबसे ज़्यादा गलत समझा जाने वाला नियम है। पंजाब की स्कीम ऑल-ऑर-नथिंग है: 300 यूनिट या उससे कम रहने पर पूरा बिल फ्री है (सिर्फ फिक्स्ड चार्ज लागू होता है); एक भी यूनिट से 300 पार करने पर उस पूरे महीने की खपत मानक दरों पर बिल होती है, सिर्फ 300 से ऊपर की यूनिट्स नहीं।',
  },
  {
    q: 'PSPCL के मौजूदा घरेलू टैरिफ स्लैब क्या हैं?',
    a: 'पहली 100 यूनिट के लिए ₹3.49/यूनिट, 101–300 के लिए ₹5.84/यूनिट, और 300 से ऊपर ₹7.30/यूनिट — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर बिल होता है (टेलिस्कोपिक), और यह सिर्फ तब मायने रखता है जब फ्री-पावर स्कीम अब लागू न हो।',
  },
  {
    q: 'क्या 300-यूनिट नियम सबके लिए एक जैसा लागू होता है?',
    a: 'नहीं। सामान्य घरेलू उपभोक्ता 300 यूनिट/माह (द्वि-मासिक चक्र में 600) से ऊपर पूरी सब्सिडी खो देते हैं। अनुसूचित जाति, पिछड़ा वर्ग, BPL और स्वतंत्रता सेनानी परिवारों को इसकी बजाय एक ज़्यादा उदार, असल में टियर वाली स्कीम मिलती है — 600 यूनिट तक फ्री पावर, उसके ऊपर की खपत के लिए ही भुगतान। यह ज़्यादा उदार श्रेणी हमारे कैलकुलेटर में अलग से मॉडल नहीं की गई, जो सिर्फ सामान्य घरेलू नियम को कवर करता है।',
  },
  {
    q: 'क्या PSPCL पूरे पंजाब को कवर करता है?',
    a: 'हां — राजस्थान (तीन डिस्कॉम) या उत्तर प्रदेश (पांच) के उलट, पंजाब में एक ही, राज्यव्यापी डिस्ट्रिब्यूशन कंपनी है। PSPCL पूरे राज्य के लिए एकमात्र बिजली वितरक है।',
  },
  {
    q: 'क्या PSPCL कोई फ्यूल या पावर-परचेज़ एडजस्टमेंट लेता है?',
    a: 'हमारे पास यह पुष्टि करने वाला कोई सत्यापित मौजूदा आंकड़ा नहीं है कि PSPCL फिलहाल कोई सरचार्ज ले रहा है या नहीं — हमारा डेटा इसे शून्य दिखाता है, लेकिन यह कोई पुष्ट नो-सरचार्ज नीति नहीं है, बस एक मॉडल किए गए आंकड़े की अनुपस्थिति है।',
  },
  {
    q: 'पंजाब में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'हम फिलहाल इसे मॉडल नहीं करते। हमारा डेटा इसे शून्य दिखाता है, जो एक अपुष्ट प्लेसहोल्डर है, पुष्ट शून्य-ड्यूटी नीति नहीं — असली आंकड़े के लिए अपने बिल की ड्यूटी लाइन जांचें।',
  },
  {
    q: 'मैं अपना PSPCL बिल ऑनलाइन कैसे जांचूं या चुकाऊं?',
    a: 'billpayment.pspcl.in पर आधिकारिक PSPCL बिल पेमेंट पोर्टल पर जाएं, या PSPCL मोबाइल ऐप खोलें, अपना मौजूदा बिल पाने के लिए अपना Account/Consumer नंबर डालें, फिर UPI, कार्ड या नेट बैंकिंग से भुगतान करें। सवालों या आउटेज के लिए, 24×7 हेल्पलाइन 1912 पर कॉल करें।',
  },
  {
    q: 'PSPCL क्या है, और यह कैसे बना?',
    a: 'पंजाब स्टेट पावर कॉरपोरेशन लिमिटेड (PSPCL) 16 अप्रैल 2010 को इनकॉर्पोरेट हुआ, जब पंजाब स्टेट इलेक्ट्रिसिटी बोर्ड (PSEB) को PSPCL (जनरेशन और डिस्ट्रिब्यूशन) और पंजाब स्टेट ट्रांसमिशन कॉरपोरेशन लिमिटेड (PSTCL, ट्रांसमिशन) में बांटा गया।',
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
  ['रेजिडेंशियल', 'घर — इस गाइड की उदाहरण गणनाएं जिस श्रेणी का इस्तेमाल करती हैं'],
  ['कमर्शियल (NRS, 7 kW तक)', 'दुकानें और छोटे व्यवसाय'],
  ['इंडस्ट्रियल (Small Power, 20 kVA तक)', 'छोटी मैन्युफैक्चरिंग यूनिट्स'],
  ['कृषि (AP, मीटर्ड)', 'पंपसेट — कोई अलग फिक्स्ड चार्ज बिल्कुल नहीं'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 यूनिट', '₹3.49'],
  ['101–300 यूनिट', '₹5.84'],
  ['301+ यूनिट', '₹7.30'],
]

const otherCategoryRows: [string, string, string][] = [
  ['कमर्शियल (NRS, ≤7 kW)', '₹6.89 (0–500), ₹7.75 (501+)', '₹70/kW'],
  ['इंडस्ट्रियल (Small Power, ≤20 kVA)', '₹5.82 फ्लैट (प्रति kVAh)', '₹110/kVA'],
  ['कृषि (AP, मीटर्ड)', '₹6.70 फ्लैट', 'कोई नहीं — फिक्स्ड-चार्ज ढांचे से स्पष्ट रूप से बाहर'],
]

const workedExampleWithin: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स (एक महीना)', '250'],
  ['फ्री-पावर स्कीम', 'पूरा एनर्जी चार्ज माफ (₹1,225.00 मूल्य) — 300-यूनिट सीमा के भीतर'],
  ['फिक्स्ड चार्ज (फ्लैट)', '₹120.00'],
  ['अनुमानित कुल', '₹120.00'],
]

const workedExampleExceeded: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स (एक महीना)', '450'],
  ['फ्री-पावर स्कीम', 'महीने के लिए पूरी तरह वापस — 300-यूनिट सीमा पार'],
  ['स्लैब 1: 100 यूनिट (0–100) @ ₹3.49', '₹349.00'],
  ['स्लैब 2: 200 यूनिट (101–300) @ ₹5.84', '₹1,168.00'],
  ['स्लैब 3: 150 यूनिट (301–450) @ ₹7.30', '₹1,095.00'],
  ['एनर्जी चार्ज सबटोटल', '₹2,612.00'],
  ['फिक्स्ड चार्ज (फ्लैट)', '₹120.00'],
  ['अनुमानित कुल', '₹2,732.00'],
]

export default function PspclCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'PSPCL पूरी गाइड', href: `/hi${PATH}` },
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
          <strong>PSPCL</strong> (पंजाब स्टेट पावर कॉरपोरेशन लिमिटेड) पंजाब
          का एकमात्र, राज्यव्यापी बिजली वितरक है, जिसे{' '}
          <strong>पंजाब स्टेट इलेक्ट्रिसिटी रेगुलेटरी कमीशन (PSERC)</strong>{' '}
          नियंत्रित करता है। ज़्यादातर घरेलू उपभोक्ताओं को महीने में 300
          यूनिट तक फ्री पावर मिलती है — लेकिन यह स्कीम{' '}
          <strong>ऑल-ऑर-नथिंग</strong> है, कोई आंशिक भत्ता नहीं: 300 यूनिट
          पार करते ही पूरे महीने का बिल मानक दरों पर चार्ज होता है, सिर्फ
          300 से ऊपर की यूनिट्स नहीं। यह गाइड असली स्लैब, उस 300-यूनिट
          क्लिफ का सटीक तंत्र, और वे गैप कवर करती है जिनके लिए हमारे पास
          सत्यापित डेटा नहीं है।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            पंजाब स्टेट पावर कॉरपोरेशन लिमिटेड (PSPCL){' '}
            <strong>16 अप्रैल 2010</strong> को इनकॉर्पोरेट हुआ, जब पंजाब
            स्टेट इलेक्ट्रिसिटी बोर्ड (PSEB) को PSPCL (जनरेशन और
            डिस्ट्रिब्यूशन) और पंजाब स्टेट ट्रांसमिशन कॉरपोरेशन लिमिटेड
            (PSTCL, ट्रांसमिशन) में बांटा गया। कई पड़ोसी राज्यों के उलट,
            पंजाब को क्षेत्र के हिसाब से आगे नहीं बांटा गया — PSPCL{' '}
            <strong>पूरे राज्य के लिए एकमात्र डिस्ट्रिब्यूशन कंपनी</strong>{' '}
            है, राजस्थान के तीन डिस्कॉम या उत्तर प्रदेश के पांच जैसा कुछ
            नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका कनेक्शन पंजाब में कहीं भी है, तो PSPCL आपका
            डिस्कॉम है — यह जांचने की ज़रूरत नहीं कि आप किस क्षेत्र में हैं।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल चार PSPCL उपभोक्ता श्रेणियों को कवर
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
            निष्कर्ष: कृषि यहां सिर्फ सस्ती नहीं है — यह PSPCL के दो-भाग
            (एनर्जी + फिक्स्ड) टैरिफ ढांचे से पूरी तरह बाहर है, इसलिए जोड़ने
            के लिए कोई फिक्स्ड चार्ज है ही नहीं।
          </p>
        </section>

        <section aria-labelledby="free-power-rule" className="mt-10 scroll-mt-20">
          <h2 id="free-power-rule" className={h2Cls}>
            300-यूनिट नियम ऑल-ऑर-नथिंग है
          </h2>
          <p className={pCls}>
            पंजाब पात्र घरेलू उपभोक्ताओं को महीने में 300 यूनिट तक फ्री
            बिजली देता है — लेकिन यह किसी टैक्स-फ्री इनकम ब्रैकेट की तरह{' '}
            <strong>आंशिक भत्ता नहीं</strong> है। 300 यूनिट या उससे कम पर
            रहें तो पूरा एनर्जी चार्ज माफ है; एक भी यूनिट से 300 पार करें
            तो उस महीने की <strong>कोई भी</strong> खपत फ्री नहीं है — आप
            पूरी मात्रा पर मानक टेलिस्कोपिक दरें चुकाते हैं, सिर्फ 300 से
            ऊपर की यूनिट्स नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            एक ज़्यादा उदार श्रेणी भी है जिसे हम अलग से मॉडल नहीं करते:
            अनुसूचित जाति, पिछड़ा वर्ग, BPL और स्वतंत्रता सेनानी परिवारों
            को <strong>600 यूनिट</strong> तक फ्री पावर मिलती है, और —
            सामान्य स्कीम के उलट — वे सिर्फ 600 से <em>ऊपर</em> की खपत के
            लिए भुगतान करते हैं, एक असली आंशिक भत्ता। हमारा कैलकुलेटर सिर्फ
            सामान्य घरेलू नियम को कवर करता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: 301-यूनिट का महीना 300-यूनिट के महीने से नाटकीय रूप
            से महंगा पड़ सकता है — यह कितना ज़्यादा है, यह देखने के लिए नीचे
            उदाहरण गणना देखें।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू टैरिफ स्लैब
          </h2>
          <p className={pCls}>
            ये स्लैब सिर्फ तब मायने रखते हैं जब फ्री-पावर स्कीम अब लागू न
            हो — 1 अप्रैल 2025 से प्रभावी, हर बैंड सिर्फ उसके अंदर की
            यूनिट्स पर चार्ज होता है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्लैब (प्रति माह)</th>
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
            <strong>जानने लायक एक सोर्सिंग नोट:</strong> ये रेजिडेंशियल
            स्लैब एक प्राइमरी PSERC ऑर्डर क्रॉस-चेक के लंबित सेकंडरी-सोर्स्ड
            हैं। PSPCL व्यवहार में द्वि-मासिक बिल भी करता है और दरें
            स्वीकृत लोड बैंड (2 kW तक, 2–7 kW, 7–20 kW) के हिसाब से बदलती
            हैं — यह गाइड और कैलकुलेटर हर लोड बैंड को अलग-अलग मॉडल करने की
            बजाय एक प्रतिनिधि मासिक शेड्यूल इस्तेमाल करते हैं। सामान्य
            तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>
            , या अपनी यूनिट्स{' '}
            <Link href="/hi/electricity/punjab-electricity-bill-calculator" className="text-brass underline">
              PSPCL बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ज़्यादातर PSPCL घरों के लिए जो महीने में 300 यूनिट से
            कम इस्तेमाल करते हैं, ये स्लैब असल में कभी लागू ही नहीं होते —
            फ्री-पावर स्कीम पूरा एनर्जी चार्ज माफ कर देती है।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल, इंडस्ट्रियल और कृषि टैरिफ
          </h2>
          <p className={pCls}>
            तीनों PSERC के FY2025-26 शेड्यूल ऑफ टैरिफ (Annexure-A, Table
            6.2, ऑर्डर तारीख 28 मार्च 2025) से, PSPCL कमर्शियल सर्कुलर
            No. 06/2025 के ज़रिए प्राइमरी-सोर्स्ड हैं — लेकिन हर एक सिर्फ
            एक लोड बैंड कवर करता है:
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
            <strong>कमर्शियल नोट:</strong> यह सिर्फ &ldquo;7 kW तक&rdquo;
            लोड स्लैब कवर करता है। &ldquo;7kW से ऊपर और 20kW तक&rdquo; की
            एनर्जी दरें वही हैं लेकिन फिक्स्ड चार्ज ₹110/kW है;
            &ldquo;20kW/kVA से ऊपर 100kVA तक&rdquo; एक फ्लैट ₹6.75/kVAh है
            जिसका फिक्स्ड चार्ज ₹130/kVA है; &ldquo;100kVA से ऊपर&rdquo;
            ₹6.96/kVAh है जिसका फिक्स्ड चार्ज ₹140/kVA है — इनमें से कोई भी
            बड़ा बैंड यहां मॉडल नहीं किया गया।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>इंडस्ट्रियल नोट:</strong> यह सिर्फ &ldquo;Small
            Power&rdquo; श्रेणी (20 kVA तक लोड) कवर करता है। &ldquo;Medium
            Supply&rdquo; (20-100kVA: ₹6.25/kVAh, ₹145/kVA फिक्स्ड) और
            &ldquo;Large Supply&rdquo; (100kVA से ऊपर: ₹6.60-6.82/kVAh)
            मॉडल नहीं किए गए हैं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>कृषि नोट:</strong> ₹6.70/kWh की मीटर्ड दर का कोई अलग
            फिक्स्ड या डिमांड चार्ज बिल्कुल नहीं है — PSPCL का टैरिफ ऑर्डर
            खेती के पंपसेट को इसके दो-भाग टैरिफ ढांचे से स्पष्ट रूप से बाहर
            रखता है। AP कनेक्शन के लिए ₹492/BHP/माह की एक वैकल्पिक फ्लैट
            अनमीटर्ड दर भी मौजूद है लेकिन यहां मॉडल नहीं की गई।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: रेजिडेंशियल के अलावा, यहां हर श्रेणी सिर्फ एक लोड
            बैंड कवर करती है — एक बड़ा कमर्शियल या इंडस्ट्रियल कनेक्शन इस
            टेबल में दिखाए से अलग तरीके से बिल होगा।
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            श्रेणी के हिसाब से फिक्स्ड चार्ज
          </h2>
          <p className={pCls}>
            PSPCL का फिक्स्ड-चार्ज आधार श्रेणी के हिसाब से बदलता है —
            रेजिडेंशियल एक फ्लैट मासिक राशि है, कमर्शियल और इंडस्ट्रियल
            लोड के प्रति kW/kVA हैं, और कृषि में बिल्कुल नहीं है:
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
                  <td className="px-4 py-2">फ्लैट, प्रति माह</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹120</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">कमर्शियल (≤7 kW)</td>
                  <td className="px-4 py-2">प्रति kW, प्रति माह</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹70/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">इंडस्ट्रियल (≤20 kVA)</td>
                  <td className="px-4 py-2">प्रति kVA, प्रति माह</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹110/kVA</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">कृषि</td>
                  <td className="px-4 py-2">कोई नहीं</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: PSPCL का रेजिडेंशियल फिक्स्ड चार्ज इस सीरीज़ में
            सबसे सरल में से एक है — स्वीकृत लोड चाहे जो भी हो, एक फ्लैट
            ₹120/माह, राजस्थान या केरल के प्रति-kW ढांचों के उलट।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            फ्यूल/पावर-परचेज़ कॉस्ट एडजस्टमेंट — एक खुला गैप
          </h2>
          <p className={pCls}>
            हमारे पास यह पुष्टि करने वाला कोई सत्यापित मौजूदा आंकड़ा नहीं
            है कि PSPCL फिलहाल कोई फ्यूल या पावर-परचेज़ कॉस्ट एडजस्टमेंट ले
            रहा है या नहीं — सामान्य तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            । हमारा डेटा इसे शून्य दिखाता है, लेकिन यह एक अपुष्ट प्लेसहोल्डर
            है, कोई सत्यापित नो-सरचार्ज नीति नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका असली PSPCL बिल इस गाइड के उदाहरण से ज़्यादा
            आता है, वह भी 300 यूनिट से कम पर, तो एक अनमॉडल्ड सरचार्ज इसकी
            एक संभावित वजह है।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी — एक और खुला गैप
          </h2>
          <p className={pCls}>
            हम पंजाब की इलेक्ट्रिसिटी ड्यूटी को भी फिलहाल मॉडल नहीं करते।
            हमारा डेटा इसे शून्य दिखाता है, जो — ऊपर दिए फ्यूल एडजस्टमेंट
            की तरह — एक अपुष्ट प्लेसहोल्डर है, पुष्ट शून्य-ड्यूटी नीति
            नहीं। तुलना के लिए, केरल का KSEB एक सत्यापित 5% और
            महाराष्ट्र का MSEDCL एक सत्यापित 16% लेता है — हमारी{' '}
            <Link href="/hi/blog/kseb-complete-guide-electricity-bill" className="text-brass underline">
              KSEB
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            पूरी गाइड देखें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: दो असली चार्ज — फ्यूल एडजस्टमेंट और इलेक्ट्रिसिटी
            ड्यूटी — इस गाइड के बुनियादी अनुमान से बाहर हैं, वह भी
            300-यूनिट नियम की अपनी तीखी धार के ऊपर।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना PSPCL बिल कैसे जांचें और चुकाएं
          </h2>
          <p className={pCls}>
            सामान्य तरीका, PSPCL के अपने पोर्टल के ज़रिए (सही स्क्रीन समय
            के साथ बदल सकती हैं):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'billpayment.pspcl.in पर आधिकारिक PSPCL बिल पेमेंट पोर्टल पर जाएं, या PSPCL मोबाइल ऐप खोलें।',
              'अपना मौजूदा बिल पाने के लिए अपना Account/Consumer नंबर डालें।',
              'दिखाई गई राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें।',
              'अपने रिकॉर्ड के लिए भुगतान रसीद सेव करें।',
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
            बिलिंग सवालों या आउटेज के लिए, PSPCL की हेल्पलाइन{' '}
            <strong>1912</strong> है, जो 24×7 उपलब्ध है — यह गाइड और हमारा
            कैलकुलेटर अनुमान लगाने वाले टूल हैं, अकाउंट-विशिष्ट मामलों के
            लिए आपके असली बिल या PSPCL के अपने पोर्टल का विकल्प नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अकाउंट-विशिष्ट किसी भी चीज़ के लिए — बकाया, कोई
            विवादित रीडिंग, फ्री-पावर स्कीम के लिए आपकी सही पात्रता स्थिति
            — सीधे आधिकारिक पोर्टल या हेल्पलाइन पर जाएं, किसी कैलकुलेटर पर
            नहीं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: सीमा के भीतर बनाम पार
          </h2>
          <p className={pCls}>
            एक ही कनेक्शन पर दो खपत स्तर दिखाते हैं कि 300-यूनिट नियम असल
            में कितना तीखा है। यह कोई आंशिक-भत्ता स्कीम नहीं है — सीमा पार
            करें और उस महीने की कोई भी यूनिट फ्री नहीं है, सिर्फ 300 से
            ऊपर की यूनिट्स नहीं:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            परिदृश्य A — 250 यूनिट, 300-यूनिट सीमा के भीतर
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
            परिदृश्य B — 450 यूनिट, सीमा पार
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
            200 ज़्यादा यूनिट्स बिल को <strong>₹2,612</strong> बढ़ा देती
            हैं — सिर्फ अतिरिक्त यूनिट्स की वजह से नहीं, बल्कि इसलिए कि 300
            पार करना उस महीने के पूरे फ्री-पावर फायदे को खत्म कर देता है।
            किसी भी परिदृश्य में इलेक्ट्रिसिटी ड्यूटी या फ्यूल एडजस्टमेंट
            शामिल नहीं है (दोनों अनमॉडल्ड — ऊपर देखें)। अपनी यूनिट्स{' '}
            <Link href="/hi/electricity/punjab-electricity-bill-calculator" className="text-brass underline">
              PSPCL बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: 300 यूनिट के आसपास मंडराने वाले किसी PSPCL घर के पास
            उससे नीचे रहने की मज़बूत वजह है — इस उदाहरण में सीमा पार करने
            की कीमत सिर्फ-फिक्स्ड-चार्ज बिल की लगभग 23 गुना है, कोई धीरे-धीरे
            बढ़ने वाला स्टेप नहीं।
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
              href="/hi/electricity/punjab-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PSPCL बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इन्हीं सत्यापित स्लैब पर आधारित आपका अपना ब्यौरेवार अनुमान।
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
                कर्नाटक की गृह ज्योति स्कीम — 300 की बजाय 200 यूनिट पर वही
                ऑल-ऑर-नथिंग क्लिफ।
              </p>
            </Link>
            <Link
              href="/blog/tsspdcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                TGSPDCL (तेलंगाना) पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                तेलंगाना का अपना गृह ज्योति क्लिफ, 200 यूनिट पर, साथ ही सच में
                फ्री कृषि बिजली। (अंग्रेज़ी)
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
                JVVNL (राजस्थान) पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                कोई फ्री-पावर स्कीम नहीं, लेकिन इसकी बजाय भारत के सबसे ऊंचे
                फिक्स्ड चार्ज में से एक।
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
                PSPCL के तीन बैंड के पीछे का सामान्य तंत्र — जब फ्री-पावर
                स्कीम अब लागू न हो।
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
          गया। कमर्शियल, इंडस्ट्रियल और कृषि दरें PSERC के FY2025-26 शेड्यूल
          ऑफ टैरिफ (Annexure-A, Table 6.2, ऑर्डर तारीख 28 मार्च 2025) से,
          PSPCL कमर्शियल सर्कुलर No. 06/2025 के ज़रिए सोर्स की गई हैं (
          <a
            href="https://docs.pspcl.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            docs.pspcl.in
          </a>
          )। रेजिडेंशियल स्लैब एक प्राइमरी-डॉक्यूमेंट क्रॉस-चेक के लंबित
          सेकंडरी-सोर्स्ड हैं। 300-यूनिट फ्री-पावर स्कीम को ऑल-ऑर-नथिंग के
          रूप में मॉडल किया गया है, इस सत्यापित रिपोर्टिंग के आधार पर कि
          PSPCL इसे असल में कैसे लागू करता है — यह इस साइट के कैलकुलेटर
          इंजन में लागू एक असली फिक्स है, सिर्फ इस गाइड में नहीं। बड़े
          कमर्शियल/इंडस्ट्रियल लोड बैंड, ज़्यादा उदार SC/BC/BPL/स्वतंत्रता
          सेनानी 600-यूनिट स्कीम, फ्यूल/पावर-परचेज़ एडजस्टमेंट, और
          इलेक्ट्रिसिटी ड्यूटी आगे की सोर्सिंग के लंबित स्पष्ट रूप से मॉडल
          नहीं की गई हैं। दरें समय-समय पर संशोधित होती हैं — ऊपर दिया
          कैलकुलेटर मौजूदा रखा जाता है; इस लेख को उसके साथ एक व्याख्यात्मक
          रेफरेंस के रूप में लें। इस साइट पर हम टैरिफ डेटा कैसे सोर्स और
          सत्यापित करते हैं, इसके लिए हमारी{' '}
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
