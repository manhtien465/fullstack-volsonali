"use client"

import type { ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface StaggeredGridProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  animationType?: "slide" | "scale" | "fade"
}

export function StaggeredGrid({
  children,
  className = "",
  staggerDelay = 100,
  animationType = "slide",
}: StaggeredGridProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getAnimationClass = () => {
    switch (animationType) {
      case "scale":
        return "animate-scale-in"
      case "fade":
        return "animate-fade-in"
      default:
        return "animate-slide-in-up"
    }
  }

  return (
    <div  className={`grid ${className}`}>
      {children.map((child) => (
        // <div
        //   key={index}
        //   className={`${isIntersecting ? getAnimationClass() : "opacity-0"} col-span-2 row-span-2 `}
        //   style={{
        //     animationDelay: `${index * staggerDelay}ms`,
        //     animationFillMode: "both",
        //   }}
        // >
       
          child
       
      ))}
    </div>
  )
}
