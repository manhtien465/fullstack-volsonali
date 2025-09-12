"use client"

import { useEffect } from "react"
import { initializeGAM } from "@/lib/gam"

export default function GAMScript() {
  useEffect(() => {
    // Initialize GAM when component mounts
    initializeGAM()
  }, [])

  return null // This component doesn't render anything
}
