"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MessagesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[Messages Error]", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-destructive/50 bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl text-foreground">Failed to load messages</CardTitle>
          <CardDescription className="text-muted-foreground">
            We couldn&apos;t load your conversations. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>Your messages are safe - this is just a loading issue.</p>
        </CardContent>
        <CardFooter className="flex gap-3 justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/feed"}
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Feed
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
