"use client"

import {Header} from "@/components/nav/Header";
import React, {useState} from "react";
import {Testimonials} from "@/components/hero/Testimonials";
import {Footer} from "@/components/nav/Footer";
import ListingPage from "@/app/listings/[listingId]/Listing";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ListingLayout:React.FC<{listingId: string}> = ({ listingId }) => {
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
                        <ListingPage listingId={listingId}/>
                        {showTestimonialsAndFooter && <Testimonials/>}
                    </main>
                    {showTestimonialsAndFooter && <Footer/>}
                </>
            )}
        </>
    )
}

export default ListingLayout;
