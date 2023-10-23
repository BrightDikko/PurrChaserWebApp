"use client"

import {Header} from '@/components/nav/Header'
import {Hero} from "@/components/hero/Hero";
import Trending from "@/components/listings/Trending";
import {Testimonials} from "@/components/hero/Testimonials";
import {Footer} from "@/components/nav/Footer";
import RecentlyPurchased from "@/components/listings/RecentlyPurchased";
import AvailableForSale from "@/components/listings/AvailableForSale";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {useAppSelector} from "@/hooks/hooks";
import UserHome from "@/components/listings/UserHome";
import Category from "@/app/categories/[category]/Category";
import React from "react";

export default function Home() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            <Header/>
            <main>
                {!isAuthenticated &&
                    <>
                        <Hero/>
                        <Trending/>
                        <RecentlyPurchased/>
                        <AvailableForSale/>
                    </>
                }
                {isAuthenticated && <UserHome/>}
                <Testimonials/>
            </main>
            <Footer/>
        </>
    )
}
