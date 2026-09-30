import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news'

export const metadata: Metadata = {
  title: 'செய்திகள் — இந்திய யூட்டிலிட்டி பில்கள் பற்றிய சரியான நேர விளக்கங்கள் | DesiMetrics',
  description:
    'இந்தியாவில் மின்சாரம், தண்ணீர், எரிவாயு மற்றும் சூரிய சக்தி தொடர்பான தற்போதைய நிகழ்வுகள் உங்கள் பில்லில் உண்மையில் என்ன மாற்றத்தை ஏற்படுத்துகின்றன — தேதியுடன், ஆதாரத்துடன், எங்கள் கால்குலேட்டர்களுடன் இணைக்கப்பட்டு.',
  alternates: {
    canonical: `${SITE}/ta${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/ta${PATH}`, type: 'website', locale: 'ta_IN' },
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
    title: 'மின்னழுத்த சர்ஜ் உங்கள் உபகரணங்களை சேதப்படுத்தியதா? தமிழ்நாடு நுகர்வோர் என்ன செய்யலாம்',
    tag: 'தமிழ்நாடு · TNPDCL',
    href: '/ta/news/power-surge-damaged-appliances-tamil-nadu',
    date: '29 செப்டம்பர் 2026',
    live: true,
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'முகப்பு', path: '' },
  { name: 'செய்திகள்', path: PATH },
])
const itemList = itemListLd(
  posts.filter((p) => p.live).map((p) => ({ name: p.title, path: p.href })),
)

export default function NewsIndexPageTa() {
  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href="/ta" className="hover:text-brass">
              முகப்பு
            </Link>{' '}
            / <span className="text-white/80">செய்திகள்</span>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            செய்திகள்
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            இந்தியாவின் மின்சாரம், தண்ணீர், எரிவாயு அல்லது சூரிய சக்தி
            கொள்கையில் ஏதேனும் மாறினால் — ஒரு பற்றாக்குறை, புதிய கட்டண உத்தரவு,
            மானிய புதுப்பிப்பு — உண்மையில் என்ன நடந்தது, உங்கள் பில்லில் என்ன
            மாற்றம் என்பதை, தேதியுடனும் ஆதாரத்துடனும் நாங்கள் விளக்குகிறோம்.
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
                  {p.live ? 'படிக்க →' : 'விரைவில் வரும்'}
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
