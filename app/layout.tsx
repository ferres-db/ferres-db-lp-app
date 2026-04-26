import React from "react"
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Syne, JetBrains_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-58EP4LQ7LC'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FerresDB — High-Performance Vector Search in Rust',
  description: 'FerresDB is a high-performance vector search engine written in Rust for semantic search, RAG, and recommendation systems. Sub-millisecond latency, hybrid search, WAL persistence. MIT OR Apache-2.0.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body className="font-body antialiased">
        {children}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}
