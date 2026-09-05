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
      dietary: [],
      palateScore: 1,
      temperature: 'hot'
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
      dietary: [DIETARY_FLAGS.VEGAN, DIETARY_FLAGS.NUT_FREE],
      palateScore: 5,
      temperature: 'iced'
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
      dietary: [DIETARY_FLAGS.LACTOSE_FREE],
      palateScore: 9,
      temperature: 'iced'
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
      dietary: [],
      palateScore: 5,
      temperature: 'any'
    }
  }
]

const DEFAULT_PROFILE = {
  name: 'Layla',
  dietary: [],
  palateScore: 5,
  temperature: 'any'
}

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState(DEFAULT_PROFILE)
  const [wizardStep, setWizardStep] = useState(0) // 0 to 4
  const [isProfileCompleted, setIsProfileCompleted] = useState(false)
  const [isNfcSynced, setIsNfcSynced] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
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

  const setPalateScore = useCallback((score) => {
    setUserProfile(prev => ({ ...prev, palateScore: Math.max(1, Math.min(10, Number(score))) }))
    setActivePresetId(null)
  }, [])

  const setTemperature = useCallback((temperature) => {
    setUserProfile(prev => ({ ...prev, temperature }))
    setActivePresetId(null)
  }, [])

  const nextStep = useCallback(() => {
    setWizardStep(prev => Math.min(4, prev + 1))
  }, [])

  const prevStep = useCallback(() => {
    setWizardStep(prev => Math.max(0, prev - 1))
  }, [])

  const completeProfile = useCallback(() => {
    setIsProfileCompleted(true)
    setWizardStep(4)
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
      setWizardStep(4)
    }
  }, [])

  const resetProfile = useCallback(() => {
    setUserProfile(DEFAULT_PROFILE)
    setWizardStep(0)
    setIsProfileCompleted(false)
    setIsNfcSynced(false)
    setIsSyncing(false)
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
    activeDeviceView,
    orderTray,
    activePresetId,
    demoPresets: DEMO_PRESETS,

    // Setters & Actions
    updateProfile,
    toggleDietary,
    setPalateScore,
    setTemperature,
    setWizardStep,
    nextStep,
    prevStep,
    completeProfile,
    triggerNfcSync,
    resetNfcSync,
    setActiveDeviceView,
    addToOrderTray,
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
