import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/how-water-bills-calculated-india'
const TITLE = 'भारत में पानी का बिल कैसे बनता है: शहर-दर-शहर गाइड'
const DESCRIPTION =
  'फिक्स्ड चार्ज, वॉल्यूमेट्रिक स्लैब, सीवरेज चार्ज, वॉटर सेस — देखें हर भारतीय पानी के बिल में इस्तेमाल होने वाले बुनियादी हिस्से, और दिल्ली, बैंगलोर, हैदराबाद, चेन्नई और केरल इन्हें इतना अलग-अलग तरीके से क्यों लागू करते हैं।'
const LAST_VERIFIED = '11 सितंबर 2026'

export const metadata: Metadata = {
  title: 'भारत में पानी का बिल कैसे बनता है (शहर-दर-शहर गाइड)',
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
    q: 'भारत में पानी का बिल कैसे बनता है?',
    a: 'ज़्यादातर भारतीय पानी के बिल में एक फिक्स्ड/सर्विस चार्ज, आपके इस्तेमाल पर आधारित एक वॉल्यूमेट्रिक चार्ज (अक्सर स्लैब में), एक सीवरेज चार्ज (आम तौर पर पानी के चार्ज का प्रतिशत), और कभी-कभी एक छोटा वॉटर सेस शामिल होता है। सटीक संरचना और दरें शहर और बोर्ड के हिसाब से काफी अलग होती हैं।',
  },
  {
    q: 'सीवरेज चार्ज क्या है, और यह मेरे पानी के बिल का प्रतिशत क्यों है?',
    a: 'यह सीवेज ट्रीटमेंट और ड्रेनेज मेंटेनेंस को कवर करने वाला एक चार्ज है, और बोर्ड आम तौर पर इसे अलग से सीवेज मीटर करने की बजाय आपके पानी के चार्ज के प्रतिशत के रूप में तय करते हैं, क्योंकि असल वेस्टवाटर की मात्रा को सीधे मापना मुश्किल है। यह प्रतिशत बोर्ड के हिसाब से काफी अलग होता है — शहर के हिसाब से लगभग 15% से 60% तक।',
  },
  {
    q: 'मेरे शहर का पानी का बिल ऑनलाइन पढ़ी गई जानकारी से अलग तरीके से क्यों काम करता है?',
    a: 'भारत में पानी की सप्लाई और सीवरेज नगरपालिका/राज्य के विषय हैं, जो एक राष्ट्रीय नियामक की बजाय अलग-अलग शहर या राज्य के पानी बोर्ड चलाते हैं। हर बोर्ड अपने खुद के स्लैब, सीवरेज प्रतिशत और फिक्स्ड चार्ज तय करता है, इसलिए एक शहर के बारे में जो संरचना आपने पढ़ी हो वह अक्सर आपके शहर से मेल नहीं खाती।',
  },
  {
    q: 'अगर मैं दिल्ली की 20 KL फ्री लिमिट से ऊपर चला जाऊं तो क्या होता है?',
    a: 'दिल्ली जल बोर्ड महीने में 20 KL तक इस्तेमाल के लिए पानी का चार्ज, सीवरेज चार्ज और वॉटर सेस पूरी तरह माफ करता है। 20 KL पार करने पर यह छूट आपके उस पूरे महीने के इस्तेमाल के लिए हट जाती है, सिर्फ 20 KL से ऊपर की यूनिट्स के लिए नहीं — इसलिए थोड़ी सी अधिकता भी असंगत रूप से बड़ी छलांग ला सकती है।',
  },
  {
    q: 'वॉटर सेस क्या है?',
    a: 'वॉटर सेस एक छोटा पर्यावरण या संरक्षण चार्ज है जो कुछ बोर्ड पानी और सीवरेज चार्ज के ऊपर जोड़ते हैं। हर बोर्ड इसे नहीं लगाता, और जहां यह मौजूद है वहां राशि आम तौर पर वॉल्यूमेट्रिक और सीवरेज चार्ज की तुलना में मामूली होती है।',
  },
  {
    q: 'क्या भारत में पानी के बिल की गणना के लिए एक ही राष्ट्रीय फॉर्मूला है?',
    a: 'नहीं। बिजली के उलट, जो राज्य नियामकों द्वारा तय एक व्यापक रूप से समान संरचना का पालन करती है, पानी के टैरिफ हर शहर या राज्य के पानी बोर्ड द्वारा स्वतंत्र रूप से तय होते हैं। बुनियादी हिस्से (फिक्स्ड चार्ज, स्लैब, सीवरेज चार्ज) आम हैं, लेकिन असली दरें और डिज़ाइन बोर्ड-दर-बोर्ड अलग होते हैं।',
  },
  {
    q: 'पानी के बिल पर फिक्स्ड चार्ज और वॉल्यूमेट्रिक चार्ज में क्या फर्क है?',
    a: 'फिक्स्ड (या सर्विस) चार्ज एक स्थायी मासिक राशि है, कभी फ्लैट और कभी कनेक्शन साइज़ या स्लैब के हिसाब से तय, जो सटीक इस्तेमाल चाहे जो भी हो, लागू होती है। वॉल्यूमेट्रिक चार्ज आपके असल इस्तेमाल पर किलोलीटर में बिल होता है, आम तौर पर आप जितना ज़्यादा इस्तेमाल करते हैं, स्लैब के हिसाब से बढ़ता है।',
  },
  {
    q: 'मैं अपने शहर का सटीक पानी टैरिफ कैसे पता करूं?',
    a: 'अपने बोर्ड की आधिकारिक टैरिफ अधिसूचना जांचें, या सोर्स्ड, तारीख-अंकित टैरिफ डेटा वाले बोर्ड (फिलहाल दिल्ली, चेन्नई और पिंपरी-चिंचवड़) के लिए इस साइट के पानी के बिल कैलकुलेटर इस्तेमाल करें — बाकी शहर एक सेल्फ-रेट कैलकुलेटर इस्तेमाल करते हैं जहां आप अपने बोर्ड की प्रकाशित दरें खुद डालते हैं।',
  },
  {
    q: 'कुछ महीनों में मेरा सीवरेज चार्ज मेरे असल पानी के चार्ज से ज़्यादा क्यों है?',
    a: 'ऐसा तब हो सकता है जब आपके बोर्ड का सीवरेज प्रतिशत ज़्यादा हो (जैसे दिल्ली का 60%) और आपका पानी का चार्ज खुद छोटा हो — एक छोटी संख्या का 60% भी बाकी लाइनों के मुकाबले बड़ा दिख सकता है, खास तौर पर कम इस्तेमाल वाले महीने में।',
  },
  {
    q: 'क्या सभी शहर टैंकर के पानी को पाइप्ड पानी जैसे ही बिल करते हैं?',
    a: 'नहीं। चेन्नई सहित कुछ शहर टैंकर से मिलने वाले पानी को पाइप्ड-कनेक्शन पानी से अलग बिल करते हैं, क्योंकि टैंकर उन इलाकों या कमियों को कवर करते हैं जहां पाइप्ड सप्लाई पूरी तरह नहीं पहुंचती। अगर टैंकर का पानी आपकी सप्लाई का नियमित हिस्सा है, तो अपने स्थानीय बोर्ड से जांचें कि इसे कैसे बिल किया जाता है।',
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

const comparisonRows: [string, string, string, string][] = [
  ['दिल्ली (DJB)', 'स्लैब-आधारित, KL बैंड', 'पानी के चार्ज का ~60%', '20 KL/महीना तक फ्री, लेकिन इसे पार करने पर सिर्फ अतिरिक्त हिस्सा नहीं, पूरे महीने के लिए छूट हट जाती है'],
  ['बैंगलोर (BWSSB)', 'बारीक स्लैब (प्रति 100 L)', 'पानी के चार्ज का ~25% (उदाहरण)', 'ज़्यादातर अन्य बोर्ड की तुलना में कहीं ज़्यादा बारीक स्लैब विभाजन'],
  ['हैदराबाद (HMWSSB)', 'बढ़ते स्लैब', 'स्लैब-आधारित चार्ज पर 35% सेस', 'सीधा प्रतिशत-ऊपर मॉडल'],
  ['चेन्नई (CMWSSB)', 'व्यापक इस्तेमाल स्लैब', 'पानी के चार्ज का 25%', 'पाइप्ड सप्लाई से अलग टैंकर-सप्लाई पानी को भी बिल करता है'],
  ['केरल (KWA)', 'टियर वाले स्लैब', 'निचले बैंड में ~11%, ऊंचे बैंड में बढ़ता हुआ (उदाहरण), कुछ कनेक्शन पर एक फ्लैट चार्ज भी', 'कुछ मामलों में BPL घरों के लिए छूट/कम दरें शामिल'],
]

export default function WaterBillsCalculatedArticlePageHi() {
  return (
    <>
      <PageHero
        hub="water"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'पानी के बिल समझाए गए', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>💧</span> एक्सप्लेनर
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
          ज़्यादातर भारतीय पानी के बिल कुछ गिने-चुने हिस्सों से बनते हैं: एक{' '}
          <strong>फिक्स्ड या सर्विस चार्ज</strong>, आपके असल इस्तेमाल (आम तौर पर
          स्लैब में) पर आधारित एक <strong>वॉल्यूमेट्रिक चार्ज</strong>, एक{' '}
          <strong>सीवरेज चार्ज</strong> — आम तौर पर पानी के चार्ज का प्रतिशत — और
          कभी-कभी एक छोटा <strong>वॉटर सेस</strong>। लेकिन बिजली के उलट, जो हर
          राज्य के नियामक द्वारा तय एक व्यापक रूप से समान संरचना का पालन करती है,
          भारत में पानी की सप्लाई और सीवरेज अलग-अलग शहर और राज्य के पानी बोर्ड
          द्वारा स्वतंत्र रूप से चलाए जाते हैं। यहां कोई एक राष्ट्रीय फॉर्मूला नहीं
          है: बुनियादी हिस्से आम हैं, लेकिन हर बोर्ड इन्हें कैसे मिलाता है यह बहुत
          अलग होता है — यही वजह है कि यह गाइड लॉजिक सिखाती है, जबकि आपके बोर्ड का
          कैलकुलेटर आपको असली आंकड़े देता है।
        </p>

        <section aria-labelledby="building-blocks" className="mt-10 scroll-mt-20">
          <h2 id="building-blocks" className={h2Cls}>
            हर भारतीय पानी के बिल में इस्तेमाल होने वाले बुनियादी हिस्से
          </h2>
          <ul className="mt-1 space-y-2">
            {[
              ['फिक्स्ड / सर्विस चार्ज', 'एक स्थायी मासिक राशि, कभी फ्लैट और कभी कनेक्शन साइज़ या इस्तेमाल स्लैब के हिसाब से तय, जो उस महीने के सटीक इस्तेमाल चाहे जो भी हो, लागू होती है।'],
              ['वॉल्यूमेट्रिक / वॉटर चार्ज', 'आपके असल इस्तेमाल पर बिल होता है, आम तौर पर किलोलीटर (KL — 1 KL = 1,000 लीटर) में मापा जाता है, और आम तौर पर स्लैब-आधारित होता है ताकि आप जितना ज़्यादा इस्तेमाल करें, दर उतनी बढ़े।'],
              ['सीवरेज चार्ज', 'सीवेज ट्रीटमेंट और ड्रेनेज मेंटेनेंस को कवर करता है, और आम तौर पर सीधे मापने की बजाय आपके पानी के चार्ज के प्रतिशत के रूप में तय होता है।'],
              ['वॉटर सेस', 'कुछ बोर्ड ऊपर से जोड़ने वाला एक छोटा पर्यावरण या संरक्षण चार्ज — हर जगह नहीं, और जहां मौजूद है वहां मामूली।'],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-water" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: हर बोर्ड इन्हीं चार सामग्रियों को मिलाता है — जो अलग होता है
            वह रेसिपी है, सामग्री नहीं।
          </p>
        </section>

        <section aria-labelledby="why-fragmented" className="mt-10 scroll-mt-20">
          <h2 id="why-fragmented" className={h2Cls}>
            एक राष्ट्रीय पानी-बिल फॉर्मूला क्यों नहीं है?
          </h2>
          <p className={pCls}>
            भारत में पानी की सप्लाई और सीवरेज नगरपालिका और राज्य के विषय हैं, जिन्हें
            अलग-अलग शहर या राज्य के पानी बोर्ड चलाते हैं — इसका एक राज्य बिजली
            नियामक आयोग जैसा कोई समकक्ष नहीं है जो हर राज्य के लिए एक टैरिफ संरचना
            तय करे। इसकी तुलना{' '}
            <Link href="/hi/electricity" className="text-brass underline">
              बिजली
            </Link>{' '}
            से करें, जहां हर राज्य के डिस्कॉम एक आम नियामक द्वारा तय एक व्यापक रूप
            से समान टेलिस्कोपिक-स्लैब संरचना का पालन करते हैं, यही वजह है कि यह
            साइट प्रति राज्य एक कैलकुलेटर इंजन चला सकती है। पानी इस तरह काम नहीं
            करता: दिल्ली जल बोर्ड, बैंगलोर का BWSSB, चेन्नई का CMWSSB और दर्जनों
            अन्य बोर्ड — हर एक अपना खुद का, स्वतंत्र रूप से डिज़ाइन किया गया टैरिफ
            ऑर्डर प्रकाशित करता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: शहर-दर-शहर असली संरचनात्मक अंतर की उम्मीद रखें, न कि सिर्फ
            एक ही फॉर्मूले में डाले गए अलग आंकड़े।
          </p>
        </section>

        <section aria-labelledby="comparison" className="mt-10 scroll-mt-20">
          <h2 id="comparison" className={h2Cls}>
            पांच अलग-अलग शहर इन्हीं बुनियादी हिस्सों को कैसे लागू करते हैं
          </h2>
          <p className={pCls}>
            ये इस्तेमाल में मौजूद डिज़ाइनों की रेंज दिखाने के लिए उदाहरण स्नैपशॉट
            हैं, लाइव मौजूदा दरें नहीं — इस लेख के अंत में सोर्सिंग नोट देखें, और
            सटीक आंकड़ों के लिए अपने बोर्ड का मौजूदा टैरिफ जांचें।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">शहर / बोर्ड</th>
                  <th className="px-4 py-2 font-semibold">वॉल्यूमेट्रिक संरचना</th>
                  <th className="px-4 py-2 font-semibold">सीवरेज चार्ज</th>
                  <th className="px-4 py-2 font-semibold">खास डिज़ाइन फीचर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {comparisonRows.map(([city, vol, sewer, note]) => (
                  <tr key={city}>
                    <td className="px-4 py-2 font-medium">{city}</td>
                    <td className="px-4 py-2">{vol}</td>
                    <td className="px-4 py-2">{sewer}</td>
                    <td className="px-4 py-2">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            सीवरेज प्रतिशत ही हमारे सीधे सोर्स किए बोर्ड में लगभग 15% से 60% तक
            जाता है — दिल्ली का 60% और पिंपरी-चिंचवड़ का 15%, दोनों उनके अपने
            प्रकाशित टैरिफ ऑर्डर से असली, तारीख-अंकित आंकड़े हैं, कोई गलती नहीं।{' '}
            <Link href="/hi/water/delhi" className="text-brass underline">
              दिल्ली (DJB)
            </Link>
            ,{' '}
            <Link href="/hi/water/chennai" className="text-brass underline">
              चेन्नई (CMWSSB)
            </Link>{' '}
            और{' '}
            <Link href="/hi/water/pimpri-chinchwad" className="text-brass underline">
              पिंपरी-चिंचवड़ (PCMC)
            </Link>{' '}
            के लिए असली, सोर्स्ड आंकड़े उनके अपने कैलकुलेटर पेज पर देखें। बैंगलोर,
            हैदराबाद और केरल के पास अभी इस साइट पर एक सत्यापित, बोर्ड-विशिष्ट
            कैलकुलेटर नहीं है — इनमें से कुछ बोर्ड की प्रकाशित दरें स्रोतों में
            काफी अलग हैं, इसलिए हम इन शहरों को एक सेल्फ-रेट कैलकुलेटर पर भेजते हैं
            जहां आप ऐसी दर की बजाय जिसके पीछे हम पूरी तरह खड़े नहीं हो सकते, अपने
            बोर्ड के प्रकाशित आंकड़े खुद डालते हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: दो बोर्ड बिल्कुल एक जैसे बुनियादी हिस्से इस्तेमाल कर सकते हैं
            और फिर भी एक ही इस्तेमाल के लिए बहुत अलग बिल बना सकते हैं।
          </p>
        </section>

        <section aria-labelledby="delhi-cliff" className="mt-10 scroll-mt-20">
          <h2 id="delhi-cliff" className={h2Cls}>
            दिल्ली की &ldquo;क्लिफ वाली फ्री लिमिट&rdquo; — एक करीबी नज़र
          </h2>
          <p className={pCls}>
            दिल्ली जल बोर्ड महीने में <strong>20 KL (20,000 लीटर)</strong> तक
            इस्तेमाल करने वाले घरों के लिए पानी का चार्ज, सीवरेज चार्ज और वॉटर
            सेस पूरी तरह माफ करता है, सिर्फ एक छोटा सर्विस चार्ज देय रहता है। यह
            वाकई एक उदार डिज़ाइन है — लेकिन इसका एक तेज़ किनारा है: 20 KL पार करें,
            और यह छूट आपके <em>पूरे</em> महीने के इस्तेमाल के लिए हट जाती है, सिर्फ
            20 KL से ऊपर की यूनिट्स के लिए नहीं। 21 KL इस्तेमाल करने वाला घर 20 KL
            इस्तेमाल करने वाले घर से काफी ज़्यादा चुका सकता है, भले ही असल इस्तेमाल
            का अंतर सिर्फ 1 KL हो।
          </p>
          <p className={`mt-3 ${pCls}`}>
            वॉल्यूमेट्रिक चार्ज के ऊपर, DJB का सर्विस चार्ज आम तौर पर इस्तेमाल
            बैंड के हिसाब से तय बताया जाता है — कहीं और बताए गए उदाहरण आंकड़े इसे
            0–20 KL के लिए करीब ₹146, 20–30 KL के लिए ₹220, और 30 KL से ऊपर ₹293
            बताते हैं, हालांकि आपको DJB के मौजूदा आंकड़ों की सीधे पुष्टि करनी
            चाहिए क्योंकि ये समय-समय पर संशोधित होते हैं। फ्री लिमिट पार करने के
            बाद, सीवरेज चार्ज{' '}
            <strong>कुल पानी वॉल्यूमेट्रिक चार्ज के 60%</strong> के रूप में गिना
            जाता है — कई अन्य बोर्ड की तुलना में काफी ज़्यादा।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आप 20 KL के करीब हैं, तो यह जांचना फायदेमंद है कि क्या
            आप इस्तेमाल को सीमा से नीचे ला सकते हैं — यह अंतर आनुपातिक नहीं है, यह
            एक क्लिफ है।
          </p>
        </section>

        <section aria-labelledby="sewerage" className="mt-10 scroll-mt-20">
          <h2 id="sewerage" className={h2Cls}>
            सीवरेज चार्ज असल में क्या है?
          </h2>
          <p className={pCls}>
            एक सीवरेज चार्ज आपके घर से सीवेज सिस्टम में वापस जाने वाले वेस्टवाटर
            को ट्रीट और ड्रेन करने की लागत को कवर करता है। बोर्ड लगभग हमेशा इसे
            सीधे सीवेज आउटपुट मीटर करने की बजाय{' '}
            <strong>आपके पानी के चार्ज के प्रतिशत</strong> के रूप में गिनते हैं,
            क्योंकि सप्लाई से अलग असल वेस्टवाटर की मात्रा मापना मुश्किल है — एक
            घर के पानी के इस्तेमाल को यह अंदाज़ा लगाने के लिए एक उचित संकेत माना
            जाता है कि वह कितना डिस्चार्ज करता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            यह प्रतिशत बोर्ड के हिसाब से काफी अलग होता है, हमारे सीधे सोर्स किए
            बोर्ड में करीब 15% (पिंपरी-चिंचवड़) से 60% (दिल्ली) तक — कोई मानक दर
            नहीं है, इसलिए एक शहर के लिए बताया गया प्रतिशत दूसरे के बारे में बहुत
            कम बताता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: एक सीवरेज चार्ज डिज़ाइन के हिसाब से एक प्रतिशत ऐड-ऑन है, कोई
            अलग से मापी गई यूटिलिटी नहीं — इसका आकार पूरी तरह आपके बोर्ड की अपनी
            नीति पर निर्भर करता है।
          </p>
        </section>

        <section aria-labelledby="how-to-calculate" className="mt-10 scroll-mt-20">
          <h2 id="how-to-calculate" className={h2Cls}>
            अपना खुद का बिल असल में कैसे गिनें
          </h2>
          <p className={pCls}>किसी भी बोर्ड के लिए, सामान्य तरीका यह है:</p>
          <ol className="mt-3 space-y-2">
            {[
              'अपनी मीटर रीडिंग या बिल से अपना इस्तेमाल किलोलीटर (KL) में पता करें।',
              'अपने बोर्ड की स्लैब संरचना पहचानें और आपका इस्तेमाल जिस भी स्लैब में आता है उसकी दर लागू करें।',
              'अपने बोर्ड का सीवरेज चार्ज जोड़ें, आम तौर पर वॉल्यूमेट्रिक कुल का एक प्रतिशत।',
              'अपने कनेक्शन पर लागू कोई भी फिक्स्ड/सर्विस चार्ज और वॉटर सेस जोड़ें।',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-water font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>{s}</span>
              </li>
            ))}
          </ol>
          <p className={`mt-4 ${pCls}`}>
            इसे हाथ से करने का मतलब है अपने बोर्ड का मौजूदा टैरिफ ऑर्डर ढूंढना और
            हर स्लैब सीमा को सही करना — इसमें गलती होना आसान है। इसकी बजाय हमारे{' '}
            <Link href="/hi/water" className="text-brass underline">
              पानी के बिल कैलकुलेटर
            </Link>{' '}
            इस्तेमाल करें: असली, सोर्स्ड टैरिफ{' '}
            <Link href="/hi/water/delhi" className="text-brass underline">
              दिल्ली
            </Link>{' '}
            और{' '}
            <Link href="/hi/water/chennai" className="text-brass underline">
              चेन्नई
            </Link>{' '}
            के लिए, और हर दूसरे शहर के लिए एक सेल्फ-रेट कैलकुलेटर जहां आप सटीक
            अनुमान के लिए अपने बोर्ड की प्रकाशित दरें खुद डालते हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: तरीका हर जगह एक जैसा है — जो बदलता है वह स्लैब सीमाएं और
            प्रतिशत हैं, जिसे एक कैलकुलेटर आपके लिए बिल्कुल संभाल लेता है।
          </p>
        </section>

        <section aria-labelledby="tanker" className="mt-10 scroll-mt-20">
          <h2 id="tanker" className={h2Cls}>
            टैंकर के पानी पर एक नोट, अगर आपके इलाके में लागू हो
          </h2>
          <p className={pCls}>
            चेन्नई सहित कुछ शहर टैंकर से मिलने वाले पानी को पाइप्ड-कनेक्शन पानी से
            अलग बिल करते हैं, क्योंकि टैंकर उन इलाकों या कमियों को कवर करते हैं
            जहां पाइप्ड सप्लाई पूरी तरह नहीं पहुंचती। अगर टैंकर का पानी आपके घर की
            सप्लाई का नियमित हिस्सा है, तो अपने स्थानीय बोर्ड से जांचें कि इसे कैसे
            बिल किया जाता है — हमारे बोर्ड कैलकुलेटर पाइप्ड-कनेक्शन टैरिफ का अनुमान
            लगाते हैं और फिलहाल टैंकर-विशिष्ट चार्ज अलग से मॉडल नहीं करते।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अगर आप टैंकर के पानी पर निर्भर हैं, तो इसे अपने पाइप्ड पानी
            के बिल से अलग एक लाइन आइटम मानें, ऐसी कोई चीज़ नहीं जो एक सामान्य
            टैरिफ कैलकुलेटर पकड़ पाए।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े हुए टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/water"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                💧
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                पानी के बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपना शहर या राज्य ढूंढें और अपना बिल अनुमानित करें।
              </p>
            </Link>
            <Link
              href="/hi/water/delhi"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🏛️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                दिल्ली (DJB) पानी का बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                असली, सोर्स्ड टैरिफ — 20 KL फ्री लिमिट सहित।
              </p>
            </Link>
            <Link
              href="/hi/water/chennai"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🌊
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                चेन्नई (CMWSSB) पानी का बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                असली, सोर्स्ड स्लैब और सीवरेज चार्ज।
              </p>
            </Link>
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                स्लैब बिलिंग का बिजली-साइड समकक्ष।
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
          आख़िरी सत्यापन: {LAST_VERIFIED}। दिल्ली (DJB), चेन्नई (CMWSSB) और
          पिंपरी-चिंचवड़ (PCMC) के आंकड़े इस साइट के{' '}
          <Link href="/hi/water" className="text-brass underline">
            पानी के कैलकुलेटर
          </Link>{' '}
          के ज़रिए हर बोर्ड के अपने प्रकाशित टैरिफ ऑर्डर से सीधे सोर्स किए गए हैं।
          बैंगलोर, हैदराबाद और केरल के ऊपर दिए आंकड़े द्वितीयक स्रोतों से लिए गए
          उदाहरण स्नैपशॉट हैं, इस साइट द्वारा स्वतंत्र रूप से सत्यापित नहीं — इन पर
          भरोसा करने से पहले{' '}
          <Link href="/hi/methodology" className="text-brass underline">
            हमारी मेथडोलॉजी
          </Link>{' '}
          और अपने बोर्ड की मौजूदा अधिसूचना जांचें।
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
