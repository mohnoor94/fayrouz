/**
 * Fayrouz (فيروز) — Personalization & Dynamic Curation Engine
 * 
 * Implements deterministic multi-variable matching:
 * 1. Allergen & dietary safety verification (nuts, dairy, vegan integrity)
 * 2. Plant milk auto-substitution with dynamic surcharge calculation (+$0.50)
 * 3. Palate distance scoring and temperature affinity weighting
 * 4. 80/20 Curated Top Matches (top 3-4 items strictly matching temperature & safety)
 * 5. Dynamic Adventurous Wildcard selection with bespoke Levantine storytelling rationale
 * 6. Catalog mapping supporting dimmed unsafe cards & temperature notices
 */

export const DIETARY_FLAGS = {
  LACTOSE_FREE: 'lactose-free',
  VEGAN: 'vegan',
  NUT_FREE: 'nut-free'
}

export const OAT_MILK_SURCHARGE = 0.50

/**
 * Evaluates dietary and allergen safety for a single menu item against the user profile.
 * 
 * @param {Object} item - MenuItem object
 * @param {Object} profile - UserProfile object ({ dietary: string[] })
 * @returns {Object} Evaluated item with safety status and adaptation metadata
 */
export function evaluateItemSafety(item, profile = {}) {
  const dietary = Array.isArray(profile.dietary) ? profile.dietary : []
  const isNutFree = dietary.includes(DIETARY_FLAGS.NUT_FREE)
  const isVegan = dietary.includes(DIETARY_FLAGS.VEGAN)
  const isLactoseFree = dietary.includes(DIETARY_FLAGS.LACTOSE_FREE)

  // 1. Strict Nut Allergy Check
  if (isNutFree && item.containsNuts) {
    return {
      ...item,
      isUnsafe: true,
      unsafeReason: `Contains ${item.nutType || 'Tree Nuts'}`,
      isAdapted: false,
      appliedMilk: null,
      effectivePrice: item.price,
      surcharge: 0,
      safetyStatus: 'UNSAFE_ALLERGEN'
    }
  }

  // 2. Strict Vegan Check
  if (isVegan) {
    if (item.isVegan) {
      return {
        ...item,
        isUnsafe: false,
        unsafeReason: null,
        isAdapted: false,
        appliedMilk: item.dairyAlternative || null,
        effectivePrice: item.price,
        surcharge: 0,
        safetyStatus: 'SAFE_NATURAL_VEGAN'
      }
    }

    if (item.canBeVegan && item.dairyAlternative) {
      return {
        ...item,
        isUnsafe: false,
        unsafeReason: null,
        isAdapted: true,
        appliedMilk: item.dairyAlternative,
        effectivePrice: Number((item.price + OAT_MILK_SURCHARGE).toFixed(2)),
        surcharge: OAT_MILK_SURCHARGE,
        badgeNotice: `Auto-Swapped to ${item.dairyAlternative} (+$${OAT_MILK_SURCHARGE.toFixed(2)})`,
        safetyStatus: 'ADAPTED_VEGAN'
      }
    }

    // Item cannot be made vegan (e.g. contains raw mountain honey or non-vegan ingredients)
    return {
      ...item,
      isUnsafe: true,
      unsafeReason: 'Contains non-vegan ingredients (Honey / Dairy)',
      isAdapted: false,
      appliedMilk: null,
      effectivePrice: item.price,
      surcharge: 0,
      safetyStatus: 'UNSAFE_NON_VEGAN'
    }
  }

  // 3. Lactose Intolerance Check (Non-vegan)
  if (isLactoseFree && item.containsDairy) {
    if (item.dairyAlternative) {
      return {
        ...item,
        isUnsafe: false,
        unsafeReason: null,
        isAdapted: true,
        appliedMilk: item.dairyAlternative,
        effectivePrice: Number((item.price + OAT_MILK_SURCHARGE).toFixed(2)),
        surcharge: OAT_MILK_SURCHARGE,
        badgeNotice: `Auto-Swapped to ${item.dairyAlternative} (+$${OAT_MILK_SURCHARGE.toFixed(2)})`,
        safetyStatus: 'ADAPTED_LACTOSE_FREE'
      }
    }

    return {
      ...item,
      isUnsafe: true,
      unsafeReason: 'Contains Dairy (No plant alternative available)',
      isAdapted: false,
      appliedMilk: null,
      effectivePrice: item.price,
      surcharge: 0,
      safetyStatus: 'UNSAFE_DAIRY'
    }
  }

  // 4. Default: Safe as is
  return {
    ...item,
    isUnsafe: false,
    unsafeReason: null,
    isAdapted: false,
    appliedMilk: item.dairyAlternative || (item.containsDairy ? 'Whole Milk' : null),
    effectivePrice: item.price,
    surcharge: 0,
    safetyStatus: 'SAFE_ORIGINAL'
  }
}

/**
 * Calculates mathematical relevance match percentage between an item and a user profile.
 * 
 * Formula:
 * - Palate Distance Penalty: Score_palate = 1 - (|item.profileScore - user.palateScore| / 9)
 * - Temperature Weight:
 *    - exact match = 1.0
 *    - adaptable to requested temperature = 0.90
 *    - temperature mismatch (cannot be served as requested) = 0.35
 * - Signature / Barista boost: +0.02 to +0.04
 * - Composite Match = clamp((0.70 * Score_palate + 0.30 * TempWeight + Boost) * 100, 45, 99)
 * 
 * @param {Object} item - Evaluated MenuItem
 * @param {Object} profile - UserProfile ({ palateScore: number, temperature: string })
 * @returns {number} Match percentage (integer 45 to 99)
 */
export function calculateMatchScore(item, profile = {}) {
  const userScore = Number(profile.palateScore) || 5
  const userTemp = profile.temperature || 'any'

  // Palate Distance [0, 9]
  const delta = Math.abs(item.profileScore - userScore)
  const palateScoreNormalized = 1.0 - (delta / 9)

  // Temperature Affinity
  let tempWeight = 1.0
  if (userTemp === 'iced') {
    if (item.defaultTemperature === 'iced') {
      tempWeight = 1.0
    } else if (item.canBeIced) {
      tempWeight = 0.90
    } else {
      tempWeight = 0.35 // strictly hot drink
    }
  } else if (userTemp === 'hot') {
    if (item.defaultTemperature === 'hot') {
      tempWeight = 1.0
    } else if (item.canBeHot) {
      tempWeight = 0.90
    } else {
      tempWeight = 0.35 // strictly cold drink
    }
  }

  // Signature & Artisan Boost
  let boost = 0
  if (item.badge === 'Signature Pick') boost += 0.04
  if (item.badge === 'Barista Favorite') boost += 0.02
  if (item.badge === 'Single Origin') boost += 0.02

  const composite = (0.70 * palateScoreNormalized + 0.30 * tempWeight + boost) * 100
  return Math.min(99, Math.max(45, Math.round(composite)))
}

/**
 * Determines whether an item satisfies the user's temperature preference for top curated recommendations.
 */
export function matchesTemperaturePreference(item, userTemp) {
  if (!userTemp || userTemp === 'any') return true
  if (userTemp === 'iced') return Boolean(item.canBeIced)
  if (userTemp === 'hot') return Boolean(item.canBeHot)
  return true
}

/**
 * Selects an Adventurous Discovery Pick ("The Wildcard") and generates a personalized rationale.
 * 
 * Constraints:
 * 1. Must be strictly safe (isUnsafe === false)
 * 2. Must not be already in the curated matches
 * 3. Distance delta must be between 3 and 5 (nudging outside comfort zone)
 * 4. Prioritizes signature craft and botanical profiles
 * 
 * @param {Array} safeItems - List of all safe evaluated items
 * @param {Object} profile - UserProfile
 * @param {Array} topCuratedIds - IDs of items already placed in curated shelf
 * @returns {Object|null} Selected wildcard item with dynamic rationale
 */
export function selectAdventurousPick(safeItems, profile = {}, topCuratedIds = []) {
  const userScore = Number(profile.palateScore) || 5
  const userTemp = profile.temperature || 'any'

  // Filter candidates: distance delta between 3 and 5, not already curated
  const candidates = safeItems.filter(item => {
    if (topCuratedIds.includes(item.id)) return false
    const delta = Math.abs(item.profileScore - userScore)
    return delta >= 3 && delta <= 5
  })

  if (candidates.length === 0) {
    // Fallback: any safe item not in topCurated
    const fallback = safeItems.find(item => !topCuratedIds.includes(item.id))
    if (!fallback) return null
    return {
      ...fallback,
      isWildcard: true,
      wildcardDelta: Math.abs(fallback.profileScore - userScore),
      whyYouWillLoveThis: generateWildcardRationale(fallback, profile)
    }
  }

  // Sort candidates by signature priority and temperature compatibility
  const sorted = [...candidates].sort((a, b) => {
    // Temperature compatibility bonus
    const aTempMatch = matchesTemperaturePreference(a, userTemp) ? 1 : 0
    const bTempMatch = matchesTemperaturePreference(b, userTemp) ? 1 : 0
    if (aTempMatch !== bTempMatch) return bTempMatch - aTempMatch

    // Signature bonus
    const badgePriority = { 'Signature Pick': 3, 'Barista Favorite': 2, 'Wildcraft Seasonal': 2, 'Single Origin': 1 }
    const aPriority = badgePriority[a.badge] || 0
    const bPriority = badgePriority[b.badge] || 0
    if (aPriority !== bPriority) return bPriority - aPriority

    // Highest match score among candidates
    return b.matchScore - a.matchScore
  })

  const selected = sorted[0]
  const delta = Math.abs(selected.profileScore - userScore)

  return {
    ...selected,
    isWildcard: true,
    wildcardDelta: delta,
    whyYouWillLoveThis: generateWildcardRationale(selected, profile)
  }
}

/**
 * Generates a bespoke Levantine storytelling rationale for the adventurous pick.
 */
export function generateWildcardRationale(item, profile = {}) {
  const userScore = Number(profile.palateScore) || 5
  const notes = item.tastingNotes ? item.tastingNotes.slice(0, 2).join(' & ') : 'aromatic botanical notes'

  if (userScore <= 3) {
    // Bold / Purist drinker -> Nudge toward smooth sweetness or aromatic infusions
    if (item.category === 'levantine-signature') {
      return `You love pure coffee boldness. Discover how our ${item.name} uses ${notes} to introduce Levantine fragrance without compromising the espresso punch.`
    }
    if (item.category === 'cold-brew') {
      return `You appreciate clean extraction; explore how slow-steeped ${notes} creates natural velvety sweetness with zero artificial sugar.`
    }
    return `Expand your black coffee ritual: experience how ${notes} unveils delicate stone-fruit sweetness.`
  }

  if (userScore >= 8) {
    // Sweet / Milky drinker -> Nudge toward subtle floral / pour-over or botanical balance
    if (item.category === 'espresso-black') {
      return `You adore silky sweetness; taste the natural jasmine and peach sweetness in our ${item.name}, with zero heavy syrups.`
    }
    if (item.category === 'levantine-signature') {
      return `Step beyond dessert drinks into ancient Levantine craft: ${notes} delivers creamy elegance with authentic spice nuance.`
    }
    return `A gentle step toward lighter roasts: indulge in natural ${notes} paired with velvety texture.`
  }

  // Balanced drinker (Score 4-7)
  if (item.category === 'cold-brew' || item.defaultTemperature === 'iced') {
    return `Because you appreciate balance, this chilled masterpiece elevates your ritual with refreshing ${notes} and effervescent clarity.`
  }
  return `A curated leap for your nuanced palate: ${notes} crafts a captivating bridge between roasted depth and botanical elegance.`
}

/**
 * Main orchestrator: generates complete personalized kiosk menu payload.
 * 
 * @param {Array} rawMenuItems - All 24+ raw items from menuData.json
 * @param {Object} profile - User taste passport profile
 * @returns {Object} Personalized menu payload
 */
export function generatePersonalizedMenu(rawMenuItems, profile = {}) {
  if (!Array.isArray(rawMenuItems)) {
    return {
      curatedMatches: [],
      adventurousPick: null,
      categorizedMenu: {},
      stats: { total: 0, safe: 0, adapted: 0, unsafe: 0 }
    }
  }

  const userTemp = profile.temperature || 'any'

  // Step 1: Evaluate safety & calculate match score for every item
  const evaluatedItems = rawMenuItems.map(item => {
    const safeItem = evaluateItemSafety(item, profile)
    const matchScore = calculateMatchScore(safeItem, profile)
    const delta = Math.abs(item.profileScore - (Number(profile.palateScore) || 5))
    const tempMatches = matchesTemperaturePreference(item, userTemp)

    return {
      ...safeItem,
      matchScore,
      palateDelta: delta,
      temperatureMismatch: !tempMatches,
      tempNotice: !tempMatches ? (item.canBeHot ? 'Hot Only' : 'Iced Only') : null,
      servedTemperature: userTemp === 'iced' && item.canBeIced ? 'iced' : item.defaultTemperature
    }
  })

  // Step 2: Separate safe items
  const safeItems = evaluatedItems.filter(item => !item.isUnsafe)
  const adaptedCount = evaluatedItems.filter(item => item.isAdapted).length
  const unsafeCount = evaluatedItems.filter(item => item.isUnsafe).length

  // Step 3: Curated Top Shelf (Top 3 or 4 safe items strictly matching temperature)
  const curatedCandidates = safeItems.filter(item => matchesTemperaturePreference(item, userTemp))
  curatedCandidates.sort((a, b) => b.matchScore - a.matchScore)
  const curatedMatches = curatedCandidates.slice(0, 3)
  const curatedIds = curatedMatches.map(item => item.id)

  // Step 4: Adventurous Wildcard
  const adventurousPick = selectAdventurousPick(safeItems, profile, curatedIds)

  // Step 5: Group full catalog by category (preserving ALL items, but flagging unsafe & temperature notes)
  const categorizedMenu = {}
  evaluatedItems.forEach(item => {
    const cat = item.category
    if (!categorizedMenu[cat]) {
      categorizedMenu[cat] = {
        category: cat,
        name: item.categoryName,
        nameAr: item.categoryNameAr,
        items: []
      }
    }
    categorizedMenu[cat].items.push(item)
  })

  return {
    curatedMatches,
    adventurousPick,
    categorizedMenu,
    stats: {
      total: rawMenuItems.length,
      safe: safeItems.length,
      adapted: adaptedCount,
      unsafe: unsafeCount
    }
  }
}
