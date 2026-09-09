import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/cookie-policy'

export const metadata: Metadata = {
  title: 'कुकी नीति — DesiMetrics',
  description:
    'DesiMetrics कौन सी कुकीज़ इस्तेमाल करता है — ज़रूरी, एनालिटिक्स और विज्ञापन (Google AdSense और DoubleClick सहित) — और इन्हें कैसे नियंत्रित या इनसे बाहर निकलें।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/cookie-policy'),
  },
}

export default function CookiePolicyPageHi() {
  return (
    <LegalPageShell
      title="कुकी नीति"
      intro="यह नीति बताती है कि DesiMetrics और हमारे पार्टनर कुकीज़ और इसी तरह की तकनीकें कैसे इस्तेमाल करते हैं, और आप इन्हें कैसे नियंत्रित कर सकते हैं।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        कुकीज़ क्या हैं
      </h2>
      <p>
        कुकीज़ आपके ब्राउज़र द्वारा स्टोर की गई छोटी टेक्स्ट फाइलें हैं।
        ये किसी साइट को प्राथमिकताएं याद रखने देती हैं और हमें व हमारे
        पार्टनरों को यह समझने में मदद करती हैं कि साइट कैसे इस्तेमाल की
        जाती है।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        हम जो प्रकार इस्तेमाल करते हैं
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>ज़रूरी</strong> — साइट के काम करने और लाइट/डार्क थीम
          जैसी बुनियादी प्राथमिकताएं याद रखने के लिए चाहिए।
        </li>
        <li>
          <strong>एनालिटिक्स</strong> — कुल मिलाकर, गुमनाम इस्तेमाल मापने
          में मदद करती हैं ताकि हम कैलकुलेटर बेहतर बना सकें।
        </li>
        <li>
          <strong>विज्ञापन</strong> — विज्ञापन चालू होने के बाद, Google
          सहित थर्ड-पार्टी वेंडर इस और दूसरी साइटों पर आपकी विज़िट के
          आधार पर विज्ञापन दिखाने और मापने के लिए कुकीज़ (जैसे DoubleClick
          कुकी) इस्तेमाल करते हैं।
        </li>
        <li>
          <strong>एफिलिएट</strong> — कुछ बाहरी रिटेलर लिंक कुकीज़ सेट
          करते हैं ताकि एक योग्य खरीदारी को हमसे जोड़ा जा सके।
        </li>
      </ul>

      <h2 className="font-display text-xl font-semibold text-ash">
        Google AdSense
      </h2>
      <p>
        Google, एक थर्ड-पार्टी वेंडर के तौर पर, इस साइट पर विज्ञापन दिखाने
        के लिए कुकीज़ इस्तेमाल करता है। विज्ञापन कुकीज़ के इस्तेमाल से
        Google और उसके पार्टनर यहां और कहीं और आपकी विज़िट के आधार पर
        विज्ञापन दिखा पाते हैं। आप Google की{' '}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brass underline"
        >
          Ads Settings
        </a>{' '}
        में पर्सनलाइज़्ड विज्ञापन से बाहर निकल सकते हैं, या कुछ थर्ड-पार्टी
        वेंडर से{' '}
        <a
          href="https://www.aboutads.info"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brass underline"
        >
          aboutads.info
        </a>{' '}
        पर बाहर निकल सकते हैं।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        कुकीज़ प्रबंधित करना
      </h2>
      <p>
        आप अपनी ब्राउज़र सेटिंग्स के ज़रिए कुकीज़ ब्लॉक या डिलीट कर सकते
        हैं। अगर आप ज़रूरी कुकीज़ बंद करते हैं तो कुछ फीचर मनचाहे तरीके से
        काम नहीं कर सकते। हम व्यक्तिगत डेटा कैसे संभालते हैं, इसके लिए
        हमारी{' '}
        <Link href="/hi/privacy" className="text-brass underline">
          गोपनीयता नीति
        </Link>{' '}
        देखें।
      </p>
    </LegalPageShell>
  )
}
