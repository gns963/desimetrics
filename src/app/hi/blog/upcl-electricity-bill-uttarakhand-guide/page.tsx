import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/upcl-electricity-bill-uttarakhand-guide'
const TITLE = 'UPCL बिल समझिए: उत्तराखंड का बिजली टैरिफ, फिक्स्ड चार्ज और बिल कैसे देखें'
const DESCRIPTION =
  'उत्तराखंड में UPCL का बिल ₹3.65 से ₹7.80 प्रति यूनिट के स्लैब-वार एनर्जी चार्ज और ₹75 से ₹100 प्रति kW के फिक्स्ड चार्ज से बनता है। FY 2026-27 की दरें, 250 यूनिट का उदाहरण और बिल देखने का तरीका जानिए।'
const LAST_UPDATED = '5 अक्टूबर 2026'

export const metadata: Metadata = {
  title: 'UPCL बिल: उत्तराखंड टैरिफ स्लैब और फिक्स्ड चार्ज 2026-27',
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
    q: 'UPCL का बिल कैसे निकाला जाता है?',
    a: 'UPCL का घरेलू बिल चार स्लैब में लगने वाले एनर्जी चार्ज (₹3.65, ₹5.25, ₹7.15 और ₹7.80 प्रति यूनिट) और स्वीकृत लोड पर लगने वाले फिक्स्ड चार्ज (₹75, ₹85 या ₹100 प्रति kW प्रति माह) को जोड़कर बनता है। इसके ऊपर इलेक्ट्रिसिटी ड्यूटी, ग्रीन एनर्जी सेस और मासिक फ्यूल एंड पावर परचेज़ कॉस्ट एडजस्टमेंट जुड़ता है।',
  },
  {
    q: '2026-27 में UPCL की प्रति यूनिट दर क्या है?',
    a: 'FY 2026-27 के लिए UPCL की घरेलू दर महीने में 100 यूनिट तक ₹3.65 प्रति यूनिट, 101-200 यूनिट पर ₹5.25, 201-400 यूनिट पर ₹7.15 और 400 यूनिट से ऊपर ₹7.80 है। यह उत्तराखंड विद्युत नियामक आयोग के 1 अप्रैल 2026 से लागू रेट शेड्यूल के अनुसार है।',
  },
  {
    q: 'क्या 2026 में UPCL का टैरिफ बढ़ा?',
    a: 'नहीं। UPCL ने घरेलू स्लैब को ₹4.23, ₹6.09, ₹8.29 और ₹9.04 प्रति यूनिट करने का प्रस्ताव दिया था, लेकिन 1 अप्रैल 2026 से लागू मंज़ूर रेट शेड्यूल में घरेलू एनर्जी और फिक्स्ड चार्ज पहले के स्तर पर ही रखे गए हैं।',
  },
  {
    q: 'UPCL के घरेलू कनेक्शन पर फिक्स्ड चार्ज कितना है?',
    a: 'UPCL का घरेलू फिक्स्ड चार्ज 1 kW तक के स्वीकृत लोड पर ₹75 प्रति kW प्रति माह, 1 kW से ऊपर और 4 kW तक ₹85 प्रति kW प्रति माह, और 4 kW से ऊपर ₹100 प्रति kW प्रति माह है। 2 kW का कनेक्शन महीने में ₹170 चुकाता है।',
  },
  {
    q: 'BPL या लाइफलाइन उपभोक्ताओं के लिए UPCL की दर क्या है?',
    a: 'गरीबी रेखा से नीचे और कुटीर ज्योति उपभोक्ता, जिनका लोड 1 kW तक और खपत महीने में 60 यूनिट तक है, ₹18 प्रति कनेक्शन प्रति माह और ₹1.85 प्रति यूनिट चुकाते हैं।',
  },
  {
    q: 'मैं अपना UPCL बिल ऑनलाइन कैसे देखूं?',
    a: 'UPCL की वेबसाइट upcl.org खोलें, क्विक बिल पेमेंट या ऑनलाइन पेमेंट का विकल्प चुनें, और अपना सर्विस कनेक्शन या अकाउंट नंबर डालें। UPCL का हेल्पलाइन नंबर 1912 है।',
  },
  {
    q: 'क्या UPCL और UPPCL एक ही हैं?',
    a: 'नहीं। UPCL उत्तराखंड पावर कॉर्पोरेशन लिमिटेड है, जो उत्तराखंड में बिजली देती है। UPPCL उत्तर प्रदेश पावर कॉर्पोरेशन लिमिटेड है, जो उत्तर प्रदेश के लिए है। दोनों के नियामक और टैरिफ अलग हैं।',
  },
  {
    q: 'क्या प्रीपेड मीटर वाले उपभोक्ताओं को UPCL से छूट मिलती है?',
    a: 'हां। FY 2026-27 के रेट शेड्यूल के तहत प्रीपेड मीटरिंग योजना के घरेलू उपभोक्ताओं को प्रीपेड मीटर लगने और चालू होने की तारीख से एनर्जी चार्ज पर 4% की छूट मिलती है।',
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

const slabRows: [string, string, string][] = [
  ['100 यूनिट तक', '₹3.65', '₹4.23'],
  ['101–200 यूनिट', '₹5.25', '₹6.09'],
  ['201–400 यूनिट', '₹7.15', '₹8.29'],
  ['400 यूनिट से ऊपर', '₹7.80', '₹9.04'],
]

const fixedRows: [string, string, string][] = [
  ['1 kW तक', '₹75 प्रति kW', '1 kW पर ₹75'],
  ['1 kW से ऊपर और 4 kW तक', '₹85 प्रति kW', '2 kW पर ₹170'],
  ['4 kW से ऊपर', '₹100 प्रति kW', '5 kW पर ₹500'],
]

const exampleRows: [string, string][] = [
  ['महीने में खपत हुई यूनिट', '250'],
  ['स्वीकृत लोड', '2 kW'],
  ['पहली 100 यूनिट × ₹3.65', '₹365.00'],
  ['अगली 100 यूनिट × ₹5.25', '₹525.00'],
  ['अगली 50 यूनिट × ₹7.15', '₹357.50'],
  ['एनर्जी चार्ज', '₹1,247.50'],
  ['फिक्स्ड चार्ज, 2 kW × ₹85', '₹170.00'],
  ['ड्यूटी, सेस और एडजस्टमेंट से पहले कुल', '₹1,417.50'],
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

export default function UpclBillGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'UPCL बिल गाइड', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🏔️</span> उत्तराखंड · UPCL
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
            UPCL बिल उत्तराखंड पावर कॉर्पोरेशन लिमिटेड (UPCL) का मासिक बिजली बिल है
          </strong>
          , और घर के लिए इसके दो मुख्य हिस्से हैं: चार स्लैब में ₹3.65 से ₹7.80 प्रति यूनिट का
          एनर्जी चार्ज, और स्वीकृत लोड पर ₹75 से ₹100 प्रति kW का फिक्स्ड चार्ज। ये दरें
          उत्तराखंड विद्युत नियामक आयोग (UERC) के 1 अप्रैल 2026 से लागू रेट शेड्यूल की हैं। यह
          गाइड UPCL के टैरिफ स्लैब और फिक्स्ड चार्ज बताती है, 250 यूनिट का बिल निकालकर दिखाती
          है, और UPCL बिल ऑनलाइन देखने का तरीका समझाती है।
        </p>

        <section aria-labelledby="slabs" className="mt-10 scroll-mt-20">
          <h2 id="slabs" className={h2Cls}>
            2026-27 के लिए UPCL के टैरिफ स्लैब क्या हैं?
          </h2>
          <p className={pCls}>
            2026-27 के लिए UPCL के टैरिफ स्लैब चार मासिक बैंड हैं, जिनकी दर ₹3.65 से ₹7.80 प्रति
            यूनिट है। तालिका हर स्लैब की मंज़ूर दर के साथ वह दर दिखाती है जो UPCL ने प्रस्तावित
            की थी।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                UPCL का घरेलू एनर्जी चार्ज, मासिक स्लैब के अनुसार, मंज़ूर और प्रस्तावित, FY 2026-27
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">मासिक खपत</th>
                  <th className="px-4 py-2 font-semibold">मंज़ूर दर प्रति यूनिट</th>
                  <th className="px-4 py-2 font-semibold">UPCL का प्रस्ताव</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {slabRows.map(([slab, approved, proposed]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 tabular-nums">{approved}</td>
                    <td className="px-4 py-2 tabular-nums text-ash/60">{proposed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            UERC ने प्रस्तावित बढ़ोतरी नहीं मानी। UPCL की याचिका में घरेलू स्लैब में औसतन 15.72%
            बढ़ोतरी मांगी गई थी, और FY 2024-25 के ट्रू-अप तथा FY 2026-27 की वार्षिक राजस्व
            आवश्यकता पर UERC के आदेश का रेट शेड्यूल पहले की घरेलू दरें ही रखता है।
          </p>
          <p className={takeawayCls}>
            सार: 2026-27 में घरों के लिए UPCL की प्रति यूनिट दर ₹3.65 से ₹7.80 पर बिना बदलाव के है।
          </p>
        </section>

        <section aria-labelledby="fixed" className="mt-10 scroll-mt-20">
          <h2 id="fixed" className={h2Cls}>
            UPCL का फिक्स्ड चार्ज कितना है?
          </h2>
          <p className={pCls}>
            UPCL का फिक्स्ड चार्ज स्वीकृत लोड के प्रति kW पर लगने वाली मासिक रकम है, और कनेक्शन
            बड़ा होने पर प्रति kW दर बढ़ती है। तालिका तीनों लोड बैंड एक-एक उदाहरण के साथ देती है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                UPCL का घरेलू मासिक फिक्स्ड चार्ज, स्वीकृत लोड के अनुसार, FY 2026-27
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्वीकृत लोड</th>
                  <th className="px-4 py-2 font-semibold">फिक्स्ड चार्ज प्रति माह</th>
                  <th className="px-4 py-2 font-semibold">उदाहरण</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {fixedRows.map(([load, rate, example]) => (
                  <tr key={load}>
                    <td className="px-4 py-2 font-medium">{load}</td>
                    <td className="px-4 py-2 tabular-nums">{rate}</td>
                    <td className="px-4 py-2 tabular-nums">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            फिक्स्ड चार्ज इस्तेमाल हुई यूनिट के साथ नहीं बदलता। उसी शेड्यूल में दो और घरेलू दरें
            इन बैंड से बाहर हैं।
          </p>
          <ul className="mt-3 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">BPL और लाइफलाइन उपभोक्ता</strong>, जिनका लोड 1
              kW तक और खपत महीने में 60 यूनिट तक है, ₹18 प्रति कनेक्शन प्रति माह और ₹1.85 प्रति
              यूनिट चुकाते हैं।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">हिमाच्छादित क्षेत्रों के घरेलू उपभोक्ता</strong>,
              जिन क्षेत्रों को जिलाधिकारी ने अधिसूचित किया है, शेड्यूल RTS-1A के तहत ₹1.85 प्रति
              यूनिट चुकाते हैं।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            सार: UPCL बिल में फिक्स्ड चार्ज स्वीकृत लोड पर निर्भर है, इसलिए 2 kW का घर एक भी
            यूनिट इस्तेमाल करने से पहले महीने में ₹170 चुकाता है।
          </p>
        </section>

        <section aria-labelledby="example" className="mt-10 scroll-mt-20">
          <h2 id="example" className={h2Cls}>
            250 यूनिट का UPCL बिल कैसे निकलता है?
          </h2>
          <p className={pCls}>
            2 kW के कनेक्शन पर 250 यूनिट का UPCL बिल ड्यूटी, सेस और मासिक एडजस्टमेंट से पहले
            ₹1,417.50 आता है। तालिका हर चरण स्लैब-दर-स्लैब दिखाती है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                2 kW कनेक्शन पर 250 यूनिट के लिए UPCL घरेलू बिल का उदाहरण
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
            अपनी यूनिट और लोड से हिसाब लगाने के लिए{' '}
            <Link
              href="/electricity/uttarakhand-electricity-bill-calculator"
              className="text-brass underline"
            >
              उत्तराखंड बिजली बिल कैलकुलेटर
            </Link>{' '}
            (अंग्रेज़ी में) इस्तेमाल करें। स्लैब बिलिंग आम तौर पर कैसे काम करती है, इसके लिए
            देखें{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलीस्कोपिक बिजली स्लैब कैसे काम करते हैं
            </Link>
            ।
          </p>
          <p className={takeawayCls}>
            सार: 250 यूनिट पर एनर्जी चार्ज ₹1,247.50 और फिक्स्ड चार्ज ₹170 है।
          </p>
        </section>

        <section aria-labelledby="other-lines" className="mt-10 scroll-mt-20">
          <h2 id="other-lines" className={h2Cls}>
            UPCL बिल पर और क्या दिखता है?
          </h2>
          <p className={pCls}>
            UPCL बिल में एनर्जी और फिक्स्ड चार्ज के अलावा तीन लाइनें होती हैं, और उनमें से दो
            UERC तय नहीं करता।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">इलेक्ट्रिसिटी ड्यूटी</strong> उत्तराखंड सरकार तय
              करती है। UPCL इसे बिल पर वसूलकर राज्य को देती है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">ग्रीन एनर्जी सेस</strong> भी राज्य का शुल्क है;
              UERC के आदेश में दर्ज है कि इसे लगाने या हटाने में आयोग की कोई भूमिका नहीं है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">फ्यूल एंड पावर परचेज़ कॉस्ट एडजस्टमेंट</strong>{' '}
              एक मासिक शुल्क है जो UPCL की बिजली खरीद लागत में बदलाव को आगे पहुंचाता है। ऐसी
              लाइन को हमारी गाइड{' '}
              <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
                फिक्स्ड चार्ज बनाम FCA
              </Link>{' '}
              समझाती है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            हम इन तीनों लाइनों की कोई दर नहीं बताते, क्योंकि हमने इनके मौजूदा आंकड़े सत्यापित
            नहीं किए हैं। उसी रेट शेड्यूल के तहत प्रीपेड मीटर वाले घरेलू उपभोक्ताओं को एनर्जी
            चार्ज पर 4% की छूट भी मिलती है।
          </p>
          <p className={takeawayCls}>
            सार: ऊपर निकाला गया कुल आधार है; आपका छपा हुआ UPCL बिल ड्यूटी, सेस और उस महीने के
            एडजस्टमेंट जितना ज़्यादा होता है।
          </p>
        </section>

        <section aria-labelledby="check-bill" className="mt-10 scroll-mt-20">
          <h2 id="check-bill" className={h2Cls}>
            अपना UPCL बिल ऑनलाइन कैसे देखें
          </h2>
          <p className={pCls}>
            UPCL बिल ऑनलाइन देखने के लिए अपने अकाउंट नंबर के साथ UPCL की अपनी वेबसाइट इस्तेमाल
            करें। देखने और चुकाने के चरण एक जैसे हैं।
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>सबसे पहले UPCL की वेबसाइट upcl.org खोलें।</li>
            <li>फिर क्विक बिल पेमेंट या ऑनलाइन पेमेंट का विकल्प चुनें।</li>
            <li>इसके बाद अपना सर्विस कनेक्शन या अकाउंट नंबर डालें, जो पुराने बिल पर छपा होता है।</li>
            <li>अंत में बिल की रकम और आखिरी तारीख देखें, और चाहें तो ऑनलाइन भुगतान करें।</li>
          </ol>
          <p className={`mt-4 ${pCls}`}>
            बिलिंग की शिकायत या बिजली कटौती के लिए UPCL का हेल्पलाइन नंबर 1912 है। UPCL और UPPCL
            अलग हैं: उत्तर प्रदेश के उपभोक्ताओं को दूसरी कंपनी बिजली देती है, जिसे हमारी{' '}
            <Link href="/hi/blog/uppcl-complete-guide-electricity-bill" className="text-brass underline">
              UPPCL बिल गाइड
            </Link>{' '}
            कवर करती है।
          </p>
          <p className={takeawayCls}>
            सार: अपना अकाउंट नंबर पास रखें; UPCL बिल देखने के लिए सिर्फ यही जानकारी चाहिए।
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            अपने UPCL बिल का अनुमान लगाएं
          </h2>
          <p className={`mt-2 ${pCls}`}>
            अपनी यूनिट और स्वीकृत लोड डालें, और देखें कि उत्तराखंड का बिल स्लैब-दर-स्लैब कैसे
            बनता है।
          </p>
          <Link
            href="/electricity/uttarakhand-electricity-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            उत्तराखंड बिल कैलकुलेटर खोलें →
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
          अंतिम अपडेट: {LAST_UPDATED}। टैरिफ स्लैब, फिक्स्ड चार्ज, BPL और हिमाच्छादित क्षेत्र की
          दरें तथा प्रीपेड छूट उत्तराखंड विद्युत नियामक आयोग के उस आदेश के 1 अप्रैल 2026 से लागू
          रेट शेड्यूल से हैं, जो UPCL के FY 2024-25 के ट्रू-अप, FY 2025-26 की वार्षिक प्रदर्शन
          समीक्षा और FY 2026-27 की वार्षिक राजस्व आवश्यकता पर है। प्रस्तावित दरें UPCL की टैरिफ
          याचिका से हैं। बिल देखने के चरण और हेल्पलाइन नंबर तीसरे पक्ष की पेमेंट गाइड से हैं,
          सीधे UPCL से नहीं। हम आंकड़े कैसे जुटाते और जांचते हैं, इसके लिए हमारी{' '}
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
