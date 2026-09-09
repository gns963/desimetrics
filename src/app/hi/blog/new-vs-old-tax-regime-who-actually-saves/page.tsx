import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/new-vs-old-tax-regime-who-actually-saves'
const TITLE = 'नई बनाम पुरानी टैक्स रेजीम: असल में कौन बचाता है?'
const DESCRIPTION =
  'FY 2026-27 के लिए नई बनाम पुरानी टैक्स रेजीम — सटीक अंगूठे का नियम, दो हल किए गए सैलरी उदाहरण, और किसके तहत असल में कौन ज़्यादा बचाता है, देखें।'

export const metadata: Metadata = {
  title: 'नई बनाम पुरानी टैक्स रेजीम: असल में कौन बचाता है?',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/blog/new-vs-old-tax-regime-who-actually-saves'),
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
  datePublished: '2026-09-03',
  dateModified: '2026-09-03',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'क्या मैं हर साल पुरानी और नई रेजीम के बीच बदल सकता हूं?',
    a: 'बिना बिज़नेस इनकम वाले सैलरीड लोग अपना रिटर्न फाइल करते वक्त हर वित्तीय वर्ष कोई भी रेजीम चुन सकते हैं — आप बंधे नहीं हैं। बिज़नेस या प्रोफेशनल इनकम वालों के लिए बदलने के नियम ज़्यादा सीमित हैं, अगर यह आप पर लागू होता है तो मौजूदा CBDT गाइडेंस जांचें।',
  },
  {
    q: 'क्या नई टैक्स रेजीम में HRA उपलब्ध है?',
    a: 'नहीं — HRA (हाउस रेंट अलाउंस) छूट उन कटौतियों में से एक है जिसे नई रेजीम अनुमति नहीं देती। अगर आपकी HRA छूट बड़ी है, तो यह फैसला लेने से पहले पुरानी रेजीम से तुलना करने की सबसे मज़बूत वजहों में से एक है।',
  },
  {
    q: 'सेक्शन 87A रिबेट क्या है?',
    a: 'यह एक रिबेट है जो एक निश्चित टैक्सेबल इनकम तक आपकी टैक्स देनदारी को शून्य कर देता है — FY 2026-27 के लिए नई रेजीम के तहत ₹12 लाख, या पुरानी रेजीम के तहत ₹5 लाख। नई रेजीम के ₹75,000 स्टैंडर्ड डिडक्शन के साथ मिलाकर, इसका मतलब है कि लगभग ₹12.75 लाख तक की सकल आय वाले सैलरीड टैक्सपेयर नई रेजीम के तहत कोई टैक्स नहीं देते।',
  },
  {
    q: 'नई रेजीम के तहत मैं अभी भी कौन सी कटौतियां क्लेम कर सकता हूं?',
    a: 'मुख्य रूप से ₹75,000 स्टैंडर्ड डिडक्शन (सैलरीड/पेंशनर्स के लिए) और सेक्शन 80CCD(2) के तहत नियोक्ता का NPS योगदान। ज़्यादातर दूसरी आम कटौतियां — 80C, 80D, HRA, और सेल्फ-ऑक्युपाइड प्रॉपर्टी पर होम लोन ब्याज — सिर्फ पुरानी रेजीम के तहत उपलब्ध हैं।',
  },
  {
    q: 'क्या नई टैक्स रेजीम हमेशा बेहतर होती है?',
    a: 'हमेशा नहीं — अगर आप कम कटौतियां क्लेम करते हैं तो यह आम तौर पर जीतती है, लेकिन अगर आपका HRA, सेक्शन 80C निवेश और होम लोन ब्याज मिलाकर काफी बड़ा आंकड़ा बन जाता है, तो पुरानी रेजीम अपनी ऊंची स्लैब दरों के बावजूद ज़्यादा बचा सकती है। पक्के तौर पर जानने का एकमात्र तरीका है अपने खुद के आंकड़ों के लिए दोनों की तुलना करना।',
  },
  {
    q: 'क्या मुझे पुरानी रेजीम को खुद चुनना है, या यह अपने आप होता है?',
    a: 'अभी नई रेजीम डिफ़ॉल्ट है — अगर आप पुरानी रेजीम चाहते हैं, तो आपको अपना रिटर्न फाइल करते वक्त या अपने नियोक्ता को निवेश घोषणाएं जमा करते वक्त इसे खुद चुनना होगा।',
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

const rowCls = 'px-4 py-2.5'
const rowLabelCls = `${rowCls} font-medium text-ash/70`
const rowValCls = `${rowCls} text-right font-display font-bold tabular-nums text-hub-financial`

const exampleA = [
  ['सकल सैलरी', '₹15,00,000'],
  ['क्लेम की गई कटौतियां (पुरानी रेजीम)', '₹0 (न्यूनतम)'],
  ['नई रेजीम — टैक्सेबल इनकम', '₹14,25,000'],
  ['नई रेजीम — कुल टैक्स', '₹97,500'],
  ['पुरानी रेजीम — टैक्सेबल इनकम', '₹14,50,000'],
  ['पुरानी रेजीम — कुल टैक्स', '₹2,57,400'],
  ['विजेता', 'नई रेजीम, ₹1,59,900 से'],
]

const exampleB = [
  ['सकल सैलरी', '₹15,00,000'],
  ['क्लेम की गई कटौतियां (पुरानी रेजीम)', '₹6,50,000 (80C ₹1.5L + HRA ~₹3L + होम लोन ब्याज ₹2L)'],
  ['नई रेजीम — टैक्सेबल इनकम', '₹14,25,000'],
  ['नई रेजीम — कुल टैक्स', '₹97,500'],
  ['पुरानी रेजीम — टैक्सेबल इनकम', '₹8,00,000'],
  ['पुरानी रेजीम — कुल टैक्स', '₹75,400'],
  ['विजेता', 'पुरानी रेजीम, ₹22,100 से'],
]

export default function TaxRegimeArticlePageHi() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'नई बनाम पुरानी टैक्स रेजीम', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🧮</span> Explainer
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
          · अपडेट 3 सितंबर 2026
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          एक अंगूठे के नियम के तौर पर: अगर आप <strong>कम कटौतियां</strong>{' '}
          क्लेम करते हैं — बहुत कम या कोई HRA, 80C या होम लोन ब्याज नहीं —
          तो <strong>नई रेजीम आम तौर पर ज़्यादा बचाती है</strong>। अगर
          आपका HRA, सेक्शन 80C निवेश और होम लोन ब्याज मिलाकर एक बड़ा
          आंकड़ा बनते हैं, तो <strong>पुरानी रेजीम अभी भी जीत सकती है</strong>,
          अपनी ऊंची स्लैब दरों के बावजूद। इसका कोई एक सार्वभौमिक जवाब नहीं
          है — यह आपकी अपनी कटौती के कुल योग पर निर्भर करता है।
        </p>

        <section aria-labelledby="new-slabs" className="mt-10 scroll-mt-20">
          <h2 id="new-slabs" className={h2Cls}>
            मौजूदा नई रेजीम टैक्स स्लैब क्या हैं (FY 2026-27)?
          </h2>
          <p className={pCls}>
            बजट 2026 ने FY 2026-27 (AY 2027-28) के लिए बजट 2025 से नई
            रेजीम के स्लैब अपरिवर्तित रखे:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">आय स्लैब</th>
                  <th className="px-4 py-2 text-right font-semibold">दर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['₹0 – ₹4,00,000', 'शून्य'],
                  ['₹4,00,000 – ₹8,00,000', '5%'],
                  ['₹8,00,000 – ₹12,00,000', '10%'],
                  ['₹12,00,000 – ₹16,00,000', '15%'],
                  ['₹16,00,000 – ₹20,00,000', '20%'],
                  ['₹20,00,000 – ₹24,00,000', '25%'],
                  ['₹24,00,000 से ऊपर', '30%'],
                ].map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            इन स्लैब के ऊपर, सैलरीड कर्मचारियों और पेंशनरों को{' '}
            <strong>₹75,000 स्टैंडर्ड डिडक्शन</strong> मिलता है — एक फ्लैट
            राशि जो टैक्स गिनने से पहले आपकी सैलरी से घटाई जाती है, कोई
            सबूत नहीं चाहिए। एक <strong>सेक्शन 87A रिबेट</strong> (एक
            क्रेडिट जो एक सीमा तक आपके टैक्स बिल को रद्द कर देता है) फिर
            ₹12 लाख <em>टैक्सेबल</em> इनकम तक देय टैक्स को शून्य कर देता है
            — स्टैंडर्ड डिडक्शन लगने के बाद असरदार तरीके से लगभग{' '}
            <strong>₹12.75 लाख सकल सैलरी</strong> तक।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: नई रेजीम के तहत, लगभग ₹12.75 लाख सालाना तक कमाने
            वाला एक सैलरीड टैक्सपेयर बिल्कुल कोई इनकम टैक्स नहीं देता।
          </p>
        </section>

        <section aria-labelledby="old-slabs" className="mt-10 scroll-mt-20">
          <h2 id="old-slabs" className={h2Cls}>
            पुरानी रेजीम के टैक्स स्लैब और कटौतियां क्या हैं?
          </h2>
          <p className={pCls}>पुरानी रेजीम पारंपरिक स्लैब संरचना इस्तेमाल करती है:</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">आय स्लैब</th>
                  <th className="px-4 py-2 text-right font-semibold">दर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['₹0 – ₹2,50,000', 'शून्य'],
                  ['₹2,50,000 – ₹5,00,000', '5%'],
                  ['₹5,00,000 – ₹10,00,000', '20%'],
                  ['₹10,00,000 से ऊपर', '30%'],
                ].map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            पुरानी रेजीम की दरें हर स्लैब पर ऊंची दिखती हैं — लेकिन यह ऐसी
            कटौतियों की अनुमति देती है जो नई रेजीम नहीं देती:{' '}
            <strong>HRA छूट</strong> (आपके हाउस रेंट अलाउंस का टैक्स-फ्री
            हिस्सा), <strong>सेक्शन 80C</strong> (PPF, ELSS, लाइफ इंश्योरेंस
            और इसी तरह के लिए ₹1.5 लाख तक), <strong>सेक्शन 80D</strong>{' '}
            (हेल्थ इंश्योरेंस प्रीमियम), और सेल्फ-ऑक्युपाइड प्रॉपर्टी पर{' '}
            <strong>होम लोन ब्याज</strong> (सेक्शन 24b), साथ ही एक छोटा
            ₹50,000 स्टैंडर्ड डिडक्शन।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: पुरानी रेजीम ऊंची स्लैब दरों को कटौतियों की लंबी
            लिस्ट से बदलती है — यह सिर्फ तब जीतती है जब वे कटौतियां दर के
            फर्क को पूरा करने के लिए काफी बड़ी हों।
          </p>
        </section>

        <section aria-labelledby="comparison" className="mt-10 scroll-mt-20">
          <h2 id="comparison" className={h2Cls}>
            नई और पुरानी रेजीम के बीच मुख्य अंतर
          </h2>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">नई रेजीम</th>
                  <th className="px-4 py-2 font-semibold">पुरानी रेजीम</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">स्टैंडर्ड डिडक्शन</td>
                  <td className="px-4 py-2">₹75,000</td>
                  <td className="px-4 py-2">₹50,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">87A रिबेट सीमा</td>
                  <td className="px-4 py-2">₹12,00,000 टैक्सेबल इनकम</td>
                  <td className="px-4 py-2">₹5,00,000 टैक्सेबल इनकम</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">HRA छूट</td>
                  <td className="px-4 py-2">अनुमति नहीं</td>
                  <td className="px-4 py-2">अनुमति है</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">सेक्शन 80C, 80D</td>
                  <td className="px-4 py-2">अनुमति नहीं</td>
                  <td className="px-4 py-2">अनुमति है</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">होम लोन ब्याज (24b)</td>
                  <td className="px-4 py-2">अनुमति नहीं (सेल्फ-ऑक्युपाइड)</td>
                  <td className="px-4 py-2">अनुमति है, ₹2,00,000 तक</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">डिफ़ॉल्ट रेजीम</td>
                  <td className="px-4 py-2">हां, अपने आप लागू</td>
                  <td className="px-4 py-2">खुद चुनना होगा</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">सबसे उपयुक्त</td>
                  <td className="px-4 py-2">कम/कोई कटौती नहीं क्लेम करनी</td>
                  <td className="px-4 py-2">ऊंचा HRA, 80C, होम लोन ब्याज</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: पुरानी रेजीम की हर कटौती वाली लाइन नई रेजीम पर
            डिफ़ॉल्ट होने से पहले कम से कम तुलना चलाने की एक वजह है।
          </p>
        </section>

        <section aria-labelledby="new-wins" className="mt-10 scroll-mt-20">
          <h2 id="new-wins" className={h2Cls}>
            नई रेजीम के तहत असल में कौन ज़्यादा बचाता है?
          </h2>
          <ul className="space-y-2">
            {[
              'आप किराया नहीं देते, या आपकी HRA छूट छोटी होगी।',
              'आपने सेक्शन 80C के तहत ज़्यादा (या कुछ भी) निवेश नहीं किया।',
              'आपका होम लोन नहीं है, या आप पहले ही उसे चुका चुके हैं।',
              'आप कम सबूत और घोषणाओं के साथ एक सरल रिटर्न चाहते हैं।',
              'पुरानी रेजीम के तहत आपकी कुल व्यावहारिक कटौतियां ₹1–1.5 लाख से काफी कम होंगी।',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className={pCls}>{t}</span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: नई रेजीम उन टैक्सपेयर के लिए जीतती है जो वैसे भी
            पुरानी रेजीम के तहत ज़्यादा क्लेम नहीं करते।
          </p>
        </section>

        <section aria-labelledby="old-wins" className="mt-10 scroll-mt-20">
          <h2 id="old-wins" className={h2Cls}>
            पुरानी रेजीम के तहत असल में कौन ज़्यादा बचाता है?
          </h2>
          <ul className="space-y-2">
            {[
              'आप काफी किराया चुकाते हैं और एक बड़ी HRA छूट क्लेम करेंगे।',
              'आप अपनी ₹1.5 लाख सेक्शन 80C सीमा पूरी करते हैं (या करीब पहुंचते हैं)।',
              'आप एक सेल्फ-ऑक्युपाइड प्रॉपर्टी पर होम लोन चुका रहे हैं।',
              'आप हेल्थ इंश्योरेंस के लिए भुगतान करते हैं और सेक्शन 80D क्लेम करेंगे।',
              'आपकी मिली-जुली कटौतियां आराम से लगभग ₹4–5 लाख से ज़्यादा हैं।',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-financial" aria-hidden>✓</span>
                <span className={pCls}>{t}</span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: पुरानी रेजीम तब जीतती है जब कई कटौतियां एक साथ जमा
            होती हैं — शायद ही कभी अकेले एक से।
          </p>
        </section>

        <section aria-labelledby="worked-examples" className="mt-10 scroll-mt-20">
          <h2 id="worked-examples" className={h2Cls}>
            असली उदाहरण: वही सैलरी, दो रेजीम, दो नतीजे
          </h2>
          <p className={pCls}>
            नीचे दोनों उदाहरण वही <strong>₹15,00,000 सकल सैलरी</strong>{' '}
            इस्तेमाल करते हैं — सिर्फ क्लेम की गई कटौतियां बदलती हैं। सभी
            आंकड़े ऊपर की सटीक FY 2026-27 स्लैब और रिबेट नियमों का इस्तेमाल
            करके गिने गए हैं।
          </p>

          <h3 className="font-display mt-6 mb-2 text-lg font-bold text-ink-navy">
            उदाहरण A: न्यूनतम कटौतियां
          </h3>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {exampleA.map(([label, value]) => (
                  <tr key={label}>
                    <td className={rowLabelCls}>{label}</td>
                    <td className={rowValCls}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display mt-6 mb-2 text-lg font-bold text-ink-navy">
            उदाहरण B: ऊंचा HRA + 80C + होम लोन ब्याज
          </h3>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {exampleB.map(([label, value]) => (
                  <tr key={label}>
                    <td className={rowLabelCls}>{label}</td>
                    <td className={rowValCls}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={`mt-4 ${pCls}`}>
            वही सैलरी, उल्टा विजेता — उदाहरण A में नई रेजीम लगभग ₹1.6 लाख
            बचाती है, जबकि उदाहरण B की बड़ी कटौतियां नतीजा पलट देती हैं,
            पुरानी रेजीम इसकी बजाय लगभग ₹22,100 बचाती है। किसी भी उदाहरण
            पर भरोसा करने की बजाय हमारे{' '}
            <Link href="/hi/financial/new-vs-old-tax-regime-calculator" className="text-brass underline">
              नई बनाम पुरानी टैक्स रेजीम कैलकुलेटर
            </Link>{' '}
            से अपनी खुद की सैलरी और कटौतियां निकालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: बिल्कुल वही सैलरी किसी भी रेजीम के पक्ष में जा सकती
            है — फैसला करने वाला कारक हमेशा आपकी अपनी कटौती का कुल योग है,
            सैलरी खुद नहीं।
          </p>
        </section>

        <section aria-labelledby="how-to-decide" className="mt-10 scroll-mt-20">
          <h2 id="how-to-decide" className={h2Cls}>
            आपके लिए कौन सी रेजीम सही है, यह कैसे तय करें
          </h2>
          <ol className="space-y-2">
            {[
              'अपनी व्यावहारिक पुरानी-रेजीम कटौतियां जोड़ें: HRA छूट, सेक्शन 80C निवेश, सेक्शन 80D प्रीमियम, और होम लोन ब्याज (सेल्फ-ऑक्युपाइड प्रॉपर्टी के लिए ₹2 लाख तक)।',
              'अगर वह कुल छोटा है (₹1–1.5 लाख से काफी कम), तो नई रेजीम के जीतने की बहुत संभावना है।',
              'अगर वह कुल बड़ा है (₹4–5 लाख या ज़्यादा, उदाहरण B की तरह), दोनों की ठीक से तुलना करें — पुरानी रेजीम अच्छी तरह जीत सकती है।',
              'बीच में कुछ भी हो, तो अंदाज़ा लगाने की बजाय दोनों आंकड़े एक कैलकुलेटर में डालें।',
              'याद रखें नई रेजीम अब डिफ़ॉल्ट है — अगर आप पुरानी रेजीम चाहते हैं तो आपको इसे खुद चुनना होगा।',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-financial font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={`mt-4 ${pCls}`}>
            यह लेख सामान्य जानकारी है, कोई व्यक्तिगत वित्तीय या टैक्स सलाह
            नहीं — व्यक्तिगत परिस्थितियां अलग होती हैं, और एक सीधी सैलरीड
            स्थिति से आगे कुछ भी हो तो किसी CA या टैक्स सलाहकार से परामर्श
            करना फायदेमंद है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: संदेह होने पर, अपनी असली कटौतियां जोड़ें और दोनों
            रेजीम की सीधे तुलना करें — यह न मानें कि कोई एक अपने आप बेहतर
            है।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/financial/new-vs-old-tax-regime-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-financial/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🏦</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                नई बनाम पुरानी टैक्स रेजीम कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपनी खुद की सैलरी और कटौतियां दोनों रेजीम में चलाएं।
              </p>
            </Link>
            <Link
              href="/hi/financial"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-financial/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🧮</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                सभी फाइनेंशियल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                FY 2026-27 के लिए GST, SIP, और ग्रेच्युटी कैलकुलेटर।
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
          टैक्स स्लैब, रिबेट सीमाएं और कटौती की सीमाएं यूनियन बजट द्वारा तय
          होती हैं और हर साल बदल सकती हैं। यह लेख FY 2026-27 (AY 2027-28)
          के आंकड़े कवर करता है — फाइल करने से पहले हमेशा आधिकारिक इनकम
          टैक्स डिपार्टमेंट वेबसाइट (incometax.gov.in) पर मौजूदा साल के
          स्लैब की पुष्टि करें, और यह किसी योग्य CA या टैक्स सलाहकार की
          सलाह का विकल्प नहीं है।
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
