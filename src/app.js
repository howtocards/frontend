import React from 'react'
import { hot } from 'react-hot-loader'

import { AccountLoader } from 'features/common'

import { ToggleThemeProvider } from 'lib/theme-context'
import { lightTheme } from 'ui/themes/light'
import { darkTheme } from 'ui/themes/dark'

import { rootRoutes } from './routes'


export const App = hot(module)(() => (
  <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
    <AccountLoader>
      {rootRoutes()}
    </AccountLoader>
  </ToggleThemeProvider>
))
