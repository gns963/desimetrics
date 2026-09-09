import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/how-telescopic-electricity-slabs-work'
const TITLE = 'टेलिस्कोपिक बिजली स्लैब असल में कैसे काम करते हैं'
const DESCRIPTION =
  'टेलिस्कोपिक बिजली स्लैब से उलझन में हैं? देखें भारतीय बिजली बोर्ड हर स्लैब को अलग से कैसे बिल करते हैं, एक सरल उदाहरण गणना और तुलना तालिका के साथ।'

export const metadata: Metadata = {
  title: 'टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं (सरल गाइड)',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/blog/how-telescopic-electricity-slabs-work'),
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
  datePublished: '2026-09-01',
  dateModified: '2026-09-01',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'क्या मेरे राज्य की बिजली बिलिंग टेलिस्कोपिक है या नॉन-टेलिस्कोपिक?',
    a: 'ज़्यादातर भारतीय राज्य घरेलू (household) कनेक्शन के लिए टेलिस्कोपिक बिलिंग इस्तेमाल करते हैं, लेकिन सटीक संरचना बोर्ड और कनेक्शन श्रेणी के हिसाब से अलग होती है। यह पुष्टि करने के लिए कि आप पर कौन सी लागू होती है, अपना नवीनतम बिजली बिल या अपने बोर्ड का आधिकारिक टैरिफ ऑर्डर जांचें।',
  },
  {
    q: 'क्या टेलिस्कोपिक बिलिंग का मतलब है मैं कुल मिलाकर कम चुकाता हूं?',
    a: 'ज़रूरी नहीं कि कम — इसका मतलब है कि उस स्लैब में जाने से पहले इस्तेमाल की गई यूनिट्स के लिए आपसे कभी ऊंची दर नहीं ली जाती। नॉन-टेलिस्कोपिक बिलिंग कभी-कभी कुल मिलाकर ज़्यादा खर्चीली हो सकती है क्योंकि यह आपके पूरे इस्तेमाल पर ऊंची दर लगा सकती है।',
  },
  {
    q: 'सिर्फ थोड़ी ज़्यादा यूनिट इस्तेमाल करने के बावजूद मेरा बिल इतना क्यों बढ़ गया?',
    a: 'टेलिस्कोपिक बिलिंग के तहत, अकेले एक छोटी इस्तेमाल बढ़ोतरी से बड़ी छलांग नहीं आनी चाहिए, क्योंकि सिर्फ अतिरिक्त यूनिट्स ऊंची दर पर बिल होती हैं। एक तेज़ छलांग की वजह ज़्यादा संभावना है फिक्स्ड-चार्ज बदलाव, मौसमी टैरिफ संशोधन, या एक नॉन-टेलिस्कोपिक श्रेणी हो — अपने बिल का दर ब्यौरा जांचें।',
  },
  {
    q: 'क्या फिक्स्ड चार्ज भी टेलिस्कोपिक होते हैं?',
    a: 'नहीं। फिक्स्ड चार्ज (जिन्हें डिमांड चार्ज भी कहते हैं) आम तौर पर आपके स्वीकृत लोड या कनेक्शन प्रकार पर आधारित एक फ्लैट राशि होती है, टेलिस्कोपिक एनर्जी चार्ज स्लैब से अलग।',
  },
  {
    q: 'क्या कमर्शियल और इंडस्ट्रियल कनेक्शन भी टेलिस्कोपिक बिलिंग इस्तेमाल करते हैं?',
    a: 'कुछ करते हैं, लेकिन कई कमर्शियल और इंडस्ट्रियल टैरिफ अलग संरचनाएं इस्तेमाल करते हैं, जिनमें फ्लैट दरें या डिमांड-आधारित बिलिंग शामिल है। टेलिस्कोपिक स्लैब सबसे ज़्यादा घरेलू टैरिफ से जुड़े होते हैं।',
  },
  {
    q: 'टेलिस्कोपिक स्लैब दरें कितनी बार बदलती हैं?',
    a: 'स्लैब दरें और सीमाएं हर राज्य के बिजली नियामक आयोग द्वारा समय-समय पर संशोधित होती हैं, अक्सर साल में एक बार या टैरिफ याचिका मंज़ूर होने के बाद। मौजूदा दरों के लिए हमेशा अपने बोर्ड के नवीनतम प्रकाशित टैरिफ ऑर्डर का हवाला लें।',
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

const workedExample = [
  { slab: '0–100 यूनिट', units: 100, rate: 3.0, charge: 300 },
  { slab: '101–200 यूनिट', units: 100, rate: 4.5, charge: 450 },
  { slab: '201–300 यूनिट', units: 60, rate: 6.0, charge: 360 },
]
const workedTotal = workedExample.reduce((sum, r) => sum + r.charge, 0)

export default function TelescopicSlabsArticlePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'टेलिस्कोपिक स्लैब', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📘</span> Explainer
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
          · अपडेट 1 सितंबर 2026
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          एक <strong>टेलिस्कोपिक बिजली स्लैब</strong> एक बिलिंग तरीका है जहां
          आपकी बिजली यूनिट्स को रेंज (स्लैब) में बांटा जाता है, और हर स्लैब
          की अपनी दर पर चार्ज होती है — सिर्फ उन यूनिट्स के लिए जो उसके अंदर
          आती हैं। आपकी पहली 100 यूनिट का खर्च ₹3 प्रति यूनिट हो सकता है,
          लेकिन आपकी अगली 100 यूनिट का खर्च ज़्यादा है, आपका पूरा बिल नहीं।
          इसे "टेलिस्कोपिक" इसलिए कहा जाता है क्योंकि दर एक बार में उछलने की
          बजाय, एक टेलिस्कोप की तरह हिस्सों में बाहर की तरफ बढ़ती है।
        </p>

        <section aria-labelledby="what-does-telescopic-mean" className="mt-10 scroll-mt-20">
          <h2 id="what-does-telescopic-mean" className={h2Cls}>
            बिजली बिलिंग में "टेलिस्कोपिक" का क्या मतलब है?
          </h2>
          <div className="space-y-3">
            <p className={pCls}>
              ज़्यादातर भारतीय बिजली बोर्ड — KSEB, BESCOM, TANGEDCO, MSEDCL
              और AEML सहित — घरेलू उपभोक्ताओं को स्लैब से बिल करते हैं। एक
              स्लैब बस यूनिट्स की एक रेंज है, जैसे 0–100 या 101–200।
            </p>
            <p className={pCls}>
              एक <strong>टेलिस्कोपिक टैरिफ</strong> में, हर स्लैब की अपनी दर
              होती है, और वह दर <em>सिर्फ</em> उस स्लैब के अंदर की यूनिट्स
              पर लागू होती है। अगर आप 150 यूनिट इस्तेमाल करते हैं, तो पहली
              100 पहले स्लैब की दर पर बिल होती हैं, और सिर्फ बाकी 50 यूनिट
              दूसरे स्लैब की दर पर जाती हैं।
            </p>
            <p className={pCls}>
              यह एक फ्लैट-रेट प्रणाली से अलग है, जहां आप जो भी यूनिट इस्तेमाल
              करते हैं वह चाहे जितनी भी हो, एक ही दर पर बिल होती है।
            </p>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: टेलिस्कोपिक बिलिंग का मतलब है यूनिट्स का हर स्लैब अपने
            आप में कीमत तय करता है, आपका पूरा इस्तेमाल एक दर पर नहीं।
          </p>
        </section>

        <section aria-labelledby="how-calculated" className="mt-10 scroll-mt-20">
          <h2 id="how-calculated" className={h2Cls}>
            टेलिस्कोपिक स्लैब कैसे गिने जाते हैं (एक सरल उदाहरण के साथ)
          </h2>
          <p className={pCls}>यहां बुनियादी तर्क है, स्टेप बाय स्टेप:</p>
          <ol className="mt-3 space-y-2">
            {[
              'आपकी कुल इस्तेमाल की गई यूनिट्स की तुलना आपके बिजली बोर्ड द्वारा तय स्लैब सीमाओं से की जाती है।',
              'पहले स्लैब के अंदर की यूनिट्स पहले स्लैब की दर पर बिल होती हैं।',
              'अगले स्लैब में जाने वाली कोई भी यूनिट्स उस स्लैब की (आम तौर पर ऊंची) दर पर बिल होती हैं।',
              'यह तब तक जारी रहता है जब तक आपकी सभी यूनिट्स का हिसाब न हो जाए।',
              'फिक्स्ड चार्ज और अन्य ऐड-ऑन से पहले, आपका कुल एनर्जी चार्ज पाने के लिए स्लैब चार्ज को जोड़ा जाता है।',
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
            मान लीजिए एक बोर्ड <strong>उदाहरण के लिए ये दरें</strong> (असली
            मौजूदा टैरिफ नहीं) इस्तेमाल करता है: 0–100 यूनिट पर ₹3.00/यूनिट,
            101–200 यूनिट पर ₹4.50/यूनिट, और 201–300 यूनिट पर ₹6.00/यूनिट।
          </p>
          <p className={pCls}>
            अगर आप 150 यूनिट इस्तेमाल करते हैं, तो आप पहली 100 यूनिट के लिए
            ₹3.00 और बाकी 50 के लिए ₹4.50 चुकाते हैं — सभी 150 के लिए ₹4.50
            नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: आप सिर्फ उन यूनिट्स के लिए ऊंची स्लैब दर चुकाते हैं
            जो असल में उस स्लैब में जाती हैं, कभी अपने पूरे बिल के लिए नहीं।
          </p>
        </section>

        <section aria-labelledby="telescopic-vs-non" className="mt-10 scroll-mt-20">
          <h2 id="telescopic-vs-non" className={h2Cls}>
            टेलिस्कोपिक बनाम नॉन-टेलिस्कोपिक बिलिंग: क्या फर्क है?
          </h2>
          <p className={pCls}>
            <strong>नॉन-टेलिस्कोपिक बिलिंग</strong> के तहत, एक ऊंचे स्लैब
            में जाने से आपका <em>पूरा</em> इस्तेमाल नई, ऊंची दर पर जा सकता
            है — सिर्फ अतिरिक्त यूनिट्स नहीं। इसे कभी-कभी "स्लैब-जंप" या
            "क्लिफ" टैरिफ संरचना कहा जाता है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">टेलिस्कोपिक बिलिंग</th>
                  <th className="px-4 py-2 font-semibold">नॉन-टेलिस्कोपिक बिलिंग</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">यूनिट्स की कीमत कैसे तय होती है</td>
                  <td className="px-4 py-2">हर स्लैब अलग से कीमत होती है</td>
                  <td className="px-4 py-2">पूरा इस्तेमाल उस स्लैब पर कीमत होता है जिसमें आप गिरते हैं</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">स्लैब सीमा पार करना</td>
                  <td className="px-4 py-2">सिर्फ अतिरिक्त यूनिट्स ज़्यादा खर्चीली होती हैं</td>
                  <td className="px-4 py-2">सभी यूनिट्स, पूर्वव्यापी रूप से, ज़्यादा खर्चीली हो सकती हैं</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">बिल में उछाल</td>
                  <td className="px-4 py-2">सहज, धीरे-धीरे बढ़ोतरी</td>
                  <td className="px-4 py-2">1 अतिरिक्त यूनिट के लिए भी तेज़ी से बढ़ सकता है</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">भारत में आम</td>
                  <td className="px-4 py-2">हां, ज़्यादातर घरेलू टैरिफ इस्तेमाल करते हैं</td>
                  <td className="px-4 py-2">कम आम, कभी-कभी अन्य श्रेणियों के लिए इस्तेमाल</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">उपभोक्ता-अनुकूलता</td>
                  <td className="px-4 py-2">आम तौर पर ज़्यादा उचित माना जाता है</td>
                  <td className="px-4 py-2">इस्तेमाल में छोटी बढ़ोतरी को दंडित कर सकता है</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: टेलिस्कोपिक बिलिंग नरम होती है — कुछ अतिरिक्त यूनिट
            इस्तेमाल करने भर से आपको कभी अपने पूरे बिल के लिए दंडित नहीं
            किया जाता।
          </p>
        </section>

        <section aria-labelledby="why-used" className="mt-10 scroll-mt-20">
          <h2 id="why-used" className={h2Cls}>
            बिजली बोर्ड टेलिस्कोपिक स्लैब क्यों इस्तेमाल करते हैं?
          </h2>
          <p className={pCls}>
            टेलिस्कोपिक स्लैब कम-इस्तेमाल वाले घरों के लिए बिजली किफ़ायती
            रखने के लिए बनाए गए हैं, जबकि भारी इस्तेमाल करने वालों से उनके
            अतिरिक्त इस्तेमाल के लिए प्रति यूनिट ज़्यादा चुकाने को कहते हैं।
            यह इनका समर्थन करता है:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['बुनियादी किफ़ायत', 'पहला स्लैब, जो लाइटिंग और पंखों जैसे ज़रूरी इस्तेमाल को कवर करता है, सस्ता रहता है।'],
              ['उचित लागत वसूली', 'भारी उपभोक्ता, जो जनरेशन और इंफ्रास्ट्रक्चर पर ज़्यादा दबाव डालते हैं, ऊंची मार्जिनल दर चुकाते हैं।'],
              ['अनुमानित बिल बढ़ोतरी', 'क्योंकि सिर्फ अतिरिक्त यूनिट्स महंगी होती हैं, बिल अचानक उछलने की बजाय सहज रूप से बढ़ते हैं।'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-electricity" aria-hidden>✓</span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={`mt-3 ${pCls}`}>
            संक्षेप में, एक टेलिस्कोपिक टैरिफ असल में एक बताई गई किफ़ायत
            नीति है: कम इस्तेमाल को सब्सिडी दी जाती है, ज़्यादा इस्तेमाल
            इसे क्रॉस-सब्सिडाइज़ करता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: टेलिस्कोपिक स्लैब छोटे उपभोक्ताओं की किफ़ायत को बड़े
            उपभोक्ताओं से उचित लागत वसूली के साथ संतुलित करते हैं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            असली उदाहरण: टेलिस्कोपिक स्लैब से बिल गिनना
          </h2>
          <p className={pCls}>
            चलिए एक महीने में <strong>260 यूनिट</strong> इस्तेमाल करने वाले
            उपभोक्ता का पूरा हिसाब लगाते हैं, वही{' '}
            <strong>उदाहरण दरें</strong> इस्तेमाल करते हुए जो पहले थीं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्लैब</th>
                  <th className="px-4 py-2 text-right font-semibold">स्लैब में यूनिट</th>
                  <th className="px-4 py-2 text-right font-semibold">दर/यूनिट (उदाहरण)</th>
                  <th className="px-4 py-2 text-right font-semibold">स्लैब चार्ज</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {workedExample.map((r) => (
                  <tr key={r.slab}>
                    <td className="px-4 py-2 font-medium">{r.slab}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{r.units}</td>
                    <td className="px-4 py-2 text-right tabular-nums">₹{r.rate.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right tabular-nums">₹{r.charge.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-mist/60">
                  <td className="px-4 py-2 font-semibold text-ink-navy">
                    कुल (260 यूनिट)
                  </td>
                  <td className="px-4 py-2" />
                  <td className="px-4 py-2" />
                  <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-hub-electricity">
                    ₹{workedTotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            ध्यान दें कि सिर्फ आखिरी 60 यूनिट (201–260) टॉप दर ₹6.00 पर बिल
            होती हैं। पहली 200 यूनिट को अभी भी अपनी मूल, सस्ती स्लैब दरें
            मिलती हैं। यही टेलिस्कोपिक बिलिंग का मुख्य तंत्र है, काम करते
            हुए।
          </p>
          <p className={pCls}>
            आपके असली बिल में फिक्स्ड चार्ज, बिजली शुल्क, और कभी-कभी एक
            फ्यूल कॉस्ट एडजस्टमेंट भी शामिल होता है — ऊपर की स्लैब गणना
            सिर्फ एनर्जी चार्ज वाले हिस्से को कवर करती है। अपने DISCOM पर
            आधारित पूरे ब्यौरे के लिए, हमारे{' '}
            <Link href="/hi/electricity" className="text-brass underline">
              राज्य के हिसाब से बिजली बिल कैलकुलेटर
            </Link>{' '}
            आज़माएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: एक टेलिस्कोपिक बिल असल में कई छोटे बिल हैं — प्रति
            स्लैब एक — जोड़े गए।
          </p>
        </section>

        <section aria-labelledby="which-boards" className="mt-10 scroll-mt-20">
          <h2 id="which-boards" className={h2Cls}>
            कौन से राज्य/बोर्ड टेलिस्कोपिक बिलिंग इस्तेमाल करते हैं?
          </h2>
          <p className={pCls}>
            टेलिस्कोपिक बिलिंग ज़्यादातर भारतीय राज्यों में घरेलू
            उपभोक्ताओं के लिए आदर्श है, हालांकि सटीक स्लैब संख्या, स्लैब
            चौड़ाई, और दरें बोर्ड-दर-बोर्ड काफी अलग होती हैं। KSEB (केरल),
            BESCOM (कर्नाटक), TANGEDCO (तमिलनाडु),{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (महाराष्ट्र)
            </Link>{' '}
            और AEML (मुंबई) जैसे बोर्ड, सभी घरेलू कनेक्शन के लिए किसी न
            किसी रूप में टेलिस्कोपिक स्लैब संरचना इस्तेमाल करते हैं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            चूंकि टैरिफ समय-समय पर संशोधित होते हैं और कनेक्शन प्रकार
            (ग्रामीण/शहरी, सिंगल-फेज/थ्री-फेज, सब्सिडाइज़्ड श्रेणियां, आदि)
            के हिसाब से अलग होते हैं, स्लैब की संख्या और उनकी दरें हर जगह
            एक जैसी नहीं हैं — और समय के साथ बदलती हैं। हमारे{' '}
            <Link href="/hi/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM
            </Link>{' '}
            और अन्य{' '}
            <Link href="/hi/electricity/unit-price" className="text-brass underline">
              राज्य यूनिट-कीमत पेजों
            </Link>{' '}
            पर असली, स्रोत-सत्यापित दरें देखें।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>
              किसी सामान्य आंकड़े पर भरोसा करने की बजाय हमेशा अपने बोर्ड का
              मौजूदा, आधिकारिक टैरिफ ऑर्डर जांचें
            </strong>{' '}
            , क्योंकि दरें और स्लैब सीमाएं समय-समय पर संशोधित होती हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: टेलिस्कोपिक बिलिंग भारत में व्यापक है, लेकिन खास
            स्लैब और दरें हर राज्य बोर्ड द्वारा अलग-अलग तय की जाती हैं और
            समय के साथ बदलती हैं।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/electricity/unit-price"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📍</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                राज्य के हिसाब से 1 यूनिट की कीमत
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपने राज्य की असली मार्जिनल (टॉप-स्लैब) दर देखें।
              </p>
            </Link>
            <Link
              href="/hi/appliances/household-bill-builder"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🏠</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                हाउसहोल्ड बिल बिल्डर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                देखें कोई उपकरण जोड़ने से आप ठीक कब महंगे स्लैब में जाते हैं।
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
          स्रोत: हर DISCOM के लिए राज्य बिजली नियामक आयोग (SERC) टैरिफ
          ऑर्डर। दरें और स्लैब सीमाएं बोर्ड के हिसाब से अलग होती हैं और
          समय-समय पर बदलती हैं — हमेशा अपने बोर्ड के नवीनतम आधिकारिक टैरिफ
          ऑर्डर से पुष्टि करें।
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
