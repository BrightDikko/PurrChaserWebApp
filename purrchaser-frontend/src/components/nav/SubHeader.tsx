import React, {Fragment, useEffect, useState} from "react";
import {Container} from "@/components/shared/Container";
import {MAIN_CATEGORIES_DATA} from "@/data/listings/Categories";
import {NavLink} from "@/components/shared/NavLink";
import {Menu, Transition} from "@headlessui/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {useGetAllCategoriesQuery} from "@/store/services/api";
import {useAppDispatch} from "@/hooks/store";
import {
    formatCategoryNameLikeInHrefSlug,
    PrimaryCategory,
    SecondaryCategory,
    setCategories,
    TertiaryCategory
} from "@/store/slices/categoriesSlice";

// Skeleton Loader Component
const SkeletonNavLink = () => {
    return (
        <div className="animate-pulse p-1 sm:p-2">
            <div className="bg-gray-300 h-8  rounded-md"></div>
        </div>
    );
};

const SubHeader = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const [activeSubCategoryLevel1, setActiveSubCategoryLevel1] = useState(0);
    const [activeSubCategoryLevel2, setActiveSubCategoryLevel2] = useState(0);

    const {data: categories, error, isLoading} = useGetAllCategoriesQuery();

    useEffect(() => {
        if (categories) {
            dispatch(setCategories(categories));
        }
    }, [categories, dispatch]);

    const renderPrimaryNavLinks = () => {
        if (isLoading) {
            return Array.from({length: 5}, (_, index) => <SkeletonNavLink key={index}/>);
        } else {
            return (
                <>
                    {categories.map((category: PrimaryCategory, index: number) => (
                        <Menu.Item key={category.name}>
                            {({}) => (
                                <a
                                    className={clsx(
                                        index === activeSubCategoryLevel1 ? 'font-semibold text-gray-900 bg-gray-200' : 'text-gray-500',
                                        'flex items-center justify-between pl-3 pr-2 py-2 text-xs sm:text-sm',
                                    )}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        // console.log("index: ", index);
                                        setActiveSubCategoryLevel1(index);
                                        setActiveSubCategoryLevel2(0);
                                    }}
                                >
                                    <span>{category.name}</span>
                                    <span className={clsx(
                                        index === activeSubCategoryLevel1 ? "block" : "hidden"
                                    )}><ChevronRightIcon className="h-4 w-4 stroke-2"/> </span>
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </>
            )
        }
    };

    const renderSecondaryNavLinks = () => {
        if (isLoading) {
            return Array.from({length: 5}, (_, index) => <SkeletonNavLink key={index}/>);
        } else {
            return (
                <>
                    {categories[activeSubCategoryLevel1].secondaryCategories.map((category: SecondaryCategory, index: number) => (
                        <Menu.Item key={category.name}>
                            {({}) => (
                                <a
                                    className={clsx(
                                        index === activeSubCategoryLevel2 ? 'font-semibold text-gray-900' : 'text-gray-500',
                                        'flex items-center justify-between pl-3 pr-2 py-2 text-xs sm:text-sm',
                                    )}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActiveSubCategoryLevel2(index);
                                    }}
                                >
                                    <span>{category.name}</span>
                                    <span className={clsx(
                                        index === activeSubCategoryLevel2 ? "block" : "hidden"
                                    )}><ChevronRightIcon className="h-4 w-4 stroke-2"/> </span>
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </>
            )
        }
    };

    const renderTertiaryNavLinks = () => {
        if (isLoading) {
            return Array.from({length: 5}, (_, index) => <SkeletonNavLink key={index}/>);
        } else {
            return (
                <>
                    {categories[activeSubCategoryLevel1].secondaryCategories[activeSubCategoryLevel2].tertiaryCategories.map((category: TertiaryCategory) => (
                        <Menu.Item key={category.name}>
                            {({active}) => (
                                <a
                                    className={clsx(
                                        'text-gray-500',
                                        active ? 'font-medium text-indigo-500' : '',
                                        'flex items-center justify-between pl-3 pr-2 py-2 text-xs sm:text-sm',
                                    )}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        router.push(`/categories/${formatCategoryNameLikeInHrefSlug(category.name)}`);
                                    }}
                                >
                                    {category.name}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </>
            )
        }
    };

    if (isLoading) {
        // console.log("\nCategories loading");
    }

    if (error) {
        console.log("\nAn error occurred while fetching categories");
        console.error("error:", error);
        return;
    }

    return (
        <header className="py-4 z-10 bg-gradient-to-r from-[#002f87] to-[#0c2340]">
            <Container>
                <nav className="-ml-1.5 relative z-20 flex space-x-4">
                    <div className="flex flex-1 items-center justify-between gap-x-3">
                        <div className="flex items-center ">
                            <div className="text-gray-100 font-bold">Explore Marketplace</div>
                        </div>

                        <div className="flex flex-1 items-center justify-evenly ">
                            <div className="hidden sm:flex md:hidden flex-1 justify-evenly">
                                {
                                    MAIN_CATEGORIES_DATA.slice(0, 4).map((item) => (
                                            <NavLink key={item.title} href={item.href}>
                                                <span className="text-gray-100 font-normal">{item.title}</span>
                                            </NavLink>
                                        )
                                    )
                                }
                            </div>
                            <div className="hidden md:flex lg:hidden flex-1 justify-evenly">
                                {
                                    MAIN_CATEGORIES_DATA.slice(0, 5).map((item) => (
                                            <NavLink key={item.title} href={item.href}>
                                                <span className="text-gray-100 font-normal">{item.title}</span>
                                            </NavLink>
                                        )
                                    )
                                }
                            </div>
                            <div className="hidden lg:flex xl:hidden flex-1 justify-evenly">
                                {
                                    MAIN_CATEGORIES_DATA.slice(0, 7).map((item) => (
                                            <NavLink key={item.title} href={item.href}>
                                                <span className="text-gray-100 font-normal">{item.title}</span>
                                            </NavLink>
                                        )
                                    )
                                }
                            </div>
                            <div className="hidden xl:flex flex-1 justify-evenly">
                                {
                                    MAIN_CATEGORIES_DATA.map((item) => (
                                            <NavLink key={item.title} href={item.href}>
                                                <span className="text-gray-100 font-normal">{item.title}</span>
                                            </NavLink>
                                        )
                                    )
                                }
                            </div>
                        </div>

                        <div className="ml-3 flex items-center">
                            <Menu as="div" className=" w-full inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="group inline-flex justify-center items-center text-sm font-semibold text-gray-700 hover:text-gray-900">
                                        <a className="flex space-x-0.5 items-center justify-center"
                                           onClick={() => {
                                               setActiveSubCategoryLevel1(0);
                                               setActiveSubCategoryLevel2(0);
                                           }}>
                                            <span className="text-gray-100 font-semibold">View all</span>
                                            <span>
                                                <ChevronRightIcon className="h-4 w-4 stroke-gray-100 stroke-2"
                                                                  aria-hidden="true"/>
                                            </span>
                                        </a>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute left-0 z-10 mt-2 origin-top-right w-full rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">

                                        <div className="flex flex-col w-full py-5 ">
                                            <div className="block px-6 font-medium text-gray-500 text-sm ">
                                                All Categories
                                            </div>
                                            <div className="flex mt-2 w-full py-2 px-2 sm:pl-3">
                                                <div className="flex-1">
                                                    {renderPrimaryNavLinks()}
                                                </div>

                                                <div className="bg-black/20 flex flex-col w-[1px] h-auto"/>

                                                <div className="flex-1">
                                                    {renderSecondaryNavLinks()}
                                                </div>

                                                <div className="bg-black/20 flex flex-col w-[1px] h-auto"/>


                                                <div className="flex-1">
                                                    {renderTertiaryNavLinks()}
                                                </div>
                                            </div>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default SubHeader;