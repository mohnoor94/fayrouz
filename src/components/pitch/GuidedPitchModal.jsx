import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { 
  X, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Radio, 
  Coffee, 
  RotateCcw, 
  TrendingUp, 
  CheckCircle2,
  Users
} from 'lucide-react'

const PITCH_STEPS = [
  {
    stepNumber: '01',
    title: 'The Counter Chaos (The Baseline Problem)',
    titleAr: 'فوضى الطابور التقليدي',
    duration: '30 seconds',
    script: `“Notice the tablet kiosk on the right in its neutral state. Like every specialty cafe, it presents 25+ esoteric choices. Customers freeze with choice paralysis. Allergen questions cause hesitation. The average line slows to 95 seconds per order.”`,
    keyTakeaway: 'Specialty coffee menus have high cognitive load and friction.',
    actionLabel: 'Reset Kiosk to Neutral Baseline',
    actionType: 'reset'
  },
  {
    stepNumber: '02',
    title: 'The Taste Passport (Sensory Onboarding)',
    titleAr: 'جواز التذوق الحسي',
    duration: '45 seconds',
    script: `“On the left is the customer’s mobile phone. Through our 5-step sensory wizard, Fayrouz captures dietary guardrails, Levantine flavor pillars, roast depth, and sweetness calibration in just 30 seconds, minting their unique Taste Passport.”`,
    keyTakeaway: 'Zero-friction sensory calibration with cultural Levantine hospitality.',
    actionLabel: 'Load Persona: Salma (Vegan & Nut-Free)',
    actionType: 'load-salma'
  },
  {
    stepNumber: '03',
    title: 'The Magic Handshake (Instant Recognition)',
    titleAr: 'المصافحة الذهبية الرقمية',
    duration: '20 seconds',
    script: `“Now watch: the guest steps up and taps their phone to the counter. An encrypted NFC handshake beams their palate. Look at the kiosk right now—the 25-item catalog transforms instantly into 3 hyper-personalized matches plus 1 curated discovery pick.”`,
    keyTakeaway: 'Transforms counter ordering from 95 seconds to 14 seconds.',
    actionLabel: 'Trigger Golden NFC Handshake',
    actionType: 'nfc-sync'
  },
  {
    stepNumber: '04',
    title: 'Live Reactive Morphing & High-Margin ROI',
    titleAr: 'التكيف اللحظي والعائد التجاري',
    duration: '60 seconds',
    script: `“Notice how Salma’s nut allergy automatically dims unsafe recipes to 35% opacity with warning badges, while dairy lattes auto-swap to oat milk. When preferences adjust on mobile, the kiosk morphs in 60fps real-time. Result: +22% ticket lift and 100% allergen compliance.”`,
    keyTakeaway: 'Boosts average check while eliminating verbal allergy mistakes.',
    actionLabel: 'Load Persona: Tariq (Single-Origin Purist)',
    actionType: 'load-tariq'
  }
]

export default function GuidedPitchModal({ isOpen, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const { 
    resetNfcSync, 
    triggerNfcSync, 
    loadPreset, 
    userProfile 
  } = useProfile()

  if (!isOpen) return null

  const step = PITCH_STEPS[currentStepIndex]

  const handleNext = () => {
    soundFx.playTap()
    setCurrentStepIndex(prev => Math.min(PITCH_STEPS.length - 1, prev + 1))
  }

  const handlePrev = () => {
    soundFx.playTap()
    setCurrentStepIndex(prev => Math.max(0, prev - 1))
  }

  const handleAction = () => {
    soundFx.playTap()
    switch (step.actionType) {
      case 'reset':
        resetNfcSync()
        break
      case 'load-salma':
        loadPreset('vegan')
        break
      case 'nfc-sync':
        triggerNfcSync()
        break
      case 'load-tariq':
        loadPreset('purist')
        break
      default:
        break
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="w-full max-w-2xl bg-fayrouz-espresso/95 border border-fayrouz-amber/40 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,163,115,0.2)] text-fayrouz-cream flex flex-col gap-5 relative overflow-hidden"
      >
        {/* Amber Glow Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-fayrouz-amber/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-fayrouz-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-fayrouz-surface border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-gold shadow-amber-glow">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-fayrouz-cream">
                  Presenter Pitch Cue Card & Script
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-amber/20 text-fayrouz-amber border border-fayrouz-amber/30">
                  Investor & Cafe Owner Demo
                </span>
              </div>
              <p className="text-xs text-fayrouz-foam/70">
                A 4-step guided presentation narrative to articulate the Fayrouz value proposition
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-4 gap-2">
          {PITCH_STEPS.map((s, idx) => (
            <button
              key={s.stepNumber}
              type="button"
              onClick={() => { soundFx.playTap(); setCurrentStepIndex(idx); }}
              className={`flex flex-col items-start p-2 rounded-xl text-left transition-all ${
                currentStepIndex === idx
                  ? 'bg-fayrouz-surface border border-fayrouz-amber/50 shadow-amber-glow'
                  : 'bg-fayrouz-surface/40 border border-fayrouz-border/50 text-fayrouz-muted hover:text-fayrouz-foam'
              }`}
            >
              <div className="flex items-center justify-between w-full text-[10px] font-mono">
                <span className={currentStepIndex === idx ? 'text-fayrouz-amber font-bold' : 'text-fayrouz-muted'}>
                  Act {s.stepNumber}
                </span>
                <span className="text-[9px] text-fayrouz-muted hidden sm:inline">{s.duration}</span>
              </div>
              <span className="text-xs font-serif font-medium line-clamp-1 mt-0.5 text-fayrouz-cream">
                {s.title.split('(')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.stepNumber}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 p-5 rounded-2xl bg-fayrouz-surface/60 border border-fayrouz-border/80"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-fayrouz-amber uppercase tracking-wider">
                  Act {step.stepNumber} • {step.duration}
                </span>
                <h4 className="text-lg font-serif font-bold text-fayrouz-cream mt-0.5">
                  {step.title}
                </h4>
              </div>
              <span className="font-arabic text-sm text-fayrouz-foam/70">
                {step.titleAr}
              </span>
            </div>

            {/* Script Box */}
            <div className="p-4 rounded-xl bg-fayrouz-espresso/80 border border-fayrouz-border/60 relative">
              <span className="text-[9px] font-mono uppercase tracking-widest text-fayrouz-gold mb-1 block">
                🎙 What to Say (Presenter Script):
              </span>
              <p className="text-sm font-serif italic leading-relaxed text-fayrouz-cream">
                {step.script}
              </p>
            </div>

            {/* Key Takeaway & Interactive Demo Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-fayrouz-cardamom font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{step.keyTakeaway}</span>
              </div>

              <button
                type="button"
                onClick={handleAction}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian font-serif font-bold text-xs shadow-amber-glow hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap self-end sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{step.actionLabel}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-fayrouz-border/70 pt-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-colors ${
              currentStepIndex === 0
                ? 'opacity-40 border-fayrouz-border/40 text-fayrouz-muted cursor-not-allowed'
                : 'bg-fayrouz-surface border-fayrouz-border text-fayrouz-cream hover:border-fayrouz-amber/40 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Act</span>
          </button>

          <span className="text-xs font-mono text-fayrouz-muted">
            {currentStepIndex + 1} of {PITCH_STEPS.length}
          </span>

          {currentStepIndex < PITCH_STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-fayrouz-surface border border-fayrouz-amber/40 text-fayrouz-amber hover:bg-fayrouz-amber/10 text-xs font-medium transition-colors cursor-pointer"
            >
              <span>Next Act</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-fayrouz-cardamom/20 border border-fayrouz-cardamom/40 text-fayrouz-cardamom text-xs font-medium hover:bg-fayrouz-cardamom/30 transition-colors cursor-pointer"
            >
              <span>Done / Start Pitch</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
