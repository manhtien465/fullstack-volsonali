import DefaultLayout from "@/components/layout"
import { generateMetadata } from "@/utils/seo"
import { Metadata } from "next"

export const metadata: Metadata = generateMetadata({
  title: "Blog Games - Gaming Fun ",
  description:
    "Blog Game",
  keywords: ["HTML5 games", "free online games", "browser games", "gaming fun", "play games online"],
  url: "/games",
})

export default function TopGame({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <DefaultLayout>
         {children}
        </DefaultLayout>
    </>
   
  )
}
