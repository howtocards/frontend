import Cookies from "browser-cookies"
import { createStore, createEvent } from "effector"
import { sessionFetchProcessing } from "./session.events"

const TOKEN_ID = "hw-token"

export const tokenChanged = createEvent()
export const tokenDropped = createEvent()

export const $token = createStore(Cookies.get(TOKEN_ID))

$token.on(tokenChanged, (current, token) => token).reset(tokenDropped)

$token.watch((token) => {
  if (token === null) {
    Cookies.erase(TOKEN_ID)
  } else {
    Cookies.set(TOKEN_ID, token)
  }
})

$token.watch(tokenChanged, () => {
  sessionFetchProcessing()
})
