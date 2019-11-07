import * as React from "react"
import styled from "styled-components"
import { Normalize } from "styled-normalize"
import { Button } from "@storybook/components"
import {} from "@storybook/react"
import addons, { types, makeDecorator } from "@storybook/addons"
import { FORCE_RE_RENDER } from "@storybook/core-events"

import { useTheme, ToggleThemeProvider } from "../src/lib/theme-context"
import { darkTheme } from "../src/ui/themes/dark"
import { lightTheme } from "../src/ui/themes/light"
import { GlobalStyles } from "../src/global-styles"

// addons.register("storybook/theme-switcher", (api) => {
//   addons.add("storybook/theme-switcher", {
//     title: "Theme Switcher",
//     type: types.TOOL,
//     match: ({ viewMode }) => viewMode === "story",
//     render: () => <ThemeToggler api={api} />,
//   })
// })

const themeEmoji = {
  dark: "🌚",
  light: "🌝",
  auto: "🌗",
}

const ThemeToggler = ({ api }) => {
  const { theme, toggle } = useTheme()

  return (
    <ThemeButton onClick={toggle}>
      theme: {themeEmoji[theme]} {theme}
    </ThemeButton>
  )
}

const ThemeButton = styled.button({
  border: "none",
  backgroundColor: "transparent",
  padding: "0.5rem 0",
  borderBottom: "1px solid var(--borders)",
  marginBottom: "1rem",
  cursor: "pointer",
  color: "var(--canvas-text)",
  fontSize: "1.2rem",
})

const BodyContainer = styled.div({
  backgroundColor: "var(--canvas)",
  color: "var(--canvas-text)",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
})

export const withTheme = makeDecorator({
  name: "withTheme",
  parameterName: "theme",
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => (
    <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
      <BodyContainer>
        <Normalize />
        <GlobalStyles />
        <ThemeToggler />
        {getStory(context)}
      </BodyContainer>
    </ToggleThemeProvider>
  ),
})
