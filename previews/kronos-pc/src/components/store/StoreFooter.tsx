import { Link } from 'react-router-dom'
import { Mail, MapPin, ShieldCheck } from 'lucide-react'

import { useI18n } from '@/lib/useI18n'

export function StoreFooter() {
  const { t } = useI18n()

  const footerLinks = [
    { to: '/store', label: t.nav.products },
    { to: '/systems', label: t.nav.prebuilts },
    { to: '/lab', label: t.nav.repair },
    { to: '/company', label: t.nav.about },
    { to: '/quote', label: t.nav.contact },
  ] as const

  return (
    <footer className="mt-auto border-t border-neon/15 bg-[oklch(0.11_0.018_262)]/70 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-md space-y-4">
          <p className="text-lg font-semibold text-foreground">Kronos PC</p>
          <p className="text-sm leading-6 text-muted-foreground">{t.footer.about}</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-neon" aria-hidden />
              {t.footer.proof}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-neon" aria-hidden />
              {t.footer.location}
            </span>
          </div>
        </div>

        <nav className="grid content-start gap-2" aria-label={t.footer.aria}>
          <p className="text-sm font-semibold text-foreground">{t.footer.explore}</p>
          {footerLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-muted-foreground outline-none transition-colors hover:text-neon focus-visible:text-neon"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">{t.footer.quotes}</p>
          <p className="text-sm leading-6 text-muted-foreground">
            {t.footer.quoteBody}
          </p>
          <Link
            to={`/quote?topic=${encodeURIComponent(t.footer.quoteTopic)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-neon outline-none transition-colors hover:text-neon-soft focus-visible:text-neon-soft"
          >
            <Mail className="size-4" aria-hidden />
            {t.footer.request}
          </Link>
        </div>
      </div>
      <div className="border-t border-neon/10 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kronos PC. {t.footer.copyright}
      </div>
    </footer>
  )
}
