import type { Metadata } from 'next'
import Link from 'next/link'
import NetMeteringCalculator, { type NetMeteringCalculatorTexts } from '@/components/calculators/NetMeteringCalculator'
import PageHero from '@/components/PageHero'
import { estimateNetMeteringEarnings } from '@/lib/calc/solar'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/net-metering-calculator'

const example = estimateNetMeteringEarnings({
  monthlyGenerationUnits: 400,
  monthlyConsumptionUnits: 300,
  exportRatePerUnit: 4,
})

export const metadata: Metadata = {
  title: 'नेट मीटरिंग कमाई कैलकुलेटर 2026 — सोलर एक्सपोर्ट क्रेडिट (भारत)',
  description:
    'अपनी मासिक जनरेशन, खपत और अपने DISCOM की एक्सपोर्ट क्रेडिट दर से, नेट मीटरिंग के तहत आपकी एक्सपोर्ट सोलर यूनिट्स की कीमत क्या है, यह निकालें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/solar/net-metering-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Net Metering Earnings Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'सोलर', path: '/solar' },
  { name: 'नेट मीटरिंग कैलकुलेटर', path: PATH },
])

const netMeteringTextsHi: NetMeteringCalculatorTexts = {
  title: 'नेट मीटरिंग कमाई कैलकुलेटर',
  subtitle: 'आपकी एक्सपोर्ट सोलर यूनिट्स की कीमत क्या है',
  generationLabel: 'मासिक सोलर जनरेशन',
  consumptionLabel: 'मासिक खपत',
  unitsUnit: 'यूनिट',
  rateLabel: 'एक्सपोर्ट क्रेडिट दर',
  rateUnit: '₹/यूनिट',
  rateHint: 'अपने DISCOM की नेट-मीटरिंग नीति जांचें — एक्सपोर्ट दरें राज्य के हिसाब से अलग होती हैं।',
  ctaLabel: 'एक्सपोर्ट क्रेडिट निकालें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  monthlyCreditLabel: 'मासिक एक्सपोर्ट क्रेडिट',
  yearlyTemplate: '≈ {amount}/साल',
  exportedLabel: 'एक्सपोर्ट यूनिट',
  importedLabel: 'अभी भी इम्पोर्ट यूनिट',
}

const faqs = [
  {
    q: 'नेट मीटरिंग क्या है?',
    a: 'नेट मीटरिंग एक रूफटॉप सोलर मालिक को अतिरिक्त यूनिट्स (जब जनरेशन खपत से ज़्यादा हो) बिल क्रेडिट के बदले वापस ग्रिड में एक्सपोर्ट करने देती है, और जब खपत जनरेशन से ज़्यादा हो तो ग्रिड से यूनिट इम्पोर्ट करने देती है — दोनों को एक-दूसरे के हिसाब से नेट किया जाता है, आम तौर पर एक बिलिंग साइकल में।',
  },
  {
    q: 'मुझे अपनी एक्सपोर्ट दर खुद क्यों डालनी पड़ती है, कैलकुलेटर को खुद पता क्यों नहीं?',
    a: 'नेट-मीटरिंग एक्सपोर्ट क्रेडिट दरें हर राज्य के बिजली नियामक द्वारा तय होती हैं और काफी अलग होती हैं — कुछ आपके चुकाए जाने वाले रिटेल टैरिफ पर ही एक्सपोर्ट क्रेडिट देते हैं, कुछ कम "औसत बिजली खरीद लागत" पर। कोई एक राष्ट्रीय दर नहीं है, इसलिए अपने DISCOM की प्रकाशित दर इस्तेमाल करना ही एकमात्र सटीक तरीका है।',
  },
  {
    q: 'मुझे अपने DISCOM की नेट-मीटरिंग एक्सपोर्ट दर कहां मिलेगी?',
    a: 'यह आपके राज्य के नेट-मीटरिंग नियमों में तय होती है, आम तौर पर राज्य बिजली नियामक आयोग (SERC) द्वारा प्रकाशित, और आपका इंस्टॉलर आपके नेट-मीटरिंग आवेदन के हिस्से के रूप में इसकी पुष्टि कर सकता है।',
  },
  {
    q: 'क्या ज़्यादा एक्सपोर्ट का मतलब हमेशा ज़्यादा कमाई है?',
    a: 'सिर्फ तभी जब आपकी एक्सपोर्ट दर आपके रिटेल टैरिफ के करीब हो। जिन राज्यों में एक्सपोर्ट क्रेडिट रिटेल दर से काफी नीचे तय है, वहां अक्सर एक्सपोर्ट के लिए बड़ा अतिरिक्त बनाने की बजाय अपनी खपत के करीब (सेल्फ-कंजम्पशन) सिस्टम साइज़ करना ज़्यादा फायदेमंद होता है।',
  },
  {
    q: 'क्या नेट-मीटरिंग क्रेडिट कैश में मिलता है, या सिर्फ बिल क्रेडिट के रूप में?',
    a: 'आम तौर पर कैश पेआउट की बजाय बिल क्रेडिट के रूप में — ज़्यादातर राज्य नियम भविष्य के बिलों को ऑफसेट करने के लिए बिना इस्तेमाल किया एक्सपोर्ट क्रेडिट आगे बैंक करते हैं, हालांकि कुछ साल के अंत में बचे किसी भी क्रेडिट के निपटान का प्रावधान रखते हैं। अपने खास राज्य का नियम जांचें या अपने इंस्टॉलर से पूछें।',
  },
  {
    q: 'ग्रॉस मीटरिंग और नेट मीटरिंग में क्या फर्क है?',
    a: 'नेट मीटरिंग में, सिर्फ आपकी अतिरिक्त जनरेशन (आपके घर के अपने इस्तेमाल के बाद) एक्सपोर्ट और क्रेडिट होती है। ग्रॉस मीटरिंग में, आपकी पूरी जनरेशन एक अलग दर पर एक्सपोर्ट और क्रेडिट होती है, जबकि आप ग्रिड से जो भी इस्तेमाल करते हैं उसके लिए अलग से भुगतान करते हैं। कौन सा लागू होता है — या क्या आप चुन सकते हैं — यह आपके राज्य के नियम और कभी-कभी आपके सिस्टम साइज़ पर निर्भर करता है।',
  },
  {
    q: 'क्या नेट-मीटरिंग पात्रता के लिए कोई सिस्टम साइज़ सीमा है?',
    a: 'कई राज्य नेट-मीटरिंग पात्रता को आपके स्वीकृत बिजली लोड के सापेक्ष सीमित रखते हैं — सिस्टम साइज़ पक्का करने से पहले अपने DISCOM से यह जांच लें, खासकर अगर आप अपनी खपत के 100% से ऊपर साइज़ कर रहे हैं।',
  },
  {
    q: 'सबसे आम नेट-मीटरिंग गलती क्या है?',
    a: 'इंस्टॉलेशन के बाद नेट-मीटरिंग आवेदन में देरी करना। जब तक आवेदन प्रोसेस नहीं होता और मीटर कमीशन नहीं होता, तब तक एक्सपोर्ट यूनिट्स क्रेडिट नहीं होतीं, इसलिए इंस्टॉलेशन और अप्रूवल के बीच का कोई भी अंतराल मुफ्त में एक्सपोर्ट हो जाता है। इंस्टॉलेशन पूरा होते ही आवेदन करें।',
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

export default function NetMeteringPageHi() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'सोलर', href: '/hi/solar' },
          { label: 'नेट मीटरिंग कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="नेट मीटरिंग कमाई कैलकुलेटर"
        subtitle={
          <>
            <strong>आपके अपने DISCOM की एक्सपोर्ट क्रेडिट दर</strong> से जानें
            आपकी एक्सपोर्ट सोलर यूनिट्स की कीमत क्या है — यह राज्य के हिसाब से
            अलग होती है, इसलिए हम आपके लिए इसका अंदाज़ा नहीं लगाते।
          </>
        }
        stats={[
          { icon: '📊', big: 'आपकी दर', small: 'एक्सपोर्ट क्रेडिट आधार', tone: 'hub' },
          { icon: '📅', big: 'मासिक', small: 'नेटिंग अवधि', tone: 'hub' },
          { icon: '🏛️', big: 'राज्य-तय', small: 'नियम स्रोत', tone: 'hub' },
          { icon: '⚡', big: 'तुरंत', small: 'बिना लॉगिन', tone: 'hub' },
        ]}
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
          उदाहरण गणना
        </h2>
        <p className="mt-2 text-ash/80">
          <strong>300 यूनिट</strong> खपत के मुकाबले <strong>400 यूनिट/महीना</strong>{' '}
          जनरेशन पर, <strong>₹4/यूनिट</strong> एक्सपोर्ट दर पर,{' '}
          {example.exportedUnits} अतिरिक्त यूनिट्स के लिए लगभग{' '}
          <strong>{formatINR(example.monthlyExportCredit)}/महीना</strong>{' '}
          एक्सपोर्ट क्रेडिट मिलता है।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपना एक्सपोर्ट क्रेडिट निकालें
        </h2>
        <NetMeteringCalculator texts={netMeteringTextsHi} />
      </section>

      <section aria-labelledby="how-it-works" className="mb-10">
        <h2 id="how-it-works" className="font-display mb-2 text-2xl font-semibold">
          नेट मीटरिंग असल में कैसे काम करती है
        </h2>
        <div className="space-y-3 text-ash/80">
          <p>
            आपका बाईडायरेक्शनल मीटर दोनों दिशाओं में बहने वाली बिजली को ट्रैक
            करता है। दिन में, अगर आपके पैनल आपके घर के इस्तेमाल से ज़्यादा
            बनाते हैं, तो अतिरिक्त बिजली ग्रिड में बहती है और मीटर इसे एक्सपोर्ट
            के रूप में दर्ज करता है। शाम और रात में, जब आपके पैनल जनरेशन नहीं
            कर रहे होते, आपका घर सामान्य रूप से ग्रिड से बिजली लेता है और मीटर
            इसे इम्पोर्ट के रूप में दर्ज करता है।
          </p>
          <p>
            बिलिंग साइकल के अंत में, आपका DISCOM दोनों आंकड़ों को एक-दूसरे के
            हिसाब से नेट करता है। मान लीजिए आपका सिस्टम धूप वाले दिन 15 यूनिट
            बनाता है; आपका घर दिन में 8 और उस शाम 4 और यूनिट इस्तेमाल करता है।
            आपने ग्रिड में 7 यूनिट एक्सपोर्ट कीं और बाद में 4 वापस इम्पोर्ट कीं
            — उस दिन के लिए नेट, आप 3 यूनिट के क्रेडिट में हैं। वह क्रेडिट
            आपके राज्य की एक्सपोर्ट दर पर तय होता है, यही वजह है कि ऊपर आपकी
            डाली दर इतनी मायने रखती है।
          </p>
        </div>
      </section>

      <section aria-labelledby="state-policy" className="mb-10">
        <h2 id="state-policy" className="font-display mb-2 text-2xl font-semibold">
          नेट-मीटरिंग नीति राज्य के हिसाब से अलग होती है — क्या जांचें
        </h2>
        <p className="mb-3 text-ash/80">
          नेट-मीटरिंग नियम हर राज्य के बिजली नियामक (SERC) द्वारा अलग-अलग तय
          होते हैं और समय-समय पर बदले जाते हैं। एक राज्य-दर-राज्य तालिका
          प्रकाशित करने की बजाय जो पुरानी पड़ सकती है या आपके खास DISCOM के
          लिए गलत हो सकती है, यहां वे संरचनात्मक सवाल हैं जो इंस्टॉल करने से
          पहले सीधे अपने इंस्टॉलर या DISCOM से पक्के करने लायक हैं:
        </p>
        <ul className="space-y-2 text-sm text-ash/80">
          <li>
            <strong>ग्रॉस या नेट मीटरिंग?</strong> कुछ राज्य सिर्फ एक ही
            देते हैं; कुछ बड़े सिस्टम को चुनने देते हैं।
          </li>
          <li>
            <strong>एक्सपोर्ट दर क्या तय करता है?</strong> यह आपके रिटेल
            टैरिफ, एक अलग &quot;औसत बिजली खरीद लागत&quot; (APPC), या एक तय
            फीड-इन दर के हिसाब से हो सकती है — ये काफी अलग हो सकती हैं।
          </li>
          <li>
            <strong>क्रेडिट कैसे सेटल होता है?</strong> मासिक नेटिंग, या
            आगे बढ़ाए गए क्रेडिट के साथ सालाना नेटिंग — और क्या बिना इस्तेमाल
            क्रेडिट खत्म हो जाता है, बैंक हो जाता है, या साल के अंत में
            चुकाया जाता है।
          </li>
          <li>
            <strong>क्या कोई सिस्टम साइज़ सीमा है?</strong> कई राज्य
            नेट-मीटरिंग पात्रता को आपके स्वीकृत बिजली लोड के सापेक्ष सीमित
            रखते हैं।
          </li>
        </ul>
      </section>

      <section aria-labelledby="mistakes" className="mb-10">
        <h2 id="mistakes" className="font-display mb-4 text-2xl font-semibold">
          आम नेट-मीटरिंग गलतियां
        </h2>
        <ul className="space-y-3 text-sm text-ash/80">
          <li>
            <strong>आवेदन में देरी करना।</strong> आपका नेट मीटर कमीशन होने
            से पहले एक्सपोर्ट यूनिट्स आम तौर पर क्रेडिट नहीं होतीं — पहला बिल
            आने के बाद नहीं, इंस्टॉलेशन खत्म होते ही आवेदन करें।
          </li>
          <li>
            <strong>यह मान लेना कि एक्सपोर्ट दर = रिटेल दर।</strong> कई
            राज्यों में एक्सपोर्ट दर आपके चुकाए जाने से कम तय की जाती है, जो
            एक बड़े एक्सपोर्ट-भारी सिस्टम के लिए पेबैक गणित बदल देती है।
          </li>
          <li>
            <strong>सेटलमेंट अवधि न जांचना।</strong> यह उम्मीद करना कि
            मासिक कैश पेआउट मिलेगा जबकि आपका राज्य सिर्फ क्रेडिट कैरी-फॉरवर्ड
            के साथ सालाना नेटिंग की अनुमति देता है, कैश सेटलमेंट की नहीं।
          </li>
          <li>
            <strong>सिर्फ एक्सपोर्ट इनकम के लिए ओवरसाइज़िंग</strong> असली
            एक्सपोर्ट दर पक्की किए बिना — हमारा{' '}
            <Link href="/hi/solar/panel-size-calculator" className="text-brass underline">
              पैनल साइज़ कैलकुलेटर
            </Link>{' '}
            देखें और पहले अपनी असली दर से आंकड़े निकालें।
          </li>
          <li>
            <strong>स्वीकृत-लोड जांच छोड़ना।</strong> इंस्टॉलेशन के बाद यह
            पता चलना कि आपका सिस्टम आपके कनेक्शन की नेट-मीटरिंग पात्रता सीमा
            से ज़्यादा है।
          </li>
        </ul>
      </section>

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/solar/panel-size-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर पैनल साइज़
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अभी 100% से ऊपर साइज़ नहीं कर रहे? यहां से शुरू करें।
            </p>
          </Link>
          <Link
            href="/hi/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर ROI कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              सेल्फ-कंजम्पशन बचत सहित पूरा पेबैक।
            </p>
          </Link>
          <Link
            href="/hi/solar/subsidy-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>💸</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              PM सूर्य घर सब्सिडी
            </p>
            <p className="mt-1 text-xs text-ash/60">
              अपनी केंद्रीय सब्सिडी राशि जांचें।
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
