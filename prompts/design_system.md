---
version: 1.0
name: Cozy-Cottagecore-Design-System
description: A warm, inviting, and aesthetic design system for the Cozy Minecraft Server. The visual language relies on soft cream backgrounds, sage green accents, and warm terracotta tones. Typography pairs 'Fraunces' (a soft, vintage serif for headings) with 'Quicksand' (a rounded, friendly sans-serif for body text). The UI features heavily rounded corners, soft diffused shadows, and subtle organic animations (like floating particles or gentle gradients). The experience is strictly mobile-first, utilizing native CSS variables in global.css, custom SVG cursors, and Astro View Transitions for a seamless, app-like feel.

colors:
  # Base & Backgrounds
  canvas: "#FAF6F0"          # Warm cream for the main background
  surface: "#F2EADF"         # Slightly darker cream for cards and sections
  surface-hover: "#EAE0D3"   # Hover state for interactive cards
  
  # Brand & Accents
  brand-sage: "#8A9A5B"      # Primary CTA, active states, important badges
  brand-sage-deep: "#6B7B45" # Pressed state for sage buttons
  brand-sage-soft: "#DCE3C8" # Background for light tags/badges
  brand-terracotta: "#D4A373"# Secondary accent for special highlights/icons
  brand-blush: "#E8D3D0"     # Soft pink for decorative elements
  
  # Text & Ink (Avoiding pure black for a softer look)
  ink-primary: "#4A4036"     # Main headings and high-contrast text
  ink-secondary: "#6D645A"   # Body text and descriptions
  ink-muted: "#968F88"       # Disabled text, placeholders, subtle borders
  on-dark: "#FAF6F0"         # Text to be used over brand-sage or brand-terracotta
  
  # UI Elements
  hairline: "#E1D8C9"        # Borders for cards and inputs
  success: "#7CA982"         # E.g., "Copied!" notification
  error: "#D97B7B"

typography:
  font-families:
    heading: "'Fraunces Variable', serif" # Install via @fontsource-variable/fraunces
    body: "'Quicksand Variable', sans-serif" # Install via @fontsource-variable/quicksand
    code: "'Geist Mono', monospace" # For IP/Port blocks
  
  styles:
    display:
      fontFamily: "{typography.font-families.heading}"
      fontSize: "3.5rem" # Scales down on mobile
      fontWeight: 600
      lineHeight: 1.1
      letterSpacing: "-0.02em"
    heading-1:
      fontFamily: "{typography.font-families.heading}"
      fontSize: "2.5rem"
      fontWeight: 600
      lineHeight: 1.2
    heading-2:
      fontFamily: "{typography.font-families.heading}"
      fontSize: "2rem"
      fontWeight: 500
    heading-3:
      fontFamily: "{typography.font-families.heading}"
      fontSize: "1.5rem"
      fontWeight: 500
    body-lg:
      fontFamily: "{typography.font-families.body}"
      fontSize: "1.125rem"
      fontWeight: 500
      lineHeight: 1.6
    body-md:
      fontFamily: "{typography.font-families.body}"
      fontSize: "1rem"
      fontWeight: 400
      lineHeight: 1.6
    body-sm:
      fontFamily: "{typography.font-families.body}"
      fontSize: "0.875rem"
      fontWeight: 500
    mono-data:
      fontFamily: "{typography.font-families.code}"
      fontSize: "1rem"
      fontWeight: 500
      letterSpacing: "0.05em"

rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  full: "9999px"

shadows:
  soft: "0 8px 30px rgba(74, 64, 54, 0.06)"
  hover: "0 12px 40px rgba(74, 64, 54, 0.12)"
  inner-inset: "inset 0 2px 4px rgba(74, 64, 54, 0.04)"

components:
  button-primary:
    backgroundColor: "{colors.brand-sage}"
    textColor: "{colors.on-dark}"
    typography: "{typography.styles.body-lg}"
    rounded: "{rounded.full}"
    padding: "12px 32px"
    transition: "all 0.3s ease"
    hover: "transform translateY(-2px), shadow {shadows.hover}"
  
  copy-paste-box:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-primary}"
    typography: "{typography.styles.mono-data}"
    border: "2px dashed {colors.hairline}"
    rounded: "{rounded.md}"
    padding: "16px"
    display: "flex, justify-between, align-center"
    hover: "border-color {colors.brand-sage}"
    
  addon-card:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "24px"
    shadow: "{shadows.soft}"
    hover: "shadow {shadows.hover}, transform translateY(-4px)"
    
  badge-addon:
    backgroundColor: "{colors.brand-sage-soft}"
    textColor: "{colors.brand-sage-deep}"
    typography: "{typography.styles.body-sm}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

## Overview
The Cozy server landing page must feel like opening a beautifully crafted physical journal or stepping into a warm cafe. The design completely avoids harsh blacks and pure whites, relying on the 'ink-primary' brown for text and 'canvas' cream for backgrounds. 

## Key Technical & Visual Directives
1. **Global CSS Variables:** All colors, typography, and spacing must be implemented via `src/styles/global.css`. NO Tailwind config file.
2. **Mobile-First:** Layouts must stack cleanly on mobile. The IP/Port copy-paste boxes must be easily tappable with thumbs.
3. **Custom Cursor:** Implement a custom SVG cursor (e.g., a small leaf, a wand, or a soft dot) applied to the `body` via CSS.
4. **View Transitions:** Use Astro's `<ViewTransitions />` for a smooth, app-like fade between the home page and the individual addon pages.
5. **Animated Background:** Use a pure CSS subtle animation on the `body` background (e.g., a slow-moving, very soft radial gradient mixing `{colors.canvas}` and `{colors.surface}`, or subtle floating CSS particles).
6. **Custom Scrollbar:** Style the webkit scrollbar to match the cottagecore aesthetic (rounded thumb, `{colors.brand-sage-soft}` background, `{colors.brand-sage}` thumb).