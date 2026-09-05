import React from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { Sliders, ArrowRight, ArrowLeft, Sun, Scale, Moon, Coffee, Heart, Sparkles, Check } from 'lucide-react'

const ROAST_OPTIONS = [
  { id: 'light', label: 'Light & Floral', labelAr: 'تحميص فاتح زهري', desc: 'High acidity, jasmine bloom, V60 clarity', icon: Sun },
  { id: 'medium', label: 'Medium Balanced', labelAr: 'تحميص متوسط متناغم', desc: 'Smooth milk chocolate, toasted hazelnut', icon: Scale },
  { id: 'dark', label: 'Dark & Intense', labelAr: 'تحميص داكن عميق', desc: 'Dense crema, smoky cocoa, Ibrik bold', icon: Moon }
]

const SWEETNESS_OPTIONS = [
  { id: 'unsweetened', label: '0% Unsweetened', labelAr: 'بدون سكر إطلاقاً', desc: 'Terroir purity, single-origin notes', icon: Coffee },
  { id: 'subtle', label: 'Subtle Natural', labelAr: 'حلاوة طبيعية هادئة', desc: 'Medjool date nectar & honey aroma', icon: Sparkles },
  { id: 'sweet', label: 'Rich Indulgent', labelAr: 'حلو ومترف', desc: 'Spanish condensed milk & caramel', icon: Heart }
]

export default function RoastSweetnessStep({ onNext, onPrev }) {
  const { userProfile, setRoastPreference, setSweetnessPreference } = useProfile()
  const currentRoast = userProfile.roastPreference || 'medium'
  const currentSweetness = userProfile.sweetnessPreference || 'subtle'

  const handleRoast = (id) => {
    soundFx.playTap()
    setRoastPreference(id)
  }

  const handleSweetness = (id) => {
    soundFx.playTap()
    setSweetnessPreference(id)
  }

  const handleContinue = () => {
    soundFx.playStepChime()
    onNext()
  }

  return (
    <div className="flex flex-col justify-between h-full px-5 py-4 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {/* Step Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center text-fayrouz-amber mb-1.5 shadow-card-depth">
            <Sliders className="w-6 h-6" />
          </div>
          <span className="font-arabic text-sm text-fayrouz-amber">
            درجة التحميص ولمسة الحلاوة
          </span>
          <h2 className="text-xl font-serif font-bold text-fayrouz-cream mt-0.5">
            Roast & Sweetness Calibration
          </h2>
          <p className="text-xs text-fayrouz-foam/70 mt-0.5 max-w-xs">
            Two intuitive dials to align extraction with your daily mood.
          </p>
        </div>

        {/* Section 1: Roast Character */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted">
            1. Roast Character (درجة التحميص)
          </label>

          <div className="grid grid-cols-3 gap-2">
            {ROAST_OPTIONS.map((opt) => {
              const isSelected = currentRoast === opt.id
              const Icon = opt.icon
              return (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => handleRoast(opt.id)}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center justify-between text-center transition-all min-h-[95px] ${
                    isSelected
                      ? 'bg-fayrouz-surface border-fayrouz-amber shadow-amber-glow text-fayrouz-cream'
                      : 'bg-fayrouz-espresso/70 border-fayrouz-border/70 text-fayrouz-muted hover:border-fayrouz-border'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-fayrouz-amber' : 'text-fayrouz-muted'}`} />
                  <div>
                    <div className="text-[11px] font-serif font-bold leading-tight">
                      {opt.label}
                    </div>
                    <div className="font-arabic text-[9px] text-fayrouz-amber mt-0.5">
                      {opt.labelAr}
                    </div>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border mt-1 ${
                    isSelected ? 'bg-fayrouz-amber text-fayrouz-obsidian border-fayrouz-amber' : 'border-fayrouz-border'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Section 2: Sweetness Touch */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted">
            2. Sweetness Level (لمسة الحلاوة)
          </label>

          <div className="grid grid-cols-3 gap-2">
            {SWEETNESS_OPTIONS.map((opt) => {
              const isSelected = currentSweetness === opt.id
              const Icon = opt.icon
              return (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => handleSweetness(opt.id)}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center justify-between text-center transition-all min-h-[95px] ${
                    isSelected
                      ? 'bg-fayrouz-surface border-fayrouz-gold shadow-amber-glow text-fayrouz-cream'
                      : 'bg-fayrouz-espresso/70 border-fayrouz-border/70 text-fayrouz-muted hover:border-fayrouz-border'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-fayrouz-gold' : 'text-fayrouz-muted'}`} />
                  <div>
                    <div className="text-[11px] font-serif font-bold leading-tight">
                      {opt.label}
                    </div>
                    <div className="font-arabic text-[9px] text-fayrouz-amber mt-0.5">
                      {opt.labelAr}
                    </div>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border mt-1 ${
                    isSelected ? 'bg-fayrouz-gold text-fayrouz-obsidian border-fayrouz-gold' : 'border-fayrouz-border'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="pt-3 border-t border-fayrouz-border/60 flex items-center gap-3">
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
          className="flex-1 py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian flex items-center justify-center gap-2 shadow-amber-glow cursor-pointer"
        >
          <span>Continue to Temperature</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
