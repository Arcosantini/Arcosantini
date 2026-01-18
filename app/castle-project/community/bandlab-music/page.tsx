import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Music, Headphones, Users, Monitor } from "lucide-react"

export default function BandLabMusicPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <nav className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="The Humble Organizational" width={50} height={62} className="h-12 w-auto invert" />
              <div className="flex flex-col">
                <span className="font-light text-xl tracking-[0.15em] text-white">HUMBLE</span>
                <span className="font-light text-xs tracking-[0.2em] text-white/70">ORGANIZATIONAL</span>
              </div>
            </Link>
            <Link
              href="/castle-project/community"
              className="text-sm font-light tracking-wide text-white hover:text-white/70 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Community
            </Link>
          </div>
        </nav>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">BandLab Music Production Curriculum</h1>
          <p className="text-xl text-white/90">Houston Public Library System</p>
        </div>
      </header>

      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
          {/* Overview */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Program Overview</h2>
            <p className="text-gray-700 mb-6">
              This 8-week curriculum introduces students to digital music production using BandLab, a free online digital audio workstation (DAW). Perfect for beginners ages 12+, no prior music experience required.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <strong className="text-indigo-600 block mb-2">Duration</strong>
                <span className="text-gray-700">8 weeks, 90 minutes per session</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <strong className="text-indigo-600 block mb-2">Platform</strong>
                <span className="text-gray-700">BandLab (web-based, free accounts)</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <strong className="text-indigo-600 block mb-2">Class Size</strong>
                <span className="text-gray-700">10-15 students</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <strong className="text-indigo-600 block mb-2">Equipment</strong>
                <span className="text-gray-700">Computers with internet, headphones</span>
              </div>
            </div>
          </section>

          {/* Week 1 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 1: Introduction to Digital Music Production</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Understand what digital music production is</li>
              <li>Create BandLab accounts and navigate the interface</li>
              <li>Learn basic music terminology</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Welcome and introductions (15 min)</li>
              <li>Overview of digital music production and famous producers (10 min)</li>
              <li>Creating BandLab accounts (15 min)</li>
              <li>Guided tour of BandLab interface (25 min)</li>
              <li>Listening exercise: Identify instruments in popular songs (15 min)</li>
              <li>Assignment preview (10 min)</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-blue-800">Key Terms:</strong>
              <span className="text-gray-700 ml-2">DAW, track, loop, tempo, measures</span>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4 rounded-r-lg">
              <strong className="text-yellow-800">Assignment:</strong>
              <span className="text-gray-700 ml-2">Explore BandLab's sound library at home</span>
            </div>
          </section>

          {/* Week 2 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 2: Loops and Beat Making</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Understand loops and how they create music</li>
              <li>Create a basic beat using pre-made loops</li>
              <li>Learn about rhythm and tempo</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Review Week 1 concepts (10 min)</li>
              <li>Introduction to loops and the loop library (15 min)</li>
              <li>Demo: Building a simple beat (15 min)</li>
              <li>Hands-on: Students create their first loop-based track (35 min)</li>
              <li>Share and discuss: Volunteer students share their beats (10 min)</li>
              <li>Preview next week (5 min)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-yellow-800">Assignment:</strong>
              <span className="text-gray-700 ml-2">Create a 30-second beat using at least 4 different loops</span>
            </div>
          </section>

          {/* Week 3 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 3: Drums and Percussion</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Understand drum patterns and rhythm</li>
              <li>Use BandLab's drum machine</li>
              <li>Create original drum patterns</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Listen to different drum patterns in various genres (10 min)</li>
              <li>Introduction to BandLab's drum kit instrument (15 min)</li>
              <li>Demo: Programming a basic drum pattern (15 min)</li>
              <li>Hands-on: Students create their own drum patterns (35 min)</li>
              <li>Group activity: Build a collective rhythm (10 min)</li>
              <li>Q&A and wrap-up (5 min)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-yellow-800">Assignment:</strong>
              <span className="text-gray-700 ml-2">Create three different drum patterns (one slow, one medium, one fast)</span>
            </div>
          </section>

          {/* Week 4 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 4: Melody and Instruments</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Understand melody vs. rhythm</li>
              <li>Use virtual instruments in BandLab</li>
              <li>Create simple melodies</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Introduction to melody and harmony (10 min)</li>
              <li>Exploring BandLab's virtual instruments (15 min)</li>
              <li>Demo: Creating a melody using piano roll (20 min)</li>
              <li>Hands-on: Students create melodies over their drum patterns (30 min)</li>
              <li>Peer feedback session (10 min)</li>
              <li>Preview song structure concepts (5 min)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-yellow-800">Assignment:</strong>
              <span className="text-gray-700 ml-2">Add a melody to your favorite drum pattern from Week 3</span>
            </div>
          </section>

          {/* Week 5 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 5: Song Structure and Arrangement</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Understand song structure (intro, verse, chorus, bridge, outro)</li>
              <li>Arrange loops and patterns into a complete song</li>
              <li>Use copy, paste, and duplication tools</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Analyze song structure of popular songs (15 min)</li>
              <li>Demo: Building a complete song arrangement (20 min)</li>
              <li>Hands-on: Students arrange their elements into a full song (40 min)</li>
              <li>Listening party: Share progress with the class (10 min)</li>
              <li>Assignment preview (5 min)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-yellow-800">Assignment:</strong>
              <span className="text-gray-700 ml-2">Create a complete 1-2 minute song with intro, verse, and chorus</span>
            </div>
          </section>

          {/* Week 6 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 6: Recording and Vocals</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Record audio directly into BandLab</li>
              <li>Understand microphone technique basics</li>
              <li>Add vocal elements to productions</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Introduction to audio recording (10 min)</li>
              <li>Demo: Recording audio in BandLab (15 min)</li>
              <li>Microphone technique and tips (10 min)</li>
              <li>Hands-on: Students record themselves (instruments, vocals, or sounds) (40 min)</li>
              <li>Group discussion: Challenges and solutions in recording (10 min)</li>
              <li>Wrap-up (5 min)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-yellow-800">Assignment:</strong>
              <span className="text-gray-700 ml-2">Add at least one recorded element to your song</span>
            </div>
          </section>

          {/* Week 7 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 7: Mixing and Effects</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Understand volume balance and panning</li>
              <li>Use basic effects (reverb, delay, EQ)</li>
              <li>Create a balanced mix</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Introduction to mixing concepts (15 min)</li>
              <li>Demo: Using volume, pan, and basic effects (20 min)</li>
              <li>Before/after listening examples (10 min)</li>
              <li>Hands-on: Students mix their songs (35 min)</li>
              <li>Individual check-ins and troubleshooting (10 min)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-yellow-800">Assignment:</strong>
              <span className="text-gray-700 ml-2">Complete and mix your final project</span>
            </div>
          </section>

          {/* Week 8 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-4 border-indigo-600">Week 8: Final Projects and Showcase</h3>
            
            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Learning Objectives:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Present completed work</li>
              <li>Give and receive constructive feedback</li>
              <li>Reflect on learning journey</li>
            </ul>

            <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Activities:</h4>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Final project preparation and polish (20 min)</li>
              <li>Student showcase: Each student presents their song (40 min)</li>
              <li>Group feedback and celebration (20 min)</li>
              <li>Discussion: Next steps in music production (5 min)</li>
              <li>Certificate distribution and closing (5 min)</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 rounded-r-lg">
              <strong className="text-blue-800">Optional:</strong>
              <span className="text-gray-700 ml-2">Create a class playlist on BandLab with all student projects</span>
            </div>
          </section>

          {/* Resources Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">Additional Resources for Instructors</h2>
            
            <h3 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Classroom Management Tips</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Have headphones available for all students</li>
              <li>Create a shared class account for demonstration purposes</li>
              <li>Encourage students to save their work frequently</li>
              <li>Set up a BandLab group/classroom for easy sharing</li>
              <li>Have backup activities for students who finish early</li>
            </ul>

            <h3 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Troubleshooting Common Issues</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li><strong className="text-gray-900">Login problems:</strong> Have a backup authentication method</li>
              <li><strong className="text-gray-900">Audio not playing:</strong> Check browser permissions and headphone connections</li>
              <li><strong className="text-gray-900">Students working at different paces:</strong> Prepare extension activities</li>
              <li><strong className="text-gray-900">Internet connectivity issues:</strong> Have offline music theory activities ready</li>
            </ul>

            <h3 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Extension Activities</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Guest speaker: Local music producer or artist</li>
              <li>Field trip: Recording studio visit (if available)</li>
              <li>Collaboration projects: Students work in pairs</li>
              <li>Genre-specific workshops: Hip-hop, EDM, rock, etc.</li>
              <li>Music theory basics: Scales, chords, key signatures</li>
            </ul>

            <h3 className="text-lg font-semibold text-purple-700 mt-6 mb-3">Assessment Options</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Participation and engagement</li>
              <li>Completion of weekly assignments</li>
              <li>Final project quality and creativity</li>
              <li>Peer feedback contributions</li>
              <li>Written reflection on learning experience</li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Materials Checklist</h3>
              <h4 className="font-semibold text-gray-900 mb-2">Required:</h4>
              <ul className="list-disc ml-6 text-gray-700 space-y-1 mb-4">
                <li>Computers with internet access (1 per student)</li>
                <li>Headphones (1 per student)</li>
                <li>Projector/large screen for demonstrations</li>
                <li>Instructor computer</li>
              </ul>
              <h4 className="font-semibold text-gray-900 mb-2">Optional but Helpful:</h4>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>External microphones for better recording quality</li>
                <li>MIDI keyboards (1-2 for the class to share)</li>
                <li>Printed reference guides with keyboard shortcuts</li>
                <li>Examples of professional tracks for analysis</li>
              </ul>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Student Learning Outcomes</h2>
            <p className="mb-4">By the end of this course, students will be able to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Navigate BandLab's interface confidently</li>
              <li>Create beats using loops and drum programming</li>
              <li>Compose simple melodies using virtual instruments</li>
              <li>Understand basic song structure</li>
              <li>Record audio into a digital audio workstation</li>
              <li>Apply basic mixing techniques and effects</li>
              <li>Complete and share an original music production</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Contact and Community</h2>
            <p className="text-gray-700 mb-4">Encourage students to:</p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Join BandLab's community forums</li>
              <li>Follow music production tutorials on YouTube</li>
              <li>Connect with each other for collaborative projects</li>
              <li>Continue practicing after the class ends</li>
            </ul>
            <p className="mt-6 text-gray-700">
              <strong className="text-gray-900">For More Information:</strong><br />
              Houston Public Library Music Production Program
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm">© 2025 Houston Public Library System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
