"use client"

import React from 'react';
import {Container} from "@/components/shared/Container";
import {FOOTBALL_TICKETS_DATA, TEXT_BOOKS_DATA, WINTER_GEAR_DATA} from "@/data/listings/SingleAvailableForSale";
import SingleAvailableForSaleSection from "@/components/listings/SingleAvailableForSaleSection";


export default function AvailableForSale() {

    return (
        <Container>
            <div className="pt-8 sm:pt-14 mb-6 sm:mb-10 flex flex-col md:flex-row md:space-x-2 space-y-1 md:space-y-0  border-t-[1.5px] mt-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Meet your next obsession -</h2>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-green-600">Available for sale</span>
            </div>

            <SingleAvailableForSaleSection sectionTitle={"Football Tickets"} productsList={FOOTBALL_TICKETS_DATA}/>
            <SingleAvailableForSaleSection sectionTitle={"Text Books"} productsList={TEXT_BOOKS_DATA}/>
            <SingleAvailableForSaleSection sectionTitle={"Winter Jackets"} productsList={WINTER_GEAR_DATA}/>
        </Container>
    )
}
