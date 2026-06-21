import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface HologramPanelProps extends ComponentProps<'div'> {
  /** Show the faint holographic grid texture inside the panel. */
  grid?: boolean
  /** Render neon corner brackets for a heads-up-display feel. */
  corners?: boolean
  /** Add the neon edge glow. */
  glow?: boolean
}

const cornerBase =
  'pointer-events-none absolute size-4 border-neon/60'

/**
 * A glass surface dressed as a holographic terminal: optional grid texture,
 * neon edge glow and corner brackets. All decoration is CSS-only and aria-hidden.
 */
export function HologramPanel({
  className,
  grid = false,
  corners = true,
  glow = true,
  children,
  ...props
}: HologramPanelProps) {
  return (
    <div
      className={cn(
        'glass relative overflow-hidden rounded-2xl',
        glow && 'neon-edge',
        className
      )}
      {...props}
    >
      {grid ? (
        <span
          aria-hidden
          className="holo-grid pointer-events-none absolute inset-0 opacity-70"
        />
      ) : null}

      {corners ? (
        <>
          <span aria-hidden className={cn(cornerBase, 'left-2 top-2 border-l-2 border-t-2 rounded-tl-sm')} />
          <span aria-hidden className={cn(cornerBase, 'right-2 top-2 border-r-2 border-t-2 rounded-tr-sm')} />
          <span aria-hidden className={cn(cornerBase, 'bottom-2 left-2 border-b-2 border-l-2 rounded-bl-sm')} />
          <span aria-hidden className={cn(cornerBase, 'bottom-2 right-2 border-b-2 border-r-2 rounded-br-sm')} />
        </>
      ) : null}

      <div className="relative">{children}</div>
    </div>
  )
}
