"use client"

import type React from "react"
import { MessageNotificationIcon } from "@/components/message-notification-icon"
import { Edit } from "lucide-react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Shield, AlertCircle, LogOut, Upload, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { NavDropdown } from "@/components/nav-dropdown"
import { BottomNav } from "@/components/bottom-nav"
import Image from "next/image"

interface IncidentReport {
  id: string
  reported_by_id: string
  incident_date: string
  incident_time: string
  incident_location: string
  persons_involved: string
  description: string
  prevention_strategy: string
  witness_name: string
  witness_contact: string
  image_url: string | null
  created_at: string
  profiles?: {
    display_name: string
    full_name: string
    avatar_url: string | null
  }
}

export default function IncidentReportsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [reports, setReports] = useState<IncidentReport[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const REPORTS_PER_PAGE = 10
  const [showForm, setShowForm] = useState(false)
  const [editingReport, setEditingReport] = useState<IncidentReport | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    incident_date: "",
    incident_time: "",
    incident_location: "",
    persons_involved: "",
    description: "",
    prevention_strategy: "",
    witness_name: "",
    witness_contact: "",
  })
  const supabase = createClient()

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      if (!currentUser) {
        router.push("/auth/login")
        return
      }

      setUser(currentUser)

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", currentUser.id)
        .single()
      if (profile?.is_admin) setIsAdmin(true)

      await fetchReports()
    } catch (error) {
      console.error("Error loading:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchReports = async (offset = 0, append = false) => {
    try {
      const { data, error } = await supabase
        .from("incident_reports")
        .select(`
          *,
          profiles!incident_reports_reported_by_id_fkey (
            display_name,
            full_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })
        .range(offset, offset + REPORTS_PER_PAGE - 1)

      if (error) throw error
      
      setHasMore((data?.length || 0) === REPORTS_PER_PAGE)
      
      if (append) {
        setReports((prev) => [...prev, ...(data || [])])
      } else {
        setReports(data || [])
      }
    } catch (error) {
      console.error("Error fetching reports:", error)
      toast({ title: "Failed to load reports", variant: "destructive" })
    }
  }

  const loadMoreReports = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    await fetchReports(reports.length, true)
    setLoadingMore(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)

      // Show preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to API
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-incident-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setUploadedImageUrl(data.url)
      toast({ title: "Image uploaded successfully" })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({ title: "Failed to upload image", variant: "destructive" })
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setUploadedImageUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({ title: "Please log in to submit a report", variant: "destructive" })
      return
    }

    try {
      const { error } = await supabase.from("incident_reports").insert({
        reported_by_id: user.id,
        incident_date: formData.incident_date,
        incident_time: formData.incident_time,
        incident_location: formData.incident_location,
        persons_involved: formData.persons_involved,
        description: formData.description,
        prevention_strategy: formData.prevention_strategy,
        witness_name: formData.witness_name,
        witness_contact: formData.witness_contact,
        image_url: uploadedImageUrl,
        status: "active",
      })

      if (error) {
        console.error("[v0] Database error:", error)
        throw error
      }

      toast({ title: "Incident report submitted successfully" })

      setFormData({
        incident_date: "",
        incident_time: "",
        incident_location: "",
        persons_involved: "",
        description: "",
        prevention_strategy: "",
        witness_name: "",
        witness_contact: "",
      })
      setImagePreview(null)
      setUploadedImageUrl(null)
      setShowForm(false)
      await fetchReports()
    } catch (error) {
      console.error("[v0] Error submitting report:", error)
      toast({ title: "Failed to submit report", variant: "destructive" })
    }
  }

  const handleEdit = (report: IncidentReport) => {
    setEditingReport(report)
    setFormData({
      incident_date: report.incident_date,
      incident_time: report.incident_time,
      incident_location: report.incident_location,
      persons_involved: report.persons_involved,
      description: report.description,
      prevention_strategy: report.prevention_strategy,
      witness_name: report.witness_name,
      witness_contact: report.witness_contact,
    })
    setImagePreview(report.image_url)
    setUploadedImageUrl(report.image_url)
    setShowEditForm(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !editingReport) {
      toast({ title: "Unable to update report", variant: "destructive" })
      return
    }

    try {
      const { error } = await supabase
        .from("incident_reports")
        .update({
          incident_date: formData.incident_date,
          incident_time: formData.incident_time,
          incident_location: formData.incident_location,
          persons_involved: formData.persons_involved,
          description: formData.description,
          prevention_strategy: formData.prevention_strategy,
          witness_name: formData.witness_name,
          witness_contact: formData.witness_contact,
          image_url: uploadedImageUrl,
        })
        .eq("id", editingReport.id)

      if (error) {
        console.error("[v0] Update error:", error)
        throw error
      }

      toast({ title: "Report updated successfully" })

      setFormData({
        incident_date: "",
        incident_time: "",
        incident_location: "",
        persons_involved: "",
        description: "",
        prevention_strategy: "",
        witness_name: "",
        witness_contact: "",
      })
      setImagePreview(null)
      setUploadedImageUrl(null)
      setShowEditForm(false)
      setEditingReport(null)
      await fetchReports()
    } catch (error) {
      console.error("[v0] Error updating report:", error)
      toast({ title: "Failed to update report", variant: "destructive" })
    }
  }

  const cancelEdit = () => {
    setShowEditForm(false)
    setEditingReport(null)
    setFormData({
      incident_date: "",
      incident_time: "",
      incident_location: "",
      persons_involved: "",
      description: "",
      prevention_strategy: "",
      witness_name: "",
      witness_contact: "",
    })
    setImagePreview(null)
    setUploadedImageUrl(null)
  }

  const handleDelete = async () => {
    if (!user || !editingReport) {
      toast({ title: "Unable to delete report", variant: "destructive" })
      return
    }

    if (!confirm("Are you sure you want to delete this incident report? This action cannot be undone.")) {
      return
    }

    try {
      const { error } = await supabase.from("incident_reports").delete().eq("id", editingReport.id)

      if (error) {
        console.error("[v0] Delete error:", error)
        throw error
      }

      toast({ title: "Report deleted successfully" })

      setFormData({
        incident_date: "",
        incident_time: "",
        incident_location: "",
        persons_involved: "",
        description: "",
        prevention_strategy: "",
        witness_name: "",
        witness_contact: "",
      })
      setImagePreview(null)
      setUploadedImageUrl(null)
      setShowEditForm(false)
      setEditingReport(null)
      await fetchReports()
    } catch (error) {
      console.error("[v0] Error deleting report:", error)
      toast({ title: "Failed to delete report", variant: "destructive" })
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({ title: "Failed to sign out", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-svh bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-slate-950 pb-20 md:pb-8">
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-bold text-white">MSS</span>
          </Link>
          <div className="flex items-center gap-2">
            <NavDropdown userId={user?.id} isAdmin={isAdmin} />
            <MessageNotificationIcon userId={user?.id} />
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Sign Out</span>
            </Button>
            <Link href={`/profile/${user?.id}`}>
              <Avatar className="h-8 w-8 border border-slate-700">
                <AvatarFallback className="bg-slate-800 text-white text-xs">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <AlertCircle className="h-8 w-8 text-orange-500" />
              Accident/Incident Report
            </h1>
            <p className="text-slate-400">Document and track safety incidents</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-orange-600 hover:bg-orange-700">
            {showForm ? "Cancel" : "New Report"}
          </Button>
        </div>

        {showForm && (
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle className="text-white">Submit Incident Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.incident_date}
                      onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Time</label>
                    <input
                      type="time"
                      required
                      value={formData.incident_time}
                      onChange={(e) => setFormData({ ...formData, incident_time: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Incident Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Main entrance, Bar area"
                    value={formData.incident_location}
                    onChange={(e) => setFormData({ ...formData, incident_location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Persons Involved</label>
                  <input
                    type="text"
                    required
                    placeholder="Names and roles of people involved"
                    value={formData.persons_involved}
                    onChange={(e) => setFormData({ ...formData, persons_involved: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Description of Incident</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Detailed description of what happened"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Future Prevention Strategy</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How can this incident be prevented in the future?"
                    value={formData.prevention_strategy}
                    onChange={(e) => setFormData({ ...formData, prevention_strategy: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Witness Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Name of witness(es)"
                    value={formData.witness_name}
                    onChange={(e) => setFormData({ ...formData, witness_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Witness Contact Information</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Phone numbers and emails of witnesses"
                    value={formData.witness_contact}
                    onChange={(e) => setFormData({ ...formData, witness_contact: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Upload Evidence Photo (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="px-3 py-2 bg-slate-800 border border-slate-700 border-dashed rounded text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-700 transition-colors">
                      <Upload className="h-4 w-4" />
                      {uploading ? "Uploading..." : "Click to upload image"}
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="mt-3 relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded border border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    Submit Report
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {showEditForm && editingReport && (
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle className="text-white">Edit Incident Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.incident_date}
                      onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Time</label>
                    <input
                      type="time"
                      required
                      value={formData.incident_time}
                      onChange={(e) => setFormData({ ...formData, incident_time: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Incident Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Main entrance, Bar area"
                    value={formData.incident_location}
                    onChange={(e) => setFormData({ ...formData, incident_location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Persons Involved</label>
                  <input
                    type="text"
                    required
                    placeholder="Names and roles of people involved"
                    value={formData.persons_involved}
                    onChange={(e) => setFormData({ ...formData, persons_involved: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Description of Incident</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Detailed description of what happened"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Future Prevention Strategy</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How can this incident be prevented in the future?"
                    value={formData.prevention_strategy}
                    onChange={(e) => setFormData({ ...formData, prevention_strategy: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Witness Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Name of witness(es)"
                    value={formData.witness_name}
                    onChange={(e) => setFormData({ ...formData, witness_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Witness Contact Information</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Phone numbers and emails of witnesses"
                    value={formData.witness_contact}
                    onChange={(e) => setFormData({ ...formData, witness_contact: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Update Evidence Photo (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="px-3 py-2 bg-slate-800 border border-slate-700 border-dashed rounded text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-700 transition-colors">
                      <Upload className="h-4 w-4" />
                      {uploading ? "Uploading..." : "Click to upload new image"}
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="mt-3 relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded border border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Update Report
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {reports.length === 0 ? (
            <Card className="border-slate-800 bg-slate-900">
              <CardContent className="pt-12 pb-12 text-center">
                <AlertCircle className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No reports yet</h3>
                <p className="text-slate-400 text-sm">Submit your first incident report</p>
              </CardContent>
            </Card>
          ) : (
            reports
              .filter((report) => !editingReport || report.id !== editingReport.id)
              .map((report) => (
                <Card key={report.id} className="border-slate-800 bg-slate-900">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        {new Date(report.incident_date).toLocaleDateString()}
                      </CardTitle>
                      {report.profiles && (
                        <Link
                          href={`/profile/${report.reported_by_id}`}
                          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                          <Avatar className="h-8 w-8 border border-slate-700">
                            {report.profiles.avatar_url ? (
                              <img
                                src={report.profiles.avatar_url || "/placeholder.svg"}
                                alt={report.profiles.display_name || report.profiles.full_name || "User"}
                                className="w-full h-full object-cover object-center"
                              />
                            ) : (
                              <AvatarFallback className="bg-slate-800 text-white text-xs">
                                {(report.profiles.display_name || report.profiles.full_name || "U")
                                  .charAt(0)
                                  .toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-sm text-slate-300 hover:text-white">
                            {report.profiles.display_name || report.profiles.full_name || "Unknown"}
                          </span>
                        </Link>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {report.image_url && (
                      <div className="relative w-full h-48 rounded border border-slate-700 overflow-hidden">
                        <Image
                          src={report.image_url || "/placeholder.svg"}
                          alt="Incident evidence"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-1">TIME</p>
                        <p className="text-white">{report.incident_time}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-1">LOCATION</p>
                        <p className="text-white">{report.incident_location}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">PERSONS INVOLVED</p>
                      <p className="text-white">{report.persons_involved}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">DESCRIPTION</p>
                      <p className="text-slate-300 whitespace-pre-wrap">{report.description}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">PREVENTION STRATEGY</p>
                      <p className="text-slate-300 whitespace-pre-wrap">{report.prevention_strategy}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">WITNESS NAME</p>
                      <p className="text-white">{report.witness_name}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">WITNESS CONTACT INFORMATION</p>
                      <p className="text-slate-300 whitespace-pre-wrap">{report.witness_contact}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>Reported on {new Date(report.created_at).toLocaleDateString()}</span>
                      {report.profiles && (
                        <span>
                          Reported by {report.profiles.display_name || report.profiles.full_name || "Unknown"}
                        </span>
                      )}
                    </div>

                    {user?.id === report.reported_by_id && (
                      <div className="pt-2 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(report)}
                          className="gap-2 text-blue-400 border-blue-800 hover:bg-blue-950"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Report
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDelete}
                          className="gap-2 text-red-400 border-red-800 hover:bg-red-950 ml-2 bg-transparent"
                        >
                          <X className="h-4 w-4" />
                          Delete Report
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
          )}
          
          {reports.length > 0 && hasMore && (
            <div className="flex justify-center py-4">
              <Button
                variant="outline"
                onClick={loadMoreReports}
                disabled={loadingMore}
                className="w-full max-w-xs"
              >
                {loadingMore ? "Loading..." : "Load More Reports"}
              </Button>
            </div>
          )}
        </div>
      </main>
      <BottomNav userId={user?.id} />
    </div>
  )
}
