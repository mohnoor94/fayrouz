import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import WizardContainer from '../wizard/WizardContainer'
import KioskContainer from '../kiosk/KioskContainer'
import NfcBeamBridge from './NfcBeamBridge'
import { Smartphone, Tablet, Sparkles, MoveHorizontal } from 'lucide-react'

export default function DualDeviceCanvas() {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [containerWidth, setContainerWidth] = useState(1500)

  // Smart Auto-Scale Engine: Dynamically calculates scale factor to fit any laptop display
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth || window.innerWidth
      setContainerWidth(width)

      // 1460px is the optimal native side-by-side footprint (380px phone + 100px bridge + 980px tablet)
      if (width < 1460 && width >= 640) {
        const calculatedScale = Math.min(1, Math.max(0.62, (width - 40) / 1460))
        setScale(calculatedScale)
      } else {
        setScale(1)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const baseHeight = 820
  const scaledHeight = Math.round(baseHeight * scale)

  return (
    <div 
      ref={containerRef} 
      className="w-full flex flex-col items-center justify-start relative overflow-hidden py-2"
      style={{ minHeight: `${scaledHeight + 40}px` }}
    >
      {/* Device Labels Sub-header */}
      <div className="w-full max-w-7xl flex items-center justify-between px-6 pb-2 text-[11px] font-mono text-fayrouz-muted select-none">
        <div className="flex items-center gap-2">
          <Smartphone className="w-3.5 h-3.5 text-fayrouz-amber" />
          <span className="text-fayrouz-foam/80 font-medium">GUEST MOBILE PASS</span>
          <span className="text-fayrouz-muted hidden sm:inline">• iPhone 16 Pro Simulator</span>
        </div>

        <div className="flex items-center gap-2 text-fayrouz-amber/80">
          <Sparkles className="w-3 h-3" />
          <span className="hidden md:inline">Synchronized Live Pitch Mode</span>
        </div>

        <div className="flex items-center gap-2">
          <Tablet className="w-3.5 h-3.5 text-fayrouz-gold" />
          <span className="text-fayrouz-foam/80 font-medium">COUNTER ORDERING KIOSK</span>
          <span className="text-fayrouz-muted hidden sm:inline">• iPad Pro Simulator</span>
        </div>
      </div>

      {/* Auto-Scaled Canvas Viewport */}
      <div 
        className="flex items-start justify-center transition-transform duration-200 ease-out origin-top"
        style={{
          transform: `scale(${scale})`,
          width: '1460px',
          height: `${baseHeight}px`
        }}
      >
        {/* Left Column: iPhone 16 Pro Simulator */}
        <div className="w-[390px] flex-shrink-0 flex justify-center">
          <div className="w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,163,115,0.15)] rounded-[44px]">
            <WizardContainer isKiosk={false} />
          </div>
        </div>

        {/* Center Column: Animated NFC Beam Bridge */}
        <div className="w-[90px] flex-shrink-0 flex items-center justify-center pt-52">
          <NfcBeamBridge />
        </div>

        {/* Right Column: iPad Pro Counter Kiosk */}
        <div className="w-[980px] flex-shrink-0 flex justify-center">
          <div className="w-full shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(212,163,115,0.12)] rounded-[38px]">
            <KioskContainer />
          </div>
        </div>
      </div>

      {/* Mobile viewport fallback note for narrow screens (<640px) */}
      <div className="sm:hidden text-center text-xs text-fayrouz-muted font-mono mt-3 flex items-center justify-center gap-1.5">
        <MoveHorizontal className="w-3.5 h-3.5 text-fayrouz-amber" />
        <span>For best pitch experience, view on desktop or landscape tablet</span>
      </div>
    </div>
  )
}
