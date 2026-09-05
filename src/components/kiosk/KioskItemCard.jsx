import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { soundFx } from '../../utils/soundEffects'
import { useProfile } from '../../context/ProfileContext'
import DrinkArtwork from './DrinkArtwork'
import { 
  Plus, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  Compass, 
  Flame, 
  Snowflake,
  ShieldAlert,
  ArrowUpRight,
  Sliders
} from 'lucide-react'

export default function KioskItemCard({ 
  item, 
  onAdd, 
  onCustomize,
  isHero = false, 
  isWildcard = false,
  rank = null 
}) {
  const { isNfcSynced, userProfile, addToOrderTray } = useProfile()
  const [isHovered, setIsHovered] = useState(false)
  const [isFastAdded, setIsFastAdded] = useState(false)
  const isUnsafe = Boolean(item.isUnsafe)
  const isAdapted = Boolean(item.isAdapted)
  const basePrice = item.effectivePrice ?? item.price

  // Passport Spec computation when isNfcSynced is active
  const isVegan = userProfile?.dietary?.includes('vegan')
  const isLactoseFree = userProfile?.dietary?.includes('lactose_free')
  const hasMilkOption = Boolean(item.containsDairy || item.dairyAlternative || item.category === 'velvet-milk')

  const passportTemp = (userProfile?.temperature === 'iced' && item.canBeIced) 
    ? 'iced' 
    : (!item.canBeHot && item.canBeIced) ? 'iced' : 'hot'

  const passportSize = userProfile?.preferredSize || userProfile?.usualDrink?.size || 'regular'

  const passportMilk = hasMilkOption 
    ? ((isVegan || isLactoseFree) ? 'oat' : (userProfile?.preferredMilk || 'whole'))
    : null

  const passportSweetness = userProfile?.sweetnessPreference === 'unsweetened' ? '0' :
    userProfile?.sweetnessPreference === 'sweet' ? '100' :
    userProfile?.sweetnessPreference === 'balanced' ? '50' : '25'

  const passportAddOns = userProfile?.tasteAffinities?.includes('spiced') ? ['cardamom'] : []

  // Dynamic calculated price with passport options
  let calculatedPrice = basePrice
  if (passportSize === 'large') calculatedPrice += 0.75
  if (passportMilk === 'oat' || passportMilk === 'almond') calculatedPrice += 0.50

  const specParts = [
    passportSize === 'large' ? '16 oz (Large)' : '12 oz (Reg)',
    passportTemp === 'iced' ? '❄️ Iced' : '🔥 Hot',
    passportMilk ? (passportMilk === 'oat' ? '🥛 Oat' : passportMilk === 'almond' ? '🥛 Almond' : '🥛 Whole') : null
  ].filter(Boolean)

  const passportSpecLabel = specParts.join(' • ')

  const handleFastAdd = (e) => {
    e?.stopPropagation()
    if (isUnsafe) return
    soundFx.playCelebration()
    const customizedItem = {
      ...item,
      id: `${item.id}-${passportTemp}-${passportMilk}-${passportSize}-${passportAddOns.join('-')}`,
      customizedName: `${item.name} (${passportTemp === 'iced' ? 'Iced' : 'Hot'}, ${passportSize === 'large' ? 'Large' : 'Regular'}${passportMilk ? `, ${passportMilk === 'oat' ? 'Oat Milk' : passportMilk === 'almond' ? 'Almond Milk' : 'Whole Milk'}` : ''})`,
      effectivePrice: calculatedPrice,
      customizations: {
        temperature: passportTemp,
        size: passportSize,
        milk: passportMilk,
        sweetness: passportSweetness,
        addOns: passportAddOns
      }
    }
    addToOrderTray(customizedItem)
    setIsFastAdded(true)
    setTimeout(() => setIsFastAdded(false), 1200)
  }

  const handleAdd = (e) => {
    e?.stopPropagation()
    if (isUnsafe) return
    soundFx.playTap()
    onAdd?.(item)
  }

  // =========================================================================
  // HERO CARD LAYOUT (Top Curated Shelf & Adventurous Wildcard)
  // =========================================================================
  if (isHero) {
    return (
      <motion.div
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={!isUnsafe ? { y: -4, scale: 1.01 } : {}}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all shadow-card-depth group border ${
          isWildcard
            ? 'bg-gradient-to-br from-fayrouz-surface via-[#201518] to-fayrouz-espresso border-fayrouz-rose/50 shadow-[0_12px_35px_-10px_rgba(200,109,99,0.35)]'
            : 'glass-card border-fayrouz-amber/30 hover:border-fayrouz-amber/60 hover:shadow-amber-glow'
        }`}
      >
        {/* Subtle Background Glow Aura */}
        <div 
          className={`absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${
            isWildcard 
              ? 'bg-fayrouz-rose/20' 
              : 'bg-fayrouz-amber/15 group-hover:bg-fayrouz-amber/25'
          }`} 
        />

        <div>
          {/* Top Bar: Match Score & Temperature */}
          <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
            <div className="flex items-center gap-2">
              {rank && !isWildcard && (
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian text-xs font-mono font-bold flex items-center justify-center shadow-sm">
                  #{rank}
                </span>
              )}
              {isWildcard ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold bg-fayrouz-rose/25 text-fayrouz-rose border border-fayrouz-rose/40 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  Expand Your Palate
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-gold/30 flex items-center gap-1">
                  <span>{item.matchScore}% Match</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-fayrouz-muted">
              {item.canBeHot && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-fayrouz-surface/90 text-fayrouz-ember border border-fayrouz-border text-[10px]">
                  <Flame className="w-2.5 h-2.5" /> Hot
                </span>
              )}
              {item.canBeIced && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-fayrouz-surface/90 text-fayrouz-sky border border-fayrouz-border text-[10px]">
                  <Snowflake className="w-2.5 h-2.5" /> Iced
                </span>
              )}
            </div>
          </div>

          {/* Visual Showcase Row: Artwork on Left + Core Details on Right */}
          <div className="flex items-center gap-4 mb-3">
            {/* Visual Drink Artwork Stage */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-fayrouz-obsidian/70 border border-fayrouz-border/80 flex items-center justify-center flex-shrink-0 p-1 relative overflow-hidden shadow-inner group-hover:border-fayrouz-amber/40 transition-colors">
              <DrinkArtwork item={item} size="md" isHovered={isHovered} />
            </div>

            {/* Title & Cultural Notes */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono text-fayrouz-muted uppercase tracking-wider block mb-0.5">
                {item.roastLevel || 'Specialty'} • {item.categoryName}
              </span>
              <h4 className="text-base sm:text-lg font-serif font-bold text-fayrouz-cream leading-snug truncate">
                {item.name}
              </h4>
              <div className="font-arabic text-xs sm:text-sm text-fayrouz-amber mb-1.5 truncate">
                {item.nameAr}
              </div>

              {/* Tasting Notes Tags */}
              <div className="flex flex-wrap items-center gap-1">
                {item.tastingNotes?.slice(0, 2).map((note, i) => (
                  <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-md bg-fayrouz-surface text-fayrouz-foam/90 border border-fayrouz-border">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-fayrouz-foam/80 line-clamp-2 leading-relaxed mb-2.5">
            {item.description}
          </p>

          {/* Wildcard Storytelling Rationale Quote */}
          {isWildcard && item.whyYouWillLoveThis && (
            <div className="p-3 rounded-2xl bg-fayrouz-obsidian/90 border border-fayrouz-rose/40 mb-3 flex items-start gap-2.5 shadow-sm">
              <Compass className="w-4 h-4 text-fayrouz-rose flex-shrink-0 mt-0.5" />
              <div className="text-[11px] text-fayrouz-cream italic leading-snug">
                "{item.whyYouWillLoveThis}"
              </div>
            </div>
          )}

          {/* Dietary Adaptation Pill */}
          {isAdapted && (
            <div className="mb-2.5">
              <span className="text-[10px] px-2.5 py-1 rounded-xl font-medium bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/40 inline-flex items-center gap-1">
                <Check className="w-3 h-3" />
                {item.badgeNotice || 'Auto-Swapped to Oat Milk (+$0.50)'}
              </span>
            </div>
          )}
        </div>

        {/* Hero Card Footer: Price & Add / Customize Buttons */}
        <div className="flex flex-col gap-2 pt-3 border-t border-fayrouz-border/60 mt-1">
          {/* Passport Spec Preview (when passport is synced) */}
          {isNfcSynced && !isUnsafe && (
            <div className="flex items-center justify-between text-[11px] font-mono text-fayrouz-gold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-fayrouz-gold" />
                <span>Your Spec: {passportSpecLabel}</span>
              </span>
              <span className="font-bold text-fayrouz-cream font-serif">
                ${calculatedPrice.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            {!isNfcSynced && (
              <div>
                <div className="text-[10px] font-mono text-fayrouz-muted uppercase">Specialty Price</div>
                <div className="text-xl font-serif font-bold text-fayrouz-cream">
                  ${basePrice.toFixed(2)}
                </div>
              </div>
            )}

            {isNfcSynced && !isUnsafe ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    soundFx.playTap()
                    onCustomize ? onCustomize(item) : onAdd(item)
                  }}
                  className="px-3 py-2 rounded-xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-border hover:border-fayrouz-amber/60 text-fayrouz-cream font-serif text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  title="Customize temperature, size, milk, and add-ons"
                >
                  <Sliders className="w-3.5 h-3.5 text-fayrouz-gold" />
                  <span>Customize</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFastAdd}
                  className={`flex-1 px-4 py-2 rounded-xl font-serif font-bold text-xs sm:text-sm shadow-amber-glow flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    isFastAdded
                      ? 'bg-emerald-500 text-fayrouz-obsidian shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                      : 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian'
                  }`}
                  title="1-Tap add directly with your passport spec"
                >
                  {isFastAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add (${calculatedPrice.toFixed(2)})</span>
                    </>
                  )}
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleAdd}
                disabled={isUnsafe}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-amber-glow transition-all cursor-pointer ${
                  isWildcard
                    ? 'bg-gradient-to-r from-fayrouz-rose via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian'
                    : 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian'
                }`}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // =========================================================================
  // COMFORTABLE 2-COLUMN CATALOG CARD (Full Menu & Baseline State)
  // =========================================================================
  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!isUnsafe ? { y: -3 } : {}}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between border transition-all relative overflow-hidden group ${
        isUnsafe
          ? 'opacity-35 bg-fayrouz-surface/25 border-red-900/40 select-none'
          : 'bg-fayrouz-surface/70 hover:bg-fayrouz-surface border-fayrouz-border/70 hover:border-fayrouz-amber/40 shadow-card-depth'
      }`}
    >
      <div>
        {/* Horizontal Split: Visual Artwork (Left) + Text & Specs (Right) */}
        <div className="flex items-start gap-3.5 mb-2.5">
          {/* Left Drink Artwork Container */}
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl bg-fayrouz-obsidian/80 border border-fayrouz-border/80 flex items-center justify-center flex-shrink-0 p-1 relative overflow-hidden shadow-inner group-hover:border-fayrouz-amber/30 transition-colors">
            <DrinkArtwork item={item} size="sm" isHovered={isHovered} />

            {/* Unsafe Red Shield Watermark Overlay */}
            {isUnsafe && (
              <div className="absolute inset-0 bg-red-950/70 backdrop-blur-[1px] flex items-center justify-center text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
            )}
          </div>

          {/* Right Text Column */}
          <div className="flex-1 min-w-0">
            {/* Top Meta Tag */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-mono text-fayrouz-muted uppercase tracking-wider truncate">
                {item.roastLevel || 'Specialty'}
              </span>
              {item.canBeIced && !item.canBeHot ? (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-fayrouz-surface text-fayrouz-sky border border-fayrouz-border flex items-center gap-0.5 flex-shrink-0">
                  <Snowflake className="w-2.5 h-2.5" /> Chilled
                </span>
              ) : item.canBeHot && !item.canBeIced ? (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-fayrouz-surface text-fayrouz-ember border border-fayrouz-border flex items-center gap-0.5 flex-shrink-0">
                  <Flame className="w-2.5 h-2.5" /> Hot
                </span>
              ) : null}
            </div>

            {/* Title & Arabic */}
            <h5 className={`text-sm sm:text-base font-serif font-bold leading-snug truncate ${
              isUnsafe ? 'line-through text-fayrouz-muted' : 'text-fayrouz-cream group-hover:text-fayrouz-gold transition-colors'
            }`}>
              {item.name}
            </h5>
            <div className="font-arabic text-xs text-fayrouz-amber/90 truncate mb-1.5">
              {item.nameAr}
            </div>

            {/* Tasting Notes */}
            <div className="flex flex-wrap gap-1">
              {item.tastingNotes?.slice(0, 2).map((note, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-fayrouz-surface/90 text-fayrouz-muted border border-fayrouz-border/80">
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-fayrouz-foam/75 line-clamp-2 leading-relaxed mb-2.5">
          {item.description}
        </p>

        {/* Allergen Warning or Oat Adaptation Badges */}
        {(isUnsafe || isAdapted) && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {isUnsafe && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-red-950/90 text-red-300 border border-red-800/70 flex items-center gap-1 shadow-sm">
                <AlertTriangle className="w-3 h-3" />
                {item.unsafeReason}
              </span>
            )}
            {isAdapted && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/40 flex items-center gap-1">
                <Check className="w-2.5 h-2.5" />
                Oat Milk Swapped (+$0.50)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Price & Add / Customize Buttons */}
      <div className="flex flex-col gap-2 pt-2.5 border-t border-fayrouz-border/60 mt-auto">
        {/* Passport Spec Preview (when passport is synced) */}
        {isNfcSynced && !isUnsafe && (
          <div className="flex items-center justify-between text-[10px] font-mono text-fayrouz-gold">
            <span className="flex items-center gap-1 min-w-0">
              <Sparkles className="w-3 h-3 text-fayrouz-gold flex-shrink-0" />
              <span className="truncate">Your Spec: {passportSpecLabel}</span>
            </span>
            <span className="font-bold text-fayrouz-cream font-serif ml-1 flex-shrink-0">
              ${calculatedPrice.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {!isNfcSynced && (
            <div className="text-base font-serif font-bold text-fayrouz-cream">
              ${basePrice.toFixed(2)}
            </div>
          )}

          {isNfcSynced && !isUnsafe ? (
            <div className="flex items-center gap-1.5 w-full justify-between sm:justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  soundFx.playTap()
                  onCustomize ? onCustomize(item) : onAdd(item)
                }}
                className="px-2.5 py-1.5 rounded-xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-border hover:border-fayrouz-amber/60 text-fayrouz-cream font-serif text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                title="Customize temperature, size, milk, and add-ons"
              >
                <Sliders className="w-3 h-3 text-fayrouz-gold" />
                <span>Customize</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFastAdd}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl font-serif font-bold text-xs shadow-amber-glow flex items-center justify-center gap-1 cursor-pointer transition-all ${
                  isFastAdded
                    ? 'bg-emerald-500 text-fayrouz-obsidian shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian'
                }`}
                title="1-Tap add directly with your passport spec"
              >
                {isFastAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add (${calculatedPrice.toFixed(2)})</span>
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={!isUnsafe ? { scale: 1.04 } : {}}
              whileTap={!isUnsafe ? { scale: 0.92 } : {}}
              onClick={handleAdd}
              disabled={isUnsafe}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 shadow-sm transition-all ml-auto ${
                isUnsafe
                  ? 'bg-fayrouz-surface text-fayrouz-muted cursor-not-allowed border border-fayrouz-border/50'
                  : 'bg-fayrouz-amber/20 hover:bg-fayrouz-amber text-fayrouz-gold hover:text-fayrouz-obsidian border border-fayrouz-amber/40 hover:shadow-amber-glow cursor-pointer'
              }`}
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
