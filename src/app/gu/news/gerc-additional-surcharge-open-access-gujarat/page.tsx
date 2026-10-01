import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gerc-additional-surcharge-open-access-gujarat'
const TITLE = 'ગુજરાતમાં ઓપન એક્સેસ એડિશનલ સરચાર્જ ₹0.99/kWh નક્કી: વ્યવસાયો માટે તેનો શું અર્થ (ઓક્ટોબર 2026–માર્ચ 2027)'
const DESCRIPTION =
  'GERC એ DGVCL, MGVCL, PGVCL અને UGVCL ના ઓપન એક્સેસ ગ્રાહકો માટે એડિશનલ સરચાર્જ ₹0.99/kWh નક્કી કર્યો છે, જે 1 ઓક્ટોબર 2026 થી 31 માર્ચ 2027 સુધી લાગુ છે. આ ફક્ત કોમર્શિયલ અને ઇન્ડસ્ટ્રિયલ ઓપન એક્સેસ ગ્રાહકોને લાગુ પડે છે — ઘરેલું બિલ પર કોઈ અસર નથી.'
const LAST_UPDATED = '1 ઓક્ટોબર 2026'
const ORDER_DATE = '10 સપ્ટેમ્બર 2026'

export const metadata: Metadata = {
  title: 'ગુજરાત ઓપન એક્સેસ એડિશનલ સરચાર્જ ₹0.99/kWh (ઓક્ટો 2026–માર્ચ 2027)',
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/gu${PATH}`,
    languages: getAlternateLanguages(PATH),
  },
  openGraph: { url: `${SITE}/gu${PATH}`, type: 'article', locale: 'gu_IN' },
  robots: { index: false },
}

const breadcrumb = breadcrumbLd([
  { name: 'હોમ', path: '' },
  { name: 'ન્યૂઝ', path: '/news' },
  { name: TITLE, path: PATH },
])

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    '@type': 'Organization',
    name: 'DesiMetrics Editorial Team',
    url: `${SITE}/author/editorial-team`,
  },
  publisher: { '@type': 'Organization', name: 'DesiMetrics', url: SITE },
  datePublished: '2026-10-01',
  dateModified: '2026-10-01',
  mainEntityOfPage: `${SITE}/gu${PATH}`,
}

const faqs = [
  {
    q: 'આ એડિશનલ સરચાર્જ મારા ઘરના વીજ બિલ પર અસર કરે છે?',
    a: 'ના. એડિશનલ સરચાર્જ ફક્ત ઓપન એક્સેસ ગ્રાહકોને લાગુ પડે છે — એટલે કે એવા કોમર્શિયલ અને ઇન્ડસ્ટ્રિયલ ગ્રાહકો જે પોતાની ડિસ્કોમ સિવાયના સ્રોતમાંથી વીજળી ખરીદે છે. સામાન્ય DGVCL, MGVCL, PGVCL કે UGVCL જોડાણ ધરાવતા ઘરેલું ગ્રાહકો આ ચૂકવતા નથી, અને આ હુકમથી કોઈ ઘરેલું ટેરિફ બદલાતો નથી.',
  },
  {
    q: 'એડિશનલ સરચાર્જ શું છે, અને તે કેમ વસૂલાય છે?',
    a: 'તે વિદ્યુત અધિનિયમ, 2003 ની કલમ 42(4) હેઠળનો ચાર્જ છે, જે વિતરણ કંપનીને એ લાંબા ગાળાની જનરેશન ક્ષમતાની ફિક્સ્ડ કિંમત પરત આપે છે જે તેણે હવે ઓપન એક્સેસ પર ગયેલા ગ્રાહકો માટે કરારબદ્ધ કરી હતી. ડિસ્કોમની સપ્લાય આપવાની જવાબદારી ચાલુ રહે છે, તેથી કોઈ મોટો ગ્રાહક બીજેથી વીજળી લેવા લાગે તો પણ તે એ ક્ષમતાનો કરાર રદ કરી શકતી નથી.',
  },
  {
    q: 'તે કેટલો છે, અને ક્યાં સુધી લાગુ છે?',
    a: '₹0.99 પ્રતિ kWh, જે 1 ઓક્ટોબર 2026 થી 31 માર્ચ 2027 સુધી DGVCL, MGVCL, PGVCL અને UGVCL ના ઓપન એક્સેસ ગ્રાહકોને લાગુ પડે છે. તે GERC ના હુકમ ક્રમાંક 05 of 2026, તારીખ 10 સપ્ટેમ્બર 2026 થી નક્કી થયો છે અને દર છ મહિને સુધારાય છે.',
  },
  {
    q: 'GERC ₹0.99 સુધી કેવી રીતે પહોંચ્યું?',
    a: '1 ઓક્ટોબર 2025 થી 31 માર્ચ 2026 ના GUVNL ડેટા આધારે: 96,129 MU ઉપલબ્ધ ઊર્જામાંથી 63,110 MU સામાન્ય ગ્રાહકો માટે શેડ્યૂલ થઈ, એટલે 33,018 MU સ્ટ્રેન્ડેડ રહી. કરારબદ્ધ ક્ષમતા પર ચૂકવાયેલી ₹8,193 કરોડ ફિક્સ્ડ કિંમતમાંથી ₹2,814 કરોડ સ્ટ્રેન્ડેડ ક્ષમતા સાથે જોડાયેલી હતી. 1,630 MU ઓપન એક્સેસ ઊર્જા સામે, ઓપન એક્સેસ સાથે જોડાયેલી સ્ટ્રેન્ડેડ ફિક્સ્ડ કિંમત ₹215 કરોડ થઈ, જેમાંથી ડિમાન્ડ ચાર્જ દ્વારા પહેલેથી વસૂલાયેલા ₹53 કરોડ ઘટાડતાં ₹162 કરોડ બાકી રહ્યા. ₹162 કરોડને 1,630 MU થી ભાગતાં ₹0.99 પ્રતિ યુનિટ આવે છે.',
  },
  {
    q: 'સરચાર્જ વધી રહ્યો છે કે ઘટી રહ્યો છે?',
    a: 'તે દર છ મહિને બદલાય છે. છેલ્લા પાંચ ગાળામાં તે ₹0.93 (ઓક્ટો 2024–માર્ચ 2025), ₹0.82 (એપ્રિલ–સપ્ટે 2025), ₹1.00 (ઓક્ટો 2025–માર્ચ 2026), ₹0.76 (એપ્રિલ–સપ્ટે 2026) અને હવે ₹0.99 રહ્યો છે. છેલ્લા ત્રણ વર્ષમાં દર વખતે ઓક્ટોબર–માર્ચનો અર્ધવર્ષ એપ્રિલ–સપ્ટેમ્બર કરતાં ઊંચો રહ્યો છે, જોકે હુકમમાં તેનું કોઈ કારણ આપ્યું નથી.',
  },
  {
    q: 'એડિશનલ સરચાર્જ અને ક્રોસ-સબસિડી સરચાર્જ વચ્ચે શું ફરક છે?',
    a: 'બંનેનો કાયદાકીય આધાર અને હેતુ અલગ છે. ક્રોસ-સબસિડી સરચાર્જ, કલમ 42(2) હેઠળ, ડિસ્કોમને એ ક્રોસ-સબસિડીની ભરપાઈ કરે છે જે ચૂકવણી કરતો ગ્રાહક છોડી જતાં ખોવાય છે. એડિશનલ સરચાર્જ, કલમ 42(4) હેઠળ, સપ્લાય આપવાની ચાલુ જવાબદારીથી ઊભી થયેલી સ્ટ્રેન્ડેડ ફિક્સ્ડ કિંમત આવરે છે. એક ઓપન એક્સેસ ગ્રાહક પર બંને લાગી શકે, સાથે ટ્રાન્સમિશન, વ્હીલિંગ અને સ્ટેન્ડબાય ચાર્જ પણ.',
  },
  {
    q: 'ઓપન એક્સેસ માટે કોણ પાત્ર છે?',
    a: 'વિદ્યુત અધિનિયમમાં આ મર્યાદા 1 MW કરારબદ્ધ માંગ અથવા મંજૂર લોડ છે. ગ્રીન એનર્જી ઓપન એક્સેસ માટે, ઇલેક્ટ્રિસિટી (પ્રોમોટિંગ રિન્યુએબલ એનર્જી થ્રૂ ગ્રીન એનર્જી ઓપન એક્સેસ) રૂલ્સ, 2022 એ તેને 100 kW સુધી ઘટાડી, અને કેપ્ટિવ ગ્રાહકો માટે કોઈ ન્યૂનતમ મર્યાદા રાખી નથી.',
  },
  {
    q: 'કોઈને એડિશનલ સરચાર્જમાંથી મુક્તિ છે?',
    a: 'રાષ્ટ્રીય ગ્રીન એનર્જી ઓપન એક્સેસ રૂલ્સ, 2022 હેઠળ, વેસ્ટ-ટુ-એનર્જી પ્લાન્ટની વીજળી, ગ્રીન હાઇડ્રોજન અને ગ્રીન એમોનિયાનું ઉત્પાદન, અને પહેલેથી ફિક્સ્ડ ચાર્જ ચૂકવતા ગ્રાહકો — આ પર એડિશનલ સરચાર્જ લાગુ પડતો નથી, જોકે રૂલ્સમાં "ફિક્સ્ડ ચાર્જ" ની વ્યાખ્યા નથી. આ કેન્દ્રીય નિયમો છે; આ GERC હુકમમાં પોતાની કોઈ મુક્તિ નોંધાયેલી નથી, અને ગુજરાતમાં GERC તેમને કેવી રીતે લાગુ કરે છે તે અમે ચકાસ્યું નથી. મુક્તિ માની લેવાને બદલે તમારી સ્થિતિ તમારી ડિસ્કોમ કે સલાહકાર સાથે પુષ્ટ કરો.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const h2Cls = 'font-display mb-3 text-2xl font-bold text-ink-navy'
const pCls = 'text-ash/80'
const takeawayCls = 'mt-3 font-semibold text-ink-navy'

function CostBand() {
  const net = 162
  const recovered = 53
  const total = net + recovered
  const seg = [
    { label: 'ઓપન એક્સેસ ગ્રાહકો પાસેથી વસૂલપાત્ર', value: net, cls: 'bg-hub-news' },
    { label: 'ડિમાન્ડ ચાર્જ દ્વારા પહેલેથી વસૂલાયેલ', value: recovered, cls: 'bg-hub-news/40' },
  ]
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">
        ઓપન એક્સેસ સાથે જોડાયેલી ₹215 કરોડ સ્ટ્રેન્ડેડ ફિક્સ્ડ કિંમતનું વિભાજન
      </p>
      <div
        className="mt-2 flex h-14 w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-hairline"
        role="group"
        aria-label="₹215 કરોડ સ્ટ્રેન્ડેડ ફિક્સ્ડ કિંમતનું વિભાજન"
      >
        {seg.map((s) => (
          <div
            key={s.label}
            style={{ width: `${(s.value / total) * 100}%` }}
            className={`flex flex-col items-center justify-center px-1 text-center ${s.cls}`}
          >
            <span className="font-display text-sm font-bold tabular-nums text-white">
              ₹{s.value} cr
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ash/60">
        {seg.map((s) => (
          <span key={s.label}>
            <span className="font-semibold text-ink-navy">{s.label}:</span> ₹{s.value} cr
          </span>
        ))}
      </div>
    </div>
  )
}

export default function GercAdditionalSurchargePageGu() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'ન્યૂઝ', href: '/gu/news' },
          { label: 'ગુજરાત ઓપન એક્સેસ સરચાર્જ', href: `/gu${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> ગુજરાત · GERC · ઓપન એક્સેસ
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚡', big: '₹0.99/kWh', small: 'એડિશનલ સરચાર્જ', tone: 'caution-amber' },
          { icon: '📅', big: '1 ઓક્ટો – 31 માર્ચ', small: 'લાગુ ગાળો', tone: 'hub' },
          { icon: '🏭', big: 'ફક્ત C&I', small: 'ઘરેલું પર અસર નહીં', tone: 'hub' },
          { icon: '📈', big: '₹0.76 થી', small: 'ગયા અર્ધવર્ષે', tone: 'hub' },
        ]}
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-ash/50">
          લેખક:{' '}
          <Link href="/author/editorial-team" className="text-brass hover:underline">
            DesiMetrics Editorial Team
          </Link>{' '}
          · અપડેટ {LAST_UPDATED}
        </p>

        <p className={`mt-6 text-lg ${pCls}`}>
          <strong>જો તમે ઘરેલું ગ્રાહક હો, તો તમારા પર આની કોઈ અસર નથી.</strong> ગુજરાત
          ઇલેક્ટ્રિસિટી રેગ્યુલેટરી કમિશને <strong>ઓપન એક્સેસ</strong> ગ્રાહકો માટે{' '}
          <strong>એડિશનલ સરચાર્જ</strong> <strong>₹0.99 પ્રતિ kWh</strong> નક્કી કર્યો છે, જે{' '}
          <strong>1 ઓક્ટોબર 2026 થી 31 માર્ચ 2027</strong> સુધી લાગુ રહેશે. તે ફક્ત DGVCL,
          MGVCL, PGVCL અને UGVCL ના એ કોમર્શિયલ અને ઇન્ડસ્ટ્રિયલ ગ્રાહકો પર લાગે છે જે પોતાની
          વિતરણ કંપની સિવાયના સ્રોતમાંથી વીજળી ખરીદે છે. આ હુકમથી ઘરેલું ટેરિફ પર કોઈ અસર
          પડતી નથી.
        </p>

        <section aria-labelledby="in-brief" className="mt-10 scroll-mt-20">
          <h2 id="in-brief" className={h2Cls}>
            નિર્ણય ટૂંકમાં
          </h2>
          <p className={pCls}>
            {ORDER_DATE} ના{' '}
            <a
              href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3NjVfMTEtMDktMjAyNl8zMTgwNzg5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              હુકમ ક્રમાંક 05 of 2026
            </a>{' '}
            માં, અધ્યક્ષ પંકજ જોશી તથા સભ્યો હિરેન શાહ અને જતિન એન. ઠક્કરની GERC બેન્ચે 1
            ઓક્ટોબર 2026 થી શરૂ થતા છ મહિના માટે એડિશનલ સરચાર્જ ₹0.99/kWh નક્કી કર્યો. આ
            સરચાર્જ દર છ મહિને એ પદ્ધતિ હેઠળ ફરી નક્કી થાય છે જે GERC એ 30 ઓગસ્ટ 2022 ના
            હુકમમાં સુધારી હતી: GUVNL દરેક અર્ધવર્ષ પૂરું થયાના 90 દિવસમાં SLDC અને ચાર્ટર્ડ
            એકાઉન્ટન્ટ દ્વારા પ્રમાણિત ડેટા રજૂ કરે છે, અને એ જ ડેટા આવતા વર્ષના એ જ અર્ધવર્ષનો
            દર નક્કી કરે છે. આ વખતે 1 ઓક્ટોબર 2025 થી 31 માર્ચ 2026 નો ડેટા વપરાયો.
          </p>
          <p className={takeawayCls}>
            સાર: આ કોઈ નવો ચાર્જ નથી, પણ નિયમિત છ-માસિક પુનઃનિર્ધારણ છે — બદલાય છે ફક્ત દર,
            અને તે નક્કી સમયપત્રક પર બદલાય છે જેનું આયોજન કરી શકાય.
          </p>
        </section>

        <section aria-labelledby="who-pays" className="mt-10 scroll-mt-20">
          <h2 id="who-pays" className={h2Cls}>
            કોણ ચૂકવે છે — અને કોણ નહીં
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              [
                'ચૂકવે છે: ચારેય રાજ્ય ડિસ્કોમના ઓપન એક્સેસ ગ્રાહકો',
                'DGVCL, MGVCL, PGVCL કે UGVCL ના એ કોમર્શિયલ અને ઇન્ડસ્ટ્રિયલ ગ્રાહકો જે જણાવેલા છ મહિનાના ગાળામાં પોતાની ડિસ્કોમ સિવાય બીજેથી ઓપન એક્સેસ મારફત વીજળી લે છે.',
              ],
              [
                'ચૂકવતા નથી: દરેક ઘરેલું ગ્રાહક',
                'ઘરેલું જોડાણને વીજળી તેની પોતાની ડિસ્કોમ આપે છે, ઓપન એક્સેસથી નહીં, તેથી એડિશનલ સરચાર્જ ઘરના બિલમાં કદી આવતો નથી. આ હુકમથી ઘરેલું સ્લેબ, ફિક્સ્ડ ચાર્જ કે ઇલેક્ટ્રિસિટી ડ્યૂટીમાં કોઈ ફેરફાર થતો નથી.',
              ],
              [
                'ચૂકવતા નથી: ડિસ્કોમ સપ્લાય પરના સામાન્ય C&I ગ્રાહકો',
                'જે વ્યવસાય સીધો પોતાની ડિસ્કોમ પાસેથી વીજળી ખરીદે છે તે ઓપન એક્સેસ ગ્રાહક નથી અને આ હુકમના દાયરાની બહાર છે.',
              ],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-hub-news" aria-hidden>
                  ✓
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className={takeawayCls}>
            સાર: આ ચાર્જ ડિસ્કોમ બહારથી વીજળી ખરીદવાના નિર્ણય સાથે આવે છે — તે સામાન્ય ટેરિફ
            ફેરફાર નથી.
          </p>
        </section>

        <section aria-labelledby="stranded" className="mt-10 scroll-mt-20">
          <h2 id="stranded" className={h2Cls}>
            &ldquo;સ્ટ્રેન્ડેડ કેપેસિટી&rdquo; નો ખરો અર્થ
          </h2>
          <p className={pCls}>
            વિતરણ કંપની જનરેશન ક્ષમતા માટે વર્ષો પહેલાં લાંબા ગાળાના કરાર કરે છે, એ માંગ
            પ્રમાણે જે તેણે પૂરી કરવાની છે. તે એ ક્ષમતા પર ફિક્સ્ડ ચાર્જ ચૂકવે છે, વીજળી લેવાય
            કે ન લેવાય. જ્યારે કોઈ મોટો ગ્રાહક ઓપન એક્સેસ પર જાય, ત્યારે ડિસ્કોમનું વેચાણ જાય
            છે પણ જવાબદારી રહે છે: તે કરારબદ્ધ ક્ષમતાની ચૂકવણી કરતી રહે છે, અને એ ગ્રાહક પાછો
            આવે તો સપ્લાય આપવા તૈયાર પણ રહેવું પડે છે.
          </p>
          <p className={`mt-3 ${pCls}`}>
            જે ક્ષમતા કરારબદ્ધ છે અને જેની ચૂકવણી થઈ રહી છે પણ જે શેડ્યૂલ થઈ નથી, તેને{' '}
            <strong>સ્ટ્રેન્ડેડ</strong> કહેવાય છે. એડિશનલ સરચાર્જ, વિદ્યુત અધિનિયમ, 2003 ની
            કલમ 42(4) હેઠળ, એ સ્ટ્રેન્ડેડ ફિક્સ્ડ કિંમતના ઓપન-એક્સેસ સાથે જોડાયેલા ભાગની
            વસૂલાતની રીત છે, જેથી એ બોજ ડિસ્કોમ સાથે રહેલા ગ્રાહકો પર ન પડે.
          </p>
          <p className={takeawayCls}>
            સાર: આ ચાર્જ એ ફિક્સ્ડ કિંમતો વિશે છે જે ગ્રાહક જતો રહે તો પણ ખતમ થતી નથી — ઓપન
            એક્સેસ પસંદ કરવાનો દંડ નહીં.
          </p>
        </section>

        <section aria-labelledby="calculation" className="mt-10 scroll-mt-20">
          <h2 id="calculation" className={h2Cls}>
            GERC ₹0.99 સુધી કેવી રીતે પહોંચ્યું
          </h2>
          <p className={pCls}>
            હુકમના એક પરિશિષ્ટમાં આખી શ્રૃંખલા આપેલી છે. GUVNL ના 1 ઓક્ટોબર 2025 થી 31 માર્ચ
            2026 ના પ્રમાણિત ડેટા આધારે:
          </p>
          <ol className="mt-3 space-y-3">
            {[
              [
                'ઉપલબ્ધ ઊર્જાથી શરૂઆત',
                'છ મહિનામાં 96,129 MU ઉપલબ્ધ હતી, જેમાંથી 63,110 MU સામાન્ય ગ્રાહકોની જરૂરિયાત પૂરી કરવા શેડ્યૂલ થઈ.',
              ],
              [
                'નેટવર્ક નુકસાન ઘટાડો',
                '12.06% T&D નુકસાન લગાવતાં 55,497 MU એ ગ્રાહકો સુધી પહોંચી. GERC એ 12.06% લીધું — FY 2025-26 માટે મંજૂર ધોરણ નુકસાન — કારણ કે તે FY 2024-25 ના 12.77% ટ્રૂ-અપ આંકડા કરતાં ઓછું છે.',
              ],
              [
                'સ્ટ્રેન્ડેડ જનરેશન કાઢો',
                'ઉપલબ્ધ ઊર્જામાંથી શેડ્યૂલ થયેલી ઊર્જા ઘટાડતાં 33,018 MU સ્ટ્રેન્ડેડ જનરેશન બાકી રહે છે.',
              ],
              [
                'સ્ટ્રેન્ડેડ ક્ષમતાની કિંમત મૂકો',
                'GUVNL એ લાંબા ગાળાની કરારબદ્ધ ક્ષમતા પર ₹8,193 કરોડ ફિક્સ્ડ કિંમત ચૂકવી; તેમાંથી સ્ટ્રેન્ડેડ ક્ષમતા સાથે જોડાયેલો ભાગ ₹2,814 કરોડ છે.',
              ],
              [
                'ઓપન એક્સેસનો હિસ્સો કાઢો',
                'ડિસ્કોમ પરિઘ પર ઓપન એક્સેસ ગ્રાહકો માટે 1,630 MU શેડ્યૂલ થઈ, જેને સીધી જોડાયેલી ગણાઈ. બાકીનું પ્રમાણસર વહેંચતાં 895 MU વધુ જોડાય છે, એટલે કુલ 2,525 MU ઓપન એક્સેસ સાથે જોડાયેલી.',
              ],
              [
                'રૂપિયામાં રૂપાંતર',
                'ઉપલબ્ધ ઊર્જાની પ્રતિ યુનિટ ₹0.85 ના હિસાબે, ઓપન એક્સેસ સાથે જોડાયેલી સ્ટ્રેન્ડેડ ફિક્સ્ડ કિંમત ₹215 કરોડ થાય છે.',
              ],
              [
                'પહેલેથી વસૂલાયેલું ઘટાડો',
                'ડિમાન્ડ ચાર્જ દ્વારા ઓપન એક્સેસ ગ્રાહકો પાસેથી પહેલેથી ₹606 કરોડ વસૂલાયા હતા; તેનો નેટવર્ક-સંબંધિત ભાગ, 8.77%, ₹53 કરોડ થાય છે અને ઘટાડાય છે — બાકી ₹162 કરોડ વસૂલપાત્ર.',
              ],
              [
                'ભાગીને દર કાઢો',
                '₹162 કરોડને 1,630 MU થી ભાગતાં ₹0.99 પ્રતિ kWh આવે છે. ભાજક પર ધ્યાન આપો: GERC ઓપન એક્સેસ સાથે સીધી જોડાયેલી 1,630 MU થી ભાગે છે, વ્યાપક 2,525 MU થી નહીં — તેનાથી ભાગતાં આશરે ₹0.64 આવતું.',
              ],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hub-news font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className={pCls}>
                  <strong className="text-ink-navy">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ol>

          <CostBand />

          <p className={takeawayCls}>
            સાર: દરેક પગલું હુકમના પરિશિષ્ટમાં પ્રકાશિત છે, તેથી કોઈ પણ વ્યવસાય દર માની લેવાને
            બદલે જાતે મેળ કરી શકે છે.
          </p>
        </section>

        <section aria-labelledby="trend" className="mt-10 scroll-mt-20">
          <h2 id="trend" className={h2Cls}>
            પહેલાંના ગાળા સાથે સરખામણી
          </h2>
          <p className={pCls}>
            દર છ મહિને બદલાતી ડેટા વિન્ડોથી દર નક્કી થાય છે, તેથી તેમાં નોંધપાત્ર ઉતાર-ચઢાવ
            રહ્યો છે. નીચેના બધા આંકડા GERC ના પોતાના હુકમોમાંથી છે:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">ગાળો</th>
                  <th className="px-4 py-2 font-semibold">GERC હુકમ</th>
                  <th className="px-4 py-2 text-right font-semibold">એડિશનલ સરચાર્જ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ['1 ઓક્ટો 2024 – 31 માર્ચ 2025', '07/2024', '₹0.93'],
                  ['1 એપ્રિલ 2025 – 30 સપ્ટે 2025', '01/2025', '₹0.82'],
                  ['1 ઓક્ટો 2025 – 31 માર્ચ 2026', '04/2025', '₹1.00'],
                  ['1 એપ્રિલ 2026 – 30 સપ્ટે 2026', '02 of 2026', '₹0.76'],
                  ['1 ઓક્ટો 2026 – 31 માર્ચ 2027', '05 of 2026', '₹0.99'],
                ].map(([p, o, r], i, arr) => (
                  <tr key={p} className={i === arr.length - 1 ? 'bg-brass/5' : undefined}>
                    <td className="px-4 py-2">{p}</td>
                    <td className="px-4 py-2 text-ash/70">{o}</td>
                    <td className="px-4 py-2 text-right font-display font-bold tabular-nums text-ink-navy">
                      {r}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            છેલ્લા ત્રણ વર્ષમાં દર વખતે ઓક્ટોબર–માર્ચના અર્ધવર્ષમાં સરચાર્જ એપ્રિલ–સપ્ટેમ્બર
            કરતાં ઊંચો રહ્યો છે. હુકમોમાં તેનું કોઈ કારણ આપ્યું નથી, તેથી તેને નિયમ માનવાને
            બદલે એક જોવાયેલી ભાત ગણો જેનું આયોજન કરી શકાય.
          </p>
          <p className={takeawayCls}>
            સાર: ઓપન એક્સેસનું અર્થશાસ્ત્ર આંકતા વ્યવસાયે સ્થિર આંકડાને બદલે દર છ મહિને બદલાતા
            દરનું બજેટ બનાવવું જોઈએ.
          </p>
        </section>

        <section aria-labelledby="charge-types" className="mt-10 scroll-mt-20">
          <h2 id="charge-types" className={h2Cls}>
            એડિશનલ સરચાર્જ વિરુદ્ધ ક્રોસ-સબસિડી સરચાર્જ વિરુદ્ધ અન્ય ચાર્જ
          </h2>
          <p className={pCls}>
            આ અવારનવાર એકબીજા સાથે ભેળવી દેવાય છે, જ્યારે તે અલગ કાયદાકીય આધાર ધરાવતા અલગ
            ચાર્જ છે:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold">ચાર્જ</th>
                  <th className="px-4 py-2 font-semibold">આધાર</th>
                  <th className="px-4 py-2 font-semibold">શાની ભરપાઈ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">એડિશનલ સરચાર્જ</td>
                  <td className="px-4 py-2 text-ash/70">કલમ 42(4)</td>
                  <td className="px-4 py-2">સપ્લાયની ચાલુ જવાબદારીથી ઊભી ડિસ્કોમની સ્ટ્રેન્ડેડ ફિક્સ્ડ કિંમત</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">ક્રોસ-સબસિડી સરચાર્જ (CSS)</td>
                  <td className="px-4 py-2 text-ash/70">કલમ 42(2)</td>
                  <td className="px-4 py-2">સબસિડી આપતો ગ્રાહક જતો રહે ત્યારે ડિસ્કોમને થતું ક્રોસ-સબસિડી નુકસાન</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">ટ્રાન્સમિશન અને વ્હીલિંગ ચાર્જ</td>
                  <td className="px-4 py-2 text-ash/70">ઓપન એક્સેસ નિયમો</td>
                  <td className="px-4 py-2">વીજળી પહોંચાડવા ટ્રાન્સમિશન અને વિતરણ નેટવર્કનો વપરાશ</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">સ્ટેન્ડબાય ચાર્જ</td>
                  <td className="px-4 py-2 text-ash/70">ઓપન એક્સેસ નિયમો</td>
                  <td className="px-4 py-2">બેકઅપ તરીકે ડિસ્કોમ સપ્લાય ઉપલબ્ધ રાખવી</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`mt-3 ${pCls}`}>
            પાત્રતા પણ અલગ છે. વિદ્યુત અધિનિયમ ઓપન એક્સેસ માટે 1 MW કરારબદ્ધ માંગ અથવા મંજૂર
            લોડ નક્કી કરે છે; ઇલેક્ટ્રિસિટી (પ્રોમોટિંગ રિન્યુએબલ એનર્જી થ્રૂ ગ્રીન એનર્જી ઓપન
            એક્સેસ) રૂલ્સ, 2022 એ ગ્રીન એનર્જી ઓપન એક્સેસ માટે તેને 100 kW કરી, અને કેપ્ટિવ
            ગ્રાહકો માટે કોઈ ન્યૂનતમ રાખી નથી. એ જ રૂલ્સ એમ પણ કહે છે કે વેસ્ટ-ટુ-એનર્જી,
            ગ્રીન હાઇડ્રોજન અને ગ્રીન એમોનિયાનું ઉત્પાદન, અને પહેલેથી ફિક્સ્ડ ચાર્જ ચૂકવતા
            ગ્રાહકો પર એડિશનલ સરચાર્જ લાગુ પડતો નથી — જોકે રૂલ્સમાં &ldquo;ફિક્સ્ડ
            ચાર્જ&rdquo; ની વ્યાખ્યા નથી. આ કેન્દ્રીય નિયમો છે; આ GERC હુકમમાં પોતાની કોઈ
            મુક્તિ નોંધાયેલી નથી, અને ગુજરાતમાં GERC તેમને કેવી રીતે લાગુ કરે છે તે અમે ચકાસ્યું
            નથી.
          </p>
          <p className={takeawayCls}>
            સાર: ₹0.99/kWh અનેક ચાર્જમાંનો એક છે — ફક્ત આ આંકડાની નહીં, કુલ ડિલિવર્ડ કિંમતની
            સરખામણી કરો.
          </p>
        </section>

        <section aria-labelledby="what-it-means" className="mt-10 scroll-mt-20">
          <h2 id="what-it-means" className={h2Cls}>
            ઓપન એક્સેસ વિચારી રહ્યા હો તો તેનો શું અર્થ
          </h2>
          <p className={pCls}>
            વ્યવહારુ અસર એ છે કે છ મહિના માટે ઓપન એક્સેસ વીજળીની ડિલિવર્ડ કિંમતમાં એક નક્કી,
            તારીખબદ્ધ વધારો જોડાય છે. એક ઉદાહરણ, કોઈ વાસ્તવિક ગ્રાહકનું નહીં પણ ગોળ આંકડા પર:
          </p>
          <div className="mt-4 rounded-xl border border-l-4 border-hairline border-l-brass bg-paper p-5">
            <p className="text-xs font-semibold tracking-wide text-ash/50 uppercase">
              ફક્ત ઉદાહરણ
            </p>
            <p className={`mt-2 ${pCls}`}>
              ઓપન એક્સેસ મારફત <strong>મહિને 1,00,000 યુનિટ</strong> લેતો પ્લાન્ટ ₹0.99/kWh
              પર <strong>દર મહિને ₹99,000</strong> વધારાના ચૂકવશે — એટલે 1 ઓક્ટોબર 2026 થી 31
              માર્ચ 2027 ના આખા ગાળામાં આશરે <strong>₹5.94 લાખ</strong>.
            </p>
            <p className="mt-2 text-xs text-ash/50">
              આ અધિસૂચિત દર પર કરેલી ગણતરી છે, કોઈ ક્વોટેશન નહીં. તમારી ખરી સ્થિતિ તમારી
              કરારબદ્ધ માંગ, ઉપર જણાવેલા અન્ય ઓપન એક્સેસ ચાર્જ અને તમારી ટેરિફ શ્રેણી પર
              આધાર રાખશે.
            </p>
          </div>
          <p className={`mt-4 ${pCls}`}>
            દર 1 એપ્રિલ 2027 ના નવી ડેટા વિન્ડોથી ફરી નક્કી થશે, તેથી આજે લેવાતો ખરીદી
            નિર્ણય એક આંકડાને બદલે એક પટ્ટા સામે તપાસવો જોઈએ — છેલ્લી પાંચ ગણતરીઓ ₹0.76 થી
            ₹1.00 વચ્ચે રહી છે.
          </p>
          <p className={takeawayCls}>
            સાર: પ્રામાણિક સરખામણી આ છે — બધા સરચાર્જ સહિત ઓપન એક્સેસની ડિલિવર્ડ કિંમત વિરુદ્ધ
            એ જ ગાળાનો તમારો ડિસ્કોમ ટેરિફ.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            જોડાયેલા ટૂલ અને ગાઇડ
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/electricity/gujarat-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                ગુજરાત વીજ બિલ કેલ્ક્યુલેટર
              </p>
              <p className="mt-1 text-xs text-ash/60">
                ખરા પ્રકાશિત ટેરિફ પર ગુજરાતનું બિલ અંદાજો.
              </p>
            </Link>
            <Link
              href="/solar/bill-calculator/mgvcl"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ☀️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                ગુજરાત સોલર બિલ કેલ્ક્યુલેટર
              </p>
              <p className="mt-1 text-xs text-ash/60">
                ગુજરાતના પોતાના ટેરિફ પર રૂફટોપ સોલર પેબેક.
              </p>
            </Link>
            <Link
              href="/gu/news/gerc-liquidated-damages-wind-solar-gujarat"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                ⚖️
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                GERC વિન્ડ અને સોલર LD વિવાદ
              </p>
              <p className="mt-1 text-xs text-ash/60">
                GUVNL અને રિન્યુએબલ ડેવલપર્સ સાથે જોડાયેલો બીજો સક્રિય GERC કેસ.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">સોલર ROI કેલ્ક્યુલેટર</p>
              <p className="mt-1 text-xs text-ash/60">
                વિકલ્પો તોલી રહ્યા હો તો તમારી ડિસ્કોમના ટેરિફ પર પેબેક જુઓ.
              </p>
            </Link>
          </div>
        </section>

        <section aria-labelledby="faq" className="mt-10 scroll-mt-20">
          <h2 id="faq" className={h2Cls}>
            વારંવાર પુછાતા પ્રશ્નો
          </h2>
          <div className="divide-y divide-hairline">
            {faqs.map((f, i) => (
              <details key={i} className="group py-3">
                <summary className="cursor-pointer list-none font-medium text-ash marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-ash/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-10 text-sm text-ash/40">
          છેલ્લે અપડેટ: {LAST_UPDATED}. આંકડા GERC ના પોતાના{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3NjVfMTEtMDktMjAyNl8zMTgwNzg5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            હુકમ ક્રમાંક 05 of 2026
          </a>{' '}
          ({ORDER_DATE}) અને તેના પરિશિષ્ટ A માંથી લીધા છે, તથા પહેલાંના દર એ-એ ગાળાના GERC
          હુકમોમાંથી; અમે આખી ગણતરી ફરી કરી અને તે રાઉન્ડિંગની અંદર મેળ ખાય છે. તેની જાણ{' '}
          <a
            href="https://energetica-india.net/news/gujarat-sets-additional-surcharge-at-inr-0-99-per-kwh-for-open-access-consumers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            Energetica India
          </a>{' '}
          એ પણ કરી હતી. નોંધો કે હુકમ {ORDER_DATE} નો છે; ટ્રેડ કવરેજમાં દેખાતી પછીની તારીખો
          પ્રકાશન તારીખો છે. ગુજરાતનો હાલનો ક્રોસ-સબસિડી સરચાર્જ દરેક ડિસ્કોમના વાર્ષિક ટેરિફ
          હુકમની અંદર નક્કી થાય છે, અલગ પ્રકાશિત આંકડા તરીકે નહીં, તેથી અહીં કોઈ CSS આંકડો
          આપ્યો નથી. આ સંદર્ભ માટેની સામાન્ય માહિતી છે, ટેરિફ કે કાયદાકીય સલાહ નહીં — તમારા
          ચાર્જ તમારી ડિસ્કોમ પાસે પુષ્ટ કરો. અમે આંકડા કેવી રીતે એકત્ર અને ચકાસીએ છીએ તે માટે
          અમારી{' '}
          <Link href="/methodology" className="text-brass underline">
            મેથડોલોજી
          </Link>{' '}
          જુઓ.
        </p>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
    </>
  )
}
