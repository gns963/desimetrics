import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/wbsedcl-complete-guide-electricity-bill'
const TITLE = 'WBSEDCL बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित WBSEDCL टैरिफ स्लैब, तिमाही बिलिंग की खासियत, फिक्स्ड चार्ज और MVCA गैप एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल, इंडस्ट्रियल और कृषि टेबल, एक उदाहरण गणना, और अपना पश्चिम बंगाल बिजली बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '22 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '29 अगस्त 2026'

export const metadata: Metadata = {
  title: 'WBSEDCL पूरी बिल गाइड — तिमाही टैरिफ और चार्ज 2026',
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
  dateModified: '2026-09-22',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'WBSEDCL रेजिडेंशियल तिमाही टैरिफ स्लैब',
  description: 'पश्चिम बंगाल (WBSEDCL) के लिए टेलिस्कोपिक तिमाही घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा WBSEDCL बिजली बिल कैसे गिना जाता है?',
    a: 'आपके घरेलू WBSEDCL बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (₹4.10 से ₹6.81/यूनिट के पांच बैंड, तिमाही बिल होते हैं) और स्वीकृत लोड के प्रति kW ₹90 प्रति तिमाही का फिक्स्ड चार्ज जुड़ता है। आपके असली बिल में एक मंथली वेरिएबल कॉस्ट एडजस्टमेंट (MVCA) और इलेक्ट्रिसिटी ड्यूटी भी शामिल है जो इस बुनियादी ढांचे का हिस्सा नहीं हैं।',
  },
  {
    q: "WBSEDCL के मौजूदा घरेलू टैरिफ स्लैब क्या हैं?",
    a: 'पहली 102 यूनिट के लिए ₹4.10/यूनिट, 103–180 के लिए ₹5.34/यूनिट, 181–300 के लिए ₹6.15/यूनिट, 301–600 के लिए ₹6.65/यूनिट, और 600 से ऊपर ₹6.81/यूनिट — ये तिमाही (तीन महीने की) स्लैब सीमाएं हैं, मासिक नहीं। 1 अप्रैल 2025 से प्रभावी।',
  },
  {
    q: 'क्या WBSEDCL वाकई हर तीन महीने में बिल करता है?',
    a: 'हां, ज़्यादातर घरेलू कनेक्शन के लिए — WBSEDCL का स्टैंडर्ड टैरिफ शेड्यूल एक तिमाही चक्र के लिए लिखा गया है, यही वजह है कि इसकी स्लैब सीमाएं मासिक-बिल वाले डिस्कॉम की तुलना में असामान्य रूप से बड़ी दिखती हैं। प्रीपेड स्मार्ट मीटर इसकी बजाय मासिक स्लैब इस्तेमाल करते हैं, जो तिमाही सीमाओं के एक-तिहाई के बराबर हैं, वही प्रति-यूनिट दरों पर।',
  },
  {
    q: 'मेरे WBSEDCL बिल पर MVCA क्या है?',
    a: 'MVCA (मंथली वेरिएबल कॉस्ट एडजस्टमेंट) एक सरचार्ज है जो हर बिलिंग महीने बदलता है ताकि WBSEDCL के फ्यूल और पावर-परचेज़ कॉस्ट को ट्रैक किया जा सके। हमारे पास इसके लिए कोई मौजूदा सत्यापित दर नहीं है, इसलिए यह इस गाइड की टेबल या कैलकुलेटर में शामिल नहीं है — आपका असली बिल उस महीने लागू MVCA के हिसाब से अलग होगा।',
  },
  {
    q: 'WBSEDCL बिल पर फिक्स्ड चार्ज किस पर आधारित है?',
    a: 'घरेलू कनेक्शन के लिए यह स्वीकृत लोड के प्रति kW ₹90 प्रति तिमाही है (यानी ₹30/kVA प्रति महीना के बराबर)। कमर्शियल (₹180/kW) और इंडस्ट्रियल (₹225/kW) कनेक्शन की अपनी अलग प्रति-kW तिमाही दरें हैं।',
  },
  {
    q: 'पश्चिम बंगाल में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'हमारे सोर्स्ड डेटा में WBSEDCL के लिए एक सत्यापित इलेक्ट्रिसिटी ड्यूटी दर नहीं है — हमारा कैलकुलेटर फिलहाल 0% लागू करता है, लेकिन यह एक अपुष्ट प्लेसहोल्डर है, कोई पुष्ट शून्य-ड्यूटी नीति नहीं। असली वसूली गई राशि के लिए अपने बिल की ड्यूटी लाइन जांचें।',
  },
  {
    q: 'मैं अपना WBSEDCL बिल ऑनलाइन कैसे जांचूं?',
    a: 'portal.wbsedcl.in पर आधिकारिक WBSEDCL पोर्टल पर जाएं और "Online Payment" → "Quick Pay" चुनें, फिर अपना मौजूदा बिल देखने के लिए अपना Consumer ID डालें।',
  },
  {
    q: 'मैं अपना WBSEDCL बिल कैसे चुकाऊं?',
    a: 'उसी पोर्टल के ज़रिए UPI, कार्ड या नेट बैंकिंग से भुगतान करें, और भुगतान की पुष्टि सेव करें। बिलिंग सवालों के लिए, WBSEDCL की हेल्पलाइन 19121 है, जो 24×7 उपलब्ध है।',
  },
  {
    q: 'क्या WBSEDCL कोलकाता को बिजली सप्लाई करता है?',
    a: 'नहीं। कोलकाता, हावड़ा और उत्तर/दक्षिण 24 परगना व हुगली के कुछ हिस्सों को CESC लिमिटेड सर्व करता है, जो अपने खुद के WBERC-अनुमोदित टैरिफ वाला एक अलग प्राइवेट लाइसेंसी है — जो फिलहाल इस साइट पर मॉडल नहीं किया गया। WBSEDCL उस इलाके के बाहर बाकी पश्चिम बंगाल को कवर करता है।',
  },
  {
    q: 'मैं अपने इस्तेमाल के लिए अपना सटीक WBSEDCL बिल कहां पा सकता हूं?',
    a: 'हमारा WBSEDCL बिल कैलकुलेटर इस्तेमाल करें, जो इन्हीं सत्यापित तिमाही स्लैब और फिक्स्ड चार्ज को आपकी अपनी यूनिट्स और स्वीकृत लोड पर लागू करके एक ब्यौरेवार अनुमान, साथ ही एक मासिक-बराबर आंकड़ा देता है।',
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
  ['रेजिडेंशियल', 'घर — इस गाइड की उदाहरण गणना जिस श्रेणी का इस्तेमाल करती है'],
  ['कमर्शियल, दर A(CM)', 'दुकानें, ऑफिस और व्यवसाय'],
  ['इंडस्ट्रियल, दर B(I-U)', 'शहरी इंडस्ट्रियल कनेक्शन'],
  ['कृषि, दर C(T)', 'मीटर्ड इरिगेशन पंप सेट, टाइम-ऑफ-डे टैरिफ पर'],
]

const domesticSlabs: [string, string][] = [
  ['0–102 यूनिट', '₹4.10'],
  ['103–180 यूनिट', '₹5.34'],
  ['181–300 यूनिट', '₹6.15'],
  ['301–600 यूनिट', '₹6.65'],
  ['601+ यूनिट', '₹6.81'],
]

const otherCategoryRows: [string, string, string][] = [
  ['कमर्शियल, दर A(CM)', 'पांच तिमाही बैंड में ₹5.77 / ₹7.52 / ₹8.20 / ₹8.51 / ₹9.02', '₹180/kW'],
  ['इंडस्ट्रियल, दर B(I-U)', '₹5.23 (0–1,500), ₹7.86 (1,501–6,000), ₹7.83 (6,000+)', '₹225/kW'],
  ['कृषि, दर C(T) — सिर्फ दिन में', '₹3.27 फ्लैट (06:00–17:00, सब्सिडी घटाकर)', '₹90/kW'],
]

const fixedChargeRows: [string, string, string][] = [
  ['रेजिडेंशियल', 'स्वीकृत लोड के हिसाब से (प्रति तिमाही)', '₹90/kW'],
  ['कमर्शियल', 'स्वीकृत लोड के हिसाब से (प्रति तिमाही)', '₹180/kW'],
  ['इंडस्ट्रियल', 'स्वीकृत लोड के हिसाब से (प्रति तिमाही)', '₹225/kW'],
  ['कृषि', 'स्वीकृत लोड के हिसाब से (प्रति तिमाही, सब्सिडी घटाकर)', '₹90/kW'],
]

const workedExample300: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स (एक तिमाही)', '300'],
  ['स्वीकृत लोड (माना गया)', '2 kW'],
  ['स्लैब 1: 0–102 यूनिट @ ₹4.10', '₹418.20'],
  ['स्लैब 2: 78 यूनिट (103–180) @ ₹5.34', '₹416.52'],
  ['स्लैब 3: 120 यूनिट (181–300) @ ₹6.15', '₹738.00'],
  ['एनर्जी चार्ज सबटोटल', '₹1,572.72'],
  ['फिक्स्ड चार्ज (2 kW × ₹90/तिमाही)', '₹180.00'],
  ['अनुमानित कुल (प्रति तिमाही, सिर्फ बुनियादी ढांचा)', '₹1,752.72'],
  ['मासिक-बराबर (÷ 3)', '≈₹584.24'],
]

export default function WbsedclCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'WBSEDCL पूरी गाइड', href: `/hi${PATH}` },
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
          <strong>WBSEDCL</strong> (वेस्ट बंगाल स्टेट इलेक्ट्रिसिटी डिस्ट्रिब्यूशन
          कं. लिमिटेड) ज़्यादातर पश्चिम बंगाल में बिजली बांटता है, जिसे{' '}
          <strong>पश्चिम बंगाल इलेक्ट्रिसिटी रेगुलेटरी कमीशन (WBERC)</strong>{' '}
          नियंत्रित करता है। यह उन चंद बड़े भारतीय डिस्कॉम में से एक है जो
          ज़्यादातर घरेलू उपभोक्ताओं को मासिक की बजाय{' '}
          <strong>तिमाही</strong> बिल करता है, इसलिए इसकी स्लैब सीमाएं पहली
          नज़र में असामान्य रूप से बड़ी दिखती हैं। एक सामान्य WBSEDCL घरेलू
          बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज, स्वीकृत लोड से
          जुड़ा फिक्स्ड चार्ज — साथ ही एक मंथली वेरिएबल कॉस्ट एडजस्टमेंट
          (MVCA) और इलेक्ट्रिसिटी ड्यूटी शामिल होते हैं जिन्हें यह गाइड फ्लैग
          करती है पर मॉडल नहीं करती, क्योंकि हमारे सोर्स्ड डेटा में इनमें से
          किसी की भी मौजूदा सत्यापित दर उपलब्ध नहीं है।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            वेस्ट बंगाल स्टेट इलेक्ट्रिसिटी बोर्ड (WBSEB) 1955 में बना था।
            WBSEDCL खुद 1 अप्रैल 2007 को बना, जब राज्य की पावर रिफॉर्म स्कीम के
            तहत WBSEB को WBSEDCL (डिस्ट्रिब्यूशन) और वेस्ट बंगाल स्टेट
            इलेक्ट्रिसिटी ट्रांसमिशन कंपनी लिमिटेड (WBSETCL, ट्रांसमिशन) में
            बांटा गया। WBSEDCL ज़्यादातर पश्चिम बंगाल को कवर करता है, एक खास
            अपवाद के साथ: <strong>कोलकाता, हावड़ा और उत्तर/दक्षिण 24 परगना व
            हुगली के कुछ हिस्सों</strong> को CESC लिमिटेड सर्व करता है, जो
            अपने खुद के WBERC-अनुमोदित टैरिफ वाला एक अलग प्राइवेट लाइसेंसी
            है। CESC का फिलहाल इस साइट पर अपना कैलकुलेटर नहीं है; अगर आपका
            बिल WBSEDCL की बजाय CESC का नाम लेता है, तो इस गाइड के टैरिफ आप
            पर लागू नहीं होंगे।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: इस गाइड का इस्तेमाल करने से पहले अपने बिल पर लिखा सही
            नाम जांचें — यह WBSEDCL कनेक्शन पर लागू होती है, कोलकाता और
            हावड़ा को कवर करने वाले अलग CESC लाइसेंस क्षेत्र पर नहीं।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल चार WBSEDCL उपभोक्ता श्रेणियों को कवर
            करता है, सभी एक ही <strong>तिमाही</strong> चक्र पर बिल होती हैं:
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
            निष्कर्ष: इस पेज पर हर दर प्रति-तिमाही (तीन महीने) का आंकड़ा है —
            बिना कन्वर्ट किए इसकी सीधे किसी मासिक-बिल वाले डिस्कॉम से तुलना
            न करें।
          </p>
        </section>

        <section aria-labelledby="quarterly" className="mt-10 scroll-mt-20">
          <h2 id="quarterly" className={h2Cls}>
            तिमाही बिलिंग — पश्चिम बंगाल की एक खासियत
          </h2>
          <p className={pCls}>
            ज़्यादातर भारतीय डिस्कॉम मासिक या द्वि-मासिक बिल करते हैं;
            WBSEDCL का स्टैंडर्ड घरेलू शेड्यूल इसकी बजाय एक{' '}
            <strong>तिमाही (~90-दिन)</strong> चक्र के लिए लिखा गया है, यही
            वजह है कि इसकी स्लैब सीमाएं (600+ यूनिट तक) किसी मासिक डिस्कॉम की
            तुलना में कहीं बड़ी दिखती हैं। अगर आप WBSEDCL के बिल की किसी अन्य
            राज्य से तुलना कर रहे हैं, तो एक सही मासिक-बराबर तुलना के लिए
            तिमाही कुल को तीन से भाग दें — हमारा कैलकुलेटर यह अपने आप करता
            है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            प्रीपेड स्मार्ट मीटर इसकी बजाय मासिक बिल होते हैं, यहां दिखाई गई
            तिमाही सीमाओं के एक-तिहाई के बराबर स्लैब सीमाओं का इस्तेमाल करते
            हुए, वही प्रति-यूनिट दरों पर।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: WBSEDCL का &ldquo;300 यूनिट&rdquo; वाला बिल आम तौर पर
            तीन महीने के इस्तेमाल का मतलब रखता है, एक महीने का नहीं — डिस्कॉम
            में आंकड़ों की तुलना करने से पहले यह जांच लें।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू टैरिफ स्लैब (तिमाही)
          </h2>
          <p className={pCls}>
            WBSEDCL घरेलू खपत को पांच टेलिस्कोपिक स्लैब से बिल करता है, 1
            अप्रैल 2025 से प्रभावी — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर
            बिल होता है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्लैब (प्रति तिमाही)</th>
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
            इसके पीछे के सामान्य तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>
            । एक तुरंत, ब्यौरेवार अनुमान और एक मासिक-बराबर आंकड़े के लिए अपनी
            तिमाही यूनिट्स{' '}
            <Link href="/hi/electricity/wbsedcl-bill-calculator" className="text-brass underline">
              WBSEDCL बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: सिर्फ स्लैब के अंदर की यूनिट्स ही उस स्लैब की दर पर
            लगती हैं — किसी तिमाही की पहली 102 यूनिट हमेशा ₹4.10 पर रहती हैं,
            चाहे आप कितना भी ज़्यादा इस्तेमाल करें।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल, इंडस्ट्रियल और कृषि टैरिफ
          </h2>
          <p className={pCls}>
            तीनों 20 मार्च 2025 के WBERC टैरिफ ऑर्डर से प्राइमरी-सोर्स्ड हैं,
            लेकिन हर एक के साथ जानने लायक एक असली नोट है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 font-semibold">दर/यूनिट (प्रति तिमाही)</th>
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
            <strong>इंडस्ट्रियल नोट:</strong> WBERC का ऑर्डर असल में इन्हें
            मासिक स्लैब के रूप में प्रकाशित करता है (पहली 500 यूनिट ₹5.23 पर,
            अगली 1,500 ₹7.86 पर, 2,000 से ऊपर ₹7.83 पर) — हमने इस फाइल के
            तिमाही बिलिंग चक्र से मिलाने के लिए स्लैब सीमाओं को तीन से गुणा
            किया है; प्रति-यूनिट दरें खुद नहीं बदली हैं। एक लगभग एक जैसी रूरल
            इंडस्ट्रियल दर (₹5.07/₹7.65/₹7.57) मौजूद है और इसे अलग से मॉडल
            नहीं किया गया है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>कृषि नोट — इस पेज पर सबसे ज़रूरी:</strong> ऊपर दी गई
            ₹3.27/यूनिट दर एक <strong>टाइम-ऑफ-डे</strong> टैरिफ की सिर्फ दिन
            (06:00–17:00) की दर है, पश्चिम बंगाल सरकार की सब्सिडी घटाने के
            बाद। शाम की पीक (17:00–23:00) दर कहीं ज़्यादा है,{' '}
            <strong>₹7.48/यूनिट</strong>, और रात (23:00–06:00) की दर कम है,
            ₹2.42/यूनिट। यहां दिखाई गई सिंगल फ्लैट दिन की दर का इस्तेमाल किसी
            शाम-भारी इरिगेशन इस्तेमाल के लिए बिल को काफी <em>कम करके</em>{' '}
            दिखाएगा, क्योंकि टाइम-ऑफ-डे बिलिंग मॉडल नहीं की गई है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपकी कृषि पंपिंग ज़्यादातर शाम को होती है, तो ऊपर
            दी फ्लैट दर को नज़रअंदाज़ करें — आपका असली बिल काफी ज़्यादा है।
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            श्रेणी के हिसाब से फिक्स्ड चार्ज
          </h2>
          <p className={pCls}>
            यहां हर WBSEDCL श्रेणी अपना फिक्स्ड चार्ज{' '}
            <strong>स्वीकृत लोड के प्रति kW, प्रति तिमाही</strong> बिल करती
            है — WBERC का ऑर्डर असल में इन्हें एक मासिक ₹/kVA दर के रूप में
            बताता है, जिसे हमने तिमाही चक्र से मिलाने के लिए तीन से गुणा
            किया है:
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
            निष्कर्ष: बहुत कम इस्तेमाल वाली तिमाही में भी आपका फिक्स्ड चार्ज
            नहीं बदलता — यह आपके मीटर रीडिंग से नहीं, आपके स्वीकृत लोड से
            जुड़ा है।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            MVCA (WBSEDCL का फ्यूल एडजस्टमेंट)
          </h2>
          <p className={pCls}>
            WBSEDCL ऊपर दिए एनर्जी और फिक्स्ड चार्ज के ऊपर एक{' '}
            <strong>मंथली वेरिएबल कॉस्ट एडजस्टमेंट (MVCA)</strong> लागू करता
            है, जो फ्यूल और पावर-परचेज़ कॉस्ट को ट्रैक करने के लिए हर बिलिंग
            महीने बदलता है। इस तरह के चार्ज के पीछे के सामान्य तंत्र के लिए
            देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            ।
          </p>
          <p className={`mt-3 ${pCls}`}>
            हमारे पास फिलहाल हमारे सोर्स्ड डेटा में कोई सत्यापित, मौजूदा MVCA
            दर नहीं है, इसलिए यह ऊपर दी टेबल या WBSEDCL कैलकुलेटर में मॉडल
            नहीं की गई है — कोई अंदाज़ा लगाया आंकड़ा प्रकाशित करने की बजाय,
            हम इस गैप को साफ तौर पर फ्लैग कर रहे हैं। आपका असली WBSEDCL बिल
            इस गाइड और कैलकुलेटर के बुनियादी अनुमान से कुछ ज़्यादा या कम
            होगा, उस महीने लागू प्रचलित MVCA के हिसाब से।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका असली WBSEDCL बिल इस गाइड की उदाहरण गणना से
            मेल नहीं खाता, तो MVCA सबसे संभावित वजह है, न कि कोई गणना की
            गलती।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी — हमारे डेटा में एक खुला गैप
          </h2>
          <p className={pCls}>
            हमारे पास WBSEDCL के लिए{' '}
            <strong>सत्यापित इलेक्ट्रिसिटी ड्यूटी दर नहीं है</strong>। हमारा
            कैलकुलेटर फिलहाल 0% लागू करता है, लेकिन यह हमारी सोर्सिंग में एक
            अपुष्ट प्लेसहोल्डर दर्शाता है, पश्चिम बंगाल में कोई पुष्ट
            शून्य-ड्यूटी नीति नहीं — इस आंकड़े के पीछे का सोर्स नोट साफ तौर
            पर कहता है कि इलेक्ट्रिसिटी ड्यूटी अभी मॉडल नहीं की गई है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            तुलना के लिए, महाराष्ट्र का MSEDCL एक सत्यापित 16% और उत्तर
            प्रदेश का UPPCL एक सत्यापित 5% लेता है — हमारी{' '}
            <Link href="/hi/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL
            </Link>{' '}
            पूरी गाइड देखें; कर्नाटक के BESCOM में WBSEDCL जैसा ही
            अपुष्ट-ड्यूटी गैप है — हमारी{' '}
            <Link href="/hi/blog/bescom-complete-guide-electricity-bill" className="text-brass underline">
              BESCOM पूरी गाइड
            </Link>{' '}
            देखें। जब तक हम किसी प्राइमरी WBERC ऑर्डर के मुकाबले पश्चिम
            बंगाल की असली दर की पुष्टि नहीं कर सकते, कैलकुलेटर के 0% को तथ्य
            मानने की बजाय अपने बिल की ड्यूटी लाइन सीधे जांचें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: MVCA और इलेक्ट्रिसिटी ड्यूटी के बीच, WBSEDCL बिल की दो
            असली लाइनें इस गाइड के बुनियादी अनुमान में शामिल नहीं हैं —
            अपने असली बिल के ज़्यादा होने की उम्मीद रखें।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना WBSEDCL बिल कैसे जांचें और चुकाएं
          </h2>
          <p className={pCls}>
            सामान्य तरीका, WBSEDCL के अपने पोर्टल के ज़रिए (सही स्क्रीन समय
            के साथ बदल सकती हैं):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'portal.wbsedcl.in पर WBSEDCL पोर्टल पर जाएं और "Online Payment" → "Quick Pay" चुनें।',
              'अपना मौजूदा बिल पाने के लिए अपना Consumer ID डालें।',
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
            बिलिंग सवालों या विवादों के लिए, WBSEDCL की हेल्पलाइन{' '}
            <strong>19121</strong> है, जो 24×7 उपलब्ध है — यह गाइड और हमारा
            कैलकुलेटर अनुमान लगाने वाले टूल हैं, अकाउंट-विशिष्ट मामलों के
            लिए आधिकारिक पोर्टल का विकल्प नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अकाउंट-विशिष्ट किसी भी चीज़ के लिए — बकाया, कोई विवादित
            रीडिंग, प्रचलित MVCA — सीधे आधिकारिक पोर्टल या हेल्पलाइन पर जाएं,
            किसी कैलकुलेटर पर नहीं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: 300 यूनिट, एक तिमाही, घरेलू कनेक्शन
          </h2>
          <p className={pCls}>
            ऊपर दिए सत्यापित स्लैब का इस्तेमाल करते हुए, यहां एक तिमाही
            (तीन महीने) में 300 यूनिट इस्तेमाल करने वाले घरेलू कनेक्शन की
            पूरी गणना है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample300.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample300.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample300.length - 1
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
            यह ₹1,752.72 सिर्फ यहां मॉडल किए गए एनर्जी चार्ज और फिक्स्ड
            चार्ज को कवर करता है — आपके असली बिल में ऊपर बताए MVCA और
            इलेक्ट्रिसिटी ड्यूटी के साथ-साथ बकाया जैसी अकाउंट-विशिष्ट चीज़ें
            भी शामिल हैं, इसलिए अपने WBSEDCL बिल के असली आंकड़े के ज़्यादा
            होने की उम्मीद रखें। घरेलू के अलावा किसी भी श्रेणी सहित अपनी सही
            यूनिट्स{' '}
            <Link href="/hi/electricity/wbsedcl-bill-calculator" className="text-brass underline">
              WBSEDCL बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: नतीजा निकालने से पहले हमेशा जांचें कि आप जिस WBSEDCL
            आंकड़े की तुलना कर रहे हैं वह तिमाही है या मासिक-बराबर — यह
            उदाहरण दोनों दिखाता है।
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
              href="/hi/electricity/wbsedcl-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                WBSEDCL बिल कैलकुलेटर
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
                कर्नाटक की गृह ज्योति योजना और वही ड्यूटी गैप।
              </p>
            </Link>
            <Link
              href="/hi/blog/kseb-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                KSEB पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                केरल की 250-यूनिट नॉन-टेलिस्कोपिक क्लिफ, इस राज्य की तिमाही
                साइकिल जैसी एक और बिलिंग खासियत।
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
                राजस्थान की अपनी अनमॉडल्ड प्रति-यूनिट ड्यूटी, और भारत के सबसे
                ऊंचे फिक्स्ड चार्ज में से एक।
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
                WBSEDCL के पांच बैंड के पीछे का सामान्य तंत्र।
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
          गया, WBSEDCL के{' '}
          <a
            href="https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Gist of Tariff Order 2025-26
          </a>{' '}
          से सोर्स किया गया, 20 मार्च 2025 के WBERC ऑर्डर के हिसाब से, 1
          अप्रैल 2025 से प्रभावी। इंडस्ट्रियल और फिक्स्ड-चार्ज आंकड़े ऑर्डर
          की प्रकाशित मासिक दरों से इस फाइल के तिमाही चक्र में तीन से गुणा
          करके बदले गए हैं; MVCA, इलेक्ट्रिसिटी ड्यूटी, और दिन की खिड़की से
          बाहर की टाइम-ऑफ-डे कृषि दरें आगे की सोर्सिंग के लंबित साफ तौर पर
          मॉडल नहीं की गई हैं। दरें समय-समय पर संशोधित होती हैं — ऊपर दिया
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
