export interface AcBrand {
  slug: string
  name: string
  /** One factual, well-established sentence on the company itself (origin, parent group, lineage) — never an efficiency or performance claim. */
  origin: string
  originHi: string
}

/**
 * AC brand landing pages all reuse the same real BEE ISEER-based calculation
 * engine (calculateAcCost) — star rating, not brand name, drives efficiency
 * under the BEE labelling programme. No brand-specific efficiency claims are
 * made; these pages exist to give each brand's shoppers a directly relevant
 * entry point into the same real calculator. `origin` exists purely to give
 * each of these otherwise-identical pages one genuine, verifiable point of
 * difference (company background, not efficiency) rather than a pure
 * find-replace of the brand name.
 */
export const AC_BRANDS: AcBrand[] = [
  {
    slug: 'amazonbasics',
    name: 'AmazonBasics',
    origin: "Amazon's own private-label brand, sold exclusively through Amazon India.",
    originHi: 'अमेज़न का अपना प्राइवेट-लेबल ब्रांड, जो सिर्फ Amazon India पर बिकता है।',
  },
  {
    slug: 'blue-star',
    name: 'Blue Star',
    origin: "An Indian company — Blue Star Limited — and one of India's oldest air-conditioning manufacturers, founded in 1943.",
    originHi: 'एक भारतीय कंपनी — Blue Star Limited — और 1943 में स्थापित, भारत के सबसे पुराने एयर-कंडीशनिंग निर्माताओं में से एक।',
  },
  {
    slug: 'carrier',
    name: 'Carrier',
    origin: 'An American company founded by Willis Carrier, who is credited with inventing modern air conditioning.',
    originHi: 'एक अमेरिकी कंपनी, जिसकी स्थापना विलिस कैरियर ने की — जिन्हें आधुनिक एयर कंडीशनिंग का आविष्कारक माना जाता है।',
  },
  {
    slug: 'croma',
    name: 'Croma',
    origin: "Croma is Tata Group's Infiniti Retail electronics chain; Croma-branded ACs are the retailer's own private-label appliances.",
    originHi: 'Croma टाटा ग्रुप की Infiniti Retail इलेक्ट्रॉनिक्स चेन है; Croma ब्रांड वाले AC इस रिटेलर के अपने प्राइवेट-लेबल उपकरण हैं।',
  },
  {
    slug: 'daikin',
    name: 'Daikin',
    origin: "A Japanese company and the world's largest air-conditioner manufacturer by revenue, with a manufacturing plant in Rajasthan.",
    originHi: 'एक जापानी कंपनी और राजस्व के हिसाब से दुनिया की सबसे बड़ी एयर-कंडीशनर निर्माता, राजस्थान में एक मैन्युफैक्चरिंग प्लांट के साथ।',
  },
  {
    slug: 'general',
    name: 'General',
    origin: '"General" commonly refers to Fujitsu General\'s ACs, which are sold in India mainly under the "O General" brand name.',
    originHi: '"General" आमतौर पर Fujitsu General के AC को कहा जाता है, जो भारत में मुख्य रूप से "O General" ब्रांड नाम से बिकते हैं।',
  },
  {
    slug: 'godrej',
    name: 'Godrej',
    origin: "Godrej Appliances is part of the Godrej Group, one of India's oldest and largest business conglomerates.",
    originHi: 'Godrej Appliances, Godrej Group का हिस्सा है — भारत के सबसे पुराने और सबसे बड़े बिज़नेस समूहों में से एक।',
  },
  {
    slug: 'haier',
    name: 'Haier',
    origin: "A Chinese company and one of the world's largest home-appliance manufacturers, with a manufacturing plant in Pune.",
    originHi: 'एक चीनी कंपनी और दुनिया की सबसे बड़ी होम-अप्लायंस निर्माताओं में से एक, पुणे में एक मैन्युफैक्चरिंग प्लांट के साथ।',
  },
  {
    slug: 'hitachi',
    name: 'Hitachi',
    origin: 'A Japanese brand; room ACs in India are made by Johnson Controls-Hitachi Air Conditioning India, a joint venture.',
    originHi: 'एक जापानी ब्रांड; भारत में रूम AC, Johnson Controls-Hitachi Air Conditioning India नाम के एक जॉइंट वेंचर द्वारा बनाए जाते हैं।',
  },
  {
    slug: 'ifb',
    name: 'IFB',
    origin: 'An Indian company, IFB Industries, originally known for washing machines before expanding into air conditioners.',
    originHi: 'एक भारतीय कंपनी, IFB Industries, जो मूल रूप से वॉशिंग मशीन के लिए जानी जाती थी, बाद में एयर कंडीशनर में भी उतरी।',
  },
  {
    slug: 'lg',
    name: 'LG',
    origin: 'A South Korean company, LG Electronics, a major global electronics and appliance maker with long-standing manufacturing in India.',
    originHi: 'एक दक्षिण कोरियाई कंपनी, LG Electronics — एक बड़ी वैश्विक इलेक्ट्रॉनिक्स और अप्लायंस निर्माता, जिसकी भारत में लंबे समय से मैन्युफैक्चरिंग मौजूद है।',
  },
  {
    slug: 'lloyd',
    name: 'Lloyd',
    origin: 'An Indian AC brand acquired by Havells India in 2017.',
    originHi: 'एक भारतीय AC ब्रांड, जिसे 2017 में Havells India ने खरीद लिया था।',
  },
  {
    slug: 'midea',
    name: 'Midea',
    origin: "A Chinese company and one of the world's largest home-appliance manufacturers by revenue.",
    originHi: 'एक चीनी कंपनी और राजस्व के हिसाब से दुनिया की सबसे बड़ी होम-अप्लायंस निर्माताओं में से एक।',
  },
  {
    slug: 'mitsubishi',
    name: 'Mitsubishi',
    origin: '"Mitsubishi" ACs in India are sold by Mitsubishi Electric and Mitsubishi Heavy Industries — two separate Japanese manufacturers under the same family name.',
    originHi: 'भारत में "Mitsubishi" AC, Mitsubishi Electric और Mitsubishi Heavy Industries द्वारा बेचे जाते हैं — एक ही परिवार-नाम की दो अलग जापानी कंपनियां।',
  },
  {
    slug: 'o-general',
    name: 'O General',
    origin: "Fujitsu General's international brand name for split ACs — a Japanese manufacturer positioned in the premium segment.",
    originHi: 'स्प्लिट AC के लिए Fujitsu General का अंतरराष्ट्रीय ब्रांड नाम — एक जापानी निर्माता, जो प्रीमियम सेगमेंट में स्थित है।',
  },
  {
    slug: 'onida',
    name: 'Onida',
    origin: 'An Indian brand under MIRC Electronics, originally known for televisions before expanding into air conditioners.',
    originHi: 'MIRC Electronics के तहत एक भारतीय ब्रांड, जो मूल रूप से टेलीविज़न के लिए जाना जाता था, बाद में एयर कंडीशनर में भी उतरा।',
  },
  {
    slug: 'panasonic',
    name: 'Panasonic',
    origin: 'A Japanese company with a long-standing manufacturing and retail presence in India.',
    originHi: 'एक जापानी कंपनी, जिसकी भारत में लंबे समय से मैन्युफैक्चरिंग और रिटेल मौजूदगी है।',
  },
  {
    slug: 'samsung',
    name: 'Samsung',
    origin: "A South Korean company, Samsung Electronics, one of the world's largest electronics manufacturers.",
    originHi: 'एक दक्षिण कोरियाई कंपनी, Samsung Electronics — दुनिया की सबसे बड़ी इलेक्ट्रॉनिक्स निर्माताओं में से एक।',
  },
  {
    slug: 'sansui',
    name: 'Sansui',
    origin: 'Originally a Japanese audio-equipment brand; the Sansui name is now Indian-licensed and used on budget-segment electronics.',
    originHi: 'मूल रूप से एक जापानी ऑडियो-उपकरण ब्रांड; Sansui नाम अब भारत में लाइसेंस प्राप्त है और बजट-सेगमेंट इलेक्ट्रॉनिक्स पर इस्तेमाल होता है।',
  },
  {
    slug: 'voltas',
    name: 'Voltas',
    origin: "An Indian company, Voltas Limited (Tata Group) — India's largest room-AC brand by market share for over a decade.",
    originHi: 'एक भारतीय कंपनी, Voltas Limited (Tata Group) — एक दशक से ज़्यादा समय से मार्केट शेयर के हिसाब से भारत का सबसे बड़ा रूम-AC ब्रांड।',
  },
  {
    slug: 'whirlpool',
    name: 'Whirlpool',
    origin: 'An American company founded in 1911, primarily known globally for refrigerators and washing machines.',
    originHi: '1911 में स्थापित एक अमेरिकी कंपनी, जो दुनिया भर में मुख्य रूप से रेफ्रिजरेटर और वॉशिंग मशीन के लिए जानी जाती है।',
  },
]

export function getAcBrand(slug: string): AcBrand | undefined {
  return AC_BRANDS.find((b) => b.slug === slug)
}

export const allAcBrandSlugs = AC_BRANDS.map((b) => b.slug)
