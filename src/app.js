// @flow
import * as React from "react"
import { hot } from "react-hot-loader"

import { Normalize } from "styled-normalize"
import { AccountLoader } from "@features/common"

import { ToggleThemeProvider } from "@lib/theme-context"
import { lightTheme } from "@howtocards/ui/themes/light"
import { darkTheme } from "@howtocards/ui/themes/dark"

import { TypographistProvider } from "@typographist/styled"
import { Routes } from "./routes"
import { GlobalStyles } from "./global-styles"

export const config = {
  base: "14px",
  lineHeight: 1.4,
  ratio: "28px at 6",
  tablet: {
    breakpoint: "768px",
  },
  desktop: {
    breakpoint: "992px",
  },
}

export const App = hot(module)(() => (
  <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
    <TypographistProvider
      config={config}
      withToggle={process.env.NODE_ENV === "development"}
    >
      <>
        <Normalize />
        <GlobalStyles />
        <AccountLoader>
          <Routes />
        </AccountLoader>
      </>
    </TypographistProvider>
  </ToggleThemeProvider>
))
