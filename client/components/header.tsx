"use client"

import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useState } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import Logo from "./layout/logo"
import { cn } from "@/lib/utils"

export default function Header() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { scrollY, scrollDirection } = useScrollAnimation()
  const pathname = usePathname()

  const navItems = [
    { name: "Reviews Games", href: "/reviews" },
    { name: "HTML5 Games", href: "/games" },
    { name: "Blog", href: "/blog" },
    { name: "About us", href: "/about" },
  ]

  // Hide header when scrolling down, show when scrolling up
  const headerTransform = scrollDirection === "down" && scrollY > 100 ? "-translate-y-full" : "translate-y-0"

  const handleSearch = useDebouncedCallback((e: any) => {
    router.push(`/games?keyword=${e.target.value}`)
  }, 300)

  return (
    <header
      className={`bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${headerTransform}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Input
                type="text"
                onChange={(e) => handleSearch(e)}
                placeholder="Search content here..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 hover:scale-110"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-gray-600 hover:text-cyan-600 transition-all duration-300 text-sm font-medium whitespace-nowrap relative group",
                  pathname === item.href ? "text-cyan-600" : "text-gray-700",
                )}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 transition-all duration-300 hover:scale-110"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2 transition-all duration-300 hover:scale-110">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="pb-4 border-b border-gray-200">
                    <div className="relative group">
                      <Input
                        type="text"
                        placeholder="Search content here..."
                        className="w-full pl-4 pr-10 py-2 transition-all duration-300 hover:shadow-md"
                      />
                      <Button
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 hover:scale-110"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <nav className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "text-gray-600 hover:text-cyan-600 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-gray-50",
                          pathname === item.href ? "text-cyan-600" : "text-gray-700",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="pt-4">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="Search content here..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 hover:scale-110"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
