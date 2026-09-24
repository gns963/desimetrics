# DesiMetrics — Financial Calculator Hub: Handoff

_Last updated: 2026-09-25. This file exists so work can be picked up cleanly by another
session/person. Update it as state changes; delete it once this thread is fully wrapped up and
redundant with git history. Supersedes the previous version of this file, which covered the
Tariff Directory feature — that work shipped (commit `076aa0f`) and is no longer active; see git
log if you need its history._

## Goal

Bring DesiMetrics' financial hub to feature parity with **calcwise.finance**, a competitor
finance-calculator site, then close any genuine gaps found along the way (including gaps in our
own pre-existing calculators, not just missing tools). This started from user-shared screenshots
of 9 calcwise tools, then expanded twice: once to the 3 financial calculators we hadn't compared
yet (HRA/NPS/HLV), then to calcwise's full ~293-tool catalog once its homepage-only comparison
turned out to undercount what they actually offer.

## Current state — financial hub work is DONE and shipped

**29 financial calculators live**, up from 12 at the start of this thread. Everything is committed
and pushed to `main` (`github.com/gns963/desimetrics`); `git status` is clean as of this writing.

Full run order (see `~/Projects/semantic-seo-content-system/projects/bijlicalc/DECISION-LOG.md`
D-35 through D-40 for the complete decision history):

- **D-35/D-36**: GST and SIP calculators expanded against calcwise (page-content pass).
- **D-37**: 7-calculator batch from user screenshots — Capital Gains, Tax Regime, GST, Home Loan
  EMI, Personal Loan EMI, PPF, FD, Gratuity.
- **D-38**: HRA (FY2026-27 8-city metro expansion + Section 80GG), NPS (premature-exit reversal +
  Section 10(12B) partial withdrawal), Human Life Value (lump-sum goals + income-multiplier check).
- **D-39**: FIRE, Net Worth, Crorepati, BH Series, EV vs Fuel Cost, Retirement Planner — 6 net-new
  calculators after discovering calcwise's homepage-linked tools weren't their full catalog. Road
  Tax / Motor Vehicle Tax was **deliberately excluded** (state-wise sources disagreed with each
  other; see disclaimer page for the stated reason). Also fixed a stale site-wide disclaimer/
  data-sources pass in this same round (commit `990b1c9`) after the user flagged it as important —
  do this kind of audit periodically, not just when told.
- **D-40**: 12 more calculators (EPF, Sukanya Samriddhi Yojana, CTC to In-Hand Salary, Rent vs Buy,
  Car/Two-Wheeler/Education Loan EMI, Health Insurance 80D, Surcharge & Marginal Relief, Recurring
  Deposit, NCB & IDV) after a full-catalog research pass (calcwise has 293 tools across 8
  categories: Investment/Tax/Loan/Government Schemes/Insurance/Business/Real Estate/Utility).
  **This also fixed a real bug**: income tax surcharge (above ₹50L) and its own marginal relief are
  now computed inside `computeRegimeTax()` itself, not just flagged as "not modelled" — this
  transparently corrects `totalTax` for every existing caller.
- **Post-D-40 cleanup**: fixed an off-by-one in the hub's calculator count (was showing 30, actual
  is 29) — caught during this handoff audit, commit `7624765`.

Deliberately declined, with reasoning (see disclaimer page + D-40 for full context):
- **Road Tax / Motor Vehicle Tax** — state data too inconsistent to verify.
- **Bank-branded EMI calculators** (Axis/SBI/HDFC/etc.) — implies endorsement we don't have, plus
  ongoing rate-tracking burden with no methodological upside over a generic EMI calculator.
- **Insurance premium calculators** (term/health/motor-OD) — insurer-specific actuarial pricing,
  not a published formula (unlike NCB/IDV, which ARE IRDAI-standardised and thus buildable).

## Not started — paused pending a decision, not abandoned

A follow-up research pass (forked agent) looked for a competitor to benchmark DesiMetrics'
**other 7 hubs** (electricity, water, gas, solar, AC, appliances, fuel-cost) against, since those
haven't been touched this thread. Findings, not yet acted on:

- **DesiUtility.com** is the closest multi-vertical competitor (69 tools spanning electricity/AC/
  solar/appliances/fuel). Most DesiMetrics hubs are already competitive or ahead (appliances hub is
  ahead at 10 tools vs their 7; AC and fuel-cost roughly at parity).
- **Likely real gaps**: water-board and gas-board coverage counts — competitors (PANCalculator.com,
  BillCalculator.in) claim 15-20+ boards each in water/gas; worth verifying DesiMetrics' actual
  counts before treating this as confirmed. Also worth checking whether TheDiscomBill.com's claimed
  65-66 DISCOMs (vs our 36) is real broader coverage or inflated by counting sub-divisions.
- **Two things explicitly flagged as NOT quick gap-closes** — bigger strategic bets, not routine
  calculator work: an **AI Bill Explainer** (upload a bill, OCR/parse it, LLM savings
  recommendations — needs document parsing + LLM integration) and a **Government Scheme
  Eligibility Checker** (profile-matching against 30+ central schemes + state programs across 28
  states/8 UTs — a large structured-data content project, not a calculator).

User was asked which of these to prioritize and said "hold off" — **do not start any of this without
checking with the user first**, it was consciously parked, not forgotten.

## Key files

- Calc logic: `src/lib/calc/financial.ts` (all pure functions, extensively tested) and its test
  suite `src/lib/calc/financial.test.ts` (207 tests as of the last run — always add tests for new
  functions in this file, following the existing `describe()` pattern per function).
- Calculator UI components: `src/components/calculators/*Calculator.tsx` — one per tool, built on
  shared primitives in `src/components/calculators/CalculatorShell.tsx`
  (`CalculatorCard`/`CalculatorHeader`/`CalculatorCta`/`OptionCardGroup`/`SliderField`).
- Pages: `src/app/financial/<slug>/page.tsx` — each self-contained (metadata, worked example,
  FAQ array + FAQPage JSON-LD, WebApplication JSON-LD, breadcrumb JSON-LD).
- Hub listing + cross-linking: `src/app/financial/page.tsx` (card grid + hero stats) and
  `src/components/FinancialCrossSell.tsx` (the "other calculators" block on every calculator page)
  — **both must be updated whenever a calculator is added or removed**, or the count/links drift
  (as just happened with the 30→29 fix above).
- Site-wide legal pages that reference calculator specifics and need updating alongside new
  calculators: `src/app/disclaimer/page.tsx`, `src/app/data-sources/page.tsx`.
- `TaxRegimeCalculator.tsx`'s `texts` prop is shared with a live Hindi page
  (`src/app/hi/financial/new-vs-old-tax-regime-calculator/page.tsx`) — any new field added to
  `TaxRegimeCalculatorTexts` MUST be optional with an English fallback, or the Hindi page's typed
  texts object will fail to compile. `GratuityCalculator.tsx` has the same Hindi-dependency
  constraint (a separate `GratuityCalculatorAdvanced.tsx` exists for English so the simpler
  Hindi-compatible one stays untouched).

## Verification pattern (follow this for any future calculator work)

For every new/changed calculator: `./node_modules/.bin/tsc --noEmit`, `./node_modules/.bin/eslint`
on changed files (use the direct binary path — bare `npx tsc` intermittently fails in this repo's
environment), `npm test -- --run`, `npm run build` (confirm new routes appear in the manifest), then
a dev-server 200-check + rendered-content grep on each new/changed page. Any claim about tax law,
government scheme rules, or regulated figures (IRDAI slabs, PFRDA rules, MoRTH formulas, etc.) gets
verified via WebSearch BEFORE coding — never asserted from training-data memory. If a claim can't be
verified to a defensible standard (see Road Tax), exclude it and say why on the disclaimer page
rather than guessing.

## Reference

Full decision history with the "why" behind every choice: D-35 through D-40 in
`~/Projects/semantic-seo-content-system/projects/bijlicalc/DECISION-LOG.md`.
