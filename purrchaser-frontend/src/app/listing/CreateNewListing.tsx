"use client"

import {CameraIcon, PhotoIcon, TrashIcon} from '@heroicons/react/24/solid'
import {Container} from "@/components/shared/Container";
import React, {useRef, useState} from "react";
import Link from "next/link";
import {useAppDispatch} from "@/hooks/store";
import {getCurrentUser, useCreateNewListingMutation, useGetAllCategoriesQuery} from "@/store/services/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import {useRouter} from "next/navigation";

const MAXIMUM_NUMBER_OF_PHOTO_ALLOWED = 6;

export default function CreateNewListing() {
    const router = useRouter();


    const [createNewListing, {isLoading: isLoadingNewListing, isError}] = useCreateNewListingMutation();
    const dispatch = useAppDispatch();
    const currentUser = JSON.parse(getCurrentUser());
    const {data: categories, error, isLoading} = useGetAllCategoriesQuery();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState<File[]>([]);

    const [selectedPrimary, setSelectedPrimary] = useState("");
    const [selectedSecondary, setSelectedSecondary] = useState("");
    const [selectedTertiary, setSelectedTertiary] = useState("");

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [condition, setCondition] = useState("");

    const [color, setColor] = useState("");
    const [customColor, setCustomColor] = useState("");

    const [size, setSize] = useState("");
    const [customSize, setCustomSize] = useState("");

    const [meetingLocation, setMeetingLocation] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    const handlePhotoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            if (file.type.startsWith('image/') && photos.length < MAXIMUM_NUMBER_OF_PHOTO_ALLOWED) {
                // Check for duplicate files
                if (!photos.some(photo => photo.name === file.name)) {
                    setPhotos([...photos, file]);
                    event.target.value = ""; // Reset the file input for next selection
                } else {
                    // console.log("Duplicate file detected");
                }
            } else {
                console.error("An error occurred during image file upload");
            }
        }
    };

    const handleRemovePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleAddPhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePrimaryCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPrimary(event.target.value);
    };

    const handleSecondaryCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSecondary(event.target.value);
    };

    const handleTertiaryCategoryChange = (event) => {
        setSelectedTertiary(event.target.value);
        // console.log("\nselectedPrimary", categories.find(cat => cat.primaryCategoryId === parseInt(selectedPrimary)))
        // console.log("\nselectedSecondary", categories.find(cat => cat.primaryCategoryId === parseInt(selectedPrimary)).secondaryCategories.find(cat => cat.secondaryCategoryId === parseInt(selectedSecondary)))
        // console.log("\nselectedTertiary", categories.find(cat => cat.primaryCategoryId === parseInt(selectedPrimary)).secondaryCategories.find(cat => cat.secondaryCategoryId === parseInt(selectedSecondary)).tertiaryCategories.find(cat => cat.tertiaryCategoryId === parseInt(selectedTertiary)));
    };

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(event.target.value);
    }

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModel(event.target.value);
    }

    const handleConditionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCondition(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setColor(event.target.value);
    };

    const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomColor(event.target.value);
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSize(event.target.value);
    };

    const handleCustomSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomSize(event.target.value);
    };

    const handleMeetingLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMeetingLocation(event.target.value);
    }

    const handleSellingPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSellingPrice(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO: WORK ON FORM VALIDATION
        // if (!title.trim()) {
        //     alert('Please enter a title.');
        //     return;
        // }
        //
        // if (!description.trim()) {
        //     alert('Please enter a description.');
        //     return;
        // }
        //
        // if (photos.length === 0) {
        //     alert('Please add at least one photo.');
        //     return;
        // }
        //
        // if (!selectedPrimary) {
        //     alert('Please select a primary category.');
        //     return;
        // }
        //
        // if (!condition) {
        //     alert('Please select the condition of the item.');
        //     return;
        // }
        //
        // if (color === 'Other' && !customColor.trim()) {
        //     alert('Please specify the custom color.');
        //     return;
        // }
        //
        // if (size === 'Other' && !customSize.trim()) {
        //     alert('Please specify the custom size.');
        //     return;
        // }
        //
        // if (!meetingLocation) {
        //     alert('Please select a meeting location.');
        //     return;
        // }
        //
        // if (!sellingPrice.trim()) {
        //     alert('Please enter the selling price.');
        //     return;
        // }

        // Initialize FormData
        const formData = new FormData();

        // Append form fields
        formData.append('sellerId', currentUser.userId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', sellingPrice);
        formData.append('itemCondition', condition);
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('categoryId', selectedTertiary);
        formData.append('meetingLocation', meetingLocation);

        // Append main image and other images
        if (photos.length > 0) {
            formData.append('mainImage', photos[0]); // First image as main image
            for (let i = 1; i < photos.length; i++) {
                formData.append('otherImages', photos[i]); // Rest of the images
            }
        }

        // Log FormData contents
        // for (let [key, value] of formData.entries()) {
        //     if (value instanceof File) {
        //         console.log(`${key}: ${value.name} (file)`);
        //     } else {
        //         console.log(`${key}: ${value}`);
        //     }
        // }

        try {
            const response = await createNewListing(formData).unwrap();
            // console.log("\nresponse:", response)
            if (!!response) {
                router.push('/');
            }
        } catch (error) {
            console.error("An error occurred while attempting to create new listing. Error: ", error);
        }
    }

    return (
        <div className="flex flex-col flex-1">
            <CreateNewListingPageHeader/>

            {isLoading ? (
                    <LoadingSpinner/>
                ) :
                <Container className="my-9">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Create and post an item
                                    you
                                    want to sell</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Fill out the form below with information about the item you are selling. When you
                                    are
                                    done, click the &quot;Submit Post&quot; button to finish the process.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    {/*TITLE*/}
                                    <div className="col-span-full">
                                        <label htmlFor="title"
                                               className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                                            <p>Title <span className="text-red-500">*</span></p>
                                            <p className="text-gray-400">{title.length} / 75</p>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                value={title}
                                                onChange={handleTitleChange}
                                                autoComplete="off"
                                                required={true}
                                                aria-required={true}
                                                placeholder="Enter name of the item"
                                                maxLength={75}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/*DESCRIPTION*/}
                                    <div className="col-span-full">
                                        <label htmlFor="description"
                                               className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                                            <p>Description <span className="text-red-500">*</span></p>
                                            <p className="text-gray-400">{description.length} / 2000</p>
                                        </label>
                                        <div className="mt-2">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required={true}
                                            maxLength={2000}
                                            aria-required={true}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Write a few sentences about the item you are selling."
                                        />
                                        </div>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Provide more details to help
                                            potential buyers know more about the item you are selling.</p>
                                    </div>

                                    {/*PHOTOS*/}
                                    <div className="col-span-full">
                                        <label htmlFor="photos"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            <p>Photos<span className="text-red-500">*</span></p>
                                        </label>
                                        <div
                                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300"
                                                           aria-hidden="true"/>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            ref={fileInputRef}
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            accept="image/jpeg, image/png"
                                                            onChange={handlePhotoFileChange}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">(PNG, JPG, JPEG up to
                                                    10MB)</p>
                                                <p className="text-xs leading-5 text-gray-600">Maximum number of photos
                                                    is
                                                    {" "} {MAXIMUM_NUMBER_OF_PHOTO_ALLOWED}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="photo"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            All pictures to be included in this post
                                        </label>
                                        <div className="mt-2 flex flex-col justify-center gap-y-5">
                                            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-3">
                                                {photos.map((photo, index) => (
                                                    <div key={index}
                                                         className="w-40 h-40 border-2 border-indigo-400 rounded-md overflow-hidden relative group">
                                                        <img src={URL.createObjectURL(photo)} alt={`Selected-${index}`}
                                                             className="w-full h-full object-cover object-center"/>

                                                        <button
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                handleRemovePhoto(index);
                                                            }}
                                                            className="absolute bottom-0 right-0 p-1 rounded-tl-md bg-gray-50 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <TrashIcon className="h-5 w-5 text-gray-600"
                                                                       aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            {photos.length < MAXIMUM_NUMBER_OF_PHOTO_ALLOWED && (
                                                <button
                                                    type="button"
                                                    onClick={handleAddPhotoClick}
                                                    className="flex justify-center items-center gap-x-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                            <span><CameraIcon className="h-5 w-5 text-gray-300"
                                                              aria-hidden="true"/></span>
                                                    Add photo
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/*CATEGORY*/}
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            <p>Category<span className="text-red-500">*</span></p>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="primary-category"
                                                name="primary-category"
                                                value={selectedPrimary}
                                                required={true}
                                                aria-required={true}
                                                onChange={handlePrimaryCategoryChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="" disabled>Select Primary Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.primaryCategoryId}
                                                            value={category.primaryCategoryId}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <select
                                                id="secondary-category"
                                                name="secondary-category"
                                                value={selectedSecondary}
                                                onChange={handleSecondaryCategoryChange}
                                                required={true}
                                                aria-required={true}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="" disabled>Select Secondary Category</option>
                                                {categories.find(cat => cat.primaryCategoryId === parseInt(selectedPrimary))?.secondaryCategories.map((secCat) => (
                                                    <option key={secCat.secondaryCategoryId}
                                                            value={secCat.secondaryCategoryId}>
                                                        {secCat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <select
                                                id="tertiary-category"
                                                name="tertiary-category"
                                                value={selectedTertiary}
                                                onChange={handleTertiaryCategoryChange}
                                                required={true}
                                                aria-required={true}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="" disabled>Select Tertiary Category</option>
                                                {categories.find(cat => cat.primaryCategoryId === parseInt(selectedPrimary))
                                                    ?.secondaryCategories.find(secCat => secCat.secondaryCategoryId === parseInt(selectedSecondary))
                                                    ?.tertiaryCategories.map((terCat) => (
                                                        <option key={terCat.tertiaryCategoryId}
                                                                value={terCat.tertiaryCategoryId}>
                                                            {terCat.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/*BRAND*/}
                                    <div className="col-span-full">
                                        <label htmlFor="brand"
                                               className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                                            <p>Brand</p>
                                            <p className="text-gray-400">{brand.length} / 100</p>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="brand"
                                                name="brand"
                                                type="text"
                                                value={brand}
                                                onChange={handleBrandChange}
                                                maxLength={100}
                                                autoComplete="off"
                                                placeholder="Enter brand name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Leave blank if you
                                            don&apos;t know the name of the brand.</p>
                                    </div>

                                    {/*MODEL*/}
                                    <div className="col-span-full">
                                        <label htmlFor="model"
                                               className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                                            <p>Model (Optional, but recommended)</p>
                                            <p className="text-gray-400">{model.length} / 100</p>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="model"
                                                name="model"
                                                type="text"
                                                value={model}
                                                onChange={handleModelChange}
                                                maxLength={100}
                                                autoComplete="off"
                                                placeholder="Give relevant model information"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Leave blank if you not
                                            applicable.</p>
                                    </div>

                                    {/*CONDITION*/}
                                    <div className="flex col-span-full">
                                        <div className="flex-1 col-span-full">
                                            <label htmlFor="condition"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                <p>Condition <span className="text-red-500">*</span></p>
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="condition"
                                                    name="condition"
                                                    required={true}
                                                    aria-required={true}
                                                    value={condition}
                                                    onChange={handleConditionChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option value="" disabled>Select Condition</option>
                                                    {CONDITION_OPTIONS.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/*COLOR*/}
                                    <div className="flex flex-row space-x-6 col-span-full">
                                        <div className="flex-1 col-span-full">
                                            <label htmlFor="color"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Color (Optional)
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="color"
                                                    name="color"
                                                    value={color}
                                                    onChange={handleColorChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option value="" disabled>Select Color</option>
                                                    {COLOR_OPTIONS.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>

                                                {color === 'Other' && (
                                                    <div className="mt-2 col-span-1">
                                                        <input
                                                            id="color-input"
                                                            name="color-input"
                                                            type="text"
                                                            value={customColor}
                                                            onChange={handleCustomColorChange}
                                                            maxLength={100}
                                                            placeholder="Enter item color"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/*SIZE*/}
                                        <div className="flex-1 col-span-full">
                                            <label htmlFor="size"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Size (Optional)
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="size"
                                                    name="size"
                                                    value={size}
                                                    onChange={handleSizeChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option value="" disabled>Select Size</option>
                                                    {SIZE_OPTIONS.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {size === 'Other' && (
                                                <div className="mt-2 col-span-1">
                                                    <input
                                                        id="size-input"
                                                        name="size-input"
                                                        type="text"
                                                        value={customSize}
                                                        onChange={handleCustomSizeChange}
                                                        maxLength={100}
                                                        placeholder="Enter item size"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*HANDOVER*/}
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Handover</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Fill out this section to help
                                    potential
                                    buyers know where to pickup the item when bought.</p>

                                {/*MEETING LOCATION*/}
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="flex-1 col-span-full">
                                        <label htmlFor="size"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            <p>Meeting Location (for handover/pickup) <span
                                                className="text-red-500">*</span></p>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="size"
                                                name="size"
                                                value={meetingLocation}
                                                onChange={handleMeetingLocationChange}
                                                required={true}
                                                aria-required={true}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="" disabled>Select Location</option>
                                                {MEETING_LOCATION_OPTIONS.map((location) => (
                                                    <option key={location} value={location}>{location}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*PRICING*/}
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Pricing</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Fill out this section with pricing
                                    information.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="selling-price"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            <p>Selling Price <span className="text-red-500">*</span></p>

                                        </label>
                                        <div className="mt-2">
                                            <div
                                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <span
                                                className="flex select-none items-center pl-3 text-gray-500 text-xl">$</span>
                                                <input
                                                    id="selling-price"
                                                    name="selling-price"
                                                    type="number"
                                                    value={sellingPrice}
                                                    required={true}
                                                    aria-required={true}
                                                    onChange={handleSellingPriceChange}
                                                    className="block flex-1 h-14 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-xl leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
                                Discard
                            </a>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit Post
                            </button>
                        </div>
                    </form>
                </Container>
            }
        </div>
    )
}

function CreateNewListingPageHeader() {
    return (
        <header className="py-4 z-10 bg-gradient-to-r from-[#002f87] to-[#0c2340]">
            <Container>
                <nav className=" relative z-20 flex space-x-4">
                    <div className="flex flex-1 items-center justify-between ">
                        <div className="flex items-center ">
                            <Link href="/" aria-label="Home" className=" font-semibold">
                                <h2 className="text-center md:text-left text-xl sm:text-2xl font-bold leading-9 tracking-tight">
                                       <span
                                           className="relative whitespace-nowrap text-yellow-300 outline-1 outline-amber-50 mr-2">
                                            <svg
                                                aria-hidden="true"
                                                viewBox="0 0 418 42"
                                                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-yellow-300/80"
                                                preserveAspectRatio="none"
                                            >
                                                <path
                                                    d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"/>
                                            </svg>
                                            <span className="relative">XO CLUTCH</span>
                                        </span>
                                </h2>
                            </Link>
                        </div>
                        <div className="flex items-center ">
                            <div className="text-gray-100 sm:text-xl font-bold">CREATE A NEW LISTING</div>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

const CONDITION_OPTIONS = ['New', 'Like new', 'Good', 'Fair', 'Poor'];
const COLOR_OPTIONS = ['White', 'Black', 'Blue', 'Yellow', 'Red', 'Green', 'Purple', 'Other'];
const SIZE_OPTIONS = ['XXS (00)', 'XS (0-2)', 'S (4-6)', 'M (8-10)', 'L (12-14)', 'XL (16-18)', 'XXL (10-220)', 'Other'];
const MEETING_LOCATION_OPTIONS = ["Hesburgh Library", "Duncan Student Center", "LaFortune Student Center", "Main Building"];
