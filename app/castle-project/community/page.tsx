import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function CommunityProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="The Humble Organizational" width={50} height={62} className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="font-light text-xl tracking-[0.15em] text-foreground">HUMBLE</span>
                <span className="font-light text-xs tracking-[0.2em] text-muted-foreground">ORGANIZATIONAL</span>
              </div>
            </Link>
            <Link
              href="/castle-project"
              className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Castle Project
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block rounded-sm border border-border px-4 py-2 mb-6">
              <span className="text-xs font-light tracking-[0.2em] text-muted-foreground">COMMUNITY INITIATIVES</span>
            </div>
            <h1 className="text-5xl font-light leading-tight tracking-tight text-balance lg:text-6xl mb-6">
              Community
              <br />
              <span className="font-normal">Projects</span>
            </h1>
            <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty max-w-2xl mx-auto">
              Collaborative spaces and educational initiatives designed to empower and connect our community
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-1 max-w-3xl mx-auto">
            {/* Vibe Coding Curriculum */}
            <Link
              href="/castle-project/community/vibe-coding"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 hover:border-foreground transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="rounded-full bg-gradient-to-br from-purple-500 to-purple-700 p-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-light tracking-tight mb-3 group-hover:text-muted-foreground transition-colors">
                    Vibe Coding Curriculum
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground mb-4">
                    A 6-week course created for the Houston Public Library teaching AI-powered web development with v0
                    and Vercel. No coding experience required.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block text-xs font-light tracking-wide px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      Education
                    </span>
                    <span className="inline-block text-xs font-light tracking-wide px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      Beginner-Friendly
                    </span>
                    <span className="inline-block text-xs font-light tracking-wide px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      Houston Library
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-tl-full group-hover:scale-150 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image src="/logo.svg" alt="THO" width={40} height={50} className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-light text-lg tracking-[0.15em] text-foreground">HUMBLE</span>
                <span className="font-light text-[10px] tracking-[0.2em] text-muted-foreground">ORGANIZATIONAL</span>
              </div>
            </Link>
            <p className="text-xs font-light tracking-wide text-muted-foreground mt-8">
              © 2025 The Humble Organizational. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
