import type { Metadata } from 'next'
import FinancialCrossSell from '@/components/FinancialCrossSell'
import PageHero from '@/components/PageHero'
import TaxRegimeCalculator, { type TaxRegimeCalculatorTexts } from '@/components/calculators/TaxRegimeCalculator'
import { compareRegimes } from '@/lib/calc/financial'
import { formatINR } from '@/lib/format'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/financial/new-vs-old-tax-regime-calculator'

const example = compareRegimes(1500000, 150000)

export const metadata: Metadata = {
  title: 'नई बनाम पुरानी टैक्स रेजीम कैलकुलेटर FY 2026-27 (AY 2027-28)',
  description:
    'FY 2026-27 के लिए नई और पुरानी रेजीम के तहत इनकम टैक्स की तुलना करें। इसमें अपडेट किए गए स्लैब, ₹75,000/₹50,000 स्टैंडर्ड डिडक्शन, 87A रिबेट और 4% सेस शामिल है। देखें कौन आपको ज़्यादा बचाता है।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/financial/new-vs-old-tax-regime-calculator'),
  },
  openGraph: { url: `${SITE}/hi${PATH}`, type: 'website', locale: 'hi_IN' },
}

const faqs = [
  {
    q: 'नई या पुरानी टैक्स रेजीम कौन सी बेहतर है?',
    a: 'यह आपकी डिडक्शन पर निर्भर करता है। नई रेजीम में दरें कम हैं और ₹75,000 स्टैंडर्ड डिडक्शन है लेकिन ज़्यादातर अन्य डिडक्शन मना करती है। पुरानी रेजीम तभी बेहतर है जब आपकी 80C/80D/HRA और अन्य डिडक्शन इसकी ऊंची दरों की भरपाई करने के लिए काफी बड़ी हों। यह कैलकुलेटर आपके आंकड़ों के लिए दोनों की तुलना करता है।',
  },
  {
    q: 'FY 2026-27 में नई रेजीम के तहत कितनी आय टैक्स-फ्री है?',
    a: '₹75,000 स्टैंडर्ड डिडक्शन और बढ़ी हुई Section 87A रिबेट की वजह से, लगभग ₹12.75 लाख तक की आय वाले वेतनभोगी व्यक्ति नई रेजीम के तहत शून्य टैक्स देते हैं।',
  },
  {
    q: 'कौन सी डिडक्शन अभी भी नई रेजीम में काम करती हैं?',
    a: '₹75,000 का स्टैंडर्ड डिडक्शन और नियोक्ता का NPS योगदान (80CCD(2)) की अनुमति है। ज़्यादातर अन्य — 80C, 80D, HRA, सेल्फ-ऑक्युपाइड प्रॉपर्टी पर होम लोन ब्याज — सिर्फ पुरानी रेजीम में उपलब्ध हैं।',
  },
  {
    q: 'कौन सी डिडक्शन सिर्फ पुरानी रेजीम के तहत उपलब्ध हैं?',
    a: 'Section 80C (₹1.5L तक — PF, ELSS, लाइफ इंश्योरेंस, आदि), 80D (हेल्थ इंश्योरेंस प्रीमियम), HRA छूट, सेल्फ-ऑक्युपाइड प्रॉपर्टी पर होम लोन ब्याज (Section 24), और ज़्यादातर अन्य Chapter VI-A डिडक्शन सिर्फ तब उपलब्ध हैं जब आप पुरानी रेजीम चुनते हैं।',
  },
  {
    q: 'क्या मैं हर साल रेजीम बदल सकता हूं?',
    a: 'बिना बिज़नेस इनकम वाले वेतनभोगी व्यक्ति अपना रिटर्न फाइल करते समय हर वित्तीय वर्ष कोई भी रेजीम चुन सकते हैं। बिज़नेस/प्रोफेशनल इनकम वालों के लिए स्विचिंग नियम ज़्यादा प्रतिबंधित हैं — अपनी खास स्थिति के लिए मौजूदा CBDT मार्गदर्शन जांचें।',
  },
  {
    q: 'Section 87A रिबेट क्या है?',
    a: 'यह एक रिबेट है जो एक तय आय सीमा तक टैक्स देनदारी को असरदार रूप से शून्य कर देता है, जो नई रेजीम में ज़्यादा है — यही मुख्य वजह है कि ~₹12.75L से कम कमाने वाले कई वेतनभोगी करदाता स्टैंडर्ड डिडक्शन के साथ मिलाकर अब नई रेजीम के तहत कोई टैक्स नहीं देते।',
  },
  {
    q: 'क्या यह कैलकुलेटर सेस शामिल करता है?',
    a: 'हां — दोनों रेजीम में गिने गए इनकम टैक्स (रिबेट के बाद) के ऊपर 4% हेल्थ और एजुकेशन सेस लगाया जाता है, मानक गणना तरीके से मिलाते हुए।',
  },
  {
    q: 'क्या यह कैलकुलेटर फ्रीलांसर या बिज़नेस इनकम के लिए सटीक है?',
    a: 'यह वेतनभोगी-आय डिडक्शन और स्लैब के इर्द-गिर्द बना है। बिज़नेस/प्रोफेशनल इनकम में अतिरिक्त नियम (प्रिज़मटिव टैक्सेशन विकल्प, अलग रेजीम-स्विचिंग प्रतिबंध) हैं जिन्हें यह कैलकुलेटर मॉडल नहीं करता — खासतौर पर बिज़नेस इनकम के लिए किसी टैक्स पेशेवर से सलाह लें।',
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
  name: 'New vs Old Tax Regime Calculator',
  url: `${SITE}/hi${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  areaServed: 'India',
}
const breadcrumb = breadcrumbLd([
  { name: 'होम', path: '' },
  { name: 'फाइनेंशियल', path: '/financial' },
  { name: 'नई बनाम पुरानी टैक्स रेजीम', path: PATH },
])

const taxRegimeTextsHi: TaxRegimeCalculatorTexts = {
  title: 'नई बनाम पुरानी टैक्स रेजीम',
  subtitle: 'FY 2026-27 के लिए अपने इनकम टैक्स की तुलना करें',
  incomeLabel: 'कुल सालाना आय (₹)',
  salariedLegend: 'सैलरीड या पेंशनर?',
  salariedYesLabel: 'हां',
  salariedNoLabel: 'नहीं',
  salariedHint: 'स्टैंडर्ड डिडक्शन लागू करता है (₹75,000 नई / ₹50,000 पुरानी) — बिज़नेस/प्रोफेशनल आय को यह नहीं मिलता।',
  ageGroupLegend: 'आयु वर्ग (पुरानी-रेजीम छूट को प्रभावित करता है)',
  ageUnder60Label: '60 से कम',
  age60to79Label: '60–79 (सीनियर)',
  age80plusLabel: '80+ (सुपर सीनियर)',
  deductionsSectionLabel: 'पुरानी-रेजीम डिडक्शन (अगर क्लेम नहीं किया तो 0 रहने दें)',
  deductionsHint: 'हर सेक्शन अपनी वैधानिक सीमा तक अपने आप कैप होता है।',
  section80CLabel: 'सेक्शन 80C (अधिकतम ₹1.5L)',
  section80DLabel: 'सेक्शन 80D (हेल्थ इंश्योरेंस)',
  hraExemptionLabel: 'HRA छूट',
  homeLoanInterestLabel: 'होम लोन ब्याज (24b, अधिकतम ₹2L)',
  nps80ccd1bLabel: 'NPS 80CCD(1B) (अधिकतम ₹50k)',
  otherDeductionsLabel: 'अन्य डिडक्शन (80TTA/80TTB आदि)',
  ctaLabel: 'टैक्स रेजीम की तुलना करें',
  disclaimer: 'नतीजे अनुमानित हैं। आपका असली बिल अलग हो सकता है।',
  eitherMessage: 'दोनों रेजीम में आपको बराबर खर्च आता है।',
  savesMessageTemplate: '{regime} रेजीम आपको {amount} बचाती है।',
  newRegimeLabel: 'नई',
  oldRegimeLabel: 'पुरानी',
  taxableIncomeLabel: 'टैक्स योग्य आय',
  rebateLabel: 'रिबेट 87A',
  marginalReliefLabel: 'मार्जिनल राहत',
  totalTaxLabel: 'कुल टैक्स',
  footnote: 'FY 2026-27 (AY 2027-28), 4% सेस और नई-रेजीम मार्जिनल राहत सहित। सरचार्ज (आय > ₹50L) शामिल नहीं है।',
  breakEvenLabel: 'आपका ब्रेक-ईवन (पुरानी-रेजीम डिडक्शन)',
  breakEvenAlreadyTemplate: 'आप अपने ब्रेक-ईवन से {amount} ऊपर पहले से हैं।',
  breakEvenGapTemplate: 'पुरानी रेजीम को जीतने के लिए आपको {amount} और डिडक्शन चाहिए।',
  breakEvenNoneMessage: 'आपकी आय पर कोई भी व्यावहारिक डिडक्शन राशि इसे नहीं बदल सकती — नई रेजीम बिना शर्त जीतती है।',
}

export default function TaxRegimePageHi() {
  return (
    <>
      <PageHero
        hub="financial"
        breadcrumb={[
          { label: 'फाइनेंशियल', href: '/hi/financial' },
          { label: 'नई बनाम पुरानी टैक्स रेजीम', href: `/hi${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📒</span> Financial hub
          </>
        }
        h1="नई बनाम पुरानी टैक्स रेजीम कैलकुलेटर (FY 2026-27)"
        subtitle={
          <>
            FY 2026-27 (AY 2027-28) के लिए <strong>नई</strong> और{' '}
            <strong>पुरानी</strong> रेजीम के तहत अपने इनकम टैक्स की तुलना
            करें, जिसमें नवीनतम स्लैब, स्टैंडर्ड डिडक्शन, Section 87A रिबेट
            और 4% सेस शामिल हैं।
          </>
        }
        stats={[
          { icon: '🎯', big: '₹12.75L', small: 'टैक्स-फ्री (नई रेजीम)', tone: 'hub' },
          { icon: '📊', big: '7 स्लैब', small: 'नई रेजीम', tone: 'hub' },
          { icon: '➕', big: '4%', small: 'हेल्थ और एजुकेशन सेस', tone: 'hub' },
          { icon: '📅', big: 'FY 2026-27', small: 'AY 2027-28', tone: 'hub' },
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
          ₹1,50,000 की पुरानी-रेजीम डिडक्शन के साथ <strong>₹15,00,000</strong>{' '}
          की सैलरी पर, नई रेजीम का टैक्स{' '}
          <strong>{formatINR(example.newRegime.totalTax)}</strong> है बनाम
          पुरानी रेजीम के तहत{' '}
          <strong>{formatINR(example.oldRegime.totalTax)}</strong> —{' '}
          {example.recommended === 'new' ? 'नई' : example.recommended === 'old' ? 'पुरानी' : 'दोनों'}{' '}
          रेजीम <strong>{formatINR(example.saving)}</strong> बचाती है।
        </p>
      </section>

      <section aria-labelledby="calculator" className="mb-10">
        <h2 id="calculator" className="font-display mb-4 text-2xl font-semibold">
          अपने टैक्स की तुलना करें
        </h2>
        <TaxRegimeCalculator texts={taxRegimeTextsHi} />
      </section>

      <section aria-labelledby="slabs" className="mb-10">
        <h2 id="slabs" className="font-display mb-4 text-2xl font-semibold">
          नई रेजीम स्लैब — FY 2026-27
        </h2>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist">
              <tr>
                <th className="px-4 py-2 font-semibold">आय स्लैब</th>
                <th className="px-4 py-2 text-right font-semibold">दर</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {[
                ['₹4,00,000 तक', 'शून्य'],
                ['₹4,00,001 – ₹8,00,000', '5%'],
                ['₹8,00,001 – ₹12,00,000', '10%'],
                ['₹12,00,001 – ₹16,00,000', '15%'],
                ['₹16,00,001 – ₹20,00,000', '20%'],
                ['₹20,00,001 – ₹24,00,000', '25%'],
                ['₹24,00,000 से ऊपर', '30%'],
              ].map(([slab, rate]) => (
                <tr key={slab}>
                  <td className="px-4 py-2">{slab}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <p className="mt-4 text-xs text-ash/40">
          सिर्फ सामान्य मार्गदर्शन के लिए, टैक्स सलाह नहीं। सरचार्ज (आय &gt;
          ₹50L) और मार्जिनल राहत को मॉडल नहीं किया गया है; फाइलिंग के लिए
          किसी पेशेवर से सलाह लें।
        </p>
      </section>

      <FinancialCrossSell current="new-vs-old-tax-regime-calculator" />

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
    </>
  )
}
