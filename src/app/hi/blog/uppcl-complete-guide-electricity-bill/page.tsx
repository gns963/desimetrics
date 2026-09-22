import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/uppcl-complete-guide-electricity-bill'
const TITLE = 'UPPCL बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित UPPCL टैरिफ स्लैब, फिक्स्ड चार्ज, मीटर रेंट, ट्रू-अप और ड्यूटी दर एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल, इंडस्ट्रियल और कृषि टेबल, एक उदाहरण गणना, और अपना UP बिजली बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '11 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '29 अगस्त 2026'

export const metadata: Metadata = {
  title: 'UPPCL पूरी बिल गाइड — टैरिफ स्लैब, चार्ज और ड्यूटी 2026',
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

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'UPPCL रेजिडेंशियल (LMV-1) टैरिफ स्लैब',
  description: 'उत्तर प्रदेश (UPPCL) के लिए टेलिस्कोपिक शहरी घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://uppcl.org/site/writereaddata/siteContent/202511241802081345Press%20English%20FY%202025%2026.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://www.uperc.org/App_File/UPPCLTariffOrderFY2025-26-pdf1122202564623PM.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा UPPCL बिजली बिल कैसे गिना जाता है?',
    a: 'आपके शहरी घरेलू UPPCL बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (₹5.50 से ₹7.00/यूनिट तक चार बैंड), स्वीकृत लोड के प्रति kW ₹110 का फिक्स्ड चार्ज, ₹20 मीटर रेंट, ₹0.15/यूनिट रेगुलेटरी ट्रू-अप, और एनर्जी चार्ज पर 5% इलेक्ट्रिसिटी ड्यूटी जुड़ती है।',
  },
  {
    q: 'UPPCL के मौजूदा घरेलू (LMV-1) टैरिफ स्लैब क्या हैं?',
    a: 'पहली 150 यूनिट के लिए ₹5.50/यूनिट, 151–300 के लिए ₹6.00/यूनिट, 301–500 के लिए ₹6.50/यूनिट, और 500 से ऊपर ₹7.00/यूनिट — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर बिल होता है। ये शहरी LMV-1 दरें हैं, 1 अप्रैल 2025 से प्रभावी; ग्रामीण घरेलू दरें अलग हैं और यहां कवर नहीं की गई हैं।',
  },
  {
    q: 'UPPCL बिल पर फिक्स्ड चार्ज किस पर आधारित है?',
    a: 'घरेलू कनेक्शन के लिए यह आपके स्वीकृत लोड के प्रति kW ₹110 प्रति महीना है — इसलिए एक 2kW कनेक्शन एक भी यूनिट बिल होने से पहले ₹220 फिक्स्ड चार्ज में चुकाता है। कमर्शियल, इंडस्ट्रियल और कृषि कनेक्शन की अपनी अलग प्रति-kW दरें हैं।',
  },
  {
    q: 'क्या UPPCL एक फ्यूल/पावर-परचेज़ एडजस्टमेंट लेता है?',
    a: 'हां — एनर्जी और फिक्स्ड चार्ज के ऊपर घरेलू खपत की हर यूनिट पर ₹0.15/यूनिट का एक रेगुलेटरी ट्रू-अप लागू होता है। यह ज़्यादातर भारतीय डिस्कॉम द्वारा इस्तेमाल किए जाने वाले फ्यूल-कॉस्ट-एडजस्टमेंट तंत्र का UPPCL वर्ज़न है।',
  },
  {
    q: 'उत्तर प्रदेश में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'घरेलू सप्लाई के लिए एनर्जी चार्ज पर 5% — कई अन्य राज्यों की तुलना में काफी कम (तुलना के लिए, महाराष्ट्र 16% लेता है)। यह एक राज्य सरकार का टैक्स है, कोई ऐसा चार्ज नहीं जो UPPCL तय करता या रखता है।',
  },
  {
    q: 'मैं अपना UPPCL बिल ऑनलाइन कैसे जांचूं?',
    a: 'consumer.uppcl.org पर आधिकारिक UPPCL कंज़्यूमर पोर्टल पर जाएं, या अपनी स्थानीय सब्सिडियरी का ऐप (जैसे कानपुर में KESCO का ऐप) इस्तेमाल करें, और अपना मौजूदा बिल देखने के लिए अपना अकाउंट/कंज़्यूमर ID डालें।',
  },
  {
    q: 'मैं अपना UPPCL बिल कैसे चुकाऊं?',
    a: 'उसी कंज़्यूमर पोर्टल या अपनी स्थानीय सब्सिडियरी के ऐप के ज़रिए UPI, कार्ड या नेट बैंकिंग से भुगतान करें, और रसीद सेव करें। बिलिंग सवालों के लिए, UPPCL की हेल्पलाइन 1800-180-8752 या 1912 है।',
  },
  {
    q: 'क्या PuVVNL, MVVNL, PVVNL, DVVNL और KESCO अलग-अलग दरें लेते हैं?',
    a: 'नहीं। सभी पांच UPPCL सब्सिडियरी — उत्तर प्रदेश के अलग-अलग क्षेत्रों को कवर करते हुए, जिसमें खास तौर पर कानपुर के लिए KESCO शामिल है — बिल्कुल एक जैसे UPERC-मंज़ूर टैरिफ पर बिल करती हैं। आपके बिल पर कौन सी दिखती है, यह सिर्फ आप कहां रहते हैं इस पर निर्भर करता है, आपकी दर पर नहीं।',
  },
  {
    q: 'UPPCL अपनी टैरिफ दरों में कितनी बार संशोधन करता है?',
    a: 'टैरिफ उत्तर प्रदेश इलेक्ट्रिसिटी रेगुलेटरी कमीशन (UPERC) द्वारा समय-समय पर, आम तौर पर एक वार्षिक टैरिफ ऑर्डर के ज़रिए संशोधित होते हैं — मौजूदा स्लैब 1 अप्रैल 2025 से लागू हुए। पुराने आंकड़ों पर भरोसा करने से पहले ऊपर दिया कैलकुलेटर या UPPCL का आधिकारिक पोर्टल जांचें।',
  },
  {
    q: 'मैं अपने इस्तेमाल के लिए अपना सटीक UPPCL बिल कहां पा सकता हूं?',
    a: 'हमारा UPPCL बिल कैलकुलेटर इस्तेमाल करें, जो इन्हीं सत्यापित स्लैब, फिक्स्ड चार्ज, मीटर रेंट, ट्रू-अप और ड्यूटी को आपकी अपनी यूनिट्स और स्वीकृत लोड पर लागू करके एक ब्यौरेवार अनुमान देता है।',
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

const categoryRows: [string, string][] = [
  ['रेजिडेंशियल (LMV-1, शहरी)', 'शहरी घरेलू शेड्यूल पर घर — इस गाइड की उदाहरण गणना जिस श्रेणी का इस्तेमाल करती है'],
  ['कमर्शियल (LMV-2, 4kW तक)', 'दुकानें, ऑफिस और छोटे व्यवसाय, 4kW तक के कॉन्ट्रैक्टेड लोड पर'],
  ['इंडस्ट्रियल (LMV-6, 100 HP / 75kW से कम)', 'रूरल शेड्यूल के बाहर छोटे और मध्यम पावर कनेक्शन'],
  ['कृषि (LMV-5, शहरी शेड्यूल)', 'सिर्फ शहरी (गैर-सब्सिडाइज़्ड) शेड्यूल पर मीटर किए गए निजी ट्यूबवेल/पंपिंग सेट'],
]

const domesticSlabs: [string, string][] = [
  ['0–150 यूनिट', '₹5.50'],
  ['151–300 यूनिट', '₹6.00'],
  ['301–500 यूनिट', '₹6.50'],
  ['501+ यूनिट', '₹7.00'],
]

const otherCategoryRows: [string, string, string][] = [
  ['कमर्शियल (LMV-2, 4kW तक)', '₹7.50 (0–300 यूनिट), ₹8.40 (301+)', '₹330/kW'],
  ['इंडस्ट्रियल (LMV-6, <100 HP)', '₹7.30 फ्लैट', '₹290/kW'],
  ['कृषि (LMV-5, शहरी)', '₹6.50 फ्लैट (क्रॉस-सब्सिडी एडजस्टमेंट से पहले)', '≈₹174/kW (₹130/BHP)'],
]

const fixedChargeRows: [string, string, string][] = [
  ['रेजिडेंशियल', 'स्वीकृत लोड के हिसाब से', '₹110/kW'],
  ['कमर्शियल (4kW तक)', 'स्वीकृत लोड के हिसाब से', '₹330/kW'],
  ['इंडस्ट्रियल (100 HP से कम)', 'स्वीकृत लोड के हिसाब से', '₹290/kW'],
  ['कृषि (शहरी शेड्यूल)', 'स्वीकृत लोड के हिसाब से (BHP में बिल)', '≈₹174/kW'],
]

const workedExample250: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स', '250'],
  ['स्वीकृत लोड (माना गया)', '2 kW'],
  ['स्लैब 1: 0–150 यूनिट @ ₹5.50', '₹825.00'],
  ['स्लैब 2: 100 यूनिट (151–250) @ ₹6.00', '₹600.00'],
  ['एनर्जी चार्ज सबटोटल', '₹1,425.00'],
  ['फिक्स्ड चार्ज (2 kW × ₹110)', '₹220.00'],
  ['मीटर रेंट', '₹20.00'],
  ['रेगुलेटरी ट्रू-अप (250 × ₹0.15)', '₹37.50'],
  ['इलेक्ट्रिसिटी ड्यूटी (एनर्जी चार्ज का 5%)', '₹71.25'],
  ['अनुमानित कुल', '₹1,773.75'],
]

export default function UppclCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'UPPCL पूरी गाइड', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📋</span> पूरी रेफरेंस गाइड
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
          · प्रोज़ की आख़िरी समीक्षा {PROSE_LAST_REVIEWED} · टैरिफ डेटा हमारे
          सत्यापित रिकॉर्ड के आधार पर {TARIFF_DATA_REFRESHED} को अपडेट किया गया
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>UPPCL</strong> (उत्तर प्रदेश पावर कॉर्पोरेशन लिमिटेड) पांच
          क्षेत्रीय सब्सिडियरी के ज़रिए पूरे उत्तर प्रदेश में बिजली बांटता है —
          PuVVNL, MVVNL, PVVNL, DVVNL और KESCO — सभी{' '}
          <strong>उत्तर प्रदेश इलेक्ट्रिसिटी रेगुलेटरी कमीशन (UPERC)</strong> द्वारा
          मंज़ूर एक ही टैरिफ पर बिल करती हैं। एक सामान्य शहरी घरेलू UPPCL बिल में
          एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज, आपके स्वीकृत लोड से जुड़ा एक
          फिक्स्ड चार्ज, ₹20 मीटर रेंट, ₹0.15/यूनिट रेगुलेटरी ट्रू-अप, और 5%
          इलेक्ट्रिसिटी ड्यूटी शामिल होती है। यह गाइड सिर्फ शहरी शेड्यूल को कवर
          करती है — ग्रामीण घरेलू, और भारी सब्सिडी वाला ग्रामीण कृषि शेड्यूल,
          वाकई अलग हैं और नीचे अलग से फ्लैग किए गए हैं।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            UPPCL उपभोक्ताओं को <strong>हर महीने</strong> बिल करता है। इसे 30
            नवंबर 1999 को इनकॉरपोरेट किया गया और 15 जनवरी 2000 को इसने काम शुरू
            किया, जब उत्तर प्रदेश स्टेट इलेक्ट्रिसिटी बोर्ड (UPSEB) को UPPCL
            (ट्रांसमिशन और डिस्ट्रिब्यूशन) और अलग जनरेशन कंपनियों में विभाजित
            किया गया। UPPCL खुद सीधे उपभोक्ताओं को बिल नहीं करता — यह पांच
            क्षेत्रीय सब्सिडियरी करती हैं, हर एक राज्य के अलग हिस्से को कवर
            करती है लेकिन सभी बिल्कुल एक जैसे UPERC-मंज़ूर टैरिफ पर:
          </p>
          <ul className="mt-3 space-y-1.5 pl-5 text-ash/80" style={{ listStyleType: 'disc' }}>
            <li>पूर्वांचल विद्युत वितरण निगम (PuVVNL)</li>
            <li>मध्यांचल विद्युत वितरण निगम (MVVNL) — लखनऊ शामिल</li>
            <li>पश्चिमांचल विद्युत वितरण निगम (PVVNL)</li>
            <li>दक्षिणांचल विद्युत वितरण निगम (DVVNL)</li>
            <li>कानपुर इलेक्ट्रिसिटी सप्लाई कंपनी (KESCO) — सिर्फ कानपुर नगर निगम क्षेत्र</li>
          </ul>
          <p className={`mt-3 ${pCls}`}>
            आपके बिल पर इन पांच नामों में से कोई भी दिखे, इस गाइड की दरें उसी
            तरह लागू होती हैं — सिर्फ आपका स्थानीय ऑफिस, पोर्टल अनुभव और कस्टमर
            सर्विस सब्सिडियरी के हिसाब से अलग होती है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: &ldquo;UPPCL&rdquo; एक छत्र टैरिफ है, लेकिन आपका असली बिल
            और भुगतान पोर्टल इस पर निर्भर करता है कि आप कहां रहते हैं, पांच
            सब्सिडियरी में से किसी एक से।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल चार UPPCL उपभोक्ता श्रेणियों को कवर करता
            है, हर एक की अपनी UPERC दर अनुसूची है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 font-semibold">यह किसे कवर करती है</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {categoryRows.map(([cat, desc]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: यहां हर श्रेणी खास तौर पर शहरी शेड्यूल है — UPPCL इनमें से
            कई के लिए अलग ग्रामीण शेड्यूल चलाता है जिन्हें यह गाइड मॉडल नहीं
            करती।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू (LMV-1) टैरिफ स्लैब
          </h2>
          <p className={pCls}>
            UPPCL शहरी घरेलू खपत को चार टेलिस्कोपिक स्लैब से बिल करता है, 1
            अप्रैल 2025 से प्रभावी:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्लैब</th>
                  <th className="px-4 py-2 text-right font-semibold">दर/यूनिट</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {domesticSlabs.map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            सामान्य तंत्र के लिए{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>{' '}
            देखें — सिर्फ हर बैंड के अंदर की यूनिट्स उस बैंड की दर पर बिल होती
            हैं। यह <strong>शहरी</strong> शेड्यूल है; UP का ग्रामीण घरेलू टैरिफ
            अलग है और यहां मॉडल नहीं किया गया। तुरंत ब्यौरेवार अनुमान के लिए
            अपनी यूनिट्स{' '}
            <Link href="/hi/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: उस महीने आप कितनी भी ज़्यादा इस्तेमाल करें, पहली 150 यूनिट
            हमेशा ₹5.50 प्रति यूनिट पर रहती हैं।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल, इंडस्ट्रियल और कृषि टैरिफ
          </h2>
          <p className={pCls}>
            ये तीन श्रेणियां UPERC के FY2025-26 टैरिफ ऑर्डर से सीधे प्राइमरी-सोर्स
            हैं, लेकिन हर एक एक खास बैंड या शेड्यूल कवर करती है — यह मान लेने से
            पहले कि यह आपके कनेक्शन पर लागू होती है, नीचे दी चेतावनी पढ़ें:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 font-semibold">दर/यूनिट</th>
                  <th className="px-4 py-2 text-right font-semibold">फिक्स्ड चार्ज</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {otherCategoryRows.map(([cat, rate, fixed]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{rate}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{fixed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            <strong>कमर्शियल चेतावनी:</strong> ₹7.50/₹8.40 दर सिर्फ 4kW तक के
            कॉन्ट्रैक्टेड लोड पर लागू होती है। 4kW से ऊपर, UPPCL ₹450/kW फिक्स्ड
            और एक अलग एनर्जी अनुसूची (1,000 यूनिट तक ₹7.50/यूनिट, फिर ₹8.75)
            लेता है — यहां मॉडल नहीं किया गया। एक सीज़नल न्यूनतम चार्ज (अप्रैल–सितंबर
            ₹600/kW, अक्टूबर–मार्च ₹475/kW) भी मॉडल नहीं किया गया है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>इंडस्ट्रियल चेतावनी:</strong> तय पीक/ऑफ-पीक विंडो के दौरान
            एनर्जी चार्ज पर ±15% का टाइम-ऑफ-डे सरचार्ज या रिबेट लागू होता है,
            और पात्र कनेक्शन के लिए 7.5% रूरल शेड्यूल रिबेट मौजूद है — इनमें से
            कोई भी यहां मॉडल नहीं किया गया।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>कृषि चेतावनी — इस पेज की सबसे ज़रूरी चेतावनी:</strong> ऊपर
            दी ₹6.50/यूनिट दर <em>शहरी</em>, गैर-सब्सिडाइज़्ड शेड्यूल है।
            ज़्यादातर UP निजी ट्यूबवेल कनेक्शन असल में भारी सरकारी सब्सिडी वाले{' '}
            <strong>रूरल शेड्यूल</strong> पर बिल होते हैं, जहां असली देय दर सिर्फ
            लगभग <strong>₹70/BHP/महीना फिक्स्ड प्लस ₹2.00/यूनिट</strong> है —
            बेहद सस्ती। अगर आप एक सामान्य ग्रामीण कृषि उपभोक्ता हैं, तो इस टेबल
            के आंकड़े आपके असली बिल को काफी <em>ज़्यादा</em> बताएंगे। साथ ही,
            यहां दिखाई शहरी शेड्यूल पर भी, UPPCL का क्रॉस-सब्सिडी एडजस्टमेंट असली
            देय एनर्जी दर को ₹6.50 की बजाय ₹6.00/यूनिट कर देता है — जो ऊपर की
            टेबल में नहीं दिखाया गया।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आप एक सब्सिडाइज़्ड ग्रामीण कृषि कनेक्शन पर हैं, तो ऊपर
            दी कृषि लाइन को पूरी तरह नज़रअंदाज़ करें — आपका असली बिल काफी कम है।
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            श्रेणी के हिसाब से फिक्स्ड चार्ज
          </h2>
          <p className={pCls}>
            फ्लैट मासिक फिक्स्ड फीस लेने वाले डिस्कॉम के उलट, यहां हर UPPCL
            श्रेणी अपना फिक्स्ड चार्ज <strong>स्वीकृत लोड के प्रति kW (या प्रति
            BHP)</strong> पर बिल करती है — इसलिए शून्य खपत पर भी एक बड़ा कनेक्शन
            फिक्स्ड चार्ज में ज़्यादा चुकाता है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 font-semibold">आधार</th>
                  <th className="px-4 py-2 text-right font-semibold">दर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {fixedChargeRows.map(([cat, basis, rate]) => (
                  <tr key={cat}>
                    <td className="px-4 py-2 font-medium">{cat}</td>
                    <td className="px-4 py-2">{basis}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            घरेलू कनेक्शन में फिक्स्ड चार्ज से अलग एक <strong>₹20/महीना मीटर
            रेंट</strong> भी लगती है, जो स्वतंत्र रूप से आइटमाइज़ की जाती है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: आप असल में ज़्यादा बिजली इस्तेमाल करें या न करें, एक ऊंचा
            स्वीकृत लोड हर महीने आपका फिक्स्ड चार्ज बढ़ाता है — यहां अपना
            स्वीकृत लोड सही साइज़ में रखना एक फ्लैट-फिक्स्ड-चार्ज डिस्कॉम से
            ज़्यादा मायने रखता है।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            रेगुलेटरी ट्रू-अप (UPPCL का फ्यूल एडजस्टमेंट)
          </h2>
          <p className={pCls}>
            UPPCL एनर्जी और फिक्स्ड चार्ज के ऊपर एक{' '}
            <strong>₹0.15 प्रति यूनिट रेगुलेटरी ट्रू-अप</strong> लागू करता है —
            यह ज़्यादातर भारतीय डिस्कॉम द्वारा इस्तेमाल किए जाने वाले फ्यूल/पावर-परचेज़
            एडजस्टमेंट तंत्र का UPPCL वर्ज़न है। इस तरह के चार्ज के पीछे के
            सामान्य तंत्र के लिए — यह क्यों मौजूद है और आपके इस्तेमाल से स्वतंत्र
            होकर क्यों बदल सकता है — देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            ।
          </p>
          <p className={`mt-3 ${pCls}`}>
            कुछ डिस्कॉम के उलट जहां हमारे डेटा में यह एडजस्टमेंट बिल्कुल मॉडल
            नहीं किया गया, UPPCL का ₹0.15/यूनिट आंकड़ा सत्यापित है और नीचे दिए
            कैलकुलेटर और उदाहरण गणना में शामिल है — हालांकि किसी भी ट्रू-अप तंत्र
            की तरह, UPPCL के नवीनतम टैरिफ ऑर्डर से मौजूदा दर की पुष्टि करें,
            क्योंकि इसे समय-समय पर रिव्यू करने के लिए डिज़ाइन किया गया है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ₹0.15/यूनिट पर, यह लाइन ज़्यादातर घरों के लिए एनर्जी चार्ज
            की तुलना में छोटी है, लेकिन फ्लैट फिक्स्ड चार्ज के उलट, यह आपकी हर
            इस्तेमाल की गई यूनिट पर लागू होती है।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी
          </h2>
          <p className={pCls}>
            इलेक्ट्रिसिटी ड्यूटी एक <strong>उत्तर प्रदेश राज्य सरकार का
            टैक्स</strong> है जो आपके बिल पर वसूला जाता है, कोई ऐसा चार्ज नहीं
            जो UPPCL तय करता या रखता है। घरेलू सप्लाई के लिए यह{' '}
            <strong>एनर्जी चार्ज का 5%</strong> है — कई अन्य राज्यों की तुलना में
            काफी कम; तुलना के लिए महाराष्ट्र का MSEDCL इसी आधार पर 16% लेता है।
            पूरी तुलना के लिए हमारी{' '}
            <Link href="/hi/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL पूरी गाइड
            </Link>{' '}
            देखें — और इन दोनों राज्यों के उलट, BESCOM और WBSEDCL दोनों की
            घरेलू ड्यूटी दर एक पुष्ट आंकड़े की बजाय अपुष्ट है, हमारी{' '}
            <Link href="/hi/blog/bescom-complete-guide-electricity-bill" className="text-brass underline">
              BESCOM
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/wbsedcl-complete-guide-electricity-bill" className="text-brass underline">
              WBSEDCL
            </Link>{' '}
            पूरी गाइड के अनुसार।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: UP की 5% ड्यूटी भारतीय मानकों के हिसाब से वाकई हल्की है —
            महाराष्ट्र जैसे ऊंची-ड्यूटी वाले राज्य में जो हिस्सा आपके कुल बिल का
            बड़ा भाग होता, वह यहां मुश्किल से दिखता है।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना UPPCL बिल कैसे जांचें और चुकाएं
          </h2>
          <p className={pCls}>
            सामान्य रास्ता, UPPCL के अपने पोर्टल के ज़रिए (सटीक स्क्रीन समय के
            साथ बदल सकती हैं):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'consumer.uppcl.org पर UPPCL कंज़्यूमर पोर्टल पर जाएं, या अपनी स्थानीय सब्सिडियरी का ऐप (जैसे कानपुर में KESCO का ऐप) इस्तेमाल करें।',
              'अपना मौजूदा बिल पाने के लिए अपना अकाउंट/कंज़्यूमर ID डालें।',
              'दिखाई गई राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें।',
              'अपने रिकॉर्ड के लिए भुगतान रसीद सेव करें।',
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
            बिलिंग सवालों या विवादों के लिए, UPPCL की हेल्पलाइन{' '}
            <strong>1800-180-8752 या 1912</strong> है — यह गाइड और हमारा
            कैलकुलेटर अनुमान लगाने वाले टूल हैं, अकाउंट-विशिष्ट मामलों के लिए
            आपके असली बिल या आधिकारिक पोर्टल का विकल्प नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: किसी भी अकाउंट-विशिष्ट चीज़ के लिए, एक सामान्य राज्यव्यापी
            नंबर की बजाय सीधे अपनी स्थानीय सब्सिडियरी (PuVVNL, MVVNL, PVVNL,
            DVVNL या KESCO) से संपर्क करें।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: 250 यूनिट, घरेलू कनेक्शन
          </h2>
          <p className={pCls}>
            ऊपर दिए सत्यापित स्लैब का इस्तेमाल करते हुए, यहां एक महीने में 250
            यूनिट इस्तेमाल करने वाले घरेलू कनेक्शन के लिए, 2kW स्वीकृत लोड मानते
            हुए, पूरी गणना है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample250.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === workedExample250.length - 1 ? 'bg-mist/60' : undefined}
                  >
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums ${
                        i === workedExample250.length - 1
                          ? 'font-display font-bold text-hub-electricity'
                          : 'text-ink-navy'
                      }`}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            एक अलग स्वीकृत लोड सिर्फ फिक्स्ड-चार्ज लाइन बदलता है — उदाहरण के लिए
            एक 4kW कनेक्शन वहां ₹220 की बजाय ₹440 चुकाएगा, बाकी सब कुछ अपरिवर्तित
            रहेगा। आपके असली बिल में बकाया या पिछला बैलेंस जैसी अकाउंट-विशिष्ट
            चीज़ें भी शामिल हो सकती हैं जो यहां मॉडल नहीं की गई हैं। घरेलू के
            अलावा किसी भी श्रेणी सहित अपनी सटीक यूनिट्स और स्वीकृत लोड{' '}
            <Link href="/hi/electricity/uppcl-bill-calculator" className="text-brass underline">
              UPPCL बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: एक 2kW कनेक्शन पर 250 यूनिट पर, फिक्स्ड चार्ज, मीटर रेंट
            और ट्रू-अप मिलकर लगभग इलेक्ट्रिसिटी ड्यूटी जितने हो जाते हैं — इनमें
            से कोई भी एनर्जी चार्ज की तरह आपकी खपत के साथ नहीं बदलता।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/electricity/uppcl-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                UPPCL बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इन्हीं सत्यापित स्लैब पर आधारित आपका अपना ब्यौरेवार अनुमान।
              </p>
            </Link>
            <Link
              href="/hi/blog/msedcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                MSEDCL पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                महाराष्ट्र की कहीं ज़्यादा ड्यूटी दर की तुलना देखें।
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
                टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                UPPCL के चार बैंड के पीछे का सामान्य तंत्र।
              </p>
            </Link>
            <Link
              href="/hi/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧾
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                फिक्स्ड चार्ज बनाम FCA समझाया गया
              </p>
              <p className="mt-1 text-xs text-ash/60">
                आपकी यूनिट्स न बदलने पर भी आपका बिल क्यों बदलता है।
              </p>
            </Link>
            <Link
              href="/hi/blog/bescom-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                BESCOM पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                कर्नाटक की गृह ज्योति फ्री-यूनिट्स योजना देखें।
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
          प्रोज़ की आख़िरी समीक्षा: {PROSE_LAST_REVIEWED}। टैरिफ डेटा हमारे
          सत्यापित रिकॉर्ड के आधार पर {TARIFF_DATA_REFRESHED} को अपडेट किया गया,{' '}
          <a
            href="https://www.uperc.org/App_File/UPPCLTariffOrderFY2025-26-pdf1122202564623PM.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            UPPCL डिस्कॉम के लिए UPERC टैरिफ ऑर्डर, FY2025-26
          </a>{' '}
          से सोर्स किया गया, 1 अप्रैल 2025 से प्रभावी। कमर्शियल, इंडस्ट्रियल और
          कृषि आंकड़े सिर्फ ऊपर बताए गए खास बैंड/शेड्यूल को कवर करते हैं — ऊंचे
          कमर्शियल लोड, टाइम-ऑफ-डे इंडस्ट्रियल एडजस्टमेंट, और सब्सिडाइज़्ड
          ग्रामीण कृषि शेड्यूल स्पष्ट रूप से आगे की सोर्सिंग लंबित रहते हुए
          मॉडल नहीं किए गए हैं। दरें समय-समय पर संशोधित होती हैं — ऊपर दिया
          कैलकुलेटर मौजूदा रखा जाता है; इस लेख को उसके साथ एक व्याख्यात्मक
          रेफरेंस के रूप में लें। इस साइट पर हम टैरिफ डेटा कैसे सोर्स और
          सत्यापित करते हैं, इसके लिए हमारी{' '}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
