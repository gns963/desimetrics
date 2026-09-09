import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell from '@/components/LegalPageShell'
import { tariffRegistry } from '@/lib/calc/electricity'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/about'

export const metadata: Metadata = {
  title: 'DesiMetrics के बारे में — भारतीय यूटिलिटी और फाइनेंस कैलकुलेटर',
  description:
    'DesiMetrics भारतीय बिजली बिल, रूफटॉप सोलर, AC चलाने की लागत और पर्सनल फाइनेंस के लिए सटीक, स्रोत-सहित कैलकुलेटर बनाता है। जानें हम कौन हैं और कैसे काम करते हैं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/about'),
  },
}

const discomCount = Object.keys(tariffRegistry).length

export default function AboutPageHi() {
  return (
    <LegalPageShell
      title="DesiMetrics के बारे में"
      intro="DesiMetrics एक स्वतंत्र भारतीय कैलकुलेटर प्लेटफॉर्म है। हम घने नियामक दस्तावेज़ों — राज्य बिजली टैरिफ ऑर्डर, PM सूर्य घर योजना, इनकम-टैक्स स्लैब — को तेज़, सटीक टूल में बदलते हैं जो कोई भी सामान्य घर सेकंडों में इस्तेमाल कर सके।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        हम क्यों हैं
      </h2>
      <p>
        भारतीय बिजली बिल का अंदाज़ा लगाना सच में मुश्किल है: टेलिस्कोपिक
        स्लैब, द्वि-मासिक या तिमाही बिलिंग, फ्यूल कॉस्ट एडजस्टमेंट, बिजली
        शुल्क और राज्य-विशिष्ट सब्सिडी — ये सब आपस में जुड़ी होती हैं।
        ज़्यादातर ऑनलाइन "बिल कैलकुलेटर" अपनी धारणाएं छिपाते हैं या एक
        फ्लैट दर इस्तेमाल करते हैं जो बस गलत होती है। हमने DesiMetrics
        इसके उलटा करने के लिए शुरू किया — हर DISCOM की असली प्रकाशित
        टैरिफ को कोड करना, अपना हिसाब दिखाना, और हर पेज पर स्रोत ऑर्डर का
        हवाला देना।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        आज हम क्या कवर करते हैं
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>बिजली बिल</strong> — हर भारतीय राज्य और केंद्र शासित
          प्रदेश के सभी {discomCount} DISCOM के लिए — टेलिस्कोपिक स्लैब,
          फिक्स्ड चार्ज, फ्यूल कॉस्ट एडजस्टमेंट, बिजली शुल्क और सब्सिडी,
          हर एक अपने खुद के SERC टैरिफ ऑर्डर से सोर्स की गई।
        </li>
        <li>
          <strong>रूफटॉप सोलर</strong> — ROI/पेबैक, पैनल साइज़िंग, बैटरी
          बैकअप, नेट मीटरिंग कमाई और PM सूर्य घर सब्सिडी, आपकी असली DISCOM
          टैरिफ पर आधारित।
        </li>
        <li>
          <strong>एयर कंडीशनर</strong> — चलाने की लागत, कमरे का साइज़िंग,
          बिजली खपत, सर्किट सुरक्षा मार्गदर्शन, ब्रांड-विशिष्ट कैलकुलेटर
          और 3-स्टार बनाम 5-स्टार बचत।
        </li>
        <li>
          <strong>घरेलू उपकरण</strong> — सीलिंग फैन और फ्रिज की चलाने की
          लागत, इन्वर्टर/UPS साइज़िंग और बैकअप समय, कमरे को ठंडा करने का
          समय और पानी की टंकी भरने का समय।
        </li>
        <li>
          <strong>ईंधन लागत</strong> — प्रति किमी पेट्रोल/डीज़ल, LPG
          सिलेंडर इस्तेमाल और जनरेटर चलाने की लागत।
        </li>
        <li>
          <strong>पानी और गैस बिल</strong> — ईमानदार कैलकुलेटर जो आपके
          खुद के इस्तेमाल और दर का इस्तेमाल करते हैं, क्योंकि नगरपालिका
          और सिटी-गैस टैरिफ केंद्रीय रूप से इस तरह प्रकाशित नहीं होतीं
          जिसे हम सत्यापित कर सकें।
        </li>
        <li>
          <strong>पर्सनल फाइनेंस</strong> — GST, SIP, मौजूदा वित्तीय वर्ष
          के लिए नई बनाम पुरानी टैक्स रेजीम, और ग्रेच्युटी।
        </li>
      </ul>

      <h2 className="font-display text-xl font-semibold text-ash">
        हम कैसे अलग हैं
      </h2>
      <p>
        DesiMetrics पर हर बिजली टैरिफ एक स्ट्रक्चर्ड डेटा फाइल में रहती
        है जिसमें एक <code>sourceUrl</code> होता है जो उस स्टेट इलेक्ट्रिसिटी
        रेगुलेटरी कमीशन ऑर्डर की ओर इशारा करता है जहां से यह आई, एक{' '}
        <code>lastVerified</code> तारीख और एक <code>verifiedBy</code>{' '}
        स्थिति। हम इन्हें हर कैलकुलेटर पर दिखाते हैं, और उन आंकड़ों को
        साफ तौर पर लेबल करते हैं जो सोर्स की गई हैं लेकिन अभी प्राइमरी
        ऑर्डर के मुकाबले क्रॉस-चेक नहीं हुई। अगर हम किसी चार्ज को मॉडल
        नहीं करते (उदाहरण के लिए महाराष्ट्र का व्हीलिंग चार्ज, या केरल का
        250 यूनिट से ऊपर का नॉन-टेलिस्कोपिक स्लैब), तो हम चुपचाप आपके
        बिल को कम या ज़्यादा बताने की बजाय पेज पर यह बता देते हैं। पूरे
        तंत्र के लिए हमारी{' '}
        <Link href="/hi/methodology" className="text-brass underline">
          कार्यप्रणाली
        </Link>{' '}
        पढ़ें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        इसे कौन चलाता है
      </h2>
      <p>
        DesiMetrics को{' '}
        <Link href="/author/editorial-team" className="text-brass underline">
          DesiMetrics संपादकीय टीम
        </Link>{' '}
        बनाए रखती है, जो टैरिफ ऑर्डर रिसर्च करती है, कैलकुलेशन इंजन बनाती
        है और लाइव जाने से पहले हर नंबर की समीक्षा करती है। कोई गलती दिखी
        या कोई राज्य जुड़वाना चाहते हैं?{' '}
        <Link href="/hi/contact" className="text-brass underline">
          हमसे संपर्क करें
        </Link>
        ।
      </p>
    </LegalPageShell>
  )
}
