import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/terms'

export const metadata: Metadata = {
  title: 'इस्तेमाल की शर्तें — DesiMetrics',
  description:
    'DesiMetrics के इस्तेमाल को नियंत्रित करने वाली शर्तें, जिसमें यह शामिल है कि हमारे कैलकुलेटर अनुमान देते हैं, पेशेवर सलाह नहीं, और हमारी देयता की सीमा।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/terms'),
  },
}

export default function TermsPageHi() {
  return (
    <LegalPageShell
      title="इस्तेमाल की शर्तें"
      intro="DesiMetrics इस्तेमाल करके आप इन शर्तों से सहमत होते हैं। कृपया इन्हें हमारी गोपनीयता नीति और डिस्क्लेमर के साथ पढ़ें।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        अनुमान, सलाह नहीं
      </h2>
      <p>
        हमारे कैलकुलेटर सिर्फ सामान्य जानकारी के लिए दिए गए हैं। ये
        अनुमान देते हैं, आधिकारिक बिल, टैक्स गणना या वित्तीय सलाह नहीं,
        और इन्हें किसी वित्तीय फैसले का आपका एकमात्र आधार नहीं होना
        चाहिए। हमारा{' '}
        <Link href="/hi/disclaimer" className="text-brass underline">
          डिस्क्लेमर
        </Link>{' '}
        देखें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        सटीकता और उपलब्धता
      </h2>
      <p>
        हम डेटा को सटीक और मौजूदा रखने के लिए काम करते हैं लेकिन यह
        गारंटी नहीं देते कि हर आंकड़ा गलती-मुक्त या अद्यतन है, या साइट
        बिना रुकावट चलेगी। हम किसी भी समय टूल बदल या हटा सकते हैं।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        विज्ञापन और एफिलिएट लिंक
      </h2>
      <p>
        साइट में विज्ञापन और एफिलिएट लिंक हो सकते हैं। आप थर्ड पार्टी के
        ज़रिए जो खरीदारी करते हैं वह उनकी शर्तों से नियंत्रित होती है,
        हमारी से नहीं। हमारा{' '}
        <Link href="/hi/affiliate-disclosure" className="text-brass underline">
          एफिलिएट डिस्क्लोज़र
        </Link>{' '}
        देखें।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        बौद्धिक संपदा
      </h2>
      <p>
        DesiMetrics नाम, कंटेंट और कैलकुलेटर हमारी संपत्ति हैं या अनुमति
        से इस्तेमाल किए जाते हैं। आप इन टूल का इस्तेमाल व्यक्तिगत,
        गैर-व्यावसायिक उद्देश्यों के लिए कर सकते हैं; बिना लिखित सहमति के
        आप इन्हें स्क्रैप, दोबारा प्रकाशित या दोबारा नहीं बेच सकते।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        देयता की सीमा
      </h2>
      <p>
        कानून द्वारा अनुमति की सीमा तक, DesiMetrics दिए गए अनुमान या
        जानकारी पर भरोसा करने से होने वाले किसी नुकसान के लिए ज़िम्मेदार
        नहीं है। साइट का आपका इस्तेमाल आपके अपने जोखिम पर है।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        शासी कानून
      </h2>
      <p>
        ये शर्तें भारत के कानूनों द्वारा शासित हैं। हम इन्हें समय-समय पर
        अपडेट कर सकते हैं; साइट का लगातार इस्तेमाल मतलब आप मौजूदा वर्ज़न
        स्वीकार करते हैं।
      </p>
    </LegalPageShell>
  )
}
