/**
 * Fayrouz (فيروز) — Enhanced Persona & Taste Passport Generator
 * 
 * Generates bespoke coffee personas, cultural Arabic titles,
 * and passport credentials based on multi-taste flavor pillars,
 * roast & sweetness preferences, and dietary guardrails.
 */

import { DIETARY_FLAGS, FLAVOR_PILLARS } from './personalizationEngine.js'

export function generateCoffeePersona(profile = {}) {
  const dietary = Array.isArray(profile.dietary) ? profile.dietary : []
  const affinities = Array.isArray(profile.tasteAffinities) ? profile.tasteAffinities : []
  const roast = profile.roastPreference || 'medium'
  const sweetness = profile.sweetnessPreference || 'subtle'
  const isVegan = dietary.includes(DIETARY_FLAGS.VEGAN)
  const isNutFree = dietary.includes(DIETARY_FLAGS.NUT_FREE)
  const isLactoseFree = dietary.includes(DIETARY_FLAGS.LACTOSE_FREE)

  // Determine primary flavor pillar
  const primaryAffinity = affinities[0] || 'floral'
  let baseTitle = ''
  let baseTitleAr = ''
  let descriptor = ''

  if (primaryAffinity === 'floral') {
    baseTitle = roast === 'light' ? 'The Damascene Botanical Explorer' : 'The Rose & Jasmine Connoisseur'
    baseTitleAr = roast === 'light' ? 'مستكشف الزهور الشامية' : 'متذوق الورد والياسمين'
    descriptor = 'Drawn to micro-distilled Damascene rose, white jasmine blossoms, and fragrant botanical clarity.'
  } else if (primaryAffinity === 'cacao') {
    baseTitle = sweetness === 'unsweetened' ? 'The Single-Origin Obsidian Purist' : 'The Dark Mocha Alchemist'
    baseTitleAr = sweetness === 'unsweetened' ? 'عاشق القهوة الصافية الداكنة' : 'خبير الكاكاو والموكا الحرفية'
    descriptor = 'Craves single-origin 70% dark cocoa, roasted sesame tahini, and dense espresso crema.'
  } else if (primaryAffinity === 'citrus') {
    baseTitle = 'The Cascara & Terroir Wanderer'
    baseTitleAr = 'مستكشف الحمضيات والكاسكارا'
    descriptor = 'Celebrates sparkling blood orange, high-altitude Ethiopian bergamot, and coffee cherry infusions.'
  } else if (primaryAffinity === 'spiced') {
    baseTitle = 'The Heritage Cardamom Connoisseur'
    baseTitleAr = 'خبير الهيل والتراث'
    descriptor = 'Reveres crushed green cardamom, Medjool date caramel, and the eternal Levantine Ibrik ritual.'
  } else if (primaryAffinity === 'silky') {
    baseTitle = sweetness === 'sweet' ? 'The Sweet Velvet Seeker' : 'The Microfoam Artisan'
    baseTitleAr = sweetness === 'sweet' ? 'عاشق المخملية والحلاوة' : 'عاشق المايكروفوم الحريري'
    descriptor = 'Cherishes velvety micro-foamed oat milk, Spanish dulce de leche, and comforting malt warmth.'
  } else {
    baseTitle = 'The Levantine Connoisseur'
    baseTitleAr = 'المتذوق المتناغم الأصيل'
    descriptor = 'A harmonious balance of artisanal roasting, regional botanicals, and velvety textures.'
  }

  // Dietary prefix adjustment if vegan
  let finalTitle = baseTitle
  let finalTitleAr = baseTitleAr

  if (isVegan) {
    finalTitle = `The Plant-Based ${baseTitle.replace('The ', '')}`
    finalTitleAr = `${baseTitleAr} (نباتي بالكامل)`
  }

  // Deterministic passport hash
  const nameHash = (profile.name || 'Guest')
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 1000) % 9000 + 1000
  const passportNumber = `FYZ-${nameHash}`

  // Phone masking (e.g. +962 79 •••• 1234)
  const rawPhone = profile.phone || '+962 79 555 1234'
  const phoneParts = rawPhone.split(' ')
  const maskedPhone = phoneParts.length >= 3
    ? `${phoneParts[0]} ${phoneParts[1]} •••• ${phoneParts[phoneParts.length - 1]}`
    : rawPhone

  // Active Flavor Pillar Tags
  const flavorPillarBadges = affinities.map(id => {
    const pillar = FLAVOR_PILLARS.find(p => p.id === id)
    return pillar ? `${pillar.icon} ${pillar.name}` : id
  })

  // Badges
  const badges = []
  if (isNutFree) badges.push({ text: 'Nut Safe Protocol', icon: 'shield', color: 'cardamom' })
  if (isVegan) badges.push({ text: '100% Plant-Based', icon: 'leaf', color: 'cardamom' })
  else if (isLactoseFree) badges.push({ text: 'Oat Milk Auto-Swapped', icon: 'drop', color: 'amber' })

  // Roast & Sweetness badges
  const roastLabels = { light: 'Light & Floral Roast', medium: 'Medium Balanced Roast', dark: 'Dark Intense Roast' }
  const sweetLabels = { unsweetened: '0% Unsweetened', subtle: 'Subtle Natural Touch', sweet: 'Rich Indulgent Sweet' }
  badges.push({ text: roastLabels[roast] || 'Balanced Roast', icon: 'coffee', color: 'gold' })
  badges.push({ text: sweetLabels[sweetness] || 'Subtle Sweet', icon: 'sparkle', color: 'gold' })

  if (profile.temperature === 'iced') {
    badges.push({ text: 'Chilled Preferred', icon: 'snow', color: 'sky' })
  } else if (profile.temperature === 'hot') {
    badges.push({ text: 'Steaming Warmth', icon: 'flame', color: 'ember' })
  } else {
    badges.push({ text: 'All-Weather Palate', icon: 'compass', color: 'gold' })
  }

  return {
    title: finalTitle,
    titleAr: finalTitleAr,
    descriptor,
    passportNumber,
    maskedPhone,
    flavorPillarBadges,
    roast,
    sweetness,
    badges
  }
}
