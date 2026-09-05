import React from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { Flame, Snowflake, Coffee, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react'

export default function TemperatureStep({ onNext, onPrev }) {
  const { userProfile, setTemperature } = useProfile()
  const currentTemp = userProfile.temperature || 'any'

  const handleSelect = (temp) => {
    soundFx.playTap()
    setTemperature(temp)
  }

  const handleContinue = () => {
    soundFx.playStepChime()
    onNext()
  }

  return (
    <div className="flex flex-col h-full px-4 sm:px-5 py-3 justify-between overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-3.5">
        {/* Step Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center text-fayrouz-amber mb-2">
            <Coffee className="w-6 h-6" />
          </div>
          <span className="font-arabic text-sm text-fayrouz-amber">
            حرارة القهوة ومزاج الصباح
          </span>
          <h2 className="text-xl font-serif font-bold text-fayrouz-cream mt-0.5">
            Hot or Iced?
          </h2>
          <p className="text-xs text-fayrouz-foam/70 mt-1 max-w-xs">
            Your top curated shelf will strictly honor your temperature preference.
          </p>
        </div>

        {/* 2 Big Temperature Cards */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          {/* Hot Card */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => handleSelect('hot')}
            className={`p-4 rounded-3xl border flex flex-col items-center justify-between text-center relative overflow-hidden transition-all h-[175px] ${
              currentTemp === 'hot'
                ? 'bg-fayrouz-surface border-fayrouz-ember shadow-[0_0_25px_-5px_rgba(224,122,95,0.4)]'
                : 'bg-fayrouz-espresso/80 border-fayrouz-border/80 hover:border-fayrouz-ember/40'
            }`}
          >
            {/* Animated Rising Steam Wisps */}
            <div className="relative w-12 h-12 flex items-center justify-center mb-1">
              <motion.div
                animate={{ y: [-2, -10, -2], opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute -top-3 text-fayrouz-ember"
              >
                <Flame className="w-4 h-4" />
              </motion.div>
              <div className="w-10 h-10 rounded-2xl bg-fayrouz-ember/20 border border-fayrouz-ember/30 flex items-center justify-center text-fayrouz-ember">
                <Coffee className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-sm font-serif font-bold text-fayrouz-cream">
                Warm & Steaming
              </div>
              <div className="font-arabic text-xs text-fayrouz-ember mt-0.5">
                ساخن ومريح
              </div>
              <div className="text-[10px] text-fayrouz-muted mt-1 line-clamp-2">
                Delicate floral aromatics & velvety microfoam
              </div>
            </div>

            <div className={`w-5 h-5 rounded-lg flex items-center justify-center border mt-2 ${
              currentTemp === 'hot' ? 'bg-fayrouz-ember text-fayrouz-cream border-fayrouz-ember' : 'border-fayrouz-border'
            }`}>
              {currentTemp === 'hot' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </motion.button>

          {/* Iced Card */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => handleSelect('iced')}
            className={`p-4 rounded-3xl border flex flex-col items-center justify-between text-center relative overflow-hidden transition-all h-[175px] ${
              currentTemp === 'iced'
                ? 'bg-fayrouz-surface border-fayrouz-sky shadow-[0_0_25px_-5px_rgba(100,149,237,0.4)]'
                : 'bg-fayrouz-espresso/80 border-fayrouz-border/80 hover:border-fayrouz-sky/40'
            }`}
          >
            {/* Animated Ice / Frost Crystals */}
            <div className="relative w-12 h-12 flex items-center justify-center mb-1">
              <motion.div
                animate={{ rotate: [0, 180, 360], opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute -top-3 text-fayrouz-sky"
              >
                <Snowflake className="w-4 h-4" />
              </motion.div>
              <div className="w-10 h-10 rounded-2xl bg-fayrouz-sky/20 border border-fayrouz-sky/30 flex items-center justify-center text-fayrouz-sky">
                <Snowflake className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-sm font-serif font-bold text-fayrouz-cream">
                Cold & Crisp
              </div>
              <div className="font-arabic text-xs text-fayrouz-sky mt-0.5">
                بارد ومنعش
              </div>
              <div className="text-[10px] text-fayrouz-muted mt-1 line-clamp-2">
                24h slow-drip & flash-chilled over ice
              </div>
            </div>

            <div className={`w-5 h-5 rounded-lg flex items-center justify-center border mt-2 ${
              currentTemp === 'iced' ? 'bg-fayrouz-sky text-fayrouz-obsidian border-fayrouz-sky' : 'border-fayrouz-border'
            }`}>
              {currentTemp === 'iced' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </motion.button>
        </div>

        {/* Any Temp Option */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => handleSelect('any')}
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            currentTemp === 'any'
              ? 'bg-fayrouz-surface border-fayrouz-gold shadow-amber-glow text-fayrouz-cream'
              : 'bg-fayrouz-espresso/60 border-fayrouz-border/80 text-fayrouz-muted hover:border-fayrouz-border'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-fayrouz-gold" />
            <div className="text-left">
              <span className="text-xs font-serif font-semibold">I Love Both Equally</span>
              <span className="font-arabic text-[11px] text-fayrouz-amber ml-2">(أي درجة حرارة)</span>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
            currentTemp === 'any' ? 'bg-fayrouz-gold text-fayrouz-obsidian border-fayrouz-gold' : 'border-fayrouz-border'
          }`}>
            {currentTemp === 'any' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </motion.button>
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
          className="flex-1 py-3.5 rounded-2xl font-serif font-bold text-sm bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian flex items-center justify-center gap-2 shadow-amber-glow cursor-pointer"
        >
          <span>Generate Taste Passport</span>
          <Sparkles className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
