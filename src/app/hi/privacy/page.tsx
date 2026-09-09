import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/privacy'

export const metadata: Metadata = {
  title: 'गोपनीयता नीति — DesiMetrics',
  description:
    'DesiMetrics आपका डेटा कैसे इकट्ठा करता है, इस्तेमाल करता है और सुरक्षित रखता है — जिसमें आपके ब्राउज़र में चलने वाले कैलकुलेटर, हमारा इंस्टॉलर लीड फॉर्म, एनालिटिक्स, विज्ञापन और एफिलिएट पार्टनर शामिल हैं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/privacy'),
  },
}

export default function PrivacyPageHi() {
  return (
    <LegalPageShell
      title="गोपनीयता नीति"
      intro="यह नीति बताती है कि DesiMetrics कौन सा डेटा इकट्ठा करता है, क्यों, और आपके विकल्प क्या हैं। हम इकट्ठा करने को साइट चलाने के लिए ज़रूरी न्यूनतम तक सीमित रखते हैं।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        कैलकुलेटर आपके ब्राउज़र में चलते हैं
      </h2>
      <p>
        आप हमारे कैलकुलेटर में जो नंबर टाइप करते हैं (यूनिट, आय, सिस्टम
        साइज़ वगैरह) पूरी तरह आपके ब्राउज़र में प्रोसेस होकर एक नतीजा
        दिखाते हैं। वे हमारे सर्वर पर भेजे या स्टोर नहीं किए जाते।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        आप जो जानकारी सबमिट करते हैं
      </h2>
      <p>
        अगर आप हमारा सोलर इंस्टॉलर लीड फॉर्म इस्तेमाल करते हैं, तो आप PIN
        कोड, मासिक बिल राशि, छत का प्रकार और फोन नंबर जैसे ब्यौरे देते
        हैं। यह जानकारी सिर्फ आपको संबंधित इंस्टॉलर से जोड़ने के लिए
        इस्तेमाल होती है। इस फीचर को चालू करने से पहले हम ठीक-ठीक बताएंगे
        कि इसे कैसे स्टोर और शेयर किया जाता है; आज यह फॉर्म कोई डेटा भेजता
        या स्टोर नहीं करता।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        एनालिटिक्स
      </h2>
      <p>
        हम कुल मिलाकर, गुमनाम इस्तेमाल को समझने के लिए गोपनीयता-सम्मानित
        एनालिटिक्स इस्तेमाल कर सकते हैं — उदाहरण के लिए कौन से कैलकुलेटर
        लोकप्रिय हैं — ताकि हम साइट को बेहतर बना सकें। यह आपकी व्यक्तिगत
        पहचान नहीं करता।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        विज्ञापन और एफिलिएट पार्टनर
      </h2>
      <p>
        हम विज्ञापन दिखाने की योजना बना रहे हैं (Google AdSense सहित) और
        एफिलिएट लिंक इस्तेमाल करने की (Amazon Associates प्रोग्राम सहित)।
        Google सहित थर्ड-पार्टी वेंडर, इस और दूसरी वेबसाइटों पर पहले की
        विज़िट के आधार पर विज्ञापन दिखाने के लिए कुकीज़ इस्तेमाल करते हैं।
        आप Google की{' '}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brass underline"
        >
          Ads Settings
        </a>{' '}
        के ज़रिए और जान सकते हैं और पर्सनलाइज़्ड विज्ञापन से बाहर निकल
        सकते हैं। ब्यौरे के लिए हमारी{' '}
        <Link href="/hi/cookie-policy" className="text-brass underline">
          कुकी नीति
        </Link>{' '}
        और{' '}
        <Link href="/hi/affiliate-disclosure" className="text-brass underline">
          एफिलिएट डिस्क्लोज़र
        </Link>{' '}
        देखें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        आपके विकल्प
      </h2>
      <p>
        आप अपनी ब्राउज़र सेटिंग्स के ज़रिए कुकीज़ को नियंत्रित कर सकते हैं
        और ऊपर बताए अनुसार पर्सनलाइज़्ड विज्ञापन से बाहर निकल सकते हैं।
        आपने हमें भेजे किसी भी डेटा (उदाहरण के लिए लीड फॉर्म या ईमेल के
        ज़रिए) के बारे में पूछने के लिए, संपर्क करें{' '}
        <a href="mailto:hello@desimetrics.com" className="text-brass underline">
          hello@desimetrics.com
        </a>
        ।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        बच्चे
      </h2>
      <p>
        DesiMetrics एक सामान्य-दर्शक जानकारी साइट है और 13 साल से कम उम्र
        के बच्चों के लिए नहीं है, जिनसे हम जान-बूझकर व्यक्तिगत डेटा इकट्ठा
        नहीं करते।
      </p>
    </LegalPageShell>
  )
}
