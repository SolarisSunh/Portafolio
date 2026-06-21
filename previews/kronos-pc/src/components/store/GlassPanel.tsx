import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface GlassPanelProps extends ComponentProps<'div'> {
  strong?: boolean
}

/**
 * Glassmorphism surface used as the base of every futuristic panel.
 * Pure CSS (blur + translucent fill + hairline border), no runtime cost.
 */
export function GlassPanel({
  className,
  strong = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'rounded-2xl',
        className
      )}
      {...props}
    />
  )
}
