import React from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { DIETARY_FLAGS } from '../../utils/personalizationEngine'
import { soundFx } from '../../utils/soundEffects'
import { ShieldCheck, Check, ArrowRight, ArrowLeft, Leaf, Milk, AlertOctagon, Sparkles } from 'lucide-react'

const DIETARY_OPTIONS = [
  {
    id: DIETARY_FLAGS.NUT_FREE,
    label: 'Nut Allergy Protocol',
    labelAr: 'حساسية المكسرات',
    desc: 'Flags Aleppo pistachio, walnut & cashew drinks as unsafe',
    icon: AlertOctagon,
    badgeColor: 'text-red-400 bg-red-950/40 border-red-800/40'
  },
  {
    id: DIETARY_FLAGS.VEGAN,
    label: '100% Plant-Based / Vegan',
    labelAr: 'نباتي بالكامل',
    desc: 'Excludes animal products; auto-swaps dairy to Oat Milk',
    icon: Leaf,
    badgeColor: 'text-fayrouz-cardamom bg-fayrouz-cardamom/20 border-fayrouz-cardamom/30'
  },
  {
    id: DIETARY_FLAGS.LACTOSE_FREE,
    label: 'Lactose-Free / Intolerant',
    labelAr: 'خالٍ من اللاكتوز',
    desc: 'Auto-swaps dairy drinks to velvety Oat Milk (+$0.50)',
    icon: Milk,
    badgeColor: 'text-fayrouz-gold bg-fayrouz-gold/20 border-fayrouz-gold/30'
  }
]

export default function DietaryStep({ onNext, onPrev }) {
  const { userProfile, updateProfile } = useProfile()
  const dietary = userProfile.dietary || []
  const hasNoRestrictions = dietary.length === 0

  const handleToggle = (id) => {
    soundFx.playTap()
    if (dietary.includes(id)) {
      updateProfile({ dietary: dietary.filter(f => f !== id) })
    } else {
      updateProfile({ dietary: [...dietary, id] })
    }
  }

  const handleSelectNoRestrictions = () => {
    soundFx.playTap()
    updateProfile({ dietary: [] })
  }

  const handleContinue = () => {
    soundFx.playStepChime()
    onNext()
  }

  return (
    <div className="flex flex-col justify-between h-full px-5 py-4">
      <div className="flex flex-col gap-4">
        {/* Step Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center text-fayrouz-amber mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="font-arabic text-sm text-fayrouz-amber">
            نحترم حساسياتك وخياراتك الغذائية
          </span>
          <h2 className="text-xl font-serif font-bold text-fayrouz-cream mt-0.5">
            Any strict rules we must honor?
          </h2>
          <p className="text-xs text-fayrouz-foam/70 mt-1 max-w-xs">
            We adapt recipes or safely flag allergens before you step up to the counter.
          </p>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5 mt-1">
          {/* No restrictions chip */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleSelectNoRestrictions}
            className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
              hasNoRestrictions
                ? 'bg-fayrouz-surface border-fayrouz-gold shadow-amber-glow text-fayrouz-cream'
                : 'bg-fayrouz-espresso/80 border-fayrouz-border/80 text-fayrouz-muted hover:border-fayrouz-border'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                hasNoRestrictions ? 'bg-fayrouz-gold/20 border-fayrouz-gold/40 text-fayrouz-gold' : 'border-fayrouz-border text-fayrouz-muted'
              }`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-bold">✨ No Restrictions</span>
                  <span className="font-arabic text-[11px] text-fayrouz-amber font-normal">بلا قيود</span>
                </div>
                <div className="text-[10px] text-fayrouz-muted mt-0.5">Free to explore all 25 specialty drinks</div>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
              hasNoRestrictions ? 'bg-fayrouz-gold text-fayrouz-obsidian border-fayrouz-gold' : 'border-fayrouz-border'
            }`}>
              {hasNoRestrictions && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </motion.button>

          {/* Individual Restrictions */}
          {DIETARY_OPTIONS.map((opt) => {
            const isSelected = dietary.includes(opt.id)
            const Icon = opt.icon
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleToggle(opt.id)}
                className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-fayrouz-surface border-fayrouz-amber shadow-amber-glow text-fayrouz-cream'
                    : 'bg-fayrouz-espresso/80 border-fayrouz-border/80 text-fayrouz-muted hover:border-fayrouz-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    isSelected ? opt.badgeColor : 'border-fayrouz-border text-fayrouz-muted'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif font-bold text-fayrouz-cream">{opt.label}</span>
                      <span className="font-arabic text-[11px] text-fayrouz-amber font-normal">({opt.labelAr})</span>
                    </div>
                    <div className="text-[10px] text-fayrouz-muted mt-0.5">{opt.desc}</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                  isSelected ? 'bg-fayrouz-amber text-fayrouz-obsidian border-fayrouz-amber' : 'border-fayrouz-border'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Dynamic Safety Reassurance Note */}
        <div className="p-3 rounded-2xl bg-fayrouz-surface/60 border border-fayrouz-border/80 text-[11px] text-fayrouz-foam/90 leading-relaxed">
          {dietary.includes(DIETARY_FLAGS.NUT_FREE) ? (
            <span className="text-red-300">
              🛡️ <strong>Nut Allergy Active:</strong> All drinks containing pistachio, walnut, or cashew will be dimmed & protected with clear warning badges.
            </span>
          ) : dietary.includes(DIETARY_FLAGS.VEGAN) ? (
            <span className="text-fayrouz-cardamom">
              🌱 <strong>Vegan Protocol:</strong> Milk drinks will automatically swap to Oat Milk. Non-vegan ingredients (honey) will be flagged.
            </span>
          ) : (
            <span className="text-fayrouz-foam/80">
              ✨ <strong>Tailored Hospitality:</strong> Your preferences will be encrypted into your digital coffee passport.
            </span>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="pt-4 border-t border-fayrouz-border/60 flex items-center gap-3">
        <button
          type="button"
          onClick={() => { soundFx.playTap(); onPrev(); }}
          className="p-3 rounded-2xl bg-fayrouz-surface border border-fayrouz-border text-fayrouz-foam hover:text-fayrouz-cream transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="flex-1 py-3.5 rounded-2xl font-serif font-bold text-sm bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian flex items-center justify-center gap-2 shadow-amber-glow cursor-pointer"
        >
          <span>Continue to Palate Dial</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
