// @flow
import { createStore, type Store } from "effector"

export type Session = {
  id: number,
  displayName?: string,
  email: string,
}

export const $session: Store<?Session> = createStore(null)

export const $isAuthenticated: Store<boolean> = $session.map(
  (session) => session !== null,
)
