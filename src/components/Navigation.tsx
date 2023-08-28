"use client"
import { classNames } from "@/lib/classNames"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navigation = () => {
  const currentPage = usePathname()
  const links = [
    {
      name: "About",
      href: "/about",
      isCurrent: currentPage === "/about",
    },
    {
      name: "Contact",
      href: "/contact",
      isCurrent: currentPage === "/contact",
    },
  ]
  return (
    <div className="flex md:flex-col gap-4 md:gap-2">
      {links.map((link) => (
        <div key={link.name} className={classNames(link.isCurrent && "font-bold", "md:text-lg")}>
          <Link href={link.href}>{link.name}</Link>
        </div>
      ))}
    </div>
  )
}