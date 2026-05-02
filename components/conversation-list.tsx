"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface Profile {
  id: string
  display_name: string
  full_name: string
  avatar_url: string | null
}

interface ConversationListProps {
  conversations: Profile[]
  selectedUserId?: string
  currentUserId: string
}

export function ConversationList({ conversations, selectedUserId }: ConversationListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-slate-400">
            <p className="text-sm">No conversations yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {conversations.map((profile) => (
              <Link
                key={profile.id}
                href={`/messages?user=${profile.id}`}
                className={`flex items-center gap-3 p-4 hover:bg-slate-700/50 transition-colors ${
                  selectedUserId === profile.id ? "bg-slate-700/50" : ""
                }`}
              >
                <Avatar className="h-10 w-10 border-2 border-slate-700">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="bg-slate-700 text-white">
                    {profile.display_name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{profile.full_name}</p>
                  <p className="text-sm text-slate-400 truncate">@{profile.display_name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
