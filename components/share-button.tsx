"use client"

import { Share2 } from "lucide-react"

interface ShareButtonProps {
  url: string
  title: string
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const handleShare = async () => {
    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl })
      } catch (err) {
        console.log("Share cancelled or failed")
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(fullUrl)
      } catch (err) {
        console.error("Copy failed:", err)
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-slate-400 hover:text-green-400 hover:bg-slate-700/50 transition-colors p-2 rounded-md"
    >
      <Share2 className="h-4 w-4" />
    </button>
  )
}
