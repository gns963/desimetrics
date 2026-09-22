import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import SipCalculator, { type SipCalculatorTexts } from '@/components/calculators/SipCalculator'
import { calculateSip } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/sip-calculator'

const example = calculateSip(10000, 12, 10)

export const metadata: Metadata = {
  title: 'SIP कैलकुलेटर 2026 — म्यूचुअल फंड SIP रिटर्न और मैच्योरिटी वैल्यू',
  description:
    'भारत के लिए मुफ्त SIP कैलकुलेटर। अपने निवेश, अनुमानित रिटर्न और अवधि से एक मासिक म्यूचुअल फंड SIP की मैच्योरिटी वैल्यू और लाभ का अनुमान लगाएं, ग्रोथ चार्ट के साथ।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/financial/sip-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const faqs = [
  {
    q: 'SIP मैच्योरिटी वैल्यू कैसे गिनी जाती है?',
    a: 'यह मासिक एन्युटी की फ्यूचर वैल्यू इस्तेमाल करता है: M = P × [((1+i)^n − 1) / i] × (1+i), जहां P मासिक राशि है, i मासिक रिटर्न है (सालाना ÷ 12) और n महीनों की संख्या है।',
  },
  {
    q: 'मुझे कौन सी रिटर्न दर माननी चाहिए?',
    a: 'इक्विटी म्यूचुअल फंड ने ऐतिहासिक रूप से लंबी अवधि में सालाना ~10–13% रिटर्न दिया है, हालांकि रिटर्न की गारंटी नहीं है। डेट फंड कम होते हैं। एक सतर्क आंकड़ा इस्तेमाल करें और याद रखें कि पिछला प्रदर्शन भविष्य की भविष्यवाणी नहीं करता।',
  },
  {
    q: 'क्या यह टैक्स और खर्च अनुपात को ध्यान में रखता है?',
    a: 'नहीं। यह अनुमान एक ग्रॉस आंकड़ा है। असली रिटर्न फंड के खर्च अनुपात और रिडेम्पशन पर कैपिटल गेन टैक्स से कम हो जाते हैं।',
  },
  {
    q: 'SIP और लंप-सम निवेश में क्या फर्क है?',
    a: 'SIP आपके निवेश को तय समय-समय पर (आम तौर पर मासिक) किस्तों में फैलाता है, जो मार्केट के उतार-चढ़ाव में आपकी खरीद कीमत का औसत निकालता है (रुपी-कॉस्ट एवरेजिंग)। लंप-सम पूरी राशि एक साथ निवेश करता है — अगर मार्केट लगातार बढ़ता है तो संभवतः ज़्यादा रिटर्न, लेकिन गलत समय का ज़्यादा जोखिम।',
  },
  {
    q: 'क्या मैं समय के साथ अपनी SIP राशि बढ़ा सकता हूं?',
    a: 'हां — कई निवेशक एक "स्टेप-अप SIP" इस्तेमाल करते हैं, पूरी अवधि में एक फ्लैट राशि की बजाय समय-समय पर (जैसे सालाना सैलरी बढ़ोतरी के साथ) मासिक राशि बढ़ाते हैं। यह कैलकुलेटर एक फ्लैट मासिक राशि मॉडल करता है; एक स्टेप-अप यहां दिखाई मैच्योरिटी वैल्यू से ज़्यादा तक कंपाउंड होगा।',
  },
  {
    q: 'अगर मैं अपनी SIP जल्दी बंद कर दूं तो क्या होगा?',
    a: 'आप जो भी यूनिट/वैल्यू पहले से जमा हो चुकी है वह आपके पास रहती है — जल्दी बंद करने पर आम तौर पर कोई जुर्माना नहीं होता (कुछ फिक्स्ड डिपॉज़िट जल्दी बंद करने के उलट), हालांकि कैलकुलेटर को छोटी अवधि के लिए चलाने पर आपको दिखाई पूरी-अवधि की मैच्योरिटी वैल्यू से ज़ाहिर तौर पर कम मिलेगा।',
  },
  {
    q: 'क्या SIP फिक्स्ड डिपॉज़िट से बेहतर है?',
    a: 'यह आपकी जोखिम सहनशीलता और अवधि पर निर्भर करता है। FD एक गारंटीशुदा, कम रिटर्न देता है; इक्विटी SIP ने ऐतिहासिक रूप से लंबी (7+ साल) अवधि में FD से बेहतर प्रदर्शन किया है लेकिन मार्केट जोखिम रखता है और छोटी या गलत-समय की अवधि में FD से कम प्रदर्शन कर सकता है।',
  },
  {
    q: 'मुझे SIP में कितनी देर निवेशित रहना चाहिए?',
    a: 'इक्विटी SIP आम तौर पर 5+ साल दूर के लक्ष्यों के लिए सुझाई जाती है, क्योंकि यह अवधि रुपी-कॉस्ट एवरेजिंग और कंपाउंडिंग को छोटी अवधि की मार्केट अस्थिरता को कम करने के लिए ज़्यादा जगह देती है — किसी नज़दीकी लक्ष्य के लिए इसका इस्तेमाल करने पर मंदी के दौरान रिडीम करने का ज़्यादा जोखिम रहता है।',
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
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SIP Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फाइनेंशियल', path: '/financial' },
  { name: 'SIP कैलकुलेटर', path: PATH },
])

const sipTextsHi: SipCalculatorTexts = {
  title: 'SIP कैलकुलेटर',
  subtitle: 'अपने म्यूचुअल फंड SIP की मैच्योरिटी वैल्यू का अनुमान लगाएं',
  monthlyLabel: 'मासिक निवेश (₹)',
  rateLabel: 'अनुमानित सालाना रिटर्न',
  rateUnit: '%',
  durationLabel: 'अवधि',
  durationUnit: 'साल',
  inflationLabel: 'अनुमानित महंगाई दर',
  inflationUnit: '%',
  ctaLabel: 'SIP रिटर्न निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  maturityValueLabel: 'नॉमिनल मैच्योरिटी वैल्यू',
  investedLabel: 'निवेश किया',
  gainsLabel: 'लाभ',
  realValueLabel: 'असली वैल्यू (आज के पैसे में)',
  ltcgTaxLabel: 'अनुमानित LTCG टैक्स',
  postTaxCorpusLabel: 'टैक्स के बाद कॉर्पस',
  yearTooltipTemplate: 'साल {year}: {amount}',
  investedLegend: 'निवेश किया',
  gainsLegend: 'लाभ',
}

export default function SipCalculatorPageHi() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'फाइनेंशियल', href: '/hi/financial' },
          { label: 'SIP कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="SIP कैलकुलेटर"
        subtitle="अनुमान लगाएं एक मासिक म्यूचुअल फंड SIP कितना बढ़ सकता है। मैच्योरिटी वैल्यू, कुल लाभ और साल-दर-साल ग्रोथ चार्ट देखने के लिए अपना मासिक निवेश, अनुमानित सालाना रिटर्न और अवधि डालें।"
        stats={[
          { icon: '📈', big: '10–13%', small: 'ऐतिहासिक इक्विटी रेंज', tone: 'hub' },
          { icon: '📅', big: 'मासिक', small: 'कंपाउंडिंग आधार', tone: 'hub' },
          { icon: '💰', big: 'ग्रॉस', small: 'टैक्स से पहले का आंकड़ा', tone: 'hub' },
          { icon: '📊', big: 'साल-दर-साल', small: 'ग्रोथ चार्ट', tone: 'hub' },
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
          <strong>{formatINR(10000)}/महीना</strong> 12% पर 10 साल के लिए
          निवेश करने का मतलब है आप {formatINR(example.invested)} निवेश करते
          हैं और लगभग{' '}
          <strong>{formatINR(example.maturityValue)}</strong> तक पहुंच सकते
          हैं — लगभग <strong>{formatINR(example.gains)}</strong> का लाभ।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना SIP रिटर्न निकालें
        </h2>
        <SipCalculator texts={sipTextsHi} />
      </section>

      <FinancialCrossSell current="sip-calculator" />

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
        <p className="mt-4 text-xs text-ash/40">
          SIP रिटर्न मार्केट से जुड़े होते हैं और इनकी गारंटी नहीं है। यह
          टूल सिर्फ उदाहरण के लिए है और निवेश सलाह नहीं है।
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
