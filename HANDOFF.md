# DesiMetrics — Financial Hub Parity + Content Quality: Handoff

_Last updated: 2026-09-26. This file exists so work can be picked up cleanly by another
session/person. Update it as state changes; delete it once this thread is fully wrapped up and
redundant with git history. Supersedes the previous version of this file, which covered the
Tariff Directory feature — that work shipped (commit `076aa0f`) and is no longer active; see git
log if you need its history._

## Goal

Two goals, pursued back-to-back in this thread:

1. **Financial-hub feature parity** with calcwise.finance (a competitor finance-calculator site),
   plus closing any genuine gaps found in DesiMetrics' own pre-existing calculators along the way.
2. **Content quality across the whole site** — triggered when the user compared screenshots of our
   calculators against competitors' and found ours thinner/less complete, then separately flagged
   that newer calculators had noticeably less prose than older ones (target: 500-800+ words of real
   explainer content per tool, not just the calculator widget).

## Current state — both goals are DONE and shipped; site is in a good, consistent state

**30 financial calculators live**, up from 12 at the start of this thread. Everything is committed
and pushed to `main` (`github.com/gns963/desimetrics`); `git status` is clean (only 4 unrelated
screenshot files from an earlier user message remain untracked in the repo root — not part of any
active work, safe to ignore or let the user clean up).

### Phase 1 — calcwise.finance parity (D-35 through D-40)

- **D-35/D-36**: GST and SIP calculators expanded against calcwise (page-content pass).
- **D-37**: 7-calculator batch from user screenshots — Capital Gains, Tax Regime, GST, Home Loan
  EMI, Personal Loan EMI, PPF, FD, Gratuity.
- **D-38**: HRA (FY2026-27 8-city metro expansion + Section 80GG), NPS (premature-exit reversal +
  Section 10(12B) partial withdrawal), Human Life Value (lump-sum goals + income-multiplier check).
- **D-39**: FIRE, Net Worth, Crorepati, BH Series, EV vs Fuel Cost, Retirement Planner — 6 net-new
  calculators after discovering calcwise's homepage-linked tools weren't their full catalog.
- **D-40**: 12 more calculators (EPF, Sukanya Samriddhi Yojana, CTC to In-Hand Salary, Rent vs Buy,
  Car/Two-Wheeler/Education Loan EMI, Health Insurance 80D, Surcharge & Marginal Relief, Recurring
  Deposit, NCB & IDV) after a full-catalog research pass. **Also fixed a real bug**: income tax
  surcharge (above ₹50L) and its own marginal relief are now computed inside `computeRegimeTax()`
  itself, not just flagged as "not modelled."

### Phase 2 — content-quality audit, triggered by user screenshots (D-41 through D-43)

The user shared screenshots comparing our SSY and BH-series/road-tax calculators against
competitors' equivalents and said the site felt incomplete. This turned into a full audit:

- **D-41**: 17 of the newer calculators (car/two-wheeler/education-loan EMI, EPF, SSY, Crorepati,
  Retirement Planner, FIRE, NCB/IDV, BH Series, EV vs Fuel Cost, CTC-in-hand, Health Insurance 80D,
  Surcharge & Marginal Relief, Net Worth, Rent vs Buy, RD) were genuinely thin — enriched via 4
  parallel forks, each brought from 4-8 FAQs to 9-12, with new comparison tables/worked examples.
  Verified word counts 751-1273 per page.
- **D-42**: cross-linked the 12 **original** calculators (pre-dating the 17 above) forward into the
  newer ones — e.g. SIP → Crorepati, Home Loan EMI → Rent vs Buy, PPF → EPF/SSY. 11 pages touched.
- **D-43**: a systematic field-usage audit (grep each component's rendered `.fieldName` references
  against its TypeScript interface) found 2 real display bugs — EPF and SSY both computed a
  `yearly` balance array that was never rendered. Fixed both to show a bar chart matching the
  SIP/PPF/FD/NPS pattern.

### Phase 3 — Gujarat Road Tax Calculator (D-45)

Road Tax had been explicitly **excluded** in Phase 1 (state-wise sources disagreed with each
other). Re-attempted with more rigor per user's explicit choice (AskUserQuestion): a 15-state
primary-source-only research pass found only Gujarat's rate on a machine-readable official
`.gov.in` source — everywhere else was scanned-image/GIF-embedded tables. Built narrow and honest,
per the user's explicit scope choice: **`gujarat-road-tax-calculator`** (flat 6% for petrol/
diesel/CNG; explicit "rate not confirmed" message for electric, since Gujarat's 1% EV concession
expired 31 March 2026 with no replacement notified) plus a Maharashtra EV-exemption informational
note and a BH-series comparison panel. Cross-linked with `bh-series-calculator`.

### Phase 4 — 6 blog posts (D-44, D-46 through D-50)

User supplied 6 detailed writing briefs one at a time. All are live at `/blog/<slug>`, cross-linked
into the relevant hub and into each other where topically adjacent:

1. `png-piped-gas-bill-guide-india` (D-44) — PNGRB Jan 2026 tariff reform.
2. `net-metering-explained-india` (D-46).
3. `geyser-water-heater-running-cost-india` (D-47).
4. `how-to-reduce-electricity-bill-india` (D-48) — pillar/navigation article, sitemap priority 0.7.
5. `refrigerator-electricity-consumption-india` (D-49) — also fixed a real cross-page consistency
   issue (this post's frost-free-specific kWh figures vs the existing fridge-cost-calculator's
   lower type-unspecified range) by adding an explicit reconciling sentence rather than letting two
   numbers silently disagree.
6. `rooftop-solar-system-cost-india` (D-50) — cost-by-system-size table, hedged Maharashtra-vs-UP
   illustrative payback example, hedged state-top-up-subsidy note.

Deliberately declined tool ideas, with reasoning (see disclaimer page + D-40 for full context):
- **Bank-branded EMI calculators** (Axis/SBI/HDFC/etc.) — implies endorsement we don't have.
- **Insurance premium calculators** (term/health/motor-OD) — insurer-specific actuarial pricing,
  not a published formula (unlike NCB/IDV, which ARE IRDAI-standardised and thus buildable).

## Not started — next up, paused pending user go-ahead

**Water/gas board tariff-data coverage** — verified via WebFetch on real competitor page listings
(not marketing-copy claims):
- **Water**: DesiMetrics has 5 boards live; competitors' real dedicated-page count is only 6
  (BWSSB/Bangalore, Chennai, Delhi, Mumbai, Pune, Hyderabad) — missing BWSSB/Bangalore and genuine
  Mumbai/Pune coverage. Small, tractable gap.
- **Gas**: DesiMetrics already has **23 live CGD landing pages** (`src/data/gas-companies.ts`) —
  parity with competitors on page count. The real gap: only 3 of those 23 (GGL/Gujarat, IGL/Delhi,
  MNGL/Maharashtra) have verified pre-filled tariff data; the other ~20 are generic "enter your own
  rate" calculators. Task is "add verified tariff data," not "build new pages."

User's decision (2026-09-25): do both eventually, gas first, same rigor as the 36 DISCOM
calculators (verified data per board, EXCLUDE-with-reason for anything unverifiable) — but deferred
to do the 6 blog posts first. **That blog-post work is now done — this is the next thing to raise
with the user, not to start unprompted.** Full detail in
`~/.claude/projects/-Users-ganeshkolekar/memory/project_desimetrics_water_gas_coverage_todo.md`.

Two bigger, explicitly-parked strategic bets (user said "hold off," don't start without checking
in): an **AI Bill Explainer** (OCR + LLM) and a **Government Scheme Eligibility Checker**
(structured data across 28 states/8 UTs). Both are separate product initiatives, not routine
calculator/content work.

## Key files

- Calc logic: `src/lib/calc/financial.ts` (all pure functions, extensively tested) and its test
  suite `src/lib/calc/financial.test.ts` (210 tests as of the last run — always add tests for new
  functions in this file, following the existing `describe()` pattern per function).
- Calculator UI components: `src/components/calculators/*Calculator.tsx` — one per tool, built on
  shared primitives in `src/components/calculators/CalculatorShell.tsx`.
- Calculator pages: `src/app/financial/<slug>/page.tsx` — each self-contained (metadata, worked
  example, FAQ array + FAQPage JSON-LD, WebApplication JSON-LD, breadcrumb JSON-LD).
- Blog posts: `src/app/blog/<slug>/page.tsx` — same JSON-LD pattern (Article/FAQPage/BreadcrumbList)
  plus shared `h2Cls`/`pCls`/`takeawayCls` className constants; registered in
  `src/app/blog/page.tsx`'s `posts` array and `src/app/sitemap.ts`.
- Hub listing + cross-linking: `src/app/financial/page.tsx` (card grid + hero stats) and
  `src/components/FinancialCrossSell.tsx` (the "other calculators" block on every calculator page)
  — **both must be updated whenever a calculator is added or removed**, or the count/links drift.
- Site-wide legal pages that reference calculator specifics: `src/app/disclaimer/page.tsx`,
  `src/app/data-sources/page.tsx`.
- `TaxRegimeCalculator.tsx`'s `texts` prop is shared with a live Hindi page
  (`src/app/hi/financial/new-vs-old-tax-regime-calculator/page.tsx`) — any new field added to
  `TaxRegimeCalculatorTexts` MUST be optional with an English fallback. `GratuityCalculator.tsx` has
  the same Hindi-dependency constraint (a separate `GratuityCalculatorAdvanced.tsx` exists for
  English).
- PageHero `hub` prop exact values (a real gotcha): `"solar"`, `"gas"`, `"electricity"`,
  `"appliance"` (singular!), `"ac"`, `"financial"`.

## Verification pattern (follow this for any future work)

For every new/changed page: `./node_modules/.bin/tsc --noEmit`, `./node_modules/.bin/eslint` on
changed files (use the direct binary path — bare `npx tsc` intermittently fails in this repo's
environment), `npm test -- --run`, `npm run build` (confirm new routes appear in the manifest,
`pkill -f "next dev"` first to avoid a stale dev server on port 3000 from an unrelated project
causing false 404s), then a fresh dev server + curl 200-checks + rendered-HTML checks: FAQ count via
`grep -o "<details" file | wc -l` (NOT `grep -c`, which counts matching lines not occurrences on
minified SSR output), word count via fetching the rendered HTML, stripping `<script>` then all HTML
tags from the `<main>` section, and counting whitespace-split words (NOT a string-literal regex,
which drastically undercounts JSX prose). Any claim about tax law, government scheme rules, or
regulated figures gets verified via WebSearch BEFORE writing — never asserted from training-data
memory. If a claim can't be verified to a defensible standard, exclude it and say why (see Road
Tax's Gujarat-only scope) rather than guessing.

## Reference

Full decision history with the "why" behind every choice: D-35 through D-50 in
`~/Projects/semantic-seo-content-system/projects/bijlicalc/DECISION-LOG.md`.
