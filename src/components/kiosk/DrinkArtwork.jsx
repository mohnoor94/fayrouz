import React from 'react'
import { motion } from 'framer-motion'

/**
 * Fayrouz (فيروز) — Drink Visualizer & Craft Vector Engine
 * 
 * Renders bespoke SVG & CSS beverage vessels with realistic liquid physics,
 * latte art, floating ice cubes, rising steam, and Levantine botanicals.
 */

// Steam animation variants
const steamVariants = {
  animate: (custom = 0) => ({
    y: [0, -12, -22],
    opacity: [0, 0.7, 0],
    x: [0, custom % 2 === 0 ? 3 : -3, custom % 2 === 0 ? -2 : 2],
    transition: {
      duration: 2.8,
      repeat: Infinity,
      delay: custom * 0.7,
      ease: 'easeInOut'
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
}

// Bubble animation variants for cold drinks
const bubbleVariants = {
  animate: (custom = 0) => ({
    y: [0, -18],
    opacity: [0.2, 0.8, 0],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      delay: custom * 0.4,
      ease: 'easeOut'
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
}

export default function DrinkArtwork({ item = {}, size = 'md', isHovered = false }) {
  const category = item.category || 'espresso-black'
  const itemId = item.id || ''
  const isIced = Boolean(item.defaultTemperature === 'iced' || item.canBeIced && !item.canBeHot)

  // Sizing tokens
  const dimensions = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36'
  }[size] || 'w-24 h-24'

  // Determine specific vessel art type
  let vesselType = 'demitasse'
  if (itemId === 'traditional-rakwa') {
    vesselType = 'copper-cezve'
  } else if (category === 'tea-botanical') {
    vesselType = 'glass-infuser'
  } else if (isIced || category === 'cold-brew' || itemId.includes('iced') || itemId.includes('cold-drip')) {
    vesselType = 'iced-tumbler'
  } else if (category === 'velvet-milk' || itemId.includes('flat-white') || itemId.includes('cortado') || itemId.includes('latte') || itemId.includes('cappuccino') || itemId.includes('macchiato')) {
    vesselType = 'latte-cup'
  } else {
    vesselType = 'demitasse'
  }

  return (
    <motion.div 
      className={`relative flex items-center justify-center select-none ${dimensions}`}
      animate={isHovered ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {/* Ambient Backlight Glow Ring */}
      <div 
        className="absolute inset-2 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: vesselType === 'iced-tumbler'
            ? 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(212,163,115,0.15) 60%, transparent 80%)'
            : vesselType === 'copper-cezve'
              ? 'radial-gradient(circle, rgba(234,88,12,0.3) 0%, rgba(212,163,115,0.2) 60%, transparent 80%)'
              : vesselType === 'glass-infuser'
                ? 'radial-gradient(circle, rgba(244,114,182,0.25) 0%, rgba(234,179,8,0.15) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(212,163,115,0.35) 0%, rgba(184,115,51,0.15) 60%, transparent 80%)'
        }}
      />

      {/* Render Specific Vessel */}
      {vesselType === 'demitasse' && <DemitasseVessel item={item} />}
      {vesselType === 'latte-cup' && <LatteCupVessel item={item} />}
      {vesselType === 'iced-tumbler' && <IcedTumblerVessel item={item} />}
      {vesselType === 'copper-cezve' && <CopperCezveVessel item={item} />}
      {vesselType === 'glass-infuser' && <GlassInfuserVessel item={item} />}
    </motion.div>
  )
}

// -------------------------------------------------------------
// Vessel 1: Demitasse Ceramic Cup (Espresso & Black)
// -------------------------------------------------------------
function DemitasseVessel({ item }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
      <defs>
        {/* Ceramic Saucer & Cup Gradients */}
        <linearGradient id="ceramicBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d2b22" />
          <stop offset="50%" stopColor="#251a14" />
          <stop offset="100%" stopColor="#150f0c" />
        </linearGradient>
        <linearGradient id="cremaLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a373" />
          <stop offset="35%" stopColor="#b87333" />
          <stop offset="70%" stopColor="#8c4a20" />
          <stop offset="100%" stopColor="#3a1b0b" />
        </linearGradient>
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4a373" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#fefae0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#b87333" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Rising Steam Wisps */}
      <motion.path
        d="M44 38 Q 41 26 45 15"
        stroke="rgba(254,250,224,0.35)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        custom={1}
        variants={steamVariants}
        animate="animate"
      />
      <motion.path
        d="M52 38 Q 56 24 50 12"
        stroke="rgba(212,163,115,0.4)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        custom={2}
        variants={steamVariants}
        animate="animate"
      />

      {/* Ceramic Saucer Base */}
      <ellipse cx="50" cy="82" rx="36" ry="7" fill="#140e0b" opacity="0.9" />
      <ellipse cx="50" cy="80" rx="34" ry="6" fill="url(#ceramicBody)" stroke="rgba(212,163,115,0.25)" strokeWidth="1" />
      <ellipse cx="50" cy="79" rx="20" ry="3" fill="#120c09" opacity="0.6" />

      {/* Cup Handle */}
      <path
        d="M 68 46 C 82 46, 82 66, 66 68"
        fill="none"
        stroke="url(#ceramicBody)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 68 47 C 80 47, 80 65, 66 67"
        fill="none"
        stroke="rgba(212,163,115,0.3)"
        strokeWidth="1.2"
      />

      {/* Demitasse Cup Body */}
      <path
        d="M 30 42 C 30 72, 38 76, 50 76 C 62 76, 70 72, 70 42 Z"
        fill="url(#ceramicBody)"
        stroke="#4a352a"
        strokeWidth="1.5"
      />

      {/* Cup Inner Rim & Liquid Surface */}
      <ellipse cx="50" cy="42" rx="20" ry="6" fill="#1b110b" />
      <ellipse cx="50" cy="43" rx="18" ry="4.8" fill="url(#cremaLiquid)" />

      {/* Espresso Tiger-Stripe Crema Swirls */}
      <ellipse cx="48" cy="43" rx="12" ry="3" fill="#b87333" opacity="0.7" />
      <circle cx="44" cy="42.5" r="2.5" fill="#fefae0" opacity="0.45" />
      <circle cx="53" cy="43.5" r="2" fill="#d4a373" opacity="0.6" />

      {/* Golden Rim Accent Line */}
      <ellipse cx="50" cy="42" rx="20" ry="6" fill="none" stroke="url(#goldRim)" strokeWidth="1" />
    </svg>
  )
}

// -------------------------------------------------------------
// Vessel 2: Wide Ceramic Cup with Artisan Latte Art (Velvet & Milk)
// -------------------------------------------------------------
function LatteCupVessel({ item }) {
  const isRose = item.id?.includes('rose')
  const isPistachio = item.id?.includes('pistachio')
  const isCaramel = item.id?.includes('caramel') || item.id?.includes('miel')

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]">
      <defs>
        <linearGradient id="latteCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#45332a" />
          <stop offset="50%" stopColor="#2c1f19" />
          <stop offset="100%" stopColor="#19110d" />
        </linearGradient>
        <linearGradient id="latteRimCrema" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b87333" />
          <stop offset="40%" stopColor="#965526" />
          <stop offset="100%" stopColor="#5a2b10" />
        </linearGradient>
        <radialGradient id="microfoamSurface" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="70%" stopColor="#f8eed6" />
          <stop offset="100%" stopColor="#d8a873" />
        </radialGradient>
      </defs>

      {/* Delicate Warm Steam */}
      <motion.path
        d="M48 34 Q 45 22 50 12"
        stroke="rgba(254,250,224,0.4)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        custom={1}
        variants={steamVariants}
        animate="animate"
      />

      {/* Saucer */}
      <ellipse cx="50" cy="80" rx="38" ry="7" fill="#120c09" opacity="0.9" />
      <ellipse cx="50" cy="78" rx="36" ry="6" fill="url(#latteCeramic)" stroke="rgba(212,163,115,0.3)" strokeWidth="1" />

      {/* Wide Rounded Cup Handle */}
      <path
        d="M 72 44 C 88 45, 88 66, 70 68"
        fill="none"
        stroke="url(#latteCeramic)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Wide Bowl Cup */}
      <path
        d="M 24 40 C 24 70, 34 76, 50 76 C 66 76, 76 70, 76 40 Z"
        fill="url(#latteCeramic)"
        stroke="#523b2f"
        strokeWidth="1.5"
      />

      {/* Inner Rim & Golden Crema Border */}
      <ellipse cx="50" cy="40" rx="26" ry="8" fill="url(#latteRimCrema)" />
      <ellipse cx="50" cy="40.5" rx="23.5" ry="6.8" fill="url(#microfoamSurface)" />

      {/* Handcrafted Vector Latte Art */}
      {isPistachio ? (
        // Aleppo Pistachio: Emerald swirl + crushed nut flecks
        <g>
          <path d="M42 41 C 46 38, 54 38, 58 41 C 54 44, 46 44, 42 41 Z" fill="#606c38" opacity="0.75" />
          <circle cx="49" cy="40.5" r="1.5" fill="#283618" />
          <circle cx="53" cy="41.5" r="1" fill="#dda15e" />
          <circle cx="46" cy="41" r="0.9" fill="#283618" />
          <circle cx="52" cy="39.5" r="0.8" fill="#606c38" />
        </g>
      ) : isRose ? (
        // Damascus Rose: Rosy blush heart swirl + petal
        <g>
          <path d="M50 43 C 44 38, 43 36, 47 36 C 50 36, 50 39, 50 39 C 50 39, 50 36, 53 36 C 57 36, 56 38, 50 43 Z" fill="#c86d63" opacity="0.85" />
          <ellipse cx="50" cy="39.5" rx="2" ry="1.2" fill="#fffdf6" />
          <circle cx="45" cy="42" r="0.8" fill="#c86d63" opacity="0.7" />
        </g>
      ) : isCaramel ? (
        // Caramel / Miel: Golden spiral rings
        <g>
          <ellipse cx="50" cy="40.5" rx="14" ry="4" fill="none" stroke="#b87333" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.8" />
          <circle cx="50" cy="40.5" r="3" fill="#e9c46a" opacity="0.7" />
        </g>
      ) : (
        // Classic Rosetta / Tulip Microfoam Art
        <g>
          <path d="M50 43.5 C 43 38.5, 42 36, 46 36 C 50 36, 50 39.5, 50 39.5 C 50 39.5, 50 36, 54 36 C 58 36, 57 38.5, 50 43.5 Z" fill="#b87333" opacity="0.8" />
          <path d="M50 42 C 45 38.5, 44 37, 47 37 C 50 37, 50 39, 50 39 C 50 39, 50 37, 53 37 C 56 37, 55 38.5, 50 42 Z" fill="#fffdf6" />
          <circle cx="50" cy="37.5" r="1.5" fill="#fffdf6" />
        </g>
      )}

      {/* Rim Specular Light Reflection */}
      <ellipse cx="50" cy="40" rx="26" ry="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
    </svg>
  )
}

// -------------------------------------------------------------
// Vessel 3: Tall Ribbed Highball Tumbler (Cold Brew & Iced)
// -------------------------------------------------------------
function IcedTumblerVessel({ item }) {
  const isRuby = item.id?.includes('cascara') || item.id?.includes('pomegranate')
  const isCitrus = item.id?.includes('citrus') || item.id?.includes('tonic')
  const isNitro = item.id?.includes('nitro')

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_22px_rgba(0,0,0,0.7)]">
      <defs>
        {/* Cold Brew Liquid Gradient */}
        <linearGradient id="coldLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isRuby ? '#9d0208' : isNitro ? '#fefae0' : '#8c4a20'} />
          <stop offset="35%" stopColor={isRuby ? '#6a040f' : '#522915'} />
          <stop offset="100%" stopColor={isRuby ? '#370617' : '#170b06'} />
        </linearGradient>
        {/* Translucent Glass Shading */}
        <linearGradient id="glassWall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
        </linearGradient>
        {/* Ice Cube Refraction */}
        <linearGradient id="iceCube" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="50%" stopColor="rgba(224,242,254,0.35)" />
          <stop offset="100%" stopColor="rgba(186,230,253,0.15)" />
        </linearGradient>
      </defs>

      {/* Floating Cold Bubbles */}
      <motion.circle cx="44" cy="65" r="1.5" fill="rgba(255,255,255,0.6)" custom={1} variants={bubbleVariants} animate="animate" />
      <motion.circle cx="56" cy="68" r="1.2" fill="rgba(255,255,255,0.5)" custom={2} variants={bubbleVariants} animate="animate" />
      <motion.circle cx="50" cy="58" r="1.8" fill="rgba(255,255,255,0.7)" custom={3} variants={bubbleVariants} animate="animate" />

      {/* Glass Shadow */}
      <ellipse cx="50" cy="88" rx="20" ry="4" fill="#0b0806" opacity="0.8" />

      {/* Back Glass Wall & Liquid Core */}
      <path
        d="M 33 24 L 37 84 C 37 86, 42 87, 50 87 C 58 87, 63 86, 63 84 L 67 24 Z"
        fill="url(#coldLiquid)"
      />

      {/* Nitro Foam Head if Nitro Cloud */}
      {isNitro && (
        <ellipse cx="50" cy="30" rx="16" ry="4.5" fill="#fefae0" opacity="0.9" />
      )}

      {/* Floating 3D Geometric Ice Cubes */}
      <g opacity="0.9">
        {/* Ice Cube 1 */}
        <rect x="40" y="34" width="13" height="13" rx="2.5" fill="url(#iceCube)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.8" transform="rotate(-12 46 40)" />
        {/* Ice Cube 2 */}
        <rect x="49" y="44" width="12" height="12" rx="2.5" fill="url(#iceCube)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" transform="rotate(18 55 50)" />
        {/* Ice Cube 3 */}
        <rect x="38" y="55" width="11" height="11" rx="2" fill="url(#iceCube)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" transform="rotate(8 43 60)" />
      </g>

      {/* Garnish on Rim: Citrus Slice or Mint Sprig */}
      {isCitrus ? (
        // Dehydrated Blood Orange Wheel on Rim
        <g transform="translate(62, 14) rotate(22)">
          <circle cx="6" cy="6" r="8" fill="#e76f51" stroke="#f4a261" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="6" fill="#c86d63" />
          <line x1="6" y1="0" x2="6" y2="12" stroke="#f4a261" strokeWidth="0.9" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="#f4a261" strokeWidth="0.9" />
          <circle cx="6" cy="6" r="1.5" fill="#fefae0" />
        </g>
      ) : (
        // Mint Sprig Garnish
        <g transform="translate(32, 16) rotate(-15)">
          <path d="M 0 8 Q 8 0 12 4 Q 4 12 0 8 Z" fill="#588157" stroke="#344e41" strokeWidth="0.6" />
          <path d="M 4 8 Q 12 6 15 12 Q 8 14 4 8 Z" fill="#6b9080" opacity="0.85" />
        </g>
      )}

      {/* Glass Exterior Body & Vertical Fluted Ribs */}
      <path
        d="M 32 22 L 36 84 C 36 86.5, 42 88, 50 88 C 58 88, 64 86.5, 64 84 L 68 22 Z"
        fill="url(#glassWall)"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.2"
      />

      {/* Fluted Vertical Highlights */}
      <line x1="41" y1="26" x2="43" y2="82" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="59" y1="26" x2="57" y2="82" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Top Glass Rim Ellipse */}
      <ellipse cx="50" cy="22" rx="18" ry="4" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
      <ellipse cx="50" cy="23" rx="16.5" ry="3.2" fill="none" stroke="rgba(212,163,115,0.4)" strokeWidth="0.8" />
    </svg>
  )
}

// -------------------------------------------------------------
// Vessel 4: Hand-Hammered Copper Cezve / Rakwa (Levantine Heritage)
// -------------------------------------------------------------
function CopperCezveVessel({ item }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.75)]">
      <defs>
        <linearGradient id="copperBody" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#e07a5f" />
          <stop offset="30%" stopColor="#d46b4e" />
          <stop offset="70%" stopColor="#9a3c22" />
          <stop offset="100%" stopColor="#4f1b0d" />
        </linearGradient>
        <linearGradient id="brassHandle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9c46a" />
          <stop offset="50%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#664600" />
        </linearGradient>
        <radialGradient id="wajhCrema" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b87333" />
          <stop offset="65%" stopColor="#7a3e1d" />
          <stop offset="100%" stopColor="#3d1b08" />
        </radialGradient>
      </defs>

      {/* Rising Levantine Aromatic Steam */}
      <motion.path
        d="M48 28 Q 44 16 50 6"
        stroke="rgba(233,196,106,0.5)"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        custom={1}
        variants={steamVariants}
        animate="animate"
      />
      <motion.path
        d="M55 28 Q 60 18 54 8"
        stroke="rgba(212,163,115,0.4)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        custom={2}
        variants={steamVariants}
        animate="animate"
      />

      {/* Hot Ember Glow Base */}
      <ellipse cx="50" cy="85" rx="22" ry="5" fill="#e07a5f" opacity="0.3" filter="blur(4px)" />

      {/* Long Ergonomic Brass Cezve Handle */}
      <path
        d="M 62 44 L 88 26 C 90 24, 93 26, 91 28 L 65 49 Z"
        fill="url(#brassHandle)"
        stroke="#5a3d00"
        strokeWidth="0.8"
      />
      {/* Wooden / Brass Handle End Knob */}
      <circle cx="89.5" cy="27" r="3.5" fill="#3a1b0b" stroke="#e9c46a" strokeWidth="1" />

      {/* Authentic Tapered Copper Cezve Pot */}
      {/* Narrow neck, wide flared bottom */}
      <path
        d="M 36 34 L 41 52 L 32 78 C 32 83, 38 85, 50 85 C 62 85, 68 83, 68 78 L 59 52 L 64 34 Z"
        fill="url(#copperBody)"
        stroke="#5a1d0f"
        strokeWidth="1.5"
      />

      {/* Pouring Lip on Left */}
      <path d="M 36 34 Q 30 32 32 37 Q 36 38 36 34 Z" fill="#e07a5f" stroke="#5a1d0f" strokeWidth="1" />

      {/* Hammered Copper Texture Dimples */}
      <g fill="#f4a261" opacity="0.25">
        <circle cx="44" cy="62" r="1.5" />
        <circle cx="56" cy="64" r="1.8" />
        <circle cx="50" cy="72" r="1.6" />
        <circle cx="40" cy="74" r="1.3" />
        <circle cx="60" cy="73" r="1.4" />
      </g>

      {/* Top Rim & Dense Golden Wajh (Foam Crema) */}
      <ellipse cx="50" cy="34" rx="14" ry="4.5" fill="#200d05" />
      <ellipse cx="50" cy="34.5" rx="12.5" ry="3.8" fill="url(#wajhCrema)" />
      <ellipse cx="48" cy="34" rx="6" ry="1.8" fill="#d4a373" opacity="0.6" />

      {/* Cracked Green Cardamom Pod Beside Pot */}
      <g transform="translate(24, 76) rotate(-20)">
        <ellipse cx="5" cy="4" rx="5" ry="3" fill="#606c38" stroke="#283618" strokeWidth="0.8" />
        <line x1="2" y1="4" x2="8" y2="4" stroke="#283618" strokeWidth="0.8" />
        <circle cx="7" cy="4" r="1" fill="#1b110b" />
      </g>
    </svg>
  )
}

// -------------------------------------------------------------
// Vessel 5: Clear Glass Infuser Teapot (Tea & Botanical)
// -------------------------------------------------------------
function GlassInfuserVessel({ item }) {
  const isRose = item.id?.includes('rose')
  const isSage = item.id?.includes('sage') || item.id?.includes('zaatar')

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
      <defs>
        {/* Jewel-toned Herbal Liquid */}
        <radialGradient id="teaLiquid" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={isRose ? '#f472b6' : isSage ? '#a3e635' : '#fbbf24'} />
          <stop offset="60%" stopColor={isRose ? '#db2777' : isSage ? '#65a30d' : '#d97706'} />
          <stop offset="100%" stopColor={isRose ? '#831843' : isSage ? '#365314' : '#78350f'} />
        </radialGradient>
        <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
        </linearGradient>
      </defs>

      {/* Fragrant Botanical Steam */}
      <motion.path
        d="M47 30 Q 43 18 48 8"
        stroke={isRose ? 'rgba(244,114,182,0.45)' : 'rgba(234,179,8,0.45)'}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        custom={1}
        variants={steamVariants}
        animate="animate"
      />

      {/* Glass Shadow */}
      <ellipse cx="50" cy="84" rx="26" ry="5" fill="#0c0a08" opacity="0.8" />

      {/* Teapot Spout on Left */}
      <path
        d="M 28 50 Q 14 44 14 36 Q 18 36 24 45 Z"
        fill="url(#teaLiquid)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />

      {/* Teapot Handle on Right */}
      <path
        d="M 72 45 C 88 44, 88 68, 70 70"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Spherical Glass Teapot Body with Infusion Liquid */}
      <circle cx="50" cy="58" r="24" fill="url(#teaLiquid)" />

      {/* Floating Botanical Vectors */}
      {isRose ? (
        // Floating Damascene Rosebuds
        <g>
          <ellipse cx="44" cy="54" rx="3.5" ry="2.5" fill="#f43f5e" stroke="#9f1239" strokeWidth="0.8" />
          <circle cx="43" cy="53" r="1.5" fill="#fda4af" />
          <ellipse cx="55" cy="62" rx="4" ry="3" fill="#e11d48" stroke="#881337" strokeWidth="0.8" />
          <circle cx="54" cy="61" r="1.8" fill="#fecdd3" />
        </g>
      ) : (
        // Floating Sage / Mountain Herb Leaves
        <g>
          <path d="M 40 56 Q 48 48 52 52 Q 46 60 40 56 Z" fill="#4d7c0f" stroke="#1a2e05" strokeWidth="0.8" />
          <path d="M 52 64 Q 60 58 62 62 Q 56 68 52 64 Z" fill="#65a30d" stroke="#365314" strokeWidth="0.8" />
        </g>
      )}

      {/* Glass Reflections & Specular Highlights */}
      <path
        d="M 50 34 A 24 24 0 0 1 74 58"
        fill="none"
        stroke="url(#glassSheen)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="36" cy="46" r="3.5" fill="rgba(255,255,255,0.45)" filter="blur(0.8px)" />

      {/* Teapot Glass Lid & Knob */}
      <path d="M 40 34 C 40 30, 60 30, 60 34 Z" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      <circle cx="50" cy="28" r="3" fill="rgba(212,163,115,0.8)" stroke="#fefae0" strokeWidth="1" />
    </svg>
  )
}
