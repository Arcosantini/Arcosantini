"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type Theme = "dark-blue" | "light-blue" | "light-pink" | "mint-green" | "white"

const themes = [
  { value: "dark-blue", label: "Dark Blue (Original)", color: "bg-slate-900" },
  { value: "light-blue", label: "Light Blue", color: "bg-blue-100" },
  { value: "light-pink", label: "Light Pink", color: "bg-pink-100" },
  { value: "mint-green", label: "Mint Green", color: "bg-green-100" },
  { value: "white", label: "White", color: "bg-white" },
]

export default function ThemeSettingsPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>("dark-blue")
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

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
    applyTheme(theme)
  }

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MSS</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto py-8">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Choose your preferred background color for the app</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedTheme} onValueChange={(value) => handleThemeChange(value as Theme)}>
              <div className="space-y-4">
                {themes.map((theme) => (
                  <div key={theme.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={theme.value} id={theme.value} />
                    <Label htmlFor={theme.value} className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className={`w-8 h-8 rounded-full ${theme.color} border-2 border-border`} />
                      <span>{theme.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <p className="text-sm text-muted-foreground mt-6">
              Your theme choice will persist across all pages including the splash screen.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
