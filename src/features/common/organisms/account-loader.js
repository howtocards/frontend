import { useEffect } from "react"
import { useStore } from "effector-react"

import { $session } from "../model/session.store"
import { loadSession } from "../model/session.events"
import { $token } from "../model/token"

export const AccountLoader = ({ children }) => {
  const session = useStore($session)
  const token = useStore($token)

  useEffect(() => {
    loadSession()
  }, [])

  if (token && !session) return null

  return children
}
