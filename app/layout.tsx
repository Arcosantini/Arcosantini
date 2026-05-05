import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import SplashScreen from "@/components/splash-screen"
import { DemoModeProvider } from "@/components/demo-mode-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Main Street Social | Connect with Your Local Business Community",
  description: "Main Street Social is the professional network for local business owners. Connect, collaborate, and grow with fellow entrepreneurs in your community.",
  generator: "Main Street Social",
  applicationName: "Main Street Social",
  keywords: ["local business", "networking", "small business", "community", "entrepreneurs", "professional network"],
  authors: [{ name: "Main Street Social" }],
  openGraph: {
    title: "Main Street Social",
    description: "The professional network for local business owners. Connect, collaborate, and grow with your community.",
    siteName: "Main Street Social",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Main Street Social",
    description: "The professional network for local business owners.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('mss-theme') || 'dark-blue';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <DemoModeProvider>
          <SplashScreen />
          {children}
        </DemoModeProvider>
        <Analytics />
      </body>
    </html>
  )
}
