import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import GratuityCalculator, { type GratuityCalculatorTexts } from '@/components/calculators/GratuityCalculator'
import { calculateGratuity } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/gratuity-calculator'

const example = calculateGratuity(50000, 10)

export const metadata: Metadata = {
  title: 'ग्रेच्युटी कैलकुलेटर 2026 — Payment of Gratuity Act फॉर्मूला',
  description:
    'भारत के लिए मुफ्त ग्रेच्युटी कैलकुलेटर। 15/26 फॉर्मूला इस्तेमाल करते हुए अपने आखिरी Basic + DA और सर्विस के सालों से अपनी ग्रेच्युटी निकालें, ₹20 लाख की सांविधिक सीमा के साथ।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/financial/gratuity-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const faqs = [
  {
    q: 'ग्रेच्युटी फॉर्मूला क्या है?',
    a: 'Payment of Gratuity Act के तहत, ग्रेच्युटी = (15 / 26) × आखिरी मासिक Basic + DA × सर्विस के साल। 26 एक महीने के काम के दिनों को दर्शाता है और 15 हर पूरे साल के लिए 15 दिनों की मज़दूरी है।',
  },
  {
    q: 'ग्रेच्युटी के लिए कितने साल की सर्विस चाहिए?',
    a: 'आम तौर पर आपको कम से कम 5 साल की लगातार सर्विस चाहिए। 6 महीने से ज़्यादा का आधा-साल गणना के लिए पूरे साल के बराबर गिना जाता है।',
  },
  {
    q: 'क्या ग्रेच्युटी की कोई अधिकतम राशि है?',
    a: 'हां। सांविधिक सीमा ₹20,00,000 है। इससे ऊपर की कोई भी राशि टैक्स योग्य हो सकती है और आपके नियोक्ता की नीति पर निर्भर करती है।',
  },
  {
    q: 'क्या ग्रेच्युटी टैक्स योग्य है?',
    a: 'सरकारी कर्मचारियों के लिए, ग्रेच्युटी पूरी तरह टैक्स-मुक्त है। Payment of Gratuity Act के तहत आने वाले निजी-क्षेत्र कर्मचारियों के लिए, यह सांविधिक सीमा (₹20,00,000) या असल में मिली राशि, जो भी कम हो, तक टैक्स-मुक्त है — इससे ऊपर की राशि मौजूदा इनकम टैक्स नियमों के हिसाब से टैक्स योग्य हो सकती है।',
  },
  {
    q: 'क्या ग्रेच्युटी सभी कर्मचारियों पर लागू होती है?',
    a: 'Payment of Gratuity Act 10 या उससे ज़्यादा कर्मचारियों वाले संगठनों पर लागू होता है। इसके तहत आने वाले कर्मचारी 5 साल की लगातार सर्विस के बाद पात्र हो जाते हैं (मृत्यु या विकलांगता के मामलों में 5-साल की शर्त माफ हो जाती है)।',
  },
  {
    q: 'ग्रेच्युटी के लिए "आखिरी ली गई सैलरी" में क्या गिना जाता है?',
    a: 'यह आपकी आखिरी ली गई Basic पे प्लस Dearness Allowance (DA) है — HRA, बोनस, और अन्य भत्तों जैसे अन्य घटक आम तौर पर ग्रेच्युटी गणना आधार से बाहर रखे जाते हैं।',
  },
  {
    q: 'क्या इस्तीफा देने पर भी ग्रेच्युटी लागू होती है, या सिर्फ टर्मिनेशन पर?',
    a: 'आम तौर पर हां, इस्तीफा देने पर भी ग्रेच्युटी देय है, बशर्ते आपने न्यूनतम 5 साल की लगातार सर्विस पूरी की हो — यह हक सिर्फ रिटायरमेंट या ले-ऑफ की स्थितियों तक सीमित नहीं है।',
  },
  {
    q: 'फॉर्मूला 30 की बजाय 26 दिन क्यों इस्तेमाल करता है?',
    a: '26, Payment of Gratuity Act की गणना परंपरा के तहत एक महीने में सामान्य काम के दिनों (साप्ताहिक छुट्टियों को छोड़कर) को दर्शाता है, कैलेंडर महीने की लंबाई को नहीं — यह सांविधिक फॉर्मूला का एक तय हिस्सा है, कोई मान्यता जो हमने जोड़ी हो।',
  },
  {
    q: 'अगर मेरी कंपनी Payment of Gratuity Act के तहत नहीं आती तो?',
    a: 'कुछ नियोक्ता सांविधिक रूप से ज़रूरी न होने पर भी अपनी नीति के तहत ग्रेच्युटी देते हैं — उस स्थिति में गणना का आधार 15/26 फॉर्मूला से अलग हो सकता है, इसलिए यह मान लेने की बजाय कि यह कैलकुलेटर लागू होता है, अपनी खास रोज़गार शर्तें जांचें।',
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
  name: 'Gratuity Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फाइनेंशियल', path: '/financial' },
  { name: 'ग्रेच्युटी कैलकुलेटर', path: PATH },
])

const gratuityTextsHi: GratuityCalculatorTexts = {
  title: 'ग्रेच्युटी कैलकुलेटर',
  subtitle: 'Payment of Gratuity Act के तहत आप पर क्या बकाया है',
  salaryLabel: 'आखिरी ली गई मासिक सैलरी — Basic + DA (₹)',
  yearsLabel: 'सर्विस के साल',
  yearsUnit: 'साल',
  yearsHint: '6 महीने से ज़्यादा का आधा-साल पूरे साल के बराबर गिना जाता है।',
  ctaLabel: 'ग्रेच्युटी निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  payableLabel: 'देय ग्रेच्युटी',
  eligibleTemplate: '{years} साल की सर्विस पर आधारित (15/26 फॉर्मूला)।',
  notEligibleMessage: 'पात्र नहीं — Payment of Gratuity Act के तहत ग्रेच्युटी के लिए कम से कम 5 साल की लगातार सर्विस चाहिए।',
  cappedMessage: '₹20,00,000 की सांविधिक सीमा पर सीमित।',
}

export default function GratuityCalculatorPageHi() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'फाइनेंशियल', href: '/hi/financial' },
          { label: 'ग्रेच्युटी कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="ग्रेच्युटी कैलकुलेटर"
        subtitle={
          <>
            स्टैंडर्ड 15/26 फॉर्मूला इस्तेमाल करते हुए, अपने आखिरी लिए गए
            Basic + DA और सर्विस के सालों से, Payment of Gratuity Act के तहत
            आप जिस ग्रेच्युटी के हकदार हैं वह निकालें।
          </>
        }
        stats={[
          { icon: '🧮', big: '15 / 26', small: 'फॉर्मूला आधार', tone: 'hub' },
          { icon: '📅', big: '5 साल', small: 'न्यूनतम सर्विस', tone: 'hub' },
          { icon: '🧢', big: '₹20,00,000', small: 'सांविधिक सीमा', tone: 'hub' },
          { icon: '💼', big: 'Basic + DA', small: 'क्या गिना जाता है', tone: 'hub' },
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
          <strong>{formatINR(50000)}</strong> के आखिरी लिए गए Basic + DA और{' '}
          <strong>10 साल</strong> की सर्विस के लिए, ग्रेच्युटी = (15 ÷ 26) ×
          50,000 × 10 = <strong>{formatINR(example.gratuity)}</strong>।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपनी ग्रेच्युटी निकालें
        </h2>
        <GratuityCalculator texts={gratuityTextsHi} />
      </section>

      <FinancialCrossSell current="gratuity-calculator" />

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
