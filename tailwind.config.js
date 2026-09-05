/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fayrouz: {
          obsidian: "#0c0908", // Deepest canvas background (roasted beans)
          espresso: "#17110e", // Primary card & surface background
          surface: "#231a15",  // Elevated interactive panel / hover
          border: "#3a2b23",   // Subtle card outline
          amber: "#d4a373",    // Primary warm amber CTA & focus ring
          copper: "#b87333",   // Burnished metallic badge & border
          gold: "#e9c46a",     // Curated highlight, star picks
          cream: "#fefae0",    // High-contrast primary text
          foam: "#ede0d4",     // Secondary body text & tasting notes
          muted: "#8a7265",    // Tertiary metadata & placeholders
          cardamom: "#6b8e23", // Vegan & plant-based safe accent
          rose: "#c86d63",     // Adventurous pick & seasonal signature
          sky: "#6495ed",      // Iced chilled indicator
          ember: "#e07a5f",    // Steaming hot indicator
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['"Amiri"', '"Noto Naskh Arabic"', 'serif'],
      },
      boxShadow: {
        'amber-glow': '0 0 25px -5px rgba(212, 163, 115, 0.35)',
        'gold-glow': '0 0 30px -5px rgba(233, 196, 106, 0.4)',
        'rose-glow': '0 0 25px -5px rgba(200, 109, 99, 0.35)',
        'card-depth': '0 10px 30px -10px rgba(0, 0, 0, 0.65)',
        'copper-rim': 'inset 0 1px 0 0 rgba(184, 115, 51, 0.4), 0 8px 24px -4px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-12px) scaleX(1.15)', opacity: '0.3' },
          '100%': { transform: 'translateY(-24px) scaleX(1.3)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'steam': 'steam 3s infinite ease-out',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
