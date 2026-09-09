import type { Metadata } from 'next'
import Link from 'next/link'
import FridgeCostCalculator, { type FridgeCostCalculatorTexts } from '@/components/calculators/FridgeCostCalculator'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { fridgeCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/fridge-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = fridgeCost({ discomCode: 'TNEB', annualUnitsFromLabel: 200 })

export const metadata: Metadata = {
  title: 'फ्रिज बिजली कॉस्ट कैलकुलेटर 2026 — आपके BEE लेबल से',
  description:
    'आपके रेफ्रिजरेटर के BEE स्टार लेबल पर छपे सालाना ऊर्जा खपत आंकड़े से बिजली खर्च निकालें, आपके DISCOM के असली टैरिफ पर आधारित।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/fridge-cost-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fridge Electricity Cost Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'फ्रिज कॉस्ट कैलकुलेटर', path: PATH },
])

const fridgeTextsHi: FridgeCostCalculatorTexts = {
  title: 'फ्रिज कॉस्ट कैलकुलेटर',
  subtitle: 'आपके फ्रिज के अपने BEE लेबल आंकड़े से',
  discomLabel: 'DISCOM / राज्य',
  annualLabel: 'सालाना ऊर्जा खपत (BEE लेबल से)',
  annualUnit: 'यूनिट/साल',
  annualHint: "अपने फ्रिज पर पीला BEE स्टार स्टिकर देखें — यह सीधे kWh/साल में 'annual energy consumption' बताता है।",
  ctaLabel: 'फ्रिज का खर्च निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  monthlyCostLabel: 'अनुमानित मासिक खर्च',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/दिन',
  fromLabelLabel: 'BEE लेबल से',
  fromLabelUnit: 'यूनिट/साल',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
}

const faqs = [
  {
    q: 'मुझे अपने फ्रिज की सालाना ऊर्जा खपत कहां मिलेगी?',
    a: 'भारत में बिकने वाले हर फ्रिज पर एक अनिवार्य BEE स्टार-रेटिंग लेबल होता है — दरवाज़े या साइड पैनल पर एक पीला स्टिकर — जो सीधे यूनिट (kWh) प्रति साल में "Annual Energy Consumption" बताता है। यही सटीक आंकड़ा है जो इस कैलकुलेटर को चाहिए।',
  },
  {
    q: 'यह कैलकुलेटर वाटेज की बजाय लेबल आंकड़ा क्यों इस्तेमाल करता है?',
    a: 'फ्रिज का कंप्रेसर लगातार चलने की बजाय ऑन-ऑफ साइकल में चलता है, और साइकल की दर परिवेश तापमान, दरवाज़ा खोलने की आवृत्ति और इंसुलेशन पर निर्भर करती है — ये सब कुछ ऐसा है जिसे एक साधारण वाटेज × घंटे फॉर्मूला भरोसेमंद तरीके से नहीं पकड़ सकता। BEE लेबल आंकड़ा मानक टेस्ट परिस्थितियों में मापा जाता है और आपके खास मॉडल के लिए उपलब्ध सबसे सटीक असली नंबर है।',
  },
  {
    q: 'अगर मेरे पास अब लेबल नहीं है तो?',
    a: 'मॉडल नंबर (आम तौर पर फ्रिज के अंदर एक स्टिकर पर) प्लस "BEE star label" ऑनलाइन खोजें — निर्माता रेटिंग शीट प्रकाशित करते हैं। एक अनुमानित गाइड के तौर पर, एक 200–250L 3-स्टार फ्रिज आम तौर पर 150–250 kWh/साल रेंज में आता है, 5-स्टार मॉडल इससे कम।',
  },
  {
    q: 'क्या मेरा असली खर्च इस अनुमान से ज़्यादा या कम होने की संभावना है?',
    a: 'BEE आंकड़ा नियंत्रित लैब परिस्थितियों में मापा जाता है। ज़्यादा गर्म रसोई, बार-बार दरवाज़ा खोलना, या एक पुराना/कम-सील वाला फ्रिज आम तौर पर असली खपत को लेबल आंकड़े से ऊपर धकेल देगा; ठंडे कमरे में एक नया, अच्छी तरह रखरखाव किया यूनिट इससे थोड़ा कम चल सकता है।',
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

export default function FridgeCostPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'फ्रिज कॉस्ट कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="फ्रिज बिजली कॉस्ट कैलकुलेटर"
        subtitle={
          <>
            अपने रेफ्रिजरेटर के{' '}
            <strong>BEE स्टार लेबल पर सालाना ऊर्जा खपत आंकड़े</strong> से
            इसका असली रनिंग कॉस्ट जानें — एक मॉडल-विशिष्ट असली नंबर, कोई
            अंदाज़ी वाटेज नहीं।
          </>
        }
        stats={[
          { icon: '🏷️', big: 'BEE लेबल', small: 'इनपुट स्रोत', tone: 'hub' },
          { icon: '❄️', big: '80–500', small: 'सामान्य यूनिट/साल', tone: 'hub' },
          { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
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
          BEE लेबल पर <strong>200 यूनिट/साल</strong> रेटेड एक फ्रिज को तमिलनाडु
          में चलाने में लगभग <strong>{formatINR(example.monthlyCost)}/महीना</strong>{' '}
          ({formatINR(example.annualCost)}/साल) खर्च आता है,{' '}
          {formatINR(example.effectiveRatePerUnit)}/यूनिट पर।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने फ्रिज का खर्च निकालें
        </h2>
        <FridgeCostCalculator discoms={liveDiscoms} texts={fridgeTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>सीधे लेबल से।</strong> मासिक यूनिट = सालाना लेबल आंकड़ा ÷
            12। हम कंप्रेसर ड्यूटी साइकल मॉडल नहीं करते या वाटेज का अंदाज़ा
            नहीं लगाते — BEE लेबल का सालाना kWh आंकड़ा पहले से एक टेस्ट किया,
            मॉडल-विशिष्ट नंबर है।
          </p>
          <p>
            <strong>आपके टॉप स्लैब पर आधारित।</strong> फ्रिज आपके अन्य
            इस्तेमाल के ऊपर लगातार चलता है, इसलिए इसकी यूनिट्स आपके सबसे
            ऊंचे टैरिफ स्लैब में गिरती हैं — हम वही मार्जिनल दर (फ्यूल कॉस्ट
            एडजस्टमेंट और बिजली शुल्क सहित) इस्तेमाल करते हैं।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/appliances/ceiling-fan-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🌀</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सीलिंग फैन कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              स्टैंडर्ड बनाम BEE 5-स्टार बनाम BLDC रनिंग कॉस्ट।
            </p>
          </Link>
          <Link
            href="/hi/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🌬️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC रनिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              ज़्यादातर गर्मियों के बिजली बिल की सबसे बड़ी लाइन आइटम।
            </p>
          </Link>
          <Link
            href="/hi/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              पूरा बिल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              सिर्फ इस उपकरण का नहीं, अपना पूरा मासिक बिल देखें।
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
