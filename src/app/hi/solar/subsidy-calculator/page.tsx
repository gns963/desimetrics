import type { Metadata } from 'next'
import Link from 'next/link'
import LeadGenForm, { type LeadGenFormTexts } from '@/components/LeadGenForm'
import PageHero from '@/components/PageHero'
import SolarSubsidyCalculator, {
  type SolarSubsidyCalculatorTexts,
} from '@/components/calculators/SolarSubsidyCalculator'
import { getAlternateLanguages } from '@/lib/i18n-alternates'
import HowToApplyPMSuryaGhar, { PM_SURYA_GHAR_STEPS } from '@/components/solar/HowToApplyPMSuryaGhar'
import SubsidyTierCards from '@/components/solar/SubsidyTierCards'

const SITE = 'https://desimetrics.com'
const PATH = '/solar/subsidy-calculator'

export const metadata: Metadata = {
  title: 'PM सूर्य घर सब्सिडी कैलकुलेटर 2026 — पात्रता और राशि',
  description:
    'अपनी PM सूर्य घर: मुफ्त बिजली योजना रूफटॉप सोलर सब्सिडी और पात्रता जांचें। पहले 2 kW के लिए ₹30,000/kW, तीसरे kW के लिए ₹18,000, अधिकतम ₹78,000 तक।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/solar/subsidy-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const faqs: { q: string; a: string }[] = [
  {
    q: 'PM सूर्य घर सब्सिडी कितनी है?',
    a: 'यह पहले 2 kW के लिए ₹30,000 प्रति kW और तीसरे kW के लिए ₹18,000 है, अधिकतम ₹78,000 तक। तो 1 kW को ₹30,000, 2 kW को ₹60,000, और 3 kW या उससे बड़े को ₹78,000 मिलते हैं।',
  },
  {
    q: 'PM सूर्य घर के लिए कौन पात्र है?',
    a: 'भारतीय घरेलू बिजली उपभोक्ता जो उपयुक्त छत वाले घर के मालिक हैं, वैध ग्रिड कनेक्शन रखते हैं, और जिन्होंने पहले कोई रूफटॉप सोलर सब्सिडी नहीं ली है।',
  },
  {
    q: 'क्या 3 kW से बड़े सिस्टम को ज़्यादा सब्सिडी मिलती है?',
    a: 'नहीं। केंद्रीय सब्सिडी अधिकतम ₹78,000 तक सीमित है, चाहे सिस्टम 3 kW से कितना भी बड़ा क्यों न हो।',
  },
  {
    q: 'क्या सब्सिडी मुझे मिलती है या इंस्टॉलर को?',
    a: 'इंस्टॉलेशन और निरीक्षण के बाद राष्ट्रीय PM सूर्य घर पोर्टल के ज़रिए सब्सिडी सीधे आपके बैंक खाते में जमा होती है।',
  },
  {
    q: 'सब्सिडी आवेदन प्रक्रिया में कितना समय लगता है?',
    a: 'रजिस्ट्रेशन से सब्सिडी मिलने तक आम तौर पर कुल लगभग 2-3 महीने लगते हैं, जिसमें पोर्टल रजिस्ट्रेशन, वेंडर चुनाव और फिज़िबिलिटी अप्रूवल, इंस्टॉलेशन और नेट-मीटर आवेदन, और अंत में सब्सिडी जमा होने से पहले DISCOM निरीक्षण शामिल है — नीचे स्टेप-बाय-स्टेप टाइमलाइन देखें।',
  },
  {
    q: 'अगर मेरा सब्सिडी आवेदन रिजेक्ट हो जाए तो क्या होगा?',
    a: 'रिजेक्शन आम तौर पर अधूरे दस्तावेज़, अपात्र कनेक्शन प्रकार, या आपके सिस्टम साइज़ के लिए स्वीकृत लोड लिमिट पार करने की वजह से होते हैं। पोर्टल आम तौर पर रिजेक्शन की वजह दिखाता है, और आप आम तौर पर समस्या ठीक करके दोबारा आवेदन कर सकते हैं।',
  },
  {
    q: 'क्या मुझे PM सूर्य घर के अलावा राज्य सब्सिडी भी मिल सकती है?',
    a: 'कुछ राज्य केंद्रीय PM सूर्य घर राशि के ऊपर अतिरिक्त सब्सिडी देते हैं — यह राज्य के हिसाब से अलग होती है और इस कैलकुलेटर में शामिल नहीं है, जो सिर्फ तय केंद्रीय सब्सिडी दिखाता है। किसी अतिरिक्त योजना के लिए अपने राज्य के नवीकरणीय ऊर्जा विभाग या DISCOM से जांच लें।',
  },
  {
    q: 'क्या मुझे MNRE-सूचीबद्ध इंस्टॉलर इस्तेमाल करना ज़रूरी है?',
    a: 'हां — सब्सिडी के लिए पात्र होने के लिए, इंस्टॉलेशन PM सूर्य घर कार्यक्रम के तहत आपके DISCOM के साथ सूचीबद्ध वेंडर के ज़रिए, मेड-इन-इंडिया (DCR) पैनल और MNRE-स्वीकृत घटकों का इस्तेमाल करके होना चाहिए।',
  },
  {
    q: 'आवेदन के लिए मुझे कौन से दस्तावेज़ चाहिए?',
    a: 'आम तौर पर आपका बिजली बिल/कंज्यूमर नंबर, छत के मालिकाना हक का प्रमाण या मालिक की सहमति, और सब्सिडी ट्रांसफर के लिए एक वैध बैंक खाता — सटीक दस्तावेज़ चेकलिस्ट पोर्टल रजिस्ट्रेशन के दौरान पक्की होती है।',
  },
  {
    q: 'क्या किराएदार PM सूर्य घर के लिए आवेदन कर सकते हैं?',
    a: 'सब्सिडी छत और कनेक्शन से जुड़ी होती है, इसलिए इसे इंस्टॉल और क्लेम करने के लिए आम तौर पर आपको प्रॉपर्टी का मालिक होना चाहिए या प्रॉपर्टी मालिक की स्पष्ट सहमति चाहिए — बिना उस सहमति के किराएदार पात्र नहीं है।',
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
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'होम', item: `${SITE}/hi` },
    { '@type': 'ListItem', position: 2, name: 'सोलर', item: `${SITE}/hi/solar` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'PM सूर्य घर सब्सिडी कैलकुलेटर',
      item: `${SITE}/hi${PATH}`,
    },
  ],
}
const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PM सूर्य घर सब्सिडी कैलकुलेटर',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to apply for the PM Surya Ghar subsidy',
  step: PM_SURYA_GHAR_STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

const solarSubsidyTextsHi: SolarSubsidyCalculatorTexts = {
  title: 'PM सूर्य घर सब्सिडी चेकर',
  subtitle: 'अपनी रूफटॉप सोलर सब्सिडी और पात्रता का अनुमान लगाएं',
  kwLabel: 'योजनाबद्ध सिस्टम साइज़',
  kwUnit: 'kW',
  eligibilityLegend: 'पात्रता',
  criteria: [
    { key: 'residential', label: 'यह एक घरेलू (रेज़िडेंशियल) कनेक्शन है' },
    { key: 'ownRoof', label: 'मैं घर का मालिक हूं / छत पर मेरा अधिकार है' },
    { key: 'gridConnected', label: 'घर में वैध ग्रिड बिजली कनेक्शन है' },
    { key: 'notAvailed', label: 'मैंने अभी तक कोई रूफटॉप सोलर सब्सिडी नहीं ली है' },
  ],
  ctaLabel: 'मेरी सब्सिडी जांचें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  estimateLabel: 'अनुमानित PM सूर्य घर सब्सिडी',
  eligibleMsg: '✅ आप PM सूर्य घर के लिए पात्र दिखते हैं।',
  notEligibleMsg: '⚠️ सब्सिडी के लिए पात्र होने के लिए ऊपर सभी शर्तें चुनें।',
  tier1: 'पहले 2 kW के लिए ₹30,000/kW',
  tier2: 'तीसरे kW के लिए ₹18,000',
  tier3: 'अधिकतम ₹78,000 तक सीमित (3 kW और उससे बड़े सिस्टम)',
  aboveCapNote: '3 kW से बड़े सिस्टम को भी वही ₹78,000 की सीमा मिलती है।',
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

export default function SolarSubsidyPageHi() {
  return (
    <>
      <PageHero
        hub="solar"
        breadcrumb={[
          { label: 'सोलर', href: '/hi/solar' },
          { label: 'PM सूर्य घर सब्सिडी कैलकुलेटर', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>☀️</span> Solar hub
          </>
        }
        h1="PM सूर्य घर सब्सिडी कैलकुलेटर"
        subtitle={
          <>
            <strong>PM सूर्य घर: मुफ्त बिजली योजना</strong> के तहत अपनी रूफटॉप
            सोलर सब्सिडी जांचें और पुष्टि करें कि आप पात्रता शर्तें पूरी करते
            हैं या नहीं। 3 kW और उससे बड़े सिस्टम के लिए केंद्रीय सब्सिडी{' '}
            <strong>₹78,000</strong> तक सीमित है।
          </>
        }
        stats={[
          { icon: '💰', big: '₹30,000/kW', small: 'पहले 2 kW', tone: 'hub' },
          { icon: '💰', big: '₹18,000', small: 'तीसरा kW', tone: 'hub' },
          { icon: '🧢', big: '₹78,000', small: 'अधिकतम सीमा', tone: 'hub' },
          { icon: '📊', big: '3 kW+', small: 'सीमा शुरू', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपनी सब्सिडी जांचें
        </h2>
        <SolarSubsidyCalculator texts={solarSubsidyTextsHi} />
      </section>

      <SubsidyTierCards discomCode="TNEB" />

      <HowToApplyPMSuryaGhar />

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="font-display mb-4 text-2xl font-semibold">
          PM सूर्य घर FAQ
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

      <section aria-labelledby="related" className="mb-10">
        <h2 id="related" className="font-display mb-4 text-2xl font-semibold">
          जुड़े हुए कैलकुलेटर
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/hi/solar/roi-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>☀️</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              सोलर ROI कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इस सब्सिडी के बाद अपनी नेट लागत और सटीक पेबैक अवधि देखें।
            </p>
          </Link>
          <Link
            href="/hi/solar/panel-size-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>📐</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              पैनल साइज़ कैलकुलेटर
            </p>
            <p className="mt-1 text-xs text-ash/60">
              पक्का नहीं कि किस साइज़ के सिस्टम के लिए आवेदन करें? यहां से शुरू करें।
            </p>
          </Link>
          <Link
            href="/hi/solar/net-metering-calculator"
            className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-solar/50 hover:shadow-sm"
          >
            <span className="text-xl" aria-hidden>🔄</span>
            <p className="font-display mt-2 font-bold text-ink-navy">
              नेट मीटरिंग कमाई
            </p>
            <p className="mt-1 text-xs text-ash/60">
              इंस्टॉलेशन के बाद आपकी एक्सपोर्ट यूनिट्स की कीमत क्या है।
            </p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="leadgen" className="mb-6">
        <h2 id="leadgen" className="font-display mb-4 text-2xl font-semibold">
          इंस्टॉलर से जुड़ें
        </h2>
        <LeadGenForm
          source="solar-subsidy-calculator-hi"
          heading="इंस्टॉलर से जुड़ें"
          subheading="अपने घर के बारे में थोड़ी जानकारी दें और हम आपको सत्यापित इंस्टॉलर से जोड़ देंगे।"
          texts={leadGenTextsHi}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
    </main>
    </>
  )
}
