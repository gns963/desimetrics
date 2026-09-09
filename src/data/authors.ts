/**
 * Author / editorial-entity registry for E-E-A-T author pages and bylines.
 *
 * NOTE (before AdSense): for the strongest E-E-A-T, replace or supplement the
 * editorial team with at least one NAMED human author with real, verifiable
 * credentials and a linked professional profile (LinkedIn). Do not invent
 * credentials — use a real person.
 */
export interface Author {
  slug: string
  name: string
  role: string
  bio: string[]
  expertise: string[]
  email: string
  /** Hindi translations of the UI-facing fields (name and email stay the same in every locale). */
  hi?: {
    role: string
    bio: string[]
    expertise: string[]
  }
}

export const AUTHORS: Author[] = [
  {
    slug: 'editorial-team',
    name: 'DesiMetrics Editorial Team',
    role: 'Research & Calculation',
    bio: [
      'The DesiMetrics editorial team researches and maintains every calculator on this site. Our work starts with primary sources — State Electricity Regulatory Commission (SERC) tariff orders, the PM Surya Ghar scheme guidelines, and the Finance Act income-tax slabs — which we encode into structured, version-controlled data files.',
      'We build the calculation logic as pure, unit-tested functions so the maths is reproducible and auditable, and we document the assumptions and limitations of each tool directly on its page. When a tariff has a component we do not yet model, we disclose it rather than approximate silently.',
    ],
    expertise: [
      'Indian electricity tariffs (telescopic slabs, FCA, electricity duty, subsidies)',
      'Rooftop solar economics and the PM Surya Ghar subsidy',
      'Personal finance: GST, SIP, income tax, gratuity',
    ],
    email: 'hello@desimetrics.com',
    hi: {
      role: 'रिसर्च और कैलकुलेशन',
      bio: [
        'DesiMetrics संपादकीय टीम इस साइट के हर कैलकुलेटर की रिसर्च करती है और उसे बनाए रखती है। हमारा काम प्राइमरी स्रोतों से शुरू होता है — स्टेट इलेक्ट्रिसिटी रेगुलेटरी कमीशन (SERC) टैरिफ ऑर्डर, PM सूर्य घर योजना की गाइडलाइन, और फाइनेंस एक्ट इनकम-टैक्स स्लैब — जिन्हें हम स्ट्रक्चर्ड, वर्ज़न-कंट्रोल्ड डेटा फाइलों में कोड करते हैं।',
        'हम कैलकुलेशन लॉजिक को शुद्ध, यूनिट-टेस्ट किए गए फंक्शन के रूप में बनाते हैं ताकि गणित दोहराने योग्य और ऑडिट करने योग्य हो, और हम हर टूल की धारणाओं और सीमाओं को सीधे उसके पेज पर दस्तावेज़ करते हैं। जब किसी टैरिफ का कोई हिस्सा हम अभी मॉडल नहीं करते, तो हम चुपचाप अनुमान लगाने की बजाय इसे बताते हैं।',
      ],
      expertise: [
        'भारतीय बिजली टैरिफ (टेलिस्कोपिक स्लैब, FCA, बिजली शुल्क, सब्सिडी)',
        'रूफटॉप सोलर इकोनॉमिक्स और PM सूर्य घर सब्सिडी',
        'पर्सनल फाइनेंस: GST, SIP, इनकम टैक्स, ग्रेच्युटी',
      ],
    },
  },
]

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug)
}

export const allAuthorSlugs = AUTHORS.map((a) => a.slug)
