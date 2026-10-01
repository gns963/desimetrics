import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/supreme-court-traffic-challans-electricity-bills'
const TITLE = 'क्या बकाया ट्रैफिक चालान आपके बिजली बिल में जुड़ेंगे? सुप्रीम कोर्ट ने असल में क्या कहा'
const DESCRIPTION =
  'सुप्रीम कोर्ट ने बकाया ट्रैफिक चालान को बिजली बिल से जोड़ने का सुझाव दिया। आपके बिल में अभी कुछ नहीं बदला — यह सुनवाई के दौरान दिया गया सुझाव था, आदेश नहीं। जानिए असल में क्या कहा गया, और बिजली कानून अभी क्या इजाज़त देता है।'
const LAST_UPDATED = '1 अक्टूबर 2026'
const HEARING_DATE = '28 सितंबर 2026'

export const metadata: Metadata = {
  title: 'बिजली बिल में ट्रैफिक चालान? सुप्रीम कोर्ट ने असल में क्या कहा',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'article', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'न्यूज़', path: '/news' },
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
  datePublished: '2026-10-01',
  dateModified: '2026-10-01',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'क्या मेरा बकाया ट्रैफिक चालान मेरे बिजली बिल में जोड़ा जाएगा?',
    a: 'अभी की स्थिति में नहीं। यह 28 सितंबर 2026 की सुनवाई के दौरान सुप्रीम कोर्ट का दिया गया सुझाव था, आदेश नहीं। किसी बिजली वितरण कंपनी को ट्रैफिक जुर्माना वसूलने का कोई निर्देश जारी नहीं हुआ, और किसी राज्य ने ऐसी व्यवस्था की घोषणा नहीं की है। आपका बिजली बिल कैसे बनता है, उसमें कुछ नहीं बदला।',
  },
  {
    q: 'सुप्रीम कोर्ट ने ठीक-ठीक क्या कहा?',
    a: 'जस्टिस जे.बी. पारदीवाला और जस्टिस के.वी. विश्वनाथन की बेंच ट्रैफिक उल्लंघनों के इलेक्ट्रॉनिक प्रवर्तन से जुड़ी एक अर्जी सुन रही थी। जस्टिस पारदीवाला ने कहा कि अगर जुर्माना वसूला ही न जाए तो सिर्फ ई-चालान जारी करते रहना काफी नहीं है, और सुझाव दिया कि अधिकारी व्यावहारिक रास्ते तलाशें — जिनमें बकाया चालान को बिजली बिल जैसे अन्य सरकारी बकायों में जोड़ना भी शामिल है। कोर्ट ने यह भी कहा कि कोई भी व्यवस्था ज़मीनी हकीकत को ध्यान में रखकर बने।',
  },
  {
    q: 'ट्रैफिक जुर्माने में असल में कितना पैसा बकाया है?',
    a: 'कोर्ट को बताया गया कि राज्यों और केंद्र शासित प्रदेशों को ई-चालान के करीब ₹45,000 करोड़ अभी वसूलने हैं, और अब तक लगभग ₹25,000 करोड़ वसूले जा चुके हैं। ये आंकड़े 28 सितंबर 2026 की सुनवाई में रखे गए।',
  },
  {
    q: 'क्या बिजली कंपनी कानूनी रूप से गैर-बिजली बकाया आपके बिल में जोड़ सकती है?',
    a: 'बिजली अधिनियम, 2003 की धारा 56 लाइसेंसी को बकाया वसूलने के लिए सप्लाई काटने की इजाज़त देती है — "बिजली का कोई शुल्क या बिजली के शुल्क के अलावा कोई राशि" — लेकिन यह दूसरा वाक्यांश खुद इस शर्त से बंधा है कि वह राशि "बिजली की सप्लाई, ट्रांसमिशन, वितरण या व्हीलिंग के संबंध में" देय हो। सीधे शब्दों में, इसका दायरा बिजली क्षेत्र के बकाया (मीटर और रीकनेक्शन लागत आदि) तक है, किसी दूसरे सरकारी विभाग को देय असंबंधित जुर्माने तक नहीं। इसलिए इस सुझाव को लागू करने के लिए संभवतः अलग से कानूनी आधार चाहिए होगा, सिर्फ प्रशासनिक फैसला नहीं।',
  },
  {
    q: 'क्या भारतीय बिजली बिल में पहले कभी कोई गैर-बिजली शुल्क आया है?',
    a: 'हां — इलेक्ट्रिसिटी ड्यूटी, एक राज्य कर जो ज़्यादातर राज्यों के बिलों में अलग लाइन के रूप में दिखता है। लेकिन यह केंद्रीय बिजली अधिनियम पर निर्भर नहीं है: हर राज्य इसे अपने अलग कानून से लगाता है, जैसे महाराष्ट्र इलेक्ट्रिसिटी ड्यूटी एक्ट, 2016। यही सबसे नज़दीकी मिसाल है, और यह बताती है कि बिल में कोई नया गैर-बिजली मद जोड़ने का रास्ता नए कानून से होकर जाता है।',
  },
  {
    q: 'कोर्ट ने और कौन से उपाय चर्चा में रखे?',
    a: 'रजिस्ट्रेशन सर्टिफिकेट के नवीनीकरण, डुप्लीकेट RC और मालिकाना हक के ट्रांसफर पर रोक; फिटनेस सर्टिफिकेट रोकना; PUC सर्टिफिकेट देने से इनकार; ड्राइविंग लाइसेंस नवीनीकरण रोकना और मौजूदा लाइसेंस निलंबित करना; परिवहन पोर्टल पर वाहनों को ब्लैकलिस्ट करना; सड़क पर रैंडम जांच; और लगातार बकाया चालान वाले वाहनों को जब्त करना।',
  },
  {
    q: 'मैं कैसे जांचूं कि मेरे नाम कोई चालान बकाया है?',
    a: 'सड़क परिवहन एवं राजमार्ग मंत्रालय के आधिकारिक पोर्टल echallan.parivahan.gov.in पर जाएं, जहां वाहन नंबर, चालान नंबर या ड्राइविंग लाइसेंस नंबर से चालान देखे जा सकते हैं। चालान बताने वाले SMS लिंक से सावधान रहें — लिंक पर क्लिक करने की बजाय सीधे आधिकारिक पोर्टल पर जांचें।',
  },
  {
    q: 'क्या बकाया चालान की वजह से मेरी बिजली कट सकती है?',
    a: 'मौजूदा कानूनी स्थिति में नहीं। बिजली अधिनियम की धारा 56 के तहत कनेक्शन काटना आपकी बिजली सप्लाई से जुड़े बकाया पर आधारित है। किसी ट्रैफिक जुर्माने को ऐसा बिजली बकाया बनने के लिए, जिस पर कनेक्शन काटा जा सके, पहले यह कानून बदलना होगा कि वितरण कंपनी किस चीज़ का बिल भेज सकती है और किस पर कनेक्शन काट सकती है। ऐसा कोई बदलाव अधिसूचित नहीं हुआ है।',
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

export default function ScChallanElectricityBillPageHi() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'न्यूज़', href: '/hi/news' },
          { label: 'SC: चालान और बिजली बिल', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> राष्ट्रीय · सुप्रीम कोर्ट
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '🧾', big: 'कोई बदलाव नहीं', small: 'आपके बिल में अभी', tone: 'hub' },
          { icon: '⚖️', big: 'सुझाव', small: 'आदेश नहीं', tone: 'hub' },
          { icon: '💰', big: '₹45,000cr', small: 'ई-चालान बकाया', tone: 'caution-amber' },
          { icon: '✅', big: '₹25,000cr', small: 'अब तक वसूला गया', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          लेखक:{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · अपडेट {LAST_UPDATED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>आपके बिजली बिल में अभी कुछ नहीं बदला है।</strong> {HEARING_DATE} को सुप्रीम
          कोर्ट ने सुझाव दिया कि बकाया ट्रैफिक चालान को असल में वसूलने के लिए उन्हें बिजली बिल
          में जोड़ा जा सकता है। यह एक मामले की सुनवाई के दौरान दी गई मौखिक टिप्पणी थी — आदेश
          नहीं, अधिसूचना नहीं, और किसी बिजली वितरण कंपनी को दिया गया निर्देश भी नहीं। किसी
          राज्य ने ऐसी व्यवस्था की घोषणा नहीं की है, और आज आपका बिल जिस तरह बनता है वह वैसा ही
          है। यहां ठीक-ठीक वही है जो कहा गया, और कानून अभी किसकी इजाज़त देता है।
        </p>

        <section aria-labelledby="what-said" className="mt-10 scroll-mt-20">
          <h2 id="what-said" className={h2Cls}>
            सुप्रीम कोर्ट ने असल में क्या कहा
          </h2>
          <p className={pCls}>
            यह टिप्पणी <strong>जस्टिस जे.बी. पारदीवाला</strong> और{' '}
            <strong>जस्टिस के.वी. विश्वनाथन</strong> की बेंच से आई, जो मोटर वाहन अधिनियम, 1988 की
            धारा 136A और केंद्रीय मोटर वाहन नियम, 1989 के नियम 167A के तहत ट्रैफिक उल्लंघनों के
            इलेक्ट्रॉनिक प्रवर्तन से जुड़ी एक अर्जी सुन रही थी। यह अर्जी{' '}
            <em>एस. राजशेखरन बनाम भारत संघ व अन्य</em> मामले का हिस्सा है, जो कोयंबटूर के
            हड्डी रोग विशेषज्ञ एस. राजशेखरन द्वारा 2012 में दायर एक लंबे चल रहे सड़क-सुरक्षा
            जनहित मामले से जुड़ी है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            जस्टिस पारदीवाला की चिंता यह थी कि प्रवर्तन कागज़ पर ही रुक जाता है: बड़ी संख्या में
            ई-चालान जारी करने से तब तक कुछ हासिल नहीं होता जब तक जुर्माना वसूला न जाए। इसी के
            उलट उन्होंने सुझाव दिया कि अधिकारी भुगतान कराने के व्यावहारिक रास्ते खोजें — जिनमें
            बकाया चालान को अन्य सरकारी बकायों, जिनमें बिजली बिल भी शामिल है, से जोड़ना एक है,
            इस तर्क पर कि बिजली बिल लोग भरोसेमंद तरीके से भरते हैं। कोर्ट ने यह भी कहा कि जो भी
            तंत्र अपनाया जाए, वह कागज़ी नहीं बल्कि ज़मीनी हकीकत के हिसाब से बनना चाहिए।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: कोर्ट वसूली की समस्या बता रहा था और अधिकारियों को उसे सुलझाने के लिए कह
            रहा था — वह यह तय नहीं कर रहा था कि बिजली बिलिंग कैसे काम करेगी।
          </p>
        </section>

        <section aria-labelledby="numbers" className="mt-10 scroll-mt-20">
          <h2 id="numbers" className={h2Cls}>
            चिंता के पीछे के आंकड़े
          </h2>
          <p className={pCls}>
            कोर्ट को बताया गया कि राज्यों और केंद्र शासित प्रदेशों में ई-चालान के करीब{' '}
            <strong>₹45,000 करोड़</strong> अभी वसूले जाने बाकी हैं, जबकि लगभग{' '}
            <strong>₹25,000 करोड़</strong> वसूले जा चुके हैं। यानी जितना जुर्माना लगाया गया,
            उसका बड़ा हिस्सा अब भी बकाया है — और यही वजह बनी कि सिर्फ और चालान जारी करने से आगे
            वसूली के रास्ते खोजे जाएं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ये {HEARING_DATE} तक कोर्ट के सामने रखे गए आंकड़े हैं; ये बकाया बताते हैं,
            बिजली बिल में डाली जा रही कोई राशि नहीं।
          </p>
        </section>

        <section aria-labelledby="suggestion-vs-order" className="mt-10 scroll-mt-20">
          <h2 id="suggestion-vs-order" className={h2Cls}>
            सुझाव बनाम आदेश — यह फर्क क्यों मायने रखता है
          </h2>
          <p className={pCls}>
            कई सुर्खियों ने इसे ऐसे पेश किया जैसे कोर्ट ने तय कर दिया हो कि चालान बिजली बिल में
            जुड़ेंगे। ऐसा नहीं हुआ, और यह फर्क तकनीकी नहीं, व्यावहारिक है:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">क्या हुआ</th>
                  <th className="px-4 py-2 font-semibold">क्या नहीं हुआ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2">सुनवाई के दौरान एक मौखिक सुझाव</td>
                  <td className="px-4 py-2">कोई बाध्यकारी आदेश या फैसला</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">अधिकारियों को विकल्प तलाशने को कहा गया</td>
                  <td className="px-4 py-2">बिजली कंपनियों को कोई निर्देश</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">वसूली की समस्या रिकॉर्ड पर रखी गई</td>
                  <td className="px-4 py-2">बिजली बिलिंग नियमों में कोई बदलाव</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">कई संभावित उपायों पर चर्चा</td>
                  <td className="px-4 py-2">किसी राज्य में अधिसूचित योजना</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निष्कर्ष: जब तक सरकार कुछ अधिसूचित न करे या कोर्ट आदेश न दे, उपभोक्ता के लिए करने को
            कुछ नहीं है।
          </p>
        </section>

        <section aria-labelledby="legal" className="mt-10 scroll-mt-20">
          <h2 id="legal" className={h2Cls}>
            क्या डिस्कॉम कानूनी रूप से गैर-बिजली बकाया आपके बिल में डाल सकता है?
          </h2>
          <p className={pCls}>
            यहीं यह सुझाव मौजूदा कानून से टकराता है.{' '}
            <strong>बिजली अधिनियम, 2003 की धारा 56</strong> वह प्रावधान है जो वितरण लाइसेंसी को
            बकाया पैसे पर सप्लाई काटने देता है। इसमें लाइसेंसी को देय &ldquo;बिजली का कोई शुल्क{' '}
            <em>या बिजली के शुल्क के अलावा कोई राशि</em>&rdquo; शामिल है — लेकिन यह दूसरा
            वाक्यांश खुद शर्त से बंधा है: वह राशि &ldquo;बिजली की सप्लाई, ट्रांसमिशन, वितरण या
            व्हीलिंग के संबंध में&rdquo; देय होनी चाहिए।
          </p>
          <p className={`mt-3 ${pCls}`}>
            सीधे पढ़ने पर, यह दायरा बिजली क्षेत्र के बकाया तक पहुंचता है — मीटर लागत, रीकनेक्शन
            खर्च, व्हीलिंग चार्ज — न कि परिवहन विभाग को देय किसी असंबंधित जुर्माने तक। धारा 56
            में कनेक्शन काटकर वसूली पर दो साल की समय-सीमा भी है। यानी बिजली बिल में ट्रैफिक
            चालान जोड़ना ऐसा नहीं लगता जिसे कोई डिस्कॉम मौजूदा अधिनियम के तहत अपने आप शुरू कर
            सके।
          </p>
          <p className={`mt-3 ${pCls}`}>
            आपके बिल पर गैर-बिजली मद की एक सीख देने वाली मिसाल है:{' '}
            <strong>इलेक्ट्रिसिटी ड्यूटी</strong>, एक राज्य कर जो ज़्यादातर बिलों में अलग लाइन
            के रूप में दिखता है। अहम बात यह कि यह केंद्रीय बिजली अधिनियम पर टिका ही नहीं है: हर
            राज्य इसे अपने समर्पित कानून से लगाता है, जैसे महाराष्ट्र इलेक्ट्रिसिटी ड्यूटी एक्ट,
            2016। इससे जो तरीका दिखता है वह यह कि बिजली बिल पर कोई सचमुच नया, गैर-बिजली शुल्क
            डालने के लिए ऐतिहासिक रूप से अपना कानून चाहिए होता है, प्रशासनिक फैसला नहीं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: कानूनी रास्ता सैद्धांतिक रूप से मौजूद है, लेकिन वह कानून बनाने से होकर
            जाता है — जो बिलिंग सिस्टम बदलने से धीमी और ज़्यादा सार्वजनिक प्रक्रिया है।
          </p>
        </section>

        <section aria-labelledby="other-measures" className="mt-10 scroll-mt-20">
          <h2 id="other-measures" className={h2Cls}>
            चर्चा में आए अन्य उपाय
          </h2>
          <p className={pCls}>
            सुर्खियां बिजली बिल वाले विचार ने बटोरीं, लेकिन उसी सुनवाई में कई विकल्पों में से वह
            एक था — और बाकी सीधे परिवहन अधिकारियों की मौजूदा शक्तियों के दायरे में हैं:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'वाहन रजिस्ट्रेशन सेवाएं',
                'चालान बकाया रहते रजिस्ट्रेशन सर्टिफिकेट के नवीनीकरण, डुप्लीकेट RC जारी करने और मालिकाना हक के ट्रांसफर पर रोक।',
              ],
              [
                'फिटनेस और प्रदूषण सर्टिफिकेट',
                'व्यावसायिक वाहनों के फिटनेस सर्टिफिकेट रोकना, और PUC (प्रदूषण नियंत्रण) सर्टिफिकेट देने से इनकार।',
              ],
              [
                'ड्राइविंग लाइसेंस',
                'लाइसेंस नवीनीकरण रोकना, और पहले से जारी लाइसेंस निलंबित करना।',
              ],
              [
                'परिवहन पोर्टल पर ब्लैकलिस्ट',
                'डिफॉल्टर वाहनों को राष्ट्रीय परिवहन डेटाबेस में फ्लैग करना, जिसे परिवहन कार्यालय किसी भी सेवा अनुरोध पर जांचते हैं।',
              ],
              [
                'सड़क पर प्रवर्तन',
                'रैंडम जांच, और लगातार बकाया चालान वाले वाहनों की जब्ती।',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-news" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            निष्कर्ष: इन उपायों के लिए कोई नया कानून नहीं चाहिए, इसलिए बिजली बिल से जुड़ी किसी
            भी चीज़ से पहले इनके आने की संभावना कहीं ज़्यादा है।
          </p>
        </section>

        <section aria-labelledby="what-to-do" className="mt-10 scroll-mt-20">
          <h2 id="what-to-do" className={h2Cls}>
            अभी क्या करें
          </h2>
          <ol className="mt-3 space-y-3">
            {[
              [
                'जांचें कि आपके नाम कोई चालान बकाया है या नहीं',
                'सड़क परिवहन एवं राजमार्ग मंत्रालय का आधिकारिक पोर्टल echallan.parivahan.gov.in वाहन नंबर, चालान नंबर या ड्राइविंग लाइसेंस नंबर से खोजने देता है। कई लोगों को उस वाहन के कैमरा-चालान का पता ही नहीं होता जिसे वे बेच चुके हैं।',
              ],
              [
                'आधिकारिक पोर्टल इस्तेमाल करें, SMS लिंक नहीं',
                'चालान के नाम पर फिशिंग मैसेज आम हैं। लिंक दबाने की बजाय पोर्टल का पता खुद टाइप करें, और आधिकारिक भुगतान प्रक्रिया के बाहर कार्ड डिटेल मांगने वाले किसी भी पेज से सावधान रहें।',
              ],
              [
                'जो वाकई बकाया है उसे चुका दें',
                'परिवहन अधिकारियों के पास पहले से मौजूद उपायों को देखते हुए — लाइसेंस, RC, फिटनेस और PUC सेवाएं — बकाया चालान बिजली-बिल वाले प्रस्ताव के हकीकत बनने से बहुत पहले आपके रोज़मर्रा के कागज़ी काम रोक सकता है।',
              ],
              [
                'भुगतान का रेफरेंस संभालकर रखें',
                'भुगतान के बाद रसीद सेव करें, क्योंकि पोर्टल रिकॉर्ड में देरी हो सकती है और विवादित एंट्री रेफरेंस नंबर से ही जल्दी सुलझती है।',
              ],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-news font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ol>
          <p className={`mt-4 ${pCls}`}>
            आधिकारिक पोर्टल है{' '}
            <a
              href="https://echallan.parivahan.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              echallan.parivahan.gov.in
            </a>
            ।
          </p>
        </section>

        <section aria-labelledby="whats-next" className="mt-10 scroll-mt-20">
          <h2 id="whats-next" className={h2Cls}>
            आगे क्या देखना है
          </h2>
          <p className={pCls}>
            कोर्ट ने मामले में सहायता कर रहे न्याय मित्र, वरिष्ठ अधिवक्ता गौरव अग्रवाल से एक
            अनुपालन चार्ट तैयार करने को कहा, जिसमें मामले में पहले दिए गए निर्देश, उन्हें लागू
            करने की समय-सीमा और उनकी मौजूदा स्थिति दर्ज हो। बिजली-बिल वाली टिप्पणी नहीं, बल्कि
            वही चार्ट तय करेगा कि आगे असल में क्या निर्देश आता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            इनमें से कोई भी चीज़ बिजली बिल तक पहुंचे, इससे पहले तीन बातें सामने आनी होंगी: ऐसा
            करने का लिखित आदेश, उस आदेश पर किसी राज्य सरकार या नियामक की कार्रवाई, और वितरण
            लाइसेंसी के पास गैर-बिजली बकाया का बिल भेजने व कनेक्शन काटने का कानूनी आधार। आज इनमें
            से कोई मौजूद नहीं है। {LAST_UPDATED} तक हमें बिजली-बिल सुझाव पर कोई लिखित आदेश, अगली
            सुनवाई की तारीख, या किसी राज्य सरकार या वितरण कंपनी की प्रतिक्रिया नहीं मिली।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: लिखित आदेश और राज्य की अधिसूचना पर नज़र रखें — अदालती टिप्पणी अपने आप में
            कुछ नहीं बदलती।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े टूल और गाइड
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/hi/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ⚡
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">बिजली बिल कैलकुलेटर</p>
              <p className="mt-1 text-xs text-ash/60">
                अपने डिस्कॉम की असली टैरिफ पर, राज्य-दर-राज्य बिल का अनुमान।
              </p>
            </Link>
            <Link
              href="/hi/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📄
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                बिल की हर लाइन का मतलब
              </p>
              <p className="mt-1 text-xs text-ash/60">
                फिक्स्ड चार्ज, एनर्जी चार्ज, FCA और इलेक्ट्रिसिटी ड्यूटी, समझाए गए।
              </p>
            </Link>
            <Link
              href="/hi/blog/how-telescopic-electricity-slabs-work"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📊
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                टेलिस्कोपिक स्लैब कैसे काम करते हैं
              </p>
              <p className="mt-1 text-xs text-ash/60">
                हर भारतीय बिजली बिल के पीछे की बिलिंग मैकेनिक्स।
              </p>
            </Link>
            <Link
              href="/hi/electricity/ev-charging-cost-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🔋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">EV चार्जिंग लागत</p>
              <p className="mt-1 text-xs text-ash/60">
                घर पर चार्जिंग आपके मासिक बिल में असल में कितना जोड़ती है।
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
          आखिरी अपडेट: {LAST_UPDATED}। सुनवाई का ब्यौरा {HEARING_DATE} तक का है और{' '}
          <em>एस. राजशेखरन बनाम भारत संघ व अन्य</em> की कार्यवाही की रिपोर्टिंग से लिया गया है —
          देखें{' '}
          <a
            href="https://www.barandbench.com/news/litigation/here-is-how-supreme-court-plans-to-recover-unpaid-traffic-challans"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Bar &amp; Bench
          </a>{' '}
          और{' '}
          <a
            href="https://english.gujaratsamachar.com/news/national/supreme-court-suggests-adding-unpaid-traffic-challans-to-electricity-bills-54524056395"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Gujarat Samachar
          </a>
          । हमें बिजली-बिल सुझाव पर कोई लिखित आदेश, अगली सुनवाई की तारीख, या किसी राज्य या वितरण
          कंपनी की प्रतिक्रिया नहीं मिली, और हमने अनुमान लगाने की बजाय ऊपर यही कहा है। यहां बताई
          गई कानूनी स्थिति बिजली अधिनियम, 2003 की धारा 56 के पाठ और इलेक्ट्रिसिटी ड्यूटी के अलग
          राज्य कानूनों के तहत लगने पर आधारित है; यह सामान्य जानकारी है, कानूनी सलाह नहीं। हम
          आंकड़े कैसे जुटाते और वेरिफाई करते हैं, इसके लिए हमारी{' '}
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
