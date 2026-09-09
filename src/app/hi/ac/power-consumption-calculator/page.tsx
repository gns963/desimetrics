import type { Metadata } from 'next'
import Link from 'next/link'
import AcPowerConsumptionCalculator, {
  type AcPowerConsumptionCalculatorTexts,
} from '@/components/calculators/AcPowerConsumptionCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { calculateAcPowerConsumption } from '@/lib/calc/ac'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/power-consumption-calculator'

const example = calculateAcPowerConsumption({ ratedCurrentAmps: 6, hoursPerDay: 8 })

export const metadata: Metadata = {
  title: 'AC पावर कंजम्पशन कैलकुलेटर 2026 — रेटेड करंट (Amps) से',
  description:
    'अपने AC की नेमप्लेट रेटेड करंट (Amps में) से पावर ड्रॉ और यूनिट (kWh) खपत निकालें — टनेज/स्टार-रेटिंग तरीके का एक विकल्प।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac/power-consumption-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AC Power Consumption Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'पावर कंजम्पशन कैलकुलेटर', path: PATH },
])

const acPowerTextsHi: AcPowerConsumptionCalculatorTexts = {
  title: 'AC पावर कंजम्पशन कैलकुलेटर',
  subtitle: 'आपके AC की रेटेड करंट (नेमप्लेट) से',
  currentLabel: 'रेटेड करंट',
  currentUnit: 'A',
  currentHint: "AC की आउटडोर यूनिट पर नेमप्लेट देखें — आम तौर पर 'Rated Current' के नाम से Amps में लिखा होता है।",
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'पावर कंजम्पशन निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  powerDrawLabel: 'पावर ड्रॉ',
  perDayLabel: 'यूनिट/दिन',
  perMonthLabel: 'यूनिट/महीना',
  perYearLabel: 'यूनिट/साल',
}

const faqs = [
  {
    q: 'मेरे AC की रेटेड करंट कहां मिलेगी?',
    a: 'यह आउटडोर (कंप्रेसर) यूनिट के नेमप्लेट पर छपी होती है, आम तौर पर Amps (A) में "Rated Current" या "Input Current" के नाम से लिखी होती है।',
  },
  {
    q: 'यह AC रनिंग कॉस्ट कैलकुलेटर से कैसे अलग है?',
    a: 'रनिंग कॉस्ट कैलकुलेटर टनेज और स्टार रेटिंग (ISEER) से काम करता है, जो AC मॉडल की तुलना करते समय उपयोगी है। यह टूल आपके खास यूनिट की नेमप्लेट करंट से काम करता है, जो तब उपयोगी है जब आपके पास पहले से AC है और ISEER टेबल खोजे बिना जल्दी पावर-ड्रॉ आंकड़ा चाहिए।',
  },
  {
    q: 'कैलकुलेटर 0.85 पावर फैक्टर क्यों मानता है?',
    a: 'AC कंप्रेसर मोटर आम तौर पर लगभग 0.85 पावर फैक्टर पर चलते हैं, यानी असली (वर्किंग) पावर, वोल्टेज × करंट से मिलने वाली एपेरेंट पावर की लगभग 85% होती है। यह एक सामान्य आंकड़ा है — आपके खास यूनिट का नेमप्लेट पावर फैक्टर थोड़ा अलग हो सकता है।',
  },
  {
    q: 'क्या यह मुझे सिर्फ यूनिट नहीं, खर्च भी बताता है?',
    a: 'यह टूल यूनिट (kWh) खपत दिखाता है। अपने DISCOM के टैरिफ पर आधारित ₹ खर्च अनुमान के लिए, यहां से मिले दैनिक यूनिट आंकड़े के साथ AC रनिंग कॉस्ट कैलकुलेटर इस्तेमाल करें।',
  },
  {
    q: 'नेमप्लेट असल में कैसा दिखता है, और यह ठीक कहां होता है?',
    a: 'स्प्लिट AC में यह आउटडोर यूनिट के साइड या पीछे की तरफ एक मेटल या स्टिकर लेबल होता है, जिसमें मॉडल नंबर, रेफ्रिजरेंट टाइप, वोल्टेज, और करंट ड्रॉ लिखा होता है — आम तौर पर "Rated Current" या "Running Current" के नाम से Amps में। विंडो AC में यह साइड पैनल पर होता है, स्लीव के बाहर से दिखता है।',
  },
  {
    q: 'पुराने या बिना-लेबल AC के लिए यह कैसे उपयोगी है?',
    a: 'पुराने या दोबारा बिकने वाले यूनिट का नेमप्लेट कभी-कभी घिसा हुआ, गायब, या गैर-अंग्रेज़ी में होता है, और ISEER लेबलिंग हाल के सालों में ही अनिवार्य हुई है — इसलिए पुराने यूनिट के लिए टनेज/स्टार-रेटिंग आंकड़े शायद हों ही नहीं। असली चलते करंट की क्लैंप मीटर रीडिंग, या पढ़ने लायक रेटेड-करंट आंकड़ा, तब भी काम करता है जब दक्षता लेबल नहीं करता।',
  },
  {
    q: 'क्या मैं नेमप्लेट पढ़ने की बजाय खुद करंट माप सकता हूं?',
    a: 'हां — AC के किसी एक सप्लाई वायर पर एक बेसिक क्लैंप मीटर, यूनिट चलते समय सीधा करंट रीडिंग देता है। यह नेमप्लेट आंकड़े से ज़्यादा सटीक हो सकता है, जो एक रेटेड (रियल-टाइम नहीं) वैल्यू है।',
  },
  {
    q: 'क्या नेमप्लेट या वायरिंग जांचने के लिए खुद AC यूनिट खोलना सुरक्षित है?',
    a: 'दिखने वाला नेमप्लेट पढ़ना ठीक है। इलेक्ट्रिकल एनक्लोज़र खोलना, अंदरूनी वायरिंग जांचना, या यूनिट के अंदर क्लैंप मीटर इस्तेमाल करना सिर्फ लाइसेंसशुदा इलेक्ट्रीशियन द्वारा, या उसकी निगरानी में ही किया जाना चाहिए — इसके वायरिंग वाले हिस्से के लिए हमारा सर्किट सेफ्टी कैलकुलेटर देखें।',
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

export default function AcPowerConsumptionPageHi() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/hi/ac' },
          { label: 'पावर कंजम्पशन कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="AC पावर कंजम्पशन कैलकुलेटर"
        subtitle={
          <>
            अपने AC की <strong>नेमप्लेट रेटेड करंट</strong> से सीधे इसका पावर
            ड्रॉ और यूनिट (kWh) खपत जानें — टनेज या स्टार-रेटिंग खोजने की ज़रूरत
            नहीं।
          </>
        }
        stats={[
          { icon: '🔌', big: '230V', small: 'मानक सप्लाई', tone: 'hub' },
          { icon: '⚙️', big: '0.85', small: 'मान्य पावर फैक्टर', tone: 'hub' },
          { icon: '📊', big: 'kW', small: 'नतीजे की इकाई', tone: 'hub' },
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
          <strong>6A</strong> रेटेड AC जो <strong>रोज़ 8 घंटे</strong> चलता है,
          लगभग <strong>{example.inputKw} kW</strong> खींचता है और लगभग{' '}
          <strong>{example.dailyUnits} यूनिट/दिन</strong> ({example.monthlyUnits}{' '}
          यूनिट/महीना) इस्तेमाल करता है।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने AC का पावर ड्रॉ निकालें
        </h2>
        <AcPowerConsumptionCalculator texts={acPowerTextsHi} />
      </section>

      <section aria-labelledby="reading-nameplate" className="mb-10">
        <h2 id="reading-nameplate" className="font-display mb-4 text-2xl font-semibold">
          अपने AC का नेमप्लेट पढ़ना
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            स्प्लिट AC के लिए नेमप्लेट आउटडोर (कंप्रेसर) यूनिट पर एक मेटल या
            स्टिकर लेबल है, या विंडो AC के लिए साइड पैनल पर। <strong>Rated
            Current</strong> या <strong>Input Current</strong> लेबल वाला
            फील्ड ढूंढें, Amps (A) में दिया गया — यही वह नंबर है जो इस
            कैलकुलेटर को चाहिए।
          </p>
          <p>
            यह तरीका <strong>पुराने या दोबारा बिके यूनिट</strong> के लिए खासतौर
            पर उपयोगी है: ISEER लेबलिंग हाल के सालों में ही अनिवार्य हुई है,
            इसलिए पहले के AC में शायद कोई काम की स्टार रेटिंग हो ही न, जबकि
            उसकी रेटेड करंट अब भी पढ़ी जा सकती है — या लेबल घिस गया हो तो
            क्लैंप मीटर से सीधे मापी जा सकती है।
          </p>
        </div>
      </section>

      <section
        aria-labelledby="safety-note"
        className="mb-10 rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5"
      >
        <h2
          id="safety-note"
          className="font-display mb-2 text-lg font-semibold text-caution-amber"
        >
          ⚠ इलेक्ट्रिकल सुरक्षा पर एक नोट
        </h2>
        <p className="text-sm text-ash/80">
          दिखने वाला नेमप्लेट पढ़ना किसी के लिए भी सुरक्षित है। एनक्लोज़र के
          अंदर क्लैंप मीटर से करंट मापना, या सीधे AC वायरिंग जांचना, सिर्फ
          लाइसेंसशुदा इलेक्ट्रीशियन द्वारा ही किया जाना चाहिए। एक बार रेटेड
          करंट आंकड़ा मिल जाए, तो हमारा{' '}
          <Link href="/hi/ac/circuit-safety-calculator" className="underline hover:text-caution-amber">
            सर्किट सेफ्टी कैलकुलेटर
          </Link>{' '}
          उसी नंबर से सर्किट को चाहिए MCB और वायर गेज जांचता है।
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
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
              इन यूनिट्स को अपने DISCOM के लिए ₹ आंकड़े में बदलें।
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
              वही रेटेड करंट, MCB और वायर साइज़िंग के लिए।
            </p>
          </Link>
          <Link
            href="/hi/ac/comparison-tool"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚖️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              AC तुलना टूल
            </p>
            <p className="mt-1 text-xs text-ash/60">
              दो AC कॉन्फ़िगरेशन की आमने-सामने तुलना करें।
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
