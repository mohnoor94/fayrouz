import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { BRAND_CONFIG } from '../../constants/brandConfig'
import KioskItemCard from './KioskItemCard'
import ItemCustomizerModal from './ItemCustomizerModal'
import ReturningGuestLookupModal from './ReturningGuestLookupModal'
import { 
  Radio, 
  Sparkles, 
  Coffee, 
  Search, 
  ArrowRight, 
  Zap, 
  Flame, 
  Snowflake, 
  Heart, 
  Compass,
  Phone,
  UserCheck
} from 'lucide-react'

export const CATEGORY_DEFINITIONS = [
  { 
    id: 'espresso-black', 
    name: 'Espresso & Black', 
    nameAr: 'القهوة النقية والإسبريسو',
    icon: Flame,
    color: 'text-fayrouz-amber',
    borderColor: 'border-fayrouz-amber/40',
    description: 'Pristine single-origin clarity, unmasked terroir, double ristretto & cezve extractions'
  },
  { 
    id: 'velvet-milk', 
    name: 'Velvet & Milk', 
    nameAr: 'مخمليات الحليب والمايكروفوم',
    icon: Sparkles,
    color: 'text-fayrouz-gold',
    borderColor: 'border-fayrouz-gold/40',
    description: 'Silky microfoam precision, textured oat harmony & comforting lattes'
  },
  { 
    id: 'cold-brew', 
    name: 'Cold Brew & Infusions', 
    nameAr: 'المقطرات الباردة والثلجية',
    icon: Snowflake,
    color: 'text-sky-400',
    borderColor: 'border-sky-400/40',
    description: 'Patient 24-hour slow drip over crystal ice & sparkling botanical infusions'
  },
  { 
    id: 'levantine-signature', 
    name: 'Levantine Signature', 
    nameAr: 'التواقيع الشرقية الحرفية',
    icon: Heart,
    color: 'text-fayrouz-rose',
    borderColor: 'border-fayrouz-rose/40',
    description: 'Aleppo pistachio, Damascus rose, cardamom miel & ancestral craft'
  },
  { 
    id: 'tea-botanical', 
    name: 'Tea & Botanical', 
    nameAr: 'الأعشاب البرية والشاي المختص',
    icon: Compass,
    color: 'text-fayrouz-cardamom',
    borderColor: 'border-fayrouz-cardamom/40',
    description: 'Wild mountain sage, floral tisanes & restorative loose leaf elixirs'
  }
]

const CATEGORY_TABS = [
  { id: 'all', name: 'All Drinks (25)', nameAr: 'كل المشروبات', icon: Coffee },
  ...CATEGORY_DEFINITIONS
]

export default function InitialStateMenu({ onAdd }) {
  const { 
    rawMenuData, 
    triggerNfcSync, 
    isSyncing, 
    userProfile, 
    setIsKioskWizardOpen, 
    completeProfile,
    demoPresets = [],
    loadPreset
  } = useProfile()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customizingItem, setCustomizingItem] = useState(null)
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false)

  const handleNfcTap = () => {
    soundFx.playNfcBeam()
    triggerNfcSync()
  }

  // Determine categories to render
  const categoriesToRender = CATEGORY_DEFINITIONS.filter(cat => 
    activeTab === 'all' || activeTab === cat.id
  ).map(cat => {
    const items = rawMenuData.filter(item => {
      const inCategory = item.category === cat.id
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameAr.includes(searchQuery)
      return inCategory && matchesSearch
    })
    return { ...cat, items }
  }).filter(cat => cat.items.length > 0)

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto pr-1">
      {/* =====================================================================
          1. PERSISTENT PROMINENT NFC RECOGNITION HERO BANNER (COMPACT & SLEEK)
          ===================================================================== */}
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-fayrouz-surface via-[#201713] to-fayrouz-espresso border-2 border-fayrouz-amber/50 shadow-[0_8px_25px_-5px_rgba(212,163,115,0.25)] flex flex-col gap-2 relative shrink-0"
      >
        {/* Animated Amber Glow Wave inside clipped layer */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-full bg-gradient-to-l from-fayrouz-amber/12 via-fayrouz-gold/8 to-transparent" />
        </div>

        {/* Row 1: Reader Emblem, Title/Calligraphy/Description (Left), Primary Tap Button (Right) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 relative z-10 w-full">
          <div className="flex items-start gap-2.5 min-w-0 flex-1 basis-[280px]">
            <div className="w-9 h-9 rounded-xl bg-fayrouz-obsidian border border-fayrouz-amber flex items-center justify-center text-fayrouz-amber shrink-0 shadow-[0_0_15px_rgba(212,163,115,0.3)] relative mt-0.5 sm:mt-0">
              <Radio className="w-4 h-4 animate-pulse text-fayrouz-amber" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-fayrouz-amber animate-ping" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                <span className="text-[9px] font-mono uppercase tracking-wider text-fayrouz-gold font-bold flex items-center gap-1 bg-fayrouz-obsidian/90 px-1.5 py-0.2 rounded border border-fayrouz-amber/30">
                  <Zap className="w-2.5 h-2.5 text-fayrouz-gold" />
                  FayrouzPass™ Reader
                </span>
                <span className="text-[8px] font-mono px-1.5 py-0.2 rounded-full bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30 font-medium">
                  Instant Recognition • 3-Sec Ordering
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-1.5">
                <h3 className="text-xs sm:text-sm font-serif font-bold text-fayrouz-cream">
                  Have a Fayrouz Taste Passport? <span className="text-fayrouz-amber">Tap Phone Here</span>
                </h3>
                <span className="font-arabic text-[11px] text-fayrouz-amber font-normal">
                  (معك جواز فيروز؟ قرّب هاتفك من الشاشة)
                </span>
              </div>
            </div>
          </div>

          {/* Primary NFC Beam CTA Button */}
          <button
            type="button"
            onClick={handleNfcTap}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs shadow-amber-glow flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform cursor-pointer shrink-0 ml-auto sm:ml-0"
          >
            <Radio className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : 'animate-pulse'}`} />
            <span>{isSyncing ? 'Beaming...' : 'Tap Phone (NFC Beam)'}</span>
          </button>
        </div>

        {/* Row 2: Secondary Lookups (Left) + 1-Click Pitch Demo Personas (Right) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-fayrouz-border/40 relative z-10 text-xs w-full">
          {/* Alternative Lookups */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                soundFx.playTap()
                setIsLookupModalOpen(true)
              }}
              className="py-1.5 px-3 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border hover:border-fayrouz-amber/50 text-fayrouz-cream font-serif font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Returning Guest? Enter Phone # or FayrouzPass ID"
            >
              <Phone className="w-3.5 h-3.5 text-fayrouz-amber shrink-0" />
              <span>Enter Phone # / ID</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                soundFx.playTap()
                setIsKioskWizardOpen(true)
              }}
              className="py-1.5 px-3 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-amber/40 hover:border-fayrouz-amber text-fayrouz-gold font-serif font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-fayrouz-gold shrink-0" />
              <span>New Guest? Create Pass (30s)</span>
            </button>
          </div>

          {/* 1-Tap Demo Personas */}
          {demoPresets.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap ml-auto lg:ml-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-fayrouz-muted flex items-center gap-1 mr-0.5">
                <Sparkles className="w-3 h-3 text-fayrouz-amber" />
                <span>1-Tap Demo:</span>
              </span>
              {demoPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    soundFx.playNfcBeam()
                    loadPreset(preset.id)
                    triggerNfcSync()
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-amber/30 hover:border-fayrouz-amber text-fayrouz-cream flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                  title={`Simulate ${preset.name} (${preset.title}) tapping their FayrouzPass`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-fayrouz-amber animate-pulse" />
                  <span className="font-bold text-fayrouz-gold">{preset.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Sticky Catalog Header & Category Navigation (Guaranteed Visible, Never Collapsed) */}
      <div className="sticky top-0 z-20 bg-fayrouz-obsidian/95 backdrop-blur-md pt-1 pb-3 border-b border-fayrouz-border/60 flex flex-col gap-2.5 shrink-0">
        {/* Baseline Menu Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-fayrouz-amber" />
              <h4 className="text-base font-serif font-bold text-fayrouz-cream">
                Traditional Cafe Menu (Neutral Mode)
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-surface border border-fayrouz-border text-fayrouz-muted">
                25 Drinks
              </span>
            </div>
            <p className="text-[11px] text-fayrouz-muted mt-0.5">
              Full specialty catalog. Tap any category below to filter or explore.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-fayrouz-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-fayrouz-surface/80 border border-fayrouz-border/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none focus:border-fayrouz-amber transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs: shrink-0 and min-h-[40px] guaranteed */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0 min-h-[40px]">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon || Coffee
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundFx.playTap()
                  setActiveTab(tab.id)
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-fayrouz-surface text-fayrouz-amber border-2 border-fayrouz-amber/60 shadow-amber-glow font-bold'
                    : 'bg-fayrouz-espresso text-fayrouz-muted hover:text-fayrouz-cream hover:bg-fayrouz-surface/60 border border-fayrouz-border/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-fayrouz-amber' : 'text-fayrouz-muted'}`} />
                <span>{tab.name}</span>
                <span className="font-arabic text-[11px] opacity-70">({tab.nameAr})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Categorized Specialty Catalog Sections */}
      {categoriesToRender.length === 0 ? (
        <div className="py-12 text-center flex flex-col items-center justify-center gap-2 rounded-2xl bg-fayrouz-surface/40 border border-fayrouz-border">
          <Search className="w-6 h-6 text-fayrouz-muted" />
          <p className="text-sm text-fayrouz-cream font-medium">No drinks found matching "{searchQuery}"</p>
          <button 
            type="button"
            onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
            className="text-xs text-fayrouz-amber hover:underline mt-1 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {categoriesToRender.map((cat) => {
            const Icon = cat.icon
            return (
              <section key={cat.id} className="flex flex-col gap-3.5 pt-1">
                {/* Category Section Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-fayrouz-border/70">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl bg-fayrouz-surface border ${cat.borderColor} flex items-center justify-center ${cat.color} shadow-sm flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-fayrouz-cream">
                          {cat.name}
                        </h4>
                        <span className="font-arabic text-xs text-fayrouz-amber font-normal">
                          ({cat.nameAr})
                        </span>
                      </div>
                      <p className="text-[11px] text-fayrouz-muted leading-tight mt-0.5 truncate">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-fayrouz-surface border border-fayrouz-border text-fayrouz-gold flex-shrink-0">
                    {cat.items.length} Drinks
                  </span>
                </div>

                {/* 2-Column Spacious Catalog Grid for this Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4">
                  {cat.items.map((item) => (
                    <KioskItemCard
                      key={item.id}
                      item={item}
                      onAdd={() => setCustomizingItem(item)}
                      onCustomize={() => setCustomizingItem(item)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Drink Customization Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onConfirmAdd={(customized) => onAdd(customized)}
      />

      {/* Returning Guest Phone # / ID Recognition Modal */}
      <ReturningGuestLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />
    </div>
  )
}
