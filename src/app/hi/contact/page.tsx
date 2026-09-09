import type { Metadata } from 'next'
import LegalPageShell from '@/components/LegalPageShell'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/contact'

export const metadata: Metadata = {
  title: 'DesiMetrics से संपर्क करें — सुधार, अनुरोध और साझेदारी',
  description:
    'DesiMetrics से संपर्क करें — एक टैरिफ गलती रिपोर्ट करें, एक राज्य या DISCOM का अनुरोध करें, या एक साझेदारी पर चर्चा करें। हम खास तौर पर एक आधिकारिक ऑर्डर के समर्थन वाले सुधारों का स्वागत करते हैं।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/contact'),
  },
}

export default function ContactPageHi() {
  return (
    <LegalPageShell
      title="संपर्क करें"
      intro="हम हर संदेश पढ़ते हैं। सही इनबॉक्स तक पहुंचने का सबसे तेज़ तरीका यहां है।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        एक सुधार रिपोर्ट करें
      </h2>
      <p>
        कोई गलत दर या पुरानी टैरिफ मिली? ईमेल करें{' '}
        <a
          href="mailto:corrections@desimetrics.com"
          className="text-brass underline"
        >
          corrections@desimetrics.com
        </a>
        । आधिकारिक ऑर्डर का एक लिंक हमें इसे तेज़ी से सत्यापित और ठीक करने
        में मदद करता है।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        एक राज्य या DISCOM का अनुरोध करें
      </h2>
      <p>
        चाहते हैं आपका राज्य अगला जोड़ा जाए? हमें बताएं कौन सा DISCOM{' '}
        <a href="mailto:hello@desimetrics.com" className="text-brass underline">
          hello@desimetrics.com
        </a>{' '}
        पर। हम मांग के हिसाब से प्राथमिकता देते हैं।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        साझेदारी
      </h2>
      <p>
        सोलर इंस्टॉलर, उपकरण ब्रांड और मीडिया पूछताछ:{' '}
        <a href="mailto:hello@desimetrics.com" className="text-brass underline">
          hello@desimetrics.com
        </a>
        ।
      </p>

      <p className="text-sm text-ash/60">
        हमारा लक्ष्य 2 कार्य दिवसों के भीतर जवाब देना है।
      </p>
    </LegalPageShell>
  )
}
