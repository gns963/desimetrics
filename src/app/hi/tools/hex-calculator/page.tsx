import type { Metadata } from 'next'
import Link from 'next/link'
import HexCalculator, { type HexCalculatorTexts } from '@/components/calculators/HexCalculator'
import PageHero from '@/components/PageHero'
import { calculateHexOperation, convertHex } from '@/lib/calc/hex'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/tools/hex-calculator'

const addEx = calculateHexOperation('47', '1A', 'add')
const subEx = calculateHexOperation('FF', '0F', 'subtract')
const mulEx = calculateHexOperation('A', 'B', 'multiply')
const divEx = calculateHexOperation('64', '0A', 'divide')
const convEx = convertHex('FF')

const hexCalculatorTextsHi: HexCalculatorTexts = {
  title: 'हेक्साडेसिमल कैलकुलेटर',
  subtitle: 'दो हेक्स नंबर जोड़ें, घटाएं, गुणा या भाग करें — किसी भी साइज़ के लिए बिल्कुल सटीक',
  firstLabel: 'पहला हेक्स नंबर',
  secondLabel: 'दूसरा हेक्स नंबर',
  operationLabel: 'ऑपरेशन',
  operations: { add: 'जोड़ (+)', subtract: 'घटाव (−)', multiply: 'गुणा (×)', divide: 'भाग (÷)' },
  resultLabel: 'नतीजा',
  quotientLabel: 'भागफल',
  remainderLabel: 'शेषफल',
  decimalEquivalentLabel: 'दशमलव समतुल्य',
  disclaimer: '0x प्रीफिक्स के साथ या बिना डालें — सिर्फ 0-9 और A-F मान्य हैं।',
}

export const metadata: Metadata = {
  title: 'हेक्साडेसिमल कैलकुलेटर — हेक्स जोड़, घटाव, गुणा, भाग',
  description:
    'मुफ्त हेक्साडेसिमल कैलकुलेटर: दो हेक्स नंबर को किसी भी साइज़ के लिए बिल्कुल सटीक जोड़ें, घटाएं, गुणा या भाग करें, साथ में दशमलव/बाइनरी/ऑक्टल कन्वर्ज़न भी देखें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'हेक्साडेसिमल कैलकुलेटर',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'टूल्स', path: '/tools' },
  { name: 'हेक्साडेसिमल कैलकुलेटर', path: PATH },
])

const faqs = [
  {
    q: 'हेक्साडेसिमल नंबर क्या है?',
    a: 'बेस 16 में लिखा गया एक नंबर, जो सोलह अंक इस्तेमाल करता है: पहले दस मानों के लिए 0-9, फिर दस, ग्यारह, बारह, तेरह, चौदह और पंद्रह के लिए A-F। हर पोज़िशन अपने दाईं ओर वाली पोज़िशन से 16 गुना ज़्यादा वज़न रखती है — ठीक वैसे ही जैसे दशमलव में हर पोज़िशन अपने दाईं ओर वाली से 10 गुना ज़्यादा वज़न रखती है।',
  },
  {
    q: 'कंप्यूटिंग बाइनरी की बजाय हेक्साडेसिमल क्यों इस्तेमाल करती है?',
    a: 'हेक्स बाइनरी का एक सुविधाजनक शॉर्टहैंड है: ठीक चार बाइनरी अंक एक हेक्स अंक के बराबर होते हैं (0000-1111 बन जाता है 0-F), इसलिए एक लंबी बाइनरी स्ट्रिंग बिना कोई जानकारी खोए और बिना कोई अंकगणित किए एक बहुत छोटी हेक्स स्ट्रिंग बन जाती है — बस बिट्स को चार-चार में गिनें और हर ग्रुप को देख लें।',
  },
  {
    q: 'हाथ से हेक्स को दशमलव में कैसे बदलें?',
    a: `हर अंक को उसकी पोज़िशन (दाईं ओर से 0 गिनते हुए) के हिसाब से 16 की घात से गुणा करें और नतीजे जोड़ें। उदाहरण के लिए ${convEx.hex} = ${convEx.hex[0]}×16¹ + ${convEx.hex[1]}×16⁰ = ${parseInt(convEx.hex[0], 16) * 16} + ${parseInt(convEx.hex[1], 16)} = ${convEx.decimal}।`,
  },
  {
    q: 'क्या हेक्साडेसिमल नंबर निगेटिव हो सकते हैं?',
    a: 'हां, सामान्य अंकगणित में (जैसे इस कैलकुलेटर का घटाव) नतीजा निगेटिव आ सकता है, जिसे आगे माइनस साइन के साथ दिखाया जाता है। कंप्यूटर खुद आमतौर पर निगेटिव नंबर को अलग तरीके से दिखाते हैं (टू\'ज़ कॉम्प्लीमेंट, एक तय बिट-विड्थ के साथ) बजाय सीधे माइनस साइन के — यह कैलकुलेटर आसान साइन्ड-मैग्निट्यूड रूप इस्तेमाल करता है क्योंकि यह किसी तय बिट-विड्थ से बंधा नहीं है।',
  },
  {
    q: 'क्या इस कैलकुलेटर में हेक्स नंबर की कोई साइज़ सीमा है?',
    a: 'कोई व्यावहारिक सीमा नहीं — यह अंदरूनी तौर पर आर्बिट्रेरी-प्रिसिज़न अंकगणित इस्तेमाल करता है, इसलिए 50-अंकों वाला हेक्स नंबर ठीक उतना ही सटीक है जितना 2-अंकों वाला। सामान्य कैलकुलेटर ऐप्स जो स्टैंडर्ड फ्लोटिंग-पॉइंट नंबर इस्तेमाल करते हैं, वे लगभग 15-16 दशमलव अंकों के बाद चुपचाप प्रिसिज़न खो देते हैं — यह नहीं खोता।',
  },
  {
    q: 'भाग दशमलव बिंदु की बजाय शेषफल क्यों दिखाता है?',
    a: 'हेक्साडेसिमल में भिन्नात्मक हिस्सा लिखने का कोई एक सहमत तरीका नहीं है जैसे दशमलव में दशमलव बिंदु होता है, इसलिए हेक्स कैलकुलेटर पारंपरिक रूप से एक पूर्णांक भागफल और शेषफल दिखाते हैं — ठीक वैसे जैसे स्कूल में भिन्न पढ़ाए जाने से पहले आपको लंबा भाग सिखाया गया था।',
  },
  {
    q: '0x प्रीफिक्स का क्या मतलब है?',
    a: '0x वह स्टैंडर्ड प्रीफिक्स है जो प्रोग्रामिंग भाषाएं किसी मान को दशमलव की बजाय हेक्साडेसिमल के रूप में चिह्नित करने के लिए इस्तेमाल करती हैं — उदाहरण के लिए 0x1A का मतलब है हेक्स 1A (दशमलव में 26), न कि नंबर 1 के बाद A। यह कैलकुलेटर प्रीफिक्स के साथ या बिना, दोनों तरह का इनपुट स्वीकार करता है।',
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

const h2Cls = 'font-display mb-4 text-2xl font-semibold text-ink-navy'
const pCls = 'text-ash/80'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

export default function HexCalculatorPageHi() {
  return (
    <>
      <PageHero
        hub="tools"
        breadcrumb={[
          { label: 'टूल्स', href: '/hi/tools' },
          { label: 'हेक्साडेसिमल कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔢</span> टूल्स हब
          </>
        }
        h1="हेक्साडेसिमल कैलकुलेटर"
        subtitle={
          <>
            दो हेक्स नंबर जोड़ें, घटाएं, गुणा या भाग करें —{' '}
            <strong>किसी भी साइज़ के लिए बिल्कुल सटीक</strong>, साथ में
            दशमलव, बाइनरी और ऑक्टल समतुल्य भी दिखाए जाते हैं।
          </>
        }
        stats={[
          { icon: '🎯', big: 'सटीक', small: 'कोई राउंडिंग नहीं', tone: 'hub' },
          { icon: '➗', big: '4', small: 'ऑपरेशन', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'कोई लॉगिन नहीं', tone: 'hub' },
          { icon: '🔒', big: 'क्लाइंट-साइड', small: 'कुछ सेव नहीं होता', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
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
            हेक्साडेसिमल में <strong>{addEx.aHex} + {addEx.bHex}</strong> है{' '}
            <strong>{addEx.resultHex}</strong> — वही जोड़ जो दशमलव में{' '}
            {addEx.aDec} + {addEx.bDec} = {addEx.resultDec} होता है, बस बेस
            16 में लिखा हुआ।
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className={h2Cls}>
            गणना करें
          </h2>
          <HexCalculator texts={hexCalculatorTextsHi} />
        </section>

        <section aria-labelledby="what-is-hex" className="mt-10 scroll-mt-20">
          <h2 id="what-is-hex" className={h2Cls}>
            हेक्साडेसिमल सिस्टम क्या है?
          </h2>
          <p className={pCls}>
            हेक्साडेसिमल (छोटे में &ldquo;हेक्स&rdquo;) एक बेस-16 नंबर सिस्टम
            है — यह हर अंक के लिए दस (0-9) की बजाय सोलह प्रतीक इस्तेमाल करता
            है। चूंकि दस से पंद्रह तक के लिए कोई अकेला अंक नहीं है, हेक्स
            अक्षर A से F उधार लेता है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">हेक्स अंक</th>
                  <th className="px-4 py-2 text-right font-semibold">दशमलव मान</th>
                  <th className="px-4 py-2 text-right font-semibold">4-बिट बाइनरी</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {Array.from({ length: 16 }, (_, i) => i).map((i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 font-mono font-medium">
                      {i.toString(16).toUpperCase()}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">{i}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums">
                      {i.toString(2).padStart(4, '0')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            वह तीसरा कॉलम ही कंप्यूटिंग में हेक्स के मौजूद होने की असली वजह
            है: हर हेक्स अंक बिना कुछ बचाए ठीक चार बाइनरी अंकों से मेल खाता
            है। एक बाइट (8 बिट) हमेशा बिल्कुल दो हेक्स अंक होती है — यही वजह
            है कि प्रोग्रामिंग और नेटवर्किंग में &ldquo;FF&rdquo; या
            &ldquo;0A&rdquo; जैसे हेक्स जोड़े लगातार दिखते हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: हेक्स दशमलव का कोई मनमाना विकल्प नहीं है — यह खासतौर पर
            बाइनरी के लिए एक कॉम्पैक्ट, सटीक शॉर्टहैंड है।
          </p>
        </section>

        <section aria-labelledby="addition" className="mt-10 scroll-mt-20">
          <h2 id="addition" className={h2Cls}>
            हेक्साडेसिमल जोड़ समझाया गया
          </h2>
          <p className={pCls}>
            हेक्स जोड़ बिल्कुल दशमलव जोड़ की तरह काम करता है — दाईं ओर से हर
            कॉलम जोड़ें, और जब भी किसी कॉलम का योग 16 तक पहुंचे (10 नहीं,
            क्योंकि यह बेस 16 है) तो अगले कॉलम में कैरी करें।
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {addEx.aHex} + {addEx.bHex}
            </p>
            <ul className="mt-2 space-y-1 text-ash/70">
              <li>
                सबसे दाईं कॉलम: {addEx.aHex.slice(-1)} + {addEx.bHex.slice(-1)} = {(
                  parseInt(addEx.aHex.slice(-1), 16) + parseInt(addEx.bHex.slice(-1), 16)
                ).toString(16).toUpperCase()}{' '}
                — कोई कैरी नहीं चाहिए, क्योंकि यह 16 (हेक्स में 10) से कम है।
              </li>
              <li>
                अगली कॉलम: {addEx.aHex.slice(0, -1) || '0'} + {addEx.bHex.slice(0, -1) || '0'} = {(
                  parseInt(addEx.aHex.slice(0, -1) || '0', 16) +
                  parseInt(addEx.bHex.slice(0, -1) || '0', 16)
                ).toString(16).toUpperCase()}
              </li>
              <li className="font-semibold text-ink-navy">नतीजा: {addEx.resultHex}</li>
            </ul>
          </div>
          <p className={`mt-3 ${pCls}`}>
            एक आदत बनाने लायक: जब भी किसी कॉलम का योग 16 या ज़्यादा हो, बचा
            हुआ (योग − 16) लिखें और अगली कॉलम में 1 कैरी करें — बिल्कुल वैसे
            ही जैसे दशमलव जोड़ में किसी कॉलम के 9 पार करने पर 1 कैरी किया
            जाता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: दशमलव और हेक्स जोड़ के बीच सिर्फ कैरी नियम बदलता है —
            कॉलम-दर-कॉलम तरीका बिल्कुल एक जैसा है।
          </p>
        </section>

        <section aria-labelledby="subtraction" className="mt-10 scroll-mt-20">
          <h2 id="subtraction" className={h2Cls}>
            हेक्साडेसिमल घटाव समझाया गया
          </h2>
          <p className={pCls}>
            घटाव भी उसी तरह काम करता है, पर जब भी किसी कॉलम का ऊपरी अंक नीचे
            वाले से छोटा हो, तो अगली कॉलम से 16 (10 नहीं) उधार लेता है।
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {subEx.aHex} − {subEx.bHex}
            </p>
            <ul className="mt-2 space-y-1 text-ash/70">
              <li>
                सबसे दाईं कॉलम: {subEx.aHex.slice(-1)} − {subEx.bHex.slice(-1)} = {(
                  parseInt(subEx.aHex.slice(-1), 16) - parseInt(subEx.bHex.slice(-1), 16)
                ).toString(16).toUpperCase()}
              </li>
              <li>
                अगली कॉलम: {subEx.aHex.slice(0, -1) || '0'} − {subEx.bHex.slice(0, -1) || '0'} = {(
                  parseInt(subEx.aHex.slice(0, -1) || '0', 16) -
                  parseInt(subEx.bHex.slice(0, -1) || '0', 16)
                ).toString(16).toUpperCase()}
              </li>
              <li className="font-semibold text-ink-navy">नतीजा: {subEx.resultHex}</li>
            </ul>
          </div>
          <p className={`mt-3 ${pCls}`}>
            अगर पहला नंबर दूसरे से छोटा हो, तो नतीजा निगेटिव आता है — ऊपर का
            कैलकुलेटर इसे आगे माइनस साइन के साथ दिखाता है (जैसे {subEx.aHex}{' '}
            से {subEx.bHex} को उल्टे क्रम में घटाने पर −{subEx.resultHex}{' '}
            आता है)।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: हेक्स में उधार लेने पर अगली कॉलम से 1 कम होता है और
            मौजूदा कॉलम में 16 (10 नहीं) जुड़ता है।
          </p>
        </section>

        <section aria-labelledby="multiplication" className="mt-10 scroll-mt-20">
          <h2 id="multiplication" className={h2Cls}>
            हेक्साडेसिमल गुणा समझाया गया
          </h2>
          <p className={pCls}>
            एक-अंक की हेक्स गुणा ही वह कदम है जिसके लिए सच में पहाड़ा याद
            रखना (या देखना) पड़ता है, क्योंकि हेक्स गुणा-तालिका 9×9 की बजाय
            F×F तक जाती है:
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {mulEx.aHex} × {mulEx.bHex} = {mulEx.resultHex} (दशमलव में{' '}
              {mulEx.aDec} × {mulEx.bDec} = {mulEx.resultDec})
            </p>
          </div>
          <p className={`mt-3 ${pCls}`}>
            कई अंकों वाले नंबरों के लिए, तरीका वही लंबी-गुणा ग्रिड है जो
            दशमलव के लिए सिखाई जाती है — दूसरे नंबर के हर अंक से अलग-अलग गुणा
            करें, हर आंशिक नतीजे को एक कॉलम बाईं ओर शिफ्ट करें, और उन्हें
            जोड़ें — सिर्फ प्रति-अंक गुणा-तालिका बदलती है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: कई अंकों वाला हेक्स गुणा, बेस-10 की बजाय बेस-16 वाली
            गुणा-तालिका के साथ सामान्य लंबी गुणा ही है।
          </p>
        </section>

        <section aria-labelledby="division" className="mt-10 scroll-mt-20">
          <h2 id="division" className={h2Cls}>
            हेक्साडेसिमल भाग समझाया गया
          </h2>
          <p className={pCls}>
            भाग एक पूर्णांक भागफल और एक शेषफल देता है, ठीक वैसे जैसे भिन्न
            सिखाए जाने से पहले दशमलव में लंबा भाग देता है:
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {divEx.aHex} ÷ {divEx.bHex} = {divEx.resultHex} शेषफल{' '}
              {divEx.remainderHex}
            </p>
            <p className="mt-1 text-ash/70">
              जांच: {divEx.resultHex} × {divEx.bHex} + {divEx.remainderHex} ={' '}
              {divEx.aHex}
            </p>
          </div>
          <p className={`mt-3 ${pCls}`}>
            भिन्नात्मक हेक्स नतीजा लिखने का कोई एक सार्वभौमिक स्टैंडर्ड तरीका
            नहीं है, यही वजह है कि यह कैलकुलेटर — ज़्यादातर हेक्स कैलकुलेटर
            की तरह — दशमलव बिंदु से आगे बढ़ने की बजाय पूर्णांक भागफल और
            शेषफल पर रुक जाता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: हेक्स भाग का नतीजा एक भागफल और शेषफल होता है, दशमलव
            जैसा भिन्न नहीं।
          </p>
        </section>

        <section aria-labelledby="conversions" className="mt-10 scroll-mt-20">
          <h2 id="conversions" className={h2Cls}>
            हेक्स, दशमलव, बाइनरी और ऑक्टल के बीच कन्वर्ज़न
          </h2>
          <p className={pCls}>
            हर पूर्णांक का हर बेस में एक सटीक प्रतिनिधित्व होता है — कन्वर्ट
            करने से सिर्फ इसे लिखने का तरीका बदलता है, इसका मान कभी नहीं।
            एक उदाहरण, हेक्स में {convEx.hex}, चारों में दिखाया गया:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">बेस</th>
                  <th className="px-4 py-2 text-right font-semibold">मान</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">हेक्साडेसिमल (बेस 16)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.hex}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">दशमलव (बेस 10)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.decimal}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">बाइनरी (बेस 2)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.binary}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">ऑक्टल (बेस 8)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.octal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: इनमें से कोई भी बेस दूसरे से ज़्यादा &ldquo;सही&rdquo;
            नहीं है — ये एक ही मात्रा को लिखने के अलग-अलग तरीके हैं।
          </p>
        </section>

        <section aria-labelledby="practical-uses" className="mt-10 scroll-mt-20">
          <h2 id="practical-uses" className={h2Cls}>
            हेक्साडेसिमल असल में कहां दिखता है
          </h2>
          <ul className="mt-3 space-y-2 text-ash/80">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">वेब कलर</strong> —{' '}
                <code className="font-mono">#FF5733</code> जैसा कलर तीन हेक्स
                बाइट-जोड़े हैं: FF (लाल), 57 (हरा), 33 (नीला), हर एक 00 से FF
                तक (दशमलव में 0-255)।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">मेमोरी एड्रेस</strong> —
                डीबगर और क्रैश लॉग मेमोरी लोकेशन हेक्स में दिखाते हैं (जैसे{' '}
                <code className="font-mono">0x7FFE1234</code>) क्योंकि यह
                एक बड़े बाइनरी एड्रेस को लिखने का कहीं छोटा, सटीक तरीका है।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">MAC एड्रेस</strong> — किसी
                नेटवर्क डिवाइस का हार्डवेयर एड्रेस परंपरागत रूप से कोलन से
                अलग किए गए छह हेक्स बाइट-जोड़ों में लिखा जाता है।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">यूनिकोड कोड पॉइंट</strong>{' '}
                — करैक्टर एक हेक्स नंबर से पहचाने जाते हैं (जैसे 😀 के लिए
                U+1F600), क्योंकि शामिल रेंज बड़ी है और बाइनरी पढ़ने में
                मुश्किल होती।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">फाइल और एरर कोड</strong> —
                कई फाइल-फॉर्मैट सिग्नेचर और सिस्टम एरर कोड इसी कॉम्पैक्ट,
                सटीक-बाइनरी वजह से हेक्स में डॉक्यूमेंट और दिखाए जाते हैं।
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: हेक्स कंप्यूटिंग में इसलिए बना हुआ है क्योंकि यह
            बाइनरी लिखने का एक लॉसलेस, कॉम्पैक्ट तरीका है — किसी आदत की वजह
            से नहीं।
          </p>
        </section>

        <section aria-labelledby="mistakes" className="mt-10 scroll-mt-20">
          <h2 id="mistakes" className={h2Cls}>
            जांचने लायक गलतियां
          </h2>
          <ul className="mt-3 space-y-2 text-ash/80">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">अक्षर O बनाम अंक 0</strong>{' '}
                — हेक्स सिर्फ अंक 0 इस्तेमाल करता है, अक्षर O कभी नहीं। कहीं
                से कॉपी किया गया मान जिसमें एक की जगह दूसरा आ गया हो, पार्स
                नहीं होगा।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">हेक्स अंकों को दशमलव मान लेना</strong>{' '}
                — हेक्स में &ldquo;10&rdquo; का मतलब सोलह है, दस नहीं। हमेशा
                ध्यान रखें कि कोई नंबर किस बेस में लिखा है, बजाय दशमलव मान
                लेने के।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">भाग से भिन्नात्मक नतीजे की उम्मीद करना</strong>{' '}
                — जैसा ऊपर बताया गया, यह कैलकुलेटर (ज़्यादातर की तरह) भाग के
                लिए भागफल और शेषफल देता है, दशमलव-बिंदु वाला भिन्न नहीं।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">निगेटिव के लिए तय बिट-विड्थ भूल जाना</strong>{' '}
                — यह कैलकुलेटर निगेटिव घटाव नतीजे को सीधे माइनस साइन के साथ
                दिखाता है; कोई खास प्रोग्रामिंग भाषा या CPU रजिस्टर इसके
                बजाय अपनी तय विड्थ में टू&apos;ज़ कॉम्प्लीमेंट इस्तेमाल करके
                इसे रैप करेगा, जो एक अलग (बड़ा, पॉज़िटिव) हेक्स मान जैसा
                दिख सकता है।
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: ज़्यादातर हेक्स गलतियां पढ़ने की गलतियां हैं, अंकगणित
            की नहीं — दोबारा जांचें कि आप किस बेस को देख रहे हैं।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            इस हब से और भी
          </h2>
          <Link
            href="/hi/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-paper px-5 py-3 text-sm font-semibold text-hub-tools transition hover:border-hub-tools/50 hover:shadow-sm"
          >
            <span aria-hidden>🔢</span> सभी नंबर और कन्वर्ज़न टूल्स देखें →
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
