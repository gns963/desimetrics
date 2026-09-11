import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/blog'

export const metadata: Metadata = {
  title: 'ब्लॉग — बिजली, सोलर और फाइनेंस पर एक्सप्लेनर | DesiMetrics',
  description:
    'भारतीय बिजली बिलिंग, रूफटॉप सोलर और पर्सनल फाइनेंस पर सरल भाषा में एक्सप्लेनर — हमारे कैलकुलेटर के पीछे की टीम से।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/blog'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const posts = [
  {
    title: 'BESCOM बिजली बिल की पूरी गाइड',
    tag: 'रेफरेंस',
    href: '/hi/blog/bescom-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'UPPCL बिजली बिल की पूरी गाइड',
    tag: 'रेफरेंस',
    href: '/hi/blog/uppcl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'MSEDCL (महावितरण) बिजली बिल की पूरी गाइड',
    tag: 'रेफरेंस',
    href: '/hi/blog/msedcl-complete-guide-electricity-bill',
    live: true,
  },
  {
    title: 'भारत में पानी का बिल कैसे बनता है: शहर-दर-शहर गाइड',
    tag: 'पानी',
    href: '/hi/blog/how-water-bills-calculated-india',
    live: true,
  },
  {
    title: 'PM सूर्य घर मुफ्त बिजली योजना: पूरी सब्सिडी गाइड',
    tag: 'सोलर',
    href: '/hi/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide',
    live: true,
  },
  {
    title: 'फिक्स्ड चार्ज बनाम FCA: आपका बिजली बिल क्यों बदलता है',
    tag: 'एक्सप्लेनर',
    href: '/hi/blog/fixed-charges-vs-fca-electricity-bill',
    live: true,
  },
  {
    title: 'भारत में AC चलाने का असल खर्च कितना आता है?',
    tag: 'AC',
    href: '/hi/blog/ac-running-cost-india-guide',
    live: true,
  },
  {
    title: 'महावितरण बिल: अपना MSEDCL बिल ऑनलाइन जांचें और चुकाएं',
    tag: 'बिजली',
    href: '/hi/blog/mahavitaran-bill-kaise-check-kare',
    live: true,
  },
  {
    title: 'भारत में स्मार्ट मीटर: अनिवार्य? रीचार्ज और समाधान',
    tag: 'बिजली',
    href: '/hi/blog/smart-meters-in-india-guide',
    live: true,
  },
  {
    title: 'टेलिस्कोपिक बिजली स्लैब असल में कैसे काम करते हैं',
    tag: 'एक्सप्लेनर',
    href: '/hi/blog/how-telescopic-electricity-slabs-work',
    live: true,
  },
  {
    title: '2026 में भारत में रूफटॉप सोलर लगाना फायदेमंद है?',
    tag: 'सोलर',
    href: '/hi/blog/is-rooftop-solar-worth-it-in-india-2026',
    live: true,
  },
  {
    title: 'नई बनाम पुरानी टैक्स रेजीम: असल में कौन बचाता है?',
    tag: 'फाइनेंस',
    href: '/hi/blog/new-vs-old-tax-regime-who-actually-saves',
    live: true,
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'ब्लॉग', path: PATH },
])
const itemList = itemListLd(
  posts.filter((p) => p.live).map((p) => ({ name: p.title, path: p.href })),
)

export default function BlogIndexPageHi() {
  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href="/hi" className="hover:text-brass">
              होम
            </Link>{' '}
            / <span className="text-white/80">ब्लॉग</span>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ब्लॉग से
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            भारतीय बिजली बिलिंग, रूफटॉप सोलर और पर्सनल फाइनेंस पर सरल भाषा
            में एक्सप्लेनर — वही असली टैरिफ और फॉर्मूला जो हमारे कैलकुलेटर
            चलाते हैं, उन्हीं पर आधारित।
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="flex flex-col rounded-2xl border border-hairline bg-paper p-6 transition hover:border-brass hover:shadow-sm"
            >
              <span className="w-fit rounded-full bg-brass/10 px-2.5 py-0.5 text-xs font-semibold text-brass">
                {p.tag}
              </span>
              <h2 className="mt-3 flex-1 font-display text-lg font-bold text-ink-navy">
                {p.title}
              </h2>
              <span className="mt-4 text-sm font-semibold text-brass">
                {p.live ? 'पढ़ें →' : 'जल्द आ रहा है'}
              </span>
            </Link>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      </main>
    </>
  )
}
