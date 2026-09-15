/**
 * Shared UI-chrome + generated-prose strings for WaterBoardPage — the
 * template shared by all real-tariff water board pages (DJB, CMWSSB, PCMC
 * today). Unlike electricity's DiscomCalculatorPage, almost none of this
 * page's prose is hand-authored per board — it's generated from live tariff
 * data (see WaterBoardPage.tsx) — so translating this one dictionary covers
 * nearly all of every board's content, not just chrome.
 *
 * Mirrors the discom-page-texts.ts pattern: one typed dictionary per locale,
 * consumed by the shared component.
 */
export interface WaterBoardPageTexts {
  breadcrumbWater: string
  primaryCta: (code: string) => string
  secondaryCta: string
  statTopSlab: string
  statBillingBimonthly: string
  statBillingMonthly: string
  statFree: string
  statFixedCharge: string
  statVerified: string
  heroWorkedExample: string
  heroCostsAbout: (klLabel: string, code: string) => string
  heroPerCycle: string
  heroPerMonth: string
  heroFreeAllowanceNote: string
  calculateHeading: (code: string) => string
  workedExampleHeading: string
  workedExampleLead: (kl: number, cycleWord: string, code: string) => string
  workedExampleAbout: string
  workedExamplePerMonth: string
  workedExampleThatIs: string
  waterChargeLabel: string
  sewerageLabel: string
  fixedChargeLabel: string
  seeFullBreakdown: string
  budgetHeading: string
  budgetBody: (code: string) => string
  howToHeading: (code: string) => string
  howToSteps: string[]
  wrongHeading: string
  wrongCard1Title: string
  wrongCard1BodyStart: string
  wrongCard1WithSpread: (cheapestCode: string, cheapestRate: string, priciestCode: string, priciestRate: string) => string
  wrongCard2Title: string
  wrongCard2Body: (maxSewerage: number) => string
  wrongCard3Title: string
  wrongCard3BodySame: (code: string, cycle: string) => string
  wrongCard3BodyDiffer: string
  wrongCard3BodyEnd: string
  formulaHeading: (code: string) => string
  tariffTableHeading: (code: string) => string
  sewerageInline: string
  fixedInline: (size: string) => string
  exactFigures: string
  slabKl: string
  rateKl: string
  sewerageCharge: string
  fixedChargeMeter: (size: string) => string
  perCycle: string
  ofWaterCharge: (percent: number) => string
  effectiveVerifiedSource: (effective: string, verified: string) => string
  sourceWord: string
  commercialHeading: (code: string) => string
  commercialBody: (rate: string, multiplier: number, domesticTotal: string, commercialTotal: string) => string
  boardVsBoardHeading: (code: string) => string
  boardVsBoardBody: (kl: number) => string
  boardVsBoardOnlyOne: (code: string) => string
  neighborHeading: string
  auditHeading: string
  auditBody: string
  workedExamplesHeadingThreshold: string
  workedExamplesHeadingLowHigh: string
  thresholdUnder: (kl: number, code: string) => string
  thresholdOver: (kl: number) => string
  lowExampleBody: (code: string) => string
  highExampleBody: string
  householdHeading: string
  householdBody: (code: string) => string
  referenceHeading: string
  freeRuleHeading: (kl: number) => string
  freeRuleBody: (kl: number) => string
  chargesExplainedHeading: (code: string) => string
  componentLabel: string
  chargeTypeLabel: string
  whatItIsLabel: string
  waterChargeRow: { type: string; desc: (code: string) => string }
  sewerageChargeRow: { desc: string }
  fixedChargeRow: { type: string; desc: (code: string) => string }
  tipsHeading: (code: string) => string
  tipFreeThreshold: (kl: number) => string
  tipNoFree: string
  tips: string[]
  tankerHeading: string
  tankerBody: (code: string) => string
  landscapeHeading: string
  landscapeBody: (code: string) => string
  aboutHeading: (name: string) => string
  aboutBody: (name: string, code: string, cities: string) => string
  aboutWaterSourcesLabel: string
  aboutSourceLink: string
  aboutQualityLabel: string
  aboutMeteringLabel: string
  independenceDisclaimerLabel: string
  independenceDisclaimerBody: (name: string, code: string) => string
  payOnlineHeading: (code: string) => string
  payOnlineFallback: (name: string) => string
  payOnlineHelpline: (helpline: string) => string
  ecosystemHeading: string
  ecosystemBody: string
  ecoWaterTank: { label: string; sub: string }
  ecoElectricity: { label: string; sub: string }
  ecoGas: { label: string; sub: string }
  ecoHouseholdBuilder: { label: string; sub: string }
  ecoAc: { label: string; sub: string }
  ecoFuel: { label: string; sub: string }
  ecoFinancial: { label: string; sub: string }
  otherBoardCalculator: (name: string) => string
  comingSoon: string
  guidesHeading: string
  guideKl: string
  guideComponents: string
  guideTips: string
  guideBrowseAll: string
  guidesNote: string
  faqHeading: string
  howWeVerifyHeading: (code: string) => string
  howWeVerifySource: (name: string) => string
  howWeVerifyCrossCheck: (sewerage: number, code: string) => string
  footerVerified: (date: string) => string
  footerEffectiveFrom: (date: string) => string
  footerSource: string
  footerNotification: (name: string) => string
  footerDisclaimer: (name: string, code: string) => string
  footerMethodology: string
  footerDataSources: string
  footerDisclaimerLink: string
  faq: {
    howCalculatedQ: (code: string) => string
    howCalculatedA: (name: string, sewerage: number) => string
    whatIsKlQ: (code: string) => string
    whatIsKlA: string
    freeAllowanceQ: (code: string) => string
    freeAllowanceYesA: (kl: number) => string
    freeAllowanceNoA: (code: string) => string
    sewerageQ: string
    sewerageA: (sewerage: number, code: string) => string
    meterSizeQ: (code: string) => string
    meterSizeA: (code: string, sizes: string) => string
    typicalBillQ: string
    typicalBillA: (amount: string, code: string) => string
    tankerCheaperQ: string
    tankerCheaperA: string
    reduceQ: string
    reduceA: (code: string, freeNote: string) => string
    reduceAWithFree: (kl: number) => string
    reduceANoFree: string
    payQ: (code: string) => string
    verifiedFreqQ: string
    verifiedFreqA: (code: string, date: string) => string
    tapWaterSafeQ: (code: string) => string
    sourceQ: (code: string) => string
    meteringApplyQ: string
    meterReadingQ: string
    meterReadingA: string
  }
  /** Shown as a prominent banner at the very top of the page for boards
   *  where the only real, sourced tariff is a bulk/housing-complex rate,
   *  not an individual-house one (e.g. KMC) — so a visitor sees the scope
   *  before any number on the page, not buried in a footnote. */
  bulkScopeNotice: (boardName: string) => string
}

export const enWaterBoardPageTexts: WaterBoardPageTexts = {
  breadcrumbWater: 'Water',
  primaryCta: (code) => `Calculate My ${code} Bill`,
  secondaryCta: 'All water calculators →',
  statTopSlab: 'Top slab ₹/KL',
  statBillingBimonthly: 'Bi-monthly',
  statBillingMonthly: 'Monthly',
  statFree: 'Free',
  statFixedCharge: 'Fixed charge',
  statVerified: 'Verified',
  heroWorkedExample: 'Worked example',
  heroCostsAbout: (klLabel, code) => `${klLabel} on ${code}'s tariff costs about`,
  heroPerCycle: 'cycle',
  heroPerMonth: 'month',
  heroFreeAllowanceNote: 'Within the free allowance — only the fixed charge applies.',
  calculateHeading: (code) => `Calculate your ${code} bill`,
  workedExampleHeading: 'Worked example',
  workedExampleLead: (kl, cycleWord, code) => `A ${kl} KL ${cycleWord} ${code} bill (domestic) works out to`,
  workedExampleAbout: 'about',
  workedExamplePerMonth: 'per month',
  workedExampleThatIs: 'That is',
  waterChargeLabel: 'water charge',
  sewerageLabel: 'sewerage',
  fixedChargeLabel: 'fixed charge',
  seeFullBreakdown: 'See the full breakdown ↓',
  budgetHeading: 'Have a fixed budget? Work backwards',
  budgetBody: (code) => `Enter what you want to spend, and we'll tell you the maximum KL that stays within it — computed through the exact same ${code} tariff engine as the calculator above.`,
  howToHeading: (code) => `How to calculate your ${code} water bill`,
  howToSteps: [
    'Find your KL consumption from your meter or last bill.',
    'Select your connection type (domestic, or commercial/industrial where we have it) and meter size.',
    'Enter both into the calculator above.',
    'Get your itemised bill — water charge, sewerage and fixed charge.',
  ],
  wrongHeading: 'Why most water bill estimates are wrong',
  wrongCard1Title: 'They ask you to guess your own rate, or use a rough national average',
  wrongCard1BodyStart: "Most water calculators either ask you to type in your own per-KL rate (accurate, but only if you already know it) or fall back to a generic property-type reference table that isn't tied to your actual board. Real municipal water tariffs vary a lot by board",
  wrongCard1WithSpread: (cheapestCode, cheapestRate, priciestCode, priciestRate) =>
    ` — as of today, ${cheapestCode}'s entry slab is ${cheapestRate}/KL while ${priciestCode}'s is ${priciestRate}/KL, computed live from our own tariff files, not invented for this page.`,
  wrongCard2Title: 'They skip the sewerage charge',
  wrongCard2Body: (maxSewerage) => `Many quick calculators price only the volumetric water charge and drop the sewerage charge entirely — and because it's a percentage of the water charge (as high as ${maxSewerage}% on some boards we've verified), skipping it can understate the real bill substantially, not just by a small flat amount.`,
  wrongCard3Title: 'They ignore billing-cycle differences',
  wrongCard3BodySame: (code, cycle) => `${code} bills ${cycle}, and generic calculators often assume a single cycle for every city.`,
  wrongCard3BodyDiffer: 'Some boards bill monthly and others bi-monthly — a generic calculator that assumes one cycle for every city will misstate your real bill by up to 2×.',
  wrongCard3BodyEnd: ' We always show the monthly-equivalent figure alongside the real cycle total, so you can compare fairly across boards.',
  formulaHeading: (code) => `The ${code} billing formula`,
  tariffTableHeading: (code) => `${code} domestic water tariff`,
  sewerageInline: 'Sewerage:',
  fixedInline: (size) => `Fixed (${size}):`,
  exactFigures: 'Exact figures',
  slabKl: 'Slab (KL)',
  rateKl: 'Rate (₹/KL)',
  sewerageCharge: 'Sewerage charge',
  fixedChargeMeter: (size) => `Fixed charge (${size} meter)`,
  perCycle: '/cycle',
  ofWaterCharge: (percent) => `${percent}% of water charge`,
  effectiveVerifiedSource: (effective, verified) => `Effective from ${effective} · Verified ${verified} ·`,
  sourceWord: 'source',
  commercialHeading: (code) => `${code} also has a real commercial tariff`,
  commercialBody: (rate, multiplier, domesticTotal, commercialTotal) =>
    `Commercial connections start at ${rate}/KL — ${multiplier}× the domestic entry rate. The same 20 KL that costs ${domesticTotal} on the domestic tariff costs ${commercialTotal} on the commercial one. Switch connection type in the calculator above to price your own commercial usage.`,
  boardVsBoardHeading: (code) => `How ${code} compares to other water boards`,
  boardVsBoardBody: (kl) => `The exact same ${kl} KL — priced at each board's real domestic tariff, computed live by this calculator's own engine. We only compare boards with a source-verified tariff on file, so this list grows as we add more:`,
  boardVsBoardOnlyOne: (code) => `${code} is currently our only board with a real, sourced tariff — a side-by-side comparison will appear here once we've verified a second one.`,
  neighborHeading: "Why your water bill might be higher than your neighbor's",
  auditHeading: 'Your bill, component by component',
  auditBody: 'A 20 KL example, broken into each charge — tap any line for what it is and whether you can influence it.',
  workedExamplesHeadingThreshold: 'Two worked examples — just under vs just over the threshold',
  workedExamplesHeadingLowHigh: 'Two worked examples — low vs high usage',
  thresholdUnder: (kl, code) => `Stay at or under the ${kl} KL free threshold, and a ${code} bill costs just`,
  thresholdOver: (kl) => `Use just 1 KL more — ${kl} KL total — and the ENTIRE consumption becomes billable, not just the excess: the bill jumps to`,
  lowExampleBody: (code) => `A lighter 10 KL ${code} bill comes to`,
  highExampleBody: 'A heavier 30 KL bill comes to',
  householdHeading: 'Estimated bill by household size',
  householdBody: (code) => `A relatable starting point if you don't have a meter reading handy yet — computed through ${code}'s real tariff, using a common per-person usage benchmark.`,
  referenceHeading: 'Water consumption — quick reference table',
  freeRuleHeading: (kl) => `Understanding the ${kl} KL free rule`,
  freeRuleBody: (kl) => `This is not a true allowance where only your first ${kl} KL is free and the rest is billed normally. It's all-or-nothing: stay at or under ${kl} KL and your water charge is ₹0. Use even 1 litre more, and your entire consumption — including the first ${kl} KL — becomes billable at slab rates. This cliff-edge design is a common point of confusion, so budget accordingly if your usage is close to the threshold.`,
  chargesExplainedHeading: (code) => `${code} water bill components explained`,
  componentLabel: 'Component',
  chargeTypeLabel: 'Charge type',
  whatItIsLabel: 'What it is',
  waterChargeRow: { type: 'Telescopic, per KL', desc: (code) => `Your metered consumption priced through ${code}'s slab rates.` },
  sewerageChargeRow: { desc: "Wastewater treatment and disposal fee — scales with usage, waived alongside the water charge if that's ₹0." },
  fixedChargeRow: { type: 'Flat, per cycle', desc: (code) => `Covers connection and meter maintenance, charged regardless of usage — varies by meter size where ${code} tiers it.` },
  tipsHeading: (code) => `Tips to reduce your ${code} water bill`,
  tipFreeThreshold: (kl) => `Stay at or under the ${kl} KL free threshold if you're close to it — crossing it costs far more than the extra litres alone, since the whole bill becomes payable.`,
  tipNoFree: 'Every KL you save lowers your bill directly, since billing here is fully volumetric with no free allowance.',
  tips: [
    'Fix dripping taps and running cisterns promptly — a slow drip can waste hundreds of litres a month unnoticed.',
    'Install low-flow fixtures on showers and taps for a real, ongoing reduction in consumption.',
    'Run washing machines and dishwashers full, not half-full, to get more use per KL billed.',
    'Check for a leak downstream of your meter if your bill jumps with no real change in usage.',
    'Compare your bill against the reference table above to see if your consumption is unusually high for your household size.',
  ],
  tankerHeading: 'Piped water vs tanker/jar delivery',
  tankerBody: (code) => `A real numeric comparison, not a guess — priced at ${code}'s actual tariff against your own local tanker and jar prices.`,
  landscapeHeading: 'How municipal water tariffs are actually set',
  landscapeBody: (code) =>
    `Unlike electricity (state electricity regulatory commissions) or gas (the PNGRB), there's no single central regulator that sets municipal water tariffs in India — each municipal corporation or water board sets and revises its own domestic tariff independently, sometimes with state urban-development department oversight. That's exactly why ${code}'s structure can look completely different from another city's — different slab counts, different free-allowance rules, different billing cycles — and why finding a verifiable, consistently-published rate for every board is genuinely harder than it is for electricity or gas. We only publish a board here once we can cite a specific, dated source for it; see the citation on the tariff table above.`,
  aboutHeading: (name) => `About ${name}`,
  aboutBody: (name, code, cities) =>
    `${name} (${code}) is the civic body responsible for piped water supply and sewerage services across ${cities}. Like every municipal water board in India, it sets and revises its own domestic tariff — the slab rates, sewerage charge and fixed charges shown above are theirs, sourced and dated as shown on the tariff table.`,
  aboutWaterSourcesLabel: 'Where your water comes from.',
  aboutSourceLink: 'Source',
  aboutQualityLabel: 'Water quality.',
  aboutMeteringLabel: 'Metering status:',
  independenceDisclaimerLabel: 'Independence disclaimer:',
  independenceDisclaimerBody: (name, code) =>
    `DesiMetrics is an independent calculator and is not affiliated with, endorsed by, or operated by ${name} or any government body. Figures here are estimates for planning purposes only — your official bill from ${code} is the authoritative source. Always cross-check against your actual bill or ${code}'s own portal for billing or payment purposes.`,
  payOnlineHeading: (code) => `How to check and pay your ${code} bill`,
  payOnlineFallback: (name) => `${name} provides an online customer portal for checking consumption history, viewing bills and paying online — check their official website for the current portal link, since these occasionally change.`,
  payOnlineHelpline: (helpline) => `For complaints or questions: ${helpline}.`,
  ecosystemHeading: 'Your utility ecosystem',
  ecosystemBody: "If your water bill went up, it's worth checking these too — a bigger geyser or more laundry cycles often shows up in both.",
  ecoWaterTank: { label: 'Water tank fill time', sub: 'How long your tank takes to fill.' },
  ecoElectricity: { label: 'Electricity bill calculators', sub: 'Real DISCOM tariffs for all 36 states.' },
  ecoGas: { label: 'Gas bill calculator', sub: 'Same real-tariff approach for PNG.' },
  ecoHouseholdBuilder: { label: 'Household bill builder', sub: 'Geyser, washing machine — see what each appliance adds.' },
  ecoAc: { label: 'AC running cost', sub: 'What your AC adds to your electricity bill.' },
  ecoFuel: { label: 'Fuel cost calculators', sub: 'Petrol/diesel, LPG cylinder and generator cost.' },
  ecoFinancial: { label: 'Financial calculators', sub: 'GST, SIP, gratuity and tax-regime maths.' },
  otherBoardCalculator: (name) => `Water bill calculator for ${name}.`,
  comingSoon: 'Coming soon.',
  guidesHeading: 'Related guides: understand your water bill',
  guideKl: 'How KL billing units work →',
  guideComponents: 'Water bill components explained →',
  guideTips: 'Tips to reduce your bill →',
  guideBrowseAll: 'Browse all water calculators →',
  guidesNote: 'Standalone deep-dive guides on connection process and metering are on our roadmap — for now, each of these jumps to the relevant section on this page.',
  faqHeading: 'Frequently asked questions',
  howWeVerifyHeading: (code) => `How we verify ${code}'s tariff`,
  howWeVerifySource: (name) => `We pull rates straight from ${name}'s tariff notification / gazette order — the primary document, not another calculator.`,
  howWeVerifyCrossCheck: (sewerage, code) => `Every slab, the ${sewerage}% sewerage charge and every meter-size fixed charge for ${code} is encoded into a schema-validated file, so the maths is reproducible and auditable.`,
  footerVerified: (date) => `Verified ${date}`,
  footerEffectiveFrom: (date) => `Effective from ${date}`,
  footerSource: 'Source:',
  footerNotification: (name) => `${name} tariff notification`,
  footerDisclaimer: (name, code) =>
    `DesiMetrics is an independent calculator, not affiliated with, endorsed by, or operated by ${name} or any government body. Estimates are for planning purposes only — always verify against your official bill.`,
  footerMethodology: 'How we source & verify data',
  footerDataSources: 'Data sources',
  footerDisclaimerLink: 'Disclaimer',
  faq: {
    howCalculatedQ: (code) => `How is my ${code} water bill calculated?`,
    howCalculatedA: (name, sewerage) => `Your KL (kilolitre) consumption is priced through ${name}'s slab rates, plus a sewerage charge (${sewerage}% of the water charge) and a fixed charge based on your connection's meter size.`,
    whatIsKlQ: (code) => `What is a KL and how do I read my ${code} water meter?`,
    whatIsKlA: "A kilolitre (KL) = 1,000 litres, the standard billing unit for metered water supply in India. Most water meters display a running total in KL or cubic metres (the same unit) on a small odometer-style or digital display — subtract your previous reading from your current one to find your period's consumption.",
    freeAllowanceQ: (code) => `Does ${code} offer a free consumption allowance?`,
    freeAllowanceYesA: (kl) => `Yes — the first ${kl} KL/month is free, but it's all-or-nothing, not a true exemption: stay at or under ${kl} KL and your water charge is ₹0. Cross it by even 1 litre and your ENTIRE consumption — not just the amount above ${kl} KL — becomes billable at slab rates. See the worked examples above for exactly how large that jump is.`,
    freeAllowanceNoA: (code) => `Not currently, as far as we've verified — ${code} bills from the first KL at slab rates, with a flat minimum charge per connection. Some other Indian boards (like Delhi) do offer a free-consumption scheme; always check your own board's specific rules.`,
    sewerageQ: 'What is the sewerage charge on my water bill?',
    sewerageA: (sewerage, code) => `It's a charge for wastewater treatment and disposal, billed as a percentage of your water (volumetric) charge — currently ${sewerage}% for ${code}. If your water charge is waived, the sewerage charge is too, since it's calculated off that base.`,
    meterSizeQ: (code) => `Does my meter size affect my fixed charge?`,
    meterSizeA: (code, sizes) => `Yes — ${code} charges a different flat fixed charge depending on your connection's meter size (${sizes}), regardless of how much water you use.`,
    typicalBillQ: 'Paani ka bill kitna aata hai ek normal ghar mein?',
    typicalBillA: (amount, code) => `For a typical household using around 15 KL a month, expect roughly ${amount} on ${code}'s real tariff — your actual bill depends on household size and your board's own rate. Use the calculator above for your specific number.`,
    tankerCheaperQ: 'Is piped water cheaper than tanker or jar delivery?',
    tankerCheaperA: 'Almost always yes, by a wide margin, when piped supply is reliable — use the piped-vs-tanker-vs-jar comparison above with your own local tanker and jar prices for an exact, computed answer rather than a generic claim.',
    reduceQ: 'How can I reduce my water bill?',
    reduceA: (code, freeNote) => `See the "Tips to reduce your ${code} water bill" section above for the full list — the short version: fix leaks promptly, install low-flow fixtures, and${freeNote}`,
    reduceAWithFree: (kl) => ` stay at or under the ${kl} KL free threshold if you're close to it.`,
    reduceANoFree: ' every KL saved lowers your bill directly, since billing here is fully volumetric.',
    payQ: (code) => `How do I check or pay my ${code} bill online?`,
    verifiedFreqQ: "How often is this calculator's tariff data verified?",
    verifiedFreqA: (code, date) => `We date every tariff figure with an effective-from and last-verified date (shown in the tariff table above and the footer of this page), and cite the source. ${code}'s tariff was last verified ${date} — check that date against your own recent bill, since a rate change since then wouldn't yet be reflected here.`,
    tapWaterSafeQ: (code) => `Is ${code} tap water safe to drink?`,
    sourceQ: (code) => `Where does my ${code} water actually come from?`,
    meteringApplyQ: "Does this calculator apply to my connection if I don't have a working meter?",
    meterReadingQ: 'Paani ka meter reading kaise padhein?',
    meterReadingA: "Your water meter shows a running total in KL (or cubic metres, the same unit) on a small digital or odometer-style display — note the current reading, subtract your previous bill's reading, and the difference is your billing period's consumption in KL.",
  },
  bulkScopeNotice: (boardName) =>
    `This calculator is for BULK connections — housing complexes, gated communities and similar multi-unit developments — not an individual house. ${boardName}'s own published rates have no separate per-house volumetric tariff; ordinary single-family homes are typically billed through property tax instead, which this calculator does not cover.`,
}

export const hiWaterBoardPageTexts: WaterBoardPageTexts = {
  breadcrumbWater: 'पानी',
  primaryCta: (code) => `मेरा ${code} बिल कैलकुलेट करें`,
  secondaryCta: 'सभी पानी कैलकुलेटर →',
  statTopSlab: 'टॉप स्लैब ₹/KL',
  statBillingBimonthly: 'द्विमासिक',
  statBillingMonthly: 'मासिक',
  statFree: 'मुफ़्त',
  statFixedCharge: 'फिक्स्ड चार्ज',
  statVerified: 'सत्यापित',
  heroWorkedExample: 'उदाहरण',
  heroCostsAbout: (klLabel, code) => `${code} के टैरिफ पर ${klLabel} की लागत लगभग`,
  heroPerCycle: 'साइकल',
  heroPerMonth: 'महीना',
  heroFreeAllowanceNote: 'मुफ़्त सीमा के भीतर — सिर्फ फिक्स्ड चार्ज लागू होता है।',
  calculateHeading: (code) => `अपना ${code} बिल कैलकुलेट करें`,
  workedExampleHeading: 'उदाहरण',
  workedExampleLead: (kl, cycleWord, code) => `${kl} KL का ${cycleWord} ${code} बिल (घरेलू) इतना आता है`,
  workedExampleAbout: 'लगभग',
  workedExamplePerMonth: 'प्रति माह',
  workedExampleThatIs: 'यह है',
  waterChargeLabel: 'पानी चार्ज',
  sewerageLabel: 'सीवरेज',
  fixedChargeLabel: 'फिक्स्ड चार्ज',
  seeFullBreakdown: 'पूरा ब्यौरा देखें ↓',
  budgetHeading: 'तय बजट है? उल्टा हिसाब लगाएं',
  budgetBody: (code) => `आप जितना खर्च करना चाहते हैं वह डालें, हम बताएंगे कि उतने में अधिकतम कितनी KL आ सकती है — ऊपर के कैलकुलेटर जैसे ही असली ${code} टैरिफ इंजन से कैलकुलेट किया गया।`,
  howToHeading: (code) => `अपना ${code} पानी बिल कैसे कैलकुलेट करें`,
  howToSteps: [
    'अपने मीटर या पिछले बिल से अपनी KL खपत पता करें।',
    'अपना कनेक्शन प्रकार (घरेलू, या जहां उपलब्ध हो वाणिज्यिक/औद्योगिक) और मीटर साइज़ चुनें।',
    'दोनों को ऊपर कैलकुलेटर में डालें।',
    'अपना विस्तृत बिल पाएं — पानी चार्ज, सीवरेज और फिक्स्ड चार्ज।',
  ],
  wrongHeading: 'ज़्यादातर पानी बिल अनुमान गलत क्यों होते हैं',
  wrongCard1Title: 'वे आपसे अपनी दर अंदाज़ा लगाने या एक सामान्य राष्ट्रीय औसत इस्तेमाल करने को कहते हैं',
  wrongCard1BodyStart: 'ज़्यादातर पानी कैलकुलेटर या तो आपसे अपनी प्रति-KL दर खुद डालने को कहते हैं (सटीक, लेकिन सिर्फ तभी जब आपको पहले से पता हो) या एक सामान्य प्रॉपर्टी-टाइप रेफरेंस टेबल पर निर्भर रहते हैं जो आपके असली बोर्ड से जुड़ी नहीं होती। असली नगरपालिका पानी टैरिफ बोर्ड के हिसाब से काफी अलग-अलग होते हैं',
  wrongCard1WithSpread: (cheapestCode, cheapestRate, priciestCode, priciestRate) =>
    ` — आज की तारीख में, ${cheapestCode} का एंट्री स्लैब ${cheapestRate}/KL है जबकि ${priciestCode} का ${priciestRate}/KL है, जो हमारी अपनी टैरिफ फाइलों से लाइव कैलकुलेट किया गया है, इस पेज के लिए बनाया नहीं गया।`,
  wrongCard2Title: 'वे सीवरेज चार्ज छोड़ देते हैं',
  wrongCard2Body: (maxSewerage) => `ज़्यादातर त्वरित कैलकुलेटर सिर्फ वॉल्यूमेट्रिक पानी चार्ज की कीमत लगाते हैं और सीवरेज चार्ज को पूरी तरह छोड़ देते हैं — और चूंकि यह पानी चार्ज का प्रतिशत होता है (हमने सत्यापित किए कुछ बोर्ड में ${maxSewerage}% तक), इसे छोड़ना असली बिल को काफी हद तक कम करके दिखा सकता है, सिर्फ एक छोटी फ्लैट राशि से नहीं।`,
  wrongCard3Title: 'वे बिलिंग-साइकल के अंतर को नज़रअंदाज़ करते हैं',
  wrongCard3BodySame: (code, cycle) => `${code} ${cycle} बिल करता है, और सामान्य कैलकुलेटर अक्सर हर शहर के लिए एक ही साइकल मान लेते हैं।`,
  wrongCard3BodyDiffer: 'कुछ बोर्ड मासिक बिल करते हैं और कुछ द्विमासिक — एक सामान्य कैलकुलेटर जो हर शहर के लिए एक ही साइकल मान लेता है, आपके असली बिल को 2× तक गलत बता सकता है।',
  wrongCard3BodyEnd: ' हम हमेशा असली साइकल टोटल के साथ मासिक-समतुल्य आंकड़ा भी दिखाते हैं, ताकि आप बोर्डों के बीच सही तुलना कर सकें।',
  formulaHeading: (code) => `${code} बिलिंग फॉर्मूला`,
  tariffTableHeading: (code) => `${code} घरेलू पानी टैरिफ`,
  sewerageInline: 'सीवरेज:',
  fixedInline: (size) => `फिक्स्ड (${size}):`,
  exactFigures: 'सटीक आंकड़े',
  slabKl: 'स्लैब (KL)',
  rateKl: 'दर (₹/KL)',
  sewerageCharge: 'सीवरेज चार्ज',
  fixedChargeMeter: (size) => `फिक्स्ड चार्ज (${size} मीटर)`,
  perCycle: '/साइकल',
  ofWaterCharge: (percent) => `पानी चार्ज का ${percent}%`,
  effectiveVerifiedSource: (effective, verified) => `${effective} से लागू · ${verified} को सत्यापित ·`,
  sourceWord: 'स्रोत',
  commercialHeading: (code) => `${code} का एक असली वाणिज्यिक टैरिफ भी है`,
  commercialBody: (rate, multiplier, domesticTotal, commercialTotal) =>
    `वाणिज्यिक कनेक्शन ${rate}/KL से शुरू होते हैं — घरेलू एंट्री दर का ${multiplier}×। जो 20 KL घरेलू टैरिफ पर ${domesticTotal} की लागत आती है, वही वाणिज्यिक पर ${commercialTotal} की आती है। अपनी वाणिज्यिक खपत की कीमत जानने के लिए ऊपर कैलकुलेटर में कनेक्शन प्रकार बदलें।`,
  boardVsBoardHeading: (code) => `${code} अन्य पानी बोर्ड से कैसे तुलना करता है`,
  boardVsBoardBody: (kl) => `बिल्कुल वही ${kl} KL — हर बोर्ड के असली घरेलू टैरिफ पर, इसी कैलकुलेटर के इंजन से लाइव कैलकुलेट किया गया। हम सिर्फ उन बोर्डों की तुलना करते हैं जिनका स्रोत-सत्यापित टैरिफ हमारे पास है, इसलिए यह सूची और बोर्ड जुड़ने के साथ बढ़ती जाएगी:`,
  boardVsBoardOnlyOne: (code) => `${code} फ़िलहाल हमारा एकमात्र बोर्ड है जिसका असली, स्रोत-सत्यापित टैरिफ है — दूसरा बोर्ड सत्यापित होते ही यहां साथ-साथ तुलना दिखेगी।`,
  neighborHeading: 'आपका पानी बिल आपके पड़ोसी से ज़्यादा क्यों हो सकता है',
  auditHeading: 'आपका बिल, हिस्सा दर हिस्सा',
  auditBody: 'एक 20 KL उदाहरण, हर चार्ज में बांटा गया — हर लाइन का मतलब जानने और उसे प्रभावित कर सकते हैं या नहीं, यह जानने के लिए उसे खोलें।',
  workedExamplesHeadingThreshold: 'दो उदाहरण — सीमा से ठीक नीचे बनाम ठीक ऊपर',
  workedExamplesHeadingLowHigh: 'दो उदाहरण — कम बनाम ज़्यादा खपत',
  thresholdUnder: (kl, code) => `${kl} KL की मुफ़्त सीमा पर या उससे नीचे रहें, और ${code} बिल की लागत सिर्फ इतनी आती है`,
  thresholdOver: (kl) => `सिर्फ 1 KL ज़्यादा इस्तेमाल करें — कुल ${kl} KL — और पूरी खपत बिल में जुड़ जाती है, सिर्फ अतिरिक्त हिस्सा नहीं: बिल बढ़कर हो जाता है`,
  lowExampleBody: (code) => `एक हल्का 10 KL ${code} बिल इतना आता है`,
  highExampleBody: 'एक भारी 30 KL बिल इतना आता है',
  householdHeading: 'घर के आकार के हिसाब से अनुमानित बिल',
  householdBody: (code) => `अगर अभी मीटर रीडिंग हाथ में नहीं है तो शुरुआत का एक भरोसेमंद तरीका — ${code} के असली टैरिफ से, एक सामान्य प्रति-व्यक्ति खपत मानक इस्तेमाल करते हुए कैलकुलेट किया गया।`,
  referenceHeading: 'पानी की खपत — त्वरित संदर्भ तालिका',
  freeRuleHeading: (kl) => `${kl} KL मुफ़्त नियम को समझना`,
  freeRuleBody: (kl) => `यह एक सच्ची छूट नहीं है जहां सिर्फ आपके पहले ${kl} KL मुफ़्त हों और बाकी सामान्य रूप से बिल हो। यह सब-या-कुछ-नहीं है: ${kl} KL पर या उससे नीचे रहें और आपका पानी चार्ज ₹0 है। सिर्फ 1 लीटर ज़्यादा इस्तेमाल करें, और आपकी पूरी खपत — पहले ${kl} KL सहित — स्लैब दरों पर बिल होने लगती है। यह अचानक-बदलाव डिज़ाइन एक आम भ्रम का कारण है, इसलिए अगर आपकी खपत सीमा के करीब है तो उसी हिसाब से बजट बनाएं।`,
  chargesExplainedHeading: (code) => `${code} पानी बिल के हिस्से समझाए गए`,
  componentLabel: 'हिस्सा',
  chargeTypeLabel: 'चार्ज प्रकार',
  whatItIsLabel: 'यह क्या है',
  waterChargeRow: { type: 'टेलीस्कोपिक, प्रति KL', desc: (code) => `आपकी मीटर से मापी गई खपत ${code} की स्लैब दरों पर तय होती है।` },
  sewerageChargeRow: { desc: 'वेस्टवाटर ट्रीटमेंट और डिस्पोज़ल फीस — खपत के साथ बदलती है, अगर पानी चार्ज ₹0 है तो यह भी माफ हो जाती है।' },
  fixedChargeRow: { type: 'फ्लैट, प्रति साइकल', desc: (code) => `कनेक्शन और मीटर मेंटेनेंस को कवर करता है, खपत की परवाह किए बिना लिया जाता है — जहां ${code} इसे टियर करता है वहां मीटर साइज़ के हिसाब से बदलता है।` },
  tipsHeading: (code) => `अपना ${code} पानी बिल कम करने के तरीके`,
  tipFreeThreshold: (kl) => `अगर आप करीब हैं तो ${kl} KL की मुफ़्त सीमा पर या उससे नीचे रहें — इसे पार करना अतिरिक्त लीटर से कहीं ज़्यादा महंगा पड़ता है, क्योंकि पूरा बिल देय हो जाता है।`,
  tipNoFree: 'आप जो भी KL बचाते हैं वह सीधे आपका बिल कम करता है, क्योंकि यहां बिलिंग पूरी तरह वॉल्यूमेट्रिक है, कोई मुफ़्त छूट नहीं।',
  tips: [
    'टपकते नल और चलती सिस्टर्न तुरंत ठीक करवाएं — एक धीमा रिसाव महीने में सैकड़ों लीटर बिना पता चले बर्बाद कर सकता है।',
    'शावर और नल पर लो-फ्लो फिक्स्चर लगाएं — खपत में असली, लगातार कमी के लिए।',
    'वॉशिंग मशीन और डिशवॉशर पूरा भरकर चलाएं, आधा नहीं, ताकि हर बिल होने वाली KL का ज़्यादा इस्तेमाल हो।',
    'अगर बिना खपत में असली बदलाव के आपका बिल बढ़ जाए, तो मीटर के बाद रिसाव जांचें।',
    'यह देखने के लिए कि आपकी खपत आपके घर के आकार के हिसाब से असामान्य रूप से ज़्यादा तो नहीं, ऊपर की रेफरेंस टेबल से अपने बिल की तुलना करें।',
  ],
  tankerHeading: 'पाइप्ड पानी बनाम टैंकर/जार डिलीवरी',
  tankerBody: (code) => `एक असली संख्यात्मक तुलना, अंदाज़ा नहीं — ${code} की असली टैरिफ को आपके अपने स्थानीय टैंकर और जार दामों के मुकाबले कीमत दी गई।`,
  landscapeHeading: 'नगरपालिका पानी टैरिफ असल में कैसे तय होते हैं',
  landscapeBody: (code) =>
    `बिजली (राज्य विद्युत नियामक आयोग) या गैस (PNGRB) के उलट, भारत में नगरपालिका पानी टैरिफ तय करने वाला कोई एक केंद्रीय नियामक नहीं है — हर नगर निगम या पानी बोर्ड अपना घरेलू टैरिफ खुद तय और संशोधित करता है, कभी-कभी राज्य शहरी विकास विभाग की निगरानी के साथ। यही कारण है कि ${code} की संरचना किसी और शहर से बिल्कुल अलग दिख सकती है — अलग स्लैब संख्या, अलग मुफ़्त-छूट नियम, अलग बिलिंग साइकल — और यही कारण है कि हर बोर्ड के लिए एक सत्यापित, लगातार-प्रकाशित दर ढूंढना बिजली या गैस से कहीं ज़्यादा मुश्किल है। हम किसी बोर्ड को यहां तभी प्रकाशित करते हैं जब हम उसके लिए एक विशिष्ट, दिनांकित स्रोत का हवाला दे सकें; ऊपर टैरिफ तालिका पर उद्धरण देखें।`,
  aboutHeading: (name) => `${name} के बारे में`,
  aboutBody: (name, code, cities) =>
    `${name} (${code}) ${cities} में पाइप्ड पानी आपूर्ति और सीवरेज सेवाओं के लिए ज़िम्मेदार नागरिक निकाय है। भारत के हर नगरपालिका पानी बोर्ड की तरह, यह अपना घरेलू टैरिफ खुद तय और संशोधित करता है — ऊपर दिखाई गई स्लैब दरें, सीवरेज चार्ज और फिक्स्ड चार्ज उन्हीं के हैं, जो टैरिफ तालिका में दिखाए अनुसार स्रोत और दिनांकित हैं।`,
  aboutWaterSourcesLabel: 'आपका पानी कहां से आता है।',
  aboutSourceLink: 'स्रोत',
  aboutQualityLabel: 'पानी की गुणवत्ता।',
  aboutMeteringLabel: 'मीटरिंग स्थिति:',
  independenceDisclaimerLabel: 'स्वतंत्रता अस्वीकरण:',
  independenceDisclaimerBody: (name, code) =>
    `DesiMetrics एक स्वतंत्र कैलकुलेटर है और ${name} या किसी सरकारी निकाय से न तो संबद्ध है, न ही अनुमोदित या संचालित है। यहां दिए गए आंकड़े केवल योजना बनाने के मकसद से अनुमान हैं — ${code} से आपका आधिकारिक बिल ही प्रामाणिक स्रोत है। बिलिंग या भुगतान के मकसद से हमेशा अपने असली बिल या ${code} के अपने पोर्टल से जांच करें।`,
  payOnlineHeading: (code) => `अपना ${code} बिल कैसे चेक करें और भरें`,
  payOnlineFallback: (name) => `${name} खपत इतिहास चेक करने, बिल देखने और ऑनलाइन भुगतान के लिए एक ऑनलाइन ग्राहक पोर्टल देता है — मौजूदा पोर्टल लिंक के लिए उनकी आधिकारिक वेबसाइट देखें, क्योंकि ये कभी-कभी बदल जाते हैं।`,
  payOnlineHelpline: (helpline) => `शिकायत या सवालों के लिए: ${helpline}.`,
  ecosystemHeading: 'आपका यूटिलिटी इकोसिस्टम',
  ecosystemBody: 'अगर आपका पानी बिल बढ़ा है, तो ये भी जांचना अच्छा रहेगा — एक बड़ा गीज़र या ज़्यादा लॉन्ड्री साइकल अक्सर दोनों में दिखते हैं।',
  ecoWaterTank: { label: 'पानी टैंक भरने का समय', sub: 'आपका टैंक भरने में कितना समय लगता है।' },
  ecoElectricity: { label: 'बिजली बिल कैलकुलेटर', sub: 'सभी 36 राज्यों के लिए असली डिस्कॉम टैरिफ।' },
  ecoGas: { label: 'गैस बिल कैलकुलेटर', sub: 'PNG के लिए वही असली-टैरिफ तरीका।' },
  ecoHouseholdBuilder: { label: 'घरेलू बिल बिल्डर', sub: 'गीज़र, वॉशिंग मशीन — देखें हर उपकरण क्या जोड़ता है।' },
  ecoAc: { label: 'AC चलाने की लागत', sub: 'आपका AC आपके बिजली बिल में क्या जोड़ता है।' },
  ecoFuel: { label: 'ईंधन लागत कैलकुलेटर', sub: 'पेट्रोल/डीज़ल, LPG सिलेंडर और जनरेटर लागत।' },
  ecoFinancial: { label: 'वित्तीय कैलकुलेटर', sub: 'GST, SIP, ग्रेच्युटी और टैक्स-रिजीम गणित।' },
  otherBoardCalculator: (name) => `${name} के लिए पानी बिल कैलकुलेटर।`,
  comingSoon: 'जल्द आ रहा है।',
  guidesHeading: 'संबंधित गाइड: अपना पानी बिल समझें',
  guideKl: 'KL बिलिंग यूनिट कैसे काम करती है →',
  guideComponents: 'पानी बिल के हिस्से समझाए गए →',
  guideTips: 'अपना बिल कम करने के तरीके →',
  guideBrowseAll: 'सभी पानी कैलकुलेटर देखें →',
  guidesNote: 'कनेक्शन प्रक्रिया और मीटरिंग पर अलग गहराई वाली गाइड हमारे रोडमैप पर हैं — फिलहाल, इनमें से हर एक इस पेज के संबंधित सेक्शन पर ले जाता है।',
  faqHeading: 'अक्सर पूछे जाने वाले सवाल',
  howWeVerifyHeading: (code) => `हम ${code} के टैरिफ को कैसे सत्यापित करते हैं`,
  howWeVerifySource: (name) => `हम सीधे ${name} की टैरिफ अधिसूचना / गजट आदेश से दरें लेते हैं — प्राथमिक दस्तावेज़, किसी और कैलकुलेटर से नहीं।`,
  howWeVerifyCrossCheck: (sewerage, code) => `${code} के लिए हर स्लैब, ${sewerage}% सीवरेज चार्ज और हर मीटर-साइज़ फिक्स्ड चार्ज एक स्कीमा-सत्यापित फाइल में दर्ज है, ताकि गणित दोहराने योग्य और ऑडिट करने योग्य हो।`,
  footerVerified: (date) => `${date} को सत्यापित`,
  footerEffectiveFrom: (date) => `${date} से लागू`,
  footerSource: 'स्रोत:',
  footerNotification: (name) => `${name} टैरिफ अधिसूचना`,
  footerDisclaimer: (name, code) =>
    `DesiMetrics एक स्वतंत्र कैलकुलेटर है, ${name} या किसी सरकारी निकाय से संबद्ध, अनुमोदित या संचालित नहीं है। अनुमान केवल योजना बनाने के मकसद से हैं — हमेशा अपने आधिकारिक बिल से पुष्टि करें।`,
  footerMethodology: 'हम डेटा कैसे स्रोत और सत्यापित करते हैं',
  footerDataSources: 'डेटा स्रोत',
  footerDisclaimerLink: 'अस्वीकरण',
  faq: {
    howCalculatedQ: (code) => `मेरा ${code} पानी बिल कैसे कैलकुलेट होता है?`,
    howCalculatedA: (name, sewerage) => `आपकी KL (किलोलीटर) खपत ${name} की स्लैब दरों से तय होती है, साथ ही एक सीवरेज चार्ज (पानी चार्ज का ${sewerage}%) और आपके कनेक्शन के मीटर साइज़ पर आधारित फिक्स्ड चार्ज।`,
    whatIsKlQ: (code) => `KL क्या है और मैं अपना ${code} पानी मीटर कैसे पढ़ूं?`,
    whatIsKlA: 'एक किलोलीटर (KL) = 1,000 लीटर, भारत में मीटर से मापी गई पानी आपूर्ति के लिए मानक बिलिंग यूनिट है। ज़्यादातर पानी मीटर एक छोटे ओडोमीटर-स्टाइल या डिजिटल डिस्प्ले पर KL या क्यूबिक मीटर (वही यूनिट) में कुल रीडिंग दिखाते हैं — अपनी अवधि की खपत जानने के लिए अपनी मौजूदा रीडिंग में से पिछली रीडिंग घटाएं।',
    freeAllowanceQ: (code) => `क्या ${code} मुफ़्त खपत छूट देता है?`,
    freeAllowanceYesA: (kl) => `हां — पहली ${kl} KL/महीना मुफ़्त है, लेकिन यह सब-या-कुछ-नहीं है, सच्ची छूट नहीं: ${kl} KL पर या उससे नीचे रहें और आपका पानी चार्ज ₹0 है। सिर्फ 1 लीटर ज़्यादा इस्तेमाल करने पर आपकी पूरी खपत — सिर्फ ${kl} KL से ऊपर का हिस्सा नहीं — स्लैब दरों पर बिल होने लगती है। यह उछाल कितना बड़ा है, ऊपर दिए उदाहरण देखें।`,
    freeAllowanceNoA: (code) => `फ़िलहाल नहीं, जहां तक हमने सत्यापित किया है — ${code} पहली KL से ही स्लैब दरों पर बिल करता है, हर कनेक्शन पर एक फ्लैट न्यूनतम चार्ज के साथ। कुछ अन्य भारतीय बोर्ड (जैसे दिल्ली) मुफ़्त-खपत योजना देते हैं; हमेशा अपने बोर्ड के खास नियम जांचें।`,
    sewerageQ: 'मेरे पानी बिल पर सीवरेज चार्ज क्या है?',
    sewerageA: (sewerage, code) => `यह वेस्टवाटर ट्रीटमेंट और डिस्पोज़ल के लिए एक चार्ज है, जो आपके पानी (वॉल्यूमेट्रिक) चार्ज के प्रतिशत के रूप में लिया जाता है — फ़िलहाल ${code} के लिए ${sewerage}%। अगर आपका पानी चार्ज माफ है, तो सीवरेज चार्ज भी माफ है, क्योंकि यह उसी आधार पर कैलकुलेट होता है।`,
    meterSizeQ: (code) => 'क्या मेरा मीटर साइज़ मेरे फिक्स्ड चार्ज को प्रभावित करता है?',
    meterSizeA: (code, sizes) => `हां — ${code} आपके कनेक्शन के मीटर साइज़ (${sizes}) के हिसाब से अलग फ्लैट फिक्स्ड चार्ज लेता है, चाहे आप कितना भी पानी इस्तेमाल करें।`,
    typicalBillQ: 'पानी का बिल कितना आता है एक सामान्य घर में?',
    typicalBillA: (amount, code) => `महीने में करीब 15 KL इस्तेमाल करने वाले सामान्य घर के लिए, ${code} के असली टैरिफ पर लगभग ${amount} की उम्मीद करें — आपका असली बिल घर के आकार और आपके बोर्ड की अपनी दर पर निर्भर करता है। अपने खास आंकड़े के लिए ऊपर कैलकुलेटर इस्तेमाल करें।`,
    tankerCheaperQ: 'क्या पाइप्ड पानी टैंकर या जार डिलीवरी से सस्ता है?',
    tankerCheaperA: 'जब पाइप्ड आपूर्ति भरोसेमंद हो, तो लगभग हमेशा हां, काफी बड़े अंतर से — एक सटीक, कैलकुलेटेड जवाब के लिए ऊपर दी पाइप्ड-बनाम-टैंकर-बनाम-जार तुलना अपने स्थानीय टैंकर और जार दामों के साथ इस्तेमाल करें, सामान्य दावे की बजाय।',
    reduceQ: 'मैं अपना पानी बिल कैसे कम कर सकता हूं?',
    reduceA: (code, freeNote) => `पूरी सूची के लिए ऊपर "अपना ${code} पानी बिल कम करने के तरीके" सेक्शन देखें — संक्षेप में: रिसाव तुरंत ठीक करवाएं, लो-फ्लो फिक्स्चर लगवाएं, और${freeNote}`,
    reduceAWithFree: (kl) => ` अगर आप करीब हैं तो ${kl} KL की मुफ़्त सीमा पर या उससे नीचे रहें।`,
    reduceANoFree: ' आप जो भी KL बचाते हैं वह सीधे आपका बिल कम करता है, क्योंकि यहां बिलिंग पूरी तरह वॉल्यूमेट्रिक है।',
    payQ: (code) => `मैं अपना ${code} बिल ऑनलाइन कैसे चेक करूं या भरूं?`,
    verifiedFreqQ: 'यह कैलकुलेटर का टैरिफ डेटा कितनी बार सत्यापित होता है?',
    verifiedFreqA: (code, date) => `हम हर टैरिफ आंकड़े को एक प्रभावी-तिथि और अंतिम-सत्यापित तारीख के साथ दिनांकित करते हैं (ऊपर टैरिफ तालिका और इस पेज के फुटर में दिखाया गया), और स्रोत का हवाला देते हैं। ${code} का टैरिफ आखिरी बार ${date} को सत्यापित हुआ था — अपने हाल के बिल के खिलाफ वह तारीख जांच लें, क्योंकि उसके बाद कोई दर बदलाव अभी यहां शामिल नहीं होगा।`,
    tapWaterSafeQ: (code) => `क्या ${code} का नल का पानी पीने के लिए सुरक्षित है?`,
    sourceQ: (code) => `मेरा ${code} पानी असल में कहां से आता है?`,
    meteringApplyQ: 'अगर मेरे पास काम करने वाला मीटर नहीं है तो क्या यह कैलकुलेटर मेरे कनेक्शन पर लागू होता है?',
    meterReadingQ: 'पानी का मीटर रीडिंग कैसे पढ़ें?',
    meterReadingA: 'आपका पानी मीटर एक छोटे डिजिटल या ओडोमीटर-स्टाइल डिस्प्ले पर KL (या क्यूबिक मीटर, वही यूनिट) में कुल रीडिंग दिखाता है — मौजूदा रीडिंग नोट करें, अपने पिछले बिल की रीडिंग घटाएं, और अंतर आपकी बिलिंग अवधि की खपत है, KL में।',
  },
  bulkScopeNotice: (boardName) =>
    `यह कैलकुलेटर BULK कनेक्शन के लिए है — हाउसिंग कॉम्प्लेक्स, गेटेड कम्युनिटी और ऐसे ही मल्टी-यूनिट डेवलपमेंट — किसी एक घर के लिए नहीं। ${boardName} की खुद की प्रकाशित दरों में किसी एक घर के लिए अलग वॉल्यूमेट्रिक टैरिफ नहीं है; सामान्य एकल-परिवार घरों का बिल आमतौर पर प्रॉपर्टी टैक्स के ज़रिए बनता है, जिसे यह कैलकुलेटर कवर नहीं करता।`,
}
