import React from "react"
import { hot } from "react-hot-loader"

import { Normalize } from "styled-normalize"
import { AccountLoader } from "@features/common"

import { ToggleThemeProvider } from "@lib/theme-context"
import { lightTheme } from "@howtocards/ui/themes/light"
import { darkTheme } from "@howtocards/ui/themes/dark"

import { rootRoutes } from "./routes"
import { GlobalStyles } from "./global-styles"

export const App = hot(module)(() => (
  <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
    <>
      <Normalize />
      <GlobalStyles />
      <AccountLoader>{rootRoutes()}</AccountLoader>
    </>
  </ToggleThemeProvider>
))
