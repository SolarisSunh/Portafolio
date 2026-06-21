import type { Locale } from '@/lib/locales'

export type ComponentCategory =
  | 'GPU'
  | 'CPU'
  | 'RAM'
  | 'Storage'
  | 'Motherboard'
  | 'PSU'

export type Localized<T> = Record<Locale, T>

export interface ComponentProductCopy {
  name: string
  description: string
  badge?: string
  stock: string
  warranty: string
  features: string[]
}

export interface ComponentProduct {
  id: string
  price: number
  category: ComponentCategory
  imageUrl: string
  imagePosition?: string
  content: Localized<ComponentProductCopy>
}

export type PrebuiltKind = 'gaming' | 'creator' | 'office'

export interface PrebuiltPCCopy {
  name: string
  tagline: string
  specs: string[]
  audience: string
  leadTime: string
  warranty: string
}

export interface PrebuiltPC {
  id: string
  kind: PrebuiltKind
  price: number
  imageUrl: string
  imagePosition?: string
  content: Localized<PrebuiltPCCopy>
}

export interface RepairServiceCopy {
  title: string
  description: string
  duration: string
  includes: string[]
}

export interface RepairServiceItem {
  id: string
  priceFrom: number
  content: Localized<RepairServiceCopy>
}
