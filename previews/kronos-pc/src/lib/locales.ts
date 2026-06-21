export const LOCALES = ['es', 'en', 'fr'] as const

export type Locale = (typeof LOCALES)[number]
export type CurrencyCode = 'MXN' | 'USD' | 'EUR'

export const localeConfigs: Record<
  Locale,
  {
    shortLabel: string
    label: string
    htmlLang: string
    intlLocale: string
    currency: CurrencyCode
  }
> = {
  es: {
    shortLabel: 'ES',
    label: 'Español',
    htmlLang: 'es',
    intlLocale: 'es-MX',
    currency: 'MXN',
  },
  en: {
    shortLabel: 'EN',
    label: 'English',
    htmlLang: 'en',
    intlLocale: 'en-US',
    currency: 'USD',
  },
  fr: {
    shortLabel: 'FR',
    label: 'Français',
    htmlLang: 'fr',
    intlLocale: 'fr-FR',
    currency: 'EUR',
  },
}

export const fallbackRates: Record<CurrencyCode, number> = {
  USD: 1,
  MXN: 20,
  EUR: 0.92,
}
