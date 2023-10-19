"use client"

import React, {useState} from 'react';
import {Container} from "@/components/shared/Container";
import {FOOTBALL_TICKETS_DATA, TEXT_BOOKS_DATA, WINTER_GEAR_DATA} from "@/data/listings/SingleAvailableForSale";
import SingleAvailableForSaleSection from "@/components/listings/SingleAvailableForSaleSection";
import HomeNavTabs from "@/components/nav/HomeNavTabs";

const products = [...FOOTBALL_TICKETS_DATA, ...WINTER_GEAR_DATA, ...TEXT_BOOKS_DATA]

export default function UserHome() {
    const [activeTab, setActiveTab] = useState(1);

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
                    <SingleAvailableForSaleSection sectionTitle={"Football Tickets"} productsList={FOOTBALL_TICKETS_DATA}/>
                    <SingleAvailableForSaleSection sectionTitle={"Text Books"} productsList={TEXT_BOOKS_DATA}/>
                    <SingleAvailableForSaleSection sectionTitle={"Winter Jackets"} productsList={WINTER_GEAR_DATA}/>
                </div>
                :
                <div
                className="mb-10 mt-6 pt-2 grid grid-cols-2 gap-x-3.5 sm:gap-x-5 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
                {products.map((product, productIndex) => (
                    <div key={productIndex} className="group relative px-1">
                        <div
                            className="h-40 w-full overflow-hidden rounded-md bg-gray-200 aspect-square group-hover:opacity-90">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="object-cover object-center w-full h-full rounded-md "
                            />
                        </div>
                        <h3 className="mt-2 text-sm text-gray-700">
                            <a href={product.href}>
                                <span className="absolute inset-0"/>
                                {product.name}
                            </a>
                        </h3>
                        <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                    </div>
                ))}
            </div>}

        </Container>
    )
}
