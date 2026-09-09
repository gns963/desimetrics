import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { getTariff } from '@/lib/calc/electricity'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/electricity/unit-price'

const rows = CALCULATOR_PAGES.map((p) => {
  const tariff = getTariff(p.discomCode)
  return {
    slug: p.discomCode.toLowerCase(),
    discomCode: p.discomCode,
    state: tariff.state,
    rate: marginalRatePerUnit(p.discomCode),
  }
}).sort((a, b) => a.state.localeCompare(b.state))

export const metadata: Metadata = {
  title: 'राज्य के हिसाब से 1 यूनिट बिजली की कीमत (भारत) 2026 | DesiMetrics',
  description:
    'हर भारतीय राज्य और केंद्र शासित प्रदेश में 1 यूनिट बिजली की कीमत कितनी है — असली, स्रोत-सत्यापित DISCOM टैरिफ, फ्यूल कॉस्ट एडजस्टमेंट और शुल्क सहित।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/electricity/unit-price'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'बिजली', path: '/electricity' },
  { name: '1 यूनिट की कीमत', path: PATH },
])
const itemList = itemListLd(
  rows.map((r) => ({ name: `${r.state} 1 Unit Price`, path: `/hi/electricity/unit-price/${r.slug}` })),
)

const faqs = [
  {
    q: '1 यूनिट की कीमत राज्यों के बीच इतनी अलग क्यों होती है?',
    a: 'हर राज्य का बिजली नियामक (SERC) स्थानीय DISCOM की सप्लाई लागत, क्रॉस-सब्सिडी नीति और जनरेशन मिश्रण के आधार पर अपना टैरिफ स्वतंत्र रूप से तय करता है — भारत में कोई एक राष्ट्रीय बिजली कीमत नहीं है।',
  },
  {
    q: 'क्या यह वही कीमत है जो मैं असल में प्रति यूनिट चुकाता हूं?',
    a: 'यह मार्जिनल (टॉप-स्लैब) दर है — एक बार जब आप सबसे ऊंचे स्लैब में पहुंच जाते हैं तो आपकी अगली यूनिट का खर्च। चूंकि भारतीय टैरिफ टेलिस्कोपिक होते हैं, आपके सभी इस्तेमाल की गई यूनिट्स का औसत खर्च आम तौर पर इस आंकड़े से कम होता है।',
  },
  {
    q: 'क्या इसमें टैक्स और सरचार्ज शामिल हैं?',
    a: 'हां — दिखाया गया आंकड़ा बेस स्लैब दर के ऊपर, जहां लागू हो, फ्यूल कॉस्ट एडजस्टमेंट (FCA) और बिजली शुल्क शामिल करता है, एक सटीक प्रति-यूनिट खर्च के लिए।',
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

export default function UnitPriceIndexPageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: 'बिजली', href: '/hi/electricity' },
          { label: '1 यूनिट की कीमत', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⚡</span> Electricity hub
          </>
        }
        h1="राज्य के हिसाब से 1 यूनिट बिजली की कीमत"
        subtitle="हर भारतीय राज्य और केंद्र शासित प्रदेश में एक बिजली यूनिट की मार्जिनल (टॉप-स्लैब) कीमत — असली, स्रोत-सत्यापित DISCOM टैरिफ, किसी राष्ट्रीय औसत का नहीं।"
        stats={[
          { icon: '🗺️', big: `${rows.length}`, small: 'राज्य और UT', tone: 'hub' },
          { icon: '📈', big: 'टॉप स्लैब', small: 'दर आधार', tone: 'hub' },
          { icon: '➕', big: 'FCA और शुल्क सहित', small: 'क्या शामिल है', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="rates" className="mb-10">
        <h2 id="rates" className="font-display mb-4 text-2xl font-semibold">
          सभी राज्य
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {rows.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/hi/electricity/unit-price/${r.slug}`}
                className="flex items-center justify-between rounded-xl border border-hairline bg-paper p-4 transition hover:border-hub-electricity/50 hover:shadow-sm"
              >
                <span>
                  <span className="font-semibold text-ink-navy">
                    {r.state}
                  </span>
                  <span className="mt-1 block text-xs text-ash/50">
                    {r.discomCode}
                  </span>
                </span>
                <span className="font-display text-lg font-bold tabular-nums text-hub-electricity">
                  ₹{r.rate.toFixed(2)}/यूनिट
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
