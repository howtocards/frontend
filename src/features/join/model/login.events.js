import { createEvent, createEffect } from "effector"
import { createFetching } from "@lib/fetching"

export const emailChanged = createEvent()
export const passwordChanged = createEvent()
export const formSubmitted = createEvent()
export const formMounted = createEvent()
export const formUnmounted = createEvent()

export const loginProcessing = createEffect()
export const loginFetching = createFetching(loginProcessing)
