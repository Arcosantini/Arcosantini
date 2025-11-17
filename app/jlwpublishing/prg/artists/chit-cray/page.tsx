import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default function ChitCray() {
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
            <Link 
              href="/jlwpublishing/prg"
              className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Artists
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Artist Header */}
        <div className="text-center mb-16">
          <div className="w-48 h-48 rounded-full overflow-hidden bg-muted mx-auto mb-8">
            <Image
              src="/chit-cray-profile.png"
              alt="Chit Cray"
              width={192}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-light leading-tight tracking-tight text-balance lg:text-7xl mb-4">
            Chit <span className="font-normal">Cray</span>
          </h1>
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            Houston, TX
          </p>
        </div>

        {/* Albums Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-light tracking-wide mb-8 text-center">
            Discography
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Link 
              href="https://open.spotify.com/album/48Kj2p98DQGBPTu5ETTiul" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border-border bg-card hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/album-scorpion-desert.jpg"
                      alt="Broke Nigga Vol. 2 - Rage Against the Machines Final Fallout"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light tracking-wide mb-2">
                      Broke Nigga Vol. 2
                    </h3>
                    <p className="text-sm font-light text-muted-foreground">
                      Listen on Spotify
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link 
              href="https://open.spotify.com/album/23CRxG3VICSABU4ZV2KUeI" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border-border bg-card hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/album-black-c.jpg"
                      alt="Album 2"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light tracking-wide mb-2">
                      Album 2
                    </h3>
                    <p className="text-sm font-light text-muted-foreground">
                      Listen on Spotify
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link 
              href="https://open.spotify.com/album/6QLfUsctiXYGgwDEncaj3b" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border-border bg-card hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/album-sepia-house.jpg"
                      alt="Broke Nigga"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light tracking-wide mb-2">
                      Broke Nigga
                    </h3>
                    <p className="text-sm font-light text-muted-foreground">
                      Listen on Spotify
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-16 border-t border-border pt-16">
            <h2 className="text-3xl font-light tracking-wide mb-8 text-center">
              More Music
            </h2>
            
            <div className="max-w-md mx-auto">
              <Link 
                href="https://on.soundcloud.com/gk3NM3OZ2hlPlvSwvB" 
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="border-border bg-card hover:border-foreground/20 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                      <Image
                        src="/chit-cray-soundcloud.png"
                        alt="Chit Cray on SoundCloud"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-light tracking-wide mb-2">
                        SoundCloud
                      </h3>
                      <p className="text-sm font-light text-muted-foreground">
                        Listen on SoundCloud
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
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
