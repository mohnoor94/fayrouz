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
  Coffee, 
  CheckCircle2, 
  RotateCcw,
  Smartphone,
  Check,
  ArrowRight
} from 'lucide-react'

export default function TasteProfileCard({ onRestart, isKiosk = false, onKioskComplete }) {
  const { userProfile, triggerNfcSync, isNfcSynced, isSyncing, completeProfile } = useProfile()
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

  const handleAction = () => {
    if (isKiosk) {
      soundFx.playNfcBeam()
      completeProfile()
      onKioskComplete?.()
    } else {
      soundFx.playNfcBeam()
      triggerNfcSync()
    }
  }

  return (
    <div className="flex flex-col h-full px-4 sm:px-5 py-3 justify-between overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-2.5">
        {/* Top Header */}
        <div className="text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-fayrouz-amber animate-ping" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-fayrouz-amber font-semibold">
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
        initial={{ scale: 0.94, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-fayrouz-obsidian border-2 border-fayrouz-copper/60 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(184,115,51,0.5)] relative overflow-hidden my-auto"
      >
        {/* Holographic Ambient Sheen */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-fayrouz-amber/25 via-fayrouz-rose/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Passport Header Row */}
        <div className="flex items-start justify-between border-b border-fayrouz-border/70 pb-2.5 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-fayrouz-obsidian border border-fayrouz-copper/50 flex items-center justify-center text-fayrouz-amber shadow-inner">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-fayrouz-muted">
                FAYROUZ PASSPORT
              </div>
              <div className="text-sm font-serif font-bold text-fayrouz-cream leading-tight">
                {userProfile.name}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-mono text-xs font-bold text-fayrouz-gold tracking-wider">
              {persona.passportNumber}
            </div>
            <div className="text-[9px] font-mono text-fayrouz-muted">
              {persona.maskedPhone}
            </div>
          </div>
        </div>

        {/* The 16 Dialects™ Archetype Badge & Acronym */}
        <div className="p-3 rounded-2xl bg-fayrouz-obsidian/85 border border-fayrouz-gold/40 mb-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fayrouz-amber/25 to-fayrouz-gold/10 border border-fayrouz-gold/80 flex flex-col items-center justify-center text-center p-0.5 flex-shrink-0 shadow-inner">
              <span className="text-[11px] font-mono font-black text-fayrouz-gold">
                {persona.dialectCode || 'DIALECT'}
              </span>
              <span className="text-[7px] font-mono text-fayrouz-amber">
                {persona.house?.symbol || '⟡'}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[8px] font-mono uppercase tracking-widest text-fayrouz-amber font-bold truncate">
                THE 16 DIALECTS™ • {persona.house?.name}
              </div>
              <div className="text-xs sm:text-sm font-serif font-bold text-fayrouz-cream truncate">
                {persona.title}
              </div>
              <div className="font-arabic text-[10px] text-fayrouz-amber/90 truncate">
                {persona.titleAr}
              </div>
            </div>
          </div>

          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-gold/15 text-fayrouz-gold border border-fayrouz-gold/30 font-bold flex-shrink-0">
            Certified
          </span>
        </div>

        {/* Persona Tagline */}
        <div className="mb-2 px-1">
          <div className="text-[11px] text-fayrouz-foam/85 italic leading-relaxed line-clamp-2">
            "{persona.descriptor}"
          </div>
        </div>

        {/* Soulmate Drink Feature */}
        {persona.dialect?.soulmateDrinkName && (
          <div className="p-2.5 rounded-2xl bg-fayrouz-gold/10 border border-fayrouz-gold/30 mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-fayrouz-amber font-semibold flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-fayrouz-gold" />
              <span>Soulmate Cup:</span>
            </div>
            <div className="text-xs font-serif font-bold text-fayrouz-gold truncate text-right">
              {persona.dialect.soulmateDrinkName}
            </div>
          </div>
        )}

        {/* Multi-Flavor Pillars Highlight */}
        <div className="p-2.5 rounded-2xl bg-fayrouz-obsidian/70 border border-fayrouz-border/80 mb-2.5 flex flex-col gap-1.5">
          <div className="text-[9px] font-mono uppercase text-fayrouz-muted flex items-center justify-between">
            <span>YOUR FLAVOR AFFINITIES</span>
            <span className="text-fayrouz-gold font-bold">TOP PICKS</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {persona.flavorPillarBadges.map((badgeText, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-fayrouz-surface text-fayrouz-cream border border-fayrouz-amber/40 shadow-inner"
              >
                {badgeText}
              </span>
            ))}
          </div>
        </div>

        {/* Dietary, Roast & Temperature Badges */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {persona.badges.map((b, i) => (
            <span
              key={i}
              className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-fayrouz-surface/90 text-fayrouz-cream border border-fayrouz-border/80 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-fayrouz-gold" />
              {b.text}
            </span>
          ))}
        </div>

        {/* Card Footer: Ready at Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-fayrouz-border/60 text-[9px] font-mono text-fayrouz-muted">
          <span className="flex items-center gap-1 text-fayrouz-cardamom">
            <CheckCircle2 className="w-3 h-3" />
            3 Curated Matches Ready
          </span>
          <span className="text-fayrouz-gold">WALLET PASS LINKED</span>
        </div>
      </motion.div>
    </div>

    {/* Pinned Primary Action Button */}
      <div className="flex flex-col gap-1.5 pt-2 pb-1 flex-shrink-0 border-t border-fayrouz-border/60 bg-fayrouz-obsidian z-20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAction}
          disabled={isSyncing}
          className={`w-full py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-amber-glow transition-all ${
            isNfcSynced && !isKiosk
              ? 'bg-fayrouz-cardamom text-fayrouz-obsidian cursor-default'
              : 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian cursor-pointer'
          }`}
        >
          <Radio className={`w-4 h-4 ${isSyncing ? 'animate-spin' : 'animate-pulse'}`} />
          <span>
            {isKiosk
              ? 'Start Ordering with My Passport'
              : isSyncing 
                ? 'Beaming Passport via NFC...' 
                : isNfcSynced 
                  ? 'Passport Synced at Counter!' 
                  : 'Step Up to Counter & Tap (NFC)'}
          </span>
        </motion.button>

        <button
          type="button"
          onClick={() => { soundFx.playTap(); onRestart(); }}
          className="text-[10px] text-fayrouz-muted hover:text-fayrouz-cream flex items-center justify-center gap-1 py-0.5 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Edit Taste Profile</span>
        </button>
      </div>
    </div>
  )
}
