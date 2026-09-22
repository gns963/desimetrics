import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/tsspdcl-complete-guide-electricity-bill'
const TITLE = 'TGSPDCL/TSSPDCL (तेलंगाना) बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित TGSPDCL टैरिफ स्लैब, गृह ज्योति का 200-यूनिट ऑल-ऑर-नथिंग नियम, सच में फ्री कृषि बिजली, और खुले गैप एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल, इंडस्ट्रियल और कृषि टेबल, दो उदाहरण गणनाएं, और अपना हैदराबाद/तेलंगाना बिजली बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '22 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '29 अगस्त 2026'

export const metadata: Metadata = {
  title: 'TGSPDCL पूरी बिल गाइड — तेलंगाना टैरिफ स्लैब और चार्ज 2026',
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
  datePublished: '2026-09-22',
  dateModified: '2026-09-22',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'TGSPDCL रेजिडेंशियल टेलिस्कोपिक टैरिफ स्लैब',
  description: 'दक्षिणी तेलंगाना (TGSPDCL/TSSPDCL) के लिए टेलिस्कोपिक मासिक घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा TGSPDCL बिजली बिल कैसे गिना जाता है?',
    a: 'आपके घरेलू TGSPDCL बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (₹1.95 से ₹6.50/यूनिट), स्वीकृत लोड के प्रति kW ₹10 का फिक्स्ड चार्ज, और 6% इलेक्ट्रिसिटी ड्यूटी जुड़ती है — लेकिन व्हाइट-राशन-कार्ड वाले घरों को गृह ज्योति के तहत पूरा एनर्जी चार्ज माफ मिलता है, जब तक मासिक खपत 200 यूनिट या उससे कम रहती है।',
  },
  {
    q: 'गृह ज्योति के तहत अगर मैं 200 यूनिट से ज़्यादा इस्तेमाल करूं तो क्या होगा? क्या मैं सिर्फ अतिरिक्त यूनिट्स के लिए भुगतान करता हूं?',
    a: 'नहीं — यह ऑल-ऑर-नथिंग है, कर्नाटक की गृह ज्योति और पंजाब की फ्री-पावर स्कीम जैसा ही तंत्र। 200 यूनिट या उससे कम रहने पर पूरा एनर्जी चार्ज माफ है; एक भी यूनिट से 200 पार करने पर उस पूरे महीने की खपत मानक टेलिस्कोपिक दरों पर बिल होती है, सिर्फ 200 से ऊपर की यूनिट्स नहीं। तेलंगाना के डिप्टी CM और एनर्जी मिनिस्टर ने सीधे इसकी पुष्टि की है।',
  },
  {
    q: 'TGSPDCL के मौजूदा घरेलू टैरिफ स्लैब क्या हैं?',
    a: 'पहली 50 यूनिट के लिए ₹1.95/यूनिट, 51–100 के लिए ₹3.10/यूनिट, 101–200 के लिए ₹4.80/यूनिट, और 200 से ऊपर ₹6.50/यूनिट — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर बिल होता है, और यह सिर्फ तब मायने रखता है जब गृह ज्योति अब लागू न हो।',
  },
  {
    q: 'क्या TGSPDCL पूरे तेलंगाना को बिजली सप्लाई करता है?',
    a: 'नहीं। TGSPDCL (जिसे TSSPDCL भी कहते हैं) हैदराबाद और 14 दक्षिणी ज़िलों को कवर करता है, लगभग 1.11 करोड़ उपभोक्ताओं को सर्व करते हुए। 18 उत्तरी ज़िले, जिनका मुख्यालय हनुमकोंडा में है, एक अलग कंपनी TGNPDCL सर्व करती है, जिसका इस साइट पर कोई कैलकुलेटर नहीं है — दोनों यहां दिखाया गया एक ही TSERC टैरिफ शेयर करते हैं।',
  },
  {
    q: 'क्या तेलंगाना में कृषि बिजली सच में फ्री है?',
    a: 'ज़्यादातर फार्म कनेक्शन के लिए, हां — कैटेगरी LT-V(A) \'Other than Corporate Farmers\' TGERC के अपने टैरिफ शेड्यूल के हिसाब से ₹0/यूनिट चुकाती है, कोई फिक्स्ड चार्ज बिल्कुल नहीं। एक अलग \'Corporate Farmers\' सब-कैटेगरी इसकी बजाय ₹2.50/यूनिट चुकाती है, जो यहां मॉडल नहीं की गई।',
  },
  {
    q: 'यह डेटा कितना भरोसेमंद है — क्या यह प्राइमरी-सोर्स्ड है?',
    a: 'यह मिला-जुला है, वही पैटर्न जो हमने KSEB, JVVNL और PSPCL पर फ्लैग किया है: TGSPDCL की कमर्शियल, इंडस्ट्रियल और कृषि दरें सीधे TGERC के Retail Supply Tariff Schedule for FY2025-26 से PRIMARY-सोर्स्ड हैं। ऊपर दिए रेजिडेंशियल स्लैब एक प्राइमरी क्रॉस-चेक के लंबित एक सेकंडरी-सोर्स्ड अनुमान हैं।',
  },
  {
    q: 'तेलंगाना में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'हमारा डेटा श्रेणियों में एक फ्लैट 6% इस्तेमाल करता है, लेकिन TGERC का अपना कमर्शियल टैरिफ नोट कहता है कि ड्यूटी तेलंगाना इलेक्ट्रिसिटी ड्यूटी एक्ट के तहत अलग से चार्ज होती है और ऑर्डर में खुद इसकी मात्रा तय नहीं की गई है — इसलिए दिखाया गया 6% रेजिडेंशियल के बाहर सटीक नहीं हो सकता। पुष्ट आंकड़े के लिए अपने बिल की ड्यूटी लाइन जांचें।',
  },
  {
    q: 'मैं अपना TGSPDCL बिल ऑनलाइन कैसे जांचूं या चुकाऊं?',
    a: 'tgsouthernpower.org पर आधिकारिक पोर्टल या TGSPDCL Citizen ऐप पर जाएं, अपना मौजूदा बिल पाने के लिए अपना Unique Service Number (USC) डालें, फिर UPI, कार्ड या नेट बैंकिंग से भुगतान करें। सवालों के लिए, 24×7 हेल्पलाइन 1912 या 1800-599-01912 पर कॉल करें।',
  },
  {
    q: 'TGSPDCL क्या है, और यह कैसे बना?',
    a: 'जब आंध्र प्रदेश को AP पुनर्गठन अधिनियम के तहत 2 जून 2014 को बांटा गया, तब नए तेलंगाना राज्य को सर्व करने वाली पूर्ववर्ती APSEB की दक्षिणी डिस्ट्रिब्यूशन शाखा को तेलंगाना स्टेट सदर्न पावर डिस्ट्रिब्यूशन कंपनी लिमिटेड (TGSPDCL/TSSPDCL) में पुनर्गठित किया गया, साथ ही एक अलग उत्तरी कंपनी TGNPDCL भी बनी।',
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
  ['कमर्शियल (LT-II(B))', '50 यूनिट/माह से ऊपर के नॉन-डोमेस्टिक कनेक्शन'],
  ['इंडस्ट्रियल (LT-III)', 'मैन्युफैक्चरिंग, 75kW/100HP कॉन्ट्रैक्ट लोड तक'],
  ['कृषि (LT-V(A))', 'फार्म पंपसेट — ज़्यादातर कनेक्शन के लिए सच में फ्री'],
]

const domesticSlabs: [string, string][] = [
  ['0–50 यूनिट', '₹1.95'],
  ['51–100 यूनिट', '₹3.10'],
  ['101–200 यूनिट', '₹4.80'],
  ['201+ यूनिट', '₹6.50'],
]

const otherCategoryRows: [string, string, string][] = [
  ['कमर्शियल (LT-II(B), >50 यूनिट)', 'चार बैंड में ₹8.50/₹9.90/₹10.40/₹11.00', '₹70/kW (300 यूनिट/माह तक)'],
  ['इंडस्ट्रियल (LT-III)', '₹7.70 फ्लैट', '₹100/kW'],
  ['कृषि (LT-V(A), नॉन-कॉर्पोरेट)', '₹0 — फ्री', '₹0'],
]

const workedExampleWithin: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स (एक महीना)', '150'],
  ['स्वीकृत लोड (माना गया)', '2 kW'],
  ['गृह ज्योति', 'पूरा एनर्जी चार्ज माफ (₹492.50 मूल्य) — 200-यूनिट सीमा के भीतर'],
  ['इलेक्ट्रिसिटी ड्यूटी', '₹0.00 (माफ किए गए एनर्जी चार्ज का 6%)'],
  ['फिक्स्ड चार्ज (2 kW × ₹10)', '₹20.00'],
  ['अनुमानित कुल', '₹20.00'],
]

const workedExampleExceeded: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स (एक महीना)', '250'],
  ['स्वीकृत लोड (माना गया)', '2 kW'],
  ['गृह ज्योति', 'महीने के लिए पूरी तरह वापस — 200-यूनिट सीमा पार'],
  ['स्लैब 1: 50 यूनिट (0–50) @ ₹1.95', '₹97.50'],
  ['स्लैब 2: 50 यूनिट (51–100) @ ₹3.10', '₹155.00'],
  ['स्लैब 3: 100 यूनिट (101–200) @ ₹4.80', '₹480.00'],
  ['स्लैब 4: 50 यूनिट (201–250) @ ₹6.50', '₹325.00'],
  ['एनर्जी चार्ज सबटोटल', '₹1,057.50'],
  ['इलेक्ट्रिसिटी ड्यूटी (6%)', '₹63.45'],
  ['फिक्स्ड चार्ज (2 kW × ₹10)', '₹20.00'],
  ['अनुमानित कुल', '₹1,140.95'],
]

export default function TsspdclCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'TGSPDCL पूरी गाइड', href: `/hi${PATH}` },
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
          <strong>TGSPDCL</strong> (तेलंगाना स्टेट सदर्न पावर डिस्ट्रिब्यूशन
          कंपनी, जिसे <strong>TSSPDCL</strong> भी कहते हैं) हैदराबाद और
          दक्षिणी तेलंगाना में बिजली बांटता है, जिसे{' '}
          <strong>तेलंगाना स्टेट इलेक्ट्रिसिटी रेगुलेटरी कमीशन (TSERC)</strong>{' '}
          नियंत्रित करता है। व्हाइट-राशन-कार्ड वाले घरों को{' '}
          <strong>गृह ज्योति</strong> के तहत महीने में 200 यूनिट तक फ्री
          पावर मिलती है — लेकिन कर्नाटक की उसी नाम की स्कीम की तरह, यह{' '}
          <strong>ऑल-ऑर-नथिंग</strong> है: 200 यूनिट पार करने पर पूरे महीने
          का बिल मानक दरों पर चार्ज होता है, सिर्फ अतिरिक्त यूनिट्स नहीं।
          यह गाइड असली स्लैब, उस क्लिफ का सटीक तंत्र, और तेलंगाना की सच में
          फ्री कृषि श्रेणी कवर करती है।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            जब आंध्र प्रदेश को AP पुनर्गठन अधिनियम के तहत{' '}
            <strong>2 जून 2014</strong> को बांटा गया, तब नए बने तेलंगाना को
            सर्व करने वाले डिस्ट्रिब्यूशन व्यवसाय को दो कंपनियों में
            पुनर्गठित किया गया: तेलंगाना स्टेट सदर्न पावर डिस्ट्रिब्यूशन
            कंपनी लिमिटेड (TGSPDCL, जिसे TSSPDCL भी कहते हैं) और तेलंगाना
            स्टेट नॉर्दर्न पावर डिस्ट्रिब्यूशन कंपनी लिमिटेड (TGNPDCL)।
            TGSPDCL <strong>हैदराबाद और 14 दक्षिणी ज़िलों</strong> को कवर
            करता है (रंगारेड्डी, मेडचल, नलगोंडा और महबूबनगर सहित), लगभग
            1.11 करोड़ उपभोक्ताओं को सर्व करते हुए। TGNPDCL हनुमकोंडा से 18
            उत्तरी ज़िलों को कवर करता है — इसका इस साइट पर कोई कैलकुलेटर
            नहीं है, लेकिन यह यहां कवर किए गए एक ही TSERC टैरिफ पर बिल करता
            है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका कनेक्शन उत्तरी तेलंगाना में है, तो आपका
            असली डिस्कॉम TGNPDCL है, TGSPDCL नहीं — अपने बिल पर नाम जांचें।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल चार TGSPDCL उपभोक्ता श्रेणियों को
            कवर करता है, सभी एक ही <strong>मासिक</strong> चक्र पर बिल होती
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
            निष्कर्ष: कृषि यहां कोई डिस्काउंटेड दर नहीं है — नॉन-कॉर्पोरेट
            फार्म कनेक्शन के लिए, यह सच में फ्री है, कर्नाटक के BESCOM जैसा
            ही पैटर्न।
          </p>
        </section>

        <section aria-labelledby="gruha-jyothi" className="mt-10 scroll-mt-20">
          <h2 id="gruha-jyothi" className={h2Cls}>
            गृह ज्योति ऑल-ऑर-नथिंग है
          </h2>
          <p className={pCls}>
            व्हाइट-राशन-कार्ड वाले घरों को महीने में 200 यूनिट तक फ्री
            बिजली मिलती है — लेकिन यह <strong>आंशिक भत्ता नहीं</strong> है।
            200 यूनिट या उससे कम पर रहें तो पूरा एनर्जी चार्ज माफ है; एक भी
            यूनिट से 200 पार करें तो उस महीने की <strong>कोई भी</strong>{' '}
            खपत फ्री नहीं है। तेलंगाना के डिप्टी मुख्यमंत्री और एनर्जी
            मिनिस्टर ने सार्वजनिक रूप से इसकी पुष्टि की है: 200 यूनिट पार
            करने वाले लाभार्थी अपनी पूरी खपत का पूरा बिल चुकाते हैं, सिर्फ
            अतिरिक्त नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            पात्रता खुद व्हाइट राशन कार्ड रखने से जुड़ी है, सामान्य रूप से
            घरेलू उपभोक्ता होने से नहीं — जिस घर के पास कार्ड नहीं है, वह
            पहली यूनिट से ही मानक स्लैब पर बिल होता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: 201-यूनिट का महीना 200-यूनिट के महीने से नाटकीय रूप
            से महंगा पड़ सकता है — यह कितना ज़्यादा है, यह देखने के लिए नीचे
            उदाहरण गणना देखें।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू टैरिफ स्लैब
          </h2>
          <p className={pCls}>
            ये स्लैब सिर्फ तब मायने रखते हैं जब गृह ज्योति अब लागू न हो —
            1 अप्रैल 2025 से प्रभावी, हर बैंड सिर्फ उसके अंदर की यूनिट्स
            पर चार्ज होता है:
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
            <strong>जानने लायक एक सोर्सिंग नोट:</strong> KSEB, JVVNL और
            PSPCL की तरह, सामान्य पैटर्न यहां भी उल्टा है — ये रेजिडेंशियल
            स्लैब एक प्राइमरी क्रॉस-चेक के लंबित एक सेकंडरी-सोर्स्ड अनुमान
            हैं, जबकि नीचे दी TGSPDCL की कमर्शियल, इंडस्ट्रियल और कृषि दरें
            सीधे TGERC के अपने टैरिफ ऑर्डर से प्राइमरी-सोर्स्ड हैं। सामान्य
            तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>
            , या अपनी यूनिट्स{' '}
            <Link href="/hi/electricity/telangana-electricity-bill-calculator" className="text-brass underline">
              TGSPDCL बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ज़्यादातर गृह ज्योति घरों के लिए, ये स्लैब असल में
            कभी लागू ही नहीं होते — यह स्कीम 200 यूनिट से कम पर पूरा एनर्जी
            चार्ज माफ कर देती है।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल, इंडस्ट्रियल और कृषि टैरिफ
          </h2>
          <p className={pCls}>
            तीनों TGERC के Retail Supply Tariff Schedule for FY2025-26
            (1 मई 2025 – 31 मार्च 2026 प्रभावी) से प्राइमरी-सोर्स्ड हैं —
            लेकिन हर एक के साथ जानने लायक एक असली नोट है:
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
            <strong>कमर्शियल नोट:</strong> यह सिर्फ LT-II(B), 50
            यूनिट/माह से ऊपर की खपत कवर करता है। एक छोटा LT-II(A) बैंड
            (≤50 यूनिट/माह) एक फ्लैट ₹7.00/यूनिट पर मौजूद है जिसका फिक्स्ड
            चार्ज ₹30/kW है, यहां मॉडल नहीं किया गया। दिखाया गया ₹70/kW का
            डिमांड चार्ज 300 यूनिट/माह तक लागू होता है; उससे ऊपर यह ₹100/kW
            हो जाता है, यह भी मॉडल नहीं किया गया।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>इंडस्ट्रियल नोट:</strong> यह सामान्य रूप से LT-III
            (कॉन्ट्रैक्ट लोड 75kW/100HP तक, या राइस मिलों के लिए
            93kW/125HP) को एक फ्लैट, नॉन-टेलिस्कोप्ड दर पर कवर करता है।
            पिसीकल्चर/गन्ना क्रशिंग (₹6.20/यूनिट, ₹50/kW) और पोल्ट्री
            (₹7.00/यूनिट, ₹65/kW) के लिए निचली सब-कैटेगरी दरें मौजूद हैं —
            अलग से मॉडल नहीं की गईं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>कृषि नोट:</strong> असली ₹0/यूनिट फ्री दर LT-V(A)
            &ldquo;Other than Corporate Farmers&rdquo; को कवर करती है —
            तेलंगाना के ज़्यादातर फार्म कनेक्शन। एक अलग &ldquo;Corporate
            Farmers&rdquo; सब-कैटेगरी ₹2.50/यूनिट (HP-आधारित, कोई फिक्स्ड
            चार्ज नहीं) चुकाती है, यहां मॉडल नहीं की गई।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: रेजिडेंशियल के अलावा, यहां हर श्रेणी सिर्फ अपना सबसे
            सामान्य बैंड कवर करती है — एक बड़ा कमर्शियल कनेक्शन या एक
            कॉर्पोरेट फार्म इस टेबल में दिखाए से अलग तरीके से बिल होगा।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी — एक आंशिक गैप
          </h2>
          <p className={pCls}>
            हमारा डेटा श्रेणियों में एक फ्लैट <strong>6%</strong>{' '}
            इलेक्ट्रिसिटी ड्यूटी लगाता है। रेजिडेंशियल के लिए, यह एक
            उचित रूप से पुष्ट आंकड़ा है — लेकिन TGERC का अपना कमर्शियल
            टैरिफ नोट स्पष्ट रूप से कहता है कि ड्यूटी तेलंगाना इलेक्ट्रिसिटी
            ड्यूटी एक्ट के तहत अलग से चार्ज होती है और{' '}
            <strong>ऑर्डर में खुद इसकी मात्रा तय नहीं की गई है</strong>,
            इसलिए दिखाया गया 6% कमर्शियल, इंडस्ट्रियल या कृषि कनेक्शन के
            लिए सटीक नहीं हो सकता।
          </p>
          <p className={`mt-3 ${pCls}`}>
            तुलना के लिए, केरल का KSEB एक सत्यापित 5% और महाराष्ट्र का
            MSEDCL एक सत्यापित 16% (रेजिडेंशियल) लेता है — हमारी{' '}
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
            निष्कर्ष: रेजिडेंशियल अनुमान के लिए 6% पर भरोसा करें; किसी भी
            अन्य श्रेणी के लिए इसे सिर्फ संकेतक मानें।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            फ्यूल/पावर-परचेज़ कॉस्ट एडजस्टमेंट — एक खुला गैप
          </h2>
          <p className={pCls}>
            हमारे पास यह पुष्टि करने वाला कोई सत्यापित मौजूदा आंकड़ा नहीं
            है कि TGSPDCL फिलहाल कोई फ्यूल या पावर-परचेज़ कॉस्ट एडजस्टमेंट
            ले रहा है या नहीं — सामान्य तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            । हमारा डेटा इसे शून्य दिखाता है, जो एक अपुष्ट प्लेसहोल्डर है,
            पुष्ट नो-सरचार्ज नीति नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका असली TGSPDCL बिल इस गाइड के उदाहरण से
            ज़्यादा आता है, वह भी 200 यूनिट से कम पर, तो एक अनमॉडल्ड
            सरचार्ज इसकी एक संभावित वजह है।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना TGSPDCL बिल कैसे जांचें और चुकाएं
          </h2>
          <p className={pCls}>
            सामान्य तरीका, TGSPDCL के अपने पोर्टल के ज़रिए (सही स्क्रीन
            समय के साथ बदल सकती हैं):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'tgsouthernpower.org पर आधिकारिक TGSPDCL वेबसाइट पर जाएं, या TGSPDCL Citizen ऐप खोलें।',
              'अपना मौजूदा बिल पाने के लिए अपना Unique Service Number (USC) डालें।',
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
            सवालों या आउटेज के लिए, TGSPDCL की हेल्पलाइन{' '}
            <strong>1912</strong> या <strong>1800-599-01912</strong> है, जो
            24×7 उपलब्ध है — यह गाइड और हमारा कैलकुलेटर अनुमान लगाने वाले
            टूल हैं, अकाउंट-विशिष्ट मामलों के लिए आपके असली बिल या
            TGSPDCL के अपने पोर्टल का विकल्प नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अकाउंट-विशिष्ट किसी भी चीज़ के लिए — बकाया, कोई
            विवादित रीडिंग, आपकी व्हाइट-राशन-कार्ड पात्रता स्थिति — सीधे
            आधिकारिक पोर्टल या हेल्पलाइन पर जाएं, किसी कैलकुलेटर पर नहीं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: सीमा के भीतर बनाम पार
          </h2>
          <p className={pCls}>
            एक ही 2kW कनेक्शन पर दो खपत स्तर दिखाते हैं कि गृह ज्योति की
            क्लिफ असल में कितनी तीखी है। यह कोई आंशिक-भत्ता स्कीम नहीं है —
            200-यूनिट सीमा पार करें और उस महीने की <strong>कोई भी</strong>{' '}
            यूनिट फ्री नहीं है:
          </p>
          <p className="mt-4 font-semibold text-ink-navy">
            परिदृश्य A — 150 यूनिट, 200-यूनिट सीमा के भीतर
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
            परिदृश्य B — 250 यूनिट, सीमा पार
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
            100 ज़्यादा यूनिट्स बिल को <strong>₹20.00</strong> से{' '}
            <strong>₹1,140.95</strong> तक पहुंचा देती हैं — लगभग 57 गुना का
            उछाल, पूरी तरह उस महीने गृह ज्योति खोने की वजह से, अतिरिक्त
            यूनिट्स की वजह से नहीं। अपनी यूनिट्स और स्वीकृत लोड{' '}
            <Link href="/hi/electricity/telangana-electricity-bill-calculator" className="text-brass underline">
              TGSPDCL बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: TGSPDCL का कम ₹10/kW फिक्स्ड चार्ज मतलब गृह-ज्योति
            घर का बिल आम तौर पर लगभग शून्य होता है — यही वजह है कि सीमा
            पार करना तुलना में इतना नाटकीय लगता है।
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
              href="/hi/electricity/telangana-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                TGSPDCL बिल कैलकुलेटर
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
                कर्नाटक की गृह ज्योति स्कीम — 200 यूनिट पर वही ऑल-ऑर-नथिंग
                क्लिफ और फ्री-कृषि पैटर्न।
              </p>
            </Link>
            <Link
              href="/hi/blog/pspcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PSPCL (पंजाब) पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                वही ऑल-ऑर-नथिंग क्लिफ तंत्र, 200 की बजाय 300 यूनिट पर।
              </p>
            </Link>
            <Link
              href="/water/hyderabad"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💧
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                हैदराबाद जल बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इसी शहर का वाटर बोर्ड (HMWSSB), इसके असली टैरिफ पर आधारित।
                (अंग्रेज़ी)
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
                TGSPDCL के चार बैंड के पीछे का सामान्य तंत्र।
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
          गया। कमर्शियल, इंडस्ट्रियल और कृषि दरें सीधे TGERC के{' '}
          <a
            href="https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Retail Supply Tariff Schedule for FY2025-26
          </a>{' '}
          से सोर्स की गई हैं, 1 मई 2025 – 31 मार्च 2026 प्रभावी।
          रेजिडेंशियल स्लैब एक प्राइमरी-डॉक्यूमेंट क्रॉस-चेक के लंबित
          सेकंडरी-सोर्स्ड हैं। गृह ज्योति स्कीम को ऑल-ऑर-नथिंग के रूप में
          मॉडल किया गया है, इस बारे में सत्यापित सार्वजनिक बयानों के आधार
          पर कि TGSPDCL इसे असल में कैसे लागू करता है। छोटी कमर्शियल और
          इंडस्ट्रियल सब-कैटेगरी, कॉर्पोरेट-फार्मर कृषि दर, 300 कमर्शियल
          यूनिट्स से ऊपर डिमांड-चार्ज स्टेप-अप, नॉन-रेजिडेंशियल
          इलेक्ट्रिसिटी ड्यूटी, और फ्यूल/पावर-परचेज़ एडजस्टमेंट आगे की
          सोर्सिंग के लंबित स्पष्ट रूप से मॉडल नहीं की गई हैं। दरें
          समय-समय पर संशोधित होती हैं — ऊपर दिया कैलकुलेटर मौजूदा रखा
          जाता है; इस लेख को उसके साथ एक व्याख्यात्मक रेफरेंस के रूप में
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
