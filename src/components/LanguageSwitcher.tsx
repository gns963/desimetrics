'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { getLocaleSwitcherOptions, parseLocaleFromPathname } from '@/lib/i18n-alternates'

export default function LanguageSwitcher({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  const { locale: currentLocale, path } = parseLocaleFromPathname(pathname)
  const options = getLocaleSwitcherOptions(path)
  const currentCode = currentLocale.toUpperCase()

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold ${
          transparent
            ? 'border-white/30 text-white hover:border-white/60'
            : 'border-hairline text-ash hover:border-brass'
        }`}
      >
        🌐 {currentCode} <span className="text-[10px]">▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border border-hairline bg-paper shadow-lg"
        >
          {options.map((opt) => (
            <Link
              key={opt.code}
              href={opt.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              title={
                opt.isTranslated
                  ? undefined
                  : `This page isn't translated into ${opt.label} yet — taking you to the ${opt.label} homepage instead.`
              }
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-mist ${
                opt.code === currentLocale ? 'font-semibold text-brass' : 'text-ash'
              }`}
            >
              {opt.label}
              {opt.isTranslated ? (
                <span className="text-xs text-spark-teal" aria-hidden>●</span>
              ) : (
                <span className="text-[10px] uppercase text-ash/40">home</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
