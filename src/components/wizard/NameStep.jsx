import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { Coffee, Sparkles, ArrowRight, UserCheck, Smartphone, ShieldCheck } from 'lucide-react'

const COUNTRY_CODES = [
  { code: '+962', flag: '🇯🇴', country: 'Jordan' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+961', flag: '🇱🇧', country: 'Lebanon' },
  { code: '+966', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: '+1', flag: '🇺🇸', country: 'USA' },
]

export default function NameStep({ onNext }) {
  const { userProfile, updateProfile, demoPresets, loadPreset } = useProfile()
  const nameInputRef = useRef(null)
  const [selectedCountryCode, setSelectedCountryCode] = useState('+962')
  const [phoneNumber, setPhoneNumber] = useState('79 555 1234')

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (userProfile.name?.trim()) {
      soundFx.playStepChime()
      updateProfile({
        name: userProfile.name.trim(),
        phone: `${selectedCountryCode} ${phoneNumber.trim()}`
      })
      onNext()
    }
  }

  const handlePresetSelect = (presetId) => {
    soundFx.playTap()
    loadPreset(presetId)
  }

  return (
    <div className="flex flex-col justify-between h-full px-5 py-4 overflow-y-auto">
      {/* Top Section: Welcoming Ritual */}
      <div className="flex flex-col gap-4">
        <div className="text-center flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-13 h-13 rounded-2xl bg-fayrouz-surface border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-amber shadow-amber-glow mb-2 relative"
          >
            <Coffee className="w-6 h-6" />
            <motion.div 
              animate={{ y: [-2, -8, -2], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-fayrouz-amber"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
          </motion.div>

          <span className="font-arabic text-lg font-bold text-fayrouz-amber tracking-wide">
            صباح الخير.. أهلاً وسهلاً بك في فيروز
          </span>
          <h2 className="text-xl font-serif font-bold text-fayrouz-cream mt-0.5 tracking-tight">
            Universal Coffee Passport
          </h2>
          <p className="text-xs text-fayrouz-foam/80 mt-0.5 max-w-xs">
            Personal hospitality linked to your phone for instant NFC counter recognition.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted">
              Your Name (اسمك عند المناداة)
            </label>
            <input
              ref={nameInputRef}
              type="text"
              value={userProfile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              placeholder="e.g. Layla, Tariq, Noor..."
              className="w-full bg-fayrouz-surface/90 border border-fayrouz-border focus:border-fayrouz-amber rounded-xl px-3.5 py-2.5 text-sm font-serif text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none shadow-inner transition-all"
              maxLength={24}
            />
          </div>

          {/* Phone / WhatsApp Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-fayrouz-amber" />
                Mobile / WhatsApp Pass Link
              </span>
              <span className="text-[9px] text-fayrouz-cardamom font-mono">Instant Wallet Pass</span>
            </label>
            
            <div className="flex items-center gap-2">
              {/* Country Code Select */}
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="bg-fayrouz-surface border border-fayrouz-border rounded-xl px-2.5 py-2 text-xs text-fayrouz-cream focus:outline-none focus:border-fayrouz-amber"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              {/* Number Field */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="79 555 1234"
                className="flex-1 bg-fayrouz-surface/90 border border-fayrouz-border focus:border-fayrouz-amber rounded-xl px-3 py-2 text-xs font-mono text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Preset Shortcuts for Pitches */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-fayrouz-muted uppercase tracking-wider">
                1-Tap Pitch Presets
              </span>
              <span className="text-[9px] text-fayrouz-gold font-mono">Instant Fill</span>
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
                      {preset.name} <span className="font-arabic text-[10px] text-fayrouz-amber font-normal">({preset.nameAr})</span>
                    </span>
                    <span className="text-[9px] text-fayrouz-muted truncate max-w-[110px]">
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
      <div className="pt-3 border-t border-fayrouz-border/60">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!userProfile.name?.trim()}
          className={`w-full py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-amber-glow transition-all ${
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
