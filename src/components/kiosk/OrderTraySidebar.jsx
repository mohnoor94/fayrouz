import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { calculateOrderTotals, generateOrderTicketNumber } from '../../utils/kioskHelpers'
import { soundFx } from '../../utils/soundEffects'
import DrinkArtwork from './DrinkArtwork'
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Coffee, 
  RotateCcw,
  Clock
} from 'lucide-react'

export default function OrderTraySidebar({ onResetKiosk }) {
  const { 
    orderTray, 
    addToOrderTray, 
    removeFromOrderTray, 
    clearOrderTray,
    userProfile 
  } = useProfile()

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [ticketNumber, setTicketNumber] = useState('')

  const { subtotal, tax, total, itemCount } = calculateOrderTotals(orderTray)

  const handleSendToBarista = () => {
    if (orderTray.length === 0) return
    soundFx.playPassportReveal()
    setTicketNumber(generateOrderTicketNumber())
    setShowConfirmation(true)
  }

  const handleStartNewOrder = () => {
    soundFx.playTap()
    clearOrderTray()
    setShowConfirmation(false)
    onResetKiosk?.()
  }

  return (
    <aside className="w-[270px] lg:w-[290px] h-full bg-fayrouz-espresso/90 border-l border-fayrouz-border/80 flex flex-col justify-between p-4 flex-shrink-0 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
      {/* Sidebar Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-fayrouz-border/70 mb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-fayrouz-amber" />
            <h4 className="text-sm font-serif font-bold text-fayrouz-cream">
              Order Tray
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-fayrouz-amber/20 text-fayrouz-gold font-bold">
            {itemCount} {itemCount === 1 ? 'drink' : 'drinks'}
          </span>
        </div>

        {/* Guest Identifier */}
        <div className="p-2.5 rounded-xl bg-fayrouz-surface/60 border border-fayrouz-border/60 mb-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-fayrouz-muted uppercase">Ordering For</span>
            <span className="text-xs font-serif font-bold text-fayrouz-cream">
              {userProfile.name || 'Specialty Guest'}
            </span>
          </div>
          <span className="font-arabic text-xs text-fayrouz-amber">
            طاولة البار
          </span>
        </div>

        {/* Item List with complete, un-truncated order details */}
        <div className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1">
          {orderTray.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center text-fayrouz-muted">
              <Coffee className="w-8 h-8 stroke-1 text-fayrouz-border mb-2" />
              <p className="text-xs text-fayrouz-foam/60">Your order tray is empty.</p>
              <p className="text-[10px] text-fayrouz-muted mt-0.5">Tap "Add" on any curated cup to begin.</p>
            </div>
          ) : (
            orderTray.map((item) => {
              const effectivePrice = item.effectivePrice ?? item.price
              const cust = item.customizations || {}
              const isLarge = cust.size === 'large'
              const isIced = cust.temperature === 'iced' || (!cust.temperature && item.defaultTemperature === 'iced')
              const isHot = cust.temperature === 'hot' || (!cust.temperature && item.defaultTemperature === 'hot')
              const milk = cust.milk
              const sweetness = cust.sweetness
              const addOns = cust.addOns || []

              return (
                <div 
                  key={item.id}
                  className="p-3 rounded-2xl bg-fayrouz-surface/80 border border-fayrouz-border/80 flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-start gap-2.5">
                    {/* Drink Artwork Vessel Thumbnail */}
                    <div className="w-11 h-11 rounded-xl bg-fayrouz-obsidian border border-fayrouz-border/70 flex items-center justify-center flex-shrink-0 p-0.5 overflow-hidden shadow-inner mt-0.5">
                      <DrinkArtwork item={item} size="sm" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Full Drink Title & Price - Absolutely No Truncation */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-serif font-bold text-fayrouz-cream leading-snug break-words">
                            {item.name}
                          </span>
                          {item.nameAr && (
                            <span className="font-arabic text-[11px] text-fayrouz-amber/80 leading-tight">
                              {item.nameAr}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-serif font-bold text-fayrouz-gold flex-shrink-0 whitespace-nowrap">
                          ${(effectivePrice * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Full Specifications Badges: Temperature, Size, Milk, Sweetness, Add-Ons */}
                      <div className="flex flex-wrap items-center gap-1 mt-1.5">
                        {/* Temperature */}
                        {isIced && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-950/60 border border-sky-400/40 text-sky-300">
                            ❄️ Iced
                          </span>
                        )}
                        {isHot && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/60 border border-fayrouz-amber/40 text-fayrouz-amber">
                            🔥 Hot
                          </span>
                        )}

                        {/* Cup Size */}
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-obsidian border border-fayrouz-border text-fayrouz-foam/90">
                          {isLarge ? '16 oz (Large)' : '12 oz (Reg)'}
                        </span>

                        {/* Milk Choice */}
                        {milk === 'oat' && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-cardamom/20 border border-fayrouz-cardamom/40 text-fayrouz-cardamom font-medium">
                            🥛 Oat Milk (+ $0.50)
                          </span>
                        )}
                        {milk === 'almond' && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-amber/20 border border-fayrouz-amber/40 text-fayrouz-gold font-medium">
                            🥛 Almond Milk (+ $0.50)
                          </span>
                        )}
                        {milk === 'whole' && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-obsidian border border-fayrouz-border text-fayrouz-muted">
                            🥛 Whole Milk
                          </span>
                        )}
                        {!milk && item.isAdapted && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-cardamom/20 border border-fayrouz-cardamom/40 text-fayrouz-cardamom font-medium">
                            🥛 Oat Milk (Safe)
                          </span>
                        )}

                        {/* Sweetness */}
                        {sweetness && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-obsidian border border-fayrouz-border text-fayrouz-foam/80">
                            🍯 {sweetness === '0' ? '0% Sweet' : sweetness === '25' ? '25% Subtle' : sweetness === '50' ? '50% Balanced' : '100% Sweet'}
                          </span>
                        )}

                        {/* Craft Add-Ons */}
                        {addOns.map((addon) => {
                          const label = 
                            addon === 'cardamom' ? '🌿 Cardamom' :
                            addon === 'extra-shot' ? '⚡ Extra Shot (+ $1)' :
                            addon === 'rosewater' ? '🌹 Rose Mist (+ $0.50)' :
                            addon === 'tahini' ? '✨ Tahini (+ $0.50)' : addon
                          return (
                            <span key={addon} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-obsidian border border-fayrouz-border text-fayrouz-amber">
                              {label}
                            </span>
                          )
                        })}

                        {/* "Your Usual" Reorder Tag */}
                        {item.customizedName?.includes('Usual') && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fayrouz-gold/20 border border-fayrouz-gold/40 text-fayrouz-gold font-bold">
                            ⭐ Usual
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity adjustment & Unit Pricing */}
                  <div className="flex items-center justify-between pt-2 border-t border-fayrouz-border/50 text-xs">
                    <span className="text-[10px] font-mono text-fayrouz-muted">
                      ${effectivePrice.toFixed(2)} ea
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromOrderTray(item.id)}
                        className="w-5 h-5 rounded-md bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
                        title={item.quantity === 1 ? 'Remove from tray' : 'Decrease quantity'}
                      >
                        {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3" />}
                      </button>
                      <span className="text-xs font-mono font-bold text-fayrouz-cream w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToOrderTray(item)}
                        className="w-5 h-5 rounded-md bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center text-fayrouz-muted hover:text-fayrouz-cream transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Financial Summary & Order Action */}
      <div className="pt-3 border-t border-fayrouz-border/70 flex flex-col gap-2.5">
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center justify-between text-fayrouz-muted text-[11px]">
            <span>Subtotal</span>
            <span className="font-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-fayrouz-muted text-[11px]">
            <span>Specialty Tax (8%)</span>
            <span className="font-mono">${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm font-serif font-bold text-fayrouz-cream pt-1.5 border-t border-fayrouz-border/60">
            <span>Total</span>
            <span className="font-serif text-base text-fayrouz-gold">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={orderTray.length > 0 ? { scale: 1.02 } : {}}
          whileTap={orderTray.length > 0 ? { scale: 0.98 } : {}}
          onClick={handleSendToBarista}
          disabled={orderTray.length === 0}
          className={`w-full py-3 rounded-2xl font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-amber-glow transition-all ${
            orderTray.length > 0
              ? 'bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian cursor-pointer'
              : 'bg-fayrouz-surface text-fayrouz-muted cursor-not-allowed border border-fayrouz-border'
          }`}
        >
          <span>Send Order to Barista</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Celebratory Barista Confirmation Modal (Option A) */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full glass-card rounded-3xl p-6 border-2 border-fayrouz-amber/40 shadow-amber-glow flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-fayrouz-cardamom/20 border border-fayrouz-cardamom/40 flex items-center justify-center text-fayrouz-cardamom mb-3 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-fayrouz-amber/20 text-fayrouz-gold border border-fayrouz-gold/30 text-xs font-mono font-bold mb-2">
                <span>ORDER {ticketNumber}</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-gold-gradient">
                Order Sent to Barista Noor!
              </h3>
              <span className="font-arabic text-sm text-fayrouz-amber mt-0.5">
                طلبك قيد التحضير بعناية فائقة
              </span>

              <p className="text-xs text-fayrouz-foam/80 mt-2 max-w-xs">
                Your customized brew profile and dietary safeguards have been transmitted to the bar espresso machine.
              </p>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-fayrouz-surface/70 border border-fayrouz-border mt-4 text-xs text-fayrouz-foam">
                <Clock className="w-4 h-4 text-fayrouz-amber" />
                <span>Estimated Prep Time: <strong>~3 minutes</strong></span>
              </div>

              {/* Action Button: Manual Reset to control pitch pacing */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartNewOrder}
                className="w-full py-3.5 rounded-2xl font-serif font-bold text-sm bg-gradient-to-r from-fayrouz-amber to-fayrouz-gold text-fayrouz-obsidian mt-6 shadow-amber-glow cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New Guest Order</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}
