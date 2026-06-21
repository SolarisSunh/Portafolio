# Kronos PC — Futuristic Storefront Migration Plan

This document maps the existing Kronos PC application before redesigning the
presentation layer into a premium futuristic technology store. The business
architecture (data, i18n, currency, quote flow) is **preserved unchanged**; only
the UI/route layer is replaced.

## 0. Setup & Rollback Strategy

- `Newebinfo/` is a self-contained copy of the original app (`webinfo/kronos`).
- The original project remains untouched as the ultimate rollback.
- Inside `Newebinfo/` git:
  - `backup/original-kronos` — the working baseline (validated `npm run build`).
  - `redesign/futuristic-store` — active redesign branch.
- Old pages stay accessible on the backup branch until validation passes.

## 1. Existing Business Functionality

| Capability | Source | Status |
| --- | --- | --- |
| Browse components (filter by category) | `pages/ProductsPage.tsx` + `data/components.ts` | Preserve |
| Browse prebuilt systems (gaming/creator/office) | `pages/PrebuiltPage.tsx` + `data/prebuilts.ts` | Preserve |
| Browse repair services | `pages/RepairPage.tsx` + `data/services.ts` | Preserve |
| Company info | `pages/AboutPage.tsx` | Preserve |
| Quote/contact via mailto | `pages/ContactPage.tsx` | Preserve |
| Language switching (ES/EN/FR) | `lib/I18nProvider`, `LanguageSwitcher` | Preserve |
| Currency conversion (MXN/USD/EUR) | `lib/I18nProvider.formatCurrency` | Preserve |

## 2. Data Sources (unchanged, reused via adapters/components)

- `src/data/types.ts` — `ComponentProduct`, `PrebuiltPC`, `RepairServiceItem`, `Localized<T>`.
- `src/data/components.ts` — `componentsCatalog`, `COMPONENT_CATEGORIES` (`GPU CPU RAM Storage Motherboard PSU`).
- `src/data/prebuilts.ts` — `prebuiltSystems` (kinds: `gaming | creator | office`).
- `src/data/services.ts` — `repairServices`.

**Rule:** no property renames, no interface changes, no data deletion.

## 3. Translation Dependencies (unchanged keys)

- `src/lib/translations.ts` — `es | en | fr`; namespaces: `meta, nav, header, layout,
  footer, common, prebuiltKinds, categories, home, products, prebuilts, repair,
  about, contact, cards`.
- All existing keys are reused by the new pages.
- New microcopy for the futuristic UI is added as a **purely additive** `experience`
  namespace in all three locales (no existing key is modified or removed), keeping
  the `as const` type contract intact.

## 4. Currency Conversion Dependencies

- `useI18n().formatCurrency(usdAmount)` converts USD base prices → active currency
  using live `frankfurter.app` rates with `fallbackRates`.
- All new product/system/service displays call `formatCurrency` exactly as the
  originals did. Prices remain USD-based in data.

## 5. Quote / Contact Flow

- Links shaped as `/contact?topic=<encoded>` open the contact form with a prefilled topic.
- The form composes a `mailto:cotizaciones@kronospc.com` message — **no backend**.
- After redesign the canonical route is `/quote`; `/contact` redirects to `/quote`
  and continues to honor the `?topic=` param. All new "Quote"/"Request"/"Schedule"
  CTAs point to `/quote?topic=...`.

## 6. Route Migration Map

| Old Route | New Route | Concept |
| --- | --- | --- |
| `/` | `/` | Futuristic Store Lobby |
| `/products` | `/store` | Interactive Marketplace |
| `/prebuilt` | `/systems` | Systems Showroom |
| `/repair` | `/lab` | Repair & Diagnostics Center |
| `/about` | `/company` | About Kronos PC |
| `/contact` | `/quote` | Contact & Quote Center |

Old routes are kept as `<Navigate replace>` redirects (preserving query strings for
`/contact` → `/quote`) so bookmarks and internal links never break.

## 7. New Component Inventory (`src/components/store/`)

`StoreLayout`, `StoreHeader`, `StoreFooter`, `GlassPanel`, `HologramPanel`,
`NeonButton`, `FuturisticSectionHeading`, `DepartmentCard`, `ProductTerminal`,
`SystemsShowcaseCard`, `DiagnosticsCard`.

## 8. Performance & Accessibility Budget

- CSS-only effects (gradients, glass blur, transforms). No WebGL/Three/canvas/video/particles.
- All motion gated behind `motion-safe`; `prefers-reduced-motion` disables transitions.
- Preserve: skip link, focus-visible rings, `aria-pressed` filters, `aria-label`s,
  semantic landmarks, alt text. Dark theme with accessible contrast.

## 9. Phased Delivery

1. Design system + reusable components.
2. Homepage lobby.
3. Marketplace (`/store`).
4. Systems showroom (`/systems`).
5. Repair lab (`/lab`).
6. Company (`/company`).
7. Quote center (`/quote`).
8. Validation: build, lint, TS, 3 locales, currency, mailto, responsive, a11y.
