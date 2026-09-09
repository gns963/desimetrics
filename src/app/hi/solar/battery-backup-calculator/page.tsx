import type { Metadata } from 'next'
import Link from 'next/link'
import SolarBatteryBackupCalculator, {
  type SolarBatteryBackupCalculatorTexts,
} from '@/components/calculators/SolarBatteryBackupCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { sizeSolarBattery } from '@/lib/calc/solar'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/battery-backup-calculator'

const example = sizeSolarBattery({ dailyLoadKwh: 3, daysOfAutonomy: 1, chemistry: 'lead-acid' })

export const metadata: Metadata = {
  title: 'सोलर बैटरी बैकअप कैलकुलेटर 2026 — kWh साइज़िंग (भारत)',
  description:
    'अपने क्रिटिकल दैनिक लोड और स्वायत्तता के दिनों से, अपने सोलर सिस्टम के लिए बैटरी बैंक साइज़ करें — लेड-एसिड बनाम लिथियम की डेप्थ-ऑफ-डिस्चार्ज तुलना के साथ।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/solar/battery-backup-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Solar Battery Backup Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'सोलर', path: '/solar' },
  { name: 'बैटरी बैकअप कैलकुलेटर', path: PATH },
])

const solarBatteryTextsHi: SolarBatteryBackupCalculatorTexts = {
  title: 'सोलर बैटरी बैकअप कैलकुलेटर',
  subtitle: 'रात या बादल वाले दिन के बैकअप के लिए बैटरी क्षमता',
  loadLabel: 'बैकअप के लिए दैनिक क्रिटिकल लोड',
  loadUnit: 'kWh',
  loadHint: 'रात भर के लिए आप जिन ज़रूरी चीज़ों को चाहते हैं — लाइट, फ्रिज, पंखे, राउटर।',
  daysLabel: 'स्वायत्तता के दिन',
  daysUnit: 'दिन',
  daysHint: 'कितने लगातार कम-धूप वाले दिनों के लिए आप कवरेज चाहते हैं।',
  chemistryLegend: 'बैटरी केमिस्ट्री',
  chemistryOptions: [
    { value: 'lead-acid', label: 'लेड-एसिड', icon: '🔋' },
    { value: 'lithium', label: 'लिथियम', icon: '⚡' },
  ],
  ctaLabel: 'मेरी बैटरी साइज़ करें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  recommendedLabel: 'सुझाई गई बैटरी क्षमता',
}

const faqs = [
  {
    q: 'लिथियम को एक ही काम के लिए लेड-एसिड से कम रेटेड क्षमता क्यों चाहिए?',
    a: 'लेड-एसिड बैटरियां सही उम्र के लिए आम तौर पर लगभग 50% इस्तेमाल योग्य डेप्थ ऑफ डिस्चार्ज तक सीमित होती हैं, जबकि लिथियम (LiFePO4) बैटरियां सुरक्षित रूप से लगभग 90% तक इस्तेमाल की जा सकती हैं — इसलिए लिथियम बैटरी को वही इस्तेमाल योग्य ऊर्जा देने के लिए छोटी रेटेड क्षमता चाहिए।',
  },
  {
    q: 'मुझे "क्रिटिकल लोड" में क्या गिनना चाहिए?',
    a: 'कम-धूप के समय में आप असल में जो ज़रूरी चीज़ें कवर करना चाहते हैं — आम तौर पर लाइट, पंखे, फ्रिज, राउटर और फोन चार्जिंग — न कि AC सहित आपका पूरा घरेलू लोड, जो आम तौर पर बैकअप सर्किट से बाहर रखा जाता है।',
  },
  {
    q: 'क्या यह कैलकुलेटर सोलर पैनल भी साइज़ करता है?',
    a: 'नहीं — यह सिर्फ बैटरी बैंक साइज़ करता है। पैनल/सिस्टम साइज़ के लिए, हमारा सोलर पैनल साइज़ कैलकुलेटर देखें।',
  },
  {
    q: '1 दिन से ज़्यादा स्वायत्तता के लिए साइज़ क्यों करें?',
    a: 'बादल या बारिश वाले लगातार दिनों का मतलब हो सकता है कि आपके पैनल रात भर में बैटरी पूरी तरह रिचार्ज न कर पाएं। अतिरिक्त स्वायत्तता के दिन एक बफर की तरह काम करते हैं ताकि कम-जनरेशन के दौर में बैकअप पावर खत्म न हो।',
  },
  {
    q: 'बैटरी बैकअप साइज़िंग, ग्रिड-टाइड सोलर साइज़िंग से कैसे अलग है?',
    a: 'ग्रिड-टाइड साइज़िंग (हमारा पैनल साइज़ कैलकुलेटर देखें) इस बारे में है कि सोलर जनरेशन आपकी सालाना खपत का कितना हिस्सा ऑफसेट करता है — अगर आपकी ग्रिड सप्लाई और नेट मीटरिंग भरोसेमंद है तो यह बिना किसी बैटरी के भी ठीक काम करता है। बैटरी बैकअप साइज़िंग एक अलग सवाल है: आपको कितनी स्टोर्ड ऊर्जा चाहिए ताकि आपके क्रिटिकल लोड को, आप जितनी देर कवर करना चाहते हैं, उतनी देर बिजली कटौती में चलाया जा सके — यह आपके पैनल साइज़ से स्वतंत्र है।',
  },
  {
    q: 'ट्यूबलर लेड-एसिड या लिथियम — मुझे कौन सा चुनना चाहिए?',
    a: 'लेड-एसिड की शुरुआती कीमत कम होती है लेकिन इसे समय-समय पर रखरखाव (पानी टॉप-अप) चाहिए और आम तौर पर इसकी इस्तेमाल योग्य उम्र कम होती है। लिथियम (LiFePO4) की शुरुआती कीमत ज़्यादा होती है लेकिन यह रखरखाव-मुक्त है, आम तौर पर ज़्यादा चलता है, और अपने ज़्यादा डेप्थ ऑफ डिस्चार्ज की वजह से हर रेटेड kWh पर ज़्यादा इस्तेमाल योग्य क्षमता देता है। कई नए इंस्टॉलेशन के लिए, ज़्यादा शुरुआती कीमत के बावजूद लिथियम की कुल मालिकाना लागत तेज़ी से प्रतिस्पर्धी होती जा रही है।',
  },
  {
    q: 'क्या बैटरी बैकअप के लिए हाइब्रिड इन्वर्टर मायने रखता है?',
    a: 'हां — हाइब्रिड इन्वर्टर ही वह चीज़ है जो ग्रिड, सोलर और बैटरी पावर के बीच अपने आप स्विच होने देता है। एक साधारण ग्रिड-टाइड (नॉन-हाइब्रिड) इन्वर्टर, आपके पास चाहे जितनी भी बैटरी क्षमता हो, सुरक्षा उपाय के तौर पर ग्रिड कटौती के दौरान पूरी तरह बंद हो जाता है, इसलिए बैटरी बैकअप के लिए हाइब्रिड या ऑफ-ग्रिड-सक्षम इन्वर्टर चाहिए।',
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

export default function SolarBatteryBackupPageHi() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'सोलर', href: '/hi/solar' },
          { label: 'बैटरी बैकअप कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="सोलर बैटरी बैकअप कैलकुलेटर"
        subtitle="अपने सोलर सिस्टम के लिए बैटरी बैंक साइज़ करें, ताकि ज़रूरी लोड रात भर या बादल वाले दिनों के दौर में चलते रहें।"
        stats={[
          { icon: '🔋', big: '50%', small: 'लेड-एसिड DoD', tone: 'hub' },
          { icon: '🔋', big: '90%', small: 'लिथियम DoD', tone: 'hub' },
          { icon: '⚙️', big: '90%', small: 'सिस्टम दक्षता', tone: 'hub' },
          { icon: '📆', big: '1–5', small: 'स्वायत्तता के दिन', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section
        aria-labelledby="worked-example"
        className="mb-8 rounded-xl border border-hairline border-l-4 border-l-brass bg-paper p-5"
      >
        <h2
          id="worked-example"
          className="font-display text-sm font-semibold tracking-wide text-brass uppercase"
        >
          उदाहरण गणना
        </h2>
        <p className="mt-2 text-ash/80">
          लेड-एसिड बैटरी पर <strong>1 दिन की स्वायत्तता</strong> के साथ{' '}
          <strong>3 kWh का दैनिक क्रिटिकल लोड</strong> को लगभग{' '}
          <strong>{example.recommendedCapacityKwh} kWh</strong> की रेटेड
          बैटरी क्षमता चाहिए।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना बैटरी बैंक साइज़ करें
        </h2>
        <SolarBatteryBackupCalculator texts={solarBatteryTextsHi} />
      </section>

      <section aria-labelledby="sizing-diff" className="mb-10">
        <h2 id="sizing-diff" className="font-display mb-2 text-2xl font-semibold">
          बैटरी बैकअप साइज़िंग बनाम ग्रिड-टाइड सोलर साइज़िंग
        </h2>
        <p className="text-ash/80">
          ये दो अलग साइज़िंग सवाल हैं, जिन्हें मिलाना आसान है। अपने{' '}
          <strong>सोलर पैनल</strong> साइज़ करना (हमारा{' '}
          <Link href="/hi/solar/panel-size-calculator" className="text-brass underline">
            पैनल साइज़ कैलकुलेटर
          </Link>{' '}
          देखें) इस बारे में है कि आप साल भर में अपने बिल को ऑफसेट करने के लिए
          कितनी यूनिट बनाते हैं — बिना किसी बैटरी वाला ग्रिड-टाइड सिस्टम भी यह
          काम ठीक से करता है, नेट मीटरिंग का इस्तेमाल करके दिन की अतिरिक्त
          जनरेशन बैंक करते हुए। <strong>बैटरी</strong> साइज़ करना एक अलग सवाल
          है: जब ग्रिड — और सूरज — उपलब्ध न हों, तब खास लोड को चलाए रखने के
          लिए आप कितनी ऊर्जा स्टोर कर सकते हैं। एक अच्छी तरह डिज़ाइन किया
          हाइब्रिड सिस्टम दोनों करता है, लेकिन वे स्वतंत्र रूप से गिने जाते हैं।
        </p>
      </section>

      <section aria-labelledby="battery-types" className="mb-10">
        <h2 id="battery-types" className="font-display mb-4 text-2xl font-semibold">
          भारत में उपलब्ध बैटरी प्रकार
        </h2>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist">
              <tr>
                <th className="px-4 py-2 font-semibold"> </th>
                <th className="px-4 py-2 font-semibold">ट्यूबलर लेड-एसिड</th>
                <th className="px-4 py-2 font-semibold">लिथियम (LiFePO4)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-4 py-2 font-medium">शुरुआती लागत</td>
                <td className="px-4 py-2">कम</td>
                <td className="px-4 py-2">ज़्यादा</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">इस्तेमाल योग्य डेप्थ ऑफ डिस्चार्ज</td>
                <td className="px-4 py-2">~50%</td>
                <td className="px-4 py-2">~90%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">सामान्य उम्र</td>
                <td className="px-4 py-2">छोटी, ज़्यादा चार्ज साइकल इसे जल्दी घिसते हैं</td>
                <td className="px-4 py-2">लंबी, ज़्यादा साइकल पर क्षमता बनाए रखती है</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">रखरखाव</td>
                <td className="px-4 py-2">समय-समय पर पानी टॉप-अप ज़रूरी</td>
                <td className="px-4 py-2">रखरखाव-मुक्त</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">वज़न और जगह</td>
                <td className="px-4 py-2">प्रति kWh भारी, बड़ी</td>
                <td className="px-4 py-2">प्रति kWh हल्की, ज़्यादा कॉम्पैक्ट</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="hours-needed" className="mb-10">
        <h2 id="hours-needed" className="font-display mb-2 text-2xl font-semibold">
          आपको असल में कितने घंटे के बैकअप की ज़रूरत है?
        </h2>
        <p className="mb-4 text-ash/80">
          अपने पूरे घर से नहीं, बल्कि आप असल में क्या चालू रखना चाहते हैं उससे
          शुरू करें। एक आम तरीका: अपने क्रिटिकल लोड (लाइट, पंखे, फ्रिज, राउटर,
          फोन चार्जिंग) की सूची बनाएं, उनकी वाटेज जोड़ें, और आप उन्हें जितने
          घंटे कवर करना चाहते हैं उससे गुणा करके kWh में अपना दैनिक लोड पाएं —
          यही इनपुट ऊपर का कैलकुलेटर इस्तेमाल करता है।
        </p>
        <div className="rounded-xl bg-mist p-5">
          <p className="text-sm font-semibold text-ink-navy">
            सामान्य &quot;सिर्फ ज़रूरी चीज़ें&quot; कॉम्बो
          </p>
          <p className="mt-1 text-sm text-ash/70">
            कुछ LED लाइट + 2 सीलिंग फैन + एक फ्रिज + एक राउटर/फोन चार्जिंग
            मिलकर लगातार लगभग 250–350W खींचते हैं — 4 घंटे की कटौती में यह
            बैटरी नुकसान से पहले लगभग 1–1.4 kWh का दैनिक लोड है। असली आंकड़े
            के लिए अपने उपकरणों की सटीक वाटेज इस्तेमाल करें; हमारा{' '}
            <Link href="/appliances/inverter-backup-time-calculator" className="text-brass underline">
              इन्वर्टर बैकअप टाइम कैलकुलेटर
            </Link>{' '}
            उल्टी दिशा में काम करता है — यह बताता है कि आपकी पहले से मौजूद
            बैटरी किसी दिए गए लोड के लिए कितनी देर चलेगी।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/solar/panel-size-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर पैनल साइज़
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इस बैटरी बैंक को रिचार्ज करने वाले पैनल साइज़ करें।
            </p>
          </Link>
          <Link
            href="/appliances/inverter-backup-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              इन्वर्टर बैकअप टाइम
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पहले से बैटरी है? देखें यह कितनी देर चलती है।
            </p>
          </Link>
          <Link
            href="/hi/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर ROI कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              सिर्फ पैनल पर पेबैक देखें।
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
