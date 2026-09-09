import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import SplitHero from '@/components/SplitHero'
import { calculateAcCost } from '@/lib/calc/ac'
import { formatINR } from '@/lib/format'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/ac'

const heroExample = calculateAcCost({
  discomCode: 'TNEB',
  tonnage: 1.5,
  starRating: 3,
  dailyHours: 8,
})

export const metadata: Metadata = {
  title: 'AC कैलकुलेटर — रनिंग कॉस्ट, टनेज और स्टार रेटिंग (भारत)',
  description:
    'भारत के लिए मुफ्त एयर-कंडीशनर टूल्स: अपने DISCOM टैरिफ पर आधारित रनिंग कॉस्ट कैलकुलेटर, कमरे के साइज़ के हिसाब से टनेज कैलकुलेटर, और 3-स्टार बनाम 5-स्टार बचत तुलना।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/ac'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const cards = [
  {
    href: '/hi/ac/bill-calculator',
    emoji: '💡',
    title: 'AC रनिंग कॉस्ट कैलकुलेटर',
    body: 'टनेज, स्टार रेटिंग, घंटों और DISCOM के हिसाब से महीने और साल का बिजली खर्च।',
    cta: 'खर्च निकालें →',
    cls: 'border-spark-teal/20 bg-spark-teal/5 hover:border-spark-teal/50',
    ctaCls: 'text-spark-teal',
  },
  {
    href: '/hi/ac/tonnage-calculator',
    emoji: '📐',
    title: 'AC टनेज कैलकुलेटर',
    body: 'धूप और मंजिल के हिसाब से आपके कमरे के लिए सही AC साइज़।',
    cta: 'AC साइज़ जानें →',
    cls: 'border-brass/20 bg-brass/5 hover:border-brass/50',
    ctaCls: 'text-brass',
  },
  {
    href: '/hi/ac/comparisons/3-star-vs-5-star-savings-guide',
    emoji: '⚖️',
    title: '3 स्टार बनाम 5 स्टार बचत',
    body: 'इस्तेमाल और टैरिफ के हिसाब से 5-स्टार AC से सालाना बचत की तुलना।',
    cta: 'अभी तुलना करें →',
    cls: 'border-spark-teal/20 bg-spark-teal/5 hover:border-spark-teal/50',
    ctaCls: 'text-spark-teal',
  },
  {
    href: '/hi/ac/comparison-tool',
    emoji: '🆚',
    title: 'AC तुलना टूल',
    body: 'किन्हीं भी दो AC की टनेज, स्टार रेटिंग — या दोनों — की आमने-सामने तुलना करें।',
    cta: 'AC तुलना करें →',
    cls: 'border-brass/20 bg-brass/5 hover:border-brass/50',
    ctaCls: 'text-brass',
  },
  {
    href: '/hi/ac/power-consumption-calculator',
    emoji: '🔢',
    title: 'पावर कंजम्पशन कैलकुलेटर',
    body: 'सिर्फ AC की नेमप्लेट रेटेड करंट से — टनेज ढूंढने की ज़रूरत नहीं।',
    cta: 'खपत निकालें →',
    cls: 'border-spark-teal/20 bg-spark-teal/5 hover:border-spark-teal/50',
    ctaCls: 'text-spark-teal',
  },
  {
    href: '/hi/ac/circuit-safety-calculator',
    emoji: '🛡️',
    title: 'सर्किट सेफ्टी कैलकुलेटर',
    body: 'AC सर्किट के लिए सामान्य MCB रेटिंग और वायर गेज मार्गदर्शन।',
    cta: 'मार्गदर्शन पाएं →',
    cls: 'border-caution-amber/20 bg-caution-amber/5 hover:border-caution-amber/50',
    ctaCls: 'text-caution-amber',
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'AC', path: PATH },
])
const itemList = itemListLd(cards.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'AC दूसरे उपकरणों से इतना महंगा क्यों पड़ता है?',
    a: 'दो वजहें हैं: कंप्रेसर चलते समय लगातार, अपेक्षाकृत ज़्यादा पावर खींचता है, और चूंकि यह आपके मौजूदा इस्तेमाल के ऊपर जुड़ता है, इसकी यूनिट्स आपके DISCOM के सबसे ऊंचे टैरिफ स्लैब में गिनी जाती हैं — किसी औसत दर पर नहीं।',
  },
  {
    q: 'रनिंग कॉस्ट कैलकुलेटर और टनेज कैलकुलेटर में क्या फर्क है?',
    a: 'रनिंग कॉस्ट कैलकुलेटर आपके पास पहले से मौजूद (या खरीदने पर विचार कर रहे) किसी खास AC — टनेज, स्टार रेटिंग और घंटों — की कीमत निकालता है। टनेज कैलकुलेटर अलग सवाल का जवाब देता है: खरीदने से पहले, आपके कमरे को असल में कितने साइज़ के AC की ज़रूरत है।',
  },
  {
    q: 'मुझे 3-स्टार या 5-स्टार AC खरीदना चाहिए?',
    a: 'यह आपके रोज़ के इस्तेमाल के घंटों और आपके DISCOM के टैरिफ पर निर्भर करता है — अपनी स्थिति के लिए सटीक सालाना अंतर और पेबैक अवधि देखने के लिए हमारी 3-स्टार बनाम 5-स्टार बचत गाइड इस्तेमाल करें।',
  },
  {
    q: 'क्या ये कैलकुलेटर मेरे असल बिजली टैरिफ का इस्तेमाल करते हैं?',
    a: 'हां — हर कैलकुलेटर में अपना DISCOM चुनें और यूनिट्स उस राज्य के असल, स्रोत-सत्यापित टैरिफ पर तय होंगी, किसी राष्ट्रीय औसत पर नहीं।',
  },
  {
    q: 'ISEER और SEER में क्या फर्क है?',
    a: 'ISEER, BEE का भारत-विशिष्ट दक्षता मानक है, जो भारतीय जलवायु और इस्तेमाल की परिस्थितियों के हिसाब से टेस्ट किया जाता है। SEER अमेरिकी मानक है, जो अलग तरीके से टेस्ट होता है — भारत में असल रनिंग कॉस्ट के लिए ISEER-आधारित अनुमान ही सही बैठता है।',
  },
  {
    q: 'क्या मैं देख सकता हूं कि मेरा AC सर्किट सुरक्षित तरीके से वायर किया गया है?',
    a: 'अपने AC के रेटेड करंट से सामान्य MCB और वायर गेज योजना मार्गदर्शन के लिए हमारा सर्किट सेफ्टी कैलकुलेटर इस्तेमाल करें — यह लाइसेंसशुदा इलेक्ट्रीशियन से बातचीत की शुरुआत है, उसकी जगह नहीं।',
  },
  {
    q: 'AC की रनिंग कॉस्ट को सोलर बचत से कैसे तुलना करूं?',
    a: 'AC आम तौर पर गर्मियों के बिल की सबसे बड़ी वजह होता है, और यह ज़्यादातर दिन में चलता है — ठीक उसी समय जब रूफटॉप सोलर बिजली बनाता है। अपने AC इस्तेमाल के हिसाब से पैनल का पेबैक जांचने के लिए हमारा सोलर ROI कैलकुलेटर देखें।',
  },
  {
    q: 'एक जैसा AC दो अलग राज्यों में चलाने पर अलग खर्च क्यों आता है?',
    a: 'क्योंकि DISCOM टैरिफ अलग होते हैं — अलग टॉप-स्लैब दरें, फ्यूल कॉस्ट एडजस्टमेंट और बिजली शुल्क। हमारे रनिंग कॉस्ट कैलकुलेटर पर मल्टी-स्टेट स्लैब तुलना में एक असल, गणना किया उदाहरण देखें।',
  },
  {
    q: 'मुझे अपने AC की टनेज या स्टार रेटिंग नहीं पता — क्या फिर भी अनुमान मिल सकता है?',
    a: 'हां — इसके बजाय पावर कंजम्पशन कैलकुलेटर इस्तेमाल करें, जो टनेज और स्टार रेटिंग की बजाय आपके AC की नेमप्लेट रेटेड करंट (Amps में) से काम करता है।',
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

export default function AcHubPageHi() {
  return (
    <>
      <SplitHero
        hub="ac"
        breadcrumb={[{ label: 'AC', href: '/hi/ac' }]}
        badgeLabel="6 कैलकुलेटर · ISEER + असली टैरिफ"
        h1="एयर कंडीशनर कैलकुलेटर"
        subtitle="जानें AC चलाने में कितना खर्च आता है, आपको कितने साइज़ की ज़रूरत है, और क्या 5-स्टार मॉडल फायदेमंद है — सब कुछ आपके राज्य के असली बिजली टैरिफ पर आधारित।"
        primaryCta={{ label: 'मेरा AC खर्च निकालें', href: '#tools', emoji: '❄️' }}
        secondaryCta={{ label: 'रनिंग कॉस्ट कैलकुलेटर →', href: '/hi/ac/bill-calculator' }}
        statChips={[
          { icon: '❄️', big: '6', small: 'कैलकुलेटर', tone: 'hub' },
          { icon: '⚙️', big: 'ISEER', small: 'दक्षता आधार', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
              <span aria-hidden>❄️</span> उदाहरण गणना
            </p>
            <p className="mt-2 text-sm text-white/70">
              तमिलनाडु में रोज़ 8 घंटे चलने वाला 1.5 टन, 3-स्टार AC
            </p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums text-white">
              {formatINR(heroExample.monthlyCost)}
              <span className="ml-1 text-sm font-normal text-white/50">/महीना</span>
            </p>
            <p className="mt-2 text-xs text-white/50">
              {formatINR(heroExample.annualCost)}/साल, {formatINR(heroExample.effectiveRatePerUnit)}/यूनिट पर — TNEB
              के असली टॉप स्लैब पर आधारित, किसी औसत दर पर नहीं।
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section id="tools" className="mb-10 grid scroll-mt-20 gap-6 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`flex flex-col rounded-2xl border p-6 transition hover:shadow-sm ${c.cls}`}
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className={`mt-3 text-sm font-semibold ${c.ctaCls}`}>
              {c.cta}
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="why" className="mb-10">
        <h2 id="why" className="font-display mb-4 text-2xl font-semibold">
          AC का खर्च सिर्फ कीमत के टैग से तय नहीं होता
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            गर्मियों के बिजली बिल में एयर कंडीशनर अक्सर सबसे बड़ी लाइन होती है। दो
            चीज़ें खर्च तय करती हैं: यूनिट बिजली को कितनी कुशलता से ठंडक में बदलती है
            (इसकी <strong>ISEER / स्टार रेटिंग</strong>), और <strong>आपका DISCOM
            किस दर पर चार्ज करता है</strong> — जो, चूंकि AC आपके मूल इस्तेमाल के ऊपर
            जुड़ता है, आपका सबसे ऊंचा टैरिफ स्लैब होता है।
          </p>
          <p>
            हमारे कैलकुलेटर दोनों को मिलाकर एक असली रनिंग कॉस्ट, कमरे के लिए सही साइज़,
            और ज़्यादा कुशल मॉडल पर पेबैक दिखाते हैं।
          </p>
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

      <CrossHubLinks current="ac" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      </main>
    </>
  )
}
