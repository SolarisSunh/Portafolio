import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Check, Clock3, MessageCircle } from 'lucide-react'

import type { RepairServiceItem } from '@/data/types'
import { NeonButton } from '@/components/store/NeonButton'
import { useI18n } from '@/lib/useI18n'

interface DiagnosticsCardProps {
  service: RepairServiceItem
  icon: LucideIcon
}

/**
 * A repair service rendered as a professional diagnostic terminal. Reuses the
 * repair services catalog and currency formatter; CTA opens the quote center.
 */
export function DiagnosticsCard({ service, icon: Icon }: DiagnosticsCardProps) {
  const { locale, t, formatCurrency } = useI18n()
  const content = service.content[locale]
  const quoteTo = `/quote?topic=${encodeURIComponent(content.title)}`

  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:border-neon/45 motion-reduce:hover:translate-y-0">
      <span
        aria-hidden
        className="holo-grid pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neon/12 text-neon ring-1 ring-neon/30">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
            {content.title}
          </h3>
          <p className="text-sm text-muted-foreground">{content.description}</p>
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg font-semibold text-foreground neon-text">
          {t.common.from} {formatCurrency(service.priceFrom)}
        </p>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock3 className="size-4 text-neon" aria-hidden />
          {content.duration}
        </span>
      </div>

      <ul className="relative mt-4 space-y-2 text-sm text-muted-foreground" role="list">
        {content.includes.map((item) => (
          <li key={item} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <NeonButton
        tone="outline"
        nativeButton={false}
        render={<Link to={quoteTo} />}
        className="relative mt-6 w-full gap-2"
      >
        <MessageCircle className="size-4" aria-hidden />
        {t.cards.scheduleService}
      </NeonButton>
    </article>
  )
}
