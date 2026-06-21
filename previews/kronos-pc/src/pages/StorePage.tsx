import { useMemo, useState } from 'react'
import {
  Cpu,
  CircuitBoard,
  HardDrive,
  LayoutGrid,
  MemoryStick,
  Plug,
  MonitorPlay,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { FuturisticSectionHeading } from '@/components/store/FuturisticSectionHeading'
import { ProductTerminal } from '@/components/store/ProductTerminal'
import { COMPONENT_CATEGORIES, componentsCatalog } from '@/data/components'
import type { ComponentCategory } from '@/data/types'
import { useI18n } from '@/lib/useI18n'
import { cn } from '@/lib/utils'

type Filter = ComponentCategory | 'All'

const categoryIcons: Record<ComponentCategory, LucideIcon> = {
  GPU: MonitorPlay,
  CPU: Cpu,
  RAM: MemoryStick,
  Storage: HardDrive,
  Motherboard: CircuitBoard,
  PSU: Plug,
}

export function StorePage() {
  const [category, setCategory] = useState<Filter>('All')
  const { t } = useI18n()

  const filtered = useMemo(() => {
    if (category === 'All') return componentsCatalog
    return componentsCatalog.filter((p) => p.category === category)
  }, [category])

  const chips: { value: Filter; label: string; icon: LucideIcon }[] = [
    { value: 'All', label: t.products.all, icon: LayoutGrid },
    ...COMPONENT_CATEGORIES.map((c) => ({
      value: c as Filter,
      label: t.categories[c],
      icon: categoryIcons[c],
    })),
  ]

  return (
    <div className="space-y-10">
      <FuturisticSectionHeading
        level={1}
        eyebrow={t.products.eyebrow}
        title={t.products.title}
        description={t.products.description}
        align="left"
      />

      {/* Holographic category selector */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-neon uppercase">
            <span className="flex size-1.5 rounded-full bg-emerald-400" aria-hidden />
            {t.experience.catalogStatus}
          </span>
          <span className="text-xs text-muted-foreground">
            {t.products.count(filtered.length)}
          </span>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="toolbar"
          aria-label={t.experience.selectCategoryAria}
        >
          {chips.map(({ value, label, icon: Icon }) => {
            const active = category === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={active}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium outline-none transition-all focus-visible:ring-3 focus-visible:ring-neon/50',
                  active
                    ? 'border-neon/60 bg-neon/15 text-neon shadow-[0_0_22px_-8px_var(--color-neon)]'
                    : 'border-neon/15 bg-white/2 text-muted-foreground hover:border-neon/35 hover:text-foreground'
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" role="list">
        {filtered.map((product) => (
          <li key={product.id}>
            <ProductTerminal product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
