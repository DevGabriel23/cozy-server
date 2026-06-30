# Role and Objective
You are an Expert UI/UX Developer specializing in Astro.js (latest version). Your objective is to build a highly aesthetic, responsive, mobile-first landing page for a Minecraft Bedrock Server called "Cozy". 

You must strictly follow the design tokens and aesthetic guidelines defined in the provided `design_system.md` file (Cottagecore, warm tones, rounded UI).

# Tech Stack & Constraints
- **Framework:** Astro (SSG mode).
- **Styling (Tailwind v4):** Use Tailwind CSS v4. All theme extensions and configuration must be declared directly in `src/styles/global.css` using the `@theme` directive. Do NOT create a `tailwind.config.js` file.
- **Fonts:** Install via Fontsource: `npm install @fontsource-variable/fraunces @fontsource-variable/quicksand`.
- - **Custom Cursor:** Inject this exact code inside `@layer base` in `src/styles/global.css` for the custom mushroom cursor:
  ```css
  body { cursor: url('[https://cdn.cursors-4u.net/previews/mushroom-ab85cfc8-32.webp](https://cdn.cursors-4u.net/previews/mushroom-ab85cfc8-32.webp)') 0 0, auto; }
  a, button, [role="button"] { cursor: url('[https://cdn.cursors-4u.net/previews/mushroom-ab85cfc8-32.webp](https://cdn.cursors-4u.net/previews/mushroom-ab85cfc8-32.webp)') 0 0, pointer; }
  ```
- **Transitions:** Use Astro `<ViewTransitions />`.
- **Content:** Use Astro Content Collections (`src/content/addons/`) for managing the Addons information.
- **Interactivity:** Vanilla JavaScript (for the Copy-to-Clipboard functionality).

# Site Architecture

## 1. Global Styles (`src/styles/global.css`)
- Map the design system colors, typography, and shadows to @theme.
- Create a **Custom Scrollbar** using webkit selectors matching the aesthetic.
- Create a **Subtle Animated Background**: Implement a slow, breathing CSS radial-gradient animation in the background to give the site life.

## 2. Homepage (`src/pages/index.astro`)
- **Hero Section:** - Welcoming title ("Bienvenido a Cozy").
  - Subtitle explaining it's a private, aesthetic survival world.
  - **Copy & Paste Data Boxes:** Create two beautifully styled boxes (using dashed borders and mono font as per the design system) for the IP (`cozy.grupogarpe.com`) and Port (`25012`). Include a copy icon/button that uses the Clipboard API and shows a "¡Copiado!" tooltip/state.
- **Addons Grid Section:** - Fetch the addons from the Content Collection.
  - Display them in a grid of cards (`addon-card`). Each card should show the image, title, short description, and a tag (`badge-addon`). The card must link to the individual addon page.

## 3. Content Collections (`src/content/config.ts` & Markdown files)
Configure a collection named `addons` with a schema that includes: `title`, `creator`, `type` (Addon / Texture Pack), `description`, `mainImage`, `youtubeLink` (optional).

**Generate the following 4 Markdown files in `src/content/addons/`:**

**cakes-and-bakes.md**
```md
---
title: "Cakes and Bakes"
creator: "Team"
type: "Addon"
description: "¡Vive el sueño de tener tu propia panadería! Amplía tu granja y prepara deliciosos dulces."
mainImage: "/images/cakes.jpg" # Use a placeholder url for now
youtubeLink: ""
---
- ¡Mapache astuto!
- Más de 100 platos y productos en 3D
- Más de 300 ingredientes y alimentos
- Bloques con temática de panadería y cafetería
- Sistema de cocina interactivo (Mezcla, bate, licúa, fríe y hornea)
```

**crops-and-farms.md**
```md
---
title: "Crops and Farms"
creator: "Team"
type: "Addon"
description: "¡Vive el sueño de ser granjero! Cultiva cosechas frescas, recógelas y prepara tus platos favoritos."
mainImage: "/images/crops.jpg"
youtubeLink: ""
---
- NUEVAS mascotas y PNJ de granja
- ¡NUEVO Golem de cosecha (ayudante)!
- Más de 40 especies de animales (¡Cerdos felices y trufas!)
- Mecánicas de animales de granja
- Más de 75 cultivos y productos
- Más de 150 alimentos
- Comerciantes y puestos de mercado
- Perro y gato de la granja + sistemas interactivos
- Máquinas agrícolas automáticas
- Abeja granjera y prados
- Renovación del sistema de riego
- Bloques, vigas y enrejados para invernaderos
```

**slice-of-life.md**
```md
---
title: "Slice of Life"
creator: "Team"
type: "Addon"
description: "Crea el hogar más acogedor con muebles encantadores, un jardín vibrante y mascotas adorables."
mainImage: "/images/slice.jpg"
youtubeLink: ""
---
- Decoración de anime, peluches y gacha
- Muebles adorables y bloques de construcción
- Mascotas kawaii y animales de granja (¡Acurrúcate con tu Shiba Inu!)
- Atuendos
- Nuevos cultivos y alimentos para colocar
- Repostería y cocina mejorada
- *Correcciones:* La posición de la cabeza de Fat Cat, mecánicas de peluches, cesta de picnic y lavadora funcional.
```

**furniture-life-2.md**
```md
---
title: "Furniture Life 2.0"
creator: "Team"
type: "Addon"
description: "Con más de 2000 bloques de muebles reales, diseña desde casas acogedoras hasta ciudades."
mainImage: "/images/furniture.jpg"
youtubeLink: ""
---
- 2000+ nuevos bloques de muebles reales
- Nuevos alimentos, vehículos (15 nuevos) y NPC mejorados
- Diversos estilos decorativos (modernos a clásicos)
- 500+ nuevos bloques
- La mayoría de los bloques ahora tienen funciones, sonidos y animaciones
- Nueva mesa de carpintero para todas las recetas
- 30 canciones originales para muebles musicales
- Nuevos bloques modulares para la construcción creativa
```

## 4. Addon Detail Template (src/pages/addons/[slug].astro)
Create a dynamic route that renders the content of each addon.

- Header: Title, Creator name, and the tag (type).
- Media: If youtubeLink exists, embed a responsive iframe. If not, show the mainImage elegantly framed with {rounded.lg}.
- Content: Render the Markdown content (the lists) beautifully. Style the <ul> and <li> elements to use custom bullets (e.g., a tiny SVG leaf or a styled dot matching the brand-sage color).
- Footer/Navigation: A section at the bottom called "Explora más" that lists links/cards to the other 3 addons so the user can keep browsing easily.

# Execution Steps for the AI
1. Initialize the Astro project structure.
2. Provide the package.json with the required Fontsource dependencies.
3. Provide the src/style/global.css with all variables, custom cursor, custom scrollbar, and background animation.
4. Provide the Content Collection configuration (config.ts).
5. Build the index.astro and the [slug].astro template.
6. Ensure all interactive JS for the Copy-to-Clipboard feature is robust and handles UI feedback.