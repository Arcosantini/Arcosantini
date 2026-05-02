"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { MessageSquare } from "lucide-react"

interface MessageNotificationIconProps {
  userId: string
}

export function MessageNotificationIcon({ userId }: MessageNotificationIconProps) {
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    fetchUnreadCount()

    const channel = supabase
      .channel(`messages:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `recipient_id=eq.${userId}`,
        },
        () => {
          fetchUnreadCount()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  const fetchUnreadCount = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("id", { count: "exact" })
        .eq("recipient_id", userId)
        .eq("read", false)

      if (error) throw error
      setUnreadCount(data?.length || 0)
    } catch (error) {
      console.error("Error fetching unread count:", error)
    }
  }

  return (
    <Link href="/messages" className="relative hover:opacity-80 transition-opacity">
      <MessageSquare className="h-5 w-5 text-slate-400 hover:text-white" />
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
    </Link>
  )
}
