import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, Sparkles, Coffee } from 'lucide-react'
import { useProfile } from '../../context/ProfileContext'

export default function NfcSyncOverlay() {
  const { isSyncing, userProfile } = useProfile()

  if (!isSyncing) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 bg-fayrouz-obsidian/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto rounded-[36px] overflow-hidden"
      >
        {/* Expanding Golden Ripple Waves */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer Ripple 3 */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-fayrouz-amber/40 bg-fayrouz-amber/5"
          />

          {/* Outer Ripple 2 */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.4, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-fayrouz-gold/50 bg-fayrouz-gold/10"
          />

          {/* Core Pulse */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-fayrouz-obsidian border-2 border-fayrouz-amber flex items-center justify-center text-fayrouz-amber shadow-amber-glow relative z-10"
          >
            <Radio className="w-10 h-10 animate-pulse text-fayrouz-gold" />
          </motion.div>
        </div>

        {/* Syncing Messaging */}
        <div className="text-center mt-6 z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-fayrouz-gold animate-spin" />
            <span className="text-xs font-mono uppercase tracking-widest text-fayrouz-gold font-bold">
              FayrouzPass™ NFC Handshake Verified
            </span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-gold-gradient">
            Synchronizing with {userProfile.name || 'Guest'}'s FayrouzPass...
          </h3>

          <span className="font-arabic text-base text-fayrouz-amber mt-1">
            جاري قراءة جواز فيروز للتذوق وتحضير قائمتك المختارة
          </span>

          <div className="text-xs text-fayrouz-foam/70 mt-2 font-mono">
            Palate Dial: {userProfile.palateScore}/10 • Guardrails Applied
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
