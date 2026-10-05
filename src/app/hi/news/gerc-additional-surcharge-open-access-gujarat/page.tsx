import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gerc-additional-surcharge-open-access-gujarat'
const TITLE = 'गुजरात ओपन एक्सेस एडिशनल सरचार्ज ₹0.99/kWh तय: कारोबारियों के लिए इसका क्या मतलब है (अक्टूबर 2026–मार्च 2027)'
const DESCRIPTION =
  'GERC ने DGVCL, MGVCL, PGVCL और UGVCL के ओपन एक्सेस उपभोक्ताओं के लिए एडिशनल सरचार्ज ₹0.99/kWh तय किया है, जो 1 अक्टूबर 2026 से 31 मार्च 2027 तक लागू है। यह सिर्फ कमर्शियल और इंडस्ट्रियल ओपन एक्सेस उपभोक्ताओं पर लागू होता है — घरेलू बिल पर कोई असर नहीं।'
const LAST_UPDATED = '1 अक्टूबर 2026'
const ORDER_DATE = '10 सितंबर 2026'

export const metadata: Metadata = {
  title: 'गुजरात ओपन एक्सेस एडिशनल सरचार्ज ₹0.99/kWh (अक्टू 2026–मार्च 2027)',
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
    q: 'क्या यह एडिशनल सरचार्ज मेरे घर के बिजली बिल पर असर डालता है?',
    a: 'नहीं। एडिशनल सरचार्ज सिर्फ ओपन एक्सेस उपभोक्ताओं पर लागू होता है — यानी वे कमर्शियल और इंडस्ट्रियल उपभोक्ता जो अपनी डिस्कॉम के अलावा किसी और स्रोत से बिजली खरीदते हैं। सामान्य DGVCL, MGVCL, PGVCL या UGVCL कनेक्शन वाले घरेलू उपभोक्ता यह नहीं चुकाते, और इस आदेश से किसी घरेलू टैरिफ में कोई बदलाव नहीं होता।',
  },
  {
    q: 'एडिशनल सरचार्ज क्या है, और यह क्यों लगता है?',
    a: 'यह बिजली अधिनियम, 2003 की धारा 42(4) के तहत लगने वाला शुल्क है, जो वितरण कंपनी को उस लंबी अवधि की जनरेशन क्षमता की फिक्स्ड लागत की भरपाई करता है जो उसने उन उपभोक्ताओं के लिए अनुबंधित की थी जो अब ओपन एक्सेस पर चले गए हैं। डिस्कॉम की सप्लाई देने की जिम्मेदारी बनी रहती है, इसलिए कोई बड़ा उपभोक्ता कहीं और से बिजली लेने लगे तो भी वह उस क्षमता का अनुबंध रद्द नहीं कर सकती।',
  },
  {
    q: 'यह कितना है, और कब तक लागू है?',
    a: '₹0.99 प्रति kWh, जो 1 अक्टूबर 2026 से 31 मार्च 2027 तक DGVCL, MGVCL, PGVCL और UGVCL के ओपन एक्सेस उपभोक्ताओं पर लागू है। इसे GERC के आदेश क्रमांक 05 of 2026, दिनांक 10 सितंबर 2026 से तय किया गया और यह हर छह महीने में संशोधित होता है।',
  },
  {
    q: 'GERC ₹0.99 तक कैसे पहुंचा?',
    a: '1 अक्टूबर 2025 से 31 मार्च 2026 के GUVNL डेटा के आधार पर: 96,129 MU उपलब्ध ऊर्जा में से 63,110 MU सामान्य उपभोक्ताओं के लिए शेड्यूल हुई, यानी 33,018 MU स्ट्रैंडेड रही। अनुबंधित क्षमता पर चुकाई गई ₹8,193 करोड़ फिक्स्ड लागत में से ₹2,814 करोड़ स्ट्रैंडेड क्षमता से जुड़ी थी। 1,630 MU ओपन एक्सेस ऊर्जा के सापेक्ष, ओपन एक्सेस से जुड़ी स्ट्रैंडेड फिक्स्ड लागत ₹215 करोड़ बनी, जिसमें से डिमांड चार्ज से पहले ही वसूले गए ₹53 करोड़ घटाकर ₹162 करोड़ बचे। ₹162 करोड़ को 1,630 MU से भाग देने पर ₹0.99 प्रति यूनिट आता है।',
  },
  {
    q: 'क्या सरचार्ज बढ़ रहा है या घट रहा है?',
    a: 'यह हर छह महीने में बदलता है। पिछली पांच अवधियों में यह ₹0.93 (अक्टू 2024–मार्च 2025), ₹0.82 (अप्रैल–सित 2025), ₹1.00 (अक्टू 2025–मार्च 2026), ₹0.76 (अप्रैल–सित 2026) और अब ₹0.99 रहा है। पिछले तीन वर्षों में हर बार अक्टूबर–मार्च की छमाही अप्रैल–सितंबर से ऊंची रही है, हालांकि आदेश में इसका कोई कारण नहीं बताया गया।',
  },
  {
    q: 'एडिशनल सरचार्ज और क्रॉस-सब्सिडी सरचार्ज में क्या फर्क है?',
    a: 'दोनों का कानूनी आधार और मकसद अलग है। क्रॉस-सब्सिडी सरचार्ज, धारा 42(2) के तहत, डिस्कॉम को उस क्रॉस-सब्सिडी की भरपाई करता है जो कोई भुगतान करने वाला उपभोक्ता छोड़कर जाने पर खत्म हो जाती है। एडिशनल सरचार्ज, धारा 42(4) के तहत, सप्लाई देने की जारी जिम्मेदारी से बनी स्ट्रैंडेड फिक्स्ड लागत कवर करता है। एक ओपन एक्सेस उपभोक्ता पर दोनों लग सकते हैं, साथ ही ट्रांसमिशन, व्हीलिंग और स्टैंडबाय चार्ज भी।',
  },
  {
    q: 'ओपन एक्सेस के लिए पात्र कौन है?',
    a: 'बिजली अधिनियम में यह सीमा 1 MW अनुबंधित मांग या स्वीकृत लोड है। ग्रीन एनर्जी ओपन एक्सेस के लिए, इलेक्ट्रिसिटी (प्रमोटिंग रिन्यूएबल एनर्जी थ्रू ग्रीन एनर्जी ओपन एक्सेस) रूल्स, 2022 ने इसे घटाकर 100 kW कर दिया, और कैप्टिव उपभोक्ताओं के लिए कोई न्यूनतम सीमा नहीं रखी।',
  },
  {
    q: 'क्या किसी को एडिशनल सरचार्ज से छूट है?',
    a: 'राष्ट्रीय ग्रीन एनर्जी ओपन एक्सेस रूल्स, 2022 के तहत, वेस्ट-टू-एनर्जी संयंत्रों की बिजली, ग्रीन हाइड्रोजन व ग्रीन अमोनिया उत्पादन, और ऐसे उपभोक्ता जो पहले से फिक्स्ड चार्ज चुका रहे हैं — इन पर एडिशनल सरचार्ज लागू नहीं होता, हालांकि रूल्स में "फिक्स्ड चार्ज" परिभाषित नहीं है। ये केंद्रीय नियम हैं; इस GERC आदेश में अपनी कोई छूट दर्ज नहीं है, और गुजरात में GERC इन्हें कैसे लागू करता है यह हमने सत्यापित नहीं किया। छूट मान लेने की बजाय अपनी स्थिति अपनी डिस्कॉम या सलाहकार से पुष्ट करें।',
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

function CostBand() {
  const net = 162
  const recovered = 53
  const total = net + recovered
  const seg = [
    { label: 'ओपन एक्सेस उपभोक्ताओं से वसूली योग्य', value: net, cls: 'bg-hub-news' },
    { label: 'डिमांड चार्ज से पहले ही वसूला गया', value: recovered, cls: 'bg-hub-news/40' },
  ]
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">
        ओपन एक्सेस से जुड़ी ₹215 करोड़ स्ट्रैंडेड फिक्स्ड लागत का विभाजन
      </p>
      <div
        className="mt-2 flex h-14 w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-hairline"
        role="group"
        aria-label="₹215 करोड़ स्ट्रैंडेड फिक्स्ड लागत का विभाजन"
      >
        {seg.map((s) => (
          <div
            key={s.label}
            style={{ width: `${(s.value / total) * 100}%` }}
            className={`flex flex-col items-center justify-center px-1 text-center ${s.cls}`}
          >
            <span className="font-display text-sm font-bold tabular-nums text-white">
              ₹{s.value} cr
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ash/60">
        {seg.map((s) => (
          <span key={s.label}>
            <span className="font-semibold text-ink-navy">{s.label}:</span> ₹{s.value} cr
          </span>
        ))}
      </div>
    </div>
  )
}

export default function GercAdditionalSurchargePageHi() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'न्यूज़', href: '/hi/news' },
          { label: 'गुजरात ओपन एक्सेस सरचार्ज', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> गुजरात · GERC · ओपन एक्सेस
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚡', big: '₹0.99/kWh', small: 'एडिशनल सरचार्ज', tone: 'caution-amber' },
          { icon: '📅', big: '1 अक्टू – 31 मार्च', small: 'लागू अवधि', tone: 'hub' },
          { icon: '🏭', big: 'सिर्फ C&I', small: 'घरेलू पर असर नहीं', tone: 'hub' },
          { icon: '📈', big: '₹0.76 से', small: 'पिछली छमाही', tone: 'hub' },
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
          <strong>अगर आप घरेलू उपभोक्ता हैं, तो इसका आप पर कोई असर नहीं है।</strong> गुजरात
          इलेक्ट्रिसिटी रेगुलेटरी कमीशन ने <strong>ओपन एक्सेस</strong> उपभोक्ताओं के लिए{' '}
          <strong>एडिशनल सरचार्ज</strong> <strong>₹0.99 प्रति kWh</strong> तय किया है, जो{' '}
          <strong>1 अक्टूबर 2026 से 31 मार्च 2027</strong> तक लागू रहेगा। यह सिर्फ DGVCL, MGVCL,
          PGVCL और UGVCL के उन कमर्शियल व इंडस्ट्रियल उपभोक्ताओं पर लगता है जो अपनी वितरण कंपनी
          के अलावा किसी और स्रोत से बिजली खरीदते हैं। इस आदेश से घरेलू टैरिफ पर कोई असर नहीं पड़ता।
        </p>

        <section aria-labelledby="in-brief" className="mt-10 scroll-mt-20">
          <h2 id="in-brief" className={h2Cls}>
            फैसला संक्षेप में
          </h2>
          <p className={pCls}>
            {ORDER_DATE} को जारी{' '}
            <a
              href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3NjVfMTEtMDktMjAyNl8zMTgwNzg5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              आदेश क्रमांक 05 of 2026
            </a>{' '}
            में, अध्यक्ष पंकज जोशी तथा सदस्य हिरेन शाह और जतिन एन. ठक्कर की GERC बेंच ने 1
            अक्टूबर 2026 से शुरू होने वाले छह महीनों के लिए एडिशनल सरचार्ज ₹0.99/kWh तय किया।
            यह सरचार्ज हर छह महीने में उस पद्धति के तहत दोबारा तय होता है जिसे GERC ने 30 अगस्त
            2022 के आदेश में संशोधित किया था: GUVNL हर छमाही पूरी होने के 90 दिन के भीतर SLDC
            और चार्टर्ड अकाउंटेंट से प्रमाणित डेटा जमा करता है, और वही डेटा अगले साल की उसी
            छमाही की दर तय करता है। इस बार 1 अक्टूबर 2025 से 31 मार्च 2026 का डेटा इस्तेमाल हुआ।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यह कोई नया शुल्क नहीं, बल्कि नियमित छह-मासिक पुनर्निर्धारण है — बदलती सिर्फ
            दर है, और वह तय समय-सारणी पर बदलती है जिसकी योजना बनाई जा सकती है।
          </p>
        </section>

        <section aria-labelledby="who-pays" className="mt-10 scroll-mt-20">
          <h2 id="who-pays" className={h2Cls}>
            कौन चुकाता है — और कौन नहीं
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              [
                'चुकाते हैं: चारों राज्य डिस्कॉम के ओपन एक्सेस उपभोक्ता',
                'DGVCL, MGVCL, PGVCL या UGVCL के वे कमर्शियल व इंडस्ट्रियल उपभोक्ता जो बताई गई छह-महीने की अवधि में अपनी डिस्कॉम के अलावा कहीं और से ओपन एक्सेस के ज़रिए बिजली लेते हैं।',
              ],
              [
                'नहीं चुकाते: हर घरेलू उपभोक्ता',
                'घरेलू कनेक्शन को बिजली उसकी अपनी डिस्कॉम देती है, ओपन एक्सेस से नहीं, इसलिए एडिशनल सरचार्ज कभी घर के बिल में नहीं आता। इस आदेश से घरेलू स्लैब, फिक्स्ड चार्ज या इलेक्ट्रिसिटी ड्यूटी में कोई बदलाव नहीं होता।',
              ],
              [
                'नहीं चुकाते: डिस्कॉम सप्लाई पर सामान्य C&I उपभोक्ता',
                'जो कारोबार सीधे अपनी डिस्कॉम से बिजली खरीदता है वह ओपन एक्सेस उपभोक्ता नहीं है और इस आदेश के दायरे से पूरी तरह बाहर है।',
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
            निष्कर्ष: यह शुल्क डिस्कॉम के बाहर से बिजली खरीदने के फैसले के साथ आता है — यह कोई
            सामान्य टैरिफ बदलाव नहीं है।
          </p>
        </section>

        <section aria-labelledby="stranded" className="mt-10 scroll-mt-20">
          <h2 id="stranded" className={h2Cls}>
            &ldquo;स्ट्रैंडेड कैपेसिटी&rdquo; का असल मतलब
          </h2>
          <p className={pCls}>
            वितरण कंपनी जनरेशन क्षमता के लिए सालों पहले लंबी अवधि के अनुबंध करती है, उस मांग के
            हिसाब से जो उसे पूरी करनी है। वह उस क्षमता पर फिक्स्ड चार्ज चुकाती है, चाहे बिजली
            ली जाए या नहीं। जब कोई बड़ा उपभोक्ता ओपन एक्सेस पर चला जाता है, तो डिस्कॉम की बिक्री
            चली जाती है पर जिम्मेदारी बनी रहती है: वह अनुबंधित क्षमता का भुगतान करती रहती है, और
            उस उपभोक्ता के लौटने पर सप्लाई देने को तैयार भी रहना पड़ता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            जो क्षमता अनुबंधित है और जिसका भुगतान हो रहा है पर जो शेड्यूल नहीं हुई, उसे{' '}
            <strong>स्ट्रैंडेड</strong> कहा जाता है। एडिशनल सरचार्ज, बिजली अधिनियम, 2003 की धारा
            42(4) के तहत, उस स्ट्रैंडेड फिक्स्ड लागत के ओपन-एक्सेस से जुड़े हिस्से की वसूली का
            तरीका है, ताकि वह बोझ उन उपभोक्ताओं पर न पड़े जो डिस्कॉम के साथ बने रहे।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यह शुल्क उन फिक्स्ड लागतों के बारे में है जो उपभोक्ता के जाने पर खत्म नहीं
            होतीं — ओपन एक्सेस चुनने का दंड नहीं।
          </p>
        </section>

        <section aria-labelledby="calculation" className="mt-10 scroll-mt-20">
          <h2 id="calculation" className={h2Cls}>
            GERC ₹0.99 तक कैसे पहुंचा
          </h2>
          <p className={pCls}>
            आदेश के एक अनुलग्नक में पूरी श्रृंखला दी गई है। GUVNL के 1 अक्टूबर 2025 से 31 मार्च
            2026 के प्रमाणित डेटा के आधार पर:
          </p>
          <ol className="mt-3 space-y-3">
            {[
              [
                'उपलब्ध ऊर्जा से शुरुआत',
                'छह महीनों में 96,129 MU उपलब्ध थी, जिसमें से 63,110 MU सामान्य उपभोक्ताओं की ज़रूरत पूरी करने के लिए शेड्यूल हुई।',
              ],
              [
                'नेटवर्क हानि घटाएं',
                '12.06% T&D हानि लगाने पर 55,497 MU उन उपभोक्ताओं तक पहुंची। GERC ने 12.06% लिया — FY 2025-26 के लिए मंज़ूर मानक हानि — क्योंकि यह FY 2024-25 के 12.77% ट्रू-अप आंकड़े से कम है।',
              ],
              [
                'स्ट्रैंडेड जनरेशन निकालें',
                'उपलब्ध ऊर्जा में से शेड्यूल ऊर्जा घटाने पर 33,018 MU स्ट्रैंडेड जनरेशन बचती है।',
              ],
              [
                'स्ट्रैंडेड क्षमता की कीमत लगाएं',
                'GUVNL ने लंबी अवधि की अनुबंधित क्षमता पर ₹8,193 करोड़ फिक्स्ड लागत चुकाई; इसमें से स्ट्रैंडेड क्षमता से जुड़ा हिस्सा ₹2,814 करोड़ है।',
              ],
              [
                'ओपन एक्सेस का हिस्सा निकालें',
                'डिस्कॉम परिधि पर ओपन एक्सेस उपभोक्ताओं के लिए 1,630 MU शेड्यूल हुई, जिसे सीधे जुड़ा माना गया। बाकी को अनुपात में बांटने पर 895 MU और जुड़ती है, यानी कुल 2,525 MU ओपन एक्सेस से जुड़ी।',
              ],
              [
                'रुपये में बदलें',
                'उपलब्ध ऊर्जा की प्रति यूनिट ₹0.85 के हिसाब से, ओपन एक्सेस से जुड़ी स्ट्रैंडेड फिक्स्ड लागत ₹215 करोड़ बनती है।',
              ],
              [
                'पहले से वसूला गया घटाएं',
                'डिमांड चार्ज के ज़रिए ओपन एक्सेस उपभोक्ताओं से पहले ही ₹606 करोड़ वसूले जा चुके थे; उसका नेटवर्क-संबंधी हिस्सा, 8.77%, ₹53 करोड़ बनता है और घटा दिया जाता है — शेष ₹162 करोड़ वसूली योग्य।',
              ],
              [
                'भाग देकर दर निकालें',
                '₹162 करोड़ को 1,630 MU से भाग देने पर ₹0.99 प्रति kWh आता है। भाजक पर ध्यान दें: GERC ओपन एक्सेस से सीधे जुड़ी 1,630 MU से भाग देता है, व्यापक 2,525 MU से नहीं — उससे भाग देने पर करीब ₹0.64 आता।',
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

          <CostBand />

          <p className={takeawayCls}>
            निष्कर्ष: हर चरण आदेश के अनुलग्नक में प्रकाशित है, इसलिए कोई भी कारोबार दर को मान
            लेने की बजाय खुद मिलान कर सकता है।
          </p>
        </section>

        <section aria-labelledby="trend" className="mt-10 scroll-mt-20">
          <h2 id="trend" className={h2Cls}>
            पिछली अवधियों से तुलना
          </h2>
          <p className={pCls}>
            चूंकि दर हर छह महीने में बदलते डेटा विंडो से तय होती है, इसमें उल्लेखनीय उतार-चढ़ाव
            रहा है। नीचे के सभी आंकड़े GERC के अपने आदेशों से हैं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">अवधि</th>
                  <th className="px-4 py-2 font-semibold">GERC आदेश</th>
                  <th className="px-4 py-2 text-right font-semibold">एडिशनल सरचार्ज</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['1 अक्टू 2024 – 31 मार्च 2025', '07/2024', '₹0.93'],
                  ['1 अप्रैल 2025 – 30 सित 2025', '01/2025', '₹0.82'],
                  ['1 अक्टू 2025 – 31 मार्च 2026', '04/2025', '₹1.00'],
                  ['1 अप्रैल 2026 – 30 सित 2026', '02 of 2026', '₹0.76'],
                  ['1 अक्टू 2026 – 31 मार्च 2027', '05 of 2026', '₹0.99'],
                ].map(([p, o, r], i, arr) => (
                  <tr key={p} className={i === arr.length - 1 ? 'bg-brass/5' : undefined}>
                    <td className="px-4 py-2">{p}</td>
                    <td className="px-4 py-2 text-ash/70">{o}</td>
                    <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                      {r}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            पिछले तीन वर्षों में हर बार अक्टूबर–मार्च की छमाही में सरचार्ज अप्रैल–सितंबर से ऊंचा
            रहा है। आदेशों में इसका कोई कारण नहीं बताया गया, इसलिए इसे नियम मानने की बजाय एक
            देखा गया पैटर्न मानें जिसकी योजना बनाई जा सकती है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ओपन एक्सेस का अर्थशास्त्र आंकने वाले कारोबार को एक स्थिर आंकड़े की बजाय हर
            छह महीने बदलती दर का बजट बनाना चाहिए।
          </p>
        </section>

        <section aria-labelledby="charge-types" className="mt-10 scroll-mt-20">
          <h2 id="charge-types" className={h2Cls}>
            एडिशनल सरचार्ज बनाम क्रॉस-सब्सिडी सरचार्ज बनाम अन्य शुल्क
          </h2>
          <p className={pCls}>
            इन्हें अक्सर आपस में मिला दिया जाता है, जबकि ये अलग कानूनी आधार वाले अलग शुल्क हैं:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">शुल्क</th>
                  <th className="px-4 py-2 font-semibold">आधार</th>
                  <th className="px-4 py-2 font-semibold">किसकी भरपाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">एडिशनल सरचार्ज</td>
                  <td className="px-4 py-2 text-ash/70">धारा 42(4)</td>
                  <td className="px-4 py-2">सप्लाई की जारी जिम्मेदारी से बनी डिस्कॉम की स्ट्रैंडेड फिक्स्ड लागत</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">क्रॉस-सब्सिडी सरचार्ज (CSS)</td>
                  <td className="px-4 py-2 text-ash/70">धारा 42(2)</td>
                  <td className="px-4 py-2">सब्सिडी देने वाला उपभोक्ता जाने पर डिस्कॉम को होने वाला क्रॉस-सब्सिडी नुकसान</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">ट्रांसमिशन व व्हीलिंग चार्ज</td>
                  <td className="px-4 py-2 text-ash/70">ओपन एक्सेस नियम</td>
                  <td className="px-4 py-2">बिजली पहुंचाने के लिए ट्रांसमिशन और वितरण नेटवर्क का उपयोग</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">स्टैंडबाय चार्ज</td>
                  <td className="px-4 py-2 text-ash/70">ओपन एक्सेस नियम</td>
                  <td className="px-4 py-2">बैकअप के रूप में डिस्कॉम सप्लाई उपलब्ध रखना</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            ट्रांसमिशन और व्हीलिंग चार्ज आम घरेलू बिल तक कैसे पहुंचते हैं, इसके लिए हमारी गाइड{' '}
            <Link href="/hi/blog/transmission-distribution-costs-electricity-bill-india" className="text-brass underline">
              ट्रांसमिशन और डिस्ट्रीब्यूशन की लागत
            </Link>{' '}
            देखें।
          </p>
          <p className={`mt-3 ${pCls}`}>
            पात्रता भी अलग है। बिजली अधिनियम ओपन एक्सेस के लिए 1 MW अनुबंधित मांग या स्वीकृत लोड
            तय करता है; इलेक्ट्रिसिटी (प्रमोटिंग रिन्यूएबल एनर्जी थ्रू ग्रीन एनर्जी ओपन एक्सेस)
            रूल्स, 2022 ने ग्रीन एनर्जी ओपन एक्सेस के लिए इसे 100 kW कर दिया, और कैप्टिव
            उपभोक्ताओं के लिए कोई न्यूनतम नहीं रखा। वही रूल्स यह भी कहते हैं कि वेस्ट-टू-एनर्जी,
            ग्रीन हाइड्रोजन व ग्रीन अमोनिया उत्पादन, और पहले से फिक्स्ड चार्ज चुका रहे उपभोक्ताओं
            पर एडिशनल सरचार्ज लागू नहीं होता — हालांकि रूल्स में &ldquo;फिक्स्ड चार्ज&rdquo;
            परिभाषित नहीं है। ये केंद्रीय नियम हैं; इस GERC आदेश में अपनी कोई छूट दर्ज नहीं है,
            और गुजरात में GERC इन्हें कैसे लागू करता है यह हमने सत्यापित नहीं किया।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ₹0.99/kWh कई शुल्कों में से एक है — सिर्फ इस आंकड़े की नहीं, कुल डिलीवर्ड
            लागत की तुलना करें।
          </p>
        </section>

        <section aria-labelledby="what-it-means" className="mt-10 scroll-mt-20">
          <h2 id="what-it-means" className={h2Cls}>
            ओपन एक्सेस पर विचार कर रहे हैं तो इसका क्या मतलब है
          </h2>
          <p className={pCls}>
            व्यावहारिक असर यह है कि छह महीने के लिए ओपन एक्सेस बिजली की डिलीवर्ड लागत में एक तय,
            दिनांकित बढ़ोतरी जुड़ती है। एक उदाहरण, किसी वास्तविक उपभोक्ता का नहीं बल्कि गोल
            आंकड़े पर:
          </p>
          <div className="mt-4 rounded-xl border border-l-4 border-hairline border-l-brass bg-paper p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              सिर्फ उदाहरण
            </p>
            <p className={`mt-2 ${pCls}`}>
              ओपन एक्सेस से <strong>महीने में 1,00,000 यूनिट</strong> लेने वाला संयंत्र ₹0.99/kWh
              पर <strong>हर महीने ₹99,000</strong> अतिरिक्त चुकाएगा — यानी 1 अक्टूबर 2026 से 31
              मार्च 2027 की पूरी अवधि में करीब <strong>₹5.94 लाख</strong>।
            </p>
            <p className="mt-2 text-xs text-ash/50">
              यह अधिसूचित दर पर की गई गणना है, कोई कोटेशन नहीं। आपकी असल स्थिति आपकी अनुबंधित
              मांग, ऊपर बताए अन्य ओपन एक्सेस शुल्कों और आपकी टैरिफ श्रेणी पर निर्भर करेगी।
            </p>
          </div>
          <p className={`mt-4 ${pCls}`}>
            चूंकि दर 1 अप्रैल 2027 को नए डेटा विंडो से दोबारा तय होगी, आज लिया गया खरीद निर्णय
            किसी एक आंकड़े की बजाय एक दायरे पर परखा जाना चाहिए — पिछली पांच गणनाएं ₹0.76 से
            ₹1.00 के बीच रही हैं।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: ईमानदार तुलना यही है — सभी सरचार्ज मिलाकर ओपन एक्सेस की डिलीवर्ड लागत बनाम
            उसी अवधि का आपका डिस्कॉम टैरिफ।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े टूल और गाइड
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/hi/electricity/gujarat-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                गुजरात बिजली बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                असली प्रकाशित टैरिफ पर गुजरात का बिल अनुमानित करें।
              </p>
            </Link>
            <Link
              href="/solar/bill-calculator/mgvcl"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                गुजरात सोलर बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                गुजरात की अपनी टैरिफ पर रूफटॉप सोलर पेबैक।
              </p>
            </Link>
            <Link
              href="/hi/news/gerc-liquidated-damages-wind-solar-gujarat"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ⚖️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                GERC विंड और सोलर LD विवाद
              </p>
              <p className="mt-1 text-xs text-ash/60">
                GUVNL और रिन्यूएबल डेवलपर्स से जुड़ा एक और सक्रिय GERC मामला।
              </p>
            </Link>
            <Link
              href="/hi/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">सोलर ROI कैलकुलेटर</p>
              <p className="mt-1 text-xs text-ash/60">
                विकल्प तौल रहे हैं तो अपने डिस्कॉम की टैरिफ पर पेबैक देखें।
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
          आखिरी अपडेट: {LAST_UPDATED}। आंकड़े GERC के अपने{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3NjVfMTEtMDktMjAyNl8zMTgwNzg5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            आदेश क्रमांक 05 of 2026
          </a>{' '}
          ({ORDER_DATE}) और उसके अनुलग्नक A से लिए गए हैं, तथा पिछली दरें उन-उन अवधियों के GERC
          आदेशों से; हमने पूरी गणना दोबारा की और वह राउंडिंग के भीतर मिलती है। इसे{' '}
          <a
            href="https://energetica-india.net/news/gujarat-sets-additional-surcharge-at-inr-0-99-per-kwh-for-open-access-consumers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Energetica India
          </a>{' '}
          ने भी रिपोर्ट किया। ध्यान दें कि आदेश {ORDER_DATE} का है; ट्रेड कवरेज में दिखने वाली
          बाद की तारीखें प्रकाशन तिथियां हैं। गुजरात का मौजूदा क्रॉस-सब्सिडी सरचार्ज हर डिस्कॉम
          के वार्षिक टैरिफ आदेश के भीतर तय होता है, अलग से प्रकाशित आंकड़े के रूप में नहीं,
          इसलिए यहां कोई CSS आंकड़ा नहीं दिया गया। यह संदर्भ के लिए सामान्य जानकारी है, टैरिफ
          या कानूनी सलाह नहीं — अपने शुल्क अपनी डिस्कॉम से पुष्ट करें। हम आंकड़े कैसे जुटाते और
          वेरिफाई करते हैं, इसके लिए हमारी{' '}
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
