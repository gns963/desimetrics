import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide'
const TITLE =
  'PM सूर्य घर मुफ्त बिजली योजना: पूरी सब्सिडी गाइड (₹78,000, पात्रता, आवेदन कैसे करें) — 2026'
const DESCRIPTION =
  'PM सूर्य घर मुफ्त बिजली योजना समझाई गई: ₹78,000 तक की सब्सिडी राशि, कौन पात्र है, कौन से दस्तावेज़ चाहिए, आवेदन कैसे करें, आम रिजेक्शन के कारण — और यह आपके बिल के लिए असल में क्या मायने रखता है।'
const LAST_VERIFIED = '11 सितंबर 2026'

export const metadata: Metadata = {
  title: 'PM सूर्य घर सब्सिडी गाइड 2026 — ₹78,000, पात्रता और आवेदन',
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

const faqs = [
  {
    q: 'PM सूर्य घर मुफ्त बिजली योजना क्या है?',
    a: 'यह केंद्र सरकार की रूफटॉप सोलर योजना है, जिसे फरवरी 2024 में नवीन और नवीकरणीय ऊर्जा मंत्रालय (MNRE) ने शुरू किया था, जो घरों को सोलर पैनल लगाने और अपना बिजली बिल कम करने में मदद के लिए ₹78,000 तक की सब्सिडी देती है — यह राज्य डिस्कॉम के ज़रिए लागू होती है और pmsuryaghar.gov.in पर आवेदन किया जाता है।',
  },
  {
    q: 'क्या "मुफ्त बिजली योजना" PM सूर्य घर जैसी ही योजना है?',
    a: 'हां। "PM सूर्य घर," "मुफ्त बिजली योजना" और "फ्री बिजली योजना" — ये सभी एक ही योजना के लिए लोगों द्वारा इस्तेमाल किए जाने वाले बोलचाल के छोटे नाम हैं — पूरा आधिकारिक नाम प्रधानमंत्री सूर्य घर: मुफ्त बिजली योजना है। इन अन्य नामों से कोई अलग योजना नहीं है।',
  },
  {
    q: 'PM सूर्य घर के तहत मुझे कितनी सब्सिडी मिल सकती है?',
    a: 'पहले 2 kW के लिए ₹30,000 प्रति kW (1 kW सिस्टम के लिए ₹30,000, 2 kW के लिए ₹60,000), साथ ही तीसरे kW के लिए ₹18,000। 3 kW या उससे बड़े सिस्टम को पूरी सीमित राशि ₹78,000 मिलती है — सिस्टम का आकार चाहे जो भी हो, इससे ज़्यादा कोई अतिरिक्त केंद्रीय सब्सिडी नहीं।',
  },
  {
    q: 'क्या मैं PM सूर्य घर सब्सिडी के लिए पात्र हूं?',
    a: 'आपको अपने नाम पर घरेलू बिजली कनेक्शन वाला एक भारतीय नागरिक होना चाहिए, और सोलर के लिए उपयुक्त छत होनी चाहिए। आपका स्वीकृत लोड आम तौर पर एक सीमा (अक्सर 10 kW बताई जाती है) के भीतर होना ज़रूरी है, और आपका प्रस्तावित सिस्टम आपके स्वीकृत डिस्कॉम लोड से ज़्यादा नहीं हो सकता।',
  },
  {
    q: 'आवेदन के लिए मुझे कौन से दस्तावेज़ चाहिए?',
    a: 'आम तौर पर: आधार कार्ड, आपका नवीनतम बिजली बिल (कनेक्शन आपके नाम पर होना चाहिए), सब्सिडी ट्रांसफर के लिए बैंक पासबुक या कैंसिल चेक, छत के मालिकाना हक का सबूत (प्रॉपर्टी टैक्स रसीद, रजिस्ट्री, या अगर आप किराएदार हैं तो मालिक से NOC), और एक हाल की फोटो।',
  },
  {
    q: 'आवेदन के बाद सब्सिडी मिलने में कितना समय लगता है?',
    a: 'आम तौर पर बताई गई समयसीमा सब्सिडी ट्रांसफर के लिए ही लगभग 30–45 दिन है, और आवेदन से लेकर डिस्कॉम इंस्पेक्शन, ग्रिड कमीशनिंग और भुगतान तक पूरी प्रक्रिया के लिए 45–90 दिन तक। इन्हें सामान्य सीमाओं के रूप में लें, गारंटी नहीं — देरी होती रहती है।',
  },
  {
    q: 'PM सूर्य घर के आवेदन आम तौर पर रिजेक्ट क्यों होते हैं?',
    a: 'सबसे ज़्यादा बताए गए कारण हैं: ऐसे सोलर पैनल इस्तेमाल करना जो ALMM (एप्रूव्ड लिस्ट ऑफ मॉडल्स एंड मैन्युफैक्चरर्स) में नहीं हैं, एक आधार-लिंक्ड बैंक अकाउंट जो DBT के लिए ठीक से सीड नहीं है, और अपने स्वीकृत डिस्कॉम लोड से बड़ा सिस्टम साइज़ प्रस्तावित करना।',
  },
  {
    q: 'क्या PM सूर्य घर वाकई हर महीने 300 यूनिट मुफ्त बिजली देती है?',
    a: 'यह आंकड़ा एक डिज़ाइन अनुमान है: एक करीब 3 kW का सिस्टम एक औसत घर के लिए महीने में लगभग 300 यूनिट बनाने के हिसाब से बनाया गया है, जो एक सामान्य बिल को लगभग शून्य तक ला सकता है। आपका असली जनरेशन आपकी छत की धूप, छाया, सिस्टम साइज़ और स्थान पर निर्भर करता है — यह हर घर के लिए गारंटीशुदा आंकड़ा नहीं है।',
  },
  {
    q: 'क्या किराएदार PM सूर्य घर के लिए आवेदन कर सकते हैं?',
    a: 'व्यवहार में यह मुश्किल है। बिजली कनेक्शन और छत के मालिकाना हक का सबूत आम तौर पर आवेदक के नाम पर चाहिए होता है, हालांकि एक किराएदार प्रॉपर्टी मालिक के NOC के साथ आवेदन कर सकता है। सब्सिडी और नेट-मीटरिंग कागज़ी कार्रवाई आम तौर पर सबसे आसान तब होती है जब आवेदक ही घर का मालिक हो।',
  },
  {
    q: 'PM सूर्य घर के लिए ऑनलाइन आवेदन कैसे करें?',
    a: 'राष्ट्रीय पोर्टल, pmsuryaghar.gov.in पर अपने राज्य, डिस्कॉम और बिजली कंज़्यूमर नंबर के साथ रजिस्टर करें, फिर स्क्रीन पर दिए स्टेप्स का पालन करें: फ़िज़िबिलिटी अप्रूवल, एक MNRE-सूचीबद्ध वेंडर चुनना, इंस्टॉलेशन, डिस्कॉम इंस्पेक्शन, नेट-मीटर कमीशनिंग, और आख़िर में सब्सिडी के लिए अपनी बैंक डिटेल जमा करना।',
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

const subsidyRows: [string, string][] = [
  ['1 kW', '₹30,000'],
  ['2 kW', '₹60,000'],
  ['3 kW या उससे बड़ा', '₹78,000 (सीमित — आकार चाहे जो भी हो, इससे ज़्यादा कोई सब्सिडी नहीं)'],
]

const documentRows: [string, string][] = [
  ['आधार कार्ड', 'आवेदक की पहचान सत्यापन'],
  ['नवीनतम बिजली बिल', 'कनेक्शन आवेदक के नाम पर होना चाहिए'],
  ['बैंक पासबुक / कैंसिल चेक', 'डायरेक्ट बेनिफिट ट्रांसफर (DBT) के ज़रिए सब्सिडी भुगतान'],
  [
    'छत के मालिकाना हक का सबूत',
    'प्रॉपर्टी टैक्स रसीद या रजिस्ट्री, या अगर आवेदक किराएदार है तो मालिक से NOC',
  ],
  ['हाल की फोटो', 'आवेदन की ज़रूरत'],
]

const workedExample: [string, string][] = [
  ['चुना गया सिस्टम साइज़', '3 kW'],
  [
    'सब्सिडी से पहले अनुमानित सिस्टम लागत',
    'वेंडर, पैनल ब्रांड और राज्य के हिसाब से अलग — MNRE-सूचीबद्ध इंस्टॉलर से कोटेशन लें',
  ],
  ['केंद्रीय सब्सिडी', '₹78,000'],
  ['नेट अग्रिम लागत', 'सिस्टम लागत घटाकर ₹78,000'],
  [
    'मासिक बिल में कमी',
    'आपके असल जनरेशन और आपके राज्य की टैरिफ संरचना पर निर्भर',
  ],
]

export default function PmSuryaGharArticlePageHi() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'PM सूर्य घर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> सरकारी योजना
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
          · अपडेट {LAST_VERIFIED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>PM सूर्य घर: मुफ्त बिजली योजना</strong> — जिसे रोज़मर्रा की खोज में
          &ldquo;मुफ्त बिजली योजना&rdquo; या &ldquo;फ्री बिजली योजना&rdquo; भी कहा
          जाता है, ये सभी एक ही केंद्र सरकार की योजना के नाम हैं — भारत का रूफटॉप
          सोलर सब्सिडी कार्यक्रम है, जिसे फरवरी 2024 में नवीन और नवीकरणीय ऊर्जा
          मंत्रालय (MNRE) ने शुरू किया। यह <strong>पहले 2 kW के लिए ₹30,000 प्रति
          kW</strong> की केंद्रीय सब्सिडी देती है, साथ ही{' '}
          <strong>तीसरे kW के लिए ₹18,000</strong>, जो 3 kW या उससे बड़े सिस्टम के
          लिए अधिकतम <strong>₹78,000</strong> तक सीमित है। यह योजना इस तरह डिज़ाइन
          की गई है कि एक करीब 3 kW का सिस्टम एक औसत घर के लिए महीने में लगभग 300
          यूनिट की भरपाई कर सके — लेकिन यह आपके लिए असल में कितना फायदेमंद है, यह
          पूरी तरह आपके राज्य की टैरिफ और आपके अपने इस्तेमाल पर निर्भर करता है,
          जिसे समझने में यह गाइड (और हमारा कैलकुलेटर) आपकी मदद करेगा।
        </p>

        <section aria-labelledby="subsidy" className="mt-10 scroll-mt-20">
          <h2 id="subsidy" className={h2Cls}>
            आपको असल में कितनी सब्सिडी मिल सकती है?
          </h2>
          <p className={pCls}>
            केंद्रीय सब्सिडी सिस्टम साइज़ के साथ एक सीमा तक बढ़ती है। यहां सटीक
            स्लैब है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">सिस्टम साइज़</th>
                  <th className="px-4 py-2 font-semibold">केंद्रीय सब्सिडी</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {subsidyRows.map(([size, amount]) => (
                  <tr key={size}>
                    <td className="px-4 py-2 font-medium">{size}</td>
                    <td className="px-4 py-2 font-display font-bold text-hub-solar">
                      {amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            कुछ राज्य सरकारें इस केंद्रीय राशि के ऊपर अपनी खुद की टॉप-अप सब्सिडी
            जोड़ती हैं। यह हर जगह लागू नहीं है, और जहां मौजूद है वहां सटीक आंकड़ा
            राज्य के हिसाब से अलग होता है — यह मान लेने की बजाय कि आप पर टॉप-अप
            लागू होता है, अपने राज्य के नवीकरणीय ऊर्जा विभाग की मौजूदा अधिसूचना
            जांचें। आप जिस केंद्रीय राशि के लिए पात्र हैं उसे जांचने के लिए हमारा{' '}
            <Link href="/hi/solar/subsidy-calculator" className="text-brass underline">
              PM सूर्य घर सब्सिडी कैलकुलेटर
            </Link>{' '}
            इस्तेमाल करें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ₹78,000 एक सीमा है, शुरुआती बिंदु नहीं — यह सिर्फ 3 kW या
            उससे ऊपर लागू होती है, और एक छोटे सिस्टम को अनुपात में कम मिलता है।
          </p>
        </section>

        <section aria-labelledby="naming" className="mt-10 scroll-mt-20">
          <h2 id="naming" className={h2Cls}>
            &ldquo;मुफ्त बिजली योजना,&rdquo; &ldquo;फ्री बिजली योजना,&rdquo;
            &ldquo;PM सूर्य घर&rdquo; — क्या ये सब एक ही योजना है?
          </h2>
          <p className={pCls}>
            हां — ये अलग-अलग योजनाएं नहीं हैं। <strong>प्रधानमंत्री सूर्य घर:
            मुफ्त बिजली योजना</strong> पूरा आधिकारिक नाम है; &ldquo;मुफ्त बिजली
            योजना&rdquo; और &ldquo;फ्री बिजली योजना&rdquo; बस रोज़मर्रा की बातचीत
            और खोज में इस्तेमाल होने वाले बोलचाल के, छोटे तरीके हैं। अगर आपने इनमें
            से कोई भी नाम अलग से देखा है, तो आप उसी केंद्रीय सब्सिडी, उसी ₹78,000
            की सीमा, और उसी आवेदन पोर्टल की बात कर रहे हैं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            इस योजना को केंद्रीय मंत्रिमंडल ने 29 फरवरी 2024 को ₹75,021 करोड़ के
            आउटले के साथ मंज़ूरी दी थी, जिसका लक्ष्य एक करोड़ (1 करोड़) घरेलू
            परिवारों के लिए रूफटॉप सोलर है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: आप चाहे किसी भी नाम से यहां आए हों, आप सही जगह पर हैं — यहां
            सिर्फ एक योजना है, एक सब्सिडी संरचना है, और एक पोर्टल है।
          </p>
        </section>

        <section aria-labelledby="eligibility" className="mt-10 scroll-mt-20">
          <h2 id="eligibility" className={h2Cls}>
            क्या आप PM सूर्य घर के लिए पात्र हैं?
          </h2>
          <p className={pCls}>
            मुख्य पात्रता व्यापक और डिमांड-आधारित है — यह पूरे भारत में उपलब्ध है,
            ग्रामीण घरों सहित, जब तक आपके पास एक ग्रिड-कनेक्टेड डिस्कॉम कनेक्शन है।
            मुख्य जांचें हैं:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'आप घरेलू बिजली कनेक्शन वाले एक भारतीय नागरिक हैं।',
              'कनेक्शन आपके अपने नाम पर है, और आपके पास सोलर इंस्टॉलेशन के लिए उपयुक्त छत है।',
              'आपका स्वीकृत लोड आम तौर पर एक सीमा (अक्सर 10 kW बताई जाती है) पर या उससे नीचे होना ज़रूरी है — यह डिस्कॉम के हिसाब से अलग हो सकता है, इसलिए अपनी खुद की सीमा की पुष्टि करें।',
              'आपका प्रस्तावित सोलर सिस्टम साइज़ आपके स्वीकृत डिस्कॉम लोड से ज़्यादा नहीं है — एक बड़े साइज़ के प्रस्ताव के लिए पहले एक अलग लोड-एन्हांसमेंट आवेदन चाहिए होगा।',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-solar" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>{t}</span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: स्वीकृत-लोड की सीमा वह पात्रता विवरण है जिसे लोग सबसे ज़्यादा
            नज़रअंदाज़ करते हैं — यह मान लेने से पहले कि आपका सिस्टम साइज़ पात्र है,
            अपना बिल जांचें।
          </p>
        </section>

        <section aria-labelledby="documents" className="mt-10 scroll-mt-20">
          <h2 id="documents" className={h2Cls}>
            आवेदन के लिए आपको कौन से दस्तावेज़ चाहिए?
          </h2>
          <p className={pCls}>
            ऑनलाइन आवेदन शुरू करने से पहले ये तैयार रखें:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">दस्तावेज़</th>
                  <th className="px-4 py-2 font-semibold">उद्देश्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {documentRows.map(([doc, purpose]) => (
                  <tr key={doc}>
                    <td className="px-4 py-2 font-medium">{doc}</td>
                    <td className="px-4 py-2">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: आपके आधार से जुड़ा बैंक अकाउंट DBT-सीडेड होना चाहिए — यह एक
            बात सब्सिडी-भुगतान में देरी का एक बड़ा हिस्सा है।
          </p>
        </section>

        <section aria-labelledby="how-to-apply" className="mt-10 scroll-mt-20">
          <h2 id="how-to-apply" className={h2Cls}>
            PM सूर्य घर के लिए स्टेप बाय स्टेप आवेदन कैसे करें
          </h2>
          <p className={pCls}>
            आवेदन आधिकारिक राष्ट्रीय पोर्टल,{' '}
            <a
              href="https://pmsuryaghar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              pmsuryaghar.gov.in
            </a>{' '}
            के ज़रिए होते हैं। सटीक स्क्रीन समय के साथ बदलती हैं, लेकिन सामान्य
            रास्ता एक जैसा रहता है:
          </p>
          <ol className="mt-3 space-y-2">
            {[
              'अपने राज्य, डिस्कॉम और बिजली कंज़्यूमर नंबर के साथ पोर्टल पर रजिस्टर करें।',
              'रूफटॉप सोलर के लिए आवेदन करें और अपने डिस्कॉम से फ़िज़िबिलिटी अप्रूवल पाएं।',
              'एक MNRE-सूचीबद्ध वेंडर चुनें और अपना सिस्टम इंस्टॉल करवाएं।',
              'प्लांट की जानकारी जमा करें और नेट मीटर के लिए आवेदन करें।',
              'डिस्कॉम इंस्पेक्शन और नेट-मीटर कमीशनिंग के बाद, पोर्टल एक कमीशनिंग सर्टिफिकेट बनाता है।',
              'पोर्टल के ज़रिए अपनी बैंक डिटेल जमा करें — इस स्टेप के बाद डायरेक्ट बेनिफिट ट्रांसफर (DBT) से सब्सिडी जमा होती है।',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-solar font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={takeawayCls}>
            निष्कर्ष: सब्सिडी आख़िरी स्टेप है, पहला नहीं — यह इंस्टॉलेशन, इंस्पेक्शन
            और नेट-मीटर कमीशनिंग पूरी होने के बाद ही मिलती है।
          </p>
        </section>

        <section aria-labelledby="rejections" className="mt-10 scroll-mt-20">
          <h2 id="rejections" className={h2Cls}>
            PM सूर्य घर के आवेदन आम तौर पर रिजेक्ट क्यों होते हैं?
          </h2>
          <p className={pCls}>
            ज़्यादातर रिजेक्शन तीन बचाव योग्य समस्याओं में से किसी एक से जुड़े होते
            हैं:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'गैर-ALMM पैनल',
                'इंस्टॉलेशन में सरकार की एप्रूव्ड लिस्ट ऑफ मॉडल्स एंड मैन्युफैक्चरर्स (ALMM) में शामिल पैनल इस्तेमाल होने चाहिए — गैर-ALMM पैनल इंस्पेक्शन में फेल हो जाते हैं और सब्सिडी खो देते हैं। यह रिजेक्ट किए गए दावों का सबसे ज़्यादा बताया जाने वाला कारण है।',
              ],
              [
                'आधार-बैंक लिंकेज सीड न होना',
                'अगर आपका बैंक अकाउंट डायरेक्ट बेनिफिट ट्रांसफर के लिए आपके आधार से ठीक से सीड नहीं है, तो बाकी सब कुछ मंज़ूर होने के बाद भी सब्सिडी भुगतान फेल हो सकता है।',
              ],
              [
                'सिस्टम साइज़ स्वीकृत लोड से ज़्यादा होना',
                'अपने स्वीकृत डिस्कॉम लोड से बड़ा सिस्टम प्रस्तावित करना फ्लैग हो जाता है — इसके लिए पहले एक लोड-एन्हांसमेंट आवेदन मंज़ूर करवाना होगा।',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-caution-amber" aria-hidden>
                  ✕
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: इंस्टॉलेशन के बाद नहीं, पहले पुष्टि करें कि आपका वेंडर
            MNRE-सूचीबद्ध है और ALMM पैनल इस्तेमाल कर रहा है — बाद में इसे ठीक
            करना कहीं ज़्यादा मुश्किल है।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            क्या यह असल में फायदेमंद है? एक उदाहरण गणना
          </h2>
          <p className={pCls}>
            ज़्यादातर गाइड &ldquo;आपको मुफ्त बिजली और एक सब्सिडी मिलती है&rdquo; पर
            रुक जाती हैं। ईमानदार जवाब यह है कि यह आपके लिए असल में कितना
            फायदेमंद है, यह आपकी अपनी सिस्टम लागत, आपके राज्य के बिजली टैरिफ, और
            आपके अपने इस्तेमाल पर निर्भर करता है — यहां उस गणना की बनावट है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-hairline">
                {workedExample.map(([label, value]) => (
                  <tr key={label}>
                    <td className="px-4 py-2.5 font-medium text-ash/70">{label}</td>
                    <td className="px-4 py-2.5 text-right text-ink-navy">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            ध्यान दें कि जानबूझकर क्या खाली छोड़ा गया है: सिस्टम लागत और मासिक
            बचत। इनमें से किसी का भी एक ईमानदार राष्ट्रीय आंकड़ा नहीं है — आपके
            इंस्टॉलर का कोटेशन और आपके डिस्कॉम का टैरिफ दोनों तय करते हैं। यह
            सटीक उदाहरण गणना अपने असली आंकड़ों के साथ हमारे{' '}
            <Link href="/hi/solar/roi-calculator" className="text-brass underline">
              सोलर ROI कैलकुलेटर
            </Link>{' '}
            पर चलाएं ताकि आपको अपने राज्य की टैरिफ पर आधारित असली नेट लागत और
            पेबैक अनुमान मिले।
          </p>
          <p className={`mt-3 ${pCls}`}>
            चूंकि &ldquo;आप कितना बचाते हैं&rdquo; असल में आपके{' '}
            <Link href="/hi/electricity" className="text-brass underline">
              राज्य बिजली टैरिफ
            </Link>{' '}
            का एक फंक्शन है, पहले अपने डिस्कॉम की दरें जांचें — जैसे{' '}
            <Link href="/hi/electricity/bescom-bill-calculator" className="text-brass underline">
              BESCOM (कर्नाटक)
            </Link>{' '}
            या{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (महाराष्ट्र)
            </Link>
            , फिर यह देखने के लिए कि सरप्लस एक्सपोर्ट कैसे क्रेडिट होता है, अपने
            राज्य के लिए{' '}
            <Link href="/hi/solar/net-metering-calculator" className="text-brass underline">
              नेट मीटरिंग
            </Link>{' '}
            नियम इस्तेमाल करें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: सब्सिडी राशि राष्ट्रीय स्तर पर तय है, लेकिन आपका असली पेबैक
            नहीं — यह उतना ही अच्छा है जितने अच्छे टैरिफ और इस्तेमाल के आंकड़े आप
            डालते हैं।
          </p>
        </section>

        <section aria-labelledby="progress" className="mt-10 scroll-mt-20">
          <h2 id="progress" className={h2Cls}>
            अब तक असल में कितने घरों ने इंस्टॉल किया है?
          </h2>
          <p className={pCls}>
            प्रगति के आंकड़े बार-बार रिपोर्ट होते हैं और स्रोत व तारीख के हिसाब से
            थोड़े अलग होते हैं। <strong>22 जुलाई 2026</strong> तक, डिस्कॉम रिपोर्टिंग
            के अनुसार राष्ट्रीय स्तर पर लगभग <strong>39.72 लाख</strong> सिस्टम
            इंस्टॉल हुए, जिससे <strong>48 लाख से ज़्यादा घरों</strong> को फायदा
            हुआ, और <strong>18.93 लाख से ज़्यादा लाभार्थियों</strong> ने कम से कम
            एक बिलिंग अवधि में शून्य बिजली बिल की रिपोर्ट की। एक अलग आंकड़ा,{' '}
            <strong>18 जुलाई 2026</strong> का, <strong>47.26 लाख</strong> घरों के
            सोलराइज़ होने का हवाला देता है, जिसमें अंतिम एक-करोड़ लक्ष्य की तरफ{' '}
            <strong>दिसंबर 2026 तक 75 लाख</strong> का अंतरिम सरकारी लक्ष्य है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            ये तारीख-अंकित स्नैपशॉट हैं, लाइव काउंटर नहीं — सटीक आंकड़े को सटीक
            मानने की बजाय स्केल का मोटा अंदाज़ा मानें, और अगर मौजूदा गिनती आपके
            फैसले के लिए मायने रखती है तो सीधे{' '}
            <a
              href="https://pmsuryaghar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              pmsuryaghar.gov.in
            </a>{' '}
            जांचें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: दसियों लाख घर पहले से इसी प्रक्रिया से गुज़र चुके हैं —
            रिजेक्शन बचने लायक हैं, आम बात नहीं।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/solar/subsidy-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💸
              </span>
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
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                सोलर ROI कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपने डिस्कॉम पर आधारित असली पेबैक और 25 साल की बचत।
              </p>
            </Link>
            <Link
              href="/hi/blog/is-rooftop-solar-worth-it-in-india-2026"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                2026 में भारत में रूफटॉप सोलर लगाना फायदेमंद है?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                व्यापक लागत, पेबैक और फायदे/नुकसान का फैसला।
              </p>
            </Link>
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                सोलर आपकी सबसे महंगी यूनिट्स की भरपाई पहले क्यों करता है।
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
          आख़िरी सत्यापन: {LAST_VERIFIED}। इंस्टॉलेशन-प्रगति के आंकड़े, स्वीकृत-लोड
          की सीमा, और भुगतान की समयसीमा — इस गाइड में सबसे तेज़ी से बदलने वाली चीज़ें
          हैं — फैसला लेने से पहले{' '}
          <a
            href="https://pmsuryaghar.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            pmsuryaghar.gov.in
          </a>{' '}
          और अपने राज्य के डिस्कॉम से मौजूदा आंकड़ों की पुष्टि करें। इस साइट पर
          हम आंकड़े कैसे सोर्स और सत्यापित करते हैं, इसके लिए हमारी{' '}
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
