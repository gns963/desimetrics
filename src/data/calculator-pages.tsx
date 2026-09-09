import type { ReactNode } from 'react'

/**
 * Per-DISCOM page content. The page template (DiscomCalculatorPage) is shared;
 * everything that makes a page genuinely state-specific — intro, explainer,
 * FAQs, worked-example inputs — lives here, authored per DISCOM. This is
 * deliberately NOT a find-replace of the state name.
 */
export interface DiscomPageConfig {
  slug: string
  discomCode: string
  h1: string
  breadcrumbLabel: string
  metaTitle: string
  metaDescription: string
  /** Units for the worked example (in the DISCOM's own billing period). */
  exampleUnits: number
  /** Whether the worked example should apply the first subsidy scheme. */
  exampleEligible: boolean
  intro: ReactNode
  explainer: { title: string; body: ReactNode }[]
  faqs: { q: string; a: string }[]

  // --- Optional, richer sections. Only authored for states where we have
  // genuine, sourced, DISCOM-specific content — never generic filler, so
  // most of the 36 pages simply won't render these sections yet. ---

  /** DISCOM codes for the live comparison table (e.g. neighbouring states). */
  neighboringDiscoms?: string[]
  /** Specific, real mechanical facts about this tariff people commonly misread. */
  billTraps?: { title: string; body: ReactNode }[]
  /** Short, dated, fact-checked history/structure paragraphs. */
  aboutDiscom?: ReactNode[]
  /** A single direct-answer coverage question, e.g. "Does X supply city Y?" */
  coverageQA?: { q: string; a: ReactNode }
  howToPay?: {
    portalUrl: string
    portalLabel: string
    helpline: string
    steps: string[]
  }
  /** A 2-column "cliff" rule callout (subsidy boundary, duty threshold, etc). */
  thresholdCallout?: {
    title: string
    leftLabel: string
    leftValue: string
    rightLabel: string
    rightValue: string
    note: string
  }

  /**
   * Genuine, hand-authored translations of this DISCOM's own content —
   * NOT a find-replace of the English. Only present for DISCOMs that have
   * actually been translated (see i18n-alternates.ts STATE_LANGUAGE_POLICY
   * for which state/language pairs are justified). Any field a translation
   * omits falls back to the English value — but a genuine translation
   * should cover every field the English entry uses. `breadcrumbLabel` is
   * included here deliberately: once a DISCOM has a translation, its
   * breadcrumb/WebApplication name should be translated too, unlike the
   * still-untranslated majority of DISCOMs (see the comment on that in
   * DiscomCalculatorPage.tsx).
   */
  translations?: Partial<Record<'hi' | 'mr' | 'ta' | 'te' | 'kn' | 'bn' | 'gu' | 'ml', DiscomPageTranslation>>
}

export interface DiscomPageTranslation {
  h1: string
  breadcrumbLabel: string
  metaTitle: string
  metaDescription: string
  intro: ReactNode
  explainer: { title: string; body: ReactNode }[]
  faqs: { q: string; a: string }[]
  billTraps?: { title: string; body: ReactNode }[]
  aboutDiscom?: ReactNode[]
  coverageQA?: { q: string; a: ReactNode }
  howToPay?: { portalLabel: string; helpline: string; steps: string[] }
  thresholdCallout?: {
    title: string
    leftLabel: string
    leftValue: string
    rightLabel: string
    rightValue: string
    note: string
  }
}

export const CALCULATOR_PAGES: DiscomPageConfig[] = [
  // -------------------------------------------------------------- TNEB
  {
    slug: 'tneb-bill-calculator',
    discomCode: 'TNEB',
    h1: 'TNEB Electricity Bill Calculator 2026 — Estimate Your Tamil Nadu (TANGEDCO) Bill',
    breadcrumbLabel: 'TNEB Bill Calculator',
    metaTitle:
      'TNEB Bill Calculator 2026 — TANGEDCO Electricity Bill (Tamil Nadu)',
    metaDescription:
      'Calculate your TNEB (TANGEDCO) electricity bill for Tamil Nadu. Bi-monthly telescopic slabs, 100 free units subsidy, fuel cost adjustment and fixed charges — with a monthly-equivalent figure.',
    exampleUnits: 250,
    exampleEligible: true,
    neighboringDiscoms: ['KSEB', 'BESCOM', 'APSPDCL'],
    intro: (
      <>
        Estimate your TANGEDCO electricity bill for Tamil Nadu. TNEB bills
        domestic consumers <strong>bi-monthly</strong> (once every two months)
        using telescopic slabs, with the first 100 units free for eligible
        consumers. Enter your units below for an itemised estimate plus a
        monthly-equivalent figure.
      </>
    ),
    explainer: [
      {
        title: 'Bi-monthly cycle',
        body: (
          <>
            TANGEDCO reads domestic meters once every two months, so a TNEB bill
            covers roughly 60 days. All slab limits and the free-unit allowance
            apply to that two-month total — the single biggest source of
            confusion when comparing to a monthly bill.
          </>
        ),
      },
      {
        title: 'Free-unit subsidy',
        body: (
          <>
            Eligible domestic consumers receive the first 100 units of each cycle
            free, deducted at the lowest slab rate (₹2.25/unit).
          </>
        ),
      },
      {
        title: 'Fuel cost adjustment (FCA)',
        body: (
          <>
            A ₹0.35/unit surcharge reflects TANGEDCO&apos;s power-purchase costs,
            added on top of the slab energy charge along with a phase-based fixed
            charge.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'How is my TNEB electricity bill calculated?',
        a: 'TANGEDCO bills residential (LT-IA) consumers bi-monthly. Your bill is the sum of telescopic slab-wise energy charges, plus a ₹0.35/unit fuel cost adjustment (FCA) and a phase-based fixed charge, minus the 100-unit free subsidy if you qualify.',
      },
      {
        q: "What is TNEB's current tariff for domestic (LT-IA) connections?",
        a: 'Telescopic slabs of ₹2.25/unit (0–100), ₹3.50/unit (101–200), ₹4.80/unit (201–500) and ₹6.40/unit (501+), plus a fixed charge of ₹100 single-phase or ₹200 three-phase per bi-monthly cycle.',
      },
      {
        q: 'Why is my TNEB bill bi-monthly instead of monthly?',
        a: 'TANGEDCO reads domestic meters once every two months, so a bill covers roughly 60 days rather than 30. To compare against a "monthly" figure, divide the bi-monthly total by two — this calculator does that automatically as the monthly-equivalent.',
      },
      {
        q: 'Do I get free electricity units from TNEB?',
        a: 'Eligible domestic consumers get the first 100 units of each bi-monthly cycle free, valued at the ₹2.25 lowest-slab rate — a flat ₹225 reduction, not a percentage discount. It applies regardless of how many total units you use in the cycle.',
      },
      {
        q: 'What is Fuel Cost Adjustment (FCA) and why is it on my bill?',
        a: 'FCA is a per-unit surcharge, currently ₹0.35/unit, that reflects TANGEDCO’s changing power-purchase cost. It is separate from and added on top of the slab energy charge.',
      },
      {
        q: 'How can I reduce my TNEB electricity bill?',
        a: 'Confirm your 100-unit subsidy eligibility is correctly marked on your account, and keep usage below your next slab threshold where practical — the jump from ₹3.50 to ₹4.80/unit at 200 units is the most common one people cross unintentionally in summer.',
      },
      {
        q: 'Is solar worth it for a typical TNEB household?',
        a: 'Often yes — TNEB’s top domestic slab (₹6.40/unit) is high enough that a rooftop system can offset your most expensive units first. Use our solar ROI calculator, pre-filled for Tamil Nadu tariffs, to see your payback period.',
      },
      {
        q: "What's the difference between TNEB, TANGEDCO and TNPDCL?",
        a: 'TNEB (Tamil Nadu Electricity Board) was the original integrated utility until it was restructured on 1 November 2010 into TNEB Ltd (holding company), TANGEDCO (generation and distribution) and TANTRANSCO (transmission). On 27 June 2024, TANGEDCO’s distribution business was renamed Tamil Nadu Power Distribution Corporation Ltd (TNPDCL) — though “TNEB” and “TANGEDCO” both remain in everyday use for bills.',
      },
      {
        q: 'How do I check or pay my TNEB bill online?',
        a: 'Pay via the official TANGEDCO/TNEB portal at tnebnet.org, or through the TANGEDCO website’s "Pay Online" → "Quick Pay" option. For outages, billing issues or meter problems, call the 24×7 helpline 1912.',
      },
      {
        q: 'How often are TNEB tariff rates updated, and how do you keep this calculator accurate?',
        a: 'TNERC reviews domestic tariffs periodically, with CPI-linked adjustments typically each July. We record the source order URL and a last-verified date on every tariff file — visible at the bottom of this page — and update the data whenever a new order is issued.',
      },
    ],
    billTraps: [
      {
        title: 'The 100-unit "all or nothing" myth',
        body: (
          <>
            Some people assume that using more than 100 units forfeits the
            free-unit subsidy entirely. It doesn&apos;t — the first 100 units
            are deducted at the ₹2.25 rate regardless of your total
            consumption for the cycle, so a 300-unit bill still gets the same
            ₹225 reduction as a 100-unit bill.
          </>
        ),
      },
      {
        title: 'Phase mismatch on the fixed charge',
        body: (
          <>
            TNEB&apos;s fixed charge depends on your connection phase, not your
            sanctioned load: ₹100 for single-phase, ₹200 for three-phase, per
            bi-monthly cycle. If your household has a three-phase connection
            (common for homes with higher-capacity ACs or motors), your fixed
            charge is double what a single-phase neighbour pays.
          </>
        ),
      },
      {
        title: 'The summer slab jump',
        body: (
          <>
            Running an AC through summer often pushes consumption from the
            ₹3.50/unit band into the ₹4.80/unit band. Only the units above 200
            are charged at the higher rate — it&apos;s not retroactive — but
            the marginal jump surprises people comparing a summer bill to a
            winter one.
          </>
        ),
      },
      {
        title: 'Reading-date drift',
        body: (
          <>
            Because billing is bi-monthly, your meter-read date can drift by a
            few days each cycle. Comparing &ldquo;this January&apos;s
            bill&rdquo; to &ldquo;last January&apos;s bill&rdquo; isn&apos;t
            always a clean 60-day-to-60-day comparison — check the actual
            reading dates on both bills before concluding your usage changed.
          </>
        ),
      },
    ],
    aboutDiscom: [
      <>
        Tamil Nadu Electricity Board (TNEB) was formed on 1 July 1957 as a
        single, vertically integrated utility. On 1 November 2010, under the
        Electricity Act 2003, it was restructured into three entities: TNEB
        Ltd (holding company), Tamil Nadu Generation and Distribution
        Corporation Ltd (TANGEDCO) for generation and distribution, and Tamil
        Nadu Transmission Corporation Ltd (TANTRANSCO) for transmission.
      </>,
      <>
        On 27 June 2024, TANGEDCO&apos;s distribution business was renamed
        Tamil Nadu Power Distribution Corporation Ltd (TNPDCL). Both
        &quot;TANGEDCO&quot; and the older &quot;TNEB&quot; name remain in
        everyday use — on bills, signage and customer service — alongside the
        newer TNPDCL name.
      </>,
    ],
    coverageQA: {
      q: 'Does TNEB (TANGEDCO/TNPDCL) supply electricity to Chennai?',
      a: (
        <>
          Yes. Unlike cities such as Mumbai or Delhi, which have multiple
          private distribution licensees, Tamil Nadu has a single distribution
          utility covering the entire state — including Chennai, Coimbatore,
          Madurai, Tiruchirappalli, Tirunelveli, Salem and Vellore. There is no
          separate city-specific electricity board in Tamil Nadu.
        </>
      ),
    },
    howToPay: {
      portalUrl: 'https://www.tnebnet.org/awp/login?locale=en',
      portalLabel: 'tnebnet.org (official TANGEDCO payment portal)',
      helpline: '1912 (24×7) · 044-28521109',
      steps: [
        'Visit the official TANGEDCO/TNEB website and select "Pay Online" under Online Payment Services',
        'Choose "Quick Pay" and enter your Consumer/Service Connection number',
        'Verify the displayed bill amount and pay via UPI, card or net banking',
        'Save the payment receipt/reference number for your records',
      ],
    },
    thresholdCallout: {
      title: 'The 100-unit subsidy line',
      leftLabel: '0–100 units',
      leftValue: 'Free',
      rightLabel: '101+ units',
      rightValue: 'Metered from ₹2.25',
      note: 'Eligible domestic consumers get the first 100 units of every bi-monthly cycle free. Units beyond 100 are billed telescopically starting at the same ₹2.25 rate — crossing 100 units does not cancel the subsidy already applied to the first 100.',
    },
    translations: {
      hi: {
        h1: 'TNEB बिजली बिल कैलकुलेटर 2026 — अपने तमिलनाडु (TANGEDCO) बिल का अनुमान लगाएं',
        breadcrumbLabel: 'TNEB बिल कैलकुलेटर',
        metaTitle: 'TNEB बिल कैलकुलेटर 2026 — TANGEDCO बिजली बिल (तमिलनाडु)',
        metaDescription:
          'तमिलनाडु के लिए अपना TNEB (TANGEDCO) बिजली बिल कैलकुलेट करें। द्वि-मासिक टेलिस्कोपिक स्लैब, 100 मुफ़्त यूनिट सब्सिडी, फ्यूल कॉस्ट एडजस्टमेंट और फिक्स्ड चार्ज — मासिक-समतुल्य आंकड़े के साथ।',
        intro: (
          <>
            तमिलनाडु के लिए अपना TANGEDCO बिजली बिल अनुमानित करें। TNEB
            घरेलू उपभोक्ताओं को <strong>द्वि-मासिक</strong> (हर दो महीने
            में एक बार) टेलिस्कोपिक स्लैब का इस्तेमाल करके बिल करता है,
            पात्र उपभोक्ताओं के लिए पहली 100 यूनिट मुफ़्त। नीचे अपनी
            यूनिट्स डालें और एक आइटमाइज़्ड अनुमान के साथ मासिक-समतुल्य
            आंकड़ा पाएं।
          </>
        ),
        explainer: [
          {
            title: 'द्वि-मासिक साइकल',
            body: (
              <>
                TANGEDCO घरेलू मीटर हर दो महीने में एक बार पढ़ता है,
                इसलिए एक TNEB बिल लगभग 60 दिन कवर करता है। सभी स्लैब
                सीमाएं और मुफ़्त-यूनिट भत्ता उस दो-महीने के कुल पर लागू
                होते हैं — मासिक बिल से तुलना करते समय भ्रम की सबसे बड़ी
                वजह यही है।
              </>
            ),
          },
          {
            title: 'मुफ़्त-यूनिट सब्सिडी',
            body: (
              <>
                पात्र घरेलू उपभोक्ताओं को हर साइकल की पहली 100 यूनिट
                मुफ़्त मिलती हैं, सबसे कम स्लैब दर (₹2.25/यूनिट) पर
                घटाई गई।
              </>
            ),
          },
          {
            title: 'फ्यूल कॉस्ट एडजस्टमेंट (FCA)',
            body: (
              <>
                एक ₹0.35/यूनिट सरचार्ज TANGEDCO की बिजली-खरीद लागत
                दिखाता है, जो स्लैब एनर्जी चार्ज के ऊपर एक फेज-आधारित
                फिक्स्ड चार्ज के साथ जोड़ा जाता है।
              </>
            ),
          },
        ],
        faqs: [
          {
            q: 'मेरा TNEB बिजली बिल कैसे कैलकुलेट होता है?',
            a: 'TANGEDCO रेजिडेंशियल (LT-IA) उपभोक्ताओं को द्वि-मासिक बिल करता है। आपका बिल टेलिस्कोपिक स्लैब-वार एनर्जी चार्ज का योग है, साथ ही ₹0.35/यूनिट फ्यूल कॉस्ट एडजस्टमेंट (FCA) और एक फेज-आधारित फिक्स्ड चार्ज, अगर आप पात्र हैं तो 100-यूनिट मुफ़्त सब्सिडी घटाकर।',
          },
          {
            q: 'घरेलू (LT-IA) कनेक्शन के लिए TNEB की मौजूदा टैरिफ क्या है?',
            a: '₹2.25/यूनिट (0–100), ₹3.50/यूनिट (101–200), ₹4.80/यूनिट (201–500) और ₹6.40/यूनिट (501+) के टेलिस्कोपिक स्लैब, साथ ही प्रति द्वि-मासिक साइकल ₹100 सिंगल-फेज या ₹200 थ्री-फेज का फिक्स्ड चार्ज।',
          },
          {
            q: 'मेरा TNEB बिल मासिक की बजाय द्वि-मासिक क्यों है?',
            a: 'TANGEDCO घरेलू मीटर हर दो महीने में एक बार पढ़ता है, इसलिए एक बिल लगभग 30 की बजाय 60 दिन कवर करता है। "मासिक" आंकड़े से तुलना के लिए, द्वि-मासिक कुल को दो से भाग दें — यह कैलकुलेटर यह अपने आप मासिक-समतुल्य के रूप में करता है।',
          },
          {
            q: 'क्या मुझे TNEB से मुफ़्त बिजली यूनिट मिलती हैं?',
            a: 'पात्र घरेलू उपभोक्ताओं को हर द्वि-मासिक साइकल की पहली 100 यूनिट मुफ़्त मिलती हैं, ₹2.25 सबसे कम-स्लैब दर पर मूल्यांकित — एक फ्लैट ₹225 की कमी, प्रतिशत छूट नहीं। यह लागू होता है चाहे आप साइकल में कुल कितनी भी यूनिट इस्तेमाल करें।',
          },
          {
            q: 'फ्यूल कॉस्ट एडजस्टमेंट (FCA) क्या है और यह मेरे बिल पर क्यों है?',
            a: 'FCA एक प्रति-यूनिट सरचार्ज है, फिलहाल ₹0.35/यूनिट, जो TANGEDCO की बदलती बिजली-खरीद लागत दिखाता है। यह स्लैब एनर्जी चार्ज से अलग और उसके ऊपर जोड़ा जाता है।',
          },
          {
            q: 'मैं अपना TNEB बिजली बिल कैसे कम कर सकता हूं?',
            a: 'पुष्टि करें कि आपकी 100-यूनिट सब्सिडी पात्रता आपके खाते में सही ढंग से दर्ज है, और जहां व्यावहारिक हो अपना इस्तेमाल अगली स्लैब सीमा से नीचे रखें — 200 यूनिट पर ₹3.50 से ₹4.80/यूनिट की छलांग सबसे आम है जिसे लोग गर्मियों में अनजाने में पार करते हैं।',
          },
          {
            q: 'क्या एक सामान्य TNEB घर के लिए सोलर लगाना फायदेमंद है?',
            a: 'अक्सर हां — TNEB की टॉप घरेलू स्लैब (₹6.40/यूनिट) इतनी ऊंची है कि एक रूफटॉप सिस्टम आपकी सबसे महंगी यूनिट्स को पहले ऑफसेट कर सकता है। तमिलनाडु टैरिफ के लिए पहले से भरे हमारे सोलर ROI कैलकुलेटर से अपना पेबैक समय देखें।',
          },
          {
            q: "TNEB, TANGEDCO और TNPDCL में क्या फर्क है?",
            a: 'TNEB (तमिलनाडु इलेक्ट्रिसिटी बोर्ड) मूल एकीकृत उपयोगिता थी जब तक इसे 1 नवंबर 2010 को TNEB लिमिटेड (होल्डिंग कंपनी), TANGEDCO (जनरेशन और डिस्ट्रिब्यूशन) और TANTRANSCO (ट्रांसमिशन) में पुनर्गठित नहीं किया गया। 27 जून 2024 को, TANGEDCO के डिस्ट्रिब्यूशन बिज़नेस का नाम बदलकर तमिलनाडु पावर डिस्ट्रिब्यूशन कॉर्पोरेशन लिमिटेड (TNPDCL) कर दिया गया — हालांकि "TNEB" और "TANGEDCO" दोनों बिलों के लिए आम इस्तेमाल में बने हुए हैं।',
          },
          {
            q: 'मैं अपना TNEB बिल ऑनलाइन कैसे चेक या भुगतान करूं?',
            a: 'आधिकारिक TANGEDCO/TNEB पोर्टल tnebnet.org के ज़रिए भुगतान करें, या TANGEDCO वेबसाइट के "Pay Online" → "Quick Pay" विकल्प से। आउटेज, बिलिंग समस्याओं या मीटर समस्याओं के लिए, 24×7 हेल्पलाइन 1912 पर कॉल करें।',
          },
          {
            q: 'TNEB टैरिफ दरें कितनी बार अपडेट होती हैं, और आप इस कैलकुलेटर को कैसे सटीक रखते हैं?',
            a: 'TNERC समय-समय पर घरेलू टैरिफ की समीक्षा करता है, आम तौर पर हर जुलाई में CPI-लिंक्ड समायोजन के साथ। हम हर टैरिफ फाइल पर स्रोत ऑर्डर URL और एक आखिरी-सत्यापित तारीख दर्ज करते हैं — इस पेज के नीचे दिखाई देती है — और जब भी नया ऑर्डर जारी होता है डेटा अपडेट करते हैं।',
          },
        ],
        billTraps: [
          {
            title: '100-यूनिट "सब कुछ या कुछ नहीं" वाली गलतफहमी',
            body: (
              <>
                कुछ लोग मान लेते हैं कि 100 यूनिट से ज़्यादा इस्तेमाल
                करने से मुफ़्त-यूनिट सब्सिडी पूरी तरह खत्म हो जाती है।
                ऐसा नहीं है — पहली 100 यूनिट ₹2.25 दर पर घटाई जाती हैं
                चाहे साइकल के लिए आपका कुल इस्तेमाल कुछ भी हो, इसलिए
                300-यूनिट का बिल भी 100-यूनिट के बिल जितनी ही ₹225 की
                कमी पाता है।
              </>
            ),
          },
          {
            title: 'फिक्स्ड चार्ज पर फेज़ बेमेल',
            body: (
              <>
                TNEB का फिक्स्ड चार्ज आपके कनेक्शन फेज़ पर निर्भर करता
                है, आपके स्वीकृत लोड पर नहीं: प्रति द्वि-मासिक साइकल
                सिंगल-फेज़ के लिए ₹100, थ्री-फेज़ के लिए ₹200। अगर आपके
                घर में थ्री-फेज़ कनेक्शन है (ज़्यादा क्षमता वाले AC या
                मोटर वाले घरों में आम), तो आपका फिक्स्ड चार्ज
                सिंगल-फेज़ पड़ोसी से दोगुना है।
              </>
            ),
          },
          {
            title: 'गर्मियों की स्लैब छलांग',
            body: (
              <>
                गर्मियों में AC चलाने से अक्सर इस्तेमाल ₹3.50/यूनिट
                बैंड से ₹4.80/यूनिट बैंड में चला जाता है। सिर्फ 200 से
                ऊपर की यूनिट्स ऊंची दर पर चार्ज होती हैं — यह
                पूर्वव्यापी नहीं है — लेकिन मार्जिनल छलांग गर्मी के
                बिल की सर्दी के बिल से तुलना करने वालों को हैरान करती
                है।
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            तमिलनाडु इलेक्ट्रिसिटी बोर्ड (TNEB) 1 जुलाई 1957 को एक
            एकल, वर्टिकली एकीकृत उपयोगिता के रूप में बना था। 1 नवंबर
            2010 को, इलेक्ट्रिसिटी एक्ट 2003 के तहत, इसे तीन संस्थाओं
            में पुनर्गठित किया गया: TNEB लिमिटेड (होल्डिंग कंपनी),
            तमिलनाडु जनरेशन एंड डिस्ट्रिब्यूशन कॉर्पोरेशन लिमिटेड
            (TANGEDCO) जनरेशन और डिस्ट्रिब्यूशन के लिए, और तमिलनाडु
            ट्रांसमिशन कॉर्पोरेशन लिमिटेड (TANTRANSCO) ट्रांसमिशन के
            लिए।
          </>,
          <>
            27 जून 2024 को, TANGEDCO के डिस्ट्रिब्यूशन बिज़नेस का नाम
            बदलकर तमिलनाडु पावर डिस्ट्रिब्यूशन कॉर्पोरेशन लिमिटेड
            (TNPDCL) कर दिया गया। "TANGEDCO" और पुराना "TNEB" नाम दोनों
            — बिलों, साइनेज और कस्टमर सर्विस पर — नए TNPDCL नाम के
            साथ-साथ आम इस्तेमाल में बने हुए हैं।
          </>,
        ],
        coverageQA: {
          q: 'क्या TNEB (TANGEDCO/TNPDCL) चेन्नई को बिजली सप्लाई करता है?',
          a: (
            <>
              हां। मुंबई या दिल्ली जैसे शहरों के विपरीत, जहां कई
              प्राइवेट डिस्ट्रिब्यूशन लाइसेंसी हैं, तमिलनाडु में पूरे
              राज्य को कवर करने वाली एक ही डिस्ट्रिब्यूशन यूटिलिटी है
              — जिसमें चेन्नई, कोयंबटूर, मदुरै, तिरुचिरापल्ली,
              तिरुनेलवेली, सेलम और वेल्लोर शामिल हैं। तमिलनाडु में
              कोई अलग शहर-विशिष्ट बिजली बोर्ड नहीं है।
            </>
          ),
        },
        howToPay: {
          portalLabel: 'tnebnet.org (आधिकारिक TANGEDCO भुगतान पोर्टल)',
          helpline: '1912 (24×7) · 044-28521109',
          steps: [
            'आधिकारिक TANGEDCO/TNEB वेबसाइट पर जाएं और ऑनलाइन पेमेंट सर्विसेज़ के तहत "Pay Online" चुनें',
            '"Quick Pay" चुनें और अपना कंज़्यूमर/सर्विस कनेक्शन नंबर डालें',
            'दिखाई गई बिल राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए भुगतान रसीद/रेफरेंस नंबर सेव करें',
          ],
        },
        thresholdCallout: {
          title: '100-यूनिट सब्सिडी रेखा',
          leftLabel: '0–100 यूनिट',
          leftValue: 'मुफ़्त',
          rightLabel: '101+ यूनिट',
          rightValue: '₹2.25 से मीटर्ड',
          note: 'पात्र घरेलू उपभोक्ताओं को हर द्वि-मासिक साइकल की पहली 100 यूनिट मुफ़्त मिलती हैं। 100 से ऊपर की यूनिट्स उसी ₹2.25 दर से शुरू होकर टेलिस्कोपिक रूप से बिल होती हैं — 100 यूनिट पार करने से पहली 100 पर पहले से लागू सब्सिडी रद्द नहीं होती।',
        },
      },
      ta: {
        h1: 'TNEB மின்சார பில் கால்குலேட்டர் 2026 — உங்கள் தமிழ்நாடு (TANGEDCO) பில்லை மதிப்பிடுங்கள்',
        breadcrumbLabel: 'TNEB பில் கால்குலேட்டர்',
        metaTitle: 'TNEB பில் கால்குலேட்டர் 2026 — TANGEDCO மின்சார பில் (தமிழ்நாடு)',
        metaDescription:
          'தமிழ்நாட்டிற்கான உங்கள் TNEB (TANGEDCO) மின்சார பில்லைக் கணக்கிடுங்கள். இரண்டு மாத டெலஸ்கோபிக் ஸ்லாப்கள், 100 இலவச யூனிட் மானியம், எரிபொருள் செலவு சரிசெய்தல் மற்றும் நிலையான கட்டணங்கள் — மாதாந்திர-சமமான எண்ணுடன்.',
        intro: (
          <>
            தமிழ்நாட்டிற்கான உங்கள் TANGEDCO மின்சார பில்லை
            மதிப்பிடுங்கள். TNEB வீட்டுப் பயனர்களுக்கு{' '}
            <strong>இரண்டு மாதத்திற்கு ஒருமுறை</strong> டெலஸ்கோபிக்
            ஸ்லாப்களைப் பயன்படுத்தி பில் செய்கிறது, தகுதியுள்ள
            பயனர்களுக்கு முதல் 100 யூனிட்கள் இலவசம். கீழே உங்கள்
            யூனிட்களை உள்ளிட்டு ஒரு விரிவான மதிப்பீட்டையும்
            மாதாந்திர-சமமான எண்ணையும் பெறுங்கள்.
          </>
        ),
        explainer: [
          {
            title: 'இரண்டு மாத சுழற்சி',
            body: (
              <>
                TANGEDCO வீட்டு மீட்டர்களை இரண்டு மாதங்களுக்கு
                ஒருமுறை படிக்கிறது, எனவே ஒரு TNEB பில் சுமார் 60
                நாட்களை உள்ளடக்கும். அனைத்து ஸ்லாப் வரம்புகளும்
                இலவச-யூனிட் அனுமதியும் அந்த இரண்டு மாத மொத்தத்திற்குப்
                பொருந்தும் — மாதாந்திர பில்லுடன் ஒப்பிடும்போது இது
                தான் மிகப்பெரிய குழப்பத்தின் மூலம்.
              </>
            ),
          },
          {
            title: 'இலவச-யூனிட் மானியம்',
            body: (
              <>
                தகுதியுள்ள வீட்டுப் பயனர்கள் ஒவ்வொரு சுழற்சியின்
                முதல் 100 யூனிட்களையும் இலவசமாகப் பெறுகிறார்கள்,
                மிகக் குறைந்த ஸ்லாப் விகிதத்தில் (₹2.25/யூனிட்)
                கழிக்கப்படுகிறது.
              </>
            ),
          },
          {
            title: 'எரிபொருள் செலவு சரிசெய்தல் (FCA)',
            body: (
              <>
                ஒரு ₹0.35/யூனிட் கூடுதல் கட்டணம் TANGEDCO-வின் மின்
                வாங்கும் செலவை பிரதிபலிக்கிறது, இது ஸ்லாப் எரிசக்தி
                கட்டணத்தின் மேல், ஒரு கட்ட-அடிப்படையிலான நிலையான
                கட்டணத்துடன் சேர்க்கப்படுகிறது.
              </>
            ),
          },
        ],
        faqs: [
          {
            q: 'எனது TNEB மின்சார பில் எப்படி கணக்கிடப்படுகிறது?',
            a: 'TANGEDCO குடியிருப்பு (LT-IA) பயனர்களை இரண்டு மாதத்திற்கு ஒருமுறை பில் செய்கிறது. உங்கள் பில் என்பது டெலஸ்கோபிக் ஸ்லாப்-வாரியான எரிசக்தி கட்டணங்களின் கூட்டுத்தொகை, மேலும் ₹0.35/யூனிட் எரிபொருள் செலவு சரிசெய்தல் (FCA) மற்றும் ஒரு கட்ட-அடிப்படையிலான நிலையான கட்டணம், நீங்கள் தகுதியுடையவராக இருந்தால் 100-யூனிட் இலவச மானியத்தைக் கழித்து.',
          },
          {
            q: 'வீட்டுப் பயன்பாட்டு (LT-IA) இணைப்புகளுக்கான TNEB-யின் தற்போதைய கட்டணம் என்ன?',
            a: '₹2.25/யூனிட் (0–100), ₹3.50/யூனிட் (101–200), ₹4.80/யூனிட் (201–500) மற்றும் ₹6.40/யூனிட் (501+) டெலஸ்கோபிக் ஸ்லாப்கள், மேலும் ஒரு இரண்டு-மாத சுழற்சிக்கு ₹100 சிங்கிள்-கட்டம் அல்லது ₹200 த்ரீ-கட்டம் நிலையான கட்டணம்.',
          },
          {
            q: 'எனது TNEB பில் மாதாந்திரமாக இல்லாமல் ஏன் இரண்டு மாதத்திற்கு ஒருமுறை உள்ளது?',
            a: 'TANGEDCO வீட்டு மீட்டர்களை இரண்டு மாதங்களுக்கு ஒருமுறை படிக்கிறது, எனவே ஒரு பில் 30 நாட்களுக்குப் பதிலாக சுமார் 60 நாட்களை உள்ளடக்கும். ஒரு "மாதாந்திர" எண்ணுடன் ஒப்பிட, இரண்டு-மாத மொத்தத்தை இரண்டால் வகுக்கவும் — இந்த கால்குலேட்டர் அதை மாதாந்திர-சமமானதாக தானாகவே செய்கிறது.',
          },
          {
            q: 'TNEB-யிடமிருந்து எனக்கு இலவச மின்சார யூனிட்கள் கிடைக்குமா?',
            a: 'தகுதியுள்ள வீட்டுப் பயனர்கள் ஒவ்வொரு இரண்டு-மாத சுழற்சியின் முதல் 100 யூனிட்களையும் இலவசமாகப் பெறுகிறார்கள், ₹2.25 மிகக் குறைந்த-ஸ்லாப் விகிதத்தில் மதிப்பிடப்படுகிறது — ஒரு நிலையான ₹225 குறைப்பு, சதவீத தள்ளுபடி அல்ல. சுழற்சியில் நீங்கள் மொத்தம் எத்தனை யூனிட்கள் பயன்படுத்தினாலும் இது பொருந்தும்.',
          },
          {
            q: 'எரிபொருள் செலவு சரிசெய்தல் (FCA) என்றால் என்ன, அது ஏன் எனது பில்லில் உள்ளது?',
            a: 'FCA என்பது ஒரு யூனிட்-வாரியான கூடுதல் கட்டணம், தற்போது ₹0.35/யூனிட், இது TANGEDCO-வின் மாறிவரும் மின் வாங்கும் செலவைப் பிரதிபலிக்கிறது. இது ஸ்லாப் எரிசக்தி கட்டணத்திலிருந்து தனியாக அதன் மேல் சேர்க்கப்படுகிறது.',
          },
          {
            q: 'நான் எனது TNEB மின்சார பில்லை எப்படி குறைக்கலாம்?',
            a: 'உங்கள் 100-யூனிட் மானிய தகுதி உங்கள் கணக்கில் சரியாக குறிக்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும், மேலும் நடைமுறையில் இருக்கும் இடத்தில் உங்கள் பயன்பாட்டை அடுத்த ஸ்லாப் வரம்புக்குக் கீழே வையுங்கள் — 200 யூனிட்டில் ₹3.50 இலிருந்து ₹4.80/யூனிட்டுக்கு தாவுவது கோடையில் மக்கள் அறியாமல் கடக்கும் மிகவும் பொதுவான ஒன்று.',
          },
          {
            q: 'ஒரு பொதுவான TNEB வீட்டிற்கு சோலார் மதிப்புள்ளதா?',
            a: 'பெரும்பாலும் ஆம் — TNEB-யின் அதிகபட்ச வீட்டு ஸ்லாப் (₹6.40/யூனிட்) போதுமான அளவு அதிகமாக உள்ளது, ஒரு கூரை அமைப்பு உங்கள் அதிக விலையுள்ள யூனிட்களை முதலில் ஈடுசெய்ய முடியும். தமிழ்நாடு கட்டணங்களுக்காக முன்பே நிரப்பப்பட்ட எங்கள் சோலார் ROI கால்குலேட்டரைப் பயன்படுத்தி உங்கள் பேபேக் காலத்தைப் பாருங்கள்.',
          },
          {
            q: 'TNEB, TANGEDCO மற்றும் TNPDCL இடையே என்ன வித்தியாசம்?',
            a: 'TNEB (தமிழ்நாடு மின்சார வாரியம்) 1 நவம்பர் 2010 அன்று TNEB லிமிடெட் (ஹோல்டிங் நிறுவனம்), TANGEDCO (உற்பத்தி மற்றும் விநியோகம்) மற்றும் TANTRANSCO (பரிமாற்றம்) என மறுசீரமைக்கப்படும் வரை அசல் ஒருங்கிணைந்த பயன்பாடாக இருந்தது. 27 ஜூன் 2024 அன்று, TANGEDCO-வின் விநியோக வணிகம் தமிழ்நாடு மின் விநியோக கழகம் லிமிடெட் (TNPDCL) என மறுபெயரிடப்பட்டது — இருப்பினும் "TNEB" மற்றும் "TANGEDCO" இரண்டும் பில்களில் அன்றாட பயன்பாட்டில் உள்ளன.',
          },
          {
            q: 'நான் எனது TNEB பில்லை ஆன்லைனில் எப்படி சரிபார்த்து செலுத்துவது?',
            a: 'அதிகாரப்பூர்வ TANGEDCO/TNEB போர்டல் tnebnet.org மூலம் செலுத்துங்கள், அல்லது TANGEDCO வலைத்தளத்தின் "Pay Online" → "Quick Pay" விருப்பத்தின் மூலம். மின்தடை, பில்லிங் சிக்கல்கள் அல்லது மீட்டர் சிக்கல்களுக்கு, 24×7 ஹெல்ப்லைன் 1912-ஐ அழைக்கவும்.',
          },
          {
            q: 'TNEB கட்டண விகிதங்கள் எவ்வளவு அடிக்கடி புதுப்பிக்கப்படுகின்றன, மேலும் இந்த கால்குலேட்டரை எப்படி துல்லியமாக வைத்திருக்கிறீர்கள்?',
            a: 'TNERC பொதுவாக ஒவ்வொரு ஜூலையிலும் CPI-இணைந்த சரிசெய்தல்களுடன் வீட்டு கட்டணங்களை அவ்வப்போது மறுஆய்வு செய்கிறது. ஒவ்வொரு கட்டண கோப்பிலும் மூல ஆணை URL மற்றும் கடைசியாக சரிபார்க்கப்பட்ட தேதியை நாங்கள் பதிவு செய்கிறோம் — இந்தப் பக்கத்தின் கீழே காணப்படும் — மேலும் புதிய ஆணை வெளியிடப்படும் போதெல்லாம் தரவைப் புதுப்பிக்கிறோம்.',
          },
        ],
        billTraps: [
          {
            title: '100-யூனிட் "எல்லாம் அல்லது ஒன்றுமில்லை" தவறான எண்ணம்',
            body: (
              <>
                100 யூனிட்களுக்கு மேல் பயன்படுத்துவது இலவச-யூனிட்
                மானியத்தை முழுவதுமாக இழக்கச் செய்யும் என்று சிலர்
                நினைக்கிறார்கள். அது தவறு — சுழற்சிக்கான உங்கள் மொத்த
                பயன்பாடு எதுவாக இருந்தாலும் முதல் 100 யூனிட்கள் ₹2.25
                விகிதத்தில் கழிக்கப்படும், எனவே 300-யூனிட் பில் கூட
                100-யூனிட் பில்லைப் போலவே அதே ₹225 குறைப்பைப் பெறும்.
              </>
            ),
          },
          {
            title: 'நிலையான கட்டணத்தில் கட்ட முரண்பாடு',
            body: (
              <>
                TNEB-யின் நிலையான கட்டணம் உங்கள் அங்கீகரிக்கப்பட்ட
                லோடைச் சார்ந்தது அல்ல, உங்கள் இணைப்பு கட்டத்தைச்
                சார்ந்தது: ஒரு இரண்டு-மாத சுழற்சிக்கு
                சிங்கிள்-கட்டத்திற்கு ₹100, த்ரீ-கட்டத்திற்கு ₹200.
                உங்கள் வீட்டில் த்ரீ-கட்ட இணைப்பு இருந்தால் (அதிக
                திறன் கொண்ட AC அல்லது மோட்டார்கள் உள்ள வீடுகளில்
                பொதுவானது), உங்கள் நிலையான கட்டணம் சிங்கிள்-கட்ட
                அண்டை வீட்டாரை விட இரட்டிப்பு.
              </>
            ),
          },
          {
            title: 'கோடைகால ஸ்லாப் தாவல்',
            body: (
              <>
                கோடையில் AC இயக்குவது பெரும்பாலும் பயன்பாட்டை
                ₹3.50/யூனிட் பட்டையிலிருந்து ₹4.80/யூனிட் பட்டைக்கு
                தள்ளும். 200-க்கு மேல் உள்ள யூனிட்கள் மட்டுமே அதிக
                விகிதத்தில் வசூலிக்கப்படும் — இது பின்னோக்கி
                பொருந்தாது — ஆனால் கோடைகால பில்லை குளிர்கால
                பில்லுடன் ஒப்பிடுபவர்களுக்கு இந்த குறை தாவல்
                ஆச்சரியமளிக்கிறது.
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            தமிழ்நாடு மின்சார வாரியம் (TNEB) 1 ஜூலை 1957 அன்று ஒரு
            ஒற்றை, செங்குத்தாக ஒருங்கிணைந்த பயன்பாடாக
            உருவாக்கப்பட்டது. 1 நவம்பர் 2010 அன்று, மின்சாரச் சட்டம்
            2003-ன் கீழ், இது மூன்று நிறுவனங்களாக மறுசீரமைக்கப்பட்டது:
            TNEB லிமிடெட் (ஹோல்டிங் நிறுவனம்), தமிழ்நாடு உற்பத்தி
            மற்றும் விநியோக கழகம் லிமிடெட் (TANGEDCO) உற்பத்தி மற்றும்
            விநியோகத்திற்கு, மற்றும் தமிழ்நாடு பரிமாற்ற கழகம் லிமிடெட்
            (TANTRANSCO) பரிமாற்றத்திற்கு.
          </>,
          <>
            27 ஜூன் 2024 அன்று, TANGEDCO-வின் விநியோக வணிகம்
            தமிழ்நாடு மின் விநியோக கழகம் லிமிடெட் (TNPDCL) என
            மறுபெயரிடப்பட்டது. "TANGEDCO" மற்றும் பழைய "TNEB" பெயர்
            இரண்டும் — பில்கள், அடையாள பலகைகள் மற்றும் வாடிக்கையாளர்
            சேவையில் — புதிய TNPDCL பெயருடன் அன்றாட பயன்பாட்டில்
            உள்ளன.
          </>,
        ],
        coverageQA: {
          q: 'TNEB (TANGEDCO/TNPDCL) சென்னைக்கு மின்சாரம் வழங்குகிறதா?',
          a: (
            <>
              ஆம். மும்பை அல்லது டெல்லி போன்ற பல தனியார் விநியோக
              உரிமம் பெற்றவர்களைக் கொண்ட நகரங்களைப் போலல்லாமல்,
              தமிழ்நாட்டில் முழு மாநிலத்தையும் உள்ளடக்கிய ஒரே ஒரு
              விநியோக பயன்பாடு உள்ளது — சென்னை, கோயம்புத்தூர், மதுரை,
              திருச்சிராப்பள்ளி, திருநெல்வேலி, சேலம் மற்றும் வேலூர்
              உட்பட. தமிழ்நாட்டில் தனி நகர-குறிப்பிட்ட மின்சார வாரியம்
              இல்லை.
            </>
          ),
        },
        howToPay: {
          portalLabel: 'tnebnet.org (அதிகாரப்பூர்வ TANGEDCO பணம் செலுத்தும் போர்டல்)',
          helpline: '1912 (24×7) · 044-28521109',
          steps: [
            'அதிகாரப்பூர்வ TANGEDCO/TNEB வலைத்தளத்திற்குச் சென்று, Online Payment Services-ன் கீழ் "Pay Online" ஐத் தேர்ந்தெடுக்கவும்',
            '"Quick Pay" ஐத் தேர்ந்தெடுத்து உங்கள் Consumer/Service Connection எண்ணை உள்ளிடவும்',
            'காட்டப்படும் பில் தொகையை சரிபார்த்து UPI, கார்டு அல்லது நெட் பேங்கிங் மூலம் செலுத்தவும்',
            'உங்கள் பதிவுகளுக்காக பணம் செலுத்திய ரசீது/குறிப்பு எண்ணைச் சேமிக்கவும்',
          ],
        },
        thresholdCallout: {
          title: '100-யூனிட் மானிய கோடு',
          leftLabel: '0–100 யூனிட்கள்',
          leftValue: 'இலவசம்',
          rightLabel: '101+ யூனிட்கள்',
          rightValue: '₹2.25 முதல் மீட்டர் செய்யப்படும்',
          note: 'தகுதியுள்ள வீட்டுப் பயனர்கள் ஒவ்வொரு இரண்டு-மாத சுழற்சியின் முதல் 100 யூனிட்களையும் இலவசமாகப் பெறுகிறார்கள். 100-க்கு மேல் உள்ள யூனிட்கள் அதே ₹2.25 விகிதத்தில் தொடங்கி டெலஸ்கோபிக் முறையில் பில் செய்யப்படும் — 100 யூனிட்களைத் தாண்டுவது முதல் 100-க்கு ஏற்கனவே பொருந்திய மானியத்தை ரத்து செய்யாது.',
        },
      },
    },
  },

  // -------------------------------------------------------------- MSEDCL
  {
    slug: 'msedcl-bill-calculator',
    discomCode: 'MSEDCL',
    h1: 'MSEDCL Bill Calculator (Mahavitaran, Maharashtra)',
    breadcrumbLabel: 'MSEDCL Bill Calculator',
    metaTitle:
      'MSEDCL Bill Calculator 2026 — Mahavitaran Electricity Bill (Maharashtra)',
    metaDescription:
      'Estimate your MSEDCL (Mahavitaran) electricity bill for Maharashtra. Monthly telescopic slabs, 16% electricity duty and fixed charge — with clear caveats on wheeling charge and FAC.',
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['MGVCL', 'BESCOM', 'MPCZ'],
    intro: (
      <>
        Estimate your MSEDCL (Mahavitaran) electricity bill for Maharashtra.
        Unlike Tamil Nadu, MSEDCL bills domestic consumers{' '}
        <strong>every month</strong>, and Maharashtra layers one of India&apos;s
        highest <strong>electricity duties (16%)</strong> on top of the energy,
        wheeling and fixed charges.
      </>
    ),
    explainer: [
      {
        title: 'Monthly billing, four telescopic slabs',
        body: (
          <>
            MSEDCL reads meters monthly. Consumption is split across four bands —
            ₹3.25 for the first 100 units, then ₹6.14, ₹8.45 and ₹9.56 — with
            each band charged at its own rate.
          </>
        ),
      },
      {
        title: '16% electricity duty — a Maharashtra quirk',
        body: (
          <>
            Maharashtra charges a 16% electricity duty on the sum of energy,
            wheeling and fixed charges — far higher than the 0–5% most states
            levy on domestic supply. It is often the second-largest line on a
            Mahavitaran bill after energy charges.
          </>
        ),
      },
      {
        title: 'What this estimate leaves out',
        body: (
          <>
            MSEDCL bills also carry a separate per-unit <strong>wheeling
            charge</strong> and a monthly <strong>Fuel Adjustment Charge
            (FAC)</strong> that this calculator does not yet model, so the real
            bill runs a little higher than the estimate shown here.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'Does MSEDCL bill monthly or bi-monthly?',
        a: 'MSEDCL (Mahavitaran) bills domestic consumers every month, unlike Tamil Nadu’s TNEB which bills every two months.',
      },
      {
        q: 'Why is electricity duty so high in Maharashtra?',
        a: 'The Maharashtra government levies a 16% electricity duty on domestic supply — applied on energy, wheeling and fixed charges combined — which is among the highest in India.',
      },
      {
        q: 'Does this include the wheeling charge and FAC?',
        a: 'Not yet. The per-unit wheeling charge and the monthly Fuel Adjustment Charge are not modelled, so your actual Mahavitaran bill will be somewhat higher than this estimate.',
      },
      {
        q: 'Is there a free-units subsidy like Tamil Nadu?',
        a: 'No standing free-units scheme applies to general MSEDCL domestic consumers. A separate relief of up to 10% for households under 100 units/month is being phased in from FY 2026.',
      },
      {
        q: 'Why does my MSEDCL bill jump so much between 100 and 101 units?',
        a: 'MSEDCL’s slab rate nearly doubles at that boundary — ₹3.25/unit up to 100 units, then ₹6.14/unit for 101–300. Only the units above 100 are charged at the higher rate (it’s telescopic, not retroactive), but the jump is one of the steepest of any Indian DISCOM.',
      },
      {
        q: 'Does MSEDCL supply electricity to Mumbai?',
        a: 'Mostly no. Most of Mumbai city is served by BEST, Tata Power and Adani Electricity Mumbai, not MSEDCL. MSEDCL does supply some Mumbai suburbs, such as Mulund and Bhandup, and the rest of Maharashtra state.',
      },
      {
        q: 'How do I check or pay my MSEDCL bill online?',
        a: 'Pay via the official MSEDCL Web Self Service portal at wss.mahadiscom.in, or the MahaVitaran app. For queries, call the 24×7 toll-free helpline 1912 or 1800-233-3435.',
      },
      {
        q: 'What is MSEDCL/Mahavitaran, and how is it different from MSEB?',
        a: 'The Maharashtra State Electricity Board (MSEB) was unbundled on 6 June 2005, under the Electricity Act 2003, into four companies: MSEB Holding Co., Mahagenco (generation), Mahatransco (transmission) and Mahavitaran/MSEDCL (distribution) — the entity that bills domestic consumers today.',
      },
    ],
    billTraps: [
      {
        title: 'The 100-unit slab cliff',
        body: (
          <>
            Crossing from 100 to 101 units doesn&apos;t just add one unit&apos;s
            cost — every unit from 101 onward is billed at ₹6.14 instead of
            ₹3.25, nearly double. It&apos;s telescopic (the first 100 units
            stay at ₹3.25 regardless), but the marginal jump is steeper than
            most states&apos;.
          </>
        ),
      },
      {
        title: "16% duty — one of India's highest",
        body: (
          <>
            Maharashtra&apos;s 16% electricity duty applies on top of energy,
            wheeling and fixed charges combined — well above the 0–5% most
            states charge. It&apos;s often the second-largest line on the bill
            after the energy charge itself.
          </>
        ),
      },
      {
        title: 'Monthly, not bi-monthly',
        body: (
          <>
            If you&apos;re used to a bi-monthly cycle (as in Tamil Nadu or
            Kerala), note MSEDCL reads meters and bills every month — the
            units you enter should be one month&apos;s consumption, not two.
          </>
        ),
      },
      {
        title: 'Wheeling charge and FAC push the real bill higher',
        body: (
          <>
            This calculator doesn&apos;t yet model MSEDCL&apos;s separate
            per-unit wheeling charge or its monthly Fuel Adjustment Charge
            (FAC). Your actual Mahavitaran bill will run somewhat higher than
            the estimate shown here.
          </>
        ),
      },
    ],
    aboutDiscom: [
      <>
        The Maharashtra State Electricity Board (MSEB) was unbundled on 6 June
        2005, under the Electricity Act 2003, into four separate companies:
        MSEB Holding Company, Maharashtra State Power Generation Co.
        (Mahagenco), Maharashtra State Electricity Transmission Co.
        (Mahatransco), and Maharashtra State Electricity Distribution Co. Ltd
        (MSEDCL) — commonly called Mahavitaran or Mahadiscom — which handles
        billing and distribution.
      </>,
      <>
        MSEDCL distributes power across almost all of Maharashtra, but not
        most of Mumbai city itself: BEST, Tata Power and Adani Electricity
        Mumbai hold the distribution licences there, while MSEDCL covers some
        Mumbai suburbs (such as Mulund and Bhandup) and the rest of the state.
      </>,
    ],
    coverageQA: {
      q: 'Does MSEDCL supply electricity to Mumbai?',
      a: (
        <>
          Not for most of the city. Mumbai proper is served by three other
          licensees — BEST, Tata Power and Adani Electricity Mumbai — while
          MSEDCL covers the rest of Maharashtra plus a few Mumbai suburbs like
          Mulund and Bhandup. If your bill doesn&apos;t say MSEDCL or
          Mahavitaran, check which of the three Mumbai licensees you&apos;re
          actually on.
        </>
      ),
    },
    howToPay: {
      portalUrl: 'https://wss.mahadiscom.in/wss/wss_view_pay_bill.aspx',
      portalLabel: 'wss.mahadiscom.in (MSEDCL Web Self Service)',
      helpline: '1912 / 1800-233-3435 (24×7)',
      steps: [
        'Visit the MSEDCL Web Self Service portal or open the MahaVitaran app',
        'Enter your Consumer Number to fetch your current bill',
        'Verify the amount and pay via UPI, card or net banking',
        'Download the receipt for your records',
      ],
    },
    thresholdCallout: {
      title: 'The 100-unit rate cliff',
      leftLabel: '0–100 units',
      leftValue: '₹3.25/unit',
      rightLabel: '101+ units',
      rightValue: '₹6.14/unit',
      note: 'Only the units above 100 are billed at the higher rate — the jump is telescopic, not retroactive — but at nearly 2×, it is one of the steepest single-slab jumps of any major Indian DISCOM.',
    },
    translations: {
      hi: {
        h1: 'MSEDCL बिल कैलकुलेटर (महावितरण, महाराष्ट्र)',
        breadcrumbLabel: 'MSEDCL बिल कैलकुलेटर',
        metaTitle: 'MSEDCL बिल कैलकुलेटर 2026 — महावितरण बिजली बिल (महाराष्ट्र)',
        metaDescription:
          'महाराष्ट्र के लिए अपना MSEDCL (महावितरण) बिजली बिल अनुमानित करें। मासिक टेलिस्कोपिक स्लैब, 16% बिजली शुल्क और फिक्स्ड चार्ज — व्हीलिंग चार्ज और FAC पर साफ चेतावनी के साथ।',
        intro: (
          <>
            महाराष्ट्र के लिए अपना MSEDCL (महावितरण) बिजली बिल
            अनुमानित करें। तमिलनाडु के उलट, MSEDCL घरेलू उपभोक्ताओं
            को <strong>हर महीने</strong> बिल करता है, और महाराष्ट्र
            एनर्जी, व्हीलिंग और फिक्स्ड चार्ज के ऊपर भारत की सबसे
            ऊंची <strong>बिजली शुल्क (16%)</strong> में से एक लगाता
            है।
          </>
        ),
        explainer: [
          {
            title: 'मासिक बिलिंग, चार टेलिस्कोपिक स्लैब',
            body: (
              <>
                MSEDCL मीटर मासिक पढ़ता है। इस्तेमाल चार बैंड में
                बांटा जाता है — पहली 100 यूनिट के लिए ₹3.25, फिर
                ₹6.14, ₹8.45 और ₹9.56 — हर बैंड अपनी दर पर चार्ज
                होता है।
              </>
            ),
          },
          {
            title: '16% बिजली शुल्क — महाराष्ट्र की एक खासियत',
            body: (
              <>
                महाराष्ट्र एनर्जी, व्हीलिंग और फिक्स्ड चार्ज के योग
                पर 16% बिजली शुल्क लगाता है — ज़्यादातर राज्यों द्वारा
                घरेलू सप्लाई पर लगाए जाने वाले 0–5% से कहीं ज़्यादा।
                यह अक्सर महावितरण बिल पर एनर्जी चार्ज के बाद दूसरी
                सबसे बड़ी लाइन होती है।
              </>
            ),
          },
          {
            title: 'यह अनुमान क्या छोड़ता है',
            body: (
              <>
                MSEDCL बिल में एक अलग प्रति-यूनिट{' '}
                <strong>व्हीलिंग चार्ज</strong> और एक मासिक{' '}
                <strong>फ्यूल एडजस्टमेंट चार्ज (FAC)</strong> भी होता
                है जिसे यह कैलकुलेटर अभी मॉडल नहीं करता, इसलिए असली
                बिल यहां दिखाए गए अनुमान से थोड़ा ज़्यादा आता है।
              </>
            ),
          },
        ],
        faqs: [
          {
            q: 'क्या MSEDCL मासिक या द्वि-मासिक बिल करता है?',
            a: 'MSEDCL (महावितरण) घरेलू उपभोक्ताओं को हर महीने बिल करता है, तमिलनाडु के TNEB के उलट जो हर दो महीने में बिल करता है।',
          },
          {
            q: 'महाराष्ट्र में बिजली शुल्क इतना ऊंचा क्यों है?',
            a: 'महाराष्ट्र सरकार घरेलू सप्लाई पर 16% बिजली शुल्क लगाती है — एनर्जी, व्हीलिंग और फिक्स्ड चार्ज को मिलाकर लागू — जो भारत में सबसे ऊंचे में से एक है।',
          },
          {
            q: 'क्या इसमें व्हीलिंग चार्ज और FAC शामिल है?',
            a: 'अभी नहीं। प्रति-यूनिट व्हीलिंग चार्ज और मासिक फ्यूल एडजस्टमेंट चार्ज मॉडल नहीं किए गए हैं, इसलिए आपका असली महावितरण बिल इस अनुमान से थोड़ा ज़्यादा होगा।',
          },
          {
            q: 'क्या तमिलनाडु जैसी मुफ़्त-यूनिट सब्सिडी है?',
            a: 'सामान्य MSEDCL घरेलू उपभोक्ताओं के लिए कोई स्थायी मुफ़्त-यूनिट योजना लागू नहीं है। FY 2026 से 100 यूनिट/महीने से कम वाले घरों के लिए 10% तक की एक अलग राहत चरणबद्ध तरीके से लागू की जा रही है।',
          },
          {
            q: 'मेरा MSEDCL बिल 100 और 101 यूनिट के बीच इतना क्यों बढ़ जाता है?',
            a: 'MSEDCL की स्लैब दर उस सीमा पर लगभग दोगुनी हो जाती है — 100 यूनिट तक ₹3.25/यूनिट, फिर 101–300 के लिए ₹6.14/यूनिट। सिर्फ 100 से ऊपर की यूनिट्स ऊंची दर पर चार्ज होती हैं (यह टेलिस्कोपिक है, पूर्वव्यापी नहीं), लेकिन यह छलांग किसी भी भारतीय डिस्कॉम की सबसे तीखी छलांगों में से एक है।',
          },
          {
            q: 'क्या MSEDCL मुंबई को बिजली सप्लाई करता है?',
            a: 'ज़्यादातर नहीं। मुंबई शहर का ज़्यादातर हिस्सा BEST, टाटा पावर और अदानी इलेक्ट्रिसिटी मुंबई द्वारा सर्व किया जाता है, MSEDCL द्वारा नहीं। MSEDCL मुंबई के कुछ उपनगरों, जैसे मुलुंड और भांडुप, और बाकी महाराष्ट्र राज्य को सप्लाई करता है।',
          },
          {
            q: 'मैं अपना MSEDCL बिल ऑनलाइन कैसे चेक या भुगतान करूं?',
            a: 'आधिकारिक MSEDCL वेब सेल्फ सर्विस पोर्टल wss.mahadiscom.in के ज़रिए भुगतान करें, या Mahavitaran ऐप से। पूछताछ के लिए, 24×7 टोल-फ्री हेल्पलाइन 1912 या 1800-233-3435 पर कॉल करें।',
          },
          {
            q: 'MSEDCL/महावितरण क्या है, और यह MSEB से कैसे अलग है?',
            a: 'महाराष्ट्र स्टेट इलेक्ट्रिसिटी बोर्ड (MSEB) को इलेक्ट्रिसिटी एक्ट 2003 के तहत 6 जून 2005 को चार कंपनियों में विभाजित किया गया: MSEB होल्डिंग कं., महाजेनको (जनरेशन), महाट्रांसको (ट्रांसमिशन) और महावितरण/MSEDCL (डिस्ट्रिब्यूशन) — वह संस्था जो आज घरेलू उपभोक्ताओं को बिल करती है।',
          },
        ],
        billTraps: [
          {
            title: '100-यूनिट स्लैब क्लिफ',
            body: (
              <>
                100 से 101 यूनिट पार करना सिर्फ एक यूनिट की लागत नहीं
                जोड़ता — 101 से आगे की हर यूनिट ₹3.25 की बजाय ₹6.14
                पर बिल होती है, लगभग दोगुनी। यह टेलिस्कोपिक है (पहली
                100 यूनिट हमेशा ₹3.25 पर रहती हैं), लेकिन मार्जिनल
                छलांग ज़्यादातर राज्यों से ज़्यादा तीखी है।
              </>
            ),
          },
          {
            title: "16% शुल्क — भारत में सबसे ऊंचे में से एक",
            body: (
              <>
                महाराष्ट्र का 16% बिजली शुल्क एनर्जी, व्हीलिंग और
                फिक्स्ड चार्ज को मिलाकर लगाया जाता है — ज़्यादातर
                राज्यों के 0–5% से काफी ऊपर। यह अक्सर एनर्जी चार्ज के
                बाद बिल पर दूसरी सबसे बड़ी लाइन होती है।
              </>
            ),
          },
          {
            title: 'मासिक, द्वि-मासिक नहीं',
            body: (
              <>
                अगर आप द्वि-मासिक साइकल (जैसे तमिलनाडु या केरल में)
                के आदी हैं, तो ध्यान दें कि MSEDCL मीटर हर महीने पढ़ता
                और बिल करता है — आपको जो यूनिट्स डालनी हैं वे एक
                महीने की खपत होनी चाहिए, दो महीने की नहीं।
              </>
            ),
          },
          {
            title: 'व्हीलिंग चार्ज और FAC असली बिल को ऊपर धकेलते हैं',
            body: (
              <>
                यह कैलकुलेटर अभी MSEDCL के अलग प्रति-यूनिट व्हीलिंग
                चार्ज या इसके मासिक फ्यूल एडजस्टमेंट चार्ज (FAC) को
                मॉडल नहीं करता। आपका असली महावितरण बिल यहां दिखाए
                गए अनुमान से कुछ ज़्यादा आएगा।
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            महाराष्ट्र स्टेट इलेक्ट्रिसिटी बोर्ड (MSEB) को
            इलेक्ट्रिसिटी एक्ट 2003 के तहत 6 जून 2005 को चार अलग
            कंपनियों में विभाजित किया गया: MSEB होल्डिंग कंपनी,
            महाराष्ट्र स्टेट पावर जनरेशन कं. (महाजेनको), महाराष्ट्र
            स्टेट इलेक्ट्रिसिटी ट्रांसमिशन कं. (महाट्रांसको), और
            महाराष्ट्र स्टेट इलेक्ट्रिसिटी डिस्ट्रिब्यूशन कं. लिमिटेड
            (MSEDCL) — जिसे आम तौर पर महावितरण या महाडिस्कॉम कहा जाता
            है — जो बिलिंग और डिस्ट्रिब्यूशन संभालती है।
          </>,
          <>
            MSEDCL लगभग पूरे महाराष्ट्र में बिजली वितरित करता है,
            लेकिन मुंबई शहर के ज़्यादातर हिस्से में नहीं: BEST, टाटा
            पावर और अदानी इलेक्ट्रिसिटी मुंबई के पास वहां डिस्ट्रिब्यूशन
            लाइसेंस हैं, जबकि MSEDCL मुंबई के कुछ उपनगर (जैसे मुलुंड
            और भांडुप) और बाकी राज्य को कवर करता है।
          </>,
        ],
        coverageQA: {
          q: 'क्या MSEDCL मुंबई को बिजली सप्लाई करता है?',
          a: (
            <>
              ज़्यादातर शहर के लिए नहीं। मुंबई को तीन अन्य लाइसेंसी
              सर्व करते हैं — BEST, टाटा पावर और अदानी इलेक्ट्रिसिटी
              मुंबई — जबकि MSEDCL बाकी महाराष्ट्र और मुलुंड व भांडुप
              जैसे कुछ मुंबई उपनगरों को कवर करता है। अगर आपका बिल
              MSEDCL या महावितरण नहीं कहता, तो जांचें आप तीन मुंबई
              लाइसेंसी में से किस पर हैं।
            </>
          ),
        },
        howToPay: {
          portalLabel: 'wss.mahadiscom.in (MSEDCL वेब सेल्फ सर्विस)',
          helpline: '1912 / 1800-233-3435 (24×7)',
          steps: [
            'MSEDCL वेब सेल्फ सर्विस पोर्टल पर जाएं या Mahavitaran ऐप खोलें',
            'अपना मौजूदा बिल पाने के लिए अपना कंज़्यूमर नंबर डालें',
            'राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए रसीद डाउनलोड करें',
          ],
        },
        thresholdCallout: {
          title: '100-यूनिट रेट क्लिफ',
          leftLabel: '0–100 यूनिट',
          leftValue: '₹3.25/यूनिट',
          rightLabel: '101+ यूनिट',
          rightValue: '₹6.14/यूनिट',
          note: 'सिर्फ 100 से ऊपर की यूनिट्स ऊंची दर पर बिल होती हैं — यह छलांग टेलिस्कोपिक है, पूर्वव्यापी नहीं — लेकिन लगभग 2× पर, यह किसी भी बड़े भारतीय डिस्कॉम की सबसे तीखी सिंगल-स्लैब छलांगों में से एक है।',
        },
      },
      mr: {
        h1: 'MSEDCL बिल कॅल्क्युलेटर (महावितरण, महाराष्ट्र)',
        breadcrumbLabel: 'MSEDCL बिल कॅल्क्युलेटर',
        metaTitle: 'MSEDCL बिल कॅल्क्युलेटर 2026 — महावितरण वीज बिल (महाराष्ट्र)',
        metaDescription:
          'महाराष्ट्रासाठी तुमच्या MSEDCL (महावितरण) वीज बिलाचा अंदाज घ्या. मासिक टेलिस्कोपिक स्लॅब, 16% वीज शुल्क आणि फिक्स्ड चार्ज — व्हीलिंग चार्ज आणि FAC बद्दल स्पष्ट सूचनांसह.',
        intro: (
          <>
            महाराष्ट्रासाठी तुमच्या MSEDCL (महावितरण) वीज बिलाचा
            अंदाज घ्या. तमिळनाडूच्या विपरीत, MSEDCL घरगुती ग्राहकांना{' '}
            <strong>दर महिन्याला</strong> बिल करते, आणि महाराष्ट्र
            ऊर्जा, व्हीलिंग आणि फिक्स्ड चार्जच्या वर भारतातील सर्वात
            जास्त <strong>वीज शुल्कांपैकी एक (16%)</strong> लावते.
          </>
        ),
        explainer: [
          {
            title: 'मासिक बिलिंग, चार टेलिस्कोपिक स्लॅब',
            body: (
              <>
                MSEDCL मीटर मासिक वाचते. वापर चार बँडमध्ये विभागला
                जातो — पहिल्या 100 युनिट्ससाठी ₹3.25, नंतर ₹6.14,
                ₹8.45 आणि ₹9.56 — प्रत्येक बँड स्वतःच्या दराने चार्ज
                होतो.
              </>
            ),
          },
          {
            title: '16% वीज शुल्क — महाराष्ट्राची एक वैशिष्ट्यपूर्ण गोष्ट',
            body: (
              <>
                महाराष्ट्र ऊर्जा, व्हीलिंग आणि फिक्स्ड चार्जच्या
                बेरजेवर 16% वीज शुल्क आकारते — बहुतेक राज्ये घरगुती
                पुरवठ्यावर आकारत असलेल्या 0–5% पेक्षा खूपच जास्त. हे
                बहुधा महावितरण बिलावर ऊर्जा शुल्कानंतरची दुसरी सर्वात
                मोठी लाइन असते.
              </>
            ),
          },
          {
            title: 'हा अंदाज काय वगळतो',
            body: (
              <>
                MSEDCL बिलांमध्ये एक स्वतंत्र प्रति-युनिट{' '}
                <strong>व्हीलिंग चार्ज</strong> आणि मासिक{' '}
                <strong>इंधन समायोजन चार्ज (FAC)</strong> देखील असतो
                जो हे कॅल्क्युलेटर अजून मॉडेल करत नाही, त्यामुळे
                प्रत्यक्ष बिल इथे दाखवलेल्या अंदाजापेक्षा थोडे जास्त
                येते.
              </>
            ),
          },
        ],
        faqs: [
          {
            q: 'MSEDCL मासिक बिल करते की द्वैमासिक?',
            a: 'MSEDCL (महावितरण) घरगुती ग्राहकांना दर महिन्याला बिल करते, तमिळनाडूच्या TNEB च्या विपरीत जे दर दोन महिन्यांनी बिल करते.',
          },
          {
            q: 'महाराष्ट्रात वीज शुल्क इतके जास्त का आहे?',
            a: 'महाराष्ट्र सरकार घरगुती पुरवठ्यावर 16% वीज शुल्क आकारते — ऊर्जा, व्हीलिंग आणि फिक्स्ड चार्ज एकत्र करून लागू — जे भारतातील सर्वात जास्तांपैकी एक आहे.',
          },
          {
            q: 'यात व्हीलिंग चार्ज आणि FAC समाविष्ट आहे का?',
            a: 'अजून नाही. प्रति-युनिट व्हीलिंग चार्ज आणि मासिक इंधन समायोजन चार्ज मॉडेल केलेले नाहीत, त्यामुळे तुमचे प्रत्यक्ष महावितरण बिल या अंदाजापेक्षा थोडे जास्त असेल.',
          },
          {
            q: 'तमिळनाडूसारखी मोफत-युनिट सबसिडी आहे का?',
            a: 'सामान्य MSEDCL घरगुती ग्राहकांसाठी कोणतीही कायमस्वरूपी मोफत-युनिट योजना लागू नाही. FY 2026 पासून दरमहा 100 युनिट्सपेक्षा कमी वापर असलेल्या घरांसाठी 10% पर्यंतची एक वेगळी सवलत टप्प्याटप्प्याने लागू केली जात आहे.',
          },
          {
            q: 'माझे MSEDCL बिल 100 आणि 101 युनिट्समध्ये इतके का वाढते?',
            a: 'MSEDCL चा स्लॅब दर त्या मर्यादेवर जवळपास दुप्पट होतो — 100 युनिट्सपर्यंत ₹3.25/युनिट, नंतर 101–300 साठी ₹6.14/युनिट. फक्त 100 च्या वरच्या युनिट्सवर जास्त दर आकारला जातो (हे टेलिस्कोपिक आहे, पूर्वलक्षी नाही), पण ही उडी कोणत्याही भारतीय डिस्कॉमच्या सर्वात तीव्र उड्यांपैकी एक आहे.',
          },
          {
            q: 'MSEDCL मुंबईला वीज पुरवते का?',
            a: 'बहुतांशी नाही. मुंबई शहराचा बहुतांश भाग BEST, टाटा पॉवर आणि अदानी इलेक्ट्रिसिटी मुंबई यांच्याकडून सेवा दिला जातो, MSEDCL कडून नाही. MSEDCL मुंबईच्या काही उपनगरांना, जसे मुलुंड आणि भांडुप, आणि उर्वरित महाराष्ट्र राज्याला पुरवठा करते.',
          },
          {
            q: 'मी माझे MSEDCL बिल ऑनलाइन कसे तपासावे किंवा भरावे?',
            a: 'अधिकृत MSEDCL वेब सेल्फ सर्विस पोर्टल wss.mahadiscom.in किंवा Mahavitaran अॅपद्वारे भरा. चौकशीसाठी, 24×7 टोल-फ्री हेल्पलाइन 1912 किंवा 1800-233-3435 वर कॉल करा.',
          },
          {
            q: 'MSEDCL/महावितरण म्हणजे काय, आणि ते MSEB पेक्षा कसे वेगळे आहे?',
            a: 'महाराष्ट्र स्टेट इलेक्ट्रिसिटी बोर्ड (MSEB) चे इलेक्ट्रिसिटी अॅक्ट 2003 अंतर्गत 6 जून 2005 रोजी चार कंपन्यांमध्ये विभाजन करण्यात आले: MSEB होल्डिंग कं., महाजेनको (निर्मिती), महाट्रान्सको (पारेषण) आणि महावितरण/MSEDCL (वितरण) — जी संस्था आज घरगुती ग्राहकांना बिल करते.',
          },
        ],
        billTraps: [
          {
            title: '100-युनिट स्लॅब कड्याची उडी',
            body: (
              <>
                100 वरून 101 युनिट्सकडे जाणे फक्त एका युनिटचा खर्च
                वाढवत नाही — 101 पासूनची प्रत्येक युनिट ₹3.25 ऐवजी
                ₹6.14 ला बिल होते, जवळपास दुप्पट. हे टेलिस्कोपिक आहे
                (पहिली 100 युनिट्स नेहमी ₹3.25 वरच राहतात), पण ही
                सीमांत उडी बहुतेक राज्यांपेक्षा जास्त तीव्र आहे.
              </>
            ),
          },
          {
            title: '16% शुल्क — भारतातील सर्वात जास्तांपैकी एक',
            body: (
              <>
                महाराष्ट्राचे 16% वीज शुल्क ऊर्जा, व्हीलिंग आणि
                फिक्स्ड चार्ज एकत्र करून आकारले जाते — बहुतेक
                राज्यांच्या 0–5% पेक्षा खूप जास्त. हे बहुधा ऊर्जा
                शुल्कानंतर बिलावरील दुसरी सर्वात मोठी लाइन असते.
              </>
            ),
          },
          {
            title: 'मासिक, द्वैमासिक नाही',
            body: (
              <>
                तुम्ही द्वैमासिक सायकलला (जसे तमिळनाडू किंवा
                केरळमध्ये) सरावलेले असाल, तर लक्षात घ्या की MSEDCL
                मीटर दर महिन्याला वाचते आणि बिल करते — तुम्ही
                टाकलेल्या युनिट्स एका महिन्याच्या वापराच्या असाव्यात,
                दोन महिन्यांच्या नाहीत.
              </>
            ),
          },
          {
            title: 'व्हीलिंग चार्ज आणि FAC प्रत्यक्ष बिल वाढवतात',
            body: (
              <>
                हे कॅल्क्युलेटर अजून MSEDCL च्या स्वतंत्र प्रति-युनिट
                व्हीलिंग चार्जला किंवा त्याच्या मासिक इंधन समायोजन
                चार्जला (FAC) मॉडेल करत नाही. तुमचे प्रत्यक्ष
                महावितरण बिल इथे दाखवलेल्या अंदाजापेक्षा थोडे जास्त
                असेल.
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            महाराष्ट्र स्टेट इलेक्ट्रिसिटी बोर्ड (MSEB) चे इलेक्ट्रिसिटी
            अॅक्ट 2003 अंतर्गत 6 जून 2005 रोजी चार वेगळ्या कंपन्यांमध्ये
            विभाजन करण्यात आले: MSEB होल्डिंग कंपनी, महाराष्ट्र स्टेट
            पॉवर जनरेशन कं. (महाजेनको), महाराष्ट्र स्टेट इलेक्ट्रिसिटी
            ट्रान्समिशन कं. (महाट्रान्सको), आणि महाराष्ट्र स्टेट
            इलेक्ट्रिसिटी डिस्ट्रिब्युशन कं. लिमिटेड (MSEDCL) — ज्याला
            सामान्यतः महावितरण किंवा महाडिस्कॉम म्हणतात — जी बिलिंग
            आणि वितरण सांभाळते.
          </>,
          <>
            MSEDCL जवळजवळ संपूर्ण महाराष्ट्रात वीज वितरित करते, पण
            मुंबई शहराच्या बहुतांश भागात नाही: BEST, टाटा पॉवर आणि
            अदानी इलेक्ट्रिसिटी मुंबई यांच्याकडे तिथे वितरण परवाने
            आहेत, तर MSEDCL मुंबईचे काही उपनगर (जसे मुलुंड आणि
            भांडुप) आणि उर्वरित राज्य कव्हर करते.
          </>,
        ],
        coverageQA: {
          q: 'MSEDCL मुंबईला वीज पुरवते का?',
          a: (
            <>
              बहुतांश शहरासाठी नाही. मुंबईला तीन अन्य परवानाधारक सेवा
              देतात — BEST, टाटा पॉवर आणि अदानी इलेक्ट्रिसिटी मुंबई —
              तर MSEDCL उर्वरित महाराष्ट्र आणि मुलुंड व भांडुपसारखे
              काही मुंबई उपनगर कव्हर करते. जर तुमचे बिल MSEDCL किंवा
              महावितरण असे म्हणत नसेल, तर तीन मुंबई परवानाधारकांपैकी
              तुम्ही कोणावर आहात ते तपासा.
            </>
          ),
        },
        howToPay: {
          portalLabel: 'wss.mahadiscom.in (MSEDCL वेब सेल्फ सर्विस)',
          helpline: '1912 / 1800-233-3435 (24×7)',
          steps: [
            'MSEDCL वेब सेल्फ सर्विस पोर्टलला भेट द्या किंवा Mahavitaran अॅप उघडा',
            'तुमचे सध्याचे बिल मिळवण्यासाठी तुमचा कंझ्युमर नंबर टाका',
            'रक्कम तपासा आणि UPI, कार्ड किंवा नेट बँकिंगने भरा',
            'तुमच्या रेकॉर्डसाठी पावती डाउनलोड करा',
          ],
        },
        thresholdCallout: {
          title: '100-युनिट दर कडा',
          leftLabel: '0–100 युनिट्स',
          leftValue: '₹3.25/युनिट',
          rightLabel: '101+ युनिट्स',
          rightValue: '₹6.14/युनिट',
          note: 'फक्त 100 च्या वरच्या युनिट्सवरच जास्त दर आकारला जातो — ही उडी टेलिस्कोपिक आहे, पूर्वलक्षी नाही — पण जवळजवळ 2× वर, ही कोणत्याही मोठ्या भारतीय डिस्कॉमच्या सर्वात तीव्र सिंगल-स्लॅब उड्यांपैकी एक आहे.',
        },
      },
    },
  },

  // -------------------------------------------------------------- UPPCL
  {
    slug: 'uppcl-bill-calculator',
    discomCode: 'UPPCL',
    h1: 'UPPCL Bill Calculator (Uttar Pradesh)',
    breadcrumbLabel: 'UPPCL Bill Calculator',
    metaTitle:
      'UPPCL Bill Calculator 2026 — UP Bijli Bill (Urban Domestic LMV-1)',
    metaDescription:
      'Estimate your UPPCL electricity bill for urban Uttar Pradesh. Monthly LMV-1 slabs, ₹110/kW fixed charge, meter rent and 5% duty. Works for PuVVNL, MVVNL, PVVNL, DVVNL and KESCO.',
    exampleUnits: 250,
    exampleEligible: false,
    neighboringDiscoms: ['UHBVN', 'MPCZ', 'JVVNL'],
    intro: (
      <>
        Estimate your UPPCL electricity bill for urban Uttar Pradesh. UP&apos;s
        five distribution companies —{' '}
        <strong>PuVVNL, MVVNL, PVVNL, DVVNL and KESCO</strong> — all follow the
        same UPERC LMV-1 schedule, billed <strong>monthly</strong>, with a fixed
        charge tied to your sanctioned load.
      </>
    ),
    explainer: [
      {
        title: 'One state, five DISCOMs, one tariff',
        body: (
          <>
            Uttar Pradesh distributes power through five companies, but they
            share a single UPERC rate schedule, so these urban LMV-1 rates apply
            statewide. Rural domestic tariffs differ and are not covered here.
          </>
        ),
      },
      {
        title: 'Fixed charge is per kilowatt of load',
        body: (
          <>
            Unlike Tamil Nadu&apos;s flat phase-based charge, UPPCL levies its
            fixed charge at <strong>₹110 per kW of sanctioned load</strong> per
            month — so a 3 kW connection pays ₹330 fixed before a single unit is
            billed. A ₹20 meter rent and a ₹0.15/unit regulatory true-up also
            apply.
          </>
        ),
      },
      {
        title: 'Telescopic energy slabs',
        body: (
          <>
            Energy is charged telescopically: ₹5.50 for the first 150 units, then
            ₹6.00, ₹6.50 and ₹7.00, plus 5% electricity duty on the energy
            charge.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'Do PuVVNL, PVVNL, MVVNL, DVVNL and KESCO have different rates?',
        a: 'No. All five UP DISCOMs follow the same UPERC-approved LMV-1 schedule, so the urban domestic rates are identical statewide.',
      },
      {
        q: 'How is the UPPCL fixed charge calculated?',
        a: 'It is ₹110 per kW of sanctioned load per month in urban areas. Enter your sanctioned load in the calculator to include it.',
      },
      {
        q: 'Does this cover rural connections?',
        a: 'No. These are urban LMV-1 domestic rates. Rural/BPL schedules differ and are not modelled here yet.',
      },
      {
        q: 'What extra charges appear on a UP bill?',
        a: 'Besides energy and the per-kW fixed charge, expect a ₹20 meter rent, a ₹0.15/unit regulatory true-up and 5% electricity duty.',
      },
      {
        q: 'Does UPPCL supply Kanpur directly?',
        a: 'Not directly — Kanpur is served by the Kanpur Electricity Supply Company (KESCO), a UPPCL subsidiary dedicated to the Kanpur Municipal Corporation area, while the other four regions (Lucknow/Ayodhya, Meerut/Moradabad, Agra/Aligarh, Varanasi/Gorakhpur) are served by MVVNL, PVVNL, DVVNL and PuVVNL respectively — all under the same UPERC tariff.',
      },
      {
        q: 'How do I check or pay my UPPCL bill online?',
        a: 'Pay via the official UPPCL consumer portal at consumer.uppcl.org, or your local DISCOM app (e.g. KESCO for Kanpur). For queries, call the toll-free helpline 1800-180-8752 or 1912.',
      },
      {
        q: 'What is UPPCL, and how did it form?',
        a: 'UPPCL (Uttar Pradesh Power Corporation Ltd) was incorporated on 30 November 1999 and began operating on 15 January 2000, when the Uttar Pradesh State Electricity Board (UPSEB) was unbundled into UPPCL (transmission and distribution) and separate generation companies.',
      },
    ],
    billTraps: [
      {
        title: 'Your DISCOM depends on your city, not just "UPPCL"',
        body: (
          <>
            Bills are issued by one of five UPPCL subsidiaries — PuVVNL,
            MVVNL, PVVNL, DVVNL or KESCO — based on where you live. All five
            follow the same UPERC tariff, but customer service, portals and
            local offices differ by subsidiary.
          </>
        ),
      },
      {
        title: 'The fixed charge scales with sanctioned load',
        body: (
          <>
            At ₹110 per kW, a higher sanctioned load (useful for ACs, geysers
            or motors) raises your fixed charge regardless of how many units
            you actually consume that month.
          </>
        ),
      },
      {
        title: 'Rural rates are different and not modelled here',
        body: (
          <>
            This calculator uses the urban LMV-1 schedule. Rural domestic
            connections follow a separate UPERC tariff not covered by this
            calculator yet.
          </>
        ),
      },
    ],
    aboutDiscom: [
      <>
        Uttar Pradesh Power Corporation Ltd (UPPCL) was incorporated on 30
        November 1999 and commenced business on 15 January 2000, as part of
        the unbundling of the Uttar Pradesh State Electricity Board (UPSEB)
        into separate transmission/distribution and generation entities.
      </>,
      <>
        UPPCL bills consumers through five regional subsidiaries: Purvanchal
        Vidyut Vitran Nigam (PuVVNL), Madhyanchal Vidyut Vitran Nigam
        (MVVNL), Paschimanchal Vidyut Vitran Nigam (PVVNL), Dakshinanchal
        Vidyut Vitran Nigam (DVVNL), and Kanpur Electricity Supply Company
        (KESCO) for the Kanpur Municipal Corporation area specifically. All
        follow the same UPERC-approved tariff.
      </>,
    ],
    coverageQA: {
      q: 'Does UPPCL supply Lucknow and Kanpur?',
      a: (
        <>
          Both cities are covered, but by different UPPCL subsidiaries.
          Lucknow falls under Madhyanchal Vidyut Vitran Nigam (MVVNL), while
          Kanpur is served by its own dedicated subsidiary, the Kanpur
          Electricity Supply Company (KESCO) — both bill on the same UPERC
          tariff shown on this page.
        </>
      ),
    },
    howToPay: {
      portalUrl: 'https://consumer.uppcl.org/wss/pay_bill_home',
      portalLabel: 'consumer.uppcl.org (official UPPCL consumer portal)',
      helpline: '1800-180-8752 / 1912',
      steps: [
        'Visit the UPPCL consumer portal (or your local subsidiary’s app, e.g. KESCO for Kanpur)',
        'Enter your Account/Consumer ID to fetch your current bill',
        'Verify the amount and pay via UPI, card or net banking',
        'Save the payment receipt for your records',
      ],
    },
  },

  // -------------------------------------------------------------- BESCOM
  {
    slug: 'bescom-bill-calculator',
    discomCode: 'BESCOM',
    h1: 'BESCOM Bill Calculator (Karnataka)',
    breadcrumbLabel: 'BESCOM Bill Calculator',
    metaTitle:
      'BESCOM Bill Calculator 2026 — Karnataka Electricity Bill & Gruha Jyothi',
    metaDescription:
      'Estimate your BESCOM electricity bill for Karnataka. Monthly LT-2a slabs, ₹110/kW fixed charge, ₹0.36/unit surcharge, and the Gruha Jyothi up-to-200-free scheme explained.',
    exampleUnits: 250,
    exampleEligible: false,
    neighboringDiscoms: ['TNEB', 'KSEB', 'APSPDCL'],
    intro: (
      <>
        Estimate your BESCOM electricity bill for Karnataka. BESCOM bills{' '}
        <strong>monthly</strong>, and most domestic consumers fall under the{' '}
        <strong>Gruha Jyothi</strong> scheme, which can make up to 200 units free
        — but only within each household&apos;s own baseline average.
      </>
    ),
    explainer: [
      {
        title: 'Gruha Jyothi — free, but conditional',
        body: (
          <>
            Gruha Jyothi gives eligible households up to 200 free units a month,
            capped at their previous year&apos;s average consumption plus a
            buffer. Crucially, if you exceed the threshold in a month, you pay the{' '}
            <strong>entire</strong> bill for that month — not just the excess.
            This calculator models the simple &quot;first 200 units free&quot;
            case; your actual Gruha Jyothi benefit depends on your sanctioned
            baseline.
          </>
        ),
      },
      {
        title: 'Monthly LT-2a slabs plus a KERC surcharge',
        body: (
          <>
            Urban domestic (LT-2a) energy is charged at ₹5.90 for the first 100
            units, ₹7.25 for 101–200, and ₹8.60 above 200. Since April 2025 a
            ₹0.36/unit KERC surcharge applies on top, along with a ₹110/kW fixed
            charge.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'How does Gruha Jyothi decide if my power is free?',
        a: 'Your free allowance is your previous year’s average monthly consumption plus a 10% buffer, capped at 200 units. If you stay within it, those units are free; if you exceed it in a month, the full bill for that month is payable.',
      },
      {
        q: 'I used 250 units — is any of it free under Gruha Jyothi?',
        a: 'If 250 units is above your sanctioned baseline, you typically lose the benefit for that month and pay the full telescopic bill. The calculator’s subsidy toggle shows the simplified first-200-free case for comparison.',
      },
      {
        q: 'What is the ₹0.36 surcharge on Karnataka bills?',
        a: 'It is an additional per-unit surcharge KERC introduced from April 2025, applied to all consumer categories on top of the base slab rates.',
      },
      {
        q: 'Does BESCOM bill monthly?',
        a: 'Yes, BESCOM issues domestic bills every month, and the Gruha Jyothi eligibility is assessed on each month’s consumption.',
      },
      {
        q: 'Does BESCOM cover the whole of Bangalore?',
        a: 'BESCOM covers Bangalore Urban and Bangalore Rural districts plus six neighbouring districts (Chikkaballapura, Kolar, Davanagere, Tumkur, Chitradurga, Ramanagara) — the rest of Karnataka is served by MESCOM, HESCOM, GESCOM and CESC.',
      },
      {
        q: 'How do I check or pay my BESCOM bill online?',
        a: 'Pay via the official BESCOM website (bescom.co.in) or the BESCOM Mithra app. For outages or billing issues, call the 24×7 helpline 1912.',
      },
      {
        q: "What's the difference between BESCOM and KPTCL?",
        a: 'KPTCL (Karnataka Power Transmission Corporation) used to handle both transmission and distribution. On 1 June 2002 its distribution business was split into five regional companies, one of which is BESCOM — covering Bangalore and the surrounding districts.',
      },
      {
        q: 'How often is the BESCOM tariff updated?',
        a: 'KERC reviews rates periodically, with a notable ₹0.36/unit surcharge added from April 2025. We record the source order and a last-verified date on every tariff — visible at the bottom of this page.',
      },
    ],
    billTraps: [
      {
        title: "Gruha Jyothi isn't a flat 200 free units",
        body: (
          <>
            The free allowance is capped at your household&apos;s own average
            consumption from the previous year (plus a buffer), up to a
            maximum of 200 units — not automatically 200 for everyone. Two
            neighbours with different past usage can have different free
            allowances.
          </>
        ),
      },
      {
        title: 'Exceed your baseline, lose the whole month',
        body: (
          <>
            If you use more than your sanctioned Gruha Jyothi baseline in a
            given month, the scheme typically withdraws the subsidy for the
            entire month&apos;s bill — not just the units above the baseline.
            A one-off high-usage month can cost more than expected.
          </>
        ),
      },
      {
        title: 'Fixed charge scales with sanctioned load',
        body: (
          <>
            BESCOM&apos;s ₹110/kW fixed charge is based on your sanctioned
            load, not a flat per-connection fee. A higher sanctioned load
            (useful for running an AC or larger appliances) raises the fixed
            charge regardless of how many units you actually use.
          </>
        ),
      },
      {
        title: 'The ₹0.36 KERC surcharge is separate from the slab rate',
        body: (
          <>
            Added from April 2025, this per-unit surcharge sits on top of the
            published slab rates and applies to every consumer category — it
            won&apos;t appear as a &ldquo;slab&rdquo; on your bill but does add
            to the total.
          </>
        ),
      },
    ],
    aboutDiscom: [
      <>
        BESCOM (Bangalore Electricity Supply Company Ltd) was formed on 1 June
        2002, when the Karnataka Power Transmission Corporation Ltd
        (KPTCL)&apos;s distribution business was split into five regional
        companies — BESCOM, MESCOM, HESCOM, GESCOM and CESC — while KPTCL
        retained transmission.
      </>,
      <>
        BESCOM&apos;s territory covers Bangalore Urban and Bangalore Rural
        districts plus six neighbouring districts (Chikkaballapura, Kolar,
        Davanagere, Tumkur, Chitradurga and Ramanagara) — a wider area than
        Bangalore city alone.
      </>,
    ],
    coverageQA: {
      q: 'Does BESCOM supply all of Bangalore city?',
      a: (
        <>
          Yes for Bangalore itself, but BESCOM&apos;s territory extends well
          beyond the city — it covers eight districts in total. If your
          connection is outside Bangalore Urban/Rural (for example in
          Mangalore, Hubli or Gulbarga), you&apos;re more likely served by
          MESCOM, HESCOM or GESCOM instead.
        </>
      ),
    },
    howToPay: {
      portalUrl: 'https://bescom.co.in',
      portalLabel: 'bescom.co.in (official BESCOM website)',
      helpline: '1912 (24×7)',
      steps: [
        'Visit bescom.co.in or open the BESCOM Mithra app',
        'Enter your Account ID (RR Number) to view your current bill',
        'Verify the amount and pay via UPI, card or net banking',
        'Save the digital receipt for your records',
      ],
    },
    thresholdCallout: {
      title: 'The Gruha Jyothi baseline rule',
      leftLabel: 'Within your baseline',
      leftValue: 'Free (up to 200u)',
      rightLabel: 'Exceed your baseline',
      rightValue: 'Full bill for the month',
      note: 'Your free allowance is capped at your own past average consumption, not a flat 200 units. Cross your sanctioned baseline in any month and the subsidy is typically withdrawn for that entire month, not just the excess units.',
    },
    translations: {
      hi: {
        h1: 'BESCOM बिल कैलकुलेटर (कर्नाटक)',
        breadcrumbLabel: 'BESCOM बिल कैलकुलेटर',
        metaTitle: 'BESCOM बिल कैलकुलेटर 2026 — कर्नाटक बिजली बिल और गृह ज्योति',
        metaDescription:
          'कर्नाटक के लिए अपना BESCOM बिजली बिल अनुमानित करें। मासिक LT-2a स्लैब, ₹110/kW फिक्स्ड चार्ज, ₹0.36/यूनिट सरचार्ज, और गृह ज्योति की 200-यूनिट-तक-मुफ़्त योजना की व्याख्या।',
        intro: (
          <>
            कर्नाटक के लिए अपना BESCOM बिजली बिल अनुमानित करें। BESCOM{' '}
            <strong>मासिक</strong> बिल करता है, और ज़्यादातर घरेलू उपभोक्ता{' '}
            <strong>गृह ज्योति</strong> योजना के तहत आते हैं, जो 200 यूनिट
            तक मुफ़्त कर सकती है — लेकिन सिर्फ हर घर के अपने बेसलाइन औसत
            के भीतर।
          </>
        ),
        explainer: [
          {
            title: 'गृह ज्योति — मुफ़्त, लेकिन शर्तों के साथ',
            body: (
              <>
                गृह ज्योति पात्र घरों को हर महीने 200 यूनिट तक मुफ़्त
                देती है, जो पिछले साल के औसत इस्तेमाल पर एक बफर के साथ
                सीमित है। अहम बात, अगर आप किसी महीने में सीमा पार करते
                हैं, तो आप उस महीने का <strong>पूरा</strong> बिल चुकाते
                हैं — सिर्फ अतिरिक्त हिस्सा नहीं। यह कैलकुलेटर सरल
                &quot;पहली 200 यूनिट मुफ़्त&quot; मामला मॉडल करता है;
                आपका असली गृह ज्योति फायदा आपकी स्वीकृत बेसलाइन पर
                निर्भर करता है।
              </>
            ),
          },
          {
            title: 'मासिक LT-2a स्लैब प्लस एक KERC सरचार्ज',
            body: (
              <>
                शहरी घरेलू (LT-2a) एनर्जी पहली 100 यूनिट के लिए ₹5.90,
                101–200 के लिए ₹7.25, और 200 से ऊपर ₹8.60 पर चार्ज होती
                है। अप्रैल 2025 से इसके ऊपर एक ₹0.36/यूनिट KERC सरचार्ज
                लागू होता है, साथ ही ₹110/kW का फिक्स्ड चार्ज।
              </>
            ),
          },
        ],
        faqs: [
          { q: 'गृह ज्योति कैसे तय करती है कि मेरी बिजली मुफ़्त है या नहीं?', a: 'आपका मुफ़्त भत्ता आपके पिछले साल के औसत मासिक इस्तेमाल पर 10% बफर के साथ है, 200 यूनिट तक सीमित। अगर आप उसके भीतर रहते हैं, वे यूनिट्स मुफ़्त हैं; अगर आप किसी महीने में उससे ऊपर जाते हैं, तो उस महीने का पूरा बिल देय है।' },
          { q: 'मैंने 250 यूनिट इस्तेमाल कीं — क्या गृह ज्योति के तहत इसमें से कुछ मुफ़्त है?', a: 'अगर 250 यूनिट आपकी स्वीकृत बेसलाइन से ऊपर है, तो आप आम तौर पर उस महीने के लिए फायदा खो देते हैं और पूरा टेलिस्कोपिक बिल चुकाते हैं। कैलकुलेटर का सब्सिडी टॉगल तुलना के लिए सरलीकृत पहली-200-मुफ़्त मामला दिखाता है।' },
          { q: 'कर्नाटक बिलों पर ₹0.36 सरचार्ज क्या है?', a: 'यह एक अतिरिक्त प्रति-यूनिट सरचार्ज है जो KERC ने अप्रैल 2025 से लागू किया, जो सभी उपभोक्ता श्रेणियों पर बेस स्लैब दरों के ऊपर लगाया जाता है।' },
          { q: 'क्या BESCOM मासिक बिल करता है?', a: 'हां, BESCOM हर महीने घरेलू बिल जारी करता है, और गृह ज्योति पात्रता हर महीने के इस्तेमाल पर आंकी जाती है।' },
          { q: 'क्या BESCOM पूरे बैंगलोर को कवर करता है?', a: 'BESCOM बैंगलोर अर्बन और बैंगलोर रूरल ज़िलों के साथ छह पड़ोसी ज़िलों (चिक्काबल्लापुरा, कोलार, दावणगेरे, तुमकुर, चित्रदुर्ग, रामनगर) को कवर करता है — बाकी कर्नाटक MESCOM, HESCOM, GESCOM और CESC द्वारा सर्व किया जाता है।' },
          { q: 'मैं अपना BESCOM बिल ऑनलाइन कैसे चेक या भुगतान करूं?', a: 'आधिकारिक BESCOM वेबसाइट (bescom.co.in) या BESCOM मित्रा ऐप से भुगतान करें। आउटेज या बिलिंग समस्याओं के लिए, 24×7 हेल्पलाइन 1912 पर कॉल करें।' },
          { q: "BESCOM और KPTCL में क्या फर्क है?", a: 'KPTCL (कर्नाटक पावर ट्रांसमिशन कॉर्पोरेशन) पहले ट्रांसमिशन और डिस्ट्रिब्यूशन दोनों संभालता था। 1 जून 2002 को इसके डिस्ट्रिब्यूशन बिज़नेस को पांच क्षेत्रीय कंपनियों में बांटा गया, जिनमें से एक BESCOM है — जो बैंगलोर और आसपास के ज़िलों को कवर करती है।' },
          { q: 'BESCOM टैरिफ कितनी बार अपडेट होती है?', a: 'KERC समय-समय पर दरों की समीक्षा करता है, अप्रैल 2025 से एक उल्लेखनीय ₹0.36/यूनिट सरचार्ज जोड़ा गया। हम हर टैरिफ पर स्रोत ऑर्डर और एक आखिरी-सत्यापित तारीख दर्ज करते हैं — इस पेज के नीचे दिखाई देती है।' },
        ],
        billTraps: [
          {
            title: 'गृह ज्योति फ्लैट 200 मुफ़्त यूनिट नहीं है',
            body: (
              <>
                मुफ़्त भत्ता आपके घर के अपने पिछले साल के औसत इस्तेमाल
                पर सीमित है (प्लस एक बफर), अधिकतम 200 यूनिट तक — हर
                किसी के लिए अपने आप 200 नहीं। अलग पिछले इस्तेमाल वाले
                दो पड़ोसियों के अलग मुफ़्त भत्ते हो सकते हैं।
              </>
            ),
          },
          {
            title: 'बेसलाइन पार करें, पूरा महीना गंवाएं',
            body: (
              <>
                अगर आप किसी महीने में अपनी स्वीकृत गृह ज्योति बेसलाइन
                से ज़्यादा इस्तेमाल करते हैं, तो योजना आम तौर पर उस
                पूरे महीने के बिल के लिए सब्सिडी वापस ले लेती है —
                सिर्फ बेसलाइन से ऊपर की यूनिट्स के लिए नहीं। एक बार का
                ज़्यादा-इस्तेमाल वाला महीना अपेक्षा से ज़्यादा खर्चीला
                हो सकता है।
              </>
            ),
          },
          {
            title: 'फिक्स्ड चार्ज स्वीकृत लोड के साथ बढ़ता है',
            body: (
              <>
                BESCOM का ₹110/kW फिक्स्ड चार्ज आपके स्वीकृत लोड पर
                आधारित है, फ्लैट प्रति-कनेक्शन फीस नहीं। एक ऊंचा
                स्वीकृत लोड (AC या बड़े उपकरण चलाने के लिए उपयोगी)
                फिक्स्ड चार्ज बढ़ाता है चाहे आप असल में कितनी भी यूनिट
                इस्तेमाल करें।
              </>
            ),
          },
          {
            title: '₹0.36 KERC सरचार्ज स्लैब दर से अलग है',
            body: (
              <>
                अप्रैल 2025 से जोड़ा गया, यह प्रति-यूनिट सरचार्ज
                प्रकाशित स्लैब दरों के ऊपर बैठता है और हर उपभोक्ता
                श्रेणी पर लागू होता है — यह आपके बिल पर &quot;स्लैब&quot;
                के रूप में नहीं दिखेगा लेकिन कुल में जुड़ता है।
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            BESCOM (बैंगलोर इलेक्ट्रिसिटी सप्लाई कंपनी लिमिटेड) 1 जून
            2002 को बनी, जब कर्नाटक पावर ट्रांसमिशन कॉर्पोरेशन लिमिटेड
            (KPTCL) के डिस्ट्रिब्यूशन बिज़नेस को पांच क्षेत्रीय कंपनियों
            में बांटा गया — BESCOM, MESCOM, HESCOM, GESCOM और CESC —
            जबकि KPTCL ने ट्रांसमिशन अपने पास रखा।
          </>,
          <>
            BESCOM का क्षेत्र बैंगलोर अर्बन और बैंगलोर रूरल ज़िलों के
            साथ छह पड़ोसी ज़िलों (चिक्काबल्लापुरा, कोलार, दावणगेरे,
            तुमकुर, चित्रदुर्ग और रामनगर) को कवर करता है — सिर्फ बैंगलोर
            शहर से बड़ा क्षेत्र।
          </>,
        ],
        coverageQA: {
          q: 'क्या BESCOM पूरे बैंगलोर शहर को सप्लाई करता है?',
          a: (
            <>
              बैंगलोर के लिए हां, लेकिन BESCOM का क्षेत्र शहर से काफी
              आगे तक फैला है — यह कुल आठ ज़िलों को कवर करता है। अगर
              आपका कनेक्शन बैंगलोर अर्बन/रूरल के बाहर है (उदाहरण के
              लिए मैंगलोर, हुबली या गुलबर्गा में), तो आप शायद इसकी
              बजाय MESCOM, HESCOM या GESCOM द्वारा सर्व किए जाते हैं।
            </>
          ),
        },
        howToPay: {
          portalLabel: 'bescom.co.in (आधिकारिक BESCOM वेबसाइट)',
          helpline: '1912 (24×7)',
          steps: [
            'bescom.co.in पर जाएं या BESCOM मित्रा ऐप खोलें',
            'अपना मौजूदा बिल देखने के लिए अपना अकाउंट ID (RR नंबर) डालें',
            'राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए डिजिटल रसीद सेव करें',
          ],
        },
        thresholdCallout: {
          title: 'गृह ज्योति बेसलाइन नियम',
          leftLabel: 'बेसलाइन के भीतर',
          leftValue: 'मुफ़्त (200यू तक)',
          rightLabel: 'बेसलाइन पार',
          rightValue: 'महीने का पूरा बिल',
          note: 'आपका मुफ़्त भत्ता आपके अपने पिछले औसत इस्तेमाल पर सीमित है, फ्लैट 200 यूनिट नहीं। किसी भी महीने में अपनी स्वीकृत बेसलाइन पार करें और सब्सिडी आम तौर पर उस पूरे महीने के लिए वापस ले ली जाती है, सिर्फ अतिरिक्त यूनिट्स के लिए नहीं।',
        },
      },
      kn: {
        h1: 'BESCOM ಬಿಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ (ಕರ್ನಾಟಕ)',
        breadcrumbLabel: 'BESCOM ಬಿಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
        metaTitle: 'BESCOM ಬಿಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ 2026 — ಕರ್ನಾಟಕ ವಿದ್ಯುತ್ ಬಿಲ್ ಮತ್ತು ಗೃಹ ಜ್ಯೋತಿ',
        metaDescription:
          'ಕರ್ನಾಟಕಕ್ಕಾಗಿ ನಿಮ್ಮ BESCOM ವಿದ್ಯುತ್ ಬಿಲ್ ಅಂದಾಜಿಸಿ. ಮಾಸಿಕ LT-2a ಸ್ಲ್ಯಾಬ್‌ಗಳು, ₹110/kW ಸ್ಥಿರ ಶುಲ್ಕ, ₹0.36/ಯುನಿಟ್ ಸರ್‌ಚಾರ್ಜ್, ಮತ್ತು ಗೃಹ ಜ್ಯೋತಿಯ 200-ಯುನಿಟ್-ವರೆಗೆ-ಉಚಿತ ಯೋಜನೆಯ ವಿವರಣೆ.',
        intro: (
          <>
            ಕರ್ನಾಟಕಕ್ಕಾಗಿ ನಿಮ್ಮ BESCOM ವಿದ್ಯುತ್ ಬಿಲ್ ಅಂದಾಜಿಸಿ. BESCOM{' '}
            <strong>ಮಾಸಿಕವಾಗಿ</strong> ಬಿಲ್ ಮಾಡುತ್ತದೆ, ಮತ್ತು ಹೆಚ್ಚಿನ ಗೃಹ
            ಬಳಕೆದಾರರು <strong>ಗೃಹ ಜ್ಯೋತಿ</strong> ಯೋಜನೆಯಡಿ ಬರುತ್ತಾರೆ, ಇದು
            200 ಯುನಿಟ್‌ಗಳವರೆಗೆ ಉಚಿತವಾಗಿಸಬಹುದು — ಆದರೆ ಪ್ರತಿ ಮನೆಯ ಸ್ವಂತ
            ಬೇಸ್‌ಲೈನ್ ಸರಾಸರಿಯೊಳಗೆ ಮಾತ್ರ.
          </>
        ),
        explainer: [
          {
            title: 'ಗೃಹ ಜ್ಯೋತಿ — ಉಚಿತ, ಆದರೆ ಷರತ್ತುಬದ್ಧ',
            body: (
              <>
                ಗೃಹ ಜ್ಯೋತಿ ಅರ್ಹ ಮನೆಗಳಿಗೆ ತಿಂಗಳಿಗೆ 200 ಉಚಿತ ಯುನಿಟ್‌ಗಳವರೆಗೆ
                ನೀಡುತ್ತದೆ, ಇದು ಹಿಂದಿನ ವರ್ಷದ ಸರಾಸರಿ ಬಳಕೆಯ ಮೇಲೆ ಒಂದು
                ಬಫರ್‌ನೊಂದಿಗೆ ಮಿತಿಗೊಳಿಸಲಾಗಿದೆ. ಮುಖ್ಯವಾಗಿ, ನೀವು ಒಂದು
                ತಿಂಗಳಲ್ಲಿ ಮಿತಿ ಮೀರಿದರೆ, ನೀವು ಆ ತಿಂಗಳ{' '}
                <strong>ಸಂಪೂರ್ಣ</strong> ಬಿಲ್ ಪಾವತಿಸುತ್ತೀರಿ — ಹೆಚ್ಚುವರಿ
                ಮಾತ್ರ ಅಲ್ಲ. ಈ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಸರಳ &quot;ಮೊದಲ 200 ಯುನಿಟ್
                ಉಚಿತ&quot; ಪ್ರಕರಣವನ್ನು ಮಾದರಿ ಮಾಡುತ್ತದೆ; ನಿಮ್ಮ ನಿಜವಾದ
                ಗೃಹ ಜ್ಯೋತಿ ಪ್ರಯೋಜನ ನಿಮ್ಮ ಮಂಜೂರಾದ ಬೇಸ್‌ಲೈನ್ ಮೇಲೆ
                ಅವಲಂಬಿಸಿದೆ.
              </>
            ),
          },
          {
            title: 'ಮಾಸಿಕ LT-2a ಸ್ಲ್ಯಾಬ್‌ಗಳು ಜೊತೆಗೆ KERC ಸರ್‌ಚಾರ್ಜ್',
            body: (
              <>
                ನಗರ ಗೃಹ (LT-2a) ಶಕ್ತಿಗೆ ಮೊದಲ 100 ಯುನಿಟ್‌ಗಳಿಗೆ ₹5.90,
                101–200 ಕ್ಕೆ ₹7.25, ಮತ್ತು 200 ಕ್ಕಿಂತ ಮೇಲೆ ₹8.60
                ವಿಧಿಸಲಾಗುತ್ತದೆ. ಏಪ್ರಿಲ್ 2025 ರಿಂದ ಇದರ ಮೇಲೆ ₹0.36/ಯುನಿಟ್
                KERC ಸರ್‌ಚಾರ್ಜ್ ಅನ್ವಯಿಸುತ್ತದೆ, ಜೊತೆಗೆ ₹110/kW ಸ್ಥಿರ
                ಶುಲ್ಕ.
              </>
            ),
          },
        ],
        faqs: [
          { q: 'ಗೃಹ ಜ್ಯೋತಿ ನನ್ನ ವಿದ್ಯುತ್ ಉಚಿತವೇ ಎಂದು ಹೇಗೆ ನಿರ್ಧರಿಸುತ್ತದೆ?', a: 'ನಿಮ್ಮ ಉಚಿತ ಭತ್ಯೆ ನಿಮ್ಮ ಹಿಂದಿನ ವರ್ಷದ ಸರಾಸರಿ ಮಾಸಿಕ ಬಳಕೆ ಜೊತೆಗೆ 10% ಬಫರ್, 200 ಯುನಿಟ್‌ಗಳಿಗೆ ಮಿತಿಗೊಳಿಸಲಾಗಿದೆ. ನೀವು ಅದರೊಳಗೆ ಇದ್ದರೆ, ಆ ಯುನಿಟ್‌ಗಳು ಉಚಿತ; ನೀವು ಒಂದು ತಿಂಗಳಲ್ಲಿ ಮೀರಿದರೆ, ಆ ತಿಂಗಳ ಪೂರ್ಣ ಬಿಲ್ ಪಾವತಿಸಬೇಕು.' },
          { q: 'ನಾನು 250 ಯುನಿಟ್ ಬಳಸಿದೆ — ಗೃಹ ಜ್ಯೋತಿಯಡಿ ಇದರಲ್ಲಿ ಯಾವುದಾದರೂ ಉಚಿತವೇ?', a: 'ಒಂದುವೇಳೆ 250 ಯುನಿಟ್ ನಿಮ್ಮ ಮಂಜೂರಾದ ಬೇಸ್‌ಲೈನ್‌ಗಿಂತ ಹೆಚ್ಚಿದ್ದರೆ, ನೀವು ಸಾಮಾನ್ಯವಾಗಿ ಆ ತಿಂಗಳ ಪ್ರಯೋಜನವನ್ನು ಕಳೆದುಕೊಂಡು ಪೂರ್ಣ ಟೆಲಿಸ್ಕೋಪಿಕ್ ಬಿಲ್ ಪಾವತಿಸುತ್ತೀರಿ. ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ನ ಸಬ್ಸಿಡಿ ಟಾಗಲ್ ಹೋಲಿಕೆಗಾಗಿ ಸರಳೀಕೃತ ಮೊದಲ-200-ಉಚಿತ ಪ್ರಕರಣವನ್ನು ತೋರಿಸುತ್ತದೆ.' },
          { q: 'ಕರ್ನಾಟಕ ಬಿಲ್‌ಗಳ ಮೇಲಿನ ₹0.36 ಸರ್‌ಚಾರ್ಜ್ ಏನು?', a: 'ಇದು KERC ಏಪ್ರಿಲ್ 2025 ರಿಂದ ಪರಿಚಯಿಸಿದ ಹೆಚ್ಚುವರಿ ಪ್ರತಿ-ಯುನಿಟ್ ಸರ್‌ಚಾರ್ಜ್ ಆಗಿದೆ, ಇದನ್ನು ಎಲ್ಲಾ ಗ್ರಾಹಕ ವರ್ಗಗಳ ಮೇಲೆ ಮೂಲ ಸ್ಲ್ಯಾಬ್ ದರಗಳ ಮೇಲೆ ಅನ್ವಯಿಸಲಾಗುತ್ತದೆ.' },
          { q: 'BESCOM ಮಾಸಿಕ ಬಿಲ್ ಮಾಡುತ್ತದೆಯೇ?', a: 'ಹೌದು, BESCOM ಪ್ರತಿ ತಿಂಗಳು ಗೃಹ ಬಿಲ್‌ಗಳನ್ನು ನೀಡುತ್ತದೆ, ಮತ್ತು ಗೃಹ ಜ್ಯೋತಿ ಅರ್ಹತೆಯನ್ನು ಪ್ರತಿ ತಿಂಗಳ ಬಳಕೆಯ ಆಧಾರದ ಮೇಲೆ ನಿರ್ಣಯಿಸಲಾಗುತ್ತದೆ.' },
          { q: 'BESCOM ಇಡೀ ಬೆಂಗಳೂರನ್ನು ಒಳಗೊಂಡಿದೆಯೇ?', a: 'BESCOM ಬೆಂಗಳೂರು ನಗರ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಜಿಲ್ಲೆಗಳ ಜೊತೆಗೆ ಆರು ನೆರೆಯ ಜಿಲ್ಲೆಗಳನ್ನು (ಚಿಕ್ಕಬಳ್ಳಾಪುರ, ಕೋಲಾರ, ದಾವಣಗೆರೆ, ತುಮಕೂರು, ಚಿತ್ರದುರ್ಗ, ರಾಮನಗರ) ಒಳಗೊಂಡಿದೆ — ಉಳಿದ ಕರ್ನಾಟಕವನ್ನು MESCOM, HESCOM, GESCOM ಮತ್ತು CESC ಸೇವೆ ಸಲ್ಲಿಸುತ್ತವೆ.' },
          { q: 'ನಾನು ನನ್ನ BESCOM ಬಿಲ್ ಅನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಹೇಗೆ ಪರಿಶೀಲಿಸುವುದು ಅಥವಾ ಪಾವತಿಸುವುದು?', a: 'ಅಧಿಕೃತ BESCOM ವೆಬ್‌ಸೈಟ್ (bescom.co.in) ಅಥವಾ BESCOM ಮಿತ್ರ ಆ್ಯಪ್ ಮೂಲಕ ಪಾವತಿಸಿ. ವಿದ್ಯುತ್ ವ್ಯತ್ಯಯ ಅಥವಾ ಬಿಲ್ಲಿಂಗ್ ಸಮಸ್ಯೆಗಳಿಗೆ, 24×7 ಸಹಾಯವಾಣಿ 1912 ಗೆ ಕರೆ ಮಾಡಿ.' },
          { q: 'BESCOM ಮತ್ತು KPTCL ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?', a: 'KPTCL (ಕರ್ನಾಟಕ ಪವರ್ ಟ್ರಾನ್ಸ್‌ಮಿಷನ್ ಕಾರ್ಪೊರೇಷನ್) ಹಿಂದೆ ಟ್ರಾನ್ಸ್‌ಮಿಷನ್ ಮತ್ತು ವಿತರಣೆ ಎರಡನ್ನೂ ನಿರ್ವಹಿಸುತ್ತಿತ್ತು. 1 ಜೂನ್ 2002 ರಂದು ಅದರ ವಿತರಣಾ ವ್ಯವಹಾರವನ್ನು ಐದು ಪ್ರಾದೇಶಿಕ ಕಂಪನಿಗಳಾಗಿ ವಿಭಜಿಸಲಾಯಿತು, ಅವುಗಳಲ್ಲಿ ಒಂದು BESCOM — ಇದು ಬೆಂಗಳೂರು ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಜಿಲ್ಲೆಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.' },
          { q: 'BESCOM ಟ್ಯಾರಿಫ್ ಎಷ್ಟು ಬಾರಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ?', a: 'KERC ನಿಯತಕಾಲಿಕವಾಗಿ ದರಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ, ಏಪ್ರಿಲ್ 2025 ರಿಂದ ಗಮನಾರ್ಹ ₹0.36/ಯುನಿಟ್ ಸರ್‌ಚಾರ್ಜ್ ಸೇರಿಸಲಾಗಿದೆ. ನಾವು ಪ್ರತಿ ಟ್ಯಾರಿಫ್‌ನ ಮೂಲ ಆದೇಶ ಮತ್ತು ಕೊನೆಯ-ಪರಿಶೀಲಿತ ದಿನಾಂಕವನ್ನು ದಾಖಲಿಸುತ್ತೇವೆ — ಈ ಪುಟದ ಕೆಳಗೆ ಗೋಚರಿಸುತ್ತದೆ.' },
        ],
        billTraps: [
          {
            title: 'ಗೃಹ ಜ್ಯೋತಿ ಫ್ಲ್ಯಾಟ್ 200 ಉಚಿತ ಯುನಿಟ್ ಅಲ್ಲ',
            body: (
              <>
                ಉಚಿತ ಭತ್ಯೆ ನಿಮ್ಮ ಮನೆಯ ಸ್ವಂತ ಹಿಂದಿನ ವರ್ಷದ ಸರಾಸರಿ
                ಬಳಕೆಗೆ ಮಿತಿಗೊಳಿಸಲಾಗಿದೆ (ಜೊತೆಗೆ ಬಫರ್), ಗರಿಷ್ಠ 200
                ಯುನಿಟ್‌ಗಳವರೆಗೆ — ಎಲ್ಲರಿಗೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ 200 ಅಲ್ಲ.
                ವಿಭಿನ್ನ ಹಿಂದಿನ ಬಳಕೆಯ ಇಬ್ಬರು ನೆರೆಹೊರೆಯವರಿಗೆ ವಿಭಿನ್ನ
                ಉಚಿತ ಭತ್ಯೆಗಳಿರಬಹುದು.
              </>
            ),
          },
          {
            title: 'ನಿಮ್ಮ ಬೇಸ್‌ಲೈನ್ ಮೀರಿದರೆ, ಇಡೀ ತಿಂಗಳು ಕಳೆದುಕೊಳ್ಳಿ',
            body: (
              <>
                ಒಂದು ನಿರ್ದಿಷ್ಟ ತಿಂಗಳಲ್ಲಿ ನಿಮ್ಮ ಮಂಜೂರಾದ ಗೃಹ ಜ್ಯೋತಿ
                ಬೇಸ್‌ಲೈನ್‌ಗಿಂತ ಹೆಚ್ಚು ಬಳಸಿದರೆ, ಯೋಜನೆ ಸಾಮಾನ್ಯವಾಗಿ ಆ
                ಇಡೀ ತಿಂಗಳ ಬಿಲ್‌ಗಾಗಿ ಸಬ್ಸಿಡಿಯನ್ನು ಹಿಂಪಡೆಯುತ್ತದೆ —
                ಬೇಸ್‌ಲೈನ್‌ಗಿಂತ ಹೆಚ್ಚಿನ ಯುನಿಟ್‌ಗಳಿಗೆ ಮಾತ್ರ ಅಲ್ಲ. ಒಂದು
                ಬಾರಿಯ ಹೆಚ್ಚಿನ-ಬಳಕೆಯ ತಿಂಗಳು ನಿರೀಕ್ಷೆಗಿಂತ ಹೆಚ್ಚು
                ವೆಚ್ಚವಾಗಬಹುದು.
              </>
            ),
          },
          {
            title: 'ಸ್ಥಿರ ಶುಲ್ಕ ಮಂಜೂರಾದ ಲೋಡ್‌ನೊಂದಿಗೆ ಬದಲಾಗುತ್ತದೆ',
            body: (
              <>
                BESCOM ನ ₹110/kW ಸ್ಥಿರ ಶುಲ್ಕ ನಿಮ್ಮ ಮಂಜೂರಾದ ಲೋಡ್
                ಆಧಾರಿತವಾಗಿದೆ, ಫ್ಲ್ಯಾಟ್ ಪ್ರತಿ-ಸಂಪರ್ಕ ಶುಲ್ಕ ಅಲ್ಲ.
                ಹೆಚ್ಚಿನ ಮಂಜೂರಾದ ಲೋಡ್ (AC ಅಥವಾ ದೊಡ್ಡ ಉಪಕರಣಗಳನ್ನು
                ಚಾಲನೆ ಮಾಡಲು ಉಪಯುಕ್ತ) ನೀವು ನಿಜವಾಗಿ ಎಷ್ಟು ಯುನಿಟ್
                ಬಳಸಿದರೂ ಸ್ಥಿರ ಶುಲ್ಕವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.
              </>
            ),
          },
          {
            title: '₹0.36 KERC ಸರ್‌ಚಾರ್ಜ್ ಸ್ಲ್ಯಾಬ್ ದರದಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿದೆ',
            body: (
              <>
                ಏಪ್ರಿಲ್ 2025 ರಿಂದ ಸೇರಿಸಲಾಗಿದೆ, ಈ ಪ್ರತಿ-ಯುನಿಟ್
                ಸರ್‌ಚಾರ್ಜ್ ಪ್ರಕಟಿತ ಸ್ಲ್ಯಾಬ್ ದರಗಳ ಮೇಲೆ ಕುಳಿತಿದೆ
                ಮತ್ತು ಪ್ರತಿ ಗ್ರಾಹಕ ವರ್ಗಕ್ಕೆ ಅನ್ವಯಿಸುತ್ತದೆ — ಇದು
                ನಿಮ್ಮ ಬಿಲ್‌ನಲ್ಲಿ &quot;ಸ್ಲ್ಯಾಬ್&quot; ಆಗಿ
                ಕಾಣಿಸುವುದಿಲ್ಲ ಆದರೆ ಒಟ್ಟುಗೆ ಸೇರುತ್ತದೆ.
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            BESCOM (ಬೆಂಗಳೂರು ಎಲೆಕ್ಟ್ರಿಸಿಟಿ ಸಪ್ಲೈ ಕಂಪನಿ ಲಿಮಿಟೆಡ್) 1
            ಜೂನ್ 2002 ರಂದು ರೂಪುಗೊಂಡಿತು, ಕರ್ನಾಟಕ ಪವರ್ ಟ್ರಾನ್ಸ್‌ಮಿಷನ್
            ಕಾರ್ಪೊರೇಷನ್ ಲಿಮಿಟೆಡ್ (KPTCL) ನ ವಿತರಣಾ ವ್ಯವಹಾರವನ್ನು ಐದು
            ಪ್ರಾದೇಶಿಕ ಕಂಪನಿಗಳಾಗಿ — BESCOM, MESCOM, HESCOM, GESCOM
            ಮತ್ತು CESC — ವಿಭಜಿಸಿದಾಗ, KPTCL ಟ್ರಾನ್ಸ್‌ಮಿಷನ್ ಅನ್ನು
            ಉಳಿಸಿಕೊಂಡಿತು.
          </>,
          <>
            BESCOM ನ ಪ್ರದೇಶ ಬೆಂಗಳೂರು ನಗರ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ
            ಜಿಲ್ಲೆಗಳ ಜೊತೆಗೆ ಆರು ನೆರೆಯ ಜಿಲ್ಲೆಗಳನ್ನು (ಚಿಕ್ಕಬಳ್ಳಾಪುರ,
            ಕೋಲಾರ, ದಾವಣಗೆರೆ, ತುಮಕೂರು, ಚಿತ್ರದುರ್ಗ ಮತ್ತು ರಾಮನಗರ)
            ಒಳಗೊಂಡಿದೆ — ಬೆಂಗಳೂರು ನಗರಕ್ಕಿಂತ ವಿಶಾಲ ಪ್ರದೇಶ.
          </>,
        ],
        coverageQA: {
          q: 'BESCOM ಇಡೀ ಬೆಂಗಳೂರು ನಗರಕ್ಕೆ ಸರಬರಾಜು ಮಾಡುತ್ತದೆಯೇ?',
          a: (
            <>
              ಬೆಂಗಳೂರಿಗೆ ಹೌದು, ಆದರೆ BESCOM ನ ಪ್ರದೇಶ ನಗರವನ್ನು ಮೀರಿ
              ವಿಸ್ತರಿಸಿದೆ — ಇದು ಒಟ್ಟು ಎಂಟು ಜಿಲ್ಲೆಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.
              ನಿಮ್ಮ ಸಂಪರ್ಕ ಬೆಂಗಳೂರು ನಗರ/ಗ್ರಾಮಾಂತರದ ಹೊರಗಿದ್ದರೆ
              (ಉದಾಹರಣೆಗೆ ಮಂಗಳೂರು, ಹುಬ್ಬಳ್ಳಿ ಅಥವಾ ಗುಲ್ಬರ್ಗಾದಲ್ಲಿ),
              ನೀವು ಬದಲಿಗೆ MESCOM, HESCOM ಅಥವಾ GESCOM ನಿಂದ ಸೇವೆ
              ಪಡೆಯುತ್ತಿರುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು.
            </>
          ),
        },
        howToPay: {
          portalLabel: 'bescom.co.in (ಅಧಿಕೃತ BESCOM ವೆಬ್‌ಸೈಟ್)',
          helpline: '1912 (24×7)',
          steps: [
            'bescom.co.in ಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ BESCOM ಮಿತ್ರ ಆ್ಯಪ್ ತೆರೆಯಿರಿ',
            'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬಿಲ್ ನೋಡಲು ನಿಮ್ಮ ಖಾತೆ ID (RR ಸಂಖ್ಯೆ) ನಮೂದಿಸಿ',
            'ಮೊತ್ತವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು UPI, ಕಾರ್ಡ್ ಅಥವಾ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಕ ಪಾವತಿಸಿ',
            'ನಿಮ್ಮ ದಾಖಲೆಗಳಿಗಾಗಿ ಡಿಜಿಟಲ್ ರಸೀದಿಯನ್ನು ಉಳಿಸಿ',
          ],
        },
        thresholdCallout: {
          title: 'ಗೃಹ ಜ್ಯೋತಿ ಬೇಸ್‌ಲೈನ್ ನಿಯಮ',
          leftLabel: 'ನಿಮ್ಮ ಬೇಸ್‌ಲೈನ್ ಒಳಗೆ',
          leftValue: 'ಉಚಿತ (200ಯು ವರೆಗೆ)',
          rightLabel: 'ಬೇಸ್‌ಲೈನ್ ಮೀರಿದರೆ',
          rightValue: 'ತಿಂಗಳ ಪೂರ್ಣ ಬಿಲ್',
          note: 'ನಿಮ್ಮ ಉಚಿತ ಭತ್ಯೆ ನಿಮ್ಮ ಸ್ವಂತ ಹಿಂದಿನ ಸರಾಸರಿ ಬಳಕೆಗೆ ಮಿತಿಗೊಳಿಸಲಾಗಿದೆ, ಫ್ಲ್ಯಾಟ್ 200 ಯುನಿಟ್ ಅಲ್ಲ. ಯಾವುದೇ ತಿಂಗಳಲ್ಲಿ ನಿಮ್ಮ ಮಂಜೂರಾದ ಬೇಸ್‌ಲೈನ್ ಮೀರಿದರೆ ಸಬ್ಸಿಡಿಯನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಆ ಇಡೀ ತಿಂಗಳಿಗೆ ಹಿಂಪಡೆಯಲಾಗುತ್ತದೆ, ಹೆಚ್ಚುವರಿ ಯುನಿಟ್‌ಗಳಿಗೆ ಮಾತ್ರ ಅಲ್ಲ.',
        },
      },
    },
  },

  // -------------------------------------------------------------- KSEB
  {
    slug: 'kseb-bill-calculator',
    discomCode: 'KSEB',
    h1: 'KSEB Bill Calculator (Kerala)',
    breadcrumbLabel: 'KSEB Bill Calculator',
    metaTitle:
      'KSEB Bill Calculator 2026 — Kerala Electricity Bill (Telescopic Slabs)',
    metaDescription:
      'Estimate your KSEB electricity bill for Kerala. Bi-monthly billing, telescopic slabs up to 250 units/month, and a clear explanation of the non-telescopic cliff above 250 units.',
    exampleUnits: 300,
    exampleEligible: false,
    neighboringDiscoms: ['TNEB', 'BESCOM', 'APSPDCL'],
    intro: (
      <>
        Estimate your KSEB electricity bill for Kerala. KSEB bills domestic
        consumers <strong>bi-monthly</strong> but assesses slabs on the{' '}
        <strong>monthly average</strong> (units ÷ 2). Below 250 units/month the
        tariff is telescopic; cross 250 and Kerala&apos;s well-known{' '}
        <strong>non-telescopic cliff</strong> kicks in.
      </>
    ),
    explainer: [
      {
        title: 'The 250-unit non-telescopic cliff',
        body: (
          <>
            Up to 250 units a month, each slab is charged at its own rate
            (telescopic). The moment your monthly average crosses 250 units, KSEB
            re-bills your <strong>entire</strong> consumption at a single higher
            non-telescopic rate — so 251 units can cost noticeably more than 250.
            This calculator models the telescopic range only and is{' '}
            <strong>not accurate above 250 units/month</strong>.
          </>
        ),
      },
      {
        title: 'Bi-monthly billing, monthly assessment',
        body: (
          <>
            Bills arrive every two months, but the slab thresholds are applied to
            the monthly average. Enter your two-month units here; the calculator
            uses bi-monthly slab widths (twice the monthly figures) and shows a
            monthly-equivalent total.
          </>
        ),
      },
      {
        title: 'Telescopic slabs and fixed charge',
        body: (
          <>
            Monthly telescopic rates run ₹3.35 (0–50), ₹4.25 (51–100), ₹5.35
            (101–150), ₹7.20 (151–200) and ₹8.50 (201–250), plus a fixed charge
            of ₹40/month single-phase and 5% electricity duty.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'What is the 250-unit rule in Kerala?',
        a: 'Below 250 units/month KSEB charges telescopically (each slab at its own rate). Above 250 units/month it switches to non-telescopic — your whole consumption is billed at one higher rate, which this calculator does not model.',
      },
      {
        q: 'KSEB bills me every two months — how do slabs work?',
        a: 'Slabs are assessed on the monthly average, i.e. your two-month units ÷ 2. The calculator uses bi-monthly slab widths and shows a monthly-equivalent figure.',
      },
      {
        q: 'Why might my real KSEB bill differ above 250 units?',
        a: 'Because the non-telescopic regime above 250 units/month re-prices your entire usage at a single higher rate. Treat estimates above 500 bi-monthly units as indicative only.',
      },
      {
        q: 'Is there an electricity duty in Kerala?',
        a: 'Yes, a 5% electricity duty applies on the energy charge, along with a per-month fixed charge billed bi-monthly.',
      },
      {
        q: 'Does KSEB supply electricity to all of Kerala?',
        a: 'Almost all — KSEB Limited (KSEBL) covers the entire state except the Thrissur Municipal Corporation area, the Munnar (Kannan Devan Hills) area, and a handful of small industrial-park licensees, which have their own separate distribution licensees.',
      },
      {
        q: 'How do I check or pay my KSEB bill online?',
        a: 'Pay via the official KSEB Web Self Service portal at wss.kseb.in, or the KSEB Mobile App. For queries or outages, call the 24×7 helpline 1912 or 0471-2555544.',
      },
      {
        q: "What's the difference between KSEB and KSEB Limited (KSEBL)?",
        a: 'The original Kerala State Electricity Board (KSEB), formed in 1957, was converted into a company — Kerala State Electricity Board Limited (KSEBL) — incorporated in January 2011 and operational from 1 November 2013. "KSEB" is still the everyday name people use.',
      },
    ],
    billTraps: [
      {
        title: 'The 250-unit cliff is the single biggest trap',
        body: (
          <>
            Below a 250 units/month average, KSEB charges telescopically. The
            moment your average crosses 250, your{' '}
            <strong>entire</strong> bi-monthly consumption is re-billed at a
            single higher non-telescopic rate — not just the units above 250.
            This calculator only models the telescopic range and is not
            accurate above it.
          </>
        ),
      },
      {
        title: 'Bi-monthly bill, monthly-average trigger',
        body: (
          <>
            Because the 250-unit threshold is assessed on your monthly
            average (bi-monthly total ÷ 2), a 501-unit bi-monthly bill
            crosses the cliff even though &ldquo;501&rdquo; doesn&apos;t look
            close to &ldquo;250&rdquo; at first glance.
          </>
        ),
      },
      {
        title: 'Fixed charge depends on phase',
        body: (
          <>
            KSEB&apos;s fixed charge is ₹80 for single-phase and ₹220 for
            three-phase connections per bi-monthly cycle — a similar
            structure to Tamil Nadu&apos;s, but at different amounts.
          </>
        ),
      },
    ],
    aboutDiscom: [
      <>
        The Kerala State Electricity Board (KSEB) began functioning on 31
        March 1957. Under the Electricity Act 2003, it was converted into a
        company — Kerala State Electricity Board Limited (KSEBL) —
        incorporated on 14 January 2011 and operating independently from 1
        November 2013. &ldquo;KSEB&rdquo; remains the name most commonly used
        for bills and customer service.
      </>,
      <>
        KSEB distributes power across nearly all of Kerala, with a few
        exceptions: the Thrissur Municipal Corporation area, the Munnar
        (Kannan Devan Hills) area, and several small industrial-park zones
        are served by separate, smaller licensees.
      </>,
    ],
    coverageQA: {
      q: 'Does KSEB supply electricity to Kochi and Thiruvananthapuram?',
      a: (
        <>
          Yes — KSEB covers both Kochi and Thiruvananthapuram (Trivandrum)
          along with the rest of Kerala. The notable exceptions are the
          Thrissur Municipal Corporation area and Munnar (Kannan Devan
          Hills), which have their own separate distribution licensees.
        </>
      ),
    },
    howToPay: {
      portalUrl: 'https://wss.kseb.in/selfservices/quickpay',
      portalLabel: 'wss.kseb.in (KSEB Web Self Service)',
      helpline: '1912 / 0471-2555544 (24×7)',
      steps: [
        'Visit the KSEB Web Self Service portal or open the KSEB Mobile App',
        'Enter your Consumer Number to fetch your current bill',
        'Verify the amount and pay via UPI, card or net banking',
        'Save the payment confirmation for your records',
      ],
    },
    thresholdCallout: {
      title: 'The 250-unit non-telescopic cliff',
      leftLabel: '≤250 units/month avg',
      leftValue: 'Telescopic (slab-wise)',
      rightLabel: '>250 units/month avg',
      rightValue: 'Flat rate on ALL units',
      note: 'Cross a monthly average of 250 units and KSEB switches your entire bi-monthly consumption to a single higher non-telescopic rate — not just the units above 250. This is the single most misunderstood rule on a KSEB bill.',
    },
    translations: {
      hi: {
        h1: 'KSEB बिल कैलकुलेटर (केरल)',
        breadcrumbLabel: 'KSEB बिल कैलकुलेटर',
        metaTitle: 'KSEB बिल कैलकुलेटर 2026 — केरल बिजली बिल (टेलीस्कोपिक स्लैब)',
        metaDescription:
          'केरल के लिए अपना KSEB बिजली बिल अनुमानित करें। द्वि-मासिक बिलिंग, 250 यूनिट/माह तक टेलीस्कोपिक स्लैब, और 250 यूनिट से ऊपर नॉन-टेलीस्कोपिक क्लिफ की स्पष्ट व्याख्या।',
        intro: (
          <>
            केरल के लिए अपना KSEB बिजली बिल अनुमानित करें। KSEB घरेलू
            उपभोक्ताओं को <strong>द्वि-मासिक</strong> बिल करता है लेकिन
            स्लैब का आकलन <strong>मासिक औसत</strong> (यूनिट्स ÷ 2) पर करता
            है। 250 यूनिट/माह से नीचे टैरिफ टेलीस्कोपिक है; 250 पार करते ही
            केरल की मशहूर <strong>नॉन-टेलीस्कोपिक क्लिफ</strong> लागू हो
            जाती है।
          </>
        ),
        explainer: [
          {
            title: '250-यूनिट नॉन-टेलीस्कोपिक क्लिफ',
            body: (
              <>
                महीने में 250 यूनिट तक, हर स्लैब अपनी दर पर चार्ज होता है
                (टेलीस्कोपिक)। जैसे ही आपका मासिक औसत 250 यूनिट पार करता
                है, KSEB आपकी <strong>पूरी</strong> खपत को एक ही ऊंची
                नॉन-टेलीस्कोपिक दर पर दोबारा बिल करता है — इसलिए 251
                यूनिट्स 250 से काफी ज़्यादा महंगी पड़ सकती हैं। यह
                कैलकुलेटर सिर्फ टेलीस्कोपिक रेंज को मॉडल करता है और{' '}
                <strong>250 यूनिट/माह से ऊपर सटीक नहीं है</strong>।
              </>
            ),
          },
          {
            title: 'द्वि-मासिक बिलिंग, मासिक आकलन',
            body: (
              <>
                बिल हर दो महीने में आता है, लेकिन स्लैब सीमाएं मासिक औसत
                पर लागू होती हैं। यहां अपनी दो महीने की यूनिट्स डालें;
                कैलकुलेटर द्वि-मासिक स्लैब चौड़ाई (मासिक आंकड़ों की
                दोगुनी) इस्तेमाल करता है और एक मासिक-समतुल्य कुल दिखाता
                है।
              </>
            ),
          },
          {
            title: 'टेलीस्कोपिक स्लैब और फिक्स्ड चार्ज',
            body: (
              <>
                मासिक टेलीस्कोपिक दरें 0–50 के लिए ₹3.35, 51–100 के लिए
                ₹4.25, 101–150 के लिए ₹5.35, 151–200 के लिए ₹7.20 और
                201–250 के लिए ₹8.50 हैं, साथ ही सिंगल-फेज के लिए ₹40/माह
                का फिक्स्ड चार्ज और 5% बिजली शुल्क।
              </>
            ),
          },
        ],
        faqs: [
          { q: 'केरल में 250-यूनिट का नियम क्या है?', a: '250 यूनिट/माह से नीचे KSEB टेलीस्कोपिक रूप से चार्ज करता है (हर स्लैब अपनी दर पर)। 250 यूनिट/माह से ऊपर यह नॉन-टेलीस्कोपिक हो जाता है — आपकी पूरी खपत एक ही ऊंची दर पर बिल होती है, जिसे यह कैलकुलेटर मॉडल नहीं करता।' },
          { q: 'KSEB मुझे हर दो महीने में बिल करता है — स्लैब कैसे काम करते हैं?', a: 'स्लैब का आकलन मासिक औसत पर होता है, यानी आपकी दो महीने की यूनिट्स ÷ 2। कैलकुलेटर द्वि-मासिक स्लैब चौड़ाई इस्तेमाल करता है और एक मासिक-समतुल्य आंकड़ा दिखाता है।' },
          { q: '250 यूनिट से ऊपर मेरा असली KSEB बिल अलग क्यों हो सकता है?', a: 'क्योंकि 250 यूनिट/माह से ऊपर नॉन-टेलीस्कोपिक व्यवस्था आपके पूरे इस्तेमाल की कीमत एक ही ऊंची दर पर दोबारा तय करती है। 500 द्वि-मासिक यूनिट्स से ऊपर के अनुमानों को सिर्फ संकेतात्मक मानें।' },
          { q: 'क्या केरल में बिजली शुल्क लगता है?', a: 'हां, एनर्जी चार्ज पर 5% बिजली शुल्क लागू होता है, साथ ही एक प्रति-माह फिक्स्ड चार्ज जो द्वि-मासिक रूप से बिल होता है।' },
          { q: 'क्या KSEB पूरे केरल को बिजली सप्लाई करता है?', a: 'लगभग पूरे — KSEB लिमिटेड (KSEBL) त्रिशूर म्युनिसिपल कॉर्पोरेशन क्षेत्र, मुन्नार (कन्नन देवन हिल्स) क्षेत्र, और कुछ छोटे औद्योगिक-पार्क लाइसेंसधारियों को छोड़कर पूरे राज्य को कवर करता है, जिनके अपने अलग डिस्ट्रिब्यूशन लाइसेंस हैं।' },
          { q: 'मैं अपना KSEB बिल ऑनलाइन कैसे चेक या भुगतान करूं?', a: 'आधिकारिक KSEB वेब सेल्फ सर्विस पोर्टल wss.kseb.in या KSEB मोबाइल ऐप से भुगतान करें। सवालों या बिजली कटौती के लिए, 24×7 हेल्पलाइन 1912 या 0471-2555544 पर कॉल करें।' },
          { q: 'KSEB और KSEB लिमिटेड (KSEBL) में क्या फर्क है?', a: '1957 में बना मूल केरल राज्य विद्युत बोर्ड (KSEB) को एक कंपनी — केरल राज्य विद्युत बोर्ड लिमिटेड (KSEBL) — में बदला गया, जो जनवरी 2011 में स्थापित हुई और 1 नवंबर 2013 से कार्यशील है। लोग आज भी रोज़मर्रा में "KSEB" नाम इस्तेमाल करते हैं।' },
        ],
        billTraps: [
          {
            title: '250-यूनिट क्लिफ सबसे बड़ा जाल है',
            body: (
              <>
                250 यूनिट/माह के औसत से नीचे, KSEB टेलीस्कोपिक रूप से
                चार्ज करता है। जैसे ही आपका औसत 250 पार करता है, आपकी{' '}
                <strong>पूरी</strong> द्वि-मासिक खपत एक ही ऊंची
                नॉन-टेलीस्कोपिक दर पर दोबारा बिल होती है — सिर्फ 250 से
                ऊपर की यूनिट्स नहीं। यह कैलकुलेटर सिर्फ टेलीस्कोपिक रेंज
                मॉडल करता है और उससे ऊपर सटीक नहीं है।
              </>
            ),
          },
          {
            title: 'द्वि-मासिक बिल, मासिक-औसत ट्रिगर',
            body: (
              <>
                क्योंकि 250-यूनिट सीमा का आकलन आपके मासिक औसत (द्वि-मासिक
                कुल ÷ 2) पर होता है, एक 501-यूनिट द्वि-मासिक बिल भी क्लिफ
                पार कर जाता है, भले ही &quot;501&quot; पहली नज़र में
                &quot;250&quot; के करीब न लगे।
              </>
            ),
          },
          {
            title: 'फिक्स्ड चार्ज फेज पर निर्भर करता है',
            body: (
              <>
                KSEB का फिक्स्ड चार्ज सिंगल-फेज के लिए ₹80 और थ्री-फेज
                कनेक्शन के लिए ₹220 प्रति द्वि-मासिक चक्र है — तमिलनाडु
                जैसी संरचना, लेकिन अलग राशियों के साथ।
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            केरल राज्य विद्युत बोर्ड (KSEB) ने 31 मार्च 1957 को काम करना
            शुरू किया। इलेक्ट्रिसिटी एक्ट 2003 के तहत, इसे एक कंपनी —
            केरल राज्य विद्युत बोर्ड लिमिटेड (KSEBL) — में बदला गया, जो
            14 जनवरी 2011 को स्थापित हुई और 1 नवंबर 2013 से स्वतंत्र रूप
            से कार्यरत है। बिलों और ग्राहक सेवा के लिए &quot;KSEB&quot;
            ही सबसे ज़्यादा इस्तेमाल होने वाला नाम बना हुआ है।
          </>,
          <>
            KSEB लगभग पूरे केरल में बिजली वितरित करता है, कुछ अपवादों के
            साथ: त्रिशूर म्युनिसिपल कॉर्पोरेशन क्षेत्र, मुन्नार (कन्नन
            देवन हिल्स) क्षेत्र, और कई छोटे औद्योगिक-पार्क ज़ोन अलग,
            छोटे लाइसेंसधारियों द्वारा सर्व किए जाते हैं।
          </>,
        ],
        coverageQA: {
          q: 'क्या KSEB कोच्चि और तिरुवनंतपुरम को बिजली सप्लाई करता है?',
          a: (
            <>
              हां — KSEB बाकी केरल के साथ कोच्चि और तिरुवनंतपुरम
              (त्रिवेंद्रम) दोनों को कवर करता है। उल्लेखनीय अपवाद त्रिशूर
              म्युनिसिपल कॉर्पोरेशन क्षेत्र और मुन्नार (कन्नन देवन
              हिल्स) हैं, जिनके अपने अलग डिस्ट्रिब्यूशन लाइसेंसधारी हैं।
            </>
          ),
        },
        howToPay: {
          portalLabel: 'wss.kseb.in (KSEB वेब सेल्फ सर्विस)',
          helpline: '1912 / 0471-2555544 (24×7)',
          steps: [
            'KSEB वेब सेल्फ सर्विस पोर्टल पर जाएं या KSEB मोबाइल ऐप खोलें',
            'अपना मौजूदा बिल पाने के लिए अपना कंज़्यूमर नंबर डालें',
            'राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए भुगतान पुष्टिकरण सेव करें',
          ],
        },
        thresholdCallout: {
          title: '250-यूनिट नॉन-टेलीस्कोपिक क्लिफ',
          leftLabel: '≤250 यूनिट/माह औसत',
          leftValue: 'टेलीस्कोपिक (स्लैब-वार)',
          rightLabel: '>250 यूनिट/माह औसत',
          rightValue: 'सभी यूनिट्स पर फ्लैट दर',
          note: 'मासिक औसत 250 यूनिट पार करते ही KSEB आपकी पूरी द्वि-मासिक खपत को एक ही ऊंची नॉन-टेलीस्कोपिक दर पर बदल देता है — सिर्फ 250 से ऊपर की यूनिट्स नहीं। यह KSEB बिल पर सबसे ज़्यादा गलत समझा जाने वाला नियम है।',
        },
      },
      ml: {
        h1: 'KSEB ബിൽ കാൽക്കുലേറ്റർ (കേരളം)',
        breadcrumbLabel: 'KSEB ബിൽ കാൽക്കുലേറ്റർ',
        metaTitle: 'KSEB ബിൽ കാൽക്കുലേറ്റർ 2026 — കേരള വൈദ്യുതി ബിൽ (ടെലിസ്കോപ്പിക് സ്ലാബുകൾ)',
        metaDescription:
          'കേരളത്തിനുള്ള നിങ്ങളുടെ KSEB വൈദ്യുതി ബിൽ കണക്കാക്കുക. ദ്വൈമാസ ബില്ലിംഗ്, മാസം 250 യൂണിറ്റ് വരെ ടെലിസ്കോപ്പിക് സ്ലാബുകൾ, 250 യൂണിറ്റിന് മുകളിലുള്ള നോൺ-ടെലിസ്കോപ്പിക് ക്ലിഫിന്റെ വ്യക്തമായ വിശദീകരണം.',
        intro: (
          <>
            കേരളത്തിനുള്ള നിങ്ങളുടെ KSEB വൈദ്യുതി ബിൽ കണക്കാക്കുക. KSEB
            ഗാർഹിക ഉപഭോക്താക്കൾക്ക് <strong>ദ്വൈമാസമായി</strong> ബിൽ
            ചെയ്യുന്നു, പക്ഷേ സ്ലാബുകൾ വിലയിരുത്തുന്നത്{' '}
            <strong>പ്രതിമാസ ശരാശരി</strong> (യൂണിറ്റുകൾ ÷ 2)
            അടിസ്ഥാനമാക്കിയാണ്. മാസം 250 യൂണിറ്റിന് താഴെ താരിഫ്
            ടെലിസ്കോപ്പിക് ആണ്; 250 കടക്കുമ്പോൾ കേരളത്തിന്റെ
            അറിയപ്പെടുന്ന <strong>നോൺ-ടെലിസ്കോപ്പിക് ക്ലിഫ്</strong>{' '}
            പ്രാബല്യത്തിൽ വരുന്നു.
          </>
        ),
        explainer: [
          {
            title: '250-യൂണിറ്റ് നോൺ-ടെലിസ്കോപ്പിക് ക്ലിഫ്',
            body: (
              <>
                മാസം 250 യൂണിറ്റ് വരെ, ഓരോ സ്ലാബും അതിന്റെ സ്വന്തം
                നിരക്കിൽ ഈടാക്കുന്നു (ടെലിസ്കോപ്പിക്). നിങ്ങളുടെ
                പ്രതിമാസ ശരാശരി 250 യൂണിറ്റ് കടക്കുന്ന നിമിഷം, KSEB
                നിങ്ങളുടെ <strong>മുഴുവൻ</strong> ഉപഭോഗവും ഒരൊറ്റ ഉയർന്ന
                നോൺ-ടെലിസ്കോപ്പിക് നിരക്കിൽ വീണ്ടും ബിൽ ചെയ്യുന്നു —
                അതിനാൽ 251 യൂണിറ്റിന് 250-നെക്കാൾ ശ്രദ്ധേയമായി കൂടുതൽ
                ചെലവാകാം. ഈ കാൽക്കുലേറ്റർ ടെലിസ്കോപ്പിക് പരിധി
                മാത്രമേ മോഡൽ ചെയ്യുന്നുള്ളൂ,{' '}
                <strong>250 യൂണിറ്റ്/മാസത്തിന് മുകളിൽ കൃത്യമല്ല</strong>.
              </>
            ),
          },
          {
            title: 'ദ്വൈമാസ ബില്ലിംഗ്, പ്രതിമാസ വിലയിരുത്തൽ',
            body: (
              <>
                ബില്ലുകൾ ഓരോ രണ്ട് മാസത്തിലും വരുന്നു, പക്ഷേ സ്ലാബ്
                പരിധികൾ പ്രതിമാസ ശരാശരിക്ക് ബാധകമാണ്. ഇവിടെ നിങ്ങളുടെ
                രണ്ട് മാസത്തെ യൂണിറ്റുകൾ നൽകുക; കാൽക്കുലേറ്റർ ദ്വൈമാസ
                സ്ലാബ് വീതി (പ്രതിമാസ കണക്കുകളുടെ ഇരട്ടി) ഉപയോഗിക്കുകയും
                ഒരു പ്രതിമാസ-തുല്യമായ ആകെ തുക കാണിക്കുകയും ചെയ്യുന്നു.
              </>
            ),
          },
          {
            title: 'ടെലിസ്കോപ്പിക് സ്ലാബുകളും സ്ഥിര ചാർജും',
            body: (
              <>
                പ്രതിമാസ ടെലിസ്കോപ്പിക് നിരക്കുകൾ 0–50-ന് ₹3.35,
                51–100-ന് ₹4.25, 101–150-ന് ₹5.35, 151–200-ന് ₹7.20,
                201–250-ന് ₹8.50 എന്നിങ്ങനെയാണ്, കൂടെ സിംഗിൾ-ഫേസിന്
                ₹40/മാസം സ്ഥിര ചാർജും 5% വൈദ്യുതി ഡ്യൂട്ടിയും.
              </>
            ),
          },
        ],
        faqs: [
          { q: 'കേരളത്തിലെ 250-യൂണിറ്റ് നിയമം എന്താണ്?', a: 'മാസം 250 യൂണിറ്റിന് താഴെ KSEB ടെലിസ്കോപ്പിക് ആയി ഈടാക്കുന്നു (ഓരോ സ്ലാബും അതിന്റെ സ്വന്തം നിരക്കിൽ). മാസം 250 യൂണിറ്റിന് മുകളിൽ ഇത് നോൺ-ടെലിസ്കോപ്പിക് ആയി മാറുന്നു — നിങ്ങളുടെ മുഴുവൻ ഉപഭോഗവും ഒരൊറ്റ ഉയർന്ന നിരക്കിൽ ബിൽ ചെയ്യപ്പെടുന്നു, ഇത് ഈ കാൽക്കുലേറ്റർ മോഡൽ ചെയ്യുന്നില്ല.' },
          { q: 'KSEB എനിക്ക് ഓരോ രണ്ട് മാസത്തിലും ബിൽ ചെയ്യുന്നു — സ്ലാബുകൾ എങ്ങനെ പ്രവർത്തിക്കുന്നു?', a: 'സ്ലാബുകൾ പ്രതിമാസ ശരാശരിയിലാണ് വിലയിരുത്തുന്നത്, അതായത് നിങ്ങളുടെ രണ്ട്-മാസ യൂണിറ്റുകൾ ÷ 2. കാൽക്കുലേറ്റർ ദ്വൈമാസ സ്ലാബ് വീതി ഉപയോഗിക്കുകയും ഒരു പ്രതിമാസ-തുല്യമായ കണക്ക് കാണിക്കുകയും ചെയ്യുന്നു.' },
          { q: '250 യൂണിറ്റിന് മുകളിൽ എന്റെ യഥാർത്ഥ KSEB ബിൽ എന്തുകൊണ്ട് വ്യത്യാസപ്പെടാം?', a: 'കാരണം മാസം 250 യൂണിറ്റിന് മുകളിലുള്ള നോൺ-ടെലിസ്കോപ്പിക് വ്യവസ്ഥ നിങ്ങളുടെ മുഴുവൻ ഉപയോഗവും ഒരൊറ്റ ഉയർന്ന നിരക്കിൽ വീണ്ടും വിലയിരുത്തുന്നു. 500 ദ്വൈമാസ യൂണിറ്റിന് മുകളിലുള്ള എസ്റ്റിമേറ്റുകൾ സൂചകം മാത്രമായി കണക്കാക്കുക.' },
          { q: 'കേരളത്തിൽ വൈദ്യുതി ഡ്യൂട്ടി ഉണ്ടോ?', a: 'ഉണ്ട്, എനർജി ചാർജിൽ 5% വൈദ്യുതി ഡ്യൂട്ടി ബാധകമാണ്, കൂടെ ദ്വൈമാസമായി ബിൽ ചെയ്യുന്ന ഒരു പ്രതിമാസ സ്ഥിര ചാർജും.' },
          { q: 'KSEB കേരളം മുഴുവനും വൈദ്യുതി വിതരണം ചെയ്യുന്നുണ്ടോ?', a: 'മിക്കവാറും എല്ലായിടത്തും — KSEB ലിമിറ്റഡ് (KSEBL) തൃശൂർ മുനിസിപ്പൽ കോർപ്പറേഷൻ പ്രദേശം, മൂന്നാർ (കണ്ണൻ ദേവൻ ഹിൽസ്) പ്രദേശം, ഏതാനും ചെറിയ വ്യാവസായിക-പാർക്ക് ലൈസൻസികൾ ഒഴികെ സംസ്ഥാനം മുഴുവൻ കവർ ചെയ്യുന്നു, ഇവയ്ക്ക് സ്വന്തം പ്രത്യേക വിതരണ ലൈസൻസുകൾ ഉണ്ട്.' },
          { q: 'എന്റെ KSEB ബിൽ ഓൺലൈനിൽ എങ്ങനെ പരിശോധിക്കാം അല്ലെങ്കിൽ അടയ്ക്കാം?', a: 'ഔദ്യോഗിക KSEB വെബ് സെൽഫ് സർവീസ് പോർട്ടലായ wss.kseb.in വഴിയോ KSEB മൊബൈൽ ആപ്പ് വഴിയോ അടയ്ക്കുക. ചോദ്യങ്ങൾക്കോ വൈദ്യുതി തടസ്സങ്ങൾക്കോ, 24×7 ഹെൽപ്‌ലൈൻ 1912 അല്ലെങ്കിൽ 0471-2555544 എന്ന നമ്പറിൽ വിളിക്കുക.' },
          { q: 'KSEB-യും KSEB ലിമിറ്റഡും (KSEBL) തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?', a: '1957-ൽ രൂപീകരിച്ച യഥാർത്ഥ കേരള സ്റ്റേറ്റ് ഇലക്ട്രിസിറ്റി ബോർഡ് (KSEB), ഒരു കമ്പനിയായി മാറ്റി — കേരള സ്റ്റേറ്റ് ഇലക്ട്രിസിറ്റി ബോർഡ് ലിമിറ്റഡ് (KSEBL) — 2011 ജനുവരിയിൽ രജിസ്റ്റർ ചെയ്യുകയും 2013 നവംബർ 1 മുതൽ പ്രവർത്തിക്കുകയും ചെയ്തു. "KSEB" എന്ന പേര് ഇന്നും ആളുകൾ സാധാരണയായി ഉപയോഗിക്കുന്നു.' },
        ],
        billTraps: [
          {
            title: '250-യൂണിറ്റ് ക്ലിഫ് ആണ് ഏറ്റവും വലിയ കെണി',
            body: (
              <>
                മാസം 250 യൂണിറ്റ് ശരാശരിക്ക് താഴെ, KSEB ടെലിസ്കോപ്പിക്
                ആയി ഈടാക്കുന്നു. നിങ്ങളുടെ ശരാശരി 250 കടക്കുന്ന
                നിമിഷം, നിങ്ങളുടെ <strong>മുഴുവൻ</strong> ദ്വൈമാസ
                ഉപഭോഗവും ഒരൊറ്റ ഉയർന്ന നോൺ-ടെലിസ്കോപ്പിക് നിരക്കിൽ
                വീണ്ടും ബിൽ ചെയ്യപ്പെടുന്നു — 250-ന് മുകളിലുള്ള
                യൂണിറ്റുകൾ മാത്രമല്ല. ഈ കാൽക്കുലേറ്റർ ടെലിസ്കോപ്പിക്
                പരിധി മാത്രമേ മോഡൽ ചെയ്യുന്നുള്ളൂ, അതിന് മുകളിൽ
                കൃത്യമല്ല.
              </>
            ),
          },
          {
            title: 'ദ്വൈമാസ ബിൽ, പ്രതിമാസ-ശരാശരി ട്രിഗർ',
            body: (
              <>
                250-യൂണിറ്റ് പരിധി നിങ്ങളുടെ പ്രതിമാസ ശരാശരിയിലാണ്
                (ദ്വൈമാസ ആകെ ÷ 2) വിലയിരുത്തുന്നത് എന്നതിനാൽ, ഒരു
                501-യൂണിറ്റ് ദ്വൈമാസ ബിൽ, &quot;501&quot; ആദ്യം കണ്ടാൽ
                &quot;250&quot;-നോട് അടുത്തതായി തോന്നിയില്ലെങ്കിലും
                ക്ലിഫ് കടക്കുന്നു.
              </>
            ),
          },
          {
            title: 'സ്ഥിര ചാർജ് ഫേസിനെ ആശ്രയിച്ചിരിക്കുന്നു',
            body: (
              <>
                KSEB-യുടെ സ്ഥിര ചാർജ് സിംഗിൾ-ഫേസിന് ₹80-ഉം ത്രീ-ഫേസ്
                കണക്ഷനുകൾക്ക് ₹220-ഉം ഓരോ ദ്വൈമാസ സൈക്കിളിനും ആണ് —
                തമിഴ്‌നാടിന്റേതിന് സമാനമായ ഘടന, പക്ഷേ വ്യത്യസ്ത
                തുകകളിൽ.
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            കേരള സ്റ്റേറ്റ് ഇലക്ട്രിസിറ്റി ബോർഡ് (KSEB) 1957 മാർച്ച്
            31-ന് പ്രവർത്തനം ആരംഭിച്ചു. ഇലക്ട്രിസിറ്റി ആക്ട് 2003
            പ്രകാരം, ഇത് ഒരു കമ്പനിയായി മാറ്റി — കേരള സ്റ്റേറ്റ്
            ഇലക്ട്രിസിറ്റി ബോർഡ് ലിമിറ്റഡ് (KSEBL) — 2011 ജനുവരി
            14-ന് രജിസ്റ്റർ ചെയ്യുകയും 2013 നവംബർ 1 മുതൽ
            സ്വതന്ത്രമായി പ്രവർത്തിക്കുകയും ചെയ്തു. ബില്ലുകൾക്കും
            ഉപഭോക്തൃ സേവനത്തിനും ഏറ്റവും കൂടുതൽ ഉപയോഗിക്കുന്ന പേര്
            &quot;KSEB&quot; ആണ്.
          </>,
          <>
            KSEB കേരളത്തിന്റെ മിക്കവാറും എല്ലായിടത്തും വൈദ്യുതി
            വിതരണം ചെയ്യുന്നു, ചില അപവാദങ്ങളോടെ: തൃശൂർ മുനിസിപ്പൽ
            കോർപ്പറേഷൻ പ്രദേശം, മൂന്നാർ (കണ്ണൻ ദേവൻ ഹിൽസ്) പ്രദേശം,
            കൂടാതെ നിരവധി ചെറിയ വ്യാവസായിക-പാർക്ക് മേഖലകളും
            പ്രത്യേക, ചെറിയ ലൈസൻസികൾ സേവിക്കുന്നു.
          </>,
        ],
        coverageQA: {
          q: 'KSEB കൊച്ചിക്കും തിരുവനന്തപുരത്തിനും വൈദ്യുതി വിതരണം ചെയ്യുന്നുണ്ടോ?',
          a: (
            <>
              അതെ — ബാക്കി കേരളത്തോടൊപ്പം കൊച്ചിക്കും
              തിരുവനന്തപുരത്തിനും (ട്രിവാൻഡ്രം) KSEB വൈദ്യുതി
              നൽകുന്നു. ശ്രദ്ധേയമായ അപവാദങ്ങൾ തൃശൂർ മുനിസിപ്പൽ
              കോർപ്പറേഷൻ പ്രദേശവും മൂന്നാറും (കണ്ണൻ ദേവൻ ഹിൽസ്)
              ആണ്, ഇവയ്ക്ക് സ്വന്തം പ്രത്യേക വിതരണ ലൈസൻസികൾ ഉണ്ട്.
            </>
          ),
        },
        howToPay: {
          portalLabel: 'wss.kseb.in (KSEB വെബ് സെൽഫ് സർവീസ്)',
          helpline: '1912 / 0471-2555544 (24×7)',
          steps: [
            'KSEB വെബ് സെൽഫ് സർവീസ് പോർട്ടൽ സന്ദർശിക്കുക അല്ലെങ്കിൽ KSEB മൊബൈൽ ആപ്പ് തുറക്കുക',
            'നിങ്ങളുടെ നിലവിലെ ബിൽ ലഭിക്കാൻ നിങ്ങളുടെ കൺസ്യൂമർ നമ്പർ നൽകുക',
            'തുക സ്ഥിരീകരിച്ച് UPI, കാർഡ് അല്ലെങ്കിൽ നെറ്റ് ബാങ്കിംഗ് വഴി അടയ്ക്കുക',
            'നിങ്ങളുടെ രേഖകൾക്കായി പേയ്‌മെന്റ് സ്ഥിരീകരണം സേവ് ചെയ്യുക',
          ],
        },
        thresholdCallout: {
          title: '250-യൂണിറ്റ് നോൺ-ടെലിസ്കോപ്പിക് ക്ലിഫ്',
          leftLabel: '≤250 യൂണിറ്റ്/മാസം ശരാശരി',
          leftValue: 'ടെലിസ്കോപ്പിക് (സ്ലാബ്-തിരിച്ച്)',
          rightLabel: '>250 യൂണിറ്റ്/മാസം ശരാശരി',
          rightValue: 'എല്ലാ യൂണിറ്റുകൾക്കും ഫ്ലാറ്റ് നിരക്ക്',
          note: 'പ്രതിമാസ ശരാശരി 250 യൂണിറ്റ് കടക്കുമ്പോൾ KSEB നിങ്ങളുടെ മുഴുവൻ ദ്വൈമാസ ഉപഭോഗവും ഒരൊറ്റ ഉയർന്ന നോൺ-ടെലിസ്കോപ്പിക് നിരക്കിലേക്ക് മാറ്റുന്നു — 250-ന് മുകളിലുള്ള യൂണിറ്റുകൾ മാത്രമല്ല. ഇതാണ് KSEB ബില്ലിലെ ഏറ്റവും തെറ്റിദ്ധരിക്കപ്പെടുന്ന നിയമം.',
        },
      },
    },
  },

  // -------------------------------------------------------------- WBSEDCL
  {
    slug: 'wbsedcl-bill-calculator',
    discomCode: 'WBSEDCL',
    h1: 'WBSEDCL Bill Calculator (West Bengal)',
    breadcrumbLabel: 'WBSEDCL Bill Calculator',
    metaTitle:
      'WBSEDCL Bill Calculator 2026 — West Bengal Electricity Bill (Quarterly)',
    metaDescription:
      'Estimate your WBSEDCL electricity bill for West Bengal. Quarterly billing, telescopic slabs, ₹30/kVA fixed charge and the MVCA surcharge explained.',
    exampleUnits: 300,
    exampleEligible: false,
    neighboringDiscoms: ['JBVNL', 'TPCODL', 'APDCL'],
    intro: (
      <>
        Estimate your WBSEDCL electricity bill for West Bengal. WBSEDCL is
        unusual in billing many domestic consumers{' '}
        <strong>quarterly</strong> (every three months) rather than monthly, with
        a monthly variable surcharge (MVCA) layered on top.
      </>
    ),
    explainer: [
      {
        title: 'Quarterly billing — a Bengal quirk',
        body: (
          <>
            Most Indian DISCOMs bill monthly or bi-monthly; WBSEDCL&apos;s
            domestic schedule is written for a <strong>quarterly</strong> (~90
            day) cycle, so the slab thresholds are large. Enter your three-month
            units here; the calculator shows a monthly-equivalent (total ÷ 3).
            Smart prepaid meters use monthly slabs equal to one-third of these.
          </>
        ),
      },
      {
        title: 'MVCA — the moving surcharge',
        body: (
          <>
            West Bengal adds a <strong>Monthly Variable Cost Adjustment
            (MVCA)</strong> that changes every billing month to track fuel costs.
            Because it moves, this calculator does not include it, so your actual
            bill will differ by the prevailing MVCA.
          </>
        ),
      },
      {
        title: 'Telescopic slabs and fixed charge',
        body: (
          <>
            Quarterly energy rates run ₹4.10 (0–102), ₹5.34 (103–180), ₹6.15
            (181–300), ₹6.65 (301–600) and ₹6.81 above 600 units, with a fixed
            charge of ₹30 per kVA per month (₹90 per kW per quarter here).
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'Does WBSEDCL really bill every three months?',
        a: 'Yes. WBSEDCL’s domestic tariff schedule is written for a quarterly cycle, which is why the slab limits are large. The calculator converts your quarterly total to a monthly-equivalent.',
      },
      {
        q: 'What is MVCA on my West Bengal bill?',
        a: 'MVCA is a Monthly Variable Cost Adjustment surcharge that changes each month to reflect fuel costs. It is not included in this estimate because it varies.',
      },
      {
        q: 'How is the WBSEDCL fixed charge calculated?',
        a: 'It is ₹30 per kVA per month based on your connected load, modelled here as ₹90 per kW per quarter.',
      },
      {
        q: 'What about prepaid smart meters?',
        a: 'For monthly-billed prepaid meters, the slab limits are one-third of the quarterly figures shown here, but the per-unit rates are the same.',
      },
      {
        q: 'Does WBSEDCL supply electricity to Kolkata?',
        a: 'No. Kolkata, Howrah and parts of North/South 24 Parganas and Hooghly are served by CESC Limited, a separate private licensee with its own WBERC-approved tariff. WBSEDCL covers the rest of West Bengal outside the CESC licence area.',
      },
      {
        q: 'How do I check or pay my WBSEDCL bill online?',
        a: 'Pay via the official WBSEDCL portal at portal.wbsedcl.in, using the "Online Payment" → "Quick Pay" option. For queries, call the 24×7 helpline 19121.',
      },
      {
        q: 'What is WBSEDCL, and when was it formed?',
        a: 'WBSEDCL (West Bengal State Electricity Distribution Company Ltd) was formed on 1 April 2007, when the West Bengal State Electricity Board (WBSEB, itself dating to 1955) was unbundled into WBSEDCL (distribution) and WBSETCL (transmission) under the state\'s power reform scheme.',
      },
    ],
    billTraps: [
      {
        title: "Kolkata isn't WBSEDCL — it's CESC",
        body: (
          <>
            If your bill is for a Kolkata, Howrah or nearby CESC-area address,
            you&apos;re on a different licensee with its own tariff — this
            calculator&apos;s WBSEDCL rates won&apos;t match your bill.
          </>
        ),
      },
      {
        title: 'Quarterly billing catches people off guard',
        body: (
          <>
            A &ldquo;small-looking&rdquo; 300-unit figure on this calculator is actually
            three months of usage, not one — check whether your bill covers
            one month or a full quarter before comparing numbers.
          </>
        ),
      },
      {
        title: 'MVCA moves every month, this estimate does not include it',
        body: (
          <>
            The Monthly Variable Cost Adjustment changes with fuel costs and
            isn&apos;t fixed like the slab rates, so your real bill will
            differ from this estimate by whatever MVCA applies that month.
          </>
        ),
      },
    ],
    aboutDiscom: [
      <>
        The West Bengal State Electricity Board (WBSEB) was formed in 1955.
        Under the state&apos;s 2007 Power Reform Scheme, it was unbundled on 1
        April 2007 into West Bengal State Electricity Distribution Company
        Ltd (WBSEDCL) for distribution and West Bengal State Electricity
        Transmission Company Ltd (WBSETCL) for transmission.
      </>,
      <>
        WBSEDCL distributes power across most of West Bengal, but not
        Kolkata: the city, Howrah and parts of North/South 24 Parganas and
        Hooghly are served by CESC Limited, a long-standing private
        distribution licensee with its own separate tariff.
      </>,
    ],
    coverageQA: {
      q: 'Does WBSEDCL supply electricity to Kolkata?',
      a: (
        <>
          No — Kolkata and its immediate surroundings (Howrah, and parts of
          North and South 24 Parganas and Hooghly) are served by CESC
          Limited, a separate private licensee. WBSEDCL covers the rest of
          West Bengal outside that area.
        </>
      ),
    },
    howToPay: {
      portalUrl: 'https://portal.wbsedcl.in/',
      portalLabel: 'portal.wbsedcl.in (official WBSEDCL portal)',
      helpline: '19121 (24×7)',
      steps: [
        'Visit the WBSEDCL portal and select "Online Payment" → "Quick Pay"',
        'Enter your Consumer ID to fetch your current bill',
        'Verify the amount and pay via UPI, card or net banking',
        'Save the payment confirmation for your records',
      ],
    },
    translations: {
      hi: {
        h1: 'WBSEDCL बिल कैलकुलेटर (पश्चिम बंगाल)',
        breadcrumbLabel: 'WBSEDCL बिल कैलकुलेटर',
        metaTitle: 'WBSEDCL बिल कैलकुलेटर 2026 — पश्चिम बंगाल बिजली बिल (त्रैमासिक)',
        metaDescription:
          'पश्चिम बंगाल के लिए अपना WBSEDCL बिजली बिल अनुमानित करें। त्रैमासिक बिलिंग, टेलीस्कोपिक स्लैब, ₹30/kVA फिक्स्ड चार्ज और MVCA सरचार्ज की व्याख्या।',
        intro: (
          <>
            पश्चिम बंगाल के लिए अपना WBSEDCL बिजली बिल अनुमानित करें। WBSEDCL
            असामान्य रूप से कई घरेलू उपभोक्ताओं को मासिक की बजाय हर तीन महीने
            में एक बार <strong>त्रैमासिक</strong> बिल करता है, साथ ही एक
            मासिक परिवर्तनशील सरचार्ज (MVCA) भी जुड़ता है।
          </>
        ),
        explainer: [
          {
            title: 'त्रैमासिक बिलिंग — बंगाल की एक खासियत',
            body: (
              <>
                ज़्यादातर भारतीय DISCOM मासिक या द्वि-मासिक बिल करते हैं;
                WBSEDCL की घरेलू अनुसूची एक <strong>त्रैमासिक</strong> (~90
                दिन) चक्र के लिए लिखी गई है, इसलिए स्लैब सीमाएं बड़ी हैं।
                यहां अपनी तीन महीने की यूनिट्स डालें; कैलकुलेटर एक
                मासिक-समतुल्य (कुल ÷ 3) दिखाता है। स्मार्ट प्रीपेड मीटर
                इनके एक-तिहाई के बराबर मासिक स्लैब इस्तेमाल करते हैं।
              </>
            ),
          },
          {
            title: 'MVCA — चलता हुआ सरचार्ज',
            body: (
              <>
                पश्चिम बंगाल एक{' '}
                <strong>मासिक परिवर्तनशील लागत समायोजन (MVCA)</strong> जोड़ता
                है जो ईंधन लागत को ट्रैक करने के लिए हर बिलिंग महीने बदलता
                है। क्योंकि यह बदलता रहता है, यह कैलकुलेटर इसे शामिल नहीं
                करता, इसलिए आपका असली बिल प्रचलित MVCA से अलग होगा।
              </>
            ),
          },
          {
            title: 'टेलीस्कोपिक स्लैब और फिक्स्ड चार्ज',
            body: (
              <>
                त्रैमासिक एनर्जी दरें 0–102 के लिए ₹4.10, 103–180 के लिए
                ₹5.34, 181–300 के लिए ₹6.15, 301–600 के लिए ₹6.65 और 600 से
                ऊपर ₹6.81 हैं, साथ ही ₹30 प्रति kVA प्रति माह का फिक्स्ड
                चार्ज (यहां ₹90 प्रति kW प्रति तिमाही)।
              </>
            ),
          },
        ],
        faqs: [
          { q: 'क्या WBSEDCL वाकई हर तीन महीने में बिल करता है?', a: 'हां। WBSEDCL की घरेलू टैरिफ अनुसूची एक त्रैमासिक चक्र के लिए लिखी गई है, इसलिए स्लैब सीमाएं बड़ी हैं। कैलकुलेटर आपके त्रैमासिक कुल को एक मासिक-समतुल्य में बदलता है।' },
          { q: 'मेरे पश्चिम बंगाल बिल पर MVCA क्या है?', a: 'MVCA एक मासिक परिवर्तनशील लागत समायोजन सरचार्ज है जो ईंधन लागत दर्शाने के लिए हर महीने बदलता है। यह इस अनुमान में शामिल नहीं है क्योंकि यह बदलता रहता है।' },
          { q: 'WBSEDCL फिक्स्ड चार्ज की गणना कैसे होती है?', a: 'यह आपके कनेक्टेड लोड के आधार पर ₹30 प्रति kVA प्रति माह है, जिसे यहां ₹90 प्रति kW प्रति तिमाही के रूप में मॉडल किया गया है।' },
          { q: 'प्रीपेड स्मार्ट मीटर का क्या?', a: 'मासिक-बिल वाले प्रीपेड मीटर के लिए, स्लैब सीमाएं यहां दिखाई गई त्रैमासिक आंकड़ों की एक-तिहाई हैं, लेकिन प्रति-यूनिट दरें वही हैं।' },
          { q: 'क्या WBSEDCL कोलकाता को बिजली सप्लाई करता है?', a: 'नहीं। कोलकाता, हावड़ा और उत्तर/दक्षिण 24 परगना तथा हुगली के कुछ हिस्से CESC लिमिटेड द्वारा सर्व किए जाते हैं, जो अपनी अलग WBERC-स्वीकृत टैरिफ वाली एक अलग निजी लाइसेंसधारी कंपनी है। WBSEDCL CESC लाइसेंस क्षेत्र के बाहर बाकी पश्चिम बंगाल को कवर करता है।' },
          { q: 'मैं अपना WBSEDCL बिल ऑनलाइन कैसे चेक या भुगतान करूं?', a: 'आधिकारिक WBSEDCL पोर्टल portal.wbsedcl.in पर "Online Payment" → "Quick Pay" विकल्प से भुगतान करें। सवालों के लिए, 24×7 हेल्पलाइन 19121 पर कॉल करें।' },
          { q: 'WBSEDCL क्या है, और इसका गठन कब हुआ?', a: 'WBSEDCL (पश्चिम बंगाल राज्य विद्युत वितरण कंपनी लिमिटेड) का गठन 1 अप्रैल 2007 को हुआ, जब पश्चिम बंगाल राज्य विद्युत बोर्ड (WBSEB, जो खुद 1955 से चला आ रहा था) को राज्य की बिजली सुधार योजना के तहत WBSEDCL (वितरण) और WBSETCL (ट्रांसमिशन) में विभाजित किया गया।' },
        ],
        billTraps: [
          {
            title: 'कोलकाता WBSEDCL नहीं है — यह CESC है',
            body: (
              <>
                अगर आपका बिल कोलकाता, हावड़ा या आसपास के CESC-क्षेत्र के पते
                के लिए है, तो आप एक अलग लाइसेंसधारी कंपनी पर हैं जिसकी अपनी
                टैरिफ है — इस कैलकुलेटर की WBSEDCL दरें आपके बिल से मेल नहीं
                खाएंगी।
              </>
            ),
          },
          {
            title: 'त्रैमासिक बिलिंग लोगों को चौंका देती है',
            body: (
              <>
                इस कैलकुलेटर पर एक &quot;छोटा दिखने वाला&quot; 300-यूनिट
                आंकड़ा असल में एक नहीं, तीन महीने का इस्तेमाल है — आंकड़ों
                की तुलना करने से पहले जांचें कि आपका बिल एक महीने का है या
                पूरी तिमाही का।
              </>
            ),
          },
          {
            title: 'MVCA हर महीने बदलता है, यह अनुमान इसे शामिल नहीं करता',
            body: (
              <>
                मासिक परिवर्तनशील लागत समायोजन ईंधन लागत के साथ बदलता है
                और स्लैब दरों की तरह तय नहीं है, इसलिए आपका असली बिल इस
                अनुमान से उस महीने लागू MVCA जितना अलग होगा।
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            पश्चिम बंगाल राज्य विद्युत बोर्ड (WBSEB) का गठन 1955 में हुआ
            था। राज्य की 2007 पावर रिफॉर्म स्कीम के तहत, इसे 1 अप्रैल 2007
            को पश्चिम बंगाल राज्य विद्युत वितरण कंपनी लिमिटेड (WBSEDCL)
            (वितरण के लिए) और पश्चिम बंगाल राज्य विद्युत ट्रांसमिशन कंपनी
            लिमिटेड (WBSETCL) (ट्रांसमिशन के लिए) में विभाजित किया गया।
          </>,
          <>
            WBSEDCL ज़्यादातर पश्चिम बंगाल में बिजली वितरित करता है, लेकिन
            कोलकाता में नहीं: शहर, हावड़ा और उत्तर/दक्षिण 24 परगना तथा
            हुगली के कुछ हिस्से CESC लिमिटेड द्वारा सर्व किए जाते हैं, जो
            अपनी अलग टैरिफ वाली एक पुरानी निजी वितरण लाइसेंसधारी कंपनी है।
          </>,
        ],
        coverageQA: {
          q: 'क्या WBSEDCL कोलकाता को बिजली सप्लाई करता है?',
          a: (
            <>
              नहीं — कोलकाता और इसके आसपास के इलाके (हावड़ा, और उत्तर तथा
              दक्षिण 24 परगना एवं हुगली के कुछ हिस्से) CESC लिमिटेड द्वारा
              सर्व किए जाते हैं, जो एक अलग निजी लाइसेंसधारी कंपनी है।
              WBSEDCL उस क्षेत्र के बाहर बाकी पश्चिम बंगाल को कवर करता है।
            </>
          ),
        },
        howToPay: {
          portalLabel: 'portal.wbsedcl.in (आधिकारिक WBSEDCL पोर्टल)',
          helpline: '19121 (24×7)',
          steps: [
            'WBSEDCL पोर्टल पर जाएं और "Online Payment" → "Quick Pay" चुनें',
            'अपना मौजूदा बिल पाने के लिए अपनी कंज़्यूमर ID डालें',
            'राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए भुगतान पुष्टिकरण सेव करें',
          ],
        },
      },
      bn: {
        h1: 'WBSEDCL বিল ক্যালকুলেটর (পশ্চিমবঙ্গ)',
        breadcrumbLabel: 'WBSEDCL বিল ক্যালকুলেটর',
        metaTitle: 'WBSEDCL বিল ক্যালকুলেটর ২০২৬ — পশ্চিমবঙ্গ বিদ্যুৎ বিল (ত্রৈমাসিক)',
        metaDescription:
          'পশ্চিমবঙ্গের জন্য আপনার WBSEDCL বিদ্যুৎ বিল হিসাব করুন। ত্রৈমাসিক বিলিং, টেলিস্কোপিক স্ল্যাব, ₹৩০/kVA স্থায়ী চার্জ এবং MVCA সারচার্জের ব্যাখ্যা।',
        intro: (
          <>
            পশ্চিমবঙ্গের জন্য আপনার WBSEDCL বিদ্যুৎ বিল হিসাব করুন। WBSEDCL
            অস্বাভাবিকভাবে অনেক গৃহস্থালি গ্রাহককে মাসিকের বদলে প্রতি তিন
            মাসে একবার <strong>ত্রৈমাসিক</strong> বিল করে, সঙ্গে একটি মাসিক
            পরিবর্তনশীল সারচার্জ (MVCA) যুক্ত থাকে।
          </>
        ),
        explainer: [
          {
            title: 'ত্রৈমাসিক বিলিং — বাংলার একটি বিশেষত্ব',
            body: (
              <>
                বেশিরভাগ ভারতীয় DISCOM মাসিক বা দ্বি-মাসিক বিল করে;
                WBSEDCL-এর গৃহস্থালি সময়সূচি একটি{' '}
                <strong>ত্রৈমাসিক</strong> (~৯০ দিন) চক্রের জন্য লেখা, তাই
                স্ল্যাবের সীমা বড়। এখানে আপনার তিন মাসের ইউনিট লিখুন;
                ক্যালকুলেটর একটি মাসিক-সমতুল্য (মোট ÷ ৩) দেখায়। স্মার্ট
                প্রিপেইড মিটার এর এক-তৃতীয়াংশ সমান মাসিক স্ল্যাব ব্যবহার
                করে।
              </>
            ),
          },
          {
            title: 'MVCA — চলমান সারচার্জ',
            body: (
              <>
                পশ্চিমবঙ্গ একটি{' '}
                <strong>মাসিক পরিবর্তনশীল খরচ সমন্বয় (MVCA)</strong> যোগ
                করে যা জ্বালানি খরচ অনুসরণ করতে প্রতি বিলিং মাসে পরিবর্তিত
                হয়। যেহেতু এটি পরিবর্তনশীল, এই ক্যালকুলেটর এটি অন্তর্ভুক্ত
                করে না, তাই আপনার আসল বিল প্রচলিত MVCA অনুযায়ী ভিন্ন হবে।
              </>
            ),
          },
          {
            title: 'টেলিস্কোপিক স্ল্যাব এবং স্থায়ী চার্জ',
            body: (
              <>
                ত্রৈমাসিক এনার্জি হার ০–১০২-এর জন্য ₹৪.১০, ১০৩–১৮০-এর জন্য
                ₹৫.৩৪, ১৮১–৩০০-এর জন্য ₹৬.১৫, ৩০১–৬০০-এর জন্য ₹৬.৬৫ এবং
                ৬০০-এর উপরে ₹৬.৮১, সঙ্গে প্রতি kVA প্রতি মাসে ₹৩০ স্থায়ী
                চার্জ (এখানে প্রতি kW প্রতি ত্রৈমাসিকে ₹৯০)।
              </>
            ),
          },
        ],
        faqs: [
          { q: 'WBSEDCL কি সত্যিই প্রতি তিন মাসে বিল করে?', a: 'হ্যাঁ। WBSEDCL-এর গৃহস্থালি ট্যারিফ সময়সূচি একটি ত্রৈমাসিক চক্রের জন্য লেখা, তাই স্ল্যাবের সীমা বড়। ক্যালকুলেটর আপনার ত্রৈমাসিক মোটকে একটি মাসিক-সমতুল্যে রূপান্তর করে।' },
          { q: 'আমার পশ্চিমবঙ্গ বিলে MVCA কী?', a: 'MVCA হল একটি মাসিক পরিবর্তনশীল খরচ সমন্বয় সারচার্জ যা জ্বালানি খরচ প্রতিফলিত করতে প্রতি মাসে পরিবর্তিত হয়। এটি এই হিসাবে অন্তর্ভুক্ত নয় কারণ এটি পরিবর্তনশীল।' },
          { q: 'WBSEDCL স্থায়ী চার্জ কীভাবে গণনা করা হয়?', a: 'এটি আপনার সংযুক্ত লোডের ভিত্তিতে প্রতি kVA প্রতি মাসে ₹৩০, যা এখানে প্রতি kW প্রতি ত্রৈমাসিকে ₹৯০ হিসাবে মডেল করা হয়েছে।' },
          { q: 'প্রিপেইড স্মার্ট মিটারের ক্ষেত্রে কী হয়?', a: 'মাসিক-বিল করা প্রিপেইড মিটারের জন্য, স্ল্যাবের সীমা এখানে দেখানো ত্রৈমাসিক পরিসংখ্যানের এক-তৃতীয়াংশ, কিন্তু প্রতি-ইউনিট হার একই।' },
          { q: 'WBSEDCL কি কলকাতায় বিদ্যুৎ সরবরাহ করে?', a: 'না। কলকাতা, হাওড়া এবং উত্তর/দক্ষিণ ২৪ পরগনা ও হুগলির কিছু অংশ CESC লিমিটেড দ্বারা পরিষেবা পায়, যা তার নিজস্ব WBERC-অনুমোদিত ট্যারিফ সহ একটি পৃথক বেসরকারি লাইসেন্সপ্রাপ্ত সংস্থা। WBSEDCL CESC লাইসেন্স এলাকার বাইরে বাকি পশ্চিমবঙ্গ কভার করে।' },
          { q: 'আমি কীভাবে অনলাইনে আমার WBSEDCL বিল চেক বা পরিশোধ করব?', a: 'অফিসিয়াল WBSEDCL পোর্টাল portal.wbsedcl.in-এ "Online Payment" → "Quick Pay" অপশন ব্যবহার করে পরিশোধ করুন। প্রশ্নের জন্য, ২৪×৭ হেল্পলাইন ১৯১২১-এ কল করুন।' },
          { q: 'WBSEDCL কী, এবং এটি কবে গঠিত হয়েছিল?', a: 'WBSEDCL (পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বিতরণ কোম্পানি লিমিটেড) ১ এপ্রিল ২০০৭-এ গঠিত হয়েছিল, যখন পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বোর্ড (WBSEB, যা নিজে ১৯৫৫ থেকে চলে আসছিল) রাজ্যের বিদ্যুৎ সংস্কার পরিকল্পনার অধীনে WBSEDCL (বিতরণ) এবং WBSETCL (ট্রান্সমিশন)-এ বিভক্ত হয়েছিল।' },
        ],
        billTraps: [
          {
            title: 'কলকাতা WBSEDCL নয় — এটি CESC',
            body: (
              <>
                যদি আপনার বিল কলকাতা, হাওড়া বা কাছাকাছি CESC-এলাকার
                ঠিকানার জন্য হয়, তাহলে আপনি একটি ভিন্ন লাইসেন্সপ্রাপ্ত
                সংস্থার অধীনে আছেন যার নিজস্ব ট্যারিফ আছে — এই
                ক্যালকুলেটরের WBSEDCL হার আপনার বিলের সাথে মিলবে না।
              </>
            ),
          },
          {
            title: 'ত্রৈমাসিক বিলিং মানুষকে অবাক করে দেয়',
            body: (
              <>
                এই ক্যালকুলেটরে একটি &quot;ছোট দেখতে&quot; ৩০০-ইউনিট
                সংখ্যা আসলে এক নয়, তিন মাসের ব্যবহার — সংখ্যা তুলনা করার
                আগে পরীক্ষা করুন আপনার বিল এক মাসের নাকি পুরো ত্রৈমাসিকের।
              </>
            ),
          },
          {
            title: 'MVCA প্রতি মাসে পরিবর্তিত হয়, এই হিসাবে এটি অন্তর্ভুক্ত নয়',
            body: (
              <>
                মাসিক পরিবর্তনশীল খরচ সমন্বয় জ্বালানি খরচের সাথে
                পরিবর্তিত হয় এবং স্ল্যাব হারের মতো স্থির নয়, তাই আপনার
                আসল বিল সেই মাসে প্রযোজ্য MVCA অনুযায়ী এই হিসাব থেকে
                ভিন্ন হবে।
              </>
            ),
          },
        ],
        aboutDiscom: [
          <>
            পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বোর্ড (WBSEB) ১৯৫৫ সালে গঠিত হয়েছিল।
            রাজ্যের ২০০৭ সালের পাওয়ার রিফর্ম স্কিমের অধীনে, এটি ১ এপ্রিল
            ২০০৭-এ পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বিতরণ কোম্পানি লিমিটেড
            (WBSEDCL) (বিতরণের জন্য) এবং পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ
            ট্রান্সমিশন কোম্পানি লিমিটেড (WBSETCL) (ট্রান্সমিশনের জন্য)
            বিভক্ত হয়েছিল।
          </>,
          <>
            WBSEDCL বেশিরভাগ পশ্চিমবঙ্গে বিদ্যুৎ বিতরণ করে, কিন্তু কলকাতায়
            নয়: শহর, হাওড়া এবং উত্তর/দক্ষিণ ২৪ পরগনা ও হুগলির কিছু অংশ
            CESC লিমিটেড দ্বারা পরিষেবা পায়, যা তার নিজস্ব পৃথক ট্যারিফ
            সহ একটি দীর্ঘস্থায়ী বেসরকারি বিতরণ লাইসেন্সপ্রাপ্ত সংস্থা।
          </>,
        ],
        coverageQA: {
          q: 'WBSEDCL কি কলকাতায় বিদ্যুৎ সরবরাহ করে?',
          a: (
            <>
              না — কলকাতা এবং তার আশেপাশের এলাকা (হাওড়া, এবং উত্তর ও
              দক্ষিণ ২৪ পরগনা ও হুগলির কিছু অংশ) CESC লিমিটেড দ্বারা
              পরিষেবা পায়, যা একটি পৃথক বেসরকারি লাইসেন্সপ্রাপ্ত সংস্থা।
              WBSEDCL সেই এলাকার বাইরে বাকি পশ্চিমবঙ্গ কভার করে।
            </>
          ),
        },
        howToPay: {
          portalLabel: 'portal.wbsedcl.in (অফিসিয়াল WBSEDCL পোর্টাল)',
          helpline: '১৯১২১ (২৪×৭)',
          steps: [
            'WBSEDCL পোর্টালে যান এবং "Online Payment" → "Quick Pay" নির্বাচন করুন',
            'আপনার বর্তমান বিল আনতে আপনার কনজিউমার আইডি লিখুন',
            'পরিমাণ যাচাই করুন এবং UPI, কার্ড বা নেট ব্যাংকিং দিয়ে পরিশোধ করুন',
            'আপনার রেকর্ডের জন্য পেমেন্ট নিশ্চিতকরণ সংরক্ষণ করুন',
          ],
        },
      },
    },
  },
  {
    slug: "gujarat-electricity-bill-calculator",
    discomCode: "MGVCL",
    h1: "Gujarat Electricity Bill Calculator",
    breadcrumbLabel: "Gujarat Bill Calculator",
    metaTitle: "Gujarat Electricity Bill Calculator 2026 — MGVCL",
    metaDescription: "Calculate your Gujarat electricity bill (Madhya Gujarat Vij Company Ltd (MGVCL, GERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Gujarat bills monthly with different urban and rural (RGP-Rural) rates.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['MSEDCL', 'JVVNL', 'MPCZ'],
    intro: "Estimate your Madhya Gujarat Vij Company Ltd (MGVCL, GERC) electricity bill for Gujarat. Gujarat bills monthly with different urban and rural (RGP-Rural) rates. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Urban vs rural rates (RGP vs RGP-Rural)", body: "Gujarat sets different domestic rates for urban (RGP) and rural (RGP-Rural, inside a Gram Panchayat) premises — rural homes pay lower per-unit rates and half the electricity duty. This calculator uses the urban RGP schedule." },
      { title: "How the Gujarat bill is calculated", body: "Gujarat domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹3.05 to ₹5.2/unit, each band charged at its own rate. A fixed charge of a flat ₹90/month applies." },
    ],
    faqs: [
      { q: "Is the Gujarat electricity tariff telescopic?", a: "Yes. Gujarat charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Gujarat domestic connection?", a: "The fixed charge is a flat ₹90/month." },
      { q: "How accurate is this Gujarat bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. FPPCA (monthly fuel surcharge) and electricity duty are not modelled here. Always confirm against your official MGVCL bill." },
      { q: "Does MGVCL supply electricity to Ahmedabad?", a: "No. Ahmedabad falls under Uttar Gujarat Vij Company Ltd (UGVCL), not MGVCL. MGVCL covers Vadodara and 12 districts of central Gujarat (Anand, Kheda, Panchmahal, Dahod, Chhota Udaipur and others) — a different, adjacent territory." },
      { q: "How do I check or pay my MGVCL bill online?", a: "Pay via the official MGVCL portal at mgvcl.com, using Quick Pay or by registering an account. For queries, call the toll-free helpline 1800-233-2670 or 19124." },
      { q: "What is MGVCL, and how did it form?", a: "The Gujarat Electricity Board (GEB) was reorganised by the Gujarat government into a generation company, a transmission company, and four distribution companies. Madhya Gujarat Vij Company Ltd (MGVCL) was incorporated on 15 September 2003 and became functional on 1 April 2005, as a subsidiary of the holding company Gujarat Urja Vikas Nigam Ltd (GUVNL)." },
    ],
    billTraps: [
      { title: "MGVCL is not statewide — Ahmedabad is UGVCL", body: "Gujarat has four separate distribution companies (MGVCL, UGVCL, PGVCL, DGVCL) under GUVNL. MGVCL covers Vadodara and central Gujarat; Ahmedabad, Surat and other cities are billed by a different company entirely." },
      { title: "Urban and rural rates genuinely differ", body: "Unlike most states, Gujarat sets a lower per-unit rate and half electricity duty for rural (RGP-Rural, inside a Gram Panchayat) premises versus urban (RGP) ones — the same consumption can cost less just for being in a rural area." },
      { title: "FPPCA surcharge isn't included in this estimate", body: "MGVCL adds a monthly Fuel & Power Purchase Cost Adjustment (FPPCA) that varies and is not modelled here, so your real bill will differ by that amount." },
    ],
    aboutDiscom: [
      "The Gujarat Electricity Board (GEB) was reorganised into a generation company (GSECL), a transmission company (GETCO), and four distribution companies under a holding company, Gujarat Urja Vikas Nigam Ltd (GUVNL). Madhya Gujarat Vij Company Ltd (MGVCL) was incorporated on 15 September 2003 and became operational on 1 April 2005.",
      "MGVCL serves Vadodara and 12 districts of central Gujarat. The other three distribution companies — UGVCL (north Gujarat, including Ahmedabad), PGVCL (Saurashtra) and DGVCL (south Gujarat, including Surat) — cover the rest of the state.",
    ],
    coverageQA: {
      q: "Does MGVCL supply electricity to Ahmedabad?",
      a: "No. Ahmedabad is served by Uttar Gujarat Vij Company Ltd (UGVCL), a separate GUVNL subsidiary. MGVCL's territory is Vadodara and central Gujarat — check which company's name appears on your bill before using this calculator.",
    },
    howToPay: {
      portalUrl: "https://www.mgvcl.com/Online_Payment_of_Bills",
      portalLabel: "mgvcl.com (official MGVCL portal)",
      helpline: "1800-233-2670 / 19124 (24×7)",
      steps: [
        "Visit the official MGVCL website and select Online Payment of Bills",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
    thresholdCallout: {
      title: "Urban vs rural rates",
      leftLabel: "Urban (RGP)",
      leftValue: "₹3.05–5.20/unit",
      rightLabel: "Rural (RGP-Rural)",
      rightValue: "₹2.65–4.90/unit",
      note: "Rural premises inside a Gram Panchayat pay lower per-unit rates across every slab, plus half the electricity duty of urban premises — the same consumption can cost meaningfully less depending on which side of the line your address falls.",
    },
    translations: {
      hi: {
        h1: 'गुजरात बिजली बिल कैलकुलेटर',
        breadcrumbLabel: 'गुजरात बिल कैलकुलेटर',
        metaTitle: 'गुजरात बिजली बिल कैलकुलेटर 2026 — MGVCL',
        metaDescription:
          'अपना गुजरात बिजली बिल (मध्य गुजरात विज कंपनी लिमिटेड (MGVCL, GERC)) कैलकुलेट करें। असली घरेलू स्लैब दरें, फिक्स्ड चार्ज और सब्सिडी, स्पष्ट ब्रेकडाउन के साथ। गुजरात मासिक बिल करता है, शहरी और ग्रामीण (RGP-Rural) के लिए अलग-अलग दरों के साथ।',
        intro:
          'गुजरात के लिए अपना मध्य गुजरात विज कंपनी लिमिटेड (MGVCL, GERC) बिजली बिल अनुमानित करें। गुजरात मासिक बिल करता है, शहरी और ग्रामीण (RGP-Rural) के लिए अलग-अलग दरों के साथ। नीचे अपनी यूनिट्स डालें, एक विस्तृत, स्लैब-दर-स्लैब अनुमान के लिए।',
        explainer: [
          { title: 'शहरी बनाम ग्रामीण दरें (RGP बनाम RGP-Rural)', body: 'गुजरात शहरी (RGP) और ग्रामीण (RGP-Rural, ग्राम पंचायत के भीतर) परिसरों के लिए अलग-अलग घरेलू दरें तय करता है — ग्रामीण घर कम प्रति-यूनिट दरें और आधी बिजली शुल्क चुकाते हैं। यह कैलकुलेटर शहरी RGP अनुसूची का इस्तेमाल करता है।' },
          { title: 'गुजरात बिल की गणना कैसे होती है', body: 'गुजरात घरेलू सप्लाई मासिक बिल होती है। खपत को ₹3.05 से ₹5.2/यूनिट तक टेलीस्कोपिक स्लैब में बांटा जाता है, हर बैंड अपनी दर पर चार्ज होता है। ₹90/माह का एक फ्लैट फिक्स्ड चार्ज लागू होता है।' },
        ],
        faqs: [
          { q: 'क्या गुजरात बिजली टैरिफ टेलीस्कोपिक है?', a: 'हां। गुजरात टेलीस्कोपिक रूप से चार्ज करता है: हर स्लैब अपनी दर पर बिल होता है, इसलिए ऊपर के स्लैब पर जाने से आपकी सस्ती यूनिट्स की दोबारा कीमत नहीं लगती।' },
          { q: 'गुजरात घरेलू कनेक्शन के लिए फिक्स्ड चार्ज क्या है?', a: 'फिक्स्ड चार्ज एक फ्लैट ₹90/माह है।' },
          { q: 'यह गुजरात बिल अनुमान कितना सटीक है?', a: 'यह प्रकाशित घरेलू स्लैब दरों का इस्तेमाल करता है और एक करीबी अनुमान है, बिलिंग-ग्रेड आंकड़ा नहीं। FPPCA (मासिक ईंधन सरचार्ज) और बिजली शुल्क यहां मॉडल नहीं किए गए हैं। हमेशा अपने आधिकारिक MGVCL बिल से पुष्टि करें।' },
          { q: 'क्या MGVCL अहमदाबाद को बिजली सप्लाई करता है?', a: 'नहीं। अहमदाबाद उत्तर गुजरात विज कंपनी लिमिटेड (UGVCL) के अंतर्गत आता है, MGVCL के नहीं। MGVCL वडोदरा और मध्य गुजरात के 12 ज़िलों (आनंद, खेड़ा, पंचमहल, दाहोद, छोटा उदयपुर और अन्य) को कवर करता है — एक अलग, सटा हुआ क्षेत्र।' },
          { q: 'मैं अपना MGVCL बिल ऑनलाइन कैसे चेक या भुगतान करूं?', a: 'आधिकारिक MGVCL पोर्टल mgvcl.com पर Quick Pay से या अकाउंट रजिस्टर करके भुगतान करें। सवालों के लिए टोल-फ्री हेल्पलाइन 1800-233-2670 या 19124 पर कॉल करें।' },
          { q: 'MGVCL क्या है, और इसका गठन कैसे हुआ?', a: 'गुजरात सरकार ने गुजरात इलेक्ट्रिसिटी बोर्ड (GEB) को एक जनरेशन कंपनी, एक ट्रांसमिशन कंपनी, और चार डिस्ट्रिब्यूशन कंपनियों में पुनर्गठित किया। मध्य गुजरात विज कंपनी लिमिटेड (MGVCL) को 15 सितंबर 2003 को स्थापित किया गया और यह 1 अप्रैल 2005 से होल्डिंग कंपनी गुजरात ऊर्जा विकास निगम लिमिटेड (GUVNL) की सहायक कंपनी के रूप में कार्यशील हुई।' },
        ],
        billTraps: [
          { title: 'MGVCL पूरे राज्य में नहीं है — अहमदाबाद UGVCL है', body: 'गुजरात में GUVNL के अंतर्गत चार अलग डिस्ट्रिब्यूशन कंपनियां हैं (MGVCL, UGVCL, PGVCL, DGVCL)। MGVCL वडोदरा और मध्य गुजरात को कवर करता है; अहमदाबाद, सूरत और अन्य शहर पूरी तरह अलग कंपनी द्वारा बिल किए जाते हैं।' },
          { title: 'शहरी और ग्रामीण दरें वाकई अलग हैं', body: 'ज़्यादातर राज्यों के विपरीत, गुजरात ग्रामीण (RGP-Rural, ग्राम पंचायत के भीतर) परिसरों के लिए शहरी (RGP) की तुलना में कम प्रति-यूनिट दर और आधा बिजली शुल्क तय करता है — सिर्फ ग्रामीण क्षेत्र में होने से वही खपत कम खर्चीली हो सकती है।' },
          { title: 'FPPCA सरचार्ज इस अनुमान में शामिल नहीं है', body: 'MGVCL एक मासिक ईंधन और बिजली खरीद लागत समायोजन (FPPCA) जोड़ता है जो बदलता रहता है और यहां मॉडल नहीं किया गया है, इसलिए आपका असली बिल उस राशि से अलग होगा।' },
        ],
        aboutDiscom: [
          'गुजरात इलेक्ट्रिसिटी बोर्ड (GEB) को एक जनरेशन कंपनी (GSECL), एक ट्रांसमिशन कंपनी (GETCO), और एक होल्डिंग कंपनी, गुजरात ऊर्जा विकास निगम लिमिटेड (GUVNL) के तहत चार डिस्ट्रिब्यूशन कंपनियों में पुनर्गठित किया गया। मध्य गुजरात विज कंपनी लिमिटेड (MGVCL) को 15 सितंबर 2003 को स्थापित किया गया और यह 1 अप्रैल 2005 से कार्यशील हुई।',
          'MGVCL वडोदरा और मध्य गुजरात के 12 ज़िलों को सर्व करता है। बाकी तीन डिस्ट्रिब्यूशन कंपनियां — UGVCL (उत्तर गुजरात, अहमदाबाद सहित), PGVCL (सौराष्ट्र) और DGVCL (दक्षिण गुजरात, सूरत सहित) — बाकी राज्य को कवर करती हैं।',
        ],
        coverageQA: {
          q: 'क्या MGVCL अहमदाबाद को बिजली सप्लाई करता है?',
          a: 'नहीं। अहमदाबाद उत्तर गुजरात विज कंपनी लिमिटेड (UGVCL) द्वारा सर्व किया जाता है, जो एक अलग GUVNL सहायक कंपनी है। MGVCL का क्षेत्र वडोदरा और मध्य गुजरात है — यह कैलकुलेटर इस्तेमाल करने से पहले जांच लें कि आपके बिल पर किस कंपनी का नाम है।',
        },
        howToPay: {
          portalLabel: 'mgvcl.com (आधिकारिक MGVCL पोर्टल)',
          helpline: '1800-233-2670 / 19124 (24×7)',
          steps: [
            'आधिकारिक MGVCL वेबसाइट पर जाएं और Online Payment of Bills चुनें',
            'अपना मौजूदा बिल पाने के लिए अपना कंज़्यूमर नंबर डालें',
            'राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए भुगतान रसीद सेव करें',
          ],
        },
        thresholdCallout: {
          title: 'शहरी बनाम ग्रामीण दरें',
          leftLabel: 'शहरी (RGP)',
          leftValue: '₹3.05–5.20/यूनिट',
          rightLabel: 'ग्रामीण (RGP-Rural)',
          rightValue: '₹2.65–4.90/यूनिट',
          note: 'ग्राम पंचायत के भीतर ग्रामीण परिसर हर स्लैब में कम प्रति-यूनिट दरें चुकाते हैं, साथ ही शहरी परिसरों की तुलना में आधा बिजली शुल्क — आपके पते की स्थिति के आधार पर वही खपत काफी कम खर्चीली हो सकती है।',
        },
      },
      gu: {
        h1: 'ગુજરાત વીજળી બિલ કેલ્ક્યુલેટર',
        breadcrumbLabel: 'ગુજરાત બિલ કેલ્ક્યુલેટર',
        metaTitle: 'ગુજરાત વીજળી બિલ કેલ્ક્યુલેટર 2026 — MGVCL',
        metaDescription:
          'તમારું ગુજરાત વીજળી બિલ (મધ્ય ગુજરાત વીજ કંપની લિમિટેડ (MGVCL, GERC)) ગણો. વાસ્તવિક ઘરેલુ સ્લેબ દરો, ફિક્સ્ડ ચાર્જ અને સબસિડી, સ્પષ્ટ બ્રેકડાઉન સાથે. ગુજરાત માસિક બિલ કરે છે, શહેરી અને ગ્રામીણ (RGP-Rural) માટે અલગ-અલગ દરો સાથે.',
        intro:
          'ગુજરાત માટે તમારું મધ્ય ગુજરાત વીજ કંપની લિમિટેડ (MGVCL, GERC) વીજળી બિલ અંદાજો. ગુજરાત માસિક બિલ કરે છે, શહેરી અને ગ્રામીણ (RGP-Rural) માટે અલગ-અલગ દરો સાથે. નીચે તમારા યુનિટ દાખલ કરો, વિગતવાર, સ્લેબ-બાય-સ્લેબ અંદાજ માટે.',
        explainer: [
          { title: 'શહેરી વિ ગ્રામીણ દરો (RGP વિ RGP-Rural)', body: 'ગુજરાત શહેરી (RGP) અને ગ્રામીણ (RGP-Rural, ગ્રામ પંચાયતની અંદર) જગ્યાઓ માટે અલગ-અલગ ઘરેલુ દરો નક્કી કરે છે — ગ્રામીણ ઘરો ઓછા પ્રતિ-યુનિટ દર અને અડધી વીજળી ડ્યુટી ચૂકવે છે. આ કેલ્ક્યુલેટર શહેરી RGP અનુસૂચિનો ઉપયોગ કરે છે.' },
          { title: 'ગુજરાત બિલની ગણતરી કેવી રીતે થાય છે', body: 'ગુજરાત ઘરેલુ પુરવઠો માસિક બિલ થાય છે. વપરાશને ₹3.05 થી ₹5.2/યુનિટ સુધીના ટેલિસ્કોપિક સ્લેબમાં વહેંચવામાં આવે છે, દરેક બેન્ડ પોતાના દરે ચાર્જ થાય છે. ₹90/મહિનાનો ફ્લેટ ફિક્સ્ડ ચાર્જ લાગુ પડે છે.' },
        ],
        faqs: [
          { q: 'શું ગુજરાત વીજળી ટેરિફ ટેલિસ્કોપિક છે?', a: 'હા. ગુજરાત ટેલિસ્કોપિક રીતે ચાર્જ કરે છે: દરેક સ્લેબ પોતાના દરે બિલ થાય છે, તેથી ઉપરના સ્લેબમાં જવાથી તમારા સસ્તા યુનિટની ફરીથી કિંમત નથી લાગતી.' },
          { q: 'ગુજરાત ઘરેલુ જોડાણ માટે ફિક્સ્ડ ચાર્જ શું છે?', a: 'ફિક્સ્ડ ચાર્જ ફ્લેટ ₹90/મહિનો છે.' },
          { q: 'આ ગુજરાત બિલ અંદાજ કેટલો ચોક્કસ છે?', a: 'તે પ્રકાશિત ઘરેલુ સ્લેબ દરોનો ઉપયોગ કરે છે અને નજીકનો અંદાજ છે, બિલિંગ-ગ્રેડ આંકડો નથી. FPPCA (માસિક ઇંધણ સરચાર્જ) અને વીજળી ડ્યુટી અહીં મોડેલ કરેલા નથી. હંમેશા તમારા સત્તાવાર MGVCL બિલ સામે ખાતરી કરો.' },
          { q: 'શું MGVCL અમદાવાદને વીજળી પૂરી પાડે છે?', a: 'ના. અમદાવાદ ઉત્તર ગુજરાત વીજ કંપની લિમિટેડ (UGVCL) હેઠળ આવે છે, MGVCL હેઠળ નહીં. MGVCL વડોદરા અને મધ્ય ગુજરાતના 12 જિલ્લાઓ (આણંદ, ખેડા, પંચમહાલ, દાહોદ, છોટા ઉદેપુર અને અન્ય) આવરી લે છે — એક અલગ, અડીને આવેલો વિસ્તાર.' },
          { q: 'હું મારું MGVCL બિલ ઓનલાઇન કેવી રીતે ચકાસું અથવા ચૂકવું?', a: 'સત્તાવાર MGVCL પોર્ટલ mgvcl.com પર Quick Pay દ્વારા અથવા એકાઉન્ટ રજિસ્ટર કરીને ચૂકવો. પ્રશ્નો માટે ટોલ-ફ્રી હેલ્પલાઇન 1800-233-2670 અથવા 19124 પર કૉલ કરો.' },
          { q: 'MGVCL શું છે, અને તે કેવી રીતે રચાયું?', a: 'ગુજરાત સરકારે ગુજરાત ઇલેક્ટ્રિસિટી બોર્ડ (GEB)ને એક જનરેશન કંપની, એક ટ્રાન્સમિશન કંપની, અને ચાર ડિસ્ટ્રિબ્યુશન કંપનીઓમાં પુનર્ગઠિત કર્યું. મધ્ય ગુજરાત વીજ કંપની લિમિટેડ (MGVCL) ની સ્થાપના 15 સપ્ટેમ્બર 2003ના રોજ થઈ અને તે 1 એપ્રિલ 2005થી હોલ્ડિંગ કંપની ગુજરાત ઊર્જા વિકાસ નિગમ લિમિટેડ (GUVNL)ની પેટાકંપની તરીકે કાર્યરત થઈ.' },
        ],
        billTraps: [
          { title: 'MGVCL આખા રાજ્યમાં નથી — અમદાવાદ UGVCL છે', body: 'ગુજરાતમાં GUVNL હેઠળ ચાર અલગ ડિસ્ટ્રિબ્યુશન કંપનીઓ છે (MGVCL, UGVCL, PGVCL, DGVCL). MGVCL વડોદરા અને મધ્ય ગુજરાત આવરી લે છે; અમદાવાદ, સુરત અને અન્ય શહેરો સંપૂર્ણપણે અલગ કંપની દ્વારા બિલ કરવામાં આવે છે.' },
          { title: 'શહેરી અને ગ્રામીણ દરો ખરેખર અલગ છે', body: 'મોટાભાગના રાજ્યોથી વિપરીત, ગુજરાત ગ્રામીણ (RGP-Rural, ગ્રામ પંચાયતની અંદર) જગ્યાઓ માટે શહેરી (RGP) કરતાં ઓછો પ્રતિ-યુનિટ દર અને અડધી વીજળી ડ્યુટી નક્કી કરે છે — ફક્ત ગ્રામીણ વિસ્તારમાં હોવાને કારણે એ જ વપરાશ ઓછો ખર્ચાળ થઈ શકે છે.' },
          { title: 'FPPCA સરચાર્જ આ અંદાજમાં સામેલ નથી', body: 'MGVCL એક માસિક ઇંધણ અને વીજ ખરીદી ખર્ચ સમાયોજન (FPPCA) ઉમેરે છે જે બદલાતું રહે છે અને અહીં મોડેલ કરેલું નથી, તેથી તમારું વાસ્તવિક બિલ તે રકમથી અલગ હશે.' },
        ],
        aboutDiscom: [
          'ગુજરાત ઇલેક્ટ્રિસિટી બોર્ડ (GEB)ને એક જનરેશન કંપની (GSECL), એક ટ્રાન્સમિશન કંપની (GETCO), અને એક હોલ્ડિંગ કંપની, ગુજરાત ઊર્જા વિકાસ નિગમ લિમિટેડ (GUVNL) હેઠળ ચાર ડિસ્ટ્રિબ્યુશન કંપનીઓમાં પુનર્ગઠિત કરવામાં આવ્યું. મધ્ય ગુજરાત વીજ કંપની લિમિટેડ (MGVCL) ની સ્થાપના 15 સપ્ટેમ્બર 2003ના રોજ થઈ અને તે 1 એપ્રિલ 2005થી કાર્યરત થઈ.',
          'MGVCL વડોદરા અને મધ્ય ગુજરાતના 12 જિલ્લાઓને સેવા આપે છે. બાકીની ત્રણ ડિસ્ટ્રિબ્યુશન કંપનીઓ — UGVCL (ઉત્તર ગુજરાત, અમદાવાદ સહિત), PGVCL (સૌરાષ્ટ્ર) અને DGVCL (દક્ષિણ ગુજરાત, સુરત સહિત) — બાકીના રાજ્યને આવરી લે છે.',
        ],
        coverageQA: {
          q: 'શું MGVCL અમદાવાદને વીજળી પૂરી પાડે છે?',
          a: 'ના. અમદાવાદ ઉત્તર ગુજરાત વીજ કંપની લિમિટેડ (UGVCL) દ્વારા સેવા અપાય છે, જે એક અલગ GUVNL પેટાકંપની છે. MGVCLનો વિસ્તાર વડોદરા અને મધ્ય ગુજરાત છે — આ કેલ્ક્યુલેટરનો ઉપયોગ કરતા પહેલા તપાસો કે તમારા બિલ પર કઈ કંપનીનું નામ છે.',
        },
        howToPay: {
          portalLabel: 'mgvcl.com (સત્તાવાર MGVCL પોર્ટલ)',
          helpline: '1800-233-2670 / 19124 (24×7)',
          steps: [
            'સત્તાવાર MGVCL વેબસાઇટ પર જાઓ અને Online Payment of Bills પસંદ કરો',
            'તમારું વર્તમાન બિલ મેળવવા માટે તમારો કન્ઝ્યુમર નંબર દાખલ કરો',
            'રકમની ખાતરી કરો અને UPI, કાર્ડ અથવા નેટ બેન્કિંગ દ્વારા ચૂકવો',
            'તમારા રેકોર્ડ માટે ચુકવણી રસીદ સાચવો',
          ],
        },
        thresholdCallout: {
          title: 'શહેરી વિ ગ્રામીણ દરો',
          leftLabel: 'શહેરી (RGP)',
          leftValue: '₹3.05–5.20/યુનિટ',
          rightLabel: 'ગ્રામીણ (RGP-Rural)',
          rightValue: '₹2.65–4.90/યુનિટ',
          note: 'ગ્રામ પંચાયતની અંદરની ગ્રામીણ જગ્યાઓ દરેક સ્લેબમાં ઓછા પ્રતિ-યુનિટ દર ચૂકવે છે, સાથે શહેરી જગ્યાઓ કરતાં અડધી વીજળી ડ્યુટી — તમારા સરનામાની સ્થિતિના આધારે એ જ વપરાશ નોંધપાત્ર રીતે ઓછો ખર્ચાળ થઈ શકે છે.',
        },
      },
    },
  },
  {
    slug: "rajasthan-electricity-bill-calculator",
    discomCode: "JVVNL",
    h1: "Rajasthan Electricity Bill Calculator",
    breadcrumbLabel: "Rajasthan Bill Calculator",
    metaTitle: "Rajasthan Electricity Bill Calculator 2026 — JVVNL",
    metaDescription: "Calculate your Rajasthan electricity bill (Jaipur Vidyut Vitran Nigam Ltd (JVVNL, RERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Rajasthan bills monthly with a high ₹275/kW fixed charge.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['MGVCL', 'UPPCL', 'UHBVN'],
    intro: "Estimate your Jaipur Vidyut Vitran Nigam Ltd (JVVNL, RERC) electricity bill for Rajasthan. Rajasthan bills monthly with a high ₹275/kW fixed charge. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A high per-kW fixed charge", body: "Rajasthan levies one of India’s steepest domestic fixed charges at around ₹275 per kW of sanctioned load per month, so a 2 kW connection pays roughly ₹550 in fixed charges before any energy is billed. The same RERC schedule applies to JVVNL, AVVNL and JdVVNL." },
      { title: "How the Rajasthan bill is calculated", body: "Rajasthan domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹4.25 to ₹9.5/unit, each band charged at its own rate. A fixed charge of ₹275 per kW of sanctioned load applies, and a ₹0.22/unit fuel/variable-cost surcharge." },
    ],
    faqs: [
      { q: "Is the Rajasthan electricity tariff telescopic?", a: "Yes. Rajasthan charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Rajasthan domestic connection?", a: "The fixed charge is ₹275 per kW of sanctioned load." },
      { q: "How accurate is this Rajasthan bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Rajasthan’s per-unit electricity duty (~40 paise/unit) and urban cess are not modelled here. Always confirm against your official JVVNL bill." },
      { q: "Does JVVNL supply electricity to all of Rajasthan?", a: "No. JVVNL covers Jaipur and roughly a dozen eastern districts (including Dausa, Alwar, Bharatpur, Kota, Bundi and Sawai Madhopur). The rest of the state is split between AVVNL (Ajmer, central/southern Rajasthan) and JdVVNL (Jodhpur, western Rajasthan) — all three follow the same RERC tariff." },
      { q: "How do I check or pay my JVVNL bill online?", a: "Pay via the official energy.rajasthan.gov.in/jvvnl portal. For queries or outages, call the 24×7 helpline 1912 or 1800-180-6507." },
      { q: "What is JVVNL, and how did it form?", a: "JVVNL (Jaipur Vidyut Vitran Nigam Ltd) was incorporated on 19 June 2000, when the Rajasthan State Electricity Board (RSEB) was unbundled into separate generation, transmission and three regional distribution companies — JVVNL, AVVNL and JdVVNL." },
    ],
    billTraps: [
      { title: "JVVNL is not statewide", body: "Rajasthan has three separate distribution companies by region — JVVNL (east, around Jaipur), AVVNL (central/south, around Ajmer) and JdVVNL (west, around Jodhpur). If your address is outside JVVNL's districts, your actual discom and billing portal differ, even though the tariff is the same." },
      { title: "The fixed charge is unusually steep", body: "At ₹275 per kW of sanctioned load, a modest 2 kW household connection pays around ₹550 in fixed charges alone each month, before a single unit is billed — among the highest fixed charges of any Indian state." },
      { title: "Electricity duty and urban cess aren't in this estimate", body: "Rajasthan's roughly 40 paise/unit electricity duty and an urban cess are not modelled here, so your real JVVNL bill will run a little higher than this calculator shows." },
    ],
    aboutDiscom: [
      "The Rajasthan State Electricity Board (RSEB) was unbundled on 19 June 2000 into separate generation, transmission and distribution entities. Distribution was further split by region into three companies: Jaipur Vidyut Vitran Nigam Ltd (JVVNL) for the east, Ajmer Vidyut Vitran Nigam Ltd (AVVNL) for the central/south, and Jodhpur Vidyut Vitran Nigam Ltd (JdVVNL) for the west.",
      "JVVNL serves Jaipur and around a dozen eastern districts — including Dausa, Alwar, Bharatpur, Kota, Bundi, Baran, Jhalawar, Sawai Madhopur and Karauli. All three Rajasthan discoms bill on the same RERC-approved tariff.",
    ],
    coverageQA: {
      q: "Does JVVNL supply electricity to all of Rajasthan?",
      a: "No. JVVNL covers Jaipur and the eastern districts of Rajasthan. Central and southern Rajasthan (around Ajmer) is served by AVVNL, and western Rajasthan (around Jodhpur) by JdVVNL — all three use the same RERC tariff shown on this page, but bill separately.",
    },
    howToPay: {
      portalUrl: "https://energy.rajasthan.gov.in/jvvnl",
      portalLabel: "energy.rajasthan.gov.in/jvvnl (official JVVNL portal)",
      helpline: "1912 / 1800-180-6507 (24×7)",
      steps: [
        "Visit the official JVVNL portal",
        "Enter your K-Number (Consumer ID) to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "punjab-electricity-bill-calculator",
    discomCode: "PSPCL",
    h1: "Punjab Electricity Bill Calculator",
    breadcrumbLabel: "Punjab Bill Calculator",
    metaTitle: "Punjab Electricity Bill Calculator 2026 — PSPCL",
    metaDescription: "Calculate your Punjab electricity bill (Punjab State Power Corporation Ltd (PSPCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Punjab offers up to 300 free units a month to domestic consumers.",
    exampleUnits: 250,
    exampleEligible: false,
    neighboringDiscoms: ['UHBVN', 'JVVNL', 'CED'],
    intro: "Estimate your Punjab State Power Corporation Ltd (PSPCL) electricity bill for Punjab. Punjab offers up to 300 free units a month to domestic consumers. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "300 free units a month", body: "Punjab gives eligible domestic households up to 300 units of free electricity every month, which zeroes out the bill for most families. Note the scheme has a threshold — exceeding it in a cycle can make the whole bill payable — and PSPCL’s per-unit rate also varies by sanctioned load band." },
      { title: "How the Punjab bill is calculated", body: "Punjab domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹3.49 to ₹7.3/unit, each band charged at its own rate. A fixed charge of a flat ₹120/month applies." },
    ],
    faqs: [
      { q: "Is the Punjab electricity tariff telescopic?", a: "Yes. Punjab charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Punjab domestic connection?", a: "The fixed charge is a flat ₹120/month." },
      { q: "How accurate is this Punjab bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. PSPCL bills bi-monthly in practice and rates vary by load band; this uses a representative monthly schedule. Always confirm against your official PSPCL bill." },
      { q: "Does PSPCL cover all of Punjab?", a: "Yes — unlike Rajasthan, Gujarat or UP, Punjab has a single distribution company. PSPCL covers the entire state." },
      { q: "How do I check or pay my PSPCL bill online?", a: "Pay via the official portal at billpayment.pspcl.in or the PSPCL mobile app. For queries or outages, call the 24×7 helpline 1912." },
      { q: "What is PSPCL, and how did it form?", a: "PSPCL (Punjab State Power Corporation Ltd) was incorporated on 16 April 2010, when the Punjab State Electricity Board (PSEB) was unbundled into PSPCL (generation and distribution) and PSTCL (transmission)." },
    ],
    billTraps: [
      { title: "300 free units isn't unconditional", body: "The scheme has an eligibility threshold; exceeding it in a billing cycle can make the entire bill payable rather than just the units above 300 — check your account's eligibility status rather than assuming coverage." },
      { title: "The per-unit rate varies by sanctioned load band", body: "PSPCL's slab rates differ depending on your connection's load category (up to 2 kW, 2–7 kW, 7–20 kW), so two households using the same units can be billed differently based on sanctioned load alone." },
      { title: "Billing is bi-monthly in practice", body: "This calculator uses a representative monthly schedule, but many PSPCL domestic bills are actually issued every two months — check your bill's actual period before comparing to this estimate." },
    ],
    aboutDiscom: [
      "The Punjab State Electricity Board (PSEB) was unbundled on 16 April 2010 into Punjab State Power Corporation Ltd (PSPCL), which took over generation and distribution, and Punjab State Transmission Corporation Ltd (PSTCL), which took over transmission and state load dispatch.",
      "Unlike several neighbouring states, Punjab was not further split by region — PSPCL is the sole distribution company for the entire state.",
    ],
    coverageQA: {
      q: "Does PSPCL supply electricity to all of Punjab?",
      a: "Yes. PSPCL is Punjab's single, statewide distribution company — there is no regional split like Rajasthan's three discoms or Uttar Pradesh's five.",
    },
    howToPay: {
      portalUrl: "https://billpayment.pspcl.in/",
      portalLabel: "billpayment.pspcl.in (official PSPCL portal)",
      helpline: "1912 (24×7)",
      steps: [
        "Visit the official PSPCL bill payment portal or app",
        "Enter your Account/Consumer number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
    thresholdCallout: {
      title: "The 300-unit free-power line",
      leftLabel: "Within eligibility",
      leftValue: "Free (up to 300u)",
      rightLabel: "Exceed the threshold",
      rightValue: "Full bill may apply",
      note: "Eligible domestic households get up to 300 free units a month, but exceeding the scheme's threshold in a billing cycle can make the entire bill payable — not just the units above 300. Confirm your eligibility status rather than assuming coverage.",
    },
  },
  {
    slug: "delhi-electricity-bill-calculator",
    discomCode: "BRPL",
    h1: "Delhi Electricity Bill Calculator",
    breadcrumbLabel: "Delhi Bill Calculator",
    metaTitle: "Delhi Electricity Bill Calculator 2026 — BRPL",
    metaDescription: "Calculate your Delhi electricity bill (BSES Rajdhani Power Ltd (BRPL, DERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Delhi gives up to 200 free units (opt-in) across BRPL, BYPL and TPDDL.",
    exampleUnits: 400,
    exampleEligible: false,
    neighboringDiscoms: ['UHBVN', 'UPPCL', 'PSPCL'],
    intro: "Estimate your BSES Rajdhani Power Ltd (BRPL, DERC) electricity bill for Delhi. Delhi gives up to 200 free units (opt-in) across BRPL, BYPL and TPDDL. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Up to 200 free units, then a PPAC surcharge", body: "Delhi gives opted-in domestic consumers up to 200 free units a month and half-price power for 201–400 units. But bills also carry a Power Purchase Adjustment Cost (PPAC) surcharge of roughly 30% on energy charges. All three discoms — BRPL, BYPL and TPDDL — follow the same DERC schedule." },
      { title: "How the Delhi bill is calculated", body: "Delhi domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹3 to ₹8/unit, each band charged at its own rate. A fixed charge of ₹100 per kW of sanctioned load applies." },
    ],
    faqs: [
      { q: "Is the Delhi electricity tariff telescopic?", a: "Yes. Delhi charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Delhi domestic connection?", a: "The fixed charge is ₹100 per kW of sanctioned load." },
      { q: "How accurate is this Delhi bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. The PPAC surcharge (~30% of energy charge) is not modelled, so real Delhi bills above the free tier run higher. Always confirm against your official BRPL bill." },
      { q: "Does BRPL supply all of Delhi?", a: "No. BRPL covers South and West Delhi only (around 30 lakh consumers across areas like Dwarka, Janakpuri, Saket, Vasant Kunj and Najafgarh). BSES Yamuna Power Ltd (BYPL) covers East and Central Delhi, and Tata Power Delhi Distribution Ltd (TPDDL) covers North and North-West Delhi." },
      { q: "How do I check or pay my BRPL bill online?", a: "Pay via the official BSES Delhi portal at bsesdelhi.com (BRPL section), or the BSES app. For queries, call the 24×7 toll-free helpline 19123." },
      { q: "What is BRPL, and how did it form?", a: "In 2002, the state-owned Delhi Vidyut Board (DVB) was unbundled and its distribution business privatised into three companies: BSES Rajdhani Power Ltd (BRPL) for South/West Delhi, BSES Yamuna Power Ltd (BYPL) for East/Central Delhi, and Tata Power Delhi Distribution Ltd (TPDDL, then NDPL) for North/North-West Delhi." },
    ],
    billTraps: [
      { title: "BRPL is not all of Delhi", body: "BRPL bills only South and West Delhi. If your area is East, Central, North or North-West Delhi, your actual discom is BYPL or TPDDL, which may have different tariffs and processes even under the same DERC schedule." },
      { title: "The PPAC surcharge isn't in this estimate", body: "Delhi's Power Purchase Adjustment Cost (PPAC) surcharge adds roughly 30% on top of energy charges and is not modelled here, so your real bill — above the free-unit tier — will run meaningfully higher than this calculator shows." },
      { title: "The free-unit benefit needs opting in", body: "The up-to-200-free-units scheme is not automatic — eligible consumers must be opted in on their account. Check your latest bill to confirm the subsidy is actually being applied." },
    ],
    aboutDiscom: [
      "The Delhi Vidyut Board (DVB), a state-owned integrated utility, was unbundled in 2002 after years of heavy technical and commercial losses. Its distribution business was privatised into three companies: BSES Rajdhani Power Ltd (BRPL), BSES Yamuna Power Ltd (BYPL), and Tata Power Delhi Distribution Ltd (TPDDL, originally NDPL).",
      "BRPL serves South and West Delhi — about 30 lakh consumers across areas including Dwarka, Janakpuri, Saket, Vasant Kunj, R.K. Puram and Najafgarh — while BYPL and TPDDL cover the rest of the capital.",
    ],
    coverageQA: {
      q: "Does BRPL supply electricity to all of Delhi?",
      a: "No. BRPL covers South and West Delhi only. East and Central Delhi are served by BSES Yamuna Power Ltd (BYPL), and North/North-West Delhi by Tata Power Delhi Distribution Ltd (TPDDL). All three follow the same DERC tariff shown on this page, but billing and customer service are separate.",
    },
    howToPay: {
      portalUrl: "https://www.bsesdelhi.com/web/brpl",
      portalLabel: "bsesdelhi.com (official BSES Rajdhani portal)",
      helpline: "19123 (24×7)",
      steps: [
        "Visit the BSES Delhi portal and select the BRPL section",
        "Enter your CA (Consumer Account) number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the digital receipt for your records",
      ],
    },
    thresholdCallout: {
      title: "The free-unit line (opt-in only)",
      leftLabel: "0–200 units",
      leftValue: "Free (if opted in)",
      rightLabel: "201+ units",
      rightValue: "From ₹4.50/unit",
      note: "Delhi's free-unit and half-price bands only apply if your account is opted into the subsidy — it is not automatic. Units from 201–400 are billed at half the standard rate, and 401+ at the full slab rate.",
    },
  },
  {
    slug: "telangana-electricity-bill-calculator",
    discomCode: "TSSPDCL",
    h1: "Telangana Electricity Bill Calculator",
    breadcrumbLabel: "Telangana Bill Calculator",
    metaTitle: "Telangana Electricity Bill Calculator 2026 — TSSPDCL",
    metaDescription: "Calculate your Telangana electricity bill (Telangana Southern Power Distribution Co. (TGSPDCL/TSSPDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Telangana gives white-ration-card homes up to 200 free units under Gruha Jyothi.",
    exampleUnits: 250,
    exampleEligible: false,
    neighboringDiscoms: ['APSPDCL', 'BESCOM', 'CSPDCL'],
    intro: "Estimate your Telangana Southern Power Distribution Co. (TGSPDCL/TSSPDCL) electricity bill for Telangana. Telangana gives white-ration-card homes up to 200 free units under Gruha Jyothi. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Gruha Jyothi free 200 units", body: "Domestic consumers with a white ration card get up to 200 units free each month under the Gruha Jyothi scheme. Above that, telescopic slabs apply, plus a 6% electricity duty. TGSPDCL and TGNPDCL share the same TSERC tariff." },
      { title: "How the Telangana bill is calculated", body: "Telangana domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹1.95 to ₹6.5/unit, each band charged at its own rate. A fixed charge of ₹10 per kW of sanctioned load applies, plus a 6% electricity duty." },
    ],
    faqs: [
      { q: "Is the Telangana electricity tariff telescopic?", a: "Yes. Telangana charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Telangana domestic connection?", a: "The fixed charge is ₹10 per kW of sanctioned load." },
      { q: "How accurate is this Telangana bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official TSSPDCL bill." },
      { q: "Does TGSPDCL/TSSPDCL supply Hyderabad?", a: "Yes. TGSPDCL (Southern Power Distribution Company of Telangana, sometimes still called TSSPDCL) covers Hyderabad along with 14 other southern districts. The remaining 18 northern districts are served by TGNPDCL." },
      { q: "How do I check or pay my TGSPDCL bill online?", a: "Pay via the official portal at tgsouthernpower.org or the TGSPDCL Citizen app. For queries, call the 24×7 helpline 1912 or 1800-599-01912." },
      { q: "What is TGSPDCL, and how did it form?", a: "When Andhra Pradesh was bifurcated on 2 June 2014 under the AP Reorganisation Act, the erstwhile APSEB's southern distribution arm serving the new Telangana state was restructured and renamed Telangana State Southern Power Distribution Company Ltd (TGSPDCL/TSSPDCL)." },
    ],
    billTraps: [
      { title: "TGSPDCL is southern Telangana only", body: "TGSPDCL (also called TSSPDCL) covers Hyderabad and 14 southern districts. The 18 northern districts, with headquarters at Hanumakonda, are served by a separate company, TGNPDCL — both share the same TSERC tariff shown here." },
      { title: "Gruha Jyothi requires a white ration card", body: "The 200-free-units scheme is tied specifically to holding a white ration card, not just being a domestic consumer generally — check your card status rather than assuming eligibility." },
      { title: "6% electricity duty applies on top of slabs", body: "Telangana's 6% electricity duty is charged on the energy charge in addition to the slab rates and fixed charge, and is often overlooked when estimating a bill by hand." },
    ],
    aboutDiscom: [
      "When the state of Andhra Pradesh was bifurcated on 2 June 2014 under the Andhra Pradesh Reorganisation Act, 2014, the distribution business serving the newly created Telangana was restructured into two companies: Telangana State Southern Power Distribution Company Ltd (TGSPDCL, also referred to as TSSPDCL) and Telangana State Northern Power Distribution Company Ltd (TGNPDCL).",
      "TGSPDCL covers Hyderabad and 14 other southern districts (including Rangareddy, Medchal, Nalgonda and Mahabubnagar), serving around 11.1 million consumers. TGNPDCL covers the 18 northern districts from Hanumakonda.",
    ],
    coverageQA: {
      q: "Does TGSPDCL (TSSPDCL) supply electricity to Hyderabad?",
      a: "Yes. TGSPDCL covers Hyderabad along with 14 southern Telangana districts. The 18 northern districts are served by the separate Telangana State Northern Power Distribution Company (TGNPDCL), on the same TSERC tariff.",
    },
    howToPay: {
      portalUrl: "https://tgsouthernpower.org/electricitybillpayonline",
      portalLabel: "tgsouthernpower.org (official TGSPDCL portal)",
      helpline: "1912 / 1800-599-01912 (24×7)",
      steps: [
        "Visit the official TGSPDCL website or Citizen app",
        "Enter your Unique Service Number (USC) to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
    translations: {
      hi: {
        h1: 'तेलंगाना बिजली बिल कैलकुलेटर',
        breadcrumbLabel: 'तेलंगाना बिल कैलकुलेटर',
        metaTitle: 'तेलंगाना बिजली बिल कैलकुलेटर 2026 — TSSPDCL',
        metaDescription:
          'अपना तेलंगाना बिजली बिल कैलकुलेट करें (तेलंगाना सदर्न पावर डिस्ट्रिब्यूशन कं. (TGSPDCL/TSSPDCL))। असली घरेलू स्लैब दरें, फिक्स्ड चार्ज और सब्सिडी, साफ ब्यौरे के साथ। तेलंगाना व्हाइट-राशन-कार्ड घरों को गृह ज्योति के तहत 200 यूनिट तक मुफ़्त देता है।',
        intro:
          'तेलंगाना सदर्न पावर डिस्ट्रिब्यूशन कं. (TGSPDCL/TSSPDCL) का अपना तेलंगाना बिजली बिल अनुमानित करें। तेलंगाना व्हाइट-राशन-कार्ड घरों को गृह ज्योति योजना के तहत 200 यूनिट तक मुफ़्त देता है। नीचे अपनी यूनिट्स डालकर एक आइटमाइज़्ड, स्लैब-दर-स्लैब अनुमान पाएं।',
        explainer: [
          {
            title: 'गृह ज्योति 200 मुफ़्त यूनिट',
            body: 'व्हाइट राशन कार्ड वाले घरेलू उपभोक्ताओं को गृह ज्योति योजना के तहत हर महीने 200 यूनिट तक मुफ़्त मिलती हैं। उससे ऊपर, टेलिस्कोपिक स्लैब लागू होते हैं, साथ ही 6% बिजली शुल्क। TGSPDCL और TGNPDCL एक ही TSERC टैरिफ शेयर करते हैं।',
          },
          {
            title: 'तेलंगाना बिल कैसे कैलकुलेट होता है',
            body: 'तेलंगाना घरेलू सप्लाई मासिक बिल होती है। इस्तेमाल ₹1.95 से ₹6.5/यूनिट के टेलिस्कोपिक स्लैब में बंटा होता है, हर बैंड अपनी दर पर चार्ज होता है। स्वीकृत लोड के प्रति kW ₹10 का फिक्स्ड चार्ज लागू होता है, साथ ही 6% बिजली शुल्क।',
          },
        ],
        faqs: [
          { q: 'क्या तेलंगाना बिजली टैरिफ टेलिस्कोपिक है?', a: 'हां। तेलंगाना टेलिस्कोपिक तरीके से चार्ज करता है: हर स्लैब अपनी दर पर बिल होता है, इसलिए एक स्लैब ऊपर जाने से आपकी सस्ती यूनिट्स की कीमत दोबारा तय नहीं होती।' },
          { q: 'तेलंगाना घरेलू कनेक्शन के लिए फिक्स्ड चार्ज क्या है?', a: 'फिक्स्ड चार्ज स्वीकृत लोड के प्रति kW ₹10 है।' },
          { q: 'यह तेलंगाना बिल अनुमान कितना सटीक है?', a: 'यह प्रकाशित घरेलू स्लैब दरों का इस्तेमाल करता है और एक करीबी अनुमान है, बिलिंग-ग्रेड आंकड़ा नहीं। हमेशा अपने आधिकारिक TSSPDCL बिल से पुष्टि करें।' },
          { q: 'क्या TGSPDCL/TSSPDCL हैदराबाद को सप्लाई करता है?', a: 'हां। TGSPDCL (तेलंगाना की सदर्न पावर डिस्ट्रिब्यूशन कंपनी, जिसे कभी-कभी अभी भी TSSPDCL कहा जाता है) हैदराबाद के साथ 14 अन्य दक्षिणी ज़िलों को कवर करती है। बाकी 18 उत्तरी ज़िले TGNPDCL द्वारा सर्व किए जाते हैं।' },
          { q: 'मैं अपना TGSPDCL बिल ऑनलाइन कैसे चेक या भुगतान करूं?', a: 'आधिकारिक पोर्टल tgsouthernpower.org या TGSPDCL Citizen ऐप से भुगतान करें। पूछताछ के लिए, 24×7 हेल्पलाइन 1912 या 1800-599-01912 पर कॉल करें।' },
          { q: 'TGSPDCL क्या है, और यह कैसे बना?', a: 'जब आंध्र प्रदेश को AP पुनर्गठन अधिनियम के तहत 2 जून 2014 को विभाजित किया गया, तो नए तेलंगाना राज्य को सर्व करने वाली पूर्ववर्ती APSEB की दक्षिणी डिस्ट्रिब्यूशन शाखा को पुनर्गठित कर तेलंगाना स्टेट सदर्न पावर डिस्ट्रिब्यूशन कंपनी लिमिटेड (TGSPDCL/TSSPDCL) नाम दिया गया।' },
        ],
        billTraps: [
          { title: 'TGSPDCL सिर्फ दक्षिणी तेलंगाना में', body: 'TGSPDCL (जिसे TSSPDCL भी कहते हैं) हैदराबाद और 14 दक्षिणी ज़िलों को कवर करती है। हनुमाकोंडा मुख्यालय वाले 18 उत्तरी ज़िले एक अलग कंपनी, TGNPDCL द्वारा सर्व किए जाते हैं — दोनों यहां दिखाई गई एक ही TSERC टैरिफ शेयर करती हैं।' },
          { title: 'गृह ज्योति के लिए व्हाइट राशन कार्ड ज़रूरी', body: '200-मुफ़्त-यूनिट योजना खास तौर पर व्हाइट राशन कार्ड रखने से जुड़ी है, सिर्फ सामान्य तौर पर घरेलू उपभोक्ता होने से नहीं — पात्रता मान लेने की बजाय अपने कार्ड की स्थिति जांचें।' },
          { title: '6% बिजली शुल्क स्लैब के ऊपर लागू होता है', body: 'तेलंगाना का 6% बिजली शुल्क स्लैब दरों और फिक्स्ड चार्ज के अलावा एनर्जी चार्ज पर लगाया जाता है, और हाथ से बिल अनुमानित करते समय अक्सर छूट जाता है।' },
        ],
        aboutDiscom: [
          'जब आंध्र प्रदेश राज्य को आंध्र प्रदेश पुनर्गठन अधिनियम, 2014 के तहत 2 जून 2014 को विभाजित किया गया, तो नए बने तेलंगाना को सर्व करने वाले डिस्ट्रिब्यूशन बिज़नेस को दो कंपनियों में पुनर्गठित किया गया: तेलंगाना स्टेट सदर्न पावर डिस्ट्रिब्यूशन कंपनी लिमिटेड (TGSPDCL, जिसे TSSPDCL भी कहते हैं) और तेलंगाना स्टेट नॉर्दर्न पावर डिस्ट्रिब्यूशन कंपनी लिमिटेड (TGNPDCL)।',
          'TGSPDCL हैदराबाद और 14 अन्य दक्षिणी ज़िलों (रंगारेड्डी, मेडचल, नलगोंडा और महबूबनगर सहित) को कवर करती है, लगभग 1.11 करोड़ उपभोक्ताओं को सर्व करती है। TGNPDCL हनुमाकोंडा से 18 उत्तरी ज़िलों को कवर करती है।',
        ],
        coverageQA: {
          q: 'क्या TGSPDCL (TSSPDCL) हैदराबाद को बिजली सप्लाई करता है?',
          a: 'हां। TGSPDCL हैदराबाद के साथ 14 दक्षिणी तेलंगाना ज़िलों को कवर करती है। 18 उत्तरी ज़िले अलग तेलंगाना स्टेट नॉर्दर्न पावर डिस्ट्रिब्यूशन कंपनी (TGNPDCL) द्वारा, उसी TSERC टैरिफ पर सर्व किए जाते हैं।',
        },
        howToPay: {
          portalLabel: 'tgsouthernpower.org (आधिकारिक TGSPDCL पोर्टल)',
          helpline: '1912 / 1800-599-01912 (24×7)',
          steps: [
            'आधिकारिक TGSPDCL वेबसाइट या Citizen ऐप पर जाएं',
            'अपना मौजूदा बिल पाने के लिए अपना यूनीक सर्विस नंबर (USC) डालें',
            'राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए भुगतान रसीद सेव करें',
          ],
        },
      },
      te: {
        h1: 'తెలంగాణ విద్యుత్ బిల్లు కాలిక్యులేటర్',
        breadcrumbLabel: 'తెలంగాణ బిల్లు కాలిక్యులేటర్',
        metaTitle: 'తెలంగాణ విద్యుత్ బిల్లు కాలిక్యులేటర్ 2026 — TSSPDCL',
        metaDescription:
          'మీ తెలంగాణ విద్యుత్ బిల్లును లెక్కించండి (తెలంగాణ సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కో. (TGSPDCL/TSSPDCL)). నిజమైన నివాస స్లాబ్ రేట్లు, ఫిక్స్డ్ చార్జ్ మరియు సబ్సిడీలు, స్పష్టమైన వివరణతో. తెలంగాణ తెల్ల రేషన్ కార్డు గృహాలకు గృహ జ్యోతి కింద 200 యూనిట్ల వరకు ఉచితంగా ఇస్తుంది.',
        intro:
          'తెలంగాణ సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కో. (TGSPDCL/TSSPDCL) మీ తెలంగాణ విద్యుత్ బిల్లును అంచనా వేయండి. తెలంగాణ తెల్ల రేషన్ కార్డు గృహాలకు గృహ జ్యోతి పథకం కింద 200 యూనిట్ల వరకు ఉచితంగా ఇస్తుంది. మీ యూనిట్లను కింద నమోదు చేసి ఒక వివరణాత్మక, స్లాబ్-వారీ అంచనా పొందండి.',
        explainer: [
          {
            title: 'గృహ జ్యోతి 200 ఉచిత యూనిట్లు',
            body: 'తెల్ల రేషన్ కార్డు ఉన్న నివాస వినియోగదారులకు గృహ జ్యోతి పథకం కింద ప్రతి నెలా 200 యూనిట్ల వరకు ఉచితంగా లభిస్తాయి. దాని పైన, టెలిస్కోపిక్ స్లాబ్‌లు వర్తిస్తాయి, అలాగే 6% విద్యుత్ సుంకం. TGSPDCL మరియు TGNPDCL ఒకే TSERC టారిఫ్‌ను పంచుకుంటాయి.',
          },
          {
            title: 'తెలంగాణ బిల్లు ఎలా లెక్కించబడుతుంది',
            body: 'తెలంగాణ నివాస సరఫరా నెలవారీగా బిల్లు వేయబడుతుంది. వినియోగం ₹1.95 నుండి ₹6.5/యూనిట్ వరకు టెలిస్కోపిక్ స్లాబ్‌లలో విభజించబడుతుంది, ప్రతి బ్యాండ్ దాని స్వంత రేటుతో వసూలు చేయబడుతుంది. మంజూరైన లోడ్ ప్రతి kW కి ₹10 ఫిక్స్డ్ చార్జ్ వర్తిస్తుంది, అలాగే 6% విద్యుత్ సుంకం.',
          },
        ],
        faqs: [
          { q: 'తెలంగాణ విద్యుత్ టారిఫ్ టెలిస్కోపిక్‌గా ఉందా?', a: 'అవును. తెలంగాణ టెలిస్కోపిక్‌గా వసూలు చేస్తుంది: ప్రతి స్లాబ్ దాని స్వంత రేటుతో బిల్లు వేయబడుతుంది, కాబట్టి ఒక స్లాబ్ పైకి వెళ్లడం మీ చౌక యూనిట్ల ధరను మళ్లీ నిర్ణయించదు.' },
          { q: 'తెలంగాణ నివాస కనెక్షన్‌కు ఫిక్స్డ్ చార్జ్ ఎంత?', a: 'ఫిక్స్డ్ చార్జ్ మంజూరైన లోడ్ ప్రతి kW కి ₹10.' },
          { q: 'ఈ తెలంగాణ బిల్లు అంచనా ఎంత ఖచ్చితమైనది?', a: 'ఇది ప్రచురించబడిన నివాస స్లాబ్ రేట్లను ఉపయోగిస్తుంది మరియు ఇది సన్నిహిత అంచనా, బిల్లింగ్-గ్రేడ్ సంఖ్య కాదు. ఎల్లప్పుడూ మీ అధికారిక TSSPDCL బిల్లుతో నిర్ధారించుకోండి.' },
          { q: 'TGSPDCL/TSSPDCL హైదరాబాద్‌కు సరఫరా చేస్తుందా?', a: 'అవును. TGSPDCL (తెలంగాణ సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ, కొన్నిసార్లు ఇప్పటికీ TSSPDCL అని పిలువబడుతుంది) హైదరాబాద్‌తో పాటు 14 ఇతర దక్షిణ జిల్లాలను కవర్ చేస్తుంది. మిగిలిన 18 ఉత్తర జిల్లాలు TGNPDCL ద్వారా సేవలందిస్తున్నాయి.' },
          { q: 'నేను నా TGSPDCL బిల్లును ఆన్‌లైన్‌లో ఎలా చెక్ చేయాలి లేదా చెల్లించాలి?', a: 'అధికారిక పోర్టల్ tgsouthernpower.org లేదా TGSPDCL సిటిజన్ యాప్ ద్వారా చెల్లించండి. ప్రశ్నల కోసం, 24×7 హెల్ప్‌లైన్ 1912 లేదా 1800-599-01912 కు కాల్ చేయండి.' },
          { q: 'TGSPDCL అంటే ఏమిటి, మరియు అది ఎలా ఏర్పడింది?', a: 'ఆంధ్రప్రదేశ్‌ను AP పునర్వ్యవస్థీకరణ చట్టం కింద 2 జూన్ 2014న విభజించినప్పుడు, కొత్త తెలంగాణ రాష్ట్రానికి సేవలందించే మాజీ APSEB దక్షిణ డిస్ట్రిబ్యూషన్ విభాగం పునర్వ్యవస్థీకరించబడి తెలంగాణ స్టేట్ సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ లిమిటెడ్ (TGSPDCL/TSSPDCL) గా పేరు మార్చబడింది.' },
        ],
        billTraps: [
          { title: 'TGSPDCL దక్షిణ తెలంగాణలో మాత్రమే', body: 'TGSPDCL (TSSPDCL అని కూడా పిలుస్తారు) హైదరాబాద్ మరియు 14 దక్షిణ జిల్లాలను కవర్ చేస్తుంది. హనుమకొండలో ప్రధాన కార్యాలయం ఉన్న 18 ఉత్తర జిల్లాలకు ఒక ప్రత్యేక కంపెనీ, TGNPDCL సేవలందిస్తుంది — రెండూ ఇక్కడ చూపిన అదే TSERC టారిఫ్‌ను పంచుకుంటాయి.' },
          { title: 'గృహ జ్యోతికి తెల్ల రేషన్ కార్డు అవసరం', body: '200-ఉచిత-యూనిట్ల పథకం ప్రత్యేకంగా తెల్ల రేషన్ కార్డు కలిగి ఉండటానికి ముడిపడి ఉంది, సాధారణంగా నివాస వినియోగదారుడిగా ఉండటానికి కాదు — అర్హతను అనుకోవడం కంటే మీ కార్డు స్థితిని తనిఖీ చేయండి.' },
          { title: '6% విద్యుత్ సుంకం స్లాబ్‌ల పైన వర్తిస్తుంది', body: 'తెలంగాణ యొక్క 6% విద్యుత్ సుంకం స్లాబ్ రేట్లు మరియు ఫిక్స్డ్ చార్జ్‌తో పాటు ఎనర్జీ చార్జ్‌పై వసూలు చేయబడుతుంది, మరియు చేతితో బిల్లును అంచనా వేసేటప్పుడు తరచుగా విస్మరించబడుతుంది.' },
        ],
        aboutDiscom: [
          'ఆంధ్రప్రదేశ్ రాష్ట్రాన్ని ఆంధ్రప్రదేశ్ పునర్వ్యవస్థీకరణ చట్టం, 2014 కింద 2 జూన్ 2014న విభజించినప్పుడు, కొత్తగా ఏర్పడిన తెలంగాణకు సేవలందించే డిస్ట్రిబ్యూషన్ వ్యాపారం రెండు కంపెనీలుగా పునర్వ్యవస్థీకరించబడింది: తెలంగాణ స్టేట్ సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ లిమిటెడ్ (TGSPDCL, దీనిని TSSPDCL అని కూడా అంటారు) మరియు తెలంగాణ స్టేట్ నార్తర్న్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ లిమిటెడ్ (TGNPDCL).',
          'TGSPDCL హైదరాబాద్ మరియు 14 ఇతర దక్షిణ జిల్లాలను (రంగారెడ్డి, మేడ్చల్, నల్గొండ మరియు మహబూబ్‌నగర్‌తో సహా) కవర్ చేస్తుంది, సుమారు 1.11 కోట్ల వినియోగదారులకు సేవలందిస్తుంది. TGNPDCL హనుమకొండ నుండి 18 ఉత్తర జిల్లాలను కవర్ చేస్తుంది.',
        ],
        coverageQA: {
          q: 'TGSPDCL (TSSPDCL) హైదరాబాద్‌కు విద్యుత్ సరఫరా చేస్తుందా?',
          a: 'అవును. TGSPDCL హైదరాబాద్‌తో పాటు 14 దక్షిణ తెలంగాణ జిల్లాలను కవర్ చేస్తుంది. 18 ఉత్తర జిల్లాలు ప్రత్యేక తెలంగాణ స్టేట్ నార్తర్న్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ (TGNPDCL) ద్వారా, అదే TSERC టారిఫ్‌పై సేవలందిస్తున్నాయి.',
        },
        howToPay: {
          portalLabel: 'tgsouthernpower.org (అధికారిక TGSPDCL పోర్టల్)',
          helpline: '1912 / 1800-599-01912 (24×7)',
          steps: [
            'అధికారిక TGSPDCL వెబ్‌సైట్ లేదా సిటిజన్ యాప్‌ను సందర్శించండి',
            'మీ ప్రస్తుత బిల్లును పొందడానికి మీ యూనిక్ సర్వీస్ నంబర్ (USC) నమోదు చేయండి',
            'మొత్తాన్ని ధృవీకరించి UPI, కార్డ్ లేదా నెట్ బ్యాంకింగ్ ద్వారా చెల్లించండి',
            'మీ రికార్డుల కోసం చెల్లింపు రసీదును సేవ్ చేయండి',
          ],
        },
      },
    },
  },
  {
    slug: "andhra-pradesh-electricity-bill-calculator",
    discomCode: "APSPDCL",
    h1: "Andhra Pradesh Electricity Bill Calculator",
    breadcrumbLabel: "Andhra Pradesh Bill Calculator",
    metaTitle: "Andhra Pradesh Electricity Bill Calculator 2026 — APSPDCL",
    metaDescription: "Calculate your Andhra Pradesh electricity bill (Southern Power Distribution Co. of AP (APSPDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Andhra Pradesh uses a six-slab telescopic domestic tariff.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['TSSPDCL', 'TNEB', 'KSEB'],
    intro: "Estimate your Southern Power Distribution Co. of AP (APSPDCL) electricity bill for Andhra Pradesh. Andhra Pradesh uses a six-slab telescopic domestic tariff. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A fine-grained six-slab tariff", body: "Andhra Pradesh uses an unusually detailed six-slab telescopic tariff for domestic (LT-1) connections, from ₹1.90/unit for the first 30 units up to ₹9.75 above 400. APEPDCL, APCPDCL and APSPDCL all follow the same unified APERC schedule." },
      { title: "How the Andhra Pradesh bill is calculated", body: "Andhra Pradesh domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹1.9 to ₹9.75/unit, each band charged at its own rate. A fixed charge of ₹10 per kW of sanctioned load applies." },
    ],
    faqs: [
      { q: "Is the Andhra Pradesh electricity tariff telescopic?", a: "Yes. Andhra Pradesh charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Andhra Pradesh domestic connection?", a: "The fixed charge is ₹10 per kW of sanctioned load." },
      { q: "How accurate is this Andhra Pradesh bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. A flat ₹0.06/unit electricity duty is not modelled here. Always confirm against your official APSPDCL bill." },
      { q: "Does APSPDCL supply electricity to Visakhapatnam?", a: "No. Visakhapatnam is served by APEPDCL (Eastern Power Distribution Company of AP), a separate distribution company. APSPDCL covers Vijayawada, Guntur, Nellore, Kurnool, Kadapa and Prakasam — check which company's name is on your bill." },
      { q: "How do I check or pay my APSPDCL bill online?", a: "Pay via the official portal at apspdcl.in, using the digital payment section. For queries, call the helpline 1800-425-155333 or the 24×7 power-supply number 1912." },
      { q: "What is APSPDCL, and how did it form?", a: "APSPDCL was incorporated on 1 April 2000 to distribute power in Krishna, Guntur, Prakasam, Nellore, Chittoor and Kadapa districts. After Andhra Pradesh was bifurcated on 2 June 2014, Anantapur and Kurnool districts were added to its territory." },
    ],
    billTraps: [
      { title: "APSPDCL doesn't cover Visakhapatnam", body: "Vizag and the surrounding coastal-north districts are served by a separate company, APEPDCL, not APSPDCL. Confirm which company issues your bill before relying on this calculator." },
      { title: "The six-slab structure is easy to miscalculate by hand", body: "With six separate telescopic bands from ₹1.90 to ₹9.75/unit, manually estimating an AP bill is error-prone — small mistakes in which units fall in which band compound quickly." },
      { title: "The ₹0.06/unit electricity duty isn't in this estimate", body: "It's a small flat addition, but consistently omitted when people estimate their bill by hand." },
    ],
    aboutDiscom: [
      "Southern Power Distribution Company of AP Ltd (APSPDCL) was incorporated on 1 April 2000 to distribute electricity in Krishna, Guntur, Prakasam, Nellore, Chittoor and Kadapa districts, headquartered at Tirupati.",
      "When Andhra Pradesh was bifurcated on 2 June 2014 to create Telangana, Anantapur and Kurnool districts were added to APSPDCL's territory. Coastal-north Andhra Pradesh, including Visakhapatnam, is served by a separate company, APEPDCL (Eastern Power Distribution Company).",
    ],
    coverageQA: {
      q: "Does APSPDCL supply electricity to Visakhapatnam?",
      a: "No. Visakhapatnam is covered by APEPDCL (Andhra Pradesh Eastern Power Distribution Company), a separate distribution licensee. APSPDCL covers Vijayawada, Guntur, Nellore, Kurnool, Kadapa, Anantapur and Prakasam.",
    },
    howToPay: {
      portalUrl: "https://apspdcl.in/digital_payment.php",
      portalLabel: "apspdcl.in (official APSPDCL portal)",
      helpline: "1800-425-155333 / 1912 (24×7)",
      steps: [
        "Visit the official APSPDCL digital payment portal",
        "Enter your Service Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
    translations: {
      hi: {
        h1: 'आंध्र प्रदेश बिजली बिल कैलकुलेटर',
        breadcrumbLabel: 'आंध्र प्रदेश बिल कैलकुलेटर',
        metaTitle: 'आंध्र प्रदेश बिजली बिल कैलकुलेटर 2026 — APSPDCL',
        metaDescription:
          'अपना आंध्र प्रदेश बिजली बिल कैलकुलेट करें (साउदर्न पावर डिस्ट्रिब्यूशन कं. ऑफ AP (APSPDCL))। असली घरेलू स्लैब दरें, फिक्स्ड चार्ज और सब्सिडी, साफ ब्यौरे के साथ। आंध्र प्रदेश छह-स्लैब टेलिस्कोपिक घरेलू टैरिफ इस्तेमाल करता है।',
        intro:
          'साउदर्न पावर डिस्ट्रिब्यूशन कं. ऑफ AP (APSPDCL) का अपना आंध्र प्रदेश बिजली बिल अनुमानित करें। आंध्र प्रदेश छह-स्लैब टेलिस्कोपिक घरेलू टैरिफ इस्तेमाल करता है। नीचे अपनी यूनिट्स डालकर एक आइटमाइज़्ड, स्लैब-दर-स्लैब अनुमान पाएं।',
        explainer: [
          {
            title: 'एक बारीक छह-स्लैब टैरिफ',
            body: 'आंध्र प्रदेश घरेलू (LT-1) कनेक्शन के लिए एक असामान्य रूप से विस्तृत छह-स्लैब टेलिस्कोपिक टैरिफ इस्तेमाल करता है, पहली 30 यूनिट के लिए ₹1.90/यूनिट से लेकर 400 से ऊपर ₹9.75 तक। APEPDCL, APCPDCL और APSPDCL सभी एक ही एकीकृत APERC शेड्यूल फॉलो करते हैं।',
          },
          {
            title: 'आंध्र प्रदेश बिल कैसे कैलकुलेट होता है',
            body: 'आंध्र प्रदेश घरेलू सप्लाई मासिक बिल होती है। इस्तेमाल ₹1.9 से ₹9.75/यूनिट के टेलिस्कोपिक स्लैब में बंटा होता है, हर बैंड अपनी दर पर चार्ज होता है। स्वीकृत लोड के प्रति kW ₹10 का फिक्स्ड चार्ज लागू होता है।',
          },
        ],
        faqs: [
          { q: 'क्या आंध्र प्रदेश बिजली टैरिफ टेलिस्कोपिक है?', a: 'हां। आंध्र प्रदेश टेलिस्कोपिक तरीके से चार्ज करता है: हर स्लैब अपनी दर पर बिल होता है, इसलिए एक स्लैब ऊपर जाने से आपकी सस्ती यूनिट्स की कीमत दोबारा तय नहीं होती।' },
          { q: 'आंध्र प्रदेश घरेलू कनेक्शन के लिए फिक्स्ड चार्ज क्या है?', a: 'फिक्स्ड चार्ज स्वीकृत लोड के प्रति kW ₹10 है।' },
          { q: 'यह आंध्र प्रदेश बिल अनुमान कितना सटीक है?', a: 'यह प्रकाशित घरेलू स्लैब दरों का इस्तेमाल करता है और एक करीबी अनुमान है, बिलिंग-ग्रेड आंकड़ा नहीं। एक फ्लैट ₹0.06/यूनिट बिजली शुल्क यहां मॉडल नहीं किया गया है। हमेशा अपने आधिकारिक APSPDCL बिल से पुष्टि करें।' },
          { q: 'क्या APSPDCL विशाखापत्तनम को बिजली सप्लाई करता है?', a: 'नहीं। विशाखापत्तनम को APEPDCL (ईस्टर्न पावर डिस्ट्रिब्यूशन कंपनी ऑफ AP), एक अलग डिस्ट्रिब्यूशन कंपनी, सर्व करती है। APSPDCL विजयवाड़ा, गुंटूर, नेल्लोर, कुरनूल, कडपा और प्रकाशम को कवर करता है — जांचें आपके बिल पर किस कंपनी का नाम है।' },
          { q: 'मैं अपना APSPDCL बिल ऑनलाइन कैसे चेक या भुगतान करूं?', a: 'आधिकारिक पोर्टल apspdcl.in पर डिजिटल पेमेंट सेक्शन से भुगतान करें। पूछताछ के लिए, हेल्पलाइन 1800-425-155333 या 24×7 पावर-सप्लाई नंबर 1912 पर कॉल करें।' },
          { q: 'APSPDCL क्या है, और यह कैसे बना?', a: 'APSPDCL को 1 अप्रैल 2000 को कृष्णा, गुंटूर, प्रकाशम, नेल्लोर, चित्तूर और कडपा ज़िलों में बिजली वितरित करने के लिए शामिल किया गया था। 2 जून 2014 को आंध्र प्रदेश के विभाजन के बाद, अनंतपुर और कुरनूल ज़िले इसके क्षेत्र में जोड़े गए।' },
        ],
        billTraps: [
          { title: 'APSPDCL विशाखापत्तनम को कवर नहीं करता', body: 'विजाग और आसपास के तटीय-उत्तर ज़िलों को एक अलग कंपनी, APEPDCL सर्व करती है, APSPDCL नहीं। इस कैलकुलेटर पर भरोसा करने से पहले पुष्टि करें कौन सी कंपनी आपका बिल जारी करती है।' },
          { title: 'छह-स्लैब संरचना को हाथ से गलत गिनना आसान है', body: '₹1.90 से ₹9.75/यूनिट तक छह अलग टेलिस्कोपिक बैंड के साथ, हाथ से AP बिल अनुमानित करना गलती-प्रवण है — किस बैंड में कौन सी यूनिट्स आती हैं इसमें छोटी गलतियां जल्दी बढ़ जाती हैं।' },
          { title: '₹0.06/यूनिट बिजली शुल्क इस अनुमान में नहीं है', body: 'यह एक छोटा फ्लैट जोड़ है, लेकिन जब लोग हाथ से अपना बिल अनुमानित करते हैं तो लगातार छूट जाता है।' },
        ],
        aboutDiscom: [
          'साउदर्न पावर डिस्ट्रिब्यूशन कंपनी ऑफ AP लिमिटेड (APSPDCL) को 1 अप्रैल 2000 को कृष्णा, गुंटूर, प्रकाशम, नेल्लोर, चित्तूर और कडपा ज़िलों में बिजली वितरित करने के लिए शामिल किया गया था, इसका मुख्यालय तिरुपति में है।',
          'जब आंध्र प्रदेश को 2 जून 2014 को विभाजित कर तेलंगाना बनाया गया, तो अनंतपुर और कुरनूल ज़िले APSPDCL के क्षेत्र में जोड़े गए। तटीय-उत्तर आंध्र प्रदेश, जिसमें विशाखापत्तनम शामिल है, को एक अलग कंपनी, APEPDCL (ईस्टर्न पावर डिस्ट्रिब्यूशन कंपनी) सर्व करती है।',
        ],
        coverageQA: {
          q: 'क्या APSPDCL विशाखापत्तनम को बिजली सप्लाई करता है?',
          a: 'नहीं। विशाखापत्तनम को APEPDCL (आंध्र प्रदेश ईस्टर्न पावर डिस्ट्रिब्यूशन कंपनी), एक अलग डिस्ट्रिब्यूशन लाइसेंसी, कवर करती है। APSPDCL विजयवाड़ा, गुंटूर, नेल्लोर, कुरनूल, कडपा, अनंतपुर और प्रकाशम को कवर करता है।',
        },
        howToPay: {
          portalLabel: 'apspdcl.in (आधिकारिक APSPDCL पोर्टल)',
          helpline: '1800-425-155333 / 1912 (24×7)',
          steps: [
            'आधिकारिक APSPDCL डिजिटल पेमेंट पोर्टल पर जाएं',
            'अपना मौजूदा बिल पाने के लिए अपना सर्विस नंबर डालें',
            'राशि की पुष्टि करें और UPI, कार्ड या नेट बैंकिंग से भुगतान करें',
            'अपने रिकॉर्ड के लिए भुगतान रसीद सेव करें',
          ],
        },
      },
      te: {
        h1: 'ఆంధ్రప్రదేశ్ విద్యుత్ బిల్లు కాలిక్యులేటర్',
        breadcrumbLabel: 'ఆంధ్రప్రదేశ్ బిల్లు కాలిక్యులేటర్',
        metaTitle: 'ఆంధ్రప్రదేశ్ విద్యుత్ బిల్లు కాలిక్యులేటర్ 2026 — APSPDCL',
        metaDescription:
          'మీ ఆంధ్రప్రదేశ్ విద్యుత్ బిల్లును లెక్కించండి (సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కో. ఆఫ్ AP (APSPDCL)). నిజమైన నివాస స్లాబ్ రేట్లు, ఫిక్స్డ్ చార్జ్ మరియు సబ్సిడీలు, స్పష్టమైన వివరణతో. ఆంధ్రప్రదేశ్ ఆరు-స్లాబ్ టెలిస్కోపిక్ నివాస టారిఫ్‌ను ఉపయోగిస్తుంది.',
        intro:
          'సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కో. ఆఫ్ AP (APSPDCL) మీ ఆంధ్రప్రదేశ్ విద్యుత్ బిల్లును అంచనా వేయండి. ఆంధ్రప్రదేశ్ ఆరు-స్లాబ్ టెలిస్కోపిక్ నివాస టారిఫ్‌ను ఉపయోగిస్తుంది. మీ యూనిట్లను కింద నమోదు చేసి ఒక వివరణాత్మక, స్లాబ్-వారీ అంచనా పొందండి.',
        explainer: [
          {
            title: 'ఒక సూక్ష్మమైన ఆరు-స్లాబ్ టారిఫ్',
            body: 'ఆంధ్రప్రదేశ్ నివాస (LT-1) కనెక్షన్‌ల కోసం అసాధారణంగా వివరణాత్మకమైన ఆరు-స్లాబ్ టెలిస్కోపిక్ టారిఫ్‌ను ఉపయోగిస్తుంది, మొదటి 30 యూనిట్లకు ₹1.90/యూనిట్ నుండి 400 పైన ₹9.75 వరకు. APEPDCL, APCPDCL మరియు APSPDCL అన్నీ ఒకే ఏకీకృత APERC షెడ్యూల్‌ను అనుసరిస్తాయి.',
          },
          {
            title: 'ఆంధ్రప్రదేశ్ బిల్లు ఎలా లెక్కించబడుతుంది',
            body: 'ఆంధ్రప్రదేశ్ నివాస సరఫరా నెలవారీగా బిల్లు వేయబడుతుంది. వినియోగం ₹1.9 నుండి ₹9.75/యూనిట్ వరకు టెలిస్కోపిక్ స్లాబ్‌లలో విభజించబడుతుంది, ప్రతి బ్యాండ్ దాని స్వంత రేటుతో వసూలు చేయబడుతుంది. మంజూరైన లోడ్ ప్రతి kW కి ₹10 ఫిక్స్డ్ చార్జ్ వర్తిస్తుంది.',
          },
        ],
        faqs: [
          { q: 'ఆంధ్రప్రదేశ్ విద్యుత్ టారిఫ్ టెలిస్కోపిక్‌గా ఉందా?', a: 'అవును. ఆంధ్రప్రదేశ్ టెలిస్కోపిక్‌గా వసూలు చేస్తుంది: ప్రతి స్లాబ్ దాని స్వంత రేటుతో బిల్లు వేయబడుతుంది, కాబట్టి ఒక స్లాబ్ పైకి వెళ్లడం మీ చౌక యూనిట్ల ధరను మళ్లీ నిర్ణయించదు.' },
          { q: 'ఆంధ్రప్రదేశ్ నివాస కనెక్షన్‌కు ఫిక్స్డ్ చార్జ్ ఎంత?', a: 'ఫిక్స్డ్ చార్జ్ మంజూరైన లోడ్ ప్రతి kW కి ₹10.' },
          { q: 'ఈ ఆంధ్రప్రదేశ్ బిల్లు అంచనా ఎంత ఖచ్చితమైనది?', a: 'ఇది ప్రచురించబడిన నివాస స్లాబ్ రేట్లను ఉపయోగిస్తుంది మరియు ఇది సన్నిహిత అంచనా, బిల్లింగ్-గ్రేడ్ సంఖ్య కాదు. ఫ్లాట్ ₹0.06/యూనిట్ విద్యుత్ సుంకం ఇక్కడ మోడల్ చేయబడలేదు. ఎల్లప్పుడూ మీ అధికారిక APSPDCL బిల్లుతో నిర్ధారించుకోండి.' },
          { q: 'APSPDCL విశాఖపట్నానికి విద్యుత్ సరఫరా చేస్తుందా?', a: 'లేదు. విశాఖపట్నానికి APEPDCL (ఈస్టర్న్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ ఆఫ్ AP), ఒక ప్రత్యేక డిస్ట్రిబ్యూషన్ కంపెనీ సేవలందిస్తుంది. APSPDCL విజయవాడ, గుంటూరు, నెల్లూరు, కర్నూలు, కడప మరియు ప్రకాశం జిల్లాలను కవర్ చేస్తుంది — మీ బిల్లుపై ఏ కంపెనీ పేరు ఉందో తనిఖీ చేయండి.' },
          { q: 'నేను నా APSPDCL బిల్లును ఆన్‌లైన్‌లో ఎలా చెక్ చేయాలి లేదా చెల్లించాలి?', a: 'అధికారిక పోర్టల్ apspdcl.in లో డిజిటల్ పేమెంట్ విభాగం ద్వారా చెల్లించండి. ప్రశ్నల కోసం, హెల్ప్‌లైన్ 1800-425-155333 లేదా 24×7 పవర్-సప్లై నంబర్ 1912 కు కాల్ చేయండి.' },
          { q: 'APSPDCL అంటే ఏమిటి, మరియు అది ఎలా ఏర్పడింది?', a: 'APSPDCL కృష్ణా, గుంటూరు, ప్రకాశం, నెల్లూరు, చిత్తూరు మరియు కడప జిల్లాల్లో విద్యుత్‌ను పంపిణీ చేయడానికి 1 ఏప్రిల్ 2000న స్థాపించబడింది. ఆంధ్రప్రదేశ్‌ను 2 జూన్ 2014న విభజించిన తర్వాత, అనంతపురం మరియు కర్నూలు జిల్లాలు దాని భూభాగానికి జోడించబడ్డాయి.' },
        ],
        billTraps: [
          { title: 'APSPDCL విశాఖపట్నాన్ని కవర్ చేయదు', body: 'విజాగ్ మరియు చుట్టుపక్కల తీర-ఉత్తర జిల్లాలకు ఒక ప్రత్యేక కంపెనీ, APEPDCL సేవలందిస్తుంది, APSPDCL కాదు. ఈ కాలిక్యులేటర్‌పై ఆధారపడే ముందు మీ బిల్లును ఏ కంపెనీ జారీ చేస్తుందో నిర్ధారించుకోండి.' },
          { title: 'ఆరు-స్లాబ్ నిర్మాణాన్ని చేతితో తప్పుగా లెక్కించడం సులభం', body: '₹1.90 నుండి ₹9.75/యూనిట్ వరకు ఆరు వేర్వేరు టెలిస్కోపిక్ బ్యాండ్‌లతో, చేతితో AP బిల్లును అంచనా వేయడం తప్పులకు ఆస్కారం ఉంటుంది — ఏ యూనిట్లు ఏ బ్యాండ్‌లో వస్తాయో అనే చిన్న తప్పులు త్వరగా పెరుగుతాయి.' },
          { title: '₹0.06/యూనిట్ విద్యుత్ సుంకం ఈ అంచనాలో లేదు', body: 'ఇది ఒక చిన్న ఫ్లాట్ అదనం, కానీ ప్రజలు చేతితో తమ బిల్లును అంచనా వేసేటప్పుడు స్థిరంగా విస్మరించబడుతుంది.' },
        ],
        aboutDiscom: [
          'సదరన్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ ఆఫ్ AP లిమిటెడ్ (APSPDCL) కృష్ణా, గుంటూరు, ప్రకాశం, నెల్లూరు, చిత్తూరు మరియు కడప జిల్లాల్లో విద్యుత్‌ను పంపిణీ చేయడానికి 1 ఏప్రిల్ 2000న స్థాపించబడింది, దీని ప్రధాన కార్యాలయం తిరుపతిలో ఉంది.',
          'ఆంధ్రప్రదేశ్‌ను 2 జూన్ 2014న విభజించి తెలంగాణను సృష్టించినప్పుడు, అనంతపురం మరియు కర్నూలు జిల్లాలు APSPDCL భూభాగానికి జోడించబడ్డాయి. విశాఖపట్నంతో సహా తీర-ఉత్తర ఆంధ్రప్రదేశ్‌కు ఒక ప్రత్యేక కంపెనీ, APEPDCL (ఈస్టర్న్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ) సేవలందిస్తుంది.',
        ],
        coverageQA: {
          q: 'APSPDCL విశాఖపట్నానికి విద్యుత్ సరఫరా చేస్తుందా?',
          a: 'లేదు. విశాఖపట్నం APEPDCL (ఆంధ్రప్రదేశ్ ఈస్టర్న్ పవర్ డిస్ట్రిబ్యూషన్ కంపెనీ), ఒక ప్రత్యేక డిస్ట్రిబ్యూషన్ లైసెన్సీ ద్వారా కవర్ చేయబడుతుంది. APSPDCL విజయవాడ, గుంటూరు, నెల్లూరు, కర్నూలు, కడప, అనంతపురం మరియు ప్రకాశంను కవర్ చేస్తుంది.',
        },
        howToPay: {
          portalLabel: 'apspdcl.in (అధికారిక APSPDCL పోర్టల్)',
          helpline: '1800-425-155333 / 1912 (24×7)',
          steps: [
            'అధికారిక APSPDCL డిజిటల్ పేమెంట్ పోర్టల్‌ను సందర్శించండి',
            'మీ ప్రస్తుత బిల్లును పొందడానికి మీ సర్వీస్ నంబర్ నమోదు చేయండి',
            'మొత్తాన్ని ధృవీకరించి UPI, కార్డ్ లేదా నెట్ బ్యాంకింగ్ ద్వారా చెల్లించండి',
            'మీ రికార్డుల కోసం చెల్లింపు రసీదును సేవ్ చేయండి',
          ],
        },
      },
    },
  },
  {
    slug: "madhya-pradesh-electricity-bill-calculator",
    discomCode: "MPCZ",
    h1: "Madhya Pradesh Electricity Bill Calculator",
    breadcrumbLabel: "Madhya Pradesh Bill Calculator",
    metaTitle: "Madhya Pradesh Electricity Bill Calculator 2026 — MPCZ",
    metaDescription: "Calculate your Madhya Pradesh electricity bill (MP Madhya Kshetra Vidyut Vitaran Co. (MPCZ)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Madhya Pradesh caps small (≤100 unit) bills at ₹100 under Atal Griha Jyoti.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['MSEDCL', 'UPPCL', 'CSPDCL'],
    intro: "Estimate your MP Madhya Kshetra Vidyut Vitaran Co. (MPCZ) electricity bill for Madhya Pradesh. Madhya Pradesh caps small (≤100 unit) bills at ₹100 under Atal Griha Jyoti. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Atal Griha Jyoti — a ₹100 bill cap", body: "Under the Atal Griha Jyoti Yojana, eligible low-load (≤1 kW) households using 100 units or less a month have their entire bill capped at a flat ₹100. Above that, normal telescopic slabs and a ₹0.30/unit VCA surcharge apply." },
      { title: "How the Madhya Pradesh bill is calculated", body: "Madhya Pradesh domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹4.25 to ₹7.25/unit, each band charged at its own rate. A fixed charge of ₹20 per kW of sanctioned load applies, and a ₹0.3/unit fuel/variable-cost surcharge." },
    ],
    faqs: [
      { q: "Is the Madhya Pradesh electricity tariff telescopic?", a: "Yes. Madhya Pradesh charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Madhya Pradesh domestic connection?", a: "The fixed charge is ₹20 per kW of sanctioned load." },
      { q: "How accurate is this Madhya Pradesh bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. The Atal Griha Jyoti ₹100 cap is not applied automatically here. Always confirm against your official MPCZ bill." },
      { q: "Does MPCZ supply electricity to Indore?", a: "No. MPCZ (Madhya Kshetra) covers Bhopal, Gwalior and the central commissionaries of Bhopal, Hoshangabad and Chambal. Indore is served by a separate company, MPWZ (Paschim Kshetra), covering the western Malwa region including Ujjain." },
      { q: "How do I check or pay my MPCZ bill online?", a: "Pay via the MP Online portal at mpeb.mponline.gov.in, or the official MPCZ website. For queries, call the 24×7 toll-free helpline 1912 or 1800-233-1912." },
      { q: "What is MPCZ, and how did it form?", a: "The Madhya Pradesh State Electricity Board (MPSEB) was unbundled in July 2002, under the state's power reform act, into five companies with MPSEB as holding entity — three regional distribution companies (MPCZ, MPWZ, MPEZ) plus separate generation and transmission companies." },
    ],
    billTraps: [
      { title: "MPCZ doesn't cover Indore", body: "Madhya Pradesh has three regional distribution companies. MPCZ covers Bhopal and central MP; Indore and the western Malwa region are billed by MPWZ instead, on a similar but separately-administered tariff." },
      { title: "The Atal Griha Jyoti cap isn't automatic here", body: "Households using 100 units or less with a sanctioned load of 1 kW or below can have their entire bill capped at ₹100 under this scheme — but it requires eligibility and isn't applied automatically by this calculator." },
      { title: "The VCA surcharge moves and isn't included", body: "MPCZ's ₹0.30/unit variable cost adjustment can change, and isn't reflected in this estimate, so your real bill may differ slightly." },
    ],
    aboutDiscom: [
      "The Madhya Pradesh State Electricity Board (MPSEB) was unbundled in July 2002 under the state's power sector reform, with MPSEB continuing as a holding company over three regional distribution companies — MP Madhya Kshetra Vidyut Vitaran Co. (MPCZ, central), MP Paschim Kshetra Vidyut Vitaran Co. (MPWZ, west) and MP Poorv Kshetra Vidyut Vitaran Co. (MPEZ, east) — plus separate generation and transmission companies.",
      "MPCZ serves Bhopal, Gwalior and the Bhopal, Hoshangabad, Gwalior and Chambal commissionaries. Indore falls under MPWZ instead.",
    ],
    coverageQA: {
      q: "Does MPCZ supply electricity to Indore?",
      a: "No. Indore and the western Malwa region (including Ujjain) are served by MPWZ (MP Paschim Kshetra Vidyut Vitaran Co.), a separate regional discom. MPCZ covers Bhopal, Gwalior and central Madhya Pradesh.",
    },
    howToPay: {
      portalUrl: "https://mpeb.mponline.gov.in/",
      portalLabel: "mpeb.mponline.gov.in (MP Online bill payment)",
      helpline: "1912 / 1800-233-1912 (24×7)",
      steps: [
        "Visit the MP Online electricity bill payment portal",
        "Enter your IVRS/Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "haryana-electricity-bill-calculator",
    discomCode: "UHBVN",
    h1: "Haryana Electricity Bill Calculator",
    breadcrumbLabel: "Haryana Bill Calculator",
    metaTitle: "Haryana Electricity Bill Calculator 2026 — UHBVN",
    metaDescription: "Calculate your Haryana electricity bill (Uttar Haryana Bijli Vitran Nigam (UHBVN, HERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Haryana keeps low-use slabs cheap, then rises steeply.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['BRPL', 'PSPCL', 'UPPCL'],
    intro: "Estimate your Uttar Haryana Bijli Vitran Nigam (UHBVN, HERC) electricity bill for Haryana. Haryana keeps low-use slabs cheap, then rises steeply. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A split low-use vs high-use structure", body: "Haryana keeps the first two slabs very cheap (₹2.20 and ₹2.70) to protect low-use households, then rises sharply for higher consumption. UHBVN and DHBVN follow the same HERC schedule." },
      { title: "How the Haryana bill is calculated", body: "Haryana domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2.2 to ₹6.45/unit, each band charged at its own rate. A fixed charge of ₹120 per kW of sanctioned load applies." },
    ],
    faqs: [
      { q: "Is the Haryana electricity tariff telescopic?", a: "Yes. Haryana charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Haryana domestic connection?", a: "The fixed charge is ₹120 per kW of sanctioned load." },
      { q: "How accurate is this Haryana bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. FPPCA fuel surcharge and electricity duty are not modelled here. Always confirm against your official UHBVN bill." },
      { q: "Does UHBVN supply electricity to Gurgaon or Faridabad?", a: "No. Both Gurgaon and Faridabad are served by DHBVN (Dakshin Haryana Bijli Vitran Nigam), not UHBVN. UHBVN covers northern Haryana — Panchkula, Ambala, Yamunanagar, Kurukshetra, Karnal, Panipat, Sonepat, Rohtak and Jind — while DHBVN covers the south (including Gurgaon, Faridabad, Hisar and Rewari)." },
      { q: "How do I check or pay my UHBVN bill online?", a: "Pay via the official portal at uhbvn.org.in. For queries or outages, call the toll-free helpline 1912 or 1800-180-1550." },
      { q: "What is UHBVN, and how did it form?", a: "The Haryana State Electricity Board (HSEB) was unbundled on 14 August 1998 under the Haryana Electricity Reforms Act. Its distribution assets were split between Uttar Haryana Bijli Vitran Nigam (UHBVN, north) and Dakshin Haryana Bijli Vitran Nigam (DHBVN, south), both commencing operations on 1 July 1999." },
    ],
    billTraps: [
      { title: "UHBVN doesn't cover Gurgaon or Faridabad", body: "Haryana's two discoms are split north/south, not by a single statewide company. If your connection is in Gurgaon, Faridabad, Hisar or Rewari, your actual discom is DHBVN, not UHBVN — both share the same HERC tariff shown here." },
      { title: "The cheap starting slabs end quickly", body: "UHBVN's first two slabs (₹2.20 and ₹2.70) are unusually cheap, but the rate rises sharply after 100–150 units — a bill can jump noticeably once you're past the protected low-use bands." },
      { title: "FPPCA surcharge and duty aren't in this estimate", body: "Haryana's fuel and power purchase cost adjustment and electricity duty are not modelled, so your real UHBVN bill will run a little higher than this calculator shows." },
    ],
    aboutDiscom: [
      "The Haryana State Electricity Board (HSEB) was unbundled on 14 August 1998, under the Haryana Electricity Reforms Act. Its distribution business was split geographically and transferred to two new companies — Uttar Haryana Bijli Vitran Nigam (UHBVN) and Dakshin Haryana Bijli Vitran Nigam (DHBVN) — both commencing operations on 1 July 1999.",
      "UHBVN serves northern Haryana: Panchkula, Ambala, Yamunanagar, Kurukshetra, Kaithal, Karnal, Panipat, Sonepat, Rohtak and Jhajjar/Jind districts. DHBVN covers the south, including Gurgaon, Faridabad, Hisar, Fatehabad, Bhiwani, Sirsa, Mewat and Rewari.",
    ],
    coverageQA: {
      q: "Does UHBVN supply electricity to Gurgaon?",
      a: "No. Gurgaon (and Faridabad) are served by DHBVN (Dakshin Haryana Bijli Vitran Nigam), Haryana's southern discom. UHBVN covers the northern districts — Panchkula, Ambala, Karnal, Panipat, Rohtak and others.",
    },
    howToPay: {
      portalUrl: "https://www.uhbvn.org.in/",
      portalLabel: "uhbvn.org.in (official UHBVN portal)",
      helpline: "1912 / 1800-180-1550 (24×7)",
      steps: [
        "Visit the official UHBVN payment gateway",
        "Enter your Account/Consumer number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "himachal-pradesh-electricity-bill-calculator",
    discomCode: "HPSEBL",
    h1: "Himachal Pradesh Electricity Bill Calculator",
    breadcrumbLabel: "Himachal Pradesh Bill Calculator",
    metaTitle: "Himachal Pradesh Electricity Bill Calculator 2026 — HPSEBL",
    metaDescription: "Calculate your Himachal Pradesh electricity bill (Himachal Pradesh State Electricity Board Ltd (HPSEBL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Himachal Pradesh gives the first 125 units free each month.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['UPCL', 'PSPCL', 'JPDCL'],
    intro: "Estimate your Himachal Pradesh State Electricity Board Ltd (HPSEBL) electricity bill for Himachal Pradesh. Himachal Pradesh gives the first 125 units free each month. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "First 125 units free", body: "Himachal continues to give domestic consumers their first 125 units free of cost. From 126 units the slabs are merged into a single subsidised ₹4.17/unit, and above 300 units the full ₹5.90/unit applies with the earlier subsidy withdrawn." },
      { title: "How the Himachal Pradesh bill is calculated", body: "Himachal Pradesh domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹0 to ₹5.9/unit, each band charged at its own rate. A fixed charge of a flat ₹40/month applies." },
    ],
    faqs: [
      { q: "Is the Himachal Pradesh electricity tariff telescopic?", a: "Yes. Himachal Pradesh charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Himachal Pradesh domestic connection?", a: "The fixed charge is a flat ₹40/month." },
      { q: "How accurate is this Himachal Pradesh bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official HPSEBL bill." },
      { q: "Does HPSEBL supply electricity to all of Himachal Pradesh?", a: "Yes. HPSEBL is the sole distribution licensee for the entire state — unlike Rajasthan or Haryana, there's no regional split to check." },
      { q: "How do I check or pay my HPSEBL bill online?", a: "Pay via the official HPSEB Quick Pay portal at hpseb.in, or the HPSEBL mobile app. For queries, call the toll-free helpline 1800-180-8060 or 1912." },
      { q: "What is HPSEBL, and how did it form?", a: "The Himachal Pradesh State Electricity Board was constituted on 1 September 1971 under the Electricity Supply Act, 1948. It was reorganised into a limited company — Himachal Pradesh State Electricity Board Ltd (HPSEBL) — with effect from 14 June 2010, under the Companies Act." },
    ],
    billTraps: [
      { title: "The first 125 units genuinely stay free", body: "Himachal's slabs are telescopic — the first 125 units are free regardless of how much more you use that month, and only the units above 125 are billed at ₹4.17, then ₹5.90 above 300. Going over 125 units does not retroactively charge you for the free block." },
      { title: "The band above 300 units rises steeply", body: "The jump from ₹4.17 to ₹5.90/unit for consumption above 300 is a meaningful step up — a summer AC month can cost noticeably more per additional unit than a winter one." },
      { title: "HPSEBL is statewide — no regional discom to check", body: "Unlike several neighbouring states, Himachal Pradesh has one electricity board for the whole state, so there's no risk of being on a different discom than expected." },
    ],
    aboutDiscom: [
      "The Himachal Pradesh State Electricity Board was constituted on 1 September 1971, under the Electricity Supply Act, 1948, as a vertically integrated state utility.",
      "It was reorganised into Himachal Pradesh State Electricity Board Ltd (HPSEBL), a limited company, with effect from 14 June 2010. HPSEBL remains the sole distribution licensee for the entire state, headquartered in Shimla.",
    ],
    coverageQA: {
      q: "Does HPSEBL supply electricity to all of Himachal Pradesh?",
      a: "Yes. HPSEBL is the single, statewide distribution licensee for Himachal Pradesh, including Shimla — there is no regional split like in Rajasthan, Haryana or Uttar Pradesh.",
    },
    howToPay: {
      portalUrl: "https://www.hpseb.in/HPSEBQuickPay/index.html",
      portalLabel: "hpseb.in (HPSEB Quick Pay portal)",
      helpline: "1800-180-8060 / 1912 (24×7)",
      steps: [
        "Visit the HPSEB Quick Pay portal or the HPSEBL app",
        "Enter your Consumer Account number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "uttarakhand-electricity-bill-calculator",
    discomCode: "UPCL",
    h1: "Uttarakhand Electricity Bill Calculator",
    breadcrumbLabel: "Uttarakhand Bill Calculator",
    metaTitle: "Uttarakhand Electricity Bill Calculator 2026 — UPCL",
    metaDescription: "Calculate your Uttarakhand electricity bill (Uttarakhand Power Corporation Ltd (UPCL, UERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Uttarakhand tiers its fixed charge by load and gives rural/hill rebates.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['HPSEBL', 'UPPCL', 'JPDCL'],
    intro: "Estimate your Uttarakhand Power Corporation Ltd (UPCL, UERC) electricity bill for Uttarakhand. Uttarakhand tiers its fixed charge by load and gives rural/hill rebates. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Load-tiered fixed charge and hill rebates", body: "Uttarakhand’s fixed charge is tiered by sanctioned load (₹75 up to 1 kW, ₹85 up to 4 kW, ₹100 above), and rural areas get a 5% and hill areas a 10% rebate on the bill." },
      { title: "How the Uttarakhand bill is calculated", body: "Uttarakhand domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹3.65 to ₹7.8/unit, each band charged at its own rate. A fixed charge of a flat ₹85/month applies." },
    ],
    faqs: [
      { q: "Is the Uttarakhand electricity tariff telescopic?", a: "Yes. Uttarakhand charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Uttarakhand domestic connection?", a: "The fixed charge is a flat ₹85/month." },
      { q: "How accurate is this Uttarakhand bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. A ₹0.15/unit electricity duty and the rural/hill rebates are not modelled here. Always confirm against your official UPCL bill." },
      { q: "Does UPCL supply electricity to all of Uttarakhand?", a: "Yes. UPCL is the sole distribution licensee for the entire state, covering all 13 districts including Dehradun, Haridwar, Nainital and Udham Singh Nagar — there is no regional split." },
      { q: "How do I check or pay my UPCL bill online?", a: "Pay via the official Web Self Service portal at upcl.org. For queries, call the toll-free helpline 1800-419-0405 or 1912." },
      { q: "What is UPCL, and how did it form?", a: "When the state of Uttarakhand was carved out of Uttar Pradesh under the UP Reorganisation Act, 2000, the erstwhile UP State Electricity Board's assets in the new state were transferred to Uttarakhand Power Corporation Ltd (UPCL), incorporated on 12 February 2001." },
    ],
    billTraps: [
      { title: "The fixed charge depends on your sanctioned load tier", body: "UPCL charges ₹75/month up to 1 kW, ₹85/month up to 4 kW, and ₹100/month above that — not a single flat fee. A larger sanctioned load raises the fixed charge even if your usage stays the same." },
      { title: "Rural and hill rebates aren't applied automatically", body: "Rural connections get a 5% rebate and hill-area connections a 10% rebate on the bill, but this calculator does not apply these automatically — factor them in separately if you qualify." },
      { title: "Electricity duty isn't in this estimate", body: "A ₹0.15/unit electricity duty applies on top of the slab charges and is not modelled here, so your real UPCL bill will run slightly higher." },
    ],
    aboutDiscom: [
      "When Uttarakhand was created from Uttar Pradesh under the UP Reorganisation Act, 2000 — following the 1999 trifurcation of the erstwhile UP State Electricity Board under the UP Electricity Reforms Act, 1999 — its share of distribution assets was transferred to a new company, Uttarakhand Power Corporation Ltd (UPCL), incorporated on 12 February 2001.",
      "UPCL is the sole distribution licensee for the state, serving all 13 districts — Dehradun, Haridwar, Nainital, Udham Singh Nagar, Pauri, Tehri, Pithoragarh, Almora, Uttarkashi, Rudraprayag, Chamoli, Bageshwar and Champawat.",
    ],
    coverageQA: {
      q: "Does UPCL supply electricity to Dehradun and Nainital?",
      a: "Yes. UPCL is the sole distribution licensee for all of Uttarakhand, including Dehradun and Nainital — there is no regional split like in neighbouring Uttar Pradesh.",
    },
    howToPay: {
      portalUrl: "https://www.upcl.org/",
      portalLabel: "upcl.org (UPCL Web Self Service)",
      helpline: "1800-419-0405 / 1912 (24×7)",
      steps: [
        "Visit the official UPCL Web Self Service portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "goa-electricity-bill-calculator",
    discomCode: "GED",
    h1: "Goa Electricity Bill Calculator",
    breadcrumbLabel: "Goa Bill Calculator",
    metaTitle: "Goa Electricity Bill Calculator 2026 — GED",
    metaDescription: "Calculate your Goa electricity bill (Goa Electricity Department (GED, JERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Goa’s first 100 units are cheap (₹2.10) but there is no free slab.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['MSEDCL', 'MGVCL', 'BESCOM'],
    intro: "Estimate your Goa Electricity Department (GED, JERC) electricity bill for Goa. Goa’s first 100 units are cheap (₹2.10) but there is no free slab. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Cheap first slab, but no free units", body: "Goa has one of the cheapest opening slabs in India (₹2.10 for the first 100 units) but, unlike Delhi or Punjab, offers no free-unit slab — you are billed from the very first unit. A five-tier telescopic structure applies." },
      { title: "How the Goa bill is calculated", body: "Goa domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2.1 to ₹6.6/unit, each band charged at its own rate. A fixed charge of ₹25 per kW of sanctioned load applies." },
    ],
    faqs: [
      { q: "Is the Goa electricity tariff telescopic?", a: "Yes. Goa charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Goa domestic connection?", a: "The fixed charge is ₹25 per kW of sanctioned load." },
      { q: "How accurate is this Goa bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. A ₹0.30/unit combined electricity + public-lighting duty is not modelled here. Always confirm against your official GED bill." },
      { q: "Does GED supply electricity to all of Goa?", a: "Yes. The Goa Electricity Department is a direct government department and the sole licensee for generation, transmission and distribution across the entire state — including Panaji, Margao and Vasco — unlike most Indian states, which have corporatised or split their electricity boards." },
      { q: "How do I check or pay my GED bill online?", a: "Pay via the official portal at goaelectricity.gov.in (Pay Online section), or through the Goa Online e-bill service. For queries, call the 24×7 helpline 1912." },
      { q: "What is GED, and how long has it existed?", a: "The Goa Electricity Department (GED) was established in 1963 and has remained a government department ever since — it was never corporatised or privatised, making it one of the last true state \"electricity boards\" in India." },
    ],
    billTraps: [
      { title: "No free-unit slab, unlike Delhi or Punjab", body: "Goa's first 100 units are cheap at ₹2.10/unit, but there is no free-unit allowance — you're billed from the very first unit, unlike states that zero out a starting block." },
      { title: "The combined duty isn't in this estimate", body: "A ₹0.30/unit combined electricity and public-lighting duty applies on top of the slab rates and is not modelled here, so your real GED bill will run a little higher." },
      { title: "GED is a government department, not a company", body: "Unlike most states, Goa's electricity supply is run directly by a government department rather than a corporatised discom — billing processes and portals may look different from states you're used to." },
    ],
    aboutDiscom: [
      "The Goa Electricity Department (GED) was established in 1963 and remains a direct department of the Government of Goa — it was never unbundled or corporatised into a separate distribution company, unlike almost every other Indian state.",
      "GED is the sole licensee for generation, transmission and distribution across the entire state, covering Panaji, Margao, Vasco and all other areas of Goa.",
    ],
    coverageQA: {
      q: "Does GED supply electricity to all of Goa?",
      a: "Yes. GED is the single, statewide electricity provider for Goa, covering Panaji, Margao, Vasco and every other part of the state — there is no regional split or separate discom to check.",
    },
    howToPay: {
      portalUrl: "https://www.goaelectricity.gov.in/pay-online/",
      portalLabel: "goaelectricity.gov.in (official GED portal)",
      helpline: "1912 (24×7)",
      steps: [
        "Visit the official GED website's Pay Online section",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "bihar-electricity-bill-calculator",
    discomCode: "SBPDCL",
    h1: "Bihar Electricity Bill Calculator",
    breadcrumbLabel: "Bihar Bill Calculator",
    metaTitle: "Bihar Electricity Bill Calculator 2026 — SBPDCL",
    metaDescription: "Calculate your Bihar electricity bill (South Bihar Power Distribution Co. Ltd (SBPDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Bihar charges a near-flat domestic rate (₹7.42–₹7.96/unit).",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['JBVNL', 'WBSEDCL', 'UPPCL'],
    intro: "Estimate your South Bihar Power Distribution Co. Ltd (SBPDCL) electricity bill for Bihar. Bihar charges a near-flat domestic rate (₹7.42–₹7.96/unit). Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A near-flat, non-telescopic rate", body: "Unlike most states, Bihar’s domestic tariff is essentially flat — ₹7.42/unit up to 50 units and ₹7.96/unit beyond, among the higher base rates in the country. NBPDCL and SBPDCL charge the same, and BPL homes fall under the separate Kutir Jyoti category." },
      { title: "How the Bihar bill is calculated", body: "Bihar domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹7.42 to ₹7.96/unit, each band charged at its own rate. A fixed charge of ₹40 per kW of sanctioned load applies." },
    ],
    faqs: [
      { q: "Is the Bihar electricity tariff telescopic?", a: "Yes. Bihar charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Bihar domestic connection?", a: "The fixed charge is ₹40 per kW of sanctioned load." },
      { q: "How accurate is this Bihar bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official SBPDCL bill." },
      { q: "Does SBPDCL supply electricity to Patna?", a: "Yes. Patna is one of SBPDCL's core circles, part of its 17-district south Bihar territory (also including Nalanda, Gaya, Bhagalpur, Bhojpur and Rohtas). North Bihar — including Muzaffarpur, Darbhanga and Purnia — is served by the separate North Bihar Power Distribution Company (NBPDCL), on the same tariff." },
      { q: "How do I check or pay my SBPDCL bill online?", a: "Pay via the official portal at sbpdcl.co.in. For queries, call the 24×7 toll-free helpline 1912." },
      { q: "What is SBPDCL, and how did it form?", a: "The Bihar State Electricity Board (BSEB) was unbundled on 1 November 2012, under Section 14 of the Electricity Act 2003, into five companies — including two regional distribution companies, South Bihar Power Distribution Company Ltd (SBPDCL) and North Bihar Power Distribution Company Ltd (NBPDCL)." },
    ],
    billTraps: [
      { title: "SBPDCL covers only south Bihar", body: "If your connection is in north Bihar (Muzaffarpur, Darbhanga, Purnia and similar), your actual discom is NBPDCL, not SBPDCL — both share the same tariff, but bill separately." },
      { title: "The rate is nearly flat, not steeply telescopic", body: "Unlike states with dramatic slab jumps, Bihar's rate barely changes between the first 50 units (₹7.42) and everything above (₹7.96) — the main cost driver here is the high base rate itself, not which slab you're in." },
      { title: "Kutir Jyoti is a separate, lower category", body: "BPL households fall under the Kutir Jyoti scheme with different (lower) rates — this calculator uses the standard domestic (DS-I) tariff, not Kutir Jyoti." },
    ],
    aboutDiscom: [
      "The Bihar State Electricity Board (BSEB) was unbundled on 1 November 2012, under Section 14 of the Electricity Act, 2003, into five successor companies including two regional distribution companies split by geography.",
      "South Bihar Power Distribution Company Ltd (SBPDCL) serves 17 southern districts including Patna, Nalanda, Gaya and Bhagalpur, covering over 50 lakh consumers. North Bihar Power Distribution Company Ltd (NBPDCL) covers the northern districts on the same BSEB-successor tariff.",
    ],
    coverageQA: {
      q: "Does SBPDCL supply electricity to Patna?",
      a: "Yes. Patna is part of SBPDCL's south Bihar territory. If your connection is in a northern district — such as Muzaffarpur, Darbhanga or Purnia — your discom is NBPDCL instead, on the same tariff shown here.",
    },
    howToPay: {
      portalUrl: "https://sbpdcl.co.in/",
      portalLabel: "sbpdcl.co.in (official SBPDCL portal)",
      helpline: "1912 (24×7)",
      steps: [
        "Visit the official SBPDCL website",
        "Enter your Consumer ID/Account number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "odisha-electricity-bill-calculator",
    discomCode: "TPCODL",
    h1: "Odisha Electricity Bill Calculator",
    breadcrumbLabel: "Odisha Bill Calculator",
    metaTitle: "Odisha Electricity Bill Calculator 2026 — TPCODL",
    metaDescription: "Calculate your Odisha electricity bill (TP Central Odisha Distribution Ltd (TPCODL, OERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Odisha uses telescopic slabs with a low flat ₹25 fixed charge.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['WBSEDCL', 'CSPDCL', 'JBVNL'],
    intro: "Estimate your TP Central Odisha Distribution Ltd (TPCODL, OERC) electricity bill for Odisha. Odisha uses telescopic slabs with a low flat ₹25 fixed charge. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Low, flat fixed charge", body: "Odisha keeps the domestic fixed charge low and flat at about ₹25 a month regardless of load, with telescopic energy slabs. The four Tata Power distribution companies follow the same OERC schedule." },
      { title: "How the Odisha bill is calculated", body: "Odisha domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹3 to ₹6.2/unit, each band charged at its own rate. A fixed charge of a flat ₹25/month applies." },
    ],
    faqs: [
      { q: "Is the Odisha electricity tariff telescopic?", a: "Yes. Odisha charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Odisha domestic connection?", a: "The fixed charge is a flat ₹25/month." },
      { q: "How accurate is this Odisha bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. A ₹0.06/unit electricity duty is not modelled here. Always confirm against your official TPCODL bill." },
      { q: "Does TPCODL supply electricity to Bhubaneswar and Cuttack?", a: "Yes. TPCODL holds the OERC licence for the Bhubaneswar (Circles I & II), Cuttack, Paradeep and Dhenkanal distribution circles. The rest of Odisha is covered by three sister companies — TPWODL, TPSODL and TPNODL — all under the same tariff." },
      { q: "How do I check or pay my TPCODL bill online?", a: "Pay via the official portal at tpcentralodisha.com. For queries, call the 24×7 helpline 1912 or 1800-345-7122." },
      { q: "What is TPCODL, and how did it form?", a: "TPCODL was incorporated on 6 April 2020 as a subsidiary of the state-owned GRIDCO to run the former Central Electricity Supply Utility (CESU). Tata Power won a public-private partnership bid and acquired a 51% stake for ₹178.5 crore, with GRIDCO retaining 49% — making it one of India's few privatised state discoms." },
    ],
    billTraps: [
      { title: "TPCODL is one of four Odisha discoms", body: "TPCODL covers Bhubaneswar, Cuttack, Paradeep and Dhenkanal specifically. The rest of the state is split between TPWODL, TPSODL and TPNODL — all Tata Power-managed, all on the same OERC tariff, but billed separately." },
      { title: "It's a public-private partnership, not a pure private company", body: "GRIDCO (the state government) still holds 49% of TPCODL, so it isn't a fully private utility — some processes and complaint-escalation paths may still route through GRIDCO or OERC." },
      { title: "Electricity duty isn't in this estimate", body: "A ₹0.06/unit electricity duty applies on top of the slab charges and is not modelled here." },
    ],
    aboutDiscom: [
      "TP Central Odisha Distribution Ltd (TPCODL) was incorporated on 6 April 2020 as a wholly owned subsidiary of the state-owned GRIDCO, taking over the former Central Electricity Supply Utility (CESU). Tata Power won a public-private partnership bid for all four Odisha discoms and acquired a 51% stake in TPCODL for ₹178.5 crore, with GRIDCO retaining the remaining 49%.",
      "TPCODL holds the 25-year OERC distribution licence (effective 1 June 2020) for the Bhubaneswar (Circles I & II), Cuttack, Paradeep and Dhenkanal circles. The rest of Odisha is served by three sister Tata Power-managed companies: TPWODL (west), TPSODL (south) and TPNODL (north).",
    ],
    coverageQA: {
      q: "Does TPCODL supply electricity to Bhubaneswar?",
      a: "Yes. TPCODL holds the distribution licence for Bhubaneswar, Cuttack, Paradeep and Dhenkanal. Other parts of Odisha are covered by TPWODL, TPSODL or TPNODL — all Tata Power-managed and on the same OERC tariff, but billed separately.",
    },
    howToPay: {
      portalUrl: "https://portal.tpcentralodisha.com:8079/ConsumerPortal/",
      portalLabel: "tpcentralodisha.com (official TPCODL Consumer Portal)",
      helpline: "1912 / 1800-345-7122 (24×7)",
      steps: [
        "Visit the official TPCODL Consumer Portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "assam-electricity-bill-calculator",
    discomCode: "APDCL",
    h1: "Assam Electricity Bill Calculator",
    breadcrumbLabel: "Assam Bill Calculator",
    metaTitle: "Assam Electricity Bill Calculator 2026 — APDCL",
    metaDescription: "Calculate your Assam electricity bill (Assam Power Distribution Company Ltd (APDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Assam gives a ₹2.00/unit lifeline rate for the first 30 units.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['WBSEDCL', 'MePDCL', 'TSECL'],
    intro: "Estimate your Assam Power Distribution Company Ltd (APDCL) electricity bill for Assam. Assam gives a ₹2.00/unit lifeline rate for the first 30 units. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A subsidised lifeline first slab", body: "Assam charges just ₹2.00/unit for the first 30 units as a lifeline rate for low-income households, then rises through a telescopic structure to ₹7.60/unit, with a 5% electricity duty on the bill." },
      { title: "How the Assam bill is calculated", body: "Assam domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2 to ₹7.6/unit, each band charged at its own rate. A fixed charge of a flat ₹70/month applies, plus a 5% electricity duty." },
    ],
    faqs: [
      { q: "Is the Assam electricity tariff telescopic?", a: "Yes. Assam charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Assam domestic connection?", a: "The fixed charge is a flat ₹70/month." },
      { q: "How accurate is this Assam bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official APDCL bill." },
      { q: "Does APDCL supply electricity to all of Assam?", a: "Yes. APDCL is the sole distribution licensee for the entire state, serving over 33 lakh consumers from Sadiya to Dhubri, including Guwahati — there is no regional split." },
      { q: "How do I check or pay my APDCL bill online?", a: "Pay via the official portal at apdcl.org. For queries, call the 24×7 toll-free helpline 1912 (within Assam)." },
      { q: "What is APDCL, and how did it form?", a: "The Assam State Electricity Board (ASEB) was unbundled in December 2004 into five companies — one generation, one transmission and three distribution entities. Assam Power Distribution Company Ltd (APDCL) was incorporated on 23 October 2009 to take over ASEB's distribution business statewide." },
    ],
    billTraps: [
      { title: "The lifeline rate only covers the first 30 units", body: "The subsidised ₹2.00/unit rate applies only to the first 30 units of the telescopic structure — consumption above that is billed at the higher standard slabs, up to ₹7.60/unit." },
      { title: "5% electricity duty applies on top of slabs", body: "Assam's 5% electricity duty is charged on the energy bill in addition to the slab rates and fixed charge, and is easy to miss when estimating by hand." },
      { title: "APDCL is statewide — no regional discom to check", body: "Unlike Bihar, Odisha or Rajasthan, Assam has a single distribution company for the whole state, so there's no risk of being billed by a different entity." },
    ],
    aboutDiscom: [
      "The Assam State Electricity Board (ASEB) was unbundled in December 2004, as part of state power sector reforms, into one generation company, one transmission company and three distribution companies. Assam Power Distribution Company Ltd (APDCL) was incorporated on 23 October 2009 to consolidate and take over ASEB's distribution business.",
      "APDCL is the sole distribution licensee for the entire state, serving over 33 lakh consumers from Sadiya in the east to Dhubri in the west, including Guwahati.",
    ],
    coverageQA: {
      q: "Does APDCL supply electricity to Guwahati?",
      a: "Yes. APDCL is Assam's single, statewide distribution company, covering Guwahati and every other part of the state — there is no regional split to check.",
    },
    howToPay: {
      portalUrl: "https://www.apdcl.org/website/",
      portalLabel: "apdcl.org (official APDCL portal)",
      helpline: "1912 (24×7, within Assam)",
      steps: [
        "Visit the official APDCL portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "jharkhand-electricity-bill-calculator",
    discomCode: "JBVNL",
    h1: "Jharkhand Electricity Bill Calculator",
    breadcrumbLabel: "Jharkhand Bill Calculator",
    metaTitle: "Jharkhand Electricity Bill Calculator 2026 — JBVNL",
    metaDescription: "Calculate your Jharkhand electricity bill (Jharkhand Bijli Vitran Nigam Ltd (JBVNL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Jharkhand charges a flat urban rate but gives up to 200 free units a month.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['WBSEDCL', 'CSPDCL', 'SBPDCL'],
    intro: "Estimate your Jharkhand Bijli Vitran Nigam Ltd (JBVNL) electricity bill for Jharkhand. Jharkhand charges a flat urban rate but gives up to 200 free units a month. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Flat rate, but 200 units free", body: "Jharkhand charges a flat ₹6.85/unit for urban domestic supply (₹6.70 rural), but around 40 lakh of its ~46 lakh domestic consumers pay nothing because the state provides up to 200 free units per household each month." },
      { title: "How the Jharkhand bill is calculated", body: "Jharkhand domestic supply is billed monthly. Every unit is charged at a flat ₹6.85/unit. A fixed charge of ₹100 per kW of sanctioned load applies." },
    ],
    faqs: [
      { q: "Is the Jharkhand electricity tariff telescopic?", a: "Jharkhand uses a flat domestic rate rather than telescopic slabs — every unit is billed at the same rate." },
      { q: "What is the fixed charge for a Jharkhand domestic connection?", a: "The fixed charge is ₹100 per kW of sanctioned load." },
      { q: "How accurate is this Jharkhand bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official JBVNL bill." },
      { q: "Does JBVNL supply electricity to Ranchi and Jamshedpur?", a: "Yes. JBVNL operates seven electric supply areas — Ranchi, Dhanbad, Singhbhum (covering Jamshedpur), Hazaribagh, Giridih, Dumka and Medininagar — reaching essentially all residential and urban consumers across the state, alongside separate arrangements for some large industrial users." },
      { q: "How do I check or pay my JBVNL bill online?", a: "Pay via the official portal at jbvnl.co.in using Quick Pay, or the JBVNL mobile app. For queries, call the helpline 1912 or 1800-345-6570." },
      { q: "What is JBVNL, and how did it form?", a: "JBVNL was incorporated on 23 October 2013 and began operations on 6 January 2014, taking over the distribution business of the erstwhile Jharkhand State Electricity Board (JSEB), which had itself been formed when Jharkhand split from Bihar in 2000." },
    ],
    billTraps: [
      { title: "It's a flat rate, so slab position doesn't matter", body: "Unlike most states, every unit is billed at the same ₹6.85/unit (urban) regardless of how much you use — there's no telescopic discount for staying in a lower band, since there is no band." },
      { title: "The 200-free-units benefit isn't universal", body: "Around 40 lakh of JBVNL's ~46 lakh domestic consumers get up to 200 free units a month, but this depends on scheme eligibility — check your account status rather than assuming it applies." },
      { title: "Rural rates are cheaper and not modelled here", body: "This calculator uses the urban (DS-II) rate of ₹6.85/unit. Rural domestic (DS-I) connections are billed at a lower ₹6.70/unit with a different fixed charge, which isn't reflected in this estimate." },
    ],
    aboutDiscom: [
      "Jharkhand Bijli Vitran Nigam Ltd (JBVNL) was incorporated on 23 October 2013 and commenced operations on 6 January 2014, taking over the distribution business of the erstwhile Jharkhand State Electricity Board (JSEB) — itself formed when Jharkhand was carved out of Bihar in 2000.",
      "JBVNL operates through seven electric supply areas — Ranchi, Dhanbad, Singhbhum, Hazaribagh, Giridih, Dumka and Medininagar — covering cities including Ranchi, Jamshedpur, Bokaro, Deoghar and Palamu.",
    ],
    coverageQA: {
      q: "Does JBVNL supply electricity to Ranchi and Jamshedpur?",
      a: "Yes. Both cities are covered by JBVNL — Ranchi directly, and Jamshedpur under the Singhbhum supply area. JBVNL's seven supply areas cover essentially all residential and urban consumers in Jharkhand.",
    },
    howToPay: {
      portalUrl: "https://jbvnl.co.in/",
      portalLabel: "jbvnl.co.in (official JBVNL portal)",
      helpline: "1912 / 1800-345-6570 (24×7)",
      steps: [
        "Visit the official JBVNL website and select Quick Pay",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "chhattisgarh-electricity-bill-calculator",
    discomCode: "CSPDCL",
    h1: "Chhattisgarh Electricity Bill Calculator",
    breadcrumbLabel: "Chhattisgarh Bill Calculator",
    metaTitle: "Chhattisgarh Electricity Bill Calculator 2026 — CSPDCL",
    metaDescription: "Calculate your Chhattisgarh electricity bill (Chhattisgarh State Power Distribution Co. (CSPDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Chhattisgarh halves the energy charge for homes using ≤400 units (Bijli Bill Half).",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['MPCZ', 'TSSPDCL', 'JBVNL'],
    intro: "Estimate your Chhattisgarh State Power Distribution Co. (CSPDCL) electricity bill for Chhattisgarh. Chhattisgarh halves the energy charge for homes using ≤400 units (Bijli Bill Half). Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Bijli Bill Half Yojana", body: "Chhattisgarh’s Bijli Bill Half scheme cuts the energy charge in half for domestic consumers using 400 units or less a month — a major saving. Bills also carry a ₹0.30/unit VCA surcharge and roughly 8% electricity duty." },
      { title: "How the Chhattisgarh bill is calculated", body: "Chhattisgarh domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹4.1 to ₹8.3/unit, each band charged at its own rate. A fixed charge of ₹20 per kW of sanctioned load applies, plus a 8% electricity duty, and a ₹0.3/unit fuel/variable-cost surcharge." },
    ],
    faqs: [
      { q: "Is the Chhattisgarh electricity tariff telescopic?", a: "Yes. Chhattisgarh charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Chhattisgarh domestic connection?", a: "The fixed charge is ₹20 per kW of sanctioned load." },
      { q: "How accurate is this Chhattisgarh bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. The Bijli Bill Half 50% concession is not applied automatically here. Always confirm against your official CSPDCL bill." },
      { q: "Does CSPDCL supply electricity to all of Chhattisgarh?", a: "Yes. CSPDCL is the sole distribution licensee for all 33 districts of Chhattisgarh, including Raipur, Bilaspur, Durg-Bhilai, Korba and Jagdalpur — there is no regional split." },
      { q: "How do I check or pay my CSPDCL bill online?", a: "Pay via the official portal at cspdcl.co.in. For queries, call the 24×7 toll-free helpline 1912 or 1800-233-1920." },
      { q: "What is CSPDCL, and how did it form?", a: "When Chhattisgarh was carved out of Madhya Pradesh on 1 November 2000 under the MP Reorganisation Act, the erstwhile MP Electricity Board was split, and the Chhattisgarh State Electricity Board (CSEB) began operations on 1 December 2000. Following the Electricity Act 2003, CSEB was restructured into five companies, with Chhattisgarh State Power Distribution Co. Ltd (CSPDCL) established on 1 January 2009." },
    ],
    billTraps: [
      { title: "Bijli Bill Half isn't applied automatically", body: "The 50% energy-charge concession for households using 400 units or less is a genuine, large saving, but it requires scheme enrolment — this calculator does not apply it by default, so check your eligibility separately." },
      { title: "The VCA surcharge moves and isn't included", body: "CSPDCL's ₹0.30/unit variable cost adjustment can change and is not reflected in this estimate, so your real bill may differ slightly." },
      { title: "8% electricity duty is easy to overlook", body: "Chhattisgarh's roughly 8% electricity duty applies on top of the slab charges and fixed charge, and is one of the higher duty rates among neighbouring states." },
    ],
    aboutDiscom: [
      "When Chhattisgarh was carved out of Madhya Pradesh on 1 November 2000, under the MP Reorganisation Act, 2000, the erstwhile MP Electricity Board (MPEB) was split between the two new states. The Chhattisgarh State Electricity Board (CSEB) began operations on 1 December 2000.",
      "Following the Electricity Act 2003, CSEB was restructured into five companies. Chhattisgarh State Power Distribution Co. Ltd (CSPDCL) was established on 1 January 2009 and is the sole distribution licensee for all 33 districts of the state, including Raipur, Bilaspur, Durg-Bhilai and Korba.",
    ],
    coverageQA: {
      q: "Does CSPDCL supply electricity to Raipur?",
      a: "Yes. CSPDCL is the single, statewide distribution company for all 33 districts of Chhattisgarh, including Raipur, Bilaspur, Durg-Bhilai, Korba and Jagdalpur — there is no regional split to check.",
    },
    howToPay: {
      portalUrl: "https://www.cspdcl.co.in/cseb/",
      portalLabel: "cspdcl.co.in (official CSPDCL portal)",
      helpline: "1912 / 1800-233-1920 (24×7)",
      steps: [
        "Visit the official CSPDCL bill payment portal",
        "Enter your BP (Business Partner) number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "chandigarh-electricity-bill-calculator",
    discomCode: "CED",
    h1: "Chandigarh Electricity Bill Calculator",
    breadcrumbLabel: "Chandigarh Bill Calculator",
    metaTitle: "Chandigarh Electricity Bill Calculator 2026 — CED",
    metaDescription: "Calculate your Chandigarh electricity bill (UT Chandigarh Electricity Department (CED, JERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Chandigarh charges ₹2.75/unit for the first 150 units.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['PSPCL', 'UHBVN'],
    intro: "Estimate your UT Chandigarh Electricity Department (CED, JERC) electricity bill for Chandigarh. Chandigarh charges ₹2.75/unit for the first 150 units. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A cheap 150-unit first slab", body: "Chandigarh keeps the first 150 units at just ₹2.75/unit, one of the better deals for small urban households, with a 5% electricity duty charged on energy plus fixed charges and a ₹0.15/unit fuel adjustment." },
      { title: "How the Chandigarh bill is calculated", body: "Chandigarh domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2.75 to ₹5.4/unit, each band charged at its own rate. A fixed charge of a flat ₹30/month applies, plus a 5% electricity duty, and a ₹0.15/unit fuel/variable-cost surcharge." },
    ],
    faqs: [
      { q: "Is the Chandigarh electricity tariff telescopic?", a: "Yes. Chandigarh charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Chandigarh domestic connection?", a: "The fixed charge is a flat ₹30/month." },
      { q: "How accurate is this Chandigarh bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official CED bill." },
      { q: "Is Chandigarh's electricity distribution still run by the government?", a: "No, not anymore. After Punjab & Haryana High Court and Supreme Court approvals, the UT handed over distribution to Chandigarh Power Distribution Ltd (CPDL) — a subsidiary of Eminent Electricity Distribution Ltd (EEDL) under the RP-Sanjiv Goenka (CESC) Group — on 1 February 2025, for around ₹871 crore. Slab rates continue to be approved by the same regulator (JERC), not set unilaterally by CPDL." },
      { q: "How do I check or pay my Chandigarh electricity bill online?", a: "Pay via CPDL's official portal at chandigarhpower.com or the CPDL app, entering your Contract Account (CA) number. For queries, call the 24×7 helpline 19121 or +91 92402 16666." },
      { q: "What is CED, and how did Chandigarh's power supply change?", a: "Local electricity distribution was taken over by the Chandigarh Administration from the Punjab State Electricity Board on 2 May 1967, and run by the Electricity Wing of the Engineering Department (CED) for decades. In 2025 it became the first Union Territory power utility to be privatised, transferring to Chandigarh Power Distribution Ltd (CPDL)." },
    ],
    billTraps: [
      { title: "CED is now CPDL — a private operator, not a government office", body: "Since 1 February 2025, Chandigarh's power distribution has been run by Chandigarh Power Distribution Ltd (CPDL), part of the RPSG/CESC Group — not the UT government department. Older bookmarks or references to the government's sampark.chd.nic.in payment page may be out of date; use CPDL's official chandigarhpower.com portal." },
      { title: "Fixed charge is a flat ₹30/month, not per-phase or per-kW", body: "Unlike Punjab or Haryana next door, which charge based on load or phase, Chandigarh charges a single flat ₹30/month fixed charge for every domestic connection." },
      { title: "Privatisation didn't change the regulator or tariff-setting process", body: "CPDL still operates under JERC-approved tariffs, the same regulatory framework as before privatisation — rates aren't set unilaterally by the new private operator." },
    ],
    aboutDiscom: [
      "Chandigarh's local electricity distribution was taken over by the Chandigarh Administration from the Punjab State Electricity Board on 2 May 1967, and run for decades by the Electricity Wing of the Engineering Department (CED) as a UT government department.",
      "In May 2020, the Union Power Ministry decided to privatise power distribution across Union Territories, starting with Chandigarh. After Punjab & Haryana High Court (November 2024) and Supreme Court (December 2024) approvals, distribution transferred to Chandigarh Power Distribution Ltd (CPDL) — a subsidiary of Eminent Electricity Distribution Ltd (EEDL), part of the RP-Sanjiv Goenka (CESC) Group — on 1 February 2025, for a consideration of around ₹871 crore. CPDL now serves over 240,000 customers across Chandigarh's 114 sq km.",
    ],
    coverageQA: {
      q: "Is Chandigarh's electricity still supplied by a government department?",
      a: "No. Since 1 February 2025, Chandigarh Power Distribution Ltd (CPDL) — a private company under the RPSG/CESC Group — has run distribution and billing for the whole UT, taking over from the former government-run CED. Tariffs remain JERC-regulated.",
    },
    howToPay: {
      portalUrl: "https://chandigarhpower.com/",
      portalLabel: "chandigarhpower.com (official CPDL portal)",
      helpline: "19121 / +91 92402 16666 (24×7)",
      steps: [
        "Visit the official CPDL bill payment portal or open the CPDL app",
        "Enter your Contract Account (CA) number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking (no gateway charges)",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "puducherry-electricity-bill-calculator",
    discomCode: "PED-PY",
    h1: "Puducherry Electricity Bill Calculator",
    breadcrumbLabel: "Puducherry Bill Calculator",
    metaTitle: "Puducherry Electricity Bill Calculator 2026 — PED-PY",
    metaDescription: "Calculate your Puducherry electricity bill (Puducherry Electricity Department (PED)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Puducherry shields the first slab from hikes and gives BPL homes 50 free units.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['TNEB', 'APSPDCL', 'KSEB'],
    intro: "Estimate your Puducherry Electricity Department (PED) electricity bill for Puducherry. Puducherry shields the first slab from hikes and gives BPL homes 50 free units. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Government-absorbed slab-1 hike", body: "Puducherry’s government absorbs rate increases on the first 0–100 unit slab, keeping it at ₹2.90/unit, and continues to give BPL families 50 free units a month. A 5% electricity duty applies." },
      { title: "How the Puducherry bill is calculated", body: "Puducherry domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2.9 to ₹7.5/unit, each band charged at its own rate. A fixed charge of ₹25 single-phase / ₹75 three-phase applies, plus a 5% electricity duty." },
    ],
    faqs: [
      { q: "Is the Puducherry electricity tariff telescopic?", a: "Yes. Puducherry charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Puducherry domestic connection?", a: "The fixed charge is ₹25 single-phase / ₹75 three-phase." },
      { q: "How accurate is this Puducherry bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official PED-PY bill." },
      { q: "Does PED supply electricity to Karaikal, Yanam and Mahe, not just Puducherry town?", a: "Yes. PED is a deemed licensee under the Electricity Act 2003 for the whole Union Territory, and supplies all four regions — Puducherry, Karaikal, Yanam and Mahe — even though they are physically separate enclaves surrounded by Tamil Nadu, Andhra Pradesh and Kerala respectively." },
      { q: "How do I check or pay my PED electricity bill online?", a: "Pay via the official portal at pedservices.py.gov.in using net banking, card, UPI or BBPS. For queries, call the 24×7 toll-free helpline 1800-425-1912, or the short code 1912." },
      { q: "What is PED, and how did it form?", a: "The Electricity Department, Government of Puducherry (PED) is a deemed licensee under Section 14 of the Electricity Act 2003, operated directly by the UT government rather than as a separate corporation. All towns and villages in the Union Territory were electrified as early as 1972." },
    ],
    billTraps: [
      { title: "The 50 free units are BPL-only", body: "Puducherry's 50-free-units scheme applies only to BPL (Below Poverty Line) households, not to every domestic consumer — check your ration-card-linked eligibility rather than assuming it applies." },
      { title: "Karaikal, Yanam and Mahe aren't separate DISCOMs", body: "Because these three regions are geographically detached from Puducherry town and sit inside other states, some assume they're billed by Tamil Nadu, Andhra Pradesh or Kerala utilities. All four regions are actually billed by PED under one UT-wide tariff." },
      { title: "Fixed charge depends on phase, not category", body: "The ₹25 vs ₹75 fixed charge split is based on whether your connection is single-phase or three-phase, not on your consumption or connection category — check your meter type if your fixed charge looks unexpected." },
    ],
    aboutDiscom: [
      "The Electricity Department, Government of Puducherry (PED) is a deemed licensee under Section 14 of the Electricity Act, 2003, for transmission, distribution and retail supply across the Union Territory. Unlike most Indian states, Puducherry has not corporatized its power utility into a separate company — PED operates directly as a government department.",
      "PED supplies all four regions of the Union Territory — Puducherry, Karaikal, Yanam and Mahe — despite them being non-contiguous enclaves surrounded by Tamil Nadu, Andhra Pradesh and Kerala. All towns and villages in the UT were fully electrified as early as 1972.",
    ],
    coverageQA: {
      q: "Does PED supply electricity to Karaikal, Yanam and Mahe as well as Puducherry town?",
      a: "Yes. PED is the sole electricity supplier across all four regions of the Union Territory — Puducherry, Karaikal, Yanam and Mahe — even though Karaikal and Yanam sit inside Tamil Nadu and Andhra Pradesh respectively, and Mahe sits inside Kerala.",
    },
    howToPay: {
      portalUrl: "https://pedservices.py.gov.in/",
      portalLabel: "pedservices.py.gov.in (official PED portal)",
      helpline: "1800-425-1912 / 1912 (24×7 toll-free)",
      steps: [
        "Visit the official PED services portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via net banking, card, UPI or BBPS",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "jammu-and-kashmir-electricity-bill-calculator",
    discomCode: "JPDCL",
    h1: "Jammu & Kashmir Electricity Bill Calculator",
    breadcrumbLabel: "Jammu & Kashmir Bill Calculator",
    metaTitle: "Jammu & Kashmir Electricity Bill Calculator 2026 — JPDCL",
    metaDescription: "Calculate your Jammu & Kashmir electricity bill (Jammu Power Distribution Corporation Ltd (JPDCL, JERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. J&K charges a heavily subsidised ₹2.45/unit up to 200 units.",
    exampleUnits: 200,
    exampleEligible: false,
    neighboringDiscoms: ['HPSEBL', 'PSPCL', 'LPDD'],
    intro: "Estimate your Jammu Power Distribution Corporation Ltd (JPDCL, JERC) electricity bill for Jammu & Kashmir. J&K charges a heavily subsidised ₹2.45/unit up to 200 units. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Heavily subsidised low tariffs", body: "Jammu & Kashmir runs some of India’s most subsidised domestic tariffs — ₹2.45/unit up to 200 units — even though the UT buys power far dearer than it sells it. JPDCL (Jammu) and KPDCL (Kashmir) share the JERC schedule." },
      { title: "How the Jammu & Kashmir bill is calculated", body: "Jammu & Kashmir domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2.45 to ₹4.6/unit, each band charged at its own rate. A fixed charge of ₹10 per kW of sanctioned load applies." },
    ],
    faqs: [
      { q: "Is the Jammu & Kashmir electricity tariff telescopic?", a: "Yes. Jammu & Kashmir charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Jammu & Kashmir domestic connection?", a: "The fixed charge is ₹10 per kW of sanctioned load." },
      { q: "How accurate is this Jammu & Kashmir bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official JPDCL bill." },
      { q: "Does JPDCL supply electricity to Srinagar and the Kashmir valley?", a: "No. JPDCL distributes power only in the 10 districts of Jammu division — Jammu, Samba, Kathua, Kishtwar, Doda, Reasi, Ramban, Poonch, Rajouri and Udhampur. Srinagar and the Kashmir valley are served by a separate company, KPDCL, though both are billed under the same JERC-approved domestic tariff." },
      { q: "How do I check or pay my JPDCL bill online?", a: "Pay via the new JPDCL web self-service portal at wss.jpdcl.co.in, or the Bill Suvidha mobile app. For queries, call the 24×7 helpline 1800-180-7183 or 1912." },
      { q: "What is JPDCL, and how did it form?", a: "JPDCL was incorporated on 30 October 2019, after J&K's State Administrative Council approved unbundling the Power Development Department into five companies — JKPCL, JKPTCL, JPDCL, KPDCL and a Ladakh entity — on 23 October 2019, ahead of J&K's reorganisation into a Union Territory." },
    ],
    billTraps: [
      { title: "This page models JPDCL (Jammu division), not KPDCL", body: "If your connection is in Srinagar or elsewhere in the Kashmir valley, your supplier is KPDCL, not JPDCL — check your bill's issuing company. Both are usually approved under the same JERC domestic tariff, but confirm your own slab rates rather than assuming." },
      { title: "Fixed charge is load-based, not phase-based", body: "Unlike many neighbouring states that charge a flat single-phase/three-phase fixed amount, J&K charges ₹10 per kW of your sanctioned load — a higher-load connection carries a proportionally higher fixed charge." },
      { title: "Deeply subsidised rates don't reflect the real cost of supply", body: "J&K's domestic tariff of ₹2.45–4.60/unit is well below the actual cost of power procurement, with the gap covered by UT subsidy — a useful fact if you're comparing J&K's low bill to a neighbouring state and wondering why the difference is so large." },
    ],
    aboutDiscom: [
      "J&K's Power Development Department was unbundled into five companies — J&K Power Corporation Ltd (JKPCL), J&K Power Transmission Corporation Ltd (JKPTCL), Jammu Power Distribution Corporation Ltd (JPDCL), Kashmir Power Distribution Corporation Ltd (KPDCL) and a Ladakh power entity — following State Administrative Council approval on 23 October 2019. JPDCL itself was incorporated a week later, on 30 October 2019.",
      "JPDCL distributes electricity across 10 districts of the Jammu division: Jammu, Samba, Kathua, Kishtwar, Doda, Reasi, Ramban, Poonch, Rajouri and Udhampur. The Kashmir valley is served separately by KPDCL, and Ladakh — split off as its own Union Territory in 2019 — is now served by the Ladakh Power Development Department (LPDD).",
    ],
    coverageQA: {
      q: "Does JPDCL supply electricity to Srinagar or the Kashmir valley?",
      a: "No. JPDCL covers only the 10 districts of Jammu division. Srinagar and the rest of the Kashmir valley are served by a separate distribution company, KPDCL — both operate under the same JERC-approved tariff framework but are billed by different entities.",
    },
    howToPay: {
      portalUrl: "https://wss.jpdcl.co.in/",
      portalLabel: "wss.jpdcl.co.in (official JPDCL web self-service portal)",
      helpline: "1800-180-7183 / 1912 (24×7)",
      steps: [
        "Visit the JPDCL web self-service portal or open the Bill Suvidha app",
        "Enter your Consumer Account Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "tripura-electricity-bill-calculator",
    discomCode: "TSECL",
    h1: "Tripura Electricity Bill Calculator",
    breadcrumbLabel: "Tripura Bill Calculator",
    metaTitle: "Tripura Electricity Bill Calculator 2026 — TSECL",
    metaDescription: "Calculate your Tripura electricity bill (Tripura State Electricity Corporation Ltd (TSECL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Tripura makes the first 100 domestic units free.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['APDCL', 'PED-MZ'],
    intro: "Estimate your Tripura State Electricity Corporation Ltd (TSECL) electricity bill for Tripura. Tripura makes the first 100 domestic units free. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "First 100 units free", body: "Tripura’s revised TSERC tariff makes the first 100 units completely free for domestic consumers, then charges ₹4.00 and ₹6.00/unit, with a low ₹16/kW fixed charge and a ₹0.20/unit fuel adjustment." },
      { title: "How the Tripura bill is calculated", body: "Tripura domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹0 to ₹6/unit, each band charged at its own rate. A fixed charge of ₹16 per kW of sanctioned load applies, plus a 5% electricity duty, and a ₹0.2/unit fuel/variable-cost surcharge." },
    ],
    faqs: [
      { q: "Is the Tripura electricity tariff telescopic?", a: "Yes. Tripura charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Tripura domestic connection?", a: "The fixed charge is ₹16 per kW of sanctioned load." },
      { q: "How accurate is this Tripura bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official TSECL bill." },
      { q: "Does TSECL supply electricity across all of Tripura?", a: "Yes. TSECL is the sole distribution licensee for the entire state, serving around 9.33 lakh consumers — there is no regional split like in some neighbouring states." },
      { q: "How do I check or pay my TSECL bill online?", a: "Pay via the official portal at tsecl.in or the Tripura Power mobile app. For queries, call the 24×7 toll-free helpline 1912, or the local number 0381-235-3502." },
      { q: "What is TSECL, and how did it form?", a: "TSECL was incorporated on 9 June 2004 and began operations on 1 January 2005, taking over generation, transmission and distribution from Tripura's erstwhile state Power Department. Generation was later hived off into Tripura Power Generation Ltd (TPGL) in January 2015, and transmission into Tripura Power Transmission Ltd (TPTL) on 19 January 2023 — TSECL today focuses on distribution and retail supply." },
    ],
    billTraps: [
      { title: "The first 100 units are always free, not a one-time offer", body: "Every domestic bill gets the first 100 units at ₹0, regardless of how much you use above that — at 150 units, only the 50 units above 100 are charged, exactly as the telescopic structure works for any other slab." },
      { title: "TSECL bills you, but no longer generates your power", body: "Since 2015 and 2023, generation and transmission have been run by separate sister companies (TPGL and TPTL). TSECL is now purely the retail distribution and billing entity, though your bill still says TSECL." },
      { title: "The ₹0.20/unit fuel surcharge is easy to miss", body: "On top of the slab rates, a small fuel and variable-cost adjustment of ₹0.20/unit applies to your whole consumption — it's a modest amount but not shown in the headline slab rates." },
    ],
    aboutDiscom: [
      "Tripura State Electricity Corporation Ltd (TSECL) was incorporated on 9 June 2004 and commenced operations on 1 January 2005, taking over the assets and network of Tripura's erstwhile state Power Department as the UT's deemed licensee for generation, transmission and distribution.",
      "Generation was later split into a separate company, Tripura Power Generation Ltd (TPGL), in January 2015, and transmission into Tripura Power Transmission Ltd (TPTL) on 19 January 2023 — TSECL today handles distribution and retail billing for around 9.33 lakh consumers statewide.",
    ],
    coverageQA: {
      q: "Does TSECL supply electricity across all of Tripura?",
      a: "Yes. TSECL is the single, statewide distribution licensee for Tripura, serving roughly 9.33 lakh consumers with no regional or district-level split.",
    },
    howToPay: {
      portalUrl: "https://tsecl.in/",
      portalLabel: "tsecl.in (official TSECL portal)",
      helpline: "1912 (24×7 toll-free) / 0381-235-3502 (local)",
      steps: [
        "Visit the official TSECL website or open the Tripura Power app",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "sikkim-electricity-bill-calculator",
    discomCode: "EPD-SK",
    h1: "Sikkim Electricity Bill Calculator",
    breadcrumbLabel: "Sikkim Bill Calculator",
    metaTitle: "Sikkim Electricity Bill Calculator 2026 — EPD-SK",
    metaDescription: "Calculate your Sikkim electricity bill (Energy & Power Department, Sikkim (SERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Sikkim has among India’s lowest domestic tariffs (from ₹1.10/unit).",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['WBSEDCL', 'APDCL'],
    intro: "Estimate your Energy & Power Department, Sikkim (SERC) electricity bill for Sikkim. Sikkim has among India’s lowest domestic tariffs (from ₹1.10/unit). Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Among the lowest tariffs in India", body: "Sikkim has some of the cheapest domestic power in the country — a ₹1.10/unit lifeline for the first 50 units, rising only to ₹4.10 above 200 — with a phase-based fixed charge of ₹50 (single) or ₹200 (three-phase)." },
      { title: "How the Sikkim bill is calculated", body: "Sikkim domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹1.1 to ₹4.1/unit, each band charged at its own rate. A fixed charge of ₹50 single-phase / ₹200 three-phase applies, plus a 5% electricity duty." },
    ],
    faqs: [
      { q: "Is the Sikkim electricity tariff telescopic?", a: "Yes. Sikkim charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Sikkim domestic connection?", a: "The fixed charge is ₹50 single-phase / ₹200 three-phase." },
      { q: "How accurate is this Sikkim bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official EPD-SK bill." },
      { q: "Does EPD supply electricity across all of Sikkim, including remote areas?", a: "Yes. EPD's transmission and distribution network reaches nearly every household across Sikkim's mountainous terrain, though remote hamlets were connected many decades after the Gangtok area." },
      { q: "How do I check or pay my Sikkim EPD electricity bill online?", a: "Pay via the Consumer Self-Service portal at selfservice.powersikkim.in, or the bill payment portal at payment.powersikkim.in using your Contract Account Number. PhonePe and RTGS/NEFT are also supported." },
      { q: "What is EPD, and how did Sikkim's power sector begin?", a: "Sikkim's power sector traces back to 27 May 1927, when a 50 kW micro-hydel plant was commissioned at Ranikhola near Gangtok. Growth accelerated after Sikkim joined the Indian Union on 16 May 1975 as its 22nd state. Electricity is supplied directly by the state government's Energy & Power Department (EPD), which — like Puducherry's PED — has not been corporatized into a separate company." },
    ],
    billTraps: [
      { title: "Each slab step adds roughly ₹1/unit", body: "Sikkim's rate climbs from ₹1.10 to ₹2.10 to ₹3.10 to ₹4.10/unit in fairly even ₹1 steps — cheap at low consumption, but your average rate rises quickly as you cross 50, 100 and 200 units, faster than the flat-looking headline rate suggests." },
      { title: "EPD is a government department, not a corporation", body: "Like Puducherry, Sikkim has not corporatized its power utility — EPD operates as a direct state government department. Billing and support channels can differ from the corporatized DISCOM model used in most other states." },
      { title: "Fixed charge is phase-based, not load-based", body: "Sikkim charges a flat ₹50 (single-phase) or ₹200 (three-phase) fixed charge regardless of your sanctioned load in kW — unlike neighbouring northeast states such as Tripura and Manipur, which charge per kW." },
    ],
    aboutDiscom: [
      "Sikkim's power sector dates to 27 May 1927, when a 50 kW micro-hydel plant was commissioned at Ranikhola near Gangtok — one of the earliest hydro installations in the eastern Himalayas. A diesel power house followed in Gangtok in 1957.",
      "After Sikkim joined the Indian Union on 16 May 1975 as its 22nd state, the power network expanded substantially to reach remote mountainous areas. Electricity is supplied directly by the state government's Energy & Power Department (EPD) — Sikkim has not corporatized its distribution business into a separate company.",
    ],
    coverageQA: {
      q: "Does EPD supply electricity across all of Sikkim, including remote mountain areas?",
      a: "Yes. EPD's transmission and distribution network extends across nearly the entire state, including remote and mountainous districts, though full connectivity to the most remote hamlets took decades longer than in and around Gangtok.",
    },
    howToPay: {
      portalUrl: "https://selfservice.powersikkim.in/",
      portalLabel: "selfservice.powersikkim.in (official EPD self-service portal)",
      helpline: "+91 89185 99879 (payment status) / EPD Customer Care Centre, Gangtok",
      steps: [
        "Visit the EPD Consumer Self-Service or payment portal",
        "Enter your Contract Account Number to fetch your current bill",
        "Verify the amount and pay via PhonePe, RTGS/NEFT or the listed options",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "meghalaya-electricity-bill-calculator",
    discomCode: "MePDCL",
    h1: "Meghalaya Electricity Bill Calculator",
    breadcrumbLabel: "Meghalaya Bill Calculator",
    metaTitle: "Meghalaya Electricity Bill Calculator 2026 — MePDCL",
    metaDescription: "Calculate your Meghalaya electricity bill (Meghalaya Power Distribution Corporation Ltd (MePDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Meghalaya uses a three-slab tariff with an ₹80/kW fixed charge.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['APDCL', 'WBSEDCL'],
    intro: "Estimate your Meghalaya Power Distribution Corporation Ltd (MePDCL) electricity bill for Meghalaya. Meghalaya uses a three-slab tariff with an ₹80/kW fixed charge. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A flat-ish three-slab tariff", body: "Meghalaya uses a compact three-slab telescopic tariff (₹4.50 / ₹5.00 / ₹6.50) with a relatively high ₹80/kW fixed charge and a 5% electricity duty. BPL homes get a concessional ₹3.65/unit for the first 30 units." },
      { title: "How the Meghalaya bill is calculated", body: "Meghalaya domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹4.5 to ₹6.5/unit, each band charged at its own rate. A fixed charge of ₹80 per kW of sanctioned load applies, plus a 5% electricity duty." },
    ],
    faqs: [
      { q: "Is the Meghalaya electricity tariff telescopic?", a: "Yes. Meghalaya charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Meghalaya domestic connection?", a: "The fixed charge is ₹80 per kW of sanctioned load." },
      { q: "How accurate is this Meghalaya bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official MePDCL bill." },
      { q: "Does MePDCL supply electricity across all of Meghalaya, including Shillong?", a: "Yes. MePDCL is the distribution arm for the entire state, headquartered in Shillong, and covers both urban and rural areas under the Meghalaya Power Sector Transfer Scheme, 2010." },
      { q: "How do I check or pay my MePDCL bill online?", a: "Pay via the MeECL group's online portal (meghapower.com / MeECL's Pay Bill page) using your Consumer ID. For queries, call the 24×7 toll-free helpline 1912, or 0364-2590610 in Shillong." },
      { q: "What is MePDCL, and how did it form?", a: "MePDCL was incorporated on 18 December 2009, after Meghalaya unbundled its State Electricity Board under the Meghalaya Power Sector Reforms Transfer Scheme, 2010, into four companies: MeECL (holding), MePDCL (distribution), MePGCL (generation) and MePTCL (transmission)." },
    ],
    billTraps: [
      { title: "MePDCL bills you, MeECL is the parent holding company", body: "Meghalaya's power sector has four sister companies under the Meghalaya Power Sector Transfer Scheme — MeECL is the holding company, while MePDCL is the one that actually distributes power and issues your bill. Make sure any portal or complaint you use is the MePDCL-specific one." },
      { title: "The ₹80/kW fixed charge is high relative to neighbours", body: "Meghalaya's fixed charge of ₹80 per kW of sanctioned load is on the higher end among northeast states — a larger sanctioned load adds meaningfully more to your fixed charge than in states with flat or lower per-kW rates." },
      { title: "The BPL concessional rate isn't applied automatically", body: "A ₹3.65/unit concessional rate for the first 30 units is available to BPL households, but this calculator uses the standard domestic slabs — check your own BPL/scheme eligibility separately." },
    ],
    aboutDiscom: [
      "Under the Meghalaya Power Sector Reforms Transfer Scheme, 2010, the state government unbundled the former Meghalaya State Electricity Board into four companies: Meghalaya Energy Corporation Ltd (MeECL, the holding company), Meghalaya Power Distribution Corporation Ltd (MePDCL, distribution), Meghalaya Power Generation Corporation Ltd (MePGCL, generation) and Meghalaya Power Transmission Corporation Ltd (MePTCL, transmission).",
      "MePDCL itself was incorporated on 18 December 2009 and has been vested with statewide distribution since the transfer scheme took effect, serving both urban centres like Shillong and rural areas across the state.",
    ],
    coverageQA: {
      q: "Does MePDCL supply electricity across all of Meghalaya, including Shillong?",
      a: "Yes. MePDCL is the sole distribution utility for the entire state, headquartered in Shillong, and its network reaches both urban and rural areas under the state's 2010 power sector transfer scheme.",
    },
    howToPay: {
      portalUrl: "https://www.meghapower.com/",
      portalLabel: "meghapower.com (official MeECL/MePDCL bill payment portal)",
      helpline: "1912 (24×7 toll-free) / 0364-2590610 (Shillong)",
      steps: [
        "Visit the MeECL group's online bill payment portal",
        "Enter your Consumer ID and registered mobile number",
        "Verify the pending bill amount and pay online",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "manipur-electricity-bill-calculator",
    discomCode: "MSPDCL",
    h1: "Manipur Electricity Bill Calculator",
    breadcrumbLabel: "Manipur Bill Calculator",
    metaTitle: "Manipur Electricity Bill Calculator 2026 — MSPDCL",
    metaDescription: "Calculate your Manipur electricity bill (Manipur State Power Distribution Co. Ltd (MSPDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Manipur uses a simple three-tier domestic tariff.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['APDCL', 'DOPN'],
    intro: "Estimate your Manipur State Power Distribution Co. Ltd (MSPDCL) electricity bill for Manipur. Manipur uses a simple three-tier domestic tariff. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A simple three-tier structure", body: "Manipur charges domestic consumers on a three-tier telescopic basis (₹4.50 / ₹5.50 / ₹6.50) with a ₹70/kW monthly fixed charge and a 5% electricity duty." },
      { title: "How the Manipur bill is calculated", body: "Manipur domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹4.5 to ₹6.5/unit, each band charged at its own rate. A fixed charge of ₹70 per kW of sanctioned load applies, plus a 5% electricity duty." },
    ],
    faqs: [
      { q: "Is the Manipur electricity tariff telescopic?", a: "Yes. Manipur charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Manipur domestic connection?", a: "The fixed charge is ₹70 per kW of sanctioned load." },
      { q: "How accurate is this Manipur bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official MSPDCL bill." },
      { q: "Does MSPDCL supply electricity across all of Manipur, including Imphal?", a: "Yes. MSPDCL is the state distribution utility and deemed licensee for the whole of Manipur, including Imphal, with divisional operations across the state's districts." },
      { q: "How do I check or pay my MSPDCL bill online?", a: "Pay via the official e-Bill portal at billing.mspdcl.info. For queries, call the toll-free helpline 1912, the Imphal helpline (0385) 2410060, or WhatsApp +91 76400 81238." },
      { q: "What is MSPDCL, and how did it form?", a: "MSPDCL was created on 1 February 2014 when the erstwhile Electricity Department, Government of Manipur, was unbundled under the Manipur State Electricity Reforms Transfer Scheme, 2013, into Manipur State Power Company Ltd (MSPCL) and Manipur State Power Distribution Co. Ltd (MSPDCL) — a 100% subsidiary of MSPCL that now handles distribution and retail supply as the state's deemed licensee." },
    ],
    billTraps: [
      { title: "MSPDCL is a subsidiary of MSPCL — check which one you need", body: "MSPCL (the parent) and MSPDCL (distribution) are separate companies with separate contact channels. For billing, meter or supply issues, use MSPDCL's portal and helpline, not MSPCL's." },
      { title: "Fixed charge is per kW, not a flat monthly amount", body: "Manipur's ₹70/kW fixed charge scales with your sanctioned load — a higher-load connection carries a proportionally higher fixed charge than a small single-point residential connection." },
      { title: "5% electricity duty applies on top of energy and fixed charges", body: "Like most northeast states, Manipur adds a 5% electricity duty to the combined energy and fixed charge — easy to forget when mentally estimating from the slab rates alone." },
    ],
    aboutDiscom: [
      "The erstwhile Electricity Department, Government of Manipur, was unbundled on 1 February 2014 under the Manipur State Electricity Reforms Transfer Scheme, 2013 (as mandated by the Electricity Act, 2003), into two state-owned companies: Manipur State Power Company Ltd (MSPCL) and Manipur State Power Distribution Co. Ltd (MSPDCL).",
      "MSPDCL is a 100% subsidiary of MSPCL, incorporated to carry out power distribution and retail supply within the state as a deemed licensee. It houses the entire 11kV-and-below distribution network across Manipur's districts, including Imphal.",
    ],
    coverageQA: {
      q: "Does MSPDCL supply electricity across all of Manipur, including Imphal?",
      a: "Yes. MSPDCL is Manipur's sole distribution licensee, operating divisional offices across the state's districts, including Imphal East and Imphal West — there is no separate DISCOM for the capital.",
    },
    howToPay: {
      portalUrl: "https://billing.mspdcl.info/",
      portalLabel: "billing.mspdcl.info (official MSPDCL e-Bill portal)",
      helpline: "1912 (toll-free) / (0385) 2410060 (Imphal)",
      steps: [
        "Visit the official MSPDCL e-Bill portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "arunachal-pradesh-electricity-bill-calculator",
    discomCode: "APDOP",
    h1: "Arunachal Pradesh Electricity Bill Calculator",
    breadcrumbLabel: "Arunachal Pradesh Bill Calculator",
    metaTitle: "Arunachal Pradesh Electricity Bill Calculator 2026 — APDOP",
    metaDescription: "Calculate your Arunachal Pradesh electricity bill (Department of Power, Arunachal Pradesh). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Arunachal Pradesh charges a flat ₹4.40/unit with no slabs.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['APDCL', 'DOPN'],
    intro: "Estimate your Department of Power, Arunachal Pradesh electricity bill for Arunachal Pradesh. Arunachal Pradesh charges a flat ₹4.40/unit with no slabs. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A single flat rate", body: "Arunachal Pradesh uses a flat domestic tariff of about ₹4.40 per unit with no telescopic slabs — every unit is billed at the same rate. Power is run by the state Department of Power." },
      { title: "How the Arunachal Pradesh bill is calculated", body: "Arunachal Pradesh domestic supply is billed monthly. Every unit is charged at a flat ₹4.4/unit. A fixed charge of a flat ₹30/month applies." },
    ],
    faqs: [
      { q: "Is the Arunachal Pradesh electricity tariff telescopic?", a: "Arunachal Pradesh uses a flat domestic rate rather than telescopic slabs — every unit is billed at the same rate." },
      { q: "What is the fixed charge for a Arunachal Pradesh domestic connection?", a: "The fixed charge is a flat ₹30/month." },
      { q: "How accurate is this Arunachal Pradesh bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Slab detail is limited; this uses the published flat domestic rate. Always confirm against your official APDOP bill." },
      { q: "Does the Department of Power supply electricity across all of Arunachal Pradesh?", a: "Yes. The Department of Power (DoP) is the state government body responsible for transmission and distribution of electricity throughout Arunachal Pradesh, headquartered in Itanagar, with divisional offices across the state's districts." },
      { q: "How do I check or pay my Arunachal Pradesh electricity bill online?", a: "Pay via the official DoP portal at arpdop.gov.in. For power-supply complaints, call the 24×7 toll-free helpline 1912; for online payment issues, prepaid support is at 60338-74608/09 and postpaid support at 60338-74612/13." },
      { q: "What is APDOP, and is it a corporatized DISCOM?", a: "No. Unlike most Indian states, Arunachal Pradesh has not corporatized its power utility into a separate DISCOM company — the Department of Power (DoP) operates directly as a state government department, handling policy, transmission and distribution together." },
    ],
    billTraps: [
      { title: "A flat rate means no slab-based savings for low usage", body: "Because Arunachal Pradesh has no telescopic slabs, a low-consumption household doesn't get a cheaper starting rate the way it would in most other states — every unit, from the first to the last, costs the same ₹4.40." },
      { title: "DoP is a government department, not a company", body: "Billing, complaints and connections are handled directly by the state Department of Power rather than a separate corporatized DISCOM — support channels and processes can look different from neighbouring states with a company-style utility." },
      { title: "Published slab/rate detail is limited for this state", body: "Public secondary sources for Arunachal Pradesh's tariff structure are thinner than for most states — this estimate uses the published flat domestic rate, and you should treat it as indicative pending confirmation against your own bill or the APSERC tariff order." },
    ],
    aboutDiscom: [
      "The Department of Power (DoP), Government of Arunachal Pradesh, is a state government department — not a corporatized company — responsible for transmission and distribution of electricity across the state, and for advising the state government on power-sector matters.",
      "DoP is headquartered in Itanagar and operates through divisional and sub-divisional offices across Arunachal Pradesh's districts. Tariffs are approved by the Arunachal Pradesh State Electricity Regulatory Commission (APSERC).",
    ],
    coverageQA: {
      q: "Does the Department of Power supply electricity across all of Arunachal Pradesh?",
      a: "Yes. DoP is the sole transmission and distribution authority for the entire state, operating through district-level divisional offices rather than a separate regional DISCOM structure.",
    },
    howToPay: {
      portalUrl: "https://www.arpdop.gov.in/",
      portalLabel: "arpdop.gov.in (official Department of Power portal)",
      helpline: "1912 (24×7 toll-free) / support@arpdop.gov.in",
      steps: [
        "Visit the official Department of Power bill payment portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via the listed online payment options",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "mizoram-electricity-bill-calculator",
    discomCode: "PED-MZ",
    h1: "Mizoram Electricity Bill Calculator",
    breadcrumbLabel: "Mizoram Bill Calculator",
    metaTitle: "Mizoram Electricity Bill Calculator 2026 — PED-MZ",
    metaDescription: "Calculate your Mizoram electricity bill (Power & Electricity Department, Mizoram). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Mizoram has a comparatively high domestic tariff (from ~₹4.20/unit).",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['TSECL', 'MSPDCL'],
    intro: "Estimate your Power & Electricity Department, Mizoram electricity bill for Mizoram. Mizoram has a comparatively high domestic tariff (from ~₹4.20/unit). Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A high north-eastern tariff", body: "Mizoram’s domestic power is relatively expensive by Indian standards, starting around ₹4.20/unit. Detailed public slab data is limited, so this uses an indicative two-slab structure." },
      { title: "How the Mizoram bill is calculated", body: "Mizoram domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹4.2 to ₹6/unit, each band charged at its own rate. A fixed charge of a flat ₹30/month applies." },
    ],
    faqs: [
      { q: "Is the Mizoram electricity tariff telescopic?", a: "Yes. Mizoram charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Mizoram domestic connection?", a: "The fixed charge is a flat ₹30/month." },
      { q: "How accurate is this Mizoram bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Public slab detail is limited; the structure here is indicative and needs verification. Always confirm against your official PED-MZ bill." },
      { q: "Does PED-MZ supply electricity across all of Mizoram, including Aizawl?", a: "Yes. The Power & Electricity Department is an integrated utility responsible for generation, transmission and distribution across the whole state, headquartered in Aizawl." },
      { q: "How do I check or pay my Mizoram PED bill online?", a: "Pay via the official portal at power.mizoram.gov.in or powerbilling.mizoram.gov.in. For queries, call 0389-2321650, 0389-2322174 or 0389-2310169." },
      { q: "What is PED-MZ, and how did it form?", a: "Mizoram's power sector was managed by the Assam State Electricity Board until March 1975, when the Power & Electricity Department (PED) was created as Mizoram gained its own administration. It reached full directorate status in 1983 with a Chief Engineer, and an Engineer-in-Chief post was added in 2008 to head the department." },
    ],
    billTraps: [
      { title: "A single department runs generation through to your meter", body: "Unlike states that have split generation, transmission and distribution into separate companies, Mizoram's PED handles all three as one integrated department — useful to know since a single helpline covers supply issues end-to-end." },
      { title: "The jump above 100 units is steep", body: "Mizoram's rate rises from ₹4.20 to ₹6.00/unit once you cross 100 units — a roughly 43% jump on every unit beyond the first slab, larger than in many other states." },
      { title: "Fixed charge is a flat ₹30/month, not tied to load", body: "Every domestic connection pays the same ₹30 fixed charge regardless of sanctioned load or phase, unlike neighbouring Tripura and Manipur, which charge per kW." },
    ],
    aboutDiscom: [
      "Before Mizoram had its own power administration, electricity generation and distribution were managed by the Assam State Electricity Board (ASEB) until March 1975. The Power & Electricity Department (PED) was created that year under the State PWD's Superintending Engineer before becoming independent in the early 1980s.",
      "PED reached full directorate-level status in 1983 with the creation of a Chief Engineer post, and an Engineer-in-Chief post was added in 2008 as head of department. PED functions as an integrated utility — generation, transmission, distribution and despatch — headquartered in Khatla, Aizawl.",
    ],
    coverageQA: {
      q: "Does PED-MZ supply electricity across all of Mizoram, including Aizawl?",
      a: "Yes. PED is Mizoram's sole, integrated power utility, covering generation, transmission and distribution statewide from its Aizawl headquarters.",
    },
    howToPay: {
      portalUrl: "https://power.mizoram.gov.in/",
      portalLabel: "power.mizoram.gov.in (official PED Mizoram portal)",
      helpline: "0389-2321650 / 0389-2322174 / 0389-2310169",
      steps: [
        "Visit the official PED Mizoram bill payment portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via the listed online options or BBPS",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "nagaland-electricity-bill-calculator",
    discomCode: "DOPN",
    h1: "Nagaland Electricity Bill Calculator",
    breadcrumbLabel: "Nagaland Bill Calculator",
    metaTitle: "Nagaland Electricity Bill Calculator 2026 — DOPN",
    metaDescription: "Calculate your Nagaland electricity bill (Department of Power, Nagaland). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Nagaland has one of India’s highest domestic tariffs.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['APDCL', 'MSPDCL'],
    intro: "Estimate your Department of Power, Nagaland electricity bill for Nagaland. Nagaland has one of India’s highest domestic tariffs. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Among the highest tariffs in India", body: "Nagaland’s domestic electricity is among the most expensive in the country. Reliable public slab data is scarce, so this uses an indicative structure starting near ₹3.80/unit." },
      { title: "How the Nagaland bill is calculated", body: "Nagaland domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹3.8 to ₹6.5/unit, each band charged at its own rate. A fixed charge of a flat ₹30/month applies." },
    ],
    faqs: [
      { q: "Is the Nagaland electricity tariff telescopic?", a: "Yes. Nagaland charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Nagaland domestic connection?", a: "The fixed charge is a flat ₹30/month." },
      { q: "How accurate is this Nagaland bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Public slab detail is limited; the structure here is indicative and needs verification. Always confirm against your official DOPN bill." },
      { q: "Does DOPN supply electricity across all of Nagaland, including Kohima and Dimapur?", a: "Yes, in most areas — DOPN manages power distribution to urban and rural areas statewide, including Kohima and Dimapur, though many villages are 'communitised', with local Village Electricity Boards handling last-mile management under DOPN's oversight." },
      { q: "How do I check or pay my Nagaland DOPN bill online?", a: "Pay via the Web Self Service portal at prepaid.dopn.gov.in. For queries, call the helpline 0370-2240178 or 0370-2243149." },
      { q: "What is DOPN, and what is electricity communitisation?", a: "The Department of Power, Nagaland (DOPN) is the state government body for generation, transmission and distribution. Facing recurring losses, Nagaland introduced an electricity 'communitisation' policy in the early 2000s, handing day-to-day distribution management in many villages to local Village Electricity Boards while DOPN retains overall responsibility." },
    ],
    billTraps: [
      { title: "Communitised villages may have a different day-to-day contact", body: "Under Nagaland's communitisation policy, many villages have their electricity management handled locally by Village Electricity Boards or Village Councils rather than DOPN directly — check with your local body first if you're outside a major town like Kohima or Dimapur." },
      { title: "The jump above 100 units is large", body: "Nagaland's domestic rate rises from ₹3.80 to ₹6.50/unit once you cross 100 units — a jump of over 70% on every additional unit, one of the steepest slab jumps among the states on this site." },
      { title: "Published tariff detail is thin for this state", body: "Public secondary sources for Nagaland's exact domestic slab structure are limited — treat this estimate as indicative and confirm the current rate against your own DOPN bill." },
    ],
    aboutDiscom: [
      "The Department of Power, Nagaland (DOPN) is the state government department responsible for generation, transmission and distribution of electricity across the state, managing supply to both urban centres and rural areas.",
      "Facing recurring financial losses in the distribution business, the Nagaland government introduced an electricity 'communitisation' policy in the early 2000s, transferring day-to-day distribution management and revenue collection in many villages to local Village Electricity Boards, while DOPN retains ownership of the network and overall responsibility for supply.",
    ],
    coverageQA: {
      q: "Does DOPN supply electricity across all of Nagaland, including Kohima and Dimapur?",
      a: "Yes. DOPN is responsible for power distribution statewide, including Kohima and Dimapur. In many villages, day-to-day distribution management has been handed to local Village Electricity Boards under the state's communitisation policy, but DOPN remains the overall utility.",
    },
    howToPay: {
      portalUrl: "https://prepaid.dopn.gov.in/",
      portalLabel: "prepaid.dopn.gov.in (official DOPN Web Self Service portal)",
      helpline: "0370-2240178 / 0370-2243149",
      steps: [
        "Visit the DOPN Web Self Service (WSS) portal",
        "Register or log in, then look up your bill by Consumer Number",
        "Verify the amount and pay via the listed online options",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "andaman-and-nicobar-islands-electricity-bill-calculator",
    discomCode: "ANED",
    h1: "Andaman & Nicobar Islands Electricity Bill Calculator",
    breadcrumbLabel: "Andaman & Nicobar Islands Bill Calculator",
    metaTitle: "Andaman & Nicobar Islands Electricity Bill Calculator 2026 — ANED",
    metaDescription: "Calculate your Andaman & Nicobar Islands electricity bill (Electricity Department, Andaman & Nicobar). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. The Andaman & Nicobar islands keep domestic tariffs subsidised (from ~₹2.75/unit).",
    exampleUnits: 150,
    exampleEligible: false,
    intro: "Estimate your Electricity Department, Andaman & Nicobar electricity bill for Andaman & Nicobar Islands. The Andaman & Nicobar islands keep domestic tariffs subsidised (from ~₹2.75/unit). Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "A subsidised island grid", body: "The Andaman & Nicobar islands run a largely diesel-backed grid but keep domestic tariffs subsidised, starting around ₹2.75/unit. Detailed slab data is limited, so this uses an indicative structure." },
      { title: "How the Andaman & Nicobar Islands bill is calculated", body: "Andaman & Nicobar Islands domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2.75 to ₹5/unit, each band charged at its own rate. A fixed charge of a flat ₹30/month applies." },
    ],
    faqs: [
      { q: "Is the Andaman & Nicobar Islands electricity tariff telescopic?", a: "Yes. Andaman & Nicobar Islands charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Andaman & Nicobar Islands domestic connection?", a: "The fixed charge is a flat ₹30/month." },
      { q: "How accurate is this Andaman & Nicobar Islands bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Public slab detail is limited; the structure here is indicative and needs verification. Always confirm against your official ANED bill." },
      { q: "Does ANED run one power grid for the whole territory?", a: "No. Because the islands are separated by sea over great distances, there is no single unified grid — instead around 35 independent diesel power houses each supply their own local area. ANED oversees all of them, but reliability can vary island by island." },
      { q: "How do I check or pay my Andaman & Nicobar electricity bill online?", a: "Pay via the Urja Pay portal at urjapay.andaman.gov.in. For queries, call the toll-free number 1800-345-1111, or the emergency line 03192-230323." },
      { q: "What is ANED, and how far back does its history go?", a: "The Electricity Department, Andaman & Nicobar (ANED) traces back to a 100 kW steam-driven generator installed by the British at Ross Island in 1926, followed by DC generating sets at Port Blair in 1929. After Independence, two 550 kW steam turbines were commissioned at the Chatham Island power house in 1951, the start of the department's modern network." },
    ],
    billTraps: [
      { title: "There's no single islands-wide grid", body: "Unlike a mainland state DISCOM, ANED runs roughly 35 separate diesel power houses across the islands rather than one interconnected grid — supply reliability depends on your specific island's local power house, not a shared statewide system." },
      { title: "The jump above 100 units is large", body: "ANED's rate nearly doubles from ₹2.75 to ₹5.00/unit once you cross 100 units — plan for a meaningfully higher marginal cost if your household regularly uses more than that." },
      { title: "Not every village is electrified via the conventional grid", body: "Of 547 villages in the territory, 479 are electrified through conventional supply or solar power plants, and 68 uninhabited villages are not electrified at all — solar-served hamlets may have different billing arrangements than this calculator assumes." },
    ],
    aboutDiscom: [
      "The Electricity Department, Andaman & Nicobar (ANED) traces its roots to 1926, when the British installed a 100 kW steam-driven generator at Ross Island, followed by DC generating sets at Port Blair in 1929. After Independence, two 550 kW steam turbines were commissioned at the Chatham Island power house in 1951.",
      "Because the islands are separated by sea over long distances, ANED does not run a single unified grid — it operates around 35 independent diesel power houses, each serving its own local area, alongside solar power plants for some remote villages.",
    ],
    howToPay: {
      portalUrl: "https://urjapay.andaman.gov.in/",
      portalLabel: "urjapay.andaman.gov.in (official Urja Pay portal)",
      helpline: "1800-345-1111 (toll-free) / 03192-230323 (emergency)",
      steps: [
        "Visit the official Urja Pay bill payment portal",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via the listed online options",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "dadra-and-nagar-haveli-and-daman-and-diu-electricity-bill-calculator",
    discomCode: "DNHPDCL",
    h1: "Dadra & Nagar Haveli and Daman & Diu Electricity Bill Calculator",
    breadcrumbLabel: "Dadra & Nagar Haveli and Daman & Diu Bill Calculator",
    metaTitle: "Dadra & Nagar Haveli and Daman & Diu Electricity Bill Calculator 2026 — DNHPDCL",
    metaDescription: "Calculate your Dadra & Nagar Haveli and Daman & Diu electricity bill (DNH & DD Power Distribution Corporation Ltd (DNHPDCL)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. DNH & DD uses a simple two-slab domestic tariff (₹4.00 / ₹6.50).",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['MGVCL'],
    intro: "Estimate your DNH & DD Power Distribution Corporation Ltd (DNHPDCL) electricity bill for Dadra & Nagar Haveli and Daman & Diu. DNH & DD uses a simple two-slab domestic tariff (₹4.00 / ₹6.50). Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Low-cost power in an industrial UT", body: "The Dadra & Nagar Haveli and Daman & Diu UT is heavily industrial and offers some of India’s cheapest power to industry; domestic supply uses a simple two-slab structure of about ₹4.00 and ₹6.50/unit." },
      { title: "How the Dadra & Nagar Haveli and Daman & Diu bill is calculated", body: "Dadra & Nagar Haveli and Daman & Diu domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹4 to ₹6.5/unit, each band charged at its own rate. A fixed charge of a flat ₹30/month applies." },
    ],
    faqs: [
      { q: "Is the Dadra & Nagar Haveli and Daman & Diu electricity tariff telescopic?", a: "Yes. Dadra & Nagar Haveli and Daman & Diu charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Dadra & Nagar Haveli and Daman & Diu domestic connection?", a: "The fixed charge is a flat ₹30/month." },
      { q: "How accurate is this Dadra & Nagar Haveli and Daman & Diu bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Always confirm against your official DNHPDCL bill." },
      { q: "Is DNH & DD's power distribution privatised?", a: "Yes. Since April 2022, retail distribution has been run by a new joint-venture company, Dadra and Nagar Haveli and Daman and Diu Power Distribution Corporation Ltd (DNHDDPDCL), in which Torrent Power holds 51% and the UT administration holds the remaining 49% — one of the first Union Territories to privatise power distribution." },
      { q: "How do I check or pay my DNH & DD electricity bill online?", a: "Pay via Torrent Power's consumer portal at connect.torrentpower.com. For queries, call the helpline 19126, toll-free 1800-233-9500, or the reception line +91-260-2406500." },
      { q: "What is the difference between DNHPDCL and DNHDDPDCL?", a: "DNH Power Distribution Corporation Ltd (DNHPDCL), founded in 2012, now operates as DNH & DD Power Corporation Ltd and handles only transmission — 220/66 kV substations and solar generation — and remains 100% UT-owned. Retail distribution and billing moved to the separate Torrent Power joint venture, DNHDDPDCL, from 1 April 2022, after the two former UTs merged into one on 26 January 2020." },
    ],
    billTraps: [
      { title: "Distribution and transmission are now separate companies", body: "DNH & DD Power Corporation Ltd (formerly DNHPDCL) now handles only transmission and is fully UT-owned, while your actual bill and retail supply come from the separately branded Torrent Power joint venture, DNHDDPDCL — don't confuse the two similarly named entities." },
      { title: "Your bill comes via a private operator's portal, not a .gov.in domain", body: "Since April 2022, bill payment runs through Torrent Power's own consumer portal (connect.torrentpower.com) rather than a UT government site — bookmark the correct one to avoid confusion with older DNH-specific government pages." },
      { title: "The jump above 100 units is large", body: "The domestic rate rises from ₹4.00 to ₹6.50/unit once you cross 100 units — a 62% jump on every additional unit." },
    ],
    aboutDiscom: [
      "The Union Territories of Dadra & Nagar Haveli and Daman & Diu merged into a single UT on 26 January 2020. DNH Power Distribution Corporation Ltd (DNHPDCL), originally founded in 2012 to serve DNH, was restructured and renamed DNH & DD Power Corporation Ltd, retaining only the transmission function (220/66 kV substations and solar generation) as a 100% UT-owned entity.",
      "From 1 April 2022, retail distribution and billing across the whole merged UT moved to a new joint-venture company, Dadra and Nagar Haveli and Daman and Diu Power Distribution Corporation Ltd (DNHDDPDCL), with Torrent Power holding 51% and the UT administration the remaining 49% — one of the first Indian Union Territories to privatise its power distribution business. The venture serves roughly 150,000 customers.",
    ],
    coverageQA: {
      q: "Does one company handle both Dadra & Nagar Haveli and Daman & Diu?",
      a: "Yes, for retail distribution — DNHDDPDCL (the Torrent Power joint venture) supplies both parts of the merged UT under one tariff. A separate, fully UT-owned company (DNH & DD Power Corporation Ltd, formerly DNHPDCL) handles transmission infrastructure only.",
    },
    howToPay: {
      portalUrl: "https://connect.torrentpower.com/tplcp/index.php/crCustmast/quickpay",
      portalLabel: "connect.torrentpower.com (official Torrent Power billing portal)",
      helpline: "19126 / 1800-233-9500 / +91-260-2406500",
      steps: [
        "Visit Torrent Power's official DNH & DD quick-pay portal",
        "Enter your Service Connection Number to fetch your current bill",
        "Verify the amount and pay via UPI, card or net banking",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "lakshadweep-electricity-bill-calculator",
    discomCode: "LED",
    h1: "Lakshadweep Electricity Bill Calculator",
    breadcrumbLabel: "Lakshadweep Bill Calculator",
    metaTitle: "Lakshadweep Electricity Bill Calculator 2026 — LED",
    metaDescription: "Calculate your Lakshadweep electricity bill (Electricity Department, Lakshadweep). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Lakshadweep charges a heavily subsidised flat ~₹1.50/unit.",
    exampleUnits: 100,
    exampleEligible: false,
    intro: "Estimate your Electricity Department, Lakshadweep electricity bill for Lakshadweep. Lakshadweep charges a heavily subsidised flat ~₹1.50/unit. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Heavily subsidised island power", body: "Lakshadweep’s power is diesel-generated but heavily subsidised, with domestic tariffs among the lowest in India at around ₹1.50/unit on a flat basis." },
      { title: "How the Lakshadweep bill is calculated", body: "Lakshadweep domestic supply is billed monthly. Every unit is charged at a flat ₹1.5/unit. A fixed charge of a flat ₹20/month applies." },
    ],
    faqs: [
      { q: "Is the Lakshadweep electricity tariff telescopic?", a: "Lakshadweep uses a flat domestic rate rather than telescopic slabs — every unit is billed at the same rate." },
      { q: "What is the fixed charge for a Lakshadweep domestic connection?", a: "The fixed charge is a flat ₹20/month." },
      { q: "How accurate is this Lakshadweep bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. Public slab detail is limited; this uses the indicative flat domestic rate. Always confirm against your official LED bill." },
      { q: "Does LED supply electricity to every inhabited island?", a: "Yes. All inhabited islands are electrified — Minicoy was first in 1962, Kavaratti in 1964, Amini and Andrott in 1965–66, and Bitra last in 1982. LED runs electricity service sub-divisions on Minicoy, Kavaratti, Amini, Andrott, Kalpeni, Agatti, Kadmat, Chetlat, Bitra and Bangaram." },
      { q: "How do I check or pay my Lakshadweep LED bill online?", a: "Pay via the official portal at powerlak.gov.in, or the POWERLAK Services mobile app. For queries, call the consumer care helpline 04896-262363." },
      { q: "Why is Lakshadweep's tariff a single flat rate rather than slabs?", a: "Lakshadweep's small, dispersed island population and diesel-based generation are billed on a simple, heavily subsidised flat rate rather than the multi-slab structures used in most mainland states — every unit costs the same, whether you use 20 units or 200." },
    ],
    billTraps: [
      { title: "A flat rate means no low-usage discount, but no high-usage penalty either", body: "Because every unit costs the same ~₹1.50, there's no cheaper starter slab for light users, but equally there's no steep jump in rate as consumption rises — unlike most other states on this site." },
      { title: "Each island runs on its own diesel supply", body: "Power on the islands is diesel-generated locally rather than drawn from a mainland grid, so supply reliability and outage patterns can vary between islands even though the tariff is uniform." },
      { title: "Published tariff detail is limited for this UT", body: "Public secondary sources for Lakshadweep's exact domestic tariff structure are thin — treat this flat-rate estimate as indicative and confirm against your own LED bill." },
    ],
    aboutDiscom: [
      "The Electricity Department, Lakshadweep (LED), electrified the islands gradually: Minicoy was the first, in 1962, followed by Kavaratti in 1964, Amini and Andrott in 1965 and 1966, and Bitra — the last — in 1982.",
      "LED operates electricity service sub-divisions across the inhabited islands — Minicoy, Kavaratti, Amini, Andrott, Kalpeni, Agatti, Kadmat, Chetlat, Bitra and Bangaram — with its main divisional office headquartered in Kavaratti.",
    ],
    coverageQA: {
      q: "Does LED supply electricity to every inhabited island in Lakshadweep?",
      a: "Yes. All inhabited islands have been electrified since 1982, when Bitra — the last — was connected. LED runs separate service sub-divisions on each inhabited island, with its main office in Kavaratti.",
    },
    howToPay: {
      portalUrl: "https://powerlak.gov.in/",
      portalLabel: "powerlak.gov.in (official LED bill payment portal)",
      helpline: "04896-262363 (consumer care)",
      steps: [
        "Visit the official POWERLAK bill payment portal or open the POWERLAK app",
        "Enter your Consumer Number to fetch your current bill",
        "Verify the amount and pay via the listed online options",
        "Save the payment receipt for your records",
      ],
    },
  },
  {
    slug: "ladakh-electricity-bill-calculator",
    discomCode: "LPDD",
    h1: "Ladakh Electricity Bill Calculator",
    breadcrumbLabel: "Ladakh Bill Calculator",
    metaTitle: "Ladakh Electricity Bill Calculator 2026 — LPDD",
    metaDescription: "Calculate your Ladakh electricity bill (Power Development Department, Ladakh (JERC)). Real domestic slab rates, fixed charge and subsidies, with a clear breakdown. Ladakh is approximated from the JERC J&K subsidised schedule.",
    exampleUnits: 150,
    exampleEligible: false,
    neighboringDiscoms: ['JPDCL', 'HPSEBL'],
    intro: "Estimate your Power Development Department, Ladakh (JERC) electricity bill for Ladakh. Ladakh is approximated from the JERC J&K subsidised schedule. Enter your units below for an itemised, slab-by-slab estimate.",
    explainer: [
      { title: "Approximated from the JERC schedule", body: "A specific published Ladakh domestic tariff order was not available at the time of writing, so this calculator approximates Ladakh using the heavily-subsidised JERC (Jammu & Kashmir/Ladakh) domestic pattern. Treat every figure as indicative until confirmed." },
      { title: "How the Ladakh bill is calculated", body: "Ladakh domestic supply is billed monthly. Consumption is split across telescopic slabs from ₹2 to ₹3/unit, each band charged at its own rate. A fixed charge of a flat ₹20/month applies." },
    ],
    faqs: [
      { q: "Is the Ladakh electricity tariff telescopic?", a: "Yes. Ladakh charges telescopically: each slab is billed at its own rate, so moving up a slab does not re-price your cheaper units." },
      { q: "What is the fixed charge for a Ladakh domestic connection?", a: "The fixed charge is a flat ₹20/month." },
      { q: "How accurate is this Ladakh bill estimate?", a: "It uses the published domestic slab rates and is a close estimate, not a billing-grade figure. No specific Ladakh tariff order was found; the entire schedule here is an approximation pending verification. Always confirm against your official LPDD bill." },
      { q: "Does LPDD supply electricity to both Leh and Kargil districts?", a: "Yes. LPDD is the sole power utility for the Union Territory of Ladakh, covering generation, transmission and distribution across both Leh and Kargil districts, including small hydro plants supplying the local grid." },
      { q: "How do I check or pay my Ladakh LPDD bill online?", a: "Pay via the LPDD consumer portal at lpddconsumer.ugoerp.com or billsahuliyat.jkpdd.net. For queries, contact your local LPDD division office — a single UT-wide toll-free helpline was not confirmed in public sources at the time of writing." },
      { q: "What is LPDD, and when did it form?", a: "The Ladakh Power Development Department (LPDD) was established after Ladakh became a separate Union Territory in 2019, following the reorganisation of the former state of Jammu & Kashmir. It comprises three verticals — generation, transmission and distribution — and runs small hydro plants across Leh and Kargil." },
    ],
    billTraps: [
      { title: "This tariff is an approximation, not a confirmed Ladakh-specific order", body: "No dedicated, published Ladakh domestic tariff order was found — this calculator approximates Ladakh's likely rates from the JERC Jammu & Kashmir schedule since both fall under the same regulatory framework. Treat every figure as indicative and confirm against your own LPDD bill." },
      { title: "LPDD is separate from J&K's JPDCL and KPDCL", body: "Since Ladakh became its own Union Territory in 2019, its power utility (LPDD) is a distinct entity from Jammu's JPDCL and Kashmir's KPDCL, even though all three currently sit under the same JERC regulatory umbrella." },
      { title: "A confirmed UT-wide helpline number is hard to find publicly", body: "Unlike most states with a well-publicised 1912 or toll-free line, LPDD's public helpline information is limited — your local division office or the LPDD consumer portal are the more reliable contact points." },
    ],
    aboutDiscom: [
      "The Ladakh Power Development Department (LPDD) was established after Ladakh was carved out as a separate Union Territory in 2019, following the reorganisation of the former state of Jammu & Kashmir. LPDD comprises three verticals — generation, transmission and distribution — and is the sole power utility for the UT.",
      "LPDD operates several small hydro power plants across Leh and Kargil districts, with roughly 10 MW of installed capacity and further hydro projects under construction, alongside grid input from other sources for the region's 66kV/33kV/11kV distribution network.",
    ],
    coverageQA: {
      q: "Does LPDD supply electricity to both Leh and Kargil districts?",
      a: "Yes. LPDD is the only power distribution utility in the Union Territory of Ladakh, covering generation, transmission and distribution across both Leh and Kargil districts.",
    },
    howToPay: {
      portalUrl: "https://lpddconsumer.ugoerp.com/",
      portalLabel: "lpddconsumer.ugoerp.com (LPDD consumer portal)",
      helpline: "Contact your local LPDD division office via lpdd.ladakh.gov.in",
      steps: [
        "Visit the LPDD consumer portal or the official LPDD website",
        "Enter your Consumer/Account Number to fetch your current bill",
        "Verify the amount and pay via the listed online options",
        "Save the payment receipt for your records",
      ],
    },
  },
]

export function getCalculatorPage(slug: string): DiscomPageConfig | undefined {
  return CALCULATOR_PAGES.find((p) => p.slug === slug)
}

export const allCalculatorSlugs = CALCULATOR_PAGES.map((p) => p.slug)

/** Short discomCode-based slug (e.g. "tneb") for secondary route trees —
 *  cleaner than reusing the full "-bill-calculator" DISCOM slug. */
export function getCalculatorPageByDiscomSlug(discomSlug: string): DiscomPageConfig | undefined {
  return CALCULATOR_PAGES.find((p) => p.discomCode.toLowerCase() === discomSlug)
}

export const allDiscomCodeSlugs = CALCULATOR_PAGES.map((p) => p.discomCode.toLowerCase())
