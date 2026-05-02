"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ShareProfileButtonProps {
  profileId: string
  displayName: string
}

interface UserProfile {
  id: string
  display_name: string
  full_name: string
  avatar_url: string | null
}

export function ShareProfileButton({ profileId, displayName }: ShareProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [sending, setSending] = useState<string | null>(null)
  const [sent, setSent] = useState<Set<string>>(new Set())
  const supabase = createClient()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get users the current user follows
      const { data: following } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user.id)

      if (following && following.length > 0) {
        const followingIds = following.map(f => f.following_id)
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, display_name, full_name, avatar_url")
          .in("id", followingIds)

        if (profiles) {
          setUsers(profiles)
          setFilteredUsers(profiles)
        }
      }
    }

    if (isOpen) {
      fetchUsers()
    }
  }, [isOpen, supabase])

  useEffect(() => {
    if (searchQuery) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredUsers(users)
    }
  }, [searchQuery, users])

  const handleSendProfile = async (recipientId: string) => {
    setSending(recipientId)
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const profileUrl = `${window.location.origin}/profile/${profileId}`
    const message = `Check out this profile: @${displayName}\n${profileUrl}`

    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      receiver_id: recipientId,
      content: message,
      read: false,
    })

    if (!error) {
      setSent(prev => new Set(prev).add(recipientId))
    }
    
    setSending(null)
  }

  return (
    <>
      <Button
        variant="outline"
        className="flex-1 border-border bg-transparent text-foreground hover:bg-accent"
        onClick={() => setIsOpen(true)}
      >
        Share profile
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Share profile</DialogTitle>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border text-foreground"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2">
            {filteredUsers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {users.length === 0
                  ? "Follow some users to share profiles with them"
                  : "No users found"}
              </p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar_url || undefined} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {user.display_name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-card-foreground truncate">
                      {user.full_name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      @{user.display_name}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={sent.has(user.id) ? "secondary" : "default"}
                    disabled={sending === user.id || sent.has(user.id)}
                    onClick={() => handleSendProfile(user.id)}
                    className="shrink-0"
                  >
                    {sent.has(user.id) ? (
                      "Sent"
                    ) : sending === user.id ? (
                      "..."
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
