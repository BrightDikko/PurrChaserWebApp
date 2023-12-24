"use client"

import React, {useEffect, useState} from 'react';
import {Container} from "@/components/shared/Container";
import {FOOTBALL_TICKETS_DATA, TEXT_BOOKS_DATA, WINTER_GEAR_DATA} from "@/data/listings/SingleAvailableForSale";
import SingleAvailableForSaleSection from "@/components/listings/SingleAvailableForSaleSection";
import HomeNavTabs from "@/components/nav/HomeNavTabs";
import {useRouter} from "next/navigation";
import {useGetAllListingsQuery} from "@/store/services/api";
import {NavLink} from "@/components/shared/NavLink";
import {useAppDispatch} from "@/hooks/store";
import {setAllListings} from "@/store/slices/listingsSlice";

const products = [...FOOTBALL_TICKETS_DATA, ...WINTER_GEAR_DATA, ...TEXT_BOOKS_DATA]

export default function UserHome() {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const [activeTab, setActiveTab] = useState(1);

    const {data: ALL_LISTINGS_DATA, error, isLoading} = useGetAllListingsQuery();

    useEffect(() => {
        if (ALL_LISTINGS_DATA) {
            dispatch(setAllListings(ALL_LISTINGS_DATA));
        }
    }, [ALL_LISTINGS_DATA, dispatch]);

    if (isLoading) {
        console.log("IS LOADING ALL_LISTINGS_DATA ");
        return;
    }

    if (error) {
        console.log("\nAN ERROR OCCURRED WHILE FETCHING ALL_LISTINGS_DATA ");
        console.error("Error: ", error);
    }

    const updateActiveTabHandler = (value: number) => {
        setActiveTab(value);
    }

    return (
        <Container>
            <div className="pt-8 sm:pt-14 mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl tracking-tight text-gray-900 flex flex-wrap">
                    <span className="mr-1.5">Welcome back,</span>
                    <span className="font-bold flex-shrink-0">Ariella Hamilton</span>
                </h2>
            </div>


            <HomeNavTabs activeTab={activeTab} updateActiveTab={updateActiveTabHandler}/>

            {activeTab === 3 ?
                <div className="">
                    <SingleAvailableForSaleSection sectionTitle={"Football Tickets"}
                                                   productsList={FOOTBALL_TICKETS_DATA}/>
                    <SingleAvailableForSaleSection sectionTitle={"Text Books"} productsList={TEXT_BOOKS_DATA}/>
                    <SingleAvailableForSaleSection sectionTitle={"Winter Jackets"} productsList={WINTER_GEAR_DATA}/>
                </div>
                :
                <div
                    className="-ml-1 sm:-ml-2 mb-10 mt-6 mx-auto pt-2 grid gap-x-3.5  sm:gap-x-5 gap-y-7 grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
                    {ALL_LISTINGS_DATA.content.map((listing, listingIndex: number) => (
                        <NavLink
                            key={listingIndex}
                            href={`/listings/${listing.listingId}`}
                        >
                            <div className="group relative sm:px-1 w-40 md:w-48">
                                <div className="h-40 w-full overflow-hidden rounded-md bg-gray-200 aspect-square group-hover:opacity-90">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={listing.image.url}
                                        alt={`Image of ${listing.title}`}
                                        className="object-cover object-center w-full h-full rounded-md"
                                        style={{ objectFit: 'cover', height: '100%' }}
                                    />
                                </div>

                                <div className="mt-2 h-12">
                                    <p className="text-sm text-gray-700 h-6 max-w-full overflow-hidden line-clamp-1">
                                        {listing.title}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">${listing.price.toFixed(2)}</p>
                                </div>
                            </div>

                        </NavLink>
                    ))}
                </div>}

        </Container>
    )
}
