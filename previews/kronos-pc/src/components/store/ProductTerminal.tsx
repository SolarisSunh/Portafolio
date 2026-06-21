import { Link } from 'react-router-dom'
import { Dialog } from '@base-ui/react/dialog'
import {
  Check,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  X,
} from 'lucide-react'

import type { ComponentProduct } from '@/data/types'
import { NeonButton } from '@/components/store/NeonButton'
import { useI18n } from '@/lib/useI18n'

interface ProductTerminalProps {
  product: ComponentProduct
}

/**
 * A component product shown inside a futuristic display terminal. Selecting
 * "View details" opens a larger product terminal (accessible Base UI dialog).
 * All copy/price come from the existing catalog + currency formatter.
 */
export function ProductTerminal({ product }: ProductTerminalProps) {
  const { locale, t, formatCurrency } = useI18n()
  const content = product.content[locale]
  const quoteTo = `/quote?topic=${encodeURIComponent(content.name)}`

  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-neon/45 motion-reduce:hover:translate-y-0">
      <div className="relative overflow-hidden border-b border-neon/15">
        <img
          src={product.imageUrl}
          alt={content.name}
          width={600}
          height={400}
          loading="lazy"
          style={{ objectPosition: product.imagePosition }}
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.02_260)] via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[oklch(0.13_0.02_260)]/80 px-2.5 py-1 text-xs font-medium text-neon ring-1 ring-neon/30 backdrop-blur-sm">
            {t.categories[product.category]}
          </span>
          {content.badge ? (
            <span className="rounded-full bg-neon/85 px-2.5 py-1 text-xs font-semibold text-[oklch(0.13_0.02_260)] backdrop-blur-sm">
              {content.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            {content.name}
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-2xl font-semibold tabular-nums text-foreground neon-text">
            {formatCurrency(product.price)}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
            <PackageCheck className="size-3.5" aria-hidden />
            {content.stock}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-neon" aria-hidden />
          <span>
            {t.common.warranty}: {content.warranty}
          </span>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground" role="list">
          {content.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row">
          <Dialog.Root>
            <Dialog.Trigger className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-neon/40 bg-neon/5 px-4 text-sm font-medium text-neon outline-none transition-all hover:border-neon hover:bg-neon/12 focus-visible:ring-3 focus-visible:ring-neon/50">
              {t.experience.viewDetails}
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-[80] bg-[oklch(0.08_0.015_262)]/80 backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
              <Dialog.Popup className="glass-strong neon-edge fixed left-1/2 top-1/2 z-[81] grid max-h-[90vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] overflow-hidden rounded-2xl outline-none transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
                <div className="flex items-start justify-between gap-4 border-b border-neon/15 p-5">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-neon uppercase">
                      {t.experience.terminalAria}
                    </p>
                    <Dialog.Title className="mt-1 font-heading text-xl font-semibold text-foreground">
                      {content.name}
                    </Dialog.Title>
                  </div>
                  <Dialog.Close
                    aria-label={t.experience.close}
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-white/10 hover:text-foreground focus-visible:ring-3 focus-visible:ring-neon/50"
                  >
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>

                <div className="overflow-y-auto p-5">
                  <img
                    src={product.imageUrl}
                    alt={content.name}
                    style={{ objectPosition: product.imagePosition }}
                    className="aspect-[16/9] w-full rounded-xl border border-neon/15 object-cover"
                  />

                  <Dialog.Description className="mt-4 text-sm leading-7 text-muted-foreground">
                    {content.description}
                  </Dialog.Description>

                  <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="glass rounded-xl p-3">
                      <dt className="text-xs text-muted-foreground">
                        {t.experience.overview}
                      </dt>
                      <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                        {formatCurrency(product.price)}
                      </dd>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <dt className="text-xs text-muted-foreground">
                        {t.experience.availability}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-emerald-300">
                        {content.stock}
                      </dd>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <dt className="text-xs text-muted-foreground">
                        {t.common.warranty}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        {content.warranty}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5">
                    <p className="text-xs font-semibold tracking-[0.18em] text-neon uppercase">
                      {t.experience.specifications}
                    </p>
                    <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2" role="list">
                      {content.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <NeonButton
                    nativeButton={false}
                    render={<Link to={quoteTo} />}
                    className="mt-6 w-full gap-2"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    {t.cards.quoteComponent}
                  </NeonButton>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>

          <NeonButton
            nativeButton={false}
            render={<Link to={quoteTo} />}
            className="flex-1 gap-2"
          >
            <MessageCircle className="size-4" aria-hidden />
            {t.cards.quoteComponent}
          </NeonButton>
        </div>
      </div>
    </article>
  )
}
