"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface LikeJobButtonProps {
  jobId: string
  initialIsLiked: boolean
}

export function LikeJobButton({ jobId, initialIsLiked }: LikeJobButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLike = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      if (isLiked) {
        await supabase.from("job_likes").delete().eq("job_id", jobId).eq("user_id", user.id)
        setIsLiked(false)
      } else {
        await supabase.from("job_likes").insert({ job_id: jobId, user_id: user.id })
        setIsLiked(true)
      }

      router.refresh()
    } catch (error) {
      console.error("Like error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLike}
      disabled={isLoading}
      size="sm"
      variant={isLiked ? "default" : "outline"}
      className={!isLiked ? "border-slate-600 text-slate-200" : ""}
    >
      <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
    </Button>
  )
}
