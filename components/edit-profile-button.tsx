"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Pencil } from "lucide-react"

interface Profile {
  id: string
  full_name: string
  display_name: string
  bio: string | null
  location: string | null
  years_experience: number | null
  avatar_url: string | null
  certifications: string[] | null
}

interface EditProfileButtonProps {
  profile: Profile
}

export function EditProfileButton({ profile }: EditProfileButtonProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile.full_name,
    display_name: profile.display_name,
    bio: profile.bio || "",
    location: profile.location || "",
    years_experience: profile.years_experience || 0,
    avatar_url: profile.avatar_url || "",
    certifications: profile.certifications?.join(", ") || "",
  })
  const router = useRouter()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      setFormData((prev) => ({ ...prev, avatar_url: data.url }))
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      const certArray = formData.certifications
        .split(",")
        .map((cert) => cert.trim())
        .filter((cert) => cert.length > 0)

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          display_name: formData.display_name,
          bio: formData.bio || null,
          location: formData.location || null,
          years_experience: formData.years_experience || null,
          avatar_url: formData.avatar_url || null,
          certifications: certArray.length > 0 ? certArray : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)

      if (error) throw error

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Update error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-slate-800 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
          <DialogDescription className="text-slate-400">Update your professional profile information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-slate-700">
              <AvatarImage src={formData.avatar_url || undefined} />
              <AvatarFallback className="bg-slate-700 text-white text-2xl">
                {formData.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label
                htmlFor="avatar-upload"
                className="cursor-pointer inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Photo"}
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-slate-200">
              Full Name
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_name" className="text-slate-200">
              Display Name
            </Label>
            <Input
              id="display_name"
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              required
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-slate-200">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about your experience..."
              className="bg-slate-900 border-slate-600 text-white resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-200">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State"
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years_experience" className="text-slate-200">
              Years of Experience
            </Label>
            <Input
              id="years_experience"
              type="number"
              min="0"
              value={formData.years_experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  years_experience: Number.parseInt(e.target.value) || 0,
                })
              }
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications" className="text-slate-200">
              Certifications (comma separated)
            </Label>
            <Input
              id="certifications"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              placeholder="CPR, First Aid, Security License"
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-slate-600 text-slate-200"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
