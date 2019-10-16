// @flow
import * as React from "react"
import { combine } from "effector"
import { useStore } from "effector-react"
import { ThemeProvider } from "styled-components"

import { $prefersDark } from "./system-prefers"
import { $selectedTheme, themeToggled } from "./user-prefers"

const $theme = combine(
  $selectedTheme,
  $prefersDark,
  (selected, prefersDark) => {
    if (selected === "auto") {
      return prefersDark ? "dark" : "light"
    }

    return selected // "dark" | "light"
  },
)

const $isDark = $theme.map((theme) => theme === "dark")

type ProviderProps = {
  dark: {},
  light: {},
  children: React.Node,
}

// TODO remove ThemeProvider in prefer to css theme
export const ToggleThemeProvider = ({
  dark,
  light,
  children,
}: ProviderProps) => {
  const isDark = useStore($isDark)

  React.useEffect(() => {
    const html = document.querySelector("html")
    if (html) {
      html.dataset.theme = isDark ? "dark" : "light"
    }
  }, [isDark])

  return <ThemeProvider theme={isDark ? dark : light}>{children}</ThemeProvider>
}

export const useTheme = () => {
  const theme = useStore($selectedTheme)

  return { theme, toggle: themeToggled }
}
