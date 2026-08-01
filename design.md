---
name: Academic Excellence System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff3ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fd'
  surface-container-highest: '#d9e3f7'
  on-surface: '#121c2a'
  on-surface-variant: '#43474e'
  inverse-surface: '#273140'
  inverse-on-surface: '#ebf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f87'
  primary: '#022448'
  on-primary: '#ffffff'
  primary-container: '#1e3a5f'
  on-primary-container: '#8aa4cf'
  inverse-primary: '#adc8f5'
  secondary: '#225eaa'
  on-secondary: '#ffffff'
  secondary-container: '#79acfd'
  on-secondary-container: '#003f7e'
  tertiary: '#222426'
  on-tertiary: '#ffffff'
  tertiary-container: '#373a3c'
  on-tertiary-container: '#a2a3a5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#adc8f5'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#2d486d'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#a9c7ff'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#00468b'
  tertiary-fixed: '#e1e2e4'
  tertiary-fixed-dim: '#c5c6c8'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f7'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is rooted in the heritage and prestige of a government engineering institution. It balances traditional academic authority with a modern, forward-thinking outlook. The visual language is structured, dependable, and highly legible, aimed at students, faculty, and corporate partners.

The aesthetic follows a **Corporate / Modern** style with subtle **Minimalist** influences. It prioritizes clarity and information density without feeling cramped. The interface utilizes generous whitespace to reduce cognitive load, while structured grid systems and refined typography establish a clear hierarchy of information. The emotional response is one of stability, innovation, and professional rigor.

## Colors

The palette is derived from professional academic environments.
- **Primary:** A deep, authoritative Navy (#1E3A5F) used for primary navigation, headings, and high-impact UI elements.
- **Secondary:** A soft, approachable Blue (#76A9FA) used for accents, active states, and supportive visual cues.
- **Tertiary:** A light, cool Grey (#F3F4F6) for background surfaces and subtle containment.
- **Neutral:** A range of greys anchored by Charcoal (#374151) for body text and descriptive labels.

The system utilizes high-contrast ratios to ensure accessibility and readability of technical and administrative content.

## Typography

This design system uses **Hanken Grotesk** for headings to provide a sharp, modern, and technical feel. It is paired with **Inter** for body copy and labels to maintain exceptional legibility across digital interfaces.

Headlines should use tight tracking and heavier weights to project confidence. Body text follows standard web sizes with comfortable line heights to facilitate the reading of long-form academic reports and placement statistics. Labels utilize uppercase styling in specific contexts (like section headers) to mimic the structure found in formal brochures.

## Layout & Spacing

The layout is built on a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. A strict 8px spacing scale is used to maintain rhythm.

- **Desktop (1440px+):** 32px outer margins, 24px gutters.
- **Tablet (768px - 1439px):** 24px outer margins, 16px gutters.
- **Mobile (Up to 767px):** 16px outer margins, 16px gutters.

Whitespace is used strategically to separate distinct content blocks, such as "Department Overview" and "Placement Data," ensuring the UI feels organized and academic.

## Elevation & Depth

Visual hierarchy in this design system is primarily achieved through **Tonal Layers** and **Soft Shadows**.

1.  **Level 0 (Surface):** The main background using Tertiary Grey or White.
2.  **Level 1 (Cards):** White surfaces with a very soft, diffused shadow (0px 4px 20px rgba(30, 58, 95, 0.08)).
3.  **Level 2 (Interactive):** Elevated state for buttons or hovered cards, increasing shadow depth and adding a subtle primary-tinted glow.
4.  **Overlays:** Modal windows or dropdowns use a darker backdrop blur (12px) to focus the user's attention.

Avoid aggressive gradients or heavy bevels. The depth should feel natural and light, mimicking the layering of paper and digital tabs.

## Shapes

The design system employs **Rounded** geometry (0.5rem base) to soften the professional aesthetic and make the institution feel modern and accessible.

- **Buttons & Inputs:** Use the base 8px (0.5rem) radius.
- **Content Cards:** Use `rounded-lg` (16px) to create clear containment.
- **Tags & Indicators:** Use full pill-shaping (999px) for status indicators and categorical tags to distinguish them from structural elements.
- **Feature Images:** Should use the `rounded-xl` (24px) setting for a contemporary look.

## Components

### Buttons
- **Primary:** Solid Navy (#1E3A5F) with White text. Bold weight.
- **Secondary:** Outlined Navy or Soft Blue with subtle hover fills.
- **Ghost:** Text-only for tertiary actions, using the Primary color.

### Input Fields
- Structured with a 1px border (#D1D5DB).
- Labels are positioned above the field in `label-md` style.
- Active states use a 2px Primary color border.

### Cards
- White background with `rounded-lg` corners and Level 1 elevation.
- Used for Department listings, Student spotlights, and Placement stats.

### Chips & Tags
- Used for "Batch 2025," "Engineering," or "Placement Open."
- Pill-shaped with light secondary color backgrounds and dark primary text.

### Progress Indicators
- Used for placement statistics. Thin, clean lines using the Secondary Blue to indicate percentage completion or success rates.