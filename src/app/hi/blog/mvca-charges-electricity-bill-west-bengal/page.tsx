import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/mvca-charges-electricity-bill-west-bengal'
const TITLE = 'बिजली बिल में MVCA चार्ज: यह क्या है और क्यों बदलता है'
const DESCRIPTION =
  'MVCA चार्ज मंथली वेरिएबल कॉस्ट एडजस्टमेंट है, जिसे WBSEDCL अपनी बिजली खरीद लागत में बदलाव वसूलने के लिए एनर्जी चार्ज के ऊपर प्रति यूनिट जोड़ती है। जानिए MVCA कैसे तय, बिल और ट्रू-अप होता है।'
const LAST_UPDATED = '5 अक्टूबर 2026'

export const metadata: Metadata = {
  title: 'बिजली बिल में MVCA चार्ज (WBSEDCL) समझिए',
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
    q: 'MVCA का फुल फॉर्म क्या है?',
    a: 'MVCA का फुल फॉर्म मंथली वेरिएबल कॉस्ट एडजस्टमेंट (Monthly Variable Cost Adjustment) है। यह प्रति यूनिट का शुल्क है जिसे पश्चिम बंगाल की वितरण कंपनी अपनी बिजली खरीद लागत में बदलाव वसूलने के लिए एनर्जी चार्ज में जोड़ती है।',
  },
  {
    q: 'WBSEDCL के बिल में MVCA चार्ज क्या है?',
    a: 'WBSEDCL के बिल में MVCA चार्ज मंथली वेरिएबल कॉस्ट एडजस्टमेंट है, जो अलग लाइन के रूप में दिखता है और उस महीने खपत हुई यूनिट पर लगता है। WBSEDCL के टैरिफ शेड्यूल की दरों में MVCA शामिल नहीं है, इसलिए यह हमेशा एनर्जी चार्ज के ऊपर जुड़ता है।',
  },
  {
    q: 'MVCA की मौजूदा दर क्या है?',
    a: 'हम MVCA की मौजूदा दर नहीं छापते, क्योंकि हम इसे किसी मुख्य स्रोत से सत्यापित नहीं कर पाए; तीसरे पक्ष की साइटें अलग-अलग आंकड़े देती हैं। आप पर जो दर लागू है वह आपके अपने बिल पर और WBSEDCL की वेबसाइट के MVCA नोटिफिकेशन में छपी होती है।',
  },
  {
    q: 'MVCA चार्ज क्यों बदलता है?',
    a: 'MVCA चार्ज इसलिए बदलता है कि यह वितरण कंपनी की बिजली खरीद लागत में बदलाव के साथ चलता है, जो हर महीने बदलती है। बेस टैरिफ टैरिफ ऑर्डर से तय होता है और इन लागतों के साथ नहीं बदलता।',
  },
  {
    q: 'क्या MVCA और FPPCA एक ही हैं?',
    a: 'नहीं। MVCA मासिक वसूली है। FPPCA, यानी फ्यूल एंड पावर परचेज़ कॉस्ट एडजस्टमेंट, वह सालाना प्रक्रिया है जिसमें नियामक MVCA से वसूली गई रकम का असल लागत से मिलान (ट्रू-अप) करता है।',
  },
  {
    q: 'क्या मैं MVCA चुकाने से बच सकता हूं?',
    a: 'नहीं। MVCA हर खपत हुई यूनिट पर लगता है, इसलिए इसे घटाने का एकमात्र तरीका कम यूनिट इस्तेमाल करना है। WBSEDCL के प्रीपेड उपभोक्ताओं को लागू MVCA समेत एनर्जी चार्ज पर 3% की छूट मिलती है।',
  },
  {
    q: 'बिजली बिल में VCA क्या है?',
    a: 'VCA यानी वेरिएबल कॉस्ट एडजस्टमेंट, वह नाम जो छत्तीसगढ़ की वितरण कंपनी इसी तरह के प्रति-यूनिट लागत एडजस्टमेंट के लिए इस्तेमाल करती थी। CSPDCL का FY 2026-27 का टैरिफ ऑर्डर FPPAS, यानी फ्यूल एंड पावर परचेज़ एडजस्टमेंट सरचार्ज, का ज़िक्र करता है।',
  },
  {
    q: 'क्या ऑनलाइन बिल कैलकुलेटर में MVCA शामिल होता है?',
    a: 'हमारे पश्चिम बंगाल कैलकुलेटर में MVCA शामिल नहीं है, क्योंकि इसकी दर बदलती रहती है और हमारे पास कोई सत्यापित मौजूदा आंकड़ा नहीं है। उसका अनुमान एनर्जी चार्ज और फिक्स्ड चार्ज तक है, इसलिए असल बिल MVCA और इलेक्ट्रिसिटी ड्यूटी जितना ज़्यादा होता है।',
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

const nameRows: [string, string, string][] = [
  ['MVCA', 'मंथली वेरिएबल कॉस्ट एडजस्टमेंट', 'पश्चिम बंगाल (WBSEDCL)'],
  ['VCA', 'वेरिएबल कॉस्ट एडजस्टमेंट', 'छत्तीसगढ़ (CSPDCL), पुराने बिल'],
  ['FPPAS', 'फ्यूल एंड पावर परचेज़ एडजस्टमेंट सरचार्ज', 'छत्तीसगढ़ (CSPDCL), FY 2026-27 का ऑर्डर'],
  ['FCA / FAC / FPPCA', 'फ्यूल कॉस्ट या फ्यूल एंड पावर परचेज़ कॉस्ट एडजस्टमेंट', 'कई दूसरे राज्य'],
]

const exampleRows: [string, string][] = [
  ['महीने में खपत हुई यूनिट', '300'],
  ['उदाहरण के लिए MVCA दर', '₹0.20 प्रति यूनिट'],
  ['बिल पर MVCA लाइन (300 × ₹0.20)', '₹60.00'],
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

export default function MvcaChargesArticlePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'MVCA चार्ज', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🧾</span> एक्सप्लेनर · पश्चिम बंगाल
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
            MVCA चार्ज मंथली वेरिएबल कॉस्ट एडजस्टमेंट है: प्रति यूनिट की वह रकम जो वितरण कंपनी की
            बिजली खरीद लागत में बदलाव वसूलने के लिए बिजली बिल में एनर्जी चार्ज के ऊपर जुड़ती है।
          </strong>{' '}
          वेस्ट बंगाल स्टेट इलेक्ट्रिसिटी डिस्ट्रीब्यूशन कंपनी लिमिटेड (WBSEDCL) इसे पश्चिम बंगाल
          विद्युत नियामक आयोग के 20 मार्च 2025 के टैरिफ ऑर्डर के तहत लगाती है, जिसकी दरें 1
          अप्रैल 2025 से लागू हुईं और जिनमें MVCA शामिल नहीं है। यह लेख बताता है कि MVCA क्या है,
          यह बिल में कैसे लगता है, क्यों बदलता है, और दूसरे राज्यों में इसी शुल्क को क्या कहते
          हैं।
        </p>

        <section aria-labelledby="what-is" className="mt-10 scroll-mt-20">
          <h2 id="what-is" className={h2Cls}>
            MVCA चार्ज क्या हैं?
          </h2>
          <p className={pCls}>
            MVCA चार्ज बिल की एक अलग लाइन है जो टैरिफ में मानी गई बिजली खरीद लागत और कंपनी की
            असल लागत के बीच का अंतर वसूलती है। WBSEDCL के 2025-26 के टैरिफ ऑर्डर का सार इसके
            लिए तीन नियम बताता है।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">टैरिफ से बाहर:</strong> टैरिफ शेड्यूल की दरों
              में MVCA शामिल नहीं है, इसलिए MVCA हमेशा एनर्जी चार्ज के ऊपर जुड़ता है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">फॉर्मूले से गणना:</strong> MVCA की गणना टैरिफ
              रेगुलेशंस के फॉर्मूले से होती है और यह संबंधित महीने में खपत हुई बिजली पर वसूला
              जाता है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">अलग दिखाया जाता है:</strong> MVCA उपभोक्ता के बिल
              पर अपनी अलग लाइन के रूप में दिखता है।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            सार: MVCA आपकी स्लैब दर का हिस्सा नहीं है; यह प्रति यूनिट का जोड़ है जो बिजली खरीद
            लागत के साथ चलता है।
          </p>
        </section>

        <section aria-labelledby="how-billed" className="mt-10 scroll-mt-20">
          <h2 id="how-billed" className={h2Cls}>
            बिल पर MVCA कैसे निकाला जाता है?
          </h2>
          <p className={pCls}>
            बिल पर MVCA उस महीने की MVCA दर को उस महीने खपत हुई यूनिट से गुणा करके निकलता है।
            तालिका एक उदाहरण दर से हिसाब दिखाती है, मौजूदा दर से नहीं।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                20 पैसे प्रति यूनिट पर 300 यूनिट के लिए MVCA की उदाहरण गणना
              </caption>
              <tbody className="divide-y divide-hairline">
                {exampleRows.map(([label, value], i) => (
                  <tr key={label} className={i === exampleRows.length - 1 ? 'bg-mist/60' : ''}>
                    <td className="px-4 py-2 font-medium">{label}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            हम MVCA की मौजूदा दर नहीं छापते। तीसरे पक्ष की साइटें अलग-अलग आंकड़े बताती हैं, और
            हम किसी मुख्य स्रोत से एक दर की पुष्टि नहीं कर पाए। आप पर लागू दर आपके अपने बिल पर
            और WBSEDCL की वेबसाइट के MVCA नोटिफिकेशन में होती है। WBSEDCL कई घरेलू उपभोक्ताओं को
            तिमाही बिल भेजती है, इसलिए एक बिल में तीन अलग महीनों का MVCA हो सकता है।
          </p>
          <p className={takeawayCls}>
            सार: यूनिट × उस महीने की MVCA दर से MVCA लाइन बनती है; दर अपने बिल से पढ़ें।
          </p>
        </section>

        <section aria-labelledby="why-changes" className="mt-10 scroll-mt-20">
          <h2 id="why-changes" className={h2Cls}>
            MVCA चार्ज क्यों बदलते हैं?
          </h2>
          <p className={pCls}>
            MVCA चार्ज इसलिए बदलते हैं कि बिजली खरीदने की लागत हर महीने बदलती है, जबकि बेस टैरिफ
            अगले टैरिफ ऑर्डर तक स्थिर रहता है।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">वसूली मासिक है।</strong> WBSEDCL बिजली खरीद लागत
              में किसी भी बदलाव को एनर्जी चार्ज के अतिरिक्त MVCA के तहत वसूलती है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">ट्रू-अप सालाना है।</strong> वसूला गया MVCA उस
              साल के फ्यूल एंड पावर परचेज़ कॉस्ट एडजस्टमेंट (FPPCA) और वार्षिक प्रदर्शन समीक्षा
              के दौरान ट्रू-अप के अधीन है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">प्रीपेड उपभोक्ताओं को छूट मिलती है।</strong>{' '}
              प्रीपेड योजना के उपभोक्ताओं को लागू MVCA चार्ज समेत एनर्जी चार्ज पर 3% की छूट
              मिलती है।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            सार: MVCA मासिक अनुमान है और FPPCA उसी लागत का सालाना हिसाब।
          </p>
        </section>

        <section aria-labelledby="other-names" className="mt-10 scroll-mt-20">
          <h2 id="other-names" className={h2Cls}>
            MVCA, VCA, FPPAS और FCA: एक ही बात, अलग नाम
          </h2>
          <p className={pCls}>
            MVCA, VCA, FPPAS और FCA एक ही तरह की लाइन के चार नाम हैं: बिजली खरीद लागत में बदलाव
            का पास-थ्रू। तालिका हर नाम का फुल फॉर्म और इस्तेमाल की जगह बताती है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                बिजली खरीद लागत एडजस्टमेंट शुल्क के नाम, राज्य के अनुसार
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">बिल पर नाम</th>
                  <th className="px-4 py-2 font-semibold">फुल फॉर्म</th>
                  <th className="px-4 py-2 font-semibold">कहां इस्तेमाल होता है</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {nameRows.map(([name, full, where]) => (
                  <tr key={name}>
                    <td className="px-4 py-2 font-medium">{name}</td>
                    <td className="px-4 py-2">{full}</td>
                    <td className="px-4 py-2">{where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            यह लाइन फिक्स्ड चार्ज, एनर्जी चार्ज और इलेक्ट्रिसिटी ड्यूटी के साथ कैसे बैठती है,
            इसके लिए देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA
            </Link>
            । छत्तीसगढ़ के उपभोक्ता{' '}
            <Link
              href="/electricity/chhattisgarh-electricity-bill-calculator"
              className="text-brass underline"
            >
              छत्तीसगढ़ बिजली बिल कैलकुलेटर
            </Link>{' '}
            (अंग्रेज़ी में) से बिल का अनुमान लगा सकते हैं।
          </p>
          <p className={takeawayCls}>
            सार: अगर आपके बिल पर MVCA की जगह VCA या FPPAS लिखा है, तो यह वही व्यवस्था है, बस आपके
            राज्य के नाम से।
          </p>
        </section>

        <section aria-labelledby="estimate" className="mt-10 scroll-mt-20">
          <h2 id="estimate" className={h2Cls}>
            MVCA के साथ पश्चिम बंगाल के बिल का अनुमान कैसे लगाएं
          </h2>
          <p className={pCls}>
            MVCA के साथ पश्चिम बंगाल के बिल का अनुमान लगाने के लिए पहले बेस बिल निकालें और फिर
            अपने पिछले बिल की MVCA लाइन जोड़ें।
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>
              सबसे पहले{' '}
              <Link href="/hi/electricity/wbsedcl-bill-calculator" className="text-brass underline">
                WBSEDCL बिल कैलकुलेटर
              </Link>{' '}
              से एनर्जी चार्ज और फिक्स्ड चार्ज निकालें, जिसमें MVCA और
              इलेक्ट्रिसिटी ड्यूटी शामिल नहीं है।
            </li>
            <li>फिर अपने सबसे हाल के बिल पर छपी प्रति यूनिट MVCA दर देखें।</li>
            <li>इसके बाद उस दर को हर महीने की यूनिट से गुणा करें और नतीजा जोड़ें।</li>
            <li>अंत में इलेक्ट्रिसिटी ड्यूटी जोड़ें, जो बेस अनुमान से बाहर है।</li>
          </ol>
          <p className={`mt-4 ${pCls}`}>
            पूरी स्लैब तालिकाएं हमारी{' '}
            <Link href="/hi/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL बिल गाइड
            </Link>{' '}
            में हैं। आप जिस भी महीने देखें, MVCA चार्ज मंथली वेरिएबल कॉस्ट एडजस्टमेंट ही रहता
            है: प्रति यूनिट का जोड़ जो बिजली खरीद लागत के साथ चलता है।
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            अपना बेस WBSEDCL बिल निकालें
          </h2>
          <p className={`mt-2 ${pCls}`}>
            एनर्जी और फिक्स्ड चार्ज देखने के लिए अपनी यूनिट डालें, फिर अपने बिल की MVCA लाइन
            जोड़ें।
          </p>
          <Link
            href="/hi/electricity/wbsedcl-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            WBSEDCL बिल कैलकुलेटर खोलें →
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
          अंतिम अपडेट: {LAST_UPDATED}। यहां बताए गए MVCA के नियम WBSEDCL के &ldquo;Gist of Tariff
          Order 2025-26&rdquo; से हैं, जो पश्चिम बंगाल विद्युत नियामक आयोग के 20 मार्च 2025 के
          आदेश का सार है। FPPAS का संदर्भ छत्तीसगढ़ राज्य विद्युत नियामक आयोग के FY 2026-27 के
          टैरिफ ऑर्डर से है। MVCA की कोई मौजूदा दर नहीं दी गई है क्योंकि कोई दर सत्यापित नहीं
          हुई। हम आंकड़े कैसे जुटाते और जांचते हैं, इसके लिए हमारी{' '}
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
