import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/smart-meters-in-india-guide'
const TITLE = 'भारत में स्मार्ट मीटर: क्या यह अनिवार्य है, और आम समस्याएं कैसे ठीक करें'
const DESCRIPTION =
  'क्या भारत में स्मार्ट बिजली मीटर लगवाना अनिवार्य है? रीचार्ज कैसे काम करता है, और भुगतान के बाद भी बिजली न आए तो क्या करें — एक सरल-भाषा 2026 गाइड।'
const LAST_VERIFIED = '4 सितंबर 2026'

export const metadata: Metadata = {
  title: 'भारत में स्मार्ट मीटर: अनिवार्य? रीचार्ज और समाधान (2026)',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/blog/smart-meters-in-india-guide'),
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
  datePublished: '2026-09-04',
  dateModified: '2026-09-04',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'प्रीपेड स्मार्ट बिजली मीटर रीचार्ज कैसे करें',
  step: [
    { '@type': 'HowToStep', position: 1, text: 'अपने DISCOM का आधिकारिक ऐप या वेब पोर्टल खोलें और अपने कंज़्यूमर/अकाउंट नंबर से साइन इन करें।' },
    { '@type': 'HowToStep', position: 2, text: '"रीचार्ज" या "बैलेंस जोड़ें" विकल्प ढूंढें और पहले अपना मौजूदा बैलेंस जांचें।' },
    { '@type': 'HowToStep', position: 3, text: 'रीचार्ज राशि डालें और UPI, कार्ड, नेट बैंकिंग या अपने DISCOM के दिए किसी और विकल्प से भुगतान करें।' },
    { '@type': 'HowToStep', position: 4, text: 'भुगतान पुष्टि (आम तौर पर SMS या ऐप में) का इंतज़ार करें, फिर कोई समस्या मान लेने से पहले जांचें कि आपका बैलेंस अपडेट हो गया है।' },
  ],
}

const faqs = [
  {
    q: 'स्मार्ट मीटर क्या होता है?',
    a: 'स्मार्ट मीटर एक बिजली मीटर है जो आपकी बिजली की खपत को अपने आप, रीयल-टाइम में DISCOM के सर्वर तक भेजता है — बिना किसी मीटर रीडर के घर आए। आप अपनी खपत ऐप या वेब पोर्टल पर लाइव देख सकते हैं, और बिलिंग प्रीपेड या पोस्टपेड, दोनों तरह हो सकती है।',
  },
  {
    q: 'क्या भारत में स्मार्ट मीटर लगवाना ज़रूरी है?',
    a: 'अप्रैल 2026 तक, नहीं — प्रीपेड बिलिंग अनिवार्य नहीं रही। सेंट्रल इलेक्ट्रिसिटी अथॉरिटी ने अप्रैल 2026 में नियम बदला, जिससे बिलिंग मोड (प्रीपेड या पोस्टपेड) कंज़्यूमर की अपनी मर्ज़ी बन गया। लेकिन हर DISCOM/राज्य का अपना प्रोसेस अलग हो सकता है, इसलिए अपने DISCOM का आधिकारिक नोटिस ज़रूर जांचें।',
  },
  {
    q: 'स्मार्ट मीटर और एक सामान्य बिजली मीटर में क्या फर्क है?',
    a: 'एक सामान्य मीटर को पढ़ने के लिए किसी व्यक्ति को आना पड़ता है, इसलिए वह विज़िट छूटने पर बिल अनुमानित हो सकते हैं। एक स्मार्ट मीटर असली रीडिंग दूर से और लगातार भेजता है, इसलिए बिलिंग बिना अनुमान के असली इस्तेमाल को दिखाती है, और उपभोक्ता पेपर बिल का इंतज़ार करने की बजाय ऐप के ज़रिए लाइव खपत देख सकते हैं।',
  },
  {
    q: 'स्मार्ट मीटर रीचार्ज कैसे करें?',
    a: 'अपने DISCOM के आधिकारिक ऐप या वेब पोर्टल में लॉगिन करें, "रीचार्ज" विकल्प चुनें, राशि डालें, और UPI, कार्ड या नेट बैंकिंग से भुगतान करें — सटीक स्टेप्स DISCOM के हिसाब से थोड़े अलग हो सकते हैं। भुगतान के बाद पुष्टि (SMS या ऐप में) ज़रूर जांचें।',
  },
  {
    q: 'रीचार्ज करने के बाद भी बिजली नहीं आ रही — क्या करूं?',
    a: 'पहले अपने DISCOM ऐप में पुष्टि करें कि रीचार्ज फेल तो नहीं हुआ और बैलेंस अपडेट हुआ है — मीटर तक सिंक होने में थोड़ा समय लग सकता है। अगर काफी देर बाद भी बिजली नहीं आई, तो तुरंत अपने DISCOM की हेल्पलाइन या कंप्लेंट पोर्टल पर रिपोर्ट करें।',
  },
  {
    q: 'क्या मैं अपना स्मार्ट मीटर वापस पोस्टपेड बिलिंग में बदल सकता हूं?',
    a: 'अप्रैल 2026 के CEA नियम संशोधन के बाद से, बिलिंग मोड कंज़्यूमर की अपनी पसंद माना जाता है, और उत्तर प्रदेश ने शिकायतों के बाद बड़ी संख्या में उपभोक्ताओं के लिए एक अनिवार्य-प्रीपेड रोलआउट पहले ही वापस ले लिया है। सटीक बदलाव की प्रक्रिया DISCOM के हिसाब से अलग होती है, इसलिए अपने खुद के बिजली बोर्ड से पुष्टि करें।',
  },
  {
    q: 'स्मार्ट मीटर लगने के बाद मेरा बिल ज़्यादा क्यों है?',
    a: 'एक आम, वैध वजह यह है कि एक स्मार्ट मीटर पुरानी अनुमानित रीडिंग की बजाय आपके असली, रीयल-टाइम इस्तेमाल को बिल करता है — इसलिए एक बिल सिर्फ इसलिए बढ़ सकता है क्योंकि अब यह सटीक है, किसी गलती की वजह से नहीं। गलती मान लेने से पहले अपने असली इस्तेमाल को अपने DISCOM की स्लैब दरों के मुकाबले जांचें।',
  },
  {
    q: 'अगर मेरे स्मार्ट मीटर का बैलेंस खत्म हो जाए तो क्या होता है?',
    a: 'एक प्रीपेड स्मार्ट मीटर पर, बैलेंस खत्म होने पर बिजली काटी जा सकती है, हालांकि कई DISCOM ऐसा होने से पहले एक ग्रेस पीरियड या लो-बैलेंस अलर्ट देते हैं — सटीक बफर DISCOM के हिसाब से अलग होता है और हर जगह एक जैसा नहीं है, इसलिए एक तय आंकड़ा मान लेने की बजाय अपने बोर्ड की नीति जांचें।',
  },
  {
    q: 'मैं अपने स्मार्ट मीटर की शिकायत कैसे दर्ज करूं?',
    a: 'पहले अपने DISCOM का आधिकारिक ऐप, वेब पोर्टल या कस्टमर-केयर हेल्पलाइन इस्तेमाल करें, क्योंकि ज़्यादातर बिलिंग और कनेक्टिविटी समस्याएं वहीं हल हो जाती हैं। अगर मुद्दा हल न हो, तो आप अपने राज्य के इलेक्ट्रिसिटी कंज़्यूमर ग्रीवेंस फोरम में एस्केलेट कर सकते हैं — सटीक एस्केलेशन प्रोसेस के लिए अपने DISCOM की वेबसाइट जांचें।',
  },
  {
    q: 'अब तक किन राज्यों ने सबसे ज़्यादा स्मार्ट मीटर लगाए हैं?',
    a: 'नवंबर 2025 के मध्य तक, बिजली मंत्रालय के अनुसार उत्तर प्रदेश, बिहार, महाराष्ट्र, असम और मध्य प्रदेश राष्ट्रीय RDSS रोलआउट के तहत सबसे तेज़ी से आगे बढ़ने वाले राज्य थे। यह रैंकिंग इंस्टॉलेशन की गति दिखाती है, अंतिम कवरेज नहीं, और रोलआउट अपनी (बढ़ाई गई) मार्च 2028 की समयसीमा की ओर बढ़ने के साथ बार-बार बदलती है।',
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

const rolloutStates = [
  { state: 'उत्तर प्रदेश', note: 'सबसे बड़ा बताया गया प्रीपेड कंज़्यूमर बेस; वह राज्य भी जिसने शिकायतों के बाद 2026 में एक अनिवार्य-प्रीपेड आदेश वापस लिया।' },
  { state: 'बिहार', note: 'उसी अवधि में RDSS के तहत सबसे तेज़ी से आगे बढ़ने वाले राज्यों में से एक।' },
  { state: 'महाराष्ट्र', note: 'बड़े पैमाने पर शहरी और अर्ध-शहरी रोलआउट जारी।' },
  { state: 'असम', note: 'इंस्टॉलेशन गति के हिसाब से टॉप पांच राज्यों में से एक।' },
  { state: 'मध्य प्रदेश', note: 'इंस्टॉलेशन गति के हिसाब से टॉप पांच राज्यों में से एक।' },
]

const problems = [
  {
    problem: 'रीचार्ज किया, लेकिन बिजली अभी भी बंद है',
    cause: 'आपके भुगतान और मीटर द्वारा नया बैलेंस पहचानने के बीच एक छोटी सिंक देरी, या एक नेटवर्क/कनेक्टिविटी गैप',
    fix: 'पहले अपने DISCOM ऐप में पुष्टि करें कि रीचार्ज सफल हुआ। अगर उचित इंतज़ार के बाद भी बिजली नहीं आई, तो पेमेंट रेफरेंस के साथ अपने DISCOM हेल्पलाइन से संपर्क करें।',
  },
  {
    problem: 'दिखाया गया बैलेंस गलत लगता है',
    cause: 'ऐप-से-मीटर सिंक में देरी, या एक बिलिंग/कटौती जिसकी आपने उम्मीद नहीं की थी (जैसे प्रीपेड बैलेंस से काटे गए फिक्स्ड चार्ज)',
    fix: 'ऐप में अपना ट्रांज़ैक्शन और खपत इतिहास जांचें। अगर बेमेल बना रहता है, तो इसे खुद सुधरने का मान लेने की बजाय अपने DISCOM के साथ उठाएं।',
  },
  {
    problem: 'बैलेंस होने के बावजूद अचानक कनेक्शन कट गया',
    cause: 'यह एक तकनीकी खराबी, एक फिक्स्ड-चार्ज कटौती, या एक असली ज़ीरो-बैलेंस घटना हो सकती है जिसके लिए आपको अलर्ट नहीं मिला',
    fix: 'पहले ऐप के ट्रांज़ैक्शन लॉग में देखें असल में क्या हुआ, फिर अगर डिस्कनेक्शन अस्पष्ट लगे तो अपने DISCOM में एस्केलेट करें।',
  },
  {
    problem: 'बिल या कटौती अपेक्षा से ज़्यादा',
    cause: 'अक्सर यह सिर्फ पहली बार सही तरीके से मीटर की गई असली खपत बिल हो रही है — कोई खराबी नहीं',
    fix: 'गलती मान लेने से पहले अपने राज्य की असली टैरिफ स्लैब और उपकरण चलाने की लागत के मुकाबले अपना असली इस्तेमाल जांचें।',
  },
]

export default function SmartMetersGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'स्मार्ट मीटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📡</span> Explainer
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '📡', big: '7.24 Cr', small: 'मीटर इंस्टॉल (30 जून 2026)', tone: 'hub' },
          { icon: '⚡', big: '5.73 Cr', small: 'RDSS के तहत इंस्टॉल', tone: 'hub' },
          { icon: '📉', big: '15.04%', small: 'AT&C नुकसान (FY2025)', tone: 'spark-teal' },
          { icon: '✓', big: 'वैकल्पिक', small: 'प्रीपेड मोड (अप्रैल 2026 से)', tone: 'seal-red' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          लेखक:{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · आखिरी बार सत्यापित {LAST_VERIFIED}
        </p>
        <p className="mt-1 text-xs text-caution-amber">
          अनिवार्य-बनाम-वैकल्पिक नियम इस लेख का सबसे तेज़ी से बदलने वाला
          तथ्य है — हर एडिट से पहले इसे फिर जांचें, क्योंकि यह पिछले दो
          सालों में एक से ज़्यादा बार बदल चुका है।
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          एक <strong>स्मार्ट मीटर</strong> एक बिजली मीटर है जो आपकी इस्तेमाल
          रीडिंग को अपने आप, एक नेटवर्क पर, आपके DISCOM तक भेजता है — कोई
          मीटर-रीडर विज़िट नहीं, और अक्सर एक ऐप पर लाइव खपत डेटा। जैसा कि{' '}
          <strong>अप्रैल 2026</strong> तक है, स्मार्ट मीटर लगवाना पूरे देश
          में अनिवार्य नहीं है: सेंट्रल इलेक्ट्रिसिटी अथॉरिटी ने उस महीने
          अपने नियमों में संशोधन किया कि बिलिंग मोड (प्रीपेड या पोस्टपेड)
          एक अनिवार्य शर्त की बजाय उपभोक्ता की पसंद बन जाए, उत्तर प्रदेश
          जैसे राज्यों द्वारा शिकायतों के बाद जबरन प्रीपेड रोलआउट वापस लेने
          के बाद। आपके अपने DISCOM का नियम इस राष्ट्रीय स्थिति से अभी भी
          अलग हो सकता है, इसलिए यह मान लेने से पहले कि यह आप पर लागू होता
          है, इसका आधिकारिक नोटिस जांचें।
        </p>

        <section aria-labelledby="how-it-works" className="mt-10 scroll-mt-20">
          <h2 id="how-it-works" className={h2Cls}>
            एक स्मार्ट मीटर असल में कैसे काम करता है?
          </h2>
          <p className={pCls}>
            एक स्मार्ट मीटर आपकी खपत को छोटे अंतराल पर रिकॉर्ड करता है और
            इसे — आम तौर पर एक सेल्युलर या रेडियो नेटवर्क पर — आपके DISCOM
            के सर्वर तक भेजता है, बिना किसी के आपके घर आए। जहां DISCOM ऐप
            इसे सपोर्ट करता है, आप अपनी लाइव खपत, रीचार्ज इतिहास, और बैलेंस
            सीधे अपने फोन पर देख सकते हैं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            बिलिंग किसी भी मोड में चल सकती है: <strong>प्रीपेड</strong>,
            जहां आप पहले से एक बैलेंस टॉप अप करते हैं और यह आपके इस्तेमाल
            के साथ घटता है, या <strong>पोस्टपेड</strong>, जहां आपको एक
            पारंपरिक मीटर के करीब, बाद में बिल किया जाता है — और अप्रैल
            2026 से, आप कौन सा मोड इस्तेमाल करते हैं यह आपकी पसंद माना
            जाता है, कोई तय नियम नहीं।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">पारंपरिक मीटर</th>
                  <th className="px-4 py-2 font-semibold">स्मार्ट मीटर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">रीडिंग का तरीका</td>
                  <td className="px-4 py-2">मैनुअल, मासिक विज़िट</td>
                  <td className="px-4 py-2">रिमोट, अपने आप</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">बिलिंग का आधार</td>
                  <td className="px-4 py-2">विज़िट छूटने पर अक्सर अनुमानित</td>
                  <td className="px-4 py-2">असली रिकॉर्ड की गई खपत</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">खपत की दृश्यता</td>
                  <td className="px-4 py-2">सिर्फ बिल आने के बाद</td>
                  <td className="px-4 py-2">लाइव, ऐप के ज़रिए (जहां सपोर्टेड हो)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">रीचार्ज मॉडल</td>
                  <td className="px-4 py-2">सिर्फ पोस्टपेड</td>
                  <td className="px-4 py-2">प्रीपेड या पोस्टपेड — अप्रैल 2026 से उपभोक्ता की पसंद</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">छेड़छाड़/चोरी का पता लगाना</td>
                  <td className="px-4 py-2">सिर्फ मैनुअल जांच</td>
                  <td className="px-4 py-2">अपने आप फ्लैगिंग</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-3 text-xs ${pCls}`}>
            उदाहरण के तौर पर तुलना, असली DISCOM डेटा नहीं — सटीक विशेषताएं
            आपके बोर्ड के रोलआउट पर निर्भर करती हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: एक स्मार्ट मीटर यह नहीं बदलता कि बिजली की कीमत कैसे
            तय होती है — यह बदलता है कि आपका इस्तेमाल कैसे (और कितनी बार)
            मापा और बिल किया जाता है।
          </p>
        </section>

        <section aria-labelledby="misconceptions" className="mt-10 scroll-mt-20">
          <h2 id="misconceptions" className={h2Cls}>
            ज़्यादातर स्मार्ट मीटर एक्सप्लेनर कहां गलत होते हैं?
          </h2>
          <p className={pCls}>ऑनलाइन दो दावे काफी फैलते हैं, और दोनों को सुधार चाहिए:</p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>✕</span>
              <span className={pCls}>
                <strong className="text-ink-navy">"यह हर जगह अनिवार्य है।"</strong>{' '}
                अप्रैल 2026 से नहीं — संशोधित CEA नियम के तहत प्रीपेड मोड
                अब उपभोक्ता की पसंद है, हालांकि उस पसंद का इस्तेमाल करने
                की आपके खास DISCOM की प्रक्रिया अलग हो सकती है।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>✕</span>
              <span className={pCls}>
                <strong className="text-ink-navy">
                  "प्रीपेड का मतलब है बैलेंस ज़ीरो होते ही बिजली कट जाती है।"
                </strong>{' '}
                कई DISCOM डिस्कनेक्शन से पहले एक ग्रेस पीरियड, लो-बैलेंस
                अलर्ट, या छोटा बफर बनाते हैं — लेकिन सटीक नियम एक समान नहीं
                है, इसलिए एक तय आंकड़ा मान लेने की बजाय अपने DISCOM की नीति
                जांचें।
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: अनिवार्य नियम और डिस्कनेक्शन नियम दोनों राज्य और
            DISCOM के हिसाब से अलग होते हैं — एक शहर के अनुभव से अपने बारे
            में सामान्यीकरण न करें।
          </p>
        </section>

        <section aria-labelledby="mandatory-timeline" className="mt-10 scroll-mt-20">
          <h2 id="mandatory-timeline" className={h2Cls}>
            क्या स्मार्ट मीटर लगवाना ज़रूरी है? पूरी नियामक समयरेखा
          </h2>
          <p className={pCls}>
            क्या एक स्मार्ट मीटर — और खास तौर पर प्रीपेड बिलिंग — अनिवार्य
            है, इस पर नियम एक से ज़्यादा बार बदला है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">कब</th>
                  <th className="px-4 py-2 font-semibold">क्या बदला</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">2021</td>
                  <td className="px-4 py-2">RDSS (रिवैम्प्ड डिस्ट्रिब्यूशन सेक्टर स्कीम) लॉन्च हुई, जिसने एक राष्ट्रीय स्मार्ट-मीटर रोलआउट को फंड किया।</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">2021–2025</td>
                  <td className="px-4 py-2">इंस्टॉलेशन बढ़ने के साथ कई राज्यों ने अनिवार्य प्रीपेड स्मार्ट मीटरिंग को आगे बढ़ाया।</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">अप्रैल 2026</td>
                  <td className="px-4 py-2">CEA ने अपने नियमों में संशोधन किया: बिलिंग मोड (प्रीपेड या पोस्टपेड) एक अनिवार्य शर्त की बजाय उपभोक्ता की पसंद बन गया।</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">2026</td>
                  <td className="px-4 py-2">बिलिंग और तकनीकी समस्याओं को लेकर विरोध के बाद, उत्तर प्रदेश ने अपना अनिवार्य-प्रीपेड आदेश खत्म किया और बड़ी संख्या में उपभोक्ताओं को वापस पोस्टपेड में डाला।</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            संक्षेप में: <strong>आज तक, आपके क्षेत्र में RDSS के तहत एक
            स्मार्ट मीटर खुद अभी भी लग सकता है, लेकिन आपको इसे अनिवार्य
            प्रीपेड मोड में चलाने की ज़रूरत नहीं है</strong> — अपने DISCOM
            का मौजूदा नोटिस जांचें, क्योंकि स्थानीय क्रियान्वयन अभी भी
            राष्ट्रीय नियम को पकड़ रहा है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अनिवार्य-प्रीपेड शर्त मौजूद थी, फिर अप्रैल 2026 में
            औपचारिक रूप से हटा दी गई — इस लेख पर भरोसा करने से पहले
            सत्यापित करने के लिए यह सबसे महत्वपूर्ण तथ्य है, क्योंकि यह
            फिर बदल सकता है।
          </p>
        </section>

        <section aria-labelledby="rollout" className="mt-10 scroll-mt-20">
          <h2 id="rollout" className={h2Cls}>
            अब तक किन राज्यों ने सबसे ज़्यादा स्मार्ट मीटर लगाए हैं?
          </h2>
          <p className={pCls}>
            15 नवंबर 2025 तक, बिजली मंत्रालय ने इन्हें RDSS के तहत
            इंस्टॉलेशन गति के हिसाब से सबसे तेज़ राज्यों के रूप में सूचीबद्ध
            किया। यह एक राष्ट्रीय रोलआउट-गति रैंकिंग है, सटीक राज्य-दर-राज्य
            इंस्टॉलेशन गिनती नहीं, और यह महीने-दर-महीने बदलती है — इसे एक
            स्नैपशॉट मानें, मौजूदा लीग टेबल नहीं।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">राज्य</th>
                  <th className="px-4 py-2 font-semibold">नोट</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {rolloutStates.map((r) => (
                  <tr key={r.state}>
                    <td className="px-4 py-2 font-medium">{r.state}</td>
                    <td className="px-4 py-2 text-ash/70">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            आप किसी भी राज्य में हों, अपने बोर्ड के मौजूदा नियम जानने का
            सबसे तेज़ तरीका आपके DISCOM का आधिकारिक नोटिस है — एक राष्ट्रीय
            सुर्खी नहीं। हमारे{' '}
            <Link href="/hi/electricity" className="text-brass underline">
              राज्य के हिसाब से बिजली बिल कैलकुलेटर
            </Link>{' '}
            पर अपनी खुद की दर और स्लैब संरचना जांचें, जिसमें शामिल हैं{' '}
            <Link href="/hi/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL (उत्तर प्रदेश)
            </Link>
            ,{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (महाराष्ट्र)
            </Link>{' '}
            और{' '}
            <Link href="/hi/electricity/bihar-electricity-bill-calculator" className="text-brass underline">
              बिहार
            </Link>
            ।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: इंस्टॉलेशन गति के नेतृत्वकर्ता हर महीने बदलते हैं —
            एक राज्य-स्तरीय सुर्खी पर भरोसा करने की बजाय हमेशा अपने DISCOM
            की मौजूदा स्थिति की पुष्टि करें।
          </p>
        </section>

        <section aria-labelledby="recharge" className="mt-10 scroll-mt-20">
          <h2 id="recharge" className={h2Cls}>
            स्मार्ट मीटर रीचार्ज कैसे करें? एक सामान्य वॉकथ्रू
          </h2>
          <p className={pCls}>
            सटीक स्क्रीन DISCOM के हिसाब से अलग होती हैं, लेकिन मुख्य
            स्टेप्स लगभग हर जगह एक जैसे हैं:
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'अपने DISCOM का आधिकारिक ऐप या वेब पोर्टल खोलें और अपने कंज़्यूमर/अकाउंट नंबर से साइन इन करें।',
              '"रीचार्ज" या "बैलेंस जोड़ें" विकल्प ढूंढें और पहले अपना मौजूदा बैलेंस जांचें।',
              'रीचार्ज राशि डालें और UPI, कार्ड, नेट बैंकिंग या अपने DISCOM के दिए किसी और विकल्प से भुगतान करें।',
              'भुगतान पुष्टि (आम तौर पर SMS या ऐप में) का इंतज़ार करें, फिर कोई समस्या मान लेने से पहले जांचें कि आपका बैलेंस अपडेट हो गया है।',
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
            किसी भी समय अपना बैलेंस जांचने के लिए, वही ऐप या पोर्टल भरोसेमंद
            रास्ता है — बैलेंस जानकारी के लिए अनाधिकारिक थर्ड-पार्टी साइट्स
            पर भरोसा करने से बचें, क्योंकि सिर्फ आपके DISCOM का अपना सिस्टम
            प्रामाणिक है।
          </p>
          <p className={pCls}>
            रीचार्ज करने से पहले, अपने{' '}
            <Link href="/hi/electricity" className="text-brass underline">
              राज्य कैलकुलेटर
            </Link>{' '}
            से यह क्रॉस-चेक करना फायदेमंद है कि आपका बिल <em>लगभग</em> कितना
            आना चाहिए — इस तरह, अगर एक टॉप-अप अपेक्षा से तेज़ी से खत्म होता
            लगे, तो गलती मान लेने से पहले आपके पास तुलना करने के लिए एक
            अनुमानित आंकड़ा होगा।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: रीचार्ज स्टेप्स सामान्य तौर पर हर जगह एक जैसे हैं
            (ऐप → बैलेंस जांचें → भुगतान करें → पुष्टि करें), भले ही सटीक
            स्क्रीन DISCOM के हिसाब से अलग हों।
          </p>
        </section>

        <section aria-labelledby="problems" className="mt-10 scroll-mt-20">
          <h2 id="problems" className={h2Cls}>
            स्मार्ट मीटर लगने के बाद बिजली कटे तो क्या करें? आम समस्याएं और समाधान
          </h2>
          <p className={pCls}>
            ज़्यादातर शिकायतें कुछ पैटर्न में आती हैं। यहां है आम तौर पर
            क्या हो रहा है, और असल में क्या करना चाहिए:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">समस्या</th>
                  <th className="px-4 py-2 font-semibold">संभावित वजह</th>
                  <th className="px-4 py-2 font-semibold">क्या करें</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {problems.map((p) => (
                  <tr key={p.problem}>
                    <td className="px-4 py-2 font-medium">{p.problem}</td>
                    <td className="px-4 py-2 text-ash/70">{p.cause}</td>
                    <td className="px-4 py-2 text-ash/70">{p.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            उस आखिरी पंक्ति पर — एक बिल या कटौती जो बहुत ज़्यादा लगे — एक
            सच में आम, गैर-खराबी वाली वजह यह है कि एक स्मार्ट मीटर अब
            आपके <em>असली</em> इस्तेमाल को सटीक तरीके से बिल कर रहा है,
            जहां एक पुराना मीटर या अनुमानित रीडिंग कुछ समय के लिए इसे कम
            दिखा सकती थी। गलती मान लेने से पहले, हमारे{' '}
            <Link href="/hi/ac/bill-calculator" className="text-brass underline">
              AC चलाने की लागत कैलकुलेटर
            </Link>{' '}
            या{' '}
            <Link href="/hi/appliances/ceiling-fan-cost-calculator" className="text-brass underline">
              सीलिंग फैन लागत कैलकुलेटर
            </Link>{' '}
            इस्तेमाल करके देखें कि एक बड़ा उपकरण असल में कितना खर्च करता है
            — यह अक्सर सिर्फ सटीक बिलिंग का पकड़ में आना है, कोई गलती नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ज़्यादातर स्मार्ट मीटर शिकायतें सिंक देरी, बैलेंस
            उलझन, या आखिरकार असली इस्तेमाल दिखा रहे बिल हैं — असली खराबियां
            भी होती हैं, लेकिन एस्केलेट करने से पहले पहले ऐप/पोर्टल के
            ब्यौरे जांचें।
          </p>
        </section>

        <section aria-labelledby="rights" className="mt-10 scroll-mt-20">
          <h2 id="rights" className={h2Cls}>
            क्या मैं स्मार्ट मीटर से मना कर सकता हूं, या वापस पोस्टपेड में जा सकता हूं?
          </h2>
          <p className={pCls}>
            अप्रैल 2026 तक, नियामक स्थिति यह है कि बिलिंग मोड — प्रीपेड या
            पोस्टपेड — CEA के उस महीने के संशोधन के बाद उपभोक्ता की पसंद
            है, कोई अनिवार्य शर्त नहीं। बढ़ी हुई बिलिंग और तकनीकी गड़बड़ियों
            की शिकायतों के बाद, उत्तर प्रदेश ने बड़ी संख्या में उपभोक्ताओं
            के लिए अपना अनिवार्य-प्रीपेड रोलआउट वापस लेकर उन्हें पोस्टपेड
            में वापस भेजकर इस पर पहले ही अमल कर लिया है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            फिर भी, यह लेख आपको आपकी खास स्थिति में क्या करना चाहिए यह नहीं
            बता सकता — हर राज्य और DISCOM अभी भी इसे अलग-अलग तरीके से लागू
            कर रहा है, और मीटर का इंस्टॉलेशन खुद (आप कौन सा बिलिंग मोड
            इस्तेमाल करते हैं उससे अलग) आपके क्षेत्र में RDSS के तहत अभी
            भी जारी रह सकता है। अगर आप अपना बिलिंग मोड बदलना चाहते हैं या
            किसी चार्ज पर विवाद करना चाहते हैं, तो भरोसेमंद रास्ता है:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'अपने DISCOM के आधिकारिक ऐप, वेबसाइट या नोटिस बोर्ड पर उनकी मौजूदा प्रक्रिया जांचें।',
              'अपना अनुरोध या शिकायत उनके आधिकारिक चैनल (ऐप, पोर्टल या हेल्पलाइन) के ज़रिए उठाएं।',
              'अगर हल न हो, तो अपने राज्य के इलेक्ट्रिसिटी कंज़्यूमर ग्रीवेंस फोरम में एस्केलेट करें।',
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-electricity" aria-hidden>✓</span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: अब आपके पास पोस्टपेड बिलिंग का अनुरोध करने का एक
            नियामक आधार है, लेकिन उस पसंद का इस्तेमाल करने की असली प्रक्रिया
            आपके अपने DISCOM द्वारा तय की जाती है — एक ही राष्ट्रीय प्रक्रिया
            मान लेने की बजाय सीधे इसकी पुष्टि करें।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़ी हुई गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📘</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                एक स्मार्ट मीटर बदलता है कि इस्तेमाल कैसे मापा जाता है —
                यह बताता है कि इसकी कीमत कैसे तय होती है।
              </p>
            </Link>
            <Link
              href="/hi/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>⚡</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                राज्य के हिसाब से बिजली बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपने DISCOM की असली, तारीख वाली टैरिफ जांचें।
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
          स्रोत: बिजली मंत्रालय के संसद (राज्य सभा/लोक सभा) को लिखित जवाब,
          सेंट्रल इलेक्ट्रिसिटी अथॉरिटी के नियम संशोधन, और नेशनल डायलॉग
          ऑन स्मार्ट-मीटर्ड इंडिया में प्रस्तुत CEEW/REC लिमिटेड रिसर्च।
          राज्य और DISCOM-स्तर के नियम अलग होते हैं और बार-बार बदलते हैं —
          हमेशा अपने DISCOM के आधिकारिक नोटिस से पुष्टि करें। ऐसे तथ्यों
          को हम कैसे सत्यापित करते हैं, इसके लिए हमारी{' '}
          <Link href="/methodology" className="text-brass underline">
            कार्यप्रणाली
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      </main>
    </>
  )
}
