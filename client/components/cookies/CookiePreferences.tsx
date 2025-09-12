"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Cookie, Shield, BarChart3, Target } from "lucide-react"

interface CookieCategory {
  id: string
  name: string
  description: string
  required: boolean
  enabled: boolean
  icon: React.ReactNode
}

export function CookiePreferences() {
  const [categories, setCategories] = useState<CookieCategory[]>([
    {
      id: "necessary",
      name: "Necessary Cookies",
      description: "Essential cookies required for the website to function properly.",
      required: true,
      enabled: true,
      icon: <Shield className="w-5 h-5 text-green-500" />,
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      required: false,
      enabled: true,
      icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      description: "Used to deliver personalized advertisements and track campaign performance.",
      required: false,
      enabled: true,
      icon: <Target className="w-5 h-5 text-purple-500" />,
    },
  ])

  const handleToggle = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId && !cat.required ? { ...cat, enabled: !cat.enabled } : cat)),
    )
  }

  const savePreferences = () => {
    const preferences = categories.reduce(
      (acc, cat) => {
        acc[cat.id] = cat.enabled
        return acc
      },
      {} as Record<string, boolean>,
    )

    localStorage.setItem("cookie-preferences", JSON.stringify(preferences))
    localStorage.setItem("cookie-consent", "customized")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())

    // Trigger event for other components
    window.dispatchEvent(
      new CustomEvent("cookiePreferencesUpdated", {
        detail: preferences,
      }),
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Cookie className="w-6 h-6 text-yellow-500" />
          <CardTitle className="text-2xl">Cookie Preferences</CardTitle>
        </div>
        <CardDescription>Customize your cookie settings. You can change these preferences at any time.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="flex items-start space-x-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 mt-1">{category.icon}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={category.id} className="text-base font-medium">
                  {category.name}
                </Label>
                <Switch
                  id={category.id}
                  checked={category.enabled}
                  onCheckedChange={() => handleToggle(category.id)}
                  disabled={category.required}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
              {category.required && (
                <p className="text-xs text-gray-500">This category is required and cannot be disabled.</p>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-4">
          <Button onClick={savePreferences} className="flex-1">
            Save Preferences
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setCategories((prev) => prev.map((cat) => ({ ...cat, enabled: true })))
              savePreferences()
            }}
          >
            Accept All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
