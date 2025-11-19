import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, TrendingUp, BookOpen } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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
            <div className="hidden items-center gap-8 md:flex">
              <Link href="/" className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Home
              </Link>
              <Link href="/#services" className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Services
              </Link>
              <Link href="/#contact" className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Contact
              </Link>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-light tracking-wide">
                <Link href="/book">Get Started</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block rounded-sm border border-border px-4 py-2 mb-8">
            <span className="text-xs font-light tracking-[0.2em] text-muted-foreground">
              OUR STORY
            </span>
          </div>
          <h1 className="text-5xl font-light leading-tight tracking-tight text-balance lg:text-7xl mb-8">
            Building a space for
            <br />
            <span className="font-normal">organizers to thrive.</span>
          </h1>
          <p className="text-xl font-light leading-relaxed text-muted-foreground text-pretty max-w-3xl mx-auto">
            The Humble Organizational was founded with a simple yet powerful vision: to create 
            a legitimate space where professional organizers can connect, learn, and grow their craft.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-light tracking-tight text-balance lg:text-5xl">
                Our <span className="font-normal">Mission</span>
              </h2>
              <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty">
                For too long, professional organizers have operated in isolation, each solving 
                the same challenges independently. We recognized the need for a central hub—a 
                place where organizers could find not just tools and resources, but genuine 
                community and shared wisdom.
              </p>
              <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty">
                The Humble Organizational exists to elevate the entire profession by providing 
                systematic frameworks that work, fostering connections between practitioners, 
                and creating opportunities for continuous learning and growth.
              </p>
              <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty">
                We believe that when organizers have access to proven systems, quality resources, 
                and a supportive community, they can focus on what truly matters: transforming 
                spaces and improving lives.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm bg-card border border-border overflow-hidden">
                <Image
                  src="/minimalist-organized-workspace-with-clean-lines-an.jpg"
                  alt="Professional organizing workspace"
                  width={600}
                  height={750}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light tracking-tight text-balance lg:text-5xl mb-4">
            What We <span className="font-normal">Stand For</span>
          </h2>
          <p className="text-lg font-light text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our values guide everything we do, from the resources we create to the 
            community we build
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-8 border-border">
            <Heart className="h-10 w-10 mb-6 text-foreground" />
            <h3 className="text-xl font-normal mb-3 tracking-wide">Authenticity</h3>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              We believe in humble, honest approaches that prioritize substance over style
            </p>
          </Card>
          <Card className="p-8 border-border">
            <Users className="h-10 w-10 mb-6 text-foreground" />
            <h3 className="text-xl font-normal mb-3 tracking-wide">Community</h3>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              Organizers supporting organizers—collaboration over competition, always
            </p>
          </Card>
          <Card className="p-8 border-border">
            <TrendingUp className="h-10 w-10 mb-6 text-foreground" />
            <h3 className="text-xl font-normal mb-3 tracking-wide">Excellence</h3>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              We demand quality in everything we create, because you deserve nothing less
            </p>
          </Card>
          <Card className="p-8 border-border">
            <BookOpen className="h-10 w-10 mb-6 text-foreground" />
            <h3 className="text-xl font-normal mb-3 tracking-wide">Growth</h3>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              Continuous learning and evolution are at the heart of mastering the craft
            </p>
          </Card>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-light tracking-tight text-balance lg:text-5xl mb-6">
              Looking <span className="font-normal">Forward</span>
            </h2>
            <p className="text-xl font-light leading-relaxed mb-8 opacity-90 text-pretty">
              We envision a future where professional organizing is recognized as the skilled 
              craft it truly is. A future where every organizer has access to world-class resources, 
              supportive peers, and opportunities for growth. A future where The Humble Organizational 
              serves as the foundation for excellence in our industry.
            </p>
            <p className="text-lg font-light leading-relaxed opacity-90 text-pretty">
              Join us in building this future, one organized space at a time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-light tracking-tight text-balance lg:text-5xl mb-6">
            Ready to join our
            <br />
            <span className="font-normal">community?</span>
          </h2>
          <p className="text-lg font-light leading-relaxed text-muted-foreground mb-8 text-pretty">
            Connect with fellow organizers, access proven frameworks, and grow your practice 
            with The Humble Organizational
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-light tracking-wide">
              <Link href="/book">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-light tracking-wide">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
                  <Link href="/about" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#ventures" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
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
                  <Link href="/#contact" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
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
                  <Link href="/jlwpublishing" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    JLWPublishing
                  </Link>
                </li>
                <li>
                  <Link href="https://v0-encrypted-chat-room-nu.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                    The Castle Project
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
