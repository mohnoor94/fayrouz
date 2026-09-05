import React from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '../../context/ProfileContext'
import { soundFx } from '../../utils/soundEffects'
import { Sliders, ArrowRight, ArrowLeft, Flame, Sparkles, Coffee, Heart } from 'lucide-react'

const PALATE_ZONES = [
  {
    maxScore: 3,
    title: 'Dark, Bold & Intensely Aromatic',
    titleAr: 'داكنة، قوية وغنية بالكريما',
    notes: ['Cacao Nibs', 'Dense Crema', 'Cedarwood & Smoke', 'Sidama Ristretto'],
    bgTint: 'from-[#0c0908] via-[#1a110d] to-[#120a07]',
    accentColor: 'text-fayrouz-amber border-fayrouz-amber/40 bg-fayrouz-amber/15',
    icon: Coffee
  },
  {
    maxScore: 7,
    title: 'Balanced, Nuanced & Floral',
    titleAr: 'متوازنة، زهرية ومخملية القوام',
    notes: ['Bergamot Blossom', 'White Peach', 'Silky Microfoam', 'Panama Geisha'],
    bgTint: 'from-[#17110e] via-[#241a15] to-[#1a130f]',
    accentColor: 'text-fayrouz-gold border-fayrouz-gold/40 bg-fayrouz-gold/15',
    icon: Sparkles
  },
  {
    maxScore: 10,
    title: 'Sweet, Velvet & Comforting',
    titleAr: 'حلوة، مخملية ومترفة بالكراميل',
    notes: ['Dulce de Leche', 'Medjool Date Caramel', 'Ceylon Cinnamon', 'Spanish Velvet'],
    bgTint: 'from-[#231a15] via-[#2f2017] to-[#1e140f]',
    accentColor: 'text-fayrouz-rose border-fayrouz-rose/40 bg-fayrouz-rose/15',
    icon: Heart
  }
]

export default function PalateStep({ onNext, onPrev }) {
  const { userProfile, setPalateScore } = useProfile()
  const score = Number(userProfile.palateScore) || 5

  const currentZone = score <= 3 ? PALATE_ZONES[0] : (score <= 7 ? PALATE_ZONES[1] : PALATE_ZONES[2])
  const ZoneIcon = currentZone.icon

  const handleSliderChange = (e) => {
    const val = Number(e.target.value)
    if (val !== score) {
      soundFx.playTap()
      setPalateScore(val)
    }
  }

  const handleContinue = () => {
    soundFx.playStepChime()
    onNext()
  }

  return (
    <div className={`flex flex-col justify-between h-full px-5 py-4 bg-gradient-to-b ${currentZone.bgTint} transition-colors duration-500 rounded-b-[40px]`}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-fayrouz-surface border border-fayrouz-border flex items-center justify-center text-fayrouz-amber mb-2 shadow-card-depth">
            <Sliders className="w-6 h-6" />
          </div>
          <span className="font-arabic text-sm text-fayrouz-amber">
            ميزان الذوق والنكهات الحرفية
          </span>
          <h2 className="text-xl font-serif font-bold text-fayrouz-cream mt-0.5">
            How do you like your brew?
          </h2>
          <p className="text-xs text-fayrouz-foam/70 mt-1 max-w-xs">
            Slide from intense roasted black coffee to sweet dessert milk comfort.
          </p>
        </div>

        {/* Sensory Dial Visualizer */}
        <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-fayrouz-surface/70 border border-fayrouz-border/80 shadow-card-depth relative overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-mono uppercase text-fayrouz-muted tracking-wider">
              Palate Metric
            </span>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${currentZone.accentColor}`}>
              Score: {score} / 10
            </div>
          </div>

          {/* Large dynamic score icon */}
          <motion.div 
            key={currentZone.title}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-fayrouz-espresso border border-fayrouz-border flex items-center justify-center text-fayrouz-amber shadow-amber-glow"
          >
            <ZoneIcon className="w-8 h-8" />
          </motion.div>

          <div className="text-center">
            <h3 className="text-base font-serif font-bold text-fayrouz-cream">
              {currentZone.title}
            </h3>
            <div className="font-arabic text-xs text-fayrouz-amber mt-0.5">
              {currentZone.titleAr}
            </div>
          </div>

          {/* Tasting Note Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-1">
            {currentZone.notes.map((note) => (
              <span 
                key={note}
                className="text-[10px] px-2.5 py-1 rounded-full bg-fayrouz-obsidian/80 text-fayrouz-foam/90 border border-fayrouz-border/70"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Slider Element */}
          <div className="w-full flex flex-col gap-2 mt-2 pt-2 border-t border-fayrouz-border/60">
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={score}
              onChange={handleSliderChange}
              className="w-full accent-fayrouz-amber h-3 bg-fayrouz-obsidian rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] font-mono text-fayrouz-muted">
              <span>1 (Bold / Dark)</span>
              <span>5 (Balanced)</span>
              <span>10 (Sweet Dessert)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
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
          <span>Continue to Temperature</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
