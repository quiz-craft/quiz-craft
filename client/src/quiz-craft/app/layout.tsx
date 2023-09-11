import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizCraft',
  description: 'An AI tool to personalize quizes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <HeaderComponent/>
        <main className="flex min-h-screen flex-col items-center justify-normal p-10">
          {children}
        </main>
        <FooterComponent/>
      </body>
    </html>
  )
}
