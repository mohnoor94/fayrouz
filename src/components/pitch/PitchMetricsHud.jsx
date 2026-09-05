import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { calculatePitchMetrics } from '../../utils/pitchMetrics'
import { soundFx } from '../../utils/soundEffects'
import { 
  TrendingUp, 
  Clock, 
  BrainCircuit, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Coffee,
  CheckCircle2,
  DollarSign
} from 'lucide-react'

export default function PitchMetricsHud() {
  const { userProfile, personalizedMenu, orderTray } = useProfile()
  const [isExpanded, setIsExpanded] = useState(false)

  const metrics = useMemo(() => {
    return calculatePitchMetrics(userProfile, personalizedMenu, orderTray)
  }, [userProfile, personalizedMenu, orderTray])

  const toggleExpand = () => {
    soundFx.playTap()
    setIsExpanded(prev => !prev)
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-full px-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Collapsed Floating Pill */
            <motion.button
              key="collapsed-hud"
              type="button"
              onClick={toggleExpand}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-4 sm:px-6 py-2.5 rounded-full bg-fayrouz-espresso/95 backdrop-blur-md border border-fayrouz-amber/40 text-fayrouz-cream shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,163,115,0.2)] hover:border-fayrouz-amber transition-all cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-pulse" />
              
              <div className="flex items-center gap-2 text-xs sm:text-sm font-serif">
                <span className="text-fayrouz-gold font-bold">Cafe ROI Telemetry:</span>
                <span className="text-fayrouz-cream hidden sm:inline">{metrics.speed.headline}</span>
                <span className="text-fayrouz-muted hidden sm:inline">•</span>
                <span className="text-fayrouz-cardamom font-semibold">{metrics.ticketLift.headline}</span>
                <span className="text-fayrouz-muted hidden md:inline">•</span>
                <span className="text-fayrouz-foam/80 hidden md:inline">100% Allergen Safe</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-fayrouz-amber font-mono bg-fayrouz-surface/80 px-2 py-0.5 rounded-full border border-fayrouz-border group-hover:bg-fayrouz-amber group-hover:text-fayrouz-obsidian transition-colors">
                <span>View Proof</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          ) : (
            /* Expanded Telemetry Dashboard Dock */
            <motion.div
              key="expanded-hud"
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="w-full bg-fayrouz-espresso/95 backdrop-blur-xl border border-fayrouz-amber/40 rounded-3xl p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(212,163,115,0.2)] flex flex-col gap-4 text-fayrouz-cream relative overflow-hidden"
            >
              {/* Subtle ambient light aura inside dock */}
              <div className="absolute top-0 right-1/4 w-64 h-32 bg-fayrouz-amber/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-fayrouz-border/70 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-fayrouz-surface border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-gold shadow-amber-glow">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-fayrouz-cream flex items-center gap-2">
                      <span>Cafe Owner Business Impact & Speed Telemetry</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-amber/20 text-fayrouz-amber border border-fayrouz-amber/30 uppercase">
                        Live Pitch Data
                      </span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-fayrouz-foam/70">
                      Empirical efficiency benchmarks comparing traditional specialty counter vs. Fayrouz Personalization
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-fayrouz-muted hidden sm:inline">
                    Guest: <strong className="text-fayrouz-amber font-serif">{userProfile.name}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={toggleExpand}
                    className="p-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
                    title="Collapse Telemetry Dock"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Metric Tiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Tile 1: Speed of Service */}
                <div className="p-3.5 rounded-2xl bg-fayrouz-surface/70 border border-fayrouz-border/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-fayrouz-muted flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-fayrouz-amber" />
                        Ordering Speed
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-cardamom/20 text-fayrouz-cardamom font-bold">
                        -{metrics.speed.savedPercent}%
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 my-1">
                      <span className="text-2xl font-serif font-bold text-fayrouz-cream">
                        {metrics.speed.curated}
                      </span>
                      <span className="text-xs text-fayrouz-muted line-through font-mono">
                        vs {metrics.speed.traditional}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-fayrouz-foam/80 mt-2 leading-relaxed">
                    {metrics.speed.detail}
                  </p>
                </div>

                {/* Tile 2: Cognitive Load Reduction */}
                <div className="p-3.5 rounded-2xl bg-fayrouz-surface/70 border border-fayrouz-border/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-fayrouz-muted flex items-center gap-1.5">
                        <BrainCircuit className="w-3.5 h-3.5 text-fayrouz-sky" />
                        Decision Load
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-sky/20 text-fayrouz-sky font-bold">
                        -{metrics.cognitiveLoad.reductionPercent}%
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 my-1">
                      <span className="text-2xl font-serif font-bold text-fayrouz-cream">
                        {metrics.cognitiveLoad.curated}
                      </span>
                      <span className="text-xs text-fayrouz-muted line-through font-mono">
                        vs {metrics.cognitiveLoad.traditional}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-fayrouz-foam/80 mt-2 leading-relaxed">
                    {metrics.cognitiveLoad.detail}
                  </p>
                </div>

                {/* Tile 3: Average Ticket Lift */}
                <div className="p-3.5 rounded-2xl bg-fayrouz-surface/70 border border-fayrouz-border/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-fayrouz-muted flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-fayrouz-gold" />
                        Avg Ticket Value
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-gold/20 text-fayrouz-gold font-bold">
                        +{metrics.ticketLift.liftPercent}%
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 my-1">
                      <span className="text-2xl font-serif font-bold text-fayrouz-gold">
                        {metrics.ticketLift.projected}
                      </span>
                      <span className="text-xs text-fayrouz-muted line-through font-mono">
                        vs {metrics.ticketLift.baseline}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-fayrouz-foam/80 mt-2 leading-relaxed">
                    {metrics.ticketLift.detail}
                  </p>
                </div>

                {/* Tile 4: Allergen & Safety Guardrail */}
                <div className="p-3.5 rounded-2xl bg-fayrouz-surface/70 border border-fayrouz-border/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-fayrouz-muted flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-fayrouz-cardamom" />
                        Dietary Safety
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-cardamom/20 text-fayrouz-cardamom font-bold">
                        100%
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 my-1">
                      <span className="text-2xl font-serif font-bold text-fayrouz-cardamom">
                        Zero Risk
                      </span>
                      <span className="text-xs text-fayrouz-foam/80 font-mono">
                        {metrics.allergenSafety.unsafeCount} Shielded
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-fayrouz-foam/80 mt-2 leading-relaxed">
                    {metrics.allergenSafety.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
