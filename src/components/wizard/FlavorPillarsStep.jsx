import React from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { FLAVOR_PILLARS } from '../../utils/personalizationEngine'
import { soundFx } from '../../utils/soundEffects'
import { Sparkles, ArrowRight, ArrowLeft, Check, Coffee } from 'lucide-react'

export default function FlavorPillarsStep({ onNext, onPrev }) {
  const { userProfile, updateProfile, toggleTasteAffinity } = useProfile()
  const affinities = userProfile.tasteAffinities || []
  const count = affinities.length
  const isPureClassic = count === 0

  const handleSelectPureClassic = () => {
    soundFx.playTap()
    updateProfile({ tasteAffinities: [] })
  }

  const handleTogglePillar = (id) => {
    soundFx.playTap()
    toggleTasteAffinity(id)
  }

  const handleContinue = () => {
    soundFx.playStepChime()
    onNext()
  }

  return (
    <div className="flex flex-col h-full px-4 sm:px-5 py-3 justify-between overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-3">
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center text-fayrouz-gold mb-1.5 shadow-card-depth">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-arabic text-sm text-fayrouz-amber">
            ما هي نكهاتك المفضلة في القهوة؟
          </span>
          <h2 className="text-xl font-serif font-bold text-fayrouz-cream mt-0.5">
            Your Coffee Taste & Flavor Notes
          </h2>
          <p className="text-xs text-fayrouz-foam/70 mt-0.5 max-w-xs">
            Prefer pure coffee with zero added flavors? Or enjoy subtle signature notes?
          </p>
        </div>

        {/* Primary Option A: Pure & Classic Coffee (Zero Added Flavors) */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleSelectPureClassic}
          className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
            isPureClassic
              ? 'bg-fayrouz-surface border-fayrouz-gold shadow-amber-glow text-fayrouz-cream'
              : 'bg-fayrouz-espresso/80 border-fayrouz-border/80 text-fayrouz-muted hover:border-fayrouz-border hover:bg-fayrouz-surface/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-lg flex-shrink-0 ${
              isPureClassic 
                ? 'bg-fayrouz-gold/20 border-fayrouz-gold/50 text-fayrouz-gold shadow-inner' 
                : 'bg-fayrouz-obsidian border-fayrouz-border text-fayrouz-muted'
            }`}>
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-serif font-bold text-fayrouz-cream">
                  Pure Classic Coffee (No Flavors)
                </span>
                <span className="font-arabic text-[11px] text-fayrouz-amber font-normal">
                  (قهوة كلاسيكية نقية)
                </span>
              </div>
              <div className="text-[10px] text-fayrouz-foam/70 mt-0.5">
                Pure roasted beans, espresso & pour-over clarity, unflavored black or plain milk.
              </div>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-lg flex items-center justify-center border flex-shrink-0 ${
            isPureClassic ? 'bg-fayrouz-gold text-fayrouz-obsidian border-fayrouz-gold' : 'border-fayrouz-border'
          }`}>
            {isPureClassic && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </motion.button>

        {/* Section Divider & Counter */}
        <div className="flex items-center justify-between px-1 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted">
            Or Pick 1 to 3 Signature Flavor Notes
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
            count > 0 
              ? 'bg-fayrouz-amber/20 text-fayrouz-gold border-fayrouz-gold/40 font-bold' 
              : 'bg-fayrouz-surface text-fayrouz-muted border-fayrouz-border'
          }`}>
            {count === 0 ? 'Classic Selected' : `${count} / 3 Selected`}
          </span>
        </div>

        {/* 5 Distinct Flavor Pillar Cards */}
        <div className="grid grid-cols-1 gap-2">
          {FLAVOR_PILLARS.map((pillar) => {
            const isSelected = affinities.includes(pillar.id)
            const isMaxReached = count >= 3 && !isSelected

            return (
              <motion.button
                key={pillar.id}
                type="button"
                whileTap={!isMaxReached ? { scale: 0.98 } : {}}
                onClick={() => !isMaxReached && handleTogglePillar(pillar.id)}
                disabled={isMaxReached}
                className={`p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-fayrouz-surface border-fayrouz-amber shadow-amber-glow text-fayrouz-cream cursor-pointer'
                    : isMaxReached
                      ? 'opacity-40 bg-fayrouz-espresso/50 border-fayrouz-border/50 text-fayrouz-muted cursor-not-allowed'
                      : 'bg-fayrouz-espresso/80 border-fayrouz-border/70 text-fayrouz-muted hover:border-fayrouz-border hover:bg-fayrouz-surface/60 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-fayrouz-obsidian border border-fayrouz-border/80 flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
                    {pillar.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif font-bold text-fayrouz-cream">
                        {pillar.name}
                      </span>
                      <span className="font-arabic text-[11px] text-fayrouz-amber font-normal">
                        ({pillar.nameAr})
                      </span>
                    </div>
                    <div className="text-[10px] text-fayrouz-foam/70 mt-0.5">
                      {pillar.desc}
                    </div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border flex-shrink-0 ${
                  isSelected ? 'bg-fayrouz-amber text-fayrouz-obsidian border-fayrouz-amber' : 'border-fayrouz-border'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Helpful Tip */}
        <div className="p-2.5 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-border/60 text-[10px] text-fayrouz-foam/80 flex items-center justify-between gap-2">
          <span>
            💡 Prefer pure coffee? Tap <strong>Pure Classic Coffee</strong> above to keep your profile 100% unflavored.
          </span>
        </div>
      </div>

      {/* Pinned Bottom Nav */}
      <div className="pt-2.5 pb-1 flex-shrink-0 border-t border-fayrouz-border/60 bg-fayrouz-obsidian z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => { soundFx.playTap(); onPrev(); }}
          className="p-3 rounded-2xl bg-fayrouz-surface border border-fayrouz-border text-fayrouz-foam hover:text-fayrouz-cream transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="flex-1 py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian flex items-center justify-center gap-2 shadow-amber-glow cursor-pointer"
        >
          <span>
            {isPureClassic
              ? 'Continue with Pure Classic Coffee'
              : `Continue with ${count} ${count === 1 ? 'Flavor Note' : 'Flavor Notes'}`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
