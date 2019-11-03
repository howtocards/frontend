// @flow
import { Store, createStore } from "effector"
import { CurrentUser } from "@api/account"

export const $session = createStore<CurrentUser | null>(null)

export const $isAuthenticated: Store<boolean> = $session.map(
  (session) => session !== null,
)
