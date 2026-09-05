import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProfileProvider, useProfile } from './context/ProfileContext'
import PitchControlBar from './components/pitch/PitchControlBar'
import DualDeviceCanvas from './components/pitch/DualDeviceCanvas'
import PitchMetricsHud from './components/pitch/PitchMetricsHud'
import KioskContainer from './components/kiosk/KioskContainer'
import WizardContainer from './components/wizard/WizardContainer'
import EnginePlayground from './components/dev/EnginePlayground'
import { BRAND_CONFIG } from './constants/brandConfig'
import { 
  Coffee, 
  Sparkles, 
  Radio, 
  Flame, 
  Snowflake, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Heart,
  Smartphone,
  Tablet,
  Cpu,
  Layers,
  SplitSquareVertical
} from 'lucide-react'

// Color swatches matrix to verify Tailwind tokens from Phase 0
const PALETTE_SWATCHES = [
  { name: 'Obsidian', token: 'bg-fayrouz-obsidian', hex: '#0c0908', border: 'border-fayrouz-border' },
  { name: 'Espresso', token: 'bg-fayrouz-espresso', hex: '#17110e', border: 'border-fayrouz-border' },
  { name: 'Surface', token: 'bg-fayrouz-surface', hex: '#231a15', border: 'border-fayrouz-border' },
  { name: 'Amber', token: 'bg-fayrouz-amber', hex: '#d4a373', textColor: 'text-fayrouz-obsidian' },
  { name: 'Copper', token: 'bg-fayrouz-copper', hex: '#b87333', textColor: 'text-fayrouz-cream' },
  { name: 'Gold', token: 'bg-fayrouz-gold', hex: '#e9c46a', textColor: 'text-fayrouz-obsidian' },
  { name: 'Cream', token: 'bg-fayrouz-cream', hex: '#fefae0', textColor: 'text-fayrouz-obsidian' },
  { name: 'Foam', token: 'bg-fayrouz-foam', hex: '#ede0d4', textColor: 'text-fayrouz-obsidian' },
  { name: 'Muted', token: 'bg-fayrouz-muted', hex: '#8a7265', textColor: 'text-fayrouz-cream' },
  { name: 'Cardamom', token: 'bg-fayrouz-cardamom', hex: '#6b8e23', textColor: 'text-fayrouz-cream' },
  { name: 'Rose', token: 'bg-fayrouz-rose', hex: '#c86d63', textColor: 'text-fayrouz-cream' },
  { name: 'Sky', token: 'bg-fayrouz-sky', hex: '#6495ed', textColor: 'text-fayrouz-obsidian' },
  { name: 'Ember', token: 'bg-fayrouz-ember', hex: '#e07a5f', textColor: 'text-fayrouz-cream' },
]

function AppContent() {
  const { activeDeviceView, setActiveDeviceView } = useProfile()
  const [tapped, setTapped] = useState(false)
  const [likes, setLikes] = useState(12)

  return (
    <div className="min-h-screen bg-fayrouz-obsidian text-fayrouz-cream flex flex-col items-center relative selection:bg-fayrouz-amber/30 selection:text-fayrouz-gold pb-16">
      {/* Background ambient warm glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-fayrouz-amber/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-10 w-[600px] h-[500px] bg-fayrouz-rose/5 rounded-full blur-[130px]" />
        <div className="absolute -bottom-40 left-10 w-[500px] h-[400px] bg-fayrouz-gold/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Floating Pitch Control Bar (Phase 4) */}
      <PitchControlBar />

      {/* Main Presentation Viewport */}
      <main className="relative z-10 w-full flex flex-col items-center justify-start flex-1 px-2 sm:px-4 pt-3 pb-8">
        <AnimatePresence mode="wait">
          {/* Default Mode: Dual-Device Split-Screen Pitch */}
          {activeDeviceView === 'split' && (
            <motion.div
              key="view-split"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <DualDeviceCanvas />
            </motion.div>
          )}

          {/* Mode 2: Mobile Phone Only */}
          {activeDeviceView === 'mobile' && (
            <motion.div
              key="view-mobile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center w-full py-2"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <span className="text-[11px] font-mono text-fayrouz-amber uppercase tracking-widest font-semibold">
                  Customer Experience Simulator • iPhone 16 Pro
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream mt-0.5">
                  Sensory Onboarding & Taste Passport
                </h2>

                {/* Quick Cross-Device Switcher Ribbon */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setActiveDeviceView('split')}
                    className="px-3 py-1 rounded-xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-border hover:border-fayrouz-amber/50 text-xs font-serif text-fayrouz-foam flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <SplitSquareVertical className="w-3.5 h-3.5 text-fayrouz-amber" />
                    <span>⚡ Dual-Device Pitch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDeviceView('tablet')}
                    className="px-3 py-1 rounded-xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-border hover:border-fayrouz-gold/50 text-xs font-serif text-fayrouz-foam flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Tablet className="w-3.5 h-3.5 text-fayrouz-gold" />
                    <span>📟 Counter Kiosk Simulator</span>
                  </button>
                </div>
              </div>
              <WizardContainer />
            </motion.div>
          )}

          {/* Mode 3: Tablet Kiosk Only */}
          {activeDeviceView === 'tablet' && (
            <motion.div
              key="view-tablet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center w-full py-2"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <span className="text-[11px] font-mono text-fayrouz-amber uppercase tracking-widest font-semibold">
                  Counter Roastery Kiosk Simulator • iPad Pro
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream mt-0.5">
                  The Magic Dynamic Menu & Barista Tray
                </h2>

                {/* Quick Cross-Device Switcher Ribbon */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setActiveDeviceView('split')}
                    className="px-3 py-1 rounded-xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-border hover:border-fayrouz-amber/50 text-xs font-serif text-fayrouz-foam flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <SplitSquareVertical className="w-3.5 h-3.5 text-fayrouz-amber" />
                    <span>⚡ Dual-Device Pitch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDeviceView('mobile')}
                    className="px-3 py-1 rounded-xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-border hover:border-fayrouz-amber/50 text-xs font-serif text-fayrouz-foam flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-fayrouz-amber" />
                    <span>📱 Guest Mobile Pass</span>
                  </button>
                </div>
              </div>
              <KioskContainer />
            </motion.div>
          )}

          {/* Mode 4: Dev Engine Testbench */}
          {activeDeviceView === 'playground' && (
            <motion.div
              key="view-playground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-7xl py-2"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-fayrouz-border/60">
                <div>
                  <span className="text-xs font-mono text-fayrouz-amber uppercase tracking-widest font-semibold">
                    Under-The-Hood Architecture
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream">
                    Personalization Matrix & Safeguard Engine
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDeviceView('split')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs flex items-center gap-1.5 shadow-amber-glow cursor-pointer"
                >
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                  <span>Return to Dual Pitch</span>
                </button>
              </div>
              <EnginePlayground />
            </motion.div>
          )}

          {/* Mode 5: Phase 0 Design Tokens & System Swatches */}
          {activeDeviceView === 'phase0' && (
            <motion.div
              key="view-phase0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl w-full py-6"
            >
              {/* Left Column: Interactive Micro-Interaction Testing (7 cols) */}
              <section className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h2 className="text-lg font-serif font-semibold text-fayrouz-cream flex items-center gap-2">
                    <Radio className="w-4 h-4 text-fayrouz-amber animate-pulse" />
                    Framer Motion 60fps Physics & Tactile Card Test
                  </h2>
                  <p className="text-xs text-fayrouz-muted mt-0.5">
                    Demonstrates spring mechanics, dynamic glow, and tap responsiveness.
                  </p>
                </div>

                {/* Simulated Specialty Drink Card */}
                <motion.div 
                  whileHover={{ scale: 1.015, y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="glass-card rounded-3xl p-6 relative overflow-hidden border-fayrouz-amber/25 cursor-pointer group"
                  onClick={() => setTapped(!tapped)}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-fayrouz-amber/15 to-transparent rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-fayrouz-amber animate-ping" />
                      <span className="text-xs font-mono tracking-wider uppercase text-fayrouz-amber">Signature Curated</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30">
                        Oat Milk Available
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-gold/30">
                        Score: 8/10
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center relative overflow-hidden shadow-card-depth flex-shrink-0">
                      <Coffee className="w-10 h-10 text-fayrouz-amber group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-fayrouz-espresso via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream">
                          Cardamom Rose Cortado
                        </h3>
                        <span className="font-arabic text-sm text-fayrouz-foam/70">كورتادو الورد والهيل</span>
                      </div>
                      <p className="text-xs sm:text-sm text-fayrouz-foam/80 mt-1 line-clamp-2">
                        Double shot single-origin espresso, micro-foamed oat milk, steam-infused green cardamom & Damascene rose essence.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-fayrouz-surface text-fayrouz-amber border border-fayrouz-border/80">
                          Floral Bloom
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-fayrouz-surface text-fayrouz-amber border border-fayrouz-border/80">
                          Silky Crema
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-fayrouz-surface text-fayrouz-amber border border-fayrouz-border/80">
                          Balanced Sweetness
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-fayrouz-border/60">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-fayrouz-muted font-mono">$</span>
                      <span className="text-2xl font-serif font-bold text-fayrouz-cream">5.75</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setLikes(l => l + 1); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-xs text-fayrouz-foam transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-fayrouz-rose fill-fayrouz-rose" />
                        <span>{likes}</span>
                      </button>

                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian font-semibold text-xs shadow-amber-glow">
                        <span>{tapped ? "Profile Synced!" : "Tap Card to Test"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Typography Showcase */}
                <div className="glass-card rounded-2xl p-5 border-fayrouz-border/80">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-fayrouz-muted mb-3 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-fayrouz-amber" />
                    Typography System Validation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 rounded-xl bg-fayrouz-surface/70 border border-fayrouz-border/60">
                      <div className="text-[10px] text-fayrouz-muted font-mono mb-1">Playfair Display (Serif)</div>
                      <div className="font-serif text-lg font-bold text-fayrouz-cream">Artisanal Pour-Over</div>
                      <div className="text-xs text-fayrouz-amber font-serif italic mt-0.5">Single Origin Ethiopia Yirgacheffe</div>
                    </div>

                    <div className="p-3 rounded-xl bg-fayrouz-surface/70 border border-fayrouz-border/60">
                      <div className="text-[10px] text-fayrouz-muted font-mono mb-1">Inter (UI Sans)</div>
                      <div className="font-sans text-sm font-semibold text-fayrouz-cream">Dynamic Kiosk Interface</div>
                      <div className="text-xs text-fayrouz-foam/70 font-sans mt-0.5">60fps Layout Transitions & NFC Sync</div>
                    </div>

                    <div className="p-3 rounded-xl bg-fayrouz-surface/70 border border-fayrouz-border/60">
                      <div className="text-[10px] text-fayrouz-muted font-mono mb-1">Amiri (Arabic Naskh)</div>
                      <div className="font-arabic text-xl font-bold text-fayrouz-amber">طعم يلامس الروح</div>
                      <div className="text-xs text-fayrouz-foam/70 font-arabic mt-0.5">طقوس قهوة الصباح البيروتية</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Right Column: Palette & Tokens Swatches (5 cols) */}
              <section className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <h2 className="text-lg font-serif font-semibold text-fayrouz-cream flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-fayrouz-amber" />
                    Fayrouz Levantine Design Tokens
                  </h2>
                  <p className="text-xs text-fayrouz-muted mt-0.5">
                    All 13 bespoke hex tokens compiled through Tailwind CSS v3.4.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-5 border-fayrouz-border/80 flex flex-col gap-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {PALETTE_SWATCHES.map((swatch) => (
                      <div 
                        key={swatch.name} 
                        className="flex flex-col p-2.5 rounded-xl bg-fayrouz-surface/80 border border-fayrouz-border/80 transition-all hover:border-fayrouz-amber/40"
                      >
                        <div className={`h-8 w-full rounded-lg ${swatch.token} ${swatch.border || ''} mb-2 shadow-inner`} />
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-medium text-fayrouz-cream">{swatch.name}</span>
                          <span className="text-[10px] font-mono text-fayrouz-muted">{swatch.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Checklist Box */}
                  <div className="mt-4 pt-4 border-t border-fayrouz-border/60 flex flex-col gap-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-fayrouz-muted">
                      Phase Verification Status
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 text-xs text-fayrouz-foam/90">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-fayrouz-cardamom" />
                        <span>Phase 0: Design Tokens & Typography Verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-fayrouz-cardamom" />
                        <span>Phase 1: Personalization & Allergen Engine Live</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-fayrouz-cardamom" />
                        <span>Phase 2: Sensory Wizard & iPhone 16 Pro Simulator</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-fayrouz-cardamom" />
                        <span>Phase 3: iPad Pro Kiosk Simulator & Drink Artworks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-fayrouz-cardamom" />
                        <span>Phase 4: Dual-Device Split Pitch Mode & Live Telemetry HUD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Cafe Owner Business Impact & Speed Telemetry HUD (Phase 4) */}
      <PitchMetricsHud />

      {/* Bottom Subtle Bar for Dev Navigation */}
      <footer className="w-full max-w-7xl flex items-center justify-between px-6 py-2 border-t border-fayrouz-border/40 text-[11px] font-mono text-fayrouz-muted mt-auto">
        <div className="flex items-center gap-2">
          <span>{BRAND_CONFIG.name}</span>
          <span>•</span>
          <span className="font-arabic">{BRAND_CONFIG.taglineAr}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveDeviceView(activeDeviceView === 'phase0' ? 'split' : 'phase0')}
            className="hover:text-fayrouz-amber transition-colors cursor-pointer flex items-center gap-1"
          >
            <Layers className="w-3 h-3" />
            <span>{activeDeviceView === 'phase0' ? 'Return to Pitch' : 'Design Tokens'}</span>
          </button>
          <span>•</span>
          <span>Phase 4 Pitch Ready</span>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  )
}
