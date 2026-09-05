import React from 'react'
import { motion } from 'framer-motion'
import { soundFx } from '../../utils/soundEffects'
import { Coffee, Plus, Sparkles, AlertTriangle, Check, Compass, Flame, Snowflake } from 'lucide-react'

export default function KioskItemCard({ 
  item, 
  onAdd, 
  isHero = false, 
  isWildcard = false,
  rank = null 
}) {
  const isUnsafe = Boolean(item.isUnsafe)
  const isAdapted = Boolean(item.isAdapted)
  const effectivePrice = item.effectivePrice ?? item.price

  const handleAdd = (e) => {
    e?.stopPropagation()
    if (isUnsafe) return
    soundFx.playTap()
    onAdd?.(item)
  }

  // Hero Card Layout (Top Curated Shelf & Wildcard)
  if (isHero) {
    return (
      <motion.div
        layout
        whileHover={!isUnsafe ? { y: -3, scale: 1.01 } : {}}
        className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all shadow-card-depth ${
          isWildcard
            ? 'bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-[#201416] border-2 border-fayrouz-rose/60 shadow-[0_10px_30px_-10px_rgba(200,109,99,0.3)]'
            : 'glass-card border-fayrouz-amber/30 hover:border-fayrouz-amber/60'
        }`}
      >
        {/* Wildcard Glow */}
        {isWildcard && (
          <div className="absolute top-0 right-0 w-36 h-36 bg-fayrouz-rose/15 rounded-full blur-2xl pointer-events-none" />
        )}

        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              {rank && !isWildcard && (
                <span className="w-5 h-5 rounded-full bg-fayrouz-gold/20 text-fayrouz-gold border border-fayrouz-gold/40 text-[10px] font-mono font-bold flex items-center justify-center">
                  #{rank}
                </span>
              )}
              {isWildcard ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-fayrouz-rose/20 text-fayrouz-rose border border-fayrouz-rose/40 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Expand Your Palate
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-gold/30">
                  {item.matchScore}% Match
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[10px] text-fayrouz-muted font-mono">
              {item.canBeHot && <Flame className="w-3 h-3 text-fayrouz-ember" />}
              {item.canBeIced && <Snowflake className="w-3 h-3 text-fayrouz-sky" />}
              <span>Score: {item.profileScore}</span>
            </div>
          </div>

          {/* Title & Arabic */}
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="text-base sm:text-lg font-serif font-bold text-fayrouz-cream">
              {item.name}
            </h4>
            <span className="font-arabic text-xs text-fayrouz-amber">
              {item.nameAr}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-fayrouz-foam/80 line-clamp-2 leading-relaxed mb-2.5">
            {item.description}
          </p>

          {/* Wildcard Storytelling Quote Banner */}
          {isWildcard && item.whyYouWillLoveThis && (
            <div className="p-2.5 rounded-xl bg-fayrouz-obsidian/80 border border-fayrouz-rose/30 mb-2.5 flex items-start gap-2">
              <Compass className="w-3.5 h-3.5 text-fayrouz-rose flex-shrink-0 mt-0.5" />
              <div className="text-[10px] text-fayrouz-cream italic leading-snug">
                "{item.whyYouWillLoveThis}"
              </div>
            </div>
          )}

          {/* Tasting Notes & Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {isAdapted && (
              <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30">
                {item.badgeNotice || 'Auto-Swapped to Oat Milk'}
              </span>
            )}
            {item.tastingNotes?.slice(0, 3).map((note, i) => (
              <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-fayrouz-surface text-fayrouz-muted border border-fayrouz-border">
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between pt-2.5 border-t border-fayrouz-border/60">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[11px] font-mono text-fayrouz-muted">$</span>
            <span className="text-lg font-serif font-bold text-fayrouz-cream">
              {effectivePrice.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAdd}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow-amber-glow transition-all ${
              isWildcard
                ? 'bg-gradient-to-r from-fayrouz-rose to-fayrouz-gold text-fayrouz-obsidian'
                : 'bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian'
            }`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add</span>
          </motion.button>
        </div>
      </motion.div>
    )
  }

  // Standard Catalog Card (Full Categorized Menu)
  return (
    <motion.div
      layout
      whileHover={!isUnsafe ? { y: -2 } : {}}
      className={`rounded-2xl p-3.5 flex flex-col justify-between border transition-all ${
        isUnsafe
          ? 'opacity-35 bg-fayrouz-surface/20 border-red-900/40 select-none'
          : 'bg-fayrouz-surface/60 border-fayrouz-border/70 hover:border-fayrouz-amber/40 shadow-card-depth'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <span className="text-[10px] font-mono text-fayrouz-muted uppercase">
            {item.roastLevel || 'Specialty'}
          </span>
          {item.tempNotice && (
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-fayrouz-surface text-fayrouz-muted border border-fayrouz-border">
              {item.tempNotice}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <h5 className={`text-sm font-serif font-bold ${isUnsafe ? 'line-through text-fayrouz-muted' : 'text-fayrouz-cream'}`}>
            {item.name}
          </h5>
          <span className="font-arabic text-[11px] text-fayrouz-amber">
            {item.nameAr}
          </span>
        </div>

        <p className="text-[11px] text-fayrouz-foam/70 line-clamp-2 mb-2 leading-relaxed">
          {item.description}
        </p>

        {/* Allergen or Adaptation Warnings */}
        <div className="flex flex-wrap gap-1 mb-2">
          {isUnsafe && (
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-950/80 text-red-300 border border-red-800/60 flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5" />
              {item.unsafeReason}
            </span>
          )}
          {isAdapted && (
            <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30">
              Oat Swapped (+$0.50)
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-fayrouz-border/50">
        <div className="text-sm font-serif font-bold text-fayrouz-cream">
          ${effectivePrice.toFixed(2)}
        </div>

        <motion.button
          whileTap={!isUnsafe ? { scale: 0.92 } : {}}
          onClick={handleAdd}
          disabled={isUnsafe}
          className={`px-3 py-1 rounded-xl text-xs font-serif font-bold flex items-center gap-1 transition-all ${
            isUnsafe
              ? 'bg-fayrouz-surface text-fayrouz-muted cursor-not-allowed border border-fayrouz-border/50'
              : 'bg-fayrouz-amber/20 hover:bg-fayrouz-amber text-fayrouz-gold hover:text-fayrouz-obsidian border border-fayrouz-amber/40 cursor-pointer'
          }`}
        >
          <Plus className="w-3 h-3 stroke-[3]" />
          <span>Add</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
