"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  created_at: string
  read: boolean
}

interface Profile {
  id: string
  display_name: string
  full_name: string
  avatar_url: string | null
}

interface MessageThreadProps {
  otherUserId: string
  currentUserId: string
}

export function MessageThread({ otherUserId, currentUserId }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otherUser, setOtherUser] = useState<Profile | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    loadMessages()
    loadOtherUser()

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=eq.${otherUserId},recipient_id=eq.${currentUserId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
          scrollToBottom()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [otherUserId, currentUserId])

  const loadMessages = async () => {
    // Load last 100 messages (paginated)
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${currentUserId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${currentUserId})`,
      )
      .order("created_at", { ascending: false })
      .limit(100)

    if (data) {
      // Reverse to show oldest first in UI
      setMessages(data.reverse())
      scrollToBottom()

      // Mark messages as read
      await supabase
        .from("messages")
        .update({ read: true })
        .eq("sender_id", otherUserId)
        .eq("recipient_id", currentUserId)
        .eq("read", false)
    }
  }

  const loadOtherUser = async () => {
    const { data } = await supabase.from("profiles").select("*").eq("id", otherUserId).single()

    if (data) {
      setOtherUser(data)
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("messages").insert({
        sender_id: currentUserId,
        recipient_id: otherUserId,
        content: newMessage.trim(),
      })

      if (error) throw error

      // Optimistically add message to UI
      const tempMessage: Message = {
        id: Date.now().toString(),
        sender_id: currentUserId,
        recipient_id: otherUserId,
        content: newMessage.trim(),
        created_at: new Date().toISOString(),
        read: false,
      }
      setMessages((prev) => [...prev, tempMessage])
      setNewMessage("")
      scrollToBottom()

      // Reload to get actual message
      setTimeout(loadMessages, 500)
    } catch (error) {
      console.error("Send message error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {otherUser && (
        <div className="p-4 border-b border-slate-700">
          <Link
            href={`/profile/${otherUser.id}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Avatar className="h-10 w-10 border-2 border-slate-700">
              <AvatarImage src={otherUser.avatar_url || undefined} />
              <AvatarFallback className="bg-slate-700 text-white">
                {otherUser.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{otherUser.full_name}</p>
              <p className="text-sm text-slate-400">@{otherUser.display_name}</p>
            </div>
          </Link>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.sender_id === currentUserId

          return (
            <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  isOwn ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-100"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${isOwn ? "text-blue-200" : "text-slate-400"}`}>
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="resize-none bg-slate-900 border-slate-600 text-white"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend(e)
              }
            }}
          />
          <Button type="submit" disabled={isLoading || !newMessage.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
