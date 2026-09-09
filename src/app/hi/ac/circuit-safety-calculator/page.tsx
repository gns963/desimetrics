import type { Metadata } from 'next'
import Link from 'next/link'
import AcCircuitSafetyCalculator, {
  type AcCircuitSafetyCalculatorTexts,
} from '@/components/calculators/AcCircuitSafetyCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import AcCircuitSafetyTable from '@/components/ac/AcCircuitSafetyTable'
import PageHero from '@/components/PageHero'
import { recommendAcCircuit } from '@/lib/calc/ac'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/circuit-safety-calculator'

const example = recommendAcCircuit({ ratedCurrentAmps: 6 })

export const metadata: Metadata = {
  title: 'AC सर्किट सेफ्टी कैलकुलेटर 2026 — MCB और वायर गेज साइज़िंग (भारत)',
  description:
    'AC सर्किट के लिए MCB रेटिंग और कॉपर वायर गेज की सामान्य योजना मार्गदर्शन, रेटेड करंट के आधार पर। लाइसेंसशुदा इलेक्ट्रीशियन का विकल्प नहीं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac/circuit-safety-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AC Circuit Safety Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'सर्किट सेफ्टी कैलकुलेटर', path: PATH },
])

const acCircuitSafetyTextsHi: AcCircuitSafetyCalculatorTexts = {
  title: 'AC सर्किट सेफ्टी कैलकुलेटर',
  subtitle: 'MCB रेटिंग और वायर गेज मार्गदर्शन',
  currentLabel: 'AC रेटेड करंट',
  currentUnit: 'A',
  currentHint: "AC के नेमप्लेट से — आम तौर पर 'Rated Current' के नाम से Amps में लिखा होता है।",
  ctaLabel: 'सर्किट सुझाव पाएं',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  mcbLabel: 'सुझाया गया MCB',
  wireLabel: 'सुझाई गई वायर',
  wireUnit: 'sq mm',
}

const faqs = [
  {
    q: 'क्या यह लाइसेंसशुदा इलेक्ट्रीशियन का विकल्प है?',
    a: 'नहीं। यह इंस्टॉलेशन से पहले लगभग क्या उम्मीद करें, यह समझने में मदद करने वाला सामान्य योजना मार्गदर्शन है — आपकी खास वायर रन लंबाई, परिवेश तापमान, कंड्यूट फिल और स्थानीय इलेक्ट्रिकल कोड को ध्यान में रखते हुए अंतिम MCB और वायर स्पेसिफिकेशन एक लाइसेंसशुदा इलेक्ट्रीशियन से ही पक्का कराना चाहिए।',
  },
  {
    q: 'कैलकुलेटर रेटेड करंट में 25% अतिरिक्त हेडरूम क्यों जोड़ता है?',
    a: 'AC कंप्रेसर शुरू होते समय अपने स्थिर चलने वाले करंट से काफी ज़्यादा एक छोटी सर्ज करंट खींचते हैं, और AC जैसे लगातार चलने वाले लोड को सुरक्षा मार्जिन के लिए पारंपरिक रूप से डीरेट किया जाता है — नेमप्लेट रेटेड करंट पर 25% हेडरूम साइज़िंग के लिए एक आम शुरुआती बिंदु है।',
  },
  {
    q: 'AC के लिए डेडिकेटेड सर्किट की सलाह क्यों दी जाती है?',
    a: 'दूसरे हाई-लोड उपकरणों के साथ सर्किट साझा करने से बार-बार ट्रिप होने या ओवरहीटिंग का खतरा बढ़ जाता है। भारत में स्प्लिट और विंडो AC इंस्टॉलेशन के लिए सिर्फ AC के लिए साइज़ किया गया डेडिकेटेड MCB और वायर रन मानक अभ्यास है।',
  },
  {
    q: 'भारत में घरेलू AC वायरिंग किस मानक के तहत आती है?',
    a: 'IS 732 (Code of Practice for Electrical Wiring Installations) संबंधित भारतीय मानक है, साथ ही आपके स्थानीय बिजली बोर्ड के वायरिंग नियम भी। एक लाइसेंसशुदा इलेक्ट्रीशियन इन्हें आपकी खास साइट के लिए सही तरीके से लागू करेगा।',
  },
  {
    q: 'अगर MCB, AC के लिए छोटा साइज़ का हो तो क्या होगा?',
    a: 'अंडरसाइज़्ड MCB बार-बार ट्रिप करेगा, खासकर कंप्रेसर की स्टार्टअप सर्ज पर — यह एक झंझट है, लेकिन सुरक्षित फेलियर मोड है। यह अपने आप आग नहीं लगाएगा; यह वायरिंग ओवरलोड होने से पहले बिजली काटकर सर्किट की सुरक्षा करता है।',
  },
  {
    q: 'अगर वायर गेज छोटा साइज़ का हो तो क्या होगा?',
    a: 'यह वाकई खतरनाक स्थिति है: MCB ट्रिप न भी हो, तब भी लगातार AC लोड के तहत अंडरसाइज़्ड वायर गर्म हो सकती है, जो एक असली आग का खतरा है। इसीलिए वायर साइज़िंग सिर्फ किसी टेबल से अंदाज़ा लगाने की बजाय लाइसेंसशुदा इलेक्ट्रीशियन से पक्की करानी चाहिए।',
  },
  {
    q: 'क्या मैं एक ही सर्किट पर दो AC चला सकता हूं?',
    a: 'सलाह नहीं दी जाती। भारत में मानक अभ्यास है — हर AC यूनिट के लिए, उसी के हिसाब से साइज़ किया गया एक डेडिकेटेड MCB और वायर रन — दो AC के बीच सर्किट साझा करने से कम से कम बार-बार ट्रिपिंग और ज़्यादा से ज़्यादा ओवरलोडिंग का खतरा रहता है।',
  },
  {
    q: 'क्या नीचे दी संदर्भ तालिका विंडो AC पर भी वैसे ही लागू होती है?',
    a: 'वही करंट-से-MCB-से-वायर लॉजिक लागू होता है, लेकिन विंडो AC आम तौर पर कम टनेज के होते हैं और अक्सर डेडिकेटेड लाइन की बजाय मानक 15A/16A घरेलू सॉकेट सर्किट पर चलते हैं — AC के प्रकार चाहे जो भी हो, अपने खास यूनिट की नेमप्लेट करंट तालिका से मिलाकर जांच लें।',
  },
  {
    q: 'मेरे AC की असली नेमप्लेट करंट संदर्भ तालिका से अलग है — कौन सी इस्तेमाल करूं?',
    a: 'हमेशा अपने यूनिट की असली नेमप्लेट करंट इस्तेमाल करें, तालिका के टनेज-आधारित अनुमान की नहीं — तालिका सामान्य योजना संदर्भ के लिए है, जबकि ऊपर का कैलकुलेटर और आपका इलेक्ट्रीशियन आपके AC की असली रेटेड करंट से काम करेंगे।',
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

export default function AcCircuitSafetyPageHi() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/hi/ac' },
          { label: 'सर्किट सेफ्टी कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="AC सर्किट सेफ्टी कैलकुलेटर"
        subtitle="AC सर्किट को आम तौर पर जिस MCB रेटिंग और कॉपर वायर गेज की ज़रूरत होती है, उसका सामान्य योजना मार्गदर्शन। यह आपके इलेक्ट्रीशियन से बातचीत का शुरुआती बिंदु है — अंतिम स्पेसिफिकेशन नहीं।"
        stats={[
          { icon: '🛡️', big: '+25%', small: 'सुरक्षा हेडरूम', tone: 'hub' },
          { icon: '📘', big: 'IS 732', small: 'संदर्भ मानक', tone: 'hub' },
          { icon: '🔌', big: 'डेडिकेटेड', small: 'सर्किट की सलाह', tone: 'hub' },
          { icon: '⚠️', big: 'अंतिम नहीं', small: 'इलेक्ट्रीशियन से पुष्टि करें', tone: 'caution-amber' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section
        aria-labelledby="worked-example"
        className="mb-8 rounded-xl border border-hairline border-l-4 border-l-caution-amber bg-paper p-5"
      >
        <h2
          id="worked-example"
          className="font-display text-sm font-semibold tracking-wide text-caution-amber uppercase"
        >
          उदाहरण गणना — सिर्फ सामान्य मार्गदर्शन
        </h2>
        <p className="mt-2 text-ash/80">
          <strong>6A</strong> रेटेड AC के लिए आम तौर पर लगभग{' '}
          <strong>{example.recommendedMcbAmps}A MCB</strong> और{' '}
          <strong>{example.recommendedWireSqmm} sq mm</strong> कॉपर वायर की
          ज़रूरत होगी — अपने खास इंस्टॉलेशन के लिए हमेशा लाइसेंसशुदा
          इलेक्ट्रीशियन से इसकी पुष्टि कराएं।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना सर्किट मार्गदर्शन पाएं
        </h2>
        <AcCircuitSafetyCalculator texts={acCircuitSafetyTextsHi} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          यह कैसे गिना जाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            <strong>डिज़ाइन करंट।</strong> हम AC की नेमप्लेट रेटेड करंट लेते हैं
            और 25% हेडरूम जोड़ते हैं, क्योंकि कंप्रेसर मोटर अपने चलने वाले करंट
            से ऊपर एक छोटी स्टार्टिंग सर्ज खींचते हैं।
          </p>
          <p>
            <strong>MCB रेटिंग।</strong> डिज़ाइन करंट पर या उससे ऊपर का अगला
            मानक MCB साइज़ (6A, 10A, 16A, 20A, 25A, 32A, 40A… में से) सुझाया
            जाता है।
          </p>
          <p>
            <strong>वायर गेज।</strong> हम MCB रेटिंग को उस करंट रेंज के लिए
            भारतीय घरेलू वायरिंग अभ्यास में आम तौर पर इस्तेमाल होने वाले कॉपर
            वायर क्रॉस-सेक्शन से मिलाते हैं — यह एक शुरुआती संदर्भ है, आपके
            खास रन के वोल्टेज ड्रॉप या हीट डिसिपेशन की गणना नहीं।
          </p>
        </div>
      </section>

      <section
        aria-labelledby="reference-table"
        className="mb-10 rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5"
      >
        <h2
          id="reference-table"
          className="font-display mb-2 text-2xl font-semibold text-ink-navy"
        >
          AC टनेज के हिसाब से सामान्य MCB और वायर गेज — सामान्य संदर्भ
        </h2>
        <p className="mb-4 text-sm text-ash/70">
          सिर्फ देखने के लिए, स्पेसिफिकेशन नहीं — असली इंस्टॉलेशन को हमेशा
          ऊपर के कैलकुलेटर से AC की अपनी नेमप्लेट करंट के हिसाब से साइज़ करें,
          फिर लाइसेंसशुदा इलेक्ट्रीशियन से पुष्टि कराएं।
        </p>
        <AcCircuitSafetyTable />
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/hi/ac/power-consumption-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔢</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              पावर कंजम्पशन
            </p>
            <p className="mt-1 text-xs text-ash/60">
              वही रेटेड करंट, पावर ड्रॉ और यूनिट्स के लिए।
            </p>
          </Link>
          <Link
            href="/hi/ac/tonnage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC टनेज कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अभी भी AC साइज़ चुन रहे हैं? यहां से शुरू करें।
            </p>
          </Link>
          <Link
            href="/appliances/inverter-sizing-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              इन्वर्टर साइज़िंग
            </p>
            <p className="mt-1 text-xs text-ash/60">
              दूसरे सर्किट के लिए भी बैकअप पावर की योजना बना रहे हैं?
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

      <footer className="rounded-lg bg-caution-amber/10 p-4 text-sm text-ash/70">
        <p>
          ⚠ <strong>सुरक्षा सूचना:</strong> अगर साइज़ या इंस्टॉलेशन गलत हो तो
          इलेक्ट्रिकल वायरिंग में आग और झटके का असली खतरा होता है। यह
          कैलकुलेटर आम भारतीय घरेलू वायरिंग अभ्यास से लिया गया सामान्य योजना
          मार्गदर्शन देता है — यह लाइसेंसशुदा इलेक्ट्रीशियन द्वारा आकलन और
          इंस्टॉलेशन का विकल्प नहीं है, और वायर रन लंबाई, परिवेश तापमान,
          कंड्यूट फिल या आपके स्थानीय इलेक्ट्रिकल कोड को विस्तार से ध्यान में
          नहीं रखता।
        </p>
      </footer>

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
