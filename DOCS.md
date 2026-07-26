# 🗺️ Radiografía del Proyecto: Cozy Server

Documentación viva y fuente de verdad sobre la arquitectura, estado de desarrollo, modelos de datos y sistema de diseño del sitio web oficial de **Cozy Server**.

---

## 1. Visión General y Stack Tecnológico

**Cozy Server** es una plataforma web para la comunidad de un servidor privado de **Minecraft Bedrock**, diseñada con un enfoque acogedor, *aesthetic* y moderno. Su propósito principal es brindar información del servidor (IP, puerto), catálogo de addons/texture packs, normas comunitarias, canal de soporte directo a WhatsApp y una galería multimedia interactiva para los jugadores.

### Stack Tecnológico Principal

| Capa | Tecnología | Descripción / Rol |
|---|---|---|
| **Core Framework** | [Astro v5.0+](https://astro.build) | Generación de sitio estático/híbrido (SSG/Island Architecture) con navegación spa-like mediante `ClientRouter` (`astro:transitions`). |
| **Estilos & UI** | [Tailwind CSS v4](https://tailwindcss.com) | Motor CSS de nueva generación mediante `@tailwindcss/vite` y configuración de tokens en `@theme`. |
| **Tipografía** | Fontsource | `@fontsource-variable/fraunces` (Headings) y `@fontsource-variable/quicksand` (Body). |
| **Tipografía Code** | Geist Mono | `Geist Mono` para despliegue de comandos, direcciones IP y puertos. |
| **Prose / Markdown** | `@tailwindcss/typography` | Estilizado automático para contenido renderizado desde ficheros Markdown. |
| **Modelado de Datos** | Astro Content Collections + Zod | Carga de datos mediante `astro/loaders` (`glob`) y esquemas tipados con Zod en `src/content.config.ts`. |
| **Lógica de Cliente** | Vanilla JavaScript | Scripts nativos ligeros integrados en componentes `.astro` reaccionando al ciclo de vida `astro:page-load`. |
| **Tipado** | TypeScript v6 | Tipado estático para colecciones, galerías y utilidades del sistema. |

---

## 2. Arquitectura de Carpetas

A continuación se presenta la estructura de directorios del proyecto, omitiendo carpetas generadas o del entorno (`node_modules`, `.git`, `.astro`, `dist`):

```text
cozy-server/
├── .opencode/
│   └── skills/
│       └── astro-tailwind/
│           └── SKILL.md            # Reglas estrictas de UI, diseño y tokens de Tailwind
├── public/
│   ├── favicon.svg                 # Branding e iconografía estática
│   ├── gallery/                    # Activos multimedia estáticos (imágenes de la galería)
│   └── images/                     # Covers y capturas estructuradas por ID de addon
├── src/
│   ├── components/                 # Componentes de UI reutilizables
│   │   ├── icons/                  # SVGs e iconos estáticos (Discord, Whatsapp, etc.)
│   │   │   ├── Discord.astro
│   │   │   ├── IconDownload.astro
│   │   │   ├── IconLink.astro
│   │   │   └── Whatsapp.astro
│   │   ├── AddonCard.astro         # Card genérica para addons (variantes grid y compact)
│   │   ├── AddonsGrid.astro        # Grilla contenedora de catálogo de addons
│   │   ├── Footer.astro            # Pie de página comunitarios y redes
│   │   ├── Gallery.astro           # Galería de capturas para vista de detalle de addons
│   │   ├── GalleryModal.astro      # Lightbox / Modal extendido para publicaciones de la galería
│   │   ├── GalleryPost.astro       # Card interactiva de publicación multimedia
│   │   ├── Hero.astro              # Sección principal con copiado de IP/Puerto
│   │   ├── NavBar.astro            # Navegación fija con efecto blur y menú móvil
│   │   ├── Prose.astro             # Wrapper tipográfico para contenido Markdown
│   │   └── SupportForm.astro       # Formulario dinámico de reportes a WhatsApp
│   ├── content/
│   │   └── addons/                 # Entradas de contenido Markdown (.md) para cada addon
│   │       ├── actions-and-stuff.md
│   │       ├── cakes-and-bakes.md
│   │       ├── crops-and-farms.md
│   │       ├── furniture-life-2.md
│   │       ├── gardening.md
│   │       ├── slice-of-life.md
│   │       └── trains.md
│   ├── data/                       # Fuentes de datos estáticas e interfaces TypeScript
│   │   ├── galleryPosts.ts         # Lista de publicaciones de la galería comunitaria
│   │   └── tags.ts                 # Catálogo global de etiquetas de la galería
│   ├── layouts/
│   │   └── Layout.astro            # Base HTML, metadatos SEO globales y ClientRouter
│   ├── pages/                      # Enrutamiento basado en archivos de Astro
│   │   ├── addons/
│   │   │   └── [slug].astro        # Ruta dinámica estática para el detalle de addons
│   │   ├── gallery.astro           # Vista principal de la galería de la comunidad
│   │   ├── index.astro             # Landing page (Hero + AddonsGrid)
│   │   ├── rules.astro             # Página de normas de convivencia
│   │   └── support.astro           # Página de centro de soporte y reportes
│   ├── styles/
│   │   └── global.css              # Importaciones Tailwind v4, fuentes y tokens @theme
│   ├── utils/                      # Funciones auxiliares y lógica reutilizable
│   │   ├── addonResolver.ts        # Resuelve dinámicamente coberturas y capturas locales
│   │   ├── dateUtils.ts            # Formateador de fechas relativas ("Hace X días")
│   │   └── imageUtils.ts           # Generador de imágenes placeholder dinámicas
│   └── content.config.ts           # Definición y validación Zod de colecciones de contenido
├── AGENTS.md                       # Instrucciones de ejecución del entorno (dev server)
├── astro.config.mjs                # Configuración global de Astro
├── package.json                    # Dependencias y scripts de proyecto
└── tsconfig.json                   # Configuración del compilador TypeScript
```

### Responsabilidad de Directorios Clave

- **`.opencode/skills/`**: Contiene la definición formal del Design System (`SKILL.md`) con las reglas de estilo y restricciones para el desarrollo.
- **`src/content/` & `src/content.config.ts`**: Gestiona el contenido estructurado del sitio mediante esquemas Zod rigurosos.
- **`src/data/`**: Define tipos y datos estructurados en código TypeScript para entidades no Markdown (Publicaciones de Galería, Tags).
- **`src/utils/`**: Abstrae operaciones con el sistema de archivos (FS de Node en tiempo de build) e internacionalización/formateo de fechas.
- **`src/components/`**: Aloja la interfaz visual y la lógica interactiva en el cliente encapsulada en scripts Astro/Vanilla.

---

## 3. Modelos de Datos Core

La arquitectura de datos de Cozy Server combina **Astro Content Collections** con tipos TypeScript explícitos en `src/data/`.

### A. Estructura de Recursos Multimedia (`PostResource`)

Ubicado en `src/data/galleryPosts.ts`, abstrae cualquier elemento multimedia dentro de una publicación de la galería:

```typescript
export type ResourceType = 'image' | 'video';

export interface PostResource {
    src: string;        # Ruta absoluta o relativa al recurso (/gallery/video1.mp4)
    type: ResourceType; # 'image' | 'video'
}
```

### B. Publicaciones de Galería (`GalleryPostData`)

Estructura completa de un ítem presentado en la comunidad (`src/data/galleryPosts.ts`):

```typescript
export interface GalleryPostData {
    id: number;                 # Identificador único numérico del post
    resources: PostResource[]; # Colección híbrida de recursos (1 o más)
    username: string | null;    # Autor de la captura/video
    date: string;               # Fecha en formato ISO UTC ("2026-07-03T00:00:00Z")
    description: string;        # Pie de foto o cita textual del usuario
    tags?: string[];            # Claves asociadas a la taxonomía (ej: ['buildings', 'aesthetic'])
}
```

### C. Catálogo de Etiquetas (`TagConfig` y `TAG_CATALOG`)

Definido en `src/data/tags.ts`, establece la taxonomía global de filtrado:

```typescript
export interface TagConfig {
    value: string; # Slug identificador (ej: 'buildings')
    name: string;  # Nombre legible (ej: 'Construcciones')
    icon: string;  # Emoji asociativo (ej: '🏡')
    color: string; # Clases de tokens semánticos (ej: 'bg-canvas text-ink-primary')
}
```

#### Vinculación de Datos:
1. `TAG_CATALOG` define la lista de etiquetas permitidas y sus metadatos estéticos.
2. `GalleryPostData.tags` almacena un array de strings `value` que corresponden con los identificadores del catálogo (`TAG_CATALOG`).
3. El componente `GalleryPost.astro` recibe estas llaves y permite contextualizar o filtrar publicaciones en el cliente.

### D. Colección de Addons (`src/content.config.ts`)

Esquema de validación Zod para los Addons cargados en `src/content/addons/*.md`:

```typescript
const addons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/addons" }),
  schema: z.object({
    title: z.string(),
    creator: z.string(),
    creatorLink: z.string().optional(),
    type: z.enum(["Addon", "Texture Pack"]),
    description: z.string(),
    youtubeLink: z.string().optional(),
    pubDate: z.date(),
  }),
});
```

---

## 4. Features Implementadas

### 1. Soporte Híbrido de Video / Imagen

Tanto en la tarjeta de publicación (`GalleryPost.astro`) como en el visor emergente de alta resolución (`GalleryModal.astro`), el sistema evalúa en tiempo de renderizado el campo `type` de cada `PostResource`:

- **Video:** Renderiza `<video>` con `autoPlay`, `loop`, `muted`, `playsInline` y controles de deslizamiento horizontal sin pausar el flujo de la UI.
- **Imagen:** Renderiza `<img>` optimizado con desacoplamiento de arrastre (`draggable="false"`) y encuadre responsivo (`object-cover` en cards / `object-contain` en modales).

```astro
{resources.map((res) =>
    res.type === "video" ? (
        <video src={res.src} autoPlay loop muted playsInline class="..." />
    ) : (
        <img src={res.src} draggable="false" class="..." />
    )
)}
```

### 2. Motor de Filtrado de Tags en el Cliente & URL State

El manejo de estado de modales y filtros se realiza mediante Vanilla JS integrado con la API de historial del navegador (`history.pushState` / `history.replaceState`):

- **Apertura por URL:** Al cargar `/gallery?id=2`, el script registrado en `astro:page-load` lee `URLSearchParams`, localiza la estructura `#extended-2` e inyecta clases de visibilidad (`hidden` ➔ `flex`), bloqueando el scroll del body.
- **Sincronización:** Al hacer clic en un post, se actualiza la URL a `?id={postId}` dinámicamente sin recargar la página. Al cerrar el modal, se restaura la ruta base con `history.replaceState`.

### 3. Sistema de UI: Notificaciones Toast / Copiado

- **IP / Puerto Copier (`Hero.astro`):** Escucha clics en `.copy-btn`, copia el valor al portapapeles con `navigator.clipboard.writeText(text)` y activa el tooltip flotante `.copy-feedback` mediante la clase `.visible` durante 2000 ms.
- **Share Link (`GalleryPost.astro`):** Genera enlaces directos copiando `${window.location.origin}${window.location.pathname}?id=${postId}` y desplegando notificaciones al usuario.

### 4. Estrategia SEO & Meta Etiquetas Estáticas / Dinámicas

En `src/layouts/Layout.astro`, se centralizan las etiquetas Open Graph y Canonical URLs:

- **Canonical URL Automática:** Calculada dinámicamente según `Astro.url.pathname`.
- **OpenGraph Tags:** Propaga `og:title`, `og:description`, `og:image`, `og:url` y `og:type` universalmente.
- **Rutas Dinámicas (`/addons/[slug].astro`):** Sobrescriben el layout pasando metadatos específicos del addon obtenido en tiempo de build mediante `getStaticPaths()`.

---

## 5. Design System & Tokens

El diseño de Cozy Server está normado de forma estricta por el archivo `.opencode/skills/astro-tailwind/SKILL.md` e implementado en `src/styles/global.css` mediante `@theme` de Tailwind CSS v4.

### Configuración de Tokens (`@theme`)

#### Colores Semánticos
- `bg-canvas` (`#faf6f0`): Fondo base de la aplicación.
- `bg-surface` (`#f2eadf`): Tarjetas, contenedores, modales y campos.
- `bg-surface-hover` (`#eae0d3`): Estados hover de componentes de superficie.
- `bg-brand-sage` (`#8a9a5b`): Acento principal y botones primarios.
- `bg-brand-sage-deep` (`#6b7b45`): Hover primario y acentos oscuros.
- `bg-brand-sage-soft` (`#dce3c8`): Badges, tags y acentos suaves.
- `text-ink-primary` (`#4a4036`): Texto de alto contraste / títulos.
- `text-ink-secondary` (`#6d645a`): Texto secundario de cuerpo.
- `text-ink-muted` (`#968f88`): Metadatos y textos deshabilitados.
- `border-hairline` (`#e1d8c9`): Bordes sutiles y divisores.

#### Tipografía
- **Heading:** `"Fraunces Variable", serif` (`font-heading`)
- **Body:** `"Quicksand Variable", sans-serif` (`font-body`)
- **Code:** `"Geist Mono", monospace` (`font-code`)

#### Sombras y Radio
- **Sombras:** `shadow-soft`, `shadow-hover`, `shadow-inner-inset`.
- **Border Radius:** `rounded-sm` (8px), `rounded-md` (16px), `rounded-lg` (24px), `rounded-xl` (32px), `rounded-full` (9999px).

### Reglas Estrictas de Diseño

1. **Cero CSS Inline/Etiquetas `<style>`:** Prohibido el uso de etiquetas `<style>` dentro de componentes `.astro`. Todo el estilizado debe resolverse con clases utilitarias de Tailwind.
2. **Tokens Obligatorios:** No se admiten colores hexadecimales arbitrarios (ej. `bg-[#8a9a5b]`) ni clases de color raw de Tailwind (`bg-stone-800`). Se usan exclusivamente las variables semánticas.
3. **Cursor Personalizado & Animaciones:** Se incluye la animación global `@keyframes breathe` para el fondo del body y un cursor personalizado temático.
