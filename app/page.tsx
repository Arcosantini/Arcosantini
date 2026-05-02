import { Button } from "@/components/ui/button"
import { Shield, Users, Briefcase, MessageCircle, Star, CheckCircle, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 shrink-0" />
              <span className="text-xl sm:text-2xl font-bold text-white">MSS</span>
            </div>
            <img 
              src="/images/main-street-social-brick.jpg" 
              alt="Main Street Social" 
              className="h-7 sm:h-9 w-auto rounded-sm mt-1"
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button asChild variant="ghost" size="sm" className="text-slate-200 hover:text-white h-9 sm:h-10 text-sm">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 sm:h-10 text-sm">
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 sm:py-20 md:py-28 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 text-balance leading-tight">
              The Professional Network for Main Street
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-10 text-pretty px-4 max-w-2xl mx-auto leading-relaxed">
              Connect with security professionals, discover job opportunities, and build your career in the bar and nightlife industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 text-lg px-8 w-full sm:w-auto font-semibold shadow-lg shadow-blue-600/25">
                <Link href="/auth/sign-up">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-500 text-white hover:bg-slate-800 bg-transparent h-14 text-lg px-8 w-full sm:w-auto font-semibold"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-slate-800/50 border-y border-slate-700 py-8 sm:py-10">
          <div className="container mx-auto px-4">
            <p className="text-center text-slate-400 text-sm sm:text-base uppercase tracking-wider font-medium mb-6">
              Trusted by Security Professionals Across Main Street
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm sm:text-base">Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm sm:text-base">Direct Employer Connections</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm sm:text-base">Secure Messaging</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Your Trusted Partner in Bar Security Careers
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Main Street Social connects security professionals directly with venues and employers. No middlemen, no brokers - just direct connections that help you build your career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-5">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Build Your Network</h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Connect with security professionals across the industry and grow your professional circle.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-5">
                <Briefcase className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Find Opportunities</h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Discover job openings at top venues and events. Get hired directly by employers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-5">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Showcase Skills</h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Highlight your experience, certifications, and training to stand out.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-5">
                <MessageCircle className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Stay Connected</h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Communicate directly with employers and peers through secure messaging.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-slate-800/30 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                What Our Members Say
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Hear from security professionals who have grown their careers with MSS.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sm:p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-6 italic">
                  &quot;MSS connected me with my current employer within a week of signing up. The direct communication with hiring managers made all the difference.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-semibold">JM</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">James M.</p>
                    <p className="text-slate-500 text-sm">Security Professional</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sm:p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-6 italic">
                  &quot;Finally, a platform built specifically for our industry. The job listings are relevant and the networking features help me stay connected.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-semibold">SK</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Sarah K.</p>
                    <p className="text-slate-500 text-sm">Venue Security Manager</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sm:p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-6 italic">
                  &quot;As a venue owner, finding qualified security staff used to be a challenge. MSS makes it easy to find verified professionals quickly.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-semibold">RD</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Robert D.</p>
                    <p className="text-slate-500 text-sm">Bar Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-slate-700 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Career?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Join Main Street Social today and connect with opportunities in the bar security industry.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 text-lg px-10 font-semibold shadow-lg shadow-blue-600/25">
              <Link href="/auth/sign-up">Create Your Free Profile</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-slate-700 bg-slate-900">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">MSS</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                The professional network for bar security. Connecting professionals with opportunities since 2025.
              </p>
              <img 
                src="/images/main-street-social-brick.jpg" 
                alt="Main Street Social" 
                className="h-8 w-auto rounded-sm opacity-75"
              />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/auth/sign-up" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Job Board
                  </Link>
                </li>
                <li>
                  <Link href="/people" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Find People
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/data-deletion" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Data Deletion
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-400 text-sm">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>support@mainstreetsocial.com</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>Houston, TX</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Main Street Social. All rights reserved. Professional networking for bar security.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
