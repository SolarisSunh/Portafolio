import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NeonTone = 'solid' | 'outline' | 'ghost'

interface NeonButtonProps extends Omit<ComponentProps<typeof Button>, 'variant'> {
  tone?: NeonTone
}

const toneClass: Record<NeonTone, string> = {
  solid:
    'bg-neon text-[oklch(0.13_0.02_260)] hover:bg-neon-soft shadow-[0_0_26px_-8px_var(--color-neon)] hover:shadow-[0_0_34px_-6px_var(--color-neon)]',
  outline:
    'border-neon/45 bg-neon/5 text-neon hover:border-neon hover:bg-neon/12 hover:text-neon-soft',
  ghost:
    'border-transparent bg-transparent text-foreground/80 hover:bg-white/5 hover:text-foreground',
}

/**
 * Neon-accented action built on top of the existing Base UI Button so it keeps
 * focus-visible rings, the `render` prop (for router links) and disabled states.
 */
export function NeonButton({
  className,
  tone = 'solid',
  ...props
}: NeonButtonProps) {
  return (
    <Button
      variant={tone === 'outline' ? 'outline' : tone === 'ghost' ? 'ghost' : 'default'}
      className={cn(
        'h-10 rounded-xl px-4 font-medium transition-all duration-200',
        toneClass[tone],
        className
      )}
      {...props}
    />
  )
}
