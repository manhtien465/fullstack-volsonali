import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, BookOpen } from "lucide-react"
import { getCategories, getHtmlFooter } from "@/features/games/service/get-games"
import { ETypeCategoryHtml } from "@/features/games/constants/data"

export const revalidate = 60 * 60 * 24

export default async function Footer() {
  const { data } = await getHtmlFooter(1,undefined,true )

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-float"></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-indigo-500/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-500/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 right-1/3 w-14 h-14 bg-indigo-500/10 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4 group">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div> */}
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  MegaGameFun
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Gaming news, reviews, and updates to enhance your digital experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/games"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  HTML5 Games
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  Game Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  Gaming News
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  How-To Guides
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/guides"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  Knowledge Guides
                </Link>
              </li>
              
              <li>
                <Link
                  href="/tips-guides"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  Tips & Tricks
                </Link>
              </li> */}

{/*                 <li>
                <Link
                  href="/tos"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  Tos
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Latest Reviews</h3>
            <ul className="space-y-2 text-sm">
              {data.map((category) => {
                return (
                  <li key={category.documentId}>
                    <Link
                      href={`/games/${category.slug}`}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      {category.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:text-blue-400"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:text-blue-400"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:text-blue-400"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:text-red-400"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">Stay updated with the latest knowledge and insights!</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 MegaGameFun. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-blue-400 transition-colors duration-200">
              Disclaimer
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">
              Contact
            </Link>
            <Link href="/tos" className="hover:text-blue-400 transition-colors duration-200">
              Tos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
