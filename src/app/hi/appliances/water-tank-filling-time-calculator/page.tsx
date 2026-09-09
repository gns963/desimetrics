import type { Metadata } from 'next'
import Link from 'next/link'
import WaterTankFillCalculator, {
  type WaterTankFillCalculatorTexts,
} from '@/components/calculators/WaterTankFillCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { estimateTankFillTime } from '@/lib/calc/watertank'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/water-tank-filling-time-calculator'

const example = estimateTankFillTime({ capacityLiters: 1000, flowRateLpm: 50 })

export const metadata: Metadata = {
  title: 'पानी टैंक फिलिंग टाइम कैलकुलेटर 2026 — क्षमता और पंप फ्लो से',
  description:
    'अपने पानी की टंकी की क्षमता (लीटर में) और अपने पंप की फ्लो रेट (LPM में) से यह निकालें कि इसे भरने में कितना समय लगता है, साथ ही असली-दुनिया की ऊंचाई फ्लो को कैसे प्रभावित करती है इस पर एक नोट।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/water-tank-filling-time-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Water Tank Filling Time Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'पानी टैंक फिलिंग टाइम कैलकुलेटर', path: PATH },
])

const waterTankTextsHi: WaterTankFillCalculatorTexts = {
  title: 'पानी टैंक फिलिंग टाइम कैलकुलेटर',
  subtitle: 'आपकी टंकी को भरने में कितना समय लगता है',
  capacityLabel: 'टंकी की क्षमता',
  capacityUnit: 'लीटर',
  flowLabel: 'पंप फ्लो रेट',
  flowUnit: 'LPM',
  flowHint: 'अपने पंप की रेटेड फ्लो (लीटर प्रति मिनट) जांचें — पानी को ओवरहेड टैंक तक उठाने के बाद असली फ्लो अक्सर कम होती है।',
  ctaLabel: 'फिल टाइम निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  resultLabel: 'अनुमानित फिल टाइम',
  minUnit: 'मिनट',
  hoursTemplate: '≈ {hours} घंटे',
}

const faqs = [
  {
    q: 'मुझे अपने पंप की फ्लो रेट कहां मिलेगी?',
    a: 'यह पंप के नेमप्लेट या स्पेक शीट पर छपी होती है, आम तौर पर LPM (लीटर प्रति मिनट) या LPH (लीटर प्रति घंटा, LPM के लिए 60 से भाग दें) में। एक सामान्य 0.5 HP घरेलू पंप कम ऊंचाई पर लगभग 40-70 LPM और एक 1 HP पंप लगभग 80-120 LPM देता है — लेकिन यह मॉडल के हिसाब से काफी बदलता है, इसलिए जहां संभव हो अपना खास पंप जांचें।',
  },
  {
    q: 'मेरी टंकी को इस अनुमान से ज़्यादा समय क्यों लग सकता है?',
    a: 'पंप नेमप्लेट फ्लो रेट आम तौर पर शून्य या कम हेड (कोई ऊर्ध्वाधर उठान नहीं) पर मापी जाती है। पानी को ओवरहेड या छत की टंकी तक पंप करना, संकरी या लंबी पाइपलाइन से गुज़रना, या आधे बंद वाल्व से गुज़रना — ये सब असली फ्लो को रेटेड आंकड़े से कम कर देते हैं।',
  },
  {
    q: 'क्या टंकी का आकार फिल टाइम को प्रभावित करता है?',
    a: 'नहीं — फिल टाइम सिर्फ आयतन और फ्लो रेट पर निर्भर करता है, आकार पर नहीं। एक लंबी संकरी टंकी और एक छोटी चौड़ी टंकी, अगर लीटर क्षमता एक जैसी हो, तो एक ही फ्लो रेट पर एक ही समय में भरती हैं।',
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

export default function WaterTankFillPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'पानी टैंक फिलिंग टाइम कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="पानी टैंक फिलिंग टाइम कैलकुलेटर"
        subtitle="जानें आपकी क्षमता और अपने पंप की फ्लो रेट से आपकी पानी की टंकी को भरने में कितना समय लगता है।"
        stats={[
          { icon: '🧮', big: 'V ÷ Q', small: 'फॉर्मूला', tone: 'hub' },
          { icon: '💧', big: 'LPM', small: 'फ्लो रेट इकाई', tone: 'hub' },
          { icon: '📏', big: 'ज़ीरो-हेड', small: 'नेमप्लेट आधार', tone: 'hub' },
          { icon: '⚡', big: 'तुरंत', small: 'बिना लॉगिन', tone: 'hub' },
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
          <strong>50 LPM</strong> देने वाले पंप से भरी जा रही{' '}
          <strong>1,000-लीटर की टंकी</strong> को लगभग{' '}
          <strong>{example.minutes} मिनट</strong> ({example.hours} घंटे)
          लगते हैं।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना फिल टाइम निकालें
        </h2>
        <WaterTankFillCalculator texts={waterTankTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <p className="text-ash/80">
          फिल टाइम (मिनट) = टंकी क्षमता (लीटर) ÷ पंप फ्लो रेट (लीटर/मिनट)।
          सरल आयतन गणित — इकलौता असली-दुनिया वैरिएबल आपके असली सेटअप के लिए
          सटीक फ्लो रेट पाना है, क्योंकि उठान की ऊंचाई और पाइप का साइज़
          दोनों फ्लो को पंप की रेटेड (ज़ीरो-हेड) आंकड़े से कम कर देते हैं।
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/appliances/room-cooling-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⏱️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              रूम कूलिंग टाइम
            </p>
            <p className="mt-1 text-xs text-ash/60">
              एक और सरल फिज़िक्स-आधारित घरेलू-उपयोगिता टाइमर।
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
              बिजली कटौती के दौरान अपने पंप के लिए बैकअप पावर साइज़ करें।
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
