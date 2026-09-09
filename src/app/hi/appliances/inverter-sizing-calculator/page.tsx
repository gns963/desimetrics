import type { Metadata } from 'next'
import Link from 'next/link'
import InverterSizingCalculator, {
  type InverterSizingCalculatorTexts,
} from '@/components/calculators/InverterSizingCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { sizeInverter } from '@/lib/calc/inverter'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/inverter-sizing-calculator'

const example = sizeInverter({ totalLoadWatts: 600, backupHours: 4, batteryVoltage: 12 })

export const metadata: Metadata = {
  title: 'होम UPS / इन्वर्टर साइज़िंग कैलकुलेटर 2026 — VA और बैटरी Ah',
  description:
    'मानक इलेक्ट्रिकल साइज़िंग फॉर्मूला इस्तेमाल करते हुए, अपने घरेलू बैकअप लोड और चाहे गए बैकअप घंटों के लिए सही इन्वर्टर VA रेटिंग और बैटरी Ah क्षमता जानें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/inverter-sizing-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Home UPS / Inverter Sizing Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'इन्वर्टर साइज़िंग कैलकुलेटर', path: PATH },
])

const inverterSizingTextsHi: InverterSizingCalculatorTexts = {
  title: 'होम UPS / इन्वर्टर साइज़िंग कैलकुलेटर',
  subtitle: 'आपको कितने VA का इन्वर्टर और बैटरी Ah चाहिए',
  loadLabel: 'बैकअप के लिए कुल लोड',
  loadUnit: 'W',
  loadHint: 'बिजली कटौती के दौरान आप जो कुछ भी चलाना चाहते हैं उसकी वाटेज जोड़ें — पंखे, लाइट, फ्रिज, टीवी, राउटर।',
  hoursLabel: 'ज़रूरी बैकअप अवधि',
  hoursUnit: 'घंटे',
  voltageLegend: 'बैटरी बैंक वोल्टेज',
  voltageOptions: [
    { value: '12', label: '12V (1 बैटरी)', icon: '🔋' },
    { value: '24', label: '24V (2 बैटरी)', icon: '🔋🔋' },
    { value: '48', label: '48V (4 बैटरी)', icon: '🔋🔋🔋' },
  ],
  ctaLabel: 'साइज़िंग निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  inverterSizeLabel: 'इन्वर्टर/UPS साइज़',
  batteryCapacityLabel: 'बैटरी क्षमता',
}

const faqs = [
  {
    q: 'मैं अपना लोड वाट में कैसे जोड़ूं?',
    a: 'हर उपकरण जिसे आप बैकअप देना चाहते हैं और उसकी रेटेड वाटेज (उपकरण या उसके बॉक्स पर छपी) की सूची बनाएं, फिर उन्हें जोड़ें। सामान्य आंकड़े: LED बल्ब 10W, सीलिंग फैन 75W, टीवी 80–150W, फ्रिज 100–200W (चलते हुए, स्टार्ट होते हुए नहीं), राउटर 15W।',
  },
  {
    q: 'कैलकुलेटर VA में 25% हेडरूम क्यों जोड़ता है?',
    a: 'यह एक आम तौर पर सुझाया गया सुरक्षा मार्जिन है ताकि इन्वर्टर लगातार अपनी बिल्कुल अधिकतम सीमा पर न चले, जो इसकी उम्र कम करता है और मोटर-आधारित उपकरणों के स्टार्ट होने से आने वाली छोटी सर्ज को संभालने की इसकी क्षमता को नुकसान पहुंचाता है।',
  },
  {
    q: 'क्या मुझे पूरी बैटरी डिस्चार्ज के लिए साइज़ करना चाहिए?',
    a: 'नहीं — यह कैलकुलेटर सामान्य राउंड-ट्रिप दक्षता इस्तेमाल करते हुए आपके बताए बैकअप घंटों के लिए बैटरी Ah साइज़ करता है, लेकिन बार-बार लेड-एसिड बैटरी को 100% तक खाली करना इसकी उम्र कम करता है। सुरक्षित-बनाम-पूरी-क्षमता के फर्क के लिए हमारा बैटरी बैकअप टाइम कैलकुलेटर देखें।',
  },
  {
    q: 'क्या मोटर उपकरण को उसकी चलने वाली वाटेज से अलग साइज़िंग चाहिए?',
    a: 'हां — मोटर (जैसे फ्रिज या पानी का पंप) स्टार्ट होते समय अपनी चलने वाली वाटेज का 2-3× एक छोटी सर्ज खींचते हैं। अगर आप ऐसे उपकरणों को बैकअप दे रहे हैं, तो सिर्फ स्थिर चलने वाला लोड नहीं, उस सर्ज को ध्यान में रखकर इन्वर्टर साइज़ करें।',
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

export default function InverterSizingPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'इन्वर्टर साइज़िंग कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="होम UPS / इन्वर्टर साइज़िंग कैलकुलेटर"
        subtitle="बिजली कटौती के दौरान बैकअप देने वाले उपकरणों के लिए, और कितनी देर के लिए, सही इन्वर्टर VA रेटिंग और बैटरी Ah क्षमता निकालें।"
        stats={[
          { icon: '⚡', big: '0.8', small: 'पावर फैक्टर', tone: 'hub' },
          { icon: '🛡️', big: '+25%', small: 'सुरक्षा हेडरूम', tone: 'hub' },
          { icon: '⚙️', big: '80%', small: 'सिस्टम दक्षता', tone: 'hub' },
          { icon: '🔌', big: '12/24/48V', small: 'बैटरी बैंक', tone: 'hub' },
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
          12V बैटरी बैंक पर <strong>4 घंटे</strong> बैकअप के लिए{' '}
          <strong>600W लोड</strong> को लगभग{' '}
          <strong>{example.recommendedVA.toLocaleString('en-IN')} VA</strong>{' '}
          का इन्वर्टर और <strong>{example.recommendedBatteryAh} Ah</strong>{' '}
          की बैटरी चाहिए।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना इन्वर्टर साइज़ करें
        </h2>
        <InverterSizingCalculator texts={inverterSizingTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>VA साइज़िंग।</strong> VA = (कुल वाट ÷ 0.8 पावर फैक्टर) ×
            1.25 हेडरूम, नज़दीकी 50 VA तक राउंड — होम इन्वर्टर साइज़ करने का
            एक मानक तरीका।
          </p>
          <p>
            <strong>बैटरी Ah साइज़िंग।</strong> ज़रूरी वाट-घंटे = लोड × बैकअप
            घंटे। बैटरी Ah = वाट-घंटे ÷ (वोल्टेज × 80% राउंड-ट्रिप दक्षता),
            इन्वर्टर रूपांतरण और बैटरी चार्ज/डिस्चार्ज नुकसान को ध्यान में
            रखते हुए।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/hi/appliances/household-bill-builder"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🏠</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              हाउसहोल्ड बिल बिल्डर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              वही उपकरण वाटेज डेटा, इस बार आपके बिजली बिल के लिए।
            </p>
          </Link>
          <Link
            href="/hi/appliances/inverter-backup-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              बैटरी बैकअप टाइम
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पहले से बैटरी है? जांचें यह असल में कितनी देर चलेगी।
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
              दिन की बिजली कटौती के लिए बैकअप को सोलर जनरेशन से जोड़ें।
            </p>
          </Link>
          <Link
            href="/hi/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              बिजली बिल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपने राज्य के लिए अपना पूरा मासिक बिल देखें।
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
