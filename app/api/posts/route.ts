import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    console.log("[v0] Fetching posts from database")

    // Fetch posts with author profile and like count
    const { data: posts, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!author_id(id, display_name, full_name, avatar_url),
        post_likes(count)
      `,
      )
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching posts:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get current user to check if they liked each post
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("[v0] Fetched posts count:", posts?.length || 0)

    if (user) {
      // Fetch user's likes
      const { data: userLikes } = await supabase.from("post_likes").select("post_id").eq("user_id", user.id)

      const likedPostIds = new Set(userLikes?.map((like) => like.post_id) || [])

      // Add isLiked and likeCount to each post
      const postsWithLikes = posts?.map((post) => ({
        ...post,
        likeCount: post.post_likes?.[0]?.count || 0,
        isLiked: likedPostIds.has(post.id),
      }))

      return NextResponse.json(postsWithLikes || [])
    }

    // For non-authenticated users
    const postsWithLikes = posts?.map((post) => ({
      ...post,
      likeCount: post.post_likes?.[0]?.count || 0,
      isLiked: false,
    }))

    return NextResponse.json(postsWithLikes || [])
  } catch (error) {
    console.error("[v0] Unexpected error in posts API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
