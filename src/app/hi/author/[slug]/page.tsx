import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allAuthorSlugs, getAuthor } from '@/data/authors'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'

export function generateStaticParams() {
  return allAuthorSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) return {}
  const role = author.hi?.role ?? author.role
  const bio = author.hi?.bio ?? author.bio
  return {
    title: `${author.name} — ${role} | DesiMetrics`,
    description: bio[0]?.slice(0, 155),
    alternates: {
      canonical: `${SITE}/hi/author/${slug}`,
      languages: getAlternateLanguages(`/author/${slug}`),
    },
  }
}

export default async function AuthorPageHi({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) notFound()

  const role = author.hi?.role ?? author.role
  const bio = author.hi?.bio ?? author.bio
  const expertise = author.hi?.expertise ?? author.expertise

  const personLd = {
    '@context': 'https://schema.org',
    '@type': author.slug === 'editorial-team' ? 'Organization' : 'Person',
    name: author.name,
    url: `${SITE}/hi/author/${slug}`,
    email: author.email,
    knowsAbout: author.expertise,
  }

  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href="/hi" className="hover:text-brass">
              होम
            </Link>{' '}
            /{' '}
            <Link href="/hi/about" className="hover:text-brass">
              DesiMetrics के बारे में
            </Link>{' '}
            / <span className="text-white/80">{author.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl font-bold text-brass">
              {author.name.slice(0, 1)}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {author.name}
              </h1>
              <p className="text-white/60">{role}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="space-y-4 text-ash/80">
        {bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <h2 className="font-display mt-8 text-xl font-semibold text-ash">
        फोकस के क्षेत्र
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-ash/80">
        {expertise.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-ash/60">
        संपर्क:{' '}
        <a
          href={`mailto:${author.email}`}
          className="text-brass underline hover:text-brass"
        >
          {author.email}
        </a>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      </main>
    </>
  )
}
