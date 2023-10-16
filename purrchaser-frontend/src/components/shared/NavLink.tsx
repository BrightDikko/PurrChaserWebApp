import Link from 'next/link'

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 font-semibold text-sm text-slate-700 hover:font-semibold hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
