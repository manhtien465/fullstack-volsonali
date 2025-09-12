"use client"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  type?: "spinner" | "dots" | "pulse" | "bars"
  color?: string
  className?: string
}

export function LoadingSpinner({
  size = "md",
  type = "spinner",
  color = "text-pink-600",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  if (type === "dots") {
    return (
      <div className={`loading-dots ${color} ${className}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }

  if (type === "pulse") {
    return (
      <div className={`${sizeClasses[size]} ${color} ${className}`}>
        <div className="w-full h-full bg-current rounded-full animate-pulse"></div>
      </div>
    )
  }

  if (type === "bars") {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-6 ${color} bg-current animate-pulse`}
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div
        className={`w-full h-full border-2 border-current border-t-transparent rounded-full animate-spin ${color}`}
      ></div>
    </div>
  )
}
