import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  useProfile 
} from '../../context/ProfileContext'
import { DIETARY_FLAGS } from '../../utils/personalizationEngine'
import { 
  Sparkles, 
  Coffee, 
  ShieldCheck, 
  Flame, 
  Snowflake, 
  Compass, 
  AlertTriangle, 
  Check, 
  RotateCcw,
  Sliders,
  CheckCircle2,
  Heart,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react'

export default function EnginePlayground() {
  const {
    userProfile,
    personalizedMenu,
    updateProfile,
    toggleDietary,
    setPalateScore,
    setTemperature,
    loadPreset,
    resetProfile,
    activePresetId,
    demoPresets
  } = useProfile()

  const [selectedCategory, setSelectedCategory] = useState('all')

  const { curatedMatches, adventurousPick, categorizedMenu, stats } = personalizedMenu

  // Palate label generator
  const getPalateLabel = (score) => {
    if (score <= 2) return { text: 'Bold, Dark & Intense Crema', color: 'text-fayrouz-amber' }
    if (score <= 4) return { text: 'Bright, Fruity & Floral Acidity', color: 'text-fayrouz-gold' }
    if (score <= 7) return { text: 'Balanced, Nuanced & Smooth', color: 'text-fayrouz-foam' }
    return { text: 'Sweet, Creamy & Dessert Comfort', color: 'text-fayrouz-rose' }
  }

  const palateInfo = getPalateLabel(userProfile.palateScore)

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      {/* Pitch Presets Quick-Switcher */}
      <section className="glass-card rounded-2xl p-4 sm:p-5 border-fayrouz-border/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-fayrouz-amber" />
            <span className="text-xs font-mono uppercase tracking-wider text-fayrouz-muted">
              1-Click Pitch Demo Presets (Instant Cafe Personas)
            </span>
          </div>
          <button 
            onClick={resetProfile}
            className="text-xs text-fayrouz-muted hover:text-fayrouz-cream flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {demoPresets.map((preset) => {
            const isActive = activePresetId === preset.id
            return (
              <motion.button
                key={preset.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => loadPreset(preset.id)}
                className={`flex flex-col p-3.5 rounded-xl text-left border transition-all ${
                  isActive 
                    ? 'bg-fayrouz-surface border-fayrouz-amber shadow-amber-glow' 
                    : 'bg-fayrouz-espresso/70 border-fayrouz-border/70 hover:border-fayrouz-amber/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-serif text-fayrouz-cream">{preset.name}</span>
                    <span className="font-arabic text-xs text-fayrouz-amber font-normal">({preset.nameAr})</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-fayrouz-amber" />}
                </div>
                <div className="text-[11px] font-medium text-fayrouz-gold">{preset.title}</div>
                <div className="text-[10px] text-fayrouz-foam/60 mt-1 line-clamp-1">{preset.description}</div>
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* Main Control Console & Analytics Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Personalization Controls (5 cols) */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6 border-fayrouz-amber/20 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-fayrouz-border/70 pb-4">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-fayrouz-amber" />
                <h3 className="text-base font-serif font-semibold text-fayrouz-cream">
                  Passport Profile Controls
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-fayrouz-surface text-fayrouz-foam border border-fayrouz-border">
                Live Reactive
              </span>
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-fayrouz-muted uppercase tracking-wider">
                Guest / Customer Name
              </label>
              <input 
                type="text" 
                value={userProfile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="w-full bg-fayrouz-surface border border-fayrouz-border rounded-xl px-3.5 py-2 text-sm text-fayrouz-cream focus:outline-none focus:border-fayrouz-amber transition-colors"
                placeholder="Enter customer name..."
              />
            </div>

            {/* Palate Slider (1 to 10) */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-mono text-fayrouz-muted uppercase tracking-wider flex items-center gap-1.5">
                  <span>Sensory Palate Dial</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-serif font-bold text-fayrouz-gold">
                    {userProfile.palateScore}
                  </span>
                  <span className="text-xs text-fayrouz-muted">/ 10</span>
                </div>
              </div>

              <input 
                type="range"
                min="1"
                max="10"
                step="1"
                value={userProfile.palateScore}
                onChange={(e) => setPalateScore(e.target.value)}
                className="w-full accent-fayrouz-amber h-2 bg-fayrouz-surface rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] text-fayrouz-muted font-mono">
                <span>1 (Dark/Bold)</span>
                <span>5 (Balanced)</span>
                <span>10 (Sweet Dessert)</span>
              </div>

              <div className={`text-xs ${palateInfo.color} font-medium bg-fayrouz-surface/60 p-2.5 rounded-xl border border-fayrouz-border/60`}>
                ✨ Current Taste: {palateInfo.text}
              </div>
            </div>

            {/* Dietary Guardrails */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-fayrouz-muted uppercase tracking-wider">
                Dietary & Allergen Guardrails
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: DIETARY_FLAGS.NUT_FREE, label: '🥜 Nut Allergy', sub: 'Strict zero-contamination' },
                  { id: DIETARY_FLAGS.VEGAN, label: '🌱 100% Vegan', sub: 'Plant-based (auto-swaps to Oat Milk)' },
                  { id: DIETARY_FLAGS.LACTOSE_FREE, label: '🥛 Lactose-Free', sub: 'Dairy alternative auto-swap (+$0.50)' },
                ].map((diet) => {
                  const isChecked = userProfile.dietary.includes(diet.id)
                  return (
                    <motion.button
                      key={diet.id}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleDietary(diet.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        isChecked 
                          ? 'bg-fayrouz-cardamom/15 border-fayrouz-cardamom/50 text-fayrouz-cream' 
                          : 'bg-fayrouz-surface/50 border-fayrouz-border/70 text-fayrouz-foam/70 hover:border-fayrouz-amber/30'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">{diet.label}</span>
                        <span className="text-[10px] text-fayrouz-muted">{diet.sub}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                        isChecked ? 'bg-fayrouz-cardamom border-fayrouz-cardamom text-fayrouz-obsidian' : 'border-fayrouz-border'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Temperature Preference */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-fayrouz-muted uppercase tracking-wider">
                Temperature Affinity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'hot', label: 'Hot & Steaming', icon: Flame, color: 'text-fayrouz-ember' },
                  { id: 'iced', label: 'Cold & Crisp', icon: Snowflake, color: 'text-fayrouz-sky' },
                  { id: 'any', label: 'Any Temp', icon: Coffee, color: 'text-fayrouz-amber' },
                ].map((temp) => {
                  const isSelected = userProfile.temperature === temp.id
                  const Icon = temp.icon
                  return (
                    <button
                      key={temp.id}
                      type="button"
                      onClick={() => setTemperature(temp.id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                        isSelected 
                          ? 'bg-fayrouz-surface border-fayrouz-amber shadow-amber-glow text-fayrouz-cream' 
                          : 'bg-fayrouz-surface/40 border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-foam'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${temp.color}`} />
                      <span className="text-[11px] font-medium">{temp.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Engine Real-Time Metrics */}
          <div className="glass-card rounded-2xl p-4 border-fayrouz-border/80">
            <div className="text-xs font-mono uppercase tracking-wider text-fayrouz-muted mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-fayrouz-amber" />
              Engine Classification Metrics
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-border/60">
                <div className="text-lg font-serif font-bold text-fayrouz-cream">{stats.total}</div>
                <div className="text-[10px] text-fayrouz-muted uppercase">Total Items</div>
              </div>
              <div className="p-2.5 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-cardamom/30">
                <div className="text-lg font-serif font-bold text-fayrouz-cardamom">{stats.safe}</div>
                <div className="text-[10px] text-fayrouz-muted uppercase">100% Safe</div>
              </div>
              <div className="p-2.5 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-amber/30">
                <div className="text-lg font-serif font-bold text-fayrouz-gold">{stats.adapted}</div>
                <div className="text-[10px] text-fayrouz-muted uppercase">Oat Swapped</div>
              </div>
              <div className="p-2.5 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-rose/30">
                <div className="text-lg font-serif font-bold text-fayrouz-rose">{stats.unsafe}</div>
                <div className="text-[10px] text-fayrouz-muted uppercase">Allergen Dimmed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Curated Recommendations & Adventurous Wildcard (7 cols) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {/* Top Curated Shelf */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fayrouz-gold animate-pulse" />
                  <h3 className="text-lg font-serif font-bold text-gold-gradient">
                    Curated For {userProfile.name || 'You'}
                  </h3>
                </div>
                <p className="text-xs text-fayrouz-foam/70 mt-0.5">
                  Top matches mathematically aligned with palate score {userProfile.palateScore} and temperature preference.
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-fayrouz-gold/15 text-fayrouz-gold border border-fayrouz-gold/30">
                Top 3 Matches
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {curatedMatches.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-card rounded-2xl p-4 border-fayrouz-border/80 hover:border-fayrouz-amber/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center flex-shrink-0">
                      <Coffee className="w-6 h-6 text-fayrouz-amber" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-serif font-bold text-fayrouz-cream">
                          {item.name}
                        </h4>
                        <span className="font-arabic text-xs text-fayrouz-amber">
                          {item.nameAr}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-fayrouz-surface text-fayrouz-foam border border-fayrouz-border">
                          Profile: {item.profileScore}/10
                        </span>
                        {item.isAdapted && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30 font-medium">
                            {item.badgeNotice}
                          </span>
                        )}
                        {item.tastingNotes?.slice(0, 2).map((note, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-fayrouz-surface/60 text-fayrouz-muted">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto gap-1 border-t sm:border-t-0 border-fayrouz-border/60 pt-2 sm:pt-0">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-gold/30">
                        {item.matchScore}% Match
                      </span>
                    </div>
                    <div className="text-base font-serif font-bold text-fayrouz-cream mt-0.5">
                      ${(Number(item.effectivePrice ?? item.price) || 0).toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Adventurous Discovery Wildcard Card */}
          {adventurousPick && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-fayrouz-surface via-fayrouz-espresso to-fayrouz-obsidian border-2 border-fayrouz-rose/40 relative overflow-hidden shadow-card-depth"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-fayrouz-rose/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-fayrouz-rose animate-spin" />
                  <span className="text-xs font-mono uppercase tracking-wider text-fayrouz-rose font-bold">
                    Adventurous Discovery — Expand Your Palate
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-fayrouz-rose/20 text-fayrouz-rose border border-fayrouz-rose/40 font-medium">
                  Δ = {adventurousPick.wildcardDelta} pts away
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xl font-serif font-bold text-fayrouz-cream">
                      {adventurousPick.name}
                    </h4>
                    <span className="font-arabic text-sm text-fayrouz-amber">
                      {adventurousPick.nameAr}
                    </span>
                  </div>
                  <div className="text-xs text-fayrouz-foam/70 mt-0.5">
                    Profile Score: {adventurousPick.profileScore}/10 • Category: {adventurousPick.categoryName}
                  </div>
                </div>

                <div className="text-xl font-serif font-bold text-fayrouz-gold">
                  ${(Number(adventurousPick.effectivePrice ?? adventurousPick.price) || 0).toFixed(2)}
                </div>
              </div>

              {/* Storytelling rationale quote */}
              <div className="p-3.5 rounded-2xl bg-fayrouz-obsidian/80 border border-fayrouz-border/80 flex items-start gap-3">
                <Compass className="w-4 h-4 text-fayrouz-amber flex-shrink-0 mt-0.5" />
                <div className="text-xs text-fayrouz-foam/90 leading-relaxed italic">
                  "{adventurousPick.whyYouWillLoveThis}"
                </div>
              </div>
            </motion.div>
          )}

          {/* Full Catalog Verification with Dimmed Allergen Showcase */}
          <div className="glass-card rounded-2xl p-5 border-fayrouz-border/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm font-serif font-semibold text-fayrouz-cream flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-fayrouz-amber" />
                  Full Catalog & Allergen Safeguard Matrix (Option A)
                </h4>
                <p className="text-[11px] text-fayrouz-muted mt-0.5">
                  Proves how unsafe items remain visible but dimmed (35% opacity) with warning badges for cafe owner pitches.
                </p>
              </div>

              {/* Category selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-fayrouz-surface border border-fayrouz-border text-xs text-fayrouz-cream rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-fayrouz-amber"
              >
                <option value="all">All 5 Categories (25 items)</option>
                <option value="espresso-black">Espresso & Black</option>
                <option value="velvet-milk">Velvet & Milk</option>
                <option value="cold-brew">Cold Brew & Infusions</option>
                <option value="levantine-signature">Levantine & Signature</option>
                <option value="tea-botanical">Tea & Botanical</option>
              </select>
            </div>

            {/* Item list */}
            <div className="grid grid-cols-1 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {Object.values(categorizedMenu).flatMap(cat => 
                (selectedCategory === 'all' || selectedCategory === cat.category) ? cat.items : []
              ).map((item) => {
                const isDimmed = item.isUnsafe
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs ${
                      isDimmed 
                        ? 'opacity-35 bg-fayrouz-surface/30 border-red-900/40' 
                        : 'bg-fayrouz-surface/70 border-fayrouz-border/60 hover:border-fayrouz-amber/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-fayrouz-muted w-5">
                        {item.profileScore}
                      </span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-medium ${isDimmed ? 'line-through text-fayrouz-muted' : 'text-fayrouz-cream'}`}>
                            {item.name}
                          </span>
                          <span className="font-arabic text-[11px] text-fayrouz-amber">
                            {item.nameAr}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {item.isUnsafe && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-950/80 text-red-400 border border-red-800/60">
                              ⚠️ {item.unsafeReason}
                            </span>
                          )}
                          {item.isAdapted && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30">
                              Oat Swapped (+$0.50)
                            </span>
                          )}
                          {item.tempNotice && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-fayrouz-surface text-fayrouz-muted border border-fayrouz-border">
                              {item.tempNotice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-fayrouz-muted text-[11px]">
                        {item.matchScore}%
                      </span>
                      <span className="font-serif font-bold text-fayrouz-cream text-xs">
                        ${(Number(item.effectivePrice ?? item.price) || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
