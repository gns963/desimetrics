import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/fixed-charges-vs-fca-electricity-bill'
const TITLE =
  'मेरा बिजली बिल हर महीने क्यों बदलता है, भले ही मैं उतनी ही यूनिट इस्तेमाल करूं? (फिक्स्ड चार्ज बनाम FCA समझाया गया)'
const DESCRIPTION =
  'यूनिट वही, बिल अलग? आपके बिजली बिल के दो हिस्से इस्तेमाल के साथ कभी नहीं बदलते, और एक अपने खुद के शेड्यूल पर चलता है। फिक्स्ड चार्ज, एनर्जी चार्ज, FCA/FPPCA और इलेक्ट्रिसिटी ड्यूटी का पूरा ब्यौरा देखें।'
const LAST_VERIFIED = '11 सितंबर 2026'

export const metadata: Metadata = {
  title: 'फिक्स्ड चार्ज बनाम FCA बनाम एनर्जी चार्ज — आपका बिल क्यों बदलता है',
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

const faqs = [
  {
    q: 'यूनिट की संख्या वही रहने पर भी मेरा बिजली बिल क्यों बढ़ गया?',
    a: 'आपके बिल में कुछ हिस्से इस्तेमाल के साथ बिल्कुल नहीं बदलते — फिक्स्ड चार्ज और इलेक्ट्रिसिटी ड्यूटी — साथ ही एक फ्यूल/पावर-परचेज़ एडजस्टमेंट, जो आपके डिस्कॉम की बिजली खरीद लागत के आधार पर अपने मासिक या तिमाही शेड्यूल पर बदलता है, न कि आपके इस्तेमाल पर।',
  },
  {
    q: 'बिजली बिल में FCA क्या है?',
    a: 'FCA (फ्यूल कॉस्ट एडजस्टमेंट) एक वेरिएबल लाइन है जो आपके डिस्कॉम की असली बिजली-खरीद लागत में बदलाव को उपभोक्ताओं तक पहुंचाती है, क्योंकि बेस टैरिफ सिर्फ समय-समय पर संशोधित होते हैं जबकि बिजली-खरीद लागत हर महीने बदलती है। यह आपका बिल बढ़ा या घटा सकता है।',
  },
  {
    q: 'FAC, FCA और FPPCA में क्या फर्क है?',
    a: 'ये एक ही तंत्र हैं — डिस्कॉम की बिजली-खरीद लागत का पास-थ्रू — बस अलग-अलग राज्यों और डिस्कॉम द्वारा अलग नाम दिया गया है। FAC (फ्यूल एडजस्टमेंट चार्ज), FCA (फ्यूल कॉस्ट एडजस्टमेंट) और FPPCA/FPPA (फ्यूल एंड पावर परचेज़ कॉस्ट एडजस्टमेंट) — ये सभी इसी एक लाइन आइटम को दर्शाते हैं।',
  },
  {
    q: 'फिक्स्ड चार्ज और एनर्जी चार्ज में क्या फर्क है?',
    a: 'फिक्स्ड चार्ज आपके स्वीकृत लोड (kW/kVA) पर बिल होता है, चाहे आप असल में कितनी भी बिजली इस्तेमाल करें। एनर्जी चार्ज आपके असल इस्तेमाल की गई यूनिट्स पर, स्लैब दर स्लैब बिल होता है — यही वह हिस्सा है जिसका अनुमान एक स्लैब कैलकुलेटर लगाता है।',
  },
  {
    q: 'क्या फ्यूल एडजस्टमेंट चार्ज कभी मेरा बिल बढ़ाने की बजाय घटा भी सकता है?',
    a: 'हां। जब किसी डिस्कॉम की असली बिजली-खरीद लागत टैरिफ ऑर्डर में मान ली गई लागत से कम आती है, तो फ्यूल/पावर-परचेज़ एडजस्टमेंट नेगेटिव हो सकता है और आपके बिल पर सिर्फ एक अतिरिक्त चार्ज की बजाय एक क्रेडिट के रूप में दिख सकता है।',
  },
  {
    q: 'इलेक्ट्रिसिटी ड्यूटी क्या है, और क्या यह डिस्कॉम के चार्ज से अलग है?',
    a: 'इलेक्ट्रिसिटी ड्यूटी आपके बिल पर वसूला जाने वाला एक राज्य सरकार का टैक्स है, न कि कोई चार्ज जो डिस्कॉम तय करता या रखता है। यह आम तौर पर आपके एनर्जी चार्ज का एक प्रतिशत होता है, और सटीक दर आपके राज्य और कनेक्शन श्रेणी पर निर्भर करती है।',
  },
  {
    q: 'क्या मैं अपना फिक्स्ड चार्ज कम करवा सकता हूं?',
    a: 'फिक्स्ड चार्ज आपके स्वीकृत लोड पर आधारित होता है, इसलिए यह इस्तेमाल चाहे जो भी हो, वही रहता है। अगर आपका स्वीकृत लोड आपके असल इस्तेमाल के लिए साफ तौर पर ज़्यादा है, तो आप अपने डिस्कॉम के ज़रिए लोड रिव्यू का अनुरोध कर सकते हैं — यह एक स्थानीय प्रशासनिक प्रक्रिया है, कोई ऐसी चीज़ नहीं जो एक कैलकुलेटर आपके लिए कर सके।',
  },
  {
    q: 'एक ऑनलाइन बिजली बिल कैलकुलेटर मेरे असल बिल से बिल्कुल मेल क्यों नहीं खाता?',
    a: 'एक स्लैब-आधारित कैलकुलेटर एनर्जी चार्ज का अनुमान लगाता है — वह हिस्सा जो आपके इस्तेमाल से तय होता है। आपका असली बिल इसके ऊपर फिक्स्ड चार्ज, फ्यूल/पावर-परचेज़ एडजस्टमेंट और इलेक्ट्रिसिटी ड्यूटी जोड़ता है, और यह एडजस्टमेंट हर महीने बदलता है, इसलिए इसका सटीक अनुमान पहले से नहीं लगाया जा सकता।',
  },
  {
    q: 'फ्यूल/पावर-परचेज़ एडजस्टमेंट कितनी बार बदलता है?',
    a: 'इसे राज्य नियामक द्वारा डिस्कॉम के साथ मिलकर मासिक या तिमाही चक्र पर, राज्य के हिसाब से, रिव्यू और मंज़ूर किया जाता है — बेस टैरिफ के उलट, जो आम तौर पर साल में सिर्फ एक बार संशोधित होता है।',
  },
  {
    q: 'क्या फ्यूल एडजस्टमेंट चार्ज सभी राज्यों में एक जैसा है?',
    a: 'नहीं। हर डिस्कॉम अलग तरीके से बिजली खरीदता है और एक अलग असल लागत रिपोर्ट करता है, इसलिए दर — और यहां तक कि इस लाइन के लिए इस्तेमाल होने वाला नाम भी — राज्य और डिस्कॉम के हिसाब से अलग होता है। हमेशा अपने खुद के बिल पर मौजूद खास लाइन जांचें।',
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

const namingRows: [string, string][] = [
  ['FAC (फ्यूल एडजस्टमेंट चार्ज)', 'वही तंत्र'],
  ['FCA (फ्यूल कॉस्ट एडजस्टमेंट)', 'वही तंत्र'],
  ['FPPCA / FPPA (फ्यूल एंड पावर परचेज़ कॉस्ट एडजस्टमेंट)', 'वही तंत्र'],
  ['पावर परचेज़ कॉस्ट एडजस्टमेंट', 'वही तंत्र (कुछ दिल्ली के बिलों पर दिखता है)'],
  ['रेगुलेटरी एडजस्टमेंट / फ्यूल सरचार्ज', 'वही तंत्र, पुरानी/वैकल्पिक शब्दावली'],
]

export default function FixedChargesVsFcaArticlePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'फिक्स्ड चार्ज बनाम FCA', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🧾</span> एक्सप्लेनर
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
          · अपडेट {LAST_VERIFIED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          अगर आपकी यूनिट्स मुश्किल से बदलीं लेकिन आपका बिल नहीं बदला, तो यह लगभग कभी
          कोई गलती नहीं होती। एक आम भारतीय बिजली बिल के दो हिस्से — <strong>फिक्स्ड
          चार्ज</strong> और <strong>इलेक्ट्रिसिटी ड्यूटी</strong> — आपके इस्तेमाल के
          साथ बिल्कुल नहीं बदलते, और एक तीसरा हिस्सा — एक{' '}
          <strong>फ्यूल या पावर-परचेज़ एडजस्टमेंट</strong>, जिसे अक्सर FCA, FAC या
          FPPCA के रूप में दिखाया जाता है — अपने खुद के मासिक या तिमाही शेड्यूल पर
          चलता है, चाहे आपने कितनी भी यूनिट इस्तेमाल की हों। सिर्फ एनर्जी चार्ज, वह
          हिस्सा जो आपके असल इस्तेमाल पर स्लैब-वार बिल होता है, सीधे आपके इस्तेमाल
          को दर्शाता है।
        </p>

        <section aria-labelledby="anatomy" className="mt-10 scroll-mt-20">
          <h2 id="anatomy" className={h2Cls}>
            आपके बिजली बिल के चार हिस्से
          </h2>
          <p className={pCls}>
            लगभग हर भारतीय बिजली बिल असल में चार लाइन आइटम को जोड़कर बनता है, एक
            संख्या नहीं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">हिस्सा</th>
                  <th className="px-4 py-2 font-semibold">किस पर आधारित</th>
                  <th className="px-4 py-2 font-semibold">आपके इस्तेमाल के साथ बदलता है?</th>
                  <th className="px-4 py-2 font-semibold">इसे कौन तय करता है</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">फिक्स्ड / डिमांड चार्ज</td>
                  <td className="px-4 py-2">स्वीकृत लोड (kW/kVA)</td>
                  <td className="px-4 py-2">नहीं</td>
                  <td className="px-4 py-2">राज्य नियामक, प्रति उपभोक्ता श्रेणी</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">एनर्जी चार्ज</td>
                  <td className="px-4 py-2">असल इस्तेमाल की गई यूनिट्स, स्लैब-वार</td>
                  <td className="px-4 py-2">
                    हां — यही वह हिस्सा है जिसका अनुमान एक स्लैब कैलकुलेटर लगाता है
                  </td>
                  <td className="px-4 py-2">राज्य नियामक, प्रति उपभोक्ता श्रेणी</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">फ्यूल/पावर परचेज़ एडजस्टमेंट</td>
                  <td className="px-4 py-2">
                    डिस्कॉम की असल मासिक बिजली-खरीद लागत बनाम टैरिफ में मान ली गई
                    लागत
                  </td>
                  <td className="px-4 py-2">
                    आंशिक रूप से — डिस्कॉम की लागत के साथ बदलता है, सीधे आपके
                    इस्तेमाल के साथ नहीं
                  </td>
                  <td className="px-4 py-2">
                    राज्य नियामक द्वारा डिस्कॉम के साथ मासिक/तिमाही रिव्यू
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">इलेक्ट्रिसिटी ड्यूटी</td>
                  <td className="px-4 py-2">
                    एनर्जी चार्ज पर एक टैक्स (दर राज्य/श्रेणी के हिसाब से अलग)
                  </td>
                  <td className="px-4 py-2">
                    परोक्ष रूप से, क्योंकि यह किसी और चार्ज का प्रतिशत है
                  </td>
                  <td className="px-4 py-2">
                    राज्य सरकार — यह एक टैक्स है, डिस्कॉम चार्ज नहीं
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: इन चारों में से सिर्फ एक आपकी इस्तेमाल की गई यूनिट्स के सीधे
            अनुपात में बदलता है — बाकी तीन अपने ही नियमों पर चलते हैं।
          </p>
        </section>

        <section aria-labelledby="fixed-charge" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charge" className={h2Cls}>
            फिक्स्ड चार्ज: वह हिस्सा जो इस्तेमाल के साथ कभी नहीं बदलता
          </h2>
          <p className={pCls}>
            फिक्स्ड (या डिमांड) चार्ज आपके <strong>स्वीकृत लोड</strong> पर बिल होता
            है — आपके कनेक्शन के लिए मंज़ूर अधिकतम बिजली खपत — न कि आपने उस महीने
            असल में कितनी बिजली इस्तेमाल की। यह असामान्य रूप से कम इस्तेमाल वाले
            महीने में भी आपके बिल पर बिल्कुल वैसा ही दिखता है, क्योंकि यह आपके लिए
            कनेक्शन और इंफ्रास्ट्रक्चर तैयार रखने की डिस्कॉम की लागत वसूलता है, न कि
            बिजली की लागत।
          </p>
          <p className={`mt-3 ${pCls}`}>
            सिर्फ एक उदाहरण के तौर पर (असली फिक्स्ड-चार्ज दरें राज्य और कनेक्शन
            श्रेणी के हिसाब से काफी अलग होती हैं), एक बोर्ड का घरेलू टैरिफ इसे
            स्वीकृत लोड के पहले 1 kW के लिए करीब ₹60/kW और बाकी के लिए ₹70/kW के
            रूप में तय करता है — एक फ्लैट मासिक राशि जिसे कोई फर्क नहीं पड़ता कि
            आपने उस महीने 50 यूनिट इस्तेमाल कीं या 500।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: आपका फिक्स्ड चार्ज आपके कनेक्शन के स्वीकृत लोड से तय होता है,
            आपकी मीटर रीडिंग से नहीं — चाहे आप पूरे महीने घर पर हों या बाहर, यह वही
            रहता है।
          </p>
        </section>

        <section aria-labelledby="energy-charge" className="mt-10 scroll-mt-20">
          <h2 id="energy-charge" className={h2Cls}>
            एनर्जी चार्ज: वह हिस्सा जिसका अनुमान आपका स्लैब कैलकुलेटर लगाता है
          </h2>
          <p className={pCls}>
            एनर्जी चार्ज ही अकेला हिस्सा है जो सीधे आपके असल इस्तेमाल पर बिल होता
            है। ज़्यादातर भारतीय डिस्कॉम घरेलू कनेक्शन को{' '}
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="text-brass underline"
            >
              टेलिस्कोपिक स्लैब
            </Link>{' '}
            से बिल करते हैं — टियर वाली प्रति-यूनिट दरें जहां हर स्लैब अलग से
            कीमत होती है, इसलिए सिर्फ ऊंचे स्लैब में आने वाली यूनिट्स ही ज़्यादा
            महंगी होती हैं, आपका पूरा बिल नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            यही वह हिस्सा है जिसका अनुमान हमारे{' '}
            <Link href="/hi/electricity" className="text-brass underline">
              राज्य के हिसाब से बिजली बिल कैलकुलेटर
            </Link>{' '}
            सटीक रूप से लगाने के लिए बनाए गए हैं, हर डिस्कॉम के अपने प्रकाशित
            स्लैब इस्तेमाल करते हुए — जैसे{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (महाराष्ट्र)
            </Link>{' '}
            या{' '}
            <Link href="/hi/electricity/tneb-bill-calculator" className="text-brass underline">
              TNEB (तमिलनाडु)
            </Link>
            । लेकिन एक स्लैब कैलकुलेटर सिर्फ इस एक हिस्से का अनुमान लगाता है — फिक्स्ड
            चार्ज, फ्यूल एडजस्टमेंट और इलेक्ट्रिसिटी ड्यूटी इसके ऊपर आते हैं, और
            पूरी तरह पहले से अनुमानित नहीं किए जा सकते क्योंकि फ्यूल एडजस्टमेंट
            हर महीने बदलता है और पहले से प्रकाशित नहीं होता।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका कैलकुलेटर अनुमान करीब है लेकिन बिल्कुल सटीक नहीं,
            तो यह अपेक्षित है — यह एनर्जी चार्ज की कीमत लगा रहा है, बाकी तीन लाइन
            आइटम की नहीं।
          </p>
        </section>

        <section aria-labelledby="naming" className="mt-10 scroll-mt-20">
          <h2 id="naming" className={h2Cls}>
            &ldquo;FCA, FAC, FPPCA, पावर परचेज़ कॉस्ट एडजस्टमेंट&rdquo; — एक ही चीज़,
            अलग नाम
          </h2>
          <p className={pCls}>
            बेस टैरिफ समय-समय पर — अक्सर साल में एक बार — हर राज्य के बिजली नियामक
            आयोग द्वारा तय होते हैं। लेकिन डिस्कॉम की बिजली खरीदने की असल लागत
            (कोयला, गैस, बाज़ार से खरीद) हर महीने बदलती है। पूरे टैरिफ ऑर्डर को हर
            महीने दोबारा खोलने की बजाय, नियामक डिस्कॉम को इस लागत के अंतर को एक अलग
            लाइन के ज़रिए आगे बढ़ाने देते हैं, जिसे राज्य के हिसाब से मासिक या
            तिमाही चक्र पर रिव्यू और मंज़ूर किया जाता है। अलग-अलग राज्य और डिस्कॉम
            बस इस लाइन को अलग-अलग नाम देते हैं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">आपके बिल पर दिख सकने वाला नाम</th>
                  <th className="px-4 py-2 font-semibold">इसका मतलब</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {namingRows.map(([name, meaning]) => (
                  <tr key={name}>
                    <td className="px-4 py-2 font-medium">{name}</td>
                    <td className="px-4 py-2">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            यह लाइन हमेशा पॉज़िटिव नहीं होती। जब किसी डिस्कॉम की असल बिजली-खरीद
            लागत टैरिफ ऑर्डर में मान ली गई लागत से <em>कम</em> आती है, तो एडजस्टमेंट
            नेगेटिव हो सकता है और आपके बिल को घटाने वाले एक क्रेडिट के रूप में
            दिख सकता है — सिर्फ एक अतिरिक्त चार्ज नहीं। कुछ राज्य यह भी तय करते हैं
            कि एक ही चक्र में यह एडजस्टमेंट कितना बड़ा हो सकता है, ताकि एक बहुत
            बड़ा पास-थ्रू ग्राहकों पर एक साथ न पड़े।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: FCA, FAC और FPPCA एक ही तंत्र हैं जो अलग-अलग लेबल पहने हुए
            हैं — यह मान लेने की बजाय कि यह किसी पड़ोसी राज्य से मेल खाता है,
            अपने ही बिल पर मौजूद सटीक लाइन जांचें।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी: वह हिस्सा जो असल में एक टैक्स है, डिस्कॉम चार्ज नहीं
          </h2>
          <p className={pCls}>
            इलेक्ट्रिसिटी ड्यूटी आपके बिल पर वसूली जाती है लेकिन{' '}
            <strong>राज्य सरकार</strong> को दी जाती है, डिस्कॉम इसे नहीं रखता —
            इसलिए यह ऐसी चीज़ नहीं जिसे आपका डिस्कॉम माफ या कम कर सके। यह आम तौर पर
            आपके एनर्जी चार्ज के प्रतिशत के रूप में लगाई जाती है, और दर राज्य और
            अक्सर कनेक्शन श्रेणी के हिसाब से तय होती है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            यह दर वाकई अलग-अलग होती है: उदाहरण के लिए, तमिलनाडु का TNEB रेजिडेंशियल
            कनेक्शन पर 0% इलेक्ट्रिसिटी ड्यूटी लेता है लेकिन कमर्शियल और इंडस्ट्रियल
            पर 5% — एक ही डिस्कॉम, आपकी कनेक्शन श्रेणी के हिसाब से दो अलग ड्यूटी
            दरें। यही वजह है कि एक राज्य (या यहां तक कि एक कनेक्शन प्रकार) की ड्यूटी
            प्रतिशत को दूसरे पर लागू मान लेना सही नहीं है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर कोई बिल खास तौर पर ड्यूटी लाइन की वजह से ज़्यादा लग रहा
            है, तो यह आपकी श्रेणी पर लागू एक राज्य टैक्स दर है — डिस्कॉम का मार्कअप
            नहीं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: वही यूनिट, अलग बिल
          </h2>
          <p className={pCls}>
            यहां एक <strong>उदाहरण</strong> दो-महीने की तुलना है जो दिखाती है कि
            इस्तेमाल मुश्किल से बदलने पर भी बिल कैसे बदल सकता है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">इस महीने</th>
                  <th className="px-4 py-2 font-semibold">पिछले महीने</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">इस्तेमाल की गई यूनिट्स</td>
                  <td className="px-4 py-2">200</td>
                  <td className="px-4 py-2">198</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">एनर्जी चार्ज (स्लैब-आधारित)</td>
                  <td className="px-4 py-2">~लगभग वही</td>
                  <td className="px-4 py-2">~लगभग वही</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">फिक्स्ड चार्ज</td>
                  <td className="px-4 py-2">वही (स्वीकृत लोड अपरिवर्तित)</td>
                  <td className="px-4 py-2">वही</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">
                    फ्यूल/पावर-परचेज़ एडजस्टमेंट
                  </td>
                  <td className="px-4 py-2">
                    ज़्यादा (उस महीने डिस्कॉम की बिजली-खरीद लागत बढ़ी)
                  </td>
                  <td className="px-4 py-2">कम</td>
                </tr>
                <tr className="bg-mist/60">
                  <td className="px-4 py-2 font-semibold text-ink-navy">नतीजा</td>
                  <td className="px-4 py-2 font-semibold text-ink-navy" colSpan={2}>
                    लगभग एक जैसी यूनिट्स के बावजूद, इस महीने कुल बिल ज़्यादा है
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            इस उपभोक्ता की इस्तेमाल की आदतों में कुछ नहीं बदला। पूरा अंतर एक ऐसी
            लाइन से आया जो इस्तेमाल से स्वतंत्र होकर बदलती है — यही वजह है कि सिर्फ
            अपनी यूनिट्स की महीना-दर-महीना तुलना करने से पूरा बिल समझ नहीं आता।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: किसी बिलिंग गलती को मान लेने से पहले जांचें कि क्या
            फ्यूल/पावर-परचेज़ एडजस्टमेंट लाइन खुद बदली है — यूनिट्स स्थिर रहने पर
            भी कुल राशि न बदलने की यही सबसे आम वजह है।
          </p>
        </section>

        <section aria-labelledby="reduce" className="mt-10 scroll-mt-20">
          <h2 id="reduce" className={h2Cls}>
            क्या आप वाकई इनमें से कुछ कम कर सकते हैं?
          </h2>
          <ul className="mt-1 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>
                ✓
              </span>
              <span className={pCls}>
                <strong className="text-ink-navy">एनर्जी चार्ज</strong> — रोज़मर्रा
                में आपके नियंत्रण में आने वाला अकेला हिस्सा। कम यूनिट इस्तेमाल
                करना, या अपनी अगली स्लैब सीमा से नीचे रहना, सीधे इस लाइन को कम
                करता है। यह समझने के लिए कि आपकी अगली सीमा कहां है,{' '}
                <Link
                  href="/hi/blog/how-telescopic-electricity-slabs-work"
                  className="text-brass underline"
                >
                  टेलिस्कोपिक स्लैब कैसे काम करते हैं
                </Link>{' '}
                देखें।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>
                ✓
              </span>
              <span className={pCls}>
                <strong className="text-ink-navy">फिक्स्ड चार्ज</strong> — मुमकिन
                है, लेकिन सिर्फ तभी जब आपका स्वीकृत लोड आपके असल इस्तेमाल के लिए
                साफ तौर पर ज़्यादा हो। आप अपने स्वीकृत लोड के रिव्यू का अनुरोध कर
                सकते हैं, लेकिन यह प्रक्रिया सीधे आपके डिस्कॉम के ज़रिए होती है और
                आपके स्थानीय नियमों पर निर्भर करती है — कोई ऐसी चीज़ नहीं जो एक
                कैलकुलेटर आपके लिए कर सके।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-ash/40" aria-hidden>
                –
              </span>
              <span className={pCls}>
                <strong className="text-ink-navy">फ्यूल/पावर-परचेज़ एडजस्टमेंट
                और इलेक्ट्रिसिटी ड्यूटी</strong> — एक उपभोक्ता के तौर पर आपके
                नियंत्रण में नहीं। पहला डिस्कॉम की बिजली-खरीद लागत को दर्शाता है;
                दूसरा एक राज्य टैक्स दर है। आप कितनी सावधानी से बिजली इस्तेमाल करते
                हैं, इनमें से कोई भी उससे नहीं बदलता।
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: असली बचत एनर्जी चार्ज से आती है — यही वह हिस्सा भी है जिसे
            एक स्लैब कैलकुलेटर पहले से प्लान करने में आपकी मदद कर सकता है।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
                आपके बिल के एनर्जी-चार्ज हिस्से पर एक गहरी नज़र।
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
                महावितरण (MSEDCL) बिल गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपना महाराष्ट्र बिजली बिल ऑनलाइन जांचना और चुकाना।
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
          आख़िरी सत्यापन: {LAST_VERIFIED}। ऊपर दी गई नामकरण परंपराएं और उदाहरण
          सामान्य/क्रॉस-डिस्कॉम हैं और आपके खास बोर्ड से मेल न खाएं — यूटिलिटी
          कंपनियां कभी-कभी इन लाइन आइटम का नाम बदल देती हैं। हमेशा अपने बिल या अपने{' '}
          <Link href="/hi/methodology" className="text-brass underline">
            डिस्कॉम के मौजूदा टैरिफ ऑर्डर
          </Link>{' '}
          से मौजूदा दरों और सटीक शब्दावली की पुष्टि करें।
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
