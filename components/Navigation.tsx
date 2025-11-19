'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItemProps = {
  href: string
  label: string
  pathname: string
}

function NavItem({ href, label, pathname }: NavItemProps) {
  const isActive = pathname === href

  return (
    <li
      className={`py-2.5 min-[360px]:py-3 min-[390px]:py-3.5 sm:py-4 shrink-0 ${
        isActive ? 'border-b-2 border-[#425aeb]' : ''
      }`}
    >
      <Link
        href={href}
        className={`text-sm min-[390px]:text-[0.9375rem] sm:text-base font-bold ${
          isActive ? 'text-[#425aeb] ' : 'text-[#8c8f97] hover:text-[#425aeb]'
        }`}
      >
        {label}
      </Link>
    </li>
  )
}

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="px-8 border-b border-gray-300">
      <ul className="flex gap-7 list-none m-0 p-0">
        <NavItem href="/" label="대시보드" pathname={pathname} />
        <NavItem href="/payments" label="거래 내역" pathname={pathname} />
        <NavItem href="/merchants" label="가맹점 목록" pathname={pathname} />
      </ul>
    </nav>
  )
}
