import type { Metadata } from 'next'
import Link from 'next/link'
import PhantomLoadChecker, { type PhantomLoadCheckerTexts } from '@/components/calculators/PhantomLoadChecker'
import PageHero from '@/components/PageHero'
import discomsJson from '@/data/discoms.json'
import { marginalRatePerUnit } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances/phantom-load-checker'

const liveDiscoms = discomsJson.states.flatMap((s) =>
  s.discoms.filter((d) => d.hasTariffFile).map((d) => ({ code: d.code, state: s.state })),
)

const rate = marginalRatePerUnit('TNEB')
const exampleWatts = 8 + 12 + 3
const exampleAnnual = ((exampleWatts * 24) / 1000) * 365 * rate

export const metadata: Metadata = {
  title: 'फैंटम लोड / स्टैंडबाय पावर चेकर 2026 — भारत',
  description:
    'जानें आपके हमेशा-ऑन स्टैंडबाय डिवाइस (राउटर, सेट-टॉप बॉक्स, प्लग में लगे चार्जर) साल भर में आपको कितना खर्च करते हैं, आपके असली DISCOM टैरिफ पर आधारित।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances/phantom-load-checker'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Phantom Load / Standby Power Checker',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: '/appliances' },
  { name: 'फैंटम लोड चेकर', path: PATH },
])

const phantomLoadTextsHi: PhantomLoadCheckerTexts = {
  title: 'फैंटम लोड / स्टैंडबाय पावर चेकर',
  subtitle: "हमेशा-ऑन डिवाइस 'ऑफ' रहते हुए भी आपको कितना खर्च करते हैं",
  discomLabel: 'DISCOM / राज्य',
  legend: 'इनमें से कौन से आपके घर में 24/7 प्लग में लगे रहते हैं?',
  devices: [
    { id: 'router', name: 'वाई-फाई राउटर', watts: 8 },
    { id: 'settop', name: 'सेट-टॉप बॉक्स (DTH/केबल)', watts: 12 },
    { id: 'tv', name: 'स्टैंडबाय पर टीवी (प्लग से बंद नहीं)', watts: 3 },
    { id: 'pc', name: 'स्टैंडबाय पर डेस्कटॉप PC/मॉनिटर', watts: 5 },
    { id: 'microwave', name: 'माइक्रोवेव (घड़ी/डिस्प्ले)', watts: 3 },
    { id: 'charger', name: 'बिना डिवाइस के प्लग में लगा फोन/लैपटॉप चार्जर', watts: 1 },
    { id: 'inverter', name: 'स्टैंडबाय पर इन्वर्टर/UPS (चार्ज नहीं हो रहा)', watts: 10 },
    { id: 'washer', name: 'स्टैंडबाय पर वॉशिंग मशीन', watts: 2 },
  ],
  ctaLabel: 'स्टैंडबाय कॉस्ट निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  summaryTemplate: '{count} डिवाइस · {watts}W लगातार · {units} यूनिट/दिन',
  perMonthUnit: '/महीना',
  annualTemplate: '≈ {amount}/साल, सिर्फ उन डिवाइस से जो असल में कभी बंद नहीं होतीं।',
}

const faqs = [
  {
    q: '"फैंटम लोड" या "स्टैंडबाय पावर" क्या है?',
    a: 'यह वह बिजली है जो एक डिवाइस "बंद" होने पर भी खींचती है जब वह अभी भी प्लग में लगी और बिजली से जुड़ी हो — सेट-टॉप बॉक्स, राउटर, और बिना डिवाइस के लगे चार्जर आम उदाहरण हैं। अकेले छोटे, लेकिन ये साल के 365 दिन, 24/7 चलते हैं।',
  },
  {
    q: 'स्टैंडबाय पावर असल में मिलाकर कितनी हो जाती है?',
    a: `कुछ हमेशा-ऑन डिवाइस (राउटर + सेट-टॉप बॉक्स + स्टैंडबाय पर एक टीवी) हमारे उदाहरण वाटेज पर तमिलनाडु में लगभग ${formatINR(exampleAnnual)}/साल जोड़ सकते हैं — अपने असली आंकड़े के लिए ऊपर कैलकुलेटर में अपने डिवाइस और DISCOM जांचें।`,
  },
  {
    q: 'स्टैंडबाय पावर के सबसे बड़े अपराधी कौन से डिवाइस हैं?',
    a: 'सामान्य घरेलू डिवाइसों में सेट-टॉप बॉक्स और पुराने इन्वर्टर/UPS यूनिट स्टैंडबाय मोड में सबसे ज़्यादा खींचते हैं — राउटर अकेले कम होते हैं लेकिन लगभग हर घर में लगातार चलते हैं, इसलिए वे भी जुड़ते जाते हैं।',
  },
  {
    q: 'क्या मुझे इस्तेमाल में न होने पर सब कुछ अनप्लग कर देना चाहिए?',
    a: 'जिन डिवाइसों की आपको तुरंत ज़रूरत नहीं होती (बिना कुछ लगे चार्जर, कभी-कभार इस्तेमाल होने वाले उपकरण), हां — एक फिज़िकल स्विच वाली पावर स्ट्रिप इसे आसान बनाती है। एक राउटर जिस पर आप निर्भर हैं, या एक सेट-टॉप बॉक्स जिसे शेड्यूल्ड रिकॉर्डिंग के लिए जुड़े रहना ज़रूरी है, उसके लिए सुविधा का ट्रेडऑफ महीने के कुछ रुपयों के लायक न हो।',
  },
  {
    q: 'क्या ये स्टैंडबाय वाटेज आंकड़े मेरे खास डिवाइस के लिए सटीक हैं?',
    a: 'ये सामान्य डिवाइसों के लिए आम तौर पर बताए जाने वाले योजना अनुमान हैं, आपके खास यूनिट का माप नहीं — अगर आपको किसी खास डिवाइस के लिए सटीकता चाहिए, तो एक प्लग-इन पावर मीटर सटीक रीडिंग देता है।',
  },
  {
    q: 'क्या स्टैंडबाय पावर की कीमत सामान्य इस्तेमाल जैसी ही लगाई जाती है?',
    a: 'हां — किसी भी अन्य लोड की तरह, स्टैंडबाय खपत आपके कुल इस्तेमाल में जुड़ती है और आपकी मार्जिनल (टॉप-स्लैब) दर पर गिनी जाती है, क्योंकि यह आपके पहले से इस्तेमाल किए जा रहे बाकी सब कुछ के ऊपर है।',
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

export default function PhantomLoadPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[
          { label: 'उपकरण', href: '/hi/appliances' },
          { label: 'फैंटम लोड चेकर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliances hub
          </>
        }
        h1="फैंटम लोड / स्टैंडबाय पावर चेकर"
        subtitle={
          <>
            प्लग में लगे लेकिन &ldquo;बंद&rdquo; डिवाइस चौबीसों घंटे फिर भी
            बिजली खींचते हैं। जांचें कौन से आपके घर में लागू होते हैं और
            देखें साल भर में इनका खर्च कितना आता है।
          </>
        }
        stats={[
          { icon: '🔄', big: '24/7', small: 'हमेशा खींचता है', tone: 'hub' },
          { icon: '🔌', big: '1-15W', small: 'सामान्य डिवाइस रेंज', tone: 'hub' },
          { icon: '👻', big: '8', small: 'सामान्य डिवाइस जांचे गए', tone: 'hub' },
          { icon: '📊', big: 'असली टैरिफ', small: 'आपके DISCOM पर आधारित', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="calculator" className="mb-10 scroll-mt-20">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना स्टैंडबाय लोड जांचें
        </h2>
        <PhantomLoadChecker discoms={liveDiscoms} texts={phantomLoadTextsHi} />
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/appliances/household-bill-builder"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🏠</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              हाउसहोल्ड बिल बिल्डर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपना पूरा उपकरण-दर-उपकरण बिल देखें।
            </p>
          </Link>
          <Link
            href="/hi/electricity/appliance-cost-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔋</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              किसी भी उपकरण का खर्च
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इसकी वाटेज और रोज़ के घंटों से।
            </p>
          </Link>
          <Link
            href="/hi/electricity"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-electricity/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>⚡</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              बिजली बिल कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपने राज्य के लिए अपना पूरा मासिक बिल देखें।
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          अक्सर पूछे जाने वाले सवाल
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
