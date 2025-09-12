"use client"

import { useCallback } from "react"
import {
  event,
  trackGamePlay,
  trackGameComplete,
  trackSearch,
  trackShare,
  trackEngagement,
  trackDownload,
} from "@/lib/gtag"

export function useAnalytics() {
  const trackEvent = useCallback((action: string, category: string, label?: string, value?: number) => {
    event({ action, category, label, value })
  }, [])

  const trackGameStart = useCallback((gameName: string, gameCategory: string) => {
    trackGamePlay(gameName, gameCategory)
  }, [])

  const trackGameEnd = useCallback((gameName: string, score?: number, timeSpent?: number) => {
    trackGameComplete(gameName, score)

    // Track time spent playing
    if (timeSpent) {
      event({
        action: "game_session_duration",
        category: "Games",
        label: gameName,
        value: Math.round(timeSpent / 1000), // Convert to seconds
      })
    }
  }, [])

  const trackSiteSearch = useCallback((query: string, resultsCount: number) => {
    trackSearch(query, resultsCount)
  }, [])

  const trackSocialShare = useCallback((contentType: string, contentName: string, platform: string) => {
    trackShare(contentType, contentName, platform)
  }, [])

  const trackUserEngagement = useCallback((action: string, element: string) => {
    trackEngagement(action, element)
  }, [])

  const trackFileDownload = useCallback((fileName: string, fileType: string) => {
    trackDownload(`${fileName}.${fileType}`)
  }, [])

  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    event({
      action: "click",
      category: "UI Interaction",
      label: `${buttonName} - ${location}`,
    })
  }, [])

  const trackFormSubmission = useCallback((formName: string, success: boolean) => {
    event({
      action: success ? "form_submit_success" : "form_submit_error",
      category: "Forms",
      label: formName,
    })
  }, [])

  const trackPageScroll = useCallback((percentage: number, pageName: string) => {
    event({
      action: "scroll",
      category: "Engagement",
      label: `${pageName} - ${percentage}%`,
      value: percentage,
    })
  }, [])

  return {
    trackEvent,
    trackGameStart,
    trackGameEnd,
    trackSiteSearch,
    trackSocialShare,
    trackUserEngagement,
    trackFileDownload,
    trackButtonClick,
    trackFormSubmission,
    trackPageScroll,
  }
}
