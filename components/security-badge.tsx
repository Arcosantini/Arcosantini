"use client"

import { Shield } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SecurityBadgeProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

export function SecurityBadge({ size = "md", className = "" }: SecurityBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Shield
            className={`inline-block text-blue-400 shrink-0 ${sizeMap[size]} ${className}`}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Verified Security Professional</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
