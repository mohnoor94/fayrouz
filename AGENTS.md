# The Ecosystem Relationship & Brand Architecture

> **CRITICAL ARCHITECTURAL RULE FOR ALL AGENTS & DEVELOPERS:**
> Do NOT mix up the local Coffeehouse Venue (Ambar, Turath, Qahwatna, etc.) with the Universal Guest Pass (FayrouzPass™).

---

## 1. The Core Ecosystem Roles

| Entity | Role in the Ecosystem | Scope | Brand Identity |
| :--- | :--- | :--- | :--- |
| **Fayrouz (فيروز)** | The AI personalization platform, recommendation engine, and global specialty network. | Global Network | `Fayrouz (فيروز)` |
| **FayrouzPass™ (جواز فيروز الموحد)** | The **guest's personal, universal taste identity** (16 Dialects, flavor pillars, milk preferences, craft ratios, dietary safeguards). Carried in Apple Wallet & Google Wallet. | Universal to Guest everywhere worldwide | `FAYROUZPASS™ NFC • Universal Coffee Identity` (Prefix: `FYZ`) |
| **Ambar / Turath / Qahwatna / Naranj / Al-Mada** | Participating partner coffeehouse venues & specialty roasters running Fayrouz-powered kiosks and barista bars. | Local Venue / Current Host Location | Managed in `src/constants/brandConfig.js` |

---

## 2. Inviolable Design & Code Principles

1. **The Pass is ALWAYS FayrouzPass™**:
   - The Apple Wallet and Google Wallet pass belongs to **Fayrouz and the Guest**.
   - It is valid across **ALL** partner coffeehouses in the Fayrouz network worldwide.
   - It must **NEVER** be branded as a single coffeehouse card (e.g., NEVER show "AMBAR NFC Pass", "Ambar (عنبر)" as the pass title, or tie the pass to one venue).
   - Pass header must strictly display:
     - Title: `FAYROUZPASS™ NFC`
     - Subtitle: `Universal Coffee Identity` • `(جواز القهوة الموحد)`
     - Badge: `FAYROUZ GLOBAL NETWORK • Valid Across All Roasters`

2. **Coffeehouse Venue Customization (`BRAND_CONFIG`)**:
   - `BRAND_CONFIG` in `src/constants/brandConfig.js` configures the **current physical venue** where the kiosk and barista bar are hosted (e.g. "AMBAR SPECIALTY ROASTERS").
   - It is displayed on:
     - Kiosk header & welcome splash
     - Barista preparation queue & order ticket headers (`AMBAR • ORDER #104`)
     - In-venue order receipts
   - It does **NOT** own, brand, or restrict the customer's `FayrouzPass™`.

3. **Global Portability Everywhere**:
   - A customer profiles their taste at Ambar in Amman, saves their FayrouzPass™ to Apple Wallet or Google Wallet, and travels to Dubai, Riyadh, Beirut, or London.
   - When tapping their phone at Turath or Qahwatna, their exact taste dialect, oat milk substitution, and allergen safeguards load immediately on the local kiosk and transmit directly to the local barista.
