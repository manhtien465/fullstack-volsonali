import { BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
      {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
        <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          MegaGameFun
        </span>
      </div> */}
      <Image src={'/logo.jpg'}width={200} height={200} alt="logo" />
    </Link>
  )
}
export default Logo
