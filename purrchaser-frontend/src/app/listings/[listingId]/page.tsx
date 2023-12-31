import {type Metadata} from 'next'
import {Header} from "@/components/nav/Header";
import React from "react";
import {Testimonials} from "@/components/hero/Testimonials";
import {Footer} from "@/components/nav/Footer";
import ListingPage from "@/app/listings/[listingId]/Listing";
import ListingLayout from "@/app/listings/[listingId]/ListingLayout";

export const metadata: Metadata = {
    title: 'Listing',
}

export default function Listings({params}: { params: { listingId: string } }) {
    return <ListingLayout listingId={params.listingId}/>
}


