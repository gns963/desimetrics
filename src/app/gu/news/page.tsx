import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news'

export const metadata: Metadata = {
  title: 'ન્યૂઝ — ભારતીય યુટિલિટી બિલ પર સમયસર સમજૂતીઓ | DesiMetrics',
  description:
    'ભારતમાં વીજળી, પાણી, ગેસ અને સોલર સંબંધિત વર્તમાન ઘટનાઓ તમારા બિલ પર ખરેખર શું અસર કરે છે — તારીખ સાથે, સ્રોત સાથે, અમારા કેલ્ક્યુલેટર સાથે જોડાયેલું.',
  alternates: {
    canonical: `${SITE}/gu${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/gu${PATH}`, type: 'website', locale: 'gu_IN' },
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
    title: 'મોડા બનેલા સોલર અને વિન્ડ પ્રોજેક્ટ કોર્ટ સુધી કેમ પહોંચે છે — અને ગુજરાતના વીજ બિલ માટે તેનો શું અર્થ છે',
    tag: 'ગુજરાત · GERC · GUVNL',
    href: '/gu/news/gerc-liquidated-damages-wind-solar-gujarat',
    date: '30 સપ્ટેમ્બર 2026',
    live: true,
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'હોમ', path: '' },
  { name: 'ન્યૂઝ', path: PATH },
])
const itemList = itemListLd(
  posts.filter((p) => p.live).map((p) => ({ name: p.title, path: p.href })),
)

export default function NewsIndexPageGu() {
  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href="/gu" className="hover:text-brass">
              હોમ
            </Link>{' '}
            / <span className="text-white/80">ન્યૂઝ</span>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ન્યૂઝ
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            જ્યારે ભારતની વીજળી, પાણી, ગેસ કે સોલર નીતિમાં કંઈક બદલાય છે — કોઈ અછત, નવો
            ટેરિફ ઓર્ડર, સબસિડી અપડેટ — અમે સમજાવીએ છીએ કે ખરેખર શું થયું અને તમારા બિલ
            પર તેની શું અસર છે, તારીખ અને સ્રોત સાથે.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
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
                  {p.live ? 'વાંચો →' : 'ટૂંક સમયમાં'}
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
