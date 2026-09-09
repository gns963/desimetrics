import type { Metadata } from 'next'
import GstCalculator, { type GstCalculatorTexts } from '@/components/calculators/GstCalculator'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import { calculateGst } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/gst-calculator'

const example = calculateGst(1000, 18, 'exclusive')

export const metadata: Metadata = {
  title: 'GST कैलकुलेटर 2026 — GST जोड़ें या हटाएं (5%, 12%, 18%, 28%)',
  description:
    'भारत के लिए मुफ्त GST कैलकुलेटर। बेस कीमत में GST जोड़ें या इनक्लूसिव राशि से GST निकालें, CGST/SGST बंटवारे के साथ, सभी मानक स्लैब के लिए।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/financial/gst-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const faqs = [
  {
    q: 'मैं किसी राशि पर GST कैसे निकालूं?',
    a: 'GST जोड़ें (GST-एक्सक्लूसिव मोड): बेस राशि को (1 + दर/100) से गुणा करें — ₹1,000 + 18% GST = ₹1,180। GST हटाएं (GST-इनक्लूसिव मोड): इनक्लूसिव राशि को (1 + दर/100) से भाग दें — ₹1,180 ÷ 1.18 = ₹1,000 बेस, ₹180 GST।',
  },
  {
    q: 'GST-इनक्लूसिव और GST-एक्सक्लूसिव गणना में क्या फर्क है?',
    a: 'GST-एक्सक्लूसिव का मतलब है आपकी डाली राशि टैक्स से पहले की बेस कीमत है, और GST ऊपर से जुड़ता है। GST-इनक्लूसिव का मतलब है आपकी डाली राशि में पहले से GST शामिल है, और कैलकुलेटर उसमें से बेस कीमत और टैक्स हिस्सा निकालता है — यह तब उपयोगी है जब आपको सिर्फ अंतिम शेल्फ/इनवॉइस कीमत पता हो।',
  },
  {
    q: 'भारत में मौजूदा GST स्लैब क्या हैं?',
    a: 'सितंबर 2025 के "GST 2.0" दर सरलीकरण के बाद, संरचना दो मुख्य स्लैब — 5% (मेरिट दर) और 18% (स्टैंडर्ड दर) — साथ ही कुछ लक्ज़री/डिमेरिट सामान के लिए 40% दर, और छूट प्राप्त ज़रूरी चीज़ों के लिए 0% की तरफ सरल हुई। कुछ सामान और पुराने संदर्भ अभी भी सुधार-पूर्व 12%/28% स्लैब का हवाला दे सकते हैं। अपने खास सामान या सेवा के लिए सटीक मौजूदा दर हमेशा आधिकारिक GST Council/CBIC नोटिफिकेशन के हिसाब से पक्की करें, क्योंकि आइटम-से-स्लैब मैपिंग विस्तृत है और आगे भी बदल सकती है।',
  },
  {
    q: 'GST 2.0 के तहत क्या बदला?',
    a: 'सुधार ने सक्रिय टैक्स स्तरों की संख्या घटा दी, कई आइटम जो पहले 12% स्लैब में थे उन्हें 5% या 18% की तरफ ले गया, और ज़्यादा-टैक्स वाले सामान को ज़्यादातर 18% या नए 40% डिमेरिट रेट में मिला दिया — बताया गया लक्ष्य कम स्लैब वाली एक सरल संरचना है। अपने खास प्रोडक्ट/सेवा श्रेणी को नवीनतम आधिकारिक नोटिफिकेशन के हिसाब से पक्का करें, क्योंकि सटीक पुनर्वर्गीकरण आइटम के हिसाब से अलग होता है।',
  },
  {
    q: 'CGST, SGST, और IGST में क्या फर्क है?',
    a: 'राज्य के भीतर बिक्री के लिए, GST को CGST (केंद्र) और SGST (राज्य) में बराबर बांटा जाता है — 18% दर 9% CGST + 9% SGST है। राज्यों के बीच बिक्री के लिए, इसकी बजाय पूरी दर पर एक IGST लगाया जाता है, जो केंद्रीय रूप से इकट्ठा होकर गंतव्य राज्य को दिया जाता है।',
  },
  {
    q: 'क्या मैं एक उपभोक्ता के रूप में GST देता हूं, या सिर्फ व्यवसाय के रूप में?',
    a: 'एक उपभोक्ता के रूप में, आप ज़्यादातर सामान और सेवाओं की कीमत में शामिल GST देते हैं — यह एक अप्रत्यक्ष टैक्स है जो विक्रेता द्वारा इकट्ठा किया जाता है और सरकार को दिया जाता है। रजिस्टर्ड व्यवसाय अतिरिक्त रूप से अपनी बिक्री पर GST से निपटते हैं और आम तौर पर व्यावसायिक खरीद पर चुकाए गए GST पर इनपुट टैक्स क्रेडिट क्लेम कर सकते हैं।',
  },
  {
    q: 'कौन से सामान GST से छूट प्राप्त हैं?',
    a: 'कुछ ज़रूरी आइटम — कई असंसाधित खाद्य पदार्थ, खास स्वास्थ्य सेवा और शिक्षा सेवाएं, और कुछ अन्य श्रेणियां — छूट प्राप्त या ज़ीरो-रेटेड हैं। सटीक छूट सूची GST Council द्वारा तय होती है और समय-समय पर अपडेट होती है, इसलिए मान लेने की बजाय किसी खास आइटम के लिए मौजूदा आधिकारिक सूची जांचें।',
  },
  {
    q: 'GST केंद्र और राज्यों के बीच कैसे बंटता है?',
    a: 'राज्य के भीतर लेनदेन के लिए, GST राजस्व केंद्र सरकार (CGST) और राज्य सरकार (SGST) के बीच बराबर हिस्सों में बंटता है। अंतर-राज्य लेनदेन के लिए, IGST केंद्र द्वारा इकट्ठा किया जाता है और फिर GST सेटलमेंट मैकेनिज्म के तहत गंतव्य राज्य को बांटा जाता है।',
  },
  {
    q: 'इनपुट टैक्स क्रेडिट (ITC) क्या है?',
    a: 'ITC एक GST-रजिस्टर्ड व्यवसाय को व्यावसायिक खरीद (इनपुट) पर चुकाए गए GST को अपनी बिक्री (आउटपुट) पर बकाया GST के मुकाबले ऑफसेट करने देता है, ताकि टैक्स असरदार रूप से सिर्फ हर चरण में जोड़े गए मूल्य पर लगे, पूरी कीमत पर बार-बार जमा होने की बजाय।',
  },
  {
    q: 'इस कैलकुलेटर पर GST दरें कितनी बार अपडेट होती हैं?',
    a: 'GST दरें GST Council तय करती है और समय-समय पर बदल सकती हैं, जिसमें GST 2.0 जैसे संरचनात्मक सुधार भी शामिल हैं। हम दर विकल्पों को मौजूदा रखने की कोशिश करते हैं, लेकिन असली वित्तीय परिणाम वाली किसी भी चीज़ (इनवॉइसिंग, फाइलिंग) के लिए, सिर्फ इस या किसी कैलकुलेटर पर भरोसा करने की बजाय हमेशा लाइव CBIC/GST Council नोटिफिकेशन के हिसाब से क्रॉस-चेक करें।',
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
  name: 'GST Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फाइनेंशियल', path: '/financial' },
  { name: 'GST कैलकुलेटर', path: PATH },
])

const gstTextsHi: GstCalculatorTexts = {
  title: 'GST कैलकुलेटर',
  subtitle: 'किसी भी राशि से GST जोड़ें या हटाएं',
  amountLabel: 'राशि (₹)',
  amountError: 'एक सही राशि डालें।',
  rateLabel: 'GST दर',
  modeLegend: 'राशि है',
  exclusiveLabel: 'GST-एक्सक्लूसिव (GST जोड़ें)',
  inclusiveLabel: 'GST-इनक्लूसिव (GST हटाएं)',
  ctaLabel: 'GST निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  totalInclLabel: 'कुल (GST सहित)',
  totalPayableLabel: 'कुल देय',
  baseAmountLabel: 'बेस राशि',
  gstAtRateTemplate: 'GST @ {rate}%',
  cgstLabel: 'CGST',
  sgstLabel: 'SGST',
}

export default function GstCalculatorPageHi() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'फाइनेंशियल', href: '/hi/financial' },
          { label: 'GST कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="GST कैलकुलेटर"
        subtitle="किसी भी भारतीय GST स्लैब (5%, 12%, 18%, 28% और अधिक) के लिए, CGST/SGST बंटवारे के साथ, बेस कीमत में GST जोड़ें या इनक्लूसिव राशि से इसे हटाएं।"
        stats={[
          { icon: '🧾', big: '5/18/40%', small: 'GST 2.0 स्लैब', tone: 'hub' },
          { icon: '⚖️', big: '50 / 50', small: 'CGST : SGST बंटवारा', tone: 'hub' },
          { icon: '🔄', big: 'जोड़ें या हटाएं', small: 'दो मोड', tone: 'hub' },
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
          <strong>{formatINR(example.base)}</strong> में 18% GST जोड़ने पर{' '}
          <strong>{formatINR(example.gstAmount)}</strong> GST मिलता है (
          {formatINR(example.cgst)} CGST + {formatINR(example.sgst)} SGST),
          कुल <strong>{formatINR(example.total)}</strong>।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          GST निकालें
        </h2>
        <GstCalculator texts={gstTextsHi} />
      </section>

      <section
        aria-labelledby="gst-2-0"
        className="mb-10 rounded-xl border border-hub-financial/25 bg-hub-financial/5 p-5"
      >
        <h2 id="gst-2-0" className="font-display mb-2 text-xl font-bold text-ink-navy">
          GST 2.0 के तहत क्या बदला
        </h2>
        <p className="text-sm text-ash/80">
          सितंबर 2025 में, भारत की GST संरचना दो मुख्य स्लैब पर बनी एक
          सरल प्रणाली की तरफ बढ़ी — <strong>5% (मेरिट दर)</strong> और{' '}
          <strong>18% (स्टैंडर्ड दर)</strong> — साथ ही चुनिंदा लक्ज़री और
          डिमेरिट सामान के लिए <strong>40%</strong> दर, और छूट प्राप्त
          ज़रूरी चीज़ों के लिए 0%। पहले 12% पर टैक्स होने वाले कई आइटम 5%
          या 18% की तरफ शिफ्ट हुए, और ज़्यादा-टैक्स वाले सामान ज़्यादातर
          18% या नए 40% बैंड में समाहित हुए। यह कैलकुलेटर मौजूदा GST 2.0
          दरें और सुधार-पूर्व स्लैब दोनों शामिल करता है जिनका कुछ सामान या
          पुराने संदर्भ अभी भी हवाला दे सकते हैं —{' '}
          <strong>इनवॉइसिंग या फाइलिंग के लिए भरोसा करने से पहले अपने खास
          सामान या सेवा के लिए सटीक दर हमेशा</strong> मौजूदा आधिकारिक GST
          Council/CBIC नोटिफिकेशन के हिसाब से पक्की करें।
        </p>
      </section>

      <FinancialCrossSell current="gst-calculator" />

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
