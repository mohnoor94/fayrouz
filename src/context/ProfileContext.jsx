import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'
import rawMenuData from '../data/menuData.json'
import { 
  generatePersonalizedMenu, 
  DIETARY_FLAGS 
} from '../utils/personalizationEngine.js'

// One-click pitch demonstration presets
export const DEMO_PRESETS = [
  {
    id: 'purist',
    name: 'Tariq',
    nameAr: 'طارق',
    title: 'The Single-Origin Purist',
    description: 'Black, intense, unadulterated high-altitude extraction.',
    profile: {
      name: 'Tariq',
      phone: '+962 79 010 0101',
      dietary: [],
      tasteAffinities: ['cacao', 'spiced'],
      roastPreference: 'dark',
      sweetnessPreference: 'unsweetened',
      palateScore: 1,
      temperature: 'hot',
      preferredSize: 'regular',
      preferredMilk: null,
      usualDrink: {
        itemId: 'sidama-double-espresso',
        size: 'regular',
        temperature: 'hot',
        milk: null,
        sweetness: '0',
        addOns: [],
        orderCount: 18,
        lastOrdered: 'Yesterday, 9:15 AM',
        note: 'Double Ristretto • Hot • 0% Unsweetened'
      }
    }
  },
  {
    id: 'vegan',
    name: 'Salma',
    nameAr: 'سلمى',
    title: 'The Plant-Based Nomad',
    description: 'Zero dairy, strict nut allergy guardrails, iced preference.',
    profile: {
      name: 'Salma',
      phone: '+971 50 234 5678',
      dietary: [DIETARY_FLAGS.VEGAN, DIETARY_FLAGS.NUT_FREE],
      tasteAffinities: ['floral', 'citrus'],
      roastPreference: 'light',
      sweetnessPreference: 'subtle',
      palateScore: 5,
      temperature: 'iced',
      preferredSize: 'regular',
      preferredMilk: 'oat',
      usualDrink: {
        itemId: 'damascus-rose-cortado',
        size: 'regular',
        temperature: 'iced',
        milk: 'oat',
        sweetness: '25',
        addOns: ['rosewater'],
        orderCount: 14,
        lastOrdered: 'Today, 8:30 AM',
        note: 'Flash Iced (12 oz) • Oat Milk Swapped • Rose Mist'
      }
    }
  },
  {
    id: 'sweet',
    name: 'Areej',
    nameAr: 'أريج',
    title: 'The Sweet Velvet Seeker',
    description: 'Lactose-free, rich caramel and fragrant condensed sweetness.',
    profile: {
      name: 'Areej',
      phone: '+961 3 456 789',
      dietary: [DIETARY_FLAGS.LACTOSE_FREE],
      tasteAffinities: ['silky', 'spiced'],
      roastPreference: 'medium',
      sweetnessPreference: 'sweet',
      palateScore: 9,
      temperature: 'iced',
      preferredSize: 'large',
      preferredMilk: 'oat',
      usualDrink: {
        itemId: 'aleppo-pistachio-latte',
        size: 'large',
        temperature: 'iced',
        milk: 'oat',
        sweetness: '100',
        addOns: ['cardamom'],
        orderCount: 19,
        lastOrdered: '2 days ago',
        note: 'Flash Iced (16 oz Large) • Oat Milk • Rich Sweet • Cardamom'
      }
    }
  },
  {
    id: 'balanced',
    name: 'Noor',
    nameAr: 'نور',
    title: 'The Levantine Connoisseur',
    description: 'Harmonious balance of aromatics, cardamom, and heritage.',
    profile: {
      name: 'Noor',
      phone: '+1 415 555 2671',
      dietary: [],
      tasteAffinities: ['floral', 'cacao', 'spiced'],
      roastPreference: 'medium',
      sweetnessPreference: 'subtle',
      palateScore: 5,
      temperature: 'any',
      preferredSize: 'large',
      preferredMilk: 'oat',
      usualDrink: {
        itemId: 'classic-oat-flat-white',
        size: 'large',
        temperature: 'hot',
        milk: 'oat',
        sweetness: '25',
        addOns: ['extra-shot'],
        orderCount: 22,
        lastOrdered: 'Yesterday, 10:00 AM',
        note: 'Steaming Hot (16 oz Large) • Velvety Oat Microfoam • Extra Double Shot'
      }
    }
  }
]

const DEFAULT_PROFILE = {
  name: 'Layla',
  phone: '+962 79 555 1234',
  dietary: [],
  tasteAffinities: ['floral', 'spiced'],
  roastPreference: 'medium',
  sweetnessPreference: 'subtle',
  palateScore: 5,
  temperature: 'any',
  preferredSize: 'regular',
  preferredMilk: 'whole',
  usualDrink: {
    itemId: 'damascus-rose-cortado',
    size: 'regular',
    temperature: 'hot',
    milk: 'whole',
    sweetness: '25',
    addOns: ['cardamom'],
    orderCount: 9,
    lastOrdered: '3 days ago',
    note: 'Steaming Hot (12 oz Reg) • Subtle Touch • Green Cardamom'
  }
}

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState(DEFAULT_PROFILE)
  const [wizardStep, setWizardStep] = useState(0) // 0 to 5
  const [isProfileCompleted, setIsProfileCompleted] = useState(false)
  const [isNfcSynced, setIsNfcSynced] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isKioskWizardOpen, setIsKioskWizardOpen] = useState(false)
  const [activeDeviceView, setActiveDeviceView] = useState('split') // 'split' | 'mobile' | 'tablet'
  const [orderTray, setOrderTray] = useState([])
  const [activePresetId, setActivePresetId] = useState(null)

  // Derived personalized menu: recalculated instantly when userProfile changes
  const personalizedMenu = useMemo(() => {
    return generatePersonalizedMenu(rawMenuData, userProfile)
  }, [userProfile])

  // Profile actions
  const updateProfile = useCallback((patch) => {
    setUserProfile(prev => ({ ...prev, ...patch }))
    setActivePresetId(null)
  }, [])

  const toggleDietary = useCallback((flag) => {
    setUserProfile(prev => {
      const exists = prev.dietary.includes(flag)
      const newDietary = exists
        ? prev.dietary.filter(f => f !== flag)
        : [...prev.dietary, flag]
      return { ...prev, dietary: newDietary }
    })
    setActivePresetId(null)
  }, [])

  const toggleTasteAffinity = useCallback((affinityId) => {
    setUserProfile(prev => {
      const current = prev.tasteAffinities || []
      const exists = current.includes(affinityId)
      if (exists) {
        return { ...prev, tasteAffinities: current.filter(id => id !== affinityId) }
      }
      // Maximum 3 favorites allowed
      if (current.length >= 3) {
        return prev // already reached 3
      }
      return { ...prev, tasteAffinities: [...current, affinityId] }
    })
    setActivePresetId(null)
  }, [])

  const setRoastPreference = useCallback((roast) => {
    setUserProfile(prev => ({ ...prev, roastPreference: roast }))
    setActivePresetId(null)
  }, [])

  const setSweetnessPreference = useCallback((sweetness) => {
    setUserProfile(prev => ({ ...prev, sweetnessPreference: sweetness }))
    setActivePresetId(null)
  }, [])

  const setPalateScore = useCallback((score) => {
    setUserProfile(prev => ({ ...prev, palateScore: Math.max(1, Math.min(10, Number(score))) }))
    setActivePresetId(null)
  }, [])

  const setTemperature = useCallback((temperature) => {
    setUserProfile(prev => ({ ...prev, temperature }))
    setActivePresetId(null)
  }, [])

  const nextStep = useCallback(() => {
    setWizardStep(prev => Math.min(5, prev + 1))
  }, [])

  const prevStep = useCallback(() => {
    setWizardStep(prev => Math.max(0, prev - 1))
  }, [])

  const completeProfile = useCallback(() => {
    setIsProfileCompleted(true)
    setWizardStep(5)
  }, [])

  // Simulated NFC Handshake Beam
  const triggerNfcSync = useCallback(() => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setIsNfcSynced(true)
    }, 1200)
  }, [])

  const resetNfcSync = useCallback(() => {
    setIsNfcSynced(false)
    setIsSyncing(false)
  }, [])

  // Pitch demo preset loader
  const loadPreset = useCallback((presetId) => {
    const preset = DEMO_PRESETS.find(p => p.id === presetId)
    if (preset) {
      setUserProfile(preset.profile)
      setActivePresetId(presetId)
      setIsProfileCompleted(true)
      setWizardStep(5)
    }
  }, [])

  const resetProfile = useCallback(() => {
    setUserProfile(DEFAULT_PROFILE)
    setWizardStep(0)
    setIsProfileCompleted(false)
    setIsNfcSynced(false)
    setIsSyncing(false)
    setIsKioskWizardOpen(false)
    setOrderTray([])
    setActivePresetId(null)
  }, [])

  // Order tray actions
  const addToOrderTray = useCallback((item) => {
    setOrderTray(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const decreaseOrderTrayQuantity = useCallback((itemId) => {
    setOrderTray(prev => {
      const existing = prev.find(i => i.id === itemId)
      if (!existing) return prev
      if (existing.quantity <= 1) {
        return prev.filter(i => i.id !== itemId)
      }
      return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)
    })
  }, [])

  const removeFromOrderTray = useCallback((itemId) => {
    setOrderTray(prev => prev.filter(i => i.id !== itemId))
  }, [])

  const clearOrderTray = useCallback(() => {
    setOrderTray([])
  }, [])

  const value = {
    // State
    rawMenuData,
    userProfile,
    personalizedMenu,
    wizardStep,
    isProfileCompleted,
    isNfcSynced,
    isSyncing,
    isKioskWizardOpen,
    activeDeviceView,
    orderTray,
    activePresetId,
    demoPresets: DEMO_PRESETS,

    // Setters & Actions
    updateProfile,
    toggleDietary,
    toggleTasteAffinity,
    setRoastPreference,
    setSweetnessPreference,
    setPalateScore,
    setTemperature,
    setWizardStep,
    nextStep,
    prevStep,
    completeProfile,
    triggerNfcSync,
    resetNfcSync,
    setIsKioskWizardOpen,
    setActiveDeviceView,
    addToOrderTray,
    decreaseOrderTrayQuantity,
    removeFromOrderTray,
    clearOrderTray,
    loadPreset,
    resetProfile
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
