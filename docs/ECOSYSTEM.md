# Fayrouz (فيروز) — The Ecosystem Relationship

This document establishes the official brand architecture and relationship between the **Fayrouz Platform**, the **Universal FayrouzPass™**, and the **Partner Coffeehouses**.

---

## 1. Architectural Model

```
                    ┌─────────────────────────────────────────┐
                    │            FAYROUZ (فيروز)             │
                    │   AI Personalization Engine & Network    │
                    └────────────────────┬────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
                 ▼                                               ▼
   ┌───────────────────────────┐                   ┌───────────────────────────┐
   │       FAYROUZPASS™        │                   │    PARTNER COFFEEHOUSES   │
   │  Universal Taste Passport │                   │   (Kiosks & Barista Bars) │
   │  in Apple & Google Wallet │                   │   e.g. Ambar, Turath, etc │
   └─────────────┬─────────────┘                   └─────────────┬─────────────┘
                 │                                               │
                 │  Guest Taps Phone via NFC VAS / Smart Tap     │
                 └───────────────────────►◄──────────────────────┘
                              Instant Dialect Profile Sync
                              Curated 3-Cup Menu Loading
                              Allergen Safeguards Enforcement
```

---

## 2. Entity Breakdown & Responsibilities

### A. Fayrouz (فيروز) — The Platform & Network
- **What it is**: The overarching specialty coffee AI platform, sensory recommendation engine, and global roaster network.
- **Scope**: Global network.
- **Responsibilities**:
  - The 16 Coffee Dialects™ classification.
  - Sensory matching algorithm (Palate Intensity, Roast, Sweetness, Flavor Pillars).
  - Cross-venue profile synchronization via NFC (Apple VAS & Google Smart Tap).
  - Dietary & Allergen guardrails engine.

### B. FayrouzPass™ (جواز فيروز الموحد) — The Customer's Universal Passport
- **What it is**: The customer's personal, portable taste credential stored in Apple Wallet and Google Wallet.
- **Scope**: Universal to the customer everywhere worldwide.
- **Identifier**: `FYZ-XXXX` (Prefix is always `FYZ`, never venue-specific).
- **Contains**:
  - Member Name & Masked Phone Number
  - 16 Dialects Archetype (e.g. `ADSV • The Velvet Pistachio Maverick`)
  - Permanent Craft Specifications (Default Milk, Temperature, Sweetness)
  - Active Dietary & Allergen Safeguards (Nut-Free, Vegan, Lactose-Free)
- **Key Rule**: **The pass is never branded to a single venue.** It displays `FAYROUZPASS™ NFC • Universal Coffee Identity (جواز القهوة الموحد)`.

### C. Partner Coffeehouses (e.g. Ambar, Turath, Qahwatna) — The Venues
- **What they are**: Specialty coffeehouses, artisan roasters, and cafes that run Fayrouz-powered hardware (Kiosks and Barista Bar displays).
- **Scope**: Local physical venue.
- **Configured via**: `src/constants/brandConfig.js`.
- **Where Venue Branding Appears**:
  - Kiosk Header: `AMBAR SPECIALTY ROASTERS (محمصة عنبر للقهوة المختصة)`
  - Welcome Splash: *"Welcome to AMBAR SPECIALTY ROASTERS"*
  - Barista Order Ticket: `AMBAR • ORDER #104`
  - Printed / Digital Receipts
- **Where Venue Branding Does NOT Appear**:
  - The Apple Wallet / Google Wallet pass header (which is strictly `FAYROUZPASS™`).

---

## 3. The Customer Journey Across Venues

1. **Onboarding at Ambar (Amman)**:
   - Guest visits Ambar and completes the 60-second Fayrouz onboarding on their mobile device or the kiosk.
   - Guest receives their `ADSV` persona and adds **FayrouzPass™** to their Apple Wallet.
2. **First Order at Ambar**:
   - Guest taps phone at Ambar's Fayrouz kiosk.
   - Ambar's menu instantly personalizes with curated recommendations, allergen flags, and oat milk adaptations.
   - Order sent to Barista Noor at Ambar.
3. **Traveling to Turath (Dubai)**:
   - Guest enters Turath Specialty Roasters in Dubai.
   - Guest does **NOT** re-register or create a new profile.
   - Guest holds their locked iPhone near Turath's Fayrouz reader.
   - Turath's kiosk greets them by name, recognizes their `ADSV` profile, enforces their nut allergy, and curates Turath's own bean catalog to their exact palate.
