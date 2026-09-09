import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import PageHero from '@/components/PageHero'
import { CALCULATOR_PAGES } from '@/data/calculator-pages'
import discomsJson from '@/data/discoms.json'
import { getTariff } from '@/lib/calc/electricity'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/electricity'

export const metadata: Metadata = {
  title: 'राज्य और DISCOM के हिसाब से बिजली बिल कैलकुलेटर (भारत) | DesiMetrics',
  description:
    'भारतीय DISCOM के लिए मुफ्त, सटीक बिजली बिल कैलकुलेटर — असली टेलिस्कोपिक स्लैब टैरिफ, सब्सिडी और फ्यूल कॉस्ट एडजस्टमेंट। TNEB, MSEDCL, UPPCL, BESCOM, KSEB और WBSEDCL, और राज्य जल्द ही।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/electricity'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const live = CALCULATOR_PAGES.map((p) => {
  const tariff = getTariff(p.discomCode)
  return {
    slug: p.slug,
    discomCode: p.discomCode,
    state: tariff.state,
    billingCycle: tariff.billingCycle,
  }
}).sort((a, b) => a.state.localeCompare(b.state))

const totalStatesUts = discomsJson.states.length

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'बिजली', path: PATH },
])
const EXTRA_TOOLS = [
  {
    href: '/hi/electricity/ev-charging-cost-calculator',
    emoji: '🔌',
    title: 'EV चार्जिंग कॉस्ट कैलकुलेटर',
    body: 'घर पर पूरा चार्ज करने का खर्च, और प्रति km आपकी लागत।',
  },
  {
    href: '/hi/electricity/appliance-cost-calculator',
    emoji: '🔋',
    title: 'उपकरण कॉस्ट कैलकुलेटर',
    body: 'किसी भी उपकरण की वाटेज और रोज़ के इस्तेमाल के घंटों से।',
  },
]
const itemList = itemListLd([
  ...live.map((d) => ({ name: `${d.state} Bill Calculator`, path: `/hi/electricity/${d.slug}` })),
  ...EXTRA_TOOLS.map((t) => ({ name: t.title, path: t.href })),
])

const faqs = [
  {
    q: 'DesiMetrics कितने DISCOM कवर करता है?',
    a: `सभी ${totalStatesUts} भारतीय राज्यों और केंद्र शासित प्रदेशों में ${live.length} बिल कैलकुलेटर, हर एक उस DISCOM के असली प्रकाशित टैरिफ ऑर्डर का इस्तेमाल करता है, किसी राष्ट्रीय औसत का नहीं।`,
  },
  {
    q: 'क्या टैरिफ अपडेट रखे जाते हैं?',
    a: 'हर टैरिफ फ़ाइल संबंधित SERC ऑर्डर के हिसाब से तारीख और स्रोत सहित सत्यापित है, हर कैलकुलेटर पेज पर एक "अंतिम सत्यापित" तारीख दिखाई जाती है।',
  },
  {
    q: 'क्या DesiMetrics आधिकारिक है या किसी DISCOM से जुड़ा है?',
    a: 'नहीं। DesiMetrics एक स्वतंत्र कैलकुलेटर है, किसी बिजली बोर्ड द्वारा संचालित या उससे जुड़ा नहीं है। हमेशा अपने आधिकारिक बिल के हिसाब से अंतिम आंकड़ा पक्का करें।',
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

export default function ElectricityHubPageHi() {
  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[{ label: 'बिजली', href: '/hi/electricity' }]}
        badgeLabel={
          <>
            <span aria-hidden>⚡</span> Electricity hub
          </>
        }
        h1="राज्य के हिसाब से बिजली बिल कैलकुलेटर"
        subtitle={
          <>
            अपने DISCOM के असली, स्रोत-सत्यापित टैरिफ से अपना बिजली बिल
            निकालें — टेलिस्कोपिक स्लैब, फिक्स्ड चार्ज, फ्यूल कॉस्ट
            एडजस्टमेंट, बिजली शुल्क और सब्सिडी। सभी {totalStatesUts} राज्य
            और केंद्र शासित प्रदेश उपलब्ध हैं।
          </>
        }
        stats={[
          { icon: '🗺️', big: `${live.length}/${totalStatesUts}`, small: 'राज्य और UT उपलब्ध', tone: 'hub' },
          { icon: '✓', big: 'SERC', small: 'स्रोत-सत्यापित', tone: 'seal-red' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
          { icon: '📶', big: 'टेलिस्कोपिक', small: 'स्लैब लॉजिक', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="more-tools" className="mb-10">
        <h2 id="more-tools" className="font-display mb-4 text-2xl font-semibold">
          और बिजली टूल्स
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {EXTRA_TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex flex-col rounded-2xl border border-hub-electricity/20 bg-hub-electricity/5 p-6 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-2xl">{t.emoji}</span>
              <h3 className="font-display mt-2 text-lg font-semibold text-ink-navy">
                {t.title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-ash/70">
                {t.body}
              </p>
              <span className="mt-3 text-sm font-semibold text-hub-electricity">
                कैलकुलेटर खोलें →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="live" className="mb-10">
        <h2 id="live" className="font-display mb-4 text-2xl font-semibold">
          सभी राज्यों के बिल कैलकुलेटर
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {live.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/hi/electricity/${d.slug}`}
                className="block rounded-xl border border-brass/20 bg-brass/5 p-4 transition hover:border-brass/50 hover:shadow-sm"
              >
                <span className="font-semibold text-ink-navy">
                  {d.state}
                </span>
                <span className="mt-1 block text-xs text-brass">
                  {d.discomCode} · {d.billingCycle === 'bimonthly' ? 'द्विमासिक' : 'मासिक'} बिलिंग · खोलें →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="more" className="mb-10">
        <h2 id="more" className="font-display mb-2 text-2xl font-semibold">
          कोई गलती मिली, या किसी DISCOM का प्रतिनिधित्व करते हैं?
        </h2>
        <p className="text-ash/80">
          यहां हर टैरिफ को धीरे-धीरे प्राइमरी SERC ऑर्डर के हिसाब से
          क्रॉस-चेक किया जा रहा है।{' '}
          <Link href="/contact" className="text-brass underline">
            सुधार बताएं
          </Link>{' '}
          और हमारे{' '}
          <Link href="/data-sources" className="text-brass underline">
            डेटा स्रोत
          </Link>{' '}
          देखें।
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

      <CrossHubLinks current="electricity" />

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
