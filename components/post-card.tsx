"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Trash2, Send, Share2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface PostCardProps {
  post: {
    id: string
    content: string
    image_url: string | null
    created_at: string
    author_id: string
    profiles: {
      id: string
      display_name: string
      avatar_url: string | null
      full_name: string | null
    } | null
    post_likes?: { user_id: string }[]
  }
  currentUserId: string
}

interface Comment {
  id: string
  content: string
  created_at: string
  author_id: string
  profiles: {
    id: string
    display_name: string
    avatar_url: string | null
  } | null
}

export function PostCard({ post, currentUserId }: PostCardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(post.post_likes?.some((like) => like.user_id === currentUserId) || false)
  const [likeCount, setLikeCount] = useState(post.post_likes?.length || 0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentCount, setCommentCount] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingComments, setIsLoadingComments] = useState(false)

  useEffect(() => {
    fetchCommentCount()
  }, [post.id])

  const fetchCommentCount = async () => {
    const supabase = createClient()
    const { count } = await supabase.from("comments").select("*", { count: "exact", head: true }).eq("post_id", post.id)
    setCommentCount(count || 0)
  }

  const fetchComments = async () => {
    if (comments.length > 0) return // Already loaded

    setIsLoadingComments(true)
    const supabase = createClient()

    const { data: commentsData, error } = await supabase
      .from("comments")
      .select("id, content, created_at, author_id")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching comments:", error)
      setIsLoadingComments(false)
      return
    }

    // Fetch profiles for all comments
    const authorIds = [...new Set(commentsData?.map((c) => c.author_id) || [])]
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url")
      .in("id", authorIds)

    const profilesMap = new Map(profilesData?.map((p) => [p.id, p]))

    const commentsWithProfiles = commentsData?.map((comment) => ({
      ...comment,
      profiles: profilesMap.get(comment.author_id) || null,
    }))

    setComments(commentsWithProfiles || [])
    setIsLoadingComments(false)
  }

  const handleToggleComments = () => {
    if (!showComments) {
      fetchComments()
    }
    setShowComments(!showComments)
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: post.id,
        author_id: currentUserId,
        content: newComment.trim(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating comment:", error)
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Get current user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url")
      .eq("id", currentUserId)
      .single()

    // Add new comment to the list
    const newCommentWithProfile = {
      ...data,
      profiles: profile,
    }

    setComments([...comments, newCommentWithProfile])
    setCommentCount(commentCount + 1)
    setNewComment("")
    setIsSubmitting(false)

    toast({
      title: "Success",
      description: "Comment posted successfully",
    })
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    const supabase = createClient()
    const { error } = await supabase.from("comments").delete().eq("id", commentId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      })
      return
    }

    setComments(comments.filter((c) => c.id !== commentId))
    setCommentCount(commentCount - 1)
    toast({
      title: "Success",
      description: "Comment deleted successfully",
    })
  }

  const handleLike = async () => {
    const supabase = createClient()

    if (isLiked) {
      const { error } = await supabase.from("post_likes").delete().eq("post_id", post.id).eq("user_id", currentUserId)

      if (!error) {
        setIsLiked(false)
        setLikeCount((prev) => prev - 1)
      }
    } else {
      const { error } = await supabase.from("post_likes").insert({ post_id: post.id, user_id: currentUserId })

      if (!error) {
        setIsLiked(true)
        setLikeCount((prev) => prev + 1)
      }
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return

    setIsDeleting(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("posts").delete().eq("id", post.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleShare = async () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/feed`
    const text = `Check out this post by ${post.profiles?.display_name}`
    const encoded = encodeURIComponent(url)
    const encodedText = encodeURIComponent(text)
    if (navigator.share) {
      navigator.share({ title: text, url })
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  const profile = post.profiles
  const isAuthor = post.author_id === currentUserId

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4 space-y-3">
        {/* Header with author info */}
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${post.profiles?.id}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Avatar className="h-10 w-10 border border-border">
              {post.profiles?.avatar_url && (
                <AvatarImage src={post.profiles.avatar_url || "/placeholder.svg"} alt={post.profiles.display_name} />
              )}
              <AvatarFallback className="bg-muted text-foreground">
                {post.profiles?.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-foreground">{post.profiles?.display_name || "Unknown User"}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </Link>
          {currentUserId === post.author_id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Post content */}
        <p className="text-sm text-foreground whitespace-pre-wrap">{post.content}</p>

        {/* Post image */}
        {post.image_url && (
          <div className="w-full aspect-square overflow-hidden rounded-lg border border-border">
            <img src={post.image_url || "/placeholder.svg"} alt="Post image" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 hover:bg-transparent ${isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleComments}
            className="gap-2 text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{commentCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="gap-2 text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="pt-3 border-t border-border space-y-3">
            {isLoadingComments ? (
              <p className="text-sm text-muted-foreground">Loading comments...</p>
            ) : (
              <>
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-8 w-8 border border-border flex-shrink-0">
                      {comment.profiles?.avatar_url && (
                        <AvatarImage src={comment.profiles.avatar_url || "/placeholder.svg"} />
                      )}
                      <AvatarFallback className="bg-muted text-foreground text-xs">
                        {comment.profiles?.display_name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-xs text-foreground">
                          {comment.profiles?.display_name || "Unknown"}
                        </p>
                        {comment.author_id === currentUserId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.id)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-transparent"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-foreground mt-1">{comment.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(comment.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Add comment form */}
                <div className="flex gap-2 pt-2">
                  <Avatar className="h-8 w-8 border border-border flex-shrink-0">
                    <AvatarFallback className="bg-muted text-foreground text-xs">U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[60px] resize-none bg-background text-foreground border-border"
                    />
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || isSubmitting}
                      size="sm"
                      className="self-end"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
