"use client"

import { useEffect, useState } from "react"

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setScrollDirection(currentScrollY > prevScrollY ? "down" : "up")
      setScrollY(currentScrollY)
      setPrevScrollY(currentScrollY)
    }

    // Throttle scroll events
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [prevScrollY])

  return { scrollY, scrollDirection }
}
