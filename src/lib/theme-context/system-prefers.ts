// @flow
import { createEvent, restore } from "effector"

const matcher = window.matchMedia("(prefers-color-scheme: dark)")

const prefersChanged = createEvent<boolean>()

export const $prefersDark = restore<boolean>(prefersChanged, matcher.matches)

matcher.addListener((event) => {
  prefersChanged(event.matches)
})
