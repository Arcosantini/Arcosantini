"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface DemoModeContextType {
  isDemoMode: boolean
  setDemoMode: (value: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  dismissHint: (hintId: string) => void
  isHintDismissed: (hintId: string) => boolean
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined)

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set())

  useEffect(() => {
    const saved = localStorage.getItem("mss-demo-mode")
    if (saved === "true") {
      setIsDemoMode(true)
    }
  }, [])

  const setDemoMode = (value: boolean) => {
    setIsDemoMode(value)
    localStorage.setItem("mss-demo-mode", value.toString())
    if (value) {
      setCurrentStep(0)
      setDismissedHints(new Set())
    }
  }

  const dismissHint = (hintId: string) => {
    setDismissedHints((prev) => new Set(prev).add(hintId))
  }

  const isHintDismissed = (hintId: string) => dismissedHints.has(hintId)

  return (
    <DemoModeContext.Provider
      value={{
        isDemoMode,
        setDemoMode,
        currentStep,
        setCurrentStep,
        dismissHint,
        isHintDismissed,
      }}
    >
      {children}
    </DemoModeContext.Provider>
  )
}

export function useDemoMode() {
  const context = useContext(DemoModeContext)
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoModeProvider")
  }
  return context
}
