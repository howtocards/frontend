import Cookies from "browser-cookies"
import { createStore, createEvent } from "effector"
import { sessionFetchProcessing } from "./session.events"

const TOKEN_ID = "hw-token"

export const tokenChanged = createEvent()
export const tokenDropped = createEvent()

export const $token = createStore(Cookies.get(TOKEN_ID) || null)

$token.on(tokenChanged, (current, token) => token)
$token.on(tokenDropped, () => null)

$token.watch((token) => {
  if (token) {
    Cookies.set(TOKEN_ID, token)
    setTimeout(() => sessionFetchProcessing(), 0)
  }
})

tokenDropped.watch(() => Cookies.erase(TOKEN_ID))
