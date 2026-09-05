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
  CheckCircle2
} from 'lucide-react'

const CATEGORY_TABS = [
  { id: 'all', name: 'All Categories', nameAr: 'الكل' },
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
        className="rounded-3xl p-5 bg-gradient-to-r from-fayrouz-surface via-fayrouz-espresso to-fayrouz-surface border border-fayrouz-amber/30 shadow-card-depth flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-fayrouz-obsidian border border-fayrouz-amber/40 flex items-center justify-center text-fayrouz-amber shadow-amber-glow flex-shrink-0">
            <Coffee className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-amber font-semibold">
                Passport Synchronized • {persona.passportNumber}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream">
                Welcome back, {userProfile.name}!
              </h3>
              <span className="font-arabic text-base text-fayrouz-amber">
                صباح الخير يا {userProfile.name}
              </span>
            </div>
            <div className="text-xs text-fayrouz-gold font-medium mt-0.5">
              Persona: <strong>{persona.title}</strong> <span className="font-arabic text-xs font-normal">({persona.titleAr})</span>
            </div>
          </div>
        </div>

        {/* Passport Profile Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:self-center">
          <span className="text-[10px] px-2.5 py-1 rounded-full font-mono bg-fayrouz-obsidian text-fayrouz-gold border border-fayrouz-border">
            Palate: {userProfile.palateScore}/10
          </span>
          {persona.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-fayrouz-surface text-fayrouz-cream border border-fayrouz-border/80 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-fayrouz-amber" />
              {badge.text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Hero Shelf: "Curated For You" */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-fayrouz-gold" />
            <h4 className="text-lg font-serif font-bold text-gold-gradient">
              Curated For Your Palate
            </h4>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-fayrouz-gold/15 text-fayrouz-gold border border-fayrouz-gold/30">
              3 Perfect Matches + 1 Wildcard
            </span>
          </div>

          <div className="text-xs text-fayrouz-muted font-mono hidden sm:block">
            Filtered from 25 items in 15ms
          </div>
        </div>

        {/* 4 Cards Grid: 3 Matches + 1 Adventurous Pick */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
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

      {/* Full Catalog Section (Option A: Unsafe items dimmed 35%) */}
      <section className="flex flex-col gap-4 pt-4 border-t border-fayrouz-border/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-fayrouz-amber" />
              <h4 className="text-base font-serif font-bold text-fayrouz-cream">
                Full Cafe Catalog with Allergy Guardrails
              </h4>
            </div>
            <p className="text-xs text-fayrouz-muted mt-0.5">
              Unsafe items are dimmed (35% opacity) with warning badges to protect you from accidents.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-fayrouz-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search full menu..."
              className="w-full bg-fayrouz-surface/80 border border-fayrouz-border/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none focus:border-fayrouz-amber"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
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

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
