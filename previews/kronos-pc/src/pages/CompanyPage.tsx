import { CheckCircle2, Cpu, ShieldCheck, Wrench } from 'lucide-react'

import { FuturisticSectionHeading } from '@/components/store/FuturisticSectionHeading'
import { HologramPanel } from '@/components/store/HologramPanel'
import { useI18n } from '@/lib/useI18n'

const valueIcons = [Cpu, CheckCircle2, Wrench, ShieldCheck] as const

export function CompanyPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-14">
      <FuturisticSectionHeading
        level={1}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        description={t.about.description}
        align="left"
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.about.values.map(({ title, body }, index) => {
          const Icon = valueIcons[index]
          return (
            <article key={title} className="glass rounded-2xl p-6">
              <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-neon/12 text-neon ring-1 ring-neon/30">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="font-heading text-base font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-10 border-y border-neon/15 py-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-neon uppercase">
            {t.about.processEyebrow}
          </p>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {t.about.processTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {t.about.processDescription}
          </p>
        </div>
        <ol className="grid gap-3">
          {t.about.process.map((step, index) => (
            <li
              key={step}
              className="glass flex gap-4 rounded-xl p-4"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neon/15 text-sm font-semibold text-neon">
                {index + 1}
              </span>
              <span className="text-sm leading-6 text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {t.about.labTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {t.about.labDescription}
          </p>
        </div>
        <HologramPanel className="overflow-hidden p-0">
          <img
            src="/images/kronos-repair-bench.png"
            alt={t.about.labAlt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </HologramPanel>
      </section>
    </div>
  )
}
