import type { Metadata } from 'next'
import Link from 'next/link'
import InductionCooktopCalculator, {
  type InductionCooktopCalculatorTexts,
} from '@/components/calculators/InductionCooktopCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/induction-cooktop-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = simpleApplianceCost({ discomCode: 'TNEB', wattage: 1600, hoursPerDay: 1 })

export const metadata: Metadata = {
  title: 'इंडक्शन कुकटॉप बिजली कॉस्ट कैलकुलेटर 2026 — भारत',
  description:
    'अपने इंडक्शन कुकटॉप की वाटेज और रोज़ के खाना पकाने के समय से बिजली खर्च निकालें, आपके DISCOM के असली टैरिफ पर आधारित।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/induction-cooktop-cost-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Induction Cooktop Electricity Cost Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'इंडक्शन कुकटॉप कॉस्ट कैलकुलेटर', path: PATH },
])

const inductionTextsHi: InductionCooktopCalculatorTexts = {
  title: 'इंडक्शन कुकटॉप कॉस्ट कैलकुलेटर',
  subtitle: 'अपने इंडक्शन कुकटॉप का बिजली खर्च निकालें',
  discomLabel: 'DISCOM / राज्य',
  powerLegend: 'कुकटॉप पावर',
  cooktopTypes: [
    { value: 'basic', label: 'बेसिक (1200W)', icon: '🍳', watts: 1200 },
    { value: 'standard', label: 'स्टैंडर्ड (1600W)', icon: '🔥', watts: 1600 },
    { value: 'high', label: 'हाई-पावर (2000W)', icon: '⚡', watts: 2000 },
    { value: 'custom', label: 'कस्टम', icon: '⚙️', watts: 0 },
  ],
  customWattageLabel: 'कुकटॉप की वाटेज',
  customWattageUnit: 'W',
  customWattageHint: 'कुकटॉप के रेटिंग लेबल या बॉक्स पर छपी वाटेज जांचें।',
  hoursLabel: 'रोज़ खाना पकाने का समय',
  hoursUnit: 'घंटे/दिन',
  hoursHint: 'सिर्फ सक्रिय खाना पकाने का समय — ज़्यादातर घर इंडक्शन कुकटॉप एक घंटे से काफी कम इस्तेमाल करते हैं।',
  ctaLabel: 'कुकटॉप का खर्च निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  monthlyCostLabel: 'अनुमानित मासिक खर्च',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/महीना',
  wattageLabel: 'वाटेज',
  perDayLabel: 'यूनिट प्रति दिन',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
}

const faqs = [
  {
    q: 'एक इंडक्शन कुकटॉप कितनी बिजली इस्तेमाल करता है?',
    a: 'ज़्यादातर भारतीय इंडक्शन कुकटॉप 1200-2000W रेटेड होते हैं, 1600W एक आम मध्य-रेंज आंकड़ा है। असली खपत आपके पकाने वाले पावर सेटिंग पर निर्भर करती है, सिर्फ अधिकतम रेटेड वाटेज पर नहीं।',
  },
  {
    q: 'क्या इंडक्शन पर पकाना LPG से सस्ता है?',
    a: 'यह आपके बिजली टैरिफ और LPG कीमत पर निर्भर करता है, और इंडक्शन आम तौर पर खुली LPG फ्लेम की तुलना में पैन में गर्मी पहुंचाने में ज़्यादा ऊर्जा-कुशल है — लेकिन ₹ तुलना के लिए दोनों तरफ के आपके असली आंकड़े चाहिए। गैस की तरफ के लिए हमारी PNG बनाम LPG तुलना और बिजली की तरफ के लिए यह कैलकुलेटर आज़माएं।',
  },
  {
    q: 'कुकटॉप को मेरे टॉप टैरिफ स्लैब पर क्यों गिना जाता है?',
    a: 'भारतीय बिजली टैरिफ टेलिस्कोपिक होते हैं — इस्तेमाल को धीरे-धीरे महंगे होते स्लैब में बिल किया जाता है। आप जो भी उपकरण जोड़ते हैं वह आपके मौजूदा इस्तेमाल के ऊपर बैठता है, इसलिए इसकी यूनिट्स आपके सबसे ऊंचे स्लैब में गिरती हैं, किसी मिली-जुली औसत दर पर नहीं।',
  },
  {
    q: 'क्या पावर सेटिंग असली खपत को प्रभावित करती है?',
    a: 'हां — रेटेड वाटेज सबसे ऊंची सेटिंग पर अधिकतम खपत है। कम पावर सेटिंग पर पकाना (जैसे धीमी आंच के लिए) रेटेड आंकड़े से कम खींचता है, इसलिए यह कैलकुलेटर का अनुमान ज़्यादातर ऊंची सेटिंग पर पकाने के लिए सबसे सटीक है।',
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

export default function InductionCooktopCostPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'इंडक्शन कुकटॉप कॉस्ट कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="इंडक्शन कुकटॉप बिजली कॉस्ट कैलकुलेटर"
        subtitle={
          <>
            जानें आपका इंडक्शन कुकटॉप चलाने में कितना खर्च आता है। एक पावर
            टियर चुनें या इसकी सटीक वाटेज डालें, रोज़ का खाना पकाने का समय
            सेट करें, और हम यूनिट्स को आपके{' '}
            <strong>DISCOM के टॉप बिजली स्लैब</strong> पर गिनेंगे।
          </>
        }
        stats={[
          { icon: '🍳', big: '1200–2000W', small: 'सामान्य रेंज', tone: 'hub' },
          { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '⏱️', big: 'मिनट, घंटे नहीं', small: 'सामान्य रोज़ का इस्तेमाल', tone: 'hub' },
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
          तमिलनाडु में रोज़ 1 घंटा इस्तेमाल होने वाला{' '}
          <strong>1600W इंडक्शन कुकटॉप</strong> लगभग{' '}
          <strong>{example.dailyUnits} यूनिट/दिन</strong> इस्तेमाल करता है
          और इसका खर्च लगभग <strong>{formatINR(example.monthlyCost)}/महीना</strong>{' '}
          ({formatINR(example.annualCost)}/साल) आता है,{' '}
          {formatINR(example.effectiveRatePerUnit)}/यूनिट पर।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने कुकटॉप का खर्च निकालें
        </h2>
        <InductionCooktopCalculator discoms={liveDiscoms} texts={inductionTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>यूनिट = वाटेज × घंटे ÷ 1000।</strong> कुकटॉप का दैनिक
            kWh इस्तेमाल इसकी वाटेज को रोज़ के सक्रिय खाना पकाने के घंटों से
            गुणा करके, वाट को किलोवाट में बदलने के लिए 1000 से भाग देकर
            मिलता है। हमेशा-ऑन उपकरण के उलट, ज़्यादातर घर इंडक्शन कुकटॉप
            रोज़ एक घंटे के एक हिस्से से लेकर कुछ घंटे तक ही चलाते हैं।
          </p>
          <p>
            <strong>आपके टॉप स्लैब पर आधारित।</strong> चूंकि कुकटॉप आपके
            मौजूदा इस्तेमाल के ऊपर जुड़ता है, इसकी यूनिट्स आपके सबसे ऊंचे
            टैरिफ स्लैब में गिरती हैं — हम असली खर्च के लिए वही मार्जिनल दर
            (फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क सहित) इस्तेमाल करते हैं।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/gas"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              गैस बिल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              PNG खाना पकाने के खर्च से तुलना करें।
            </p>
          </Link>
          <Link
            href="/fuel-cost/lpg-cylinder-usage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              LPG सिलेंडर इस्तेमाल
            </p>
            <p className="mt-1 text-xs text-ash/60">
              LPG सिलेंडर खाना पकाने के खर्च से तुलना करें।
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
