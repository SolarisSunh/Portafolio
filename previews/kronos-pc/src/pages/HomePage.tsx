import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bolt,
  Cpu,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

import { DepartmentCard } from '@/components/store/DepartmentCard'
import { FuturisticSectionHeading } from '@/components/store/FuturisticSectionHeading'
import { HologramPanel } from '@/components/store/HologramPanel'
import { NeonButton } from '@/components/store/NeonButton'
import { SystemsShowcaseCard } from '@/components/store/SystemsShowcaseCard'
import { prebuiltSystems } from '@/data/prebuilts'
import { useI18n } from '@/lib/useI18n'

const departmentMeta = [
  { to: '/store', icon: Cpu },
  { to: '/systems', icon: Sparkles },
  { to: '/lab', icon: Wrench },
] as const

const assuranceIcons = [Bolt, ShieldCheck, Headphones] as const

export function HomePage() {
  const { t } = useI18n()
  const featured = prebuiltSystems.slice(0, 3)

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* Store entrance */}
      <section className="kr-rise relative -mx-4 overflow-hidden rounded-b-3xl border-b border-neon/15 sm:-mx-6">
        <img
          src="/images/kronos-hero-pc.png"
          alt={t.home.heroAlt}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.02_262)] via-[oklch(0.12_0.02_262)]/85 to-transparent"
        />
        <span aria-hidden className="holo-grid absolute inset-0 opacity-30" />
        <span
          aria-hidden
          className="absolute -left-20 top-1/3 size-72 rounded-full bg-neon/20 blur-[90px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
              <span className="flex size-1.5 rounded-full bg-emerald-400" aria-hidden />
              {t.experience.statusOnline}
            </span>
            <p className="mt-5 text-sm font-semibold tracking-[0.18em] text-neon uppercase">
              {t.experience.lobbyEyebrow}
            </p>
            <h1 className="mt-3 font-heading text-balance text-4xl font-semibold text-foreground neon-text sm:text-5xl lg:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t.home.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <NeonButton
                nativeButton={false}
                render={<Link to="/systems" />}
                className="h-11 gap-2 px-6 text-base"
              >
                {t.home.primaryCta}
                <ArrowRight className="size-4" aria-hidden />
              </NeonButton>
              <NeonButton
                tone="outline"
                nativeButton={false}
                render={<Link to="/store" />}
                className="h-11 px-6 text-base"
              >
                {t.home.secondaryCta}
              </NeonButton>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              {t.home.stats.map((item) => (
                <div key={item.label} className="border-l border-neon/30 pl-3">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 text-xl font-semibold text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Central service desk */}
      <section aria-labelledby="service-desk-heading">
        <HologramPanel grid className="p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-neon uppercase">
                <span aria-hidden className="h-px w-6 bg-neon/60" />
                {t.experience.deskEyebrow}
              </p>
              <h2
                id="service-desk-heading"
                className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
              >
                {t.experience.deskTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {t.experience.deskBody}
              </p>
            </div>
            <ul className="grid gap-3" role="list">
              {t.experience.deskPoints.map((point) => (
                <li
                  key={point}
                  className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-foreground"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neon/15 text-neon">
                    <ShieldCheck className="size-4" aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </HologramPanel>
      </section>

      {/* Store departments */}
      <section aria-labelledby="departments-heading">
        <FuturisticSectionHeading
          eyebrow={t.experience.departmentsEyebrow}
          title={t.experience.departmentsTitle}
          description={t.experience.departmentsBody}
          id="departments-heading"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {departmentMeta.map(({ to, icon }, index) => {
            const card = t.home.categoryCards[index]
            return (
              <DepartmentCard
                key={to}
                to={to}
                icon={icon}
                title={card.title}
                description={card.description}
                index={index + 1}
              />
            )
          })}
        </div>
      </section>

      {/* Featured systems */}
      <section aria-labelledby="featured-heading">
        <FuturisticSectionHeading
          eyebrow={t.home.featuredEyebrow}
          title={t.home.featuredTitle}
          description={t.home.featuredDescription}
          id="featured-heading"
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {featured.map((pc) => (
            <SystemsShowcaseCard key={pc.id} pc={pc} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <NeonButton
            tone="outline"
            nativeButton={false}
            render={<Link to="/systems" />}
            className="gap-2"
          >
            {t.home.viewAll}
            <ArrowRight className="size-4" aria-hidden />
          </NeonButton>
        </div>
      </section>

      {/* Trust & expertise */}
      <section
        aria-labelledby="trust-heading"
        className="border-y border-neon/15 py-14"
      >
        <FuturisticSectionHeading
          eyebrow={t.home.trustEyebrow}
          title={t.home.trustTitle}
          description={t.home.trustDescription}
          id="trust-heading"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {t.home.assurances.map(({ title, body }, index) => {
            const Icon = assuranceIcons[index]
            return (
              <article key={title} className="glass rounded-2xl p-6">
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-neon/12 text-neon ring-1 ring-neon/30">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Service prompt */}
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <FuturisticSectionHeading
            eyebrow={t.home.serviceEyebrow}
            title={t.home.serviceTitle}
            description={t.home.serviceDescription}
            align="left"
          />
          <NeonButton
            nativeButton={false}
            render={<Link to="/lab" />}
            className="gap-2"
          >
            <PackageCheck className="size-4" aria-hidden />
            {t.home.serviceCta}
          </NeonButton>
        </div>
        <HologramPanel corners={false} className="overflow-hidden p-0">
          <img
            src="/images/kronos-repair-bench.png"
            alt={t.home.serviceAlt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </HologramPanel>
      </section>
    </div>
  )
}
