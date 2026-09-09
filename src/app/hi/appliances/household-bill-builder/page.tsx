import type { Metadata } from 'next'
import Link from 'next/link'
import ApplianceBuilder, { type ApplianceBuilderTexts } from '@/components/calculators/ApplianceBuilder'
import PageHero from '@/components/PageHero'
import { ALL_APPLIANCES, APPLIANCE_CATEGORIES } from '@/data/appliances'
import discomsJson from '@/data/discoms.json'
import { computeApplianceBuilder, applianceMonthlyUnits } from '@/lib/calc/applianceBuilder'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { getTariff } from '@/lib/calc/electricity'
import { formatINR, formatIsoDate } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/household-bill-builder'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)
const liveStateCount = new Set(liveDiscoms.map((d) => d.state)).size
const applianceCount = ALL_APPLIANCES.length

const rate = marginalRatePerUnit('TNEB')
const rankedAppliances = [...ALL_APPLIANCES]
  .map((a) => ({ ...a, monthlyUnits: applianceMonthlyUnits({ watts: a.watts, hoursPerDay: a.typicalHoursPerDay }) }))
  .sort((a, b) => b.monthlyUnits - a.monthlyUnits)
  .slice(0, 8)

const citationTariff = getTariff('MSEDCL')
const formulaExample = applianceMonthlyUnits({ watts: 1500, hoursPerDay: 8 })

const exampleHouseholdItems = [
  { id: 'ac', name: 'Split AC 1.5 Ton (3-star)', watts: 1550, hoursPerDay: 6 },
  { id: 'fan1', name: 'Ceiling Fan', watts: 70, hoursPerDay: 12 },
  { id: 'fan2', name: 'Ceiling Fan', watts: 70, hoursPerDay: 12 },
  { id: 'fridge', name: 'Refrigerator 200L (3-star)', watts: 150, hoursPerDay: 24 },
  { id: 'tv', name: 'LED TV 43"', watts: 80, hoursPerDay: 5 },
  { id: 'geyser', name: 'Storage Geyser 15L (5-star)', watts: 2000, hoursPerDay: 1 },
]
const exampleResult = computeApplianceBuilder('MSEDCL', exampleHouseholdItems)
const exampleRate = marginalRatePerUnit('MSEDCL')

export const metadata: Metadata = {
  title: 'उपकरण बिजली कॉस्ट कैलकुलेटर — हाउसहोल्ड बिल बिल्डर (भारत)',
  description:
    'देखें हर उपकरण आपको कितना खर्च करता है, और आपका मिला-जुला घरेलू बिल, आपके असली DISCOM के प्रोग्रेसिव स्लैब टैरिफ पर आधारित — एक डिवाइस जोड़ने पर आपको महंगे स्लैब में धकेलने पर लाइव अलर्ट के साथ।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/household-bill-builder'),
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
  { name: 'उपकरण', path: '/appliances' },
  { name: 'हाउसहोल्ड बिल बिल्डर', path: PATH },
])
const datasetLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Common home appliance power consumption (India)',
  description:
    'Typical wattage and daily-use reference figures for common Indian household appliances, used to estimate monthly electricity units and cost.',
  url: `${SITE}/hi${PATH}#wattage-chart`,
  variableMeasured: 'Power consumption (watts)',
  creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  license: `${SITE}/terms`,
}

const applianceBuilderTextsHi: ApplianceBuilderTexts = {
  title: 'हाउसहोल्ड बिल बिल्डर',
  subtitle: 'अपने उपकरण जोड़ें, आपके असली DISCOM स्लैब टैरिफ पर आधारित',
  discomLabel: 'DISCOM / राज्य',
  inputMethodLabel: 'इनपुट तरीका',
  applianceModeLabel: 'मुझे अपने उपकरण पता हैं',
  meterModeLabel: 'मेरे पास मीटर रीडिंग है',
  meterUnitsLabel: 'मासिक यूनिट (आपके मीटर/बिल से)',
  estimatedBillLabel: 'अनुमानित बिल',
  addApplianceLabel: '+ उपकरण जोड़ें',
  emptyStateLabel: 'अपना घरेलू कुल बनाने के लिए एक-एक करके उपकरण जोड़ें।',
  hoursUnit: 'घंटे/दिन',
  perMonthUnit: 'यू/माह',
  slabCrossedTemplate: '⚠ इसे जोड़ने से आपका कुल {units} यूनिट तक पहुंच जाता है — {rate}/यूनिट स्लैब में।',
  ctaLabel: 'घरेलू कुल निकालें',
  combinedBillTemplate: 'मिला-जुला घरेलू बिल ({units} यूनिट)',
  energyChargeLabel: 'ऊर्जा चार्ज',
  fixedChargeLabel: 'फिक्स्ड चार्ज',
}

const faqs = [
  {
    q: 'भारतीय घर में सबसे ज़्यादा बिजली कौन सा उपकरण खर्च करता है?',
    a: 'एयर कंडीशनर, पानी गीज़र और रेफ्रिजरेटर आम तौर पर टॉप तीन होते हैं — AC और गीज़र अपनी ऊंची वाटेज की वजह से, और रेफ्रिजरेटर लगातार चलने की वजह से। अपने खास घर के लिए कौन सा हावी है यह देखने के लिए ऊपर अपना मिश्रण जोड़ें।',
  },
  {
    q: 'उपकरण बिजली खर्च कैसे गिना जाता है?',
    a: 'हर उपकरण की मासिक यूनिट = (वाटेज × रोज़ इस्तेमाल के घंटे × 30 दिन) / 1000। फिर आपके सभी उपकरणों की यूनिट्स को एक घरेलू कुल में जोड़ा जाता है और आपके असली DISCOM के प्रोग्रेसिव स्लैब टैरिफ से गिना जाता है — हर उपकरण अलग से बिल नहीं होता।',
  },
  {
    q: '1 यूनिट बिजली क्या है?',
    a: '1 यूनिट = 1 kWh (किलोवाट-घंटा) — एक 1000-वाट उपकरण एक घंटे चलने पर जितनी ऊर्जा इस्तेमाल करता है। यह वह बिलिंग इकाई है जो भारत में हर DISCOM आपके मीटर और बिल पर इस्तेमाल करता है।',
  },
  {
    q: 'एक AC प्रति घंटे कितनी यूनिट इस्तेमाल करता है?',
    a: 'एक सामान्य 1.5-टन 3-स्टार स्प्लिट AC लगातार चलने के हर घंटे लगभग 1.5-1.6 यूनिट खींचता है; समान साइज़ का 5-स्टार यूनिट कम, लगभग 1.2-1.3 यूनिट प्रति घंटा खींचता है — सटीक आंकड़े के लिए अपने असली रोज़ के घंटों के साथ ऊपर अपना जोड़ें।',
  },
  {
    q: 'एक सीलिंग फैन रोज़ कितनी बिजली इस्तेमाल करता है?',
    a: `एक स्टैंडर्ड सीलिंग फैन (लगभग 70W) रोज़ 12 घंटे चलने पर लगभग ${applianceMonthlyUnits({ watts: 70, hoursPerDay: 12 })} यूनिट/महीना इस्तेमाल करता है — समान हवा वाला एक BLDC फैन उसी घंटों में इसका लगभग एक-तिहाई इस्तेमाल कर सकता है।`,
  },
  {
    q: 'फ्रिज का बिल महीने में कितना आता है?',
    a: `एक सामान्य 200L 3-स्टार फ्रिज के लिए जो लगातार चलता है, यहां इस्तेमाल की गई संदर्भ वाटेज पर महीने में लगभग ${applianceMonthlyUnits({ watts: 150, hoursPerDay: 24 })} यूनिट की उम्मीद करें — आपका असली बिल प्रभाव आपके फ्रिज के असली रेटिंग लेबल और ड्यूटी साइकल पर निर्भर करता है, और यह किस टैरिफ स्लैब में आपको ले जाता है। अपने DISCOM के असली नंबर के लिए इसे ऊपर बिल्डर में जोड़ें।`,
  },
  {
    q: 'सीलिंग फैन कितने वाट का होता है?',
    a: 'एक स्टैंडर्ड इंडक्शन-मोटर सीलिंग फैन आम तौर पर 60-75 वाट खींचता है; एक आधुनिक BLDC सीलिंग फैन समान हवा के लिए लगभग 25-30 वाट खींचता है — अपने फैन के सटीक आंकड़े के लिए इसका रेटिंग लेबल जांचें।',
  },
  {
    q: 'क्या मैं इस कैलकुलेटर का इस्तेमाल किसी दुकान या ऑफिस (कमर्शियल कनेक्शन) के लिए कर सकता हूं?',
    a: 'ऊपर का हाउसहोल्ड बिल्डर रेज़िडेंशियल/घरेलू कनेक्शन प्रकार तक सीमित है। किसी दुकान या ऑफिस के लिए, Electricity hub के तहत हमारे पूरे DISCOM बिल कैलकुलेटर इस्तेमाल करें और वहां Commercial कनेक्शन प्रकार चुनें — कमर्शियल स्लैब और फिक्स्ड चार्ज घरेलू से अलग होते हैं।',
  },
  {
    q: 'क्या इस कैलकुलेटर की टैरिफ दरें अपडेट रखी जाती हैं?',
    a: 'हां — हर DISCOM टैरिफ फ़ाइल का अपना स्रोत लिंक और अंतिम-सत्यापित तारीख होती है (ऊपर ट्रस्ट सेक्शन में दिखाई गई), और हम समय-समय पर इन्हें DISCOM के अपने टैरिफ ऑर्डर के हिसाब से दोबारा जांचते हैं। उपकरण वाटेज संदर्भ आंकड़े भी अलग से तारीख वाले हैं।',
  },
  {
    q: 'मैं अपने घर का बिजली बिल कैसे कम कर सकता हूं?',
    a: 'अपने सबसे बड़े लाइन आइटम से शुरू करें — आम तौर पर AC और पानी गर्म करना। अपने AC का थर्मोस्टेट कुछ डिग्री बढ़ाएं, स्टैंडबाय-हीटिंग की बजाय गीज़र को टाइमर पर इस्तेमाल करें, ज़रूरत न होने पर बेकार पड़े चार्जर और राउटर अनप्लग करें, और पुराना यूनिट बदलते समय BEE 5-स्टार या BLDC उपकरण चुनें। खास सुझावों के लिए ऊपर टिप्स सेक्शन देखें।',
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

export default function ApplianceBuilderPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'हाउसहोल्ड बिल बिल्डर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliances hub
          </>
        }
        h1="उपकरण बिजली कॉस्ट कैलकुलेटर — देखें हर डिवाइस आपको कितना खर्च करता है"
        subtitle={
          <>
            हमारे हाउसहोल्ड बिल बिल्डर में एक-एक करके अपने उपकरण जोड़ें और
            देखें आपका कुल कैसे बढ़ता है — आपके असली DISCOM के{' '}
            <strong>प्रोग्रेसिव स्लैब टैरिफ</strong> पर आधारित, ताकि आप ठीक
            देख सकें कब एक नया उपकरण आपके बिल को महंगे स्लैब में धकेलता है।
          </>
        }
        stats={[
          { icon: '🔌', big: `${applianceCount}+`, small: 'उपकरण शामिल', tone: 'hub' },
          { icon: '🗺️', big: `${liveStateCount}`, small: 'राज्य और UT', tone: 'hub' },
          { icon: '⚠️', big: 'स्लैब अलर्ट', small: 'क्रॉसओवर देखें', tone: 'caution-amber' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section aria-labelledby="why" className="mb-10">
          <h2 id="why" className="font-display mb-2 text-2xl font-semibold">
            उपकरण-स्तर का ब्यौरा क्यों मायने रखता है
          </h2>
          <p className="text-ash/80">
            आपका बिजली बिल एक नंबर नहीं है — यह हर उपकरण की अपनी वाटेज और
            घंटों पर चलने का जोड़ है, सब एक ही प्रोग्रेसिव टैरिफ पर पड़ते
            हुए। चूंकि भारतीय स्लैब टेलिस्कोपिक होते हैं, आप जो उपकरण जोड़ते
            हैं वह सिर्फ अपनी यूनिट्स का खर्च नहीं करता — यह बाकी सब कुछ के
            लिए भी आपके पूरे घर की मार्जिनल दर बढ़ा सकता है। यह बिल्डर उस
            मिले-जुले असर को देखने का इकलौता तरीका है, न कि हर उपकरण को
            अलग-अलग गिनना।
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            अपना घरेलू बिल बनाएं
          </h2>
          <ApplianceBuilder discoms={liveDiscoms} texts={applianceBuilderTextsHi} />
        </section>

        <section aria-labelledby="trust" className="mb-10 scroll-mt-20">
          <h2 id="trust" className="font-display mb-4 text-2xl font-semibold">
            हमारे उपकरण कॉस्ट आंकड़े ज़्यादा सटीक क्यों हैं
          </h2>
          <p className="mb-4 text-ash/80">
            कई उपकरण कैलकुलेटर आपकी वाटेज और घंटे जोड़ते हैं, फिर कुल को
            बिना किसी दिखने वाले हवाले के एक सामान्य &ldquo;सेंट्रल टैरिफ
            डेटाबेस&rdquo; के मुकाबले गिनते हैं। हम ऐसा नहीं करते। इस बिल्डर
            का हर DISCOM एक असली टैरिफ फ़ाइल से समर्थित है जिसका एक स्रोत
            लिंक और सत्यापन तारीख है — ताकि आप हमारे आंकड़ों की जांच कर सकें,
            सिर्फ भरोसा नहीं करना पड़े।
          </p>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <p className="text-xs font-semibold tracking-wide text-hub-appliance uppercase">
              उदाहरण: {citationTariff.discomName} ({citationTariff.discomCode})
            </p>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-ash/50">स्रोत</dt>
                <dd>
                  <a
                    href={citationTariff.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brass underline"
                  >
                    आधिकारिक टैरिफ पेज →
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ash/50">अंतिम सत्यापित</dt>
                <dd className="tabular-nums text-ink-navy">
                  {formatIsoDate(citationTariff.lastVerified)}
                </dd>
              </div>
              <div>
                <dt className="text-ash/50">सत्यापन स्थिति</dt>
                <dd className="text-ink-navy">{citationTariff.verifiedBy}</dd>
              </div>
            </dl>
          </div>
          <p className="mt-3 text-xs text-ash/50">
            इस साइट पर हर कैलकुलेटर यही टैरिफ-फ़ाइल हवाला दिखाता है — इसे{' '}
            <Link href="/hi/electricity" className="underline hover:text-hub-appliance">
              Electricity hub
            </Link>{' '}
            के तहत किसी भी DISCOM पेज पर देखें।
          </p>
        </section>

        <section aria-labelledby="formula" className="mb-10 scroll-mt-20">
          <h2 id="formula" className="font-display mb-4 text-2xl font-semibold">
            यह कैलकुलेटर कैसे काम करता है
          </h2>
          <div className="rounded-xl border border-hairline bg-paper p-5">
            <div className="space-y-2 font-mono text-sm">
              <p className="rounded-lg bg-mist px-3 py-2">
                यूनिट (kWh) = (वाटेज × रोज़ के घंटे × 30 दिन) / 1000
              </p>
              <p className="rounded-lg bg-mist px-3 py-2">
                घरेलू कुल = Σ (हर उपकरण की यूनिट्स)
              </p>
              <p className="rounded-lg bg-mist px-3 py-2">
                बिल = घरेलू कुल आपके असली DISCOM के प्रोग्रेसिव स्लैब टैरिफ पर गिना गया
              </p>
            </div>
            <p className="mt-3 text-sm text-ash/70">
              उदाहरण: एक <strong>1500W AC</strong>{' '}
              <strong>8 घंटे/दिन</strong> चलने पर ={' '}
              1500 × 8 × 30 / 1000 ={' '}
              <strong className="text-hub-appliance">{formulaExample} यूनिट/महीना</strong>.
            </p>
            <p className="mt-3 text-xs text-ash/50">
              यही वह सटीक फंक्शन है जो ऊपर बिल्डर इस्तेमाल करता है — कोई
              सरल किया हुआ पुनर्कथन नहीं। हर उपकरण की यूनिट्स एक चलते कुल में
              जुड़ती हैं, जिसे फिर पूरे स्लैब ढांचे से गिना जाता है, इसलिए
              आपकी आखिरी यूनिट्स की दर इस पर निर्भर करती है कि आपने पहले
              क्या-क्या जोड़ा है।
            </p>
          </div>
        </section>

        <section aria-labelledby="how-to" className="mb-10 scroll-mt-20">
          <h2 id="how-to" className="font-display mb-4 text-2xl font-semibold">
            स्टेप बाय स्टेप: यह कैलकुलेटर कैसे इस्तेमाल करें
          </h2>
          <ol className="space-y-3">
            {[
              'ड्रॉपडाउन से अपना DISCOM/राज्य चुनें।',
              'अपना कनेक्शन प्रकार चुनें (डिफ़ॉल्ट रूप से रेज़िडेंशियल)।',
              'ड्रॉपडाउन से एक-एक करके अपने उपकरण जोड़ें।',
              'हर उपकरण के दैनिक घंटों को अपने असली इस्तेमाल से मिलाएं।',
              'अपने मिले-जुले बिल का ब्यौरा, और किसी भी स्लैब-क्रॉसिंग अलर्ट को देखें।',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-appliance font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-ash/80">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="who" className="mb-10 scroll-mt-20">
          <h2 id="who" className="font-display mb-4 text-2xl font-semibold">
            यह कैलकुलेटर कौन इस्तेमाल कर सकता है
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'घर के मालिक और परिवार', body: 'पता लगाएं कौन सा एक उपकरण असल में आपका बिल बढ़ा रहा है, और कितना।' },
              { title: 'किराएदार और PG निवासी', body: 'शिफ्ट होने से पहले, आप असल में जो उपकरण इस्तेमाल करेंगे उनसे अपने संभावित बिजली हिस्से का अनुमान लगाएं।' },
              { title: 'दुकान और ऑफिस मालिक', body: 'बिज़नेस परिसर के लिए हमारे पूरे DISCOM कैलकुलेटर पर Commercial कनेक्शन प्रकार पर स्विच करें।' },
              { title: 'छात्र और युवा वयस्क', body: 'अपने पहले स्वतंत्र प्रवास के लिए, उपकरण-दर-उपकरण, यथार्थवादी बजट बनाएं।' },
              { title: 'सोलर पैनल इस्तेमालकर्ता', body: <>अपने घरेलू इस्तेमाल की तुलना उससे करें जो एक रूफटॉप सिस्टम बनाएगा — हमारा <Link href="/hi/solar/roi-calculator" className="underline hover:text-hub-appliance">सोलर ROI कैलकुलेटर</Link> देखें।</> },
              { title: 'बचत करना चाहने वाले कोई भी', body: 'पहले अपने सबसे बड़े लाइन आइटम खोजें — वहीं इस्तेमाल कम करने का असली फर्क पड़ता है।' },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-hairline bg-paper p-5">
                <p className="font-display font-bold text-ink-navy">{c.title}</p>
                <p className="mt-1 text-sm text-ash/70">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="example" className="mb-10 scroll-mt-20">
          <h2 id="example" className="font-display mb-2 text-2xl font-semibold">
            उदाहरण गणना — एक असली घर
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            एक यथार्थवादी महाराष्ट्र घर का उपकरण मिश्रण, ऊपर बिल्डर जैसे ही
            इंजन से {citationTariff.discomCode} के असली स्लैब टैरिफ पर लाइव
            गिना गया:
          </p>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">उपकरण</th>
                  <th className="px-4 py-2 text-right font-semibold">वाट</th>
                  <th className="px-4 py-2 text-right font-semibold">घंटे/दिन</th>
                  <th className="px-4 py-2 text-right font-semibold">यूनिट/महीना</th>
                  <th className="px-4 py-2 text-right font-semibold">अनुमानित खर्च</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {exampleResult.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 font-medium">{item.name}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{item.watts}W</td>
                    <td className="px-4 py-2 text-right tabular-nums">{item.hoursPerDay}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{item.monthlyUnits}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-hub-appliance">
                      {formatINR(item.monthlyUnits * exampleRate)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-mist text-ink-navy">
                <tr>
                  <td className="px-4 py-2 font-semibold" colSpan={3}>
                    मिला-जुला कुल ({exampleResult.totalMonthlyUnits} यूनिट, असली स्लैब प्राइसिंग)
                  </td>
                  <td className="px-4 py-2 text-right font-semibold tabular-nums" colSpan={2}>
                    {formatINR(exampleResult.bill.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            प्रति-उपकरण &ldquo;अनुमानित खर्च&rdquo; कॉलम उदाहरण के लिए है,
            {citationTariff.discomCode} की टॉप मार्जिनल दर
            (₹{exampleRate.toFixed(2)}/यूनिट) पर बांटा गया — आपका असली बिल
            दाईं तरफ का मिला-जुला कुल है, पूरे प्रोग्रेसिव स्लैब ढांचे,
            फिक्स्ड चार्ज और शुल्क को एक साथ गिनकर, बिल्कुल वैसे ही जैसे ऊपर
            बिल्डर इसे गिनता है।
          </p>
        </section>

        <section aria-labelledby="wattage-chart" className="mb-10 scroll-mt-20">
          <h2 id="wattage-chart" className="font-display mb-2 text-2xl font-semibold">
            सामान्य घरेलू उपकरण — बिजली खपत चार्ट
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            श्रेणी के हिसाब से समूहित, उपकरण के हिसाब से सामान्य वाटेज — वही
            सटीक संदर्भ डेटा जो ऊपर बिल्डर इस्तेमाल करता है।
          </p>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">उपकरण</th>
                  <th className="px-4 py-2 font-semibold">श्रेणी</th>
                  <th className="px-4 py-2 text-right font-semibold">सामान्य वाटेज</th>
                  <th className="px-4 py-2 text-right font-semibold">सामान्य इस्तेमाल</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {APPLIANCE_CATEGORIES.flatMap((cat) =>
                  cat.appliances.map((a) => (
                    <tr key={a.name}>
                      <td className="px-4 py-2 font-medium">{a.name}</td>
                      <td className="px-4 py-2 text-ash/60">{cat.category}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{a.watts}W</td>
                      <td className="px-4 py-2 text-right tabular-nums">{a.typicalHoursPerDay} घंटे/दिन</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            ये अनुमान के लिए सामान्य मध्य-रेंज संदर्भ आंकड़े हैं, नेमप्लेट
            गारंटी नहीं — असली मॉडल अलग हो सकते हैं, इसलिए हमेशा अपने खास
            उपकरण के रेटिंग लेबल पर सटीक वाटेज जांचें।
          </p>
        </section>

        <section aria-labelledby="ranked" className="mb-10">
          <h2 id="ranked" className="font-display mb-2 text-2xl font-semibold">
            भारतीय घर में सबसे बड़े बिजली खपत करने वाले
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            आम तौर पर बताए गए इस्तेमाल पैटर्न पर सामान्य मासिक यूनिट्स के
            हिसाब से रैंक किया गया — ऊपर बिल्डर जैसे ही संदर्भ डेटा से लाइव
            गिना गया, एक प्रतिनिधि ₹{rate.toFixed(2)}/यूनिट (तमिलनाडु टॉप
            स्लैब) पर आधारित।
          </p>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">उपकरण</th>
                  <th className="px-4 py-2 text-right font-semibold">सामान्य इस्तेमाल</th>
                  <th className="px-4 py-2 text-right font-semibold">यूनिट/महीना</th>
                  <th className="px-4 py-2 text-right font-semibold">अनुमानित खर्च/महीना</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {rankedAppliances.map((a) => (
                  <tr key={a.name}>
                    <td className="px-4 py-2 font-medium">{a.name}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{a.typicalHoursPerDay} घंटे/दिन</td>
                    <td className="px-4 py-2 text-right tabular-nums">{a.monthlyUnits}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-hub-appliance">
                      {formatINR(a.monthlyUnits * rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            संदर्भ वाटेज आंकड़े सामान्य मध्य-रेंज अनुमान हैं, आपके खास मॉडल
            के लिए नेमप्लेट गारंटी नहीं — ज़्यादा सटीक इनपुट वाले
            सिंगल-उपकरण टूल (जैसे फ्रिज कैलकुलेटर, जो आपके यूनिट के अपने BEE
            लेबल आंकड़े का इस्तेमाल करता है) के लिए हमारा{' '}
            <Link href="/hi/appliances" className="underline hover:text-hub-appliance">
              Appliances hub
            </Link>{' '}
            देखें।
          </p>
        </section>

        <section aria-labelledby="differ" className="mb-10 scroll-mt-20">
          <h2 id="differ" className="font-display mb-2 text-2xl font-semibold">
            आपका अनुमान आपके असली बिल से अलग क्यों हो सकता है
          </h2>
          <div className="space-y-3 text-ash/80">
            <p>
              हमारा मिला-जुला ब्यौरा पहले से ही स्लैब-प्राइस्ड एनर्जी चार्ज
              के साथ आपके DISCOM का फिक्स्ड/मीटर चार्ज, फ्यूल कॉस्ट
              एडजस्टमेंट (FCA) और बिजली शुल्क शामिल करता है — किसी शुद्ध
              उपकरण-स्तर अनुमान के उलट जो सिर्फ यूनिट × दर पर रुक जाता है।
              फिर भी, कुछ चीज़ें आपके असली बिल को अलग बना सकती हैं:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>श्रेणी-विशिष्ट सब्सिडी</strong> — सार्वभौमिक
                (&ldquo;सभी घरेलू&rdquo;) योजनाएं अपने आप लागू होती हैं,
                लेकिन आय- या श्रेणी-जुड़ी सब्सिडी (BPL, कृषि, आदि) को आपकी
                खास पात्रता चाहिए, जो यह टूल फिलहाल नहीं पूछता।
              </li>
              <li>
                <strong>मीटर रीडिंग और बिलिंग-साइकल का समय</strong> — आपका
                असली बिल आपके DISCOM की खास रीडिंग तारीखों को कवर करता है,
                किसी साफ 30-दिन के महीने को नहीं, इसलिए असली इस्तेमाल के
                दिन हमारी मासिक मान्यता से थोड़े ज़्यादा या कम हो सकते हैं।
              </li>
              <li>
                <strong>राउंडिंग और छोटे स्थानीय चार्ज</strong> — कुछ
                DISCOM छोटे नगरपालिका या स्थानीय-निकाय चार्ज जोड़ते हैं जिन्हें
                हम मॉडल नहीं करते, और बिल कैलकुलेटर से अलग तरीके से राउंड
                होते हैं।
              </li>
              <li>
                <strong>उपकरण वाटेज में अंतर</strong> — हमारी संदर्भ वाटेज
                सामान्य मध्य-रेंज आंकड़े हैं; आपके खास मॉडल का रेटिंग लेबल
                अलग हो सकता है, खासकर पुराने या असामान्य रूप से कुशल
                यूनिट के लिए।
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="tips" className="mb-10">
          <h2 id="tips" className="font-display mb-4 text-2xl font-semibold">
            अपना उपकरण बिजली खर्च कम करने के सुझाव
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'BLDC फैन पर स्विच करें',
                body: <>एक BLDC सीलिंग फैन समान हवा के लिए एक स्टैंडर्ड इंडक्शन-मोटर फैन से लगभग 60% कम पावर इस्तेमाल करता है — अपने पूरे घर में बचत साइज़ करने के लिए हमारा <Link href="/hi/appliances/ceiling-fan-cost-calculator" className="underline hover:text-hub-appliance">सीलिंग फैन कॉस्ट कैलकुलेटर</Link> देखें।</>,
              },
              {
                title: 'अपने AC को 24°C या उससे ऊपर रखें',
                body: <>24°C से नीचे हर डिग्री आम तौर पर लगभग 6% ज़्यादा खपत जोड़ती है — टनेज और स्टार रेटिंग के हिसाब से गहरे रनिंग-कॉस्ट ब्यौरे के लिए हमारे <Link href="/hi/ac" className="underline hover:text-hub-appliance">AC कैलकुलेटर</Link> देखें।</>,
              },
              {
                title: 'स्टैंडबाय/फैंटम लोड अनप्लग करें',
                body: <>राउटर, सेट-टॉप बॉक्स और 24/7 प्लग में लगे चार्जर साल भर में जुड़ते जाते हैं — हमारा <Link href="/hi/appliances/phantom-load-checker" className="underline hover:text-hub-appliance">फैंटम लोड चेकर</Link> जांचें।</>,
              },
              {
                title: 'गीज़र का कुशलता से इस्तेमाल करें',
                body: 'गीज़र को पूरे दिन स्टैंडबाय-हीटिंग पर छोड़ने की बजाय टाइमर या मैनुअल शट-ऑफ इस्तेमाल करना, इंस्टेंट/स्टोरेज दोनों तरह के गीज़र पर काफी बचत करता है ऐसा आम तौर पर कहा जाता है।',
              },
              {
                title: 'BEE स्टार-रेटेड उपकरण चुनें',
                body: 'एक ऊंची स्टार रेटिंग उसी काम के लिए सीधे वाटेज या सालाना kWh आंकड़ा कम करती है — फ्रिज जैसे हमेशा-ऑन डिवाइस पर खासतौर पर असरदार।',
              },
            ].map((t) => (
              <div key={t.title} className="rounded-xl border border-hairline bg-paper p-5">
                <p className="font-display font-bold text-ink-navy">{t.title}</p>
                <p className="mt-1 text-sm text-ash/70">{t.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-ash/50">
            ये आम तौर पर बताए जाने वाले सांकेतिक आंकड़े हैं, आपके खास घर के
            लिए गारंटीशुदा बचत नहीं — आपकी असली बचत आपके मौजूदा इस्तेमाल के
            पैटर्न, टैरिफ स्लैब, और उपकरण की स्थिति पर निर्भर करती है।
          </p>
        </section>

        <section aria-labelledby="related" className="mb-10">
          <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
            जुड़े हुए कैलकुलेटर
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/hi/appliances/inverter-sizing-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🔌</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                इन्वर्टर साइज़िंग
              </p>
              <p className="mt-1 text-xs text-ash/60">
                वही वाटेज डेटा, इस बार बैकअप पावर के लिए साइज़ किया गया।
              </p>
            </Link>
            <Link
              href="/hi/appliances/phantom-load-checker"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>👻</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                फैंटम लोड चेकर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                हमेशा-ऑन स्टैंडबाय डिवाइस आपको कितना खर्च करते हैं।
              </p>
            </Link>
            <Link
              href="/hi/ac"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>❄️</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                AC कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                आपके सबसे बड़े अकेले लाइन आइटम में गहराई से जाएं।
              </p>
            </Link>
            <Link
              href="/hi/electricity"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>⚡</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                बिजली बिल कैलकुलेटर
              </p>
              <p className="mt-1 text-xs text-ash/60">
                एक असली मीटर रीडिंग से आपका पूरा बिल।
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
