// @flow
import { createEvent, restore } from "effector"

const matcher = window.matchMedia("(prefers-color-scheme: dark)")

const prefersChanged = createEvent<boolean>()

export const $prefersDark = restore<boolean>(prefersChanged, matcher.matches)

matcher.addEventListener("change", (event) => {
  prefersChanged(event.matches)
})

