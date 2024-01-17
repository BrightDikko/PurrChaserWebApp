"use client"

import React, {useEffect, useState} from "react";
import {useAppSelector} from "@/hooks/store";
import {Disclosure, Tab} from '@headlessui/react'
import {BanknotesIcon, HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon} from '@heroicons/react/24/outline'
import {getCurrentUser, useAddListingToCartMutation, useGetListingByIdQuery} from "@/store/services/api";
import {formatCategoryNameLikeInHrefSlug} from "@/store/slices/categoriesSlice";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import {CheckBadgeIcon} from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// Helper function to format date strings
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
};

type CategoryProps = {
    listingId: string;
}

interface ImageType {
    imageId: number;
    listingId: number;
    url: string;
}

const ListingPage: React.FC<CategoryProps> = ({listingId}) => {
    const categoryPaths = useAppSelector((state) => state.categories.categoryPaths)
    // console.log("\n categoryPaths:", categoryPaths);

    const {data: currentListing, isLoading, isError} = useGetListingByIdQuery(parseInt(listingId));
    const [addListingToCart, {isLoading: addListingToCartIsLoading, isError: addListingToCartError, data: addListingToCartData}] = useAddListingToCartMutation();

    // State to track if all images are loaded
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        if (currentListing) {
            console.log("\n currentListing: ", currentListing);

            // Preload all images (main and others) when the current listing is fetched
            let imagesToLoad = [currentListing.mainImage.url, ...currentListing.images.map((img: ImageType) => img.url)];
            let loadedImages = 0;

            imagesToLoad.forEach(imageSrc => {
                const img = new Image();
                img.src = imageSrc;
                img.onload = () => {
                    loadedImages++;
                    if (loadedImages === imagesToLoad.length) {
                        setImagesLoaded(true); // Set true when all images are loaded
                    }
                };
            });
        }
    }, [currentListing]);

    // Show loading spinner until listing data and images are loaded
    if (isLoading || !imagesLoaded) {
        return <LoadingSpinner/>;
    }

    // Handle error state
    if (isError) {
        console.error("Error occurred while loading the listing. Error: ", isError);
        return; // Return error message or component
    }

    // Preparing data for rendering
    const mainImage = currentListing.mainImage;
    const otherImages = currentListing.images;
    const listingImages = [mainImage, ...otherImages];
    const listingCategoryPath = categoryPaths[decodeURIComponent(formatCategoryNameLikeInHrefSlug(currentListing.category.name))];

    // Listing details for rendering in the UI
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
            name: 'Seller Verification Insights',
            content: {
                "School ID": currentListing.seller.isVerified ? `${currentListing.seller.firstName}'s School ID has been successfully verified` : `${currentListing.seller.firstName}'s School ID is yet to be verified`,
                "School Email": currentListing.seller.isVerified ? `${currentListing.seller.firstName}'s School Email has been successfully verified` : `${currentListing.seller.firstName}'s School Email is yet to be verified`,
                "Residence (Dorm)": currentListing.seller.isVerified ? `${currentListing.seller.firstName}'s Residence has been successfully verified` : `${currentListing.seller.firstName}'s Residence is yet to be verified`,
            }
        }
    ];

    const handleAddToCart = async () => {
        console.log("Add to cart button pressed!");

        const currentUser = JSON.parse(getCurrentUser());
        const userId = currentUser?.userId;

        try {
            const addListingToCartResponse = await addListingToCart({userId, listingId});
            if (!!addListingToCartResponse) {
                console.log("\naddListingToCartResponse", addListingToCartResponse);
            }
        } catch (error) {
            console.error("An error occurred while attempting to add listing to user cart. Error: ", error);
        }

    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-9 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <div>
                        {/* Image gallery */}
                        <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 w-full max-w-2xl block lg:max-w-none">
                                <Tab.List className="grid grid-cols-4 gap-4 sm:gap-6">
                                    {listingImages.map((image) => (
                                        <Tab
                                            key={image.imageId}
                                            className="relative flex h-20 sm:h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                        >
                                            {({selected}) => (
                                                <>
                                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                                    <img src={image.url} alt=""
                                                         className="h-full w-full object-cover object-center"/>
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
                                {listingImages.map((image) => (
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

                        {/*Seller Information*/}
                        <div className="hidden lg:block divide-y divide-gray-200 border-t mt-14 mr-4">
                            <SellerInformation/>
                        </div>
                    </div>

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
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="flex max-w-full sm:max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full bg-gradient-to-r from-indigo-600 to-indigo-500"
                                >
                                    <span><ShoppingCartIcon className="h-5 w-5 mr-2"/></span>{addListingToCartIsLoading ? "Adding to cart" : addListingToCartData ? "Go to cart" : "Add to cart"}
                                </button>

                                <button
                                    type="button"
                                    className="flex max-w-full sm:max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full bg-gradient-to-r from-indigo-600 to-indigo-500"
                                >
                                    <span><BanknotesIcon className="h-5 w-5 mr-2"/></span>Negotiate
                                </button>


                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="flex items-start sm:items-center sm:justify-center rounded-md  py-3 text-gray-400 hover:text-gray-500"
                                >
                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true"/>
                                    <span className="ml-2 text-indigo-800">Add Item to your Favorites List</span>
                                </button>
                            </div>

                            <div className="block lg:hidden divide-y divide-gray-200 border-t mt-7">
                                <SellerInformation/>
                            </div>

                        </form>

                        <section aria-labelledby="details-heading" className="mt-7">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>

                            <div className="divide-y divide-gray-200 border-t pt-5 lg:pt-0">
                                {listingDetails.map((detail) => (
                                    <Disclosure as="div" key={detail.name} defaultOpen={detail.name === "Details"}>
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
            <ExploreSimilar/>
        </div>
    )
}

export default ListingPage;

function SellerInformation() {
    return (
        <div className="py-8 xs:py-10">
            <div className="text-2xl font-bold pb-4 xs:pb-6 ml-1">Meet the Seller</div>
            <div
                className="h-42 py-4 xs:py-5 pl-3 xs:pl-5 pr-2 xs:pr-3 flex max-w-lg space-x-2 sm:space-x-4 rounded-xl bg-white/20 shadow-md ring-1 ring-black/5">

                <div className="flex flex-col w-28 space-y-2">
                    <div className="mt-1 w-full h-full flex-[0.8] rounded-lg overflow-hidden">
                        <img
                            src={"https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM1fHxjb2xsZWdlJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDB8MHwwfHx8MA%3D%3D"}
                            className="w-[100%] h-[100%] object-cover object-center"/>
                    </div>
                    <div className="flex flex-[0.2] items-center justify-between px-1 xs:px-2">
                        <button className="text-gray-500 hover:text-gray-400">
                            <span className="sr-only">Instagram icon</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>


                        <button className="text-gray-500 hover:text-gray-400">
                            <span className="sr-only">TikTok icon</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="h-5 w-5 fill-slate-500 group-hover:fill-slate-700"
                                fill="currentColor"
                            >
                                <path
                                    d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                            </svg>
                        </button>

                        <button className="text-gray-500 hover:text-gray-400">
                            <span className="sr-only">Twitter icon</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                <path
                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                            </svg>
                        </button>

                    </div>
                </div>
                <div className="h-full flex flex-col justify-between px-1">
                    <div>
                        <p className="font-bold text-md">Stacy Turner-Lee</p>
                        <p className="font-medium text-sm"><span
                            className="hidden xs:inline">Student, </span> University of Notre Dame</p>
                        <p className="font-medium text-sm">
                            <strong>25</strong> Listings, <strong>21</strong> Sales </p>
                        <p className="font-medium text-sm flex space-x-2"><strong>Trust Rating:</strong>
                            <span className="text-sm text-indigo-700 flex items-center justify-center"><CheckBadgeIcon
                                className="w-5 h-5"/>VERIFIED</span></p>
                        <div></div>
                    </div>
                    <div className="flex gap-3 mt-3">
                        <button
                            type="button"
                            className="w-24 h-8 px-2 text-sm flex items-center justify-center rounded-md border border-transparent bg-indigo-600 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 bg-gradient-to-r from-indigo-600 to-indigo-500"
                        >
                            See Profile
                        </button>

                        <button
                            type="button"
                            className="w-24 h-8 px-2 text-sm flex items-center justify-center rounded-md border border-transparent bg-indigo-600 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 bg-gradient-to-r from-indigo-600 to-indigo-500"
                        >
                            Connect
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExploreSimilar() {
    return (
        <div className="flex justify-center px-6 py-5">
            <div
                className="flex items-center justify-between gap-x-6 bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 rounded-xl py-3">
                <p className="text-sm leading-6 text-white text-center flex justify-center items-center">
                    <strong className="hidden xs:flex font-semibold"> This ain't what you want?</strong>
                    <svg viewBox="0 0 2 2" className="hidden xs:inline mx-2 h-0.5 w-0.5 fill-current"
                         aria-hidden="true">
                        <circle cx={1} cy={1} r={1}/>
                    </svg>
                    <span>Explore Items Similar to this Listing ✨</span>
                </p>
            </div>
        </div>
    )
}