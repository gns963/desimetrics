import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/odisha-ev-policy-extended-december-2026'
const TITLE =
  'ओडिशा EV सब्सिडी 2026: रकम, आखिरी तारीख और बिजली बिल पर चार्जिंग का खर्च'
const DESCRIPTION =
  'ओडिशा ने अपनी इलेक्ट्रिक व्हीकल पॉलिसी, 2021 को 31 दिसंबर 2026 तक बढ़ा दिया है। ओडिशा EV सब्सिडी टू-व्हीलर के लिए ₹20,000 तक, थ्री-व्हीलर के लिए ₹30,000 और फोर-व्हीलर के लिए ₹1.5 लाख तक है, और रोड टैक्स माफ है।'
const LAST_UPDATED = '6 अक्टूबर 2026'
const AS_OF = '4 अक्टूबर 2026'
const POLICY_URL =
  'https://ct.odisha.gov.in/sites/default/files/2023-07/EV%20Policy%20-%202021(Amended%202023)_0.pdf'
const TARIFF_URL =
  'https://www.orierc.org/CuteSoft_Client/writereaddata/upload/DISCOMs_Tariff_Notification_FY_2026-27.PDF'

export const metadata: Metadata = {
  title: 'ओडिशा EV सब्सिडी 2026: पॉलिसी 31 दिसंबर तक बढ़ी',
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
  datePublished: '2026-10-06',
  dateModified: '2026-10-06',
  mainEntityOfPage: `${SITE}/hi${PATH}`,
}

const faqs = [
  {
    q: 'ओडिशा EV पॉलिसी कब तक मान्य है?',
    a: 'ओडिशा इलेक्ट्रिक व्हीकल पॉलिसी, 2021 अब 31 दिसंबर 2026 तक मान्य है। PTI की रिपोर्ट के अनुसार वाणिज्य और परिवहन विभाग ने पॉलिसी के पैरा 11.5 के तहत 3 अक्टूबर 2026 को जारी अधिसूचना से इसे बढ़ाया।',
  },
  {
    q: 'टू-व्हीलर के लिए ओडिशा EV सब्सिडी कितनी है?',
    a: 'टू-व्हीलर के लिए ओडिशा EV सब्सिडी बैटरी क्षमता के प्रति kWh ₹5,000 है, अधिकतम ₹20,000 तक। 3 kWh के स्कूटर को ₹15,000 मिलते हैं, और 4 kWh या उससे बड़ी बैटरी ₹20,000 की अधिकतम सीमा तक पहुंच जाती है।',
  },
  {
    q: 'कार के लिए ओडिशा EV सब्सिडी कितनी है?',
    a: 'फोर-व्हीलर के लिए ओडिशा EV सब्सिडी बैटरी क्षमता के प्रति kWh ₹10,000 है, अधिकतम ₹1,50,000 तक। 15 kWh या उससे बड़ी बैटरी अधिकतम सीमा तक पहुंच जाती है।',
  },
  {
    q: 'क्या ओडिशा में इलेक्ट्रिक वाहनों पर रोड टैक्स माफ है?',
    a: 'हां। ओडिशा ने 29 अक्टूबर 2021 की अधिसूचना संख्या 9191 से पॉलिसी अवधि के लिए सभी श्रेणियों के इलेक्ट्रिक वाहनों को रजिस्ट्रेशन फीस और मोटर वाहन टैक्स से छूट दी।',
  },
  {
    q: 'ओडिशा EV सब्सिडी कैसे मिलती है?',
    a: 'सब्सिडी उस क्षेत्रीय परिवहन कार्यालय (RTO) द्वारा खरीदार के बैंक खाते में जमा की जाती है जहां वाहन रजिस्टर होता है। निर्माता को मॉडल और उसकी बैटरी क्षमता ओडिशा EV सब्सिडी पोर्टल पर रजिस्टर करनी होती है।',
  },
  {
    q: 'ओडिशा EV सब्सिडी किसे नहीं मिलती?',
    a: 'अप्रैल 2023 के संशोधन के बाद जारी परिवहन आयुक्त के पत्र के अनुसार सरकारी विभागों और कार्यालयों द्वारा खरीदे गए इलेक्ट्रिक वाहन सब्सिडी के हकदार नहीं हैं।',
  },
  {
    q: 'ओडिशा में घर पर EV चार्ज करने में कितना खर्च आता है?',
    a: 'ओडिशा में घर पर चार्जिंग ₹2.90 से ₹6.10 प्रति यूनिट के घरेलू टैरिफ पर बिल होती है। 3 kWh की स्कूटर बैटरी भरने में 90% चार्जर एफिशिएंसी पर करीब 3.33 यूनिट लगती हैं, जिसका खर्च ₹6.10 की सबसे ऊंची स्लैब दर पर करीब ₹20 आता है।',
  },
  {
    q: 'ओडिशा में EV चार्जिंग स्टेशन का टैरिफ क्या है?',
    a: 'ओडिशा में पब्लिक चार्जिंग स्टेशन 1 अप्रैल 2026 से जनरल पर्पस श्रेणी में ₹5.00 प्रति यूनिट के सिंगल-पार्ट टैरिफ पर बिल होते हैं। यह वह रकम है जो स्टेशन बिजली के लिए चुकाता है; ड्राइवर से ली जाने वाली कीमत स्टेशन ऑपरेटर तय करता है।',
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

const subsidyRows: [string, string, string][] = [
  ['टू-व्हीलर', 'बैटरी के प्रति kWh ₹5,000', '₹20,000'],
  ['थ्री-व्हीलर', 'प्रति वाहन तय रकम', '₹30,000'],
  ['फोर-व्हीलर', 'बैटरी के प्रति kWh ₹10,000', '₹1,50,000'],
  ['यात्री बस', 'वाहन की कीमत का 10%', 'नॉन-AC ₹2 लाख, AC ₹3 लाख, AC डीलक्स ₹4 लाख'],
  ['माल वाहक', 'तय रकम, पहले 5,000 रजिस्टर्ड वाहनों के लिए', '₹30,000'],
]

const exampleRows: [string, string, string][] = [
  ['स्कूटर, 2 kWh बैटरी', '2 × ₹5,000', '₹10,000'],
  ['स्कूटर, 3 kWh बैटरी', '3 × ₹5,000', '₹15,000'],
  ['स्कूटर, 4.5 kWh बैटरी', '4.5 × ₹5,000 = ₹22,500, सीमा लागू', '₹20,000'],
  ['कार, 30 kWh बैटरी', '30 × ₹10,000 = ₹3,00,000, सीमा लागू', '₹1,50,000'],
]

const tariffRows: [string, string][] = [
  ['महीने में 50 यूनिट तक', '₹2.90'],
  ['51–200 यूनिट', '₹4.70'],
  ['201–400 यूनिट', '₹5.70'],
  ['400 यूनिट से ऊपर', '₹6.10'],
]

const chargeRows: [string, string, string, string][] = [
  ['स्कूटर, 3 kWh', '3.33', '₹15.67', '₹20.33'],
  ['कार, 30 kWh', '33.33', '₹156.67', '₹203.33'],
]

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

export default function OdishaEvPolicyPageHi() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'न्यूज़', href: '/hi/news' },
          { label: 'ओडिशा EV सब्सिडी', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> ओडिशा · EV पॉलिसी · OERC
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '📅', big: '31 दिसंबर 2026', small: 'पॉलिसी इस तारीख तक मान्य', tone: 'caution-amber' },
          { icon: '🛵', big: '₹20,000', small: 'टू-व्हीलर की अधिकतम सब्सिडी', tone: 'hub' },
          { icon: '🚗', big: '₹1.5 लाख', small: 'फोर-व्हीलर की अधिकतम सब्सिडी', tone: 'hub' },
          { icon: '🔌', big: '₹2.90–6.10', small: 'घर पर चार्जिंग, प्रति यूनिट', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          लेखक:{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics संपादकीय टीम
          </Link>{' '}
          · अंतिम अपडेट {LAST_UPDATED} · जानकारी {AS_OF} तक की ·{' '}
          <a
            href={POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            मुख्य स्रोत: ओडिशा EV पॉलिसी (संशोधित 2023)
          </a>{' '}
          ·{' '}
          <a
            href="https://energy.economictimes.indiatimes.com/news/power/odisha-extends-ev-policy-validity-till-december-31-2026-to-boost-green-mobility/134674590"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            खबर का स्रोत: PTI, ETEnergyWorld के ज़रिए
          </a>
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>
            ओडिशा EV सब्सिडी अब 31 दिसंबर 2026 तक चलेगी, क्योंकि राज्य ने ओडिशा इलेक्ट्रिक
            व्हीकल पॉलिसी, 2021 को बढ़ा दिया है।
          </strong>{' '}
          PTI की रिपोर्ट के अनुसार वाणिज्य और परिवहन विभाग ने यह विस्तार 3 अक्टूबर 2026 को जारी
          किया। 26 अप्रैल 2023 को संशोधित पॉलिसी के तहत सब्सिडी टू-व्हीलर के लिए ₹5,000 प्रति
          kWh (अधिकतम ₹20,000), थ्री-व्हीलर के लिए तय ₹30,000, और फोर-व्हीलर के लिए ₹10,000
          प्रति kWh (अधिकतम ₹1,50,000) है, और रोड टैक्स तथा रजिस्ट्रेशन फीस माफ है। यह लेख बताता
          है कि क्या बदला, वाहन के प्रकार के अनुसार सब्सिडी कितनी है, यह कैसे मिलती है, ओडिशा के
          बिजली टैरिफ पर चार्जिंग का खर्च कितना है, और आखिरी तारीख क्या है।
        </p>

        <section aria-labelledby="what-changed" className="mt-10 scroll-mt-20">
          <h2 id="what-changed" className={h2Cls}>
            ओडिशा EV पॉलिसी में क्या बदला?
          </h2>
          <p className={pCls}>
            ओडिशा EV पॉलिसी में एक चीज़ बदली है: इसकी वैधता की तारीख, जो अब 31 दिसंबर 2026 है।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">नई अंतिम तारीख:</strong> पॉलिसी 31 दिसंबर 2026
              तक मान्य है, जो पॉलिसी के पैरा 11.5 के तहत जारी अधिसूचना से हुआ; यह पैरा राज्य
              सरकार को किसी भी प्रावधान में संशोधन की अनुमति देता है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">पहले की अंतिम तारीख:</strong> विभाग की अपनी
              सब्सिडी अधिसूचना में पॉलिसी अवधि 31 दिसंबर 2025 तक बताई गई थी।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">रकम में बदलाव नहीं:</strong> विस्तार की
              रिपोर्टों में सब्सिडी की रकम में किसी बदलाव का ज़िक्र नहीं है, इसलिए अप्रैल 2023
              की दरें जारी हैं।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            हमने विस्तार की अधिसूचना खुद नहीं देखी है, और रिपोर्टें यह नहीं बतातीं कि 1 जनवरी
            2026 से अधिसूचना तक हुई खरीद के साथ क्या होगा। इस बात पर भरोसा करने से पहले अपने
            क्षेत्रीय परिवहन कार्यालय से पुष्टि करें।
          </p>
          <p className={takeawayCls}>
            निचोड़: ओडिशा EV सब्सिडी और टैक्स माफी 31 दिसंबर 2026 तक रजिस्टर होने वाले वाहनों
            के लिए उपलब्ध रहेगी।
          </p>
        </section>

        <section aria-labelledby="amounts" className="mt-10 scroll-mt-20">
          <h2 id="amounts" className={h2Cls}>
            वाहन के प्रकार के अनुसार ओडिशा EV सब्सिडी कितनी है?
          </h2>
          <p className={pCls}>
            ओडिशा EV सब्सिडी वाहन के प्रकार पर, और टू-व्हीलर तथा फोर-व्हीलर के लिए बैटरी क्षमता
            पर निर्भर है। तालिका पांचों श्रेणियों की दर और अधिकतम रकम देती है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                ओडिशा EV खरीद सब्सिडी, वाहन श्रेणी, दर और अधिकतम रकम के अनुसार
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">वाहन</th>
                  <th className="px-4 py-2 font-semibold">गणना कैसे होती है</th>
                  <th className="px-4 py-2 font-semibold">अधिकतम सब्सिडी</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {subsidyRows.map(([vehicle, rate, max]) => (
                  <tr key={vehicle}>
                    <td className="px-4 py-2 font-medium">{vehicle}</td>
                    <td className="px-4 py-2">{rate}</td>
                    <td className="px-4 py-2 tabular-nums">{max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            कुछ रिपोर्टों में वाहन की कीमत का 15%, ₹5,000, ₹10,000 और ₹50,000 की सीमा के साथ, भी
            लिखा है। ये 2021 की मूल दरें हैं। परिवहन आयुक्त का एक पत्र बताता है कि ये 1 सितंबर
            2021 से 26 अप्रैल 2023 तक खरीदे गए वाहनों पर लागू हैं, और 26 अप्रैल 2023 या उसके बाद
            की खरीद पर तालिका की संशोधित दरें मिलती हैं। PTI की रिपोर्ट बस के लिए ₹4 लाख से ₹20
            लाख की रेंज देती है; हमने जो पॉलिसी पढ़ी उसमें बस की सब्सिडी ₹4 लाख तक सीमित है।
          </p>
          <p className={takeawayCls}>
            निचोड़: आज की खरीद पर प्रति-kWh दरें लागू हैं, पुराना 15% वाला नियम नहीं।
          </p>
        </section>

        <section aria-labelledby="example" className="mt-10 scroll-mt-20">
          <h2 id="example" className={h2Cls}>
            ओडिशा EV सब्सिडी कैसे निकाली जाती है? उदाहरण
          </h2>
          <p className={pCls}>
            सब्सिडी kWh में बैटरी क्षमता को प्रति-kWh दर से गुणा करके निकलती है, अधिकतम सीमा तक।
            तालिका चार उदाहरण दिखाती है; ₹1.2 लाख कीमत के 3 kWh बैटरी वाले स्कूटर को ₹15,000
            मिलते हैं, उसकी कीमत चाहे जो हो।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                बैटरी क्षमता के अनुसार ओडिशा EV सब्सिडी की उदाहरण गणना
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">वाहन (उदाहरण)</th>
                  <th className="px-4 py-2 font-semibold">गणना</th>
                  <th className="px-4 py-2 font-semibold">सब्सिडी</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {exampleRows.map(([vehicle, calc, amount]) => (
                  <tr key={vehicle}>
                    <td className="px-4 py-2 font-medium">{vehicle}</td>
                    <td className="px-4 py-2">{calc}</td>
                    <td className="px-4 py-2 tabular-nums">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            टू-व्हीलर 4 kWh पर और फोर-व्हीलर 15 kWh पर अपनी अधिकतम सीमा तक पहुंच जाता है। पेट्रोल
            के मुकाबले चलाने का खर्च देखने के लिए हमारा{' '}
            <Link href="/financial/ev-vs-fuel-cost-calculator" className="text-brass underline">
              EV बनाम फ्यूल कॉस्ट कैलकुलेटर
            </Link>{' '}
            (अंग्रेज़ी में) इस्तेमाल करें।
          </p>
          <p className={takeawayCls}>
            निचोड़: सब्सिडी बैटरी के आकार पर चलती है, इसलिए वाहन की कीमत से यह नहीं बदलती।
          </p>
        </section>

        <section aria-labelledby="tax" className="mt-10 scroll-mt-20">
          <h2 id="tax" className={h2Cls}>
            क्या ओडिशा में इलेक्ट्रिक वाहनों पर रोड टैक्स माफ है?
          </h2>
          <p className={pCls}>
            ओडिशा में इलेक्ट्रिक वाहनों पर रोड टैक्स माफ है, और रजिस्ट्रेशन फीस भी, पॉलिसी अवधि
            के लिए।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">रजिस्ट्रेशन फीस और मोटर वाहन टैक्स</strong> से
              सभी श्रेणियों के इलेक्ट्रिक वाहनों को 29 अक्टूबर 2021 की अधिसूचना संख्या 9191 से
              छूट मिली है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">ब्याज सहायता</strong> के रूप में निजी इलेक्ट्रिक
              वाहनों के लोन पर 5% की छूट का प्रावधान भी पॉलिसी में है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">थ्री-व्हीलर</strong> को इसी पॉलिसी के तहत ऑटो के
              लिए ओपन परमिट मिलता है।
            </Bullet>
          </ul>
          <p className={takeawayCls}>
            निचोड़: टैक्स माफी खरीद सब्सिडी के ऊपर मिलती है, उसकी जगह नहीं।
          </p>
        </section>

        <section aria-labelledby="claim" className="mt-10 scroll-mt-20">
          <h2 id="claim" className={h2Cls}>
            ओडिशा EV सब्सिडी कैसे मिलती है?
          </h2>
          <p className={pCls}>
            ओडिशा EV सब्सिडी उस क्षेत्रीय परिवहन कार्यालय द्वारा खरीदार के बैंक खाते में जमा की
            जाती है जहां वाहन रजिस्टर होता है। पॉलिसी की अधिसूचनाएं और विभाग के पत्र तीन चरण और
            दो शर्तें बताते हैं।
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-ash/80">
            <li>
              सबसे पहले निर्माता मॉडल और उसकी बैटरी क्षमता ओडिशा EV सब्सिडी पोर्टल पर रजिस्टर
              करता है; प्रति-kWh सब्सिडी इसी प्रविष्टि पर निर्भर है।
            </li>
            <li>फिर वाहन ओडिशा के किसी क्षेत्रीय परिवहन कार्यालय में रजिस्टर होता है।</li>
            <li>अंत में वही कार्यालय सब्सिडी खरीदार के बैंक खाते में जमा करता है।</li>
          </ol>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">पात्र नहीं:</strong> सरकारी विभागों और
              कार्यालयों द्वारा खरीदे गए वाहन।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">टू-व्हीलर की शर्तें:</strong> कम से कम 40 किमी
              प्रति घंटा की टॉप स्पीड, 100 किमी पर 7 kWh से ज़्यादा ऊर्जा खपत नहीं, और कम से कम
              तीन साल की वारंटी जिसमें बैटरी शामिल हो।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            निवास की शर्त, कीमत की सीमा या एक व्यक्ति एक वाहन की सीमा के लिए हमें कोई आधिकारिक
            स्रोत नहीं मिला, इसलिए हम ऐसा कुछ नहीं बता रहे। कौन से दस्तावेज़ चाहिए, यह अपने
            डीलर या परिवहन कार्यालय से पूछें।
          </p>
          <p className={takeawayCls}>
            निचोड़: पैसा रजिस्ट्रेशन के बाद परिवहन कार्यालय से आपके खाते में आता है।
          </p>
        </section>

        <section aria-labelledby="charging" className="mt-10 scroll-mt-20">
          <h2 id="charging" className={h2Cls}>
            ओडिशा के बिजली टैरिफ पर EV चार्जिंग का खर्च कितना है?
          </h2>
          <p className={pCls}>
            ओडिशा में घर पर EV चार्जिंग का खर्च ₹2.90 से ₹6.10 प्रति यूनिट है, क्योंकि यह सामान्य
            घरेलू टैरिफ पर बिल होती है। तालिका ओडिशा विद्युत नियामक आयोग (OERC) के 1 अप्रैल 2026
            से लागू टैरिफ के चारों स्लैब देती है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                ओडिशा के घरेलू बिजली टैरिफ स्लैब, 1 अप्रैल 2026 से लागू
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">मासिक खपत</th>
                  <th className="px-4 py-2 font-semibold">दर प्रति यूनिट</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {tariffRows.map(([slab, rate]) => (
                  <tr key={slab}>
                    <td className="px-4 py-2 font-medium">{slab}</td>
                    <td className="px-4 py-2 tabular-nums">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 ${pCls}`}>
            चार्जिंग घर की मौजूदा खपत के ऊपर यूनिट जोड़ती है, इसलिए इसकी कीमत उस स्लैब की होती
            है जिसमें ये अतिरिक्त यूनिट पड़ती हैं। अगली तालिका 90% चार्जर एफिशिएंसी मानकर दो
            स्लैब दरों पर एक पूरे चार्ज का खर्च दिखाती है।
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                ओडिशा में घर पर एक पूरे चार्ज का खर्च, ₹4.70 और ₹6.10 प्रति यूनिट पर
              </caption>
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">बैटरी</th>
                  <th className="px-4 py-2 font-semibold">ली गई यूनिट</th>
                  <th className="px-4 py-2 font-semibold">₹4.70 पर</th>
                  <th className="px-4 py-2 font-semibold">₹6.10 पर</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {chargeRows.map(([battery, units, mid, top]) => (
                  <tr key={battery}>
                    <td className="px-4 py-2 font-medium">{battery}</td>
                    <td className="px-4 py-2 tabular-nums">{units}</td>
                    <td className="px-4 py-2 tabular-nums">{mid}</td>
                    <td className="px-4 py-2 tabular-nums">{top}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">पब्लिक चार्जिंग स्टेशन</strong> जनरल पर्पस
              श्रेणी में ₹5.00 प्रति यूनिट के सिंगल-पार्ट टैरिफ पर बिल होते हैं। यह स्टेशन की
              बिजली की लागत है; ड्राइवर से ली जाने वाली कीमत ऑपरेटर तय करता है।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">हाउसिंग सोसाइटी के चार्जर</strong>, जो अलग
              कनेक्शन पर हों, पब्लिक चार्जिंग स्टेशन माने जाते हैं।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">चारों वितरण कंपनियां</strong> — TPCODL, TPWODL,
              TPSODL और TPNODL — यही एक टैरिफ इस्तेमाल करती हैं। इलेक्ट्रिसिटी ड्यूटी इसके ऊपर
              लगती है।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            अपना आंकड़ा{' '}
            <Link href="/hi/electricity/ev-charging-cost-calculator" className="text-brass underline">
              EV चार्जिंग कॉस्ट कैलकुलेटर
            </Link>{' '}
            से निकालें, या पूरा बिल{' '}
            <Link
              href="/electricity/odisha-electricity-bill-calculator"
              className="text-brass underline"
            >
              ओडिशा बिजली बिल कैलकुलेटर
            </Link>{' '}
            (अंग्रेज़ी में) में देखें।
          </p>
          <p className={takeawayCls}>
            निचोड़: घर पर स्कूटर का एक पूरा चार्ज करीब ₹16 से ₹20 का पड़ता है, और 30 kWh की कार
            का करीब ₹157 से ₹203 का।
          </p>
        </section>

        <section id="what-to-watch" aria-labelledby="what-to-watch-heading" className="mt-10 scroll-mt-20">
          <h2 id="what-to-watch-heading" className={h2Cls}>
            आखिरी तारीख और आगे किस पर नज़र रखें
          </h2>
          <p className={pCls}>
            आखिरी तारीख 31 दिसंबर 2026 है, और उसके बाद क्या होगा यह दो बातों से तय होगा।
          </p>
          <ul className="mt-4 space-y-2">
            <Bullet>
              <strong className="text-ink-navy">नई पॉलिसी का मसौदा मौजूद है।</strong> Organiser
              की 10 सितंबर 2025 की रिपोर्ट के अनुसार राज्य ने सितंबर 2025 में ड्राफ्ट ओडिशा
              इलेक्ट्रिक व्हीकल पॉलिसी, 2025 परामर्श के लिए जारी की। इसके अधिसूचित होने की कोई
              रिपोर्ट हमें नहीं मिली।
            </Bullet>
            <Bullet>
              <strong className="text-ink-navy">टैरिफ की समीक्षा हर साल होती है।</strong> ऊपर की
              OERC दरें 1 अप्रैल 2026 से लागू हुईं और आयोग के अगले आदेश तक जारी रहेंगी।
            </Bullet>
          </ul>
          <p className={`mt-4 ${pCls}`}>
            हम आगे के विस्तार के बारे में कोई अनुमान नहीं लगाते। {AS_OF} तक की जानकारी के अनुसार
            ओडिशा EV सब्सिडी और रोड टैक्स माफी 31 दिसंबर 2026 तक लागू हैं।
          </p>
        </section>

        <section
          aria-labelledby="cta"
          className="mt-10 rounded-2xl border border-hub-electricity/40 bg-mist p-6"
        >
          <h2 id="cta" className="font-display text-xl font-bold text-ink-navy">
            देखें कि चार्जिंग आपके ओडिशा के बिल में कितना जोड़ती है
          </h2>
          <p className={`mt-2 ${pCls}`}>
            चार्जिंग समेत अपनी मासिक यूनिट डालें, और मौजूदा ओडिशा स्लैब पर बिल देखें।
          </p>
          <Link
            href="/electricity/odisha-electricity-bill-calculator"
            className="mt-4 inline-block rounded-lg bg-ink-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            ओडिशा बिजली बिल कैलकुलेटर खोलें →
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
          अंतिम अपडेट: {LAST_UPDATED}; जानकारी {AS_OF} तक की। सब्सिडी की रकम, टैक्स माफी, भुगतान
          की प्रक्रिया और पात्रता की शर्तें ओडिशा इलेक्ट्रिक व्हीकल पॉलिसी, 2021 और उसकी गजट
          अधिसूचनाओं से हैं, जिनमें 26 अप्रैल 2023 का संशोधन शामिल है, और 2023 के परिवहन आयुक्त
          के एक पत्र से। 31 दिसंबर 2026 तक का विस्तार PTI की रिपोर्ट के अनुसार है; वह अधिसूचना
          हमें नहीं मिली। टैरिफ{' '}
          <a href={TARIFF_URL} target="_blank" rel="noopener noreferrer" className="text-brass underline">
            FY 2026-27 की OERC रिटेल सप्लाई टैरिफ अधिसूचना
          </a>{' '}
          से हैं। चार्जिंग के खर्च में 90% चार्जर एफिशिएंसी मानी गई है और इलेक्ट्रिसिटी ड्यूटी
          शामिल नहीं है। हम आंकड़े कैसे जुटाते और जांचते हैं, इसके लिए हमारी{' '}
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
