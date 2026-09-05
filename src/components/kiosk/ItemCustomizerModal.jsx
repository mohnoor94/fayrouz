import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { resolveItemCraftSpecs } from '../../utils/craftConstraints'
import DrinkArtwork from './DrinkArtwork'
import { 
  X, 
  Flame, 
  Snowflake, 
  Check, 
  Plus, 
  Sparkles, 
  Coffee, 
  ShieldCheck,
  Leaf,
  Info
} from 'lucide-react'

export default function ItemCustomizerModal({ item, isOpen, onClose, onConfirmAdd }) {
  const { userProfile, isNfcSynced, updateProfile } = useProfile()

  if (!isOpen || !item) return null

  const isVegan = userProfile?.dietary?.includes('vegan')
  const isLactoseFree = userProfile?.dietary?.includes('lactose_free')
  const isUsualItem = Boolean(userProfile?.usualDrink?.itemId && item && userProfile.usualDrink.itemId === item.id)

  // 1. Resolve craft specifications & recipe boundaries for this item
  const craftSpecs = useMemo(() => resolveItemCraftSpecs(item, userProfile), [item, userProfile])

  // Profile-adapted default values
  const profileDefaultSize = craftSpecs.effectiveSize
  const profileDefaultTemp = craftSpecs.effectiveTemp
  const profileDefaultMilk = craftSpecs.effectiveMilk || 'whole'
  const profileDefaultSweetness = craftSpecs.effectiveSweetness
  const profileDefaultAddOns = craftSpecs.effectiveAddOns

  // Dynamic Customization State
  const [temperature, setTemperature] = useState(profileDefaultTemp)
  const [size, setSize] = useState(profileDefaultSize)
  const [milk, setMilk] = useState(profileDefaultMilk)
  const [sweetness, setSweetness] = useState(profileDefaultSweetness)
  const [addOns, setAddOns] = useState(profileDefaultAddOns)
  const [saveToPassport, setSaveToPassport] = useState(false)

  // Re-synchronize EVERY time item or modal opens!
  useEffect(() => {
    if (isOpen && item) {
      setTemperature(profileDefaultTemp)
      setSize(profileDefaultSize)
      setMilk(profileDefaultMilk)
      setSweetness(profileDefaultSweetness)
      setAddOns(profileDefaultAddOns)
      setSaveToPassport(false)
    }
  }, [isOpen, item?.id, profileDefaultTemp, profileDefaultSize, profileDefaultMilk, profileDefaultSweetness, profileDefaultAddOns])

  const hasMilkOption = craftSpecs.hasMilkOption

  // Determine which fields represent voluntary, unconstrained user customizations
  const canSaveSize = !craftSpecs.isCraftFixedSize && size !== (userProfile?.preferredSize || 'regular') && (size === 'regular' || size === 'large')
  const canSaveTemp = !craftSpecs.isHotOnly && !craftSpecs.isIcedOnly && temperature !== (userProfile?.temperature === 'iced' ? 'iced' : 'hot')
  const canSaveMilk = hasMilkOption && !isVegan && !isLactoseFree && milk !== (userProfile?.preferredMilk || 'whole')
  const canSaveSweetness = sweetness !== profileDefaultSweetness

  // Shielding: Only show "Remember as my new permanent Taste Passport default" if user made a voluntary change on an unconstrained option
  const hasVoluntaryCustomization = canSaveSize || canSaveTemp || canSaveMilk || canSaveSweetness

  // Calculate dynamic price
  const basePrice = item.effectivePrice ?? item.price
  let finalPrice = basePrice

  if (!craftSpecs.isCraftFixedSize && size === 'large') finalPrice += 0.75
  if (hasMilkOption && (milk === 'oat' || milk === 'almond')) finalPrice += 0.50
  if (addOns.includes('extra-shot')) finalPrice += 1.00
  if (addOns.includes('rosewater')) finalPrice += 0.50
  if (addOns.includes('tahini')) finalPrice += 0.50

  const toggleAddOn = (addonId) => {
    soundFx.playTap()
    setAddOns(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    )
  }

  const handleConfirm = () => {
    soundFx.playTap()

    // If user explicitly checked the permanent update option:
    if (saveToPassport && isNfcSynced && hasVoluntaryCustomization) {
      const updates = {}
      if (canSaveSize) updates.preferredSize = size
      if (canSaveTemp) updates.temperature = temperature
      if (canSaveMilk) updates.preferredMilk = milk
      if (canSaveSweetness) {
        updates.sweetnessPreference = 
          sweetness === '0' ? 'unsweetened' :
          sweetness === '100' ? 'sweet' :
          sweetness === '50' ? 'balanced' : 'subtle'
      }
      if (Object.keys(updates).length > 0) {
        updateProfile(updates)
      }
    }

    const sizeDisplayName = craftSpecs.isCraftFixedSize 
      ? (item.fixedServingLabel || `${item.fixedServingSize} Craft Ratio`) 
      : (size === 'large' ? 'Large' : 'Regular')
    const milkDisplayName = hasMilkOption 
      ? (milk === 'oat' ? 'Oat Milk' : milk === 'almond' ? 'Almond Milk' : 'Whole Milk') 
      : null
    const tempDisplayName = temperature === 'iced' ? 'Iced' : 'Hot'
    const nameSpecs = [tempDisplayName, sizeDisplayName, milkDisplayName].filter(Boolean).join(', ')

    const customizedItem = {
      ...item,
      id: `${item.id}-${temperature}-${hasMilkOption ? milk : 'nomilk'}-${size}-${addOns.join('-')}`,
      customizedName: `${item.name} (${nameSpecs})`,
      effectivePrice: finalPrice,
      customizations: {
        temperature,
        size,
        milk: hasMilkOption ? milk : null,
        sweetness,
        addOns
      }
    }
    onConfirmAdd?.(customizedItem)
    onClose?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[92vh] bg-gradient-to-b from-[#241a15] via-[#1a120e] to-[#100b08] border-2 border-fayrouz-amber/40 rounded-[32px] p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden relative"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-fayrouz-amber/12 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-fayrouz-border/60 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-fayrouz-obsidian border border-fayrouz-amber/40 flex items-center justify-center flex-shrink-0 p-1 shadow-inner">
              <DrinkArtwork item={{ ...item, defaultTemperature: temperature }} size="sm" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-amber font-bold">
                  {item.categoryName} • {item.roastLevel || 'Specialty'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-fayrouz-cream leading-tight">
                {item.name}
              </h3>
              <div className="font-arabic text-xs text-fayrouz-amber">
                {item.nameAr}
              </div>
              {isNfcSynced && (
                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-fayrouz-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-fayrouz-amber animate-pulse" />
                  <span>
                    {craftSpecs.isSizeConstrained || craftSpecs.isTempConstrained || craftSpecs.isMilkConstrained
                      ? '⚡ Specialty Craft Adapted • Leaves permanent passport unchanged'
                      : 'Single-Cup Customization • Leaves permanent passport unchanged'}
                  </span>
                </div>
              )}
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

        {/* Modal Scrollable Body: Customization Options */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-5 pr-1 relative z-10">
          {/* 1. Temperature Selection (Hot vs Iced) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-fayrouz-muted tracking-wider">
                Temperature Extraction
              </span>
              {isNfcSynced && (
                <span className={`text-[10px] font-mono flex items-center gap-1 font-medium ${
                  craftSpecs.isTempConstrained
                    ? 'text-fayrouz-amber'
                    : temperature === profileDefaultTemp 
                      ? 'text-fayrouz-gold' 
                      : 'text-fayrouz-amber'
                }`}>
                  <Sparkles className="w-2.5 h-2.5 flex-shrink-0" />
                  {craftSpecs.isTempConstrained ? (
                    <span>
                      Passport: {userProfile?.temperature === 'iced' ? '❄️ Flash Iced' : '🔥 Steaming Hot'} • Adapted to {craftSpecs.effectiveTemp === 'iced' ? 'Chilled Only' : 'Hot Only'}
                    </span>
                  ) : (
                    <>
                      <span>Passport Choice: {profileDefaultTemp === 'iced' ? '❄️ Flash Iced' : '🔥 Steaming Hot'}</span>
                      {temperature !== profileDefaultTemp && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-fayrouz-amber/15 text-fayrouz-amber border border-fayrouz-amber/30 ml-1 font-sans">
                          One-time tweak
                        </span>
                      )}
                    </>
                  )}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Hot Option */}
              <button
                type="button"
                disabled={!item.canBeHot}
                onClick={() => { soundFx.playTap(); setTemperature('hot'); }}
                className={`p-3 rounded-2xl border text-xs font-serif font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
                  !item.canBeHot
                    ? 'opacity-40 bg-fayrouz-surface/20 border-fayrouz-border cursor-not-allowed text-fayrouz-muted'
                    : temperature === 'hot'
                      ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-amber-glow'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Flame className={`w-4 h-4 ${temperature === 'hot' ? 'text-fayrouz-ember' : 'text-fayrouz-muted'}`} />
                  <span>Steaming Hot</span>
                  {!item.canBeHot && <span className="text-[9px] font-mono opacity-70">(Craft Chilled Only)</span>}
                  {item.canBeHot && !item.canBeIced && <span className="text-[9px] font-mono text-fayrouz-amber/80">(Craft Only)</span>}
                </div>
                {isNfcSynced && profileDefaultTemp === 'hot' && !craftSpecs.isTempConstrained && (
                  <span className="text-[9px] font-mono text-fayrouz-gold/80 font-normal">
                    ⭐ Passport Default
                  </span>
                )}
              </button>

              {/* Iced Option */}
              <button
                type="button"
                disabled={!item.canBeIced}
                onClick={() => { soundFx.playTap(); setTemperature('iced'); }}
                className={`p-3 rounded-2xl border text-xs font-serif font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
                  !item.canBeIced
                    ? 'opacity-40 bg-fayrouz-surface/20 border-fayrouz-border cursor-not-allowed text-fayrouz-muted'
                    : temperature === 'iced'
                      ? 'bg-sky-950/40 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Snowflake className={`w-4 h-4 ${temperature === 'iced' ? 'text-sky-400' : 'text-fayrouz-muted'}`} />
                  <span>Flash Iced</span>
                  {!item.canBeIced && <span className="text-[9px] font-mono opacity-70">(Craft Hot Only)</span>}
                  {!item.canBeHot && item.canBeIced && <span className="text-[9px] font-mono text-sky-300/80">(Craft Only)</span>}
                </div>
                {isNfcSynced && profileDefaultTemp === 'iced' && !craftSpecs.isTempConstrained && (
                  <span className="text-[9px] font-mono text-sky-300/80 font-normal">
                    ⭐ Passport Default
                  </span>
                )}
              </button>
            </div>

            {/* Transparent Educational Microcopy for Temperature Constraints */}
            {item.tempConstraintReason && (craftSpecs.isHotOnly || craftSpecs.isIcedOnly) && (
              <div className="flex items-start gap-2 mt-2 px-3 py-2 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-border/80 text-[11px] font-sans text-fayrouz-foam/90">
                <Info className="w-3.5 h-3.5 text-fayrouz-amber flex-shrink-0 mt-0.5" />
                <span>{item.tempConstraintReason}</span>
              </div>
            )}
          </div>

          {/* 2. Cup Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-fayrouz-muted tracking-wider">
                Beverage Size
              </span>
              {isNfcSynced && (
                craftSpecs.isCraftFixedSize ? (
                  <span className={`text-[10px] font-mono flex items-center gap-1 font-medium ${
                    craftSpecs.isSizeConstrained ? 'text-fayrouz-amber' : 'text-fayrouz-gold'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5 flex-shrink-0" />
                    {craftSpecs.isSizeConstrained ? (
                      <span>Passport Choice: Large (16 oz) • Adapted to craft ratio</span>
                    ) : (
                      <span>Specialty Craft Serving</span>
                    )}
                  </span>
                ) : (
                  <span className={`text-[10px] font-mono flex items-center gap-1 font-medium ${
                    size === profileDefaultSize ? 'text-fayrouz-gold' : 'text-fayrouz-amber'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>Passport Choice: {profileDefaultSize === 'large' ? 'Large (16 oz)' : 'Regular (12 oz)'}</span>
                    {size !== profileDefaultSize && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-fayrouz-amber/15 text-fayrouz-amber border border-fayrouz-amber/30 ml-1 font-sans">
                        One-time tweak
                      </span>
                    )}
                  </span>
                )
              )}
            </div>

            {craftSpecs.isCraftFixedSize ? (
              <div className="p-3.5 rounded-2xl border border-fayrouz-amber/40 bg-gradient-to-r from-fayrouz-surface/90 via-[#261c16] to-fayrouz-surface/90 flex flex-col gap-2 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-fayrouz-amber/15 border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-gold">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-serif font-bold text-fayrouz-cream">
                        {item.fixedServingLabel || `${item.fixedServingSize} (Craft Ratio)`}
                      </div>
                      <div className="text-[10px] font-mono text-fayrouz-amber">
                        Fixed Specialty Single Serving
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-amber/20 border border-fayrouz-amber/40 text-fayrouz-gold font-bold">
                    Craft Standard
                  </span>
                </div>
                <p className="text-[11px] font-sans text-fayrouz-foam/85 leading-relaxed border-t border-fayrouz-border/50 pt-2">
                  {item.sizeConstraintReason || 'Crafted in a dedicated single-serving ratio to maintain sensory balance and espresso concentration.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => { soundFx.playTap(); setSize('regular'); }}
                  className={`p-3 rounded-2xl border text-xs font-serif font-bold flex items-center justify-between px-4 transition-all cursor-pointer relative ${
                    size === 'regular'
                      ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-amber-glow'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span>Regular (12 oz)</span>
                    {isNfcSynced && profileDefaultSize === 'regular' && (
                      <span className="text-[9px] font-mono text-fayrouz-gold/80 font-normal">
                        ⭐ Passport Default
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-fayrouz-muted">Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => { soundFx.playTap(); setSize('large'); }}
                  className={`p-3 rounded-2xl border text-xs font-serif font-bold flex items-center justify-between px-4 transition-all cursor-pointer relative ${
                    size === 'large'
                      ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-amber-glow'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span>Large (16 oz)</span>
                    {isNfcSynced && profileDefaultSize === 'large' && (
                      <span className="text-[9px] font-mono text-fayrouz-gold/80 font-normal">
                        ⭐ Passport Default
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-fayrouz-amber font-bold">+ $0.75</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Milk Choice (If Drink Contains Milk or Supports It) */}
          {hasMilkOption ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-fayrouz-muted tracking-wider">
                  Milk & Plant Dairy
                </span>
                {(isVegan || isLactoseFree) ? (
                  <span className="text-[10px] font-mono text-fayrouz-cardamom flex items-center gap-1 font-bold">
                    <Leaf className="w-2.5 h-2.5" />
                    {isVegan ? 'Strict Vegan: Oat Auto-Swapped' : 'Lactose-Free: Oat Auto-Swapped'}
                  </span>
                ) : isNfcSynced ? (
                  <span className={`text-[10px] font-mono flex items-center gap-1 font-medium ${
                    milk === profileDefaultMilk ? 'text-fayrouz-gold' : 'text-fayrouz-amber'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>Passport Choice: {profileDefaultMilk === 'oat' ? 'Oat Milk' : profileDefaultMilk === 'almond' ? 'Almond Milk' : 'Whole Milk'}</span>
                    {milk !== profileDefaultMilk && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-fayrouz-amber/15 text-fayrouz-amber border border-fayrouz-amber/30 ml-1 font-sans">
                        One-time tweak
                      </span>
                    )}
                  </span>
                ) : null}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'whole', label: 'Whole Milk', sub: 'Default Dairy', price: 'Included', disabled: isVegan || isLactoseFree },
                  { id: 'oat', label: 'Oat Microfoam', sub: 'Plant-Based', price: '+ $0.50', disabled: false },
                  { id: 'almond', label: 'Almond Milk', sub: 'Nut-Based', price: '+ $0.50', disabled: userProfile?.dietary?.includes('nut_free') }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    disabled={m.disabled}
                    onClick={() => { soundFx.playTap(); setMilk(m.id); }}
                    className={`p-2.5 rounded-xl border text-xs font-serif font-medium flex flex-col items-center gap-0.5 transition-all cursor-pointer relative ${
                      m.disabled
                        ? 'opacity-35 bg-fayrouz-surface/20 border-fayrouz-border cursor-not-allowed text-fayrouz-muted'
                        : milk === m.id
                          ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-sm'
                          : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                    }`}
                  >
                    <span className="font-bold">{m.label}</span>
                    <span className="text-[9px] font-mono text-fayrouz-muted">{m.sub}</span>
                    <span className="text-[9px] font-mono text-fayrouz-amber font-semibold">{m.price}</span>
                    {isNfcSynced && profileDefaultMilk === m.id && (
                      <span className="text-[8px] font-mono text-fayrouz-gold/90 font-medium mt-0.5">
                        ⭐ Passport Default
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            craftSpecs.isMilkConstrained && (
              <div className="p-3 rounded-2xl border border-fayrouz-border/70 bg-fayrouz-surface/40 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-fayrouz-amber/10 border border-fayrouz-amber/20 flex items-center justify-center text-fayrouz-gold flex-shrink-0 mt-0.5">
                  <Coffee className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-fayrouz-cream">
                      Served Pure Black
                    </span>
                    <span className="text-[9px] font-mono text-fayrouz-amber font-bold">
                      Terroir Standard
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-fayrouz-muted mt-0.5 leading-snug">
                    {craftSpecs.milkConstraintReason || 'Served pure black without dairy to preserve single-origin terroir and natural floral notes.'}
                  </p>
                  {isNfcSynced && (userProfile?.preferredMilk || userProfile?.usualDrink?.milk) && (
                    <div className="text-[9px] font-mono text-fayrouz-gold/80 mt-1 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Passport: {userProfile?.preferredMilk === 'oat' ? 'Oat Milk' : userProfile?.preferredMilk === 'almond' ? 'Almond Milk' : 'Whole Milk'} held for this cup</span>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* 4. Sweetness Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-fayrouz-muted tracking-wider">
                Sweetness Touch
              </span>
              {isNfcSynced && (
                <span className={`text-[10px] font-mono flex items-center gap-1 font-medium ${
                  sweetness === profileDefaultSweetness ? 'text-fayrouz-gold' : 'text-fayrouz-amber'
                }`}>
                  <Sparkles className="w-2.5 h-2.5 flex-shrink-0" />
                  <span>Passport Choice: {profileDefaultSweetness === '0' ? '0% Pure' : profileDefaultSweetness === '25' ? '25% Subtle' : profileDefaultSweetness === '50' ? '50% Balanced' : '100% Rich'}</span>
                  {sweetness !== profileDefaultSweetness && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-fayrouz-amber/15 text-fayrouz-amber border border-fayrouz-amber/30 ml-1 font-sans">
                      One-time tweak
                    </span>
                  )}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '0', label: '0%', sub: 'Pure Terroir' },
                { id: '25', label: '25%', sub: 'Subtle Touch' },
                { id: '50', label: '50%', sub: 'Balanced' },
                { id: '100', label: '100%', sub: 'Rich Sweet' }
              ].map(sw => (
                <button
                  key={sw.id}
                  type="button"
                  onClick={() => { soundFx.playTap(); setSweetness(sw.id); }}
                  className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer relative ${
                    sweetness === sw.id
                      ? 'bg-fayrouz-amber/25 border-fayrouz-amber text-fayrouz-gold shadow-sm'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                  }`}
                >
                  <div className="text-xs font-bold font-serif">{sw.label}</div>
                  <div className="text-[9px] font-mono text-fayrouz-muted truncate">{sw.sub}</div>
                  {isNfcSynced && profileDefaultSweetness === sw.id && (
                    <div className="text-[8px] font-mono text-fayrouz-gold/90 font-medium">
                      ⭐ Default
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Levantine Craft Add-Ons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-fayrouz-muted tracking-wider block">
                Levantine Craft Add-Ons
              </span>
              {addOns.length > 0 ? (
                <span className="text-[10px] font-mono text-fayrouz-gold flex items-center gap-1 font-medium">
                  <Sparkles className="w-2.5 h-2.5" />
                  Passport Auto-Selected ({addOns.length})
                </span>
              ) : (
                <span className="text-[10px] font-mono text-fayrouz-muted">
                  Optional additions
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'cardamom', name: 'Fresh Green Cardamom', price: 'Free' },
                { id: 'extra-shot', name: 'Extra Double Shot', price: '+ $1.00' },
                { id: 'rosewater', name: 'Damascene Rose Mist', price: '+ $0.50' },
                { id: 'tahini', name: 'Roasted Tahini Swirl', price: '+ $0.50' }
              ].map(addon => {
                const isSelected = addOns.includes(addon.id)
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-sm'
                        : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                        isSelected ? 'bg-fayrouz-amber border-fayrouz-amber text-fayrouz-obsidian' : 'border-fayrouz-border'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-serif truncate">{addon.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-fayrouz-muted ml-1 flex-shrink-0">{addon.price}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar: Dynamic Price & Confirm */}
        <div className="pt-3 border-t border-fayrouz-border/70 flex flex-col gap-2.5 relative z-10 flex-shrink-0">
          {/* Subtle Permanent Passport Default Toggle (Shielded: only visible when user made voluntary unconstrained tweaks) */}
          {isNfcSynced && hasVoluntaryCustomization && (
            <motion.label 
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-fayrouz-foam/90 hover:text-fayrouz-cream cursor-pointer select-none bg-fayrouz-surface/60 border border-fayrouz-border/70 rounded-xl px-3 py-1.5 transition-colors w-fit"
            >
              <input
                type="checkbox"
                checked={saveToPassport}
                onChange={(e) => {
                  soundFx.playTap()
                  setSaveToPassport(e.target.checked)
                }}
                className="w-3.5 h-3.5 rounded border-fayrouz-border bg-fayrouz-surface accent-fayrouz-amber cursor-pointer"
              />
              <span className="text-[11px] font-sans">
                Remember changes as my new permanent Taste Passport defaults
              </span>
            </motion.label>
          )}

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-fayrouz-muted uppercase">Customized Total</span>
              <div className="text-2xl font-serif font-bold text-fayrouz-gold">
                ${finalPrice.toFixed(2)}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleConfirm}
              className="px-6 py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian shadow-amber-glow flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{saveToPassport ? 'Save to Passport & Add' : 'Add'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
