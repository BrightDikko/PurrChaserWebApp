"use client"

import React, {Fragment, MouseEvent, useEffect, useState} from 'react'
import Link from 'next/link'
import {Popover, Transition} from '@headlessui/react'
import {
    BellIcon,
    ChevronRightIcon,
    HeartIcon,
    HomeIcon,
    PlusIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    Square3Stack3DIcon,
    SquaresPlusIcon,
    TagIcon,
    UserIcon,
} from '@heroicons/react/24/outline'

import {useAppDispatch, useAppSelector} from "@/hooks/store";
import {Button} from '@/components/shared/Button'
import {NavLink} from '@/components/shared/NavLink'
import {Container} from '@/components/shared/Container'
import {logoutUser, updateAuthState} from "@/store/slices/authSlice";
import SubHeader from "@/components/nav/SubHeader";
import {getCurrentUser} from "@/store/services/api";
import clsx from "clsx";

type MobileNavLinkProps = {
    href: string;
    children: React.ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

type AuthenticatedHeaderProps = {
    handleLogOut: () => void;
    isLoading: boolean;
}

type AuthenticatedMobileHeaderProps = {
    handleLogOut: () => void;
}

type UnauthenticatedHeaderProps = {
    isLoading: boolean;
}

const MobileNavLink = ({href, children, onClick}: MobileNavLinkProps) => {
    return (
        <Popover.Button as={Link} onClick={onClick} href={href} className="block w-full p-2">
            {children}
        </Popover.Button>
    )
}

function MobileNavIcon({open}: { open: boolean }) {
    return (
        <React.Fragment>
            {open ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="stroke-gray-900 w-8 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor"
                     className="stroke-gray-900 w-8 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
            }
        </React.Fragment>
    )
}

function MobileNavigation() {
    return (
        <Popover>
            <Popover.Button
                className="relative z-40 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                aria-label="Toggle Navigation"
            >
                {({open}) => <MobileNavIcon open={open}/>}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-slate-950/60"/>
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 tracking-tight text-slate-600 space-y-2 font-medium shadow-xl ring-1 ring-slate-900/5"
                    >
                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><HomeIcon className="h-5 w-5 "/> </span>
                                <span>Home</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/login">
                            <div className="flex space-x-2 items-center">
                                <span><ShoppingBagIcon className="h-5 w-5 "/> </span>
                                <span>Shop marketplace</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/login">
                            <div className="flex space-x-2 items-center">
                                <span><TagIcon className="h-5 w-5 "/> </span>
                                <span>Sell an item</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><BellIcon className="h-5 w-5 "/> </span>
                                <span>Notifications</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><ShoppingCartIcon className="h-5 w-5 "/> </span>
                                <span>Cart</span>
                            </div>
                        </MobileNavLink>

                        <hr className="m-2 border-slate-300/40"/>

                        <MobileNavLink href="/login">
                            <div className="flex space-x-2 items-center justify-between">
                                <span>Log in</span>
                                <span><ChevronRightIcon className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/register">
                            <div className="flex space-x-2 items-center justify-between">
                                <span>Sign up</span>
                                <span><ChevronRightIcon className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                            </div>
                        </MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

const AuthenticatedMobileNavigation: React.FC<AuthenticatedMobileHeaderProps> = ({handleLogOut}) => {
    return (
        <Popover>
            <Popover.Button
                className="relative z-30 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                aria-label="Toggle Navigation"
            >
                {({open}) => <MobileNavIcon open={open}/>}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-slate-950/60"/>
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
                    >
                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><Square3Stack3DIcon className="h-5 w-5 "/> </span>
                                <span>My Listings</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><TagIcon className="h-5 w-5 "/> </span>
                                <span>Sell an item</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><SquaresPlusIcon className="h-5 w-5 "/> </span>
                                <span>Shop categories</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><ShoppingBagIcon className="h-5 w-5 "/> </span>
                                <span>Purchases</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><HeartIcon className="h-5 w-5 "/> </span>
                                <span>Favorites</span>
                            </div>
                        </MobileNavLink>

                        <hr className="m-2 border-slate-300/40"/>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><BellIcon className="h-5 w-5 "/> </span>
                                <span>Notifications</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><ShoppingCartIcon className="h-5 w-5 "/> </span>
                                <span>Cart</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><UserIcon className="h-5 w-5 "/> </span>
                                <span>Profile</span>
                            </div>
                        </MobileNavLink>
                        <hr className="m-2 border-slate-300/40"/>
                        <MobileNavLink href="/login" onClick={handleLogOut}>
                            <div className="flex space-x-2 items-center justify-between">
                                <span>Settings</span>
                                <span><ChevronRightIcon className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/login" onClick={handleLogOut}>
                            <div className="flex space-x-2 items-center justify-between">
                                <span>Help</span>
                                <span><ChevronRightIcon className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/login" onClick={handleLogOut}>
                            <div className="flex space-x-2 items-center justify-between">
                                <span>Log out</span>
                                <span><ChevronRightIcon className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                            </div>
                        </MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

const UnauthenticatedHeader: React.FC<UnauthenticatedHeaderProps> = ({isLoading}) => {
    return (
        <header
            className="relative py-7 bg-slate-50 bg-[url('/assets/images/ND_Dome_Sketch_Cropped.png')] bg-contain bg-no-repeat bg-right bg-opacity-5 bg-blend-color-burn">
            <div className="absolute inset-0 w-full h-full bg-slate-50 bg-opacity-80"/>

            <Container>
                <nav className="relative z-40 flex justify-between ">
                    <div className="flex flex-1 items-center md:gap-x-4">
                        <Link href="/" aria-label="Home" className="text-xl text-gray-900 font-semibold">
                            <h2 className="text-center md:text-left text-2xl font-bold leading-9 tracking-tight text-gray-800">
                               <span
                                   className="relative whitespace-nowrap text-indigo-700 outline-1 outline-amber-50 mr-2">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 418 42"
                                        className="absolute left-0 top-2/3 h-[0.58em] w-full fill-indigo-700/60"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"/>
                                    </svg>
                                    <span className="relative">XO CLUTCH</span>
                                </span>
                            </h2>
                        </Link>


                        {isLoading ? ( // Show Skeleton
                            <div className="hidden sm:flex animate-pulse w-full mr-3">
                                <div className="bg-gray-300 h-10 w-full rounded-md"></div>
                            </div>
                        ) : (
                            <div className="hidden md:flex md:gap-x-6 ml-4">
                                <NavLink href="/login">Shop marketplace</NavLink>
                            </div>
                        )}

                    </div>

                    <div className="flex items-center gap-x-5 md:gap-x-5">
                        {!isLoading && (
                            <div className="hidden md:flex space-x-2">
                                <NavLink href="/login">Log in</NavLink>
                                <NavLink href="/register">Sign up</NavLink>
                                <NavLink href="/#">
                                    <div className="flex space-x-1">
                                        <span><BellIcon className="h-6 w-6" aria-hidden="true"/></span>
                                        <span className="hidden xl:block">Notifications</span>
                                    </div>
                                </NavLink>
                                <NavLink href="/#">
                                    <div className="flex space-x-1">
                                        <span><ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/></span>
                                        <span className="hidden xl:block">Cart</span>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <Button href="/login" color="slate" className="hidden md:flex space-x-1">
                            <span><PlusIcon className="h-6 w-6" aria-hidden="true"/></span>
                            <span>Sell <span className="hidden lg:inline">an</span> item</span>
                        </Button>
                        <div className="-mr-1 md:hidden">
                            <MobileNavigation/>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({handleLogOut, isLoading}) => {
    return (
        <header
            className="relative py-7 bg-slate-50 bg-[url('/assets/images/ND_Dome_Sketch_Cropped.png')] bg-contain bg-no-repeat bg-right bg-opacity-5 bg-blend-color-burn">
            <div className="absolute inset-0 w-full h-full bg-slate-50 bg-opacity-80"/>

            <Container>
                <nav className="relative z-40 flex space-x-4">
                    <div className={clsx("flex flex-1 items-center md:gap-x-4", isLoading ? "" : "space-x-3")}>
                        <Link href="/" aria-label="Home" className="text-xl text-gray-900 font-semibold">
                            <h2 className="text-center md:text-left text-2xl font-bold leading-9 tracking-tight text-gray-800">
                               <span
                                   className="relative whitespace-nowrap text-indigo-700 outline-1 outline-amber-50 mr-2">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 418 42"
                                        className="absolute left-0 top-2/3 h-[0.58em] w-full fill-indigo-700/60"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"/>
                                    </svg>
                                    <span className="relative">XO CLUTCH</span>
                                </span>
                            </h2>
                        </Link>

                        {isLoading ? (
                            <div className="hidden sm:flex animate-pulse w-full ">
                                <div className="bg-gray-300 h-10 w-full rounded-md"></div>
                            </div>
                        ) : (
                            <div className="hidden sm:flex h-10 md:flex flex-1 md:gap-x-6">
                                <input
                                    id="user_password"
                                    name="user_password"
                                    type="search"
                                    autoComplete="new-password"
                                    required
                                    // onChange={null}
                                    placeholder={"🔎 Search for item"}
                                    // value={null}
                                    className="w-full rounded-full border-1 bg-slate-100/70 border-gray-400 py-2 px-5 text-gray-600 ring-1 ring-gray-400 ring-inset placeholder:text-gray-500 focus:ring-inset focus:ring-gray-500 focus:bg-slate-100 text-sm leading-6"
                                />
                            </div>
                        )}

                    </div>
                    <div className="flex items-center gap-x-3 md:gap-x-3">
                        {!isLoading && (
                            <div className="hidden md:flex items-center lg:space-x-2">
                                <NavLink href="/#">
                                    <div className="flex space-x-1">
                                        <span><BellIcon className="h-6 w-6" aria-hidden="true"/></span>
                                        <span className="hidden xl:block">Notifications</span>
                                    </div>
                                </NavLink>

                                <NavLink href="/#">
                                    <div className="flex space-x-1">
                                        <span><ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/></span>
                                        <span className="hidden xl:block">Cart</span>
                                    </div>
                                </NavLink>

                                <Popover>
                                    <Popover.Button
                                        className="relative z-50 flex h-9 w-9 items-center justify-center ui-not-focus-visible:outline-none"
                                        aria-label="Toggle Navigation"
                                    >
                                        {/*{({open}) => <MobileNavIcon open={open}/>}*/}

                                        {() =>
                                            <div
                                                className="flex justify-center items-center rounded-full bg-slate-200 h-9 w-9 border-2 border-slate-300">
                                                <div
                                                    className="absolute h-2 w-2 bg-green-600 rounded-full top-0 right-0"/>
                                                <span><UserIcon className="h-5 w-5 stroke-slate-700"
                                                                aria-hidden="true"/></span>
                                            </div>
                                        }
                                    </Popover.Button>
                                    <Transition.Root>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="duration-150 ease-out"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="duration-150 ease-in"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Popover.Overlay className="fixed inset-0 bg-slate-950/60"/>
                                        </Transition.Child>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="duration-150 ease-out"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="duration-100 ease-in"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Popover.Panel
                                                as="div"
                                                className="absolute w-full max-w-md right-0 mt-4 flex flex-col rounded-2xl bg-white p-4 tracking-tight text-slate-600 space-y-2 font-medium shadow-xl ring-1 ring-slate-900/5"
                                            >
                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><Square3Stack3DIcon className="h-5 w-5 "/> </span>
                                                        <span>My Listings</span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><TagIcon className="h-5 w-5 "/> </span>
                                                        <span>Sell an item</span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><SquaresPlusIcon className="h-5 w-5 "/> </span>
                                                        <span>Shop categories</span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><ShoppingBagIcon className="h-5 w-5 "/> </span>
                                                        <span>Purchases</span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><HeartIcon className="h-5 w-5 "/> </span>
                                                        <span>Favorites</span>
                                                    </div>
                                                </MobileNavLink>

                                                <hr className="m-2 border-slate-300/40"/>

                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><BellIcon className="h-5 w-5 "/> </span>
                                                        <span>Notifications</span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><ShoppingCartIcon className="h-5 w-5 "/> </span>
                                                        <span>Cart</span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/#">
                                                    <div className="flex space-x-2 items-center">
                                                        <span><UserIcon className="h-5 w-5 "/> </span>
                                                        <span>Profile</span>
                                                    </div>
                                                </MobileNavLink>
                                                <hr className="m-2 border-slate-300/40"/>
                                                <MobileNavLink href="/login" onClick={handleLogOut}>
                                                    <div className="flex space-x-2 items-center justify-between">
                                                        <span>Settings</span>
                                                        <span><ChevronRightIcon
                                                            className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/login" onClick={handleLogOut}>
                                                    <div className="flex space-x-2 items-center justify-between">
                                                        <span>Help</span>
                                                        <span><ChevronRightIcon
                                                            className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                                                    </div>
                                                </MobileNavLink>

                                                <MobileNavLink href="/login" onClick={handleLogOut}>
                                                    <div className="flex space-x-2 items-center justify-between">
                                                        <span>Log out</span>
                                                        <span><ChevronRightIcon
                                                            className="h-5 w-5 stroke-2 stroke-gray-400"/> </span>
                                                    </div>
                                                </MobileNavLink>
                                            </Popover.Panel>
                                        </Transition.Child>
                                    </Transition.Root>
                                </Popover>
                            </div>
                        )}
                        <Button href="/#" color="slate" className="hidden md:flex space-x-1">
                            <span><PlusIcon className="h-6 w-6" aria-hidden="true"/></span>
                            <span>Sell <span className="hidden lg:inline">an</span> item</span>
                        </Button>
                        <div className="-mr-1 md:hidden">
                            <AuthenticatedMobileNavigation handleLogOut={handleLogOut}/>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}


export function Header() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentUser = getCurrentUser();
        const token = localStorage.getItem("token");
        if (currentUser) {
            dispatch(updateAuthState({
                user: currentUser,
                token: token
            }));
        }
        setIsLoading(false);
    }, [dispatch]);

    const handleLogOut = () => {
        dispatch(logoutUser());
    }

    return (
        <>
            {isAuthenticated ? <AuthenticatedHeader handleLogOut={handleLogOut} isLoading={isLoading}/> :
                <UnauthenticatedHeader isLoading={isLoading}/>}

            <div className="sm:hidden mx-auto h-10 -mt-4 mb-3.5 w-[95%] z-30">
                <input
                    id="user_password"
                    name="user_password"
                    type="search"
                    autoComplete="new-password"
                    required
                    // onChange={null}
                    placeholder={"🔎 Search for item"}
                    // value={null}
                    className="w-full rounded-full border-1 bg-slate-100/70 border-gray-400 py-2 px-5 text-gray-600 ring-1 ring-gray-400 ring-inset placeholder:text-gray-500 focus:ring-inset focus:ring-gray-500 focus:bg-slate-100 text-sm leading-6"
                />
            </div>
            <SubHeader/>
        </>
    );
}
