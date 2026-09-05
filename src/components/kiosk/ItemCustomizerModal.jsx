import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
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
  Leaf
} from 'lucide-react'

export default function ItemCustomizerModal({ item, isOpen, onClose, onConfirmAdd }) {
  const { userProfile } = useProfile()

  if (!isOpen || !item) return null

  const isVegan = userProfile?.dietary?.includes('vegan')
  const isLactoseFree = userProfile?.dietary?.includes('lactose_free')
  const isUsualItem = Boolean(userProfile?.usualDrink?.itemId && item && userProfile.usualDrink.itemId === item.id)

  // 1. Preferred Size matching to Passport
  const profileDefaultSize = useMemo(() => {
    if (isUsualItem && userProfile?.usualDrink?.size) return userProfile.usualDrink.size
    if (userProfile?.preferredSize) return userProfile.preferredSize
    const note = userProfile?.usualDrink?.note?.toLowerCase() || ''
    if (note.includes('16 oz') || note.includes('large')) return 'large'
    return 'regular'
  }, [userProfile, isUsualItem])

  // 2. Preferred Temperature matching to Passport
  const profileDefaultTemp = useMemo(() => {
    if (!item) return 'hot'
    if (item.canBeIced && !item.canBeHot) return 'iced'
    if (item.canBeHot && !item.canBeIced) return 'hot'
    if (isUsualItem && userProfile?.usualDrink?.temperature) return userProfile.usualDrink.temperature
    const note = userProfile?.usualDrink?.note?.toLowerCase() || ''
    if (isUsualItem && note.includes('iced')) return 'iced'
    if (isUsualItem && note.includes('hot')) return 'hot'
    if (userProfile?.temperature === 'iced' && item.canBeIced) return 'iced'
    if (userProfile?.temperature === 'hot' && item.canBeHot) return 'hot'
    return item.defaultTemperature || 'hot'
  }, [item, userProfile, isUsualItem])

  // 3. Preferred Milk matching to Passport & Safeguards
  const profileDefaultMilk = useMemo(() => {
    if (isVegan || isLactoseFree) return 'oat'
    if (isUsualItem && userProfile?.usualDrink?.milk) return userProfile.usualDrink.milk
    if (userProfile?.preferredMilk) return userProfile.preferredMilk
    const note = userProfile?.usualDrink?.note?.toLowerCase() || ''
    if (note.includes('oat')) return 'oat'
    if (note.includes('almond')) return 'almond'
    return 'whole'
  }, [userProfile, isVegan, isLactoseFree, isUsualItem])

  // 4. Preferred Sweetness matching to Passport & Palate
  const profileDefaultSweetness = useMemo(() => {
    if (isUsualItem && userProfile?.usualDrink?.sweetness) return userProfile.usualDrink.sweetness
    const note = userProfile?.usualDrink?.note?.toLowerCase() || ''
    if (note.includes('0%') || note.includes('unsweetened')) return '0'
    if (note.includes('100%') || note.includes('rich sweet')) return '100'
    if (note.includes('25%') || note.includes('subtle')) return '25'
    if (note.includes('50%') || note.includes('balanced')) return '50'
    if (userProfile?.sweetnessPreference === 'unsweetened') return '0'
    if (userProfile?.sweetnessPreference === 'sweet') return '100'
    if (userProfile?.sweetnessPreference === 'balanced') return '50'
    if (userProfile?.sweetnessPreference === 'subtle') return '25'
    if (userProfile?.palateScore <= 2) return '0'
    if (userProfile?.palateScore >= 8) return '100'
    return '25'
  }, [userProfile, isUsualItem])

  // 5. Preferred Add-Ons matching to Passport Pillars
  const profileDefaultAddOns = useMemo(() => {
    if (isUsualItem && userProfile?.usualDrink?.addOns) {
      return userProfile.usualDrink.addOns
    }
    const list = []
    const note = userProfile?.usualDrink?.note?.toLowerCase() || ''
    const affinities = userProfile?.tasteAffinities || []
    if (affinities.includes('spiced') || note.includes('cardamom')) list.push('cardamom')
    if (note.includes('extra') || note.includes('ristretto') || note.includes('double')) list.push('extra-shot')
    if (note.includes('rose')) list.push('rosewater')
    if (note.includes('tahini')) list.push('tahini')
    return [...new Set(list)]
  }, [userProfile, isUsualItem])

  // Dynamic Customization State
  const [temperature, setTemperature] = useState(profileDefaultTemp)
  const [size, setSize] = useState(profileDefaultSize)
  const [milk, setMilk] = useState(profileDefaultMilk)
  const [sweetness, setSweetness] = useState(profileDefaultSweetness)
  const [addOns, setAddOns] = useState(profileDefaultAddOns)

  // Re-synchronize EVERY time item or modal opens!
  useEffect(() => {
    if (isOpen && item) {
      setTemperature(profileDefaultTemp)
      setSize(profileDefaultSize)
      setMilk(profileDefaultMilk)
      setSweetness(profileDefaultSweetness)
      setAddOns(profileDefaultAddOns)
    }
  }, [isOpen, item?.id, profileDefaultTemp, profileDefaultSize, profileDefaultMilk, profileDefaultSweetness, profileDefaultAddOns])

  const hasMilkOption = Boolean(item.containsDairy || item.dairyAlternative || item.category === 'velvet-milk')

  // Calculate dynamic price
  const basePrice = item.effectivePrice ?? item.price
  let finalPrice = basePrice

  if (size === 'large') finalPrice += 0.75
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
    const customizedItem = {
      ...item,
      id: `${item.id}-${temperature}-${milk}-${size}-${addOns.join('-')}`,
      customizedName: `${item.name} (${temperature === 'iced' ? 'Iced' : 'Hot'}, ${size === 'large' ? 'Large' : 'Regular'}${hasMilkOption ? `, ${milk === 'oat' ? 'Oat Milk' : milk === 'almond' ? 'Almond Milk' : 'Whole Milk'}` : ''})`,
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
              <span className="text-[10px] font-mono text-fayrouz-gold flex items-center gap-1 font-medium">
                <Sparkles className="w-2.5 h-2.5" />
                Passport Match: {temperature === 'iced' ? '❄️ Flash Iced' : '🔥 Steaming Hot'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Hot Option */}
              <button
                type="button"
                disabled={!item.canBeHot}
                onClick={() => { soundFx.playTap(); setTemperature('hot'); }}
                className={`p-3 rounded-2xl border text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !item.canBeHot
                    ? 'opacity-40 bg-fayrouz-surface/20 border-fayrouz-border cursor-not-allowed text-fayrouz-muted'
                    : temperature === 'hot'
                      ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-amber-glow'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                }`}
              >
                <Flame className={`w-4 h-4 ${temperature === 'hot' ? 'text-fayrouz-ember' : 'text-fayrouz-muted'}`} />
                <span>Steaming Hot</span>
                {!item.canBeHot && <span className="text-[9px] font-mono opacity-70">(N/A)</span>}
              </button>

              {/* Iced Option */}
              <button
                type="button"
                disabled={!item.canBeIced}
                onClick={() => { soundFx.playTap(); setTemperature('iced'); }}
                className={`p-3 rounded-2xl border text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !item.canBeIced
                    ? 'opacity-40 bg-fayrouz-surface/20 border-fayrouz-border cursor-not-allowed text-fayrouz-muted'
                    : temperature === 'iced'
                      ? 'bg-sky-950/40 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                }`}
              >
                <Snowflake className={`w-4 h-4 ${temperature === 'iced' ? 'text-sky-400' : 'text-fayrouz-muted'}`} />
                <span>Flash Iced</span>
                {!item.canBeIced && <span className="text-[9px] font-mono opacity-70">(N/A)</span>}
              </button>
            </div>
          </div>

          {/* 2. Cup Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-fayrouz-muted tracking-wider">
                Beverage Size
              </span>
              <span className="text-[10px] font-mono text-fayrouz-gold flex items-center gap-1 font-medium">
                <Sparkles className="w-2.5 h-2.5" />
                Passport Default: {size === 'large' ? 'Large (16 oz)' : 'Regular (12 oz)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => { soundFx.playTap(); setSize('regular'); }}
                className={`p-3 rounded-2xl border text-xs font-serif font-bold flex items-center justify-between px-4 transition-all cursor-pointer ${
                  size === 'regular'
                    ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-amber-glow'
                    : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                }`}
              >
                <span>Regular (12 oz)</span>
                <span className="text-[10px] font-mono text-fayrouz-muted">Standard</span>
              </button>

              <button
                type="button"
                onClick={() => { soundFx.playTap(); setSize('large'); }}
                className={`p-3 rounded-2xl border text-xs font-serif font-bold flex items-center justify-between px-4 transition-all cursor-pointer ${
                  size === 'large'
                    ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-amber-glow'
                    : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                }`}
              >
                <span>Large (16 oz)</span>
                <span className="text-[10px] font-mono text-fayrouz-amber font-bold">+ $0.75</span>
              </button>
            </div>
          </div>

          {/* 3. Milk Choice (If Drink Contains Milk or Supports It) */}
          {hasMilkOption && (
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
                ) : (
                  <span className="text-[10px] font-mono text-fayrouz-gold flex items-center gap-1 font-medium">
                    <Sparkles className="w-2.5 h-2.5" />
                    Passport: {milk === 'oat' ? 'Oat Milk' : milk === 'almond' ? 'Almond Milk' : 'Whole Milk'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { soundFx.playTap(); setMilk('whole'); }}
                  className={`p-2.5 rounded-xl border text-xs font-serif font-medium flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                    milk === 'whole'
                      ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-sm'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                  }`}
                >
                  <span>Whole Milk</span>
                  <span className="text-[9px] font-mono text-fayrouz-muted">Default Dairy</span>
                </button>

                <button
                  type="button"
                  onClick={() => { soundFx.playTap(); setMilk('oat'); }}
                  className={`p-2.5 rounded-xl border text-xs font-serif font-medium flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                    milk === 'oat'
                      ? 'bg-fayrouz-cardamom/25 border-fayrouz-cardamom text-fayrouz-cardamom shadow-sm'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                  }`}
                >
                  <span>Oat Microfoam</span>
                  <span className="text-[9px] font-mono text-fayrouz-gold">+ $0.50</span>
                </button>

                <button
                  type="button"
                  onClick={() => { soundFx.playTap(); setMilk('almond'); }}
                  className={`p-2.5 rounded-xl border text-xs font-serif font-medium flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                    milk === 'almond'
                      ? 'bg-fayrouz-amber/20 border-fayrouz-amber text-fayrouz-gold shadow-sm'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                  }`}
                >
                  <span>Almond Milk</span>
                  <span className="text-[9px] font-mono text-fayrouz-gold">+ $0.50</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. Sweetness Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-fayrouz-muted tracking-wider">
                Sweetness Touch
              </span>
              <span className="text-[10px] font-mono text-fayrouz-gold flex items-center gap-1 font-medium">
                <Sparkles className="w-2.5 h-2.5" />
                Palate Match: {sweetness === '0' ? '0% Pure' : sweetness === '25' ? '25% Subtle' : sweetness === '50' ? '50% Balanced' : '100% Rich'}
              </span>
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
                  className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                    sweetness === sw.id
                      ? 'bg-fayrouz-amber/25 border-fayrouz-amber text-fayrouz-gold shadow-sm'
                      : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface'
                  }`}
                >
                  <div className="text-xs font-bold font-serif">{sw.label}</div>
                  <div className="text-[9px] font-mono text-fayrouz-muted truncate">{sw.sub}</div>
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
        <div className="pt-4 border-t border-fayrouz-border/70 flex items-center justify-between gap-4 relative z-10 flex-shrink-0">
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
            <span>Add to Order Tray</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
