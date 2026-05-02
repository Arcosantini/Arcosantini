import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Shield, MapPin, Briefcase, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LikeJobButton } from "@/components/like-job-button"
import { DeleteJobButton } from "@/components/delete-job-button"
import { ShareButton } from "@/components/share-button"
import { BottomNav } from "@/components/bottom-nav"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: job, error } = await supabase
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
    .eq("id", id)
    .single()

  if (error || !job) {
    notFound()
  }

  const profile = Array.isArray(job.profiles) ? job.profiles[0] : job.profiles

  // Get like count
  const { count: likesCount } = await supabase
    .from("job_likes")
    .select("*", { count: "exact", head: true })
    .eq("job_id", id)

  // Check if current user liked this job
  const { data: likeData } = await supabase
    .from("job_likes")
    .select("id")
    .eq("job_id", id)
    .eq("user_id", user.id)
    .single()

  const isLiked = !!likeData
  const isAuthor = user.id === job.author_id

  return (
    <div className="min-h-svh bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <Link href="/feed" className="text-xl font-bold text-white">
              SecureConnect
            </Link>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="ghost" className="text-slate-200">
              <Link href="/feed">Feed</Link>
            </Button>
            <Button asChild variant="ghost" className="text-slate-200">
              <Link href="/jobs">Jobs</Link>
            </Button>
            <Button asChild variant="ghost" className="text-slate-200">
              <Link href="/people">People</Link>
            </Button>
            <Button asChild variant="ghost" className="text-slate-200">
              <Link href="/messages">Messages</Link>
            </Button>
            <Button asChild variant="ghost" className="text-slate-200">
              <Link href={`/profile/${user.id}`}>Profile</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className={`${
                      job.status === "open" ? "bg-green-900 text-green-200" : "bg-slate-700 text-slate-200"
                    }`}
                  >
                    {job.status}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                    {job.venue_type.replace("_", " ")}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                    {job.job_type.replace("_", " ")}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <p className="text-xl text-slate-300 mb-4">{job.venue_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
              <Link
                href={`/profile/${profile?.id}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Avatar className="h-10 w-10 border-2 border-slate-700">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-slate-700 text-white">
                    {profile?.display_name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{profile?.full_name || "Unknown"}</p>
                  <p className="text-xs text-slate-400">@{profile?.display_name || "unknown"}</p>
                </div>
              </Link>

              <div className="flex items-center gap-2 ml-auto">
                <LikeJobButton jobId={id} initialIsLiked={isLiked} />
                <span className="text-sm text-slate-400">{likesCount || 0} likes</span>
                <ShareButton url={`/jobs/${id}`} title={job.title} />
                {isAuthor && <DeleteJobButton jobId={id} />}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Briefcase className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Job Type</p>
                  <p className="font-medium">{job.job_type.replace("_", " ")}</p>
                </div>
              </div>

              {job.pay_range && (
                <div className="flex items-center gap-3 text-slate-300">
                  <DollarSign className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Pay Range</p>
                    <p className="font-medium">{job.pay_range}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Posted</p>
                  <p className="font-medium">{new Date(job.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Job Description</h2>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{job.description}</p>
            </div>

            {job.requirements && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Requirements</h2>
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{job.requirements}</p>
              </div>
            )}

            {!isAuthor && (
              <div className="pt-4 border-t border-slate-700">
                <Button asChild className="w-full" size="lg">
                  <Link href={`/messages?user=${job.author_id}`}>Contact Employer</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <BottomNav userId={user.id} />
    </div>
  )
}
