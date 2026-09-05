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
| **Phase 3** | Tablet Simulator: The Magic Dynamic Menu & NFC Sync | `[x] Completed` | 100% |
| **Phase 4** | Dual-Device Frame, Morphing Transitions & Audio-Visual Warmth | `[x] Completed` | 100% |
| **Phase 5** | Returning Guest ID, Standalone Viewports, Barista KDS & Final Polish | `[ ] In Progress` | Planning ([Phase 5 Plan](./PHASE_5_PLAN.md)) |

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

### Phase 2: Sensory Onboarding Wizard & Multi-Dimensional Taste Passport
- [x] Build `src/components/wizard/WizardContainer.jsx`:
  - Dual-device design: Native mobile phone simulator chassis or centered modal overlay on tablet kiosk
  - Responsive adaptive layout (native fullscreen on mobile `<640px`)
  - Active Dynamic Island showing live cafe status (*"FAYROUZ • OPEN"*) & morphing into pulsing wave during NFC sync
  - Smooth 60fps bidirectional card-stack transitions with Framer Motion
  - Visual 6-step progress indicator with glowing amber beads and back button
- [x] Build Web Audio API sound synthesis engine (`src/utils/soundEffects.js`) with mute toggle
- [x] Step 1: **Identity & Customer Registration** (`NameStep.jsx`):
  - Full name capture with cultural Arabic typography
  - Mobile / WhatsApp phone registration with international country dial code selector (`+962`, `+971`, `+961`, `+966`, `+1`)
  - 1-tap pitch demo presets (Tariq, Salma, Areej, Noor)
- [x] Step 2: **Dietary Guardrails** (`DietaryStep.jsx`):
  - Nut Allergy, Vegan, Lactose-Free, Gluten-Free options with visual badge tags
- [x] Step 3: **Top Taste Affinities (Levantine Flavor Pillars)** (`FlavorPillarsStep.jsx`):
  - 5 bespoke flavor pillars: *Damascene Rose & Blossom*, *Dark Cocoa & Tahini*, *Bright Citrus & Terroir*, *Spiced Cardamom & Dates*, *Silky Velvet & Microfoam*
  - Up to 3 selections allowed (minimum 1 recommended)
  - Helper note: *"You can always refine your full flavor radar at fayrouz.coffee/passport"*
- [x] Step 4: **Roast & Sweetness Calibration** (`RoastSweetnessStep.jsx`):
  - 3 Roast Levels: Light & Floral, Medium Balanced, Dark Intense
  - 3 Sweetness Levels: 0% Unsweetened, Subtle Natural Touch, Rich & Indulgent Sweet
- [x] Step 5: **Temperature Affinity** (`TemperatureStep.jsx`):
  - Chilled & Iced vs Steaming Warmth vs All-Weather flexibility
- [x] Step 6: **The Generated Taste Passport Card** (`TasteProfileCard.jsx`):
  - Bespoke Levantine persona title, cultural Arabic moniker, unique ID (`FYZ-XXXX`)
  - Masked customer phone display (`+962 79 •••• 1234`)
  - Multi-flavor radar tags and safety protocol badges
  - Dual-Device trigger: Mobile triggers NFC tap beam; Kiosk triggers *"Start Ordering with My Passport"* to unlock curated counter display
- [x] Automated test suite expanded to 30 tests (`src/utils/personalizationEngine.test.js`) — 30/30 passed

---

### Phase 3: The Magic Dynamic Menu (Tablet Kiosk Simulator)
- [x] Build `src/components/kiosk/KioskContainer.jsx`:
  - iPad Pro bezel simulation with landscape 16:10 ratio and front camera dot
  - Cafe Header: *"FAYROUZ SPECIALTY ROASTERS"*, live clock, ambient cafe soundtrack toggle, and unsync button
- [x] Build `src/components/kiosk/InitialStateMenu.jsx`:
  - Standard, overwhelming menu showing 25 items across 5 categories
  - Demonstrates baseline high cognitive load of traditional cafe ordering
  - Glowing NFC Passport Reader target inviting instant phone tap
- [x] Build `src/components/kiosk/NfcSyncOverlay.jsx`:
  - Expanding golden radial ripple waves spreading across the iPad display
  - Spatial dual-tone chime on sync
- [x] Build `src/components/kiosk/DynamicCuratedMenu.jsx`:
  - Personalized welcoming header (*"صباح الخير يا [Name]"*) with Persona title and safety badges
  - **"Curated for You"** hero shelf: 3 top matches + 1 highlighted **Adventurous Discovery Pick** with custom Levantine storytelling rationale
  - Real-time catalog transformation: unsafe items dimmed to 35% opacity with warning badges, and dairy drinks badged `(Oat Milk)`
  - Framer Motion `layout` prop ensures 60fps card repositioning
- [x] Build `src/components/kiosk/KioskItemCard.jsx`:
  - English and Arabic typography, tasting notes, temperature indicators, and spring tap physics
- [x] Build `src/components/kiosk/OrderTraySidebar.jsx`:
  - Persistent 280px-wide cart sidebar tracking quantities, subtotal, 8% tax, and Barista order submission modal

---

### Phase 4: Seamless Presentation & Split-Screen "Pitch Mode"
- [x] Build Top Pitch Control Bar (`PitchControlBar.jsx`):
  - View switcher:
    - ⚡ **Side-by-Side Pitch Mode** (`DualDeviceCanvas.jsx` with auto-scale engine)
    - 📱 **Mobile Only** (Wizard & Taste Passport Walkthrough)
    - 📟 **Tablet Only** (Counter Kiosk & Barista Tray)
    - 🛠 **Dev Engine Playground** (Personalization matrix testbench)
  - 1-Click Persona Quick-Loader pills (Tariq, Salma, Areej, Noor, Layla)
  - Simulated NFC Beam Handshake CTA & Reset Demo button
- [x] Build Cinematic NFC Beam Bridge (`NfcBeamBridge.jsx`):
  - Animated golden particle wave & laser trajectory crossing between iPhone and iPad
  - Synchronized Web Audio API beam chimes & live reactive link tether
- [x] Build Live Pitch Value HUD (`PitchMetricsHud.jsx`):
  - Real-time empirical ROI dashboard: -85% queue time, -84% cognitive load, +22% ticket lift, 100% allergen safety
  - Collapsible floating bottom dock with glassmorphism
- [x] Build Presenter Pitch Cue Card & Script Modal (`GuidedPitchModal.jsx`):
  - 4-Act guided narrative script with instant demo trigger actions
- [x] Build Audio-Visual Levantine Atmosphere (`soundEffects.js`):
  - Espresso steam wand hiss synthesis
  - Barista brass service counter bell synthesis
  - Acoustic Fairuz morning coffeehouse ambient soundscape loop


---

### Phase 5: Verification, Edge Case QA & Final Polish (Completed • See [PHASE_5_PLAN.md](file:///Users/noor/Projects/fayrouz/docs/plans/PHASE_5_PLAN.md))
- [x] Multi-Channel Returning Guest Recognition (`ReturningGuestLookupModal.jsx`, NFC tap simulation, Phone / FayrouzPass ID lookup, "Your Usual" 1-tap reorder)
- [x] Standalone Viewport Independence (`activeDeviceView === 'mobile'`, `'tablet'`, `'barista'`, `'split'`)
- [x] Zero-Overflow Kiosk Card Architecture (Fluid responsive heights, wrap chips, compact hero NFC banner)
- [x] Barista Station KDS Screen (`BaristaKdsView.jsx`, extraction specs, pitcher assignments, companion allergen isolation alerts, service bell chime)
- [x] Edge-Case Automated Test Suite (100/100 tests passing in `personalizationEngine.test.js`)
- [x] Presenter Keyboard Shortcuts (`1-4`, `Space`, `R`, `B`, `D/S`, `M`, `T`, `P`, `?` and `KeyboardShortcutsModal.jsx`)

---

## 🎯 Definition of Done for Pitch Prototype
1. Cafe owners immediately grasp the value proposition: **"Ordering time drops from 90s to 15s while ticket satisfaction surges."**
2. The Levantine warmth (*Fayrouziyat*) is visually and emotionally felt.
3. Every filter and slider produces real, noticeable, and logical alterations to the menu.
