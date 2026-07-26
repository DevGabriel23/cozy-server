---
name: astro-tailwind-rules
description: Reglas estrictas de UI, estilos y diseño para el proyecto Cozy Server. Usar SIEMPRE que se modifique o cree un componente .astro.
---

## Stack

- **Framework:** Astro (archivos `.astro`)
- **CSS:** Tailwind CSS v4 con `@theme` para tokens personalizados
- **Tipografía:** Fraunces Variable (heading), Quicksand Variable (body), Geist Mono (code)
- **Plugin:** `@tailwindcss/typography` para contenido Prose

## Design System Tokens

Definidos en `src/styles/global.css` dentro de `@theme`. Tailwind genera automáticamente las clases utilitarias correspondientes.

### Colores Semánticos

| Token Tailwind | Variable CSS | Uso |
|---|---|---|
| `bg-canvas` | `--color-canvas: #faf6f0` | Fondo principal de página |
| `bg-surface` | `--color-surface: #f2eadf` | Tarjetas, contenedores, modales |
| `bg-surface-hover` | `--color-surface-hover: #eae0d3` | Hover de superficies |
| `bg-brand-sage` | `--color-brand-sage: #8a9a5b` | Botones primarios, acentos |
| `bg-brand-sage-deep` | `--color-brand-sage-deep: #6b7b45` | Hover de primarios |
| `bg-brand-sage-soft` | `--color-brand-sage-soft: #dce3c8` | Tags, badges, fondos sutiles |
| `text-ink-primary` | `--color-ink-primary: #4a4036` | Texto principal |
| `text-ink-secondary` | `--color-ink-secondary: #6d645a` | Texto secundario |
| `text-ink-muted` | `--color-ink-muted: #968f88` | Texto terciario |
| `text-on-dark` | `--color-on-dark: #faf6f0` | Texto sobre fondos oscuros |
| `border-hairline` | `--color-hairline: #e1d8c9` | Bordes sutiles |
| `text-brand-sage` | `--color-brand-sage` | Enlaces, acentos de color |
| `text-brand-sage-deep` | `--color-brand-sage-deep` | Enlaces hover |

### Tipografía

| Token Tailwind | Variable CSS | Uso |
|---|---|---|
| `font-heading` | `--font-heading: "Fraunces Variable", serif` | Títulos, headings |
| `font-body` | `--font-body: "Quicksand Variable", sans-serif` | Texto general |
| `font-code` | `--font-code: "Geist Mono", monospace` | Código, IPs |

### Sombras

| Token Tailwind | Variable CSS | Valor |
|---|---|---|
| `shadow-soft` | `--shadow-soft` | `0 8px 30px rgba(74, 64, 54, 0.06)` — Cards por defecto |
| `shadow-hover` | `--shadow-hover` | `0 12px 40px rgba(74, 64, 54, 0.12)` — Hover states |
| `shadow-inner-inset` | `--shadow-inner-inset` | `inset 0 2px 4px rgba(74, 64, 54, 0.04)` — Inset sutil |

### Border Radius

| Token Tailwind | Variable CSS | Valor |
|---|---|---|
| `rounded-sm` | `--radius-sm` | `8px` — Botones pequeños, inputs |
| `rounded-md` | `--radius-md` | `16px` — Iconos, avatares |
| `rounded-lg` | `--radius-lg` | `24px` — Cards, contenedores |
| `rounded-xl` | `--radius-xl` | `32px` — Cards grandes |
| `rounded-full` | `--radius-full` | `9999px` — Badges, pills |

## Reglas Estrictas

### 1. Cero CSS en componentes

**Prohibido** usar etiquetas `<style>` en componentes `.astro`. Todo el estilizado se hace mediante clases utilitarias de Tailwind directamente en el HTML.

- NO usar `<style>`, `<style is:global>`, ni `<style is:inline>`
- Si necesitas estilos globales, van en `src/styles/global.css`
- Excepción: animaciones `@keyframes` que no puedan expresarse con utilidades de Tailwind (evaluar caso por caso)

### 2. Usar tokens, no valores arbitrarios

Siempre usar las clases utilitarias generadas por los tokens del Design System:

```astro
<!-- BIEN -->
<div class="bg-surface border border-hairline rounded-xl shadow-soft">

<!-- MAL -->
<div class="bg-[#f2eadf] border border-[#e1d8c9] rounded-[32px] shadow-[0_8px_30px_rgba(74,64,54,0.06)]">
```

### 3. Sombras: usar clases cortas

Las variables `--shadow-soft` y `--shadow-hover` generan clases utilitarias automáticamente en Tailwind v4. **NUNCA** convertir a valores arbitrarios:

```astro
<!-- BIEN -->
<div class="shadow-soft hover:shadow-hover">

<!-- MAL -->
<div class="shadow-[var(--shadow-soft)]">
<div class="shadow-(--shadows-soft)">
```

### 4. Border radius: usar tokens

Reemplazar siempre valores hardcodeados por sus tokens:

```astro
<!-- BIEN -->
<div class="rounded-xl">

<!-- MAL -->
<div class="rounded-[32px]">
```

### 5. Colores: usar semánticos

Nunca usar escalas de color raw (stone, slate, gray, etc.) ni valores hex. Usar los tokens semánticos del Design System:

```astro
<!-- BIEN -->
<p class="text-ink-primary">...</p>
<button class="bg-brand-sage text-on-dark">...</button>

<!-- MAL -->
<p class="text-stone-800">...</p>
<button class="bg-[#8a9a5b] text-[#faf6f0]">...</button>
```

### 6. Opacidad: sintaxis moderna

Usar la sintaxis de opacidad de Tailwind v4:

```astro
<!-- BIEN -->
<div class="bg-surface/80 backdrop-blur-md">

<!-- MAL -->
<div class="bg-surface bg-opacity-80">
```
