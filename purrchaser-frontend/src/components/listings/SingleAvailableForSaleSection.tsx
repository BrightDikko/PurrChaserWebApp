"use client"

import React, {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from "clsx";
import {Product} from "@/types/Product";

import Slider, {Settings} from "react-slick";

type SingleAvailableForSaleSectionProps = {
    sectionTitle: string;
    productsList: Product[];
};

interface CustomArrowProps {
    onClick: React.MouseEventHandler<any> | undefined;
    hide: boolean;
}

const PRODUCTS_PER_PAGE = 2;

function CustomPrevArrow(props: CustomArrowProps) {
    const { onClick, hide } = props;
    // if (hide) return null;
    return (
        <button
            type="button"
            onClick={onClick}

            className="absolute top-0 -left-3 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none"
            data-carousel-prev="true">
                            <span
                                className={clsx(
                                    "inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-black/10 focus:ring-2 focus:ring-black ",
                                    hide ? "bg-white/80 text-black/20" : "text-black/80")}
                            >
                                <svg className="w-4 h-4" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 1 1 5l4 4"/>
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
        </button>
    );
}

function CustomNextArrow(props: CustomArrowProps) {
    const { onClick, hide } = props;
    // if (hide) return null;
    return (
        <button
            type="button"
            onClick={onClick}
            className="absolute top-0 -right-3 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none"
            data-carousel-prev="true">
                            <span
                                className={clsx(
                                    "inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-black/10 focus:ring-2 focus:ring-black ",
                                    hide ? "bg-white/80 text-black/20" : "text-black/80")}
                            >
                                <svg className="w-4 h-4" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
        </button>
    );
}

function getSlidesToShow() {
    const width = window.innerWidth;

    if (width >= 1024) { // XL breakpoint
        return 6;
    } else if (width >= 640) { // SM breakpoint
        return 4;
    } else {
        return 2;
    }
}

const SingleAvailableForSaleSection: React.FC<SingleAvailableForSaleSectionProps> = ({sectionTitle, productsList}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(2);

    useEffect(() => {
        function handleResize() {
            setSlidesToShow(getSlidesToShow());
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const products = productsList;

    const settings: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        nextArrow: <CustomNextArrow hide={currentSlide >= products.length - PRODUCTS_PER_PAGE} onClick={undefined}/>,
        prevArrow: <CustomPrevArrow hide={currentSlide === 0} onClick={undefined}/>,
        lazyLoad: "progressive",
        className: "slider variable-width",
        beforeChange: (_: any, next: React.SetStateAction<number>) => setCurrentSlide(next)
    };

    return (
            <div className="mx-auto py-5 sm:px-6 lg:px-8 mb-3 ">
                <div className="flex mb-6 items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{sectionTitle}</h2>
                    <a href="#"
                       className="text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                        See all
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>

                <Slider {...settings} className="relative">
                    {products.map((product, productIndex) => (
                        <div key={productIndex} className="px-1 group relative flex flex-col">
                            <div className="rounded-md bg-gray-200 aspect-square">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="object-cover w-full h-full rounded-md group-hover:opacity-90"
                                />
                            </div>
                            <h3 className="mt-4 pl-1 text-sm text-gray-700">
                                <a href={product.href}>
                                    <span className="absolute inset-0"/>
                                    {product.name}
                                </a>
                            </h3>
                        </div>
                    ))}
                </Slider>
            </div>
    )
}


export default SingleAvailableForSaleSection;