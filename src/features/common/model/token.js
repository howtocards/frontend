// @flow
import Cookies from "browser-cookies"
import { createEvent, createStore } from "effector"
import { loadSession } from "./session.events"

const TOKEN_ID = "hw-token"

export const tokenChanged = createEvent<string>()
export const tokenDropped = createEvent<void>()

export const $token = createStore<?string>(Cookies.get(TOKEN_ID) || null)

$token.on(tokenChanged, (_, token) => token)
$token.on(tokenDropped, () => null)

$token.watch((token) => {
  if (token) {
    Cookies.set(TOKEN_ID, token)
    setTimeout(() => loadSession(), 0)
  }
})

tokenDropped.watch(() => Cookies.erase(TOKEN_ID))
