// @flow
import { createEvent } from "effector"

import { sessionDropped } from "@features/common"
import { history } from "@lib/routing"

type ButtonEvent = SyntheticEvent<HTMLButtonElement>

export const logoutPressed = createEvent<ButtonEvent>()
export const cancelPressed = createEvent<ButtonEvent>()

logoutPressed.watch(() => {
  sessionDropped()
  history.push("/")
})

cancelPressed.watch(() => {
  history.push("/")
})
