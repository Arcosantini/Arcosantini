"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useDemoMode } from "@/components/demo-mode-provider"
import { BottomNav } from "@/components/bottom-nav"

type Theme = "dark-blue" | "light-blue" | "light-pink" | "mint-green" | "white"

const themes = [
  { value: "dark-blue", label: "Dark Blue (Original)", color: "bg-slate-900" },
  { value: "light-blue", label: "Light Blue", color: "bg-blue-100" },
  { value: "light-pink", label: "Light Pink", color: "bg-pink-100" },
  { value: "mint-green", label: "Mint Green", color: "bg-green-100" },
  { value: "white", label: "White", color: "bg-white" },
]

export default function SettingsPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>("dark-blue")
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()
  const { isDemoMode, setDemoMode } = useDemoMode()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)
    }
    checkUser()

    // Load saved theme
    const savedTheme = localStorage.getItem("mss-theme") as Theme
    if (savedTheme) {
      setSelectedTheme(savedTheme)
    }
  }, [router, supabase.auth])

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme)
    localStorage.setItem("mss-theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-lg mx-auto flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="flex-1 text-center text-xl font-semibold pr-10">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Legal Section */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Legal</h2>
          
          <Link href="/privacy" className="block py-4 hover:bg-accent/50 transition-colors -mx-4 px-4">
            <span className="text-foreground">Privacy Policy</span>
          </Link>
          
          <Separator />
          
          <Link href="/data-deletion" className="block py-4 hover:bg-accent/50 transition-colors -mx-4 px-4">
            <span className="text-foreground">Data Deletion Policy</span>
          </Link>
          
          <Separator />
          
          <Link href="/terms" className="block py-4 hover:bg-accent/50 transition-colors -mx-4 px-4">
            <span className="text-foreground">Terms of Service</span>
          </Link>
        </div>

        <Separator className="my-6" />

        {/* Demo Mode Section */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Demo Mode</h2>
          
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <Label htmlFor="demo-toggle" className="text-foreground font-medium">
                  Enable Demo Mode
                </Label>
              </div>
              <Switch
                id="demo-toggle"
                checked={isDemoMode}
                onCheckedChange={setDemoMode}
              />
            </div>
            {isDemoMode ? (
              <div className="flex items-center gap-2 text-sm text-yellow-500">
                <Sparkles className="h-4 w-4" />
                <span>Demo Mode Active - Guides are shown throughout the app</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                <span>Enable to show helpful guides and highlights on key features throughout the app.</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Theme Section */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Theme</h2>
          <p className="text-sm text-muted-foreground mb-4">Choose your preferred background color for the app</p>
          
          <RadioGroup value={selectedTheme} onValueChange={(value) => handleThemeChange(value as Theme)}>
            <div className="space-y-3">
              {themes.map((theme) => (
                <div key={theme.value} className="flex items-center space-x-3 py-2">
                  <RadioGroupItem value={theme.value} id={theme.value} />
                  <Label htmlFor={theme.value} className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className={`w-8 h-8 rounded-full ${theme.color} border-2 border-border`} />
                    <span>{theme.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <p className="text-xs text-muted-foreground mt-4">
            Your theme choice will persist across all pages including the splash screen.
          </p>
        </div>
      </main>
      <BottomNav userId={user?.id} />
    </div>
  )
}
