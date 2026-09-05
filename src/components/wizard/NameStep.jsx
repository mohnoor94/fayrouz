import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { Coffee, Sparkles, ArrowRight, UserCheck, Heart } from 'lucide-react'

export default function NameStep({ onNext }) {
  const { userProfile, updateProfile, demoPresets, loadPreset } = useProfile()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (userProfile.name?.trim()) {
      soundFx.playStepChime()
      onNext()
    }
  }

  const handlePresetSelect = (presetId) => {
    soundFx.playTap()
    loadPreset(presetId)
  }

  return (
    <div className="flex flex-col justify-between h-full px-5 py-4">
      {/* Top Section: Welcoming Ritual */}
      <div className="flex flex-col gap-5">
        <div className="text-center flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 rounded-2xl bg-fayrouz-surface border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-amber shadow-amber-glow mb-3 relative"
          >
            <Coffee className="w-7 h-7" />
            <motion.div 
              animate={{ y: [-2, -8, -2], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-fayrouz-amber"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
          </motion.div>

          <span className="font-arabic text-xl font-bold text-fayrouz-amber tracking-wide">
            صباح الخير.. أهلاً وسهلاً بك في فيروز
          </span>
          <h2 className="text-2xl font-serif font-bold text-fayrouz-cream mt-1 tracking-tight">
            What should we call you?
          </h2>
          <p className="text-xs text-fayrouz-foam/80 mt-1 max-w-xs">
            We craft every cup with personal hospitality. Tell us your name when your order is called.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userProfile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              placeholder="e.g. Layla, Tariq, Noor..."
              className="w-full bg-fayrouz-surface/90 border-2 border-fayrouz-amber/40 focus:border-fayrouz-amber rounded-2xl px-4 py-3.5 text-base font-serif text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none shadow-card-depth transition-all text-center tracking-wide"
              maxLength={24}
            />
          </div>

          {/* Quick Preset Shortcuts for Pitches (Option A) */}
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-fayrouz-muted uppercase tracking-wider">
                Quick Demo Personas
              </span>
              <span className="text-[10px] text-fayrouz-gold font-mono">1-Tap Fill</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {demoPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset.id)}
                  className="flex items-center justify-between p-2 rounded-xl bg-fayrouz-espresso border border-fayrouz-border/80 hover:border-fayrouz-amber/50 text-left transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-serif font-semibold text-fayrouz-cream group-hover:text-fayrouz-amber transition-colors">
                      {preset.name} <span className="font-arabic text-[11px] text-fayrouz-amber font-normal">({preset.nameAr})</span>
                    </span>
                    <span className="text-[9px] text-fayrouz-muted truncate max-w-[120px]">
                      {preset.title}
                    </span>
                  </div>
                  <UserCheck className="w-3.5 h-3.5 text-fayrouz-muted group-hover:text-fayrouz-amber flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 border-t border-fayrouz-border/60">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!userProfile.name?.trim()}
          className={`w-full py-3.5 rounded-2xl font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-amber-glow transition-all ${
            userProfile.name?.trim()
              ? 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian cursor-pointer'
              : 'bg-fayrouz-surface text-fayrouz-muted cursor-not-allowed border border-fayrouz-border'
          }`}
        >
          <span>Continue to Dietary Guardrails</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
