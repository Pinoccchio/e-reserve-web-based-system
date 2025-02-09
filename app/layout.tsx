import "./globals.css"
import { Inter } from "next/font/google"
import { RootLayoutClient } from "./components/root-layout-client"
import { metadata } from "./metadata"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're in a build/prerender phase
  const isBuildTime = process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build"

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        {!isBuildTime ? <RootLayoutClient>{children}</RootLayoutClient> : children}
        <div id="toast-root" />
      </body>
    </html>
  )
}

