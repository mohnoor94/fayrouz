import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { BRAND_CONFIG } from '../../constants/brandConfig'
import { soundFx } from '../../utils/soundEffects'
import DrinkArtwork from '../kiosk/DrinkArtwork'
import { 
  Coffee, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Bell, 
  Sparkles, 
  Timer, 
  Flame, 
  Snowflake, 
  Layers,
  ArrowRight,
  ShieldAlert,
  RotateCcw
} from 'lucide-react'

export default function BaristaKdsView() {
  const { 
    baristaOrders, 
    markBaristaOrderReady, 
    clearBaristaOrders,
    setActiveDeviceView 
  } = useProfile()

  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'in-prep' | 'ready'

  const filteredOrders = baristaOrders.filter(order => {
    if (activeFilter === 'in-prep') return order.status === 'in-prep'
    if (activeFilter === 'ready') return order.status === 'ready'
    return true
  })

  const inPrepCount = baristaOrders.filter(o => o.status === 'in-prep').length
  const readyCount = baristaOrders.filter(o => o.status === 'ready').length

  const handleMarkReady = (ticketNumber) => {
    markBaristaOrderReady(ticketNumber)
  }

  return (
    <div className="w-full flex flex-col items-center justify-start gap-3 p-1 sm:p-3">
      {/* KDS Header Bar */}
      <div className="w-full max-w-7xl glass-card rounded-3xl p-4 sm:p-5 border border-fayrouz-border/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-fayrouz-espresso border-2 border-fayrouz-amber/50 flex items-center justify-center text-fayrouz-amber shadow-amber-glow">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-fayrouz-cream">
                {BRAND_CONFIG.name}
              </h2>
              <span className="font-arabic text-xs text-fayrouz-amber">
                ({BRAND_CONFIG.nameAr})
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-gold/40 font-bold ml-1">
                KDS BAR DISPLAY
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-fayrouz-muted mt-0.5">
              <span>ESPRESSO BAR 01</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-fayrouz-cardamom">
                <span className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-pulse" />
                Live Barista Terminal
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-fayrouz-amber" />
                Avg Prep: ~2.8m
              </span>
            </div>
          </div>
        </div>

        {/* Center: Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-fayrouz-surface/90 border border-fayrouz-border/80">
          <button
            type="button"
            onClick={() => { soundFx.playTap(); setActiveFilter('all'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-fayrouz-espresso text-fayrouz-gold border border-fayrouz-amber/40 shadow-amber-glow'
                : 'text-fayrouz-muted hover:text-fayrouz-cream'
            }`}
          >
            All Tickets ({baristaOrders.length})
          </button>

          <button
            type="button"
            onClick={() => { soundFx.playTap(); setActiveFilter('in-prep'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'in-prep'
                ? 'bg-amber-950/70 text-amber-300 border border-amber-600/50 shadow-sm'
                : 'text-fayrouz-muted hover:text-fayrouz-cream'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>In Preparation ({inPrepCount})</span>
          </button>

          <button
            type="button"
            onClick={() => { soundFx.playTap(); setActiveFilter('ready'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'ready'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/50 shadow-sm'
                : 'text-fayrouz-muted hover:text-fayrouz-cream'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready ({readyCount})</span>
          </button>
        </div>

        {/* Right: Quick View Switchers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveDeviceView('split')}
            className="px-3 py-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-xs font-serif text-fayrouz-foam flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-fayrouz-amber" />
            <span>⚡ Dual Pitch</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDeviceView('tablet')}
            className="px-3 py-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-xs font-serif text-fayrouz-foam flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <span>📟 Kiosk View</span>
          </button>
        </div>
      </div>

      {/* Ticket Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        <AnimatePresence>
          {filteredOrders.length === 0 ? (
            <div className="col-span-full py-16 text-center flex flex-col items-center justify-center gap-2 rounded-3xl glass-card border border-fayrouz-border text-fayrouz-muted">
              <CheckCircle2 className="w-10 h-10 text-fayrouz-cardamom mb-1" />
              <h4 className="text-base font-serif font-bold text-fayrouz-cream">
                All Orders Completed!
              </h4>
              <p className="text-xs text-fayrouz-foam/70">
                The barista queue is clean. New tickets transmitted from the kiosk appear here instantly.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isInPrep = order.status === 'in-prep'
              return (
                <motion.div
                  key={order.ticketNumber}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between border-2 relative overflow-hidden transition-all shadow-2xl ${
                    isInPrep 
                      ? 'bg-gradient-to-b from-[#1c1410] via-[#150f0c] to-[#0d0907] border-fayrouz-amber/50 shadow-[0_12px_35px_-10px_rgba(212,163,115,0.25)]' 
                      : 'bg-gradient-to-b from-[#0e1712] via-[#09100c] to-[#070b08] border-emerald-600/40 shadow-sm opacity-90'
                  }`}
                >
                  {/* Top Ticket Header */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-fayrouz-border/60 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-xl bg-fayrouz-surface border border-fayrouz-border text-fayrouz-gold">
                          ORDER {order.ticketNumber?.startsWith('#') ? order.ticketNumber : `#${order.ticketNumber}`}
                        </span>
                        <span className="text-[11px] font-mono text-fayrouz-muted flex items-center gap-1">
                          <Timer className="w-3 h-3 text-fayrouz-amber" />
                          {order.timestamp}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                        isInPrep 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {isInPrep ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            <span>IN PREP</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>READY</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Customer Identity & Dialect Card */}
                    <div className="p-3 rounded-2xl bg-fayrouz-surface/80 border border-fayrouz-border/70 mb-3 flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-serif font-bold text-fayrouz-cream">
                            {order.customerName}
                          </span>
                          {order.customerNameAr && (
                            <span className="font-arabic text-xs text-fayrouz-amber">
                              ({order.customerNameAr})
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-fayrouz-gold font-bold mt-0.5 truncate">
                          {order.dialectCode ? `${order.dialectCode} • ${order.dialectTitle}` : 'Universal Guest'}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-fayrouz-obsidian border border-fayrouz-border text-fayrouz-foam/70">
                        Counter
                      </span>
                    </div>

                    {/* Companion Allergen Safeguard Banner */}
                    {order.hasCompanionItem && (
                      <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/50 mb-3 flex items-start gap-2 text-amber-200">
                        <ShieldAlert className="w-4 h-4 text-fayrouz-gold flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col text-[11px] leading-tight">
                          <span className="font-bold text-fayrouz-gold">ALLERGEN ISOLATION PROTOCOL</span>
                          <span className="text-[10px] text-fayrouz-foam/85 mt-0.5">
                            Order contains companion allergen drink. Use designated sanitized pitcher & steam wand isolation.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Order Items Specification List */}
                    <div className="flex flex-col gap-2 mb-4">
                      {(order.items || []).map((item, idx) => {
                        const cust = item.customizations || {}
                        const effectivePrice = Number(item.effectivePrice ?? item.price ?? 0)
                        return (
                          <div 
                            key={idx}
                            className="p-2.5 rounded-2xl bg-fayrouz-obsidian/70 border border-fayrouz-border/70 flex flex-col gap-1.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-5 h-5 rounded-lg bg-fayrouz-surface border border-fayrouz-border text-xs font-mono font-bold flex items-center justify-center text-fayrouz-cream">
                                  {item.quantity || 1}x
                                </span>
                                <span className="text-xs font-serif font-bold text-fayrouz-cream truncate">
                                  {item.name}
                                </span>
                              </div>
                              <span className="text-xs font-mono font-bold text-fayrouz-gold flex-shrink-0">
                                ${(effectivePrice * (item.quantity || 1)).toFixed(2)}
                              </span>
                            </div>

                            {/* Companion tag */}
                            {item.isFriendDrink && (
                              <div className="flex items-center gap-1 text-[10px] font-mono text-amber-300 font-bold bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 w-fit">
                                <Users className="w-3 h-3 text-fayrouz-gold" />
                                <span>Companion Item ({item.unsafeReason || 'Specialty'})</span>
                              </div>
                            )}

                            {/* Recipe Craft Notes */}
                            <div className="flex flex-wrap gap-1 pt-1 border-t border-fayrouz-border/40 text-[10px] font-mono">
                              {cust.temperature === 'iced' && (
                                <span className="px-1.5 py-0.2 rounded bg-sky-950/60 text-sky-300 border border-sky-500/30">
                                  ❄️ Iced
                                </span>
                              )}
                              {cust.temperature === 'hot' && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                                  🔥 Hot
                                </span>
                              )}
                              {cust.size && (
                                <span className="px-1.5 py-0.2 rounded bg-fayrouz-surface text-fayrouz-foam/90 border border-fayrouz-border">
                                  {cust.size === 'large' ? '16 oz (Large)' : '12 oz (Reg)'}
                                </span>
                              )}
                              {cust.milk === 'oat' && (
                                <span className="px-1.5 py-0.2 rounded bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/40 font-bold">
                                  🥛 Oat Milk (Green Pitcher)
                                </span>
                              )}
                              {cust.milk === 'almond' && (
                                <span className="px-1.5 py-0.2 rounded bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-amber/40 font-bold">
                                  🥛 Almond Milk
                                </span>
                              )}
                              {cust.sweetness && (
                                <span className="px-1.5 py-0.2 rounded bg-fayrouz-surface text-fayrouz-muted border border-fayrouz-border">
                                  🍯 {cust.sweetness}% Sweet
                                </span>
                              )}
                              {cust.addOns?.map(add => (
                                <span key={add} className="px-1.5 py-0.2 rounded bg-fayrouz-amber/15 text-fayrouz-amber border border-fayrouz-amber/30">
                                  +{add}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-3 border-t border-fayrouz-border/60 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono text-fayrouz-muted">Total Paid</div>
                      <div className="text-sm font-serif font-bold text-fayrouz-gold">
                        ${(Number(order.total) || 0).toFixed(2)}
                      </div>
                    </div>

                    {isInPrep ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMarkReady(order.ticketNumber)}
                        className="py-2 px-4 rounded-xl font-serif font-bold text-xs bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian shadow-amber-glow flex items-center gap-1.5 cursor-pointer"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Mark Ready (Ring Bell)</span>
                      </motion.button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Ready at Counter</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
