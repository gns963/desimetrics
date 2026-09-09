import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/mahavitaran-bill-kaise-check-kare'
const TITLE = 'महावितरण बिल: अपना MSEDCL बिल ऑनलाइन कैसे जांचें और चुकाएं'
const DESCRIPTION =
  'महावितरण और MSEDCL एक ही कंपनी हैं। जानें अपना बिल कैसे जांचें, ऑनलाइन कैसे चुकाएं, अपना कंज़्यूमर नंबर कैसे खोजें, और आपका बिल सामान्य से ज़्यादा क्यों हो सकता है।'
const LAST_VERIFIED = '4 सितंबर 2026'

export const metadata: Metadata = {
  title: 'महावितरण बिल: अपना MSEDCL बिल ऑनलाइन जांचें और चुकाएं (2026)',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/blog/mahavitaran-bill-kaise-check-kare'),
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

const faqs = [
  {
    q: 'क्या महावितरण और MSEDCL एक ही कंपनी हैं?',
    a: 'हां। "महावितरण" बस वह आम नाम है जो लोग MSEDCL — महाराष्ट्र स्टेट इलेक्ट्रिसिटी डिस्ट्रिब्यूशन कं. लिमिटेड — के लिए इस्तेमाल करते हैं, जो महाराष्ट्र के ज़्यादातर हिस्से में बिजली सप्लाई करने वाली पूरी तरह सरकारी उपयोगिता है। ये दो अलग कंपनियां नहीं हैं; हर महावितरण बिल एक MSEDCL बिल है।',
  },
  {
    q: 'मैं अपना महावितरण बिल ऑनलाइन कैसे जांचूं?',
    a: 'आधिकारिक पोर्टल mahadiscom.in पर जाएं और अपने कंज़्यूमर नंबर का इस्तेमाल करके बिल देखने और चुकाने के लिए वेब सेल्फ सर्विस (WSS) / कंज़्यूमर पोर्टल सेक्शन इस्तेमाल करें। आप इसे आधिकारिक महावितरण कंज़्यूमर ऐप के ज़रिए भी जांच सकते हैं, बिना रजिस्टर किए गेस्ट के तौर पर भी।',
  },
  {
    q: 'मैं अपना महावितरण बिल कैसे चुकाऊं?',
    a: 'mahadiscom.in या महावितरण ऐप पर अपना बिल ढूंढ लेने के बाद, आप UPI, डेबिट या क्रेडिट कार्ड, नेट बैंकिंग, या किसी सपोर्टेड ई-वॉलेट से चुका सकते हैं — वेबसाइट और ऐप दोनों पर आम तौर पर वही पेमेंट विकल्प उपलब्ध हैं।',
  },
  {
    q: 'मुझे अपना महावितरण कंज़्यूमर नंबर कहां मिलेगा?',
    a: 'आपका कंज़्यूमर नंबर किसी भी पिछले MSEDCL/महावितरण बिल पर छपा होता है, आम तौर पर 12-अंकों की संख्या के रूप में। कुछ पोर्टल फ्लो आपसे आपका कंज़्यूमर टाइप और एक बिलिंग यूनिट (BU) कोड भी मांगते हैं, जो आपके स्थानीय सर्कल की पहचान करता है — ये दोनों भी आपके पेपर या PDF बिल पर मिलते हैं।',
  },
  {
    q: 'क्या महावितरण (MSEDCL) मुंबई में बिजली सप्लाई करती है?',
    a: 'नहीं, मुंबई शहर के अंदर नहीं। MSEDCL/महावितरण ज़्यादातर महाराष्ट्र को कवर करती है, लेकिन मुंबई शहर को अलग से अदानी इलेक्ट्रिसिटी, टाटा पावर, और BEST क्षेत्र के हिसाब से सप्लाई करते हैं। अगर आप मुंबई शहर में हैं और महावितरण बिल खोज रहे हैं, तो बहुत संभावना है कि आप असल में इन तीनों में से किसी एक पर हैं।',
  },
  {
    q: 'मेरा महावितरण बिल सामान्य से ज़्यादा क्यों है?',
    a: 'MSEDCL टेलिस्कोपिक स्लैब का इस्तेमाल करके बिजली बिल करता है, जहां ज़्यादा इस्तेमाल आपके ज़्यादा इस्तेमाल को महंगी दर वाले बैंड में धकेलता है — इसलिए इस्तेमाल की गई यूनिट्स में एक असली बढ़ोतरी आपके बिल को अनुपात से ज़्यादा बढ़ा सकती है। अंदाज़ा लगाने की बजाय एक कैलकुलेटर का इस्तेमाल करके अपनी असली यूनिट्स को MSEDCL की असली स्लैब संरचना के मुकाबले जांचें।',
  },
  {
    q: 'मैं अपना महावितरण बिल भुगतान इतिहास कैसे जांचूं?',
    a: 'आपका पेमेंट और बिल इतिहास mahadiscom.in पर वेब सेल्फ सर्विस पोर्टल या महावितरण कंज़्यूमर ऐप में अपने कंज़्यूमर नंबर से लॉगिन करने के बाद उपलब्ध होता है। बीते कितने महीने दिखाए जाते हैं यह अलग-अलग हो सकता है, इसलिए एक तय विंडो मान लेने की बजाय अपने खुद के अकाउंट में जो मौजूद है वह जांचें।',
  },
  {
    q: 'क्या मैं बिना अकाउंट बनाए अपना महावितरण बिल चुका सकता हूं?',
    a: 'हां — आधिकारिक महावितरण कंज़्यूमर ऐप एक गेस्ट लॉगिन सपोर्ट करता है जो आपको सिर्फ अपने कंज़्यूमर नंबर से, बिना अकाउंट रजिस्टर किए, बिल देखने और चुकाने देता है। वेबसाइट पोर्टल भी एक समान क्विक-पे विकल्प दे सकता है; मौजूदा उपलब्धता के लिए mahadiscom.in जांचें।',
  },
  {
    q: 'मैं महावितरण के साथ शिकायत कैसे दर्ज करूं?',
    a: 'शिकायतें आम तौर पर महावितरण कंज़्यूमर ऐप या mahadiscom.in पोर्टल के ज़रिए दर्ज और ट्रैक की जा सकती हैं। बिलिंग राशि को लेकर एक शिकायत दर्ज करने से पहले, पहले अपने इस्तेमाल को MSEDCL की असली स्लैब दरों के मुकाबले जांचना मददगार होता है, क्योंकि इस्तेमाल में उछाल ज़्यादा बिल की एक आम, गैर-गलती वाली वजह है।',
  },
  {
    q: 'क्या महावितरण ऐप अंग्रेज़ी के अलावा दूसरी भाषाओं में भी उपलब्ध है?',
    a: 'हां — आधिकारिक महावितरण कंज़्यूमर ऐप अंग्रेज़ी और मराठी दोनों में उपलब्ध है, जो एक वजह है कि यह कई उपयोगकर्ताओं के लिए वेबसाइट पोर्टल के मुकाबले अक्सर आसान विकल्प होता है।',
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

const slabIllustration = [
  { band: '~100 यूनिट तक', effect: 'सबसे कम स्लैब दर पर बिल होती है — सबसे कम प्रति-यूनिट लागत' },
  { band: '100–300 यूनिट', effect: '100 यूनिट से ऊपर का इस्तेमाल एक ऊंचे स्लैब में शिफ्ट होता है, जिससे पूरे बिल की औसत प्रति-यूनिट लागत बढ़ जाती है' },
  { band: '300+ यूनिट', effect: 'ऊंचे बैंड अतिरिक्त यूनिट्स पर लागू होते हैं — आम तौर पर यहीं से "मेरा बिल अचानक इतना ज़्यादा क्यों है" वाले हैरानी भरे मामले आते हैं' },
]

export default function MahavitaranBillGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'महावितरण बिल', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⚡</span> How-to guide
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
          · आखिरी बार सत्यापित {LAST_VERIFIED}
        </p>
        <p className="mt-1 text-xs text-caution-amber">
          पोर्टल के स्टेप्स, ऐप की स्क्रीन और मौजूदा कस्टमर-केयर नंबर इस
          लेख के सबसे तेज़ी से बदलने वाले ब्यौरे हैं — इन पर भरोसा करने या
          किसी भी भविष्य के एडिट से पहले mahadiscom.in से इन्हें फिर जांच
          लें।
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>महावितरण</strong> और <strong>MSEDCL</strong> (महाराष्ट्र
          स्टेट इलेक्ट्रिसिटी डिस्ट्रिब्यूशन कं. लिमिटेड){' '}
          <strong>एक ही कंपनी</strong> हैं — महावितरण बस वह आम नाम है जो
          लोग इसके लिए इस्तेमाल करते हैं। यह पूरी तरह सरकारी उपयोगिता
          महाराष्ट्र के ज़्यादातर हिस्से में बिजली सप्लाई करती है, एक बड़े
          अपवाद के साथ:{' '}
          <strong>मुंबई शहर खुद महावितरण द्वारा सर्व नहीं किया जाता</strong>{' '}
          — इसे अलग से अदानी इलेक्ट्रिसिटी, टाटा पावर और BEST कवर करते हैं।
          यह गाइड बताती है कि अपना बिल कैसे जांचें, ऑनलाइन कैसे चुकाएं, और
          अगर यह अपेक्षा से ज़्यादा लगे तो क्या करें।
        </p>

        <section aria-labelledby="what-is" className="mt-10 scroll-mt-20">
          <h2 id="what-is" className={h2Cls}>
            महावितरण क्या है, और यह असल में कहां काम करती है?
          </h2>
          <p className={pCls}>
            महावितरण भारत की सबसे बड़ी बिजली वितरण उपयोगिताओं में से एक है
            (सटीक रैंकिंग पर स्रोत अलग-अलग हैं, इसलिए हम यहां एक खास नंबर
            एक या दो होने का दावा नहीं करेंगे), पूरी तरह महाराष्ट्र सरकार
            की मालिकाना है। यह राज्य के बड़े हिस्से को बिल और बिजली सप्लाई
            करती है — लेकिन मुंबई शहर को नहीं, जिसकी अपनी अलग डिस्ट्रिब्यूशन
            कंपनियां हैं।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">क्षेत्र</th>
                  <th className="px-4 py-2 font-semibold">वहां असल में बिजली कौन सप्लाई करता है</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">बाकी महाराष्ट्र</td>
                  <td className="px-4 py-2">MSEDCL / महावितरण</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">मुंबई शहर</td>
                  <td className="px-4 py-2">अदानी इलेक्ट्रिसिटी, टाटा पावर, या BEST — आपके खास क्षेत्र पर निर्भर</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आप मुंबई शहर में रहते हैं और महावितरण के तहत अपना
            कनेक्शन नहीं खोज पा रहे, तो यह अपेक्षित है — आप बहुत संभावना से
            पूरी तरह एक अलग DISCOM पर हैं।
          </p>
        </section>

        <section aria-labelledby="confusion" className="mt-10 scroll-mt-20">
          <h2 id="confusion" className={h2Cls}>
            इतनी सारी महावितरण खोजें उलझन में क्यों खत्म होती हैं?
          </h2>
          <p className={pCls}>दो चीज़ें बार-बार लोगों को भ्रमित करती हैं:</p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>✕</span>
              <span className={pCls}>
                ज़्यादातर मौजूदा गाइड "MSEDCL-पहले" लिखी जाती हैं और कभी
                साफ तौर पर नहीं बतातीं कि महावितरण वही कंपनी है — इसलिए अगर
                आप सिर्फ "महावितरण" नाम जानते हैं, तो आप अपने लिए मौजूद
                कंटेंट को पहचान नहीं पाते।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>✕</span>
              <span className={pCls}>
                मुंबई में लोग "महावितरण बिल" खोजते हैं यह मानकर कि यह उन
                पर लागू होती है, जबकि उनका असली सप्लायर अदानी इलेक्ट्रिसिटी,
                टाटा पावर या BEST है — बिल्कुल अलग बिलिंग सिस्टम और पोर्टल।
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: नाम और कवरेज क्षेत्र वे दो चीज़ें हैं जिन्हें दोबारा
            जांचना सबसे पहले फायदेमंद है, अपना बिल कहीं भी खोजने जाने से
            पहले।
          </p>
        </section>

        <section aria-labelledby="checklist" className="mt-10 scroll-mt-20">
          <h2 id="checklist" className={h2Cls}>
            अपना महावितरण बिल जांचने से पहले मुझे क्या चाहिए?
          </h2>
          <p className={pCls}>
            ये तैयार रखें — इनमें से सब कुछ किसी भी पिछले बिल पर छपा होता
            है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">आपको चाहिए</th>
                  <th className="px-4 py-2 font-semibold">कहां मिलेगा</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">कंज़्यूमर नंबर</td>
                  <td className="px-4 py-2">आम तौर पर 12-अंकों की संख्या, किसी भी पिछले बिल पर छपी हुई</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">कंज़्यूमर टाइप</td>
                  <td className="px-4 py-2">यह भी आपके बिल पर दिखता है (जैसे रेजिडेंशियल/घरेलू)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">बिलिंग यूनिट (BU) कोड</td>
                  <td className="px-4 py-2">आपके स्थानीय सर्कल/डिवीज़न की पहचान करने वाला 4-अंकों का कोड — कुछ पोर्टल फ्लो इसे मांगते हैं</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">रजिस्टर्ड मोबाइल या ईमेल</td>
                  <td className="px-4 py-2">OTP सत्यापन चाहने वाले फ्लो के लिए ज़रूरी</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: आपके आखिरी पेपर या PDF बिल में आपको चाहिए सब कुछ है
            — शुरू करने से पहले इसे हाथ में रखें।
          </p>
        </section>

        <section aria-labelledby="check-online" className="mt-10 scroll-mt-20">
          <h2 id="check-online" className={h2Cls}>
            मैं अपना महावितरण बिल ऑनलाइन कैसे जांचूं?
          </h2>
          <p className={pCls}>
            आधिकारिक रास्ता mahadiscom.in है — <strong>वेब सेल्फ सर्विस
            (WSS)</strong> या कंज़्यूमर पोर्टल सेक्शन देखें, फिर "व्यू एंड
            पे बिल्स" विकल्प, और पूछे जाने पर अपना कंज़्यूमर नंबर डालें।
            सटीक मेन्यू शब्द और स्क्रीन लेआउट समय के साथ बदल सकते हैं,
            इसलिए इसे आज आपको जो दिखेगा उसका पिक्सेल-टू-पिक्सेल गारंटीशुदा
            मैच मानने की बजाय एक सामान्य रास्ता मानें जिसे देखना है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            एक बार अंदर आने पर, आपको अपनी मौजूदा बिल राशि, देय तारीख, और
            उस अवधि का इस्तेमाल दिखना चाहिए।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: mahadiscom.in का वेब सेल्फ सर्विस सेक्शन बिल जांचने
            की आधिकारिक जगह है — इसके लिए अनाधिकारिक थर्ड-पार्टी साइट्स से
            बचें।
          </p>
        </section>

        <section aria-labelledby="check-app" className="mt-10 scroll-mt-20">
          <h2 id="check-app" className={h2Cls}>
            मैं महावितरण ऐप के ज़रिए अपना बिल कैसे जांचूं और चुकाऊं?
          </h2>
          <p className={pCls}>
            आधिकारिक <strong>महावितरण कंज़्यूमर ऐप</strong> कुछ ऐसी चीज़ें
            सपोर्ट करता है जो इसे कई उपयोगकर्ताओं के लिए सच में आसान विकल्प
            बनाती हैं:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'गेस्ट लॉगिन — बिना अकाउंट रजिस्टर किए सिर्फ अपने कंज़्यूमर नंबर से बिल देखें और चुकाएं।',
              'बिल इतिहास — कई उपयोगकर्ता लगभग 6–12 महीनों के पिछले बिल दिखने की बात बताते हैं, हालांकि यह तय गारंटी नहीं है, इसलिए अपने खुद के अकाउंट में जो उपलब्ध है वह जांचें।',
              'शिकायत दर्ज करना और ट्रैक करना।',
              'एक ही लॉगिन के तहत कई कनेक्शन मैनेज करना।',
              'अंग्रेज़ी और मराठी दोनों में उपलब्ध।',
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-electricity" aria-hidden>✓</span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 ${pCls}`}>
            ऐप पर पेमेंट के तरीके आम तौर पर वेबसाइट से मेल खाते हैं — UPI,
            डेबिट/क्रेडिट कार्ड, नेट बैंकिंग, या एक सपोर्टेड ई-वॉलेट।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ऐप अक्सर तेज़ विकल्प होता है, खासकर अगर आप बिना पूरा
            अकाउंट सेट किए सिर्फ चुकाना चाहते हैं।
          </p>
        </section>

        <section aria-labelledby="why-higher" className="mt-10 scroll-mt-20">
          <h2 id="why-higher" className={h2Cls}>
            मेरा महावितरण बिल सामान्य से ज़्यादा क्यों है?
          </h2>
          <p className={pCls}>
            MSEDCL <strong>टेलिस्कोपिक स्लैब</strong> का इस्तेमाल करके
            बिजली बिल करता है — आपकी यूनिट्स बैंड में बांटी जाती हैं, और
            हर बैंड की अपनी दर से चार्ज होता है। जैसे-जैसे आपका मासिक
            इस्तेमाल एक ऊंचे बैंड में चढ़ता है, आपके बिल का ज़्यादा हिस्सा
            महंगी दर पर बिल होता है, यही वजह है कि इस्तेमाल में एक सामान्य
            उछाल बिल में एक असंगत उछाल पैदा कर सकता है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">मासिक यूनिट (kWh)</th>
                  <th className="px-4 py-2 font-semibold">आपके बिल का क्या होता है</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {slabIllustration.map((r) => (
                  <tr key={r.band}>
                    <td className="px-4 py-2 font-medium">{r.band}</td>
                    <td className="px-4 py-2 text-ash/70">{r.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 text-xs ${pCls}`}>
            यह तालिका सिर्फ टेलिस्कोपिक बिलिंग के सामान्य तर्क को दिखाती
            है — यह MSEDCL की असली मौजूदा स्लैब संरचना नहीं है। इसके लिए,
            नीचे दिया असली कैलकुलेटर इस्तेमाल करें।
          </p>
          <p className={`mt-4 ${pCls}`}>
            अंदाज़ा लगाने की बजाय, अपनी खुद की यूनिट्स हमारे{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="font-semibold text-brass underline">
              MSEDCL बिल कैलकुलेटर
            </Link>{' '}
            में डालें और ठीक-ठीक देखें कि MSEDCL को आपसे स्लैब-दर-स्लैब
            कितना चार्ज करना चाहिए। टेलिस्कोपिक बिलिंग के सामान्य तंत्र के
            लिए, देखें{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक बिजली स्लैब असल में कैसे काम करते हैं
            </Link>
            ।
          </p>
          <p className={pCls}>
            अगर आपने हाल ही में AC या कोई और ज़्यादा बिजली खींचने वाला
            उपकरण जोड़ा है, तो यह अकेला एक उछाल की वजह हो सकता है — हमारे{' '}
            <Link href="/hi/ac/bill-calculator" className="text-brass underline">
              AC चलाने की लागत कैलकुलेटर
            </Link>{' '}
            से देखें यह असल में कितना जोड़ता है या पूरे{' '}
            <Link href="/hi/appliances" className="text-brass underline">
              उपकरण कैलकुलेटर
            </Link>{' '}
            ब्राउज़ करें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: एक ऊंचा बिल अक्सर असली इस्तेमाल का एक महंगे स्लैब
            में जाना होता है, गलती नहीं — गलती मान लेने से पहले अपना असली
            नंबर कैलकुलेटर के मुकाबले जांचें।
          </p>
        </section>

        <section aria-labelledby="complaint" className="mt-10 scroll-mt-20">
          <h2 id="complaint" className={h2Cls}>
            मैं शिकायत कैसे दर्ज करूं या अपना बिल इतिहास कैसे जांचूं?
          </h2>
          <p className={pCls}>
            महावितरण ऐप और mahadiscom.in पोर्टल दोनों आपको अपना बिल इतिहास
            देखने और शिकायत दर्ज या ट्रैक करने देते हैं। बिलिंग राशि को
            लेकर शिकायत दर्ज करने से पहले, दो चीज़ें पहले जांचना फायदेमंद
            है: आपका असली इस्तेमाल MSEDCL की असली स्लैब संरचना के मुकाबले
            (ऊपर का कैलकुलेटर देखें), और आपकी मीटर रीडिंग की तारीख, क्योंकि
            सामान्य से देर से ली गई एक रीडिंग सामान्य से ज़्यादा दिन कवर
            करके एक बिल को कृत्रिम रूप से ज़्यादा दिखा सकती है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            अगर ये जांच फर्क को नहीं समझातीं, तो ऐप या पोर्टल में शिकायत
            विकल्प इस्तेमाल करें, या अपने मौजूदा बिल पर सूचीबद्ध कस्टमर-केयर
            ब्यौरे इस्तेमाल करें — हम यहां कोई खास नंबर नहीं छापेंगे क्योंकि
            ये बिना ज़्यादा सूचना के बदलते हैं; हमेशा mahadiscom.in पर इसकी
            पुष्टि करें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: पहले इस्तेमाल और रीडिंग तारीखें जांचें — ज़्यादातर
            बिलिंग हैरानियां इन्हीं दो में से किसी एक से जुड़ी होती हैं,
            सिस्टम की गलती से नहीं।
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
                वह बिलिंग तर्क कि स्लैब पार करने के बाद आपकी यूनिट्स ज़्यादा
                क्यों खर्च होती हैं।
              </p>
            </Link>
            <Link
              href="/hi/blog/smart-meters-in-india-guide"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📡</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                भारत में स्मार्ट मीटर: क्या यह अनिवार्य है?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                महाराष्ट्र ऊंचे रोलआउट वाले राज्यों में से एक है — आपके बिल
                के लिए इसका क्या मतलब है।
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
          यह एक स्वतंत्र संपादकीय गाइड है, कोई आधिकारिक महावितरण/MSEDCL
          प्रकाशन नहीं। पोर्टल के स्टेप्स, ऐप की विशेषताएं और संपर्क ब्यौरे
          बदल सकते हैं — हमेशा mahadiscom.in पर मौजूदा ब्यौरों की पुष्टि
          करें। ऐसे तथ्यों को हम कैसे सत्यापित करते हैं, इसके लिए हमारी{' '}
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
      </main>
    </>
  )
}
