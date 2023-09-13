import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import BreadcrumbComponent from './components/BereadcrumbComponent'

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
        <main className="flex flex-col h-screen">
          <HeaderComponent/>
          <BreadcrumbComponent/>
          <div className="flex flex-grow flex-col items-center justify-normal m-20 p-10">
            {children}
          </div>
          <FooterComponent/>
        </main>
      </body>
    </html>
  )
}
