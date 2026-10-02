import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import PageHero from '@/components/PageHero'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/tools'

export const metadata: Metadata = {
  title: 'नंबर और कन्वर्ज़न टूल्स — हेक्स कैलकुलेटर (DesiMetrics)',
  description:
    'मुफ्त, सटीक नंबर-कन्वर्ज़न टूल्स: हेक्साडेसिमल अंकगणित और बेस कन्वर्ज़न — और टूल्स जल्द आ रहे हैं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const cards = [
  {
    href: '/hi/tools/hex-calculator',
    emoji: '🔢',
    title: 'हेक्साडेसिमल कैलकुलेटर',
    body: 'दो हेक्स नंबर जोड़ें, घटाएं, गुणा या भाग करें — किसी भी साइज़ के लिए बिल्कुल सटीक।',
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'टूल्स', path: PATH },
])
const itemList = itemListLd(cards.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'क्या ये टूल्स भारत-विशिष्ट हैं?',
    a: 'नहीं — हमारे यूटिलिटी बिल और फाइनेंस कैलकुलेटर के उलट, जो असली भारतीय DISCOM टैरिफ और टैक्स नियमों पर आधारित हैं, ये सामान्य-उद्देश्य वाले नंबर टूल्स हैं: दुनिया में कहीं भी अंकगणित एक जैसा ही रहता है।',
  },
  {
    q: 'क्या आप मेरे डाले नंबर सेव करते हैं?',
    a: 'नहीं — हर गणना आपके ब्राउज़र में ही होती है। यहां जो भी आप टाइप करते हैं, वह हमारे सर्वर पर कभी नहीं भेजा या सेव नहीं किया जाता।',
  },
  {
    q: 'क्या और कन्वर्ज़न टूल्स जुड़ेंगे?',
    a: 'हां — यह हब हेक्साडेसिमल कैलकुलेटर से शुरू होता है और समय के साथ अन्य सटीक नंबर व बेस कन्वर्ज़न टूल्स में बढ़ने के लिए बना है।',
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

export default function ToolsHubPageHi() {
  return (
    <>
      <PageHero
        hub="tools"
        breadcrumb={[{ label: 'टूल्स', href: PATH }]}
        badgeLabel={
          <>
            <span aria-hidden>🔢</span> टूल्स हब
          </>
        }
        h1="नंबर और कन्वर्ज़न टूल्स"
        subtitle="सटीक नंबर-बेस अंकगणित और कन्वर्ज़न — कोई राउंडिंग नहीं, कोई अंदाज़ा नहीं, दुनिया में कहीं भी एक जैसा काम करता है।"
        stats={[
          { icon: '🔢', big: '1', small: 'कैलकुलेटर', tone: 'hub' },
          { icon: '🎯', big: 'सटीक', small: 'BigInt प्रिसिज़न', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'कोई लॉगिन नहीं', tone: 'hub' },
          { icon: '🌍', big: 'यूनिवर्सल', small: 'भारत-विशिष्ट नहीं', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section className="mb-10 grid gap-6 grid-cols-1 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col rounded-2xl border border-hub-tools/20 bg-hub-tools/5 p-6 transition hover:border-hub-tools/50 hover:shadow-sm"
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className="mt-3 text-sm font-semibold text-hub-tools">
              कैलकुलेटर खोलें →
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="why" className="mb-10">
        <h2 id="why" className="font-display mb-4 text-2xl font-semibold">
          यह हब DesiMetrics के बाकी हिस्से से अलग क्यों है
        </h2>
        <p className="text-ash/80">
          इस साइट पर हर दूसरा कैलकुलेटर एक असली, तारीख वाली, स्रोत-सत्यापित
          भारतीय टैरिफ या टैक्स नियम से आता है — साइट का पूरा मकसद ही
          राष्ट्रीय औसत आंकड़ों की जगह आपके राज्य या DISCOM के असली आंकड़े
          देना है। नंबर-बेस अंकगणित में ऐसा कोई स्थानीय बदलाव नहीं होता —
          हेक्साडेसिमल जोड़ मुंबई में भी वही आता है जो कहीं और। इसी वजह से ये
          टूल्स शामिल किए गए हैं — सच में काम के, सटीक हिसाब जिन्हें किसी
          टैरिफ फाइल की ज़रूरत नहीं।
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

      <CrossHubLinks current="tools" />

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
