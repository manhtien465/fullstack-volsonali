"use client"

import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export type ComponentType =
  | "container"
  | "row"
  | "column"
  | "heading"
  | "paragraph"
  | "button"
  | "input"
  | "textarea"
  | "checkbox"
  | "radio"
  | "card"
  | "image"
  | "divider"
  | "spacer"
  | "tabs"
  | "accordion"
  | "alert"
  | "badge"
  | "avatar"
  | "tooltip"
  | "dialog"
  | "popover"
  | "select"
  | "slider"
  | "toggle"
  | "icon"

export interface PageComponent {
  id: string
  type: ComponentType
  props: Record<string, any>
  children?: PageComponent[]
  visible: boolean
  order: number
}
