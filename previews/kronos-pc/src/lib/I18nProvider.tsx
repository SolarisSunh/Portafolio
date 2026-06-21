import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { I18nContext } from '@/lib/i18n-context'
import type { I18nContextValue } from '@/lib/i18n-context'
import {
  LOCALES,
  fallbackRates,
  localeConfigs,
} from '@/lib/locales'
import type { CurrencyCode, Locale } from '@/lib/locales'
import { translations } from '@/lib/translations'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem('kronos-locale')
  return LOCALES.includes(stored as Locale) ? (stored as Locale) : 'es'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(fallbackRates)
  const [ratesStatus, setRatesStatus] = useState<'live' | 'fallback'>('fallback')

  useEffect(() => {
    window.localStorage.setItem('kronos-locale', locale)
    document.documentElement.lang = localeConfigs[locale].htmlLang
    document.title = translations[locale].meta.title

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    )
    if (description) {
      description.content = translations[locale].meta.description
    }
  }, [locale])

  useEffect(() => {
    let cancelled = false

    async function loadRates() {
      try {
        const response = await fetch(
          'https://api.frankfurter.app/latest?from=USD&to=MXN,EUR'
        )
        if (!response.ok) throw new Error('Exchange API failed')
        const data = (await response.json()) as {
          rates?: Partial<Record<CurrencyCode, number>>
        }

        if (!cancelled) {
          setRates({
            USD: 1,
            MXN: data.rates?.MXN ?? fallbackRates.MXN,
            EUR: data.rates?.EUR ?? fallbackRates.EUR,
          })
          setRatesStatus('live')
        }
      } catch {
        if (!cancelled) {
          setRates(fallbackRates)
          setRatesStatus('fallback')
        }
      }
    }

    void loadRates()

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<I18nContextValue>(() => {
    const config = localeConfigs[locale]

    return {
      locale,
      setLocale,
      t: translations[locale],
      currency: config.currency,
      ratesStatus,
      formatCurrency(usdAmount: number) {
        const amount = usdAmount * rates[config.currency]
        return new Intl.NumberFormat(config.intlLocale, {
          style: 'currency',
          currency: config.currency,
          maximumFractionDigits: 0,
        }).format(amount)
      },
    }
  }, [locale, rates, ratesStatus])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
