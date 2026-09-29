import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/kerala-power-shortage-september-2026'
const TITLE = 'केरल की बिजली किल्लत: इसका आपके KSEB बिल पर क्या असर है'
const DESCRIPTION =
  'केरल में लगातार तीन दिन बिजली कटौती नहीं हुई, लेकिन KSEB का कहना है कि किल्लत अभी खत्म नहीं हुई। जानिए ऐसा क्यों हुआ, आंकड़े असल में क्या बताते हैं, और यह आपके बिल में क्या जोड़ता है।'
const LAST_UPDATED = '29 सितंबर 2026'
const DATA_AS_OF = '27 सितंबर 2026'

export const metadata: Metadata = {
  title: 'केरल बिजली किल्लत 2026: आपके KSEB बिल पर असर',
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

const newsArticleLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    '@type': 'Organization',
    name: 'DesiMetrics Editorial Team',
    url: `${SITE}/author/editorial-team`,
  },
  publisher: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  datePublished: '2026-09-29',
  dateModified: '2026-09-29',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'क्या अभी केरल में बिजली कटौती हो रही है?',
    a: '28 सितंबर 2026 तक KSEB ने लगातार तीन दिन कोई शेड्यूल्ड बिजली कटौती नहीं की। लेकिन KSEB खुद कहता है कि असली किल्लत अभी हल नहीं हुई है, और मांग बढ़ने या सप्लाई घटने पर कम-से-कम 15 अक्टूबर 2026 तक कभी भी कटौती लौट सकती है।',
  },
  {
    q: 'केरल में बिजली की किल्लत क्यों है?',
    a: 'एक साथ कई वजहें असर डाल रही हैं: देश के बाकी हिस्सों में भारी मानसून बारिश से थर्मल पावर प्लांट्स का कोयला गीला हो गया है, जिससे केरल नेशनल ग्रिड से जितनी बिजली आमतौर पर आयात करता है वह कम हो गई है; सितंबर में सामान्य से ज्यादा तापमान से मांग बढ़ी; और केरल के अपने हाइडल रिज़र्वॉयर कमज़ोर मानसून के बाद पिछले साल के मुकाबले काफी नीचे हैं।',
  },
  {
    q: 'अभी केरल की कितनी बिजली आयात की जा रही है?',
    a: '27 सितंबर 2026 को केरल ने 8.465 करोड़ यूनिट (84.65 मिलियन यूनिट) बिजली खर्च की। इसमें से सिर्फ 9.63 मिलियन यूनिट राज्य के अंदर पैदा हुई — बाकी 75.01 मिलियन यूनिट, यानी उस दिन की मांग का करीब 89%, नेशनल ग्रिड से आयात की गई।',
  },
  {
    q: 'KSEB फ्यूल सरचार्ज क्या है, और अक्टूबर 2026 के लिए यह कितना है?',
    a: 'फ्यूल सरचार्ज एक मासिक चार्ज है जिसे KSERC, KSEB को बिल में जोड़ने की अनुमति देता है — यह राज्य के बाहर से बिजली खरीदने की अतिरिक्त लागत की भरपाई करता है, जो बेस टैरिफ में शामिल नहीं होती। अक्टूबर 2026 के लिए यह 3 पैसे प्रति यूनिट रिपोर्ट हुआ है, जो अगस्त की करीब ₹6.88 करोड़ अतिरिक्त खरीद लागत की भरपाई करता है। KSERC के टैरिफ नियमों के तहत यह अधिकतम 10 पैसे प्रति यूनिट तक सीमित है।',
  },
  {
    q: 'क्या DesiMetrics का KSEB बिल कैलकुलेटर फ्यूल सरचार्ज शामिल करता है?',
    a: 'नहीं — हमारा KSEB बिल कैलकुलेटर टेलिस्कोपिक स्लैब दरों, फिक्स्ड चार्ज और इलेक्ट्रिसिटी ड्यूटी से बेस बिल का अनुमान लगाता है। फ्यूल सरचार्ज एक अलग, हर महीने बदलने वाला चार्ज है जिसे KSERC तय करता है और यह अभी कैलकुलेटर में शामिल नहीं है — सरचार्ज वाले महीने में आपका असली KSEB बिल कैलकुलेटर के अनुमान से थोड़ा ज्यादा आएगा।',
  },
  {
    q: 'केरल की बिजली किल्लत कब खत्म होगी?',
    a: 'KSEB ने 15 अक्टूबर 2026 से 450 MW की स्थायी सप्लाई की व्यवस्था की है — मध्य प्रदेश से 250 MW और बिहार से 200 MW — और उम्मीद है कि इसके शुरू होते ही सप्लाई स्थिर हो जाएगी। तब तक, राज्य कम अवधि की खरीद पर निर्भर है।',
  },
  {
    q: '15 अक्टूबर तक बिजली कटौती रोकने के लिए केरल क्या कर रहा है?',
    a: '15 अक्टूबर की व्यवस्था से अलग, KSEB कम समय के नोटिस पर भी बिजली खरीद रहा है — जिसमें पीक आवर्स (शाम 6 बजे से रात 12 बजे) के लिए ₹11 प्रति यूनिट पर 200 MW की एक रिपोर्ट की गई डील शामिल है, जो 31 अक्टूबर 2026 तक वैध है और KSERC की मंज़ूरी लंबित बताई गई है। ये दोनों अलग-अलग व्यवस्थाएं हैं, एक ही डील नहीं।',
  },
  {
    q: 'केरल के हाइडल रिज़र्वॉयर अभी कितने नीचे हैं?',
    a: '27 सितंबर 2026 को केरल के हाइडल रिज़र्वॉयर में 2,564.41 मिलियन यूनिट के बराबर स्टोर्ड एनर्जी थी, यानी कुल क्षमता का 62% — जो 2025 की इसी तारीख (3,233.44 मिलियन यूनिट) से 669.03 मिलियन यूनिट कम है। सितंबर में रिज़र्वॉयर में कुल 397.42 मिलियन यूनिट का इनफ्लो आया।',
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

function SupplyBand({
  label,
  segments,
}: {
  label: string
  segments: { name: string; value: number; unit: string; shade: string }[]
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">{label}</p>
      <div
        className="mt-2 flex h-14 w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-hairline"
        role="group"
        aria-label={label}
      >
        {segments.map((s) => {
          const pct = (s.value / total) * 100
          return (
            <div
              key={s.name}
              style={{ width: `${pct}%` }}
              className={`flex flex-col items-center justify-center gap-0.5 px-1 text-center ${s.shade}`}
            >
              {pct > 10 && (
                <span className="text-[10px] font-medium tracking-wide text-white/80">
                  {s.name}
                </span>
              )}
              <span className="font-display text-sm font-bold tabular-nums text-white">
                {Math.round(pct)}%
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ash/60">
        {segments.map((s) => (
          <span key={s.name}>
            <span className="font-semibold text-ink-navy">{s.name}:</span>{' '}
            {s.value.toLocaleString('en-IN')} {s.unit}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function KeralaPowerShortagePageHi() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'न्यूज़', href: '/hi/news' },
          { label: 'केरल बिजली किल्लत', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> केरल · KSEB
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '✅', big: '3 दिन', small: 'कटौती नहीं (28 सितंबर तक)', tone: 'hub' },
          { icon: '⚡', big: '89%', small: 'आयातित बिजली, 27 सितंबर', tone: 'hub' },
          { icon: '💰', big: '3 पैसे/यूनिट', small: 'अक्टूबर फ्यूल सरचार्ज', tone: 'caution-amber' },
          { icon: '📅', big: '15 अक्टूबर', small: 'अगला सप्लाई चेकपॉइंट', tone: 'hub' },
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
          <strong>केरल में लगातार तीन दिन बिजली कटौती नहीं हुई</strong>, 28 सितंबर 2026
          तक — मुश्किल सितंबर के बाद यह सच में राहत की बात है। लेकिन KSEB ने किल्लत को
          खत्म नहीं बताया है: राज्य बिजली बोर्ड के अधिकारियों का कहना है कि कम-से-कम{' '}
          <strong>15 अक्टूबर 2026</strong> तक कभी भी कटौती लौट सकती है, जब तक एक बड़ी,
          स्थायी सप्लाई व्यवस्था शुरू नहीं होती। KSEB उपभोक्ताओं के लिए तुरंत असर बिजली
          कटौती नहीं है — यह आपके बिल में एक छोटा-सा इज़ाफा है, जिसे यह लेख विस्तार से
          समझाता है।
        </p>

        <section aria-labelledby="what-happened" className="mt-10 scroll-mt-20">
          <h2 id="what-happened" className={h2Cls}>
            इस हफ्ते केरल की बिजली सप्लाई में क्या हुआ?
          </h2>
          <p className={pCls}>
            राष्ट्रीय स्तर पर बिजली उपलब्धता में मामूली सुधार और केरल की अपनी मांग में
            हल्की गिरावट की मदद से KSEB ने लगातार तीन दिन शेड्यूल्ड बिजली कटौती नहीं
            की। सितंबर की शुरुआत के मुकाबले यह वाकई बदलाव है, जब राज्य की कमी बढ़ने के
            साथ कई दिन कटौती लागू की गई थी। लेकिन इसका मतलब यह नहीं कि मूल किल्लत हल
            हो गई है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            KSEB का अपना आकलन, तीन-दिन के अपडेट के साथ रिपोर्ट हुआ, यह है कि मांग बढ़ने
            या उपलब्ध सप्लाई घटने पर कटौती लौट सकती है — और यह जोखिम कम-से-कम 15
            अक्टूबर 2026 तक बना रहेगा, जब एक बड़ी बिजली-खरीद व्यवस्था शुरू होने वाली है
            (नीचे{' '}
            <Link href="#what-to-watch" className="text-brass underline">
              आगे क्या देखना है
            </Link>{' '}
            देखें)।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: तीन दिन बिना कटौती के सच में राहत है, हल नहीं — KSEB इसे अभी भी
            सक्रिय किल्लत बता रहा है।
          </p>
        </section>

        <section aria-labelledby="why" className="mt-10 scroll-mt-20">
          <h2 id="why" className={h2Cls}>
            केरल में बिजली की किल्लत क्यों है?
          </h2>
          <p className={pCls}>
            कोई एक वजह इस किल्लत को पूरी तरह नहीं बताती — कई कारण एक साथ असर डाल रहे
            हैं:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'गीला कोयला, देश भर में थर्मल बिजली कम',
                'कोयला उत्पादक राज्यों में भारी मानसून बारिश से थर्मल पावर प्लांट्स का कोयला गीला हो गया है, जिससे केरल आमतौर पर नेशनल ग्रिड से जितनी अतिरिक्त बिजली आयात करता है वह कम हो गई है।',
              ],
              [
                'सामान्य से गर्म सितंबर',
                'पूरे महीने सामान्य से ज्यादा तापमान ने केरल की अपनी बिजली मांग को एक सामान्य सितंबर के मुकाबले ज्यादा बढ़ा दिया।',
              ],
              [
                'पिछले साल से काफी नीचे रिज़र्वॉयर',
                'केरल के हाइडल रिज़र्वॉयर — राज्य के अपने प्रमुख जनरेशन स्रोत — में 2025 की इसी तारीख के मुकाबले काफी कम पानी स्टोर है, कमज़ोर मानसून इनफ्लो के बाद (नीचे आंकड़े देखें)।',
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
            निष्कर्ष: यह किल्लत कई दिशाओं से एक साथ आई सप्लाई-डिमांड की खींचतान है, किसी
            एक पहचानी गई गड़बड़ी से नहीं — इसीलिए किसी एक कारण के सुधरते ही यह खत्म नहीं
            होती।
          </p>
        </section>

        <section aria-labelledby="numbers" className="mt-10 scroll-mt-20">
          <h2 id="numbers" className={h2Cls}>
            केरल असल में कितनी बिजली की कमी झेल रहा है? आंकड़े समझें
          </h2>
          <p className={pCls}>
            <strong>27 सितंबर 2026</strong> को केरल ने <strong>84.65 मिलियन यूनिट</strong>{' '}
            बिजली खर्च की — यानी 8.47 करोड़ यूनिट, उस पैमाने में जो भारतीय पाठकों के
            लिए ज्यादा सहज है। इसमें से बहुत छोटा हिस्सा राज्य के अंदर पैदा हुआ, जैसा{' '}
            <a
              href="https://timesofindia.indiatimes.com/city/thiruvananthapuram/kseb-avoids-power-restrictions-for-three-days-crisis-persists/articleshow/134544878.cms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              The Times of India ने रिपोर्ट किया
            </a>
            :
          </p>

          <SupplyBand
            label="27 सितंबर 2026 — केरल की बिजली कहां से आई"
            segments={[
              { name: 'केरल में पैदा हुई', value: 9.63, unit: 'MU', shade: 'bg-hub-news' },
              { name: 'आयातित', value: 75.01, unit: 'MU', shade: 'bg-hub-news/50' },
            ]}
          />

          <p className={`mt-4 ${pCls}`}>
            उस दिन केरल में पैदा हुई 9.63 मिलियन यूनिट में से हाइडल स्टेशनों ने करीब
            6.84 मिलियन यूनिट और स्वतंत्र बिजली उत्पादकों (IPP) ने 2.73 मिलियन यूनिट
            दी। ये दोनों आंकड़े जोड़ने पर रिपोर्ट किए गए 9.63 मिलियन यूनिट के कुल से
            थोड़ा कम बैठते हैं — यह मूल रिपोर्टिंग में एक छोटा-सा राउंडिंग गैप है, कोई
            तीसरा अनकहा स्रोत नहीं।
          </p>

          <p className={`mt-4 ${pCls}`}>
            यही पैटर्न पूरे महीने में भी दिखता है, सिर्फ एक दिन में नहीं। 1 से 27 सितंबर
            के बीच, केरल ने राज्य के अंदर <strong>623.91 मिलियन यूनिट</strong> (62.4
            करोड़ यूनिट) पैदा की, जबकि <strong>2,531.73 मिलियन यूनिट</strong> (253.2
            करोड़ यूनिट) खर्च हुई — यानी इन 27 दिनों में{' '}
            <strong>1,907.82 मिलियन यूनिट</strong> आयात करनी पड़ी। यह औसतन प्रतिदिन
            23.11 मिलियन यूनिट राज्य के अंदर पैदा होने और 93.77 मिलियन यूनिट खर्च होने
            के बराबर है।
          </p>

          <SupplyBand
            label="1–27 सितंबर 2026 — कुल जनरेशन बनाम खपत"
            segments={[
              { name: 'केरल में पैदा हुई', value: 623.91, unit: 'MU', shade: 'bg-hub-news' },
              { name: 'आयातित', value: 1907.82, unit: 'MU', shade: 'bg-hub-news/50' },
            ]}
          />

          <p className={`mt-4 ${pCls}`}>
            केरल के हाइडल रिज़र्वॉयर — जो राज्य के अंदर होने वाली ज्यादातर जनरेशन का
            स्रोत हैं — भी यही कहानी बताते हैं। 27 सितंबर 2026 को रिज़र्वॉयर में{' '}
            <strong>2,564.41 मिलियन यूनिट</strong> के बराबर स्टोर्ड एनर्जी थी, यानी कुल
            क्षमता का 62%। यह 2025 की इसी तारीख (3,233.44 मिलियन यूनिट) से{' '}
            <strong>669.03 मिलियन यूनिट कम</strong> है — यह अंतर सिर्फ ज्यादा मांग नहीं,
            बल्कि कमज़ोर मानसून को भी दिखाता है। सितंबर भर में रिज़र्वॉयर में कुल
            इनफ्लो 397.42 मिलियन यूनिट रहा, जो जनरेशन के लिए निकाली गई मात्रा से काफी
            कम है। महीने की शुरुआत की स्वतंत्र रिपोर्टिंग भी यही पैटर्न दिखाती है — 14
            सितंबर 2026 को रिज़र्वॉयर एक साल पहले के 78.96% के मुकाबले करीब इतनी ही,
            62.34% क्षमता पर थे।
          </p>

          <p className={takeawayCls}>
            निष्कर्ष: केरल की कमी मामूली नहीं है — सितंबर के ज्यादातर दिनों में, राज्य
            की करीब तीन-चौथाई या उससे ज्यादा बिजली आयात करनी पड़ी है, क्योंकि राज्य के
            अंदर हाइडल जनरेशन पिछले साल इन्हीं रिज़र्वॉयर के सहारे जितनी होती थी, उससे
            काफी नीचे चल रही है।
          </p>
        </section>

        <section aria-labelledby="bill-impact" className="mt-10 scroll-mt-20">
          <h2 id="bill-impact" className={h2Cls}>
            इसका आपके KSEB बिल पर क्या असर है?
          </h2>
          <p className={pCls}>
            कम नोटिस पर ज्यादातर बिजली आयात करना KSEB के लिए सामान्य लंबी-अवधि के
            कॉन्ट्रैक्ट से बिजली पैदा करने या खरीदने से ज्यादा महंगा पड़ता है — और
            KSERC के टैरिफ नियम KSEB को इस अतिरिक्त लागत का एक हिस्सा उपभोक्ताओं तक
            पहुंचाने की अनुमति देते हैं, एक <strong>मासिक फ्यूल सरचार्ज</strong> के
            ज़रिए, जो आपके बेस बिजली बिल से अलग है। KSEB ने अक्टूबर 2026 के लिए{' '}
            <strong>3 पैसे प्रति यूनिट</strong> का फ्यूल सरचार्ज कन्फर्म किया है, जो
            अगस्त 2026 की करीब ₹6.88 करोड़ अतिरिक्त बिजली-खरीद लागत की भरपाई करता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            यह सरचार्ज असीमित नहीं है। KSERC के टैरिफ निर्धारण नियमों (2023 में संशोधित)
            के तहत, फ्यूल सरचार्ज किसी भी महीने में अधिकतम{' '}
            <strong>10 पैसे प्रति यूनिट</strong> तक सीमित है, और बची हुई राशि एक साथ
            जोड़ने की बजाय छह महीने तक आगे बढ़ाई जा सकती है। अक्टूबर की रिपोर्ट हुई 3
            पैसे/यूनिट दर इस सीमा से काफी नीचे है। भारतीय बिजली बिल के बाकी फिक्स्ड और
            वेरिएबल हिस्सों के बारे में जानने के लिए हमारा{' '}
            <Link href="/hi/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्ज बनाम FCA
            </Link>{' '}
            एक्सप्लेनर देखें।
          </p>
          <p className={`mt-3 ${pCls}`}>
            हमारे टूल इस्तेमाल करने वालों के लिए एक ज़रूरी बात: हमारा{' '}
            <Link href="/hi/electricity/kseb-bill-calculator" className="text-brass underline">
              KSEB बिल कैलकुलेटर
            </Link>{' '}
            केरल की टेलिस्कोपिक स्लैब दरों, फिक्स्ड चार्ज और इलेक्ट्रिसिटी ड्यूटी से
            आपके बेस बिल का अनुमान लगाता है — इसमें अभी मासिक फ्यूल सरचार्ज शामिल नहीं
            है, क्योंकि यह दर हर महीने अलग से बदलती है। कैलकुलेटर के अनुमान को अपना बेस
            बिल मानें, और सरचार्ज वाले महीने में अपने असली KSEB बिल के थोड़ा ज्यादा आने
            की उम्मीद रखें।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: इस किल्लत का सीधा खर्च आप पर बिजली कटौती का जोखिम नहीं, बल्कि एक
            छोटा, सीमित, मासिक सरचार्ज है, आपके सामान्य बिल के ऊपर — जानना ज़रूरी है,
            घबराने की बात नहीं।
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            क्या किया जा रहा है, और 15 अक्टूबर तक क्या देखना है?
          </h2>
          <p className={pCls}>
            दो अलग-अलग बिजली-खरीद व्यवस्थाएं अलग-अलग समय-सीमा पर चल रही हैं — इन्हें एक
            डील मानने की बजाय अलग रखना बेहतर है:
          </p>
          <ol className="mt-3 space-y-3">
            {[
              [
                'स्थायी समाधान — 15 अक्टूबर से 450 MW',
                'KSEB ने 15 अक्टूबर 2026 से शुरू होने वाली 450 MW सप्लाई की व्यवस्था की है — मध्य प्रदेश से 250 MW और बिहार से 200 MW। KSEB जब सप्लाई स्थिर होने की बात करता है, तो यही व्यवस्था इशारा है; इसके शुरू होने तक राज्य कम-अवधि की खरीद पर टिका है।',
              ],
              [
                'कम-अवधि का पुल — 200 MW की पीक-आवर खरीद',
                '15 अक्टूबर की व्यवस्था से अलग, KSEB पीक-आवर मांग पूरी करने के लिए कम नोटिस पर भी बिजली खरीद रहा है — जिसमें शाम 6 बजे से रात 12 बजे तक के लिए ₹11 प्रति यूनिट पर 200 MW की एक रिपोर्ट की गई डील शामिल है, जो 31 अक्टूबर 2026 तक वैध है और KSERC की मंज़ूरी लंबित बताई गई है। यह 15 अक्टूबर से शुरू होने वाली स्थायी सप्लाई तक का अंतर भरता है — यह वही 450 MW व्यवस्था नहीं है।',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-news font-display text-xs font-bold text-white">
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ol>
          <p className={`mt-3 ${pCls}`}>
            15 अक्टूबर तक देखने लायक असली संकेत सीधा है: जब तक केरल रोज़ाना शेड्यूल्ड
            कटौती से बचता रहता है, कम-अवधि की खरीद काम कर रही है। कटौती का लौटना यह
            संकेत होगा कि इनमें से कोई पुल-व्यवस्था मांग पूरी नहीं कर पाई।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: असली समाधान 15 अक्टूबर के लिए तय है — उससे पहले जो कुछ भी है वह
            एक अस्थायी पुल है, हल नहीं।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            जुड़े टूल और गाइड
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hi/electricity/kseb-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">KSEB बिल कैलकुलेटर</p>
              <p className="mt-1 text-xs text-ash/60">
                केरल के बेस बिजली बिल का टेलिस्कोपिक स्लैब से अनुमान लगाएं।
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
                फिक्स्ड चार्ज बनाम FCA समझाया गया
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इस्तेमाल न बदलने पर भी आपका बिजली बिल क्यों बदलता है।
              </p>
            </Link>
            <Link
              href="/hi/blog/kseb-complete-guide-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📘
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                KSEB बिजली बिल की पूरी गाइड
              </p>
              <p className="mt-1 text-xs text-ash/60">
                स्लैब, 250-यूनिट की सीमा, बिलिंग साइकल और बिल कैसे चुकाएं।
              </p>
            </Link>
            <Link
              href="/hi/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">सोलर ROI कैलकुलेटर</p>
              <p className="mt-1 text-xs text-ash/60">
                देखें रूफटॉप सोलर से ग्रिड की किल्लत का असर कैसे कम होता है।
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
          आखिरी अपडेट: {LAST_UPDATED}। दिन-वार और सितंबर के कुल आंकड़े {DATA_AS_OF} के
          लिए रिपोर्ट किए गए हैं और DesiMetrics द्वारा रोज़ स्वतंत्र रूप से दोबारा
          वेरिफाई नहीं किए जाते — इन्हें एक तेज़ी से बदलती स्थिति की तारीख-वार झलक
          मानें, लाइव फीड नहीं। तीन दिन बिना कटौती वाला तथ्य 28 सितंबर 2026 तक केरल के
          एक से ज्यादा न्यूज़ स्रोतों से स्वतंत्र रूप से पुष्टि हुआ है। अक्टूबर फ्यूल
          सरचार्ज दर अभी सिर्फ एक स्रोत से रिपोर्ट हुई है; योजना बनाने से पहले अपने बिल
          या KSEB के आधिकारिक फ्यूल-सरचार्ज नोटिस पर सटीक आंकड़ा कन्फर्म करें। हम
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
