import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Keyboard, Sparkles, Command } from 'lucide-react'

const SHORTCUT_GROUPS = [
  {
    category: '1-Click Pitch Personas',
    shortcuts: [
      { key: '1', label: 'Tariq (Purist)', desc: 'Dark roast, 0% sweet, single-origin espresso' },
      { key: '2', label: 'Salma (Plant-Based)', desc: 'Vegan + Nut-Free guardrail, light floral iced' },
      { key: '3', label: 'Areej (Sweet Velvet)', desc: 'Lactose-Free, sweet iced Aleppo pistachio' },
      { key: '4', label: 'Noor (Connoisseur)', desc: 'Balanced medium roast, cardamomed flat white' }
    ]
  },
  {
    category: 'Ecosystem & Handshake',
    shortcuts: [
      { key: 'Space', label: 'Beam NFC Pass', desc: 'Simulate instant guest phone tap handshake' },
      { key: 'R', label: 'Reset Demo', desc: 'Return counter kiosk to neutral 25-drink catalog' },
      { key: 'B', label: 'Barista KDS', desc: 'Toggle Kitchen Display System extraction queue' }
    ]
  },
  {
    category: 'Device Viewports & Tools',
    shortcuts: [
      { key: 'D / S', label: 'Dual-Device', desc: 'Synchronized side-by-side pitch canvas' },
      { key: 'M', label: 'Mobile Only', desc: 'Guest sensory wizard & Apple/Google Wallet' },
      { key: 'T', label: 'Tablet Kiosk', desc: 'Counter ordering tablet simulator' },
      { key: 'P', label: 'Pitch Script', desc: 'Open guided presenter talking cues & script' },
      { key: '?', label: 'Help / Hotkeys', desc: 'Toggle this keyboard shortcut guide' }
    ]
  }
]

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#231a15] via-fayrouz-espresso to-[#120d0b] border-2 border-fayrouz-amber/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_30px_rgba(212,163,115,0.2)] p-5 sm:p-6 text-fayrouz-cream flex flex-col gap-4 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-fayrouz-amber/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-fayrouz-border/60 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-fayrouz-surface border border-fayrouz-amber/40 flex items-center justify-center text-fayrouz-amber shadow-amber-glow">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-gold-gradient">
                    Presenter Hotkeys & Shortcuts
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-amber/30">
                    Live Demo Ready
                  </span>
                </div>
                <p className="text-xs text-fayrouz-muted mt-0.5">
                  Deliver seamless presentations without touching the cursor
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-fayrouz-surface/60 hover:bg-fayrouz-surface border border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Shortcut Groups */}
          <div className="flex flex-col gap-4 relative z-10 max-h-[60vh] overflow-y-auto pr-1">
            {SHORTCUT_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-fayrouz-amber font-bold">
                  {group.category}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.shortcuts.map((sc, scIdx) => (
                    <div
                      key={scIdx}
                      className="p-2.5 rounded-2xl bg-fayrouz-surface/60 border border-fayrouz-border/70 flex items-center justify-between gap-2 shadow-sm"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-serif font-bold text-fayrouz-cream truncate">
                          {sc.label}
                        </div>
                        <div className="text-[10px] text-fayrouz-muted truncate">
                          {sc.desc}
                        </div>
                      </div>

                      <kbd className="px-2 py-1 rounded-lg bg-fayrouz-obsidian border border-fayrouz-amber/40 text-fayrouz-gold font-mono font-bold text-xs shadow-inner shrink-0">
                        {sc.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer Note */}
          <div className="pt-2 border-t border-fayrouz-border/50 flex items-center justify-between text-[11px] font-mono text-fayrouz-muted relative z-10">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-fayrouz-surface border border-fayrouz-border text-fayrouz-amber">?</kbd> anytime to toggle</span>
            <span className="text-fayrouz-cardamom flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-fayrouz-gold" />
              100% Zero-Latency Handshake
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
