import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { 
  Radio, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Wifi, 
  Layers 
} from 'lucide-react'

export default function NfcBeamBridge({ onManualSync = null }) {
  const { 
    isSyncing, 
    isNfcSynced, 
    triggerNfcSync, 
    userProfile 
  } = useProfile()

  const handleTrigger = () => {
    soundFx.playBeamPulse()
    if (onManualSync) {
      onManualSync()
    } else {
      triggerNfcSync()
    }
  }

  // Play beam pulse sound effect when syncing starts
  useEffect(() => {
    if (isSyncing) {
      soundFx.playBeamPulse()
    }
  }, [isSyncing])

  return (
    <div className="flex flex-col items-center justify-center relative select-none px-2 py-4 h-full min-h-[160px] w-full max-w-[130px]">
      {/* Background glow conduit */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-full h-12 transition-all duration-700 blur-xl ${
          isSyncing 
            ? 'bg-fayrouz-amber/40 scale-125' 
            : isNfcSynced 
              ? 'bg-fayrouz-gold/20' 
              : 'bg-fayrouz-surface/30'
        }`} />
      </div>

      {/* Main Bridge Column */}
      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        {/* Top Status Icon / Emitter Badge */}
        <motion.button
          type="button"
          onClick={handleTrigger}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          title={isNfcSynced ? "Passport Synced & Live" : "Click to Beam NFC Handshake"}
          className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
            isSyncing
              ? 'bg-gradient-to-tr from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian shadow-amber-glow animate-pulse'
              : isNfcSynced
                ? 'bg-fayrouz-espresso border border-fayrouz-amber/60 text-fayrouz-gold shadow-[0_0_20px_rgba(212,163,115,0.3)]'
                : 'bg-fayrouz-surface/80 border border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-amber hover:border-fayrouz-amber/40'
          }`}
        >
          {isSyncing ? (
            <Radio className="w-6 h-6 animate-spin text-fayrouz-obsidian" />
          ) : isNfcSynced ? (
            <Zap className="w-5 h-5 text-fayrouz-gold fill-fayrouz-gold/30 animate-pulse" />
          ) : (
            <Radio className="w-5 h-5" />
          )}

          {/* Concentric Wave Rings when syncing */}
          {isSyncing && (
            <>
              <span className="absolute -inset-2 rounded-2xl border-2 border-fayrouz-gold/50 animate-ping pointer-events-none" />
              <span className="absolute -inset-4 rounded-3xl border border-fayrouz-amber/30 animate-pulse pointer-events-none" />
            </>
          )}
        </motion.button>

        {/* Horizontal Laser / Particle Track */}
        <div className="relative w-full h-8 flex items-center justify-center overflow-hidden my-1">
          {/* Base Track Line */}
          <div className={`w-full h-[2px] transition-colors duration-500 ${
            isSyncing 
              ? 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber shadow-[0_0_12px_#d4a373]' 
              : isNfcSynced 
                ? 'bg-gradient-to-r from-fayrouz-amber/70 via-fayrouz-cardamom/70 to-fayrouz-gold/70' 
                : 'bg-fayrouz-border/60 border-dashed border-t border-fayrouz-border/40'
          }`} />

          {/* Animated Particles when Syncing */}
          <AnimatePresence>
            {isSyncing && (
              <>
                {[0, 0.2, 0.4, 0.6].map((delay, idx) => (
                  <motion.div
                    key={`particle-${idx}`}
                    initial={{ x: '-60%', opacity: 0, scale: 0.6 }}
                    animate={{ 
                      x: ['-60%', '60%'], 
                      opacity: [0, 1, 1, 0], 
                      scale: [0.6, 1.4, 0.6] 
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay,
                      ease: 'easeInOut'
                    }}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-white via-fayrouz-gold to-fayrouz-amber shadow-[0_0_10px_#fff,0_0_20px_#d4a373] pointer-events-none"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Continuous Subtle Pulse when Synced */}
          {isNfcSynced && !isSyncing && (
            <motion.div
              animate={{ 
                x: ['-50%', '50%'],
                opacity: [0.3, 0.9, 0.3]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute w-4 h-1.5 rounded-full bg-fayrouz-amber/80 blur-[1px] pointer-events-none"
            />
          )}

          {/* Chevron Directional Arrow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
              isSyncing 
                ? 'text-fayrouz-obsidian translate-x-1 scale-125' 
                : isNfcSynced 
                  ? 'text-fayrouz-gold' 
                  : 'text-fayrouz-muted/50'
            }`} />
          </div>
        </div>

        {/* Text Status Pill */}
        <div className="text-center">
          {isSyncing ? (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fayrouz-amber/20 border border-fayrouz-amber/50 text-[9px] font-mono text-fayrouz-gold uppercase tracking-wider animate-pulse whitespace-nowrap">
              <Sparkles className="w-2.5 h-2.5" />
              <span>NFC Beam</span>
            </div>
          ) : isNfcSynced ? (
            <div className="inline-flex flex-col items-center gap-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fayrouz-cardamom/15 border border-fayrouz-cardamom/30 text-[9px] font-mono text-fayrouz-cardamom whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-fayrouz-cardamom animate-ping" />
                <span>Live Link</span>
              </span>
              <span className="text-[8px] font-mono text-fayrouz-muted tracking-tight">
                60fps Reactive
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleTrigger}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-fayrouz-surface/60 hover:bg-fayrouz-surface border border-fayrouz-border/60 hover:border-fayrouz-amber/40 text-[9px] font-mono text-fayrouz-muted hover:text-fayrouz-amber transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Tap to Sync</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
