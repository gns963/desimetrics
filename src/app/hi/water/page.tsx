import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import WaterBillCalculator, { type WaterBillCalculatorTexts } from '@/components/calculators/WaterBillCalculator'
import { DropletIcon } from '@/components/HubMotifIcon'
import SplitHero from '@/components/SplitHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { getTariff } from '@/lib/calc/electricity'
import { slugify } from '@/lib/format'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/water'

const states = CALCULATOR_PAGES.map((p) => getTariff(p.discomCode).state)
  .filter((state, i, arr) => arr.indexOf(state) === i)
  .sort((a, b) => a.localeCompare(b))
  .map((state) => ({ state, slug: slugify(state) }))

export const metadata: Metadata = {
  title: 'पानी का बिल कैलकुलेटर (भारत) 2026 | DesiMetrics',
  description:
    'अपने पानी के इस्तेमाल और बोर्ड की दर से अपना नगरपालिका पानी का बिल निकालें — ईमानदार कैलकुलेटर, कोई अंदाज़ी टैरिफ नहीं, हर भारतीय राज्य के लिए।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/water'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'पानी', path: PATH },
])
const itemList = itemListLd(states.map((s) => ({ name: `${s.state} Water Bill Calculator`, path: `/hi/water/${s.slug}` })))
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Water Bill Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}

const faqs = [
  {
    q: 'DesiMetrics मेरे सटीक पानी बोर्ड का टैरिफ क्यों नहीं दिखाता?',
    a: 'बिजली DISCOM के उलट, भारत के नगरपालिका पानी टैरिफ ऐसे रूप में केंद्रीय रूप से प्रकाशित नहीं होते जिसे हम सत्यापित करके अपडेट रख सकें — बिलिंग का आधार शहर के हिसाब से अलग होता है (फ्लैट रेट, मीटर्ड, या प्रॉपर्टी टैक्स से जुड़ा)। अंदाज़ा लगाने की बजाय, हम आपके बिल से आपकी अपनी दर मांगते हैं — वही ईमानदार तरीका जो हम जनरेटर फ्यूल और नेट-मीटरिंग दरों के लिए इस्तेमाल करते हैं।',
  },
  {
    q: 'KL क्या है?',
    a: 'एक किलोलीटर (KL) = 1,000 लीटर, भारत में मीटर्ड पानी सप्लाई के लिए मानक बिलिंग इकाई।',
  },
  {
    q: 'क्या यह वाटर टैंक फिलिंग टाइम कैलकुलेटर से अलग है?',
    a: 'हां — वह टूल पंप की फ्लो रेट से यह अनुमान लगाता है कि टैंक भरने में कितना समय लगता है। यह इस्तेमाल और आपके बोर्ड की दर से आपके मासिक पानी बिल के खर्च का अनुमान लगाता है।',
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

const waterBillTextsHi: WaterBillCalculatorTexts = {
  title: 'पानी का बिल कैलकुलेटर',
  subtitle: 'आपके अपने इस्तेमाल और बोर्ड की दर से',
  consumptionLabel: 'मासिक इस्तेमाल',
  consumptionUnit: 'KL',
  consumptionHint: '1 KL = 1,000 लीटर। अपना मीटर रीडिंग या पिछला बिल जांचें।',
  rateLabel: 'आपके बोर्ड की दर',
  rateUnit: '₹/KL',
  rateHint: 'अपने पिछले बिल या पानी बोर्ड के प्रकाशित टैरिफ से — यह शहर और कनेक्शन प्रकार के हिसाब से अलग होता है।',
  fixedLabel: 'फिक्स्ड / मीटर चार्ज',
  fixedUnit: '₹/महीना',
  ctaLabel: 'पानी का बिल निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  estimatedBillLabel: 'अनुमानित बिल',
  volumetricLabel: 'वॉल्यूमेट्रिक चार्ज',
  fixedChargeLabel: 'फिक्स्ड चार्ज',
}

export default function WaterHubPageHi() {
  return (
    <>
      <SplitHero
        hub="water"
        breadcrumb={[{ label: 'पानी', href: '/hi/water' }]}
        badgeLabel={`${states.length} राज्य · आपकी असली दर`}
        h1="पानी का बिल कैलकुलेटर"
        subtitle="अपने पानी के इस्तेमाल और अपने बोर्ड की दर से अपना नगरपालिका पानी का बिल निकालें। पानी टैरिफ शहर के हिसाब से इतने अलग होते हैं कि हम अंदाज़ा नहीं लगा सकते — इसलिए यह कैलकुलेटर ईमानदारी से आपके असली आंकड़े इस्तेमाल करता है।"
        primaryCta={{ label: 'मेरा पानी का बिल निकालें', href: '#calculator', emoji: '💧' }}
        secondaryCta={{ label: 'राज्य के हिसाब से देखें →', href: '#states' }}
        statChips={[
          { icon: '💧', big: 'KL', small: 'इस्तेमाल की इकाई', tone: 'hub' },
          { icon: '✍️', big: 'आपकी दर', small: 'ईमानदार इनपुट', tone: 'hub' },
          { icon: '🗺️', big: `${states.length}`, small: 'राज्य शामिल', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-hub-water">
              <DropletIcon className="h-6 w-6" />
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                हम आपकी दर क्यों मांगते हैं
              </p>
            </div>
            <p className="mt-3 text-sm text-white/80">
              बिजली DISCOM के उलट, भारत के नगरपालिका पानी टैरिफ ऐसे रूप में
              केंद्रीय रूप से प्रकाशित नहीं होते जिसे हम सत्यापित करके अपडेट
              रख सकें — बिलिंग का आधार शहर के हिसाब से अलग होता है (फ्लैट
              रेट, मीटर्ड, या प्रॉपर्टी टैक्स से जुड़ा)।
            </p>
            <p className="mt-2 text-sm text-white/70">
              एक नंबर का अंदाज़ा लगाकर उसे &ldquo;सत्यापित&rdquo; कहने की
              बजाय, हम आपके बिल से आपकी अपनी दर मांगते हैं — वही ईमानदार
              तरीका जो हम जनरेटर फ्यूल और नेट-मीटरिंग दरों के लिए इस्तेमाल
              करते हैं।
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना पानी का बिल निकालें
        </h2>
        <WaterBillCalculator texts={waterBillTextsHi} />
      </section>

      <section id="states" aria-labelledby="states" className="mb-10 scroll-mt-20">
        <h2 id="states" className="font-display mb-4 text-2xl font-semibold">
          राज्य के हिसाब से देखें
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {states.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/hi/water/${s.slug}`}
                className="block rounded-xl border border-hub-water/20 bg-hub-water/5 p-4 transition hover:border-hub-water/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {s.state}
                </span>
                <span className="mt-1 block text-xs text-hub-water">
                  खोलें →
                </span>
              </Link>
            </li>
          ))}
        </ul>
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

      <CrossHubLinks current="water" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      </main>
    </>
  )
}
