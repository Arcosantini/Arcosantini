"use client"

import { useEffect, useState } from "react"
import { X, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DemoHighlightProps {
  id: string
  title: string
  description: string
  position?: "top" | "bottom" | "left" | "right"
  show: boolean
  onDismiss: () => void
  onNext?: () => void
  hasNext?: boolean
  className?: string
  pulseColor?: string
}

export function DemoHighlight({
  id,
  title,
  description,
  position = "bottom",
  show,
  onDismiss,
  onNext,
  hasNext = false,
  className,
  pulseColor = "blue",
}: DemoHighlightProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [show])

  if (!show) return null

  const positionClasses = {
    top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-3 left-1/2 -translate-x-1/2",
    left: "right-full mr-3 top-1/2 -translate-y-1/2",
    right: "left-full ml-3 top-1/2 -translate-y-1/2",
  }

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-blue-500",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-blue-500",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-blue-500",
    right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-blue-500",
  }

  return (
    <div
      className={cn(
        "absolute z-50 w-72 transition-all duration-300",
        positionClasses[position],
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
    >
      {/* Arrow pointer */}
      <div className={cn("absolute w-0 h-0 border-8", arrowClasses[position])} />
      
      {/* Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl border border-blue-400/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-blue-500/20">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wide">Demo Guide</span>
          </div>
          <button
            onClick={onDismiss}
            className="text-blue-200 hover:text-white transition-colors p-1 rounded-full hover:bg-blue-500/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-4 py-3">
          <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
          <p className="text-blue-100 text-sm leading-relaxed">{description}</p>
        </div>
        
        {/* Footer */}
        <div className="px-4 pb-3 flex justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onDismiss}
            className="text-blue-200 hover:text-white hover:bg-blue-500/30 h-8"
          >
            Got it
          </Button>
          {hasNext && onNext && (
            <Button
              size="sm"
              onClick={onNext}
              className="bg-white text-blue-600 hover:bg-blue-50 h-8"
            >
              Next <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Wrapper component that adds pulsing ring effect
export function DemoHighlightWrapper({
  children,
  show,
  className,
}: {
  children: React.ReactNode
  show: boolean
  className?: string
}) {
  if (!show) return <>{children}</>

  return (
    <div className={cn("relative", className)}>
      {/* Pulsing ring effect */}
      <div className="absolute -inset-2 rounded-lg">
        <div className="absolute inset-0 rounded-lg border-2 border-blue-400 animate-pulse" />
        <div className="absolute inset-0 rounded-lg bg-blue-400/10 animate-pulse" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
