import Link from 'next/link'
import PageHero from '@/components/PageHero'
import type { DiscomPageConfig } from '@/data/calculator-pages'
import { calculateFullBill, getTariff } from '@/lib/calc/electricity'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { cycleLabel, formatIsoDate } from '@/lib/format'

/** Consumption levels the effective-rate table is built at. */
const SAMPLE_UNITS = [50, 100, 200, 300, 500]
/** Most DISCOMs here bill fixed charges per sanctioned kW, so a load has to be
 *  assumed for an all-in figure. Disclosed in the table footnote, not hidden. */
const ASSUMED_LOAD_KW = 2

export default function UnitPricePage({
  config,
  locale = 'en',
}: {
  config: DiscomPageConfig
  locale?: 'en' | 'hi'
}) {
  const hi = locale === 'hi'
  const tariff = getTariff(config.discomCode)
  const residential =
    tariff.connectionTypes.find((c) => c.connectionType === 'residential') ??
    tariff.connectionTypes[0]
  const firstSlabRate = residential.slabs[0].ratePerUnit
  const topSlabRate = residential.slabs[residential.slabs.length - 1].ratePerUnit
  const marginalRate = marginalRatePerUnit(config.discomCode)

  // All-in effective rate at a spread of consumption levels, computed from the
  // same tariff file the bill calculator uses. This is what makes the page's own
  // question answerable honestly: there is no single "1 unit price".
  const effectiveRows = SAMPLE_UNITS.map((units) => {
    try {
      const bill = calculateFullBill({
        discomCode: config.discomCode,
        connectionType: 'residential',
        unitsConsumed: units,
        sanctionedLoad: ASSUMED_LOAD_KW,
      })
      return {
        units,
        total: bill.total,
        effective: Math.round((bill.total / units) * 100) / 100,
        fixed: bill.fixedCharge.amount,
      }
    } catch {
      return null
    }
  }).filter((r): r is NonNullable<typeof r> => r !== null)

  const cheapestRow = effectiveRows.reduce<(typeof effectiveRows)[number] | null>(
    (best, r) => (best === null || r.effective < best.effective ? r : best),
    null,
  )
  // Almost every tariff file (35 of 36 at last count) is self-labelled
  // SOURCED (secondary) in verifiedBy, not verified against the DISCOM's own
  // primary order — so "official tariff page" would be false for nearly the
  // whole site, not an edge case. One file (TNEB) is UNVERIFIED, a stronger
  // caveat than "secondary". Never assume "not secondary" means "verified
  // primary" — check for UNVERIFIED explicitly too.
  const isUnverified = /unverified/i.test(tariff.verifiedBy)
  const isSecondarySource = isUnverified || /secondary/i.test(tariff.verifiedBy)
  const periodWord = tariff.billingCycle === 'bimonthly'
    ? hi ? 'द्वैमासिक' : 'two-monthly'
    : hi ? 'मासिक' : 'monthly'

  const faqs = hi
    ? [
        {
          q: `${tariff.state} में 1 यूनिट बिजली की कीमत क्या है?`,
          a: `${tariff.discomCode} का घरेलू टैरिफ पहले स्लैब के लिए ₹${firstSlabRate.toFixed(2)}/यूनिट से शुरू होता है और टॉप स्लैब पर ₹${topSlabRate.toFixed(2)}/यूनिट तक बढ़ता है, फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क से पहले। आपका असली प्रति-यूनिट खर्च आपके कुल इस्तेमाल पर निर्भर करता है, क्योंकि टैरिफ टेलिस्कोपिक है।`,
        },
        {
          q: 'एक ही "1 यूनिट की कीमत" क्यों नहीं है?',
          a: `${tariff.discomCode} घरेलू उपभोक्ताओं को टेलिस्कोपिक स्लैब संरचना पर बिल करता है — आप जो भी यूनिट इस्तेमाल करते हैं, वह उसी स्लैब की दर पर चार्ज होती है जिसमें वह गिरती है, किसी एक फ्लैट दर पर नहीं। तो आपकी 50वीं यूनिट और आपकी 400वीं यूनिट अलग-अलग कीमत पर होती हैं।`,
        },
        {
          q: 'यहां दिखाई गई मार्जिनल दर का क्या मतलब है?',
          a: `₹${marginalRate.toFixed(2)}/यूनिट वह है जो अगर आप पहले से टॉप स्लैब में हैं तो आपकी अगली यूनिट के इस्तेमाल पर लगती है — इसमें टॉप स्लैब दर, फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क शामिल है। यही एक और उपकरण, जैसे AC, चलाने की असली लागत है।`,
        },
      ]
    : [
        {
          q: `What is the price of 1 unit of electricity in ${tariff.state}?`,
          a: `${tariff.discomCode}'s residential tariff starts at ₹${firstSlabRate.toFixed(2)}/unit for the first slab and rises to ₹${topSlabRate.toFixed(2)}/unit at the top slab, before fuel cost adjustment and electricity duty. Your actual per-unit cost depends on your total consumption, since the tariff is telescopic.`,
        },
        {
          q: 'Why isn\'t there one single "1 unit price"?',
          a: `${tariff.discomCode} bills residential consumers on a telescopic slab structure — each unit you consume is charged at the rate of the slab it falls into, not a single flat rate. So your 50th unit and your 400th unit are priced differently.`,
        },
        {
          q: 'What does the marginal rate shown here mean?',
          a: `₹${marginalRate.toFixed(2)}/unit is what your NEXT unit of consumption costs if you're already in the top slab — this includes the top slab rate, fuel cost adjustment and electricity duty. It's the realistic cost of running one more appliance, like an AC.`,
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

  return (
    <>
      <PageHero
        hub="electricity"
        breadcrumb={[
          { label: hi ? 'बिजली' : 'Electricity', href: hi ? '/hi/electricity' : '/electricity' },
          { label: hi ? '1 यूनिट की कीमत' : '1 Unit Price', href: hi ? '/hi/electricity/unit-price' : '/electricity/unit-price' },
          { label: tariff.state, href: hi ? `/hi/electricity/unit-price/${config.slug}` : `/electricity/unit-price/${config.slug}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>⚡</span> Electricity hub
          </>
        }
        h1={hi ? `${tariff.state} — 1 यूनिट बिजली की कीमत` : `${tariff.state} — 1 Unit Electricity Price`}
        subtitle={
          hi ? (
            <>
              {tariff.discomCode} के असली, स्रोत-सत्यापित घरेलू टैरिफ के तहत
              एक यूनिट (kWh) बिजली की कीमत क्या है।
            </>
          ) : (
            <>
              What one unit (kWh) of electricity costs under {tariff.discomCode}
              &apos;s real, source-cited residential tariff.
            </>
          )
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section
        aria-labelledby="price"
        className="mb-8 rounded-xl border border-hairline border-l-4 border-l-brass bg-paper p-5"
      >
        <h2
          id="price"
          className="font-display text-sm font-semibold tracking-wide text-brass uppercase"
        >
          {hi ? 'मार्जिनल यूनिट कीमत (टॉप स्लैब, FCA और शुल्क सहित)' : 'Marginal unit price (top slab, incl. FCA & duty)'}
        </h2>
        <p className="font-display mt-2 text-4xl font-bold tabular-nums text-ink-navy">
          ₹{marginalRate.toFixed(2)}
          <span className="text-lg font-normal text-ash/60">
            {' '}
            {hi ? '/यूनिट' : '/unit'}
          </span>
        </p>
        <p className="mt-2 text-sm text-ash/60">
          {hi
            ? 'एक बार जब आप टॉप स्लैब में पहुंच जाते हैं, तो आपकी अगली यूनिट का खर्च यही है — एक और उपकरण चलाने की असली लागत।'
            : "This is what your next unit costs once you're in the top slab — the realistic cost of running one more appliance."}
        </p>
      </section>

      <section aria-labelledby="slabs" className="mb-10">
        <h2 id="slabs" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'पूरी स्लैब-वार दरें' : 'Full slab-wise rates'}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-mist text-ink-navy">
              <tr>
                <th className="px-4 py-2 font-semibold">{hi ? 'स्लैब' : 'Slab'}</th>
                <th className="px-4 py-2 text-right font-semibold">{hi ? 'दर/यूनिट' : 'Rate/unit'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {residential.slabs.map((s, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 font-medium">
                    {s.minUnits}–{s.maxUnits ?? '∞'} {hi ? 'यूनिट' : 'units'}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    ₹{s.ratePerUnit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-hairline bg-paper px-3 py-3 text-center">
            <dt className="text-[11px] tracking-wide text-ash/50 uppercase">
              {hi ? 'बिलिंग साइकल' : 'Billing cycle'}
            </dt>
            <dd className="font-display mt-1 font-bold text-ink-navy">
              {cycleLabel(tariff.billingCycle)}
            </dd>
          </div>
          {tariff.fuelCostAdjustment > 0 && (
            <div className="rounded-xl border border-hairline bg-paper px-3 py-3 text-center">
              <dt className="text-[11px] tracking-wide text-ash/50 uppercase">
                FCA
              </dt>
              <dd className="font-display mt-1 font-bold text-ink-navy">
                ₹{tariff.fuelCostAdjustment}{hi ? '/यूनिट' : '/unit'}
              </dd>
            </div>
          )}
          {tariff.electricityDutyPercent > 0 && (
            <div className="rounded-xl border border-hairline bg-paper px-3 py-3 text-center">
              <dt className="text-[11px] tracking-wide text-ash/50 uppercase">
                {hi ? 'शुल्क' : 'Duty'}
              </dt>
              <dd className="font-display mt-1 font-bold text-ink-navy">
                {tariff.electricityDutyPercent}%
              </dd>
            </div>
          )}
          <div className="rounded-xl border border-hairline bg-paper px-3 py-3 text-center">
            <dt className="text-[11px] tracking-wide text-ash/50 uppercase">
              {hi ? 'सत्यापित' : 'Verified'}
            </dt>
            <dd className="font-display mt-1 font-bold text-seal-red">
              {formatIsoDate(tariff.lastVerified)}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="three-answers" className="mb-10">
        <h2 id="three-answers" className="font-display mb-4 text-2xl font-semibold">
          {hi
            ? `"1 यूनिट की कीमत" के तीन अलग जवाब हैं`
            : 'There are three different answers to "price of 1 unit"'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? `और तीनों सही हैं — वे अलग-अलग सवालों के जवाब देते हैं। ${tariff.discomCode} की दरें टेलिस्कोपिक स्लैब पर चलती हैं, इसलिए कोई एक आंकड़ा नहीं होता।`
            : `All three are correct — they answer different questions. ${tariff.discomCode} bills on telescopic slabs, so a single figure does not exist.`}
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'स्लैब दर' : 'The slab rate'}
              </strong>{' '}
              — {hi
                ? `₹${firstSlabRate.toFixed(2)} से ₹${topSlabRate.toFixed(2)}/यूनिट। यही टैरिफ ऑर्डर में छपता है, और यही तब काम आता है जब आप दो टैरिफ आदेशों की तुलना कर रहे हों।`
                : `₹${firstSlabRate.toFixed(2)} to ₹${topSlabRate.toFixed(2)}/unit. This is what the tariff order publishes, and what you want when comparing one tariff order against another.`}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'असरदार औसत दर' : 'The effective average rate'}
              </strong>{' '}
              — {hi
                ? 'आपका कुल बिल ÷ आपकी कुल यूनिट, फिक्स्ड चार्ज और शुल्क सहित। बजट बनाने के लिए यही सही आंकड़ा है, और नीचे की टेबल इसे दिखाती है।'
                : 'your total bill ÷ your total units, fixed charges and duty included. This is the right figure for budgeting, and the table below shows it.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'मार्जिनल दर' : 'The marginal rate'}
              </strong>{' '}
              — {hi
                ? `₹${marginalRate.toFixed(2)}/यूनिट, ऊपर दिखाई गई। अगर आप टॉप स्लैब में हैं तो अगली यूनिट की यही कीमत है — AC या गीज़र जैसा एक और उपकरण चलाने का फैसला इसी से तय होना चाहिए।`
                : `₹${marginalRate.toFixed(2)}/unit, shown at the top. This is what your next unit costs if you are already in the top slab — the number that should drive a decision about running one more appliance, like an AC or a geyser.`}
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: पूछें कि आपको आंकड़ा किस काम के लिए चाहिए — बजट, या अगला उपकरण।'
            : 'Takeaway: ask what you need the number for — budgeting, or the next appliance.'}
        </p>
      </section>

      {effectiveRows.length > 0 && (
        <section aria-labelledby="effective-rate" className="mb-10">
          <h2 id="effective-rate" className="font-display mb-4 text-2xl font-semibold">
            {hi
              ? `${tariff.state} में एक यूनिट की असल कीमत, खपत के हिसाब से`
              : `What a unit actually costs in ${tariff.state}, by consumption`}
          </h2>
          <p className="text-ash/80">
            {hi
              ? `नीचे हर पंक्ति पूरा बिल है — एनर्जी चार्ज, फिक्स्ड चार्ज, FCA और बिजली शुल्क सहित — उसी टैरिफ फाइल से जो हमारा बिल कैलकुलेटर इस्तेमाल करता है।`
              : `Each row is a complete bill — energy charge, fixed charge, fuel cost adjustment and electricity duty — from the same tariff file our bill calculator uses.`}
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">
                    {hi ? 'खपत' : 'Consumption'}
                  </th>
                  <th className="px-4 py-2 text-right font-semibold">
                    {hi ? 'कुल बिल' : 'Total bill'}
                  </th>
                  <th className="px-4 py-2 text-right font-semibold">
                    {hi ? 'असल ₹/यूनिट' : 'Actual ₹/unit'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {effectiveRows.map((r) => (
                  <tr key={r.units}>
                    <td className="px-4 py-2 font-medium">
                      {r.units} {hi ? 'यूनिट' : 'units'}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-ash/70">
                      ₹{r.total.toFixed(0)}
                    </td>
                    <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                      ₹{r.effective.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            {hi
              ? `${periodWord} बिलिंग अवधि की यूनिट, ${ASSUMED_LOAD_KW} kW स्वीकृत लोड मानकर (ज़्यादातर DISCOM फिक्स्ड चार्ज प्रति kW लेते हैं, इसलिए यह मानना ज़रूरी है)। आपका स्वीकृत लोड अलग हो तो फिक्स्ड चार्ज बदलेगा।`
              : `Units are for one ${periodWord} billing period, assuming a ${ASSUMED_LOAD_KW} kW sanctioned load — most DISCOMs charge fixed charges per sanctioned kW, so a load has to be assumed. A different sanctioned load changes the fixed-charge component.`}
          </p>
          {cheapestRow && (
            <p className="mt-4 text-ash/80">
              {hi
                ? `ध्यान दें कि यह सीधी रेखा नहीं है। ${tariff.discomCode} पर सबसे सस्ती प्रति-यूनिट कीमत ${cheapestRow.units} यूनिट के आसपास आती है (₹${cheapestRow.effective.toFixed(2)}/यूनिट) — उससे कम खपत पर ₹${cheapestRow.fixed.toFixed(0)} का फिक्स्ड चार्ज कम यूनिटों पर बंटता है, जिससे हर यूनिट महंगी पड़ती है, और ज़्यादा खपत पर ऊंचे स्लैब दर बढ़ा देते हैं।`
                : `Notice this is not a straight line. On ${tariff.discomCode} the cheapest per-unit price lands around ${cheapestRow.units} units (₹${cheapestRow.effective.toFixed(2)}/unit) — below that, the ₹${cheapestRow.fixed.toFixed(0)} fixed charge is spread over fewer units so each one costs more, and above it the higher slabs push the rate back up.`}
            </p>
          )}
          <p className="mt-3 text-ash/80">
            {hi
              ? 'इसका व्यावहारिक मतलब: बहुत कम बिजली इस्तेमाल करने वाले घर प्रति यूनिट सबसे सस्ती दर नहीं पाते — वे फिक्स्ड चार्ज को कम यूनिटों पर बांटते हैं। और भारी खपत वाले घरों के लिए हर अतिरिक्त यूनिट औसत से महंगी होती है, औसत से नहीं आंकें।'
              : 'The practical consequence: a very low-consumption household does not get the cheapest per-unit rate, because it is spreading the fixed charge over fewer units. And for a heavy-consumption household, each additional unit costs more than the average — so never budget an extra appliance at your average rate.'}
          </p>
          <p className="mt-3 font-semibold text-ink-navy">
            {hi
              ? 'निष्कर्ष: प्रति-यूनिट कीमत खपत के साथ बदलती है, इसलिए अपनी असल खपत के करीब की पंक्ति देखें।'
              : 'Takeaway: the per-unit price moves with consumption, so read the row closest to your own usage.'}
          </p>
        </section>
      )}

      <section aria-labelledby="on-top" className="mb-10">
        <h2 id="on-top" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'स्लैब दर के ऊपर क्या जुड़ता है' : 'What gets added on top of the slab rate'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? `टैरिफ ऑर्डर में छपी स्लैब दर आपका पूरा बिल नहीं है। ${tariff.discomCode} पर इसके ऊपर ये जुड़ते हैं:`
            : `The slab rate printed in the tariff order is not your whole bill. On ${tariff.discomCode} these sit on top of it:`}
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ＋
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'फिक्स्ड चार्ज' : 'Fixed charge'}
              </strong>{' '}
              — {hi
                ? 'खपत से स्वतंत्र, अक्सर स्वीकृत लोड पर आधारित। आप शून्य यूनिट इस्तेमाल करें तो भी यह लगता है।'
                : 'independent of consumption, usually based on sanctioned load. It applies even if you use zero units.'}
            </span>
          </li>
          {tariff.fuelCostAdjustment > 0 && (
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>
                ＋
              </span>
              <span>
                <strong className="text-ink-navy">
                  {hi ? 'फ्यूल कॉस्ट एडजस्टमेंट (FCA)' : 'Fuel cost adjustment (FCA)'}
                </strong>{' '}
                — {hi
                  ? `₹${tariff.fuelCostAdjustment}/यूनिट, ईंधन की बदलती लागत पास-थ्रू करने के लिए। यह समय-समय पर बदलता है।`
                  : `₹${tariff.fuelCostAdjustment}/unit, passing through changes in fuel cost. It is revised periodically.`}
              </span>
            </li>
          )}
          {tariff.electricityDutyPercent > 0 && (
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-hub-electricity" aria-hidden>
                ＋
              </span>
              <span>
                <strong className="text-ink-navy">
                  {hi ? 'बिजली शुल्क' : 'Electricity duty'}
                </strong>{' '}
                — {hi
                  ? `${tariff.electricityDutyPercent}%, जो राज्य सरकार लेती है, DISCOM नहीं। यह अलग राज्य कानून के तहत लगता है।`
                  : `${tariff.electricityDutyPercent}%, levied by the state government rather than the DISCOM, under separate state legislation.`}
              </span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ＋
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'मीटर रेंट और अन्य मदें' : 'Meter rent and other line items'}
              </strong>{' '}
              — {hi
                ? 'छोटी रकम, पर ये भी आपकी असल प्रति-यूनिट कीमत में गिनी जाती हैं।'
                : 'small amounts, but they also count toward your real per-unit cost.'}
            </span>
          </li>
        </ul>
        <p className="mt-3 text-ash/80">
          {hi
            ? `यही वजह है कि ऊपर दी गई मार्जिनल दर ₹${marginalRate.toFixed(2)} है, जबकि टॉप स्लैब दर ₹${topSlabRate.toFixed(2)} — अंतर FCA और शुल्क है।`
            : `This is why the marginal rate above is ₹${marginalRate.toFixed(2)} while the top slab rate is ₹${topSlabRate.toFixed(2)} — the gap is FCA and duty.`}
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: स्लैब दर पर बजट बनाने से आप हमेशा कम आंकेंगे।'
            : 'Takeaway: budgeting at the slab rate will always understate the bill.'}
        </p>
      </section>

      <section aria-labelledby="using-it" className="mb-10">
        <h2 id="using-it" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'इस आंकड़े का इस्तेमाल कैसे करें' : 'How to use this number'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? 'सबसे आम और सबसे खर्चीली गलती है औसत दर पर एक नए उपकरण का खर्च आंकना:'
            : 'The most common and most expensive mistake is costing a new appliance at your average rate:'}
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'नया उपकरण जोड़ रहे हैं' : 'Adding an appliance'}
              </strong>{' '}
              — {hi
                ? `मार्जिनल दर ₹${marginalRate.toFixed(2)} इस्तेमाल करें। AC, गीज़र या पंप आपकी मौजूदा खपत के ऊपर जुड़ता है, इसलिए वह आपके सबसे ऊंचे स्लैब पर बिल होता है।`
                : `use the marginal rate of ₹${marginalRate.toFixed(2)}. An AC, geyser or pump stacks on top of your existing consumption, so it is billed at your highest slab.`}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'महीने का बजट बना रहे हैं' : 'Budgeting for the month'}
              </strong>{' '}
              — {hi
                ? 'ऊपर की टेबल में अपनी खपत के करीब की पंक्ति देखें, क्योंकि उसमें फिक्स्ड चार्ज शामिल है।'
                : 'read the row nearest your consumption in the table above, since it includes the fixed charge.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              →
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'सोलर या बचत का आंकलन' : 'Sizing solar or a saving'}
              </strong>{' '}
              — {hi
                ? 'बचाई गई यूनिट सबसे ऊपरी स्लैब से कटती है, इसलिए बचत मार्जिनल दर पर आंकें, औसत पर नहीं।'
                : 'units you save come off the top slab first, so value the saving at the marginal rate, not the average.'}
            </span>
          </li>
        </ul>
        <p className="mt-3 text-ash/80">
          {hi ? 'यही गणित अपनी असल खपत पर चलाएं: ' : 'Run this on your own consumption: '}
          <Link
            href={hi ? `/hi/electricity/${config.slug}` : `/electricity/${config.slug}`}
            className="text-brass underline"
          >
            {hi ? `${tariff.discomCode} बिल कैलकुलेटर` : `${tariff.discomCode} bill calculator`}
          </Link>
          {hi ? ', या ' : ', or compare across states on the '}
          <Link
            href={hi ? '/hi/electricity/unit-price' : '/electricity/unit-price'}
            className="text-brass underline"
          >
            {hi ? 'सभी राज्यों की यूनिट कीमत' : 'unit-price directory'}
          </Link>
          {hi ? ' से राज्यों की तुलना करें।' : '.'}
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: बजट के लिए औसत, किसी भी नए फैसले के लिए मार्जिनल।'
            : 'Takeaway: average for budgeting, marginal for any new decision.'}
        </p>
      </section>

      <section aria-labelledby="find-on-bill" className="mb-10">
        <h2 id="find-on-bill" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'अपने बिल पर ये आंकड़े कहां मिलेंगे' : 'Where to find these numbers on your own bill'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? 'अंदाज़े से बेहतर है कि आप अपनी असल दर अपने बिल से निकालें। लेआउट DISCOM के हिसाब से बदलता है, पर ये मदें लगभग हर बिल पर होती हैं:'
            : 'Better than any estimate is your own bill. Layouts differ by DISCOM, but these line items appear on almost all of them:'}
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'खपत की यूनिट' : 'Units consumed'}
              </strong>{' '}
              — {hi
                ? 'वर्तमान और पिछली मीटर रीडिंग का अंतर। टेलिस्कोपिक स्लैब इसी संख्या पर लगते हैं।'
                : 'the difference between the current and previous meter readings. The telescopic slabs apply to this number.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'एनर्जी चार्ज' : 'Energy charge'}
              </strong>{' '}
              — {hi
                ? 'स्लैब-वार गणना, अक्सर अलग-अलग पंक्तियों में टूटी हुई। इसे ऊपर की स्लैब टेबल से मिलाकर देखें।'
                : 'the slab-wise computation, often broken into separate lines. Reconcile it against the slab table above.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'फिक्स्ड/डिमांड चार्ज' : 'Fixed or demand charge'}
              </strong>{' '}
              — {hi
                ? 'आपके स्वीकृत लोड से जुड़ा। अगर यह अपेक्षा से ऊंचा है, तो हो सकता है आपका स्वीकृत लोड आपकी असल ज़रूरत से ज़्यादा दर्ज हो।'
                : 'tied to your sanctioned load. If it looks higher than expected, your sanctioned load may be recorded above what you actually need.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-electricity" aria-hidden>
              ✓
            </span>
            <span>
              <strong className="text-ink-navy">
                {hi ? 'अपनी असल दर निकालें' : 'Derive your actual rate'}
              </strong>{' '}
              — {hi
                ? 'कुल देय रकम ÷ खपत की यूनिट। यह आंकड़ा ऊपर की टेबल की अपनी पंक्ति के करीब होना चाहिए; बहुत अलग हो तो बकाया, समायोजन या बदला हुआ FCA वजह हो सकती है।'
                : 'total amount payable ÷ units consumed. It should land near your row in the table above; a large gap usually means arrears, an adjustment, or a revised FCA.'}
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: एक भाग से आपको अपनी असली प्रति-यूनिट कीमत मिल जाती है।'
            : 'Takeaway: one division gives you your own true per-unit price.'}
        </p>
      </section>

      <section aria-labelledby="provenance" className="mb-10">
        <h2 id="provenance" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'ये दरें कहां से आई हैं, और कब बदलती हैं' : 'Where these rates come from, and when they change'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? `ऊपर की सभी दरें ${tariff.discomName} के प्रकाशित घरेलू टैरिफ से हैं, जो ${formatIsoDate(tariff.effectiveFrom)} से लागू है। हमने इसे ${formatIsoDate(tariff.lastVerified)} को आखिरी बार सत्यापित किया।`
            : `Every rate above comes from ${tariff.discomName}'s published residential tariff, effective from ${formatIsoDate(tariff.effectiveFrom)}. We last verified it on ${formatIsoDate(tariff.lastVerified)}.`}
        </p>
        <p className="mt-3 text-ash/80">
          {hi
            ? 'भारत में घरेलू टैरिफ DISCOM खुद तय नहीं करती — राज्य विद्युत नियामक आयोग एक टैरिफ आदेश में उन्हें मंज़ूरी देता है, और वे आदेश समय-समय पर संशोधित होते हैं। FCA आमतौर पर स्लैब दरों से ज़्यादा बार बदलता है। इसलिए किसी भी बड़े फैसले से पहले प्राथमिक स्रोत देख लें:'
            : 'Residential tariffs in India are not set by the DISCOM alone — the state electricity regulatory commission approves them in a tariff order, and those orders are revised periodically. The fuel cost adjustment typically changes more often than the slab rates do. So check the primary source before any decision that depends on it:'}
        </p>
        <p className="mt-3">
          <a
            href={tariff.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            {hi
              ? isSecondarySource
                ? `${tariff.discomCode} के लिए हमने जो टैरिफ स्रोत इस्तेमाल किया →`
                : `${tariff.discomCode} का आधिकारिक टैरिफ पेज →`
              : isSecondarySource
                ? `The tariff source we used for ${tariff.discomCode} →`
                : `${tariff.discomCode}'s official tariff page →`}
          </a>
        </p>
        {isUnverified ? (
          <p className="mt-2 text-sm text-ash/70">
            {hi
              ? `साफ़ तौर पर: ${tariff.discomCode} के ये आंकड़े फिलहाल अनवेरिफाइड हैं — नियामक के प्राइमरी टैरिफ आदेश के खिलाफ हमारी क्रॉस-चेक अभी बाकी है। इन्हें अनुमानित मार्गदर्शक मानें, अंतिम आंकड़ा नहीं, और कोई भी बड़ा फैसला लेने से पहले नीचे दिए स्रोत से पुष्टि करें।`
              : `To be explicit: ${tariff.discomCode}'s figures are currently unverified — our cross-check against the regulator's primary tariff order is still pending. Treat these as an approximate guide, not a final figure, and confirm against the source below before anything consequential.`}
          </p>
        ) : (
          <p className="mt-2 text-sm text-ash/70">
            {hi
              ? `साफ़ तौर पर: इस DISCOM के लिए हमारा सत्यापन एक सेकंडरी स्रोत के आधार पर है, DISCOM या नियामक के अपने प्रकाशित पेज से नहीं। दरें हमारी जानकारी में सही हैं, पर किसी भी बड़े फैसले से पहले राज्य विद्युत नियामक आयोग के टैरिफ आदेश से पुष्टि करें।`
              : `To be explicit: for this DISCOM our verification rests on a secondary source, not the DISCOM's or regulator's own published page. The rates are correct to the best of our knowledge, but confirm against the state electricity regulatory commission's tariff order before anything consequential.`}
          </p>
        )}
        <p className="mt-3 text-xs text-ash/50">
          {hi ? 'सत्यापन नोट: ' : 'Verification note: '}
          {tariff.verifiedBy}
        </p>
        <p className="mt-3 text-ash/80">
          {hi
            ? 'हम आंकड़े कैसे जुटाते और सत्यापित करते हैं, और कोई श्रेणी सत्यापित न होने पर क्या करते हैं, यह हमारी '
            : 'How we source and verify these figures, and what we do when a category cannot be verified, is set out in our '}
          <Link href={hi ? '/hi/methodology' : '/methodology'} className="text-brass underline">
            {hi ? 'मेथडोलॉजी' : 'methodology'}
          </Link>
          {hi ? ' में दिया है।' : '.'}
        </p>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: यह पेज एक दिनांकित स्नैपशॉट है, स्थायी दर नहीं — बड़े फैसलों के लिए स्रोत से मिलान करें।'
            : 'Takeaway: this page is a dated snapshot, not a permanent rate — reconcile against the source for anything consequential.'}
        </p>
      </section>

      <section aria-labelledby="calc" className="mb-10">
        <h2 id="calc" className="font-display mb-2 text-2xl font-semibold">
          {hi ? 'सिर्फ यूनिट कीमत नहीं, अपना पूरा बिल चाहिए?' : 'Want your full bill, not just the unit price?'}
        </h2>
        <Link
          href={hi ? `/hi/electricity/${config.slug}` : `/electricity/${config.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-brass px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brass/90"
        >
          <span aria-hidden>⚡</span>{' '}
          {hi
            ? `पूरा ${tariff.discomCode} बिल कैलकुलेटर खोलें →`
            : `Open the full ${tariff.discomCode} bill calculator →`}
        </Link>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently asked questions'}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
    </>
  )
}
