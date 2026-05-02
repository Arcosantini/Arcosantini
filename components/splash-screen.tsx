"use client"

import { useEffect, useState } from "react"
import { Shield } from "lucide-react"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [theme, setTheme] = useState("dark-blue")

  useEffect(() => {
    const savedTheme = localStorage.getItem("mss-theme") || "dark-blue"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)

    // Hide splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  const isLightTheme = ["light-blue", "light-pink", "mint-green", "white"].includes(theme)
  const bgClass = isLightTheme ? "bg-background" : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
  const logoColor = isLightTheme ? "text-primary" : "text-blue-400"
  const textColor = isLightTheme ? "text-foreground" : "text-white"
  const subtextColor = isLightTheme ? "text-muted-foreground" : "text-slate-400"

  return (
    <div className={`fixed inset-0 z-[9999] ${bgClass} flex items-center justify-center animate-fade-in`}>
      <div className="flex flex-col items-center gap-4 animate-scale-in">
        {/* MSS Logo */}
        <Shield className={`h-20 w-20 ${logoColor}`} />

        {/* MSS Text */}
        <div className="flex flex-col items-center gap-1">
          <h1 className={`text-4xl font-bold ${textColor}`}>MSS</h1>
          <p className={`text-sm ${subtextColor}`}>by</p>
          <p className={`text-base ${isLightTheme ? "text-foreground" : "text-slate-300"}`}>theho.one</p>
        </div>
      </div>
    </div>
  )
}
