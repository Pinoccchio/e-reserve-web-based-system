import './globals.css'
import { Inter } from 'next/font/google'
import { RootLayoutClient } from './components/root-layout-client'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}

