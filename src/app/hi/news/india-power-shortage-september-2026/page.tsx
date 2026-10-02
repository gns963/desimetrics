import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/india-power-shortage-september-2026'
const TITLE = 'भारत की बिजली किल्लत 3 साल के उच्चतम स्तर पर: वजह क्या है, और क्या इसका असर आपके बिल पर पड़ेगा?'
const DESCRIPTION =
  'सितंबर में बिजली की किल्लत पिछले तीन साल में सबसे ज्यादा रही, जबकि कोयले से बिजली उत्पादन लगातार छठे महीने बढ़ा। जानिए आंकड़े असल में क्या बताते हैं, ऐसा क्यों हुआ, और यह आपके बिल तक कैसे पहुंच सकता है।'
const LAST_UPDATED = '2 अक्टूबर 2026'
const DATA_AS_OF = 'सितंबर 2026'

export const metadata: Metadata = {
  title: 'भारत बिजली किल्लत सितंबर 2026: 3 साल का उच्चतम स्तर समझाया गया',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'article', locale: 'hi_IN' },
  robots: { index: false, follow: true },
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
  datePublished: '2026-10-02',
  dateModified: '2026-10-02',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'क्या भारत में देशव्यापी ब्लैकआउट हो रहा है?',
    a: 'नहीं। यहां &quot;किल्लत&quot; का मतलब है energy not supplied (ENS) — मांग और ग्रिड द्वारा असल में दी जा सकी बिजली के बीच का अंतर, जिसे आमतौर पर पीक आवर्स में छोटी, स्थानीय लोड-शेडिंग से संभाला जाता है, न कि पूरे देश में एक जैसी कटौती से। सितंबर 2026 की किल्लत कुल उत्पादन के एक प्रतिशत से भी कम हिस्से के बराबर थी, पूरे ग्रिड की विफलता नहीं।',
  },
  {
    q: 'सितंबर 2026 में भारत में बिजली की कमी कितनी रही?',
    a: 'रॉयटर्स ने महीने भर की किल्लत करीब 560 मिलियन यूनिट (MU) आंकी है — अगस्त 2023 के बाद सबसे ज्यादा, यानी तीन साल का उच्चतम स्तर। उसी Grid-India डेटा पर आधारित एक अन्य स्रोत ने 544 मिलियन यूनिट का करीबी लेकिन अलग आंकड़ा बताया है। इसे एक सटीक संख्या के बजाय &quot;लगभग 550-560 मिलियन यूनिट&quot; मानें — यह छोटा फर्क शायद इस बात से आता है कि हर हिसाब में मांग की कौन-सी समयावधि गिनी गई है।',
  },
  {
    q: 'कोयले से बिजली उत्पादन बढ़ने के बावजूद किल्लत क्यों है?',
    a: 'कई दबाव एक साथ पड़े: एक कमजोर मानसून (भारत का बीते एक दशक से ज्यादा में सबसे कमजोर) ने लगातार पांचवें महीने हाइड्रो बिजली उत्पादन घटाया; इस कमजोर मानसून और सामान्य से ज्यादा मांग के पीछे सक्रिय अल नीनो पैटर्न का हाथ बताया जा रहा है; औद्योगिक और कूलिंग मांग मजबूत बनी रही, और पीक मांग रिकॉर्ड 269 GW तक पहुंची; भारत के पास अभी भी इतना बड़ा बैटरी स्टोरेज नहीं है कि दिन की अतिरिक्त सोलर बिजली को शाम की पीक मांग के लिए बचाया जा सके; और कुल कोयला जलाना बढ़ने के बावजूद कई पावर प्लांट बेहद कम कोयला स्टॉक पर चल रहे थे, कुछ प्लांट रखरखाव के लिए बंद भी थे।',
  },
  {
    q: 'क्या सितंबर 2026 में नवीकरणीय ऊर्जा (रिन्यूएबल) का उत्पादन असल में घटा?',
    a: 'नहीं — रिन्यूएबल बिजली उत्पादन साल-दर-साल 25.1% बढ़कर 29.62 बिलियन यूनिट हो गया, यह असली वृद्धि है। लेकिन कुल उत्पादन और कोयला-आधारित उत्पादन दोनों इससे तेज़ी से बढ़े, इसलिए कुल मिश्रण में रिन्यूएबल का हिस्सा घटकर करीब 17% रह गया, जो अगस्त में लगभग 19.5% था। ज्यादा साफ बिजली बनी, बस एक बड़े, कोयला-भारी कुल मिश्रण में उसका हिस्सा छोटा हो गया।',
  },
  {
    q: 'क्या कोयला पावर प्लांटों का कोयला असल में खत्म हो रहा है?',
    a: 'एक बड़ा हिस्सा बेहद कम स्तर पर था, पूरी तरह खत्म नहीं। कई रिपोर्टों में सरकारी आंकड़ों के हवाले से बताया गया है कि सितंबर के आखिर में करीब 190 में से 80 से ज्यादा निगरानी वाले कोयला प्लांटों के पास तय स्टॉक स्तर का 25% से भी कम कोयला था, और राष्ट्रीय कोयला भंडार अपने सामान्य स्तर के करीब 39% तक गिर गया — यानी 19 दिन के मानक के मुकाबले करीब एक हफ्ते का ही स्टॉक। सरकार ने सितंबर के आखिरी हफ्ते में इलेक्ट्रिसिटी एक्ट की धारा 11 लागू करते हुए 112 कैप्टिव कोयला प्लांटों को 1 अक्टूबर से 31 दिसंबर 2026 तक अधिकतम क्षमता पर चलाने का निर्देश दिया। कोयला मंत्रालय का सार्वजनिक रुख यह है कि कोयले की आपूर्ति खुद पर्याप्त है और यह उत्पादन की नहीं, बल्कि लॉजिस्टिक्स की समस्या है।',
  },
  {
    q: 'क्या इसका संबंध अल नीनो से है?',
    a: 'हां। NOAA और IMD दोनों ने इस अवधि के लिए सक्रिय अल नीनो एडवाइज़री जारी की है, और इसे ही 2026 के कमजोर मानसून (लॉन्ग-पीरियड एवरेज का 87%, 2001 के बाद चौथा सबसे कम) की वजह बताया जा रहा है, जिसने हाइड्रो बिजली उत्पादन घटाया और कूलिंग मांग बढ़ाई।',
  },
  {
    q: 'क्या इस किल्लत की वजह से मेरा बिजली बिल बढ़ेगा?',
    a: 'हम यह नहीं कह सकते कि बढ़ेगा ही — हमें ऐसा कोई राज्य-स्तरीय आदेश नहीं मिला जो सितंबर की इस किल्लत की वजह से फ्यूल सरचार्ज बढ़ाता हो। जो हम समझा सकते हैं वह है तंत्र: जब किसी DISCOM को महंगी, कम अवधि की बिजली खरीदनी पड़ती है (पावर एक्सचेंज पर, या इमरजेंसी कोयला खरीद के ज़रिए), तो ज्यादातर राज्यों के टैरिफ ऑर्डर में पहले से एक नियमित मासिक Fuel and Power Purchase Cost Adjustment (FPPCA/FCA) शामिल होता है, जो इस लागत का एक हिस्सा देरी से बिल में जोड़ता है — यह सस्ते महीने में घटकर रिफंड भी बन सकता है। यह तंत्र कैसे काम करता है, यह जानने के लिए हमारा फिक्स्ड चार्जेज बनाम FCA वाला लेख देखें, और मान लेने के बजाय अपने राज्य का असल मासिक आदेश जांचें।',
  },
  {
    q: 'Grid-India और CEA क्या हैं, और यह लेख इनका हवाला क्यों देता है?',
    a: 'Grid-India (पहले POSOCO) देश का ग्रिड ऑपरेटर है, जो रोज़ाना/मासिक बिजली उत्पादन, मांग और energy-not-supplied के आंकड़े जारी करता है। CEA, यानी Central Electricity Authority, रोज़ाना कोयला-स्टॉक रिपोर्ट जारी करता है, जो पावर प्लांटों में ईंधन भंडार पर नज़र रखती है। इस लेख में दिए गए उत्पादन और कोयला-स्टॉक के आंकड़े इन्हीं दो आधिकारिक स्रोतों पर आधारित हैं; जिस रॉयटर्स रिपोर्ट से यह किल्लत पहली बार सुर्खियों में आई, वह खुद Grid-India के आंकड़ों पर बनी है।',
  },
  {
    q: 'क्या केरल की बिजली किल्लत इसी राष्ट्रीय कहानी का हिस्सा है?',
    a: 'हां — केरल इन्हीं राष्ट्रीय दबावों का एक ठोस, राज्य-स्तरीय उदाहरण है: कमजोर हाइड्रो इनफ्लो, कम समय में महंगी बिजली खरीद, और बिल पर एक असली मासिक फ्यूल सरचार्ज। केरल की बिजली किल्लत पर हमारा अलग लेख देखें, जिसमें बताया गया है कि इसका KSEB बिल पर क्या असर पड़ा।',
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

/** A single horizontal bar sliced into proportional segments — matches the
 *  site's telescoping-tariff visual language (see WaterSlabBand / the Kerala
 *  news post's SupplyBand) rather than a card grid. */
function GenerationMixBand({
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

export default function IndiaPowerShortagePageHi() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'न्यूज़', href: '/news' },
          { label: 'भारत बिजली किल्लत', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> राष्ट्रीय · Grid-India · CEA
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚡', big: '~560 MU', small: 'सितंबर 2026 की किल्लत (रॉयटर्स)', tone: 'caution-amber' },
          { icon: '🪨', big: '66%', small: 'सितंबर उत्पादन में कोयले का हिस्सा', tone: 'hub' },
          { icon: '🌱', big: '17%', small: 'क्लीन-एनर्जी हिस्सा, ~19.5% से घटा', tone: 'hub' },
          { icon: '⛽', big: '80+', small: '~190 में से कोयला प्लांट बेहद कम स्टॉक पर', tone: 'caution-amber' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          लेखक:{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics संपादकीय टीम
          </Link>{' '}
          · अपडेट {LAST_UPDATED} ·{' '}
          <a
            href="https://www.reuters.com/business/energy/india-power-shortfall-hits-three-year-peak-despite-higher-coal-burn-2026-10-01/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            स्रोत: Reuters
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>सितंबर 2026 में भारत की बिजली किल्लत करीब 560 मिलियन यूनिट (MU)</strong> तक
          पहुंच गई — यह आंकड़ा रॉयटर्स ने Grid-India के रोज़ाना डेटा से निकाला है — और यह पिछले
          तीन साल, यानी अगस्त 2023 के बाद की सबसे बड़ी मासिक किल्लत है। अकेले सुनने में यह आंकड़ा
          चिंताजनक लगता है, लेकिन स्केल भी मायने रखता है: यह किल्लत उस महीने भारत में हुए कुल
          174.17 बिलियन यूनिट उत्पादन के एक प्रतिशत के बेहद छोटे हिस्से के बराबर है। यह एक असली,
          बिगड़ती हुई सप्लाई की तंगी है — देशव्यापी ब्लैकआउट नहीं। आगे बताया गया है कि असल आंकड़े
          क्या दिखाते हैं, कोयले से बिजली उत्पादन लगातार छठे महीने बढ़ने के बावजूद यह तंगी क्यों
          हुई, और इसका आपके बिल पर क्या मतलब हो सकता है।
        </p>

        <section aria-labelledby="what-happened" className="mt-10 scroll-mt-20">
          <h2 id="what-happened" className={h2Cls}>
            सितंबर 2026 के आंकड़े असल में क्या दिखाते हैं
          </h2>
          <p className={pCls}>
            भारत ने सितंबर 2026 में <strong>174.17 बिलियन यूनिट</strong> बिजली बनाई, जो
            साल-दर-साल <strong>11.3%</strong> ज्यादा है — यानी मांग खुद भी मजबूती से बढ़ती रही।
            इस बड़े कुल आंकड़े के मुकाबले, रॉयटर्स ने करीब <strong>560 मिलियन यूनिट</strong> की
            किल्लत आंकी है, जो अगस्त 2023 के बाद सबसे ज्यादा है। उसी Grid-India डेटासेट पर काम
            करने वाले एक अन्य स्रोत ने 544 मिलियन यूनिट का करीबी लेकिन अलग आंकड़ा बताया है — दोनों
            पूरी तरह मेल नहीं खाते, शायद इसलिए क्योंकि हर हिसाब में मांग की अलग समयावधि गिनी गई
            है, इसलिए इसे एक सटीक संख्या के बजाय &quot;लगभग 550-560 मिलियन यूनिट&quot; मानें।
          </p>
          <p className={`mt-3 ${pCls}`}>
            किसी भी तरह देखें, यह किल्लत उस महीने के कुल उत्पादन के आधे प्रतिशत से भी कम है।
            तीन साल की सबसे बड़ी किल्लत और मजबूत अंतर्निहित मांग वृद्धि — दोनों बातें एक साथ सच
            हैं। यह एक ऐसे ग्रिड पर बढ़ता दबाव है जो खुद भी सचमुच बढ़ रहा है, न कि कुल मिलाकर
            सिकुड़ता हुआ ग्रिड।
          </p>
          <p className={takeawayCls}>
            निचोड़: किल्लत असली है और तीन साल में सबसे बड़ी है, लेकिन यह एक ऐसे उत्पादन के
            छोटे हिस्से के बराबर है जो खुद दोहरे अंकों में बढ़ा।
          </p>
        </section>

        <section aria-labelledby="why" className="mt-10 scroll-mt-20">
          <h2 id="why" className={h2Cls}>
            कोयले से बिजली उत्पादन बढ़ने के बावजूद किल्लत क्यों हुई?
          </h2>
          <p className={pCls}>कोई एक वजह इसे पूरी तरह नहीं बताती — कई दबाव एक साथ पड़े:</p>
          <ul className="mt-3 space-y-2">
            {[
              [
                'कमजोर मानसून, अल नीनो से जुड़ा',
                'भारत का 2026 मानसून अपने लॉन्ग-पीरियड एवरेज के 87% पर रहा — 2001 के बाद चौथा सबसे कम — और NOAA व IMD दोनों ने इस अवधि के लिए सक्रिय अल नीनो पैटर्न की पुष्टि की है, जिसे इस कमजोर बारिश की वजह बताया जा रहा है।',
              ],
              [
                'लगातार पांचवें महीने हाइड्रो बिजली घटी',
                'कमजोर मानसून इनफ्लो ने सितंबर में हाइड्रो बिजली उत्पादन साल-दर-साल करीब 16% घटाया, जो लगातार पांचवें महीने की गिरावट है।',
              ],
              [
                'मजबूत, रिकॉर्ड-तोड़ मांग',
                'सितंबर में राष्ट्रीय पीक मांग रिकॉर्ड 269 GW तक पहुंची, जिसकी वजह औद्योगिक गतिविधि और सामान्य से ज्यादा तापमान रहा।',
              ],
              [
                'दिन और शाम के बीच जोड़ने के लिए पर्याप्त स्टोरेज नहीं',
                'भारत के पास अभी भी बड़े पैमाने पर बैटरी स्टोरेज सीमित है, इसलिए दिन में बची सोलर बिजली को शाम की पीक मांग तक आसानी से बचाकर नहीं रखा जा सकता, जब सोलर उत्पादन शून्य पर आ जाता है।',
              ],
              [
                'कई प्लांटों में कोयला स्टॉक बेहद कम',
                'सितंबर के आखिर तक करीब 190 में से 80 से ज्यादा निगरानी वाले कोयला प्लांटों के पास तय स्टॉक स्तर का 25% से भी कम कोयला था, भले ही मांग पूरी करने के लिए प्लांट तेज़ी से कोयला जला रहे थे — यह कोयले की कमी नहीं, बल्कि लॉजिस्टिक्स और वितरण का दबाव है।',
              ],
              [
                'रखरखाव के लिए बंद प्लांट',
                'Elara Securities के विश्लेषक Rupesh Sankhe ने, रॉयटर्स के हवाले से, पीक मांग बढ़ने और कई प्लांटों के एक साथ निर्धारित रखरखाव पर होने, दोनों की ओर इशारा किया।',
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
            निचोड़: यह एक साथ कई दिशाओं से पड़ा सप्लाई-डिमांड दबाव है — मौसम, मांग, स्टोरेज और
            ईंधन-लॉजिस्टिक्स, सब एक ही महीने में एक ही दिशा में खिंच रहे हैं — यही वजह है कि
            किसी एक वजह के सुधरते ही यह किल्लत खत्म नहीं हो जाएगी।
          </p>
        </section>

        <section aria-labelledby="mix" className="mt-10 scroll-mt-20">
          <h2 id="mix" className={h2Cls}>
            कोयला बनाम रिन्यूएबल: क्लीन-एनर्जी का हिस्सा बढ़ने के बावजूद कैसे घट गया?
          </h2>
          <p className={pCls}>
            कोयले से बिजली उत्पादन साल-दर-साल <strong>13.3%</strong> बढ़ा, और कुल उत्पादन में
            इसका हिस्सा बढ़कर <strong>66.03%</strong> हो गया, जो अगस्त में 64.6% था। रिन्यूएबल
            बिजली उत्पादन (सोलर, विंड और अन्य RE, बड़े हाइड्रो को छोड़कर) भी बढ़ा — असल में,
            साल-दर-साल <strong>25.1%</strong> बढ़कर <strong>29.62 बिलियन यूनिट</strong> — लेकिन
            कुल मिश्रण में रिन्यूएबल का <em>हिस्सा</em> फिर भी घटकर करीब <strong>17%</strong> रह
            गया, जो अगस्त में लगभग 19.5% था।
          </p>
          <GenerationMixBand
            label="सितंबर 2026 — भारत का बिजली उत्पादन मिश्रण (174.17 बिलियन यूनिट)"
            segments={[
              { name: 'कोयला', value: 115.0, unit: 'बिलियन यूनिट', shade: 'bg-hub-news' },
              { name: 'रिन्यूएबल', value: 29.62, unit: 'बिलियन यूनिट', shade: 'bg-hub-news/60' },
              { name: 'अन्य', value: 29.55, unit: 'बिलियन यूनिट', shade: 'bg-hub-news/30' },
            ]}
          />
          <p className={`mt-4 ${pCls}`}>
            यह कोई विरोधाभास नहीं है — ऐसा तब होता है जब कुल पाई का एक हिस्सा उससे तेज़ी से बढ़े।
            एक साल पहले के मुकाबले ज्यादा साफ बिजली बनी; बस यह एक बड़े, कोयला-भारी कुल मिश्रण का
            छोटा हिस्सा बन गई, क्योंकि किल्लत को पूरा करने के लिए कोयला-आधारित उत्पादन उससे भी
            तेज़ी से बढ़ा।
          </p>
          <p className={takeawayCls}>
            निचोड़: रिन्यूएबल का उत्पादन पूर्ण रूप में बढ़ा लेकिन हिस्से में घट गया — दोनों
            आंकड़े सच हैं, और अकेले कोई भी पूरी कहानी नहीं बताता।
          </p>
        </section>

        <section aria-labelledby="what-is-shortage" className="mt-10 scroll-mt-20">
          <h2 id="what-is-shortage" className={h2Cls}>
            &quot;बिजली की किल्लत&quot; का असल मतलब क्या है?
          </h2>
          <p className={pCls}>
            ऊपर दिए गए आंकड़े <strong>energy not supplied (ENS)</strong> को दर्शाते हैं — यानी
            ग्रिड से जितनी बिजली देने को कहा गया और उसने असल में जितनी दी, उसके बीच का अंतर, जो
            एक समयावधि में मिलियन यूनिट में मापा जाता है। यह ब्लैकआउट जैसा नहीं है। असल में, ऐसी
            किल्लत को आमतौर पर छोटी, स्थानीय लोड-शेडिंग से संभाला जाता है — अक्सर शाम की पीक मांग
            के समय और कुछ खास राज्यों या फीडरों में केंद्रित, न कि पूरे देश में एक जैसी कटौती से।
            इसी महीने केरल का अनुभव (नीचे देखें) ठीक इसी पैटर्न का एक ठोस उदाहरण है: पीक आवर्स
            में प्रतिबंध, न कि पूरी तरह बंद बिजली।
          </p>
          <p className={takeawayCls}>
            निचोड़: यहां &quot;किल्लत&quot; का मतलब एक मापी गई सप्लाई कमी है, पूरे ग्रिड के
            अंधेरे में डूब जाने का वर्णन नहीं।
          </p>
        </section>

        <section aria-labelledby="bill-impact" className="mt-10 scroll-mt-20">
          <h2 id="bill-impact" className={h2Cls}>
            क्या इसका असर आपके बिजली बिल पर पड़ेगा?
          </h2>
          <p className={pCls}>
            हमें ऐसा कोई राज्य-स्तरीय आदेश नहीं मिला जो सितंबर की इस किल्लत की वजह से फ्यूल
            सरचार्ज बढ़ाता हो, और हम यह दावा नहीं कर रहे कि कोई आ रहा है। जो हम समझा सकते हैं
            वह है वह तंत्र जो ऐसी लागत को बिल तक पहुंचाता, अगर किसी DISCOM की बिजली-खरीद लागत
            सचमुच बढ़े। 6 से 17 सितंबर के बीच Indian Energy Exchange पर कीमतें बार-बार ₹20
            प्रति यूनिट की नियामक सीमा तक पहुंच गईं, और उन पहले 17 दिनों की औसत क्लियरिंग कीमत
            ₹7.83 प्रति यूनिट रही — पिछले साल की इसी अवधि से दोगुने से भी ज्यादा। जब किसी
            DISCOM को इस तरह की महंगी, कम अवधि की बिजली खरीदनी पड़ती है (एक्सचेंज पर, या
            इमरजेंसी कोयला खरीद के ज़रिए), तो ज्यादातर राज्यों के टैरिफ ऑर्डर में पहले से एक
            नियमित <strong>मासिक</strong> Fuel and Power Purchase Cost Adjustment (FPPCA, कुछ
            राज्यों में FCA/FSA भी कहा जाता है) शामिल होता है, जो इस लागत का एक हिस्सा देरी से
            बिल में जोड़ता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            यह एक नियमित, पहले से मौजूद तंत्र है, कोई विशेष इमरजेंसी आदेश नहीं — और यह दोनों
            दिशाओं में चलता है। आंध्र प्रदेश में, उदाहरण के लिए, मौजूदा FPPCA असल में एक छोटा
            <em> रिफंड</em> (−₹0.13/यूनिट) है, जो नियामक के इस अवधि के आदेश के तहत लागू है — यह
            याद दिलाता है कि यह एडजस्टमेंट हर महीने असल बिजली-खरीद लागत के साथ बदलता है, सिर्फ
            ऊपर की ओर नहीं। भारतीय बिजली बिल में फिक्स्ड और एनर्जी चार्ज के साथ यह कैसे फिट बैठता
            है, इसके लिए हमारा{' '}
            <Link href="/blog/fixed-charges-vs-fca-electricity-bill" className="text-brass underline">
              फिक्स्ड चार्जेज बनाम फ्यूल-कॉस्ट एडजस्टमेंट
            </Link>{' '}
            वाला लेख देखें। मान लेने के बजाय अपने राज्य का असल मासिक आदेश जांचें।
          </p>
          <p className={takeawayCls}>
            निचोड़: इस किल्लत का बिल पर असर, अगर कोई है, तो वह एक नियमित मासिक एडजस्टमेंट से
            गुज़रता है जो ज्यादातर टैरिफ ऑर्डर में पहले से मौजूद है — न कि इस खास घटना से जुड़ी
            कोई एकमुश्त दर वृद्धि।
          </p>
        </section>

        <section aria-labelledby="regional" className="mt-10 scroll-mt-20">
          <h2 id="regional" className={h2Cls}>
            एक क्षेत्रीय उदाहरण: केरल
          </h2>
          <p className={pCls}>
            केरल के अपने सितंबर ने इन्हीं राष्ट्रीय दबावों का एक ठोस, राज्य-स्तरीय नज़ारा दिखाया:
            कमजोर मानसून के बाद कमजोर हाइड्रो रिज़र्वॉयर इनफ्लो, कम समय में राष्ट्रीय ग्रिड से
            महंगी बिजली आयात पर भारी निर्भरता, और नतीजे में KSEB बिल पर एक असली मासिक फ्यूल
            सरचार्ज। दिन-प्रतिदिन के आंकड़ों और इसने KSEB बिल में असल में क्या जोड़ा, इसके लिए{' '}
            <Link href="/news/kerala-power-shortage-september-2026" className="text-brass underline">
              केरल की बिजली किल्लत पर हमारा अलग लेख
            </Link>{' '}
            देखें।
          </p>
          <p className={takeawayCls}>
            निचोड़: ऊपर बताए गए राष्ट्रीय दबाव अमूर्त नहीं हैं — केरल दिखाता है कि ये एक असली
            राज्य की सप्लाई और बिलिंग पर लागू होने पर कैसे दिखते हैं।
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            आगे क्या देखना है
          </h2>
          <ol className="mt-3 space-y-3">
            {[
              [
                'ज्यादा कैप्टिव कोयला प्लांटों को चलाने का सरकारी आदेश',
                'सितंबर के आखिरी हफ्ते में सरकार ने इलेक्ट्रिसिटी एक्ट की धारा 11 लागू करते हुए 112 कैप्टिव कोयला प्लांटों (50 MW और उससे ज्यादा) को 1 अक्टूबर से 31 दिसंबर 2026 तक अधिकतम उपलब्ध क्षमता पर चलाने और अतिरिक्त बिजली एक्सचेंजों के ज़रिए बेचने का निर्देश दिया। कोयला मंत्रालय का सार्वजनिक रुख है कि कोयले की आपूर्ति खुद पर्याप्त है और यह उत्पादन की नहीं, वितरण की समस्या है।',
              ],
              [
                'क्या अक्टूबर में कोयला स्टॉक फिर से बनता है',
                'सितंबर के आखिर में राष्ट्रीय कोयला भंडार अपने सामान्य स्तर के करीब 39% पर था। अक्टूबर में यह 19 दिन के मानक की ओर लौटता है या दबाव में बना रहता है — यही इस बात का सबसे साफ शुरुआती संकेत होगा कि यह किल्लत कम हो रही है या बनी हुई है।',
              ],
              [
                'अक्टूबर की मांग और मानसून की वापसी',
                'आमतौर पर मानसून की पूरी वापसी और ठंडक बढ़ने के साथ पीक मांग कम होती है। यह मौसमी राहत समय पर आती है या मांग ऊंची बनी रहती है, यह Grid-India के अपने रोज़ाना आंकड़ों में दिखेगा।',
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
          <p className={takeawayCls}>
            निचोड़: अगला असली संकेत कोई एक हेडलाइन आंकड़ा नहीं है, बल्कि यह कि क्या कोयला स्टॉक
            और अक्टूबर की मांग दोनों एक साथ सही दिशा में बढ़ते हैं।
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            संबंधित टूल्स और गाइड
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">बिजली बिल कैलकुलेटर</p>
              <p className="mt-1 text-xs text-ash/60">
                अपने राज्य के DISCOM और स्लैब के हिसाब से बिजली बिल का अंदाज़ा लगाएं।
              </p>
            </Link>
            <Link
              href="/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📄
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                फिक्स्ड चार्जेज बनाम FCA
              </p>
              <p className="mt-1 text-xs text-ash/60">
                इस्तेमाल एक जैसा होने पर भी बिल क्यों बदलता है।
              </p>
            </Link>
            <Link
              href="/news/kerala-power-shortage-september-2026"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📰
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">केरल की बिजली किल्लत</p>
              <p className="mt-1 text-xs text-ash/60">
                इन्हीं दबावों का एक राज्य-स्तरीय उदाहरण, और KSEB बिल पर इसका असर।
              </p>
            </Link>
            <Link
              href="/solar/battery-backup-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🔋
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">बैटरी बैकअप कैलकुलेटर</p>
              <p className="mt-1 text-xs text-ash/60">
                शाम की मांग के लिए दिन की सोलर बिजली बचाने में क्या लगता है, देखें।
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
          आखिरी अपडेट: {LAST_UPDATED}। उत्पादन, कोयला-हिस्सा, रिन्यूएबल-हिस्सा और कोयला-स्टॉक के
          ऊपर दिए आंकड़े {DATA_AS_OF} के हैं, जैसा Grid-India, Central Electricity Authority
          (CEA) और रॉयटर्स के उसी डेटा पर आधारित अपने हिसाब में बताया गया है। रॉयटर्स ने महीने
          भर की किल्लत करीब 560 मिलियन यूनिट बताई है; उसी Grid-India डेटासेट पर काम करने वाले एक
          अन्य स्रोत ने 544 मिलियन यूनिट बताया है — इसे एक सटीक संख्या के बजाय &quot;लगभग 550-560
          मिलियन यूनिट&quot; मानें, और मूल रिपोर्टिंग का श्रेय रॉयटर्स को जाता है, जिस पर यह लेख
          आधारित है। &quot;आगे क्या देखना है&quot; में बताए गए अक्टूबर 2026 के घटनाक्रम इस लेख
          लिखे जाने तक मिले सबसे नए सरकारी आदेश को दर्शाते हैं और बदल सकते हैं। इस साइट पर आंकड़े
          कैसे जुटाए और जांचे जाते हैं, इसके लिए हमारी{' '}
          <Link href="/methodology" className="text-brass underline">
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
