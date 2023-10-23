import {type Metadata} from 'next'
import Category from "@/app/categories/[category]/Category";
import {Header} from "@/components/nav/Header";
import React from "react";
import {Testimonials} from "@/components/hero/Testimonials";
import {Footer} from "@/components/nav/Footer";

export const metadata: Metadata = {
    title: 'Category',
}

export default function Categories({params}: { params: { category: string } }) {
    return (
        <>
            <Header/>
            <main>
                <Category title={params.category}/>
                <Testimonials/>
            </main>
            <Footer/>
        </>
    )
}


