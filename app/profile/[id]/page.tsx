import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Calendar, Shield, MessageCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { FollowButton } from "@/components/follow-button"
import { EditProfileButton } from "@/components/edit-profile-button"
import { ShareButton } from "@/components/share-button"
import { NavDropdown } from "@/components/nav-dropdown"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error || !profile) {
    notFound()
  }

  // Get follower and following counts
  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", id)

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", id)

  // Check if current user follows this profile
  const { data: followData } = await supabase
    .from("follows")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", id)
    .single()

  const isFollowing = !!followData
  const isOwnProfile = user.id === id

  // Get user's job posts
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("author_id", id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-svh bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">MSS</span>
          </Link>

          <div className="flex items-center gap-2">
            <NavDropdown userId={user.id} />
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 border-4 border-slate-700">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-slate-700 text-white text-2xl">
                  {profile.display_name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-3xl font-bold text-white">{profile.full_name}</h1>
                  <p className="text-slate-400">@{profile.display_name}</p>
                </div>

                {profile.bio && <p className="text-slate-300">{profile.bio}</p>}

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.years_experience && (
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{profile.years_experience} years experience</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {profile.certifications && profile.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((cert, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-700 text-slate-200">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-white">{followersCount || 0}</span>{" "}
                    <span className="text-slate-400">Followers</span>
                  </div>
                  <div>
                    <span className="font-semibold text-white">{followingCount || 0}</span>{" "}
                    <span className="text-slate-400">Following</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {isOwnProfile ? (
                    <EditProfileButton profile={profile} />
                  ) : (
                    <>
                      <FollowButton profileId={id} initialIsFollowing={isFollowing} />
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-200 bg-transparent"
                        asChild
                      >
                        <Link href={`/messages?user=${id}`}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Link>
                      </Button>
                    </>
                  )}
                  <ShareButton url={`/profile/${id}`} title={`${profile.full_name}'s Profile`} />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {jobs && jobs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Job Posts</h2>
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="border-slate-700 bg-slate-800/50">
                  <CardContent className="pt-6">
                    <Link href={`/jobs/${job.id}`}>
                      <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-slate-400 mt-1">
                        {job.venue_name} • {job.location}
                      </p>
                      <p className="text-slate-300 mt-2 line-clamp-2">{job.description}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                          {job.job_type.replace("_", " ")}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`${job.status === "open" ? "bg-green-900 text-green-200" : "bg-slate-700 text-slate-200"}`}
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
