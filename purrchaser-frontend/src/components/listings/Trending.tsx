"use client"

import React, {useState} from 'react';
import {Container} from "@/components/shared/Container";
import clsx from "clsx";

const PRODUCTS_PER_PAGE = 4;
const EMPTY_PRODUCT = {name: '', color: '', price: '', href: '', imageSrc: '', imageAlt: ''}; // Empty product placeholder


const products = [
    {
        name: 'Football Tickets',
        color: 'Natural',
        price: '$75',
        href: '#',
        imageSrc: 'https://fightingirishwire.usatoday.com/wp-content/uploads/sites/2/2022/07/Full-uniform-1-e1663610765467.jpg?w=1000&h=600&crop=1',
        imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
        name: 'Winter Coat',
        color: 'Natural',
        price: '$75',
        href: '#',
        imageSrc: 'https://images.pexels.com/photos/1868735/pexels-photo-1868735.jpeg?auto=compress&cs=tinysrgb&w=1600',
        imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
        name: 'Books - Used Like New',
        color: 'Natural',
        price: '$75',
        href: '#',
        imageSrc: 'https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&w=1600',
        imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
        name: 'Electronics',
        color: 'Natural',
        price: '$75',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        imageAlt: 'Hand stitched, orange leather long wallet.',
    }
]

export default function Trending() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - PRODUCTS_PER_PAGE, 0));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => prevIndex + PRODUCTS_PER_PAGE);
    };

    const displayedProducts = products.slice(currentIndex, currentIndex + PRODUCTS_PER_PAGE);


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
