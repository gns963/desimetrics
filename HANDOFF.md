# DesiMetrics — Financial Hub Parity + Content Quality: Handoff

_Last updated: 2026-09-28. This file exists so work can be picked up cleanly by another
session/person. Update it as state changes; delete it once this thread is fully wrapped up and
redundant with git history. Supersedes the previous version of this file, which covered the
Tariff Directory feature — that work shipped (commit `076aa0f`) and is no longer active; see git
log if you need its history._

## Goal

Two goals from the original thread, now joined by a third (per-category word-count pass) that's
actively in progress:

1. **Financial-hub feature parity** with calcwise.finance — DONE (see Phase 1-4 below).
2. **Content quality across the whole site** — original pass DONE (Phase 2), but the user
   re-scoped the word-count bar mid-thread (see "Word-count definition" below) and asked for a
   **category-by-category re-pass** against the new, stricter definition. This is the active work.
3. **Infra**: a broken production deploy (Turbopack build failure on Hostinger) got fixed along the
   way, and a separate, non-blocking `www` subdomain routing bug got diagnosed (not fixed — needs
   Hostinger human support, user deferred it as non-urgent). Both documented below.

## Word-count definition (the operative one — supersedes anything in Phase 1-4 below)

User's exact bar, confirmed 2026-09-26/27: **800-1000+ words of genuine body prose per calculator
page**, counting everything EXCEPT five fixed things: the hero section (`<PageHero .../>`), the
`<section aria-labelledby="calculator">` block (the widget itself), the "related calculators"
block (`FinancialCrossSell` component, or the inline `<section aria-labelledby="related">` grid
used outside `/financial`), the FAQ section, and the site footer. Worked-example, explainer
sections, tables, and best-practices/mistakes sections all count.

**Do not use a raw string-literal or whole-page word count** — it either over-counts (includes FAQ
answers, table cell labels, metadata) or under-counts (a regex like `[^<>{}\n]{20,}` for JSX text
nodes MISSES any plain multi-line `<p>...</p>` paragraph with no embedded `{}` expression, because
prettier wraps long prose across lines and the `\n` inside breaks the match — this bug cost real
time this session before being caught). The correct method: strip `<PageHero.../>`, the
`calculator`/`related`/`faq` `aria-labelledby` sections (balanced-tag stripping, not blind regex to
end-of-file), metadata object, and `<script>` blocks, THEN count words in remaining string literals
(≥5 words) and JSX text nodes (≥20 chars, **no `\n` in the exclusion set**). A working version of
this script was used throughout this session — reconstruct from this description if it's not saved
anywhere; it wasn't committed to the repo (was a scratch `/tmp/wc_*.py` file each time).

## Current state — categories done vs. remaining

| Category | Status | Commit |
|---|---|---|
| Financial (30 calculators) | ✅ Done — original Phase 2 pass, then 8 more pages re-expanded under the stricter definition (gujarat-road-tax, rd, crorepati, sukanya-samriddhi, two-wheeler-loan-emi, health-insurance-80d, surcharge-marginal-relief, education-loan-emi) | `5950689` |
| Appliances (10 calculators) | ✅ Done — 9 of 10 expanded (household-bill-builder was already ≥800w, untouched) | `159de87` |
| Fuel-cost (3 calculators, at `/fuel-cost`, not `/fuel`) | ✅ Done — all 3 expanded | `f956f28` |
| Electricity — EV Charging Cost Calculator only | ✅ Done (this one page was flagged separately by the user, out of category order) | `0c9af54` |
| Electricity — everything else | ⬜ Not started | — |
| Water | ⬜ Not started | — |
| Gas | ⬜ Not started | — |
| Solar (roi-calculator was already done earlier; this pass covered the other 5) | ✅ Done — bill-calculator, subsidy-calculator, battery-backup-calculator, panel-size-calculator, net-metering-calculator all expanded to 800-1034w | `bf2bc71` |
| AC | ⬜ Not started | — |

**Process that worked well for the categories already done**: measure word count for every page in
the category first (identify which are actually short — don't assume), then dispatch one
`subagent_type: "fork"` per short page IN PARALLEL, each with an explicit single-file scope
("work ONLY on this file, do not touch siblings even if you see them being edited concurrently") —
this matters because a stray fork in the appliances pass ignored its scope and touched 2 files
assigned to other forks; it happened to merge cleanly but don't rely on that. After forks return,
re-verify with a full `tsc --noEmit` + `eslint` + clean `npm run build`, then a real render check
(start a local prod server, curl + grep for the new section headings) before committing — a build
succeeding is not proof the content actually renders; case-sensitivity/scope bugs from forks have
slipped through tsc before. **Also watch for a session-wide rate limit**: mid-session on
2026-09-28, 6 of 9 parallel appliance forks got cut off by "You've hit your session limit" — check
`git diff --stat` per file afterward for incomplete edits (look for unused-variable lint warnings,
half-finished JSX) rather than assuming all forks completed cleanly.

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
  Verified word counts 751-1273 per page. **Note**: this count used the whole-page method, not the
  stricter fixed-sections-excluded definition adopted later — several of these pages still needed a
  second pass in the 2026-09-28 session (see table above).
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

### Session 2026-09-26 to 2026-09-28 — category-by-category word-count re-pass (this session)

Fresh session (prior context had been cleared), user re-stated the word-count requirement and it
turned out to need refinement (see "Word-count definition" above — took a couple of rounds to
converge on the exact fixed-sections list via `AskUserQuestion`). Work done in this session:

- Re-audited and expanded 8 financial pages under the refined definition (table above).
- Full appliances category: 9 of 10 pages expanded (table above). Hit a session-wide rate limit
  mid-batch; recovered by finishing the 3 still-short files directly rather than re-dispatching
  forks, and fixed one real TS error (`key={t}` typed as `string | React.ReactNode` after a fork
  half-converted a bullet-list item to JSX) left by an interrupted fork.
- Full fuel-cost category: all 3 pages expanded.
- EV Charging Cost Calculator (electricity category, called out by name by the user): expanded —
  it had NO "how this is calculated" section at all before this pass.
- **Deploy bug fixed**: after the fuel-cost commit, Hostinger's auto-deploy (GitHub-connected,
  confirmed via hPanel screenshot — deploys on every push to `main`) failed twice with
  `TurbopackInternalError` on `src/app/globals.css` — a child Node process Turbopack spawns for the
  PostCSS/Tailwind transform exited before Turbopack could connect to it. Never reproduced locally
  (clean `rm -rf .next` + `npm run build` always succeeded). Fixed by changing
  `package.json`'s `"build"` script from `"next build"` to `"next build --webpack"` — Next 16's
  documented Turbopack fallback. **Do not revert this without first confirming Hostinger's build
  environment can handle Turbopack's CSS-transform subprocess** — the failure was 100% consistent
  (2/2 Hostinger build attempts) despite never reproducing on macOS. `next dev` still uses
  Turbopack; only the production build changed. Commit `4cc8789`.
- **`www` subdomain routing bug — diagnosed, NOT fixed, deferred as non-urgent by user.** Full
  detail below under "Known issues."

## Known issues — deferred, not blocking

### `www.desimetrics.com` returns a broken redirect (non-urgent, user's call)

`https://www.desimetrics.com/*` returns an HTTP 308 to `https://desimetrics.com:3000/*` (an
internal app port, not publicly reachable) which then 403s. `https://desimetrics.com/*` (no `www`)
works correctly. Full diagnosis trail (don't re-investigate from scratch):

- **Not a code issue**: no `middleware.ts` exists, `next.config.ts` has no `redirects()`, every
  page's `canonical` metadata already correctly points to non-`www` `SITE = 'https://desimetrics.com'`,
  and `sitemap.xml` only lists non-`www` URLs. Verified via direct `curl -I` against the live site.
- **Google indexing is NOT affected** — confirmed via `site:https://desimetrics.com/` search
  results, all non-`www`, all correct. This is why the GSC "Alternate page with proper canonical
  tag" report (106 URLs, mix of hub pages/state calculators/tariff subpages/query-param variants)
  is not an SEO problem — Google is correctly deduplicating `www` in favor of the canonical
  non-`www` version. The only real cost is broken UX for anyone who actually lands on `www.*`.
- **Registrar**: Namecheap (confirmed via WHOIS). **DNS**: genuinely hosted by Hostinger
  (nameservers `aurora.dns-parking.com` / `nebula.dns-parking.com`, and hPanel's own UI labels
  these "Hostinger Nameservers") — so DNS-registrar mismatch is NOT the blocker it first appeared
  to be, contrary to what Hostinger's AI support agent initially claimed.
- **Self-service paths all ruled out**, in order tried:
  1. hPanel's "Redirects" tool (Domains → Redirects) — the "Redirect" (from-domain) field is
     locked/greyed to the apex domain, not editable to target `www` specifically.
  2. Hostinger AI agent tried attaching `www` as a domain alias to the Node.js app — rejected:
     "www subdomains use a different Hostinger mapping flow."
  3. Hostinger AI agent tried creating `www` as a hosting subdomain served from the same directory
     — rejected: "www is a reserved hostname, cannot be created as a normal subdomain or alias."
  4. Retargeted the `www` CNAME DNS record (Domains → DNS/Nameservers) from
     `www.desimetrics.com.cdn.hstgr.net` to `desimetrics.com.cdn.hstgr.net` (matching the working
     apex `ALIAS` record's target exactly) — propagated correctly (confirmed via `dig`) but the
     HTTP behavior didn't change. **This proves Hostinger's CDN routes by HTTP Host header, not by
     DNS target** — the `www` hostname itself isn't bound to this site on their backend, regardless
     of where its DNS record points.
  5. Checked available DNS record types (A/AAAA/CNAME/MX/SRV/TXT/CAA) — no "URL Redirect" /
     forwarding record type exists, so a DNS-layer-only fix isn't available either.
- **Actual fix requires a human Hostinger support agent** (not their AI chat agent, which hit a
  hard permission wall it couldn't override) to either manually bind `www.desimetrics.com` to the
  Node.js app on their backend, or configure a redirect at their CDN/reverse-proxy layer that
  doesn't expose the internal port. A ready-to-paste support message (with the full diagnosis
  trail above) was drafted for the user but **not yet sent — user decided this is low-priority**
  since indexing/rankings are unaffected. Revisit if: (a) the user wants to polish this eventually,
  or (b) any `www`-prefixed backlinks/marketing materials are discovered that would actually route
  real traffic into the broken redirect.
- One inconsequential leftover: the `www` CNAME DNS record is currently pointed at
  `desimetrics.com.cdn.hstgr.net` (changed during step 4 above) instead of its original
  `www.desimetrics.com.cdn.hstgr.net`. Functionally equivalent (both broken the same way) — fine to
  leave, or revert for cleanliness, doesn't matter until the real fix happens.

## Not started — next up, paused pending user go-ahead

**Electricity/Water/Gas/Solar/AC word-count re-pass** — continue the category-by-category process
described above, in whatever order the user wants next (they were doing financial → appliances →
fuel-cost → [EV charging out of order] when this session paused). Re-run the word-count audit
script per category first; don't assume every page needs work — in fuel-cost only 3/3 needed it,
in financial only 8 of ~30 did.

**Water/gas board tariff-data coverage** — verified via WebFetch on real competitor page listings
(not marketing-copy claims), still not started as of this handoff:
- **Water**: DesiMetrics has 5 boards live; competitors' real dedicated-page count is only 6
  (BWSSB/Bangalore, Chennai, Delhi, Mumbai, Pune, Hyderabad) — missing BWSSB/Bangalore and genuine
  Mumbai/Pune coverage. Small, tractable gap.
- **Gas**: DesiMetrics already has **23 live CGD landing pages** (`src/data/gas-companies.ts`) —
  parity with competitors on page count. The real gap: only 3 of those 23 (GGL/Gujarat, IGL/Delhi,
  MNGL/Maharashtra) have verified pre-filled tariff data; the other ~20 are generic "enter your own
  rate" calculators. Task is "add verified tariff data," not "build new pages."

Full detail in
`~/.claude/projects/-Users-ganeshkolekar/memory/project_desimetrics_water_gas_coverage_todo.md`.

Two bigger, explicitly-parked strategic bets (user said "hold off," don't start without checking
in): an **AI Bill Explainer** (OCR + LLM) and a **Government Scheme Eligibility Checker**
(structured data across 28 states/8 UTs). Both are separate product initiatives, not routine
calculator/content work.

## Key files

- Calc logic: `src/lib/calc/financial.ts`, `src/lib/calc/appliance.ts`, `src/lib/calc/fuel.ts`,
  `src/lib/calc/ev.ts`, `src/lib/calc/cooling.ts`, `src/lib/calc/inverter.ts`,
  `src/lib/calc/watertank.ts` — all pure functions, extensively tested (`*.test.ts` siblings, 210+
  tests as of the last full run — always add tests for new functions, following the existing
  `describe()` pattern per function).
- Calculator UI components: `src/components/calculators/*Calculator.tsx` — one per tool, built on
  shared primitives in `src/components/calculators/CalculatorShell.tsx`.
- Calculator pages: `src/app/<hub>/<slug>/page.tsx` (hubs: `financial`, `appliances`, `fuel-cost`,
  `electricity`, `water`, `gas`, `solar`, `ac`) — each self-contained (metadata, worked example,
  FAQ array + FAQPage JSON-LD, WebApplication JSON-LD, breadcrumb JSON-LD). Section IDs are
  consistent within a hub but NOT identical across hubs — e.g. financial pages use
  `FinancialCrossSell` as a shared component for "related," while appliances/fuel-cost pages use an
  inline `<section aria-labelledby="related">` grid instead. Check the actual file before assuming
  a pattern.
- Blog posts: `src/app/blog/<slug>/page.tsx` — same JSON-LD pattern (Article/FAQPage/BreadcrumbList)
  plus shared `h2Cls`/`pCls`/`takeawayCls` className constants; registered in
  `src/app/blog/page.tsx`'s `posts` array and `src/app/sitemap.ts`.
- Hub listing + cross-linking: `src/app/financial/page.tsx` (card grid + hero stats) and
  `src/components/FinancialCrossSell.tsx` (the "other calculators" block on every financial-hub
  page) — **both must be updated whenever a calculator is added or removed**, or the count/links
  drift.
- Site-wide legal pages that reference calculator specifics: `src/app/disclaimer/page.tsx`,
  `src/app/data-sources/page.tsx`.
- `TaxRegimeCalculator.tsx`'s `texts` prop is shared with a live Hindi page
  (`src/app/hi/financial/new-vs-old-tax-regime-calculator/page.tsx`) — any new field added to
  `TaxRegimeCalculatorTexts` MUST be optional with an English fallback. `GratuityCalculator.tsx` has
  the same Hindi-dependency constraint (a separate `GratuityCalculatorAdvanced.tsx` exists for
  English).
- PageHero `hub` prop exact values (a real gotcha): `"solar"`, `"gas"`, `"electricity"`,
  `"appliance"` (singular!), `"ac"`, `"financial"`, `"fuel"`.
- `package.json`'s `"build"` script is `"next build --webpack"`, NOT plain `"next build"` — see
  "Session 2026-09-26 to 2026-09-28" above. Don't revert without reading that note first.

## Verification pattern (follow this for any future work)

For every new/changed page: `./node_modules/.bin/tsc --noEmit`, `./node_modules/.bin/eslint` on
changed files (use the direct binary path — bare `npx tsc` intermittently fails in this repo's
environment), `npm test -- --run`, `npm run build` (confirm new routes appear in the manifest,
`pkill -f "next dev"`/kill anything on the port first to avoid a stale server causing false
results). Then start a real production server (`npm start -- -p <free-port>`) and:
- `curl -s -o /dev/null -w "%{http_code}"` every touched page — confirm 200.
- `curl -s <url> | grep -o "<new section heading text>"` for each new section you added — confirms
  it actually renders, not just that the build succeeded (a build succeeding is NOT proof of
  correct rendering — this session caught a real TS-masked bug and a stale-build false-negative
  this way).
- Word count using the fixed-sections-excluded method described in "Word-count definition" above —
  NOT a naive whole-page count, and NOT the old string-literal-only regex (both produce wrong
  numbers, in opposite directions).

Any claim about tax law, government scheme rules, regulated figures, or specific device/appliance
specs (wattage, efficiency %, etc.) gets grounded in the relevant `lib/calc/*.ts` file or something
already stated in the page itself — never asserted from training-data memory or invented for word
count. If a claim can't be verified to a defensible standard, exclude it and say why (see Road
Tax's Gujarat-only scope) rather than guessing.

After verification, commit with a message describing the word-count before/after per file and what
sections were added, then `git push origin main` — **this repo auto-deploys to production on every
push to `main`** (Hostinger, GitHub-connected, confirmed via hPanel). There is no separate staging
step; a bad push goes live once Hostinger's build succeeds. Always confirm the local build is clean
before pushing.

## Reference

Full decision history with the "why" behind every choice: D-35 through D-50 in
`~/Projects/semantic-seo-content-system/projects/bijlicalc/DECISION-LOG.md`. That log was NOT
updated with this session's work (2026-09-26 to 2026-09-28) — this HANDOFF.md is the only record
of it. If continuing the semantic-seo methodology formally, backfill D-51+ there from this file.
