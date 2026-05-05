import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ConversationList } from "@/components/conversation-list"
import { MessageThread } from "@/components/message-thread"
import { NavDropdown } from "@/components/nav-dropdown"
import { MessageNotificationIcon } from "@/components/message-notification-icon"

interface MessagesPageProps {
  searchParams: Promise<{ user?: string }>
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get all conversations (unique users we've messaged with)
  const { data: sentMessages } = await supabase.from("messages").select("recipient_id").eq("sender_id", user.id)

  const { data: receivedMessages } = await supabase.from("messages").select("sender_id").eq("recipient_id", user.id)

  const conversationIds = new Set([
    ...(sentMessages?.map((m) => m.recipient_id) || []),
    ...(receivedMessages?.map((m) => m.sender_id) || []),
  ])

  // Get profiles for all conversation partners
  const { data: conversationProfiles } = await supabase
    .from("profiles")
    .select("*")
    .in("id", Array.from(conversationIds))

  // If user param is provided and not in conversations, add it
  let selectedUserId = params.user
  if (selectedUserId && !conversationIds.has(selectedUserId)) {
    const { data: newProfile } = await supabase.from("profiles").select("*").eq("id", selectedUserId).single()

    if (newProfile && conversationProfiles) {
      conversationProfiles.push(newProfile)
    }
  }

  // If no selected user, select the first conversation
  if (!selectedUserId && conversationProfiles && conversationProfiles.length > 0) {
    selectedUserId = conversationProfiles[0].id
  }

  return (
    <div className="min-h-svh bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">MSS</span>
          </Link>

          <NavDropdown userId={user.id} />
          <MessageNotificationIcon userId={user.id} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl pb-24 md:pb-8">
        <div className="grid md:grid-cols-[300px,1fr] gap-4 h-[calc(100vh-12rem)]">
          <Card className="border-slate-700 bg-slate-800/50 overflow-hidden">
            <ConversationList
              conversations={conversationProfiles || []}
              selectedUserId={selectedUserId}
              currentUserId={user.id}
            />
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 overflow-hidden">
            {selectedUserId ? (
              <MessageThread otherUserId={selectedUserId} currentUserId={user.id} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                  <p className="text-slate-400 mb-4">Start a conversation from a profile</p>
                  <Button asChild>
                    <Link href="/people">Find People</Link>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
