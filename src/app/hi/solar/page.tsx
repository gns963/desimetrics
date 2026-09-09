import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import LeadGenForm, { type LeadGenFormTexts } from '@/components/LeadGenForm'
import SplitHero from '@/components/SplitHero'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/solar'

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'सोलर', path: PATH },
])
const CARDS = [
  {
    href: '/hi/solar/roi-calculator',
    emoji: '☀️',
    title: 'सोलर ROI कैलकुलेटर',
    body: 'पेबैक अवधि, सब्सिडी के बाद नेट कॉस्ट, सालाना और 25-साल की बचत — आपके असली बिल पर आधारित।',
    cta: 'कैलकुलेटर खोलें →',
  },
  {
    href: '/hi/solar/subsidy-calculator',
    emoji: '💸',
    title: 'PM सूर्य घर सब्सिडी चेकर',
    body: 'अपनी योजनाबद्ध सिस्टम साइज़ के लिए पात्रता और सटीक केंद्रीय सब्सिडी राशि जांचें।',
    cta: 'सब्सिडी जांचें →',
  },
  {
    href: '/hi/solar/panel-size-calculator',
    emoji: '📐',
    title: 'पैनल साइज़ कैलकुलेटर',
    body: 'आपके बिल-ऑफसेट लक्ष्य के लिए ज़रूरी सिस्टम साइज़ (kW) और छत का क्षेत्रफल।',
    cta: 'मेरा साइज़ जानें →',
  },
  {
    href: '/hi/solar/battery-backup-calculator',
    emoji: '🔋',
    title: 'बैटरी बैकअप कैलकुलेटर',
    body: 'रात या बादल वाले दिन के बैकअप पावर के लिए बैटरी बैंक का साइज़ तय करें।',
    cta: 'मेरी बैटरी साइज़ करें →',
  },
  {
    href: '/hi/solar/net-metering-calculator',
    emoji: '🔄',
    title: 'नेट मीटरिंग कमाई',
    body: 'आपके एक्सपोर्ट किए गए अतिरिक्त सोलर यूनिट्स की, आपके DISCOM की दर पर, कीमत क्या है।',
    cta: 'कमाई निकालें →',
  },
]
const itemList = itemListLd(CARDS.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'DesiMetrics पर सोलर बचत कैसे गिनी जाती है?',
    a: 'हम आपके सिस्टम से ऑफसेट होने वाली यूनिट्स की कीमत आपके अपने DISCOM के असली टेलिस्कोपिक टैरिफ पर लगाते हैं, ताकि बचत आपकी असली मार्जिनल दर दिखाए, किसी फ्लैट राष्ट्रीय औसत की नहीं।',
  },
  {
    q: 'PM सूर्य घर क्या है?',
    a: 'PM सूर्य घर: मुफ्त बिजली योजना केंद्र सरकार की रूफटॉप सोलर सब्सिडी योजना है, जो घरेलू सिस्टम के लिए ₹78,000 तक देती है। अपनी सटीक राशि हमारे सब्सिडी कैलकुलेटर पर जांचें।',
  },
  {
    q: 'क्या सोलर की भरपाई के लिए नेट मीटरिंग ज़रूरी है?',
    a: 'हां — नेट मीटरिंग ही वह चीज़ है जो आपके DISCOM को ग्रिड में वापस भेजी गई यूनिट्स के लिए आपको क्रेडिट देने देती है, यही तरीका है जिससे हमारे ROI कैलकुलेटर में दिखाई गई ऑफसेट बचत असल में आपके बिल पर लागू होती है।',
  },
  {
    q: 'क्या इंस्टॉलर से जुड़ना मुफ्त है?',
    a: 'हां, अपनी जानकारी देने और कोट पाने का कोई शुल्क नहीं है — हम पार्टनर इंस्टॉलर से कैसे कमाते हैं, यह जानने के लिए हमारा affiliate disclosure देखें।',
  },
  {
    q: 'मुझे किस सोलर कैलकुलेटर से शुरू करना चाहिए?',
    a: 'अगर आप सिर्फ अपनी पेबैक अवधि जानना चाहते हैं, तो ROI कैलकुलेटर से शुरू करें। अगर पहले यह तय नहीं है कि किस सिस्टम साइज़ की ज़रूरत है, तो पैनल साइज़ कैलकुलेटर से शुरू करें — यह आपको वह kW बताता है जो ROI कैलकुलेटर में डालना है।',
  },
  {
    q: 'क्या ये कैलकुलेटर हर भारतीय राज्य के लिए काम करते हैं?',
    a: 'हां — किसी भी कैलकुलेटर में अपना DISCOM चुनें और यह उस राज्य के असली, स्रोत-सत्यापित टैरिफ पर आधारित होगा, वही 36-DISCOM डेटा जो हमारे बिजली बिल कैलकुलेटर के पीछे है।',
  },
  {
    q: 'क्या मैं बिल बचत के साथ-साथ बैटरी बैकअप के लिए भी सिस्टम साइज़ कर सकता हूं?',
    a: 'हां — बचत के लिए हमारे पैनल साइज़ या ROI कैलकुलेटर से पैनल साइज़ करें, फिर बैकअप के लिए हमारे बैटरी बैकअप कैलकुलेटर से एक अलग बैटरी बैंक साइज़ करें। दोनों स्वतंत्र रूप से गिने जाते हैं, क्योंकि बैकअप आपके क्रिटिकल लोड पर निर्भर करता है, आपके कुल इस्तेमाल पर नहीं।',
  },
  {
    q: 'सोलर के पर्यावरणीय प्रभाव की गणना कैसे होती है?',
    a: 'आपके सिस्टम की अनुमानित सालाना जनरेशन से, भारत के सांकेतिक राष्ट्रीय ग्रिड एमिशन फैक्टर का इस्तेमाल करके — ROI कैलकुलेटर पर स्रोतों सहित पूरा ब्यौरा देखें।',
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

export const metadata: Metadata = {
  title: 'रूफटॉप सोलर कैलकुलेटर और PM सूर्य घर सब्सिडी (भारत)',
  description:
    'भारत के लिए मुफ्त रूफटॉप सोलर टूल्स: आपके असली DISCOM टैरिफ पर आधारित ROI और पेबैक कैलकुलेटर, और एक PM सूर्य घर सब्सिडी चेकर। सत्यापित इंस्टॉलर से जुड़ें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/solar'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const leadGenTextsHi: LeadGenFormTexts = {
  pincodeLabel: 'PIN कोड',
  pincodeError: 'एक सही 6-अंक का PIN कोड डालें।',
  billLabel: 'मासिक बिजली बिल (₹)',
  billError: 'अपना मासिक बिल राशि ₹ में डालें।',
  roofLabel: 'छत का प्रकार',
  roofError: 'अपनी छत का प्रकार चुनें।',
  roofSelect: 'चुनें…',
  roofConcrete: 'कंक्रीट (RCC)',
  roofTin: 'टिन / धातु शीट',
  roofOther: 'अन्य',
  phoneLabel: 'मोबाइल नंबर',
  phoneError: 'एक सही 10-अंक का मोबाइल नंबर डालें।',
  submitLabel: 'मेरे मुफ्त कोट पाएं →',
  disclaimer: 'कोई स्पैम नहीं। हम आपकी जानकारी सिर्फ उन इंस्टॉलर से साझा करते हैं जिनसे आप मैच होते हैं।',
  successTitle: 'धन्यवाद — हम आपको 3 सत्यापित इंस्टॉलर से जोड़ेंगे।',
  successBody: 'अपने फोन पर नज़र रखें; कोट आम तौर पर 2 कार्य दिवसों में आ जाते हैं।',
}

export default function SolarHubPageHi() {
  return (
    <>
      <SplitHero
        hub="solar"
        breadcrumb={[{ label: 'सोलर', href: '/hi/solar' }]}
        badgeLabel="5 कैलकुलेटर · असली DISCOM टैरिफ"
        h1="रूफटॉप सोलर कैलकुलेटर और PM सूर्य घर सब्सिडी"
        subtitle="जानें आपके घर के लिए रूफटॉप सोलर फायदेमंद है या नहीं। हमारे टूल बचत की कीमत आपके DISCOM के असली बिजली टैरिफ पर लगाते हैं, और PM सूर्य घर केंद्रीय सब्सिडी (₹78,000 तक) लागू करते हैं।"
        primaryCta={{ label: 'मेरा पेबैक जांचें', href: '#tools', emoji: '☀️' }}
        secondaryCta={{ label: '3 मुफ्त कोट पाएं →', href: '#leadgen' }}
        statChips={[
          { icon: '💸', big: '₹78,000', small: 'अधिकतम PM सूर्य घर सब्सिडी', tone: 'hub' },
          { icon: '📆', big: '25 साल', small: 'सिस्टम की उम्र', tone: 'hub' },
          { icon: '📊', big: 'असली टैरिफ', small: 'आपके DISCOM पर आधारित', tone: 'hub' },
          { icon: '🧮', big: '5', small: 'कैलकुलेटर', tone: 'hub' },
        ]}
        resultCard={
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
              <span aria-hidden>☀️</span> सामान्य पेबैक
            </p>
            <p className="mt-2 text-sm text-white/70">
              एक सही साइज़ का रूफटॉप सिस्टम आम तौर पर 25-साल की कार्य-अवधि में{' '}
              <strong className="text-spark-teal">4–6 साल</strong> में अपनी
              लागत वसूल कर लेता है:
            </p>
            <div className="mt-4">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/5 rounded-full bg-hub-solar" />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-white/40">
                <span>साल 0</span>
                <span className="text-hub-solar">~5 साल: वसूल</span>
                <span>साल 25</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/50">
              आपका असली पेबैक सिस्टम साइज़, छत की धूप, और आपके DISCOM के
              टैरिफ पर निर्भर करता है — सटीक आंकड़े के लिए ROI कैलकुलेटर देखें।
            </p>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section id="tools" className="mb-10 grid scroll-mt-20 gap-6 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col rounded-2xl border border-hub-solar/20 bg-hub-solar/5 p-6 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-xl font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className="mt-3 text-sm font-semibold text-hub-solar">
              {c.cta}
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="how-solar" className="mb-10">
        <h2 id="how-solar" className="font-display mb-4 text-2xl font-semibold">
          PM सूर्य घर सोलर को किफ़ायती कैसे बनाता है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            PM सूर्य घर: मुफ्त बिजली योजना केंद्र सरकार की घरों के लिए रूफटॉप
            सोलर योजना है। यह <strong>पहले 2 kW के लिए ₹30,000/kW</strong> और{' '}
            <strong>तीसरे kW के लिए ₹18,000</strong> देती है, अधिकतम{' '}
            <strong>₹78,000</strong> तक — इंस्टॉलेशन के बाद आपके बैंक खाते में
            जमा किया जाता है।
          </p>
          <p>
            नेट मीटरिंग और टेलिस्कोपिक टैरिफ (जहां सोलर पहले आपकी सबसे महंगी
            यूनिट्स को ऑफसेट करता है) के साथ मिलकर, एक सामान्य 3 kW सिस्टम
            लगभग 4–6 साल में अपनी लागत वसूल कर लेता है और फिर दो दशकों तक
            काफी हद तक मुफ्त बिजली बनाता है।
          </p>
        </div>
      </section>

      <section aria-labelledby="leadgen" className="mb-6">
        <h2 id="leadgen" className="font-display mb-4 text-2xl font-semibold">
          3 मुफ्त इंस्टॉलर कोट पाएं
        </h2>
        <LeadGenForm
          source="solar-hub-hi"
          heading="3 मुफ्त इंस्टॉलर कोट पाएं"
          subheading="अपने घर के बारे में थोड़ी जानकारी दें और हम आपको आपके इलाके के सत्यापित रूफटॉप सोलर इंस्टॉलर से जोड़ देंगे।"
          texts={leadGenTextsHi}
        />
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

      <CrossHubLinks current="solar" />

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
