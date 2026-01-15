import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Briefcase } from "lucide-react"

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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Briefcase className="h-24 w-24 text-muted-foreground" />
          </div>
          <div className="inline-block rounded-sm border border-border px-4 py-2 mb-6">
            <span className="text-xs font-light tracking-[0.2em] text-muted-foreground">UNDER DEVELOPMENT</span>
          </div>
          <h1 className="text-6xl font-light leading-tight tracking-tight text-balance lg:text-7xl mb-6">
            Coming
            <br />
            <span className="font-normal">Soon</span>
          </h1>
          <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty mb-12">
            We're building something special. Community Projects will be a collaborative space for innovative
            initiatives and collective growth.
          </p>
          <Button asChild variant="outline" className="font-light tracking-wide bg-transparent">
            <Link href="/castle-project">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Castle Project
            </Link>
          </Button>
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
