"use client"

import { BadgeCheck } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

export function VerifiedBadge({ size = "md", className = "" }: VerifiedBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <BadgeCheck
            className={`inline-block text-blue-500 shrink-0 ${sizeMap[size]} ${className}`}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Verified Business Account</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
