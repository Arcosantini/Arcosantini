import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Lock, Users, Briefcase } from "lucide-react"

export default function CastleProjectPage() {
  return (
    <div className="min-h-screen">
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
              href="/"
              className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-sm border border-border px-4 py-2 mb-6">
            <span className="text-xs font-light tracking-[0.2em] text-muted-foreground">DIGITAL VENTURES</span>
          </div>
          <h1 className="text-5xl font-light leading-tight tracking-tight text-balance lg:text-7xl mb-6">
            The Castle
            <br />
            <span className="font-normal">Project</span>
          </h1>
          <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty">
            Secure digital infrastructure and community platforms built for privacy, connection, and professional
            collaboration
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Encrypted Chat Room */}
          <Card className="p-0 overflow-hidden border-border group hover:border-foreground/20 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-card to-muted flex items-center justify-center">
              <Lock className="h-20 w-20 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="p-8">
              <div className="inline-block rounded-sm bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-light tracking-[0.15em] text-primary mb-4">
                SECURE COMMUNICATION
              </div>
              <h3 className="text-2xl font-normal mb-3 tracking-wide">Encrypted Chat Room</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6">
                End-to-end encrypted messaging platform for secure, private conversations. Built with modern
                cryptography and zero-knowledge architecture
              </p>
              <Button asChild variant="outline" className="font-light tracking-wide group w-full bg-transparent">
                <Link href="https://v0-encrypted-chat-room-nu.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Enter Chat Room
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* MSS - Bar Security Network */}
          <Card className="p-0 overflow-hidden border-border group hover:border-foreground/20 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-card to-muted flex items-center justify-center">
              <Users className="h-20 w-20 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="p-8">
              <div className="inline-block rounded-sm bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-light tracking-[0.15em] text-primary mb-4">
                COMMUNITY NETWORK
              </div>
              <h3 className="text-2xl font-normal mb-3 tracking-wide">MSS Network</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6">
                Social network designed for bar and hospitality security professionals. Share insights, connect with
                peers, and build industry relationships
              </p>
              <Button asChild variant="outline" className="font-light tracking-wide group w-full bg-transparent">
                <Link
                  href="https://v0-social-network-for-bar.vercel.app/feed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit MSS Network
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden border-border group hover:border-foreground/20 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-card to-muted flex items-center justify-center">
              <Briefcase className="h-20 w-20 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="p-8">
              <div className="inline-block rounded-sm bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-light tracking-[0.15em] text-primary mb-4">
                COLLABORATIVE SPACE
              </div>
              <h3 className="text-2xl font-normal mb-3 tracking-wide">Community Projects</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6">
                Discover and contribute to community-driven initiatives. A space for collaboration, innovation, and
                collective growth
              </p>
              <Button asChild variant="outline" className="font-light tracking-wide group w-full bg-transparent">
                <Link href="/castle-project/community">
                  Explore Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
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
