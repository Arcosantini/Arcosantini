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
import { Upload, BadgeCheck, Clock, Info, Shield } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Profile {
  id: string
  full_name: string
  display_name: string
  bio: string | null
  location: string | null
  years_experience: number | null
  avatar_url: string | null
  certifications: string[] | null
  website_url?: string | null
  social_link?: string | null
  social_platform?: string | null
  profession?: string | null
  account_type?: string | null
  verification_status?: string | null
  is_security_professional?: boolean | null
}

interface EditProfileButtonProps {
  profile: Profile
  isAdmin?: boolean
}

export function EditProfileButton({ profile, isAdmin = false }: EditProfileButtonProps) {
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
    website_url: profile.website_url || "",
    social_link: profile.social_link || "",
    social_platform: profile.social_platform || "",
    profession: profile.profession || "",
  })
  const [requestBusiness, setRequestBusiness] = useState(
    profile.account_type === "business" || profile.verification_status === "pending"
  )
  const [isSecurityPro, setIsSecurityPro] = useState(!!profile.is_security_professional)
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

      const updateData: Record<string, unknown> = {
        full_name: formData.full_name,
        display_name: formData.display_name,
        bio: formData.bio || null,
        location: formData.location || null,
        years_experience: formData.years_experience || null,
        avatar_url: formData.avatar_url || null,
        certifications: certArray.length > 0 ? certArray : null,
        website_url: formData.website_url || null,
        social_link: formData.social_link || null,
        social_platform: formData.social_platform || null,
        profession: formData.profession || null,
        updated_at: new Date().toISOString(),
      }

      // Handle security professional
      updateData.is_security_professional = isSecurityPro

      // Handle business verification request
      if (requestBusiness && profile.account_type !== "business") {
        if (profile.verification_status !== "pending" && profile.verification_status !== "approved") {
          updateData.account_type = "business"
          updateData.verification_status = "pending"
          updateData.verification_requested_at = new Date().toISOString()
        }
      } else if (!requestBusiness && profile.verification_status === "pending") {
        updateData.account_type = "professional"
        updateData.verification_status = null
        updateData.verification_requested_at = null
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
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
        <Button variant="outline" className="flex-1 border-border bg-transparent text-foreground hover:bg-accent">
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-card border-border text-card-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Edit Profile</DialogTitle>
          <DialogDescription className="text-muted-foreground">Update your profile information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-border">
              <AvatarImage src={formData.avatar_url || undefined} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
                {formData.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label
                htmlFor="avatar-upload"
                className="cursor-pointer inline-flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : "Change photo"}
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
            <Label htmlFor="full_name" className="text-foreground">
              Name
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_name" className="text-foreground">
              Username
            </Label>
            <Input
              id="display_name"
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              required
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession" className="text-foreground">
              Profession
            </Label>
            <Input
              id="profession"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              placeholder="e.g., Security Manager, Bouncer"
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-foreground">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              className="bg-background border-border text-foreground resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url" className="text-foreground">
              Website
            </Label>
            <Input
              id="website_url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://yourwebsite.com"
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="social_platform" className="text-foreground">
                Social Platform
              </Label>
              <Input
                id="social_platform"
                value={formData.social_platform}
                onChange={(e) => setFormData({ ...formData, social_platform: e.target.value })}
                placeholder="Instagram, Twitter"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_link" className="text-foreground">
                Social Link
              </Label>
              <Input
                id="social_link"
                value={formData.social_link}
                onChange={(e) => setFormData({ ...formData, social_link: e.target.value })}
                placeholder="https://instagram.com/you"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State"
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years_experience" className="text-foreground">
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
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications" className="text-foreground">
              Certifications (comma separated)
            </Label>
            <Input
              id="certifications"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              placeholder="CPR, First Aid, Security License"
              className="bg-background border-border text-foreground"
            />
          </div>

          {/* Business Verification Toggle */}
          <div className="rounded-lg border border-border bg-background p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-blue-500" />
                <Label htmlFor="business-toggle" className="text-foreground font-medium">
                  Business / Hiring Account
                </Label>
              </div>
              <Switch
                id="business-toggle"
                checked={requestBusiness}
                onCheckedChange={setRequestBusiness}
                disabled={profile.verification_status === "approved"}
              />
            </div>
            {profile.verification_status === "approved" ? (
              <div className="flex items-center gap-2 text-sm text-green-500">
                <BadgeCheck className="h-4 w-4" />
                <span>Verified Business Account</span>
              </div>
            ) : profile.verification_status === "pending" ? (
              <div className="flex items-center gap-2 text-sm text-yellow-500">
                <Clock className="h-4 w-4" />
                <span>Verification pending admin approval</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                <span>Enable to request verification as a business or hiring entity. Requires admin approval.</span>
              </div>
            )}
          </div>

          {/* Security Professional Toggle */}
          <div className="rounded-lg border border-border bg-background p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <Label htmlFor="security-toggle" className="text-foreground font-medium">
                  Security Professional
                </Label>
              </div>
              <Switch
                id="security-toggle"
                checked={isSecurityPro}
                onCheckedChange={setIsSecurityPro}
              />
            </div>
            {isSecurityPro ? (
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <Shield className="h-4 w-4" />
                <span>Security Professional Badge Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                <span>Enable to display the security professional shield badge on your profile.</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-border text-foreground bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : "Done"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
