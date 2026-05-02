import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-400 mb-8">Last updated: November 29, 2024</p>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                Main Street Social ("MSS", "we", "us", or "our") collects information that you provide directly to us
                when you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create an account and profile</li>
                <li>Post content, comments, or messages</li>
                <li>Upload photos or other media</li>
                <li>Submit incident reports</li>
                <li>Apply for or post job opportunities</li>
                <li>Communicate with other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Enable social networking features and communications</li>
                <li>Send you technical notices and security alerts</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. Information Sharing</h2>
              <p className="mb-3">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With other users as part of the social networking features</li>
                <li>With service providers who assist in operating our platform</li>
                <li>When required by law or to protect rights and safety</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">4. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your information. However, no method of
                transmission over the internet is 100% secure. We use industry-standard encryption and security
                practices to safeguard your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">5. Your Rights and Choices</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Control your privacy settings and visibility</li>
                <li>Opt out of promotional communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">6. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience, analyze usage, and maintain
                your session. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">7. Third-Party Services</h2>
              <p>
                Our platform may integrate with third-party services (such as authentication providers). These services
                have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">8. Children's Privacy</h2>
              <p>
                Our services are not intended for users under 18 years of age. We do not knowingly collect information
                from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">10. Contact Us</h2>
              <p className="mb-3">
                If you have questions about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-white">Main Street Social</p>
                <p>Email: privacy@mainstreetsocial.com</p>
              </div>
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
