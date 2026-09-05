import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { soundFx } from '../../utils/soundEffects'
import { useProfile } from '../../context/ProfileContext'
import { DIALECT_REGISTRY, HOUSES } from '../../utils/coffeeDialects'
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  Flame, 
  Sun, 
  Droplet, 
  Cloud, 
  Clock, 
  Zap
} from 'lucide-react'

const QUIZ_QUESTIONS = [
  {
    step: 1,
    axisName: 'Philosophy',
    axisNameAr: 'فلسفة النكهة والمصدر',
    prompt: 'How do you view your ideal cup of coffee?',
    promptAr: 'كيف تنظر إلى فنجان القهوة المثالي بالنسبة لك؟',
    options: [
      {
        letter: 'T',
        title: 'Terroir Purity',
        titleAr: 'نقاء الأرض والمصدر الواحد',
        symbol: '🏛️',
        icon: Compass,
        desc: 'Unmasked single-origin clarity, high-altitude volcanic soils, botanical tea-like notes.',
        descAr: 'النقاء المطلق للمصدر الواحد، محاصيل المرتفعات العالية، واكتشاف إيحاءات البن الأصلية الصافية.'
      },
      {
        letter: 'A',
        title: 'Alchemy & Heritage',
        titleAr: 'كيمياء الحرفة والتراث',
        symbol: '🌿',
        icon: Flame,
        desc: 'Levantine spices, green cardamom, Damascus rose, and artisan roaster blend alchemy.',
        descAr: 'كيمياء الحرفة الشامية، التوابل العطرية، الهيل الأخضر، وخلطات المحمصة التوقيعية المبتكرة.'
      }
    ]
  },
  {
    step: 2,
    axisName: 'Frequency',
    axisNameAr: 'تردد التحميص والحمضية',
    prompt: 'What roast tone speaks to your morning frequency?',
    promptAr: 'ما هو تردد التحميص الأقرب لذائقتك ومزاجك؟',
    options: [
      {
        letter: 'L',
        title: 'Luminous Radiance',
        titleAr: 'إشراق زهري وحمضي',
        symbol: '☀️',
        icon: Sun,
        desc: 'Bright sparkling citric acidity, bergamot, floral jasmine, and crisp light-roast luminosity.',
        descAr: 'حمضية مشرقة منعشة، نفحات البرغموت والياسمين، وتحميص خفيف بوضوح شاي الأعشاب الفاخر.'
      },
      {
        letter: 'D',
        title: 'Deep Roast Resonance',
        titleAr: 'عمق التحميص والشوكولاتة',
        symbol: '🍫',
        icon: Flame,
        desc: 'Dark cacao, toasted hazelnuts, smoked molasses, heavy viscous crema, and rich body.',
        descAr: 'كاكاو داكن، مكسرات محمصة، قوام كثيف ومخملي، وعمق تحميص كلاسيكي دافئ وجريء.'
      }
    ]
  },
  {
    step: 3,
    axisName: 'Texture',
    axisNameAr: 'الملمس والكثافة الحريرية',
    prompt: 'How do you prefer the texture against your palate?',
    promptAr: 'كيف تفضل ملمس القهوة وانسكابها على لسانك؟',
    options: [
      {
        letter: 'N',
        title: 'Naked Purism',
        titleAr: 'نقاء القهوة السوداء الصافية',
        symbol: '💧',
        icon: Droplet,
        desc: 'Crystal-clear black pour-over, delicate V60 extraction, zero dairy or plant milks.',
        descAr: 'استخلاص أسود نقي 100%، ترشيح مقطر صافٍ، وفنجان معتق خالٍ تماماً من أي حليب.'
      },
      {
        letter: 'S',
        title: 'Velvety Silk',
        titleAr: 'مخمل الحرير والمايكروفوم',
        symbol: '☁️',
        icon: Cloud,
        desc: 'Textured oat microfoam, silky micro-bubbles, flat white softness, and comforting warmth.',
        descAr: 'رغوة مايكروفوم حريرية، حليب شوفان كريمي دافئ، وتناغم سلس يغمر الحواس.'
      }
    ]
  },
  {
    step: 4,
    axisName: 'Rhythm',
    axisNameAr: 'إيقاع الارتشاف والطقوس',
    prompt: 'What rhythm defines your coffee session?',
    promptAr: 'ما هو الإيقاع الزمني الذي يلازم جلستك مع القهوة؟',
    options: [
      {
        letter: 'R',
        title: 'Zen Ritual',
        titleAr: 'طقس التروّي والتأمل',
        symbol: '⏳',
        icon: Clock,
        desc: 'Slow ceremonial hand-pour, steaming ceramic cup, quiet 15-minute contemplative pause.',
        descAr: 'طقس هادئ متأنٍ، كوب سيراميك ساخن، ووقفة تأملية تأخذ وقتها دون أي استعجال.'
      },
      {
        letter: 'V',
        title: 'Kinetic Velocity',
        titleAr: 'سرعة الإيقاع والنشاط',
        symbol: '⚡',
        icon: Zap,
        desc: 'High-output workflow, rapid double espresso, chilled shakerato, seamless forward momentum.',
        descAr: 'إيقاع سريع ومنجز، جرعة إسبريسو مركزة، مشروب مثلج منعش، وانطلاقة فورية.'
      }
    ]
  }
]

export default function DialectCalibrationQuizModal({
  isOpen,
  onClose,
  onComplete
}) {
  const { updateProfile } = useProfile()
  const [currentStep, setCurrentStep] = useState(0) // 0 to 3
  const [selectedAxes, setSelectedAxes] = useState({
    0: 'T',
    1: 'L',
    2: 'N',
    3: 'R'
  })

  if (!isOpen) return null

  const currentQ = QUIZ_QUESTIONS[currentStep]

  // Construct current code preview
  const previewCode = `${selectedAxes[0] || '?'}${selectedAxes[1] || '?'}${selectedAxes[2] || '?'}${selectedAxes[3] || '?'}`
  const resolvedDialect = DIALECT_REGISTRY[previewCode]
  const resolvedHouse = resolvedDialect ? HOUSES[resolvedDialect.house] : null

  const handleSelectOption = (letter) => {
    soundFx.playTap()
    setSelectedAxes(prev => ({
      ...prev,
      [currentStep]: letter
    }))

    if (currentStep < 3) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 180)
    }
  }

  const handleSelectPolyglot = () => {
    soundFx.playCelebration()
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#d4a373', '#e9c46a', '#ffffff']
    })

    updateProfile({
      dialectCode: 'POLY',
      isPolyglot: true,
      fluidityScore: 96
    })

    onComplete?.('POLY')
    onClose?.()
  }

  const handleFinish = () => {
    const finalCode = `${selectedAxes[0]}${selectedAxes[1]}${selectedAxes[2]}${selectedAxes[3]}`
    soundFx.playCelebration()
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4a373', '#e9c46a', '#b87333', '#fefae0']
    })

    updateProfile({
      dialectCode: finalCode,
      isPolyglot: false
    })

    onComplete?.(finalCode)
    onClose?.()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.93, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.93, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl max-h-[94vh] bg-gradient-to-b from-[#241913] via-[#1a120e] to-[#0d0907] border-2 border-fayrouz-gold/60 rounded-[36px] shadow-[0_25px_70px_-15px_rgba(233,196,106,0.3)] flex flex-col justify-between overflow-hidden relative"
        >
          {/* Subtle Ambient Radial Light */}
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-fayrouz-gold/15 blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="p-5 sm:p-6 pb-3 border-b border-fayrouz-border/60 flex items-start justify-between gap-4 flex-shrink-0 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-fayrouz-amber font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-fayrouz-gold animate-pulse" />
                  THE 16 DIALECTS™ • 30-SECOND SENSORY CALIBRATION
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-fayrouz-cream">
                Discover Your Coffee Archetype
              </h2>
              <div className="font-arabic text-xs text-fayrouz-amber">
                معايرة لهجة الذائقة — في 4 ضغطات بسيطة
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border flex items-center justify-center text-fayrouz-muted hover:text-fayrouz-cream transition-colors flex-shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Real-Time Acronym Preview Banner */}
          <div className="px-5 sm:px-6 py-2.5 bg-fayrouz-obsidian/70 border-b border-fayrouz-border/40 flex items-center justify-between gap-3 relative z-10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-fayrouz-muted uppercase tracking-wider">
                Live Coordinates:
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                {[0, 1, 2, 3].map(idx => (
                  <span
                    key={idx}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                      idx === currentStep
                        ? 'bg-fayrouz-gold/20 border-fayrouz-gold text-fayrouz-gold shadow-amber-glow scale-105'
                        : selectedAxes[idx]
                          ? 'bg-fayrouz-surface border-fayrouz-border text-fayrouz-cream'
                          : 'bg-black/30 border-fayrouz-border/30 text-fayrouz-muted/50'
                    }`}
                  >
                    {selectedAxes[idx] || '_'}
                  </span>
                ))}
              </div>
            </div>

            {resolvedDialect ? (
              <div className="text-right min-w-0">
                <span className="text-[10px] font-mono font-bold text-fayrouz-gold truncate block">
                  {resolvedHouse?.symbol} {resolvedDialect.title}
                </span>
                <span className="text-[9px] font-mono text-fayrouz-amber/80">
                  {resolvedHouse?.name}
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-mono text-fayrouz-muted">
                Step {currentStep + 1} of 4
              </span>
            )}
          </div>

          {/* Scrollable Question Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-4 relative z-10">
            {/* Step Category Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-fayrouz-gold/15 text-fayrouz-gold border border-fayrouz-gold/30 font-bold">
                  Axis 0{currentQ.step}: {currentQ.axisName}
                </span>
                <span className="font-arabic text-xs text-fayrouz-amber font-normal">
                  {currentQ.axisNameAr}
                </span>
              </div>

              <div className="text-xs font-mono text-fayrouz-muted">
                {currentStep + 1} / 4
              </div>
            </div>

            {/* Prompt */}
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-fayrouz-cream leading-snug">
                {currentQ.prompt}
              </h3>
              <p className="font-arabic text-xs text-fayrouz-amber mt-0.5">
                {currentQ.promptAr}
              </p>
            </div>

            {/* Binary Options Selection */}
            <div className="grid grid-cols-1 gap-3.5 my-auto">
              {currentQ.options.map(opt => {
                const isSelected = selectedAxes[currentStep] === opt.letter

                return (
                  <motion.button
                    key={opt.letter}
                    type="button"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleSelectOption(opt.letter)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-4 relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-r from-fayrouz-amber/25 via-fayrouz-surface to-fayrouz-surface border-fayrouz-gold shadow-amber-glow'
                        : 'bg-fayrouz-surface/60 hover:bg-fayrouz-surface border-fayrouz-border/80'
                    }`}
                  >
                    {/* Letter Acronym Badge */}
                    <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center p-1 flex-shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-fayrouz-gold text-fayrouz-obsidian border-fayrouz-gold font-black shadow-amber-glow'
                        : 'bg-fayrouz-obsidian border-fayrouz-border text-fayrouz-gold'
                    }`}>
                      <span className="text-base font-mono font-black">
                        [{opt.letter}]
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-serif font-bold text-fayrouz-cream flex items-center gap-1.5">
                          <span>{opt.symbol}</span>
                          <span>{opt.title}</span>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-fayrouz-gold text-fayrouz-obsidian flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <div className="font-arabic text-xs text-fayrouz-amber font-normal mt-0.5">
                        {opt.titleAr}
                      </div>

                      <p className="text-xs font-sans text-fayrouz-foam/80 mt-1.5 leading-relaxed">
                        {opt.desc}
                      </p>
                      <p className="font-arabic text-[11px] text-fayrouz-muted mt-1 leading-relaxed">
                        {opt.descAr}
                      </p>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Omnivorous Polyglot Shortcut Option */}
            <div className="pt-2 border-t border-fayrouz-border/50 flex items-center justify-between">
              <button
                type="button"
                onClick={handleSelectPolyglot}
                className="text-left group cursor-pointer flex items-center gap-2 p-2 rounded-xl hover:bg-purple-950/20 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-purple-300 group-hover:text-purple-200">
                    I enjoy all styles: Unlock [POLY] The Dialect Polyglot
                  </span>
                  <span className="font-arabic text-[10px] text-purple-400/80 block">
                    ذائقتي شاملة ومرنة وأعشق كل أساليب القهوة بحسب الوقت
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Modal Bottom Footer Navigation */}
          <div className="p-4 sm:p-5 border-t border-fayrouz-border/70 flex items-center justify-between relative z-10 flex-shrink-0 bg-[#120d09]">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-xl border text-xs font-serif flex items-center gap-1.5 transition-colors ${
                currentStep === 0
                  ? 'border-transparent text-fayrouz-muted/40 cursor-not-allowed'
                  : 'border-fayrouz-border text-fayrouz-cream hover:bg-fayrouz-surface cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
                className="px-5 py-2 rounded-xl bg-fayrouz-surface hover:bg-fayrouz-surface/80 border border-fayrouz-border text-xs font-serif text-fayrouz-cream flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Next Axis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fayrouz-amber via-fayrouz-gold to-fayrouz-amber text-fayrouz-obsidian font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-amber-glow cursor-pointer transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calibrate My Dialect ({previewCode})</span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
