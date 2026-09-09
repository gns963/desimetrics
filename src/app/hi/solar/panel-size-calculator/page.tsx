import type { Metadata } from 'next'
import Link from 'next/link'
import SolarPanelSizeCalculator, {
  type SolarPanelSizeCalculatorTexts,
} from '@/components/calculators/SolarPanelSizeCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { ROOF_SQFT_PER_KW, recommendSystemSize } from '@/lib/calc/solar'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/panel-size-calculator'

const example = recommendSystemSize({ monthlyUnits: 300, offsetPercent: 100 })

const ROOF_AREA_SIZES = [1, 1.5, 2, 3, 5, 7.5, 10]

export const metadata: Metadata = {
  title: 'सोलर पैनल साइज़ कैलकुलेटर 2026 — सिस्टम kW और छत का क्षेत्रफल (भारत)',
  description:
    'अपने मासिक इस्तेमाल और लक्ष्य ऑफसेट प्रतिशत से, अपने बिजली बिल को ऑफसेट करने के लिए ज़रूरी रूफटॉप सोलर सिस्टम साइज़ (kW) और छत का क्षेत्रफल जानें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/solar/panel-size-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Solar Panel Size Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'सोलर', path: '/solar' },
  { name: 'पैनल साइज़ कैलकुलेटर', path: PATH },
])

const solarPanelSizeTextsHi: SolarPanelSizeCalculatorTexts = {
  title: 'सोलर पैनल साइज़ कैलकुलेटर',
  subtitle: 'आपको किस सिस्टम साइज़ और छत के क्षेत्रफल की ज़रूरत है',
  unitsLabel: 'औसत मासिक खपत',
  unitsUnit: 'यूनिट',
  offsetLabel: 'बिल ऑफसेट लक्ष्य',
  offsetUnit: '%',
  offsetHint: '100% आपके मौजूदा इस्तेमाल को पूरी तरह ऑफसेट करने का लक्ष्य रखता है; 100% से ऊपर एक्सपोर्ट के लिए अतिरिक्त का लक्ष्य रखता है।',
  ctaLabel: 'सिस्टम साइज़ सुझाएं',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  recommendedSizeLabel: 'सुझाया गया साइज़',
  roofAreaLabel: 'ज़रूरी छत का क्षेत्रफल',
  roofAreaUnit: 'sq ft',
  generationTemplate: '≈ {units} यूनिट/महीना जनरेशन',
}

const faqs = [
  {
    q: 'सुझाया गया सिस्टम साइज़ कैसे गिना जाता है?',
    a: 'सुझाया गया kW = (मासिक यूनिट × ऑफसेट %) ÷ (4 यूनिट/kW/दिन × 30 दिन) — भारतीय परिस्थितियों के लिए साल भर के औसत पर आधारित लगभग 4 यूनिट प्रति kW इंस्टॉल प्रति दिन की एक मानक योजना मान्यता।',
  },
  {
    q: 'कैलकुलेटर नज़दीकी 0.5 kW तक क्यों राउंड करता है?',
    a: 'रूफटॉप सोलर सिस्टम आम तौर पर मानक पैनल और इन्वर्टर कॉम्बिनेशन के आधार पर आधे-kW के अंतराल में साइज़ और कोट किए जाते हैं, इसलिए असली कोट पाने के लिए एक राउंड आंकड़ा ज़्यादा उपयोगी है।',
  },
  {
    q: 'क्या मुझे 100% ऑफसेट या उससे ज़्यादा का लक्ष्य रखना चाहिए?',
    a: 'यह आपके राज्य के नेट-मीटरिंग नियमों पर निर्भर करता है। अगर आपका DISCOM एक्सपोर्ट यूनिट्स के लिए अच्छा क्रेडिट देता है, तो 100% से ज़्यादा साइज़ करना सही हो सकता है; अगर एक्सपोर्ट क्रेडिट कम है, तो 100% के करीब (या अपने असली दिन के इस्तेमाल) साइज़ करना आम तौर पर सबसे अच्छा पेबैक देता है। हमारा नेट मीटरिंग कैलकुलेटर देखें।',
  },
  {
    q: 'क्या छत की छाया इसे प्रभावित करती है?',
    a: 'हां — यह कैलकुलेटर बिना-छाया वाली छत की जगह मानता है। आंशिक छाया (पानी की टंकी, पेड़, या पड़ोसी इमारत से) हर पैनल की असली जनरेशन कम कर देती है और इसका मतलब हो सकता है कि उसी आउटपुट के लिए यहां दिखाए गए से ज़्यादा छत के क्षेत्रफल की ज़रूरत हो।',
  },
  {
    q: 'सामान्य सिस्टम के लिए मुझे कितनी छत की जगह चाहिए?',
    a: `मानक योजना मान्यताओं के तहत लगभग ${ROOF_SQFT_PER_KW} sq ft प्रति kW — तो 1 kW सिस्टम को लगभग ${ROOF_SQFT_PER_KW} sq ft, 3 kW को लगभग ${3 * ROOF_SQFT_PER_KW} sq ft, और 5 kW को लगभग ${5 * ROOF_SQFT_PER_KW} sq ft चाहिए। और साइज़ के लिए ऊपर संदर्भ तालिका देखें।`,
  },
  {
    q: 'क्या पैनल की दिशा तय करती है कि मुझे कितनी छत की जगह चाहिए?',
    a: 'हां — दक्षिण-मुखी, बिना-छाया वाली छत हर पैनल से सबसे ज़्यादा आउटपुट पाती है, इसलिए उसे किसी दिए गए kW के लिए सबसे कम जगह चाहिए। पूर्व/पश्चिम-मुखी या आंशिक छायादार छतें हर पैनल से कम बनाती हैं, इसलिए उसी लक्ष्य सिस्टम साइज़ को पाने के लिए आपको अतिरिक्त पैनल (और जगह) चाहिए हो सकते हैं।',
  },
  {
    q: 'अगर मेरी छत एक साधारण आयत नहीं है तो?',
    a: 'इंस्टॉलर वेंट, पानी की टंकी, सीढ़ी और अनियमित आकार के आसपास नियमित रूप से काम करते हैं — यहां दिए sq ft आंकड़े एक साफ आयताकार क्षेत्र मानते हुए एक योजना अनुमान हैं। एक इंस्टॉलर का साइट सर्वे पक्का बताएगा कि आपकी खास छत पर असल में कितने पैनल फिट होते हैं।',
  },
  {
    q: 'क्या मुझे पूरे घर के लिए या सिर्फ AC लोड के लिए सिस्टम साइज़ करना चाहिए?',
    a: 'सिर्फ एक उपकरण नहीं, अपनी कुल घरेलू खपत के लिए साइज़ करें — लेकिन अगर AC आपका सबसे बड़ा अकेला लोड है, तो पक्का करें कि यह आपके डाले "मासिक यूनिट" आंकड़े में शामिल हो, क्योंकि इसे छोड़ना एक आम गलती है जिससे अंडरसाइज़िंग होती है। उस लोड को खासतौर पर जांचने के लिए हमारा AC रनिंग कॉस्ट कैलकुलेटर देखें।',
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

export default function SolarPanelSizePageHi() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'सोलर', href: '/hi/solar' },
          { label: 'पैनल साइज़ कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="सोलर पैनल साइज़ कैलकुलेटर"
        subtitle="अपने मासिक बिजली इस्तेमाल और आप अपने बिल का कितना हिस्सा ऑफसेट करना चाहते हैं, इससे रूफटॉप सोलर सिस्टम साइज़ और छत का क्षेत्रफल जानें।"
        stats={[
          { icon: '☀️', big: '~4u/kW/दिन', small: 'जनरेशन मान्यता', tone: 'hub' },
          { icon: '📐', big: '~100 sqft/kW', small: 'छत की जगह', tone: 'hub' },
          { icon: '⚙️', big: '0.5 kW', small: 'साइज़िंग अंतराल', tone: 'hub' },
          { icon: '📊', big: '20–150%', small: 'ऑफसेट रेंज', tone: 'hub' },
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
          महीने में <strong>300 यूनिट</strong> इस्तेमाल करने वाले घर को{' '}
          <strong>100% ऑफसेट</strong> के लक्ष्य के लिए लगभग{' '}
          <strong>{example.recommendedKw} kW</strong> का सिस्टम चाहिए, जिसके
          लिए लगभग <strong>{example.roofAreaSqFt} sq ft</strong> छत की जगह
          चाहिए।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना सिस्टम साइज़ जानें
        </h2>
        <SolarPanelSizeCalculator texts={solarPanelSizeTextsHi} />
      </section>

      <section aria-labelledby="roof-space" className="mb-10">
        <h2 id="roof-space" className="font-display mb-2 text-2xl font-semibold">
          आपको असल में कितनी छत की जगह चाहिए?
        </h2>
        <p className="mb-4 text-ash/70">
          लगभग ~{ROOF_SQFT_PER_KW} sq ft प्रति kW पर एक त्वरित संदर्भ — असली
          ज़रूरी जगह पैनल की दक्षता, स्पेसिंग और छत के लेआउट के हिसाब से बदलती
          है।
        </p>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist">
              <tr>
                <th className="px-4 py-2 font-semibold">सिस्टम साइज़</th>
                <th className="px-4 py-2 text-right font-semibold">ज़रूरी छत का क्षेत्रफल</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {ROOF_AREA_SIZES.map((kw) => (
                <tr key={kw}>
                  <td className="px-4 py-2 font-medium">{kw} kW</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {Math.round(kw * ROOF_SQFT_PER_KW)} sq ft
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="shading" className="mb-10">
        <h2 id="shading" className="font-display mb-2 text-2xl font-semibold">
          छाया और दिशा आपके असरदार सिस्टम साइज़ को कैसे प्रभावित करते हैं
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            ऊपर के छत-क्षेत्रफल आंकड़े बिना-छाया, अच्छी दिशा वाली जगह मानते
            हैं। बिना रुकावट वाली दक्षिण-मुखी छत हर पैनल पर मानक जनरेशन
            मान्यता के करीब पहुंचती है; पूर्व- या पश्चिम-मुखी छतें दिन भर में
            थोड़ी कम बनाती हैं, और कोई भी छाया — पानी की टंकी, पैरापेट, पेड़ या
            पड़ोसी इमारत से — प्रभावित पैनलों पर आउटपुट और कम कर देती है।
          </p>
          <p>
            असल में इसका मतलब है कि एक छायादार या खराब दिशा वाली छत को उसी
            असरदार kW तक पहुंचने के लिए ऊपर की तालिका से <em>ज़्यादा</em> पैनल
            (और ज़्यादा जगह) चाहिए हो सकते हैं — एक इंस्टॉलर का साइट सर्वे, जो
            सीधे सूरज के रास्ते और रुकावटों की जांच करता है, आपकी छत की असली
            क्षमता पक्की करने का इकलौता तरीका है।
          </p>
        </div>
      </section>

      <section aria-labelledby="ac-load" className="mb-10">
        <h2 id="ac-load" className="font-display mb-2 text-2xl font-semibold">
          सिस्टम साइज़ बनाम आपका AC और उपकरण लोड
        </h2>
        <p className="mb-4 text-ash/80">
          आपके &quot;मासिक यूनिट&quot; इनपुट को आपकी असली घरेलू खपत दिखानी
          चाहिए, सिर्फ बेस लाइटिंग और पंखे नहीं — खासकर AC आपके बिल की सबसे
          बड़ी लाइन हो सकता है, इसलिए इसे छोड़ने से आपका सिस्टम अंडरसाइज़ हो
          जाएगा। अगर आपको वह आंकड़ा अभी नहीं पता, तो सिस्टम साइज़ करने से पहले
          नीचे के कैलकुलेटर से जांच लें।
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/hi/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC रनिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपनी मासिक यूनिट्स में AC का हिस्सा जानें।
            </p>
          </Link>
          <Link
            href="/appliances"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              उपकरण कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              फ्रिज, पंखा और अन्य रोज़मर्रा के लोड।
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर ROI कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इस सिस्टम साइज़ के लिए पेबैक और बचत देखें।
            </p>
          </Link>
          <Link
            href="/hi/solar/subsidy-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💸</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              PM सूर्य घर सब्सिडी
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इस साइज़ के लिए अपनी सब्सिडी राशि जांचें।
            </p>
          </Link>
          <Link
            href="/hi/solar/net-metering-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔄</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              नेट मीटरिंग कमाई
            </p>
            <p className="mt-1 text-xs text-ash/60">
              100% से ज़्यादा साइज़ कर रहे हैं? अतिरिक्त की कीमत देखें।
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
