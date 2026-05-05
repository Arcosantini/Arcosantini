"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Base skeleton element with shimmer animation
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted rounded ${className}`}
    />
  )
}

// Post card skeleton - matches PostCard layout
export function PostCardSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {/* Name and time */}
            <div className="flex items-center gap-2 mb-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            {/* Handle */}
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Post content */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        {/* Action buttons */}
        <div className="flex items-center gap-4 pt-3 border-t border-border">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

// Job card skeleton - matches job listing layout
export function JobCardSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Company logo */}
          <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {/* Job title */}
            <Skeleton className="h-5 w-48 mb-2" />
            {/* Company name */}
            <Skeleton className="h-4 w-32 mb-2" />
            {/* Location and type */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          {/* Bookmark button */}
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}

// Message/Conversation skeleton
export function ConversationSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border">
      <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-3 w-12" />
    </div>
  )
}

// Profile card skeleton
export function ProfileCardSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

// Incident report card skeleton
export function IncidentReportSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-28 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Report type and location */}
        <div className="space-y-2 mb-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

// Full page loading skeleton with header
export function PageSkeleton({ 
  children, 
  showHeader = true 
}: { 
  children: React.ReactNode
  showHeader?: boolean 
}) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </header>
      )}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}

// Feed page skeleton
export function FeedPageSkeleton() {
  return (
    <PageSkeleton>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Create post card */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 flex-1 rounded-lg" />
            </div>
          </CardContent>
        </Card>
        {/* Post skeletons */}
        {[...Array(3)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </PageSkeleton>
  )
}

// Jobs page skeleton
export function JobsPageSkeleton() {
  return (
    <PageSkeleton>
      <div className="max-w-4xl mx-auto">
        {/* Search/filter bar */}
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        {/* Job listings */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageSkeleton>
  )
}

// People page skeleton
export function PeoplePageSkeleton() {
  return (
    <PageSkeleton>
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-full rounded-lg mb-6" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <ProfileCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageSkeleton>
  )
}

// Messages page skeleton
export function MessagesPageSkeleton() {
  return (
    <PageSkeleton>
      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-8 w-32 mb-6" />
        <Card className="bg-card border-border overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <ConversationSkeleton key={i} />
          ))}
        </Card>
      </div>
    </PageSkeleton>
  )
}

// Incident reports page skeleton
export function IncidentReportsPageSkeleton() {
  return (
    <PageSkeleton>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <IncidentReportSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageSkeleton>
  )
}
