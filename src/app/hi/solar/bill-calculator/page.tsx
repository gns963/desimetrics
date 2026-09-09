import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import { getTariff } from '@/lib/calc/electricity'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/bill-calculator'

const rows = CALCULATOR_PAGES.map((p) => {
  const tariff = getTariff(p.discomCode)
  return { slug: p.discomCode.toLowerCase(), discomCode: p.discomCode, state: tariff.state }
}).sort((a, b) => a.state.localeCompare(b.state))

export const metadata: Metadata = {
  title: 'राज्य के हिसाब से सोलर बिल कैलकुलेटर (भारत) 2026 | DesiMetrics',
  description:
    'हर भारतीय राज्य और केंद्र शासित प्रदेश के लिए रूफटॉप सोलर पेबैक और बचत का अनुमान लगाएं, हर DISCOM के असली टैरिफ और PM सूर्य घर सब्सिडी के साथ।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/solar/bill-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'सोलर', path: '/solar' },
  { name: 'बिल कैलकुलेटर', path: PATH },
])
const itemList = itemListLd(
  rows.map((r) => ({ name: `${r.state} Solar Bill Calculator`, path: `/hi/solar/bill-calculator/${r.slug}` })),
)

const faqs = [
  {
    q: 'सोलर पेबैक राज्य के हिसाब से अलग क्यों होता है?',
    a: 'पेबैक इस पर निर्भर करता है कि आपकी बचाई गई यूनिट्स की कीमत क्या है, जो आपके DISCOM के अपने टैरिफ से तय होती है — ज़्यादा बिजली दर वाले राज्यों में आम तौर पर उसी सिस्टम साइज़ के लिए तेज़ सोलर पेबैक मिलता है।',
  },
  {
    q: 'क्या PM सूर्य घर सब्सिडी हर राज्य में एक जैसी है?',
    a: 'केंद्रीय सब्सिडी फॉर्मूला (पहले 2 kW के लिए ₹30,000/kW, तीसरे kW के लिए ₹18,000, अधिकतम ₹78,000) पूरे देश में समान है। कुछ राज्य इसके ऊपर अतिरिक्त राज्य-स्तरीय सब्सिडी भी देते हैं, जो यहां शामिल नहीं है।',
  },
  {
    q: 'मेरा राज्य यहां सूचीबद्ध नहीं है — मैं क्या करूं?',
    a: 'सभी 36 भारतीय राज्य और केंद्र शासित प्रदेश शामिल हैं। अगर कोई खास राज्य छूटा लग रहा है, तो हमारा सामान्य सोलर ROI कैलकुलेटर इस्तेमाल करें और सीधे अपना DISCOM चुनें।',
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

export default function SolarBillCalculatorIndexPageHi() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'सोलर', href: '/hi/solar' },
          { label: 'बिल कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="राज्य के हिसाब से सोलर बिल कैलकुलेटर"
        subtitle="हर भारतीय राज्य और केंद्र शासित प्रदेश के लिए रूफटॉप सोलर पेबैक और बचत, हर DISCOM के असली टैरिफ पर आधारित।"
        stats={[
          { icon: '🗺️', big: `${rows.length}`, small: 'राज्य और UT', tone: 'hub' },
          { icon: '💸', big: '₹78,000', small: 'अधिकतम सब्सिडी', tone: 'hub' },
          { icon: '📊', big: 'असली टैरिफ', small: 'हर राज्य के हिसाब से', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="states" className="mb-10">
        <h2 id="states" className="font-display mb-4 text-2xl font-semibold">
          सभी राज्य
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {rows.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/hi/solar/bill-calculator/${r.slug}`}
                className="block rounded-xl border border-hub-solar/20 bg-hub-solar/5 p-4 transition hover:border-hub-solar/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {r.state}
                </span>
                <span className="mt-1 block text-xs text-hub-solar">
                  {r.discomCode} · खोलें →
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
