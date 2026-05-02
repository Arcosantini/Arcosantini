import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Shield } from "lucide-react"
import Link from "next/link"
import { NavDropdown } from "@/components/nav-dropdown"
import { MessageNotificationIcon } from "@/components/message-notification-icon"
import { AdminVerificationList } from "@/components/admin-verification-list"
import { BottomNav } from "@/components/bottom-nav"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Check if current user is admin
  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!adminProfile?.is_admin) redirect("/feed")

  // Get all pending verification requests
  const { data: pendingRequests } = await supabase
    .from("profiles")
    .select("id, full_name, display_name, avatar_url, profession, account_type, verification_status, verification_requested_at, is_security_professional")
    .eq("verification_status", "pending")
    .order("verification_requested_at", { ascending: true })

  // Get all approved business accounts
  const { data: approvedAccounts } = await supabase
    .from("profiles")
    .select("id, full_name, display_name, avatar_url, profession, verification_status, verified_at, is_security_professional")
    .eq("verification_status", "approved")
    .order("verified_at", { ascending: false })

  // Get all security professionals
  const { data: securityProfessionals } = await supabase
    .from("profiles")
    .select("id, full_name, display_name, avatar_url, profession, is_security_professional")
    .eq("is_security_professional", true)
    .order("full_name", { ascending: true })

  // Get all non-security-professional profiles for granting
  const { data: allProfiles } = await supabase
    .from("profiles")
    .select("id, full_name, display_name, avatar_url, profession, is_security_professional")
    .eq("is_security_professional", false)
    .neq("id", user.id)
    .order("full_name", { ascending: true })

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">MSS</span>
          </Link>
          <NavDropdown userId={user.id} isAdmin={true} />
          <MessageNotificationIcon userId={user.id} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage business account verification requests</p>
        </div>

        <AdminVerificationList
          pendingRequests={pendingRequests || []}
          approvedAccounts={approvedAccounts || []}
          securityProfessionals={securityProfessionals || []}
          allProfiles={allProfiles || []}
        />
      </main>
      <BottomNav userId={user.id} />
    </div>
  )
}
