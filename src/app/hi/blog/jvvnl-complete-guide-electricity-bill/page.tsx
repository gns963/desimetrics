import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/jvvnl-complete-guide-electricity-bill'
const TITLE = 'JVVNL (राजस्थान) बिजली बिल की पूरी गाइड'
const DESCRIPTION =
  'हर सत्यापित JVVNL टैरिफ स्लैब, भारत के सबसे ऊंचे फिक्स्ड चार्ज में से एक, और खुले ड्यूटी/FCA गैप एक ही रेफरेंस पेज पर — घरेलू, कमर्शियल, इंडस्ट्रियल और कृषि टेबल, एक उदाहरण गणना, और अपना राजस्थान बिजली बिल कैसे जांचें और चुकाएं।'
const PROSE_LAST_REVIEWED = '22 सितंबर 2026'
const TARIFF_DATA_REFRESHED = '29 अगस्त 2026'

export const metadata: Metadata = {
  title: 'JVVNL पूरी बिल गाइड — राजस्थान टैरिफ स्लैब और चार्ज 2026',
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
  datePublished: '2026-09-16',
  dateModified: '2026-09-22',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'JVVNL रेजिडेंशियल टेलिस्कोपिक टैरिफ स्लैब',
  description: 'पूर्वी राजस्थान (JVVNL) के लिए टेलिस्कोपिक मासिक घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2025 से प्रभावी।',
  url: `${SITE}/hi${PATH}#domestic-tariff`,
  dateModified: '2026-08-29',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: 'https://cescrajasthan.co.in/kedl/pages/event/uploads/Tariff-2025%202.pdf',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/pdf',
      contentUrl: 'https://cescrajasthan.co.in/kedl/pages/event/uploads/Tariff-2025%202.pdf',
    },
  ],
}

const faqs = [
  {
    q: 'मेरा JVVNL बिजली बिल कैसे गिना जाता है?',
    a: 'आपके घरेलू JVVNL बिल में एक टेलिस्कोपिक स्लैब-आधारित एनर्जी चार्ज (चार बैंड में ₹4.25 से ₹9.50/यूनिट), स्वीकृत लोड के प्रति kW ₹275 प्रति महीना का फिक्स्ड चार्ज — भारत के सबसे ऊंचे चार्ज में से एक — और ₹0.22/यूनिट का फ्यूल/वेरिएबल-कॉस्ट सरचार्ज जुड़ता है। राजस्थान की अपनी प्रति-यूनिट इलेक्ट्रिसिटी ड्यूटी और एक अर्बन सेस इस बुनियादी ढांचे का हिस्सा नहीं हैं और फिलहाल मॉडल नहीं किए गए हैं।',
  },
  {
    q: 'क्या JVVNL/राजस्थान का टैरिफ टेलिस्कोपिक है?',
    a: 'हां। चारों स्लैब में से हर एक सिर्फ अपनी दर पर बिल होता है — किसी ऊंचे स्लैब में जाना आपकी पहले इस्तेमाल की सस्ती यूनिट्स की दर कभी नहीं बदलता।',
  },
  {
    q: "JVVNL घरेलू कनेक्शन के लिए फिक्स्ड चार्ज क्या है?",
    a: 'स्वीकृत लोड के प्रति kW ₹275 प्रति महीना — किसी भी भारतीय राज्य के सबसे ऊंचे घरेलू फिक्स्ड चार्ज में से एक। एक मामूली 2 kW घर का कनेक्शन एक भी यूनिट बिल होने से पहले सिर्फ फिक्स्ड चार्ज में ₹550 चुकाता है।',
  },
  {
    q: 'क्या JVVNL पूरे राजस्थान को बिजली सप्लाई करता है?',
    a: 'नहीं। JVVNL जयपुर और लगभग एक दर्जन पूर्वी ज़िलों को कवर करता है — जिनमें दौसा, अलवर, भरतपुर, कोटा, बूंदी, बारां, झालावाड़, सवाई माधोपुर और करौली शामिल हैं। मध्य और दक्षिणी राजस्थान (अजमेर के आसपास) को AVVNL सर्व करता है, और पश्चिमी राजस्थान (जोधपुर के आसपास) को JdVVNL। तीनों इस गाइड में दिखाए गए एक ही RERC-अनुमोदित टैरिफ पर बिल करते हैं, लेकिन अलग-अलग अकाउंट के रूप में।',
  },
  {
    q: 'यह डेटा कितना भरोसेमंद है — क्या यह प्राइमरी-सोर्स्ड है?',
    a: 'यह मिला-जुला है, हमारी KSEB गाइड में फ्लैग किया गया वही उलटाव: JVVNL की कमर्शियल, इंडस्ट्रियल और कृषि दरें JVVNL के अपने प्रकाशित \'Tariff for Supply of Electricity-2025\' शेड्यूल से PRIMARY-सोर्स्ड हैं। ऊपर दिए रेजिडेंशियल स्लैब एक प्राइमरी क्रॉस-चेक के लंबित एक SECONDARY-सोर्स्ड अनुमान हैं — हमें आंकड़ों पर भरोसा है, लेकिन हम सोर्सिंग टियर को खुलकर फ्लैग करते हैं।',
  },
  {
    q: 'क्या JVVNL कोई फ्यूल या पावर-परचेज़ सरचार्ज लेता है?',
    a: 'हां — हमारा डेटा हर इस्तेमाल की गई यूनिट पर लागू ₹0.22/यूनिट का फ्यूल/वेरिएबल-कॉस्ट सरचार्ज मॉडल करता है। हमारे पास स्लैब दरों की तरह इस खास आंकड़े की पुष्टि करने वाला कोई समर्पित नोट नहीं है, इसलिए अगर यह आपके लिए मायने रखता है तो इसे अपने बिल की सरचार्ज लाइन से जांचें।',
  },
  {
    q: 'राजस्थान में इलेक्ट्रिसिटी ड्यूटी दर क्या है?',
    a: 'हम फिलहाल इसे मॉडल नहीं करते। राजस्थान में आम तौर पर एक प्रति-यूनिट इलेक्ट्रिसिटी ड्यूटी (आमतौर पर लगभग 40 पैसे/यूनिट बताई जाती है) प्लस एक अर्बन सेस लगता है, इनमें से कोई भी इस गाइड की टेबल या कैलकुलेटर में नहीं है — आपका असली JVVNL बिल यहां दिए बुनियादी अनुमान से थोड़ा ज़्यादा होगा।',
  },
  {
    q: 'मैं अपना JVVNL बिल ऑनलाइन कैसे जांचूं या चुकाऊं?',
    a: 'energy.rajasthan.gov.in/jvvnl पर आधिकारिक JVVNL पोर्टल पर जाएं, अपना मौजूदा बिल पाने के लिए अपना K-Number (Consumer ID) डालें, फिर UPI, कार्ड या नेट बैंकिंग से भुगतान करें। सवालों या आउटेज के लिए, 24×7 हेल्पलाइन 1912 या 1800-180-6507 पर कॉल करें।',
  },
  {
    q: 'JVVNL क्या है, और यह कैसे बना?',
    a: 'जयपुर विद्युत वितरण निगम लिमिटेड (JVVNL) 19 जून 2000 को इनकॉर्पोरेट हुआ, जब राजस्थान स्टेट इलेक्ट्रिसिटी बोर्ड (RSEB) को अलग जनरेशन, ट्रांसमिशन और तीन क्षेत्रीय डिस्ट्रिब्यूशन कंपनियों में बांटा गया — JVVNL, AVVNL और JdVVNL।',
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
  ['रेजिडेंशियल', 'घर — इस गाइड की उदाहरण गणना जिस श्रेणी का इस्तेमाल करती है'],
  ['कमर्शियल (NDS/LT-2)', '5 kW से ऊपर स्वीकृत लोड वाले नॉन-डोमेस्टिक कनेक्शन'],
  ['इंडस्ट्रियल (LT-5)', 'छोटे उद्योग, 25 HP / 18.65 kW तक कनेक्टेड लोड'],
  ['कृषि (AG/MS/LT-4)', 'मीटर्ड इरिगेशन, "जनरल"/ब्लॉक-आवर्स-सप्लाई श्रेणी'],
]

const domesticSlabs: [string, string][] = [
  ['0–100 यूनिट', '₹4.25'],
  ['101–200 यूनिट', '₹5.75'],
  ['201–400 यूनिट', '₹7.25'],
  ['401+ यूनिट', '₹9.50'],
]

const otherCategoryRows: [string, string, string][] = [
  ['कमर्शियल (NDS/LT-2)', '₹7.00 (0–100), ₹8.50 (101+)', '₹160/kW (500 यूनिट/माह तक)'],
  ['इंडस्ट्रियल (LT-5)', '₹6.00 फ्लैट', '₹120.64/kW (₹90/HP से कन्वर्ट)'],
  ['कृषि (AG/MS/LT-4)', '₹5.25 फ्लैट', '₹40.21/kW (₹30/HP से कन्वर्ट)'],
]

const workedExample250: [string, string][] = [
  ['इस्तेमाल की गई यूनिट्स (एक महीना)', '250'],
  ['स्वीकृत लोड (माना गया)', '2 kW'],
  ['स्लैब 1: 100 यूनिट (0–100) @ ₹4.25', '₹425.00'],
  ['स्लैब 2: 100 यूनिट (101–200) @ ₹5.75', '₹575.00'],
  ['स्लैब 3: 50 यूनिट (201–250) @ ₹7.25', '₹362.50'],
  ['एनर्जी चार्ज सबटोटल', '₹1,362.50'],
  ['फिक्स्ड चार्ज (2 kW × ₹275/kW)', '₹550.00'],
  ['फ्यूल/वेरिएबल-कॉस्ट सरचार्ज (250 × ₹0.22)', '₹55.00'],
  ['अनुमानित कुल (सिर्फ बुनियादी ढांचा)', '₹1,967.50'],
]

export default function JvvnlCompleteGuidePageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'JVVNL पूरी गाइड', href: `/hi${PATH}` },
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
          <strong>JVVNL</strong> (जयपुर विद्युत वितरण निगम लिमिटेड) जयपुर और
          पूर्वी राजस्थान में बिजली बांटता है, जिसे{' '}
          <strong>राजस्थान इलेक्ट्रिसिटी रेगुलेटरी कमीशन (RERC)</strong>{' '}
          नियंत्रित करता है। एक सामान्य JVVNL घरेलू बिल एक टेलिस्कोपिक
          स्लैब-आधारित एनर्जी चार्ज को भारत के सबसे ऊंचे फिक्स्ड चार्ज में से
          एक के साथ जोड़ता है — स्वीकृत लोड के प्रति kW ₹275, मासिक बिल —
          साथ ही एक फ्यूल/वेरिएबल-कॉस्ट सरचार्ज जिसे यह गाइड मॉडल करती है,
          और एक प्रति-यूनिट इलेक्ट्रिसिटी ड्यूटी जिसे यह फ्लैग करती है पर
          मॉडल नहीं करती, क्योंकि हमारे सोर्स्ड डेटा में इसकी कोई मौजूदा
          सत्यापित दर उपलब्ध नहीं है।
        </p>

        <section aria-labelledby="overview" className="mt-10 scroll-mt-20">
          <h2 id="overview" className={h2Cls}>
            ओवरव्यू
          </h2>
          <p className={pCls}>
            राजस्थान स्टेट इलेक्ट्रिसिटी बोर्ड (RSEB) को{' '}
            <strong>19 जून 2000</strong> को अलग जनरेशन, ट्रांसमिशन और
            डिस्ट्रिब्यूशन इकाइयों में बांटा गया, डिस्ट्रिब्यूशन को आगे
            क्षेत्र के हिसाब से तीन कंपनियों में बांटा गया: पूर्व के लिए
            जयपुर विद्युत वितरण निगम लिमिटेड (JVVNL), मध्य/दक्षिण के लिए
            अजमेर विद्युत वितरण निगम लिमिटेड (AVVNL), और पश्चिम के लिए
            जोधपुर विद्युत वितरण निगम लिमिटेड (JdVVNL)। तीनों इस गाइड में
            बताए एक ही RERC-अनुमोदित टैरिफ पर बिल करते हैं, लेकिन अलग अकाउंट
            और अलग पोर्टल के साथ। JVVNL खुद{' '}
            <strong>जयपुर और लगभग एक दर्जन पूर्वी ज़िलों</strong> को सर्व
            करता है, जिनमें दौसा, अलवर, भरतपुर, कोटा, बूंदी, बारां, झालावाड़,
            सवाई माधोपुर और करौली शामिल हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आपका पता JVVNL के पूर्वी ज़िलों के बाहर है, तो
            आपका असली डिस्कॉम और बिलिंग पोर्टल इसकी बजाय AVVNL या JdVVNL है —
            इस गाइड के &ldquo;कैसे चुकाएं&rdquo; स्टेप्स इस्तेमाल करने से
            पहले अपना बिल जांचें।
          </p>
        </section>

        <section aria-labelledby="categories" className="mt-10 scroll-mt-20">
          <h2 id="categories" className={h2Cls}>
            उपभोक्ता श्रेणियां
          </h2>
          <p className={pCls}>
            हमारा सत्यापित डेटा फिलहाल चार JVVNL उपभोक्ता श्रेणियों को कवर
            करता है, सभी एक ही <strong>मासिक</strong> चक्र पर बिल होती हैं:
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
            निष्कर्ष: राजस्थान के तीनों अलग डिस्कॉम यह एक जैसा टैरिफ शेयर
            करते हैं — ऊपर दी श्रेणी टेबल AVVNL और JdVVNL कनेक्शन पर भी
            बराबर लागू होती है, बस अलग पोर्टल पर बिल होती है।
          </p>
        </section>

        <section aria-labelledby="steep-fixed-charge" className="mt-10 scroll-mt-20">
          <h2 id="steep-fixed-charge" className={h2Cls}>
            भारत के सबसे ऊंचे फिक्स्ड चार्ज में से एक
          </h2>
          <p className={pCls}>
            JVVNL का रेजिडेंशियल फिक्स्ड चार्ज{' '}
            <strong>स्वीकृत लोड के प्रति kW ₹275 प्रति महीना है</strong> —
            किसी भी भारतीय राज्य के सबसे ऊंचे चार्ज में से एक। एक मामूली
            2 kW घर का कनेक्शन एनर्जी की एक भी यूनिट बिल होने से पहले हर
            महीने <strong>सिर्फ फिक्स्ड चार्ज में ₹550</strong> चुकाता है।
            इसकी तुलना कर्नाटक के BESCOM या महाराष्ट्र के MSEDCL से करें,
            जहां इतने ही साइज़ के कनेक्शन का फिक्स्ड चार्ज इस राशि का एक
            अंश ही है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: बहुत कम इस्तेमाल वाला JVVNL घर भी सिर्फ फिक्स्ड चार्ज
            में एक बड़ा मासिक बिल चुकाता है — किसी हल्के उपयोगकर्ता के बिल
            का ज़्यादातर हिस्सा एनर्जी चार्ज से नहीं आता।
          </p>
        </section>

        <section aria-labelledby="domestic-tariff" className="mt-10 scroll-mt-20">
          <h2 id="domestic-tariff" className={h2Cls}>
            घरेलू टैरिफ स्लैब
          </h2>
          <p className={pCls}>
            JVVNL घरेलू खपत को चार टेलिस्कोपिक स्लैब से बिल करता है, 1
            अप्रैल 2025 से प्रभावी — हर बैंड सिर्फ उसके अंदर की यूनिट्स पर
            चार्ज होता है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्लैब (प्रति माह)</th>
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
            <strong>जानने लायक एक सोर्सिंग नोट:</strong> हमारी KSEB गाइड की
            तरह, JVVNL में भी सामान्य सोर्सिंग पैटर्न उल्टा है — ये
            रेजिडेंशियल स्लैब एक प्राइमरी क्रॉस-चेक के लंबित एक{' '}
            <strong>सेकंडरी-सोर्स्ड अनुमान</strong> हैं, जबकि नीचे दी JVVNL
            की कमर्शियल, इंडस्ट्रियल और कृषि दरें सीधे JVVNL के अपने
            प्रकाशित टैरिफ शेड्यूल से प्राइमरी-सोर्स्ड हैं। सामान्य तंत्र के
            लिए देखें{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब कैसे काम करते हैं
            </Link>
            , या एक तुरंत, ब्यौरेवार अनुमान के लिए अपनी यूनिट्स{' '}
            <Link href="/hi/electricity/rajasthan-electricity-bill-calculator" className="text-brass underline">
              JVVNL बिल कैलकुलेटर
            </Link>{' '}
            में डालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: किसी भी महीने की पहली 100 यूनिट हमेशा ₹4.25 प्रत्येक
            पर रहती हैं, चाहे उस महीने आप कितना भी ज़्यादा इस्तेमाल करें।
          </p>
        </section>

        <section aria-labelledby="other-categories" className="mt-10 scroll-mt-20">
          <h2 id="other-categories" className={h2Cls}>
            कमर्शियल, इंडस्ट्रियल और कृषि टैरिफ
          </h2>
          <p className={pCls}>
            तीनों JVVNL के अपने प्रकाशित &ldquo;Tariff for Supply of
            Electricity-2025&rdquo; शेड्यूल से प्राइमरी-सोर्स्ड हैं, 1
            अप्रैल 2025 से प्रभावी — लेकिन हर एक के साथ जानने लायक एक असली
            नोट है:
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
            <strong>कमर्शियल नोट:</strong> दिखाया गया ₹160/kW फिक्स्ड चार्ज
            500 यूनिट/माह तक लागू होता है; उससे ऊपर यह ₹200/kW (या 18.65 kW
            से ऊपर के लोड के लिए बिलिंग डिमांड का ₹320/kVA) हो जाता है — यहां
            मॉडल नहीं किया गया। 5 kW तक स्वीकृत लोड वाले कनेक्शन इसकी बजाय
            एक फ्लैट ₹350–700/कनेक्शन/माह चुकाते हैं, जो भी मॉडल नहीं किया
            गया।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>इंडस्ट्रियल नोट:</strong> यह सिर्फ शेड्यूल LT-5 (छोटे
            उद्योग, 25 HP / 18.65 kW तक कनेक्टेड लोड) को कवर करता है। दिखाया
            गया ₹90/HP फिक्स्ड चार्ज 500 यूनिट/माह तक लागू होता है; उससे
            ऊपर यह ₹150/HP हो जाता है — यहां मॉडल नहीं किया गया।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>कृषि नोट:</strong> ₹5.25/यूनिट की दर सिर्फ
            &ldquo;जनरल&rdquo;/ब्लॉक-आवर्स-सप्लाई श्रेणी को कवर करती है।
            तय ब्लॉक आवर्स से बाहर सप्लाई लेने वाले उपभोक्ता इसकी बजाय
            ₹7.00/यूनिट प्लस ₹60/HP/माह का फिक्स्ड चार्ज चुकाते हैं — अलग
            से मॉडल नहीं किया गया।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: रेजिडेंशियल के अलावा, यहां हर श्रेणी में कम से कम एक
            खपत या लोड टियर है जो मॉडल नहीं किया गया — किसी आंकड़े पर भरोसा
            करने से पहले जांच लें कि आप असल में किस बैंड में आते हैं।
          </p>
        </section>

        <section aria-labelledby="fixed-charges" className="mt-10 scroll-mt-20">
          <h2 id="fixed-charges" className={h2Cls}>
            श्रेणी के हिसाब से फिक्स्ड चार्ज
          </h2>
          <p className={pCls}>
            यहां हर श्रेणी अपना फिक्स्ड चार्ज{' '}
            <strong>स्वीकृत लोड के प्रति kW (या प्रति-HP, यहां kW में
            कन्वर्ट किया गया)</strong> बिल करती है, एक फ्लैट प्रति-कनेक्शन
            राशि के रूप में नहीं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 text-right font-semibold">दर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">रेजिडेंशियल</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹275/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">कमर्शियल (≤500 यूनिट/माह)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹160/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">इंडस्ट्रियल (≤500 यूनिट/माह)</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹120.64/kW</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">कृषि</td>
                  <td className="px-4 py-2 text-right tabular-nums">₹40.21/kW</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: यहां किसी भी श्रेणी में रेजिडेंशियल सबसे ऊंचा प्रति-kW
            फिक्स्ड चार्ज चुकाता है — वही स्वीकृत लोड के लिए कमर्शियल दर से
            दोगुने से भी ज़्यादा।
          </p>
        </section>

        <section aria-labelledby="fca" className="mt-10 scroll-mt-20">
          <h2 id="fca" className={h2Cls}>
            फ्यूल/वेरिएबल-कॉस्ट सरचार्ज
          </h2>
          <p className={pCls}>
            इस सीरीज़ के कई डिस्कॉम के उलट, JVVNL का डेटा वाकई एक
            फ्यूल/वेरिएबल-कॉस्ट सरचार्ज मॉडल करता है:{' '}
            <strong>₹0.22/यूनिट</strong>, जो हर इस्तेमाल की गई यूनिट पर लागू
            होता है। इस तरह के चार्ज के पीछे के सामान्य तंत्र के लिए देखें{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA समझाया गया
            </Link>
            ।
          </p>
          <p className={`mt-3 ${pCls}`}>
            हमारे पास ऊपर दी स्लैब दरों की तरह इस खास आंकड़े की पुष्टि करने
            वाला कोई समर्पित सोर्सिंग नोट नहीं है — इसे शामिल किया गया है
            क्योंकि यह एक असली, मॉडल किया गया आंकड़ा है, लेकिन अगर सटीक
            आंकड़ा आपके लिए मायने रखता है तो इसे अपने बिल की सरचार्ज लाइन
            से जांचें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: JVVNL इस सीरीज़ के उन चंद डिस्कॉम में से एक है जहां
            एक फ्यूल सरचार्ज असल में कैलकुलेटर में है, सिर्फ एक गैप के रूप
            में फ्लैग नहीं किया गया।
          </p>
        </section>

        <section aria-labelledby="duty" className="mt-10 scroll-mt-20">
          <h2 id="duty" className={h2Cls}>
            इलेक्ट्रिसिटी ड्यूटी — हमारे डेटा में एक खुला गैप
          </h2>
          <p className={pCls}>
            हम राजस्थान की इलेक्ट्रिसिटी ड्यूटी को{' '}
            <strong>फिलहाल मॉडल नहीं करते</strong>। इस सीरीज़ के ज़्यादातर
            अन्य राज्यों के उलट, जो एनर्जी चार्ज के प्रतिशत के रूप में ड्यूटी
            लेते हैं, राजस्थान में आम तौर पर एक <strong>प्रति-यूनिट</strong>{' '}
            ड्यूटी (लगभग 40 पैसे/यूनिट) प्लस एक अलग अर्बन सेस बताई जाती है —
            इनमें से कोई भी इस गाइड की टेबल या कैलकुलेटर में नहीं है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            तुलना के लिए, केरल का KSEB एक सत्यापित 5% और महाराष्ट्र का
            MSEDCL एक सत्यापित 16% लेता है — हमारी{' '}
            <Link href="/hi/blog/kseb-complete-guide-electricity-bill" className="text-brass underline">
              KSEB
            </Link>{' '}
            और{' '}
            <Link href="/hi/blog/msedcl-complete-guide-electricity-bill" className="text-brass underline">
              MSEDCL
            </Link>{' '}
            पूरी गाइड देखें। जब तक हम किसी प्राइमरी RERC ऑर्डर के मुकाबले
            राजस्थान की असली प्रति-यूनिट दर की पुष्टि नहीं कर सकते,
            कैलकुलेटर की इस अनुपस्थिति को शून्य-ड्यूटी नीति मानने की बजाय
            अपने बिल की ड्यूटी लाइन सीधे जांचें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अनमॉडल्ड ड्यूटी और अर्बन सेस के बीच, अपने असली JVVNL
            बिल के इस गाइड के बुनियादी अनुमान से थोड़ा ज़्यादा होने की उम्मीद
            रखें।
          </p>
        </section>

        <section aria-labelledby="how-to-pay" className="mt-10 scroll-mt-20">
          <h2 id="how-to-pay" className={h2Cls}>
            अपना JVVNL बिल कैसे जांचें और चुकाएं
          </h2>
          <p className={pCls}>
            सामान्य तरीका, JVVNL के अपने पोर्टल के ज़रिए (सही स्क्रीन समय के
            साथ बदल सकती हैं):
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'energy.rajasthan.gov.in/jvvnl पर आधिकारिक JVVNL पोर्टल पर जाएं।',
              'अपना मौजूदा बिल पाने के लिए अपना K-Number (Consumer ID) डालें।',
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
            बिलिंग सवालों या आउटेज के लिए, JVVNL की हेल्पलाइन{' '}
            <strong>1912</strong> या <strong>1800-180-6507</strong> है, जो
            24×7 उपलब्ध है — यह गाइड और हमारा कैलकुलेटर अनुमान लगाने वाले
            टूल हैं, अकाउंट-विशिष्ट मामलों के लिए आधिकारिक पोर्टल का विकल्प
            नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अकाउंट-विशिष्ट किसी भी चीज़ के लिए — बकाया, कोई
            विवादित रीडिंग, क्या आप असल में JVVNL पर हैं या AVVNL/JdVVNL पर
            — सीधे आधिकारिक पोर्टल या हेल्पलाइन पर जाएं, किसी कैलकुलेटर पर
            नहीं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: 250 यूनिट, एक महीना, घरेलू कनेक्शन
          </h2>
          <p className={pCls}>
            ऊपर दिए सत्यापित स्लैब का इस्तेमाल करते हुए, यहां एक महीने में
            250 यूनिट इस्तेमाल करने वाले घरेलू कनेक्शन की पूरी गणना है, 2 kW
            स्वीकृत लोड के साथ:
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
            यह ₹1,967.50 सिर्फ यहां मॉडल किए गए एनर्जी चार्ज, फिक्स्ड चार्ज
            और फ्यूल सरचार्ज को कवर करता है — आपके असली बिल में ऊपर बताई
            राजस्थान की अनमॉडल्ड इलेक्ट्रिसिटी ड्यूटी और अर्बन सेस भी शामिल
            हैं, इसलिए अपने JVVNL बिल के असली आंकड़े के थोड़ा ज़्यादा होने
            की उम्मीद रखें। रेजिडेंशियल के अलावा किसी भी श्रेणी सहित अपनी
            सही यूनिट्स और स्वीकृत लोड{' '}
            <Link href="/hi/electricity/rajasthan-electricity-bill-calculator" className="text-brass underline">
              JVVNL बिल कैलकुलेटर
            </Link>{' '}
            पर चलाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: देखें कि इस बिल का कितना हिस्सा (₹1,967.50 में से
            ₹550) सिर्फ फिक्स्ड चार्ज है — यह JVVNL की असामान्य रूप से ऊंची
            ₹275/kW दर का सीधा नतीजा है।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/electricity-bill-guides"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📚
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                सभी बिजली बिल गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                पूरी कम्प्लीट गाइड डायरेक्टरी देखें, राज्य दर राज्य। (अंग्रेज़ी)
              </p>
            </Link>
            <Link
              href="/hi/electricity/rajasthan-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                JVVNL बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इन्हीं सत्यापित स्लैब पर आधारित आपका अपना ब्यौरेवार अनुमान।
              </p>
            </Link>
            <Link
              href="/hi/blog/kseb-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                KSEB पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                वही रेजिडेंशियल-कमर्शियल से कमज़ोर सोर्सिंग पैटर्न।
              </p>
            </Link>
            <Link
              href="/hi/blog/pspcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PSPCL (पंजाब) पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                यहां कोई ऊंचा फिक्स्ड चार्ज नहीं, लेकिन इसकी बजाय एक तीखी
                300-यूनिट ऑल-ऑर-नथिंग फ्री-पावर क्लिफ।
              </p>
            </Link>
            <Link
              href="/hi/blog/wbsedcl-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                WBSEDCL पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                पश्चिम बंगाल का अपना अपुष्ट-ड्यूटी गैप, तुलना के लिए।
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
                JVVNL के चार बैंड के पीछे का सामान्य तंत्र।
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
                आपका बिल यूनिट्स न बदलने पर भी क्यों बदलता है।
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
          सत्यापित रिकॉर्ड के आधार पर {TARIFF_DATA_REFRESHED} को अपडेट किया
          गया। कमर्शियल, इंडस्ट्रियल और कृषि दरें सीधे JVVNL के अपने{' '}
          <a
            href="https://cescrajasthan.co.in/kedl/pages/event/uploads/Tariff-2025%202.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            &ldquo;Tariff for Supply of Electricity-2025&rdquo;
          </a>{' '}
          शेड्यूल से सोर्स की गई हैं, 1 अप्रैल 2025 से प्रभावी। रेजिडेंशियल
          स्लैब एक प्राइमरी-डॉक्यूमेंट क्रॉस-चेक के लंबित सेकंडरी-सोर्स्ड
          हैं। कमर्शियल, इंडस्ट्रियल और कृषि के ऊंचे खपत/लोड टियर, राजस्थान
          की प्रति-यूनिट इलेक्ट्रिसिटी ड्यूटी, और अर्बन सेस आगे की सोर्सिंग
          के लंबित साफ तौर पर मॉडल नहीं की गई हैं। दरें समय-समय पर संशोधित
          होती हैं — ऊपर दिया कैलकुलेटर मौजूदा रखा जाता है; इस लेख को उसके
          साथ एक व्याख्यात्मक रेफरेंस के रूप में लें। इस साइट पर हम टैरिफ
          डेटा कैसे सोर्स और सत्यापित करते हैं, इसके लिए हमारी{' '}
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
