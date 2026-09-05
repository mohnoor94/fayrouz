# Fayrouz (فيروز)

> **Sensory AI & Universal Taste Passport for Specialty Coffee**

Fayrouz is an agentic, personalized specialty coffee ordering platform designed for high-throughput Levant & Gulf coffeehouses. It combines 60-second sensory onboarding, NFC VAS hardware integration, and instant barista transmission.

---

## The Ecosystem Relationship

| Entity | Role in the Ecosystem | Scope |
| :--- | :--- | :--- |
| **Fayrouz (فيروز)** | The AI personalization platform, recommendation engine, and global specialty network. | Global Network |
| **FayrouzPass™ (جواز فيروز الموحد)** | The **guest's personal, universal taste identity** (16 Dialects, flavor pillars, oat milk preference, temperature defaults, dietary & allergen safeguards). Carried in Apple Wallet & Google Wallet. | Universal to Guest everywhere across the world |
| **Ambar / Turath / Qahwatna / Naranj / Al-Mada** | Participating partner coffeehouse venues & specialty roasters running Fayrouz-powered kiosks and barista bars. | Local Venue / Current Host Location |

> 📖 **Full Architectural Guide**: See [`AGENTS.md`](./AGENTS.md) and [`docs/ECOSYSTEM.md`](./docs/ECOSYSTEM.md).

---

## Core Features

- **The 16 Coffee Dialects™**: Myers-Briggs/Enneagram-style sensory typing mapping terroir, roast, body, and sweetness into 16 distinct archetypes (plus Polyglot).
- **FayrouzPass™ Universal NFC Sync**: Apple Wallet (Apple VAS) & Google Wallet (Smart Tap) pass integration for 1-tap ordering at any Fayrouz-enabled roastery.
- **Companion Order Guardrails**: Dietary/allergen conflicts (nuts, dairy) remain orderable for companions with explicit confirmation dialogs and barista sanitization tags.
- **Dual-Device Live Pitch Mode**: Synchronized mobile onboarding and split kiosk demonstration view with business metrics & speed telemetry HUD.

---

## Development & Verification

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run personalization engine verification test suite (80+ unit tests)
node src/utils/personalizationEngine.test.js

# Build production bundle
npm run build
```