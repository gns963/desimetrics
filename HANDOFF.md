# DesiMetrics — Tariff Directory Feature: Handoff

_Last updated: 2026-09-09, mid-session. This file exists so work can be picked up cleanly by another session/person if needed. Update it as state changes; delete it once the feature is fully shipped and this becomes redundant with git history._

## Goal

Reference: **electricbill.in**, a competitor site, has a richer tariff-content section than we do. We're closing that gap. Two features, in priority order set by the user ("finish #1 first, then #2"):

1. **Multi-category Tariff Directory** — right now every DISCOM on desimetrics.com only has *residential* tariff data. electricbill.in shows every consumer category (Commercial, Industrial, Agriculture, Public Water Works, Public Services Govt/Pvt, EV Charging) per state, each with its own slab table + fixed charge/meter rent/duty breakdown. User decided (after scoping questions) to:
   - Cover **all 36 DISCOMs** (not just the 8 "hero" states we'd already translated).
   - Source data via **best-effort web research** (same standard as the earlier language-policy work — cite sources, never fabricate, skip and flag what can't be found).
   - Use a **simplified category set**: just `commercial`, `industrial`, `agriculture` (the existing schema enum) — no load-bracket splits (0-20kW/>20-50kW/etc.) like electricbill.in has. No new categories like "Public Water Works" or "EV Charging" for now.
2. **"Popular Bill Calculations" section** — a pre-computed worked-examples accordion (bills for 50/100/150/200/250/300/400/500/750/1000 units) per DISCOM, using our *existing* `computeBill()` engine and residential tariff data. Pure UI/presentation work, no new data needed. Good SEO play for long-tail "electricity bill for X units in Y" searches. **Not started yet** — can be built independently, in parallel with the tariff-directory work.

Lower-priority, not-yet-scoped items from electricbill.in (deferred, not currently being worked): a generic "What Are Slabs in Electricity Billing?" educational card, per-state "Energy Saving Tips" cards, "How It Works"/"About the Calculator" text blocks, "Why Use This Calculator?" checklist, multi-language/theme marketing blurb.

## Current state

### ✅ Done — schema + calc engine extended
- `src/data/tariffs/_schema.ts`: `ConnectionTypeSchema` gained optional `electricityDutyPercent`, `fuelCostAdjustment`, and `sourceNote` fields. **Why:** real tariff orders vary electricity duty by category (confirmed via the Maharashtra reference PDF: 16% on Domestic vs 21% on Commercial/Industrial) — without this, adding commercial/industrial data would silently compute wrong bills using the residential duty rate.
- `src/lib/calc/electricity.ts`: `computeBill()` now resolves duty/FCA as `connectionType-level override ?? file-level default`.
- Verified: `npx tsc --noEmit` clean, `npx tsx src/data/tariffs/_validate.ts` passes for all 36 files.

### ✅ Done — commercial/industrial/agriculture data population (all 36 DISCOMs)
Dispatched as 6 parallel research batches (subagents), each researching + writing directly into its assigned DISCOM JSON files, self-validating before finishing. Several batches hit **transient infra failures** along the way (session rate limit, DNS errors, stream stalls — not data/quality problems) and were resumed via `SendMessage` rather than restarted from scratch, so partial progress was preserved each time. Final check: `npx tsx src/data/tariffs/_validate.ts` → all 36 valid; `npx tsc --noEmit` → clean.

**Caveats already flagged inline (in each file's own `sourceNote`) by the research agents — read before building UI on top of this data:**
- Several DISCOMs' data is **secondary-sourced** (not the primary SERC/regulator order) — e.g. APSPDCL, BESCOM commercial, TNEB commercial, Manipur (MSPDCL), Haryana (UHBVN) industrial. Flagged per-file, not hidden.
- Some categories were **explicitly skipped** rather than guessed — the honest outcome when no reliable source existed:
  - Arunachal Pradesh (APDOP): agriculture
  - MSEDCL (Maharashtra): agriculture
  - Mizoram (PED-MZ): agriculture
  - Sikkim (EPD-SK): agriculture — genuinely doesn't exist as a tariff category there
  - Haryana (UHBVN): **commercial and agriculture both skipped** (only industrial was added) — no reliable per-unit rate found for either despite the search; UHBVN's own tariff PDFs are scanned images with no extractable text and herc.gov.in was unreachable during research. **This is the thinnest-covered DISCOM — worth a manual follow-up if Haryana traffic matters.**
- Real-world load-based tiers or per-HP billing (Gujarat's agriculture tariff, J&K/Rajasthan/Ladakh/MP/UP HP-based fixed charges, several states' commercial tiers) got collapsed to a single representative tier since our schema models consumption slabs, not load bands. Where a source billed per-HP, agents converted to per-kW using 1 HP = 0.746 kW and noted it in `sourceNote`.
- KSEB and TNEB commercial tariffs are non-telescopic in reality (whole bill re-priced at one slab's rate above a threshold) but our schema only supports telescopic slabs — same pre-existing limitation their residential entries already have, applied consistently to the new commercial entries.
- MSEDCL industrial duty has conflicting secondary figures (7.5% vs 9.3%) — no override was set, flagged low-confidence.
- Ladakh (LPDD)'s data is from a *proposed* tariff petition, not confirmed as the final approved order (their official PDF is a scanned image with no extractable text) — flagged in `sourceNote`.
- Meghalaya (MePDCL)'s new categories are FY2026-27 data, a different vintage than the file's existing residential entry — flagged in `sourceNote`.
- Uttar Pradesh (UPPCL) agriculture uses the pre-subsidy urban rate; most real UP tubewells are on a much cheaper subsidized rural schedule not modelled — flagged prominently in `sourceNote` as likely overstating typical agricultural bills.
- Odisha (TPCODL) and Tripura (TSECL) agriculture/industrial figures are pre-subsidy or use one representative HP/kVA tier among several — documented per-file.

### ✅ Done — Tariff Directory UI (#1 frontend)
User decided (after the architectural question above): **separate page**, not a new section on the existing calculator page. Built as:
- New route `src/app/electricity/[slug]/tariffs/page.tsx` — `generateStaticParams` over all 36 `allCalculatorSlugs`, `dynamicParams = false`, own metadata (title/description built from the tariff data, no hand-authored per-DISCOM copy needed).
- New component `src/components/calculators/TariffDirectoryPage.tsx` — renders one card per `connectionType` actually present in that DISCOM's tariff file (residential/commercial/industrial/agriculture, in that order — only what exists, never a hardcoded 4), each with its slab table + fixed charge/meter rent/duty/FCA breakdown (using the new per-category overrides from the schema change above) and that category's `sourceNote` if present. Summary strip (State/Utility Board/1-Unit-Rate/Categories count), a data-driven explainer section, an "Applicable Electricity Board" info card, 4 generic FAQ entries, and a disclaimer footer — all generated from the tariff data, no per-DISCOM hand-authoring required (unlike the main calculator pages).
- **Real bug caught and fixed during verification**: the hero intro and one FAQ answer originally hardcoded "Domestic, Commercial, Industrial[, Agriculture]" regardless of what data actually existed — so a thin-coverage DISCOM like Haryana (UHBVN, which only has Residential+Industrial) would have falsely implied it had Commercial data too. Fixed with a `joinCategoryLabels()` helper that only lists categories genuinely present. Verified live: MSEDCL (no agriculture) now correctly says "Domestic (Residential), Commercial and Industrial"; UHBVN correctly says "Domestic (Residential) and Industrial".
- Extracted `fixedChargeLabel()` from `DiscomCalculatorPage.tsx` into `src/lib/format.ts` so both pages share it instead of duplicating.
- Added a cross-link from the existing calculator page to the new tariffs page ("View Commercial, Industrial & Agriculture tariffs for {state} →"), gated to `locale === 'en'` only since the tariffs page is English-only for now.
- `sitemap.ts` gained `electricityTariffDirectory` (all 36 `/electricity/[slug]/tariffs` URLs, priority 0.7).
- Verified: `npx tsc --noEmit` clean, `npx eslint` clean on all changed files, and a full `npm run build` succeeded (555/555 static pages generated, including all 36 new tariff-directory pages) with no errors.
- **Deliberately deferred, not done in this pass**: Hindi (or any other locale) translation of this new page type — ships English-only for now, consistent with how every other feature started English-first before its dedicated translation pass. When it's time to translate, follow the same "EN+HI mandatory" policy as everything else.

### ✅ Done — "Popular Bill Calculations" (#2)
New component `src/components/calculators/PopularBillCalculations.tsx`, added as a section on the existing `DiscomCalculatorPage.tsx` (not the tariffs-directory page — this one's about the calculator's own worked examples, so it lives with the calculator), positioned right after the existing "Two Worked Examples" section.
- Accordion (native `<details>`/`<summary>`, first row open by default) of 10 pre-computed unit levels (50/100/150/200/250/300/400/500/750/1000), each row computed live via the existing `computeBill()` — no new data. Expanded content shows the slab-wise energy-charge breakdown table and a detailed-charges summary (energy/subsidy/meter rent/fixed/duty/FCA) + total, mirroring the electricbill.in reference layout in our own visual language.
- Gated to `locale === 'en'` only, same as the tariffs-directory cross-link — consistent "ship English first" approach for this session's new features.
- Verified: `tsc`/`eslint` clean, section renders correctly and is fully absent on `/hi/...` pages, full production build succeeds.

**Both #1 and #2 from the original priority list are now complete.**

### ✅ Done — Tariff Directory hub page (added 2026-09-10)
User later shared more electricbill.in screenshots (their `/en/tariffs` index page — a grid of one card per state, each with Regulator/category-count/last-updated + a "View Tariff" button linking to that state's own tariff page) and asked for the equivalent. We already had the per-DISCOM tariff pages and the calculator→tariff cross-link; the missing piece was the index/hub itself. Built:
- `src/app/electricity/tariffs/page.tsx` — static route (coexists fine with the dynamic `src/app/electricity/[slug]/tariffs/page.tsx`; Next.js resolves the static segment first, confirmed no DISCOM slug is literally `"tariffs"`). Lists all 36 DISCOMs as cards (State, Verified badge, Utility Board = discomCode, category count, last-updated, "View Tariff →" linking to `/electricity/[slug]/tariffs`), sorted alphabetically by state. Deliberately did **not** add a separate "Regulator" field — we don't have one reliably in the data model (unlike electricbill.in) and didn't want to fabricate or mislabel it; `discomCode` covers the "which board" question.
- Linked from the existing `/electricity` hub page (a prominent card right below the hero) for discoverability.
- `sitemap.ts` gained the `/electricity/tariffs` entry.
- Verified: `tsc`/`eslint` clean, all 36 cards render with correct links, full production build succeeds.
- The individual Andaman & Nicobar screenshot the user shared also confirmed electricbill.in's per-state pages go deeper than ours (Public Utility, EV Charging, High Tension, Temporary categories, load-bracket splits) — this is the "simplified set" tradeoff the user explicitly chose earlier in this project; noted here again in case it's revisited later, but nothing was changed.

Remaining backlog (not started, not requested yet): the lower-priority generic electricbill.in blocks (What Are Slabs explainer, Energy Saving Tips, How It Works/About, Why Use This, multi-language blurb), translating the tariff-related pages/sections (Tariff Directory hub + detail pages, Popular Bill Calculations) into Hindi and the other locales per the site's EN+HI-mandatory policy, and — if ever revisited — going deeper on categories/load-brackets to match electricbill.in's per-state depth.

## Nothing has been committed

Last commit on `main` is from **2026-09-06**. Everything since — this tariff-directory work, plus the entire earlier state-by-state translation rollout (Hindi mandatory policy, Maharashtra/TN/Telangana+AP/Karnataka/WB/Gujarat/Kerala-Malayalam translations, i18n manifest, SEO audit fixes) — is uncommitted in the working tree. See prior conversation for the full list; nothing here should be assumed safe until it's actually committed.

## Key files

- Tariff data: `src/data/tariffs/*.json` (one per DISCOM) — schema in `src/data/tariffs/_schema.ts`, validator `npx tsx src/data/tariffs/_validate.ts`
- Calc engine: `src/lib/calc/electricity.ts` (`computeBill`, `tariffRegistry`)
- Per-DISCOM page content: `src/data/calculator-pages.tsx`, rendered by `src/components/calculators/DiscomCalculatorPage.tsx`
- i18n manifest (unrelated to this feature, but touched heavily in recent sessions): `src/lib/i18n-alternates.ts`

## Reference material

The competitor screenshots/PDF (electricbill.in's `/tariffs` and `/tariffs/maharashtra` pages) were reviewed in full during this session then deleted from the repo (they'd been dropped at the project root for review) — full descriptive notes are in the conversation history if the actual images are needed again. Ask the user for the originals if you need to re-inspect the reference design directly.
