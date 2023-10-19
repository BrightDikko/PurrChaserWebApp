import clsx from "clsx";
import React, {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon, FunnelIcon, Squares2X2Icon} from '@heroicons/react/20/solid'

const sortOptions = [
    {name: 'Newest', href: '#', current: false},
    {name: 'Price: Low to High', href: '#', current: false},
    {name: 'Price: High to Low', href: '#', current: false},
]

const tabs = [
    {id: 1, name: 'All', href: '#'},
    {id: 2, name: 'For you', href: '#'},
    {id: 3, name: 'Trending now', href: '#'},
    {id: 4, name: 'Liked', href: '#'},
]

type HomeNavTabsProps = {
    activeTab: number;
    updateActiveTab: (value: number) => void;
}

const HomeNavTabs: React.FC<HomeNavTabsProps> = ({activeTab, updateActiveTab}) => {

    return (
        <div className="block mb-5">
            <div className="flex justify-between border-b border-gray-200">
                <nav className="-mb-px flex space-x-2 sm:space-x-4 md:space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <a
                            key={tab.id}
                            href={tab.href}
                            className={clsx(
                                tab.id == activeTab
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                            )}
                            aria-current={tab.id == activeTab ? 'page' : undefined}
                            onClick={() => updateActiveTab(tab.id)}
                        >
                            {tab.name}
                        </a>
                    ))}
                </nav>

                <div className="ml-3 flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button
                                className="group inline-flex justify-center items-center text-sm font-semibold text-gray-700 hover:text-gray-900">
                                Sort
                                <ChevronDownIcon
                                    className="h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-600"
                                    aria-hidden="true"
                                />
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
                                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                            {({active}) => (
                                                <a
                                                    href={option.href}
                                                    className={clsx(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <button type="button" className="md:ml-2 text-gray-500 hover:text-gray-700">
                        <span className="sr-only">View grid</span>
                        <Squares2X2Icon className="h-5 w-5" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeNavTabs;
