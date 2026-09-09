import type { Metadata } from 'next'
import Link from 'next/link'
import CrossHubLinks from '@/components/CrossHubLinks'
import PageHero from '@/components/PageHero'
import { breadcrumbLd, itemListLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/appliances'

export const metadata: Metadata = {
  title: 'घरेलू उपकरण बिजली खर्च और साइज़िंग कैलकुलेटर (भारत)',
  description:
    'रोज़मर्रा के घरेलू उपकरणों के लिए मुफ्त कैलकुलेटर: सीलिंग फैन और फ्रिज रनिंग कॉस्ट, इन्वर्टर/UPS साइज़िंग, बैटरी बैकअप टाइम, कमरा ठंडा होने का समय और पानी की टंकी भरने का समय।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/appliances'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const cards = [
  {
    href: '/hi/appliances/household-bill-builder',
    emoji: '🏠',
    title: 'हाउसहोल्ड बिल बिल्डर',
    body: 'अपने सभी उपकरण जोड़ें और अपने असली प्रोग्रेसिव स्लैब टैरिफ के हिसाब से मिला-जुला बिल देखें।',
  },
  {
    href: '/hi/appliances/phantom-load-checker',
    emoji: '👻',
    title: 'फैंटम लोड चेकर',
    body: 'हमेशा-ऑन स्टैंडबाय डिवाइस (राउटर, सेट-टॉप बॉक्स) साल भर में कितना खर्च करते हैं।',
  },
  {
    href: '/hi/appliances/ceiling-fan-cost-calculator',
    emoji: '🌀',
    title: 'सीलिंग फैन कॉस्ट कैलकुलेटर',
    body: 'स्टैंडर्ड बनाम BEE 5-स्टार बनाम BLDC रनिंग कॉस्ट, आपके DISCOM पर आधारित।',
  },
  {
    href: '/hi/appliances/fridge-cost-calculator',
    emoji: '❄️',
    title: 'फ्रिज कॉस्ट कैलकुलेटर',
    body: 'आपके फ्रिज के अपने BEE लेबल पर असली सालाना kWh आंकड़े से।',
  },
  {
    href: '/hi/appliances/air-cooler-cost-calculator',
    emoji: '🌬️',
    title: 'एयर कूलर कॉस्ट कैलकुलेटर',
    body: 'पर्सनल, टावर या डेज़र्ट कूलर रनिंग कॉस्ट, आपके DISCOM पर आधारित।',
  },
  {
    href: '/hi/appliances/induction-cooktop-cost-calculator',
    emoji: '🍳',
    title: 'इंडक्शन कुकटॉप कॉस्ट कैलकुलेटर',
    body: 'वाटेज और रोज़ के खाना पकाने के समय से खाना पकाने का बिजली खर्च।',
  },
  {
    href: '/hi/appliances/inverter-sizing-calculator',
    emoji: '🔌',
    title: 'इन्वर्टर साइज़िंग कैलकुलेटर',
    body: 'आपके बैकअप लोड के लिए सही VA रेटिंग और बैटरी Ah।',
  },
  {
    href: '/hi/appliances/inverter-backup-time-calculator',
    emoji: '🔋',
    title: 'इन्वर्टर बैकअप टाइम',
    body: 'आपकी मौजूदा बैटरी असल में कितनी देर चलेगी।',
  },
  {
    href: '/hi/appliances/room-cooling-time-calculator',
    emoji: '⏱️',
    title: 'रूम कूलिंग टाइम',
    body: 'आपके AC के पुल-डाउन समय का फिज़िक्स-आधारित अनुमान।',
  },
  {
    href: '/hi/appliances/water-tank-filling-time-calculator',
    emoji: '🚰',
    title: 'पानी टैंक फिल टाइम',
    body: 'आपके टैंक की क्षमता और पंप फ्लो से इसे भरने में कितना समय लगता है।',
  },
]

const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'उपकरण', path: PATH },
])
const itemList = itemListLd(cards.map((c) => ({ name: c.title, path: c.href })))

const faqs = [
  {
    q: 'क्या ये कैलकुलेटर मेरे असली बिजली टैरिफ पर आधारित हैं?',
    a: 'रनिंग-कॉस्ट टूल (फैन, फ्रिज) हां — अपना DISCOM चुनें और यूनिट्स आपके राज्य के असली टॉप-स्लैब टैरिफ पर तय होंगी, किसी राष्ट्रीय औसत पर नहीं। साइज़िंग और टाइमिंग टूल (इन्वर्टर, कूलिंग, टैंक फिल) शुद्ध फिज़िक्स/इलेक्ट्रिकल गणना हैं जो टैरिफ पर निर्भर नहीं करतीं।',
  },
  {
    q: 'इनमें से कुछ अनुमान सिर्फ सैद्धांतिक न्यूनतम क्यों हैं?',
    a: 'रूम कूलिंग टाइम और टैंक फिल टाइम असली फॉर्मूलों पर आधारित हैं लेकिन स्पष्ट रूप से सबसे-अच्छी-स्थिति/सैद्धांतिक आंकड़ों तक सीमित हैं — हम इसे साफ तौर पर बताते हैं, किसी ऐसे "असल-दुनिया" गुणक का आविष्कार नहीं करते जिसे हम सत्यापित नहीं कर सकते।',
  },
  {
    q: 'अगर मेरा उपकरण अभी यहां सूचीबद्ध नहीं है तो?',
    a: 'हम समय के साथ इस हब का विस्तार कर रहे हैं। तब तक, हमारा सामान्य बिजली बिल कैलकुलेटर आपके पूरे बिल को समझने में मदद कर सकता है, और आप हमारे contact पेज के ज़रिए अनुरोध बता सकते हैं।',
  },
  {
    q: 'हाउसहोल्ड बिल बिल्डर और सिंगल-उपकरण टूल में क्या फर्क है?',
    a: 'सिंगल-उपकरण टूल (फैन, फ्रिज) एक डिवाइस की कीमत अकेले, आपके DISCOM की टॉप स्लैब दर पर लगाते हैं। हाउसहोल्ड बिल बिल्डर आपके सभी उपकरणों को एक मिले-जुले कुल में जोड़ता है और उसे असली प्रोग्रेसिव स्लैब संरचना से गिनता है — ताकि आप अपना असली घरेलू बिल देखें, और हर जुड़ाव टैरिफ पर कहां पड़ता है।',
  },
  {
    q: 'क्या ज़्यादा उपकरण जोड़ने से हमेशा उसी अनुपात में खर्च बढ़ता है?',
    a: 'नहीं — क्योंकि भारतीय टैरिफ टेलिस्कोपिक होते हैं, एक उपकरण जोड़ने से आपका घरेलू कुल एक ऊंची-दर वाले स्लैब में जा सकता है, जिससे वह उपकरण (और उसके बाद की हर चीज़) आपके मौजूदा इस्तेमाल से प्रति-यूनिट ज़्यादा महंगी पड़ सकती है। हाउसहोल्ड बिल बिल्डर इसे स्पष्ट रूप से दिखाता है।',
  },
  {
    q: 'एक सामान्य भारतीय घर में सबसे बड़े बिजली खपत करने वाले क्या हैं?',
    a: 'नियमित इस्तेमाल होने पर AC और पानी गर्म करना (गीज़र) आम तौर पर सबसे बड़ी अकेली लाइन आइटम होते हैं, इसके बाद रेफ्रिजरेटर (जो लगातार चलते हैं) और पानी के पंप — असली गणना किए आंकड़ों के लिए हाउसहोल्ड बिल बिल्डर पर रैंक की गई तालिका देखें।',
  },
  {
    q: 'क्या फैंटम/स्टैंडबाय लोड की वाकई चिंता करनी चाहिए?',
    a: 'अकेले, एक स्टैंडबाय डिवाइस छोटा होता है — लेकिन 24/7/365 चलने वाले कई डिवाइस मिलकर एक अच्छा-खासा सालाना आंकड़ा बन जाते हैं, और एक बार पहचान लेने के बाद यह असरदार रूप से "मुफ्त" बचत है, क्योंकि जब डिवाइस वाकई इस्तेमाल में नहीं है तो आप उसके किसी असली इस्तेमाल को नहीं छोड़ रहे।',
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

export default function AppliancesHubPageHi() {
  return (
    <>
      <PageHero
        hub="appliance"
        breadcrumb={[{ label: 'उपकरण', href: '/hi/appliances' }]}
        badgeLabel={
          <>
            <span aria-hidden>🔌</span> Appliances hub
          </>
        }
        h1="घरेलू उपकरण कैलकुलेटर"
        subtitle="उपकरण-दर-उपकरण अपना पूरा घरेलू बिल बनाएं, जांचें हमेशा-ऑन स्टैंडबाय डिवाइस आपको कितना खर्च करते हैं, और फैन व फ्रिज रनिंग कॉस्ट, बैकअप पावर साइज़िंग, और कूलिंग व पानी की टंकी के लिए सरल फिज़िक्स-आधारित टाइमर कवर करें।"
        stats={[
          { icon: '🔌', big: '10', small: 'कैलकुलेटर', tone: 'hub' },
          { icon: '✓', big: 'असली फॉर्मूला', small: 'कोई मनगढ़ंत आंकड़ा नहीं', tone: 'hub' },
          { icon: '🗺️', big: '36 राज्य', small: 'DISCOM कवरेज', tone: 'hub' },
          { icon: '🔓', big: 'मुफ्त', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section className="mb-10 grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col rounded-2xl border border-hub-appliance/20 bg-hub-appliance/5 p-6 transition hover:border-hub-appliance/50 hover:shadow-sm"
          >
            <span className="text-2xl">{c.emoji}</span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink-navy">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ash/70">
              {c.body}
            </p>
            <span className="mt-3 text-sm font-semibold text-hub-appliance">
              कैलकुलेटर खोलें →
            </span>
          </Link>
        ))}
      </section>

      <section aria-labelledby="why" className="mb-10">
        <h2 id="why" className="font-display mb-4 text-2xl font-semibold">
          बिजली बिल से आगे
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            घर का बिजली खर्च सिर्फ एक नंबर नहीं है — यह अलग-अलग वाटेज और
            घंटों पर चलने वाले अलग-अलग उपकरणों का जोड़ है। ये टूल इसे
            उपकरण-दर-उपकरण तोड़कर दिखाते हैं, और बिजली कटौती या पानी के पंप
            के आसपास आने वाले साइज़िंग और टाइमिंग सवालों को कवर करते हैं,
            मनगढ़ंत गुणकों की बजाय असली फॉर्मूला इस्तेमाल करते हुए।
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

      <CrossHubLinks current="appliances" />

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
