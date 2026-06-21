import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Hexagon, Menu, MessageCircle, X } from 'lucide-react'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { NeonButton } from '@/components/store/NeonButton'
import { useI18n } from '@/lib/useI18n'
import { cn } from '@/lib/utils'

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-neon/50',
    isActive
      ? 'bg-neon/15 text-neon'
      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
  )

export function StoreHeader() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/store', label: t.nav.products },
    { to: '/systems', label: t.nav.prebuilts },
    { to: '/lab', label: t.nav.repair },
    { to: '/company', label: t.nav.about },
    { to: '/quote', label: t.nav.contact },
  ] as const

  const quoteTo = `/quote?topic=${encodeURIComponent(t.header.quoteTopic)}`

  return (
    <header className="sticky top-0 z-50 border-b border-neon/15 bg-[oklch(0.12_0.02_262)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold text-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-neon/50"
          onClick={() => setOpen(false)}
        >
          <span className="relative flex size-9 items-center justify-center text-neon">
            <Hexagon className="size-9" aria-hidden />
            <span className="absolute text-[0.6rem] font-bold">K</span>
          </span>
          <span className="text-lg tracking-tight">Kronos PC</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t.header.primaryNav}
        >
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navClass} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NeonButton
            nativeButton={false}
            render={<Link to={quoteTo} />}
            className="hidden h-9 gap-2 sm:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden />
            {t.header.quote}
          </NeonButton>
          <LanguageSwitcher />
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-neon/25 text-foreground outline-none transition-colors hover:bg-white/5 focus-visible:ring-3 focus-visible:ring-neon/50 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="store-mobile-nav"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="store-mobile-nav"
          className="border-t border-neon/15 bg-[oklch(0.12_0.02_262)]/95 backdrop-blur-xl md:hidden"
        >
          <nav
            className="flex flex-col gap-1 px-4 py-4"
            aria-label={t.header.mobileNav}
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={navClass}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <NeonButton
              nativeButton={false}
              render={<Link to={quoteTo} />}
              className="mt-2 gap-2"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="size-4" aria-hidden />
              {t.header.quoteMobile}
            </NeonButton>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
