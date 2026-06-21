import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

import { useI18n } from '@/lib/useI18n'

interface DepartmentCardProps {
  to: string
  icon: LucideIcon
  title: string
  description: string
  /** Two-digit zone index shown as a HUD label, e.g. "01". */
  index: number
}

/**
 * Interactive department panel for the lobby. Behaves as a single large link
 * with a holographic frame; keyboard/focus states come from the anchor itself.
 */
export function DepartmentCard({
  to,
  icon: Icon,
  title,
  description,
  index,
}: DepartmentCardProps) {
  const { t } = useI18n()
  const zone = String(index).padStart(2, '0')

  return (
    <Link
      to={to}
      className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 outline-none transition-all duration-200 hover:-translate-y-1 hover:border-neon/50 focus-visible:ring-3 focus-visible:ring-neon/50 motion-reduce:hover:translate-y-0"
    >
      <span
        aria-hidden
        className="holo-grid pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-200 group-hover:opacity-80"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-neon/20 blur-2xl transition-opacity duration-200 group-hover:bg-neon/30"
      />

      <div className="relative flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-xl bg-neon/12 text-neon ring-1 ring-neon/30">
          <Icon className="size-6" aria-hidden />
        </span>
        <span className="font-mono text-xs tracking-widest text-neon/70">
          {zone}
        </span>
      </div>

      <h3 className="relative mt-5 font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neon">
        {t.experience.enterDepartment}
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden
        />
      </span>
    </Link>
  )
}
