import type { Metadata } from 'next'
import Link from 'next/link'
import HexCalculator from '@/components/calculators/HexCalculator'
import PageHero from '@/components/PageHero'
import { calculateHexOperation, convertHex } from '@/lib/calc/hex'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/tools/hex-calculator'

const addEx = calculateHexOperation('47', '1A', 'add')
const subEx = calculateHexOperation('FF', '0F', 'subtract')
const mulEx = calculateHexOperation('A', 'B', 'multiply')
const divEx = calculateHexOperation('64', '0A', 'divide')
const convEx = convertHex('FF')

export const metadata: Metadata = {
  title: 'Hexadecimal Calculator — Hex Add, Subtract, Multiply, Divide',
  description:
    'Free hexadecimal calculator: add, subtract, multiply or divide two hex numbers exactly, for any size, with decimal/binary/octal conversions shown alongside.',
  alternates: {
    canonical: `${SITE}${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}${PATH}`, type: 'website', locale: 'en_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Hexadecimal Calculator',
  url: `${SITE}${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
}
const breadcrumb = breadcrumbLd([
  { name: 'Home', path: '' },
  { name: 'Tools', path: '/tools' },
  { name: 'Hexadecimal Calculator', path: PATH },
])

const faqs = [
  {
    q: 'What is a hexadecimal number?',
    a: 'A number written in base 16, using sixteen digits: 0-9 for the first ten values, then A-F for ten, eleven, twelve, thirteen, fourteen and fifteen. Each position is worth 16 times the position to its right, the same way each decimal position is worth 10 times the one to its right.',
  },
  {
    q: 'Why does computing use hexadecimal instead of binary?',
    a: 'Hex is a convenient shorthand for binary: exactly four binary digits map to one hex digit (0000-1111 becomes 0-F), so a long binary string becomes a much shorter hex one with no information lost and no arithmetic required to convert — just group the bits in fours and look up each group.',
  },
  {
    q: 'How do I convert hex to decimal by hand?',
    a: `Multiply each digit by 16 raised to its position (counting from 0 on the right) and add the results. For example ${convEx.hex} = ${convEx.hex[0]}×16¹ + ${convEx.hex[1]}×16⁰ = ${parseInt(convEx.hex[0], 16) * 16} + ${parseInt(convEx.hex[1], 16)} = ${convEx.decimal}.`,
  },
  {
    q: 'Can hexadecimal numbers be negative?',
    a: "Yes, in everyday arithmetic (like this calculator's subtraction) a result can come out negative, shown with a leading minus sign. Computers themselves usually represent negative numbers differently (two's complement, using a fixed bit width) rather than a plain minus sign — this calculator uses the simpler signed-magnitude form since it isn't tied to any fixed bit width.",
  },
  {
    q: 'Is there a limit to how large a hex number this calculator can handle?',
    a: "No practical one — it uses arbitrary-precision arithmetic internally, so a 50-digit hex number is exactly as accurate as a 2-digit one. Ordinary calculator apps that use standard floating-point numbers silently lose precision past roughly 15-16 decimal digits; this one doesn't.",
  },
  {
    q: 'Why does division show a remainder instead of a decimal point?',
    a: "Hexadecimal has no single agreed convention for writing a fractional part the way decimal uses a decimal point, so hex calculators conventionally show an integer quotient plus a remainder instead — the same way you were taught long division in school before fractions were introduced.",
  },
  {
    q: 'What does the 0x prefix mean?',
    a: "0x is the standard prefix programming languages use to mark a literal value as hexadecimal rather than decimal — for example 0x1A means hex 1A (26 in decimal), not the number 1 followed by A. This calculator accepts input with or without the prefix.",
  },
]
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const h2Cls = 'font-display mb-4 text-2xl font-semibold text-ink-navy'
const pCls = 'text-ash/80'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

export default function HexCalculatorPage() {
  return (
    <>
      <PageHero
        hub="tools"
        breadcrumb={[
          { label: 'Tools', href: '/tools' },
          { label: 'Hexadecimal Calculator', href: PATH },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔢</span> Tools hub
          </>
        }
        h1="Hexadecimal Calculator"
        subtitle={
          <>
            Add, subtract, multiply or divide two hex numbers —{' '}
            <strong>exact, for any size</strong>, with the decimal, binary
            and octal equivalents shown alongside.
          </>
        }
        stats={[
          { icon: '🎯', big: 'Exact', small: 'No rounding', tone: 'hub' },
          { icon: '➗', big: '4', small: 'Operations', tone: 'hub' },
          { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
          { icon: '🔒', big: 'Client-side', small: 'Nothing stored', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <section
          aria-labelledby="worked-example"
          className="mb-8 rounded-xl border border-hairline border-l-4 border-l-brass bg-paper p-5"
        >
          <h2
            id="worked-example"
            className="font-display text-sm font-semibold tracking-wide text-brass uppercase"
          >
            Worked example
          </h2>
          <p className="mt-2 text-ash/80">
            <strong>{addEx.aHex} + {addEx.bHex}</strong> in hexadecimal is{' '}
            <strong>{addEx.resultHex}</strong> — the same sum as decimal{' '}
            {addEx.aDec} + {addEx.bDec} = {addEx.resultDec}, just written in
            base 16.
          </p>
        </section>

        <section aria-labelledby="calculator" className="mb-10">
          <h2 id="calculator" className={h2Cls}>
            Calculate
          </h2>
          <HexCalculator />
        </section>

        <section aria-labelledby="what-is-hex" className="mt-10 scroll-mt-20">
          <h2 id="what-is-hex" className={h2Cls}>
            What is the hexadecimal system?
          </h2>
          <p className={pCls}>
            Hexadecimal (often shortened to &ldquo;hex&rdquo;) is a base-16
            number system — it uses sixteen symbols per digit instead of the
            ten (0-9) that decimal uses. Since there are no single digits for
            ten through fifteen, hex borrows the letters A through F:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Hex digit</th>
                  <th className="px-4 py-2 text-right font-semibold">Decimal value</th>
                  <th className="px-4 py-2 text-right font-semibold">4-bit binary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {Array.from({ length: 16 }, (_, i) => i).map((i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 font-mono font-medium">
                      {i.toString(16).toUpperCase()}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">{i}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums">
                      {i.toString(2).padStart(4, '0')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            That third column is the real reason hex exists in computing:
            every hex digit maps to exactly four binary digits, with nothing
            left over. A byte (8 bits) is always exactly two hex digits —
            which is why you&apos;ll see hex pairs like &ldquo;FF&rdquo; or
            &ldquo;0A&rdquo; used constantly in programming and networking.
          </p>
          <p className={takeawayCls}>
            Takeaway: hex is not an arbitrary alternative to decimal — it is
            specifically a compact, exact shorthand for binary.
          </p>
        </section>

        <section aria-labelledby="addition" className="mt-10 scroll-mt-20">
          <h2 id="addition" className={h2Cls}>
            Hexadecimal addition explained
          </h2>
          <p className={pCls}>
            Hex addition works exactly like decimal addition — add each
            column from the right, and carry into the next column whenever a
            column&apos;s sum reaches 16 (not 10, since this is base 16).
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {addEx.aHex} + {addEx.bHex}
            </p>
            <ul className="mt-2 space-y-1 text-ash/70">
              <li>
                Rightmost column: {addEx.aHex.slice(-1)} + {addEx.bHex.slice(-1)} = {(
                  parseInt(addEx.aHex.slice(-1), 16) + parseInt(addEx.bHex.slice(-1), 16)
                ).toString(16).toUpperCase()}{' '}
                — no carry needed, since that&apos;s under 16 (10 in hex).
              </li>
              <li>
                Next column: {addEx.aHex.slice(0, -1) || '0'} + {addEx.bHex.slice(0, -1) || '0'} = {(
                  parseInt(addEx.aHex.slice(0, -1) || '0', 16) +
                  parseInt(addEx.bHex.slice(0, -1) || '0', 16)
                ).toString(16).toUpperCase()}
              </li>
              <li className="font-semibold text-ink-navy">Result: {addEx.resultHex}</li>
            </ul>
          </div>
          <p className={`mt-3 ${pCls}`}>
            The one habit worth building: whenever a column&apos;s sum is 16
            or more, write down the remainder (sum − 16) and carry a 1 into
            the next column — identical in spirit to carrying a 1 in decimal
            addition once a column passes 9.
          </p>
          <p className={takeawayCls}>
            Takeaway: the carry rule is the only thing that changes between
            decimal and hex addition — the column-by-column method is
            identical.
          </p>
        </section>

        <section aria-labelledby="subtraction" className="mt-10 scroll-mt-20">
          <h2 id="subtraction" className={h2Cls}>
            Hexadecimal subtraction explained
          </h2>
          <p className={pCls}>
            Subtraction works the same way, but borrows 16 (not 10) from the
            next column whenever the top digit in a column is smaller than
            the bottom one.
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {subEx.aHex} − {subEx.bHex}
            </p>
            <ul className="mt-2 space-y-1 text-ash/70">
              <li>
                Rightmost column: {subEx.aHex.slice(-1)} − {subEx.bHex.slice(-1)} = {(
                  parseInt(subEx.aHex.slice(-1), 16) - parseInt(subEx.bHex.slice(-1), 16)
                ).toString(16).toUpperCase()}
              </li>
              <li>
                Next column: {subEx.aHex.slice(0, -1) || '0'} − {subEx.bHex.slice(0, -1) || '0'} = {(
                  parseInt(subEx.aHex.slice(0, -1) || '0', 16) -
                  parseInt(subEx.bHex.slice(0, -1) || '0', 16)
                ).toString(16).toUpperCase()}
              </li>
              <li className="font-semibold text-ink-navy">Result: {subEx.resultHex}</li>
            </ul>
          </div>
          <p className={`mt-3 ${pCls}`}>
            If the first number is smaller than the second, the result is
            negative — the calculator above shows this with a leading minus
            sign (e.g. subtracting {subEx.aHex} from {subEx.bHex} the other
            way round gives −{subEx.resultHex}).
          </p>
          <p className={takeawayCls}>
            Takeaway: borrowing in hex removes 1 from the next column and
            adds 16 (not 10) to the current one.
          </p>
        </section>

        <section aria-labelledby="multiplication" className="mt-10 scroll-mt-20">
          <h2 id="multiplication" className={h2Cls}>
            Hexadecimal multiplication explained
          </h2>
          <p className={pCls}>
            Single-digit hex multiplication is the one step that genuinely
            needs a times table memorised (or looked up), since the hex
            multiplication table goes up to F×F rather than 9×9:
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {mulEx.aHex} × {mulEx.bHex} = {mulEx.resultHex} ({mulEx.aDec} ×{' '}
              {mulEx.bDec} = {mulEx.resultDec} in decimal)
            </p>
          </div>
          <p className={`mt-3 ${pCls}`}>
            For multi-digit numbers, the method is the same long-multiplication
            grid taught for decimal — multiply by each digit of the second
            number separately, shift each partial result one column left, and
            add them up — only the per-digit multiplication table changes.
          </p>
          <p className={takeawayCls}>
            Takeaway: multi-digit hex multiplication is ordinary long
            multiplication with a base-16 times table instead of base-10.
          </p>
        </section>

        <section aria-labelledby="division" className="mt-10 scroll-mt-20">
          <h2 id="division" className={h2Cls}>
            Hexadecimal division explained
          </h2>
          <p className={pCls}>
            Division gives a whole-number quotient and a remainder, the same
            way long division does in decimal before fractions are
            introduced:
          </p>
          <div className="mt-4 rounded-xl border border-hairline bg-mist p-5 font-mono text-sm">
            <p>
              {divEx.aHex} ÷ {divEx.bHex} = {divEx.resultHex} remainder{' '}
              {divEx.remainderHex}
            </p>
            <p className="mt-1 text-ash/70">
              Check: {divEx.resultHex} × {divEx.bHex} + {divEx.remainderHex} ={' '}
              {divEx.aHex}
            </p>
          </div>
          <p className={`mt-3 ${pCls}`}>
            There is no universally standard way to write a fractional hex
            result, which is why this calculator — like most hex
            calculators — stops at the integer quotient and remainder rather
            than continuing past a decimal point.
          </p>
          <p className={takeawayCls}>
            Takeaway: a hex division result is a quotient and a remainder,
            not a decimal-style fraction.
          </p>
        </section>

        <section aria-labelledby="conversions" className="mt-10 scroll-mt-20">
          <h2 id="conversions" className={h2Cls}>
            Converting between hex, decimal, binary and octal
          </h2>
          <p className={pCls}>
            Every whole number has an exact representation in every base —
            converting changes only how it&apos;s written, never its value.
            One example, {convEx.hex} in hex, shown in all four:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">Base</th>
                  <th className="px-4 py-2 text-right font-semibold">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">Hexadecimal (base 16)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.hex}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Decimal (base 10)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.decimal}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Binary (base 2)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.binary}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Octal (base 8)</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{convEx.octal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={takeawayCls}>
            Takeaway: none of these bases is more &ldquo;correct&rdquo; than
            another — they are different notations for the same quantity.
          </p>
        </section>

        <section aria-labelledby="practical-uses" className="mt-10 scroll-mt-20">
          <h2 id="practical-uses" className={h2Cls}>
            Where hexadecimal actually shows up
          </h2>
          <ul className="mt-3 space-y-2 text-ash/80">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">Web colors</strong> — a
                color like <code className="font-mono">#FF5733</code> is
                three hex byte pairs: FF (red), 57 (green), 33 (blue), each
                from 00 to FF (0-255 in decimal).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">Memory addresses</strong> —
                debuggers and crash logs show memory locations in hex (like{' '}
                <code className="font-mono">0x7FFE1234</code>) because it is
                a far shorter, exact way to write a large binary address.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">MAC addresses</strong> — a
                network device&apos;s hardware address is conventionally
                written as six hex byte pairs separated by colons.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">Unicode code points</strong>{' '}
                — characters are identified by a hex number (e.g. U+1F600
                for 😀), since the ranges involved are large and binary would
                be unwieldy to read.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-tools" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink-navy">File &amp; error codes</strong>{' '}
                — many file-format signatures and system error codes are
                documented and displayed in hex for the same compact,
                exact-binary reason.
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            Takeaway: hex persists in computing specifically because it is a
            lossless, compact way to write binary — not out of habit.
          </p>
        </section>

        <section aria-labelledby="mistakes" className="mt-10 scroll-mt-20">
          <h2 id="mistakes" className={h2Cls}>
            Mistakes worth checking for
          </h2>
          <ul className="mt-3 space-y-2 text-ash/80">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">Letter O versus digit 0</strong>{' '}
                — hex uses only the digit 0, never the letter O. A value
                copied from somewhere that substituted one for the other will
                fail to parse.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">Reading hex digits as decimal</strong>{' '}
                — &ldquo;10&rdquo; in hex is sixteen, not ten. Always keep
                track of which base a number is written in rather than
                assuming decimal by default.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">Expecting a fractional division result</strong>{' '}
                — as covered above, this calculator (like most) gives a
                quotient and remainder for division, not a decimal-point
                fraction.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>
                ✕
              </span>
              <span>
                <strong className="text-ink-navy">Forgetting a fixed bit width matters for negatives</strong>{' '}
                — this calculator shows a negative subtraction result with a
                plain minus sign; a specific programming language or CPU
                register would instead wrap it using two&apos;s complement
                within its own fixed width, which can look like a different
                (large, positive) hex value.
              </span>
            </li>
          </ul>
          <p className={takeawayCls}>
            Takeaway: most hex errors are reading errors, not arithmetic
            errors — double-check which base you&apos;re looking at.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            More from this hub
          </h2>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-paper px-5 py-3 text-sm font-semibold text-hub-tools transition hover:border-hub-tools/50 hover:shadow-sm"
          >
            <span aria-hidden>🔢</span> See all number & conversion tools →
          </Link>
        </section>

        <section aria-labelledby="faq" className="mt-10 scroll-mt-20">
          <h2 id="faq" className={h2Cls}>
            Frequently asked questions
          </h2>
          <div className="divide-y divide-hairline">
            {faqs.map((f, i) => (
              <details key={i} className="group py-3">
                <summary className="cursor-pointer list-none font-medium text-ash marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-ash/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
