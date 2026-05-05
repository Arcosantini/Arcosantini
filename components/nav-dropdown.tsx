"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Briefcase, Users, MessageSquare, AlertCircle, Shield, Palette, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavDropdownProps {
  userId: string
}

export function NavDropdown({ userId }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/feed", label: "Feed", icon: Home },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/people", label: "People", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/incident-reports", label: "Incident Reports", icon: AlertCircle, highlight: true },
    { href: "/theme-settings", label: "Theme Settings", icon: Palette },
    { href: "/privacy", label: "Privacy Policy", icon: Shield },
    { href: "/data-deletion", label: "Data Deletion", icon: Shield },
    { href: "/terms", label: "Terms of Service", icon: Shield },
  ]

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-200 hover:text-white gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hidden sm:inline">Navigation</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-40">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors ${
                    item.highlight ? "text-orange-400 hover:text-orange-300" : "text-slate-200 hover:text-white"
                  } first:rounded-t-lg last:rounded-b-lg`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
