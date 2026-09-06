/**
 * Shared UI-chrome + generated-prose strings for WaterStatePage — the
 * self-rate fallback template used by every state without a real, sourced
 * board tariff on file (~35 pages). Like WaterBoardPage, almost all of this
 * page's content is template-generated (not hand-authored per state), so
 * translating this dictionary covers nearly all of every state's content.
 */
export interface WaterStatePageTexts {
  breadcrumbWater: string
  badgeLabel: string
  h1: (state: string) => string
  subtitle: (state: string) => string
  primaryCta: string
  secondaryCta: string
  statKl: { big: string; small: string }
  statRate: { big: string; small: string }
  statFixed: { big: string; small: string }
  statFree: { big: string; small: string }
  whyAskLabel: string
  whyAskBody1: (state: string) => string
  whyAskBody2: string
  liveBoardHeading: (state: string) => string
  liveBoardBody: (name: string, code: string) => string
  liveBoardCta: string
  liveBoardNote: (state: string) => string
  calculateHeading: (state: string) => string
  chargesExplainedHeading: string
  sewerageTitle: string
  sewerageBody: string
  fixedTitle: string
  fixedBody: string
  tankerHeading: string
  tankerBody: string
  tankerLabel: string
  jarLabel: string
  tankerNote: string
  leaksHeading: string
  leaksBody: string
  relatedHeading: string
  relatedRealTariff: { label: string; sub: (name: string) => string; subFallback: string }
  relatedGas: { label: string; sub: string }
  relatedElectricity: { label: string; sub: string }
  relatedWaterTank: { label: string; sub: string }
  faqHeading: string
  faq: {
    knowExactTariffQ: (state: string) => string
    knowExactTariffA: string
    findRateQ: (state: string) => string
    findRateA: string
    fixedSeparateQ: string
    fixedSeparateA: string
    whatIsKlQ: string
    whatIsKlA: string
    sewerageQ: string
    sewerageA: string
    freeThresholdQ: (state: string) => string
    freeThresholdA: (state: string) => string
    tankerCheaperQ: string
    tankerCheaperA: string
    reduceQ: string
    reduceA: string
  }
}

export const enWaterStatePageTexts: WaterStatePageTexts = {
  breadcrumbWater: 'Water',
  badgeLabel: 'Your real rate · Honest input',
  h1: (state) => `${state} Water Bill Calculator`,
  subtitle: (state) => `Estimate your water bill in ${state} from your metered consumption and your board's own rate — we don't guess municipal tariffs we can't verify, so you enter your real rate.`,
  primaryCta: 'Calculate My Water Bill',
  secondaryCta: 'All states →',
  statKl: { big: 'KL', small: 'Consumption unit' },
  statRate: { big: 'Your rate', small: 'Honest input' },
  statFixed: { big: 'Fixed charge', small: 'Full bill' },
  statFree: { big: 'Free', small: 'No login' },
  whyAskLabel: 'Why we ask for your rate',
  whyAskBody1: (state) => `Unlike electricity DISCOMs, ${state}'s municipal water tariffs aren't centrally published in a form we can verify and keep current.`,
  whyAskBody2: "Rather than guess a number, we ask for your own rate from your bill — the same honest approach we use across our fuel and net-metering calculators.",
  liveBoardHeading: (state) => `Real tariff available for ${state}`,
  liveBoardBody: (name, code) => `We have a real, dated tariff for ${name} (${code})`,
  liveBoardCta: 'use its real-tariff calculator →',
  liveBoardNote: (state) => `If your connection is with a different board in ${state}, the self-rate calculator below still applies.`,
  calculateHeading: (state) => `Calculate your ${state} water bill`,
  chargesExplainedHeading: 'Sewerage & fixed charges explained',
  sewerageTitle: 'Sewerage charge',
  sewerageBody: "Many water boards add a wastewater treatment fee on top of the volumetric water charge, commonly billed as a percentage of it — check your last bill for the exact line item, and roll it into the rate or fixed charge you enter above so the total reflects your real bill.",
  fixedTitle: 'Fixed / meter charge',
  fixedBody: "A flat amount per billing period, often based on your connection's meter size, charged regardless of how much water you use — it covers the cost of maintaining your connection and meter.",
  tankerHeading: 'Piped water vs tanker/jar delivery',
  tankerBody: "Piped municipal supply is almost always dramatically cheaper per litre than tanker or 20L jar delivery, when it's reliably available — check local rates for an exact comparison, but either way it typically works out to many times more per litre than metered piped water.",
  tankerLabel: 'Water tanker (5,000–10,000L)',
  jarLabel: '20L branded jar',
  tankerNote: 'Rough, commonly-cited ranges — vary by city and season.',
  leaksHeading: 'Spotting a leak from your bill',
  leaksBody: "If your consumption jumps well above your usual monthly range with no change in household usage, a running cistern or a slow pipe leak is a common cause — both can waste hundreds of litres a month without being obviously visible. Compare this cycle's KL figure against your last few bills; a sustained, unexplained increase is worth a quick check of taps, cisterns and any exposed piping before it repeats.",
  relatedHeading: 'Related calculators',
  relatedRealTariff: {
    label: 'See a real-tariff example',
    sub: (name) => `${name} uses a real, dated tariff — no rate entry needed.`,
    subFallback: 'Delhi Jal Board uses a real, dated tariff — no rate entry needed.',
  },
  relatedGas: { label: 'Gas bill calculator', sub: 'Same honest approach for your PNG bill.' },
  relatedElectricity: { label: 'Electricity bill calculator', sub: 'Real DISCOM tariffs, no guessing needed there.' },
  relatedWaterTank: { label: 'Water tank fill time', sub: 'How long your tank takes to fill.' },
  faqHeading: 'Frequently asked questions',
  faq: {
    knowExactTariffQ: (state) => `Does DesiMetrics know my exact water board's tariff in ${state}?`,
    knowExactTariffA: "No — unlike electricity DISCOMs, municipal water tariffs in India aren't centrally published in a form we can verify and keep current, and billing basis varies by city (flat rate, metered volumetric, or tied to property tax). Enter your own rate from your last water bill or your board's published tariff for an accurate result.",
    findRateQ: (state) => `Where do I find my water board's rate per KL in ${state}?`,
    findRateA: "Check your last water bill — it typically shows consumption in KL (kilolitres) and the rate applied. You can also check your municipal corporation or water board's official website for the published tariff schedule.",
    fixedSeparateQ: 'Why does the calculator ask for a fixed/meter charge separately?',
    fixedSeparateA: 'Most Indian water bills combine a per-KL volumetric charge with a flat monthly meter or service charge — entering both gives a more accurate total than the volumetric charge alone.',
    whatIsKlQ: 'What is a KL and how do I read my meter?',
    whatIsKlA: "A kilolitre (KL) = 1,000 litres, the standard billing unit for metered water supply in India. Most meters show a running total in KL or cubic metres — subtract your previous reading from your current one to find your period's consumption.",
    sewerageQ: 'What is the sewerage charge some water bills include?',
    sewerageA: "Many Indian water boards add a wastewater treatment/sewerage charge on top of the volumetric water charge, commonly as a percentage of it (the exact percentage varies by board). If your bill includes one, fold it into the fixed/meter charge field, or the rate you enter, so the total reflects your real bill.",
    freeThresholdQ: (state) => `Does my water board offer a free consumption threshold?`,
    freeThresholdA: (state) => `Some boards do (Delhi's is a well-known example), and some free schemes are all-or-nothing rather than a true allowance — crossing the threshold by even a little can make your entire consumption billable, not just the excess. Check your own board's specific rules; don't assume another city's scheme applies in ${state}.`,
    tankerCheaperQ: 'Is piped water cheaper than tanker or jar delivery?',
    tankerCheaperA: 'Almost always yes, by a wide margin, when piped supply is reliable. A private water tanker commonly costs roughly ₹500-1,500 in many Indian cities, and a 20L jar commonly runs ₹40-80 — both vary by city, but either works out to many times more per litre than metered piped water.',
    reduceQ: 'How can I reduce my water bill?',
    reduceA: 'Fix dripping taps and running cisterns promptly — a slow, easy-to-miss leak can waste hundreds of litres a month. Low-flow fixtures for showers and taps also meaningfully cut consumption without much lifestyle change.',
  },
}

export const hiWaterStatePageTexts: WaterStatePageTexts = {
  breadcrumbWater: 'पानी',
  badgeLabel: 'आपकी असली दर · ईमानदार इनपुट',
  h1: (state) => `${state} पानी बिल कैलकुलेटर`,
  subtitle: (state) => `अपनी मीटर से मापी गई खपत और अपने बोर्ड की अपनी दर से ${state} में अपने पानी बिल का अनुमान लगाएं — हम ऐसे नगरपालिका टैरिफ का अंदाज़ा नहीं लगाते जिन्हें हम सत्यापित नहीं कर सकते, इसलिए आप अपनी असली दर डालें।`,
  primaryCta: 'मेरा पानी बिल कैलकुलेट करें',
  secondaryCta: 'सभी राज्य →',
  statKl: { big: 'KL', small: 'खपत यूनिट' },
  statRate: { big: 'आपकी दर', small: 'ईमानदार इनपुट' },
  statFixed: { big: 'फिक्स्ड चार्ज', small: 'पूरा बिल' },
  statFree: { big: 'मुफ़्त', small: 'बिना लॉगिन' },
  whyAskLabel: 'हम आपकी दर क्यों पूछते हैं',
  whyAskBody1: (state) => `बिजली डिस्कॉम के उलट, ${state} के नगरपालिका पानी टैरिफ केंद्रीय रूप से ऐसे रूप में प्रकाशित नहीं होते जिन्हें हम सत्यापित करके अपडेट रख सकें।`,
  whyAskBody2: 'नंबर का अंदाज़ा लगाने की बजाय, हम आपके बिल से आपकी अपनी दर पूछते हैं — वही ईमानदार तरीका जो हम अपने ईंधन और नेट-मीटरिंग कैलकुलेटर में इस्तेमाल करते हैं।',
  liveBoardHeading: (state) => `${state} के लिए असली टैरिफ उपलब्ध है`,
  liveBoardBody: (name, code) => `हमारे पास ${name} (${code}) के लिए एक असली, दिनांकित टैरिफ है`,
  liveBoardCta: 'इसका असली-टैरिफ कैलकुलेटर इस्तेमाल करें →',
  liveBoardNote: (state) => `अगर आपका कनेक्शन ${state} में किसी और बोर्ड से है, तो नीचे दिया सेल्फ-रेट कैलकुलेटर अभी भी लागू होता है।`,
  calculateHeading: (state) => `अपना ${state} पानी बिल कैलकुलेट करें`,
  chargesExplainedHeading: 'सीवरेज और फिक्स्ड चार्ज समझाए गए',
  sewerageTitle: 'सीवरेज चार्ज',
  sewerageBody: 'कई पानी बोर्ड वॉल्यूमेट्रिक पानी चार्ज के ऊपर एक वेस्टवाटर ट्रीटमेंट फीस जोड़ते हैं, जो आमतौर पर उसके प्रतिशत के रूप में बिल की जाती है — सटीक लाइन आइटम के लिए अपना पिछला बिल जांचें, और इसे ऊपर डाली गई दर या फिक्स्ड चार्ज में शामिल करें ताकि कुल आपके असली बिल को दर्शाए।',
  fixedTitle: 'फिक्स्ड / मीटर चार्ज',
  fixedBody: 'हर बिलिंग अवधि में एक फ्लैट राशि, अक्सर आपके कनेक्शन के मीटर साइज़ पर आधारित, चाहे आप कितना भी पानी इस्तेमाल करें लगाई जाती है — यह आपके कनेक्शन और मीटर के रखरखाव की लागत कवर करती है।',
  tankerHeading: 'पाइप्ड पानी बनाम टैंकर/जार डिलीवरी',
  tankerBody: 'पाइप्ड नगरपालिका आपूर्ति, जब भरोसेमंद रूप से उपलब्ध हो, तो टैंकर या 20L जार डिलीवरी से प्रति लीटर लगभग हमेशा काफी सस्ती होती है — सटीक तुलना के लिए स्थानीय दरें जांचें, लेकिन किसी भी तरह यह आमतौर पर मीटर से मापे पाइप्ड पानी से प्रति लीटर कई गुना ज़्यादा पड़ता है।',
  tankerLabel: 'पानी टैंकर (5,000–10,000L)',
  jarLabel: '20L ब्रांडेड जार',
  tankerNote: 'मोटे तौर पर, आम तौर पर बताई गई सीमाएं — शहर और मौसम के हिसाब से बदलती हैं।',
  leaksHeading: 'अपने बिल से रिसाव का पता लगाना',
  leaksBody: 'अगर आपकी खपत बिना घर में इस्तेमाल में असली बदलाव के अपनी सामान्य मासिक सीमा से काफी ऊपर बढ़ जाए, तो एक चलती सिस्टर्न या धीमा पाइप रिसाव एक आम कारण है — दोनों बिना साफ दिखे महीने में सैकड़ों लीटर बर्बाद कर सकते हैं। इस साइकल के KL आंकड़े की तुलना अपने पिछले कुछ बिलों से करें; एक लगातार, अस्पष्ट बढ़ोतरी नल, सिस्टर्न और किसी भी खुली पाइपिंग की जल्दी जांच के लायक है, इससे पहले कि यह दोहराए।',
  relatedHeading: 'संबंधित कैलकुलेटर',
  relatedRealTariff: {
    label: 'एक असली-टैरिफ उदाहरण देखें',
    sub: (name) => `${name} एक असली, दिनांकित टैरिफ इस्तेमाल करता है — दर डालने की ज़रूरत नहीं।`,
    subFallback: 'दिल्ली जल बोर्ड एक असली, दिनांकित टैरिफ इस्तेमाल करता है — दर डालने की ज़रूरत नहीं।',
  },
  relatedGas: { label: 'गैस बिल कैलकुलेटर', sub: 'आपके PNG बिल के लिए वही ईमानदार तरीका।' },
  relatedElectricity: { label: 'बिजली बिल कैलकुलेटर', sub: 'असली डिस्कॉम टैरिफ, वहां अंदाज़ा लगाने की ज़रूरत नहीं।' },
  relatedWaterTank: { label: 'पानी टैंक भरने का समय', sub: 'आपका टैंक भरने में कितना समय लगता है।' },
  faqHeading: 'अक्सर पूछे जाने वाले सवाल',
  faq: {
    knowExactTariffQ: (state) => `क्या DesiMetrics को ${state} में मेरे पानी बोर्ड का सटीक टैरिफ पता है?`,
    knowExactTariffA: 'नहीं — बिजली डिस्कॉम के उलट, भारत में नगरपालिका पानी टैरिफ केंद्रीय रूप से ऐसे रूप में प्रकाशित नहीं होते जिन्हें हम सत्यापित करके अपडेट रख सकें, और बिलिंग का आधार शहर के हिसाब से बदलता है (फ्लैट रेट, मीटर से मापा वॉल्यूमेट्रिक, या प्रॉपर्टी टैक्स से जुड़ा)। सटीक परिणाम के लिए अपने पिछले पानी बिल या अपने बोर्ड के प्रकाशित टैरिफ से अपनी दर डालें।',
    findRateQ: (state) => `${state} में मुझे अपने पानी बोर्ड की प्रति-KL दर कहां मिलेगी?`,
    findRateA: 'अपना पिछला पानी बिल जांचें — इसमें आमतौर पर KL (किलोलीटर) में खपत और लागू दर दिखाई जाती है। आप प्रकाशित टैरिफ शेड्यूल के लिए अपने नगर निगम या पानी बोर्ड की आधिकारिक वेबसाइट भी देख सकते हैं।',
    fixedSeparateQ: 'कैलकुलेटर फिक्स्ड/मीटर चार्ज अलग से क्यों पूछता है?',
    fixedSeparateA: 'ज़्यादातर भारतीय पानी बिल एक प्रति-KL वॉल्यूमेट्रिक चार्ज को एक फ्लैट मासिक मीटर या सर्विस चार्ज के साथ मिलाते हैं — दोनों डालने से सिर्फ वॉल्यूमेट्रिक चार्ज से ज़्यादा सटीक कुल मिलता है।',
    whatIsKlQ: 'KL क्या है और मैं अपना मीटर कैसे पढ़ूं?',
    whatIsKlA: 'एक किलोलीटर (KL) = 1,000 लीटर, भारत में मीटर से मापी गई पानी आपूर्ति के लिए मानक बिलिंग यूनिट है। ज़्यादातर मीटर KL या क्यूबिक मीटर में कुल रीडिंग दिखाते हैं — अपनी अवधि की खपत जानने के लिए अपनी मौजूदा रीडिंग में से पिछली रीडिंग घटाएं।',
    sewerageQ: 'कुछ पानी बिलों में शामिल सीवरेज चार्ज क्या है?',
    sewerageA: 'कई भारतीय पानी बोर्ड वॉल्यूमेट्रिक पानी चार्ज के ऊपर एक वेस्टवाटर ट्रीटमेंट/सीवरेज चार्ज जोड़ते हैं, आमतौर पर उसके प्रतिशत के रूप में (सटीक प्रतिशत बोर्ड के हिसाब से बदलता है)। अगर आपके बिल में यह शामिल है, तो इसे फिक्स्ड/मीटर चार्ज फील्ड या आपकी डाली दर में शामिल करें, ताकि कुल आपके असली बिल को दर्शाए।',
    freeThresholdQ: () => 'क्या मेरा पानी बोर्ड मुफ़्त खपत सीमा देता है?',
    freeThresholdA: (state) => `कुछ बोर्ड देते हैं (दिल्ली का एक जाना-माना उदाहरण है), और कुछ मुफ़्त योजनाएं सच्ची छूट की बजाय सब-या-कुछ-नहीं होती हैं — सीमा को थोड़ा भी पार करने पर आपकी पूरी खपत बिल हो सकती है, सिर्फ अतिरिक्त हिस्सा नहीं। अपने बोर्ड के खास नियम जांचें; यह न मानें कि ${state} में किसी और शहर की योजना लागू होती है।`,
    tankerCheaperQ: 'क्या पाइप्ड पानी टैंकर या जार डिलीवरी से सस्ता है?',
    tankerCheaperA: 'जब पाइप्ड आपूर्ति भरोसेमंद हो, तो लगभग हमेशा हां, काफी बड़े अंतर से। एक निजी पानी टैंकर आमतौर पर कई भारतीय शहरों में लगभग ₹500-1,500 का पड़ता है, और एक 20L जार आमतौर पर ₹40-80 का — दोनों शहर के हिसाब से बदलते हैं, लेकिन किसी भी तरह मीटर से मापे पाइप्ड पानी से प्रति लीटर कई गुना ज़्यादा पड़ते हैं।',
    reduceQ: 'मैं अपना पानी बिल कैसे कम कर सकता हूं?',
    reduceA: 'टपकते नल और चलती सिस्टर्न तुरंत ठीक करवाएं — एक धीमा, आसानी से न दिखने वाला रिसाव महीने में सैकड़ों लीटर बर्बाद कर सकता है। शावर और नल पर लो-फ्लो फिक्स्चर भी बिना ज़्यादा जीवनशैली बदले खपत में असरदार कमी लाते हैं।',
  },
}
