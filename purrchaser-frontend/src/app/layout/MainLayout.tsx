"use client"

import {Header} from '@/components/nav/Header'
import {Footer} from "@/components/nav/Footer";
import React from "react";

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}
