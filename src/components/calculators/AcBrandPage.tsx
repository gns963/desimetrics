import Link from 'next/link'
import discomsJson from '@/data/discoms.json'
import PageHero from '@/components/PageHero'
import { getAcBrand } from '@/data/ac-brands'
import { calculateAcCost } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import AcBillCalculator, { type AcBillCalculatorTexts } from './AcBillCalculator'

const SITE = 'https://desimetrics.com'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const acBillCalculatorTextsHi: AcBillCalculatorTexts = {
  title: 'AC रनिंग कॉस्ट कैलकुलेटर',
  subtitle: 'अपने एयर कंडीशनर का बिजली खर्च निकालें',
  discomLabel: 'DISCOM / राज्य',
  tonnageLegend: 'टनेज',
  tonOptions: [
    { value: '0.8', label: '0.8 टन', icon: '🧊' },
    { value: '1', label: '1 टन', icon: '❄️' },
    { value: '1.5', label: '1.5 टन', icon: '❄️' },
    { value: '2', label: '2 टन', icon: '🥶' },
  ],
  starLegend: 'स्टार रेटिंग',
  starOptions: [
    { value: '3', label: '3 स्टार', icon: '⭐⭐⭐' },
    { value: '4', label: '4 स्टार', icon: '⭐⭐⭐⭐' },
    { value: '5', label: '5 स्टार', icon: '⭐⭐⭐⭐⭐' },
  ],
  hoursLabel: 'रोज़ का इस्तेमाल',
  hoursUnit: 'घंटे/दिन',
  ctaLabel: 'रनिंग कॉस्ट निकालें',
  monthlyLabel: 'अनुमानित मासिक रनिंग कॉस्ट',
  yearlyTemplate: '≈ {annual}/साल · {units} यूनिट/महीना',
  fiveStarSavingsTemplate: '5-स्टार पर जाने से {amount}/साल की बचत',
  inputPowerLabel: 'इनपुट पावर',
  iseerLabel: 'ISEER',
  unitsPerDayLabel: 'यूनिट प्रति दिन',
  billedAtLabel: 'बिलिंग दर (टॉप स्लैब)',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
}

export default function AcBrandPage({
  brandName,
  slug,
  locale = 'en',
}: {
  brandName: string
  slug: string
  locale?: 'en' | 'hi'
}) {
  const hi = locale === 'hi'
  const base = hi ? `/hi/ac/brands/${slug}` : `/ac/brands/${slug}`
  const brand = getAcBrand(slug)
  const example = calculateAcCost({
    discomCode: 'TNEB',
    tonnage: 1.5,
    starRating: 3,
    dailyHours: 8,
  })

  const faqs = hi
    ? [
        {
          q: `क्या यह कैलकुलेटर किसी भी ${brandName} AC मॉडल के लिए काम करता है?`,
          a: `हां — गणना टनेज, BEE स्टार रेटिंग और रोज़ के इस्तेमाल के घंटों पर आधारित है, जो ब्रांड चाहे जो भी हो, हर AC पर लागू होती है। सटीक अनुमान के लिए अपने ${brandName} मॉडल की टनेज और स्टार रेटिंग डालें (दोनों यूनिट और उसके BEE लेबल पर छपे होते हैं)।`,
        },
        {
          q: `${brandName} AC के लिए यह कितना सटीक है?`,
          a: `ISEER दक्षता मानक Bureau of Energy Efficiency (BEE) तय करता है और भारत में बिकने वाले सभी ब्रांडों पर समान रूप से लागू होता है — किसी भी निर्माता के 3-स्टार AC को समान न्यूनतम ISEER स्तर पूरा करना होता है। इसलिए यह अनुमान ${brandName} के लिए भी उतना ही सटीक है जितना किसी और BEE-लेबल वाले ब्रांड के लिए, सामान्य योजना-अनुमान सीमाओं (कमरे का इंसुलेशन, सेट तापमान, इस्तेमाल का पैटर्न) के भीतर।`,
        },
        {
          q: `मेरे ${brandName} AC की स्टार रेटिंग कहां मिलेगी?`,
          a: `इनडोर या आउटडोर यूनिट पर पीला BEE स्टार लेबल, या स्पेक शीट/बॉक्स देखें — इस पर स्टार रेटिंग और ISEER वैल्यू सीधे लिखी होती है।`,
        },
      ]
    : [
        {
          q: `Does this calculator work for any ${brandName} AC model?`,
          a: `Yes — the calculation is based on tonnage, BEE star rating and daily usage hours, which apply to any AC regardless of brand. Enter your specific ${brandName} model's tonnage and star rating (both printed on the unit and its BEE label) for an accurate estimate.`,
        },
        {
          q: `How accurate is this for a ${brandName} AC specifically?`,
          a: `The underlying ISEER efficiency standard is set by the Bureau of Energy Efficiency (BEE) and applies uniformly across all brands sold in India — a 3-star AC from any manufacturer must meet the same minimum ISEER band. So this estimate is equally accurate for ${brandName} as for any other BEE-labelled brand, within the usual planning-estimate caveats (room insulation, set temperature, usage pattern).`,
        },
        {
          q: `Where do I find my ${brandName} AC's star rating?`,
          a: `Check the yellow BEE star label on the indoor or outdoor unit, or the spec sheet/box it came in — it states the star rating and ISEER value directly.`,
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
    name: hi ? `${brandName} AC बिल कैलकुलेटर` : `${brandName} AC Bill Calculator`,
    url: `${SITE}${base}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    areaServed: 'India',
  }

  return (
    <>
      <PageHero
        hub="ac"
        breadcrumb={[
          { label: 'AC', href: hi ? '/hi/ac' : '/ac' },
          { label: hi ? 'ब्रांड' : 'Brands', href: hi ? '/hi/ac/brands' : '/ac/brands' },
          { label: brandName, href: base },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>❄️</span> AC hub
          </>
        }
        h1={hi ? `${brandName} AC बिल कैलकुलेटर` : `${brandName} AC Bill Calculator`}
        subtitle={
          hi ? (
            <>
              अपने {brandName} एयर कंडीशनर की टनेज और BEE स्टार रेटिंग से अनुमान
              लगाएं कि इसे चलाने में कितना खर्च आता है — जो{' '}
              <strong>आपके राज्य के असली टॉप बिजली स्लैब</strong> पर आधारित है।
              हर ब्रांड के लिए हम यही असली ISEER-आधारित तरीका इस्तेमाल करते हैं।
            </>
          ) : (
            <>
              Estimate what your {brandName} air conditioner costs to run, using
              its tonnage and BEE star rating — priced at{' '}
              <strong>your state&apos;s real top electricity slab</strong>. The
              same real ISEER-based method we use for every brand.
            </>
          )
        }
        stats={
          hi
            ? [
                { icon: '⭐', big: '3–5 ★', small: 'स्टार रेटिंग', tone: 'hub' },
                { icon: '📊', big: 'ISEER', small: 'BEE दक्षता आधार', tone: 'hub' },
                { icon: '📈', big: 'टॉप स्लैब', small: 'प्राइसिंग तरीका', tone: 'hub' },
                { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
              ]
            : [
                { icon: '⭐', big: '3–5 ★', small: 'Star ratings', tone: 'hub' },
                { icon: '📊', big: 'ISEER', small: 'BEE efficiency basis', tone: 'hub' },
                { icon: '📈', big: 'Top slab', small: 'Pricing method', tone: 'hub' },
                { icon: '🗺️', big: '36 states', small: 'DISCOM coverage', tone: 'hub' },
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
              तमिलनाडु में रोज़ 8 घंटे चलने वाला <strong>1.5 टन 3-स्टार {brandName}</strong>{' '}
              AC लगभग <strong>{example.dailyUnits} यूनिट/दिन</strong> इस्तेमाल
              करता है और इसका खर्च लगभग{' '}
              <strong>{formatINR(example.monthlyCost)}/महीना</strong> (
              {formatINR(example.annualCost)}/साल) आता है,{' '}
              {formatINR(example.effectiveRatePerUnit)}/यूनिट पर।
            </>
          ) : (
            <>
              A <strong>1.5 ton 3-star {brandName}</strong> AC running 8
              hours/day in Tamil Nadu uses about{' '}
              <strong>{example.dailyUnits} units/day</strong> and costs roughly{' '}
              <strong>{formatINR(example.monthlyCost)}/month</strong> (
              {formatINR(example.annualCost)}/year) at{' '}
              {formatINR(example.effectiveRatePerUnit)}/unit.
            </>
          )}
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          {hi ? `अपने ${brandName} AC का खर्च निकालें` : `Calculate your ${brandName} AC's cost`}
        </h2>
        <AcBillCalculator discoms={liveDiscoms} texts={hi ? acBillCalculatorTextsHi : undefined} />
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'यह कैसे गिना जाता है' : 'How this is calculated'}
        </h2>
        <div className="space-y-3 text-ash/80">
          {hi ? (
            <>
              <p>
                <strong>दक्षता (ISEER)।</strong> आपके {brandName} AC की स्टार
                रेटिंग एक BEE ISEER वैल्यू से जुड़ी होती है — यही मानक भारत में
                बिकने वाले हर ब्रांड पर लागू होता है, इसलिए एक 5-स्टार {brandName}{' '}
                यूनिट और किसी और ब्रांड का 5-स्टार यूनिट समान न्यूनतम दक्षता पूरी
                करते हैं। हम टनेज को कूलिंग पावर में बदलते हैं, इनपुट बिजली के
                लिए ISEER से भाग देते हैं, और ~70% कंप्रेसर ड्यूटी फैक्टर लगाते
                हैं।
              </p>
              <p>
                <strong>आपके टॉप स्लैब पर आधारित।</strong> चूंकि AC आपके मौजूदा
                इस्तेमाल के ऊपर जुड़ता है, इसकी यूनिट्स आपके सबसे ऊंचे टैरिफ
                स्लैब में गिरती हैं — हम असली अनुमान के लिए वही मार्जिनल दर
                (फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क सहित) इस्तेमाल करते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Efficiency (ISEER).</strong> Your {brandName} AC&apos;s
                star rating maps to a BEE ISEER value — the same standard applies
                to every brand sold in India, so a 5-star {brandName} unit and a
                5-star unit from any other brand meet the same minimum
                efficiency. We convert tonnage to cooling power, divide by ISEER
                for electrical input, and apply a ~70% compressor duty factor.
              </p>
              <p>
                <strong>Priced at your top slab.</strong> Since an AC adds to
                your existing consumption, its units fall in your highest tariff
                slab — we use that marginal rate (plus fuel cost adjustment and
                electricity duty) for a realistic estimate.
              </p>
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="verify-rating" className="mb-10">
        <h2 id="verify-rating" className="font-display mb-4 text-2xl font-semibold">
          {hi
            ? 'अपने मॉडल की ISEER रेटिंग खुद कैसे पुष्टि करें'
            : "How to verify your model's ISEER rating yourself"}
        </h2>
        <p className="text-ash/80">
          {hi
            ? 'किसी भी ब्रांड का — सिर्फ इसे नहीं — स्टार लेबल एक स्व-घोषित सर्टिफिकेशन है जिसे BEE पब्लिकली सर्च करने योग्य बनाता है, न कि कोई भरोसे पर लिया गया दावा:'
            : "Any brand's — not just this one's — star label is a self-declared certification that BEE makes publicly searchable, not a claim to take on trust:"}
        </p>
        <ol className="mt-3 space-y-2 text-ash/80">
          {(hi
            ? [
                'अपने यूनिट के इनडोर या आउटडोर पैनल पर पीला BEE स्टार लेबल खोजें — इस पर मॉडल नंबर और ISEER वैल्यू छपी होती है।',
                `BEE की Star Labelling Programme वेबसाइट पर जाकर उस मॉडल नंबर को खोजें, यह पुष्टि करने के लिए कि रेटिंग मौजूदा है और सही तरीके से रजिस्टर्ड है — मॉडल और ब्रांड चाहे जो भी हो, यही कदम लागू होता है।`,
                'ध्यान रखें कि BEE समय-समय पर बैंड सुधारता है, इसलिए कुछ साल पुराना 5-स्टार मॉडल आज के 5-स्टार मानक से मेल नहीं खा सकता — लेबल पर छपा साल जांचें।',
              ]
            : [
                "Find the yellow BEE star label on your unit's indoor or outdoor panel — it prints the model number and ISEER value.",
                "Search that model number on BEE's Star Labelling Programme website to confirm the rating is current and properly registered — the same step applies regardless of brand or model.",
                "Keep in mind BEE revises the bands periodically, so a 5-star model from a few years ago may not match today's 5-star standard — check the year printed on the label.",
              ]
          ).map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-ac font-display text-xs font-bold text-white">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: लेबल पर भरोसा करने से पहले मॉडल नंबर को पब्लिक रजिस्ट्री से मिलाकर देखें — यह काम किसी भी ब्रांड के लिए एक जैसा है।'
            : "Takeaway: cross-check the model number against the public registry before trusting the label — the process is identical for any brand."}
        </p>
      </section>

      <section aria-labelledby="matters-more" className="mb-10">
        <h2 id="matters-more" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'ब्रांड से ज़्यादा क्या मायने रखता है' : 'What matters more than brand'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? `${brandName} चुनना एक फैसला है; यह उतना ही ज़रूरी नहीं जितना ये तीन:`
            : `Choosing ${brandName} is one decision; it matters less than these three:`}
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              {hi ? (
                <>
                  <strong className="text-ink-navy">सही साइज़</strong> — एक
                  अंडरसाइज़्ड यूनिट लगभग लगातार चलती है चाहे उसका ब्रांड या
                  स्टार रेटिंग कुछ भी हो। पहले हमारे{' '}
                  <Link href={hi ? '/hi/ac/tonnage-calculator' : '/ac/tonnage-calculator'} className="text-brass underline">
                    टनेज कैलकुलेटर
                  </Link>{' '}
                  से साइज़ तय करें, फिर ब्रांड चुनें।
                </>
              ) : (
                <>
                  <strong className="text-ink-navy">Correct sizing</strong> — an
                  undersized unit runs close to continuously regardless of its
                  brand or star rating. Size it with our{' '}
                  <Link href={hi ? '/hi/ac/tonnage-calculator' : '/ac/tonnage-calculator'} className="text-brass underline">
                    tonnage calculator
                  </Link>{' '}
                  first, then pick the brand.
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              {hi
                ? 'इंस्टॉलेशन की गुणवत्ता — गलत रेफ्रिजरेंट चार्ज, खराब आउटडोर यूनिट प्लेसमेंट, या कमज़ोर पाइपिंग इंसुलेशन किसी भी ब्रांड की असली दक्षता को उसके ISEER लेबल से काफी नीचे ला सकता है।'
                : 'Installation quality — an incorrect refrigerant charge, poor outdoor-unit placement, or weak pipe insulation can pull any brand\'s real-world efficiency well below its ISEER label.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              {hi
                ? 'नियमित सर्विसिंग — गंदे फिल्टर और धूल भरी कॉइल कंप्रेसर को ज़्यादा देर तक ज़्यादा मेहनत करवाते हैं, जिससे असल खपत बढ़ती है — यह किसी भी ब्रांड पर लागू होता है।'
                : 'Regular servicing — dirty filters and dusty coils make the compressor work harder for longer, raising real consumption — true of any brand.'}
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: एक सही साइज़ का, सही इंस्टॉल किया गया औसत ब्रांड, एक गलत साइज़ के प्रीमियम ब्रांड को हरा देता है।'
            : 'Takeaway: a correctly sized, properly installed average-brand unit beats an incorrectly sized premium one.'}
        </p>
      </section>

      <section aria-labelledby="warranty-service" className="mb-10">
        <h2 id="warranty-service" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'कोई भी ब्रांड खरीदने से पहले ये सवाल पूछें' : 'Questions worth asking before buying any brand'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? 'ये सवाल हर ब्रांड पर लागू होते हैं, क्योंकि जवाब मॉडल, रिटेलर और समय के साथ बदलते हैं — हम किसी एक ब्रांड के लिए इनका जवाब दावे के तौर पर नहीं देते:'
            : "These apply to any brand, because the answers vary by model, retailer and time — we don't state answers for any one brand as a claim:"}
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              {hi
                ? 'कंप्रेसर पर कितने साल की वारंटी है, और क्या यह पूरी यूनिट की वारंटी से अलग है?'
                : 'How many years is the compressor warranty, and is it separate from the whole-unit warranty?'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              {hi
                ? 'क्या आपके शहर/इलाके में अधिकृत सर्विस सेंटर है, और सामान्य कॉल-आउट समय क्या है?'
                : 'Is there an authorised service centre in your city/area, and what is the typical call-out time?'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              {hi
                ? 'क्या इंस्टॉलेशन कीमत में शामिल है, और क्या इसे खुद अधिकृत तकनीशियन करेंगे या थर्ड-पार्टी ठेकेदार?'
                : 'Is installation included in the price, and is it done by the brand\'s own authorised technicians or a third-party contractor?'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              →
            </span>
            <span>
              {hi
                ? 'रिप्लेसमेंट पार्ट्स (खासकर PCB और कंप्रेसर) कितनी आसानी से और किस कीमत पर मिलते हैं?'
                : 'How readily, and at what cost, are replacement parts (especially the PCB and compressor) available?'}
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: वारंटी अवधि और सर्विस नेटवर्क अक्सर ISEER नंबर से ज़्यादा लंबी अवधि में फर्क डालते हैं।'
            : 'Takeaway: warranty length and the service network often matter more over the AC\'s life than the ISEER number itself.'}
        </p>
      </section>

      <section aria-labelledby="inverter-vs-fixed" className="mb-10">
        <h2 id="inverter-vs-fixed" className="font-display mb-4 text-2xl font-semibold">
          {hi
            ? 'इन्वर्टर बनाम फिक्स्ड-स्पीड — यह ब्रांड नहीं, तकनीक है'
            : 'Inverter versus fixed-speed — a technology choice, not a brand one'}
        </h2>
        <p className="text-ash/80">
          {hi
            ? `${brandName} सहित लगभग हर बड़ा ब्रांड दोनों तरह के मॉडल बेचता है, इसलिए यह फैसला ब्रांड चुनने से अलग है:`
            : `Nearly every major brand, ${brandName} included, sells both types, so this is a separate decision from picking the brand:`}
        </p>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              {hi ? (
                <>
                  <strong className="text-ink-navy">फिक्स्ड-स्पीड</strong> —
                  कंप्रेसर पूरी गति पर चलता है, फिर तापमान पहुंचने पर बंद हो
                  जाता है और दोबारा ज़रूरत पड़ने पर फिर से शुरू होता है। हर
                  बार दोबारा शुरू होना ज़्यादा करंट खींचता है।
                </>
              ) : (
                <>
                  <strong className="text-ink-navy">Fixed-speed</strong> — the
                  compressor runs at full speed, then switches off once the set
                  temperature is reached and restarts when needed again. Each
                  restart draws more current than steady running.
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-hub-ac" aria-hidden>
              ✓
            </span>
            <span>
              {hi ? (
                <>
                  <strong className="text-ink-navy">इन्वर्टर</strong> — कंप्रेसर
                  अपनी गति को लगातार ऊपर-नीचे करता है ताकि तापमान बनाए रखे, बार-बार
                  पूरी तरह बंद-चालू हुए बिना — जिससे आमतौर पर लंबे सेशन में कम
                  खपत होती है।
                </>
              ) : (
                <>
                  <strong className="text-ink-navy">Inverter</strong> — the
                  compressor continuously modulates its speed to hold the
                  temperature, instead of repeatedly switching fully on and off —
                  which typically uses less over a long session.
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              !
            </span>
            <span>
              {hi
                ? 'यह स्टार रेटिंग से अलग है — आपको 3-स्टार इन्वर्टर और 5-स्टार इन्वर्टर दोनों मिलेंगे। स्टार रेटिंग मापी गई दक्षता बताती है, इन्वर्टर कंप्रेसर की किस्म — दोनों लेबल एक साथ जांचें।'
                : "This is separate from star rating — you'll find both a 3-star inverter and a 5-star inverter. Star rating states measured efficiency; inverter describes the compressor type. Check both labels together, not one in place of the other."}
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: इन्वर्टर या फिक्स्ड-स्पीड चुनना अपने आप में ब्रांड चुनने से अलग फैसला है।'
            : 'Takeaway: inverter versus fixed-speed is its own decision, independent of which brand you pick.'}
        </p>
      </section>

      <section aria-labelledby="buying-mistakes" className="mb-10">
        <h2 id="buying-mistakes" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'कोई भी AC खरीदते समय होने वाली आम गलतियां' : 'Common mistakes when buying any AC'}
        </h2>
        <ul className="mt-3 space-y-2 text-ash/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              {hi
                ? 'सिर्फ ब्रांड नाम देखकर साइज़ और स्टार रेटिंग नज़रअंदाज़ करना — एक गलत साइज़ का टॉप-ब्रांड यूनिट, एक सही साइज़ के कम-जाने-पहचाने ब्रांड के यूनिट से ज़्यादा खर्च करेगा।'
                : 'Picking purely on brand name while ignoring size and star rating — an incorrectly sized top-brand unit will cost more to run than a correctly sized unit from a less familiar brand.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              {hi
                ? 'मौसमी सेल के दौरान बिना मॉडल नंबर जांचे खरीदना — एक ही सीरीज़ के पुराने, कम स्टार वाले मॉडल कभी-कभी नए मॉडल के नाम से मिलते-जुलते बेचे जाते हैं।'
                : 'Buying during a seasonal sale without checking the model number — an older, lower-star model from the same series is sometimes sold under a name similar to the current model.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              {hi
                ? 'इंस्टॉलेशन चार्ज और पाइपिंग/कॉपर अपग्रेड की लागत को अनदेखा करना — ये अक्सर यूनिट की कीमत से अलग होते हैं और ब्रांड की परवाह किए बिना जुड़ते हैं।'
                : 'Overlooking installation charges and piping/copper upgrade costs — these are often separate from the unit price and apply regardless of brand.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-caution-amber" aria-hidden>
              ✕
            </span>
            <span>
              {hi
                ? 'बिना मौजूदा वार्षिक रखरखाव अनुबंध (AMC) की शर्तें पढ़े उसे मान लेना — यह किसी भी ब्रांड में शामिल सर्विसिंग, कीमत और अवधि के हिसाब से काफी अलग होता है; हर बिंदु अलग से जांचें, न कि यह मान लें कि यह वारंटी का हिस्सा है।'
                : 'Assuming an offered annual maintenance contract (AMC) without reading its terms — coverage, price and duration vary widely regardless of brand; check each point rather than assuming it is bundled into the warranty.'}
            </span>
          </li>
        </ul>
        <p className="mt-3 font-semibold text-ink-navy">
          {hi
            ? 'निष्कर्ष: साइज़, स्टार रेटिंग और इंस्टॉलेशन की कुल लागत जांचें — फिर ब्रांड के बीच फैसला करें।'
            : 'Takeaway: verify size, star rating and total installation cost first — decide between brands after.'}
        </p>
      </section>

      {brand && (
        <section aria-labelledby="about-brand" className="mb-10">
          <h2 id="about-brand" className="font-display mb-4 text-2xl font-semibold">
            {hi ? `${brandName} के बारे में` : `About ${brandName}`}
          </h2>
          <p className="text-ash/80">
            {hi ? brand.originHi : brand.origin}{' '}
            {hi ? (
              <>
                लेकिन ब्रांड चाहे जो भी हो, इसके ISEER-रेटेड स्प्लिट और विंडो AC
                भारत में बिकने वाले हर दूसरे ब्रांड जैसे ही असली दक्षता मानक पर
                चलते हैं — नीचे देखें यह अनुमान कैसे निकाला जाता है।
              </>
            ) : (
              <>
                Whatever the brand, its ISEER-rated split and window ACs run on
                the same real efficiency standard as every other brand sold in
                India — see how this estimate is calculated above.
              </>
            )}
          </p>
        </section>
      )}

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'जुड़े हुए कैलकुलेटर' : 'Related calculators'}
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Link
            href={hi ? '/hi/ac/tonnage-calculator' : '/ac/tonnage-calculator'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'AC टनेज कैलकुलेटर' : 'AC tonnage calculator'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi
                ? `पक्का नहीं कि यह आपके कमरे के लिए सही साइज़ का ${brandName} AC है?`
                : `Not sure this is the right size ${brandName} AC for your room?`}
            </p>
          </Link>
          <Link
            href={hi ? '/hi/ac/comparison-tool' : '/ac/comparison-tool'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚖️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'AC तुलना टूल' : 'AC comparison tool'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'दो कॉन्फ़िगरेशन की आमने-सामने तुलना करें।' : 'Compare two configurations side by side.'}
            </p>
          </Link>
          <Link
            href={hi ? '/hi/ac/brands' : '/ac/brands'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🏷️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'सभी AC ब्रांड' : 'All AC brands'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'इस कैलकुलेटर में शामिल हर ब्रांड देखें।' : 'See every brand this calculator covers.'}
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
