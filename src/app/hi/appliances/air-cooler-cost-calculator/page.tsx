import type { Metadata } from 'next'
import Link from 'next/link'
import AirCoolerCalculator, { type AirCoolerCalculatorTexts } from '@/components/calculators/AirCoolerCalculator'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/air-cooler-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = simpleApplianceCost({ discomCode: 'TNEB', wattage: 230, hoursPerDay: 8 })

export const metadata: Metadata = {
  title: 'एयर कूलर बिजली कॉस्ट कैलकुलेटर 2026 — मासिक और सालाना',
  description:
    'अपने एयर कूलर (डेज़र्ट, टावर या पर्सनल) की वाटेज और रोज़ के घंटों से बिजली खर्च निकालें, आपके DISCOM के असली टैरिफ पर आधारित।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/air-cooler-cost-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Air Cooler Electricity Cost Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'एयर कूलर कॉस्ट कैलकुलेटर', path: PATH },
])

const airCoolerTextsHi: AirCoolerCalculatorTexts = {
  title: 'एयर कूलर कॉस्ट कैलकुलेटर',
  subtitle: 'अपने एयर कूलर का बिजली खर्च निकालें',
  discomLabel: 'DISCOM / राज्य',
  coolerTypeLegend: 'कूलर का प्रकार',
  coolerTypes: [
    { value: 'personal', label: 'पर्सनल', icon: '🌬️', watts: 150 },
    { value: 'tower', label: 'टावर', icon: '🗼', watts: 180 },
    { value: 'desert', label: 'डेज़र्ट/विंडो', icon: '🏜️', watts: 230 },
    { value: 'custom', label: 'कस्टम', icon: '⚙️', watts: 0 },
  ],
  customWattageLabel: 'कूलर की वाटेज',
  customWattageUnit: 'W',
  customWattageHint: 'कूलर के रेटिंग लेबल या बॉक्स पर छपी वाटेज जांचें।',
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'कूलर का खर्च निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  monthlyCostLabel: 'अनुमानित मासिक खर्च',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/महीना',
  wattageLabel: 'वाटेज',
  perDayLabel: 'यूनिट प्रति दिन',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
}

const faqs = [
  {
    q: 'एक एयर कूलर कितनी बिजली इस्तेमाल करता है?',
    a: 'एक पर्सनल/छोटा कूलर आम तौर पर लगभग 150W खींचता है, एक टावर कूलर लगभग 180W, और एक बड़ा डेज़र्ट या विंडो कूलर लगभग 230W — ज़्यादातर फैन मोटर और पानी के पंप से, यही वजह है कि कूलर समान कूलिंग क्षेत्र वाले AC से कहीं कम बिजली इस्तेमाल करते हैं।',
  },
  {
    q: 'क्या एयर कूलर AC से चलाने में सस्ता है?',
    a: 'हां, काफी हद तक — कूलर की मोटर और पंप, AC कंप्रेसर की पावर के मुकाबले बहुत कम खींचते हैं। ट्रेडऑफ कूलिंग के तरीके का है: कूलर वाष्पीकरण से काम करता है और गर्म, सूखी जलवायु में सबसे असरदार है, जबकि AC सक्रिय रूप से गर्मी हटाता है और नमी वाली परिस्थितियों में भी अच्छा काम करता है।',
  },
  {
    q: 'कूलर को मेरे टॉप टैरिफ स्लैब पर क्यों गिना जाता है?',
    a: 'भारतीय बिजली टैरिफ टेलिस्कोपिक होते हैं — इस्तेमाल को धीरे-धीरे महंगे होते स्लैब में बिल किया जाता है। आप जो भी उपकरण जोड़ते हैं वह आपके मौजूदा इस्तेमाल के ऊपर बैठता है, इसलिए इसकी यूनिट्स आपके सबसे ऊंचे स्लैब में गिरती हैं, किसी मिली-जुली औसत दर पर नहीं।',
  },
  {
    q: 'मैं अपने कूलर की सटीक वाटेज कैसे जानूं?',
    a: 'कूलर के पीछे या आधार पर रेटिंग लेबल, या इसके बॉक्स को जांचें — इसमें रेटेड वाटेज लिखी होती है (कभी-कभी फैन मोटर + पंप में बांटी हुई)।',
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

export default function AirCoolerCostPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'एयर कूलर कॉस्ट कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="एयर कूलर बिजली कॉस्ट कैलकुलेटर"
        subtitle={
          <>
            जानें आपका एयर कूलर चलाने में कितना खर्च आता है। एक कूलर प्रकार
            चुनें या इसकी सटीक वाटेज डालें, रोज़ के घंटे सेट करें, और हम
            यूनिट्स को आपके <strong>DISCOM के टॉप बिजली स्लैब</strong> पर
            गिनेंगे।
          </>
        }
        stats={[
          { icon: '🌬️', big: '150–230W', small: 'सामान्य रेंज', tone: 'hub' },
          { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '⚡', big: '~78%', small: 'AC से कम पावर*', tone: 'spark-teal' },
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
          तमिलनाडु में रोज़ 8 घंटे चलने वाला <strong>230W डेज़र्ट कूलर</strong>{' '}
          लगभग <strong>{example.dailyUnits} यूनिट/दिन</strong> इस्तेमाल करता
          है और इसका खर्च लगभग{' '}
          <strong>{formatINR(example.monthlyCost)}/महीना</strong> (
          {formatINR(example.annualCost)}/साल) आता है,{' '}
          {formatINR(example.effectiveRatePerUnit)}/यूनिट पर।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने कूलर का खर्च निकालें
        </h2>
        <AirCoolerCalculator discoms={liveDiscoms} texts={airCoolerTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>यूनिट = वाटेज × घंटे ÷ 1000।</strong> कूलर का दैनिक kWh
            इस्तेमाल इसकी वाटेज को रोज़ चलने के घंटों से गुणा करके, वाट को
            किलोवाट में बदलने के लिए 1000 से भाग देकर मिलता है।
          </p>
          <p>
            <strong>आपके टॉप स्लैब पर आधारित।</strong> चूंकि कूलर आपके
            मौजूदा इस्तेमाल के ऊपर जुड़ता है, इसकी यूनिट्स आपके सबसे ऊंचे
            टैरिफ स्लैब में गिरती हैं — हम असली खर्च के लिए वही मार्जिनल दर
            (फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क सहित) इस्तेमाल करते हैं।
          </p>
        </div>
        <p className="mt-3 text-xs text-ash/50">
          *&ldquo;~78% कम पावर&rdquo; आंकड़ा इस साइट के अपने इंजन से गिना
          गया है: रोज़ 8 घंटे चलने वाला 230W डेज़र्ट कूलर उन्हीं 8 घंटों में
          1.5-टन 3-स्टार AC से लगभग 78% कम यूनिट इस्तेमाल करता है। यह बिजली
          की खपत की तुलना करता है, कूलिंग असरदारता की नहीं — कूलर वाष्पीकरण
          से काम करता है और आपकी जलवायु की नमी के हिसाब से AC से काफी अलग
          प्रदर्शन करता है।
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC रनिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              उसी कमरे के लिए AC से तुलना करें।
            </p>
          </Link>
          <Link
            href="/hi/appliances/ceiling-fan-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🌀</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सीलिंग फैन कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              कमरे में हवा चलाने का सबसे सस्ता तरीका।
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
