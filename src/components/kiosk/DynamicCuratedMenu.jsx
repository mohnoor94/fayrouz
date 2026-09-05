import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { generateCoffeePersona } from '../../utils/personaGenerator'
import { soundFx } from '../../utils/soundEffects'
import KioskItemCard from './KioskItemCard'
import DrinkArtwork from './DrinkArtwork'
import ItemCustomizerModal from './ItemCustomizerModal'
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
  Plus
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
  const { userProfile, personalizedMenu, rawMenuData } = useProfile()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customizingItem, setCustomizingItem] = useState(null)

  const { curatedMatches, adventurousPick, categorizedMenu, stats } = personalizedMenu
  const persona = generateCoffeePersona(userProfile)

  // Find user's "Usual Drink"
  const usualConfig = userProfile?.usualDrink
  const usualItem = usualConfig ? rawMenuData.find(i => i.id === usualConfig.itemId) : null

  // Fast 1-Tap Reorder for "Your Usual"
  const handleQuickOrderUsual = () => {
    if (!usualItem) return
    soundFx.playCelebration()
    const fastUsualItem = {
      ...usualItem,
      id: `${usualItem.id}-usual-${Date.now()}`,
      customizedName: `${usualItem.name} (${usualConfig.note || 'Your Usual'})`,
      effectivePrice: usualItem.effectivePrice ?? usualItem.price
    }
    onAdd?.(fastUsualItem)
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
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 pb-8">
      {/* =====================================================================
          1. ELEGANT 2-TIER SPACIOUS WELCOME BOARD
          ===================================================================== */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-[#221612] border border-fayrouz-amber/40 shadow-card-depth flex flex-col gap-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-fayrouz-amber/12 rounded-full blur-3xl pointer-events-none" />

        {/* Tier 1: Welcoming Greeting, Arabic Monogram & Coffee Persona */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-fayrouz-obsidian border-2 border-fayrouz-amber/60 flex items-center justify-center text-fayrouz-amber shadow-amber-glow flex-shrink-0">
              <Coffee className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-amber font-bold">
                  Universal Passport Synchronized • {persona.passportNumber}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream">
                  Welcome back, {userProfile.name}!
                </h3>
                <span className="font-arabic text-base sm:text-lg text-fayrouz-amber font-normal">
                  صباح الخير يا {userProfile.name}
                </span>
              </div>
            </div>
          </div>

          {/* Persona Card Pill */}
          <div className="px-3.5 py-2 rounded-2xl bg-fayrouz-obsidian/90 border border-fayrouz-amber/40 shadow-inner flex flex-col items-start sm:items-end flex-shrink-0">
            <span className="text-[9px] font-mono uppercase tracking-widest text-fayrouz-muted">
              Certified Palate Persona
            </span>
            <div className="text-xs sm:text-sm font-serif font-bold text-gold-gradient">
              {persona.title}
            </div>
            <span className="font-arabic text-[11px] text-fayrouz-amber/80 font-normal">
              {persona.titleAr}
            </span>
          </div>
        </div>

        {/* Tier 2: Dedicated Taste Radar & Dietary Guardrails Ribbon */}
        <div className="pt-3 border-t border-fayrouz-border/60 flex flex-wrap items-center justify-between gap-2.5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] px-3 py-1 rounded-full font-mono font-bold bg-fayrouz-obsidian text-fayrouz-gold border border-fayrouz-amber/30">
              Palate: {userProfile.palateScore}/10
            </span>

            {persona.flavorPillarBadges?.map((badgeText, idx) => (
              <span
                key={idx}
                className="text-[10px] px-3 py-1 rounded-full font-medium bg-fayrouz-surface/90 text-fayrouz-cream border border-fayrouz-border flex items-center gap-1 shadow-sm"
              >
                {badgeText}
              </span>
            ))}

            <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-fayrouz-surface text-fayrouz-gold border border-fayrouz-border/80">
              {userProfile.roastPreference === 'light' ? 'Light Roast' : userProfile.roastPreference === 'dark' ? 'Dark Roast' : 'Medium Roast'} • {userProfile.sweetnessPreference === 'unsweetened' ? '0% Sweet' : userProfile.sweetnessPreference === 'sweet' ? 'Sweet' : 'Subtle Sweet'}
            </span>
          </div>

          {/* Safety & Protocol Badges */}
          <div className="flex items-center gap-1.5">
            {persona.badges.map((badge, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-fayrouz-surface/80 text-fayrouz-foam border border-fayrouz-border flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-fayrouz-amber" />
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* =====================================================================
          2. "YOUR USUAL" (طلبك المعتاد) — 1-TAP FAST REORDER HERO CARD
          ===================================================================== */}
      {usualItem && (
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-5 bg-gradient-to-r from-[#241c16] via-[#1d1612] to-[#251b14] border-2 border-fayrouz-gold/50 shadow-[0_12px_35px_-10px_rgba(233,196,106,0.25)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-fayrouz-gold/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Label */}
          <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian flex items-center gap-1.5 shadow-sm">
                <Star className="w-3 h-3 fill-current stroke-none" />
                Your Usual • طلبك المعتاد
              </span>
              <span className="text-xs font-mono text-fayrouz-gold font-bold">
                Ordered {usualConfig.orderCount} times
              </span>
            </div>

            <span className="text-[11px] font-mono text-fayrouz-muted flex items-center gap-1">
              <Clock className="w-3 h-3 text-fayrouz-amber" />
              Last ordered: {usualConfig.lastOrdered}
            </span>
          </div>

          {/* Usual Drink Display Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              {/* Drink Artwork */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-fayrouz-obsidian border-2 border-fayrouz-gold/40 flex items-center justify-center flex-shrink-0 p-1 shadow-inner">
                <DrinkArtwork item={usualItem} size="md" />
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-fayrouz-cream leading-tight">
                  {usualItem.name}
                </h4>
                <div className="font-arabic text-sm text-fayrouz-amber mb-1">
                  {usualItem.nameAr}
                </div>
                <div className="p-1.5 px-2.5 rounded-xl bg-fayrouz-obsidian/80 border border-fayrouz-border/80 text-[11px] text-fayrouz-foam/90 font-mono inline-flex items-center gap-1.5">
                  <Repeat className="w-3 h-3 text-fayrouz-gold" />
                  <span>{usualConfig.note}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setCustomizingItem(usualItem)}
                className="px-4 py-2.5 rounded-2xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-border hover:border-fayrouz-amber/60 text-fayrouz-cream font-serif text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5 text-fayrouz-muted" />
                <span>Customize</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleQuickOrderUsual}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs sm:text-sm shadow-amber-glow flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>1-Tap Order My Usual (${(usualItem.effectivePrice ?? usualItem.price).toFixed(2)})</span>
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {curatedMatches.map((item, index) => (
            <KioskItemCard
              key={item.id}
              item={item}
              onAdd={() => setCustomizingItem(item)}
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {searchedItems.map((item) => (
            <KioskItemCard
              key={item.id}
              item={item}
              onAdd={() => setCustomizingItem(item)}
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
    </div>
  )
}
