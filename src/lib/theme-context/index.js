// @flow
import * as React from "react"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { ThemeProvider } from "styled-components"

const themeToggled = createEvent()
const $isDark = createStore(localStorage.getItem("theme") === "dark")

$isDark.on(themeToggled, (isDark) => !isDark)

$isDark.watch((isDark) => {
  localStorage.setItem("theme", isDark ? "dark" : "light")
})

type ProviderProps = {
  dark: {},
  light: {},
  children: React.Node,
}

export const ToggleThemeProvider = ({
  dark,
  light,
  children,
}: ProviderProps) => {
  const isDark = useStore($isDark)

  React.useEffect(() => {
    const html = document.querySelector("html")
    if (html) {
      if (isDark) {
        html.classList.add("theme-dark")
      } else {
        html.classList.remove("theme-dark")
      }
    }
  }, [isDark])

  return <ThemeProvider theme={isDark ? dark : light}>{children}</ThemeProvider>
}

type TogglerProps = {
  render: (p: {
    isDark: boolean,
    theme: "dark" | "light",
    toggle: () => void,
  }) => React.Node,
}

export const WithThemeToggler = ({ render }: TogglerProps) => {
  const isDark = useStore($isDark)
  const theme = isDark ? "dark" : "light"

  return render({ isDark, theme, toggle: themeToggled })
}
