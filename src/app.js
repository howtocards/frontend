import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import { ToggleThemeProvider } from 'lib/theme-context'
import { lightTheme } from 'ui/themes/light'
import { darkTheme } from 'ui/themes/dark'

import { AccountLoader } from 'features/account'

import { rootRoutes } from './routes'


export const App = hot(module)(() => (
  <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
    <AccountLoader>
      <BrowserRouter>
        {rootRoutes()}
      </BrowserRouter>
    </AccountLoader>
  </ToggleThemeProvider>
))
