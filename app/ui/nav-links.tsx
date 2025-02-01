'use client';

import clsx from "clsx";
import Link from "next/link"
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Sellers', href: '/sellers' },
];

export default function NavLinks() {
  const pathname = usePathname(); 
  return (
    <>
      {links.map((link) => {
        return (
          <Link 
            key={link.name}
            href={link.href}
            className={clsx(
              "block rounded-md px-4 py-2 text-foreground font-medium hover:bg-color_four hover:text-color_three",
              {
                'bg-color_four text-color_three': pathname === link.href,
              },
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}