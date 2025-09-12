import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Access Restricted",
  description: "This content is not available on this domain",
  robots: "noindex, nofollow",
}

export default function AccessRestrictedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
