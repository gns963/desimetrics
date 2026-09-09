/**
 * Deterministic INR formatting with Indian digit grouping (lakh/crore style).
 *
 * Intentionally NOT using Intl.NumberFormat: subtle ICU differences between the
 * Node server render and the browser can cause React hydration mismatches. A
 * pure string routine renders identically everywhere.
 */
export function formatINR(value: number): string {
  const negative = value < 0
  const [intPart, decPart] = Math.abs(value).toFixed(2).split('.')

  const last3 = intPart.slice(-3)
  const rest = intPart.slice(0, -3)
  const grouped = rest
    ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
    : last3

  return `${negative ? '-' : ''}₹${grouped}.${decPart}`
}

/** Human-friendly billing-cycle label, e.g. "bimonthly" → "bi-monthly". */
const CYCLE_LABELS: Record<'en' | 'hi' | 'mr' | 'ta' | 'te' | 'kn' | 'bn' | 'gu' | 'ml', Record<string, string>> = {
  en: { monthly: 'monthly', bimonthly: 'bi-monthly', quarterly: 'quarterly' },
  hi: { monthly: 'मासिक', bimonthly: 'द्वि-मासिक', quarterly: 'त्रैमासिक' },
  mr: { monthly: 'मासिक', bimonthly: 'द्वैमासिक', quarterly: 'त्रैमासिक' },
  ta: { monthly: 'மாதாந்திர', bimonthly: 'இரு-மாத', quarterly: 'காலாண்டு' },
  te: { monthly: 'నెలవారీ', bimonthly: 'రెండు-నెలల', quarterly: 'త్రైమాసిక' },
  kn: { monthly: 'ಮಾಸಿಕ', bimonthly: 'ದ್ವೈಮಾಸಿಕ', quarterly: 'ತ್ರೈಮಾಸಿಕ' },
  bn: { monthly: 'মাসিক', bimonthly: 'দ্বি-মাসিক', quarterly: 'ত্রৈমাসিক' },
  gu: { monthly: 'માસિક', bimonthly: 'દ્વિ-માસિક', quarterly: 'ત્રિમાસિક' },
  ml: { monthly: 'മാസംതോറും', bimonthly: 'ദ്വൈമാസ', quarterly: 'ത്രൈമാസ' },
}

/** Locale defaults to English so every existing call site (which doesn't
 *  pass one) is unaffected — only locale-aware callers like
 *  DiscomCalculatorPage need to pass the page's actual locale. */
export function cycleLabel(cycle: string, locale: 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'kn' | 'bn' | 'gu' | 'ml' = 'en'): string {
  return CYCLE_LABELS[locale][cycle] ?? cycle
}

/** Formats an ISO `YYYY-MM-DD` string as e.g. "29 August 2026" (deterministic). */
export function formatIsoDate(iso: string): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${months[m - 1]} ${y}`
}

import type { FixedCharge } from '../data/tariffs/_schema'

/** Human-readable rendering of a tariff's fixed/demand charge, regardless of
 *  which billing basis (flat / perLoad / perPhase) the DISCOM uses. */
export function fixedChargeLabel(fc: FixedCharge): string {
  switch (fc.basis) {
    case 'perPhase':
      return `₹${fc.singlePhase} / ₹${fc.threePhase} (single / three-phase)`
    case 'perLoad':
      return `₹${fc.perKW}/kW of sanctioned load`
    case 'flat':
      return `₹${fc.flat}`
  }
}

/** Kebab-case slug from a plain name, e.g. "Andaman & Nicobar Islands" → "andaman-nicobar-islands". */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
