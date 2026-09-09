import type { Metadata } from 'next'
import Link from 'next/link'
import InverterBackupCalculator, {
  type InverterBackupCalculatorTexts,
} from '@/components/calculators/InverterBackupCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { estimateBackupTime } from '@/lib/calc/inverter'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/inverter-backup-time-calculator'

const example = estimateBackupTime({ batteryAh: 150, batteryVoltage: 12, loadWatts: 400 })

export const metadata: Metadata = {
  title: 'इन्वर्टर बैटरी बैकअप टाइम कैलकुलेटर 2026 — यह कितनी देर चलती है',
  description:
    'गिनें आपकी इन्वर्टर बैटरी किसी दिए गए लोड के लिए असल में कितनी देर चलेगी, सुरक्षित (50% डेप्थ ऑफ डिस्चार्ज) और पूरी-क्षमता दोनों अनुमानों के साथ।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/inverter-backup-time-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Inverter Battery Backup Time Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'इन्वर्टर बैकअप टाइम कैलकुलेटर', path: PATH },
])

const inverterBackupTextsHi: InverterBackupCalculatorTexts = {
  title: 'इन्वर्टर बैटरी बैकअप कैलकुलेटर',
  subtitle: 'आपकी बैटरी असल में कितनी देर चलेगी',
  ahLabel: 'बैटरी क्षमता',
  ahUnit: 'Ah',
  ahHint: "बैटरी के नेमप्लेट पर छपी होती है, जैसे '150 Ah'।",
  voltageLegend: 'बैटरी बैंक वोल्टेज',
  voltageOptions: [
    { value: '12', label: '12V (1 बैटरी)', icon: '🔋' },
    { value: '24', label: '24V (2 बैटरी)', icon: '🔋🔋' },
    { value: '48', label: '48V (4 बैटरी)', icon: '🔋🔋🔋' },
  ],
  loadLabel: 'जुड़ा हुआ लोड',
  loadUnit: 'W',
  ctaLabel: 'बैकअप टाइम निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  safeTimeLabel: 'सुरक्षित बैकअप टाइम',
  safeTimeSub: '50% डेप्थ ऑफ डिस्चार्ज',
  fullTimeLabel: 'पूरी-क्षमता टाइम',
  fullTimeSub: 'पूरी तरह खाली',
  hoursUnit: 'घंटे',
}

const faqs = [
  {
    q: 'कैलकुलेटर दो अलग बैकअप टाइम क्यों दिखाता है?',
    a: 'पूरी-क्षमता आंकड़ा सैद्धांतिक अधिकतम है अगर आप बैटरी पूरी तरह खाली कर दें। सुरक्षित आंकड़ा 50% डेप्थ ऑफ डिस्चार्ज इस्तेमाल करता है, जो लेड-एसिड बैटरी के लिए एक व्यापक रूप से सुझाई गई सीमा है — बार-बार इससे ज़्यादा गहराई तक खाली करना बैटरी की इस्तेमाल योग्य उम्र को काफी कम कर देता है।',
  },
  {
    q: 'मुझे अपनी बैटरी की Ah रेटिंग कहां मिलेगी?',
    a: 'यह बैटरी के नेमप्लेट या केस पर छपी होती है, आम तौर पर वोल्टेज के साथ — उदाहरण के लिए "12V 150Ah"।',
  },
  {
    q: 'क्या बैटरी की उम्र असली बैकअप टाइम को प्रभावित करती है?',
    a: 'हां, काफी हद तक। बैटरी की इस्तेमाल योग्य क्षमता उम्र और चार्ज साइकल के साथ घटती है — एक पुरानी बैटरी अपनी रेटेड Ah से काफी कम दे सकती है। यह कैलकुलेटर नेमप्लेट रेटिंग इस्तेमाल करता है, जो एक नई, पूरी तरह स्वस्थ बैटरी दिखाती है।',
  },
  {
    q: 'मुझे कौन सा लोड डालना चाहिए?',
    a: 'कटौती के दौरान इन्वर्टर पर असल में चल रही हर चीज़ की वाटेज जोड़ें — अपने इन्वर्टर की VA रेटिंग नहीं। अगर आपको अपने कुल लोड का पता नहीं है, तो हमारा इन्वर्टर साइज़िंग कैलकुलेटर देखें।',
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

export default function InverterBackupPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'इन्वर्टर बैकअप टाइम कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="इन्वर्टर बैटरी बैकअप टाइम कैलकुलेटर"
        subtitle="पहले से बैटरी है? जानें आपके लोड के लिए यह असल में कितनी देर चलेगी — एक सुरक्षित अनुमान और सैद्धांतिक अधिकतम दोनों।"
        stats={[
          { icon: '🔋', big: '50%', small: 'सुरक्षित डेप्थ ऑफ डिस्चार्ज', tone: 'hub' },
          { icon: '⚙️', big: '80%', small: 'सिस्टम दक्षता', tone: 'hub' },
          { icon: '🔌', big: '12/24/48V', small: 'बैटरी बैंक', tone: 'hub' },
          { icon: '⏱️', big: '2 मोड', small: 'सुरक्षित बनाम पूरा', tone: 'hub' },
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
          एक <strong>400W लोड</strong> चलाने वाली <strong>150 Ah, 12V
          बैटरी</strong> सुरक्षित 50% डेप्थ ऑफ डिस्चार्ज पर लगभग{' '}
          <strong>{example.safeCapacityHours} घंटे</strong> चलती है, या पूरी
          तरह खाली करने पर {example.fullCapacityHours} घंटे तक।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना बैकअप टाइम निकालें
        </h2>
        <InverterBackupCalculator texts={inverterBackupTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>उपलब्ध वाट-घंटे।</strong> बैटरी Ah × वोल्टेज × 80%
            राउंड-ट्रिप दक्षता, इन्वर्टर रूपांतरण और बैटरी नुकसान को ध्यान
            में रखते हुए इस्तेमाल योग्य वाट-घंटे देता है।
          </p>
          <p>
            <strong>लोड से भाग दें।</strong> बैकअप घंटे = इस्तेमाल योग्य
            वाट-घंटे ÷ जुड़ा हुआ लोड (वाट में)। सुरक्षित आंकड़ा इसके ऊपर 50%
            डेप्थ-ऑफ-डिस्चार्ज सीमा लगाता है।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/appliances/inverter-sizing-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              इन्वर्टर साइज़िंग
            </p>
            <p className="mt-1 text-xs text-ash/60">
              नया खरीद रहे हैं? अपनी ज़रूरत के लिए सही VA और Ah जानें।
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
              दिन में सूरज से अपना बैटरी बैंक रिचार्ज करें।
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
