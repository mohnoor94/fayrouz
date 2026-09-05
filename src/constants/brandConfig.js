/**
 * Coffeehouse Host Venue Configuration
 * 
 * Defines the local specialty cafe venue where the kiosk and barista bar are stationed
 * (e.g. Ambar, Turath, Qahwatna).
 * 
 * NOTE: The customer's digital pass is ALWAYS FayrouzPass™ (Prefix: 'FYZ') — it is a
 * universal taste passport valid across ALL network roasters, not a venue-specific card.
 * See AGENTS.md and docs/ECOSYSTEM.md for the full architecture.
 */

export const BRAND_CONFIG = {
  // Current Host Venue Identity
  id: 'ambar',
  name: 'AMBAR SPECIALTY ROASTERS',
  shortName: 'AMBAR',
  nameAr: 'محمصة عنبر للقهوة المختصة',
  shortNameAr: 'عنبر',
  city: 'Amman & Dubai',
  established: '2024',
  tagline: 'Terroir, Heritage & Sensory Craft',
  taglineAr: 'الأصالة، الإرث، وفنون التذوق',

  // Supported Alternative Brand Options for Easy Switching
  availableBrands: [
    {
      id: 'ambar',
      name: 'AMBAR SPECIALTY ROASTERS',
      shortName: 'AMBAR',
      nameAr: 'محمصة عنبر للقهوة المختصة',
      shortNameAr: 'عنبر',
      passportPrefix: 'AMB'
    },
    {
      id: 'qahwatna',
      name: 'QAHWATNA SPECIALTY ROASTERS',
      shortName: 'QAHWATNA',
      nameAr: 'محمصة قهوتنا التراثية',
      shortNameAr: 'قهوتنا',
      passportPrefix: 'QHW'
    },
    {
      id: 'turath',
      name: 'TURATH COFFEE ROASTERS',
      shortName: 'TURATH',
      nameAr: 'محمصة تراث للقهوة المختصة',
      shortNameAr: 'تراث',
      passportPrefix: 'TRH'
    },
    {
      id: 'naranj',
      name: 'NARANJ ARTISANAL COFFEE',
      shortName: 'NARANJ',
      nameAr: 'محمصة نارنج الحرفية',
      shortNameAr: 'نارنج',
      passportPrefix: 'NRJ'
    },
    {
      id: 'almada',
      name: 'AL-MADA SPECIALTY COFFEE',
      shortName: 'AL-MADA',
      nameAr: 'محمصة المدى المختصة',
      shortNameAr: 'المدى',
      passportPrefix: 'MDA'
    }
  ]
}
