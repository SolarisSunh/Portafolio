import { Outlet } from 'react-router-dom'

import { StoreFooter } from '@/components/store/StoreFooter'
import { StoreHeader } from '@/components/store/StoreHeader'
import { useI18n } from '@/lib/useI18n'

/**
 * Shell for the futuristic store: deep showroom backdrop, skip link, holographic
 * header and footer. Provides the routed <Outlet /> as the main landmark.
 */
export function StoreLayout() {
  const { t } = useI18n()

  return (
    <div className="store-shell flex min-h-svh flex-col">
      <span
        aria-hidden
        className="holo-grid pointer-events-none fixed inset-0 opacity-[0.35]"
      />
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-16 rounded-lg bg-neon px-4 py-2 text-sm font-medium text-[oklch(0.13_0.02_260)] opacity-0 transition-all focus:pointer-events-auto focus:translate-y-0 focus:opacity-100"
      >
        {t.layout.skip}
      </a>
      <StoreHeader />
      <main
        id="main-content"
        className="relative mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14"
      >
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  )
}
