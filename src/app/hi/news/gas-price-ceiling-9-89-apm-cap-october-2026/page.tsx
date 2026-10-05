import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gas-price-ceiling-9-89-apm-cap-october-2026'
const TITLE = 'गैस प्राइस सीलिंग बढ़कर $9.89 हुई: क्या CNG और PNG महंगी होंगी?'
const DESCRIPTION =
  'डीपवॉटर और दूसरे कठिन क्षेत्रों की गैस की सीलिंग 1 अक्टूबर 2026 से 31 मार्च 2027 के लिए $8.90 से बढ़कर $9.89 प्रति MMBTU हो गई। CNG और पाइप्ड गैस को मिलने वाली APM गैस की $7 की सीमा नहीं बदली।'
const LAST_UPDATED = '5 अक्टूबर 2026'
const VALID_PERIOD = '1 अक्टूबर 2026 – 31 मार्च 2027'
const PPAC_CEILING_URL =
  'https://ppac.gov.in/download.php?file=importantnews/1790767955_Gas_Price_Ceiling_October2026-March2027.pdf'
const PPAC_APM_URL =
  'https://ppac.gov.in/download.php?file=importantnews/1790767940_Domestic_Natural_Gas_Price_October_2026.pdf'

export const metadata: Metadata = {
  title: 'गैस प्राइस सीलिंग $9.89, APM सीमा $7: CNG और PNG पर असर',
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
  datePublished: '2026-10-05',
  dateModified: '2026-10-05',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'नई गैस प्राइस सीलिंग कितनी है?',
    a: 'पेट्रोलियम प्लानिंग एंड एनालिसिस सेल (PPAC) की 30 सितंबर 2026 की अधिसूचना के अनुसार डीपवॉटर, अल्ट्रा-डीपवॉटर और हाई प्रेशर-हाई टेम्परेचर खोजों की गैस की प्राइस सीलिंग 1 अक्टूबर 2026 से 31 मार्च 2027 के लिए US$ 9.89 प्रति MMBTU है। पिछली सीलिंग $8.90 थी।',
  },
  {
    q: 'क्या सीलिंग $9.89 होने से CNG और PNG महंगी होंगी?',
    a: 'सिर्फ इस अधिसूचना से CNG या PNG की कीमत में कोई बदलाव नहीं होता। यह सीलिंग कठिन क्षेत्रों की गैस पर लागू है। सिटी गैस कंपनियों को CNG और घरेलू PNG के लिए जो गैस आवंटित होती है वह APM गैस है, और उसकी $7 की सीमा नहीं बदली। रिटेल कीमत तभी बदलती है जब कोई सिटी गैस कंपनी इसकी घोषणा करती है।',
  },
  {
    q: 'क्या अक्टूबर 2026 में APM गैस की कीमत बदली?',
    a: 'ONGC और ऑयल इंडिया को APM गैस के लिए जो कीमत मिलती है वह नहीं बदली: यह US$ 7.00 प्रति MMBTU पर सीमित है। PPAC ने 1 से 31 अक्टूबर 2026 के लिए जो फॉर्मूला कीमत अधिसूचित की है वह US$ 11.22 प्रति MMBTU है, जो सीमा से ऊपर है, इसलिए सीमा लागू होती है।',
  },
  {
    q: 'जब सीमा $7 है तो अधिसूचित कीमत $11.22 क्यों है?',
    a: '$11.22 का आंकड़ा प्राइसिंग फॉर्मूले का नतीजा है, जो घरेलू गैस की कीमत हर महीने इंडियन क्रूड बास्केट की कीमत के 10% पर तय करता है। ONGC और ऑयल इंडिया के नॉमिनेशन फील्ड की गैस पर एक सीलिंग लागू है, जो अभी $7.00 है, इसलिए फॉर्मूला कीमत ज़्यादा होने पर उत्पादकों को $7.00 ही मिलता है।',
  },
  {
    q: 'गैस प्राइस सीलिंग और गैस की कीमत में क्या फर्क है?',
    a: 'गैस प्राइस सीलिंग वह अधिकतम कीमत है जो उत्पादक ले सकता है, खुद कीमत नहीं। कठिन क्षेत्रों की गैस के उत्पादकों को सीलिंग तक मार्केटिंग और प्राइसिंग की आज़ादी है, इसलिए कॉन्ट्रैक्ट की कीमत उससे नीचे हो सकती है।',
  },
  {
    q: '$9.89 की सीलिंग किन गैस फील्ड पर लागू है?',
    a: '$9.89 की सीलिंग डीपवॉटर, अल्ट्रा-डीपवॉटर और हाई प्रेशर-हाई टेम्परेचर क्षेत्रों की खोजों की गैस पर लागू है। इस अधिसूचना पर PTI की रिपोर्ट रिलायंस-BP के KG-D6 ब्लॉक को उदाहरण के रूप में बताती है।',
  },
  {
    q: 'MMBTU क्या है?',
    a: 'MMBTU यानी मिलियन ब्रिटिश थर्मल यूनिट, जो गैस में मौजूद ऊर्जा का माप है। थोक गैस की कीमत अमेरिकी डॉलर प्रति MMBTU में तय होती है, जबकि घरेलू PNG बिल रुपये प्रति स्टैंडर्ड क्यूबिक मीटर (SCM) में बनता है।',
  },
  {
    q: 'गैस प्राइस सीलिंग अगली बार कब बदलेगी?',
    a: 'कठिन क्षेत्रों की सीलिंग छह-छह महीने के लिए, 1 अप्रैल और 1 अक्टूबर से, अधिसूचित होती है, इसलिए अगली सीलिंग 1 अप्रैल 2027 से लागू होगी। APM की फॉर्मूला कीमत हर महीने अधिसूचित होती है।',
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

const ceilingRows: [string, string, string][] = [
  ['अक्टूबर 2022 – मार्च 2023', '$12.46', 'समाचार रिपोर्ट'],
  ['अप्रैल – सितंबर 2023', '$12.12', 'समाचार रिपोर्ट'],
  ['अक्टूबर 2023 – मार्च 2024', '$9.96', 'समाचार रिपोर्ट'],
  ['अप्रैल – सितंबर 2024', '$9.87', 'समाचार रिपोर्ट'],
  ['अक्टूबर 2024 – मार्च 2025', '$10.16', 'FIPI रिपोर्ट'],
  ['अप्रैल – सितंबर 2025', '$10.04', 'समाचार रिपोर्ट'],
  ['अक्टूबर 2025 – मार्च 2026', '$9.72', 'FIPI रिपोर्ट'],
  ['अप्रैल – सितंबर 2026', '$8.90', 'FIPI रिपोर्ट'],
  ['अक्टूबर 2026 – मार्च 2027', '$9.89', 'PPAC अधिसूचना'],
]

const capRows: [string, string][] = [
  ['अप्रैल 2023 से', '$6.50'],
  ['अप्रैल 2025 से', '$6.75'],
  ['अप्रैल 2026 से', '$7.00'],
]

/** A single horizontal bar sliced into proportional segments — the same
 *  visual language as the other news posts' bands, here splitting the
 *  October formula price into the part producers are paid and the part
 *  above the cap. */
function PriceCapBand({
  label,
  segments,
}: {
  label: string
  segments: { name: string; value: number; shade: string }[]
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
        {segments.map((s) => (
          <div
            key={s.name}
            style={{ width: `${(s.value / total) * 100}%` }}
            className={`flex flex-col items-center justify-center gap-0.5 px-1 text-center ${s.shade}`}
          >
            <span className="text-[10px] font-medium tracking-wide text-white/80">{s.name}</span>
            <span className="font-display text-sm font-bold tabular-nums text-white">
              ${s.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-hub-news" aria-hidden>
        ✓
      </span>
      <span className={pCls}>{children}</span>
    </li>
  )
}

export default function GasPriceCeilingPageHi() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'न्यूज़', href: '/hi/news' },
          { label: 'गैस प्राइस सीलिंग', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> राष्ट्रीय · PPAC · प्राकृतिक गैस
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '🔺', big: '$9.89', small: 'कठिन क्षेत्रों की सीलिंग, प्रति MMBTU', tone: 'caution-amber' },
          { icon: '↩️', big: '$8.90', small: 'पिछली सीलिंग (अप्रैल–सितंबर 2026)', tone: 'hub' },
          { icon: '🔒', big: '$7.00', small: 'APM सीमा, बिना बदलाव', tone: 'hub' },
          { icon: '📅', big: '6 महीने', small: VALID_PERIOD, tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          लेखक:{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics संपादकीय टीम
          </Link>{' '}
          · अंतिम अपडेट {LAST_UPDATED} ·{' '}
          <a
            href={PPAC_CEILING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            मुख्य स्रोत: PPAC अधिसूचना
          </a>{' '}
          ·{' '}
          <a
            href="https://energy.economictimes.indiatimes.com/news/oil-and-gas/govt-raises-deepwater-gas-price-ceiling-to-9-89-per-mmbtu-apm-gas-cap-at-7/134670778"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            खबर का स्रोत: PTI, ETEnergyWorld के ज़रिए
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            डीपवॉटर और दूसरे कठिन क्षेत्रों की गैस की प्राइस सीलिंग $8.90 से बढ़कर $9.89 प्रति
            MMBTU हो गई है
          </strong>
          , जो पेट्रोलियम प्लानिंग एंड एनालिसिस सेल (PPAC) की 30 सितंबर 2026 की अधिसूचना के
          तहत {VALID_PERIOD} के लिए लागू है। CNG और PNG के लिए जो सीमा सबसे ज़्यादा मायने रखती
          है वह नहीं बदली: ONGC और ऑयल इंडिया के पुराने फील्ड की गैस, जिसे APM गैस कहते हैं,
          $7.00 प्रति MMBTU पर ही सीमित है।{' '}
          <strong>सिर्फ इस अधिसूचना से CNG या PNG की कीमत में कोई बदलाव नहीं होता।</strong> यह
          लेख बताता है कि क्या बदला, सीलिंग और कीमत में क्या फर्क है, दोनों प्राइसिंग
          व्यवस्थाओं की तुलना क्या है, और गैस CNG पंप या रसोई के बर्नर तक कैसे पहुंचती है।
        </p>

        <section aria-labelledby="what-changed" className="mt-10 scroll-mt-20">
          <h2 id="what-changed" className={h2Cls}>
            गैस प्राइस सीलिंग में क्या बदला?
          </h2>
          <p className={pCls}>
            PPAC की 30 सितंबर 2026 की दो अधिसूचनाओं में एक सीलिंग बदली और एक सीमा वैसी ही रही।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">बढ़ी:</strong> डीपवॉटर, अल्ट्रा-डीपवॉटर और हाई
              प्रेशर-हाई टेम्परेचर खोजों की गैस की सीलिंग अब US$ 9.89 प्रति MMBTU है, जो{' '}
              {VALID_PERIOD} के लिए मान्य है। यह पिछली $8.90 से $0.99, यानी 11.1%, ज़्यादा है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">नहीं बदली:</strong> ONGC और ऑयल इंडिया के
              नॉमिनेशन फील्ड की APM गैस की सीलिंग 1 से 31 अक्टूबर 2026 के लिए US$ 7.00 प्रति
              MMBTU है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">अधिसूचित, पर चुकाई नहीं जाती:</strong> अक्टूबर
              के लिए घरेलू प्राकृतिक गैस की फॉर्मूला कीमत US$ 11.22 प्रति MMBTU है, जिसे ONGC और
              ऑयल इंडिया के लिए $7.00 की सीलिंग सीमित कर देती है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            दोनों दस्तावेज़ कीमतें ग्रॉस कैलोरिफिक वैल्यू के आधार पर बताते हैं। पहले का लिंक
            ऊपर है; दूसरा PPAC की{' '}
            <a
              href={PPAC_APM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              अक्टूबर 2026 की घरेलू प्राकृतिक गैस मूल्य अधिसूचना
            </a>{' '}
            है।
          </p>
          <p className={takeawayCls}>
            निचोड़: जो सीलिंग बढ़ी वह कठिन क्षेत्रों की गैस की है; APM गैस की सीमा वही है जो
            सितंबर में थी।
          </p>
        </section>

        <section aria-labelledby="ceiling-vs-price" className="mt-10 scroll-mt-20">
          <h2 id="ceiling-vs-price" className={h2Cls}>
            सीलिंग और कीमत में क्या फर्क है?
          </h2>
          <p className={pCls}>
            सीलिंग वह अधिकतम रकम है जो उत्पादक ले सकता है, और कीमत वह है जो खरीदार अपने
            कॉन्ट्रैक्ट के तहत असल में चुकाता है।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">प्राइसिंग की आज़ादी:</strong> कठिन क्षेत्रों की
              गैस के उत्पादकों को पेट्रोलियम और प्राकृतिक गैस मंत्रालय की 21 मार्च 2016 की
              अधिसूचना के तहत मार्केटिंग और प्राइसिंग की आज़ादी है, जिसका हवाला PPAC का आदेश
              देता है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">सीमा, दर नहीं:</strong> कॉन्ट्रैक्ट की कीमत
              सीलिंग पर या उससे नीचे रहती है। ऊंची सीलिंग खरीदार की कीमत तभी बढ़ाती है जब पुरानी
              सीलिंग उस कीमत को रोके हुए थी।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">छह महीने की वैधता:</strong> सीलिंग हर साल 1
              अप्रैल और 1 अक्टूबर से अधिसूचित होती है।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            निचोड़: $9.89 गैस की एक श्रेणी की ऊपरी सीमा है, सारी गैस की नई कीमत नहीं।
          </p>
        </section>

        <section aria-labelledby="two-regimes" className="mt-10 scroll-mt-20">
          <h2 id="two-regimes" className={h2Cls}>
            कठिन क्षेत्रों की गैस बनाम APM गैस: दो प्राइसिंग व्यवस्थाएं
          </h2>
          <p className={pCls}>
            भारत में घरेलू गैस की कीमत दो व्यवस्थाओं के तहत तय होती है, जो स्रोत, नियम और
            संशोधन के चक्र में अलग हैं। तालिका अक्टूबर 2026 की स्थिति में दोनों की तुलना करती
            है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                कठिन क्षेत्रों की गैस और APM गैस की प्राइसिंग की तुलना, अक्टूबर 2026
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">कठिन क्षेत्रों की गैस</th>
                  <th className="px-4 py-2 font-semibold">APM गैस</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">स्रोत</td>
                  <td className="px-4 py-2">
                    डीपवॉटर, अल्ट्रा-डीपवॉटर और हाई प्रेशर-हाई टेम्परेचर खोजें
                  </td>
                  <td className="px-4 py-2">ONGC और ऑयल इंडिया के नॉमिनेशन फील्ड</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">प्राइसिंग नियम</td>
                  <td className="px-4 py-2">उत्पादक कीमत तय करता है, सीलिंग तक</td>
                  <td className="px-4 py-2">
                    इंडियन क्रूड बास्केट की कीमत का 10%, एक फ्लोर और एक सीलिंग के भीतर
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">अभी की सीमा</td>
                  <td className="px-4 py-2">$9.89 प्रति MMBTU</td>
                  <td className="px-4 py-2">$7.00 प्रति MMBTU</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">संशोधन</td>
                  <td className="px-4 py-2">हर छह महीने</td>
                  <td className="px-4 py-2">फॉर्मूला कीमत हर महीने</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            कठिन क्षेत्रों की सीलिंग दोनों दिशाओं में बदली है। नीचे की तालिका में सबसे हाल की
            नौ छमाही सीलिंग अमेरिकी डॉलर प्रति MMBTU में दी गई हैं।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                कठिन क्षेत्रों की गैस प्राइस सीलिंग, छमाही के अनुसार, अक्टूबर 2022 से मार्च 2027
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">अवधि</th>
                  <th className="px-4 py-2 font-semibold">सीलिंग</th>
                  <th className="px-4 py-2 font-semibold">हमारा स्रोत</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {ceilingRows.map(([period, ceiling, source], i) => (
                  <tr key={period} className={i === ceilingRows.length - 1 ? 'bg-mist/60' : ''}>
                    <td className="px-4 py-2 font-medium">{period}</td>
                    <td className="px-4 py-2 tabular-nums">{ceiling}</td>
                    <td className="px-4 py-2 text-ash/70">{source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            $9.89 की नई सीलिंग पिछले छह महीनों की $8.90 से ऊपर है और अक्टूबर 2024 से लागू $10.16
            से नीचे है। पुराने आंकड़े फेडरेशन ऑफ इंडियन पेट्रोलियम इंडस्ट्री की मासिक पॉलिसी एंड
            इकोनॉमिक रिपोर्ट और हर PPAC अधिसूचना की समाचार रिपोर्ट से लिए गए हैं; सिर्फ सबसे नई
            पंक्ति सीधे अधिसूचना से पढ़ी गई है।
          </p>
          <p className={takeawayCls}>
            निचोड़: यह बढ़ोतरी छह महीने पहले की कटौती को पलटती है; यह कोई रिकॉर्ड नहीं है।
          </p>
        </section>

        <section aria-labelledby="apm-cap" className="mt-10 scroll-mt-20">
          <h2 id="apm-cap" className={h2Cls}>
            APM कीमत कागज़ पर $11.22 पर असल में $7 क्यों है?
          </h2>
          <p className={pCls}>
            APM कीमत कागज़ पर $11.22 इसलिए है कि फॉर्मूला यही निकालता है, और असल में $7.00
            इसलिए कि ONGC और ऑयल इंडिया के लिए एक सीलिंग फॉर्मूले को सीमित कर देती है।
          </p>
          <PriceCapBand
            label="अक्टूबर 2026 की $11.22 प्रति MMBTU फॉर्मूला कीमत, APM सीमा पर बंटी हुई"
            segments={[
              { name: 'ONGC / ऑयल इंडिया को मिलता है', value: 7.0, shade: 'bg-hub-news' },
              { name: 'सीमा से ऊपर, नहीं मिलता', value: 4.22, shade: 'bg-hub-news/40' },
            ]}
          />
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">फॉर्मूला:</strong> अप्रैल 2023 से घरेलू गैस की
              कीमत हर महीने इंडियन क्रूड बास्केट की कीमत के 10% पर तय होती है, जो पेट्रोलियम और
              प्राकृतिक गैस मंत्रालय की 7 अप्रैल 2023 की अधिसूचना के तहत है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">सीलिंग:</strong> उस अधिसूचना का पैरा 4
              नॉमिनेशन-फील्ड की गैस की कीमत को सीमित करता है। PPAC का अक्टूबर का आदेश यह सीमा
              $7.00 रखता है, जो फॉर्मूला कीमत से $4.22 कम है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">नए कुएं:</strong> PTI की रिपोर्ट के अनुसार
              नॉमिनेशन ब्लॉक के नए कुओं की गैस को APM कीमत पर 10% प्रीमियम मिलता है, जो $7.70
              बैठता है। PPAC की दोनों अधिसूचनाओं में यह आंकड़ा नहीं है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            2023 के सुधार के बाद APM सीमा दो चरणों में बढ़ी है। तालिका हर चरण की सीमा दिखाती
            है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">APM गैस मूल्य सीमा की टाइमलाइन, 2023 से 2026</caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">अवधि</th>
                  <th className="px-4 py-2 font-semibold">APM सीमा, प्रति MMBTU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {capRows.map(([period, cap]) => (
                  <tr key={period}>
                    <td className="px-4 py-2 font-medium">{period}</td>
                    <td className="px-4 py-2 tabular-nums">{cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            निचोड़: CNG और PNG के लिए देखने वाला आंकड़ा $7.00 की सीमा है, $11.22 की फॉर्मूला
            कीमत नहीं।
          </p>
        </section>

        <section aria-labelledby="cgd" className="mt-10 scroll-mt-20">
          <h2 id="cgd" className={h2Cls}>
            गैस CNG और PNG तक कैसे पहुंचती है?
          </h2>
          <p className={pCls}>
            गैस CNG पंप और पाइप्ड कनेक्शन तक सिटी गैस डिस्ट्रीब्यूशन (CGD) कंपनियों के ज़रिए
            पहुंचती है, जो एक से ज़्यादा स्रोतों से खरीदती हैं और फिर अपनी रिटेल कीमत खुद तय
            करती हैं।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">APM गैस पहले आती है।</strong> देश में बनी APM
              गैस CGD कंपनियों को दो प्राथमिकता वाले सेगमेंट, CNG और घरेलू PNG, के लिए आवंटित
              होती है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">आवंटन घटा है।</strong> 16 अप्रैल 2025 से
              इंद्रप्रस्थ गैस का APM आवंटन 20% और महानगर गैस का 18% घटाया गया, और उसकी जगह महंगी
              न्यू-वेल गैस दी गई — यह कंपनियों के खुलासों के अनुसार है, जैसा उस समय रिपोर्ट
              हुआ।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">रिटेल कीमत कंपनी की होती है।</strong> हर CGD
              कंपनी PNG के लिए प्रति SCM और CNG के लिए प्रति किलो अपनी दर खुद तय करती है, और
              उसके ऊपर राज्य का VAT जुड़ता है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            हमें किसी CGD का ऐसा नोटिस नहीं मिला जो कीमत में बदलाव को इस अधिसूचना से जोड़ता हो।
            Goodreturns के 1 अक्टूबर 2026 के प्राइस राउंडअप में सूचीबद्ध हर शहर में PNG की दरें
            बिना बदलाव के हैं, और CNG की दरें कुछ राज्यों में बढ़ी और कुछ में घटी हैं। आपकी अपनी
            कंपनी क्या लेती है, यह देखने के लिए हमारे गैस कैलकुलेटर में उसका पेज खोलें:{' '}
            <Link href="/hi/gas/igl" className="text-brass underline">
              IGL
            </Link>
            ,{' '}
            <Link href="/hi/gas/mahanagar-gas" className="text-brass underline">
              महानगर गैस
            </Link>
            ,{' '}
            <Link href="/hi/gas/adani-gas" className="text-brass underline">
              अदाणी टोटल गैस
            </Link>{' '}
            या{' '}
            <Link href="/hi/gas/gujarat-gas" className="text-brass underline">
              गुजरात गैस
            </Link>
            । बिल का बाकी हिस्सा हमारी गाइड{' '}
            <Link href="/blog/png-piped-gas-bill-guide-india" className="text-brass underline">
              PNG बिल कैसे बनता है
            </Link>{' '}
            (अंग्रेज़ी में) समझाती है।
          </p>
          <p className={takeawayCls}>
            निचोड़: CNG या PNG की कीमत तब बदलती है जब सिटी गैस कंपनी घोषणा करती है, सीलिंग
            अधिसूचित होने पर नहीं।
          </p>
        </section>

        <section aria-labelledby="who" className="mt-10 scroll-mt-20">
          <h2 id="who" className={h2Cls}>
            ऊंची सीलिंग का असर किस पर पड़ता है?
          </h2>
          <p className={pCls}>
            ऊंची सीलिंग का सीधा असर कठिन क्षेत्रों की गैस के उत्पादकों पर पड़ता है, और दूसरे
            सेक्टरों पर सिर्फ उनके अपने गैस कॉन्ट्रैक्ट के ज़रिए।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">उत्पादक</strong> डीपवॉटर और हाई प्रेशर-हाई
              टेम्परेचर गैस के लिए पहले के $8.90 की जगह अब $9.89 तक ले सकते हैं। PTI की रिपोर्ट
              रिलायंस-BP के KG-D6 ब्लॉक को उदाहरण बताती है और इसका मकसद तकनीकी रूप से कठिन
              ऑफशोर फील्ड में निवेश को बढ़ावा देना बताती है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">फर्टिलाइज़र, बिजली और सिटी गैस</strong> वे
              प्राथमिकता वाले सेक्टर हैं जिन्हें APM गैस मिलती है, जैसा उसी रिपोर्ट में है। इन
              सप्लाई के लिए APM सीमा $7.00 पर बिना बदलाव के है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">घरों</strong> पर कोई सीधा बदलाव नहीं है। हमें इस
              अधिसूचना पर किसी उत्पादक, फर्टिलाइज़र कंपनी या बिजली कंपनी का कोई बयान नहीं
              मिला।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            निचोड़: अधिसूचना यह बदलती है कि कुछ उत्पादक कितना ले सकते हैं, किसी घर के बिल में
            क्या लिखा है यह नहीं।
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            आगे किस पर नज़र रखें
          </h2>
          <p className={pCls}>
            तीन तारीख वाली घटनाएं तय करती हैं कि इसमें से कुछ उपभोक्ता की कीमत तक पहुंचता है या
            नहीं।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">मासिक APM अधिसूचना:</strong> PPAC हर महीने
              फॉर्मूला कीमत और सीमा अधिसूचित करता है; अगली नवंबर 2026 के लिए होगी।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">1 अप्रैल 2027:</strong> कठिन क्षेत्रों की अगली
              छमाही सीलिंग लागू होगी। APM सीमा पिछली बार अप्रैल 2025 और अप्रैल 2026 में बढ़ी थी।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">सिटी गैस कंपनी के नोटिस:</strong> रिटेल CNG या
              PNG में बदलाव सबसे पहले कंपनी के अपने प्राइस नोटिस में दिखता है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            हम भविष्य की ईंधन कीमतों के बारे में कोई अनुमान नहीं लगाते। $9.89 की गैस प्राइस
            सीलिंग 31 मार्च 2027 तक लागू है, और $7.00 की APM सीमा वह आंकड़ा है जो CNG और PNG तक
            पहुंचता है।
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-gas/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            अपना गैस बिल जांचें
          </h2>
          <p className={`mt-2 ${pCls}`}>
            अपनी खपत और अपनी सिटी गैस कंपनी की दर डालें, और देखें कि आपका PNG बिल कैसे बनता है।
          </p>
          <Link
            href="/hi/gas"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            गैस बिल कैलकुलेटर खोलें →
          </Link>
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
          अंतिम अपडेट: {LAST_UPDATED}। $9.89 की सीलिंग, $11.22 की फॉर्मूला कीमत और $7.00 की
          सीमा PPAC की 30 सितंबर 2026 की दो अधिसूचनाओं से ली गई हैं। पिछली $8.90 की सीलिंग,
          न्यू-वेल प्रीमियम, बताए गए फील्ड और नीति का मकसद PTI की 4 अक्टूबर 2026 की रिपोर्ट
          (ETEnergyWorld के ज़रिए) के अनुसार हैं और उन अधिसूचनाओं में नहीं हैं। हम आंकड़े कैसे
          जुटाते और जांचते हैं, इसके लिए हमारी{' '}
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
