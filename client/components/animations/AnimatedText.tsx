"use client"

import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  cursor?: boolean
}

export function AnimatedText({ text, className = "", delay = 0, speed = 100, cursor = false }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(cursor)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else if (cursor) {
          // Blink cursor after text is complete
          const cursorTimer = setInterval(() => {
            setShowCursor((prev) => !prev)
          }, 500)
          return () => clearInterval(cursorTimer)
        }
      },
      currentIndex === 0 ? delay : speed,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, speed, cursor])

  return (
    <span className={className}>
      {displayText}
      {cursor && showCursor && <span className="animate-pulse">|</span>}
    </span>
  )
}
