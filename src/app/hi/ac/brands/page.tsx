import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { AC_BRANDS } from '@/data/ac-brands'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac/brands'

export const metadata: Metadata = {
  title: 'ब्रांड के हिसाब से AC बिल कैलकुलेटर — सभी प्रमुख AC ब्रांड (भारत)',
  description:
    'भारत में बिकने वाले हर बड़े ब्रांड के लिए अपना AC रनिंग कॉस्ट निकालें — Daikin, LG, Samsung, Voltas, Blue Star, Carrier और अन्य — उसी असली BEE ISEER-आधारित तरीके से।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac/brands'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: '/ac' },
  { name: 'ब्रांड', path: PATH },
])
const itemList = itemListLd(
  AC_BRANDS.map((b) => ({ name: `${b.name} AC Bill Calculator`, path: `/hi/ac/brands/${b.slug}` })),
)

const faqs = [
  {
    q: 'क्या AC ब्रांड वाकई रनिंग कॉस्ट को प्रभावित करता है?',
    a: 'सीधे तौर पर नहीं — Bureau of Energy Efficiency (BEE) भारत में बिकने वाले सभी ब्रांडों पर समान रूप से ISEER दक्षता मानक तय करता है, इसलिए किसी भी निर्माता का 3-स्टार AC समान न्यूनतम दक्षता स्तर पूरा करता है। टनेज, स्टार रेटिंग और इस्तेमाल के घंटे खर्च तय करते हैं, ब्रांड का नाम नहीं।',
  },
  {
    q: 'DesiMetrics पर हर ब्रांड का अलग पेज क्यों है?',
    a: 'हर ब्रांड पेज बिल्कुल वही असली कैलकुलेशन इंजन इस्तेमाल करता है, बस सीधे प्रासंगिक कॉपी के साथ ताकि आप बिना अतिरिक्त नेविगेशन के अपने खास AC के लिए जल्दी कैलकुलेटर तक पहुंच सकें।',
  },
  {
    q: 'मेरा ब्रांड यहां सूचीबद्ध नहीं है?',
    a: 'हमारा सामान्य AC रनिंग कॉस्ट कैलकुलेटर इस्तेमाल करें — यह किसी भी ब्रांड या मॉडल के लिए काम करता है, क्योंकि गणना टनेज, स्टार रेटिंग और इस्तेमाल के घंटों पर आधारित है, ब्रांड नाम पर नहीं।',
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

export default function AcBrandsIndexPageHi() {
  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: '/hi/ac' },
          { label: 'ब्रांड', href: '/hi/ac/brands' },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1="ब्रांड के हिसाब से AC बिल कैलकुलेटर"
        subtitle={
          <>
            हर ब्रांड वही असली BEE ISEER-आधारित गणना इस्तेमाल करता है — भारतीय
            कानून के तहत दक्षता स्टार रेटिंग तय करती है, ब्रांड का नाम नहीं। सीधे
            प्रासंगिक अनुमान के लिए अपना ब्रांड चुनें, या किसी भी AC के लिए हमारा{' '}
            <Link href="/hi/ac/bill-calculator" className="text-spark-teal underline">
              सामान्य AC रनिंग कॉस्ट कैलकुलेटर
            </Link>{' '}
            इस्तेमाल करें।
          </>
        }
        stats={[
          { icon: '🏷️', big: String(AC_BRANDS.length), small: 'ब्रांड', tone: 'hub' },
          { icon: '📊', big: 'ISEER', small: 'हर ब्रांड के लिए समान', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="brands" className="mb-10">
        <h2 id="brands" className="font-display mb-4 text-2xl font-semibold">
          अपना ब्रांड चुनें
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {AC_BRANDS.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/hi/ac/brands/${b.slug}`}
                className="block rounded-xl border border-hub-ac/20 bg-hub-ac/5 p-4 transition hover:border-hub-ac/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {b.name}
                </span>
                <span className="mt-1 block text-xs text-hub-ac">
                  खर्च निकालें →
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
