import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Shield, Users } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FollowButton } from "@/components/follow-button"
import { NavDropdown } from "@/components/nav-dropdown"
import { MessageNotificationIcon } from "@/components/message-notification-icon"
import { VerifiedBadge } from "@/components/verified-badge"
import { SecurityBadge } from "@/components/security-badge"
import { BottomNav } from "@/components/bottom-nav"

export default async function PeoplePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  // Get all profiles except current user
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id)
    .order("created_at", { ascending: false })

  // Get current user's following list
  const { data: following } = await supabase.from("follows").select("following_id").eq("follower_id", user.id)

  const followingIds = new Set(following?.map((f) => f.following_id) || [])

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">MSS</span>
          </Link>

          <NavDropdown userId={user.id} isAdmin={!!currentProfile?.is_admin} />
          <MessageNotificationIcon userId={user.id} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Discover Professionals</h1>
          <p className="text-muted-foreground">Connect with security professionals in your industry</p>
        </div>

        {!profiles || profiles.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground">Be the first to invite your colleagues!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {profiles.map((profile) => {
              const isFollowing = followingIds.has(profile.id)

              return (
                <Card
                  key={profile.id}
                  className="border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Link href={`/profile/${profile.id}`}>
                        <Avatar className="h-16 w-16 border-2 border-border">
                          <AvatarImage src={profile.avatar_url || undefined} />
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">
                            {profile.display_name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/profile/${profile.id}`}>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors truncate">
                              {profile.full_name}
                            </h3>
                            {profile.is_security_professional && <SecurityBadge size="md" />}
                            {profile.verification_status === "approved" && <VerifiedBadge size="md" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">@{profile.display_name}</p>
                        </Link>

                        {profile.bio && <p className="text-sm text-card-foreground/80 line-clamp-2 mb-3">{profile.bio}</p>}

                        <div className="flex flex-wrap gap-2 mb-3">
                          {profile.location && (
                            <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                              {profile.location}
                            </Badge>
                          )}
                          {profile.years_experience && (
                            <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                              {profile.years_experience}y exp
                            </Badge>
                          )}
                        </div>

                        <FollowButton profileId={profile.id} initialIsFollowing={isFollowing} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
      <BottomNav userId={user.id} />
    </div>
  )
}
