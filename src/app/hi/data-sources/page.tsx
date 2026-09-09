import type { Metadata } from 'next'
import LegalPageShell from '@/components/LegalPageShell'
import { tariffRegistry } from '@/lib/calc/electricity'
import { formatIsoDate } from '@/lib/format'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/data-sources'

export const metadata: Metadata = {
  title: 'डेटा स्रोत — हर कैलकुलेटर के पीछे के आधिकारिक टैरिफ ऑर्डर',
  description:
    'DesiMetrics जिस हर DISCOM को कवर करता है उसके पीछे का आधिकारिक SERC टैरिफ ऑर्डर और आखिरी-सत्यापित तारीख, साथ ही सोलर सब्सिडी और इनकम-टैक्स डेटा का स्रोत।',
  alternates: {
    canonical: `${SITE}/hi${PATH}`,
    languages: getAlternateLanguages('/data-sources'),
  },
}

const tariffs = Object.values(tariffRegistry).sort((a, b) =>
  a.state.localeCompare(b.state),
)

export default function DataSourcesPageHi() {
  return (
    <LegalPageShell
      title="डेटा स्रोत"
      intro="DesiMetrics पर हर टैरिफ एक प्राइमरी नियामक दस्तावेज़ तक जाती है। नीचे हम अभी जिन हर DISCOM को कवर करते हैं उसका सटीक स्रोत ऑर्डर और आखिरी-सत्यापित तारीख है — वही sourceUrl और lastVerified वैल्यू जो हमारी टैरिफ डेटा फाइलों में स्टोर हैं।"
      stub={false}
      path={PATH}
      locale="hi"
    >
      <h2 className="font-display text-xl font-semibold text-ash">
        बिजली DISCOM
      </h2>
      <div className="overflow-x-auto rounded-xl border border-hairline">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist">
            <tr>
              <th className="px-4 py-2 font-semibold">राज्य</th>
              <th className="px-4 py-2 font-semibold">DISCOM</th>
              <th className="px-4 py-2 font-semibold">स्रोत ऑर्डर</th>
              <th className="px-4 py-2 font-semibold">आखिरी सत्यापित</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {tariffs.map((t) => (
              <tr key={t.discomCode}>
                <td className="px-4 py-2">{t.state}</td>
                <td className="px-4 py-2 font-medium">{t.discomCode}</td>
                <td className="px-4 py-2">
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brass underline hover:text-brass"
                  >
                    ऑर्डर देखें
                  </a>
                </td>
                <td className="px-4 py-2 tabular-nums">
                  {formatIsoDate(t.lastVerified)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-ash/60">
        कुछ एंट्री अभी सेकेंडरी संदर्भों से सोर्स की गई हैं जबकि हम
        प्राइमरी SERC ऑर्डर क्रॉस-चेक करते हैं — ऐसी हर फाइल पर एक साफ
        "प्राइमरी क्रॉस-चेक के इंतज़ार में" नोट होता है, जो उसके कैलकुलेटर
        पेज पर दिखता है।
      </p>

      <h2 className="font-display text-xl font-semibold text-ash">
        अन्य डेटा
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>रूफटॉप सोलर सब्सिडी</strong> — PM सूर्य घर: मुफ्त बिजली
          योजना, भारत सरकार (पहले 2 kW के लिए ₹30,000/kW, तीसरे के लिए
          ₹18,000, ₹78,000 तक सीमित)।
        </li>
        <li>
          <strong>इनकम टैक्स स्लैब</strong> — FY 2026-27 (AY 2027-28) के
          लिए फाइनेंस एक्ट दरें, जिसमें ₹75,000/₹50,000 स्टैंडर्ड डिडक्शन
          और सेक्शन 87A रिबेट शामिल हैं।
        </li>
        <li>
          <strong>AC एफिशिएंसी</strong> — ब्यूरो ऑफ एनर्जी एफिशिएंसी
          (BEE) ISEER स्टार-रेटिंग बैंड।
        </li>
        <li>
          <strong>ग्रेच्युटी</strong> — पेमेंट ऑफ ग्रेच्युटी एक्ट, 1972
          (15/26 फॉर्मूला, ₹20,00,000 सीमा)।
        </li>
      </ul>
    </LegalPageShell>
  )
}
