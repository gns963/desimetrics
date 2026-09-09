import type { Metadata } from 'next'
import Link from 'next/link'
import LpgUsageCalculator, { type LpgUsageCalculatorTexts } from '@/components/calculators/LpgUsageCalculator'
import PageHero from '@/components/PageHero'
import { estimateLpgUsage } from '@/lib/calc/fuel'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/fuel-cost/lpg-cylinder-usage-calculator'

const example = estimateLpgUsage({ cylinderKg: 14.2, cylinderPrice: 900, dailyBurnerHours: 1.5 })

export const metadata: Metadata = {
  title: 'LPG सिलेंडर इस्तेमाल कैलकुलेटर 2026 — यह कितनी देर चलता है',
  description:
    'अपने रोज़ के खाना पकाने (बर्नर) के घंटों से अंदाज़ा लगाएं आपका LPG सिलेंडर कितने दिन चलेगा, और उसके बराबर रोज़ का व मासिक खर्च क्या है।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/fuel-cost/lpg-cylinder-usage-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LPG Cylinder Usage Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फ्यूल कॉस्ट', path: '/fuel-cost' },
  { name: 'LPG सिलेंडर इस्तेमाल कैलकुलेटर', path: PATH },
])

const lpgTextsHi: LpgUsageCalculatorTexts = {
  title: 'LPG सिलेंडर इस्तेमाल कैलकुलेटर',
  subtitle: 'आपका सिलेंडर कितनी देर चलेगा',
  cylinderLegend: 'सिलेंडर का साइज़',
  cylinderOptions: [
    { value: '5', label: '5 kg', icon: '🫙' },
    { value: '14.2', label: '14.2 kg', icon: '🛢️' },
    { value: '19', label: '19 kg', icon: '🛢️' },
  ],
  priceLabel: 'सिलेंडर की कीमत',
  priceUnit: '₹',
  priceHint: 'अपनी नवीनतम रीफिल रसीद जांचें — कीमत राज्य और कंपनी के हिसाब से अलग होती है।',
  hoursLabel: 'रोज़ के बर्नर-घंटे',
  hoursUnit: 'घंटे/दिन',
  hoursHint: 'दिन में आप जितने बर्नर इस्तेमाल करते हैं, उनका कुल सक्रिय फ्लेम समय।',
  ctaLabel: 'LPG इस्तेमाल निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  daysRemainingLabel: 'अनुमानित बचे दिन',
  daysUnit: 'दिन',
  costSummaryTemplate: '≈ {daily}/दिन · {monthly}/महीना समतुल्य',
}

const faqs = [
  {
    q: '"बर्नर-घंटा" क्या है और मैं अपना कैसे अनुमान लगाऊं?',
    a: 'यह एक दिन में आप जितने बर्नर इस्तेमाल करते हैं उन सबका कुल सक्रिय फ्लेम समय है। अगर आप एक बर्नर पर 45 मिनट और दूसरे पर 45 मिनट पकाते हैं, तो यह 1.5 बर्नर-घंटे है — 45 मिनट नहीं, भले ही यह "एक वक्त का खाना" जैसा लगे।',
  },
  {
    q: 'कैलकुलेटर प्रति बर्नर 0.25 kg/घंटा क्यों मानता है?',
    a: 'यह एक मध्यम-से-पूरी घरेलू LPG फ्लेम के लिए आम तौर पर बताई जाने वाली खपत दर है। यह एक मान्यता है, आपके खास चूल्हे का माप नहीं — बर्नर डिज़ाइन, फ्लेम सेटिंग और बर्तन का साइज़ सब असली खपत को कुछ हद तक प्रभावित करते हैं।',
  },
  {
    q: 'क्या 14.2 kg सिलेंडर असल में दिखाए गए दिनों की संख्या देता है?',
    a: 'यह बताई गई बर्नर-घंटे मान्यता पर आधारित एक योजना अनुमान है। असल परिणाम अलग होते हैं — उपयोगी तुलना सापेक्ष है: जैसे, अपने रोज़ के बर्नर-घंटे एक-तिहाई कम करने से सिलेंडर की उम्र भी लगभग एक-तिहाई बढ़नी चाहिए।',
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

export default function LpgUsagePageHi() {
  return (
    <>
      <PageHero
        hub="fuel"
        breadcrumb={[
          { label: 'फ्यूल कॉस्ट', href: '/hi/fuel-cost' },
          { label: 'LPG सिलेंडर इस्तेमाल कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⛽</span> Fuel Cost hub
          </>
        }
        h1="LPG सिलेंडर इस्तेमाल कैलकुलेटर"
        subtitle="अपने रोज़ के खाना पकाने के घंटों से अंदाज़ा लगाएं आपका LPG सिलेंडर कितने दिन चलेगा, और यह रोज़ और महीने में क्या बैठता है।"
        stats={[
          { icon: '🔥', big: '5/14.2/19 kg', small: 'सिलेंडर साइज़', tone: 'hub' },
          { icon: '🔥', big: '0.25 kg/hr', small: 'मान्य बर्नर दर', tone: 'hub' },
          { icon: '📆', big: 'दिन', small: 'नतीजे की इकाई', tone: 'hub' },
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
          रोज़ <strong>1.5 बर्नर-घंटे</strong> पर एक{' '}
          <strong>14.2 kg सिलेंडर</strong> लगभग{' '}
          <strong>{example.daysRemaining} दिन</strong> चलता है — लगभग{' '}
          {formatINR(example.monthlyCost)}/महीना समतुल्य।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने सिलेंडर की उम्र निकालें
        </h2>
        <LpgUsageCalculator texts={lpgTextsHi} />
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/hi/gas/igl"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              PNG बनाम LPG तुलना
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पाइप्ड गैस कनेक्शन है? LPG से असली खर्च की तुलना करें।
            </p>
          </Link>
          <Link
            href="/hi/appliances/fridge-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>❄️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              फ्रिज कॉस्ट कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              एक और रोज़मर्रा का रसोई रनिंग-कॉस्ट टूल।
            </p>
          </Link>
          <Link
            href="/hi/fuel-cost/petrol-diesel-cost-per-km-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🚗</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              पेट्रोल/डीज़ल प्रति km खर्च
            </p>
            <p className="mt-1 text-xs text-ash/60">
              आपकी गाड़ी की असली रनिंग कॉस्ट।
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
