import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { BRAND_CONFIG } from '../../constants/brandConfig'
import GuidedPitchModal from './GuidedPitchModal'
import { 
  Coffee, 
  Sparkles, 
  Smartphone, 
  Tablet, 
  SplitSquareVertical, 
  RotateCcw, 
  Radio, 
  Music, 
  BookOpen, 
  Cpu, 
  User, 
  Check, 
  Flame, 
  ShieldCheck 
} from 'lucide-react'

export default function PitchControlBar() {
  const { 
    activeDeviceView, 
    setActiveDeviceView, 
    demoPresets, 
    activePresetId, 
    loadPreset, 
    resetProfile, 
    triggerNfcSync, 
    resetNfcSync,
    isNfcSynced, 
    isSyncing, 
    userProfile 
  } = useProfile()

  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [isAmbientOn, setIsAmbientOn] = useState(false)

  const handleSelectView = (view) => {
    soundFx.playTap()
    setActiveDeviceView(view)
  }

  const handleLoadPreset = (presetId) => {
    soundFx.playStepChime()
    loadPreset(presetId)
  }

  const handleToggleAmbient = () => {
    const isPlaying = soundFx.toggleAmbientCafe()
    setIsAmbientOn(isPlaying)
  }

  const handleTriggerNfc = () => {
    soundFx.playBeamPulse()
    triggerNfcSync()
  }

  const handleReset = () => {
    soundFx.playTap()
    resetProfile()
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-fayrouz-espresso/90 backdrop-blur-xl border-b border-fayrouz-border/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] px-3 sm:px-6 py-2.5 flex flex-col gap-2.5">
        {/* Main Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto w-full">
          {/* Brand Identity & Live Mode Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-fayrouz-surface border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-amber shadow-amber-glow">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-serif font-bold text-gold-gradient tracking-tight">
                  {BRAND_CONFIG.shortName}
                </h2>
                <span className="font-arabic text-xs text-fayrouz-amber">
                  ({BRAND_CONFIG.shortNameAr})
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-fayrouz-amber/15 text-fayrouz-amber border border-fayrouz-amber/30 ml-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Pitch Deck Mode
                </span>
              </div>
            </div>
          </div>

          {/* Center: Device View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-fayrouz-surface/80 border border-fayrouz-border/80">
            <button
              type="button"
              onClick={() => handleSelectView('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
                activeDeviceView === 'split'
                  ? 'bg-gradient-to-r from-fayrouz-amber/25 to-fayrouz-gold/25 text-fayrouz-gold border border-fayrouz-amber/40 shadow-amber-glow'
                  : 'text-fayrouz-muted hover:text-fayrouz-cream'
              }`}
              title="Dual-Device Split Screen: Mobile on Left, Tablet Kiosk on Right"
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>⚡ Dual-Device Pitch</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectView('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
                activeDeviceView === 'mobile'
                  ? 'bg-fayrouz-surface text-fayrouz-amber border border-fayrouz-amber/40 shadow-amber-glow'
                  : 'text-fayrouz-muted hover:text-fayrouz-cream'
              }`}
              title="Mobile Phone Only: Taste Passport & Sensory Wizard"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile Only</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectView('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
                activeDeviceView === 'tablet'
                  ? 'bg-fayrouz-surface text-fayrouz-amber border border-fayrouz-amber/40 shadow-amber-glow'
                  : 'text-fayrouz-muted hover:text-fayrouz-cream'
              }`}
              title="Tablet Kiosk Only: Counter Ordering & Barista Tray"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet Only</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectView('playground')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
                activeDeviceView === 'playground'
                  ? 'bg-fayrouz-surface text-fayrouz-amber border border-fayrouz-amber/40 shadow-amber-glow'
                  : 'text-fayrouz-muted hover:text-fayrouz-cream'
              }`}
              title="Dev Engine Playground: Personalization matrix and testbench"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Engine Testbench</span>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Guided Pitch Script Modal Button */}
            <button
              type="button"
              onClick={() => { soundFx.playTap(); setIsGuideOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-amber/30 text-fayrouz-gold text-xs font-serif transition-all shadow-sm cursor-pointer"
              title="Open Presenter Talking Script & Cue Card"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pitch Script</span>
            </button>

            {/* Ambient Audio Soundscape */}
            <button
              type="button"
              onClick={handleToggleAmbient}
              className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                isAmbientOn
                  ? 'bg-fayrouz-amber/20 border-fayrouz-amber/50 text-fayrouz-gold shadow-amber-glow'
                  : 'bg-fayrouz-surface border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-cream'
              }`}
              title={isAmbientOn ? "Stop Acoustic Coffeehouse Soundscape" : "Start Fairuz Acoustic Soundscape"}
            >
              <Music className={`w-3.5 h-3.5 ${isAmbientOn ? 'animate-bounce' : ''}`} />
            </button>

            {/* Simulated NFC Beam CTA */}
            <button
              type="button"
              onClick={handleTriggerNfc}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs shadow-amber-glow hover:opacity-95 transition-all cursor-pointer whitespace-nowrap"
              title="Simulate Mobile NFC Tap Handshake to Counter Kiosk"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              <span>{isNfcSynced ? "Re-Beam NFC" : "Tap NFC"}</span>
            </button>

            {/* Reset Demo Button */}
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
              title="Reset All Demo States to Baseline Neutral"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Persona Quick-Switch Ribbon */}
        <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto w-full pt-1 border-t border-fayrouz-border/50 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted whitespace-nowrap flex items-center gap-1">
              <User className="w-3 h-3 text-fayrouz-amber" />
              1-Click Personas:
            </span>

            {demoPresets.map((preset) => {
              const isActive = activePresetId === preset.id
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleLoadPreset(preset.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-serif transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-fayrouz-amber/20 border border-fayrouz-amber/60 text-fayrouz-gold shadow-amber-glow font-bold'
                      : 'bg-fayrouz-surface/60 border border-fayrouz-border/60 text-fayrouz-foam/80 hover:text-fayrouz-cream hover:border-fayrouz-amber/40'
                  }`}
                  title={`${preset.title}: ${preset.description}`}
                >
                  <span className="font-arabic">{preset.nameAr}</span>
                  <span>({preset.name})</span>
                  {isActive && <Check className="w-3 h-3 text-fayrouz-cardamom" />}
                </button>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-fayrouz-muted">
            <span>Status:</span>
            {isNfcSynced ? (
              <span className="text-fayrouz-cardamom font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-ping" />
                {userProfile.name} Synced
              </span>
            ) : (
              <span className="text-fayrouz-amber">Counter Neutral (25 Items)</span>
            )}
          </div>
        </div>
      </header>

      {/* Guided Script Modal */}
      <GuidedPitchModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </>
  )
}
