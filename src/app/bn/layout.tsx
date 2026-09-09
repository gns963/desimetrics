import type { Metadata } from 'next'

/** Overrides the sitewide og:locale default (see root layout) for every
 * page under /bn — cascades via Next's metadata inheritance without
 * needing to touch each page file. See SEO audit 2026-09-07. */
export const metadata: Metadata = {
  openGraph: { locale: 'bn_IN' },
}

export default function BnLayout({ children }: { children: React.ReactNode }) {
  return children
}
