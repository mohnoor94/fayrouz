import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import KioskItemCard from './KioskItemCard'
import { Radio, Sparkles, Coffee, Search, Flame, ShieldAlert, ArrowRight } from 'lucide-react'

const CATEGORY_TABS = [
  { id: 'all', name: 'All Drinks (25)', nameAr: 'كل المشروبات' },
  { id: 'espresso-black', name: 'Espresso & Black', nameAr: 'القهوة النقية' },
  { id: 'velvet-milk', name: 'Velvet & Milk', nameAr: 'مخمليات الحليب' },
  { id: 'cold-brew', name: 'Cold Brew & Infusions', nameAr: 'المقطرات الباردة' },
  { id: 'levantine-signature', name: 'Levantine Signature', nameAr: 'التواقيع الشرقية' },
  { id: 'tea-botanical', name: 'Tea & Botanical', nameAr: 'الأعشاب البرية' }
]

export default function InitialStateMenu({ onAdd }) {
  const { rawMenuData, triggerNfcSync, isSyncing, userProfile, setIsKioskWizardOpen } = useProfile()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleNfcTap = () => {
    soundFx.playNfcBeam()
    triggerNfcSync()
  }

  const filteredItems = rawMenuData.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery)
    return matchesTab && matchesSearch
  })

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto pr-2 pb-6">
      {/* High-Impact NFC Prompt Banner (The Invitation to Personalization) */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={handleNfcTap}
        className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-fayrouz-espresso via-fayrouz-surface to-fayrouz-espresso border-2 border-fayrouz-amber/40 shadow-amber-glow relative overflow-hidden cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-5 group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-fayrouz-amber/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10 text-center sm:text-left">
          {/* Pulsing Concentric NFC Target Target */}
          <div className="w-16 h-16 rounded-2xl bg-fayrouz-obsidian border-2 border-fayrouz-amber/60 flex items-center justify-center text-fayrouz-amber relative flex-shrink-0 shadow-[0_0_20px_rgba(212,163,115,0.3)]">
            <Radio className="w-8 h-8 animate-pulse text-fayrouz-amber" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-fayrouz-amber animate-ping" />
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-fayrouz-amber font-bold">
                NFC Universal Passport Reader
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-gold/30">
                Instant Recognition
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-gold-gradient">
              Have a Fayrouz Passport? Tap Phone Here
            </h3>
            <p className="text-xs text-fayrouz-foam/80 mt-0.5">
              Collapse the 25-item catalog into your 3 personalized matches and protect your dietary rules.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 relative z-10 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              soundFx.playTap()
              setIsKioskWizardOpen(true)
            }}
            className="px-4 py-2.5 rounded-2xl bg-fayrouz-surface/90 hover:bg-fayrouz-surface border border-fayrouz-amber/50 text-fayrouz-cream font-serif text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-fayrouz-gold" />
            <span>New Guest? Create Passport (30s)</span>
          </button>

          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs sm:text-sm shadow-amber-glow group-hover:scale-105 transition-transform">
            <span>{isSyncing ? 'Beaming...' : 'Tap to Sync Passport'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>

      {/* Baseline Menu Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-fayrouz-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-fayrouz-muted" />
            <h4 className="text-base font-serif font-bold text-fayrouz-cream">
              Traditional Cafe Menu (Neutral Mode)
            </h4>
          </div>
          <p className="text-xs text-fayrouz-muted mt-0.5">
            Full 25-item catalog. Showing the high cognitive load of uncurated ordering.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-fayrouz-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all drinks..."
            className="w-full bg-fayrouz-surface/80 border border-fayrouz-border/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-fayrouz-cream placeholder:text-fayrouz-muted/60 focus:outline-none focus:border-fayrouz-amber"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
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

      {/* 25-Item Grid (High cognitive load) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredItems.map((item) => (
          <KioskItemCard
            key={item.id}
            item={item}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  )
}
