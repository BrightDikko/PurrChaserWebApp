import React from "react";

import type {Metadata} from 'next'
import {Inter, Lexend} from 'next/font/google'

import clsx from 'clsx'
import '@/styles/tailwind.css'


export const metadata: Metadata = {
  title: {
    template: '%s - PurrChaser',
    default: 'PurrChaser - Imagine a place, where the TRiBE trades',
  },
  description:
      'Imagine a place, a secured space, where your TRiBE can trade. Imagine PurrChaser',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html
          lang="en"
          className={clsx(
              'h-full scroll-smooth bg-white antialiased',
              inter.variable,
              lexend.variable,
          )}
      >
      <body className="flex h-full flex-col">{children}</body>
      </html>
  )
}
