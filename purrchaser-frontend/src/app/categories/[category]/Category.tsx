"use client"

import React from "react";
import {Container} from "@/components/shared/Container";
import {FOOTBALL_TICKETS_DATA, TEXT_BOOKS_DATA, WINTER_GEAR_DATA} from "@/data/listings/SingleAvailableForSale";
import {Testimonials} from "@/components/hero/Testimonials";

type CategoryProps = {
    title: string;
}

type CategoriesData = {
    [key: string]: {
        pathName: string;
        categoryName: string;
        results: number;
    };
};


const CATEGORIES_DATA: CategoriesData = {
    "football-tickets": {
        pathName: "/ Tickets / Sports /",
        categoryName: "Football Tickets",
        results: 1000,
    },
    "basketball-tickets": {
        pathName: "/ Tickets / Sports /",
        categoryName: "Basketball Tickets",
        results: 1000,
    },
    "rugby-tickets": {
        pathName: "/ Tickets / Sports /",
        categoryName: "Rugby Tickets",
        results: 1000,
    },
    "books": {
        pathName: "/",
        categoryName: "Books",
        results: 1000,
    },
    "laptops": {
        pathName: "/ Electronics /",
        categoryName: "Laptops",
        results: 1000,
    },
    "phones": {
        pathName: "/ Electronics /",
        categoryName: "Phones",
        results: 1000,
    },
    "furniture": {
        pathName: "/ Home /",
        categoryName: "Furniture",
        results: 1000,
    },
    "arts-and-crafts": {
        pathName: "/ Home /",
        categoryName: "Arts & Crafts",
        results: 1000,
    },
    "winter-gear": {
        pathName: "/ Clothing /",
        categoryName: "Winter Gear",
        results: 1000,
    },
    "concert-tickets": {
        pathName: "/ Tickets / Live Events /",
        categoryName: "Concert Tickets",
        results: 1000,
    },
    "kitchen-utensils": {
        pathName: "/ Home /",
        categoryName: "Kitchen Utensils",
        results: 1000,
    }
}

const products = [...FOOTBALL_TICKETS_DATA, ...WINTER_GEAR_DATA, ...TEXT_BOOKS_DATA]

const CategoryPage: React.FC<CategoryProps> = ({title}) => {
    return (
        <Container className="my-12">
            <div className="flex flex-col space-y-6 mb-12">
                <div>
                    <h2 className="font-medium text-sm tracking-tight text-gray-500">
                        PurrChaser{" "}{" "}{CATEGORIES_DATA[title].pathName}{" "}
                        <span className="text-gray-800">{CATEGORIES_DATA[title].categoryName}</span></h2>
                </div>

                <div className="flex items-center gap-x-3">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{CATEGORIES_DATA[title].categoryName}</h2>
                    <p className="pt-1 text-sm font-medium text-gray-500">
                        ({CATEGORIES_DATA[title].results}+ results)
                    </p>
                </div>
            </div>

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
            </div>
        </Container>
    )
}

export default CategoryPage;