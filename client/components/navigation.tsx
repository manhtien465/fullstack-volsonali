"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const navItems = [
  { name: "NEWS", href: "/news" },
  { name: "TOP APPS", href: "/top-apps" },
  { name: "TOP GAMES", href: "/top-games" },
  { name: "HOW-TO", href: "/how-to" },
  { name: "TIPS&GUIDES", href: "/tips-guides" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 h-12 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-pink-600 l duration-300 whitespace-nowrap px-2 py-2",
                  pathname === item.href ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-700",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="px-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full py-3 text-left"
          >
            <span className="text-sm font-medium text-gray-700">Browse Categories</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </button>

          {isOpen && (
            <div className="pb-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2 pt-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-xs font-medium transition-colors hover:text-blue-600 px-3 py-2 rounded-lg text-center",
                      pathname === item.href ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
