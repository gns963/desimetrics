import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { isPausedPath } from '@/lib/paused'

// A link styled as a box (card, button, list row) rather than as running text.
const BOX_CLASS = /(^|\s)(block|flex|inline-flex|grid|inline-block)(\s|$)|rounded/

/**
 * Drop-in for `next/link`. A link into a section that is currently offline
 * (see src/lib/paused.ts) never renders as an anchor, so no page links to a
 * 404 while that section is paused: a card or button is left out, and a link
 * inside a sentence becomes plain text.
 */
export default function Link({ href, children, className, ...rest }: ComponentProps<typeof NextLink>) {
  if (typeof href === 'string' && isPausedPath(href)) {
    if (className && BOX_CLASS.test(className)) return null
    // A trailing call-to-action ("Estimate your payback →") makes no sense as plain text.
    if (typeof children === 'string' && children.includes('→')) return null
    return <span data-offline-link>{children}</span>
  }
  return (
    <NextLink href={href} className={className} {...rest}>
      {children}
    </NextLink>
  )
}
