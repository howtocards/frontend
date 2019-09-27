// @flow
import { createEvent, createStore } from "effector"

export const themeToggled = createEvent<void>()

type Theme = "dark" | "light" | "auto"
const availableThemes: Theme[] = ["dark", "light", "auto"]

export const $selectedTheme = createStore<Theme>(restoreTheme())

$selectedTheme.on(themeToggled, nextTheme)

$selectedTheme.watch(saveTheme)

function restoreTheme(): Theme {
  const theme = localStorage.getItem("theme")
  for (const available of availableThemes) {
    if (available === theme) {
      return available
    }
  }
  return "auto"
}

function saveTheme(theme: Theme) {
  localStorage.setItem("theme", theme)
}

function nextTheme(theme: Theme): Theme {
  switch (theme) {
    case "auto":
      return "dark"

    case "dark":
      return "light"

    case "light":
    default:
      return "auto"
  }
}
