"use client"

import {Header} from '@/components/nav/Header'
import {Hero} from "@/components/hero/Hero";
import Trending from "@/components/listings/Trending";
import {Testimonials} from "@/components/hero/Testimonials";
import {Footer} from "@/components/nav/Footer";
import RecentlyPurchased from "@/components/listings/RecentlyPurchased";
import AvailableForSale from "@/components/listings/AvailableForSale";
import {useAppDispatch, useAppSelector} from "@/hooks/store";
import UserHome from "@/components/listings/UserHome";
import React, {useEffect, useState} from "react";
import {getCurrentUser} from "@/store/services/api";
import {updateAuthState} from "@/store/slices/authSlice";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Home() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const [showTestimonialsAndFooter, setShowTestimonialsAndFooter] = useState(false);

    const handleLoadingUpdate = (loadingStatus: boolean) => {
        setIsLoading(loadingStatus);
        setTimeout(() => {
            setShowTestimonialsAndFooter(true);
        }, 100); // 100 Milliseconds delay
    }

    return (
        <>
            <Header updateIsLoading={handleLoadingUpdate}/>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <>
                    <main>
                        {isAuthenticated ? (
                            <UserHome/>
                        ) : (
                            <>
                                <Hero/>
                                <Trending/>
                                <RecentlyPurchased/>
                                <AvailableForSale/>
                            </>
                        )}
                        {showTestimonialsAndFooter && <Testimonials/>}
                    </main>
                    {showTestimonialsAndFooter && <Footer/>}
                </>
            )}
        </>
    )
}

