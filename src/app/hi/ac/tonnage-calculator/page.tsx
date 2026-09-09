import type { Metadata } from 'next'
import Link from 'next/link'
import AcTonnageCalculator, { type AcTonnageCalculatorTexts } from '@/components/calculators/AcTonnageCalculator'
import PageHero from '@/components/PageHero'
import { recommendTonnage } from '@/lib/calc/ac'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/tonnage-calculator'
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'टनेज कैलकुलेटर', path: PATH },
])

export const metadata: Metadata = {
  title: 'AC टनेज कैलकुलेटर 2026 — कमरे का साइज़ और BTU गाइड (भारत)',
  description:
    'अपने कमरे के साइज़ (sq ft) के हिसाब से सही AC टनेज जानें, धूप और टॉप फ्लोर के हीट-गेन के हिसाब से एडजस्ट किया गया। कमरे के साइज़ का चार्ट, BTU रूपांतरण, और स्टेप-बाय-स्टेप तरीका — कोई मनगढ़ंत आंकड़े नहीं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac/tonnage-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const acTonnageCalculatorTextsHi: AcTonnageCalculatorTexts = {
  title: 'AC टनेज कैलकुलेटर',
  subtitle: 'अपने कमरे के लिए सही AC साइज़ जानें',
  areaLabel: 'कमरे का क्षेत्रफल',
  areaUnit: 'sq ft',
  areaError: 'कमरे का सही क्षेत्रफल (sq ft में) डालें।',
  sunLegend: 'धूप',
  sunOptions: [
    { value: 'low', label: 'छायादार', icon: '🌥️' },
    { value: 'medium', label: 'मध्यम', icon: '⛅' },
    { value: 'high', label: 'सीधी धूप', icon: '☀️' },
  ],
  floorLegend: 'मंजिल',
  floorOptions: [
    { value: 'other', label: 'टॉप फ्लोर नहीं', icon: '🏢' },
    { value: 'top', label: 'टॉप फ्लोर', icon: '🏠' },
  ],
  ctaLabel: 'मेरा AC साइज़ जानें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  recommendedLabel: 'सुझाया गया AC साइज़',
  tonUnit: 'टन',
  coolingLoadTemplate: 'अनुमानित कूलिंग लोड: {btu} BTU ({rawTons} टन कच्चा)',
}

// ---------------------------------------------------------------------------
// Every number below comes straight out of recommendTonnage() — the same
// function the calculator above uses. Nothing here is estimated by hand or
// borrowed from a competitor's methodology.
const ROOM_SIZES = [80, 100, 120, 150, 180, 200, 250, 300, 400, 500]
const STANDARD_ROWS = ROOM_SIZES.map((area) => ({
  area,
  standard: recommendTonnage({ areaSqFt: area, sunExposure: 'medium', floor: 'other' }),
  worst: recommendTonnage({ areaSqFt: area, sunExposure: 'high', floor: 'top' }),
  best: recommendTonnage({ areaSqFt: area, sunExposure: 'low', floor: 'other' }),
}))

function findBoundary(fromTon: number, toTon: number): number {
  for (let a = 60; a <= 520; a++) {
    const r = recommendTonnage({ areaSqFt: a, sunExposure: 'medium', floor: 'other' })
    const prev = recommendTonnage({ areaSqFt: a - 1, sunExposure: 'medium', floor: 'other' })
    if (prev.recommendedTon === fromTon && r.recommendedTon === toTon) return a
  }
  return 0
}
const boundary1_5Ton = findBoundary(1.0, 1.5)
const boundary2Ton = findBoundary(1.5, 2.0)
// ---------------------------------------------------------------------------

const faqs = [
  {
    q: '150 sq ft के कमरे के लिए मुझे कितने साइज़ का AC चाहिए?',
    a: `150 sq ft के कमरे को सामान्य परिस्थितियों (मध्यम धूप, टॉप फ्लोर नहीं) में आम तौर पर 1.5 टन AC चाहिए — हमारा कैलकुलेटर ठीक इसी साइज़ के लिए ${STANDARD_ROWS.find((r) => r.area === 150)?.standard.recommendedTon} टन बताता है। अगर कमरा काफी छायादार है, तो 1 टन काफी हो सकता है; अगर यह टॉप फ्लोर पर है और तेज़ दोपहर की धूप आती है, तो साइज़ घटाने की बजाय 1.5 टन पर टिके रहें।`,
  },
  {
    q: '1 टन AC कितने क्षेत्रफल को कवर करता है?',
    a: `हमारी मानक मान्यताओं (मध्यम धूप, टॉप फ्लोर नहीं) के हिसाब से, 1 टन लगभग ${boundary1_5Ton - 1} sq ft तक कवर करता है, इसके आगे सुझाव 1.5 टन पर चला जाता है। एक छायादार, ग्राउंड/मिडिल-फ्लोर कमरा कभी-कभी थोड़ा और खिंच सकता है; तेज़ धूप वाला टॉप-फ्लोर कमरा जल्दी 1.5 टन की ज़रूरत में आ जाता है।`,
  },
  {
    q: 'क्या मंजिल AC टनेज को प्रभावित करती है?',
    a: 'हां। टॉप-फ्लोर कमरा पूरे दिन छत से सीधी गर्मी सोखता है, इसलिए नीचे के समान कमरे की तुलना में हमारा कैलकुलेटर टॉप-फ्लोर कमरों के कूलिंग लोड में 10% जोड़ता है।',
  },
  {
    q: 'क्या खिड़की/धूप AC साइज़िंग के लिए मायने रखती है?',
    a: 'हां। तेज़ सीधी धूप (पश्चिम-मुखी, बड़ी बिना-छाया वाली खिड़कियां) वाले कमरों को छायादार कमरों से ज़्यादा कूलिंग क्षमता चाहिए। हमारा कैलकुलेटर मध्यम धूप के लिए 10% और तेज़/सीधी धूप के लिए 20% जोड़ता है।',
  },
  {
    q: 'क्या बड़ा AC हमेशा बेहतर होता है?',
    a: 'नहीं। ओवरसाइज़्ड AC शॉर्ट-साइकल करता है — यह कमरे को जल्दी ठंडा करके ठीक से डीह्यूमिडिफाई करने से पहले ही बंद हो जाता है, जिससे कमरा ठंडा तो लगता है पर चिपचिपा रहता है, और बार-बार ऑन/ऑफ होने से कंप्रेसर जल्दी घिसता है। अंडरसाइज़्ड AC पूरी क्षमता पर लगातार चलता है, गर्म दिनों में सेट तापमान तक नहीं पहुंच पाता, और सही साइज़ के यूनिट से ज़्यादा बिजली खर्च करता है। सही साइज़िंग सबसे अच्छा आराम और सबसे कम खर्च देती है।',
  },
  {
    q: 'बड़े कमरे (300+ sq ft) के लिए मुझे कितने साइज़ का AC चाहिए?',
    a: `हमारा कैलकुलेटर ${boundary2Ton} sq ft या उससे ज़्यादा के मानक-परिस्थिति लोड वाले कमरों के लिए अपना सुझाव 2 टन पर सीमित रखता है — यह सबसे बड़ा आम तौर पर उपलब्ध सिंगल-यूनिट रेज़िडेंशियल साइज़ है। वाकई बड़े या ओपन-प्लान स्पेस (300–500 sq ft और उससे ऊपर) के लिए, बराबर हवा वितरण के लिए लगाए गए दो छोटे AC यूनिट आम तौर पर ज़्यादा समान रूप से ठंडा करते हैं और एक यूनिट की सर्विसिंग के दौरान बैकअप क्षमता देते हैं, बजाय एक ओवरसाइज़्ड यूनिट पर निर्भर रहने के।`,
  },
  {
    q: 'AC टनेज का BTU से क्या संबंध है?',
    a: '1 टन AC कूलिंग क्षमता 12,000 BTU/hr (British Thermal Units प्रति घंटा) के बराबर है — यह कूलिंग क्षमता रेट करने के लिए इस्तेमाल होने वाला अंतरराष्ट्रीय मानक है, ब्रांड चाहे जो भी हो।',
  },
  {
    q: 'यह AC टनेज कैलकुलेटर कितना सटीक है?',
    a: 'यह एक व्यापक रूप से इस्तेमाल होने वाला अंगूठे का नियम — लगभग 1 टन प्रति 140 sq ft — इस्तेमाल करता है, जिसे धूप और मंजिल के हिसाब से एडजस्ट किया जाता है। यह एक योजना अनुमान है, किसी पेशेवर हीट-लोड (Manual J जैसे) आकलन का विकल्प नहीं, जो छत की ऊंचाई, इंसुलेशन क्वालिटी, रहने वालों की संख्या, और स्थानीय जलवायु को भी विस्तार से ध्यान में रखता है।',
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
  name: 'AC Tonnage Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to calculate AC tonnage for a room',
  step: [
    { '@type': 'HowToStep', position: 1, text: 'Measure your room length and width in feet, and multiply to get the area in square feet.' },
    { '@type': 'HowToStep', position: 2, text: 'Divide the area by 140 to get the baseline tonnage.' },
    { '@type': 'HowToStep', position: 3, text: 'Add 10% for medium sun exposure or 20% for direct/high sun exposure.' },
    { '@type': 'HowToStep', position: 4, text: 'Add a further 10% if the room is on the top floor.' },
    { '@type': 'HowToStep', position: 5, text: 'Round up to the nearest standard AC size: 0.8, 1, 1.5 or 2 ton.' },
  ],
}

export default function AcTonnagePageHi() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/hi/ac' },
          { label: 'टनेज कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="AC टनेज कैलकुलेटर (कमरे का साइज़ और BTU गाइड)"
        subtitle="अपने कमरे के लिए सही AC साइज़ पाएं। फ्लोर एरिया डालें और धूप व मंजिल के हिसाब से एडजस्ट करें — सही साइज़िंग दो सबसे आम गलतियों से बचाती है: एक अंडरसाइज़्ड AC जो कभी काफी नहीं होता, और एक ओवरसाइज़्ड AC जो शॉर्ट-साइकल करता है और असमान रूप से ठंडा करता है।"
        stats={[
          { icon: '📐', big: '1T / 140 sqft', small: 'बेसलाइन अनुपात', tone: 'hub' },
          { icon: '☀️', big: '+10–20%', small: 'धूप', tone: 'hub' },
          { icon: '🏠', big: '+10%', small: 'टॉप फ्लोर', tone: 'hub' },
          { icon: '❄️', big: '0.8–2 टन', small: 'मानक साइज़', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-bold text-ink-navy">
          अपना AC साइज़ जानें
        </h2>
        <AcTonnageCalculator texts={acTonnageCalculatorTextsHi} />
      </section>

      {/* Room-size chart — real computed values */}
      <section aria-labelledby="chart" className="mb-10 scroll-mt-20">
        <h2 id="chart" className="font-display mb-2 text-2xl font-bold text-ink-navy">
          कमरे के साइज़ के हिसाब से AC टनेज — पूरा चार्ट
        </h2>
        <p className="mb-4 text-ash/70">
          &ldquo;मानक&rdquo; मध्यम धूप और गैर-टॉप-फ्लोर कमरे को मानता है।
          &ldquo;सबसे अच्छी स्थिति&rdquo; और &ldquo;सबसे खराब स्थिति&rdquo; दिखाते हैं कि एक
          छायादार कमरा या टॉप-फ्लोर, सीधी-धूप वाला कमरा सुझाव को कितना बदल सकता है।
        </p>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">कमरे का साइज़</th>
                <th className="px-4 py-2 text-right font-semibold">सबसे अच्छी स्थिति</th>
                <th className="px-4 py-2 text-right font-semibold">मानक</th>
                <th className="px-4 py-2 text-right font-semibold">सबसे खराब स्थिति</th>
                <th className="px-4 py-2 text-right font-semibold">BTU/hr (मानक)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {STANDARD_ROWS.map((r) => (
                <tr key={r.area}>
                  <td className="px-4 py-2 font-medium">{r.area} sq ft</td>
                  <td className="px-4 py-2 text-right tabular-nums text-spark-teal">
                    {r.best.recommendedTon}T
                  </td>
                  <td className="px-4 py-2 text-right font-semibold tabular-nums text-hub-ac">
                    {r.standard.recommendedTon}T
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-caution-amber">
                    {r.worst.recommendedTon}T
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {r.standard.coolingBtu.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ash/50">
          {boundary2Ton} sq ft से आगे, हमारा कैलकुलेटर अपना सुझाव 2 टन पर सीमित
          रखता है — इस बिंदु के बाद दो यूनिट में बांटना आम तौर पर बेहतर क्यों है, यह
          देखने के लिए नीचे &ldquo;बड़े कमरे&rdquo; देखें।
        </p>
      </section>

      {/* 1 ton coverage */}
      <section aria-labelledby="one-ton" className="mb-10 scroll-mt-20">
        <h2 id="one-ton" className="font-display mb-2 text-2xl font-bold text-ink-navy">
          1 टन AC — कितना क्षेत्रफल कवर करता है?
        </h2>
        <div className="rounded-xl border border-hub-ac/20 bg-hub-ac/5 p-5">
          <p className="text-ash/80">
            सामान्य परिस्थितियों में, 1 टन लगभग{' '}
            <strong className="text-hub-ac">{boundary1_5Ton - 1} sq ft</strong>{' '}
            तक के कमरों को कवर करता है (करीब 11×12 ft का कमरा)। एक छायादार,
            निचली-मंजिल का कमरा कभी-कभी 1 टन पर थोड़ा और खिंच सकता है; तेज़ धूप
            वाला टॉप-फ्लोर कमरा जल्दी 1.5-टन के दायरे में चला जाता है — जितनी
            जल्दी{' '}
            {(() => {
              for (let a = 60; a <= 200; a++) {
                if (
                  recommendTonnage({ areaSqFt: a, sunExposure: 'high', floor: 'top' })
                    .recommendedTon === 1.5 &&
                  recommendTonnage({ areaSqFt: a - 1, sunExposure: 'high', floor: 'top' })
                    .recommendedTon === 1.0
                )
                  return a
              }
              return boundary1_5Ton
            })()}{' '}
            sq ft पर।
          </p>
        </div>
      </section>

      {/* 1.5 ton breakout */}
      <section aria-labelledby="onefive-ton" className="mb-10 scroll-mt-20">
        <h2 id="onefive-ton" className="font-display mb-2 text-2xl font-bold text-ink-navy">
          1.5 टन AC — फीट में कमरे का साइज़
        </h2>
        <p className="mb-4 text-ash/70">
          1.5 टन भारत का सबसे आम घरेलू AC साइज़ है। सामान्य परिस्थितियों में यह
          लगभग {boundary1_5Ton}–{boundary2Ton - 1} sq ft कवर करता है।
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              कवरेज रेंज (सामान्य परिस्थितियां)
            </p>
            <p className="font-display mt-1 text-2xl font-bold text-hub-ac">
              {boundary1_5Ton}–{boundary2Ton - 1} sq ft
            </p>
            <p className="mt-1 text-sm text-ash/60">
              जैसे 12×15 ft (180 sq ft) का बेडरूम या छोटा लिविंग रूम
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              1.5 टन = 12,000 × 1.5
            </p>
            <p className="font-display mt-1 text-2xl font-bold text-hub-ac">18,000 BTU/hr</p>
            <p className="mt-1 text-sm text-ash/60">
              कूलिंग क्षमता की वैश्विक मानक इकाई
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 rounded-xl bg-mist p-5 sm:grid-cols-2">
          <p className="text-sm font-semibold text-ink-navy sm:col-span-2">
            1 टन की बजाय 1.5 टन कब चुनें
          </p>
          {[
            `कमरे का साइज़ ${boundary1_5Ton}+ sq ft — 1 टन इसे अंडरसाइज़ कर देगा`,
            'टॉप-फ्लोर बेडरूम — छत की गर्मी 1 टन से जल्दी आगे धकेल देती है',
            'पश्चिम-मुखी या बिना-छाया खिड़कियां — दोपहर की धूप असली लोड जोड़ती है',
            'खराब इंसुलेशन या पुराना निर्माण — 1.5T इसकी भरपाई करता है',
          ].map((t) => (
            <div key={t} className="flex items-start gap-2 text-sm text-ash/80">
              <span className="mt-0.5 text-hub-ac" aria-hidden>✓</span>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Large rooms */}
      <section aria-labelledby="large-rooms" className="mb-10 scroll-mt-20">
        <h2 id="large-rooms" className="font-display mb-2 text-2xl font-bold text-ink-navy">
          बड़े कमरे और हॉल (300+ sq ft)
        </h2>
        <p className="mb-4 text-ash/70">
          हमारा कैलकुलेटर अपना सिंगल-यूनिट सुझाव 2 टन पर सीमित रखता है। वाकई बड़े
          या ओपन-प्लान कमरों के लिए, एक बड़ा AC हमेशा सबसे अच्छा जवाब नहीं होता —
          दो छोटे यूनिट एक जाना-पहचाना विकल्प हैं।
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'हवा का वितरण', body: 'बड़े या L-आकार के कमरों में अक्सर डेड ज़ोन होते हैं जहां एक अकेला AC नहीं पहुंच पाता। विपरीत दीवारों पर लगे दो यूनिट पूरी जगह को ज़्यादा समान रूप से ठंडा करते हैं।' },
            { title: 'रिडंडेंसी', body: 'अगर आपके एक बड़े AC को सर्विसिंग की ज़रूरत पड़े, तो पूरी कूलिंग चली जाती है। दो यूनिट के साथ, एक की मरम्मत के दौरान भी आंशिक कूलिंग बनी रहती है।' },
            { title: 'चलाने का खर्च', body: 'आंशिक लोड पर चलने वाले दो इन्वर्टर यूनिट अक्सर पूरी क्षमता पर चल रहे एक बड़े यूनिट से ज़्यादा कुशल होते हैं, खासकर हल्के मौसम में।' },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-hairline bg-paper p-5">
              <p className="font-display font-bold text-ink-navy">{c.title}</p>
              <p className="mt-1 text-sm text-ash/70">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step by step */}
      <section aria-labelledby="how" className="mb-10 scroll-mt-20">
        <h2 id="how" className="font-display mb-4 text-2xl font-bold text-ink-navy">
          AC टनेज कैसे निकालें — स्टेप बाय स्टेप
        </h2>
        <ol className="space-y-3">
          {[
            'फीट में कमरे की लंबाई और चौड़ाई मापें, और क्षेत्रफल पाने के लिए गुणा करें। उदाहरण: 12 ft × 15 ft = 180 sq ft.',
            'बेसलाइन टनेज पाने के लिए क्षेत्रफल को 140 से भाग दें। 180 ÷ 140 = 1.29 टन.',
            'मध्यम धूप के लिए 10%, या तेज़/सीधी धूप के लिए 20% जोड़ें। मध्यम धूप: 1.29 × 1.1 = 1.41 टन.',
            'अगर कमरा टॉप फ्लोर पर है तो और 10% जोड़ें। टॉप फ्लोर: 1.41 × 1.1 = 1.55 टन.',
            'नज़दीकी मानक साइज़ तक राउंड करें — 0.8, 1, 1.5 या 2 टन। 1.55 राउंड होकर 2 टन बनता है.',
          ].map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-ac font-display text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-ash/80">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* BTU conversion */}
      <section aria-labelledby="btu" className="mb-10 scroll-mt-20">
        <h2 id="btu" className="font-display mb-4 text-2xl font-bold text-ink-navy">
          AC टन से BTU रूपांतरण
        </h2>
        <div className="rounded-xl border border-hairline bg-paper p-5">
          <p className="text-center text-sm text-ash/60">
            सार्वभौमिक फॉर्मूला
          </p>
          <p className="font-display my-2 text-center text-2xl font-bold text-hub-ac">
            1 टन = 12,000 BTU/hr
          </p>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-mist p-3">
              <p className="font-semibold text-ink-navy">टन → BTU</p>
              <p className="mt-1 text-ash/70">टनेज को 12,000 से गुणा करें</p>
              <p className="mt-1 font-mono text-xs">1.5 टन × 12,000 = 18,000 BTU</p>
              <p className="font-mono text-xs">2.0 टन × 12,000 = 24,000 BTU</p>
            </div>
            <div className="rounded-lg bg-mist p-3">
              <p className="font-semibold text-ink-navy">BTU → टन</p>
              <p className="mt-1 text-ash/70">BTU को 12,000 से भाग दें</p>
              <p className="mt-1 font-mono text-xs">18,000 ÷ 12,000 = 1.5 टन</p>
              <p className="font-mono text-xs">24,000 ÷ 12,000 = 2.0 टन</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section aria-labelledby="mistakes" className="mb-10 scroll-mt-20">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-bold text-ink-navy">
          अंडरसाइज़्ड बनाम ओवरसाइज़्ड बनाम सही साइज़
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5">
            <p className="font-display font-bold text-caution-amber">अंडरसाइज़्ड AC</p>
            <p className="mt-1 text-sm text-ash/70">
              पूरी क्षमता पर लगातार चलता है, गर्म दिनों में सेट तापमान तक ठीक से
              नहीं पहुंच पाता, और कंप्रेसर को जल्दी घिसता है।
            </p>
          </div>
          <div className="rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5">
            <p className="font-display font-bold text-caution-amber">ओवरसाइज़्ड AC</p>
            <p className="mt-1 text-sm text-ash/70">
              कमरे को जल्दी ठंडा करके ठीक से डीह्यूमिडिफाई करने से पहले ही बंद
              हो जाता है (शॉर्ट-साइकलिंग) — कमरा ठंडा तो लगता है पर चिपचिपा रहता है।
            </p>
          </div>
          <div className="rounded-xl border border-spark-teal/25 bg-spark-teal/5 p-5">
            <p className="font-display font-bold text-spark-teal">सही साइज़ का AC</p>
            <p className="mt-1 text-sm text-ash/70">
              स्थिर साइकल में चलता है, तापमान और नमी बनाए रखता है, और कमरे के
              लिए सबसे कम खर्च देता है।
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section aria-labelledby="related" className="mb-10 scroll-mt-20">
        <h2 id="related" className="font-display mb-4 text-2xl font-bold text-ink-navy">
          टनेज पता चलने के बाद
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/hi/ac/bill-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC रनिंग कॉस्ट
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपने सुझाए गए टनेज और DISCOM के लिए सटीक मासिक खर्च देखें।
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
              क्या 5-स्टार का प्रीमियम आपके इस्तेमाल के हिसाब से फायदेमंद है?
            </p>
          </Link>
          <Link
            href="/hi/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              बिजली बिल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              सिर्फ AC नहीं, अपना पूरा बिल देखें।
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

      <section aria-labelledby="faq" className="mb-10 scroll-mt-20">
        <h2 id="faq" className="font-display mb-4 text-2xl font-bold text-ink-navy">
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

      <footer className="rounded-lg bg-mist p-4 text-sm text-ash/60">
        <p>
          पद्धति: यह कैलकुलेटर एक व्यापक रूप से इस्तेमाल होने वाला साइज़िंग नियम —
          लगभग 1 टन कूलिंग प्रति 140 sq ft — इस्तेमाल करता है, जिसे धूप और मंजिल
          के हिसाब से एडजस्ट किया जाता है। यह एक योजना अनुमान है, किसी पेशेवर
          कमरा-दर-कमरा हीट-लोड आकलन का विकल्प नहीं।
        </p>
      </footer>

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
