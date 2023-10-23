"use client"

import React, {Fragment, MouseEvent} from 'react'
import Link from 'next/link'
import {Popover, Transition} from '@headlessui/react'
import {
    BellIcon,
    ChevronRightIcon,
    HomeIcon,
    PlusIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    TagIcon,
    UserIcon,
} from '@heroicons/react/24/outline'

import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {Button} from '@/components/shared/Button'
import {NavLink} from '@/components/shared/NavLink'
import {Container} from '@/components/shared/Container'
import {logoutUser} from "@/store/slices/authSlice";
import SubHeader from "@/components/nav/SubHeader";

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

const AuthenticatedMobileNavigation: React.FC<AuthenticatedHeaderProps> = ({handleLogOut}) => {
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
                                <span><HomeIcon className="h-5 w-5 "/> </span>
                                <span>Home</span>
                            </div>
                        </MobileNavLink>

                        <MobileNavLink href="/#">
                            <div className="flex space-x-2 items-center">
                                <span><ShoppingBagIcon className="h-5 w-5 "/> </span>
                                <span>Shop categories</span>
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
                                <span>Account</span>
                            </div>
                        </MobileNavLink>
                        <hr className="m-2 border-slate-300/40"/>
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

const UnauthenticatedHeader: React.FC<UnauthenticatedHeaderProps> = () => {
    return (
        <header className="relative py-7 bg-slate-50 bg-[url('/assets/images/ND_Dome_Sketch_Cropped.png')] bg-contain bg-no-repeat bg-right bg-opacity-5 bg-blend-color-burn">
            <div className="absolute inset-0 w-full h-full bg-slate-50 bg-opacity-80"/>

            <Container>
                <nav className="relative z-30 flex justify-between ">
                    <div className="flex items-center md:gap-x-12">
                        <Link href="/" aria-label="Home" className="text-xl text-gray-900 font-semibold">
                            PurrChaser
                        </Link>
                        <div className="hidden md:flex md:gap-x-6">
                            <NavLink href="/login">Shop marketplace</NavLink>
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

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({handleLogOut}) => {
    return (
        <header className="relative py-7 bg-slate-50 bg-[url('/assets/images/ND_Dome_Sketch_Cropped.png')] bg-contain bg-no-repeat bg-right bg-opacity-5 bg-blend-color-burn">
            <div className="absolute inset-0 w-full h-full bg-slate-50 bg-opacity-80"/>

            <Container>
                <nav className="relative z-50 flex space-x-4">
                    <div className="flex flex-1 items-center md:gap-x-4 space-x-3">
                        <Link href="/" aria-label="Home" className="text-xl text-gray-900 font-semibold">
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
                                placeholder={"🔎 Search for item"}
                                // value={null}
                                className="w-full rounded-full border-1 bg-slate-100/70 border-gray-400 py-2 px-5 text-gray-600 ring-1 ring-gray-400 ring-inset placeholder:text-gray-500 focus:ring-inset focus:ring-gray-500 focus:bg-slate-100 text-sm leading-6"
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
