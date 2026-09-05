import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import InitialStateMenu from './InitialStateMenu'
import DynamicCuratedMenu from './DynamicCuratedMenu'
import OrderTraySidebar from './OrderTraySidebar'
import NfcSyncOverlay from './NfcSyncOverlay'
import WizardContainer from '../wizard/WizardContainer'
import { 
  Coffee, 
  Radio, 
  Volume2, 
  VolumeX, 
  Music, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Check, 
  ShieldCheck 
} from 'lucide-react'

export default function KioskContainer() {
  const { 
    isNfcSynced, 
    resetNfcSync, 
    triggerNfcSync, 
    userProfile, 
    addToOrderTray,
    isKioskWizardOpen,
    setIsKioskWizardOpen
  } = useProfile()

  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)

  const handleToggleAmbient = () => {
    const isPlaying = soundFx.toggleAmbientCafe()
    setIsAmbientPlaying(isPlaying)
  }

  // Cleanup ambient audio on unmount
  useEffect(() => {
    return () => {
      soundFx.stopAmbientCafe()
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full py-2">
      {/* iPad Pro Landscape Hardware Chassis */}
      <div className="w-full max-w-6xl h-[760px] max-h-[92vh] rounded-[38px] bg-gradient-to-b from-[#2a2420] via-[#1b1512] to-[#0c0908] p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(212,163,115,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col relative border border-[#3d2c22]">
        
        {/* Front-Facing Landscape Camera Dot */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black/90 border border-white/10 flex items-center justify-center z-40">
          <div className="w-1 h-1 rounded-full bg-fayrouz-border/50" />
        </div>

        {/* Screen Glass Inner Shell */}
        <div className="w-full h-full rounded-[30px] bg-fayrouz-obsidian flex flex-col overflow-hidden border border-fayrouz-border/50 relative shadow-inner">
          
          {/* Top Kiosk Counter Header Bar */}
          <header className="h-14 px-6 bg-fayrouz-espresso/90 border-b border-fayrouz-border/70 flex items-center justify-between z-30 flex-shrink-0 select-none">
            {/* Left: Branding & Status */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-fayrouz-surface border border-fayrouz-amber/30 flex items-center justify-center text-fayrouz-amber shadow-amber-glow">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-serif font-bold text-fayrouz-cream tracking-tight">
                    FAYROUZ SPECIALTY ROASTERS
                  </h3>
                  <span className="font-arabic text-xs text-fayrouz-amber font-normal">
                    (محمصة فيروز)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-fayrouz-muted">
                  <span>KIOSK 01 • COUNTER BAR</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    09:42 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Ambient Music & Sync Status */}
            <div className="flex items-center gap-3">
              {/* Ambient Audio Toggle (Option A) */}
              <button
                type="button"
                onClick={handleToggleAmbient}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                  isAmbientPlaying
                    ? 'bg-fayrouz-amber/20 border-fayrouz-amber/50 text-fayrouz-gold shadow-amber-glow'
                    : 'bg-fayrouz-surface/60 border-fayrouz-border text-fayrouz-muted hover:text-fayrouz-cream'
                }`}
                title="Toggle Levantine Acoustic Cafe Atmosphere"
              >
                <Music className={`w-3.5 h-3.5 ${isAmbientPlaying ? 'animate-bounce' : ''}`} />
                <span className="hidden sm:inline">
                  {isAmbientPlaying ? 'Acoustic Soundscape: ON' : 'Acoustic Cafe Sound'}
                </span>
              </button>

              {/* NFC Sync Status / Reset Button */}
              {isNfcSynced ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-fayrouz-cardamom/20 text-fayrouz-cardamom border border-fayrouz-cardamom/30 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-fayrouz-cardamom animate-pulse" />
                    <span>{userProfile.name}'s Passport Synced</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => { soundFx.playTap(); resetNfcSync(); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-xs text-fayrouz-foam transition-colors cursor-pointer"
                    title="Unsync and return to neutral catalog"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Unsync / New Guest</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { soundFx.playTap(); setIsKioskWizardOpen(true); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fayrouz-surface/70 hover:bg-fayrouz-surface border border-fayrouz-amber/40 text-fayrouz-gold text-xs font-serif transition-colors cursor-pointer"
                    title="Create your Taste Passport directly on this kiosk"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-fayrouz-gold" />
                    <span className="hidden sm:inline">New? Create Passport</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { soundFx.playNfcBeam(); triggerNfcSync(); }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs shadow-amber-glow cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Tap Phone (Simulate NFC)</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Main Workspace: Split into Menu (Left) and Order Tray (Right) */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Menu Viewport */}
            <main className="flex-1 p-5 overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                {isNfcSynced ? (
                  <motion.div
                    key="personalized-menu"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <DynamicCuratedMenu onAdd={addToOrderTray} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="neutral-menu"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <InitialStateMenu onAdd={addToOrderTray} />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Persistent Right Order Tray (Option A) */}
            <OrderTraySidebar onResetKiosk={resetNfcSync} />
          </div>

          {/* Kiosk Walk-in Onboarding Wizard Modal */}
          <AnimatePresence>
            {isKioskWizardOpen && (
              <motion.div
                key="kiosk-wizard-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3"
              >
                <div className="w-full max-w-[480px] max-h-[96%] flex flex-col relative">
                  <WizardContainer 
                    isKiosk={true} 
                    onCloseKiosk={() => {
                      setIsKioskWizardOpen(false)
                      triggerNfcSync()
                    }} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Golden Ripple Wave Overlay during NFC Handshake */}
          <NfcSyncOverlay />
        </div>
      </div>
    </div>
  )
}
