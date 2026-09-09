import Link from 'next/link'
import GasBillCalculator, { type GasBillCalculatorTexts } from '@/components/calculators/GasBillCalculator'
import PngVsLpgSelfRateComparison from '@/components/calculators/PngVsLpgSelfRateComparison'
import { FlameIcon } from '@/components/HubMotifIcon'
import SplitHero from '@/components/SplitHero'

const SITE = 'https://desimetrics.com'

const gasBillTextsHi: GasBillCalculatorTexts = {
  title: 'गैस बिल कैलकुलेटर',
  subtitle: 'आपके अपने PNG इस्तेमाल और प्रोवाइडर की दर से',
  consumptionLabel: 'मासिक इस्तेमाल',
  consumptionUnit: 'SCM',
  consumptionHint: 'SCM = स्टैंडर्ड क्यूबिक मीटर, सामान्य PNG बिलिंग इकाई। अपना मीटर या पिछला बिल जांचें।',
  rateLabel: 'आपके प्रोवाइडर की दर',
  rateUnit: '₹/SCM',
  rateHint: 'अपने पिछले बिल या गैस कंपनी के प्रकाशित टैरिफ से — यह प्रोवाइडर और शहर के हिसाब से अलग होता है।',
  fixedLabel: 'फिक्स्ड / मीटर चार्ज',
  fixedUnit: '₹/महीना',
  ctaLabel: 'गैस बिल निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  estimatedBillLabel: 'अनुमानित बिल',
  volumetricLabel: 'वॉल्यूमेट्रिक चार्ज',
  fixedChargeLabel: 'फिक्स्ड चार्ज',
}

export default function GasCompanyPage({
  companyName,
  slug,
  locale = 'en',
}: {
  companyName: string
  slug: string
  locale?: 'en' | 'hi'
}) {
  const hi = locale === 'hi'
  const base = hi ? `/hi/gas/${slug}` : `/gas/${slug}`
  // Avoid "Adani Gas Gas Bill Calculator" for names that already contain "Gas".
  const heroTitle = hi
    ? (/\bgas\b/i.test(companyName) ? `${companyName} बिल कैलकुलेटर` : `${companyName} गैस बिल कैलकुलेटर`)
    : (/\bgas\b/i.test(companyName) ? `${companyName} Bill Calculator` : `${companyName} Gas Bill Calculator`)
  const faqs = hi
    ? [
        {
          q: `क्या DesiMetrics को ${companyName} की सटीक मौजूदा PNG दर पता है?`,
          a: `नहीं — सिटी गैस डिस्ट्रीब्यूशन टैरिफ समय-समय पर बदलते हैं और ऐसे रूप में केंद्रीय रूप से प्रकाशित नहीं होते जिसे हम सत्यापित करके अपडेट रख सकें। सटीक नतीजे के लिए अपने पिछले ${companyName} बिल से अपनी दर डालें।`,
        },
        {
          q: `मुझे अपनी ${companyName} PNG दर कहां मिलेगी?`,
          a: `अपना पिछला गैस बिल जांचें — इसमें SCM (स्टैंडर्ड क्यूबिक मीटर) में इस्तेमाल और लगाई गई दर दिखती है, या मौजूदा प्रकाशित टैरिफ के लिए ${companyName} की आधिकारिक वेबसाइट या ग्राहक पोर्टल जांचें।`,
        },
        {
          q: 'SCM क्या है, और यह कितने खाना पकाने के बराबर है?',
          a: 'स्टैंडर्ड क्यूबिक मीटर — भारत में पाइप्ड नेचुरल गैस (PNG) के लिए मानक बिलिंग इकाई, जो सभी सिटी गैस डिस्ट्रीब्यूशन कंपनियां इस्तेमाल करती हैं। एक अनुमानित मापदंड के तौर पर, 1 SCM एक सामान्य घरेलू बर्नर पर औसत परिवार के लिए लगभग एक दिन के सामान्य खाना पकाने (दो वक्त का खाना) के बराबर है — एक उपयोगी मानसिक संदर्भ, सटीक रूपांतरण नहीं।',
        },
        {
          q: `मेरा ${companyName} बिल एक महीने से ज़्यादा का क्यों हो सकता है?`,
          a: 'कई CGD मासिक की बजाय द्विमासिक बिल करते हैं — अपने बिल में इसकी बिलिंग अवधि जांचें। अगर आपका द्विमासिक है, तो कुल को सीधे एक महीने की LPG लागत से न मिलाएं; उचित मासिक-बराबर तुलना के लिए दो से भाग दें।',
        },
        {
          q: 'क्या PNG, LPG सिलेंडर से सस्ता है?',
          a: 'यह आपकी अपनी दर और स्थानीय LPG कीमत पर निर्भर करता है — यह मान लेने की बजाय कि कोई एक हमेशा सस्ता है, नीचे PNG बनाम LPG तुलना अपने असली आंकड़ों से इस्तेमाल करें।',
        },
        {
          q: 'सर्दियों में मेरा गैस बिल क्यों बढ़ जाता है?',
          a: 'ठंडे महीनों में चूल्हे पर पकाने का समय बढ़ जाता है और, जिन घरों में गैस गीज़र है, वहां गर्म पानी के लिए इसका इस्तेमाल भी बढ़ जाता है — दोनों SCM इस्तेमाल बढ़ाते हैं। गर्मियों के आधार से 10-15% मौसमी बढ़ोतरी आम है और ज़रूरी नहीं कि लीक या मीटर की खराबी का संकेत हो।',
        },
        {
          q: `अगर मीटर रीडर मेरे मीटर तक न पहुंच पाए तो मैं अपनी ${companyName} मीटर रीडिंग कैसे जमा करूं?`,
          a: `ज़्यादातर CGD आपको मीटर की काली डिजिट डिस्प्ले की फोटो खींचकर अपने कस्टमर ऐप या वेबसाइट के सेल्फ-रीडिंग विकल्प से जमा करने देते हैं जब मीटर रीडर आपकी प्रॉपर्टी तक नहीं पहुंच पाता — "submit reading" या "self meter reading" फीचर के लिए ${companyName} का ऐप जांचें।`,
        },
        {
          q: 'क्या PNG, LPG सिलेंडर से ज़्यादा सुरक्षित है?',
          a: 'सही इंस्टॉलेशन और रखरखाव के साथ दोनों सुरक्षित हैं। पाइप्ड नेचुरल गैस हवा से हल्की होती है और लीक होने पर ऊपर फैल जाती है, जबकि LPG हवा से भारी होती है और फर्श के पास जमा हो सकती है — यह लीक व्यवहार में एक तथ्यात्मक अंतर है, यह दावा नहीं कि कोई एक व्यापक रूप से असुरक्षित है। दोनों के लिए मानक सुरक्षा अभ्यास अपनाएं: नियमित लीक जांच, उचित वेंटिलेशन, और गैस की गंध आने पर तुरंत पेशेवर मदद लें।',
        },
        {
          q: 'मेरे PNG बिल पर फिक्स्ड चार्ज किसलिए है?',
          a: 'यह आपके घर तक पाइपलाइन कनेक्शन, मीटर और बिलिंग इंफ्रास्ट्रक्चर बनाए रखने की CGD की लागत को कवर करता है — उस साइकल में आप असल में कितनी गैस इस्तेमाल करते हैं इससे बेपरवाह लगाया जाता है, बिजली कनेक्शन के फिक्स्ड/डिमांड चार्ज जैसा।',
        },
      ]
    : [
        {
          q: `Does DesiMetrics know ${companyName}'s exact current PNG rate?`,
          a: `No — city gas distribution tariffs change periodically and aren't centrally published in a form we can verify and keep current. Enter your own rate from your last ${companyName} bill for an accurate result.`,
        },
        {
          q: `Where do I find my ${companyName} PNG rate?`,
          a: `Check your last gas bill — it shows consumption in SCM (standard cubic metres) and the rate applied, or check ${companyName}'s official website or customer portal for the current published tariff.`,
        },
        {
          q: 'What is SCM, and how much cooking does it represent?',
          a: 'Standard cubic metre — the standard billing unit for piped natural gas (PNG) in India, used by all city gas distribution companies. As a rough benchmark, 1 SCM is roughly one day of standard cooking (two meals) for an average family on a typical domestic burner — a useful mental reference, not an exact conversion.',
        },
        {
          q: `Why might my ${companyName} bill cover more than one month?`,
          a: 'Many CGDs bill bi-monthly rather than monthly — check your own bill for the billing period it covers. If yours is bi-monthly, don\'t compare the total directly against a single month\'s LPG cost; divide by two for a fair monthly-equivalent comparison.',
        },
        {
          q: 'Is PNG cheaper than LPG cylinders?',
          a: 'It depends on your own rate and local LPG price — use the PNG vs LPG comparison below with your real numbers rather than assuming either is always cheaper.',
        },
        {
          q: 'Why does my gas bill increase in winter?',
          a: 'Colder months bring more stovetop cooking time and, in homes that have one, more use of a gas geyser for hot water — both add SCM consumption. A 10-15% seasonal bump over your summer baseline is common and not necessarily a sign of a leak or meter fault.',
        },
        {
          q: `How do I submit my ${companyName} meter reading if the reader can't access my meter?`,
          a: `Most CGDs let you photograph the meter's black digit display and submit it via their customer app or website self-reading option when the meter reader can't access your property — check ${companyName}'s app for a "submit reading" or "self meter reading" feature.`,
        },
        {
          q: 'Is PNG safer than LPG cylinders?',
          a: 'Both are safe when installed and maintained correctly. Piped natural gas is lighter than air and disperses upward in a leak, while LPG is heavier than air and can pool near the floor — a factual difference in leak behavior, not a claim that one is broadly unsafe. Follow standard safety practice either way: regular leak checks, proper ventilation, and prompt professional attention to any gas smell.',
        },
        {
          q: 'What is the fixed charge on my PNG bill for?',
          a: 'It covers the CGD\'s cost of maintaining the pipeline connection, meter and billing infrastructure to your home — charged regardless of how much gas you actually use that cycle, similar to an electricity connection\'s fixed/demand charge.',
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
    name: heroTitle,
    url: `${SITE}${base}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    areaServed: 'India',
  }

  return (
    <>
      <SplitHero
        hub="gas"
        breadcrumb={[
          { label: hi ? 'गैस' : 'Gas', href: hi ? '/hi/gas' : '/gas' },
          { label: companyName, href: base },
        ]}
        badgeLabel={hi ? 'आपकी असली दर · ईमानदार इनपुट' : 'Your real rate · Honest input'}
        h1={heroTitle}
        subtitle={
          hi
            ? `अपने मीटर्ड इस्तेमाल और अपनी दर से अपना ${companyName} PNG बिल निकालें — हम ऐसे प्रोवाइडर टैरिफ का अंदाज़ा नहीं लगाते जिन्हें हम सत्यापित नहीं कर सकते, इसलिए आप अपने बिल से अपनी असली दर डालते हैं।`
            : `Estimate your ${companyName} PNG bill from your metered consumption and your own rate — we don't guess provider tariffs we can't verify, so you enter your real rate from your bill.`
        }
        primaryCta={{ label: hi ? 'मेरा गैस बिल निकालें' : 'Calculate My Gas Bill', href: '#calculator', emoji: '🔥' }}
        secondaryCta={{ label: hi ? 'सभी प्रोवाइडर →' : 'All providers →', href: hi ? '/hi/gas' : '/gas' }}
        statChips={
          hi
            ? [
                { icon: '🔥', big: 'SCM', small: 'इस्तेमाल की इकाई', tone: 'hub' },
                { icon: '✍️', big: 'आपकी दर', small: 'ईमानदार इनपुट', tone: 'hub' },
                { icon: '➕', big: 'फिक्स्ड चार्ज', small: 'पूरा बिल', tone: 'hub' },
                { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
              ]
            : [
                { icon: '🔥', big: 'SCM', small: 'Consumption unit', tone: 'hub' },
                { icon: '✍️', big: 'Your rate', small: 'Honest input', tone: 'hub' },
                { icon: '➕', big: 'Fixed charge', small: 'Full bill', tone: 'hub' },
                { icon: '🔓', big: 'Free', small: 'No login', tone: 'hub' },
              ]
        }
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-hub-gas">
              <FlameIcon className="h-6 w-6" />
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                {hi ? 'हम आपकी दर क्यों मांगते हैं' : 'Why we ask for your rate'}
              </p>
            </div>
            <p className="mt-3 text-sm text-white/80">
              {hi
                ? `${companyName} का PNG टैरिफ समय-समय पर बदलता है और ऐसे रूप में केंद्रीय रूप से प्रकाशित नहीं होता जिसे हम सत्यापित करके अपडेट रख सकें।`
                : `${companyName}'s PNG tariff changes periodically and isn't centrally published in a form we can verify and keep current.`}
            </p>
            <p className="mt-2 text-sm text-white/70">
              {hi
                ? 'किसी नंबर का अंदाज़ा लगाने की बजाय, हम आपके बिल से आपकी अपनी दर मांगते हैं — वही ईमानदार तरीका जो हम अपने फ्यूल और नेट-मीटरिंग कैलकुलेटर में इस्तेमाल करते हैं।'
                : 'Rather than guess a number, we ask for your own rate from your bill — the same honest approach we use across our fuel and net-metering calculators.'}
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          {hi ? `अपना ${companyName} बिल निकालें` : `Calculate your ${companyName} bill`}
        </h2>
        <GasBillCalculator texts={hi ? gasBillTextsHi : undefined} />
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
              नहीं: असली इस्तेमाल घर के आकार, खाना पकाने के तरीके और बर्नर
              की दक्षता के हिसाब से बदलता है।
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
          {hi ? 'आपका बिल एक महीने से ज़्यादा का क्यों हो सकता है' : 'Why your bill might cover more than one month'}
        </h2>
        <p className="text-ash/80">
          {hi ? (
            <>
              {companyName} के कुछ सर्विस क्षेत्रों सहित कई CGD मासिक की बजाय
              द्विमासिक बिल करते हैं — अपने बिल में इसकी सटीक अवधि जांचें।
              अगर आपका द्विमासिक है, तो SCM आंकड़ा और कुल उस पूरे ~60-दिन की
              अवधि को दिखाते हैं, एक महीने को नहीं। लंबी अवधि को ध्यान में
              रखे बिना इसे सीधे एक LPG सिलेंडर की कीमत से न मिलाएं।
            </>
          ) : (
            <>
              Many CGDs, including some of {companyName}&apos;s service areas,
              bill bi-monthly rather than monthly — check your own bill for the
              exact period it covers. If yours is bi-monthly, the SCM figure and
              total represent that whole ~60-day period, not a single month.
              Don&apos;t compare it directly against one LPG cylinder&apos;s
              cost without accounting for the longer period.
            </>
          )}
        </p>
      </section>

      <section aria-labelledby="png-vs-lpg" className="mb-10 scroll-mt-20">
        <h2 id="png-vs-lpg" className="font-display mb-2 text-2xl font-semibold">
          {hi ? 'PNG बनाम LPG सिलेंडर — आपके लिए कौन सस्ता है?' : 'PNG vs LPG cylinder — which costs less for you?'}
        </h2>
        <p className="mb-4 text-sm text-ash/60">
          {hi
            ? 'आपकी अपनी PNG दर और स्थानीय LPG सिलेंडर कीमत का इस्तेमाल करते हुए एक असली संख्यात्मक तुलना — कोई अंदाज़ा नहीं।'
            : 'A real numeric comparison using your own PNG rate and local LPG cylinder price — not a guess.'}
        </p>
        <PngVsLpgSelfRateComparison />
        <p className="mt-2 text-xs text-ash/50">
          {hi ? (
            <>
              आपके PNG इस्तेमाल को बराबर LPG वज़न में बदलने के लिए एक आम तौर
              पर बताया जाने वाला ~1.33 SCM-प्रति-kg कैलोरिफिक समतुल्यता
              इस्तेमाल करता है — एक योजना अनुमान, सटीक थर्मोडायनामिक
              रूपांतरण नहीं। अपना असली LPG इस्तेमाल साइज़ करना चाहते हैं?
              हमारा{' '}
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

      <section aria-labelledby="meter-reading" className="mb-10 scroll-mt-20">
        <h2 id="meter-reading" className="font-display mb-2 text-2xl font-semibold">
          {hi ? 'अपनी मीटर रीडिंग कैसे जमा करें' : 'How to submit your meter reading'}
        </h2>
        <p className="text-ash/80">
          {hi ? (
            <>
              अगर {companyName} का मीटर रीडर आपकी प्रॉपर्टी तक नहीं पहुंच
              पाता, तो ज़्यादातर CGD आपको सेल्फ-रीडिंग जमा करने देते हैं:
              मीटर की काली डिजिट डिस्प्ले की साफ फोटो खींचें, फिर इसे अपने
              प्रोवाइडर के कस्टमर ऐप या वेबसाइट के ज़रिए अपलोड करें —
              &ldquo;submit meter reading&rdquo; या &ldquo;self
              reading&rdquo; विकल्प देखें। पिछले साइकल की रीडिंग भी संभाल कर
              रखें, इस्तेमाल की पुष्टि के लिए ज़रूरत पड़ सकती है।
            </>
          ) : (
            <>
              If {companyName}&apos;s meter reader can&apos;t access your
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

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          {hi ? 'जुड़े हुए कैलकुलेटर' : 'Related calculators'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href={hi ? '/hi/gas' : '/gas'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🏷️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'सभी गैस प्रोवाइडर' : 'All gas providers'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'इस कैलकुलेटर में शामिल हर प्रोवाइडर देखें।' : 'See every provider this calculator covers.'}
            </p>
          </Link>
          <Link
            href={hi ? '/hi/gas/igl' : '/gas/igl'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-gas/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📊</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'एक असली-टैरिफ उदाहरण देखें' : 'See a real-tariff example'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'IGL (दिल्ली/NCR) एक असली, तारीख वाला टैरिफ इस्तेमाल करता है — दर डालने की ज़रूरत नहीं।' : 'IGL (Delhi/NCR) uses a real, dated tariff — no rate entry needed.'}
            </p>
          </Link>
          <Link
            href="/fuel-cost/lpg-cylinder-usage-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-fuel/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔥</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'LPG सिलेंडर इस्तेमाल' : 'LPG cylinder usage'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'PNG कनेक्शन नहीं है? इसके बजाय अपना LPG सिलेंडर अनुमान लगाएं।' : 'No PNG connection? Estimate your LPG cylinder instead.'}
            </p>
          </Link>
          <Link
            href={hi ? '/hi/water' : '/water'}
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-water/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💧</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              {hi ? 'पानी का बिल कैलकुलेटर' : 'Water bill calculator'}
            </p>
            <p className="mt-1 text-xs text-ash/60">
              {hi ? 'आपके पानी के बिल के लिए वही ईमानदार तरीका।' : 'Same honest approach for your water bill.'}
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
