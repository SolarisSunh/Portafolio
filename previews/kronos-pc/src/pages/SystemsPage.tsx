import { FuturisticSectionHeading } from '@/components/store/FuturisticSectionHeading'
import { SystemsShowcaseCard } from '@/components/store/SystemsShowcaseCard'
import { prebuiltSystems } from '@/data/prebuilts'
import { useI18n } from '@/lib/useI18n'

const sectionOrder = [
  { id: 'gaming-heading', kind: 'gaming' },
  { id: 'creator-heading', kind: 'creator' },
  { id: 'office-heading', kind: 'office' },
] as const

export function SystemsPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-16 sm:space-y-20">
      <FuturisticSectionHeading
        level={1}
        eyebrow={t.prebuilts.eyebrow}
        title={t.prebuilts.title}
        description={t.prebuilts.description}
        align="left"
      />

      {sectionOrder.map((section) => {
        const systems = prebuiltSystems.filter((p) => p.kind === section.kind)
        const sectionText = t.prebuilts.sections[section.kind]

        return (
          <section key={section.id} aria-labelledby={section.id}>
            <div className="mb-8 max-w-2xl">
              <h2
                id={section.id}
                className="flex items-center gap-3 font-heading text-2xl font-semibold text-foreground"
              >
                <span aria-hidden className="h-5 w-1 rounded-full bg-neon" />
                {sectionText.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {sectionText.description}
              </p>
            </div>
            <ul className="grid gap-8 lg:grid-cols-2" role="list">
              {systems.map((pc) => (
                <li key={pc.id}>
                  <SystemsShowcaseCard pc={pc} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
