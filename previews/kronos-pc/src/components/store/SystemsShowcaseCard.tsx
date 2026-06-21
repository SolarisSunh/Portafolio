import { Link } from 'react-router-dom'
import { Check, Clock3, MessageCircle, ShieldCheck, Users } from 'lucide-react'

import type { PrebuiltPC } from '@/data/types'
import { NeonButton } from '@/components/store/NeonButton'
import { useI18n } from '@/lib/useI18n'

interface SystemsShowcaseCardProps {
  pc: PrebuiltPC
}

/**
 * Premium showroom exhibit for a prebuilt system. Reuses prebuilt catalog data
 * and the currency formatter; quote CTA targets the quote center.
 */
export function SystemsShowcaseCard({ pc }: SystemsShowcaseCardProps) {
  const { locale, t, formatCurrency } = useI18n()
  const content = pc.content[locale]
  const quoteTo = `/quote?topic=${encodeURIComponent(content.name)}`

  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-neon/45 motion-reduce:hover:translate-y-0">
      <div className="relative overflow-hidden border-b border-neon/15">
        <img
          src={pc.imageUrl}
          alt={content.name}
          width={720}
          height={480}
          loading="lazy"
          style={{ objectPosition: pc.imagePosition }}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.02_260)] via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-neon/85 px-2.5 py-1 text-xs font-semibold text-[oklch(0.13_0.02_260)] backdrop-blur-sm">
          {t.prebuiltKinds[pc.kind]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {content.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{content.tagline}</p>
          </div>
          <p className="text-xl font-semibold tabular-nums text-foreground neon-text">
            {formatCurrency(pc.price)}
          </p>
        </div>

        <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
          <span className="flex items-center gap-1.5">
            <Users className="size-4 text-neon" aria-hidden />
            {content.audience}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-4 text-neon" aria-hidden />
            {content.leadTime}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-neon" aria-hidden />
            {content.warranty}
          </span>
        </div>

        <ul className="grid gap-2 text-sm text-muted-foreground" role="list">
          {content.specs.map((line) => (
            <li key={line} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <NeonButton
          nativeButton={false}
          render={<Link to={quoteTo} />}
          className="mt-auto w-full gap-2"
        >
          <MessageCircle className="size-4" aria-hidden />
          {t.cards.quotePrebuilt}
        </NeonButton>
      </div>
    </article>
  )
}
