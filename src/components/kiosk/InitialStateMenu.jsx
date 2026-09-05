import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { BRAND_CONFIG } from '../../constants/brandConfig'
import KioskItemCard from './KioskItemCard'
import ItemCustomizerModal from './ItemCustomizerModal'
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
  Compass 
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
  const { rawMenuData, triggerNfcSync, isSyncing, userProfile, setIsKioskWizardOpen, completeProfile } = useProfile()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customizingItem, setCustomizingItem] = useState(null)

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
    <div className="flex-1 min-h-0 flex flex-col gap-6 overflow-y-auto pr-2 pb-8">
      {/* High-Impact NFC Prompt Banner (Spacious, Zero-Overflow Layout, Guaranteed Unclipped) */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        onClick={handleNfcTap}
        className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-[#1e1510] border-2 border-fayrouz-amber/50 shadow-amber-glow relative cursor-pointer flex flex-col gap-4 group transition-all"
      >
        {/* Soft Ambient Radial Lights (Isolated in clipped background container to never clip content) */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-fayrouz-amber/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-fayrouz-gold/8 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top Header: NFC Beacon & High-Contrast Typography */}
        <div className="flex items-start gap-4 relative z-10">
          {/* Concentric Pulsing NFC Beacon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-fayrouz-obsidian border-2 border-fayrouz-amber flex items-center justify-center text-fayrouz-amber relative flex-shrink-0 shadow-[0_0_25px_rgba(212,163,115,0.4)] group-hover:scale-105 transition-transform">
            <Radio className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse text-fayrouz-amber" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-fayrouz-amber animate-ping" />
          </div>

          <div className="flex-1 flex flex-col gap-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-fayrouz-gold font-bold flex items-center gap-1.5 bg-fayrouz-obsidian/80 px-2.5 py-0.5 rounded-md border border-fayrouz-amber/30">
                <Zap className="w-3.5 h-3.5 text-fayrouz-gold" />
                NFC Universal Passport Reader
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30 font-medium">
                Instant Recognition Active
              </span>
            </div>

            {/* Clear, Solid, High-Contrast Headline (NO webkit gradient text fill to guarantee 100% visibility) */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-fayrouz-cream leading-snug">
              Have a Universal Coffee Passport? <span className="text-fayrouz-amber">Tap Phone Here</span>
            </h3>

            {/* Arabic Invitation */}
            <div className="font-arabic text-sm text-fayrouz-amber font-normal">
              معك جواز تذوق عالمي؟ قرّب هاتفك هنا لتنهار القائمة إلى اختياراتك الثلاثة الآمنة
            </div>

            {/* Explanatory Subtitle */}
            <p className="text-xs sm:text-sm text-fayrouz-foam/85 leading-relaxed mt-0.5">
              Instantly collapse the 25-item catalog into your 3 personalized matches and safeguard your dietary rules.
            </p>
          </div>
        </div>

        {/* Action Row: 2 intuitive paths for unsigned walk-in guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-fayrouz-border/60 relative z-10">
          <div 
            onClick={handleNfcTap}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs sm:text-sm shadow-amber-glow flex items-center justify-center gap-2 group-hover:scale-[1.01] transition-transform cursor-pointer"
          >
            <Radio className={`w-4 h-4 ${isSyncing ? 'animate-spin' : 'animate-pulse'}`} />
            <span>{isSyncing ? 'Beaming Passport...' : 'Tap Phone (Simulate NFC Wave)'}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              soundFx.playTap()
              setIsKioskWizardOpen(true)
            }}
            className="py-3 px-4 rounded-2xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-amber/50 hover:border-fayrouz-amber text-fayrouz-cream font-serif font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            title="Create your complete taste passport with dietary rules in 30 seconds"
          >
            <Sparkles className="w-4 h-4 text-fayrouz-gold flex-shrink-0" />
            <span>New Guest? Create Taste Passport (30s)</span>
          </button>
        </div>
      </motion.div>

      {/* Baseline Menu Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-fayrouz-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-fayrouz-amber" />
            <h4 className="text-base font-serif font-bold text-fayrouz-cream">
              Traditional Cafe Menu (Neutral Mode)
            </h4>
          </div>
          <p className="text-xs text-fayrouz-muted mt-0.5">
            Full 25-item specialty catalog. Showing the cognitive load of uncurated ordering.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-fayrouz-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all drinks..."
            className="w-full bg-fayrouz-surface/80 border border-fayrouz-border/80 rounded-xl pl-8 pr-3 py-2 text-xs text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none focus:border-fayrouz-amber transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
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
    </div>
  )
}
