import { Button } from "@/components/ui/button"
import { Shield, Users, Briefcase, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-white leading-tight">MSS</span>
              <span className="text-[10px] sm:text-xs text-slate-400 leading-tight">Main Street Social</span>
            </div>
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
        <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance px-2">
              The Professional Network for Main Street
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 text-pretty px-4">
              Connect with security professionals, discover job opportunities, and build your career in the bar and
              nightlife industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 text-base w-full sm:w-auto">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent h-12 text-base w-full sm:w-auto"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex flex-col items-center text-center p-5 sm:p-6 rounded-lg bg-slate-800/50 border border-slate-700">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Build Your Network</h3>
              <p className="text-sm sm:text-base text-slate-400">
                Connect with security professionals across the industry
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-5 sm:p-6 rounded-lg bg-slate-800/50 border border-slate-700">
              <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-green-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Find Opportunities</h3>
              <p className="text-sm sm:text-base text-slate-400">Discover job openings at top venues and events</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 sm:p-6 rounded-lg bg-slate-800/50 border border-slate-700">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Showcase Skills</h3>
              <p className="text-sm sm:text-base text-slate-400">Highlight your experience and certifications</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 sm:p-6 rounded-lg bg-slate-800/50 border border-slate-700">
              <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-orange-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Stay Connected</h3>
              <p className="text-sm sm:text-base text-slate-400">Communicate directly with employers and peers</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-700 bg-slate-900/50 mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center text-xs sm:text-sm text-slate-400">
          <p>&copy; 2025 Main Street Social. Professional networking for bar security.</p>
        </div>
      </footer>
    </div>
  )
}
