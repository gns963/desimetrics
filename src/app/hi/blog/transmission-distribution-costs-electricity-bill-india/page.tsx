import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/transmission-distribution-costs-electricity-bill-india'
const TITLE =
  'आपका बिजली बिल कहां जाता है? ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत समझिए'
const DESCRIPTION =
  'ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत बिजली बिल का वह हिस्सा है जो ग्रिड का खर्च चुकाता है। जानिए ट्रांसमिशन चार्ज, व्हीलिंग चार्ज और लाइन लॉस आपके बिल तक कैसे पहुंचते हैं, और राज्यवार AT&C लॉस कितना है।'
const LAST_UPDATED = '5 अक्टूबर 2026'

export const metadata: Metadata = {
  title: 'बिजली बिल में ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत',
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
    q: 'बिजली बिल में ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत क्या होती है?',
    a: 'ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत बिजली बिल का वह हिस्सा है जो ग्रिड का खर्च चुकाता है: राज्यों के बीच बिजली ले जाने वाली हाई-वोल्टेज लाइनें और सबस्टेशन, घर तक बिजली पहुंचाने वाला स्थानीय नेटवर्क, और रास्ते में खोई हुई बिजली। यह लागत ट्रांसमिशन चार्ज, व्हीलिंग चार्ज और लाइन लॉस के ज़रिए घरेलू बिल तक पहुंचती है।',
  },
  {
    q: 'क्या 5 अक्टूबर 2026 को घोषित L&T के ट्रांसमिशन ऑर्डर से मेरा बिजली बिल बदलेगा?',
    a: 'नहीं। ETEnergyWorld की 5 अक्टूबर 2026 की रिपोर्ट के अनुसार ये एक निर्माण कंपनी को मिले कंस्ट्रक्शन कॉन्ट्रैक्ट हैं। तीन में से दो ऑर्डर सऊदी अरब और UAE में हैं, और भारत का ऑर्डर विशाखापत्तनम में एक निजी डेवलपर के लिए है। इनसे कोई टैरिफ ऑर्डर जुड़ा नहीं है।',
  },
  {
    q: 'व्हीलिंग चार्ज क्या है?',
    a: 'व्हीलिंग चार्ज वह प्रति-यूनिट कीमत है जो डिस्कॉम के स्थानीय नेटवर्क से उपभोक्ता तक बिजली पहुंचाने के लिए ली जाती है। राज्य नियामक इसे वोल्टेज स्तर के हिसाब से मंज़ूर करते हैं। महाराष्ट्र के नियामक ने केस नंबर 210 ऑफ 2024 के MYT ऑर्डर में टाटा पावर के मुंबई नेटवर्क के लिए FY 2025-26 में लो टेंशन पर ₹2.76 प्रति यूनिट और हाई टेंशन पर ₹0.80 प्रति यूनिट मंज़ूर किया।',
  },
  {
    q: 'AT&C लॉस और T&D लॉस में क्या फर्क है?',
    a: 'T&D लॉस सिर्फ उस बिजली को गिनता है जो बनती है पर मीटर तक नहीं पहुंचती। AT&C लॉस उसमें वह बिजली भी जोड़ता है जो सप्लाई हुई पर बिल नहीं हुई, या बिल हुई पर भुगतान नहीं मिला। इसलिए AT&C लॉस ज़्यादा व्यापक माप है, और दोनों प्रतिशत एक-दूसरे की जगह इस्तेमाल नहीं किए जा सकते।',
  },
  {
    q: 'भारत का AT&C लॉस कितना है?',
    a: 'विद्युत मंत्रालय की 14वीं इंटीग्रेटेड रेटिंग एंड रैंकिंग ऑफ पावर डिस्ट्रीब्यूशन यूटिलिटीज़ रिपोर्ट के अनुसार भारत का कुल AT&C लॉस FY 2024-25 में 15.04% रहा, जो FY 2023-24 में 15.97% था। यह रिपोर्ट 65 यूटिलिटीज़ को कवर करती है।',
  },
  {
    q: 'किन राज्यों में AT&C लॉस सबसे कम है?',
    a: 'इसी रेटिंग रिपोर्ट से FY 2024-25 के लिए बताए गए राज्यों में केरल का AT&C लॉस सबसे कम 6.61% रहा, उसके बाद आंध्र प्रदेश 7.87% और गुजरात 8.25% पर रहे। मध्य प्रदेश 22.76% के साथ सबसे ऊंचे राज्यों में रहा।',
  },
  {
    q: 'क्या घरेलू बिजली बिल में ट्रांसमिशन चार्ज अलग से दिखता है?',
    a: 'आम तौर पर नहीं। ज़्यादातर घरेलू बिलों में ग्रिड की लागत एनर्जी चार्ज और फिक्स्ड चार्ज के अंदर ही शामिल रहती है। महाराष्ट्र उन राज्यों में है जहां व्हीलिंग चार्ज बिल पर अलग लाइन के रूप में दिखता है।',
  },
  {
    q: 'रिन्यूएबल एनर्जी प्रोजेक्ट को नई ट्रांसमिशन लाइनों की ज़रूरत क्यों पड़ती है?',
    a: 'सोलर और विंड प्लांट वहां लगते हैं जहां धूप और हवा का संसाधन है, जो अक्सर बिजली इस्तेमाल करने वाले शहरों से दूर होता है। उस बिजली को ग्रिड तक ले जाने, यानी इवैक्यूएट करने, के लिए लाइनों और सबस्टेशनों की ज़रूरत होती है। केंद्रीय मंत्रिमंडल ने 30 सितंबर 2026 को 135 GW तक रिन्यूएबल एनर्जी के इवैक्यूएशन के लिए ग्रीन एनर्जी कॉरिडोर फेज़-III को मंज़ूरी दी।',
  },
  {
    q: 'क्या नई ट्रांसमिशन लाइन से बिजली का टैरिफ बढ़ता है?',
    a: 'अकेली नई लाइन से टैरिफ नहीं बदलता। किसी ट्रांसमिशन एसेट की लागत उपभोक्ता तक सिर्फ उन चार्ज के ज़रिए पहुंचती है जिन्हें केंद्रीय या राज्य नियामक मंज़ूर करता है, और 5 अक्टूबर 2026 को रिपोर्ट हुए ऑर्डर को किसी टैरिफ से जोड़ने वाला कोई नियामक आदेश नहीं है।',
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
const liCls = 'flex items-start gap-2'

const wheelingRows: [string, string, string][] = [
  ['एक्स्ट्रा-हाई टेंशन (EHT)', '₹0.04', '0.00%'],
  ['हाई टेंशन (HT)', '₹0.80', '0.37%'],
  ['लो टेंशन (LT)', '₹2.76', '2.29%'],
]

// States whose Hindi calculator page is genuinely translated link to /hi;
// the rest link to the English calculator so we never point at a noindexed page.
const stateRows: [string, string, string][] = [
  ['केरल', '/hi/electricity/kseb-bill-calculator', '6.61%'],
  ['आंध्र प्रदेश', '/hi/electricity/andhra-pradesh-electricity-bill-calculator', '7.87%'],
  ['गुजरात', '/hi/electricity/gujarat-electricity-bill-calculator', '8.25%'],
  ['महाराष्ट्र', '/hi/electricity/msedcl-bill-calculator', '17.69%'],
  ['ओडिशा', '/electricity/odisha-electricity-bill-calculator', '17.81%'],
  ['पंजाब', '/electricity/punjab-electricity-bill-calculator', '19.21%'],
  ['उत्तर प्रदेश', '/electricity/uppcl-bill-calculator', '19.54%'],
  ['तेलंगाना', '/hi/electricity/telangana-electricity-bill-calculator', '19.84%'],
  ['मध्य प्रदेश', '/electricity/madhya-pradesh-electricity-bill-calculator', '22.76%'],
]

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className={liCls}>
      <span className="mt-0.5 text-hub-electricity" aria-hidden>
        ✓
      </span>
      <span className={pCls}>{children}</span>
    </li>
  )
}

export default function TransmissionDistributionCostsArticlePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🗼</span> एक्सप्लेनर
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
          · अंतिम अपडेट {LAST_UPDATED} ·{' '}
          <a
            href="https://energy.economictimes.indiatimes.com/news/power/lt-bags-10000-15000-cr-power-transmission-orders-across-india-and-west-asia/134687027"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            खबर का स्रोत: ETEnergyWorld
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत बिजली बिल का वह हिस्सा है जो ग्रिड का
            खर्च चुकाता है
          </strong>
          : राज्यों के बीच बिजली ले जाने वाली हाई-वोल्टेज लाइनें और सबस्टेशन, घर तक
          बिजली पहुंचाने वाला स्थानीय नेटवर्क, और रास्ते में खोई हुई बिजली। ग्रिड की यह
          लागत तीन रास्तों से बिल तक पहुंचती है — ट्रांसमिशन चार्ज, व्हीलिंग चार्ज और
          लाइन लॉस। विद्युत मंत्रालय की 14वीं इंटीग्रेटेड रेटिंग एंड रैंकिंग ऑफ पावर
          डिस्ट्रीब्यूशन यूटिलिटीज़ रिपोर्ट के अनुसार भारत की वितरण कंपनियों का एग्रीगेट
          टेक्निकल एंड कमर्शियल (AT&amp;C) लॉस FY 2024-25 में 15.04% रहा। यह गाइड हर
          रास्ते को समझाती है, राज्यवार लॉस की तुलना करती है, और बताती है कि रिन्यूएबल
          एनर्जी को नई लाइनों और सबस्टेशनों की ज़रूरत क्यों है।
        </p>

        <section aria-labelledby="news" className="mt-10 scroll-mt-20">
          <h2 id="news" className={h2Cls}>
            L&amp;T के ट्रांसमिशन ऑर्डर, दो वाक्यों में
          </h2>
          <p className={pCls}>
            ETEnergyWorld की 5 अक्टूबर 2026 की रिपोर्ट के अनुसार लार्सन एंड टुब्रो के
            पावर ट्रांसमिशन एंड डिस्ट्रीब्यूशन कारोबार को सऊदी अरब, UAE और भारत में कई
            &lsquo;मेगा&rsquo; ऑर्डर मिले; L&amp;T ₹10,000–15,000 करोड़ के ऑर्डर को
            &lsquo;मेगा&rsquo; कहती है, और यह पूरे सेट के लिए एक ही रेंज है। इन ऑर्डर में
            सऊदी अरब में 380 kV ट्रांसमिशन और सबस्टेशन का काम, UAE में 132/11 kV
            सबस्टेशन, और विशाखापत्तनम में एक निजी डेवलपर के लिए लाइनों और सबस्टेशनों
            वाला ट्रांसमिशन सिस्टम शामिल है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>इन ऑर्डर से किसी भी उपभोक्ता का बिजली बिल नहीं बदलता।</strong> ये एक
            निर्माण कंपनी को मिले कंस्ट्रक्शन कॉन्ट्रैक्ट हैं, तीन में से दो भारत के बाहर
            हैं, और इनसे कोई टैरिफ ऑर्डर जुड़ा नहीं है। ये एक अलग सवाल उठाने का अच्छा
            मौका हैं: ग्रिड का खर्च कौन और कैसे चुकाता है।
          </p>
          <p className={takeawayCls}>
            सार: ट्रांसमिशन ऑर्डर एक निर्माण कॉन्ट्रैक्ट है, टैरिफ में बदलाव नहीं।
          </p>
        </section>

        <section aria-labelledby="what-is" className="mt-10 scroll-mt-20">
          <h2 id="what-is" className={h2Cls}>
            ट्रांसमिशन और डिस्ट्रीब्यूशन क्या हैं?
          </h2>
          <p className={pCls}>
            ट्रांसमिशन और डिस्ट्रीब्यूशन वे दो चरण हैं जो बिजली को पावर प्लांट से मीटर तक
            पहुंचाते हैं। दोनों चरण वोल्टेज, दूरी और मालिक के हिसाब से अलग हैं।
          </p>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="font-semibold text-ink-navy">ट्रांसमिशन</dt>
              <dd className={pCls}>
                ट्रांसमिशन बड़ी मात्रा में बिजली को हाई वोल्टेज पर लंबी दूरी तक ले जाता
                है। सऊदी अरब वाले ऑर्डर की 380 kV लाइनें ट्रांसमिशन एसेट हैं।
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-navy">सबस्टेशन</dt>
              <dd className={pCls}>
                सबस्टेशन दो चरणों के बीच वोल्टेज बदलता है। UAE वाले ऑर्डर जैसा 132/11 kV
                सबस्टेशन बिजली को 132 kV से घटाकर 11 kV करता है।
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-navy">डिस्ट्रीब्यूशन</dt>
              <dd className={pCls}>
                डिस्ट्रीब्यूशन सबस्टेशन से घरों, दुकानों और फैक्ट्रियों तक कम वोल्टेज पर
                बिजली पहुंचाता है। जो वितरण कंपनी (डिस्कॉम) आपको बिल भेजती है, वही यह
                आखिरी चरण चलाती है।
              </dd>
            </div>
          </dl>
          <p className={takeawayCls}>
            सार: ट्रांसमिशन बिजली को थोक में ले जाता है, डिस्ट्रीब्यूशन उसे मीटर तक
            पहुंचाता है, और दोनों का खर्च चुकाना पड़ता है।
          </p>
        </section>

        <section aria-labelledby="how-costs-reach" className="mt-10 scroll-mt-20">
          <h2 id="how-costs-reach" className={h2Cls}>
            ग्रिड की लागत आपके बिल तक कैसे पहुंचती है?
          </h2>
          <p className={pCls}>
            ग्रिड की लागत तीन रास्तों से बिल तक पहुंचती है, और डिस्कॉम के वसूलने से पहले
            हर रास्ता नियामक के आदेश से तय होता है।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">ट्रांसमिशन चार्ज</strong> अंतर-राज्यीय
              और राज्य के भीतर की लाइनों का खर्च चुकाते हैं। केंद्रीय विद्युत नियामक आयोग
              (शेयरिंग ऑफ इंटर-स्टेट ट्रांसमिशन चार्जेज़ एंड लॉसेज़) रेगुलेशंस, 2020 के
              तहत डिस्कॉम को चार घटकों में बिल किया जाता है — नेशनल, रीजनल, ट्रांसफॉर्मर
              और AC सिस्टम। नेशनल घटक में रिन्यूएबल एनर्जी प्रोजेक्ट के लिए बनी लाइनें
              शामिल हैं।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">व्हीलिंग चार्ज</strong> डिस्कॉम के अपने
              स्थानीय नेटवर्क का खर्च चुकाते हैं। राज्य नियामक हर वोल्टेज स्तर के लिए
              प्रति-यूनिट व्हीलिंग चार्ज मंज़ूर करते हैं।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">लाइन लॉस</strong> वे यूनिट हैं जो खरीदी
              जाती हैं पर कभी बिल नहीं होतीं। डिस्कॉम जितनी बिजली बेचता है उससे ज़्यादा
              खरीदता है, और मंज़ूर लॉस की लागत टैरिफ के अंदर शामिल रहती है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            वोल्टेज घटने के साथ व्हीलिंग चार्ज बढ़ता है, क्योंकि लो-टेंशन उपभोक्ता नेटवर्क
            का ज़्यादा हिस्सा इस्तेमाल करते हैं। नीचे की तालिका वे व्हीलिंग चार्ज और
            व्हीलिंग लॉस दिखाती है जो महाराष्ट्र विद्युत नियामक आयोग ने केस नंबर 210 ऑफ
            2024 के MYT ऑर्डर में टाटा पावर के मुंबई वितरण नेटवर्क के लिए FY 2025-26 में
            मंज़ूर किए।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                वोल्टेज स्तर के अनुसार मंज़ूर व्हीलिंग चार्ज और व्हीलिंग लॉस, टाटा पावर
                मुंबई वितरण, FY 2025-26
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">वोल्टेज स्तर</th>
                  <th className="px-4 py-2 font-semibold">व्हीलिंग चार्ज (प्रति यूनिट)</th>
                  <th className="px-4 py-2 font-semibold">व्हीलिंग लॉस</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {wheelingRows.map(([level, charge, loss]) => (
                  <tr key={level}>
                    <td className="px-4 py-2 font-medium">{level}</td>
                    <td className="px-4 py-2">{charge}</td>
                    <td className="px-4 py-2">{loss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            उस ऑर्डर में लो-टेंशन यूनिट पर व्हीलिंग चार्ज एक्स्ट्रा-हाई-टेंशन के मुकाबले
            69 गुना है। ज़्यादातर घरेलू बिल इन ग्रिड लागतों को अलग लाइन के रूप में नहीं
            दिखाते; ये एनर्जी चार्ज और फिक्स्ड चार्ज के अंदर शामिल रहती हैं। महाराष्ट्र
            उन राज्यों में है जहां व्हीलिंग चार्ज अलग लाइन के रूप में दिखता है; हमारा{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL बिल कैलकुलेटर
            </Link>{' '}
            उस लाइन को मॉडल नहीं करता। जो लाइनें ज़्यादातर बिलों पर दिखती हैं, उनके लिए
            देखें{' '}
            <Link
              href="/hi/blog/fixed-charges-vs-fca-electricity-bill"
              className="text-brass underline"
            >
              फिक्स्ड चार्ज बनाम FCA
            </Link>
            ।
          </p>
          <p className={takeawayCls}>
            सार: ग्रिड की लागत असली है और नियामक से मंज़ूर है, पर ज़्यादातर बिलों में यह
            उन्हीं चार्ज के अंदर शामिल है जो आप पहले से देखते हैं।
          </p>
        </section>

        <section aria-labelledby="atc-vs-td" className="mt-10 scroll-mt-20">
          <h2 id="atc-vs-td" className={h2Cls}>
            AT&amp;C लॉस और T&amp;D लॉस में क्या फर्क है?
          </h2>
          <p className={pCls}>
            AT&amp;C लॉस और T&amp;D लॉस दो अलग अंतर मापते हैं, इसलिए दोनों प्रतिशत
            एक-दूसरे की जगह इस्तेमाल नहीं किए जा सकते।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">T&amp;D लॉस</strong> सिर्फ ऊर्जा गिनता
              है: वे यूनिट जो बनती हैं पर मीटर तक नहीं पहुंचतीं। द संडे गार्जियन की 27
              जुलाई 2025 की रिपोर्ट के अनुसार, जो लोकसभा में दिए गए विद्युत मंत्रालय के
              आंकड़ों का हवाला देती है, भारत में FY 2023-24 में T&amp;D लॉस 16.64% रहा
              — ट्रांसमिशन में 3.55% और डिस्ट्रीब्यूशन में 13.09%।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">AT&amp;C लॉस</strong> ऊर्जा और पैसा
              दोनों गिनता है: इसमें वे यूनिट भी जुड़ती हैं जो सप्लाई हुईं पर बिल नहीं
              हुईं, और वे बिल जिनका भुगतान नहीं हुआ। इसकी गणना 1 − (बिलिंग एफिशिएंसी ×
              कलेक्शन एफिशिएंसी) से होती है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">डिस्ट्रीब्यूशन</strong> दोनों मापों में
              लॉस का बड़ा हिस्सा उठाता है। FY 2023-24 के आंकड़ों में 16.64 प्रतिशत अंकों
              में से 13.09 डिस्ट्रीब्यूशन के हैं।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            सार: T&amp;D लॉस एक इंजीनियरिंग आंकड़ा है, AT&amp;C लॉस इंजीनियरिंग और
            बिलिंग दोनों का — देखें कि कोई हेडलाइन कौन सा आंकड़ा बता रही है।
          </p>
        </section>

        <section aria-labelledby="losses-by-state" className="mt-10 scroll-mt-20">
          <h2 id="losses-by-state" className={h2Cls}>
            राज्यवार AT&amp;C लॉस (FY 2024-25)
          </h2>
          <p className={pCls}>
            नीचे के नौ राज्यों में राज्यवार AT&amp;C लॉस केरल के 6.61% से मध्य प्रदेश के
            22.76% तक है, जबकि राष्ट्रीय आंकड़ा 15.04% है। तालिका में हर राज्य का FY
            2024-25 का AT&amp;C लॉस उसके बिजली बिल कैलकुलेटर के लिंक के साथ दिया गया है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                FY 2024-25 के लिए राज्यवार AT&amp;C लॉस, राष्ट्रीय आंकड़े के साथ
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">राज्य</th>
                  <th className="px-4 py-2 font-semibold">AT&amp;C लॉस, FY 2024-25</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {stateRows.map(([state, href, loss]) => (
                  <tr key={state}>
                    <td className="px-4 py-2 font-medium">
                      <Link href={href} className="text-brass underline">
                        {state}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{loss}</td>
                  </tr>
                ))}
                <tr className="bg-mist/60">
                  <td className="px-4 py-2 font-semibold text-ink-navy">पूरा भारत</td>
                  <td className="px-4 py-2 font-semibold text-ink-navy">15.04%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            ये आंकड़े विद्युत मंत्रालय की 14वीं इंटीग्रेटेड रेटिंग एंड रैंकिंग ऑफ पावर
            डिस्ट्रीब्यूशन यूटिलिटीज़ रिपोर्ट से हैं, जो 65 यूटिलिटीज़ को कवर करती है;
            इन्हें T&amp;D India ने 27 जनवरी 2026 को और उत्तर प्रदेश के लिए SolarQuarter
            ने 31 जनवरी 2026 को रिपोर्ट किया। तालिका सिर्फ उन नौ राज्यों तक सीमित है
            जिनका रिपोर्ट किया गया आंकड़ा हमें मिला; यह पूरी रैंकिंग नहीं है। हर डिस्कॉम
            एक लॉस लक्ष्य पर भी काम करता है: उसी संडे गार्जियन रिपोर्ट के अनुसार मध्य
            प्रदेश के ईस्ट डिस्कॉम ने 15.5% के लक्ष्य के मुकाबले 28.04% डिस्ट्रीब्यूशन
            लॉस दर्ज किया।
          </p>
          <p className={takeawayCls}>
            सार: बिजली की वही एक यूनिट ज़्यादा लॉस वाले राज्य में डिस्कॉम को कम लॉस वाले
            राज्य के मुकाबले पहुंचाने में महंगी पड़ती है।
          </p>
        </section>

        <section aria-labelledby="renewables" className="mt-10 scroll-mt-20">
          <h2 id="renewables" className={h2Cls}>
            रिन्यूएबल एनर्जी को नई लाइनों और सबस्टेशनों की ज़रूरत क्यों है?
          </h2>
          <p className={pCls}>
            रिन्यूएबल एनर्जी को नई लाइनों और सबस्टेशनों की ज़रूरत इसलिए है कि सोलर और
            विंड प्लांट वहां लगते हैं जहां संसाधन है, वहां नहीं जहां मांग है। उस बिजली
            को ग्रिड तक ले जाने को इवैक्यूएशन कहते हैं, और भारत में इसका पैमाना तीन
            पड़ावों से दिखता है।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">कमी 2012 में पहचानी गई।</strong> विद्युत
              मंत्रालय के अनुसार पावर ग्रिड कॉर्पोरेशन ऑफ इंडिया के एक अध्ययन ने पाया कि
              रिन्यूएबल साइटों के पास इवैक्यूएशन का ढांचा अपर्याप्त था।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">ग्रीन एनर्जी कॉरिडोर फेज़-I</strong> में
              ₹10,141.68 करोड़ की परियोजना लागत पर 9,700 सर्किट किमी राज्य के भीतर की
              लाइनों और 22,600 MVA सबस्टेशनों का लक्ष्य रखा गया, जिसे 2015 में मंज़ूरी
              मिली।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">ग्रीन एनर्जी कॉरिडोर फेज़-III</strong> को
              केंद्रीय मंत्रिमंडल ने 30 सितंबर 2026 को ₹1,86,405 करोड़ के परिव्यय के साथ
              135 GW तक के इवैक्यूएशन के लिए मंज़ूरी दी: ₹1,36,378 करोड़ राज्य के भीतर
              के ट्रांसमिशन के लिए और ₹50,000 करोड़ 50 GWh बैटरी स्टोरेज के लिए, जिसमें
              ₹54,082 करोड़ की केंद्रीय सहायता है और पूरा होने का लक्ष्य FY 2032-33 है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            यही कारण L&amp;T वाली रिपोर्ट में भी दिखता है, जो इन ऑर्डर को ग्रिड मज़बूत
            करने और रिन्यूएबल एनर्जी इवैक्यूएशन से जोड़ती है। जब बड़े उपभोक्ता सीधे बिजली
            खरीदते हैं तब नेटवर्क चार्ज यह भी तय करते हैं कि ग्रिड का खर्च कौन चुकाता है,
            जिसे हमारा नोट{' '}
            <Link
              href="/hi/news/gerc-additional-surcharge-open-access-gujarat"
              className="text-brass underline"
            >
              गुजरात का ओपन एक्सेस एडिशनल सरचार्ज
            </Link>{' '}
            समझाता है।
          </p>
          <p className={takeawayCls}>
            सार: ज़्यादा रिन्यूएबल क्षमता का मतलब ज़्यादा लाइनें और सबस्टेशन है, और इनकी
            योजना और फंडिंग सालों पहले होती है।
          </p>
        </section>

        <section aria-labelledby="over-time" className="mt-10 scroll-mt-20">
          <h2 id="over-time" className={h2Cls}>
            समय के साथ उपभोक्ताओं के लिए इसका क्या मतलब है?
          </h2>
          <p className={pCls}>
            उपभोक्ताओं के लिए ग्रिड में नया निवेश और घटता लॉस लागत को उलटी दिशाओं में
            खींचते हैं, और दोनों में से कोई भी बिल में अपने-आप बदलाव नहीं लाता।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">नए एसेट</strong> का खर्च ट्रांसमिशन और
              व्हीलिंग चार्ज के ज़रिए तभी चुकाया जाता है जब नियामक उन्हें मंज़ूर कर दे।
              ग्रीन एनर्जी कॉरिडोर फेज़-III के ₹1,86,405 करोड़ के परिव्यय में ₹54,082
              करोड़ केंद्रीय वित्तीय सहायता है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">कम लॉस</strong> उस बिजली को घटाता है जो
              डिस्कॉम हर बिल की गई यूनिट के लिए खरीदता है। राष्ट्रीय AT&amp;C लॉस एक
              साल में 15.97% से घटकर 15.04% हुआ।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">सप्लाई की कमी</strong> एक अलग लाइन के
              ज़रिए असर डालती है, यानी मासिक फ्यूल और पावर परचेज़ एडजस्टमेंट, जैसा हमारा
              नोट{' '}
              <Link
                href="/hi/news/india-power-shortage-september-2026"
                className="text-brass underline"
              >
                भारत में सितंबर 2026 की बिजली की कमी
              </Link>{' '}
              समझाता है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            हम भविष्य के टैरिफ के बारे में कोई दावा नहीं करते। उपभोक्ता क्या चुकाता है,
            इसका एकमात्र भरोसेमंद स्रोत उस राज्य के नियामक का मौजूदा टैरिफ ऑर्डर है, और
            हमारे{' '}
            <Link href="/hi/electricity" className="text-brass underline">
              बिजली बिल कैलकुलेटर
            </Link>{' '}
            उसी पर बने हैं।
          </p>
          <p className={takeawayCls}>
            सार: ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत बिल तक सिर्फ नियामक से मंज़ूर
            चार्ज और लॉस के ज़रिए पहुंचती है, किसी खबर की हेडलाइन से सीधे नहीं।
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            अपने बिजली बिल का अनुमान लगाएं
          </h2>
          <p className={`mt-2 ${pCls}`}>
            अपना राज्य या डिस्कॉम चुनें और यूनिट डालें, और देखें कि प्रकाशित स्लैब पर बिल
            कैसे बनता है।
          </p>
          <Link
            href="/hi/electricity"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            बिजली कैलकुलेटर हब खोलें →
          </Link>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            संबंधित गाइड
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/hi/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                फिक्स्ड चार्ज बनाम FCA
              </p>
              <p className="mt-1 text-xs text-ash/60">
                वे चार लाइनें जिनसे ज़्यादातर भारतीय बिजली बिल बनते हैं।
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
                टेलीस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                एनर्जी चार्ज की कीमत स्लैब-दर-स्लैब कैसे तय होती है।
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
          अंतिम अपडेट: {LAST_UPDATED}। L&amp;T के ऑर्डर ETEnergyWorld की 5 अक्टूबर 2026
          की रिपोर्ट के अनुसार बताए गए हैं; L&amp;T की अपनी फाइलिंग हमें नहीं मिली। लॉस
          के आंकड़े विद्युत मंत्रालय की 14वीं इंटीग्रेटेड रेटिंग एंड रैंकिंग ऑफ पावर
          डिस्ट्रीब्यूशन यूटिलिटीज़ रिपोर्ट और लोकसभा में दिए गए विद्युत मंत्रालय के
          आंकड़ों से, जैसा रिपोर्ट किया गया, लिए गए हैं; व्हीलिंग के आंकड़े महाराष्ट्र
          विद्युत नियामक आयोग के केस नंबर 210 ऑफ 2024 के MYT ऑर्डर से हैं, जैसा टाटा
          पावर ने प्रकाशित किया। हम आंकड़े कैसे जुटाते और जांचते हैं, इसके लिए हमारी{' '}
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
