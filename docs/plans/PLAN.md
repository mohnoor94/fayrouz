# Fayrouz (فيروز) — Universal Coffee Passport
### High-Fidelity Interactive Pitch Prototype & Personalization Engine

> *"مع فنجان قهوة الصباح، وصوت فيروز"* — Inspired by the timeless Levantine ritual of morning coffee and music, **Fayrouz** bridges warm human hospitality with intelligent, real-time personalization for specialty coffee shops.

---

## 📋 Executive Project Plan & Status Tracker

| Phase | Description | Status | Progress |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Project Scaffolding, Design System & Dependencies | `[x] Completed` | 100% |
| **Phase 1** | Mock Data Layer & Personalization Logic Engine | `[x] Completed` | 100% |
| **Phase 2** | Mobile Simulator: Sensory Onboarding Wizard | `[x] Completed` | 100% |
| **Phase 3** | Tablet Simulator: The Magic Dynamic Menu & NFC Sync | `[ ] Pending` | 0% |
| **Phase 4** | Dual-Device Frame, Morphing Transitions & Audio-Visual Warmth | `[ ] Pending` | 0% |
| **Phase 5** | End-to-End QA, Edge Case Validation & Pitch Mode Polish | `[ ] Pending` | 0% |

---

## 🛠 Tech Stack Architecture

- **Core Framework**: React 18 + Vite (High-performance, rapid HMR, non-blocking state transitions)
- **Styling**: Tailwind CSS v3 with customized Levantine & Specialty Coffee Design Tokens (dark roasted espressos, warm ambers, brass/copper accents, creamy foam whites, glassmorphism)
- **Animations**: Framer Motion (60fps fluid physics, layout morphing `layoutId`, card slide stacks, ripple effects)
- **Icons**: Lucide React + Custom SVG Coffee Craft assets
- **Typography**: Google Fonts — *Playfair Display* (Editorial headings), *Inter* (Crisp UI), *Noto Naskh Arabic / Amiri* (Cultural accents)
- **State Architecture**: React Context API (`ProfileContext`) + `useReducer` for reactive state sync across device views

---

## 🔍 Detailed Phase Breakdown & Task List

### Phase 0: Project Setup, Design Tokens & Foundation
- [x] Initialize Vite + React workspace in `/Users/noor/Projects/fayrouz`
- [x] Install dependencies:
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `framer-motion`
  - `lucide-react`
  - `canvas-confetti` (for celebratory taste profile generation)
- [x] Configure `tailwind.config.js` with bespoke Fayrouz palette
- [x] Configure typography (`Playfair Display`, `Inter`, `Amiri`) in `index.html` and `src/index.css`
- [x] Establish global reusable UI utilities (glassmorphic panels, amber glow rings, custom scrollbars)

---

### Phase 1: Rich Data Layer & Filtering/Ranking Engine
- [x] Create `src/data/menuData.json` (25 distinct specialty items spanning 5 categories)
- [x] Build `src/context/ProfileContext.jsx` with central reactive state & 4 demo presets
- [x] Build `src/utils/personalizationEngine.js` with allergen dimming, oat milk surcharge, relevance scoring, and adventurous wildcard
- [x] Build automated test suite (`src/utils/personalizationEngine.test.js`) — 21/21 tests passed
- [x] Build interactive testbench (`src/components/dev/EnginePlayground.jsx`)

---

### Phase 2: Sensory Onboarding Wizard (Mobile Simulator)
- [x] Build `src/components/wizard/WizardContainer.jsx`:
  - Realistic iPhone 16 Pro chassis with brushed titanium-obsidian bezel & glass reflection
  - Responsive adaptive layout (native fullscreen on mobile `<640px`)
  - Active Dynamic Island showing live cafe status (*"FAYROUZ • OPEN"*) & morphing into pulsing wave during NFC sync
  - Smooth 60fps bidirectional card-stack transitions with Framer Motion
  - Visual 5-step progress indicator with glowing amber beads and back button
- [x] Build Web Audio API sound synthesis engine (`src/utils/soundEffects.js`) with mute toggle
- [x] Step 1: **Identity & Levantine Hospitality** (`NameStep.jsx`):
  - Cultural greeting: *"صباح الخير.. أهلاً وسهلاً بك في فيروز"*
  - 4 quick-tap persona shortcuts (*Tariq*, *Salma*, *Areej*, *Noor*) for instant pitch demoing
- [x] Step 2: **Dietary Guardrails** (`DietaryStep.jsx`):
  - Multi-select tactile chips (Lactose-Free, Vegan, Nut Allergy, No Restrictions)
  - Mutual exclusivity logic and real-time safety protocol reassurance banner
- [x] Step 3: **The Sensory Palate Slider** (`PalateStep.jsx`):
  - 1 to 10 tactile range slider spanning 3 sensory zones (Dark/Bold, Balanced/Floral, Sweet/Velvet)
  - Real-time ambient background color temperature shifting
  - Dynamic tasting notes pills lighting up based on slider position
- [x] Step 4: **Temperature Affinity** (`TemperatureStep.jsx`):
  - Animated rising steam ribbons for Warm & Steaming card
  - Ice crystal refraction and frost shimmer for Cold & Crisp card
  - "I love both equally" option
- [x] Step 5: **The Generated Taste Passport Card** (`TasteProfileCard.jsx`):
  - Holographic luxury passport card with gold/copper metallic rim and subtle angled sheen
  - Confetti burst on reveal (`canvas-confetti`) with celebratory chord
  - Persona title engine (`src/utils/personaGenerator.js`): English and Arabic titles (*"The Single-Origin Purist"*, *"The Sweet Alchemist"*)
  - 10-segmented palate gauge, dietary badges, and unique passport number
  - Pulsing primary action: **"Step Up to Counter & Tap (NFC)"** triggering simulated counter sync

---

### Phase 3: The Magic Dynamic Menu (Tablet Kiosk Simulator)
- [ ] Build `src/components/kiosk/KioskContainer.jsx`:
  - iPad Pro bezel simulation with landscape ratio and camera dot
  - Cafe Header: *"FAYROUZ SPECIALTY ROASTERS"*, live clock, ambient cafe soundtrack toggle
  - Mode toggle: Switch between Mobile View, Tablet Kiosk View, and Side-by-Side Pitch Mode
- [ ] Build `src/components/kiosk/InitialStateMenu.jsx`:
  - Standard, overwhelming menu showing 20+ items across multiple tabs
  - Represents the high cognitive load of traditional cafe ordering
- [ ] Build `src/components/kiosk/NfcSyncOverlay.jsx`:
  - Tactile **"Tap Phone to Sync Passport (NFC)"** glowing reader zone
  - Click-to-tap or drag-phone interaction
  - Sound/visual ripple wave propagation across the tablet screen upon sync
- [ ] Build `src/components/kiosk/DynamicCuratedMenu.jsx`:
  - **"Curated for You, [Name]"** hero shelf:
    - 3-4 top matches dynamically sorted by relevance
    - 1 highlighted **"Adventurous Pick"** with subtle shimmer effect and justification note (*"Because you enjoy silky textures, explore our Cardamom Rose Mist"*)
  - Real-time catalog transformation:
    - Irrelevant/unsafe items smoothly collapse or dim out
    - Dairy drinks dynamically badge with `(Oat Milk)`
    - Framer Motion `layout` prop ensures 60fps repositioning of cards
- [ ] Build `src/components/kiosk/MenuItemCard.jsx`:
  - High-res visual illustration / photo
  - English and Arabic typography
  - Tasting note pills, dietary tags, temperature indicator
  - Quick-order tap interaction with simulated order tray

---

### Phase 4: Seamless Presentation & Split-Screen "Pitch Mode"
- [ ] Build Top Pitch Control Bar:
  - View switcher:
    - 📱 **Mobile Only** (Wizard Walkthrough)
    - 📟 **Tablet Only** (Counter Kiosk)
    - ⚡ **Side-by-Side Pitch Mode** (Mobile Phone on Left, Tablet Kiosk on Right for instant live demonstration to cafe owners)
  - Quick Reset / Persona Presets button (e.g., *"The Vegan Cold Brew Lover"*, *"The Sweet Caramel Enthusiast"*, *"The Black Espresso Aficionado"*)
- [ ] Build audio/sensory ambient layer (optional subtle sound effects for card taps, steam hiss, NFC chime)

---

### Phase 5: Verification, Edge Case QA & Final Polish
- [ ] Test edge cases:
  - Lactose + Vegan + Nut Allergy combined (ensuring safe items remain available)
  - Extreme palate score = 1 (Black, bold pour-overs prioritized)
  - Extreme palate score = 10 (Dessert, Spanish lattes prioritized)
- [ ] Test fluid responsiveness on different screen sizes
- [ ] Verify 60fps animation performance without layout thrashing

---

## 🎯 Definition of Done for Pitch Prototype
1. Cafe owners immediately grasp the value proposition: **"Ordering time drops from 90s to 15s while ticket satisfaction surges."**
2. The Levantine warmth (*Fayrouziyat*) is visually and emotionally felt.
3. Every filter and slider produces real, noticeable, and logical alterations to the menu.
