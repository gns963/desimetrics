import type { Metadata } from 'next'
import Link from 'next/link'
import CeilingFanCalculator, { type CeilingFanCalculatorTexts } from '@/components/calculators/CeilingFanCalculator'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { simpleApplianceCost } from '@/lib/calc/appliance'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/ceiling-fan-cost-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const example = simpleApplianceCost({ discomCode: 'TNEB', wattage: 75, hoursPerDay: 10 })

export const metadata: Metadata = {
  title: 'सीलिंग फैन बिजली कॉस्ट कैलकुलेटर 2026 — मासिक और सालाना',
  description:
    'अपने सीलिंग फैन की वाटेज और रोज़ के घंटों से बिजली खर्च निकालें, आपके DISCOM के असली टैरिफ पर आधारित। स्टैंडर्ड, BEE 5-स्टार और BLDC फैन की तुलना करें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/ceiling-fan-cost-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Ceiling Fan Electricity Cost Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'सीलिंग फैन कॉस्ट कैलकुलेटर', path: PATH },
])

const ceilingFanTextsHi: CeilingFanCalculatorTexts = {
  title: 'सीलिंग फैन कॉस्ट कैलकुलेटर',
  subtitle: 'अपने सीलिंग फैन का बिजली खर्च निकालें',
  discomLabel: 'DISCOM / राज्य',
  fanTypeLegend: 'फैन का प्रकार',
  fanTypes: [
    { value: 'standard', label: 'स्टैंडर्ड', icon: '🌀', watts: 75 },
    { value: 'star', label: 'BEE 5-स्टार', icon: '⭐', watts: 50 },
    { value: 'bldc', label: 'BLDC', icon: '🍃', watts: 32 },
    { value: 'custom', label: 'कस्टम', icon: '⚙️', watts: 0 },
  ],
  customWattageLabel: 'फैन की वाटेज',
  customWattageUnit: 'W',
  customWattageHint: 'फैन के बॉक्स या मोटर लेबल पर छपी वाटेज जांचें।',
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'फैन का खर्च निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  monthlyCostLabel: 'अनुमानित मासिक खर्च',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/महीना',
  wattageLabel: 'वाटेज',
  perDayLabel: 'यूनिट प्रति दिन',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
}

const faqs = [
  {
    q: 'एक सीलिंग फैन कितनी बिजली इस्तेमाल करता है?',
    a: 'एक सामान्य भारतीय सीलिंग फैन लगभग 75W खींचता है। एक BEE 5-स्टार रेटेड फैन आम तौर पर लगभग 50W इस्तेमाल करता है, और एक BLDC (ब्रशलेस DC) "सुपर-एफिशिएंट" फैन समान हवा के लिए सिर्फ 28–35W इस्तेमाल करता है — स्टैंडर्ड फैन से लगभग 60% कम।',
  },
  {
    q: 'क्या BLDC फैन अतिरिक्त कीमत के लायक है?',
    a: 'आम तौर पर हां, अगर आप कई फैन वाले घर में रोज़ कई घंटे फैन चलाते हैं — वाटेज का अंतर जुड़ता जाता है। स्टैंडर्ड फैन के मुकाबले सालाना बचत देखने के लिए ऊपर कैलकुलेटर में अपने असली रोज़ के घंटे इस्तेमाल करें।',
  },
  {
    q: 'फैन को मेरे टॉप टैरिफ स्लैब पर क्यों गिना जाता है?',
    a: 'भारतीय बिजली टैरिफ टेलिस्कोपिक होते हैं — इस्तेमाल को धीरे-धीरे महंगे होते स्लैब में बिल किया जाता है। आप जो भी उपकरण जोड़ते हैं वह आपके मौजूदा इस्तेमाल के ऊपर बैठता है, इसलिए इसकी यूनिट्स आपके सबसे ऊंचे स्लैब में गिरती हैं, किसी मिली-जुली औसत दर पर नहीं।',
  },
  {
    q: 'मैं अपने फैन की सटीक वाटेज कैसे जानूं?',
    a: 'फैन की मोटर हाउसिंग पर या इसके बॉक्स पर लगे स्टिकर को जांचें — नियमित श्रेणियों के लिए BEE स्टार-लेबलिंग कार्यक्रम के हिस्से के रूप में भारतीय फैन को रेटेड वाटेज दिखाना ज़रूरी है।',
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

export default function CeilingFanCostPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'सीलिंग फैन कॉस्ट कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliance hub
          </>
        }
        h1="सीलिंग फैन बिजली कॉस्ट कैलकुलेटर"
        subtitle={
          <>
            जानें आपका सीलिंग फैन चलाने में कितना खर्च आता है। एक फैन प्रकार
            चुनें या इसकी सटीक वाटेज डालें, रोज़ के घंटे सेट करें, और हम
            यूनिट्स को आपके <strong>DISCOM के टॉप बिजली स्लैब</strong> पर
            गिनेंगे।
          </>
        }
        stats={[
          { icon: '🌀', big: '28–75W', small: 'सामान्य रेंज', tone: 'hub' },
          { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '⚡', big: '~60%', small: 'BLDC बनाम स्टैंडर्ड', tone: 'spark-teal' },
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
          तमिलनाडु में रोज़ 10 घंटे चलने वाला <strong>स्टैंडर्ड 75W फैन</strong>{' '}
          लगभग <strong>{example.dailyUnits} यूनिट/दिन</strong> इस्तेमाल करता
          है और इसका खर्च लगभग <strong>{formatINR(example.monthlyCost)}/महीना</strong>{' '}
          ({formatINR(example.annualCost)}/साल) आता है,{' '}
          {formatINR(example.effectiveRatePerUnit)}/यूनिट पर।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने फैन का खर्च निकालें
        </h2>
        <CeilingFanCalculator discoms={liveDiscoms} texts={ceilingFanTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>यूनिट = वाटेज × घंटे ÷ 1000।</strong> फैन का दैनिक kWh
            इस्तेमाल इसकी वाटेज को रोज़ चलने के घंटों से गुणा करके, वाट को
            किलोवाट में बदलने के लिए 1000 से भाग देकर मिलता है।
          </p>
          <p>
            <strong>आपके टॉप स्लैब पर आधारित।</strong> चूंकि फैन आपके मौजूदा
            इस्तेमाल के ऊपर जुड़ता है, इसकी यूनिट्स आपके सबसे ऊंचे टैरिफ
            स्लैब में गिरती हैं — हम असली खर्च के लिए वही मार्जिनल दर (फ्यूल
            कॉस्ट एडजस्टमेंट और बिजली शुल्क सहित) इस्तेमाल करते हैं।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/appliances/fridge-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              फ्रिज कॉस्ट कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              आपके फ्रिज के BEE लेबल पर सालाना kWh आंकड़े से।
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
