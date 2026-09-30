import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gerc-liquidated-damages-wind-solar-gujarat'
const TITLE = 'देरी से बने सोलर और विंड प्रोजेक्ट कोर्ट तक क्यों पहुंचते हैं — और गुजरात के बिजली बिल के लिए इसका क्या मतलब है'
const DESCRIPTION =
  'GERC ने दो रिन्यूएबल डेवलपर्स को GUVNL के साथ कमीशनिंग देरी और लिक्विडेटेड डैमेजेस पर अपने विवाद में संशोधन की इजाज़त दी — एक 140 MW विंड प्रोजेक्ट और एक 200 MW सोलर प्रोजेक्ट। दोनों विवाद अभी तय नहीं हुए। यहां असल में क्या आदेश दिया गया, और प्रोजेक्ट में देरी का आपके बिल से क्या संबंध है।'
const LAST_UPDATED = '30 सितंबर 2026'
const DATA_AS_OF = '30 सितंबर 2026'

export const metadata: Metadata = {
  title: 'GERC विंड और सोलर लिक्विडेटेड डैमेजेस विवाद — समझाया गया',
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
  datePublished: '2026-09-30',
  dateModified: '2026-09-30',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'क्या GERC ने फैसला दिया है कि GUVNL को वसूली गई लिक्विडेटेड डैमेजेस वापस करनी होगी?',
    a: 'नहीं। GERC ने सिर्फ दोनों डेवलपर्स को पहले से लंबित याचिकाओं में अपने रिफंड दावे औपचारिक रूप से जोड़ने की इजाज़त दी है — यह एक प्रक्रियात्मक कदम है, फैसला नहीं। GERC के अपने आदेश में कहा गया है कि यह संशोधन "किसी भी पक्ष के दावों के गुण-दोष पर फैसला नहीं बनता।" दोनों मुख्य विवाद GUVNL के जवाब (8 अक्टूबर 2026 तक देय) और हर डेवलपर के रिजॉइंडर (22 अक्टूबर 2026 तक देय) दाखिल होने के बाद सुने जाएंगे।',
  },
  {
    q: 'सोलर या विंड पावर परचेज़ एग्रीमेंट में लिक्विडेटेड डैमेजेस (LD) क्या है?',
    a: 'एक पहले से तय जुर्माना जो डेवलपर को अपने PPA में शेड्यूल्ड कमर्शियल ऑपरेशन डेट (SCOD) चूकने पर देना होता है, जो कॉन्ट्रैक्ट में दिए फॉर्मूले से तय होता है। DISCOM आमतौर पर इसे डेवलपर के मासिक पावर-सप्लाई इनवॉइस से काटकर, या PPA साइन करते समय डेवलपर की दी गई परफॉर्मेंस बैंक गारंटी में से भुनाकर वसूलते हैं — यहां दोनों मामलों में GUVNL ने ठीक यही किया।',
  },
  {
    q: 'SCOD और COD में क्या फर्क है?',
    a: 'SCOD (शेड्यूल्ड कमर्शियल ऑपरेशन डेट) वह डेडलाइन है जो PPA किसी प्रोजेक्ट के चालू होने के लिए तय करता है। COD (कमर्शियल ऑपरेशन डेट) वह तारीख है जब वह असल में चालू होता है। जब COD, SCOD के बाद आता है, तो दोनों के बीच का अंतर ही वह है जिस पर लिक्विडेटेड डैमेजेस की गणना होती है — जब तक कि उस अंतर के कुछ या पूरे हिस्से को माफ करने वाला फोर्स मेज्योर दावा स्वीकार न हो।',
  },
  {
    q: 'भारत में रिन्यूएबल एनर्जी प्रोजेक्ट के लिए फोर्स मेज्योर क्या माना जाता है?',
    a: 'डेवलपर के उचित नियंत्रण से वाकई बाहर की घटनाएं जो समय पर कमीशनिंग को रोकती हैं — यहां विंड डेवलपर ने ग्रिड कनेक्टिविटी अप्रूवल में देरी, भारी बारिश, बाढ़, चक्रवाती मौसम और एक खदान पर हड़ताल का हवाला दिया। कोई खास घटना असल में योग्य है या नहीं, और वह SCOD का कितना समय माफ करने लायक ठहराती है, यह एक तथ्यात्मक और कॉन्ट्रैक्चुअल सवाल है जो GERC को हर मामले में अलग से तय करना होता है — यह अपने-आप नहीं होता, और यहां किसी भी मामले में अभी यह सवाल तय नहीं हुआ है।',
  },
  {
    q: 'क्या ये दोनों विवाद अभी मेरे बिजली बिल पर असर डालते हैं?',
    a: 'सीधे और अभी नहीं। कोई भी मामला अभी तय नहीं हुआ। अलग से, GUVNL की बिजली-खरीद लागत — जिसमें देरी से बने प्रोजेक्ट से सप्लाई की कमी संभालने की लागत भी शामिल है — समय के साथ उपभोक्ता बिलों में FPPPA (फ्यूल एंड पावर परचेज़ प्राइस एडजस्टमेंट) नाम के तंत्र से पहुंचती है, जो GERC-अप्रूव्ड तिमाही एडजस्टमेंट है। यह नहीं दिखाया गया कि ये दोनों खास विवाद उस आंकड़े को किसी भी दिशा में हिलाते हैं — इसे यह तंत्र कैसे काम करता है, इसकी पृष्ठभूमि मानें, अपने बिल के बारे में कोई दावा नहीं।',
  },
  {
    q: 'हर मामले में GUVNL ने कितनी लिक्विडेटेड डैमेजेस वसूली?',
    a: 'Project Twelve Renewables की अपनी GERC याचिका के मुताबिक, GUVNL ने 140 MW विंड प्रोजेक्ट के इनवॉइस से ₹14,40,26,667 (करीब ₹14.40 करोड़) वसूले। Martial Solren की याचिका के मुताबिक, GUVNL ने 200 MW सोलर प्रोजेक्ट से ₹9,17,77,778 (करीब ₹9.18 करोड़) वसूले। दोनों डेवलपर्स का कहना है कि उन्होंने विरोध के तहत, अपने अधिकार को बिना नुकसान पहुंचाए भुगतान किया।',
  },
  {
    q: 'GERC ने डेवलपर्स को नई याचिका दाखिल करने की बजाय याचिका में संशोधन की इजाज़त क्यों दी?',
    a: 'दोनों आदेशों में GERC का तर्क एक जैसा था: लिक्विडेटेड-डैमेजेस की वसूली मूल याचिका दाखिल होने के बाद हुई, लेकिन यह उसी मूल सवाल से सीधे जुड़ी है जो पहले से कमीशन के सामने है — क्या देरी फोर्स मेज्योर के दायरे में आती है। इसे एक ही विवाद के तौर पर सुनना, GERC ने कहा, डेवलपर्स को असल में उसी अंतर्निहित विवाद पर अलग मुकदमेबाज़ी में धकेलने से बचाता है, और GUVNL को कोई नुकसान नहीं होता क्योंकि उसे संशोधित दावों का जवाब देने का पूरा मौका अब भी मिलता है।',
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

function Timeline({
  label,
  steps,
}: {
  label: string
  steps: { date: string; title: string; note?: string; delay?: string }[]
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">{label}</p>
      <ol className="relative mt-3 space-y-5 border-l-2 border-hairline pl-6">
        {steps.map((s) => (
          <li key={s.title} className="relative">
            <span className="absolute top-1 -left-[29px] h-3 w-3 rounded-full border-2 border-hub-news bg-paper" />
            <p className="text-xs font-semibold tabular-nums text-ash/50">{s.date}</p>
            <p className="font-display font-bold text-ink-navy">
              {s.title}
              {s.delay && (
                <span className="ml-2 rounded-full bg-caution-amber/15 px-2 py-0.5 text-xs font-semibold text-caution-amber">
                  {s.delay}
                </span>
              )}
            </p>
            {s.note && <p className="mt-0.5 text-sm text-ash/70">{s.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function GercLdDisputePageHi() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'न्यूज़', href: '/hi/news' },
          { label: 'GERC विंड और सोलर LD विवाद', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> गुजरात · GERC · GUVNL
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚖️', big: '2', small: 'संशोधन की इजाज़त, फैसला नहीं', tone: 'hub' },
          { icon: '💨', big: '₹14.40cr', small: 'LD वसूली, विंड प्रोजेक्ट', tone: 'caution-amber' },
          { icon: '☀️', big: '₹9.18cr', small: 'LD वसूली, सोलर प्रोजेक्ट', tone: 'caution-amber' },
          { icon: '📅', big: '8 व 22 अक्टूबर', small: 'जवाब / रिजॉइंडर देय', tone: 'hub' },
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
          एक ही दिन, उसी गुजरात इलेक्ट्रिसिटी रेगुलेटरी कमीशन बेंच ने दो रिन्यूएबल एनर्जी
          डेवलपर्स को गुजरात ऊर्जा विकास निगम लिमिटेड (GUVNL) के खिलाफ पहले से लंबित विवादों
          में नए तथ्य जोड़ने की इजाज़त दी — एक अमरेली जिले में 140 MW विंड प्रोजेक्ट पर, एक
          अरावली जिले में 200 MW सोलर प्रोजेक्ट पर। दोनों विवाद एक ही मूल सवाल पर हैं: क्या
          प्रोजेक्ट में देरी वाकई डेवलपर्स के नियंत्रण से बाहर थी, और क्या GUVNL ने उनके
          इनवॉइस से जो लिक्विडेटेड डैमेजेस पहले ही काटी, वह वापस मिलनी चाहिए। इनमें से किसी
          सवाल का जवाब अभी नहीं मिला है — इस बार GERC ने असल में जो तय किया वह इससे कहीं
          संकरा है, और सटीक रूप से समझने लायक है।
        </p>

        <section aria-labelledby="what-decided" className="mt-10 scroll-mt-20">
          <h2 id="what-decided" className={h2Cls}>
            GERC ने असल में क्या तय किया
          </h2>
          <p className={pCls}>
            23 सितंबर 2026 को दिए गए दो अलग-अलग आदेशों में, अध्यक्ष पंकज जोशी और सदस्य जतिन
            एन. ठक्कर की GERC बेंच ने हर डेवलपर को अपनी याचिका में संशोधन की इजाज़त दी, ताकि
            मूल याचिका दाखिल होने के बाद हुई घटनाओं को औपचारिक रूप से जोड़ा जा सके — मुख्य रूप
            से, GUVNL द्वारा आगे वसूली गई लिक्विडेटेड डैमेजेस, और हर डेवलपर का उससे बना रिफंड
            दावा। दोनों आदेशों में GERC का तर्क एक जैसा था: नई वसूली गई लिक्विडेटेड डैमेजेस
            सीधे उसी फोर्स-मेज्योर सवाल से जुड़ी हैं जो पहले से कमीशन के सामने है, और सब कुछ
            एक साथ सुनना डेवलपर्स को असल में एक ही विवाद पर अलग मुकदमे में धकेलने से बचाता है।
          </p>
          <p className={`mt-3 ${pCls}`}>
            दोनों आदेश साफ कहते हैं कि इससे नतीजे पर कोई असर नहीं पड़ता। जैसा कि{' '}
            <a
              href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU4MDJfMjQtMDktMjAyNl82MDcxNjY1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              GERC के विंड मामले के आदेश में कहा गया है
            </a>
            , संशोधन की इजाज़त &ldquo;अपने आप में, किसी भी पक्ष के दावों के गुण-दोष पर फैसला
            नहीं बनती।&rdquo; क्या दोनों में से कोई डेवलपर असल में रिफंड का हकदार है — और क्या GUVNL का
            पैसा काटना सही था — यह अब भी कमीशन को तय करना बाकी है।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: यह इस बात का फैसला है कि मामले कैसे सुने जाएंगे, यह नहीं कि कौन सही है —
            किसी भी दावे को जो कहे कि GERC ने किसी डेवलपर का &ldquo;पक्ष लिया&rdquo; है, समय से पहले मानें।
          </p>
        </section>

        <section aria-labelledby="two-cases" className="mt-10 scroll-mt-20">
          <h2 id="two-cases" className={h2Cls}>
            दोनों मामले, साथ-साथ
          </h2>
          <p className={pCls}>
            अलग तकनीक, अलग जिला, एक जैसा विवाद — एक डेवलपर अपनी डेडलाइन चूकने के लिए मौसम और
            ग्रिड-कनेक्शन में देरी को ज़िम्मेदार बताता है, और GUVNL उस तर्क के लंबित रहते
            लिक्विडेटेड डैमेजेस वसूल लेता है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">Project Twelve Renewables (विंड)</th>
                  <th className="px-4 py-2 font-semibold">Martial Solren (सोलर)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">क्षमता</td>
                  <td className="px-4 py-2">140 MW (141.9 MW के रूप में चालू)</td>
                  <td className="px-4 py-2">200 MW, चार 50 MW ट्रांच में</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">स्थान</td>
                  <td className="px-4 py-2">अमरेली जिला</td>
                  <td className="px-4 py-2">अरावली जिला</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">PPA साइन</td>
                  <td className="px-4 py-2">15 दिसंबर 2022</td>
                  <td className="px-4 py-2">15 दिसंबर 2022</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">मूल SCOD</td>
                  <td className="px-4 py-2">14 दिसंबर 2024</td>
                  <td className="px-4 py-2">6 फरवरी 2025</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">असल कमीशनिंग</td>
                  <td className="px-4 py-2">चरणबद्ध, दिसंबर 2024 – जून 2025</td>
                  <td className="px-4 py-2">चरणबद्ध, फरवरी – जुलाई 2025</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">GUVNL द्वारा वसूली LD</td>
                  <td className="px-4 py-2 tabular-nums">₹14,40,26,667</td>
                  <td className="px-4 py-2 tabular-nums">₹9,17,77,778</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">बताए गए फोर्स मेज्योर आधार</td>
                  <td className="px-4 py-2">कनेक्टिविटी में देरी, भारी बारिश/बाढ़, चक्रवाती मौसम, खदान पर हड़ताल</td>
                  <td className="px-4 py-2">मुख्य याचिका में बताई गई फोर्स मेज्योर घटनाएं (उसी आधार पर विस्तार मांगा गया)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">GUVNL की मुख्य आपत्ति</td>
                  <td className="px-4 py-2">कार्यवाही काफी आगे बढ़ चुकी; कनेक्टिविटी समय पर उपलब्ध थी; LD, PPA क्लॉज़ 3.3 के तहत वैध</td>
                  <td className="px-4 py-2">कोई वैध फोर्स मेज्योर नहीं; डेवलपर ने कुछ देरी स्वीकारी; PPA में LD पर ब्याज का कोई प्रावधान नहीं</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Timeline
            label="Project Twelve Renewables — विंड, अमरेली जिला"
            steps={[
              { date: '14 दिस. 2024', title: 'मूल SCOD' },
              { date: '13 दिस. 2024', title: 'फेज़ 1 चालू', note: '39.6 MW', delay: 'समय पर' },
              { date: '11–12 फर. 2025', title: 'फेज़ 2 चालू', note: '29.7 MW' },
              { date: '19 मार्च 2025', title: 'फेज़ 3 चालू', note: '13.2 MW' },
              { date: 'अप्रैल–जून 2025', title: 'फेज़ 4–5 चालू', note: 'कई तारीखों में 59.4 MW' },
              { date: '23 जून 2025', title: 'पूरा 141.9 MW GUVNL को कन्फर्म' },
            ]}
          />
          <Timeline
            label="Martial Solren — सोलर, अरावली जिला"
            steps={[
              { date: '6 फर. 2025', title: 'मूल SCOD (ट्रांच 1)' },
              { date: '6 फर. 2025', title: 'ट्रांच 1 चालू (50 MW)', delay: 'समय पर' },
              { date: '13 मई 2025', title: 'ट्रांच 2 चालू (50 MW)', delay: '96 दिन देर' },
              { date: '3 जुलाई 2025', title: 'ट्रांच 3 चालू (50 MW)', delay: '147 दिन देर' },
              { date: '26 जुलाई 2025', title: 'ट्रांच 4 चालू (50 MW) — पूरा 200 MW', delay: '171 दिन देर' },
            ]}
          />
          <p className={takeawayCls}>
            निष्कर्ष: दोनों मामलों में, पहला ट्रांच या फेज़ समय पर पूरा हुआ — विवाद पूरी तरह
            इस बात पर है कि बाकी क्षमता में देरी क्यों हुई, और वह देरी किसके ज़िम्मे आती है।
          </p>
        </section>

        <section aria-labelledby="jargon" className="mt-10 scroll-mt-20">
          <h2 id="jargon" className={h2Cls}>
            शब्दावली, समझाई गई
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              [
                'SCOD (शेड्यूल्ड कमर्शियल ऑपरेशन डेट)',
                'वह डेडलाइन जो पावर परचेज़ एग्रीमेंट किसी प्रोजेक्ट के असल में बिजली सप्लाई शुरू करने के लिए तय करता है। यह एक कॉन्ट्रैक्चुअल तारीख है, जो PPA साइन होते समय तय होती है।',
              ],
              [
                'COD (कमर्शियल ऑपरेशन डेट)',
                'वह तारीख जब प्रोजेक्ट असल में चालू होकर PPA के तहत बिजली सप्लाई शुरू करता है। जब यह SCOD के बाद आती है, तो दोनों के बीच का अंतर ही वह है जिस पर लिक्विडेटेड डैमेजेस की गणना होती है।',
              ],
              [
                'लिक्विडेटेड डैमेजेस (LD)',
                'PPA के अपने फॉर्मूले में तय एक पहले से तय जुर्माना, जो SCOD चूकने पर डेवलपर को देना होता है। DISCOM आमतौर पर इसे मासिक इनवॉइस से काटकर, या डेवलपर की परफॉर्मेंस बैंक गारंटी — PPA साइन करते समय जमा की गई सिक्योरिटी डिपॉज़िट — के खिलाफ वसूलते हैं।',
              ],
              [
                'फोर्स मेज्योर',
                'किसी पक्ष के उचित नियंत्रण से वाकई बाहर की घटनाएं — मौसम, नियामक देरी, प्राकृतिक आपदाएं — जो, अगर नियामक स्वीकार करे, तो SCOD के बाद की कुछ या पूरी देरी को बिना LD देनदारी के माफ कर सकती हैं। स्वीकृति कभी अपने-आप नहीं होती: इसे खास तथ्यों के आधार पर हर मामले में अलग से दलील और तय किया जाता है।',
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
            निष्कर्ष: यहां दोनों विवाद पूरी तरह इस बात पर टिके हैं कि बताई गई घटनाएं फोर्स
            मेज्योर में गिनी जाती हैं या नहीं — बाकी सब कुछ उसी एक फैसले से तय होता है।
          </p>
        </section>

        <section aria-labelledby="consumer-link" className="mt-10 scroll-mt-20">
          <h2 id="consumer-link" className={h2Cls}>
            प्रोजेक्ट में देरी का उपभोक्ताओं से क्या संबंध है — और ये दोनों मामले अभी क्यों नहीं
          </h2>
          <p className={pCls}>
            GUVNL की बिजली-खरीद लागत — जिसमें किसी कॉन्ट्रैक्ट किए गए रिन्यूएबल प्रोजेक्ट के देर
            से आने पर सप्लाई की कमी संभालने की लागत भी शामिल है — सीधे या तुरंत नहीं, बल्कि
            समय के साथ <strong>FPPPA (फ्यूल एंड पावर परचेज़ प्राइस एडजस्टमेंट)</strong> नाम के
            तंत्र से घरेलू बिलों तक पहुंचती है। GERC हर साल एक बेस FPPPA दर तय करता है, जो
            पिछले सालों का औसत होती है, और GUVNL को असल और अप्रूव्ड बिजली-खरीद लागत के बीच किसी
            भी अतिरिक्त अंतर को तिमाही एडजस्टमेंट के ज़रिए वसूलने देता है — 10 पैसे/यूनिट से
            ज़्यादा किसी भी बढ़ोतरी के लिए कमीशन की पहले से मंज़ूरी ज़रूरी है। यह एक असली,
            रेगुलेटेड पास-थ्रू तंत्र है, कोई ब्लैक बॉक्स नहीं।
          </p>
          <p className={`mt-3 ${pCls}`}>
            जो हम यहां बताने के लिए सत्यापित नहीं कर सके, वह है एक खास, अभी लागू FPPPA दर —
            सर्च नतीजों में असंगत, अविश्वसनीय रूप से तारीख वाले आंकड़े मिले जिन्हें हमने न
            दोहराने का फैसला किया। इससे भी ज़्यादा ज़रूरी बात: किसी भी GERC आदेश में यह नहीं
            कहा गया कि ये दोनों खास विवाद GUVNL की FPPPA दर को किसी भी दिशा में बदलते हैं। यहां
            संबंध संरचनात्मक है — देरी से बनी रिन्यूएबल क्षमता एक DISCOM की बिजली-खरीद लागत को
            प्रभावित करने वाले कई कारकों में से एक है — यह दावा नहीं कि ये दोनों मामले आपका
            बिल बदल चुके हैं, या बदलेंगे।
          </p>
          <p className={takeawayCls}>
            निष्कर्ष: तंत्र को समझें, लेकिन यह उम्मीद न रखें कि इनमें से कोई मामला सीधे आपके
            बिल पर दिखेगा — FPPPA इस तरह काम नहीं करता, और कोई भी आदेश ऐसा नहीं कहता।
          </p>
        </section>

        <section aria-labelledby="whats-next" className="mt-10 scroll-mt-20">
          <h2 id="whats-next" className={h2Cls}>
            आगे क्या होगा
          </h2>
          <ol className="mt-3 space-y-3">
            {[
              [
                '8 अक्टूबर 2026',
                'दोनों मामलों में GUVNL का समेकित जवाब देय है, जो हर डेवलपर की संशोधित याचिका का पूरा जवाब देगा।',
              ],
              [
                '22 अक्टूबर 2026',
                'GUVNL के जवाब पर हर डेवलपर का रिजॉइंडर देय है, जिसके बाद दोनों मामलों में पलीडिंग्स बंद हो जाएंगी।',
              ],
              [
                'उसके बाद',
                'GERC हर मामले में मुख्य सुनवाई तय करेगा, जहां फोर्स-मेज्योर सवाल — और उसके साथ, कोई रिफंड दावा सफल होता है या नहीं — असल में तय होगा। किसी भी आदेश में अभी इसकी तारीख नहीं दी गई है।',
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
          <p className={takeawayCls}>
            निष्कर्ष: असली फैसला अभी हफ्तों से महीनों दूर है — 23 सितंबर को जो हुआ, उसने सिर्फ
            यह तय किया कि इसे कैसे दलील किया जाएगा।
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
                टेलिस्कोपिक स्लैब से अपना गुजरात बिजली बिल अनुमानित करें।
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
                गुजरात की असली टैरिफ पर रूफटॉप सोलर पेबैक।
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
                FPPPA जैसे फ्यूल/पावर-परचेज़ पास-थ्रू आपके बिल में कैसे फिट होते हैं।
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                सोलर ROI कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                अपने DISCOM की टैरिफ पर पेबैक और बचत।
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
          आखिरी अपडेट: {LAST_UPDATED}। मामले का ब्यौरा GERC के अपने 23 सितंबर 2026 के आदेशों के
          अनुसार है ({DATA_AS_OF} तक):{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU4MDJfMjQtMDktMjAyNl82MDcxNjY1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            याचिका संख्या 2314/2024 (विंड)
          </a>{' '}
          और{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3OTVfMjQtMDktMjAyNl8zODE0NjMy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            याचिका संख्या 2460/2025 (सोलर)
          </a>
          । इसे{' '}
          <a
            href="https://solarquarter.com/2026/09/29/gerc-allows-amendment-in-140-mw-wind-project-dispute-over-liquidated-damages-in-gujarat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            SolarQuarter (29 सितंबर 2026)
          </a>{' '}
          और{' '}
          <a
            href="https://solarquarter.com/2026/09/30/gerc-allows-amendment-in-liquidated-damages-dispute-over-200-mw-solar-project-in-gujarat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            SolarQuarter (30 सितंबर 2026)
          </a>{' '}
          ने भी रिपोर्ट किया, दोनों मोहन गुप्ता द्वारा। कोई भी विवाद गुण-दोष पर अभी तय नहीं
          हुआ — दोनों अभी पलीडिंग्स के चरण में हैं, GUVNL का जवाब 8 अक्टूबर 2026 तक और हर
          डेवलपर का रिजॉइंडर 22 अक्टूबर 2026 तक देय है। मौजूदा FPPPA दर को लिखे जाने तक किसी
          भरोसेमंद, तारीख वाले स्रोत से सत्यापित नहीं किया जा सका और जानबूझकर ऊपर नहीं बताया
          गया है — हम आंकड़े कैसे जुटाते और वेरिफाई करते हैं, इसके लिए हमारी{' '}
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
