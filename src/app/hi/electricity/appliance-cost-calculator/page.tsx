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

const USAGE_SCENARIOS = [
  { name: 'LED बल्ब', watts: 10, hours: 5 },
  { name: 'लैपटॉप', watts: 55, hours: 6 },
  { name: 'वॉशिंग मशीन', watts: 500, hours: 0.5 },
  { name: 'पानी गर्म करने वाला (गीज़र)', watts: 2000, hours: 0.5 },
].map((a) => ({
  ...a,
  ...simpleApplianceCost({ discomCode: 'TNEB', wattage: a.watts, hoursPerDay: a.hours }),
}))

const PHANTOM_WATTS = 5
const phantomCost = simpleApplianceCost({
  discomCode: 'TNEB',
  wattage: PHANTOM_WATTS,
  hoursPerDay: 24,
})

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

      <section aria-labelledby="how-it-works" className="mb-10">
        <h2 id="how-it-works" className="font-display mb-4 text-2xl font-semibold">
          गणना कैसे होती है
        </h2>
        <p className="text-ash/80">तीन चरण, जिन्हें आप फोन कैलकुलेटर से जांच सकते हैं:</p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">यूनिट = वॉट × घंटे ÷ 1000</strong> — बिल
              पर एक यूनिट मतलब एक किलोवाट को एक घंटे तक चलाना। {example.wattage}W का
              उपकरण {example.hoursPerDay} घंटे/दिन चलने पर उस दिन{' '}
              {example.dailyUnits} यूनिट इस्तेमाल करता है।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">महीना लगभग 30 दिन का</strong> — तो
              मासिक आंकड़ा रोज़ के यूनिट को 30 से गुणा करके मिलता है: उसी उपकरण के लिए{' '}
              {example.monthlyUnits} यूनिट/महीना।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">आपकी मार्जिनल दर पर कीमत</strong> —
              औसत दर पर नहीं। भारतीय घरेलू टैरिफ टेलिस्कोपिक हैं, इसलिए आपकी मौजूदा
              खपत के ऊपर जो भी जुड़ता है वह आपके सबसे ऊंचे स्लैब पर बिल होता है — इस दर
              में फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क पहले से शामिल हैं।
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          निष्कर्ष: पूरी गणना दो गुणा और एक टैरिफ लुकअप है — यहां कुछ भी छिपा हुआ नहीं है।
        </p>
      </section>

      <section aria-labelledby="wattage-vs-hours" className="mb-10">
        <h2 id="wattage-vs-hours" className="font-display mb-4 text-2xl font-semibold">
          वॉटेज दर तय करती है, घंटे बिल तय करते हैं
        </h2>
        <p className="text-ash/80">
          थोड़ी देर चलने वाला ज़्यादा वॉट का उपकरण, पूरे दिन चलने वाले कम वॉट के उपकरण
          से सस्ता पड़ सकता है। यूनिट वॉट <em>गुणा</em> घंटे होते हैं, इसलिए इस्तेमाल
          का तरीका उतना ही मायने रखता है जितना उपकरण पर छपा आंकड़ा:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">उपकरण</th>
                <th className="px-4 py-2 text-right font-semibold">वॉटेज</th>
                <th className="px-4 py-2 text-right font-semibold">सामान्य इस्तेमाल</th>
                <th className="px-4 py-2 text-right font-semibold">यूनिट/महीना</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {USAGE_SCENARIOS.map((s) => (
                <tr key={s.name}>
                  <td className="px-4 py-2 font-medium">{s.name}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-ash/70">
                    {s.watts}W
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-ash/70">
                    {s.hours}घं/दिन
                  </td>
                  <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                    {s.monthlyUnits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ash/50">
          सभी पंक्तियां उदाहरण के लिए TNEB की मार्जिनल दर पर — अपनी असल DISCOM के लिए
          ऊपर का कैलकुलेटर इस्तेमाल करें।
        </p>
        <p className="mt-3 text-ash/80">
          ध्यान दें कि आधे घंटे चलने वाला <strong>2000W गीज़र</strong>, पांच घंटे चलने
          वाले <strong>10W बल्ब</strong> से ज़्यादा इस्तेमाल करता है, पर उतना ज़्यादा
          नहीं जितना सिर्फ वॉटेज का अंतर बताता है — क्योंकि बल्ब के ज़्यादा घंटे उसकी
          कम वॉटेज की कुछ हद तक भरपाई कर देते हैं। यही वजह है कि सिर्फ वॉटेज, बिना
          घंटों के, बहुत कम बताता है।
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          निष्कर्ष: दो उपकरणों की तुलना से पहले हमेशा घंटों से गुणा करें — अकेली वॉटेज
          कोई लागत रैंकिंग नहीं है।
        </p>
      </section>

      <section aria-labelledby="standby" className="mb-10">
        <h2 id="standby" className="font-display mb-4 text-2xl font-semibold">
          जो उपकरण कभी बंद नहीं होते, उनकी कीमत
        </h2>
        <p className="text-ash/80">
          फोन, सेट-टॉप बॉक्स, राउटर, लगे हुए चार्जर, और स्टैंडबाय लाइट वाले उपकरण —
          ये सब चौबीसों घंटे थोड़ी करंट खींचते रहते हैं। एक उपकरण जो लगातार{' '}
          {PHANTOM_WATTS}W खींचता है, दिन के 24 घंटे, महीने भर, वह{' '}
          {phantomCost.monthlyUnits} यूनिट बनता है — और एक सामान्य घर में एक नहीं,
          ऐसे कई उपकरण एक साथ चलते रहते हैं।
        </p>
        <p className="mt-3 text-ash/80">
          वॉशिंग मशीन या गीज़र के उलट, स्टैंडबाय खपत रोज़मर्रा में दिखती नहीं — कोई भी
          हमेशा ऑन रहने वाले राउटर पर ध्यान नहीं देता, क्योंकि उसे हमेशा ऑन ही रहना है।
          इसीलिए इसे जांचना ज़रूरी है: यह इकलौती ऐसी खपत है जिसे यह कैलकुलेटर तो आंक
          सकता है, पर जिसे आप स्टॉपवॉच से नहीं नाप सकते, क्योंकि &ldquo;घंटे/दिन&rdquo;
          यहां सीधे 24 है। हमारा{' '}
          <Link href="/hi/appliances/phantom-load-checker" className="text-brass underline">
            फैंटम लोड चेकर
          </Link>{' '}
          खासतौर पर ऐसे कई उपकरणों को एक साथ जोड़ने के लिए बनाया गया है।
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          निष्कर्ष: छोटी वॉटेज को महीने के 720 घंटों से गुणा करना नगण्य नहीं होता —
          देखें कि हमेशा क्या प्लग में लगा है, सिर्फ यह नहीं कि आप क्या ऑन करते हैं।
        </p>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          वे गलतियां जो आंकड़ा बिगाड़ देती हैं
        </h2>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">W की बजाय VA पढ़ना</strong> — कुछ
              लेबल वॉट की बजाय एपेरेंट पावर (वोल्ट-एम्पीयर) छापते हैं। हीटर या आयरन
              जैसे शुद्ध रेसिस्टिव उपकरण में दोनों करीब होते हैं; मोटर या
              इलेक्ट्रॉनिक्स में इनमें असली फर्क हो सकता है।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">रेटेड अधिकतम को सामान्य खपत मानना</strong>{' '}
              — केतली या आयरन तापमान पहुंचने के बाद अपना हीटिंग एलिमेंट बार-बार
              ऑन-ऑफ करता है; नेमप्लेट वॉटेज उसका पीक है, लगातार औसत नहीं।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">चालू रहने के घंटे बनाम असल पावर खींचने के घंटे</strong>{' '}
              — 45 मिनट का वॉशिंग साइकल पूरे 45 मिनट अपनी पूरी वॉटेज नहीं खींचता; वहीं
              म्यूट पर चलता टीवी भी &ldquo;ऑन&rdquo; गिना जाता है।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              <strong className="text-ink-navy">यूनिट को रुपये मान लेना</strong> — इस
              टूल का आउटपुट kWh है; ₹ आंकड़ा आपकी DISCOM की मार्जिनल दर से गुणा करने
              पर आता है, जो कैलकुलेटर खुद कर देता है।
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          निष्कर्ष: अजीब लगने वाला नतीजा आमतौर पर गलत वॉटेज या गलत घंटों की वजह से
          होता है — फॉर्मूला की गलती से नहीं।
        </p>
      </section>

      <section aria-labelledby="when-dedicated" className="mb-10">
        <h2 id="when-dedicated" className="font-display mb-4 text-2xl font-semibold">
          कब कोई डेडिकेटेड कैलकुलेटर बेहतर जवाब देता है
        </h2>
        <p className="text-ash/80">
          यह टूल हर उपकरण को आपके डाले घंटों तक एक स्थिर वॉटेज मानकर चलता है, जो
          साधारण रेसिस्टिव लोड के लिए सही है, पर कुछ श्रेणियों के अपने व्यवहार को
          कम या ज़्यादा आंक सकता है:
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">एयर कंडीशनर</strong> पूरी क्षमता पर
              लगातार नहीं, बल्कि कंप्रेसर को ऑन-ऑफ करते हैं — हमारा{' '}
              <Link href="/hi/ac/bill-calculator" className="text-brass underline">
                AC रनिंग कॉस्ट कैलकुलेटर
              </Link>{' '}
              उस ड्यूटी साइकल को टनेज और स्टार रेटिंग से मॉडल करता है, न कि एक
              स्थिर वॉटेज से।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">रेफ्रिजरेटर</strong> लगातार चलते हैं
              पर उनका कंप्रेसर भी ऑन-ऑफ होता है, और BEE लेबल पर पहले से एक सालाना
              kWh आंकड़ा छपा होता है — हमारा{' '}
              <Link href="/hi/appliances/fridge-cost-calculator" className="text-brass underline">
                फ्रिज कॉस्ट कैलकुलेटर
              </Link>{' '}
              वॉटेज के अंदाज़े की बजाय सीधे वही लेबल आंकड़ा इस्तेमाल करता है।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">सीलिंग फैन</strong> का अपना
              कैलकुलेटर स्पीड-सेटिंग प्रीसेट के साथ है, क्योंकि कम स्पीड पर चलाने पर
              नेमप्लेट वॉटेज से काफी कम खपत होती है — देखें हमारा{' '}
              <Link href="/hi/appliances/ceiling-fan-cost-calculator" className="text-brass underline">
                सीलिंग फैन कॉस्ट कैलकुलेटर
              </Link>
              ।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">EV चार्जिंग</strong> कहीं बड़ा,
              लगातार चलने वाला लोड है जिसमें चार्जर की दक्षता भी जुड़ी होती है —
              इसे हमारा{' '}
              <Link href="/hi/electricity/ev-charging-cost-calculator" className="text-brass underline">
                EV चार्जिंग कॉस्ट कैलकुलेटर
              </Link>{' '}
              संभालता है।
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          निष्कर्ष: बिना डेडिकेटेड कैलकुलेटर वाली हर चीज़ के लिए यह टूल इस्तेमाल करें
          — आयरन, मिक्सर, वॉशिंग मशीन, राउटर, चार्जर, लाइटिंग — और जहां स्पेशलाइज़्ड
          टूल मौजूद है वहां उसे।
        </p>
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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
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
