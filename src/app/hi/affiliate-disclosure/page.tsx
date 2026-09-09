import type { Metadata } from 'next'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/affiliate-disclosure'

export const metadata: Metadata = {
  title: 'एफिलिएट डिस्क्लोज़र — DesiMetrics',
  description:
    'DesiMetrics एफिलिएट लिंक कैसे इस्तेमाल करता है, जिसमें Amazon Associates प्रोग्राम शामिल है, और संपादकीय स्वतंत्रता के प्रति हमारी प्रतिबद्धता।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/affiliate-disclosure'),
  },
}

export default function AffiliateDisclosurePageHi() {
  return (
    <LegalPageShell
      title="एफिलिएट डिस्क्लोज़र"
      intro="DesiMetrics पाठकों के समर्थन से चलता है। इस साइट के कुछ लिंक एफिलिएट लिंक हैं, जिसका मतलब है कि अगर आप इनके ज़रिए खरीदारी करते हैं तो हम एक कमीशन कमा सकते हैं — आपको कोई अतिरिक्त लागत नहीं।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        Amazon Associates प्रोग्राम
      </h2>
      <p>
        DesiMetrics Amazon Associates प्रोग्राम का एक भागीदार है, जो एक
        एफिलिएट विज्ञापन प्रोग्राम है जो साइटों को Amazon.in पर विज्ञापन
        और लिंक करके विज्ञापन शुल्क कमाने का ज़रिया देने के लिए बनाया गया
        है। <strong>एक Amazon Associate के रूप में हम योग्य खरीदारी से
        कमाते हैं।</strong> जब आप "View on Amazon" बटन या एक प्रोडक्ट
        लिंक पर क्लिक करते हैं और खरीदारी करते हैं, तो Amazon हमें बिक्री
        का एक छोटा प्रतिशत भुगतान कर सकता है।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        आपके लिए कोई अतिरिक्त लागत नहीं
      </h2>
      <p>
        एफिलिएट कमीशन आपकी चुकाई जाने वाली कीमत कभी नहीं बदलते। Amazon
        पर कीमत बिल्कुल वही रहती है चाहे आप हमारा लिंक इस्तेमाल करें या
        नहीं। कमीशन बस हमें DesiMetrics पर कैलकुलेटर मुफ्त रखने में मदद
        करते हैं।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        संपादकीय स्वतंत्रता
      </h2>
      <p>
        हमारा टैरिफ डेटा, कैलकुलेशन और सिफारिशें एफिलिएट रिश्तों से
        प्रभावित नहीं होतीं। प्रोडक्ट सुझाव पेज की प्रासंगिकता के लिए
        चुने जाते हैं — उदाहरण के लिए, हमारे AC लागत पेजों पर एफिशिएंट AC
        मॉडल — और हम जहां भी एफिलिएट लिंक दिखते हैं वहां साफ तौर पर लेबल
        करते हैं। हम किसी कैलकुलेटर के आउटपुट को बदलने या किसी प्रोडक्ट
        को ऊंची रैंक देने के लिए भुगतान स्वीकार नहीं करते।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        कीमत और उपलब्धता
      </h2>
      <p>
        प्रोडक्ट के लिए दिखाई गई कीमतें, रेटिंग और उपलब्धता संकेतात्मक
        हैं और किसी भी समय बदल सकती हैं। खरीदारी के समय Amazon पर दिखने
        वाले आंकड़े ही लागू होते हैं। खरीदने से पहले हमेशा रिटेलर के पेज
        पर मौजूदा कीमत, स्पेसिफिकेशन और वारंटी की पुष्टि करें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        सवाल
      </h2>
      <p>
        अगर हम एफिलिएट लिंक कैसे इस्तेमाल करते हैं इस बारे में आपके कोई
        सवाल हैं, तो हमसे यहां संपर्क करें{' '}
        <a
          href="mailto:hello@desimetrics.com"
          className="text-brass underline hover:text-brass"
        >
          hello@desimetrics.com
        </a>
        ।
      </p>
    </LegalPageShell>
  )
}
