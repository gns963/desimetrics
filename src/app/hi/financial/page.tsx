import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import PageHero from '@/components/PageHero'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial'

export const metadata: Metadata = {
  title: 'फाइनेंशियल कैलकुलेटर — GST, SIP, इनकम टैक्स और ग्रेच्युटी (भारत)',
  description:
    'मुफ्त भारतीय पर्सनल-फाइनेंस कैलकुलेटर: GST कैलकुलेटर, SIP रिटर्न, FY 2026-27 के लिए नई बनाम पुरानी इनकम टैक्स रेजीम, और ग्रेच्युटी — सटीक, तेज़ और मोबाइल-फ्रेंडली।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/financial'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const cards = [
  {
    href: '/hi/financial/gst-calculator',
    emoji: '🧾',
    title: 'GST कैलकुलेटर',
    body: 'किसी भी स्लैब के लिए GST जोड़ें या हटाएं, CGST/SGST बंटवारे के साथ।',
    cta: 'खोलें →',
  },
  {
    href: '/hi/financial/sip-calculator',
    emoji: '📈',
    title: 'SIP कैलकुलेटर',
    body: 'म्यूचुअल फंड SIP की मैच्योरिटी वैल्यू और लाभ का अनुमान लगाएं, ग्रोथ चार्ट के साथ।',
    cta: 'खोलें →',
  },
  {
    href: '/hi/financial/new-vs-old-tax-regime-calculator',
    emoji: '🏦',
    title: 'नई बनाम पुरानी टैक्स रेजीम',
    body: 'FY 2026-27 के लिए दोनों रेजीम के तहत इनकम टैक्स की तुलना करें और देखें कौन बेहतर है।',
    cta: 'खोलें →',
  },
  {
    href: '/hi/financial/gratuity-calculator',
    emoji: '💼',
    title: 'ग्रेच्युटी कैलकुलेटर',
    body: '15/26 फॉर्मूला इस्तेमाल करते हुए सैलरी और सर्विस के सालों से ग्रेच्युटी निकालें।',
    cta: 'खोलें →',
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फाइनेंशियल', path: PATH },
])
const itemList = itemListLd(cards.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'क्या ये कैलकुलेटर FY 2026-27 के लिए अपडेट हैं?',
    a: 'हां — टैक्स रेजीम कैलकुलेटर मौजूदा FY 2026-27 (AY 2027-28) स्लैब, स्टैंडर्ड डिडक्शन और 87A रिबेट इस्तेमाल करता है। GST, SIP और ग्रेच्युटी मौजूदा कानून (जैसे ₹20,00,000 की ग्रेच्युटी सीमा) पर आधारित फॉर्मूला हैं और किसी खास वित्तीय वर्ष से बंधे नहीं हैं।',
  },
  {
    q: 'क्या यह टैक्स या निवेश सलाह है?',
    a: 'नहीं। ये टूल सिर्फ सामान्य मार्गदर्शन और उदाहरण के लिए हैं। SIP के लिए, असली मार्केट रिटर्न की गारंटी नहीं है; टैक्स के लिए, फाइल करने से पहले किसी पेशेवर से सलाह लें।',
  },
  {
    q: 'क्या आप मेरे डाले गए नंबर स्टोर करते हैं?',
    a: 'नहीं — कोई लॉगिन नहीं है और कोई सर्वर-साइड स्टोरेज नहीं है। गणना आपके ब्राउज़र में आपके दिए इनपुट से होती है।',
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

export default function FinancialHubPageHi() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[{ label: 'फाइनेंशियल', href: '/hi/financial' }]}
        badgeLabel={
          <>
            <span aria-hidden>🧮</span> Financial hub
          </>
        }
        h1="फाइनेंशियल कैलकुलेटर"
        subtitle="भारत के लिए तेज़, सटीक पर्सनल-फाइनेंस टूल — GST, म्यूचुअल फंड SIP, इनकम टैक्स रेजीम तुलना और ग्रेच्युटी। मुफ्त और मौजूदा वित्तीय वर्ष के लिए अपडेट।"
        stats={[
          { icon: '🧮', big: '4', small: 'कैलकुलेटर', tone: 'hub' },
          { icon: '📅', big: 'FY 2026-27', small: 'मौजूदा साल', tone: 'hub' },
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
            className="flex flex-col rounded-2xl border border-hairline bg-paper p-6 transition hover:border-brass/30 hover:shadow-sm"
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className="mt-3 text-sm font-semibold text-brass">
              {c.cta}
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="why" className="mb-10">
        <h2 id="why" className="font-display mb-4 text-2xl font-semibold">
          बिल और पैसे के लिए एक प्लेटफॉर्म
        </h2>
        <p className="text-ash/80">
          DesiMetrics ने बिजली बिल से शुरुआत की थी और अब उन रोज़मर्रा के
          नंबरों को कवर करता है जो भारतीय घर सबसे ज़्यादा खोजते हैं — आपको
          कितना GST देना है से लेकर एक SIP कितना बढ़ सकता है, कौन सी टैक्स
          रेजीम आपको ज़्यादा बचाती है, और आपने कितनी ग्रेच्युटी कमाई है। वही
          साफ, बिना-लॉगिन टूल, सब एक जगह।
        </p>
      </section>

      <section aria-labelledby="methodology" className="mb-10">
        <h2 id="methodology" className="font-display mb-2 text-xl font-bold text-ink-navy">
          हमारी पद्धति
        </h2>
        <p className="text-ash/80">
          यहां के आंकड़े जहां लागू हो वहां संबंधित आधिकारिक स्रोतों के हिसाब
          से जांचे जाते हैं — GST स्लैब को GST Council/CBIC नोटिफिकेशन के
          हिसाब से, इनकम टैक्स स्लैब को Finance Act/CBDT के हिसाब से, और
          ग्रेच्युटी को Payment of Gratuity Act के हिसाब से। टैक्स कानून और
          दरें समय-समय पर बदलती हैं; असली वित्तीय परिणाम वाली किसी भी चीज़
          के लिए (फाइलिंग, इनवॉइसिंग, कोई बड़ा निवेश फैसला), सिर्फ किसी
          कैलकुलेटर पर भरोसा करने की बजाय मौजूदा आधिकारिक नोटिफिकेशन या किसी
          पेशेवर से पुष्टि करें। हम आम तौर पर डेटा कैसे प्राप्त और सत्यापित
          करते हैं, इसके लिए हमारा{' '}
          <Link href="/methodology" className="text-brass underline">
            साइटवाइड पद्धति पेज
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

      <CrossHubLinks current="financial" />

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
