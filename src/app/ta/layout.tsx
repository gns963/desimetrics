import type { Metadata } from 'next'

/** Overrides the sitewide og:locale default (see root layout) for every
 * page under /ta — cascades via Next's metadata inheritance without
 * needing to touch each page file. See SEO audit 2026-09-07. */
export const metadata: Metadata = {
  openGraph: { locale: 'ta_IN' },
}

export default function TaLayout({ children }: { children: React.ReactNode }) {
  return children
}
