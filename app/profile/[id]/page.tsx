import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Menu, Link as LinkIcon, Grid3X3, MessageCircle } from "lucide-react"
import Link from "next/link"
import { EditProfileButton } from "@/components/edit-profile-button"
import { ShareProfileButton } from "@/components/share-profile-button"
import { FollowButton } from "@/components/follow-button"
import { VerifiedBadge } from "@/components/verified-badge"
import { SecurityBadge } from "@/components/security-badge"
import { BottomNav } from "@/components/bottom-nav"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error || !profile) {
    notFound()
  }

  // Get follower and following counts
  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", id)

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", id)

  // Get post count
  const { count: postsCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("author_id", id)

  // Get user's posts with images for the grid
  const { data: posts } = await supabase
    .from("posts")
    .select("id, image_url, created_at")
    .eq("author_id", id)
    .not("image_url", "is", null)
    .order("created_at", { ascending: false })

  // Check if current user follows this profile
  const { data: followData } = await supabase
    .from("follows")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", id)
    .maybeSingle()

  // Check if current user is admin
  const { data: currentUserProfile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()
  const isAdmin = !!currentUserProfile?.is_admin

  const isFollowing = !!followData
  const isOwnProfile = user.id === id

  return (
    <div className="min-h-svh bg-background">
      {/* Header - Instagram Style */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          {/* Create Post Button */}
          <Link href="/feed" className="p-1">
            <Plus className="h-7 w-7 text-foreground" />
          </Link>

          {/* Username Center */}
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-semibold text-foreground">{profile.display_name}</span>
            {profile.is_security_professional && <SecurityBadge size="lg" />}
            {profile.verification_status === "approved" && <VerifiedBadge size="lg" />}
          </div>

          {/* Settings Menu */}
          <Link href="/settings" className="p-1">
            <Menu className="h-7 w-7 text-foreground" />
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-20">
        {/* Profile Info Section */}
        <div className="px-4 py-4">
          {/* Avatar and Stats Row */}
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage src={profile.avatar_url || undefined} className="object-cover" />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
                {profile.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Stats */}
            <div className="flex flex-1 justify-around text-center">
              <div>
                <p className="text-lg font-semibold text-foreground">{postsCount || 0}</p>
                <p className="text-sm text-muted-foreground">posts</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{followersCount || 0}</p>
                <p className="text-sm text-muted-foreground">followers</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{followingCount || 0}</p>
                <p className="text-sm text-muted-foreground">following</p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="mt-4 flex items-center gap-1.5">
            <p className="font-semibold text-foreground">{profile.full_name}</p>
            {profile.is_security_professional && <SecurityBadge size="md" />}
            {profile.verification_status === "approved" && <VerifiedBadge size="md" />}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">{profile.bio}</p>
          )}

          {/* Website Link */}
          {profile.website_url && (
            <a
              href={profile.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <LinkIcon className="h-3 w-3" />
              {profile.website_url.replace(/^https?:\/\//, "").slice(0, 40)}
              {profile.website_url.length > 50 ? "..." : ""}
            </a>
          )}

          {/* Social Link and Profession Row */}
          <div className="mt-2 flex items-center gap-4 text-sm">
            {profile.social_link && profile.social_platform && (
              <a
                href={profile.social_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <span className="font-medium">@{profile.social_platform}</span>
              </a>
            )}
            {profile.profession && (
              <span className="text-muted-foreground">{profile.profession}</span>
            )}
          </div>

          {/* Professional Profile Banner */}
          <div className="mt-4 bg-card border border-border rounded-lg p-3">
            <p className="font-semibold text-card-foreground">Professional profile</p>
            <p className="text-xs text-muted-foreground">Security industry professional</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            {isOwnProfile ? (
              <>
                <EditProfileButton profile={profile} isAdmin={isAdmin} />
                <ShareProfileButton profileId={id} displayName={profile.display_name} />
              </>
            ) : isFollowing ? (
              <>
                <Button
                  asChild
                  className="flex-1 bg-[#1e3a5f] text-white hover:bg-[#162d4a] font-semibold"
                >
                  <Link href={`/messages?user=${id}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
                <ShareProfileButton profileId={id} displayName={profile.display_name} />
              </>
            ) : (
              <>
                <FollowButton profileId={id} initialIsFollowing={false} className="flex-1" />
                <ShareProfileButton profileId={id} displayName={profile.display_name} />
              </>
            )}
          </div>
        </div>

        {/* Grid Tab */}
        <div className="border-t border-border">
          <div className="flex justify-center py-2">
            <div className="px-12 py-2 border-b-2 border-foreground">
              <Grid3X3 className="h-6 w-6 text-foreground" />
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-0.5 bg-background">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/feed?post=${post.id}`} 
                className="aspect-square relative block overflow-hidden bg-secondary"
              >
                <img
                  src={post.image_url || "/placeholder.svg"}
                  alt="Post"
                  className="absolute inset-0 w-full h-full object-cover object-center hover:opacity-90 transition-opacity"
                />
              </Link>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-muted-foreground">
              <Grid3X3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No posts yet</p>
            </div>
          )}
        </div>
      </main>
      <BottomNav userId={user.id} />
    </div>
  )
}
