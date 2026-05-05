"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeedError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[Feed Error]", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-destructive/50 bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl text-foreground">Failed to load feed</CardTitle>
          <CardDescription className="text-muted-foreground">
            We couldn&apos;t load your feed. This might be a temporary issue.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>Try refreshing the page or check back in a few moments.</p>
        </CardContent>
        <CardFooter className="flex gap-3 justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/"}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
