"use client"

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container} from "@/components/shared/Container";
import {FOOTBALL_TICKETS_DATA, TEXT_BOOKS_DATA, WINTER_GEAR_DATA} from "@/data/listings/SingleAvailableForSale";
import SingleAvailableForSaleSection from "@/components/listings/SingleAvailableForSaleSection";
import HomeNavTabs from "@/components/nav/HomeNavTabs";
import {useGetAllListingsQuery} from "@/store/services/api";
import {NavLink} from "@/components/shared/NavLink";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface Image {
    imageId: number;
    listingId: number;
    url: string;
}

interface Seller {
    userId: number;
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
    isVerified: boolean;
}

interface Category {
    tertiaryCategoryId: number;
    name: string;
}

interface Listing {
    listingId: number;
    createdAt: string;
    updatedAt: string;
    seller: Seller;
    title: string;
    description: string;
    price: number;
    isSold: boolean;
    itemCondition: string;
    brand: string;
    model: string;
    mainImage: Image;
    images: Image[];
    category: Category;
    meetingLocation: string;
}

export default function UserHome() {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);

    const [allListings, setAllListings] = useState<Listing[]>([]);

    const [activeTab, setActiveTab] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const {data, isFetching} = useGetAllListingsQuery({page, size: 24});

    const debounceTimeoutRef = useRef<number | null>(null);

    // Debounce function
    const debounce = useCallback((func: () => void, delay: number) => {
        clearTimeout(debounceTimeoutRef.current ?? undefined);
        debounceTimeoutRef.current = window.setTimeout(func, delay);
    }, []);

    const handleObserver = useCallback((entities: IntersectionObserverEntry[]) => {
        const target = entities[0];
        if (target.isIntersecting && hasMore && !isFetching) {
            setIsLoadingMore(true);
            debounce(() => {
                setPage(prev => prev + 1);
                setIsLoadingMore(false);
            }, 1000);
        }
    }, [debounce, hasMore, isFetching]);

    useEffect(() => {
        if (data && data.content) {
            setAllListings(prev => [...prev, ...data.content]);
            if (data.content.length < 24) {
                setHasMore(false);
            }
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        });

        const currentLoader = loader.current;

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [handleObserver]);

    useEffect(() => {
        if (!isFetching) {
            setIsLoadingMore(false); // Reset loading more when fetching is done
        }
        // console.log("allListings: ", allListings);

    }, [isFetching]);

    const updateActiveTabHandler = (value: number) => {
        setActiveTab(value);
    };

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
                <>
                    <div
                        className="-ml-1 sm:-ml-2 mb-10 mt-6 mx-auto pt-2 grid gap-x-3.5  sm:gap-x-5 gap-y-7 grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
                        {allListings.map((listing, listingIndex: number) => (
                            <NavLink
                                key={listingIndex}
                                href={`/listings/${listing.listingId}`}
                            >
                                <div className="group relative sm:px-1 w-40 md:w-48">
                                    <div
                                        className="h-40 w-full overflow-hidden rounded-md bg-gray-200 aspect-square group-hover:opacity-90">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={listing.mainImage.url}
                                            alt={`Image of ${listing.title}`}
                                            className="object-cover object-center w-full h-full rounded-md"
                                            style={{objectFit: 'cover', height: '100%'}}
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
                        {/* Loader element for Intersection Observer */}
                        <div ref={loader}/>
                    </div>

                    {(isFetching || isLoadingMore) && <LoadingSpinner/>}
                    {!hasMore && <NoMoreListingsBanner/>}
                </>
            }

        </Container>
    )
}


function NoMoreListingsBanner() {
    return (
        <div className="flex justify-center px-6 py-5">
            <div
                className="flex items-center justify-between gap-x-6 bg-gradient-to-r from-[#002f87] to-[#0c2340] px-6 rounded-xl py-3">
                <p className="text-sm leading-6 text-white text-center flex justify-center items-center">
                    <strong className="hidden xs:flex font-semibold">You&apos;ve seen &apos;em all!</strong>
                    <svg viewBox="0 0 2 2" className="hidden xs:inline mx-2 h-0.5 w-0.5 fill-current"
                         aria-hidden="true">
                        <circle cx={1} cy={1} r={1}/>
                    </svg>
                    <span>That&apos;s all available listings, for now {" "}🚀</span>
                </p>
            </div>
        </div>
    )
}
