import Link from 'next/link'
import type { ReactNode } from 'react'
import { breadcrumbLd } from '@/lib/seo'

/** Minimal shared shell for the trust/legal stub pages. */
export default function LegalPageShell({
  title,
  intro,
  children,
  stub = true,
  path,
  locale = 'en',
}: {
  title: string
  intro: string
  children?: ReactNode
  /** When false, omits the "this is a stub" footer note (for finished pages). */
  stub?: boolean
  /** This page's own path, e.g. "/privacy" — used for BreadcrumbList schema. */
  path: string
  /** UI language for the shell chrome (breadcrumb, footer note). Content itself is passed in via title/intro/children. */
  locale?: 'en' | 'hi'
}) {
  const hi = locale === 'hi'
  const breadcrumb = breadcrumbLd([
    { name: hi ? 'होम' : 'Home', path: '' },
    { name: title, path },
  ])

  return (
    <>
      <section className="relative overflow-hidden py-14 hero-gradient sm:py-16">
        <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <Link href={hi ? '/hi' : '/'} className="hover:text-brass">
              {hi ? 'होम' : 'Home'}
            </Link>{' '}
            / <span className="text-white/80">{title}</span>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{intro}</p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-4 text-ash/80">{children}</div>
        <p className="mt-10 text-sm text-ash/40">
          {hi ? 'आखिरी बार अपडेट: 29 अगस्त 2026' : 'Last updated: 29 August 2026'}
          {stub
            ? hi
              ? ' · यह पेज एक स्टब है और लॉन्च से पहले विस्तृत किया जाएगा।'
              : ' · This page is a stub and will be expanded before launch.'
            : ''}
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </main>
    </>
  )
}
