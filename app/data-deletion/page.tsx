import Link from "next/link"
import { Shield, ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DataDeletionPage() {
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
          <div className="flex items-center gap-3 mb-2">
            <Trash2 className="h-8 w-8 text-red-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Data Deletion Instructions</h1>
          </div>
          <p className="text-slate-400 mb-8">How to request deletion of your personal data</p>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Your Right to Data Deletion</h2>
              <p>
                At Main Street Social (MSS), we respect your right to privacy and data control. You have the right to
                request deletion of your personal data at any time. This page explains how to submit a data deletion
                request and what to expect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">What Data Will Be Deleted?</h2>
              <p className="mb-3">When you request data deletion, we will remove:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your account information and profile details</li>
                <li>Posts, comments, and messages you've created</li>
                <li>Photos and media you've uploaded</li>
                <li>Job postings and applications</li>
                <li>Incident reports you've submitted</li>
                <li>Connection and follow relationships</li>
                <li>Activity logs and preferences</li>
              </ul>
              <p className="mt-3 text-amber-400 text-sm">
                Note: Some information may be retained for legal compliance, security, or fraud prevention as required
                by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">How to Request Data Deletion</h2>

              <div className="space-y-4">
                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Option 1: Delete Through Your Account</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Log in to your MSS account</li>
                    <li>Navigate to your Profile page</li>
                    <li>Click on "Edit Profile"</li>
                    <li>Scroll to the bottom and click "Delete Account"</li>
                    <li>Confirm your decision</li>
                  </ol>
                  <p className="text-sm text-slate-400 mt-3">Your data will be permanently deleted within 30 days.</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Option 2: Email Data Deletion Request</h3>
                  <p className="mb-3">
                    If you cannot access your account or prefer to request deletion via email, please send a request to:
                  </p>
                  <div className="bg-slate-950 border border-slate-600 rounded p-3">
                    <p className="text-white font-mono">privacy@mainstreetsocial.com</p>
                  </div>
                  <p className="mt-3 mb-2">Include the following information in your email:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                    <li>Subject line: "Data Deletion Request"</li>
                    <li>Your full name</li>
                    <li>Email address associated with your account</li>
                    <li>Username or profile name</li>
                    <li>Brief reason for deletion (optional)</li>
                  </ul>
                </div>

                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Option 3: Facebook Users Data Deletion</h3>
                  <p className="mb-3">If you signed up using Facebook Login and want to delete your data:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Go to your Facebook Account's Settings & Privacy</li>
                    <li>Click "Settings"</li>
                    <li>Navigate to "Apps and Websites"</li>
                    <li>Find "Main Street Social" in the list</li>
                    <li>Click "Remove" and confirm deletion</li>
                  </ol>
                  <p className="text-sm text-slate-400 mt-3">
                    Alternatively, you can email us at privacy@mainstreetsocial.com with your Facebook user ID.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Timeline</h2>
              <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-white">Within 48 hours</p>
                      <p className="text-sm text-slate-400">We will acknowledge receipt of your request</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-white">Within 30 days</p>
                      <p className="text-sm text-slate-400">Your data will be permanently deleted from our systems</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 font-semibold text-sm">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-white">Confirmation</p>
                      <p className="text-sm text-slate-400">
                        You will receive an email confirming the deletion is complete
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Important Notes</h2>
              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">⚠</span>
                    <span>Data deletion is permanent and cannot be undone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">⚠</span>
                    <span>Some data may be retained in backups for up to 90 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">⚠</span>
                    <span>
                      We may retain certain information if required by law or for legitimate business purposes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">⚠</span>
                    <span>You will no longer be able to access your account after deletion</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Questions or Concerns?</h2>
              <p className="mb-3">If you have questions about data deletion or need assistance, please contact us:</p>
              <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">Main Street Social - Privacy Team</p>
                <p className="text-slate-300">Email: privacy@mainstreetsocial.com</p>
                <p className="text-slate-400 text-sm mt-2">We typically respond within 24-48 hours</p>
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
