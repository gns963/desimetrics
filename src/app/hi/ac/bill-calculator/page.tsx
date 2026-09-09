import type { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import AcBillCalculator, { type AcBillCalculatorTexts } from '@/components/calculators/AcBillCalculator'
import AcConsumptionReferenceTable from '@/components/ac/AcConsumptionReferenceTable'
import AcFormulaBlock from '@/components/ac/AcFormulaBlock'
import AcNeighborDiagnostic from '@/components/ac/AcNeighborDiagnostic'
import AcReductionTips from '@/components/ac/AcReductionTips'
import AcScenarioComparison from '@/components/ac/AcScenarioComparison'
import AcSlabComparisonTable from '@/components/ac/AcSlabComparisonTable'
import SplitHero from '@/components/SplitHero'
import { AC_PRODUCTS } from '@/data/ac-products'
import discomsJson from '@/data/discoms.json'
import { calculateAcCost } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/bill-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const COMPARISON_DISCOMS = [
  { code: 'TNEB', label: 'Tamil Nadu (TNEB)' },
  { code: 'BESCOM', label: 'Karnataka (BESCOM)' },
  { code: 'MSEDCL', label: 'Maharashtra (MSEDCL)' },
  { code: 'BRPL', label: 'Delhi (BRPL)' },
  { code: 'UPPCL', label: 'Uttar Pradesh (UPPCL)' },
]

const example = calculateAcCost({
  discomCode: 'TNEB',
  tonnage: 1.5,
  starRating: 3,
  dailyHours: 8,
})

export const metadata: Metadata = {
  title: 'AC रनिंग कॉस्ट कैलकुलेटर 2026 — महीने और साल का बिजली खर्च',
  description:
    'टनेज, स्टार रेटिंग, रोज़ के घंटों और DISCOM के हिसाब से अपने एयर कंडीशनर का बिजली खर्च निकालें। ISEER दक्षता और आपके राज्य के टॉप-स्लैब टैरिफ पर आधारित सटीक अनुमान।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac/bill-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AC Running Cost Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'AC running cost by DISCOM tariff (India)',
  description:
    'Monthly and annual running cost for a fixed AC configuration, computed across multiple Indian DISCOM tariffs at their real top electricity slab.',
  variableMeasured: ['Monthly cost (INR)', 'Annual cost (INR)', 'Effective rate per unit (INR/kWh)'],
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: `${SITE}/terms`,
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'रनिंग कॉस्ट कैलकुलेटर', path: PATH },
])

const acBillCalculatorTextsHi: AcBillCalculatorTexts = {
  title: 'AC रनिंग कॉस्ट कैलकुलेटर',
  subtitle: 'अपने एयर कंडीशनर का बिजली खर्च निकालें',
  discomLabel: 'DISCOM / राज्य',
  tonnageLegend: 'टनेज',
  tonOptions: [
    { value: '0.8', label: '0.8 टन', icon: '🧊' },
    { value: '1', label: '1 टन', icon: '❄️' },
    { value: '1.5', label: '1.5 टन', icon: '❄️' },
    { value: '2', label: '2 टन', icon: '🥶' },
  ],
  starLegend: 'स्टार रेटिंग',
  starOptions: [
    { value: '3', label: '3 स्टार', icon: '⭐⭐⭐' },
    { value: '4', label: '4 स्टार', icon: '⭐⭐⭐⭐' },
    { value: '5', label: '5 स्टार', icon: '⭐⭐⭐⭐⭐' },
  ],
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'रनिंग कॉस्ट निकालें',
  monthlyLabel: 'अनुमानित मासिक रनिंग कॉस्ट',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/महीना',
  fiveStarSavingsTemplate: '5-स्टार पर जाने से {amount}/साल की बचत',
  inputPowerLabel: 'इनपुट पावर',
  iseerLabel: 'ISEER',
  unitsPerDayLabel: 'यूनिट प्रति दिन',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
}

const faqs = [
  {
    q: 'यह AC रनिंग कॉस्ट अनुमान कितना सटीक है?',
    a: 'यह आपके AC की ISEER-आधारित दक्षता, ~70% कंप्रेसर ड्यूटी फैक्टर, और आपके DISCOM के असली टॉप-स्लैब टैरिफ का इस्तेमाल करता है — एक करीबी योजना अनुमान, बिलिंग-ग्रेड आंकड़ा नहीं। असल इस्तेमाल कमरे के इंसुलेशन, सेट तापमान और बाहरी मौसम के हिसाब से बदलता है।',
  },
  {
    q: 'AC को मेरे टॉप टैरिफ स्लैब पर क्यों गिना जाता है, औसत दर पर क्यों नहीं?',
    a: 'भारतीय बिजली टैरिफ टेलिस्कोपिक होते हैं — इस्तेमाल बढ़ने पर दर धीरे-धीरे बढ़ती जाती है। AC आपके मौजूदा इस्तेमाल के ऊपर जुड़ता है, इसलिए इसकी यूनिट्स सबसे ऊंचे स्लैब में गिनी जाती हैं, किसी मिली-जुली औसत दर पर नहीं। किसी और तरीके से गिनने पर असली खर्च कम करके दिखेगा।',
  },
  {
    q: 'क्या स्टार रेटिंग वाकई रनिंग कॉस्ट बदलती है?',
    a: 'हां, सीधे तौर पर — स्टार रेटिंग एक ISEER वैल्यू से जुड़ी होती है, और ज़्यादा ISEER का मतलब है उतनी ही ठंडक के लिए कम बिजली यूनिट। सटीक सालाना फर्क देखने के लिए हमारी 3-स्टार बनाम 5-स्टार बचत गाइड देखें।',
  },
  {
    q: 'क्या इसमें मेरा फिक्स्ड चार्ज या बाकी बिल भी शामिल है?',
    a: 'नहीं — यह सिर्फ AC से जुड़ने वाला अतिरिक्त खर्च है, आपके टॉप स्लैब पर गिना गया। फिक्स्ड चार्ज, सब्सिडी और ड्यूटी सहित पूरे मासिक बिल के लिए, अपने राज्य का बिजली बिल कैलकुलेटर इस्तेमाल करें।',
  },
  {
    q: 'मैं अपना AC रनिंग कॉस्ट कैसे कम कर सकता हूं?',
    a: 'सबसे बड़े उपाय हैं: थर्मोस्टेट सेट पॉइंट 1-2°C बढ़ाएं (हर डिग्री कंप्रेसर के चलने के समय में असरदार बचत करती है), यूनिट की सर्विस कराएं ताकि कॉइल और फिल्टर हवा के बहाव को न रोकें, और अगर नया खरीद रहे हैं, तो कमरे के हिसाब से सही साइज़ का 5-स्टार इन्वर्टर मॉडल चुनें — हमारा टनेज कैलकुलेटर देखें।',
  },
  {
    q: 'SEER और ISEER में क्या फर्क है?',
    a: 'SEER (Seasonal Energy Efficiency Ratio) अमेरिकी दक्षता मानक है, जो अमेरिकी जलवायु और ड्यूटी-साइकल मान्यताओं पर टेस्ट होता है। ISEER, BEE का भारतीय रूपांतरण है, जो भारतीय जलवायु क्षेत्रों और इस्तेमाल के पैटर्न पर टेस्ट होता है — इसलिए भारत में रनिंग कॉस्ट के लिए ISEER रेटिंग ही सही आंकड़ा है, कोई आयातित SEER नंबर नहीं।',
  },
  {
    q: 'एक जैसा AC एक राज्य में दूसरे से ज़्यादा खर्चीला क्यों पड़ता है?',
    a: 'दो राज्यों के टॉप-स्लैब टैरिफ, फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क बहुत अलग हो सकते हैं — ऊपर दी स्लैब तुलना देखें। एक जैसा AC ज़्यादा-टैरिफ वाले राज्य में कम-टैरिफ वाले राज्य से वाकई 30-50% ज़्यादा खर्चीला पड़ सकता है।',
  },
  {
    q: 'क्या 5-स्टार फिक्स्ड-स्पीड AC, 3-स्टार इन्वर्टर AC से बेहतर है?',
    a: 'स्टार रेटिंग कंप्रेसर तकनीक चाहे जो भी हो, ISEER पर आधारित होती है, इसलिए असली 5-स्टार रेटिंग हमेशा असली 3-स्टार रेटिंग से बेहतर रहेगी। लेकिन असल में, आज बिकने वाले लगभग सभी 5-स्टार मॉडल इन्वर्टर यूनिट होते हैं — लेबल वाला 3-स्टार इन्वर्टर AC दुर्लभ है, इसलिए यह तुलना ज़्यादातर सैद्धांतिक ही रहती है।',
  },
  {
    q: 'मेरे कमरे के साइज़ के लिए सही टनेज क्या है?',
    a: 'यह कमरे के क्षेत्रफल, धूप और मंजिल पर निर्भर करता है — अंदाज़ा लगाने की बजाय सटीक सुझाव के लिए हमारा AC टनेज कैलकुलेटर इस्तेमाल करें, क्योंकि कम और ज़्यादा दोनों साइज़ के यूनिट सही साइज़ के मुकाबले ज़्यादा खर्चीले पड़ते हैं।',
  },
  {
    q: '2026 में 1.5 टन AC चलाने में महीने का कितना खर्च आता है?',
    a: `1.5 टन, 3-स्टार यूनिट को रोज़ 8 घंटे चलाने पर, तमिलनाडु जैसे मध्यम-टैरिफ राज्य में लगभग ${formatINR(example.monthlyCost)}/महीना का अनुमान है — यह दूसरे राज्यों में कैसे बदलता है यह देखने के लिए ऊपर स्लैब तुलना देखें, या अपने सटीक DISCOM और घंटों के लिए कैलकुलेटर इस्तेमाल करें।`,
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

export default function AcBillCalculatorPageHi() {
  return (
    <>
      <SplitHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/hi/ac' },
          { label: 'रनिंग कॉस्ट कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel="ISEER + टॉप-स्लैब प्राइसिंग"
        h1="AC रनिंग कॉस्ट कैलकुलेटर"
        subtitle="जानें आपका एयर कंडीशनर चलाने में असल में कितना खर्च आता है। इसकी टनेज, स्टार रेटिंग और रोज़ के घंटे डालें, अपना DISCOM चुनें, और हम यूनिट्स को आपके राज्य के टॉप बिजली स्लैब पर गिनेंगे — क्योंकि AC एक अतिरिक्त लोड है जो आपकी सबसे ऊंची दर पर बिल होता है।"
        primaryCta={{ label: 'मेरा AC खर्च निकालें', href: '#calculator', emoji: '❄️' }}
        secondaryCta={{ label: 'सभी AC कैलकुलेटर →', href: '/hi/ac' }}
        statChips={[
          { icon: '⭐', big: '3–5 ★', small: 'स्टार रेटिंग', tone: 'hub' },
          { icon: '⚙️', big: 'ISEER', small: 'दक्षता आधार', tone: 'hub' },
          { icon: '📊', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
              <span aria-hidden>⚡</span> उदाहरण गणना
            </p>
            <p className="mt-2 text-sm text-white/70">
              तमिलनाडु में रोज़ 8 घंटे चलने वाला 1.5 टन 3-स्टार AC लगभग{' '}
              {example.dailyUnits} यूनिट/दिन इस्तेमाल करता है और इसका खर्च है
            </p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums text-white">
              {formatINR(example.monthlyCost)}
              <span className="ml-1 text-sm font-normal text-white/50">/महीना</span>
            </p>
            <p className="mt-2 text-xs text-white/50">
              {formatINR(example.annualCost)}/साल, {formatINR(example.effectiveRatePerUnit)}/यूनिट पर
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना AC खर्च निकालें
        </h2>
        <AcBillCalculator discoms={liveDiscoms} texts={acBillCalculatorTextsHi} />
      </section>

      {/* Contextual affiliate placement: efficient models that cut this cost */}
      <section aria-labelledby="picks" className="mb-10">
        <h2 id="picks" className="font-display mb-2 text-2xl font-semibold">
          इस खर्च को कम करने वाले कुशल मॉडल
        </h2>
        <p className="mb-4 text-sm text-ash/60">
          ज़्यादा स्टार रेटिंग कुछ ही सीज़न में अपनी कीमत वसूल कर देती है। कुछ सुझाव
          (सांकेतिक कीमत):
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {AC_PRODUCTS.map((p) => (
            <AffiliateProductCard
              key={p.id}
              product={p}
              highlight={p.starRating === 5 ? 'सबसे कुशल' : undefined}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="wrong" className="mb-10">
        <h2 id="wrong" className="font-display mb-4 text-2xl font-semibold">
          ज़्यादातर AC बिल कैलकुलेटर यहां गलती करते हैं
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="font-display font-bold text-ink-navy">
              SEER बनाम ISEER
            </p>
            <p className="mt-1 text-sm text-ash/70">
              कुछ कैलकुलेटर चुपचाप BEE के भारत-विशिष्ट ISEER मानक की बजाय अमेरिकी
              SEER-आधारित दक्षता मान्यताएं इस्तेमाल कर लेते हैं। दोनों अलग-अलग
              जलवायु और ड्यूटी-साइकल परिस्थितियों पर टेस्ट होते हैं, इसलिए
              SEER-आधारित अनुमान यह नहीं दिखाता कि भारत-लेबल वाला AC यहां असल में
              कैसा प्रदर्शन करता है।
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="font-display font-bold text-ink-navy">
              फ्लैट-रेट बनाम टॉप-स्लैब बिलिंग
            </p>
            <p className="mt-1 text-sm text-ash/70">
              कई टूल हर यूनिट को एक ही फ्लैट, राष्ट्रीय-औसत दर पर गिनते हैं। भारतीय
              टैरिफ टेलिस्कोपिक होते हैं — AC आपके मौजूदा इस्तेमाल के ऊपर जुड़ता है,
              इसलिए इसकी यूनिट्स सबसे ऊंचे स्लैब में आती हैं, जो लगभग हमेशा बताई गई
              औसत दर से काफी ऊपर होता है।
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="font-display font-bold text-ink-navy">
              BEE की ISEER अपडेट के साथ तालमेल
            </p>
            <p className="mt-1 text-sm text-ash/70">
              BEE समय-समय पर हर स्टार रेटिंग के पीछे के ISEER स्तर बदलता रहता है,
              इसलिए एक तय सेट के दक्षता आंकड़े चुपचाप पुराने पड़ सकते हैं। हम अपनी
              ISEER तालिका को BEE के नवीनतम प्रकाशित स्तरों के साथ अपडेट रखते हैं,
              सालों पुराने आंकड़े दोबारा इस्तेमाल नहीं करते — किसी खास मॉडल का सटीक
              BEE लेबल हमेशा जांच लें, क्योंकि सटीक तारीखें और बदलाव का ब्यौरा
              प्रोडक्ट श्रेणी के हिसाब से अलग होता है और सीधे BEE तय करता है।
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="formula" className="mb-10">
        <h2 id="formula" className="font-display mb-4 text-2xl font-semibold">
          इस कैलकुलेटर के पीछे का ISEER फॉर्मूला
        </h2>
        <AcFormulaBlock />
      </section>

      <section aria-labelledby="slabs" className="mb-10">
        <h2 id="slabs" className="font-display mb-2 text-2xl font-semibold">
          स्लैब-वार बिलिंग से आपका AC खर्च कैसे बदलता है
        </h2>
        <p className="mb-4 text-sm text-ash/60">
          वही <strong>1.5 टन, 3-स्टार AC, रोज़ 8 घंटे चलने वाला</strong> — हर राज्य
          के असली टॉप-स्लैब टैरिफ पर, इसी कैलकुलेटर के इंजन से लाइव गिना गया:
        </p>
        <AcSlabComparisonTable tonnage={1.5} starRating={3} dailyHours={8} discoms={COMPARISON_DISCOMS} />
      </section>

      <section aria-labelledby="neighbor" className="mb-10">
        <h2 id="neighbor" className="font-display mb-4 text-2xl font-semibold">
          आपका AC बिल पड़ोसी से ज़्यादा क्यों हो सकता है
        </h2>
        <AcNeighborDiagnostic />
      </section>

      <section aria-labelledby="reference" className="mb-10">
        <h2 id="reference" className="font-display mb-2 text-2xl font-semibold">
          AC बिजली खपत — त्वरित संदर्भ तालिका
        </h2>
        <AcConsumptionReferenceTable />
      </section>

      <section aria-labelledby="scenario" className="mb-10">
        <h2 id="scenario" className="font-display mb-4 text-2xl font-semibold">
          असली उदाहरण: नॉन-इन्वर्टर 3★ बनाम इन्वर्टर 5★
        </h2>
        <AcScenarioComparison />
      </section>

      <section aria-labelledby="tips" className="mb-10">
        <h2 id="tips" className="font-display mb-4 text-2xl font-semibold">
          AC बिल कम करने के आसान तरीके
        </h2>
        <AcReductionTips />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          AC रनिंग कॉस्ट कैसे निकाली जाती है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>दक्षता (ISEER)।</strong> स्टार रेटिंग एक ISEER वैल्यू से जुड़ी
            होती है — जितनी ज़्यादा होगी, उतनी ही ठंडक के लिए उतनी ही कम यूनिट
            चाहिए। हम टनेज को कूलिंग पावर में बदलते हैं, इनपुट बिजली के लिए
            ISEER से भाग देते हैं, और कंप्रेसर ड्यूटी फैक्टर लगाते हैं — ऊपर सटीक
            फॉर्मूला और स्थिरांक देखें।
          </p>
          <p>
            <strong>आपके टॉप स्लैब पर आधारित।</strong> चूंकि AC आपके मौजूदा
            इस्तेमाल के ऊपर जुड़ता है, इसकी यूनिट्स आपके सबसे ऊंचे टैरिफ स्लैब में
            गिरती हैं। हम वही मार्जिनल दर (फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क
            सहित) इस्तेमाल करते हैं — ताकि अनुमान यह दिखाए कि AC वाकई आपके बिल में
            कितना जोड़ता है।
          </p>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/hi/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC टनेज कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पक्का नहीं कि यह आपके कमरे के लिए सही साइज़ है? पहले जांच लें।
            </p>
          </Link>
          <Link
            href="/hi/ac/comparisons/3-star-vs-5-star-savings-guide"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⭐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              3★ बनाम 5★ बचत
            </p>
            <p className="mt-1 text-xs text-ash/60">
              देखें ऊंची स्टार रेटिंग से यह खर्च ठीक कितना कम होता।
            </p>
          </Link>
          <Link
            href="/hi/ac/circuit-safety-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🛡️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सर्किट सेफ्टी कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              नया खरीद रहे हैं? इसकी ज़रूरत का MCB और वायरिंग भी जांच लें।
            </p>
          </Link>
          <Link
            href="/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर से भरपाई करें
            </p>
            <p className="mt-1 text-xs text-ash/60">
              AC-भारी इस्तेमाल के हिसाब से रूफटॉप सिस्टम का पेबैक देखें।
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      </main>
    </>
  )
}
