import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news'

export const metadata: Metadata = {
  title: 'न्यूज़ — भारतीय यूटिलिटी बिलों पर समय पर एक्सप्लेनर | DesiMetrics',
  description:
    'भारत में बिजली, पानी, गैस और सोलर से जुड़ी ताज़ा घटनाओं का आपके बिल पर असल में क्या असर पड़ता है — तारीख के साथ, स्रोत सहित, और हमारे कैलकुलेटर से जुड़ा हुआ।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
  robots: { index: false },
}

interface NewsPost {
  title: string
  tag: string
  href: string
  date: string
  live: boolean
}

const posts: NewsPost[] = [
  {
    title: 'केरल की बिजली किल्लत: इसका आपके KSEB बिल पर क्या असर है',
    tag: 'केरल · KSEB',
    href: '/hi/news/kerala-power-shortage-september-2026',
    date: '29 सितंबर 2026',
    live: true,
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'न्यूज़', path: PATH },
])
const itemList = itemListLd(
  posts.filter((p) => p.live).map((p) => ({ name: p.title, path: p.href })),
)

export default function NewsIndexPageHi() {
  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href="/hi" className="hover:text-brass">
              होम
            </Link>{' '}
            / <span className="text-white/80">न्यूज़</span>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            न्यूज़
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            जब भारत की बिजली, पानी, गैस या सोलर नीति में कुछ बदलता है — कोई किल्लत,
            नया टैरिफ ऑर्डर, सब्सिडी अपडेट — हम बताते हैं कि असल में क्या हुआ और
            आपके बिल पर इसका क्या असर है, तारीख और स्रोत के साथ।
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="flex flex-col rounded-2xl border border-hairline bg-paper p-6 transition hover:border-hub-news hover:shadow-sm"
            >
              <span className="w-fit rounded-full bg-hub-news/10 px-2.5 py-0.5 text-xs font-semibold text-hub-news">
                {p.tag}
              </span>
              <h2 className="mt-3 flex-1 font-display text-lg font-bold text-ink-navy">
                {p.title}
              </h2>
              <span className="mt-4 flex items-center justify-between text-sm">
                <span className="text-ash/50">{p.date}</span>
                <span className="font-semibold text-hub-news">
                  {p.live ? 'पढ़ें →' : 'जल्द आ रहा है'}
                </span>
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
