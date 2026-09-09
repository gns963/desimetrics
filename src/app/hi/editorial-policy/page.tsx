import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/editorial-policy'

export const metadata: Metadata = {
  title: 'संपादकीय नीति — सटीकता, सोर्सिंग और सुधार | DesiMetrics',
  description:
    'हमारे संपादकीय मानक: हम डेटा को कैसे सोर्स और सत्यापित करते हैं, असत्यापित आंकड़ों को कैसे लेबल करते हैं, गलतियां कैसे ठीक करते हैं, और कैलकुलेटर को विज्ञापन और एफिलिएट आय से स्वतंत्र कैसे रखते हैं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/editorial-policy'),
  },
}

export default function EditorialPolicyPageHi() {
  return (
    <LegalPageShell
      title="संपादकीय नीति"
      intro="ये वे मानक हैं जिन पर DesiMetrics का हर कैलकुलेटर और पेज परखा जाता है। ये इसलिए हैं ताकि आप नंबरों पर भरोसा कर सकें — और खुद उन्हें जांच सकें।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        पहले प्राइमरी स्रोत
      </h2>
      <p>
        हम टैरिफ और दर डेटा प्राइमरी दस्तावेज़ों से लेते हैं — SERC टैरिफ
        ऑर्डर, सरकारी योजना गाइडलाइन और फाइनेंस एक्ट — किसी और कैलकुलेटर
        से नहीं। जहां हम अस्थायी रूप से किसी सेकेंडरी संदर्भ पर निर्भर
        करते हैं, हम उस आंकड़े को प्राइमरी क्रॉस-चेक के इंतज़ार में लेबल
        करते हैं और इसे सत्यापित करने को प्राथमिकता देते हैं।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        प्रकाशित करने से पहले सत्यापित करें
      </h2>
      <p>
        एक टैरिफ तब तक प्रकाशित नहीं होती जब तक यह हमारे स्कीमा वैलिडेशन
        को पास नहीं करती और इसके पास एक दर्ज स्रोत और सत्यापन स्थिति नहीं
        होती। सटीक तंत्र के लिए हमारी{' '}
        <Link href="/hi/methodology" className="text-brass underline">
          कार्यप्रणाली
        </Link>{' '}
        देखें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        अनिश्चितता को ईमानदारी से लेबल करें
      </h2>
      <p>
        अगर कोई नंबर अस्थायी है, या बिल का कोई हिस्सा मॉडल नहीं किया गया
        है, तो हम इसे पेज पर बता देते हैं। हम एक साफ-साफ लेबल किया गया
        अनुमान दिखाना पसंद करेंगे, बजाय एक सटीक दिखने वाले आंकड़े के जो
        गलत हो।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        सुधार
      </h2>
      <p>
        अगर आपको कोई गलती मिलती है, तो ईमेल करें{' '}
        <a
          href="mailto:corrections@desimetrics.com"
          className="text-brass underline"
        >
          corrections@desimetrics.com
        </a>
        । हम रिपोर्ट की तुरंत समीक्षा करते हैं, पुष्ट गलतियों को ठीक करते
        हैं, और प्रभावित कैलकुलेटर की आखिरी-सत्यापित तारीख अपडेट करते हैं
        ताकि बदलाव दिखाई दे।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        राजस्व से स्वतंत्रता
      </h2>
      <p>
        विज्ञापन और एफिलिएट आय कभी किसी कैलकुलेशन, सिफारिश, या किसी
        प्रोडक्ट की रैंकिंग को प्रभावित नहीं करती। कमर्शियल कंटेंट को
        साफ तौर पर लेबल किया जाता है और टूल से अलग रखा जाता है। हमारा{' '}
        <Link href="/hi/affiliate-disclosure" className="text-brass underline">
          एफिलिएट डिस्क्लोज़र
        </Link>{' '}
        देखें।
      </p>
    </LegalPageShell>
  )
}
