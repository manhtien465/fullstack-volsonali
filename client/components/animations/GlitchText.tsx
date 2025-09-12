"use client"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <div className={`glitch ${className}`} data-text={text}>
      {text}
    </div>
  )
}
