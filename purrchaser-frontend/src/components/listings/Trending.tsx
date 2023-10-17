"use client"

import React from 'react';
import {Container} from "@/components/shared/Container";

const PRODUCTS_PER_PAGE = 4;
import {TRENDING_PRODUCTS_DATA} from "@/data/listings/Trending"

export default function Trending() {

    const displayedProducts = TRENDING_PRODUCTS_DATA.slice(0, PRODUCTS_PER_PAGE);

    return (
        <Container>
            <div id="controls-carousel" className="relative full" data-carousel="static">
                <div className="mx-auto px-2 py-10 sm:py-16 sm:px-6 lg:px-8 border-t-[1.5px] mt-6">

                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Categories</h2>
                        <span><a href="#"
                                 className="text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                            See all
                            <span aria-hidden="true"> &rarr;</span>
                        </a></span>
                    </div>

                    <div
                        className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-0 lg:gap-x-8"
                        data-carousel-item="active">
                        {displayedProducts.map((product, productIndex) => product ? (
                            <div key={productIndex} className="group relative">
                                <div
                                    className="h-56 w-full shadow-md overflow-hidden rounded-md bg-gray-200 md:h-72 xl:h-80">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover rounded-md group-hover:opacity-90 object-center"
                                    />
                                </div>
                                <h3 className="flex justify-center mt-4 text-sm text-gray-700">
                                    <a href={product.href}>
                                        <span className="absolute inset-0"/>
                                        {product.name}
                                    </a>
                                </h3>
                            </div>
                        ) : null)}
                    </div>
                </div>
            </div>
        </Container>
    )
}
