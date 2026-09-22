import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Locale folders are plain nested App Router segments (not a `[locale]`
 * dynamic route), so the root layout has no built-in way to know which
 * locale a request is for — and Next.js only allows the root layout to
 * render the `<html>` tag, so a nested layout per locale can't set `lang`
 * either. This proxy reads the first path segment and forwards it as
 * a request header so the root layout can set `<html lang>` correctly per
 * request. See SEO audit 2026-09-07.
 */
const LOCALES = new Set(['hi', 'ta', 'te', 'mr', 'bn', 'kn', 'gu', 'ml'])

/**
 * www.desimetrics.com has always served identical content directly (200,
 * not a redirect) instead of deferring to the apex domain — every canonical
 * tag on the site already declares `https://desimetrics.com` (no www) as
 * canonical, so Google was correctly excluding the www copies from the
 * index, but re-crawling all ~96 of them repeatedly rather than ever
 * learning they permanently redirect. Fixed 2026-09-22 per GSC's "Alternate
 * page with proper canonical tag" report. 308 preserves the request method.
 */
function wwwRedirect(request: NextRequest): NextResponse | null {
  const host = request.headers.get('host') ?? ''
  if (!host.startsWith('www.')) return null
  const target = new URL(request.nextUrl)
  target.hostname = host.slice('www.'.length)
  return NextResponse.redirect(target, 308)
}

export function proxy(request: NextRequest) {
  const redirect = wwwRedirect(request)
  if (redirect) return redirect

  const firstSegment = request.nextUrl.pathname.split('/')[1]
  const locale = LOCALES.has(firstSegment) ? firstSegment : 'en'

  const headers = new Headers(request.headers)
  headers.set('x-locale', locale)
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.\\w+$).*)'],
}
