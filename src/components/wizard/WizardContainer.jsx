import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import NameStep from './NameStep'
import DietaryStep from './DietaryStep'
import FlavorPillarsStep from './FlavorPillarsStep'
import RoastSweetnessStep from './RoastSweetnessStep'
import TemperatureStep from './TemperatureStep'
import TasteProfileCard from './TasteProfileCard'
import { 
  Wifi, 
  Battery, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles,
  X
} from 'lucide-react'

const STEP_TITLES = [
  'Identity & Mobile Pass',
  'Dietary Guardrails',
  'Top Taste Affinities',
  'Roast & Sweetness',
  'Temperature Affinity',
  'Your Taste Passport'
]

// Spring transition variants for card stack
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 28 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 28 },
      opacity: { duration: 0.15 }
    }
  })
}

export default function WizardContainer({ isKiosk = false, onCloseKiosk = null }) {
  const { 
    wizardStep, 
    setWizardStep, 
    nextStep, 
    prevStep, 
    isSyncing 
  } = useProfile()

  const [direction, setDirection] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const handleNext = () => {
    setDirection(1)
    nextStep()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevStep()
  }

  const handleRestart = () => {
    setDirection(-1)
    setWizardStep(0)
  }

  const toggleSound = () => {
    const muted = soundFx.toggleMute()
    setIsMuted(muted)
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full ${isKiosk ? 'p-0 h-full max-h-full' : 'py-2'}`}>
      {/* Chassis Frame: Phone on Mobile Simulator, or sleek tablet card in kiosk mode */}
      <div className={`w-full ${
        isKiosk 
          ? 'sm:max-w-[450px] h-[590px] sm:h-[620px] max-h-[88vh] rounded-[32px]' 
          : 'sm:max-w-[400px] h-[720px] sm:h-[750px] max-h-[86vh] rounded-[44px]'
      } bg-gradient-to-b from-[#2a2420] via-[#1a1411] to-[#0c0908] p-3 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(212,163,115,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col relative border border-[#3d2c22]`}>
        
        {/* Screen Glass Inner Shell */}
        <div className={`w-full h-full ${isKiosk ? 'rounded-[26px]' : 'rounded-[38px]'} bg-fayrouz-obsidian flex flex-col overflow-hidden border border-fayrouz-border/50 relative shadow-inner`}>
          
          {/* Top Status Bar with Dynamic Island */}
          <div className="pt-2 px-6 flex items-center justify-between z-30 flex-shrink-0 select-none">
            {/* Left element */}
            <span className="text-[11px] font-mono font-medium text-fayrouz-foam/80">
              09:42
            </span>

            {/* Dynamic Island Pill */}
            <motion.div 
              layout
              className={`h-6 rounded-full bg-black border border-white/10 flex items-center justify-between px-3 gap-2 transition-all ${
                isSyncing 
                  ? 'w-48 bg-gradient-to-r from-fayrouz-espresso via-fayrouz-amber/30 to-fayrouz-espresso border-fayrouz-amber/50 shadow-amber-glow' 
                  : 'w-36'
              }`}
            >
              {isSyncing ? (
                <>
                  <Radio className="w-3 h-3 text-fayrouz-amber animate-spin" />
                  <span className="text-[9px] font-mono text-fayrouz-amber uppercase tracking-wider animate-pulse">
                    NFC Beaming...
                  </span>
                  <Sparkles className="w-3 h-3 text-fayrouz-gold" />
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-fayrouz-amber animate-pulse" />
                  <span className="text-[9px] font-mono text-fayrouz-foam/70 tracking-tight truncate">
                    FAYROUZ • OPEN
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </>
              )}
            </motion.div>

            {/* Right Status Icons or Close Button if in Kiosk Modal */}
            <div className="flex items-center gap-2 text-fayrouz-foam/80">
              <button
                type="button"
                onClick={toggleSound}
                className="hover:text-fayrouz-amber transition-colors"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-fayrouz-muted" /> : <Volume2 className="w-3.5 h-3.5 text-fayrouz-amber" />}
              </button>

              {isKiosk && onCloseKiosk ? (
                <button
                  type="button"
                  onClick={onCloseKiosk}
                  className="hover:text-fayrouz-cream text-fayrouz-muted transition-colors p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </>
              )}
            </div>
          </div>

          {/* Step Progress Beads (6 Steps) */}
          <div className="px-6 pt-3 pb-1 z-20 flex-shrink-0">
            <div className="flex items-center justify-between text-[9px] font-mono text-fayrouz-muted uppercase tracking-wider mb-1.5">
              <span>{STEP_TITLES[wizardStep]}</span>
              <span>Step 0{wizardStep + 1} / 06</span>
            </div>

            {/* Segmented Progress Bar (6 segments) */}
            <div className="grid grid-cols-6 gap-1.5 h-1 w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full rounded-full transition-all duration-300 ${
                    i <= wizardStep 
                      ? 'bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold shadow-amber-glow' 
                      : 'bg-fayrouz-surface'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Card Stack Viewport */}
          <div className="flex-1 relative overflow-hidden flex flex-col min-h-0">
            <AnimatePresence mode="wait" custom={direction}>
              {wizardStep === 0 && (
                <motion.div
                  key="step0"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <NameStep onNext={handleNext} />
                </motion.div>
              )}

              {wizardStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <DietaryStep onNext={handleNext} onPrev={handlePrev} />
                </motion.div>
              )}

              {wizardStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <FlavorPillarsStep onNext={handleNext} onPrev={handlePrev} />
                </motion.div>
              )}

              {wizardStep === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <RoastSweetnessStep onNext={handleNext} onPrev={handlePrev} />
                </motion.div>
              )}

              {wizardStep === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <TemperatureStep onNext={handleNext} onPrev={handlePrev} />
                </motion.div>
              )}

              {wizardStep === 5 && (
                <motion.div
                  key="step5"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full"
                >
                  <TasteProfileCard 
                    onRestart={handleRestart} 
                    isKiosk={isKiosk}
                    onKioskComplete={onCloseKiosk}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Home Indicator Notch */}
          <div className="py-2 flex items-center justify-center flex-shrink-0 z-20">
            <div className="w-32 h-1 rounded-full bg-fayrouz-border/80" />
          </div>
        </div>
      </div>
    </div>
  )
}
