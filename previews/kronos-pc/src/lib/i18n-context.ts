import { createContext } from 'react'

import type { CurrencyCode, Locale } from '@/lib/locales'
import type { translations } from '@/lib/translations'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)[Locale]
  formatCurrency: (usdAmount: number) => string
  currency: CurrencyCode
  ratesStatus: 'live' | 'fallback'
}

export const I18nContext = createContext<I18nContextValue | null>(null)
