/**
 * Empirical Verification & Automated Test Suite for Fayrouz Personalization Engine
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rawMenu = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/menuData.json'), 'utf8'))
import { 
  evaluateItemSafety, 
  calculateMatchScore, 
  generatePersonalizedMenu,
  DIETARY_FLAGS,
  FLAVOR_PILLARS
} from './personalizationEngine.js'
import { generateCoffeePersona } from './personaGenerator.js'

let totalTests = 0
let passedTests = 0

function assert(condition, message) {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  ✓ PASS: ${message}`)
  } else {
    console.error(`  ✗ FAIL: ${message}`)
  }
}

console.log('🧪 Running Fayrouz Personalization Engine Verification Suite...\n')

// -------------------------------------------------------------
// Test 1: Menu Data Integrity
// -------------------------------------------------------------
console.log('--- Test Suite 1: Menu Data Schema Integrity ---')
assert(Array.isArray(rawMenu) && rawMenu.length >= 24, `Menu contains 24+ items (Actual: ${rawMenu.length})`)

const nutItems = rawMenu.filter(i => i.containsNuts)
assert(nutItems.length === 3, `Expected exactly 3 nut-containing items (Found: ${nutItems.length})`)

const naturallyVeganItems = rawMenu.filter(i => i.isVegan)
assert(naturallyVeganItems.length >= 10, `Expected 10+ naturally vegan items (Found: ${naturallyVeganItems.length})`)

const categories = new Set(rawMenu.map(i => i.category))
assert(categories.size === 5, `Expected 5 distinct categories (Found: ${categories.size})`)

// -------------------------------------------------------------
// Test 2: Nut Allergy Guardrails
// -------------------------------------------------------------
console.log('\n--- Test Suite 2: Nut Allergy Guardrail Verification ---')
const nutFreeProfile = { name: 'TestUser', dietary: [DIETARY_FLAGS.NUT_FREE], palateScore: 5, temperature: 'any' }
const nutFreeResult = generatePersonalizedMenu(rawMenu, nutFreeProfile)

assert(nutFreeResult.stats.unsafe === 3, `Nut-free filter flags exactly 3 items as unsafe (Found: ${nutFreeResult.stats.unsafe})`)
assert(nutFreeResult.curatedMatches.every(i => !i.containsNuts), 'Curated top matches contain zero nut items')
assert(nutFreeResult.adventurousPick ? !nutFreeResult.adventurousPick.containsNuts : true, 'Adventurous wildcard contains zero nut items')

const pistachioEvaluated = evaluateItemSafety(rawMenu.find(i => i.id === 'aleppo-pistachio-latte'), nutFreeProfile)
assert(pistachioEvaluated.isUnsafe === true && pistachioEvaluated.unsafeReason.includes('Pistachio'), 'Aleppo Pistachio latte explicitly flagged with allergen reason')

// -------------------------------------------------------------
// Test 3: Vegan & Plant Milk Substitution (+ Surcharge)
// -------------------------------------------------------------
console.log('\n--- Test Suite 3: Vegan Auto-Substitution & Surcharge Verification ---')
const veganProfile = { name: 'Salma', dietary: [DIETARY_FLAGS.VEGAN], palateScore: 6, temperature: 'any' }
const veganResult = generatePersonalizedMenu(rawMenu, veganProfile)

const cortadoItem = rawMenu.find(i => i.id === 'damascus-rose-cortado')
const cortadoEvaluated = evaluateItemSafety(cortadoItem, veganProfile)
assert(cortadoEvaluated.isAdapted === true, 'Damascus Rose Cortado is adapted to plant milk for vegans')
assert(cortadoEvaluated.appliedMilk === 'Oat Milk', 'Adapted milk is set to Oat Milk')
assert(cortadoEvaluated.effectivePrice === 6.25, `Oat milk surcharge (+$0.50) applied correctly ($5.75 -> $6.25, Actual: $${cortadoEvaluated.effectivePrice})`)

const honeyMielItem = rawMenu.find(i => i.id === 'vanilla-cardamom-miel')
const honeyMielEvaluated = evaluateItemSafety(honeyMielItem, veganProfile)
assert(honeyMielEvaluated.isUnsafe === true, 'Vanilla Cardamom Miel with raw honey is marked unsafe for strict vegans')

// -------------------------------------------------------------
// Test 4: Palate Extremes (Score 1 vs Score 9)
// -------------------------------------------------------------
console.log('\n--- Test Suite 4: Palate Extremes & Ranking Verification ---')
const puristProfile = { name: 'Tariq', dietary: [], palateScore: 1, temperature: 'hot' }
const puristResult = generatePersonalizedMenu(rawMenu, puristProfile)
assert(puristResult.curatedMatches[0].profileScore <= 2, `Purist (score 1) receives dark/bold coffee (Score: ${puristResult.curatedMatches[0].profileScore})`)
assert(puristResult.curatedMatches[0].category === 'espresso-black' || puristResult.curatedMatches[0].category === 'levantine-signature', 'Purist match is from Espresso or Levantine category')

const sweetProfile = { name: 'Areej', dietary: [], palateScore: 9, temperature: 'iced' }
const sweetResult = generatePersonalizedMenu(rawMenu, sweetProfile)
assert(sweetResult.curatedMatches[0].profileScore >= 8, `Sweet palate (score 9) receives sweet/velvet drink (Score: ${sweetResult.curatedMatches[0].profileScore})`)

// -------------------------------------------------------------
// Test 5: Temperature Preference Strictness
// -------------------------------------------------------------
console.log('\n--- Test Suite 5: Temperature Preference Strictness ---')
const icedOnlyProfile = { name: 'Layla', dietary: [], palateScore: 3, temperature: 'iced' }
const icedResult = generatePersonalizedMenu(rawMenu, icedOnlyProfile)

const rakwaInCurated = icedResult.curatedMatches.some(i => i.id === 'traditional-rakwa')
assert(!rakwaInCurated, 'Strictly hot item (Traditional Rakwa) is NOT in curated top shelf for Iced profile')

const rakwaInCatalog = icedResult.categorizedMenu['levantine-signature'].items.find(i => i.id === 'traditional-rakwa')
assert(rakwaInCatalog && rakwaInCatalog.temperatureMismatch === true, 'Traditional Rakwa remains visible in full catalog with temperatureMismatch flag')
assert(rakwaInCatalog.tempNotice === 'Hot Only', 'Traditional Rakwa displays "Hot Only" badge notice')

// -------------------------------------------------------------
// Test 6: Adventurous Wildcard Quality
// -------------------------------------------------------------
console.log('\n--- Test Suite 6: Adventurous Wildcard ("Expand Your Palate") ---')
assert(puristResult.adventurousPick !== null, 'Purist profile generates an adventurous wildcard pick')
assert(puristResult.adventurousPick.wildcardDelta >= 3 && puristResult.adventurousPick.wildcardDelta <= 5, 
  `Wildcard delta is between 3 and 5 (Actual delta: ${puristResult.adventurousPick.wildcardDelta})`)
assert(typeof puristResult.adventurousPick.whyYouWillLoveThis === 'string' && puristResult.adventurousPick.whyYouWillLoveThis.length > 20, 
  'Wildcard includes a bespoke Levantine storytelling rationale')

// -------------------------------------------------------------
// Test 7: Multi-Flavor Pillar Affinity Matching
// -------------------------------------------------------------
console.log('\n--- Test Suite 7: Multi-Flavor Pillar Affinity Matching ---')
assert(Array.isArray(FLAVOR_PILLARS) && FLAVOR_PILLARS.length === 5, 'Defined exactly 5 Levantine Flavor Pillars')

const floralCitrusProfile = {
  name: 'Salma',
  dietary: [DIETARY_FLAGS.VEGAN],
  tasteAffinities: ['floral', 'citrus'],
  roastPreference: 'light',
  sweetnessPreference: 'subtle',
  temperature: 'iced'
}
const floralCitrusResult = generatePersonalizedMenu(rawMenu, floralCitrusProfile)
const topItem = floralCitrusResult.curatedMatches[0]
assert(topItem.matchScore > 70, `Top curated match has high affinity match score (${topItem.matchScore}%)`)
assert(
  topItem.tastingNotes.some(note => ['Rose', 'Orange', 'Bergamot', 'Jasmine', 'Citrus', 'Cascara'].some(k => note.includes(k))),
  `Top curated item matches floral or citrus flavor pillars (Item: ${topItem.name}, Notes: ${topItem.tastingNotes.join(', ')})`
)

// -------------------------------------------------------------
// Test 8: Roast and Sweetness Scoring Verification
// -------------------------------------------------------------
console.log('\n--- Test Suite 8: Roast & Sweetness Scoring Verification ---')
const darkItem = rawMenu.find(i => i.roastLevel === 'Medium-Dark')
const lightItem = rawMenu.find(i => i.roastLevel === 'Light')

const darkRoastProfile = { name: 'Tariq', dietary: [], roastPreference: 'dark', sweetnessPreference: 'unsweetened' }
const lightRoastProfile = { name: 'Noor', dietary: [], roastPreference: 'light', sweetnessPreference: 'subtle' }

const darkScoreForDark = calculateMatchScore(darkItem, darkRoastProfile)
const lightScoreForDark = calculateMatchScore(lightItem, darkRoastProfile)
assert(darkScoreForDark > lightScoreForDark, `Dark roast lover scores dark item higher than light item (${darkScoreForDark} vs ${lightScoreForDark})`)

const lightScoreForLight = calculateMatchScore(lightItem, lightRoastProfile)
const darkScoreForLight = calculateMatchScore(darkItem, lightRoastProfile)
assert(lightScoreForLight > darkScoreForLight, `Light roast lover scores light item higher than dark item (${lightScoreForLight} vs ${darkScoreForLight})`)

// -------------------------------------------------------------
// Test 9: Persona Generation & Phone Masking
// -------------------------------------------------------------
console.log('\n--- Test Suite 9: Persona Generation & Phone Masking ---')
const areejPersona = generateCoffeePersona({
  name: 'Areej',
  phone: '+961 3 456 789',
  dietary: [DIETARY_FLAGS.LACTOSE_FREE],
  tasteAffinities: ['silky', 'spiced'],
  roastPreference: 'medium',
  sweetnessPreference: 'sweet',
  temperature: 'iced'
})

assert(areejPersona.title.includes('Sweet Velvet') || areejPersona.title.includes('Microfoam'), `Areej persona reflects silky sweet profile (Title: "${areejPersona.title}")`)
assert(areejPersona.maskedPhone.includes('••••'), `Areej phone number is masked with bullet characters (Masked: "${areejPersona.maskedPhone}")`)
assert(areejPersona.passportNumber.startsWith('AMB-') || areejPersona.passportNumber.startsWith('FYZ-'), `Passport number is generated with brand prefix (${areejPersona.passportNumber})`)
assert(areejPersona.flavorPillarBadges.length === 2, `Badges include both selected flavor pillars (${areejPersona.flavorPillarBadges.join(', ')})`)

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log(`\n========================================`)
console.log(`Engine Verification Results: ${passedTests}/${totalTests} Passed`)
console.log(`========================================\n`)

if (passedTests === totalTests) {
  console.log('🎉 ALL ENGINE VERIFICATION TESTS PASSED!')
} else {
  console.error('❌ Some tests failed.')
  process.exit(1)
}

