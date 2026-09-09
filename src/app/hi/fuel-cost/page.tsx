import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import { FuelGaugeIcon } from '@/components/HubMotifIcon'
import PageHero from '@/components/PageHero'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/fuel-cost'

export const metadata: Metadata = {
  title: 'फ्यूल कॉस्ट कैलकुलेटर — गाड़ी, LPG और जनरेटर (भारत)',
  description:
    'भारत के लिए मुफ्त फ्यूल कॉस्ट कैलकुलेटर: पेट्रोल/डीज़ल प्रति km खर्च, LPG सिलेंडर इस्तेमाल और जनरेटर रनिंग कॉस्ट — सभी असली कीमतों और असली उपकरण आंकड़ों से।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/fuel-cost'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const cards = [
  {
    href: '/hi/fuel-cost/petrol-diesel-cost-per-km-calculator',
    emoji: '🚗',
    title: 'पेट्रोल/डीज़ल प्रति KM खर्च',
    body: 'फ्यूल कीमत और माइलेज से आपकी गाड़ी की असली रनिंग कॉस्ट।',
  },
  {
    href: '/hi/fuel-cost/lpg-cylinder-usage-calculator',
    emoji: '🔥',
    title: 'LPG सिलेंडर इस्तेमाल',
    body: 'आपका सिलेंडर कितने दिन चलता है, और रोज़ का/मासिक खर्च।',
  },
  {
    href: '/hi/fuel-cost/generator-fuel-consumption-calculator',
    emoji: '🛠️',
    title: 'जनरेटर फ्यूल कंजम्पशन',
    body: 'आपके जेनसेट की अपनी रेटेड खपत से, एक बिजली कटौती का खर्च क्या है।',
  },
  {
    href: '/hi/electricity/ev-charging-cost-calculator',
    emoji: '🔌',
    title: 'EV चार्जिंग कॉस्ट',
    body: 'आपके असली DISCOM टैरिफ पर आधारित, साथ ही एक लाइव EV बनाम पेट्रोल/डीज़ल/CNG तुलना।',
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फ्यूल कॉस्ट', path: PATH },
])
const itemList = itemListLd(cards.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'क्या ये कैलकुलेटर लाइव फ्यूल कीमतें इस्तेमाल करते हैं?',
    a: 'नहीं — फ्यूल कीमतें रोज़ बदलती हैं और राज्य और शहर के हिसाब से अलग होती हैं, इसलिए सटीक नतीजे के लिए आप खुद आज की स्थानीय कीमत डालते हैं, बजाय इसके कि हम कोई पुराना या औसत आंकड़ा दिखाएं।',
  },
  {
    q: 'जनरेटर कैलकुलेटर मुझसे मेरे जेनसेट की अपनी खपत दर क्यों मांगता है?',
    a: 'फ्यूल खपत मॉडल, लोड और इंजन डिज़ाइन के हिसाब से इतनी अलग होती है कि एक सामान्य अनुमान भरोसेमंद नहीं हो सकता — आपके यूनिट के अपने स्पेक-शीट आंकड़े का इस्तेमाल कहीं ज़्यादा सटीक नतीजा देता है।',
  },
  {
    q: 'क्या यह बिजली बिल कैलकुलेटर जैसा ही है?',
    a: 'नहीं — ये टूल ग्रिड बिजली की बजाय आप सीधे जो फ्यूल खरीदते हैं (पेट्रोल, डीज़ल, LPG) उसे कवर करते हैं। अपने DISCOM बिजली बिल के लिए, हमारे बिजली कैलकुलेटर देखें।',
  },
  {
    q: 'फ्यूल कीमतें शहर के हिसाब से इतनी अलग क्यों होती हैं?',
    a: 'पंप कीमत बेस फ्यूल लागत प्लस केंद्रीय एक्साइज़ ड्यूटी, डीलर कमीशन, और राज्य VAT है — और राज्य VAT दरें काफी अलग होती हैं, यही शहर-दर-शहर बदलाव की मुख्य वजह है। कीमतें रोज़ PPAC/पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय की पद्धति के अनुसार संशोधित होती हैं।',
  },
  {
    q: 'क्या EV, पेट्रोल या डीज़ल कार से चलाने में सस्ती है?',
    a: 'लगभग हमेशा हां, ₹/km आधार पर, क्योंकि इसकी कीमत फ्यूल कीमत की बजाय आपके असली DISCOM टैरिफ पर तय होती है — अपने आंकड़ों से असली EV बनाम पेट्रोल बनाम डीज़ल बनाम CNG तुलना के लिए हमारा EV चार्जिंग कॉस्ट कैलकुलेटर देखें।',
  },
  {
    q: 'क्या जनरेटर ग्रिड बिजली से चलाने में ज़्यादा महंगा है?',
    a: 'हां, काफी हद तक — एक डीज़ल जनरेटर की लागत आम तौर पर ₹18-35 प्रति यूनिट के दायरे में होती है, जबकि ज़्यादातर राज्यों में ग्रिड बिजली की लगभग ₹5-10 प्रति यूनिट। सीधी प्रति-यूनिट लागत तुलना के लिए जनरेटर कैलकुलेटर देखें।',
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

export default function FuelCostHubPageHi() {
  return (
    <>
      <PageHero
        hub="fuel"
        breadcrumb={[{ label: 'फ्यूल कॉस्ट', href: '/hi/fuel-cost' }]}
        badgeLabel={
          <>
            <span aria-hidden>⛽</span> Fuel cost hub
          </>
        }
        h1={
          <span className="flex items-center gap-2">
            <FuelGaugeIcon className="h-7 w-7 text-hub-fuel" />
            फ्यूल कॉस्ट कैलकुलेटर
          </span>
        }
        subtitle="रोज़मर्रा के फ्यूल जो आप सीधे खरीदते हैं — गाड़ी का पेट्रोल/डीज़ल, LPG सिलेंडर और जनरेटर डीज़ल — असली इनपुट से तय, औसत राष्ट्रीय आंकड़ों से नहीं।"
        stats={[
          { icon: '⛽', big: '4', small: 'कैलकुलेटर', tone: 'hub' },
          { icon: '💰', big: 'असली कीमतें', small: 'आप आज की दर डालते हैं', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
          { icon: '🇮🇳', big: 'भारत', small: 'कवरेज', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section className="mb-10 grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col rounded-2xl border border-hub-fuel/20 bg-hub-fuel/5 p-6 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className="mt-3 text-sm font-semibold text-hub-fuel">
              कैलकुलेटर खोलें →
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="why" className="mb-10">
        <h2 id="why" className="font-display mb-4 text-2xl font-semibold">
          असली इनपुट, राष्ट्रीय औसत नहीं
        </h2>
        <p className="text-ash/80">
          फ्यूल कीमतें राज्य, शहर और दिन के हिसाब से बदलती हैं, और आपकी गाड़ी
          या जनरेटर की असली खपत खास यूनिट पर निर्भर करती है। एक औसत आंकड़ा
          दिखाने की बजाय जो आपकी असली स्थिति से काफी दूर हो सकता है, ये
          कैलकुलेटर आपकी अपनी कीमत और उपकरण के नंबर मांगते हैं — वही सिद्धांत
          जो हमारे बिजली कैलकुलेटर में राष्ट्रीय औसत की बजाय आपके असली DISCOM
          टैरिफ का इस्तेमाल करने के पीछे है।
        </p>
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

      <CrossHubLinks current="fuel-cost" />

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
    </main>
    </>
  )
}
