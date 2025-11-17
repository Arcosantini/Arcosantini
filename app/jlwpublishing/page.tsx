import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function JLWPublishing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="The Humble Organizational"
                width={50}
                height={62}
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-light text-xl tracking-[0.15em] text-foreground">
                  HUMBLE
                </span>
                <span className="font-light text-xs tracking-[0.2em] text-muted-foreground">
                  ORGANIZATIONAL
                </span>
              </div>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content - Empty/Placeholder */}
      <main className="flex-1 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-light leading-tight tracking-tight text-balance lg:text-7xl mb-6">
            JLW<span className="font-normal">Publishing</span>
          </h1>
          <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty max-w-xl mx-auto">
            Coming soon.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.svg"
                  alt="THO"
                  width={40}
                  height={50}
                  className="h-10 w-auto"
                />
                <div className="flex flex-col">
                  <span className="font-light text-lg tracking-[0.15em] text-foreground">
                    HUMBLE
                  </span>
                  <span className="font-light text-[10px] tracking-[0.2em] text-muted-foreground">
                    ORGANIZATIONAL
                  </span>
                </div>
              </Link>
              <p className="text-sm font-light leading-relaxed text-muted-foreground max-w-md">
                Organizing for Organizers. Building systematic excellence through professional 
                frameworks and community support.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-normal tracking-wide mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    Ventures
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-normal tracking-wide mb-4">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/jlwpublishing/prg" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    PRG
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs font-light tracking-wide text-muted-foreground text-center">
              © 2025 The Humble Organizational. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
