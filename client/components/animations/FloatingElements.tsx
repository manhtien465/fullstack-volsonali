"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
}

interface FloatingElementsProps {
  count?: number
  className?: string
}

export function FloatingElements({ count = 10, className = "" }: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const colors = ["#ec4899", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]

    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 5,
    }))

    setElements(newElements)
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full opacity-20 animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            animationDuration: `${element.duration}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
