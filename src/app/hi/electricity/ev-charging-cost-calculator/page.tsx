import type { Metadata } from 'next'
import Link from 'next/link'
import EvChargingCostCalculator, {
  type EvChargingCostCalculatorTexts,
} from '@/components/calculators/EvChargingCostCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import EvVsFuelComparison from '@/components/calculators/EvVsFuelComparison'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { calculateEvChargingCost } from '@/lib/calc/ev'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/electricity/ev-charging-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = calculateEvChargingCost({ discomCode: 'TNEB', batteryCapacityKwh: 30, fullRangeKm: 200 })

export const metadata: Metadata = {
  title: 'EV चार्जिंग कॉस्ट कैलकुलेटर 2026 — होम चार्जिंग खर्च (भारत)',
  description:
    'अपनी बैटरी क्षमता और रेंज से, घर पर पूरा EV चार्ज करने का खर्च और प्रति km आपकी लागत निकालें, आपके DISCOM के असली टैरिफ पर आधारित।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/electricity/ev-charging-cost-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EV Charging Cost Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'बिजली', path: '/electricity' },
  { name: 'EV चार्जिंग कॉस्ट कैलकुलेटर', path: PATH },
])

const evChargingTextsHi: EvChargingCostCalculatorTexts = {
  title: 'EV चार्जिंग कॉस्ट कैलकुलेटर',
  subtitle: 'घर पर पूरा चार्ज करने का खर्च क्या है',
  discomLabel: 'DISCOM / राज्य',
  batteryLabel: 'बैटरी क्षमता',
  batteryUnit: 'kWh',
  rangeLabel: 'फुल-चार्ज रेंज',
  rangeUnit: 'km',
  ctaLabel: 'चार्जिंग कॉस्ट निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  costToFullChargeLabel: 'पूरा चार्ज करने की लागत',
  perKmTemplate: '≈ {amount}/km',
  unitsNeededLabel: 'ज़रूरी यूनिट',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
}

const faqs = [
  {
    q: 'घर पर EV चार्जिंग को मेरे टॉप टैरिफ स्लैब पर क्यों गिना जाता है?',
    a: 'घर पर EV चार्ज करना आपके मौजूदा इस्तेमाल में काफी इज़ाफा करता है, इसलिए — AC की तरह — इसकी यूनिट्स आपके सबसे ऊंचे, सबसे महंगे टैरिफ स्लैब में गिरती हैं, किसी मिली-जुली औसत दर पर नहीं।',
  },
  {
    q: 'कैलकुलेटर 90% चार्जिंग दक्षता क्यों मानता है?',
    a: 'AC होम चार्जिंग में कार के ऑनबोर्ड चार्जर के अंदर रूपांतरण के दौरान कुछ ऊर्जा गर्मी के रूप में खर्च हो जाती है। आम घरेलू (Level 1/2 AC) चार्जिंग के लिए लगभग 90% दक्षता एक आम तौर पर बताया जाने वाला आंकड़ा है — DC फास्ट चार्जिंग के नुकसान अलग होते हैं।',
  },
  {
    q: 'मुझे अपने EV की बैटरी क्षमता और रेंज कहां मिलेगी?',
    a: 'दोनों आपकी गाड़ी की स्पेक शीट में प्रकाशित होती हैं — बैटरी क्षमता kWh में (इस्तेमाल योग्य क्षमता, हमेशा मार्केटिंग वाले "ग्रॉस" आंकड़े जैसी नहीं) और सर्टिफाइड या असली-दुनिया की रेंज km में।',
  },
  {
    q: 'क्या होम चार्जिंग पब्लिक फास्ट चार्जर से सस्ती है?',
    a: 'आम तौर पर हां — पब्लिक DC फास्ट चार्जर आम तौर पर घरेलू टैरिफ से काफी ऊपर प्रति-यूनिट दर लेते हैं, साथ ही कभी-कभी एक सर्विस फीस भी, जबकि होम चार्जिंग आपके सामान्य घरेलू टैरिफ का इस्तेमाल करती है।',
  },
  {
    q: 'क्या EV असल में पेट्रोल या डीज़ल गाड़ी से चलाने में सस्ता है?',
    a: 'लगभग हमेशा हां, प्रति-km आधार पर, कभी-कभी काफी बड़े अंतर से — किसी सामान्य दावे की बजाय अपने असली आंकड़े देखने के लिए नीचे तुलना टूल में अपनी असली स्थानीय फ्यूल कीमतें और अपनी खास गाड़ियों की माइलेज इस्तेमाल करें।',
  },
  {
    q: 'तुलना टूल मुझसे मेरी अपनी पेट्रोल/डीज़ल/CNG कीमत और माइलेज क्यों मांगता है?',
    a: 'फ्यूल कीमतें शहर के हिसाब से अलग होती हैं और रोज़ बदलती हैं, और गाड़ी की माइलेज मॉडल और चलाने की परिस्थितियों के हिसाब से अलग होती है — अपने असली आंकड़े इस्तेमाल करने से एक ईमानदार तुलना मिलती है, किसी सामान्य मान्यता की बजाय जो आपकी स्थिति से मेल न खाए।',
  },
  {
    q: 'क्या EV चार्जिंग कॉस्ट, बिजली टैरिफ बढ़ने पर वैसे ही बदलती है जैसे पेट्रोल कीमतें बदलती हैं?',
    a: 'हां — किसी भी बिजली इस्तेमाल की तरह, EV चार्जिंग कॉस्ट आपके DISCOM के टैरिफ के साथ बदलती है। ऐतिहासिक रूप से, बिजली टैरिफ रोज़ बदलने वाली फ्यूल कीमतों से कम बार और कम तेज़ी से बदले हैं, लेकिन इसकी कोई गारंटी नहीं कि यह हमेशा ऐसा ही रहेगा।',
  },
  {
    q: 'क्या चार्जिंग की स्पीड (धीमी बनाम तेज़ होम चार्जिंग) खर्च बदलती है?',
    a: '₹ कुल में कोई खास फर्क नहीं — आप दोनों तरह से डिलीवर हुई वही यूनिट्स (kWh) चुका रहे हैं। तेज़ होम चार्जिंग (ज़्यादा एम्पीयरेज) मुख्य रूप से यह प्रभावित करती है कि इसमें कितना समय लगता है, खर्च कितना नहीं, हालांकि सैद्धांतिक रूप से बहुत ज़्यादा लोड कुछ इस्तेमाल को अलग टैरिफ अवधि में धकेल सकता है अगर आपका DISCOM समय-आधारित दरें इस्तेमाल करता है।',
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

export default function EvChargingCostPageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'बिजली', href: '/hi/electricity' },
          { label: 'EV चार्जिंग कॉस्ट कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⚡</span> Electricity hub
          </>
        }
        h1="EV चार्जिंग कॉस्ट कैलकुलेटर"
        subtitle={
          <>
            घर पर पूरा चार्ज करने का खर्च, और प्रति km आपकी लागत जानें,{' '}
            <strong>आपके DISCOM के असली टॉप-स्लैब टैरिफ</strong> पर आधारित।
          </>
        }
        stats={[
          { icon: '🔋', big: '90%', small: 'चार्जिंग दक्षता', tone: 'hub' },
          { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '🚗', big: '₹/km', small: 'यह भी दिखाया गया', tone: 'hub' },
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
          <strong>200 km</strong> की फुल-चार्ज रेंज वाली{' '}
          <strong>30 kWh बैटरी</strong> को तमिलनाडु में पूरा चार्ज करने में
          लगभग <strong>{formatINR(example.costToFullCharge)}</strong> का खर्च
          आता है — लगभग{' '}
          <strong>{formatINR(example.costPerKm ?? 0)}/km</strong>।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपनी चार्जिंग कॉस्ट निकालें
        </h2>
        <EvChargingCostCalculator discoms={liveDiscoms} texts={evChargingTextsHi} />
      </section>

      <section aria-labelledby="ev-vs-fuel" className="mb-10">
        <h2 id="ev-vs-fuel" className="font-display mb-2 text-2xl font-semibold">
          EV बनाम पेट्रोल बनाम डीज़ल बनाम CNG — प्रति km खर्च
        </h2>
        <p className="mb-4 text-sm text-ash/60">
          EV कॉस्ट ऊपर आपके असली DISCOM टैरिफ का इस्तेमाल करती है; सही
          जैसी-को-तैसी तुलना के लिए अपनी खुद की फ्यूल कीमतें और माइलेज डालें।
        </p>
        <EvVsFuelComparison discomCode="TNEB" batteryCapacityKwh={30} fullRangeKm={200} />
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/electricity/appliance-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              उपकरण कॉस्ट कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इसकी वाटेज से कोई भी अन्य उपकरण।
            </p>
          </Link>
          <Link
            href="/fuel-cost/petrol-diesel-cost-per-km-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🚗</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              पेट्रोल/डीज़ल प्रति km खर्च
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपनी पुरानी गाड़ी के रनिंग कॉस्ट से तुलना करें।
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
              रूफटॉप सोलर से EV चार्जिंग की भरपाई करें।
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
