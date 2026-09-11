import type { Metadata } from 'next'
import Link from 'next/link'
import LeadGenForm, { type LeadGenFormTexts } from '@/components/LeadGenForm'
import SplitHero from '@/components/SplitHero'
import SolarRoiCalculator, { type SolarRoiCalculatorTexts } from '@/components/calculators/SolarRoiCalculator'
import CostComparisonTable from '@/components/solar/CostComparisonTable'
import GridTypeComparison from '@/components/solar/GridTypeComparison'
import SolarAcTieIn from '@/components/solar/SolarAcTieIn'
import SolarFinancingSection from '@/components/solar/SolarFinancingSection'
import SolarImpactSection from '@/components/solar/SolarImpactSection'
import SolarMythsSection from '@/components/solar/SolarMythsSection'
import SolarTipsSection from '@/components/solar/SolarTipsSection'
import discomsJson from '@/data/discoms.json'
import { getTariff } from '@/lib/calc/electricity'
import { calculateSolarRoi, projectSolarCostComparison } from '@/lib/calc/solar'
import { formatINR } from '@/lib/format'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/roi-calculator'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms
    .filter((d) => d.hasTariffFile)
    .map((d) => ({ code: d.code, state: s.state })),
)

const example = calculateSolarRoi({
  discomCode: 'TNEB',
  monthlyUnits: 300,
  systemSizeKw: 3,
})

const tneb = getTariff('TNEB')
const tnebResidential =
  tneb.connectionTypes.find((c) => c.connectionType === 'residential') ?? tneb.connectionTypes[0]
const tnebTopRate = tnebResidential.slabs[tnebResidential.slabs.length - 1].ratePerUnit

const costComparisonExample = projectSolarCostComparison({
  discomCode: 'TNEB',
  monthlyUnits: 300,
  systemSizeKw: 3,
  scenario: 'base',
})

export const metadata: Metadata = {
  title: 'सोलर ROI कैलकुलेटर 2026 — रूफटॉप पेबैक और PM सूर्य घर बचत',
  description:
    'अपने DISCOM के असली टैरिफ का इस्तेमाल करके रूफटॉप सोलर पेबैक अवधि और बचत निकालें। इसमें PM सूर्य घर सब्सिडी (₹30k/₹60k/₹78k), नेट लागत और 25-साल की बचत शामिल है।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/solar/roi-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'सोलर ROI कैलकुलेटर',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumbLdData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'होम', item: `${SITE}/hi` },
    { '@type': 'ListItem', position: 2, name: 'सोलर', item: `${SITE}/hi/solar` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'ROI कैलकुलेटर',
      item: `${SITE}/hi${PATH}`,
    },
  ],
}
const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: '25-Year Solar vs Grid Cost Comparison (Base Scenario)',
  description:
    'Year-by-year cumulative grid cost, solar cost and savings for a 3kW rooftop system in Tamil Nadu at 300 units/month, assuming 6%/year tariff escalation.',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: `${SITE}/terms`,
  variableMeasured: [
    'Cumulative grid cost (INR)',
    'Cumulative solar cost (INR)',
    'Cumulative savings (INR)',
  ],
  distribution: [1, 10, 25]
    .map((y) => costComparisonExample.rows.find((r) => r.year === y))
    .filter((r): r is (typeof costComparisonExample.rows)[number] => Boolean(r))
    .map((r) => ({
      '@type': 'DataDownload',
      name: `Year ${r.year}`,
      description: `Cumulative grid cost ₹${r.cumulativeGridCost}, cumulative solar cost ₹${r.cumulativeSolarCost}, cumulative savings ₹${r.cumulativeSavings}`,
    })),
}

const faqs = [
  {
    q: 'यह सोलर पेबैक अनुमान कितना सटीक है?',
    a: 'यह ऑफसेट यूनिट्स की कीमत आपके असली DISCOM टैरिफ पर लगाता है और असली PM सूर्य घर सब्सिडी फॉर्मूला लागू करता है, इसलिए ₹ आंकड़े असली दरों पर आधारित हैं। जनरेशन मान्यता (~4 यूनिट/kW/दिन) एक सतर्क पैन-इंडिया औसत है — आपका असली आउटपुट लोकेशन, छत की दिशा, छाया और पैनल की क्वालिटी पर निर्भर करता है, इसलिए इसे एक योजना अनुमान मानें, कोट नहीं।',
  },
  {
    q: 'यह कैलकुलेटर कौन सी जनरेशन मान्यता इस्तेमाल करता है, और क्यों?',
    a: 'साल भर में औसतन लगभग हर kW इंस्टॉल क्षमता पर रोज़ 4 यूनिट। यह भारतीय रूफटॉप परिस्थितियों के लिए आम तौर पर इस्तेमाल होने वाला एक सतर्क आंकड़ा है — ज़्यादा धूप वाले राज्यों या अच्छी दिशा वाली, बिना-छाया की छतों पर आम तौर पर ज़्यादा जनरेशन होती है, इसलिए असली पेबैक यहां दिखाए गए से तेज़ हो सकता है।',
  },
  {
    q: 'क्या यह 25 साल में पैनल के डिग्रेडेशन को ध्यान में रखता है?',
    a: 'नहीं — सालाना बचत का आंकड़ा साल-एक की जनरेशन को स्थिर मानकर चलता है। असली पैनल धीरे-धीरे डिग्रेड होते हैं (आम तौर पर लगभग 0.5% प्रति साल बताया जाता है), जो यहां दिखाए गए आंकड़े के मुकाबले पेबैक को थोड़ा बढ़ा देगा और कुल लाइफटाइम बचत को थोड़ा घटा देगा।',
  },
  {
    q: 'क्या इस बचत के लिए नेट मीटरिंग ज़रूरी है?',
    a: 'हां। नेट मीटरिंग ही वह चीज़ है जो आपके DISCOM को ग्रिड में वापस भेजी गई सोलर यूनिट्स के लिए क्रेडिट देने देती है, यही तरीका है जिससे इस टूल की यूनिट्स-ऑफसेट गणना असल में आपके बिल पर लागू होती है। आपका DISCOM/इंस्टॉलर इंस्टॉलेशन के हिस्से के रूप में नेट-मीटरिंग एप्लिकेशन संभालता है।',
  },
  {
    q: 'अगर मुझे पूरी PM सूर्य घर सब्सिडी न मिले तो?',
    a: 'केंद्रीय सब्सिडी एक तय फॉर्मूला (पहले 2 kW के लिए ₹30,000/kW, तीसरे kW के लिए ₹18,000, अधिकतम ₹78,000) फॉलो करती है और आय-आधारित नहीं है, लेकिन प्रोसेसिंग समय और कोई अतिरिक्त राज्य-स्तरीय सब्सिडी अलग हो सकती है। हमारे PM सूर्य घर सब्सिडी कैलकुलेटर पर अपनी सटीक पात्रता और राशि जांचें।',
  },
  {
    q: 'यह कैलकुलेटर फ्लैट-रेट सोलर कैलकुलेटर से कैसे अलग है?',
    a: 'ज़्यादातर सोलर कैलकुलेटर हर यूज़र पर एक राष्ट्रीय-औसत बिजली दर लगाते हैं। यह आपके सिस्टम से ऑफसेट होने वाली यूनिट्स की कीमत आपके अपने DISCOM के असली टेलिस्कोपिक स्लैब टैरिफ पर लगाता है — वही रेट स्ट्रक्चर जो आपका असली बिल इस्तेमाल करता है — इसलिए यहां दिखाई बचत आपकी असली मार्जिनल दर दिखाती है, किसी अनुमान की नहीं।',
  },
  {
    q: 'PM सूर्य घर सब्सिडी के लिए पात्रता मानदंड क्या है?',
    a: 'आपको छत का मालिक होना चाहिए (या मालिक की सहमति), वैध घरेलू बिजली कनेक्शन होना चाहिए, उस कनेक्शन पर पहले कोई रूफटॉप सोलर सब्सिडी न ली हो, और MNRE-सूचीबद्ध वेंडर के ज़रिए मेड-इन-इंडिया (DCR) पैनल लगवाने चाहिए। पूरी पात्रता और राशि का ब्यौरा हमारे PM सूर्य घर सब्सिडी कैलकुलेटर पर देखें।',
  },
  {
    q: 'क्या मैं अपना AC सोलर पावर पर चला सकता हूं?',
    a: 'हां — AC आम तौर पर भारतीय घर में सबसे बड़ा अकेला लोड होता है, और यह ज़्यादातर दिन के उजाले में चलता है जब सोलर सबसे ज़्यादा बिजली बनाता है, जिससे यह रूफटॉप सोलर के लिए सबसे अच्छे मेल में से एक बन जाता है। अपने AC के असली इस्तेमाल को ध्यान में रखकर सिस्टम साइज़ करें; हमारे AC रनिंग कॉस्ट और पैनल साइज़ कैलकुलेटर देखें।',
  },
  {
    q: 'क्या मेरी छत पर आंशिक छाया हो तो भी सोलर लगाना सही है?',
    a: 'आंशिक छाया आउटपुट को काफी हद तक कम कर देती है — इन्वर्टर सेटअप के हिसाब से, एक सीरीज़ स्ट्रिंग में एक पैनल पर छाया भी पूरी स्ट्रिंग की जनरेशन को नीचे खींच सकती है। किसी इंस्टॉलर से इसे जांचना आम तौर पर फिर भी लायक होता है, जो पैनल लेआउट, माइक्रो-इन्वर्टर या पावर ऑप्टिमाइज़र सुझा सकता है ताकि छाया का नुकसान कम हो, लेकिन बिना-छाया की समान साइज़ की छत से कम जनरेशन की उम्मीद रखें।',
  },
  {
    q: 'बिजली टैरिफ बढ़ने से मेरी सोलर पेबैक अवधि कैसे प्रभावित होती है?',
    a: 'पेबैक अवधि खुद आज के टैरिफ पर आधारित है, लेकिन अगर समय के साथ टैरिफ बढ़ते हैं तो सिस्टम की पूरी उम्र में आपकी कुल बचत तेज़ी से बढ़ती है, क्योंकि आपकी नेट लागत तय रहते हुए सोलर मौजूदा दर पर यूनिट्स को ऑफसेट करता रहता है। अलग-अलग टैरिफ-वृद्धि परिदृश्य कुल बचत को कैसे प्रभावित करते हैं, यह देखने के लिए नीचे 25-साल की लागत तुलना देखें।',
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

const solarRoiTextsHi: SolarRoiCalculatorTexts = {
  title: 'सोलर ROI कैलकुलेटर',
  subtitle: 'रूफटॉप सिस्टम से पेबैक अवधि और बचत',
  discomLabel: 'आपका DISCOM / राज्य',
  unitsLabel: 'औसत मासिक खपत',
  unitsUnit: 'यूनिट',
  kwLabel: 'सिस्टम साइज़',
  kwUnit: 'kW',
  kwHint: 'सुझाव: हर 100–150 मासिक यूनिट पर लगभग 1 kW एक सामान्य शुरुआती बिंदु है।',
  ctaLabel: 'सोलर बचत निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  paybackLabel: 'पेबैक अवधि',
  paybackUnit: 'साल',
  thenSavesTemplate: 'फिर करीब {amount} की बचत',
  recoveredLabel: 'सिस्टम की लागत वसूल, साल 1',
  systemCostLabel: 'सिस्टम की लागत',
  subsidyLabel: 'PM सूर्य घर सब्सिडी',
  netCostLabel: 'नेट लागत',
  annualGenLabel: 'सालाना जनरेशन',
  annualGenUnit: 'यूनिट',
  monthlySavingsLabel: 'मासिक बचत',
  lifetimeSavingsLabel: '25-साल की नेट बचत',
}

const leadGenTextsHi: LeadGenFormTexts = {
  pincodeLabel: 'PIN कोड',
  pincodeError: 'एक सही 6-अंक का PIN कोड डालें।',
  billLabel: 'मासिक बिजली बिल (₹)',
  billError: 'अपना मासिक बिल राशि ₹ में डालें।',
  roofLabel: 'छत का प्रकार',
  roofError: 'अपनी छत का प्रकार चुनें।',
  roofSelect: 'चुनें…',
  roofConcrete: 'कंक्रीट (RCC)',
  roofTin: 'टिन / धातु शीट',
  roofOther: 'अन्य',
  phoneLabel: 'मोबाइल नंबर',
  phoneError: 'एक सही 10-अंक का मोबाइल नंबर डालें।',
  submitLabel: 'मेरे मुफ्त कोट पाएं →',
  disclaimer: 'कोई स्पैम नहीं। हम आपकी जानकारी सिर्फ उन इंस्टॉलर से साझा करते हैं जिनसे आप मैच होते हैं।',
  successTitle: 'धन्यवाद — हम आपको 3 सत्यापित इंस्टॉलर से जोड़ेंगे।',
  successBody: 'अपने फोन पर नज़र रखें; कोट आम तौर पर 2 कार्य दिवसों में आ जाते हैं।',
}

export default async function SolarRoiPageHi({
  searchParams,
}: {
  searchParams: Promise<{ discom?: string }>
}) {
  const { discom } = await searchParams
  const requestedDiscom = discom?.toUpperCase()
  const defaultDiscomCode = liveDiscoms.some((d) => d.code === requestedDiscom)
    ? requestedDiscom
    : undefined

  return (
    <>
      <SplitHero
        hub="solar"
        breadcrumb={[
          { label: 'सोलर', href: '/hi/solar' },
          { label: 'ROI कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel="असली DISCOM टैरिफ + PM सूर्य घर"
        h1="सोलर ROI कैलकुलेटर (रूफटॉप पेबैक और बचत)"
        subtitle="अपने रूफटॉप सोलर की पेबैक अवधि और लाइफटाइम बचत जानें। यह कैलकुलेटर सोलर से ऑफसेट होने वाली यूनिट्स की कीमत आपके DISCOM के असली टेलिस्कोपिक टैरिफ पर लगाता है और PM सूर्य घर केंद्रीय सब्सिडी लागू करता है।"
        primaryCta={{ label: 'मेरा पेबैक निकालें', href: '#calculator', emoji: '☀️' }}
        secondaryCta={{ label: '3 मुफ्त कोट पाएं →', href: '#leadgen' }}
        statChips={[
          { icon: '💸', big: '₹78,000', small: 'अधिकतम सब्सिडी', tone: 'hub' },
          { icon: '🔆', big: '~4u/kW/दिन', small: 'जनरेशन मान्यता', tone: 'hub' },
          { icon: '📆', big: '25 साल', small: 'सिस्टम की उम्र', tone: 'hub' },
          { icon: '📊', big: 'असली टैरिफ', small: 'आपके DISCOM पर आधारित', tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
              <span aria-hidden>☀️</span> उदाहरण गणना
            </p>
            <p className="mt-2 text-sm text-white/70">
              तमिलनाडु (TNEB) के एक घर के लिए 300 यूनिट/महीना पर 3 kW सिस्टम
            </p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums text-white">
              {formatINR(example.netCost)}
              <span className="ml-1 text-sm font-normal text-white/50">नेट लागत</span>
            </p>
            <p className="mt-2 text-xs text-white/50">
              ~
              <span className="text-spark-teal">{formatINR(example.annualSavings)}</span>
              /साल बचत · पेबैक{' '}
              {example.paybackYears != null ? `~${example.paybackYears} साल` : 'लागू नहीं'} में
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="why-solar" className="mb-10 scroll-mt-20">
        <h2 id="why-solar" className="font-display mb-2 text-2xl font-semibold">
          भारत में रूफटॉप सोलर क्यों फायदेमंद है
        </h2>
        <p className="text-ash/80">
          भारतीय बिजली टैरिफ टेलिस्कोपिक होते हैं — जितना ज़्यादा इस्तेमाल
          करेंगे, आपकी आखिरी यूनिट्स पर उतनी ही ऊंची दर लगेगी। उदाहरण के लिए
          तमिलनाडु में, TNEB का टॉप घरेलू स्लैब रेट{' '}
          <strong>₹{tnebTopRate.toFixed(2)}/यूनिट</strong> है। सोलर जो भी यूनिट
          ऑफसेट करता है, आप उस टॉप रेट को चुकाना बंद कर देते हैं, यही वजह है कि
          ज़्यादा-इस्तेमाल वाले घरों के लिए सोलर सबसे तेज़ी से वसूल होता है। PM
          सूर्य घर सब्सिडी के साथ जो शुरुआती लागत का बड़ा हिस्सा काट देती है, एक
          सही साइज़ का रूफटॉप सिस्टम उन चंद घरेलू निवेशों में से एक है जो अपनी
          लागत वसूल करता है और फिर कमाता भी रहता है।
        </p>
      </section>

      <section
        aria-labelledby="differentiator"
        className="mb-10 rounded-xl border border-brass/25 bg-brass/5 p-5"
      >
        <h2 id="differentiator" className="font-display mb-2 text-xl font-bold text-ink-navy">
          यह कैलकुलेटर ज़्यादा सटीक क्यों है
        </h2>
        <p className="text-ash/80">
          ज़्यादातर ऑनलाइन सोलर कैलकुलेटर आपकी बचत की कीमत एक फ्लैट,
          राष्ट्रीय-औसत बिजली दर पर लगाते हैं। भारतीय बिजली असल में ऐसे काम
          नहीं करती — हर DISCOM अपना टेलिस्कोपिक स्लैब टैरिफ तय करता है, और
          आपका सोलर सिस्टम जो यूनिट्स ऑफसेट करता है वे आपकी <em>सबसे महंगी</em>{' '}
          यूनिट्स होती हैं, आपके स्लैब के टॉप पर। यह कैलकुलेटर आपके असली बिल की
          सोलर से पहले और बाद की गणना आपके अपने DISCOM के प्रकाशित टैरिफ से
          करता है — वही इंजन जो हमारे 36 राज्यों के बिजली बिल कैलकुलेटर को
          चलाता है — इसलिए यहां दिखाई बचत आपकी असली रेट संरचना पर आधारित है,
          किसी सामान्य मान्यता पर नहीं।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना सोलर पेबैक निकालें
        </h2>
        <SolarRoiCalculator discoms={liveDiscoms} defaultDiscomCode={defaultDiscomCode} texts={solarRoiTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          सोलर पेबैक कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>पहले महंगी यूनिट्स पर बचत।</strong> चूंकि भारतीय टैरिफ
            टेलिस्कोपिक होते हैं, सोलर पहले आपके सबसे ऊंची कीमत वाले स्लैब को
            ऑफसेट करता है। हम असली DISCOM टैरिफ से सोलर से पहले और बाद का
            आपका बिल गिनते हैं, इसलिए बचत आपकी असली मार्जिनल दर दिखाती है —
            किसी फ्लैट औसत की नहीं।
          </p>
          <p>
            <strong>PM सूर्य घर सब्सिडी।</strong> केंद्रीय सब्सिडी पहले 2 kW के
            लिए ₹30,000/kW और तीसरे kW के लिए ₹18,000 है, अधिकतम ₹78,000 तक।
            नेट लागत सिस्टम की कीमत में से यह सब्सिडी घटाकर मिलती है — पूरा
            ब्यौरा और आवेदन के तरीके हमारे{' '}
            <Link href="/hi/solar/subsidy-calculator" className="text-brass underline">
              सब्सिडी कैलकुलेटर
            </Link>{' '}
            पर देखें।
          </p>
          <p>
            <strong>पेबैक।</strong> नेट लागत ÷ सालाना बचत से पेबैक साल में
            मिलता है। जनरेशन ~4 यूनिट प्रति kW प्रति दिन मानती है; आपका असली
            आउटपुट लोकेशन, छत की दिशा और छाया पर निर्भर करता है।
          </p>
        </div>
      </section>

      <GridTypeComparison />

      <CostComparisonTable discomCode="TNEB" monthlyUnits={300} systemSizeKw={3} />

      <SolarMythsSection />

      <SolarTipsSection />

      <SolarFinancingSection />

      <SolarImpactSection annualGenerationKwh={example.annualGeneration} />

      <SolarAcTieIn />

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/solar/subsidy-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💸</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              PM सूर्य घर सब्सिडी
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पूरा सब्सिडी ब्यौरा, पात्रता और आवेदन का तरीका।
            </p>
          </Link>
          <Link
            href="/hi/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC रनिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              देखें आपके बिल में AC कितना जोड़ता है — वह लोड जिसे सोलर पहले ऑफसेट करता है।
            </p>
          </Link>
          <Link
            href="/financial"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-financial/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🧮</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              फाइनेंशियल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              GST, SIP, टैक्स रेजीम और ग्रेच्युटी — रोज़मर्रा के पैसों के टूल।
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

      <section aria-labelledby="leadgen" className="mb-6">
        <h2 id="leadgen" className="font-display mb-4 text-2xl font-semibold">
          असली कोट के लिए तैयार हैं?
        </h2>
        <LeadGenForm
          source="solar-roi-calculator-hi"
          heading="असली कोट के लिए तैयार हैं?"
          subheading="अपने घर के बारे में थोड़ी जानकारी दें और हम आपको सत्यापित इंस्टॉलर से जोड़ देंगे।"
          texts={leadGenTextsHi}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLdData) }}
      />
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
      </main>
    </>
  )
}
