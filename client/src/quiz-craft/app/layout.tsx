import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

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
      <main className="flex min-h-screen flex-col items-center justify-normal p-10">
        <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
          <div className="flex left-0 top-0 gap-4 text-lg font-semibold">
                <Link href="/">Home</Link>
                <Link href="/profile">Profile</Link>
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo.png"
                alt="Quiz Craft Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
        {children}
      </main>
      </body>
    </html>
  )
}
