# Kronos PC

Documentación del sitio web de Kronos PC, una tienda profesional de componentes, PCs armadas y servicio técnico especializado.

## Resumen

Kronos PC es una aplicación frontend hecha con React, TypeScript, Vite, Tailwind CSS y React Router. El sitio funciona como una tienda/catálogo profesional con:

- Catálogo de componentes filtrable por categoría.
- PCs armadas organizadas por tipo de uso.
- Servicios técnicos con precios desde, tiempos e inclusiones.
- Página institucional de confianza y proceso de trabajo.
- Formulario de contacto que prepara una solicitud por correo.
- Selector de idioma en la parte superior derecha.
- Conversión de moneda según idioma.

El idioma base es español. También se soporta inglés y francés.

## Tecnologías

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Base UI
- Lucide React
- shadcn-style utility components

## Comandos

En Windows, si PowerShell bloquea `npm.ps1`, usa `npm.cmd`.

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
npm.cmd run preview
```

En otros shells normalmente basta con:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Rutas

La aplicación usa `HashRouter`, por lo que las rutas se ven como `/#/products`.

| Ruta | Página | Propósito |
| --- | --- | --- |
| `/` | Inicio | Presenta la propuesta principal, categorías, PCs destacadas y servicio técnico. |
| `/products` | Componentes | Catálogo filtrable de GPUs, CPUs, RAM, almacenamiento, placas madre y fuentes. |
| `/prebuilt` | PCs armadas | Configuraciones listas para cotizar, separadas en gaming, creación y oficina. |
| `/repair` | Servicio técnico | Servicios de diagnóstico, reparación, optimización, limpieza y upgrades. |
| `/about` | Nosotros | Explica valores, proceso de trabajo y taller propio. |
| `/contact` | Contacto | Formulario que genera un correo `mailto:` con la solicitud del cliente. |

## Estructura Principal

```text
src/
  App.tsx                    Rutas principales
  main.tsx                   Punto de entrada, router y proveedor de idioma
  index.css                  Tema visual global y tokens de color
  components/
    LanguageSwitcher.tsx     Selector ES/EN/FR
    ComponentProductCard.tsx Tarjeta de componente
    PrebuiltCard.tsx         Tarjeta de PC armada
    RepairServiceCard.tsx    Tarjeta de servicio técnico
    SectionHeading.tsx       Encabezados reutilizables
    layout/                  Header, footer y layout general
    ui/                      Componentes base de UI
  data/
    components.ts            Catálogo de componentes
    prebuilts.ts             PCs armadas
    services.ts              Servicios técnicos
    types.ts                 Tipos TypeScript de datos localizados
  lib/
    I18nProvider.tsx         Estado global de idioma, moneda y tasas
    translations.ts          Textos de página en ES/EN/FR
    locales.ts               Configuración de idioma, moneda y fallback
    useI18n.ts               Hook para consumir idioma y moneda
```

## Páginas

### Inicio

Archivo: `src/pages/HomePage.tsx`

Muestra:

- Hero principal con imagen de PC.
- CTAs hacia PCs armadas y componentes.
- Estadisticas de confianza.
- Tres categorías principales: componentes, PCs armadas y servicio técnico.
- PCs destacadas.
- Seccion de confianza.
- Bloque de mantenimiento profesional.

Los textos vienen de `src/lib/translations.ts`.

### Componentes

Archivo: `src/pages/ProductsPage.tsx`

Muestra el catálogo de `src/data/components.ts`.

Funciones:

- Filtro por categoría.
- Conteo de productos filtrados.
- Tarjetas con precio convertido, stock, garantía, caracteristicas y botón de cotizacion.

Los precios base se guardan en USD y se convierten según el idioma activo.

### PCs Armadas

Archivo: `src/pages/PrebuiltPage.tsx`

Muestra las configuraciones de `src/data/prebuilts.ts`.

Secciones:

- Gaming
- Creacion / workstation
- Oficina / productividad

Cada tarjeta incluye:

- Precio convertido.
- Publico objetivo.
- Tiempo de entrega.
- Garantía.
- Especificaciones.
- Boton para solicitar cotizacion.

### Servicio Tecnico

Archivo: `src/pages/RepairPage.tsx`

Muestra los servicios de `src/data/services.ts`.

Servicios actuales:

- Diagnostico integral.
- Reparacion de hardware.
- Optimizacion de software.
- Limpieza y mantenimiento.
- Asesoria de actualizacion.

Cada servicio tiene precio desde, duración, descripción e inclusiones.

### Nosotros

Archivo: `src/pages/AboutPage.tsx`

Explica:

- Compatibilidad primero.
- Pruebas reales.
- Servicio responsable.
- Garantía clara.
- Proceso desde cotizacion hasta entrega.
- Taller y banco de pruebas propio.

### Contacto

Archivo: `src/pages/ContactPage.tsx`

El formulario no envia datos a un backend. En su lugar, prepara un correo usando `mailto:`.

Correo configurado:

```ts
const contactEmail = 'cotizaciones@kronospc.com'
```

Campos:

- Nombre
- Correo
- Telefono
- Tema
- Mensaje

Los botónes de cotizacion agregan el tema por query string:

```text
/#/contact?topic=Kronos%20Titan%20X
```

## Idiomas

Idiomas soportados:

| Codigo | Idioma | Moneda |
| --- | --- | --- |
| `es` | Español | MXN |
| `en` | Inglés | USD |
| `fr` | Francés | EUR |

Archivos principales:

- `src/components/LanguageSwitcher.tsx`
- `src/lib/I18nProvider.tsx`
- `src/lib/translations.ts`
- `src/lib/locales.ts`
- `src/lib/useI18n.ts`

El selector se muestra en el header, al lado del botón de cotizar.

El idioma seleccionado se guarda en:

```text
localStorage["kronos-locale"]
```

Al cambiar de idioma también se actualizan:

- Textos visibles.
- `document.title`.
- Meta description.
- Atributo `html lang`.
- Moneda.
- Formato de precios.

## Moneda y Conversión

Todos los precios base estan guardados en USD.

La conversión se maneja en `src/lib/I18nProvider.tsx` con:

```ts
formatCurrency(usdAmount)
```

La app consulta tasas en tiempo real desde:

```text
https://api.frankfurter.app/latest?from=USD&to=MXN,EUR
```

Si la API falla, usa valores de respaldo definidos en `src/lib/locales.ts`:

```ts
export const fallbackRates = {
  USD: 1,
  MXN: 20,
  EUR: 0.92,
}
```

## Datos Editables

### Componentes

Archivo: `src/data/components.ts`

Cada producto tiene:

- `id`
- `price`
- `category`
- `imageUrl`
- `imagePosition`
- `content.es`
- `content.en`
- `content.fr`

Ejemplo de estructura:

```ts
{
  id: 'c-gpu-1',
  price: 689,
  category: 'GPU',
  imageUrl: catalogImage,
  content: {
    es: { name, description, stock, warranty, features },
    en: { name, description, stock, warranty, features },
    fr: { name, description, stock, warranty, features },
  },
}
```

Categorias disponibles:

- `GPU`
- `CPU`
- `RAM`
- `Storage`
- `Motherboard`
- `PSU`

Los nombres visibles de categorías se traducen en `src/lib/translations.ts`.

### PCs Armadas

Archivo: `src/data/prebuilts.ts`

Cada PC tiene:

- `id`
- `kind`
- `price`
- `imageUrl`
- `imagePosition`
- `content.es/en/fr`

Tipos disponibles:

- `gaming`
- `creator`
- `office`

### Servicios

Archivo: `src/data/services.ts`

Cada servicio tiene:

- `id`
- `priceFrom`
- `content.es/en/fr`

El contenido incluye:

- `title`
- `description`
- `duration`
- `includes`

## Imágenes

Las imágenes principales estan en:

```text
public/images/
  kronos-hero-pc.png
  kronos-components-catalog.png
  kronos-prebuilt-showroom.png
  kronos-repair-bench.png
  kronos-titan-mk4.png
```

Uso actual:

- `kronos-hero-pc.png`: hero de inicio.
- `kronos-components-catalog.png`: tarjetas de componentes.
- `kronos-prebuilt-showroom.png`: tarjetas de PCs armadas.
- `kronos-repair-bench.png`: páginas de servicio, nosotros e inicio.

## Componentes Reutilizables

### `LanguageSwitcher`

Selector de idioma ES/EN/FR. Consume `useI18n()` y actualiza el idioma global.

### `ComponentProductCard`

Tarjeta para componentes. Muestra:

- Imagen.
- Categoria traducida.
- Badge.
- Nombre y descripción.
- Precio convertido.
- Stock.
- Garantía.
- Caracteristicas.
- CTA a contacto.

### `PrebuiltCard`

Tarjeta para PCs armadas. Muestra:

- Imagen.
- Tipo traducido.
- Nombre.
- Precio convertido.
- Tagline.
- Publico objetivo.
- Tiempo de entrega.
- Garantía.
- Especificaciones.
- CTA a contacto.

### `RepairServiceCard`

Tarjeta para servicios. Muestra:

- Icono.
- Titulo y descripción.
- Precio desde convertido.
- Duracion.
- Inclusiones.
- CTA a contacto.

### `SectionHeading`

Componente para encabezados de sección. Acepta:

- `eyebrow`
- `title`
- `description`
- `align`
- `id`
- `level`

## Layout

### Header

Archivo: `src/components/layout/SiteHeader.tsx`

Incluye:

- Logo Kronos PC.
- Navegacion principal.
- Boton de cotizar.
- Selector de idioma.
- Menu movil.

### Footer

Archivo: `src/components/layout/SiteFooter.tsx`

Incluye:

- Resumen de marca.
- Links de navegación.
- Enlace de solicitud de atención.
- Copyright.

### MainLayout

Archivo: `src/components/layout/MainLayout.tsx`

Envuelve:

- Skip link accesible.
- Header.
- Contenido principal.
- Footer.

## Estilos

Archivo principal:

```text
src/index.css
```

Define:

- Tema oscuro base.
- Variables de color.
- Fuente Geist.
- Tokens de Tailwind.
- Estilos base del body.

Componentes UI base:

```text
src/components/ui/
```

## Accesibilidad

El sitio incluye:

- `alt` en imágenes informativas.
- `aria-label` en navegaciones y toolbars.
- `aria-pressed` en botónes de filtro e idioma.
- Skip link hacia el contenido principal.
- Estados de formulario con `role="status"`.

## Mantenimiento Común

### Agregar un componente

1. Abre `src/data/components.ts`.
2. Agrega un objeto nuevo en `componentsCatalog`.
3. Usa precio base en USD.
4. Completa `content.es`, `content.en` y `content.fr`.
5. Si usas una categoría nueva, agrega el tipo en `src/data/types.ts` y sus traducciones en `src/lib/translations.ts`.

### Agregar una PC armada

1. Abre `src/data/prebuilts.ts`.
2. Agrega una entrada en `prebuiltSystems`.
3. Define `kind` como `gaming`, `creator` u `office`.
4. Completa textos en los tres idiomas.

### Agregar un servicio

1. Abre `src/data/services.ts`.
2. Agrega una entrada en `repairServices`.
3. Completa `priceFrom` y `content` en los tres idiomas.
4. Si hace falta otro icono, edita `src/pages/RepairPage.tsx`.

### Cambiar textos generales

Edita:

```text
src/lib/translations.ts
```

Cada bloque tiene tres versiones:

- `es`
- `en`
- `fr`

### Cambiar moneda de un idioma

Edita:

```text
src/lib/locales.ts
```

Campos importantes:

- `currency`
- `intlLocale`
- `fallbackRates`

Si agregas otra moneda, también actualiza la consulta de tasas en `src/lib/I18nProvider.tsx`.

### Cambiar correo de contacto

Edita:

```text
src/pages/ContactPage.tsx
```

Busca:

```ts
const contactEmail = 'cotizaciones@kronospc.com'
```

## Build y Salida de Producción

Para generar archivos de producción:

```bash
npm.cmd run build
```

La salida queda en:

```text
dist/
```

Para probar el build:

```bash
npm.cmd run preview
```

## Estado Actual

El sitio es frontend-only. No hay:

- Backend.
- Base de datos.
- Checkout real.
- Pasarela de pago.
- Envio real de formularios.

El contacto se resuelve con `mailto:` y el catálogo funciona como tienda/cotizador profesional.


