import type { Metadata } from 'next'
import Link from 'next/link'

const SITE = 'https://desimetrics.com'
const PATH = '/coming-soon'

export const metadata: Metadata = {
  title: 'जल्द आ रहा है — DesiMetrics',
  description: 'यह कैलकुलेटर निर्माणाधीन है और जल्द लॉन्च होगा।',
  // No languages alternate: this is a noindexed placeholder page on both
  // locales, deliberately excluded from the i18n-alternates manifest — see
  // SEO audit 2026-09-07.
  alternates: { canonical: `${SITE}/hi${PATH}` },
  robots: { index: false },
}

export default function ComingSoonPageHi() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden hero-gradient">
      <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden />
      <main className="relative mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <p className="text-5xl">🚧</p>
        <h1 className="font-display mt-4 text-3xl font-bold text-white">
          जल्द आ रहा है
        </h1>
        <p className="mt-3 text-lg text-white/70">
          हम अभी भी इस कैलकुलेटर के लिए टैरिफ डेटा सत्यापित कर रहे हैं।
          तमिलनाडु (TNEB) आज लाइव है — और राज्य और सोलर व AC टूल जल्द आ
          रहे हैं।
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/hi/electricity/tneb-bill-calculator"
            className="rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brass/90"
          >
            TNEB कैलकुलेटर आज़माएं
          </Link>
          <Link
            href="/hi"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50"
          >
            होम पर वापस जाएं
          </Link>
        </div>
      </main>
    </section>
  )
}
