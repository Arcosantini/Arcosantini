"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Shield, Home, Briefcase, Users, MessageSquare, User, LogOut, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreatePostDialog } from "@/components/create-post-dialog"
import { PostCard } from "@/components/post-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { NavDropdown } from "@/components/nav-dropdown"
import { MessageNotificationIcon } from "@/components/message-notification-icon"
import { BottomNav } from "@/components/bottom-nav"
import { FeedPageSkeleton, PostCardSkeleton } from "@/components/skeletons"

interface Post {
  id: string
  content: string
  image_url: string | null
  created_at: string
  author_id: string
  profiles: {
    id: string
    display_name: string
    full_name: string
    avatar_url: string | null
  }
  post_likes: {
    user_id: string
  }[]
}

export default function FeedPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const POSTS_PER_PAGE = 10
  const supabase = createClient()

  useEffect(() => {
    loadUserAndPosts()
  }, [])

  const loadUserAndPosts = async () => {
    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      if (!currentUser) {
        router.push("/auth/login")
        return
      }

      setUser(currentUser)

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", currentUser.id)
        .single()
      if (profile?.is_admin) setIsAdmin(true)

      await fetchPosts(currentUser.id)
    } catch (error) {
      console.error("Error loading:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async (userId: string, offset = 0, append = false) => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + POSTS_PER_PAGE - 1)

      if (postsError) {
        console.error("Posts error:", postsError)
        throw postsError
      }

      if (!postsData || postsData.length === 0) {
        if (!append) setPosts([])
        setHasMore(false)
        return
      }

      // Check if there are more posts
      setHasMore(postsData.length === POSTS_PER_PAGE)

      const authorIds = [...new Set(postsData.map((post) => post.author_id))]

      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, display_name, full_name, avatar_url, verification_status, is_security_professional")
        .in("id", authorIds)

      if (profilesError) {
        console.error("Profiles error:", profilesError)
      }

      const profilesMap = new Map(profilesData?.map((profile) => [profile.id, profile]))

      const { data: likesData } = await supabase.from("post_likes").select("post_id, user_id")

      const formattedPosts = postsData.map((post) => ({
        ...post,
        profiles: profilesMap.get(post.author_id) || {
          id: post.author_id,
          display_name: "Unknown User",
          full_name: "Unknown User",
          avatar_url: null,
        },
        post_likes:
          likesData?.filter((like) => like.post_id === post.id).map((like) => ({ user_id: like.user_id })) || [],
      }))

      if (append) {
        setPosts((prev) => [...prev, ...formattedPosts])
      } else {
        setPosts(formattedPosts)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts([])
    }
  }

  const handlePostCreated = async () => {
    if (user) {
      setHasMore(true)
      await fetchPosts(user.id)
    }
  }

  const loadMorePosts = async () => {
    if (!user || loadingMore || !hasMore) return
    setLoadingMore(true)
    await fetchPosts(user.id, posts.length, true)
    setLoadingMore(false)
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({ title: "Failed to sign out", variant: "destructive" })
    }
  }

  if (loading) {
    return <FeedPageSkeleton />
  }

  return (
    <div className="min-h-svh bg-background pb-20 md:pb-8">
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">MSS</span>
          </Link>
          <div className="flex items-center gap-2">
            <NavDropdown userId={user?.id} isAdmin={isAdmin} />
            <MessageNotificationIcon userId={user?.id} />
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Sign Out</span>
            </Button>
            <Link href={`/profile/${user?.id}`}>
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-muted text-foreground text-xs">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-3 space-y-3">
        <div className="sticky top-[57px] z-20 bg-background py-2 -mx-4 px-4 border-b border-border md:static md:border-0 md:py-0 md:mx-0 md:px-0">
          <CreatePostDialog onPostCreated={handlePostCreated} />
        </div>

        {posts.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="pt-12 pb-12 text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
              <p className="text-muted-foreground text-sm mb-4">Be the first to share something with the community!</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {posts.map((post) => <PostCard key={post.id} post={post as any} currentUserId={user?.id} />)}
            
            {hasMore && (
              <div className="flex justify-center py-4">
                <Button
                  variant="outline"
                  onClick={loadMorePosts}
                  disabled={loadingMore}
                  className="w-full max-w-xs"
                >
                  {loadingMore ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Loading...
                      </span>
                    ) : "Load More Posts"}
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-20">
        <div className="flex items-center justify-around py-3">
          <Link href="/feed" className="flex flex-col items-center gap-1 text-primary">
            <Home className="h-5 w-5" />
            <span className="text-xs">Feed</span>
          </Link>
          <Link href="/jobs" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Briefcase className="h-5 w-5" />
            <span className="text-xs">Jobs</span>
          </Link>
          <Link href="/people" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="text-xs">People</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Messages</span>
          </Link>
          <Link href={`/profile/${user?.id}`} className="flex flex-col items-center gap-1 text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
          <Link href="/incident-reports" className="flex flex-col items-center gap-1 text-muted-foreground">
            <AlertCircle className="h-5 w-5" />
            <span className="text-xs">Reports</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
