// @flow
import { type Store, createStore } from "effector"
import { type CurrentUser } from "@api/account"

export const $session: Store<?CurrentUser> = createStore(null)

export const $isAuthenticated: Store<boolean> = $session.map(
  (session) => session !== null,
)
