import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Layers, Sparkles, Users, TrendingUp } from 'lucide-react'

export default function Home() {
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
              <Link href="#services" className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Services
              </Link>
              <Link href="#ventures" className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Ventures
              </Link>
              <Link href="#contact" className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors">
                Contact
              </Link>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-light tracking-wide">
                Get Started
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block rounded-sm border border-border px-4 py-2">
              <span className="text-xs font-light tracking-[0.2em] text-muted-foreground">
                ORGANIZING FOR ORGANIZERS
              </span>
            </div>
            <h1 className="text-5xl font-light leading-tight tracking-tight text-balance lg:text-7xl">
              Structure meets
              <br />
              <span className="font-normal">excellence.</span>
            </h1>
            <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty max-w-xl">
              The Humble Organizational empowers professional organizers with systematic frameworks, 
              curated resources, and business solutions that transform complexity into clarity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-light tracking-wide">
                Explore THO
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="font-light tracking-wide">
                Our Philosophy
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-sm bg-card border border-border overflow-hidden">
              <Image
                src="/minimalist-organized-workspace-with-clean-lines-an.jpg"
                alt="Organized workspace"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-sm bg-primary p-8 text-primary-foreground">
              <div className="text-4xl font-light">THO</div>
              <div className="text-xs font-light tracking-[0.2em] mt-1">EST. 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Offering Section */}
      <section id="services" className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-tight text-balance lg:text-5xl">
              The THO <span className="font-normal">Difference</span>
            </h2>
            <p className="mt-4 text-lg font-light text-muted-foreground text-pretty max-w-2xl mx-auto">
              We provide the infrastructure that allows organizers to focus on what they do best
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-8 border-border hover:border-foreground/20 transition-colors">
              <Layers className="h-10 w-10 mb-6 text-foreground" />
              <h3 className="text-xl font-normal mb-3 tracking-wide">Systematic Frameworks</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                Battle-tested organizational systems that scale from single rooms to entire estates
              </p>
            </Card>
            <Card className="p-8 border-border hover:border-foreground/20 transition-colors">
              <Sparkles className="h-10 w-10 mb-6 text-foreground" />
              <h3 className="text-xl font-normal mb-3 tracking-wide">Curated Resources</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                Premium tools, templates, and materials selected specifically for professional organizers
              </p>
            </Card>
            <Card className="p-8 border-border hover:border-foreground/20 transition-colors">
              <Users className="h-10 w-10 mb-6 text-foreground" />
              <h3 className="text-xl font-normal mb-3 tracking-wide">Community Support</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                Connect with fellow organizers, share insights, and grow together as a collective
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Ventures Section */}
      <section id="ventures" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-light tracking-tight text-balance lg:text-5xl mb-4">
            Our <span className="font-normal">Ecosystem</span>
          </h2>
          <p className="text-lg font-light text-muted-foreground text-pretty max-w-2xl">
            From The Humble Organizational foundation, we&apos;re building complementary ventures 
            that serve the broader organization and productivity space
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-0 overflow-hidden border-border group hover:border-foreground/20 transition-colors">
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src="/modern-organizing-supplies-and-tools-neatly-arrang.jpg"
                alt="THO Primary Business"
                width={640}
                height={400}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 rounded-sm bg-primary px-3 py-1 text-xs font-light tracking-[0.15em] text-primary-foreground">
                PRIMARY
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-normal mb-3 tracking-wide">The Humble Organizational</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6">
                Our flagship offering: comprehensive systems, training, and resources designed 
                specifically for professional organizers who demand excellence
              </p>
              <Button variant="outline" className="font-light tracking-wide group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 border-border hover:border-foreground/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-block rounded-sm bg-muted px-2 py-1 text-[10px] font-light tracking-[0.15em] text-muted-foreground mb-2">
                    COMING SOON
                  </div>
                  <h3 className="text-xl font-normal tracking-wide">Space Optimization Studio</h3>
                </div>
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                Advanced spatial design consultancy for residential and commercial organizing projects
              </p>
            </Card>

            <Card className="p-6 border-border hover:border-foreground/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-block rounded-sm bg-muted px-2 py-1 text-[10px] font-light tracking-[0.15em] text-muted-foreground mb-2">
                    IN DEVELOPMENT
                  </div>
                  <h3 className="text-xl font-normal tracking-wide">Organizer&apos;s Marketplace</h3>
                </div>
                <Sparkles className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                Curated platform connecting professional organizers with premium suppliers and tools
              </p>
            </Card>

            <Card className="p-6 border-border hover:border-foreground/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-block rounded-sm bg-muted px-2 py-1 text-[10px] font-light tracking-[0.15em] text-muted-foreground mb-2">
                    PLANNING
                  </div>
                  <h3 className="text-xl font-normal tracking-wide">Systems Certification Program</h3>
                </div>
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                Professional development and certification for organizers seeking mastery and recognition
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-light tracking-tight text-balance lg:text-5xl mb-6">
              Ready to elevate your
              <br />
              <span className="font-normal">organizing practice?</span>
            </h2>
            <p className="text-lg font-light leading-relaxed mb-8 opacity-90 text-pretty">
              Join The Humble Organizational community and access the frameworks, resources, 
              and support that professional organizers trust
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="font-light tracking-wide">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-light tracking-wide">
                View Pricing
              </Button>
            </div>
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
