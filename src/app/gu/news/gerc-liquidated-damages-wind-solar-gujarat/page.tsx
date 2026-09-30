import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { breadcrumbLd } from '@/lib/seo'
import { getAlternateLanguages } from '@/lib/i18n-alternates'

const SITE = 'https://desimetrics.com'
const PATH = '/news/gerc-liquidated-damages-wind-solar-gujarat'
const TITLE = 'મોડા બનેલા સોલર અને વિન્ડ પ્રોજેક્ટ કોર્ટ સુધી કેમ પહોંચે છે — અને ગુજરાતના વીજ બિલ માટે તેનો શું અર્થ છે'
const DESCRIPTION =
  'GERC એ બે રિન્યુએબલ ડેવલપર્સને GUVNL સાથેના કમિશનિંગ વિલંબ અને લિક્વિડેટેડ ડેમેજિસ પરના વિવાદમાં સુધારો કરવાની મંજૂરી આપી — એક 140 MW વિન્ડ પ્રોજેક્ટ અને એક 200 MW સોલર પ્રોજેક્ટ. બંને વિવાદ હજુ નક્કી થયા નથી. અહીં ખરેખર શું આદેશ અપાયો, અને પ્રોજેક્ટના વિલંબનો તમારા બિલ સાથે શું સંબંધ છે.'
const LAST_UPDATED = '30 સપ્ટેમ્બર 2026'
const DATA_AS_OF = '30 સપ્ટેમ્બર 2026'

export const metadata: Metadata = {
  title: 'GERC વિન્ડ અને સોલર લિક્વિડેટેડ ડેમેજિસ વિવાદ — સમજાવ્યું',
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
  datePublished: '2026-09-30',
  dateModified: '2026-09-30',
  mainEntityOfPage: `${SITE}/gu${PATH}`,
}

const faqs = [
  {
    q: 'શું GERC એ ચુકાદો આપ્યો છે કે GUVNL એ વસૂલેલી લિક્વિડેટેડ ડેમેજિસ પાછી આપવી પડશે?',
    a: 'ના. GERC એ ફક્ત બંને ડેવલપર્સને પહેલેથી પેન્ડિંગ પિટિશનમાં પોતાના રિફંડ ક્લેમ ઔપચારિક રીતે ઉમેરવાની મંજૂરી આપી છે — આ એક પ્રોસિજરલ પગલું છે, નિર્ણય નહીં. GERC ના પોતાના આદેશમાં કહેવાયું છે કે આ સુધારો "પોતે જ, કોઈપણ પક્ષના દાવાઓના ગુણદોષ પર ચુકાદો બનતો નથી." બંને મુખ્ય વિવાદ GUVNL નો જવાબ (8 ઓક્ટોબર 2026 સુધી દેય) અને દરેક ડેવલપરનું રિજોઈન્ડર (22 ઓક્ટોબર 2026 સુધી દેય) ફાઇલ થયા પછી સાંભળવામાં આવશે.',
  },
  {
    q: 'સોલર કે વિન્ડ પાવર પરચેઝ એગ્રીમેન્ટમાં લિક્વિડેટેડ ડેમેજિસ (LD) શું છે?',
    a: 'એક પહેલેથી નક્કી કરેલો દંડ જે ડેવલપરે પોતાના PPA માં શેડ્યુલ્ડ કમર્શિયલ ઓપરેશન ડેટ (SCOD) ચૂકવા બદલ ચૂકવવો પડે છે, જે કોન્ટ્રાક્ટના પોતાના ફોર્મ્યુલાથી નક્કી થાય છે. DISCOM સામાન્ય રીતે આ રકમ ડેવલપરના માસિક પાવર-સપ્લાય ઇનવોઇસમાંથી કાપીને, અથવા PPA સાઇન કરતી વખતે ડેવલપરે આપેલી પરફોર્મન્સ બેંક ગેરંટી સામે વસૂલે છે — અહીં બંને કેસમાં GUVNL એ બરાબર આ જ કર્યું.',
  },
  {
    q: 'SCOD અને COD વચ્ચે શું ફરક છે?',
    a: 'SCOD (શેડ્યુલ્ડ કમર્શિયલ ઓપરેશન ડેટ) એ ડેડલાઇન છે જે PPA કોઈ પ્રોજેક્ટ ચાલુ થવા માટે નક્કી કરે છે. COD (કમર્શિયલ ઓપરેશન ડેટ) એ તારીખ છે જ્યારે તે ખરેખર ચાલુ થાય છે. જ્યારે COD, SCOD પછી આવે છે, ત્યારે બંને વચ્ચેનો ગેપ એ જ છે જેના પર લિક્વિડેટેડ ડેમેજિસની ગણતરી થાય છે — સિવાય કે તે ગેપના અમુક કે આખા ભાગને માફ કરતો ફોર્સ મેજ્યોર દાવો સ્વીકારાય.',
  },
  {
    q: 'ભારતમાં રિન્યુએબલ એનર્જી પ્રોજેક્ટ માટે ફોર્સ મેજ્યોર શું ગણાય છે?',
    a: 'ડેવલપરના વ્યાજબી નિયંત્રણની ખરેખર બહારની ઘટનાઓ જે સમયસર કમિશનિંગ અટકાવે છે — અહીં વિન્ડ ડેવલપરે ગ્રિડ કનેક્ટિવિટી મંજૂરીમાં વિલંબ, ભારે વરસાદ, પૂર, ચક્રવાતી હવામાન અને એક ખાણ પર હડતાળનો ઉલ્લેખ કર્યો. કોઈ ખાસ ઘટના ખરેખર લાયક છે કે નહીં, અને તે SCOD નો કેટલો સમય માફ કરવા લાયક ઠરે છે, એ એક તથ્યાત્મક અને કોન્ટ્રાક્ચ્યુઅલ સવાલ છે જે GERC એ દરેક કેસમાં અલગથી નક્કી કરવો પડે છે — આ આપોઆપ નથી થતું, અને અહીં કોઈપણ કેસમાં આ સવાલ હજુ નક્કી થયો નથી.',
  },
  {
    q: 'શું આ બંને વિવાદ હમણાં મારા વીજ બિલ પર અસર કરે છે?',
    a: 'સીધું અને હમણાં નહીં. કોઈ પણ કેસ હજુ નક્કી થયો નથી. અલગથી, GUVNL ની વીજ-ખરીદી ખર્ચ — જેમાં મોડા પડેલા પ્રોજેક્ટથી સપ્લાયની ઘટ સંભાળવાનો ખર્ચ પણ સામેલ છે — સમય જતાં FPPPA (ફ્યુલ એન્ડ પાવર પરચેઝ પ્રાઇસ એડજસ્ટમેન્ટ) નામની વ્યવસ્થા દ્વારા ગ્રાહકોના બિલ સુધી પહોંચે છે, જે GERC-મંજૂર ત્રિમાસિક એડજસ્ટમેન્ટ છે. એવું દેખાડવામાં આવ્યું નથી કે આ બંને ખાસ વિવાદ એ આંકડાને કોઈપણ દિશામાં ખસેડે છે — આને આ વ્યવસ્થા કેવી રીતે કામ કરે છે તેની પૃષ્ઠભૂમિ ગણો, તમારા બિલ વિશેનો દાવો નહીં.',
  },
  {
    q: 'દરેક કેસમાં GUVNL એ કેટલી લિક્વિડેટેડ ડેમેજિસ વસૂલી?',
    a: 'Project Twelve Renewables ની પોતાની GERC પિટિશન મુજબ, GUVNL એ 140 MW વિન્ડ પ્રોજેક્ટના ઇનવોઇસમાંથી ₹14,40,26,667 (આશરે ₹14.40 કરોડ) વસૂલ્યા. Martial Solren ની પિટિશન મુજબ, GUVNL એ 200 MW સોલર પ્રોજેક્ટમાંથી ₹9,17,77,778 (આશરે ₹9.18 કરોડ) વસૂલ્યા. બંને ડેવલપર્સ કહે છે કે તેમણે વિરોધ હેઠળ, પોતાના અધિકારને નુકસાન પહોંચાડ્યા વિના ચૂકવણી કરી.',
  },
  {
    q: 'GERC એ ડેવલપર્સને નવી પિટિશન ફાઇલ કરવાને બદલે પિટિશનમાં સુધારો કરવાની મંજૂરી કેમ આપી?',
    a: 'બંને આદેશોમાં GERC નો તર્ક એકસમાન હતો: લિક્વિડેટેડ-ડેમેજિસની વસૂલાત મૂળ પિટિશન ફાઇલ થયા પછી થઈ, પણ તે એ જ મૂળ સવાલ સાથે સીધી જોડાયેલી છે જે પહેલેથી કમિશન સામે છે — શું વિલંબ ફોર્સ મેજ્યોરના દાયરામાં આવે છે. આને એક જ વિવાદ તરીકે સાંભળવું, GERC એ કહ્યું, ડેવલપર્સને ખરેખર એ જ અંતર્ગત વિવાદ પર અલગ મુકદ્દમામાં ધકેલવાનું ટાળે છે, અને GUVNL ને કોઈ નુકસાન થતું નથી કારણ કે તેને સુધારેલા દાવાઓનો જવાબ આપવાની પૂરી તક હજુ પણ મળે છે.',
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

function Timeline({
  label,
  steps,
}: {
  label: string
  steps: { date: string; title: string; note?: string; delay?: string }[]
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-wide text-ash/60 uppercase">{label}</p>
      <ol className="relative mt-3 space-y-5 border-l-2 border-hairline pl-6">
        {steps.map((s) => (
          <li key={s.title} className="relative">
            <span className="absolute top-1 -left-[29px] h-3 w-3 rounded-full border-2 border-hub-news bg-paper" />
            <p className="text-xs font-semibold tabular-nums text-ash/50">{s.date}</p>
            <p className="font-display font-bold text-ink-navy">
              {s.title}
              {s.delay && (
                <span className="ml-2 rounded-full bg-caution-amber/15 px-2 py-0.5 text-xs font-semibold text-caution-amber">
                  {s.delay}
                </span>
              )}
            </p>
            {s.note && <p className="mt-0.5 text-sm text-ash/70">{s.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function GercLdDisputePageGu() {
  return (
    <>
      <PageHero
        hub="news"
        breadcrumb={[
          { label: 'ન્યૂઝ', href: '/gu/news' },
          { label: 'GERC વિન્ડ અને સોલર LD વિવાદ', href: `/gu${PATH}` },
        ]}
        badgeLabel={
          <>
            <span aria-hidden>📰</span> ગુજરાત · GERC · GUVNL
          </>
        }
        h1={TITLE}
        subtitle={DESCRIPTION}
        stats={[
          { icon: '⚖️', big: '2', small: 'સુધારાની મંજૂરી, ચુકાદો નહીં', tone: 'hub' },
          { icon: '💨', big: '₹14.40cr', small: 'LD વસૂલાત, વિન્ડ પ્રોજેક્ટ', tone: 'caution-amber' },
          { icon: '☀️', big: '₹9.18cr', small: 'LD વસૂલાત, સોલર પ્રોજેક્ટ', tone: 'caution-amber' },
          { icon: '📅', big: '8 અને 22 ઓક્ટો', small: 'જવાબ / રિજોઈન્ડર દેય', tone: 'hub' },
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
          એક જ દિવસે, એ જ ગુજરાત ઇલેક્ટ્રિસિટી રેગ્યુલેટરી કમિશન બેન્ચે બે રિન્યુએબલ એનર્જી
          ડેવલપર્સને ગુજરાત ઊર્જા વિકાસ નિગમ લિમિટેડ (GUVNL) સામે પહેલેથી પેન્ડિંગ વિવાદોમાં
          નવા તથ્યો ઉમેરવાની મંજૂરી આપી — એક અમરેલી જિલ્લામાં 140 MW વિન્ડ પ્રોજેક્ટ પર, એક
          અરવલ્લી જિલ્લામાં 200 MW સોલર પ્રોજેક્ટ પર. બંને વિવાદ એક જ મૂળ સવાલ પર છે: શું
          પ્રોજેક્ટના વિલંબ ખરેખર ડેવલપર્સના નિયંત્રણની બહાર હતા, અને શું GUVNL એ તેમના
          ઇનવોઇસમાંથી પહેલેથી કાપેલી લિક્વિડેટેડ ડેમેજિસ પાછી મળવી જોઈએ. આમાંથી કોઈ સવાલનો
          જવાબ હજુ મળ્યો નથી — આ વખતે GERC એ ખરેખર જે નક્કી કર્યું તે એના કરતાં ઘણું સંકુચિત
          છે, અને ચોકસાઈથી સમજવા લાયક છે.
        </p>

        <section aria-labelledby="what-decided" className="mt-10 scroll-mt-20">
          <h2 id="what-decided" className={h2Cls}>
            GERC એ ખરેખર શું નક્કી કર્યું
          </h2>
          <p className={pCls}>
            23 સપ્ટેમ્બર 2026 ના રોજ અપાયેલા બે અલગ આદેશોમાં, અધ્યક્ષ પંકજ જોશી અને સભ્ય જતિન
            એન. ઠક્કરની GERC બેન્ચે દરેક ડેવલપરને પોતાની પિટિશનમાં સુધારો કરવાની મંજૂરી આપી,
            જેથી મૂળ પિટિશન ફાઇલ થયા પછી બનેલી ઘટનાઓ ઔપચારિક રીતે ઉમેરી શકાય — મુખ્યત્વે,
            GUVNL દ્વારા પછીથી વસૂલાયેલી લિક્વિડેટેડ ડેમેજિસ, અને દરેક ડેવલપરનો તેમાંથી બનેલો
            રિફંડ દાવો. બંને આદેશોમાં GERC નો તર્ક એકસમાન હતો: નવી વસૂલાયેલી લિક્વિડેટેડ
            ડેમેજિસ સીધી એ જ ફોર્સ-મેજ્યોર સવાલ સાથે જોડાયેલી છે જે પહેલેથી કમિશન સામે છે, અને
            બધું સાથે સાંભળવું ડેવલપર્સને ખરેખર એક જ વિવાદ પર અલગ મુકદ્દમામાં ધકેલવાનું ટાળે
            છે.
          </p>
          <p className={`mt-3 ${pCls}`}>
            બંને આદેશ સ્પષ્ટ કહે છે કે આનાથી પરિણામ પર કોઈ અસર થતી નથી. જેમ{' '}
            <a
              href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU4MDJfMjQtMDktMjAyNl82MDcxNjY1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline"
            >
              GERC ના વિન્ડ કેસના આદેશમાં કહેવાયું છે
            </a>
            , સુધારાની મંજૂરી &ldquo;પોતે જ, કોઈપણ પક્ષના દાવાઓના ગુણદોષ પર ચુકાદો બનતી નથી.&rdquo; બેમાંથી
            કોઈ ડેવલપર ખરેખર રિફંડને લાયક છે કે નહીં — અને GUVNL એ પૈસા કાપવા સાચા હતા કે નહીં
            — તે હજુ કમિશને નક્કી કરવાનું બાકી છે.
          </p>
          <p className={takeawayCls}>
            નિષ્કર્ષ: આ એ વાતનો ચુકાદો છે કે કેસ કેવી રીતે સાંભળાશે, કોણ સાચું છે તેનો નહીં —
            કોઈપણ દાવો કે GERC એ કોઈ ડેવલપરનો &ldquo;પક્ષ લીધો&rdquo; છે, તેને અકાળે ગણો.
          </p>
        </section>

        <section aria-labelledby="two-cases" className="mt-10 scroll-mt-20">
          <h2 id="two-cases" className={h2Cls}>
            બંને કેસ, સાથે-સાથે
          </h2>
          <p className={pCls}>
            અલગ ટેકનોલોજી, અલગ જિલ્લો, એકસમાન વિવાદનો આકાર — એક ડેવલપર પોતાની ડેડલાઇન ચૂકવા
            માટે હવામાન અને ગ્રિડ-કનેક્શનમાં વિલંબને જવાબદાર ઠેરવે છે, અને GUVNL એ દલીલ પેન્ડિંગ
            રહેતાં લિક્વિડેટેડ ડેમેજિસ વસૂલે છે.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-hairline bg-mist text-ink-navy">
                <tr>
                  <th className="px-4 py-2 font-semibold"></th>
                  <th className="px-4 py-2 font-semibold">Project Twelve Renewables (વિન્ડ)</th>
                  <th className="px-4 py-2 font-semibold">Martial Solren (સોલર)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-2 font-medium">ક્ષમતા</td>
                  <td className="px-4 py-2">140 MW (141.9 MW તરીકે કાર્યરત)</td>
                  <td className="px-4 py-2">200 MW, ચાર 50 MW ટ્રાન્ચમાં</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">સ્થળ</td>
                  <td className="px-4 py-2">અમરેલી જિલ્લો</td>
                  <td className="px-4 py-2">અરવલ્લી જિલ્લો</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">PPA સાઇન</td>
                  <td className="px-4 py-2">15 ડિસેમ્બર 2022</td>
                  <td className="px-4 py-2">15 ડિસેમ્બર 2022</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">મૂળ SCOD</td>
                  <td className="px-4 py-2">14 ડિસેમ્બર 2024</td>
                  <td className="px-4 py-2">6 ફેબ્રુઆરી 2025</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">ખરેખર કમિશનિંગ</td>
                  <td className="px-4 py-2">તબક્કાવાર, ડિસે. 2024 – જૂન 2025</td>
                  <td className="px-4 py-2">તબક્કાવાર, ફેબ્રુ. – જુલાઈ 2025</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">GUVNL દ્વારા વસૂલ LD</td>
                  <td className="px-4 py-2 tabular-nums">₹14,40,26,667</td>
                  <td className="px-4 py-2 tabular-nums">₹9,17,77,778</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">જણાવેલ ફોર્સ મેજ્યોર આધારો</td>
                  <td className="px-4 py-2">કનેક્ટિવિટીમાં વિલંબ, ભારે વરસાદ/પૂર, ચક્રવાતી હવામાન, ખાણ પર હડતાળ</td>
                  <td className="px-4 py-2">મુખ્ય પિટિશનમાં જણાવેલી ફોર્સ મેજ્યોર ઘટનાઓ (એ જ આધારે વિસ્તરણ માંગ્યું)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">GUVNL નો મુખ્ય વાંધો</td>
                  <td className="px-4 py-2">કાર્યવાહી ઘણી આગળ વધી ચૂકી; કનેક્ટિવિટી સમયસર ઉપલબ્ધ હતી; LD, PPA કલમ 3.3 હેઠળ માન્ય</td>
                  <td className="px-4 py-2">કોઈ માન્ય ફોર્સ મેજ્યોર નથી; ડેવલપરે અમુક વિલંબ સ્વીકાર્યો; PPA માં LD પર વ્યાજની કોઈ જોગવાઈ નથી</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Timeline
            label="Project Twelve Renewables — વિન્ડ, અમરેલી જિલ્લો"
            steps={[
              { date: '14 ડિસે. 2024', title: 'મૂળ SCOD' },
              { date: '13 ડિસે. 2024', title: 'તબક્કો 1 કાર્યરત', note: '39.6 MW', delay: 'સમયસર' },
              { date: '11–12 ફેબ્રુ. 2025', title: 'તબક્કો 2 કાર્યરત', note: '29.7 MW' },
              { date: '19 માર્ચ 2025', title: 'તબક્કો 3 કાર્યરત', note: '13.2 MW' },
              { date: 'એપ્રિલ–જૂન 2025', title: 'તબક્કો 4–5 કાર્યરત', note: 'ઘણી તારીખોમાં 59.4 MW' },
              { date: '23 જૂન 2025', title: 'સંપૂર્ણ 141.9 MW GUVNL ને કન્ફર્મ' },
            ]}
          />
          <Timeline
            label="Martial Solren — સોલર, અરવલ્લી જિલ્લો"
            steps={[
              { date: '6 ફેબ્રુ. 2025', title: 'મૂળ SCOD (ટ્રાન્ચ 1)' },
              { date: '6 ફેબ્રુ. 2025', title: 'ટ્રાન્ચ 1 કાર્યરત (50 MW)', delay: 'સમયસર' },
              { date: '13 મે 2025', title: 'ટ્રાન્ચ 2 કાર્યરત (50 MW)', delay: '96 દિવસ મોડું' },
              { date: '3 જુલાઈ 2025', title: 'ટ્રાન્ચ 3 કાર્યરત (50 MW)', delay: '147 દિવસ મોડું' },
              { date: '26 જુલાઈ 2025', title: 'ટ્રાન્ચ 4 કાર્યરત (50 MW) — સંપૂર્ણ 200 MW', delay: '171 દિવસ મોડું' },
            ]}
          />
          <p className={takeawayCls}>
            નિષ્કર્ષ: બંને કેસમાં, પહેલો ટ્રાન્ચ કે તબક્કો સમયસર પૂરો થયો — વિવાદ સંપૂર્ણપણે
            એ વાત પર છે કે બાકીની ક્ષમતામાં વિલંબ કેમ થયો, અને એ વિલંબ કોની જવાબદારી છે.
          </p>
        </section>

        <section aria-labelledby="jargon" className="mt-10 scroll-mt-20">
          <h2 id="jargon" className={h2Cls}>
            પરિભાષા, સમજાવી
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              [
                'SCOD (શેડ્યુલ્ડ કમર્શિયલ ઓપરેશન ડેટ)',
                'એ ડેડલાઇન જે પાવર પરચેઝ એગ્રીમેન્ટ કોઈ પ્રોજેક્ટ ખરેખર વીજ સપ્લાય શરૂ કરવા માટે નક્કી કરે છે. આ એક કોન્ટ્રાક્ચ્યુઅલ તારીખ છે, જે PPA સાઇન થતી વખતે નક્કી થાય છે.',
              ],
              [
                'COD (કમર્શિયલ ઓપરેશન ડેટ)',
                'એ તારીખ જ્યારે પ્રોજેક્ટ ખરેખર કાર્યરત થઈને PPA હેઠળ વીજ સપ્લાય શરૂ કરે છે. જ્યારે આ SCOD પછી આવે છે, ત્યારે બંને વચ્ચેનો ગેપ એ જ છે જેના પર લિક્વિડેટેડ ડેમેજિસની ગણતરી થાય છે.',
              ],
              [
                'લિક્વિડેટેડ ડેમેજિસ (LD)',
                'PPA ના પોતાના ફોર્મ્યુલામાં નક્કી કરેલો એક પહેલેથી નક્કી દંડ, જે SCOD ચૂકવા બદલ ડેવલપરે ચૂકવવો પડે છે. DISCOM સામાન્ય રીતે આ રકમ માસિક ઇનવોઇસમાંથી કાપીને, અથવા ડેવલપરની પરફોર્મન્સ બેંક ગેરંટી — PPA સાઇન કરતી વખતે જમા કરાયેલી સિક્યોરિટી ડિપોઝિટ — સામે વસૂલે છે.',
              ],
              [
                'ફોર્સ મેજ્યોર',
                'કોઈ પક્ષના વ્યાજબી નિયંત્રણની ખરેખર બહારની ઘટનાઓ — હવામાન, નિયમનકારી વિલંબ, કુદરતી આપત્તિઓ — જે, જો નિયમનકાર સ્વીકારે, તો SCOD પછીના અમુક કે આખા વિલંબને LD જવાબદારી વિના માફ કરી શકે છે. સ્વીકૃતિ ક્યારેય આપોઆપ નથી થતી: તેને ચોક્કસ તથ્યોના આધારે દરેક કેસમાં અલગથી દલીલ કરીને નક્કી કરવામાં આવે છે.',
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
            નિષ્કર્ષ: અહીં બંને વિવાદ સંપૂર્ણપણે એ વાત પર ટકેલા છે કે જણાવેલી ઘટનાઓ ફોર્સ
            મેજ્યોરમાં ગણાય છે કે નહીં — બાકીનું બધું એ જ એક નિર્ણયથી નક્કી થાય છે.
          </p>
        </section>

        <section aria-labelledby="consumer-link" className="mt-10 scroll-mt-20">
          <h2 id="consumer-link" className={h2Cls}>
            પ્રોજેક્ટના વિલંબનો ગ્રાહકો સાથે શું સંબંધ છે — અને આ બંને કેસ હમણાં કેમ નહીં
          </h2>
          <p className={pCls}>
            GUVNL ની વીજ-ખરીદી ખર્ચ — જેમાં કોન્ટ્રાક્ટ કરેલા રિન્યુએબલ પ્રોજેક્ટ મોડો પડે ત્યારે
            સપ્લાયની ઘટ સંભાળવાનો ખર્ચ પણ સામેલ છે — સીધી કે તરત નહીં, પણ સમય જતાં{' '}
            <strong>FPPPA (ફ્યુલ એન્ડ પાવર પરચેઝ પ્રાઇસ એડજસ્ટમેન્ટ)</strong> નામની વ્યવસ્થા
            દ્વારા ઘરેલુ બિલ સુધી પહોંચે છે. GERC દર વર્ષે એક બેઝ FPPPA દર નક્કી કરે છે, જે
            પાછલા વર્ષોની સરેરાશ હોય છે, અને GUVNL ને ખરેખર અને મંજૂર થયેલી વીજ-ખરીદી ખર્ચ
            વચ્ચેના કોઈપણ વધારાના તફાવતને ત્રિમાસિક એડજસ્ટમેન્ટ દ્વારા વસૂલવા દે છે — 10
            પૈસા/યુનિટ કરતાં વધુ કોઈપણ વધારા માટે કમિશનની અગાઉથી મંજૂરી જરૂરી છે. આ એક ખરી,
            નિયમનકૃત પાસ-થ્રુ વ્યવસ્થા છે, કોઈ બ્લેક બોક્સ નથી.
          </p>
          <p className={`mt-3 ${pCls}`}>
            જે અમે અહીં જણાવવા માટે ચકાસી ન શક્યા, તે છે એક ચોક્કસ, હાલમાં લાગુ FPPPA દર —
            સર્ચ પરિણામોમાં અસંગત, અવિશ્વસનીય રીતે તારીખવાળા આંકડા મળ્યા જેને અમે ન દોહરાવવાનું
            નક્કી કર્યું. તેનાથી પણ વધુ મહત્વનું: કોઈપણ GERC આદેશમાં એવું કહેવાયું નથી કે આ
            બંને ખાસ વિવાદ GUVNL ના FPPPA દરને કોઈપણ દિશામાં બદલે છે. અહીં સંબંધ માળખાકીય છે —
            મોડા પડેલી રિન્યુએબલ ક્ષમતા એ DISCOM ની વીજ-ખરીદી ખર્ચને અસર કરતા ઘણા પરિબળોમાંનું
            એક છે — આ દાવો નથી કે આ બંને કેસ તમારું બિલ બદલી ચૂક્યા છે, અથવા બદલશે.
          </p>
          <p className={takeawayCls}>
            નિષ્કર્ષ: વ્યવસ્થાને સમજો, પણ એવી અપેક્ષા ન રાખો કે આમાંથી કોઈ કેસ સીધો તમારા
            બિલ પર દેખાશે — FPPPA આ રીતે કામ કરતું નથી, અને કોઈપણ આદેશ એવું કહેતો નથી.
          </p>
        </section>

        <section aria-labelledby="whats-next" className="mt-10 scroll-mt-20">
          <h2 id="whats-next" className={h2Cls}>
            આગળ શું થશે
          </h2>
          <ol className="mt-3 space-y-3">
            {[
              [
                '8 ઓક્ટોબર 2026',
                'બંને કેસમાં GUVNL નો સંયુક્ત જવાબ દેય છે, જે દરેક ડેવલપરની સુધારેલી પિટિશનનો સંપૂર્ણ જવાબ આપશે.',
              ],
              [
                '22 ઓક્ટોબર 2026',
                'GUVNL ના જવાબ પર દરેક ડેવલપરનું રિજોઈન્ડર દેય છે, જેના પછી બંને કેસમાં પ્લીડિંગ્સ બંધ થશે.',
              ],
              [
                'તે પછી',
                'GERC દરેક કેસમાં મુખ્ય સુનાવણી નક્કી કરશે, જ્યાં ફોર્સ-મેજ્યોર સવાલ — અને તેની સાથે, કોઈ રિફંડ દાવો સફળ થાય છે કે નહીં — ખરેખર નક્કી થશે. કોઈપણ આદેશમાં હજુ આની તારીખ આપવામાં આવી નથી.',
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
          <p className={takeawayCls}>
            નિષ્કર્ષ: ખરો નિર્ણય હજુ અઠવાડિયાંથી મહિનાઓ દૂર છે — 23 સપ્ટેમ્બરે જે થયું, તેણે
            ફક્ત એ નક્કી કર્યું કે તેની દલીલ કેવી રીતે થશે.
          </p>
        </section>

        <section aria-labelledby="related" className="mt-10 scroll-mt-20">
          <h2 id="related" className={h2Cls}>
            જોડાયેલા ટૂલ અને ગાઇડ
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/gu/electricity/gujarat-electricity-bill-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                🧮
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                ગુજરાત વીજ બિલ કેલ્ક્યુલેટર
              </p>
              <p className="mt-1 text-xs text-ash/60">
                ટેલિસ્કોપિક સ્લેબથી તમારું ગુજરાત વીજ બિલ અંદાજો.
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
                ગુજરાતના ખરા ટેરિફ પર રૂફટોપ સોલર પેબેક.
              </p>
            </Link>
            <Link
              href="/blog/fixed-charges-vs-fca-electricity-bill"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📄
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                Fixed Charges vs FCA Explained
              </p>
              <p className="mt-1 text-xs text-ash/60">
                FPPPA જેવા ફ્યુલ/પાવર-પરચેઝ પાસ-થ્રુ તમારા બિલમાં કેવી રીતે બંધબેસે છે.
              </p>
            </Link>
            <Link
              href="/solar/roi-calculator"
              className="rounded-xl border border-hairline bg-paper p-5 transition hover:border-hub-news/50 hover:shadow-sm"
            >
              <span className="text-xl" aria-hidden>
                📈
              </span>
              <p className="font-display mt-2 font-bold text-ink-navy">
                સોલર ROI કેલ્ક્યુલેટર
              </p>
              <p className="mt-1 text-xs text-ash/60">
                તમારા DISCOM ના ટેરિફ પર પેબેક અને બચત.
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
          છેલ્લે અપડેટ: {LAST_UPDATED}. કેસની વિગતો GERC ના પોતાના 23 સપ્ટેમ્બર 2026 ના આદેશો
          મુજબ છે ({DATA_AS_OF} સુધી):{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU4MDJfMjQtMDktMjAyNl82MDcxNjY1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            પિટિશન નંબર 2314/2024 (વિન્ડ)
          </a>{' '}
          અને{' '}
          <a
            href="https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU3OTVfMjQtMDktMjAyNl8zODE0NjMy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            પિટિશન નંબર 2460/2025 (સોલર)
          </a>
          . તેને{' '}
          <a
            href="https://solarquarter.com/2026/09/29/gerc-allows-amendment-in-140-mw-wind-project-dispute-over-liquidated-damages-in-gujarat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            SolarQuarter (29 સપ્ટેમ્બર 2026)
          </a>{' '}
          અને{' '}
          <a
            href="https://solarquarter.com/2026/09/30/gerc-allows-amendment-in-liquidated-damages-dispute-over-200-mw-solar-project-in-gujarat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass underline"
          >
            SolarQuarter (30 સપ્ટેમ્બર 2026)
          </a>{' '}
          એ પણ રિપોર્ટ કર્યું, બંને મોહન ગુપ્તા દ્વારા. કોઈપણ વિવાદ ગુણદોષ પર હજુ નક્કી થયો
          નથી — બંને હજુ પ્લીડિંગ્સના તબક્કામાં છે, GUVNL નો જવાબ 8 ઓક્ટોબર 2026 સુધી અને
          દરેક ડેવલપરનું રિજોઈન્ડર 22 ઓક્ટોબર 2026 સુધી દેય છે. વર્તમાન FPPPA દરને લખાયા
          સુધી કોઈ ભરોસાપાત્ર, તારીખવાળા સ્રોતથી ચકાસી શકાયો નથી અને ઇરાદાપૂર્વક ઉપર જણાવ્યો
          નથી — અમે આંકડા કેવી રીતે એકત્ર કરીએ અને ચકાસીએ છીએ તે માટે અમારી{' '}
          <Link href="/methodology" className="text-brass underline">
            methodology
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
