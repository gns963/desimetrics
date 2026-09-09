import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog/ac-running-cost-india-guide'
const TITLE = 'भारत में AC चलाने का असल खर्च कितना आता है?'
const DESCRIPTION =
  'AC रनिंग कॉस्ट टनेज, इस्तेमाल के घंटों और आपके अपने राज्य के टैरिफ स्लैब पर निर्भर करती है — सिर्फ स्टार रेटिंग पर नहीं। साथ ही जानें जनवरी 2026 के BEE री-रेटिंग ने असल में क्या बदला।'
const LAST_VERIFIED = '4 सितंबर 2026'

export const metadata: Metadata = {
  title: 'भारत में AC रनिंग कॉस्ट: पूरी 2026 गाइड',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/blog/ac-running-cost-india-guide'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'article', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
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
  datePublished: '2026-09-04',
  dateModified: '2026-09-04',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: '1.5-टन AC प्रति घंटा कितनी बिजली इस्तेमाल करता है?',
    a: 'एक सामान्य 1.5-टन AC अपनी स्टार रेटिंग के हिसाब से लगभग 0.84–1.1 kWh (यूनिट) प्रति घंटा खींचता है — उदाहरण के तौर पर 5-स्टार मॉडल के लिए लगभग 840W और 3-स्टार मॉडल के लिए लगभग 1,104W। असली खपत ब्रांड, मॉडल और इस्तेमाल की परिस्थितियों के हिसाब से बदलती है, इसलिए इसे एक योजना रेंज मानें, सटीक आंकड़ा नहीं।',
  },
  {
    q: 'AC रनिंग कॉस्ट कैसे गिनी जाती है?',
    a: 'AC की पावर ड्रॉ को kW में, रोज़ चलाने के घंटों से गुणा करें, फिर दिनों की संख्या से, ताकि मासिक यूनिट (kWh) मिले। इन यूनिट्स पर अपने राज्य की प्रति-यूनिट बिजली दर लगाएं — चूंकि दरें टेलिस्कोपिक स्लैब में बढ़ती हैं, सटीक रुपये खर्च आपके कुल मासिक इस्तेमाल पर निर्भर करता है, किसी फ्लैट गुणा पर नहीं।',
  },
  {
    q: 'क्या 5-स्टार AC असल में अतिरिक्त पैसे के लायक है?',
    a: 'आम तौर पर हां, अगर आप AC रोज़ 8+ घंटे चलाते हैं, क्योंकि तुलनीय 3-स्टार मॉडल के मुकाबले लगभग ₹7,000–10,000 का कीमत प्रीमियम आम तौर पर बिजली बचत से लगभग 4–6 साल में वसूल हो जाता है। हल्के इस्तेमाल (रोज़ 4–5 घंटे) के लिए, 3-स्टार मॉडल अक्सर ज़्यादा संतुलित आर्थिक विकल्प होता है।',
  },
  {
    q: 'मेरे नए AC की स्टार रेटिंग मेरे पुराने से कम क्यों है?',
    a: 'Bureau of Energy Efficiency ने जनवरी 2026 से हर स्टार श्रेणी के लिए दक्षता की सीमा बढ़ा दी — जो मॉडल 2025 नियमों के तहत 5-स्टार के लिए योग्य होता, वह अब 4-स्टार लेबल हो गया है। AC के असली कूलिंग प्रदर्शन में कोई बदलाव नहीं हुआ; सिर्फ रेटिंग की सीमा ऊंची हुई है।',
  },
  {
    q: 'क्या ज़्यादा गर्मी में AC चलाने से इसकी रेटेड क्षमता से ज़्यादा बिजली खर्च होती है?',
    a: 'हो सकता है। एक स्वतंत्र Centre for Science and Environment अध्ययन में पाया गया कि कुछ 5-स्टार AC चरम गर्मी (लगभग 40–50°C) में अपनी बताई क्षमता से 10–28% ज़्यादा बिजली खींच रहे थे, क्योंकि लेबल वाला आंकड़ा मानक लैब परिस्थितियों में मापा जाता है, असली चरम-गर्मी इस्तेमाल में नहीं।',
  },
  {
    q: 'मेरे कमरे के लिए मुझे कितने साइज़ का AC चाहिए?',
    a: 'टनेज को आपके कमरे के साइज़, धूप और मंजिल के हिसाब से तय होना चाहिए, सिर्फ स्क्वायर फुटेज से नहीं — एक अंडरसाइज़्ड AC भरपाई के लिए ज़्यादा देर और ज़्यादा मेहनत से चलता है, जबकि एक ओवरसाइज़्ड AC कुशलता से ऑन-ऑफ साइकल करता है। अंदाज़ा लगाने की बजाय अपने कमरे के असली आयामों के साथ टनेज कैलकुलेटर इस्तेमाल करें।',
  },
  {
    q: 'क्या इन्वर्टर AC सामान्य AC से कम बिजली इस्तेमाल करता है?',
    a: 'सामान्य भारतीय इस्तेमाल पैटर्न के लिए आम तौर पर हां, क्योंकि एक इन्वर्टर AC तापमान बनाए रखने के लिए पूरी तरह ऑन-ऑफ होने की बजाय अपने कंप्रेसर की स्पीड एडजस्ट करता है, जो आम तौर पर समान टनेज और स्टार रेटिंग के नॉन-इन्वर्टर यूनिट के मुकाबले कुल पावर ड्रॉ कम कर देता है — हालांकि सटीक बचत मॉडल और इस्तेमाल के हिसाब से बदलती है।',
  },
  {
    q: 'रोज़ कितने घंटे AC चलाना सुरक्षित/किफ़ायती है?',
    a: 'कोई तय सार्वभौमिक नंबर नहीं है — यह खर्च-बनाम-आराम का ट्रेडऑफ है। आर्थिक रूप से जो मायने रखता है वह यह समझना है कि ज़्यादा घंटे मतलब ज़्यादा यूनिट, और महीने के आखिर की यूनिट्स ज़्यादा महंगे टैरिफ स्लैब में गिर सकती हैं, इसलिए किसी "सुरक्षित" सीमा मानने की बजाय अपने असली घंटों से अपनी रनिंग कॉस्ट जांचें।',
  },
  {
    q: 'मेरा AC मेरे बिजली बिल को ज़्यादा ऊंचे स्लैब में क्यों धकेलता है?',
    a: 'ज़्यादातर भारतीय बिजली बोर्ड घरों को टेलिस्कोपिक स्लैब से बिल करते हैं, जहां कुल मासिक यूनिट एक सीमा पार करने पर आपका बिल तेज़ी से बढ़ता है। एक AC आसानी से महीने में 150–250+ यूनिट जोड़ सकता है, जो अक्सर अकेले ही आपके घर को उस इस्तेमाल के हिस्से के लिए महंगे स्लैब में धकेलने के लिए काफी है।',
  },
  {
    q: '3-स्टार की बजाय 5-स्टार AC चुनकर मैं साल में कितना बचा सकता हूं?',
    a: 'यह काफी हद तक आपके रोज़ के इस्तेमाल के घंटों और आपके स्थानीय टैरिफ पर निर्भर करता है, क्योंकि दक्षता का अंतर (तुलनीय 5-स्टार बनाम 3-स्टार मॉडल के लिए आम तौर पर 20–28% कम ऊर्जा) यूनिट्स की एक ऐसी संख्या पर लागू होता है जो हर घर में अलग होती है। असली सालाना आंकड़े के लिए अपने घंटों और टैरिफ के साथ एक रनिंग-कॉस्ट कैलकुलेटर इस्तेमाल करें।',
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

const wattageTable = [
  { tonnage: '0.75 टन', threeStar: '~542 W', fiveStar: '~450 W' },
  { tonnage: '1.0 टन', threeStar: '~747 W', fiveStar: '~554 W' },
  { tonnage: '1.5 टन', threeStar: '~1,104 W', fiveStar: '~840 W' },
  { tonnage: '2.0 टन', threeStar: '~1,448 W', fiveStar: '~1,113 W' },
]

const workedExample = [
  { step: 'AC वाटेज (1.5-टन, 3-स्टार, उदाहरण)', calc: '1,104 W', result: '1.104 kW' },
  { step: 'रोज़ का इस्तेमाल', calc: '6 घंटे/दिन', result: '6.62 kWh/दिन' },
  { step: 'मासिक इस्तेमाल (30 दिन)', calc: '6.62 × 30', result: '≈ 199 यूनिट/महीना' },
]

export default function AcRunningCostGuidePageHi() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'ब्लॉग', href: '/hi/blog' },
          { label: 'AC रनिंग कॉस्ट', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> Explainer
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
          · आखिरी बार सत्यापित {LAST_VERIFIED}
        </p>
        <p className="mt-1 text-xs text-caution-amber">
          BEE रेटिंग सीमाएं और AC की कीमतें यहां सबसे तेज़ी से बदलने वाले तथ्य हैं — इस लेख पर भरोसा करने से पहले या किसी भी भविष्य के संपादन से पहले दोनों को स्पॉट-चेक करें।
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          AC रनिंग कॉस्ट एक फॉर्मूले पर आती है: <strong>वाटेज × इस्तेमाल के घंटे × आपकी प्रति-यूनिट बिजली दर</strong>। मुश्किल हिस्सा वह आखिरी वैरिएबल है — आपका टैरिफ कोई फ्लैट नंबर नहीं है, आपके कुल मासिक इस्तेमाल के बढ़ने के साथ यह टेलिस्कोपिक स्लैब के अंदर बढ़ता है, और यह राज्य के हिसाब से बहुत अलग होता है। बिना अपने टैरिफ को शामिल किए सिर्फ एक स्टार-रेटिंग चार्ट आपको गलत नंबर देगा।
        </p>

        <section aria-labelledby="how-calculated" className="mt-10 scroll-mt-20">
          <h2 id="how-calculated" className={h2Cls}>
            AC रनिंग कॉस्ट असल में कैसे गिनी जाती है?
          </h2>
          <p className={pCls}>
            AC की पावर ड्रॉ किलोवाट (kW) में लेकर शुरुआत करें — एक 1.5-टन AC अपनी स्टार रेटिंग के हिसाब से लगभग 0.84 से 1.1 kW तक खींच सकता है। इसे रोज़ चलाने के घंटों से गुणा करके किलोवाट-घंटे (kWh) पाएं, जो आपके बिजली बिल पर एक "यूनिट" के बराबर है। बिलिंग अवधि के दिनों की संख्या से दोबारा गुणा करके AC का मासिक यूनिट योगदान पाएं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            आखिरी कदम — यूनिट्स को रुपयों में बदलना — यहीं ज़्यादातर सामान्य AC-कॉस्ट कंटेंट गलत हो जाता है। ज़्यादातर भारतीय बिजली बोर्ड घरों को{' '}
            <Link href="/hi/blog/how-telescopic-electricity-slabs-work" className="text-brass underline">
              टेलिस्कोपिक स्लैब
            </Link>{' '}
            से बिल करते हैं, इसलिए आपका AC महीने के आखिर में जो यूनिट्स जोड़ता है वे आपके घर की पहली यूनिट्स से ऊंची दर पर बिल हो सकती हैं। वही AC, उतने ही घंटे चलाया गया, अलग-अलग राज्यों में — या हल्के-इस्तेमाल बनाम भारी-इस्तेमाल वाले महीने में एक ही घर में — काफी अलग खर्च का हो सकता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: वाटेज और घंटे आपको यूनिट्स देते हैं — आपका अपना स्लैब ढांचा ही यूनिट्स को असली रुपये खर्च में बदलता है।
          </p>
        </section>

        <section aria-labelledby="common-mistakes" className="mt-10 scroll-mt-20">
          <h2 id="common-mistakes" className={h2Cls}>
            ज़्यादातर AC-कॉस्ट आर्टिकल यहां गलत क्यों होते हैं?
          </h2>
          <ul className="mt-1 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-ac" aria-hidden>✕</span>
              <span className={pCls}>
                <strong className="text-ink-navy">
                  एक अकेली राष्ट्रीय "औसत" रनिंग कॉस्ट।
                </strong>{' '}
                चूंकि टैरिफ राज्य और स्लैब के हिसाब से इतने अलग होते हैं, एक फ्लैट राष्ट्रीय नंबर अक्सर किसी भी खास पाठक के लिए गलत होता है — इसे आपके अपने बोर्ड की असली दर के मुकाबले गिना जाना चाहिए।
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-ac" aria-hidden>✕</span>
              <span className={pCls}>
                <strong className="text-ink-navy">
                  लेबल वाटेज को गारंटी मानना।
                </strong>{' '}
                एक स्वतंत्र Centre for Science and Environment अध्ययन में पाया गया कि कुछ 5-स्टार AC चरम गर्मी (लगभग 40–50°C) में अपनी बताई क्षमता से 10–28% ज़्यादा बिजली खींच रहे थे — स्टिकर नंबर एक लैब-परिस्थिति आंकड़ा है, हर असली दिन के लिए वादा नहीं।
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: किसी भी सामान्य रनिंग-कॉस्ट नंबर को, इस लेख में आगे दिए नंबरों सहित, अपने टैरिफ और परिस्थितियों के मुकाबले जांचने का शुरुआती बिंदु मानें — अंतिम जवाब नहीं।
          </p>
        </section>

        <section aria-labelledby="wattage-table" className="mt-10 scroll-mt-20">
          <h2 id="wattage-table" className={h2Cls}>
            टनेज के हिसाब से स्टार रेटिंग और पावर कंजम्पशन
          </h2>
          <p className={pCls}>
            टनेज और स्टार रेटिंग के हिसाब से सामान्य पावर ड्रॉ, अंदाज़े के लिए:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">टनेज</th>
                  <th className="px-4 py-2 text-right font-semibold">3-स्टार (सामान्य)</th>
                  <th className="px-4 py-2 text-right font-semibold">5-स्टार (सामान्य)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {wattageTable.map((r) => (
                  <tr key={r.tonnage}>
                    <td className="px-4 py-2 font-medium">{r.tonnage}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{r.threeStar}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{r.fiveStar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-2 text-xs ${pCls}`}>
            एक निर्माता दक्षता चार्ट से उदाहरण, सामान्य आंकड़े — असली खपत ब्रांड और मॉडल के हिसाब से बदलती है। एक 5-स्टार AC समान टनेज के तुलनीय 3-स्टार मॉडल से लगभग 20–28% कम ऊर्जा इस्तेमाल कर सकता है, हालांकि सटीक अंतर तुलना किए जा रहे खास मॉडलों पर निर्भर करता है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: वाटेज में स्टार-रेटिंग का अंतर असली और मायने रखने वाला है, लेकिन यह हर मॉडल के लिए एक सामान्य रेंज है, तय नंबर नहीं।
          </p>
        </section>

        <section aria-labelledby="bee-rerating" className="mt-10 scroll-mt-20">
          <h2 id="bee-rerating" className={h2Cls}>
            जनवरी 2026 के BEE री-रेटिंग से क्या बदला?
          </h2>
          <p className={pCls}>
            जनवरी 2026 से, Bureau of Energy Efficiency ने हर स्टार श्रेणी पाने के लिए ज़रूरी दक्षता सीमा बढ़ा दी। असल में: जो मॉडल 2025 मानदंडों के तहत 5-स्टार के लिए योग्य होता, वह अब 4-स्टार लेबल है; एक 2025 4-स्टार मॉडल अब 3-स्टार है; एक 2025 3-स्टार मॉडल अब 2-स्टार है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            <strong>AC के असली कूलिंग प्रदर्शन में कुछ नहीं बदला</strong> — सिर्फ हर लेबल पाने की सीमा ऊंची हुई है। अगर आपका नया AC आपके पास मौजूद किसी पुराने से कम स्टार रेटिंग दिखाता है, तो इसका ज़रूरी नहीं मतलब यह है कि यह कम दक्ष है; हो सकता है इसे सिर्फ एक सख्त 2026 पैमाने के हिसाब से रेट किया गया हो। हम यहां सटीक संशोधित ISEER (Indian Seasonal Energy Efficiency Ratio) सीमा के नंबर नहीं छाप रहे, क्योंकि लिखते समय वे स्वतंत्र रूप से पुष्ट नहीं थे — लेकिन बदलाव की दिशा (किसी दिए स्टार को पाना मुश्किल होना) साफ है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: 2026-रेटेड मॉडल की 2026-से-पहले के मॉडल से तुलना करते समय, सिर्फ स्टार लेबल की बजाय, ACs की तुलना उनकी असली ISEER वैल्यू या वाटेज से करें।
          </p>
        </section>

        <section aria-labelledby="worth-it" className="mt-10 scroll-mt-20">
          <h2 id="worth-it" className={h2Cls}>
            क्या 5-स्टार AC असल में अतिरिक्त पैसे के लायक है?
          </h2>
          <p className={pCls}>
            यह मुख्य रूप से इस पर निर्भर करता है कि आप इसे असल में रोज़ कितने घंटे चलाते हैं। एक तुलनीय 3-स्टार मॉडल के मुकाबले 5-स्टार AC का कीमत प्रीमियम आम तौर पर लगभग{' '}
            <strong>₹7,000–10,000</strong> होता है, और यह प्रीमियम आम तौर पर रोज़ 8 या उससे ज़्यादा घंटे AC चलाने वाले घरों के लिए बिजली बचत से लगभग <strong>4–6 साल</strong> में वसूल हो जाता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            हल्के इस्तेमाल के लिए — जैसे रोज़ 4–5 घंटे — बचत धीरे-धीरे जमा होती है, और 3-स्टार मॉडल अक्सर ज़्यादा संतुलित आर्थिक विकल्प होता है, क्योंकि हो सकता है आप AC को इतनी देर न चलाएं कि ऊंची शुरुआती लागत उचित समय में वसूल हो जाए। ये सामान्य योजना रेंज हैं, किसी खास मॉडल या टैरिफ की गारंटी नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            अगर आपका AC पहले से ही आपके घर का सबसे बड़ा बिजली खर्च है, तो यह भी जांचने लायक है कि रूफटॉप सोलर पेबैक आपके घर के लिए सही बैठता है या नहीं, हमारे{' '}
            <Link href="/hi/solar/roi-calculator" className="text-brass underline">
              सोलर ROI कैलकुलेटर
            </Link>{' '}
            से।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: भारी रोज़ाना इस्तेमाल अर्थशास्त्र को 5-स्टार की तरफ झुकाता है; हल्का, कभी-कभार इस्तेमाल अक्सर प्रीमियम को उचित नहीं ठहराता।
          </p>
        </section>

        <section aria-labelledby="worked-example" className="mt-10 scroll-mt-20">
          <h2 id="worked-example" className={h2Cls}>
            उदाहरण गणना: 1.5-टन AC का महीने का खर्च असल में कितना आता है?
          </h2>
          <p className={pCls}>
            ऊपर तालिका के उदाहरण 3-स्टार वाटेज का इस्तेमाल करते हुए, और 30 दिनों में रोज़ 6 घंटे इस्तेमाल की एक बताई गई मान्यता के साथ:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">स्टेप</th>
                  <th className="px-4 py-2 font-semibold">गणना</th>
                  <th className="px-4 py-2 text-right font-semibold">नतीजा</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {workedExample.map((r) => (
                  <tr key={r.step}>
                    <td className="px-4 py-2 font-medium">{r.step}</td>
                    <td className="px-4 py-2 text-ash/70">{r.calc}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{r.result}</td>
                  </tr>
                ))}
                <tr className="bg-mist/60">
                  <td className="px-4 py-2 font-semibold text-ink-navy">बिल पर असर</td>
                  <td className="px-4 py-2 text-ash/70" colSpan={2}>
                    इन ~199 यूनिट्स पर अपने राज्य की स्लैब दर लगाएं — यहीं असली रुपये का नंबर इस पर निर्भर करता है कि आप कहां रहते हैं।
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            यह एक बताई गई मान्यता (6 घंटे/दिन, 30 दिन, एक सामान्य 3-स्टार वाटेज) पर बना उदाहरण गणित है — आपके असली घंटे, टनेज और स्टार रेटिंग यूनिट गिनती बदल देंगे, और आपके राज्य का टैरिफ रुपये आंकड़े को पूरी तरह बदल देगा। खुद के लिए असली नंबर हमारे{' '}
            <Link href="/hi/ac/bill-calculator" className="font-semibold text-brass underline">
              AC बिल कैलकुलेटर
            </Link>{' '}
            से देखें, या इसे सीधे किसी खास राज्य के स्लैब पर गिनें, जैसे{' '}
            <Link href="/hi/electricity/tneb-bill-calculator" className="text-brass underline">
              TNEB (तमिलनाडु)
            </Link>{' '}
            या{' '}
            <Link href="/hi/electricity/msedcl-bill-calculator" className="text-brass underline">
              MSEDCL (महाराष्ट्र)
            </Link>
            ।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ~199 यूनिट उदाहरण नंबर है — अपने राज्य के कैलकुलेटर में इसे (या अपने असली घंटे) डालें ताकि पता चले असल में रुपयों में कितना खर्च आता है।
          </p>
        </section>

        <section aria-labelledby="tonnage" className="mt-10 scroll-mt-20">
          <h2 id="tonnage" className={h2Cls}>
            मेरे कमरे के लिए मुझे असल में कितने साइज़ का AC चाहिए?
          </h2>
          <p className={pCls}>
            टनेज सही करना दोनों तरह से खर्च के लिए मायने रखता है। एक अंडरसाइज़्ड AC को अपने सेट तापमान तक पहुंचने के लिए ज़्यादा देर और ज़्यादा मेहनत से चलना पड़ता है, जो कम शुरुआती कीमत के बावजूद कुल मिलाकर ज़्यादा खर्चीला पड़ सकता है। एक ओवरसाइज़्ड AC कमरे को बहुत जल्दी ठंडा कर देता है और फिर बार-बार ऑन-ऑफ साइकल करता है, जो अकुशल भी है और कमरे को चिपचिपा छोड़ सकता है क्योंकि यह ठीक से डीह्यूमिडिफाई करने के लिए काफी देर नहीं चलता।
          </p>
          <p className={`mt-3 ${pCls}`}>
            टनेज को आपके कमरे के असली साइज़, धूप और मंजिल के हिसाब से तय होना चाहिए — किसी मोटे अंदाज़े से नहीं। खरीदने से पहले सही साइज़िंग सुझाव पाने के लिए अपने कमरे के असली आयामों के साथ हमारा{' '}
            <Link href="/hi/ac/tonnage-calculator" className="text-brass underline">
              AC टनेज कैलकुलेटर
            </Link>{' '}
            इस्तेमाल करें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: अंडरसाइज़्ड और ओवरसाइज़्ड दोनों तरह के AC पैसे बर्बाद करते हैं — अपनी टनेज कमरे के हिसाब से साइज़ करें, अंदाज़ा न लगाएं।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़ी हुई गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>📘</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                टेलिस्कोपिक बिजली स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                कुल मासिक इस्तेमाल के हिसाब से एक ही AC का खर्च अलग क्यों हो सकता है।
              </p>
            </Link>
            <Link
              href="/hi/blog/is-rooftop-solar-worth-it-in-india-2026"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>☀️</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                2026 में भारत में रूफटॉप सोलर लगाना फायदेमंद है?
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अगर आपका AC आपके बिल पर हावी है, तो यह अगला जांचने लायक नंबर है।
              </p>
            </Link>
          </div>
          <p className="mt-3 text-sm text-ash/60">
            अगर आप खास AC ब्रांड की तुलना कर रहे हैं, तो हमारे{' '}
            <Link href="/hi/ac/brands" className="text-brass underline">
              ब्रांड-वार AC कैलकुलेटर
            </Link>{' '}
            देखें।
          </p>
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
          स्रोत: Bureau of Energy Efficiency (BEE) 2026 मानदंड संशोधन, निर्माता दक्षता डेटा, और असली-दुनिया AC पावर ड्रॉ पर एक स्वतंत्र Centre for Science and Environment अध्ययन। वाटेज, पेबैक और रेटिंग आंकड़े सामान्य/उदाहरण हैं और ब्रांड, मॉडल और परिस्थितियों के हिसाब से बदलते हैं — हमेशा अपने AC के नेमप्लेट और अपने राज्य के मौजूदा टैरिफ से पुष्टि करें। हम इस तरह के तथ्यों को कैसे सत्यापित करते हैं, इसके लिए हमारी{' '}
          <Link href="/methodology" className="text-brass underline">
            पद्धति
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
