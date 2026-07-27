# Upgrades: Fase 2 (Galería, UI y SEO)

## 1. Objetivo General
Mejorar la experiencia de la galería `/gallery` introduciendo filtros del lado del cliente, soporte para videos (vía Cloudinary) y refinamientos de UI/UX (eliminación de alerts nativos) manteniendo la estética *cozy, cottagecore y coquette* (Design System `brand-sage`, etc.). Además, sentar las bases para compartir enlaces en redes sociales con miniaturas dinámicas.

## 2. Características a Implementar

### Feature A: Soporte de Video en Galería y Modales (Refactor de Datos)
* **Descripción:** Implementar soporte para videos en la galería. Para hacerlo de forma robusta, se debe refactorizar la interfaz de los datos.
* **Refactor de Datos (`src/data/galleryPosts.ts`):** 
  * Cambiar la propiedad `images: string[]` por `resources: { src: string, type: 'image' | 'video' }[]`.
  * Actualizar todos los posts de prueba en ese archivo para que cumplan con la nueva interfaz. El orden del arreglo dictará el orden de renderizado.
* **Archivos UI:** `src/components/GalleryPost.astro`, `src/components/GalleryModal.astro`.
* **Consideraciones:** Si el `type` es `'video'`, el carrusel debe renderizar una etiqueta `<video autoPlay loop muted playsInline>` en lugar de un `<img>`. El video debe comportarse visualmente idéntico a una imagen (mismo `aspect-ratio`, sin controles nativos) para mantener la inmersión.

### Feature B: Filtros Dinámicos en el Cliente y Catálogo de Tags
* **Descripción:** Agregar un sistema de filtros en la página de la galería para buscar por "Autor" y por "Tags".
* **Lógica de Datos y Arquitectura:** 
  * El catálogo de tags ya existe en `src/data/tags.ts`. Debes importarlo y utilizarlo como única fuente de la verdad para renderizar la UI de los filtros.
  * Modificar la interfaz `GalleryPostData` en `src/data/galleryPosts.ts` para aceptar un arreglo opcional `tags?: string[]` (donde los strings deben corresponder al `value` del `TAG_CATALOG`).
* **UX/UI:** 
  * Renderizar los botones de filtro iterando sobre el `TAG_CATALOG`.
  * El filtrado de los `<article>` debe ocurrir instantáneamente usando JavaScript puro en el cliente, sin recargar la página.
  * La URL debe actualizarse dinámicamente usando `window.history.pushState` (ej. `?tags=pets`) para que los enlaces se puedan compartir.
* **Archivos a modificar:** `src/pages/gallery.astro`, `src/data/galleryPosts.ts`.

### Feature C: Custom Toast / Snackbar (Reemplazo del Alert)
* **Descripción:** Eliminar el `alert("¡Enlace copiado!")` nativo al compartir un post.
* **UX/UI:** Crear un componente/elemento DOM ligero que aparezca en la parte inferior o superior con una animación suave, fondo verde (usar token `bg-brand-sage` y `text-on-dark`), y desaparezca tras 3 segundos.
* **Archivos:** `src/components/GalleryPost.astro` (en el bloque `<script>`).

### Feature D: Dynamic Thumbnails (Open Graph / SEO base)
* **Descripción:** Permitir que cada página dinámica o vista compartida tenga una imagen de previsualización para redes sociales (Discord, WhatsApp, Twitter).
* **Lógica:** 
  * Actualizar el layout principal (ej. `BaseLayout.astro` o componente `<Head>`) para recibir un prop `ogImage`.
  * Si el post es un video de Cloudinary, aplicar la regla de transformar la extensión `.mp4` a `.jpg` en la URL del `ogImage` para usar la autogeneración de Cloudinary.

## 3. Consideraciones Técnicas Generales
* Respetar estrictamente el archivo `.opencode/skills/astro-tailwind/SKILL.md`.
* No introducir librerías de UI complejas (como React o Vue). Mantener el JavaScript del cliente ligero usando Vanilla JS o lo nativo de Astro.