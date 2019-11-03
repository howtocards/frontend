import * as React from "react"
import { useStore } from "effector-react"

import { $session } from "../model/session.store"
import { loadSession } from "../model/session.events"
import { $token } from "../model/token"

type LoaderProps = {
  children: React.ReactChild
}

export const AccountLoader = ({ children }: LoaderProps) => {
  const session = useStore($session)
  const token = useStore($token)

  React.useEffect(() => {
    loadSession()
  }, [])

  if (token && !session) return null

  return children
}
