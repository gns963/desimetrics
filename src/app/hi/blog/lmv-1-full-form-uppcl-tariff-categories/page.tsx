import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/lmv-1-full-form-uppcl-tariff-categories'
const TITLE = 'UPPCL में LMV-1 का फुल फॉर्म: LMV-1 से HV-4 तक हर टैरिफ कैटेगरी समझिए'
const DESCRIPTION =
  'LMV-1 UPPCL का वह रेट शेड्यूल है जो घरेलू लाइट, फैन और पावर के लिए है, और उत्तर प्रदेश के ज़्यादातर घरों का बिल इसी में बनता है। जानिए LMV का मतलब और LMV-1 से HV-4 तक हर शेड्यूल क्या कवर करता है।'
const LAST_UPDATED = '5 अक्टूबर 2026'

export const metadata: Metadata = {
  title: 'UPPCL में LMV-1 का फुल फॉर्म और सभी LMV / HV कैटेगरी',
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
  datePublished: '2026-10-05',
  dateModified: '2026-10-05',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'UPPCL में LMV-1 का फुल फॉर्म क्या है?',
    a: 'LMV-1 UPPCL का वह रेट शेड्यूल है जिसका शीर्षक Domestic Light, Fan and Power (घरेलू लाइट, फैन और पावर) है। LMV को आम तौर पर लो एंड मीडियम वोल्टेज पढ़ा जाता है, और 1 सूची का पहला शेड्यूल दिखाता है, जो घरों के लिए है।',
  },
  {
    q: 'UPPCL के बिल पर LMV का क्या मतलब है?',
    a: 'UPPCL के बिल पर LMV लो और मीडियम वोल्टेज पर सप्लाई वाले रेट शेड्यूल को दिखाता है। उत्तर प्रदेश विद्युत नियामक आयोग का टैरिफ ऑर्डर इस संक्षिप्त नाम का पूरा रूप नहीं लिखता; HV शेड्यूल 11 kV और उससे ऊपर की सप्लाई के लिए हैं।',
  },
  {
    q: 'UPPCL में LMV-2 क्या है?',
    a: 'LMV-2 UPPCL का रेट शेड्यूल है जो Non-Domestic Light, Fan and Power (गैर-घरेलू लाइट, फैन और पावर) के लिए है। इसमें दुकानें, दफ्तर और दूसरे व्यावसायिक कनेक्शन आते हैं।',
  },
  {
    q: 'LMV-1 और LMV-2 में क्या फर्क है?',
    a: 'LMV-1 घरेलू इस्तेमाल के लिए है और LMV-2 गैर-घरेलू या व्यावसायिक इस्तेमाल के लिए। अगर 50 kW से कम के लोड का कोई हिस्सा कारोबार में इस्तेमाल होता है, तो पूरी खपत उस इस्तेमाल के गैर-घरेलू शेड्यूल के तहत बिल होती है।',
  },
  {
    q: 'UPPCL में LMV-6 क्या है?',
    a: 'LMV-6 UPPCL का रेट शेड्यूल है जो Small and Medium Power (लघु एवं मध्यम पावर) के लिए है। इसमें 100 HP (75 kW) से कम अनुबंधित लोड वाले औद्योगिक कनेक्शन आते हैं।',
  },
  {
    q: 'क्या UPPCL में LMV-10 कैटेगरी है?',
    a: 'FY 2025-26 के रिटेल रेट शेड्यूल में LMV-10 शेड्यूल नहीं है; सूची LMV-1 से LMV-9 तक और फिर LMV-11 है। लाइसेंसी कंपनियों के कर्मचारी LMV-1 के तहत आते हैं।',
  },
  {
    q: 'UPPCL में LMV-11 क्या है?',
    a: 'LMV-11 UPPCL का रेट शेड्यूल है जो इलेक्ट्रिक व्हीकल चार्जिंग के लिए है। FY 2025-26 के शेड्यूल के तहत पब्लिक चार्जिंग स्टेशन लो टेंशन पर ₹7.70 प्रति यूनिट और हाई टेंशन पर ₹7.30 प्रति यूनिट चुकाते हैं।',
  },
  {
    q: 'मुझे कैसे पता चलेगा कि मेरा कनेक्शन किस LMV कैटेगरी में है?',
    a: 'आपकी कैटेगरी आपके UPPCL बिल पर टैरिफ या सप्लाई टाइप के रूप में छपी होती है, जैसे LMV-1। यह कनेक्शन स्वीकृत होते समय बताए गए इस्तेमाल के उद्देश्य से तय होती है।',
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

const lmvRows: [string, string, string][] = [
  ['LMV-1', 'Domestic Light, Fan & Power', 'घर'],
  ['LMV-2', 'Non-Domestic Light, Fan and Power', 'दुकानें, दफ्तर, व्यावसायिक इस्तेमाल'],
  ['LMV-3', 'Public Lamps', 'स्ट्रीट लाइट'],
  ['LMV-4', 'Light, Fan & Power for Public Institutions and Private Institutions', 'संस्थान'],
  ['LMV-5', 'Small Power for Private Tube Wells / Pumping Sets for Irrigation Purposes', 'खेती के पंप'],
  ['LMV-6', 'Small and Medium Power', '100 HP (75 kW) से कम का उद्योग'],
  ['LMV-7', 'Public Water Works', 'जल आपूर्ति और सीवेज पंपिंग'],
  ['LMV-8', 'State Tube Wells / Panchayati Raj Tube Well & Pumped Canals', 'सरकारी सिंचाई'],
  ['LMV-9', 'Temporary Supply', 'अस्थायी कनेक्शन'],
  ['LMV-11', 'Electric Vehicle Charging', 'EV चार्जिंग'],
]

const hvRows: [string, string][] = [
  ['HV-1', 'Non-Industrial Bulk Loads'],
  ['HV-2', 'Large and Heavy Power'],
  ['HV-3', 'Railway Traction'],
  ['HV-4', 'Lift Irrigation Works'],
]

const evRows: [string, string][] = [
  ['बहुमंज़िला इमारत, लो टेंशन', '₹6.20 प्रति यूनिट'],
  ['बहुमंज़िला इमारत, हाई टेंशन', '₹5.90 प्रति यूनिट'],
  ['पब्लिक चार्जिंग स्टेशन, लो टेंशन', '₹7.70 प्रति यूनिट'],
  ['पब्लिक चार्जिंग स्टेशन, हाई टेंशन', '₹7.30 प्रति यूनिट'],
]

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-hub-electricity" aria-hidden>
        ✓
      </span>
      <span className={pCls}>{children}</span>
    </li>
  )
}

export default function LmvCategoriesArticlePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'LMV-1 और UPPCL कैटेगरी', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏷️</span> एक्सप्लेनर · उत्तर प्रदेश
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
          · अंतिम अपडेट {LAST_UPDATED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            UPPCL में LMV-1 वह रेट शेड्यूल है जिसका शीर्षक &ldquo;Domestic Light, Fan &amp;
            Power&rdquo; है, और उत्तर प्रदेश के घरों का बिल इसी कैटेगरी में बनता है।
          </strong>{' '}
          उत्तर प्रदेश विद्युत नियामक आयोग (UPERC) के FY 2025-26 के रिटेल टैरिफ शेड्यूल में 10
          LMV शेड्यूल और 4 HV शेड्यूल हैं, यानी कुल 14। LMV को आम तौर पर लो एंड मीडियम वोल्टेज
          पढ़ा जाता है। यह गाइड LMV-1 का फुल फॉर्म, LMV-1 से HV-4 तक हर शेड्यूल का शीर्षक, और
          अपने बिल पर कैटेगरी ढूंढने का तरीका बताती है।
        </p>

        <section aria-labelledby="lmv1" className="mt-10 scroll-mt-20">
          <h2 id="lmv1" className={h2Cls}>
            UPPCL में LMV-1 का फुल फॉर्म क्या है?
          </h2>
          <p className={pCls}>
            UPPCL में LMV-1 का फुल फॉर्म शेड्यूल का नाम &ldquo;Domestic Light, Fan &amp;
            Power&rdquo; है, जिसमें LMV को लो एंड मीडियम वोल्टेज पढ़ा जाता है। UPERC का ऑर्डर LMV
            का पूरा रूप नहीं लिखता, और तीन बातें इसका मतलब तय करती हैं।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">LMV</strong> लो और मीडियम वोल्टेज पर सप्लाई
              दिखाता है, जबकि HV शेड्यूल 11 kV और उससे ऊपर की सप्लाई पर लागू होते हैं।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">संख्या</strong> सूची में शेड्यूल का क्रम है; 1
              घरेलू है, 2 गैर-घरेलू, और इसी तरह आगे।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">LMV-1 लागू होता है</strong> आवासीय या घरेलू
              उद्देश्य के परिसरों पर, और शेड्यूल में बताए गए पूजा स्थलों, शेल्टर होम, अनाथालयों
              और वृद्धाश्रमों पर भी।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            सार: बिल पर LMV-1 का मतलब घरेलू कनेक्शन है, जिसका बिल घरेलू टैरिफ पर बनता है।
          </p>
        </section>

        <section aria-labelledby="all-lmv" className="mt-10 scroll-mt-20">
          <h2 id="all-lmv" className={h2Cls}>
            UPPCL की हर LMV कैटेगरी क्या कवर करती है?
          </h2>
          <p className={pCls}>
            UPPCL की हर LMV कैटेगरी एक तरह के इस्तेमाल को कवर करती है, घरों से लेकर इलेक्ट्रिक
            व्हीकल चार्जिंग तक। तालिका में 10 LMV शेड्यूल UPERC के दिए शीर्षक के साथ हैं।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                UPPCL के LMV रेट शेड्यूल, आधिकारिक शीर्षक के साथ, FY 2025-26
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">शेड्यूल</th>
                  <th className="px-4 py-2 font-semibold">आधिकारिक शीर्षक</th>
                  <th className="px-4 py-2 font-semibold">आसान शब्दों में</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {lmvRows.map(([code, title, plain]) => (
                  <tr key={code}>
                    <td className="px-4 py-2 font-medium">{code}</td>
                    <td className="px-4 py-2">{title}</td>
                    <td className="px-4 py-2 text-ash/70">{plain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            सूची में LMV-10 नहीं है। FY 2025-26 का रेट शेड्यूल LMV-1 से LMV-9 तक और फिर LMV-11
            है, और लाइसेंसी कंपनियों के कर्मचारी LMV-1 के तहत आते हैं।
          </p>
          <p className={takeawayCls}>
            सार: LMV की संख्या कनेक्शन का उद्देश्य बताती है, बिल की रकम नहीं।
          </p>
        </section>

        <section aria-labelledby="hv" className="mt-10 scroll-mt-20">
          <h2 id="hv" className={h2Cls}>
            UPPCL की HV कैटेगरी क्या हैं?
          </h2>
          <p className={pCls}>
            UPPCL की HV कैटेगरी चार शेड्यूल हैं, जो हाई वोल्टेज पर सप्लाई वाले बड़े कनेक्शनों के
            लिए हैं। तालिका में हर एक दिया गया है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">UPPCL के HV रेट शेड्यूल, आधिकारिक शीर्षक के साथ</caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">शेड्यूल</th>
                  <th className="px-4 py-2 font-semibold">आधिकारिक शीर्षक</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {hvRows.map(([code, title]) => (
                  <tr key={code}>
                    <td className="px-4 py-2 font-medium">{code}</td>
                    <td className="px-4 py-2">{title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            HV-1 दिखाता है कि दोनों समूह कैसे जुड़ते हैं: यह LMV-2 में परिभाषित व्यावसायिक लोड पर
            तब लागू होता है जब अनुबंधित लोड 75 kW या उससे ज़्यादा हो और सप्लाई एक ही बिंदु पर 11
            kV या उससे ऊपर ली जाए।
          </p>
          <p className={takeawayCls}>
            सार: बढ़ता हुआ व्यावसायिक कनेक्शन 11 kV सप्लाई पर 75 kW पहुंचने पर LMV-2 से HV-1 में
            चला जाता है।
          </p>
        </section>

        <section aria-labelledby="lmv1-vs-lmv2" className="mt-10 scroll-mt-20">
          <h2 id="lmv1-vs-lmv2" className={h2Cls}>
            LMV-1 बनाम LMV-2: आप पर कौन सा लागू होता है?
          </h2>
          <p className={pCls}>
            LMV-1 तब लागू होता है जब कनेक्शन घरेलू उद्देश्य के लिए इस्तेमाल होता है, और LMV-2 तब
            जब गैर-घरेलू उद्देश्य के लिए। LMV-1 शेड्यूल के दो नियम मिले-जुले मामलों का फैसला करते
            हैं।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">छोटे लोड पर कारोबार:</strong> 50 kW से कम पर,
              अगर लोड का कोई हिस्सा गैर-घरेलू कारोबार में इस्तेमाल होता है, तो पूरी खपत उस
              गैर-घरेलू इस्तेमाल के शेड्यूल के तहत बिल होती है, इलेक्ट्रिसिटी सप्लाई कोड के अपवाद
              को छोड़कर।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">हाउसिंग सोसाइटी:</strong> 50 kW और उससे ऊपर,
              सिंगल-पॉइंट सप्लाई वाली पंजीकृत सोसाइटी और बहुमंज़िला इमारतें LMV-1 में रहती हैं
              अगर अनुबंधित लोड का कम से कम 70% घरेलू लाइट, फैन और पावर के लिए हो।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">लाइफलाइन उपभोक्ता:</strong> 1 kW लोड और महीने में
              100 यूनिट तक इस्तेमाल वाले ग्रामीण उपभोक्ता राज्य की सब्सिडी के बाद ₹50 प्रति kW और
              ₹3.00 प्रति यूनिट चुकाते हैं।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            शहरी LMV-1 की स्लैब दरें और बिल का उदाहरण हमारी{' '}
            <Link href="/hi/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL बिल गाइड
            </Link>{' '}
            में हैं, और आप अपनी यूनिट{' '}
            <Link href="/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL बिल कैलकुलेटर
            </Link>{' '}
            (अंग्रेज़ी में) में डालकर देख सकते हैं।
          </p>
          <p className={takeawayCls}>
            सार: घर के कनेक्शन से दुकान चलाने पर पूरा बिल LMV-1 से बाहर जा सकता है।
          </p>
        </section>

        <section aria-labelledby="lmv11" className="mt-10 scroll-mt-20">
          <h2 id="lmv11" className={h2Cls}>
            इलेक्ट्रिक व्हीकल चार्जिंग के लिए LMV-11 क्या है?
          </h2>
          <p className={pCls}>
            LMV-11 UPPCL का इलेक्ट्रिक व्हीकल चार्जिंग का शेड्यूल है, जिसमें अलग चार्जिंग
            कनेक्शनों के लिए एक समान एनर्जी चार्ज है और कोई डिमांड चार्ज नहीं। तालिका में चारों
            दरें हैं।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">UPPCL LMV-11 EV चार्जिंग के एनर्जी चार्ज</caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">कनेक्शन</th>
                  <th className="px-4 py-2 font-semibold">एनर्जी चार्ज</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {evRows.map(([conn, rate]) => (
                  <tr key={conn}>
                    <td className="px-4 py-2 font-medium">{conn}</td>
                    <td className="px-4 py-2 tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            LMV-1 वाला घर अपनी गाड़ी मौजूदा कनेक्शन पर घरेलू दर से चार्ज करता है; शेड्यूल ऐसे
            उपभोक्ताओं को मौजूदा कनेक्शन इस्तेमाल करने और ज़रूरत पड़ने पर स्वीकृत लोड बढ़वाने को
            कहता है। हमारा{' '}
            <Link href="/hi/electricity/ev-charging-cost-calculator" className="text-brass underline">
              EV चार्जिंग कॉस्ट कैलकुलेटर
            </Link>{' '}
            हर चार्ज की लागत निकालता है।
          </p>
          <p className={takeawayCls}>
            सार: LMV-11 अलग चार्जिंग कनेक्शनों के लिए है; घर पर चार्जिंग LMV-1 पर ही रहती है।
          </p>
        </section>

        <section aria-labelledby="find" className="mt-10 scroll-mt-20">
          <h2 id="find" className={h2Cls}>
            UPPCL बिल पर अपनी LMV कैटेगरी कैसे ढूंढें
          </h2>
          <p className={pCls}>
            अपनी LMV कैटेगरी ढूंढने के लिए अपने UPPCL बिल पर टैरिफ या सप्लाई टाइप वाला खाना पढ़ें।
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>सबसे पहले अपना ताज़ा बिल खोलें, कागज़ पर या UPPCL के उपभोक्ता पोर्टल से।</li>
            <li>फिर टैरिफ, कैटेगरी या सप्लाई टाइप लिखा हुआ खाना देखें।</li>
            <li>इसके बाद उस कोड, जैसे LMV-1 या LMV-2, को ऊपर की तालिकाओं से मिलाएं।</li>
            <li>अंत में, अगर कोड आपके कनेक्शन के इस्तेमाल से मेल नहीं खाता, तो अपने वितरण कार्यालय से उसे ठीक करवाएं।</li>
          </ol>
          <p className={`mt-4 ${pCls}`}>
            ये शेड्यूल FY 2025-26 के रिटेल टैरिफ से हैं, और Power Peak Digest की रिपोर्ट के
            अनुसार UPERC ने FY 2026-27 के लिए टैरिफ नहीं बदले। LMV-1 घरेलू लाइट, फैन और पावर का
            शेड्यूल बना हुआ है।
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            अपने UPPCL बिल का अनुमान लगाएं
          </h2>
          <p className={`mt-2 ${pCls}`}>
            अपना कनेक्शन टाइप चुनें और यूनिट डालें, और प्रकाशित स्लैब पर बिल देखें।
          </p>
          <Link
            href="/electricity/uppcl-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            UPPCL बिल कैलकुलेटर खोलें →
          </Link>
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
          अंतिम अपडेट: {LAST_UPDATED}। शेड्यूल के शीर्षक, लागू होने के नियम, लाइफलाइन दर और
          LMV-11 के चार्ज उत्तर प्रदेश विद्युत नियामक आयोग के UPPCL वितरण कंपनियों के टैरिफ ऑर्डर
          के &ldquo;Retail Tariffs for Financial Year 2025-26&rdquo; परिशिष्ट से हैं। वह ऑर्डर LMV
          का पूरा रूप नहीं लिखता; &ldquo;लो एंड मीडियम वोल्टेज&rdquo; इसका प्रचलित अर्थ है। हम
          आंकड़े कैसे जुटाते और जांचते हैं, इसके लिए हमारी{' '}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
