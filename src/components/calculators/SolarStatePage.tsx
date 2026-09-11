import Link from 'next/link'
import PageHero from '@/components/PageHero'
import SolarRoiCalculator, { type SolarRoiCalculatorTexts } from '@/components/calculators/SolarRoiCalculator'
import discomsJson from '@/data/discoms.json'
import { calculateSolarRoi } from '@/lib/calc/solar'
import { formatINR } from '@/lib/format'

const SITE = 'https://desimetrics.com'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const solarRoiTextsHi: SolarRoiCalculatorTexts = {
  title: 'सोलर ROI कैलकुलेटर',
  subtitle: 'रूफटॉप सिस्टम से पेबैक अवधि और बचत',
  discomLabel: 'आपका DISCOM / राज्य',
  unitsLabel: 'औसत मासिक खपत',
  unitsUnit: 'यूनिट',
  kwLabel: 'सिस्टम साइज़',
  kwUnit: 'kW',
  kwHint: 'सुझाव: हर 100–150 मासिक यूनिट पर लगभग 1 kW एक सामान्य शुरुआती बिंदु है।',
  ctaLabel: 'सोलर बचत निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  paybackLabel: 'पेबैक अवधि',
  paybackUnit: 'साल',
  thenSavesTemplate: 'फिर करीब {amount} की बचत',
  recoveredLabel: 'सिस्टम की लागत वसूल, साल 1',
  systemCostLabel: 'सिस्टम की लागत',
  subsidyLabel: 'PM सूर्य घर सब्सिडी',
  netCostLabel: 'नेट लागत',
  annualGenLabel: 'सालाना जनरेशन',
  annualGenUnit: 'यूनिट',
  monthlySavingsLabel: 'मासिक बचत',
  lifetimeSavingsLabel: '25-साल की नेट बचत',
}

export default function SolarStatePage({
  state,
  discomCode,
  slug,
  locale = 'en',
}: {
  state: string
  discomCode: string
  slug: string
  locale?: 'en' | 'hi'
}) {
  const hi = locale === 'hi'
  const base = hi ? `/hi/solar/bill-calculator/${discomCode.toLowerCase()}` : `/solar/bill-calculator/${discomCode.toLowerCase()}`
  const example = calculateSolarRoi({ discomCode, monthlyUnits: 300, systemSizeKw: 3 })

  const faqs = hi
    ? [
        {
          q: `${state} में रूफटॉप सोलर सिस्टम की कीमत कितनी है?`,
          a: `हमारे अनुमान में सब्सिडी से पहले 3 kW सिस्टम की कीमत लगभग ${formatINR(example.systemCost)} है, जो PM सूर्य घर केंद्रीय सब्सिडी के बाद ${formatINR(example.netCost)} तक गिर जाती है। असली इंस्टॉलर कोट पैनल के प्रकार, छत की स्थिति और स्थानीय इंस्टॉलेशन लागत के हिसाब से अलग हो सकते हैं।`,
        },
        {
          q: `क्या यह ${discomCode} के असली टैरिफ का इस्तेमाल करता है?`,
          a: `हां — बचत ${discomCode} के असली टेलिस्कोपिक स्लैब टैरिफ के आधार पर गिनी जाती है, ताकि सोलर की कीमत पहले आपकी असली, सबसे महंगी यूनिट्स को ऑफसेट करने पर आधारित हो, किसी फ्लैट राष्ट्रीय औसत दर पर नहीं।`,
        },
        {
          q: 'कौन सी सब्सिडी उपलब्ध है?',
          a: 'PM सूर्य घर: मुफ्त बिजली योजना, केंद्र सरकार की योजना, पहले 2 kW के लिए ₹30,000/kW और तीसरे kW के लिए ₹18,000 देती है, अधिकतम ₹78,000 तक — राज्य चाहे जो भी हो, पूरे देश में समान।',
        },
      ]
    : [
        {
          q: `How much does a rooftop solar system cost in ${state}?`,
          a: `A 3 kW system costs about ${formatINR(example.systemCost)} before subsidy in our estimate, dropping to ${formatINR(example.netCost)} after the PM Surya Ghar central subsidy. Actual installer quotes vary by panel type, roof condition and local installation costs.`,
        },
        {
          q: `Does this use ${discomCode}'s real tariff?`,
          a: `Yes — savings are computed against ${discomCode}'s actual telescopic slab tariff, so solar is valued at offsetting your real, most expensive units first, not a flat national average rate.`,
        },
        {
          q: 'What subsidy is available?',
          a: 'PM Surya Ghar: Muft Bijli Yojana, the central government scheme, pays ₹30,000/kW for the first 2 kW and ₹18,000 for the 3rd kW, capped at ₹78,000 — the same nationwide, regardless of state.',
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
  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${state} Solar Bill Calculator`,
    url: `${SITE}${base}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    areaServed: 'India',
  }

  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: hi ? 'सोलर' : 'Solar', href: hi ? '/hi/solar' : '/solar' },
          { label: hi ? 'बिल कैलकुलेटर' : 'Bill Calculator', href: hi ? '/hi/solar/bill-calculator' : '/solar/bill-calculator' },
          { label: state, href: base },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1={hi ? `${state} सोलर बिल कैलकुलेटर` : `${state} Solar Bill Calculator`}
        subtitle={
          hi ? (
            <>
              {state} में अपने रूफटॉप सोलर की पेबैक और बचत का अनुमान लगाएं,{' '}
              <strong>{discomCode} के असली टेलिस्कोपिक टैरिफ</strong> और PM
              सूर्य घर केंद्रीय सब्सिडी का इस्तेमाल करते हुए।
            </>
          ) : (
            <>
              Estimate your rooftop solar payback and savings in {state}, using{' '}
              <strong>{discomCode}&apos;s real telescopic tariff</strong> and the
              PM Surya Ghar central subsidy.
            </>
          )
        }
        stats={
          hi
            ? [
                { icon: '💸', big: '₹78,000', small: 'अधिकतम सब्सिडी', tone: 'hub' },
                { icon: '☀️', big: '~4u/kW/दिन', small: 'जनरेशन मान्यता', tone: 'hub' },
                { icon: '📆', big: '25 साल', small: 'सिस्टम की उम्र', tone: 'hub' },
                { icon: '📊', big: discomCode, small: 'असली टैरिफ', tone: 'hub' },
              ]
            : [
                { icon: '💸', big: '₹78,000', small: 'Max subsidy', tone: 'hub' },
                { icon: '☀️', big: '~4u/kW/day', small: 'Generation assumption', tone: 'hub' },
                { icon: '📆', big: '25 yrs', small: 'System lifetime', tone: 'hub' },
                { icon: '📊', big: discomCode, small: 'Real tariff', tone: 'hub' },
              ]
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section
        aria-labelledby="worked-example"
        className="mb-8 rounded-xl border border-hairline border-l-4 border-l-brass bg-paper p-5"
      >
        <h2
          id="worked-example"
          className="font-display text-sm font-semibold tracking-wide text-brass uppercase"
        >
          {hi ? 'उदाहरण गणना' : 'Worked example'}
        </h2>
        <p className="mt-2 text-ash/80">
          {hi ? (
            <>
              {state} के एक घर के लिए महीने में 300 यूनिट इस्तेमाल पर{' '}
              <strong>3 kW</strong> का रूफटॉप सिस्टम लगभग{' '}
              <strong>{formatINR(example.systemCost)}</strong> का पड़ता है,{' '}
              {formatINR(example.subsidy)} PM सूर्य घर सब्सिडी के बाद{' '}
              <strong>{formatINR(example.netCost)}</strong> तक गिर जाता है, करीब{' '}
              <strong className="text-spark-teal">{formatINR(example.annualSavings)}</strong>
              /साल बचाता है, और लगभग{' '}
              <strong>
                {example.paybackYears != null ? `${example.paybackYears} साल` : 'लागू नहीं'}
              </strong>{' '}
              में लागत वसूल कर लेता है।
            </>
          ) : (
            <>
              A <strong>3 kW</strong> rooftop system for a {state} home using 300
              units/month costs about <strong>{formatINR(example.systemCost)}</strong>,
              drops to <strong>{formatINR(example.netCost)}</strong> after the{' '}
              {formatINR(example.subsidy)} PM Surya Ghar subsidy, saves about{' '}
              <strong className="text-spark-teal">{formatINR(example.annualSavings)}</strong>
              /year, and pays back in about{' '}
              <strong>
                {example.paybackYears != null ? `${example.paybackYears} years` : 'N/A'}
              </strong>
              .
            </>
          )}
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          {hi ? `अपना ${state} सोलर पेबैक निकालें` : `Calculate your ${state} solar payback`}
        </h2>
        <SolarRoiCalculator
          discoms={liveDiscoms}
          defaultDiscomCode={discomCode}
          texts={hi ? solarRoiTextsHi : undefined}
        />
      </section>

      <section aria-labelledby="how-calculated" className="mb-10 scroll-mt-20">
        <h2 id="how-calculated" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'यह अनुमान कैसे गिना जाता है' : 'How this estimate is calculated'}
        </h2>
        {hi ? (
          <>
            <p className="text-ash/80">
              हर हिस्से को असली, स्रोत-सत्यापित आंकड़ों पर आधारित रखा गया है —
              किसी राष्ट्रीय औसत पर नहीं:
            </p>
            <ul className="mt-3 space-y-2">
              {[
                ['जनरेशन', `भारत के औसत के आधार पर करीब 4 यूनिट/kW/दिन मानी जाती है, इसलिए एक 3 kW सिस्टम साल में लगभग ${(3 * 4 * 365).toLocaleString('en-IN')} यूनिट बनाता है।`],
                ['असली टैरिफ पर आधारित बचत', `बचत = सोलर से पहले का बिल − सोलर के बाद का बिल, ${discomCode} के असली टेलिस्कोपिक स्लैब पर गिना गया, ताकि सोलर आपकी सबसे महंगी टॉप-स्लैब यूनिट्स की भरपाई पहले करे।`],
                ['सब्सिडी', 'PM सूर्य घर की केंद्रीय सब्सिडी (पहले 2 kW के लिए ₹30,000/kW, तीसरे kW के लिए ₹18,000, अधिकतम ₹78,000) सिस्टम की लागत से घटाकर नेट लागत निकाली जाती है।'],
                ['पेबैक', 'नेट लागत ÷ सालाना बचत — यानी कितने साल में सिस्टम अपनी लागत वसूल कर लेता है।'],
              ].map(([t, d]) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
                  <span className="text-ash/80">
                    <strong className="text-ink-navy">{t}</strong> — {d}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="text-ash/80">
              Every piece of this estimate is grounded in real, sourced data —
              not a flat national average:
            </p>
            <ul className="mt-3 space-y-2">
              {[
                ['Generation', `assumed at ~4 units/kW/day (the commonly cited India average), so a 3 kW system generates roughly ${(3 * 4 * 365).toLocaleString('en-IN')} units a year.`],
                ['Savings priced on your real tariff', `savings = your bill before solar minus your bill after solar, computed against ${discomCode}'s actual telescopic slabs, so solar offsets your most expensive top-slab units first.`],
                ['Subsidy', "the PM Surya Ghar central subsidy (₹30,000/kW for the first 2 kW, ₹18,000 for the 3rd, capped at ₹78,000) is subtracted from system cost to get your net cost."],
                ['Payback', 'net cost ÷ annual savings — how many years it takes the system to pay for itself.'],
              ].map(([t, d]) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 text-hub-solar" aria-hidden>✓</span>
                  <span className="text-ash/80">
                    <strong className="text-ink-navy">{t}</strong> — {d}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section aria-labelledby="what-changes" className="mb-10 scroll-mt-20">
        <h2 id="what-changes" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'आपका असली आंकड़ा किन बातों से बदल सकता है' : 'What can change your real number'}
        </h2>
        <ul className="space-y-2">
          {(hi
            ? [
                ['छत की धूप और छाया', 'दक्षिण की तरफ, बिना छाया वाली छत ज़्यादा जनरेशन देती है — छायादार या गलत दिशा वाली छत मानी गई यूनिट से कम बनाती है।'],
                ['असली इंस्टॉलर कोट', 'सिस्टम की लागत यहां एक अनुमान है — पैनल ब्रांड, इंस्टॉलेशन की गुणवत्ता और आपके शहर के हिसाब से असली कोट अलग होगा।'],
                ['नेट मीटरिंग की दर', 'अगर आपका सिस्टम आपकी खपत से ज़्यादा बनाता है, तो अतिरिक्त यूनिट्स की कीमत आपके राज्य के नेट मीटरिंग एक्सपोर्ट रेट पर निर्भर करती है, जो यहां मॉडल नहीं किया गया।'],
                ['दिन में इस्तेमाल का पैटर्न', 'दिन में ज़्यादा बिजली इस्तेमाल करने वाला घर सीधे इस्तेमाल से ज़्यादा फायदा उठाता है, बजाय ग्रिड एक्सपोर्ट क्रेडिट के — जो आम तौर पर कम मूल्यवान होता है।'],
              ]
            : [
                ['Roof orientation and shading', 'a south-facing, unshaded roof generates more than assumed here — a shaded or poorly oriented roof generates less.'],
                ['Real installer quotes', 'system cost here is an estimate — panel brand, installation quality and your city all move the actual quote.'],
                ['Net metering export rate', "if your system generates more than you consume, the value of the surplus depends on your state's net-metering export rate, which isn't modelled here."],
                ['Your daytime usage pattern', 'a household that uses more power during daylight hours gets more value from direct self-consumption than from grid export credit, which is usually worth less.'],
              ]
          ).map(([t, d]) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-caution-amber" aria-hidden>!</span>
              <span className="text-ash/80">
                <strong className="text-ink-navy">{t}</strong> — {d}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-ash/80">
          {hi ? (
            <>
              पूरी जानकारी के लिए देखें हमारी{' '}
              <Link
                href={hi ? '/hi/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide' : '/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide'}
                className="text-brass underline"
              >
                PM सूर्य घर सब्सिडी गाइड
              </Link>{' '}
              (पात्रता, दस्तावेज़, आवेदन कैसे करें), या{' '}
              <Link
                href={hi ? '/hi/blog/is-rooftop-solar-worth-it-in-india-2026' : '/blog/is-rooftop-solar-worth-it-in-india-2026'}
                className="text-brass underline"
              >
                2026 में रूफटॉप सोलर लगाना फायदेमंद है या नहीं
              </Link>{' '}
              पर व्यापक फायदे/नुकसान की चर्चा।
            </>
          ) : (
            <>
              For the full picture, see our{' '}
              <Link
                href="/blog/pm-surya-ghar-muft-bijli-yojana-subsidy-guide"
                className="text-brass underline"
              >
                PM Surya Ghar subsidy guide
              </Link>{' '}
              (eligibility, documents, how to apply) or the broader{' '}
              <Link
                href="/blog/is-rooftop-solar-worth-it-in-india-2026"
                className="text-brass underline"
              >
                is rooftop solar worth it in India in 2026?
              </Link>{' '}
              pros-and-cons case.
            </>
          )}
        </p>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'जुड़े हुए कैलकुलेटर' : 'Related calculators'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href={hi ? '/hi/solar/subsidy-calculator' : '/solar/subsidy-calculator'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💸</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'PM सूर्य घर सब्सिडी' : 'PM Surya Ghar subsidy'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'अपनी सटीक पात्रता और सब्सिडी राशि जांचें।' : 'Check your exact eligibility and subsidy amount.'}
            </p>
          </Link>
          <Link
            href={hi ? '/hi/solar/panel-size-calculator' : '/solar/panel-size-calculator'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'पैनल साइज़ कैलकुलेटर' : 'Panel size calculator'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'आपको किस सिस्टम साइज़ और छत के क्षेत्रफल की ज़रूरत है।' : 'What system size and roof area you need.'}
            </p>
          </Link>
          <Link
            href={hi ? `/hi/electricity/${slug}` : `/electricity/${slug}`}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? `${state} बिल कैलकुलेटर` : `${state} bill calculator`}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? `अपना पूरा ${discomCode} बिजली बिल देखें।` : `See your full ${discomCode} electricity bill.`}
            </p>
          </Link>
        </div>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
    </main>
    </>
  )
}
