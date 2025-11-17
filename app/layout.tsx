import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], weight: ['300', '400', '500', '600'] })

export const metadata = {
  title: 'The Humble Organizational | Organizing for Organizers',
  description: 'THO - Professional organization solutions that empower organizers to transform spaces and lives with systematic excellence.',
  keywords: ['organization', 'professional organizing', 'space optimization', 'organizers', 'THO'],
  openGraph: {
    title: 'The Humble Organizational',
    description: 'Professional organization solutions that empower organizers to transform spaces and lives.',
  },
} satisfies Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={geist.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
