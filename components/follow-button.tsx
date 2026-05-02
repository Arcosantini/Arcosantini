"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { UserPlus, UserMinus } from "lucide-react"
import { useRouter } from "next/navigation"

interface FollowButtonProps {
  profileId: string
  initialIsFollowing: boolean
  className?: string
}

export function FollowButton({ profileId, initialIsFollowing, className }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFollow = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      if (isFollowing) {
        await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", profileId)
        setIsFollowing(false)
      } else {
        await supabase.from("follows").insert({ follower_id: user.id, following_id: profileId })
        setIsFollowing(true)
      }

      router.refresh()
    } catch (error) {
      console.error("Follow error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={isLoading}
      size="sm"
      variant={isFollowing ? "outline" : "default"}
      className={`${isFollowing ? "border-slate-600 text-slate-200" : "bg-[#1e3a5f] text-white hover:bg-[#162d4a] font-semibold"} ${className || ""}`}
    >
      {isFollowing ? (
        <>
          <UserMinus className="h-4 w-4 mr-2" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  )
}
