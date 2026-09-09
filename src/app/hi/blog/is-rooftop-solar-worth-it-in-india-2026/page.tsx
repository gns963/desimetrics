import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/is-rooftop-solar-worth-it-in-india-2026'
const TITLE = '2026 में भारत में रूफटॉप सोलर लगाना फायदेमंद है?'
const DESCRIPTION =
  '2026 में भारत में रूफटॉप सोलर लगाना फायदेमंद है? असली खर्च, PM सूर्य घर सब्सिडी और पेबैक रेंज देखें, साथ ही यह भी कि किसे यह लगवाना चाहिए — और किसे नहीं।'

export const metadata: Metadata = {
  title: '2026 में भारत में रूफटॉप सोलर लगाना फायदेमंद है?',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/blog/is-rooftop-solar-worth-it-in-india-2026'),
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
  datePublished: '2026-09-02',
  dateModified: '2026-09-02',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'क्या रूफटॉप सोलर बिजली कटने के दौरान काम करता है?',
    a: 'नहीं — एक स्टैंडर्ड ग्रिड-टाइड सोलर सिस्टम बिजली कटने के दौरान अपने आप बंद हो जाता है, ग्रिड पर काम कर रहे लाइनमैन की सुरक्षा के लिए। आउटेज के दौरान बिजली चालू रखने के लिए, आपको बैटरी वाला हाइब्रिड इन्वर्टर चाहिए, जो एक अच्छा-खासा अतिरिक्त खर्च जोड़ता है।',
  },
  {
    q: 'क्या मुझे रूफटॉप सोलर के लिए बैटरी चाहिए?',
    a: 'नेट मीटरिंग इस्तेमाल करने वाले एक स्टैंडर्ड ग्रिड-टाइड सिस्टम के लिए नहीं — आपकी अतिरिक्त दिन की बिजली स्टोर होने की बजाय ग्रिड को एक्सपोर्ट हो जाती है। बैटरी सिर्फ तब चाहिए जब आपको खास तौर पर आउटेज के दौरान बैकअप पावर चाहिए।',
  },
  {
    q: '3kW सोलर सिस्टम के लिए कितनी छत की जगह चाहिए?',
    a: 'आम तौर पर करीब 300 वर्ग फुट बताया जाता है, पैनल के हर kW के लिए लगभग 100 वर्ग फुट के हिसाब से, हालांकि यह पैनल की क्षमता और लेआउट के हिसाब से अलग होता है। सटीक आंकड़े के लिए अपनी छत के आयामों के साथ एक पैनल साइज़ कैलकुलेटर इस्तेमाल करें।',
  },
  {
    q: 'क्या PM सूर्य घर सब्सिडी हर राज्य में एक जैसी है?',
    a: 'केंद्रीय सब्सिडी — पहले 2kW के लिए ₹30,000/kW और तीसरे kW के लिए ₹18,000, कुल ₹78,000 तक सीमित — पूरे देश में एक जैसी है। कुछ राज्य इसके ऊपर अतिरिक्त टॉप-अप सब्सिडी भी देते हैं, इसलिए अपने राज्य सरकार की मौजूदा योजना भी जांचें।',
  },
  {
    q: 'अगर बिजली की दरें बढ़ती हैं तो सोलर की बचत का क्या होता है?',
    a: 'आपकी बचत असल में बेहतर होती है, क्योंकि आपके पैनल जो भी यूनिट बनाते हैं वह एक यूनिट की जगह लेती है जो आपने वरना नई, ऊंची दर पर खरीदी होती। यह एक बड़ी वजह है कि शहरी दरें बढ़ने के साथ सोलर की इकोनॉमिक्स बेहतर हुई है।',
  },
  {
    q: 'क्या मैं किराए के घर में रूफटॉप सोलर लगवा सकता हूं?',
    a: 'मकान मालिक की सहमति से यह तकनीकी रूप से संभव है, लेकिन सब्सिडी आवेदन और नेट-मीटरिंग कागज़ी कार्रवाई आम तौर पर संपत्ति के मालिक के नाम पर होती है। व्यवहार में, रूफटॉप सोलर उन घरों के लिए सबसे उपयुक्त है जो आपके अपने हैं या जहां आप लंबे समय तक रहने की योजना बना रहे हैं।',
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
  ['सिस्टम साइज़', '3 kW'],
  ['सब्सिडी से पहले सिस्टम खर्च (उदाहरण)', '₹1,70,000'],
  ['PM सूर्य घर सब्सिडी (3kW+, सीमित)', '₹78,000'],
  ['सब्सिडी के बाद नेट खर्च', '₹92,000'],
  ['अनुमानित मासिक जनरेशन', '~360 यूनिट (~4 यूनिट/kW/दिन)'],
  ['अनुमानित मासिक बचत (उदाहरण, मिश्रित दर)', '~₹2,160'],
  ['अनुमानित सालाना बचत', '~₹25,920'],
  ['लगभग पेबैक अवधि', '~3.5 साल (उदाहरण के तौर पर)'],
]

export default function SolarWorthItArticlePageHi() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'रूफटॉप सोलर 2026', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Explainer
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
          · अपडेट 2 सितंबर 2026
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          उपयुक्त, बिना छाया वाली छत रखने वाले ज़्यादातर घर मालिकों के लिए,{' '}
          <strong>2026 में भारत में रूफटॉप सोलर लगाना फायदेमंद है</strong> — एक
          सामान्य 3kW सिस्टम अब PM सूर्य घर सब्सिडी के बाद अपना नेट खर्च
          लगभग <strong>3 से 6 साल</strong> में वसूल कर लेता है, फिर पैनल की
          25 साल की ज़्यादातर ज़िंदगी तक बचत करता रहता है। यह उन घरों के
          लिए सबसे तेज़ काम करता है जिनका दिन का बिजली बिल ऊंचा है और टॉप
          टैरिफ स्लैब पर हैं, और सबसे धीमा कम-इस्तेमाल वाले घरों या कमज़ोर
          नेट-मीटरिंग नियमों वाले राज्यों के लिए।
        </p>

        <section aria-labelledby="cost" className="mt-10 scroll-mt-20">
          <h2 id="cost" className={h2Cls}>
            2026 में रूफटॉप सोलर का असल खर्च कितना है?
          </h2>
          <p className={pCls}>
            एक सामान्य रेजिडेंशियल 3kW सिस्टम — जो कई छोटे भारतीय घरों के
            लिए काफी है — आम तौर पर सब्सिडी से पहले{' '}
            <strong>₹1.5–1.9 लाख के आसपास</strong> खर्च होता है, आपके
            इंस्टॉलर, पैनल ब्रांड और राज्य के हिसाब से। बड़े या प्रीमियम
            सिस्टम अनुपात में ज़्यादा खर्च करते हैं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            केंद्रीय सब्सिडी के बाद, वही 3kW सिस्टम आम तौर पर लगभग{' '}
            <strong>₹75,000–1.1 लाख</strong> पर आ जाता है। ये आम तौर पर
            बताई गई रेंज हैं, तय कीमतें नहीं — अपनी खास छत के लिए हमेशा
            MNRE-सूचीबद्ध इंस्टॉलर से कोटेशन लें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: एक 3kW सिस्टम की सब्सिडी से पहले लगभग ₹1.5–1.9 लाख और
            बाद में लगभग ₹75,000–1.1 लाख खर्च होने की उम्मीद रखें — इस रेंज
            से बाहर के किसी भी कोटेशन को गौर से जांचें।
          </p>
        </section>

        <section aria-labelledby="subsidy" className="mt-10 scroll-mt-20">
          <h2 id="subsidy" className={h2Cls}>
            PM सूर्य घर के तहत आपको कितनी सब्सिडी मिल सकती है?
          </h2>
          <p className={pCls}>
            <strong>PM सूर्य घर: मुफ्त बिजली योजना</strong> केंद्र सरकार की
            रूफटॉप सोलर सब्सिडी योजना है। यह पहले{' '}
            <strong>2kW के लिए ₹30,000 प्रति kW</strong>, और{' '}
            <strong>तीसरे kW के लिए ₹18,000</strong> देती है — इसलिए 3kW या
            उससे बड़े सिस्टम को पूरा <strong>₹78,000</strong> कैप मिलता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            कुछ राज्य सरकारें केंद्रीय राशि के ऊपर अपनी टॉप-अप सब्सिडी
            जोड़ती हैं — किसी अतिरिक्त योजना के लिए अपने राज्य के नवीकरणीय
            ऊर्जा विभाग से जांचें, क्योंकि यह अलग होती है और अकेले केंद्रीय
            सब्सिडी में शामिल नहीं है। अपनी सटीक पात्र राशि जांचने के लिए
            हमारा{' '}
            <Link href="/hi/solar/subsidy-calculator" className="text-brass underline">
              PM सूर्य घर सब्सिडी कैलकुलेटर
            </Link>{' '}
            इस्तेमाल करें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अकेले केंद्रीय सब्सिडी 3kW सिस्टम की शुरुआती लागत का
            लगभग 40–50% कवर कर सकती है — इसके ऊपर राज्य टॉप-अप के लिए भी
            जांचें।
          </p>
        </section>

        <section aria-labelledby="payback" className="mt-10 scroll-mt-20">
          <h2 id="payback" className={h2Cls}>
            खर्च वसूल करने में कितना समय लगता है (पेबैक अवधि)?
          </h2>
          <p className={pCls}>
            "पेबैक अवधि" का सीधा मतलब है आपकी मासिक बिजली बचत को सिस्टम पर
            खर्च की गई रकम तक पहुंचने में कितना समय लगता है। 2026 तक,
            सब्सिडी के बाद एक अच्छे-साइज़ के रेजिडेंशियल सिस्टम के लिए{' '}
            <strong>3 से 6 साल</strong> का पेबैक आम तौर पर बताया जाता है —
            लेकिन यह एक रेंज है, गारंटी नहीं, और यह काफी हद तक आपके अपने
            आंकड़ों पर निर्भर करता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            बताई गई पेबैक अवधि स्रोतों के हिसाब से काफी अलग होती है क्योंकि
            यह आपके राज्य की बिजली दर, आप दिन के समय असल में कितनी बिजली
            इस्तेमाल करते हैं, और आपके DISCOM के{' '}
            <Link href="/hi/solar/net-metering-calculator" className="text-brass underline">
              नेट मीटरिंग
            </Link>{' '}
            नियमों पर निर्भर करती है — यह वह नीति है जो आपको वापस ग्रिड में
            एक्सपोर्ट की गई सोलर बिजली के लिए क्रेडिट देती है, बजाय इसे
            खुद इस्तेमाल करने के। एक DISCOM (डिस्ट्रिब्यूशन कंपनी) बस वह
            यूटिलिटी है जो आपकी बिजली सप्लाई और बिल करती है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: "3–6 साल" को एक व्यावहारिक योजना रेंज मानें, और किसी
            इंस्टॉलर के ब्रोशर के एक आंकड़े पर भरोसा करने की बजाय अपने खुद
            के आंकड़े निकालें।
          </p>
        </section>

        <section aria-labelledby="factors" className="mt-10 scroll-mt-20">
          <h2 id="factors" className={h2Cls}>
            कौन से कारक सोलर को तेज़ या धीमा फायदेमंद बनाते हैं?
          </h2>
          <ul className="space-y-2">
            {[
              ['आपकी बिजली दर', 'ऊंची टॉप-स्लैब दरें (कई शहरों में अब ₹8–10/यूनिट) का मतलब है कि हर सोलर यूनिट आपको ज़्यादा बचाती है।'],
              ['आपकी टैरिफ कितनी टेलिस्कोपिक है', 'चूंकि भारतीय बिजली टेलिस्कोपिक स्लैब में बिल होती है, सोलर आपकी सबसे महंगी यूनिट्स को पहले ऑफसेट करता है — तंत्र के लिए देखें टेलिस्कोपिक स्लैब असल में कैसे काम करते हैं।'],
              ['दिन के समय इस्तेमाल का पैटर्न', 'जो घर दिन के उजाले में ज़्यादा बिजली इस्तेमाल करते हैं उन्हें कम-मूल्य वाले ग्रिड एक्सपोर्ट क्रेडिट के मुकाबले सेल्फ-कंज़म्पशन से ज़्यादा फायदा मिलता है।'],
              ['आपके राज्य के नेट मीटरिंग नियम', 'एक उदार एक्सपोर्ट क्रेडिट दर पेबैक तेज़ करती है; एक कमज़ोर दर इसे काफी धीमा कर देती है।'],
              ['छत की दिशा और छाया', 'छायादार या दक्षिण-मुखी नहीं छत उतने ही पैनलों के लिए कम बिजली बनाती है, जिससे पेबैक लंबा हो जाता है।'],
              ['सब्सिडी प्रोसेसिंग की गति', 'सब्सिडी वितरण या नेट-मीटर इंस्टॉलेशन में देरी आपके असरदार पेबैक समय को आगे धकेलती है।'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: पेबैक की गति ज़्यादातर आपकी दर और दिन के इस्तेमाल के
            पैटर्न पर निर्भर करती है — वही सिस्टम एक ऊंची-दर, ऊंचे-दिन-
            इस्तेमाल वाले घर में एक कम-इस्तेमाल वाले घर से कहीं ज़्यादा
            तेज़ी से वसूल होता है।
          </p>
        </section>

        <section aria-labelledby="pros-cons" className="mt-10 scroll-mt-20">
          <h2 id="pros-cons" className={h2Cls}>
            भारत में रूफटॉप सोलर के फायदे और नुकसान
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-spark-teal/25 bg-spark-teal/5 p-5">
              <p className="font-display font-bold text-spark-teal">फायदे</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {[
                  'वसूल होने के बाद, पैनलों की ~25 साल की ज़िंदगी के लिए कम बिजली बिल',
                  'केंद्रीय सब्सिडी शुरुआती खर्च को ₹78,000 तक कम करती है',
                  'बढ़ती बिजली दरों के खिलाफ एक बचाव',
                  'कुछ खरीदारों के लिए रीसेल वैल्यू बढ़ा सकता है',
                  'न्यूनतम चालू रखरखाव — मुख्य रूप से समय-समय पर पैनल की सफाई',
                ].map((t) => (
                  <li key={t} className={pCls}>• {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5">
              <p className="font-display font-bold text-caution-amber">नुकसान</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {[
                  'सब्सिडी के बाद भी असली शुरुआती नकद खर्च',
                  'सच में बिना छाया वाली, संरचनात्मक रूप से मज़बूत छत चाहिए',
                  'पेबैक राज्य के हिसाब से काफी अलग होता है — हर जगह तेज़ नहीं',
                  'सब्सिडी और नेट-मीटरिंग कागज़ी कार्रवाई धीमी हो सकती है',
                  'बैटरी जोड़े बिना आउटेज के दौरान बिजली नहीं',
                  'अगर आप कुछ सालों में शिफ्ट होने की योजना बना रहे हैं तो कम फायदेमंद',
                ].map((t) => (
                  <li key={t} className={pCls}>• {t}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: फायदे लंबी अवधि के घर मालिकों के लिए सबसे मज़बूत हैं
            जिनके पास अच्छी छत और कम करने के लिए असली बिल है — नुकसान
            किराएदारों, कम समय रुकने वालों, और छायादार छतों के लिए सबसे
            ज़्यादा मायने रखते हैं।
          </p>
        </section>

        <section aria-labelledby="not-for" className="mt-10 scroll-mt-20">
          <h2 id="not-for" className={h2Cls}>
            अभी किसे रूफटॉप सोलर नहीं लगवाना चाहिए?
          </h2>
          <p className={pCls}>सोलर अभी कम समझदारी भरा है अगर:</p>
          <ul className="mt-3 space-y-2">
            {[
              'आपकी छत दिन के बड़े हिस्से के लिए काफी छायादार है, या संरचनात्मक रूप से अनुपयुक्त है।',
              'आपका मासिक बिजली बिल पहले से बहुत छोटा है — बचाने के लिए बहुत कम है।',
              'आप किराए पर रह रहे हैं, या अगले 2–3 सालों में शिफ्ट होने की योजना बना रहे हैं।',
              'आपके राज्य या DISCOM की नेट-मीटरिंग मंज़ूरी खराब या काफी देरी वाली है।',
              'आप सब्सिडी के बाद भी नेट शुरुआती खर्च आराम से वहन नहीं कर सकते।',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-caution-amber" aria-hidden>✕</span>
                <span className={pCls}>{t}</span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: सोलर हर जगह सही नहीं है — यह एक लंबी अवधि के घर मालिक
            का निवेश है, हर घर के लिए एक झटपट समाधान नहीं।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            असली उदाहरण: एक सामान्य 3kW घर सिस्टम की बचत
          </h2>
          <p className={pCls}>
            यहां 3kW सिस्टम के लिए एक पूरी तरह हल किया गया,{' '}
            <strong>उदाहरण के तौर पर</strong> मामला है — हर आंकड़े को एक
            उदाहरण मानें, आपके घर के लिए कोटेशन नहीं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample.map(([label, value]) => (
                  <tr key={label}>
                    <td className="px-4 py-2.5 font-medium text-ash/70">
                      {label}
                    </td>
                    <td className="px-4 py-2.5 text-right font-display font-bold tabular-nums text-hub-solar">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            पैनलों की ~25 साल की वारंटी अवधि में, <strong>₹6–15 लाख</strong>{' '}
            की रेंज में जीवनभर की बचत आम तौर पर बताई जाती है — यह चौड़ी
            रेंज दिखाती है कि दरें, इस्तेमाल और नेट-मीटरिंग नियम घर-घर कितने
            अलग होते हैं। अपने असली DISCOM टैरिफ पर आधारित हमारे{' '}
            <Link href="/hi/solar/roi-calculator" className="text-brass underline">
              सोलर ROI कैलकुलेटर
            </Link>{' '}
            से अपने खुद के आंकड़े निकालें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: एक 3kW सिस्टम आम तौर पर सब्सिडी के बाद ₹1 लाख से कम
            पर आ जाता है, वसूल होने के बाद कई सालों तक ₹2,000+ मासिक बचत
            के साथ।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/solar/subsidy-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>💸</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                PM सूर्य घर सब्सिडी कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपनी सटीक पात्रता और सब्सिडी राशि जांचें।
              </p>
            </Link>
            <Link
              href="/hi/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📈</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                सोलर ROI कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपने DISCOM पर आधारित असली पेबैक और 25 साल की बचत देखें।
              </p>
            </Link>
            <Link
              href="/hi/solar/panel-size-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📐</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                पैनल साइज़ कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                आपको असल में कौन सा सिस्टम साइज़ और छत का एरिया चाहिए।
              </p>
            </Link>
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📘</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                सोलर आपकी सबसे महंगी यूनिट्स को पहले क्यों ऑफसेट करता है।
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
          स्रोत: PM सूर्य घर की केंद्रीय सब्सिडी आंकड़े{' '}
          <a
            href="https://pmsuryaghar.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            नेशनल पोर्टल फॉर रूफटॉप सोलर (MNRE)
          </a>{' '}
          के अनुसार। खर्च, दरें और पेबैक अवधि राज्य, इंस्टॉलर और घर के
          इस्तेमाल के हिसाब से अलग होती हैं, और समय-समय पर बदलती हैं —
          फैसला लेने से पहले हमेशा आधिकारिक पोर्टल और अपने राज्य के DISCOM
          से मौजूदा आंकड़ों की पुष्टि करें।
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
