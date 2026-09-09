import type { Metadata } from 'next'
import Link from 'next/link'
import GenericApplianceCostCalculator, {
  type GenericApplianceCostCalculatorTexts,
} from '@/components/calculators/GenericApplianceCostCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/electricity/appliance-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = simpleApplianceCost({ discomCode: 'TNEB', wattage: 100, hoursPerDay: 4 })

const REFERENCE_APPLIANCES = [
  ['LED बल्ब', '5–15 W'],
  ['लैपटॉप', '40–65 W'],
  ['LED टीवी (42")', '60–120 W'],
  ['वॉशिंग मशीन', '350–700 W'],
  ['माइक्रोवेव ओवन', '900–1500 W'],
  ['इलेक्ट्रिक आयरन', '1000–1600 W'],
  ['पानी गर्म करने वाला (गीज़र)', '1500–3000 W'],
  ['मिक्सर/ग्राइंडर', '300–750 W'],
]

export const metadata: Metadata = {
  title: 'उपकरण बिजली कॉस्ट कैलकुलेटर 2026 — कोई भी उपकरण (भारत)',
  description:
    'किसी भी घरेलू उपकरण की वाटेज और रोज़ के इस्तेमाल के घंटों से उसका रनिंग कॉस्ट निकालें, आपके DISCOM के असली टैरिफ पर आधारित।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/electricity/appliance-cost-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Appliance Electricity Cost Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'बिजली', path: '/electricity' },
  { name: 'उपकरण कॉस्ट कैलकुलेटर', path: PATH },
])

const genericApplianceTextsHi: GenericApplianceCostCalculatorTexts = {
  title: 'उपकरण बिजली कॉस्ट कैलकुलेटर',
  subtitle: 'किसी भी उपकरण की वाटेज और रोज़ के घंटों से',
  discomLabel: 'DISCOM / राज्य',
  wattageLabel: 'उपकरण की वाटेज',
  wattageUnit: 'W',
  wattageHint: 'रेटिंग प्लेट या बॉक्स देखें — ज़्यादातर उपकरण रेटेड वाटेज छापते हैं।',
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'रनिंग कॉस्ट निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  monthlyCostLabel: 'अनुमानित मासिक खर्च',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/महीना',
  perDayLabel: 'यूनिट/दिन',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
}

const faqs = [
  {
    q: 'मुझे अपने उपकरण की वाटेज कहां मिलेगी?',
    a: 'यह उपकरण पर ही एक रेटिंग प्लेट या स्टिकर पर छपी होती है, या बॉक्स/मैनुअल में — आम तौर पर "Power" या "Rated Wattage" के नाम से W में लिखी होती है।',
  },
  {
    q: 'क्या यह उन उपकरणों के लिए भी काम करता है जिनके लिए हमारे पास पहले से एक समर्पित कैलकुलेटर है, जैसे AC या फ्रिज?',
    a: 'यह काम कर सकता है, लेकिन हमारे समर्पित AC, सीलिंग फैन और फ्रिज कैलकुलेटर ज़्यादा सटीक तरीका इस्तेमाल करते हैं — AC के लिए ISEER, और फ्रिज के लिए BEE लेबल आंकड़ा — इसलिए जहां उपलब्ध हों वहां वही इस्तेमाल करें। यह सामान्य टूल बाकी सबके लिए है।',
  },
  {
    q: 'उपकरण को मेरे टॉप टैरिफ स्लैब पर क्यों गिना जाता है?',
    a: 'भारतीय बिजली टैरिफ टेलिस्कोपिक होते हैं — आप जो भी उपकरण जोड़ते हैं वह आपके मौजूदा इस्तेमाल के ऊपर बैठता है, इसलिए इसकी यूनिट्स आपके सबसे ऊंचे स्लैब में गिरती हैं, किसी मिली-जुली औसत दर पर नहीं।',
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

export default function GenericApplianceCostPageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'बिजली', href: '/hi/electricity' },
          { label: 'उपकरण कॉस्ट कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⚡</span> Electricity hub
          </>
        }
        h1="उपकरण बिजली कॉस्ट कैलकुलेटर"
        subtitle={
          <>
            हमारे समर्पित टूल में शामिल न होने वाला कोई भी उपकरण — इसकी वाटेज
            और रोज़ के घंटे डालें, <strong>आपके DISCOM के असली टैरिफ</strong>{' '}
            पर आधारित।
          </>
        }
        stats={[
          { icon: '🔌', big: 'कोई भी', small: 'वाटेज', tone: 'hub' },
          { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
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
          तमिलनाडु में <strong>रोज़ 4 घंटे</strong> चलने वाला{' '}
          <strong>100W उपकरण</strong> लगभग{' '}
          <strong>{example.dailyUnits} यूनिट/दिन</strong> इस्तेमाल करता है और
          इसका खर्च लगभग <strong>{formatINR(example.monthlyCost)}/महीना</strong>{' '}
          आता है।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने उपकरण का खर्च निकालें
        </h2>
        <GenericApplianceCostCalculator discoms={liveDiscoms} texts={genericApplianceTextsHi} />
      </section>

      <section aria-labelledby="reference" className="mb-10">
        <h2 id="reference" className="font-display mb-2 text-2xl font-semibold">
          सामान्य उपकरण वाटेज — सिर्फ संदर्भ के लिए
        </h2>
        <p className="mb-4 text-ash/70">
          ये किसी आंकड़े को जांचने में मदद के लिए आम तौर पर प्रकाशित रेंज हैं
          — सटीक गणना के लिए हमेशा अपने खास उपकरण पर छपी वाटेज इस्तेमाल करें।
        </p>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">उपकरण</th>
                <th className="px-4 py-2 text-right font-semibold">सामान्य वाटेज</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {REFERENCE_APPLIANCES.map(([name, watts]) => (
                <tr key={name}>
                  <td className="px-4 py-2 font-medium">{name}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{watts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/appliances/ceiling-fan-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🌀</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सीलिंग फैन कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              फैन-टाइप प्रीसेट के साथ समर्पित टूल।
            </p>
          </Link>
          <Link
            href="/appliances/fridge-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              फ्रिज कॉस्ट कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              ज़्यादा सटीक — आपके फ्रिज के BEE लेबल का इस्तेमाल करता है।
            </p>
          </Link>
          <Link
            href="/hi/electricity/ev-charging-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              EV चार्जिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              ज़्यादातर उपकरणों से बड़ा लोड — इसका अपना टूल।
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
