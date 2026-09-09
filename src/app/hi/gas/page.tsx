import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import GasBillCalculator, { type GasBillCalculatorTexts } from '@/components/calculators/GasBillCalculator'
import { FlameIcon } from '@/components/HubMotifIcon'
import SplitHero from '@/components/SplitHero'
import { GAS_COMPANIES } from '@/data/gas-companies'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/gas'

export const metadata: Metadata = {
  title: 'गैस बिल कैलकुलेटर (PNG, भारत) 2026 | DesiMetrics',
  description:
    'अपने इस्तेमाल और प्रोवाइडर की दर से अपना पाइप्ड नेचुरल गैस (PNG) बिल निकालें — हर बड़ी भारतीय सिटी गैस कंपनी को कवर करने वाला ईमानदार कैलकुलेटर।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/gas'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'गैस', path: PATH },
])
const itemList = itemListLd(
  GAS_COMPANIES.map((c) => ({ name: `${c.name} Gas Bill Calculator`, path: `/hi/gas/${c.slug}` })),
)
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Gas Bill Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}

const faqs = [
  {
    q: 'DesiMetrics मेरे सटीक गैस प्रोवाइडर का टैरिफ क्यों नहीं दिखाता?',
    a: 'सिटी गैस डिस्ट्रीब्यूशन (PNG) टैरिफ हर प्रोवाइडर स्वतंत्र रूप से तय करता है और समय-समय पर बदलता है — ये ऐसे रूप में केंद्रीय रूप से प्रकाशित नहीं होते जिसे हम सत्यापित करके अपडेट रख सकें। अंदाज़ा लगाने की बजाय, हम आपके बिल से आपकी अपनी दर मांगते हैं — वही ईमानदार तरीका जो हम जनरेटर फ्यूल और नेट-मीटरिंग दरों के लिए इस्तेमाल करते हैं।',
  },
  {
    q: 'SCM क्या है?',
    a: 'स्टैंडर्ड क्यूबिक मीटर — भारत में पाइप्ड नेचुरल गैस (PNG) के लिए मानक बिलिंग इकाई, जो सभी सिटी गैस डिस्ट्रीब्यूशन कंपनियां इस्तेमाल करती हैं।',
  },
  {
    q: 'अगर मैं पाइप्ड गैस नहीं, LPG सिलेंडर इस्तेमाल करता हूं तो?',
    a: 'इसके बजाय हमारा LPG सिलेंडर इस्तेमाल कैलकुलेटर इस्तेमाल करें, जो अंदाज़ा लगाता है कि एक सिलेंडर कितने दिन चलता है और इसकी रोज़ की लागत क्या है।',
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

const gasBillTextsHi: GasBillCalculatorTexts = {
  title: 'गैस बिल कैलकुलेटर',
  subtitle: 'आपके अपने PNG इस्तेमाल और प्रोवाइडर की दर से',
  consumptionLabel: 'मासिक इस्तेमाल',
  consumptionUnit: 'SCM',
  consumptionHint: 'SCM = स्टैंडर्ड क्यूबिक मीटर, सामान्य PNG बिलिंग इकाई। अपना मीटर या पिछला बिल जांचें।',
  rateLabel: 'आपके प्रोवाइडर की दर',
  rateUnit: '₹/SCM',
  rateHint: 'अपने पिछले बिल या गैस कंपनी के प्रकाशित टैरिफ से — यह प्रोवाइडर और शहर के हिसाब से अलग होता है।',
  fixedLabel: 'फिक्स्ड / मीटर चार्ज',
  fixedUnit: '₹/महीना',
  ctaLabel: 'गैस बिल निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  estimatedBillLabel: 'अनुमानित बिल',
  volumetricLabel: 'वॉल्यूमेट्रिक चार्ज',
  fixedChargeLabel: 'फिक्स्ड चार्ज',
}

export default function GasHubPageHi() {
  return (
    <>
      <SplitHero
        hub="gas"
        breadcrumb={[{ label: 'गैस', href: '/hi/gas' }]}
        badgeLabel={`${GAS_COMPANIES.length} प्रोवाइडर · आपकी असली दर`}
        h1="गैस बिल कैलकुलेटर"
        subtitle="अपने पाइप्ड नेचुरल गैस (PNG) इस्तेमाल और प्रोवाइडर की दर से अपना बिल निकालें। गैस टैरिफ प्रोवाइडर के हिसाब से इतने अलग होते हैं कि हम अंदाज़ा नहीं लगा सकते — इसलिए यह कैलकुलेटर ईमानदारी से आपके असली आंकड़े इस्तेमाल करता है।"
        primaryCta={{ label: 'मेरा गैस बिल निकालें', href: '#calculator', emoji: '🔥' }}
        secondaryCta={{ label: 'प्रोवाइडर के हिसाब से देखें →', href: '#providers' }}
        statChips={[
          { icon: '🔥', big: 'SCM', small: 'इस्तेमाल की इकाई', tone: 'hub' },
          { icon: '✍️', big: 'आपकी दर', small: 'ईमानदार इनपुट', tone: 'hub' },
          { icon: '🏢', big: `${GAS_COMPANIES.length}`, small: 'प्रोवाइडर सूचीबद्ध', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-hub-gas">
              <FlameIcon className="h-6 w-6" />
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                हम आपकी दर क्यों मांगते हैं
              </p>
            </div>
            <p className="mt-3 text-sm text-white/80">
              सिटी गैस डिस्ट्रीब्यूशन (PNG) टैरिफ हर प्रोवाइडर स्वतंत्र रूप से
              तय करता है और समय-समय पर बदलता है — ये ऐसे रूप में केंद्रीय
              रूप से प्रकाशित नहीं होते जिसे हम सत्यापित करके अपडेट रख सकें।
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
          अपना गैस बिल निकालें
        </h2>
        <GasBillCalculator texts={gasBillTextsHi} />
      </section>

      <section id="providers" aria-labelledby="providers" className="mb-10 scroll-mt-20">
        <h2 id="providers" className="font-display mb-4 text-2xl font-semibold">
          प्रोवाइडर के हिसाब से देखें
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {GAS_COMPANIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/hi/gas/${c.slug}`}
                className="block rounded-xl border border-hub-gas/20 bg-hub-gas/5 p-4 transition hover:border-hub-gas/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {c.name}
                </span>
                <span className="mt-1 block text-xs text-hub-gas">
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

      <CrossHubLinks current="gas" />

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
