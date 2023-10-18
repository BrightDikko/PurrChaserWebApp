"use client"

import React, {Fragment, MouseEvent} from 'react'
import Link from 'next/link'
import {Popover, Transition} from '@headlessui/react'
import {BellIcon, PlusIcon, ShoppingCartIcon, UserIcon, ChevronRightIcon} from '@heroicons/react/24/outline'

import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {Button} from '@/components/shared/Button'
import {NavLink} from '@/components/shared/NavLink'
import {Container} from '@/components/shared/Container'
import {logoutUser} from "@/store/slices/authSlice";

type MobileNavLinkProps = {
    href: string;
    children: React.ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

type AuthenticatedHeaderProps = {
    handleLogOut: () => void;
}

type UnauthenticatedHeaderProps = {}

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
                className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
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
                        <MobileNavLink href="/#">Shop marketplace</MobileNavLink>
                        <MobileNavLink href="/#">Sell an item</MobileNavLink>
                        <MobileNavLink href="/#">Notifications</MobileNavLink>
                        <MobileNavLink href="/#">Cart</MobileNavLink>
                        <hr className="m-2 border-slate-300/40"/>
                        <MobileNavLink href="/login">Log in</MobileNavLink>
                        <MobileNavLink href="/register">Sign up</MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

const AuthenticatedMobileNavigation: React.FC<AuthenticatedHeaderProps> = ({handleLogOut}) => {
    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
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
                        <MobileNavLink href="/#">Account</MobileNavLink>
                        <MobileNavLink href="/#">Sell an item</MobileNavLink>
                        <MobileNavLink href="/#">Notifications</MobileNavLink>
                        <MobileNavLink href="/#">Cart</MobileNavLink>
                        <hr className="m-2 border-slate-300/40"/>
                        <MobileNavLink href="/#" onClick={handleLogOut}>Log out</MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

const UnauthenticatedHeader: React.FC<UnauthenticatedHeaderProps> = () => {
    return (
        <header className="py-7 bg-slate-50">
            <Container>
                <nav className="relative z-50 flex justify-between">
                    <div className="flex items-center md:gap-x-12">
                        <Link href="#" aria-label="Home" className="text-xl text-gray-900 font-semibold">
                            PurrChaser
                        </Link>
                        <div className="hidden md:flex md:gap-x-6">
                            <NavLink href="/#">Shop marketplace</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-5 md:gap-x-5">
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
                        <Button href="/#" color="slate" className="hidden md:flex space-x-1">
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

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({handleLogOut}) => {
    return (
        <header className="py-7 bg-slate-50">
            <Container>
                <nav className="relative z-50 flex space-x-4">
                    <div className="flex flex-1 items-center md:gap-x-4 space-x-2">
                        <Link href="#" aria-label="Home" className="text-xl text-gray-900 font-semibold">
                            PurrChaser
                        </Link>
                        <div className="h-10 md:flex flex-1 md:gap-x-6">
                            <input
                                id="user_password"
                                name="user_password"
                                type="search"
                                autoComplete="new-password"
                                required
                                // onChange={null}
                                placeholder={"🔎 Search for anything"}
                                // value={null}
                                className="w-full rounded-full border-1 border-gray-400 py-2 px-5 text-gray-600 ring-1 ring-gray-400 ring-inset placeholder:text-gray-500 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3 md:gap-x-3">
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
                            <NavLink href="/#" onClick={handleLogOut}>
                                <div
                                    className="relative flex justify-center items-center rounded-full bg-slate-200 h-9 w-9 border-2 border-slate-300">
                                    <div className="absolute h-2 w-2 bg-green-600 rounded-full top-0 right-0"/>
                                    <span><UserIcon className="h-5 w-5 stroke-slate-700" aria-hidden="true"/></span>
                                </div>
                            </NavLink>
                        </div>
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

const subHeaderCategories = [
    {
        title: "Football Tickets",
        href: "/#"
    },
    {
        title: "Books",
        href: "/#"
    },
    {
        title: "Laptops",
        href: "/#"
    },
    {
        title: "Phones",
        href: "/#"
    },
    {
        title: "Furniture",
        href: "/#"
    },
    {
        title: "Arts & Crafts",
        href: "/#"
    },
    {
        title: "Winter Gear",
        href: "/#"
    },
    {
        title: "Concert Tickets",
        href: "/#"
    },
    {
        title: "Kitchen Utensils",
        href: "/#"
    },
]
const SubHeader = () => {
    return (
        <header className="py-3 bg-gradient-to-r from-[#002f87] to-[#0c2340]">
            <Container>
                <nav className="relative z-50 flex space-x-4">
                    <div className="flex flex-1 items-center justify-between gap-x-3 md:gap-x-3">
                        <div className="flex items-center ">
                            <NavLink href="/#">
                                <span className="text-gray-100 font-bold">Explore</span>
                            </NavLink>
                        </div>

                        <div className="flex items-center ">
                            <NavLink href="/#">
                                <span className="text-gray-100 font-semibold">|</span>
                            </NavLink>
                        </div>

                        <div className="flex items-center justify-evenly gap-x-3 md:gap-x-3">
                            {
                                subHeaderCategories.map((item, index) => (
                                        <NavLink key={item.title} href={item.href}>
                                            <span className="text-gray-100 font-normal">{item.title}</span>
                                        </NavLink>
                                    )
                                )
                            }
                            <NavLink href="/#">
                                <div className="flex space-x-0.5 items-center justify-center">
                                    <span className="text-gray-100 font-semibold">View all</span>
                                    <span><ChevronRightIcon className="h-4 w-4 stroke-gray-100 stroke-2"
                                                            aria-hidden="true"/></span>
                                </div>
                            </NavLink>
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

    const handleLogOut = () => {
        dispatch(logoutUser());
        console.log("User successfully logged out!")
    }

    return (
        <>
            {isAuthenticated ? <AuthenticatedHeader handleLogOut={handleLogOut}/> : <UnauthenticatedHeader/>}
            <SubHeader/>
        </>
    );
}
