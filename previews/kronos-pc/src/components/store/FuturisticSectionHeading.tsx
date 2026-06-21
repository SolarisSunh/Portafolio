import { cn } from '@/lib/utils'

interface FuturisticSectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  id?: string
  level?: 1 | 2
}

/**
 * Section heading for the store experience. Mirrors the original SectionHeading
 * API (level/align/id) so pages can swap it in without losing semantics.
 */
export function FuturisticSectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  id,
  level = 2,
}: FuturisticSectionHeadingProps) {
  const TitleTag = level === 1 ? 'h1' : 'h2'
  const titleClass =
    level === 1
      ? 'font-heading text-balance text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl'
      : 'font-heading text-balance text-2xl font-semibold text-foreground sm:text-3xl'

  return (
    <div
      className={cn(
        'mb-10 sm:mb-14',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-neon uppercase',
            align === 'center' && 'justify-center'
          )}
        >
          <span aria-hidden className="h-px w-6 bg-neon/60" />
          {eyebrow}
        </p>
      ) : null}
      <TitleTag id={id} className={cn(titleClass, 'neon-text')}>
        {title}
      </TitleTag>
      {description ? (
        <p className="mt-3 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
