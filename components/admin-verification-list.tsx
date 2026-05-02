"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BadgeCheck, Clock, Shield, ShieldAlert, ShieldPlus, UserX } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface VerificationRequest {
  id: string
  full_name: string
  display_name: string
  avatar_url: string | null
  profession: string | null
  account_type: string | null
  verification_status: string | null
  verification_requested_at: string | null
  verified_at?: string | null
  is_security_professional?: boolean | null
}

interface SecurityProfile {
  id: string
  full_name: string
  display_name: string
  avatar_url: string | null
  profession: string | null
  is_security_professional: boolean | null
}

interface AdminVerificationListProps {
  pendingRequests: VerificationRequest[]
  approvedAccounts: VerificationRequest[]
  securityProfessionals: SecurityProfile[]
  allProfiles: SecurityProfile[]
}

export function AdminVerificationList({ pendingRequests, approvedAccounts, securityProfessionals, allProfiles }: AdminVerificationListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()

  const handleAction = async (profileId: string, action: "approve" | "deny" | "revoke" | "grant_security" | "revoke_security") => {
    setLoadingId(profileId)
    const supabase = createClient()

    try {
      if (action === "approve") {
        await supabase
          .from("profiles")
          .update({
            verification_status: "approved",
            verified_at: new Date().toISOString(),
          })
          .eq("id", profileId)
      } else if (action === "deny") {
        await supabase
          .from("profiles")
          .update({
            account_type: "professional",
            verification_status: null,
            verification_requested_at: null,
          })
          .eq("id", profileId)
      } else if (action === "revoke") {
        await supabase
          .from("profiles")
          .update({
            account_type: "professional",
            verification_status: null,
            verification_requested_at: null,
            verified_at: null,
          })
          .eq("id", profileId)
      } else if (action === "grant_security") {
        await supabase
          .from("profiles")
          .update({ is_security_professional: true })
          .eq("id", profileId)
      } else if (action === "revoke_security") {
        await supabase
          .from("profiles")
          .update({ is_security_professional: false })
          .eq("id", profileId)
      }
      router.refresh()
    } catch (error) {
      console.error("Action error:", error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Pending Requests */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Pending Requests ({pendingRequests.length})
          </h2>
        </div>

        {pendingRequests.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-8 text-center">
              <ShieldAlert className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">No pending verification requests</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-border bg-card">
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <Link href={`/profile/${request.id}`}>
                      <Avatar className="h-12 w-12 border-2 border-border">
                        <AvatarImage src={request.avatar_url || undefined} className="object-cover" />
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {request.display_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/profile/${request.id}`}>
                        <h3 className="font-semibold text-card-foreground hover:text-primary transition-colors truncate">
                          {request.full_name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">@{request.display_name}</p>
                      {request.profession && (
                        <p className="text-xs text-muted-foreground mt-0.5">{request.profession}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Requested {request.verification_requested_at
                          ? new Date(request.verification_requested_at).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Switch
                          id={`security-pending-${request.id}`}
                          checked={!!request.is_security_professional}
                          onCheckedChange={(checked) =>
                            handleAction(request.id, checked ? "grant_security" : "revoke_security")
                          }
                          disabled={loadingId === request.id}
                          className="scale-75 origin-left"
                        />
                        <Label htmlFor={`security-pending-${request.id}`} className="text-xs text-muted-foreground flex items-center gap-1 cursor-pointer">
                          <Shield className="h-3 w-3" />
                          Security Pro
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleAction(request.id, "approve")}
                        disabled={loadingId === request.id}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        {loadingId === request.id ? "..." : "Approve"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(request.id, "deny")}
                        disabled={loadingId === request.id}
                        className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        Deny
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Approved Accounts */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BadgeCheck className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-foreground">
            Verified Accounts ({approvedAccounts.length})
          </h2>
        </div>

        {approvedAccounts.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-8 text-center">
              <BadgeCheck className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">No verified business accounts yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {approvedAccounts.map((account) => (
              <Card key={account.id} className="border-border bg-card">
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <Link href={`/profile/${account.id}`}>
                      <Avatar className="h-12 w-12 border-2 border-border">
                        <AvatarImage src={account.avatar_url || undefined} className="object-cover" />
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {account.display_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/profile/${account.id}`}>
                          <h3 className="font-semibold text-card-foreground hover:text-primary transition-colors truncate">
                            {account.full_name}
                          </h3>
                        </Link>
                        <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground">@{account.display_name}</p>
                      {account.profession && (
                        <p className="text-xs text-muted-foreground mt-0.5">{account.profession}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5">
                        <Switch
                          id={`security-approved-${account.id}`}
                          checked={!!account.is_security_professional}
                          onCheckedChange={(checked) =>
                            handleAction(account.id, checked ? "grant_security" : "revoke_security")
                          }
                          disabled={loadingId === account.id}
                          className="scale-75 origin-left"
                        />
                        <Label htmlFor={`security-approved-${account.id}`} className="text-xs text-muted-foreground flex items-center gap-1 cursor-pointer">
                          <Shield className="h-3 w-3" />
                          Security Pro
                        </Label>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(account.id, "revoke")}
                      disabled={loadingId === account.id}
                      className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent shrink-0"
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Revoke
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Security Professionals */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-foreground">
            Security Professionals ({securityProfessionals.length})
          </h2>
        </div>

        {securityProfessionals.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-8 text-center">
              <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">No verified security professionals yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {securityProfessionals.map((profile) => (
              <Card key={profile.id} className="border-border bg-card">
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <Link href={`/profile/${profile.id}`}>
                      <Avatar className="h-12 w-12 border-2 border-border">
                        <AvatarImage src={profile.avatar_url || undefined} className="object-cover" />
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {profile.display_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/profile/${profile.id}`}>
                          <h3 className="font-semibold text-card-foreground hover:text-primary transition-colors truncate">
                            {profile.full_name}
                          </h3>
                        </Link>
                        <Shield className="h-4 w-4 text-blue-400 shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground">@{profile.display_name}</p>
                      {profile.profession && (
                        <p className="text-xs text-muted-foreground mt-0.5">{profile.profession}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5">
                        <Switch
                          id={`security-pro-${profile.id}`}
                          checked={true}
                          onCheckedChange={() => handleAction(profile.id, "revoke_security")}
                          disabled={loadingId === profile.id}
                          className="scale-75 origin-left"
                        />
                        <Label htmlFor={`security-pro-${profile.id}`} className="text-xs text-muted-foreground flex items-center gap-1 cursor-pointer">
                          <Shield className="h-3 w-3" />
                          Security Pro
                        </Label>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(profile.id, "revoke_security")}
                      disabled={loadingId === profile.id}
                      className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent shrink-0"
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Revoke
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Grant Security Professional */}
        {allProfiles.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldPlus className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Grant Security Professional Badge</h3>
            </div>
            <div className="space-y-2">
              {allProfiles.slice(0, 10).map((profile) => (
                <Card key={profile.id} className="border-border bg-card">
                  <CardContent className="py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/profile/${profile.id}`}>
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarImage src={profile.avatar_url || undefined} className="object-cover" />
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                            {profile.display_name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-card-foreground truncate">{profile.full_name}</p>
                        <p className="text-xs text-muted-foreground">@{profile.display_name}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Switch
                          id={`security-grant-${profile.id}`}
                          checked={false}
                          onCheckedChange={() => handleAction(profile.id, "grant_security")}
                          disabled={loadingId === profile.id}
                        />
                        <Label htmlFor={`security-grant-${profile.id}`} className="text-xs text-muted-foreground flex items-center gap-1 cursor-pointer">
                          <Shield className="h-3 w-3" />
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
