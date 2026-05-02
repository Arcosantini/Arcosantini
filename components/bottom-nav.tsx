"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Users, MessageSquare, User, AlertCircle } from "lucide-react"

interface BottomNavProps {
  userId?: string
}

export function BottomNav({ userId }: BottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/feed", icon: Home, label: "Feed" },
    { href: "/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/people", icon: Users, label: "People" },
    { href: "/messages", icon: MessageSquare, label: "Messages" },
    { href: userId ? `/profile/${userId}` : "/feed", icon: User, label: "Profile" },
    { href: "/incident-reports", icon: AlertCircle, label: "Reports" },
  ]

  const isActive = (href: string) => {
    if (href.startsWith("/profile/")) {
      return pathname.startsWith("/profile/")
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-20">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
