# Phase 0 Detailed Blueprint & Execution Plan
### Project Scaffolding, Design System & Levantine Aesthetics Foundation

---

## 🎯 Phase 0 Objective
Establish a clean, rock-solid, production-grade foundation for **Fayrouz (فيروز)**. This includes Vite + React 18, Tailwind CSS v3 with custom Levantine specialty coffee design tokens, Framer Motion for 60fps animations, Lucide icons, Google Fonts typography, and foundational CSS micro-utilities (glassmorphism, steam animations, amber glows).

At the conclusion of Phase 0, we will have a running local dev environment that renders a high-fidelity Design System & Foundation Verification Canvas showcasing our typography, color palette, responsive glass cards, and Framer Motion spring physics.

---

## 🔬 Architectural & Technical Decisions

### 1. Build Tool: Vite + React 18
* **Why Vite?** Instant cold server starts (<300ms), sub-millisecond Hot Module Replacement (HMR), zero bundling overhead during prototyping.
* **Preserving Repo State**: We will initialize package and config files without disturbing `.git/`, `PLAN.md`, or `README.md`.

### 2. Styling: Tailwind CSS v3.4 + PostCSS
* **Why Tailwind v3?** Guaranteed stability with custom theme extensions, predictable utility compilation, seamless integration with arbitrary CSS values and Framer Motion style props.
* **Avoid Tailwind v4 for now**: v4 introduces syntax overhauls (`@theme` directive in CSS) that can cause friction with PostCSS plugins and component libraries. v3.4 is rock-solid.

### 3. Typography Architecture: Tri-Font System
We will integrate three distinct font families with preconnect headers to prevent FOIT (Flash of Invisible Text):
1. **Headings & Editorial**: `Playfair Display` (Serif, weights: 400, 600, 700, Italic) — evokes classic luxury, artisanal roasting notes, and timeless Levantine hospitality.
2. **Body & Metrics**: `Inter` (Sans-serif, weights: 300, 400, 500, 600, 700) — ultra-clean, legible for prices, tags, nutrition, and kiosk touch targets.
3. **Arabic Cultural Accents**: `Amiri` & `Noto Naskh Arabic` (Arabic Serif, weights: 400, 700) — authentic calligraphic warmth for Fayrouziyat greetings (*"أهلاً وسهلاً"*, *"قهوة الصباح"*).

### 4. Bespoke Color Palette: "Fayrouz Levantine Roast"

```
┌──────────────────────┬──────────┬──────────────────────────────────────────┐
│ Token Name           │ Hex Code │ Role & Usage                             │
├──────────────────────┼──────────┼──────────────────────────────────────────┤
│ fayrouz-obsidian     │ #0c0908  │ Deepest canvas backdrop (roasted beans)   │
│ fayrouz-espresso     │ #17110e  │ Primary card background                  │
│ fayrouz-surface      │ #231a15  │ Elevated hover state & interactive panels│
│ fayrouz-border       │ #3a2b23  │ Subtle structural borders (low opacity)  │
│ fayrouz-amber        │ #d4a373  │ Primary warm gold CTA & focus rings      │
│ fayrouz-copper       │ #b87333  │ Burnished metallic badges & accents      │
│ fayrouz-gold         │ #e9c46a  │ Star picks, curated highlights           │
│ fayrouz-cream        │ #fefae0  │ High-contrast primary text & titles      │
│ fayrouz-foam         │ #ede0d4  │ Secondary body text & tasting notes      │
│ fayrouz-muted        │ #8a7265  │ Tertiary metadata, timestamps, hints     │
│ fayrouz-cardamom     │ #6b8e23  │ Vegan / allergen-safe badge              │
│ fayrouz-rose         │ #c86d63  │ Adventurous pick & seasonal signature    │
│ fayrouz-sky          │ #6495ed  │ Iced drink chilled temperature indicator │
│ fayrouz-ember        │ #e07a5f  │ Hot drink steaming temperature indicator │
└──────────────────────┴──────────┴──────────────────────────────────────────┘
```

---

## 📦 Exact Deliverables & Files to Create

```
/Users/noor/Projects/fayrouz/
├── package.json               # Dependencies, scripts, type: module
├── vite.config.js             # Vite configuration with React plugin & path aliases
├── tailwind.config.js         # Comprehensive theme extensions, animations, tokens
├── postcss.config.js          # Tailwind & Autoprefixer hooks
├── index.html                 # Google Fonts preconnect, viewport, bespoke title & metadata
└── src/
    ├── main.jsx               # React 18 DOM mount point
    ├── App.jsx                # Phase 0 Design System Verification Screen
    └── index.css              # Custom utilities, scrollbar styling, glassmorphic filters
```

---

## 📋 Step-by-Step Implementation Sequence

### Step 0.1: Package Specification & Dependency Installation
Create `package.json` with exact dependency specifications:
* **Dependencies**:
  * `react`: `^18.3.1`
  * `react-dom`: `^18.3.1`
  * `framer-motion`: `^11.15.0`
  * `lucide-react`: `^0.468.0`
  * `canvas-confetti`: `^1.9.3`
  * `clsx`: `^2.1.1`
  * `tailwind-merge`: `^2.5.5`
* **DevDependencies**:
  * `vite`: `^6.0.0`
  * `@vitejs/plugin-react`: `^4.3.4`
  * `tailwindcss`: `^3.4.16`
  * `postcss`: `^8.4.49`
  * `autoprefixer`: `^10.4.20`
* Execute `npm install` and verify zero vulnerability warnings.

### Step 0.2: Vite & PostCSS Configuration
* Write `vite.config.js` with fast React refresh and clean asset bundling.
* Write `postcss.config.js` pointing to `tailwindcss` and `autoprefixer`.

### Step 0.3: Tailwind Configuration & Bespoke Theme Extension
* Write `tailwind.config.js` defining:
  * Content paths (`index.html`, `./src/**/*.{js,ts,jsx,tsx}`)
  * `fontFamily`: `serif: ['Playfair Display', 'serif']`, `sans: ['Inter', 'sans-serif']`, `arabic: ['Amiri', 'serif']`
  * `colors.fayrouz.*` as detailed in the palette table
  * Custom `boxShadow`:
    * `amber-glow`: `0 0 25px -5px rgba(212, 163, 115, 0.3)`
    * `card-depth`: `0 10px 30px -10px rgba(0, 0, 0, 0.6)`
    * `copper-rim`: `inset 0 1px 0 0 rgba(184, 115, 51, 0.4)`
  * Custom keyframes:
    * `shimmer`: sweeping gradient effect for NFC & Taste Card
    * `steam`: subtle upward floating waft
    * `pulse-subtle`: 2s organic breathing glow

### Step 0.4: Typography & Head Configuration in `index.html`
* Inject preconnect links to `https://fonts.googleapis.com` and `https://fonts.gstatic.com`.
* Load `Playfair Display:ital,wght@0,400..700;1,400..700`, `Inter:wght@300..700`, and `Amiri:wght@400;700`.
* Add custom dark browser UI metadata (`theme-color: #0c0908`).

### Step 0.5: CSS Foundation in `src/index.css`
* Setup Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`
* Custom dark scrollbars (`::-webkit-scrollbar` with amber thumb).
* Glassmorphic utility classes:
  * `.glass-card`: `bg-fayrouz-espresso/80 backdrop-blur-md border border-fayrouz-amber/15 shadow-card-depth`
  * `.glass-pill`: `bg-fayrouz-surface/60 backdrop-blur-sm border border-fayrouz-border`
  * `.text-gold-gradient`: `bg-gradient-to-r from-fayrouz-cream via-fayrouz-gold to-fayrouz-amber bg-clip-text text-transparent`

### Step 0.6: Phase 0 Verification Component in `src/App.jsx`
Build an interactive **Foundation Verification Canvas** featuring:
1. **Header & Cultural Greeting**: Displaying Playfair Display title with Amiri Arabic accent (*"فيروز — Universal Coffee Passport"*).
2. **Palette Swatch Matrix**: Live rendering of all 14 custom design tokens.
3. **Typography Specimen**: Comparing serif headings, sans-serif microcopy, and Arabic calligraphy.
4. **Interactive Framer Motion Card**: A live micro-interaction card with hover tilt, amber glow ring, and tactile tap spring physics to prove 60fps animation performance.
5. **Lucide Coffee Icons preview**: Coffee cups, steam, sparkles, NFC antenna icon.

### Step 0.7: Build & Runtime Verification
* Execute `npm run build` to confirm clean production bundle compilation with zero warnings.
* Launch dev server via non-blocking process to verify rapid HMR.

---

## ✅ Phase 0 Acceptance Criteria
- [x] Dependencies cleanly installed without peer-dependency conflicts.
- [x] Tailwind compiles successfully with all `fayrouz-*` design tokens available.
- [x] All three font families (`Playfair Display`, `Inter`, `Amiri`) render properly.
- [x] Framer Motion executes smoothly without runtime errors.
- [x] `npm run build` passes with 0 errors.
- [x] Local Vite dev server active and serving on http://localhost:5173/

---

## ❓ Agreement & Sign-Off
Once you review and agree on this specific plan for Phase 0, we will execute Steps 0.1 through 0.7 in order and verify each step!
