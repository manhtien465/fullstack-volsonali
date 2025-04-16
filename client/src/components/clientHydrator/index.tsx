"use client"

import { useEffect } from "react"
import useAuthInfo from "@/hooks/use-auth-info/useAuthInfo"

export default function ClientAuthHydrator({ user }: { user: any }) {
  const { setUserState } = useAuthInfo.getState()

  useEffect(() => {
    if (user) {
      setUserState(user)
    }
  }, [user])

  return null
}
