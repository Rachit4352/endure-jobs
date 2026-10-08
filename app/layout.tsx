import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Endure Jobs | AI-Powered Career & Job Placement Platform',
  description: 'Endure Jobs helps professionals find better opportunities through intelligent job matching, resume optimization, application support and interview preparation.',
  keywords: ['AI job matching', 'resume optimization', 'ATS resume checker', 'career coaching', 'job search platform'],
  generator: 'v0.app',
  openGraph: {
    title: 'Endure Jobs | Your Career. Our Commitment.',
    description: 'Move from searching to hired with intelligent matching, resume optimization and human career support.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endure Jobs | Your Career. Our Commitment.',
    description: 'Your personal career operating system.',
  },
  icons: {
    icon: [
      {
        url: '/endure-jobs-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/endure-jobs-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/endure-jobs-logo.png',
        type: 'image/png',
      },
    ],
    apple: '/endure-jobs-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
