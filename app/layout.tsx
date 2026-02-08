import React from "react"
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const GA_MEASUREMENT_ID = 'G-58EP4LQ7LC'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FerresDB - High-Performance Vector Database in Rust',
  description: 'FerresDB is a high-performance vector search engine written in Rust for semantic search, RAG, and recommendation systems. Sub-millisecond latency, tens of thousands of vectors per second.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}
