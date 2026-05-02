import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">MSS</span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="text-slate-200 hover:text-white">
            <Link href="/feed" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-slate-400 mb-8">Last updated: November 29, 2024</p>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Main Street Social ("MSS", "the Platform"), you agree to be bound by these Terms
                of Service. If you do not agree to these terms, you may not use the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">2. Eligibility</h2>
              <p className="mb-3">To use MSS, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from using the Platform under applicable laws</li>
                <li>Provide accurate and complete registration information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. User Accounts</h2>
              <p className="mb-3">When you create an account, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>Promptly update account information to keep it accurate</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">4. Acceptable Use</h2>
              <p className="mb-3">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Post false, misleading, or fraudulent content</li>
                <li>Harass, bully, or intimidate other users</li>
                <li>Share illegal, offensive, or harmful content</li>
                <li>Violate intellectual property rights</li>
                <li>Attempt to gain unauthorized access to the Platform</li>
                <li>Spam, solicit, or engage in commercial activities without permission</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Interfere with the operation of the Platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">5. Content Ownership and License</h2>
              <p className="mb-3">
                You retain ownership of content you post. By posting content, you grant MSS a worldwide, non-exclusive,
                royalty-free license to use, reproduce, modify, and display your content in connection with operating
                the Platform.
              </p>
              <p>
                MSS owns all rights to the Platform's design, features, and functionality. You may not copy, modify, or
                reverse engineer any part of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">6. Job Postings</h2>
              <p className="mb-3">If you post job opportunities, you represent that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The job posting is accurate and legitimate</li>
                <li>You have authority to hire for the position</li>
                <li>The posting complies with all employment laws</li>
                <li>You will not discriminate in hiring practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">7. Incident Reports</h2>
              <p>
                Incident reports submitted through the Platform should be accurate and truthful. False or malicious
                reports may result in account termination and potential legal action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">8. Privacy</h2>
              <p>
                Your use of the Platform is subject to our Privacy Policy. By using MSS, you consent to the collection
                and use of information as described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">9. Termination</h2>
              <p className="mb-3">We reserve the right to suspend or terminate your account at any time for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these Terms of Service</li>
                <li>Conduct that is harmful to other users or the Platform</li>
                <li>Any reason we deem appropriate in our sole discretion</li>
              </ul>
              <p className="mt-3">You may also delete your account at any time through the Platform settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">10. Disclaimers</h2>
              <p className="mb-3">THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All warranties, express or implied</li>
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Accuracy, reliability, or completeness of content</li>
                <li>Uninterrupted or error-free service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, MSS shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of the Platform, including lost profits, data
                loss, or business interruption.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold MSS harmless from any claims, damages, losses, or expenses (including
                legal fees) arising from your use of the Platform, violation of these terms, or infringement of any
                rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">13. Changes to Terms</h2>
              <p>
                We may modify these Terms of Service at any time. Continued use of the Platform after changes
                constitutes acceptance of the modified terms. We will notify users of significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">14. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to
                conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">15. Contact Information</h2>
              <p className="mb-3">For questions about these Terms of Service, please contact us at:</p>
              <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-white">Main Street Social</p>
                <p>Email: legal@mainstreetsocial.com</p>
              </div>
            </section>

            <section className="border-t border-slate-700 pt-6 mt-8">
              <p className="text-sm text-slate-400">
                By using Main Street Social, you acknowledge that you have read, understood, and agree to be bound by
                these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-400">
          <p>&copy; 2025 Main Street Social. Professional networking for bar security.</p>
        </div>
      </footer>
    </div>
  )
}
