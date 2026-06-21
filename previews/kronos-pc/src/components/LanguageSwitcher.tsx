import { Languages } from 'lucide-react'

import { LOCALES, localeConfigs } from '@/lib/locales'
import { useI18n } from '@/lib/useI18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { locale, setLocale, t, currency, ratesStatus } = useI18n()

  return (
    <div
      className="flex items-center rounded-lg border border-border bg-background/70 p-0.5"
      aria-label={t.header.languageLabel}
      role="group"
      title={`${currency} · ${
        ratesStatus === 'live' ? t.common.currencyUpdated : t.common.currencyFallback
      }`}
    >
      <span className="hidden px-2 text-muted-foreground sm:inline-flex">
        <Languages className="size-4" aria-hidden />
      </span>
      {LOCALES.map((item) => (
        <button
          key={item}
          type="button"
          className={cn(
            'h-7 rounded-md px-2 text-xs font-semibold transition-colors',
            locale === item
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
          onClick={() => setLocale(item)}
          aria-pressed={locale === item}
          aria-label={localeConfigs[item].label}
        >
          {localeConfigs[item].shortLabel}
        </button>
      ))}
    </div>
  )
}
