import type { Metadata } from 'next'
import Link from 'next/link'
import GeneratorFuelCalculator, {
  type GeneratorFuelCalculatorTexts,
} from '@/components/calculators/GeneratorFuelCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import PageHero from '@/components/PageHero'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { estimateGeneratorCost, estimateGeneratorCostPerUnit } from '@/lib/calc/fuel'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'
const PATH = '/fuel-cost/generator-fuel-consumption-calculator'

const example = estimateGeneratorCost({ consumptionRateLph: 2, fuelPricePerLitre: 95, hoursRun: 4 })
const genPerUnit = estimateGeneratorCostPerUnit({ fuelPricePerLitre: 95 })
const gridPerUnitTNEB = marginalRatePerUnit('TNEB')

export const metadata: Metadata = {
  title: 'जनरेटर फ्यूल कंजम्पशन कैलकुलेटर 2026 — डीज़ल रनिंग कॉस्ट',
  description:
    'अपने डीज़ल या पेट्रोल जनरेटर की अपनी रेटेड खपत (L/hr), फ्यूल कीमत और चलने के घंटों से इसका फ्यूल खर्च निकालें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/fuel-cost/generator-fuel-consumption-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Generator Fuel Consumption Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फ्यूल कॉस्ट', path: '/fuel-cost' },
  { name: 'जनरेटर फ्यूल कंजम्पशन कैलकुलेटर', path: PATH },
])

const generatorTextsHi: GeneratorFuelCalculatorTexts = {
  title: 'जनरेटर फ्यूल कंजम्पशन कैलकुलेटर',
  subtitle: 'आपके जेनसेट की अपनी रेटेड खपत से',
  rateLabel: 'फ्यूल खपत दर',
  rateUnit: 'L/hr',
  rateHint: 'अपने जनरेटर की स्पेक शीट या मैनुअल से, अपने सामान्य लोड पर।',
  priceLabel: 'फ्यूल कीमत',
  priceUnit: '₹/लीटर',
  hoursLabel: 'चलने के घंटे',
  hoursUnit: 'घंटे',
  ctaLabel: 'फ्यूल खर्च निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  totalCostLabel: 'कुल फ्यूल खर्च',
  summaryTemplate: '{litres} लीटर · {perHour}/घंटा',
}

const faqs = [
  {
    q: 'यह कैलकुलेटर मुझसे kVA से अनुमान लगाने की बजाय मेरे जनरेटर की अपनी खपत दर क्यों मांगता है?',
    a: 'प्रति घंटा फ्यूल खपत काफी हद तक लोड प्रतिशत, इंजन दक्षता और जनरेटर डिज़ाइन पर निर्भर करती है — एक ही kVA रेटिंग पर भी मॉडल के हिसाब से आंकड़े काफी अलग होते हैं। एक सामान्य गुणक से अंदाज़ा लगाने की बजाय, हम वह दर इस्तेमाल करते हैं जो आपके निर्माता ने आपके खास यूनिट के लिए पहले से मापी और प्रकाशित की है, जो कहीं ज़्यादा सटीक है।',
  },
  {
    q: 'मुझे अपने जनरेटर की फ्यूल खपत दर कहां मिलेगी?',
    a: 'जनरेटर के साथ आई स्पेक शीट या मैनुअल जांचें — निर्माता आम तौर पर 50%, 75% और 100% लोड पर लीटर/घंटा आंकड़े प्रकाशित करते हैं। आप असल में इसे जिस तरह चलाते हैं उसके सबसे करीबी आंकड़ा इस्तेमाल करें।',
  },
  {
    q: 'क्या लोड स्तर फ्यूल खपत को काफी बदलता है?',
    a: 'हां, काफी हद तक — 50% लोड पर चलने वाला जनरेटर 100% लोड की तुलना में आम तौर पर प्रति घंटा काफी कम फ्यूल जलाता है, हालांकि ठीक आधा नहीं, क्योंकि आउटपुट चाहे जो भी हो, इंजन को चालू रखने के लिए ही कुछ फ्यूल इस्तेमाल होता है। सबसे सटीक नतीजे के लिए अपनी स्पेक शीट से अपने असली इस्तेमाल के सबसे करीबी लोड-विशिष्ट आंकड़ा इस्तेमाल करें।',
  },
  {
    q: 'जनरेटर पावर ग्रिड बिजली से कितनी ज़्यादा महंगी है?',
    a: `काफी ज़्यादा — फ्यूल कीमत और जेनसेट दक्षता के हिसाब से एक डीज़ल जनरेटर आम तौर पर ₹18-35/यूनिट के दायरे में पड़ता है, जबकि ज़्यादातर राज्यों में ग्रिड पावर लगभग ₹5-10/यूनिट। उदाहरण के लिए तमिलनाडु में, TNEB की असली टॉप-स्लैब दर ${formatINR(gridPerUnitTNEB)}/यूनिट है — एक जनरेटर आसानी से प्रति यूनिट इसका 3-5 गुना खर्च कर सकता है।`,
  },
  {
    q: 'डीज़ल जनरेटर असल में कितने कुशल होते हैं?',
    a: 'एक नया, अच्छी तरह रखरखाव किया जनरेटर आम तौर पर डीज़ल को लगभग 85-90% दक्षता पर इस्तेमाल योग्य बिजली आउटपुट में बदलता है; पुराने यूनिट, या अपने रेटेड लोड से काफी कम पर चलने वाले, 70% या उससे कम तक गिर सकते हैं — यही एक वजह है कि असली-दुनिया की ₹/यूनिट लागत जेनसेट के हिसाब से इतनी अलग होती है।',
  },
  {
    q: 'क्या जनरेटर चलाना या इन्वर्टर/बैटरी बैकअप पर स्विच करना सस्ता है?',
    a: 'छोटी, कभी-कभार होने वाली कटौती के लिए, एक बैटरी-आधारित इन्वर्टर आम तौर पर प्रति कटौती सस्ता होता है क्योंकि यह जनरेटर-स्तर की प्रति-यूनिट लागत पर फ्यूल जलाने की बजाय सिर्फ आपकी सामान्य टैरिफ दर पर पहले से स्टोर की गई ग्रिड बिजली खींचता है। लंबी या बहुत बार होने वाली कटौती, या ऊंचे लगातार लोड के लिए, एक जनरेटर अभी भी सही बैठ सकता है — हमारे इन्वर्टर साइज़िंग और बैकअप टाइम कैलकुलेटर से तुलना करें।',
  },
  {
    q: 'क्या जनरेटर की उम्र रनिंग कॉस्ट को प्रभावित करती है?',
    a: 'हां — एक पुराने जनरेटर में इंजन का घिसाव और ढीले टॉलरेंस आम तौर पर फ्यूल दक्षता कम कर देते हैं, यानी नए होने के मुकाबले उसी बिजली आउटपुट के लिए ज़्यादा लीटर जलाना। अगर आपका जनरेटर कई साल पुराना है, तो इसकी असली खपत दर अब इसके मूल स्पेक-शीट आंकड़े से ज़्यादा हो सकती है।',
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

export default function GeneratorFuelPageHi() {
  return (
    <>
      <PageHero
        hub="fuel"
        breadcrumb={[
          { label: 'फ्यूल कॉस्ट', href: '/hi/fuel-cost' },
          { label: 'जनरेटर फ्यूल कंजम्पशन कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⛽</span> Fuel Cost hub
          </>
        }
        h1="जनरेटर फ्यूल कंजम्पशन कैलकुलेटर"
        subtitle={
          <>
            जानें आपका जनरेटर चलाने में असल में कितना खर्च आता है,{' '}
            <strong>आपके जेनसेट की अपनी रेटेड फ्यूल खपत</strong> इस्तेमाल
            करते हुए — इसकी kVA रेटिंग से किसी अंदाज़ी गुणक से नहीं।
          </>
        }
        stats={[
          { icon: '🛠️', big: 'L/hr', small: 'आपके जेनसेट की दर', tone: 'hub' },
          { icon: '⚡', big: 'कोई भी लोड', small: 'डीज़ल या पेट्रोल', tone: 'hub' },
          { icon: '💰', big: '₹/hr', small: 'खर्च ब्यौरा', tone: 'hub' },
          { icon: '🔓', big: 'तुरंत', small: 'बिना लॉगिन', tone: 'hub' },
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
          <strong>₹95/लीटर</strong> पर <strong>2 L/hr</strong> खपत करने
          वाला जनरेटर, 4-घंटे की बिजली कटौती में {example.litresUsed} लीटर
          के लिए लगभग <strong>{formatINR(example.totalCost)}</strong> खर्च
          करता है।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने जनरेटर का फ्यूल खर्च निकालें
        </h2>
        <GeneratorFuelCalculator texts={generatorTextsHi} />
      </section>

      <section aria-labelledby="vs-grid" className="mb-10">
        <h2 id="vs-grid" className="font-display mb-2 text-2xl font-semibold">
          ग्रिड पावर के मुकाबले प्रति यूनिट खर्च
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              डीज़ल जनरेटर, ₹95/L पर
            </p>
            <p className="font-display mt-1 text-2xl font-bold tabular-nums text-caution-amber">
              ≈ {formatINR(genPerUnit.costPerUnit)}/यूनिट
            </p>
            <p className="mt-1 text-sm text-ash/60">
              प्रति लीटर लगभग {genPerUnit.unitsPerLitre} यूनिट आउटपुट मानता है — एक सामान्य योजना आंकड़ा, स्पेक-शीट वैल्यू नहीं।
            </p>
          </div>
          <div className="rounded-xl border border-spark-teal/25 bg-spark-teal/5 p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              ग्रिड पावर (TNEB टॉप स्लैब)
            </p>
            <p className="font-display mt-1 text-2xl font-bold tabular-nums text-spark-teal">
              {formatINR(gridPerUnitTNEB)}/यूनिट
            </p>
            <p className="mt-1 text-sm text-ash/60">
              आपके अपने राज्य की दर अलग हो सकती है — हमारे बिजली कैलकुलेटर देखें।
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-ash/70">
          एक नया, अच्छी तरह रखरखाव किया जनरेटर आम तौर पर{' '}
          <strong>85-90% दक्षता</strong> पर चलता है; पुराने यूनिट, या अपने
          रेटेड लोड से काफी कम पर चलने वाले, <strong>70% या उससे कम</strong>{' '}
          तक गिर सकते हैं — जो असली ₹/यूनिट खर्च को और बढ़ा देता है।
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/appliances/inverter-sizing-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔌</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              इन्वर्टर साइज़िंग
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इसके बजाय बैटरी-आधारित बैकअप से तुलना करें।
            </p>
          </Link>
          <Link
            href="/hi/appliances/inverter-backup-time-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              इन्वर्टर बैकअप टाइम
            </p>
            <p className="mt-1 text-xs text-ash/60">
              जेनसेट की बजाय आपकी मौजूदा बैटरी कितनी देर चलती है।
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
              अपने राज्य के लिए अपना पूरा मासिक बिल देखें।
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
