"use client"

import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/store";
import {Disclosure, Tab} from '@headlessui/react'
import {HeartIcon, MinusIcon, PlusIcon} from '@heroicons/react/24/outline'
import {useGetAllListingsQuery} from "@/store/services/api";
import {setAllListings} from "@/store/slices/listingsSlice";
import {formatCategoryNameLikeInHrefSlug} from "@/store/slices/categoriesSlice";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const formatDate = (dateString: any) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
};

type CategoryProps = {
    listingId: string;
}

const ListingPage: React.FC<CategoryProps> = ({listingId}) => {
    const dispatch = useAppDispatch();
    const categoryPaths = useAppSelector((state) => state.categories.categoryPaths)

    const { data: ALL_LISTINGS_DATA, isLoading, isError } = useGetAllListingsQuery();

    useEffect(() => {
        if (ALL_LISTINGS_DATA) {
            dispatch(setAllListings(ALL_LISTINGS_DATA));
        }
        console.log("listingId: ", typeof listingId);
    }, [ALL_LISTINGS_DATA, dispatch, listingId]);

    if (isLoading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (isError) {
        return <div>Error loading the listing</div>;
    }

    const currentListing = ALL_LISTINGS_DATA?.content.find((listing) => listing?.listingId === parseInt(listingId));

    const productImages = [currentListing.image]

    const listingCategoryPath = categoryPaths[decodeURIComponent(formatCategoryNameLikeInHrefSlug(currentListing.category.name))]
    const listingDetails = [
        {
            name: 'Details',
            content: {
                "Brand": !!currentListing.brand ? currentListing.brand : "N/A",
                "Model": !!currentListing.model ? currentListing.model : "N/A",
                "Availability": currentListing.isSold ? "Unavailable - item has been sold." : "Item is available for purchase",
                "Condition": currentListing.itemCondition,
                "Pick-up location": currentListing.meetingLocation,
                "Category": `${listingCategoryPath.pathName} ${listingCategoryPath.categoryName}`,
                "Date Posted": currentListing.createdAt,
                "Last Updated": currentListing.updatedAt,

            }
        },
        {
            name: 'Seller Information',
            content: {
                "Seller": `${currentListing.seller.firstName} ${currentListing.seller.lastName}`,
                "Verification Status": currentListing.seller.isVerified ? `${currentListing.seller.firstName}'s account has been successfully verified` : `${currentListing.seller.firstName}'s account is yet to be verified`
            }
        }
    ];

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-9 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                {productImages.map((image) => (
                                    <Tab
                                        key={image.imageId}
                                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    >
                                        {({selected}) => (
                                            <>
                                                {/*<span className="sr-only">{image.name}</span>*/}
                                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                                    <img src={image.url} alt="" className="h-full w-full object-cover object-center"/>
                                                </span>
                                                <span
                                                    className={classNames(
                                                        selected ? 'ring-indigo-500' : 'ring-transparent',
                                                        'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </div>

                        <Tab.Panels className=" aspect-w-1 w-full">
                            {productImages.map((image) => (
                                <Tab.Panel key={image.imageId} className="relative">
                                    {/* Wrapper for blurred background */}
                                    <div className="absolute inset-0 overflow-hidden z-0 rounded-xl">
                                        <img
                                            src={image.url}
                                            className="h-full w-full object-cover blur-md"
                                            alt="Background"
                                        />
                                    </div>
                                    {/* Main image */}
                                    <img
                                        src={image.url}
                                        className="h-[50vh] w-full object-contain object-center sm:rounded-lg relative z-10"
                                        alt="Product"
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>


                    </Tab.Group>

                    {/* Product info */}
                    <div className="mt-10 px-1 sm:mt-16 sm:px-0 lg:mt-0">

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{currentListing.title}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">${currentListing.price}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <div
                                className="space-y-6 text-base text-gray-700"
                                dangerouslySetInnerHTML={{__html: currentListing.description}}
                            />
                            <div className="">
                                <p className="flex items-center text-sm text-indigo-800">
                                    (Updated on {formatDate(currentListing.updatedAt)})
                                </p>
                            </div>
                        </div>

                        <form className="mt-6">

                            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <button
                                    type="submit"
                                    className="flex max-w-full sm:max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Add to cart
                                </button>

                                <button
                                    type="submit"
                                    className="max-w-full sm:max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Negotiate
                                </button>


                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="flex items-start sm:items-center sm:justify-center rounded-md  py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true"/>
                                    <span className="ml-2 text-indigo-800">Add Item to your Favorites List</span>
                                </button>
                            </div>

                        </form>

                        <section aria-labelledby="details-heading" className="mt-7">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>

                            <div className="divide-y divide-gray-200 border-t">
                                {listingDetails.map((detail) => (
                                    <Disclosure as="div" key={detail.name}>
                                        {({open}) => (
                                            <>
                                                <h3>
                                                    <Disclosure.Button
                                                        className="group relative flex w-full items-center justify-between py-6 text-left">
                                                            <span
                                                                className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-md font-medium')}
                                                            >
                                                              {detail.name}
                                                            </span>
                                                        <span className="ml-6 flex items-center">
                                                              {open ? (
                                                                  <MinusIcon
                                                                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                      aria-hidden="true"
                                                                  />
                                                              ) : (
                                                                  <PlusIcon
                                                                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                      aria-hidden="true"
                                                                  />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </h3>

                                                <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                            {Object.entries(detail.content).map(([key, value]) => {
                                                                // Check if the value is a date-time string and format it
                                                                const displayValue = (key === 'Date Posted' || key === 'Last Updated') ? formatDate(value) : value;
                                                                return (
                                                                    <tr key={key}>
                                                                        <td className="py-4 whitespace-normal text-sm font-medium text-gray-500">{key}</td>
                                                                        <td className="px-10 py-4 whitespace-normal text-sm text-gray-800">{displayValue}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                            </tbody>
                                                        </table>
                                                </Disclosure.Panel>

                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage;