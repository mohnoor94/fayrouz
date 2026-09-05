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
  const [activeDeviceView, setActiveDeviceView] = useState('split') // 'split' | 'mobile' | 'tablet' | 'barista' | 'playground'
  const [orderTray, setOrderTray] = useState([])
  const [activePresetId, setActivePresetId] = useState(null)
  const [baristaOrders, setBaristaOrders] = useState([
    {
      ticketNumber: '101',
      customerName: 'Tariq Al-Mansoor',
      customerNameAr: 'طارق',
      dialectCode: 'TDNR',
      dialectTitle: 'The Obsidian Monk',
      timestamp: '4 mins ago',
      elapsedSeconds: 240,
      status: 'ready',
      hasCompanionItem: false,
      items: [
        {
          id: 'sidama-espresso-1',
          name: 'Sidama Double Espresso',
          nameAr: 'إسبريسو سيداما المزدوج',
          quantity: 1,
          effectivePrice: 4.25,
          customizations: { temperature: 'hot', milk: null, sweetness: '0' },
          customizedName: 'Sidama Double Espresso (Hot, Double Shot, Pure Black)',
          isFriendDrink: false
        }
      ],
      subtotal: 4.25,
      tax: 0.34,
      total: 4.59
    },
    {
      ticketNumber: '102',
      customerName: 'Noor Al-Din',
      customerNameAr: 'نور الدين',
      dialectCode: 'TLNR',
      dialectTitle: 'The High-Altitude Sage',
      timestamp: '1 min ago',
      elapsedSeconds: 75,
      status: 'in-prep',
      hasCompanionItem: false,
      items: [
        {
          id: 'flat-white-1',
          name: 'Classic Oat Flat White',
          nameAr: 'فلات وايت بالشوفان',
          quantity: 1,
          effectivePrice: 5.75,
          customizations: { temperature: 'hot', milk: 'oat', sweetness: '25', addOns: ['extra-shot'] },
          customizedName: 'Classic Oat Flat White (Hot, 16 oz, Oat Milk, +Extra Shot)',
          isFriendDrink: false
        }
      ],
      subtotal: 5.75,
      tax: 0.46,
      total: 6.21
    }
  ])

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
    setOrderTray([])
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

  const submitOrderToBarista = useCallback((orderData) => {
    const newOrder = {
      ticketNumber: orderData.ticketNumber,
      customerName: orderData.customerName || userProfile.name || 'Specialty Guest',
      customerNameAr: orderData.customerNameAr || userProfile.nameAr || '',
      dialectCode: orderData.dialectCode || 'POLY',
      dialectTitle: orderData.dialectTitle || 'The Polyglot Craftsman',
      timestamp: 'Just now',
      elapsedSeconds: 0,
      status: 'in-prep',
      hasCompanionItem: Boolean(orderData.hasCompanionItem),
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      tax: orderData.tax || 0,
      total: orderData.total || 0
    }
    setBaristaOrders(prev => [newOrder, ...prev])
  }, [userProfile])

  const markBaristaOrderReady = useCallback((ticketNumber) => {
    soundFx.playCelebration()
    setBaristaOrders(prev => prev.map(order => 
      order.ticketNumber === ticketNumber 
        ? { ...order, status: 'ready', completedAt: 'Just now' } 
        : order
    ))
  }, [])

  const clearBaristaOrders = useCallback(() => {
    setBaristaOrders([])
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
    baristaOrders,

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
    submitOrderToBarista,
    markBaristaOrderReady,
    clearBaristaOrders,
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
