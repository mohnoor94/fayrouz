/**
 * Fayrouz (فيروز) — Enhanced Persona & Taste Passport Generator
 * 
 * Generates bespoke coffee personas, cultural Arabic titles,
 * and passport credentials based on multi-taste flavor pillars,
 * roast & sweetness preferences, and dietary guardrails.
 */

import { DIETARY_FLAGS, FLAVOR_PILLARS } from './personalizationEngine.js'
import { BRAND_CONFIG } from '../constants/brandConfig.js'
import { computeCoffeeDialect } from './coffeeDialects.js'

export function generateCoffeePersona(profile = {}) {
  const dietary = Array.isArray(profile.dietary) ? profile.dietary : []
  const affinities = Array.isArray(profile.tasteAffinities) ? profile.tasteAffinities : []
  const roast = profile.roastPreference || 'medium'
  const sweetness = profile.sweetnessPreference || 'subtle'
  const isVegan = dietary.includes(DIETARY_FLAGS.VEGAN)
  const isNutFree = dietary.includes(DIETARY_FLAGS.NUT_FREE)
  const isLactoseFree = dietary.includes(DIETARY_FLAGS.LACTOSE_FREE)

  // 1. Resolve The 16 Dialects Archetype & Enneagram House
  const dialectResolution = computeCoffeeDialect(profile)
  const { code: dialectCode, dialect, house, isPolyglot, fluidityScore } = dialectResolution

  let finalTitle = dialect.title
  let finalTitleAr = dialect.titleAr

  if (isVegan) {
    finalTitle = `The Plant-Based ${dialect.title.replace('The ', '')}`
    finalTitleAr = `${dialect.titleAr} (نباتي)`
  }

  const descriptor = dialect.tagline

  // Deterministic passport hash
  const nameHash = (profile.name || 'Guest')
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 1000) % 9000 + 1000
  const prefix = 'FYZ'
  const passportNumber = `${prefix}-${nameHash}`

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
    badges,
    // The 16 Dialects™ Core Integration
    dialectCode,
    dialect,
    house,
    isPolyglot,
    fluidityScore,
    watermark: dialect.watermark
  }
}
