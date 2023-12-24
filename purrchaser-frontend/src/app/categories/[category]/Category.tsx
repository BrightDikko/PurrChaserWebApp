"use client"

import React from "react";
import {Container} from "@/components/shared/Container";
import {FOOTBALL_TICKETS_DATA, TEXT_BOOKS_DATA, WINTER_GEAR_DATA} from "@/data/listings/SingleAvailableForSale";
import {useAppSelector} from "@/hooks/store";

type CategoryProps = {
    title: string;
}

const products = [...FOOTBALL_TICKETS_DATA, ...WINTER_GEAR_DATA, ...TEXT_BOOKS_DATA]

const SkeletonLoader = () => {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-300 h-5 w-3/4 mb-3 rounded"></div>
            <div className="bg-gray-300 h-8 w-1/2 rounded mt-2"></div>
        </div>
    );
};

const ProductSkeletonLoader = () => {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-300 h-40 w-full mb-3 rounded"></div>
            <div className="bg-gray-300 h-16 w-full mb-3 rounded"></div>
        </div>
    );
}

const CategoryPage: React.FC<CategoryProps> = ({title}) => {
    const decodedTitle = decodeURIComponent(title);
    const categoryPathData = useAppSelector((state) => state.categories.categoryPaths[decodedTitle])

    return (
        <Container className="my-9">
            {categoryPathData ? (
                <div className="flex flex-col space-y-4 mb-6">

                    <div>
                        <h2 className="font-medium text-xs tracking-tight text-gray-500">
                            {categoryPathData?.pathName}{" "}
                            <span className="text-gray-800">{categoryPathData?.categoryName}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-x-3">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{categoryPathData?.categoryName}</h2>
                    </div>
                </div>
            ) : <SkeletonLoader/>}

            <div
                className="mb-10 mt-6 pt-2 grid grid-cols-2 gap-x-3.5 sm:gap-x-5 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
                {products.map((product, productIndex) => (
                    <div key={productIndex}>
                        {categoryPathData ?
                            (
                                <div className="group relative px-1">
                                    <div
                                        className="h-40 w-full overflow-hidden rounded-md bg-gray-200 aspect-square group-hover:opacity-90">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="object-cover object-center w-full h-full rounded-md "
                                        />
                                    </div>

                                    <div className="mt-2 h-20">
                                        <p className="text-sm text-gray-700 max-w-full overflow-hidden line-clamp-2">
                                            <a href={product.href} className="block">
                                                {product.name}
                                            </a>
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                                    </div>
                                </div>
                            ) :
                            <ProductSkeletonLoader/>
                        }
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default CategoryPage;