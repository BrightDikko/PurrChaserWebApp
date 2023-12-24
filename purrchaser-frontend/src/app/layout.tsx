import React from "react";

import type {Metadata} from 'next'
import {Inter, Lexend} from 'next/font/google'

import clsx from 'clsx'
import '@/styles/tailwind.css'
import ReduxProvider from "@/store/ReduxProvider";


export const metadata: Metadata = {
    title: {
        template: '%s - XO CLUTCH',
        default: 'XO CLUTCH - Marketplace for college campuses',
    },
    description:
        "Imagine a college campus marketplace, that's xo clutch!",
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

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html
            lang="en"
            className={clsx(
                'h-full scroll-smooth bg-white antialiased',
                inter.variable,
                lexend.variable,
            )}
        >
            <body className="flex h-full flex-col">
                <ReduxProvider>
                        {children}
                </ReduxProvider>
            </body>
        </html>
    )
}
