import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { 
  X, 
  Phone, 
  CreditCard, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  Delete,
  ShieldCheck
} from 'lucide-react'

const COUNTRY_DIAL_CODES = [
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+966', flag: '🇸🇦', name: 'KSA' },
  { code: '+1', flag: '🇺🇸', name: 'USA' }
]

export default function ReturningGuestLookupModal({ isOpen, onClose }) {
  const { demoPresets, loadPreset, triggerNfcSync } = useProfile()
  const [lookupMode, setLookupMode] = useState('phone') // 'phone' | 'passId'
  const [countryCode, setCountryCode] = useState('+962')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [passId, setPassId] = useState('')
  const [matchedGuest, setMatchedGuest] = useState(null)

  if (!isOpen) return null

  // Handle on-screen keypad tap
  const handleKeyTap = (digit) => {
    soundFx.playTap()
    if (lookupMode === 'phone') {
      if (phoneNumber.length < 10) {
        const next = phoneNumber + digit
        setPhoneNumber(next)
        checkAutoMatch(countryCode, next)
      }
    } else {
      if (passId.length < 8) {
        setPassId(prev => prev + digit)
      }
    }
  }

  const handleBackspace = () => {
    soundFx.playTap()
    if (lookupMode === 'phone') {
      const next = phoneNumber.slice(0, -1)
      setPhoneNumber(next)
      checkAutoMatch(countryCode, next)
    } else {
      setPassId(prev => prev.slice(0, -1))
    }
  }

  const handleClear = () => {
    soundFx.playTap()
    setPhoneNumber('')
    setPassId('')
    setMatchedGuest(null)
  }

  // Check if entered number matches a demo preset
  const checkAutoMatch = (code, num) => {
    const full = `${code} ${num}`.replace(/\s+/g, '')
    const found = demoPresets.find(p => p.profile.phone.replace(/\s+/g, '').includes(num))
    if (found && num.length >= 4) {
      setMatchedGuest(found)
    } else {
      setMatchedGuest(null)
    }
  }

  const handleSelectPreset = (preset) => {
    soundFx.playStepChime()
    setMatchedGuest(preset)
    if (lookupMode === 'phone') {
      // Extract country code and number
      const parts = preset.profile.phone.split(' ')
      if (parts.length >= 2) {
        setCountryCode(parts[0])
        setPhoneNumber(parts.slice(1).join(''))
      } else {
        setPhoneNumber(preset.profile.phone)
      }
    } else {
      setPassId('FYZ-2487')
    }
  }

  const handleSubmit = (e) => {
    e?.preventDefault?.()
    soundFx.playCelebration()

    if (matchedGuest) {
      loadPreset(matchedGuest.id)
    } else {
      // Default to Tariq or first preset if typed manually
      loadPreset(demoPresets[0]?.id || 'purist')
    }

    triggerNfcSync()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="w-full max-w-lg bg-fayrouz-espresso/95 border-2 border-fayrouz-amber/50 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,163,115,0.25)] text-fayrouz-cream flex flex-col gap-4 relative overflow-hidden"
      >
        {/* Amber Glow Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-fayrouz-amber/12 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-fayrouz-border/70 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-fayrouz-surface border border-fayrouz-amber/40 flex items-center justify-center text-fayrouz-gold shadow-amber-glow">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-fayrouz-cream">
                  Returning Guest Recognition
                </h3>
                <span className="font-arabic text-xs text-fayrouz-amber">
                  (أهلاً بك مجدداً)
                </span>
              </div>
              <p className="text-xs text-fayrouz-foam/70">
                Enter your registered mobile number or FayrouzPass ID to unlock your curated counter
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-fayrouz-surface/80 border border-fayrouz-border/70">
          <button
            type="button"
            onClick={() => { soundFx.playTap(); setLookupMode('phone'); }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
              lookupMode === 'phone'
                ? 'bg-fayrouz-espresso text-fayrouz-gold border border-fayrouz-amber/40 shadow-amber-glow'
                : 'text-fayrouz-muted hover:text-fayrouz-cream'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Mobile / WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => { soundFx.playTap(); setLookupMode('passId'); }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
              lookupMode === 'passId'
                ? 'bg-fayrouz-espresso text-fayrouz-gold border border-fayrouz-amber/40 shadow-amber-glow'
                : 'text-fayrouz-muted hover:text-fayrouz-cream'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>FayrouzPass ID</span>
          </button>
        </div>

        {/* 1-Tap Quick Demo Guest Chips */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-fayrouz-muted uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-fayrouz-gold" />
            Pitch Demo 1-Tap Lookup (Instant Match):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {demoPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-[11px] px-2.5 py-1 rounded-xl flex items-center gap-1.5 border transition-all cursor-pointer ${
                  matchedGuest?.id === preset.id
                    ? 'bg-fayrouz-amber/25 border-fayrouz-amber text-fayrouz-gold font-bold shadow-amber-glow'
                    : 'bg-fayrouz-surface/60 border-fayrouz-border hover:border-fayrouz-amber/40 text-fayrouz-foam/80 hover:text-fayrouz-cream'
                }`}
              >
                <span className="font-arabic">{preset.nameAr}</span>
                <span>{preset.name}</span>
                <span className="text-[9px] font-mono text-fayrouz-muted">({preset.profile.phone.slice(-4)})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display Field for Digits */}
        <div className="p-3.5 rounded-2xl bg-fayrouz-obsidian border border-fayrouz-amber/40 flex items-center justify-between shadow-inner">
          {lookupMode === 'phone' ? (
            <div className="flex items-center gap-2 w-full">
              {/* Country Dial Code */}
              <select
                value={countryCode}
                onChange={(e) => { soundFx.playTap(); setCountryCode(e.target.value); }}
                className="bg-fayrouz-surface text-fayrouz-cream text-xs font-mono py-1 px-2 rounded-xl border border-fayrouz-border focus:outline-none focus:border-fayrouz-amber cursor-pointer"
              >
                {COUNTRY_DIAL_CODES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-fayrouz-espresso text-fayrouz-cream">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              <div className="flex-1 font-mono text-lg sm:text-xl font-bold tracking-wider text-fayrouz-gold">
                {phoneNumber || <span className="text-fayrouz-muted/40 font-normal">79 XXX XXXX</span>}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs font-mono font-bold text-fayrouz-muted">FYZ-</span>
              <div className="flex-1 font-mono text-lg sm:text-xl font-bold tracking-wider text-fayrouz-gold">
                {passId || <span className="text-fayrouz-muted/40 font-normal">XXXX</span>}
              </div>
            </div>
          )}

          {(phoneNumber || passId) && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-lg text-fayrouz-muted hover:text-fayrouz-cream text-xs font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* Matched Guest Recognition Banner */}
        <AnimatePresence>
          {matchedGuest && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-2xl bg-fayrouz-cardamom/15 border border-fayrouz-cardamom/40 flex items-center justify-between gap-3 overflow-hidden"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-fayrouz-cardamom/30 flex items-center justify-center text-fayrouz-cardamom">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-fayrouz-cream">
                    Passport Found: {matchedGuest.name} ({matchedGuest.nameAr})
                  </div>
                  <div className="text-[10px] font-mono text-fayrouz-cardamom">
                    {matchedGuest.title} • {matchedGuest.profile.dietary?.length ? matchedGuest.profile.dietary.join(', ') : 'No Strict Allergens'}
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-cardamom text-fayrouz-obsidian font-bold">
                Verified
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* On-Screen Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeyTap(digit)}
              className="py-3 rounded-2xl bg-fayrouz-surface/80 hover:bg-fayrouz-surface border border-fayrouz-border/80 hover:border-fayrouz-amber/50 text-base sm:text-lg font-mono font-bold text-fayrouz-cream transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClear}
            className="py-3 rounded-2xl bg-fayrouz-surface/50 hover:bg-fayrouz-surface border border-fayrouz-border/60 text-xs font-mono text-fayrouz-muted hover:text-fayrouz-cream transition-all cursor-pointer"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handleKeyTap('0')}
            className="py-3 rounded-2xl bg-fayrouz-surface/80 hover:bg-fayrouz-surface border border-fayrouz-border/80 hover:border-fayrouz-amber/50 text-base sm:text-lg font-mono font-bold text-fayrouz-cream transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            className="py-3 rounded-2xl bg-fayrouz-surface/50 hover:bg-fayrouz-surface border border-fayrouz-border/60 text-fayrouz-muted hover:text-fayrouz-rose transition-all flex items-center justify-center cursor-pointer"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-sm shadow-amber-glow hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {matchedGuest 
              ? `Recognize ${matchedGuest.name} & Unlock Menu` 
              : 'Look Up & Reveal Curated Counter'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
