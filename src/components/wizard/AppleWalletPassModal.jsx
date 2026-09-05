import React from 'react'
import { motion } from 'framer-motion'
import { soundFx } from '../../utils/soundEffects'
import { BRAND_CONFIG } from '../../constants/brandConfig'
import { 
  X, 
  Radio, 
  Sparkles, 
  Coffee, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Smartphone,
  Share2,
  Globe
} from 'lucide-react'

export default function AppleWalletPassModal({ isOpen, onClose, userProfile, persona, walletType = 'apple' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="w-full max-w-sm flex flex-col items-center gap-4 relative"
      >
        {/* Apple/Google Wallet Hardware Pass Card */}
        <div className="w-full rounded-[32px] bg-gradient-to-b from-[#1c1511] via-[#120d0a] to-[#0a0706] border-2 border-fayrouz-gold/60 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,163,115,0.3)] text-fayrouz-cream flex flex-col gap-3.5 relative overflow-hidden">
          {/* Holographic Sheen */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-fayrouz-gold/20 via-fayrouz-amber/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Close button inside pass */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Pass Header - Universal Fayrouz Identity Everywhere */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 pr-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-fayrouz-surface border border-fayrouz-amber/40 flex items-center justify-center text-fayrouz-amber shadow-inner">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-fayrouz-gold font-bold block">
                  FAYROUZPASS™ NFC
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-serif font-bold text-fayrouz-cream">
                    Universal Coffee Identity
                  </span>
                  <span className="font-arabic text-xs text-fayrouz-amber">
                    (جواز القهوة الموحد)
                  </span>
                </div>
              </div>
            </div>

            {/* Apple / Google NFC Contactless Icon */}
            <div className="flex items-center gap-1 text-fayrouz-gold">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-widest font-bold">
                {walletType === 'google' ? 'SMART TAP' : 'APPLE VAS'}
              </span>
            </div>
          </div>

          {/* Global Network Portability Banner */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-fayrouz-amber/10 border border-fayrouz-amber/25 text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-fayrouz-gold font-bold">
              <Globe className="w-3.5 h-3.5 text-fayrouz-gold flex-shrink-0" />
              <span>FAYROUZ GLOBAL NETWORK</span>
            </div>
            <span className="text-fayrouz-foam/75">Valid Across All Roasters</span>
          </div>

          {/* Member Name & Dialect Card */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] font-mono text-fayrouz-muted uppercase tracking-wider block">
                MEMBER NAME
              </span>
              <h4 className="text-xl font-serif font-bold text-fayrouz-cream">
                {userProfile.name}
              </h4>
              <span className="text-[10px] font-mono text-fayrouz-amber">
                {userProfile.phone || '+962 79 •••• 1234'}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono text-fayrouz-muted uppercase tracking-wider block">
                DIALECT
              </span>
              <span className="text-base font-mono font-black text-fayrouz-gold">
                {persona.dialectCode || 'POLY'}
              </span>
              <span className="text-[9px] font-serif text-fayrouz-foam/70 block">
                {persona.title.split(' ')[1] || persona.title}
              </span>
            </div>
          </div>

          {/* Active Dietary Guardrails Ribbon */}
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex flex-wrap gap-1.5 items-center">
            <span className="text-[9px] font-mono text-fayrouz-muted mr-1">SAFEGUARDS:</span>
            {persona.badges.map((b, i) => (
              <span
                key={i}
                className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-fayrouz-surface/90 text-fayrouz-cream border border-fayrouz-border/80 flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-fayrouz-gold" />
                {b.text}
              </span>
            ))}
          </div>

          {/* Barcode / NFC Reader Zone */}
          <div className="pt-2 border-t border-dashed border-white/15 flex flex-col items-center gap-2">
            <div className="w-full h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-inner">
              <div className="w-full h-8 flex items-center justify-between px-3">
                {/* Simulated high-density barcode lines */}
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full bg-black ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-0.5' : 'w-1.5'}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between w-full text-[10px] font-mono text-fayrouz-muted">
              <span>{walletType === 'google' ? 'GOOGLE WALLET • SMART TAP' : 'APPLE WALLET • EXPRESS TAP'}</span>
              <span className="font-bold text-fayrouz-gold">{persona.passportNumber}</span>
            </div>

            <p className="text-[9px] font-mono text-center text-fayrouz-foam/60 leading-tight">
              Accepted at {BRAND_CONFIG.shortName}, Turath, Qahwatna & all Fayrouz specialty partners worldwide
            </p>
          </div>
        </div>

        {/* Action Button: Added to Apple / Google Wallet Confirmation */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full py-3 rounded-2xl bg-black border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-fayrouz-cardamom" />
            <span>
              {walletType === 'google'
                ? 'Added to Google Wallet • Ready for Universal Counter Tap'
                : 'Added to Apple Wallet • Ready for Universal Counter Tap'}
            </span>
          </div>

          <p className="text-[11px] text-center text-fayrouz-foam/70">
            {walletType === 'google'
              ? 'Next visit: Simply hold your Android phone near any Fayrouz kiosk or counter reader worldwide. Your custom craft profile syncs instantly.'
              : 'Next visit: Simply hold your locked iPhone or Apple Watch near any Fayrouz kiosk or counter reader worldwide. No app required.'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
