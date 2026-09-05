# Fayrouz (فيروز) — Universal Coffee Passport
### High-Fidelity Interactive Pitch Prototype & Personalization Engine

> *"مع فنجان قهوة الصباح، وصوت فيروز"* — Inspired by the timeless Levantine ritual of morning coffee and music, **Fayrouz** bridges warm human hospitality with intelligent, real-time personalization for specialty coffee shops.

---

## 📋 Executive Project Plan & Status Tracker

| Phase | Description | Status | Progress |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Project Scaffolding, Design System & Dependencies | `[x] Completed` | 100% |
| **Phase 1** | Mock Data Layer & Personalization Logic Engine | `[x] Completed` | 100% |
| **Phase 2** | Mobile Simulator: Sensory Onboarding Wizard | `[ ] Pending` | 0% |
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
- [x] Configure `tailwind.config.js` with bespoke Fayrouz palette:
  - `fayrouz-obsidian`: `#0c0908` (Deep roasted backdrop)
  - `fayrouz-espresso`: `#17110e` (Card and panel surface)
  - `fayrouz-surface`: `#231a15` (Interactive item highlight)
  - `fayrouz-amber`: `#d4a373` (Primary CTA & warm glow)
  - `fayrouz-copper`: `#b87333` (Metallic badge and borders)
  - `fayrouz-gold`: `#e9c46a` (Star picks and curated items)
  - `fayrouz-cream`: `#fefae0` (Primary typography)
  - `fayrouz-foam`: `#ede0d4` (Subtle secondary text)
  - `fayrouz-cardamom`: `#6b8e23` (Vegan & botanical accents)
  - `fayrouz-rose`: `#c86d63` (Adventurous pick accent)
- [x] Configure typography (`Playfair Display`, `Inter`, `Amiri`) in `index.html` and `src/index.css`
- [x] Establish global reusable UI utilities (glassmorphic panels, amber glow rings, custom scrollbars)

---

### Phase 1: Rich Data Layer & Filtering/Ranking Engine
- [x] Create `src/data/menuData.json` (25 distinct specialty items spanning 5 categories):
  - Categories: *Espresso & Black*, *Velvet & Milk*, *Cold Brew & Infusions*, *Levantine & Signature*, *Tea & Botanical*
  - Detailed English and Arabic titles, roast profiles, tasting notes, allergens, and cultural stories
- [x] Build `src/context/ProfileContext.jsx`:
  - Central reactive state (`userProfile`, `wizardStep`, `personalizedMenu`, `orderTray`)
  - 4 one-click investor pitch demo presets (*The Purist*, *The Plant-Based Nomad*, *The Sweet Indulgence*, *The Balanced Local*)
  - Simulated NFC handshake trigger (`triggerNfcSync`)
- [x] Build `src/utils/personalizationEngine.js`:
  - **Option A Allergen Dimming**: Unsafe items remain visible in full catalog, dimmed (35% opacity) with warning badges
  - **Plant Milk Auto-Substitution**: Auto-swaps dairy to Oat Milk with dynamic +$0.50 surcharge
  - **Relevance Scoring Algorithm**: Palate distance penalty $\Delta = |P_{\text{item}} - P_{\text{user}}|$, temperature affinity weighting, and signature boosts
  - **Curated Top Shelf**: Top 3 items strictly adhering to temperature and safety
  - **Adventurous Wildcard ("Expand Your Palate")**: Deterministically selects safe items with $3 \le \Delta \le 5$ and generates bespoke Levantine storytelling rationales
- [x] Build automated test suite (`src/utils/personalizationEngine.test.js`) — 21/21 tests passed
- [x] Build interactive testbench (`src/components/dev/EnginePlayground.jsx`) in `src/App.jsx`

---

### Phase 2: Sensory Onboarding Wizard (Mobile Kiosk / Customer App)
- [ ] Build `src/components/wizard/WizardContainer.jsx`:
  - Realistic iPhone-style chassis with subtle rim reflection and dynamic island
  - Smooth card-stack sliding transitions with Framer Motion
  - Visual step progress with glowing amber beads and step numbers
- [ ] Step 1: **Identity & Hospitality** (`NameStep.jsx`):
  - Prompt: *"What should we call you when your coffee is ready?"*
  - Arabic welcoming subtitle: *"صباح الخير.. أهلاً وسهلاً بك في فيروز"*
  - Ambient floating coffee aroma particles
- [ ] Step 2: **Dietary Guardrails** (`DietaryStep.jsx`):
  - Prompt: *"Any strict rules we must honor?"*
  - Multi-select tactile chips:
    - 🥛 Lactose Intolerant (Auto-swaps to Oat Milk)
    - 🌱 100% Vegan (Plant-based integrity)
    - 🥜 Nut Allergy (Zero cross-contamination)
    - ✨ No Restrictions (Free to roam)
  - Clear visual toggle state, micro-haptic animations
- [ ] Step 3: **The Sensory Palate Slider** (`PalateStep.jsx`):
  - Prompt: *"How do you like your brew?"*
  - Interactive slider (1 to 10):
    - Left (1): *"Dark, Strong & Aromatic"* (Deep espresso crema visual, notes of dark chocolate & smoke)
    - Center (5): *"Balanced & Nuanced"* (Pour-over bloom visual, floral & stone fruits)
    - Right (10): *"Sweet, Milky & Comforting"* (Velvety caramel latte visual, vanilla & praline)
  - Background color dynamically shifts as the slider moves
- [ ] Step 4: **Temperature Affinity** (`TemperatureStep.jsx`):
  - Prompt: *"Hot or Iced?"*
  - Two interactive cards:
    - ☕ **Warm & Steaming**: Subtle animated rising steam ribbons
    - 🧊 **Cold & Crisp**: Floating ice cube refraction and condensation droplet effect
- [ ] Step 5: **The Generated Taste Passport Card** (`TasteProfileCard.jsx`):
  - Holographic-style luxury passport card with gold foil borders
  - Summarizes: Name, Coffee Persona Title (e.g. *"The Velvet Seeker"*, *"The Single-Origin Purist"*), Palate Gauge, Dietary badges
  - Confetti burst on reveal
  - Primary Action: **"Step Up to the Counter"** (Pulse animation triggering the transition)

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
