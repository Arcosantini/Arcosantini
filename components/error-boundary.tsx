"use client"

import React, { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorFallback 
          error={this.state.error} 
          onReset={this.handleReset} 
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error | null
  onReset?: () => void
  showHomeButton?: boolean
}

export function ErrorFallback({ error, onReset, showHomeButton = true }: ErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-destructive/50 bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl text-foreground">Something went wrong</CardTitle>
          <CardDescription className="text-muted-foreground">
            We encountered an unexpected error. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium text-foreground mb-1">Error details:</p>
              <p className="text-muted-foreground font-mono text-xs break-all">
                {error.message}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
          {onReset && (
            <Button onClick={onReset} variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {showHomeButton && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/feed"}
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

// Wrapper component for simpler usage with function components
interface WithErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export function WithErrorBoundary({ children, fallback }: WithErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  )
}
