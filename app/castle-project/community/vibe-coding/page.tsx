import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function VibeCodingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-3">Vibe Coding with v0 & Vercel</h1>
          <p className="text-xl opacity-95">Houston Public Library - 6-Week Course Curriculum</p>
        </div>
      </header>

      {/* Course Info Grid */}
      <div className="bg-gray-50 border-b-2 border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-[#667eea] text-sm uppercase tracking-wider mb-2">Duration</h3>
              <p className="text-lg font-semibold">6 weeks</p>
            </div>
            <div className="text-center">
              <h3 className="text-[#667eea] text-sm uppercase tracking-wider mb-2">Session Length</h3>
              <p className="text-lg font-semibold">2 hours</p>
            </div>
            <div className="text-center">
              <h3 className="text-[#667eea] text-sm uppercase tracking-wider mb-2">Level</h3>
              <p className="text-lg font-semibold">Beginner-Friendly</p>
            </div>
            <div className="text-center">
              <h3 className="text-[#667eea] text-sm uppercase tracking-wider mb-2">Prerequisites</h3>
              <p className="text-lg font-semibold">None Required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
          <Link
            href="/castle-project/community"
            className="inline-flex items-center gap-2 text-sm text-[#667eea] hover:text-[#764ba2] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Community Projects
          </Link>

          {/* Overview */}
          <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-[#667eea] mb-12">
            <h2 className="text-2xl font-bold text-[#667eea] mb-4">Course Overview</h2>
            <p className="mb-4 leading-relaxed">
              Learn to build beautiful, functional websites using AI-powered design tools and modern deployment
              platforms. No prior coding experience required—just bring your creativity and ideas!
            </p>
            <p className="leading-relaxed">
              <strong>Target Audience:</strong> Teens and adults, beginners to intermediate
              <br />
              <strong>Tools Required:</strong> Computer with internet access, email address (for accounts)
            </p>
          </div>

          {/* Week 1 */}
          <div className="mb-12 p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-blue-50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Welcome to Vibe Coding</h3>
                <p className="text-[#667eea] italic">What is vibe coding and setting up your creative workspace</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-[#667eea] mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-[#667eea] before:font-bold">
                    Understand what "vibe coding" means (AI-assisted, intuitive web development)
                  </li>
                  <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-[#667eea] before:font-bold">
                    Create accounts for v0.dev and Vercel
                  </li>
                  <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-[#667eea] before:font-bold">
                    Learn the basics of prompting AI for design
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#667eea] mb-3">Session Outline</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded border-l-3 border-[#667eea]">
                    <strong className="text-[#667eea]">Introduction (20 min)</strong>
                    <br />
                    What is vibe coding? Creative expression meets AI assistance. Real-world examples of projects built
                    with v0. Overview of the tools: v0 (design), Vercel (hosting).
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-l-3 border-[#667eea]">
                    <strong className="text-[#667eea]">Hands-On Setup (40 min)</strong>
                    <br />
                    Create v0.dev and Vercel accounts. Connect to GitHub. Tour of the v0 interface. Understanding
                    components vs. full pages.
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-l-3 border-[#667eea]">
                    <strong className="text-[#667eea]">First Creation (45 min)</strong>
                    <br />
                    Prompt exercise: "Create a personal landing page with [your interests]". Iterate on the design with
                    follow-up prompts.
                  </div>
                  <div className="bg-gray-50 p-4 rounded border-l-3 border-[#667eea]">
                    <strong className="text-[#667eea]">Wrap-Up (15 min)</strong>
                    <br />
                    Share creations. Assignment: Brainstorm 3 website ideas you'd like to build.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 2 */}
          <div className="mb-12 p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-blue-50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Mastering the Art of Prompting</h3>
                <p className="text-[#667eea] italic">How to communicate your vision to AI</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-[#667eea] mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-[#667eea] before:font-bold">
                    Write effective prompts for desired outcomes
                  </li>
                  <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-[#667eea] before:font-bold">
                    Iterate and refine designs
                  </li>
                  <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-[#667eea] before:font-bold">
                    Understand basic UI/UX principles
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Weeks 3-6 Summary */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Building Interactive Components</h3>
              </div>
              <p className="text-gray-600 ml-16">Adding functionality and user interaction</p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold">Deploying Your First Site</h3>
              </div>
              <p className="text-gray-600 ml-16">Taking your creation live on the internet</p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-xl font-bold">
                  5
                </div>
                <h3 className="text-xl font-bold">Advanced Vibes & Integrations</h3>
              </div>
              <p className="text-gray-600 ml-16">Taking it to the next level</p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-xl font-bold">
                  6
                </div>
                <h3 className="text-xl font-bold">Community Showcase & Next Steps</h3>
              </div>
              <p className="text-gray-600 ml-16">Celebration and continuing your journey</p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-orange-50 p-8 rounded-lg border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Teaching Tips</h2>
            <ol className="space-y-3 pl-5 list-decimal">
              <li>Celebrate mistakes as learning opportunities</li>
              <li>Keep the energy high—this should feel like creative play</li>
              <li>Encourage students to think big and iterate small</li>
              <li>Show, don't just tell—live demo frequently</li>
              <li>Create a supportive community where everyone shares</li>
            </ol>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8">
        <p>Created for Houston Public Library by The Humble Organizational</p>
        <p className="text-sm mt-2 text-gray-400">Empowering the next generation of creators</p>
      </footer>
    </div>
  )
}
