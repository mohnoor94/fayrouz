import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { soundFx } from '../../utils/soundEffects'
import DrinkArtwork from './DrinkArtwork'
import { 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  X, 
  Plus, 
  Sliders, 
  CheckCircle2,
  Info
} from 'lucide-react'

export default function AllergenConfirmationModal({
  item,
  isOpen,
  userName = 'Guest',
  onClose,
  onConfirmFriendOrder,
  onOpenCustomizer
}) {
  if (!isOpen || !item) return null

  const handleConfirm = () => {
    soundFx.playCelebration()
    onConfirmFriendOrder?.(item)
    onClose?.()
  }

  const handleCustomize = () => {
    soundFx.playTap()
    onOpenCustomizer?.(item)
    onClose?.()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-gradient-to-b from-[#251814] via-[#1c120e] to-[#120b08] border-2 border-amber-600/60 rounded-[32px] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_30px_rgba(212,163,115,0.2)] flex flex-col gap-4 relative overflow-hidden"
        >
          {/* Amber Warning Glow in Background */}
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Alert Badge & Close Button */}
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold shadow-sm">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>DIETARY & ALLERGEN SAFEGUARD</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border flex items-center justify-center text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Highlight Conflict Box */}
          <div className="p-4 rounded-2xl bg-fayrouz-obsidian/90 border border-amber-500/40 flex items-start gap-3.5 relative z-10 shadow-inner">
            <div className="w-14 h-14 rounded-xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center shrink-0 p-1">
              <DrinkArtwork item={item} size="sm" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-base font-serif font-bold text-fayrouz-cream truncate">
                  {item.name}
                </h4>
                <span className="font-serif font-bold text-fayrouz-gold text-sm shrink-0">
                  ${(Number(item.effectivePrice ?? item.price) || 0).toFixed(2)}
                </span>
              </div>
              <div className="font-arabic text-xs text-fayrouz-amber mb-1.5 truncate">
                {item.nameAr}
              </div>

              {/* Exact Allergen Warning Notice */}
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-700/40">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="break-words">{item.unsafeReason || 'Dietary Conflict Flagged'}</span>
              </div>
            </div>
          </div>

          {/* Conversational Explanation & Reassurance */}
          <div className="flex flex-col gap-2 text-xs text-fayrouz-foam/90 leading-relaxed relative z-10">
            <p className="font-medium text-fayrouz-cream">
              This drink conflicts with <strong className="text-fayrouz-gold">{userName}’s</strong> dietary guardrails.
            </p>
            <p className="text-fayrouz-muted text-[11px] leading-normal bg-fayrouz-surface/50 p-2.5 rounded-xl border border-fayrouz-border/60">
              <Info className="w-3.5 h-3.5 text-fayrouz-amber inline mr-1" />
              Are you ordering this for a friend, colleague, or choosing to override your profile? 
              If confirmed, this drink will be tagged as <strong className="text-amber-300">👥 Companion Drink</strong> so Barista Noor uses separate sanitized equipment to prevent bar cross-contact.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-fayrouz-border/60 relative z-10">
            {/* Primary Action: Confirm for Friend */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-amber-glow cursor-pointer transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Yes, Add for a Friend (${(Number(item.effectivePrice ?? item.price) || 0).toFixed(2)})</span>
            </motion.button>

            {/* Secondary Option: Customize with Alert */}
            <button
              type="button"
              onClick={handleCustomize}
              className="w-full py-2.5 px-4 rounded-2xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border hover:border-fayrouz-amber/40 text-fayrouz-cream font-serif text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5 text-fayrouz-gold" />
              <span>Customize Brew Specifications First</span>
            </button>

            {/* Cancel: Keep Profile Safe */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-[11px] font-mono text-fayrouz-muted hover:text-fayrouz-cream transition-colors text-center cursor-pointer"
            >
              Cancel & Keep My Profile Safe
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
