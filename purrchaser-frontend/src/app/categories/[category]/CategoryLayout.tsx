"use client"

import {Header} from "@/components/nav/Header";
import React, {useState} from "react";
import {Testimonials} from "@/components/hero/Testimonials";
import {Footer} from "@/components/nav/Footer";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Category from "@/app/categories/[category]/Category";

const CategoryLayout:React.FC<{category: string}> = ({ category }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showTestimonialsAndFooter, setShowTestimonialsAndFooter] = useState(false);

    const handleLoadingUpdate = (loadingStatus: boolean) => {
        setIsLoading(loadingStatus);
        setTimeout(() => {
            setShowTestimonialsAndFooter(true);
        }, 50); // 50 Milliseconds delay
    }

    return (
        <>
            <Header updateIsLoading={handleLoadingUpdate}/>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <>
                    <main>
                        <Category title={category}/>
                        {showTestimonialsAndFooter && <Testimonials/>}
                    </main>
                    {showTestimonialsAndFooter && <Footer/>}
                </>
            )}
        </>
    )
}

export default CategoryLayout;
