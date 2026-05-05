import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Shield, Search } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateJobButton } from "@/components/create-job-button"
import { NavDropdown } from "@/components/nav-dropdown"
import { MessageNotificationIcon } from "@/components/message-notification-icon"

export default async function JobsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get all open jobs with author profile info
  const { data: jobs } = await supabase
    .from("jobs")
    .select(`
      *,
      profiles:author_id (
        id,
        display_name,
        avatar_url,
        full_name
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">MSS</span>
          </Link>

          <div className="flex gap-4">
            <NavDropdown userId={user.id} />
            <MessageNotificationIcon userId={user.id} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Job Opportunities</h1>
            <p className="text-muted-foreground">Browse security positions at bars and venues</p>
          </div>
          <CreateJobButton />
        </div>

        {!jobs || jobs.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No jobs yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to post a job opportunity!</p>
              <CreateJobButton />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => {
              const profile = Array.isArray(job.profiles) ? job.profiles[0] : job.profiles

              return (
                <Card key={job.id} className="border-border bg-card hover:bg-card/80 transition-colors">
                  <CardContent className="pt-6">
                    <Link href={`/jobs/${job.id}`}>
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12 border-2 border-border">
                          <AvatarImage src={profile?.avatar_url || undefined} />
                          <AvatarFallback className="bg-muted text-foreground">
                            {profile?.display_name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-card-foreground hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                Posted by {profile?.display_name || "Unknown"} •{" "}
                                {new Date(job.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Badge
                                variant="secondary"
                                className={`${
                                  job.status === "open" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {job.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-card-foreground">
                              <span className="font-semibold">{job.venue_name}</span>
                              <span className="text-muted-foreground">•</span>
                              <span>{job.location}</span>
                            </div>

                            <p className="text-card-foreground line-clamp-2">{job.description}</p>

                            <div className="flex flex-wrap gap-2 pt-2">
                              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                {job.venue_type.replace("_", " ")}
                              </Badge>
                              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                {job.job_type.replace("_", " ")}
                              </Badge>
                              {job.pay_range && (
                                <Badge variant="secondary" className="bg-primary/20 text-primary">
                                  {job.pay_range}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
