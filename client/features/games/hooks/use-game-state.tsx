"use client"

import { useState } from "react"

export function useGameState() {
     const [activeTab, setActiveTab] = useState("Review")
 
  return {
    activeTab,
    setActiveTab
  }
}
