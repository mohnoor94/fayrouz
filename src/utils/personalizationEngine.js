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

export const FLAVOR_PILLARS = [
  {
    id: 'floral',
    name: 'Floral & Blossom',
    nameAr: 'زهري ووردي',
    icon: '🌸',
    desc: 'Damascene Rose, Jasmine, Orange Blossom',
    keywords: ['Rose', 'Jasmine', 'Blossom', 'Neroli', 'Floral', 'Damascene']
  },
  {
    id: 'cacao',
    name: 'Cacao & Earthy',
    nameAr: 'كاكاو وأرضي',
    icon: '🍫',
    desc: 'Dark Cocoa, Sesame Tahini, Chios Mastic',
    keywords: ['Cacao', 'Chocolate', 'Tahini', 'Mastic', 'Cocoa', 'Mocha']
  },
  {
    id: 'citrus',
    name: 'Bright Citrus & Fruit',
    nameAr: 'حمضيات وعصارية',
    icon: '🍊',
    desc: 'Blood Orange, Cascara Cherry, Bergamot',
    keywords: ['Bergamot', 'Lemon', 'Orange', 'Cascara', 'Peach', 'Apricot', 'Blackcurrant', 'Grapefruit']
  },
  {
    id: 'spiced',
    name: 'Spiced & Golden',
    nameAr: 'توابل وهيل وتمر',
    icon: '🍯',
    desc: 'Green Cardamom, Medjool Date, Ceylon Cinnamon',
    keywords: ['Cardamom', 'Date', 'Cinnamon', 'Turmeric', 'Ginger', 'Spiced']
  },
  {
    id: 'silky',
    name: 'Silky Velvet & Malt',
    nameAr: 'مخملي وحليبي',
    icon: '🥛',
    desc: 'Oat Microfoam, Dulce de Leche, Caramel',
    keywords: ['Oat', 'Crema', 'Caramel', 'Dulce de Leche', 'Vanilla', 'Malt', 'Foam', 'Milk']
  }
]

/**
 * Calculates mathematical relevance match percentage between an item and a user profile.
 * Incorporates:
 * - Roast & sweetness alignment
 * - Taste affinities (up to 3 flavor pillars) keyword intersection
 * - Palate distance & temperature affinity
 * - Artisan / Signature boosts
 * 
 * @param {Object} item - Evaluated MenuItem
 * @param {Object} profile - UserProfile
 * @returns {number} Match percentage (integer 45 to 99)
 */
export function calculateMatchScore(item, profile = {}) {
  let userScore = Number(profile.palateScore) || 5

  // If roast & sweetness preferences are explicitly provided, refine userScore
  if (profile.roastPreference && profile.sweetnessPreference) {
    let base = 5
    if (profile.roastPreference === 'light') base = profile.sweetnessPreference === 'unsweetened' ? 2 : 4
    else if (profile.roastPreference === 'dark') base = profile.sweetnessPreference === 'unsweetened' ? 1 : 3
    else base = profile.sweetnessPreference === 'sweet' ? 8 : (profile.sweetnessPreference === 'unsweetened' ? 3 : 5)
    userScore = base
  }

  // 1. Palate Distance [0, 9]
  const itemScore = item?.profileScore !== undefined ? item.profileScore : 5
  const delta = Math.abs(itemScore - userScore)
  const palateScoreNormalized = 1.0 - (delta / 9)

  // 2. Temperature Affinity
  const userTemp = profile.temperature || 'any'
  let tempWeight = 1.0
  if (userTemp === 'iced') {
    if (item.defaultTemperature === 'iced') tempWeight = 1.0
    else if (item.canBeIced) tempWeight = 0.90
    else tempWeight = 0.35 // strictly hot drink
  } else if (userTemp === 'hot') {
    if (item.defaultTemperature === 'hot') tempWeight = 1.0
    else if (item.canBeHot) tempWeight = 0.90
    else tempWeight = 0.35 // strictly cold drink
  }

  // 3. Multi-Taste Affinities Overlap (The Flavor Pillars)
  let tasteBoost = 0
  const userAffinities = Array.isArray(profile.tasteAffinities) ? profile.tasteAffinities : []
  if (userAffinities.length > 0) {
    const itemSearchText = [
      item.name,
      item.description,
      ...(item.tastingNotes || [])
    ].join(' ').toLowerCase()

    userAffinities.forEach(affId => {
      const pillar = FLAVOR_PILLARS.find(p => p.id === affId)
      if (pillar) {
        const matches = pillar.keywords.some(kw => itemSearchText.includes(kw.toLowerCase()))
        if (matches) {
          tasteBoost += 0.08 // +8% per matching selected flavor pillar
        }
      }
    })
  }

  // 4. Roast Preference Direct Alignment
  let roastBoost = 0
  if (profile.roastPreference) {
    if (profile.roastPreference === 'light') {
      if (item.roastLevel === 'Light') roastBoost += 0.08
      else if (item.roastLevel === 'Dark' || item.roastLevel === 'Medium-Dark') roastBoost -= 0.06
    } else if (profile.roastPreference === 'dark') {
      if (item.roastLevel === 'Dark' || item.roastLevel === 'Medium-Dark') roastBoost += 0.08
      else if (item.roastLevel === 'Light') roastBoost -= 0.06
    } else if (profile.roastPreference === 'medium') {
      if (item.roastLevel === 'Medium' || item.roastLevel === 'Medium-Light') roastBoost += 0.06
    }
  }

  // 5. Sweetness Preference Direct Alignment
  let sweetBoost = 0
  if (profile.sweetnessPreference) {
    if (profile.sweetnessPreference === 'unsweetened') {
      if (item.sweetness <= 2) sweetBoost += 0.08
      else if (item.sweetness >= 4) sweetBoost -= 0.06
    } else if (profile.sweetnessPreference === 'sweet') {
      if (item.sweetness >= 4) sweetBoost += 0.08
      else if (item.sweetness <= 2) sweetBoost -= 0.06
    } else if (profile.sweetnessPreference === 'subtle') {
      if (item.sweetness === 2 || item.sweetness === 3) sweetBoost += 0.06
    }
  }

  // 6. Signature & Artisan Boost
  let boost = 0
  if (item.badge === 'Signature Pick') boost += 0.04
  if (item.badge === 'Barista Favorite') boost += 0.02
  if (item.badge === 'Single Origin') boost += 0.02

  const composite = (0.50 * palateScoreNormalized + 0.25 * tempWeight + tasteBoost + roastBoost + sweetBoost + boost) * 100
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

  // Order items within each category: safe items first by match score, not-recommended/unsafe items ordered last
  Object.values(categorizedMenu).forEach(categoryGroup => {
    categoryGroup.items.sort((a, b) => {
      // 1. Unsafe items (e.g. nut allergy, non-vegan) are strictly ordered last
      if (a.isUnsafe && !b.isUnsafe) return 1
      if (!a.isUnsafe && b.isUnsafe) return -1

      // 2. Temperature mismatch is placed after matching temperature items
      if (a.temperatureMismatch && !b.temperatureMismatch) return 1
      if (!a.temperatureMismatch && b.temperatureMismatch) return -1

      // 3. Within the same safety tier, order by highest matchScore descending
      return b.matchScore - a.matchScore
    })
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
