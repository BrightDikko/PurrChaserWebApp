import React, {MouseEvent} from "react";
import Link from 'next/link'

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function NavLink({href, children, onClick}: NavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="inline-block rounded-lg px-2 py-1 font-semibold text-sm text-slate-700 hover:font-semibold hover:text-slate-900"
        >
            {children}
        </Link>
    )
}
