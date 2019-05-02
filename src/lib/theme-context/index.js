import React from "react"
import { createStore, createEvent } from "effector"
import { useStore } from "effector-react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"

const themeToggled = createEvent()
const $isDark = createStore(localStorage.getItem("theme") === "dark")

$isDark.on(themeToggled, (isDark) => !isDark)

$isDark.watch((isDark) => {
  localStorage.setItem("theme", isDark ? "dark" : "light")
})

export const ToggleThemeProvider = ({ dark, light, children }) => {
  const isDark = useStore($isDark)

  return <ThemeProvider theme={isDark ? dark : light}>{children}</ThemeProvider>
}

ToggleThemeProvider.propTypes = {
  dark: PropTypes.shape({}).isRequired,
  light: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
}

export const WithThemeToggler = ({ render }) => {
  const isDark = useStore($isDark)
  const theme = isDark ? "dark" : "light"

  return render({ isDark, theme, toggle: themeToggled })
}

WithThemeToggler.propTypes = {
  render: PropTypes.func.isRequired,
}
