/**
 * Ambar Specialty Roasters (محمصة عنبر للقهوة المختصة)
 * Craft Constraints & Smart Fallbacks Engine
 * 
 * Harmonizes guest Taste Passport preferences with specialty coffee craft boundaries:
 * 1. Smart Fallbacks: Auto-selects closest craft standard when a preference is not applicable.
 * 2. Transparent Explanations: Explains "why" (e.g. 1:1 Cortado ratio, hot-only copper cezve).
 * 3. Passport Shielding: Never degrades permanent passport defaults due to single-drink constraints.
 */

/**
 * Resolves item specifications against user profile preferences and recipe craft physics.
 * 
 * @param {Object} item - Menu item from menuData.json
 * @param {Object} userProfile - Guest Taste Passport profile
 * @returns {Object} Resolved craft specifications, constraints, and labels
 */
export function resolveItemCraftSpecs(item, userProfile) {
  if (!item) {
    return {
      effectiveSize: 'regular',
      sizeLabel: '12 oz (Reg)',
      effectiveTemp: 'hot',
      tempLabel: '🔥 Hot',
      effectiveMilk: null,
      milkLabel: null,
      effectiveSweetness: '25',
      effectiveAddOns: [],
      finalPrice: 0,
      specPreviewLabel: '',
      isCraftFixedSize: false,
      isHotOnly: false,
      isIcedOnly: false,
      hasMilkOption: false,
      isSizeConstrained: false,
      isTempConstrained: false,
      isMilkConstrained: false,
      sizeConstraintReason: null,
      tempConstraintReason: null,
      milkConstraintReason: null,
      canBeSavedToPassport: false
    }
  }

  const isVegan = Boolean(userProfile?.dietary?.includes('vegan'))
  const isLactoseFree = Boolean(userProfile?.dietary?.includes('lactose_free'))
  const isNutFree = Boolean(userProfile?.dietary?.includes('nut_free'))
  const isUsualItem = Boolean(userProfile?.usualDrink?.itemId && item && userProfile.usualDrink.itemId === item.id)

  const isCraftFixedSize = item.servingFormat === 'craft-fixed'
  const isHotOnly = item.canBeHot && !item.canBeIced
  const isIcedOnly = !item.canBeHot && item.canBeIced
  const hasMilkOption = Boolean(item.containsDairy || item.dairyAlternative || item.category === 'velvet-milk')

  // ---------------------------------------------------------------------------
  // 1. RESOLVE SERVING SIZE
  // ---------------------------------------------------------------------------
  let effectiveSize = 'regular'
  let sizeLabel = '12 oz (Reg)'
  let isSizeConstrained = false
  let sizeConstraintReason = null

  if (isCraftFixedSize) {
    effectiveSize = item.fixedServingSize || 'craft-fixed'
    sizeLabel = item.fixedServingLabel || `${item.fixedServingSize} (Craft Ratio)`
    const wantsLarge = userProfile?.preferredSize === 'large' ||
      (isUsualItem && (userProfile?.usualDrink?.size === 'large' || userProfile?.usualDrink?.note?.toLowerCase().includes('large') || userProfile?.usualDrink?.note?.toLowerCase().includes('16 oz')))
    if (wantsLarge) {
      isSizeConstrained = true
      sizeConstraintReason = item.sizeConstraintReason || 
        'Crafted in a dedicated single-serving ratio to maintain sensory balance.'
    }
  } else {
    // Standard volume sizes: regular vs large
    let preferred = userProfile?.preferredSize || 'regular'
    if (isUsualItem && userProfile?.usualDrink?.size) {
      preferred = userProfile.usualDrink.size
    } else if (isUsualItem && userProfile?.usualDrink?.note) {
      const note = userProfile.usualDrink.note.toLowerCase()
      if (note.includes('16 oz') || note.includes('large')) preferred = 'large'
    }
    effectiveSize = preferred
    sizeLabel = preferred === 'large' ? '16 oz (Large)' : '12 oz (Reg)'
  }

  // ---------------------------------------------------------------------------
  // 2. RESOLVE EXTRACTION TEMPERATURE
  // ---------------------------------------------------------------------------
  let effectiveTemp = 'hot'
  let tempLabel = '🔥 Hot'
  let isTempConstrained = false
  let tempConstraintReason = null

  let userTempPref = userProfile?.temperature || 'any'
  if (isUsualItem && userProfile?.usualDrink?.temperature) {
    userTempPref = userProfile.usualDrink.temperature
  } else if (isUsualItem && userProfile?.usualDrink?.note) {
    const note = userProfile.usualDrink.note.toLowerCase()
    if (note.includes('iced')) userTempPref = 'iced'
    else if (note.includes('hot')) userTempPref = 'hot'
  }

  if (isHotOnly) {
    effectiveTemp = 'hot'
    tempLabel = '🔥 Hot'
    if (userTempPref === 'iced') {
      isTempConstrained = true
      tempConstraintReason = item.tempConstraintReason || 
        'Simmered or extracted hot to preserve aromatic crema and traditional brewing physics.'
    }
  } else if (isIcedOnly) {
    effectiveTemp = 'iced'
    tempLabel = '❄️ Chilled'
    if (userTempPref === 'hot') {
      isTempConstrained = true
      tempConstraintReason = item.tempConstraintReason || 
        'Served cold to preserve natural effervescence, fruit acids, and botanical aromatics.'
    }
  } else {
    // Item can be either hot or iced
    effectiveTemp = userTempPref === 'iced' ? 'iced' : 'hot'
    tempLabel = effectiveTemp === 'iced' ? '❄️ Iced' : '🔥 Hot'
  }

  // ---------------------------------------------------------------------------
  // 3. RESOLVE MILK & PLANT DAIRY
  // ---------------------------------------------------------------------------
  let effectiveMilk = null
  let milkLabel = null
  let isMilkConstrained = false
  let milkConstraintReason = null

  if (!hasMilkOption) {
    effectiveMilk = null
    milkLabel = null
    const wantsMilk = userProfile?.preferredMilk || (isUsualItem && userProfile?.usualDrink?.milk)
    if (wantsMilk) {
      isMilkConstrained = true
      milkConstraintReason = item.milkConstraintReason || 
        'Served pure black to highlight single-origin terroir and natural floral notes.'
    }
  } else {
    // Has milk option
    if (isVegan || isLactoseFree) {
      effectiveMilk = 'oat'
      milkLabel = '🥛 Oat'
    } else {
      let userMilk = userProfile?.preferredMilk || 'whole'
      if (isUsualItem && userProfile?.usualDrink?.milk) {
        userMilk = userProfile.usualDrink.milk
      } else if (isUsualItem && userProfile?.usualDrink?.note) {
        const note = userProfile.usualDrink.note.toLowerCase()
        if (note.includes('oat')) userMilk = 'oat'
        else if (note.includes('almond')) userMilk = 'almond'
      }
      // If user prefers almond but has nut allergy safeguard
      if (userMilk === 'almond' && isNutFree) {
        effectiveMilk = 'oat'
        milkLabel = '🥛 Oat (Nut-Safe)'
      } else {
        effectiveMilk = userMilk
        milkLabel = userMilk === 'oat' ? '🥛 Oat' : userMilk === 'almond' ? '🥛 Almond' : '🥛 Whole'
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 4. RESOLVE SWEETNESS & ADD-ONS
  // ---------------------------------------------------------------------------
  let sweetnessPref = userProfile?.sweetnessPreference || 'subtle'
  if (isUsualItem && userProfile?.usualDrink?.sweetness) {
    sweetnessPref = userProfile.usualDrink.sweetness === '0' ? 'unsweetened' :
      userProfile.usualDrink.sweetness === '100' ? 'sweet' :
      userProfile.usualDrink.sweetness === '50' ? 'balanced' : 'subtle'
  }
  const effectiveSweetness = sweetnessPref === 'unsweetened' ? '0' :
    sweetnessPref === 'sweet' ? '100' :
    sweetnessPref === 'balanced' ? '50' : '25'

  let effectiveAddOns = []
  if (isUsualItem && userProfile?.usualDrink?.addOns) {
    effectiveAddOns = [...userProfile.usualDrink.addOns]
  } else {
    if (userProfile?.tasteAffinities?.includes('spiced')) {
      effectiveAddOns.push('cardamom')
    }
  }

  // ---------------------------------------------------------------------------
  // 5. CALCULATE ACCURATE CRAFT PRICE
  // ---------------------------------------------------------------------------
  const basePrice = item.effectivePrice ?? item.price
  let finalPrice = basePrice

  // Size surcharge (only applies to standard volume Large)
  if (!isCraftFixedSize && effectiveSize === 'large') {
    finalPrice += 0.75
  }

  // Milk surcharge for plant dairy
  if (hasMilkOption && (effectiveMilk === 'oat' || effectiveMilk === 'almond')) {
    finalPrice += 0.50
  }

  // Add-on surcharges
  if (effectiveAddOns.includes('extra-shot')) finalPrice += 1.00
  if (effectiveAddOns.includes('rosewater')) finalPrice += 0.50
  if (effectiveAddOns.includes('tahini')) finalPrice += 0.50

  // ---------------------------------------------------------------------------
  // 6. ASSEMBLE COMPACT SPEC PREVIEW LABEL
  // ---------------------------------------------------------------------------
  const specParts = [
    sizeLabel,
    tempLabel,
    milkLabel
  ].filter(Boolean)

  const specPreviewLabel = specParts.join(' • ')

  // ---------------------------------------------------------------------------
  // 7. PASSPORT SHIELDING DETERMINATION
  // ---------------------------------------------------------------------------
  // A drink choice should ONLY be saveable to passport if it wasn't forced by a craft boundary!
  const hasCraftConstraints = isSizeConstrained || isTempConstrained || isMilkConstrained

  return {
    effectiveSize,
    sizeLabel,
    effectiveTemp,
    tempLabel,
    effectiveMilk,
    milkLabel,
    effectiveSweetness,
    effectiveAddOns,
    finalPrice,
    specPreviewLabel,
    isCraftFixedSize,
    isHotOnly,
    isIcedOnly,
    hasMilkOption,
    isSizeConstrained,
    isTempConstrained,
    isMilkConstrained,
    sizeConstraintReason,
    tempConstraintReason,
    milkConstraintReason,
    canBeSavedToPassport: !hasCraftConstraints
  }
}
