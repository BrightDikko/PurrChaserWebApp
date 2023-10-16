'use client'

import React, {Fragment} from 'react'
import Link from 'next/link'
import {Popover, Transition} from '@headlessui/react'
import clsx from 'clsx'

import {Button} from '@/components/shared/Button'
import {Container} from '@/components/shared/Container'
import {BellIcon, ShoppingCartIcon, PlusIcon, ShoppingBagIcon} from '@heroicons/react/24/outline'
import {NavLink} from '@/components/shared/NavLink'

function MobileNavLink({
                           href,
                           children,
                       }: {
    href: string
    children: React.ReactNode
}) {
    return (
        <Popover.Button as={Link} href={href} className="block w-full p-2">
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
                        <MobileNavLink href="/#">Log in</MobileNavLink>
                        <MobileNavLink href="/#">Sign up</MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

export function Header() {
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
                            <NavLink href="/#">Log in</NavLink>
                            <NavLink href="/#">Sign up</NavLink>
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
