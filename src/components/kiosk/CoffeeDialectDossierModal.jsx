import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { soundFx } from '../../utils/soundEffects'
import { 
  X, 
  Sparkles, 
  Coffee, 
  Heart, 
  AlertTriangle, 
  Compass, 
  Flame, 
  Snowflake, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Users
} from 'lucide-react'
import { calculateDialectCompatibility } from '../../utils/coffeeDialects'

export default function CoffeeDialectDossierModal({ 
  isOpen, 
  onClose, 
  persona, 
  onOrderDrink 
}) {
  if (!isOpen || !persona || !persona.dialect) return null

  const { dialect, house, dialectCode, isPolyglot, fluidityScore } = persona
  const compatibility = calculateDialectCompatibility(dialectCode, dialect.bestMatchCode)

  const handleOrderSoulmate = () => {
    soundFx.playCelebration()
    onOrderDrink?.(dialect.soulmateDrinkId)
    onClose?.()
  }

  const handleOrderGrowth = () => {
    soundFx.playTap()
    onOrderDrink?.(dialect.growthDrinkId)
    onClose?.()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.93, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.93, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[92vh] bg-gradient-to-b from-[#221812] via-[#18110d] to-[#0f0a07] border-2 border-fayrouz-gold/50 rounded-[36px] shadow-[0_25px_70px_-15px_rgba(233,196,106,0.25)] flex flex-col justify-between overflow-hidden relative"
        >
          {/* Ambient Lighting matched to House Color */}
          <div 
            className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: house?.color || '#eab308' }}
          />

          {/* Modal Header with Official Watermark */}
          <div className="p-5 sm:p-6 pb-4 border-b border-fayrouz-border/60 relative z-10 flex items-start justify-between gap-4 flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-fayrouz-amber font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-fayrouz-gold animate-pulse" />
                  {dialect.watermark || '[ ⟡ THE 16 DIALECTS™ • OFFICIAL CODEX ⟡ ]'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-fayrouz-muted">
                Ambar Specialty Roasters • Universal Taste Passport Certified
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border flex items-center justify-center text-fayrouz-muted hover:text-fayrouz-cream transition-colors flex-shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-6 relative z-10 pr-2">
            {/* Archetype Hero Monogram */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-fayrouz-obsidian via-[#211611] to-fayrouz-obsidian border border-fayrouz-gold/40 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                {/* 4-Letter Emblem */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fayrouz-amber/20 to-fayrouz-gold/10 border-2 border-fayrouz-gold/80 flex flex-col items-center justify-center text-center p-1 shadow-amber-glow flex-shrink-0">
                  <span className="text-lg font-mono font-black tracking-widest text-fayrouz-gold">
                    {dialectCode}
                  </span>
                  <span className="text-[9px] font-mono text-fayrouz-amber font-bold">
                    {house?.symbol} {dialect.house?.toUpperCase()}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-fayrouz-gold/15 border border-fayrouz-gold/30 text-fayrouz-gold font-bold">
                      {house?.name} • {house?.nameAr}
                    </span>
                    {isPolyglot && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold">
                        {fluidityScore}% Fluidity
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream">
                    {dialect.title}
                  </h2>
                  <div className="font-arabic text-base text-fayrouz-amber">
                    {dialect.titleAr}
                  </div>
                </div>
              </div>

              {/* Tagline Badge */}
              <div className="text-right sm:max-w-xs text-xs font-sans text-fayrouz-foam/90 leading-relaxed border-t sm:border-t-0 sm:border-l border-fayrouz-border/50 pt-3 sm:pt-0 sm:pl-4">
                "{dialect.tagline}"
              </div>
            </div>

            {/* Core Motivation & Enneagram Psychological Lore */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-fayrouz-surface/60 border border-fayrouz-border flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase text-fayrouz-gold font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-fayrouz-gold" />
                  <span>Core Desire (لماذا ترتشف القهوة)</span>
                </span>
                <p className="text-xs font-sans text-fayrouz-cream leading-relaxed">
                  {dialect.coreDesire}
                </p>
                <div className="font-arabic text-[11px] text-fayrouz-amber/80 mt-1">
                  {dialect.coreDesireAr}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-fayrouz-surface/60 border border-fayrouz-border flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase text-fayrouz-ember font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-fayrouz-ember" />
                  <span>Shadow / Stress State (لحظة التوتر)</span>
                </span>
                <p className="text-xs font-sans text-fayrouz-foam/90 leading-relaxed">
                  {dialect.shadowStressState}
                </p>
                <div className="font-arabic text-[11px] text-fayrouz-amber/80 mt-1">
                  {dialect.shadowStressStateAr}
                </div>
              </div>
            </div>

            {/* 4-Axis Sensory Breakdown Radar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-fayrouz-obsidian/70 border border-fayrouz-border flex flex-col gap-3">
              <span className="text-[10px] font-mono uppercase text-fayrouz-muted tracking-wider">
                Sensory Dimension Coordinates (إحداثيات الذائقة الأربعة)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Terroir Purity', ar: 'نقاء المصدر', val: dialect.radar?.terroir || 80, letter: dialectCode[0] },
                  { label: 'Roast Depth', ar: 'عمق التحميص', val: dialect.radar?.depth || 50, letter: dialectCode[1] },
                  { label: 'Silk Microfoam', ar: 'كثافة الحرير', val: dialect.radar?.silk || 40, letter: dialectCode[2] },
                  { label: 'Kinetic Velocity', ar: 'سرعة الإيقاع', val: dialect.radar?.velocity || 60, letter: dialectCode[3] }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-fayrouz-surface/40 border border-fayrouz-border/50">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-fayrouz-gold">[{stat.letter}] {stat.label}</span>
                      <span className="text-fayrouz-amber">{stat.val}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-fayrouz-obsidian overflow-hidden border border-fayrouz-border/40">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.val}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold rounded-full"
                      />
                    </div>
                    <span className="font-arabic text-[10px] text-fayrouz-muted">{stat.ar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soulmate Drink & Growth Drink Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Soulmate Drink */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-fayrouz-amber/15 via-fayrouz-surface to-fayrouz-surface border border-fayrouz-amber/50 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-fayrouz-gold font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3 text-fayrouz-rose fill-fayrouz-rose" />
                      <span>Soulmate Drink (فنجان الروح)</span>
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-gold/20 text-fayrouz-gold font-bold">
                      Certified Match
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-fayrouz-cream">
                    {dialect.soulmateDrinkName}
                  </h4>
                  <p className="text-[11px] font-sans text-fayrouz-foam/80 mt-1">
                    Directly synchronized with your sensory code defaults.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOrderSoulmate}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-amber-glow cursor-pointer"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Order Soulmate Drink</span>
                </button>
              </div>

              {/* Growth Wildcard Drink */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/20 via-fayrouz-surface to-fayrouz-surface border border-purple-500/40 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-purple-300 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-purple-400" />
                      <span>Growth Drink (أفق التجربة)</span>
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                      Palate Expansion
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-fayrouz-cream">
                    {dialect.growthDrinkName}
                  </h4>
                  <p className="text-[11px] font-sans text-fayrouz-foam/80 mt-1">
                    {dialect.growthReason}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOrderGrowth}
                  className="w-full py-2 px-3 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-purple-400/50 text-purple-300 font-serif font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Explore Growth Drink</span>
                </button>
              </div>
            </div>

            {/* Nemesis Drink (The Playful Anti-Order) */}
            <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-red-300">
                    Nemesis Order: {dialect.nemesisDrink}
                  </span>
                  <span className="text-[9px] font-mono text-red-400/80 font-bold">
                    عدو الفنجان
                  </span>
                </div>
                <p className="text-[11px] font-sans text-fayrouz-foam/80 mt-0.5 leading-snug">
                  {dialect.nemesisRoast}
                </p>
              </div>
            </div>

            {/* Coffee Astrology: Compatibility Match */}
            <div className="p-4 rounded-2xl bg-fayrouz-surface/50 border border-fayrouz-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fayrouz-amber/10 border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-gold flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-fayrouz-muted tracking-wider block">
                    Best Coffee Date Compatibility (شريك المقهى المثالي)
                  </span>
                  <div className="text-xs font-serif font-bold text-fayrouz-cream">
                    {dialect.bestMatchTitle} ({dialect.bestMatchCode})
                  </div>
                  <p className="text-[10px] font-sans text-fayrouz-foam/80 mt-0.5">
                    {compatibility.dynamic}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-lg font-serif font-bold text-fayrouz-gold">
                  {compatibility.score}%
                </div>
                <span className="text-[9px] font-mono text-fayrouz-amber">
                  Synergy Match
                </span>
              </div>
            </div>
          </div>

          {/* Modal Bottom Footer */}
          <div className="p-4 border-t border-fayrouz-border/70 flex items-center justify-between relative z-10 flex-shrink-0">
            <span className="text-[10px] font-mono text-fayrouz-muted">
              Tap anywhere outside or press Close to resume ordering
            </span>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-xs font-serif text-fayrouz-cream transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
