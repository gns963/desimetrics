import type { Metadata } from 'next'
import HomePageView from '@/components/HomePageView'
import { mlTexts } from '@/data/home-texts/ml'
import { homeHreflangAlternates, SITE } from '@/lib/homeShared'

export const metadata: Metadata = {
  title: mlTexts.metaTitle,
  description: mlTexts.metaDescription,
  alternates: { canonical: `${SITE}/ml`, languages: homeHreflangAlternates() },
  openGraph: { url: `${SITE}/ml`, type: 'website', locale: 'ml_IN' },
}

export default function HomeMl() {
  return <HomePageView texts={mlTexts} />
}
