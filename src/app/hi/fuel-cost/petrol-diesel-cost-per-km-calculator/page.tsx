import type { Metadata } from 'next'
import Link from 'next/link'
import VehicleFuelCostCalculator, {
  type VehicleFuelCostCalculatorTexts,
} from '@/components/calculators/VehicleFuelCostCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import { FuelGaugeIcon } from '@/components/HubMotifIcon'
import PageHero from '@/components/PageHero'
import { vehicleCostPerKm } from '@/lib/calc/fuel'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/fuel-cost/petrol-diesel-cost-per-km-calculator'

const example = vehicleCostPerKm({ fuelPricePerLitre: 100, mileageKmPerLitre: 18, monthlyKm: 1000 })

export const metadata: Metadata = {
  title: 'पेट्रोल/डीज़ल प्रति KM खर्च कैलकुलेटर 2026 — गाड़ी रनिंग कॉस्ट',
  description:
    'आज की फ्यूल कीमत और अपनी माइलेज से अपनी गाड़ी का असली फ्यूल खर्च प्रति km, प्रति महीना और प्रति साल निकालें — पेट्रोल, डीज़ल या CNG के लिए।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/fuel-cost/petrol-diesel-cost-per-km-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Petrol/Diesel Cost Per KM Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फ्यूल कॉस्ट', path: '/fuel-cost' },
  { name: 'पेट्रोल/डीज़ल प्रति KM खर्च', path: PATH },
])

const vehicleFuelTextsHi: VehicleFuelCostCalculatorTexts = {
  title: 'पेट्रोल/डीज़ल प्रति KM खर्च कैलकुलेटर',
  subtitle: 'आपकी गाड़ी की असली रनिंग कॉस्ट',
  priceLabel: 'फ्यूल कीमत',
  priceUnit: '₹/लीटर',
  priceHint: 'आज की स्थानीय कीमत जांचें — यह राज्य और फ्यूल के प्रकार के हिसाब से अलग होती है।',
  mileageLabel: 'गाड़ी की माइलेज',
  mileageUnit: 'km/लीटर',
  monthlyKmLabel: 'मासिक दूरी',
  monthlyKmUnit: 'km',
  ctaLabel: 'फ्यूल खर्च निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  costPerKmLabel: 'खर्च प्रति km',
  monthlyCostLabel: 'मासिक फ्यूल खर्च',
  annualCostLabel: 'सालाना फ्यूल खर्च',
  fuelUsedLabel: 'फ्यूल इस्तेमाल/महीना',
}

const faqs = [
  {
    q: 'प्रति km खर्च कैसे गिना जाता है?',
    a: 'प्रति km खर्च = प्रति लीटर फ्यूल कीमत ÷ गाड़ी की माइलेज (km प्रति लीटर)। उदाहरण के लिए, ₹100/लीटर फ्यूल और 20 km/लीटर माइलेज पर प्रति km ₹5 खर्च आता है।',
  },
  {
    q: 'मुझे अपनी गाड़ी की असली माइलेज कहां मिलेगी?',
    a: 'निर्माता का ARAI-सर्टिफाइड आंकड़ा आशावादी होता है — ट्रैफिक, AC इस्तेमाल और ड्राइविंग स्टाइल के हिसाब से असली माइलेज आम तौर पर 10–20% कम होती है। सबसे सटीक आंकड़े के लिए अपने असली फ्यूल भराव को ओडोमीटर रीडिंग से मिलाकर ट्रैक करें।',
  },
  {
    q: 'क्या यह CNG या इलेक्ट्रिक व्हीकल के लिए काम करता है?',
    a: 'CNG के लिए, प्रति kg कीमत और अपनी माइलेज km/kg में डालें — वही भाग काम करता है। यह कैलकुलेटर EV के लिए उपयुक्त नहीं है, जहां खर्च प्रति-लीटर फ्यूल कीमत की बजाय बिजली टैरिफ और चार्जिंग दक्षता पर निर्भर करता है — इसके बजाय हमारा EV चार्जिंग कॉस्ट कैलकुलेटर देखें।',
  },
  {
    q: 'फ्यूल कीमत शहर के हिसाब से क्यों बदलती है?',
    a: 'रिटेल कीमत बेस फ्यूल लागत, केंद्रीय एक्साइज़ ड्यूटी, डीलर कमीशन, और राज्य VAT से बनती है — और राज्य VAT दरें काफी अलग होती हैं, यही वजह है कि एक जैसा फ्यूल किसी राज्य में पड़ोसी राज्य से काफी ज़्यादा पड़ सकता है। कीमतें आम तौर पर सुबह 6 बजे, अंतरराष्ट्रीय कच्चे तेल की चाल और एक्सचेंज रेट के हिसाब से रोज़ संशोधित होती हैं — आधिकारिक प्राइसिंग पद्धति के लिए PPAC (Petroleum Planning & Analysis Cell) और पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय देखें।',
  },
  {
    q: 'DesiMetrics लाइव फ्यूल कीमत क्यों नहीं दिखाता?',
    a: 'कीमतें शहर के हिसाब से रोज़ संशोधित होती हैं और कच्चे तेल की चाल व राज्य टैक्स बदलावों के साथ बदलती हैं — अगली सुबह तक पुराना हो चुका नंबर दिखाना आपके पंप पर आज की असली कीमत मांगने से कम सटीक होगा, इसलिए हम आपका अपना मौजूदा नंबर मांगते हैं।',
  },
  {
    q: '100km चलाने का असल में कितना खर्च आता है?',
    a: 'अपने प्रति-km आंकड़े को 100 से गुणा करें — अपनी डाली कीमत और माइलेज पर सामान्य दूरियों के लिए ऊपर त्वरित-संदर्भ तालिका देखें।',
  },
  {
    q: 'क्या AC इस्तेमाल आपकी असली माइलेज को प्रभावित करता है?',
    a: 'हां, शहर में चलाने पर खासतौर पर — AC चलाने से इंजन पर लोड बढ़ता है, जो एक बड़ी वजह है कि असली माइलेज अक्सर सर्टिफाइड आंकड़े से कम आती है, खासकर रुक-रुक कर चलने वाले ट्रैफिक में।',
  },
  {
    q: 'क्या डीज़ल हमेशा पेट्रोल से चलाने में सस्ता है?',
    a: 'प्रति-लीटर, डीज़ल की कीमत अक्सर पेट्रोल से कम होती है, और डीज़ल इंजन अक्सर बेहतर माइलेज भी देते हैं — लेकिन कुल खर्च तुलना गाड़ी की कीमत के अंतर और आप साल में कितने km चलाते हैं इस पर भी निर्भर करती है, जिसे यह कैलकुलेटर अकेले नहीं पकड़ता।',
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

export default function VehicleFuelCostPageHi() {
  return (
    <>
      <PageHero
        hub="fuel"
        breadcrumb={[
          { label: 'फ्यूल कॉस्ट', href: '/hi/fuel-cost' },
          { label: 'पेट्रोल/डीज़ल प्रति KM खर्च', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⛽</span> Fuel Cost hub
          </>
        }
        h1={
          <span className="flex items-center gap-2">
            <FuelGaugeIcon className="h-7 w-7 text-hub-fuel" />
            पेट्रोल/डीज़ल प्रति KM खर्च कैलकुलेटर
          </span>
        }
        subtitle={
          <>
            आज की फ्यूल कीमत और अपनी असली माइलेज से अपनी गाड़ी की असली
            रनिंग कॉस्ट जानें — प्रति km, प्रति महीना और प्रति साल।
          </>
        }
        stats={[
          { icon: '₹', big: '₹/km', small: 'खर्च आधार', tone: 'hub' },
          { icon: '⛽', big: 'कोई भी फ्यूल', small: 'पेट्रोल, डीज़ल, CNG', tone: 'hub' },
          { icon: '📏', big: 'असली माइलेज', small: 'आपका अपना आंकड़ा', tone: 'hub' },
          { icon: '🔓', big: 'तुरंत', small: 'बिना लॉगिन', tone: 'hub' },
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
          <strong>₹100/लीटर</strong> और <strong>18 km/लीटर</strong> माइलेज
          पर, हर km की लागत लगभग{' '}
          <strong>{formatINR(example.costPerKm)}</strong> आती है — 1,000 km
          चलाने पर लगभग {formatINR(example.monthlyCost)}/महीना।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपनी रनिंग कॉस्ट निकालें
        </h2>
        <VehicleFuelCostCalculator texts={vehicleFuelTextsHi} />
      </section>

      <section aria-labelledby="quick-reference" className="mb-10">
        <h2 id="quick-reference" className="font-display mb-2 text-2xl font-semibold">
          त्वरित संदर्भ
        </h2>
        <p className="mb-4 text-sm text-ash/60">
          उदाहरण गणना के ₹100/लीटर और 18 km/लीटर पर — अपने असली आंकड़ों के
          लिए ऊपर कैलकुलेटर में अपने नंबर डालें।
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="mb-2 text-xs font-semibold tracking-wide text-ash/50 uppercase">
              ₹ में कितने लीटर मिलते हैं
            </p>
            <dl className="space-y-1.5 text-sm">
              {[100, 500, 1000].map((amt) => (
                <div key={amt} className="flex justify-between">
                  <dt className="text-ash/70">₹{amt}</dt>
                  <dd className="font-semibold tabular-nums text-ink-navy">
                    {(amt / 100).toFixed(2)} L
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="mb-2 text-xs font-semibold tracking-wide text-ash/50 uppercase">
              सामान्य यात्राओं का खर्च
            </p>
            <dl className="space-y-1.5 text-sm">
              {[50, 100, 500].map((km) => (
                <div key={km} className="flex justify-between">
                  <dt className="text-ash/70">{km} km</dt>
                  <dd className="font-semibold tabular-nums text-ink-navy">
                    {formatINR(km * example.costPerKm)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="price-variation" className="mb-10">
        <h2 id="price-variation" className="font-display mb-2 text-2xl font-semibold">
          फ्यूल कीमतें शहर के हिसाब से क्यों बदलती हैं
        </h2>
        <p className="text-ash/80">
          पंप कीमत बेस फ्यूल लागत, केंद्रीय एक्साइज़ ड्यूटी, डीलर कमीशन, और
          राज्य VAT से बनती है — और राज्य VAT दरें काफी अलग होती हैं, यही
          मुख्य वजह है कि एक जैसा फ्यूल कुछ राज्यों में दूसरों से काफी ज़्यादा
          पड़ता है। कीमतें आम तौर पर सुबह 6 बजे, अंतरराष्ट्रीय कच्चे तेल की
          चाल और एक्सचेंज रेट को ट्रैक करते हुए, रोज़ संशोधित होती हैं —
          आधिकारिक प्राइसिंग पद्धति के लिए PPAC (Petroleum Planning &amp;
          Analysis Cell) और पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय देखें। यही
          ठीक वजह है कि हम एक पहले से पुराना पड़ चुका नंबर दिखाने की बजाय
          आपकी अपनी असली, मौजूदा कीमत मांगते हैं।
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/fuel-cost/generator-fuel-consumption-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🛠️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              जनरेटर फ्यूल कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              डीज़ल में एक बिजली कटौती का असली खर्च क्या है।
            </p>
          </Link>
          <Link
            href="/hi/appliances/inverter-sizing-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              इन्वर्टर साइज़िंग
            </p>
            <p className="mt-1 text-xs text-ash/60">
              कटौती के लिए फ्यूल जनरेटर का एक इलेक्ट्रिक विकल्प।
            </p>
          </Link>
          <Link
            href="/hi/financial"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-financial/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🧮</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              फाइनेंशियल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              GST, SIP, टैक्स रेजीम और ग्रेच्युटी — रोज़मर्रा के पैसों के टूल।
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
