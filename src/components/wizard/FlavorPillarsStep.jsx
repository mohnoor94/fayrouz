import React from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { FLAVOR_PILLARS } from '../../utils/personalizationEngine'
import { soundFx } from '../../utils/soundEffects'
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, ExternalLink } from 'lucide-react'

export default function FlavorPillarsStep({ onNext, onPrev }) {
  const { userProfile, toggleTasteAffinity } = useProfile()
  const affinities = userProfile.tasteAffinities || []
  const count = affinities.length

  const handleToggle = (id) => {
    soundFx.playTap()
    toggleTasteAffinity(id)
  }

  const handleContinue = () => {
    if (count > 0) {
      soundFx.playStepChime()
      onNext()
    }
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
            ما هي النوتات الأقرب إلى ذوقك؟
          </span>
          <h2 className="text-xl font-serif font-bold text-fayrouz-cream mt-0.5">
            Your Top Taste Affinities
          </h2>
          <p className="text-xs text-fayrouz-foam/70 mt-0.5 max-w-xs">
            Choose your signature flavors (1 recommended, up to 3).
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted">
            Flavor Pillars
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
            count > 0 
              ? 'bg-fayrouz-amber/20 text-fayrouz-gold border-fayrouz-gold/40 font-bold' 
              : 'bg-fayrouz-surface text-fayrouz-muted border-fayrouz-border'
          }`}>
            {count} / 3 Selected
          </span>
        </div>

        {/* 5 Flavor Pillar Cards */}
        <div className="grid grid-cols-1 gap-2">
          {FLAVOR_PILLARS.map((pillar) => {
            const isSelected = affinities.includes(pillar.id)
            const isMaxReached = count >= 3 && !isSelected

            return (
              <motion.button
                key={pillar.id}
                type="button"
                whileTap={!isMaxReached ? { scale: 0.98 } : {}}
                onClick={() => !isMaxReached && handleToggle(pillar.id)}
                disabled={isMaxReached}
                className={`p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-fayrouz-surface border-fayrouz-amber shadow-amber-glow text-fayrouz-cream'
                    : isMaxReached
                      ? 'opacity-40 bg-fayrouz-espresso/50 border-fayrouz-border/50 text-fayrouz-muted cursor-not-allowed'
                      : 'bg-fayrouz-espresso/80 border-fayrouz-border/70 text-fayrouz-muted hover:border-fayrouz-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl flex-shrink-0">
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

        {/* Passport Expansion Note */}
        <div className="p-2.5 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-border/60 text-[10px] text-fayrouz-foam/80 flex items-center justify-between gap-2">
          <span>
            🌐 Expand & fine-tune your full 12-dimension flavor radar anytime at:
          </span>
          <span className="text-fayrouz-amber font-mono font-medium flex items-center gap-1 flex-shrink-0">
            fayrouz.coffee/passport
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>

      {/* Pinned Bottom Nav */}
      <div className="pt-2.5 pb-1 flex-shrink-0 border-t border-fayrouz-border/60 bg-fayrouz-obsidian z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => { soundFx.playTap(); onPrev(); }}
          className="p-3 rounded-2xl bg-fayrouz-surface border border-fayrouz-border text-fayrouz-foam hover:text-fayrouz-cream transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={count === 0}
          className={`flex-1 py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-amber-glow transition-all ${
            count > 0
              ? 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian cursor-pointer'
              : 'bg-fayrouz-surface text-fayrouz-muted cursor-not-allowed border border-fayrouz-border'
          }`}
        >
          <span>Continue to Roast & Sweetness</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
