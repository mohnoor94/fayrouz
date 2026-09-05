import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useProfile } from '../../context/ProfileContext'
import { generateCoffeePersona } from '../../utils/personaGenerator'
import { soundFx } from '../../utils/soundEffects'
import { 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  Flame, 
  Snowflake, 
  Compass, 
  Coffee, 
  CheckCircle2, 
  RotateCcw,
  QrCode,
  ArrowRight
} from 'lucide-react'

export default function TasteProfileCard({ onRestart }) {
  const { userProfile, triggerNfcSync, isNfcSynced, isSyncing } = useProfile()
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false)

  const persona = generateCoffeePersona(userProfile)

  useEffect(() => {
    if (!hasTriggeredConfetti) {
      soundFx.playPassportReveal()
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4a373', '#e9c46a', '#b87333', '#fefae0', '#c86d63']
      })
      setHasTriggeredConfetti(true)
    }
  }, [hasTriggeredConfetti])

  const handleNfcSync = () => {
    soundFx.playNfcBeam()
    triggerNfcSync()
  }

  return (
    <div className="flex flex-col justify-between h-full px-4 py-3">
      {/* Top Header */}
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-fayrouz-amber animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-fayrouz-amber font-semibold">
            Universal Coffee Passport Active
          </span>
        </div>
        <h2 className="text-lg font-serif font-bold text-gold-gradient">
          {userProfile.name}'s Taste Passport
        </h2>
        <span className="font-arabic text-xs text-fayrouz-amber">
          جواز سفر القهوة الحرفية — فيروز
        </span>
      </div>

      {/* Holographic Luxury Passport Card */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="rounded-3xl p-4.5 sm:p-5 bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-fayrouz-obsidian border-2 border-fayrouz-copper/60 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(184,115,51,0.5)] relative overflow-hidden my-auto"
      >
        {/* Holographic Ambient Sheen */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-fayrouz-amber/25 via-fayrouz-rose/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Passport Header Row */}
        <div className="flex items-start justify-between border-b border-fayrouz-border/70 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-fayrouz-obsidian border border-fayrouz-copper/50 flex items-center justify-center text-fayrouz-amber shadow-inner">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-fayrouz-muted">
                FAYROUZ PASSPORT
              </div>
              <div className="text-base font-serif font-bold text-fayrouz-cream leading-tight">
                {userProfile.name}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-mono text-xs font-bold text-fayrouz-gold tracking-wider">
              {persona.passportNumber}
            </div>
            <div className="text-[9px] font-mono text-fayrouz-muted uppercase">
              TIER: SPECIALTY GUEST
            </div>
          </div>
        </div>

        {/* Persona Title & Arabic Translation */}
        <div className="flex flex-col gap-1 mb-3">
          <div className="text-xs font-mono uppercase text-fayrouz-amber tracking-wider">
            Coffee Persona
          </div>
          <div className="text-xl font-serif font-bold text-fayrouz-cream">
            {persona.title}
          </div>
          <div className="font-arabic text-sm text-fayrouz-amber font-normal">
            {persona.titleAr}
          </div>
          <div className="text-[11px] text-fayrouz-foam/80 mt-1 italic leading-relaxed">
            "{persona.descriptor}"
          </div>
        </div>

        {/* Palate Gauge Bar (1 to 10) */}
        <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-fayrouz-obsidian/70 border border-fayrouz-border/80 mb-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-fayrouz-muted">
            <span>PALATE DIAL</span>
            <span className="text-fayrouz-gold font-bold">SCORE: {persona.score}/10</span>
          </div>

          {/* 10-Segmented Gauge */}
          <div className="grid grid-cols-10 gap-1 h-2 w-full">
            {Array.from({ length: 10 }).map((_, i) => {
              const segScore = i + 1
              const isActive = segScore <= persona.score
              return (
                <div
                  key={i}
                  className={`rounded-sm transition-all ${
                    isActive
                      ? (persona.score <= 3 ? 'bg-fayrouz-amber' : (persona.score <= 7 ? 'bg-fayrouz-gold' : 'bg-fayrouz-rose'))
                      : 'bg-fayrouz-surface'
                  }`}
                />
              )
            })}
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-fayrouz-muted">
            <span>Bold Dark</span>
            <span>Balanced</span>
            <span>Sweet Comfort</span>
          </div>
        </div>

        {/* Dietary & Temperature Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {persona.badges.map((b, i) => (
            <span
              key={i}
              className="text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-fayrouz-surface text-fayrouz-cream border border-fayrouz-border/80 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-fayrouz-gold" />
              {b.text}
            </span>
          ))}
        </div>

        {/* Card Footer: Ready at Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-fayrouz-border/60 text-[10px] font-mono text-fayrouz-muted">
          <span className="flex items-center gap-1.5 text-fayrouz-cardamom">
            <CheckCircle2 className="w-3.5 h-3.5" />
            3 Curated Matches Ready
          </span>
          <span className="text-fayrouz-gold">NFC BEAM READY</span>
        </div>
      </motion.div>

      {/* Primary Action Button: Step up to Counter (NFC Sync) */}
      <div className="flex flex-col gap-2 pt-2 border-t border-fayrouz-border/60">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNfcSync}
          disabled={isSyncing}
          className={`w-full py-3.5 rounded-2xl font-serif font-bold text-sm flex items-center justify-center gap-2.5 shadow-amber-glow transition-all ${
            isNfcSynced
              ? 'bg-fayrouz-cardamom text-fayrouz-obsidian cursor-default'
              : 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian cursor-pointer'
          }`}
        >
          <Radio className={`w-4 h-4 ${isSyncing ? 'animate-spin' : 'animate-pulse'}`} />
          <span>
            {isSyncing 
              ? 'Beaming Passport via NFC...' 
              : isNfcSynced 
                ? 'Passport Synced at Counter!' 
                : 'Step Up to Counter & Tap (NFC)'}
          </span>
        </motion.button>

        <button
          type="button"
          onClick={() => { soundFx.playTap(); onRestart(); }}
          className="text-[11px] text-fayrouz-muted hover:text-fayrouz-cream flex items-center justify-center gap-1 py-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Edit Taste Profile</span>
        </button>
      </div>
    </div>
  )
}
