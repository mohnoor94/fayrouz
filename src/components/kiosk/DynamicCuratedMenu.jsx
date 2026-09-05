import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { generateCoffeePersona } from '../../utils/personaGenerator'
import KioskItemCard from './KioskItemCard'
import { 
  Sparkles, 
  Search, 
  Coffee, 
  ShieldCheck, 
  Heart, 
  Flame, 
  Snowflake,
  CheckCircle2,
  Compass
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
  const { userProfile, personalizedMenu } = useProfile()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { curatedMatches, adventurousPick, categorizedMenu, stats } = personalizedMenu
  const persona = generateCoffeePersona(userProfile)

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
      {/* Personalized Welcome Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-[#221612] border border-fayrouz-amber/40 shadow-card-depth flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-fayrouz-amber/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-fayrouz-obsidian border-2 border-fayrouz-amber/50 flex items-center justify-center text-fayrouz-amber shadow-amber-glow flex-shrink-0">
            <Coffee className="w-7 h-7" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-amber font-bold">
                Passport Synchronized • {persona.passportNumber}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream">
                Welcome back, {userProfile.name}!
              </h3>
              <span className="font-arabic text-base sm:text-lg text-fayrouz-amber">
                صباح الخير يا {userProfile.name}
              </span>
            </div>

            <div className="text-xs text-fayrouz-gold font-medium mt-1">
              Persona: <strong>{persona.title}</strong> <span className="font-arabic text-xs font-normal">({persona.titleAr})</span>
            </div>
          </div>
        </div>

        {/* Passport Profile Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:self-center relative z-10">
          {persona.flavorPillarBadges?.slice(0, 2).map((badgeText, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-fayrouz-surface/90 text-fayrouz-cream border border-fayrouz-border/90 flex items-center gap-1 shadow-sm"
            >
              {badgeText}
            </span>
          ))}

          {persona.badges.slice(0, 2).map((badge, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-fayrouz-obsidian text-fayrouz-gold border border-fayrouz-amber/30 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-fayrouz-amber" />
              {badge.text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Hero Shelf: "Curated For Your Palate" (Spacious 2-Column Grid) */}
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

        {/* Spacious 2-Column Hero Grid: 3 Top Matches + 1 Wildcard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {curatedMatches.map((item, index) => (
            <KioskItemCard
              key={item.id}
              item={item}
              onAdd={onAdd}
              isHero={true}
              rank={index + 1}
            />
          ))}

          {/* Adventurous Discovery Pick */}
          {adventurousPick && (
            <KioskItemCard
              key={adventurousPick.id}
              item={adventurousPick}
              onAdd={onAdd}
              isHero={true}
              isWildcard={true}
            />
          )}
        </div>
      </section>

      {/* Full Catalog Section with Allergen Dimming (Spacious 2-Column Grid) */}
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
              onAdd={onAdd}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
