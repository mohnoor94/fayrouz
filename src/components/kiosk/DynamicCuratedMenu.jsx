import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { generateCoffeePersona } from '../../utils/personaGenerator'
import { soundFx } from '../../utils/soundEffects'
import KioskItemCard from './KioskItemCard'
import DrinkArtwork from './DrinkArtwork'
import ItemCustomizerModal from './ItemCustomizerModal'
import CoffeeDialectDossierModal from './CoffeeDialectDossierModal'
import { 
  Sparkles, 
  Search, 
  Coffee, 
  ShieldCheck, 
  Heart, 
  Flame, 
  Snowflake, 
  CheckCircle2, 
  Compass, 
  Repeat, 
  Star, 
  Clock, 
  Sliders, 
  Check, 
  Plus,
  Radio
} from 'lucide-react'

const CATEGORY_TABS = [
  { id: 'all', name: 'All Categories (25)', nameAr: 'كل المشروبات' },
  { id: 'espresso-black', name: 'Espresso & Black', nameAr: 'القهوة النقية' },
  { id: 'velvet-milk', name: 'Velvet & Milk', nameAr: 'مخمليات الحليب' },
  { id: 'cold-brew', name: 'Cold Brew & Infusions', nameAr: 'المقطرات الباردة' },
  { id: 'levantine-signature', name: 'Levantine Signature', nameAr: 'التواقيع الشرقية' },
  { id: 'tea-botanical', name: 'Tea & Botanical', nameAr: 'الأعشاب البرية' }
]

export default function DynamicCuratedMenu({ onAdd }) {
  const { userProfile, personalizedMenu, rawMenuData, addToOrderTray } = useProfile()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customizingItem, setCustomizingItem] = useState(null)
  const [isUsualJustAdded, setIsUsualJustAdded] = useState(false)
  const [isDossierOpen, setIsDossierOpen] = useState(false)

  const { curatedMatches, adventurousPick, categorizedMenu, stats } = personalizedMenu
  const persona = generateCoffeePersona(userProfile)

  // Find user's "Usual Drink"
  const usualConfig = userProfile?.usualDrink
  const usualItem = usualConfig ? rawMenuData.find(i => i.id === usualConfig.itemId) : null

  // Calculate accurate price with usual customizations
  let usualCalculatedPrice = usualItem ? (usualItem.effectivePrice ?? usualItem.price) : 0
  if (usualConfig?.size === 'large') usualCalculatedPrice += 0.75
  if (usualConfig?.milk === 'oat' || usualConfig?.milk === 'almond') usualCalculatedPrice += 0.50

  // Fast 1-Tap Reorder for "Your Usual"
  const handleQuickOrderUsual = (e) => {
    e?.stopPropagation?.()
    if (!usualItem) return

    soundFx.playCelebration()

    const fastUsualItem = {
      ...usualItem,
      id: `${usualItem.id}-usual-${usualConfig.size || 'reg'}-${usualConfig.temperature || 'hot'}-${usualConfig.milk || 'none'}`,
      customizedName: `${usualItem.name} (${usualConfig.note || 'Your Usual'})`,
      effectivePrice: usualCalculatedPrice,
      customizations: {
        temperature: usualConfig.temperature || 'hot',
        size: usualConfig.size || 'regular',
        milk: usualConfig.milk || null,
        sweetness: usualConfig.sweetness || '50',
        addOns: usualConfig.addOns || []
      }
    }

    if (onAdd) {
      onAdd(fastUsualItem)
    } else if (addToOrderTray) {
      addToOrderTray(fastUsualItem)
    }

    setIsUsualJustAdded(true)
    setTimeout(() => setIsUsualJustAdded(false), 1400)
  }

  // Filter catalog items
  const allCatalogItems = Object.values(categorizedMenu).flatMap(cat => 
    (activeTab === 'all' || activeTab === cat.category) ? cat.items : []
  )

  const searchedItems = allCatalogItems.filter(item => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return item.name.toLowerCase().includes(q) || item.nameAr.includes(searchQuery)
  })

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-5 overflow-y-auto pr-2 pb-8">
      {/* =====================================================================
          1. UNIFIED LUXURY HYBRID HERO STRIP: WELCOME & "YOUR USUAL" REORDER
          ===================================================================== */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-3.5 sm:p-4 bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-[#201511] border-2 border-fayrouz-amber/40 shadow-card-depth flex flex-col gap-3 relative shrink-0"
      >
        {/* Soft Ambient Radial Light inside rounded clip boundary */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-fayrouz-amber/12 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ROW 1: Guest Identity, Status Beacon & 16 Dialects™ Dossier Link */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-fayrouz-border/50 relative z-10 w-full">
          {/* Left: Active Pass Beacon & Welcome Heading */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1 basis-[260px]">
            <div className="w-8 h-8 rounded-xl bg-fayrouz-obsidian border border-fayrouz-amber flex items-center justify-center text-fayrouz-amber shrink-0 shadow-amber-glow">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-gold font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-pulse" />
                  FayrouzPass™ Active • {persona.passportNumber}
                </span>
                <span className="text-[9px] font-mono text-fayrouz-cardamom bg-fayrouz-cardamom/15 px-1.5 py-0.2 rounded border border-fayrouz-cardamom/30 font-medium">
                  Instant Recognition
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                <h3 className="text-sm sm:text-base font-serif font-bold text-fayrouz-cream">
                  Welcome back, {userProfile.name}!
                </h3>
                <span className="font-arabic text-xs text-fayrouz-amber font-normal">
                  (صباح الخير يا {userProfile.name})
                </span>
              </div>
            </div>
          </div>

          {/* Right: The 16 Dialects™ Emblem & Dossier Link */}
          <button
            type="button"
            onClick={() => { soundFx.playTap(); setIsDossierOpen(true); }}
            className="py-1.5 px-3 rounded-xl bg-fayrouz-obsidian/90 hover:bg-fayrouz-obsidian border border-fayrouz-gold/50 hover:border-fayrouz-gold shadow-sm flex items-center gap-2.5 text-left transition-all hover:scale-[1.01] cursor-pointer shrink-0 ml-auto sm:ml-0 group"
            title="Click to explore your certified 16 Dialects™ full identity dossier"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-fayrouz-amber/25 to-fayrouz-gold/15 border border-fayrouz-gold/80 flex items-center justify-center text-center p-0.5 shadow-inner flex-shrink-0">
              <span className="text-[10px] font-mono font-black tracking-wider text-fayrouz-gold">
                {persona.dialectCode || 'POLY'}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] font-mono uppercase tracking-wider text-fayrouz-amber font-bold flex items-center gap-1">
                <span>The 16 Dialects™</span>
                <span className="text-fayrouz-gold group-hover:underline">Dossier →</span>
              </span>
              <span className="text-xs font-serif font-bold text-fayrouz-cream whitespace-nowrap">
                {persona.title}
              </span>
            </div>
          </button>
        </div>

        {/* ROW 2: Safeguards & Taste Radar Ribbon */}
        <div className="flex flex-wrap items-center gap-1.5 relative z-10 text-xs">
          <span className="text-[9px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-fayrouz-obsidian text-fayrouz-gold border border-fayrouz-amber/30 shrink-0">
            Palate: {userProfile.palateScore}/10
          </span>

          {persona.flavorPillarBadges?.map((badgeText, idx) => (
            <span
              key={idx}
              className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-fayrouz-surface/90 text-fayrouz-cream border border-fayrouz-border flex items-center gap-1 shadow-sm shrink-0"
            >
              {badgeText}
            </span>
          ))}

          {persona.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-fayrouz-surface/80 text-fayrouz-foam border border-fayrouz-border flex items-center gap-1 shrink-0"
            >
              <Sparkles className="w-2.5 h-2.5 text-fayrouz-amber" />
              {badge.text}
            </span>
          ))}
        </div>

        {/* ROW 3: "YOUR USUAL" 1-TAP FAST REORDER FULL-WIDTH STRIP */}
        {usualItem && (
          <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-[#221813] via-fayrouz-obsidian to-[#1c1410] border border-fayrouz-gold/50 shadow-inner flex flex-wrap items-center justify-between gap-3 relative z-10 w-full">
            {/* Left: Drink Artwork, Names, and Exact Saved Recipe Notes */}
            <div className="flex items-center gap-3 min-w-0 flex-1 basis-[280px]">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-fayrouz-surface border border-fayrouz-gold/40 flex items-center justify-center flex-shrink-0 p-1 shadow-inner relative">
                <DrinkArtwork item={usualItem} size="sm" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian flex items-center justify-center shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-current stroke-none" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase font-bold bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian flex items-center gap-1 shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-current stroke-none" />
                    Your Usual • طلبك المعتاد
                  </span>
                  <span className="text-[10px] font-mono text-fayrouz-gold font-bold">
                    Ordered {usualConfig.orderCount}x
                  </span>
                  {usualConfig.lastOrdered && (
                    <span className="text-[10px] font-mono text-fayrouz-muted hidden sm:inline">
                      • Last: {usualConfig.lastOrdered}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 flex-wrap">
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-fayrouz-cream">
                    {usualItem.name}
                  </h4>
                  <span className="font-arabic text-[11px] text-fayrouz-amber font-normal">
                    ({usualItem.nameAr})
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-mono text-fayrouz-foam/90 flex items-center gap-1.5 mt-0.5">
                  <Repeat className="w-3 h-3 text-fayrouz-gold flex-shrink-0" />
                  <span className="font-medium text-fayrouz-amber/95">{usualConfig.note}</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto sm:ml-0">
              <button
                type="button"
                onClick={() => setCustomizingItem(usualItem)}
                className="py-2 px-3 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border hover:border-fayrouz-amber/40 text-fayrouz-cream text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title="Customize your usual recipe"
              >
                <Sliders className="w-3 h-3 text-fayrouz-gold" />
                <span>Tweak</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleQuickOrderUsual}
                className={`py-2 px-4 rounded-xl font-serif font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-amber-glow ${
                  isUsualJustAdded
                    ? 'bg-emerald-500 text-fayrouz-obsidian shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian hover:opacity-95'
                }`}
              >
                {isUsualJustAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Added to Tray!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Reorder (${usualCalculatedPrice.toFixed(2)})</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>

      {/* =====================================================================
          3. HERO SHELF: "CURATED FOR YOUR PALATE" (Spacious 2-Col Grid)
          ===================================================================== */}
      <section className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-fayrouz-gold" />
            <h4 className="text-lg sm:text-xl font-serif font-bold text-gold-gradient">
              Curated For Your Palate
            </h4>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-fayrouz-gold/15 text-fayrouz-gold border border-fayrouz-gold/30">
              3 Perfect Matches + 1 Wildcard
            </span>
          </div>

          <div className="text-xs text-fayrouz-muted font-mono hidden sm:block">
            Personalized in 15ms
          </div>
        </div>

        {/* 2-Column Spacious Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4">
          {curatedMatches.map((item, index) => (
            <KioskItemCard
              key={item.id}
              item={item}
              onAdd={() => setCustomizingItem(item)}
              onCustomize={() => setCustomizingItem(item)}
              isHero={true}
              rank={index + 1}
            />
          ))}

          {/* Adventurous Discovery Pick */}
          {adventurousPick && (
            <KioskItemCard
              key={adventurousPick.id}
              item={adventurousPick}
              onAdd={() => setCustomizingItem(adventurousPick)}
              onCustomize={() => setCustomizingItem(adventurousPick)}
              isHero={true}
              isWildcard={true}
            />
          )}
        </div>
      </section>

      {/* =====================================================================
          4. FULL CAFE CATALOG WITH ALLERGEN GUARDRAILS
          ===================================================================== */}
      <section className="flex flex-col gap-4 pt-4 border-t border-fayrouz-border/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-fayrouz-amber" />
              <h4 className="text-base sm:text-lg font-serif font-bold text-fayrouz-cream">
                Full Cafe Catalog with Allergen Guardrails
              </h4>
            </div>
            <p className="text-xs text-fayrouz-muted mt-0.5">
              Unsafe allergen drinks are dimmed (35% opacity) with warning badges to protect you from accidents.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-fayrouz-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search full menu..."
              className="w-full bg-fayrouz-surface/80 border border-fayrouz-border/80 rounded-xl pl-8 pr-3 py-2 text-xs text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none focus:border-fayrouz-amber transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0 min-h-[40px]">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-fayrouz-surface text-fayrouz-amber border border-fayrouz-amber/40 shadow-amber-glow'
                  : 'bg-fayrouz-espresso text-fayrouz-muted hover:text-fayrouz-cream border border-fayrouz-border/70'
              }`}
            >
              <span>{tab.name}</span>
              <span className="font-arabic text-[11px] opacity-70">({tab.nameAr})</span>
            </button>
          ))}
        </div>

        {/* 2-Column Spacious Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4">
          {searchedItems.map((item) => (
            <KioskItemCard
              key={item.id}
              item={item}
              onAdd={() => setCustomizingItem(item)}
              onCustomize={() => setCustomizingItem(item)}
            />
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. DRINK CUSTOMIZATION MODAL (Hot/Iced, Milk, Sweetness, Size, Addons)
          ===================================================================== */}
      <ItemCustomizerModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onConfirmAdd={(customized) => onAdd(customized)}
      />

      {/* =====================================================================
          6. THE 16 DIALECTS™ LUXURY IDENTITY DOSSIER MODAL
          ===================================================================== */}
      <CoffeeDialectDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        persona={persona}
        onOrderDrink={(drinkId) => {
          const matchedItem = rawMenuData.find(d => d.id === drinkId)
          if (matchedItem) {
            setCustomizingItem(matchedItem)
          }
        }}
      />
    </div>
  )
}
