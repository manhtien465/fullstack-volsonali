"use client"

interface NeonTextProps {
  text: string
  color?: string
  className?: string
}

export function NeonText({ text, color = "#ff00de", className = "" }: NeonTextProps) {
  return (
    <div
      className={`neon-glow ${className}`}
      style={{
        color: color,
        textShadow: `
          0 0 5px ${color},
          0 0 10px ${color},
          0 0 15px ${color},
          0 0 20px ${color},
          0 0 35px ${color},
          0 0 40px ${color}
        `,
      }}
    >
      {text}
    </div>
  )
}
