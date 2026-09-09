import Link from 'next/link'
import GasCgdBillCalculator, { type GasCgdBillCalculatorTexts } from '@/components/calculators/GasCgdBillCalculator'
import PngVsLpgComparison from '@/components/calculators/PngVsLpgComparison'
import GasCgdComparisonTable from '@/components/gas/GasCgdComparisonTable'
import GasConsumptionReferenceTable from '@/components/gas/GasConsumptionReferenceTable'
import GasFormulaBlock from '@/components/gas/GasFormulaBlock'
import GasNeighborDiagnostic from '@/components/gas/GasNeighborDiagnostic'
import SplitHero from '@/components/SplitHero'
import { GAS_COMPANIES } from '@/data/gas-companies'
import { computeGasBill, getGasTariff, gasTariffRegistry } from '@/lib/calc/gas'
import { formatINR, formatIsoDate } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'

const SITE = 'https://desimetrics.com'

/** Every CGD with a real tariff file — used for the honest multi-provider
 *  comparison. Only IGL/MNGL/GGL exist today; more join as we verify them. */
const REAL_TARIFF_CGD_CODES = Object.keys(gasTariffRegistry)

const gasCgdBillTextsHi: GasCgdBillCalculatorTexts = {
  titleTemplate: '{cgdName} बिल कैलकुलेटर',
  subtitleTemplate: '{cgdCode} के असली घरेलू टैरिफ पर आधारित',
  consumptionLabelMonthly: 'प्रति महीना इस्तेमाल',
  consumptionLabelBimonthly: 'प्रति बिलिंग साइकल इस्तेमाल (~60 दिन)',
  consumptionUnit: 'SCM',
  consumptionHint: 'अपना मीटर या पिछला बिल जांचें — SCM = स्टैंडर्ड क्यूबिक मीटर।',
  ctaLabel: 'गैस बिल निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  estimatedBillLabel: 'अनुमानित बिल',
  monthlyEquivalentTemplate: '≈ {amount}/महीना समतुल्य',
  gasChargeLabel: 'गैस चार्ज',
  fixedChargeLabel: 'फिक्स्ड चार्ज',
}

export default function GasCgdPage({
  cgdCode,
  slug,
  locale = 'en',
}: {
  cgdCode: string
  slug: string
  locale?: 'en' | 'hi'
}) {
  const hi = locale === 'hi'
  const tariff = getGasTariff(cgdCode)
  const path = hi ? `/hi/gas/${slug}` : `/gas/${slug}`
  const topRate = tariff.slabs[tariff.slabs.length - 1].ratePerSCM

  const lowExample = computeGasBill(tariff, { scmConsumed: 20 })
  const highExample = computeGasBill(tariff, { scmConsumed: 80 })
  const heroExample = lowExample

  const otherCgds = GAS_COMPANIES.filter((c) => c.slug !== slug).slice(0, 3)
  const hasMultiCgdComparison = REAL_TARIFF_CGD_CODES.length > 1

  const tocLabel = tariff.billingCycle === 'bimonthly' ? '~60 days' : '~30 days'

  // Real rate spread across every CGD we've sourced — used in the "why most
  // calculators are wrong" section instead of an invented claim.
  const allRates = REAL_TARIFF_CGD_CODES.map((code) => getGasTariff(code))
  const cheapestTariff = [...allRates].sort((a, b) => a.slabs[0].ratePerSCM - b.slabs[0].ratePerSCM)[0]
  const priciestTariff = [...allRates].sort((a, b) => b.slabs[0].ratePerSCM - a.slabs[0].ratePerSCM)[0]
  const rateSpreadPercent =
    cheapestTariff && priciestTariff && cheapestTariff.cgdCode !== priciestTariff.cgdCode
      ? Math.round(
          ((priciestTariff.slabs[0].ratePerSCM - cheapestTariff.slabs[0].ratePerSCM) /
            cheapestTariff.slabs[0].ratePerSCM) *
            100,
        )
      : null

  const faqs = hi
    ? [
        {
          q: `मेरा ${tariff.cgdName} बिल कैसे गिना जाता है?`,
          a: `आपके SCM (स्टैंडर्ड क्यूबिक मीटर) इस्तेमाल को ${tariff.cgdName} की मौजूदा प्रति-SCM दर से गुणा किया जाता है, साथ ही बिलिंग साइकल के लिए एक फ्लैट फिक्स्ड/मीटर चार्ज। ${tariff.cgdCode} घरेलू PNG के लिए टेलिस्कोपिक स्लैब इस्तेमाल नहीं करता — हर SCM एक ही दर पर बिल होती है। ऊपर पूरा फॉर्मूला ब्यौरा देखें।`,
        },
        {
          q: 'SCM क्या है और यह कितने खाना पकाने के बराबर है?',
          a: 'एक Standard Cubic Metre (SCM) पाइप्ड नेचुरल गैस के लिए बिलिंग इकाई है, जो एक सामान्य घरेलू बर्नर पर औसत परिवार के लिए लगभग एक दिन के सामान्य खाना पकाने (दो वक्त का खाना) के बराबर है — एक उपयोगी मानसिक मापदंड, सटीक आंकड़ा नहीं क्योंकि असली इस्तेमाल घर के आकार और खाना पकाने की आदतों के हिसाब से बदलता है।',
        },
        {
          q: `मेरा ${tariff.cgdCode} बिल मासिक की बजाय द्विमासिक क्यों है?`,
          a: `${tariff.cgdCode} हर ${tocLabel === '~60 days' ? 'दो महीने' : 'महीने'} बिल करता है, इसलिए आपको दिखने वाला SCM आंकड़ा और कुल उस पूरी अवधि को कवर करते हैं — लंबी अवधि को ध्यान में रखे बिना इसे सीधे एक LPG सिलेंडर की कीमत से न मिलाएं। सही तुलना के लिए कैलकुलेटर द्वारा दिखाया गया मासिक-समतुल्य आंकड़ा इस्तेमाल करें।`,
        },
        {
          q: 'क्या PNG, LPG सिलेंडर से सस्ता है?',
          a: 'यह आपके इस्तेमाल और स्थानीय LPG कीमत पर निर्भर करता है — यह मान लेने की बजाय कि कोई एक हमेशा सस्ता है, नीचे PNG बनाम LPG तुलना अपने आंकड़ों से इस्तेमाल करें। PNG में आम तौर पर प्रति-यूनिट-ऊर्जा लागत कम होती है लेकिन सिलेंडर-डिलीवरी की झंझट भी नहीं होती, जबकि LPG को फिक्स्ड पाइपलाइन कनेक्शन की ज़रूरत नहीं होती।',
        },
        {
          q: 'सर्दियों में मेरा गैस बिल क्यों बढ़ जाता है?',
          a: 'ठंडे महीनों में चूल्हे पर पकाने का समय बढ़ जाता है और, जिन घरों में गैस गीज़र है, वहां गर्म पानी के लिए इसका इस्तेमाल भी बढ़ जाता है — दोनों SCM इस्तेमाल बढ़ाते हैं। गर्मियों के आधार से 10-15% मौसमी बढ़ोतरी आम है और अपने आप में लीक या मीटर की खराबी का संकेत नहीं है।',
        },
        {
          q: 'एक सामान्य घर में गैस का बिल कितना आता है?',
          a: `दिन में दो बार खाना पकाने वाले औसत घर के लिए, प्रति द्विमासिक साइकल लगभग 40-60 SCM की उम्मीद करें — ${tariff.cgdCode} की असली दर पर यह साइकल के लिए लगभग ${formatINR(computeGasBill(tariff, { scmConsumed: 50 }).total)} बैठता है (लगभग ${formatINR(computeGasBill(tariff, { scmConsumed: 50 }).monthlyEquivalent?.total ?? computeGasBill(tariff, { scmConsumed: 50 }).total)}/महीना)। आपका असली बिल घर के आकार और खाना पकाने की आदतों पर निर्भर करता है — अपने आंकड़ों के लिए ऊपर का कैलकुलेटर इस्तेमाल करें।`,
        },
        {
          q: 'PNG और LPG में क्या फर्क है?',
          a: 'PNG (पाइप्ड नेचुरल गैस) एक भूमिगत पाइपलाइन कनेक्शन के ज़रिए लगातार आती है और मीटर्ड SCM इस्तेमाल से बिल होती है, कोई सिलेंडर बुक या स्टोर नहीं करना पड़ता। LPG (लिक्विफाइड पेट्रोलियम गैस) एक भौतिक सिलेंडर में आती है जिसे आप बुक, कलेक्ट या डिलीवर करवाते हैं, और हर सिलेंडर के लिए पहले से भुगतान करते हैं — अपने इस्तेमाल पर असली खर्च के अंतर के लिए नीचे हमारी PNG बनाम LPG तुलना देखें।',
        },
        {
          q: 'मेरे PNG बिल पर फिक्स्ड चार्ज किसलिए है?',
          a: 'यह आपके घर तक पाइपलाइन कनेक्शन, मीटर और बिलिंग इंफ्रास्ट्रक्चर बनाए रखने की CGD की लागत को कवर करता है — उस साइकल में आप असल में कितनी गैस इस्तेमाल करते हैं इससे बेपरवाह लगाया जाता है, बिजली कनेक्शन के फिक्स्ड/डिमांड चार्ज जैसा।',
        },
        {
          q: `मैं अपना ${tariff.cgdCode} बिल ऑनलाइन कैसे जांचूं या चुकाऊं?`,
          a: `${tariff.cgdName} इस्तेमाल इतिहास जांचने, बिल देखने और ऑनलाइन भुगतान के लिए एक ऑनलाइन कस्टमर पोर्टल और मोबाइल ऐप देता है — मौजूदा पोर्टल लिंक के लिए उनकी आधिकारिक वेबसाइट जांचें, क्योंकि ये कभी-कभी बदल जाते हैं।`,
        },
        {
          q: 'इस कैलकुलेटर का टैरिफ डेटा कितनी बार सत्यापित किया जाता है?',
          a: `हम हर टैरिफ आंकड़े को एक प्रभावी-से और अंतिम-सत्यापित तारीख के साथ तारीख देते हैं, जो ऊपर टैरिफ तालिका और इस पेज के फुटर में दिखाई जाती है, और स्रोत का हवाला देते हैं। ${tariff.cgdCode} की दर आखिरी बार ${formatIsoDate(tariff.lastVerified)} को सत्यापित की गई थी — अपने हाल के बिल के साथ वह तारीख जांच लें, क्योंकि हमारे आखिरी सत्यापन और आज के बीच कोई दर बदलाव अभी यहां शामिल नहीं होगा।`,
        },
      ]
    : [
        {
          q: `How is my ${tariff.cgdName} bill calculated?`,
          a: `Your SCM (standard cubic metre) consumption is multiplied by ${tariff.cgdName}'s current per-SCM rate, plus a flat fixed/meter charge for the billing cycle. ${tariff.cgdCode} does not use telescopic slabs for domestic PNG — every SCM is billed at the same rate. See the full formula breakdown above.`,
        },
        {
          q: 'What is an SCM and how much cooking does it represent?',
          a: 'A Standard Cubic Metre (SCM) is the billing unit for piped natural gas, roughly equivalent to one day of standard cooking (two meals) for an average family on a typical domestic burner — a useful mental benchmark, not an exact figure since actual usage varies by household size and cooking habits.',
        },
        {
          q: `Why is my ${tariff.cgdCode} bill bi-monthly instead of monthly?`,
          a: `${tariff.cgdCode} bills every ${tocLabel === '~60 days' ? 'two months' : 'month'}, so the SCM figure and total you see cover that whole period — don't compare it directly to a single LPG cylinder's cost without accounting for the longer period. Use the monthly-equivalent figure the calculator shows for a fair comparison.`,
        },
        {
          q: 'Is PNG cheaper than LPG cylinders?',
          a: 'It depends on your consumption and local LPG price — use the PNG vs LPG comparison below with your own numbers rather than assuming either is always cheaper. PNG generally has a lower per-unit-energy cost but no cylinder-delivery hassle either way, while LPG doesn\'t require a fixed pipeline connection.',
        },
        {
          q: 'Why does my gas bill increase in winter?',
          a: 'Colder months bring more stovetop cooking time and, in homes that have one, more use of a gas geyser for hot water — both add SCM consumption. A 10-15% seasonal bump over your summer baseline is common and not a sign of a leak or meter fault by itself.',
        },
        {
          q: 'Gas ka bill kitna aata hai ek normal ghar mein?',
          a: `For an average household cooking two meals a day, expect somewhere around 40-60 SCM per bi-monthly cycle — on ${tariff.cgdCode}'s real rate that works out to roughly ${formatINR(computeGasBill(tariff, { scmConsumed: 50 }).total)} for the cycle (about ${formatINR(computeGasBill(tariff, { scmConsumed: 50 }).monthlyEquivalent?.total ?? computeGasBill(tariff, { scmConsumed: 50 }).total)}/month). Your actual bill depends on household size and cooking habits — use the calculator above for your own numbers.`,
        },
        {
          q: 'PNG aur LPG mein kya farak hai?',
          a: 'PNG (piped natural gas) arrives continuously through an underground pipeline connection and is billed by metered SCM consumption, with no cylinder to book or store. LPG (liquefied petroleum gas) comes in a physical cylinder you book, collect or have delivered, and pay for upfront per cylinder — see our PNG vs LPG comparison below for the actual cost difference at your usage.',
        },
        {
          q: 'What is the fixed charge on my PNG bill for?',
          a: 'It covers the CGD\'s cost of maintaining the pipeline connection, meter and billing infrastructure to your home — charged regardless of how much gas you actually use that cycle, similar to an electricity connection\'s fixed/demand charge.',
        },
        {
          q: `How do I check or pay my ${tariff.cgdCode} bill online?`,
          a: `${tariff.cgdName} provides an online customer portal and mobile app for checking consumption history, viewing bills and paying online — check their official website for the current portal link, since these occasionally change.`,
        },
        {
          q: "How often is this calculator's tariff data verified?",
          a: `We date every tariff figure with an effective-from and last-verified date, shown in the tariff table above and the footer of this page, and cite the source. ${tariff.cgdCode}'s rate was last verified ${formatIsoDate(tariff.lastVerified)} — check that date against your own recent bill, since a rate change between our last verification and today wouldn't yet be reflected here.`,
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
    name: `${tariff.cgdName} Gas Bill Calculator`,
    url: `${SITE}${path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    areaServed: tariff.citiesServed,
  }
  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${tariff.cgdName} domestic PNG tariff`,
    description: `Piped natural gas (PNG) domestic tariff for ${tariff.cgdName}, effective ${tariff.effectiveFrom} — also underlies the per-CGD comparison and consumption reference tables on this page.`,
    url: `${SITE}${path}#tariff-table`,
    dateModified: tariff.lastVerified,
    creator: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
    license: tariff.sourceUrl,
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'text/html', contentUrl: tariff.sourceUrl },
    ],
  }
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: hi
      ? `अपना ${tariff.cgdCode} PNG गैस बिल कैसे निकालें`
      : `How to calculate your ${tariff.cgdCode} PNG gas bill`,
    step: hi
      ? [
          { '@type': 'HowToStep', position: 1, text: `अपने CGD/प्रोवाइडर के रूप में ${tariff.cgdCode} चुनें।` },
          { '@type': 'HowToStep', position: 2, text: 'अपने मीटर या पिछले बिल से अपनी SCM खपत डालें।' },
          { '@type': 'HowToStep', position: 3, text: 'अगर लागू हो तो अपना कनेक्शन प्रकार चुनें।' },
          { '@type': 'HowToStep', position: 4, text: 'अपना आइटमाइज़्ड बिल पाएं — गैस चार्ज, फिक्स्ड चार्ज और कुल।' },
        ]
      : [
          { '@type': 'HowToStep', position: 1, text: `Select ${tariff.cgdCode} as your CGD/provider.` },
          { '@type': 'HowToStep', position: 2, text: 'Enter your SCM consumption from your meter or last bill.' },
          { '@type': 'HowToStep', position: 3, text: 'Choose your connection type, if applicable.' },
          { '@type': 'HowToStep', position: 4, text: 'Get your itemised bill — gas charge, fixed charge and total.' },
        ],
  }
  const breadcrumb = breadcrumbLd([
    { name: hi ? 'होम' : 'Home', path: '' },
    { name: hi ? 'गैस' : 'Gas', path: '/gas' },
    { name: tariff.cgdName, path },
  ])

  return (
    <>
      <SplitHero
        hub="gas"
        breadcrumb={[
          { label: hi ? 'गैस' : 'Gas', href: hi ? '/hi/gas' : '/gas' },
          { label: tariff.cgdCode, href: path },
        ]}
        badgeLabel={
          hi
            ? `${tariff.citiesServed[0]} · ${tariff.cgdCode} · ${tariff.billingCycle === 'bimonthly' ? 'द्विमासिक' : 'मासिक'} बिलिंग`
            : `${tariff.citiesServed[0]} · ${tariff.cgdCode} · ${tariff.billingCycle} billing`
        }
        h1={hi ? `${tariff.cgdName} (${tariff.cgdCode}) PNG गैस बिल कैलकुलेटर` : `${tariff.cgdName} (${tariff.cgdCode}) PNG Gas Bill Calculator`}
        subtitle={
          hi
            ? `${tariff.cgdCode} के असली घरेलू टैरिफ का इस्तेमाल करके अपना मासिक पाइप्ड नेचुरल गैस (PNG) बिल निकालें — कोई खुद डाली दर नहीं। ${tariff.citiesServed.slice(0, 3).join(', ')}${tariff.citiesServed.length > 3 ? ' और अधिक' : ''} को कवर करता है, ${tariff.billingCycle === 'bimonthly' ? 'द्विमासिक' : 'मासिक'} बिल होता है।`
            : `Estimate your monthly ${tariff.cgdCode} piped natural gas (PNG) bill using their real domestic tariff — not a self-entered rate. Covers ${tariff.citiesServed.slice(0, 3).join(', ')}${tariff.citiesServed.length > 3 ? ' and more' : ''}, billed ${tariff.billingCycle}.`
        }
        primaryCta={{ label: hi ? `मेरा ${tariff.cgdCode} बिल निकालें` : `Calculate My ${tariff.cgdCode} Bill`, href: '#calculator', emoji: '🔥' }}
        secondaryCta={{ label: hi ? 'सभी गैस प्रोवाइडर →' : 'All gas providers →', href: hi ? '/hi/gas' : '/gas' }}
        statChips={
          hi
            ? [
                { icon: '🔥', big: `${formatINR(topRate)}`, small: 'प्रति SCM दर', tone: 'hub' },
                { icon: '📅', big: tariff.billingCycle === 'bimonthly' ? 'द्विमासिक' : 'मासिक', small: 'बिलिंग', tone: 'hub' },
                { icon: '➕', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
                { icon: '✓', big: formatIsoDate(tariff.lastVerified), small: 'सत्यापित', tone: 'seal-red' },
              ]
            : [
                { icon: '🔥', big: `${formatINR(topRate)}`, small: 'Rate per SCM', tone: 'hub' },
                { icon: '📅', big: tariff.billingCycle === 'bimonthly' ? 'Bi-monthly' : 'Monthly', small: 'Billing', tone: 'hub' },
                { icon: '➕', big: 'Free', small: 'No login', tone: 'hub' },
                { icon: '✓', big: formatIsoDate(tariff.lastVerified), small: 'Verified', tone: 'seal-red' },
              ]
        }
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
              <span aria-hidden>🔥</span> {hi ? 'उदाहरण गणना' : 'Worked example'}
            </p>
            <p className="mt-2 text-sm text-white/70">
              {hi ? `${tariff.cgdCode} के टैरिफ पर 20 SCM का खर्च लगभग` : `20 SCM on ${tariff.cgdCode}'s tariff costs about`}
            </p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums text-white">
              {formatINR(heroExample.total)}
              <span className="ml-1 text-sm font-normal text-white/50">
                {hi
                  ? `/${tariff.billingCycle === 'bimonthly' ? 'साइकल' : 'महीना'}`
                  : `/${tariff.billingCycle === 'bimonthly' ? 'cycle' : 'month'}`}
              </span>
            </p>
            {heroExample.monthlyEquivalent && (
              <p className="mt-2 text-xs text-white/50">
                {hi
                  ? `≈ ${formatINR(heroExample.monthlyEquivalent.total)}/महीना समतुल्य`
                  : `≈ ${formatINR(heroExample.monthlyEquivalent.total)}/month equivalent`}
              </p>
            )}
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
          <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
            {hi ? `अपना ${tariff.cgdCode} बिल निकालें` : `Calculate your ${tariff.cgdCode} bill`}
          </h2>
          <GasCgdBillCalculator cgdCode={tariff.cgdCode} cgdName={tariff.cgdName} texts={hi ? gasCgdBillTextsHi : undefined} />
        </section>

        <section aria-labelledby="how-to" className="mb-10 scroll-mt-20">
          <h2 id="how-to" className="font-display mb-4 text-2xl font-semibold">
            {hi ? `अपना ${tariff.cgdCode} PNG गैस बिल कैसे निकालें` : `How to calculate your ${tariff.cgdCode} PNG gas bill`}
          </h2>
          <ol className="space-y-3">
            {(hi
              ? [
                  `अपना CGD/प्रोवाइडर के रूप में ${tariff.cgdCode} चुनें।`,
                  'अपने मीटर या पिछले बिल से अपना SCM इस्तेमाल डालें।',
                  'अगर लागू हो तो अपना कनेक्शन प्रकार चुनें।',
                  'अपना आइटमाइज़्ड बिल पाएं — गैस चार्ज, फिक्स्ड चार्ज और कुल।',
                ]
              : [
                  `Select ${tariff.cgdCode} as your CGD/provider.`,
                  'Enter your SCM consumption from your meter or last bill.',
                  'Choose your connection type, if applicable.',
                  'Get your itemised bill — gas charge, fixed charge and total.',
                ]
            ).map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-gas font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-ash/80">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="reference" className="mb-10 scroll-mt-20">
          <h2 id="reference" className="font-display mb-2 text-2xl font-semibold">
            {hi ? 'PNG इस्तेमाल — त्वरित संदर्भ तालिका' : 'PNG consumption — quick reference table'}
          </h2>
          <GasConsumptionReferenceTable />
        </section>

        <section aria-labelledby="scm" className="mb-10 scroll-mt-20">
          <h2 id="scm" className="font-display mb-2 text-2xl font-semibold">
            {hi ? 'SCM इकाई को समझना' : 'Understanding SCM units'}
          </h2>
          <p className="text-ash/80">
            {hi ? (
              <>
                एक <strong>Standard Cubic Metre (SCM)</strong> पाइप्ड नेचुरल
                गैस के लिए बिलिंग इकाई है — एक सामान्य घरेलू बर्नर पर औसत
                परिवार के लिए लगभग एक दिन के सामान्य खाना पकाने (दो वक्त का
                खाना) के बराबर। यह एक उपयोगी मानसिक मापदंड है, सटीक रूपांतरण
                नहीं: असली इस्तेमाल घर के आकार, खाना पकाने के तरीके और
                बर्नर की दक्षता के हिसाब से बदलता है।
              </>
            ) : (
              <>
                A <strong>Standard Cubic Metre (SCM)</strong> is the billing unit
                for piped natural gas — roughly one day of standard cooking (two
                meals) for an average family on a typical domestic burner. It is
                a useful mental benchmark, not an exact conversion: actual usage
                varies with household size, cooking style and burner efficiency.
              </>
            )}
          </p>
        </section>

        <section aria-labelledby="billing-cycle" className="mb-10 scroll-mt-20">
          <h2 id="billing-cycle" className="font-display mb-2 text-2xl font-semibold">
            {hi ? `आपका ${tariff.cgdCode} बिल ${tariff.billingCycle === 'bimonthly' ? '~60 दिन' : '~30 दिन'} क्यों कवर करता है` : `Why your ${tariff.cgdCode} bill covers ${tocLabel}`}
          </h2>
          <p className="text-ash/80">
            {hi ? (
              <>
                {tariff.cgdCode}{' '}
                {tariff.billingCycle === 'bimonthly' ? 'हर दो महीने में' : 'हर महीने'} बिल
                करता है, इसलिए आपके बिल पर SCM आंकड़ा और कुल उस पूरी अवधि को
                दिखाते हैं — एक महीने को नहीं। द्विमासिक PNG कुल को सीधे एक
                LPG सिलेंडर की कीमत से न मिलाएं; उचित, जैसी-को-तैसी तुलना के
                लिए ऊपर कैलकुलेटर द्वारा दिखाया गया मासिक-समतुल्य आंकड़ा
                इस्तेमाल करें।
              </>
            ) : (
              <>
                {tariff.cgdCode} bills{' '}
                {tariff.billingCycle === 'bimonthly' ? 'every two months' : 'every month'}
                , so the SCM figure and total on your bill represent that whole
                period — not a single month. Don&apos;t compare a bi-monthly PNG
                total directly against one LPG cylinder&apos;s cost; use the
                monthly-equivalent figure the calculator shows above for a fair,
                like-for-like comparison.
              </>
            )}
          </p>
        </section>

        <section aria-labelledby="wrong" className="mb-10 scroll-mt-20">
          <h2 id="wrong" className="font-display mb-4 text-2xl font-semibold">
            {hi ? '2026 में ज़्यादातर गैस बिल कैलकुलेटर गलत क्यों हैं' : 'Why most gas bill calculators are wrong in 2026'}
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="font-display font-bold text-ink-navy">
                {hi ? 'वे एक फ्लैट, सामान्य दर इस्तेमाल करते हैं' : 'They use a flat, generic rate'}
              </p>
              <p className="mt-1 text-sm text-ash/70">
                {hi ? (
                  <>
                    ज़्यादातर गैस कैलकुलेटर आपसे अपनी प्रति-SCM दर टाइप करवाते
                    हैं, या चुपचाप एक राष्ट्रीय-औसत आंकड़ा लगा देते हैं। असली
                    PNG टैरिफ CGD के हिसाब से काफी अलग होते हैं
                    {rateSpreadPercent !== null && cheapestTariff && priciestTariff ? (
                      <>
                        {' '}
                        — आज की तारीख में, {cheapestTariff.cgdCode}{' '}
                        {formatINR(cheapestTariff.slabs[0].ratePerSCM)}/SCM चार्ज
                        करता है जबकि {priciestTariff.cgdCode}{' '}
                        {formatINR(priciestTariff.slabs[0].ratePerSCM)}/SCM — बिल्कुल
                        एक जैसे इस्तेमाल के लिए {rateSpreadPercent}% का अंतर,
                        हमारी अपनी टैरिफ फ़ाइलों से लाइव गिना गया, इस पेज के
                        लिए बनाया नहीं गया।
                      </>
                    ) : (
                      '।'
                    )}
                  </>
                ) : (
                  <>
                    Most gas calculators ask you to type in your own per-SCM rate,
                    or quietly apply one national-average figure. Real PNG tariffs
                    vary a lot by CGD
                    {rateSpreadPercent !== null && cheapestTariff && priciestTariff ? (
                      <>
                        {' '}
                        — as of today, {cheapestTariff.cgdCode} charges{' '}
                        {formatINR(cheapestTariff.slabs[0].ratePerSCM)}/SCM while{' '}
                        {priciestTariff.cgdCode} charges{' '}
                        {formatINR(priciestTariff.slabs[0].ratePerSCM)}/SCM — a{' '}
                        {rateSpreadPercent}% difference for the exact same
                        consumption, computed live from our own tariff files, not
                        invented for this page.
                      </>
                    ) : (
                      '.'
                    )}
                  </>
                )}
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="font-display font-bold text-ink-navy">
                {hi ? 'वे द्विमासिक बिलिंग के भ्रम को नज़रअंदाज़ करते हैं' : 'They ignore bi-monthly billing confusion'}
              </p>
              <p className="mt-1 text-sm text-ash/70">
                {hi
                  ? 'ज़्यादातर PNG कनेक्शन हर दो महीने में बिल होते हैं, लेकिन सामान्य कैलकुलेटर कुल को ऐसे दिखाते हैं जैसे यह एक मासिक आंकड़ा हो — इससे यूज़र सोचते हैं कि उनका गैस बिल बस दोगुना हो गया जबकि असल में यह दोगुनी अवधि को कवर कर रहा है। हम हमेशा असली साइकल कुल के साथ मासिक-समतुल्य आंकड़ा भी दिखाते हैं।'
                  : "Most PNG connections bill every two months, but generic calculators present the total as if it were a monthly figure — leaving users thinking their gas bill just doubled when actually it's covering twice the period. We always show the monthly-equivalent figure alongside the real cycle total."}
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="font-display font-bold text-ink-navy">
                {hi ? 'वे फिक्स्ड/मीटर चार्ज छोड़ देते हैं' : 'They skip the fixed/meter charge'}
              </p>
              <p className="mt-1 text-sm text-ash/70">
                {hi
                  ? 'कई त्वरित कैलकुलेटर सिर्फ SCM इस्तेमाल की कीमत लगाते हैं और हर CGD द्वारा लगाए जाने वाले अलग फिक्स्ड/मीटर चार्ज को चुपचाप छोड़ देते हैं — हर एक साइकल में असली बिल को ठीक उतनी ही राशि से कम करके दिखाते हैं। हमारा फॉर्मूला इसे शामिल करता है; नीचे ब्यौरा देखें।'
                  : "Many quick calculators price only the SCM consumption and quietly drop the separate fixed/meter charge every CGD applies — understating the real bill by exactly that amount every single cycle. Our formula includes it; see the breakdown below."}
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="formula" className="mb-10 scroll-mt-20">
          <h2 id="formula" className="font-display mb-4 text-2xl font-semibold">
            {hi ? 'सही PNG बिलिंग फॉर्मूला' : 'The correct PNG billing formula'}
          </h2>
          <GasFormulaBlock cgdCode={tariff.cgdCode} />
        </section>

        <section aria-labelledby="tariff-table" className="mb-10 scroll-mt-20">
          <h2 id="tariff-table" className="font-display mb-4 text-2xl font-semibold">
            {hi ? `${tariff.cgdCode} घरेलू PNG टैरिफ` : `${tariff.cgdCode} domestic PNG tariff`}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">{hi ? 'स्लैब (SCM)' : 'Slab (SCM)'}</th>
                  <th className="px-4 py-2 text-right font-semibold">{hi ? 'दर (₹/SCM)' : 'Rate (₹/SCM)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {tariff.slabs.map((s, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2">{s.minSCM}–{s.maxSCM ?? (hi ? 'ऊपर' : 'above')}</td>
                    <td className="px-4 py-2 text-right tabular-nums">₹{s.ratePerSCM.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-mist text-ash/70">
                <tr>
                  <td className="px-4 py-2">{hi ? 'फिक्स्ड चार्ज' : 'Fixed charge'}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatINR(tariff.fixedCharge)}{hi ? '/साइकल' : '/cycle'}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            {hi ? (
              <>
                {formatIsoDate(tariff.effectiveFrom)} से प्रभावी · सत्यापित{' '}
                {formatIsoDate(tariff.lastVerified)} ·{' '}
                <a
                  href={tariff.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass underline"
                >
                  स्रोत
                </a>
                . <strong>{tariff.verifiedBy}</strong>
              </>
            ) : (
              <>
                Effective from {formatIsoDate(tariff.effectiveFrom)} · Verified{' '}
                {formatIsoDate(tariff.lastVerified)} ·{' '}
                <a
                  href={tariff.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass underline"
                >
                  source
                </a>
                . <strong>{tariff.verifiedBy}</strong>
              </>
            )}
          </p>
        </section>

        <section aria-labelledby="worked-examples" className="mb-10 scroll-mt-20">
          <h2 id="worked-examples" className="font-display mb-4 text-2xl font-semibold">
            {hi ? 'दो उदाहरण गणनाएं' : 'Two worked examples'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
                {hi ? 'कम इस्तेमाल' : 'Lower usage'}
              </p>
              <p className="font-display mt-1 text-2xl font-bold tabular-nums text-hub-gas">
                {formatINR(lowExample.total)}
              </p>
              <p className="mt-1 text-sm text-ash/60">
                {hi
                  ? `20 SCM · ${formatINR(lowExample.gasChargeGross)} गैस चार्ज + ${formatINR(lowExample.fixedCharge)} फिक्स्ड`
                  : `20 SCM · ${formatINR(lowExample.gasChargeGross)} gas charge + ${formatINR(lowExample.fixedCharge)} fixed`}
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-paper p-5">
              <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
                {hi ? 'ज़्यादा इस्तेमाल' : 'Higher usage'}
              </p>
              <p className="font-display mt-1 text-2xl font-bold tabular-nums text-hub-gas">
                {formatINR(highExample.total)}
              </p>
              <p className="mt-1 text-sm text-ash/60">
                {hi
                  ? `80 SCM · ${formatINR(highExample.gasChargeGross)} गैस चार्ज + ${formatINR(highExample.fixedCharge)} फिक्स्ड`
                  : `80 SCM · ${formatINR(highExample.gasChargeGross)} gas charge + ${formatINR(highExample.fixedCharge)} fixed`}
              </p>
            </div>
          </div>
        </section>

        {hasMultiCgdComparison && (
          <section aria-labelledby="cgd-comparison" className="mb-10 scroll-mt-20">
            <h2 id="cgd-comparison" className="font-display mb-2 text-2xl font-semibold">
              {hi ? 'प्रति-CGD बिलिंग आपके गैस बिल को कैसे बदलती है' : 'How per-CGD billing changes your gas bill'}
            </h2>
            <p className="mb-4 text-sm text-ash/60">
              {hi ? (
                <>
                  बिल्कुल वही <strong>20 SCM</strong> — हर प्रोवाइडर के असली
                  टैरिफ पर, इसी कैलकुलेटर के इंजन से लाइव गिना गया। हम सिर्फ
                  उन CGD की तुलना करते हैं जिनका स्रोत-सत्यापित टैरिफ फ़ाइल
                  में मौजूद है, इसलिए और जोड़े जाने पर यह सूची बढ़ती जाएगी:
                </>
              ) : (
                <>
                  The exact same <strong>20 SCM</strong> — priced at each
                  provider&apos;s real tariff, computed live by this
                  calculator&apos;s own engine. We only compare CGDs with a
                  source-verified tariff on file, so this list grows as we add more:
                </>
              )}
            </p>
            <GasCgdComparisonTable scmConsumed={20} cgdCodes={REAL_TARIFF_CGD_CODES} />
          </section>
        )}

        <section aria-labelledby="neighbor" className="mb-10 scroll-mt-20">
          <h2 id="neighbor" className="font-display mb-4 text-2xl font-semibold">
            {hi ? 'आपका गैस बिल पड़ोसी से ज़्यादा क्यों हो सकता है' : "Why your gas bill might be higher than your neighbor's"}
          </h2>
          <GasNeighborDiagnostic />
        </section>

        <section aria-labelledby="png-vs-lpg" className="mb-10 scroll-mt-20">
          <h2 id="png-vs-lpg" className="font-display mb-2 text-2xl font-semibold">
            {hi ? 'PNG बनाम LPG सिलेंडर — आपके लिए कौन सस्ता है?' : 'PNG vs LPG cylinder — which costs less for you?'}
          </h2>
          <p className="mb-4 text-sm text-ash/60">
            {hi
              ? `एक असली संख्यात्मक तुलना, अंदाज़ा नहीं — ${tariff.cgdCode} के असली टैरिफ पर, आपकी स्थानीय LPG सिलेंडर कीमत के मुकाबले।`
              : `A real numeric comparison, not a guess — priced at ${tariff.cgdCode}'s actual tariff against your own local LPG cylinder price.`}
          </p>
          <PngVsLpgComparison cgdCode={tariff.cgdCode} />
          <p className="mt-2 text-xs text-ash/50">
            {hi ? (
              <>
                आपके PNG इस्तेमाल को बराबर LPG वज़न में बदलने के लिए एक आम
                तौर पर बताया जाने वाला ~1.33 SCM-प्रति-kg कैलोरिफिक
                समतुल्यता इस्तेमाल करता है — एक योजना अनुमान, सटीक
                थर्मोडायनामिक रूपांतरण नहीं। अपना असली LPG इस्तेमाल साइज़
                करना चाहते हैं? हमारा{' '}
                <Link href="/fuel-cost/lpg-cylinder-usage-calculator" className="underline hover:text-hub-gas">
                  LPG सिलेंडर इस्तेमाल कैलकुलेटर
                </Link>{' '}
                आज़माएं।
              </>
            ) : (
              <>
                Uses a commonly cited ~1.33 SCM-per-kg calorific equivalence to
                translate your PNG usage into an equivalent LPG weight — a
                planning approximation, not a precise thermodynamic conversion.
                Want to size your actual LPG usage instead? Try our{' '}
                <Link href="/fuel-cost/lpg-cylinder-usage-calculator" className="underline hover:text-hub-gas">
                  LPG cylinder usage calculator
                </Link>
                .
              </>
            )}
          </p>
        </section>

        <section
          aria-labelledby="png-safety"
          className="mb-10 scroll-mt-20 rounded-xl border border-caution-amber/25 bg-caution-amber/5 p-5"
        >
          <h2 id="png-safety" className="font-display mb-2 text-xl font-bold text-ink-navy">
            {hi ? 'PNG बनाम LPG सुरक्षा' : 'PNG vs LPG safety'}
          </h2>
          <p className="text-sm text-ash/80">
            {hi
              ? 'सही इंस्टॉलेशन और रखरखाव के साथ दोनों सुरक्षित हैं। पाइप्ड नेचुरल गैस हवा से हल्की होती है और लीक होने पर ऊपर फैल जाती है; LPG हवा से भारी होती है और फर्श के पास जमा हो सकती है — यह लीक व्यवहार में एक तथ्यात्मक अंतर है, यह दावा नहीं कि कोई एक व्यापक रूप से असुरक्षित है। दोनों मामलों में मानक अभ्यास अपनाएं: कनेक्शन की समय-समय पर जांच कराएं, रसोई में उचित वेंटिलेशन रखें, और गैस की गंध आने पर तुरंत अपने प्रोवाइडर से संपर्क करें।'
              : 'Both are safe when installed and maintained correctly. Piped natural gas is lighter than air and disperses upward in a leak; LPG is heavier than air and can pool near the floor — a factual difference in leak behavior, not a claim that either is broadly unsafe. Follow standard practice regardless: get connections checked periodically, ensure adequate kitchen ventilation, and contact your provider immediately if you smell gas.'}
          </p>
        </section>

        <section aria-labelledby="winter" className="mb-10 scroll-mt-20">
          <h2 id="winter" className="font-display mb-2 text-2xl font-semibold">
            {hi ? 'सर्दियों में आपका बिल क्यों बढ़ सकता है' : 'Why your bill might spike in winter'}
          </h2>
          <p className="text-ash/80">
            {hi
              ? 'ठंडे महीनों में चूल्हे पर पकाने का समय बढ़ जाता है और, जिन घरों में गैस गीज़र है, वहां गर्म पानी के लिए इसका इस्तेमाल भी बढ़ जाता है — दोनों SCM इस्तेमाल बढ़ाते हैं। गर्मियों के आधार से 10-15% मौसमी बढ़ोतरी अपने आप में आम है और ज़रूरी नहीं कि लीक या मीटर की समस्या का मतलब हो।'
              : "Colder months bring more stovetop cooking time and, in homes with one, more use of a gas geyser for hot water — both add SCM consumption. A 10-15% seasonal increase over your summer baseline is common on its own and doesn't necessarily mean a leak or meter issue."}
          </p>
        </section>

        <section aria-labelledby="pngrb" className="mb-10 scroll-mt-20">
          <h2 id="pngrb" className="font-display mb-2 text-2xl font-semibold">
            {hi ? 'PNGRB टैरिफ परिदृश्य: गणित कैसे बदलता है' : 'The PNGRB tariff landscape: how the math changes'}
          </h2>
          <p className="text-ash/80">
            {hi ? (
              <>
                <strong>Petroleum and Natural Gas Regulatory Board (PNGRB)</strong>{' '}
                भारत के सिटी गैस डिस्ट्रीब्यूशन ढांचे की निगरानी करता है,
                लेकिन बिजली के उलट, अलग-अलग CGD टैरिफ किसी एक राज्य नियामक
                द्वारा तय नहीं होते — हर CGD अपनी घरेलू PNG कीमत समय-समय पर
                बदलता है, ज़्यादातर इनपुट गैस लागत के हिसाब से, इसलिए दरें
                साल में कई बार ऊपर-नीचे हो सकती हैं और प्रोवाइडरों में एक
                साथ नहीं बदलतीं। यही वजह है कि हम हर कैलकुलेटर को किसी एक
                मान्य राष्ट्रीय दर की बजाय एक खास, तारीख वाले CGD टैरिफ के
                हिसाब से कीमत तय करते हैं — ऊपर टैरिफ तालिका में प्रभावी-से
                और अंतिम-सत्यापित तारीखें देखें, और हमेशा अपने मौजूदा बिल
                से मिलाकर जांचें।
              </>
            ) : (
              <>
                The <strong>Petroleum and Natural Gas Regulatory Board (PNGRB)</strong>{' '}
                oversees India&apos;s city gas distribution framework, but unlike
                electricity, individual CGD tariffs aren&apos;t set by a single
                state regulator — each CGD revises its own domestic PNG price
                periodically, largely tracking input gas costs, so rates can move
                up or down several times a year and don&apos;t move in lockstep
                across providers. That&apos;s exactly why we price every
                calculator against a specific, dated CGD tariff rather than one
                assumed national rate — see the effective-from and last-verified
                dates on the tariff table above, and always check them against
                your own current bill.
              </>
            )}
          </p>
        </section>

        <section aria-labelledby="meter-reading" className="mb-10 scroll-mt-20">
          <h2 id="meter-reading" className="font-display mb-2 text-2xl font-semibold">
            {hi ? 'अपनी मीटर रीडिंग कैसे जमा करें' : 'How to submit your meter reading'}
          </h2>
          <p className="text-ash/80">
            {hi ? (
              <>
                अगर {tariff.cgdCode} का मीटर रीडर आपकी प्रॉपर्टी तक नहीं
                पहुंच पाता, तो ज़्यादातर CGD आपको सेल्फ-रीडिंग जमा करने देते
                हैं: मीटर की काली डिजिट डिस्प्ले की साफ फोटो खींचें, फिर इसे
                अपने प्रोवाइडर के कस्टमर ऐप या वेबसाइट के ज़रिए अपलोड करें —
                &ldquo;submit meter reading&rdquo; या &ldquo;self
                reading&rdquo; विकल्प देखें। पिछले साइकल की रीडिंग भी संभाल
                कर रखें, इस्तेमाल की पुष्टि के लिए ज़रूरत पड़ सकती है।
              </>
            ) : (
              <>
                If {tariff.cgdCode}&apos;s meter reader can&apos;t access your
                property, most CGDs let you submit a self-reading: photograph the
                meter&apos;s black digit display clearly, then upload it through
                your provider&apos;s customer app or website — look for a
                &ldquo;submit meter reading&rdquo; or &ldquo;self reading&rdquo;
                option. Keep the previous cycle&apos;s reading handy too, in case
                it&apos;s needed to confirm consumption.
              </>
            )}
          </p>
        </section>

        <section aria-labelledby="ecosystem" className="mb-10 scroll-mt-20">
          <h2 id="ecosystem" className="font-display mb-4 text-2xl font-semibold">
            {hi ? 'आपका गैस ऊर्जा इकोसिस्टम' : 'Your gas energy ecosystem'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/fuel-cost/lpg-cylinder-usage-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🔥</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {hi ? 'LPG सिलेंडर इस्तेमाल' : 'LPG cylinder usage'}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {hi ? 'अपना LPG सिलेंडर इस्तेमाल और रोज़ की लागत साइज़ करें।' : 'Size your own LPG cylinder usage and cost per day.'}
              </p>
            </Link>
            <Link
              href={hi ? '/hi/electricity' : '/electricity'}
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>⚡</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {hi ? 'बिजली बिल कैलकुलेटर' : 'Electricity bill calculators'}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {hi ? 'सभी 36 राज्यों के लिए असली DISCOM टैरिफ।' : 'Real DISCOM tariffs for all 36 states.'}
              </p>
            </Link>
            <Link
              href={hi ? '/hi/ac' : '/ac'}
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-ac/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>❄️</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {hi ? 'AC रनिंग कॉस्ट' : 'AC running cost'}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {hi ? 'आपका AC उसी बिजली बिल में कितना जोड़ता है।' : 'What your AC adds to the same electricity bill.'}
              </p>
            </Link>
            <Link
              href="/appliances"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🔌</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {hi ? 'उपकरण कैलकुलेटर' : 'Appliance calculators'}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {hi ? 'पंखा, फ्रिज, इन्वर्टर साइज़िंग और अधिक।' : 'Fan, fridge, inverter sizing and more.'}
              </p>
            </Link>
            <Link
              href="/financial"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-financial/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>🧮</span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                {hi ? 'फाइनेंशियल कैलकुलेटर' : 'Financial calculators'}
              </p>
              <p className="mt-1 text-xs text-ash/60">
                {hi ? 'GST, SIP, ग्रेच्युटी और टैक्स-रेजीम गणित।' : 'GST, SIP, gratuity and tax-regime maths.'}
              </p>
            </Link>
            {otherCgds.map((c) => (
              <Link
                key={c.slug}
                href={hi ? `/hi/gas/${c.slug}` : `/gas/${c.slug}`}
                className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
              >
                <span className="text-xl" aria-hidden>🏢</span>
                <p className="font-display mt-2 font-bold text-ink-navy">
                  {c.name}
                </p>
                <p className="mt-1 text-xs text-ash/60">
                  {hi ? `${c.name} के लिए PNG बिल कैलकुलेटर।` : `PNG bill calculator for ${c.name}.`}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="guides" className="mb-10 scroll-mt-20">
          <h2 id="guides" className="font-display mb-4 text-2xl font-semibold">
            {hi ? 'जुड़ी गाइड: अपना गैस बिल समझें' : 'Related guides: understand your gas bill'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href="#scm"
              className="rounded-xl border border-hairline bg-paper p-4 text-sm font-semibold text-ink-navy transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              {hi ? 'PNG बिलिंग इकाई (SCM) कैसे काम करती है →' : 'How PNG billing units (SCM) work →'}
            </a>
            <a
              href="#meter-reading"
              className="rounded-xl border border-hairline bg-paper p-4 text-sm font-semibold text-ink-navy transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              {hi ? 'अपना गैस मीटर कैसे पढ़ें/जमा करें →' : 'How to read/submit your gas meter →'}
            </a>
            <a
              href="#png-safety"
              className="rounded-xl border border-hairline bg-paper p-4 text-sm font-semibold text-ink-navy transition hover:border-hub-gas/50 hover:shadow-sm"
            >
              {hi ? 'PNG सुरक्षा की बुनियादी बातें →' : 'PNG safety basics →'}
            </a>
          </div>
          <p className="mt-2 text-xs text-ash/50">
            {hi
              ? 'कनेक्शन प्रक्रिया और इंस्टॉलेशन पर अलग गहराई वाली गाइड हमारे रोडमैप पर हैं — फिलहाल, इनमें से हर एक इस पेज के संबंधित हिस्से पर ले जाता है।'
              : 'Standalone deep-dive guides on connection process and installation are on our roadmap — for now, each of these jumps to the relevant section on this page.'}
          </p>
        </section>

        <section aria-labelledby="faq" className="mb-10 scroll-mt-20">
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

        <footer className="rounded-xl border border-hairline bg-paper p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-seal-red/30 bg-seal-red/5 px-2.5 py-1 text-xs font-semibold text-seal-red">
              <span aria-hidden>⦿</span> {hi ? `सत्यापित ${formatIsoDate(tariff.lastVerified)}` : `Verified ${formatIsoDate(tariff.lastVerified)}`}
            </span>
            <span className="text-xs text-ash/50">
              {hi ? `${formatIsoDate(tariff.effectiveFrom)} से प्रभावी` : `Effective from ${formatIsoDate(tariff.effectiveFrom)}`}
            </span>
          </div>
          <p className="mt-3 text-sm text-ash/70">
            {hi ? 'स्रोत: ' : 'Source: '}
            <a
              href={tariff.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              {hi ? `${tariff.cgdName} टैरिफ नोटिफिकेशन` : `${tariff.cgdName} tariff notification`}
            </a>
          </p>
          <p className="mt-1 text-xs text-ash/50">{tariff.verifiedBy}</p>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </main>
    </>
  )
}
