import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/disclaimer'

export const metadata: Metadata = {
  title: 'डिस्क्लेमर — DesiMetrics',
  description:
    'DesiMetrics के अनुमानों की महत्वपूर्ण सीमाएं: हम कौन से टैरिफ हिस्से मॉडल नहीं करते, और नतीजे संकेतात्मक क्यों हैं, पेशेवर, टैक्स या निवेश सलाह नहीं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/disclaimer'),
  },
}

export default function DisclaimerPageHi() {
  return (
    <LegalPageShell
      title="डिस्क्लेमर"
      intro="हमारे कैलकुलेटर योजना बनाने और तुलना के लिए करीबी अनुमान देते हैं। हमेशा महत्वपूर्ण आंकड़ों की पुष्टि अपने आधिकारिक बिल या किसी योग्य पेशेवर से करें।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        बिजली बिल
      </h2>
      <p>
        राउंडिंग, मीटर किराया, एक-बार के चार्ज और हमारे आखिरी सत्यापन और
        आपकी बिलिंग तारीख के बीच टैरिफ संशोधनों की वजह से असली बिल हमारे
        अनुमान से अलग हो सकते हैं। कुछ हिस्से जान-बूझकर मॉडल नहीं किए गए
        हैं, जिसमें महाराष्ट्र का व्हीलिंग चार्ज और फ्यूल एडजस्टमेंट,
        पश्चिम बंगाल का मासिक MVCA सरचार्ज, और केरल की महीने में 250
        यूनिट से ऊपर की नॉन-टेलिस्कोपिक दर शामिल है। ये सीमाएं संबंधित
        कैलकुलेटर पर नोट की गई हैं; हमारी{' '}
        <Link href="/hi/methodology" className="text-brass underline">
          कार्यप्रणाली
        </Link>{' '}
        देखें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        सोलर और AC
      </h2>
      <p>
        सोलर बचत, सिस्टम लागत और पेबैक संकेतात्मक बेंचमार्क और एक सामान्य
        जनरेशन धारणा इस्तेमाल करते हैं; असली कोटेशन और आउटपुट स्थान, छाया
        और इंस्टॉलर के हिसाब से अलग होते हैं। AC चलाने की लागत एक मानक
        कंप्रेसर ड्यूटी फैक्टर और ISEER बैंड मानती है। दोनों को योजना बनाने
        वाले अनुमान मानें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        फाइनेंशियल कैलकुलेटर
      </h2>
      <p>
        GST, SIP, इनकम-टैक्स और ग्रेच्युटी टूल सिर्फ सामान्य मार्गदर्शन
        के लिए हैं और टैक्स, कानूनी या निवेश सलाह नहीं हैं। इनकम-टैक्स
        कैलकुलेटर सरचार्ज (₹50 लाख से ऊपर की आय) या मार्जिनल राहत को
        मॉडल नहीं करता, और SIP आंकड़े एक्सपेंस रेशियो और कैपिटल-गेन्स
        टैक्स से पहले के हैं। SIP रिटर्न मार्केट-लिंक्ड हैं और गारंटीशुदा
        नहीं। कोई कार्रवाई करने से पहले किसी योग्य पेशेवर से परामर्श करें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        कोई संबद्धता नहीं
      </h2>
      <p>
        DesiMetrics स्वतंत्र है और किसी भी DISCOM, नियामक आयोग या सरकारी
        निकाय से संबद्ध नहीं है, और इन अनुमानों के आधार पर लिए गए फैसलों
        के लिए ज़िम्मेदार नहीं है।
      </p>
    </LegalPageShell>
  )
}
