import { Brush, Cpu, Gauge, Search, Wrench } from 'lucide-react'

import { DiagnosticsCard } from '@/components/store/DiagnosticsCard'
import { FuturisticSectionHeading } from '@/components/store/FuturisticSectionHeading'
import { HologramPanel } from '@/components/store/HologramPanel'
import { repairServices } from '@/data/services'
import { useI18n } from '@/lib/useI18n'

const icons = [Search, Wrench, Gauge, Brush, Cpu] as const

export function LabPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <FuturisticSectionHeading
            level={1}
            eyebrow={t.repair.eyebrow}
            title={t.repair.title}
            description={t.repair.description}
            align="left"
          />
        </div>
        <HologramPanel className="overflow-hidden p-0">
          <img
            src="/images/kronos-repair-bench.png"
            alt={t.repair.heroAlt}
            className="aspect-[16/10] w-full object-cover"
          />
        </HologramPanel>
      </section>

      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" role="list">
        {repairServices.map((service, i) => (
          <li key={service.id}>
            <DiagnosticsCard service={service} icon={icons[i % icons.length]} />
          </li>
        ))}
      </ul>
    </div>
  )
}
