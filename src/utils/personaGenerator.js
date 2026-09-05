/**
 * Fayrouz (فيروز) — Persona & Taste Passport Generator
 * 
 * Generates bespoke coffee personas, cultural Arabic titles,
 * and passport credentials based on palate scores and dietary preferences.
 */

import { DIETARY_FLAGS } from './personalizationEngine'

export function generateCoffeePersona(profile = {}) {
  const score = Number(profile.palateScore) || 5
  const dietary = Array.isArray(profile.dietary) ? profile.dietary : []
  const isVegan = dietary.includes(DIETARY_FLAGS.VEGAN)
  const isNutFree = dietary.includes(DIETARY_FLAGS.NUT_FREE)
  const isLactoseFree = dietary.includes(DIETARY_FLAGS.LACTOSE_FREE)

  let baseTitle = ''
  let baseTitleAr = ''
  let descriptor = ''
  let zone = 'balanced'

  if (score <= 2) {
    baseTitle = 'The Single-Origin Purist'
    baseTitleAr = 'عاشق القهوة الصافية'
    descriptor = 'High-altitude extraction, vibrant acidity, and dense espresso crema.'
    zone = 'bold'
  } else if (score <= 4) {
    baseTitle = 'The Terroir Explorer'
    baseTitleAr = 'مستكشف النوتات الزهرية'
    descriptor = 'Nuanced pour-overs, floral Ethiopian jasmine, and sparkling citrus bloom.'
    zone = 'bold'
  } else if (score <= 6) {
    baseTitle = 'The Levantine Connoisseur'
    baseTitleAr = 'المتذوق المتناغم الأصيل'
    descriptor = 'Harmonious balance of crushed green cardamom, Damascene rose, and silky texture.'
    zone = 'balanced'
  } else if (score <= 8) {
    baseTitle = 'The Velvet Seeker'
    baseTitleAr = 'الباحث عن القوام المخملي'
    descriptor = 'Silky micro-foam, artisan date caramel, and comforting warmth.'
    zone = 'sweet'
  } else {
    baseTitle = 'The Sweet Alchemist'
    baseTitleAr = 'عاشق الحلاوة والدفء'
    descriptor = 'Rich dulce de leche, Spanish cinnamon lattes, and indulgent dessert comfort.'
    zone = 'sweet'
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

  // Badges
  const badges = []
  if (isNutFree) badges.push({ text: 'Nut Safe Protocol', icon: 'shield', color: 'cardamom' })
  if (isVegan) badges.push({ text: '100% Plant-Based', icon: 'leaf', color: 'cardamom' })
  else if (isLactoseFree) badges.push({ text: 'Oat Milk Auto-Swapped', icon: 'drop', color: 'amber' })

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
    zone,
    passportNumber,
    score,
    badges
  }
}
